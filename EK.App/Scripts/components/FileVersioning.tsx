// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.UX.FileVersioning {
    "use strict";
    interface IFileVersioningProps extends React.Props<any>, grid.IColumn {
        id?: string;
        entityId?: number;
        entityType?: string;
        modulo?: string;
        tipo?: string;

        viewMode?: boolean;
        allowEdit?: boolean;

        config?: page.IPageConfig;
        obtenerCatalogo?: (f: any, slot: string) => void;
        eliminar?: (item: any, slot: string) => void;
        onFilter?: (props: any, filters) => void;
        catalogo?: global.DataElement;
        item?: global.DataElement;
    };

    const applyFilter: (props: IFileVersioningProps) => any = (props: IFileVersioningProps): any => {
        let filters: any = global.assign({
            entityId: props.entityId,
            entityType: props.entityType,
            modulo: props.modulo,
            tipo: props.tipo,
            versioning: 1
        });

        if (props.onFilter) {
            filters = props.onFilter(props, filters);
        };

        props.obtenerCatalogo(filters, props.id);
    };

    export const getCatalogo: (slot: string, ordered?: boolean) => any[] = (slot: string, ordered?: boolean): any[] => {
        let state: any = EK.Store.getState();
        let retValue: any[] = global.getData(state.global['catalogo$' + slot], []);
        //
        if (ordered === null || ordered === undefined) ordered = false;
        if (ordered === true) {
            retValue = retValue.sort((a, b): number => {
                if (a.FileVersion < b.FileVersion) return -1;
                if (a.FileVersion > b.FileVersion) return 1;
                return 0;
            });
        }
        //
        return retValue;
    };

    export const getLatestVersion: (slot: string) => any = (slot: string): any => {
        let items: any[] = getCatalogo(slot, true);
        let retValue: any = null;
        //
        if (items && items.length) {
            retValue = items[items.length - 1];
        }
        //
        return retValue;
    };

    class FileVersioning extends React.Component<IFileVersioningProps, {}>{
        constructor(props: IFileVersioningProps) {
            super(props);
        };
        static defaultProps: IFileVersioningProps = {
            catalogo: global.createDefaultStoreObject([]),
            item: global.createSuccessfulStoreObject({}),
            viewMode: true,
            allowEdit: true
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.catalogo)) {
                applyFilter(this.props);
            }
        };
        shouldComponentUpdate(nextProps: IFileVersioningProps, {}): boolean {
            return global.hasChanged(this.props.item, nextProps.item) ||
                global.hasChanged(this.props.catalogo, nextProps.catalogo)
        };
        componentDidUpdate(prevProps: IFileVersioningProps, {}): any {
            if (global.isUpdating(prevProps.item) && global.isFullSuccessful(this.props.item)) {
                let item: any = global.getData(this.props.item);
                if (item.Estado === 4) {
                    global.success("El documento ha sido eliminado.");
                } else {
                    global.success("El documento ha sido generado exitosamente.");
                }

                applyFilter(this.props);
            }
        };
        render(): JSX.Element {
            let config: page.IPageConfig = this.props.config;
            let extraData: any[] = [];

            //let remove: any = {
            //    icon: "fa fa-trash",
            //    action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            //        this.props.eliminar(item, this.props.id);
            //    }
            //};

            let download: any = {
                icon: "fa fa-download",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig, url: string) => {
                    window.open(item.FilePath, "_blank");
                }
            };

            //let print: any = {
            //    icon: "fa fa-print",
            //    action: (id: string, idParent: string, item: any, config: page.IPageConfig, url: string) => {
            //        window.open([item.FilePath, "/true"].join(""), "_blank");
            //    }
            //};

            if (this.props.viewMode === true)
            {
                extraData.push(download);
            } else
            {
                if (this.props.allowEdit === true)
                {
                    extraData.push(download);
                } else {
                    extraData.push(download);
                }
            }

            const listHeader: JSX.Element =
                <Column style={{ backgroundColor: "#fff" }}>
                    <Column size={[1, 1, 1, 1]} className="list-center-header">{"Versión"}</Column>
                    <Column size={[6, 6, 6, 6]} className="list-default-header">{"Nombre"}</Column>
                    <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tamaño"}</Column>
                    <Column size={[2, 2, 2, 2]} className="list-default-header">{"Creado"}</Column>
                    <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                </Column>;
            //<PanelUpdate info={this.props.item}>
            return <List
                id={this.props.id}
                items={this.props.catalogo}
                readonly={true}
                listHeader={listHeader}
                addRemoveButton={false}
                listMode="literal"
                formatter={(index: number, item: any) => {
                    return <Column key={"item_document_" + item.ID}>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">{item.FileVersion}</Column>
                        <Column size={[6, 6, 6, 6]} className="listItem-default-header">
                            <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                <span style={{ fontSize: 16, paddingRight: 5 }}>{EK.UX.Labels.badgeFileType(item.FileType, item.FileExtension)}</span>

                                <a title={"Visualizar"}
                                    target={"_blank"}
                                    onClick={() => {
                                        global.goModal("modalArchivosSeguimiento", "kontrolFiles/document/" + item.EntityType + "/" + item.EntityId + "/" + item.Tipo+"/"+ item.Uid);
                                    }}>{item.Nombre}</a>;

                            </span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">{EK.UX.Kontrol.getFormatBytes(item.FileSize, 2)}</Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">{EK.UX.Labels.formatDate(item.Creado)}</Column>
                        <buttons.PopOver idParent={config.id} idForm={this.props.id} info={item} extraData={extraData} />
                    </Column>
                }} />;
            //</PanelUpdate>
        };
    };

    class FileVersioningForm extends React.Component<IFileVersioningProps, {}>{
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerCatalogo: (f: any, slot: string): void => {
                let encodedFilters: string = global.encodeObject(f);
                let url: string = ["KontrolFiles/", "all/", encodedFilters].join("");
                global.dispatchAsync("global-page-data", url, slot);
            },
            eliminar: (item: any, slot: string): void => {
                global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Delete", item, slot);
            }
        });
        render(): JSX.Element {
            let item: any = this.props.config.getEntity(this.props.id);
            let catalogo: any = this.props.config.getCatalogo(this.props.id);

            return <FileVersioning {...this.props} item={item} catalogo={catalogo} />
        };
    };

    export let FileVersioning$Form: any = ReactRedux.connect(FileVersioningForm.props, FileVersioningForm.dispatchs)(FileVersioningForm);

    class ButtonGenerate extends React.Component<EK.UX.Buttons.IButtonProps, {}> {
        constructor(props: EK.UX.Buttons.IButtonProps) {
            super(props);
        };
        static defaultProps: EK.UX.Buttons.IButtonProps = {
            icon: "fa fa-clone",
            text: "",
            color: "",
            className: "",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        render(): JSX.Element {
            let color: string = "white";
            let icon: string = this.props.icon;
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn-default-ek";
            }

            if (global.isUpdating(this.props.info)) {
                className = className + " disabled";
                icon = "fa fa-refresh fa-spin";
            }

            return <Button {...this.props} className={className} icon={icon} color={color} />
        }
    };
}

import fileVersioning = EK.UX.FileVersioning;
import FileVersioning = EK.UX.FileVersioning.FileVersioning$Form;
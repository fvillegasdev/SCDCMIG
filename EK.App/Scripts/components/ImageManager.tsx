// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX.Kontrol.Images {
    "use strict";
    export interface IImageManagerProps extends React.Props<any>, EK.UX.IFormElement {
        modulo?: string;
        entity?: DataElement;
        entityType?: DataElement;
        dataManager?: StateDataManager;
        tipo?: string;
        item?: DataElement;
        itemKey?: string;
        getDispatchUrl?: () => string;
        viewMode?: boolean;
    }
    interface IImageManagerState {
        item: any;
    }
    export class ImageManagerForm extends React.Component<IImageManagerProps, IImageManagerState> {
        constructor(props: IImageManagerProps) {
            super(props);
            this.getPropId = this.getPropId.bind(this);
            this.getItem = this.getItem.bind(this);
            this.getDispatchUrl = this.getDispatchUrl.bind(this);
            this.state = { item: null }
        }
        static defaultProps: IImageManagerProps = {
            modulo: "kontrol",
            entity: createDefaultStoreObject({}),
            entityType: createDefaultStoreObject({}),
            tipo: KontrolFileTipo.Images,
            viewMode: true
        };
        static props: any = (state: any) => ({
            entity: state.global.currentEntity,
            entityType: state.global.currentEntityType,
            dataManager: new StateDataManager(state.kontrolFileManager)
        });
        getPropId(): string {
            let idEntityType: any = getData(this.props.entityType);
            let idEntity: any = getDataID(this.props.entity);
            let tipo: string = this.props.tipo;

            return ["selected_", tipo, idEntityType, idEntity].join("");
        }
        getItem(): DataElement {
            let item: DataElement = this.props.dataManager.getById(this.getPropId());

            if (!item) {
                item = createDefaultStoreObject({});
            }

            return item;
        }
        getDispatchUrl(): any {
            let entityId: string = getDataID(this.props.entity);
            let entityType: string = getData(this.props.entityType);
            let tipo: string = this.props.tipo;

            let parametros: any = { tipo: tipo, entityType: entityType, entityId: entityId, activos: 1 }
            let encodedFilters: string = global.encodeObject(parametros);

            return ["KontrolFiles/item/", encodedFilters].join("");
        }
        componentWillReceiveProps(nextProps: IImageManagerProps) {
            let item: DataElement = nextProps.dataManager.getById(this.getPropId());
            this.setState({ item: item });
        }
        componentWillMount() {
            dispatchDefault("kontrol-fileManager-setSelected", {}, this.getPropId());
        }
        componentDidMount(): any {
            if (!isLoadingOrSuccessful(this.getItem())) {
                console.log(this.getDispatchUrl());
                dispatchAsync("kontrol-fileManager-setSelected", this.getDispatchUrl(), this.getPropId());
            }
        }
        componentWillUnmount(): void {
            dispatchDefault("kontrol-fileManager-setSelected", {}, this.getPropId());
        }
        render(): JSX.Element {
            let editView: boolean = !this.props.viewMode;

            return <ImageManager
                {...this.props}
                item={this.getItem()}
                itemKey={this.getPropId()}
                getDispatchUrl={this.getDispatchUrl} />;
        }
    }
    export class ImageManager extends React.Component<IImageManagerProps, IKontrolFileInputState> {
        constructor(props: IImageManagerProps) {
            super(props);
            this.onDelete = this.onDelete.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onSave = this.onSave.bind(this);
            this.state = { file: new File(null) }
        }
        onDelete(item: any, e: any): void {
            if (isEmptyObject(item)) return;

            let model = EK.Global.assign({}, {
                ID: item.ID,
                EntityId: item.EntityId,
                EntityType: item.EntityType,
                Tipo: item.Tipo,
                Uid: item.Uid
            });

            $(e).closest(".panel").find("[data-dismiss='fileinput']").click();
            dispatchAsyncPut("kontrol-fileManager-eliminar", "KontrolFiles/Delete", model, this.props.itemKey);
        }
        onChange(file: File): any {
            this.setState({ file: file });
        }
        onSave(item: any): void {
            let $page: any = $ml[PAGE_ID];
            let file: File = this.state.file;

            if (!file.isValid()) return;

            if (file.getSize() > DEFAULT_FILE_SIZE) {
                errorMessage([$page.mensajes.fileSize, getFormatBytes(DEFAULT_FILE_SIZE, 0)].join(" "));
                return;
            }

            let model: any = {};
            model['ID'] = getDataID(this.props.item);
            model['EntityId'] = getDataID(this.props.entity);
            model['EntityType'] = getData(this.props.entityType);
            model['Tipo'] = this.props.tipo;
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = this.props.modulo;
            model['Uid'] = getData(this.props.item).Uid;

            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid
            });

            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file.getFile());
            dispatchAsyncPut("kontrol-fileManager-guardar", "KontrolFiles/Save", data, this.props.itemKey);
        }
        componentDidUpdate(prevProps: IImageManagerProps, prevState: IKontrolFileInputState): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item, false)) {
                let info: any = getData(this.props.item);

                if (info.Estado === 4) {
                    success($page.mensajes.deleted);
                    dispatchSuccessful("kontrol-fileManager-setSelected", {}, this.props.itemKey);
                } else {
                    success($page.mensajes.uploaded);
                }

                this.setState({ file: new File(null) });
            }
        }
        shouldComponentUpdate(nextProps: IImageManagerProps, nextState: IKontrolFileInputState): boolean {
            return hasChanged(this.props.item, nextProps.item) ||
                (this.state.file !== nextState.file);
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = getData(this.props.item);
            let file: File = this.state.file;
            let allowDelete: boolean = false;
            let allowSave: boolean = false;

            if (isSuccessful(this.props.item)) {
                allowDelete = !isEmptyObject(current);
                allowSave = file ? file.isValid() : false;
            }

            if (this.props.viewMode === true) {
                return <OptionSection level={1} collapsed={false} hideCollapseButton={true}>
                    <KontrolFile$Input size={[12, 12, 12, 12]} source={current.FilePath} mode={FileInputMode.ImageUpload2} onChange={this.onChange} />
                </OptionSection>;
            }
            else {
                return <OptionSection level={4} collapsed={false} hideCollapseButton={true} title={"Imagen"}>
                    <SectionButtons>
                        <Button icon="fa fa-paperclip" className="font-white" iconOnly={true} onClick={(info: any, e: any) => {
                            $(e).closest(".panel").find(".btn-file").find("input[type='file']").click();
                        }} info={current} style={{ paddingLeft: 5, fontSize: 18 }} />
                        <Button icon="fa fa-undo" className="font-white" iconOnly={true} onClick={(info: any, e: any) => {
                            $(e).closest(".panel").find("[data-dismiss='fileinput']").click();
                        }} info={current} visible={allowSave} style={{ paddingLeft: 5, fontSize: 18 }} />
                        <Button icon="fa fa-times" className="font-white" iconOnly={true} visible={allowDelete} onClick={this.onDelete} info={current} style={{ paddingLeft: 5, fontSize: 18 }} />
                        <Button icon="fa fa-upload" className="font-white" iconOnly={true} visible={allowSave} onClick={this.onSave} info={current} style={{ paddingLeft: 5, fontSize: 18 }} />
                    </SectionButtons>
                    <KontrolFile$Input size={[12, 12, 12, 12]} source={current.FilePath} mode={FileInputMode.ImageUpload2} onChange={this.onChange} />
                </OptionSection>;
            }
        }
    }
    export let ImageManager$Form: any = ReactRedux.connect(ImageManagerForm.props, null)(ImageManagerForm);
}

import ImageManager = EK.UX.Kontrol.Images.ImageManager$Form;
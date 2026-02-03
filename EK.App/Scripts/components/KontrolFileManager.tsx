// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX.Kontrol {
    "use strict";
    export const PAGE_ID: string = "kontrolFileManager";
    export const DEFAULT_FILE_SIZE: number = 16777216;
    
    interface IKontrolFileTipo {
        Anexos: string;
        Images: string;
        Plantillas: string;
    };

    export var KontrolFileTipo: IKontrolFileTipo = {
        Anexos: "anexos",
        Images: "images",
        Plantillas: "plantillas"
    };

    interface IKontrolFileItem {
        Tipo: string;
        Name: string;
        data: string;
        size: number;

    };

    export const getFileExtension: (filename: string) => string = (filename: string): string => {
        if (!filename) return "";
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    };

    export const getFormatBytes: (bytes: number, precision: number) => string = (bytes: number = 0, precision: number = 2): string => {
        if (isNaN(bytes) || !isFinite(bytes)) return "0 Bytes";

        let unit = 0;
        let units: string[] = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(precision) + " " + units[unit];
    };

    interface IKontrolFileManagerProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        config?: page.IPageConfig;
        modulo?: string;
        entity?: global.DataElement;
        entityType?: global.DataElement;
        currentEntity?: global.DataElement;
        currentEntityType?: global.DataElement;
        tipo?: string;
        items?: global.DataElement;
        item?: global.DataElement;
        slot?: string;
        dispatchCatalogo?: (props: IKontrolFileManagerProps, slot: string) => void;
        title?: string;
        viewMode?: boolean;
        multiple?: boolean;
        slotState?: global.DataElement;
        noAutoSave?: boolean;
    };

    interface IKontrolFileManagerState {
        id: string;
    };

    class $KontrolFileManager extends React.Component<IKontrolFileManagerProps, IKontrolFileManagerState> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            let id: string = this.getSlot(props);
            this.state = { id };
        };
        static defaultProps: IKontrolFileManagerProps = {
            modulo: "kontrol",
            title: "Administrador de archivos",
            tipo: KontrolFileTipo.Anexos,
            multiple: false,
            viewMode: true,
            size: [12, 12, 12, 12]
        }
        static props: any = (state: any) => ({
            currentEntity: state.global.currentEntity,
            currentEntityType: state.global.currentEntityType,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            dispatchCatalogo: (props: IKontrolFileManagerProps, slot: string): void => {

                let entityId: string = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
                let entityType: string = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
                let parametros: any = { tipo: props.tipo, entityType, entityId, activos: 1 };
                let encodedFilters: string = global.encodeObject(parametros);
                global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
                    dispatchSuccessful("global-page-data", data, slot);
                });
            }
        });
        getSlot(props: IKontrolFileManagerProps): string {
            let idEntityType: any = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
            let idEntity: any = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
            return [props.tipo, idEntityType, idEntity].join("$");
        };
        componentWillReceiveProps(nextProps: IKontrolFileManagerProps): void {
            let willUpdate: boolean = false;

            if (hasChanged(this.props.currentEntity, nextProps.currentEntity) && global.isSuccessful(nextProps.currentEntity)) {
                willUpdate = true;
            } else if (hasChanged(this.props.entity, nextProps.entity) && global.isSuccessful(nextProps.entity)) {
                willUpdate = true;
            };
            if (willUpdate === true) {
                setTimeout(() => {
                    this.props.dispatchCatalogo(nextProps, this.state.id);
                    global.dispatchSuccessful("global-page-entity", {}, this.state.id);
                },1000)
            };
        };
        componentWillMount(): void {
            global.dispatchSuccessful("global-page-data", [], this.state.id);
            global.dispatchSuccessful("global-page-entity", {}, this.state.id);
        };
        componentDidMount(): void {
            this.props.dispatchCatalogo(this.props, this.state.id);
        };
        render(): JSX.Element {
            let editView: boolean = !this.props.viewMode;
            let idEntidad: number = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            //console.log(idEntidad)
            //console.log(this.props.entity)
            if (idEntidad <= 0) {
                return <alerts.Alert type={alerts.AlertTypeEnum.info}>
                    <p style={{ fontSize: 12 }}> Es necesario guardar el registro para proceder a cargar los archivos. </p>
                </alerts.Alert>;
            };

            let items: DataElement = this.props.config.getCatalogo(this.state.id);
            let item: DataElement = this.props.config.getEntity(this.state.id);

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <Row>
                    {editView === true
                        ? <EditKontrolFileManager {...this.props} items={items} item={item} slot={this.state.id} />
                        : <ViewKontrolFileManager {...this.props} items={items} item={item} slot={this.state.id} />
                    }
                </Row>
            </Column>
        }
    };


    class $KontrolFileManagerEntregaS extends React.Component<IKontrolFileManagerProps, IKontrolFileManagerState> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            let id: string = this.getSlot(props);
            this.state = { id };
        };
        static defaultProps: IKontrolFileManagerProps = {
            modulo: "kontrol",
            title: "Administrador de archivos",
            tipo: KontrolFileTipo.Anexos,
            multiple: false,
            viewMode: true,
            size: [12, 12, 12, 12]
        }
        static props: any = (state: any) => ({
            currentEntity: state.global.currentEntity,
            currentEntityType: state.global.currentEntityType,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            dispatchCatalogo: (props: IKontrolFileManagerProps, slot: string): void => {

                let entityId: string = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
                let entityType: string = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
                let parametros: any = { tipo: props.tipo, entityType, entityId, activos: 1 };
                let encodedFilters: string = global.encodeObject(parametros);
                global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
                    dispatchSuccessful("global-page-data", data, slot);
                });
            }
        });
        getSlot(props: IKontrolFileManagerProps): string {
            let idEntityType: any = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
            let idEntity: any = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
            return [props.tipo, idEntityType, idEntity].join("$");
        };
        componentWillReceiveProps(nextProps: IKontrolFileManagerProps): void {
            let willUpdate: boolean = false;

            if (hasChanged(this.props.currentEntity, nextProps.currentEntity) && global.isSuccessful(nextProps.currentEntity)) {
                willUpdate = true;
            } else if (hasChanged(this.props.entity, nextProps.entity) && global.isSuccessful(nextProps.entity)) {
                willUpdate = true;
            };
            if (willUpdate === true) {
                setTimeout(() => {
                    this.props.dispatchCatalogo(nextProps, this.state.id);
                    global.dispatchSuccessful("global-page-entity", {}, this.state.id);
                }, 1000)
            };
        };
        componentWillMount(): void {
            global.dispatchSuccessful("global-page-data", [], this.state.id);
            global.dispatchSuccessful("global-page-entity", {}, this.state.id);
        };
        componentDidMount(): void {
            this.props.dispatchCatalogo(this.props, this.state.id);
        };
        render(): JSX.Element {
            let editView: boolean = !this.props.viewMode;
            let idEntidad: number = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            //console.log(idEntidad)
            //console.log(this.props.entity)
            if (idEntidad <= 0) {
                return <alerts.Alert type={alerts.AlertTypeEnum.info}>
                    <p style={{ fontSize: 12 }}> Es necesario guardar el registro para proceder a cargar los archivos. </p>
                </alerts.Alert>;
            };

            let items: DataElement = this.props.config.getCatalogo(this.state.id);
            let item: DataElement = this.props.config.getEntity(this.state.id);

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <Row>
                    {editView === true
                        ? <EditKontrolFileManagerEntS {...this.props} items={items} item={item} slot={this.state.id} />
                        : <ViewKontrolFileManager {...this.props} items={items} item={item} slot={this.state.id} />
                    }
                </Row>
            </Column>
        }
    };

    class $KontrolFileManagerSimple extends React.Component<IKontrolFileManagerProps, IKontrolFileManagerState> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            let id: string = this.getSlot(props);
            this.state = { id };
        };
        static defaultProps: IKontrolFileManagerProps = {
            modulo: "kontrol",
            title: "Administrador de archivos",
            tipo: KontrolFileTipo.Anexos,
            multiple: false,
            viewMode: true,
            size: [12, 12, 12, 12]
        }
        static props: any = (state: any) => ({
            currentEntity: state.global.currentEntity,
            currentEntityType: state.global.currentEntityType,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            dispatchCatalogo: (props: IKontrolFileManagerProps, slot: string): void => {

                let entityId: string = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
                let entityType: string = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
                let parametros: any = { tipo: props.tipo, entityType, entityId, activos: 1 };
                let encodedFilters: string = global.encodeObject(parametros);
                global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
                    dispatchSuccessful("global-page-data", data, slot);
                });
            }
        });
        getSlot(props: IKontrolFileManagerProps): string {
            let idEntityType: any = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
            let idEntity: any = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
            return [props.tipo, idEntityType, idEntity].join("$");
        };
        componentWillReceiveProps(nextProps: IKontrolFileManagerProps): void {
            let willUpdate: boolean = false;

            if (hasChanged(this.props.currentEntity, nextProps.currentEntity) && global.isSuccessful(nextProps.currentEntity)) {
                willUpdate = true;
            } else if (hasChanged(this.props.entity, nextProps.entity) && global.isSuccessful(nextProps.entity)) {
                willUpdate = true;
            };
            if (willUpdate === true) {
                setTimeout(() => {
                    this.props.dispatchCatalogo(nextProps, this.state.id);
                    global.dispatchSuccessful("global-page-entity", {}, this.state.id);
                }, 1000)
            };
        };
        componentWillMount(): void {
            global.dispatchSuccessful("global-page-data", [], this.state.id);
            global.dispatchSuccessful("global-page-entity", {}, this.state.id);
        };
        componentDidMount(): void {
            this.props.dispatchCatalogo(this.props, this.state.id);
        };
        render(): JSX.Element {
            let editView: boolean = !this.props.viewMode;
            let idEntidad: number = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            //console.log(idEntidad)
            //console.log(this.props.entity)
            if (idEntidad <= 0) {
                return <alerts.Alert type={alerts.AlertTypeEnum.info}>
                    <p style={{ fontSize: 12 }}> Es necesario guardar el registro para proceder a cargar los archivos. </p>
                </alerts.Alert>;
            };

            let items: DataElement = this.props.config.getCatalogo(this.state.id);
            let item: DataElement = this.props.config.getEntity(this.state.id);

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <Row>
                    {editView === true
                        ? <EditKontrolFileManagerSimple {...this.props} items={items} item={item} slot={this.state.id} />
                        : <ViewKontrolFileManager {...this.props} items={items} item={item} slot={this.state.id} />
                    }
                </Row>
            </Column>
        }
    };

    class $KontrolFileManagerEKC extends React.Component<IKontrolFileManagerProps, IKontrolFileManagerState> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            let id: string = this.getSlot(props);
            this.state = { id };
        };
        static defaultProps: IKontrolFileManagerProps = {
            modulo: "kontrol",
            title: "Administrador de archivos ekc",
            tipo: KontrolFileTipo.Anexos,
            multiple: false,
            viewMode: true,
            size: [12, 12, 12, 12]
        }
        static props: any = (state: any) => ({
            currentEntity: state.global.currentEntity,
            currentEntityType: state.global.currentEntityType,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            dispatchCatalogo: (props: IKontrolFileManagerProps, slot: string): void => {

                let entityId: string = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
                let entityType: string = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
                let parametros: any = { tipo: props.tipo, entityType, entityId, activos: 1 };
                let encodedFilters: string = global.encodeObject(parametros);
                global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
                    dispatchSuccessful("global-page-data", data, slot);
                });
            }
        });
        getSlot(props: IKontrolFileManagerProps): string {
            let idEntityType: any = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
            let idEntity: any = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
            return [props.tipo, idEntityType, idEntity].join("$");
        };
        componentWillReceiveProps(nextProps: IKontrolFileManagerProps): void {
            let willUpdate: boolean = false;

            if (hasChanged(this.props.currentEntity, nextProps.currentEntity) && global.isSuccessful(nextProps.currentEntity)) {
                willUpdate = true;
            } else if (hasChanged(this.props.entity, nextProps.entity) && global.isSuccessful(nextProps.entity)) {
                willUpdate = true;
            };
            if (willUpdate === true) {
                setTimeout(() => {
                    this.props.dispatchCatalogo(nextProps, this.state.id);
                    global.dispatchSuccessful("global-page-entity", {}, this.state.id);
                }, 1000)
            };
        };
        componentWillMount(): void {
            global.dispatchSuccessful("global-page-data", [], this.state.id);
            global.dispatchSuccessful("global-page-entity", {}, this.state.id);
        };
        componentDidMount(): void {
            this.props.dispatchCatalogo(this.props, this.state.id);
        };
        render(): JSX.Element {
            let editView: boolean = !this.props.viewMode;
            let idEntidad: number = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            //console.log(idEntidad)
            //console.log(this.props.entity)
            if (idEntidad <= 0) {
                return <alerts.Alert type={alerts.AlertTypeEnum.info}>
                    <p style={{ fontSize: 12 }}> Es necesario guardar el registro para proceder a cargar los archivos. </p>
                </alerts.Alert>;
            };

            let items: DataElement = this.props.config.getCatalogo(this.state.id);
            let item: DataElement = this.props.config.getEntity(this.state.id);

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <Row>
                    {editView === true
                        ? <EditKontrolFileManagerEKC {...this.props} items={items} item={item} slot={this.state.id} />
                        : <ViewKontrolFileManager {...this.props} items={items} item={item} slot={this.state.id} />
                    }
                </Row>
            </Column>
        }
    };

    class $KontrolFileManagerV2 extends React.Component<IKontrolFileManagerProps, IKontrolFileManagerState> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            let id: string = this.getSlot(props);
            this.state = { id };
        };
        static defaultProps: IKontrolFileManagerProps = {
            modulo: "kontrol",
            title: "Administrador de archivos",
            tipo: KontrolFileTipo.Anexos,
            multiple: false,
            viewMode: true,
            size: [12, 12, 12, 12]
        }
        static props: any = (state: any) => ({
            currentEntity: state.global.currentEntity,
            currentEntityType: state.global.currentEntityType,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            //dispatchCatalogo: (props: IKontrolFileManagerProps, slot: string): void => {

            //    let entityId: string = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
            //    let entityType: string = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
            //    let parametros: any = { tipo: props.tipo, entityType, entityId, activos: 1 };
            //    let encodedFilters: string = global.encodeObject(parametros);
            //    global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
            //        dispatchSuccessful("global-page-data", data, slot);
            //    });
            //}
        });
        getSlot(props: IKontrolFileManagerProps): string {
            let idEntityType: any = props.entityType ? global.getData(props.entityType) : global.getData(props.currentEntityType);
            let idEntity: any = props.entity ? global.getDataID(props.entity) : global.getDataID(props.currentEntity);
            return [props.tipo, idEntityType, idEntity].join("$");
        };
        componentWillReceiveProps(nextProps: IKontrolFileManagerProps): void {
            let willUpdate: boolean = false;
            //console.log(nextProps)
            //if (hasChanged(this.props.currentEntity, nextProps.currentEntity) && global.isSuccessful(nextProps.currentEntity)) {
            //    willUpdate = true;
            //} else if (hasChanged(this.props.entity, nextProps.entity) && global.isSuccessful(nextProps.entity)) {
            //    willUpdate = true;
            //};
            //if (willUpdate === true) {
            //    setTimeout(() => {
            //        this.props.dispatchCatalogo(nextProps, this.state.id);
            //        global.dispatchSuccessful("global-page-entity", {}, this.state.id);
            //    }, 1000)
            //};
        };
        componentWillMount(): void {
            //global.dispatchSuccessful("global-page-data", [], this.state.id);
            //global.dispatchSuccessful("global-page-entity", {}, this.state.id);
        };
        componentDidMount(): void {
            //this.props.dispatchCatalogo(this.props, this.state.id);
        };
        render(): JSX.Element {
            let editView: boolean = !this.props.viewMode;
            let idEntidad: number = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            //console.log(editView)
            //console.log(this.props.entity)
           // if (idEntidad <= 0) {
           //     return <alerts.Alert type={alerts.AlertTypeEnum.info}>
           //         <p style={{ fontSize: 12 }}> Es necesario guardar el registro para proceder a cargar los archivos. </p>
           //     </alerts.Alert>;
           // };
            //console.log(this.state.id);
            let items: DataElement = this.props.config.getCatalogo(this.state.id);
            let item: DataElement = this.props.config.getEntity(this.state.id);
            //console.log(items)
           // console.log(item)
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <Row>
                     <EditKontrolFileManagerV2 {...this.props} items={items} item={item} slot={this.state.id} />
                       
                </Row>
            </Column>
        }
    };

    class ViewKontrolFileManager extends React.Component<IKontrolFileManagerProps, {}> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            //
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.items, []).length].join("")} </span>;
            //
            return <OptionSection
                level={1}
                icon="fas fa-file-alt"
                hideCollapseButton={false}
                collapsed={false}
                title={this.props.title}
                readOnly={true}
                subTitle={subTitleSeccion}>
                <PanelUpdate info={this.props.items}>
                    <List
                        items={this.props.items}
                        readonly={false}
                        addRemoveButton={false}
                        formatter={(index: number, item: any) => {
                            console.log(item.FilePath)
                            return <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span style={{ fontWeight: 400 }}>{EK.UX.Labels.badgeFileType(item.FileType, item.FileExtension)}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><a href={item.FilePath} style={{ fontWeight: 400 }} download>{item.Nombre}</a></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span style={{ fontWeight: 300 }}>{global.formatDateTimeDirect(item.Creado, true)}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span style={{ fontWeight: 200 }}>{item.CreadoPor.Nombre}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span style={{ fontWeight: 300 }}>{item.Categoria.Nombre}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-right-item"><span style={{ fontWeight: 300 }}>{getFormatBytes(item.FileSize, 2)}</span></Column>
                            </Row>;
                        } } />
                </PanelUpdate>
            </OptionSection>
        }
    };

    class EditKontrolFileManager extends React.Component<IKontrolFileManagerProps, {}> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onSave = this.onSave.bind(this);
        };
        onSelect(e: any): void {
            let item: any = {
                ID: 0,
                EntityId: this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity),
                EntityType: this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType),
                FileSize: 0,
                FileType: "",
                FileExtension: "",
                Tipo: this.props.tipo,
                Modulo: this.props.modulo,
                Nombre: "",
                Uid: ""
            };

            global.dispatchSuccessful("global-page-entity", item, this.props.slot);
        };
        onChange(file: File): void {
            if (file.isValid()) {
                this.onSave(file);
            } else {
                global.dispatchSuccessful("global-page-entity", {}, this.props.slot);
            }
        };
        onSave(file: File): void {
            let $page: any = $ml[PAGE_ID];

            if (file.getSize() > DEFAULT_FILE_SIZE) {
                errorMessage([$page.mensajes.fileSize, getFormatBytes(DEFAULT_FILE_SIZE, 0)].join(" "));
                return;
            };
            let slotState: any = global.getData(this.props.currentEntity.data);
            let model: any = {};
            model['ID'] = getDataID(this.props.item);
            model['EntityId'] = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            model['EntityType'] = this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType);
            model['Tipo'] = this.props.tipo;
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = this.props.modulo;
            model['Uid'] = getData(this.props.item).Uid;
            model['ClavePlantilla'] = slotState.Clave;


            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid,
                ClavePlantilla: model.ClavePlantilla
            });
            console.log(this.props.noAutoSave)
            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file.getFile());
            if (this.props.noAutoSave) {
                console.log('no guardar automatico')
                let tmpObj = {
                    item: JSON.stringify(model),
                    file: file.getFile()
                }
                let savedTmpArray = EK.Store.getState().global.tmpEvidenciaCliente ? EK.Store.getState().global.tmpEvidenciaCliente.data : []; 
                savedTmpArray.push(tmpObj);
                dispatchSuccessful('load::tmpEvidenciaCliente', savedTmpArray);
            } else {
                global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Save", data, this.props.slot);

            }

        };
        componentDidUpdate(prevProps: IKontrolFileManagerProps, {}): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item, false)) {
                let info: any = getData(this.props.item);

                if (info.Estado === 4) {
                    success($page.mensajes.deleted);
                } else {
                    success($page.mensajes.uploaded);
                };

                this.props.dispatchCatalogo(this.props, this.props.slot);
            };
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let visible: boolean = false;

            let items: global.DataElement = this.props.items;
            if (items && global.isSuccessful(items)) {
                items = items.getActiveItems();
                //console.log(items)
            };
            //
            if (this.props.item && global.isSuccessful(this.props.item)) {
                if (this.props.multiple === true) {
                    visible = true;
                } else {
                    let data: any[] = global.getData(items, []);
                    visible = data && data.length < 1 ? true : false;
                }
            } else {
                if (this.props.item && global.isLoadingOrUpdating(this.props.item)) {
                    items.status = this.props.item.status;
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (isEmptyObject(item)) return;

                    let model = EK.Global.assign({}, {
                        ID: item.ID,
                        EntityId: item.EntityId,
                        EntityType: item.EntityType,
                        Tipo: item.Tipo,
                        Uid: item.Uid
                    });

                    global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Delete", model, this.props.slot);
                }
            };
            //
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(items, []).length].join("")} </span>;
            //
            return <OptionSection
                level={1}
                icon="fas fa-file-alt"
                hideCollapseButton={false}
                collapsed={false}
                title={this.props.title}
                readOnly={true}
                subTitle={subTitleSeccion}>
                <SectionButtons>
                    <KontrolFile$Input
                        mode={FileInputMode.IconOnly}
                        visible={visible}
                        onSelect={this.onSelect}
                        onChange={this.onChange} />
                </SectionButtons>
                <PanelUpdate info={items}>
                    <List
                        items={items}
                        readonly={false}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        formatter={(index: number, item: any) => {
                           // console.log(item.FilePath)
                            return <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span style={{ fontWeight: 400 }}>{EK.UX.Labels.badgeFileType(item.FileType, item.FileExtension)}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><a href={item.FilePath} style={{ fontWeight: 400 }} download>{item.Nombre}</a></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span style={{ fontWeight: 300 }}>{global.formatDateTimeDirect(item.Creado, true)}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span style={{ fontWeight: 200 }}>{item.CreadoPor.Nombre}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span style={{ fontWeight: 300 }}>{item.Categoria.Nombre}</span></Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-right-item"><span style={{ fontWeight: 300 }}>{getFormatBytes(item.FileSize, 2)}</span></Column>
                                <buttons.PopOver info={item} extraData={[remove]} />
                            </Row>
                        } } />
                </PanelUpdate>
            </OptionSection>
        }
    };

    class EditKontrolFileManagerEntS extends React.Component<IKontrolFileManagerProps, {}> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onSave = this.onSave.bind(this);
        };
        onSelect(e: any): void {
            let item: any = {
                ID: 0,
                EntityId: this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity),
                EntityType: this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType),
                FileSize: 0,
                FileType: "",
                FileExtension: "",
                Tipo: this.props.tipo,
                Modulo: this.props.modulo,
                Nombre: "",
                Uid: ""
            };

            global.dispatchSuccessful("global-page-entity", item, this.props.slot);
        };
        onChange(file: File): void {
            if (file.isValid()) {
                this.onSave(file);
            } else {
                global.dispatchSuccessful("global-page-entity", {}, this.props.slot);
            }
        };
        onSave(file: File): void {
            let $page: any = $ml[PAGE_ID];

            if (file.getSize() > DEFAULT_FILE_SIZE) {
                errorMessage([$page.mensajes.fileSize, getFormatBytes(DEFAULT_FILE_SIZE, 0)].join(" "));
                return;
            };
            let slotState: any = global.getData(this.props.currentEntity.data);
            let model: any = {};
            model['ID'] = getDataID(this.props.item);
            model['EntityId'] = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            model['EntityType'] = this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType);
            model['Tipo'] = this.props.tipo;
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = this.props.modulo;
            model['Uid'] = getData(this.props.item).Uid;
            model['ClavePlantilla'] = slotState.Clave;

            let validExtension = false;
            switch (model.FileExtension.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                    validExtension = true;
                    break
            }

            //console.log(model.FileExtension, model.FileExtension.toLowerCase())
            if (!validExtension) {
                global.info('Formato de archivo no valido [SOLO SE PERMITEN JPG]')
                return;
            }

            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid,
                ClavePlantilla: model.ClavePlantilla
            });
            console.log(this.props.noAutoSave)
            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file.getFile());
            let d = new Date();

            if (this.props.noAutoSave) {
                //console.log('no guardar automatico')
                //console.log(this.props.slot)
                let tmpObj = {
                    item: model,
                    file: file.getFile(),
                    UUID: d.getTime()
                }
                // console.log(tmpObj)
                // let tmpIma = {
                //     file: {name:'_tmpimg'}}
                let savedTmpArray = EK.Store.getState().global.tmpEvidenciaCliente ? EK.Store.getState().global.tmpEvidenciaCliente.data : [];
                if (savedTmpArray.length > 0) {
                    let IdIncidencia = model.EntityId;
                    let totalincidencia = savedTmpArray.filter(x => x.item.EntityId === IdIncidencia).length;
                    if (totalincidencia === 2) {
                        global.info('Solo se permiten 2 evidencias por Incidencia');
                        return;
                    }
                    for (let e of savedTmpArray) {
                        let el: any = document.getElementById(`comentario$${e.UUID}`);
                        let comentario = el && el.value ? el.value : '';
                        e.comentario = comentario;
                    }
                }

                savedTmpArray.push(tmpObj);
                dispatchSuccessful('load::tmpEvidenciaCliente', savedTmpArray);

            } else {
                global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Save", data, this.props.slot);
                console.log('autosave')
            }

        };
        componentDidUpdate(prevProps: IKontrolFileManagerProps, { }): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item, false)) {
                let info: any = getData(this.props.item);

                if (info.Estado === 4) {
                    success($page.mensajes.deleted);
                } else {
                    success($page.mensajes.uploaded);
                };

                this.props.dispatchCatalogo(this.props, this.props.slot);
            };
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let visible: boolean = false;

            let items: global.DataElement = this.props.items;
            if (items && global.isSuccessful(items)) {
                items = items.getActiveItems();
                //console.log(items)
            };
            //
            if (this.props.item && global.isSuccessful(this.props.item)) {
                if (this.props.multiple === true) {
                    visible = true;
                } else {
                    let data: any[] = global.getData(items, []);
                    visible = data && data.length < 1 ? true : false;
                }
            } else {
                if (this.props.item && global.isLoadingOrUpdating(this.props.item)) {
                    items.status = this.props.item.status;
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (isEmptyObject(item)) return;

                    let model = EK.Global.assign({}, {
                        ID: item.ID,
                        EntityId: item.EntityId,
                        EntityType: item.EntityType,
                        Tipo: item.Tipo,
                        Uid: item.Uid
                    });

                    global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Delete", model, this.props.slot);
                }
            };
            //
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(items, []).length].join("")} </span>;
            //
            return <KontrolFile$InputV2
                mode={FileInputMode.IconOnly}
                visible={visible}
                iconColor={'#2c3e50'}
                onSelect={this.onSelect}
                onChange={this.onChange} />
        }
    };
    class EditKontrolFileManagerEKC extends React.Component<IKontrolFileManagerProps, {}> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onSave = this.onSave.bind(this);
        };
        onSelect(e: any): void {
            let item: any = {
                ID: 0,
                EntityId: this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity),
                EntityType: this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType),
                FileSize: 0,
                FileType: "",
                FileExtension: "",
                Tipo: this.props.tipo,
                Modulo: this.props.modulo,
                Nombre: "",
                Uid: ""
            };

            global.dispatchSuccessful("global-page-entity", item, this.props.slot);
        };
        onChange(file: File): void {
            if (file.isValid()) {
                this.onSave(file);
            } else {
                global.dispatchSuccessful("global-page-entity", {}, this.props.slot);
            }
        };
        onSave(file: File): void {
            let $page: any = $ml[PAGE_ID];

            if (file.getSize() > DEFAULT_FILE_SIZE) {
                errorMessage([$page.mensajes.fileSize, getFormatBytes(DEFAULT_FILE_SIZE, 0)].join(" "));
                return;
            };
            let slotState: any = global.getData(this.props.currentEntity.data);
            let model: any = {};
            model['ID'] = getDataID(this.props.item);
            model['EntityId'] = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            model['EntityType'] = this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType);
            model['Tipo'] = this.props.tipo;
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = this.props.modulo;
            model['Uid'] = getData(this.props.item).Uid;
            model['ClavePlantilla'] = slotState.Clave;

            let validExtension = true;
            //switch (model.FileExtension.toLowerCase()) {
            //    case 'jpg':
            //    case 'jpeg':
            //        validExtension = true;
            //        break
            //}

            //console.log(model.FileExtension, model.FileExtension.toLowerCase())
            if (!validExtension) {
                global.info('Formato de archivo no valido [SOLO SE PERMITEN JPG]')
                return;
            }

            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid,
                ClavePlantilla: model.ClavePlantilla
            });
            console.log(this.props.noAutoSave)
            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file.getFile());
            let d = new Date();

            if (this.props.noAutoSave) {
                //console.log('no guardar automatico')
                //console.log(this.props.slot)
                let tmpObj = {
                    item: model,
                    file: file.getFile(),
                    UUID: d.getTime()
                }
                // console.log(tmpObj)
                // let tmpIma = {
                //     file: {name:'_tmpimg'}}
                let savedTmpArray = EK.Store.getState().global.tmpEKCChatMessageFile ? EK.Store.getState().global.tmpEKCChatMessageFile.data : [];
                //if (savedTmpArray.length > 0) {
                //    let IdIncidencia = model.EntityId;
                //    let totalincidencia = savedTmpArray.filter(x => x.item.EntityId === IdIncidencia).length;
                //    if (totalincidencia === 2) {
                //        global.info('Solo se permiten 2 evidencias por Incidencia');
                //        return;
                //    }
                   
                //}

                savedTmpArray.push(tmpObj);
                dispatchSuccessful('load::tmpEKCChatMessageFile', savedTmpArray);

            } else {
                global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Save", data, this.props.slot);
                console.log('autosave')
            }

        };
        componentDidUpdate(prevProps: IKontrolFileManagerProps, { }): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item, false)) {
                let info: any = getData(this.props.item);

                if (info.Estado === 4) {
                    success($page.mensajes.deleted);
                } else {
                    success($page.mensajes.uploaded);
                };

                this.props.dispatchCatalogo(this.props, this.props.slot);
            };
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let visible: boolean = false;

            let items: global.DataElement = this.props.items;
            if (items && global.isSuccessful(items)) {
                items = items.getActiveItems();
                //console.log(items)
            };
            //
            if (this.props.item && global.isSuccessful(this.props.item)) {
                if (this.props.multiple === true) {
                    visible = true;
                } else {
                    let data: any[] = global.getData(items, []);
                    visible = data && data.length < 1 ? true : false;
                }
            } else {
                if (this.props.item && global.isLoadingOrUpdating(this.props.item)) {
                    items.status = this.props.item.status;
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (isEmptyObject(item)) return;

                    let model = EK.Global.assign({}, {
                        ID: item.ID,
                        EntityId: item.EntityId,
                        EntityType: item.EntityType,
                        Tipo: item.Tipo,
                        Uid: item.Uid
                    });

                    global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Delete", model, this.props.slot);
                }
            };
            //
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(items, []).length].join("")} </span>;
            //
            return <KontrolFile$Input
                mode={FileInputMode.IconOnlyEKC}
                visible={visible}
                iconColor={'#ecf0f1'}
                
                onSelect={this.onSelect}
                onChange={this.onChange} />
        }
    };

    class EditKontrolFileManagerSimple extends React.Component<IKontrolFileManagerProps, {}> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onSave = this.onSave.bind(this);
        };
        onSelect(e: any): void {
            let item: any = {
                ID: 0,
                EntityId: this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity),
                EntityType: this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType),
                FileSize: 0,
                FileType: "",
                FileExtension: "",
                Tipo: this.props.tipo,
                Modulo: this.props.modulo,
                Nombre: "",
                Uid: ""
            };

            global.dispatchSuccessful("global-page-entity", item, this.props.slot);
        };
        onChange(file: File): void {
            if (file.isValid()) {
                this.onSave(file);
            } else {
                global.dispatchSuccessful("global-page-entity", {}, this.props.slot);
            }
        };
        onSave(file: File): void {
            let $page: any = $ml[PAGE_ID];

            if (file.getSize() > DEFAULT_FILE_SIZE) {
                errorMessage([$page.mensajes.fileSize, getFormatBytes(DEFAULT_FILE_SIZE, 0)].join(" "));
                return;
            };
            let slotState: any = global.getData(this.props.currentEntity.data);
            let model: any = {};
            model['ID'] = getDataID(this.props.item);
            model['EntityId'] = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            model['EntityType'] = this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType);
            model['Tipo'] = this.props.tipo;
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = this.props.modulo;
            model['Uid'] = getData(this.props.item).Uid;
            model['ClavePlantilla'] = slotState.Clave;

            let validExtension = false;
            switch (model.FileExtension.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                    validExtension = true;
                    break
            }

            //console.log(model.FileExtension, model.FileExtension.toLowerCase())
            if (!validExtension) {
                global.info('Formato de archivo no valido [SOLO SE PERMITEN JPG]')
                return;
            }

            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid,
                ClavePlantilla: model.ClavePlantilla
            });
            console.log(this.props.noAutoSave)
            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file.getFile());
            let d = new Date();

            if (this.props.noAutoSave) {
                //console.log('no guardar automatico')
                //console.log(this.props.slot)
                let tmpObj = {
                    item: model,
                    file: file.getFile(),
                    UUID: d.getTime()
                }
               // console.log(tmpObj)
               // let tmpIma = {
               //     file: {name:'_tmpimg'}}
                let savedTmpArray = EK.Store.getState().global.tmpEvidenciaCliente ? EK.Store.getState().global.tmpEvidenciaCliente.data : [];
                if (savedTmpArray.length > 0) {
                    let IdIncidencia = model.EntityId;
                    let totalincidencia = savedTmpArray.filter(x => x.item.EntityId === IdIncidencia).length;
                    if (totalincidencia === 2) {
                        global.info('Solo se permiten 2 evidencias por Incidencia');
                        return;
                    }
                    for (let e of savedTmpArray) {
                        let el: any = document.getElementById(`comentario$${e.UUID}`);
                        let comentario = el && el.value ? el.value : '';
                        e.comentario = comentario;
                    }
                }
               
                savedTmpArray.push(tmpObj);
                dispatchSuccessful('load::tmpEvidenciaCliente', savedTmpArray);

            } else {
                global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Save", data, this.props.slot);
                console.log('autosave')
            }

        };
        componentDidUpdate(prevProps: IKontrolFileManagerProps, { }): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item, false)) {
                let info: any = getData(this.props.item);

                if (info.Estado === 4) {
                    success($page.mensajes.deleted);
                } else {
                    success($page.mensajes.uploaded);
                };

                this.props.dispatchCatalogo(this.props, this.props.slot);
            };
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let visible: boolean = false;

            let items: global.DataElement = this.props.items;
            if (items && global.isSuccessful(items)) {
                items = items.getActiveItems();
                //console.log(items)
            };
            //
            if (this.props.item && global.isSuccessful(this.props.item)) {
                if (this.props.multiple === true) {
                    visible = true;
                } else {
                    let data: any[] = global.getData(items, []);
                    visible = data && data.length < 1 ? true : false;
                }
            } else {
                if (this.props.item && global.isLoadingOrUpdating(this.props.item)) {
                    items.status = this.props.item.status;
                }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (isEmptyObject(item)) return;

                    let model = EK.Global.assign({}, {
                        ID: item.ID,
                        EntityId: item.EntityId,
                        EntityType: item.EntityType,
                        Tipo: item.Tipo,
                        Uid: item.Uid
                    });

                    global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Delete", model, this.props.slot);
                }
            };
            //
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(items, []).length].join("")} </span>;
            //
            return    <KontrolFile$Input
                        mode={FileInputMode.IconOnly}
                        visible={visible}
                        iconColor={'#2c3e50'}
                        onSelect={this.onSelect}
                        onChange={this.onChange} />
        }
    };

    class EditKontrolFileManagerV2 extends React.Component<IKontrolFileManagerProps, {}> {
        constructor(props: IKontrolFileManagerProps) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onSave = this.onSave.bind(this);
        };
        onSelect(e: any): void {
            let item: any = {
                ID: 0,
                EntityId: this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity),
                EntityType: this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType),
                FileSize: 0,
                FileType: "",
                FileExtension: "",
                Tipo: this.props.tipo,
                Modulo: this.props.modulo,
                Nombre: "",
                Uid: ""
            };
            //console.log(item)
            global.dispatchSuccessful("global-page-entity", item, this.props.slot);
        };
        onChange(file: File): void {
            //console.log(file)
            if (file.isValid()) {
                this.onSave(file);
            } else {
                global.dispatchSuccessful("global-page-entity", {}, this.props.slot);
            }
        };

        onSave(file: File): void {
            let $page: any = $ml[PAGE_ID];

            if (file.getSize() > DEFAULT_FILE_SIZE) {
                errorMessage([$page.mensajes.fileSize, getFormatBytes(DEFAULT_FILE_SIZE, 0)].join(" "));
                return;
            };
            let slotState: any = global.getData(this.props.currentEntity.data);
            let model: any = {};
            model['ID'] = getDataID(this.props.item);
            model['EntityId'] = this.props.entity ? global.getDataID(this.props.entity) : global.getDataID(this.props.currentEntity);
            model['EntityType'] = this.props.entityType ? global.getData(this.props.entityType) : global.getData(this.props.currentEntityType);
            model['Tipo'] = this.props.tipo;
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = this.props.modulo;
            model['Uid'] = getData(this.props.item).Uid;
            model['ClavePlantilla'] = slotState.Clave;


            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid,
                ClavePlantilla: model.ClavePlantilla
            });

            //let data: FormData = new FormData();
            //data.append("item", JSON.stringify(model));
            //data.append("file", file.getFile());

            //console.log(data, file.getFile())

            let tmpItem = { item: JSON.stringify(model), file: file.getFile()}
            
            let arrayFiles = EK.Store.getState().global.tmpArrayFiles ? EK.Store.getState().global.tmpArrayFiles.data: [];
            arrayFiles.push(tmpItem);
            
            global.dispatchSuccessful("load::tmpArrayFiles", arrayFiles);
  
            this.renderDxTable(arrayFiles)
            //global.dispatchSuccessful("global-page-entity", data, this.props.slot)
            //global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Save", data, this.props.slot);
        };

        renderDxTable(dataSource) {
            let columnas = [
                { caption: "Nombre", dataField: "file.name" },
                { caption: "Tipo archivo", dataField: "file.type" },
                {
                    caption: 'Eliminar', type: "buttons", width: 120, alignment: "center",
                    buttons: ["Eliminar", {
                        text: "Eliminar archivo",
                        icon: "remove",
                        color: '#000',
                        hint: "Quitar archivo",
                        onClick: (e) => {
                            let indice = e.row.rowIndex;
                            let arrayFiles = EK.Store.getState().global.tmpArrayFiles ? EK.Store.getState().global.tmpArrayFiles.data : [];
                            arrayFiles.splice(indice, 1);
                            global.dispatchSuccessful("load::tmpArrayFiles", arrayFiles);
                            this.renderDxTable(arrayFiles);
                            //console.log(e)
                        }
                    }]
                }
            ];
            let dataGrid = $("#datagroupContainerImagenes").dxDataGrid({
                dataSource,
                allowColumnReordering: true,
                scrolling: {
                    columnRenderingMode: "virtual"
                },
                columnAutoWidth: true,
                showBorders: false,
                grouping: {
                    autoExpandAll: false,
                },

                columns: columnas,
                columnFixing: { enabled: true },
                showColumnLines: false,
                showRowLines: false,
                rowAlternationEnabled: true
            }).dxDataGrid("instance");
            dataGrid.refresh();
        }

        //componentDidUpdate(prevProps: IKontrolFileManagerProps, { }): any {
        //    let $page: any = $ml[PAGE_ID];
        //    if (global.wasUpdated(prevProps.item, this.props.item, false)) {
        //        let info: any = getData(this.props.item);

        //        if (info.Estado === 4) {
        //            success($page.mensajes.deleted);
        //        } else {
        //            success($page.mensajes.uploaded);
        //        };

        //        this.props.dispatchCatalogo(this.props, this.props.slot);
        //    };
        //};
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let visible: boolean = true;

            //let items: global.DataElement = this.props.items;
            //if (items && global.isSuccessful(items)) {
            //    items = items.getActiveItems();
            //    //console.log(items)
            //};
            ////
            //if (this.props.item && global.isSuccessful(this.props.item)) {
            //    if (this.props.multiple === true) {
            //        visible = true;
            //    } else {
            //        let data: any[] = global.getData(items, []);
            //        visible = data && data.length < 1 ? true : false;
            //    }
            //} else {
            //    if (this.props.item && global.isLoadingOrUpdating(this.props.item)) {
            //        items.status = this.props.item.status;
            //    }
            //};
            ////
            //let remove: any = {
            //    icon: "fa fa-trash",
            //    action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
            //        if (isEmptyObject(item)) return;

            //        let model = EK.Global.assign({}, {
            //            ID: item.ID,
            //            EntityId: item.EntityId,
            //            EntityType: item.EntityType,
            //            Tipo: item.Tipo,
            //            Uid: item.Uid
            //        });

            //        global.dispatchAsyncPut("global-page-entity", "KontrolFiles/Delete", model, this.props.slot);
            //    }
            //};
            //
           // let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                //{[global.getData(items, []).length].join("")} </span>;
            //
            return <Row>
                <OptionSection
                    level={1}
                    icon="fas fa-file-alt"
                    hideCollapseButton={true}
                    collapsed={true}
                    title={this.props.title}
                    readOnly={true}
                    subTitle={null}>
                    <SectionButtons>
                        <KontrolFile$Input
                            mode={FileInputMode.IconOnly}
                            visible={visible}
                            onSelect={this.onSelect}
                            onChange={this.onChange} />
                    </SectionButtons>
                </OptionSection>
                <Row>

                   
                        <div id="datagroupContainerImagenes" style={{ padding: '10px', background: '#fff' }}></div>
                   
                </Row>
            </Row>
           
        }
    };

    export const KontrolFileManager: any = ReactRedux.connect($KontrolFileManager.props, $KontrolFileManager.dispatchs)($KontrolFileManager);
    export const KontrolFileManagerV2: any = ReactRedux.connect($KontrolFileManager.props, $KontrolFileManager.dispatchs)($KontrolFileManagerV2);
    export const KontrolFileManagerSimple: any = ReactRedux.connect($KontrolFileManagerSimple.props, $KontrolFileManagerSimple.dispatchs)($KontrolFileManagerSimple);
    export const KontrolFileManagerEKC: any = ReactRedux.connect($KontrolFileManagerEKC.props, $KontrolFileManagerEKC.dispatchs)($KontrolFileManagerEKC);
    export const KontrolFileManagerEntregaS: any = ReactRedux.connect($KontrolFileManagerEntregaS.props, $KontrolFileManagerEntregaS.dispatchs)($KontrolFileManagerEntregaS);

};

import KontrolFileManager = EK.UX.Kontrol.KontrolFileManager;
import KontrolFileManagerV2 = EK.UX.Kontrol.KontrolFileManagerV2;
import KontrolFileManagerSimple = EK.UX.Kontrol.KontrolFileManagerSimple;
import KontrolFileManagerEKC = EK.UX.Kontrol.KontrolFileManagerEKC;
import KontrolFileManagerEntregaS = EK.UX.Kontrol.KontrolFileManagerEntregaS;
namespace EK.Modules.SCV.Pages.Prototipos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("prototipos", "scv");
    let PAGE_ID = "Prototipos de Vivienda";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus("Estatus")
                .addString("Descripcion")
                .addNumber("FrenteMinimo")
                .addNumber("Construccion")
                .addNumber("Recamaras")
                //.addObject("Recamara")
                //.addNumber("IdSalaTV")
                //.addNumber("IdCuartoServicio")
                .addNumber("Banios")
                .addObject("Inmueble")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            config.dispatchEntityBase({ id }, "Prototipos/id/", undefined, global.HttpMethod.POST);
        };
        onEntityLoaded(props: page.IProps): any {
            let CantidadUbicaciones: any = getData(props.entidad).CantidadUbicaciones;
            dispatchSuccessful("load::CantidadUbicaciones", { valor: CantidadUbicaciones });
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded} onWillEntityLoad={this.onWillEntityLoad}>
                <PageButtons>
                    <buttons.ViewerButton />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    }
    interface IPrototipos extends page.IProps {
        CantidadUbicaciones?: any;
        entity?: DataElement;
    };

    let Edit: any = global.connect(class extends React.Component<IPrototipos, IPrototipos> {
        constructor(props: IPrototipos) {
            super(props);
            this.ListaUbicaciones = this.ListaUbicaciones.bind(this);

            
        }
        static props: any = (state: any) => ({
            CantidadUbicaciones: state.global.CantidadUbicaciones,
            entity: state.global.currentEntity
        });
        ListaUbicaciones(item: any): void {
            let IdPrototipo: any = global.getCurrentContext().params.id;
            go("scv/ubicaciones/?IdPD=" + IdPrototipo + "/")
        }

        render(): JSX.Element {
            //let imagen: any = this.props.config.getEntity();
            let imagen: any = global.getDataID(this.props.entity);

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={PAGE_ID}
                            icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                                <div>
                                    {(imagen > 0) ?
                                        <Row>
                                        <Column size={[12, 3, 3, 3]}>
                                            <ImageManager modulo={config.id} viewMode={false} />
                                        </Column>
                                        <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                                        <input.Nombre size={[12, 5, 5, 5]} maxLength={150} validations={[validations.required()]} />
                                        <checkBox.Status size={[12, 2, 2, 2]} />
                                        <Input id="Descripcion" size={[12, 9, 9, 9]} validations={[validations.required()]} />
                                        <TipoInmuebleDDL id={"Inmueble"} size={[12, 3, 3, 3]} required={true} />
                                        <input.Currency id={"FrenteMinimo"} size={[12, 3, 3, 3]} required={false} />
                                        <input.Currency id={"Construccion"} size={[12, 3, 3, 3]} required={false} />
                                        <input.Integer id={"Recamaras"} size={[12, 3, 3, 3]} required={false} />
                                        <input.Currency id={"Banios"} size={[12, 3, 3, 3]} required={false} />
                                        </Row>
                                    :
                                    <Column>
                                        <Row>
                                         <input.Clave size={[12, 3, 3, 3]} maxLength={50} />
                                         <input.Nombre size={[12, 7, 7, 7]} maxLength={150} validations={[validations.required()]} />
                                         <checkBox.Status size={[12, 2, 2, 2]} />
                                        </Row>

                                        <Row>
                                         <Input id="Descripcion" size={[12, 9, 9, 9]} validations={[validations.required()]} />
                                         <TipoInmuebleDDL id={"Inmueble"} size={[12, 3, 3, 3]} required={true} />
                                        </Row>

                                        <Row>
                                         <input.Currency id={"FrenteMinimo"} size={[12, 3, 3, 3]} required={false} />
                                         <input.Currency id={"Construccion"} size={[12, 3, 3, 3]} required={false} />
                                         <input.Integer id={"Recamaras"} size={[12, 3, 3, 3]} required={false} />
                                         <input.Currency id={"Banios"} size={[12, 3, 3, 3]} required={false} />
                                        </Row>
                                    </Column>
                                    }
                                </div>
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <div className="panel panel-main   panel-sub1">
                            <div className="panel-heading-top panel-sub1">
                                <div className="actions" >
                                    <button onClick={this.ListaUbicaciones} className="btn-ico-ek"><i className=" font-white fa fa-chevron-right"></i></button>
                                </div>
                            </div>
                            <div className="panel-heading panel-sub1">
                                <div className="caption panel-sub1"><i className="fa fa-home"></i>
                                    <span className="caption-subject">Ubicaciones </span>
                                    <span className="badge badge-success">{getData(this.props.CantidadUbicaciones).valor}</span>
                                </div>
                            </div>
                        </div>
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                       
                            
                            < KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
            
                       
                       
                    </Column>
                </Row>
            </page.Edit>;
        }
    });

    let View: any = global.connect(class extends React.Component<IPrototipos, IPrototipos> {
        constructor(props: IPrototipos) {
            super(props);
            this.ListaUbicaciones = this.ListaUbicaciones.bind(this);
        }
        static props: any = (state: any) => ({
            CantidadUbicaciones: state.global.CantidadUbicaciones
        });
        ListaUbicaciones(item: any): void {
            let IdPrototipo: any = global.getCurrentContext().params.id;
            go("scv/ubicaciones?IdPD=" + IdPrototipo)
        }
        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={PAGE_ID}
                            icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <Column size={[12, 3, 3, 3]}>
                                    <ImageManager modulo={config.id} viewMode={true} />
                                </Column>
                                <label.Clave size={[12, 2, 2, 2]} />
                                <label.Nombre size={[12, 5,5, 5]} />
                                <label.Estatus  size={[12, 2, 2, 2]} />
                                <Label id="Descripcion" size={[9, 9, 9, 9]} />
                                <label.General id="Inmueble" size={[12, 3, 3, 3]} />
                                <Label id="FrenteMinimo" size={[12, 3, 3, 3]} />
                                <Label id="Construccion" size={[12, 3, 3, 3]} />
                                <Label id="Recamaras" size={[12, 3, 3, 3]} />
                                <Label id="Banios" size={[12, 3, 3, 3]} />
                             
                            </Row>

                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <div className="panel panel-main   panel-sub1">
                            <div className="panel-heading-top panel-sub1">
                                <div className="actions">
                                    <button onClick={this.ListaUbicaciones} className="btn-ico-ek"><i className=" font-white fa fa-chevron-right"></i></button>
                                </div>
                            </div>
                            <div className="panel-heading panel-sub1">
                                <div className="caption panel-sub1"><i className="fa fa-home"></i>
                                    <span className="caption-subject">Ubicaciones </span>
                                    <span className="badge badge-success">{ getData(this.props.CantidadUbicaciones).valor}</span>
                                </div>
                            </div>
                        </div>
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <KontrolFileManager modulo={config.id} viewMode={true} multiple={true} />
                    </Column>
                </Row>
            </page.View>;
        }
    });
};
//namespace EK.Modules.SCV.Pages.Prototipos {
//    "use strict";
//    const PAGE_ID: string = "prototipos";
//    const PAGE_MODULO: string = "scv";

//    interface IParams {
//        id: any;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        obtenerCatalogo?: () => void;
//        item?: any;
//        params?: IParams;
//        guardar?: (item: any) => void;
//        isNew?: boolean;
//        global?: any;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPagePrototiposEditar extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: this.props.isNew ? false : true };
//        };

//        static defaultProps: IProps = {
//            global: {},
//            isNew: false
//        };

//        editForm(): void {
//            Forms.remove(PAGE_ID);
//            this.setState({ viewMode: false });
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", getDataID(this.props.item))
//                .addString("Nombre")
//                .addString("Clave")
//                .addEstatus("Estatus")
//                .addString("Descripcion")
//                .addNumber("FrenteMinimo")
//                .addNumber("Construccion")
//                .addNumber("Recamaras")
//                .addObject("Recamara")
//                .addNumber("IdSalaTV")
//                .addNumber("IdCuartoServicio")
//                .addNumber("Banios")
//                .addObject("Inmueble")
//                .toObject();
//            this.props.guardar(model);
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            if (!this.props.isNew && !this.state.viewMode) {
//                Forms.remove(PAGE_ID);
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.goBack();
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return (hasChanged(this.props.item, nextProps.item)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            requireGlobal(Catalogos.estatus);
//            if (!this.props.isNew) {
//                let id: number = Number(this.props.params.id);
//                if (id > 0) {
//                    this.props.cargarDatos(id);
//                } else {
//                    dispatchFailed("scv-prototipos-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("scv-prototipos-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentWillReceiveProps(nextProps: IProps) {
//            if (hasChanged(this.props.item, nextProps.item)) {
//                setCurrentEntity(nextProps.item);
//            };
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.item, this.props.item)) {
//                success($page.mensajes.exito);
//                this.props.obtenerCatalogo();
//                this.setState({ viewMode: true });
//            };
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.prototipos];

//            let editView: boolean = !this.state.viewMode;
//            let title: IPageTitle;
//            let current: any = this.props.item.data;

//            title = {
//                title: !this.props.isNew ? $page.editar.title : $page.nuevo.title,
//                subTitle: !this.props.isNew ? current.Nombre : "",
//                children: !this.props.isNew ? [EK.UX.Labels.badgeEstatus(current.Estatus)] : null
//            };

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.item}>
//                        {!editView
//                            ? <View
//                                item={current} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={current} />
//                        }
//                        <KontrolFileManager modulo={PAGE_MODULO} viewMode={this.state.viewMode} />
//                    </PanelUpdate>
//                </PageV2>
//            return page;
//        }
//    };

//    class $PrototiposPage {
//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.prototipos.selected
//            };
//        };

//        static mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            cargarDatos: (id: number): void => {
//                dispatchAsync("scv-prototipos-setSelected", "Prototipos/GetById/" + id)
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "svc-prototipos-guardar",
//                    type: HttpMethod.PUT,
//                    url: "Prototipos/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("scv-prototipos-catalogo", "Prototipos/GetAll(catalogo,0)");
//            }
//        });
//    };

// export let Edicion: any = ReactRedux.connect($PrototiposPage.mapProps, $PrototiposPage.mapDispatchs)(ConnectedPagePrototiposEditar);

//    export class Nuevo extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <Edicion isNew={true} />
//        }
//    };

//    interface IViewProps extends React.Props<any> {
//        item: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let SalaTV: boolean = current.IdSalaTV === 1 ? $page.checked.true : $page.checked.false;
//            let CuartoServicio: boolean = current.IdCuartoServicio === 1 ? $page.checked.true : $page.checked.false;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 12, 12, 3]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 9]} />
//                    <Label label={$page.form.descripcion.label} value={current.Descripcion} size={[12, 12, 12, 12]} />
//                    <Label label={$page.form.tipoinmueble.label} value={current.Inmueble.Nombre} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.frenteminimo.label} value={current.FrenteMinimo} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.construccion.label} value={current.Construccion} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.recamaras.label} value={current.Recamaras} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.recamaraadicional.label} value={current.Recamara.Nombre} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.salatv.label} value={SalaTV} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.cuartoservicio.label} value={CuartoServicio} size={[12, 6, 6, 3]} />
//                    <Label label={$page.form.banios.label} value={current.Banios} size={[12, 6, 6, 3]} />      
//                </Row>
//            </FadeInColumn>
//        }
//    };

//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        refs: {
//            form: any;
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let SalaTV: boolean = this.props.isNew ? true : (current.IdSalaTV === 1) ? true : false;
//            let CuartoServicio: boolean = this.props.isNew ? true : (current.IdCuartoServicio === 1) ? true : false;
//            let Recamara: any = (current.Recamara && current.Recamara.ID > 0) ? current.Recamara : undefined;
//            let Inmueble: any = (current.Inmueble && current.Inmueble.ID > 0) ? current.Inmueble : undefined;

//            return <FadeInColumn>
//                <Row>
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <Input
//                        id={"Clave"}
//                        label={$page.form.clave.label}
//                        size={[12, 12, 12, 3]}
//                        required={true}
//                        value={current.Clave}
//                        helpLabel={$page.form.clave.helplabel}
//                        maxLength={50}
//                        validations={[
//                            validations.required($page.form.clave.validaciones.requerida)
//                        ]} />
//                    <Input
//                        id={"Nombre"}
//                        label={$page.form.nombre.label}
//                        size={[12, 12, 12, 6]}
//                        required={true}
//                        value={current.Nombre}
//                        helpLabel={$page.form.nombre.helplabel}
//                        maxLength={150}
//                        validations={[
//                            validations.required($page.form.nombre.validaciones.requerida)
//                        ]} />
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label={$page.form.estatus.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 12 }}
//                        lg={{ size: 3 }}
//                        required={false}
//                        value={Status}
//                        helpLabel={$page.form.estatus.helplabel}
//                        disabled={false} />
//                </Row>
//                <Row>
//                    <Input
//                        id="Descripcion"
//                        label={$page.form.descripcion.label}
//                        size={[12, 12, 12, 12]}
//                        required={true}
//                        value={current.Descripcion}
//                        helpLabel={$page.form.descripcion.helplabel}
//                        maxLength={250}
//                        validations={[
//                            validations.required($page.form.descripcion.validaciones.requerida)
//                        ]} />
//                </Row>
//                <Row>
//                    <TipoInmuebleDDL
//                        id={"Inmueble"}
//                        size={[12, 6, 6, 3]}
//                        helpLabel={$page.form.tipoinmueble.helplabel}
//                        items={Inmueble}
//                        itemValue={"Nombre"}
//                        itemKey={"ID"}
//                        value={Inmueble}
//                        required={false} />
//                    <Input
//                        id={"FrenteMinimo"}
//                        label={$page.form.frenteminimo.label}
//                        size={[12, 6, 6, 3]}
//                        required={true}
//                        value={current.FrenteMinimo}
//                        helpLabel={$page.form.frenteminimo.helplabel}
//                        maxLength={50} />
//                    <Input
//                        id={"Construccion"}
//                        label={$page.form.construccion.label}
//                        size={[12, 6, 6, 3]}
//                        required={true}
//                        value={current.Construccion}
//                        helpLabel={$page.form.construccion.helplabel}
//                        maxLength={50}
//                        validations={[
//                            validations.required($page.form.construccion.validaciones.requerida)
//                        ]} />
//                    <Input
//                        id={"Recamaras"}
//                        label={$page.form.recamaras.label}
//                        size={[12, 6, 6, 3]}
//                        required={false}
//                        value={current.Recamaras}
//                        helpLabel={$page.form.recamaras.helplabel}
//                        maxLength={50} />
//                </Row>
//                <Row>
//                    <RecamaraAdicionalDDL
//                        id={"Recamara"}
//                        size={[12, 6, 6, 3]}
//                        helpLabel={$page.form.recamaraadicional.helplabel}
//                        label={$page.form.recamaraadicional.label}
//                        items={Recamara}     
//                        itemValue={"Nombre"}
//                        itemKey={"ID"}
//                        value={Recamara}
//                        required={false} />
//                    <CheckBox
//                        id={"IdSalaTV"}
//                        label={$page.form.salatv.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 6 }}
//                        md={{ size: 6 }}
//                        lg={{ size: 3 }}
//                        required={false}
//                        value={SalaTV}
//                        helpLabel={$page.form.salatv.helplabel}
//                        disabled={false} />
//                    <CheckBox
//                        id={"IdCuartoServicio"}
//                        label={$page.form.cuartoservicio.label}
//                        xs={{ size: 12 }}
//                        sm={{ size: 6 }}
//                        md={{ size: 6 }}
//                        lg={{ size: 3 }}
//                        required={false}
//                        value={CuartoServicio}
//                        helpLabel={$page.form.cuartoservicio.helplabel}
//                        disabled={false} />
//                    <Input
//                        id={"Banios"}
//                        label={$page.form.banios.label}
//                        size={[12, 6, 6, 3]}
//                        required={true}
//                        value={current.Banios}
//                        helpLabel={$page.form.banios.helplabel}
//                        maxLength={50} />
//                </Row>
//            </FadeInColumn>
//        };
//    };

//    export interface IDropDrownListState {
//        initialValue?: string;
//        currentValue?: string;
//    }

//    export class TipoInmueble$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
//        static props: any = (state: any) => ({
//            items: state.global.TIPOINMUEBLE
//        });

//        static defaultProps: IDropDrownListProps = {
//            id: "Inmueble",
//            items: createDefaultStoreObject([]),
//            label: "Tipo de Inmueble",
//            helpLabel: "Seleccione un Tipo de Inmueble",
//            value: createDefaultStoreObject({}),
//            initialValue: undefined,
//            hasChanged: false,
//            hasValidationError: false,
//            required: false,
//            itemKey: "ID",
//            itemValue: "Nombre",
//            size: [12, 12, 6, 6]
//        };

//        componentDidMount(): void {
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                dispatchAsync("load::TIPOINMUEBLE", "catalogos/get(TIPOINMUEBLE)");
//            };
//        };

//        render(): any {
//            return <EK.Modules.SCV.Pages.Prototipos.DropDownLists.DropdownList$Form {...this.props} />;
//        };
//    };
//    export class RecamaraAdicional$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
//        static props: any = (state: any) => ({
//            items: state.global.RECAMARAS
//        });

//        static defaultProps: IDropDrownListProps = {
//            id: "Recamara",
//            items: createDefaultStoreObject([]),
//            label: "Recamara Adicional",
//            helpLabel: "Seleccione una Recamara Adicional",
//            value: createDefaultStoreObject({}),
//            initialValue: undefined,
//            hasChanged: false,
//            hasValidationError: false,
//            required: false,
//            itemKey: "ID",
//            itemValue: "Nombre",
//            size: [12, 12, 6, 6]
//        };

//        componentDidMount(): void {
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                dispatchAsync("load::RECAMARAS", "catalogos/get(RECAMARAS)");
//            };
//        };

//        render(): any {
//            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
//        };
//    };


//export const TipoInmuebleDDL: any =
//    ReactRedux.connect(TipoInmueble$DDL.props, null)(TipoInmueble$DDL);
//    export const RecamaraAdicionalDDL: any =
//        ReactRedux.connect(RecamaraAdicional$DDL.props, null)(RecamaraAdicional$DDL);
//}
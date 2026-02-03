namespace EK.Modules.Kontrol.Pages.Companias {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("companias", "kontrol");
    let PAGE_ID = "Compañias";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            if (this.onValidateCompania(item)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            }
            else
            {
                let model: any = item
                    .addID()
                    .addClave()
                    .addNombre()
                    .addString("Rfc")
                    .addObject("Cliente")
                    .addString("Domicilio")
                    .addObject("Asentamiento")
                    .addBoolean("Vivienda")
                    .addObject("MonedaBase")
                    .addObject("TimeZone")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                return model;
            }
        };
        onValidateCompania(item: any): boolean {
            let result: boolean = true;
            if (item.MonedaBase && item.MonedaBase.ID && item.Clave && item.Nombre && item.TimeZone && item.TimeZone.ID)
            {
                result = false;
            }
            return result;
        }
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onSave={this.saveForm}
                onValidateCompania={this.onValidateCompania}
                allowDelete={false}
                allowEdit={false}
                allowNew={false}
                allowView={true}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[6, 2, 2, 2]} maxLength={2} />
                            <input.Nombre size={[6, 6, 6, 6]} />
                            <input.RFC id="Rfc" size={[6, 2, 2, 2]}  />
                            <checkBox.Status size={[6, 2, 2, 2]} />
                            <input.Text id="Domicilio" size={[12, 6, 6, 6]} />
                            <select.Asentamientos id="Asentamiento" size={[12, 6, 6, 6]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id="Configuracion"
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fa fa-cogs">
                        <Row>
                            <checkBox.CheckBox id="Vivienda" size={[6, 2, 2, 2]} />
                            <ddl.MonedasDDL id="MonedaBase" required={true} size={[6, 4, 4, 4]} validations={[validations.required()]}  />
                            <ddl.ZonaHorariaDDL size={[6, 6, 6, 6]} validations={[validations.required()]}/>
                        </Row>
                    </page.OptionSection>
                 </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[6, 2, 2, 2]} />
                            <label.Nombre size={[12, 6, 6, 6]} />
                            <label.Label id="Rfc" size={[6, 2, 2, 2]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                            <label.Label id="Domicilio" size={[12, 6, 6, 6]} />
                            <label.Asentamiento size={[12, 6, 6, 6]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id="Configuracion"
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fa fa-cogs">
                        <Row>                        
                            <label.Boolean id="Vivienda" size={[2, 2, 2, 2]} />
                            <label.Entidad id="MonedaBase" size={[10, 5, 5, 5]} />
                            <label.Entidad id="TimeZone" size={[12, 5, 5, 5]} />
                        </Row>
                    </page.OptionSection>
               </Column>
            </page.View>;
        };
    };
};
//<label.Custom id="AplicaVivienda" isHTML={true} valueStyle={{ backgroundColor: "#fff" }} value={(e) => { return e && e.AplicaVivienda === true ? "<span class='bold'>SI</span>" : "NO"; } } size={[2, 2, 2, 2]}/>
//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "companias";
//    const idForm: string = "companias";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface ICompaniasParams {
//        id: any;
//    }

//    interface ICompaniasProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        compania: any;
//        params?: ICompaniasParams;
//        history?: any[];
//        global?: any;
//        localidades?: any[];
//        clientes?: any[];
//        guardar?: (item: any) => void;
//        isNew?: boolean;
//        clientesSelected?: any;
//    }

//    interface ICompaniasState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarCompanias extends React.Component<ICompaniasProps, ICompaniasState> {
//        constructor(props: ICompaniasProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);

//            this.state = { viewMode: true };
//        }

//        static defaultProps: ICompaniasProps = {
//            isNew: false,
//            compania: undefined,
//            global: {}
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let compania: any = item
//                .addNumberConst("ID", this.props.compania.data.ID != undefined ? this.props.compania.data.ID : 0)
//                .addString("Clave")
//                .addString("Nombre")
//                .addString("Rfc")
//                .addString("Domicilio")
//                .addEstatus("Estatus")
//                .addObject("Localidad")
//                .addObject("AplicaVivienda")
//                .toObject();
//            this.props.guardar(compania);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            let $bc: any = $ml.bc;
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push($bc.kontrol.companias.link);
//            }
//        }

//        shouldComponentUpdate(nextProps: ICompaniasProps, nextState: ICompaniasState): boolean {
//            return (hasChanged(this.props.compania, nextProps.compania)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("companias-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("companias-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: ICompaniasProps, prevState: ICompaniasProps): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.compania, this.props.compania)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.companias];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;
//            let compania: any = this.props.compania.data;

//            let dateFormat: (data: Date, type: any, row: any[]) => string = (data, type, row) => {
//                var pad = "00";
//                return (data != undefined || data != null) ?
//                    (pad + data.getDate().toString()).slice(-pad.length) + "/" +
//                    (pad + (data.getMonth() + 1).toString()).slice(-pad.length) + "/" +
//                    data.getFullYear() : "";
//            };

//            let columnasCliente: any[] = [
//                { "title": "ID", "data": "ID" },
//                { "title": "Clave", "data": "Clave" },
//                { "title": "Cliente", "data": "Nombre" },
//                { "title": "Inicio de Vigencia", "data": "VigenciaInicio", dateFormat },
//                { "title": "Fin de Vigencia", "data": "VigenciaFin", dateFormat }
//            ];

//            let title: IPageTitle = {
//                title: !this.props.isNew ? compania.Nombre : $page.edit.titulo,
//                subTitle: !this.props.isNew ? compania.Clave : "",
//                children: [EK.UX.Labels.badgeEstatus(compania.Estatus)]
//            };

//            let status: AsyncActionTypeEnum =
//                (!this.props.compania || !this.props.compania.status) ? AsyncActionTypeEnum.default : this.props.compania.status;

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.compania}>
//                        {!this.props.isNew && this.state.viewMode
//                            ? <View item={compania} />
//                            : <Edit isNew={this.props.isNew}
//                                item={compania}
//                                clientesSelected={this.props.clientesSelected} />}
//                    </PanelUpdate>
//                </PageV2 >;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            compania: state.companias.selected,
//            history: state.companias.history[state.companias.selected.data.ID],
//            clientesSelected: state.global.cliente
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.companias.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "companias-setSelected",
//                    url: "Companias/GetById/" + id
//                }));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "companias-guardar",
//                    type: HttpMethod.PUT,
//                    url: "companias/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PageCompaniaCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarCompanias);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevaCompania extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageCompaniaCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//        cliente?: any;
//        clientesSelected?: any;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let aplicaV: boolean = this.props.isNew ? true : (current.AplicaVivienda === "1") ? true : false;
//            let IdCliente: number = this.props.isNew ? 0 : current.Cliente.ID;
//            let localidad: any = (current.Localidad && current.Localidad.ID > 0) ? current.Localidad : undefined;

//            return <FadeInColumn>
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <Input id="IdCliente" value={IdCliente} label="" visible={false} />
//                <Input
//                    id="Clave"
//                    label={$page.form.clave.label}
//                    size={[12, 6, 6, 2]}
//                    helpLabel={$page.form.clave.helplabel}
//                    value={current.Clave}
//                    maxLength={2}
//                    validations={[
//                        validations.required($page.form.clave.validaciones.requerido)
//                    ]} />
//                <Input
//                    id="Nombre"
//                    label={$page.form.nombre.label}
//                    size={[12, 6, 6, 7]}
//                    helpLabel={$page.form.nombre.helplabel}
//                    value={current.Nombre}
//                    maxLength={250}
//                    validations={[
//                        validations.required($page.form.nombre.validaciones.requerido)
//                    ]} />
//                <Input
//                    id="Rfc"
//                    label={$page.form.rfc.label}
//                    size={[12, 6, 6, 3]}
//                    required={true}
//                    helpLabel={$page.form.rfc.helplabel}
//                    value={current.Rfc}
//                    mask={"AAA-999999-***"}
//                    maxLength={14}
//                    validations={[
//                        validations.required($page.form.rfc.validaciones.requerido)
//                    ]} />

//                <Input
//                    id="Domicilio"
//                    label={$page.form.domicilio.label}
//                    size={[12, 6, 6, 10]}
//                    helpLabel={$page.form.domicilio.helplabel}
//                    value={current.Domicilio}
//                    maxLength={300} />

//                <CheckBoxStatus
//                    id="Estatus"
//                    label={$page.form.estatus.label}
//                    xs={{ size: 6 }}
//                    sm={{ size: 2 }}
//                    md={{ size: 2 }}
//                    lg={{ size: 2 }}
//                    helpLabel={$page.form.estatus.helplabel}
//                    value={Status} />
//                <CheckBox
//                    id="AplicaVivienda"
//                    label={$page.form.vivienda.label}
//                    xs={{ size: 6 }}
//                    sm={{ size: 2 }}
//                    md={{ size: 2 }}
//                    lg={{ size: 2 }}
//                    helpLabel={$page.form.vivienda.helplabel}
//                    value={aplicaV} />
//                <Select
//                    id={"Localidad"}
//                    label={$page.form.localidad.label}
//                    remoteUrl={"Localidades/GetAsentamientos"}
//                    mode={SelectModeEnum.Single}
//                    itemFormatter={(index: number, item: any) => { return <h5>{item.Nombre}</h5> } }
//                    suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div> } }
//                    size={[12, 12, 12, 6]}
//                    helpLabel={$page.form.localidad.helplabel}
//                    itemLabel={"localidad"}
//                    itemValue={"Nombre"}
//                    itemKey={"ID"}
//                    value={localidad}
//                    required={true} />
//                {!this.props.isNew ?

//                    <Label
//                        id="Cliente"
//                        label={$page.form.cliente.label}
//                        value={current.Cliente.Nombre}
//                        xs={{ size: 12 }}
//                        sm={{ size: 6 }}
//                        md={{ size: 6 }}
//                        lg={{ size: 6 }} /> :
//                    <Select
//                        id={"Cliente"}
//                        label={"Cliente"}
//                        remoteUrl={"Clientes/Search"}
//                        mode={SelectModeEnum.Single}
//                        itemFormatter={(index: number, item: any) => { return <h5>{item.Nombre}</h5> } }
//                        suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div> } }
//                        size={[12, 12, 12, 6]}
//                        helpLabel={$page.form.cliente.helplabel}
//                        itemLabel={"cliente"}
//                        itemValue={"Nombre"}
//                        itemKey={"ID"}
//                        value={this.props.clientesSelected == undefined ? undefined : this.props.clientesSelected.data} />
//                }
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
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
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.cliente.label} value={current.Cliente.Nombre} size={[12, 12, 12, 12]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 10, 10, 10]} />
//                    <Label label={$page.form.clave.label} value={current.Clave} size={[12, 2, 2, 2]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/
//}
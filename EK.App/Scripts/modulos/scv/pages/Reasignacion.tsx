namespace EK.Modules.SCV.Pages.Reasignacion {
    "use strict";

    let PAGE_ID = "Reasignacion";
    
    const scv_Prospectos_Reasignar: string = "ProspectosReasignar";
    const scv_Prospectos_Reasignados: string = "ProspectosReasignados";
    const scv_Expedientes_Reasignar: string = "ExpedientesReasignar";
    const scv_Expedientes_Reasignados: string = "ExpedientesReasignados";
    let idAgente:any= 1;
    const config: page.IPageConfig = global.createPageConfig("Reasignacion", "scv", [
                                                scv_Prospectos_Reasignar,
                                                scv_Prospectos_Reasignados,
                                                scv_Expedientes_Reasignados,
                                                scv_Expedientes_Reasignar
                                                ]);
    
    let $page: any;
    
    interface IReasignacion extends page.IProps {
        estadoEntidad: any;
        AgenteOrigen?: any;
        AgenteDestino?: any;
    }

    interface IEditProps extends page.IProps {
        item?: any;
        mode?: any;
        ViewMode?: any;
        config?: any;
        ProspectosReasignar: DataElement;
        ProspectosReasignados: DataElement;
        ExpedientesReasignar: DataElement;
        ExpedientesReasignados: DataElement;
    }
    
    interface IReasignacionView extends page.IProps {
        Reasignacion?: any;
    }

    let Edit: any = global.connect(class extends React.Component<IReasignacionView, IReasignacionView>{
        constructor(props: IReasignacionView) {
            super(props);
        };
        static props: any = (state: any) => ({
        })

        render(): JSX.Element {
            if (global.isSuccessful(this.props.entidad)) {
                idAgente = global.getDataID(this.props.entidad);
            }
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                    </Column>
                    </Row>
                 </page.Edit>
        }
    });
    
    
    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f != null) {
           global.dispatchAsyncPost("global-current-catalogo", "base/scv/Reasignacion/GetBP/GetAll", { parametros: f });
        }
    };
    export let Vista: any = global.connect(class extends React.Component<IReasignacion, IReasignacion> {
        constructor(props:IReasignacion)
        {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.AgenteOrigen = Forms.getValue("AgenteOrigen", config.id, state);
            retValue.AgenteDestino = Forms.getValue("AgenteDestino", config.id, state);
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        onFilter(props: any, filters: any, type?: string): any {
            global.dispatchSuccessful("global-page-data", [], scv_Prospectos_Reasignar);
            global.dispatchSuccessful("global-page-data", [], scv_Expedientes_Reasignar);
            global.dispatchSuccessful("global-page-data", [], scv_Prospectos_Reasignados);
            global.dispatchSuccessful("global-page-data", [], scv_Expedientes_Reasignados);
        };   
        componentDidMount() {
            dispatchSuccessful("load::currentEntityState", { viewMode: true })
        }
        componentWillReceiveProps(nextProps: IReasignacion, nextState: IReasignacion): any {
            if (global.hasChanged(this.props.AgenteOrigen, nextProps.AgenteOrigen)) {
                let idEntidad = nextProps.AgenteOrigen.ID;
                let parametros: any = global.assign({ Agente: idEntidad });
                //let parametros = 1;

                //if (nextProps.AgenteOrigen.ID > 0) {
                    global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionProspecto", { parametros }, scv_Prospectos_Reasignar);
                    global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionExpediente", { parametros }, scv_Expedientes_Reasignar);
                //} 
                    
            }
            else if (global.hasChanged(this.props.AgenteDestino, nextProps.AgenteDestino)) {
                let idEntidad = nextProps.AgenteDestino.ID;
                let parametros: any = global.assign({ Agente: idEntidad});
                    global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionProspecto", {parametros}, scv_Prospectos_Reasignados);
                    global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionExpediente", {parametros}, scv_Expedientes_Reasignados);
            }
        };

        render(): JSX.Element {
            //let entidad: any = getData(this.props.revisionVigente);
            let modoVista: boolean = getData(this.props.estadoEntidad).viewMode;
            let agenteorigen: any = this.props.AgenteOrigen;

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowDelete={false}
                allowNew={false}
                allowView={false}
                onFilter={this.onFilter}>
                <Column style={{ paddingBottom: 20 }} size={[12, 12, 12, 12]}>
                    <ddl.UsuariosDescendientesDDL label="AGENTE ORIGEN" id={"AgenteOrigen"} idForm={config.id} size={[12, 12, 6, 6]} style={{ paddingRight: 20 }} addNewItem={"SO"} />
                    <UsuariosDescendientesDestinoDDL label="AGENTE DESTINO" id={"AgenteDestino"} idForm={config.id} size={[12, 12, 6, 6]} style={{ paddingLeft: 20, paddingRight: 20 }} addNewItem={"SO"} />
                </Column>

                <PageButtons>
                    <SaveReassignmentButton />
                </PageButtons>
                    <SeccionReasignar />
                    <SeccionReasignados/>
            </page.Main>;
        };
    });

    export let UsuariosDescendientesDestinoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.USUARIOSDESCENDIENTES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Usuario",
            items: createDefaultStoreObject([]),
            label: "Usuario",
            helpLabel: "Seleccione un usuario",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span style='font-size: 90%'>",
                            item.Nombre, " ", item.Apellidos,
                            "</span>",
                        ].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                    ].join(""));
                } else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos, " ",
                        "</span>",
                        "<span class='badge badge-info bold'>",
                        item.Posicion.Nombre,
                        "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                    ].join(""));
                };
                return $([
                    "<span style='font-size: 90%'>",
                    item.Nombre, " ", item.Apellidos, " ",
                    "</span>",
                    "<span class='badge badge-info bold'>",
                    item.Posicion.Nombre,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::USUARIOSDESCENDIENTES", "usuarios/GetUsersDescendientes/true/false");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    export let SeccionReasignar: any = global.connect(class extends React.Component<IReasignacion, IReasignacion>{
        constructor(props: IReasignacion) {
            super(props);
        }

        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        }
        
        render(): JSX.Element {
            var tit = "A";
            let modoVista: boolean = getData(this.props.estadoEntidad).viewMode;
            return <Column size={[12, 12, 6, 6]} style={{ paddingTop: 0 }}>
                <page.SectionList
                    id={scv_Prospectos_Reasignar}
                    parent={config.id}
                    idParent={config.id}
                    level={1}
                    title="Prospectos-Clientes por Reasignar"
                    icon="fas fa-share-square"
                    size={[12, 12, 12, 12]}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo Persona"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"RFC"}</Column>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Titular"}</Column>
                            </Row>
                        </div>
                    }
                    items={createSuccessfulStoreObject([])} readonly={false}
                    selectable={true}
                    horizontalScrolling={true}
                    drawOddLine={true}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                       // var idprosSelect = "prospectSelect" + item.ID;
                       var prospectSelect = Forms.getValue("prospectSelect", config.id);
                       var checkState: boolean = false;
                        return <Row>
                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                <span><checkBox.CheckBox textAlign="center" property={scv_Prospectos_Reasignar}
                                    value={checkState} id={"prospectoSelect"} index={index} idFormSection={config.id} /></span>
                            </Column>
                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                <span>{item.ID}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-left-item">
                                <span>{item.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item">
                                <span>{item.TipoPersona.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span>{item.RFC}</span>
                            </Column>
                            <Column size={[12, 1, 1, 1]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span>{item.EstatusCliente.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-center-item" style={{ paddingTop: 5 }}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.ok(tit)}</span>
                            </Column>

                        </Row>;
                    }}>
                    <SectionButtons>
                        <CancelButton idFormSection={scv_Prospectos_Reasignar} iconOnly={true} className="" style={null} key="cancelButtonKey"></CancelButton>
                    </SectionButtons>
                </page.SectionList>

                <page.SectionList
                    id={scv_Expedientes_Reasignar}
                    parent={config.id}
                    idParent={config.id}
                    level={1}
                    title="Expedientes por Reasignar"
                    icon="fas fa-sign-out-alt"
                    size={[12, 12, 12, 12]}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                                <Column size={[12, 4, 4, 4]} style={{ paddingRight: 40 }} className="list-center-header">{"Desarrollo"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-center-header">{"Tipo Comercializacion"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Fase"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Esquema"}</Column>
                            </Row>
                        </div>
                    }
                    items={createSuccessfulStoreObject([])} readonly={false}
                    selectable={true}
                    horizontalScrolling={true}
                    drawOddLine={true}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        var expedientSelect = "expedientSelect";
                        var checkState: boolean = false;
                        return <Row>
                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                <span><checkBox.CheckBox textAlign="center" property={scv_Expedientes_Reasignar}
                                    value={checkState} index={index} id={"expedientSelect"} idFormSection={config.id} /></span>
                            </Column>
                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                <span>{item.ID}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-left-item" style={{ paddingLeft: 2 }}>
                                <span style={{ fontSize: 10 }}>{item.Cliente.Nombre}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-center-item" style={{ paddingRight: 40 }}>
                                <span style={{ fontSize: 10 }}>{item.Desarrollo.Nombre}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-default-item" style={{ paddingRight: 50 }}>
                                <span style={{ fontSize: 10 }}>{item.TipoComercializacion.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ paddingLeft: 2 }}>
                                <span style={{ fontSize: 10 }}>{item.Fase.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                <span style={{ fontSize: 10 }}>{item.Esquema.Nombre}</span>
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>

            </Column>
        }
    })

    export let SeccionReasignados: any = global.connect(class extends React.Component<IReasignacion, IReasignacion>{
        constructor(props: IReasignacion) {
            super(props);
        }

        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        }

        render(): JSX.Element {
            var tit = "A";
            return <Column size={[12, 12, 6, 6]} style={{ paddingTop: 0 }}>
                <page.SectionList
                    id={scv_Prospectos_Reasignados}
                    parent={config.id}
                    idParent={config.id}
                    level={1}
                    title="Prospectos-Clientes Reasignados"
                    icon="fa fa-users"
                    size={[12, 12, 12, 12]}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo Persona"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"RFC"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Estatus"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Titular"}</Column>
                            </Row>
                        </div>
                    }
                    items={createSuccessfulStoreObject([])} readonly={false}
                    selectable={true}
                    horizontalScrolling={true}
                    drawOddLine={true}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        return <Row>
                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                <span>{item.ID}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-left-item">
                                <span>{item.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item">
                                <span>{item.TipoPersona.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span>{item.RFC}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span>{item.EstatusCliente.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-center-item" style={{ paddingTop: 5 }}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.ok(tit)}</span>
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
                <page.SectionList
                    id={scv_Expedientes_Reasignados}
                    parent={config.id}
                    idParent={config.id}
                    level={1}
                    title="Expedientes Reasignados"
                    icon="fas fa-folder"
                    size={[12, 12, 12, 12]}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Desarrollo"}</Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Tipo Comercializacion"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Fase"}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Esquema"}</Column>
                            </Row>
                        </div>}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    selectable={true}
                    horizontalScrolling={true}
                    drawOddLine={true}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        return <Row>
                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                <span>{item.ID}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-left-item" style={{ paddingLeft: 2 }}>
                                <span style={{ fontSize: 10 }}>{item.Cliente.Nombre}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-left-item">
                                <span style={{ fontSize: 10 }}>{item.Desarrollo.Nombre}</span>
                            </Column>
                            <Column size={[12, 4, 4, 4]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span>{item.TipoComercializacion.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span style={{ fontSize: 10 }}>{item.Fase.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-left-item" style={{ paddingTop: 5 }}>
                                <span style={{ fontSize: 9 }}>{item.Esquema.Nombre}</span>
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </Column>
        }
    })
    
    export interface IEditar extends EK.UX.Buttons.IButtonProps {
        item?: any;
    }
    
    interface ISaveReassignmentButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        ml?: string;
        filterEstadoReasignacion?: any;
        config?: page.IPageConfig;
    }
    let SaveReassignmentButton: any = global.connect(class extends React.Component<ISaveReassignmentButton, {}> {
        constructor(props: ISaveReassignmentButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.AgenteOrigen = Forms.getValue("AgenteOrigen", config.id, state);
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.item = state.global.currentEntity;
            return retValue;
        };

        static defaultProps: ISaveReassignmentButton = {
            icon: "icon-cloud-upload",
            text: "",
            color: "white",
            className: "btn btn-default-ek btn-editing  btn-sm yellow-casablanca",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };

        onClick(): void {
            let ml: any = this.props.ml;
            let entidadProsp: any = getData(EK.Store.getState().forms.Reasignacion.form.ProspectosReasignar.value);
            let entidadExp: any = getData(EK.Store.getState().forms.Reasignacion.form.ExpedientesReasignar.value);
            let userPost: any = Forms.getValue("AgenteDestino", config.id);
            let agentOrigin: any = Forms.getValue("AgenteOrigen", config.id);
            
            let stateProspectExpedient: boolean = false;
            let nameAgentOrig: string;
            let nameAgentDest: string;
            if (agentOrigin != undefined && agentOrigin != null && agentOrigin.ID >= 0 && userPost != undefined && userPost != null && userPost.ID >= 0) {
                if (agentOrigin.ID != userPost.ID) {
                    nameAgentOrig = agentOrigin.Nombre + " " + agentOrigin.Apellidos;
                    nameAgentDest = userPost.Nombre + " " + userPost.Apellidos;
                    var x: number = 0;
                    var y: number = 0;
                    entidadProsp.forEach((element, index, item) => {
                        if (element.prospectoSelect) {
                            let parametros: any = global.assign({ IdCliente: element.ID, IdUsuario: userPost.ID, IdAgenteOrigen: nameAgentOrig, IdAgenteDestino: nameAgentDest });
                            global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/SaveReassigmentProspect", { parametros });
                            stateProspectExpedient = true;
                            x = 1;
                            success("El Prospecto Cliente ha sido Reasignado");
                        }

                    });

                    entidadExp.forEach((element, index, item) => {
                        if (element.expedientSelect) {
                            let parametros: any = global.assign({ IdExpediente: element.ID, IdUsuario: userPost.ID, AgenteOrigen: nameAgentOrig, AgenteDestino: nameAgentDest });
                            global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/SaveReassignmentExp", { parametros });
                            stateProspectExpedient = true;
                            y = 1;
                            success("El Expediente ha sido Reasignado");
                        }
                    });
                    
                    if (x != 0 || y != 0) {
                        global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionProspecto", { parametros: null }, scv_Prospectos_Reasignados);
                        global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionExpediente", { parametros: null }, scv_Expedientes_Reasignados);

                    }
                    if (agentOrigin != undefined && agentOrigin != null && agentOrigin.ID >= 0 && (x != 0 || y != 0)) {
                        global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionProspecto", { parametros: null }, scv_Prospectos_Reasignar);
                        global.dispatchAsyncPost("global-page-data", "base/scv/Reasignacion/GetBP/GetReasignacionExpediente", { parametros: null }, scv_Expedientes_Reasignar);
                        Forms.updateFormElement(config.id, "AgenteOrigen", { ID: -1 });
                        Forms.updateFormElement(config.id, "AgenteDestino", { ID: -1 });
                    }
                    if (stateProspectExpedient == false) {
                        warning("Favor de Indicar un Prospecto-Cliente o Expediente por Reasignar", "Reasignación");
                    }
                }
                else {
                    warning("Favor de Indicar Agentes Diferentes","Reasignación");
                }
            }
            else
            {
                warning("Favor de indicar Agente origen y Agente destino","Reasignación");
            }
        }
        shouldComponentUpdate(nextProps: ISaveReassignmentButton, { }): boolean {
            return true;
        }
        render(): JSX.Element {
            let Entidad: any = global.getData(this.props.item);
            let estadoSave: boolean = false;
            let OriginAgent: any = Forms.getValue("AgenteOrigen", config.id);
            let EntidadExpediente: any = getData(EK.Store.getState().global.catalogo$ExpedientesReasignar).length;
            let EntidadProspecto: any = getData(EK.Store.getState().global.catalogo$ProspectosReasignar).length;
            if (OriginAgent != undefined) {
                if (OriginAgent.ID > 0) {
                    estadoSave = true;
                }
            }
            if (estadoSave == true && (EntidadExpediente > 0 || EntidadProspecto >0)) {
                return <Button {...this.props} onClick={this.onClick} />;
            }
            else {
                return null;
            }
        }
    });
};


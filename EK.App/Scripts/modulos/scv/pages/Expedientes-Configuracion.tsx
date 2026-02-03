namespace EK.Modules.SCV.Pages.Expedientes {
    "use strict";
    const EXPEDIENTE_ID: string = "Expediente";
    //const EXPEDIENTE_OWNERS_ID: string = "Owners";
    const EXPEDIENTE_RELACIONADOS_ID: string = "Relacionados";
    const EXPEDIENTE_CONFIGURACIONES_ID: string = "Seguimientos";

    const EXPEDIENTE_SEGUIMIENTOACTIVOFORM: string = "seguimientoActivoForm";
    const EXPEDIENTE_SEGUIMIENTOACTIVO: string = "seguimientoActivo";

    let UBICACIONES = "Ubicaciones";
    let PLANPAGOS = "PlanPagos_Cancelacion";
    let COMISIONES = "Comisiones";

    let CANCELACIONEXPEDIENTE = "CancelacionExpediente";




    const config: page.IPageConfig = global.createPageConfig("expedientes", "scv",
        [EXPEDIENTE_ID, EXPEDIENTE_RELACIONADOS_ID, EXPEDIENTE_CONFIGURACIONES_ID, UBICACIONES, PLANPAGOS]);

    const FASE_ICON: any = {
        "FASE-PROS": "fa fa-user",
        "FASE-VENT": "fa fa-tag",
        "FASE-POST": "fa fa-cog"
    };

    export let Edicion: any = global.connect(class extends page.Base {
        constructor(props: React.Props<any>) {
            super(props);
            this.setEstatusSeguimiento = this.setEstatusSeguimiento.bind(this);
            this.onWillFilter = this.onWillFilter.bind(this);
        }
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        saveForm(props: page.IProps, item: EditForm): any {
            /*Validacion de asignado en fase de prospeccion*/
            let seguimientos: any = Forms.getValue(EXPEDIENTE_CONFIGURACIONES_ID, config.id);
            let validacionAsignadoFase: boolean = false;
            getData(seguimientos).forEach((value: any, index: number) => {

                if (value.Fase.Clave === "FASE-PROS" && value.Esquema != null && value.Posicion != null && value.FechaEstimada != null) {
                    validacionAsignadoFase = true;
                }

            });

            if (validacionAsignadoFase == false) {
                warning("La configuración del esquema de seguimiento es requerido");
                return null;
            }

            /*Validacion de por lo menos 1 duenio del expediente cuando la entidad sea mayor que 1*/
            let currentEntity: any = item;

            //let duenios: any = Forms.getValue(EXPEDIENTE_OWNERS_ID, config.id);
            //let validacionDuenioExp = false;

            //getData(duenios).forEach((value: any, index: number) => {

            //    if (value.Principal == true) {
            //        validacionDuenioExp = true;
            //    }

            //});
            //if (validacionDuenioExp == false && currentEntity.ID)
            //{
            //    warning("Es requerido un Dueño principal");
            //    return null;
            //}


            let model: any = item
                .addID()
                .addClave()
                .addObject("Cliente")
                .addObject("Boleta")
                .addObject("Desarrollo")
                .addObject("Asesor")
                .addObject("TipoComercializacion")
                .addObject(EXPEDIENTE_CONFIGURACIONES_ID)
                .addObject(EXPEDIENTE_RELACIONADOS_ID)
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            if (id > 0) {
                config.dispatchEntityBase({ id: id }, "base/scv/Expedientes/GetBP/GetByIdConfiguration", null, global.HttpMethod.POST);
            };
        };
        onEntityLoaded(props: page.IProps, parameters: any): void {

            let idExpediente: number = global.getData(props.entidad).ID;
            let idCliente: number = global.getData(props.entidad).IdCliente;
            let idDesarrollo: number = global.getData(props.entidad).IdDesarrollo;
            let entidad: any = global.getData(props.entidad);

            if (idExpediente === undefined || idExpediente === -1) {
                //{limpiar informacion del expediente}
                //global.dispatchSuccessful("global-page-data", [], EXPEDIENTE_OWNERS_ID);
                global.dispatchSuccessful("global-page-data", [], EXPEDIENTE_RELACIONADOS_ID);
                props.config.dispatchCatalogoBase("base/scv/Expedientes/GetBP/GetConfiguracionAll/", { idExpediente: -1 }, EXPEDIENTE_CONFIGURACIONES_ID);

                //{consultar cliente y actualizarlo en la pantalla}
                let parametros: any = global.encodeParameters({ id: idCliente });
                global.asyncGet("base/kontrol/ScvClientes/Get/GetByClienteId/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                        Forms.updateFormElement(config.id, "Cliente", data);
                    }
                });

                //{establecer desarrollo parametro desde prospectos clientes}
                if (idDesarrollo > 0) {
                    global.asyncPost("base/scv/desarrollos/id", { id: idDesarrollo }, (status: AsyncActionTypeEnum, data: any) => {
                        if (status === AsyncActionTypeEnum.successful) {
                            Forms.updateFormElement(config.id, "Desarrollo", data);
                        }
                    });
                }
                if (entidad.idBoleta > 0) {
                    props.config.dispatchCatalogoBase("base/scv/boletasProspeccion/GetBP/GetById/", { id: entidad.idBoleta }, "boletaProspeccion");
                }

                //{actualizar estatus de expediente como no asignado}
                Forms.updateFormElement(config.id, "EstatusExpediente", { Clave: "X", Nombre: "SIN ASIGNAR" });
                Forms.updateFormElement(config.id, "Seguimientos");

            }
            else
            {
                props.config.dispatchCatalogoBase("base/scv/Expedientes/GetBP/GetConfiguracionAll/", { idExpediente }, EXPEDIENTE_CONFIGURACIONES_ID);
                //props.config.dispatchCatalogoBase("SCV/Expedientes/Configuracion/Owners/", { idExpediente }, EXPEDIENTE_OWNERS_ID);
                props.config.dispatchCatalogoBase("SCV/Expedientes/Configuracion/Relacionados/", { idExpediente }, EXPEDIENTE_RELACIONADOS_ID);
                if (parameters && parameters.claveProceso) {
                    //Estatus del proceso en curso B iniciado --Mostrar Edicion
                    //Estatus del proceso en curso E completado-- Recargar pagina

                    let procesos: any[] = entidad.Procesos;
                    let estatusProceso: string = "";
                    if (procesos != undefined) {
                        procesos.forEach((value: any, index: number) => {
                            if (value.Proceso.Clave == parameters.claveProceso) {
                                estatusProceso = value.EstatusProceso.Clave;
                            }
                        });

                        if (estatusProceso === "B") {
                            this.props.config.updateForm();
                            this.props.config.setState(global.assign({ viewMode: false }, parameters));
                        }
                    }
                    else {
                        global.go("/scv/expedientes/" + idExpediente);
                    }
                };


            }

            // requireMe()
            //global.dispatchAsyncPost("load::usuario$me", "usuario/me", null);
        };
        onWillFilter(props: any, filters: any): any {
        };
        setEstatusSeguimiento(clave: any): void
        {
            document.getElementById('section_Edit').style.display = 'block';

            /*Actualizar estatus*/
            Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVOFORM, "Estatus", clave);

            this.props.config.updateForm();
            Forms.remove(EXPEDIENTE_SEGUIMIENTOACTIVO);
            this.props.config.setState({ viewMode: false }, EXPEDIENTE_SEGUIMIENTOACTIVO);

            let seguimientoActivo: any = Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id);
            Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVO, "MotivoSuspension", seguimientoActivo.MotivoSuspension);
            Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVO, "MotivoCancelacion", seguimientoActivo.MotivoCancelacion);
            Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVO, "MotivoReanudacion", seguimientoActivo.MotivoReanudacion);
            Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVO, "VigenciaEstatus", seguimientoActivo.VigenciaEstatus);
            Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVO, "Justificacion", seguimientoActivo.Justificacion);
        };
        componentWillUnmount()
        {
            global.dispatchSuccessful("global-page-data", [], EXPEDIENTE_CONFIGURACIONES_ID);
        }
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad)
            let estatusEntidad: string = entidad && entidad.EstatusExpediente ? entidad.EstatusExpediente.Clave : "";
            let allowEdit: boolean = estatusEntidad != "C" ? true : false;
            let estadoEntidad: any = page.canViewEditMode();
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad}
                onWillFilter={this.onWillFilter}
                allowEdit={allowEdit}
                allowNew={false}
                title="Seguimiento del Expediente">

                {(page.canViewEditMode() == true) ?
                    <PageButtons>
                        <ReanudacionExpedienteButton onClick={() => this.setEstatusSeguimiento("A")} />
                        <CancelarExpedienteButton onClick={() => this.setEstatusSeguimiento("C")}/>
                        <SuspensionExpedienteeButton onClick={() => this.setEstatusSeguimiento("S")} />
                    </PageButtons> :
                    null
                }

                <View />
                <Edit />
            </page.Main>
        };
    });

    const BadgePosicionItem: (item: any) => void = (item: any): JSX.Element => {
        let posicionAsignada: boolean = item.Posicion.Usuario.ID ? true : false;
        let usuarioAsignado: any = <span className="badge badge-danger bold btn-editing">POSICION NO ASIGNADA</span>
        if (posicionAsignada) {
            usuarioAsignado = <span className="badge badge-info bold">{item.Posicion.Usuario ? [item.Posicion.Usuario.Nombre, item.Posicion.Usuario.Apellidos].join(" ") : null}</span>;
        }
        return <div>{item.Posicion.Nombre}&nbsp;{usuarioAsignado}</div>
    };

    interface IEditConfiguracion extends page.IProps {
        boleta?: any;
        seguimientos?: any;
        seguimientoActivo?: any;
    };

    //class Edit$ extends page.Base {
    let Edit: any = global.connect(class extends React.Component<IEditConfiguracion, IEditConfiguracion> {
        constructor(props: IEditConfiguracion) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            boleta: state.global.catalogo$boletaProspeccion,
            seguimientos: getData(Forms.getValue(EXPEDIENTE_CONFIGURACIONES_ID, config.id)),
            seguimientoActivo: Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id),
        });
        componentWillReceiveProps(nextProps: IEditConfiguracion, nextState: IEditConfiguracion): any
        {
            if (global.hasChanged(this.props.seguimientos, nextProps.seguimientos)) {
                let seguimientos: any = nextProps.seguimientos;
                if (seguimientos && seguimientos.length > 0)
                {
                    seguimientos.forEach((value: any, index: number) =>
                    {
                        if (value.EstatusSeguimiento.Clave == "A" ||
                            value.EstatusSeguimiento.Clave == "S" ||
                            value.EstatusSeguimiento.Clave == "C")
                        {
                            Forms.updateFormElement(config.id, EXPEDIENTE_SEGUIMIENTOACTIVO, value);
                        }
                    });
                }
            };
            if (global.hasChanged(this.props.boleta, nextProps.boleta)) {
                let boleta: any = getData(nextProps.boleta);
                if (boleta && boleta.ID) {
                    Forms.updateFormElement(config.id, "Boleta", boleta)
                }
            };
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (isSuccessful(nextProps.entidad)) {
                    let tipoComercializacion: any = getData(nextProps.entidad).TipoComercializacion;
                    Forms.updateFormElement(config.id, "TipoComercializacion", tipoComercializacion )
                    
                }
            };
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let idEntidad: any = global.getDataID(this.props.entidad);

            let cliente: any = global.assign({}, entidad.Cliente);
            let puedeEditarDesarrollo: boolean = false;
            let nombre: string = "";
            if (idEntidad <= 0) {
                puedeEditarDesarrollo = true;
            }
            else {
                if (entidad) {
                    let procesosOK: boolean = true;
                    let ubicacionesOK: boolean = true;
                    // procesos                    
                    let procesos: any[] = entidad.Procesos;
                    if (procesos && procesos.length > 0) {
                        for (var i = 0; i < procesos.length; i++) {
                            if (procesos[i].Proceso.Clave === "PROC-CIERRE-VENTA" && procesos[i].EstatusProceso.Clave === "E") {
                                procesosOK = false;
                                //
                                break;
                            }
                        }
                    };
                    // ubicaciones
                    let cotizaciones: any[] = entidad.Cotizaciones;
                    if (cotizaciones && cotizaciones.length > 0) {
                        for (var i = 0; i < cotizaciones.length; i++) {
                            if (cotizaciones[i].Ubicaciones && cotizaciones[i].Ubicaciones.length > 0) {
                                ubicacionesOK = false;
                                //
                                break;
                            }
                        }
                    };
                    //
                    puedeEditarDesarrollo = procesosOK && ubicacionesOK;
                };
            };

            if (global.isSuccessful(this.props.entidad)) {
                nombre = '(' + cliente.Clave + ') ' + cliente.Nombre + ' ' + cliente.ApellidoPaterno + ' ' + cliente.ApellidoMaterno;
            };

            let seguimientoActivo = this.props.seguimientoActivo;
            let estatusseguimientoActivo = seguimientoActivo && seguimientoActivo.EstatusSeguimiento ? seguimientoActivo.EstatusSeguimiento.Clave : "";
            //form-group has-success
            //form-group has-error
            //idForm={config.id} 
            const listHeaderOwners: JSX.Element =
                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
                    <Row>
                        <Column size={[11, 11, 11, 11]} className="list-default-header">{"Posición"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </Column>

            const listHeaderColaboradores: JSX.Element =
                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
                    <Row>
                        <Column size={[11, 11, 11, 11]} className="list-default-header">{"Posición"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </Column>

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={EXPEDIENTE_ID}
                            icon="fa fa-folder-open"
                            collapsed={false}
                            level="main"
                            hideCollapseButton={true}>
                            <Alerta />

                            <Row>
                                <label.Label id="ID" size={[2, 2, 2, 2]} />
                                <label.Cliente id="Cliente" size={[8, 8, 8, 8]} />
                                <label.Entidad id="EstatusExpediente" size={[2, 2, 2, 2]} />
                                {(puedeEditarDesarrollo === true && (estatusseguimientoActivo == "A" || idEntidad < 1)) ?
                                    <div>
                                        <ddl.DesarrollosDDL id="Desarrollo" addNewItem={"SO"} size={[12, 3, 3, 3]} validations={[validations.required()]}/>
                                        <TipoComercializacion id="TipoComercializacion"  cargarDatos={false} addNewItem={"SO"} size={[12, 4, 4, 4]} validations={[validations.required()]} />
                                    </div>
                                    :
                                    <div>
                                        <label.Entidad id="Desarrollo" size={[12, 3, 3, 3]} />
                                        <label.Entidad id="TipoComercializacion" size={[12, 4, 4, 4]} />
                                    </div>
                                }
                                <ASESORESCLIENTEDDL id="Asesor" size={[12, 12, 5, 5]} addNewItem={"SO"} validations={[validations.required()]} />
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <page.SectionList
                                    id={EXPEDIENTE_RELACIONADOS_ID}
                                    parent={config.id}
                                    icon="glyphicon glyphicon-th"
                                    level={1}
                                    listHeader={listHeaderColaboradores}
                                    items={createSuccessfulStoreObject([])}
                                    readonly={false}
                                    addRemoveButton={false}
                                    size={[12, 12, 6, 6]}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addObject("Posicion")
                                            .addVersion()
                                            .toObject();
                                    }}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[11, 11, 11, 11]} className="listItem-default-header">{BadgePosicionItem(item)}</Column>

                                            {(estatusseguimientoActivo == "A" || idEntidad < 1) ?
                                                <buttons.PopOver idParent={config.id} idForm={EXPEDIENTE_RELACIONADOS_ID} info={item}
                                                    extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} /> : null
                                            }

                                        </Row>
                                    }}>
                                    <Row>
                                        <ddl.EKPosicionesDDL size={[12, 12, 12, 12]} idFormSection={EXPEDIENTE_RELACIONADOS_ID} validations={[validations.required()]} />
                                    </Row>
                                </page.SectionList>
                            </Row>
                            <Row>
                                <AccionesExpediente/>
                            </Row>
                            <Row>
                                <ConfiguracionesList />
                            </Row>

                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>
        }
    });
    // const Edit: any = ReactRedux.connect(Edit$.props, null)(Edit$);

    class View$ extends page.Base {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let cliente: any = global.assign({}, entidad.Cliente);
            let nombre: string = "";
            if (global.isSuccessful(this.props.entidad)) {
                nombre = '(' + cliente.Clave + ') ' + cliente.Nombre + ' ' + cliente.ApellidoPaterno + ' ' + cliente.ApellidoMaterno;
            };
            const listHeaderOwners: JSX.Element =
                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
                    <Row>
                        <Column size={[12, 12, 12, 12]} className="list-default-header">{"Posición"}</Column>
                    </Row>
                </Column>

            const listHeaderColaboradores: JSX.Element =
                <Column size={[12, 12, 12, 12]} key="listHeaderKey">
                    <Row>
                        <Column size={[12, 12, 12, 12]} className="list-default-header">{"Posición"}</Column>
                    </Row>
                </Column>

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={EXPEDIENTE_ID}
                            level="main"
                            icon="fa fa-folder-open" collapsed={false} hideCollapseButton={true}>
                            <Alerta />

                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                    <label.Link id="ID" link={"#/scv/expedientes/:id"} size={[12, 2, 2, 2]} formatValue={(e: any) => { return { ID: e, Clave: e, Nombre: "" }; }} />
                                    <label.Link id="Cliente" size={[8, 8, 8, 8]} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} />
                                    <label.BadgeCGV id="EstatusExpediente" size={[12, 2, 2, 2]} formatValue={(e: any) => { return e ? e.Nombre : ""; }} />
                                </Column>

                                <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                    <label.Link id="Desarrollo" link={"#/scv/desarrollos/:id"} size={[12, 3, 3, 3]} />
                                    <label.Entidad id="TipoComercializacion" size={[12, 4, 4, 4]} />
                                    <label.PosicionUsuario id="Asesor" size={[12, 5, 5, 5]} />

                                </Column>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <page.SectionList
                                    id={EXPEDIENTE_RELACIONADOS_ID}
                                    parent={config.id}
                                    icon="glyphicon glyphicon-th"
                                    level={1}
                                    listHeader={listHeaderColaboradores}
                                    readonly={false}
                                    addRemoveButton={false}
                                    size={[12, 12, 6, 6]}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">{BadgePosicionItem(item)}</Column>
                                        </Row>
                                    }}>
                                </page.SectionList>
                            </Row>
                            <Row>
                                <ConfiguracionesList />
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>
        }
    };
    const View: any = ReactRedux.connect(View$.props, null)(View$);

    interface IConfiguracionProps extends page.IProps {
        items?: global.DataElement;
        usuario?: global.DataElement;
        item?: any;
        idForm?: string;
        idFormChild?: string;
        editMode?: boolean;
        viewMode?: boolean;
    };

    interface IConfiguracionListProps extends page.IProps {
        entidad?: global.DataElement;
        configuracion?: global.DataElement;
        state?: global.DataElement;
        idForm?: string;
        idFormChild?: string;
        item?: any;
        usuario?: any;
    };

    const ConfiguracionesList: any = global.connect(class extends React.Component<IConfiguracionListProps, {}>{
        constructor(props: IConfiguracionProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            configuracion: state.global["catalogo$" + EXPEDIENTE_CONFIGURACIONES_ID],
            item: Forms.getValue("Fase", EXPEDIENTE_CONFIGURACIONES_ID),
            state: state.global.currentEntityState,
            usuario: state.global.app
        });
        componentWillReceiveProps(nextProps: IConfiguracionListProps, nextState: IConfiguracionListProps): any {
            if (global.hasChanged(this.props.configuracion, nextProps.configuracion)) {
                if (global.isSuccessful(nextProps.configuracion)) {
                    let c: any[] = global.getData(nextProps.configuracion);
                    let s: any = global.getData(nextProps.state);
                    //let idCliente: number = global.getData(this.props.entidad).IdCliente;
                    //if (idCliente > 0) {
                    //    let u: any = global.getData(EK.Store.getState().global.Cliente_Expediente_Seleccionado);
                    //    //Actualizar Valores Posicion
                    //    Forms.updateFormElement(EXPEDIENTE_CONFIGURACIONES_ID, "Posicion", { ID: u.Posiciones.ID, Clave: u.Posiciones.Clave, Nombre: u.Posiciones.Nombre, IdUsuario: u.Titular.ID, Usuario: { ID: u.Titular.ID, Nombre: u.Titular.Nombre } });
                        
                    //}
                    if (c && c.length) {
                        for (var i = 0; i < c.length; i++) {
                            if (c[i].Fase && c[i].Fase.Proceso && c[i].Fase.Proceso.Clave === s.claveProceso)
                            {
                                /*Remover formulario*/
                                Forms.remove(EXPEDIENTE_CONFIGURACIONES_ID);

                                let item: any = global.assign(c[i]);

                                let element: any = { ID: item.ID, Fase: item.Fase }

                                if (item.FechaEstimada != null) {
                                    element.FechaEstimada = item.FechaEstimada;
                                }

                                if (item.Esquema != null) {
                                    element.Esquema = item.Esquema;
                                }

                                Forms.updateFormElements(EXPEDIENTE_CONFIGURACIONES_ID, element);

                                config.setState({ viewMode: false }, EXPEDIENTE_CONFIGURACIONES_ID);

                                if (c[i].Posicion === null) {
                                    let usuario: any = getData(this.props.usuario).Me;
                                   // Forms.updateFormElement(EXPEDIENTE_CONFIGURACIONES_ID, "Posicion", { ID: usuario.PosicionID, Clave: usuario.PosicionClave, Nombre: usuario.Posicion, IdUsuario: usuario.ID, Usuario: { ID: usuario.ID, Nombre: usuario.Nombre } });
                                }
                                break;
                            };


                        };
                    };
                };
            };
        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);
            let idEntidad: any = entidad.ID ? entidad.ID : -1;
            let fase: any = Forms.getValue("Fase", EXPEDIENTE_CONFIGURACIONES_ID);
            let faseClave = fase ? fase.Clave : "";
            let modoVista: boolean = getData(this.props.state).viewMode;
            let claveProceso: any = global.getData(this.props.state).claveProceso;


            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) =>
                {
                   // let usuario: any = getData(this.props.usuario).Me;

                   // let posicion: any = { ID: usuario.PosicionID, Clave: usuario.PosicionClave, Nombre: usuario.Posicion, IdUsuario: usuario.ID, Usuario: { ID: usuario.ID, Nombre: usuario.Nombre } };

                    //item.Posicion = {posicion};
                    Forms.remove(id);


                    //let element: any = { ID: item.ID, Posicion: posicion, Fase: item.Fase }
                    let element: any = { ID: item.ID, Fase: item.Fase }

                    if (item.FechaEstimada != null)
                    {
                        element.FechaEstimada = item.FechaEstimada;
                    }

                    if (item.Esquema != null) {
                        element.Esquema = item.Esquema;
                    }

                    Forms.updateFormElements(id, element);
                    config.setState({ viewMode: false }, id);
                }
            };

            return <page.SectionList
                id={EXPEDIENTE_CONFIGURACIONES_ID}
                parent={config.id}
                title="Esquemas de Seguimiento - Fases del Expediente"
                icon="fas fa-project-diagram"
                level={1}
                hideNewButton={true}
                listHeader={<Column size={[12, 12, 12, 12]} key="listHeaderKey" style={{ padding: "0px" }}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fase"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Esquema"}</Column>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Agente"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Finaliza"}</Column>
                    </Row>
                </Column>}
                readonly={false}
                size={[12, 12, 12, 12]}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addObject("Fase")
                        .addObject("Esquema")
                        .addObject("Posicion")
                        .addDateObject("FechaEstimada")
                        .addEstatus()
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    let fase: any = item.Fase ? item.Fase : {};
                    let esquema: any = item.Esquema ? item.Esquema : {};
                    let posicion: any = item.Posicion ? item.Posicion : {};
                    let usuario: any = posicion.Usuario ? posicion.Usuario : {};
                    let fecha: string = global.formatUserDate(item.FechaEstimada);
                    let proceso: string = fase.Proceso ? fase.Proceso.Clave : "";
                    //
                    let linkURL: string = "javascript:;";
                    let linkObj: any = null;
                    //
                    if (usuario.ID > 0) {
                        linkURL = "#/kontrol/usuarios/:id";
                        linkObj = {
                            ID: usuario.ID,
                            Clave: usuario.Nombre,
                            Nombre: posicion.Nombre
                        };
                    }
                    else {
                        linkURL = "javascript:;";
                        if (posicion.ID > 0) {
                            linkObj = {
                                ID: 0,
                                Clave: "-",
                                Nombre: posicion.Nombre
                            }
                        };
                    };
                    //
                    return <Row>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                            <span>{fase.Nombre}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                            <span>{esquema.Nombre}</span>
                        </Column>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-header">
                            <div>
                                <label.LinkList value={usuario} link={linkURL}
                                    formatValue={(e: any) => {
                                        return linkObj;
                                    }} />
                            </div>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                            <span>{fecha}</span>
                        </Column>

                        {((modoVista == false) &&
                            ((idEntidad === -1 && fase.Clave === "FASE-PROS") || (idEntidad > 1 && proceso === claveProceso))) ?
                            <buttons.PopOver size={[1, 1, 1, 1]} idParent={config.id} idForm={EXPEDIENTE_CONFIGURACIONES_ID} info={item} extraData={[edit]} />
                            : null
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.SCVEsquemasConfiguracion id="Esquema" idFormSection={EXPEDIENTE_CONFIGURACIONES_ID} faseClave={faseClave} size={[12, 4, 4, 4]} validations={[validations.required()]} addNewItem={"SO"} />
                    <IntegrantesGrupoDDL id="Posicion" idFormSection={EXPEDIENTE_CONFIGURACIONES_ID} label="Responsable" size={[12, 5, 5, 5]} validations={[validations.required()]} addNewItem={"SO"} />
                    <input.Date id="FechaEstimada" idFormSection={EXPEDIENTE_CONFIGURACIONES_ID} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                </Row>
            </page.SectionList>;
        };
    });



    /*Cancelación y reanudación del expediente*/

    export interface IAccionesExpediente extends EK.UX.Buttons.IButtonProps
    {
        seguimiento?: any;
    }


    let SuspensionExpedienteeButton: any = global.connect(class extends React.Component<IAccionesExpediente, {}> {
        constructor(props: IAccionesExpediente) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            seguimiento: Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id)
        });
        static defaultProps: IAccionesExpediente = {
            icon: "glyphicon glyphicon-pause",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
        render(): JSX.Element {
            let entidad: any = this.props.seguimiento;
            let estatusSeguimiento: any = entidad && entidad.ID > 0 ? entidad.EstatusSeguimiento.Clave : "";
            if (estatusSeguimiento == "A")
            {
                let className: string;
                if (this.props.iconOnly === true) {
                    className = "btn-ico-ek";
                }
                else {
                    className = "btn btn-default-ek";
                }

                return <Button {...this.props} onClick={this.onClick} className={className} />;
            }
            return null;
        }
    });


    let CancelarExpedienteButton: any = global.connect(class extends React.Component<IAccionesExpediente, {}> {
        constructor(props: IAccionesExpediente) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            seguimiento: Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id)
        });
        static defaultProps: IAccionesExpediente = {
            icon: "glyphicon glyphicon-stop",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
        render(): JSX.Element {
            let entidad: any = this.props.seguimiento;
            let estatusSeguimiento: any = entidad && entidad.ID > 0 ? entidad.EstatusSeguimiento.Clave : "";
            if (estatusSeguimiento == "A" || estatusSeguimiento == "S")
            {
                let className: string;
                if (this.props.iconOnly === true) {
                    className = "btn-ico-ek";
                }
                else {
                    className = "btn btn-default-ek";
                }

                return <Button {...this.props} onClick={this.onClick} className={className} />;
            }
            return null;


        };
    });

    /* Button Continuar */
    let ReanudacionExpedienteButton: any = global.connect(class extends React.Component<IAccionesExpediente, {}> {
        constructor(props: IAccionesExpediente) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            seguimiento: Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id)
        });
        static defaultProps: IAccionesExpediente = {
            icon: "glyphicon glyphicon-play",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
        render(): JSX.Element {
            let entidad: any = this.props.seguimiento;
            let estatusSeguimiento: any = entidad && entidad.ID > 0 ? entidad.EstatusSeguimiento.Clave : "";
            /*S es Suspendido, sie sta suspendido s epuede reanudar*/
            if (estatusSeguimiento == "S") {
                let className: string;
                if (this.props.iconOnly === true) {
                    className = "btn-ico-ek";
                }
                else {
                    className = "btn btn-default-ek";
                }

                return <Button {...this.props} onClick={this.onClick} className={className} />;
            }

            return null;

        };
    });



    interface IAccionExpediente extends React.Props<any> {
        item: any;
        suspension: any;
    }

    interface IAccionExpe extends page.IProps {
        estatusAccion: any;
    }

    export let AccionesExpediente: any = global.connect(class extends React.Component<IAccionExpe, IAccionExpe> {
        constructor(props: IAccionExpe) {
            super(props);
            this.onSave = this.onSave.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.estatusAccion = Forms.getValue("Estatus", EXPEDIENTE_SEGUIMIENTOACTIVOFORM);
            return retValue;
        };

        shouldComponentUpdate(nextProps: IAccionExpe, nextState: IAccionExpe): boolean {
            return hasChanged(this.props.estatusAccion, nextProps.estatusAccion)
        };
        componentDidMount()
        {
            document.getElementById('section_Edit').style.display = 'none';
        }
        onSave(): void {

            let seguimientoActivo: any = Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id);

            let estatusSeguimiento: any = Forms.getValue("Estatus", EXPEDIENTE_SEGUIMIENTOACTIVOFORM);


            if (estatusSeguimiento === "C")
            {
                let item: any = Forms.getForm(config.id);
                let itemCancelacion: any = Forms.getForm(CANCELACIONEXPEDIENTE);


                let model: any = itemCancelacion
                    .addNumberConst("ID", item.ID)
                    .addObject("MotivoCancelacion")
                    .addDate("FechaCancelacion")
                    .addString("ObservacionesCancelacion")
                    .toObject();

                dispatchAsyncPut("global-current-entity", "base/scv/expedientes/Get/SaveCancelacion", model);
                this.props.config.setState({ viewMode: true }, EXPEDIENTE_SEGUIMIENTOACTIVO);

            }
            else
            {
                let item: any = Forms.getForm(EXPEDIENTE_SEGUIMIENTOACTIVO);

                let model: any = item
                    .addNumberConst("ID", seguimientoActivo.ID)
                    .addObject("MotivoSuspension")
                    .addObject("MotivoCancelacion")
                    .addObject("MotivoReanudacion")
                    .addDate("VigenciaEstatus")
                    .addString("Justificacion")
                    .toObject();

                dispatchAsyncPut("global-page-data", "SCV/Seguimientos/SaveSuspension/" + estatusSeguimiento, model, EXPEDIENTE_SEGUIMIENTOACTIVOFORM);

                this.props.config.dispatchCatalogoBase("base/scv/Expedientes/GetBP/GetConfiguracionAll/", { idExpediente: seguimientoActivo.IdExpediente }, EXPEDIENTE_CONFIGURACIONES_ID);
                this.props.config.setState({ viewMode: true }, EXPEDIENTE_SEGUIMIENTOACTIVO);

                Forms.updateFormElement(EXPEDIENTE_SEGUIMIENTOACTIVOFORM, "Estatus", "");
                document.getElementById('section_Edit').style.display = 'none';
            }


        };
        render(): JSX.Element {
            let estatusSeguimiento: any = Forms.getValue("Estatus", EXPEDIENTE_SEGUIMIENTOACTIVOFORM);

            let fnValidate = function (v: any, values?: any): boolean {
                if (v) {
                    let date: Date = new Date(v);
                    date.setHours(0, 0, 0, 0);

                    let today: Date = new Date();
                    today.setHours(0, 0, 0, 0);

                    return date >= today;
                }
                return true;
            }

            let titulo: string = "Motivos";
            let icono: string = "fas fa-braille";

            if (estatusSeguimiento === "A")
            {
                titulo = "Motivo Reanudación";
                icono = "glyphicon glyphicon-play";
            }
            else if (estatusSeguimiento === "S")
            {
                titulo = "Motivo Suspención";
                icono = "glyphicon glyphicon-pause";
            }
            else if (estatusSeguimiento === "C")
            {
                titulo = "Motivo Cancelación";
                icono = "glyphicon glyphicon-stop";
            }


            let entidad: any = getData(this.props.entidad);
            let estatusEntidad: string = entidad && entidad.EstatusExpediente ? entidad.EstatusExpediente.Clave : "";
            return <div id={"section_Edit"}><page.SectionList
                onSave={estatusEntidad == "PA" ? null : this.onSave}
                id={EXPEDIENTE_SEGUIMIENTOACTIVO}
                icon={icono}
                title={titulo}
                parent={config.id}
                style={{ paddingTop: 20 }}
                level={1}
                size={[12, 12, 12, 12]}
                hideNewButton={true}
                listMode="literal"
                collapse={true}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                </div>}
                readonly={false}>
                <Row>
                    <Column size={[12, 12, 12, 12]} >

                        {Forms.getValue("Estatus", EXPEDIENTE_SEGUIMIENTOACTIVOFORM)=="S" ?
                            <div>
                                <ddl.MotivosSuspencionDDL id={"MotivoSuspension"} idFormSection={EXPEDIENTE_SEGUIMIENTOACTIVO} size={[12, 12, 8, 8]} validations={[validations.required()]} />

                                <DatePicker
                                    id={"VigenciaEstatus"}
                                    idFormSection={EXPEDIENTE_SEGUIMIENTOACTIVO}
                                    label={"Vigencia Estatus"}
                                    size={[12, 12, 4, 4]}
                                    required={true}
                                    validations={[validations.custom("Fecha", "Mensaje de error", [], fnValidate)]}
                                    helpLabel={"Vigencia Estatus"}
                                    maxLength={8} />

                                <input.Text
                                    id={"Justificacion"}
                                    idFormSection={EXPEDIENTE_SEGUIMIENTOACTIVO}
                                    label={"Justificación"}
                                    size={[12, 12, 12, 12]}
                                    required={true}
                                    helpLabel={"Justificación"}
                                    maxLength={255} />

                            </div> : null
                        }

                        {Forms.getValue("Estatus", EXPEDIENTE_SEGUIMIENTOACTIVOFORM) == "C" ?
                            <CancelacionExpediente/>
                            :
                            null
                        }

                        {Forms.getValue("Estatus", EXPEDIENTE_SEGUIMIENTOACTIVOFORM) == "A" ?
                            <div>
                                <ddl.MotivosReanudacionDDL id={"MotivoReanudacion"} idFormSection={EXPEDIENTE_SEGUIMIENTOACTIVO} size={[12, 12, 12, 12]} validations={[validations.required()]} />
                            </div> : null
                        }

                    </Column>
                </Row>
            </page.SectionList></div>
        };
    })

    interface IAlerta extends page.IProps {
        seguimientoEnCurso: any;
    }

    export let Alerta: any = global.connect(class extends React.Component<IAlerta, IAlerta> {
        constructor(props: IAlerta) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.seguimientoEnCurso= Forms.getValue(EXPEDIENTE_SEGUIMIENTOACTIVO, config.id)
            return retValue;
        };
        render(): any {
            let idEntidad: number = getDataID(this.props.entidad);
            let entidad: any = getData(this.props.entidad)
            let estatusEntidad: string = entidad && entidad.EstatusExpediente ? entidad.EstatusExpediente.Clave : "";

            let seguimientoActivo: any = this.props.seguimientoEnCurso;
            let estatusSeguimiento: string = seguimientoActivo && seguimientoActivo ? seguimientoActivo.EstatusSeguimiento.Clave : "";
            let mensaje: string = "";
            let colorFondo: string = "";
            let borde: string = "";

            if (estatusEntidad == "C") {
                borde = "solid 2px #d43f3a";
                colorFondo = "#d9534f";
                mensaje = "Expediente Cancelado por " + entidad.MotivoCancelacion.Nombre + " en " + label.formatDate(entidad.Modificado);
            }
            else if (estatusEntidad == "PA") {
                colorFondo = "#f0ad4e";
                borde = "solid 2px #eea236";
                mensaje = "Cancelación de expediente por Autorizar";
            }
            else if (estatusSeguimiento == "S")
            {
                colorFondo = "#f0ad4e";
                borde = "solid 2px #eea236";
                mensaje = "Expediente Suspendido " + seguimientoActivo.MotivoSuspension.Nombre + " en " + label.formatDate(seguimientoActivo.Modificado) +
                    " con vigencia al " + label.formatDate(seguimientoActivo.VigenciaEstatus);
            }


            if (mensaje == "" || idEntidad<0) {
                return null;
            }
            return <Row className={"ek-sombra"}
                style={{
                    border: borde,
                    backgroundColor: colorFondo,
                    margin:"0px 5px 5px 5px"
                }}>
                <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                        <i className={"fa fa-info-circle"} style={{ marginRight: "5px", fontSize:"18px" }}></i>
                        {mensaje}
                    </span>
                </Column>
            </Row>
        };
    });

    interface IMotivosCancelacion extends IDropDrownListProps {
        entidad?: any;
    }
    let MotivosCancelacionDDL: any = global.connect(class extends React.Component<IMotivosCancelacion, {}> {
        static props: any = (state: any) => ({
            items: state.global.MotivosCancelacionDe,
            entidad:state.global.currentEntity
        });
        static defaultProps: IMotivosCancelacion = {
            id: "MotivoCancelacion",
            items: createDefaultStoreObject([]),
            label: "Motivo Cancelacion",
            helpLabel: "Seleccione un Motivo de Cancelación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        cargarElementos(idDesarrollo: number): void {
            let url: string = "";

            if (idDesarrollo > 0) {
                dispatchAsync("load::MotivosCancelacionDe", "base/scv/desarrollos/Get/GetMotivosCancelacionList/" + global.encodeParameters({ IdDesarrollo: idDesarrollo }));
            }
            else {
                global.dispatchSuccessful("load::MotivosCancelacionDe", []);
            };
        }
        componentDidMount(): void {

            if (isSuccessful(this.props.entidad))
            {
                let entidad: any = getData(this.props.entidad);
                this.cargarElementos(entidad.IdDesarrollo);

            }
        };
        componentWillReceiveProps(nextProps: IMotivosCancelacion, nextState: IMotivosCancelacion): any
        {

            if (global.hasChanged(this.props.entidad, nextProps.entidad))
            {
                if (isSuccessful(nextProps.entidad))
                {
                    let entidad: any = getData(nextProps.entidad);
                    this.cargarElementos(entidad.IdDesarrollo);
                }
            };

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}  />;
        }
    });

    export let CancelacionExpediente: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentDidMount(): void
        {
            Forms.updateFormElement(CANCELACIONEXPEDIENTE, "MotivoCancelacion", { ID: -1, Clave: "Seleccione una opción" });
            Forms.updateFormElement(CANCELACIONEXPEDIENTE, "FechaCancelacion", undefined);
            Forms.updateFormElement(CANCELACIONEXPEDIENTE, "ObservacionesCancelacion", null);

        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);
            let motivoCancelacion: any = entidad && entidad.MotivoCancelacion && entidad.MotivoCancelacion.ID>0? entidad.MotivoCancelacion.Nombre  : null;
            let fechaCancelacion: any = entidad && entidad.FechaCancelacion ? entidad.FechaCancelacion : null;
            let observacionesCancelacion: any = entidad && entidad.ObservacionesCancelacion ? entidad.ObservacionesCancelacion : null;

            return <div>


                {motivoCancelacion != null ?
                    <label.Label value={motivoCancelacion} id={"MotivoCancelacion"} size={[12, 8, 8, 8]} />
                    :
                    <MotivosCancelacionDDL  addNewItem="SO" id={"MotivoCancelacion"} size={[12, 8, 8, 8]} validations={[validations.required()]} idFormSection={CANCELACIONEXPEDIENTE} />
                }
                {fechaCancelacion != null ?
                    <label.Fecha id={"FechaCancelacion"} value={fechaCancelacion}  size={[12, 4, 4, 4]}/>
                    :
                    <input.Date id={"FechaCancelacion"} type="date" size={[12, 4, 4, 4]} validations={[validations.required()]} idFormSection={CANCELACIONEXPEDIENTE} />

                }
                {observacionesCancelacion != null ?
                    <label.Label value={observacionesCancelacion} id={"ObservacionesCancelacion"} size={[12, 12, 12, 12]} idFormSection={CANCELACIONEXPEDIENTE} />
                    :
                    <input.Text  id={"ObservacionesCancelacion"} size={[12, 12, 12, 12]} idFormSection={CANCELACIONEXPEDIENTE} />
                }



                <Column size={[12, 12, 12, 12]} style={{ marginTop: "2%" }}>
                    <Ubicaciones />
                    <PlanPagos />
                    <Comisiones/>
                </Column>

            </div>
        };
    })


    let Ubicaciones: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        cargarElementos(idExpediente: number): void {

            if (idExpediente > 0) {
                let parametros: any = global.encodeParameters({ idExpediente });
                global.dispatchAsync("global-page-data", "base/kontrol/ventas/Get/ObtenerUbicaciones/" + parametros, UBICACIONES);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], UBICACIONES);
            };
        }
        componentDidMount() {
            if (isSuccessful(this.props.entidad)) {
                let entidad: any = getData(this.props.entidad);
                this.cargarElementos(entidad.ID);
            }
        }
        componentWillReceiveProps(nextProps: page.IProps, nextState: page.IProps): any {

            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (isSuccessful(nextProps.entidad)) {
                    let entidad: any = getData(nextProps.entidad);
                    this.cargarElementos(entidad.ID);
                }
            };

        };
        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {

            return <page.SectionList
                id={UBICACIONES}
                title={"Ubicaciones"}
                parent={config.id}
                level={1}
                icon="fa fa-table"
                hideNewButton={true}
                listHeader={<Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header hidden-xs hidden-sm">{"Tipo Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Precio Venta"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>}
                aggregate={(item: any, values: any) => {
                    if (!values.ImporteMoneda) values.ImporteMoneda = 0;
                    values.ImporteMoneda += item.ImporteMoneda ? item.ImporteMoneda : 0;
                    return values;
                }}
                listFooter={(values: any) => {
                    return <div>
                        <Row>
                            <Column size={[9, 8, 8, 8]}>{""}</Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="listItem-right-header">
                                <span className="badge badge-info list-footer-badge">
                                    {global.formatMoney(values.ImporteMoneda, values.Moneda)}
                                </span>
                            </Column>
                        </Row>
                    </div>;
                }}
                size={[12, 12, 12, 12]}
                formatter={(index: number, item: any) => {
                    let ubicacion: any = item.Ubicacion;

                    let caracteristicas: DataElement = global.createSuccessfulStoreObject(item.Caracteristicas).getActiveItems();
                    let length: number = global.getData(caracteristicas, []).length;
                    let precioVenta: any = item.PrecioVenta ? item.PrecioVenta.Clave : "O";
                    let style: React.CSSProperties = {};
                    style.backgroundColor = "";
                    let styleO: React.CSSProperties = {};
                    style.backgroundColor = "";
                    let classNameD: string = "";
                    let className: string = "";
                    let classNameO: string = "";
                    if (precioVenta == "O") {
                        styleO.backgroundColor = "#36d35f"
                        classNameO = "badge badge-info";
                    } else {
                        style.backgroundColor = "#36d35f"
                        className = "badge badge-info";
                    }
                    if (item.Diferencia < 0) {
                        classNameD = "badge badge-danger";
                    }
                    return <Row id={"row_ubicacion_" + item.Ubicacion.Clave} className="panel-collapsed" >

                        <Column size={[12, 3, 3, 3]} className="listItem-center-header">
                            <span className="badge badge-success" style={{ top: 0, left: -12, marginRight:1 }}>{length}</span>
                            <span className="bold">{item.Ubicacion.Clave}</span>
                        </Column>

                        <Column size={[2, 2, 2, 2]}>
                            <span className="badge badge-info">{item.Ubicacion.Nombre}</span>
                        </Column>

                        <Column size={[2, 2, 2, 2]} className="listItem-default-header hidden-xs hidden-sm">
                            <span>{item.Ubicacion.TipoUbicacion.Nombre}</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-header">
                            <span>{item.Ubicacion.Prototipo.Nombre}</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]} >
                            <span className="badge badge-info" style={{ backgroundColor: "#36d35f" }}>{precioVenta}</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                            {global.formatMoney(item.ImporteMoneda, item.Moneda)}
                        </Column>
                    </Row>
                }}>
                <Row>
                </Row>
            </page.SectionList>
        }
    });

    interface IPlanPagos extends page.IProps {
        tipoEntidad?: any;
    }

    export let PlanPagos: any = global.connect(class extends React.Component<IPlanPagos, IPlanPagos> {
        constructor(props: IPlanPagos) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        cargarElementos(idExpediente: number): void {

            let cargar: boolean = true;


            if (this.props.tipoEntidad == "VENTA" && isSuccessful(this.props.entidad)) {
                let entidad: any = getData(this.props.entidad);
                let estatusExpediente: string = entidad.Expediente.EstatusExpediente.Clave;

                if (estatusExpediente == "PA" || estatusExpediente == "C") {
                    cargar = true;
                }
                else {
                    cargar = false;
                }
            }

            if (idExpediente > 0 && cargar == true) {
                let parametros: any = global.encodeParameters({ idExpediente });
                global.dispatchAsync("global-page-data", "base/SCV/expedientes/Get/GetConceptosPago/" + parametros, PLANPAGOS);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], PLANPAGOS);
            };
        }
        componentDidMount() {
            if (isSuccessful(this.props.entidad)) {
                let id: number = getDataID(this.props.entidad);
                let tipoEntidad: any = this.props.tipoEntidad;
                if (tipoEntidad == "VENTA") {
                    let entidad: any = getData(this.props.entidad);
                    id = entidad.Expediente.ID;
                }

                this.cargarElementos(id);
            }
        }
        componentWillReceiveProps(nextProps: IPlanPagos, nextState: IPlanPagos): any {

            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {

                if (isSuccessful(nextProps.entidad)) {
                    let id: number = getDataID(nextProps.entidad);
                    let tipoEntidad: any = this.props.tipoEntidad;
                    if (tipoEntidad == "VENTA")
                    {
                        let entidad: any = getData(nextProps.entidad);
                        id = entidad.Expediente.ID;
                    }

                    this.cargarElementos(id);
                }
            };

        };
        render(): JSX.Element {
            let result: boolean = true;

            if (this.props.tipoEntidad == "VENTA" && isSuccessful(this.props.entidad))
            {
                let entidad: any = getData(this.props.entidad);
                let estatusExpediente: string = entidad.Expediente.EstatusExpediente.Clave;

                if (estatusExpediente == "PA" || estatusExpediente == "C") {
                    result = true;
                }
                else
                {
                    result = false;
                }
            }
            if (result == false)
            {
                return null;
            }
            return <page.SectionList
                id={PLANPAGOS}
                title={"Plan de Pagos"}
                icon="fa fa-table"
                parent={config.id}
                style={{ paddingTop: 20 }}
                level={1}
                hideNewButton={true}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Concepto"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Importe"}</Column>

                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Pagado"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Saldo"}</Column>

                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"% Reembolsable"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Reembolso"}</Column>
                    </Row>
                </div>}
                readonly={false}
                formatter={(index: number, item: any) => {

                    let colorPagado: string = item.Pagado > 0 ? "#5cb85c" : item.Pagado == 0 ? "black" : "#c9302c";

                    let colorImporteMoneda: string = item.ImporteMoneda > 0 ? "#5cb85c" : item.ImporteMoneda == 0 ? "black" : "#c9302c";
                    let colorSaldo: string = item.Saldo > 0 ? "#5cb85c" : item.Saldo == 0 ? "black" : "#c9302c";

                    let colorImporteReembolsable: string = item.ImporteReembolsable > 0 ? "#5cb85c" : item.ImporteReembolsable == 0 ? "black" : "#c9302c";



                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                    {item.Nombre}
                                </Column>

                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ color: colorImporteMoneda, textAlign: "right" }}>
                                    {label.formatMoneyPersonalized(item.ImporteMoneda, item.Moneda)}
                                </Column>
                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ color: colorPagado, textAlign: "right" }}>
                                    {label.formatMoneyPersonalized(item.Pagado, item.Moneda)}
                                </Column>
                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ color: colorSaldo, textAlign: "right" }}>
                                    {label.formatMoneyPersonalized(item.Saldo, item.Moneda)}
                                </Column>

                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ textAlign:"center" }}>
                                    {item.PorcentajeReembolso}
                                </Column>

                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ color: colorImporteReembolsable, textAlign: "right" }}>
                                    {label.formatMoneyPersonalized(item.ImporteReembolsable, item.Moneda)}
                                </Column>
                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })


    interface IComisiones extends page.IProps {
        motivoCancelacion?: any;
    }

    export let Comisiones: any = global.connect(class extends React.Component<IComisiones, IComisiones> {
        constructor(props: IComisiones) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.motivoCancelacion = Forms.getValue("MotivoCancelacion", CANCELACIONEXPEDIENTE);
            return retValue;
        };
        cargarElementos(idExpediente: number, idMotivoCancelacion: number): void {

            if (idExpediente > 0 && idMotivoCancelacion>0) {
                let parametros: any = global.encodeParameters({ idExpediente, idMotivoCancelacion });
                global.dispatchAsync("global-page-data", "base/SCV/expedientes/Get/GetComisiones/" + parametros, COMISIONES);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], COMISIONES);
            };
        }
        componentDidMount() {
            if (isSuccessful(this.props.entidad)) {
                let entidad: any = getData(this.props.entidad);
                this.cargarElementos(entidad.ID, entidad.IdMotivoCancelacion);
            }
        }
        componentWillReceiveProps(nextProps: IComisiones, nextState: IComisiones): any {

            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (isSuccessful(nextProps.entidad)) {
                    let motivoCancelacion: any = this.props.motivoCancelacion;
                    let idMotivoCancelacion: number = motivoCancelacion && motivoCancelacion.ID ? motivoCancelacion.ID : 0;

                    if (idMotivoCancelacion == 0)
                    {
                        let entidad: any = getData(nextProps.entidad);
                        idMotivoCancelacion = entidad && entidad.IdMotivoCancelacion && entidad.IdMotivoCancelacion > 0 ? entidad.IdMotivoCancelacion : 0;
                    }
                    let idEntidad: any = getDataID(nextProps.entidad);
                    this.cargarElementos(idEntidad, idMotivoCancelacion);
                }
            };

            if (global.hasChanged(this.props.motivoCancelacion, nextProps.motivoCancelacion)) {
                if (isSuccessful(nextProps.entidad)) {
                    let idEntidad: any = getDataID(this.props.entidad);
                    let motivoCancelacion: any = nextProps.motivoCancelacion;
                    let idMotivoCancelacion: number = motivoCancelacion && motivoCancelacion.ID ? motivoCancelacion.ID : 0;
                    this.cargarElementos(idEntidad, idMotivoCancelacion);
                }
            };

        };
        render(): JSX.Element {
            return <page.SectionList
                id={COMISIONES}
                title={"Comisiones"}
                icon="fa fa-table"
                parent={config.id}
                style={{ paddingTop: 20 }}
                hideNewButton={true}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Agente"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Tipo Comisión"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"% Penalización"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Importe Penalización"}</Column>
                    </Row>
                </div>}
                readonly={false}
                aggregate={(item?: any, values?: any) => {
                    let retValue: any = values ? values : {};

                    if (item && item.Usuario) {
                        if (!values.usuario) {
                            values.usuario = item.Usuario;
                            values.renderGroup = true;
                        }
                        else {
                            //
                            if (values.usuario.ID !== item.Usuario.ID) {
                                values.usuario = item.Usuario;
                                values.renderGroup = true;
                            }
                            else {
                                values.renderGroup = false;
                            };
                        };
                    };

                    return retValue;
                }}
                formatter={(index: number, item: any, values: any) => {
                    return <Row>

                        {values && values.renderGroup === true ?
                            <Column size={[12, 12, 12, 12]}>
                                <Row className="listItem-groupHeader">
                                    <Column size={[12, 12, 12, 12]}>
                                        {item.Usuario.Nombre}
                                        {" "}
                                        {item.Usuario.Apellidos}
                                    </Column>
                                </Row>
                            </Column>
                            :
                            null}

                        <Column>
                            <Row>
                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                </Column>
                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    {item.TipoComision.Nombre}
                                </Column>
                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{textAlign: "right" }}>
                                    {label.formatMoneyPersonalized(item.ComisionMoneda, item.Moneda)}
                                </Column>


                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{ textAlign: "center" }}>
                                    {item.PorcentajePenalizacion}
                                </Column>

                                <Column size={[12, 2, 2, 2]} className="listItem-default-item" style={{textAlign: "right" }}>
                                    {label.formatMoneyPersonalized(item.ImportePenalizacion, item.Moneda)}
                                </Column>

                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })
    interface ITipoDeComercializacion extends IDropDrownListProps {
        desarrollo?: number;
        entidad?: any;
    }

    export let TipoComercializacion: any = global.connect(class extends React.Component<ITipoDeComercializacion, {}>{
        static props: any = (state: any) => ({
            items: state.global.TIPOCOMERCIALIZACION,
            entidad: state.global.currentEntity,
            desarrollo: Forms.getValue("Desarrollo", config.id, state),
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoComercializacion",
            label: "Tipo Comercialización",
            helpLabel: "Seleccione el Tipo de Comercializacion",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            cargarDatos: true
        };
        getDesarrollo(props: IDropDrownListProps): any {
            let idForm: string = props.idFormSection ? props.idFormSection : props.idForm;
            let retValue: any = Forms.getValue("Desarrollo", idForm, props.forms);
            if (!retValue) {
                let idDesarrollo: number = Forms.getValue("IdDesarrollo", idForm, props.forms);
                if (idDesarrollo > 0) {
                    retValue = { ID: idDesarrollo, Clave: "", Nombre: "" };
                }
                else {
                    retValue = { ID: 0, Clave: "", Nombre: "" };
                };
            };
            //
            //Forms.updateFormElement(config.id, this.props);
            return retValue;
        };
        componentWillMount(): void {
            global.dispatchSuccessful("load:TIPOCOMERCIALIZACION", []);

        }
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                if (this.props.cargarDatos) {
                    let desarrollo: any = this.props.desarrollo;
                    if (desarrollo && desarrollo > 0) {
                        dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/"
                            + global.encodeParameters({ IdDesarrollo: desarrollo.ID, TipoOperacion: 'Lista' }));
                    }
                    else {
                        global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
                    }
                }
                else {
                    global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
                }
            };
        };
        componentWillReceiveProps(nextProps: ITipoDeComercializacion, nextState: ITipoDeComercializacion): any {
            let thisDesarrollo: any = this.getDesarrollo(this.props);
            let nextDesarrollo: any = this.getDesarrollo(nextProps);
            if (hasChanged(this.props.desarrollo, nextProps.desarrollo)) {
                let desarrollo: any = nextProps.desarrollo;
                if (desarrollo && desarrollo.ID > 0) {
                    let props: any = Forms.cloneElementProps(this.props, nextProps);
                    props.value = { ID: -1, Nombre: "Seleccione un Tipo de Comercialización" };
                    Forms.updateFormElement(config.id, props);
                    dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/"
                        + global.encodeParameters({ IdDesarrollo: desarrollo.ID, TipoOperacion: 'Lista' }));

                    if (hasChanged(this.props.items, nextProps.items)) {
                        if (isSuccessful(nextProps.items)) {
                            let data: any = getData(nextProps.items);
                            if (data.length > 0) {

                                let currentEntity: any = getData(this.props.entidad);
                                let tipoComercializacion: any = currentEntity.TipoComercializacion;
                                let foundTipoComercializacion: boolean = false;


                                if (tipoComercializacion && tipoComercializacion.Clave) {
                                    for (var i = 0; i < data.length; i++) {
                                        let value: any = data[i];
                                        if (value.Clave == tipoComercializacion.Clave) {
                                            Forms.updateFormElement(config.id, "TipoComercializacion", { ID: value.ID, Clave: value.Clave });
                                            foundTipoComercializacion = true;
                                            break;
                                        }
                                    }
                                    if (foundTipoComercializacion == false) {
                                        Forms.updateFormElement(config.id, "TipoComercializacion", { ID: -1, Nombre: "Seleccione un Tipo de Comercialización" });
                                    }
                                }

                            }
                        }
                    }
                } else {
                    global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
                }
            }
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    interface IIntegrantesGrupo extends IDropDrownListProps {
        desarrollo?: any;
        fase?: any;
        entidad?: any;
    }
    let IntegrantesGrupoDDL: any = global.connect(class extends React.Component<IIntegrantesGrupo, {}> {
        static props: any = (state: any) => ({
            items: state.global.IntegrandesGruposDDL,
            desarrollo: Forms.getValue("Desarrollo", config.id),
            fase: Forms.getValue("Fase", EXPEDIENTE_CONFIGURACIONES_ID),
            entidad: state.global.currentEntity,
        });
        static defaultProps: IIntegrantesGrupo = {
            id: "Posicion",
            items: createDefaultStoreObject([]),
            label: "Responsable",
            helpLabel: "Seleccione un Responsable",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            matchers: ["Usuario.Nombre", "Usuario.Apellidos"],
            itemFormatter: (item, container): any =>
            {
                if (!item.id) {
                    return $(["<span>", item.text, "</span>"].join(""));
                }
                else {
                    if (item.ID == -1)
                    {
                        return $(["<span>", item.Nombre, "</span>"].join(""));
                    }
                    return $([
                        "<span>",
                        item.Nombre ? item.Nombre : null,
                        "</span>&nbsp;",
                        "<span class='badge badge-info bold'>",
                        item.Usuario ? [item.Usuario.Nombre, item.Usuario.Apellidos].join(" ") : null,
                        "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return item.text;

                if (item.ID == -1) {
                    return $(["<span>", item.Nombre, "</span>"].join(""));
                }

                return $([
                    "<span>",
                    item.Nombre ? item.Nombre : null,
                    "</span>&nbsp;",
                    "<span class='badge badge-info bold'>",
                    item.Usuario ? [item.Usuario.Nombre, item.Usuario.Apellidos].join(" ") : null,
                    "</span>"
                ].join(""));
            }
        };
        obtenerItems(desarrollo: any, fase: any): void
        {
            if ((desarrollo && desarrollo.ID > 0) && (fase && fase.ID > 0)) {
                dispatchAsync("load::IntegrandesGruposDDL", "base/scv/Desarrollos/Get/GetIntegrantesGrupoByFase/" + global.encodeObject({ idDesarrollo: desarrollo.ID, idFase: fase.ID }));
            }
            else
            {
                dispatchSuccessful("load::IntegrandesGruposDDL",[]);
            }
        };
        componentDidMount(): void {
            this.obtenerItems(this.props.desarrollo, this.props.fase);
        };
        componentWillReceiveProps(nextProps: IIntegrantesGrupo, nextState: IIntegrantesGrupo): any
        {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo))
            {
                this.obtenerItems(nextProps.desarrollo, this.props.fase)
            };
            if (global.hasChanged(this.props.fase, nextProps.fase))
            {
                this.obtenerItems(this.props.desarrollo, nextProps.fase)
            };
        };
        render(): any {

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    interface IAsesoresCliente extends IDropDrownListProps {
        entidad?: any;
        cargaDatos?: (idCliente?: any) => void;
    }

    export let ASESORESCLIENTEDDL: any = global.connect(class extends React.Component<IAsesoresCliente, {}> {
        static props: any = (state: any) => ({
            items: state.global.ASESORESCLIENTEDDL,
            entidad: state.global.currentEntity,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            cargaDatos: (idCliente?: any): void => {
                if (idCliente > 0)
                {
                    Forms.updateFormElement(config.id, "Asesor", { ID: -1, Clave: "Seleccione una opción" });
                    dispatchAsync("load::ASESORESCLIENTEDDL", "base/kontrol/ScvClientes/Get/ObtenerAsesoresPorCliente/" + global.encodeObject(global.assign({ idCliente })) );
                }
                else {
                    global.dispatchSuccessful("load::Desarrollo_CCINGRESO", []);
                }
            }
        });
        static defaultProps: IAsesoresCliente = {
            id: "Asesor",
            items: createDefaultStoreObject([]),
            label: "AGENTE",
            helpLabel: "Seleccione el Agente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 4, 4, 4],
            itemFormatter: (item, container): any =>
            {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1)
                {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                let text: string = item.Titular == true ? "T" : "-";

                return $([
                    "<span style='margin-right:2px' class='badge badge-primary'>", text, "</span>",
                    "<span> ", item.Posicion.Usuario.Nombre, " ", item.Posicion.Usuario.Apellidos, "</span>",
                    "<span class='badge badge-primary' style='margin-left:2px'> ", item.Nombre,"</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                let text: string = item.Titular == true ? "T" : "-";

                return $([
                    "<span style='margin-right:2px' class='badge badge-primary'>", text, "</span>",
                    "<span> ", item.Posicion.Usuario.Nombre, " ", item.Posicion.Usuario.Apellidos, "</span>",
                    "<span class='badge badge-primary' style='margin-left:2px'>", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items))
            {
                let data: any = getData(this.props.entidad);

                if (data && data.IdCliente && data.IdCliente > 0)
                {
                    this.props.cargaDatos(data.IdCliente);
                }
            }
        };
        componentWillReceiveProps(nextProps: IAsesoresCliente, nextState: IAsesoresCliente): any
        {
            if (global.hasChanged(this.props.entidad, nextProps.entidad))
            {
                let data: any = getData(nextProps.entidad);

                if (data && data.IdCliente && data.IdCliente>0)
                {
                    this.props.cargaDatos(data.IdCliente);
                }
            };

            if (global.hasChanged(this.props.items, nextProps.items))
            {
                let data: any[] = getData(nextProps.items);
                let usuarioTitular: any = null;

                for (var i = 0; i < data.length; i++)
                {
                    if (data[i].Titular == true)
                    {
                        usuarioTitular = data[i];
                    }
                }
                Forms.updateFormElement(config.id, "Asesor", usuarioTitular);
            };

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


}
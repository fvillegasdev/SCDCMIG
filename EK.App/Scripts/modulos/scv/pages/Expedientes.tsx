namespace EK.Modules.SCV.Pages.Expedientes {
    "use strict";
    const AGENTES_ID: string = "agentes";
    let IdCliente = -2;
    const clientes_ID: string = "clientes";

    const EXPEDIENTES_ID: string = "dashboardExpedientes";
    const FASE_ID: string = "dashboardFases";
    const ETAPA_ID: string = "dashboardEtapas";
    const GEO_ID: string = "dashboardGeo";

    let PAGE_ID = "Expedientes";
    const scv_Desarrollos_Prototipos: string = "Prototipos";
    const scv_Desarrollos_Esquemas: string = "Esquemas";
    const vistasMapa: string = "VistasMapa";

    let Iconos: any = {};
    Iconos[scv_Desarrollos_Prototipos] = "fa fa-object-group";
    Iconos[scv_Desarrollos_Esquemas] = "fa fa-cc-diners-club";
    const w: any = window;

    const config: page.IPageConfig = global.createPageConfig("expedientes", "scv", [EXPEDIENTES_ID, AGENTES_ID, "ClientesSinExpediente"]);


    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f.IdTags) f.IdTags = undefined; // 

        if (type === "etapas") {
            // only update expedientes
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardExpedientes", { parametros: f }, EXPEDIENTES_ID);
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardMap", { parametros: f }, GEO_ID);
        }
        else if (type === "fases") {
            // only update etapas, expedientes
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardExpedientes", { parametros: f }, EXPEDIENTES_ID);
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardEtapas", { parametros: f }, ETAPA_ID);
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardMap", { parametros: f }, GEO_ID);
        }
        else {
            // don't need etapa y fase
            if (f) {
                f.IdEtapa = undefined;
                f.IdFase = undefined;
                f.IdEstatusEtapa = undefined;
                //f.VerExpedientes = undefined;
            };
            // update all
            if (f) {
                if (f && f.Tags) {
                    let v: any[] = f.Tags;
                    let tags: string = "";
                    v.map((value: any, index: number) => {
                        if (value) {
                            tags = tags + value.ID + ",";
                        }
                    });
                    f.Tags = tags.substring(0, tags.length - 1);;
                }
            }
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboard", { parametros: f }, [ETAPA_ID, FASE_ID, EXPEDIENTES_ID, GEO_ID]);
            //props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardExpedientes", { parametros: f }, EXPEDIENTES_ID);
            //props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardFases", { parametros: f }, FASE_ID);
            //props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardEtapas", { parametros: f }, ETAPA_ID);
            //props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardMap", { parametros: f }, GEO_ID);
        };
    };


    export let formatNombre: (nombre: string, apellidos: string, id: string, link: string, adicional?: string) => any =
        (nombre: string, apellidos: string, id: string, link: string, adicional?: string): any => {

            let url: string = link + id;
            return <div className="label-link-grid label-value" style={{ whiteSpace: "normal" }}>
                <a target="_blank" rel="noopener noreferrer" href={url} className="link2">
                    <i className="fas fa-external-link-square-alt"></i>
                </a>
                <a className="link-text" target="_blank" rel="noopener noreferrer" href={url} style={{ fontSize: "10px" }}>
                    {adicional != null ?
                        <span className="badge">{adicional}</span>
                        : null}
                    <span className="link-text-name">{nombre + " " + apellidos}</span>
                </a>
            </div>;
        };


    export class Vista extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        };
        onView(item: any, props: page.IProps): any {
            let retValue: any;
            retValue = getData(item) ? getData(item).ID : 0;
            if (retValue > 0) {
                go("scv/expedientes/" + retValue, false);
            };
        };
        onExport(element: any): any {

            let idForm: string = [config.id, "filters"].join("$");

            let model: any = Forms.getForm(idForm);

            let item: any = {};
            item['ID'] = model.ID;
            item['IdDesarrollo'] = model.Desarrollo ? model.Desarrollo.ID : null;
            item['IdEsquema'] = model.Esquema ? model.Esquema.ID : null;
            item['IdGenero'] = model.Genero ? model.Genero.ID : null;
            item['IdCliente'] = model.Cliente ? model.Cliente.ID : null;
            item['IdEstado'] = model.Estado ? model.Estado.ID : null;
            item['IdEstadoCivil'] = model.EstadoCivil ? model.EstadoCivil.ID : null;
            item['IdRangoIngresos'] = model.RangoIngresos ? model.RangoIngresos.ID : null;
            item['IdGiro'] = model.Giro ? model.Giro.ID : null;
            item['IdEstatusCliente'] = model.EstatusCliente ? model.EstatusCliente.ID : null;
            item['IdTipoComercializacion'] = model.TipoComercializacion ? model.TipoComercializacion.ID : null;
            item['IdRegimenConyugal'] = model.RegimenConyugal ? model.RegimenConyugal.ID : null;
            item['VerExpedientes'] = model.VerExpedientes;

            if (model.Agente && model.Agente.ID > 0) {
                item['IdAgente'] = model.Agente ? model.Agente.ID : null;
            }

            // item['TagExpediente'] = model.Opcionales;

            //Exportamos a Excel
            let formName: string = "Expedientes";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "expediente/exportar/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (JSON.stringify(item));
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);

        };
        render(): JSX.Element {
            let ml: any = config.getML();

            console.count("*** RENDER: Vista ***");
            /*
                                   
             */
            return <page.Main {...config}
                allowNew={false}
                allowEdit={false}
                allowSave={false}
                allowDelete={false}
                pageMode={PageMode.Principal}
                onView={this.onView}
                onExport={this.onExport}
                onFilter={onPageFilter}>
                <PageButtons>
                    <ExpMapViewerButton />
                </PageButtons>
                <AgenteSeleccionado />
                <Row>
                    <EK.Modules.Kontrol.Pages.TareasManuales.TareasSectionList />
                    <EK.Modules.Kontrol.Pages.Citas.CitasSectionList />
                </Row>
                <page.Filters>
                    <input.Integer label="FOLIO EXPEDIENTE" id="ID" size={[4, 2, 2, 2]} />
                    <ddl.DesarrollosDDL id="Desarrollo" addNewItem="VT" size={[12, 6, 6, 6]} />
                    <EsquemasSeguimiento id="Esquema" addNewItem="VT" size={[12, 4, 4, 4]} />
                    <ddl.GenerosDDL size={[6, 2, 2, 2]} addNewItem="VT" />
                    <ClientesDDL id="Cliente" size={[12, 6, 6, 6]} />
                    <select.Estados id="Estado" size={[6, 4, 4, 4]} />
                    <ddl.EstadoCivilDLL addNewItem="VT" size={[12, 4, 4, 4]} />
                    <ddl.RegimenDLL addNewItem="VT" size={[12, 4, 4, 4]} />
                    <ddl.RangosIngresosDDL addNewItem="VT" size={[12, 4, 4, 4]} />
                    <ddl.GirosDDL addNewItem="VT" size={[12, 4, 4, 4]} />
                    <ddl.EstatusClienteDDL addNewItem="VT" size={[12, 4, 4, 4]} />
                    <ddl.TipoComercializacionDDL addNewItem="VT" size={[12, 4, 4, 4]} />
                    <TagsExpedientes size={[12, 12, 12, 12]} />
                </page.Filters>
                <ExpedientesDashBoard />
                <Row style={{ marginTop: "3%" }}>
                    <EK.Modules.SCV.Pages.Clientes.CientesSinExpedientes />
                </Row>
                <Sidebar id="sb_agentes" className="c-sidebar-sb">
                    <Agentes />
                </Sidebar>
            </page.Main>;
            //
            //
        };
    };
    let ExpedientesDashBoard: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            //
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
            this.onchangeElementoEsquema = this.onchangeElementoEsquema.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global["catalogo$" + ETAPA_ID];
            //
            return retValue;
        };
        onchangeElementoEsquema(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Esquema_Expediente_Seleccionado", itemFinal);
        };
        onClickElementHorizontal(item: any): void {
            let etapa: number = null;
            let action: number = item._action;
            //
            if (item.IdEtapa > 0) {
                etapa = item.Etapa;
            };
            //
            Forms.updateFormElement(config.idFilters, "Etapa", etapa);
            if (action > 0) {
                Forms.updateFormElement(config.idFilters, "IdEtapaEstatus", action);
            };
            //
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "etapas");
        };
        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let EstadoSeleccionado: any = '';
            let data: any = global.getData(this.props.data);
            //
            let filters: any = Forms.getValues("");

            let muestraEstado: boolean = filters.EstadoSeleccionado ? true : false;

            if (muestraEstado) {
                EstadoSeleccionado = filters.EstadoSeleccionado;
            };

            let estiloPersonalizado: React.CSSProperties = {
                opacity: EstadoSeleccionado === "ProspectosSinExpedientes" ? 0 : 1.0,
                pointerEvents: EstadoSeleccionado === "ProspectosSinExpedientes" ? "none" : "auto",
                paddingRight: "5px",
                paddingLeft: "5px"
            };
            let IndicaActualizando: any = isSuccessful(this.props.data) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fa fa-refresh"} colorClass={"font-blue"} />;

            let itemsModificados: any[];
            if (isSuccessful(this.props.data)) {
                itemsModificados = data;
                //
                let nuevoItem: any = {};
                let nuevoItemFase: any = {};
                let nuevoElemento: any = 'SI';
                if (itemsModificados.length > 0) {
                    if (itemsModificados[0].Clave === 'TODAS') {
                        nuevoElemento = 'NO'
                    }
                };
                if (nuevoElemento === 'SI') {
                    nuevoItemFase['ID'] = null;
                    nuevoItemFase['Clave'] = 'Las Etapas';
                    nuevoItemFase['Nombre'] = 'Las Etapas';

                    let totalFases: number = 0;
                    let totalCantidadActivos: number = 0;
                    let totalCantidadSuspendidos: number = 0;
                    let totalCantidadPorVencer: number = 0;
                    let totalCantidadVencidos: number = 0;

                    data.forEach((value: any, index: number): any => {
                        totalCantidadActivos += value.CantidadActivos;
                        totalCantidadSuspendidos += value.CantidadSuspendidos;
                        totalCantidadPorVencer += value.CantidadPorVencer;
                        totalCantidadVencidos += value.CantidadVencidos;
                    });

                    nuevoItem['ID'] = null;
                    nuevoItem['Clave'] = 'TODAS';
                    nuevoItem['Nombre'] = 'TODAS';
                    nuevoItem['Fase'] = nuevoItemFase;
                    nuevoItem['CantidadActivos'] = totalCantidadActivos;
                    nuevoItem['CantidadSuspendidos'] = totalCantidadSuspendidos;
                    nuevoItem['CantidadPorVencer'] = totalCantidadPorVencer;
                    nuevoItem['CantidadVencidos'] = totalCantidadVencidos;

                    itemsModificados.unshift(nuevoItem);
                }
                IndicaActualizando = '';
            }

            let items: DataElement = new DataElement(this.props.data);
            items.data = itemsModificados;
            //
            return <Row>
                <Column size={[12, 12, 12, 12]} style={{ estiloPersonalizado }} >
                    <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                        <div className="portlet-body">
                            <Row className="timeline-expediente">
                                <Column size={[12, 12, 12, 12]} style={{ padding: "0 10px 5px" }}>
                                    <ExpedientesDashBoardFases />
                                </Column>
                                <Column size={[12, 12, 12, 12]} className="events-container">
                                    {IndicaActualizando}
                                    <EKHorizontalTimeLine
                                        items={items}
                                        customScroll={true}
                                        onClickElementHorizontal={this.onClickElementHorizontal}

                                        page={$page}
                                        tipoPresentacion={4} />
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
                <Column size={[12, 12, 12, 12]}    >
                    <VistaExpedientes />
                </Column>
            </Row>;
            //
        }
    });
    export class VistaExpedientes extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.inicializaClickMensaje = this.inicializaClickMensaje.bind(this);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            this.onGetData = this.onGetData.bind(this);
        }

        inicializaClickMensaje() {
            $(".boton").click(function () {
                var dataId = $(this).attr("data-id");
                let link: any;
                link = '/scv/expedientes/' + dataId       //location.href 
                let notificacion: any = ({
                    Nombre: '',
                    Descripcion: '',
                    Link: link
                });
                dispatchSuccessful("notificaciones-setSelected", notificacion);
                go("/kontrol/notificaciones/id?nuevo");
            });
        };
        onRowDoubleClick(item: any): any {
            let data: DataElement = config.getCatalogo(EXPEDIENTES_ID);
            if (isSuccessful(data)) {
                go("scv/expedientes/" + item.ID);
            };
        };
        onGetData(data: DataElement): DataElement {
            let retValue: DataElement = config.getCatalogo(EXPEDIENTES_ID);
            if (global.isSuccessful(data)) {
                let allData: any = global.getData(data);

                retValue.data = allData.Expedientes;
            }
            else {
                retValue.data = [];
            };

            return retValue;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            console.count("*** RENDER: VistaExpedientes ***");
            let formatConfigAcciones: (data: any, row: any) => any = (data: any, row: any): any => {
                let w: any = window;

                let messageWindowFn: string = "modalMessage";
                let tareasWindowFn: string = "modalTareas";
                let citasWindowFn: string = "modalCitas";


                let windowFn: string = "$$ModalID";

                if (!w[windowFn]) {
                    w[windowFn] = (id: number, type: string) => {
                        if (type === messageWindowFn) {
                            global.goModal(messageWindowFn, "#/kontrol/notificaciones/id", { ID: -1, Link: "#/scv/expedientes/" + id }, "nuevo");
                        }
                        else if (type === tareasWindowFn) {
                            global.goModal(tareasWindowFn, "#/kontrol/tareasRapidas/id", { ID: -1, IdExpedienteREF: id }, "nuevo");
                        }
                        else if (type === citasWindowFn) {
                            global.goModal(citasWindowFn, "#/kontrol/citas/id", { ID: -1, IdExpedienteREF: id }, "nuevo");
                        }
                    };
                }

                let color: string = ""

                switch (row.ClaveDashboard) {
                    case "S":
                        color = "#337ab6";
                        break;
                    case "A":
                        color = "#8bc780";
                        break;
                    case "W":
                        color = "#ff8f00";
                        break;
                    case "V":
                        color = "#df0707";
                        break;
                }
                //

                return <Row style={{ textAlign: "center" }}>

                    <div className="btn btn-circle btn-xs" title="Alerta de semaforo">
                        <span style={{ color: color, fontSize: "12px" }} className="fad fa-circle"></span>
                    </div>

                    <div className="btn btn-circle btn-xs" title="Configuracion">
                        <a style={{ color: "gray" }} href={"../#/scv/expedientes/configuracion/" + row.ID}><i className="glyphicon glyphicon-cog"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Mensajes">
                        <a style={{ color: "gray" }} data-id="data" onClick={() => window[windowFn](row.ID, messageWindowFn)} className="boton"><i className="icon-envelope"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Tareas">
                        <a style={{ color: "gray" }} data-id="data" onClick={() => window[windowFn](row.ID, tareasWindowFn)} className="TareasExpedientes"><i className="fas fa-calendar-plus"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Citas">
                        <a style={{ color: "gray" }} data-id="data" onClick={() => window[windowFn](row.ID, citasWindowFn)} className="CitasExpedientes"><i className="fa fa-calendar-alt"></i></a>
                    </div>

                </Row>;
            };

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "ClaveDashboard", width: "150px", isModal: true, format: formatConfigAcciones, fixed: true })
                .addID({ data: "ID", width: "80px", title: "Expediente", fixed: true })
                .addLinkCliente({ width: "250px", fixed: true })
                .add({ data: "Cliente.NombreCompleto", hidden: true })
                .add({ data: "Cliente.ApellidoPaterno", hidden: true })
                .add({ data: "Cliente.ApellidoMaterno", hidden: true })
                .add({ data: "Cliente.Celular", title: "Teléfono", width: "100px", format: global.formatTelefono })
                .addLinkEmailClienteExpediente({ width: "120px" })

                .add({ data: "Fase.Clave", title: "Fase", width: "100px" })
                .add({ data: "Etapa.Nombre", width: "150px" })
                .addDateFormat({ data: "Etapa.FechaInicio", width: "130px" })
                .add({ data: "Etapa.DiasTranscurridos", width: "70px" })

                .add({ data: "PorcentajeAvance", title: "Avance", width: "100px", format: label.formatProgressBarEx })
                .addLinkUsuario({ title: "Responsable del Exp", data: "Usuario", width: "180px" });


            return <Row>
                <Column>
                    <dt.DataTableExtended id={EXPEDIENTES_ID} dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />

                    <modal.Modal id="modalMessage" url={"about:blank"}></modal.Modal>
                    <modal.Modal id="modalCitas" url={"about:blank"}></modal.Modal>
                    <modal.Modal id="modalTareas" url={"about:blank"}></modal.Modal>
                </Column>
            </Row>;
        };
    };

    interface IExpedientesDashBoardFases extends page.Base {
        faseSeleccionada: any;
        data: any;
    };

    //let ExpedientesDashBoardFases: any = global.connect(class extends IExpedientesDashBoardFases {
    let ExpedientesDashBoardFases: any = global.connect(class extends React.Component<IExpedientesDashBoardFases, IExpedientesDashBoardFases> {
        constructor(props: IExpedientesDashBoardFases) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.faseSeleccionada = Forms.getValue("Fase", "expedientes$filters");
            retValue.data = state.global["catalogo$" + FASE_ID];
            //
            return retValue;
        };
        //static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        //    getIndicadores: (ArgIdCliente: number, ArgEstado: string, ArgIdDesarrollo?: number, ArgIdEsquema?: number ): void => {
        //        let encodedParams: string = global.encodeParameters({ IdCliente: ArgIdCliente, ClaveEstado: ArgEstado, IdDesarrollo: ArgIdDesarrollo, IdEsquema: ArgIdEsquema});
        //        let encodedURL: any = "SCV/Expedientes/DashBoard/Fases/" + encodedParams;
        //        dispatchAsync("global-page-data", encodedURL, "dashBoardIndicadoresFases");
        //    }
        //});
        onClick(valor: any, e: any): void {
            let fase: any = null;

            if (valor && valor.ID > 0) {
                fase = valor;
            };

            Forms.updateFormElement(config.idFilters, "Fase", fase);
            Forms.updateFormElement(config.idFilters, "Etapa", null);
            Forms.updateFormElement(config.idFilters, "IdEtapaEstatus", null);
            //
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "fases");
        };
        shouldComponentUpdate(nextProps: IExpedientesDashBoardFases, nextState: IExpedientesDashBoardFases): boolean {
            return global.hasChanged(this.props.data, nextProps.data) ||
                global.hasChanged(this.props.faseSeleccionada, nextProps.faseSeleccionada);
        };
        render(): JSX.Element {
            let indicadores: any = global.getData(this.props.data);
            let EstadoSeleccionado: any = '';
            let iconoEstadoSeleccionado: any = '';
            let faseSeleccionada: any = Forms.getValues("Fase");
            let thatProps: IExpedientesDashBoardFases = this.props;

            console.count("*** RENDER: ExpedientesDashBoardFases ***");

            let IndicaActualizando: any = <AwesomeSpinner paddingTop={15} size={28} icon={"fa fa-refresh"} colorClass={"font-blue"} />;;

            let itemsModificados: DataElement = new DataElement(this.props.data);
            itemsModificados.data = indicadores;
            if (isSuccessful(this.props.data)) {
                let nuevoItem: any = {};

                let totalFases: number = 0;
                let nuevoElemento: any = 'SI';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave === 'TODOS') {
                        nuevoElemento = 'NO'
                    }
                }
                if (nuevoElemento === 'SI') {
                    indicadores.forEach((value: any, index: number): any => {
                        totalFases += value.ConteoExpediente;
                    });

                    nuevoItem['ID'] = null; nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODAS';
                    nuevoItem['ConteoExpediente'] = totalFases;

                    itemsModificados.data.unshift(nuevoItem);
                }
                IndicaActualizando = "";
                itemsModificados.timestamp = Number(new Date());
                itemsModificados = itemsModificados.getActiveItems();
            }

            let items: DataElement = global.isSuccessful(itemsModificados) ? itemsModificados : null;
            let itemsData: any[] = global.getData(items, []);

            let itemsElements: any = itemsData.map((item: any, index: number) => {
                let faseSeleciconada: string = thatProps.faseSeleccionada && thatProps.faseSeleccionada.Clave ? thatProps.faseSeleccionada.Clave : "TODOS";
                let estatusSeleccion: boolean = faseSeleciconada == item.Clave ? true : false;
                let estatusClass: string = "fase-expediente";
                //
                if (estatusSeleccion == true) {
                    estatusClass += " selected";
                };
                //
                return <Column size={[6, 6, 2, 2]} key={item.Clave}>
                    <div className={estatusClass} onClick={(e) => this.onClick(item, e)}>
                        <span className="fase-label">{item.Nombre}</span>
                        <span className="badge badge-success ek-sombra">{item.ConteoExpediente}</span>
                    </div>
                </Column>;
            });

            return <div>
                {IndicaActualizando === "" ? itemsElements : IndicaActualizando}
            </div>;
        }
    });
    interface IAgenteProps extends page.IProps {
        agente?: any;
        estado?: any;
        verExpedientes?: any;
        items?: DataElement;
    };
    let Agentes: any = global.connect(class extends React.Component<IAgenteProps, IAgenteProps> {
        constructor(props: IAgenteProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
            this.onCollapse = this.onCollapse.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.agente = Forms.getValue("Agente", config.idFilters, state);
            retValue.items = state.global["catalogo$" + AGENTES_ID];
            //retValue.estado = Forms.getValue("Estatus", config.id, state);
            //
            return retValue;
        };
        onCollapse(collapsed: boolean): any {
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                this.props.config.dispatchCatalogoBasePost("/usuarios/descendientes/id", { id: this.props.agente ? this.props.agente.ID : null }, AGENTES_ID);
            };
        };
        //componentWillReceiveProps(nextProps: IAgenteProps) {
        //    if (global.hasChanged(this.props.agente, nextProps.agente) || global.hasChanged(this.props.estado, nextProps.estado)) {
        //        let idAgente: number = null;
        //        if (nextProps.agente) {
        //            idAgente = nextProps.agente.ID;
        //        }
        //        else if (nextProps.estado)
        //        {
        //            var idEstado: number = nextProps.estado.ID;
        //            let parametros: any = global.assign({ id: idAgente, estatus: idEstado });
        //            //
        //            global.dispatchAsyncPost("global-page-data", "base/kontrol/usuarios/GetBP/GetUsuariosDescendiente", { parametros }, AGENTES_ID);
        //        }
        //        else {
        //             this.props.config.dispatchCatalogoBasePost("/usuarios/descendientes/id", { id: idAgente }, AGENTES_ID);
        //        }
        //    };
        //};
        shouldComponentUpdate(nextProps: IAgenteProps): any {
            return global.hasChanged(this.props.agente, nextProps.agente);
        };
        onClick(item: any): any {
            dispatchDefault("global-page-data", null, AGENTES_ID);
            dispatchDefault("global-page-data", null, "ClientesSinExpediente");
            //
            Forms.updateFormElements(config.idFilters, { Agente: item, VerExpedientes: "A" });
            //
            //
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            setTimeout(() => { page.applyFilter(props) }, 100);
            //
            global.closeSidebar("sb_agentes");
        };
        render(): JSX.Element {
            console.count("*** RENDER: Agentes ***");
            let ml: any = $ml[config.id];
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            let idFormSectionFilters: string = AGENTES_ID + "$filters";

            let isActive: (item: any) => boolean = (item: any): any => {
                let estatus: any = Forms.getValue("Estatus", idFormSectionFilters, null);

                if (!estatus) {
                    return false;
                };

                return estatus.ID === -1 || (estatus.Clave === item.Estatus.Clave);
            };

            let iconEstatusFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let estatusColor: string = "";
                if (row.Estatus.Clave === "A") {
                    estatusColor = "#8bc780";
                }
                else if (row.Estatus.Clave === "B") {
                    estatusColor = "#df0707";
                };

                return [
                    <span className="fad fa-circle" key="iconEstatus" style={{ color: estatusColor, fontSize: 12, marginRight: 5 }}></span>,
                    row.Bloqueado === true ? <span className="fad fa-user-lock" key="iconLocked" style={{ color: "#df0707", fontSize: 14 }}></span> : null
                ];
            };

            dtConfig.columns
                .add({ data: "empty", width: "50px", format: iconEstatusFn })
                .addLinkUsuario({ flex: { basis: "50%" } })
                .add({ data: "Posicion.Nombre", flex: { basis: "50%" } });

            dtConfig.filters.push(isActive);
            dtConfig.props.displayPaging = false;

            return <page.SectionListExtended
                id={AGENTES_ID}
                parent={config.id}
                icon="fa fa-folder"
                collapsed={false}
                onCollapse={this.onCollapse}
                level={"sb"}
                dtConfig={dtConfig}
                size={[12, 12, 12, 12]}
                onFilter={() => {
                    global.dispatchSuccessful("global-page-data", { data: Number(new Date()) }, AGENTES_ID + "$refresh");
                }}
                onRowSelected={this.onClick}
                onRowDoubleClick={() => { }}
                listFilter={[<ddl.EstatusDDL size={[12, 12, 6, 6]} idFormSection={idFormSectionFilters} addNewItem="VT" />]}
            >
            </page.SectionListExtended>;

            //return <page.SectionList
            //            id={AGENTES_ID}
            //            icon="fa fa-table"
            //            parent={config.id}
            //            idParent={config.id}
            //            level={1}
            //            size={[12, 12, 6, 6]}
            //            listMode="literal"
            //            listHeader={<div key="listHeaderKey" className="sectionAgentes" style={{ padding: "0px 10px" }}>
            //                <Row>
            //                    <ddl.EstatusDDL size={[12, 12, 8, 8]} idFormSection={config.id} addNewItem="VT"/>
            //                </Row>
            //                <Row>
            //                    <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            //                    <Column size={[12, 12, 6, 6]} className="list-default-header">{"Agente"}</Column>
            //                    <Column size={[12, 12, 5, 5]} className="list-default-header hidden-xs hidden-sm">{"Posición"}</Column>
            //                </Row>
            //            </div>}
            //            formatter={(index: number, item: any) => {
            //                var bloq = item.Bloqueado;
            //                var classbloq;
            //                if (bloq == true) {
            //                    classbloq = "fas fa-lock font-red";
            //                }
            //                else
            //                {
            //                    classbloq = "";
            //                }
            //                return <Row>
            //                    <Column size={[1, 1, 1, 1]}>
            //                        <span className={classbloq} style={{ fontSize: 18, paddingLeft: 30, paddingTop:10 }}></span>
            //                    </Column>
            //                    <Column size={[9, 9, 9, 10]} className="listItem-default-item">

            //                        {formatNombre(item.Nombre, item.Apellidos, item.ID, "#/kontrol/usuarios/", item.Email)}
            //                        <span>{item.Posicion.Nombre}</span>
            //                    </Column>
            //                    <Column size={[2, 2, 2, 1]} className="listItem-default-item">
            //                        <Button className={"font-green"} style={{ fontSize: 14 }} icon="fas fa-external-link-alt" iconOnly={true} onClick={() => { this.onClick(item); }}></Button>
            //                    </Column>
            //                </Row>;
            //            }}>
            //        </page.SectionList>;
        }
    });
    let AgenteSeleccionado: any = global.connect(class extends React.Component<IAgenteProps, IAgenteProps> {
        constructor(props: IAgenteProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.agente = Forms.getValue("Agente", config.idFilters, state);
            retValue.verExpedientes = Forms.getValue("VerExpedientes", config.idFilters, state);
            //
            return retValue;
        };
        componentWillMount(): any {
            Forms.updateFormElements(config.idFilters, { Agente: null, VerExpedientes: "E" });
        };
        shouldComponentUpdate(nextProps: IAgenteProps): any {
            return global.hasChanged(this.props.agente, nextProps.agente) || this.props.verExpedientes !== nextProps.verExpedientes;
        };
        onClick(tipo: string, e?: any): any {
            if (tipo === "A") {
                //global.warning("Seleccione un agente de la lista de Agentes");
                ////
                //if ($(".sectionAgentes").size() > 0) {
                //    let topA: number = e.currentTarget.getBoundingClientRect().top;
                //    let topB: number = $(".sectionAgentes").parents(".panel")[0].getBoundingClientRect().top;
                //    //
                //    window.scrollTo(0, topB - topA -25);
                //};
                //
                global.showSidebar("sb_agentes");

                return;
            };
            //
            dispatchDefault("global-page-data", null, AGENTES_ID);
            //
            Forms.updateFormElements(config.idFilters, { Agente: null, VerExpedientes: tipo });
            //
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props);
        };
        render(): JSX.Element {
            console.count("*** RENDER: AgenteSeleccionado ***");

            let classElementEquipo: string = "expediente-view-option";
            let classElementPropios: string = "expediente-view-option";
            let classElementAgente: string = "expediente-view-option";
            let classEquipo: string = "far fa-circle";
            let classPropios: string = "far fa-circle";
            let classAgente: string = "far fa-circle";
            let elementAgente: any = <div key="agente" className="text">Seleccione un agente<span className="hidden-lte-480"> de la lista</span></div>;
            //
            if (this.props.verExpedientes === "E") {
                classElementEquipo += " selected";
                classEquipo = "far fa-dot-circle";
            } else if (this.props.verExpedientes === "P") {
                classElementPropios += " selected";
                classPropios = "far fa-dot-circle";
            } else if (this.props.verExpedientes === "A") {
                classElementAgente += " selected";
                classAgente = "far fa-dot-circle";
                elementAgente = [
                    <div key="agentexs" className="text hidden-gt-480">
                        {this.props.agente ? this.props.agente.Email : ""}
                    </div>,
                    <div key="agente" className="text hidden-lte-480">
                        <span className="badge badge-info">{this.props.agente ? this.props.agente.Email : ""}</span>
                        <span style={{ marginLeft: 10, fontSize: 11, fontWeight: 600 }}>{this.props.agente ? this.props.agente.Nombre : ""} {this.props.agente ? this.props.agente.Apellidos : ""}</span>
                    </div>];
            }

            return <Row style={{ marginLeft: 0, marginRight: 0, marginBottom: 5 }}>
                <Column size={[3, 3, 3, 3]} style={{ padding: 0 }}>
                    <div className={classElementEquipo}>
                        <div className="option" onClick={() => { this.onClick("E"); }}><i className={classEquipo}></i></div>
                        <div className="text hidden-lte-480">Mi equipo</div>
                        <div className="text hidden-gt-480">Equipo</div>
                    </div>
                </Column>
                <Column size={[3, 3, 3, 3]} style={{ padding: 0 }}>
                    <div className={classElementPropios}>
                        <div className="option" onClick={() => { this.onClick("P"); }}><i className={classPropios}></i></div>
                        <div className="text hidden-lte-480">Mis expedientes</div>
                        <div className="text hidden-gt-480">Mis Exp</div>
                    </div>
                </Column>
                <Column size={[6, 6, 6, 6]} style={{ padding: 0 }}>
                    <div className={classElementAgente}>
                        <div className="option" onClick={(x) => { this.onClick("A", x); }}><i className={classAgente}></i></div>
                        {elementAgente}
                    </div>
                </Column>
            </Row>;
        }
    });
    export let ClientesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ClientesExpediente,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Cliente",
            addNewItem: "SO",
            idFormSection: config.idFilters,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre", "ApellidoPaterno", "ApellidoMaterno", "RFC", "CURP", "Emails", "Telefonos"],
            size: [12, 3, 3, 3],
            itemFormatter: (item, container): any => {
                if (item.ID > 0) {
                    if (item.TipoPersona.Clave === "F") {
                        return $([
                            "<div class='bold' style='font-size:11px'>",
                            " " + item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno + " ",
                            "</div>",
                            "<div style='font-size:11px'><span>", item.RFC, "</span>, <span>", item.CURP, "</span></div>",
                            "<div style='font-size:11px'><span>", item.Telefonos, "</span>, <span>", item.Emails, "</span></div>"
                        ].join(""));
                    }
                    else if (item.TipoPersona.Clave === "M") {
                        return $([
                            "<div class='bold' style='font-size:11px'>",
                            " " + item.Nombre,
                            "</div>",
                            "<div style='font-size:11px'><span>", item.RFC, "</span></div>",
                            "<div style='font-size:11px'><span>", item.Telefonos, "</span>, <span>", item.Emails, "</span></div>"
                        ].join(""));
                    };
                }
                else if (item.text != "") {
                    return $(["<span>", item.text, "</span>"].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id || item.ID < 0) {
                    return item.text;
                };
                if (item.TipoPersona.Clave === "F") {
                    return $([
                        "<div>",
                        " " + item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno + " ",
                        "</div>"
                    ].join(""));
                }
                else if (item.TipoPersona.Clave === "M") {
                    return $([
                        "<div>",
                        " " + item.Nombre,
                        "</div>"
                    ].join(""));
                };
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsyncPost("load::ClientesExpediente", "base/scv/dashBoardExpedientes/GetBP/GetDashboardClientes", { parametros: null });
            };
        };
        render(): any {
            console.count("*** RENDER: ClientesDDL ***");

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    interface IEsquemasDashBoard extends IDropDrownListProps {
        faseClave?: string;
        DesarrolloSeleccionado?: any
        FaseSeleccionada?: any;
        idDesarrollo?: number;
        cargaDatos?: (idDesarrollo?: any, Fase?: any) => void;
    }
    export let EsquemasSeguimiento = global.connect(class extends React.Component<IEsquemasDashBoard, {}> {
        constructor(props: IEsquemasDashBoard) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.EsquemaExpediente
        });
        static defaultProps: IEsquemasDashBoard = {
            id: "Esquema",
            items: createDefaultStoreObject([]),
            label: "",
            helpLabel: "Seleccione el Esquema",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6],
            faseClave: null,
            idDesarrollo: null
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EsquemaExpediente", "esquemas/all/" + global.encodeObject({ activos: 1 }));
            };
        };

        render(): any {
            console.count("*** RENDER: EsquemasSeguimiento ***");
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    export let TagsExpedientes = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.TagsExpedientes
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tags",
            itemKey: "ID",
            itemValue: "Nombre",
            mode: SelectModeEnum.Multiple,
            matchers: ["Clave"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave,
                            "</span>",
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Nombre,
                            "</span> "
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return item.Clave;
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return item.Clave;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Clave,
                        "</span>"].join(""));
                }
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = 0;
                for (var i = 0; i < items.length; i++) {
                    tp = items[i].TipoClasificador;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            },
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TagsExpedientes", "base/kontrol/clasificadores/Get/GetAll/" + global.encodeObject({ activos: 1, claveTipo: "TAG" }));
            };
        };

        render(): any {
            console.count("*** RENDER: TagsExpedientes ***");
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    interface IMapViewerButtonProps extends IButtonProps {
        entidad?: DataElement;
        entityType?: string;
        dataManager?: StateDataManager;
        url?: string;
        showUpdateGeo?: boolean;
        showRelateLocation?: boolean;
        config?: page.IPageConfig;
    };
    let ExpMapViewerButton: any = global.connect(class extends React.Component<IMapViewerButtonProps, {}> {
        constructor(props: IMapViewerButtonProps) {
            super(props);

            this.getItems = this.getItems.bind(this);
            this.onClick = this.onClick.bind(this);
        };
        //
        static props: any = (state: any) => ({
            info: state.global["catalogo$" + GEO_ID]
        });
        // 
        static defaultProps: IMapViewerButtonProps = {
            id: "btnMap",
            icon: "fa fa-map-pin",
            text: "",
            color: "white",
            className: "btn-ver btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        idModal: string = "modalMapExp";
        getItems(data: any): any {
            let items: any[] = global.getData(data);
            let markers: any[] = [];
            let markersD: any = {};
            let markersC: any = {};
            //
            items.forEach((value: any, index: number) => {
                let idDesarrollo: number = value.Desarrollo.ID;
                if (!markersD[idDesarrollo]) {
                    markersD[idDesarrollo] = global.assign(value, {
                        geolocalizacion: value.Desarrollo.Geolocalizacion,
                        markerType: "desarrollo",
                        icon: "/Content/Img/maps/house_map.png",
                        title: value.Desarrollo.Nombre,
                        infoFn: (item: any) => {
                            let des: any = item.Desarrollo;
                            let desDom: string = des.Direccion + ", " + des.CP + ", " + des.Asentamiento.Nombre + ", " + des.Localidad.Localidad;
                            let desUrl: string = global.getFullUrl("#/scv/desarrollos/" + des.ID);
                            //
                            return "<div><a target='_blank' rel='noopener noreferrer' href='" + desUrl + "'>" + des.Nombre + "</a></div><div style='font-size: 90%;'>" + desDom + "</div>";
                        }
                    });
                };
                let idCliente: number = value.Cliente.ID;
                if (!markersC[idCliente]) {
                    let clienteNombre: string = [value.Cliente.Nombre, value.Cliente.ApellidoPaterno, value.Cliente.ApellidoMaterno].join(" ");
                    markersC[idCliente] = global.assign(value, {
                        geolocalizacion: value.Cliente.Geolocalizacion,
                        markerType: "prospecto",
                        icon: "/Content/Img/maps/man_red_circle.png",
                        title: clienteNombre,
                        expedientes: [value],
                        infoFn: (item: any) => {
                            let retValue: string = "";
                            let cliente: any = item.Cliente;
                            let clienteUrl: string = global.getFullUrl("#/scv/clientes/" + cliente.ID);
                            let clienteDom: string = cliente.Domicilio + ", " + cliente.NumExterior + (cliente.NumInterior ? "-" + cliente.NumInterior : "") + ", " + cliente.CP + ", " + cliente.Asentamiento.Nombre + ", " + cliente.Localidad.Localidad;
                            //
                            retValue = "<div><a target='_blank' rel='noopener noreferrer' href='" + clienteUrl + "'>" + clienteNombre + "</a></div><div style='font-size: 90%;'>" + clienteDom + "</div>";
                            //
                            if (item.expedientes && item.expedientes.length > 0) {
                                retValue += "<div style='border: solid 1px #f1f1f1;padding: 10px;border-radius: 5px;margin-top: 5px;background-color: #efe5fd;'>";
                                for (var iExp = 0; iExp < item.expedientes.length; iExp++) {
                                    let exp: any = item.expedientes[iExp];
                                    let des: any = item.expedientes[iExp].Desarrollo;
                                    let desDom: string = des.Direccion + ", " + des.CP + ", " + des.Asentamiento.Nombre + ", " + des.Localidad.Localidad;
                                    let expUrl: string = global.getFullUrl("#/scv/expedientes/" + exp.Expediente.ID);
                                    let desUrl: string = global.getFullUrl("#/scv/desarrollos/" + des.ID);
                                    //
                                    retValue += "<div style='margin-bottom: 5px;'><a target='_blank' rel='noopener noreferrer' href='" + expUrl + "'><span class='badge' style='background-color: #6002ee;'>#" + exp.Expediente.ID + "</span></a>";
                                    retValue += "<a style='margin-left: 5px;' target='_blank' rel='noopener noreferrer' href='" + desUrl + "'><span style='font-weight: 600;'>" + des.Nombre + "</span>&nbsp;<span style='font-size: 80%;'>" + desDom + "</span></a></div>";
                                };
                                retValue += "</div>";
                            };
                            //
                            return retValue;
                        }
                    });
                }
                else {
                    markersC[idCliente].expedientes.push(value);
                };
            });
            //
            for (var c in markersC) {
                markers.push(markersC[c]);
            };
            for (var d in markersD) {
                markers.push(markersD[d]);
            };
            return markers;
        };
        onClick(e: any): any {
            if (global.isSuccessful(this.props.info)) {
                global.setModalData(this.idModal, { mode: "read", markers: this.getItems(this.props.info) });
                //
                global.goModal(this.idModal, "/kontrol/map/markers?callback=" + this.idModal);
            };
        };
        shouldComponentUpdate(nextProps: IMapViewerButtonProps, nextState: any): any {
            return global.hasChanged(this.props.info, nextProps.info);
        };
        componentWillReceiveProps(nextProps: IMapViewerButtonProps): any {
            if (global.hasChanged(this.props.info, nextProps.info)) {
                if (global.isSuccessful(nextProps.info)) {
                    global.setModalData(this.idModal, { mode: "read", markers: this.getItems(nextProps.info) });
                };
            };
        };
        componentWillUnmount(): void {
            global.setModalData(this.idModal, undefined);
        };
        render(): JSX.Element {
            let icon: string = "fa fa-map-pin";
            console.count("*** RENDER: ExpMapViewerButton ***");
            if (global.isSuccessful(this.props.info)) {
                icon = "fa fa-map-pin";
            }
            else if (global.isLoadingOrUpdating(this.props.info)) {
                icon = "fa fa-refresh fa-spin";
            };
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Read}>
                <div style={{ display: "inline-block" }}>
                    <modal.Modal id={this.idModal} url={"about:blank"}></modal.Modal>
                    <Button {...this.props} onClick={this.onClick} icon={icon} />
                </div>
            </Authorize>;
        };
    });
}
namespace EK.Modules.SCV.Pages.ExpedientesDocumentos {
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

    const config: page.IPageConfig = global.createPageConfig("expedientesDocumentos", "scv", [EXPEDIENTES_ID, AGENTES_ID]);


    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f.IdTags) f.IdTags = undefined; // 

        if (type === "etapas") {
            // only update expedientes
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardDocumentosExpedientes", { parametros: f }, EXPEDIENTES_ID);
        }
        else if (type === "fases") {
            // only update etapas, expedientes
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardDocumentosExpedientes", { parametros: f }, EXPEDIENTES_ID);
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardDocumentosEtapas", { parametros: f }, ETAPA_ID);
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
            if (f)
            {
                if (f && f.Tags)
                {
                    let v: any[] = f.Tags;
                    let tags: string = "";
                     v.map((value: any, index: number) => {
                        if (value) {
                            tags = tags+value.ID + ",";
                        }
                    });
                     f.Tags = tags.substring(0, tags.length - 1);;
                }
            }
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardDocumentosExpedientes", { parametros: f }, EXPEDIENTES_ID);
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardDocumentosFases", { parametros: f }, FASE_ID);
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardDocumentosEtapas", { parametros: f }, ETAPA_ID);
        };
    };


    export let formatNombre: (nombre: string, apellidos: string, id: string, link: string, adicional?: string) => any =
                             (nombre: string, apellidos: string, id: string, link: string, adicional?: string): any => {
                          
                          let url: string = link + id;
       return <div className="label-link-grid label-value">
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
        componentDidMount()
        {
            //dispatchAsync("load::holaMundi", "base/scv/expedientes/Get/GenerarExpediente/");
        }
        render(): JSX.Element {
            let ml: any = config.getML();   
            return <page.Main {...config} allowNew={false} allowEdit={false} allowSave={false} allowDelete={false} pageMode={PageMode.Principal} onView={this.onView} onFilter={onPageFilter}>

                <AgenteSeleccionado />

                <Row>
                    <EK.Modules.Kontrol.Pages.TareasManuales.TareasSectionList />
                    <EK.Modules.Kontrol.Pages.Citas.CitasSectionList />
                </Row>

                <page.Filters>
                    <input.Integer label="FOLIO EXPEDIENTE" id="ID" size={[4, 2, 2, 2]} />
                    <ddl.DesarrollosDDL id="Desarrollo" addNewItem="VT" size={[6, 4, 4, 4]}  />
                    <ObrasDDL size={[6, 3, 3, 3]} addNewItem={"VT"} />
                    <CategoriasDDL addNewItem={"VT"}size={[6, 3, 3, 3]} />
                    <EsquemasSeguimiento id="Esquema" addNewItem="VT" size={[6, 4, 4, 4]}/>
                    <ddl.UsuariosActivosDDL addNewItem="VT" id="Usuario" size={[6, 4, 4, 4]} />
                    <input.Text id="Documento" maxLength="150" size={[6, 4, 4, 4]} label="Documento" />
                    <TagsExpedientes size={[12, 12, 12, 12]} />
                </page.Filters>

                <ExpedientesDashBoard />
                <Row style={{ marginTop:"3%" }}>
                    <Agentes />
                </Row>

            </page.Main>;
        };
    };
    let ExpedientesDashBoard: any = global.connect(class extends page.Base{
        constructor(props: page.IProps) {
            super(props);
            //
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
            this.onchangeElementoEsquema = this.onchangeElementoEsquema.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global["catalogo$"+ETAPA_ID];
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
             </Row>
        }
    });
    export let VistaExpedientes: any = page.connect(class extends page.Base {
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
                go("scv/expedientes/v2/" +item.ID);
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

            let formatConfigAcciones: (data: any, row: any) => any = (data: any, row: any): any => {
                let w: any = window;
                let windowFn: string = "$$ID";
                let modalID: string = "modalID";
                //
                if (!w[windowFn]) {
                    w[windowFn] = (id: number, tipo: number) => {
                        if (tipo === 0) {
                            global.goModal(modalID, "#/kontrol/notificaciones/id", { ID: -1, Link: "#/scv/expedientes/" + id }, "nuevo");
                        }
                        else if (tipo === 1) {
                            global.goModal(modalID, "#/kontrol/tareasRapidas/id", { ID: -1, IdExpedienteREF: id }, "nuevo");
                        }
                        else if (tipo === 2) {
                            global.goModal(modalID, "#/kontrol/citas/id", { ID: -1, IdExpedienteREF: id }, "nuevo");
                        }
                    };
                };
                //
                return <div style={{ textAlign: "center" }}>
                    <div className="btn btn-circle btn-xs" title="Mensajes">
                        <a style={{ color: "gray" }} data-id="data" onClick={() => window[windowFn](data, 0) } className="boton"><i className="icon-envelope"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Tareas">
                        <a style={{ color: "gray" }} data-id="data" onClick={() => window[windowFn](data, 1) } className="TareasExpedientes"><i className="fas fa-calendar-plus"></i></a>
                    </div>
                    <div className="btn btn-circle btn-xs" title="Citas">
                        <a style={{ color: "gray" }} data-id="data" onClick={() => window[windowFn](data, 2)} className="CitasExpedientes"><i className="fa fa-calendar-alt"></i></a>
                    </div>
                </div>;
            };

            let formatRuta: (data: any, row: any) => any = (data: any, row: any): any => {
                //let link: string = ["ExpedienteDocumento/GetFileViewer/" + row.Documento.Uid +"/"+ row.Documento.EntityID].join("/");
                let documento: string = row && row.Documento ? row.Documento.Nombre : "";
                let clave: string = row.Documento && row.Documento.Clave ? row.Documento.Clave : "";

                if (clave == "")
                    return <a title={"Sin Documento"}>{ documento }</a >
                return <a
                    title={"Visualizar Documento"}
                    target={"_blank"}
                    onClick={() => {
                        global.goModal("modalArchivosDocumento", "SCV/Seguimientos/Expediente/Documento/" + row.Documento.Clave)
                    }}
                >{documento}</a>
            };


            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addID({ width: "100px", title: "Expediente", fixed: true })
                .add({ data: "Documento.Nombre", title: "Documento", width: "200px", format: formatRuta })
                .add({ data: "Documento.Categoria", title: "Categoría", width: "100px" })
                .add({ data: "Entidad.Nombre", title: "Descripción", width: "380px" })
                .add({ data: "Fase.Clave", title: "Fase", width: "200px" })
                .add({ data: "PorcentajeAvance", title: "Avance", width: "100px", format: label.formatProgressBarEx })
                .add({ data: "ID", title: "", width: "150px", isModal: true, format: formatConfigAcciones });
            //dtConfig.groups
            //    .add({ data: "Fase.Clave" })

            return <Row>

                <modal.Modal id={"modalArchivosDocumento"} url={"about:blank"}></modal.Modal>

                <Column>
                    <dt.DataTableExtended id={EXPEDIENTES_ID} dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />
                </Column>
            </Row>;
        };
    });

    interface IExpedientesDashBoardFases extends page.Base {
        faseSeleccionada: any;
        data: any;
    };

    let ExpedientesDashBoardFases: any = global.connect(class extends React.Component<IExpedientesDashBoardFases, IExpedientesDashBoardFases> {
        constructor(props: IExpedientesDashBoardFases) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.faseSeleccionada = Forms.getValue("Fase", "expedientes$filters");
            retValue.data = state.global["catalogo$" + FASE_ID];
            return retValue;
        };
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
        shouldComponentUpdate(nextProps: IExpedientesDashBoardFases , nextState: IExpedientesDashBoardFases): boolean {
            return global.hasChanged(this.props.data, nextProps.data) ||
                   global.hasChanged(this.props.faseSeleccionada, nextProps.faseSeleccionada);
        };
        render(): JSX.Element {
            let indicadores: any = global.getData(this.props.data);
            let EstadoSeleccionado: any = '';
            let iconoEstadoSeleccionado: any = '';
            let faseSeleccionada: any = Forms.getValues("Fase");
            let thatProps: IExpedientesDashBoardFases = this.props;

            let iconos: any[] = [];
            iconos['TODOS'] = "fas fa-bars";
            iconos['A'] = "glyphicon glyphicon-play";
            iconos['W'] = "fas fa-exclamation-triangle";
            iconos['V'] = "fa fa-times-circle";
            iconos['S'] = "glyphicon glyphicon-pause";

            let iconosColor: any[] = [];
            iconosColor['TODOS'] = "";
            iconosColor['A'] = "#8bc780";
            iconosColor['W'] = "#ff8f00";
            iconosColor['V'] = "#df0707";
            iconosColor['S'] = "";


           
            let IndicaActualizando: any = <AwesomeSpinner paddingTop={15} size={28} icon={"fa fa-refresh"} colorClass={"font-blue"} />;;

            let itemsModificados: DataElement = new DataElement(this.props.data);
            itemsModificados.data =  indicadores;
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
        verExpedientes?: any;
    };
    let Agentes: any = global.connect(class extends React.Component<IAgenteProps, IAgenteProps> {
        constructor(props: IAgenteProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.agente = Forms.getValue("Agente", config.idFilters, state);
            return retValue;
        };
        componentDidMount(): void {
            this.props.config.dispatchCatalogoBase("/usuarios/descendientes", null, AGENTES_ID);
        };
        componentWillReceiveProps(nextProps: IAgenteProps) {
            if (global.hasChanged(this.props.agente, nextProps.agente)) {
                let idAgente: number = null;
                if (nextProps.agente) {
                    idAgente = nextProps.agente.ID;
                };
                this.props.config.dispatchCatalogoBasePost("/usuarios/descendientes/id", { id: idAgente }, AGENTES_ID);
            };
        };
        shouldComponentUpdate(nextProps: IAgenteProps): any {
            return global.hasChanged(this.props.agente, nextProps.agente);
        };
        onClick(item: any): any {
            let w: any = window;
            //w.scroll({ top: 0, left: 0, behavior: "smooth" });
            $('html,body').animate({ scrollTop: 0 }, 1000);
            //
            Forms.updateFormElements(config.idFilters, { Agente: item, VerExpedientes: "A" });
            //
            //
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            setTimeout(() => { page.applyFilter(props) }, 100);
        };
        render(): JSX.Element {
            return <page.SectionList
                        id={AGENTES_ID}
                        icon="fa fa-table"
                        parent={config.id}
                        level={1}
                        size={[12, 12, 6, 6]}
                        listHeader={<div key="listHeaderKey" className="sectionAgentes" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 12, 6, 6]} className="list-default-header">{"Agente"}</Column>
                                <Column size={[12, 12, 6, 6]} className="list-default-header hidden-xs hidden-sm">{"Posición"}</Column>
                            </Row>
                        </div>}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[10, 10, 10, 11]} className="listItem-default-item">
                                    {formatNombre(item.Nombre, item.Apellidos, item.ID, "#/kontrol/usuarios/", item.Email)}
                                    <span>{item.Posicion.Nombre}</span>
                                </Column>
                                <Column size={[2, 2, 2, 1]} className="listItem-default-item">
                                    <Button className={"font-green"} style={{ fontSize: 14 }} icon="fas fa-external-link-alt" iconOnly={true} onClick={() => { this.onClick(item); }}></Button>
                                </Column>
                            </Row>;
                        }}>
                    </page.SectionList>;
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
                global.warning("Seleccione un agente de la lista de Agentes");
                //
                if ($(".sectionAgentes").size() > 0) {
                    let topA: number = e.currentTarget.getBoundingClientRect().top;
                    let topB: number = $(".sectionAgentes").parents(".panel")[0].getBoundingClientRect().top;
                    //
                    window.scrollTo(0, topB - topA -25);
                };
                //
                return;
            };
            Forms.updateFormElements(config.idFilters, { Agente: null, VerExpedientes: tipo });
            //
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props);
        };
        render(): JSX.Element {
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
                <Column size={[6, 6, 6, 6]} style={{padding: 0}}>
                    <div className={classElementAgente}>
                        <div className="option" onClick={(x) => { this.onClick("A", x); }}><i className={classAgente}></i></div>
                        {elementAgente}
                    </div>
                </Column>
            </Row>;
        }
    });

   
    interface IEsquemasDashBoard extends IDropDrownListProps {
        faseClave?: string;
        DesarrolloSeleccionado?: any
        FaseSeleccionada?: any;
        idDesarrollo?: number;
        cargaDatos?: (idDesarrollo?: any, Fase? :any) => void;
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



    interface IObras extends IDropDrownListProps {
        desarrollo?: any;
    }
    let ObrasDDL: any = global.connect(class extends React.Component<IObras, {}> {
        static props: any = (state: any) => ({
            items: state.global.OBRASDesarrollos,
            desarrollo: Forms.getValue("Desarrollo","expedientesDocumentos$filters")
        });
        static defaultProps: IObras = {
            id: "Obra",
            items: createDefaultStoreObject([]),
            label: "Obras",
            helpLabel: "Seleccione una Obra",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            Forms.updateFormElement(config.id, "Obras", { ID: -1, Clave: 'Seleccione una opción' });
            global.dispatchSuccessful("load::OBRASDesarrollos", []);

            if (this.props.desarrollo != null && this.props.desarrollo > 0) {
                dispatchAsync("load::OBRASDesarrollos", "base/scco/obra/Get/GetAll/" + global.encodeObject({ idDesarrollo: this.props.desarrollo.ID }));
            }
        };
        componentWillReceiveProps(nextProps: IObras, nextState: IObras): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo))
            {

                if (nextProps.desarrollo && nextProps.desarrollo.ID > 0) {
                    dispatchAsync("load::OBRASDesarrollos", "base/scco/obra/all/" + global.encodeObject({ idDesarrollo: nextProps.desarrollo.ID }));
                }
                else
                {
                    dispatchSuccessful("load::OBRASDesarrollos", [])
                    Forms.updateFormElement(config.id, "Obras", { ID: -1, Clave: 'Seleccione una opción' });

                }
            };

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });





    interface ICategoria extends IDropDrownListProps {
    }
    let CategoriasDDL: any = global.connect(class extends React.Component<ICategoria, {}> {
        static props: any = (state: any) => ({
            items: state.global.CATEGORIASDOCUMENTOS,
        });
        static defaultProps: ICategoria = {
            id: "Categoria",
            items: createDefaultStoreObject([]),
            label: "Categorías",
            helpLabel: "Seleccione una Categoría",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            Forms.updateFormElement(config.id, "Obras", { ID: -1, Clave: 'Seleccione una opción' });
            global.dispatchSuccessful("load::CATEGORIASDOCUMENTOS", []);

            dispatchAsync("load::CATEGORIASDOCUMENTOS", "base/kontrol/KontrolFiles/Get/GetCategories/");

        };
        render(): any {;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

}
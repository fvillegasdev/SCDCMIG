namespace EK.Modules.SGP.Pages.Dashboard {
    "use strict";

    const PAGE_ID: string = "Proyectos";
    const PROYECTOSLIST_ID: string = PAGE_ID + "$ProyectosList";
    const PROYECTO_SELECCIONADO: string = "ProjectSelected";
    const BLOGPOST_SELECT_ENTITY = "BlogPost$SelectEntity";

    const CATALOGO_GRUPOS_ID: string = "SGPGruposUsuarios$GruposUsuarios";
    const RECURSOSPROGRAMADOS_STATE = "RECURSOSPROGRAMADOSSGPDASHBOARD";
    const TASK_RESOURCES_ID = PAGE_ID + "$SGPTaskResources";
    const TASK_GRID_ID = PAGE_ID + "$SGPTaskGrid";
 
    const SIDEBAR_NAME: string = PAGE_ID + "SideBarNew";
    const SIDEBAR_COLABORADORES: string = PAGE_ID + "SideBarColaboradores";
    const SECTION_COLABORADORES_ID:string = "ColaboradoresProyecto";


    export var tiposEntidad: any = {
        "sgp$proyectos": { Name: "Proyecto", BGColor: "#9f9cbd26" },
        "sgp$grupos": { Name: "Grupo Nivel", BGColor: "#cec4c412" },
        "sgp$tareas": { Name: "Tarea", BGColor: "" }
    };

    export var estatusDashBoard: any = {
        "SinAsignar": { Name: "Sin Asignar", BGColor: "#c4c5c7" },
        "ATiempo": { Name: "A Tiempo", BGColor: "#92c794" },
        "SinInicializar": { Name: "Sin Inicializar", BGColor: "#e5ef58" },
        "Vencidas": { Name: "Vencidas", BGColor: "#ed6b75" },
        "Atrasadas": { Name: "Atrasadas", BGColor: "#ff6b2c" },
        "Pausadas": { Name: "Pausadas", BGColor: "#337ab6" },
        "Completadas": { Name: "Completadas", BGColor: "#777777" },
        "SINESTATUS": { Name: "SIN ESTATUS", BGColor: "#FA58F4" }
    };

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "sgp", [CATALOGO_GRUPOS_ID, PROYECTOSLIST_ID, TASK_GRID_ID, SECTION_COLABORADORES_ID]);
    const w: any = window;

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        if (f && f != null) {
        }
        if (type === undefined) {
            if (f && f != null) {
                f.IdRecurso = f.IdRecurso ? 0 : undefined;
            }
            dispatchAsyncPost("load::" + RECURSOSPROGRAMADOS_STATE, "base/scv/PlanificacionSPV/GetBP/GetRecursosProgramados/", { parametros: f });
        }
        let encodedFilters: string = global.encodeObject(f);
        let url: string = ["base/sgp/Proyectos/all/", encodedFilters].join("");
        global.dispatchAsync("global-current-catalogo", url);
    };

    export const equalDates: (d1: Date, d2: Date, validacion: any) => boolean = (d1: Date, d2: Date, validacion: any) => {
        let cDate: Date = d1 ? new Date(d1.getTime()) : null;
        let nDate: Date = d2 ? new Date(d2.getTime()) : null;

        if (cDate === null || nDate === null) return true;
        switch (validacion) {
            case "!=":
                return cDate.getTime() !== nDate.getTime();
            case "<":
                return cDate.getTime() < nDate.getTime();
            case ">":
                return cDate.getTime() > nDate.getTime();
            case "=":
                return cDate.getTime() == nDate.getTime();
            case "<=":
                return cDate.getTime() <= nDate.getTime();
            case ">=":
                return cDate.getTime() >= nDate.getTime();
            default:
                return false;
        }
    };

    export const onDisplayDateShortWithOutFormat: (dateValue: any) => any = (dateValue: any) => {
        let months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        let d = new Date(dateValue);
        return d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();

    }
    export const onDisplayDateShort: (dateValue: any, estatus: any) => any = (dateValue: any, estatus:any ) => {
        let bgColor: any = ""; 
        if (estatus === "FINALIZADA" || estatus === "FINALIZADO") {
            bgColor = "";
        } else {
            let newDate: any = new Date();
            if (equalDates(newDate, dateValue, ">") === true) {
                bgColor = "red"
            }
        }
        return <span style={{ color: bgColor }}> {onDisplayDateShortWithOutFormat(dateValue)}</span>;
    }


    // import onDisplayDateShort 
    interface IView extends page.IProps {

    };

    interface IIViewState {
    };


    export const Vista: any = global.connect(class extends React.Component<IView, IIViewState>{

        constructor(props: IView) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        });

        componentWillMount(): void {
            global.dispatchSuccessful("load::" + RECURSOSPROGRAMADOS_STATE, []);
            global.dispatchSuccessful("load::" + TASK_RESOURCES_ID, []);
        };


        componentDidMount(): void {
            global.dispatchAsync("global-page-data", "base/scv/gruposusuario/Get/GetAll/", "SGPGruposUsuarios$GruposUsuarios");
        };


        componentWillReceiveProps(nextProps: IView, { }): any {
        };

        onClick(btn: any, input: any, props: select.ISelectProps): void {
        };
         onClose(): void {
            global.closeSidebar(SIDEBAR_NAME);
         //   Forms.remove(SECTION_FORM_NEWTASK);
        };

        render(): JSX.Element {
            let ml: any = config.getML();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={onPageFilter}>
                <page.Filters collapsed={true}>
                    <RecursosProgramados />
                </page.Filters>
                <div>
                    <Column size={[12, 12, 3, 3]} >
                        <Row>
                            <div className="portlet light  portlet-fit  bordered  ek-sombra " >
                                <div className="portlet-body" >
                                    <DashBoardProyectos />
                                </div>
                            </div>
                        </Row>
                    </Column>
                    <div>
                        <ProjectSummary />
                    </div>
                </div>
                <QuickSidePanelRight id="blogpostQSB" >
                    < EK.Modules.Kontrol.Pages.BlogPost.blogPost {...this.props} />
                </QuickSidePanelRight>
                <QuickSidePanelRight id="blogpostQSBTareas" >
                    < EK.Modules.Kontrol.Pages.BlogPost.blogPost {...this.props} />
                </QuickSidePanelRight>
                <QuickSidePanelRight id="QSPRArchivos">
                    <QuickSidePanelTareas />
                </QuickSidePanelRight>
                <Sidebar level={2} id={SIDEBAR_NAME} onClose={this.onClose}>
                    <div className="c-sidebar-fav-title">
                        <i className="fal fa-address-card"></i>
                        <span>Contacto</span>
                        </div>
                    <userCard.BasicUserCard/>
                </Sidebar>
                <Sidebar id={SIDEBAR_COLABORADORES} >
                    <ListColaboradoresView />
                </Sidebar>
            </page.Main>
        }
    });

    let QuickSidePanelTareas: any = global.connect(class extends React.Component<IQuickSidePanelRight, IQuickSidePanelRight> {
        constructor(props: IQuickSidePanelRight) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global["catalogo$" + "BlogPost$SelectEntity"];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IQuickSidePanelRight, { }): boolean {
            return global.hasChanged(this.props.entity, nextProps.entity);
        };

        render(): JSX.Element {
            let entity: any = getData(this.props.entity);
            if (!entity.ID) {
                return null;
            }

            let idEntity: number = entity.ID ? entity.ID : 0;
            let claveEntityType: number = entity.TipoEntidad.Clave ? entity.TipoEntidad.Clave : 0;

            return <Column>
                         <KontrolFileManager title="Archivos" modulo={this.props.config.modulo} viewMode={false} multiple={true} entity={global.createSuccessfulStoreObject({ ID: idEntity })} entityType={global.createSuccessfulStoreObject([claveEntityType].join(""))} />
                </Column>
        };
    });
    interface IProyectSumaryDashBoard extends page.IProps {
        onclick?: () => void;
    };

    let ProjectSummary: any = global.connect(class extends React.Component<IProyectSumaryDashBoard, IProyectSumaryDashBoard> {
        constructor(props: IProyectSumaryDashBoard) {
            super(props);
            this.onClick = this.onClick.bind(this);

        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onClick(item: any, claveEntidad: string, NombreEntidad: string, IDComponente: string): void {

            let itemSelected: any = global.assign({}, {
                IDComponente: IDComponente,
                ID: item.ID,
                Clave: item.Clave,
                Nombre: item.Nombre,
                TipoEntidad: {
                    Clave: claveEntidad,
                    Nombre: NombreEntidad,
                }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            this.props.config.setState({ viewMode: false });
        };

        componentWillReceiveProps(nextProps: IProyectSumaryDashBoard): any {
        };

        render(): JSX.Element {
            let dataEntity: any = global.getData(EK.Store.getState().global.currentEntity);

            return <div>
                <Column size={[12, 12, 9, 9]} style={{ paddingLeft: "20px", marginTop:"18px" }} >
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                    <Row>
                                        <div className="portlet light  portlet-fit  bordered  ek-sombra " style={{ marginTop: "-18px" }}>
                                            <div className="portlet-title tabbable-line" style={{ border: "0px", borderBottom: "1px solid #eef1f5" }}>
                                                <div className="caption">
                                                    {dataEntity.Foto ?
                                                        <img alt="" src={dataEntity.Foto} style={{ float:"left" , verticalAlign: "middle", maxWidth: "40px", maxHeight: "40px", width: "40px", height: "40px", textAlign: "center", justifyContent: "center", alignItems: "center" }} />
                                                        :
                                                            null
                                                    }
                                                    <span className="caption-subject bold uppercase font-dark">
                                                        <span style={{ fontFamily: "poppins", fontSize: "15px", fontWeight: 100, marginLeft : "5px" }}>
                                                            {dataEntity.Nombre != undefined ? dataEntity.Nombre : ""}
                                                        </span>

                                                        <div>
                                                            <span className="" style={{ paddingRight: "5px" }}>
                                                                <button id="ActionButton_1_commments" style={{ marginLeft: "7px" }} className="wbs-button btn-sm white" href="javascript:void(0)" title="Comentarios" onClick={this.onClick.bind(this, dataEntity, "sgp$proyectos", "Proyectos", "blogpostQSB")}>
                                                                    {dataEntity.TotalComentarios === 0 || dataEntity.TotalComentarios === undefined ?
                                                                        <span>
                                                                            <i className="fal fa-comment"> </i>
                                                                            <span style={{ position: "absolute", color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}></span>
                                                                        </span>
                                                                        :
                                                                        <span>
                                                                            <i className=" fal fa-comment-dots"> </i>
                                                                            <span style={{ position: "absolute", color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{dataEntity.TotalComentarios}</span>
                                                                        </span>
                                                                    }

                                                                </button>
                                                                <button id="ActionButton_1_files" style={{ marginLeft: "7px" }} className="wbs-button btn-sm white" href="javascript:void(0)" title="2 Archivos" onClick={this.onClick.bind(this, dataEntity, "sgp$proyectos", "Proyectos", "QSPRArchivos")}>
                                                                    <i className="fal fa-file-alt"></i>
                                                                    <span style={{ position: "absolute", color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{dataEntity.TotalComentarios}</span>
                                                                </button>


                                                                <button id="ActionButton_1_view_resources" style={{ marginLeft: "7px" }} className="wbs-button btn-sm white" href="javascript:void(0)" title="Ver Colaboradores" onClick={(e): any => { global.showSidebar(SIDEBAR_COLABORADORES) }}>
                                                                    {dataEntity.TotalColaboradores === 0 || dataEntity.TotalColaboradores === undefined ?
                                                                        <span>
                                                                            <i className="fal fa-users"></i>
                                                                            <span style={{ position: "absolute", color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}></span>
                                                                        </span>
                                                                        :
                                                                        <span>
                                                                            <i className="fal fa-users"></i>
                                                                            <span style={{ position: "absolute", color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px" }}>{dataEntity.TotalColaboradores}</span>
                                                                        </span>
                                                                    }
                                                                </button>
                                                                <button id="ActionButton_1_view_gantt" style={{ marginLeft: "7px" }}  className="wbs-button btn-sm white" title="Ver Gantt">
                                                                    <i className="fal fa-project-diagram"></i>
                                                                </button>


                                                            </span>
                                                        </div>

                                                    </span>
                                                    <span className="caption-helper">&nbsp;
                                                        {dataEntity.EstatusProyecto != undefined ? <span style={{ margin: "2px", fontSize: "10px", fontFamily: "poppins", color: "#cac6c6" }}>( Inicia {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(dataEntity.FechaInicio, "")} -> Termina {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(dataEntity.FechaFin, dataEntity.EstatusProyecto.Clave)} )</span>
                                                            : null}
                                                        &nbsp;
                                                        {dataEntity.Tipo != undefined ?
                                                            <span className="badgeSquare" style={{ background: "rgb(88, 172, 250)" }}>{ dataEntity.Tipo.Nombre != undefined ? dataEntity.Tipo.Nombre : "" }</span>
                                                            : null}
                                                    </span>
                                                </div>
                                                <div className="actions">
                                                    <a className="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""> </a>
                                                </div>
                                            </div>
                                            <div className="portlet-body" >
                                                <div>
                                                    <div className="kt-widget__bottom">
                                                        
                                                        <Row>
                                                            <Column size={[12, 12, 12, 12]}>
                                                                <TaskResources />
                                                            </Column>
                                                            <Column size={[12,12,12,12]}>
                                                                <VistaTareasGrid />
                                                            </Column>
                                                            <Column size={[12, 12, 12, 12]}>
                                                                <GraficaReporte />
                                                            </Column>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Column>
            </div>
        };
    });

    interface IListColaboradoresView extends page.IProps {
        id?: string;
        Colaboradores?: any;
        CurrentEntity?: any;
    };
    let ListColaboradoresView: any = global.connect(class extends React.Component<IListColaboradoresView, IListColaboradoresView> {
        constructor(props: IListColaboradoresView) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.CurrentEntity = state.global.currentEntity;
            retValue.Colaboradores = state.global["catalogo$" + SECTION_COLABORADORES_ID];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IListColaboradoresView, nextState: {}): boolean {
            return hasChanged(this.props.Colaboradores, nextProps.Colaboradores);
        };
        componentWillReceiveProps(nextProps: IListColaboradoresView, nextState: {}): void {
            if (hasChanged(this.props.CurrentEntity, nextProps.CurrentEntity)) {
                if (global.isSuccessful(nextProps.CurrentEntity)) {
                    let Proyecto: any = getData(nextProps.CurrentEntity);
                    let IdProyecto: number = Proyecto.ID;
                    if (IdProyecto>0) {
                        let parametros: any = global.assign({ IdProyecto: IdProyecto });
                        global.dispatchAsync("global-page-data", "base/scv/Proyectos/Get/GetColaboradores/" + global.encodeParameters(parametros), SECTION_COLABORADORES_ID);
                    }
                    else {
                        global.dispatchSuccessful("global-page-data", [], SECTION_COLABORADORES_ID);
                    }
                }
            }
        };
        componentWillMount(): void {
            if (global.isSuccessful(this.props.CurrentEntity)) {
                let Proyecto: any = getData(this.props.CurrentEntity);
                let IdProyecto: number = Proyecto.ID;
                if (IdProyecto > 0) {
                    let parametros: any = global.assign({ IdProyecto: IdProyecto });
                    global.dispatchAsync("global-page-data", "base/scv/Proyectos/Get/GetColaboradores/" + global.encodeParameters(parametros), SECTION_COLABORADORES_ID);
                }
                else {
                    global.dispatchSuccessful("global-page-data", [], SECTION_COLABORADORES_ID);
                }
            }
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("global-page-data", [], SECTION_COLABORADORES_ID);
        };

        render(): JSX.Element {
            return <page.SectionList
                id={SECTION_COLABORADORES_ID}
                parent={PAGE_ID}
                icon={"fal fa-users"}
                title={"Colaboradores"}
                size={[12, 12, 12, 12]}
                level={1}
                horizontalScrolling={false}
                height={"320px"}
                drawOddLine={true}
                selectable={true}
                readonly={false}
                addRemoveButton={false}
                hideNewButton={true}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Nombre"}</Column>
                                </Row>
                            </div>}
                formatter={(index: number, item: any) => {
                    let iniciales: any;
                    iniciales = item.Usuario.Nombre.substr(0, 1) + item.Usuario.Apellidos.substr(0, 1);
                    return <Row>
                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                            <div className="kt-widget kt-widget--user-profile-1">
                                <div className="kt-widget__head" style={{ marginTop: "8px", marginBottom:"-16px" }}>
                                    <div className="kt-widget__media" onClick={(e): any => { global.showSidebar(SIDEBAR_NAME) }}>
                                    {item.Usuario.Foto === "" ?
                                        <div className="img-circle-fixed" style={{ verticalAlign: "middle", maxWidth: "60px", maxHeight: "60px", width: "60px", height: "60px", background: "#1e7145", color: "white", zIndex: (300), textAlign: "center", justifyContent: "center", alignItems: "center" }}   >
                                            <p title={item.Usuario.Nombre} style={{ paddingTop: "6px", margin: "0px", fontSize:"30px" }}>{iniciales}</p>
                                        </div>
                                    :
                                        <img alt="" title="" className={"img-circle-fixed"} src={item.Usuario.Foto} style={{ background: "beige", width: "60px", height: "60px", marginTop: "0px" }} />
                                    }
                                </div>
                                <div className="kt-widget__content">
                                    <div className="kt-widget__section">
                                        <a href="javascript:void(0)" className="kt-widget__username" onClick={(e): any => { global.showSidebar(SIDEBAR_NAME) }}>
                                            {item.Usuario.Nombre + " " + item.Usuario.Apellidos}
                                            <i className="flaticon2-correct kt-font-success"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    });

    export const  TaskResources: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global[TASK_RESOURCES_ID];
            return retValue;
        };

        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        onClickElementHorizontal(item: any): void {
            let prevID: number = item && item.ID ? item.ID : null;
            if (prevID > 0) {
            } else {
                prevID = null
            }

            let Proyecto: any = getData(EK.Store.getState().global["catalogo$" + PROYECTO_SELECCIONADO]);
            if (Proyecto && Proyecto.ID) {
                let parametros: any = { IdProyecto: Proyecto.ID, TieneHijos: 0 };
                global.dispatchAsync("global-page-data", "base/sgp/WBS/Get/GetTreeTask/" + global.encodeParameters(parametros), TASK_GRID_ID);
            }
           

   



            let a: any = null;

            a = [{ "ID": 1, "Cantidad": 600, "Nombre": "Sin Asignar","Porcentaje": 14.78 },
                { "ID": 2, "Cantidad": 408, "Nombre": "A Tiempo", "Porcentaje": 10.05 },
                { "ID": 3, "Cantidad": 300, "Nombre": "Sin Inicializar", "Porcentaje": 7.39},
                { "ID": 4, "Cantidad": 295, "Nombre": "Vencidas", "Porcentaje": 7.27 },
                { "ID": 5, "Cantidad": 295, "Nombre": "Atrasadas", "Porcentaje": 7.27 },
                { "ID": 6, "Cantidad": 295, "Nombre": "Pausadas", "Porcentaje": 7.27 },
                { "ID": 7, "Cantidad": 292, "Nombre": "Completadas", "Porcentaje": 7.19 }];


            global.dispatchFullSuccessful("global-page-data", a, "datosgrafica");
        };

        render(): JSX.Element {
            let $page: any = $ml[""];
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={50} size={40} icon={"fad fa-circle-notch fa-spin fa-3x fa-fw font-blue-sharp"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.data;


            if (isSuccessful(this.props.data)) {
                let nuevoItem: any = {};
                //let nuevoItemFase: any = {};
                let nuevoElemento: any = "SI";
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave === "TODOS") {
                        nuevoElemento = "NO"
                    }
                }
                if (nuevoElemento === "SI") {
                    //nuevoItemFase["ID"] = null;
                    //nuevoItemFase["Clave"] = " ";
                    //nuevoItemFase["Nombre"] = " ";
                  //  let totalFases: number = 0;
                    let totalCantidadSinAsignar: number = 0;
                    let totalCantidadATiempo: number = 0;
                    let totalCantidadSinInicializar: number = 0;
                    let totalCantidadVencidas: number = 0;
                    let totalCantidadAtrasadas: number = 0;
                    let totalCantidadPausadas: number = 0;
                    let totalCantidadCompletadas: number = 0;

                    getData(this.props.data).forEach((value: any, index: number): any => {
                        totalCantidadSinAsignar += value.CantidadSinAsignar;
                        totalCantidadATiempo += value.CantidadATiempo;
                        totalCantidadSinInicializar += value.CantidadSinInicializar;
                        totalCantidadVencidas += value.CantidadVencidas;
                        totalCantidadAtrasadas += value.CantidadAtrasadas;
                        totalCantidadPausadas += value.CantidadPausadas;
                        totalCantidadCompletadas += value.CantidadCompletadas;
                    });
                    nuevoItem["ID"] = null;
                    nuevoItem["Clave"] = "TODOS";
                    nuevoItem["Nombre"] = "TODOS";
                    //nuevoItem["Fase"] = nuevoItemFase;

                    nuevoItem["CantidadSinAsignar"] = totalCantidadSinAsignar;
                    nuevoItem["CantidadATiempo"] = totalCantidadATiempo;
                    nuevoItem["CantidadSinInicializar"] = totalCantidadSinInicializar;
                    nuevoItem["CantidadVencidas"] = totalCantidadVencidas;
                    nuevoItem["CantidadAtrasadas"] = totalCantidadAtrasadas;
                    nuevoItem["CantidadPausadas"] = totalCantidadPausadas;
                    nuevoItem["CantidadCompletadas"] = totalCantidadCompletadas;

                    itemsModificados.data.unshift(nuevoItem);
                }
                IndicaActualizando = "";
            }









            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);
            return <Row>
                <Column size={[12, 12, 12, 12]}  >
                    <div className="portlet light   portlet-fit  bordered " >
                        <div className="portlet-body">
                            <Row className="timeline-expediente">
                                <Column size={[12, 12, 12, 12]} className="events-container">
                                    {IndicaActualizando ? IndicaActualizando :
                                        <EKHorizontalTimeLine
                                            items={items}
                                            customScroll={true}
                                            desactivarFondo={true}
                                            page={$page}
                                            onClickElementHorizontal={this.onClickElementHorizontal}
                                            tipoPresentacion={13} />
                                    }
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
            </Row>;
        }
    });

    let RecursosProgramados: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global[RECURSOSPROGRAMADOS_STATE];
            return retValue;
        };

        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        componentDidMount(): void {
            //if (!isLoadingOrSuccessful(this.props.data)) {
            //    dispatchAsync("load::" + RECURSOSPROGRAMADOS_STATE, "base/scv/PlanificacionSPV/Get/GetRecursosProgramados/");
            //};
        };
        render(): JSX.Element {
            let $page: any = $ml[""];
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={50} size={40} icon={"fad fa-circle-notch fa-spin fa-3x fa-fw font-blue-sharp"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.data;
            if (isSuccessful(this.props.data)) {
                let nuevoItem: any = {};
                //let nuevoItemFase: any = {};
                let nuevoElemento: any = "SI";
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave === "TODOS") {
                        nuevoElemento = "NO"
                    }
                }
                if (nuevoElemento === "SI") {
                    //nuevoItemFase["ID"] = null;
                    //nuevoItemFase["Clave"] = " ";
                    //nuevoItemFase["Nombre"] = " ";
                    //  let totalFases: number = 0;
                    let totalCantidadSinAsignar: number = 0;
                    let totalCantidadATiempo: number = 0;
                    let totalCantidadSinInicializar: number = 0;
                    let totalCantidadVencidas: number = 0;
                    let totalCantidadAtrasadas: number = 0;
                    let totalCantidadPausadas: number = 0;
                    let totalCantidadCompletadas: number = 0;

                    getData(this.props.data).forEach((value: any, index: number): any => {
                        totalCantidadSinAsignar += value.CantidadSinAsignar;
                        totalCantidadATiempo += value.CantidadATiempo;
                        totalCantidadSinInicializar += value.CantidadSinInicializar;
                        totalCantidadVencidas += value.CantidadVencidas;
                        totalCantidadAtrasadas += value.CantidadAtrasadas;
                        totalCantidadPausadas += value.CantidadPausadas;
                        totalCantidadCompletadas += value.CantidadCompletadas;
                    });
                    nuevoItem["ID"] = null;
                    nuevoItem["Clave"] = "TODOS";
                    nuevoItem["Nombre"] = "TODOS";
                    //nuevoItem["Fase"] = nuevoItemFase;

                    nuevoItem["CantidadSinAsignar"] = totalCantidadSinAsignar;
                    nuevoItem["CantidadATiempo"] = totalCantidadATiempo;
                    nuevoItem["CantidadSinInicializar"] = totalCantidadSinInicializar;
                    nuevoItem["CantidadVencidas"] = totalCantidadVencidas;
                    nuevoItem["CantidadAtrasadas"] = totalCantidadAtrasadas;
                    nuevoItem["CantidadPausadas"] = totalCantidadPausadas;
                    nuevoItem["CantidadCompletadas"] = totalCantidadCompletadas;

                    itemsModificados.data.unshift(nuevoItem);
                }
                IndicaActualizando = "";
            }
            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);
            return <Row>
                <Column size={[12, 12, 12, 12]}  >
                    <div className="portlet light   portlet-fit  bordered  " style={{ marginLeft: "10px", marginRight: "10px" }}>
                        <div className="portlet-body">
                            <Row className="timeline-expediente">
                                <Column size={[12, 12, 12, 12]} className="events-container">
                                    {IndicaActualizando ? IndicaActualizando :
                                        <EKHorizontalTimeLine
                                            items={items}
                                            customScroll={true}
                                            desactivarFondo={true}
                                            page={$page}
                                            tipoPresentacion={13} />
                                    }
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
            </Row>;
        }
    });



    let VistaTareasGrid: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);

        }

        onRowDoubleClick(item: any): any {
        };

        onViewPlanificacion(item: any): void {
        };

        onClickComments(item: any, claveEntidad: string, NombreEntidad: string): void {

            let itemSelected: any = global.assign({}, {
                IDComponente: "blogpostQSBTareas",
                ID: item.Tarea.ID,
                Clave: item.Tarea.Clave,
                Nombre: item.Tarea.Nombre,
                TipoEntidad: { Clave: item.TipoNodo.Clave, Nombre: tiposEntidad[item.TipoNodo.Clave].Name }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            this.props.config.setState({ viewMode: false });
        };
        
        onClickFiles(item: any, claveEntidad: string, NombreEntidad: string): void {

            let itemSelected: any = global.assign({}, {
                IDComponente: "QSPRArchivos",
                ID: item.Tarea.ID,
                Clave: item.Tarea.Clave,
                Nombre: item.Tarea.Nombre,
                TipoEntidad: { Clave: claveEntidad, Nombre: NombreEntidad}
            });
           //  global.dispatchSuccessful("global-page-data", itemSelected, "BlogPost$SelectEntity");

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            this.props.config.setState({ viewMode: false });
        };

        onClickConstactCardUser(item: any, claveEntidad: string, NombreEntidad: string): void {

            //let itemSelected: any = global.assign({}, {
            //    IDComponente: "sgpContactCardUsers",
            //    ID: item.Tarea.AsignadoA.ID,
            //    Clave: "",
            //    Nombre: "",
            //    TipoEntidad: { Clave: "", Nombre:"Contacto"}
            //});

            //global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY);

            //this.props.config.setState({ viewMode: false });
             global.showSidebar(SIDEBAR_NAME);
        };






        render(): JSX.Element {
            let ml: any = config.getML();
            let retValue: any;

            let formatConfigAcciones: (data: any, row: any) => any = (data: any, row: any): any => {
                return <div style={{ textAlign: "center", marginTop:"-5px" }}>
                    <button id={"ActionButton_" + data + "_commments"} className="wbs-button btn-sm white" href="javascript:void(0)" title="Comentarios" onClick={this.onClickComments.bind(this, row, "sgp$tareas", "Tareas")}>
                        {row.TotalComentarios === 0 || row.TotalComentarios === undefined ?
                            <span>
                                <i className="fal fa-comment"> </i>
                                <span style={{ color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px", position:"absolute" }}></span>
                            </span>
                            :
                            <span>
                                <i className=" fal fa-comment-dots"> </i>
                                <span style={{ color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px", position: "absolute"  }}>{row.TotalComentarios}</span>
                            </span>
                        }
                    </button>
                    <button id={"ActionButton_" + data + "_files"} className="wbs-button btn-sm white" href="javascript:void(0)" title="Archivos" onClick={this.onClickFiles.bind(this, row, "sgp$tareas", "Archivos")}>
                        {row.TotalArchivos === 0 || row.TotalArchivos === undefined ?
                            <span>
                                <i className="fal fa-file-alt"> </i>
                                <span style={{ color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px", position: "absolute" }}></span>
                            </span>
                            :
                            <span>
                                <i className="fal fa-file-alt"> </i>
                                <span style={{ color: "rgb(159, 162, 161)", fontFamily: "poppins", fontSize: "8px", marginTop: "-5px", position: "absolute" }}>{row.TotalArchivos}</span>
                            </span>
                        }

                    </button>
                </div>;
            };

             let formatStatusTask: (data: any, row: any) => any = (data: any, row: any): any => {
                return <div style={{ }}>
                    <i className="fa fa-circle" style={{ color: estatusDashBoard[row.EstatusDashBoard].BGColor, fontSize: "10px" }} title={estatusDashBoard[row.EstatusDashBoard].Name}></i>
                    <span>&nbsp;
                        {row.Tarea.ID}
                        </span>
                </div>;
            };

            let formatPriotity: (data: any, row: any) => any = (data: any, row: any): any => {
                return <div style={{ }}>
                    <div>
                        <i className={row.Tarea.Prioridad.Icono} style={{ color: row.Tarea.Prioridad.BGColor }} title={row.Tarea.Prioridad.Nombre}  > </i>
                    </div>
                    <div className="badgeSquare" style={{background :  row.Tarea.FlujoAvance.BGColor,  position:"absolute", marginTop:"-15px" , marginLeft:"15px", width:"100px"}}>{ row.Tarea.FlujoAvance.Nombre}</div>
                </div>;
            };

            let formatAvance: (dara: any, row: any) => any = (data: any, row: any): any => {
                let colorBG: any = ""; 
                return <div style={{ textAlign: "center" }}>
                    {
                            <div id="" className="form-group" style={{ marginLeft: "5%", minHeight: "20px", paddingTop: "2px", display: "block", textAlign: "left" }}>
                            <div style={{ width: "96%", height: "80%", position: "relative" }} >
                                <span style={{ position: "absolute", marginTop: "-4px", marginLeft: "-11px" }}>
                                    {row.Tarea.IdWorkFlow  === null || row.Tarea.IdWorkFlow  === undefined ?
                                            <i className="fa fa-random" aria-hidden="true" style={{color:"Transparent"}} title="Sin Proceso de Autorización"></i>
                                        :
                                            <i className="fa fa-random" aria-hidden="true" title="Proceso de Autorización"></i>
                                        }
                                    <i className="fa fa-circle" style={{ color: row.Tarea.Contemplaravance ? "#ffa50059" : "transparent", fontSize: "10px" }} title={row.Tarea.Contemplaravance ? "Tarea NO CONTEMPLADA para el avance" : "Tarea contemplada para el Avance"}></i>
                                </span>
                                <span style={{ width: "80%", verticalAlign: "revert", paddingBottom: "0px", height: "7px" , marginLeft:"10px"}}>
                                    <span className="ek10-sgp-progress-bar-small-content" style={{ height: "inherit", width:"85%" }}   ></span>
                                    <span className="ek10-sgp-progress-bar-small-advance" style={{ width: row.Importe, height: "inherit" }}></span>
                                </span>
                                <div style={{ marginLeft: "45%", paddingTop: "4px", marginTop :"-13px" }}>{row.Importe}</div>
                            </div>
                        </div>
                    }
                </div>;
            }

            let formatAsignadoA: (data: any, row: any) => any = (data: any, row: any): any => {
                let colorBG: any = "";
            
                if (row.Tarea.AsignadoA.ID != null && row.Tarea.AsignadoA.ID != undefined) {
                    let inicialesRes: string;
                    inicialesRes = row.Tarea.AsignadoA.Nombre.substr(0, 1) + row.Tarea.AsignadoA.Apellidos.substr(0, 1);

                    return <div style={{ textAlign: "center" }} onClick={this.onClickConstactCardUser.bind(this, row, "sgp$tareas", "Tareas")} >
                        {
                            row.Tarea.AsignadoA.Foto === "" || row.Tarea.AsignadoA.Foto === undefined ?
                                <div className={"img-circle-fixed "} style={{ background: "#1e7145", color: "white", width: "20px", height: "20px", marginTop: "0px", zIndex: (300 /*+ index*/), display: "inline-block" }}   >
                                    <p title={row.Tarea.AsignadoA.Nombre}>{inicialesRes}</p>
                                </div>
                                :
                                <img alt="" title={row.Tarea.AsignadoA.Nombre} className={"img-circle-fixed"} src={row.Tarea.AsignadoA.Foto} style={{ background: "beige", width: "20px", height: "20px", marginTop: "0px", zIndex: (300 /*+ index*/), display: "inline-block" }} />
                        }
                    </div>;
                } else {
                    return null;
                }
              
            }
            let formatDateIni: (data: any, row: any) => any = (data: any, row: any): any => {
                return <div style={{ textAlign: "left"}}>
                    {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(row.Tarea.FechaEstimadaInicio, row.Tarea.FlujoAvance.Clave)}
                </div>;
            };
            let formatDateFin: (data: any, row: any) => any = (data: any, row: any): any => {
                return <div style={{ textAlign: "left"}}>
                    {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(row.Tarea.FechaEstimadaFin, row.Tarea.FlujoAvance.Clave)}
                </div>;
            };

         
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "Tarea.ID", width: "80px", title:"ID", fixed: true, format: formatStatusTask })
                .add({ data: "Clave", width: "100px", fixed: true })
                .add({ data: "ID", title: "", width: "100px", format: formatConfigAcciones, fixed: true })
                .add({ data: "Nombre", width: "200px" })
                .add({ data: "Tarea.Prioridad", title: "Estatus", width: "140px", format: formatPriotity }) 
                .add({ data: "Tarea", width: "140px", title: "Avance", format: formatAvance })
                .add({ data: "Tarea.AsignadoA", width: "120px", title: "Responsable", format: formatAsignadoA })
          


                .add({ data: "Tarea", title: "Inicio", width: "120px", format: formatDateIni })
                .add({ data: "Tarea", title: "Fin", width: "120px", format: formatDateFin })



            return <Row>
                    <page.SectionListExtended
                        id={TASK_GRID_ID}
                        parent={config.id}
                        icon="fa fa-table"
                        level={1}
                        onSave={null}
                        dtConfig={dtConfig}
                        hideNewButton={true}
                        size={[12, 12, 12, 12]}
                        readonly={true}
                        onRowDoubleClick={this.onRowDoubleClick}
                        items={createSuccessfulStoreObject([])}>
                    </page.SectionListExtended>
            </Row>;
        };
    });

    interface IDashBoardProyectos extends page.IProps {
        item?: any;
        idForm: any;
        onclick?: () => void;
    };

    export let DashBoardProyectos: any = global.connect(class extends React.Component<IDashBoardProyectos, {}>{
        constructor(props: IDashBoardProyectos) {
            super(props);
            this.onClick = this.onClick.bind(this);
            this.onClickItem = this.onClickItem.bind(this);
        };
        static props: any = (state: any): any => ({
            data: state.global["currentCatalogo"]
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        });
        onClick(item: any): void {
            global.dispatchSuccessful("global-current-entity", item);
            global.dispatchSuccessful("global-page-data", item, PROYECTO_SELECCIONADO);
            let idProyecto :any = item.ID
            let p: any = global.assign({
                IdProyecto: idProyecto
            });
            let f: any = global.assign({
            });
            //dispatchAsyncPost("load::" + TASK_RESOURCES_ID, "base/scv/Proyectos/GetBP/GetResourceAssignedTask/", { parametros: p  });
            dispatchAsyncPost("load::" + TASK_RESOURCES_ID, "base/scv/PlanificacionSPV/GetBP/GetRecursosProgramados/", { parametros: f });

        };
        onClickItem(item: any): void {
            alert("onclickItem");
        };

        shouldComponentUpdate(nextProps: IDashBoardProyectos, nextState: IDashBoardProyectos): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        componentDidMount(): any {
            let Proyecto: any = getData(EK.Store.getState().global["catalogo$" + PROYECTO_SELECCIONADO]);
            if (Proyecto && Proyecto.ID) {
                global.dispatchSuccessful("global-current-entity", Proyecto);
                global.dispatchSuccessful("global-page-data", Proyecto, PROYECTO_SELECCIONADO);
            }
        }
        componentWillReceiveProps(nextProps: IDashBoardProyectos, { }): any {
            if (global.hasChanged(this.props.data, nextProps.data)) {
                if (isSuccessful(nextProps.data)) {
                    let entity: any = getData(nextProps.data);
                    let Proyecto: any = getData(EK.Store.getState().global["catalogo$" + PROYECTO_SELECCIONADO]);
                    if (Proyecto && Proyecto.ID) {

                    } else {
                        if (entity.length > 0) {
                            this.onClick(entity[0]); 
                            //global.dispatchSuccessful("global-current-entity", entity[0]);
                            //global.dispatchSuccessful("global-page-data", entity[0], PROYECTO_SELECCIONADO);
                        }
                    }
                }
            }

        };
        //componentWillUpdate(nextProps: IDashBoardProyectos, { }): void {
        //    if (hasChanged(this.props.data, nextProps.data)) {
        //    }
        //};
        render(): JSX.Element {
            let IndicaActualizando: any = isSuccessful(this.props.data) ? "" : <AwesomeSpinner paddingTop={50} size={40} icon={"fad fa-circle-notch fa-spin fa-3x fa-fw font-blue-sharp"} colorClass={"font-blue"} />;
            let resaltar: (parametro: string) => string = (parametro: string) => {
                let retorno = "";
                if (getData(this.props.data).Clave === parametro || getData(this.props.data).Clave === parametro) {
                    retorno = " indicar_seleccion";
                }
                return retorno;
            };



            return <div>
                <div className="EK-kt-notification" style={{ marginTop: "15px" }}>
                    {IndicaActualizando ? IndicaActualizando :
                        <List
                            id={PROYECTOSLIST_ID}
                            items={getData(this.props.data)}
                            listMode="literal"
                            horizontalScrolling={false}
                            onItemClick={null}
                            drawOddLine={false}
                            //selectable={true}
                            formatter={(index: number, item: any) => {
                                let inicialesRes: string;
                                inicialesRes = item.Responsable.Nombre.substr(0, 1) + item.Responsable.Apellidos.substr(0, 1);
                                let inicialesAsig: string;
                                inicialesAsig = item.AsignadoA.Nombre.substr(0, 1) + item.AsignadoA.Apellidos.substr(0, 1);
                                return <div id={"row_Proyecto_id" + index} className={"panel-collapsed"} style={{ marginBottom: "0px", marginTop: "0px" }} >
                                    <div className="EK-kt-notification">
                                        <div className="EK-kt-notification__item">
                                            <div className="EK-kt-notification__item-icon">
                                                <CollapseButton idElement={"row_Proyecto_id" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fal fa-angle-up" collapsedDownIcon="fal fa-angle-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                            </div>
                                            <div className="EK-kt-notification__item-details">
                                                <div className="EK-kt-notification__item-title">
                                                    <span>{item.Nombre} </span>
                                                </div>
                                                <div className="EK-kt-notification__item-time">
                                                    3 hrs ago
                                        </div>
                                                <div className="progress" style={{ height: "6px", marginRight: "0px", marginBottom: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" aria-valuenow={index * 7 + 20} aria-valuemin="0" aria-valuemax="100" style={{ width: (index * 7 + 20) + "%", fontSize: "8px", background: "rgb(88, 172, 250)" }}>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <span>
                                            <div className="btn btn-circle btn-xs" title="Ir al Proyecto" style={{ marginRight: "-14px", float: "right", marginTop: "-40px" }}>
                                                <i className="fas fa-arrow-circle-right EK-btn-go-mini" title="Ir al Proyecto" style={{ fontSize: "1.6rem" }} onClick={this.onClick.bind(this, item)}> </i>
                                            </div>

                                        </span>

                                        <Row id={"row_Proyecto_id" + index}>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm" style={{ backgroundColor: "#fefeff" }}>
                                                <div style={{ fontSize: "12px", lineHeight: "350%" }}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <span className="border border-primary badge" style={{ backgroundColor: "#fefeff", borderColor: "#58acfa", color: "#58acfa" }}>Responsable</span>
                                                        <span style={{ float: "right" }}>
                                                            <span>{item.Responsable.Nombre}</span>
                                                            {item.Responsable.Foto === "" ?
                                                                <div className={"img-circle "} style={{ background: "#1e7145", color: "white", width: "30px", height: "30px", float: "none", marginTop: "0px", marginLeft: "10px", position: "relative", zIndex: (300 + index), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}   >
                                                                    <p title={item.Responsable.Nombre}>{inicialesRes}</p>
                                                                </div>
                                                                :
                                                                <img alt="" title={item.Responsable.Nombre} className={"img-circle"} src={item.Responsable.Foto} style={{ background: "beige", width: "30px", height: "30px", float: "none", marginTop: "0px", marginLeft: "10px", position: "relative", zIndex: (300 + index), justifyContent: "center", alignItems: "center", textAlign: "center" }} />
                                                            }
                                                        </span>
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <span className="border border-primary badge" style={{ backgroundColor: "#fefeff", borderColor: "#58acfa", color: "#58acfa" }}>Asignado a</span>
                                                        <span style={{ float: "right" }}>
                                                            <span>{item.AsignadoA.Nombre}</span>
                                                            {item.AsignadoA.Foto === "" ?
                                                                <div className={"img-circle "} style={{ background: "#1e7145", color: "white", width: "30px", height: "30px", float: "none", marginTop: "0px", marginLeft: "10px", position: "relative", zIndex: (300 + index), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}   >
                                                                    <p title={item.AsignadoA.Nombre}>{inicialesAsig}</p>
                                                                </div>
                                                                :
                                                                <img alt="" title={item.AsignadoA.Nombre} className={"img-circle"} src={item.AsignadoA.Foto} style={{ background: "beige", width: "30px", height: "30px", float: "none", marginTop: "0px", marginLeft: "10px", position: "relative", zIndex: (300 + index), justifyContent: "center", alignItems: "center", textAlign: "center" }} />
                                                            }
                                                        </span>
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <span className="border border-primary badge" style={{ backgroundColor: "#fefeff", borderColor: "#58acfa", color: "#58acfa" }}>Tipo Proyecto</span>
                                                        <span style={{ float: "right" }}>
                                                            <span>
                                                                {item.Tipo.Nombre}
                                                            </span>
                                                        </span>
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <span className="border border-primary badge" style={{ backgroundColor: "#fefeff", borderColor: "#58acfa", color: "#58acfa" }}>Descripción</span>
                                                        <span style={{ float: "right" }}>
                                                            <span>
                                                                {item.Descripcion}
                                                            </span>
                                                        </span>
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <span style={{ margin: "2px", fontSize: "10px", fontFamily: "poppins", color: "#cac6c6" }}>( Inicia {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(item.FechaInicio, "")} -> Termina {EK.Modules.SGP.Pages.Dashboard.onDisplayDateShort(item.FechaFin, item.EstatusProyecto.Clave)} )</span>
                                                       
                                                    </Column>
                                                </div>
                                            </Column>
                                        </Row>





                                    </div>
                                </div>
                            }} />
                    }
                </div>
            </div>;
        }
    });


    //<UpdateColumn info={this.props.items} text="obteniendo información">
    //    <EKAmCharts dataProvider={this.prepareDataCharts(this.props.items)} tipoGrafica={this.props.tipoGrafica} />
    //</UpdateColumn>
    // GRAFICAS DEL TABLERO
    interface IResumenResultado extends page.IProps {

    };

    //export const GraficaReporte2: any = global.connect(class extends React.Component<IResumenResultado, IResumenResultado> {
    //    static props: any = (state: any) => {
    //        var retValue: any = page.props(state);
    //        retValue.data = state.global["catalogo$datosgrafica"];
    //        return retValue;
    //    };
    //    componentWillMount() {

    //        let a: any = null;

    //        a = [{ "ID": 1, "Cantidad": 600, "Nombre": "Activas", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 14.78, "PorcentajeTotal": 46.69 },
    //        { "ID": 2, "Cantidad": 408, "Nombre": "Por Vencer", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 10.05, "PorcentajeTotal": 46.69 },
    //        { "ID": 3, "Cantidad": 300, "Nombre": "Vencidas", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 7.39, "PorcentajeTotal": 46.69 },
    //        { "ID": 4, "Cantidad": 295, "Nombre": "Completadas", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 7.27, "PorcentajeTotal": 46.69 },
    //        { "ID": 5, "Cantidad": 292, "Nombre": "Sin Asignar", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 7.19, "PorcentajeTotal": 46.69 }];
    //        //a = [{ "ID": 1, "Cantidad": 600, "Nombre": "ELEMENTOS DE CONCRETO", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 14.78, "PorcentajeTotal": 46.69 },
    //        //    { "ID": 2, "Cantidad": 408, "Nombre": "MARCOS Y PUERTAS", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 10.05, "PorcentajeTotal": 46.69 },
    //        //    { "ID": 3, "Cantidad": 300, "Nombre": "INSTALACION HIDRAULICA", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 7.39, "PorcentajeTotal": 46.69 },
    //        //    { "ID": 4, "Cantidad": 295, "Nombre": "VENTANAS", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 7.27, "PorcentajeTotal": 46.69 },
    //        //    { "ID": 5, "Cantidad": 292, "Nombre": "INSTALACION ELECTRICA", "CantidadTopIncidencias": 1895, "CantidadTotalIncidencias": 4059, "Porcentaje": 7.19, "PorcentajeTotal": 46.69 }]; 


    //        global.dispatchFullSuccessful("global-page-data", a, "datosgrafica");

    //    };


    //    render(): JSX.Element {
    //        return <EKAmChartsCustom items={this.props.data} tipoGrafica={"pissse"} />;
    //    };
    //});

    export const GraficaReporte: any = global.connect(class extends React.Component<IResumenResultado, IResumenResultado> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global["catalogo$datosgrafica"];
            return retValue;
        };
        componentWillMount() {

            let a: any = null;

            a = [{ "ID": 1, "Cantidad": 600, "Nombre": "Sin Asignar", "Porcentaje": 14.78 },
            { "ID": 2, "Cantidad": 408, "Nombre": "A Tiempo", "Porcentaje": 10.05 },
            { "ID": 3, "Cantidad": 300, "Nombre": "Sin Inicializar", "Porcentaje": 7.39 },
            { "ID": 4, "Cantidad": 295, "Nombre": "Vencidas", "Porcentaje": 7.27 },
            { "ID": 5, "Cantidad": 295, "Nombre": "Atrasadas", "Porcentaje": 7.27 },
            { "ID": 6, "Cantidad": 295, "Nombre": "Pausadas", "Porcentaje": 7.27 },
            { "ID": 7, "Cantidad": 292, "Nombre": "Completadas", "Porcentaje": 7.19 }];

            global.dispatchFullSuccessful("global-page-data", a, "datosgrafica");

        };


        render(): JSX.Element {
            return <EKAmChartsCustom items={this.props.data} tipoGrafica={"pie"} />
        };
    });

}
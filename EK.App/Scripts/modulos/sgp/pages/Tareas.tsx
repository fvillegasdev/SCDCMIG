namespace EK.Modules.SGP.Pages.Tareas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("sgp_tareas", "sgp");
    const PROYECTO_SELECCIONADO: string = "ProjectSelected";
    const SLOT_WBS: string = "WBSNODE";
    const CALENDAR_ID = "WBSTareasSGPCalendar";
    const GANTT_ID = "WBSTareasSGPGantt";


    export class Vista extends page.Base {
        onEntityLoaded(props: page.IProps): any {
            let Proyecto: any = getData(EK.Store.getState().global["catalogo$" + PROYECTO_SELECCIONADO]);
            if (Proyecto && Proyecto.ID) {
                let parametros: any = { IdProyecto: Proyecto.ID };
                global.dispatchAsync("global-page-data", "base/sgp/WBS/Get/GetTreeConfiguration/" + global.encodeParameters(parametros), SLOT_WBS);
            }
        };

        render(): JSX.Element {
            let ml: any = config.getML();

            return <page.Main {...config} pageMode={PageMode.Principal} onEntityLoaded={this.onEntityLoaded} allowNew={"false"} allowDelete={"false"}>
                <page.Filters collapsed={true}>
                    <EK.Modules.SGP.Pages.Dashboard.TaskResources />
                </page.Filters>
                <TabProyectoDashBoardTareas />
            </page.Main>;
        };
    }

    interface ITabProyectoDashBoardTareas extends page.IProps {
        treeState?: any;
    };

    let TabProyectoDashBoardTareas: any = global.connect(class extends React.Component<ITabProyectoDashBoardTareas, ITabProyectoDashBoardTareas> {
        constructor(props: ITabProyectoDashBoardTareas) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.treeState = state.global["catalogo$" + SLOT_WBS]
            return retValue;
        };

        shouldComponentUpdate(nextProps: ITabProyectoDashBoardTareas, nextState: ITabProyectoDashBoardTareas): boolean {
            return hasChanged(this.props.treeState, nextProps.treeState);
        };

        componentWillMount(): void {
            let Proyecto: any = getData(EK.Store.getState().global["catalogo$" + PROYECTO_SELECCIONADO]);
            if (Proyecto && Proyecto.ID) {
                let parametros: any = { IdProyecto: Proyecto.ID };
                global.dispatchAsync("global-page-data", "base/sgp/WBS/Get/GetTreeConfiguration/" + global.encodeParameters(parametros), SLOT_WBS);
                dispatchAsync("load::" + CALENDAR_ID, "base/sgp/WBS/Get/GetCalendarWBS/" + global.encodeParameters(parametros));
                dispatchAsync("load::" + GANTT_ID, "base/sgp/WBS/Get/GetGanttWBS/" + global.encodeParameters(parametros));
            } else {
                global.go("/sgp/proyectos");
            }
        };

        componentWillReceiveProps(nextProps: ITabProyectoDashBoardTareas, { }): any {
            if (global.hasChanged(this.props.treeState, nextProps.treeState)) {
                if (isSuccessful(nextProps.treeState)) {
                    let entity: any = getData(nextProps.treeState);
                    if (entity.length > 0) {
                        let newArray: any[] = [];
                        entity.map((value: any, index: number) => {
                            value = global.assign(new Proyectos.Raiz(value), value);
                            newArray.push(value.serialize());
                        })
                        Forms.updateFormElement(config.id, "Tareas", newArray[0]);
                    } else {
                        //Si no hubo datos: que cree un nodo raiz
                        let Proyecto: any = getData(EK.Store.getState().global["catalogo$" + PROYECTO_SELECCIONADO]);
                        if (Proyecto && Proyecto.ID) {
                            let raiz: Proyectos.IRaiz = new Proyectos.Raiz({ ID: -1, Nombre: Proyecto.Nombre });
                            Forms.updateFormElement(config.id, "Tareas", raiz.serialize());
                        }
                    }
                }
            }

        };

        render(): JSX.Element {
            return <div>
                <QuickSidePanelRight id="QSPRArchivos">
                    <QuickSidePanelTareas />
                </QuickSidePanelRight>
                <QuickSidePanelRight id="QSPRblogpost" >
                    < EK.Modules.Kontrol.Pages.BlogPost.blogPost {...this.props} />
                </QuickSidePanelRight>
                <QuickSidePanelRight id="QSPRProyectos" >
                    <EK.Modules.SGP.Pages.Dashboard.DashBoardProyectos />
                </QuickSidePanelRight>

                <QuickSidePanelRight id="QSPREditarTarea" >
                    <QuickSidePanelSeguimientoTarea />
                </QuickSidePanelRight>
                <div className="tabbable-line">
                    <ul className="nav nav-tabs">
                        <li className="active">
                            <a href="#tab_task_action" data-toggle="tab" aria-expanded="true">Tareas</a>
                        </li>
                        <li className="">
                            <a href="#tab_calendar_action" data-toggle="tab" aria-expanded="false"> Calendario </a>
                        </li>
                        <li className="">
                            <a href="#tab_gantt_action" data-toggle="tab" aria-expanded="false"> Gantt </a>
                        </li>
                        {/* <li className="">
                            <a href="#tab_kanban_action" data-toggle="tab" aria-expanded="false"> Kanban </a>
                        </li>
                            */}
                    </ul>
                    <div className="tab-content" style={{ padding: 0 }}>
                        <div className="tab-pane active" id="tab_task_action">

                            <Proyectos.TreeViewSection
                                id="Tareas"
                                idForm={config.id}
                                size={[12, 12, 12, 12]}
                                style={{ marginTop: 12 }} />

                        </div>
                        <div className="tab-pane" id="tab_calendar_action">
                            <ViewCalendar />
                        </div>
                        <div className="tab-pane" id="tab_gantt_action">
                            <EKGanttCustom />
                        </div>
                        <div className="tab-pane" id="tab_kanban_action">

                            <div className="portlet light  portlet-fit  bordered  ek-sombra " >
                                <div className="portlet-body" >
                                        {/*INICIO CONTENEDOR KANBAN*/}
                                        <div className="kanban-container" style={{ width: "1250px" }}>

                                            {/*BEGIN CARDS 1*/}
                                            <div id={"EK_Kanban_1"} data-id="_backlog" data-order="1" className="kanban-board" style={{ width: "250px", marginLeft: "0px", marginRight: "0px" }}>
                                                <header className="kanban-board-header dark-light">
                                                    <div className="kanban-title-board">Backlog</div>
                                                </header><main className="kanban-drag">
                                                    <div className="kanban-item">
                                                        <div className="kt-kanban__badge">
                                                            <div className="kt-kanban__image kt-media kt-media--dark">
                                                                <span>BF</span></div><div className="kt-kanban__content">
                                                                <div className="kt-kanban__title">Bug Fixes</div>
                                                                <span className="kt-badge kt-badge--dark kt-badge--inline">Backlog</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="kanban-item">
                                                        <div className="kt-kanban__badge">
                                                            <div className="kt-kanban__image kt-media">
                                                                {/*<img src="assets/media/users/100_5.jpg" alt="image">*/}
                                                            </div>
                                                            <div className="kt-kanban__content">
                                                                <div className="kt-kanban__title">Documentation</div>
                                                                <span className="kt-badge kt-badge--dark kt-badge--inline">Backlog</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </main>
                                                <footer>
                                                </footer>
                                            </div>
                                            {/*END  CARDS 1*/}
                                            {/*BEGIN CARDS 2*/}
                                            <div id={"EK_Kanban_2"} data-id="_todo" data-order="2" className="kanban-board" style={{ width: "250px", marginLeft: "0px", marginRight: "0px" }}>
                                                <header className="kanban-board-header danger-light">
                                                    <div className="kanban-title-board">To Do</div>
                                                </header><main className="kanban-drag">
                                                    <div className="kanban-item">
                                                        <div className="kt-kanban__badge">
                                                            <div className="kt-kanban__image kt-media kt-media--danger">
                                                                <span>SV</span>
                                                            </div>
                                                            <div className="kt-kanban__content">
                                                                <div className="kt-kanban__title">Site Verification</div>
                                                                <span className="kt-badge kt-badge--danger kt-badge--inline">To Do</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="kanban-item">
                                                        <div className="kt-kanban__badge">
                                                            <div className="kt-kanban__image kt-media kt-media--dark">
                                                                <span>BF</span>
                                                            </div>
                                                            <div className="kt-kanban__content">
                                                                <div className="kt-kanban__title">Bug Fixes</div>
                                                                <span className="kt-badge kt-badge--dark kt-badge--inline">Backlog</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </main>
                                                <footer>
                                                </footer>
                                            </div>
                                            {/*END CARDS 2*/}

                                            {/*BEGIN CARDS 3*/}
                                            {/*BEGIN CARDS 3*/}

                                            {/*BEGIN CARDS 4*/}
                                            {/*BEGIN CARDS 4*/}


                                            {/*BEGIN CARDS 5*/}
                                            {/*BEGIN CARDS 5*/}


                                        {/*FIN CONTENEDOR KANBAN*/}
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        };
    });

    interface IQuickSidePanelSeguimientoTarea extends IQuickSidePanelRight {
        tarea?: any;
        saveTarea?: any;
    }


    let QuickSidePanelSeguimientoTarea: any = global.connect(class extends React.Component<IQuickSidePanelSeguimientoTarea, IQuickSidePanelSeguimientoTarea> {
        constructor(props: IQuickSidePanelSeguimientoTarea) {
            super(props);
            this.onClickSave = this.onClickSave.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global["catalogo$" + "BlogPost$SelectEntity"];
            retValue.tarea = state.global["catalogo$" + "tareaSeleccionada"];
            retValue.saveTarea = state.global["catalogo$" + SLOT_WBS];
            return retValue;
        };
        shouldComponentUpdate(nextProps: IQuickSidePanelSeguimientoTarea, { }): boolean {
            return global.hasChanged(this.props.entity, nextProps.entity) ||
                global.hasChanged(this.props.saveTarea, nextProps.saveTarea);
        };
        componentDidUnMount(): void {
            global.dispatchSuccessful("global-page-data", [], "tareaSeleccionada");
        };
        onClickSave(this) {
            let tarea: any = getData(this.props.tarea);

            let formTarea: EditForm = Forms.getForm(this.props.config.id);
            let model: any = formTarea
                .addStringConst("ID", tarea.ID)
                .addNumber("TotalAvance", "TotalAvance"+ tarea.ID)
                .toObject();

            global.dispatchAsyncPut("global-page-data", "base/sgp/sgp_tareas/Get/ActualizarSeguimiento", model, SLOT_WBS);
        };

        componentDidUpdate(prevProps: IQuickSidePanelSeguimientoTarea, prevState: IQuickSidePanelSeguimientoTarea): any {
            if (this.props.saveTarea && wasUpdated(prevProps.saveTarea, this.props.saveTarea, false)) {
                let items: any = getData(this.props.saveTarea);
                switch (items.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        global.success("Tarea actualizada correctamente");
                        dispatchSuccessful("global-page-data", items, "WBSNODE");
                        $("#page-quick-side-toogle" + "QSPREditarTarea").toggleClass("ek10-page-quick-panel-open");
                        break;
                }
            }
        };

        render(): JSX.Element {
            let entity: any = getData(this.props.entity);

            let viewMode: boolean = true;

            let tarea: any = getData(this.props.tarea);
            let TotalAvance: number = tarea.TotalAvance ? tarea.TotalAvance : 0;
            let ClaveEstatusTarea: string = tarea.FlujoAvance.Clave ? tarea.FlujoAvance.Clave : "";
            //tarea.Tarea

            let idEntity: number = entity.ID ? entity.ID : 0;
            let claveEntityType: number = entity.TipoEntidad.Clave ? entity.TipoEntidad.Clave : 0;

            if (ClaveEstatusTarea === 'ENPROCESO') {
                let user: any = EK.Store.getState().global.app.data.Me;
                if (tarea.AsignadoA.ID === user.ID) {
                    viewMode= false;
                }
            }

            return <div>
                <page.OptionSection
                    id="ConfiguracionAvance"
                    icon="fal fa-flag-checkered" level={1} collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <ProgressBarSgp colorText={"black"} backgroundBar={"#64DD17"} id={"TotalAvance" + tarea.ID} viewMode={viewMode} value={TotalAvance} minValue={0} maxValue={tarea.MaximoValor} size={[6, 6, 6, 6]} />
                        <Column size={[12, 2, 2, 2]}>
                            {viewMode === false ?
                                <span >
                                    <button className="btn btn-nuevo btn-default-ek  btn-sm white " href="javascript:void(0)" title="Guardar" onClick={(e: any): any => { this.onClickSave() }}>
                                        <i className="fal fa-cloud-upload" style={{ fontSize: "20px" }}> </i>
                                    </button>
                                </span>
                                :
                                null
                                }
                        </Column>
                    </Row>
                </page.OptionSection>
            </div>

        };
    });

    export class StateDataManagerCustomForm {
        forms: any;
        constructor(forms?: any) {
            this.forms = forms;
        }
        getById(IdPage: string,IdForm: string): DataElement {
            let retValue: DataElement=null ;
            for (var p in this.forms) {
                let index: number = p.indexOf(IdPage);
                if (index >= 0) {
                    let Form: any = this.forms[IdPage].form;
                    for (var f in Form) {
                        let indexForm: number = f.indexOf(IdForm);
                        if (indexForm >= 0) {
                            //if (Form === IdForm) {
                                retValue = this.forms[IdPage].form[IdForm];
                                break;
                            //}
                        };
                    }
                };
            };
            return retValue;
        };
        //getCustomformById(id: string): DataElement {
        //    let retValue: DataElement = null;
        //    for (var p in this.state) {
        //        let index: number = p.indexOf("catalogo$CUSTOMFORM");
        //        if (index >= 0) {
        //            let idState: string = p.substring(index);
        //            if (idState === id) {
        //                retValue = this.state[p];
        //                break;
        //            };
        //        };
        //    };
        //    return retValue;
        //};
    };

 


    interface IProgressBarSgp extends page.IProps, grid.IColumn, EK.UX.IFormElement {
        id: string;
        value?: number;
        minValue?: number;
        maxValue?: number;
        viewMode?: any;
        config?: any;
        porcentAdvance?: string;
        porcentAdvanceSpanMiddle?: string;
        porcentAdvanceSlider?: string;
        onChange?: (item: any) => void;
        NumericBar?: boolean;
        dataManager?: StateDataManagerCustomForm;
        showTitle?: boolean;
        entidadMaximoValor?: any;
        backgroundBar?: string;
        colorText?: string;
    }
    
    export interface IStateProgressBar {
        valueState?: any;
    };

    export let ProgressBarSgp: any = global.connect(class extends React.Component<IProgressBarSgp, IStateProgressBar> {
        constructor(props: IProgressBarSgp) {
            super(props);
            this.onClick = this.onClick.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.dataManager = new StateDataManagerCustomForm(state.forms);
            return retValue;
        };
        static defaultProps: IProgressBarSgp = {
            id: "TotalAvance",
            size: [12, 2, 2, 2],
            minValue: 0,
            viewMode: true,
            showTitle: true
        };

        onClick(this, item: any) {
            Forms.updateFormElement(this.props.config.id, this.props.id, item.target.value);
        };
        componentWillMount(): any {

            let currentValue: number = this.props.value;

            if (currentValue === undefined) {
                let currentEntity: any = getData(EK.Store.getState().global["currentEntity"]);
                currentValue = currentEntity[this.props.id] ? currentEntity[this.props.id] : 0;
            }

            

            Forms.updateFormElement(this.props.config.id, this.props.id, currentValue);
        };
        componentDidUnMount(): void {
            
        };
        componentWillReceiveProps(nextProps: IProgressBarSgp, nextState: IStateProgressBar): any {
            let nextPropsValue: any = nextProps.dataManager.getById(nextProps.config.id ? nextProps.config.id : "", nextProps.id ? nextProps.id : "");
            if ((nextPropsValue === undefined || nextPropsValue === null)) {
                if ((nextProps.value === undefined || nextProps.value === null)) {
                    let currentEntity: any = getData(EK.Store.getState().global["currentEntity"]);
                    let currentValue = currentEntity[nextProps.id] ? currentEntity[nextProps.id] : 0;
                    Forms.updateFormElement(nextProps.config.id, nextProps.id, currentValue);
                } else {
                    Forms.updateFormElement(nextProps.config.id, nextProps.id, nextProps.value);
                }

            } else if (this.props.value != nextProps.value) {
                Forms.updateFormElement(nextProps.config.id, nextProps.id, nextProps.value);
            }
        };
        shouldComponentUpdate(nextProps: IProgressBarSgp, nextState: IStateProgressBar): boolean {
            return (this.props.viewMode != nextProps.viewMode) ||
                (this.props.minValue != nextProps.minValue) ||
                (this.props.maxValue != nextProps.maxValue) ||
                global.hasChanged(this.props.dataManager.getById(this.props.config.id ? this.props.config.id : "", this.props.id ? this.props.id : ""),
                    nextProps.dataManager.getById(this.props.config.id ? this.props.config.id : "", this.props.id ? this.props.id : ""));
        };
        render(): JSX.Element {
            let MaxValue: number = 100;
            if (this.props.entidadMaximoValor !== undefined) {
                let currentEntity: any = getData(EK.Store.getState().global["currentEntity"]);
                MaxValue = currentEntity[this.props.entidadMaximoValor];
                MaxValue = MaxValue === null ? 100 : MaxValue;
            } else {
                MaxValue= this.props.maxValue ? this.props.maxValue : 100;
            }



            let CurrentValueForm: any = this.props.dataManager.getById(this.props.config.id ? this.props.config.id : "", this.props.id ? this.props.id : "");
            let CurrentValue: number = CurrentValueForm ? CurrentValueForm.value ? CurrentValueForm.value : 0 : 0;
            let NumericBar: boolean = true;
            if (this.props.maxValue === undefined || this.props.maxValue === null) {
                NumericBar = false;
            }

            let porcentAdvance: string;
            let MinValue: any = this.props.minValue ? this.props.minValue : 0;
            

            let calcPorcentAdvance = (maxPorcent: number): string => {
                let porcentAdvance: number = (Math.round(maxPorcent * CurrentValue / MaxValue));
                porcentAdvance= porcentAdvance < 100 ? porcentAdvance : 100;
                return porcentAdvance.toString().concat("%");
            };
            porcentAdvance = calcPorcentAdvance(100);
            let porcentAdvanceSpanMiddle = calcPorcentAdvance(91);
            let porcentAdvanceSlider = calcPorcentAdvance(99);

            let ViewMode: boolean = this.props.viewMode === undefined ? true : this.props.viewMode;
            let backgroundBar = this.props.backgroundBar ? this.props.backgroundBar : "";
            let colorText = this.props.colorText ? this.props.colorText : "";

            return <Column size={this.props.size}>
                {ViewMode === true ?
                    <ProgressBarSgpView {...this.props} colorText={colorText} NumericBar={NumericBar} backgroundBar={backgroundBar} value={CurrentValue} minValue={MinValue} maxValue={MaxValue} porcentAdvance={porcentAdvance} porcentAdvanceSpanMiddle={porcentAdvanceSpanMiddle} porcentAdvanceSlider={porcentAdvanceSlider}/>
                    :
                    <ProgressBarSgpEdit {...this.props} colorText={colorText} NumericBar={NumericBar} backgroundBar={backgroundBar} onChange={this.onClick} value={CurrentValue} minValue={MinValue} maxValue={MaxValue} porcentAdvance={porcentAdvance} porcentAdvanceSpanMiddle={porcentAdvanceSpanMiddle} porcentAdvanceSlider={porcentAdvanceSlider}/>
                }
            </Column>
        };
    });

     class ProgressBarSgpEdit extends React.Component<IProgressBarSgp, IStateProgressBar> {
        constructor(props: IProgressBarSgp) {
            super(props);
        };
        render(): JSX.Element {
            return<div>
                <div id={this.props.id + "Form"} className="form-group">
                    {this.props.showTitle === true ?
                        <label>
                            <span>
                                Avance
                </span>
                        </label>
                        : null}
                    <div style={{ width: "100%", top: "-5px"}} className="input-group">
                        <span className="irs">
                            <span className="irs-min" style={{ visibility: "visible" }}>{this.props.minValue}</span>
                            <span className="irs-max" style={{ visibility: "visible" }}>{this.props.maxValue}</span>
                            <span className="irs-single" style={{ left: this.props.porcentAdvanceSpanMiddle, background: this.props.backgroundBar, color: this.props.colorText }}>{this.props.value}</span>
                        </span>
                        <span>
                            <span className="ek10-sgp-progress-bar-content"></span>
                            <span className="ek10-sgp-progress-bar-advance" style={{ width: this.props.porcentAdvance, background: this.props.backgroundBar}}></span>
                            <span className="irs-slider" style={{ left: this.props.porcentAdvanceSlider, background: this.props.backgroundBar}}></span>
                    </span>
                    <span>
                        <input id="progressBarSgp" readOnly={false} type="range" min={this.props.minValue} max={this.props.maxValue} value={this.props.value.toString()} className="ek10-sgp-slider-progress-bar"
                            onChange={(e: any): any => { this.props.onChange(e) }} /></span>
                </div>
                </div>


                </div>;
        }
    };

 class ProgressBarSgpView extends React.Component<IProgressBarSgp, IStateProgressBar> {
    constructor(props: IProgressBarSgp) {
        super(props);
    };
    render(): JSX.Element {
        return <div id={this.props.id + "Form"} className="form-group">
            {this.props.showTitle === true ?
                <label>
                    <span>
                        Avance
                </span>
                </label>
                :null}
            <div style={{ width: "100%", top: "-5px"}} className="input-group">
                <span className="irs">
                    <span className="irs-min" style={{ visibility: "visible" }}>{this.props.minValue}</span>
                    <span className="irs-max" style={{ visibility: "visible" }}>{this.props.maxValue}</span>
                    <span className="irs-single" style={{ left: this.props.porcentAdvanceSpanMiddle, background: this.props.backgroundBar, color: this.props.colorText }}>{this.props.value}</span>
                </span>
                <span>
                    <span className="ek10-sgp-progress-bar-content"></span>
                    <span className="ek10-sgp-progress-bar-advance" style={{ width: this.props.porcentAdvance, background: this.props.backgroundBar}}></span>
                    <span className="irs-slider" style={{ left: this.props.porcentAdvanceSlider, background: this.props.backgroundBar}}></span>
                </span>
            </div>
        </div>;
    }
};
    export class ProgressBarSgpViewSmall extends React.Component<IProgressBarSgp, IStateProgressBar> {
        constructor(props: IProgressBarSgp) {
            super(props);
        };
        render(): JSX.Element {
            let CurrentValue: number = this.props.value ? this.props.value : 0;
            CurrentValue = Math.round(CurrentValue);
            let porcentAdvance: string = CurrentValue.toString();

            porcentAdvance = porcentAdvance.concat("%");

            return <div id="" className="form-group" style={{ marginLeft: "5%", minHeight: "20px", paddingTop: "7px", display: "block", textAlign: "left" }}>
                <div style={{ width: "80%", height: "80%", position: "relative"}} >
                    <span style={{ width: "80%", verticalAlign: "revert", paddingBottom: "0px", height:"7px" }}>
                        <span className="ek10-sgp-progress-bar-small-content" style={{ height: "inherit"}}   ></span>
                        <span className="ek10-sgp-progress-bar-small-advance" style={{ width: porcentAdvance, height: "inherit" }}></span>
                    </span>
                    <span style={{ marginLeft: "47%" }}>{porcentAdvance}</span>
                </div>
            </div>;
        }
    };

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

    interface IViewCalendarProps extends page.IProps {
    };


    let ViewCalendar: any = global.connect(class extends React.Component<IViewCalendarProps, IViewCalendarProps> {
        constructor(props: IViewCalendarProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        onClickEventProp(calEvent: any, jsEvent: any, view: any): any {
        };

        onClickSelectProp(startDate: any, endDate: any, jsEvent: any, view: any): any {
        };


        render(): JSX.Element {
            let minTime = "07:00:00";
            let maxTime = "20:00:00";
            return <calendar.GlobalWBSTareasSGPCalendar
                id={CALENDAR_ID}
                idForm={config.id}
                minTime={minTime}
                maxTime={maxTime}
                onEventClick={this.onClickEventProp}
                onSelect={this.onClickSelectProp}
            />
        };
    });
    

    
}
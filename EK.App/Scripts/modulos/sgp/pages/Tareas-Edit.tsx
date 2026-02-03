namespace EK.Modules.SGP.Pages.Tareas {
    "use strict";
    const PAGE_ID: string = "sgp_tareas";
    const BLOGPOST_SELECT_ENTITY = "sgp$tareas"
    const BLOGPOST_SELECT_ENTITY_STATE = "BlogPost$SelectEntity";
    const SECTION_LIST_TASK_CATALOG = "TareasProyecto";
    const DEPENDENCIAS_AL_INICIO = "DependenciasAlInicio"
    const DEPENDENCIAS_AL_FIN = "DependenciasAlFin"
    const PROYECTO_SELECCIONADO = "ProjectSelected";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "sgp", [DEPENDENCIAS_AL_INICIO, DEPENDENCIAS_AL_FIN]);

    export class StateDataManager {
        state: any;
        constructor(state?: any) {
            this.state = state;
        }
        getById(id: string): DataElement {
            let retValue: DataElement = null;
            for (var p in this.state) {
                let index: number = p.indexOf("itemsData");
                if (index >= 0) {
                    let idState: string = p.substring(index);
                    if (idState === id) {
                        retValue = this.state[p];
                        break;
                    };
                };
            };
            return retValue;
        };
    };

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addBoolean("PresentacionGantt")
                .addBoolean("Contemplaravance")
                .addDate("FechaEstimadaInicio")
                .addDate("FechaEstimadaFin")
                .addObject("FlujoAvance")
                .addObject("TipoAvance")
                .addObject("Prioridad")
                .addObject("AsignadoA")
                .addNumber("MaximoValor")
                .addNumber("TotalAvance")
                .addObject("WorkFlow")
                .addObject(DEPENDENCIAS_AL_INICIO)
                .addObject(DEPENDENCIAS_AL_FIN)
                .addDescripcion()
                .addVersion()
                .toObject();

            return model;
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} allowNew={"false"}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    export class Edit extends page.Base {
        render(): JSX.Element {
            let currentEntity: any = getData(EK.Store.getState().global["currentEntity"]);

            return <page.Edit>
                <page.OptionSection
                    id={config.id}
                    icon="fa fa-industry"
                    collapsed={false}
                    hideCollapseButton={true}>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <input.Clave size={[12, 4, 4, 4]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} validations={[validations.required()]} />
                                <input.Descripcion size={[12, 12, 12, 12]} />
                        </Row>
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "15px" }}>
                            <Row>
                            <Column size={[6, 6, 6, 6]}>
                                <page.OptionSection
                                id="ConfiguracionTarea"
                                    icon="fal fa-tasks" level={1} collapsed={false} hideCollapseButton={false}>
                                    <checkBox.Status checkedLabel="Estatus" id="Estatus" size={[6, 6, 6, 6]} />
                                    <checkBox.Status checkedLabel="Presentación Gantt" id="PresentacionGantt" size={[6, 6, 6, 6]} />
                                    <DatePicker id="FechaEstimadaInicio" type="date" size={[6, 6, 6, 6]} validations={[validations.lessEqualThan("FechaFin", "La fecha estimada de inicio debe ser menor a la fecha de finalización")]} />
                                    <DatePicker id="FechaEstimadaFin" type="date" size={[6, 6, 6, 6]} validations={[validations.greaterEqualThan("FechaInicio", "La fecha estimada de fin debe ser menor a la fecha de inicio")]} />
                                    <CountComponent />
                                    <UsuariosAgrupadosTareas size={[12, 6, 6, 6]} />
                                    <ddl.PrioridadTareaSgp id="Prioridad" size={[12, 6, 6, 6]} />
                                </page.OptionSection>
                            </Column>
                            <Column size={[6, 6, 6, 6]}>
                                <page.OptionSection
                                id="ConfiguracionAvance"
                                        icon="fal fa-flag-checkered" level={1} collapsed={false} hideCollapseButton={false}>
                                        <Row>
                                            {currentEntity.TieneHijos === 1 ?
                                                <span >
                                                    <label.Entidad id="TipoAvance" size={[12, 6, 6, 6]} />
                                                    <Label id="MaximoValor" size={[12, 3, 3, 3]} />
                                                </span>
                                                :
                                                <span>
                                                    <ddl.TipoAvanceTareaSgp id="TipoAvance" size={[12, 6, 6, 6]} />
                                                    <MaximoValorComponent size={[12, 3, 3, 3]} />
                                                </span>
                                            }
                                        <ProgressBarSgpEditTask/>
                                            <Row>
                                                </Row>
                                        <ddl.FlujoAvanceTareaSgp id="FlujoAvance" size={[12, 6, 6, 6]} />
                                            <ddl.WorkflowsDDL id="WorkFlow" size={[12, 6, 6, 6]} claveTipo={"WF-SGPTAREA"} addNewItem={"SO"} />
                                            <checkBox.Status checkedLabel="Contemplar avance" id="Contemplaravance" size={[12, 2, 2, 2]} />
                                        </Row>
                                </page.OptionSection>
                            </Column>
                           </Row>
                        </Column>
                            <DependenciaTareas/>
                        <ComponentesAdicionales/>
                     </Row>
                </page.OptionSection>
            </page.Edit>;
        };
    };

    interface IStateDependenciaTareas {
        selectedForm?: string;
    };
    interface IPropsDependenciaTareas {
        TipoEntidad?: any;
        SeccionGlobal?: any;
        SeccionSelecionada?: any;
    };
    let DependenciaTareas: any = global.connect(class extends React.Component<IPropsDependenciaTareas, IStateDependenciaTareas> {
        constructor(props: IPropsDependenciaTareas) {
            super(props);
            this.state = {
                selectedForm: ""
            };
            this.onClick = this.onClick.bind(this);
            this.onClickSection = this.onClickSection.bind(this);
            this.onClickDelete = this.onClickDelete.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onClick(this, item: any) {
            let arrayConfiguracion: any[] = new Array();
            if (this.state.selectedForm !== "") {
                let ValueFormTareas: DataElement = Forms.getValue(SECTION_LIST_TASK_CATALOG, config.id);

                let TareasActualizado = this.removeItem(ValueFormTareas, item);
                Forms.updateFormElement(config.id, SECTION_LIST_TASK_CATALOG, TareasActualizado);

                let ValueFormDependencia: any = Forms.getValue(this.state.selectedForm, config.id);
                let DataValueDependencia: any = getData(ValueFormDependencia);

                let tarea: any = getData(EK.Store.getState().global["currentEntity"]);
                let thisItem: any = global.assign({}, {
                    ID: ValueFormDependencia.getNextLowerID(),
                    IdTarea: tarea.ID,
                    IdTareaDependencia: item.Tarea.ID,
                    TareaDependencia: { ID: item.Tarea.ID, Clave: item.Tarea.Clave, Nombre: item.Tarea.Nombre},
                    idTipoDependencia: -1,
                    _nuevo: true
                });
                let registrado: boolean = false;
                if (DataValueDependencia.length > 0) {
                    DataValueDependencia.forEach((value: any, index: any) => {
                        if (value.IdTareaDependencia === thisItem.IdTareaDependencia) {
                            value["_nuevo"] = undefined;
                            value["_eliminado"] = undefined;
                            registrado = true;
                        }
                        //else {
                        //    thisItem["_nuevo"] = true;
                        //    DataValueDependencia.push(thisItem);
                        //}
                    })
                }
                if (registrado === false) {
                    thisItem["_nuevo"] = true;
                    DataValueDependencia.push(thisItem);
                }

                //else {
                //    item["_nuevo"] = true;
                //    DataValueDependencia.push(thisItem);
                //}

                
                let elementos = createSuccessfulStoreObject(DataValueDependencia);
                Forms.updateFormElement(config.id, this.state.selectedForm, elementos);



            }
            else {
                warning("Para agregar la tarea, debe se seleccionar una dependencia.");
            }

        };
        onClickSection(this,e:any, id: string) {
            this.state = { selectedForm: id };
            let dependenciaAlInicio: any = $("#_container" + DEPENDENCIAS_AL_INICIO);
            let dependenciaAlFin: any = $("#_container" + DEPENDENCIAS_AL_FIN);

            dependenciaAlInicio.parent().removeClass("ek-sombra ek10-sgp-tareas-border");
            dependenciaAlFin.parent().removeClass("ek-sombra ek10-sgp-tareas-border");

            let CurrentTarget:any = $(e.currentTarget);
            CurrentTarget.parent().addClass("ek-sombra ek10-sgp-tareas-border");
        };
        onClickDelete(this, item: any, idForm:string) {
            let ValueFormTareas: DataElement = Forms.getValue(SECTION_LIST_TASK_CATALOG, config.id);
            
            let TareasActualizado = this.toggleIEnabletem(ValueFormTareas, item);
            Forms.updateFormElement(config.id, SECTION_LIST_TASK_CATALOG, TareasActualizado);

            let ValueFormDependencias: any = Forms.getValue(idForm, config.id);
            let dataValueDependencias: any = getData(ValueFormDependencias);

            for (var i = 0; i < dataValueDependencias.length; i++) {
                if (dataValueDependencias[i].IdTareaDependencia === item.IdTareaDependencia) {
                    if (dataValueDependencias[i].ID > 0) {
                        dataValueDependencias[i]["_eliminado"] = true;
                    } else {
                        dataValueDependencias.splice(i, 1);
                    }
                }
            }

            Forms.updateFormElement(config.id, idForm, createSuccessfulStoreObject(dataValueDependencias));
        };

        componentWillMount(): void {
        };

        componentDidUnMount(): void {
        };

        removeItem(Items: any, item: any ): DataElement {
            let items: any[] = [];
            let thisItems: any[] = getData(Items);
            //let thisItems: any = Items;
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((value: any, index: number) => {
                let itemTemp: any = EK.Global.assign({}, value);

                if (value.ID !== item.ID) {
                    items.push(itemTemp);
                } else {
                    thisItem._eliminado = true;
                    items.push(thisItem);
                }
            });

            let retValue: DataElement = new DataElement();
            retValue.status = AsyncActionTypeEnum.successful;
            retValue.data = items;
            retValue.timestamp = Number(new Date());

            return retValue;
        };

        toggleIEnabletem(items: any, item: any ): DataElement {

            let data: any[] = getData(items);
            let thisItems: any[] = getData(items);
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((value: any, index: number) => {

                if (value.Tarea.ID === thisItem.IdTareaDependencia) {
                    if (value["_eliminado"] === undefined) {
                        value["_eliminado"] = true;
                    } else {
                        value["_eliminado"] = undefined;
                    }

                };
            });

            let retValue: DataElement = new DataElement();
            retValue.status = AsyncActionTypeEnum.successful;
            retValue.data = thisItems;
            retValue.timestamp = Number(new Date());

            return retValue;
        };

        componentWillReceiveProps(nextProps: IPropsDependenciaTareas): void {
            if (hasChanged(this.props.TipoEntidad, nextProps.TipoEntidad)) {
                if (nextProps.TipoEntidad != null && nextProps.TipoEntidad != undefined) {
                    let TipoEntidadID: any = nextProps.TipoEntidad.ID;
                }
            }
        };

        shouldComponentUpdate(nextProps: IPropsDependenciaTareas, nextState: IStateDependenciaTareas): boolean {
            return (this.state.selectedForm !== nextState.selectedForm);
        };

        componentWillUpdate(nextProps: IPropsDependenciaTareas, nextState: IStateDependenciaTareas) {
        };

        componentDidUpdate(prevProps: IPropsDependenciaTareas, prevState: IStateDependenciaTareas): void {
        };

        componentWillUnmount(): void {

        };

        render(): JSX.Element {
            this.state.selectedForm;
            let SelectedInicio: boolean = false;
            let SelectedFin: boolean = false;

            this.state.selectedForm === DEPENDENCIAS_AL_INICIO ? SelectedInicio = true : null;
            this.state.selectedForm === DEPENDENCIAS_AL_FIN ? SelectedFin = true : null;
            
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id="DependenciaTarea" title="Dependencias de tarea"
                    icon="fal fa-stream" level={1} collapsed={false} hideCollapseButton={false}>
                <TareasDisponibles onClickItem={this.onClick}/>
                <SectionListEdit id={DEPENDENCIAS_AL_INICIO} size={[12, 4, 4, 4]} onClickSection={this.onClickSection} onClickDelete={this.onClickDelete} />
                <SectionListEdit id={DEPENDENCIAS_AL_FIN} size={[12, 4, 4, 4]} onClickSection={this.onClickSection} onClickDelete={this.onClickDelete}/>
            </page.OptionSection></Column>;
        };
    });
        
    interface ISectionListEdit extends page.IProps{
        id?: string;
        SectionItemSelected?: any;
        dataManager?: StateDataManager;
        onClickSection?: (e:any,id: string) => void;
        onClickDelete?: (item: any, idForm: string) => void;
        selected?: boolean;
        tareasDisponibles?: any;
        DependenciasAlInicio?: any;
        DependenciasAlFin?: any;
        size?: any;
    };
    let SectionListEdit: any = global.connect(class extends React.Component<ISectionListEdit, ISectionListEdit> {
        constructor(props: ISectionListEdit) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.dataManager = new StateDataManager(state.global);
            retValue.tareasDisponibles = state.global["catalogo$" + SECTION_LIST_TASK_CATALOG];//Forms.getValue(SECTION_LIST_TASK_CATALOG, config.id);//state.global["catalogo$" + SECTION_LIST_TASK_CATALOG];
            retValue.DependenciasAlInicio = state.global["catalogo$" + DEPENDENCIAS_AL_INICIO];//Forms.getValue(DEPENDENCIAS_AL_INICIO, config.id);
            retValue.DependenciasAlFin = state.global["catalogo$" + DEPENDENCIAS_AL_FIN];//Forms.getValue(DEPENDENCIAS_AL_FIN, config.id);
            return retValue;
        };

        static defaultProps: ISectionListEdit = {
            size: [12, 4, 4, 4]
        };
        shouldComponentUpdate(nextProps: ISectionListEdit, nextState: {}): boolean {
            return hasChanged(this.props.dataManager.state[(nextProps.id ? nextProps.id : "")],
                nextProps.dataManager.state[(nextProps.id ? nextProps.id : "")]);
        };
        componentWillMount(): any {
            let tarea: any = getData(EK.Store.getState().global["currentEntity"]);
            let parametros: any = { IdTarea: tarea.ID, ClaveTipoDependencia: this.props.id.toUpperCase() };
            global.dispatchAsync("global-page-data", "base/sgp/sgp_tareas/Get/GetTareasDependencias/" + global.encodeParameters(parametros), this.props.id);
        };
        removeItem(Items: any, item: any): DataElement {
            let items: any[] = [];
            let thisItems: any[] = getData(Items);
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((value: any, index: number) => {
                let itemTemp: any = EK.Global.assign({}, value);

                if (value.ID !== item.ID) {
                    items.push(itemTemp);
                } else {
                    thisItem._eliminado = true;
                    items.push(thisItem);
                }
            });

            let retValue: DataElement = new DataElement();
            retValue.status = AsyncActionTypeEnum.successful;
            retValue.data = items;
            retValue.timestamp = Number(new Date());

            return retValue;
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("global-page-data", [], this.props.id);
        };
        Disabletem(items: any, item: any): DataElement {

            let data: any[] = getData(items);
            let thisItems: any[] = getData(items);
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((value: any, index: number) => {

                if (value.Tarea.ID === thisItem.IdTareaDependencia) {
                    value["_eliminado"] = true;
                };
            });

            let retValue: DataElement = new DataElement();
            retValue.status = AsyncActionTypeEnum.successful;
            retValue.data = thisItems;
            retValue.timestamp = Number(new Date());

            return retValue;
        };
        componentWillReceiveProps(nextProps: ISectionListEdit): void {
            if (hasChanged(this.props.tareasDisponibles, nextProps.tareasDisponibles) ||
                hasChanged(this.props[nextProps.id], nextProps[nextProps.id])){
                    if (global.isSuccessful(nextProps.tareasDisponibles) && global.isSuccessful(nextProps[nextProps.id])) {
                        let ValueFormTareas: DataElement = /*getData(*/nextProps.tareasDisponibles/*)*/;
                        let DataValueDependencia: any = getData(nextProps[nextProps.id]);
                        let TareasActualizado: any = nextProps.tareasDisponibles;

                        let tarea: any = getData(EK.Store.getState().global["currentEntity"]);
                        let actualTarea: any = EK.Global.assign({}, { IdTareaDependencia: tarea.ID });
                        this.Disabletem(ValueFormTareas, actualTarea);

                        if (DataValueDependencia.length > 0) {
                            DataValueDependencia.forEach((value: any, index: any) => {
                                TareasActualizado = this.Disabletem(ValueFormTareas, value);
                            })
                        }
                        Forms.updateFormElement(config.id, SECTION_LIST_TASK_CATALOG, TareasActualizado);
                    }
                //}
            }
        };
        render(): JSX.Element {

            let $ml: any = config.getML();

            let onClickDelete: any = {
                icon: "fal fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.props.onClickDelete(item, this.props.id);

                }
            };
            return<Column  size={this.props.size}  >
                <div id={"_container"+this.props.id} onClick={(e) => this.props.onClickSection(e, this.props.id)}>
                        <page.SectionList
                    id={this.props.id}
                    parent={PAGE_ID}
                    icon={$ml.form[this.props.id].icon}
                    title={$ml.form[this.props.id].label}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    height={"320px"}
                    drawOddLine={true}
                    selectable={true}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[6, 6, 6, 6]} className="list-default-header">{"Nombre"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fin"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{" "}</Column>
                        </Row>
                    </div>}
                    formatter={(index: number, item: any) => {
                        return <Row>
                            <Column size={[6, 6, 6, 6]} className="listItem-default-item">
                                <span>{item.TareaDependencia.Nombre} </span>
                            </Column>
                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                <span style={{ fontWeight: 300 }}>{global.formatDate(item.TareaDependencia.FechaEstimadaInicio)}</span>
                            </Column>
                            <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                <span style={{ fontWeight: 300 }}>{global.formatDate(item.TareaDependencia.FechaEstimadaFin)}</span>
                            </Column>
                            <Column size={[1, 1, 1, 1]}>
                                <buttons.PopOver idFormSection={this.props.id} info={item}
                                    extraData={[onClickDelete]} />
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
                </div>
                </Column>
        };
    });

    let SectionListView: any = global.connect(class extends React.Component<ISectionListEdit, ISectionListEdit> {
        constructor(props: ISectionListEdit) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.dataManager = new StateDataManager(state.global);
            retValue.DependenciasAlInicio = state.global["catalogo$" + DEPENDENCIAS_AL_INICIO];
            retValue.DependenciasAlFin = state.global["catalogo$" + DEPENDENCIAS_AL_FIN];
            return retValue;
        };

        static defaultProps: ISectionListEdit = {
            size: [12, 4, 4, 4]
        };
        shouldComponentUpdate(nextProps: ISectionListEdit, nextState: {}): boolean {
            return hasChanged(this.props.dataManager.state[(nextProps.id ? nextProps.id : "")],
                nextProps.dataManager.state[(nextProps.id ? nextProps.id : "")]);
        };
        componentWillMount(): any {
            let tarea: any = getData(EK.Store.getState().global["currentEntity"]);
            let parametros: any = { IdTarea: tarea.ID, ClaveTipoDependencia: this.props.id.toUpperCase() };
            global.dispatchAsync("global-page-data", "base/sgp/sgp_tareas/Get/GetTareasDependencias/" + global.encodeParameters(parametros), this.props.id);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("global-page-data", [], this.props.id);
        };
        
        render(): JSX.Element {
            let $ml: any = config.getML();
            return <Column size={this.props.size}  >
                <div id={"_container" + this.props.id}>
                    <page.SectionList
                        id={this.props.id}
                        parent={PAGE_ID}
                        icon={$ml.form[this.props.id].icon}
                        title={$ml.form[this.props.id].label}
                        size={[12, 12, 12, 12]}
                        level={1}
                        horizontalScrolling={true}
                        height={"320px"}
                        drawOddLine={true}
                        selectable={true}
                        readonly={false}
                        addRemoveButton={false}
                        hideNewButton={true}
                        listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Nombre"}</Column>
                                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Fecha Inicio"}</Column>
                                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Fecha Fin"}</Column>
                            </Row>
                        </div>}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[6, 6, 6, 6]} className="listItem-default-item">
                                    <span>{item.TareaDependencia.Nombre} </span>
                                </Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                                    <span style={{ fontWeight: 300 }}>{global.formatDate(item.TareaDependencia.FechaEstimadaInicio)}</span>
                                </Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                                    <span style={{ fontWeight: 300 }}>{global.formatDate(item.TareaDependencia.FechaEstimadaFin)}</span>
                                </Column>
                            </Row>;
                        }}>
                    </page.SectionList>
                </div>
            </Column>
        };
    });
    
    interface ITareasDisponibles extends page.IProps {
        id?: string;
        SectionItemSelected?: any;
        tareasDisponibles?: any;
        dataManager?: StateDataManager;
        onClickItem?: (item: any) => void;
    };
    class TareasDisponibles extends React.Component<ITareasDisponibles, ITareasDisponibles> {
        constructor(props: ITareasDisponibles) {
            super(props);
            
        };

        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            tareasDisponibles: state.global["catalogo$" + SECTION_LIST_TASK_CATALOG],
        });
        componentWillMount(): any {
            let tarea: any = getData(EK.Store.getState().global["currentEntity"]);
            if (tarea && tarea.IdProyecto) {
                let parametros: any = { IdProyecto: tarea.IdProyecto, TieneHijos: 0 };
                global.dispatchAsync("global-page-data", "base/sgp/WBS/Get/GetTreeTask/" + global.encodeParameters(parametros), SECTION_LIST_TASK_CATALOG);
            }
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("global-page-data", [], SECTION_LIST_TASK_CATALOG);
        };

        shouldComponentUpdate(nextProps: ITareasDisponibles, nextState: ITareasDisponibles): boolean {
            return hasChanged(this.props.tareasDisponibles, nextProps.tareasDisponibles);
        };

        render(): JSX.Element {
            return <Column size={[12, 4, 4, 4]}>
                <page.SectionList
                    id={SECTION_LIST_TASK_CATALOG}
                    icon={"fal fa-tasks"}
                    title={"Tareas"}
                    parent={config.id}
                    size={[12, 12, 12, 12]}
                    level={1}
                    horizontalScrolling={true}
                    height={"320px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    selectable={false}
                    hideNewButton={true}
                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 12, 12, 12]} className="list-default-header">{"Nombre"}</Column>
                        </Row>
                    </div>}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                    <i className="fas fa-plus-circle" title="Agregar" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.props.onClickItem(item)} ></i>
                                </Column>
                            </Row>;

                        }}>
                    </page.SectionList>
                </Column>;
        }
    };

    interface IProgressBarSgpEditTask {
        entity?: any;
        tipoAvance?: any;
        MaximoValor?: any;
        EstatusTarea?: any;
    }


    export let ProgressBarSgpEditTask: any = global.connect(class extends React.Component<IProgressBarSgpEditTask, IStateProgressBar> {
        constructor(props: IProgressBarSgpEditTask) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoAvance = Forms.getDataValue("TipoAvance", config.id, state);
            retValue.MaximoValor = Forms.getDataValue("MaximoValor", config.id, state);
            retValue.EstatusTarea = Forms.getDataValue("FlujoAvance", config.id, state);
            retValue.entity = state.global.currentEntity;
            return retValue;
        };
        componentWillMount(): any {


        };
        componentDidUnMount(): void {

        };
        componentWillReceiveProps(nextProps: IProgressBarSgpEditTask, nextState: IStateProgressBar): any {
        };
        shouldComponentUpdate(nextProps: IProgressBarSgpEditTask, nextState: IStateProgressBar): boolean {
            return global.hasChanged(this.props.tipoAvance, nextProps.tipoAvance) ||
                (this.props.MaximoValor.data !== nextProps.MaximoValor.data) ||
                global.hasChanged(this.props.EstatusTarea, nextProps.EstatusTarea) ||
                global.hasChanged(this.props.entity, nextProps.entity);
        };
        render(): JSX.Element {
            let Entity: any = getData(this.props.entity);
            let EstatusTarea: any = getData(this.props.EstatusTarea);
            let ViewMode: boolean = true;

            let ClaveEstatusTarea: string = EstatusTarea.Clave ? EstatusTarea.Clave : "";
            if (ClaveEstatusTarea === 'ENPROCESO' && Entity.TieneHijos === 0) {
                let user: any = EK.Store.getState().global.app.data.Me;
                if (Entity.AsignadoA.ID === user.ID) {
                    ViewMode = false;
                }
            }

            let MaximoValor: any = this.props.MaximoValor.data ;
            let Value: number = Entity.TotalAvance;

            return <ProgressBarSgp colorText={"black"} backgroundBar={"#64DD17"} viewMode={ViewMode} id="TotalAvance" value={Value} maxValue={MaximoValor} size={[12, 12, 12, 12]} />;
        };
    });

    interface IMaximoValor {
        Entity?: any;
        size?: number[];
    };
    let MaximoValorComponent: any = global.connect(class extends React.Component<IMaximoValor, IMaximoValor> {
        constructor(props: IMaximoValor) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.Entity = Forms.getDataValue("TipoAvance", retValue.config.id, state);
            return retValue;
        };

        static defaultProps: IMaximoValor = {
            size: [12, 2, 2, 2]
        };

        componentWillReceiveProps(nextProps: IMaximoValor): void {
            if (hasChanged(this.props.Entity, nextProps.Entity)) {
                if (nextProps.Entity != null && nextProps.Entity != undefined) {
                    let entity: any = getData(nextProps.Entity);
                    let ClaveEntity: string = entity.Clave ? entity.Clave : "";
                    if (ClaveEntity !== "VALOR") {
                        Forms.updateFormElement(config.id, "MaximoValor", null);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IMaximoValor, nextState: IMaximoValor): boolean {
            return hasChanged(this.props.Entity, nextProps.Entity);
        };

        render(): JSX.Element {
            let entity: any = getData(this.props.Entity);
            let ClaveEntity: string = entity.Clave ? entity.Clave : "";

            if (ClaveEntity === "VALOR") {
                return <input.Integer id="MaximoValor" size={this.props.size} required={false} />
            } else {
                return <Label id="MaximoValor" size={this.props.size} />;
            }

        };
    });
        


    interface IUsuariosAgrupadosTareas extends page.IProps {
        entity?: DataElement;
    };
    export let UsuariosAgrupadosTareas: any = global.connect(class extends React.Component<IUsuariosAgrupadosTareas, IUsuariosAgrupadosTareas> {
        constructor(props: IUsuariosAgrupadosTareas) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global.currentEntity
            return retValue;
        };
        shouldComponentUpdate(nextProps: IUsuariosAgrupadosTareas, { }): boolean {
            return hasChanged(this.props.entity, nextProps.entity);
        };
        //componentDidMount(): void {
        //    let entity: any = getData(this.props.entity);

        //    let itemSelected: any = global.assign({}, {
        //        ID: entity.ID,
        //        Clave: entity.Clave,
        //        Nombre: entity.Nombre,
        //        TipoEntidad: {
        //            Clave: BLOGPOST_SELECT_ENTITY,
        //            Nombre: "Tareas",
        //        }
        //    });

        //    global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY_STATE);
        //}

        render(): JSX.Element {
            let entity: any = getData(this.props.entity);
            let IdWBS: number = entity.IdWBS ? entity.IdWBS : 0;

            if (IdWBS < 0) {
                return null;
            }

            return <div>
                <ddl.SGPUsuariosAgrupadosTareasDDL IdWBS={IdWBS} id="AsignadoA" addNewItem={"SO"} size={[12, 6, 6, 6]} /*validations={[validations.required()]}*//>
            </div>;
        };
    });

    interface IComponentesAdicionales extends page.IProps {
        entity?: DataElement;
    };
    let ComponentesAdicionales: any = global.connect(class extends React.Component<IComponentesAdicionales, IComponentesAdicionales> {
        constructor(props: IComponentesAdicionales) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global.currentEntity
            return retValue;
        };
        shouldComponentUpdate(nextProps: IComponentesAdicionales, { }): boolean {
            return hasChanged(this.props.entity, nextProps.entity);
        };
        componentDidMount(): void {
            let entity: any = getData(this.props.entity);

            let itemSelected: any = global.assign({}, {
                ID: entity.ID,
                Clave: entity.Clave,
                Nombre: entity.Nombre,
                TipoEntidad: {
                    Clave: BLOGPOST_SELECT_ENTITY,
                    Nombre: "Tareas",
                }
            });

            global.dispatchSuccessful("global-page-data", itemSelected, BLOGPOST_SELECT_ENTITY_STATE);
        }

        render(): JSX.Element {
            let entity: any = getData(this.props.entity);
            let IDEntity: number = entity.ID ? entity.ID : 0;
            let ClaveEntity: string = BLOGPOST_SELECT_ENTITY;

            if (IDEntity < 0) {
                return null;
            }

            return <div>
                <Column size={[12,12,12,12]}>
                    <KontrolFileManager title="Archivos" modulo={this.props.config.modulo} viewMode={false} multiple={true} entity={global.createSuccessfulStoreObject({ ID: IDEntity })} entityType={global.createSuccessfulStoreObject([ClaveEntity].join(""))} />
                    <Row>
                        <EK.Modules.Kontrol.Pages.BlogPost.blogPost {...this.props} />
                    </Row>
                </Column>
            </div>;
        };
    });

    class View extends page.Base {
        render(): JSX.Element {

            return <page.View>
                <page.OptionSection
                    id={config.id}
                    icon="fa fa-industry"
                    collapsed={false}
                    hideCollapseButton={true}>
                    <Row>

                        </Row>


                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <label.Clave size={[12, 4, 4, 4]} />
                                <label.Nombre size={[12, 8, 8, 8]} />
                                <label.Descripcion size={[12, 12, 12, 12]} />
                            </Row>
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "15px" }}>
                            <Row>
                                <Column size={[6, 6, 6, 6]}>
                                    <page.OptionSection
                                        id="ConfiguracionTarea"
                                        icon="fal fa-tasks" level={1} collapsed={false} hideCollapseButton={false}>
                                        <label.Estatus size={[6, 6, 6, 6]} />
                                        <label.Estatus id="PresentacionGantt" size={[6, 6, 6, 6]} />
                                        <label.Fecha id="FechaEstimadaInicio" size={[6, 6, 6, 6]} />
                                        <label.Fecha id="FechaEstimadaFin" size={[6, 6, 6, 6]} />
                                        <label.Entidad id="AsignadoA" size={[12, 6, 6, 6]} value={(item: any) =>
                                        { return !item ? "" : !item.Nombre ? "" : item.Nombre + " " + item.Apellidos; }} />
                                        <label.Entidad id="Prioridad" size={[12, 6, 6, 6]} />
                                    </page.OptionSection>
                                </Column>
                                <Column size={[6, 6, 6, 6]}>
                                    <page.OptionSection
                                        id="ConfiguracionAvance"
                                        icon="fal fa-flag-checkered" level={1} collapsed={false} hideCollapseButton={false}>
                                        <Row>
                                            <label.Entidad id="TipoAvance" size={[12, 6, 6, 6]} />
                                            <Label id="MaximoValor" size={[12, 6, 6, 6]} />
                                            <ProgressBarSgp colorText={"black"} backgroundBar={"#64DD17"} viewMode={true} id="TotalAvance" minValue={0} entidadMaximoValor={"MaximoValor"} size={[12, 12, 12, 12]} />
                                        </Row>
                                        <Row>
                                            <label.Entidad id="FlujoAvance" size={[12, 6, 6, 6]} />
                                            <label.Entidad id="WorkFlow" size={[12, 6, 6, 6]} />
                                            <label.Estatus id="Contemplaravance" size={[12, 2, 2, 2]} />
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </Column>
                        <Column size={[12, 12, 12, 12]}>
                            <page.OptionSection
                                id="DependenciaTarea" title="Dependencias de tarea"
                                icon="fal fa-stream" level={1} collapsed={false} hideCollapseButton={false}>
                                <SectionListView id={DEPENDENCIAS_AL_INICIO} size={[12, 6, 6, 6]}/>
                                <SectionListView id={DEPENDENCIAS_AL_FIN} size={[12, 6, 6, 6]}/>
                            </page.OptionSection>
                        </Column>
                        <ComponentesAdicionales />
                    </Row>
                </page.OptionSection>
            </page.View>;
        }
    };



    interface ICountComponent extends page.IProps {
        duration?: any;
    };
    let CountComponent: any = global.connect(class extends React.Component<ICountComponent, ICountComponent> {
        constructor(props: ICountComponent) {
            super(props);
            this.onClickMinus = this.onClickMinus.bind(this);
            this.onClickPlus = this.onClickPlus.bind(this);
            this.onChangeDuration = this.onChangeDuration.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.duration = Forms.getValue("DiasDuracion", config.id);
            return retValue;
        };

        shouldComponentUpdate(nextProps: ICountComponent, { }): boolean {
            return hasChanged(this.props.duration, nextProps.duration);
        };

        onClickMinus() {
            var valorDuracionActual = this.props.duration;
            let retValue: any = isNaN(valorDuracionActual);
            valorDuracionActual = retValue ? 0 : valorDuracionActual;
            if (valorDuracionActual > 0) {
                var dias = 1; // Número de días a quitar
                Forms.updateFormElement(config.id, "DiasDuracion", valorDuracionActual - 1);
                this.onChangeDuration();
            }
        };
        
        onClickPlus() {
            var valorDuracionActual = this.props.duration;
            let retValue: any = isNaN(valorDuracionActual);
            valorDuracionActual = retValue ? 0 : valorDuracionActual;
            var dias = 1; // Número de días a agregar
            Forms.updateFormElement(config.id, "DiasDuracion", valorDuracionActual + 1);
            this.onChangeDuration();
        };

        onChangeDuration() {
            let fechaActual: any = Forms.getValue("FechaEstimadaInicio", config.id);
            let valorFechaActual = new Date(fechaActual);
            let valorDuracionActual = Number(Forms.getValue("DiasDuracion", config.id));
            let retValue: any = isNaN(valorDuracionActual);
            valorDuracionActual = retValue ? 0 : valorDuracionActual;
            if (valorDuracionActual >= 0) {
                valorFechaActual.setDate(valorFechaActual.getDate() + valorDuracionActual);
                Forms.updateFormElement(config.id, "DiasDuracion", valorDuracionActual);
                Forms.updateFormElement(config.id, "FechaEstimadaFin", valorFechaActual);
            }
        };

        componentDidMount(): void {
        }

        render(): JSX.Element {
            return <Row>
                <Button icon="fal fa-minus-square" style={{ marginTop: "21px", marginRight: "-15px", marginLeft: "30px", color: "rgb(38, 194, 129)", padding: 0 }} className="col-xs-1 col-sm-1 col-md-1 col-lg-1" onClick={this.onClickMinus}></Button>
                <Integer id="DiasDuracion" change={this.onChangeDuration} placeHolder="0" size={[2, 2, 2, 2]} />
                <Button icon="fal fa-plus-square" style={{ marginTop: "21px", marginLeft: "-15px", color: "rgb(38, 194, 129)", padding: 0  }} className="col-xs-1 col-sm-1 col-md-1 col-lg-1" onClick={this.onClickPlus}></Button>
            </Row>;
        };
    });

};
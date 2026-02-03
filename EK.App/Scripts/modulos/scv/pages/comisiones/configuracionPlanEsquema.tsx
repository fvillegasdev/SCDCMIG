namespace EK.Modules.SCV.Pages.Comisiones {
    "use strict";
    const PAGE_ID: string = "comisionesConfiguracion";
    const PERIODOS_ESQUEMA: string = "PeriodosEsquema";
    const PERIODOS_ESQUEMA_DETALLE: string = "PeriodosEsquemaDetalle";


    interface IPlanEsquema extends page.IProps {
        items: any;
        periodoEsquemaSeleccionado: any;
        estadoEntidad: any;
    }
    export let obtenerConfiguracionPlanEsquema: (actualizarSeccion: boolean, idFase?: number) => any = (actualizarSeccion: boolean, idFase?: number): any => {
        let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
        let fase: any = Forms.getValue("Fase", PAGE_ID);
        if (idFase == null)
        {
            idFase = fase && fase.ID>0 ? fase.ID : 0;
        }
        let idEsquema: number = esquema && esquema.ID > 0 ? esquema.ID : 0;

        let parametros: any = global.encodeParameters({ idEsquema: idEsquema, idfase: idFase });
        dispatchAsync("global-page-data", "base/SCV/comisionesConfiguracion/Get/GetAllPlanEsquemaPeriodo/" + parametros, PERIODOS_ESQUEMA);

        if (actualizarSeccion)
        {
            global.dispatchSuccessful("global-page-data", [], PERIODOS_ESQUEMA_DETALLE);
        }
    };

    export let obtnerConfiguracionPorEsquemaPeriodoDetalle: (item: any) => any = (item: any): any => {
        dispatchSuccessful("load::PeriodoEsquemaSeleccionado", { data: item })
        let parametros: any = global.encodeParameters({ IdPlanEsquemaPeriodo: item.ID });
        dispatchAsync("global-page-data", "base/SCV/comisionesConfiguracion/Get/GetAllPlanEsquemaPeriodoDetalles/" + parametros, PERIODOS_ESQUEMA_DETALLE);
    };

    export let PlanPorEsquema: any = global.connect(class extends React.Component<IPlanEsquema, IPlanEsquema> {
        constructor(props: IPlanEsquema) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        componentDidMount(): any {
            global.dispatchSuccessful("global-page-data", [], PERIODOS_ESQUEMA);
            global.dispatchSuccessful("global-page-data", [], PERIODOS_ESQUEMA_DETALLE);
        }
        render(): JSX.Element {
            let modoVista: any = getData(this.props.estadoEntidad).viewMode;
            return <div>

                <Column size={[12, 12, 12, 12]} style={{marginTop: "1%" }}>
                    {(modoVista) ?
                        <PeriodoEsquemaView />
                        :
                        <PeriodoEsquemaEdit />
                    }
                </Column>

                <Column size={[12, 12, 12, 12]} style={{marginTop: "1%" }}>
                    {(modoVista) ?
                        <PeriodoEsquemaDetalleView />
                        :
                        <PeriodoEsquemaDetalleEdit />
                    }
                </Column>

            </div>
        };
    })


    export let PeriodoEsquemaView: any = global.connect(class extends React.Component<IPlanEsquema, IPlanEsquema> {
        constructor(props: IPlanEsquema) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$PeriodosEsquema;
            return retValue;
        };
        componentDidMount() {
        }
        shouldComponentUpdate(nextProps: IPlanEsquema, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {

            let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
            let esquemaNombre: string = esquema && esquema.Nombre ? esquema.Nombre : "";
            let titulo: any = "Periodos " + esquemaNombre;

            return  <page.SectionList
                    id={PERIODOS_ESQUEMA}
                    icon="fa fa-list"
                    level={1}
                    title={titulo}
                    collapsed={false}
                    parent={PAGE_ID}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    addRemoveButton={false}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Clave"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Inicio"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Fin"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Fase"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Esquema"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>&nbsp;</span></Column>
                        </Row>
                        </div>
                    }
                    formatter={(index: number, item: any) => {
                    let esquema: string = item.Esquema && item.Esquema.Nombre ? item.Esquema.Nombre : "";
                    let fase: string = item.Fase && item.Fase.Nombre ? item.Fase.Nombre : "";
                    return <Row>
                        <div onClick={(e) => obtnerConfiguracionPorEsquemaPeriodoDetalle(item)} >
                        <Column>
                            <Column size={[12, 2, 2, 2]}>
                                <span>{item.Clave}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]} style={{ alignItems:"center" }}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaInicio)}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]} style={{ alignItems: "center" }}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaFin)}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]}>
                                <span>{fase}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]}>
                                <span>{esquema}</span>
                            </Column>
                            <Column size={[12, 1, 1, 1]}>
                                <span className="badgePurple badge">{item.CantidadDetalle}</span>
                            </Column>
                        </Column>
                       </div>
                        </Row>
                    }}>
                </page.SectionList>
        };
    })

    export let PeriodoEsquemaEdit: any = global.connect(class extends React.Component<IPlanEsquema, IPlanEsquema> {
        constructor(props: IPlanEsquema) {
            super(props);
            this.guardarPeridoEsquema = this.guardarPeridoEsquema.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$PeriodosEsquema; 
            return retValue;
        };
        componentDidMount() {
        }
        guardarPeridoEsquema(): void {
            let model: EditForm = Forms.getForm(PERIODOS_ESQUEMA);
            let catalogo: DataElement = this.props.config.getCatalogo(PERIODOS_ESQUEMA);
            
            let clave: any = "";

            let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
            let idEsquema: any = esquema.ID;
            if (idEsquema == -1)
            {
                idEsquema = model.getValue("Esquema").ID
            }
            let id: number = model.getValue("ID") == undefined ? -1 : model.getValue("ID");

            let fase: any = Forms.getValue("Fase", PAGE_ID);

            if ((fase && fase.ID < 0 || esquema && esquema.ID < 0) && id < 0) {
                warning("Seleccione una fase y esquema");
                return;

            }
            let FechaInicio: any = model.getValue("FechaInicio");
            let FechaFin: any = model.getValue("FechaFin");



            let item: any = {};
            item['ID'] = id;
            item['IdEsquema'] = idEsquema;
            item['FechaInicio'] = FechaInicio;
            item['FechaFin'] = FechaFin;
            item['Version'] = model.getValue("Version");

            if (item.ID > 0) {
                item._modificado = true;
                item['IdEstatus'] = model.getValue("Estatus").ID;
                item['Clave'] = parseInt(model.getValue("Clave").Clave);
                item['IdFase'] = parseInt(model.getValue("Fase").ID);

            }
            else {
                item._nuevo = true;
                clave = catalogo.data.length > 0 ? parseInt(catalogo.data[catalogo.data.length - 1].Clave) + 1 : 1;
                item['Clave'] = clave;
                item['IdFase'] = fase.ID;
            }
                dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SavePlanEsquemaPeriodo", item, PERIODOS_ESQUEMA);
                this.props.config.setState({ viewMode: true }, PERIODOS_ESQUEMA);

        }
        shouldComponentUpdate(nextProps: IPlanEsquema, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {

            let eliminarItem: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    EK.Global.confirm("Presione Confirmar para eliminar ", "Eliminar Período", () => {
                        item._eliminado = true;
                        let data: FormData = new FormData();
                        data.append("item", JSON.stringify(item));
                        dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SavePlanEsquemaPeriodo", item, PERIODOS_ESQUEMA);

                    });
               
                }
            };
            let editarItem: any = {
                icon: "fa fa-edit",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    let periodo: number = parseInt(item.Clave);
                    Forms.updateFormElement(PERIODOS_ESQUEMA, "Clave", { ID: periodo, Clave: periodo })
                    config.setState({ viewMode: false }, id);
                }
            };
            let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
            let esquemaNombre: string = esquema && esquema.Nombre ? esquema.Nombre : "";
            let titulo: any = "Periodos " + esquemaNombre;

            return <page.SectionList
                id={PERIODOS_ESQUEMA}
                icon="fa fa-list"
                level={1}
                onSave={this.guardarPeridoEsquema}
                title={titulo}
                collapsed={false}
                parent={PAGE_ID}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Clave"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Inicio"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Fin"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Fase"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Esquema"}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header"><span>&nbsp;</span></Column>
                        </Row>
                    </div>
                }
                formatter={(index: number, item: any) => {
                    let fase: string = item.Fase && item.Fase.Nombre ? item.Fase.Nombre : "";
                    let esquema: string = item.Esquema && item.Esquema.Nombre ? item.Esquema.Nombre : "";

                    return <Row>
                        <div onClick={(e) => obtnerConfiguracionPorEsquemaPeriodoDetalle(item)}>
                        <Column>
                            <Column size={[12, 2, 2, 2]}>
                                <span>{item.Clave}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaInicio)}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaFin)}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]}>
                                <span>{fase}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]}>
                                <span>{esquema}</span>
                            </Column>
                            <Column size={[12, 1, 1, 1]}>
                                <span  className="badgePurple badge">{item.CantidadDetalle}</span>
                            </Column>

                            <Column size={[12, 1, 1, 1]} >
                                {item.CantidadDetalle > 0 ?
                                    <buttons.PopOver idParent={PAGE_ID} idForm={PERIODOS_ESQUEMA} info={item}
                                        extraData={[editarItem]} />
                                    :
                                    <buttons.PopOver idParent={PAGE_ID} idForm={PERIODOS_ESQUEMA} info={item}
                                        extraData={[editarItem, eliminarItem]} />
                                }
                          
                             </Column>

                        </Column>
                      </div>
                    </Row>
                }}>
                <Row>
                    <input.Date id={"FechaInicio"} idFormSection={PERIODOS_ESQUEMA} size={[12, 6, 6, 6]} validations={[validations.required()]} label="Fecha Inicio" />
                    <input.Date id={"FechaFin"} idFormSection={PERIODOS_ESQUEMA} size={[12, 6, 6, 6]} validations={[validations.required(), validations.greaterEqualThan("FechaInicio", "Error")]} label="Fecha Fin" />
                </Row>
            </page.SectionList>
        };
    })

    export let PeriodoEsquemaDetalleEdit: any = global.connect(class extends React.Component<IPlanEsquema, IPlanEsquema> {
        constructor(props: IPlanEsquema) {
            super(props);
            this.guardarPeridoEsquemaDetalle = this.guardarPeridoEsquemaDetalle.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$PeriodosEsquemaDetalle;
            retValue.periodoEsquemaSeleccionado = state.global.PeriodoEsquemaSeleccionado;
            return retValue;
        };
        guardarPeridoEsquemaDetalle(): void {
            let model: EditForm = Forms.getForm(PERIODOS_ESQUEMA_DETALLE);

            if (model.getValue("Porcentaje") <= 0) {
                warning("El porcentaje debe ser Mayor a 0");
                return;
            }

            if (model.getValue("Porcentaje") > 100) {
                warning("El porcentaje no debe ser Mayor a 100");
                return;
            }

            let catalogo: DataElement = this.props.config.getCatalogo(PERIODOS_ESQUEMA_DETALLE);

            let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
            let id: number = model.getValue("ID") == undefined ? -1 : model.getValue("ID");

            let idPlanEsquemaPeriodo: any = getDataID(this.props.periodoEsquemaSeleccionado);
            let clave: any = model.getValue("Clave");
            let idCategoriaAgente: any = model.getValue("CategoriaAgente").ID;
            let idTmComision: any = model.getValue("TMComision").ID;
            let porcentaje: any = model.getValue("Porcentaje");
            let descripcion: any = model.getValue("Descripcion") ? model.getValue("Descripcion") : null;
            let idFechaComision: any = model.getValue("IdFechaComision").ID;
            let version: any = model.getValue("Version");

            let idEtapa: number = model.getValue("Etapa").IdEtapa;
            if (idEtapa == undefined)
            {
                idEtapa = model.getValue("IdEtapa");
            }

            let item: any = {};

            item['ID'] = id;
            item['Clave'] = clave;
            item['IdPlanEsquemaPeriodo'] = idPlanEsquemaPeriodo;
            item['Descripcion'] = descripcion;
            item['IdCategoriaAgente'] = idCategoriaAgente;
            item['IdEtapa'] = idEtapa;
            item['IdTmComision'] = idTmComision;
            item['Porcentaje'] = porcentaje;
            item['IdFechaComision'] = idFechaComision;
            item['Version'] = version;

            if (item.ID > 0) {
                item._modificado = true;
                item['IdEstatus'] = model.getValue("Estatus").ID;

            }
            else {
                item._nuevo = true;
            }
            dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SavePlanEsquemaPeriodoDetalle", item, PERIODOS_ESQUEMA_DETALLE);
            obtenerConfiguracionPlanEsquema(false);
            this.props.config.setState({ viewMode: true }, PERIODOS_ESQUEMA_DETALLE);

        }
        componentDidMount() {
        }
        shouldComponentUpdate(nextProps: IPlanEsquema, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                   hasChanged(this.props.periodoEsquemaSeleccionado, nextProps.periodoEsquemaSeleccionado)
        };
        render(): JSX.Element {

            let eliminarItem: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    EK.Global.confirm("Presione Confirmar para eliminar ", "Eliminar Detalle", () => {
                        item._eliminado = true;
                        dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SavePlanEsquemaPeriodoDetalle", item, PERIODOS_ESQUEMA_DETALLE);
                        obtenerConfiguracionPlanEsquema(false);
                    });
                }
            };
            let editarItem: any = {
                icon: "fa fa-edit",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    config.setState({ viewMode: false }, id);
                }
            };

            let Color1: any = "#d4d4d4";
            let Color2: any = "#d4d4d4";

            let periodoEsquema: any = getData(this.props.periodoEsquemaSeleccionado);
            let periodoEsquemaClave: any = periodoEsquema.Clave && periodoEsquema.ID>0 ? periodoEsquema.Clave : "";

            let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
            let esquemaNombre: string = esquema && esquema.Nombre && esquema.ID>0 ? esquema.Nombre : "";

            let titulo: string = "Plan del Esquema " + esquemaNombre + " del Periodo " + periodoEsquemaClave;


            return <page.SectionList
                id={PERIODOS_ESQUEMA_DETALLE}
                icon="fas fa-cog"
                level={1}
                title={titulo}
                onSave={this.guardarPeridoEsquemaDetalle}
                collapsed={false}
                parent={PAGE_ID}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                listHeader={<div>
                    <Row>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Categoria</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Etapa</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Tipo de Comisión</span>
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">
                            <span>Porcentaje</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header" style={{ alignItems: "center" }}>
                            <span>Fecha Comisión</span>
                        </Column>
                    </Row>
                </div>}
                formatter={(index: number, item: any) => {
                    if (item.FechaComision.Clave === "FECHAINICIO")
                    {
                        Color1 = "#337ab7";
                        Color2 = "rgba(193, 193, 193, 0.24)";
                    }
                    else
                    {
                        Color1 = "rgba(193, 193, 193, 0.24)";
                        Color2 = "#337ab7";
                    }

                    return <Row>

                        <Column size={[3, 3, 3, 3]}>
                            <span>{item.CategoriaAgente.Nombre}</span>
                            {item.porcentajeFaltante > 0 ? <span className="badge badge-warning" style={{ marginBottom: "16px", float: "left" }}> Disponible {item.porcentajeFaltante} % </span> : false}
                        </Column>

                        <Column size={[3, 3, 3, 3]} >
                            <span>{item.Etapa.Nombre}</span>
                        </Column>

                        <Column size={[3, 3, 3, 3]}>
                            <span>{item.TMComision.Nombre}</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]}>
                            <span>{EK.UX.Labels.formatDecimal(item.Porcentaje)} %</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]}>
                            <span style={{ fontWeight: 400 }}>
                                <i className="fa fa-outdent" style={{ color: Color1 }} >&nbsp;</i>
                                <i className="fa fa-step-forward" style={{ color: Color2 }} ></i>
                            </span>
                        </Column>

                        <buttons.PopOver idParent={PAGE_ID} idForm={PERIODOS_ESQUEMA_DETALLE} info={item}
                                extraData={[editarItem, eliminarItem]} />
                    </Row>;
                }}>
                <Row>
                    <ddl.EKCategoriasDDL
                        id={"CategoriaAgente"}
                        required={true}
                        idFormSection={PERIODOS_ESQUEMA_DETALLE}
                        label={"Categoria"}
                        size={[12, 4, 4, 4]}
                        validations={[validations.required()]} />

                    <EtapasPorEsquema
                        required={true}
                        addNewItem={"SO"}
                        idFormSection={PERIODOS_ESQUEMA_DETALLE}
                        size={[12, 4, 4, 4]}
                        validations={[validations.required()]} />

                    <TMComisiones
                        required={true}
                        addNewItem={"SO"}
                        idFormSection={PERIODOS_ESQUEMA_DETALLE}
                        size={[12, 4, 4, 4]} validations={[validations.required()]} />

                    <input.Porcentaje
                        id={"Porcentaje"}
                        label={"Porcentaje"}
                        size={[12, 4, 4, 4]}
                        required={true}
                        idFormSection={PERIODOS_ESQUEMA_DETALLE}
                        validations={[validations.required()]}/>

                    <FechaConsiderarComisionesDDL
                        id={"IdFechaComision"}
                        idFormSection={PERIODOS_ESQUEMA_DETALLE}
                        label={"Fecha Comisión"}
                        size={[12, 4, 4, 4]}
                        required={true}
                        initialValue={"FECHAFIN"}
                        validations={[validations.required() ]}
                    />
                    <input.Descripcion
                        idFormSection={PERIODOS_ESQUEMA_DETALLE}  required={false}
                        label={"Descripcion"} size={[12, 4, 4, 4]} />

                </Row>
            </page.SectionList>
        };
    })


    export let PeriodoEsquemaDetalleView: any = global.connect(class extends React.Component<IPlanEsquema, IPlanEsquema> {
        constructor(props: IPlanEsquema) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$PeriodosEsquemaDetalle;
            retValue.periodoEsquemaSeleccionado = state.global.PeriodoEsquemaSeleccionado;
            return retValue;
        };
        componentDidMount() {
        }
        shouldComponentUpdate(nextProps: IPlanEsquema, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                   hasChanged(this.props.periodoEsquemaSeleccionado, nextProps.periodoEsquemaSeleccionado)
        };
        render(): JSX.Element {


            let Color1: any = "#d4d4d4";
            let Color2: any = "#d4d4d4";

            let periodoEsquema: any = getData(this.props.periodoEsquemaSeleccionado);
            let periodoEsquemaClave: any = periodoEsquema.Clave && periodoEsquema.ID>0 ? periodoEsquema.Clave : "";

            let esquema: any = Forms.getValue("EsquemaSeguimiento", PAGE_ID);
            let esquemaNombre: string = esquema && esquema.Nombre && esquema.ID>0 ? esquema.Nombre : "";

            let titulo: string = "Plan del Esquema " + esquemaNombre + " del Periodo " + periodoEsquemaClave;

            return <page.SectionList
                id={PERIODOS_ESQUEMA_DETALLE}
                icon="fas fa-cog"
                level={1}
                title={titulo}
                collapsed={false}
                parent={PAGE_ID}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                listHeader={<div>
                    <Row>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Categoria</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Etapa</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Tipo de Comisión</span>
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">
                            <span>Porcentaje</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header" style={{ alignItems: "center" }}>
                            <span>Fecha Comisión</span>
                        </Column>
                    </Row>
                </div>}
                formatter={(index: number, item: any) => {
                    if (item.FechaComision.Clave === "FECHAINICIO") {
                        Color1 = "#337ab7";
                        Color2 = "rgba(193, 193, 193, 0.24)";
                    }
                    else {
                        Color1 = "rgba(193, 193, 193, 0.24)";
                        Color2 = "#337ab7";
                    }

                    return <Row>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                            <span>{item.CategoriaAgente.Nombre}</span>
                            {item.porcentajeFaltante > 0 ? <span className="badge badge-warning" style={{ marginBottom: "16px", float: "left" }}> Disponible {item.porcentajeFaltante} % </span> : false}
                        </Column>

                        <Column size={[3, 3, 3, 3]} className="listItem-default-item" >
                            <span>{item.Etapa.Nombre}</span>
                        </Column>

                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                            <span>{item.TMComision.Nombre}</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <span>{EK.UX.Labels.formatDecimal(item.Porcentaje)} %</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <span style={{ fontWeight: 400 }}>
                                <i className="fa fa-outdent" style={{ color: Color1 }} >&nbsp;</i>
                                <i className="fa fa-step-forward" style={{ color: Color2 }} ></i>
                            </span>
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <input.Date id={"FechaInicio"} idFormSection={PERIODOS_ESQUEMA} size={[12, 6, 6, 6]} validations={[validations.required()]} label="Fecha Inicio" />
                    <input.Date id={"FechaFin"} idFormSection={PERIODOS_ESQUEMA} size={[12, 6, 6, 6]} validations={[validations.required(), validations.greaterEqualThan("FechaInicio", "Error")]} label="Fecha Fin" />
                </Row>
            </page.SectionList>
        };
    })


    export let TMComisiones: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TMComisiones
        });
        static defaultProps: IDropDrownListProps = {
            id: "TMComision",
            items: createDefaultStoreObject([]),
            label: "Tipo de Comisión",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id || item.id<1) {
                    return $(item.text);
                }
                else {
                    let colorNaturaleza: string = item.TipoMovimiento_OC.Naturaleza.Clave == "CAR" ? "danger" : "success";

                    return $([
                        " <span class='badge badge-" + colorNaturaleza + " bold' style='font-size: 90%;margin-right:2%'>",
                        item.TipoMovimiento_OC.Naturaleza.Nombre,
                        "</span>",
                        "<span>",
                        item.Nombre,
                        "</span>"
                      
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Clave || item.id < 1) {

                    if (item.id == -1)
                    {
                        return $([
                            " <span style='font-size: 90%'>",
                            item.text,
                            "</span> "
                        ].join(""));
                    }
                       
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.ID,
                        "</span>",
                        " <span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                let colorNaturaleza: string = item.TipoMovimiento_OC.Naturaleza.Clave == "CAR" ? "danger" : "success";

                return $([
                    " <span class='badge badge-" + colorNaturaleza+" bold' style='font-size: 90%;margin-right:2%'>",
                    item.TipoMovimiento_OC.Naturaleza.Nombre,
                    "</span>",
                    "<span>",
                    item.Nombre,
                    "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TMComisiones", { claveNaturaleza:'CAR', cancelable:0, activos:1});
                dispatchAsync("load::TMComisiones", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    interface IEtapaEsquema extends IDropDrownListProps {
        esquema?: number;
    }
    export let EtapasPorEsquema: any = global.connect(class extends React.Component<IEtapaEsquema, {}> {
        constructor(props: IEtapaEsquema) {
            super(props);
            this.cargarElementos = this.cargarElementos.bind(this);
        }
        static props: any = (state: any) => ({
            items: state.global.ETAPASESQUEMA,
            esquema: Forms.getValue("EsquemaSeguimiento", PAGE_ID)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Etapa",
            items: createDefaultStoreObject([]),
            label: "Etapa",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        cargarElementos(idEsquema: number): void {
            let encodedFilters: string = global.encodeObject({ idEsquema: idEsquema });
            dispatchAsync("load::ETAPASESQUEMA", "esquemas/etapasxesquema/all/" + encodedFilters); 
        }
        componentDidMount(): void {
            let esquema: any = this.props.esquema;
            if (esquema && esquema.ID > 0) {
                this.cargarElementos(esquema.ID);
            };
        };
        componentWillReceiveProps(nextProps: IEtapaEsquema, nextState: IEtapaEsquema): any {
            let esquema: any = nextProps.esquema;
            if (global.hasChanged(this.props.esquema, nextProps.esquema) && esquema && esquema.ID > 0) {
                this.cargarElementos(esquema.ID);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
}
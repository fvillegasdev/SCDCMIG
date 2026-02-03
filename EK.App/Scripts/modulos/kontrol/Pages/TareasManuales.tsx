namespace EK.Modules.Kontrol.Pages.TareasManuales {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tareasManuales", "kontrol");
    const w: any = window;

    interface IEstatus extends React.Props<any> {
        elementos?: any;
        agregarElementoTodos?: boolean;
        onClick?: () => void;
        estatusSeleccionado?: any;
        estatusSeleccionadoManual?: any;
    };
    interface ITipoVista extends React.Props<any> {
        tipoVista?: any;
        tipoVistaDefinido?: any;
    };
    interface ISeleccionTipoVista extends React.Props<any> {
        tipoVista?: any;
        tipoVistaDefinido?: any;
        marginTop?: string;
    };
    interface IDatePicker extends React.Props<any> {
        tipo?: string;
        idFormSection?: string;
    };
    interface ITareasManualesPrincipal extends page.IProps {
        config?: any;
        id?: any;
        item?: any;
        items?: any;
    };
    interface ITareasManuales extends page.IProps {
        config?: any;
        item?: any;
        vistaInicial?: string;
    };
    interface ICompleteButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        id?: any;
        tipoVista?: any;
        config?: page.IPageConfig;
    }
    interface ICalendario extends page.Base {
        data?: any;
    };
    w.mostrarDetalleTarea = (id) => {
        var entidades = getData(EK.Store.getState().global.currentCatalogo);
        var entidad = null;
        for (var i = 0; i < entidades.length; i++) {
            if (entidades[i].ID == id) {
                entidad = entidades[i];
                break
            }
        }
        let detalleDuplicada: string = "<p><i class='fa fa-user' style='color:blue'></i> Propietario: " + entidad.Asignado.Nombre + "</p>";
        let link: any = $("#" + id);
        link.popover({
            trigger: "focus",
            html: true,
            content: detalleDuplicada,
            title: "Detalle",
            container: 'body',
            placement: "right"
        }).on("mouseenter", function () {
            link.popover("show");
        }).on("mouseleave", function () {
            link.popover("hide");
        }).on("show.bs.popover", function () {
            $(this).data("bs.popover").tip().css("max-width", "800px");
        });
    };

    export let   onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
        switch (type)
        {
            case "ConteoEstatus":
                let filtros: string = global.encodeObject({ operacion: 'TareasUsuarioConteo' });
                dispatchAsync("load::ESTATUSTAREASMANUALES", "base/kontrol/tareasManuales/Get/GetAll/" + filtros);
                break;
            case "Calendario":
                global.dispatchAsyncPost("global-page-data", "base/kontrol/tareasManuales/GetBP/ObtenerTareasManuales/", { parametros: f }, "Calendario");
                break;
            case "SectionList":
                let filtro: string = global.encodeObject({ estatusClave: 'EC' });
                dispatchAsync("global-page-data", "base/kontrol/tareasManuales/Get/GetAll/" + filtro, "TareasManualesLista");
                dispatchSuccessful("global-page-data", { valor: 'EC' }, "TareasManualesLista$EstatusSeleccionado")

                break;
            case "Catalogo":
                if (f != null)
                {
                    global.dispatchAsyncPost("global-current-catalogo", "base/kontrol/tareasManuales/GetBP/GetAll", { parametros: f });
                    global.dispatchAsyncPost("global-page-data", "base/kontrol/tareasManuales/GetBP/ObtenerTareasManuales/", { parametros: f }, "Calendario");
                }
                break;
        }
        
    };

    export let Vista: any = global.connect(class extends React.Component<ITareasManualesPrincipal, ITareasManualesPrincipal> {
        constructor(props: ITareasManualesPrincipal) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.id = config.id;
            retValue.item = state.global.currentEntity;
            retValue.config = page.props(state);
            return retValue;
        };
        onFilter(props: page.IProps, filters: any): any {
            let propiedades: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(propiedades, null, "Catalogo");
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} >
                <PageButtons>
                    <CompleteButton/>
                </PageButtons>
                
                <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                    <div className="portlet-body">
                        <Row className="panel panel-main panel-sub10 " style={{ paddingBottom: "0px" }} >
                            <EstatusTareasManualesHorizontal />
                        </Row>
                    </div>
                </div>
              
                <page.Filters>
                    <select.Usuarios id="Asignado" label="Asignado A" size={[12, 6, 3, 3]} />
                    <TipoCitasDDL id="Tipo" size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <ddl.PrioridadTarea size={[12, 6, 3, 3]} addNewItem={"SO"} />
                    <ddl.EstatusTarea size={[12, 6, 3, 3]} addNewItem={"SO"} />
                    <DatePickerComponente tipo={"Inicio"} idFormSection={config.id +"$filters"} />
                    <DatePickerComponente tipo={"Fin"} idFormSection={config.id + "$filters"} />
                    <SeleccionTipoVista tipoVistaDefinido={"Lista"} marginTop={"6%"}/>
                </page.Filters>

                <TipoVistaTareas tipoVistaDefinido={"Lista"} />
            </page.Main>;
        };
    });

    export let TareasSectionList: any = global.connect(class extends React.Component<ITareasManualesPrincipal, ITareasManualesPrincipal> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$TareasManualesLista;
            return retValue;
        };
        componentDidMount() {
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "SectionList");

        }
        shouldComponentUpdate(nextProps: ITareasManualesPrincipal, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.items, []).length].join("")}</span>;
            let detalleTarea: any = (item: any) => {
                global.goModal("modalMessage", "#/kontrol/tareas/" + item.ID);
            };
            let finalizarTarea: any = (data: any) => {
                let ml: any = $ml["tareasManuales"];
                EK.Global.confirm("", ml.sections.CompletarTarea.title, () => {
                    let parametros: any = global.encodeParameters({ ID: data.ID });
                    global.asyncGet("base/kontrol/tareasManuales/Get/FinalizarTarea/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                        if (status === AsyncActionTypeEnum.successful) {
                            let props: any = global.assign(this.props, { onFilter: onPageFilter });
                            page.applyFilter(props, null, "SectionList");
                            page.applyFilter(props, null, "ConteoEstatus");
                        }
                    });

                });
            }
            
            return <Column size={[12, 6, 6, 6]}>
                <div>
                <OptionSection
                   id={"TareasManualesListas"}
                   icon="fa fa-calendar"
                   level={1}
                   title={"To Do"}
                    subTitle={subTitleSeccion}
                    collapsed={true}>
                        <SectionView>
                            <EstatusTareasManualesHorizontal agregarElementoTodos={false} />
                            <div>
                                <PanelUpdate info={this.props.items}>
                                    <List
                                        items={getData(this.props.items)}
                                        readonly={true}
                                        addRemoveButton={false}
                                        dragAndDrop={false}
                                        listHeader={
                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Tarea"}</Column>
                                                </Row>
                                            </div>} 
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[10, 10, 10, 10]} className="listItem-default-item" style={{ whiteSpace: "normal" }}>
                                                    <span className="badge badge-success" style={{ marginLeft: "1%" }}>{item.Prioridad.Nombre}</span>
                                                    <span onClick={(e) => detalleTarea(item)}> {item.Nombre}</span>

                                                    <modal.Modal id="modalMessage" title="Hola Mundo" url={"about:blank"}></modal.Modal>
                                                </Column>
                                                <Column size={[2, 2, 2, 2]}>
                                                    <a className='btn btn-circle green-jungle btn-xs' onClick={(e) => finalizarTarea(item)}><i className='fa fa-check'></i></a>
                                                </Column>
                                            </Row>;
                                        }} />
                                </PanelUpdate>
                            </div>
                    </SectionView>
                    <SectionEdit>
                    </SectionEdit>
                </OptionSection>
                </div>
            </Column>
        };
    })

    let DatePickerComponente: any = global.connect(class extends React.Component<IDatePicker, {}>{
        constructor(props: IDatePicker) {
            super(props);
        }
        static props: any = (state: any): any => ({
        });
        render(): JSX.Element {
            let fechaDesde: string = this.props.tipo == "Inicio" ? "Fecha Inicio Desde" : "Fecha Fin Desde";
            let fechaHasta: string = this.props.tipo == "Inicio" ? "Fecha Inicio Hasta " : "Fecha Fin Hasta";

            let idfechaDesde: string = this.props.tipo == "Inicio" ? "fechaInicioDesde" : "fechaFinDesde";
            let idfechaHasta: string = this.props.tipo == "Inicio" ? "fechaInicioHasta" : "fechaFinHasta";
            return <div>

                <input.Date id={idfechaDesde} idFormSection={this.props.idFormSection} label={fechaDesde} type="date" size={[12, 2, 2, 2]} validations={[
                    validations.lessEqualThan(idfechaHasta, "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")]} />

                <input.Date id={idfechaHasta} idFormSection={this.props.idFormSection} label={fechaHasta} type="date" size={[12, 2, 2, 2]}
                    validations={[
                        validations.greaterEqualThan(idfechaDesde, "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")]} />

            </div>
        }
    });

    export let SeleccionTipoVista: any = global.connect(class extends React.Component<ISeleccionTipoVista, {}>{
        constructor(props: ISeleccionTipoVista) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.tipoVista = Forms.getValue("TipoVista", config.id, state);
            return retValue;
        };
        componentDidMount(): any {
            Forms.updateFormElement("tareasManuales", "TipoVista", this.props.tipoVistaDefinido)
        };
        shouldComponentUpdate(nextProps: ISeleccionTipoVista, nextState: any): boolean {
            return hasChanged(this.props.tipoVista, nextProps.tipoVista) ||
                hasChanged(this.props.tipoVistaDefinido, nextProps.tipoVistaDefinido)
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let lista: string = ml.sections.TipoLista.Lista;
            let calendario: string = ml.sections.TipoLista.Calendario;

            return <div style={{ marginTop: this.props.marginTop }}>
                <EK.UX.RadioButton$Form
                    id={lista}
                    idForm={config.id}
                    label={lista}
                    value={lista}
                    groupName={"TipoVista"}
                    size={[12, 1, 1, 1]} />
                <EK.UX.RadioButton$Form
                    id={calendario}
                    idForm={config.id}
                    label={calendario}
                    value={calendario}
                    groupName={"TipoVista"}
                    size={[12, 1, 1, 1]} />
      </div>
        }
    });

    export let TipoVistaTareas: any = global.connect(class extends React.Component<ITipoVista, {}>{
        constructor(props: ITipoVista) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.tipoVista = Forms.getValue("TipoVista", config.id, state);
            return retValue;
        };
        componentDidMount(): void {
            //Inicializando el valor del estatus en la seccion de filtros
            let p: any = global.encodeParameters({ clave: 'EC', clavecatalogo: 'ESTADOTAREA' });
            global.asyncGet("base/kontrol/CatalogosGeneralesValores/Get/GetAll/" + p, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {
                    Forms.updateFormElement(config.id + "$filters", "Estatus", { ID: data[0].ID, Nombre: 'En Curso', Clave: "EC" });
                    let props: any = global.assign(this.props, { onFilter: onPageFilter });
                    page.applyFilter(props, null, "Catalogo");
                }
            });

        }
        componentWillReceiveProps(nextProps: ITipoVista, nextState: ITipoVista): any {
            if (global.hasChanged(this.props.tipoVista, nextProps.tipoVista)) {
            };
        };
        shouldComponentUpdate(nextProps: ITipoVista, nextState: any): boolean {
            return hasChanged(this.props.tipoVista, nextProps.tipoVista) ||
                   hasChanged(this.props.tipoVistaDefinido, nextProps.tipoVistaDefinido)
        };
        render(): JSX.Element {
            let tipoVista: string = this.props.tipoVista;
            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<span id= '" + row.ID + "'ref='link'  role='button' data-trigger='focus' data-toggle='popover' onMouseEnter='mostrarDetalleTarea(" + row.ID + ")' class='popovers' > " + data + "</span> ";
            };
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Nombre", width: 30, render: formatNombre })
                .add({ data: "Tipo.Nombre", width: 20 })
                .addDate({ data: "FechaInicio", width: 15 })
                .addDate({ data: "FechaFin", width: 15 })
                .add({ data: "Prioridad.Nombre", width: 10 })
                .add({ data: "Estatus.Nombre", width: 10 })
                .toArray();
            return <div>
            {(tipoVista === "Calendario") ?
                <Column size={[12, 12, 12, 12,]}>
                        <page.OptionSection
                            id="Info"
                            icon="fa fa-calendar"
                            hideCollapseButton={true}
                            collapsed={false}>
                        <Row>
                            <Column>
                                   <UseCalendar />
                            </Column>
                        </Row>
                    </page.OptionSection>
                    </Column> : tipoVista == "Lista" ?
                        <dt.PageTable columns={columns} />
                        : null
            }</div>
        }
    });


    let EstatusTareasManualesHorizontal: any = global.connect(class extends React.Component<IEstatus, {}>{
        constructor(props: IEstatus) {
            super(props);
            this.onClick = this.onClick.bind(this);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.elementos = state.global.ESTATUSTAREASMANUALES;
            retValue.estatusSeleccionado = Forms.getValue("Estatus", config.id + "$filters", state);
            retValue.estatusSeleccionadoManual = state.global.catalogo$TareasManualesLista$EstatusSeleccionado;
            return retValue;
        };
        static defaultProps: IEstatus = {
            agregarElementoTodos: true,
        };
        onClick(valor: any): void {
            if (this.props.agregarElementoTodos) {
                Forms.updateFormElement(config.id + "$filters", "Estatus", { ID: valor.ID, Nombre: valor.Nombre, Clave: valor.Clave });
                let props: any = global.assign(this.props, { onFilter: onPageFilter });
                page.applyFilter(props, null, "ConteoEstatus");
                page.applyFilter(props, null, "Catalogo");
            }
            else
            {
                let filtros: string = global.encodeObject({ idEstatus: valor.ID });
                dispatchAsync("global-page-data", "base/kontrol/tareasManuales/Get/GetAll/" + filtros, "TareasManualesLista");
                dispatchSuccessful("global-page-data", { valor: valor.Clave }, "TareasManualesLista$EstatusSeleccionado")
            }
        };
        componentDidMount()
        {
            let props: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(props, null, "ConteoEstatus");
        }
        shouldComponentUpdate(nextProps: IEstatus, nextState: IEstatus): boolean {
            return hasChanged(this.props.elementos, nextProps.elementos) ||
                   hasChanged(this.props.estatusSeleccionadoManual, nextProps.estatusSeleccionadoManual) ||
                   hasChanged(this.props.estatusSeleccionado, nextProps.estatusSeleccionado);
        };
        render(): JSX.Element {
            let iconos: any[] = [];
            iconos['CO'] = "fa fa-check";
            iconos['EC'] = "glyphicon glyphicon-play";
            iconos['RE'] = "fa fa-times-circle";
            iconos['NC'] = "fas fa-exclamation-triangle";
            iconos['SU'] = "glyphicon glyphicon-pause";
            iconos['CA'] = "fa fa-times-circle";
            iconos['TODOS'] = "fas fa-bars ";

            let iconosColor: any[] = [];
            iconosColor['TODOS'] = "";
            iconosColor['CO'] = "rgb(139, 199, 128)";
            iconosColor['EC'] = "rgb(139, 199, 128)";
            iconosColor['RE'] = "#df0707";
            iconosColor['NC'] = "#ff8f00";
            iconosColor['SU'] = "#337ab7";
            iconosColor['CA'] = "#df0707";

            let itemsModificados: DataElement = this.props.elementos;

            if (itemsModificados && itemsModificados.data.length) {
                if (this.props.agregarElementoTodos === false)
                {
                    itemsModificados.data.forEach((value: any, index: number): any => {
                        if (value.Clave === "TODOS" || value.Clave == "CO")
                        {
                            itemsModificados.data.splice(index, 1);
                        }
                    });
                }
                //Verificar si se va a agregar el elemento nuevo
                if (this.props.agregarElementoTodos && itemsModificados.data[0].Clave != 'TODOS') {
                    let totalElementos: number = 0;
                    itemsModificados.data.forEach((value: any, index: number): any => {
                        let cantidad: number = parseInt(value.CantidadTareas);
                        totalElementos = totalElementos + cantidad;
                    });
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -1;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    nuevoItem['CantidadTareas'] = totalElementos;
                    itemsModificados.data.unshift(nuevoItem);
                }
            }
            //Construyendo elementos a renderizar
            let items: any = getData(itemsModificados);
            let elementos: any = getData(itemsModificados);
            let estatusSeleccionado: string = this.props.estatusSeleccionado && this.props.estatusSeleccionado.Clave ? this.props.estatusSeleccionado.Clave : null;
            let estatusSeleccionadoSectionList: string = getData(this.props.estatusSeleccionadoManual) && getData(this.props.estatusSeleccionadoManual).valor ? getData(this.props.estatusSeleccionadoManual).valor: null;

            let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                let retValue: any = (itemsModificados && itemsModificados.data.length && itemsModificados.data.length > 0) ?
                    items.map((item: any, i: number): any => {
                        let estatusSeleccion: boolean = this.props.agregarElementoTodos == false && item.Clave == estatusSeleccionadoSectionList ? true : this.props.agregarElementoTodos && item.Clave == estatusSeleccionado ? true : false;
                        let estiloPersonalizado: React.CSSProperties = {
                            border: estatusSeleccion == true ? "solid 2px #90CAF9" : "",
                            backgroundColor: estatusSeleccion == true ? "#dff4f5" : "",
                            cursor:"pointer"
                        };
                        let clases: string = "dd-item dd3-item  dd3-content-ek";
                        return <li key={item.Clave} className="dd-item dd3-item" onClick={(e) => this.onClick(item)} style={estiloPersonalizado}>
                                <div className="" style={{ paddingLeft: "1px", height: "auto" }}>
                                <div>
                                    <a className={"btn"}>
                                        <span className="badge badge-success pull-right ek-sombra" style={{height: "auto" }}>{item.CantidadTareas}</span>
                                        <i className={iconos[item.Clave]} style={{ color: iconosColor[item.Clave] }}></i>
                                            {item.Nombre}
                                   </a>
                                    </div>
                                </div>
                            </li>
                    })
                    : null
                return retValue;
            };
            items = fnCreateList(items);
            return <div key={1} className="dd" ref="list">
                {itemsModificados && itemsModificados.data.length && itemsModificados.data.length > 0 ?
                    <ol className="nav navbar-nav">
                        {items}
                    </ol>
                    :
                    <AwesomeSpinner paddingTop={50} size={40} icon={"fa fa-refresh"} colorClass={"font-blue"} />
                }
            </div>

        }
    });

    let CompleteButton: any = global.connect(class extends React.Component<ICompleteButton, {}> {
        constructor(props: ICompleteButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            id: config.id,
            tipoVista: Forms.getValue("TipoVista", config.id, state),
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: ICompleteButton = {
            icon: "fa fa-check",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let item: any = getData(this.props.item);

            EK.Global.confirm("",$ml.sections.CompletarTarea.title, () => {
                let parametros: any = global.encodeParameters({ ID: item.ID});
                global.asyncGet("base/kontrol/tareasManuales/Get/FinalizarTarea/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        let props: any = global.assign(this.props, { onFilter: onPageFilter });
                        debugger
                        page.applyFilter(props, null, "Catalogo");
                        page.applyFilter(props, null, "ConteoEstatus");
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                       
                    }
                });

            });
        }
        shouldComponentUpdate(nextProps: ICompleteButton, nextState: ICompleteButton): boolean {
            return hasChanged(this.props.item, nextProps.item)
        };
        render(): JSX.Element {
            let idEntidad: any = global.getDataID(this.props.item);
            let entidad: any = global.getData(this.props.item);
            if (idEntidad > 0 && entidad && entidad.Estatus && entidad.Estatus.Clave != "CO") {
                return <Button {...this.props} onClick={this.onClick} style={{ color: "green" }}/>;
            }
            else {
                return null;
            }
        }
    });

    export const UseCalendar: any = global.connect(class extends React.Component<ICalendario, ICalendario>{
        static props: any = (state: any) => ({
            data: state.global.catalogo$Calendario
        });
        onEventDataTransform(item: any): any {
            return {
                id: item.UID,
                url: item.Link,
                title: item.Summary,
                allDay: item.AllDay === true,
                start: item.DTStart,
                end: item.DTEnd,
                desc: item.Description,
                location: item.Location,
                textColor: item.TextColor ? item.TextColor : undefined,
                backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
            };
        };
        onEventClick(calEvent: any, jsEvent: any, view: any): any {
            go(calEvent.url);
        };
        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        render(): JSX.Element {
            let data: DataElement;

            if (this.props.data != undefined) {
                if (isSuccessful(this.props.data)) {
                    data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
                    data.timestamp = this.props.data.timestamp;
                    data.status = this.props.data.status;
                }
                else {
                    data = this.props.data;
                    data.data = global.getData(this.props.data);
                };

                return <calendar.Calendar data={data}
                    onEventClick={this.onEventClick}
                    onEventDataTransform={this.onEventDataTransform}></calendar.Calendar>;
            }
            else
            {
                return null;
            }

           
        };
    });
};

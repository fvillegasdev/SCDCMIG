namespace EK.Modules.Kontrol.Pages.FlujoTrabajoInstancia {
    "use strict";
    const TAREASINSTANCIA: string = "TAREASINSTANCIA";
    const DETALLETAREA: string = "DETALLETAREA";
    const AUTORIZADORESTAREA: string = "AUTORIZADORESTAREA";
    let PAGE_ID = "Flujo de autorizacion";
    const config: page.IPageConfig = global.createPageConfig("flujoTrabajoInstancia", "kontrol", [TAREASINSTANCIA, DETALLETAREA, AUTORIZADORESTAREA]);


    let Colores: any = {};
    Colores["AP"] = "#26C281";
    Colores["RE"] = "#EF4836";
    Colores["CA"] = "#EF4836";
    Colores["NA"] = "#ffc107";
    Colores["NOE"] = " #95A5A6 ";


    export class Edicion extends page.Base
    {
        onEntityLoaded(props: page.IProps): any {
            let parametros: any = global.assign({ IdInstancia: getDataID(props.entidad) });
            props.config.dispatchCatalogoBase("base/kontrol/taskinstance/Get/obtenerTareasInstancia/", parametros, TAREASINSTANCIA);
            global.dispatchSuccessful("global-page-data", [], DETALLETAREA);
            global.dispatchSuccessful("global-page-data", [], AUTORIZADORESTAREA);
            dispatchSuccessful("load::FlujoTrabajoInstancia", { valor: getData(props.entidad) });
            dispatchSuccessful("load::TareaInstanciaActiva", { valor: null });
            dispatchSuccessful("load::collapsedDetalleTarea", { valor: true });
        };
        render(): JSX.Element {

            return <page.Main {...config} pageMode={PageMode.Edicion} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    interface IPageEditProps extends page.IProps {
        entidad?: any;
        itemsTareaInstanciaActiva?: any;
        collapsedDetalleTarea?: boolean;
        hover?: any;
        elementoHover?: string;
    };
    export const Edit: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.FlujoTrabajoInstancia,
            itemsTareaInstanciaActiva: state.global.TareaInstanciaActiva,
            collapsedDetalleTarea: state.global.collapsedDetalleTarea,
            hover: state.global.hoverElemento,
        });
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-stack-overflow" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Label  size={[6, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });


    export const View: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.FlujoTrabajoInstancia,
            itemsTareaInstanciaActiva: state.global.TareaInstanciaActiva,
            collapsedDetalleTarea: state.global.collapsedDetalleTarea,
            hover: state.global.hoverElemento,
            elementoHover: state.global.elementoHover,
        });
        onClick(item: any, e: any): any {
            dispatchSuccessful("load::TareaInstanciaActiva", { valor: item });
            dispatchSuccessful("load::collapsedDetalleTarea", { valor: false });

            let encodedFilters: string = global.encodeObject({ idInstancia: item.ID });
            global.dispatchAsync("global-page-data", "base/kontrol/taskinstance/Get/GetUsersByTaskInstance/" + encodedFilters, AUTORIZADORESTAREA);
        }
        onMouseEnter(elemento: any, e: any)
        {
            dispatchSuccessful("load::hoverElemento", { valor: true });
            dispatchSuccessful("load::elementoHover", { valor: elemento});
        } 
        onMouseLeave(elemento: any, e: any) {
            dispatchSuccessful("load::hoverElemento", { valor: false });
            dispatchSuccessful("load::elementoHover", { valor: elemento });
        }
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad).valor;
            let codigo: string = entidad ? entidad.ID : "";
            let flujo: string = entidad ? entidad.Workflow ? entidad.Workflow.Clave: "" : "";
            let flujoCompleto: string = entidad ? entidad.Workflow ? "("+entidad.Workflow.Clave + ") " + entidad.Workflow.Nombre : "" : "";
            let tipoFlujo: string = entidad ? entidad.Workflow ? "("+entidad.Workflow.Tipo.Clave + ") " + entidad.Workflow.Tipo.Nombre : "" : "";
            let fechaInicio: string = entidad ? entidad.FechaInicio : "";
            let fechaFin: string = entidad ? entidad.FechaFin : "";
            let estatus: string = entidad ? entidad.Estatus : "";
            let propietario: string = entidad ? entidad.UserOwner ? entidad.UserOwner.Nombre + " " + entidad.UserOwner.Apellidos : "" : "";

            let estatusClave: string = entidad ? entidad.Estatus ? entidad.Estatus.Clave : "" : "";
            let estatusNombre: string = entidad ? entidad.Estatus ? entidad.Estatus.Nombre : "" : "";

            let colorSpan: string;
            if (estatusClave === "AP") {
                colorSpan = "badge bg-green-jungle bg-font-green-jungle";
            }
            else if (estatusClave === "EP") {
                colorSpan = "badge bg-blue bg-font-blue";
            }
            else if (estatusClave === "RE" || estatusClave === "CA") {
                colorSpan = "badge bg-red-flamingo bg-font-red-flamingo";
             }
            else if (estatusClave === "SI" || estatusClave === "SU") {
                colorSpan = "badge bg-blue bg-font-blue";
            }
            //Tarea Activa
            let tareaActiva: any = getData(this.props.itemsTareaInstanciaActiva).valor;
            let tareaClave: string = tareaActiva ? tareaActiva.Clave ? tareaActiva.Clave : "" : "";
            let tareaNombre: string = tareaActiva ? tareaActiva.Nombre ? tareaActiva.Nombre : "" : "";
            let tareaComentarios: string = tareaActiva ? tareaActiva.Comentarios ? tareaActiva.Comentarios : "" : "";


            let tareaCompletadaPor: string = tareaActiva ? tareaActiva.CompletadoPor ? tareaActiva.CompletadoPor.Nombre ? tareaActiva.CompletadoPor.Apellidos ?
                tareaActiva.CompletadoPor.Nombre + " " + tareaActiva.CompletadoPor.Apellidos : tareaActiva.CompletadoPor.Nombre : "" : "":"";

            let tareaEstatus: any = tareaActiva ? tareaActiva.Estatus ? tareaActiva.Estatus : null : null;
            let tareaFechaAprobacion: string = tareaActiva ? tareaActiva.FechaAprobacion ? tareaActiva.FechaAprobacion : "" : "";
            let tareaFechaAsignacion: string = tareaActiva ? tareaActiva.FechaAsignacion ? tareaActiva.FechaAsignacion : "": "";
            let tareaFechaVigencia: string = tareaActiva ? tareaActiva.FechaVigencia ? tareaActiva.FechaVigencia : "" : "";
            let tareaDiasVigencia: string = tareaActiva ? tareaActiva.DiasVigencia ? tareaActiva.DiasVigencia : "" : "";
            let tareaExpresion: string = tareaActiva && tareaActiva.Expresion ? tareaActiva.Expresion : "";
            let tareaExpresionMensaje: string = tareaActiva && tareaActiva.ExpresionMensaje ? tareaActiva.ExpresionMensaje : "";

            ///Tareas Collapse
            let tareaCollapse: any = getData(this.props.collapsedDetalleTarea).valor;

            let tareaArregloEstatus: any = {};
            if (tareaEstatus != undefined)
            {
                tareaArregloEstatus[0] = tareaEstatus.Nombre;
                tareaArregloEstatus[1] = undefined;
                tareaArregloEstatus[2] = tareaEstatus.Clave;
            }
            //Color Hover
            let hoverDivs: any = getData(this.props.hover).valor;
            let elementoHoverDivs: any = getData(this.props.elementoHover).valor;

            let colorHover: string = hoverDivs ? elementoHoverDivs == "PROP"?"#F0F0F0" : "#ffffff":"";
            let colorHover2: string = hoverDivs ? elementoHoverDivs == "FI" ? "#F0F0F0" : "#ffffff" : "";
            let colorHover3: string = hoverDivs ? elementoHoverDivs == "FF" ? "#F0F0F0" : "#ffffff" : "";
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={tipoFlujo.toUpperCase() + " , " + flujoCompleto.toUpperCase()}
                        icon="fa fa-exchange" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 5, 5, 5]} style={{ paddingTop: 12, paddingRight: "0px" }}>
                                <div className="dashboard-stat2 bordered  ek-transform-selected" style={{ margin: "0px", padding: "5px 10px 10px", border: "2px solid #F0F0F0" }}>

                                        <div className="display" style={{ marginBottom: "0px" }}>
                                            <div className="number">
                                                <h3 className="font-success-sharp">
                                                    <small className="font-green-sharp uppercase">{flujo}</small>&nbsp;
                                                <span className={colorSpan}>{estatusNombre}</span>
                                                </h3>
                                            </div>

                                            <div className="icon" style={{ fontSize: "22px" }}>
                                                <i className="fa fa-exchange"></i>
                                            </div>
                                        </div>

                                        <div className="table-scrollable table-custom">

                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" onMouseEnter={(e) => this.onMouseEnter("PROP", e)} onMouseLeave={(e) => this.onMouseLeave("PROP", e)}
                                            style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 3, backgroundColor: colorHover }} >
                                                <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                                                    <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Propietario: </small>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                    <span className="badge badge-success ek-sombra">{propietario}</span>
                                                </div>
                                            </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" onMouseEnter={(e) => this.onMouseEnter("FI", e)} onMouseLeave={(e) => this.onMouseLeave("FI", e)} style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 3, backgroundColor: colorHover2 }}>
                                                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                                    <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Fecha Inicio: </small>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                    <span className="badge badge-success ek-sombra">{EK.UX.Labels.formatDate(fechaInicio)}</span>
                                                </div>
                                            </div>

                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" onMouseEnter={(e) => this.onMouseEnter("FF", e)} onMouseLeave={(e) => this.onMouseLeave("FF", e)} style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 3, backgroundColor: colorHover3 }}>
                                                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                                    <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Fecha Fin: </small>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                    <span className="badge badge-success ek-sombra">{EK.UX.Labels.formatDate(fechaFin)}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                            </Column>

                            <Column size={[12, 7, 7, 7]}>
                                <label.Label id="EstadoWF" size={[12, 6, 6, 6]} />
                                <label.Label id="IdReferencia" size={[12, 6, 6, 6]} />
                            </Column>

                            <Column size={[12, 12, 12, 12]}>
                                <page.SectionList
                                    id={TAREASINSTANCIA}
                                    parent={config.id}
                                    icon="fa fa-tasks"
                                    style={{ paddingTop: 20,marginLeft:-15 }}
                                    level={1}
                                    size={[12, 4, 4, 4]}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                       

                                        return <Row id={"row_detalleTarea_" + item.ID} className="panel-collapsed" >
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                <CollapseButton style={{ marginTop: 10 }} idElement={"row_detalleTarea_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down"  collapsed={true} iconOnly={true} />
                                            </Column>
                                            <Column size={[10, 11, 11, 11]}>
                                                <a className={"list-toggle-container"}
                                                    aria-expanded="false"
                                                    data-toggle="collapse" 
                                                    onClick={(e) => this.onClick(item, e)} >
                                                    <span className={"badge badge-default pull-left ek-sombra tarea-list"} style={{ backgroundColor: Colores[item.Estatus.Clave] }}>{item.Orden}</span>
                                                    <div className="list-toggle done uppercase"
                                                        style={{ fontWeight: "normal", backgroundColor: "#ffffff", color: "#909090", borderColor: "#c22639", paddingLeft: "70px", marginTop: "20px" }} >
                                                        {item.Nombre}
                                                        {item.Estatus.Clave == "AP" ? <span style={{ color: "#26C281", marginRight: "50px", fontSize: "18px", float: "right" }} className="fa fa-check"></span>
                                                            : null}
                                                    </div>
                                                </a>
                                            </Column>

                                            <Row>
                                                <Column
                                                    xs={{ size: 10 }}
                                                    sm={{ size: 10, offset: 1 }}
                                                    md={{ size: 10, offset: 1 }}
                                                    lg={{ size: 10, offset: 1 }}
                                                    className="panel-detail well well-sm">
                                                    <List
                                                        id={this.props.id + "_list"}
                                                        items={global.createSuccessfulStoreObject(item.Autorizadores)}
                                                        readonly={true}
                                                        listHeader={
                                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                                <Row>
                                                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Configuración de Autorizadores"}</Column>
                                                                </Row>
                                                            </div>}
                                                        addRemoveButton={false}
                                                        formatter={(index_c: number, item_c: any): any => {
                                                            return <Row id={"row_detalleTarea_" + index_c}>
                                                                <Column size={[12, 3, 3, 3]} className="listItem-default-header">
                                                                    <span>{item_c.TipoNotificador.Nombre}</span>
                                                                    {(item_c.TipoPuesto && item_c.TipoPuesto.Clave) ?
                                                                        <span className='badge badge-info'>{item_c.TipoPuesto.Nombre}</span>
                                                                        :
                                                                        null
                                                                    }
                                                                </Column>
                                                                <Column size={[12, 9, 9, 9]} className="listItem-default-header">
                                                                    {(item_c.Registro) ?
                                                                        <span>{item_c.Registro.Nombre}</span>
                                                                        :
                                                                        null
                                                                    }
                                                                </Column>
                                                            </Row>;
                                                        }} />
                                                </Column>
                                            </Row>

                                        </Row>
                                    }}>
                                </page.SectionList>
                                <Column size={[12, 8, 8, 8]} style={{ paddingTop: 20 }}  >
                                    <page.OptionSection
                                        id={DETALLETAREA}
                                        icon="fa fa-info"
                                        level={1}
                                        collapsed={tareaCollapse}
                                        hideCollapseButton={false}>

                                        <label.Clave id={"Clave"} value={tareaClave} size={[12, 8, 8, 8]} />

                                        {tareaEstatus ?
                                            <label.EstatusTarea size={[12, 4, 4, 4]} label="Estatus Tarea" value={tareaArregloEstatus} />
                                            : null}

                                        <label.Nombre id={"Nombre"} value={tareaNombre} size={[12, 12, 12, 12]} />
                                        <label.Label id={"Comentarios"} value={tareaComentarios} label="Comentarios" size={[12, 12, 12, 12]} />
                                        <label.Fecha id="FechaAprobacion" value={tareaFechaAprobacion} size={[12, 4, 4, 4]} label="Fecha Aprobación" />
                                        <label.Fecha id="FechaAsignacion" value={tareaFechaAsignacion} size={[12, 4, 4, 4]} label="Fecha Asignación" />
                                        <label.Fecha id="FechaVigencia" value={tareaFechaVigencia} size={[12, 4, 4, 4]}  label="Fecha Vigencia" />
                                        <label.Usuario id="CompletadoPor" value={tareaCompletadaPor} label="Aprobada/Rechazada Por" size={[12, 6, 6, 6]} />
                                        <label.Currency id="DiasVigencia" label="Días Vigencia" value={tareaDiasVigencia} size={[12, 6, 6, 6]} />


                                        <label.Descripcion id="Expresion" value={tareaExpresion} label="Expresión" size={[12, 6, 6, 6]} />
                                        <label.Descripcion id="MensajeExpresion" label="Mensaje" value={tareaExpresionMensaje} size={[12, 6, 6, 6]} />

                                        <page.SectionList
                                            id={AUTORIZADORESTAREA}
                                            parent={config.id}
                                            idForm={config.id}
                                            idEntidad={config.id}
                                            idParent={config.id}
                                            icon="fas fa-user-check"
                                            style={{ paddingTop: 20 }}
                                            level={1}
                                            listHeader={
                                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                    <Row>
                                                        <Column size={[12, 2, 2, 2]}  className="list-default-header">{"Tipo"}</Column>
                                                        <Column size={[12, 4, 4, 4]}  className="list-default-header">{"Nombre"}</Column>
                                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Expresión"}</Column>
                                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Mensaje"}</Column>

                                                    </Row>
                                                </div>}
                                            size={[12, 12, 12, 12]}
                                            items={createSuccessfulStoreObject([])} readonly={false}
                                            addRemoveButton={false}
                                            formatter={(index: number, item: any) => {
                                                let icono: string = item.Estatus.Clave == "E" ? "far fa-user-check" : "fal fa-times-octagon";
                                                return <Row>

                                                    <Column size={[12, 2, 2, 2]} className="list-default-item">
                                                        <span className={icono} style={{ marginRight:"2px" }}></span>
                                                        <span>{item.Estatus.Nombre}</span>
                                                    </Column>

                                                    <Column size={[12, 4, 4, 4]} className="list-default-item">
                                                        <span>{item.Nombre + " " + item.Apellidos}</span>
                                                        <span className="badge badge-success" style={{ marginLeft: "2px" }}>{item.Email}</span>
                                                    </Column>

                                                    <Column size={[12, 3, 3, 3]} className="list-default-item">
                                                        <span>{item.Expresion}</span>
                                                    </Column>

                                                    <Column size={[12, 3, 3, 3]} className="list-default-item">
                                                        <span>{item.ExpresionMensaje}</span>
                                                    </Column>
                                                 
                                                </Row>;
                                            }}>
                                        </page.SectionList>
                                    </page.OptionSection>
                                   
                                </Column>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
};

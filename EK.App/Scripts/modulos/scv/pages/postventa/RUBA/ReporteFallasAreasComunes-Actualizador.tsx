namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteFallasAreasComunesActualizador {
    const PAGE_ID: string = "ReporteFallasAreasComunesAct";
    const PAGE_REPORTE_ID: string = "actualizador$reporte$areas$comunes";
    const PAGE_REPORTE_PARTIDAS_ID: string = "actualizador$reportePartidas$AreasComunes";
    const PAGE_REPORTE_ORDEN_TRABAJO_ID: string = "actualizador$reporte$ordenTrabajo$AreasComunes";
    const PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID: string = "contratistasLotes$ordenTrabajoCheck";


    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    const listHeaderReporteOrdenesTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[3, 3, 3, 1]} className="list-default-header">{"Id OT"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Final Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 1]} className="list-default-header">{"Planificación Servicio"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>

            </Row>
        </Column>

    const listHeaderReporteOrdenesTrabajoPartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderReportePartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Partida"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Cliente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Cerrado"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Procede"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setEntity({});
            global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);

            props.config.setState({ viewMode: false });
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void {
            global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
            Forms.updateFormElement(PAGE_ID, "ReporteBuscador", null)
            Forms.remove(PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);

            props.config.setState({ viewMode: false });
        };
        onEntitySaved(props: page.IProps): void {}

        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Reporte}
                allowNew={false}
                allowSave={false}
                allowDelete={false}
                onFilter={this.onFilter.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <PageButtons>
                    <ReverseButton />
                </PageButtons>
                <Edit />
                <ModalComentariosOTActivador size={[12, 12, 12, 12]} />
            </page.Main>
        }
    })


    interface IEditProps extends page.IProps {
        referencia?: DataElement;
        ubicacion?: DataElement;
        reporte?: DataElement;
        partidas?: DataElement;
        ordenesTrabajo?: DataElement;
        obtenerUbicacion?: (idUbicacion: number) => void;
        obtenerReporte?: (id: number) => void;
    };

    const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.referencia = Forms.getDataValue("ReporteBuscador", config.id, state);
            retValue.ubicacion = state.global.entity$actualizador$ubicacion;
            retValue.reporte = state.global.entity$actualizador$reporte$areas$comunes;
            retValue.partidas = state.global.catalogo$actualizador$reportePartidas;
            retValue.ordenesTrabajo = state.global.catalogo$actualizador$reporte$ordenTrabajo$AreasComunes;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerReporte: (id: number): void => {
                global.dispatchAsyncPost("global-page-entity", "base/scv/ReporteFallasAreasComunes/id", { id }, PAGE_REPORTE_ID);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.referencia, nextProps.referencia) && getDataID(this.props.referencia) !== getDataID(nextProps.referencia)) {
                if (isSuccessful(nextProps.referencia)) {
                    let item: any = global.getData(nextProps.referencia);
                    this.props.obtenerReporte(item.ID);
                };
            };
            if (hasChanged(this.props.reporte, nextProps.reporte) && getDataID(this.props.reporte) !== getDataID(nextProps.reporte)) {
                if (isSuccessful(nextProps.reporte)) {
                    let reporte: any = global.getData(nextProps.reporte);
                    let partidas: DataElement = global.createSuccessfulStoreObject(reporte.Partidas);
                    let ordenesTrabajo: DataElement = global.createSuccessfulStoreObject(reporte.OrdenesTrabajo);

                    Forms.updateFormElement(config.id, PAGE_REPORTE_PARTIDAS_ID, partidas);
                    Forms.updateFormElement(config.id, PAGE_REPORTE_ORDEN_TRABAJO_ID, ordenesTrabajo);
                    Forms.remove(PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);
                };
            };

        }
        checkOrdenTrabajo(id) {
            let item: any = global.getData(EK.Store.getState().global.entity$actualizador$reporte$areas$comunes);
            let val = Forms.getValue("orden_trabajo_" + id, PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);
            if (item.OrdenesTrabajo !== null && item.OrdenesTrabajo.length > 0) {
                for (const ot of item.OrdenesTrabajo) {
                    if (ot.ID === id) {
                        ot.seleccionAbrir = val;
                    }
                }
            }
            dispatchSuccessful('load::entity$actualizador$reporte$areas$comunes', item);
        }
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.referencia, nextProps.referencia) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                hasChanged(this.props.reporte, nextProps.reporte) ||
                hasChanged(this.props.partidas, nextProps.partidas) ||
                hasChanged(this.props.ordenesTrabajo, nextProps.ordenesTrabajo);
        };
        render(): JSX.Element {
            let entidad: any = {}
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";
                let fecha = undefined;
                let retorno = "";
                if (global.isSuccessful(this.props.reporte)) {
                    let reporte: any = global.getData(this.props.reporte);
                    let fechaCaptura: Date = new Date(reporte.FechaCaptura);
                    fecha = reporte.FechaCaptura;
                    let horasTrascurridas: number = global.getDateDiff(fechaCaptura, global.getToday(), "hours");
                    if (horasTrascurridas <= 24) {
                        className = "fas fa-unlock";
                    };
                    return global.formatDate(fecha) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
                };
                return global.formatDate(value) + "<span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };

            let data = this.props.reporte
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Actualizador Reporte de Incidencias Áreas Comunes"
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <select.ReportesFallasAreasComuensSPV id="ReporteBuscador" label="Folio/Fraccionamiento" idForm={config.id} size={[12, 12, 4, 4]} iconButton="fas fa-arrow-right" />
                            <label.Entidad id="FechaCaptura" value={labelFechaCaptura} isHTML={true} label="Fecha Captura" size={[12, 12, 4, 2]} />
                            <label.Entidad id="EstatusReporte" label="Estatus Reporte" idForm={PAGE_REPORTE_ID} size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <UbicacionClienteView ubicacion={data} size={[4, 4, 4, 4]} />
                            <ReporteFallasAreasComunesView ubicacion={data} size={[8, 8, 8, 8]} />
                        </Row>
                        <Row>
                            <page.SectionList
                                id={PAGE_REPORTE_PARTIDAS_ID}
                                title={"Incidencias reportadas"}
                                parent={config.id}
                                icon="fas fa-cogs"
                                level={1}
                                hideNewButton={true}
                                listHeader={listHeaderReportePartidas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                horizontalScrolling={true}
                                selectable={true}
                                drawOddLine={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    let bgColor: string;

                                    if (item.PartidaAutorizada === "R" || item.Procede === "N" || item.ProcedeBool === false) {
                                        bgColor = "#FFA07A";
                                    };

                                    let labelGarantia: any = (value: any) => {
                                        return (value === undefined || value === null) ? "" : value > 0 ? "<span class='badge bold' style='background-color: rgb(65, 195, 0);'>" + value + "</span>" : "<span class='badge badge-danger bold'>" + value + "</span>"
                                    };

                                    return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.Id}</span>{item.Falla.Nombre}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.ID}</span>{item.UbicacionFalla.Nombre}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.Nombre : null}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.yes(item.Procede === 'S'? true : false)}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">&nbsp;</Column>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                        <Row>
                            <page.SectionList
                                id={PAGE_REPORTE_ORDEN_TRABAJO_ID}
                                title={"Ordenes de trabajo"}
                                parent={config.id}
                                icon="fa fa-briefcase"
                                level={1}
                                hideNewButton={true}
                                listHeader={listHeaderReporteOrdenesTrabajo}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    let IdEstatus = item.IdEstatusOrdenTrabajo;
                                    let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas);
                                    return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                </Column>
                                                <Column size={[3, 3, 3, 1]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.ID}</span></Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaFin)}</Column>
                                                <Column size={[2, 2, 2, 1]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave] }}></i>}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                                <Column size={[1, 1, 1, 1]} style={{ marginBottom: -20, marginTop: -28 }}>
                                                    {IdEstatus === 1095 ? <checkBox.CheckBox id={"orden_trabajo_" + item.ID} size={[1, 1, 1, 1]} change={() => this.checkOrdenTrabajo(item.ID)} idFormSection={PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID} /> : null}
                                                </Column>
                                            </Row>
                                        </Column>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    items={partidas}
                                                    readonly={true}
                                                    listHeader={listHeaderReporteOrdenesTrabajoPartidas}
                                                    addRemoveButton={false}
                                                    formatter={(_index: number, _item: any): any => {
                                                        return <Row>
                                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{_item.Partida.Partida}</span></Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.TipoFalla.ID}</span>{_item.Partida.TipoFalla.Nombre}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.Falla.IdFalla}</span>{_item.Partida.Falla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.UbicacionFalla.IdUbicacionFalla}</span>{_item.Partida.UbicacionFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Nombre}</Column>
                                                        </Row>
                                                    }} />
                                            </Column>
                                        </Row>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        }
    })
    interface IUbicacionBaseProps extends page.IProps {
        ubicacion?: DataElement;
        size?: number[];
    };
    class UbicacionClienteView extends React.Component<IUbicacionBaseProps, {}>{
        render(): JSX.Element {
            let ubicacion: any = global.getData(this.props.ubicacion);
            let plaza = ubicacion.PlazaView;
            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={PAGE_REPORTE_ID}
                    parent={config.id}
                    title={"Ubicación"}
                    subTitle={<span style={{ marginLeft: 5 }}>
                        <span className="badge badge-info bold">{ubicacion.ClaveFormato}</span>
                    </span>}
                    level={1}
                    icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="PlazaView" label="Plaza" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Desarrollo" label="Fraccionamiento" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} value={() => {
                            return !ubicacion || !ubicacion.Desarrollo ? "" : (!ubicacion.DesarrolloClave ? "" : "<span class='badge badge-info'>" + ubicacion.DesarrolloClave + "</span> ") + (!ubicacion.Desarrollo.Nombre ? "" : ubicacion.Desarrollo.Nombre);
                        }} />
                        <label.Entidad id="CalleA" label="Calle A" value={ubicacion.CalleA} idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="CalleB" label="Calle B" value={ubicacion.CalleB} idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
                    </Row>

                </page.OptionSection>

            </Column>

        };
    };
    interface IReporteFallasProps extends IUbicacionBaseProps { };

    class ReporteFallasAreasComunesView extends React.Component<IReporteFallasProps, {}>{
        render(): JSX.Element {
            
            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={PAGE_REPORTE_ID}
                    title="INFORMACIÓN DEL REPORTE DE INCIDENCIAS ÁREAS COMUNES"
                    parent={config.id}
                    level={1}
                    icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="DiasSolucion" label="DÍAS SOLUCIÓN" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Label id="DiasContratista" label="DÍAS TRABAJO CONTRATISTA" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Entidad id="ResponsableConstruccion" label="RESPONSABLE DE CONSTRUCCIÓN " idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} />
                        <label.Fecha id="FechaSolucionReporte" label="Fecha Reporte" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaContratistaInicial" label="Fecha Contratista Inicial" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Entidad id="MedioSolicitud" label="Medio Solicitud" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} />
                        <label.Fecha id="FechaSolucionTerminacion" label="Fecha Estimada Término" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaContratistaFinal" label="Fecha Contratista Final" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Label id="ObservacionesServicio"  label="Observaciones del Cliente" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 6]} />
                        <label.Label id="ObservacionesContratista" label="Observaciones a nivel folio" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 5]} />
                        <ComentariosOTButton size={[1, 1, 1, 1]} style={{ background: '#3498db', marginTop: '10px', color: '#fff' }} />

                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    export interface IPageButtonProps extends IButtonProps, page.IProps {
        reporteFallas?: DataElement;
    };
    const PageButtonProps: any = (state: any) => {
        var retValue: any = page.props(state);
        retValue.reporteFallas = state.global.entity$actualizador$reporte$areas$comunes;
        retValue.pageLink = state.global.currentLink;
        return retValue;
    };
    export class Reverse$Button extends React.Component<IPageButtonProps, {}> {
        static defaultProps: IPageButtonProps = {
            icon: "fas fa-undo",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        getCheckedItems(dataSlot: string, parentSlot: string, checkForm: string, itemPrefix: string, config: page.IPageConfig) {
            let entidades: DataElement = config.getCatalogo(dataSlot);
            if (parentSlot) {
                entidades = Forms.getValue(dataSlot, parentSlot);
            };
            if (!entidades) {
                entidades = global.createSuccessfulStoreObject([]);
            };
            let items: any[] = global.getData(entidades, []);
            let retValue: any[] = [];
            //
            let form: EditForm = Forms.getForm(checkForm);
            if (form.formData && form.formData.form) {
                for (var prop in form.formData.form) {
                    let element: any = form.formData.form[prop];
                    if (element && element.value === true) {
                        let id: number = Number(prop.replace(itemPrefix, ""));
                        let found: any[] = items.filter((item) => { return item.ID === id; });
                        if (found && found.length) {
                            retValue.push(found[0]);
                        };
                    };
                };
            };
            //
            return retValue;
        }
        onClick(): void {
            let item: any = global.getData(this.props.reporteFallas);
            if (!(item && item.ID)) {
                global.info("No se seleccionó el reporte de incidencia.");
                return;
            };
            //
            if (item.IdEstatusReporte === "X") {
                if (item.OrdenesTrabajo.length > 0) {
                    let ordenesTrabajo: any[] = this.getCheckedItems(PAGE_REPORTE_ORDEN_TRABAJO_ID, config.id, PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID, "orden_trabajo_", this.props.config);
                    if (ordenesTrabajo.length <= 0) {
                        EK.Global.info("Si el reporte de incidencia tiene ordendes de trabajo, es necesario al menos seleccionar una de ellas.", "Revertir Reporte de Incidencia");
                        return;
                    }
                    item.OrdenesTrabajo = ordenesTrabajo;
                    
                }
            } else if (item.IdEstatusReporte === "N" && item.Cancelado === null || item.IdEstatusReporte === "N" && item.Cancelado === "N" || item.IdEstatusReporte === "M" && item.Cancelado === "N") {
                global.info("El reporte de incidencia ya se encuentra abierto.");
                return;
            }
            if (item.IdEstatusReporte === "X") {
                EK.Global.confirm("Presione Confirmar para reactivar el reporte de Incidencia.", "Reactivar Reporte de Incidencia", (isConfirm) => {
                    if (isConfirm === true) {
                        let pageLink: string = getData(this.props.pageLink);
                        let actionUrl: string = [pageLink, "/save"].join("");
                        let $page: any = $ml[this.props.id];

                        //global.dispatchAsyncPut("global-current-entity", actionUrl, item);
                        global.asyncPut(actionUrl, item, (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    dispatchSuccessful("global-current-entity", item)
                                    success("El Reporte de incidencia a sido actualizado", "Exito")
                                    global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
                                    global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
                                    global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);
                                    Forms.updateFormElement(PAGE_ID, "ReporteBuscador", null)
                                    Forms.remove(PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);
                                    this.props.config.setState({ viewMode: false });
                                    break;
                                case AsyncActionTypeEnum.loading:
                                    break;
                                case AsyncActionTypeEnum.failed:
                                    warning("No se a podido completar la accion.")
                                    break;
                            }
                        });
                    };
                });
            } else if (item.IdEstatusReporte === "T") {
                global.info("No se puede revertir un reporte que se encuentra terminado.");
                return;
            };

            
        }
        render(): JSX.Element {
            if (global.isSuccessful(this.props.reporteFallas) && global.getDataID(this.props.reporteFallas) > 0) {
                return <Button {...this.props} keyBtn="btnSPVReversarReporteFallasAreasComunes" onClick={this.onClick.bind(this)} />;
            };

            return null;
        };
    }
    const ReverseButton: any = ReactRedux.connect(PageButtonProps, null)(Reverse$Button);

    export interface ComentariosButtonProps extends IButtonProps, page.IProps { }

    export let ComentariosOTButton: any = global.connect(class extends React.Component<ComentariosButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entidad = state.global.entity$actualizador$reporte$areas$comunes;
            return retValue;
        };
        static defaultProps: ComentariosButtonProps = {
            icon: "fas fa-comment-alt",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onButtonClick(): void {
            let modalCalen: any = $("#modalComentariosOTActivador");
            modalCalen.modal();
        };
        render(): JSX.Element {

            return <span>
                <Button keyBtn={"btnSPVComentariosOT"} {...this.props} id="btn_comentarios_ot" onClick={this.onButtonClick} />
            </span>
        };
    });
}
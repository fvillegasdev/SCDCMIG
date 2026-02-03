// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.RUBA.ReportesFallasActualizador {
    "use strict";
    const PAGE_ID: string = "ReportesFallasActualizador";
    const PAGE_UBICACION_ID: string = "actualizador$ubicacion";
    const PAGE_REPORTE_ID: string = "actualizador$reporte";
    const PAGE_REPORTE_PARTIDAS_ID: string = "actualizador$reportePartidas";
    const PAGE_REPORTE_ORDEN_TRABAJO_ID: string = "actualizador$reporte$ordenTrabajo";
    const PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID: string = "contratistasLotes$ordenTrabajoCheck";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_UBICACION_ID, PAGE_REPORTE_ID, PAGE_REPORTE_PARTIDAS_ID, PAGE_REPORTE_ORDEN_TRABAJO_ID]);

    const listHeaderReporteOrdenesTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"ID"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Inicio Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Final Estimado Trabajo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Planificación Servicio"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderReporteOrdenesTrabajoPartidas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"No. Incidencia"}</Column>
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
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"No. Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Diagnósticos"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Familia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Componente"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Causa Incidencia"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Reincidencias"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Cliente"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Observaciones Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-center-header">{"Garantía (días)"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Término Garantía"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Cerrado"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Procede"}</Column>
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
            global.dispatchSuccessful("global-page-entity", {}, PAGE_UBICACION_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);

            props.config.setState({ viewMode: false });
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void { };
        onEntitySaved(props: page.IProps): void {
            global.dispatchSuccessful("global-page-entity", {}, PAGE_UBICACION_ID);
            global.dispatchSuccessful("global-page-entity", {}, PAGE_REPORTE_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_PARTIDAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_REPORTE_ORDEN_TRABAJO_ID);

            Forms.remove(PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);

            props.config.setState({ viewMode: false });
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowSave={false}
                allowDelete={false}
                onFilter={this.onFilter.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <PageButtons>
                    <ReverseButton />
                    <DeleteButton />
                </PageButtons>
                <Edit />
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
        referencia?: DataElement;
        ubicacion?: DataElement;
        reporte?: DataElement;
        partidas?: DataElement;
        ordenesTrabajo?: DataElement;
        obtenerUbicacion?: (idUbicacion: number) => void;
        obtenerReporte?: (id: number) => void;
        editContratista?: any;
    };

    const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.referencia = Forms.getDataValue("ReporteCliente", config.id, state);
            retValue.ubicacion = state.global.entity$actualizador$ubicacion;
            retValue.reporte = state.global.entity$actualizador$reporte;
            retValue.partidas = state.global.catalogo$actualizador$reportePartidas;
            retValue.ordenesTrabajo = state.global.catalogo$actualizador$reporte$ordenTrabajo;
            retValue.editContratista = state.global.cambiarContratista;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerUbicacion: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, PAGE_UBICACION_ID);
            },
            obtenerReporte: (id: number): void => {
                global.dispatchAsyncPost("global-page-entity", "base/scv/ReportesFallas/id", { id }, PAGE_REPORTE_ID);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.referencia, nextProps.referencia) && getDataID(this.props.referencia) !== getDataID(nextProps.referencia)) {
                if (isSuccessful(nextProps.referencia)) {
                    let item: any = global.getData(nextProps.referencia);
                    this.props.obtenerReporte(item.ID);
                    this.props.obtenerUbicacion(item.IdUbicacion);
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
        };
        checkOrdenTrabajo(id) {
            let item: any = global.getData(EK.Store.getState().global.entity$actualizador$reporte);
            // entity$actualizador$reporte
            //let ot = item.OrdenesTrabajo.filter(x => x.ID === id);
            //console.log(id)
            let val = Forms.getValue("orden_trabajo_" + id, PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID);
            if (item.OrdenesTrabajo !== null && item.OrdenesTrabajo.length > 0) {
                for (const ot of item.OrdenesTrabajo) {
                    //console.log(ot)
                    if (ot.ID === id) {
                        //console.log('same')
                        ot.seleccionAbrir = val;
                    }
                }
            }
            dispatchSuccessful('load::entity$actualizador$reporte', item);
            //console.log(item);
        }
        setOpcionOT(val) {
            console.log(val)
        }
        componentDidMount() {
            dispatchSuccessful('load::cambiarContratista', {isEdit:false});
        }
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.referencia, nextProps.referencia) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                hasChanged(this.props.reporte, nextProps.reporte) ||
                hasChanged(this.props.partidas, nextProps.partidas) ||
                hasChanged(this.props.ordenesTrabajo, nextProps.ordenesTrabajo) ||
                hasChanged(this.props.editContratista, nextProps.editContratista);
        };

        EditarContratista(editar) {
            console.log('edtar')
            if (editar) {
                dispatchSuccessful('load::cambiarContratista', { Edit: editar });
            } else {
                dispatchSuccessful('load::cambiarContratista', { noEditar: editar });
            }
            
        }

        render(): JSX.Element {
            console.log(this.props.editContratista)
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";
                if (global.isSuccessful(this.props.reporte)) {
                    let reporte: any = global.getData(this.props.reporte);
                    let fechaCaptura: Date = new Date(reporte.FechaCaptura);
                    let horasTrascurridas: number = global.getDateDiff(fechaCaptura, global.getToday(), "hours");
                    if (horasTrascurridas <= 24) {
                        className = "fas fa-unlock";
                    };
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Actualizador Reporte de Fallas"
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <select.ReportesFallasSPV id="ReporteCliente" idForm={config.id} size={[12, 12, 4, 4]} iconButton="fas fa-arrow-right" />
                            <label.Fecha id="FechaCaptura" idForm={PAGE_REPORTE_ID} value={labelFechaCaptura} isHTML={true} size={[2, 2, 2, 2]} />
                            <label.Fecha id="FechaEntregaVivienda" idForm={PAGE_REPORTE_ID} size={[2, 2, 2, 2]} />
                            <label.Label id="MesesTranscurridos" idForm={PAGE_REPORTE_ID} size={[2, 2, 2, 2]} />
                            <label.Entidad id="EstatusReporte" idForm={PAGE_REPORTE_ID} size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <UbicacionClienteView ubicacion={this.props.ubicacion} size={[4, 4, 4, 4]} />
                            <ReporteFallasView ubicacion={this.props.ubicacion} size={[8, 8, 8, 8]} />
                        </Row>
                        <Row>
                            <page.SectionList
                                id={PAGE_REPORTE_PARTIDAS_ID}
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
                                        {/*<reportesFallas.ColumnDictamen items={item.Dictamenes} size={[1, 1, 1, 1]} />*/}
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.TipoFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.TipoFalla.ID}</span>{item.TipoFalla.Nombre}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.Falla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Falla.IdFalla}</span>{item.Falla.Descripcion}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{!(item && item.UbicacionFalla) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.IdUbicacionFalla}</span>{item.UbicacionFalla.Descripcion}</span>}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? null : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Descripcion}</span>}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.Descripcion : null}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">{item.CausaFalla ? item.CausaFalla.FallaOrigen.Descripcion : null}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-warning bold">{item.Reincidencias}</span></Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{item.ObservacionesContratista}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span dangerouslySetInnerHTML={{ __html: labelGarantia(item.DiasGarantia) }}></span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.TerminoGarantia)}</Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.formatDate(item.FechaCerrado)}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">{EK.UX.Labels.yes(item.ProcedeBool === true)}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">{!(item && item.EstatusPartida) ? null : <span className="badge badge-info">{item.EstatusPartida.Nombre}</span>}</Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">&nbsp;</Column>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                        <Row>
                            <page.SectionList
                                id={PAGE_REPORTE_ORDEN_TRABAJO_ID}
                                parent={config.id}
                                icon="fa fa-briefcase"
                                level={1}
                                hideNewButton={true}
                                listHeader={listHeaderReporteOrdenesTrabajo}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                horizontalScrolling={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                   // console.log(item)
                                   // console.log(this.props)
                                    let idPlaza = this.props.ubicacion && this.props.ubicacion.data? this.props.ubicacion.data.IdPlaza:null;
                                    let IdEstatus = item.IdEstatusOrdenTrabajo;
                                    let isEdit = false;
                                    let editar = global.getStoreData('cambiarContratista');
                                    //console.log(editar)
                                    //console.log(item.Contratista)
                                    let partidas: global.DataElement = global.createSuccessfulStoreObject(item.Partidas);
                                    return <Row id={"row_orden_trabajo_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                        <Column  className="listItem-default-item">
                                            <Row className="list-selectable-item">
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_orden_trabajo_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-item">
                                                    <span className="badge badge-success">{item.ID}</span>
                                                </Column>
                                                {/*<Column size={[5, 5, 5, 5]} style={{ paddingTop: 0 }}>
                                                        <div>
                                                            <span className="badge badge-success" style={{ marginRight: '4px' }}>
                                                                {item.Contratista.ID}
                                                            </span>
                                                            {item.Contratista.Nombre}
                                                        </div>
                                                </Column>*/}
                                                 
                                                <ContratistaView IdPlaza={idPlaza} size={[5, 5, 5, 5]}
                                                    IdContratista={item.Contratista.ID}
                                                    ContratistaDesc={item.Contratista.Descripcion} IdOrdenTrabajo={item.ID} />
                                                
                                                
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaInicio)}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{global.formatDateTimeDirect(item.FechaFin)}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-header">{!(item.AgendaDetalle && item.AgendaDetalle.EstatusAgenda) ? null : <i className={configVivienda.EstatusCalendarDashBoardInfo.iconos[item.AgendaDetalle.EstatusAgenda.Clave]} style={{ color: configVivienda.EstatusCalendarDashBoardInfo.iconosColor[item.AgendaDetalle.EstatusAgenda.Clave] }}></i>}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item"><span className="badge badge-info">{item.EstatusOrdenTrabajo.Nombre}</span></Column>
                                                <Column size={[2, 2, 2, 2]} style={{ marginBottom: -20, marginTop: -28 }}>
                                                    {IdEstatus === 1095 ?
                                                        <checkBox.CheckBox id={"orden_trabajo_" + item.ID} size={[1, 1, 1, 1]} change={() => this.checkOrdenTrabajo(item.ID)} idFormSection={PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID} />
                                                        :
                                                        IdEstatus === 1091 ?
                                                            <ddl.OpcionesOTDDL id={"opcionAbrirOT_" + item.ID} idForm={config.id} size={[12, 12, 12, 12]} style={{ height: '60px', paddingTop:'5px' }} label=""  />

                                                            :
                                                            null
                                                    }
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
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.ID}</span>{_item.Partida.CausaFalla.Descripcion}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Partida.CausaFalla.FallaOrigen.ID}</span>{_item.Partida.CausaFalla.FallaOrigen.Descripcion}</Column>
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
        };
    });

    interface IUbicacionBaseProps extends page.IProps {
        ubicacion?: DataElement;
        size?: number[];
        IdPlaza?: any;
        IdContratista?: any;
        IdOrdenTrabajo?: any;
        ContratistaDesc?: any;
        editContratista?: any;
    };

    export let ContratistaView: any = global.connect(class extends React.Component<IUbicacionBaseProps, {}> {
    //class ContratistaView extends React.Component<IUbicacionBaseProps, {}>{
        constructor(props: IUbicacionBaseProps) {
            super(props);
        }

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.editContratista = state.global.editContratista;
            return retValue;
        };


        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.editContratista, nextProps.editContratista);
        };

        componentDidMount() {
            dispatchSuccessful('load::editContratista', { isEdit: false });
        }

        componentWillUnmount(): any {
            dispatchSuccessful('load::editContratista', { isEdit: false });
        };

        EditarContratista(editar) {
            dispatchSuccessful('load::editContratista', { isEdit: editar });
        }

        changeContratista() {
            let data = Forms.getValue('Contratista', PAGE_REPORTE_ORDEN_TRABAJO_ID);
            if (!data || data === undefined) {
                global.info('Selecciones un contratista');
                return;
            }
            let p = {
                idOt: this.props.IdOrdenTrabajo,
                idContratista:data.ID
            }

            let ruta = `base/kontrol/reportesFallasActualizador/GetBP/changeContratista/`
            global.asyncPost(ruta, { parametros: p }, (status2: AsyncActionTypeEnum, datasaved: any) => {
                switch (status2) {
                    case AsyncActionTypeEnum.successful:
                        if (data && data !== -1) {
                            let ordenesTrabajo = Forms.getValue(PAGE_REPORTE_ORDEN_TRABAJO_ID, config.id);
                            ordenesTrabajo = ordenesTrabajo && ordenesTrabajo.data ? ordenesTrabajo.data : [];

                            for (let ot of ordenesTrabajo) {
                                if (ot.ID === p.idOt) {
                                    ot.Contratista.ID = p.idContratista;
                                    ot.Contratista.Nombre = data.Nombre;
                                    ot.Contratista.Descripcion = data.Nombre;
                                }
                            }
                            let ots: DataElement = global.createSuccessfulStoreObject(ordenesTrabajo);
                            Forms.updateFormElement(config.id, PAGE_REPORTE_ORDEN_TRABAJO_ID, ots);

                            dispatchSuccessful('load::editContratista', { isEdit: false });
                            Forms.updateFormElement(PAGE_REPORTE_ORDEN_TRABAJO_ID, 'Contratista', null);
                            global.success('Contratista actualizado');
                        }
                        //console.log(datasaved);
                        break;
                    case AsyncActionTypeEnum.loading:
                        
                        break;
                    case AsyncActionTypeEnum.failed:
                        global.errorMessage('Hubo un problema al intentar actualizar el registro!');
                       
                        break;
                }
            });

            //console.log(pageLink);
        }


        render(): JSX.Element {
            //console.log(this.props)
            let ubicacion: any = global.getData(this.props.ubicacion);
            let isEdit = false;
            let editar = global.getStoreData('editContratista');
            editar = editar !== null && editar !== undefined && editar.isEdit ? editar.isEdit : false;
            //console.log(editar);
            return <Column size={this.props.size} style={{ paddingTop: 0 }}>
                {editar ?
                    <div>
                        <SPVContratistasConsulta
                            visible={true}
                            id="Contratista"
                            idFormSection={PAGE_REPORTE_ORDEN_TRABAJO_ID}
                            idPlaza={this.props.IdPlaza} size={[10, 10, 10, 10]} required={true} validations={[validations.required()]} />
                        <button className="circle-btn success-btn  mt2" onClick={()=> this.changeContratista()}><i className="fas fa-check" /> </button>
                        <button className="circle-btn danger-btn mt2" onClick={() => this.EditarContratista(false)}><i className="fas fa-times" /></button>
                    </div> :
                    <div>
                        <span className="badge badge-success" style={{marginRight:'4px'}}>
                            {this.props.IdContratista}
                        </span>
                        {this.props.ContratistaDesc}
                        <button className="circle-btn info-btn mt2" style={{marginLeft:'5px'}} onClick={() => this.EditarContratista(true)}><i className="fas fa-edit" /></button>

                    </div>}
            </Column>
        };
    });

    class UbicacionClienteView extends React.Component<IUbicacionBaseProps, {}>{
        render(): JSX.Element {
            let ubicacion: any = global.getData(this.props.ubicacion);

            return <Column size={this.props.size} style={{ paddingTop: 0 }}>
                <page.OptionSection
                    id={PAGE_UBICACION_ID}
                    parent={config.id}
                    subTitle={<span style={{ marginLeft: 5 }}>
                        <span className="badge badge-info bold">{ubicacion.ClaveFormato}</span>
                    </span>}
                    level={1}
                    icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="Calle" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Desarrollo" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} value={() => {
                            return !ubicacion || !ubicacion.Desarrollo ? "" : (!ubicacion.DesarrolloClave ? "" : "<span class='badge badge-info'>" + ubicacion.DesarrolloClave + "</span> ") + (!ubicacion.Desarrollo.Nombre ? "" : ubicacion.Desarrollo.Nombre);
                        }} />
                        <label.Entidad id="Plaza" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Segmento" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                        <label.Entidad id="Prototipo" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    interface IReporteFallasProps extends IUbicacionBaseProps { };

    class ReporteFallasView extends React.Component<IReporteFallasProps, {}>{
        render(): JSX.Element {
            let supervisionExterna: number = undefined;

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={PAGE_REPORTE_ID}
                    parent={config.id}
                    level={1}
                    icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label id="DiasSolucion" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Label id="DiasContratista" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Entidad id="ResponsableConstruccion" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} />
                        <label.Fecha id="FechaSolucionReporte" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaContratistaInicial" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Entidad id="MedioSolicitud" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} />
                        <label.Fecha id="FechaSolucionTerminacion" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        <label.Fecha id="FechaContratistaFinal" idForm={PAGE_REPORTE_ID} size={[12, 12, 3, 3]} />
                        {supervisionExterna === 1 ? <label.Entidad id="SupervisorContratista" idForm={PAGE_REPORTE_ID} size={[12, 12, 6, 6]} /> : null}
                        <label.Label id="ObservacionesServicio" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
                        <label.Label id="ObservacionesContratista" idForm={PAGE_REPORTE_ID} size={[12, 12, 12, 12]} />
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
        retValue.reporteFallas = state.global.entity$actualizador$reporte;
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
        };
        onClick(): void {
            let item: any = global.getData(this.props.reporteFallas);
            //
            let entidades: DataElement = config.getCatalogo(PAGE_REPORTE_ORDEN_TRABAJO_ID);
            //console.log(entidades)
            if (!(item && item.ID)) {
                global.info("No se seleccionó el reporte de fallas.");
                return;
            };
            //
            if (item.IdEstatusReporte === "T") {
                if (item.OrdenesTrabajo.length > 0) {
                    let formReporte = Forms.getForm(config.id);
                    //console.log(formReporte)
                    let guardar = false;
                    for (let ot of item.OrdenesTrabajo) {
                        let opcionAbrirOT = formReporte[`opcionAbrirOT_${ot.ID}`];
                        //console.log(opcionAbrirOT)
                        if (opcionAbrirOT && opcionAbrirOT.ID > 0) {
                            ot.opcionAbrir = opcionAbrirOT;
                            guardar = true;
                        }
                    }

                    if (!guardar) {
                        EK.Global.info("Selecciona una opcion para abrir al menos una OT", "Reversar Reporte de Fallas");
                        return;
                    }


                } 
            }
            else if (item.IdEstatusReporte === "X") {
                if (item.OrdenesTrabajo.length > 0) {
                    let ordenesTrabajo: any[] = this.getCheckedItems(PAGE_REPORTE_ORDEN_TRABAJO_ID, config.id, PAGE_REPORTE_ORDEN_TRABAJO_CHECK_ID, "orden_trabajo_", this.props.config);
                    //console.log(ordenesTrabajo)
                    item.OrdenesTrabajo = ordenesTrabajo;
                    if (ordenesTrabajo.length <= 0) {
                        EK.Global.info("Si el reporte de fallas tiene ordendes de trabajo, es necesario al menos seleccionar una de ellas.", "Reversar Reporte de Fallas");
                        return;
                    }
                }
            }
            else if (item.IdEstatusReporte === "N" && item.Cancelado === "N" || item.IdEstatusReporte === "M" && item.Cancelado === "N") {
                global.info("El reporte de fallas ya se encuentra abierto.");
                return;
            };
            //
            EK.Global.confirm("Presione Confirmar para reversar el reporte de fallas.", "Reversar Reporte de Fallas", (isConfirm) => {
                if (isConfirm === true) {
                    let pageLink: string = getData(this.props.pageLink);
                    //console.log(pageLink);
                    let actionUrl: string = [pageLink, "/save"].join("");
                    //console.log(item);
                    if (item.Partidas && item.Partidas.length > 0) {
                        for (let p of item.Partidas) {
                            p.ListaEvidenciasCte = null;
                        }
                    }
                   global.dispatchAsyncPut("global-current-entity", actionUrl, item);
                };
            });
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.reporteFallas) && global.getDataID(this.props.reporteFallas) > 0) {
                return <Button {...this.props} keyBtn="btnSPVReversarReporteFallas" onClick={this.onClick.bind(this)} />;
            };

            return null;
        };
    };
    const ReverseButton: any = ReactRedux.connect(PageButtonProps, null)(Reverse$Button);

    export class Delete$Button extends React.Component<IPageButtonProps, {}> {
        static defaultProps: IPageButtonProps = {
            icon: "fas fa-trash",
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
            let allowDelete: boolean;
            if (global.isSuccessful(this.props.reporteFallas)) {
                let reporte: any = global.getData(this.props.reporteFallas);
                if (reporte.IdEstatusReporte !== "T" && reporte.IdEstatusReporte !== "X") {
                    let ordenesTrabajo: any[] = reporte.OrdenesTrabajo as any[];
                    if (!(ordenesTrabajo && ordenesTrabajo.length > 0)) {
                        let partidas: any[] = reporte.Partidas as any[];
                        if (!(partidas && partidas.length > 0)) {
                            allowDelete = true;
                        } else {
                            allowDelete = partidas.every((p) => {
                                return p.EstatusPartidaValor === "N";
                            });
                        };
                    } else {
                        allowDelete = ordenesTrabajo.every((p) => {
                            return p.EstatusOrdenTrabajo.Clave === "N";
                        });
                    };
                };
            };
            //
            if (!allowDelete) {
                global.info("No se puede eliminar un reporte terminado, que tiene órdenes de trabajo o partidas en proceso o terminadas.");
                return;
            };
            //
            EK.Global.confirm("Presione Confirmar para eliminar el reporte de fallas.", "Eliminar Reporte de Fallas", (isConfirm) => {
                if (isConfirm === true) {
                    let pageLink: string = getData(this.props.pageLink);
                    let actionUrl: string = [pageLink, "/delete"].join("");
                    global.dispatchAsyncPut("global-current-entity", actionUrl, { id: global.getDataID(this.props.reporteFallas) });
                };
            });
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.reporteFallas) && global.getDataID(this.props.reporteFallas) > 0) {
                return <Button {...this.props} keyBtn="btnSPVEliminarReporteFallas" onClick={this.onClick.bind(this)} />;
            };

            return null;
        };
    };
    const DeleteButton: any = ReactRedux.connect(PageButtonProps, null)(Delete$Button);
};
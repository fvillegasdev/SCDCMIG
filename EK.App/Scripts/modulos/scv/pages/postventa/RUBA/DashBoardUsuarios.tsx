namespace EK.Modules.SCV.Pages.postventa.RUBA.DashBoardUsuariosGeneral {
    interface IUsuariosDashBoardRF extends page.IProps {
        indicadoresUsuarios?: DataElement;
        EstadoSeleccionado?: any;
        PlazaSeleccionado?: any;
        indicadoresEstados?: DataElement;
        idPageBase: any;
    };

    export const DashBoardUsuariosBase: any = global.connect(class extends React.Component<IUsuariosDashBoardRF, IUsuariosDashBoardRF> {
        constructor(props: IUsuariosDashBoardRF) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => ({
            indicadoresUsuarios: state.global.UsuariosDashBoard,
            indicadoresEstados: state.global.dashBoardIndicadoresEstados,
            EstadoSeleccionado: state.global.EstatusSelected
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });
        componentWillReceiveProps(nextProps: IUsuariosDashBoardRF) {
            if (hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado)) {
                if (global.isSuccessful(nextProps.EstadoSeleccionado)) {
                    let idPlazaSeleccionada: any = Forms.getValue("Plazas", this.props.idPageBase).ID;
                    let estadoSeleccionadoNext: any = nextProps.EstadoSeleccionado ? getData(nextProps.EstadoSeleccionado).Clave : null;
                    let estadoSeleccionadoProps: any = this.props.EstadoSeleccionado ? getData(this.props.EstadoSeleccionado).Clave : null;
                    //
                    idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                    let claveEstado: any = nextProps.EstadoSeleccionado ? getData(nextProps.EstadoSeleccionado).Clave : null;

                    var fecha = new Date();
                    let idAnio: any = Forms.getValue('FullAnio', 'FormularioFiltroDashBoardReporteFallas') === undefined || Forms.getValue('FullAnio', 'FormularioFiltroDashBoardReporteFallas') === null || Forms.getValue('FullAnio', 'FormularioFiltroDashBoardReporteFallas').ID === null || Forms.getValue('FullAnio', 'FormularioFiltroDashBoardReporteFallas').ID === undefined ? null : Forms.getValue('FullAnio', 'FormularioFiltroDashBoardReporteFallas').ID;
                    if (idAnio === undefined || idAnio === null) {
                        idAnio = fecha.getFullYear();
                    }
                    let plaza = Forms.getValue("Plazas", "ReportesFallas");
                    if (plaza && plaza.ID != undefined) {
                        dispatchAsync("load::UsuariosDashBoard", "base/kontrol/ReportesFallas/Get/getUsersDashBoard/" + global.encodeObject({ IdPlaza: idPlazaSeleccionada, ClaveEstado: claveEstado, CY: idAnio }));
                    }
                    if (this.props.idPageBase === "ReporteFallasAreasComunes") {
                        let plaza = Forms.getValue("Plazas", "ReporteFallasAreasComunes");
                        if (plaza && plaza.ID != undefined) {
                            dispatchAsync("load::UsuariosDashBoard", "base/kontrol/ReporteFallasAreasComunes/Get/getUsersDashBoard/" + global.encodeObject({ IdPlaza: idPlazaSeleccionada, ClaveEstado: claveEstado, CY: idAnio }));
                        }

                    }
                }
            }
        };
        shouldComponentUpdate(nextProps: IUsuariosDashBoardRF, {}): boolean {
            return hasChanged(this.props.indicadoresEstados, nextProps.indicadoresEstados) || hasChanged(this.props.indicadoresUsuarios, nextProps.indicadoresUsuarios)
                || hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado);
        };
        onClickElementHorizontal(item: any): void {
            let prevID: number = item && item.ID ? item.ID : null;
            if (prevID > 0) {
            } else {
                prevID = null
            }
            dispatchSuccessful("load::UsuarioReporteFallaSelected", { item })
        };
        render(): JSX.Element {
            let $page: any = $ml[''];
            let IndicaActualizando: any = isSuccessful(this.props.indicadoresUsuarios) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.indicadoresUsuarios;
            if (isSuccessful(this.props.indicadoresUsuarios)) {
                let nuevoItem: any = {};
                let nuevoItemFase: any = {};
                let nuevoElemento: any = 'SI';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave === 'TODOS') {
                        nuevoElemento = 'NO'
                    }
                }
                if (nuevoElemento === 'SI') {
                    nuevoItemFase['ID'] = null;
                    nuevoItemFase['Clave'] = ' ';
                    nuevoItemFase['Nombre'] = ' ';
                    let totalFases: number = 0;
                    let totalCantidadActivas: number = 0;
                    let totalCantidadSuspendidas: number = 0;
                    let totalCantidadPorVencer: number = 0;
                    let totalCantidadVencidas: number = 0;
                    let totalCantidadAtendidas: number = 0;
                    let totalCantidadReprogramadas: number = 0;

                    getData(this.props.indicadoresUsuarios).forEach((value: any, index: number): any => {
                        totalCantidadActivas += value.CantidadActivas;
                        totalCantidadSuspendidas += value.CantidadSuspendidas;
                        totalCantidadPorVencer += value.CantidadPorVencer;
                        totalCantidadVencidas += value.CantidadVencidas;
                        totalCantidadAtendidas += value.CantidadAtendidas;
                        totalCantidadReprogramadas += value.CantidadReprogramadas;
                    });
                    nuevoItem['ID'] = null;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    nuevoItem['Fase'] = nuevoItemFase;
                    nuevoItem['CantidadActivas'] = totalCantidadActivas;
                    nuevoItem['CantidadSuspendidas'] = totalCantidadSuspendidas;
                    nuevoItem['CantidadPorVencer'] = totalCantidadPorVencer;
                    nuevoItem['CantidadVencidas'] = totalCantidadVencidas;
                    nuevoItem['CantidadReprogramadas'] = totalCantidadReprogramadas;
                    nuevoItem['CantidadAtendidas'] = totalCantidadAtendidas;

                    itemsModificados.data.unshift(nuevoItem);
                }
                IndicaActualizando = '';
            }
            let items: DataElement = itemsModificados;
            let data: any[] = global.getData(items, []);

            return <Column size={[12, 12, 10, 10]}  >
                <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                    <div className="portlet-body">
                        <Row className="timeline-expediente" >
                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10" style={{ paddingBottom: "20px" }}>
                                <span><i className="fas fa-user">&nbsp;</i><h5 style={{ margin: 0, display: "inline-block" }}> Usuarios </h5></span>
                            </Column>
                            <Column size={[12, 12, 12, 12]} className="events-container" >
                                    <div>
                                        {IndicaActualizando ? IndicaActualizando :
                                            <EKHorizontalTimeLine
                                                items={items}
                                                customScroll={true}
                                                desactivarFondo={true}
                                                onClickElementHorizontal={this.onClickElementHorizontal}
                                                page={$page}
                                                tipoPresentacion={5} />
                                        }
                                    </div>
                            </Column>
                        </Row>
                    </div>
                </div>
            </Column>;
        }
    });
};

import DashBoardUsuarios = EK.Modules.SCV.Pages.postventa.RUBA.DashBoardUsuariosGeneral.DashBoardUsuariosBase
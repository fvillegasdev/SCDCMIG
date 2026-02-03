    // A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Ventas {
    "use strict";
    const COTIZACIONES_UBICACIONES_ID: string = "cotizaciones$Ubicaciones";
    const COTIZACIONES_FINANCIAMIENTO_ID: string = "cotizaciones$Financiamiento";
    const COTIZACIONES_PP_CONCEPTOS_ID: string = "cotizaciones$PP$Conceptos";

    interface ILinkCotizacionProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export class LinkCotizacion extends React.Component<ILinkCotizacionProps, {}> {
        constructor(props: ILinkCotizacionProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };
        onShow(): void {
            let modalCotizacion: any = $("#modalCotizacion");
            modalCotizacion.modal();
        };
        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <a className="btn green btn-sm btn-block" href="javascript:void(0)" onClick={this.onShow}>
                    <i className="fa fa-user"></i> Ver Cotización
                </a>
                <ModalCotizacion />
            </Column>
        }
    };

    export class LinkBarCotizacion extends React.Component<ILinkCotizacionProps, {}> {
        constructor(props: ILinkCotizacionProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };
        onShow(): void {
            let modalCotizacion: any = $("#modalCotizacion");
            modalCotizacion.modal();
        };
        render(): JSX.Element {
            return <div style={{display: "inline-block"}}><Button onClick={this.onShow} icon="fas fa-file-invoice-dollar" className="btn-default-ek btn-sm" color="white"></Button><ModalCotizacion /></div>;
        }
    };

    interface IModalCotizacionProps extends page.IProps, grid.IColumn {
        onHide?: () => void;
        cotizacion?: any;
    };

    //***Modal para mostrar la información de la cotización seleccionada***//
    let ModalCotizacion: any = global.connect(class extends React.Component<IModalCotizacionProps, {}> {
        constructor(props: IModalCotizacionProps) {
            super(props);
        };
        static defaultProps: IModalCotizacionProps = {
            cotizacion: global.createDefaultStoreObject({})
        };
        refs: {
            modal: Element;
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            cotizacion: state.global.venta$Cotizacion
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => {
                global.dispatchAsync("load::venta$Cotizacion", "ventas/GetCotizacionSeleccionada/" + id);
            }
        });
        componentDidMount(): void {
            let entidad: any = global.getData(this.props.entidad);
            if (global.isSuccessful(this.props.entidad)) {
                this.props.obtenerItem(entidad.IdExpediente);
            };
        };
        componentWillReceiveProps(nextProps: IModalCotizacionProps): any {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (global.isSuccessful(nextProps.entidad)) {
                    let entidad: any = global.getData(nextProps.entidad);
                    //
                    this.props.obtenerItem(entidad.IdExpediente);
                };
            };

            if (global.hasChanged(this.props.cotizacion, nextProps.cotizacion)) {
                if (global.isSuccessful(nextProps.cotizacion)) {
                    let entidad: any = global.getData(nextProps.cotizacion);
                    let financiamiento: any[] = [];

                    if (entidad.Financiamiento) {
                        financiamiento.push(entidad.Financiamiento);
                    }

                    let conceptosPP: any[] = [];
                    if (entidad.PlanPagos) {
                        if (entidad.PlanPagos.Conceptos && entidad.PlanPagos.Conceptos.length) {
                            conceptosPP = conceptosPP.concat(entidad.PlanPagos.Conceptos);
                        }
                    }

                    global.dispatchSuccessful("global-page-data", entidad.Ubicaciones, COTIZACIONES_UBICACIONES_ID);
                    global.dispatchSuccessful("global-page-data", financiamiento, COTIZACIONES_FINANCIAMIENTO_ID);
                    global.dispatchSuccessful("global-page-data", conceptosPP, COTIZACIONES_PP_CONCEPTOS_ID);
                }
            }
        };
        header(info: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{"Cotización:"}</h6>
                    <span className="badge badge-info">{info.Nombre}</span>
                </span>
                <span>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{"Seleccionada:"}</h6>
                    <span className="badge badge-success">{EK.UX.Labels.formatDate(info.FechaSeleccion)}</span>
                </span>
            </div>
        };
        render(): JSX.Element {
            let cotizacion: any = global.getData(this.props.cotizacion);
            let usaPaquete: boolean = false;
            let desarrollo: any;
            let moneda: any;
            if (global.isSuccessful(this.props.cotizacion)) {
                let expediente = global.assign({}, cotizacion.Expediente);
                usaPaquete = expediente && expediente.TipoComercializacion ? expediente.TipoComercializacion.Paquete : false;
            };

            if (cotizacion) {
                desarrollo = global.assign({}, cotizacion.Desarrollo);
            };

            if (desarrollo) {
                moneda = desarrollo.Moneda;
            };

            const listHeaderUbicaciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        {usaPaquete ?
                            <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                            : <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        }
                        {usaPaquete ?
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Paquete"}</Column>
                            : null
                        }
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header hidden-xs hidden-sm">{"Tipo"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[2, 2, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>
            //
            const listHeaderCaracteristicas: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Característica"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>
            //
            const listHeaderFinanciamiento: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[9, 9, 9, 9]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>
            //
            const listHeaderFinanciamientoInstituciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Institución"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>

            const listHeaderPPConceptos: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "left" }} className="list-default-header bold">&nbsp;</Column>
                        <Column size={[5, 6, 4, 5]} style={{ textAlign: "left" }} className="list-default-header bold">{"CONCEPTO"}</Column>
                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "left" }} className="list-default-header bold hidden-xs">{"PLAZO"}</Column>
                        <Column size={[3, 2, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"CAPITAL"}</Column>
                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"INTERÉS"}</Column>
                        <Column size={[1, 1, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm">{"IMPORTE"}</Column>
                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"PAGADO"}</Column>
                        <Column size={[3, 2, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"SALDO"}</Column>
                    </Row>
                </Column>

            const listHeaderInstitucionConceptos: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Concepto"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Estimado"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Real"}</Column>
                    </Row>
                </Column>

            return <modal.Modal id="modalCotizacion" header={this.header(cotizacion)} addDefaultCloseFooter={true}>
                <PanelUpdate info={this.props.cotizacion}>
                    <Row>
                        <page.SectionList
                            id={COTIZACIONES_UBICACIONES_ID}
                            level={1}
                            title="Ubicaciones"
                            parent={this.props.config.id}
                            icon="fa fa-table"
                            size={[12, 12, 12, 12]}
                            listHeader={listHeaderUbicaciones}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            aggregate={(item: any, values: any) => {
                                if (!values.ImporteMoneda) values.ImporteMoneda = 0;
                                values.ImporteMoneda += item.ImporteMoneda ? item.ImporteMoneda : 0;
                                return values;
                            } }
                            listFooter={(values: any) => {
                                let importe: any;
                                if (global.isSuccessful(this.props.entidad)) {
                                    let ent: any = global.getData(this.props.entidad);
                                    if (ent.Desarrollo && ent.Desarrollo.Moneda) {
                                        importe = global.formatMoney(values.ImporteMoneda, ent.Desarrollo.Moneda);
                                    };
                                };
                                return <div>
                                    <Row>
                                        <Column size={[8, 9, 10, 9]} style={{ textAlign: "right" }}>{""}</Column>
                                        <Column size={[4, 3, 2, 2]} style={{ textAlign: "right" }}>
                                            <span className="badge badge-info list-footer-badge">
                                                {importe}
                                            </span>
                                        </Column>
                                    </Row>
                                </div>;
                            } }
                            formatter={(index: number, item: any) => {
                                let ubicacion: any = item.Ubicacion;
                                let caracteristicas: DataElement = global.createSuccessfulStoreObject(item.Caracteristicas).getActiveItems();
                                let length: number = global.getData(caracteristicas, []).length;

                                return <Row id={"row_cotizacion_ubicacion_" + item.Ubicacion.Clave} className="panel-collapsed" >
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                        <Row >
                                            <Column size={[2, 1, 1, 1]} className="listItem-center-header">
                                                <CollapseButton idElement={"row_cotizacion_ubicacion_" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                            </Column>
                                            {usaPaquete ?
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-header hidden-xs hidden-sm">{item.Paquete !== null ? item.Paquete.Nombre : ""}</Column>
                                                : <Column size={[1, 1, 1, 1]} className="listItem-default-header hidden-xs hidden-sm">{""}</Column>
                                            }
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                                <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>
                                                <span className="bold">{item.Ubicacion.Clave}</span>
                                            </Column>
                                            <Column size={[2, 2, 2, 2]}><span className="badge badge-info">{item.Ubicacion.Nombre}</span></Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header hidden-xs hidden-sm">{item.Ubicacion.TipoUbicacion.Nombre}</Column>
                                            <Column size={[3, 3, 2, 2]} className="listItem-default-header">{item.Ubicacion.Prototipo.Nombre}</Column>
                                            <Column size={[2, 2, 1, 1]} className="listItem-right-header">
                                                {global.formatMoney(item.ImporteMoneda, moneda)}
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-right-header"></Column>
                                        </Row>
                                    </Column>
                                    <Row id={"row_cotizacion_ubicacion" + index}>
                                        <Column
                                            xs={{ size: 10 }}
                                            sm={{ size: 10, offset: 1 }}
                                            md={{ size: 10, offset: 1 }}
                                            lg={{ size: 10, offset: 1 }}
                                            className="panel-detail well well-sm">
                                            <div className="note note-sucess" style={{ padding: "5px 0px", margin: 0, border: "none" }}>
                                                <Row style={{ padding: "5px 15px" }}>
                                                    <Column size={[2, 2, 2, 2]}></Column>
                                                    <Column size={[6, 6, 6, 6]}><span>PRECIO DE UBICACIÓN</span></Column>
                                                    <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ImporteUbicacion, moneda)}</Column>
                                                </Row>
                                                {ubicacion.Excedente ?
                                                    <Row style={{ padding: "5px 15px" }}>
                                                        <Column size={[2, 2, 2, 2]}></Column>
                                                        <Column size={[4, 4, 4, 4]}>
                                                            <span>METROS<sup>2</sup> EXCEDENTE</span>
                                                            <span className="badge badge-danger pull-right">{ubicacion.Excedente}&nbsp;m<sup>2</sup></span>
                                                        </Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header"></Column>
                                                    </Row> : null
                                                }
                                            </div>
                                            <List
                                                id={this.props.id + "_list"}
                                                items={caracteristicas}
                                                readonly={true}
                                                listHeader={listHeaderCaracteristicas}
                                                addRemoveButton={false}
                                                formatter={(index_c: number, item_c: any): any => {
                                                    if (item_c.VentaOpcional === true) {
                                                        return <Row id={"row_cotizacion_ubicacion" + index_c}>
                                                            <Column size={[2, 2, 2, 2]}><span className="badge badge-warning">Incluida</span></Column>
                                                            <Column size={[10, 10, 10, 10]}>{item_c.Caracteristica.Nombre}</Column>
                                                        </Row>
                                                    }
                                                    else {
                                                        return <Row id={"row_cotizacion_ubicacion" + index_c}>
                                                            <Column size={[2, 2, 2, 2]}><span className="badge badge-info">Adicional</span></Column>
                                                            <Column size={[8, 8, 8, 8]}>{item_c.Caracteristica.Nombre}</Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item_c.Importe, moneda)}</Column>
                                                        </Row>
                                                    }
                                                } } />
                                        </Column>
                                    </Row>
                                </Row>
                            } }>
                        </page.SectionList>
                        <page.SectionList
                            id={COTIZACIONES_FINANCIAMIENTO_ID}
                            level={1}
                            title="Financiamiento"
                            parent={this.props.config.id}
                            icon="fa fa-table"
                            size={[12, 12, 12, 12]}
                            listHeader={listHeaderFinanciamiento}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                let instituciones: global.DataElement = global.createSuccessfulStoreObject(item.FinanciamientoInstituciones).getActiveItems();
                                let length: number = global.getData(instituciones, []).length;
                                let importeFinanciamiento: number = 0;

                                if (instituciones && length) {
                                    let _instituciones: any[] = global.getData(instituciones, []);

                                    _instituciones.forEach((value: any, index: number) => {
                                        importeFinanciamiento += parseFloat(value.MontoCredito);
                                    });
                                }
                                let entidad: any = global.getData(this.props.entidad);
                                let moneda: any = entidad.Desarrollo ? entidad.Desarrollo.Moneda : null;

                                return <Row id={"row_cotizacion_financiamiento_" + index} className="panel-collapsed" >
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                        <Row>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                <CollapseButton idElement={"row_cotizacion_financiamiento_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                            </Column>
                                            <Column size={[9, 9, 9, 9]} className="listItem-default-header bold">
                                                <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>{item.Financiamiento.Nombre}
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                                <span className="badge badge-info list-footer-badge">{global.formatMoney(importeFinanciamiento, moneda)}</span>
                                            </Column>
                                            <Column size={[1, 1, 1, 1]}></Column>
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
                                                items={instituciones}
                                                readonly={true}
                                                listHeader={listHeaderFinanciamientoInstituciones}
                                                addRemoveButton={false}
                                                formatter={(index_i: number, item: any): any => {
                                                    let conceptos: global.DataElement = global.createSuccessfulStoreObject(item.Conceptos).getActiveItems();

                                                    return <Row id={"row_cotizacion_financiamiento_" + index_i}>
                                                        <Row id={"row_cotizacion_instituciones_" + item.Institucion.Clave} className="panel-collapsed">
                                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                                <Row>
                                                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                                        <CollapseButton idElement={"row_cotizacion_instituciones_" + item.Institucion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                                    </Column>
                                                                    <Column size={[9, 9, 9, 9]}>
                                                                        <div className="listItem-default-header bold">{item.Institucion.Nombre}</div>
                                                                        <div className="listItem-default-header italic">{item.Comentarios}</div>
                                                                    </Column>
                                                                    <Column size={[2, 2, 2, 2]} className="listItem-right-header bold">
                                                                        {global.formatMoney(item.MontoCredito, moneda)}
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
                                                                        items={conceptos}
                                                                        readonly={true}
                                                                        listHeader={listHeaderInstitucionConceptos}
                                                                        addRemoveButton={false}
                                                                        formatter={(index_c: number, item: any): any => {
                                                                            let style: React.CSSProperties = {};
                                                                            style.padding = "5px 0px";
                                                                            style.backgroundColor = item.Credito === true && item.Concepto.TipoConcepto.Clave === "IMP" ? "#E3E4F9" : null;

                                                                            return <Row id={"row_cotizacion_concepto_" + index_c}>
                                                                                <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                                                    <Row style={style}>
                                                                                        <Column size={[6, 6, 6, 6]} className="listItem-default-header bold">{item.Concepto.Nombre}</Column>
                                                                                        
                                                                                        <EK.Modules.SCV.Pages.Ventas.ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorEstimado} />
                                                                                        <EK.Modules.SCV.Pages.Ventas.ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorAutorizado} />
                                                                                    </Row>
                                                                                </Column>
                                                                            </Row>
                                                                        }} />
                                                                </Column>
                                                            </Row>
                                                        </Row>
                                                    </Row>
                                                } } />
                                        </Column>
                                    </Row>
                                </Row>;
                            } }>
                        </page.SectionList>
                        <page.SectionList
                            id={COTIZACIONES_PP_CONCEPTOS_ID}
                            level={1}
                            title="Plan de Pagos"
                            parent={this.props.config.id}
                            icon="fa fa-table"
                            size={[12, 12, 12, 12]}
                            aggregate={(item: any, values: any) => {
                                if (!values.Capital) values.Capital = 0;
                                if (!values.Interes) values.Interes = 0;
                                if (!values.Importe) values.Importe = 0;
                                if (!values.Pagado) values.Pagado = 0;
                                if (!values.Saldo) values.Saldo = 0;

                                values.Capital += item.CapitalMoneda ? item.CapitalMoneda : 0;
                                values.Interes += item.InteresMoneda ? item.InteresMoneda : 0;
                                values.Importe += item.ImporteMoneda ? item.ImporteMoneda : 0;
                                values.Pagado += item.Pagado ? item.Pagado : 0;
                                values.Saldo += item.Saldo ? item.Saldo : 0;

                                return values;
                            } }
                            listFooter={(values: any) => {
                                return <div>
                                    <Row style={{ textAlign: "center" }}>
                                        <Column size={[6, 8, 6, 7]} style={{ textAlign: "right" }}>{""}</Column>
                                        <Column size={[3, 2, 2, 1]} style={{ textAlign: "right" }}>
                                            <span className="badge badge-info list-footer-badge">
                                                {EK.UX.Labels.formatMoney(values.Capital)}
                                            </span>
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm hidden-md">
                                            <span className="badge badge-info list-footer-badge">
                                                {EK.UX.Labels.formatMoney(values.Interes)}
                                            </span>
                                        </Column>
                                        <Column size={[1, 1, 2, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm">
                                            <span className="badge badge-info list-footer-badge">
                                                {EK.UX.Labels.formatMoney(values.Capital + values.Interes)}
                                            </span>
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm hidden-md">
                                            <span className="badge badge-info list-footer-badge">
                                                {EK.UX.Labels.formatMoney(values.Pagado)}
                                            </span>
                                        </Column>
                                        <Column size={[3, 2, 2, 1]} style={{ textAlign: "right" }}>
                                            <span className="badge badge-info list-footer-badge">
                                                {EK.UX.Labels.formatMoney((values.Capital + values.Interes) - values.Pagado)}
                                            </span>
                                        </Column>
                                    </Row>
                                </div>;
                            } }
                            listHeader={listHeaderPPConceptos}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                return <Row style={{ textAlign: "left" }} id={"row_cotizacion_concepto_" + index} className="panel-collapsed" >
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                        <Row>
                                            <Column size={[2, 1, 1, 1]} >
                                                <CollapseButton idElement={"row_cotizacion_concepto_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                            </Column>
                                            <Column size={[4, 6, 4, 5]} className="bold">
                                                <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{item.Documentos ? item.Documentos.length : 0}</span>
                                                {item.ConceptoPago.Nombre}
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-left-header hidden-xs">
                                                {item.FrecuenciaPago.Nombre}
                                            </Column>
                                            <Column size={[3, 2, 2, 1]} className="listItem-right-header">
                                                {EK.UX.Labels.formatMoney(item.CapitalMoneda)}
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-right-header hidden-xs hidden-sm hidden-md">
                                                {EK.UX.Labels.formatMoney(item.InteresMoneda)}
                                            </Column>
                                            <Column size={[1, 1, 2, 1]} className="listItem-right-header hidden-xs hidden-sm">
                                                {EK.UX.Labels.formatMoney(item.ImporteMoneda)}
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} className="listItem-right-header hidden-xs hidden-sm hidden-md">
                                                {EK.UX.Labels.formatMoney(item.Pagado)}
                                            </Column>
                                            <Column size={[3, 2, 2, 1]} className="listItem-right-header">
                                                {EK.UX.Labels.formatMoney(item.ImporteMoneda - item.Pagado)}
                                            </Column>
                                        </Row>
                                    </Column>
                                    <Column
                                        xs={{ size: 10 }}
                                        sm={{ size: 10, offset: 1 }}
                                        md={{ size: 10, offset: 1 }}
                                        lg={{ size: 10, offset: 1 }}
                                        className="panel-detail well well-sm">
                                        <Column size={[12, 12, 12, 12]}> <ViewDocumentos documentos={item.Documentos} /></Column>
                                    </Column>
                                </Row>
                            } }>
                        </page.SectionList>
                    </Row>
                </PanelUpdate>
            </modal.Modal>
        }
    });
}
namespace EK.Modules.SBO.Pages {
    "use strict";
    const SECTION_BATCH: string = "SBO020";
    const SECTION_GENERARCHEQUE_ID: string = "SBO022";

    interface IConfirmacionPagosState {
        result: any;
    }

    interface IConfirmacionPagosProps extends React.Props<any> {
        pagosSelected?: any;
        banco?: any;
        cuentabancaria?: any;
        tipocheque?: any;
        pagosaGenerar?: any;
        result?: any;
        cancelClick?: (info: any) => void;
        saveClick?: (items: any) => void;
        setSelected?: (item: any) => void;
        setListClean?: () => void;
        setResultDefault?: () => void;
    }

    export class PageConfirmacionPagos extends React.Component<IConfirmacionPagosProps, IConfirmacionPagosState> {
        constructor(props: IConfirmacionPagosProps) {
            super(props);
            this.onSelectedChanged = this.onSelectedChanged.bind(this);
            this.onSaveClick = this.onSaveClick.bind(this);
            this.onCancelClick = this.onCancelClick.bind(this);
        }

        static defaultProps: IConfirmacionPagosProps = {
            result: createDefaultStoreObject([])
        };

        shouldComponentUpdate(nextProps: IConfirmacionPagosProps, nextState: IConfirmacionPagosState): boolean {
            return true;
        }

        componentDidMount(): any {
            let state: any = EK.Store.getState();
        }

        componentDidUpdate(prevProps: IConfirmacionPagosProps, prevState: IConfirmacionPagosState): any {
            if (this.props.result.data && this.props.result.data === -1) {
                warning("Error al generar los cheques");
                this.props.setResultDefault();
            }
            else if (this.props.result.data && this.props.result.data === 2) {
                success("Cheques generados con éxito");
                this.props.setListClean();
                this.props.cancelClick([]);
            }
        }

        onSelectedChanged(item: any): void {
            this.props.setSelected(item);
        }

        onSaveClick(): void {
            this.props.saveClick(this.props.pagosaGenerar.data);
        }

        onCancelClick(info: any): void {
            this.props.cancelClick(info);
        }

        fnObtenerSaldoTotal(): number {
            let retvalue: number = 0;
            for (let item of this.props.pagosaGenerar.data) {
                retvalue = retvalue + parseFloat(item.Monto);
            }
            return retvalue;
        }

        render(): JSX.Element {
            let itemsBC: any = [
                { text: "SBO", link: "/sbo" },
                { text: "Procesos Diarios", link: "/sbo/procesos" },
                { text: "Generación de Pagos", link: "/sbo/procesos/generacionpagos" },
                { text: "Cheques Automáticos", link: "/sbo/procesos/generacionpagos/chequesautomaticos" },
                { text: "Confirmación de Pagos", link: "/sbo/procesos/generacionpagos/chequesautomaticos/confirmacionpagos" }
            ];
            var saldototal = this.fnObtenerSaldoTotal().toLocaleString(undefined, { minimumFractionDigits: 2 });
            // create the page component
            let page: JSX.Element =
                <Page id="SBO022">
                    <PageBar>
                        <Breadcrumb data={itemsBC} />
                    </PageBar>
                    <Grid>
                        <Row>
                            <LeftColumn>
                                <PageToolbar>
                                    <PageTitle title="Confirmación de Pagos" />
                                    <ButtonGroup>
                                        <SaveButton onClick={this.onSaveClick} />
                                        <CancelButton onClick={this.onCancelClick} />
                                    </ButtonGroup>
                                </PageToolbar>
                                <Label label="Banco" value={this.props.banco.data.Descripcion} size={[12, 12, 4, 4]} />
                                <Label label="Cuenta Bancaria" value={this.props.cuentabancaria.data.Descripcion} size={[12, 12, 4, 4]} />
                                <Label label="Tipo de Cheque" value={this.props.tipocheque.data.Nombre} size={[12, 12, 4, 4]} />
                                <UpdateColumn info={this.props.result} text="Procesando cheques...">
                                    <Row className={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                                        <UpdateColumn info={this.props.pagosaGenerar} text="obteniendo información">
                                            <List addRemoveButton={false} readonly={true} itemClass={"list-item-content"}
                                                onItemClick={this.onSelectedChanged}
                                                items={this.props.pagosaGenerar}
                                                listHeader={
                                                    <div className={"row"} style={{ paddingLeft: "12px" }}>
                                                        <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>#Cheque</div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} style={{ "textAlign": "center", fontWeight: "bold" }}>Proveedor</div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>CC</div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} style={{ "textAlign": "center", fontWeight: "bold" }}>Concepto</div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>TM Banco</div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>Monto</div>
                                                    </div>
                                                }
                                                formatter={(index: number, item: any) => {
                                                    var monto = item.Monto.toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    var tm = (item.TipoMovimiento.Clave ? item.TipoMovimiento.Clave : "") + " " + (item.TipoMovimiento.Nombre ? item.TipoMovimiento.Nombre : "");

                                                    return <div className={"row"}>
                                                        <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "left" }}><h6>{item.NumeroCheque}</h6></div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} style={{ "textAlign": "left" }}><h6>{item.Proveedor.Nombre}</h6></div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "left" }}><h6>{(item.CC.Clave + "-" + item.CC.Nombre)}</h6></div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} style={{ "textAlign": "left" }}><h6>{item.Concepto1}</h6></div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center" }}><h6>{tm}</h6></div>
                                                        <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "right" }}><h6>{monto}</h6></div>
                                                    </div>
                                                } } />
                                        </UpdateColumn>
                                    </Row>
                                    <Row className={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                                        <div className={"col-xs-12 col-sm-12 col-md-offset-9 col-lg-1"} style={{ textAlign: "right", fontWeight: "bold", marginTop: 10 }}>Total</div>
                                        <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ textAlign: "right", fontWeight: "bold", marginTop: 10 }}> {saldototal} </div>
                                    </Row>
                                </UpdateColumn>
                            </LeftColumn>
                            <RightColumn>
                                <PortletTab id="PortletConfirmarPago">
                                </PortletTab>
                            </RightColumn>
                        </Row>
                    </Grid>
                </Page>;
            return page;
        }
    }
    //<AccionesItemTab>
    //    <Pagos$TitleAction />
    //    <Batch$Action />
    //</AccionesItemTab>
    const mapProps: any = (state: any): any => {
        return {
            pagosSelected: state.chequesautomaticos.pagosSelected,
            banco: state.bancos.selected,
            cuentabancaria: state.cuentabancaria.selected,
            tipocheque: state.chequesautomaticos.tipocheque,
            pagosaGenerar: state.chequesautomaticos.pagosaGenerar,
            result: state.chequesautomaticos.result
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            setListClean: (): void => {
                dispatchSuccessful("SBO-chequesautomaticos-pagosaGenerar", []);
                dispatchSuccessful("SBO-chequesautomaticos-pagosprogramados", []);
                dispatchSuccessful("SBO-chequesautomaticos-saveresult", []);
            },
            cancelClick: (info: any): void => {
                dispatchSync("forms-reset-state", { idForm: "chequesautomaticos" });
                go("/sbo/procesos/generacionpagos/chequesautomaticos")
            },
            setSelected: (item: any): void => {
                dispatchSuccessful("SBO-cheques-setSelected", item);
            },
            saveClick: (items: any): void => {
                dispatch(actionAsync({
                    action: "SBO-chequesautomaticos-saveresult",
                    type: HttpMethod.PUT,
                    url: "Cheques/GenerarChequesAutomaticos",
                    data: items,
                    status: AsyncActionTypeEnum.default
                }));
            },
            setResultDefault: (): void => {
                dispatchDefault("SBO-chequesautomaticos-saveresult", []);
            }
        }
    }

    const mapListProps: any = (state: any): any => {
        return {
            items: state.chequesautomaticos.pagosSelected,
        };
    };

    // Acciones
    const titleActionMapProps: any = (state: any): any => {
        return {
            title: state.cheques && state.cheques.setSelected && state.cheques.setSelected.data
                ? state.cheques.setSelected.data.Descripcion : null
        };
    };

    const actionBatchMapProps: any = (state: any): any => {
        return {
            sectionId: SECTION_BATCH,
            item: state.cheques.setSelected
        };
    };

    //let Pagos$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);
    export let Batch$Action: any = ReactRedux.connect(actionBatchMapProps, null)(EK.UX.Tabs.AccionSectionItem);
    let ListPagos: any = ReactRedux.connect(mapListProps, null)(List);
    export let ConfirmacionPagosPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageConfirmacionPagos);
}
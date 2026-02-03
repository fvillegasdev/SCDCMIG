
//namespace EK.Modules.SBO.Pages {
//    "use strict";
//    const PAGE_ID: string = "SBO020";
//    const idForm: string = "batch";

//    interface IBatchProps extends React.Props<any> {        
//        setSelected?: (item: any) => void;
//        dataTest?: any[];
//        bancos?: any[];
//        chequeMinimo?: any;
//        chequeMaximo?: any;
//        defaultValueObject?: any;
//        changeBancos?: (banco: any) => void;
//        changeCuenta?: (cuenta: any) => void;
//        confirmBatch?: (info: any) => void;
//        cancelBatch?: () => void;
//        paramsForm?: any;
//        cheques?: any;
//        bancoSel?: any;
//        cuentaSel?: any;
//        setListSelected?: (listItems: any[]) => void;
//        ListItemsSelected?: any[];
//        total?: any;
//        setTotalBatch?: (item: any) => void;
//        compania?: any;
//        checkedAll?: string;
//        selAll?: (items: any[],listSelected: any[],total: number) => void;
//        desSelAll?: (items: any[], listSelected: DataElement, total: number) => void;
//        cargaDatos?: () => void;
//    }

//    export class PageBatchElectronico extends React.Component<IBatchProps, IBatchProps> {
//        constructor(props: IBatchProps) {
//            super(props);

//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//            this.onSelectedCheckChanged = this.onSelectedCheckChanged.bind(this);
//            this.onSelectedAll = this.onSelectedAll.bind(this);
//            this.onChangeCuenta = this.onChangeCuenta.bind(this);
//            this.confirmBatch = this.confirmBatch.bind(this);
//            this.cancelarBatch = this.cancelarBatch.bind(this);
            
//        }

//        static defaultProps: IBatchProps = {                     
//            defaultValueObject: createDefaultStoreObject()
//        };



//        shouldComponentUpdate(nextProps: IBatchProps, nextState: IBatchProps): boolean {
//            return true; //getTimestamp(this.props.cheques) != getTimestamp(nextProps.cheques);
            
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }
//        onSelectedCheckChanged(item: any): void {
//            let LstItems: any[] = [];
//            let LstCheques: any[] = [];
//            LstItems = this.props.ListItemsSelected;
//            LstCheques = this.props.cheques.data;
//            let IDCheque: number = item.currentTarget.dataset.id;
//            let totalMount: number = 0.0;            

//            if (item.currentTarget.checked === false) {
//                var index = LstItems.indexOf(IDCheque);
//                if (index >= 0) {
//                    LstItems.splice(index, 1);
//                    this.props.setListSelected(LstItems);
                                
//                }
//            }
//            else {
//                var index = LstItems.indexOf(IDCheque);
//                if (index === -1) {
//                    LstItems.push(IDCheque);
//                    this.props.setListSelected(LstItems);
//                }                              
//            }

//            if (LstItems.length > 0) {
//                for (let it of LstCheques) {
//                    for (let y of LstItems) {
//                        if (it.ID === parseInt(y)) {
//                            totalMount += it.Monto;
//                        }
//                    }                    
//                }
//            }
//             this.props.setTotalBatch(totalMount);
//        }

//        onSelectedAll(item: any): void {
//            let LstItems: any[] = [];
//            let LstCheques: any[] = [];
//            LstItems = this.props.ListItemsSelected;
//            LstCheques = this.props.cheques.data;
//            let IDCheque: number = item.currentTarget.dataset.id;
//            let totalMount: number = 0.0;

//            if (item.currentTarget.checked === false) {
//                let index: number = 0;
//                for (let it of LstCheques) {
//                    index = LstItems.indexOf(it.ID);
//                    if (index >= 0) {
//                        LstItems.splice(index, 1);
//                        $("input#chkSelectItem_" + it.ID)[0].removeAttribute("checked");                        
//                        totalMount = 0;
//                    }
//                }                
//                this.props.desSelAll(LstCheques, createSuccessfulStoreObject([]), 0);                  
//                $("#chkSelectAll")[0].removeAttribute("checked");
//            }
//            else {
//                LstItems = [];
//                for (let it of LstCheques) {
//                    LstItems.push(it.ID);
//                    $("input#chkSelectItem_" + it.ID)[0].setAttribute("checked", "true");                    
//                    totalMount += it.Monto;
//                }                                
//                this.props.selAll(LstCheques, LstItems, totalMount);
//                $("#chkSelectAll")[0].setAttribute("checked", "true");
//            }                            
//        }

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            this.props.cargaDatos();
//        }

//        onChangeCuenta(cuenta: any): void {
//            if (cuenta !== undefined) {
//                this.props.changeCuenta(cuenta);
//            }            
//        }

//        confirmBatch(info: any): void {
//            let LstIndx: any[] = [];
//            let LstCheques: any[] = [];
//            let LstItemsSelected: any[] = [];
//            LstIndx = this.props.ListItemsSelected;
//            LstCheques = this.props.cheques.data;

//            if (LstIndx.length === 0) {
//                warning("Seleccione los cheques que desea procesar");
//            }
//            else {
//                let CtaBankNotFound: boolean = false;
//                for (let x of LstIndx) {
//                    for (let y of LstCheques) {
//                        if (parseInt(x) === y.ID) {
//                            LstItemsSelected.push(y);
//                            if (y.Proveedor.CuentaBancaria.trim() === "") {
//                                CtaBankNotFound = true;
//                            }
//                        }                        
//                    }
//                }
//                if (CtaBankNotFound === true) {
//                    warning("Existen proveedores sin cuenta bancaria configurada, verifique.", "Error en cuenta bancaria de proveedor");
//                }
//                else {
//                    this.props.confirmBatch(LstItemsSelected);
//                }
                
//            }            
//        }
//        cancelarBatch(info: any): void {
//            this.props.cancelBatch();
//        }

       

//        render(): JSX.Element {
//            this.state = this.props;

//            let itemsBC: any = [
//                { text: "SBO", link: "/sbo" },
//                { text: "Procesos Diarios", link: "/sbo/procesos/generacionpagos" },
//                { text: "Batch", link: "/sbo/procesos/generacionpagos/batch" }
//            ];

//            let columns: any[] = [
//                { "title": "Cheque", "data": "cheque" },
//                { "title": "Proveedor", "data": "proveedorNombre" },
//                { "title": "C.C.", "data": "ccDescripcion" },
//                { "title": "T.M.", "data": "tmDescripcion" },
//                { "title": "Fecha", "data": "Fecha" },
//                { "title": "Monto", "data": "Monto" },
//                { "title": "Seleccionar", "data": "Estatus", render: EK.UX.Labels.formatCheck },
//                { "title": "Factura", "data": "Factura" },
//                { "title": "F. Vencimiento", "data": "FechaVencimiento" },
//                { "title": "C.C", "data": "CC" },
//                { "title": "O.C.", "data": "OrdenCompra" },
//                { "title": "Concepto", "data": "Concepto" },
//                { "title": "Monto", "data": "MontoDetalle" }

//            ];

//            let columnsInfo: any[] = [
//                { "title": "Cheque", "data": "NumeroCheque" },
//                { "title": "Proveedor", "data": "Proveedor.Nombre" },
//                { "title": "C.C.", "data": "cc.Nombre" },
//                { "title": "T.M.", "data": "TipoMovimiento.Descripcion" },
//                { "title": "Fecha", "data": "FechaMovimiento" },
//                { "title": "Monto", "data": "Monto" },               
//                { "title": "Concepto", "data": "Concepto1" },
//                { "title": "Monto", "data": "MontoDetalle" }
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title="Generación de Batch electrónico" breadcrumb={itemsBC}>
//                    <PageButtons>
//                        <Button icon={"fa fa-check"} text="Continuar" iconOnly={false} inverse={true} onClick={this.confirmBatch} color={ColorEnum.greenSharp} />
//                        <Button icon={"fa fa-times"} text="Cancelar" iconOnly={false} inverse={true} onClick={this.cancelarBatch} color={ColorEnum.greenSharp} />
//                    </PageButtons>
//                    <Form id="Batch">
//                        <ListCheques addRemoveButton={false} readonly={true} itemClass={"list-item-content"} onItemClick={this.onSelectedChanged}
//                            listHeader={
//                                <div className={"row"} style={{
//                                    paddingLeft: "2px", paddingBottom: "5px", backgroundColor: "rgb(81, 107, 167)",
//                                    paddingTop: "5px", marginRight: "0", marginLeft: "0", fontSize: "12px", color: "#fff"
//                                }}>
//                                    <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>
//                                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline" style={{ textAlign: "center" }}>
//                                            <input data-index={"0"} id={"chkSelectAll"} onClick={this.onSelectedAll} type="checkbox" value={"false"} />
//                                            <span></span></label>
//                                    </div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>Cheque</div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-3"} style={{ "textAlign": "center", fontWeight: "bold" }}>Concepto</div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>C.C.</div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>Fecha</div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>T.M.</div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>Monto</div>
//                                </div>
//                            }
//                            formatter={(index: number, item: any) => {
//                                return <div className={"row"}>
//                                    <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"}>
//                                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline" style={{ textAlign: "center" }}>
//                                            <input className="chkItem" data-index={"0"} id={"chkSelectItem_" + item.ID} onClick={this.onSelectedCheckChanged} type="checkbox" value={this.props.checkedAll} data-id={item.ID} />
//                                            <span></span></label>
//                                    </div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center" }}><h6>{item.NumeroCheque}</h6></div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-3"} style={{ "textAlign": "center" }}><h6>{item.Concepto1}</h6></div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center" }}><h6>{item.cc.Nombre}</h6></div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center" }}><h6>{item.FechaMovimiento.toLocaleDateString()}</h6></div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center" }}><h6>{item.TipoMovimiento.Descripcion}</h6></div>
//                                    <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center" }}><h6>{formatMoney(item.Monto)}</h6></div>
//                                </div>
//                            } }
//                            />
//                        <ConnectedTotal id="lblTotal" label={"Total a pagar:"} hAlign={grid.HAlignmentEnum.right} size={[12, 12, 12, 4]} mask={"$999,999.99"} />
//                    </Form>            
//                    <PageFilter>
//                        <CollapsePanel id={"idFilter"} title={"Filtros"} >
//                            <Form id="Filters">
//                                <BancoDDL
//                                    id="Banco"
//                                    label="Banco"
//                                    size={[12, 12, 12, 12]}
//                                    helpLabel="Seleccione el nombre del banco"
//                                    style={{ marginBottom: 0 }}
//                                    itemKey={"ID"}
//                                    itemValue={"Descripcion"}
//                                    />
//                                <CuentaBancariaDDL
//                                    id="CuentaBancaria"
//                                    label="Cuenta Bancaria"
//                                    size={[12, 12, 12, 12]}
//                                    helpLabel="Seleccione la cuenta bancaria"
//                                    style={{ marginBottom: 0 }}
//                                    itemKey={"ID"}
//                                    itemValue={"Descripcion"}
//                                    extrafn={this.onChangeCuenta}
//                                    />

//                                <InpChequeMin label={"Cheque Inicial"} hasValidationError={true}
//                                    helpLabel={"Capture el número de cheque inicial"} required={true}
//                                    size={[12, 12, 12, 12]} mask={"999999[99]"} />
//                                <InpChequeMax label={"Cheque Inicial"} hasValidationError={true}
//                                    helpLabel={"Capture el número de cheque inicial"} required={true}
//                                    size={[12, 12, 12, 12]} mask={"999999[99]"} />
//                                <Row style={{ marginLeft: 100 }}>
//                                    <FilterButton icon={"fa fa-table"} iconOnly={false} inverse={false} color={ColorEnum.greenSharp} text="Consultar" />
//                                </Row>
//                            </Form>
//                        </CollapsePanel>
//                    </PageFilter>
//                </PageV2>;

//            return page;
//        }
//    }


//    function formatMoney(value:any){
//        let newVal: any;
//        if (value === undefined) { return "0.0"; }
//        newVal ="$" + value.toFixed(2).replace(/./g, function (c, i, a) {
//            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
//        });
//        return newVal;
//    }
//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("SBO-cheques-setSelected", item);
//            },
//            setTotalBatch: (item: any): void => {
//                dispatchSuccessful("SBO-cheques-total", item);
//            },
//            setListSelected: (listItems: any[]): void => {
//                dispatchSuccessful("SBO-cheques-listSelected", listItems);
//            },            
//            selAll: (items: any,listSelected: any[],TotalMount: number): any => {
//                dispatchSuccessful("SBO-cheques-checkListchecked", true);
//                dispatchSuccessful("SBO-cheques-listSelected", listSelected);
//                dispatchSuccessful("SBO-cheques-catalogo", items);                                
//                dispatchSuccessful("SBO-cheques-total", createSuccessfulStoreObject(TotalMount));
//            },
//            desSelAll: (items: any, listSelected: any[], TotalMount: number): any => {
//                dispatchSuccessful("SBO-cheques-checkListchecked", false);
//                dispatchSuccessful("SBO-cheques-listSelected", []);                
//                dispatchSuccessful("SBO-cheques-catalogo", items);
//                dispatchSuccessful("SBO-cheques-total", createSuccessfulStoreObject(0));
//            },
//            changeCuenta: (item: any): any => {
//                //dispatchDefault("CuentasBancarias-setSelected", item);
//                dispatchAsync("SBO-cheques-maxmin", "Cheques/GetChequesMaxMin/" + item.ID);
//            },
//            confirmBatch: (info: any): void => {
//                dispatchDefault("SBO-cheques-selected", info);

//                dispatchSync("forms-reset-state", { idForm: "Confirmbatch" });
//                go("/sbo/procesos/generacionpagos/batch/confirmacion")
//            },
//            cancelBatch: (): void => {
//                dispatchSync("forms-reset-state", { idForm: "bancos" });
//                go("/sbo/")
//            },
//            cargaDatos: (): void => {
//                dispatchAsync("configurarparametros-catalogo", "configurarparametros");
//            },
//        };
//    };

//    const mapFilterButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                let item: any = info.paramsForm.form;

//                let parametros: any = {
//                    "idBanco": info.bancoSel.ID,
//                    "idCuentaBancaria": info.cuentaSel.ID,
//                    "ChequeInicial": info.chequeMinimo,
//                    "ChequeFinal": info.chequeMaximo,
//                    "IdCompania": info.compania.data.ID,
//                    "TipoCheque": EK.UX.SBO.TipoChequesEnum.Electronico.toString(),
//                    "EstadoCheque": EK.UX.SBO.EstadoChequesEnum.Capturado.toString()
//                };
//                dispatchSuccessful("SBO-cheques-checkListchecked", false);
//                dispatchSuccessful("SBO-cheques-listSelected", []);
//                dispatch(actionAsync({
//                    action: "SBO-cheques-catalogo",
//                    type: HttpMethod.PUT,
//                    url: "Cheques/GetChequesBatch/",
//                    data: parametros,
//                    status: AsyncActionTypeEnum.default
//                }));
                
//                dispatchDefault("SBO-cheques-total", 0);
                
//            }
//        };
//    }


//    //
//    // map props
//    //
//    const mapProps: any = (state: any) => {
//        return {
//            bancos: state.bancos.Bancos,
//            paramsForm: state.forms.Filters,
//            cheques: state.cheques.cheques,
//            ListItemsSelected: state.cheques.chequesListSelected.data,
//            total: state.cheques.batchTotal === undefined ? 0 : state.cheques.batchTotal,
//            compania: state.global.usuariocompania,
//            checkedAll: state.cheques.chequesListChecked.data
//        };
//    }
//    const mapFilterButtonProps: any = (state: any) => {
//        return {
//            info: {
//                paramsForm: state.forms.Filters,
//                bancoSel: state.bancos.selected.data,
//                cuentaSel: state.cuentabancaria.selected.data,
//                chequeMinimo: state.cheques.chequesMaxMin.data.length === 0 ? 1 : state.cheques.chequesMaxMin.data[0].Minimo,
//                chequeMaximo: state.cheques.chequesMaxMin.data.length === 0 ? 1 : state.cheques.chequesMaxMin.data[0].Maximo,
//                compania: state.global.usuariocompania
//            },
//            visible: state.cheques.chequesMaxMin.data.length > 0       
//        };
//    }

//    const mapTableProps: any = (state: any) => {
//        return {           
//            items: state.cheques.cheques
//        };
//    }

//    //info
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.cheques.setSelected
//        };
//    };
//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.cheques.setSelected
//        };
//    };
//    // ChequeInicial
//    const ChequeInicialMapProps: any = (state: any): any => {
//        return {
//            value: state.cheques.chequesMaxMin.data.length === 0 ? 1 : state.cheques.chequesMaxMin.data[0].Minimo,
//        };
//    };
//    // Chequefinal
//    const ChequeFinalMapProps: any = (state: any): any => {
//        return {
//            value: state.cheques.chequesMaxMin.data.length === 0 ? 1 : state.cheques.chequesMaxMin.data[0].Maximo,
//        };
//    };

//    const LabelTotalMapProps: any = (state: any): any => {
//        return {
//            value: state.cheques.batchTotal.status > 0 ? (state.cheques.batchTotal.data===0?"0.0": formatMoney(state.cheques.batchTotal.data)): "0.0",
//            visible: state.cheques.batchTotal.status
//        };
//    };

   

//    export let BatchPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageBatchElectronico);    
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let FilterButton: any = ReactRedux.connect(mapFilterButtonProps, mapFilterButtonDispatchs)(Button);
//    let InpChequeMin: any = ReactRedux.connect(ChequeInicialMapProps, null)(Input);
//    let InpChequeMax: any = ReactRedux.connect(ChequeFinalMapProps, null)(Input);
//    let ListCheques: any = ReactRedux.connect(mapTableProps, null)(List);
//    let ConnectedTotal: any = ReactRedux.connect(LabelTotalMapProps, null)(Label);
    
    
    
//}
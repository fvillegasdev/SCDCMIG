
namespace EK.Modules.SBO.Pages {
    "use strict";

    const PAGE_ID: string = "SBO020";
    const idForm: string = "Confirmbatch";
    const SECTION_LAYOUT_ID: string = "SBO020$LAY";
    const SECTION_GENERARCHEQUE_ID: string = "SBO022";

    interface IConfBatchProps extends React.Props<any> {
        cargaDatos?: () => void;
        setSelected?: (item: any) => void;
        dataTest?: any[];
        defaultValueObject?: any;
        cancelBatch?: (info: any) => void;
    }

    export class PageConfirmacionBatch extends React.Component<IConfBatchProps, IConfBatchProps> {
        constructor(props: IConfBatchProps) {
            super(props);

            this.onSelectedChanged = this.onSelectedChanged.bind(this);
            this.cancelBatch = this.cancelBatch.bind(this);
        }

        static defaultProps: IConfBatchProps = {           
            defaultValueObject: createDefaultStoreObject()
        };

        shouldComponentUpdate(nextProps: IConfBatchProps, nextState: IConfBatchProps): boolean {
            return false;
        }

        onSelectedChanged(item: any): void {
            this.props.setSelected(item);
        }

        componentWillMount(): any {
            let state: any = EK.Store.getState();            

        }

        cancelBatch(info: any): void {
            this.props.cancelBatch(info);
        }

        render(): JSX.Element {
            this.state = this.props;

            let itemsBC: any = [
                { text: "SBO", link: "/sbo" },
                { text: "Procesos Diarios", link: "/sbo/procesos/generacionpagos" },
                { text: "Batch", link: "/sbo/procesos/generacionpagos/batch" },
                { text: "Confirmación Batch", link: "/sbo/procesos/generacionpagos/batch/confirmacion" }
            ];


            // create the page component
            let page: JSX.Element =
                <PageV2 id="SBO020" title="Confirmación de Batch electrónico" breadcrumb={itemsBC}>
                    <PageButtons>
                        <AcceptButton icon={"fa fa-check"} iconOnly={false} inverse={true} color={ColorEnum.greenSharp} key={"AcceptButton"} text={"Aceptar"} />
                        <Button icon={"fa fa-times"} iconOnly={false} inverse={false} color={ColorEnum.greenSharp} key={"CancelButton"} text={"Cancelar"} onClick={this.cancelBatch} />
                    </PageButtons>
                            <Form id={"Confirmbatch"}>
                                <ListCheques addRemoveButton={false} readonly={true} itemClass={"list-item-content"} onItemClick={this.onSelectedChanged}
                                    listHeader={
                                        <div className={"row"} style={{ paddingLeft: "2px", paddingBottom: "5px", backgroundColor: "skyblue", paddingTop: "5px", marginRight: "0", marginLeft: "0" }}>                                            
                                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>Cheque</div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-3"} style={{ "textAlign": "center", fontWeight: "bold" }}>Concepto</div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>C.C.</div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>Fecha</div>
                                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>T.M.</div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>Monto</div>
                                        </div>
                                    }
                                    formatter={(index: number, item: any) => {
                                        return <div className={"row"}>                                           
                                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center" }}><h6>{item.NumeroCheque}</h6></div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-3"} style={{ "textAlign": "center" }}><h6>{item.Concepto1}</h6></div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center" }}><h6>{item.cc.Nombre}</h6></div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center" }}><h6>{item.FechaMovimiento.toLocaleDateString()}</h6></div>
                                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center" }}><h6>{item.TipoMovimiento.Descripcion}</h6></div>
                                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center" }}><h6>{formatMoney(item.Monto)}</h6></div>
                                        </div>
                                    } }
                                    />
                                <ConnectedTotal id="lblTotal" label={"Total a pagar:"} hAlign={grid.HAlignmentEnum.right} size={[12, 12, 12, 12]} />
                            </Form>
                </PageV2>;

            return page;
        }
    }
    //<AccionesItemTab>
    //    <Batch$TitleAction />
    //    <Batch$Layout$Action />
    //    <Batch$GenerarLayout$Action />
    //</AccionesItemTab>  
    function formatMoney(value: any) {
        let newVal: any;

        newVal = "$" + value.toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
        return newVal;
    }
    //
    // map dispatchs
    //
    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            setSelected: (item: any): void => {
                dispatchSuccessful("SBO-cheques-setSelected", item);
            },
            cargaDatos: (): void => {
                dispatchAsync("configurarparametros-catalogo","configurarparametros");
            },
            cancelBatch: (info: any): void => {
                dispatchSuccessful("SBO-cheques-listSelected", []);                
                dispatchSuccessful("SBO-cheques-total", createSuccessfulStoreObject(0));
                dispatchSync("forms-reset-state", { idForm: "Batch" });
                go("/sbo/procesos/generacionpagos/batch")
            }
        };
    };

    const mapAcceptButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let items: any = info.items;
                let params: any = info.parameters;
                let valParam: any = "";

                for (let x of params) {
                    if (x.Parametro.Nombre === "Directorio Descargas") {
                        valParam = x.Valor;
                    }
                }

                let dataSend: any = [{
                    data: items,
                    path: valParam
                }];

                dispatch(actionAsync({
                    action: "SBO-cheques-catalogo",
                    type: HttpMethod.PUT,
                    url: "Cheques/CreateBatch/",
                    data: dataSend,
                    status: AsyncActionTypeEnum.default
                }));                

                success("Se ha generado correctamente el archivo batch ");
            }
        };
    }

    //
    // map props
    //

    const mapAcceptButtonProps: any = (state: any) => {
        return {
            info: {
                items: state.cheques.chequesSelected,
                parameters: state.configurarparametros.configurarparametros.data
            }
        };
    }

    const tableBatchsMapProps: any = (state: any): any => {
        return {
            items: state.cheques.chequesSelected
        };
    };
    const LabelTotalMapProps: any = (state: any): any => {
        return {            
              value: state.cheques.batchTotal.status > 0 ? (state.cheques.batchTotal.data === 0 ? "0.0" : formatMoney(state.cheques.batchTotal.data)) : "0.0"
        };
    };
    // Acciones
    const titleActionMapProps: any = (state: any): any => {
        return {
            title: state.cheques && state.cheques.setSelected && state.cheques.setSelected.data
                ? state.cheques.setSelected.data.Descripcion : null
        };
    };
    const actionLayoutMapProps: any = (state: any): any => {
        return { sectionId: SECTION_LAYOUT_ID, item: state.cheques.setSelected };
    };

    const actionGLayoutMapProps: any = (state: any): any => {
        return { sectionId: SECTION_GENERARCHEQUE_ID, item: state.cheques.setSelected };
    };

    export let ConfirmacionBatchPage: any = ReactRedux.connect(null, mapDispatchs)(PageConfirmacionBatch);
    let TableBatchs: any = ReactRedux.connect(tableBatchsMapProps, null)(DataTableExt);   
    
    let ListCheques: any = ReactRedux.connect(tableBatchsMapProps, null)(List);
    let ConnectedTotal: any = ReactRedux.connect(LabelTotalMapProps, null)(Label);
    let AcceptButton: any = ReactRedux.connect(mapAcceptButtonProps, mapAcceptButtonDispatchs)(Button);

    //export let Batch$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);
    export let Batch$Layout$Action: any = ReactRedux.connect(actionLayoutMapProps, null)(EK.UX.Tabs.AccionSectionItem);
    export let Batch$GenerarLayout$Action: any = ReactRedux.connect(actionGLayoutMapProps, null)(EK.UX.Tabs.AccionSectionItem);
}
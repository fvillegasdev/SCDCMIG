//namespace EK.Modules.SBO.Pages {
//    "use strict";

//    const idForm: string = "capturacheque"
//    const PAGE_ID: string = "SBO006";

//    interface IChequesProps extends React.Props<any> {
//        cargaDatos: () => void;
//        setSelected: (item: any) => void;
//        global?: any;
//        compania?: any;
//        changeBancos?: (banco: any, compania: number) => void;
//        changeCuenta?: (cuenta: any) => void;

//    }

//    export class PageCapturaCheque extends React.Component<IChequesProps, IChequesProps> {
//        constructor(props: IChequesProps) {
//            super(props);

//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//            this.onChangeBancos = this.onChangeBancos.bind(this);
//            this.onChangeCuenta = this.onChangeCuenta.bind(this);
//        }

//        shouldComponentUpdate(nextProps: IChequesProps, nextState: IChequesProps): boolean {
//            return false;
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);

//        }

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            //   this.props.cargaDatos();

//        }

//        onChangeBancos(banco: any, compania: number): void {
//            this.props.changeBancos(banco, compania);
//        }
//        onChangeCuenta(cuenta: any): void {
//            this.props.changeCuenta(cuenta);
//        }

//        render(): JSX.Element {
//            let itemsBC: any = [
//                { text: "SBO", link: "/" },
//                { text: "Procesos Diarios", link: "/" },
//                { text: "Cheques", link: "/capturacheque" }
//            ];

//            let dateFormat: (data: Date, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                var pad: string = "00";
//                return (data !== undefined || data !== null) ?
//                    (pad + data.getDate().toString()).slice(-pad.length) + "/" +
//                    (pad + (data.getMonth() + 1).toString()).slice(-pad.length) + "/" +
//                    data.getFullYear() : "";
//            };
//            let fecha: string = new Date().toString();



//            let columns: any[] = [
//                { "title": "Cheque", "data": "NumeroCheque" },
//                { "title": "Cuenta", "data": "CuentaBancaria.Descripcion" },
//                { "title": "Descripción", "data": "Descripcion" },
//                { "title": "Tipo Cheque", "data": "TipoCheque", render: EK.UX.Labels.formatTipoCheque },
//                { "title": "Fecha", "data": "FechaMovimiento", "render": dateFormat },
//                { "title": "Monto", "data": "Monto", render: EK.UX.Labels.formatCurrency },
//                { title: "Estatus", data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title="Administración de Cheques" breadcrumb={itemsBC}>
//                    <PageButtons>
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>

//                    <PageFilter>
//                        <CollapsePanel id={"idFilter"} title={"Filtros"} >
//                        <Form id="filtros">
//                            <BancoDDL
//                                id="Banco"
//                                label="Banco"
//                                size={[12, 12, 12, 12]}
//                                helpLabel="Seleccione el nombre del banco"
//                                style={{ marginBottom: 0 }}
//                                itemKey={"ID"}
//                                itemValue={"Descripcion"}
//                                change={this.onChangeBancos}

//                            />
//                            <CuentaBancariaDDL
//                                id="CuentaBancaria"
//                                label="Cuenta Bancaria"
//                                size={[12, 12, 12, 12]}
//                                helpLabel="Seleccione la cuenta bancaria"
//                                style={{ marginBottom: 0 }}
//                                itemKey={"ID"}
//                                itemValue={"Descripcion"}
//                                change={this.onChangeCuenta}
//                            />

//                            <DatePicker id="FechaInicio" label="Fecha desde" size={[12, 12, 12, 12]}
//                                validations={[
//                                    validations.lessEqualThan("FechaFin", "FECHA, la fecha de inicio debe ser menor a la fecha de finalización")
//                                ]} />
//                            <DatePicker id="FechaFin" label="Fecha hasta" size={[12, 12, 12, 12]}
//                                validations={[
//                                    validations.greaterEqualThan("FechaInicio", "FECHA, la fecha de fin debe ser mayor a la fecha de inicio")
//                                ]} />
//                            <Row style={{ marginLeft: 125 }}>
//                            <FilterButton icon={"fa fa-table"}
//                                iconOnly={false}
//                                inverse={false}
//                                color={ColorEnum.greenSharp}
//                                text="Consultar" />
//                                </Row>
//                        </Form>
//                        </CollapsePanel>
//                    </PageFilter>


//                    <TableCheques id="tblCheques" columns={columns} onRowSelected={this.onSelectedChanged} />
                        

//                </PageV2>;
//            return page;
//        }
//    }

//    //<AccionesItemTab>
//    //    <CH$TitleAction />
//    //    <CH$Action />
//    //</AccionesItemTab>   

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("SBO-cheques-setSelected", item);
//            },
//            cargaDatos: (): void => {

//                dispatchAsync("Bancos-catalogo", "Bancos/GetAll");
//            },
//            changeBancos: (item: any, compania: number): any => {
//                dispatchDefault("Bancos-setSelected", item);
//                dispatchAsync("CuentasBancarias-catalogo", "CuentaBancaria/CuentasClasificador(0/0/1/" + item + ")");
//            },
//            changeCuenta: (item: any): any => {
//                dispatchDefault("CuentasBancarias-setSelected", item);

//            },
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("sbo/procesos/capturacheque/" + info.selected.ID);
//            }
//        }
//    };

//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.cheques.setSelected.data
//            },
//            compania: state.global.usuariocompania,
//            visible: state.cheques.setSelected.data.ID !== undefined
//        };
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => go("sbo/procesos/capturacheque/nuevo")

//        }
//    };


//    const mapFilterButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                let item: any = info.paramsForm.form;

//                let parametros: any = {
//                    "idBanco": info.bancoSel.ID,
//                    "idCuentaBancaria": info.cuentaSel.ID,
//                    "FechaInicio": item.FechaInicio.value,
//                    "FechaFin": item.FechaFin.value,
//                    "IdCompania": info.compania.data.ID,


//                };

//                dispatch(actionAsync({
//                    action: "SBO-cheques-catalogo",
//                    type: HttpMethod.PUT,
//                    url: "Cheques/GetCheques/",
//                    data: parametros,
//                    status: AsyncActionTypeEnum.default
//                }));

//            }
//        };
//    };

//    const mapFilterButtonProps: any = (state: any) => {
//        return {
//            info: {
//                paramsForm: state.forms.filtros,
//                bancoSel: state.bancos.selected.data,
//                cuentaSel: state.cuentabancaria.selected.data,
//                compania: state.global.usuariocompania
//            }
//        };
//    }
//    const mapProps: any = (state: any) => {
//        return {
//            bancos: state.bancos.Bancos,
//            data: state.cheques.cheques
//        };
//    }


//    //Acciones 
//    const titleActionMapProps: any = (state: any): any => {
//        return {
//            title: isSuccessful(state.cheques.setSelected)
//                ? state.cheques.setSelected.data.NumeroCheque : null
//        };
//    };

   

//    // 
//    // connect
//    // 
//    export let CapturaChequePage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageCapturaCheque);
//    let TableCheques: any = ReactRedux.connect(mapProps, null)(DataTableExt);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let FilterButton: any = ReactRedux.connect(mapFilterButtonProps, mapFilterButtonDispatchs)(Button);
//    let InfoItem: any = ReactRedux.connect(null, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(null, null)(HistoryItemTab);
//    //  let AccionesItemTab: any = ReactRedux.connect(null, null)(Acciones$Tab);
//    //export let CH$Action: any = ReactRedux.connect(actionMapProps, null)(EK.UX.Tabs.AccionSectionItem);
//    //export let CH$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);
//}
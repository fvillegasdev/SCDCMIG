//namespace EK.Modules.Kontrol.Pages {
//    "use strict";

//    const PAGE_ID: string = "misProcesos";//"ENK022";
//    const idForm: string = "misProcesos";

//    interface IMisProcesosParameter {
//        idTipo: number;
//    }

//    interface IMisProcesosState {
//        tipoConsulta?: number;
//    }


//    interface IMisProcesosProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarDatos: (tipoConsulta: number) => void;
//        obtenerHistoria: () => void;
//        miProcesoSelected?: any;
//        misProcesos?: any;
//        misProcesosTipos?: any;
//        cargarTiposConsultas: () => void;
//        params?: any;
//        referencia?: any;
//        cargarDatosTipoConsulta?: (tipoConsulta: any) => void;
//    }

//    export class PageMisProcesos extends React.Component<IMisProcesosProps, IMisProcesosState> {
//        constructor(props: IMisProcesosProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//            this.onChangeTipoConsulta = this.onChangeTipoConsulta.bind(this);
//            this.state = { tipoConsulta: 1 };
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IMisProcesosProps, nextState: IMisProcesosState): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        onChangeTipoConsulta(info: any): void {
//            this.props.cargarDatos(info.ID);
//            this.setState({ tipoConsulta: info.ID });
//        }

//        componentDidMount(): any {
//            this.props.cargarDatos(1);

//        }

//        formatItem(index: number, title: string, description: string) {
//            var itemKey: string = "generic-item-key-" + (index).toString();
//            let isOdd = !(index % 2) ? "" : "";

//            return <tr key={itemKey} style={{ height: 25 }}>
//                <td className="bg-grey-steel bg-font-grey-steel">
//                    {title}
//                </td>
//                <td className="bg-grey-cararra bg-font-grey-cararra">
//                    {description}
//                </td>
//            </tr>;
//        }

//        /*  Render */
//        render(): JSX.Element {
//            // preserve render props
//            //this.state = this.props;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.kontrol.flujoEstatus];

//            let columns: any[] = [
//                { title: $page.grid.headers.nombreFlujo, data: "NombreFlujo" },
//                { title: $page.grid.headers.nombre, data: "Nombre" },
//                { title: $page.grid.headers.alias, data: "Alias" },
//                { title: $page.grid.headers.status, data: "StatusNombre" }
//            ];

//            //LLENA EL PORTLET DE REFERENCIA
//            let v: any[] = [];
//            let data: any[] = [];
//            if (this.props.referencia.length > 0 || this.props.referencia.RefJSON !== undefined) {
//                data = this.props.referencia.RefJSON[0] === undefined ? this.props.referencia.RefJSON : this.props.referencia.RefJSON[0];
//            }

//            if (data) {
//                let i = 0;

//                for (let e in data) {
//                    if (typeof data[e] !== "object") {
//                        v.push(this.formatItem(i++, e, data[e]));
//                    } else {
//                        if (data[e] instanceof Date) {
//                            v.push(this.formatItem(i++, e, data[e].toLocaleString()));
//                        }
//                    }
//                }
//            }

//            let tiposConsulta: any[] = [
//                {
//                    data: [{ ID: 1, Nombre: $page.opcionesConsulta.creadospormi },
//                    { ID: 2, Nombre: $page.opcionesConsulta.asignadosami },
//                    { ID: 3, Nombre: $page.opcionesConsulta.enlosqueparticipe },
//                    { ID: 4, Nombre: $page.opcionesConsulta.aprobadas },
//                    { ID: 5, Nombre: $page.opcionesConsulta.cancelados }],
//                    status: 2
//                }
//            ];
//            //value = { createSuccessfulStoreObject([]) }
//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"Workflows/Exportar?tipoconsulta=" + this.state.tipoConsulta} />
//                        <PrintButton linkTo={"Workflows/Imprimir?tipoconsulta=" + this.state.tipoConsulta} />
//                        <ViewButton />
//                    </PageButtons>
//                    <Form id={idForm} ref="form">
//                        <DropdownList
//                            id="TipoConsulta"
//                            label="Tipo Consulta"
//                            items={tiposConsulta[0]}
//                            size={[12, 12, 12, 4]}
//                            helpLabel="Seleccione el tipo de consulta"
//                            validations={[validations.required("Seleccionar el tipo de consulta")]}
//                            style={{ marginBottom: 0 }}
//                            change={this.onChangeTipoConsulta}
//                            />
//                        <DataTable id="tblProcesos" columns={columns} onRowSelected={this.onSelectedChanged} />
//                    </Form>
//                </PageV2>;
//            return page;
//            //<PageInfo >
//            //    <InfoItem />

//            //</PageInfo>

//            //<PortletTab id="portletProcesos">
//            //                                 <PortletTabPane title="Referencia" icon="fa fa-external-link" >
//            //                                     <table className="infoItem-table"><tbody>{v}</tbody></table>
//            //                                 </PortletTabPane>
//            //                                 <InfoItemTab data={this.props.miProcesoSelected} visibleColumns={columnsInfo} />                                    
//            //                             </PortletTab>

//        }
//    }

//    // Página
//    const mapProps: any = (state: any): any => {
//        return {
//            misProcesos: state.flujoInstancias.misProcesos,
//            miProcesoSelected: state.flujoInstancias.misProcesosSelected,
//            referencia: state.flujoInstancias.misProcesosSelected.data
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("misProcesos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            cargarDatos: (tipoConsulta: number): any => {
//                let key: string = "Workflows/GetMyProcess/" + tipoConsulta;
//                dispatchAsync("misProcesos-list", key);
//            },
//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                miProcesoSelected: state.flujoInstancias.misProcesosSelected.data
//            },
//            visible: state.flujoInstancias.misProcesosSelected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("/kontrol/workflows/procesos/" + info.miProcesoSelected.ID);
//            }
//        }
//    };

//    // dataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.flujoInstancias.misProcesos,
//            selectedItem: state.flujoInstancias.misProcesos.data
//        };
//    };

//    // DropDownListTipo Consulta
//    //const mapTipoConsultaDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//    //    return {
//    //        change: (tipoConsulta: any): any => {
//    //            let key: string = "Workflows/GetMyProcess/" + tipoConsulta.ID;
//    //            dispatchAsync("misProcesos-list", key);

//    //        }
//    //    }
//    //};

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.flujoInstancias.misProcesos !== undefined)
//            && (state.flujoInstancias.misProcesos.data !== undefined)
//            && (state.flujoInstancias.misProcesos.data.length > 0)
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.flujoInstancias.misProcesosSelected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.flujoInstancias.misProcesos.history.all
//        };
//    };

//    // connect 
//    export let MisProcesos: any = ReactRedux.connect(mapProps, mapDispatchs)(PageMisProcesos);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, mapDispatchs)(DataTableExt);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);

//}
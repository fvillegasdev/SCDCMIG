namespace EK.Modules.Kontrol.Pages.Modulos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("modulos", "kontrol");
    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
}

//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const idForm: string = "modulos";
//    const PAGE_ID: string = "modulos";

//    interface IModulosProps extends React.Props<any> {
//        modulos: EK.Store.IAsyncData;
//        setSelected: (item: any) => void;
//        cargarDatos: () => void;
//        history?: any;
//        selected?: any;
//        cliente?: any;
//        obtenerParametros: (idmodulo: number) => void;
//        parametros?: any;
//    }

//    class _Page extends React.Component<IModulosProps, IModulosProps> {
//        constructor(props: IModulosProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IModulosProps, nextState: IModulosProps): boolean {
//            return false;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//            this.props.obtenerParametros(item.ID);
//        };

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            if (state.modulos.modulos.status === AsyncActionTypeEnum.default ||
//                state.modulos.modulos.status === AsyncActionTypeEnum.failed) {
//                this.props.cargarDatos();
//            }
//        };


//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.modulos];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
//                { "title": $page.consulta.grid.headers.nombre, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"modulos/Exportar"} />
//                        <PrintButton linkTo={"modulos/Imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <TableModulos id={"tblModulos"} columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2 >;
//            return page;
//        }
//    }
//    //<PortletModulosParametros />
//    //
//    // map props
//    //
//    const tableModulosMapProps: any = (state: any): any => {
//        return {
//            data: state.modulos.modulos,
//            selectedItem: state.modulos.selected
//        };
//    };

//    const viewButtonMapProps: any = (state: any) => {
//        return {
//            info: state.modulos.selected,
//            visible: isSuccessful(state.modulos.selected)
//        };
//    };

//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("modulos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerParametros: (idmodulo: number): void => {
//                let key: string = "configurarparametros/modulo(" + idmodulo + ")";
//                dispatchAsync("modulos-parametros", key);
//            },
//            cargarDatos: (): any => {
//                dispatchAsync("modulos-catalogo", "modulos");
//            }
//        };
//    };

//    const viewButtonMapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                go("kontrol/modulos/" + info.data.ID);
//            }
//        };
//    };

//    const newButtonMapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => go("kontrol/modulos/nuevo")
//        };
//    };

//    // history
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.modulos.history.all
//        };
//    };

//    // infoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.modulos.selected
//        };
//    };

//    // new Button
//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/modulos/" + info.selected.ID);
//            }
//        };
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                go("kontrol/modulos/nuevo");
//            }
//        };
//    };

//    const portletParametrosMapProps: any = (state: any): any => {
//        return {
//            data: state.modulos.parametros
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.modulos.modulos !== undefined)
//            && (state.modulos.modulos.data !== undefined)
//            && (state.modulos.modulos.data.length > 0)
//        };
//    };

//    // connect page to the Main Store
//    export let Modulos: any = ReactRedux.connect(null, mapDispatchs)(_Page);
//    let TableModulos: any = ReactRedux.connect(tableModulosMapProps, null)(DataTableExt);
//    let ViewButton: any = ReactRedux.connect(viewButtonMapProps, viewButtonMapDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, newButtonMapDispatchs)(EK.UX.Buttons.NewButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let Parametros: any = ReactRedux.connect(portletParametrosMapProps, null)(ParametrosClientes);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
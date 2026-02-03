namespace EK.Modules.Kontrol.Pages.TareaEstatus {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tareaEstatus", "kontrol");
    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: config.id });
            config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <dt.PageTable columns={columns} />
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
            </page.Main>;
        };
    };
}//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "tareaEstatus";//"ENK016";
//    const idForm: string = "tareaestatus";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        obtenerHistoria: () => void;
//        selected?: any;
//    }

//    export class PageTareaEstatus extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            this.props.obtenerDatos();
//            this.props.obtenerHistoria();
//        }

//        /*  Render */
//        render(): JSX.Element {
//            this.state = this.props;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.tareaEstatus];

//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.estatus, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title} >
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(TAREASTATUS)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(TAREASTATUS)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo >
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable id={"tblTareaEstatus"} columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("tareaestatus-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                let key: string = "catalogos(tareastatus)";
//                dispatchAsync("tareaestatus-catalogo", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-tareaestatus", "catalogo(tareastatus)/history");
//            }
//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.tareaestatus.selected.data
//            },
//            visible: state.tareaestatus.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/tareaestatus/" + info.selected.ID);
//            }
//        }
//    };

//    // New Button
//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {

//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/tareaestatus/nuevo");
//            }
//        }
//    };

//    // DataTable
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.tareaestatus.tareaestatus
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.tareaestatus.selected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.tareaestatus.history.all
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.tareaestatus.tareaestatus !== undefined)
//            && (state.tareaestatus.tareaestatus.data !== undefined)
//            && (state.tareaestatus.tareaestatus.data.length > 0)
//        };
//    };

//    // Connect 
//    export let TareaEstatusPage: any = ReactRedux.connect(null, mapDispatchs)(PageTareaEstatus);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
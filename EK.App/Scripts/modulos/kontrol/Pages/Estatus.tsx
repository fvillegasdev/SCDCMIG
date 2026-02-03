namespace EK.Modules.Kontrol.Pages.Estatus {
        "use strict";
        const config: page.IPageConfig = global.createPageConfig("estatus", "kontrol");
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
                    <page.Filters>
                        <buttons.EstatusFilter />
                    </page.Filters>
                    <dt.PageTable columns={columns} />
                </page.Main>;
            };
        };
    }

//    "use strict";
//    const PAGE_ID: string = "estatus";
//    const idForm: string = "estatus";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        obtenerHistoria: () => void;
//        selected?: any;
//    }

//    export class PageEstatus extends React.Component<IProps, IProps> {
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
//            let $page: any = $ml[PAGE_ID];  
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.estatus];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
//                { "title": $page.consulta.grid.headers.puesto, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}>
//                    <PageButtons>
//                        <ViewButton />
//                    </PageButtons>
//                    <PageInfo >
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable id={"tblEstatus"} columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("estatus-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                let key: string = "catalogos(estatus)";
//                dispatchAsync("estatus-catalogo", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-estatus", "catalogo(estatus)/history");
//            }
//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.estatus.selected.data
//            },
//            visible: state.estatus.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                let $bc: any = $ml.bc;
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go($bc.kontrol.estatus.link + "/" + info.selected.ID);
//            }
//        }
//    };

//    // New Button
//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                let $bc: any = $ml.bc;
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go($bc.kontrol.estatus.link + "/nuevo");
//            }
//        }
//    };

//    // DataTable
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.estatus.estatus
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.estatus.selected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.estatus.history.all
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.estatus.estatus !== undefined)
//            && (state.estatus.estatus.data !== undefined)
//            && (state.estatus.estatus.data.length > 0)
//        };
//    };

//    // Connect 
//    export let EstatusPage: any = ReactRedux.connect(null, mapDispatchs)(PageEstatus);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//}
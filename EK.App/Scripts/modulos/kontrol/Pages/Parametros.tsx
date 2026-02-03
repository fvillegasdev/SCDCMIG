namespace EK.Modules.Kontrol.Pages.Parametros {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("parametros", "kontrol");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters);
            props.config.dispatchCatalogoBase("base/kontrol/parametros/Get/GetAllParametros/", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addNombre({ width: 20 })
                .add({ data: "Seccion.Nombre", width:20 })
                .add({ data: "TipoDato.Nombre", width: 20 })
                .add({ data: "Ambito.Nombre", width: 20 })
                .add({ data: "Modulo.Nombre", width: 10 })
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
};

//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "parametros";
//    const idForm: string = "parametros";

//    interface IProps extends React.Props<any> {
//        parametros: any;
//        history?: any;
//        selected?: any;
//        modulo?: any;
//        ambito?: any;
//        setSelected: (item: any) => void;
//        obtenerDatos: (modulo: any, ambito: any) => void;
//        obtenerHistoria: () => void;
//        obtenerAmbitos: () => void;
//        ambitos?: any;
//        modulos?: any;
//        ambitoSelect: (item: any) => void;
//        moduloSelect: (item: any) => void;
//    }

//    export class PageParametros extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
//            if ((!this.props.ambito && !nextProps.ambito) &&
//                (!this.props.modulo && !nextProps.modulo)) {
//                return false;
//            } else if ((!this.props.ambito && nextProps.ambito) ||
//                (!this.props.modulo && nextProps.modulo)) {
//                return true;
//            } else {
//                if ((this.props.ambito && this.props.ambito.timestamp !== nextProps.ambito.timestamp) ||
//                    (this.props.modulo && this.props.modulo.timestamp !== nextProps.modulo.timestamp)) {
//                    return true;
//                }
//            }
//            return false;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            //this.props.obtenerDatos(this.props.modulo, this.props.ambito);

//            //let modulo: any = (this.props.modulos && this.props.modulos.data) ? this.props.modulos.data[0] : undefined;
//            //let ambito: any = (this.props.ambitos && this.props.ambitos.data) ? this.props.ambitos.data[0] : undefined;
//            //this.props.ambitoSelect(ambito);
//            //this.props.moduloSelect(modulo);
//        }

//        componentDidUpdate(): any {
//            this.props.obtenerDatos(this.props.modulo, this.props.ambito);
//            this.props.obtenerHistoria();
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.parametros];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.seccion, "data": "Secciones.Nombre" },
//                { "title": $page.consulta.grid.headers.parametro, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.tipodato, "data": "TipoDato.Nombre" },
//                { "title": $page.consulta.grid.headers.descripcion, "data": "Descripcion" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            let idmodulo: number = (this.props.modulo && this.props.modulo.data && this.props.modulo.data.ID) ? this.props.modulo.data.ID : 0;
//            let idambito: number = (this.props.ambito && this.props.ambito.data && this.props.ambito.data.ID) ? this.props.ambito.data.ID : 0;

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"Parametros/Exportar?idmodulo=" + idmodulo + "&idambito=" + idambito} />
//                        <PrintButton linkTo={"Parametros/Imprimir?idmodulo=" + idmodulo + "&idambito=" + idambito} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageFilter>
//                        <AmbitoDDLFilter size={[12, 12, 12, 12]} />
//                    </PageFilter>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable id="tblParametros" columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    // Page
//    const mapProps: any = (state: any): any => {
//        return {
//            ambito: state.global.ambito,
//            modulo: state.global.clientemodulo,
//            ambitos: state.global.ambitos,
//            modulos: state.global.clientesmodulos
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                EK.Global.dispatchDefault("parametros-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (modulo: any, ambito: any) => {
//                if ((modulo && modulo.data && modulo.data.ID) ||
//                    (ambito && ambito.data && ambito.data.ID)) {
//                    let idmodulo: number = (modulo && modulo.data && modulo.data.ID) ? modulo.data.ID : 0;
//                    let idambito: number = (ambito && ambito.data && ambito.data.ID) ? ambito.data.ID : 0;

//                    let key: any = ["Parametros/Get/", idmodulo, "/", idambito].join("");
//                    dispatchAsync("parametros-catalogo", key);
//                } else {
//                    dispatchDefault("parametros-catalogo", []);
//                    dispatchDefault("parametros-setSelected", {});
//                }
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-parametros", "parametros/history");
//            },
//            ambitoSelect: (item: any): any => {
//                dispatchDefault("ambito-global-selected", item);
//            },
//            moduloSelect: (item: any): any => {
//                dispatchDefault("clientemodulo-global-selected", item);
//            }


//        };
//    };

//    // Button View
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.parametros.selected.data
//            },
//            visible: state.parametros.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/parametros/plantillas/" + info.selected.ID);
//            }
//        }
//    };

//    // Button New
//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/parametros/plantillas/nuevo");
//            }
//        }
//    };

//    // DataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.parametros.parametros
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.parametros.selected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.parametros.history.all
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.parametros.parametros !== undefined)
//            && (state.parametros.parametros.data !== undefined)
//            && (state.parametros.parametros.data.length > 0)
//        };
//    };

//    // connect page to the Main Store
//    export let parametrosPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageParametros);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
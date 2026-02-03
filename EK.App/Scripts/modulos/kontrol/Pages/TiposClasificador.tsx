namespace EK.Modules.Kontrol.Pages.TiposClasificador {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tiposClasificador", "kontrol");
    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters);
            var pathRoute = global.getFullUrl("/base/kontrol/tiposClasificador/Get/GetAllTiposClasificador/", "");
            config.dispatchCatalogoBase(pathRoute, f);
        };
        render(): JSX.Element {

            let formatTipo: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                if (row.CatalogosClasificadores && row.CatalogosClasificadores.ID) {
                    return "Personalizado"
                }
                else
                {
                    return "Cátalogo"
                };
            };
            let formatTotalClasificadores: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<div class='btn green-meadow btn-circle  btn-xs col-md-4'> <a style='color:white'  href='#' >" + row.Total + "</a></div>";
            };

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 20 })
                .add({ data: "CatalogoGeneral", width: 20, render: formatTipo })
                .add({ data: "TipoClasificador.Nombre", width: 20})
                .add({ data: "Total", width: 10, render: formatTotalClasificadores })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                    <TiposDDL id={"TipoClasificador"} addNewItem={"SO"}   size={[12, 4, 2, 2]} />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
}
//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "tiposClasificador";//"ENK025";
//    const idForm: string = "tiposClasificador";
    
//    interface ITiposClasificadorProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarDatos: (tiposClasificadores: any) => void;
//        obtenerHistoria: () => void;
//        selected?: any;
//        tiposClasificador?: any;
//    }

//    export class PageTiposClasificador extends React.Component<ITiposClasificadorProps, ITiposClasificadorProps> {
//        constructor(props: ITiposClasificadorProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: ITiposClasificadorProps, nextState: ITiposClasificadorProps): boolean {
//            return hasChanged(this.props.tiposClasificador, nextProps.tiposClasificador);
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            this.props.cargarDatos(this.props.tiposClasificador);
//            this.props.obtenerHistoria();
//        }

//        render(): JSX.Element {
//            this.state = this.props;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek,$bc.kontrol.cg,$bc.kontrol.tiposClasificadores];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.id, data: "ID" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.estatus, data: "IdEstatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"tiposClasificadores/Exportar"} />
//                        <PrintButton linkTo={"tiposclasificadores/imprimir(1,true)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                        <History />
//                    </PageInfo>
//                    <DataTable id="tblTiposClasificador" columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            tiposClasificador: state.clasificadores.tipoClasificadores
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("clasificadores-tipo", createSuccessfulStoreObject(item));
//                setCurrentEntity(item);
//            },
//            cargarDatos: (tipoWorkflow: any): any => {
//                let key: string = "tiposclasificadores(1,true)";
//                dispatchAsync("clasificadores-tipos", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("tiposClasificador-history", "tiposClasificadores/historyTypes");
//            }
//        };
//    };

//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.clasificadores.tipoClasificador.data
//            },
//            visible: state.clasificadores.tipoClasificador.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("/kontrol/tiposClasificador/" + info.selected.ID);
//            }
//        }
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("/kontrol/tiposClasificador/nuevo");
//            }
//        };
//    };

//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.clasificadores.tipoClasificadores,
//            selectedItem: state.clasificadores.tipoClasificador
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.clasificadores.tipoClasificador
//        };
//    };

//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.clasificadores.tiposClasificadorHistory
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.clasificadores.tipoClasificadores !== undefined)
//            && (state.clasificadores.tipoClasificadores.data !== undefined)
//            && (state.clasificadores.tipoClasificadores.data.length > 0)
//        };
//    };

//    // connect 
//    export let TiposClasificador: any = ReactRedux.connect(mapProps, mapDispatchs)(PageTiposClasificador);  
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, mapDispatchs)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
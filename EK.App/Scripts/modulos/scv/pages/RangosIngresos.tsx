namespace EK.Modules.SCV.Pages.RangosIngresos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("rangosIngresos", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 50 })
                .add({ data: "RangoInicial", width: 20, render: EK.UX.Labels.formatCurrency })
                .add({ data: "RangoFinal", width: 20, render: EK.UX.Labels.formatCurrency })
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
};

//namespace EK.Modules.SCV.Pages.RangosIngresos {
//    "use strict";
//    const PAGE_ID: string = "rangosIngresos";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerCatalogo: () => void;
//        rangosIngresos?: any;
//    }

//    export class PageRangosIngresos extends React.Component<IProps, IProps> {
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
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.rangosIngresos)) {
//                this.props.obtenerCatalogo();
//            };
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.rangosIngresos];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.rangoInicial, data: "RangoInicial" },
//                { title: $page.consulta.grid.headers.rangoFinal, data: "RangoFinal" },
//                { title: $page.consulta.grid.headers.status, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"RangosIngresos/Exportar"} />
//                        <PrintButton linkTo={"RangosIngresos/Imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            //<PageInfo><InfoItem /></PageInfo>
//            return page;
//        }
//    }

//    class $rangosIngresosPage {
//        static props: any = (state: any): any => {
//            return {
//                selected: state.rangosIngresos.selected,
//                rangosIngresos: state.rangosIngresos.rangosIngresos
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("rangosIngresos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("rangosIngresos-catalogo", "RangosIngresos/GetAll(0)");
//            }
//        });
//    }

//    export const Consulta: any =
//        ReactRedux.connect($rangosIngresosPage.props, $rangosIngresosPage.dispatchs)(PageRangosIngresos);

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.rangosIngresos.rangosIngresos
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/rangosIngresos/nuevo")
//        });

//        component: any =
//        ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.rangosIngresos.selected,
//            visible: isSuccessful(state.rangosIngresos.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/rangosIngresos/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//}
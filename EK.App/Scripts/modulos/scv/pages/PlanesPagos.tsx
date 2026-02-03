namespace EK.Modules.SCV.Pages.SCVPlanesPagos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("planesPagos", "scv");

    interface IFiltroPlanesPago extends page.IProps {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroPlanesPago, IFiltroPlanesPago> {

        onFilter(props: any, filters: any, type?: string) {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/planesPagos/GetBP/GetPlanesPago", { parametros: f });
        }

        render(): JSX.Element {

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                .add({ data: "Descripcion", width: 20 })
                .addDate({ data: "VigenciaInicio", width: 30 })
                .addDate({ data: "VigenciaFin", width: 30 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
};




//namespace EK.Modules.SCV.Pages.SCVPlanesPagos {
//    "use strict";
//    const PAGE_ID: string = "planesPagos";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        items?: any;
//    }

//    export class PageSCVPlanesPagos extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
//            return true;
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                this.props.obtenerDatos();
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.planesPagos];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.vigenciainicio, data: "VigenciaInicio", render: EK.UX.Labels.formatCellDate },
//                { title: $page.consulta.grid.headers.vigenciafinal, data: "VigenciaFin", render: EK.UX.Labels.formatCellDate },
//                { title: $page.consulta.grid.headers.estatus, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"planesPagos/Exportar"} />
//                        <PrintButton linkTo={"planesPagos/Imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    class PageTable extends React.Component<any, any> {
//        static props: any = (state: any) => ({
//            data: state.planesPagos.catalogo,
//            selectedItem: state.planesPagos.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/planesPagos/nuevo")
//        });

//        component: any =
//        ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.planesPagos.selected,
//            visible: isSuccessful(state.planesPagos.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/planesPagos/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//    class $SCVPlanesPagosPage {
//        static props: any = (state: any): any => {
//            return {
//                items: state.planesPagos.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                let selected: any = item ? item : createFailedStoreObject({});
//                dispatchSuccessful("scv-planesPagos-setSelected", selected);
//                setCurrentEntity(selected);
//            },
//            obtenerDatos: (): any => {
//                dispatchAsync("scv-planesPagos-catalogo", "planesPagos/GetAll(0)");
//            }
//        });
//    };

//    export const Consulta: any = ReactRedux.connect(
//        $SCVPlanesPagosPage.props, $SCVPlanesPagosPage.dispatchs)(PageSCVPlanesPagos);
//}
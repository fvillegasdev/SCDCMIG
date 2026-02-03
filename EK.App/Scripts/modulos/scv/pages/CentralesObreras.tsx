namespace EK.Modules.SCV.Pages.CentralesObreras {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("centralesObreras", "scv");

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
};

// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
//namespace EK.Modules.SCV.Pages.CentralesObreras {
//    "use strict";
//    const PAGE_ID: string = "centralesObreras";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarDatos: () => void;
//        items?: any;
//    }

//    export class PageCentralesObreras extends React.Component<IProps, IProps> {
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
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                this.props.cargarDatos();
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.centralesObreras];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.estatus, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"CentralesObreras/exportar"} />
//                        <PrintButton linkTo={"CentralesObreras/imprimir"} />
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
//            data: state.centralesObreras.catalogo,
//            selectedItem: state.centralesObreras.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/centralesObreras/nuevo")
//        });

//        component: any =
//        ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.centralesObreras.selected,
//            visible: isSuccessful(state.centralesObreras.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/centralesObreras/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//    class $CentralesObrerasPage {
//        static props: any = (state: any): any => {
//            return {
//                items: state.centralesObreras.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                let selected: any = item !== undefined ? item : createSuccessfulStoreObject({});
//                dispatchSuccessful("scv-centralesObreras-setSelected", selected);
//                setCurrentEntity(selected);
//            },
//            cargarDatos: (): any => {
//                dispatchAsync("scv-centralesObreras-catalogo", "CentralesObreras(0)");
//            }
//        });
//    };

//    export const Consulta: any = ReactRedux.connect($CentralesObrerasPage.props, $CentralesObrerasPage.dispatchs)(PageCentralesObreras);
//}
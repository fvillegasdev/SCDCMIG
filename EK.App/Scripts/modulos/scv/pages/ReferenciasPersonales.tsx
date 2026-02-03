namespace EK.Modules.SCV.Pages.ReferenciasPersonales {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("referenciasPersonales", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: config.id });

            config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        };
        onDelete(id: any, props: page.IProps): void {
            dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} onDelete={this.onDelete}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};


//namespace EK.Modules.SCV.Pages.ReferenciasPersonales {
//    "use strict";
//    const PAGE_ID: string = "referenciasPersonales";

//    interface IReferenciasPersonalesProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerCatalogo: () => void;
//        referenciasPersonales?: any;
//    }

//    export class PageReferenciasPersonales extends React.Component<IReferenciasPersonalesProps, IReferenciasPersonalesProps> {
//        constructor(props: IReferenciasPersonalesProps) {
//            super(props);


//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IReferenciasPersonalesProps, nextState: IReferenciasPersonalesProps): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.referenciasPersonales)) {
//                this.props.obtenerCatalogo();
//            };
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.referenciasPersonales];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.status, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(REFERENCIASPERSONALES)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(REFERENCIASPERSONALES)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            //<PageInfo><InfoItem /></PageInfo>
//            return page;
//        }
//    }

//    class $referenciasPersonalesPage {
//        static props: any = (state: any): any => {
//            return {
//                selected: state.referenciasPersonales.selected,
//                referenciasPersonales: state.referenciasPersonales.referenciasPersonales
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("referenciasPersonales-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("referenciasPersonales-catalogo", "catalogos(referenciasPersonales)");
//            }
//        });
//    }

//    export const Consulta: any =
//        ReactRedux.connect($referenciasPersonalesPage.props, $referenciasPersonalesPage.dispatchs)(PageReferenciasPersonales);

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.referenciasPersonales.referenciasPersonales
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/referenciasPersonales/nuevo")
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
//            info: state.referenciasPersonales.selected,
//            visible: isSuccessful(state.referenciasPersonales.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/referenciasPersonales/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//}
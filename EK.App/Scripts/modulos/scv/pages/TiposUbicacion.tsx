namespace EK.Modules.SCV.Pages.TiposUbicacion {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tiposUbicacion", "scv");

    export class Vista extends page.Base {
        //onFilter(props: page.IProps, filters: any): any {
        //    let f: any = global.assign(filters, { clave: config.id });

        //    config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        //};
        //onDelete(id: any, props: page.IProps): void {
        //    dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        //};
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

//namespace EK.Modules.SCV.Pages.TiposUbicacion {
//    "use strict";
//    const PAGE_ID: string = "tiposUbicacion";

//    interface ITiposUbicacionProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerCatalogo: () => void;
//        tiposUbicacion?: any;
//    }

//    export class PageTiposUbicacion extends React.Component<ITiposUbicacionProps, ITiposUbicacionProps> {
//        constructor(props: ITiposUbicacionProps) {
//            super(props);


//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: ITiposUbicacionProps, nextState: ITiposUbicacionProps): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.tiposUbicacion)) {
//                this.props.obtenerCatalogo();
//            };
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.tiposUbicacion];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.status, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(TIPOSUBICACION)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(TIPOSUBICACION)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            //<PageInfo><InfoItem /></PageInfo>
//            return page;
//        }
//    }

//    class $tiposUbicacionPage {
//        static props: any = (state: any): any => {
//            return {
//                selected: state.tiposUbicacion.selected,
//                tiposUbicacion: state.tiposUbicacion.tiposUbicacion
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("tiposUbicacion-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("tiposUbicacion-catalogo", "catalogos(tiposUbicacion)");
//            }
//        });
//    }

//    export const Consulta: any =
//        ReactRedux.connect($tiposUbicacionPage.props, $tiposUbicacionPage.dispatchs)(PageTiposUbicacion);

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.tiposUbicacion.tiposUbicacion
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/tiposUbicacion/nuevo")
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
//            info: state.tiposUbicacion.selected,
//            visible: isSuccessful(state.tiposUbicacion.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/tiposUbicacion/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//}
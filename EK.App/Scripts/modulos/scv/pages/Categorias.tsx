namespace EK.Modules.SCV.Pages.Categorias {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("categorias", "scv");

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


//namespace EK.Modules.SCV.Pages.Categorias {
//    "use strict";
//    const PAGE_ID: string = "categorias";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerCatalogo: () => void;
//        selected?: any;
//        items?: any;
//    }

//    class PageCategorias extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);

//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        };

//        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
//            return true;
//        };

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        };

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                this.props.obtenerCatalogo();
//            };
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  ///  
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.categorias];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
//                { "title": $page.consulta.grid.headers.nombre, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}   >
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(CATEGORIAS)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(CATEGORIAS)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    class $categoriasPage {
//        static props: any = (state: any): any => {
//            return {
//                selected: state.categorias.selected,
//                items: state.categorias.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("categorias-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("categorias-catalogo", "catalogos(CATEGORIAS)");
//            }
//        });
//    };

//    export const Consulta: any =
//        ReactRedux.connect($categoriasPage.props, $categoriasPage.dispatchs)(PageCategorias);

//    //
//    class PageTable extends React.Component<any, any> {
//        static props: any = (state: any) => ({
//            data: state.categorias.catalogo
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("scv/categorias/nuevo")
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
//            info: state.categorias.selected,
//            visible: isSuccessful(state.categorias.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => {
//                go("scv/categorias/" + info.data.ID);
//            }
//        });

//        component: any =
//            ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//};
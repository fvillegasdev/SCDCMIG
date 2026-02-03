//A '.tsx' file enables JSX support in the TypeScript compiler, 
//for more information see the following page on the TypeScript wiki:
//https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Prototipos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("prototipos", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;

        };
    }
}

//namespace EK.Modules.SCV.Pages.Prototipos {
//    "use strict";
//    const PAGE_ID: string = "prototipos";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerCatalogo: () => void;
//        items?: any;
//    }

//    export class PagePrototipos extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
//            return true;
//        }

//        componentDidMount(): any {
//            setCurrentEntityType(PAGE_ID);
//            if (!isLoadingOrSuccessful(this.props.items)) {
//                this.props.obtenerCatalogo();
//            };
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.prototipos];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.estatus, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"Prototipos/Exportar"} />
//                        <PrintButton linkTo={"Prototipos/Imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>
//            return page;
//        }
//    }

//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.prototipos.selected,
//            visible: isSuccessful(state.prototipos.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/prototipos/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };

//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/prototipos/nuevo")
//        });

//        component: any =
//        ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class PageTable extends React.Component<any, any> {
//        static props: any = (state: any) => ({
//            data: state.prototipos.catalogo,
//            selectedItem: state.prototipos.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    }

//    class $PrototiposPage {
//        static props: any = (state: any): any => {
//            return {
//                items: state.prototipos.catalogo
//            };
//        };
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("scv-prototipos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerCatalogo: (): any => {
//                dispatchAsync("scv-prototipos-catalogo", "Prototipos/GetAll(catalogo,0)");
//            }
//        });
//    }

//    export const Consulta: any = ReactRedux.connect($PrototiposPage.props, $PrototiposPage.dispatchs)(PagePrototipos);
//}
namespace EK.Modules.SCV.Pages.Etapas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("etapas", "scv");
    
    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({  width: 10 })
                .addNombre({ width: 30 })
                .add({ data: "PlazoEstandar", width: 10 })
                .add({ data: "MacroEtapa.Nombre", width: 20 })
                .add({ data: "FaseExpediente.Nombre", width: 20 })
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

 //.addClave({ title: 'descripcion', data: "NombreCorto", width: 10 })
 //   .addDescripcion({ title: 'descripcion', width: 50 })
 //   .add({ data: "PlazoEstandar", width: 10, render: EK.UX.Labels.formatNumeric })
 //   .add({ data: "EstatusUbicacion.Nombre", width: 20 })
//namespace EK.Modules.SCV.Pages.Etapas {
//    "use strict";
//    const PAGE_ID: string = "etapas";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        items?: any;
//    }

//    export class PageEditar extends React.Component<IProps, IProps> {
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
//                this.props.obtenerDatos();
//            };
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.etapas];


//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "NombreCorto" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.plazoestandar, data: "PlazoEstandar", render: EK.UX.Labels.formatNumeric },
//                { title: $page.consulta.grid.headers.estatusubicacion, data: "EstatusUbicacion.Nombre" },
//                { title: $page.consulta.grid.headers.estatus, render: EK.UX.Labels.formatBadgeEstatus, data: "Estatus" }
//            ];



//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"etapas/exportar"} />
//                        <PrintButton linkTo={"etapas/imprimir"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    // connect 
//    class PageTable extends React.Component<any, any>{
//        static props: any = (state: any) => ({
//            data: state.etapas.catalogo,
//            selectedItem: state.etapas.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/etapas/nuevo")
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
//            info: state.etapas.selected,
//            visible: isSuccessful(state.etapas.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/etapas/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };
//    //
//    class $etapasPage {
//        static props: any = (state: any): any => {
//            return {
//                items: state.etapas.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("etapas-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                dispatchAsync("etapas-catalogo", "etapas(0,0)");
//            }
//        });
//    };
//    export const Vista: any = ReactRedux.connect($etapasPage.props, $etapasPage.dispatchs)(PageEditar);
//}
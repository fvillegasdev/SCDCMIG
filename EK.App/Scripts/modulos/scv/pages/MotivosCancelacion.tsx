namespace EK.Modules.SCV.Pages.MotivosCancelacion {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("motivoscancelacion", "scv");

    interface lEstatus extends page.IProps {
        estatus?: any;
    };

    export let Vista: any = global.connect(class extends React.Component<lEstatus, lEstatus> {

/*
        componentWillMount() {
            let f: any = new Object();
            f = { activos: 1 };
            global.dispatchAsyncPost("global-current-catalogo", "base/scv/MotivosCancelacion/GetBP/GetAll/", { parametros: f } );
        }
        */

        onFilter(props: page.IProps, filters: any): any {

            let parametros: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            
            let solo_activos: any = new Object();
            solo_activos = { activos: 1 };

            if (parametros == null) {
                global.dispatchAsyncPost("global-current-catalogo", "base/scv/MotivosCancelacion/GetBP/GetAll/", { parametros: solo_activos });      
            }
            else {
                global.dispatchAsyncPost("global-current-catalogo", "base/scv/MotivosCancelacion/GetBP/GetAll/", { parametros: parametros });
            }
        };

        render(): JSX.Element {
            
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
               // .add({ data:"Porcentaje", width:20})
                .addEstatus({ width: 30 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <page.Filters >
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
};
//namespace EK.Modules.SCV.Pages.MotivosCancelacion {
//    "use strict";
//    const PAGE_ID: string = "motivoscancelacion";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        items?: any;
//    }

//    export class PagescvmotivosCancelacion extends React.Component<IProps, IProps> {
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
//            let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.motivos];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "ID" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.abrev, data: "Abrev" },
//                { title: $page.consulta.grid.headers.porcentaje, data: "Porcentaje" },
//                { title: $page.consulta.grid.headers.estatus, render: EK.UX.Labels.formatBadgeEstatus, data: "Estatus", }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"motivos/Exportar"} />
//                        <PrintButton linkTo={"motivos/Imprimir"} />
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
//            data: state.motivoscancelacion.catalogo,
//            selectedItem: state.motivoscancelacion.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };
//    //
//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/motivoscancelacion/nuevo")
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
//            info: state.motivoscancelacion.selected,
//            visible: isSuccessful(state.motivoscancelacion.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

//            onClick: (info: any): void => go("/scv/motivoscancelacion/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };
//    //
//    class $MotivosCancelacionPage {
//        static props: any = (state: any): any => {
//            return {
//                items: state.motivoscancelacion.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                dispatchSuccessful("scv-motivosCancelacion-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                dispatchAsync("scv-motivosCancelacion-catalogo", "motivos(0,0)");
//            }
//        });
//    };
//    export const Consulta: any = ReactRedux.connect($MotivosCancelacionPage.props, $MotivosCancelacionPage.dispatchs)(PagescvmotivosCancelacion);
//}
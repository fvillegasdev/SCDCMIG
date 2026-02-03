//A '.tsx' file enables JSX support in the TypeScript compiler, 
//for more information see the following page on the TypeScript wiki:
//https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Procesos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("procesos", "scv");

    export class Vista extends page.Base {

        onFilter(props: page.IProps, filters: any): any {

            let parametros: any = global.isEmpty(filters) ? null : global.getFilters(filters);

            let solo_activos: any = new Object();
            solo_activos = { activos: 1 };

            if (parametros == null) {
                global.dispatchAsyncPost("global-current-catalogo", "base/scv/Procesos/GetBP/GetAll/", { parametros: solo_activos });
            }
            else {
                global.dispatchAsyncPost("global-current-catalogo", "base/scv/Procesos/GetBP/GetAll/", { parametros: parametros });
            }
        };


        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "AccionProceso.Nombre", width: 15})
                .add({ data: "Responsable", width: 10})
                .add({ data: "Evento", width: 15 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;

        };
    }
}




//// A '.tsx' file enables JSX support in the TypeScript compiler,
//// for more information see the following page on the TypeScript wiki:
//// https://github.com/Microsoft/TypeScript/wiki/JSX
//namespace EK.Modules.SCV.Pages.SCVProcesos {
//    "use strict";
//    const PAGE_ID: string = "procesos";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarDatos: () => void;
//        items?: any;
//    }

//    export class cProcesos extends React.Component<IProps, IProps> {
//        constructor(props: IProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        static props: any = (state: any): any => {
//            return {
//                items: state.procesosReducer.catalogo
//            };
//        };

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            setSelected: (item: any): void => {
//                let selected: any = item !== undefined ? item : createSuccessfulStoreObject({});
//                dispatchSuccessful("scv-procesos-setSelected", selected);
//                setCurrentEntity(selected);
//            },
//            cargarDatos: (): any => {
//                dispatchAsync("scv-procesos-catalogo", "SCV/Procesos(0)");
//            }
//        });

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
//            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.procesos];
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.nombre, data: "Nombre" },
//                { title: $page.consulta.grid.headers.accion_proceso_nombre, data: "AccionProceso.Nombre" },
//                { title: $page.consulta.grid.headers.responsable, data: "Responsable" },
//                { title: $page.consulta.grid.headers.evento, data: "Evento" },
//                { title: $page.consulta.grid.headers.estatus, data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"SCV/Procesos/exportar"} />
//                        <PrintButton linkTo={"SCV/Procesos/imprimir"} />
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
//            data: state.procesosReducer.catalogo,
//            selectedItem: state.procesosReducer.selected.data
//        });

//        component: any = ReactRedux.connect(PageTable.props, null)(DataTableExt);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class NewButton extends React.Component<{}, {}> {
//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/procesos/nuevo")
//        });

//        component: any =
//        ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

//        render(): any {
//            return <this.component {...this.props} />;
//        };
//    };

//    class ViewButton extends React.Component<{}, {}> {
//        static props: any = (state: any) => ({
//            info: state.procesosReducer.selected,
//            visible: isSuccessful(state.procesosReducer.selected)
//        });

//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
//            onClick: (info: any): void => go("/scv/procesos/" + info.data.ID)
//        });

//        component: any =
//        ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

//        render(): any {
//            return <this.component {...this.props} />
//        };
//    };



//    export const Consulta: any = ReactRedux.connect(cProcesos.props, cProcesos.dispatchs)(cProcesos);
//}
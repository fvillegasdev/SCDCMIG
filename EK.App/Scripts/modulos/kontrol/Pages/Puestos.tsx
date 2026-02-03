namespace EK.Modules.Kontrol.Pages.Puestos{
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("puestos", "kontrol");
    const w: any = window;
    w.mostrarCategorias = () => {
        let identidad: any = getDataID(EK.Store.getState().global.currentEntity);
        global.asyncGet("base/scv/categorias/Get/GetAll/" + global.encodeParameters({ idPuesto: identidad }), (status: AsyncActionTypeEnum, data: any) => {
            if (status === AsyncActionTypeEnum.loading) {
            }
            if (status === AsyncActionTypeEnum.successful) {
                var valor = "Sin Categorias";
                if (data && data.length && data.length >= 1) {
                    valor = "<ul class='list-group'>";
                    for (var i = 0; i < data.length; i++) {
                        valor = valor + "<li class='list-group-item'><span>" + data[i].Nombre + "</span><span class='badge badge-success'>" + data[i].Clave + " </span> </li>";
                    }
                    valor = valor + "</ul>";
                }
                var bb: any = window["bootbox"];
                var dialog = bb.dialog({
                    title: "<span class='fa fa-cubes'></span> Categorias",
                    message: valor,
                    buttons: {
                        ok: {
                            label: "Aceptar",
                            className: 'btn-info',
                            callback: function () {
                                //Example.show('Custom OK clicked');
                            }
                        }
                    }
                });
            }
        });
    };
    interface IPuestosProps extends page.IProps {
        entidad?: any;
        categorias?: any;
    };
    export let Vista: any = global.connect(class extends React.Component<IPuestosProps, {}> {
        constructor(props: IPuestosProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.currentCatalogo,
        })
        render(): JSX.Element {
            let formatCantidadCategorias: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<a class='btn btn-circle green btn-xs' onclick='window.mostrarCategorias()'>" + row.CantidadCategorias+"</a>" ;
            };
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "Rango", width: 20 })
                .add({ data: "DatosCategorias", width: 20, render: formatCantidadCategorias })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });


}

//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "puestos";
//    const idForm: string = "puestos";

//    interface IProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: () => void;
//        obtenerHistoria: () => void;
//        selected?: any;
//    }

//    export class PagePuestos extends React.Component<IProps, IProps> {
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
//            this.props.obtenerDatos();
//            this.props.obtenerHistoria();
//        }

//        /*  Render */
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  ///  
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.puestos];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
//                { "title": $page.consulta.grid.headers.puesto, "data": "Nombre" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}   >
//                    <PageButtons>
//                        <ExcelButton linkTo={"catalogos/exportar(PUESTOS)"} />
//                        <PrintButton linkTo={"catalogos/imprimir(PUESTOS)"} />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable id={"tblPuestos"} columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("puestos-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (): any => {
//                let key: string = "catalogos(puestos)";
//                dispatchAsync("puestos-catalogo", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-puestos", "catalogo(puestos)/history");
//            }
//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.puestos.selected.data
//            },
//            visible: state.puestos.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/puestos/" + info.selected.ID);
//            }
//        }
//    };

//    // New Button
//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {

//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/puestos/nuevo");
//            }
//        }
//    };

//    // DataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.puestos.puestos
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.puestos.selected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.puestos.history.all
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.puestos.puestos !== undefined)
//            && (state.puestos.puestos.data !== undefined)
//            && (state.puestos.puestos.data.length > 0)
//        };
//    };

//    // Connect 
//    export let PuestosPage: any = ReactRedux.connect(null, mapDispatchs)(PagePuestos);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
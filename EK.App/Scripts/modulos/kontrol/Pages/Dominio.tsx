namespace EK.Modules.Kontrol.Pages.Dominios {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("dominios", "kontrol");
    const w: any = window;
    export class EstatusUsuario {
        static iconos: any = {
            'A': "glyphicon glyphicon-play",   //ACTIVO
            'W': "fas fa-exclamation-triangle",              //POR VENCER
            'V': "fa fa-times-circle",         //VENCIDO
            'S': "glyphicon glyphicon-pause",  //SUSPENDIDO
            'SINMARCA': ""                     //SIN MARCA
        };
        static iconosColor: any = {
            'A': "#8bc780",                   //ACTIVO
            'W': "#ff8f00",                   //POR VENCER
            'V': "#df0707",                   //VENCIDO
            'S': "",                          //SUSPENDIDO
            'SINMARCA': ""                    //REQUISITO VENCIDO
        };
    }
    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();

            let retValue: any;
            let Valor: any;

            let EstatusUsuario: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let bloqueado: any = row.Bloqueado ? '<span class ="badge badge-danger pull-center ek-sombra" style="font-size: 9px !important">Bloqueado</span>' : ' ';
                if (row.Estatus && row.Estatus.Clave) {
                    if (row.Estatus.Clave === 'A') {
                        retValue = '<span key="badgeEstatus" class="icon-ek-131" style="font-size: 21px; padding-right: 8px;vertical-align: middle;">' +
                            '<span class="path1"></span>'+'<span class="path2"></span></span>';
                    }
                    else if (row.Estatus.Clave === 'B') {
                        retValue = '<span key="badgeEstatus" class="icon-ek-132" style="font-size: 21px; padding-right: 8px;vertical-align: middle;">'+
                            '<span class="path1"></span>'+'<span class="path2"></span></span>';
                    }
                }
                Valor = retValue + bloqueado
               
                //return w.ReactDOMServer.renderToStaticMarkup(
                    '<div style={{ width: 100%, font-size: 11px", line-height: 1.42857, text-align: center }}>'+
                        '<div style={{ float: "left", width: "50%", text-align: center, border: "0px ", border-right none }}>{(retValue)}</div>'+

                        '<div style={{ float: "left", width: "50%", text-align: center, border: "0px ", border-right none }}>{(bloqueado)}</div></div>'
                //);
                 return Valor;
            };

            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 40 })
                .addDate({ width: 15, data: "VigenciaInicio" })
                .addDate({ width: 15, data: "VigenciaFinal" })
                .add({ data: "Estatus", width: 10, render: EstatusUsuario})
            
                //.add({ width: 10, data: "Estatus",render: EK.UX.Labels.formatBadgeEB })
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

//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "clientes";//"ENK002";
//    const idForm: string = "dominios";

//    interface IClientesProps extends React.Props<any> {
//        cargaClientes: () => void;
//        setSelected: (item: any) => void;
//        obtenerParametros: (idmodulo: number) => void;
//    }

//    export class PageClientes extends React.Component<IClientesProps, IClientesProps> {
//        constructor(props: IClientesProps) {
//            super(props);

//            this.onSelectedClienteChanged = this.onSelectedClienteChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: IClientesProps, nextState: IClientesProps): boolean {
//            return false;
//        }

//        onSelectedClienteChanged(item: any): void {
//            this.props.setSelected(item);
//            this.props.obtenerParametros(item.ID);
//        }

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            if (state.clientes.clientes.status === AsyncActionTypeEnum.default ||
//                state.clientes.clientes.status === AsyncActionTypeEnum.failed) {
//                this.props.cargaClientes();
//            }
//        }

//        render(): JSX.Element {
//            let $page: any = $ml["clientes"]; // Cambiar el nombre en opciones PAGE_ID
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.clientes];

//            let dateFormat: (data: Date, type: any, row: any) => string = (data: any, type: any, row: any) => {
//                var pad: string = "00";
//                return (data !== undefined && data !== null) ?
//                    (pad + data.getDate().toString()).slice(-pad.length) + "/" +
//                    (pad + (data.getMonth() + 1).toString()).slice(-pad.length) + "/" +
//                    data.getFullYear() : "";
//            };

//            let columns: any[] = [
//                { "title": $page.list.grid.headers.clave, "data": "Clave" },
//                { "title": $page.list.grid.headers.nombre, "data": "Nombre" },
//                { "title": $page.list.grid.headers.vigentedesde, "data": "VigenciaInicio", "render": dateFormat },
//                { "title": $page.list.grid.headers.vigentehasta, "data": "VigenciaFin", "render": dateFormat },
//                { "title": $page.list.grid.headers.estatus, data: "Estatus", render: EK.UX.Labels.formatBadgeEB }
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.list.title} >
//                    <PageButtons>
//                        <ExcelButton linkTo={"Clientes/Exportar"} />
//                        <PrintButton linkTo={"Clientes/Imprimir"} />
//                        <ViewButton />
//                        <NewButton visible={false} />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItemClientes />
//                    </PageInfo>
//                    <TableClientes id="tblClientes" columns={columns} onRowSelected={this.onSelectedClienteChanged} />
//                </PageV2 >;
//            return page;
//        }
//    }

//    //
//    // map props
//    //
//    const tableClientesMapProps: any = (state: any): any => {
//        return {
//            data: state.clientes.clientes,
//            selectedItem: state.clientes.selected
//        };
//    };

//    const historyClientesMapProps: any = (state: any): any => {
//        return { data: state.clientes.history.all };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.clientes.selected };
//    };

//    const viewButtonMapProps: any = (state: any) => {
//        return {
//            info: { selected: state.clientes.selected.data },
//            visible: state.clientes.selected.data.ID !== undefined
//        };
//    };

//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("clientes-setSelected", item);
//                setCurrentEntity(item);
//            },
//            cargaClientes: (): void => {
//                dispatchAsync("clientes-catalogo", "Clientes/GetClientes");
//            },
//            obtenerParametros: (idcliente: number): void => {
//                let key: string = "configurarparametros";
//                dispatch(EK.Global.actionAsync({
//                    action: "clientes-parametros",
//                    url: key
//                }));
//            }
//        };
//    };

//    const viewButtonMapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatchSync("forms-reset-state", { idForm });

//                go("kontrol/clientes/" + info.selected.ID);
//            }
//        };
//    };

//    const newButtonMapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => go("kontrol/clientes/nuevo")
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.clientes.clientes !== undefined)
//            && (state.clientes.clientes.data !== undefined)
//            && (state.clientes.clientes.data.length > 0)
//        };
//    };

//    // 
//    // connect
//    // 
//    export let ClientesPage: any = ReactRedux.connect(null, mapDispatchs)(PageClientes);
//    let TableClientes: any = ReactRedux.connect(tableClientesMapProps, null)(DataTableExt);
//    let InfoItemClientes: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let HistoryClientes: any = ReactRedux.connect(historyClientesMapProps, null)(HistoryItemTab);
//    let ViewButton: any = ReactRedux.connect(viewButtonMapProps, viewButtonMapDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, newButtonMapDispatchs)(EK.UX.Buttons.NewButton);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
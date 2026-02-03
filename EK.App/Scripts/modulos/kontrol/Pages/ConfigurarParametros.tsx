//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const idForm: string = "configurarparametros";
//    const PAGE_ID: string = "configurarparametros";//"ENK009";

//    export var TipoDato = {
//        STR: 'STR',
//        INT: 'INT',
//        BOOL: 'BOOL',
//        DT: 'DT',
//        DEC: 'DEC'
//    };

//    export var Ambito = {
//        CLIENTES: 'CL',
//        COMPANIAS: 'C'
//    };

//    interface IConfigurarParametrosProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        obtenerDatos: (modulo: any, compania: any) => void;
//        obtenerHistoria: () => void;
//        configurarparametros: any;
//        history?: any;
//        selected?: any;
//        modulo?: any;
//        compania?: any;
//        modulos?: any;
//        companias?: any;
//    }

//    export class PageConfigurarParametros extends React.Component<IConfigurarParametrosProps, IConfigurarParametrosProps> {
//        constructor(props: IConfigurarParametrosProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IConfigurarParametrosProps, nextState: IConfigurarParametrosProps): boolean {
//            if ((!this.props.modulo && !nextProps.modulo) &&
//                (!this.props.compania && !nextProps.compania)) {
//                return false;
//            } else if ((!this.props.modulo && nextProps.modulo) ||
//                (!this.props.compania && nextProps.compania)) {
//                return true;
//            } else {
//                if ((this.props.modulo && this.props.modulo.timestamp !== nextProps.modulo.timestamp) ||
//                    (this.props.compania && this.props.compania.timestamp !== nextProps.compania.timestamp)) {
//                    return true;
//                }
//            }
//            return false;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            this.props.obtenerDatos(this.props.modulo, this.props.compania);
//            this.props.obtenerHistoria();
//        }

//        componentDidUpdate(): any {
//            this.props.obtenerDatos(this.props.modulo, this.props.compania);
//            this.props.obtenerHistoria();
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.configurarparametros];

//            let columns: any[] = [
//                { "title": $page.consulta.grid.headers.seccion, "data": "Parametro.Secciones.Nombre" },
//                { "title": $page.consulta.grid.headers.parametro, "data": "Parametro.Nombre" },
//                { "title": $page.consulta.grid.headers.valor, "data": "Valor" },
//                { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }];

//            let modulo: any = this.props.modulos ? this.props.modulos.data[0] : undefined;
//            let compania: any = this.props.companias ? this.props.companias.data[0] : undefined;

//            let moduloId: number = (this.props.modulo && this.props.modulo.data && this.props.modulo.data.ID) ? this.props.modulo.data.ID : 0;
//            let companiaId: number = (this.props.compania && compania.data && compania.data.ID) ? compania.data.ID : 0;

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"ConfigurarParametros/Exportar?idmodulo=" + moduloId + "&idcompania=" + companiaId} />
//                        <PrintButton linkTo={"ConfigurarParametros/Imprimir?idmodulo=" + moduloId + "&idcompania=" + companiaId} />
//                        <ViewButton />
//                    </PageButtons>
//                    <PageFilter>
//                        <CompaniasDDLFilter size={[12, 12, 12, 12]} value={compania} />
//                    </PageFilter>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <DataTable id="tblConfigurarParametros" columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2 >;
//            return page;
//        }
//    }

//    // Page
//    const mapProps: any = (state: any): any => {
//        return {
//            modulo: state.global.clientemodulo,
//            modulos: state.global.clientesmodulos,
//            compania: state.global.clientecompania,
//            companias: state.global.clientescompanias
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("configurarparametros-setSelected", item);
//                setCurrentEntity(item);
//            },
//            obtenerDatos: (modulo: any, compania: any): void => {
//                let moduloId: number = (modulo && modulo.data && modulo.data.ID) ? modulo.data.ID : 0;
//                let companiaId: number = (compania && compania.data && compania.data.ID) ? compania.data.ID : 0;

//                let key: string = "configurarparametrosall(" + moduloId + "/" + companiaId + ")";
//                dispatchAsync("configurarparametros-catalogo", key);
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-configurarparametros", "configurarparametros/history");
//            },
//        }
//    };


//    // Button view
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.configurarparametros.selected.data
//            },
//            visible: state.configurarparametros.selected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("kontrol/parametros/configuracion/" + info.selected.Parametro.ID);
//            }
//        }
//    };

//    // DataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.configurarparametros.configurarparametros,
//            selectedItem: state.configurarparametros.configurarparametros
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: createSuccessfulStoreObject(state.configurarparametros.selected.data.Parametro)
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.configurarparametros.history.all
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.configurarparametros.configurarparametros !== undefined)
//            && (state.configurarparametros.configurarparametros.data !== undefined)
//            && (state.configurarparametros.configurarparametros.data.length > 0)
//        };
//    };

//    // connect
//    export let configurarParametrosPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageConfigurarParametros);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, null)(DataTableExt);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//}
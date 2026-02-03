
//namespace EK.Modules.SBO.Pages {
//    "use strict";

//    const PAGE_ID: string = "SBO002";
//    const idForm: string = "bancos"

//    interface IBancosProps extends React.Props<any> {
//        cargaDatos: () => void;
//        setSelected: (item: any) => void;

//    }

//    export class PageBancos extends React.Component<IBancosProps, IBancosProps> {
//        constructor(props: IBancosProps) {
//            super(props);

//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: IBancosProps, nextState: IBancosProps): boolean {
//            return false;
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            this.props.cargaDatos();

//        }

//        render(): JSX.Element {

//            this.state = this.props;

//            let itemsBC: any = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "Bancos", link: "sbo/bancos" }
//            ];

//            let columns: any[] = [
//                { "title": "Clave", "data": "Clave" },
//                { "title": "Descripción", "data": "Descripcion" },
//                { "title": "Sucursal", "data": "Sucursal" },
//                { "title": "Tipo Banco", "data": "BancoExtranjero" },
//                { title: "Estatus", data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
//            ];

//            // create the page component

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title="Administración de Bancos" breadcrumb={itemsBC}>
//                    <PageButtons>
//                        <ExcelButton linkTo={"Bancos/Exportar"} />
//                        <PrintButton linkTo="bancos/imprimir" />
//                        <ViewButton />
//                        <NewButton />
//                    </PageButtons>
//                    <PageInfo>
//                        <InfoItem />
//                    </PageInfo>
//                    <TableBancos id="tblBancos" columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            return page;

//        }
//    }

//    //<AccionesItemTab>
//    //    <Banco$TitleAction />
//    //    <Banco$Action />
//    //</AccionesItemTab>

//    //
//    // map props
//    //
//    const tableBancosMapProps: any = (state: any): any => {
//        return {
//            data: state.bancos.Bancos,
//            selectedItem: state.bancos.selected
//        };
//    };

//    const infoItemMapProps: any = (state: any): any =>
//    { return { data: state.bancos.selected }; };


//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.bancos.selected.data
//            },
//            visible: state.bancos.selected.data.ID !== undefined
//        };
//    };

//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("Bancos-setSelected", item);
//            },
//            cargaDatos: (): void => {
//                dispatchAsync("Bancos-catalogo", "bancos/GetAll");
//                dispatchAsync("history-Bancos", "bancos/history");
//            },
//            obtenerHistoria: (): any => {
//                dispatchAsync("history-Bancos", "bancos/history");
//            }
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("sbo/bancos/" + info.selected.ID);
//            }
//        }
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.bancos.history
//        };
//    };
//    // Acciones
//    const AccionMapProps: any = (state: any): any => {
//        return {
//            data: state.bancos.selected.data
//        };
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => go("sbo/bancos/Nuevo")
//        };
//    };
//    // 
//    // connect
//    // 
//    const titleActionMapProps: any = (state: any): any => {
//        return {
//            title: state.bancos && state.bancos.selected && state.bancos.selected.data
//                ? state.bancos.selected.data.Descripcion : null
//        };
//    };

//    const actionMapProps: any = (state: any): any => {
//        return {
//            sectionId: 'SBO003',
//            item: state.bancos.selected
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.bancos.Bancos !== undefined)
//            && (state.bancos.Bancos.data !== undefined)
//            && (state.bancos.Bancos.data.length > 0)
//        };
//    };


//    export let BancosPage: any = ReactRedux.connect(null, mapDispatchs)(PageBancos);
//    let TableBancos: any = ReactRedux.connect(tableBancosMapProps, null)(DataTableExt);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);

//    //let Accion: any = ReactRedux.connect(null, null)(Acciones$Tab);
//    let FiltrosClasificador: any = ReactRedux.connect(null, null)(FiltrosClasificadorItemTab);
//    export let Banco$Action: any = ReactRedux.connect(actionMapProps, null)(EK.UX.Tabs.AccionSectionItem);
//    //export let Banco$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);
//}
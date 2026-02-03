
//namespace EK.Modules.SBO.Pages {
//    "use strict";
//    const PAGE_ID: string = "cuentabancaria";
//    const SECTION_ID: string = "SBO003$CL";
//    const idForm: string = "cuentabancaria" 

//    interface ICuentaBancariaProps extends React.Props<any> {
//       cargaDatos: () => void;
//       setSelected: (item: any) => void;
//       item?: any;
       
//    }

//    export class PageCuentasBancarias extends React.Component<ICuentaBancariaProps, ICuentaBancariaProps> {
//        constructor(props: ICuentaBancariaProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: ICuentaBancariaProps, nextState: ICuentaBancariaProps): boolean {
//            return hasChanged(this.props.item, nextProps.item);
//        }

//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        componentDidMount(): any {
//            let state: any = EK.Store.getState();
//            this.props.cargaDatos();

//        }
        
//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.sbo.catalogo, $bc.sbo.cuentabancaria];

    
//            let columns: any[] = [
//                { title: $page.consulta.grid.headers.banco, data: "Banco.Nombre" },
//                { title: $page.consulta.grid.headers.clave, data: "Clave" },
//                { title: $page.consulta.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.consulta.grid.headers.moneda, data: "Moneda.Clave" },
//                { title: $page.consulta.grid.headers.centrocosto, data: "IdCentroCosto" },
//                { title: $page.consulta.grid.headers.tipopoliza, data: "TipoPoliza.Nombre" },
//                { title: $page.consulta.grid.headers.estatus, render: EK.UX.Labels.formatBadgeEC }
//            ];


//            // create the page component
          

//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.consulta.title} breadcrumb={bc}>
//                    <PageButtons>
//                            <ExcelButton linkTo={"CuentaBancaria/Exportar"} />
//                            <PrintButton linkTo="cuentabancaria/imprimir" />
//                            <ViewButton />
//                            <NewButton />
//                    </PageButtons>
//                    <PageFilter>
//                        <CollapsePanel id={"idFilterClasificador"} title={"Clasificadores"} ref="Clasificador">
//                            <FiltrosClasificadorItemTab claveEntidad={EK.Global.ClaveCatalogos.CB} />
//                        </CollapsePanel>
//                    </PageFilter>
//                    <PageInfo >
//                        <InfoItem />
//                    </PageInfo>
//                    <TableCuentaBancaria id="tblCB" columns={columns} onRowSelected={this.onSelectedChanged} />
//                </PageV2>;

//            return page;
//        }
//    }

//    //<AccionesItemTab>
//    //    <CB$Clasificadores$TitleAction />
//    //    <CB$Clasificadores$Action />
//    //</AccionesItemTab>

//    //
//    // map props
//    //
//    const tableCBMapProps: any = (state: any): any => {
//        return {
//            data: state.cuentabancaria.cuentabancaria
//        };
//    };

//    const historyCBMapProps: any = (state: any): any =>
//    { return { data: state.cuentabancaria.history.all }; };

//    const infoItemMapProps: any = (state: any): any =>
//    { return { data: state.cuentabancaria.selected }; };

//    const mapProps: any = (state: any): any => {
//        return {
//            item: state.cuentabancaria.selected              
//        };
//    };
  
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                selected: state.cuentabancaria.selected.data
//            },
//            visible: state.cuentabancaria.selected.data.ID !== undefined
//        };
//    };

//    //
//    // map dispatchs
//    //
//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchSuccessful("CuentasBancarias-setSelected", item);
//                setCurrentEntity(item);
//            },
//            cargaDatos: (): void => {
                
                
//                let url: string = "cuentabancaria/CuentasClasificador(0/0/1/0)";
//                dispatchAsync("CuentasBancarias-catalogo", url);
//            }
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("sbo/cuentasbancarias/" + info.selected.ID);
//            }
//        }
//    };
    
//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.cuentabancaria.history.all
//        };
//    };

//    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => go("sbo/cuentasbancarias/nuevo")
//        };
//    };

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.cuentabancaria.cuentabancaria !== undefined)
//            && (state.cuentabancaria.cuentabancaria.data !== undefined)
//            && (state.cuentabancaria.cuentabancaria.data.length > 0)
//        };
//    };


//    // 
//    // connect
//    // 
//    export let CuentasBancariasPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageCuentasBancarias);
//    let TableCuentaBancaria: any = ReactRedux.connect(tableCBMapProps, null)(DataTableExt);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//    let FiltrosClasificador: any = ReactRedux.connect(null, null)(FiltrosClasificadorItemTab);
//    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);

//    /*** BEGIN: CLASIFICADORES FORM ***/
//    interface IClasificadoresProps extends React.Props<any> {
//        data?: any;
//        entidad?: { ID: number };
//        claveEntidad?: string;
//    };

//    class ClasificadoresForm extends React.Component<IClasificadoresProps, IClasificadoresProps> {
//        constructor(props: IClasificadoresProps) {
//            super(props);

//            this.onCancelEditForm = this.onCancelEditForm.bind(this);
//            this.onSaveForm = this.onSaveForm.bind(this);
//        }

//        onCancelEditForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        onSaveForm(): void {
//            ReactRouter.hashHistory.goBack();
//        }

//        render(): JSX.Element {
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "Cuentas Bancarias", link: "sbo/cuentasbancarias" },
//                { text: "Clasificadores", href: null }
//            ];

//            let entidad: any = this.props.entidad;
//            let current: any = entidad.data;

//            let estatus: boolean = false;
//            if (entidad.Clave) {
//                estatus = EK.Global.getGlobal(Catalogos.estatus).isActive(entidad.Estatus);
//            }

//            // create the page component
//            let page: JSX.Element =
//                <Page id={SECTION_ID}>
//                    <PageBar>
//                        <Breadcrumb data={itemsBC} />
//                    </PageBar>
//                    <Grid>
//                        <Row>
//                            <LeftPanelUpdate info={entidad}>
//                                <PageToolbar>
//                                    <PageTitle title={current.Descripcion} subTitle={current.Clave} >
//                                        {EK.UX.Labels.badgeEstatus(current.Estatus)}
//                                    </PageTitle>
//                                    <ButtonGroup>
//                                        <Clasificadores$SaveButton />
//                                        <CancelButton onClick={this.onCancelEditForm} />
//                                    </ButtonGroup>
//                                    <div id="dtButtons" className="btn-group"></div>
//                                </PageToolbar>
//                                <Row style={{ marginBottom: 35 }}>
//                                    <ClasificadoresSection id={SECTION_ID} claveEntidad={EK.Global.ClaveCatalogos.CB} item={current} />
//                                </Row>
//                            </LeftPanelUpdate>
//                            <RightColumn>
//                                <PortletTab>
//                                    <Clasificadores$Tab claveEntidad={EK.Global.ClaveCatalogos.CB} item={this.props.entidad} />
//                                    <HistoryItemTab data={null} />
//                                </PortletTab>
//                            </RightColumn>
//                        </Row>
//                    </Grid>
//                </Page>;

//            return page;
//        };
//    }

//    const mapClasificadoresProps: any = (state: any): any => {
//        return {
//            entidad: state.cuentabancaria.selected,
//            claveEntidad: EK.Global.ClaveCatalogos.CB
//        };
//    };

//    const titleActionMapProps: any = (state: any): any => {
//        return {
//            title: state.cuentabancaria && state.cuentabancaria.selected && state.cuentabancaria.selected.data
//                ? state.cuentabancaria.selected.data.Descripcion : null
//        };
//    };

//    const actionMapProps: any = (state: any): any => {
//        return {
//            sectionId: SECTION_ID,
//            item: state.cuentabancaria.selected
//        };
//    };

//    export let CB$Clasificadores: any = ReactRedux.connect(mapClasificadoresProps, null)(ClasificadoresForm);
//    export let CB$Clasificadores$Action: any = ReactRedux.connect(actionMapProps, null)(EK.UX.Tabs.AccionSectionItem);
//    //export let CB$Clasificadores$TitleAction: any = ReactRedux.connect(titleActionMapProps, null)(EK.UX.Tabs.AccionTitleItem);

//    /*** END: CLASIFICADORES FORM ***/
//}

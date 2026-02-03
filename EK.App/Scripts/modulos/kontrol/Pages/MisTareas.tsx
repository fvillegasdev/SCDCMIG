namespace EK.Modules.Kontrol.Pages.FlujoTrabajoInstancia {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("taskinstance", "kontrol");
    export class TareasInstancia extends page.Base {
        render(): JSX.Element {
           

            let formatNombreUserOwner: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return row.Instancia.UserOwner.Nombre + " " + row.Instancia.UserOwner.Apellidos;
            };

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Instancia.Workflow.Tipo.Clave", width: 15 })
                .add({ data: "Instancia.Clave", width: 15 })
                .add({ data: "Instancia.UserOwner.Nombre", width: 20, render: formatNombreUserOwner  })
                .addDate({ data: "FechaAsignacion", width: 20 })
                .add({ data: "Estatus", width: 10, render: label.formatEstatusTareaInstancia })

                .toArray();

            return <page.Main  {...config}  pageMode={PageMode.Principal} readOnly={true}>
                <page.Filters>
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};
//taskinstance



//namespace EK.Modules.Kontrol.Pages {
//    "use strict";

//    const PAGE_ID: string = "misTareas";//"ENK023";
//    const idForm: string = "misTareas";

//    interface IMisTareasParameter {
//        idTipo: number;
//    }

//    interface IMisTareasState {
//        tipoConsulta?: number;
//    }

//    interface IMisTareasProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarDatos: (tipoConsulta: number) => void;
//        obtenerHistoria: () => void;
//        miTareaSelected?: any;
//        misTareas?: any;
//        cargarTiposConsultas: () => void;
//        params?: any;
//        referencia?: any;
//    }

//    export class PageMisTareas extends React.Component<IMisTareasProps, IMisTareasState> {
//        constructor(props: IMisTareasProps) {
//            super(props);
//            this.onSelectedChanged = this.onSelectedChanged.bind(this);
//            this.onChangeTipoConsulta = this.onChangeTipoConsulta.bind(this);
//            this.state = { tipoConsulta: 1 };
//        }

//        /* Eventos  */
//        shouldComponentUpdate(nextProps: IMisTareasProps, nextState: IMisTareasState): boolean {
//            return true;
//        }

//        /* Funciones */
//        onSelectedChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        onChangeTipoConsulta(info: any): void {
//            this.props.cargarDatos(info.ID);
//            this.setState({ tipoConsulta: info.ID });
//        }


//        componentDidMount(): any {
//            this.props.cargarDatos(1);
//        }

//        /*  Render */
//        render(): JSX.Element {
//            // preserve render props
//            //this.state = this.props;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;

//            let bc: any = [$bc.global.ek, $bc.kontrol.flujoEstatus];

//            let columns: any[] = [
//                { title: $page.grid.headers.nombreFlujoInstancia, data: "NombreFlujoInstancia" },
//                { title: $page.grid.headers.descripcion, data: "Descripcion" },
//                { title: $page.grid.headers.comentarios, data: "Comentarios" },
//                { title: $page.grid.headers.status, data: "Status.Nombre" }];

//            //let columnsInfo: any[] = [
//            //    { "title": "Nombre Flujo", "data": "NombreFlujoInstancia" },
//            //    { "title": "Descripción", "data": "Descripcion" },
//            //    { "title": "Comentarios", "data": "Comentarios" },
//            //    { "title": "Status", "data": "Status.Nombre" },
//            //    { "title": "Estado", "data": "EstadoStr" },
//            //    { "title": "Referencia", "data": "Referencia" },
//            //    { "title": "Creado en", "data": "Creado" },
//            //    { "title": "Modificado en", "data": "Modificado" },
//            //    { "title": "Versión", "data": "Version" }
//            //];


//            let tiposConsulta: any[] = [
//                {
//                    data: [
//                        { ID: 1, Nombre: $page.opcionesConsulta.asignadosami },
//                        { ID: 2, Nombre: $page.opcionesConsulta.aprobadas },
//                        { ID: 3, Nombre: $page.opcionesConsulta.rechazadas }],
//                    status: 2
//                }
//            ];
//            //value = { createSuccessfulStoreObject([]) }
//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} title={$page.title} breadcrumb={bc}>
//                    <PageButtons>
                       
//                    </PageButtons>
//                    <Form id={idForm} ref="form">
//                        <DropdownList
//                            id="TipoConsulta"
//                            label={$page.tipoConsultaDDL.label}
//                            items={tiposConsulta[0]}
//                            size={[12, 12, 12, 4]}
//                            helpLabel={$page.tipoConsultaDDL.helpLabel}
                     
//                            validations={[validations.required($page.tipoConsultaDDL.validations)]}
//                            style={{ marginBottom: 0 }}
//                            change={this.onChangeTipoConsulta}
//                            />
//                        <DataTable id="tblTareas" columns={columns} onRowSelected={this.onSelectedChanged} />
//                    </Form>
//                    <PageInfo >
//                        <InfoItem />
//                    </PageInfo>
//                </PageV2>;
//            return page;

//        }
//    }

//    // Página
//    const mapProps: any = (state: any): any => {
//        return {
//            misTareas: state.flujoInstancias.misTareas,
//            miTareaSelected: state.flujoInstancias.misTareasSelected
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            setSelected: (item: any): void => {
//                dispatchDefault("misTareas-setSelected", item);
//                setCurrentEntity(item);
//            },
//            cargarDatos: (tipoConsulta: number): any => {
//                let key: string = "Workflows/GetMyTasks/" + tipoConsulta;
//                dispatchAsync("misTareas-list", key);
//            },

//        };
//    };

//    // View Button
//    const mapViewButtonProps: any = (state: any) => {
//        return {
//            info: {
//                miTareaSelected: state.flujoInstancias.misTareasSelected.data
//            },
//            visible: state.flujoInstancias.misTareasSelected.data.ID !== undefined
//        };
//    };

//    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): void => {
//                dispatch(EK.Global.action("forms-reset-state", { idForm }));
//                go("/kontrol/workflows/plantilla/tarea/" + info.miTareaSelected.ID);
//            }
//        }
//    };

//    // dataTable 
//    const DataTableMapProps: any = (state: any): any => {
//        return {
//            data: state.flujoInstancias.misTareas,
//            selectedItem: state.flujoInstancias.misTareas.data
//        };
//    };

//    // DropDownListTipo Consulta
//    //const mapTipoConsultaDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//    //    return {
//    //        change: (tipoConsulta: any): any => {
//    //            let key: string = "Workflows/GetMyTasks/" + tipoConsulta.ID;
//    //            dispatchAsync("misTareas-list", key);
//    //        }
//    //    }
//    //};

//    const mapExcelButtonProps: any = (state: any) => {
//        return {
//            visible: (state.flujoInstancias.misTareas !== undefined)
//            && (state.flujoInstancias.misTareas.data !== undefined)
//            && (state.flujoInstancias.misTareas.data.length > 0)
//        };
//    };

//    //InfoItem
//    const infoItemMapProps: any = (state: any): any => {
//        return {
//            data: state.flujoInstancias.misTareasSelected
//        };
//    };

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.flujoInstancias.misTareasSelected.history.all
//        };
//    };

//    // connect 
//    export let MisTareas: any = ReactRedux.connect(mapProps, mapDispatchs)(PageMisTareas);
//    let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
//    let DataTable: any = ReactRedux.connect(DataTableMapProps, mapDispatchs)(DataTableExt);
//    let ExcelButton: any = ReactRedux.connect(mapExcelButtonProps, null)(EK.UX.Buttons.ExcelButton);
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemTab);
//}
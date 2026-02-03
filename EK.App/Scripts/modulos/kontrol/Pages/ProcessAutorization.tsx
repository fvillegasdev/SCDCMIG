/// <reference path="../../../components/buttons.tsx" />
/// <reference path="../../../components/input.tsx" />
/// <reference path="../../../components/dropdownlist.tsx" />
/// <reference path="../../../components/grid.tsx" />
/// <reference path="../../../components/store/dispatchs.ts" />
/// <reference path="../../../components/icon.tsx" />

namespace EK.Modules.Kontrol.Pages {
    "use strict";
    const PAGE_ID: string = "ENK014";

    interface IProcessAutorizationParam {
        id: number;
    }

    interface IProcessAutorizationProps extends React.Props<any> {
        cargarInfo?: (idFlujoInstancia: number) => void;
        autorization?: any;
        params?: IProcessAutorizationParam;
        saveProcess?: (id: number) => void;
        global?: any;
        cargaGlobal?: () => any;
        cargarDocumentos?: (idFlujoInstancia: number) => any;
        referencia?: any;
        tareasInstancia?: any;
        onViewReference?: (info: any) => any;
        documentosInstancia?: any;
        documentosPosibles?: any;
    }

    export class PageProcessAutorization extends React.Component<IProcessAutorizationProps, IProcessAutorizationProps> {
        constructor(props: IProcessAutorizationProps) {
            super(props);

            this.state = { autorization: {} };
            this.onClickLink = this.onClickLink.bind(this);
            this.fnReLoadDocuments = this.fnReLoadDocuments.bind(this);
        }

        onClickLink(): any {
            this.props.onViewReference(this.props.referencia);
        }

        shouldComponentUpdate(nextProps: IProcessAutorizationProps, nextState: IProcessAutorizationProps): boolean {
            return true; //return (this.props.autorization.timestamp !== nextProps.autorization.timestamp)
        }

        componentWillMount(): any {
            this.props.cargaGlobal();
            this.props.cargarInfo(Number(this.props.params.id));
            this.props.cargarDocumentos(Number(this.props.params.id));
        }

        componentWillReceiveProps(nextProps: IProcessAutorizationProps): any {
            this.setState({ autorization: nextProps.autorization });
        }

        fnReLoadDocuments(): any {
            this.props.cargarDocumentos(Number(this.props.params.id));
        }

        formatItem(index: number, title: string, description: string) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";      

            return <div key={itemKey} className={"row " + isOdd} style={{ fontSize: "12px" }}>
                <Column lg={3} md={3} sm={3} xs={3}>                    
                            {title}                       
                </Column>
                <Column lg={9} md={9} sm={9} xs={9} >
                    {description}
                </Column>
            </div>;
        }

        formatItemTaskInstance(index: number, descTask: string, status: string, created: Date, vigency: Date) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <div key={itemKey} className={"row " + isOdd} style={{ fontSize:"12px" }}>
                <Column lg={3} md={3} sm={3} xs={12} className="titleCol">
                    {descTask}
                </Column>
                <Column lg={3} md={3} sm={3} xs={12} className="descriptionCol">
                    {status}
                </Column>
                <Column lg={3} md={3} sm={3} xs={12} className="titleCol">
                    {created.toLocaleDateString()}
                </Column>
                <Column lg={3} md={3} sm={3} xs={12} className="descriptionCol">
                    {vigency.toLocaleDateString()}
                </Column>
            </div>;
        }

        render(): JSX.Element {
            // let itemsBC: EK.UX.IBreadcrumbItem[] = [
            //    { text: "EK", link: "/" },                
            //    { text: "Workflows", link: "/Workflows" },
            //    { text: "Editar", link: "/Workflows/Editar" }
            // ];


            //LLENA EL PORTLET DE REFERENCIA            
            let v: any[] = [];
            let data: any[] = [];

            if (this.props.referencia !== undefined) {              
                    data = this.props.referencia;                
            }

            if (data) {
                let i = 0;

                for (let e in data) {
                    if (typeof data[e] !== "object") {
                        v.push(this.formatItem(i++, e, data[e]));
                    } else {
                        if (data[e] instanceof Date) {
                            v.push(this.formatItem(i++, e, data[e].toLocaleString()));
                        }
                        else {
                            if (data[e] !== null) {
                                v.push(this.formatItem(i++, e, data[e].Nombre));
                            }                            
                        }
                    }
                }
            }  

            //LLENA EL PORTLET DE TAREAS DEL PROCESO
            let tareasProceso: any[] = [];
            let dataTareas: any[] = this.props.tareasInstancia.data;

            if (dataTareas) {
                let i = 0;
                for (let e in dataTareas) {
                    dataTareas[e]
                    tareasProceso.push(this.formatItemTaskInstance(i++, dataTareas[e].Descripcion, dataTareas[e].EstadoStr, dataTareas[e].Creado, dataTareas[e].FechaVigencia));
                }
            }

            let Title = "Autorización de " + (this.props.autorization.data.NombreFlujoInstancia === null ? " proceso " : this.props.autorization.data.NombreFlujoInstancia);
            let SubTitle = (this.props.referencia === undefined ? "  " : "Referencia [" + this.props.referencia.ID + "] " + this.props.referencia.Nombre);

            let page: JSX.Element =
                <Page id={PAGE_ID}>
                    <PageBar>

                    </PageBar>
                    <Grid>
                        <Row>
                            <PanelUpdate info={this.props.autorization}>
                                <PageToolbar>
                                    <PageTitle title={Title} subTitle={""} />
                                    <ButtonGroup>
                                        
                                    </ButtonGroup>
                                </PageToolbar>
                                <Row>
                                    <a onClick={this.onClickLink}> {SubTitle}</a>
                                    <Column size={[12, 12, 12, 12]} style={{ textAlign: "center" }}>
                                        <ApproveButton
                                            icon={"fa fa-check"}
                                            text="Autorizar"
                                            iconOnly={true}
                                            inverse={true}
                                            color={ColorEnum.greenSharp}
                                            />
                                        <RejectButton
                                            icon={"fa fa-close"}
                                            text="Rechazar"
                                            iconOnly={true}
                                            inverse={false}
                                            color={ColorEnum.greenSharp}
                                            />
                                    </Column>
                                </Row>

                                <Form id="ProcessAutorization">
                                    <Input
                                        id="FlujoInstanciaId"
                                        label="flujoInstancia"
                                        size={[12, 12, 12, 12]}
                                        value={this.props.autorization.data.FlujoTrabajoInstanciaId}
                                        visible={false}
                                        />
                                    <Input
                                        id="TareaInstanciaId"
                                        label="TareaInstancia"
                                        size={[12, 12, 12, 12]}
                                        value={this.props.autorization.data.ID}
                                        visible={false}
                                        />
                                    <Input
                                        id="Entidad"
                                        label="Entidad"
                                        size={[12, 12, 12, 12]}
                                        value={this.props.autorization.data.Entidad}
                                        visible={false}
                                        />
                                    <Column size={[12, 12, 12, 12]}>
                                        <OptionSection title="Comentarios" readOnly={false}>
                                            <Row>
                                                <Form id={"FrmComentarios"}>
                                    <TextArea
                                        id={"Comentarios"}
                                        //label={"Comentarios"}
                                        size={[12, 12, 12, 12]}
                                        required={true}
                                        helpLabel="Capture los comentarios de la autorización"
                                        value={this.props.autorization.data.Comentarios}
                                        />
                                                    </Form>
                                            </Row>
                                        </OptionSection>
                                    </Column>
                                    <FileListComponent
                                        id={"FUDocs"}
                                        data={this.props.documentosInstancia}
                                        fnRefreshPage={this.fnReLoadDocuments}
                                        showAddButton={true}
                                        showDeleteButton={true}
                                        enableDownloadFile={false}
                                        />
                                </Form>                                                                                        
                            </PanelUpdate>
                        </Row>
                    </Grid>

                    <QuickSidebarTab>
                        <PortletTabPane title="Tareas del proceso" icon="fa fa-tasks" >
                            <div>
                                {tareasProceso}
                            </div>
                        </PortletTabPane>
                        <PortletTabPane title="Referencia" icon="fa fa-external-link" >
                            <div>
                                {v}
                            </div>
                        </PortletTabPane>
                    </QuickSidebarTab>
                </Page>;

            return page
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            autorization: state.flujoInstancias.processAutorization,
            flujoEstatus: state.global.FLUJOESTATUS,
            tareaEstatus: state.global.TAREASTATUS,
            referencia: state.flujoInstancias.processAutorization.data.RefJSON,
            tareasInstancia: state.flujoInstancias.tasksInstancia,
            documentosInstancia: state.flujoInstancias.processAutorizationDocs.data,
            documentosPosibles: state.flujos.taskDocsAgregados
        };
    };

    const mapApproveButtonProps: any = (state: any): any => {
        return {
            info: {
                aprobar: state.forms.ProcessAutorization,
                comentarios: state.forms.FrmComentarios,
                flujoEstatus: state.global.FLUJOESTATUS,
                tareaEstatus: state.global.TAREASTATUS
            }
            //visible: state.forms.WorkflowEdit.hasChanged !== undefined && state.forms.WorkflowEdit.hasChanged,
        };
    };

    const mapRejectButtonProps: any = (state: any): any => {
        return {
            info: {
                aprobar: state.forms.ProcessAutorization,
                flujoEstatus: state.global.FLUJOESTATUS,
                tareaEstatus: state.global.TAREASTATUS
            }
            //visible: state.forms.WorkflowEdit.hasChanged !== undefined && state.forms.WorkflowEdit.hasChanged,
        };
    };


    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargarInfo: (idTarea: number): void => {
                dispatch(EK.Global.actionAsync({
                    action: "flujoInstancias-tareasInstancia",
                    url: "Workflows/GetTaskInstancesByTaskInWorkflow/" + idTarea
                }));
                //dispatch(EK.Global.actionAsync({
                //    action: "workflowInstancia-Referencia",
                //    url: "Workflows/GetWorkflowReferencebyIdTaskInstance/" + idTarea
                //}));

                dispatch(EK.Global.actionAsync({
                    action: "autorizacionProceso",
                    url: "Workflows/GetTaskInstanceByIdTask/" + idTarea
                }));
                dispatch(EK.Global.actionAsync({
                    action: "tarea-documentos",
                    url: "Workflows/GetCommonDocumentsAll"
                }));
            },
            cargarDocumentos: (idTarea: number): void => {
                dispatch(EK.Global.actionAsync({
                    action: "autorizacionProceso-documentos",
                    url: "Workflows/GetDocumentsByTaskInstance/" + idTarea
                }));
            },
            inicializarForma: (idForm: string): void => {
                dispatch(EK.Global.action("forms-reset-state", { idForm }));
            },
            cargaGlobal: (): void => {
                dispatchAsync("load::TAREASTATUS", "Catalogos(tareastatus)");
                dispatchAsync("load::FLUJOESTATUS", "Catalogos(flujoestatus)");
            },
            onViewReference: (info: any): void => {
                let item: any = info;
                switch (item.IdTipo) {
                    case 1: //Usuario
                        dispatch(EK.Global.action("forms-reset-state", { idForm: "usuariosEditar" }));

                        let route: string = "/Usuarios/" + item.Referencia;
                        ReactRouter.hashHistory.push(route);
                        break;
                    case 2: // OrdenCompra
                        break;
                    case 3: // Factura
                        break;
                    case 4: //NotaCredito
                        break;
                    case 5: // Remision

                        break;
                }

            }
        };
    };

    const mapApproveButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let item: any = info.aprobar.form;
                let itemCom: any = info.comentarios.form;
                let FStatus: any[] = info.flujoEstatus.data;
                let TStatus: any[] = info.tareaEstatus.data;

                let selectedFlujoEstatus: any = FStatus.filter(e => e.Clave.trim() === "AP")
                let selectedTareaEstatus: any = TStatus.filter(e => e.Clave.trim() === "AP")

                let taskInstance: any = {
                    "FlujoTrabajoInstanciaId": item.FlujoInstanciaId.value,
                    "ID": item.TareaInstanciaId.value,
                    "Comentarios": itemCom.Comentarios.value,
                    "EstadoStr": "Completado",
                    "IdStatus": selectedTareaEstatus[0].ID,
                    "FlujoIdStatus": selectedFlujoEstatus[0].ID
                };

                dispatch(actionAsync({
                    action: "update-process",
                    type: HttpMethod.POST,
                    url: "Workflows/UpdateWorkflowProcess/",
                    data: taskInstance,
                    status: AsyncActionTypeEnum.updating
                })
                );

               
                go("kontrol/workflows/misTareas");
               
                success("Se ha autorizado la tarea correctamente.", "Autorización de tarea.");
            }
        };
    };

    const mapRejectButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let item: any = info.aprobar.form;
                let FStatus: any[] = info.flujoEstatus.data;
                let TStatus: any[] = info.tareaEstatus.data;

                let selectedFlujoEstatus: any = FStatus.filter(e => e.Clave.trim() === "RE")
                let selectedTareaEstatus: any = TStatus.filter(e => e.Clave.trim() === "RE")

                let taskInstance: any = {
                    "FlujoTrabajoInstanciaId": item.FlujoInstanciaId.value,
                    "ID": item.TareaInstanciaId.value,
                    "Comentarios": item.Comentarios.value,
                    "EstadoStr": "Completado",
                    "IdStatus": selectedTareaEstatus[0].ID,
                    "FlujoIdStatus": selectedFlujoEstatus[0].ID
                };

                dispatch(actionAsync({
                    action: "update-process",
                    type: HttpMethod.POST,
                    url: "Workflows/UpdateProcessTaskInstance/",
                    data: taskInstance,
                    status: AsyncActionTypeEnum.updating
                })
                );
                success("Se ha rechazado la tarea correctamente.", "Autorización de tarea.");
            }
        };
    };



    export let PageProcesoAutorizacion: any = ReactRedux.connect(mapProps, mapDispatchs)(PageProcessAutorization);
    let ApproveButton: any = ReactRedux.connect(mapApproveButtonProps, mapApproveButtonDispatchs)(Button);
    let RejectButton: any = ReactRedux.connect(mapRejectButtonProps, mapRejectButtonDispatchs)(Button);
    //let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
}
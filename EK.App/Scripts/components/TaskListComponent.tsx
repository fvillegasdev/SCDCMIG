/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

namespace EK.UX {
    "use strict";
    
    export interface ITaskListProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        data?: any[];
        id: string;
        loadItems?: (idFlujo: number) => void;
        fnRefreshComponent?: Function;
        taskReadOnly?: boolean;
        onChangeEdition?: (item: any) => void; 
        saveTasks?: (form: any) => void;
        deleteTasks?: (form: any) => void;
        docDefault?: any;
        usrDefault?: any;
        deactivateTask?: (idTarea: string, idFlujo: string) => void;
    }

    /* Estatus del Componente */
    interface ITaskListState {
        initialValue?: any;
        currentValue?: any;
        hasChanged?: boolean;
        hasValidationError?: boolean;
        loading?: boolean;
        
    }

    export class TaskList extends React.Component<ITaskListProps, ITaskListState> {
        constructor(props: ITaskListProps) {
            super(props);

            this.state = {
                initialValue: props.value,
                currentValue: props.value,
                hasChanged: false,
                hasValidationError: false,
                loading: false
            };

            this.onChange = this.onChange.bind(this);
            this.setEditable = this.setEditable.bind(this);
            this.onSaveTasks = this.onSaveTasks.bind(this);
            this.onDeleteTasks = this.onDeleteTasks.bind(this);
        }

        static defaultProps: ITaskListProps = {
            id: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            data: [],
            docDefault: createDefaultStoreObject([]),
            usrDefault: createDefaultStoreObject([]),
            fnRefreshComponent: function () { },
            isFormComponent: true
        };

        refs: {
            input: Element;
        };

        shouldComponentUpdate(nextProps: ITaskListProps, nextState: ITaskListProps) {            
            return true;
        }

        componentWillMount(): void {
            
        }

        componentWillReceiveProps(nextProps: ITaskListProps): any {
            this.setState({
                hasChanged: false,
                hasValidationError: false,
                currentValue: nextProps.value,
                initialValue: nextProps.value
            });
        }


        onChange(e: any): any {
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: e,
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    hasValidationError: this.props.hasValidationError
                });
            }

            if (this.props.change != undefined) {
                this.props.change(e);
            }
        }

        onSaveTasks(e: any): any {
            this.props.saveTasks(e);
        }

        onDeleteTasks(e: any): any {
            //alert("onDeleteTasks");
            this.props.deactivateTask(e.currentTarget.id, e.currentTarget.name);
        }
        setEditable(e: any): any {
            this.props.onChangeEdition(e);
        }

        render(): JSX.Element {
            var items: JSX.Element[] = [];
            var ItemsElements: JSX.Element = null;
            var ButtonList: JSX.Element = null;
            
            if (this.props.taskReadOnly === false) {
                ButtonList = <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} >
                    <SaveButton icon={"fa fa-check"} iconOnly={true} text={"Guardar"} color={ColorEnum.white} style={{ float: "right" }} />
                </div>;
            }
            //else {
            //    ButtonList = <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
            //        <a data-toggle="collapse" onClick={this.setEditable}>
            //            <div className="pull-right green-mint" style={{ color: "white" }}>
            //                <i className="fa fa-pencil" />
            //            </div>
            //        </a>
            //    </div>
            //}
            
            if (this.props.taskReadOnly!==false) {
                ItemsElements = <div id={"ListContainer"} className="dd">
                    <List items={this.props.data} addRemoveButton={false}  formatter={(index: number, item: any) =>{
                        return <div >
                            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 badge badge-default pull-left bold">{item.StatusNombre}</div>
                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 list-toggle-title bold">{item.Descripcion}</div>
                        </div>
                    } } itemClass="dd-handle dd-typeahead"  />
                </div>
            }
            else {
                ItemsElements = <div id={"ListContainer"}>
                    <List items={this.props.data} onChange={this.onChange} formatter={(index: number, item: any) => {
                        return <div className="panel-group accordion scrollable" id="accordion2" style={{ marginBottom: "0" }}>
                            <div className="panel panel-default">
                                <div className="panel-heading" style={{ height: "25px" }}>                                    
                                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href={"#collapse_" + item.ID} aria-expanded="false">
                                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 badge badge-default pull-left bold" style={{ marginRight: "10px" }}>{item.StatusNombre}</div>
                                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-8 list-toggle-title bold">{item.Descripcion}</div>                                       
                                    </a>
                                    <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                                        <a onClick={this.onDeleteTasks} id={"btndel_" + item.ID} name={item.FlujoId}>
                                            <div className="pull-right" >
                                                <i className="fa fa-trash" />
                                            </div>
                                        </a>
                                     </div>
                                </div>
                                <div id={"collapse_" + item.ID} className="panel-collapse collapse " aria-expanded="false">
                                    <div className="panel-body">
                                        <Form id={"WorkflowTaskEdit_" + item.ID}>
                                            
                                            <Input id={"ID"} label="Tarea" size={[12, 12, 6, 6]} required={true} value={item.ID} visible={false} />
                                            <Input id={"FlujoId"} label="Flujo" size={[12, 12, 6, 6]} required={true} value={item.FlujoId} visible={false} />
                                            <Input id={"Orden"} label="Orden" size={[12, 12, 6, 6]} required={true} value={item.Orden} visible={false} />
                                            <Input id={"StatusId"} label="Status" size={[12, 12, 6, 6]} required={true} value={item.IdStatus} visible={false} />
                                            <Input id={"Descripcion"} label="Descripción" size={[12, 12, 10, 10]} required={true} helpLabel="Capture la descripción de la tarea del flujo de trabajo" value={item.Descripcion} />
                                            <Input id={"DiasVigencia"} label="Vigencia" size={[12, 12, 2, 2]} required={true} helpLabel="Capture la vigencia de la tarea del flujo de trabajo" value={item.DiasVigencia} mask={"999[9]"} />
                                            <Input id={"EstadoTarea"} label="Estado" size={[12, 12, 6, 6]} required={true} helpLabel="Capture el estado inicial de la tarea del flujo de trabajo" value={"Inicial"} visible={false} />
                                            <Select id={"selectAsignados_" + item.ID} label={"Usuarios Asignados"}
                                                remoteUrl={"Workflows/GetPossibleAssignUsers"} mode={SelectModeEnum.Multiple}
                                                itemFormatter={(index: number, item: any) => {
                                                    return <div className={" col-xs-10 col-sm-10 col-md-11 col-lg-11"}>
                                                        <div className={" col-xs-12 col-sm-12 col-md-12 col-lg-2"} style={{ paddingLeft: "0px" }}>
                                                            <span className={"badge badge-info"}>{item.Tipo}</span>
                                                        </div>
                                                        <div className={" col-xs-12 col-sm-12 col-md-10 col-lg-10"} style={{ paddingLeft: "0px" }}>
                                                            <h5 style={{ marginBottom: "0px", marginTop: "5px", textAlign: "center" }}>{item.NombreAsignado}</h5>
                                                        </div>
                                                    </div>
                                                } }
                                                suggestionFormatter={(item: any) => { return <div>{item.NombreAsignado}</div>; } }
                                                size={[12, 12, 6, 6]} helpLabel={"Capture el usuario o nivel que desea asignar a la tarea"}
                                                itemLabel={"asignado"} itemValue={"NombreAsignado"} itemKey={"ID"}                                                
                                                value={item.UsuariosAsignados.data === undefined ? this.props.usrDefault : item.UsuariosAsignados}
                                                required={true} />  
                                            <Select id={"selectDocumentos_" + item.ID} label={"Documentos"} remoteUrl={"Workflows/GetCommonDocuments"} mode={SelectModeEnum.Multiple}
                                                itemFormatter={(index: number, item: any) => {
                                                    return <h5 style={{ display: "inline-block", marginTop: "0px", textAlign: "center" }}>
                                                        <span>{item.Nombre}</span></h5>;
                                                } }
                                                suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div>; } }
                                                size={[12, 12, 6, 6]}
                                                helpLabel={"Seleccione el documento que desea asignar a la tarea"}
                                                itemLabel={"documento"} itemValue={"Nombre"} itemKey={"ID"}                                                
                                                value={item.DocumentosAgregados.data === undefined ? this.props.docDefault : item.DocumentosAgregados}
                                                required={true} />                                                                                                                            
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }} readonly={true} itemClass="" />
                </div>
            }           
            return (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group form-md-line-input form-md-floating-label mt-element-list">
                    <div className="mt-list-head font-white bg-green-sharp list-todo">                        
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                    <h3 className="list-title">Tareas del flujo de trabajo</h3>
                                </div>
                                {ButtonList} 
                                <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1 pull-right">
                                    <a data-toggle="collapse" onClick={this.setEditable}>
                                        <div className="pull-right" style={{ color: "white" }}>
                                        <i className="fa fa-pencil btn white" />
                                        </div>
                                    </a>
                                </div>                                     
                            </div>                       
                    </div>                    
                    {ItemsElements}                                        
                </div>
            );
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            tarea: state.flujos.taskSelected,           
            taskReadOnly: state.flujos.taskReadOnly.data.edit,
            forms: state.forms
        };
    };

    const mapSaveButtonProps: any = (state: any) => {
        return {
            info: state.forms
        };
    };
    //const mapDeleteButtonProps: any = (state: any) => {
    //    return {
    //        info: state.forms
    //    };
    //}; 

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadItems: (idFlujo: number): void => {
                //dispatch(EK.Global.actionAsync({
                //    action: "flujo-tareas",
                //    url: "Workflows/GetTasksByWorkflow/" + idFlujo + "/0"
                //}));
            },
            cargarAsignados: (idTarea: number): void => {
                dispatchAsync("tarea-asignados", "Workflows/GetTaskAssignedByTask/" + idTarea);
            },
            inicializarForma: (idForm: string): void => {
                Forms.reset(idForm);
            },
            setSelectedTask: (item: any): void => {
                dispatchDefault("tarea-selected", { data: item });
            },
            deactivateTask: (idTarea: string, idFlujo: string): void => {
                /////let ObjectForm: any = this.forms["WorkflowTaskEdit_" + idTarea].form;
                let sForm: any = {
                    ID: parseInt(idTarea.substring(idTarea.indexOf('_') + 1))
                };
                let FlujoId: number = parseInt(idFlujo);
                //let sForm: any = {
                //    "ID": ObjectForm.ID.value,
                //    "Descripcion": ObjectForm.Descripcion.value,
                //    "DiasVigencia": ObjectForm.DiasVigencia.value,
                //    "EstadoTarea": ObjectForm.EstadoTarea.value,
                //    "FlujoId": ObjectForm.FlujoId.value,
                //    "Orden": ObjectForm.Orden.value,
                //    "IdStatus": ObjectForm.StatusId.value
                //};

                dispatch(EK.Global.actionAsync({
                    action: "delete-workflowtask",
                    url: "Workflows/DeleteTask",
                    type: HttpMethod.POST,
                    data: { FormJson: JSON.stringify(sForm) }
                }));
                dispatch(EK.Global.actionAsync({
                    action: "flujo-tareas",
                    url: "Workflows/GetTasksByWorkflow/" + FlujoId + "/" + 0
                }));
                success("La tarea del flujo de trabajo se ha desactivado con éxito.", "Desactivar tarea de flujo de trabajo");
            }

        };
    };
    const mapSaveButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (forms: any): void => {                
                let formNames: any[] = [];
                let FlujoId: number = 0;
                for (var name in forms) {
                    formNames.push(name);
                }
                var indx = 0;
                for (var frm of formNames) {   
                    if (frm.indexOf('_') > 0) {
                        indx += 1;
                        if (frm.substring(frm.indexOf('_') + 1) !== "0") {
                            
                            let ObjectForm: any = forms[frm].form;
                            let sID: number = ObjectForm.ID.value;
                            FlujoId = ObjectForm.FlujoId.value;
                            let sForm: any = {
                                "ID": ObjectForm.ID.value,
                                "Descripcion": ObjectForm.Descripcion.value,
                                "DiasVigencia": ObjectForm.DiasVigencia.value,
                                "EstadoTarea": ObjectForm.EstadoTarea.value,
                                "FlujoId": ObjectForm.FlujoId.value,
                                "Orden": indx,//ObjectForm.Orden.value,
                                "IdStatus": ObjectForm.StatusId.value,
                                "Documentos": ObjectForm["selectDocumentos_" + sID].value.data.length > 0 ? ObjectForm["selectDocumentos_" + sID].value.data : {},
                                "Asignados": ObjectForm["selectAsignados_" + sID].value.data.length > 0 ? ObjectForm["selectAsignados_" + sID].value.data : {}
                            };

                            dispatch(EK.Global.actionAsync({
                                action: "save-workflowtask",
                                url: "Workflows/UpdateTask",
                                type: HttpMethod.POST,
                                data: { FormJson: JSON.stringify(sForm) }
                            }));                           
                        }
                        else {
                            let ObjectForm: any = forms[frm].form;
                            let sID: number = ObjectForm.ID.value;
                            if (ObjectForm.Descripcion.hasChanged ||
                                ObjectForm.DiasVigencia.hasChanged ||
                                ObjectForm["selectDocumentos_" + sID].hasChanged ||
                                ObjectForm["selectAsignados_" + sID].hasChanged) {
                                
                                
                                FlujoId = ObjectForm.FlujoId.value;
                                let sForm: any = {
                                    "ID": ObjectForm.ID.value,
                                    "Descripcion": ObjectForm.Descripcion.value,
                                    "DiasVigencia": ObjectForm.DiasVigencia.value,
                                    "EstadoTarea": ObjectForm.EstadoTarea.value,
                                    "FlujoId": ObjectForm.FlujoId.value,
                                    "Orden": indx,//ObjectForm.Orden.value,
                                    "IdStatus": ObjectForm.StatusId.value,
                                    "Documentos": ObjectForm["selectDocumentos_" + sID].value.data.length > 0 ? ObjectForm["selectDocumentos_" + sID].value.data : {},
                                    "Asignados": ObjectForm["selectAsignados_" + sID].value.data.length > 0 ? ObjectForm["selectAsignados_" + sID].value.data : {}
                                };

                                dispatch(EK.Global.actionAsync({
                                    action: "save-workflowtask",
                                    url: "Workflows/InsertTask",
                                    type: HttpMethod.PUT,
                                    data: { FormJson: JSON.stringify(sForm) }
                                }));       
                            }
                        }
                    }                                    
                }                             
                
                dispatch(EK.Global.actionAsync({
                    action: "flujo-tareas",
                    url: "Workflows/GetTasksByWorkflow/" + FlujoId + "/1"
                }));
                 success("La tarea del flujo de trabajo se ha guardado con éxito.", "Guardar tarea de flujo de trabajo");
                
            }
        };
    };
    //const mapDeleteButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
    //    return {
    //        onClick: (form: any): void => {                
    //            let sID: number = form.form.ID.value;
    //            let sForm: any = {
    //                "ID": form.form.ID.value,
    //                "Descripcion": form.form.Descripcion.value,
    //                "DiasVigencia": form.form.DiasVigencia.value,
    //                "EstadoTarea": form.form.EstadoTarea.value,
    //                "FlujoId": form.form.FlujoId.value,
    //                "Orden": form.form.Orden.value,
    //                "IdStatus": form.form.StatusId.value,
    //                "Documentos": form.form.selectDocumentos.value.data.length > 0 ? form.form.selectDocumentos.value : {},
    //                "Asignados": form.form.selectAsignados.value.data.length > 0 ? form.form.selectAsignados.value : {}
    //            };

    //            dispatch(EK.Global.actionAsync({
    //                action: "delete-workflowtask",
    //                url: "Workflows/DeleteTask",
    //                type: HttpMethod.POST,
    //                data: { FormJson: JSON.stringify(sForm) }
    //            }));
    //            success("La tarea del flujo de trabajo se ha desactivado con éxito.", "Desactivar tarea de flujo de trabajo");

    //            //dispatch(EK.Global.action("forms-reset-state", "WorkflowEdit"));
    //            //let FlujoId = form.form.FlujoId.value;
    //            //let route: string = "/kontrol/workflows/editar/" + FlujoId;
    //            //ReactRouter.hashHistory.push(route);
    //        }
    //    };
        
    //};
    let SaveButton: any = ReactRedux.connect(mapSaveButtonProps, mapSaveButtonDispatchs)(Button);
    //let DeleteButton: any = ReactRedux.connect(mapDeleteButtonProps, mapDeleteButtonDispatchs)(Button);
    
    export let TaskListComponent: any = ReactRedux.connect(mapProps, mapDispatchs)(TaskList);

}


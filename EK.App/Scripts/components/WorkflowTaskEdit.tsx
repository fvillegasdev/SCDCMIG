/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Icon.tsx" />
/// <reference path="../typings/jquery/jquery.d.ts" />

namespace EK.UX {
    "use strict";

    interface IWorkflowTaskEditProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        data?: any;
        id: string;
        docDefault?: any;
        usrDefault?: any;
        tarea?: any;
        docsmap?: any;
        usrsmap?: any;
        fnRefreshComponent?: Function;
    }

    export class EdicionTarea extends React.Component<IWorkflowTaskEditProps, {}> {
        constructor(props: IWorkflowTaskEditProps) {
            super(props);

            this.state = {
                hasChanged: false,
                hasValidationError: false,
                loading: false
            };

            this.onChange = this.onChange.bind(this);

        }
        static defaultProps: IWorkflowTaskEditProps = {
            id: "",
            data: [],
            docDefault: createDefaultStoreObject([]),
            usrDefault: createDefaultStoreObject([])
            
        };

        shouldComponentUpdate(nextProps: IWorkflowTaskEditProps, nextState: IWorkflowTaskEditProps) {
            return true;
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

            if (this.props.fnRefreshComponent != undefined) {
                this.props.fnRefreshComponent();
            }
        }

        render(): JSX.Element {            
            return (<div className="panel-body">
                    <Input id={"ID"} label="Tarea" size={[12, 12, 6, 6]} required={true} value={this.props.tarea.ID} visible={false} />
                    <Input id={"FlujoId"} label="Flujo" size={[12, 12, 6, 6]} required={true} value={this.props.tarea.FlujoId} visible={false} />
                    <Input id={"Orden"} label="Orden" size={[12, 12, 6, 6]} required={true} value={this.props.tarea.Orden} visible={false} />
                    <Input id={"StatusId"} label="Status" size={[12, 12, 6, 6]} required={true} value={this.props.tarea.IdStatus} visible={false} />
                    <Input id={"Descripcion"} label="Descripción" size={[12, 12, 10, 10]} required={true} helpLabel="Capture la descripción de la tarea del flujo de trabajo" value={this.props.tarea.Descripcion} />
                    <Input id={"DiasVigencia"} label="Vigencia" size={[12, 12, 2, 2]} required={true} helpLabel="Capture la vigencia de la tarea del flujo de trabajo" value={this.props.tarea.DiasVigencia} mask={"999[9]"} />
                    <Input id={"EstadoTarea"} label="Estado" size={[12, 12, 6, 6]} required={true} helpLabel="Capture el estado inicial de la tarea del flujo de trabajo" value={this.props.tarea.EstadoTarea} visible={false} />
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <OptionSection title="Responsables de la Tarea" readOnly={false}>
                            <Row>
                            <Select id={"selectAsignados"} label={"Usuarios Asignados"}
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
                                    suggestionFormatter={(item: any) => {
                                        return <div>{item.NombreAsignado}</div>;
                                    }}
                                    size={[12, 12, 12, 12]}
                                    helpLabel={"Capture el usuario o nivel que desea asignar a la tarea"}
                                    itemLabel={"asignado"}
                                    itemValue={"NombreAsignado"}
                                    itemKey={"ID"}
                                    value={this.props.usrsmap.length === 0 ? this.props.usrDefault : this.props.usrsmap}
                                    required={true} />
                                </Row>
                            </OptionSection>
                        </Column>
                    </Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                        <OptionSection title="Documentos requeridos y/o opcionales" readOnly={false}>
                            <Row>
                                <Select id={"selectDocumentos"} label={"Documentos"} remoteUrl={"Workflows/GetCommonDocuments"} mode={SelectModeEnum.Multiple}
                                    itemFormatter={(index: number, item: any) => {
                                        return <h5 style={{ display: "inline-block", marginTop: "0px", textAlign: "center" }}>
                                            <span>{item.Nombre}</span></h5>;
                                    } }
                                    suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div>; } }
                                    size={[12, 12, 6, 6]}
                                    helpLabel={"Seleccione el documento que desea asignar a la tarea"}
                                    itemLabel={"documento"} itemValue={"Nombre"} itemKey={"ID"}
                                    value={this.props.docsmap.length === 0 ? this.props.docDefault : this.props.docsmap}
                                    required={true} />
                                </Row>
                            </OptionSection>
                        </Column>
                    </Row>
                    <DeleteButton id={"delBtn"} icon={"fa fa-times"} iconOnly={true} text={"Eliminar"} color={ColorEnum.white} style={{ float: "right" }} />
                    <SaveButton id={"saveBtn"} icon={"fa fa-check"} iconOnly={true} text={"Guardar"} color={ColorEnum.white} style={{ float: "right" }} />
            </div>);
        }
    }

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {

        };
    };

    const mapProps: any = (state: any) => {
        return {
            info: state.forms,
            tarea: state.flujos.taskSelected.data.data === undefined ? [] : state.flujos.taskSelected.data.data,
            docsmap: state.flujos.taskSelected.data.data === undefined ? [] : state.flujos.taskSelected.data.data.DocumentosAgregados,
            usrsmap: state.flujos.taskSelected.data.data === undefined ? [] : state.flujos.taskSelected.data.data.UsuariosAsignados
        };
    };
    const mapSaveButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {                
                let FlujoId: number = 0;

                let ObjectForm: any = info.form;
                let sID: number = ObjectForm.ID.value;
                let Docs: any[] = [];
                let Usrs: any[] = [];
                Docs = ObjectForm.selectDocumentos.hasChanged ? ObjectForm.selectDocumentos.value.data : ObjectForm.selectDocumentos.value;
                Usrs = ObjectForm.selectAsignados.hasChanged ? ObjectForm.selectAsignados.value.data : ObjectForm.selectAsignados.value;

                if (sID !== 0) {
                    FlujoId = ObjectForm.FlujoId.value;
                    let sForm: any = {
                        "ID": ObjectForm.ID.value,
                        "Descripcion": ObjectForm.Descripcion.value,
                        "DiasVigencia": ObjectForm.DiasVigencia.value,
                        "EstadoTarea": ObjectForm.EstadoTarea.value,
                        "FlujoId": ObjectForm.FlujoId.value,
                        "Orden": ObjectForm.Orden.value,
                        "IdStatus": ObjectForm.StatusId.value,
                        "Documentos": Docs.length > 0 ? Docs : {},
                        "Asignados": Usrs.length > 0 ? Usrs : {}
                    };

                    dispatch(EK.Global.actionAsync({
                        action: "save-workflowtask",
                        url: "Workflows/UpdateTask",
                        type: HttpMethod.POST,
                        data: { FormJson: JSON.stringify(sForm) }
                    }));
                }
                else {

                    if (ObjectForm.Descripcion.hasChanged ||
                        ObjectForm.DiasVigencia.hasChanged ||
                        ObjectForm.selectDocumentos.hasChanged ||
                        ObjectForm.selectAsignados.hasChanged) {


                        FlujoId = ObjectForm.FlujoId.value;
                        let sForm: any = {
                            "ID": ObjectForm.ID.value,
                            "Descripcion": ObjectForm.Descripcion.value,
                            "DiasVigencia": ObjectForm.DiasVigencia.value,
                            "EstadoTarea": "Inicial",
                            "FlujoId": ObjectForm.FlujoId.value,
                            "Orden": ObjectForm.Orden.value,
                            "IdStatus": ObjectForm.StatusId.value,
                            "Documentos": Docs.length > 0 ? Docs : {},
                            "Asignados": Usrs.length > 0 ? Usrs : {}
                        };

                        dispatch(EK.Global.actionAsync({
                            action: "save-workflowtask",
                            url: "Workflows/InsertTask",
                            type: HttpMethod.PUT,
                            data: { FormJson: JSON.stringify(sForm) }
                        }));
                    }
                }
                
                    dispatch(EK.Global.actionAsync({
                        action: "flujo-tareas",
                        url: "Workflows/GetTasksByWorkflow/" + FlujoId + "/1"
                    }));
                success("La tarea del flujo de trabajo se ha guardado con éxito.", "Guardar tarea de flujo de trabajo");
            }            
    }

    };

    const mapSaveButtonProps: any = (state: any) => {
        return {
            info: state.forms.WorkflowTaskEdit
        };
    };

    const mapDeleteButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let FlujoId: number = 0;

                let ObjectForm: any = info.form;
                let sID: number = ObjectForm.ID.value;               

                if (sID !== 0) {
                    FlujoId = ObjectForm.FlujoId.value;
                    let sForm: any = {
                        "ID": ObjectForm.ID.value,
                        "Descripcion": ObjectForm.Descripcion.value,
                        "DiasVigencia": ObjectForm.DiasVigencia.value,
                        "EstadoTarea": ObjectForm.EstadoTarea.value,
                        "FlujoId": ObjectForm.FlujoId.value,
                        "Orden": ObjectForm.Orden.value,
                        "IdStatus": ObjectForm.StatusId.value
                    };

                    dispatch(EK.Global.actionAsync({
                        action: "delete-workflowtask",
                        url: "Workflows/DeleteTask",
                        type: HttpMethod.POST,
                        data: { FormJson: JSON.stringify(sForm) }
                    }));
                    dispatch(EK.Global.actionAsync({
                        action: "flujo-tareas",
                        url: "Workflows/GetTasksByWorkflow/" + FlujoId + "/1"
                    }));
                    success("La tarea del flujo de trabajo se ha desactivado con éxito.", "Desactivar tarea de flujo de trabajo");
                }
            }
        }

    };

    const mapDeleteButtonProps: any = (state: any) => {
        return {
            info: state.forms.WorkflowTaskEdit
        };
    };

    let SaveButton: any = ReactRedux.connect(mapSaveButtonProps, mapSaveButtonDispatchs)(Button);
    let DeleteButton: any = ReactRedux.connect(mapDeleteButtonProps, mapDeleteButtonDispatchs)(Button);

    export let WorkflowTaskEdit: any = ReactRedux.connect(mapProps, mapDispatchs)(EdicionTarea); 
}

import WorkflowTaskEdit = EK.UX.WorkflowTaskEdit;

/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

namespace EK.UX {
    "use strict";

    export interface IWorkflowTasksProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {  
        tareas?: any[];  
        tarea?: any;  
        setSelectedTask?: (e: any) => void;
        fnRefreshComponent?: Function;
        size?: number[];
    }

    /* Estatus del Componente */
    export interface IWorkflowTasksState {
        initialValue?: any;
        currentValue?: any;
        hasChanged?: boolean;
        hasValidationError?: boolean;
        loading?: boolean;

    }

    export class FlujoTareas extends React.Component<IWorkflowTasksProps, IWorkflowTasksState> {
        constructor(props: IWorkflowTasksProps) {
            super(props);

            this.state = {
                initialValue: props.value,
                currentValue: props.value,
                hasChanged: false,
                hasValidationError: false,
                loading: false
            };

            this.onClickTask = this.onClickTask.bind(this);
            this.onChange = this.onChange.bind(this);
        }

        static defaultProps: IWorkflowTasksProps = {
            id: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 12, 12]
        };

        refs: {
            input: Element;
        };

        componentWillReceiveProps(nextProps: ITaskListProps): any {
            this.setState({
                hasChanged: false,
                hasValidationError: false,
                currentValue: nextProps.value,
                initialValue: nextProps.value
            });
        }
        shouldComponentUpdate(nextProps: IWorkflowTasksProps, nextState: IWorkflowTasksProps) {
            //return getTimestamp(this.props) != getTimestamp(nextProps);
            return true;
        }

        onClickTask(e: any): any {
            this.props.setSelectedTask(e);
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
            var items: JSX.Element[] = [];
            var ItemsElements: JSX.Element = null;
            var ButtonList: JSX.Element = null;
         
            return (
                <Column size={this.props.size}>
                    <OptionSection title="Tareas" readOnly={false}>
                        <Row>                            
                            <div id={"ListContainer"} className=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ListTasks items={this.props.tareas} readonly={true} onItemClick={this.onClickTask} addRemoveButton={true} formatter={(index: number, item: any) => {
                                    return <div id="ItemList" style={{ height: "20px" }} data-toggle="collapse" data-parent="#ItemList" href={"#collapseForm"}>                                 
                                        <span className={"badge badge-info"} style={{ display: "inline-block" }}>{item.StatusNombre}</span>
                                        <h5 style={{ marginBottom: "0px", marginTop: "5px", marginLeft: "10px", display: "inline-block", fontWeight: "bold" }}>{item.Descripcion}</h5> 
                                    </div>
                                } }  />
                            </div>
                            <div id={"collapseForm"} className="panel-collapse collapse col-xs-12 col-sm-12 col-md-12 col-lg-12" aria-expanded="false">
                                <WorkflowTaskEdit id={"TaskForm"} fnRefreshComponent={this.onChange} />
                            </div>                            
                        </Row>
                    </OptionSection>
                </Column>
            );
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            tareas: state.flujos.tasks,
            tarea: state.flujos.taskSelected,            
            forms: state.forms
            
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            setSelectedTask: (item: any): void => {
                EK.Global.dispatchDefault("tarea-selected", { data: item });
            }

        };
    };    

    export let WorkflowTasks: any = ReactRedux.connect(mapProps, mapDispatchs)(FlujoTareas);
    let ListTasks: any = ReactRedux.connect(mapProps, mapDispatchs)(List);
       
}


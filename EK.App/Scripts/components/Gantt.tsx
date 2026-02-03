namespace EK.UX.EKGantt {
    "use strict";
    var ganttObject: any = window;

    export interface IEKGantt extends React.Props<any> {
        id?: string;
        gantt?: any;
        data?: any;
        config?: IEKGanttConfig;
    }
    export interface IEKGanttConfig extends React.Props<any> {
        scale_height: number,
        grid_width: number,
        types: {
            task: string,
            project: string,
            milestone: string,
            placeholder: string
            customType: string
        },
        lightbox: any[],
        columns: any[],
        scales: any[],
        buttons_left: any[],
        buttons_right: any[],
        details_on_dblclick: boolean,
        drag_links: boolean,
        drag_move: boolean,
        drag_progress: boolean,
    }

    export const EKGantt: any = global.connect(class extends React.Component<IEKGantt, IEKGantt> {
        constructor(props: IEKGantt) {
            super(props);
            this.GanttInit = this.GanttInit.bind(this);
            this.GanttDestroy = this.GanttDestroy.bind(this);

            let idGantt: string = this.props.id;

            if (!this.props.id) {
                idGantt = ["EKGantt_React_", new Date().getTime()].join("_");
            } else {
                idGantt = "EKGantt_React_" + this.props.id;
            };
            this.state = {
                id: idGantt
            };
        };

        static defaultProps: IEKGantt = {
            config: {
                scale_height: 50,
                grid_width: 550,
                types: {
                    project: "project",
                    task: "task",
                    milestone: "milestone",
                    placeholder: "placeholder",
                    customType: "type_id"
                },
                columns: [
                { name: "text", label: "Tarea", tree: true, width: '250' },
                { name: "start_date", label: "Fecha Inicio", align: "center", width: '90' },
                { name: "duration", label: "Duración", align: "center", width: '70' },
                { name: "priority", label: "Prioridad", align: "center", width: '70' },
                { name: "assigned", label: "Asignado A", align: "center", width: '70' },
                ],
                scales: [
                    { format: "%d %M", step: 1, unit: "day" },
                    { unit: "month", step: 1, format: "%F, %Y" }],
                lightbox: [
                    { name: "description", height: 70, map_to: "text", type: "textarea" },
                    { name: "type", type: "typeselect", map_to: "type" },
                    {
                        "sections": [
                            { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
                            { name: "type", type: "typeselect", map_to: "type" },
                            { name: "time", type: "duration", map_to: "auto" }]
                    }],
                buttons_left: ["gantt_cancel_btn"],
                buttons_right: [],
                details_on_dblclick: true,
                drag_links: false,
                drag_move: false,
                drag_progress: false,
            },
        };

        refs: {
            container: Element;
        };

        GanttInit(): void {
            let ganttContainer: any = this.state.id;
            let gantt = ganttObject.gantt;
            gantt.config.columns = this.props.config.columns;
            gantt.config.types = this.props.config.types;
            gantt.config.buttons_left = this.props.config.buttons_left;
            gantt.config.buttons_right = this.props.config.buttons_right;
            gantt.config.details_on_dblclick = this.props.config.details_on_dblclick;
            gantt.config.drag_links = this.props.config.drag_links;
            gantt.config.drag_move = this.props.config.drag_move;
            gantt.config.drag_progress = this.props.config.drag_progress;
            gantt.config.grid_width = this.props.config.grid_width;

            gantt.init(ganttContainer);
            let data: any = global.getData(this.props.data);
            if (data && data != null && data != undefined) {
                if (data.constructor.name === "Object") {
                    data["data"] = data["Data"];
                    data["links"] = data["Links"];
                    if (data.data != undefined) {
                        gantt.parse(data);
                    }
                }
            };
        };

        GanttDestroy(): void {
            let ganttContainer: any = this.state.id;
            let gantt = ganttObject.gantt;
            gantt.destructor();
        };

        shouldComponentUpdate(nextProps: IEKGantt, nextState: any): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        componentDidMount() {
            this.GanttInit();
        };

        componentDidUpdate(): void {
            this.GanttInit();
        };

        render(): JSX.Element {
            var estilo = {
                "height": "500px",
                "marginTop": "0px",
                "marginBottom": "15px",
                "paddingLeft": "0px"
            };
            let id: any = this.state.id;
            return <div id={this.state.id} style={{ width: "100%", height: "400px" }}>
            </div>;
        };
    })

    export const EKGanttCustom: any = global.connect(class extends React.Component<IEKGantt, IEKGantt> {
        constructor(props: IEKGantt) {
            super(props);
        };

        static props: any = (state: any) => ({
            data: state.global.WBSTareasSGPGantt
        });

        render(): JSX.Element {
            let data: any;
            if (isSuccessful(this.props.data)) {
                data = global.createSuccessfulStoreObject(global.getData(this.props.data));
            }
            else {
                data = this.props.data;
            };
            return <EKGantt {...this.props} data={data}/>; 
        }
    });

}

import EKGantt = EK.UX.EKGantt.EKGantt;
import EKGanttCustom = EK.UX.EKGantt.EKGanttCustom;


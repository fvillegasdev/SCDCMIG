namespace EK.UX {
    "use strict";

    interface ITreeViewProps extends React.Props<any> {
        id: string;
        data: any;
        itemKey?: string;
        itemIcon?: string;
        itemDescription?: string;
        itemChildren?: string;
        defaultIcon?: string;
        selectedItem?: any;
        buttonContainer?: string;
        onItemSelected?: (item: any, e?: any) => void;
    }

    export class TreeView extends React.Component<ITreeViewProps, {}> {
        constructor(props: ITreeViewProps) {
            super(props);

            this.treeViewInit = this.treeViewInit.bind(this);
            this.treeViewDestroy = this.treeViewDestroy.bind(this);
            this.onItemClick = this.onItemClick.bind(this);
            this.getItems = this.getItems.bind(this);
        }

        static defaultProps: ITreeViewProps = {
            id: undefined,
            data: undefined,
            itemKey: "ID",
            itemIcon: "Icono",
            itemDescription: "Nombre",
            itemChildren: "children",
            defaultIcon: "fa fa-circle"
        };

        refs: {
            container: Element;
        };

        onItemClick(e: any, data: any): any {
            if (this.props.onItemSelected) {
                this.props.onItemSelected(data.node.data.item, e);
            };
        };

        shouldComponentUpdate(nextProps: ITreeViewProps, nextState: any): boolean {
            return global.hasChanged(this.props.data, nextProps.data);
        }

        treeViewInit(): void {
            let container: any = $(this.refs.container);
            let data: any;
            if (global.isSuccessful(this.props.data)) {
                data = global.getData(this.props.data);
            };

            container
                .jstree({
                    "core": {
                        "data": this.getItems(data)
                    },
                    "plugins": ["json_data"]
                })
                .on("select_node.jstree", this.onItemClick)
                .on("ready.jstree", () => {
                    container.find(".jstree-node.jstree-leaf").on("dragstart", (e) => {
                        var dragIcon = document.createElement('img');
                        dragIcon.src = "Content/Img/document-icon.png";
                        dragIcon.width = 100;
                        e.originalEvent.dataTransfer.setDragImage(dragIcon, -10, -10);

                        e.originalEvent.dataTransfer.setData("data", e.currentTarget.attributes["data"].value);
                    });
                })
                .on("after_open.jstree", (e) => {
                    container.find(".jstree-node.jstree-leaf").off("dragstart").on("dragstart", (e) => {
                        e.originalEvent.dataTransfer.setData("data", e.currentTarget.attributes["data"].value);
                    });
                });
        }

        treeViewDestroy(): void {
            let container: any = $(this.refs.container);

            try {
                container.jstree("destroy");
            }
            catch (e) { };
        };

        componentDidMount(): void {
            this.treeViewInit();
        }

        componentWillUnmount(): void {
            this.treeViewDestroy()
        }

        componentWillUpdate(nextProps: ITreeViewProps, nextState: any) {
            this.treeViewDestroy()
        }

        componentDidUpdate(): void {
            this.treeViewInit();
        }

        getItems(data: any[]): any {
            if (!data) {
                return [];
            };

            let retValue: any[] = [];
            for (var i = 0; i < data.length; i++) {
                retValue.push({
                    "text": data[i][this.props.itemDescription],
                    "state": {
                        "opened": false,
                        "disabled": false,
                        "selected": false
                    },
                    "data": {
                        "item": data[i]
                    },
                    "li_attr": {
                        "data": JSON.stringify(data[i])
                    }
                });

                let children: any = data[i][this.props.itemChildren];
                if (children) {
                    retValue[i].children = this.getItems(children);
                };
            };

            return retValue;
        }
        renderItems(data: any[]) {
            if (!data) {
                return null;
            };
            return <ul>
                {data.map((value: any, index: number) => {
                    let icon: string = value[this.props.itemIcon] ? value[this.props.itemIcon] : this.props.defaultIcon;

                    return <li
                        key={value[this.props.itemKey]}
                        data-item={JSON.stringify(value)}
                        data-jstree={JSON.stringify({ opened: true, icon: icon })}>
                        {value[this.props.itemDescription]}
                        {value[this.props.itemChildren] ? this.renderItems(value[this.props.itemChildren]) : null}
                    </li>;
                })}
            </ul>;
        }

        render(): JSX.Element {
            return <Column><div id={this.props.id} ref="container"></div></Column>;
        }
    }
}

import TreeView = EK.UX.TreeView;

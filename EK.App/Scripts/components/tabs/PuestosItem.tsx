namespace EK.UX.Tabs {
    "use strict";
    const idForm: string = "puestos";

    interface IPuestosItemsProps extends IPortletTabPaneProps {
        loadData?: () => void;
        cliente?: any;
    }

    export class PuestosItems extends React.Component<IPuestosItemsProps, IPuestosItemsProps> {
        constructor(props: IPuestosItemsProps) {
            super(props);

            this.onItemClick = this.onItemClick.bind(this);
            this.onClickNewItem = this.onClickNewItem.bind(this);
        };

        static defaultProps: IPuestosItemsProps = {
            data: {},
            icon: "glyphicon glyphicon-signal",
            title: "Puestos",
        };

        onItemClick(item: any) {
            let route: string = "kontrol/puestos/" + item.ID;
            ReactRouter.hashHistory.push(route);
        }

        onClickNewItem(e: any) {
            let route: string = "kontrol/puestos/nuevo";
            ReactRouter.hashHistory.push(route);
        }

        formatItem(index: number, item: any) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <Row>
                <Column lg={6} md={6} sm={6} xs={12}>
                    {item.Clave}
                </Column>
                <Column lg={12} md={12} sm={12} xs={12}>
                    {item.Nombre}
                </Column>
            </Row>;
        }

        componentDidMount() {
            if (this.props.loadData) {
                if (this.props.data.status !== AsyncActionTypeEnum.default ||
                    this.props.data.status !== AsyncActionTypeEnum.failed) {
                    this.props.loadData();
                }
            }
        }

        shouldComponentUpdate(nextProps: IPuestosItemsProps, nextState: IPuestosItemsProps): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        render(): JSX.Element {
            let header: JSX.Element =
                <div className="mt-list-head" style={{ textAlign: "right", paddingTop: 5, paddingBottom: 5, paddingRight: 5, backgroundColor: "rgb(81, 107, 167)" }}>
                    <div className="list-head-title-container">
                    </div>
                    <AddPuesto text="" icon={"fa fa-plus-square-o"} iconOnly={false}
                        inverse={false} isInHeaderPortlet={true} color={ColorEnum.greenSharp} />
                </div>;

            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {this.props.data.status === AsyncActionTypeEnum.loading
                    ? <Updating text="actualizando puestos..." />
                    : this.props.data.status === AsyncActionTypeEnum.successful
                        ? <List
                            listHeader={header}
                            items={this.props.data}
                            formatter={this.formatItem}
                            readonly={true}
                            onItemClick={this.onItemClick} />
                        : null
                }
            </PortletTabPane>;
        }
    }

    const mapProps: any = (state: any) => {
        return {
            data: state.puestos.puestos
        };
    }

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (): void => {
                let key: string = "catalogos/get(puestos)";
                dispatchAsync("puestos-catalogo", key);
            }
        };
    };

    //Botón Add
    const mapAddPuestoDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {

                dispatch(EK.Global.action("forms-reset-state", { idForm }));
                go("kontrol/puestos/nuevo");
            }
        }
    };

    let AddPuesto: any = ReactRedux.connect(null, mapAddPuestoDispatchs)(buttons.Button);
    export let ConnectedPuestosItems: any = ReactRedux.connect(mapProps, mapDispatchs)(PuestosItems);
}

import PuestosItemsTab = EK.UX.Tabs.ConnectedPuestosItems;
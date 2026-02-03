namespace EK.UX.Tabs {
    "use strict";
    interface ICompaniasItemProps extends IPortletTabPaneProps {
        loadData?: (id: number) => void;
        cliente?: any;
    }

    export class CompaniasItem extends React.Component<ICompaniasItemProps, ICompaniasItemProps> {
        constructor(props: ICompaniasItemProps) {
            super(props);

            this.onItemClick = this.onItemClick.bind(this);
        };

        static defaultProps: ICompaniasItemProps = {
            data: {},
            icon: "icon-ek-049",
            title: "Compañías",
        };

        onItemClick(item: any) {
            console.log(item);

            let route: string = "kontrol/companias/" + item.ID;

            ReactRouter.hashHistory.push(route);
        }

        formatItem(index: number, item: any) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <Row style={{ height: 85 }}>
                <Column size={[10, 10, 10 , 10]}>
                    <Column size={[12, 12, 12, 12]} style={{paddingLeft: 0}}>
                        <h5 style={{ color: "rgb(51, 51, 51)", marginBottom: 0, fontWeight: 500 }}>{item.Nombre}</h5>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0 }}>
                        <h6 style={{ marginBottom: 0 }}>{item.Rfc}</h6>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0 }}>
                        <h6>{item.Localidad.Nombre}</h6>
                    </Column>
                </Column>
                <Column size={[2, 2, 2, 2]} style={{ paddingTop: 34, color: "rgb(231, 233, 235)" }}>
                    <span className="icon-ek-087" style={{ fontSize: 36 }}></span>
                </Column>
            </Row>;
        }

        componentDidMount() {
            if (this.props.cliente && this.props.cliente.ID) {
                if (this.props.loadData) {
                    if (this.props.data.status !== AsyncActionTypeEnum.default ||
                        this.props.data.status !== AsyncActionTypeEnum.failed) {
                        this.props.loadData(this.props.cliente.ID);
                    }
                }
            }
        }

        componentWillReceiveProps(nextProps: ICompaniasItemProps) {
            if (this.props.data &&
                (this.props.data.status === AsyncActionTypeEnum.successful
                    || this.props.data.status === AsyncActionTypeEnum.loading)) {
                return;
            }

            if (nextProps.data &&
                (nextProps.data.status === AsyncActionTypeEnum.successful
                || nextProps.data.status === AsyncActionTypeEnum.loading)) {
                return;
            }

            if (nextProps.cliente && nextProps.cliente.ID) {
                if (this.props.cliente.ID !== nextProps.cliente.ID) {
                    if (this.props.loadData) {
                        this.props.loadData(nextProps.cliente.ID);
                    }
                }
            }
        }

        shouldComponentUpdate(nextProps: ICompaniasItemProps, nextState: ICompaniasItemProps): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        render(): JSX.Element {
            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {this.props.data.status === AsyncActionTypeEnum.loading
                    ? <Updating text="actualizando compañías..." />
                    : this.props.data.status === AsyncActionTypeEnum.successful 
                        ? <List
                            listHeader={null}
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
            data: state.clientes.companias,
            cliente: state.clientes.selected.data
        };
    }

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (id: number): void => {
                dispatch(EK.Global.actionAsync({
                    action: "clientes-companias",
                    url: "cliente(" + id + ")/companias"
                }));
            }
        };
    };

    export let ConnectedCompaniasItem: any = ReactRedux.connect(mapProps, mapDispatchs)(CompaniasItem);
}

import CompaniasItemTab = EK.UX.Tabs.ConnectedCompaniasItem;
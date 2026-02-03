namespace EK.UX.Tabs {
    "use strict";
    export interface IUsuariosItemProps extends IPortletTabPaneProps {
        loadData?: (id: number) => void;
        cliente?: any;
    }

    export class UsuariosItem extends React.Component<IUsuariosItemProps, IUsuariosItemProps> {
        constructor(props: IUsuariosItemProps) {
            super(props);

            this.onItemClick = this.onItemClick.bind(this);
            this.onClickNewItem = this.onClickNewItem.bind(this);
        };

        static defaultProps: IUsuariosItemProps = {
            data: {},
            icon: "icon-ek-021",
            title: "Usuarios",
        };

        onItemClick(item: any) {
            console.log(item);
            let route: string = "kontrol/usuarios/" + item.ID;

            ReactRouter.hashHistory.push(route);

        }

        onClickNewItem(e: any) {
            //location.href = "kontrol#/usuarios/nuevo";
            let route: string = "kontrol/usuarios/nuevo";

            ReactRouter.hashHistory.push(route);
        }

        formatItem(index: number, item: any) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <Row style={{ height: 85 }}>
                <Column size={[10, 10, 10, 10]}>
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0 }}>
                        <h5 style={{ color: "rgb(51, 51, 51)", marginBottom: 0, fontWeight: 400 }}>{item.Nombre}</h5>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0 }}>
                        <h6 style={{ marginBottom: 0 }}>{item.Puesto.Nombre}</h6>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: 0 }}>
                        <h6>{item.Email}</h6>
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

        componentWillReceiveProps(nextProps: IUsuariosItemProps) {
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

        shouldComponentUpdate(nextProps: IUsuariosItemProps, nextState: IUsuariosItemProps): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        render(): JSX.Element {
            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {this.props.data.status === AsyncActionTypeEnum.loading
                    ? <Updating text="actualizando usuarios..." />
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

    export class $usuariosItem {
        static getProps(state: any): any {
            return {
                $cliente: state.global.app.data.Cliente,
                $isEnkUser: state.global.app.data.Cliente.ENKUser === 1,
                data: state.clientes.usuarios,
                cliente: state.clientes.selected.data
            };
        };

        static dispatchs: any = {
            loadData: (id: number): void => {
                dispatchAsync("clientes-usuarios", "cliente(" + id + ")/usuarios");
            }
        };

        static getDispatchs(): any {
            return $usuariosItem.dispatchs;
        };
    };

    export let ConnectedUsuariosItem: any = ReactRedux.connect($usuariosItem.getProps, $usuariosItem.getDispatchs)(UsuariosItem);
}

import UsuariosItemTab = EK.UX.Tabs.ConnectedUsuariosItem;
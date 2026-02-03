namespace EK.UX.Tabs {
    "use strict";
    interface IModulosUsuarioItemProps extends IPortletTabPaneProps {
        loadData?: () => void;
        cliente?: any;
    }

    export class ModulosUsuarioItem extends React.Component<IModulosUsuarioItemProps, IModulosUsuarioItemProps> {
        constructor(props: IModulosUsuarioItemProps) {
            super(props);

            this.onItemClick = this.onItemClick.bind(this);
            this.onClickNewItem = this.onClickNewItem.bind(this);
        };

        static defaultProps: IModulosUsuarioItemProps = {
            data: {},
            icon: "icon-ek-058",
            title: "Modulos asignados",
        };

        onItemClick(item: any) {
            console.log(item);
            let route: string = "kontrol/modulos/" + item.ID;

            ReactRouter.hashHistory.push(route);

        }

        onClickNewItem(e: any) {
            //location.href = "kontrol#/usuarios/nuevo";
            let route: string = "kontrol/modulos/nuevo";

            ReactRouter.hashHistory.push(route);
        }

        formatItem(index: number, item: any) {
            var itemKey: string = "generic-item-key-" + (index).toString();
            let isOdd = !(index % 2) ? "bg-grey-cararra bg-font-grey-cararra" : "";

            return <Row>
                <Column lg={6} md={6} sm={6} xs={12}>
                    {item.Clave}
                </Column>
                <Column lg={6} md={6} sm={6} xs={12}>
                    {item.Rfc}
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

        //componentWillReceiveProps(nextProps: IModulosUsuarioItemProps) {
        //    if (this.props.data &&
        //        (this.props.data.status === AsyncActionTypeEnum.successful
        //            || this.props.data.status === AsyncActionTypeEnum.loading)) {
        //        return;
        //    }

        //    if (nextProps.data &&
        //        (nextProps.data.status === AsyncActionTypeEnum.successful
        //            || nextProps.data.status === AsyncActionTypeEnum.loading)) {
        //        return;
        //    }

        //    if (nextProps.cliente && nextProps.cliente.ID) {
        //        if (this.props.cliente.ID !== nextProps.cliente.ID) {
        //            if (this.props.loadData) {
        //                this.props.loadData(nextProps.cliente.ID);
        //            }
        //        }
        //    }
        //}

        shouldComponentUpdate(nextProps: IModulosUsuarioItemProps, nextState: IModulosUsuarioItemProps): boolean {
            return this.props.data.timestamp !== nextProps.data.timestamp;
        }

        render(): JSX.Element {
            let header: JSX.Element = <div></div>;

            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {this.props.data.status === AsyncActionTypeEnum.loading
                    ? <Updating text="actualizando modulos..." />
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
            data: state.global.usuarioModulos
        };
    }

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (): void => {
                dispatch(EK.Global.actionAsync({
                    action: "usuarios-modulos",
                    url: "usuario/modulos"
                }));
            }
        };
    };

    export let ConnectedModulosUsuarioItem: any = ReactRedux.connect(mapProps, mapDispatchs)(ModulosUsuarioItem);
}

import ModulosUsuarioItemTab = EK.UX.Tabs.ConnectedModulosUsuarioItem;
/// <reference path="../../../../Scripts/typings/react/react-global.d.ts" />

namespace EK.Modules.Kontrol.Portlets {
    "use strict";

    interface IProps extends React.Props<any> {
        notificadores?: EK.Store.IAsyncData;
        selected?: any;
    }

    class ConnectedPortletNotificador extends React.Component<IProps, IProps> {
        constructor(props: IProps) {
            super(props);

            this.state = this.props;
        }

        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
            // only update when client changed
            return (nextProps.selected.ID !== nextState.selected.ID) ||
                (nextProps.notificadores.status !== nextState.notificadores.status &&
                    nextProps.selected.ID === nextState.selected.ID);
        }

        render(): JSX.Element {
            // preserve render props
            this.state = this.props;

            return <EK.UX.Portlet
                bordered={false}
                loading={this.props.notificadores.status === EK.Store.AsyncActionTypeEnum.loading}
                color={EK.UX.ColorEnum.greySteel}>
                <EK.UX.PortletTitle title="Notificadores" />
                <EK.UX.PortletActions>
                    <buttons.ButtonGroup>
                        <buttons.Button
                            icon={EK.UX.IconTypeEnum.plus}
                            iconOnly={true}
                            inverse={false}
                            color={EK.UX.ColorEnum.greenSharp} />
                    </buttons.ButtonGroup>
                </EK.UX.PortletActions>
            </EK.UX.Portlet>;
        }
    };

    const mapProps: any = (state: any): any => {
        return {            
            notificadores: state.flujo.notificadores
        };
    };

    export let PortletNotificadores: any = ReactRedux.connect(mapProps)(ConnectedPortletNotificador);
}
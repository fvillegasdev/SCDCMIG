/// <reference path="../../../../Scripts/typings/react/react-global.d.ts" />

namespace EK.Modules.Kontrol.Portlets {
    "use strict";

    interface IProps extends React.Props<any> {
        companias?: EK.Store.IAsyncData;
        selected?: any;
    }

    class ConnectedPortletCompanias extends React.Component<IProps, IProps> {
        constructor(props: IProps) {
            super(props);

            this.state = this.props;
        }

        shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
            // only update when client changed
            return (nextProps.selected.ID !== nextState.selected.ID) ||
                (nextProps.companias.status !== nextState.companias.status &&
                nextProps.selected.ID === nextState.selected.ID);
        }

        render(): JSX.Element {
            // preserve render props
            this.state = this.props;

            return <EK.UX.Portlet
                bordered={false}
                loading={this.props.companias.status === EK.Store.AsyncActionTypeEnum.loading}                
                color={EK.UX.ColorEnum.greySteel}>
                <EK.UX.PortletTitle title="Compañías" />
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
            selected: state.clientes.selected,
            companias: state.clientes.companias
        };
    };

    export let PortletCompanias: any = ReactRedux.connect(mapProps)(ConnectedPortletCompanias);
}
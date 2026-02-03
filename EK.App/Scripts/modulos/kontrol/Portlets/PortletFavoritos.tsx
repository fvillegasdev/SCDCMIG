namespace EK.UX.Tabs {
    "use strict";

    interface IFavoritosProps extends EK.UX.IPortletTabPaneProps {
        panel?: boolean;
        removerFavorito?: (favorito: any) => any;
    }

    export class FavoritosItem extends React.Component<IFavoritosProps, IPortletTabPaneState> {
        constructor(props: IFavoritosProps) {
            super(props);
        };

        static defaultProps: IFavoritosProps = {
            data: {},
            panel: false,
            icon: "fas fa-star",
            title: "Mis Favoritos"
        };

        componentDidMount(): any {};
        componentDidUpdate(prevProps: IFavoritosProps, prevState: IFavoritosProps): any { };

        componentWillReceiveProps(nextProps: IFavoritosProps): void {
            if (wasUpdated(this.props.data, nextProps.data)) {
                success("La lista de favoritos fué actualizada");
            }
        };

        shouldComponentUpdate(nextProps: IFavoritosProps, nextState: IPortletTabPaneState): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        render(): JSX.Element {
            let favoritos: any = this.props.data;
            let starIcon: any = <EK.UX.Icon icon={this.props.icon} style={{ color: "yellow", fontWeight: 600 }} />;

            let list: any = <UpdateColumn info={favoritos} text="actualizando...">
                <List items={favoritos} readonly={false} addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        let icono: any = item.Icono ? item.Icono : "far fa-star";

                        return <a href={item.Enlace} style={{ padding: 10 }}>
                            <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
                            <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Titulo}</div>
                        </a>;}
                    } />
            </UpdateColumn>;

            return this.props.panel ?
                <Column size={[12, 6, 4, 3]}>
                    <div className="portlet light bordered">
                        <div className="portlet-title">
                            <div className="caption caption-md">
                                {starIcon}
                                <span className="caption-subject font-blue-madison bold uppercase">{this.props.title}</span>
                            </div>
                        </div>
                        <div className="portlet-body">
                            {list}
                        </div>
                    </div>
                </Column> :
                <PortletTabPane title={this.props.title} icon={this.props.icon}>
                    <div className="mt-element-list">
                        <div className="mt-list-container list-news" style={{ borderTop: "1px solid #e7ecf1", paddingTop: 0, paddingBottom: 0 }} ref="list">
                            {list}
                        </div>
                    </div>
                </PortletTabPane>;
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            data: state.global.favoritos
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            removerFavorito: (favorito: any): any => {
                dispatch(actionAsync({
                    action: "usuarios-favoritos-remover",
                    type: HttpMethod.PUT,
                    url: "usuarios/favoritos/remover",
                    data: favorito,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        };
    };

    export let Favoritos$Tab: any = ReactRedux.connect(mapProps, mapDispatchs)(FavoritosItem);
}

import Favoritos$Tab = EK.UX.Tabs.Favoritos$Tab;
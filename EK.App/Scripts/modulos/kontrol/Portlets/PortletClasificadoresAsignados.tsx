namespace EK.UX.Tabs {
    "use strict";

    interface IClasificadoresAsignadosProps extends EK.UX.IPortletTabPaneProps {
        item?: any;
        perfil?: boolean;
        panel?: boolean;
        claveEntidad?: string;
        clasificadoresPorEntidad?: any;
        clasificadoresPorPerfil?: any;
        obtenerClasificadoresAsignados?: (claveEntidad: string, idItem: number) => any;
        obtenerClasificadoresPerfil?: () => any;
    }

    export class ClasificadoresAsignadosItem extends React.Component<IClasificadoresAsignadosProps, IPortletTabPaneState> {
        constructor(props: IClasificadoresAsignadosProps) {
            super(props);
        };

        static defaultProps: IClasificadoresAsignadosProps = {
            data: {},
            perfil: false,
            panel: false,
            icon: "icon-ek-059",
            title: "Mis Clasificadores"
        };

        componentDidMount(): any {
            if (this.props.perfil) {
                this.props.obtenerClasificadoresPerfil();
            } else {
                if (isSuccessful(this.props.item)) {
                    this.props.obtenerClasificadoresAsignados(this.props.claveEntidad, this.props.item.data.ID);
                };
            }
        };

        componentDidUpdate(prevProps: IClasificadoresAsignadosProps, prevState: IClasificadoresAsignadosProps): any { };

        componentWillReceiveProps(nextProps: IClasificadoresAsignadosProps): void {
            if (hasChanged(this.props.item, nextProps.item)) {
                if (isSuccessful(this.props.item)) {
                    this.props.obtenerClasificadoresAsignados(nextProps.claveEntidad, nextProps.item.data.ID);
                };
            };
        };

        shouldComponentUpdate(nextProps: IClasificadoresAsignadosProps, nextState: IPortletTabPaneState): boolean {
            return hasChanged(this.props.item, nextProps.item) ||
                (!this.props.perfil && hasChanged(this.props.clasificadoresPorEntidad, nextProps.clasificadoresPorEntidad)) ||
                (this.props.perfil && hasChanged(this.props.clasificadoresPorPerfil, nextProps.clasificadoresPorPerfil));
        };

        render(): JSX.Element {
            let clasificadores: any = this.props.perfil ? this.props.clasificadoresPorPerfil : this.props.clasificadoresPorEntidad;

            let list: any = <UpdateColumn info={clasificadores} text="actualizando...">
                <List items={clasificadores}
                    childrenPropertyName="Clasificadores"
                    readonly={false}
                    addRemoveButton={false}
                    formatter={(index: number, item: any) => {
                        let hasChilds: boolean = item.Clasificadores && item.Clasificadores.length > 0;
                        let icono: string = hasChilds ? "fa fa-list-alt" : "icon-ek-059";

                        return <div>
                            <i className={icono} style={{ height: 25, padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
                            <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Nombre}</div>
                        </div>
                    } }
                    />
            </UpdateColumn>;

            return this.props.panel ?
                <Column size={[12, 6, 4, 3]}>
                    <div className="portlet light bordered">
                    <div className="portlet-title">
                        <div className="caption caption-md">
                            <i className={this.props.icon}></i>
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

    const clasificadoresProps: any = (state: any): any => {
        return {
            clasificadoresPorEntidad: state.clasificadores.clasificadoresPorEntidad
        };
    };

    const clasificadoresPerfilProps: any = (state: any): any => {
        return {
            clasificadoresPorPerfil: state.clasificadores.clasificadoresPorPerfil
        };
    };

    const mapClasificadoresDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            obtenerClasificadoresAsignados: (claveEntidad: string, idItem: number): any => {
                dispatchAsync("clasificadores-clasificadoresentidad", "clasificadores/entidad(" + claveEntidad + "/" + idItem + ")");
            },
            obtenerClasificadoresPerfil: (): any => {
                dispatchAsync("clasificadores-perfil", "clasificadores/perfil");
            }
        };
    };

    export let Clasificadores$Tab: any = ReactRedux.connect(clasificadoresProps, mapClasificadoresDispatchs)(EK.UX.Tabs.ClasificadoresAsignadosItem);
    export let Clasificadores$Perfil$Tab: any = ReactRedux.connect(clasificadoresPerfilProps, mapClasificadoresDispatchs)(EK.UX.Tabs.ClasificadoresAsignadosItem);
}

import Clasificadores$Tab = EK.UX.Tabs.Clasificadores$Tab;
import Clasificadores$Perfil$Tab = EK.UX.Tabs.Clasificadores$Perfil$Tab;
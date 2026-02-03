namespace EK.UX.Tabs {
    "use strict";

    interface INivelesAsignadosProps extends EK.UX.IPortletTabPaneProps {
        usuario?: any;
        perfil?: boolean;
        obtenerNivelesAsignados?: (idUsuario: number) => any;
        obtenerNivelesAsignadosPerfil?: () => any;
    }

    export class NivelesAsignadosItem extends React.Component<INivelesAsignadosProps, IPortletTabPaneState> {
        constructor(props: INivelesAsignadosProps) {
            super(props);
        };

        static defaultProps: INivelesAsignadosProps = {
            data: {},
            icon: "icon-key",
            title: "Niveles",
        };

        componentDidMount(): any {
            if (this.props.perfil) {
                if (!isLoadingOrSuccessful(this.props.usuario)) {
                    if (this.props.perfil) {
                        this.props.obtenerNivelesAsignadosPerfil();
                    } else {
                        this.props.obtenerNivelesAsignados(this.props.usuario.data.ID);
                    };
                };
            };
        };

        componentDidUpdate(prevProps: INivelesAsignadosProps, prevState: INivelesAsignadosProps): any { };

        componentWillReceiveProps(nextProps: INivelesAsignadosProps): void {
            if (hasChanged(this.props.usuario, nextProps.usuario)) {
                if (this.props.perfil) {
                    this.props.obtenerNivelesAsignadosPerfil();
                } else {
                    this.props.obtenerNivelesAsignados(nextProps.usuario.data.ID);
                };
            };
        };

        shouldComponentUpdate(nextProps: INivelesAsignadosProps, nextState: IPortletTabPaneState): boolean {
            return hasChanged(this.props.usuario, nextProps.usuario) ||
                hasChanged(this.props.data, nextProps.data);
        };

        render(): JSX.Element {
            let data: any[] = this.props.data.data;

            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <div className="mt-element-list">
                    <div className="mt-list-container list-news" style={{ borderTop: "1px solid #e7ecf1", paddingTop: 0, paddingBottom: 0 }} ref="list">
                        <UpdateColumn info={this.props.data} text="actualizando...">
                            {data.length > 0 ?
                                    data.map((value: any, index: number) => {
                                    return <Row key={index} style={{marginLeft: 0, marginRight: 0, borderBottom: "solid 3px #f1f1f1"}}>
                                        <Column size={[6, 6, 6, 6]} style={{ fontSize: 12, padding: 10 }}>{value.Compania.Nombre}</Column>
                                        <Column size={[6, 6, 6, 6]} style={{ fontSize: 12, padding: 10, fontWeight: 600 }}>{value.Nivel.Nivel}</Column>
                                        </Row>
                                    })
                                : null}
                        </UpdateColumn>
                    </div>
                </div>
            </PortletTabPane>;
        }
    }

    const nivelesUsuarioProps: any = (state: any): any => {
        return {
            usuario: state.usuarios.selected,
            data: state.usuarios.nivelesUsuario,
            perfil: false
        };
    };

    const nivelesPerfilProps: any = (state: any): any => {
        return {
            usuario: state.usuarios.actual,
            data: state.usuarios.nivelesPerfil,
            perfil: true
        };
    };

    const mapNivelesUsuarioDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            obtenerNivelesAsignados: (idUsuario?: number): any => {
                dispatchAsync("usuarios-na-usuario", "usuarios(" + idUsuario + ")/niveles/asignados");
            },
            obtenerNivelesAsignadosPerfil: (): any => {
                dispatchAsync("usuarios-na-perfil", "usuarios/perfil/niveles/asignados");
            }
        };
    };

    export let Niveles$Usuario$Tab: any = ReactRedux.connect(nivelesUsuarioProps, mapNivelesUsuarioDispatchs)(EK.UX.Tabs.NivelesAsignadosItem);
    export let Niveles$Perfil$Tab: any = ReactRedux.connect(nivelesPerfilProps, mapNivelesUsuarioDispatchs)(EK.UX.Tabs.NivelesAsignadosItem);
}

import Niveles$Usuario$Tab = EK.UX.Tabs.Niveles$Usuario$Tab;
import Niveles$Perfil$Tab = EK.UX.Tabs.Niveles$Perfil$Tab;
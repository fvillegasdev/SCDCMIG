namespace EK.UX.Tabs {
    "use strict";

    interface ICompaniasUsuarioNivelProps extends IPortletTabPaneProps {
        change?: (value: any) => void;
        selected?: any;
        companiausuarionivel?: any;
    }

    export class PCompaniaUsuarioNivel extends React.Component<ICompaniasUsuarioNivelProps, IPortletTabPaneState> {
        constructor(props: ICompaniasUsuarioNivelProps) {
            super(props);
            this.state = { timestamp: 0 };

            this.onChange = this.onChange.bind(this);
        }

        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "fa fa-user",
            title: "Usuario-Nivel"
        };

        shouldComponentUpdate(nextProps: ICompaniasUsuarioNivelProps, nextState: IPortletTabPaneState): boolean {
            return true; // this.state.timestamp !== nextState.timestamp;
        }

        componentWillReceiveProps(nextProps: IPortletTabPaneProps) {
            if (this.state.timestamp !== nextProps.data.timestamp) {
                this.setState({ timestamp: nextProps.data.timestamp });
            }
        }

        onChange(e: any): any {
            console.log(e);
        }

        render(): JSX.Element {
            // preserve render props
            let v: any[] = [];
            let companiausuarionivel: any = this.props.data;

            if (companiausuarionivel && companiausuarionivel.data && companiausuarionivel.data.length > 0) {
                let data: any[] = companiausuarionivel.data;
                var itemKeytitulo: string = "generic-item-key-" + Number(new Date());
                v.push(<Row key={itemKeytitulo} className={" history-item"}>
                    <Column lg={6} md={6} sm={6} xs={6}>Nivel </Column>
                    <Column lg={6} md={6} sm={6} xs={6}>Usuario</Column>
                </Row>);
            }

            return <EK.UX.PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                {v}
                <List
                    items={this.props.data}
                    onChange={this.onChange}
                    formatter={(index: number, item: any) => { return <h5><span className="badge badge-primary">{item.Nivel.Nivel}</span>{item.Usuario.Nombre}</h5> } }
                    itemClass="dd-typeahead"
                    />
            </EK.UX.PortletTabPane >;
        }
    };

    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                dispatch(EK.Global.action("forms-reset-state", { idForm: "companiasusuarionivelNuevo" }));

                let route: string = "/CompaniasUsuarioNivel/Nuevo";
                ReactRouter.hashHistory.push(route);
            }
        }
    };

    const mapDeleteButtonDistpatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any) => {

                //if (confirm('¿Eliminar registro?')) {
                //    let id: number = info.id;
                //    console.log("DeleteDispatch");
                //}

                //dispatch(EK.Global.actionAsync({
                //    action: "companias-deletecompaniausuarionivel",
                //    url: "/UsuarioNivelCompania/Delete/" + id,
                //    key: "UsuarioNivelCompania/catalogo",
                //    duration: 1
                //}));
            }
        };
    };

    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
    let DelButton: any = ReactRedux.connect(null, mapDeleteButtonDistpatchs)(buttons.Button);
}
import PortletCompaniaUsuarioNivel = EK.UX.Tabs.PCompaniaUsuarioNivel;
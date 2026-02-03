//namespace EK.UX.Tabs {
//    let page: any = UsuariosItem.prototype as any;
//    let $page: any = $usuariosItem.prototype.constructor as any;

//    // Props & Dispatchs
//    $page.dispatchs.loadData =
//        (): void => {
//            dispatchAsync("usuarios-catalogo", "usuarios");
//        };

//    // PageCompanias
//    page.shouldComponentUpdate = function (nextProps: IUsuariosItemProps, nextState: IUsuariosItemProps) {
//        return false;
//    };

//    page.componentDidMount = function () {
//        let props: IUsuariosItemProps = this.props;

//        if (this.props.cliente && this.props.cliente.ID) {
//            if (this.props.loadData) {
//                if (this.props.data.status !== AsyncActionTypeEnum.default ||
//                    this.props.data.status !== AsyncActionTypeEnum.failed) {

//                    $usuariosItem.dispatchs.loadData();
//                    this.props.loadData(this.props.cliente.ID);
//                }
//            }
//        };

//        $usuariosPage.dispatchs.cargaUsuarios();
//        $usuariosPage.dispatchs.cargaHistoria();
//    };

//    // Connnect
//    UsuariosPage = ReactRedux.connect($usuariosPage.getProps, $usuariosPage.getDispatchs)(PageUsuarios);
//}
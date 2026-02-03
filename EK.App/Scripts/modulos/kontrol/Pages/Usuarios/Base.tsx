//namespace EK.Modules.Kontrol.Pages {
//    let page: any = PageUsuarios.prototype as any;
//    let $page: any = $usuariosPage.prototype.constructor as any;

//    // Props & Dispatchs
//    $page.dispatchs.cargaUsuarios =
//        (): void => {
//            dispatchAsync("usuarios-catalogo", "usuarios");
//        };

//    // PageCompanias
//    page.shouldComponentUpdate = function (nextProps: IUsuariosProps, nextState: IUsuariosProps) {
//        let props: IUsuariosProps = this.props;

//        return hasChanged(props.selected, nextProps.selected);
//    };

//    page.componentDidMount = function () {
//        let props: IUsuariosProps = this.props;

//        setCurrentEntityType(EK.Global.ClaveCatalogos.USUARIOS);
//        if (isSuccessful(EK.Store.getState().usuarios.usuarios)) {
//        } else {
//            $usuariosPage.dispatchs.cargaUsuarios();
//        }
//    };

//    // Connnect
//    UsuariosPage = ReactRedux.connect($usuariosPage.getProps, $usuariosPage.getDispatchs)(PageUsuarios);
//}
//namespace EK.Modules.Kontrol.Pages {
//    let page: any = PageUsuarios.prototype as any;
//    let $page: any = $usuariosPage.prototype.constructor as any;

//    // Props & Dispatchs
//    $page.dispatchs.cargaUsuarios =
//        (cliente: any): void => {
//            if (cliente && cliente.data && cliente.data.ID) {
//                let clienteId: number = cliente.data.ID;
//                let key: string = ["cliente(", clienteId, ")/usuarios"].join("");

//                dispatchAsync("usuarios-catalogo", key);

//                let keyCom: string = ["cliente(", clienteId, ")/companias/0/0"].join("");
//                dispatchAsync("load::COMPANIAS", keyCom);
//            } else {
//                dispatchDefault("usuarios-catalogo", []);
//                dispatchDefault("usuarios-setSelected", {});
//            };
//        };

//    // PageCompanias
//    page.shouldComponentUpdate = function (nextProps: IUsuariosProps, nextState: IUsuariosProps) {
//        return false;
//    };

//    page.componentDidUpdate = function () {
//        let props: IUsuariosProps = this.props;

//        $usuariosPage.dispatchs.cargaUsuarios(props.cliente);
//        $usuariosPage.dispatchs.cargaHistoria();
//    };

//    page.componentDidMount = function () {
//        setCurrentEntityType(EK.Global.ClaveCatalogos.USUARIOS);
//    };

//    // Connnect
//    UsuariosPage = ReactRedux.connect($usuariosPage.getProps, $usuariosPage.getDispatchs)(PageUsuarios);
//}
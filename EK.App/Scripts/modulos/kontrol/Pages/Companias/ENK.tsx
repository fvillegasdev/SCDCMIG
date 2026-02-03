//namespace EK.Modules.Kontrol.Pages {
//    let page: any = PageCompanias.prototype as any;
//    let $page: any = $companiasPage.prototype.constructor as any;

//    // Props & Dispatchs
//    $page.dispatchs.obtenerDatos =
//        (cliente: any): void => {
//            if (cliente && cliente.data && cliente.data.ID) {
//                let clienteId: number = cliente.data.ID;
//                let key: string = ["cliente(", clienteId, ")/companias(0/0)"].join("");
//                dispatchAsync("companias-catalogo", key);
//            } else {
//                dispatchDefault("companias-catalogo", []);
//                dispatchDefault("companias-setSelected", {});
//            }
//        };

//    // PageCompanias
//    page.shouldComponentUpdate = function (nextProps: ICompaniasProps, nextState: ICompaniasProps) {
//        let props: ICompaniasProps = this.props;

//        if (!props.cliente && !nextProps.cliente) {
//            return false;
//        } else if (!props.cliente && nextProps.cliente) {
//            return true;
//        } else {
//            if (props.cliente.timestamp !== nextProps.cliente.timestamp) {
//                return true;
//            }
//        }
//    };

//    page.componentDidUpdate = function() {
//            let props: ICompaniasProps = this.props;

//            $companiasPage.dispatchs.obtenerDatos(props.cliente);
//        };

//    // Connnect
//    companiasPage = ReactRedux.connect($companiasPage.getProps, $companiasPage.getDispatchs)(PageCompanias);
//}

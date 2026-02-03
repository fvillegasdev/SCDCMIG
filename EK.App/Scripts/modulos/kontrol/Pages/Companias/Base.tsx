//namespace EK.Modules.Kontrol.Pages {
//    let page: any = PageCompanias.prototype as any;
//    let $page: any = $companiasPage.prototype.constructor as any;

//    // Props & Dispatchs
//    $page.dispatchs.obtenerDatos =
//        (): void => {
//            dispatchAsync("companias-catalogo", "companias(0/0)");
//        };

//    // PageCompanias
//    page.shouldComponentUpdate = function (nextProps: ICompaniasProps, nextState: ICompaniasProps) {
//        return false;
//    };

//    page.componentDidMount = function() {
//        let props: ICompaniasProps = this.props;

//        $companiasPage.dispatchs.obtenerDatos();
//    };

//    // Connnect
//    companiasPage = ReactRedux.connect($companiasPage.getProps, $companiasPage.getDispatchs)(PageCompanias);
//}
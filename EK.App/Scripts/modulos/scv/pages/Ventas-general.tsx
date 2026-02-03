//namespace EK.Modules.SCV.Pages.Ventas {
//    "use strict";
//    const VENTA_PAGE_ID: string = "ventas";

//    interface IViewProps extends React.Props<any> {
//        item: any;
//    };

//    class VentasGeneral extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        static mapProps: any = (state: any): any => {
//            return {
//                item: state.ventas.selected
//            };
//        };

//        shouldComponentUpdate(nextProps: IViewProps, nextState: IViewProps): boolean {
//            return hasChanged(this.props.item, nextProps.item);
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[VENTA_PAGE_ID];
//            let venta: any = {};
//            let cliente: any = {};
//            let desarrollo: any = {};
//            let moneda: any = {};
//            let agente: any = {};
//            let estatusVenta: any = {};

//            if (isSuccessful(this.props.item)) {
//                venta = getData(this.props.item);
//                cliente = venta.Cliente ? venta.Cliente : {};
//                desarrollo = venta.Desarrollo ? venta.Desarrollo : {};
//                moneda = venta.Moneda ? venta.Moneda : {};
//                agente = venta.Agente ? venta.Agente : {};
//                estatusVenta = venta.EstatusVenta ? venta.EstatusVenta : {}
//            };

//            let current: any = this.props.item;

//            return <PanelUpdate info={this.props.item}>
//                    <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.idExpediente.label} value={venta.IdExpediente} size={[2, 1, 2, 2]} />
//                    <Label label={$page.form.nombre.label} value={cliente.Nombre} size={[12, 6, 6, 6]} />
//                        <Label label={$page.form.desarrollo.label} value={desarrollo.Descripcion} size={[10, 11, 4, 4]} />
//                        <Label label={$page.form.moneda.label} value={moneda.Nombre} size={[6, 3, 3, 3]} />
//                        <Label label={$page.form.estatusventa.label} value={estatusVenta.Nombre} size={[6, 3, 3, 3]} />

//                        <Label label={$page.form.agente.label} value={agente.Nombre + " " + agente.Apellidos} size={[12, 12, 6, 6]} />
//                    </Row>
//                </PanelUpdate>;
//        };
//    }

//    export let Ventas$General: any = ReactRedux.connect(VentasGeneral.mapProps, null)(VentasGeneral);
//}

//import Ventas$General = EK.Modules.SCV.Pages.Ventas.Ventas$General;
///// <reference path="../../../../Scripts/typings/react/react-global.d.ts" />
///// <reference path="../../../../Scripts/components/Breadcrumb.tsx" />
///// <reference path="../../../../Scripts/components/Buttons.tsx" />
///// <reference path="../../../../Scripts/components/Icon.tsx" />
///// <reference path="../../../../Scripts/components/Page.tsx" />
///// <reference path="../../../../Scripts/components/Portlet.tsx" />
///// <reference path="../../../../Scripts/components/store/Dispatchs.ts" />

//namespace EK.Modules.Kontrol.Pages {
//    "use strict";

//    interface IClientesProps extends React.Props<any> {
//        setSelected: (item: any) => void;
//        cargarCompanias: (idCliente: string) => void;
//    }

//    export class PageNuevoCliente extends React.Component<IClientesProps, IClientesProps> {
//        constructor(props: IClientesProps) {
//            super(props);

//            this.onSelectedClienteChanged = this.onSelectedClienteChanged.bind(this);
//        }

//        shouldComponentUpdate(nextProps: IClientesProps, nextState: IClientesProps): boolean {
//            // this shouldn't re-render
//            return false;
//        }

//        /**
//         *  Event to cacth the Cliente changed
//         * @param item
//         */
//        onSelectedClienteChanged(item: any): void {
//            this.props.setSelected(item);
//        }

//        render(): JSX.Element {
//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "EK", link: "/" },
//                { text: "Catálogos Globales", link: "/" },
//                { text: "Clientes", link: "/Clientes" },
//                { text: "Nuevo", link: "/Clientes/Nuevo" }
//            ];

//            // create the page component
//            let page: JSX.Element =
//                <EK.UX.Page
//                    id="EK0105"
//                    changePage={this.props.changePage}>
//                    <EK.UX.PageBar>
//                        <EK.UX.Breadcrumb data={itemsBC} />
//                        <EK.UX.PageToolbar />
//                    </EK.UX.PageBar>
//                    <EK.UX.Grid>
//                        <EK.UX.Row>
//                            <EK.UX.Column lg={8} md={8} sm={12} xs={12}>
//                                <EK.UX.PageTitle title="Cliente Nuevo" subTitle="administración de clientes" />
//                                <EK.UX.Input
//                                    id="Clave"
//                                    label="Código"
//                                    size={[12, 6, 6, 4]}
//                                    required={true}
//                                    helpLabel="Capture el nombre corto del cliente" />
//                                <DDLPuestos
//                                    id="Estatus"
//                                    label="Estatus"
//                                    size={[12, 6, 6, 4]}
//                                    required={true}
//                                    helpLabel="Seleccione el estatus del cliente"/>
//                                <EK.UX.DatePicker
//                                    id="VigenciaInicio"
//                                    label="Vigente desde"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Fecha de inicio del periodo de vigencia del cliente"
//                                    value="" />
//                                <EK.UX.DatePicker
//                                    id="VigenciaFin"
//                                    label="Vigente hasta"
//                                    xs={{ size: 12 }}
//                                    sm={{ size: 6 }}
//                                    md={{ size: 6 }}
//                                    lg={{ size: 4, push: 8 }}
//                                    helpLabel="Capture el nombre completo del cliente"
//                                    value="" />
//                                <EK.UX.Input
//                                    id="Nombre"
//                                    label="Nombre"
//                                    xs={{ size: 12 }}
//                                    sm={{ size: 12 }}
//                                    md={{ size: 12 }}
//                                    lg={{ size: 8, pull: 4 }}
//                                    helpLabel="Capture el nombre completo del cliente"
//                                    value="" />
//                            </EK.UX.Column>
//                            <EK.UX.Column lg={4} md={4} sm={12} xs={12}>
//                                <EK.Modules.Kontrol.Portlets.PortletCompanias />
//                            </EK.UX.Column>
//                        </EK.UX.Row>
//                    </EK.UX.Grid>
//                </EK.UX.Page>;

//            return page;
//        }
//    }
//}
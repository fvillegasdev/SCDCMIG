
namespace EK.Modules.SBO.Reportes {
    "use strict";
    const PAGE_ID: string = "SBO502";
    const form: () => EditForm = (): EditForm => {
        return new EditForm(PAGE_ID);
    };

    interface IReporteChequesProps extends React.Props<any> {
        cargaDatos: () => void;
        setSelected: (item: any) => void;
    }

    interface IReporteChequesItemProps extends EK.UX.IPortletTabPaneProps {
        data?: any;
    }

    class DetalladoCheques extends React.Component<IReporteChequesProps, IReporteChequesProps> {

        componentDidMount(): any {
            this.props.cargaDatos();
        }

        render(): JSX.Element {
            let itemsBC: EK.UX.IBreadcrumbItem[] = [
                { text: "EK", link: "/" },
                { text: "Bancos", link: "/sbo" },
                { text: "Reportes", link: "/sbo/reportes" },
                { text: "Reporte de Cheques", link: "/sbo/reporte/cheques" }
            ];

            let columns: any[] = [
                { "title": " ", "data": "Banco.Clave" },
                { "title": "Banco", "data": "Banco.Descripcion" },
                { "title": "Cuenta", "data": "Cuenta.Descripcion" },
                { "title": "Cheque", "data": "Cheque" },
                { "title": "Fecha", "data": "FechaMovimiento", render: EK.Global.getDTDateFormatted },
                { "title": " ", "data": "CC.Clave" },
                { "title": "Centro de Costo", "data": "CC.Descripcion" },
                { "title": " ", "data": "Concepto.Clave" },
                { "title": "Concepto", "data": "Concepto.Descripcion" },
                { "title": "Monto", "data": "MontoCheque" }
            ];

            // create the page component
            return <PageV2 id={PAGE_ID} breadcrumb={itemsBC} title="Reporte de Cheques">
                <PageButtons>
                    <NewButton />
                </PageButtons>
                <PageFilter>
                    <ReporteChequesItem />
                </PageFilter>
                <TableReporte id="tblReporteCheques" columns={columns} onRowSelected={null} />
            </PageV2 >;
        }
    }

    export class ReporteChequesItem extends React.Component<IReporteChequesItemProps, IReporteChequesItemProps> {
        constructor(props: IReporteChequesItemProps) {
            super(props);
        }

        static defaultProps: IReporteChequesItemProps = {
            data: {},
            icon: "icon-ek-135",
            title: "Filtros",
        };

        render(): JSX.Element {
            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <Form id={PAGE_ID} ref="form">

                    <DropdownList id="ccInicial" label="Zona Horaria" items={[]} size={[12, 12, 12, 12]}
                        helpLabel="Zona horaria donde utilizará el sistema"
                        required={true} />
                    <DropdownList id="ccFinal" label="Zona Horaria" items={[]} size={[12, 12, 12, 12]}
                        helpLabel="Zona horaria donde utilizará el sistema"
                        required={true} />

                    <DatePicker id="VigenciaInicio" label="Vigente desde" size={[12, 12, 12, 12]}
                        validations={[
                            validations.lessEqualThan("VigenciaFin", "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")
                        ]} />
                    <DatePicker id="VigenciaFin" label="Vigente hasta" size={[12, 12, 12, 12]}
                        validations={[
                            validations.greaterEqualThan("VigenciaInicio", "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")
                        ]} />

                    <DropdownList id="cuentaInicial" label="Zona Horaria" items={[]} size={[12, 6, 6, 6]}
                        helpLabel="Zona horaria donde utilizará el sistema"
                        required={true} />
                    <DropdownList id="cuentaFinal" label="Zona Horaria" items={[]} size={[12, 6, 6, 6]}
                        helpLabel="Zona horaria donde utilizará el sistema"
                        required={true} />
                    <DropdownList id="reporte" label="Zona Horaria" items={[]} size={[12, 6, 6, 6]}
                        helpLabel="Zona horaria donde utilizará el sistema"
                        required={true} />
                    <DropdownList id="formato" label="Zona Horaria" items={[]} size={[12, 6, 6, 6]}
                        helpLabel="Zona horaria donde utilizará el sistema"
                        required={true} />
                </Form>
            </PortletTabPane>;
        }
    }

    //
    // map props
    //
    const mapProps: any = (state: any): any => {
        return {
            data: state.cheques.reporteDetallado,
            selectedItem: state.bancos.selected
        };
    };

    const tableReporteMapProps: any = (state: any): any => {
        return {
            data: state.cheques.reporteDetallado
        };
    };

    //
    // map dispatchs
    //
    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargaDatos: (): void => {
                dispatchAsync("SBO-cheques-reporteDetallado", "cheques/reporte/detallado");
            }
        };
    };

    // 
    // connect
    // 
    export let ReporteDetalladoCheques: any = ReactRedux.connect(null, mapDispatchs)(DetalladoCheques);
    let TableReporte: any = ReactRedux.connect(tableReporteMapProps, null)(DataTableExt);
}
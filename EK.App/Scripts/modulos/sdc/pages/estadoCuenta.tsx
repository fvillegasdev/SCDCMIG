namespace EK.Modules.SDC.Pages.EstadoCuenta {
    "use strict";
    const ESTADO_CUENTA: string = "EstadoCuenta";

    const config: page.IPageConfig = global.createPageConfig("dashboardDesarrolloComunitario", "sdc");


    interface IEstadoCuenta extends page.IProps {
    };

    export let EstadoCuenta: any = global.connect(class extends React.Component<IEstadoCuenta, IEstadoCuenta> {
        constructor(props: IEstadoCuenta) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentDidMount()
        {
        }
        componentWillReceiveProps(nextProps: IEstadoCuenta, nextState: IEstadoCuenta): any {
           
        };
        render(): JSX.Element {


            let formatPeriodo: (data: any, row: any) => string = (data: any, row: any) => {
                let retValue: string;
                if (row && row.PeriodicidadDetalle) {
                    let nombre: string = row.PeriodicidadDetalle.Periodicidad.Clave == "M" ?
                        row.PeriodicidadDetalle.Periodicidad.Nombre :
                        row.PeriodicidadDetalle.Periodicidad.Nombre + " " + row.PeriodicidadDetalle.N;
                    return nombre;
                }
            };

            let formatEstatusEstadoCuenta: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {

                let clave: string = data && data.Clave ? data.Clave : "";
                let retValue: any;

                switch (clave) {
                    case "PEN":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "VEN":
                        retValue = <div className='bg-red-flamingo bg-font-red-flamingo' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "PAG":
                        retValue = <div className='bg-blue bg-font-blue' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                   
                    default:
                        retValue = "";
                        break;
                }

                return retValue;
            };

            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "Concepto.Nombre", width: "160px" })
                .add({ data: "PeriodicidadDetalle.Periodicidad.Nombre", width: "90px", format: formatPeriodo })
                .addDateFormat({ data: "PeriodicidadDetalle.FechaFin", width: "100px" })
                .addMoneyFormat({ data: "Cuota", width: "80px" })
                .add({ data: "Estatus", width: "100px", format: formatEstatusEstadoCuenta })
                .toArray();


            return <page.SectionListExtended
                id={ESTADO_CUENTA}
                parent={config.id}
                listFilter={[
                    <EK.Modules.SCV.Pages.Comisiones.AniosDDL addNewItem={"VT"} size={[12, 6, 6, 6]} id={"Anios"} />,
                ]}
                hideNewButton={true}
                addRefresh={false}
                icon="fa fa-table"
                size={[12, 6, 6, 6]}
                level={1}
                dtConfig={dtConfig}
                readonly={true}
                items={createSuccessfulStoreObject([])}>
            </page.SectionListExtended>
        };
    })
};

namespace EK.Modules.SCV.Pages.ReporteAnaliticoProspectos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("reporteanaliticoprospectos", "scv");

    export const Vista: any = global.connect(class Vista extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/ReporteAnaliticoProspectos/GetBP/GetReporteAnaliticoProspectos", { parametros: f });
        };
        exists(items: any, idCliente: number): boolean {
            let result: boolean = false;

            if (items && items.length)
            {
                items.forEach((value: any, index: number) => {

                    if (value.Cliente.ID == idCliente) {
                        result = true;
                    }

                });
            }
          
            return result;
        }
        componentWillReceiveProps(nextProps: page.IProps): void {
            if (global.hasChanged(this.props.data, nextProps.data)) {
                if (global.isSuccessful(nextProps.data)) {

                    let data: any[] = global.getData(nextProps.data, []);

                    var arregloClientes= new Array();
                    let totalClientes: number = 0;

                    if (data && data.length) {

                        data.forEach((value: any, index: number) => {

                            let insert: boolean = this.exists(arregloClientes, value.Cliente.ID);
                            if (insert == false)
                            {
                                arregloClientes.push(value);
                            }
                        });

                        totalClientes = arregloClientes.length;
                        Forms.updateFormElement(config.id, "TotalOportunidades", data.length);
                        Forms.updateFormElement(config.id, "TotalProspectos", totalClientes);
                    }
                }
            }
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);

            let formatIdExpediente: (data: any, row: any) => any = (data: any, row: any) => {
                if (row.ID > 0)
                {
                    let urlExpe: string = "#/scv/expedientes/" + row.ID;
                    let origen: string = row.IdBoleta > 0? "B":"C";

                    return <div className="label-link-grid label-value">
                        <a target="_blank" rel="noopener noreferrer" href={urlExpe} className="link2">
                            <i className="fas fa-external-link-square-alt"></i>
                        </a>

                        <a className="link-text" target="_blank" rel="noopener noreferrer" href={urlExpe} style={{ fontSize: "10px" }}>
                            <span className="link-text-name">{row.ID}</span>
                            <span className={"badge"}>{origen}</span>

                        </a>
                      
                    </div>;
                }
                return null;
            };
            let formatBoleta: (data: any, row: any) => any = (data: any, row: any) => {
                if (row.ID > 0)
                {
                    let desarrollo: string = row.Desarrollo && row.Desarrollo ? row.Desarrollo.Descripcion : "";

                    let urlBoleta: string = "#/scv/boletasProspeccion/" + row.IdBoleta;
                    let urlDesarrollo: string = "#/scv/desarrollos/" + row.Desarrollo.ID;

                    return <div className="label-link-grid label-value">
                        <a target="_blank" rel="noopener noreferrer" href={urlDesarrollo} className="link2">
                            <i className="fas fa-external-link-square-alt"></i>
                        </a>

                        <a className="link-text" target="_blank" rel="noopener noreferrer" href={urlDesarrollo} style={{ fontSize: "10px" }}>
                            <span className="link-text-name">{desarrollo}</span>
                        </a>

                        {row.IdBoleta > 0 ?
                            <a style={{ marginLeft: "1%" }} target="_blank" rel="noopener noreferrer" href={urlBoleta} className="link2">
                                <i style={{ color: "darkblue"}} className="icon-note"></i>
                            </a> : null
                        }
                    </div>;
                }
                return null;
               
            };

         
            dtConfig.columns
                .add({ data: "Asesor.Nombre" })
                .add({ data: "ID", width: "200px", format: formatIdExpediente })
                .addLinkCliente({ data: "Cliente.Nombre", width: "400px" })
                .add({ data: "Desarrollo.Descripcion", width: "300px", format: formatBoleta })
                .addDateFormat({ data: "FechaContacto", width: "180px" })
                .toArray();
            dtConfig.groups
                .add({ data: "Asesor.Nombre" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.DesarrollosDDL id="Desarrollo" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <DatePicker id="FechaContactoInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaContactoFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                </page.Filters>
                <Indicadores/>

               

                <dt.DataTableExtended dtConfig={dtConfig} dtType={"list"} />
            </page.Main>;
        };
    });


    interface IIndicador extends page.IProps {
        totalOportunidades: any;
        totalProspectos: any;
    };

    export let Indicadores: any = global.connect(class extends React.Component<IIndicador, IIndicador> {
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.totalOportunidades = Forms.getValue("TotalOportunidades", config.id);
            retValue.totalProspectos = Forms.getValue("TotalProspectos", config.id);
            return retValue;
        };
        static defaultProps: IIndicador = {
            totalOportunidades: undefined,
            totalProspectos: undefined,
        };
        shouldComponentUpdate(nextProps: IIndicador, nextState: any): boolean {
            return hasChanged(this.props.totalOportunidades, nextProps.totalOportunidades) ||
                   hasChanged(this.props.totalProspectos, nextProps.totalProspectos);
        };
        render(): any {
            let totalOportunidades: any = this.props.totalOportunidades;
            let totalProspectos: any = this.props.totalProspectos;

            if (totalProspectos != undefined || totalOportunidades != undefined)
            {
                return <Column size={[12, 12, 12, 12]} style={{ marginBottom: "1%", padding: "0px 0px 5px 0px", borderBottom:"#f1f1f1 1px solid" }}>
                    <label.Folio id={"TotalProspectos"} value={totalProspectos} size={[12, 1, 1, 1]} />
                    <label.Folio id={"TotalOportunidades"} value={totalOportunidades} size={[12, 1, 1, 1]} />
                </Column>
            }
            return null;
          
        };
    });

};
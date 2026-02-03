namespace EK.Modules.SCV.Pages.Reportes.FuerzaVentas {
    "use strict";

    const REPORTE_FUERZADEVENTAS: string = "FuerzaVentas";


    const config: page.IPageConfig = global.createPageConfig("reporteFuerzaVentas", "scv", [REPORTE_FUERZADEVENTAS]);





    export class Vista extends page.Base
    {

        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters);
            let encodedFilters: string = global.encodeObject(f);


            if (f && f.Year && f.Year.ID > 0 && f.Proceso && f.Proceso.ID>0 && f.Agrupador && f.Agrupador.ID>0)
            {
                let encodedFilters: string = global.encodeObject(f);
                global.dispatchAsync("global-page-data", "base/kontrol/expedientesReportes/Get/GetReporteFuerzaVentas/" + encodedFilters, REPORTE_FUERZADEVENTAS);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], REPORTE_FUERZADEVENTAS);
            }

        };

        onExport(item: any, props: page.IProps): any {
            let encodedFilters: string = global.encodeObject({ claveReporte: config.id });
            window.open("base/scv/expedientesReportes/exportar/" + encodedFilters);
        };
        
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowNew={false}
                allowView={false}
                onExport={this.onExport}
                allowDelete={false}>


                <page.Filters collapsed={false}>
                    <ddl.DesarrollosDDL id="Desarrollo" size={[12, 3, 3, 3]} addNewItem={"VT"} />
                    <YearExecutionProcessesDDl id="Year" size={[12, 3, 3, 3]} addNewItem={"VT"} />
                    <ProcessesReportDDl id="Proceso" size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <AgrupadoresDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                </page.Filters>

                <Reporte/>
            </page.Main>;
        };
    };

    interface IReporteFuerzaVentas extends page.IProps {
        informacionReporte?: any;
    };

    export let Reporte: any = global.connect(class extends React.Component<IReporteFuerzaVentas, IReporteFuerzaVentas> {
        constructor(props: IReporteFuerzaVentas) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.informacionReporte = state.global.catalogo$FuerzaDeVentas;
            return retValue;
        };
        componentDidMount() {

        }

        shouldComponentUpdate(nextProps: IReporteFuerzaVentas, nextState: any): boolean {
            return hasChanged(this.props.informacionReporte, nextProps.informacionReporte);
        };

        render(): JSX.Element {

            let ml: any = config.getML();
            let titulos: any = ml.consulta.sections.fuerzaVentas;


            let formatPosicion: (data: any, row: any) => any = (data: any, row: any) =>
            {
                if (row.Posicion && row.Posicion.Nombre)
                {
                    let url: string = "#/kontrol/usuarios/" + row.Posicion.Usuario.ID;
                    return <div className="label-link-grid label-value">
                        <a target="_blank" rel="noopener noreferrer" href={url} className="link2">
                            <i className="fas fa-external-link-square-alt"></i>
                        </a>
                        <a className="link-text" target="_blank" rel="noopener noreferrer" href={url} style={{ fontSize: "10px" }}>
                            <span className="badge">{row.Posicion.Nombre}</span>
                            <span className="link-text-name">{row.Posicion.Usuario.Nombre + " " + row.Posicion.Usuario.Apellidos}</span>
                        </a>
                    </div>;
                }
                return null;
            };

                //let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                //dtConfig.columns
                //    .add({ data: "Desarrollo.Nombre", width: "150px" })
                //    .add({ data: "Posicion.Nombre", width: "220px", format: formatPosicion })
                //    .add({ data: "January", width: "150px" })
                //    .add({ data: "February", width: "150px" })
                //    .add({ data: "March", width: "150px" })
                //    .add({ data: "April", width: "150px" })
                //    .add({ data: "May", width: "150px" })
                //    .add({ data: "June", width: "150px" })
                //    .add({ data: "July", width: "150px" })
                //    .add({ data: "August", width: "150px" })
                //    .add({ data: "September", width: "150px" })
                //    .add({ data: "October", width: "150px" })
                //    .add({ data: "November", width: "150px" })
                //    .add({ data: "December", width: "150px" })
                //    .toArray();
                //dtConfig.groups
                //    .add({ data: "Desarrollo.Nombre" })
                //    .toArray();





                return <div>


                    <div className="dteScroll">
                        <div className="dteScrollContainer">
                            <page.SectionList
                                id={REPORTE_FUERZADEVENTAS}
                                title={"Reporte Fuerza de Ventas"}
                                icon="fas fa-chart-bar"
                                level={1}
                                collapsed={false}
                                parent={config.id}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                listHeader={<div>
                                    <Row className="list-fixed-header">
                                        <TituloAgrupador/>
                                        <Column size={[12, 8, 8, 8]} style={{ paddingLeft: 0, paddingRight:0 }}>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header"><span style={{ marginLeft:"5px" }}>{titulos.january}</span></Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.february}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.march}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.april}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.may}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.june}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.july}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.august}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.september}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.october}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.november}</Column>
                                            <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.december}</Column>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header">{titulos.total}</Column>
                                    </Row>
                                </div>}
                                listFooter={(values: any) => {


                                    let colorVerde: string = "rgb(38, 194, 129)";
                                    let colorAmarillo: string = "#FFAB40";

                                    let sumaTotal: number = values.TJanuary + values.TFebruary + values.TMarch + values.TApril + values.TMay + values.TJune +
                                        values.TJuly + values.TAugust + values.TSeptember + values.TOctober + values.TNovember + values.TDecember;

                                    let resultSuma: any = sumaTotal > 0 ? sumaTotal : "0";
                                  

                                    return <Row>

                                        <Column size={[12, 12, 12, 12]}>
                                            <Row style={{ backgroundColor: "#546e7a", color: "#fff", paddingTop: "3px", paddingBottom: "3px", fontWeight:"bold" }}>
                                                <Column size={[12, 12, 12, 12]} >
                                                    {"Total"}
                                                </Column>
                                            </Row>
                                        </Column>

                                        <Column size={[12, 3, 3, 3]}>
                                           
                                        </Column>

                                        <Column size={[12, 8, 8, 8]} style={{ fontWeight:700 }}>
                                            <Column size={[12, 1, 1, 1]} >
                                                <span style={{ color: values.TJanuary > 0 ? colorVerde : colorAmarillo }} className="">{values.TJanuary}</span>
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TFebruary > 0 ? colorVerde : colorAmarillo }} className="">{values.TFebruary}</span>
                                            </Column>

                                            <Column size={[12, 1, 1, 1]} >
                                                <span style={{ color: values.TMarch > 0 ? colorVerde : colorAmarillo }} className="">{values.TMarch}</span>
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TApril > 0 ? colorVerde : colorAmarillo }} className="">{values.TApril}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TMay > 0 ? colorVerde : colorAmarillo }} className="">{values.TMay}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TJune > 0 ? colorVerde : colorAmarillo }} className="">{values.TJune}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TJuly > 0 ? colorVerde : colorAmarillo }} className="">{values.TJuly}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TAugust > 0 ? colorVerde : colorAmarillo }} className="">{values.TAugust}</span>

                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TSeptember > 0 ? colorVerde : colorAmarillo }} className="">{values.TSeptember}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TOctober > 0 ? colorVerde : colorAmarillo }} className="">{values.TOctober}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TNovember > 0 ? colorVerde : colorAmarillo }} className="">{values.TNovember}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                <span style={{ color: values.TDecember > 0 ? colorVerde : colorAmarillo }} className="">{values.TDecember}</span>
                                            </Column>
                                        </Column>

                                        <Column size={[12, 1, 1, 1]}>
                                            <span style={{ color: sumaTotal > 0 ? colorVerde : colorAmarillo, fontWeight:"bold" }}>
                                                {resultSuma}
                                            </span>
                                        </Column>
                                    </Row>;
                                }}
                                aggregate={(item?: any, values?: any) => {
                                    let retValue: any = values ? values : {};

                                    if (!values.TJanuary) values.TJanuary = 0;
                                    if (!values.TFebruary) values.TFebruary = 0;
                                    if (!values.TMarch) values.TMarch = 0;
                                    if (!values.TApril) values.TApril = 0;
                                    if (!values.TMay) values.TMay = 0;
                                    if (!values.TJune) values.TJune = 0;
                                    if (!values.TJuly) values.TJuly = 0;
                                    if (!values.TAugust) values.TAugust = 0;
                                    if (!values.TSeptember) values.TSeptember = 0;
                                    if (!values.TOctober) values.TOctober = 0;
                                    if (!values.TNovember) values.TNovember = 0;
                                    if (!values.TDecember) values.TDecember = 0;

                                    values.TJanuary += item.January ? item.January : 0;
                                    values.TFebruary += item.February ? item.February : 0;
                                    values.TMarch += item.March ? item.March : 0;
                                    values.TApril += item.April ? item.April : 0;
                                    values.TMay += item.May ? item.May : 0;
                                    values.TJune += item.Jun ? item.June : 0;
                                    values.TJuly += item.July ? item.July : 0;
                                    values.TAugust += item.August ? item.August : 0;
                                    values.TSeptember += item.September ? item.September : 0;
                                    values.TOctober += item.October ? item.October : 0;
                                    values.TNovember += item.November ? item.November : 0;
                                    values.TDecember += item.December ? item.December : 0;




                                    if (item && item.Desarrollo) {
                                        if (!values.desarrollo) {
                                            values.desarrollo = item.Desarrollo;
                                            values.renderGroup = true;
                                        }
                                        else {
                                            //
                                            if (values.desarrollo.ID !== item.Desarrollo.ID) {
                                                values.desarrollo = item.Desarrollo;
                                                values.renderGroup = true;
                                            }
                                            else {
                                                values.renderGroup = false;
                                            };
                                        };
                                    };

                                    return retValue;
                                }}
                                formatter={(index: number, item: any, values: any) => {

                                    let colorVerde: string = "rgb(38, 194, 129)";
                                    let colorAmarillo: string = "#FFAB40";

                                    let idUsuario: number = item.Posicion ? item.Posicion.Usuario.ID : 0;

                                    let sumaTotal: number = item.January + item.February + item.March + item.April + item.May + item.June +
                                        item.July + item.August + item.September + item.October + item.November + item.December;

                                    return <Row>
                                        {values && values.renderGroup === true ?
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row className="listItem-groupHeader">
                                                    <Column size={[12, 12, 12, 12]}>
                                                        {item.Desarrollo.Nombre}
                                                    </Column>
                                                </Row>
                                            </Column>
                                            :
                                            null}

                                        <Column size={[12, 3, 3, 3]}>

                                            {idUsuario > 0 ?
                                                   <div className="label-link-grid label-value" style={{ whiteSpace: "normal" }}>
                                                         <a className="link-text" target="_blank" rel="noopener noreferrer" style={{ fontSize: "10px" }}>
                                                            <span className="badge">{item.Posicion.Nombre}</span>
                                                            <span className="link-text-name">{item.Posicion.Usuario.Nombre + " " + item.Posicion.Usuario.Apellidos}</span>
                                                         </a>
                                                   </div>
                                                :
                                                <div>
                                                    <span style={{ fontSize: "10px", fontWeight: 600, marginRight: "5px", marginTop:"2px" }} className="badge badge-primary">{item.Puesto.Cantidad}</span>
                                                    <span>{item.Puesto.Nombre}</span>
                                                </div>}
                                          
                                        </Column>

                                        <Column size={[12, 8, 8, 8]}>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.January}
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                {item.February}
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                {item.March}
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                {item.April}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.May}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.June}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.July}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.August}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.September}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.October}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.November}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item.December}
                                            </Column>

                                           
                                        </Column>


                                        <Column size={[12, 1, 1, 1]}>
                                            <span style={{ color: sumaTotal > 0 ? colorVerde : colorAmarillo }}>
                                                {sumaTotal}
                                            </span>
                                        </Column>

                                     
                                    </Row>;
                                }}>
                            </page.SectionList>
                        </div>
                    </div>

                   








                </div>

        };
    });
 
    let YearExecutionProcessesDDl: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.YEARSExecutionProcesses,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Year",
            items: createDefaultStoreObject([]),
            label: "Año",
            helpLabel: "Seleccione un Año",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 2, 2, 2],
        };
        componentDidMount(): void {
            dispatchAsync("load::YEARSExecutionProcesses", "base/scv/expedientesReportes/Get/GetYearEjecucionProcesos/" + global.encodeObject({}));
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    interface IProcessesReport extends IDropDrownListProps {
        processes?: any;
    }
    export let ProcessesReportDDl: any = global.connect(class extends React.Component<IProcessesReport, {}> {
        static props: any = (state: any) => ({
            items: state.global.ProcessesVentaReporte,
            processes: state.global.catalogo$PROCESOS,
        });
        static defaultProps: IProcessesReport = {
            id: "Proceso",
            items: createDefaultStoreObject([]),
            label: "Proceso",
            helpLabel: "Seleccione un Proceso",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 2, 2, 2],
            processes: null,
        };
        componentDidMount(): void {
            dispatchAsync("global-page-data", "base/scv/procesos/all/" + global.encodeParameters({ activos: 1 }), "PROCESOS");
        };
        componentWillReceiveProps(nextProps: IProcessesReport, nextState: IProcessesReport): any {

            if (global.hasChanged(this.props.processes, nextProps.processes))
            {
                if (global.isSuccessful(nextProps.processes))
                {
                    let processes: any = getData(nextProps.processes);
                    let listProcesses: any = [];

                    processes.forEach((value: any, index: number) => {

                        if (value.Clave == "PROC-FINIQUITO" || value.Clave =="PROC-CIERRE-VENTA")
                        {
                            listProcesses.push(value);
                        }

                    });
                    dispatchSuccessful("load::ProcessesVentaReporte", listProcesses);
                };
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    let AgrupadoresDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.catalogo$AgrupadorRFuerzaVenta,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Agrupador",
            items: createDefaultStoreObject([]),
            label: "Agrupador",
            helpLabel: "Seleccione un Agrupador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 2, 2, 2],
        };
        componentDidMount(): void {
            dispatchAsync("global-page-data", "catalogos/get(AGRUPADOR_RFUERZAVEN)", "AgrupadorRFuerzaVenta");
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });



    interface ITituloAgrupador extends page.IProps {
        agrupador?: any;

    };
    let TituloAgrupador: any = global.connect(class extends React.Component<ITituloAgrupador, ITituloAgrupador> {
        constructor(props: ITituloAgrupador) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.agrupador = Forms.getValue("Agrupador", config.id + "$filters");
            return retValue;
        };
        shouldComponentUpdate(nextProps: ITituloAgrupador, nextState: ITituloAgrupador): any {
            return hasChanged(this.props.agrupador, nextProps.agrupador)
        };
        render(): JSX.Element {
            let ml: any = $ml[config.id];
            let titulos: any = ml.consulta.sections.fuerzaVentas;

            let agrupador: any = this.props.agrupador;
            let claveAgrupador: string = agrupador && agrupador.Clave ? agrupador.Clave : "AGEN";
            let tituloAgrupador: string = claveAgrupador == "AGEN" ? "posicion" : "puesto";

            return <Column size={[12, 3, 3, 3]} className="list-default-header">{titulos[tituloAgrupador].Nombre}</Column>;
        };
    });

};



//page 2167--  dattable tiene mismo id que sections list por eso no agrupa
//<page.SectionListExtended
//    id={REPORTE_FUERZAVENTAS}
//    title={"Reporte Fuerza de Ventas"}
//    icon="fas fa-chart-bar"
//    parent={config.id}
//    hideNewButton={true}
//    addRefresh={false}
//    style={{ marginLeft: 0 }}
//    size={[12, 12, 12, 12]}
//    level={1}
//    dtConfig={dtConfig}>
//</page.SectionListExtended>
namespace EK.Modules.SCV.Pages.Reportes.InformativoMacroEtapas {
    "use strict";

    const REPORTE_INFORMATIVOMACROETAPAS: string = "InformativoMacroEtapas";

    const config: page.IPageConfig = global.createPageConfig("reporteInformativoMacroEtapas", "scv", [REPORTE_INFORMATIVOMACROETAPAS]);

    export class Vista extends page.Base
    {
        onFilter(props: page.IProps, filters: any): any
        {
            let f: any = global.assign(filters);

            if (f && f.FechaInicio != null && f.FechaFin != null && f.Mes)
            {

                f.IdYear = f.Mes.Nombre;
                f.IdMes = f.Mes.IdEstatus;

                props.config.dispatchCatalogoBasePost("base/scv/expedientesReportes/GetBP/GetReporteInformativoMacroEtapas", { parametros: f }, REPORTE_INFORMATIVOMACROETAPAS);
            }
            else
            {
                global.dispatchSuccessful("global-page-data", [], REPORTE_INFORMATIVOMACROETAPAS);
            }

        };

        //onExport(item: any, props: page.IProps): any {
        //    let encodedFilters: string = global.encodeObject({ claveReporte: config.id });
        //    window.open("base/scv/expedientesReportes/exportar/" + encodedFilters);
        //};
        onExport(element: any): any {

            let idForm: string = [config.id, "filters"].join("$");

            let model: any = Forms.getForm(idForm);

            let encodedFilters: string = global.encodeObject({ claveReporte: config.id });

            let formName: string = "ExpedientesReporte";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "base/scv/expedientesReportes/exportar");
            form.setAttribute("target", formName);
            
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (encodedFilters);
            form.appendChild(input);
            
            document.body.appendChild(form);
            
            window.open("about:blank", formName);
            
            form.submit();
            
            document.body.removeChild(form);

        };

        render(): JSX.Element {

            let ml: any = config.getML();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowNew={false}
                allowView={false}
                onExport={this.onExport}
                allowDelete={false}>

                <page.Filters collapsed={false}>
                    <PeriodoFechaDDL label={ml.filters.mes} addNewItem={"SO"} size={[12, 2, 2, 2]}/>

                    <input.Date id={"FechaInicio"} type="date" size={[12, 2, 2, 2]} label={ml.filters.procesoDesde}
                        validations={[
                            validations.lessEqualThan("FechaFin", ml.alerts.procesoDesde)]} />

                    <input.Date id={"FechaFin"} type="date" size={[12, 2, 2, 2]} label={ml.filters.procesoHasta}
                        validations={[
                            validations.greaterEqualThan("FechaInicio", ml.alerts.procesoHasta)]} />
                </page.Filters>
              

                <Reporte/>
            </page.Main>;
        };
    };


    interface IReporteMacroetapas extends page.IProps {
        macroEtapas?: any;
        informacionMacroEtapas?: any;
    };

    export let Reporte: any = global.connect(class extends React.Component<IReporteMacroetapas, IReporteMacroetapas> {
        constructor(props: IReporteMacroetapas) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.macroEtapas = state.global.MACROETAPAS;
            retValue.informacionMacroEtapas = state.global.catalogo$InformativoMacroEtapas;
            return retValue;
        };
        componentDidMount() {

            dispatchAsync("load::MACROETAPAS", "base/scv/macroEtapas/Get/GetMacroEtapasOrden/" + global.encodeParameters({ activos: 1, faseClave:"FASE-VENT" }));
        }

        shouldComponentUpdate(nextProps: IReporteMacroetapas, nextState: any): boolean {
            return hasChanged(this.props.macroEtapas, nextProps.macroEtapas) ||
                   hasChanged(this.props.informacionMacroEtapas, nextProps.informacionMacroEtapas);
        };

        render(): JSX.Element {

            if (isSuccessful(this.props.macroEtapas))
            {

                let formatTotalReporte: (data: any, row: any, type: any) => any = (data: any, row: any, type: any) =>
                {
                        return row.SumaTotal  + row.ProcesosEjecutados+ row.ExpCancelado + row.ExpSeguimientoSuspendido;
                };

                let formatFirmadoAcumulado: (data: any, row: any, type: any) => any = (data: any, row: any, type: any) =>
                {
                        return row.SumaTotal + row.ProcesosEjecutados;
                };

                let macroEtapas: any = getData(this.props.macroEtapas);
                let ml: any = config.getML();

                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "Desarrollo", width: "150px" })

                    .add({ data: "Inventario", width: "80px", align: "right" })
                    .add({ data: "InventarioDTU", width: "115px", align: "right" })

                    .add({ data: "InventarioSinDTU", width: "125px", align: "right" })
                    .add({ data: "InventarioDTUVC", width: "100px", align: "right" })
                    .add({ data: "InventarioDTUSV", width: "100px", align: "right" })

                    .toArray()

                macroEtapas.forEach((value: any, index: number) => {
                    dtConfig.columns
                        .add({ data: value.Nombre, width: "120px", title: value.Nombre, align: "center" })
                        .toArray();
                });

                dtConfig.columns

                    //suma de macroetapas
                    .add({ data: "SumaTotal", width: "80px", align: "right" })

                    //procesos dejecutados en el periodo de tiempo
                    .add({ data: "ProcesosEjecutados", width: "100px", align: "right" })

                    //firmado acumulado
                    .add({ data: "ProcesoAcumuladoEnPeriodo", width: "105px", align: "right" })

                    //firmado acumulado
                    .add({ data: "ProcesoAcumuladoHistorico", width: "105px", align: "right" })

                    .add({ data: "ExpCancelado", width: "105px", align: "right" })
                    .add({ data: "ExpSeguimientoSuspendido", width: "105px", align: "right" })

                    //total de reporte
                    .add({ data: "ExpSeguimientoSuspendido", width: "105px", align: "right", format: formatTotalReporte, title: ml.consulta.grid.headers.totalReporte })
                    .toArray();

                return <div>
                    
                    <page.SectionListExtended
                    id={REPORTE_INFORMATIVOMACROETAPAS}
                    title={"Reporte Informativo Macroetapas"}
                    parent={config.id}
                    hideNewButton={true}
                    addRefresh={false}
                    style={{ marginLeft: 0 }}
                    icon="fas fa-poll"
                    size={[12, 12, 12, 12]}
                    level={1}
                    dtConfig={dtConfig}
                    readonly={true}>
                    </page.SectionListExtended>
                </div>
            }
            return null;

        };
    });


   

    let PeriodoFechaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.catalogo$PeriodoFechas,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Mes",
            items: createDefaultStoreObject([]),
            label: "Mes)",
            helpLabel: "Seleccione un Periodo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 2, 2, 2],
            itemFormatter: (item, container): any =>
            {

                if (!item.id)
                {
                    if (item.obj)
                    {
                        if (item.ID == -1)
                        {
                            return $(["<span>", item.Clave, "</span>"].join(""));
                        }
                        return $([
                            "<span>",
                            item.Clave,
                            "</span> ",
                            "<span> ",
                            item.Nombre,
                            "</span>"].join(""));
                    }
                    else
                    {
                        return $(["<span class='bold'> ", item.text, "</span>"].join(""));
                    };
                }
                else
                {
                    if (item.ID == -1)
                    {
                        return $(["<span>", item.Clave, "</span>"].join(""));
                    }
                    return $([
                        "<span>",
                        item.Clave,
                        "</span>",
                        "<span> ",
                        item.Nombre,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };

                if (item.ID == -1)
                {
                    return $(["<span>", item.Clave, "</span>"].join(""));
                }

                return $([
                    "<span>",
                    item.Clave,
                    "</span>",
                    "<span> ",
                    item.Nombre,
                    "</span> "].join(""));
            }
        };
        componentDidMount(): void {
            let encodedFilters: string = global.encodeObject(null);
            global.dispatchAsync("load::catalogo$PeriodoFechas", "base/kontrol/expedientesReportes/Get/GetMonths/" + encodedFilters);

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


};

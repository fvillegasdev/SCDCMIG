namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteEncuestaSatisfaccion {
    //Constantes
    const PAGE_ID: string = "ReporteEncuestaSatisfaccion";
    const PAGE_RESULT: string = "ReporteEncuestaSatisfaccionResult";
    const SECTION_CONCEPTO_ID: string = "ConsultaRS";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_RESULT]);
    const filterFracc = (Fraccionamientos: any) => {
        let fracc: string = "";
        for (const x in Fraccionamientos) {
            fracc += Fraccionamientos[x].Clave + ","
        }
        let count = fracc.length;
        let fraccparams = fracc.slice(0, count - 1);
        return fraccparams;
    };
    //interfaces
    interface IReporteEncuestaSatisfaccion extends page.IProps {
        plaza?: any;
    }

    export class Vista extends page.Base {

        render(): JSX.Element {



            return <page.Main {...config} pageMode={PageMode.Personalizado} allowSave={false} allowEdit={false} allowDelete={false} allowNew={false}>
                <Filtros />
                <ResultView />
            </page.Main>;
        };
    };

    let Filtros: any = global.connect(class extends React.Component<IReporteEncuestaSatisfaccion, {}> {

        constructor(props: IReporteEncuestaSatisfaccion) {
            super(props)
            this.onSearch = this.onSearch.bind(this);

        }

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            plaza: state.global.Plaza_Seleccionada,
            data: global.getData(state.global.currentCatalogo),
            entity: global.getData(state.global.currentEntity)
        });
        componentDidMount(): void {
            global.dispatchSuccessful("global-page-catalogo", null, PAGE_RESULT);
            Forms.updateFormElement([PAGE_ID].join(""), "FechaInicio", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([PAGE_ID].join(""), "FechaFinal", global.getToday(true));
            Forms.updateFormElement([PAGE_ID].join(""), "CheckNoSeEncontro", false);
            Forms.updateFormElement([PAGE_ID].join(""), "CheckNoQuiso", false);
            Forms.updateFormElement([config.id + "$filters"].join(""), "Contratista", { ID: -2, Clave: "-2", Nombre: "TODOS" });
        };
        onSearch(changeViewMode?: boolean): void {
            if (!Forms.isValid(PAGE_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };
            this.setState({ data: null });
            let model: any = Forms.getForm(PAGE_ID);
            let Plaza: any = model.PlazaInicial.ID;
            let Fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let Contratista: any = model.Contratista.ID;
            let FechaInicial: any = model.FechaInicio;
            let FechaFinal: any = model.FechaFinal;
            let factorEvaluacion = model.FactoresEvaluacion.ID;
            let NoSeEncontro = model.CheckNoSeEncontro ? 1 : 0;
            let NoQuisoContestar = model.CheckNoQuiso ? 1 : 0;
            let SinEncuesta = model.CheckSinEncuesta ? 1 : 0;
            let parametros = global.assign({
                PLAZA: Plaza,
                FRACCIONAMIENTO: Fraccionamiento,
                CONTRATISTA: Contratista,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                NOSEENCONTROCLIENTE: NoSeEncontro,
                NOQUISOCONTESTAR: NoQuisoContestar,
                SINENCUESTA:SinEncuesta
            });
            let UrlAplicacion: any = window.location;
            let columnas: any;
            columnas = UrlAplicacion.pathname.includes("intra") ? [
                { caption: "No. Cliente", dataField: "NumCliente" },
                { caption: "Nombre Cliente", dataField: "NombreCliente" }, 
                { caption: "Clave Fraccionamiento", dataField: "DesarrolloClave" },
                { caption: "Fraccionamiento", dataField: "NombreFraccionamiento" },
                { caption: "Edificio", dataField: "edificio" },
                { caption: "Nivel", dataField: "nivel" },
                { caption: "Departamento", dataField: "Interior" },
                { caption: "Calle", dataField: "Calle" },
                { caption: "No. Exterior", dataField: "Exterior" },  
                { caption: "ID", dataField: "ID", alignment: 'left' },
                { caption: "Folio", dataField: "IdFolio" },  
                { caption: "# Contratista", dataField: "IdContratista" },
                { caption: "Nombre Contratista", dataField: "NombreContratista" },             
                { caption: "# Plaza", dataField: "IdPlaza" },
                { caption: "Plaza", dataField: "Plaza" },
                { caption: "Fecha", dataField: "Fecha", dataType: "datetime", format: "d/M/yyyy" },
                { caption: "Cerrada", dataField: "Cerrada" },
                { caption: "Sin encuesta", dataField: "Faltante" },
                { caption: "Observaciones", dataField: "Observacion" }
            ] : [{ caption: "ID", dataField: "ID", alignment: 'left' },
                    { caption: "Folio", dataField: "IdFolio" },
                    { caption: "No. Cliente", dataField: "NumCliente" },
                    { caption: "Nombre Cliente", dataField: "NombreCliente" },
                    { caption: "Etapa", dataField: "SuperManzana" },
                    { caption: "Manzana", dataField: "Manzana" },
                    { caption: "Lote", dataField: "Lote" },
                    { caption: "Calle", dataField: "Calle" },
                    { caption: "No. Exterior", dataField: "Exterior" },
                    { caption: "No. Interior", dataField: "Interior" },
                    { caption: "# Contratista", dataField: "IdContratista" },
                    { caption: "Nombre Contratista", dataField: "NombreContratista" },
                    { caption: "Clave Fraccionamiento", dataField: "DesarrolloClave" },
                    { caption: "Fraccionamiento", dataField: "NombreFraccionamiento" },
                    { caption: "# Plaza", dataField: "IdPlaza" },
                    { caption: "Plaza", dataField: "Plaza" },
                    { caption: "Fecha", dataField: "Fecha", dataType: "datetime", format: "d/M/yyyy" },
                    { caption: "Cerrada", dataField: "Cerrada" },
                    { caption: "Sin encuesta", dataField: "Faltante" },
                    { caption: "Observaciones", dataField: "Observacion" }];
            let infoGrafica = [];
            if (factorEvaluacion == -2) {
                columnas.push({ caption: "Tipo de atencion", dataField: "TotalTipoAtencion" })
                columnas.push({ caption: "Puntualidad", dataField: "TotalPuntualidad" })
                columnas.push({ caption: "Limpieza", dataField: "TotalLimpieza" })
                columnas.push({ caption: "Calidad", dataField: "TotalCalidad" })
                columnas.push({ caption: "Indice de Satisfacción ", dataField: "IndiceSatisfaccion" })
                infoGrafica.push({ valueField: "TotalTipoAtencion", name: "Tipo Atencion" },
                    { valueField: "TotalPuntualidad", name: "Puntualidad" },
                    { valueField: "TotalLimpieza", name: "Limpieza" },
                    { valueField: "TotalCalidad", name: "Calidad" },
                    { valueField: "IndiceSatisfaccion", name: "Indice de Satisfacción " })
            } else if (factorEvaluacion == 1) {
                columnas.push({ caption: "Tipo de atencion", dataField: "TotalTipoAtencion" })
                infoGrafica.push({ valueField: "TotalTipoAtencion", name: "Tipo Atencion" })
            } else if (factorEvaluacion == 2) {
                columnas.push({ caption: "Puntualidad", dataField: "TotalPuntualidad" })
                infoGrafica.push({ valueField: "TotalPuntualidad", name: "Puntualidad" })
            } else if (factorEvaluacion == 3) {
                columnas.push({ caption: "Limpieza", dataField: "TotalLimpieza" })
                infoGrafica.push({ valueField: "TotalLimpieza", name: "Limpieza"  })
            } else if (factorEvaluacion == 4) {
                columnas.push({ caption: "Calidad", dataField: "TotalCalidad" })
                infoGrafica.push({ valueField: "TotalCalidad", name: "Calidad"})
            } else if (factorEvaluacion == 5) {
                columnas.push({ caption: "Indice de Satisfacción ", dataField: "IndiceSatisfaccion" })
                infoGrafica.push({ valueField: "IndiceSatisfaccion", name: "Indice de Satisfacción" })
            }
            let upd = document.getElementById("updating");
            let load = document.getElementById("loading");
            //console.log(parametros)
            global.asyncPost("base/kontrol/ReporteEncuestaSatisfaccion/GetBP/GetReporte/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        upd.style.display = "none";
                        load.style.display = "block";
                        let fecha = Date.now();
                        //console.log(data)
                        dispatchSuccessful("global-current-catalogo", data);
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: true,
                            },
                            summary:{
                                groupItems: [{
                                    column: "NombreFraccionamiento",
                                    summaryType: "count",
                                    name: "Total de reportesv"
                                },
                                //{
                                //    column: "TotalTipoAtencion",
                                //    summaryType: "avg",
                                //    name: "Promedio"
                                //    },
                                //    {
                                //        column: "TotalPuntualidad",
                                //        summaryType: "avg",
                                //        name: "Promedio"
                                //    },
                                //    {
                                //        column: "TotalLimpieza",
                                //        summaryType: "avg",
                                //        name: "Promedio"
                                //    },
                                //    {
                                //        column: "TotalCalidad",
                                //        summaryType: "avg",
                                //        name: "Promedio"
                                //    },
                                //    {
                                //        column: "IndiceSatisfaccion",
                                //        summaryType: "avg",
                                //        name: "Promedio"
                                //    }
                                ]
                            },
                            export: {
                                enabled: true,
                                fileName: "Reporte_Encuesta_Satisfaccion" + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.Cerrada = d.Cerrada ? 'SI' : 'NO';
                                    d.Faltante = d.Faltante ? 'SI' : 'NO';
                                }
                                e.cancel = false;
                            },
                            searchPanel: {
                                visible: true
                            },
                            paging: {
                                pageSize: 15
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: true
                            },
                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");

                        break;
                    case AsyncActionTypeEnum.loading:
                        upd.style.display = "block";
                        load.style.display = "none";
                        break;
                    case AsyncActionTypeEnum.failed:
                        upd.style.display = "none";
                        load.style.display = "none";
                        break;
                }
            });
            let upd2 = document.getElementById("updating2");
            let load2 = document.getElementById("loading2");
            console.log(infoGrafica)
                global.asyncPost("base/kontrol/ReporteEncuestaSatisfaccion/GetBP/GetGrafica/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            upd2.style.display = "none";
                            load2.style.display = "block";
                            let fecha = Date.now();
                            dispatchSuccessful("global-current-entity", data);
                            let dataGrid = $("#chart").dxChart({
                                dataSource: data,
                                commonSeriesSettings: {
                                    argumentField: "Plaza",
                                    type: "bar",
                                    hoverMode: "allArgumentPoints",
                                    selectionMode: "allArgumentPoints",
                                    label: {
                                        visible: true,
                                        format: {
                                            type: "fixedPoint",
                                            precision: 2
                                        }
                                    }
                                },
                                series: infoGrafica,
                                title: "Grafica de factores de evaluación.",
                                legend: {
                                    verticalAlignment: "bottom",
                                    horizontalAlignment: "center"
                                },
                                "export": {
                                    enabled: true
                                },
                                tooltip: {
                                    enabled: true,
                                    customizeTooltip: function (arg) {
                                        let res = data.filter(x => x.Plaza === arg.argument)[0];
                                        //console.log(res)
                                        return {
                                           
                                            text: res.TotalEncuentas + ' DE ' + res.TotalReportes
                                        };
                                    }
                                },
                                zoomAndPan: {
                                    argumentAxis: "both",  // or "zoom" | "pan" | "none"
                                    valueAxis: "both"      // or "zoom" | "pan" | "none"
                                },
                                onPointClick: function (e) {
                                    e.target.select();
                                }
                            });
                            break;
                        case AsyncActionTypeEnum.loading:
                            upd2.style.display = "block";
                            load2.style.display = "none";
                            break;
                        case AsyncActionTypeEnum.failed:
                            upd2.style.display = "none";
                            load2.style.display = "none";
                            break;
                    }
                });
        }
        componentWillReceiveProps(nextProps: IReporteEncuestaSatisfaccion, nextState: IReporteEncuestaSatisfaccion): void {
            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        };
        render(): JSX.Element {
            let idForm: any = EK.Store.getState().forms[PAGE_ID] ? EK.Store.getState().forms[PAGE_ID] : null;
            let color: string = "#d26c35";
            // let className: string = "font-white";
            let className: string = "";
            if (idForm === null || idForm === undefined) {

            } else {
                if (idForm.hasChanged) {
                    color = "white";
                    className = " btn-editing";
                }
            }

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte Encuesta Satisfacción"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button className={className} keyBtn={"btnSPVFiltrarInformacion"} iconOnly={true} color={color} icon="fa fa-search" onClick={this.onSearch} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            <ddl.PlazasDDL id="PlazaInicial" label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <consultas.SPVContratistasConsulta id="Contratista" idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                            <input.Date id={"FechaInicio"} label={"Fecha Inicio"} idFormSection={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} />
                            <input.Date id={"FechaFinal"} label={"Fecha Final"} idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} />
                            <FactoresEvaluacionDDL idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <checkBox.CheckBox id={"CheckNoSeEncontro"} idForm={PAGE_ID} label={"No se encontró el cliente."} size={[12, 12, 3, 3]} />
                            <checkBox.CheckBox id={"CheckNoQuiso"} idForm={PAGE_ID} label={"No quiso contestar la encuesta."} size={[12, 12, 3, 3]} />
                            <checkBox.CheckBox id={"CheckSinEncuesta"} idForm={PAGE_ID} label={"Folios sin encuesta"} size={[12, 12, 3, 3]} />
                        </Column>
                    </Row>
                    <Row style={{paddingBottom:'15px'}}>
                        <Column size={[12, 12, 12, 12]} >
                            {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />*/}
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 12, 12]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;

        }
    });

    export let ResultView: any = page.connect(class extends page.Base {

        constructor(props: IReporteEncuestaSatisfaccion) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            data: global.getData(state.global.currentCatalogo),
        });
        componentWillReceiveProps(nextProps: IReporteEncuestaSatisfaccion, nextState: IReporteEncuestaSatisfaccion): void {
            if (getData(nextProps.data) !== getData(this.props.data)) {
                // this.props.data = null;
            }
        }
        render(): JSX.Element {
            return <Column size={[12, 12, 12, 12]}>
                {/*<dt.DataTableExtended dtConfig={dtConfig} /> <Updating text="" />*/}
                
                <br />
                    <div id="updating" style={{ display: 'none'}}>
                    <Updating text="" />
                    </div>
                    <div id="loading" style={{ display: 'none' }}>
                    <div id="datagroupContainer"  style={{ padding: '10px', background: '#fff' }}>
                    </div>
                </div>
                <div id="updating2" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>
                <div id="loading2" style={{ display: 'none' }}>
                    <div id="chart" style={{ padding: '10px', background: '#fff' }}>
                    </div>
                </div>

            </Column>
        }



    });


    class FactoresEvaluacion$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$factoresEvaluacion"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "FactoresEvaluacion",
            items: createDefaultStoreObject([]),
            label: "Factores de evaluacion",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success'> ", item.Clave, " </span>",
                        "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success'> ", item.Clave, " </span>",
                    "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "TA", Nombre: "Tipo de Atencion" });
                items.push({ ID: 2, Clave: "P", Nombre: "Puntualidad" });
                items.push({ ID: 3, Clave: "L", Nombre: "Limpieza" });
                items.push({ ID: 4, Clave: "C", Nombre: "Calidad" });
                items.push({ ID: 5, Clave: "IS", Nombre: "Indice de satisfaccion" });
                items.push({ ID: -2, Clave: "T", Nombre: "TODOS" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$factoresEvaluacion", items);
            };


        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const FactoresEvaluacionDDL: any = ReactRedux.connect(FactoresEvaluacion$DDL.props, null)(FactoresEvaluacion$DDL);



};

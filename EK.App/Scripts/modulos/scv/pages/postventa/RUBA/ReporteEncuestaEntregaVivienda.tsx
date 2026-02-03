namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteEncuestaVivienda {
    const PAGE_ID: string = "ReporteEnViEn";
    const PAGE_PENDIENTE_RESULT_ID: string = "ReporteEncuestaViviendaResult";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);

    export class Vista extends page.Base {
        componentDidMount(): void {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                <Filtros />
                {<ResultView />}
            </page.Main>;
        };
    }
    interface IReporteEncuestaVivienda extends page.IProps {
        plaza?: any;
        load?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IReporteEncuestaVivienda, {}> {
        constructor(props: IReporteEncuestaVivienda) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };
        componentDidMount(): void {
            Forms.updateFormElement([PAGE_ID].join(""), "FactoresEvaluacionEncuesta", { ID: -2, Clave: "Todos", Nombre: "TODOS" });
        };
        componentWillReceiveProps(nextProps: IReporteEncuestaVivienda, nextState: IReporteEncuestaVivienda): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelectReport(params: any): void {
            let upd = document.getElementById("updating");
            let load = document.getElementById("loading");
            console.log(params)
            this.setState({ data: null });

            const columns = [
                { caption: "No. Cliente", dataField: "NoCliente" },
                { caption: "Nombre Cliente", dataField: "NombreCliente" },
                { caption: "Etapa", dataField: "Etapa" },
                { caption: "Manzana", dataField: "Manzana" },
                { caption: "Lote", dataField: "Lote" },
                { caption: "Calle", dataField: "Calle" },
                { caption: "No. Exterior", dataField: "Exterior" },
                { caption: "No. Interior", dataField: "Interior" },
                { caption: "# Contratista", dataField: "IdContratista" },
                { caption: "Nombre Contratista", dataField: "Contratista" },
                { caption: "Clave Fraccionamiento", dataField: "DesarrolloClave" },
                { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                { caption: "FechaEntrega", dataField: "FechaEntrega", dataType: "datetime", format: "d/M/yyyy" },
                { caption: "Encuesta Cerrada", dataField: "EncuestaCerrada" },
                { caption: "Calificacion P1", dataField: "Calif1" },
                { caption: "Calificacion P2", dataField: "Calif2" },
                { caption: "Calificacion P3", dataField: "Calif3" },
                { caption: "Promedio", dataField: "PromedioCalif" },
                { caption: "Comentarios P4", dataField: "ComentarioPreg4" },
                { caption: "Comentarios P5", dataField: "ComentarioPreg5" },
                { caption: "Nombre Referencia 1", dataField: "NombreRef1" },
                { caption: "Telefono Referencia 1", dataField: "TelefonoRef1" },
                { caption: "Nombre Referencia 2", dataField: "NombreRef2" },
                { caption: "Telefono Referencia 2", dataField: "TelefonoRef2" },
                { caption: "Observaciones", dataField: "ObsNoContesto" },
            ];
            let infoGrafica = [];
            if (params.FactorEvaluacion == 1) {
                columns.push({ caption: "Experiencia", dataField: "Experiencia" })
                infoGrafica.push({ valueField: "Experiencia", name: "Experiencia" })
            }
            if (params.FactorEvaluacion == 2) {
                columns.push({ caption: "Entrega", dataField: "Entrega" })
                infoGrafica.push({ valueField: "Entrega", name: "Entrega" })
            }
            if (params.FactorEvaluacion == 3) {
                columns.push({ caption: "Condiciones", dataField: "Condiciones" })
                infoGrafica.push({ valueField: "Condiciones", name: "Condiciones" })
            }
            if (params.FactorEvaluacion == -2) {
                columns.push({ caption: "Experiencia", dataField: "Experiencia" })
                columns.push({ caption: "Entrega", dataField: "Entrega" })
                columns.push({ caption: "Condiciones", dataField: "Condiciones" })
                infoGrafica.push(
                    { valueField: "Experiencia", name: "Experiencia" },
                    { valueField: "Entrega", name: "Entrega" },
                    { valueField: "Condiciones", name: "Condiciones" }
                )
            }
            global.asyncPost("base/kontrol/ConsultaViviendaEntregable/GetBP/GetReporteEncuestaEntregaVivienda/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
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
                            columnResizingMode: 'widget',
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: true,
                            },
                            summary: {
                                groupItems: [{
                                    column: "Fraccionamiento",
                                    summaryType: "count",
                                    name: "Total de reportesv"
                                },
                                ]
                            },
                            export: {
                                enabled: true,
                                fileName: "Reporte_Encuesta_Vivienda_Entrega" + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.EncuestaCerrada = d.EncuestaCerrada ? 'SI' : 'NO';
                                }
                                e.cancel = false;
                                setTimeout(() => {
                                    for (const d of data) {
                                        d.EncuestaCerrada = d.EncuestaCerrada == "SI" ? true : false;
                                    }
                                }, 200);
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
                            columns: columns,
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
            global.asyncPost("base/kontrol/ConsultaViviendaEntregable/GetBP/GetReporteEncuestaEntregaViviendaGrafica/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
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
        onSelect(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let Plaza = model.PlazaInicial.ID;
            let FactorEvaluacion = model.FactoresEvaluacionEncuesta.ID;
            let Fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let Contratista: any = model.Contratista.ID;
            let FechaInicial: any = model.FechaInicial;
            let FechaFinal: any = model.FechaFinal;
            let NoQuizoContestar = model.CheckNoQuizo ? 1 : 0;
            let p = global.assign({
                PLAZA: Plaza,
                FRACCIONAMIENTO: Fraccionamiento,
                CONTRATISTA: Contratista,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                NOQUIZOCONTESTAR: NoQuizoContestar,
                FactorEvaluacion: FactorEvaluacion
            });
            if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            this.onSelectReport(p);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte Encuesta entrega de vivienda"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons>
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons>
                    <Row style={{ paddingBottom: '10px' }}>
                        <Column size={[12, 12, 12, 12]} >
                            <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <FactoresEvaluacionEncuestaDDL idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 6, 6]} />*/}
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 6, 6]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                            <consultas.SPVContratistasConsulta id="Contratista" idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                            <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                            <checkBox.CheckBox id={"CheckNoQuizo"} idForm={PAGE_ID} label={"No quiso contestar la encuesta."} size={[12, 12, 3, 3]} />
                        </Column>
                    </Row>
                </page.OptionSection>

            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IReporteEncuestaVivienda, {}> {
        constructor(props: IReporteEncuestaVivienda) {
            super(props);
        };
        static defaultProps: IReporteEncuestaVivienda = {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="updating" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>
                <div id="loading" style={{ display: 'none' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}>
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
            </div>
        }
    });

    class FactoresEvaluacionEncuesta$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$factoresEvaluacionEncuesta"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "FactoresEvaluacionEncuesta",
            items: createDefaultStoreObject([]),
            label: "Factores Evaluacion Encuesta",
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
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "Ex", Nombre: "Experiencia" });
                items.push({ ID: 2, Clave: "En", Nombre: "Entrega" });
                items.push({ ID: 3, Clave: "Co", Nombre: "Condiciones" });
                items.unshift({ ID: -2, Clave: "Todos", Nombre: "TODOS" });

                global.dispatchSuccessful("load::" + PAGE_ID + "$factoresEvaluacionEncuesta", items);
            };


        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const FactoresEvaluacionEncuestaDDL: any = ReactRedux.connect(FactoresEvaluacionEncuesta$DDL.props, null)(FactoresEvaluacionEncuesta$DDL);
}
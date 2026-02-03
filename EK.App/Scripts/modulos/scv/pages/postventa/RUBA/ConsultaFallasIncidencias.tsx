namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaFallasIncidencias {
    "use strict";
    const PAGE_ID: string = "ConsultaFallasIncidencias";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    interface IVistaProps extends page.IProps {
        tipoVizualizacion?: DataElement;
        filtrarPor?: DataElement;
        plazas?: DataElement;
        vocaciones?: DataElement;
        fraccionamientos?: DataElement;
    };

    interface IVistaState extends page.IProps {
        childKey: number;
    };

    export const Vista: any = global.connect(class extends React.Component<IVistaProps, IVistaState> {
        constructor(props: IVistaProps) {
            super(props);
            this.state = { childKey: 0 };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoVizualizacion = Forms.getDataValue("TipoVisualizacion", [config.id + "$filters"].join(""), state);
            retValue.plazas = Forms.getDataValue("PlazaInicial", [config.id + "$filters"].join(""), state);
            retValue.vocaciones = Forms.getDataValue("Vocacion", [config.id + "$filters"].join(""), state);
            retValue.fraccionamientos = Forms.getDataValue("Fraccionamientos", [config.id + "$filters"].join(""), state);
            return retValue;
        };
        onExport(): void {
            let filters: any = this.onWillFilter(this.props, Forms.getForm([config.id, "filters"].join("$")));
            global.requestAction("scv/contribucionPorPlaza/topIncidencias/exportar", filters, "post");
        };
        onWillFilter(props: any, filters: any): any {
            let retValue: any = global.getFilters(filters);
            retValue.IdProceden = filters.Proceden ? filters.Proceden.Clave : null;
            retValue.IdTipoVisualizacion = filters.TipoVisualizacion ? filters.TipoVisualizacion.Clave : null;
            retValue.IdFiltrarPor = filters.FiltrarPor ? filters.FiltrarPor.Clave : null;
            retValue.Fraccionamientos = filters.Fraccionamientos;

            if (retValue.Fraccionamientos && retValue.Fraccionamientos.length > 0) {
                retValue.Fraccionamientos.forEach((f: any) => { delete f["ID"]; });
            };
            let segmento: any = filters.segmento && filters.segmento.ID ? filters.segmento.ID !== 9999 ? filters.segmento.ID : '-2' : '-2';
            retValue.Segmento = segmento;
            //console.log(filters,retValue)
            return retValue;
        };
        onFilter(props: page.IProps, filters: any, type?: string): void {
            if (getData(props.page).id === config.id) {

                if (!(filters.Fraccionamientos && filters.Fraccionamientos.length > 0)) {
                    global.info("Debe seleccionar por lo menos un fraccionamiento.");
                    return;
                };

                props.config.dispatchCatalogoBasePost("scv/contribucionPorPlaza/GetConsultaFallasTopResultado", filters);
            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("global-current-catalogo", []);
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            Forms.updateFormElement([config.id + "$filters"].join(""), "Fraccionamientos", [{ Clave: "-2", ID: -2, Nombre: "TODOS", id: -2 }]);
        };
        componentWillReceiveProps(nextProps: IVistaProps): any {
            if (global.hasChanged(this.props.tipoVizualizacion, nextProps.tipoVizualizacion) ||
                global.hasChanged(this.props.plazas, nextProps.plazas) ||
                global.hasChanged(this.props.vocaciones, nextProps.vocaciones) ||
                global.hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos)) {
                this.setState({ childKey: ++this.state.childKey });
            };
        };
        onRowDoubleClick(item: any): any {
            return null;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig;
            let objectIdDT: any;
            let tipoVista: any = global.getData(this.props.tipoVizualizacion);
            if (tipoVista) {

                objectIdDT = this.state.childKey;

                switch (tipoVista.Clave) {
                    case 'D': // Datos
                        dtConfig = dt.createConfig(ml.consultas.datos.incidencias);
                        dtConfig.columns
                            .add({ data: "Nombre", width: "850px" })
                            .add({ data: "Cantidad", width: "200px", dataType: "number" })
                            .add({ data: "Porcentaje", width: "200px", dataType: "number" })
                            .toArray();
                        break;
                    case 'P': // Período
                        let columnasDinamicas: any = [];

                        let datos: any = this.props.data;
                        let primerColumna: any = 0
                        let ultimaColumna: any = 0
                        let i: number;
                        let x: number = 0;

                        var fecha = new Date();
                        var periodoActual = fecha.getFullYear();
                        var periodoInicio = fecha.getFullYear() - 20;

                        if (getData(this.props.data) != undefined && getData(this.props.data) != null && getData(this.props.data).length > 0) {
                            primerColumna = getData(this.props.data)[0].PrimeraColumna === undefined || getData(this.props.data)[0].PrimeraColumna === null ? periodoInicio : getData(this.props.data)[0].PrimeraColumna;
                            ultimaColumna = getData(this.props.data)[0].UltimaColumna === undefined || getData(this.props.data)[0].UltimaColumna === null ? periodoActual : getData(this.props.data)[0].UltimaColumna;
                        } else {
                            primerColumna = periodoInicio;
                            ultimaColumna = periodoActual;
                        }

                        for (i = ultimaColumna; i > primerColumna; i--) {
                            columnasDinamicas[x] = { titulo: "C. " + i.toString(), columna: "CANT_" + i.toString(), width: "100px", align: "center" };
                            columnasDinamicas[x + 1] = { titulo: "%", columna: "PORC_" + i.toString(), width: "80px", align: "center" };
                            x = x + 2;
                        }

                        dtConfig = dt.createConfig(ml.consultas.datos.incidencias);
                        dtConfig.columns
                            .add({ data: "Nombre", width: "250px" })
                            .add({ data: "Cantidad", width: "100px", dataType: "number", order: "Desc" })
                            .add({ data: "Porcentaje", width: "100px", dataType: "number" })
                            .addDynamicColumns(columnasDinamicas)
                            .toArray();
                        break;
                    case 'G': //Gráfica
                        dtConfig = undefined;
                        break;
                    default:
                        break;
                };
            };
            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowNew={false}
                allowDelete={false}
                allowSave={false}
                allowEdit={false}
                allowView={false}
                onWillFilter={this.onWillFilter.bind(this)}
                onFilter={this.onFilter.bind(this)}
                onExport={this.onExport.bind(this)}>
                <page.Filters collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL id="PlazaInicial" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.VocacionesFilterDDL id="Vocacion" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.SegmentosDDLv2 id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                    {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={config.id} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                    <DatePicker id="FechaInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    <ProcedenDDL idForm={config.id} size={[12, 12, 3, 2]} validations={[validations.required()]} required={true} />
                    <TipoVisualizacionDDL idForm={config.id} size={[12, 12, 3, 2]} validations={[validations.required()]} required={true} />
                    <FiltrarPorDDL idForm={config.id} size={[12, 12, 3, 2]} validations={[validations.required()]} required={true} />
                    <ResumenResultado />
                </page.Filters>
                {tipoVista.Clave === "G"
                    ? <GraficaReporte />
                    : dtConfig ? <dt.DataTableExtended id={objectIdDT} key={objectIdDT} dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} /> : null}
            </page.Main>
        };
    });


    interface IResumenResultado extends page.IProps {
    };

    let ResumenResultado: any = global.connect(class extends React.Component<page.IProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        shouldComponentUpdate(nextProps: IResumenResultado, nextState: IResumenResultado): any {
            return hasChanged(this.props.data, nextProps.data);
        }

        componentDidUpdate(prevProps: IResumenResultado, prevState: IResumenResultado) {
            if (isSuccessful(this.props.data)) {
                if (hasChanged(prevProps.data, this.props.data)) {
                    let contador: any;
                    contador = $('.counter');
                    if (contador.length > 0) {
                        contador.counterUp();
                    }

                }
            }
        }



        render(): JSX.Element {
            let visualizarResumenResultado: any = getData(this.props.data).length > 0 ? true : false;

            if (visualizarResumenResultado === true) {
                let numeroTotalIncidencias: any = getData(this.props.data)[0].CantidadTotalIncidencias;
                let numeroTotalTopIncidencias: any = getData(this.props.data)[0].CantidadTopIncidencias;
                let porcentajeTotalTopIncidencias: any = getData(this.props.data)[0].PorcentajeTotal;
                return <Column size={[12, 12, 12, 12]} style={{ marginTop: "20px" }} >
                    <UpdateColumn info={this.props.data} top={-20} text="obteniendo información">
                        <div className="Row" style={{ marginLeft: "-15px", marginRight: "-15px" }} >
                            <div className="col-md-4">
                                <div className="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 bordered">
                                    <h4 className="widget-thumb-heading">Número de Incidencias</h4>
                                    <div className="widget-thumb-wrap">
                                        <i className="widget-thumb-icon bg-green fas fa-cogs"></i>
                                        <div className="widget-thumb-body">
                                            <span className="widget-thumb-subtitle">TOTAL</span>
                                            <span className="widget-thumb-body-stat counter" data-counter="counterup" data-value={numeroTotalIncidencias}>{numeroTotalIncidencias}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 bordered">
                                    <h4 className="widget-thumb-heading">Top de 5 Incidencias</h4>
                                    <div className="widget-thumb-wrap">
                                        <i className="widget-thumb-icon bg-red fas fa-chart-line"></i>
                                        <div className="widget-thumb-body">
                                            <span className="widget-thumb-subtitle">TOTAL</span>
                                            <span className="widget-thumb-body-stat counter" data-counter="counterup" data-value={numeroTotalTopIncidencias}>{numeroTotalTopIncidencias}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 bordered">
                                    <h4 className="widget-thumb-heading">Top de 5 Incidencias</h4>
                                    <div className="widget-thumb-wrap">
                                        <i className="widget-thumb-icon bg-purple fas fa-percent"></i>
                                        <div className="widget-thumb-body">
                                            <span className="widget-thumb-subtitle">Porcentaje</span>
                                            <span className="widget-thumb-body-stat counter" data-counter="counterup" data-value={porcentajeTotalTopIncidencias}>{porcentajeTotalTopIncidencias}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UpdateColumn>
                </Column>;
            } else {
                return null;
            }
        };
    });

    export const GraficaReporte: any = global.connect(class extends React.Component<IResumenResultado, IResumenResultado> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {
            return <Column size={[12, 12, 12, 12]} style={{ paddingRight: "0px", paddingLeft: "0px", background: "white" }} >
                <div className="portlet light">
                    <div className="portlet-title tabbable-line" style={{ border: "0px", borderBottom: "1px solid #eef1f5" }}>
                        <div className="caption">
                            <span className="caption-subject bold uppercase font-dark"></span>
                            <span className="caption-helper"></span>
                        </div>
                        <div className="actions">
                            <a className="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""> </a>
                        </div>
                    </div>
                    <div className="portlet-body" style={{ height: "500px" }}>
                            <EKAmChartsCustom items={this.props.data} tipoGrafica={"pie"} />
                    </div>
                </div>
            </Column>;

        };
    });


    class Proceden$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$proceden"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Proceden",
            items: createDefaultStoreObject([]),
            label: "Estatus",
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
                items.push({ ID: 1, Clave: "S", Nombre: "Proceden" });
                items.push({ ID: 2, Clave: "A", Nombre: "Proceden - Abiertos" });
                items.push({ ID: 3, Clave: "C", Nombre: "Proceden - Cerrados" });
                items.push({ ID: 4, Clave: "N", Nombre: "No Proceden" });
                items.push({ ID: -2, Clave: "T", Nombre: "TODOS" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$proceden", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const ProcedenDDL: any = ReactRedux.connect(Proceden$DDL.props, null)(Proceden$DDL);

    class TipoVisualizacion$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$tipoVisualizacion"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoVisualizacion",
            items: createDefaultStoreObject([]),
            label: "Tipo de Visualización",
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
                items.push({ ID: 1, Clave: "D", Nombre: "DATOS" });
                items.push({ ID: 2, Clave: "G", Nombre: "GRAFICA" });
                items.push({ ID: 3, Clave: "P", Nombre: "PERIODO" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$tipoVisualizacion", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const TipoVisualizacionDDL: any = ReactRedux.connect(TipoVisualizacion$DDL.props, null)(TipoVisualizacion$DDL);

    class FiltrarPor$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$filtrarPor"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "FiltrarPor",
            items: createDefaultStoreObject([]),
            label: "Filtrar Por",
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
                items.push({ ID: 1, Clave: "I", Nombre: "INCIDENCIA" });
                items.push({ ID: 2, Clave: "F", Nombre: "FOLIO" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$filtrarPor", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const FiltrarPorDDL: any = ReactRedux.connect(FiltrarPor$DDL.props, null)(FiltrarPor$DDL);
};
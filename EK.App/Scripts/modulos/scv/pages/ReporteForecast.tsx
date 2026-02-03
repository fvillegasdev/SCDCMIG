namespace EK.Modules.SCV.Pages.Reportes.ReporteForecast {
    "use strict";

    const REPORTE_FORECAST: string = "Forecast";
    const config: page.IPageConfig = global.createPageConfig("reporteForecast", "scv", [REPORTE_FORECAST]);


    interface IForecast extends page.IProps {
        estadoEntidad: any;
    };


    export let Vista: any = global.connect(class extends React.Component<IForecast, IForecast> {
        constructor(props: IForecast) {
            super(props);
            this.actualizarEstado = this.actualizarEstado.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        onFilter(props: page.IProps, filters: any): any
        {
            let f: any = global.assign(filters);
            let encodedFilters: string = global.encodeObject(f);
            if (f && f.Indicador && f.Indicador.ID > 0 && f.Agrupador.ID > 0 && f.Year.ID > 0 && f.IndicadorSeleccionado.ID > 0)
            {
                global.dispatchAsync("global-page-data", "base/kontrol/expedientesReportes/Get/GetReporteForecast/" + encodedFilters, REPORTE_FORECAST);
            }

        };
        onExport(item: any, props: page.IProps): any {
            let encodedFilters: string = global.encodeObject({ claveReporte: config.id });
            window.open("base/scv/expedientesReportes/exportar/" + encodedFilters);
        };
        componentDidMount() {
            dispatchSuccessful("load::currentEntityState", { viewMode: true })
        }
        actualizarEstado(estado: boolean): void {
            dispatchSuccessful("load::currentEntityState", { viewMode: estado })
        }
        saveForm(): any {
            let item: EditForm = Forms.getForm(config.id)

            let model: any = item
                .addID()
                .addObject(REPORTE_FORECAST)
                .addVersion()
                .toObject();

            dispatchSuccessful("global-page-data", [], REPORTE_FORECAST);
            return model;
        };
        render(): JSX.Element {

            let estadoEntidad: any = getData(this.props.estadoEntidad);
            let canPageEdit: boolean = estadoEntidad && estadoEntidad.viewMode ? estadoEntidad.viewMode : false;

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowNew={false}
                allowView={false}
                onExport={this.onExport}
                allowDelete={false}>

                <PageButtons>

                    {(canPageEdit == true) ?
                        <div>
                            <EditarEntidad onClick={(e) => this.actualizarEstado(false)} />
                        </div>
                        : null
                    }

                    {(canPageEdit == false) ?
                        < CancelButton onClick={(e) => this.actualizarEstado(true)} /> : null
                    }

                    <SaveButton key="btnSave1" onClick={this.saveForm} />

                </PageButtons>


                <page.Filters>

                    <IndicadorDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <IndicadorSelector/>
                    <AgrupadoresDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <YearExecutionIndicadorDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                </page.Filters>
                <Reporte/>
            </page.Main>;
        };
    });

    interface IReporteForeact extends page.IProps {
        informacionReporte?: any;
        agrupador: any;
    };

    export let Reporte: any = global.connect(class extends React.Component<IReporteForeact, IReporteForeact> {
        constructor(props: IReporteForeact) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.informacionReporte = state.global.catalogo$FuerzaDeVentas;
            retValue.agrupador = Forms.getValue("Agrupador", config.id + "$filters")
            return retValue;
        };
        componentDidMount() {
            dispatchSuccessful("global-page-data", [], REPORTE_FORECAST);
        }
        shouldComponentUpdate(nextProps: IReporteForeact, nextState: any): boolean {
            return hasChanged(this.props.informacionReporte, nextProps.informacionReporte) ||
                   hasChanged(this.props.agrupador, nextProps.agrupador);
        };
        render(): JSX.Element {

            let agrupador: any = this.props.agrupador;
            let claveAgrupador: string = agrupador ? agrupador.Clave : "";

            let columnaAgrupador: string = "";

            switch (claveAgrupador)
            {
                case "CC":
                    columnaAgrupador = "CentroCostoConstruccion";
                    break;

                case "PRO":
                    columnaAgrupador = "Prototipo";
                    break;

                case "FIN":
                    columnaAgrupador = "Financiamiento";
                    break;

                case "TC":
                    columnaAgrupador = "TipoComercializacion";
                    break;
            }


            let ml: any = config.getML();
            let titulos: any = ml.consulta.sections.forecast;


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

                return <div>
                    <div className="dteScroll">
                        <div className="dteScrollContainer">
                            <page.SectionList
                                id={REPORTE_FORECAST}
                                title={"Reporte Forecast"}
                                icon="fas fa-chart-bar"
                                level={1}
                                collapsed={false}
                                parent={config.id}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                listHeader={<div>
                                    <Row className="list-fixed-header">
                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{titulos.desarrollo.Nombre}</Column>
                                        <Column size={[12, 9, 9, 9]} style={{ paddingLeft: 0 }}>
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

                                    </Row>
                                </div>}
                                aggregate={(item?: any, values?: any) =>
                                {
                                    let retValue: any = values ? values : {};

                                    if (item && item.Desarrollo)
                                    {
                                        if (!values.desarrollo)
                                        {
                                            values.desarrollo = item.Desarrollo;
                                            values.renderGroup = true;
                                           
                                        }
                                        else {

                                            if (values.desarrollo.ID !== item.Desarrollo.ID)
                                            {
                                                values.desarrollo = item.Desarrollo;

                                                values.renderGroup = true;
                                            }
                                            else
                                            {
                                                values.renderGroup = false;
                                            };
                                        };

                                    };

                                    return retValue;
                                }}
                                formatter={(index: number, item: any, values: any) => {
                                    return <Row>

                                        {values && values.renderGroup === true ?

                                            <Column size={[12, 12, 12, 12]}>
                                                <Row className="listItem-groupHeader">
                                                    <Column size={[12, 3, 3, 3]}>
                                                        {item.Desarrollo.Nombre}
                                                    </Column>
                                                    <Column size={[12, 9, 9, 9]}>

                                                        <Column size={[12, 1, 1, 1]}>
                                                            <input.Integer property={REPORTE_FORECAST} index={index} value={item['1']} id="1" idFormSection={config.id} />
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>287</div>
                                                            <div style={{ color: "darkblue" }}>23</div>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]}>
                                                            <div style={{ color: "red" }}>{1}</div>
                                                            <div style={{ color: "blue" }}>{1}</div>
                                                            <div style={{ color: "darkblue" }}>{1}</div>
                                                        </Column>

                                                    </Column>

                                                </Row>
                                            </Column>

                                            :
                                            null
                                        }

                                        <Column size={[12, 3, 3, 3]}>
                                            {item[columnaAgrupador].Nombre}
                                        </Column>

                                        <Column size={[12,9,9,9]}>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['1'] != null ? item['1'] : 0}
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                {item['2'] != null ? item['2'] : 0}
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                {item['3'] != null ? item['3'] : 0}
                                            </Column>

                                            <Column size={[12, 1, 1, 1]}>
                                                {item['4'] != null ? item['4'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['5'] != null ? item['5'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['6'] != null ? item['6'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['7'] != null ? item['7'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['8'] != null ? item['8'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['9'] != null ? item['9'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['10'] != null ? item['10'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['11'] != null ? item['11'] : 0}
                                            </Column>
                                            <Column size={[12, 1, 1, 1]}>
                                                {item['12'] != null ? item['12'] : 0}
                                            </Column>
                                        </Column>


                                    </Row>;
                                }}>
                            </page.SectionList>
                        </div>
                    </div>
                </div>

        };
    });
 
    let YearExecutionIndicadorDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
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
            dispatchAsync("load::YEARSExecutionProcesses", "base/scv/expedientesReportes/Get/GetYearEjecucionProcesos/" + global.encodeObject({etapas:1}));
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    let AgrupadoresDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.catalogo$AgrupadorRForecast,
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
        componentDidMount(): void
        {
            dispatchAsync("global-page-data", "catalogos/get(AGRUPADORES_RFORECAST)","AgrupadorRForecast");
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    let IndicadorDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.catalogo$IndicadorRForecast,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Indicador",
            items: createDefaultStoreObject([]),
            label: "Indicador",
            helpLabel: "Seleccione un Indicador",
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
            dispatchAsync("global-page-data", "catalogos/get(INDICADORRES_RFORECAST)", "IndicadorRForecast");
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    interface IIndicadorSelector extends page.IProps {
        indicador: any;
    }

    let IndicadorSelector: any = global.connect(class extends React.Component<IIndicadorSelector, IIndicadorSelector> {
        constructor(props: IIndicadorSelector) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.indicador = Forms.getValue("Indicador", config.id+"$filters")
            return retValue;
        };
        shouldComponentUpdate(nextProps: IIndicadorSelector, nextState: IIndicadorSelector): any {
            return hasChanged(this.props.indicador, nextProps.indicador);
        };
        render(): JSX.Element {
            let indicador: any = this.props.indicador;

            let claveIndicador: string = indicador ? indicador.Clave : "";

            if (claveIndicador == "ETA")
            {
                return <ddl.SCVEtapasDDL id="IndicadorSeleccionado" size={[12, 3, 3, 3]} addNewItem={"SO"} idFormSection={config.id +"$filters"} />

            }
            else if (claveIndicador == "PRO")
            {
                return <ddl.SCVProcesosDDL id="IndicadorSeleccionado" size={[12, 3, 3, 3]} addNewItem={"SO"} idFormSection={config.id + "$filters"}/>

            }

            return null;
        };
    });


    export interface IEntidadButton extends EK.UX.Buttons.IButtonProps {
        estado: any;
    }
    let EditarEntidad: any = global.connect(class extends React.Component<IEntidadButton, {}> {
        constructor(props: IEntidadButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            estado: state.global.currentEntityState
        });
        static defaultProps: IEntidadButton = {
            icon: "fa fa-edit",
            text: "",
            color: "white",
            className: "btn-editar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined,
            estado: undefined,
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
        shouldComponentUpdate(nextProps: IEntidadButton, nextState: IEntidadButton): boolean {
            return hasChanged(this.props.estado, nextProps.estado)
        };
        render(): JSX.Element {
            let estadoEntidad: any = getData(this.props.estado);
            let canPageEdit: boolean = estadoEntidad && estadoEntidad.viewMode ? estadoEntidad.viewMode : false;

            if (canPageEdit == false) {
                return null;
            }
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            return <Button {...this.props} className={className} onClick={this.onClick} />

        };
    });


};

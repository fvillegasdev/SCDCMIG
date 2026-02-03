namespace EK.Modules.SCV.Pages.Expedientes.Reportes.AnalisisPorEtapa {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("expedientesAnalisisPorEtapas", "scv");

    export let Vista: any = page.connect(class extends page.Base
    {
        constructor(props: page.IProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        }
        onFilter(props: page.IProps, filters: any): any
        {
            let f: any = global.assign(filters);

            if (f && f.Filtrado && f.Filtrado.ID>0)
            {
                let filtros: any = global.isEmpty(filters) ? null : global.getFilters(filters);

                if (f && f.IdEtapa) f.IdEtapa = undefined; // 

                if (f) {

                    if (f && f.Etapas)
                    {
                        let v: any[] = f.Etapas;
                        let etapas: string = "";
                        v.map((value: any, index: number) => {
                            if (value) {
                                etapas = etapas + value.ID + ",";
                            }
                        });
                        filtros.Etapas = etapas.substring(0, etapas.length - 1);;
                    }

                }

                props.config.dispatchCatalogoBasePost("base/scv/expedientesReportes/GetBP/GetReporteAnalisisExpedientesPorEtapa", { parametros: filtros});
            }
            else {
                global.dispatchSuccessful("load::currentCatalogo",[]);
            }

        };

        onExport(element: any): any {
            let idForm: string = [config.id, "filters"].join("$");

            let model: any = Forms.getForm(idForm);

            let item: any = {};
            item['claveReporte'] = config.id;
            item['idDesarrollo'] = model.Desarrollo ? model.Desarrollo.ID : null
            item['idTipoComercializacion'] = model.TipoComercializacion ? model.TipoComercializacion.ID : null;
            item['idCliente'] = model.Cliente ? model.Cliente.ID : null;
            item['idAgente'] = model.Agente ? model.Agente.ID : null;
            item['idFiltrado'] = model.Filtrado ? model.Filtrado.ID : null;
            //item['idProceso'] = model.Proceso ? model.Proceso.ID : null;
            item['cancelados'] = model.Cancelados;
            item['suspendidos'] = model.Suspendidos;
            item['idEsquemaSeguimiento'] = model.EsquemaSeguimiento ? model.EsquemaSeguimiento.ID : null;
            if (model && model.Etapas) {
                let v: any[] = model.Etapas;
                let etapas: string = "";
                v.map((value: any, index: number) => {
                    if (value) {
                        etapas = etapas + value.ID + ",";
                    }
                });
                item['etapas'] = etapas.substring(0, etapas.length - 1);;
            }

            //Exportamos a Excel
            let formName: string = "ExpedientesAnalisisPorEtapa";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "base/scv/expedientesReportes/exportar/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (global.encodeObject(item));
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);
        };
        onRowDoubleClick(item: any): any {
            go("scv/expedientes/" + item.ID);
        };
        onView(item: any): any {
            go("scv/expedientes/" + getDataID(item));
        };
        
        render(): JSX.Element {
            let ml: any = config.getML();

           

            return <page.Main {...config}
                allowDelete={false}
                allowNew={false}
                onExport={this.onExport}
                onView={this.onView}
                pageMode={PageMode.Principal}
                onFilter={this.onFilter}>

                <page.Filters>

                    <FiltradoEtapasDDL addNewItem="SO" />

                    <ddl.DesarrollosDDL id={"Desarrollo"} addNewItem={"VT"} size={[12, 3, 3, 3]} />
                    <ddl.TipoComercializacionDDL size={[12, 3, 3, 3]} id={"TipoComercializacion"} cargarDatos={true} addNewItem={"VT"} />
                    <EK.Modules.SCV.Pages.Expedientes.ClientesDDL id={"Cliente"} size={[12, 3, 3, 3]} label={ml.form.Cliente.label}/>
                    <ddl.UsuariosAllDDL size={[12, 3, 3, 3]} id={"Agente"} label={ml.form.Agente.label} addNewItem={"VT"} />

                    <FiltradoEtapa />

                    <ddl.SCVProcesosDDL size={[12, 3, 3, 3]} id={"Proceso"} addNewItem="VT" tipoProceso="PV" />

                    <EtapasPorProceso />


                    <ddl.SCVEsquemasSeguimientoAll id={"EsquemaSeguimiento"} size={[6, 3, 3, 3]} addNewItem="VT" />

                    <checkBox.CheckBox label="Incluir Cancelados" id={"Cancelados"} size={[6, 6, 2, 2]} />
                    <checkBox.CheckBox label="Incluir Suspendidos" id={"Suspendidos"} size={[6, 6, 2, 2]} />


                </page.Filters>

                <Grid/>
            </page.Main>;
        };
    });



    export let FiltradoEtapasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.OpcionesEtapasDDL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Filtrado",
            items: createDefaultStoreObject([]),
            label: "Filtrar Etapa Por",
            helpLabel: "Seleccione un Estatus",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OpcionesEtapasDDL", "catalogos/get(OPCIONES_Exp_Por_Etapa)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    interface IEtapasProceso extends IDropDrownListProps {
        proceso?: any;
    }
    let EtapasPorProcesoDDL: any = global.connect(class extends React.Component<IEtapasProceso, {}> {
        static props: any = (state: any) => ({
            items: state.global.EtapasPorProcesoDDL,
            proceso: Forms.getValue("Proceso", config.id + "$filters")
        });
        static defaultProps: IEtapasProceso = {
            id: "Etapa",
            items: createDefaultStoreObject([]),
            label: "Etapa",
            helpLabel: "Seleccione una etapa",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            itemFormatter: (item, container): any => {
                if (!item.id)
                {
                    return item.text;
                }
                else
                {
                    if (item.Esquema)
                    {
                        return $([
                            "<span style='margin-right:2px'>", item.Nombre, "</span>",
                            "<span class='badge badge-primary'>", item.Esquema ? item.Esquema.Nombre : "", "</span>",
                        ].join(""));
                    }
                    return $([
                        "<span>", item.Nombre, "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any =>
            {
                if (!item.id) {
                    return item.text;
                };

                if (item.Esquema)
                {
                    return $([
                        "<span style='margin-right:2px'>", item.Nombre, "</span>",
                        "<span class='badge badge-primary'>", item.Esquema ? item.Esquema.Nombre : "", "</span>",
                    ].join(""));
                }
                return $([
                    "<span>", item.Nombre, "</span>",
                ].join(""));
              
            },
        };
        componentDidMount(): void
        {
            let url: string = global.encodeAllURL("scv", "etapas", { activos: 1 });
            dispatchAsync("load::EtapasPorProcesoDDL", url);

        };
        componentWillReceiveProps(nextProps: IEtapasProceso, nextState: IEtapasProceso): any {

            if (global.hasChanged(this.props.proceso, nextProps.proceso))
            {
                let proceso: any = nextProps.proceso;
                Forms.updateFormElement(config.id + "$filters", "Etapa", { ID: -1, Clave: "Seleccione una opción" })

                if (proceso && proceso.ID > 0)
                {
                    let parametros: any = global.assign({ idProceso: proceso.ID });

                    dispatchAsync("load::EtapasPorProcesoDDL", "base/kontrol/expedientesReportes/Get/GetEtapasPorProceso/" + global.encodeObject(parametros));
                }
                else
                {
                    let url: string = global.encodeAllURL("scv", "etapas", { activos: 1 });
                    dispatchAsync("load::EtapasPorProcesoDDL", url);
                }
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}  />;
        }
    });


    interface IFiltradoEtapa extends page.IProps
    {
        filtrado?: any;
    };

    export let FiltradoEtapa: any = global.connect(class extends React.Component<IFiltradoEtapa, IFiltradoEtapa> {
        constructor(props: IFiltradoEtapa) {
            super(props);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.filtrado = Forms.getValue("Filtrado", config.id + "$filters");
            return retValue;
        };
        shouldComponentUpdate(nextProps: IFiltradoEtapa, nextState: any): boolean {
            return hasChanged(this.props.filtrado, nextProps.filtrado);
        };
        render(): JSX.Element
        {
            let filtrado: any = this.props.filtrado;

            if (filtrado && filtrado.Clave)
            {
                let clave: string = filtrado.Clave;
                //if (clave == "SEA")//Se encuentran activas
                //{
                //    return <ddl.SCVEtapasDDL/>
                //}
                if (clave == "INI" || clave=="FIN")//Iniciaron o finalizaron
                {
                    return <div>
                        <input.Date id={"FechaInicio"} type="date" size={[12, 2, 2, 2]} label={"Desde"}
                            validations={[
                                validations.lessEqualThan("FechaFin", "")]} idFormSection={config.id + "$filters"}/>

                        <input.Date id={"FechaFin"} type="date" size={[12, 2, 2, 2]} label={"Hasta"}
                            validations={[
                                validations.greaterEqualThan("FechaInicio", "")]} idFormSection={config.id + "$filters"}/>
                    </div>
                }
            }
            return null;
        }
    });


    interface IGrid extends page.IProps {
        filtrado: any;
        data: any;
    };

    export let Grid: any = global.connect(class extends React.Component<IGrid, IGrid> {
        constructor(props: IGrid) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.filtrado = Forms.getValue("Filtrado", config.id + "$filters");
            retValue.data = state.global.currentCatalogo;
            return retValue;
        };
        onRowDoubleClick(item: any): any {
            go("scv/expedientes/" + item.ID);
        };
        shouldComponentUpdate(nextProps: IGrid, nextState: any): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };
        render(): JSX.Element {
            let filtrado: any = this.props.filtrado;

            let ml: any = config.getML();

            let formatAgente: (data: any, row: any) => string = (data: any, row: any) => {
                let nombre: string = row.Agente.Nombre != null ? row.Agente.Nombre : "";
                let apellidos: string = row.Agente.Apellidos != null ? row.Agente.Apellidos : "";

                return nombre + " " + apellidos;

            };

            let formatExp: (data: any, row: any) => any = (data: any, row: any) =>
            {
                let estatus: string = row.EstatusExpediente.Clave == "C" ? row.EstatusExpediente.Clave : row.EstatusSeguimiento.Clave;
                let color: string = "";
                let mensajeIcono: string = "";
                switch (estatus)
                {
                    case "S":
                        color = "#337ab6";
                        mensajeIcono = "Exp. Suspendido";
                        break;
                    case "A":
                        color = "#8bc780";
                        mensajeIcono = "Exp. Activo";
                        break;
                    case "C":
                        color = "#df0707";
                        mensajeIcono = "Exp. Cancelado";
                        break;
                }

                return <div className="btn btn-circle btn-xs" title={mensajeIcono}>
                    <span style={{ color: color, fontSize: "12px" }} className="fad fa-circle"></span>
                    <span>{row.ID}</span>
                </div>;
            };

            //ml.consulta.grid.headers.motivoCancelacion.Nombre
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "ID", width: "80px", title: "Exp.", fixed: true, format: formatExp })
                .addLinkCliente({ data: "Cliente.Nombre", title: "Nombre", width: "250px", fixed: true })
                .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: "120px" })
                .add({ data: "TipoComercializacion.Nombre", title: "Tipo Comercialización", width: "130px" })
                .add({ data: "FaseActiva.Nombre", title: "Fase", width: "100px" })
                .add({ data: "Esquema.Nombre", title: "Esquema", width: "130px" })
                .add({ data: "EtapaActiva.Nombre", width: "150px" })
                .addDateFormat({ data: "EtapaActiva.FechaInicio", width: "140px" })
                .add({ data: "EtapaActiva.DiasTranscurridos", width: "110px" })
                .add({ data: "Agente.Nombre", width: "150px", format: formatAgente })
                .toArray();

            if (filtrado && filtrado.Clave == "INI")
            {
                dtConfig.columns
                    .add({ data: "EtapaHistorica.Nombre", width: "170px"})
                    .addDateFormat({ data: "EtapaHistorica.FechaInicio", width: "140px" })
                    .add({ data: "EtapaHistorica.DiasTranscurridos", width: "120px"})
                    .toArray();
                return <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} key={filtrado.Clave} />

            }
            else if (filtrado && filtrado.Clave == "FIN")
            {
                dtConfig.columns
                    .add({ data: "EtapaHistorica.Nombre", width: "150px"  })
                    .addDateFormat({ data: "EtapaHistorica.FechaCierre", width: "150px"})
                    .add({ data: "EtapaHistorica.DiasTranscurridos", width: "120px"})
                    .toArray();
                return <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} key={filtrado.Clave} />

            }

            dtConfig.columns
                .addLinkUsuario({ title: "Responsable del Exp", data: "Usuario", width: "180px" })
                .toArray();
            return <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />

        }
    });



    interface IEtapaPorProceso extends IDropDrownListProps {
        etapas?: DataElement;
        proceso?: any;
    }
    export let EtapasPorProceso: any = global.connect(class extends React.Component<IEtapaPorProceso, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.EtapasPorProcesoDDL,
            proceso: Forms.getValue("Proceso", config.id + "$filters"),
        });
        static defaultProps: IDropDrownListProps = {
            id: "Etapas",
            label: "Etapas",
            itemKey: "ID",
            itemValue: "Nombre",
            mode: SelectModeEnum.Multiple,
            matchers: ["Nombre"],
            itemFormatter: (item, container): any =>
            {
                if (!item.id)
                {
                    if (item.obj)
                    {
                        return $([
                            "<span>",
                            item.Nombre,
                            "</span>",
                        ].join(""));
                    }
                    else
                    {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return item.Nombre;
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return item.Nombre;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Nombre,
                        "</span>"].join(""));
                }
            },
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: IEtapaPorProceso, nextState: IEtapaPorProceso): any
        {
            if (global.hasChanged(this.props.proceso, nextProps.proceso))
            {
                let proceso: any = nextProps.proceso;
                if (proceso && proceso.ID > 0)
                {
                    let parametros: any = global.assign({ idProceso: proceso.ID });
                    dispatchAsync("load::EtapasPorProcesoDDL", "base/kontrol/expedientesReportes/Get/GetEtapasPorProceso/" + global.encodeObject(parametros));
                }
                else
                {
                    let url: string = global.encodeAllURL("scv", "etapas", { activos: 1 });
                    dispatchAsync("load::EtapasPorProcesoDDL", url);
                }
            };
        };
        componentDidMount(): void {
            let url: string = global.encodeAllURL("scv", "etapas", { activos: 1 });
            dispatchAsync("load::EtapasPorProcesoDDL", url);
        };
        render(): any {
            return <div className="">
                <EK.UX.DropDownLists.DropdownList$Form {...this.props} size={[12, 12, 12, 12]} />
            </div>;
        }
    });

};

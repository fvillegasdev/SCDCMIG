namespace EK.Modules.SCV.Pages.Expedientes.Reportes.CanceladosSuspendidos {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("expedientesCanceladosSuspendidos", "scv");

    export let Vista: any = page.connect(class extends page.Base
    {
        constructor(props: page.IProps) {
            super(props);
        }
        onFilter(props: page.IProps, filters: any): any
        {
            let f: any = global.assign(filters);
            if (f && f.Estatus && f.Estatus.ID > 0) {

                let filtros: any = global.isEmpty(filters) ? null : global.getFilters(filters);
                props.config.dispatchCatalogoBasePost("base/scv/expedientesReportes/GetBP/GetExpedientesCanceladosSuspendidos", { parametros: filtros });
            }
            else {
                global.dispatchSuccessful("load::currentCatalogo", []);
            }
        };

        onExport(element: any): any {
            let idForm: string = [config.id, "filters"].join("$");

            let model: any = Forms.getForm(idForm);

            let item: any = {};
            item['claveReporte'] = config.id;
            item['idDesarrollo'] = model.Desarrollo ? (model.Desarrollo.ID == -1 ? null : model.Desarrollo.ID) : null
            item['idTipoComercializacion'] = model.TipoComercializacion ? (model.TipoComercializacion.ID == -1 ? null : model.TipoComercializacion.ID) : null
            item['idCliente'] = model.Cliente ? (model.Cliente.ID == -1 ? null : model.Cliente.ID) : null
            item['idEstatus'] = model.Estatus ? (model.Estatus.ID == -1 ? null : model.Estatus.ID) : null
            item['idAgente'] = model.Agente ? (model.Agente.ID == -1 ? null : model.Agente.ID) : null
            item['idMotivo'] = model.Motivo ? (model.Motivo.ID == -1 ? null : model.Motivo.ID) : null
            item['FechaInicio'] = model.FechaInicio;
            item['FechaFin'] = model.FechaFin;

            //Exportamos a Excel
            let formName: string = "ExpedientesCanceladosSuspendidos";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "base/scv/expedientesReportes/exportar");
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
        onView(item: any): any
        {
            go("scv/expedientes/" + getDataID(item));
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowDelete={false}
                allowNew={false}
                onView={this.onView}
                onExport={this.onExport}
                onFilter={this.onFilter}>

                <page.Filters>
                    <EstatusExpedientesDDL addNewItem={"SO"} size={[12, 3, 3, 3]} />
                    <ddl.DesarrollosDDL id={"Desarrollo"} addNewItem={"VT"} size={[12, 3, 3, 3]} />
                    <ddl.TipoComercializacionDDL size={[12, 3, 3, 3]} id={"TipoComercializacion"} cargarDatos={true} addNewItem={"VT"} />
                    <EK.Modules.SCV.Pages.Expedientes.ClientesDDL id={"Cliente"} size={[12, 3, 3, 3]} label={ml.form.Cliente.label}/>

                    <ddl.UsuariosAllDDL size={[12, 3, 3, 3]} id={"Agente"} label={ml.form.Agente.label} addNewItem={"VT"} />

                    <MotivoCancelacionSuspencion />


                    <input.Date id={"FechaInicio"} type="date" size={[12, 2, 2, 2]} label={ml.filters.FechaInicio}
                        validations={[
                            validations.lessEqualThan("FechaFin", ml.alerts.FechaInicio)]}  />

                    <input.Date id={"FechaFin"} type="date" size={[12, 2, 2, 2]} label={ml.filters.FechaFin}
                        validations={[
                            validations.greaterEqualThan("FechaInicio", ml.alerts.FechaFin)]} />

                </page.Filters>
                <Grid/>
            </page.Main>;
        };
    });

    export let EstatusExpedientesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ReporteEstatusExpedientesDDL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject([]),
            label: "Estatus",
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
                dispatchAsync("load::ReporteEstatusExpedientesDDL", "catalogos/get(REPORTE_EXPEDIENTES_CS)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    interface IMotivoCancelacionSuspencion extends React.Props<any> {
        estatus: any;
    };
    export let MotivoCancelacionSuspencion: any = global.connect(class extends React.Component<IMotivoCancelacionSuspencion, IMotivoCancelacionSuspencion> {
        constructor(props: IMotivoCancelacionSuspencion) {
            super(props);
        };
        static props: any = (state: any) => ({
            estatus: Forms.getValue("Estatus", config.id+"$filters"),
        });
        shouldComponentUpdate(nextProps: IMotivoCancelacionSuspencion, nextState: any): boolean {
            return hasChanged(this.props.estatus, nextProps.estatus);
        };
        componentWillReceiveProps(nextProps: IMotivoCancelacionSuspencion, nextState: IMotivoCancelacionSuspencion): any
        {
            if (global.hasChanged(this.props.estatus, nextProps.estatus))
            {
                let estatus: any = nextProps.estatus;

                if (estatus && estatus.Clave == "C")
                {
                    Forms.updateFormElement(config.id + "$filters", "MotivoSuspencion", {ID: -1, Clave: "Seleccione una opción" } )
                }
                else if (estatus && estatus.Clave == "S")
                {
                    Forms.updateFormElement(config.id + "$filters", "MotivoCancelacion", {ID: -1, Clave: "Seleccione una opción" })
                }
            };
          
        };
        render(): any
        {
            let estatus: any = this.props.estatus;

            if (estatus && estatus.Clave)
            {
                if (estatus.Clave == "C") {
                    return <ddl.MotivosCancelacionDDL addNewItem={"SO"}  id="Motivo" idFormSection={config.id + "$filters"} />
                }
                else if (estatus.Clave == "S")
                {
                    return <ddl.MotivosSuspencionDDL addNewItem={"SO"} id="Motivo" idFormSection={config.id + "$filters"} />
                }
            }
            return null;

        };
    });


    interface IGrid extends page.IProps {
        estatus: any;
        data: any;
    };

    export let Grid: any = global.connect(class extends React.Component<IGrid, IGrid> {
        constructor(props: IGrid) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.estatus = Forms.getValue("Estatus", config.id + "$filters");
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
            let estatus: any = this.props.estatus;

            let ml: any = config.getML();

            if (estatus && estatus.Clave && isSuccessful(this.props.data))
            {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);

                let formatDuenio: (data: any, row: any) => string = (data: any, row: any) =>
                {
                    let nombre: string = row.Agente.Nombre != null ? row.Agente.Nombre : "";
                    let apellidos: string = row.Agente.Apellidos != null ? row.Agente.Apellidos : "";
                    return nombre + " " + apellidos;
                };

                let formatSolicitadoPor: (data: any, row: any) => string = (data: any, row: any) =>
                {
                    return row.Motivo.SolicitadoPor.Nombre + " " + row.Motivo.SolicitadoPor.Apellidos;
                };

                let formatAutorizadoPor: (data: any, row: any) => string = (data: any, row: any) =>
                {
                    let nombre: string = row.Motivo.AutorizadoPor.Nombre != null ? row.Motivo.AutorizadoPor.Nombre : "";
                    let apellidos: string = row.Motivo.AutorizadoPor.Apellidos != null ? row.Motivo.AutorizadoPor.Apellidos : "";
                    return nombre + " " + apellidos;
                };

                let formatEstatus: (data: any, row: any) => string = (data: any, row: any) =>
                {
                    let retValue: any;
                    switch (row.Estatus.Clave)
                    {
                        case "S":
                            retValue = <div className='bg-blue-steel  bg-font-blue-steel ' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{row.Estatus.Nombre}</div>
                            break;
                        case "C":
                            retValue = <div className='bg-red-flamingo bg-font-red-flamingo' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{row.Estatus.Nombre}</div>
                            break;
                        default:
                            retValue = "";
                            break;
                    }
                    return retValue;
                };

                dtConfig.columns
                    .addID({ width: "80px", title: "Expediente", fixed: true })
                    .addLinkCliente({ width: "250px", fixed: true })
                    .add({ data: "Desarrollo.Nombre", width: "150px" })
                    .add({ data: "TipoComercializacion.Nombre", width: "150px" })
                    .add({ data: "FaseActiva.Nombre", width: "100px" })
                    .add({ data: "EtapaActiva.Nombre", width: "150px" })
                    .addDateFormat({ data: "EtapaActiva.FechaInicio", width: "130px"})
                    .add({ data: "Agente.Nombre", width: "150px", format: formatDuenio })
                    .toArray();

                if (estatus && estatus.Clave == "C")
                {
                    dtConfig.columns
                        .add({ data: "Motivo.Nombre", width: "150px", title: ml.consulta.grid.headers.motivoCancelacion.Nombre })
                        .addDateFormat({ data: "Motivo.Fecha", width: "150px", title: ml.consulta.grid.headers.motivoCancelacion.Fecha })
                        .add({ data: "Motivo.SolicitadoPor.Nombre", width: "150px", format: formatSolicitadoPor })
                        .add({ data: "Motivo.AutorizadoPor.Nombre", width: "150px", format: formatAutorizadoPor })
                        .toArray();
                }
                else if (estatus && estatus.Clave == "S")
                {
                    dtConfig.columns
                        .add({ data: "Motivo.Nombre", width: "150px", title: ml.consulta.grid.headers.motivoSuspension.Nombre })
                        .addDateFormat({ data: "Motivo.Fecha", width: "150px", title: ml.consulta.grid.headers.motivoSuspension.Fecha})
                        .add({ data: "Motivo.SolicitadoPor.Nombre", width: "150px", format: formatSolicitadoPor, title: ml.consulta.grid.headers.motivoSuspension.SuspendidaPor })
                        .add({ data: "Motivo.SuspendidoDesde", width: "150px", title: ml.consulta.grid.headers.motivoSuspension.DiasTranscurridos })
                        .addDateFormat({ data: "Motivo.FechaEstimada", width: "150px", title: ml.consulta.grid.headers.motivoSuspension.FechaEstimada })
                        .toArray();
                }

                dtConfig.columns
                 .add({ data: "Motivo.Observaciones", width: "150px" })
                 .addLinkUsuario({ title: "Responsable del Exp", data: "Usuario", width: "180px" })
                 .add({ data: "Estatus.Nombre", width: "110px", format: formatEstatus })
                 .toArray();
                return <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} key={estatus.Clave} />
            }
            return null;
        }
    });


};

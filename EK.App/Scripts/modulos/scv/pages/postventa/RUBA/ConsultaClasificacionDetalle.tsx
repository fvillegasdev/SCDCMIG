namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaClasificacionViviendaPendienteEntrega {
    const PAGE_ID: string = "ConsultaClasificacionVP";
    const PAGE_PENDIENTE_RESULT_ID: string = "ConsultaClasificacionViviendaPendienteResult";

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
    interface IConsultaClasificacionViviendaPendienteEntrega extends page.IProps {
        plaza?: any;
        tiporeporte?: any;
        load?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaClasificacionViviendaPendienteEntrega, {}> {
        constructor(props: IConsultaClasificacionViviendaPendienteEntrega) {
            super(props);
            this.onSelectClasificacionViviendaPendiente = this.onSelectClasificacionViviendaPendiente.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            retValue.tiporeporte = Forms.getDataValue("TipoReporte", PAGE_ID, state)
            return retValue;
        };
        setColumns(): any {
            let columns = [
                { caption: "No. Cliente", dataField: "IdCliente", alignment: 'left' }
            ];
            return columns;
        }
        componentWillReceiveProps(nextProps: IConsultaClasificacionViviendaPendienteEntrega, nextState: IConsultaClasificacionViviendaPendienteEntrega): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelectByPlaza(parametros: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            const columns = [

                { caption: "Plaza", dataField: "PLAZA", alignment:'center'},
                { caption: "Cliente", dataField: "TCLIENTE", alignment:'center' },
                { caption: "Profeco", dataField: "TPROFECO", alignment:'center' },
                { caption: "Producción", dataField: "TPRODUCCION", alignment: 'center' },
                { caption: "Falta de servicios", dataField: "TFALTASERVICIOS", alignment: 'center' },
                { caption: "SC y DC", dataField: "TSCYDC", alignment:'center' },
                { caption: "Crédito", dataField: "TCREDITO", alignment:'center' },
                { caption: "Programadas", dataField: "TPROGRAMACION", alignment:'center' },
                { caption: "Total", dataField: "TOTAL", alignment:'center' }

            ];
            global.asyncPost("base/kontrol/ClasificacionViviendaPen/GetBP/GetReporteViviendaPEPlaza/", { parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_PENDIENTE_RESULT_ID)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            sorting: {
                                mode: "none" // or "multiple" | "none"
                            },
                            export: {
                                enabled: true,
                                fileName: "Desglose por plaza vivienda pendiente entrega" + fecha,
                                allowExportSelectedData: false
                            },
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            searchPanel: {
                                visible: true
                            },
                            paging: {
                                pageSize: 15
                            },

                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [15, 30, 45],
                                showInfo: true
                            },
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                        }).dxDataGrid("instance");
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });
        }
        onSelectByVivienda(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            if (params.FRACCIONAMIENTO === "" || params.FRACCIONAMIENTO === null || params.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'DPTO' : 'I';
            let columns: any;
            columns = UrlAplicacion.pathname.includes("intra") ? [
                
                { caption: "No. cliente", dataField: "IdCliente", alignment: 'left' },
                { caption: "Nombre cliente", dataField: "Nombre" },
                { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                { caption: "Edificio", dataField: "edificio" },
                { caption: "Nivel", dataField: "nivel" },
                { caption: "Departamento", dataField: "NumInterior" },
                { caption: "Calle", dataField: "Direccion" },
                { caption: "Ext.", dataField: "NumExterior" },
                { caption: "Plaza", dataField: "Plazas", alignment: 'left' },
                { caption: "Hipoteca Verde", dataField: 'HipotecaVerde' },
                { caption: "Ecocasa", dataField: 'EcoCasa' },
                { caption: "Equipamiento", dataField: 'Equipamiento' },
                { caption: "Descripcion Eq.", dataField: 'EquipamientoDesc' },
                { caption: "Tipo Vivienda", dataField: "TipoVivienda" },
                { caption: "Financiamiento", dataField: "Financiamiento" },
                { caption: "Fec. Escrituración", dataField: "FechaEscrituracion" },
                { caption: "Subsidio", dataField: "Subsidio" },
                { caption: "Fec. Firma", dataField: "FechaFirma", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Liberación", dataField: "FechaLiberacion", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Días Firma - Liberación", dataField: "DiasFirmaLiberacion" },
                { caption: "Fec. Const.", dataField: "FechaConstruccion", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Días Firma - Construcción", dataField: "DiasFirmaConstruccion" },
                { caption: "Detalles", dataField: "Detalle" },
                { caption: "Fec. Prog.", dataField: "FechaProgramacionConsulta", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Fec. Entrega", dataField: "FechaEntrega", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "CAT Agendo", dataField: "UsuarioAgendoConstruccion" },
                { caption: "CAT Entrego a SC", dataField: "UsuarioEntregoConstruccion" },
                { caption: "Comentarios construcción", dataField: "ObservacionesConstruccion" },
                { caption: "Comentarios entrega", dataField: "ObservacionesVivienda" },
                { caption: "Días Liberación - Entrega", dataField: "DiasLiberacionEntrega" },
                { caption: "Rezagos entrega", dataField: "CantidadRezagoEntrega", alignment: "center" },
                { caption: "Motivos Rezago", dataField: "MotivosRezagoEntrega" },
                { caption: "Fec. Reprog.", dataField: "FechaReprogramacion", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Obs. Cliente", dataField: "ObservacionCliente" },
                { caption: "Pendiente Pago", dataField: "PendientePago" },
                { caption: "Fec. Pendiente Pago", dataField: "FechaPendientePago", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Pago", dataField: "Pago", alignment: "left" },
                { caption: "Fec. Pagado", dataField: "FechaPago", alignment: "center", dataType: "datetime", format: "d/MM/yyyy" },
                { caption: "Teléfono", dataField: "Telefono" },
                { caption: "Tel. Oficina", dataField: "TelefonoOficina" },
                { caption: "Celular", dataField: "Celular" },
                { caption: "Correo Electrónico", dataField: "CorreoElectronico" },
                { caption: "CURP", dataField: "Curp" },
                { caption: "RFC", dataField: "RFC" },
                { caption: "# Prototipo", dataField: "NumPrototipo" },
                { caption: "Prototipo", dataField: "Prototipo" },
                { caption: "Contratista de Vivienda", dataField: "ContratistaVivienda" },
                { caption: "Entrego Vivienda", dataField: "EntregoVivienda" },
                { caption: "Reps. construcción", dataField: "repsConst" },
                { caption: "Reps. vivienda", dataField: "repsEnt" },
                { caption: "Gte. de SC", dataField: "GerentePostventa" },
                { caption: "Num. Crédito", dataField: "NumCredito" },
                { caption: "Num. Cred. Cony.", dataField: "NumCreditoCony" },
                { caption: "Días Firma - Entrega", dataField: "Dias" },
                { caption: "Monto Seguro", dataField: "MontoSeguro" },
                { caption: "Cliente", dataField: "Cliente" },
                { caption: "Profeco", dataField: "Profeco" },
                { caption: "Producción", dataField: "Produccion" },
                { caption: "Falta de servicios", dataField: "FaltaServicio" },
                { caption: "SCyDC", dataField: "SCyDC" },
                { caption: "Crédito", dataField: "Credito" },
                { caption: "Programación", dataField: "Programacion" },
                {
                    caption: "Fecha Programación", dataField: "FechaProgramacion",
                    cellTemplate: function (container, options) {
                        if (options.data.Programacion) {
                            return $("<div>", {})
                                .append($(`<span>${options.data.FechaProgramacion}</span>`))
                                .appendTo(container);
                        } else {
                            return null
                        }
                    }
                },
                { caption: "Comentarios Clasificacion", dataField: "Comentarios" }
            ] : [
                    { caption: "Plaza", dataField: "Plazas", alignment: 'left' },
                    { caption: "No. cliente", dataField: "IdCliente", alignment: 'left' },
                    { caption: "Nombre cliente", dataField: "Nombre" },
                    { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                    { caption: "ET", dataField: "Etapa" },
                    { caption: "M", dataField: "Manzana" },
                    { caption: "L", dataField: "Lote" },
                    { caption: "I", dataField: "NumInterior" },
                    { caption: "Ext.", dataField: "NumExterior" },
                    { caption: "Dirección", dataField: "Direccion" },
                    { caption: "Hipoteca Verde", dataField: 'HipotecaVerde' },
                    { caption: "Ecocasa", dataField: 'EcoCasa' },
                    { caption: "Equipamiento", dataField: 'Equipamiento' },
                    { caption: "Descripcion Eq.", dataField: 'EquipamientoDesc' },
                    { caption: "Tipo Vivienda", dataField: "TipoVivienda" },
                    { caption: "Financiamiento", dataField: "Financiamiento" },
                    { caption: "Fec. Escrituración", dataField: "FechaEscrituracion" },
                    { caption: "Subsidio", dataField: "Subsidio" },
                    { caption: "Fec. Firma", dataField: "FechaFirma", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Liberación", dataField: "FechaLiberacion", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Días Firma - Liberación", dataField: "DiasFirmaLiberacion" },
                    { caption: "Fec. Const.", dataField: "FechaConstruccion", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Días Firma - Construcción", dataField: "DiasFirmaConstruccion" },
                    { caption: "Detalles", dataField: "Detalle" },
                    { caption: "Fec. Prog.", dataField: "FechaProgramacionConsulta", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Fec. Entrega", dataField: "FechaEntrega", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "CAT Agendo", dataField: "UsuarioAgendoConstruccion" },
                    { caption: "CAT Entrego a SC", dataField: "UsuarioEntregoConstruccion" },
                    { caption: "Comentarios construcción", dataField: "ObservacionesConstruccion" },
                    { caption: "Comentarios entrega", dataField: "ObservacionesVivienda" },
                    { caption: "Días Liberación - Entrega", dataField: "DiasLiberacionEntrega" },
                    { caption: "Rezagos entrega", dataField: "CantidadRezagoEntrega", alignment: "center" },
                    { caption: "Motivos Rezago", dataField: "MotivosRezagoEntrega" },
                    { caption: "Fec. Reprog.", dataField: "FechaReprogramacion", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Obs. Cliente", dataField: "ObservacionCliente" },
                    { caption: "Pendiente Pago", dataField: "PendientePago" },
                    { caption: "Fec. Pendiente Pago", dataField: "FechaPendientePago", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Pago", dataField: "Pago", alignment: "left" },
                    { caption: "Fec. Pagado", dataField: "FechaPago", alignment: "center", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Teléfono", dataField: "Telefono" },
                    { caption: "Tel. Oficina", dataField: "TelefonoOficina" },
                    { caption: "Celular", dataField: "Celular" },
                    { caption: "Correo Electrónico", dataField: "CorreoElectronico" },
                    { caption: "CURP", dataField: "Curp" },
                    { caption: "RFC", dataField: "RFC" },
                    { caption: "# Prototipo", dataField: "NumPrototipo" },
                    { caption: "Prototipo", dataField: "Prototipo" },
                    { caption: "Contratista de Vivienda", dataField: "ContratistaVivienda" },
                    { caption: "Entrego Vivienda", dataField: "EntregoVivienda" },
                    { caption: "Reps. construcción", dataField: "repsConst" },
                    { caption: "Reps. vivienda", dataField: "repsEnt" },
                    { caption: "Gte. de SC", dataField: "GerentePostventa" },
                    { caption: "Num. Crédito", dataField: "NumCredito" },
                    { caption: "Num. Cred. Cony.", dataField: "NumCreditoCony" },
                    { caption: "Días Firma - Entrega", dataField: "Dias" },
                    { caption: "Monto Seguro", dataField: "MontoSeguro" },
                    { caption: "Cliente", dataField: "Cliente" },
                    { caption: "Profeco", dataField: "Profeco" },
                    { caption: "Producción", dataField: "Produccion" },
                    { caption: "Falta de servicios", dataField: "FaltaServicio" },
                    { caption: "SCyDC", dataField: "SCyDC" },
                    { caption: "Crédito", dataField: "Credito" },
                    { caption: "Programación", dataField: "Programacion" },
                    {
                        caption: "Fecha Programación", dataField: "FechaProgramacion",
                        cellTemplate: function (container, options) {
                            if (options.data.Programacion) {
                                return $("<div>", {})
                                    .append($(`<span>${options.data.FechaProgramacion}</span>`))
                                    .appendTo(container);
                            } else {
                                return null
                            }
                        }
                    },
                    { caption: "Comentarios Clasificacion", dataField: "Comentarios" }
                ];

            global.asyncPost("base/kontrol/ClasificacionViviendaPen/GetBP/GetReporteViviendaPE/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_PENDIENTE_RESULT_ID)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource:data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            sorting: {
                                mode: "multiple" // or "multiple" | "none"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
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
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "Desgloce por vivienda" + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.HipotecaVerde = d.HipotecaVerde ? 'SI' : 'NO';
                                    d.EcoCasa = d.Ecocasa ? 'SI' : 'NO';
                                    d.Equipamiento = d.Equipamiento ? 'SI' : 'NO';
                                    d.PendientePago = d.PendientePago ? 'SI' : 'NO';
                                    d.Pago = d.Pago ? 'SI' : 'NO';
                                    d.MontoSeguro = d.MontoSeguro ? 'SI' : 'NO';
                                    d.Cliente = d.Cliente ? 'SI' : 'NO';
                                    d.Profeco = d.Profeco ? 'SI' : 'NO';
                                    d.Produccion = d.Produccion ? 'SI' : 'NO';
                                    d.FaltaServicio = d.FaltaServicio ? 'SI' : 'NO';
                                    d.SCyDC = d.SCyDC ? 'SI' : 'NO';
                                    d.Credito = d.Credito ? 'SI' : 'NO';
                                    d.Programacion = d.Programacion ? 'SI' : 'NO';
                                }
                                e.cancel = false;
                                setTimeout(() => {
                                    for (const d of data) {
                                        d.HipotecaVerde = d.HipotecaVerde === 'SI' ? true : false
                                        d.Ecocasa = d.Ecocasa === 'SI' ? true : false
                                        d.Equipamiento = d.Equipamiento === 'SI' ? true : false
                                        d.PendientePago = d.PendientePago === 'SI' ? true : false
                                        d.Pago = d.Pago === 'SI' ? true : false
                                        d.MontoSeguro = d.MontoSeguro === 'SI' ? true : false
                                        d.Cliente = d.Cliente === 'SI' ? true : false
                                        d.Profeco = d.Profeco === 'SI' ? true : false
                                        d.Produccion = d.Produccion === 'SI' ? true : false
                                        d.FaltaServicio = d.FaltaServicio === 'SI' ? true : false
                                        d.SCyDC = d.SCyDC === 'SI' ? true : false
                                        d.Credito = d.Credito === 'SI' ? true : false
                                        d.Programacion = d.Programacion === 'SI' ? true : false
                                    }
                                }, 200);
                            }
                        }).dxDataGrid("instance");
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });

        }
        onSelectClasificacionViviendaPendiente(): void {
            let tipoReporte = getData(this.props.tiporeporte)
            let model: any = Forms.getForm(PAGE_ID);

            if (tipoReporte.Clave === "RV") {
                let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
                let Vocaciones = model.Vocacion.ID;
                let Plaza = model.PlazaInicial.ID;
                let p: any = global.assign({
                    PLAZA: Plaza,
                    VOCACIONES: Vocaciones,
                    FRACCIONAMIENTO: Fraccionamiento,
                });
                this.onSelectByVivienda(p)
            } else {
                let Plaza2 = model.Plaza.ID;
                this.onSelectByPlaza({ Plaza: Plaza2 });
            }

        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let tipoReporte = getData(this.props.tiporeporte)
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Consulta Clasificación Vivienda Pendiente de Entrega "}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectClasificacionViviendaPendiente} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>

                        {tipoReporte.Clave === "RV" ?
                        <div>
                            <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL id="Vocacion" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 6, 6]} id="Fraccionamientos" idForm={PAGE_ID} /> 
                                {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 6, 6]} />*/}
                        </div>
                            : <ddl.PlazasDDL2 id="Plaza" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        }    
                        <TipoReporteDDL idForm={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />

                    </Column>

                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaClasificacionViviendaPendienteEntrega, {}> {
        constructor(props: IConsultaClasificacionViviendaPendienteEntrega) {
            super(props);
        };
        static defaultProps: IConsultaClasificacionViviendaPendienteEntrega = {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>

            </Column></div>
        }
    });
}
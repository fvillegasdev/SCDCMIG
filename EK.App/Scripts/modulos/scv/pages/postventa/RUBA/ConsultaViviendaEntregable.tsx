namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaViviendaEntregable {
    //Configuracion Vivienda Entregable
    const PAGE_ID: string = "ConsultaViviendaEntregable";
    const PAGE_RESULT: string = "ConsultaViviendasEntregablesResult";
    const SECTION_CONCEPTO_ID: string = "ConsultaVE";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_RESULT]);

    const formatBadgeOk: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        data = (data === "True" || data === "SI") ? true : (data === "False" || data === "NO") ? false : data;
        return <div style={{ textAlign: "center" }}>{label.ok(data)}</div>
    };
    //
    const formatDate: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        data = (data != undefined && data.getFullYear() === 1) ? null : data;
        return <div style={{ textAlign: "center" }}>{label.formatDate(data)}</div>
    };
    const filterFracc = (Fraccionamientos: any) => {
        let fracc: string = "";
        for (const x in Fraccionamientos) {
            fracc += Fraccionamientos[x].ID + ","
        }
        let count = fracc.length;
        let fraccparams = fracc.slice(0, count - 1);
        return fraccparams;
    };
    export class Vista extends page.Base {
        onExcel(): void {
            //Obtenemos el Modelo de la Seccion
            let model: any = Forms.getForm(PAGE_ID);
            //Creamos el Modelo de Datos
            let item: any = {};
            item['Plaza'] = model.PlazaInicial.ID;
            item['FechaInicial'] = model.FechaInicio;
            item['FechaFinal'] = model.FechaFinal;
            item['HipotecaVerde'] = model.HipotecaVerde.ID;
            item['Equipamiento'] = model.Equipamiento.ID;
            item['Fraccionamiento'] = global.filterFracc(model.Fraccionamientos);
            item['Cliente'] = model.ClienteInicial != undefined && model.ClienteInicial != null ? model.ClienteInicial.ID : null;
            item['Vocaciones'] = model.Vocaciones.ID;
            item['Financiamiento'] = model.Financiamiento.ID;
            item['ViviendaEntregada'] = model.CheckVivienda === true ? 1 : 0;
            item['ViviendaEntregable'] = model.ViviendaEntregable != undefined && model.ViviendaEntregable != null ? model.ViviendaEntregable.ID : null;
            
            //Exportamos a Excel
            let formName: string = "ConsultaViviendasEntregables";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "ConsultaViviendasEntregables/Excel/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = global.encodeParameters(item);
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);

        }

        onRowDoubleClick(item: any): any {
            return null;
        };

        render(): JSX.Element {
            let ml: any = config.getML();
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowSave={false} allowEdit={false} allowDelete={false} >
                <PageButtons>
                    
                </PageButtons>
                <Filtros />
                <ResultView />
            </page.Main>
        };
    };

    interface IProps extends React.Props<any> {
        item?: any;
        ViviendasEntregablesResult?: DataElement;
        isNew?: boolean;
        global?: any;

    }
    interface IState {
        viewMode?: boolean;
    }

    interface IConsultaViviendaEntregableProps extends page.IProps  {
        ConsultaViviendasEntregablesResult?: DataElement;
        bloqueado?: any;
        entidad?: any;
        plaza?: any;
    };

    interface ConsultaViviendaEntregableState {

        bloqueado?: any;
    };

   let Filtros: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);

            this.onSelectViviendasEnt = this.onSelectViviendasEnt.bind(this);
        };

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            entidad: state.forms[SECTION_CONCEPTO_ID], 
            plaza: state.global.Plaza_Seleccionada,
        });


        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });


        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): void {
            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                //Forms.updateFormElement(PAGE_ID, "FraccInicial", null)
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        };

       
        componentDidMount(): void {
            global.dispatchSuccessful("global-page-data", null, PAGE_RESULT);
            Forms.updateFormElement([PAGE_ID].join(""), "FechaInicio", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([PAGE_ID].join(""), "FechaFinal", global.getToday(true));
            
        };

        onSelectViviendasEnt(changeViewMode?: boolean): void {

            if (!Forms.isValid(PAGE_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return; 
            };
            this.setState({ data: null });
            let model: any = Forms.getForm(PAGE_ID);
            console.log(model)
            let Plaza: any = model.PlazaInicial.ID;
            let FechaInicial: any = model.FechaInicio;
            let FechaFinal: any = model.FechaFinal;
            let HipotecaVerde: any = model.HipotecaVerde.ID; 
            let Equipamiento: any = model.Equipamiento.ID;
            let Fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let Cliente: any = model.ClienteInicial != undefined && model.ClienteInicial != null ?  model.ClienteInicial.ID : null ; 
            let vocaciones: any = model.Vocaciones.ID;
            let Financiamiento: any = model.Financiamiento.ID;
            let ViviendaEntregada: any = model.CheckVivienda === true ? 1 : 0 ;  
            let viviendaEntregable: any = ViviendaEntregada ? model.ViviendaEntregable.ID : null;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
                Plaza: Plaza,
                FechaInicial: FechaInicial,
                FechaFinal: FechaFinal,
                HipotecaVerde: HipotecaVerde,
                Equipamiento: Equipamiento,
                Fraccionamiento: Fraccionamiento,
                Cliente: Cliente,
                Vocaciones: vocaciones,
                Financiamiento: Financiamiento,
                ViviendaEntregada: ViviendaEntregada,
                ViviendaEntregable: viviendaEntregable,
                Segmento: segmento
            });
            console.log(p)
            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'DPTO' : 'I';
            let columnas: any;
            columnas = UrlAplicacion.pathname.includes("intra") ?
                [
                   
                    { caption: "No. cliente", dataField: "ID", alignment: 'left' },
                    { caption: "Nombre cliente", dataField: "Nombre" },
                    { caption: "Fraccionamiento", dataField: "nom_fracc" },
                    { caption: "Edificio", dataField: "edificio" },
                    { caption: "Nivel", dataField: "nivel" },
                    { caption: labelInterior, dataField: "id_num_interior" },
                    { caption: "Dirección", dataField: "dir_casa" },
                    { caption: "Ext.", dataField: "id_num_exterior" },
                    { caption: "Plaza", dataField: "Plaza.Nombre", alignment: 'left' },
                    { caption: "Etapa Proceso", dataField: "EtapaProceso" },
                    { caption: "Hipoteca Verde", dataField: 'hipoteca_verde' },
                    { caption: "Ecocasa", dataField: 'Ecocasa' },
                    { caption: "Equipamiento", dataField: 'vale_mueble' },
                    { caption: "Descripcion Eq.", dataField: 'vale_mueble_desc' },
                    { caption: "Tipo Vivienda", dataField: "desc_tipo_vivienda" },
                    { caption: "Financiamiento", dataField: "Financiamiento" },
                    { caption: "Fec. Escrituracion", dataField: "fecha_escrituracion" },
                    { caption: "Subsidio", dataField: "subsidio" },
                    { caption: "Fec. Firma", dataField: "fec_escritura_fisica", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Liberación", dataField: "fec_liberacion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Días Firma - Liberación", dataField: "dias_firma_liberacion", dataType: "number", alignment: "center" },
                    { caption: "Fec. Const.", dataField: "fecha_construccion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Días Firma - Construcción", dataField: "dias_firma_contruccion", dataType: "number", alignment: "center" },
                    { caption: "Detalles", dataField: "Detalles" },
                    { caption: "Fec. Prog.", dataField: "fecha_programacion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Fec. Entrega", dataField: "fecha_entrega", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Hora Entrega", dataField: "hora_entrega" },
                    { caption: "CAT Agendo", dataField: "UsuarioAgendoConstruccion" },
                    { caption: "CAT Entrego a SC", dataField: "UsuarioEntregoConstruccion" },
                    { caption: "Comentarios construcción", dataField: "ObservacionesConstruccion" },
                    { caption: "Comentarios entrega", dataField: "ObservacionesVivienda" },
                    { caption: "Días Liberación - Entrega", dataField: "dias_liberacion_entrega", dataType: "number", alignment: "center" },
                    //{ caption: "Desc. Rezago", dataField: "rezago_entrega" },
                    { caption: "Rezagos entrega", dataField: "CantidadRezagoEntrega", alignment: "center" },
                    { caption: "Motivos Rezago", dataField: "MotivosRezagoEntrega" },
                    { caption: "Fec. Reprog.", dataField: "fecha_reprogramacion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Obs. Cliente", dataField: "Obs_Cliente" },
                    { caption: "Pendiente Pago", dataField: "pendiente_pago" },
                    { caption: "Fec. Pendiente Pago", dataField: "fec_pendiente_pago", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Pago", dataField: "pago", alignment: "left" },
                    { caption: "Fec. Pagado", dataField: "fec_pago", alignment: "center", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Teléfono", dataField: "tel_casa" },
                    { caption: "Tel. Oficina", dataField: "tel_oficina" },
                    { caption: "Celular", dataField: "tel_otros" },
                    { caption: "Correo Electrónico", dataField: "dir_email" },
                    { caption: "CURP", dataField: "CURP" },
                    { caption: "RFC", dataField: "RFC" },
                    { caption: "# Prototipo", dataField: "id_num_tipocasa" },
                    { caption: "Prototipo", dataField: "nom_tipocasa" },
                    { caption: "Contratista de Vivienda", dataField: "dscontratista" },
                    { caption: "Entrego Vivienda", dataField: "nom_entrega_viv" },
                    { caption: "Reps. construcción", dataField: "repsConst" },
                    { caption: "Reps. vivienda", dataField: "repsEnt" },
                    { caption: "Motivos Reps. vivienda", dataField: "MotivosReprogramacionEntrega" },
                    { caption: "Fechas Reps. vivienda", dataField: "FechasReprogramacionEntrega" },
                    { caption: "Motivo Cambio Fecha Const", dataField: "mtvs_cambio_const" },
                    { caption: "Fechas Cambio Const", dataField: "fechas_cambio_const" },
                    { caption: "Motivo Cambio Fecha Viv", dataField: "mtvs_cambio_ent" },
                    { caption: "Fechas Cambio Viv", dataField: "fechas_cambio_ent" },
                    { caption: "Gte. de SC", dataField: "nom_gerente_ventas" },
                    { caption: "Num. Crédito", dataField: "num_credito" },
                    { caption: "Num. Cred. Cony.", dataField: "num_credito_cony" },
                    { caption: "Días Firma - Entrega", dataField: "diferencia_dias", dataType: "number" },
                    { caption: "Monto Seguro", dataField: "monto_seguro" }
                ] :
                [{ caption: "Plaza", dataField: "Plaza.Nombre", alignment: 'left' },
                    { caption: "No. cliente", dataField: "ID", alignment: 'left' },
                    { caption: "Nombre cliente", dataField: "Nombre" },
                    { caption: "Fraccionamiento", dataField: "nom_fracc" },
                    { caption: labelInterior, dataField: "id_num_interior" },
                    { caption: "Dirección", dataField: "dir_casa" },
                    { caption: "Ext.", dataField: "id_num_exterior" },
                    { caption: "Etapa Proceso", dataField: "EtapaProceso" },
                    { caption: "ET", dataField: "id_num_smza" },
                    { caption: "M", dataField: "id_num_mza" },
                    { caption: "L", dataField: "id_num_lote" },
                    { caption: "Hipoteca Verde", dataField: 'hipoteca_verde' },
                    { caption: "Ecocasa", dataField: 'Ecocasa' },
                    { caption: "Equipamiento", dataField: 'vale_mueble' },
                    { caption: "Descripcion Eq.", dataField: 'vale_mueble_desc' },
                    { caption: "Tipo Vivienda", dataField: "desc_tipo_vivienda" },
                    { caption: "Financiamiento", dataField: "Financiamiento" },
                    { caption: "Fec. Escrituracion", dataField: "fecha_escrituracion", dataType: "datetime", format: "dd/MM/yyyy"  },
                    { caption: "Subsidio", dataField: "subsidio" },
                    { caption: "Fec. Firma", dataField: "fec_escritura_fisica", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Liberación", dataField: "fec_liberacion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Días Firma - Liberación", dataField: "dias_firma_liberacion", dataType: "number", alignment: "center" },
                    { caption: "Fec. Const.", dataField: "fecha_construccion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Días Firma - Construcción", dataField: "dias_firma_contruccion", dataType: "number", alignment: "center" },
                    { caption: "Detalles", dataField: "Detalles" },
                    { caption: "Fec. Prog.", dataField: "fecha_programacion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Fec. Entrega", dataField: "fecha_entrega", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Hora Entrega", dataField: "hora_entrega" },
                    { caption: "CAT Agendo", dataField: "UsuarioAgendoConstruccion" },
                    { caption: "CAT Entrego a SC", dataField: "UsuarioEntregoConstruccion" },
                    { caption: "Comentarios construcción", dataField: "ObservacionesConstruccion" },
                    { caption: "Comentarios entrega", dataField: "ObservacionesVivienda"},
                    { caption: "Días Liberación - Entrega", dataField: "dias_liberacion_entrega", dataType: "number", alignment: "center" },
                    //{ caption: "Desc. Rezago", dataField: "rezago_entrega" },
                    { caption: "Rezagos entrega", dataField: "CantidadRezagoEntrega", alignment: "center" },
                    { caption: "Motivos Rezago", dataField: "MotivosRezagoEntrega" },
                    { caption: "Fec. Reprog.", dataField: "fecha_reprogramacion", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Obs. Cliente", dataField: "Obs_Cliente" },
                    { caption: "Pendiente Pago", dataField: "pendiente_pago" },
                    { caption: "Fec. Pendiente Pago", dataField: "fec_pendiente_pago", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Pago", dataField: "pago", alignment: "left" },
                    { caption: "Fec. Pagado", dataField: "fec_pago", alignment: "center", dataType: "datetime", format: "dd/MM/yyyy" },
                    { caption: "Teléfono", dataField: "tel_casa" },
                    { caption: "Tel. Oficina", dataField: "tel_oficina" },
                    { caption: "Celular", dataField: "tel_otros" },
                    { caption: "Correo Electrónico", dataField: "dir_email" },
                    { caption: "CURP", dataField: "CURP" },
                    { caption: "RFC", dataField: "RFC" },
                    { caption: "# Prototipo", dataField: "id_num_tipocasa" },
                    { caption: "Prototipo", dataField: "nom_tipocasa" },
                    { caption: "Contratista de Vivienda", dataField: "dscontratista" },
                    { caption: "Entrego Vivienda", dataField: "nom_entrega_viv" },
                    { caption: "Reps. construcción", dataField: "repsConst" },
                    { caption: "Reps. vivienda", dataField: "repsEnt" },
                    { caption: "Motivos Reps. vivienda", dataField: "MotivosReprogramacionEntrega" },
                    { caption: "Fechas Reps. vivienda", dataField: "FechasReprogramacionEntrega" },
                    { caption: "Motivo Cambio Fecha Const", dataField: "mtvs_cambio_const" },
                    { caption: "Fechas Cambio Const", dataField: "fechas_cambio_const" },
                    { caption: "Motivo Cambio Fecha Viv", dataField: "mtvs_cambio_ent" },
                    { caption: "Fechas Cambio Viv", dataField: "fechas_cambio_ent" },
                    { caption: "Gte. de SC", dataField: "nom_gerente_ventas" },
                    { caption: "Num. Crédito", dataField: "num_credito" },
                    { caption: "Num. Cred. Cony.", dataField: "num_credito_cony" },
                    { caption: "Días Firma - Entrega", dataField: "diferencia_dias", dataType: "number" },
                    { caption: "Monto Seguro", dataField: "monto_seguro" }];
            //if (UrlAplicacion.pathname.includes("intra")) {
            //    columnas.splice(8, 1).splice(9, 1).splice(10, 1);
            //    columnas.splice(8, 0, { caption: "Edificio", dataField: "edificio" }, { caption: "Nivel", dataField: "nivel" })
            //}
            let labelPromedio = document.getElementById('LabelPromedioEntrega').style.visibility = 'hidden';
            //global.dispatchAsyncPost("global-page-data", "base/kontrol/ConsultaViviendaEntregable/GetBP/GetViviendasEntregables/", { parametros: p }, PAGE_RESULT);
            // config.dispatchCatalogoBasePost("base/kontrol/ConsultaViviendaEntregable/GetBP/GetViviendasEntregables/", { parametros: p });
            //dispatchSuccessful("load::searchingDataState", true);
            global.asyncPost("base/kontrol/ConsultaViviendaEntregable/GetBP/GetViviendasEntregables/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        dispatchSuccessful("load::searchingDataState", false);
                        //console.log(data);
                        if (p.ViviendaEntregada == 1) {
                            let sumaDias = 0;
                            let sumaDiasFovissste = 0;
                            let totalCantidadConFovisste = 0;
                            //let prom = 0;
                            for (let d of data) {
                                sumaDias += parseInt(d.diferencia_dias, 10);
                                if (d.Financiamiento !== null && d.Financiamiento !== undefined && d.Financiamiento.toUpperCase() === 'FOVISSSTE') {
                                    totalCantidadConFovisste++;
                                    sumaDiasFovissste += parseInt(d.diferencia_dias, 10);
                                }
                            }

                            let promedioTotal: any = (sumaDias / data.length);
                            promedioTotal = promedioTotal.toFixed(2);

                            let promedioSinFovissste: any = ((sumaDias - sumaDiasFovissste) / (data.length - totalCantidadConFovisste));
                            promedioSinFovissste = promedioSinFovissste.toFixed(2);

                            console.log(sumaDias, sumaDiasFovissste, data.length, totalCantidadConFovisste )
                            dispatchSuccessful("load::promediosDiasEntrega", { Todo: promedioTotal, sinFovissste: promedioSinFovissste });
                            let labelPromedio = document.getElementById('LabelPromedioEntrega').style.visibility = 'visible';

                        }
                        
                        let fecha = Date.now();
                        for (const d of data) {
                            d.hipoteca_verde = this.convertToBool(d.hipoteca_verde);
                            d.Ecocasa = this.convertToBool(d.Ecocasa);
                            d.vale_mueble = this.convertToBool(d.vale_mueble);
                            d.pendiente_pago = this.convertToBool(d.pendiente_pago);
                            d.pago = this.convertToBool(d.pago);
                            d.monto_seguro = this.convertToBool(d.monto_seguro);
                            //1/1/0001
                            d.fec_escritura_fisica = d.fec_escritura_fisica !== null && d.fec_escritura_fisica.getFullYear() !== 1? d.fec_escritura_fisica : 'N/A';
                            d.fec_liberacion = d.fec_liberacion !== null && d.fec_liberacion.getFullYear() !== 1? d.fec_liberacion : 'N/A';
                            d.fecha_construccion = d.fecha_construccion !== null && d.fecha_construccion.getFullYear() !== 1? d.fecha_construccion : 'N/A';
                            d.fecha_programacion = d.fecha_programacion !== null && d.fecha_programacion.getFullYear() !== 1? d.fecha_programacion : 'N/A';
                            d.fecha_entrega = d.fecha_entrega !== null && d.fecha_entrega.getFullYear() !== 1? d.fecha_entrega : 'N/A';
                            d.fecha_reprogramacion = d.fecha_reprogramacion !== null && d.fecha_reprogramacion.getFullYear() !== 1 ? d.fecha_reprogramacion : 'N/A';
                            d.fec_pendiente_pago = d.fec_pendiente_pago !== null && d.fec_pendiente_pago.getFullYear() !== 1 ? d.fec_pendiente_pago : 'N/A';
                            d.fec_pago = d.fec_pago !== null && d.fec_pago.getFullYear() !== 1 ? d.fec_pago : 'N/A';
                            //d.diferencia_dias = parseInt(d.diferencia_dias, 10)
                            //console.log(d.fecha_reprogramacion.getFullYear())
                        }
                            global.dispatchSuccessful("global-current-catalogo", data);
                            let dataGrid = $("#datagroupContainer").dxDataGrid({
                                dataSource: data,
                                allowColumnReordering: true,
                                scrolling: {
                                    columnRenderingMode: "standard",
                                    showScrollbar:'always'
                                },
                                columnAutoWidth: true,
                                showBorders: false,
                                grouping: {
                                    autoExpandAll: true,
                                },
                                searchPanel: {
                                    visible: true
                                },
                                export: {
                                    enabled: true,
                                    fileName: "Reporte_Viviendas_Entregables" + fecha,
                                    allowExportSelectedData: false
                                },
                                onExporting: function (e) {
                                   
                                    e.cancel = true;
                                    for (const d of data) {
                                        d.hipoteca_verde = d.hipoteca_verde ? 'SI' : 'NO';
                                        d.Ecocasa = d.Ecocasa ? 'SI' : 'NO';
                                        d.vale_mueble = d.vale_mueble ? 'SI' : 'NO';
                                        d.pendiente_pago = d.pendiente_pago ? 'SI' : 'NO';
                                        d.pago = d.pago ? 'SI' : 'NO';
                                        d.monto_seguro = d.monto_seguro ? 'SI' : 'NO';
                                    }
                                    e.cancel = false;
                                    setTimeout( () => {
                                        for (const d of data) {
                                            d.hipoteca_verde = d.hipoteca_verde === 'SI'? true:false
                                            d.Ecocasa = d.Ecocasa === 'SI' ? true : false
                                            d.vale_mueble = d.vale_mueble === 'SI' ? true : false
                                            d.pendiente_pago = d.pendiente_pago === 'SI' ? true : false
                                            d.pago = d.pago === 'SI' ? true : false
                                            d.monto_seguro = d.monto_seguro === 'SI' ? true : false
                                        }
                                    }, 200);
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
                        dispatchSuccessful("load::searchingDataState", true);
                        break;
                    case AsyncActionTypeEnum.failed:
                        dispatchSuccessful("load::searchingDataState", false);
                        break;
                }
            });
        }

       convertToBool(value: string) {
           if (value === 'True') {
               return true;
           } else {
               return false;
           }
       }

       convertBoolToString(value: boolean) {
           if (value) {
               return 'SI';
           } else {
               return 'NO';
           }
       }
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
                    //mostrarBotonGuardar = true;
                }
            }
            let UrlAplicacion: any = window.location;
            let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")
            let valorViviendaEntregada: any = Forms.getValue("CheckVivienda", PAGE_ID);

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte de Viviendas Entregables"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button className={className} keyBtn={"btnSPVFiltrarInformacion"} iconOnly={true} color={color} icon="fa fa-search" onClick={this.onSelectViviendasEnt} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row >
                        {/*<PlazasDDL id={"PlazaInicial"} label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                        {/*<VocacionesSPVDDL id={"Vocaciones"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                        {/*<FraccionamientosDDL id={"FraccInicial"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} />*/}
                        <ddl.PlazasDDL id="PlazaInicial" label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                        <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 6, 6]} id="Fraccionamientos" idForm={PAGE_ID} />
                        {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} /> */}
                        <FinanciamientoDDL id={"Financiamiento"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                        <HipotecaVerdeDDL id={"HipotecaVerde"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                        <EquipamientoDDL id={"Equipamiento"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                        <input.Date id="FechaInicio" label={"Fecha Inicial"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} />
                        <input.Date id="FechaFinal" label={"Fecha Final"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} />
                        <checkBox.ViviendasEntregadas id={"CheckVivienda"} idForm={PAGE_ID} label={"Entregadas"} size={[12, 12, 1, 1]} />
                    </Row>
                    <Row>
                       
                       
                        {
                            valorViviendaEntregada ?
                                <ViviendasEntregadasDDL id={"ViviendaEntregable"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                : <Column size={[12, 12, 2, 2]}></Column>
                        }
 
                    </Row>
                    <Row style={{ paddingBottom: '10px' }}> 
                        <select.ClientesSPV id={"ClienteInicial"} label="Cliente" idForm={PAGE_ID} size={[12, 12, 6, 6]} required={false} />
                        {!IntraUrbana ?
                            <select.ClientesSPVML id={"ClienteInicial"} label={'Cliente (Manzana y Lote)'} idForm={PAGE_ID} size={[12, 12, 6, 6]} required={false} />
                            : <select.ClientesSPVEND id={"Cliente"} label={'Ubicacion (Edificio, Nivel, Dpto)'} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={false} />}
                    </Row>
                </page.OptionSection>
            </Column>
        }
    });

    interface IConsultaViviendaEntregableProps extends page.IProps {
        viviendasentregables?: DataElement;
    };

    interface ConsultaViviendaEntregableState {

    };

    let ResultView: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {


        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
            // console.log(props)
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        }

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            entidad: state.forms[SECTION_CONCEPTO_ID],
            plaza: state.global.Plaza_Seleccionada,
            data: global.getData(state.global.currentCatalogo),
            stateSearching: global.getData(state.global.searchingDataState),
            promediosEntrega: global.getData(state.global.promediosDiasEntrega)
        });

        onRowDoubleClick(item: any): any {
            return null
        };

        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): void {
            if (getData(nextProps.data) !== getData(this.props.data)) {
                // this.props.data = null;
            }
        }
        render(): JSX.Element {
            //if (this.props['promediosEntrega'] > 0) {
            //    console.log('mayor')
            //}
            let p = 13;

            return <Row >
                <Column size={[12, 12, 12, 12]}>
                <br />
                
                {this.props['stateSearching'] === true ? 
                    <Updating text="" /> :                    
                    <div>
                        <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}></div>
                            <Row id='LabelPromedioEntrega' style={{ visibility: 'hidden' }}>
                                <Column size={[12, 12, 6, 6]}>
                                    <h4 style={{ fontSize: '18px' }}>
                                        Dias promedio de entrega
                                        <span style={{ marginLeft: '5px', padding: '0px 3px', color: '#fff', fontWeight: 500, background: '#1abc9c' }}>
                                            {this.props['promediosEntrega'].Todo > 0 ? this.props['promediosEntrega'].Todo : 0}
                                        </span>
                                    </h4>
                                </Column>
                                <Column size={[12, 12, 6, 6]}>
                                    <h4 style={{ fontSize: '18px' }}>
                                        Dias promedio de entrega sin Fovissste
                                        <span style={{ marginLeft: '5px', padding: '0px 3px', color: '#fff', fontWeight: 500, background: '#1abc9c' }}>
                                            {this.props['promediosEntrega'].sinFovissste > 0 ? this.props['promediosEntrega'].sinFovissste : 0}
                                        </span>
                                    </h4>
                                </Column>
                        </Row>
                       
                        <br />

                    </div>
                }
                </Column>
            </Row>
        };
    });

};


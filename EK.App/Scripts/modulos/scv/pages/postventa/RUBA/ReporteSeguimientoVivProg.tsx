namespace EK.Modules.SCV.Pages.postventa.RUBA.ReporteSeguimientoVivProg {
    //Constantes
    const PAGE_ID: string = "ReporteSeguimientoVivProg";
    const PAGE_RESULT: string = "ReporteSeguimientoVivProgResult";
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
    declare const ExcelJS: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    //interfaces
    interface IReporteSeguimientoVivProg extends page.IProps {
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

    let Filtros: any = global.connect(class extends React.Component<IReporteSeguimientoVivProg, {}> {

        constructor(props: IReporteSeguimientoVivProg) {
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

        monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }

        onSearch(changeViewMode?: boolean): void {
            if (!Forms.isValid(PAGE_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            }
            this.setState({ data: null });
            let model: any = Forms.getForm(PAGE_ID);
            
            //return;
            let IdPlaza: any = model.PlazaInicial.ID;
            let Fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let Vocacion: any = model.Vocaciones.Clave;
            let FechaInicial: any = model.FechaInicio;
            let FechaFinal: any = model.FechaFinal;
            let diferencia = this.monthDiff(FechaInicial, FechaFinal);
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'

            console.log(Vocacion,Fraccionamiento)
            //console.log(diferencia);
            if (diferencia > 0) {
                warning("El rango de fechas debe ser del mismo mes");
                return;
            }
            //let factorEvaluacion = model.FactoresEvaluacion.ID;
            //let NoSeEncontro = model.CheckNoSeEncontro ? 1 : 0;
            //let NoQuisoContestar = model.CheckNoQuiso ? 1 : 0;
            //let SinEncuesta = model.CheckSinEncuesta ? 1 : 0;
            let parametros = global.assign({
                IdPlaza,
                FechaInicial,
                FechaFinal,
                Vocacion,
                ClaveFracc: Fraccionamiento,
                Sgmto: segmento
            });

            let columnas = [
                { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
                { caption: "Inventario Viviendas lista para entrega y que cuentan con fecha de construccion", dataField: "Inventario", alignment: 'center' },
                { caption: "Total Vivienda Verificada CAT", dataField: "TotalVivVerifCat", alignment: 'center' },
                { caption: "Total Vivienda Verificada fuera de rango", dataField: "TotalVerificadaFuera", alignment: 'center' },
                { caption: "Viviendas No Programadas SC", dataField: "NoProgramadasSC", alignment: 'center' },
                { caption: "Total Vivienda Programada SC", dataField: "TotalVivProgSC", alignment: 'center' },
                { caption: "Total Viv Entregadas", dataField: "TotalVivEntregadas", alignment: 'center' },
                { caption: "Viviendas recibidas Con Detalles", dataField: "ConDetalles", alignment: 'center' },
                { caption: "Viviendas recibidas Con Detalles Reprogramado", dataField: "ConDetallesRep", alignment: 'center' },
                { caption: "Viviendas No Entregadas", dataField: "VivNoEntregadas", alignment: 'center'},
                { caption: "Viviendas recibidas Cero Detalles", dataField: "CeroDetalles", alignment: 'center'},
                { caption: "Vivienda recibida con 2 o más intentos (Cero Detalles con Reprogramación)", dataField: "CeroDetallesRep", alignment: 'center' },
                { caption: "Efectividad", dataField: "Efectividad", alignment: 'center' },
                { caption: "Tendencia", dataField: "Tendencia" }
            ];
            let ColumnasDetalles = [
                { caption: "Plaza", dataField: "Plaza", alignment: 'left', width: 120 },
                { caption: "IdCliente", dataField: "IdCliente", alignment: 'left', width: 100 },
                { caption: "Segmento", dataField: "Segmento", alignment: 'center', width: 140 },
                { caption: "Frente", dataField: "Frente", alignment: 'center', width: 100 },
                { caption: "Etapa", dataField: "Etapa", alignment: 'center', width: 100 },
                { caption: "Manzana", dataField: "Manzana", alignment: 'center', width: 100},
                { caption: "Lote", dataField: "Lote", alignment: 'center', width: 100 },
                { caption: "Interior", dataField: "Interior", alignment: 'center', width: 100 },
                { caption: "Inventario Viviendas lista para entrega y que cuentan con fecha de construccion", dataField: "Inventario", alignment: 'center',width:220 },
                { caption: "Total Vivienda Verificada CAT", dataField: "TotalVivVerifCat", alignment: 'center', width: 140 },
                { caption: "Total Vivienda Verificadas Fuera de rango", dataField: "VerificadoFuera", alignment: 'center', width: 140 },
                { caption: "Viviendas No Programadas SC", dataField: "NoProgramadasSC", alignment: 'center', width: 140 },
                { caption: "Total Vivienda Programada SC", dataField: "TotalVivProgSC", alignment: 'center', width: 140 },
                { caption: "Total Viv Entregadas", dataField: "TotalVivEntregadas", alignment: 'center', width: 140 },
                { caption: "Viviendas recibidas Con Detalles", dataField: "ConDetalles", alignment: 'center', width: 140 },
                { caption: "Viviendas recibidas Con Detalles Reprogramado", dataField: "ConDetallesRep", alignment: 'center', width: 140 },
                { caption: "Viviendas No Entregadas", dataField: "VivNoEntregadas", alignment: 'center', width: 140},
                { caption: "Viviendas recibidas Cero detalles", dataField: "CeroDetalles", alignment: 'center', width: 140},
                { caption: "Vivienda recibida con 2 o más intentos (Cero Detalles con Reprogramación)", dataField: "CeroDetallesRep", alignment: 'center', width: 140 },
                { caption: "Motivo de no aceptacion", dataField: "MotivoNA", alignment: 'center', width: 250 },
                { caption: "Fecha Construccion", dataField: "FechaConstruccion", dataType: "datetime", format: "dd/MM/yyyy", width: 250 },
                { caption: "Fecha Entrega", dataField: "FechaEntrega", dataType: "datetime", format: "dd/MM/yyyy", width: 250  }
                
            ]
            let upd = document.getElementById("updating");
            let load = document.getElementById("loading");
              
            try {
                //$('#datagroupContainer').dxDataGrid("dispose");
                //$('#datagroupContainerHidden').dxDataGrid("dispose");
            } catch (ex) { }

            global.asyncPost("base/kontrol/ReporteSeguimientoVivProg/GetBP/GetReporteSeguimiento/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        upd.style.display = "none";
                        load.style.display = "block";
                        let fecha = Date.now();
                        console.log(data)
                        let ResumenPorPlaza = [];
                        for (let d of data) {

                            d.FechaConstruccion = global.formatDate(d.FechaConstruccion);
                            //d.FechaEntrega = global.formatDate(d.FechaEntrega);

                            if (ResumenPorPlaza.length <= 0) {
                                ResumenPorPlaza.push({plaza:d.Plaza,data: [d] });
                            } else {
                                //var seleccionado = ResumenPorPlaza.filter(x => x.plaza = d.Plaza)[0];
                                let isInArray = false;
                                for (let r of ResumenPorPlaza) {
                                    if (r.plaza === d.Plaza) {
                                        r.data.push(d);
                                        isInArray = true;
                                        break;
                                    }
                                }
                                if (!isInArray) {
                                    ResumenPorPlaza.push({plaza:d.Plaza,data:[d]})
                                }
                            }

                            
                        }
                        let DataResumenes = [];
                        for (let r of ResumenPorPlaza) {
                            let Plaza = r.plaza;
                            let Inventario = r.data.filter(x => x.Inventario === 1).length;
                            let TotalVivVerifCat = r.data.filter(x => x.TotalVivVerifCat === 1).length;
                            let NoProgramadasSC = r.data.filter(x => x.NoProgramadasSC === 1).length;
                            let TotalVivProgSC = r.data.filter(x => x.TotalVivProgSC === 1).length;
                            let TotalVivProgSCAnt = r.data.filter(x => x.TotalVivProgSCAnt === 1).length;
                            let TotalVivEntregadas = r.data.filter(x => x.TotalVivEntregadas === 1).length;
                            let ConDetalles = r.data.filter(x => x.ConDetalles === 1).length;
                            let ConDetallesRep = r.data.filter(x => x.ConDetallesRep === 1).length;
                            let VivNoEntregadas = r.data.filter(x => x.VivNoEntregadas === 1 && x.TotalVivProgSCAnt === 0).length;
                            let CeroDetalles = r.data.filter(x => x.CeroDetalles === 1).length;
                            let CeroDetallesAnt = r.data.filter(x => x.CeroDetallesAnt === 1).length;
                            let CeroDetallesRep = r.data.filter(x => x.CeroDetallesRep === 1).length;
                            let TotalVerificadaFuera = r.data.filter(x => x.VerificadoFuera === 1).length;

                            DataResumenes.push({
                                Plaza, Inventario, TotalVivVerifCat, NoProgramadasSC, TotalVivProgSC, TotalVivProgSCAnt, TotalVivEntregadas,
                                ConDetalles, ConDetallesRep, VivNoEntregadas, CeroDetalles, CeroDetallesAnt, CeroDetallesRep, TotalVerificadaFuera
                            });
                        }
                        //console.log(DataResumenes);

                        for (let d of DataResumenes) {
                            d.Efectividad = d.TotalVivProgSC > 0 ? ((d.CeroDetalles / d.TotalVivProgSC) * 100).toFixed(2) : 0;
                            let efectivadAnt:any = d.TotalVivProgSCAnt > 0 ? ((d.CeroDetallesAnt / d.TotalVivProgSCAnt) * 100).toFixed(2) : 0;
                            // console.log(d.Efectividad, efectivadAnt);
                            d.Tendencia = parseFloat(d.Efectividad) === parseFloat(efectivadAnt) ? 'MANTIENE' : parseFloat(d.Efectividad) > parseFloat(efectivadAnt) ? 'SUBE' : 'BAJA';
                            d.Efectividad += '%';
                        }

                        dispatchSuccessful("global-current-catalogo", data);
                        data = data.filter(x => x.CeroDetallesAnt === 0 && x.TotalVivProgSCAnt === 0);
                        console.log(data)
                        let dataGridHidden = $("#datagroupContainerHidden").dxDataGrid({
                            dataSource: data,
                            columns: ColumnasDetalles
                        }).dxDataGrid("instance");

                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: DataResumenes,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            

                            export: {
                                enabled: true,
                                fileName: "Reporte_Seguimiento_Vivienda_Prog-" + fecha,
                                allowExportSelectedData: false
                            },
                            onExporting: function (e) {
                                //e.cancel = true; 
                                let instancia = $("#datagroupContainerHidden").dxDataGrid("instance");
                                //console.log(instancia);
                                e.component.beginUpdate();
                                e.component._options.dataSource = data;
                                var workbook = new ExcelJS.Workbook();
                                var worksheet = workbook.addWorksheet('Resumen');
                                var worksheet2 = workbook.addWorksheet('Detalles');
                                //console.log(e.component)
                                //setTimeout(() => {
                                var ExportDataGridOptions = {
                                    worksheet: worksheet,
                                    component: e.component,
                                    customizeCell: function (options) {
                                        var excelCell = options;
                                        excelCell.font = { name: 'Arial', size: 12 };
                                        excelCell.alignment = { horizontal: 'left' };
                                    }
                                }
                                var ExportDataGridOptions2 = {
                                    worksheet: worksheet2,
                                    component: instancia,
                                    customizeCell: function (options) {
                                        var excelCell = options;
                                        excelCell.font = { name: 'Arial', size: 12 };
                                        excelCell.alignment = { horizontal: 'left' };
                                    }
                                }
                                
                                DevExpress.excelExporter.exportDataGrid(ExportDataGridOptions).then(function () {
                                    return DevExpress.excelExporter.exportDataGrid(ExportDataGridOptions2).then(function(){
                                        workbook.xlsx.writeBuffer().then(function (buffer) {
                                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "Reporte_Seguimiento_Vivienda_Prog-" + fecha + '.xlsx');
                                        });
                                      })
                         
                                    });
                                    e.cancel = true; 

                            },
                            searchPanel: {
                                visible: true
                            },
                            paging: {
                                pageSize: 20
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [15, 20, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: true
                            },
                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
                        dataGrid.refresh();
                        dataGridHidden.refresh();

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
            
        }
        componentWillReceiveProps(nextProps: IReporteSeguimientoVivProg, nextState: IReporteSeguimientoVivProg): void {
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
            let valorViviendaEntregada: any = Forms.getValue("CheckVivienda", PAGE_ID);
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte seguimiento vivienda programada"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button className={className} keyBtn={"btnSPVFiltrarInformacion"} iconOnly={true} color={color} icon="fa fa-search" onClick={this.onSearch} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row >
                        {/*<PlazasDDL id={"PlazaInicial"} label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                        {/*<VocacionesSPVDDL id={"Vocaciones"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                        {/*<FraccionamientosDDL id={"FraccInicial"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} />*/}
                        <ddl.PlazasDDL id="PlazaInicial" label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />

                        <input.Date id="FechaInicio" label={"Fecha Inicial"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} />
                        <input.Date id="FechaFinal" label={"Fecha Final"} idForm={PAGE_ID} size={[12, 12, 2, 2]} validations={[validations.required()]} />

                    </Row>
                    <Row style={{ paddingBottom: 10 }}>
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 12, 12]} id="Fraccionamientos" idForm={PAGE_ID} />

                        {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} /> */}
                        <br/>

                    </Row>

                </page.OptionSection>
            </Column>;

        }
    });

    export let ResultView: any = page.connect(class extends page.Base {

        constructor(props: IReporteSeguimientoVivProg) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            data: global.getData(state.global.currentCatalogo),
            stateSearching: global.getData(state.global.searchingDataState)
        });
        componentWillReceiveProps(nextProps: IReporteSeguimientoVivProg, nextState: IReporteSeguimientoVivProg): void {
            if (getData(nextProps.data) !== getData(this.props.data)) {
                // this.props.data = null;
            }
        }
       
        render(): JSX.Element {
            return <Column size={[12, 12, 12, 12]}>

                <br />
                    <div id="updating" style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>
                <div id="loading" style={{ display: 'none' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', marginBottom: '20px', background: '#fff' }}>
                    </div>
                    <div id="datagroupContainerHidden" style={{height:'10px',overflowY:'hidden',visibility:'hidden' }}>
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

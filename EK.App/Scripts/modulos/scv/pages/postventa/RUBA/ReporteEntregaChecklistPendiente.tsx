namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaChecklistPendiente {
    "use strict";
    const PAGE_ID: string = "ConsultaChecklistPendiente";
    const PAGE_RESULTADOS_ID: string = "ConsultaChecklistPendiente$resultados";

    //const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    declare const ExcelJS: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    //const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_RESULTADOS_ID]);


    interface IVistaProps extends page.IProps {
        tipoOrientacion?: DataElement;
        agrupadoPor?: DataElement;
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
            //retValue.tipoOrientacion = Forms.getDataValue("TipoOrientacion", [config.id + "$filters"].join(""), state);
            //retValue.agrupadoPor = Forms.getDataValue("AgrupadoPor", [config.id + "$filters"].join(""), state);
            return retValue;
        };
        onExport(): void {
            return;
        };

        onWillFilter(props: any, filters: any): any {
            let retValue: any = global.getFilters(filters);

            retValue.Fraccionamientos = filters.Fraccionamientos;

            if (retValue.Fraccionamientos && retValue.Fraccionamientos.length > 0) {
                retValue.Fraccionamientos.forEach((f: any) => { delete f["ID"]; });
            };
            return retValue;
        };

        openModalPhotoViewer(data) {
            let incidencia = data.row.data;
            if (!incidencia.TieneEvidencia || incidencia.TieneEvidencia !== 'SI') {
                global.info('Esta incidencia no tiene ninguna evidencia');
                return;
            }
            dispatchSuccessful('load::TipoViewer', 'REPORTE')
            dispatchSuccessful('load::ImageValueURI', incidencia.path)
            let modalPhoto: any = $("#ModalPhotoViewer");
            modalPhoto.modal();
            //console.log(incidencia);
        }

        onFilter(props: page.IProps, filtros: any, type?: string): void {
            if (getData(props.page).id === config.id) {
                if (!(filtros.Fraccionamientos && filtros.Fraccionamientos.length > 0)) {
                    global.info("Debe seleccionar por lo menos un fraccionamiento.");
                    return;
                };
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                let Fraccionamiento = global.filterFracc(filtros.Fraccionamientos)
                console.log(filtros)
                let filters: any = global.assign({
                    Plaza: filtros.IdPlazaInicial,
                    Fraccionamiento,
                    FechaInicial: filtros.FechaInicial,
                    FechaFinal: filtros.FechaFinal,
                    ItemCheck: filtros.IdChecklistItem ? filtros.IdChecklistItem: null
                });
                const columnas = [
                    //{
                    //    type: "selection",
                    //    headerCellTemplate: function (header, info) {
                    //        // Crear un elemento de título personalizado
                    //        $(header).append($("<span>").text("Convertir a Folio"));
                    //    },
                    //    width: 60 // Puedes ajustar el ancho de la columna
                    //},
                    { caption: "No. Cliente", dataField: "numcliente", alignment: 'center' },
                    { caption: "Cliente", dataField: "cliente", alignment: 'center' },
                    { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                   
                    { caption: "Fraccionamiento", dataField: "fraccionamiento", alignment: 'center' },
                    { caption: "Etapa", dataField: "etapa", alignment: 'center' },
                    { caption: "Manzana", dataField: "manzana", alignment: 'center' },
                    { caption: "Lote", dataField: "lote", alignment: 'center' },
                    { caption: "Int", dataField: "interior", alignment: 'center' },
                    { caption: "Ext", dataField: "exterior", alignment: 'center' },
                    { caption: "Calle", dataField: "calle", alignment: 'center' },
                    { caption: "Fecha Recepcion", dataField: "fechaRecepcion", alignment: 'center', dataType: "datetime", format: "dd/MM/yyyy HH:mm" },
                  

                    { caption: "Nombre Residente", dataField: "NombreResidente", alignment: 'center' },

                    //{ caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'center' },
                    //{ caption: "Reporte", dataField: "reporte", alignment: 'center' },
                    { caption: "Checklist", dataField: "checklist", alignment: 'center', },
                    { caption: "Informacion adicional", dataField: "Observaciones", alignment: 'center' },
                    //{ caption: "Componente", dataField: "componente", alignment: 'center' },
                    //{ caption: "Ubicacion Incidencia", dataField: "ubicacion", alignment: 'center' },
                    //{ caption: "Observaciones", dataField: "observaciones", alignment: 'center' },
                    //{ caption: "Atendido al momento", dataField: "atendido", alignment: 'center', dataType: "datetime", format: "dd/MM/yyyy" },
                    //{ caption: "Tiene evidencia", dataField: "TieneEvidencia", alignment: 'center' },
                    //{ caption: "Incidencia contratista", dataField: "incContratista", alignment: 'center' },
                    //{ caption: "Incidencia Proveedor", dataField: "incProveedor", alignment: 'center' },
                    //{
                    //    caption: 'Evidencia', type: "buttons", width: 80, alignment: 'center',
                    //    buttons: ["Ver", {
                    //        text: 'Ver evidencia',
                    //        icon: 'fas fa-eye',
                    //        color: '#ccc',
                    //        hint: 'Ver evidencia',
                    //        onClick: (e) => {
                    //            this.openModalPhotoViewer(e)
                    //        }
                    //    }

                    //    ]
                    //}
                ];
                console.log(filters)
                global.asyncPost("base/scv/reportesFallasConsulta/GetBP/GetConsultaChecklistPendiente/", { parametros: filters }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'block'
                            console.log(data);
                            let fecha = Date.now();
                            let dataGrid = $("#datagroupContainer").dxDataGrid({
                                dataSource: data,
                                onRowPrepared: (e) => {
                                    if (e.rowType === "data") {

                                        if (e.data.porVivEntregada > 50 && (e.data.AC === 0 || e.data.ComiteVecinal === 0)) {
                                            e.rowElement.css("background", '#e74c3c')
                                        }
                                    }
                                },
                                allowColumnReordering: true,
                                scrolling: {
                                    columnRenderingMode: "virtual"
                                },
                                columnAutoWidth: true,
                                showBorders: false,
                                grouping: {
                                    autoExpandAll: false,
                                },

                                onExporting: function (e) {

                                },

                                searchPanel: {
                                    visible: true
                                },
                                export: {
                                    enabled: true,
                                    fileName: "Reporte_Incidencias_Entrega" + fecha,
                                    allowExportSelectedData: false
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
                                rowAlternationEnabled: true,
                                selection: {
                                    mode: "multiple",
                                    allowSelectAll: false,
                                    showCheckBoxesMode: 'always'
                                },
                                onSelectionChanged: (e) => { // Handler of the "selectionChanged" event
                                    console.log(e);
                                    this.checkRowSelected(e)
                                }
                            }).dxDataGrid("instance");
                            dataGrid.refresh();
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


                //props.config.dispatchCatalogoBasePost("scv/contribucionPorPlaza/consulta", filters);
            };
        };

        checkRowSelected(e) {
            let btn = document.getElementById('btn-convert');
            if (e.selectedRowsData.length > 0) {
                btn.style.display = 'block';
                dispatchSuccessful('load::tmpListIncidenciasForFolio', e.selectedRowsData)
            } else {
                btn.style.display = 'none';
                dispatchSuccessful('load::tmpListIncidenciasForFolio', null)
            }


        }

        generarFolio() {
            let lista = EK.Store.getState().global.tmpListIncidenciasForFolio.data;
            const currentPath = window.location.hostname;
            console.log(currentPath);
            console.log(lista);
            let entregado = lista[0].Entregado;
            if (entregado === 'NO') {
                global.info('La vivienda aun no ha sido entregada');
                return;
            }
            let validoCliente = lista.every(x => x.numcliente === lista[0].numcliente);
            if (!validoCliente) {
                global.info('Las observaciones seleccionadas corresponden a clientes diferentes');
                return;
            }
            let contratistaValido = lista.every(x => x.IdContratista !== null);
            if (!contratistaValido) {
                global.info('Algunas observaciones no tienen agregado ningun contratista');
                return;
            }

            let disponiblesParaFolio = lista.every(x => x.generoFolio === false);
            if (!disponiblesParaFolio) {
                global.info('Hay observaciones que ya se generaron en un folio');
                return;
            }
            let p = {
                IdCliente: lista[0].numcliente,
                IdPlaza: lista[0].IdPlaza,
                lote_id: lista[0].lote_id,
                lista
            }
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            let self = this;
            EK.Global.confirm("Desea generar un folio con las obversaciones seleccionadas", "Generar Folio", () => {
                global.asyncPost("base/scv/ReportesFallas/GetBP/convertirComentariosEntregaAFolio/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:

                            console.log(data);

                            if (data !== null) {
                                let ids = lista.map(item => item.IdIncidencia).join(',');
                                let paramsUpd = { ids, folio: data.ID }
                                global.asyncPost("base/scv/ReportesFallas/GetBP/updateIncidenciasEntrega/", { parametros: paramsUpd }, (statusUpd: AsyncActionTypeEnum, dataUpd: any) => {
                                    switch (statusUpd) {
                                        case AsyncActionTypeEnum.successful:
                                            console.log(dataUpd)
                                            loader.style.display = 'none';
                                            loadedTable.style.display = 'block'
                                            if (dataUpd === 1) {
                                                let path = `${data.redirectReporteUrl}/${data.ID}`;;
                                                //switch (currentPath) {
                                                //    case 'localhost':
                                                //        path = `http://localhost:55407/#/scv/pv/reportesFallas/${data.ID}`;
                                                //        break;
                                                //    case 'demos.gruporuba.com.mx':
                                                //        path = `https://demos.gruporuba.com.mx/scdc3/#/scv/pv/reportesFallas/${data.ID}`;
                                                //        break;
                                                //    case 'apps.gruporuba.com.mx':
                                                //        path = `https://apps.gruporuba.com.mx/scdc/#/scv/pv/reportesFallas/${data.ID}`;
                                                //        break;
                                                //}
                                                let currentApp = EK.Store.getState().global.app;
                                                currentApp.data.Me.FolioPendiente = data.ID;
                                                console.log(path)
                                                console.log(currentApp)
                                                dispatchSuccessful('load::app', currentApp)
                                                if (path !== null) {
                                                    window.location.href = path;
                                                } else {
                                                    global.success(`Folio generado correctamente: ${data.ID} , editar manualmente`)
                                                    return;
                                                }

                                            }
                                            break;
                                        case AsyncActionTypeEnum.loading:
                                            loader.style.display = 'block';
                                            loadedTable.style.display = 'none'
                                            break;
                                        case AsyncActionTypeEnum.failed:
                                            loader.style.display = 'none';
                                            loadedTable.style.display = 'none';
                                            global.warning('Hubo un problema al actualizar las incidencias: [' + data + ']');
                                            break;
                                    }
                                });
                            } else {
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';
                                global.warning('Hubo un problema al generar el folio: [' + data + ']');
                            }
                            break;
                        case AsyncActionTypeEnum.loading:
                            loader.style.display = 'block';
                            loadedTable.style.display = 'none'
                            break;
                        case AsyncActionTypeEnum.failed:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'none';
                            global.warning('Hubo un problema al generar el folio: [' + data + ']');
                            break;
                    }
                });
            });
        }

        updateIncidenciasEntrega(lista, folio) {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            let ids = lista.map(item => item.IdIncidencia).join(',');
            let paramsUpd = { ids, folio }
            global.asyncPost("base/scv/ReportesFallas/GetBP/updateIncidenciasEntrega/", { parametros: paramsUpd }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        console.log(data)
                        loader.style.display = 'none';
                        loadedTable.style.display = 'block'
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        global.warning('Hubo un problema al actualizar las incidencias: [' + data + ']');
                        //return;
                        break;
                }
            });
        }

        componentDidMount(): void {
            global.dispatchSuccessful("global-current-catalogo", []);
            //let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1 });
            //global.dispatchAsync("load::ubicaciones$fallas", url);
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            //Forms.updateFormElement([config.id + "$filters"].join(""), "TipoFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            //Forms.updateFormElement([config.id + "$filters"].join(""), "Falla", { ID: -2, IdFalla: -2, Clave: "-2", Nombre: "TODOS", Descripcion: "TODOS" });
            //Forms.updateFormElement([config.id + "$filters"].join(""), "UbicacionFalla", { ID: -2, IdUbicacionFalla: null, Descripcion: "Seleccione una opción" });
            //Forms.updateFormElement([config.id + "$filters"].join(""), "Fraccionamientos", [{ Clave: "-2", ID: -2, Nombre: "TODOS", id: -2 }]);
            //let e: any = global.assign({}, { ID: -2, IdUbicacionFalla: null, Descripcion: "Seleccione una opción" });

        };
        componentWillReceiveProps(nextProps: IVistaProps): any {
            //if (global.hasChanged(this.props.tipoOrientacion, nextProps.tipoOrientacion) ||
            //    global.hasChanged(this.props.agrupadoPor, nextProps.agrupadoPor)) {
            //    this.setState({ childKey: ++this.state.childKey });
            //};
        };
        onRowDoubleClick(item: any): any {
            return null;
        };
        render(): JSX.Element {


            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowNew={false}
                allowDelete={false}
                onWillFilter={this.onWillFilter.bind(this)}
                onFilter={this.onFilter.bind(this)}
                onExport={this.onExport.bind(this)}>
                <page.Filters collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL label="Plaza" id="PlazaInicial" idForm={config.id} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 3, 3]} id="Fraccionamientos" idForm={PAGE_ID} />

                    <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idForm={config.id} size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaFinal" label="Fecha Final" type="date" idForm={config.id} size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                    <ddl.SPVChecklistconstruccionDDL id="ChecklistItem" idFormSection={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} /> 


                </page.Filters>
                <Row>
                    <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                        <div id="loading" style={{ display: 'none' }}>
                            <Updating text="" />
                        </div>

                        <div id="loadedData" style={{ display: 'none' }}>
                            <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                        </div>
                    </Column>
                </Row>
                <ModalPhotoViewer size={[12, 12, 12, 12]} />
            </page.Main>
        };
    });

    interface IReporteAnalisisComunidad extends page.IProps {
        plaza?: any;
        load?: any;
    };

    let ResultView: any = global.connect(class extends React.Component<IReporteAnalisisComunidad, {}> {
        constructor(props: IReporteAnalisisComunidad) {
            super(props);
        };
        static defaultProps: IReporteAnalisisComunidad = {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'none' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>

            </Column>
            </div>
        }
    });
};
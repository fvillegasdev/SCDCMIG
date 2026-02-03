namespace EK.Modules.SCV.Pages.Reportes.ConsultaIncidenciasNoVigentes {
    "use strict";
    const PAGE_ID: string = "ReporteIncidenciasNoVigentes";
    const PAGE_RESULTADOS_ID: string = "ReporteIncidenciasNoVigentes$resultados";

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
                    Vocacion: filtros.IdVocaciones? filtros.IdVocaciones:-2,
                    Segmento: filtros.Idsegmento ? filtros.Idsegmento : 9999,
                    Contratista: filtros.IdContratista ? filtros.IdContratista : -2,
                    FechaInicial: filtros.FechaInicial,
                    FechaFinal: filtros.FechaFinal,
                    Familia: filtros.IdTipoFalla ? filtros.IdTipoFalla : -2,
                    Componente: filtros.IdFalla ? filtros.IdFalla : -2,
                    Ubicacion: filtros.IdUbicacionFalla ? filtros.IdUbicacionFalla : -2
                });
                const columnas = [
                    { caption: "# Cliente", dataField: "numcliente", alignment: 'center' },
                    { caption: "Cliente", dataField: "cliente", alignment: 'center' },
                    { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                    { caption: "Vocacion", dataField: "vocacion", alignment: 'center' },
                    { caption: "Segmento", dataField: "segmento", alignment: 'center' },
                    //{ caption: "# Fraccionamiento", dataField: "cvefracc", alignment: 'center' },
                    { caption: "Nombre Fraccionamiento", dataField: "fraccionamiento", alignment: 'center' },
                    { caption: "Nombre Contratista Incidencia", dataField: "nomcontratista", alignment: 'center' },

                    //{ caption: "Tipo Vivienda", dataField: "TipoVivienda", alignment: 'center' },
                    //{ caption: "Reporte", dataField: "reporte", alignment: 'center' },
                    { caption: "Fecha Creación", dataField: "fechaReporte", alignment: 'center', dataType: "datetime", format: "dd/MM/yyyy HH:mm" },
                    { caption: "Familia", dataField: "familia", alignment: 'center' },
                    { caption: "Componente", dataField: "componente", alignment: 'center' },
                    { caption: "Ubicacion Incidencia", dataField: "ubicacion", alignment: 'center' },
                    
                    
                    { caption: "Fecha Entrega", dataField: "entregavivienda", alignment: 'center', dataType: "datetime", format: "dd/MM/yyyy" },
              
                ];
                console.log(filters)
                global.asyncPost("base/scv/reportesFallasConsulta/GetBP/GetConsultaIncidenciasNoVigentes/", {parametros:filters} , (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'block'

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
                                    fileName: "Reporte_Analisis_Comunidades_" + fecha,
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
                                rowAlternationEnabled: true
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
        componentDidMount(): void {
            global.dispatchSuccessful("global-current-catalogo", []);
            let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1 });
            global.dispatchAsync("load::ubicaciones$fallas", url);
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            Forms.updateFormElement([config.id + "$filters"].join(""), "TipoFalla", { ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement([config.id + "$filters"].join(""), "Falla", { ID: -2, IdFalla: -2, Clave: "-2", Nombre: "TODOS", Descripcion: "TODOS" });
            Forms.updateFormElement([config.id + "$filters"].join(""), "UbicacionFalla", { ID: -2, IdUbicacionFalla: null, Descripcion: "Seleccione una opción" });
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
                    <ddl.PlazasDDL label="Plaza" id="PlazaInicial" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.VocacionesFilterDDL id="Vocaciones" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.SegmentosDDL3 id="segmento" idForm={config.id} size={[12, 12, 2, 2]} />

                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} />

                    <consultas.SPVContratistasConsulta id="Contratista" idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idForm={config.id} size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaFinal" label="Fecha Final" type="date" idForm={config.id} size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                    <consultas.SPVTiposComponentesConsulta id="TipoFalla" idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    <consultas.SPVComponentesConsulta id="Falla" idForm={config.id} size={[12, 12, 3, 3]} selectAll={true} required={true} validations={[validations.required()]} />
                    <ddl.SPVUbicacionesFallasDDL id="UbicacionFalla" idFormSection={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} /> 

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

}
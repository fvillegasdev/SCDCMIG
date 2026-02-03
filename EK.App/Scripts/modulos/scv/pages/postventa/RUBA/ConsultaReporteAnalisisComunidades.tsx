namespace EK.Modules.SCV.Pages.Reportes.ConsultaAnalisisComunidades {
    "use strict";
    const PAGE_ID: string = "ConsultaAnalisisComunidades";
    const PAGE_RESULTADOS_ID: string = "ConsultaAnalisisComunidades$resultados";

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
        onFilter(props: page.IProps, filters: any, type?: string): void {
            if (getData(props.page).id === config.id) {
                if (!(filters.Fraccionamientos && filters.Fraccionamientos.length > 0)) {
                    global.info("Debe seleccionar por lo menos un fraccionamiento.");
                    return;
                };
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                let Fraccionamiento = global.filterFracc(filters.Fraccionamientos)
                let p: any = global.assign({
                    Plaza: filters.IdPlazaInicial,
                    Fraccionamiento,
                    FechaInicial: filters.FechaInicial,
                    FechaFinal: filters.FechaFinal,
                });
                    const columnas = [
                        { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                        { caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' },
                        { caption: "Porcentaje Viviendas Entregadas", dataField: "porVivEntregada", alignment: 'center' },
                        { caption: "Comité vecinal", dataField: "s_ComiteVecinal", alignment: 'center' },
                        {
                            caption: "Fondo Convive", dataField: "fondoConvive", alignment: 'center', format: {
                                type: 'currency',
                                precision: 3
                            }
                        },
                        { caption: "Entrega de áreas comunes", dataField: "s_EntregaAreasComunes", alignment: 'center' },
                        { caption: "AC", dataField: "s_AC", alignment: 'center' },
                        { caption: "Fondo entregado", dataField: "s_FondoEntregado", alignment: 'center' },
                        { caption: "Entrega de la administración ", dataField: "s_EntregaAdmin", alignment: 'center' },
                        { caption: "Número de folios abiertos de áreas comunes", dataField: "cantFoliosAbiertosAC", alignment: 'center' },
                        { caption: "Numero de folios abiertos de casas", dataField: "cantFoliosAbiertos", alignment: 'center' },
                        { caption: "Fecha a partir de 50 + 1", dataField: "fecha51", alignment: 'center' },
                        { caption: "Anotaciones", dataField: "Anotaciones", alignment: 'center' }
                    ];
                    console.log(p)
                    global.asyncPost("base/kontrol/ReporteAnalisisComunidades/GetBP/GetConsultaAnalisisComunidades/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                //console.log(data)
                                loader.style.display = 'none';
                                loadedTable.style.display = 'block'

                                //for (let d of data) {
                                //    d.ComiteVecinal ? 'SI' : 'NO';
                                //    d.AC ? 'SI' : 'NO';
                                //    d.EntregaAreasComunes ? 'SI' : 'NO';
                                //    d.EntregaAdministracion ? 'SI' : 'NO';
                                //    d.FondoEntregado === 0 ? 'SI' : d.FondoEntregado === 1 ? 'NO':'Parcial';
                                //}
                                let fecha = Date.now();
                                let dataGrid = $("#datagroupContainer").dxDataGrid({
                                    dataSource: data,
                                    onRowPrepared: (e) => {
                                        if (e.rowType === "data") {
                                            //e.rowElement.css("background",
                                            //    e.data.PuntajeProblematica === 1 || e.data.PuntajeProblematica === 2 ? "#f1c40f" :
                                            //        e.data.PuntajeProblematica === 3 || e.data.PuntajeProblematica === 4 ? "#e67e22" :
                                            //            e.data.PuntajeProblematica > 4 ? "#e74c3c" : ''
                                            //);
                                            if (e.data.porVivEntregada > 50 && (e.data.AC === 0 || e.data.ComiteVecinal === 0)) {
                                                e.rowElement.css("background", '#e74c3c')
                                            }
                                            //console.log(e.data)
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

                                        //e.cancel = true;
                                        //for (const d of data) {
                                        //    d.EsHipotecaVerde = d.EsHipotecaVerde ? 'SI' : 'NO';
                                        //    d.Procede = d.Procede ? 'SI' : 'NO';
                                        //    d.MontoSeguro = d.MontoSeguro ? 'SI' : 'NO';
                                        //}
                                        //e.cancel = false;
                                        //setTimeout(() => {
                                        //    for (const d of data) {
                                        //        d.EsHipotecaVerde = d.EsHipotecaVerde === 'SI' ? true : false
                                        //        d.Procede = d.Procede === 'SI' ? true : false
                                        //        d.MontoSeguro = d.MontoSeguro === 'SI' ? true : false
                                        //    }
                                        //}, 200);

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
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            //Forms.updateFormElement([config.id + "$filters"].join(""), "Fraccionamientos", [{ Clave: "-2", ID: -2, Nombre: "TODOS", id: -2 }]);
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
                    <ddl.PlazasDDL label="Plaza" id="PlazaInicial" idForm={config.id} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 6, 6]} id="Fraccionamientos" idForm={PAGE_ID} />

                    <DatePicker id="FechaInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
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
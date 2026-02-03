// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX.Consultas {
    "use strict";

    export interface IConsultaProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        config?: page.IPageConfig;
        label?: string;
        helpLabel?: string;
        header?: any;
        beforeInvoke?: () => any;
        itemFormatter?: (item: any, container?: any) => any;
        onRowDoubleClick?: (item: any) => void;
        onRowSelected?: (item: any) => void;
        onSelectAll?: () => void;
        onAccept?: () => void;
        remoteMethod?: global.HttpMethod;
        remoteUrl?: string;
        required?: boolean;
        selectAll?: boolean;
        setDTConfig?: (ml: any) => dt.IDTConfig;
        slot?: string;
        target?: string;
        entidad?: any; 
    };

    interface IConsultaState {
        id: string;
        slot: string;
    };

    class ConsultaForm extends React.Component<IConsultaProps, IConsultaState> {
        constructor(props: IConsultaProps) {
            super(props);
            this.onButtonClick = this.onButtonClick.bind(this);
            this.onRowSelected = this.onRowSelected.bind(this);
            this.onAccept = this.onAccept.bind(this);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            this.onSearch = this.onSearch.bind(this);
            let id: string = ["dt", new Date().getTime()].join("_");

            let slot: string = props.slot;
            if (!slot) {
                slot = id;
            };

            this.state = { id, slot };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.forms = state.forms;
            retValue.idForm = global.getData(state.global.page).id;
            return retValue;
        };
        componentDidMount(): void {
           if (this.props.target) {
                $("#" + this.props.target).on("click", this.onButtonClick);
            }
        };
        componentWillUnmount(): void {
            Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            $("#" + this.state.id).DataTable().search("").draw();
        };
        onButtonClick(): void {
            console.log('buscar');
            if (this.props.config.state.search !== undefined) {
                this.props.config.state.search = undefined;
                Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            }
            if (this.props.remoteMethod) {
                let f: any = this.props.beforeInvoke ? this.props.beforeInvoke() : global.assign({ activos: 1 });
                let dataSlot: string = this.state.slot;
                console.log(f,dataSlot)
                if (this.props.remoteMethod === HttpMethod.GET) {
                    let encodedFilters: string = global.encodeObject(f);
                    let url: string = [this.props.remoteUrl, "/", encodedFilters].join("");
                    global.dispatchAsync("global-page-data", url, dataSlot);
                    console.log('search1', url)
                }
                if (this.props.remoteMethod === HttpMethod.POST) {
                    global.dispatchAsyncPost("global-page-data", this.props.remoteUrl, f, dataSlot);
                };
            };
            console.log(this.state.id)
            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal();
        };
        onRowSelected(item: any): void {
            if (item === undefined || item === null) {
                return;
            };

            if (this.props.onRowSelected) {
                this.props.onRowSelected(item);
            };
        };
        onAccept(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            //let item: any = ;
            let source: any[] = global.getData(EK.Store.getState().global["catalogo$" + this.state.id]);
            let items: any[] = source.filter((value) => {
                return value._selected === true ;
            });
            if (items && items.length > 0) {
                this.onRowDoubleClick(items[0]); 
            }

        };
        onRowDoubleClick(item: any): void {
            //console.log(item)
            if (item === undefined || item === null) {
                return;
            };

            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = item;
            Forms.updateFormElement(idForm, element);
            console.log(this.props)
            Forms.getFormElement('reporte$fallas', this.props)
            if (this.props.onRowDoubleClick) {
                this.props.onRowDoubleClick(item);
            };

            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal("hide");
        };
        onSearch(filter: string): void {
            //$("#" + this.state.id).DataTable().search(filter).draw();
            console.log(filter)
            global.dispatchSuccessful("load::search", filter);
        };
        onSelectAll(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(idForm, element);

            if (this.props.onSelectAll) {
                this.props.onSelectAll();
            };

            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal("hide");
        };
        onGetData(): DataElement {
            let id: string = this.state.slot;
            let retValue: DataElement;

            if (id) {
                retValue = this.props.config.getCatalogo(id);
            };
            if (!retValue) {
                retValue = global.createSuccessfulStoreObject([]);
            };
            //console.log(retValue)
            if (retValue && retValue.data.length > 0) {
                for (const d of retValue.data) {
                    if (d.ClaveEstatusReporte === 'T' && d.EstatusPartidaValor === 'D') {
                        d.EstatusPartida.Nombre = 'TERMINADO'
                    }
                }
            }
            return retValue;
            
        };
        render(): JSX.Element {
            let $page: any = $ml[this.props.idForm];
            let $table: any = {};

            if ($page && this.props.id) {
                let mlKey: string = this.props.id;
               // console.log(mlKey);
                if ($page.form) {
                    if (this.props.idFormSection && $page.form[this.props.idFormSection] && $page.form[this.props.idFormSection][mlKey]) {
                        $table.consulta = $page.form[this.props.idFormSection][mlKey].consulta;
                    }
                    else if ($page.form[mlKey] && $page.form[mlKey] !== null) {
                        $table.consulta = $page.form[mlKey].consulta;
                    };
                };

                if ($table.consulta === undefined || $table.consulta === null) {
                    let $consultas: any = $ml.consultas;
                    // console.log($consultas)
                    if ($consultas) {
                        $table.consulta = $consultas[mlKey].consulta;
                    };
                };
            };

            let dtConfig: dt.IDTConfig = new dt.DTConfig($table);

            if (this.props.setDTConfig) {
                dtConfig = this.props.setDTConfig($table);
            };

            let data: DataElement = this.onGetData();
            return <span> 
                <modal.Modal id={this.state.id + "__modal"} header={this.props.header}>
                    <UpdateColumn info={data} text="obteniendo información...">
                        <Row>
                            <input.Text id={this.state.id + "__search"} label="Buscar" size={[10, 10, 10, 10]} change={this.onSearch} maxLength={250} required={false} />
                            <Button size={[2, 2, 2, 2]} keyBtn={"btnSPVBuscadorComponenteAceptar"} className="btn btn-md btn-editing" style={{ backgroundColor: '#8ad48c', color: "#FFFFFF", marginTop : "20px" }} icon="fas fa-share-square" onClick={() => this.onAccept()} > Aceptar </Button> 
                            {/* <Button keyBtn={"btnSPVBuscadorComponenteAceptar"} id="btn_aceptar_buscador_componente" onClick={this.onAccept.bind(this)} titulo = "Prueba" />*/}
                            {this.props.selectAll === true ? <Column size={[12, 12, 12, 12]}><buttons.Button id={this.state.id + "__all"} className="btn-primary" color="blue" style={{ marginTop: 10 }} onClick={this.onSelectAll.bind(this)}> Seleccionar todos </buttons.Button></Column> : null}
                            <Column size={[12, 12, 12, 12]} style={{ marginTop: 6 }}>
                                <dt.DataTableExtended id={this.state.id} dtType="list" dtConfig={dtConfig} onGetData={this.onGetData.bind(this)} onRowSelected={this.onRowSelected.bind(this)} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
                            </Column>
                        </Row>
                    </UpdateColumn>
                    
                </modal.Modal>
                {!this.props.target ? <InputResult {...this.props} buttonClick={this.onButtonClick} /> : null}
            </span>
        };
    };

    export let Consulta$Form: any = ReactRedux.connect(ConsultaForm.props, null)(ConsultaForm);

    class ConsultaFormOtrosReportes extends React.Component<IConsultaProps, IConsultaState> {
        constructor(props: IConsultaProps) {
            super(props);
            this.onButtonClick = this.onButtonClick.bind(this);
            this.onRowSelected = this.onRowSelected.bind(this);
            this.onAccept = this.onAccept.bind(this);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            this.onSearch = this.onSearch.bind(this);
            let id: string = ["dt", new Date().getTime()].join("_");

            let slot: string = props.slot;
            if (!slot) {
                slot = id;
            };

            this.state = { id, slot };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.forms = state.forms;
            retValue.idForm = global.getData(state.global.page).id;
            return retValue;
        };
        componentDidMount(): void {
            if (this.props.target) {
                $("#" + this.props.target).on("click", this.onButtonClick);
            }
        };
        componentWillUnmount(): void {
            Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            $("#" + this.state.id).DataTable().search("").draw();
        };
        onButtonClick(): void {
            //console.log('buscar');
            if (this.props.config.state.search !== undefined) {
                this.props.config.state.search = undefined;
                Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            }
            if (this.props.remoteMethod) {
                let f: any = this.props.beforeInvoke ? this.props.beforeInvoke() : global.assign({ activos: 1 });
                let dataSlot: string = this.state.slot;
                //console.log(f, dataSlot)
                if (this.props.remoteMethod === HttpMethod.GET) {
                    let encodedFilters: string = global.encodeObject(f);
                    let url: string = [this.props.remoteUrl, "/", encodedFilters].join("");
                    //global.dispatchAsync("global-page-data", url, dataSlot);
                    let isExporting = false;
                    let columnas = [
                        { dataField: "IdReporte", caption: "Folio", fixed: true, fixedPosition: "left" },
                        { dataField: "IdPrereporte", fixed: true, fixedPosition: "left" },
                        { dataField: "FechaCaptura", caption: "Fecha", aligment: "center", dataType: "datetime", format: "dd/MM/yyyy" },
                        { dataField: "ResponsableConstruccion.Nombre", caption: "Responsable" },
                        {
                            dataField: "Partida", caption: "Incidencia", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                //console.log(cellInfo)
                                if (!isExporting) {
                                    return `<span class="badge badge-info">${cellInfo.value}</span>`;
                                } else {
                                    return `${cellInfo.value}`;
                                }
                            }
                        },
                        {
                            dataField: "Dictamenes", caption: "Diagnosticos", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                //console.log(cellInfo)
                                let items = cellInfo.value;
                                let activos: number = items.filter(x => x.EstatusDictamen.Clave === "I").length;
                                let aprobados: number = items.filter(x => x.EstatusDictamen.Clave === "A").length;
                                let rechazados: number = items.filter(x => x.EstatusDictamen.Clave === "N").length;
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#36c6d3;">${activos}</span>
                                    <span class="badge" style="background:#41c300;">${aprobados}</span>
                                    <span class="badge" style="background:#ed6b75;">${rechazados}</span>`;
                                } else {
                                    formato = `${activos}, ${aprobados}, ${rechazados}`;
                                }

                                return formato;
                            }
                        },
                        { dataField: "TipoFalla.Nombre", caption: "Familia" },
                        { dataField: "Falla.Descripcion", caption: "Componente" },
                        { dataField: "UbicacionFalla.Descripcion", caption: "Ubicacion Incidencia" },
                        { dataField: "Contratista.Descripcion", caption: "Contratista Origen" },
                        { dataField: "ContratistaOT.Descripcion", caption: "Contratista OT" },
                        { dataField: "CausaFalla.Descripcion", caption: "Incidencia" },
                        { dataField: "CausaFalla.FallaOrigen.Descripcion", caption: "Causa Incidencia" },
                        {
                            dataField: "Reincidencias", caption: "Reincidencias", aligment: 'center', encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#f1c40f;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        { dataField: "Observaciones", caption: "Observaciones" },
                        { dataField: "ObservacionesContratista", caption: "Observaciones Contratista" },
                        {
                            dataField: "DiasGarantia", caption: "Garantia (Dias)", aligment: "left", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#41C300;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        { dataField: "TerminoGarantia", caption: "Termino Garantia", dataType: "datetime", format: "dd/MM/yyyy" },
                        { dataField: "FechaCerrado", caption: "Fecha Cerrado", dataType: "datetime", format: "dd/MM/yyyy" },
                        {
                            dataField: "EstatusPartida.Nombre", caption: "Estatus Incidencia", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#36c6d3;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        {
                            dataField: "NombreEstatusReporte", caption: "Estatus Folio", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    switch (cellInfo.value) {
                                        case 'TERMINADO': formato = `<span class="badge" style="background:#41c300;">${cellInfo.value}</span>`;
                                            break;
                                        default: formato = `<span class="badge badge-info"">${cellInfo.value}</span>`;
                                            break;
                                    }
                                } else {
                                    formato = cellInfo.value;
                                }

                                return formato;
                            }
                        }
                    ];
                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');

                    global.asyncGet(url, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                console.log(data)
                                loader.style.display = 'none';
                                loadedTable.style.display = 'inherit';
                                let fecha = Date.now();
                                let dataGrid = $("#datagroupOtrosRepContainer").dxDataGrid({
                                    dataSource: data,
                                    allowColumnReordering: true,
                                    scrolling: {
                                        columnRenderingMode: "virtual"
                                    },
                                    columnAutoWidth: true,
                                    showBorders: false,
                                    grouping: {
                                        autoExpandAll: false,
                                    },
                                    searchPanel: {
                                        visible: true
                                    },
                                    export: {
                                        enabled: true,
                                        fileName: "Otros_Reporte_Fallas_Cliente" + fecha,
                                        allowExportSelectedData: false
                                    },
                                    onRowDblClick: (e) => {
                                        // console.log(e)
                                        this.onRowDoubleClick(e.data);
                                    },
                                    onExporting: function (e) {
                                        console.log(e)
                                        isExporting = true;
                                    },
                                    onExported: function (e) {
                                        isExporting = false;
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
                                        visible: false
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
                                loadedTable.style.display = 'none';
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';
                                break;
                        }
                    });

                    //console.log('search1', url)
                }
                if (this.props.remoteMethod === HttpMethod.POST) {
                    global.dispatchAsyncPost("global-page-data", this.props.remoteUrl, f, dataSlot);
                };
            };
            console.log(this.state.id)
            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal();
        };
        onReloadData(): void {
            //console.log('buscar');
            if (this.props.config.state.search !== undefined) {
                this.props.config.state.search = undefined;
                Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            }
            if (this.props.remoteMethod) {
                let f: any = this.props.beforeInvoke ? this.props.beforeInvoke() : global.assign({ activos: 1 });
                let dataSlot: string = this.state.slot;
                //console.log(f, dataSlot)
                if (this.props.remoteMethod === HttpMethod.GET) {
                    let encodedFilters: string = global.encodeObject(f);
                    let url: string = [this.props.remoteUrl, "/", encodedFilters].join("");
                    //global.dispatchAsync("global-page-data", url, dataSlot);
                    let isExporting = false;
                    let columnas = [
                        { dataField: "IdReporte", caption: "Folio", fixed: true, fixedPosition: "left" },
                        { dataField: "IdPrereporte", fixed: true, fixedPosition: "left" },
                        { dataField: "FechaCaptura", caption: "Fecha", aligment: "center", dataType: "datetime", format: "dd/MM/yyyy" },
                        { dataField: "ResponsableConstruccion.Nombre", caption: "Responsable" },
                        {
                            dataField: "Partida", caption: "Incidencia", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                //console.log(cellInfo)
                                if (!isExporting) {
                                    return `<span class="badge badge-info">${cellInfo.value}</span>`;
                                } else {
                                    return `${cellInfo.value}`;
                                }
                            }
                        },
                        {
                            dataField: "Dictamenes", caption: "Diagnosticos", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                //console.log(cellInfo)
                                let items = cellInfo.value;
                                let activos: number = items.filter(x => x.EstatusDictamen.Clave === "I").length;
                                let aprobados: number = items.filter(x => x.EstatusDictamen.Clave === "A").length;
                                let rechazados: number = items.filter(x => x.EstatusDictamen.Clave === "N").length;
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#36c6d3;">${activos}</span>
                                    <span class="badge" style="background:#41c300;">${aprobados}</span>
                                    <span class="badge" style="background:#ed6b75;">${rechazados}</span>`;
                                } else {
                                    formato = `${activos}, ${aprobados}, ${rechazados}`;
                                }

                                return formato;
                            }
                        },
                        { dataField: "TipoFalla.Nombre", caption: "Familia" },
                        { dataField: "Falla.Descripcion", caption: "Componente" },
                        { dataField: "UbicacionFalla.Descripcion", caption: "Ubicacion Incidencia" },
                        { dataField: "Contratista.Descripcion", caption: "Contratista Origen" },
                        { dataField: "ContratistaOT.Descripcion", caption: "Contratista OT" },
                        { dataField: "CausaFalla.Descripcion", caption: "Incidencia" },
                        { dataField: "CausaFalla.FallaOrigen.Descripcion", caption: "Causa Incidencia" },
                        {
                            dataField: "Reincidencias", caption: "Reincidencias", aligment: 'center', encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#f1c40f;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        { dataField: "Observaciones", caption: "Observaciones" },
                        { dataField: "ObservacionesContratista", caption: "Observaciones Contratista" },
                        {
                            dataField: "DiasGarantia", caption: "Garantia (Dias)", aligment: "left", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#41C300;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        { dataField: "TerminoGarantia", caption: "Termino Garantia", dataType: "datetime", format: "dd/MM/yyyy" },
                        { dataField: "FechaCerrado", caption: "Fecha Cerrado", dataType: "datetime", format: "dd/MM/yyyy" },
                        {
                            dataField: "EstatusPartida.Nombre", caption: "Estatus Incidencia", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#36c6d3;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        {
                            dataField: "NombreEstatusReporte", caption: "Estatus Folio", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    switch (cellInfo.value) {
                                        case 'TERMINADO': formato = `<span class="badge" style="background:#41c300;">${cellInfo.value}</span>`;
                                            break;
                                        default: formato = `<span class="badge badge-info"">${cellInfo.value}</span>`;
                                            break;
                                    }
                                } else {
                                    formato = cellInfo.value;
                                }

                                return formato;
                            }
                        }
                    ];
                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');

                    global.asyncGet(url, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                console.log(data)
                                loader.style.display = 'none';
                                loadedTable.style.display = 'inherit';
                                let fecha = Date.now();
                                let dataGrid = $("#datagroupOtrosRepContainer").dxDataGrid({
                                    dataSource: data,
                                    allowColumnReordering: true,
                                    scrolling: {
                                        columnRenderingMode: "virtual"
                                    },
                                    columnAutoWidth: true,
                                    showBorders: false,
                                    grouping: {
                                        autoExpandAll: false,
                                    },
                                    searchPanel: {
                                        visible: true
                                    },
                                    export: {
                                        enabled: true,
                                        fileName: "Otros_Reporte_Fallas_Cliente" + fecha,
                                        allowExportSelectedData: false
                                    },
                                    onRowDblClick: (e) => {
                                        // console.log(e)
                                        this.onRowDoubleClick(e.data);
                                    },
                                    onExporting: function (e) {
                                        console.log(e)
                                        isExporting = true;
                                    },
                                    onExported: function (e) {
                                        isExporting = false;
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
                                        visible: false
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
                                loadedTable.style.display = 'none';
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';
                                break;
                        }
                    });

                    //console.log('search1', url)
                }
            };
            console.log(this.state.id)
        };
        onRowSelected(item: any): void {
            if (item === undefined || item === null) {
                return;
            };

            if (this.props.onRowSelected) {
                this.props.onRowSelected(item);
            };
        };
        onAccept(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            //let item: any = ;
            let source: any[] = global.getData(EK.Store.getState().global["catalogo$" + this.state.id]);
            let items: any[] = source.filter((value) => {
                return value._selected === true;
            });
            if (items && items.length > 0) {
                this.onRowDoubleClick(items[0]);
            }

        };
        onRowDoubleClick(item: any): void {
            //console.log(item)
            if (item === undefined || item === null) {
                return;
            };

            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = item;
            Forms.updateFormElement(idForm, element);
            console.log(this.props)
            Forms.getFormElement('reporte$fallas', this.props)
            if (this.props.onRowDoubleClick) {
                this.props.onRowDoubleClick(item);
            };

            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal("hide");
        };
        onSearch(filter: string): void {
            //$("#" + this.state.id).DataTable().search(filter).draw();
            console.log(filter)
            global.dispatchSuccessful("load::search", filter);
        };
        onSelectAll(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(idForm, element);

            if (this.props.onSelectAll) {
                this.props.onSelectAll();
            };

            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal("hide");
        };
        onGetData(): DataElement {
            let id: string = this.state.slot;
            let retValue: DataElement;

            if (id) {
                retValue = this.props.config.getCatalogo(id);
            };
            if (!retValue) {
                retValue = global.createSuccessfulStoreObject([]);
            };
            //console.log(retValue)
            if (retValue && retValue.data.length > 0) {
                for (const d of retValue.data) {
                    if (d.ClaveEstatusReporte === 'T' && d.EstatusPartidaValor === 'D') {
                        d.EstatusPartida.Nombre = 'TERMINADO'
                    }
                }
            }
            return retValue;

        };
        render(): JSX.Element {
            let $page: any = $ml[this.props.idForm];
            let $table: any = {};

            if ($page && this.props.id) {
                let mlKey: string = this.props.id;

                if ($page.form) {
                    if (this.props.idFormSection && $page.form[this.props.idFormSection] && $page.form[this.props.idFormSection][mlKey]) {
                        $table.consulta = $page.form[this.props.idFormSection][mlKey].consulta;
                    }
                    else if ($page.form[mlKey] && $page.form[mlKey] !== null) {
                        $table.consulta = $page.form[mlKey].consulta;
                    };
                };

                if ($table.consulta === undefined || $table.consulta === null) {
                    let $consultas: any = $ml.consultas;
                    if ($consultas) {
                        $table.consulta = $consultas[mlKey].consulta;
                    };
                };
            };

            let dtConfig: dt.IDTConfig = new dt.DTConfig($table);

            if (this.props.setDTConfig) {
                dtConfig = this.props.setDTConfig($table);
            };

            let data: DataElement = this.onGetData();
            return <span>
                <modal.Modal id={"OtrosReportesModal"} header={this.props.header}>
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>

                    <div id="loadedData" style={{ display: 'inherit' }}>
                        <Row>
                            {/*<Column size={[12, 12, 2, 2]} style={{ paddingTop: 10 }}>
                                <button className="btn btn-default-exp-ek custom-btn-expediente"
                                    onClick={() => this.onButtonClick()}> Recargar</button>
                            </Column>*/}
                        </Row>
                        <div id="datagroupOtrosRepContainer" style={{ padding: '10px', background: '#fff' }}></div>
                    </div>
                </modal.Modal>
                {!this.props.target ? <InputResult {...this.props} buttonClick={this.onButtonClick} /> : null}
            </span>
        };
    };

    export let Consulta$FormOtroRep: any = ReactRedux.connect(ConsultaFormOtrosReportes.props, null)(ConsultaFormOtrosReportes);

    class ConsultaFormV2 extends React.Component<IConsultaProps, IConsultaState> {
        constructor(props: IConsultaProps) {
            super(props);
            this.onButtonClick = this.onButtonClick.bind(this);
            this.onRowSelected = this.onRowSelected.bind(this);
            this.onAccept = this.onAccept.bind(this);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            this.onSearch = this.onSearch.bind(this);
            let id: string = ["dt", new Date().getTime()].join("_");

            let slot: string = props.slot;
            if (!slot) {
                slot = id;
            };

            this.state = { id, slot };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.forms = state.forms;
            retValue.idForm = global.getData(state.global.page).id;
            return retValue;
        };
        componentDidMount(): void {
            if (this.props.target) {
                $("#" + this.props.target).on("click", this.onButtonClick);
            }
        };
        componentWillUnmount(): void {
            Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            $("#" + this.state.id).DataTable().search("").draw();
        };
        onButtonClick(): void {
            //console.log('buscar');
            if (this.props.config.state.search !== undefined) {
                this.props.config.state.search = undefined;
                Forms.updateFormElement(this.props.idForm, this.state.id + "__search", undefined);
            }
            if (this.props.remoteMethod) {
                let f: any = this.props.beforeInvoke ? this.props.beforeInvoke() : global.assign({ activos: 1 });
                let dataSlot: string = this.state.slot;
                //console.log(f, dataSlot)
                if (this.props.remoteMethod === HttpMethod.GET) {
                    let encodedFilters: string = global.encodeObject(f);
                    let url: string = [this.props.remoteUrl, "/", encodedFilters].join("");
                    //global.dispatchAsync("global-page-data", url, dataSlot);
                    let isExporting = false;
                    let columnas = [
                        { dataField: "IdReporte", caption: "Folio", fixed: true, fixedPosition: "left"},
                        { dataField: "IdPrereporte", fixed: true, fixedPosition: "left"},
                        { dataField: "FechaCaptura", caption: "Fecha", aligment: "center", dataType: "datetime", format: "dd/MM/yyyy" },
                        { dataField: "ResponsableConstruccion.Nombre", caption: "Responsable" },
                        {
                            dataField: "Partida", caption: "Incidencia", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                //console.log(cellInfo)
                                if (!isExporting) {
                                    return `<span class="badge badge-info">${cellInfo.value}</span>`;
                                } else {
                                    return `${cellInfo.value}`;
                                }
                            }
                        },
                        {
                            dataField: "Dictamenes", caption: "Diagnosticos", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                //console.log(cellInfo)
                                let items = cellInfo.value;
                                let activos: number = items.filter(x => x.EstatusDictamen.Clave === "I").length;
                                let aprobados: number = items.filter(x => x.EstatusDictamen.Clave === "A").length;
                                let rechazados: number = items.filter(x => x.EstatusDictamen.Clave === "N").length;
                                let formato = ''; 
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#36c6d3;">${activos}</span>
                                    <span class="badge" style="background:#41c300;">${aprobados}</span>
                                    <span class="badge" style="background:#ed6b75;">${rechazados}</span>`;
                                } else {
                                    formato = `${activos}, ${aprobados}, ${rechazados}`;
                                }
                               
                                return formato;
                            }},
                        { dataField: "TipoFalla.Nombre", caption: "Familia"},
                        { dataField: "Falla.Descripcion", caption: "Componente" },
                        { dataField: "UbicacionFalla.Descripcion", caption: "Ubicacion Incidencia" },
                        { dataField: "Contratista.Descripcion", caption: "Contratista Origen"},
                        { dataField: "ContratistaOT.Descripcion", caption: "Contratista OT"},
                        { dataField: "CausaFalla.Descripcion", caption: "Incidencia"},
                        { dataField: "CausaFalla.FallaOrigen.Descripcion", caption: "Causa Incidencia"},
                        {
                            dataField: "Reincidencias", caption: "Reincidencias",aligment:'center', encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#f1c40f;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        { dataField: "Observaciones", caption: "Observaciones"},
                        { dataField: "ObservacionesContratista", caption: "Observaciones Contratista" },
                        {
                            dataField: "DiasGarantia", caption: "Garantia (Dias)", aligment: "left", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    formato = `<span class="badge" style="background:#41C300;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        { dataField: "TerminoGarantia", caption: "Termino Garantia", dataType: "datetime", format: "dd/MM/yyyy" },
                        { dataField: "FechaCerrado", caption: "Fecha Cerrado", dataType: "datetime", format: "dd/MM/yyyy"},
                        {
                            dataField: "EstatusPartida.Nombre", caption: "Estatus Incidencia", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                     formato = `<span class="badge" style="background:#36c6d3;">${cellInfo.value}</span>`;
                                } else {
                                    formato = cellInfo.value;
                                }
                                return formato;
                            }
                        },
                        {
                            dataField: "NombreEstatusReporte", caption: "Estatus Folio", encodeHtml: false,
                            customizeText: (cellInfo) => {
                                let formato = '';
                                if (!isExporting) {
                                    switch (cellInfo.value) {
                                        case 'TERMINADO': formato = `<span class="badge" style="background:#41c300;">${cellInfo.value}</span>`;
                                            break;
                                        default: formato = `<span class="badge badge-info"">${cellInfo.value}</span>`;
                                            break;
                                    }
                                } else {
                                    formato = cellInfo.value;
                                }
                              
                                return formato;
                            }
                        }
                    ];
                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');
                    
                    global.asyncGet(url,  (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                console.log(data)
                                loader.style.display = 'none';
                                loadedTable.style.display = 'inherit';
                                let fecha = Date.now();
                                let dataGrid = $("#datagroupOtrosRepContainer").dxDataGrid({
                                    dataSource: data,
                                    allowColumnReordering: true,
                                    scrolling: {
                                        columnRenderingMode: "virtual"
                                    },
                                    columnAutoWidth: true,
                                    showBorders: false,
                                    grouping: {
                                        autoExpandAll: false,
                                    },
                                    searchPanel: {
                                        visible: true
                                    },
                                    export: {
                                        enabled: true,
                                        fileName: "Otros_Reporte_Fallas_Cliente" + fecha,
                                        allowExportSelectedData: false
                                    },
                                    onRowDblClick: (e) => {
                                       // console.log(e)
                                        this.onRowDoubleClick(e.data);
                                    },
                                    onExporting: function (e) {
                                        console.log(e)
                                        isExporting = true;
                                    },
                                    onExported: function (e) {
                                        isExporting = false;
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
                                        visible: false
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
                                loadedTable.style.display = 'none';
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';
                                break;
                        }
                    });
                
                    //console.log('search1', url)
                }
                if (this.props.remoteMethod === HttpMethod.POST) {
                    global.dispatchAsyncPost("global-page-data", this.props.remoteUrl, f, dataSlot);
                };
            };
            console.log(this.state.id)
            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal();
        };
        onRowSelected(item: any): void {
            if (item === undefined || item === null) {
                return;
            };

            if (this.props.onRowSelected) {
                this.props.onRowSelected(item);
            };
        };
        onAccept(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            //let item: any = ;
            let source: any[] = global.getData(EK.Store.getState().global["catalogo$" + this.state.id]);
            let items: any[] = source.filter((value) => {
                return value._selected === true;
            });
            if (items && items.length > 0) {
                this.onRowDoubleClick(items[0]);
            }

        };
        onRowDoubleClick(item: any): void {
            //console.log(item)
            if (item === undefined || item === null) {
                return;
            };

            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = item;
            Forms.updateFormElement(idForm, element);
            console.log(this.props)
            Forms.getFormElement('reporte$fallas', this.props)
            if (this.props.onRowDoubleClick) {
                this.props.onRowDoubleClick(item);
            };

            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal("hide");
        };
        onSearch(filter: string): void {
            //$("#" + this.state.id).DataTable().search(filter).draw();
            console.log(filter)
            global.dispatchSuccessful("load::search", filter);
        };
        onSelectAll(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
            Forms.updateFormElement(idForm, element);

            if (this.props.onSelectAll) {
                this.props.onSelectAll();
            };

            let modalQuery: any = $("#" + this.state.id + "__modal");
            modalQuery.modal("hide");
        };
        onGetData(): DataElement {
            let id: string = this.state.slot;
            let retValue: DataElement;

            if (id) {
                retValue = this.props.config.getCatalogo(id);
            };
            if (!retValue) {
                retValue = global.createSuccessfulStoreObject([]);
            };
            //console.log(retValue)
            if (retValue && retValue.data.length > 0) {
                for (const d of retValue.data) {
                    if (d.ClaveEstatusReporte === 'T' && d.EstatusPartidaValor === 'D') {
                        d.EstatusPartida.Nombre = 'TERMINADO'
                    }
                }
            }
            return retValue;

        };
        render(): JSX.Element {
            let $page: any = $ml[this.props.idForm];
            let $table: any = {};

            if ($page && this.props.id) {
                let mlKey: string = this.props.id;

                if ($page.form) {
                    if (this.props.idFormSection && $page.form[this.props.idFormSection] && $page.form[this.props.idFormSection][mlKey]) {
                        $table.consulta = $page.form[this.props.idFormSection][mlKey].consulta;
                    }
                    else if ($page.form[mlKey] && $page.form[mlKey] !== null) {
                        $table.consulta = $page.form[mlKey].consulta;
                    };
                };

                if ($table.consulta === undefined || $table.consulta === null) {
                    let $consultas: any = $ml.consultas;
                    if ($consultas) {
                        $table.consulta = $consultas[mlKey].consulta;
                    };
                };
            };

            let dtConfig: dt.IDTConfig = new dt.DTConfig($table);

            if (this.props.setDTConfig) {
                dtConfig = this.props.setDTConfig($table);
            };

            let data: DataElement = this.onGetData();
            return <span>
                <modal.Modal id={this.state.id + "__modal"} header={this.props.header}>
                   
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>

                    <div id="loadedData" style={{ display: 'inherit' }}>
                        <div id="datagroupOtrosRepContainer" style={{ padding: '10px', background: '#fff' }}></div>
                    </div>
                </modal.Modal>
                {!this.props.target ? <InputResult {...this.props} buttonClick={this.onButtonClick} /> : null}
            </span>
        };
    };

    export let Consulta$FormV2: any = ReactRedux.connect(ConsultaFormV2.props, null)(ConsultaFormV2);


    interface ISPVContratistasConsultaProps extends consultas.IConsultaProps {
        plaza?: DataElement;
    };

    class SPVContratistas$Consulta extends React.Component<ISPVContratistasConsultaProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state)
            return retValue;
        };
        static defaultProps: ISPVContratistasConsultaProps = {
            id: "Contratista",
            remoteUrl: "base/scv/Contratistas/all",
            remoteMethod: HttpMethod.GET,
            label: "Contratista",
            helpLabel: "Seleccione un contratista",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'>",
                    item.ID === -2 ? item.Nombre : item.ID,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.ID === -2 ? "" : item.Descripcion,
                    "</span>"
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "Ciudad", width: "200px" })
                    .add({ data: "Direccion", width: "200px" })
                    .add({ data: "TipoContrato.Nombre", width: "200px" })
                    .toArray();

                return dtConfig;
            }
        };
        componentWillReceiveProps(nextProps: ISPVContratistasConsultaProps, {}): void {
            if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                if (global.isSuccessful(nextProps.plaza)) {
                    let idForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;
                    let item: any = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
                    Forms.updateFormElement(idForm, "Contratista", item);
                };
            };
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idPlaza: number;
                if (global.isSuccessful(this.props.plaza)) {
                    idPlaza = global.getDataID(this.props.plaza);
                    idPlaza = idPlaza === -2 ? null : idPlaza;
                };
                return { idPlaza };
            };

            return <Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    export let SPVContratistasConsulta: any =
        ReactRedux.connect(SPVContratistas$Consulta.props, null)(SPVContratistas$Consulta);

    export class SPVTiposComponentesConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "TipoFalla",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/TiposComponentes/all",
            label: "Familia",
            helpLabel: "Seleccione una familia",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'>",
                    item.ID === -2 ? item.Nombre : item.ID,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.ID === -2 ? "" : item.Nombre,
                    "</span>"
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "Clave", width: "100px" })
                    .add({ data: "Nombre", width: "300px" })
                    .add({ data: "DuracionGarantia", width: "100px" })
                    .toArray();

                return dtConfig;
            }
        };
        onSelectAll(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let falla: any = global.assign({ ID: -2, IdFalla: -2, Clave: "-2", Nombre: "TODOS", Descripcion: "TODOS" });
            Forms.updateFormElement(idForm, "Falla", falla);
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let falla: any = global.assign({ ID: -2, IdFalla: -2, Clave: "-2", Nombre: "TODOS", Descripcion: "TODOS" });
            //console.log(falla);
            Forms.updateFormElement(idForm, "Falla", falla);
        };
        render(): JSX.Element {
            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick.bind(this)} onSelectAll={this.onSelectAll.bind(this)} />
        };
    };

    interface ISPVComponentesConsultaProps extends consultas.IConsultaProps {
        tipoFalla?: DataElement;
    };

    export const SPVComponentesConsulta: any = global.connect(class extends React.Component<ISPVComponentesConsultaProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoFalla = Forms.getDataValue("TipoFalla", [retValue.config.id, "$filters"].join(""), state)
            return retValue;
        };
        static defaultProps: ISPVComponentesConsultaProps = {
            id: "Falla",
            remoteUrl: "base/scv/Fallas/all",
            remoteMethod: HttpMethod.GET,
            label: "Componente",
            helpLabel: "Seleccione un componente",
            value: undefined,
            initialValue: undefined,
            tipoFalla: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'>",
                    item.ID === -2 ? item.Nombre : item.ID,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.ID === -2 ? "" : item.Descripcion,
                    "</span>"
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdFalla", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "ImpactoFalla.Nombre", width: "100px" })
                    .add({ data: "TipoFalla.Clave", width: "100px" })
                    .add({ data: "TipoFalla.Nombre", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idTipoFalla: number;
                if (global.isSuccessful(this.props.tipoFalla)) {
                    idTipoFalla = global.getDataID(this.props.tipoFalla);
                    idTipoFalla = idTipoFalla === -2 ? null : idTipoFalla;
                };
                return { idTipoFalla, OperacionEspecificaSP: "GET_DISTINCT_COMPONENTES", activos: 1 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    });

    export const SPVComponentesConsultaV2: any = global.connect(class extends React.Component<ISPVComponentesConsultaProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoFalla = Forms.getDataValue("TipoFalla", [retValue.config.id, "$filters"].join(""), state)
            return retValue;
        };
        static defaultProps: ISPVComponentesConsultaProps = {
            id: "Falla",
            remoteUrl: "base/scv/Fallas/all",
            remoteMethod: HttpMethod.GET,
            label: "Componente",
            helpLabel: "Seleccione un componente",
            value: undefined,
            initialValue: undefined,
            tipoFalla: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'>",
                    item.ID === -2 ? item.Nombre : item.ID,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.ID === -2 ? "" : item.Descripcion,
                    "</span>"
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdFalla", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "ImpactoFalla.Nombre", width: "100px" })
                    .add({ data: "TipoFalla.Clave", width: "100px" })
                    .add({ data: "TipoFalla.Nombre", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idTipoFalla: number;
                if (global.isSuccessful(this.props.tipoFalla)) {
                    idTipoFalla = global.getDataID(this.props.tipoFalla);
                    idTipoFalla = idTipoFalla === -2 ? null : idTipoFalla;
                };
                return { idTipoFalla, OperacionEspecificaSP: "GET_DISTINCT_COMPONENTES", activos: 1 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    });

    export class SPVUbicacionConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "CausaFalla",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/CausasFallas/all",
            label: "Incidencia",
            helpLabel: "Seleccione una incidencia",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'>",
                    item.ID === -2 ? item.Nombre : item.IdCausaFalla,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.ID === -2 ? "" : item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCausaFalla", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "Abreviatura", width: "100px" })
                    .add({ data: "FallaOrigen.Clave", width: "100px" })
                    .add({ data: "FallaOrigen.Descripcion", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { activos: 0 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    export class SPVCausasFallasConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "CausaFalla",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/CausasFallas/all",
            label: "Incidencia",
            helpLabel: "Seleccione una incidencia",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'>",
                    item.ID === -2 ? item.Nombre : item.IdCausaFalla,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.ID === -2 ? "" : item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCausaFalla", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "Abreviatura", width: "100px" })
                    .add({ data: "FallaOrigen.Clave", width: "100px" })
                    .add({ data: "FallaOrigen.Descripcion", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { activos: 0 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    export class SPVFallasOrigenConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "FallaOrigen",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/CausasFallas/all",
            label: "Causa",
            helpLabel: "Seleccione una causa de la falla",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.FallaOrigen.Clave,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.FallaOrigen.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCausaFalla", width: "100px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "FallaOrigen.Clave", width: "100px" })
                    .add({ data: "FallaOrigen.Descripcion", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { activos: 0 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };
};

import consultas = EK.UX.Consultas;
import Consulta = EK.UX.Consultas.Consulta$Form;
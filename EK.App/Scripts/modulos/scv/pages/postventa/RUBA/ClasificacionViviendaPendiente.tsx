namespace EK.Modules.SCV.Pages.postventa.RUBA.ClasificacionViviendaPendienteEntrega {
    const PAGE_ID: string = "ClasificacionViviendaPen";
    const PAGE_PENDIENTE_RESULT_ID: string = "ClasificacionViviendaPenResult";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const DevExpress: any;

    export class Vista extends page.Base {
        
        componentDidMount(): void {
            config.setState({ viewMode: false });
            global.dispatchSuccessful("global-page-data", global.createSuccessfulStoreObject([]), PAGE_PENDIENTE_RESULT_ID);
            global.dispatchSuccessful(`load::LoadSave`, null);
            dispatchSuccessful('load::itemCheck', null)
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                <Filtros />
                <ResultView />
            </page.Main>;
        };
    }
    interface IClasificacionViviendaPendienteEntrega extends page.IProps {
        plaza?: any;
        item?: any;
        load?: any;
        modeMasive?: any;
    };
    let setColumns = () => {
        let UrlAplicacion: any = window.location;
        let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'Departamento' : 'Núm Interior';
        let columns: any;
        columns = UrlAplicacion.pathname.includes("intra") ? [

            { caption: "No. Cliente", dataField: "IdCliente", alignment: 'left' },
            { caption: "Nombre", dataField: "Nombre" },
            { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
            { caption: "Edificio", dataField: "edificio" },
            { caption: "Nivel", dataField: "nivel" },
            { caption: labelInterior, dataField: "NumInterior" },
            { caption: "Dirección", dataField: "Direccion" },
            { caption: "Núm Exterior", dataField: "NumExterior" },
            { caption: "Días Firma", dataField: "Dias" },
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
            { caption: "Comentarios", dataField: "Comentarios" }
        ] : [{ caption: "No. Cliente", dataField: "IdCliente", alignment: 'left' },
                { caption: "Nombre", dataField: "Nombre" },
                { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                { caption: "Etapa", dataField: "Etapa" },
                { caption: "Manzana", dataField: "Manzana" },
                { caption: "Lote", dataField: "Lote" },
                { caption: labelInterior, dataField: "NumInterior" },
                { caption: "Dirección", dataField: "Direccion" },
                { caption: "Núm Exterior", dataField: "NumExterior" },
                { caption: "Días Firma", dataField: "Dias" },
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
                { caption: "Comentarios", dataField: "Comentarios" }];

        //if (UrlAplicacion.pathname.includes("intra")) {
        //    columns.splice(3, 1).splice(4, 1).splice(5, 1);
        //    columns.splice(3, 0, { caption: "Edificio", dataField: "edificio" }, { caption: "Nivel", dataField: "nivel" })
        //}

        return columns;
    }
    let Filtros: any = global.connect(class extends React.Component<IClasificacionViviendaPendienteEntrega, {}> {
        constructor(props: IClasificacionViviendaPendienteEntrega) {
            super(props);
            this.onSelectClasificacionViviendaPendiente = this.onSelectClasificacionViviendaPendiente.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            retValue.item = state.global.itemCheck;
            retValue.load = state.global.LoadSave;
            retValue.data = state.global.catalogo$ClasificacionViviendaPenResult;
            retValue.modeMasive = state.global.modeMasive;
            return retValue;
        };


        componentWillReceiveProps(nextProps: IClasificacionViviendaPendienteEntrega, nextState: IClasificacionViviendaPendienteEntrega): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
            if (hasChanged(this.props.load, nextProps.load) && global.isSuccessful(nextProps.load)) {
                let entity: DataElement = this.props.data;
                let data = getData(nextProps.load)
                if (Object.keys(data).length !== 0) {
                    this.onSelectClasificacionViviendaPendiente();
                }

            }
        };

        onSelectClasificacionViviendaPendiente(): void {
            let model: any = Forms.getForm(PAGE_ID);
            console.log(model)
            let plaza: any = model.PlazaInicial.ID;
            let fechaInicial: any = model.FechaInicial;
            let fechaFinal: any = model.FechaFinal;
            let fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let vocaciones: any = model.Vocaciones.ID;
            let sendData: any;
            const columns = setColumns();
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            let p;
            let Cliente = model.Cliente;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'

            if (Cliente != undefined) {
                Cliente = model.Cliente.ID
                p = global.assign({
                    PLAZA: plaza,
                    CLIENTE: Cliente
                });
            } else {
                p = global.assign({
                    PLAZA: plaza,
                    FECHAINICIAL: fechaInicial,
                    FECHAFINAL: fechaFinal,
                    FRACCIONAMIENTO: fraccionamiento,
                    VOCACIONES: vocaciones,
                    SEGMENTO: segmento
                });
                if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                    return global.warning("Favor de seleccionar un fraccionamiento.")
                }
            }
            global.asyncPost("base/kontrol/ClasificacionViviendaPen/GetBP/GetViviendaPendienteEntrega/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_PENDIENTE_RESULT_ID)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            onCellPrepared: (e) => {
                                if (e.rowType === "data" && e.column.dataField === "FechaProgramacion") {
                                    e.cellElement.css("background", e.data.FechaProgramacion === null || e.data.FechaProgramacion === "" ? "#F5F5F5" : "fff");
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
                            rowAlternationEnabled: false,
                            selection: {
                                mode: "multiple",
                                allowSelectAll: false,
                                showCheckBoxesMode: 'always'
                            },
                            onCellClick: function (e) {
                                if (e.column.caption === "Clasificar") {
                                    Forms.reset("ClasificacionViviendaPenModal")
                                    let clasificador = getData(EK.Store.getState().global.SPVCLASIFICADORVIVIENDAPENDIENTEENTREGA);
                                    let result = clasificador.find(x => x.Clave === e.data.ClaveClasificador)
                                    Forms.updateFormElement("ClasificacionViviendaPenModal", "ClasificadorVivienda", result)
                                    dispatchSuccessful("load::itemCheck", e.data);
                                    let modalObject: any = $("#modalClasificacionCheck");
                                    modalObject.modal();
                                    modalObject.css("height", "auto");
                                }
                            },
                            onSelectionChanged: function (e) { // Handler of the "selectionChanged" event
                                dispatchSuccessful("load::modeMasive", { enable: true });
                                let allSelectedRowsData = e.selectedRowsData;
                                dispatchSuccessful("load::itemCheck", allSelectedRowsData);
                                console.log(allSelectedRowsData)
                                if (allSelectedRowsData.length === 0) {
                                    dispatchSuccessful("load::modeMasive", { enable: false });
                                    dispatchSuccessful("load::itemCheck", allSelectedRowsData);
                                }
                                // ...
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
        };
     
        render(): JSX.Element {
            
            let className: string = "btn-editing";
            let color: string = "white";

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Clasificación Vivienda Pendiente de Entrega "}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectClasificacionViviendaPendiente} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>

                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                        {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}
                        <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <select.ClientesLotesSPV key={"Cliente"} label="Cliente" idForm={PAGE_ID} size={[12, 12, 6, 6]} required={true} />

                    </Column>

                </page.OptionSection>
            </Column>;
        }
    });


    let ResultView: any = global.connect(class extends React.Component<IClasificacionViviendaPendienteEntrega, {}> {
        constructor(props: IClasificacionViviendaPendienteEntrega) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.item = state.global.itemCheck;
            retValue.modeMasive = EK.Store.getState().global.modeMasive
            return retValue;
        };
        static defaultProps: IClasificacionViviendaPendienteEntrega = {
            data: createSuccessfulStoreObject([]),
        };

        componentWillReceiveProps(nextProps: IClasificacionViviendaPendienteEntrega, nextState: IClasificacionViviendaPendienteEntrega): void {
            
           
        };
        ClasificacionMasiva(): void {
            Forms.reset("ClasificacionViviendaPenModal")
            let modalObject: any = $("#modalClasificacionCheck");
            let columns = [
                { caption: "No. Cliente", dataField: "IdCliente", alignment: 'left' },
                { caption: "Nombre", dataField: "Nombre" },
                { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                { caption: "Días Firma", dataField: "Dias" },
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
            ]
            let items = getData(EK.Store.getState().global.itemCheck)
            let dataGrid = $("#datagroupContainer2").dxDataGrid({
                dataSource: items,
                onCellPrepared: (e) => {
                    if (e.rowType === "data" && e.column.dataField === "FechaProgramacion") {
                        e.cellElement.css("background", e.data.FechaProgramacion === null || e.data.FechaProgramacion === "" ? "#F5F5F5" : "fff");
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
                rowAlternationEnabled: false,
                selection: {
                    mode: "single",
                },
            }).dxDataGrid("instance");
            modalObject.modal({ backdrop: 'static', keyboard: false });
            modalObject.css("height", "auto");
        }
        render(): JSX.Element {
            let modeMasive;
            if (isSuccessful(this.props.modeMasive)) {
                modeMasive = this.props.modeMasive.data.enable;
            }
            return <div ><Column size={[12, 12, 12, 12]}>
                <ClasificacionCheckModal item={this.props.item} />

                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    {
                        modeMasive ?
                            <Button icon="fas fa-check" id="btnId3" className={"btn btn-primary"} size={[12, 12, 1, 1]} style={{ marginTop: '20px' }} onClick={this.ClasificacionMasiva}> Clasificar</Button>
                        :null    
                    }

                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>

            </Column></div>
        }
    });



}
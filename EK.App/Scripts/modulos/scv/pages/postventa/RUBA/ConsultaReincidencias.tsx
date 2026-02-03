namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaReincidencias {
    const PAGE_ID: string = "ConsultaReincidencias";
    const PAGE_PENDIENTE_RESULT_ID: string = "ConsultaReincidenciasResult";

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
    interface IConsultaReincidencias extends page.IProps {
        plaza?: any;
        load?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaReincidencias, {}> {
        constructor(props: IConsultaReincidencias) {
            super(props);
            this.onSelectClasificacionReincidencia = this.onSelectClasificacionReincidencia.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IConsultaReincidencias, nextState: IConsultaReincidencias): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        componentDidMount(): void {
            Forms.updateFormElement([PAGE_ID].join(""), "EstatusFolio", { ID: -2, Clave: "Todos", Nombre: "TODOS" });
            Forms.updateFormElement([PAGE_ID].join(""), "TopCinco", false);
        };
        onSelectTopCinco(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            if (params.FRACCIONAMIENTO === "" || params.FRACCIONAMIENTO === null || params.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            const columns = [

                { caption: "#Reincidencias", dataField: "topcinco", alignment: 'center' },
                { caption: "Clave Familia", dataField: "ClaveFamilia", alignment: 'center' },
                { caption: "Familia", dataField: "Familia", alignment: 'center' },
                { caption: "Clave Componente", dataField: "ClaveComponente", alignment: 'center' },
                { caption: "Componente", dataField: "Componente", alignment: 'center' },
                { caption: "Clave Ubicacion Falla", dataField: "ClaveUbicacion", alignment: 'center' },
                { caption: "Ubicacion Falla", dataField: "UbicacionFalla", alignment: 'center' }
            ];
            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetConsultaReincidencias/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
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
                            groupPanel: {
                                visible: true
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
                                fileName: "Top 5 Reincidencias_" + fecha,
                                allowExportSelectedData: false
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
        onSelectReport(params: any): void {
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');
            if (params.FRACCIONAMIENTO === "" || params.FRACCIONAMIENTO === null || params.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'Dpto.' : 'Int.';
            let columns: any;
            columns = UrlAplicacion.pathname.includes("intra") ?
                [
                    { caption: "No. cliente", dataField: "IdCliente", alignment: 'left' },
                    { caption: "Nombre cliente", dataField: "ClienteNombre" },
                    { caption: "Clave Fraccionamiento", dataField: "ClaveFraccionamiento" },
                    { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                    { caption: "Edificio", dataField: "edificio" },
                    { caption: "Nivel", dataField: "nivel" },
                    { caption: labelInterior, dataField: "Interior" },
                    { caption: "Ext.", dataField: "Exterior" },
                    { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
                    { caption: "Folio", dataField: 'IdFolio' },   
                    { caption: "No. de reincidencia", dataField: 'Reincidencias', alignment: 'center' },
                    { caption: "Clave familia", dataField: 'ClaveFamilia', alignment: 'center' },
                    { caption: "Familia", dataField: 'Familia' },
                    { caption: "Componente", dataField: "Componente" },
                    { caption: "Ubicacion Falla", dataField: "UbicacionFalla" },
                    { caption: "Observaciones", dataField: "Observaciones" },
                    { caption: "Fecha Reporte", dataField: "FechaReporte", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Estatus Folio", dataField: "EstatusFolio" },
                    { caption: "No. Usuario", dataField: "NoUsuario" },
                    { caption: "Construcción", dataField: "Construccion" },
                    { caption: "Clave Contratista", dataField: "ClaveContratista" },
                    { caption: "Contratista", dataField: "Contratista" },
                    { caption: "Fec. Entrega", dataField: "FechaEntrega", dataType: "datetime", format: "d/MM/yyyy" }
                ]
                :
                [   { caption: "Plaza", dataField: "Plaza", alignment: 'left' },
                    { caption: "Folio", dataField: 'IdFolio' },
                    { caption: "No. cliente", dataField: "IdCliente", alignment: 'left' },
                    { caption: "Nombre cliente", dataField: "ClienteNombre" },
                    { caption: "ET", dataField: "Etapa" },
                    { caption: "Mza,", dataField: "Manzana" },
                    { caption: "Lt.", dataField: "Lote" },
                    { caption: labelInterior, dataField: "Interior" },
                    { caption: "Ext.", dataField: "Exterior" },
                    { caption: "No. de reincidencia", dataField: 'Reincidencias', alignment: 'center' },
                    { caption: "Clave familia", dataField: 'ClaveFamilia', alignment: 'center' },
                    { caption: "Familia", dataField: 'Familia' },
                    { caption: "Componente", dataField: "Componente" },
                    { caption: "Ubicacion Falla", dataField: "UbicacionFalla" },
                    { caption: "Observaciones", dataField: "Observaciones" },
                    { caption: "Fecha Reporte", dataField: "FechaReporte", dataType: "datetime", format: "d/MM/yyyy" },
                    { caption: "Estatus Folio", dataField: "EstatusFolio" },
                    { caption: "No. Usuario", dataField: "NoUsuario" },
                    { caption: "Construcción", dataField: "Construccion" },
                    { caption: "Clave Contratista", dataField: "ClaveContratista" },
                    { caption: "Contratista", dataField: "Contratista" },
                    { caption: "Clave Fraccionamiento", dataField: "ClaveFraccionamiento" },
                    { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
                    { caption: "Fec. Entrega", dataField: "FechaEntrega", dataType: "datetime", format: "d/MM/yyyy" }];

            //if (UrlAplicacion.pathname.includes("intra")) {
            //    columns.splice(4, 1).splice(5, 1).splice(6, 1);
            //    columns.splice(6, 0, { caption: "Edificio", dataField: "edificio" }, { caption: "Nivel", dataField: "nivel" })
            //}
            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetConsultaReincidencias/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
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
                            groupPanel: {
                                visible: true
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
                                fileName: "Reporte de reincidencias_" + fecha,
                                allowExportSelectedData: false
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
        onSelectClasificacionReincidencia(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
            let Vocaciones = model.Vocaciones.ID;
            let Plaza = model.PlazaInicial.ID;
            let FechaInicial = model.FechaInicial;
            let FechaFinal = model.FechaFinal;
            let EstatusFolio = model.EstatusFolio.Clave;
            let TopCinco = model.TopCinco ? 1 : 0;
            EstatusFolio = EstatusFolio === 'Todos' ? '-2' : EstatusFolio
            EstatusFolio = EstatusFolio === 'C' ? 'S' : EstatusFolio
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
                PLAZA: Plaza,
                VOCACIONES: Vocaciones,
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                ESTATUSFOLIO: EstatusFolio,
                TOPCINCO: TopCinco,
                SEGMENTO: segmento
            });
            !TopCinco ? this.onSelectReport(p) : this.onSelectTopCinco(p);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Consulta de reincidencias "}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelectClasificacionReincidencia} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>

                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                        {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}
                        <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <EstatusFolio idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <checkBox.CheckBox id={"TopCinco"} idForm={PAGE_ID} label={"Top 5 de reincidencias"} size={[12, 12, 3, 3]} />

                    </Column>

                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaReincidencias, {}> {
        constructor(props: IConsultaReincidencias) {
            super(props);
        };
        static defaultProps: IConsultaReincidencias = {
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


    class EstatusFolio$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global["EstatusFolio"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "EstatusFolio",
            items: createDefaultStoreObject([]),
            label: "Estatus Folio",
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
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "N", Nombre: "Nuevo" });
                items.push({ ID: 2, Clave: "T", Nombre: "Terminado" });
                items.push({ ID: 3, Clave: "C", Nombre: "Cancelado" });
                items.unshift({ ID: -2, Clave: "Todos", Nombre: "Todos" });
                global.dispatchSuccessful("load::EstatusFolio", items);
            };


        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const EstatusFolio: any = ReactRedux.connect(EstatusFolio$DDL.props, null)(EstatusFolio$DDL);
}
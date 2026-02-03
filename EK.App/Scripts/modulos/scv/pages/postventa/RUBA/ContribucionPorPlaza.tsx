// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.RUBA.ContribucionPorPlaza {
    "use strict";
    const PAGE_ID: string = "ContribucionPorPlaza";
    const PAGE_RESULTADOS_ID: string = "reportesConsulta$resultados";
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
            retValue.tipoOrientacion = Forms.getDataValue("TipoOrientacion", [config.id + "$filters"].join(""), state);
            retValue.agrupadoPor = Forms.getDataValue("AgrupadoPor", [config.id + "$filters"].join(""), state);
            return retValue;
        };
        onExport(): void {
            let filters: any = this.onWillFilter(this.props, Forms.getForm([config.id, "filters"].join("$")));
            global.requestAction("scv/contribucionPorPlaza/exportar", filters, "post");
        };
        onWillFilter(props: any, filters: any): any {
            let retValue: any = global.getFilters(filters);
            retValue.IdProceden = filters.Proceden ? filters.Proceden.Clave : null;
            retValue.IdTipoOrientacion = filters.TipoOrientacion ? filters.TipoOrientacion.Clave : null;
            retValue.IdAgrupadoPor = filters.AgrupadoPor ? filters.AgrupadoPor.Clave : null;
            retValue.Fraccionamientos = filters.Fraccionamientos;

            if (retValue.Fraccionamientos && retValue.Fraccionamientos.length > 0) {
                retValue.Fraccionamientos.forEach((f: any) => { delete f["ID"]; });
            };
            let segmento: any = filters.segmento && filters.segmento.ID ? filters.segmento.ID !== 9999 ? filters.segmento.ID : '-2' : '-2';
            retValue.Segmento = segmento;
            return retValue;
        };
        onFilter(props: page.IProps, filters: any, type?: string): void {
            if (getData(props.page).id === config.id) {

                if (!(filters.Fraccionamientos && filters.Fraccionamientos.length > 0)) {
                    global.info("Debe seleccionar por lo menos un fraccionamiento.");
                    return;
                };

                props.config.dispatchCatalogoBasePost("scv/contribucionPorPlaza/consulta", filters);
            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("global-current-catalogo", []);
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaInicial", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([config.id + "$filters"].join(""), "FechaFinal", global.getToday(true));
            Forms.updateFormElement([config.id + "$filters"].join(""), "Fraccionamientos", [{ Clave: "-2", ID: -2, Nombre: "TODOS", id: -2 }]);
        };
        componentWillReceiveProps(nextProps: IVistaProps): any {
            if (global.hasChanged(this.props.tipoOrientacion, nextProps.tipoOrientacion) ||
                global.hasChanged(this.props.agrupadoPor, nextProps.agrupadoPor)) {
                this.setState({ childKey: ++this.state.childKey });
            };
        };
        onRowDoubleClick(item: any): any {
            return null;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig;
            let tipoOrientacion: any = global.getData(this.props.tipoOrientacion);
            let agrupadoPor: any = global.getData(this.props.agrupadoPor);

            if (tipoOrientacion && agrupadoPor) {
                if (tipoOrientacion.Clave === "V") {
                    if (agrupadoPor.Clave === "P") {
                        dtConfig = dt.createConfig(ml.consultas.plaza);
                        dtConfig.columns
                            .add({ data: "Plaza.Nombre", width: "200px", fixed: true })
                            .add({ data: "TipoFalla.Descripcion", width: "200px" })
                            .add({ data: "Cantidad", width: "150px", dataType: "number" })
                            .toArray();
                    } else if (agrupadoPor.Clave === "F") {
                        dtConfig = dt.createConfig(ml.consultas.fraccionamiento);
                        dtConfig.columns
                            .add({ data: "IdFraccionamiento", width: "200px", fixed: true })
                            .add({ data: "Fraccionamiento.Nombre", width: "200px", fixed: true })
                            .add({ data: "TipoFalla.Descripcion", width: "200px" })
                            .add({ data: "Cantidad", width: "150px", dataType: "number" })
                            .toArray();
                    } else if (agrupadoPor.Clave === "C" || agrupadoPor.Clave === "T") {
                        dtConfig = dt.createConfig(ml.consultas.contratista);
                        dtConfig.columns
                            .add({ data: "Plaza.Nombre", width: "200px" })
                            .add({ data: "TipoFalla.Descripcion", width: "200px" })
                            .add({ data: "Contratista.ID", width: "200px", dataType: "number", fixed: true })
                            .add({ data: "Contratista.Nombre", width: "200px", fixed: true })
                            .add({ data: "Cantidad", width: "150px", dataType: "number" })
                            .add({ data: "TotalIncidencias", width: "150px", dataType: "number" })
                            .toArray();
                    }
                } else if (tipoOrientacion.Clave === "H") {
                    if (agrupadoPor.Clave === "P") {
                        dtConfig = dt.createConfig(ml.consultas.plaza);
                        let columnasDinamicas: any = [];
                        let i: number;
                        let x: number = 0;

                        for (i = 1; i <= 5; i++) {
                            columnasDinamicas[x++] = { titulo: "Incidencia " + i.toString(), columna: "incidencia_" + i.toString(), width: "200px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Total Incidencia " + i.toString(), columna: "cantidad_" + i.toString(), width: "150px", align: "center" };
                        };

                        columnasDinamicas[x++] = { titulo: "Contribución", columna: "Contribucion", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Porcentaje", columna: "Porcentaje", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Total Incidencias", columna: "TotalIncidencias", width: "150px", align: "center" };

                        dtConfig.columns
                            .add({ data: "Plaza.Nombre", width: "200px", fixed: true })
                            .addDynamicColumns(columnasDinamicas)
                            .toArray();
                    } else if (agrupadoPor.Clave === "F") {
                        dtConfig = dt.createConfig(ml.consultas.fraccionamiento);
                        let columnasDinamicas: any = [];
                        let i: number;
                        let x: number = 0;

                        for (i = 1; i <= 5; i++) {
                            columnasDinamicas[x++] = { titulo: "Incidencia " + i.toString(), columna: "incidencia_" + i.toString(), width: "200px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Total Incidencia " + i.toString(), columna: "cantidad_" + i.toString(), width: "150px", align: "center" };
                        };

                        columnasDinamicas[x++] = { titulo: "Contribución", columna: "Contribucion", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Porcentaje", columna: "Porcentaje", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Total Incidencias", columna: "TotalIncidencias", width: "150px", align: "center" };

                        dtConfig.columns
                            .add({ data: "IdFraccionamiento", width: "200px", fixed: true })
                            .add({ data: "Fraccionamiento.Nombre", width: "200px", fixed: true })
                            .addDynamicColumns(columnasDinamicas)
                            .toArray();
                    } else if (agrupadoPor.Clave === "C") {
                        dtConfig = dt.createConfig(ml.consultas.contratista);
                        let columnasDinamicas: any = [];
                        let i: number;
                        let x: number = 0;

                        for (i = 1; i <= 5; i++) {
                            columnasDinamicas[x++] = { titulo: "Plaza " + i.toString(), columna: ["Plaza" + i.toString() + ".Nombre"].join(""), width: "150px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Contratista " + i.toString(), columna: ["Contratista" + i.toString() + ".Nombre"].join(""), width: "300px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Incidencia " + i.toString(), columna: ["incidencia_" + i.toString()].join(""), width: "200px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Total Incidencia " + i.toString(), columna: ["cantidad_" + i.toString()].join(""), width: "150px", align: "center" };
                        };

                        columnasDinamicas[x++] = { titulo: "Contribución", columna: "Contribucion", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Porcentaje", columna: "Porcentaje", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Total Incidencias", columna: "TotalIncidencias", width: "150px", align: "center" };

                        dtConfig.columns
                            .addDynamicColumns(columnasDinamicas)
                            .toArray();
                    } else if (agrupadoPor.Clave === "T") {
                        dtConfig = dt.createConfig(ml.consultas.contratista);
                        let columnasDinamicas: any = [];
                        let i: number;
                        let x: number = 0;

                        for (i = 1; i <= 5; i++) {
                            columnasDinamicas[x++] = { titulo: "Plaza " + i.toString(), columna: ["Plaza" + i.toString() + ".Nombre"].join(""), width: "150px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Incidencia " + i.toString(), columna: ["incidencia_" + i.toString()].join(""), width: "200px", align: "center" };
                            columnasDinamicas[x++] = { titulo: "Total Incidencia " + i.toString(), columna: ["cantidad_" + i.toString()].join(""), width: "150px", align: "center" };
                        };

                        columnasDinamicas[x++] = { titulo: "Contribución", columna: "Contribucion", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Porcentaje", columna: "Porcentaje", width: "150px", align: "center" };
                        columnasDinamicas[x++] = { titulo: "Total Incidencias", columna: "TotalIncidencias", width: "150px", align: "center" };

                        dtConfig.columns
                            .add({ data: "Contratista.ID", width: "150px", dataType: "number", fixed: true })
                            .add({ data: "Contratista.Nombre", width: "300px", fixed: true })
                            .addDynamicColumns(columnasDinamicas)
                            .toArray();
                    }
                };
            };

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowNew={false}
                allowDelete={false}
                onWillFilter={this.onWillFilter.bind(this)}
                onFilter={this.onFilter.bind(this)}
                onExport={this.onExport.bind(this)}>
                <page.Filters collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL id="PlazaInicial" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.VocacionesFilterDDL id="Vocacion" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <ddl.SegmentosDDLv2 id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                    {/*<ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={config.id} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                    <DatePicker id="FechaInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    <DatePicker id="FechaFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    <ProcedenDDL idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <TipoOrientacionDDL idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <AgrupadoPorDDL idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                </page.Filters>
                <Row>
                    <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                        <page.OptionSection
                            id={PAGE_RESULTADOS_ID}
                            icon="fa fa-folder-open" collapsed={false} hideCollapseButton={true}>
                            <TotalIncidencias tipoOrientacion={tipoOrientacion} agrupadoPor={agrupadoPor} />
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                                    {dtConfig ? <dt.DataTableExtended key={this.state.childKey} dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} /> : null}
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Main>
        };
    });

    interface ITotalIncidenciasProps extends page.IProps {
        tipoOrientacion?: any;
        agrupadoPor?: any;
    };

    const TotalIncidencias: any = global.connect(class extends React.Component<ITotalIncidenciasProps, any>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: ITotalIncidenciasProps): void {
            if (global.hasChanged(this.props.data, nextProps.data)) {
                if (global.isSuccessful(nextProps.data)) {
                    let tipoOrientacion: any = nextProps.tipoOrientacion;
                    let agrupadoPor: any = nextProps.agrupadoPor;
                    let total5Incidencias: number = 0;
                    let totalIncidencias: number = 0;

                    let data: any[] = global.getData(nextProps.data, []);
                    if (data && data.length) {
                        data.forEach((value: any, index: number) => {
                            if (tipoOrientacion) {
                                if (tipoOrientacion.Clave === "V") {
                                    switch (value.Fila) {
                                        case 6: total5Incidencias += value.Cantidad; break;
                                        case 7:
                                            if (agrupadoPor && agrupadoPor.Clave === "T") {
                                                if (value.Cantidad > totalIncidencias) {
                                                    totalIncidencias = value.Cantidad;
                                                }
                                            } else {
                                                totalIncidencias += value.Cantidad;
                                            } break;
                                    }
                                } else if (tipoOrientacion.Clave === "H") {
                                    total5Incidencias += value.Contribucion;

                                    if (agrupadoPor && agrupadoPor.Clave === "T") {
                                        if (value.TotalIncidencias > totalIncidencias) {
                                            totalIncidencias = value.TotalIncidencias;
                                        }
                                    } else {
                                        totalIncidencias += value.TotalIncidencias;
                                    };
                                };
                            };
                        });
                    };

                    Forms.updateFormElement(config.id, "Total5Incidencias", total5Incidencias);
                    Forms.updateFormElement(config.id, "TotalIncidencias", totalIncidencias);
                };
            };
        };
        render(): JSX.Element {
            let labelIncidencias: any = (value: any) => {
                let retValue: any = 0;

                if (this.props.data) {
                    if (global.isLoadingOrUpdating(this.props.data)) {
                        retValue = "<span><i class='fas fa-sync-alt fa-spin fa-fw font-blue-sharp'></i></span>";
                    } else if (global.isSuccessful(this.props.data)) {
                        retValue = value;
                    };
                } else {
                    retValue = value;
                }

                return retValue;
            };

            return <Row>
                <label.Label id="Total5Incidencias" idForm={config.id} value={labelIncidencias} isHTML={true} size={[12, 6, 3, 3]} />
                <label.Label id="TotalIncidencias" idForm={config.id} value={labelIncidencias} isHTML={true} size={[12, 6, 3, 3]} />
            </Row>
        };
    });

    class Proceden$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$proceden"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Proceden",
            items: createDefaultStoreObject([]),
            label: "Proceden",
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
                items.push({ ID: 1, Clave: "S", Nombre: "Proceden" });
                items.push({ ID: 2, Clave: "A", Nombre: "Proceden - Abiertos" });
                items.push({ ID: 3, Clave: "C", Nombre: "Proceden - Cerrados" });
                items.push({ ID: 4, Clave: "N", Nombre: "No Proceden" });
                items.push({ ID: -2, Clave: "T", Nombre: "Todos" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$proceden", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const ProcedenDDL: any = ReactRedux.connect(Proceden$DDL.props, null)(Proceden$DDL);

    class TipoOrientacion$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.contribucion$tipoOrientacion
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoOrientacion",
            items: createDefaultStoreObject([]),
            label: "Tipo Orientación",
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
                items.push({ ID: 1, Clave: "H", Nombre: "HORIZONTAL" });
                items.push({ ID: 2, Clave: "V", Nombre: "VERTICAL" });
                global.dispatchSuccessful("load::contribucion$tipoOrientacion", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const TipoOrientacionDDL: any = ReactRedux.connect(TipoOrientacion$DDL.props, null)(TipoOrientacion$DDL);

    class AgrupadoPor$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.contribucion$agrupado
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "AgrupadoPor",
            items: createDefaultStoreObject([]),
            label: "Agrupado Por",
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
                items.push({ ID: 1, Clave: "P", Nombre: "PLAZA" });
                items.push({ ID: 2, Clave: "F", Nombre: "FRACCIONAMIENTO" });
                items.push({ ID: 3, Clave: "C", Nombre: "CONTRATISTA" });
                items.push({ ID: 4, Clave: "T", Nombre: "TODOS CONTRATISTAS" });
                global.dispatchSuccessful("load::contribucion$agrupado", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const AgrupadoPorDDL: any = ReactRedux.connect(AgrupadoPor$DDL.props, null)(AgrupadoPor$DDL);
};
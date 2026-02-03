// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.postventa.RUBA {
    "use strict";
    const PAGE_ID: string = "ReportesFallas";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");
    const w: any = window;

    export const formatEstatusReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let retValue: string = "";

        if (data && data.Clave) {
            if (data.Clave === "T") {
                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
            } else if (data.Clave === "P") {
                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
            } else {
                retValue = "<span class='badge badge-info' style='padding: 4px 15px 4px; height: 100%;'>" + data.Nombre + "</span>";
            }
        };

        return "<div style='text-align: center;'>" + retValue + "</div>";
    };

    interface ISPVCombinacionConsultaProps extends consultas.IConsultaProps {
        idTipoVivienda?: number;
    };

    export class SPVCombinacionConsulta extends React.Component<ISPVCombinacionConsultaProps, {}> {
        static defaultProps: ISPVCombinacionConsultaProps = {
            id: "BusquedaComponente",
            label: "Buscar",
            helpLabel: "Búsqueda de componentes",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/ReportesFallas/Get/GetComponentes/",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            idTipoVivienda: -1,
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "TipoFalla.ID", width: "100px" })
                    .add({ data: "TipoFalla.Clave", width: "100px" })
                    .add({ data: "TipoFalla.Nombre", width: "200px" })
                    .add({ data: "Falla.IdFalla", width: "100px" })
                    .add({ data: "Falla.Descripcion", width: "200px" })
                    .add({ data: "Falla.ImpactoFalla.Nombre", width: "150px" })
                    .add({ data: "Falla.DuracionGarantia", width: "150px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
            Forms.updateFormElement(idForm, "Falla", item.Falla);
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { idTipoVivienda: this.props.idTipoVivienda, activo: 1 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    };
    interface IConsultaTipoComponente extends consultas.IConsultaProps {
        usoFalla: string;
        tipovivienda: any;
    };

    export class SPVTiposComponentesConsulta extends React.Component<IConsultaTipoComponente, {}> {
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
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Clave", width: "100px" })
                    .add({ data: "Nombre", width: "350px" })
                    .add({ data: "DuracionGarantia", width: "150px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, "Falla", null);
        };
        render(): JSX.Element {
            let bi: any = () => {
                return { activo: 1, usoFalla: this.props.usoFalla, tipoVivienda: this.props.tipovivienda };
            };
           // console.log(this.props.tipovivienda)
            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick.bind(this)} beforeInvoke={bi} />
        };
    };

    export class SPVCausasFallasConsulta extends React.Component<consultas.IConsultaProps, {}> {
        static defaultProps: consultas.IConsultaProps = {
            id: "CausaFalla",
            remoteMethod: HttpMethod.GET,
            remoteUrl: "base/scv/CausasFallas/all",
            label: "Incidencia",
            helpLabel: "Seleccione una Incidencia",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.IdCausaFalla,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdCausaFalla", width: "100px" })
                    .add({ data: "Descripcion", width: "350px" })
                    .add({ data: "Abreviatura", width: "150px" })
                    .add({ data: "FallaOrigen.Clave", width: "150px" })
                    .add({ data: "FallaOrigen.Descripcion", width: "350px" })
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
            helpLabel: "Seleccione una causa de la incidencia",
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
                    .add({ data: "Descripcion", width: "350px" })
                    .add({ data: "FallaOrigen.Clave", width: "150px" })
                    .add({ data: "FallaOrigen.Descripcion", width: "350px" })
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

    interface IResponsablesConstruccionDDLProps extends ddl.IDropDrownListProps {
        ubicacion?: DataElement;
    };

    export let ResponsablesConstruccionDDL: any = global.connect(class extends React.Component<IResponsablesConstruccionDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.reporte$responsables,
            ubicacion: state.global.entity$reporte$ubicacion
        });
        static defaultProps: IResponsablesConstruccionDDLProps = {
            id: "Responsable",
            items: createDefaultStoreObject([]),
            label: "Responsable de Construcción",
            helpLabel: "Responsable de Construcción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-info'>", item.ID, "</span>&nbsp;",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: IResponsablesConstruccionDDLProps): void {
            if (global.hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                if (global.isSuccessful(nextProps.ubicacion)) {
                    let ubicacion: any = global.getData(nextProps.ubicacion);
                    let p: any = global.assign({
                        IdPlaza: ubicacion.IdPlaza,
                        IdFraccionamiento: ubicacion.DesarrolloClave,
                    });
                    global.dispatchAsyncPost("load::reporte$responsables", "base/scv/SPVSupervisoresCoordinadores/GetBP/getResponsablesConstruccion/", { parametros: p});
                };
            };
        };
        componentDidMount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        componentWillUnmount(): void {
            global.dispatchSuccessful("load::reporte$responsables", []);
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export const SPVReportesClienteConsulta: any = global.connect(class extends React.Component<consultas.IConsultaProps, consultas.IConsultaProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entidad = Forms.getValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: consultas.IConsultaProps = {
            id: "ReportesCliente",
            remoteUrl: "base/scv/ReportesFallas/GetBP/GetClienteReportes",
            remoteMethod: HttpMethod.GET,
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 12, 12],
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                //console.log(ml)
                dtConfig.columns
                    .add({ data: "IdReporte", width: "100px", fixed: true })
                    .add({ data: "IdPrereporte", width: "120px", fixed: true, format: EK.UX.DataTable.formatPrereporte })
                    .add({ data: "FechaCaptura", width: "100px", format: EK.UX.DataTable.formatDate })
                    .add({ data: "ResponsableConstruccion.Nombre", width: "250px" })
                    .add({ data: "Partida", width: "80px", align: "center", format: EK.UX.DataTable.formatBadgeInfo })
                    .add({ data: "Dictamenes", width: "120px", format: EK.UX.DataTable.formatDictamen })
                    .add({ data: "TipoFalla.Nombre", width: "150px" })
                    .add({ data: "Falla.Descripcion", width: "150px" })
                    .add({ data: "UbicacionFalla.Descripcion", width: "150px" })
                    .add({ data: "Contratista.Descripcion", width: "250px" ,title:'Contratista Origen'})
                    .add({ data: "ContratistaOT.Descripcion", width: "250px", title: 'Contratista OT' })
                    .add({ data: "CausaFalla.Descripcion", width: "150px" })
                    .add({ data: "CausaFalla.FallaOrigen.Descripcion", width: "150px" })
                    .add({ data: "Reincidencias", width: "120px", align: "center", format: EK.UX.DataTable.formatBadgeWarning })
                    .add({ data: "Observaciones", width: "300px" })
                    .add({ data: "ObservacionesContratista", width: "300px" })
                    .add({ data: "DiasGarantia", width: "120px", format: EK.UX.DataTable.formatGarantia })
                    .add({ data: "TerminoGarantia", width: "150px", format: EK.UX.DataTable.formatDate })
                    .add({ data: "FechaCerrado", width: "120px", format: EK.UX.DataTable.formatDate })
                    .add({ title: "Estatus Partida", data: "EstatusPartida.Nombre", width: "160px", format: EK.UX.DataTable.formatBadgeSuccess })
                    .add({ title: "Estatus Folio", data: "NombreEstatusReporte", width: "160px", format: EK.UX.DataTable.formatBadgeDynamic })
                    .toArray();
                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            global.go([config.modulo, "pv", config.id, item.IdReporte].join("/"));
        };
        render(): JSX.Element {
            let entidad: any = this.props.config.getEntity();
           
            let idClienteEntidad: any = global.getData(entidad).IdCliente != null && global.getData(entidad).IdCliente != undefined ? global.getData(entidad).IdCliente : 0;
            let idCliente: any = idClienteEntidad != null && idClienteEntidad != undefined && idClienteEntidad > 0 ? idClienteEntidad : this.props.entidad != undefined && this.props.entidad.id != null && this.props.entidad.id != undefined ? this.props.entidad.id : 0;
            if (idCliente <= 0) {
                return null;
            } else {
                let bi: any = () => {
                    return { idCliente };
                };

                //return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} beforeInvoke={bi} />
                return <consultas.Consulta$FormOtroRep {...this.props} onRowDoubleClick={this.onRowDoubleClick} beforeInvoke={bi} />
            }
        };
    });

    interface ISPVReincidenciasConsultaProps extends consultas.IConsultaProps {
        item?: any;
    };

    export class SPVReincidenciasConsulta extends React.Component<ISPVReincidenciasConsultaProps, ISPVReincidenciasConsultaProps> {
        constructor(props: ISPVReincidenciasConsultaProps) {
            super(props);
            let id: string = ["consulta", new Date().getTime()].join("_");
            this.state = { id };
        };
        static defaultProps: ISPVReincidenciasConsultaProps = {
            id: "Reincidencias",
            remoteUrl: "base/scv/ReportesFallas/GetBP/GetReincidencias",
            remoteMethod: HttpMethod.POST,
            label: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            item: undefined,
            size: [12, 12, 12, 12],
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdReporte", width: "100px" })
                    .add({ data: "Cliente.Nombre", width: "300px" })
                    .add({ data: "Falla.Descripcion", width: "300px" })
                    .add({ data: "UbicacionFalla.Descripcion", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            global.go([config.modulo, "pv", config.id, item.IdReporte].join("/"));
        };
        render(): JSX.Element {
            let bi: any = () => {
                if (this.props.item) {
                    let item: any = this.props.item;
                    let parametros: any = global.assign({}, {
                        idCliente: item.IdCliente,
                        idTipoFalla: item.IdTipoFalla,
                        idFalla: item.Falla.IdFalla,
                        idUbicacionFalla: item.UbicacionFalla.IdUbicacionFalla,
                        idReporte: item.IdReporte,
                        proceden: "T"
                    });

                    return { parametros };
                };

                return null;
            };

            return <consultas.Consulta$Form {...this.props} onRowDoubleClick={this.onRowDoubleClick} beforeInvoke={bi} />
        };
    };

    interface ISPVComponentesConsultaProps extends consultas.IConsultaProps {
        tipoFalla?: any;
        tipoVivienda?: number;
    };

    export const SPVComponentesConsulta: any = global.connect(class extends React.Component<ISPVComponentesConsultaProps, {}> {
        static props: any = (state: any) => ({
            tipoFalla: Forms.getValue("TipoFalla", "reporte$fallas", state)
        });
        static defaultProps: ISPVComponentesConsultaProps = {
            id: "Falla",
            remoteUrl: "base/scv/Fallas/all",
            remoteMethod: HttpMethod.GET,
            label: "Componente",
            helpLabel: "Seleccione un componente",
            value: undefined,
            initialValue: undefined,
            tipoFalla: undefined,
            tipoVivienda: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.IdFalla,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdFalla", width: "150px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "DuracionGarantia", width: "150px" })
                    .add({ data: "ImpactoFalla.Nombre", width: "150px" })
                    .add({ data: "TipoFalla.Clave", width: "150px" })
                    .add({ data: "TipoFalla.Nombre", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (!this.props.tipoFalla) {
                Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
            } else {
                if (this.props.tipoFalla.ID !== item.TipoFalla.ID) {
                    Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
                };
            };
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idTipoFalla: number = this.props.tipoFalla ? this.props.tipoFalla.ID : null;
                let idTipoVivienda: number = this.props.tipoVivienda ? this.props.tipoVivienda : null;

                return { idTipoFalla, idTipoVivienda, activos: 0, activo: 1 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    });

    export const SPVComponentesConsultaAgendaSpv: any = global.connect(class extends React.Component<ISPVComponentesConsultaProps, {}> {
        static props: any = (state: any) => ({
            tipoFalla: Forms.getValue("TipoFalla", "DetallesCita$Incidencias", state)
        });
        static defaultProps: ISPVComponentesConsultaProps = {
            id: "Falla",
            remoteUrl: "base/scv/Fallas/all",
            remoteMethod: HttpMethod.GET,
            label: "Componente",
            helpLabel: "Seleccione un componente",
            value: undefined,
            initialValue: undefined,
            tipoFalla: undefined,
            tipoVivienda: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!item) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.IdFalla,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdFalla", width: "150px" })
                    .add({ data: "Descripcion", width: "300px" })
                    .add({ data: "DuracionGarantia", width: "150px" })
                    .add({ data: "ImpactoFalla.Nombre", width: "150px" })
                    .add({ data: "TipoFalla.Clave", width: "150px" })
                    .add({ data: "TipoFalla.Nombre", width: "300px" })
                    .toArray();

                return dtConfig;
            }
        };
        onRowDoubleClick(item: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (!this.props.tipoFalla) {
                Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
            } else {
                if (this.props.tipoFalla.ID !== item.TipoFalla.ID) {
                    Forms.updateFormElement(idForm, "TipoFalla", item.TipoFalla);
                };
            };
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idTipoFalla: number = this.props.tipoFalla ? this.props.tipoFalla.ID : null;
                let idTipoVivienda: number = this.props.tipoVivienda ? this.props.tipoVivienda : null;

                return { idTipoFalla, idTipoVivienda, activos: 0, activo: 1 };
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} onRowDoubleClick={this.onRowDoubleClick.bind(this)} />
        };
    });

    interface ISPVContratistasConsultaProps extends consultas.IConsultaProps {
        idPlaza?: any;
        visible?: boolean;
    };

    export class SPVContratistasConsulta extends React.Component<ISPVContratistasConsultaProps, {}> {
        static defaultProps: ISPVContratistasConsultaProps = {
            id: "Contratista",
            remoteUrl: "base/scv/Contratistas/all",
            remoteMethod: HttpMethod.GET,
            label: "Contratista",
            helpLabel: "Seleccione un contratista",
            value: undefined,
            initialValue: undefined,
            idPlaza: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!(item && item.ID)) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Descripcion,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Descripcion", width: "300px", order: "asc" })
                    .add({ data: "Ciudad", width: "150px" })
                    .add({ data: "Direccion", width: "300px" })
                    .add({ data: "TipoContrato.Nombre", width: "200px" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                let idPlaza: number = this.props.idPlaza ? this.props.idPlaza : null;
                return { idPlaza };
            };

            if (this.props.visible === false) {
                return null;
            };

            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };



    interface ISPVResponsableDictamenProps extends consultas.IConsultaProps {
        idPlaza?: any;
        visible?: boolean;
    };

    export class SPVResponsableDictamenConsulta extends React.Component<ISPVResponsableDictamenProps, {}> {
        static defaultProps: ISPVResponsableDictamenProps = {
            id: "ResponsableDictamen",
            remoteUrl: "base/kontrol/usuarios/all/",
            remoteMethod: HttpMethod.GET,
            label: "Responsable",
            helpLabel: "Seleccione un Supervisor",
            value: undefined,
            initialValue: undefined,
            idPlaza: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!(item && item.ID)) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Nombre", title: "Nombre", width: "1000px", order: "asc" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                if (this.props.idPlaza != null && this.props.idPlaza != undefined) {
                    let plaza: any = this.props.idPlaza;
                    let nivel: any  ='134';
                    return { plaza, nivel };
                };
                return null;
            };
            if (this.props.visible === false) {
                return null;
            };
            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };

    export class SPVResponsableDictamenConsultaAC extends React.Component<ISPVResponsableDictamenProps, {}> {
        static defaultProps: ISPVResponsableDictamenProps = {
            id: "ResponsableDictamen",
            remoteUrl: "base/scv/SPVSupervisoresCoordinadores/Get/getResponsablesConstruccionACUnico/",
            //remoteUrl: "base/kontrol/usuarios/all/",
            remoteMethod: HttpMethod.GET,
            label: "Responsable",
            helpLabel: "Seleccione un Supervisor",
            value: undefined,
            initialValue: undefined,
            idPlaza: undefined,
            hasChanged: false,
            hasValidationError: false,
            size: [12, 12, 6, 6],
            itemFormatter: (item: any) => {
                if (!(item && item.ID)) return "";

                return [
                    "<span class='badge badge-success bold'> ",
                    item.ID,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join("");
            },
            setDTConfig: (ml: any) => {
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "ID", width: "100px" })
                    .add({ data: "Nombre", title: "Nombre", width: "1000px", order: "asc" })
                    .toArray();

                return dtConfig;
            }
        };
        render(): JSX.Element {
            let bi: any = () => {
                if (this.props.idPlaza != null && this.props.idPlaza != undefined) {
                    let plaza: any = this.props.idPlaza;
                    let nivel: any = '65,66,78';
                    //return { plaza, nivel };
                    return { IdPlaza: plaza };
                };
                return null;
            };
            if (this.props.visible === false) {
                return null;
            };
            return <consultas.Consulta$Form {...this.props} beforeInvoke={bi} />
        };
    };
};
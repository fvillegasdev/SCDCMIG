namespace EK.Modules.SCV.Pages.Ventas {
    "use strict";
    const COTIZACIONES_ID: string = "Cotizaciones";
    const UBICACIONES_ID: string = "Ubicaciones";
    const CARACTERISTICAS_ID: string = "Caracteristicas";
    const CONCEPTOS_CREDITO_ID: string = "Institucion$Conceptos";
    const INSTITUCIONES_ID: string = "FinanciamientoInstituciones";
    const FINANCIAMIENTO_ID: string = "Financiamiento";
    const PLANPAGOS_ID: string = "PlanPagos";
    const idFormNuevoPP: string = "$ventasNPP";
    const SECTION_ABONO_ID: string = "ventas$PPAbono";
    const idFormDocumento: string = "$ventasNPPDoc";
    const COTIZACIONES_BACKUP_ID: string = "cotizaciones$Backup";
    const COTIZACIONES_UBICACIONES_ID: string = "cotizaciones$Ubicaciones";
    const COTIZACIONES_FINANCIAMIENTO_ID: string = "cotizaciones$Financiamiento";
    const COTIZACIONES_PP_CONCEPTOS_ID: string = "cotizaciones$PP$Conceptos";

    const UBICACIONES_PRECIODEVENTA: string = "Ubicaciones_PrecioVentaEditar";


    let PLANPAGOS = "PlanPagos_Cancelacion";


    const config: page.IPageConfig =
        global.createPageConfig("ventas", "scv", [
            UBICACIONES_ID,
            FINANCIAMIENTO_ID,
            PLANPAGOS_ID,
            CARACTERISTICAS_ID,
            INSTITUCIONES_ID,
            CONCEPTOS_CREDITO_ID,
            "ventas$PPConcepto",
            "Documentos",
            "Noedit",
            COTIZACIONES_ID,
            COTIZACIONES_BACKUP_ID,
            COTIZACIONES_UBICACIONES_ID,
            COTIZACIONES_FINANCIAMIENTO_ID,
            COTIZACIONES_PP_CONCEPTOS_ID,
            PLANPAGOS,
            UBICACIONES_PRECIODEVENTA
        ]);

    let PAGE_ID = config.id.toUpperCase();

    interface IVentaEdicion extends page.IProps {
    };
    
    export let Edicion: any = global.connect(class extends React.Component<IVentaEdicion, IVentaEdicion> {
        constructor(props: page.IProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let modelInfo: any = item;
            let model: any = item
                .addID()
                .addObject("Moneda")
                .addObject("EstatusVenta")
                .addNumber("IdExpediente")
                .addObject("Expediente")
                .addObject(UBICACIONES_ID)
                .addObject(FINANCIAMIENTO_ID)
                .addObject(PLANPAGOS_ID)
                .addObject(COTIZACIONES_ID)
                .addEstatus("Estatus")
                .addVersion()
                .toObject();

            let financiamiento: any = model[FINANCIAMIENTO_ID];
            if (financiamiento && financiamiento.length) {
                model[FINANCIAMIENTO_ID] = financiamiento[0];
            } else {
                model[FINANCIAMIENTO_ID] = null;
            }

            return model;
        };
        onWillEntityLoad(IdExpediente: any, props: page.IProps): void {
            config.dispatchEntityBase({ IdExpediente }, "ventas/getexpediente", undefined, global.HttpMethod.POST);
        };
        onEntityLoaded(props: page.IProps, parameters: any): void {
            let venta: any = getData(props.entidad);
            let idVenta: any = getDataID(props.entidad);
            if (parameters && (parameters.expedienteFiniquito || parameters.claveProceso === "PROC-FINIQUITO")) {
                let estatusVenta = venta.EstatusVenta.Clave;
                if (estatusVenta != "F" )
                {
                    global.dispatchAsyncPost("global-current-entity", "ventas/StartFiniquito/", venta);
                }
            }
            //{update form con los nuevos campos de la entidad}
            Object.keys(venta).forEach((key: any) => {
                Forms.updateFormElement(config.id, key, venta[key]);
            });

            //{establecer las cotizaciones que se reciban al actualizar la entidad principal}
            let cotizaciones: any[] = venta.Cotizaciones ? venta.Cotizaciones : [];
            global.dispatchSuccessful("global-page-data", cotizaciones, COTIZACIONES_ID);

            if (idVenta === -1) {
                global.dispatchSuccessful("global-page-data", [], UBICACIONES_ID);
                global.dispatchSuccessful("global-page-data", [], FINANCIAMIENTO_ID);
                global.dispatchSuccessful("global-page-data", venta.PlanPagos, PLANPAGOS_ID);
                global.dispatchSuccessful("global-page-data", [], INSTITUCIONES_ID);
            }
            else {
                let financiamiento: any[] = [];
                let instituciones: any[] = [];

                if (venta.Financiamiento) {
                    financiamiento.push(venta.Financiamiento);

                    if (venta.Financiamiento.FinanciamientoInstituciones) {
                        instituciones = venta.Financiamiento.FinanciamientoInstituciones as any[];
                    }
                }

                //global.dispatchSuccessful("global-page-data", venta.Ubicaciones, UBICACIONES_PRECIODEVENTA);

                global.dispatchSuccessful("global-page-data", venta.Ubicaciones, UBICACIONES_ID);
                global.dispatchSuccessful("global-page-data", financiamiento, FINANCIAMIENTO_ID);
                global.dispatchSuccessful("global-page-data", venta.PlanPagos, PLANPAGOS_ID);
                global.dispatchSuccessful("global-page-data", instituciones, INSTITUCIONES_ID);

                let estatusVenta: string = venta.EstatusVenta.Clave;

                if (estatusVenta == "E" || estatusVenta == "RE" || estatusVenta == "F" || estatusVenta == "CO" || estatusVenta =="D")
                {
                    let idExpediente: number = venta.Expediente.ID
                    let p: string = global.assign({ idExpediente });
                    global.dispatchAsyncPost("global-page-data", "base/scv/ventas/GetBP/ValidarLPPorDesarrollo/", { parametros: p }, "VigenciaLP");
                }

            }
        };
        componentWillReceiveProps(nextProps: IVentaEdicion): any {
            let nextState: any = global.getData(nextProps.config.getState());
            if (nextState.viewMode === true && global.hasChanged(this.props.entidad, nextProps.entidad)) {
                let entidad: any = global.getData(nextProps.entidad);
                global.dispatchSuccessful("global-page-data", entidad.Cotizaciones, COTIZACIONES_BACKUP_ID);
            }
        };
        componentDidUpdate(prevProps: IVentaEdicion, { }): any {
            let prevState: any = global.getData(prevProps.config.getState());
            let thisState: any = global.getData(this.props.config.getState());

            if (global.wasUpdated(prevProps.entidad, this.props.entidad, false)) {
                let entidad: any = global.getData(this.props.entidad);
                global.dispatchSuccessful("global-page-data", entidad.Cotizaciones, COTIZACIONES_BACKUP_ID);
            }

            if (thisState.viewMode !== prevState.viewMode && thisState.viewMode === true) {
                let cotizaciones: any[] = global.getData(this.props.config.getCatalogo(COTIZACIONES_BACKUP_ID), []);
                global.dispatchSuccessful("global-page-data", cotizaciones, COTIZACIONES_ID);
            }
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let state: any = global.getData(this.props.config.getState());
            let allowEdit: boolean = entidad.ReadOnlyKontrol;
            let allowSave: boolean = true;

            let estatusVenta: any = global.assign({}, entidad.EstatusVenta);
            let $page: any = $ml[PAGE_ID];


            let estatusExpediente: string = "";
            if (isSuccessful(this.props.entidad)) {
                estatusExpediente = entidad.Expediente.EstatusExpediente.Clave;
            }

            if (estatusVenta.Clave === "CO") {
                //{validar que el usuario pueda cotizar}
                let allowCotizar: boolean = Boolean(entidad.AllowToCotizar);

                allowEdit = allowEdit && allowCotizar;

                //{validar que esté seleccionada una cotización en modo edición}
                let selectedItem: boolean = Boolean(state.selectedItem);
                allowSave = allowEdit && selectedItem;
            }
            if (estatusExpediente == "PA" || estatusExpediente=="C")
            {
                allowEdit = false;
                allowSave = false;
            }
            

            /*Boton para finiquitar una venta*/
                    //<FiniquitoButton />

            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
                onWillEntityLoad={this.onWillEntityLoad}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                idKeyEntidad="IdExpediente" allowEdit={allowEdit}
                allowSave={allowSave} allowNew={false} allowDelete={false}>
                <PageButtons>

                    <LinkBarCotizacion />
                    {estatusExpediente == "PA" || estatusExpediente == "C" ? null : <CotizacionButton />}
                    {estatusExpediente == "PA" || estatusExpediente == "C" ? null :<AuthorizeButton />}
                    {estatusExpediente == "PA" || estatusExpediente == "C" ? null : <ReestructureButton />}

                    <PrintButton />
                </PageButtons>
                <View />
                <Edit allowSave={allowSave} />
            </page.Main>
        }
    });

    interface IPlanPagosProps extends page.IProps {
        item?: any;
        concepto?: any;
        planPagos?: DataElement;
        obtenerPlanPagos?: (idVenta: number, idPlanPagos: number, idExpediente: number) => void;
        venta?: boolean;
    };

    /*** BEGIN: Plan de Pagos ***/
    interface IEditProps extends page.IProps {
        ubicacion?: any;
        item?: any;
        documentos?: any[];
        mode?: any;
        EditPP?: boolean;
        viewMode?: any;
        obtenerPlanPagos?: (idVenta: number, idPlanPagos: number) => void;
        recalcularUbicaciones?: (idVenta: number, idFinanciamiento: number, ubicaciones: any[], idExpediente: number) => void;
        recalcularCotizaciones?: (item: any) => void;
        config?: page.IPageConfig;
        Moneda: DataElement;
        entidad: DataElement;
        concepto?: any;
        ubicaciones: DataElement;
        clasificadores?: any;
        visible?: any;
    };

    //***Edit Mode***//
    let Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        constructor(props: IEditProps) {
            super(props);
            this.onRemoveUbicacion = this.onRemoveUbicacion.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            planPagos: state.global.catalogo$PlanPagos,
            concepto: state.forms[PLANPAGOS_ID],
            ubicaciones: state.ventas.ubicaciones,
            clasificadores: state.global.app,
        });
        static defaultProps: IEditProps = {
            Moneda: undefined,
            entidad: undefined,
            ubicaciones: undefined,
            allowSave: true
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerPlanPagos: (idVenta: number, idPlanPagos: number, idExpediente: number): void => {
                dispatchAsync("scv-ventas-setPlanPagosSelected", "ventas(" + idVenta + ")/GetPlanDePagos(" + idPlanPagos + ")/Expediente(" + idExpediente + ")");
            },
            recalcularUbicaciones: (idVenta: number, idFinanciamiento: number, ubicaciones: any[], idExpediente: number): void => {
                global.dispatchAsyncPost("scv-ventas-ubicaciones", "ventas/RecalcularUbicaciones", { idVenta, idFinanciamiento, ubicaciones, idExpediente });
                Forms.updateFormElement(config.id, UBICACIONES_ID, createLoadingStoreObject([]));
            },
            recalcularCotizaciones: (item: any): void => {
                global.dispatchAsyncPost("global-page-data", "ventas/RecalcularCotizaciones", item, COTIZACIONES_ID);
            }
        });
        onRemove(item: any): void {
            EK.Global.confirm("Presione Confirmar para eliminar ", "Eliminar Detalle", () => {
                let model = EK.Global.assign(item);
                dispatchAsyncPut("scv-comisiones-config-setSelected", "SCV/Comisiones/DashBoard/Configuraciones/Delete", model);
            });
        };
        onRemoveUbicacion(item: any): void {
            let idVenta: number = Forms.getValue("ID", config.id);
            let ubicaciones: any[] = global.getData(item, []);
            let expediente: any = global.getData(this.props.item);
            let idExpediente: any = expediente ? expediente.IdExpediente : 0;
            //
            let financiamiento: any[] = global.getData(Forms.getValue(FINANCIAMIENTO_ID, config.id), []);
            let idFinanciamiento: any = 0;
            //
            if (financiamiento && financiamiento.length > 0) {
                idFinanciamiento = financiamiento[0].ID;
            }
            //
            this.props.recalcularUbicaciones(idVenta, idFinanciamiento, ubicaciones, idExpediente);
        };
        updateItems(items: any): void {
            Forms.updateFormElement(PAGE_ID, "PlanPagos", items);
        };
        getFormData(): any {
            if (!Forms.isValid(PLANPAGOS_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };

            let item: EditForm = Forms.getForm(PLANPAGOS_ID);
            let removedItems: number = 0;

            let concepto: any = item
                .addNumber("ID")
                .addObject("ConceptoPago")
                .addNumber("ImporteMoneda")
                .addNumber("Saldo")
                .addNumber("PorcentajeTIF")
                .addNumber("NumeroPagos")
                .addObject("FrecuenciaPago")
                .addNumber("NumeroPlazoPrimerPago")
                .addObject("PeriodoPrimerPago")
                .addBoolean("Modificable")
                .addNumber("Pagado")
                .addObject("VentaVersion")
                .toObject();

            return concepto;
        };
        setInfoConcepto(concepto: any): void {
            let formaConcepto: any = {
                ID: concepto.ID,
                ConceptoPago: concepto.ConceptoPago,
                ImporteMoneda: concepto.CapitalMoneda,
                Saldo: concepto.Saldo,
                PorcentajeTIF: concepto.PorcentajeTIF,
                NumeroPagos: concepto.NumeroPagos,
                FrecuenciaPago: concepto.FrecuenciaPago,
                NumeroPlazoPrimerPago: concepto.NumeroPlazoPrimerPago,
                PeriodoPrimerPago: concepto.PeriodoPrimerPago,
                Documentos: concepto.Documentos,
                Modificable: concepto.Modificable,
                Pagado: concepto.Pagado,
                VentaVersion: concepto.VentaVersion
            };

            Forms.updateFormElements(PLANPAGOS_ID, formaConcepto);
        };
        onSelect(item: any): void {
            Forms.remove(PLANPAGOS_ID);
            dispatchSuccessful("cv-ventas-setSelectedConcepto", item);

            if (this.props.config) {
                this.props.config.setState({ viewmode: false, viewMode: false }, PLANPAGOS_ID);
            }
        };
        getUpdatedUbicaciones(u: DataElement): global.DataElement {
            //transformar las caracteristicas eliminadas del back -> react
            let items: any[] = [];
            let thisItems: any[] = global.getData(u.getUpdatedStateItems(), []);

            if (thisItems && thisItems.length > 0) {
                thisItems.forEach((value: any, index: number) => {
                    let caracteristicas: global.DataElement = new global.DataElement(value.Caracteristicas);
                    caracteristicas = caracteristicas.getUpdatedStateItems();
                    value.Caracteristicas = global.getData(caracteristicas, []);
                    items.push(value);
                });
            }

            let retValue: global.DataElement = new global.DataElement();
            retValue.status = u.status;
            retValue.data = items;
            retValue.timestamp = u.timestamp;

            return retValue;
        };
        updateCotizaciones(): void {
            let item: EditForm = Forms.getForm(config.id);
            let model: any = item
                .addID()
                .addObject("Expediente")
                .addObject(UBICACIONES_ID)
                .addObject(FINANCIAMIENTO_ID)
                .addObject(PLANPAGOS_ID)
                .addObject(COTIZACIONES_ID)
                .toObject();

            let financiamiento: any = model[FINANCIAMIENTO_ID];
            if (financiamiento && financiamiento.length) {
                model[FINANCIAMIENTO_ID] = financiamiento[0];
            } else {
                model[FINANCIAMIENTO_ID] = null;
            }

            this.props.recalcularCotizaciones(model);
        };
        //componentWillMount(): void {
        //    if (isSuccessful(this.props.item)) {
        //        let clave: any = this.props.item;
        //        if (clave == "A") {

        //            this.props.config.setState({ visible: true }, config.id);
        //        } else {
        //            this.props.config.setState({ visible: false }, config.id);
        //        }
        //    }
        //};
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.ubicaciones, nextProps.ubicaciones)) {
                if (isSuccessful(nextProps.ubicaciones)) {
                    let ubicaciones: any = this.getUpdatedUbicaciones(nextProps.ubicaciones);
                    Forms.updateFormElement(config.id, UBICACIONES_ID, ubicaciones);

                    let pp: any = Forms.getValue("PlanPagos", config.id);
                    let financiamiento: any = Forms.getValue(FINANCIAMIENTO_ID, config.id);

                    let conceptos: any[] = [];
                    let concepto: any;
                    if (pp) {
                        if (pp.status && pp.timestamp) {
                            pp = global.getData(pp);
                            if (pp && pp.Conceptos) {
                                conceptos = pp.Conceptos;
                            }
                        }
                        else {
                            if (pp.Conceptos) {
                                conceptos = pp.Conceptos;
                            }
                        }
                    }

                    for (var i = 0; i < conceptos.length; i++) {
                        if (conceptos[i].ConceptoPago.Clave == "MC") {
                            concepto = conceptos[i];

                            break;
                        }
                    }

                    let venta: any = global.assign(global.getData(this.props.item));
                    let estatusVenta: any = global.assign(venta.EstatusVenta);
                    venta.Ubicaciones = global.getData(ubicaciones);
                    venta.PlanPagos = pp;

                    if (financiamiento) {
                        let financiamientoData: any[] = global.getData(financiamiento, []);
                        if (financiamientoData && financiamientoData.length > 0) {
                            venta.Financiamiento = financiamientoData[0];
                        }
                    }

                    if (estatusVenta.Clave === "CO") {
                        this.updateCotizaciones();
                    }

                    let itemCalc: any = { venta, concepto: null };
                    dispatchAsyncPost("scv-ventas-setPlanPagosSelected", "ventas/RecalcularPlanDePagos", itemCalc);
                    Forms.updateFormElement(config.id, "PlanPagos", createLoadingStoreObject([]));
                };
            };
        };
        onChangePrecioVenta(item: any): void {
            let clave: any = item.Clave;
            if (clave == "A") {
               
                this.props.config.setState({ visible: true }, UBICACIONES_ID);
            } else
            {
                this.props.config.setState({ visible: false }, UBICACIONES_ID);
            }
        };
        onSave(): void {
            let item: EditForm = Forms.getForm(UBICACIONES_PRECIODEVENTA);

            let entidades: DataElement = this.props.config.getCatalogo(UBICACIONES_ID);


            let model: any = item
                .addID()
                .addObject("Paquete")
                .addObject("Caracteristicas")
                .addObject("PrecioVenta")
                .addBoolean("Topar")
                .addObject("Ubicacion")
                .addNumber("ImporteMoneda")
                .addNumber("Importe")
                .addNumber("TipoCambio")
                .addNumber("ImporteComisionable")
                .addNumber("IdMoneda")
                .addNumber("Diferencia")
                .addNumber("ImporteOriginal")
                .addNumber("ImporteOriginalMoneda")
                .addNumber("ImporteNuevo")
                .addVersion()
                .toObject();


            model._modificado = true;
            model["ID"] = item["ID"];
            model["ImporteMoneda"] = item['ImporteNuevo'];

            let retValue: DataElement = entidades.upsertItem(model);
            Forms.updateFormElement(config.id, UBICACIONES_ID, retValue);
            this.props.config.setState({ viewMode: true }, UBICACIONES_PRECIODEVENTA);
            Forms.updateFormElement(config.id, "EditarPrecioVenta", false);

            /*Recalcular plan de pagos*/
            let venta: any = getData(this.props.entidad);
            let financiamiento: any = Forms.getValue(FINANCIAMIENTO_ID, config.id);
            let idFinanciamiento: number = 0;

            if (global.isSuccessful(financiamiento)) {
                financiamiento = global.getData(financiamiento, []);

                if (financiamiento && financiamiento.length > 0) {
                    idFinanciamiento = financiamiento[0].Financiamiento.ID;
                };
            };

            let idVenta: number = Forms.getValue("ID", config.id);
            let ubicaciones: any[] = global.getData(retValue, []);
           // this.recalcularUbicaciones(idVenta, idFinanciamiento, ubicaciones, venta.Expediente.ID);
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let state: global.DataElement = this.props.config.getState(UBICACIONES_ID);
            let stateInstituciones: any = global.getData(this.props.config.getState(INSTITUCIONES_ID), {});
            let estatusVenta: any = global.assign({}, global.getData(this.props.item).EstatusVenta);
            let idExpediente: any = global.getData(this.props.item).IdExpediente;
            let idFinanciamiento: number = 0;
            let financiamiento: any = Forms.getValue(FINANCIAMIENTO_ID, config.id);
            let financiamientoActivo: any;
            let visible: any = global.getData(state).visible;//this.state.visible;
            let tipoComercializacion: any;

            //
            if (financiamiento) {
                let financiamientoData: any[] = global.getData(financiamiento, []);
                if (financiamientoData && financiamientoData.length > 0) {
                    financiamiento = financiamientoData[0];

                    if (financiamiento && !(financiamiento._eliminado === true)) {
                        financiamientoActivo = financiamiento
                        idFinanciamiento = financiamientoActivo.Financiamiento !== null ? Number(financiamientoActivo.Financiamiento.ID) : 0;
                    }
                }
            };
            //

            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };
            //
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let element: DataElement = Forms.getValue(id, idParent);
                    Forms.updateFormElement(idParent, id, element.removeItem(item));
                    this.onRemoveUbicacion(element.removeItem(item))
                }
            };
            //
            let validate: (fecha: Date, importe: number, documentos: any[]) => any = (fecha: Date, importe: number, documentos: any[]): any => {
                if (fecha === undefined || fecha === null ||
                    importe === undefined || importe === null ||
                    documentos === undefined || documentos === null || documentos.length === 0) {
                    return false;
                };

                let isValid: boolean = false;

                for (var i = 0; i < documentos.length; i++) {
                    let documento: any = documentos[i];
                    let vencimiento: Date = documento.Vencimiento;
                    if (fecha < vencimiento) {
                        if (importe < documento.Saldo) {
                            isValid = true;

                            break;
                        };
                    };
                };

                return isValid;
            };
            //Datos Generales Cliente
            let editUbicacion: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);

                    let caracteristicas: any[] = item.Caracteristicas;
                    if (!caracteristicas) {
                        caracteristicas = [];
                    };

                    let idUbicacion: number = item.Ubicacion.ID;

                    let financiamiento: any = Forms.getValue(FINANCIAMIENTO_ID, config.id);

                    let idFinanciamiento: number = 0;

                    if (global.isSuccessful(financiamiento)) {
                        financiamiento = global.getData(financiamiento, []);

                        if (financiamiento && financiamiento.length > 0) {
                            idFinanciamiento = financiamiento[0].Financiamiento.ID;
                        };
                    };
                    let ventaOpcional: boolean = false;
                    global.dispatchSuccessful("global-page-data", caracteristicas, CARACTERISTICAS_ID);
                    if (item.PrecioVenta.Clave == "A") {
                        config.setState({ viewMode: false, visible: true }, id);
                    } else {
                        config.setState({ viewMode: false, visible: false }, id);
                    }

                }
            };
            //

            let editPrecioVenta: any =
                {
                icon: "fal fa-file-edit",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) =>
                {
                    Forms.updateFormElement(config.id, "EditarPrecioVenta", true);

                    Forms.remove(UBICACIONES_ID);
                    Forms.updateFormElements(UBICACIONES_ID, item);

                    Forms.remove(UBICACIONES_PRECIODEVENTA);
                    Forms.updateFormElements(UBICACIONES_PRECIODEVENTA, item);

                    //this.props.config.updateForm(UBICACIONES_PRECIODEVENTA);
                    this.props.config.setState({ viewMode: false }, UBICACIONES_PRECIODEVENTA);
                    config.setEntity(item, UBICACIONES_PRECIODEVENTA);
                }
            };


            let viewImages: any = {
                icon: "fa fa-image",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let images: any[] = [];
                    let itemsArr: any[] = [];
                    if (item.Archivos && item.Archivos.length > 0) {
                        itemsArr = item.Archivos;
                    };

                    itemsArr.map((value: any, index: number) => {
                        let fileType: string = $.trim(value.FileType).toLowerCase();
                        if (fileType.indexOf("image/") === 0) {
                            images.push({
                                type: "image",
                                src: value.FilePath,
                                title: value.Nombre,
                                txt: "",
                                author: value.CreadoPor.Nombre
                            });
                        };
                    });

                    if (images && images.length > 0) {
                        let lb: any = window["lc_lightbox"](images, { "skin": "dark" });
                        window["lcl_open"](lb, 0);
                    };
                }
            };
            //
            let editFinanciamiento: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    //
                    let instituciones: any[] = item.FinanciamientoInstituciones;
                    if (instituciones === null || instituciones === undefined) {
                        instituciones = [];
                    };
                    //
                    global.dispatchFullSuccessful("global-page-data", instituciones, INSTITUCIONES_ID, 0, "");
                    //
                    config.setState({ viewMode: false }, id);
                }
            };
            //
            let removeFinanciamiento: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let ubicaciones: global.DataElement = Forms.getValue("Ubicaciones", config.id);
                    let ubicacionesItems: any[] = global.getData(ubicaciones, []);
                    let idVenta: number = Forms.getValue("ID", config.id);

                    this.props.recalcularUbicaciones(idVenta, 0, ubicacionesItems, idExpediente);

                    let element: global.DataElement = Forms.getValue(id, idParent);
                    Forms.updateFormElement(idParent, id, element.removeItem(item));
                }
            };
            //
            let getUbicacionesURL: any = (): any => {
                let desarrollo = Forms.getValue("Desarrollo", config.id);
                let ubicacionesData = Forms.getValue("Ubicaciones", config.id);
                let ubicaciones: any[];
                if (!ubicacionesData) {
                    return "";
                };
                let retValue: string = "";

                ubicaciones = global.getData(ubicacionesData);
                if (ubicaciones && ubicaciones.forEach) {
                    ubicaciones.forEach((value: any, index: number) => {
                        if (retValue.length > 0) {
                            retValue = retValue + "|";
                        }
                        retValue = retValue + value.ID;
                    });
                };

                if (retValue !== "" && desarrollo) {
                    return "Desarrollos/GetLocations/" + desarrollo.ID + "/" + retValue + "/10/true";
                };

                return retValue;
            };
            //

          
            let mapURL: string = "";
            let venta: any = getData(this.props.item);
            let cliente: any;
            let expediente: any;
            let usaPaquete: any;
            let desarrollo: any;
            let moneda: any;
            let idDesarrollo: any;

            let mapa2D: boolean = false;

            if (global.isSuccessful(this.props.item)) {
                cliente = venta.Cliente.Nombre;
                desarrollo = global.assign({}, venta.Desarrollo);
                idDesarrollo = Number(desarrollo.ID);
                mapURL = "Desarrollos/GetLocations/" + desarrollo.ID + "/null/10/true";

                mapa2D = desarrollo.Mapa2D;

                expediente = global.assign({}, venta.Expediente);
                usaPaquete = expediente.TipoComercializacion !== null ? expediente.TipoComercializacion.Paquete : false;
            };
            if (venta) {
                desarrollo = global.assign({}, venta.Desarrollo);
            }
            if (desarrollo) {
                moneda = global.assign({}, desarrollo.Moneda);
            }; 
            //

            //-------------------------------//

            let clasificadores: any = getData(this.props.clasificadores).Clasificadores;
            let busquedaClasificador: any = (clave: any) => {
                let result: boolean = false;
                for (var i = 0; i < clasificadores.length; i++) {
                    if (clasificadores[i].TipoClasificador.Clave == "PAQUETE" && clasificadores[i].Clasificador.Clave == clave) {
                        result = true;
                        break;
                    }
                }
                return result;

            };
            let paquete: boolean = busquedaClasificador("PAQUETE");
            let clasificadorPaquete: boolean = (paquete == true && usaPaquete == true) ? true : false;
            //-------------------------------//


            const listHeaderCotizacion: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        <Column size={[12, 12, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Fecha"}</Column>
                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Venta"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>
            //
            const listHeaderUbicaciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        {clasificadorPaquete && usaPaquete ?
                            <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                            : <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        }
                        {clasificadorPaquete && usaPaquete ?
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Paquete"}</Column>
                            : null
                        }
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header hidden-xs hidden-sm">{"Tipo Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Precio Venta"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>
            //
            const listHeaderCaracteristicas: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Característica"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>
            //
            const listHeaderFinanciamiento: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[9, 9, 9, 9]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>
            //
            const listHeaderFinanciamientoInstituciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Institución"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>
            //
            const listHeaderInstitucionConceptos: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Concepto"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Estimado"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Real"}</Column>
                    </Row>
                </Column>

          
            return <page.Edit>


                <MensajeValidacionLP/>

                <Column size={[12, 12, 12, 12]}
                    style={{
                        paddingLeft: 0,
                        paddingRight : 0
                    }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={cliente}
                        icon="fas fa-file-invoice-dollar"
                        identidad={"Cliente"}
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <label.Folio id="IdExpediente" size={[12, 1, 1, 1]} />
                            <label.Link id="Cliente" label="PROSPECTO/CLIENTE"size={[12, 9, 9, 9]} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} />

                            <EstatusVenta size={[12, 2, 2, 2]}/>

                            <label.Link id="Desarrollo" link={"#/scv/desarrollos/:id"} size={[12, 4, 4, 4]} />


                            <label.Link id="TipoComercializacion" label="Tipo Comercialización" size={[12, 4, 4, 4]}  link={"#/scv/clientes/:id"} />


                            <label.Link id="Agente" link={"#/kontrol/usuarios/:id"} size={[12, 4, 4, 4]} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.Apellidos].join(" ") }; }} />

                            <label.Entidad id="Moneda" link={"#/kontrol/monedas/:id"} size={[12, 3, 3, 3]} />
                            <label.Entidad id="Fase" size={[12, 3, 3, 3]} label="Fase" />
                            <label.Entidad id="Etapa" size={[12, 3, 3, 3]} label="Etapa" />
                            <label.Entidad id="Proceso" size={[12, 3, 3, 3]} label="Proceso" />

                        </Row>
                        <Row>
                            <div style={{ paddingTop: 15 }}>
                                {estatusVenta.Clave === "CO" ?
                                    <EditCotizaciones size={[12, 12, 12, 12]} /> : null}
                            </div>

                            <EditarPrecioVenta />


                            <page.SectionList
                                id={UBICACIONES_ID}
                                parent={config.id}
                                level={1}
                                icon="fa fa-table"
                                listHeader={listHeaderUbicaciones}
                                hideNewButton={!this.props.allowSave}
                                size={[12, 12, 12, 12]}
                                viewButtons={
                                    this.props.allowSave ?
                                        <buttons.MapViewerButton
                                            iconOnly={true}
                                            className="btn-ico-ek white"
                                            url={getUbicacionesURL()} /> : null
                                }
                                onAddNew={() => {
                                    Forms.remove(UBICACIONES_ID);
                                    Forms.remove(CARACTERISTICAS_ID);
                                    global.dispatchSuccessful("global-page-data", [], CARACTERISTICAS_ID);

                                    this.props.config.setState({ viewMode: false, visible: true}, UBICACIONES_ID);
                                } }
                                onAfterSave={(item?: any, entidades?: DataElement) => {
                                    let idVenta: number = Forms.getValue("ID", config.id);
                                    let ubicaciones: any[] = global.getData(entidades, []);

                                    this.props.recalcularUbicaciones(idVenta, idFinanciamiento, ubicaciones, idExpediente);
                                } }
                                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                    let retValue: any = form
                                        .addID()
                                        .addObject("Paquete")
                                        .addObject("Ubicacion")
                                        .addObject("Caracteristicas")
                                        .addObject("PrecioVenta")
                                        .addBoolean("Topar")
                                        .addVersion()
                                        .toObject();

                                    let e: any[] = entidades;
                                    if (e && e.length > 0) {
                                        e.forEach((value: any, index: number): any => {
                                            if (value.Ubicacion.Clave === retValue.Ubicacion.Clave) {
                                                retValue.ID = value.ID;
                                                retValue._found = true;
                                            };
                                        });
                                    };

                                    return retValue;
                                } }
                                aggregate={(item: any, values: any) => {
                                    if (!values.ImporteMoneda) values.ImporteMoneda = 0;
                                    values.ImporteMoneda += item.ImporteMoneda ? item.ImporteMoneda : 0;
                                    return values;
                                } }
                                listFooter={(values: any) => {
                                    return <div>
                                        <Row>
                                            <Column size={[8, 8, 8, 8]}>{""}</Column>
                                            <Column size={[3, 3, 3, 3]} style={{ textAlign: "right" }} className="listItem-right-header">
                                                <span style={{ fontSize: 12, fontWeight: 600, color: "gray", paddingRight: 30 }}>Valor Total de la Venta </span>
                                                <span className="badge badge-info list-footer-badge">
                                                    {global.formatMoney(values.ImporteMoneda, moneda)}
                                                </span>
                                            </Column>
                                        </Row>
                                    </div>;
                                } }
                                formatter={(index: number, item: any) => {

                                    let ubicacion: any = item.Ubicacion;
                                    let caracteristicas: DataElement = global.createSuccessfulStoreObject(item.Caracteristicas).getActiveItems();
                                    let length: number = global.getData(caracteristicas, []).length;
                                    let precioVenta: any = item.PrecioVenta ? item.PrecioVenta.Clave : "O";
                                    let style: React.CSSProperties = {};
                                    style.backgroundColor = "";
                                    let styleO: React.CSSProperties = {};
                                    style.backgroundColor = "";
                                    let classNameD:string= "";
                                    let className: string = "";
                                    let classNameO: string = "";
                                    var desarrolloId: any = Forms.getValue("IdDesarrollo", config.id);
                                    if (precioVenta == "O") {                                          
                                        styleO.backgroundColor = "#36d35f"
                                        classNameO = "badge badge-info";
                                    } else {
                                        style.backgroundColor = "#36d35f"
                                        className = "badge badge-info";
                                    }
                                    if (item.Diferencia < 0) {
                                        classNameD = "badge badge-danger";
                                    }
                                    return <Row id={"row_ubicacion_" + item.Ubicacion.Clave} className="panel-collapsed" >
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                            <Row>
                                                <Column size={[2, 1, 1, 1]} className="listItem-center-item">
                                                    <CollapseButton idElement={"row_ubicacion_" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                </Column>
                                                {clasificadorPaquete && usaPaquete ?
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item hidden-xs hidden-sm">{item.Paquete !== null ? item.Paquete.Nombre : "" }</Column>
                                                    : <Column size={[1, 1, 1, 1]} className="listItem-default-item hidden-xs hidden-sm">{""}</Column>
                                                }
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>
                                                    <span className="bold">{item.Ubicacion.Clave}</span>
                                                </Column>
                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-info">{item.Ubicacion.Nombre}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item hidden-xs hidden-sm">{item.Ubicacion.TipoUbicacion.Nombre}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Ubicacion.Prototipo.Nombre}</Column>
                                                <Column size={[1, 1, 1, 1]} ><div><span className="badge badge-info" style={{ backgroundColor: "#36d35f"}}>{precioVenta}</span></div></Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-item">
                                                    {global.formatMoney(item.ImporteMoneda, moneda)}

                                                    {item.ImporteOriginalMoneda>0 && (item.ImporteMoneda != item.ImporteOriginalMoneda) ?
                                                        <span style={{ color: "#FFAB40", fontWeight:700 }} className="fal fa-asterisk"></span> : null
                                                    }
                                                </Column>
                                                {estatusVenta.Clave == "F" ? < Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                                    <buttons.PopOver idParent={config.id} idForm={UBICACIONES_ID} info={item}
                                                        extraData={[viewImages, editUbicacion, editPrecioVenta]} />
                                                </Column> : < Column size={[1, 1, 1, 1]} className="listItem-default-item">
                                                        <buttons.PopOver idParent={config.id} idForm={UBICACIONES_ID} info={item}
                                                            extraData={[viewImages, editUbicacion, remove]} />
                                                    </Column>
                                                }
                                            </Row>
                                        </Column>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <div className="note note-sucess" style={{ padding: "5px 0px", margin: 0, border: "none" }}>
                                                    <Row style={{ padding: "5px 15px" }} id={"row_ubicacion_p" + item.Ubicacion.Clave } className="panel-collapsed">
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                            <CollapseButton idElement={"row_ubicacion_p" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                        </Column>
                                                        <Column size={[6, 6, 6, 6]}><span>PRECIO DE UBICACIÓN</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ImporteUbicacion, global.getData(this.props.item).Desarrollo.Moneda)}</Column>
                                                        <Row>
                                                            <Column
                                                                xs={{ size: 10 }}
                                                                sm={{ size: 10, offset: 1 }}
                                                                md={{ size: 10, offset: 1 }}
                                                                lg={{ size: 10, offset: 1 }}
                                                                className="panel-detail well well-sm"
                                                                style={{ paddingLeft: "10px", paddingRight: "50px", marginLeft: "200px", marginRight: "0px", width: "760px"}}>
                                                                <div className="note note-sucess" style={{ padding:"5px", margin:0, border: "none" }}>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span >VALOR AVALÚO</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={className} style={style}>{global.formatMoney(item.ValorAvaluo, global.getData(this.props.item).Desarrollo.Moneda)}</span></Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span>VALOR OPERATIVO</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={classNameO} style={styleO}>{global.formatMoney(item.ValorOperativo, global.getData(this.props.item).Desarrollo.Moneda)}</span></Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span style={{ color: "#808080", paddingLeft: "30px" }}>PRECIO DE UBICACIÓN</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600, color:"#808080" }}>{global.formatMoney(item.ImporteUbicacion, global.getData(this.props.item).Desarrollo.Moneda)}</Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span style={{ color: "#808080", paddingLeft: "30px" }}>TOTAL DE CARACTERÍSTICAS</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600, color: "#808080" }}>{global.formatMoney(item.TotalCaracteristicas, global.getData(this.props.item).Desarrollo.Moneda)}</Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span>DIFERENCIA</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={classNameD}>{global.formatMoney(item.Diferencia, global.getData(this.props.item).Desarrollo.Moneda)}</span></Column>
                                                                    </Row>
                                                                </div>
                                                            </Column>
                                                        </Row>
                                                    </Row>
                                                    {ubicacion.Excedente ?
                                                        <Row style={{ padding: "5px 15px" }}>
                                                            <Column size={[2, 2, 2, 2]}></Column>

                                                            <Column size={[4, 4, 4, 4]}>

                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span>METROS<sup>2</sup></span>
                                                                    </Column>
                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span className="badge badge-danger pull-right" style={{ marginBottom: "7px", fontSize: "12px !important", fontWeight: 700 }}>
                                                                            {ubicacion.Excedente}&nbsp;m<sup>2</sup>
                                                                        </span>
                                                                    </Column>
                                                                </Column>

                                                                <Column size={[12, 12, 12, 12]}>

                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span>EXCEDENTE</span>
                                                                    </Column>
                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span className="badge badge-success pull-right" style={{fontSize: "12px !important", fontWeight: 700 }}>{global.formatMoney(item.PrecioExcedente, global.getData(this.props.item).Desarrollo.Moneda)}</span>
                                                                    </Column>
                                                                </Column>

                                                            </Column>

                                                            <Column size={[6, 6, 6, 6]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ValorExcedente, global.getData(this.props.item).Desarrollo.Moneda)}</Column>
                                                                    
                                                        </Row> : null
                                                    }
                                                </div>
                                                <List
                                                    id={this.props.id + "_list"}
                                                    items={caracteristicas}
                                                    readonly={true}
                                                    listHeader={listHeaderCaracteristicas}
                                                    addRemoveButton={false}
                                                    formatter={(index_c: number, item_c: any): any => {
                                                        if (item_c.VentaOpcional === true) {
                                                            return <Row id={"row_ubicacion" + index_c}>
                                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-warning">Incluida</span></Column>
                                                                <Column size={[10, 10, 10, 10]}>{item_c.Caracteristica.Nombre}</Column>
                                                            </Row>
                                                        }
                                                        else {
                                                            return <Row id={"row_ubicacion" + index_c}>
                                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-info">Adicional</span></Column>
                                                                <Column size={[8, 8, 8, 8]}>{item_c.Caracteristica.Nombre}</Column>
                                                                <Column size={[2, 2, 2, 2]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item_c.Importe, global.getData(this.props.item).Desarrollo.Moneda)}</Column>
                                                            </Row>
                                                        }
                                                    } } />
                                            </Column>
                                        </Row>
                                    </Row>
                                } }>
                                <Row>
                                    {Forms.getValue("ID", UBICACIONES_ID) !== undefined && Forms.getValue("ID", UBICACIONES_ID) !== null
                                        ?
                                        <div>
                                            {clasificadorPaquete && usaPaquete ?
                                                <div><label.Entidad id="Paquete" label={"Ubicación"} idForm={UBICACIONES_ID} size={[2, 2, 2, 2]} />
                                                <label.Entidad id="Ubicacion" label={"Ubicación"} idForm={UBICACIONES_ID} size={[10, 10, 10, 10]} /></div>
                                                : <div><label.Entidad id="Ubicacion" label={"Ubicación"} idForm={UBICACIONES_ID} size={[8, 8, 8, 8]} />
                                                    <PRECIOVENTADDL id="PrecioVenta" idFormSection={UBICACIONES_ID} size={[3, 3, 3, 3]} change={this.onChangePrecioVenta.bind(this)} />
                                                    {visible == true ?
                                                        <checkBox.CheckBox id={"Topar"} idFormSection={UBICACIONES_ID} size={[1, 1, 1, 1]} />
                                                        : null}</div>
                                                }
                                        </div>
                                        : <div>
                                            {clasificadorPaquete && usaPaquete ?
                                                <Column>
                                                    <PaquetesDDL id="Paquete" idFormSection={UBICACIONES_ID} size={[12, 12, 2, 2]} />
                                                    <UbicacionesDesarrolloDDL id="Ubicacion" idFormSection={UBICACIONES_ID} idDesarrollo={Forms.getValue("IdDesarrollo", config.id)} size={[12, 12, 10, 10]} usaPaquete={true} />
                                                </Column>
                                                :
                                                <Column>
                                                    <UbicacionesDesarrolloDDL addNewItem={"SO"} id="Ubicacion" idFormSection={UBICACIONES_ID} idDesarrollo={Forms.getValue("IdDesarrollo", config.id)} size={[12, 12, 8, 8]} />
                                                    <PRECIOVENTADDL id="PrecioVenta" idFormSection={UBICACIONES_ID} size={[12, 12, 3, 3]} change={this.onChangePrecioVenta.bind(this)} />
                                                    {visible == true ?
                                                        <checkBox.CheckBox id={"Topar"} idFormSection={UBICACIONES_ID} size={[12, 12, 1, 1]} />
                                                        : null}
                                                </Column>
                                            }

                                            <Column size={[12, 12, 12, 12]}>
                                                {mapa2D ?
                                                    <checkBox.CheckBox id={"Mapa2D"} label="Mostrar Mapa" idFormSection={UBICACIONES_ID} size={[12, 2, 2, 2]} /> : null}

                                                {Forms.getValue("Mapa2D", UBICACIONES_ID) == true ?
                                                    <div>
                                                        <Mapviewer
                                                            sourceUrl={mapURL}
                                                            entidad={this.props.entidad}
                                                            geolocalizacion={null}
                                                            onMapLocationClicked={(clave) => {
                                                                let ubicaciones: any[] = global.getData(EK.Store.getState().global.UBICACIONESDES);

                                                                if (ubicaciones) {
                                                                    for (var i = 0; i < ubicaciones.length; i++) {
                                                                        if (ubicaciones[i].Clave === clave) {
                                                                            Forms.updateFormElement(UBICACIONES_ID, "Ubicacion", ubicaciones[i]);

                                                                            $("#Ubicaciones_saveButtonKey").click();
                                                                            break;
                                                                        }
                                                                    };
                                                                };
                                                            }}
                                                        >
                                                        </Mapviewer>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </Column>
                                          

                                        </div>
                                    }

                                    <page.SectionList
                                        id={CARACTERISTICAS_ID}
                                        parent={UBICACIONES_ID}
                                        icon="fa fa-table"
                                        level="1"
                                        size={[12, 12, 12, 12]}
                                        style={{ marginTop: 10 }}
                                        addRemoveButton={false}
                                        items={createSuccessfulStoreObject([])}
                                        inlineEdit={false}
                                        readonly={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addObject("Caracteristica")
                                                .addVersion()
                                                .toObject();

                                            retValue.IdVentaUbicacion = 0; //ok?
                                            retValue.IdCaracteristica = retValue.IdCaracteristica; //ok?
                                            retValue.Caracteristica.Escriturado = retValue.Caracteristica.Escriturado;
                                            retValue.Caracteristica.IdTipoCaracteristica = retValue.Caracteristica.TipoCaracteristica.ID;
                                            retValue.IdEntidadCaracteristica = retValue.Caracteristica.IdEntidadCaracteristica;
                                            retValue.IdTipoEntidad = retValue.Caracteristica.TipoEntidad.ID;
                                            retValue.TipoEntidad = retValue.Caracteristica.TipoEntidad;
                                            retValue.Clave = retValue.Caracteristica.Clave;
                                            retValue.Nombre = retValue.Caracteristica.Nombre;
                                            retValue.VentaOpcional = false;
                                            retValue.Importe = retValue.Caracteristica.Importe;

                                            let e: any[] = entidades;
                                            if (e && e.length > 0) {
                                                e.forEach((value: any, index: number): any => {
                                                    if (value.Caracteristica.ID === retValue.Caracteristica.ID) {
                                                        retValue.ID = value.ID;
                                                        retValue._found = true;
                                                    };
                                                });
                                            };

                                            return retValue;
                                        }}
                                        formatter={(index_c: number, item_c: any) => {
                                            return <Row id={"row_caracteristica_edit_" + index_c} className="panel-collapsed" >
                                                <Column size={[6, 6, 6, 6]}>{item_c.Caracteristica.Nombre}</Column>
                                                {item_c.VentaOpcional === true
                                                    ? <Column size={[5, 5, 5, 5]} className="listItem-right-header" style={{ fontWeight: 600 }}></Column>
                                                    : <Column size={[5, 5, 5, 5]} className="listItem-right-header" style={{ fontWeight: 600 }}>
                                                        {global.formatMoney(item_c.Importe, global.getData(this.props.item).Desarrollo.Moneda)}
                                                    </Column>
                                                }
                                                {item_c.VentaOpcional === true
                                                    ? <Column size={[1, 1, 1, 1]}>
                                                        <span className="badge badge-warning">Incluida</span>
                                                    </Column>
                                                    : <Column size={[1, 1, 1, 1]}>
                                                        <buttons.PopOver idParent={UBICACIONES_ID} idForm={CARACTERISTICAS_ID} info={item_c}
                                                            extraData={[buttons.PopOver.remove]} />
                                                    </Column>
                                                }
                                            </Row>
                                        }}>
                                        <Row>
                                            <ddl.CAdicionalesDDL label="Característica Adicional" idFormSection={CARACTERISTICAS_ID} size={[12, 12, 12, 12]} />
                                        </Row>
                                    </page.SectionList>
                                </Row>
                            </page.SectionList>

                            <page.SectionList
                                id={FINANCIAMIENTO_ID}
                                parent={config.id}
                                level={1}
                                icon="fa fa-table"
                                listHeader={listHeaderFinanciamiento}
                                size={[12, 12, 12, 12]}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                hideNewButton={this.props.allowSave ? financiamientoActivo ? true : false : true}
                                onAddNew={() => {
                                    Forms.remove(FINANCIAMIENTO_ID);
                                    Forms.remove(INSTITUCIONES_ID);
                                    global.dispatchSuccessful("global-page-data", [], INSTITUCIONES_ID);
                                    //
                                    this.props.config.setState({ viewMode: false }, FINANCIAMIENTO_ID);
                                } }
                                onAfterSave={(item?: any, entidades?: DataElement) => {
                                    let ubicaciones: DataElement = Forms.getValue("Ubicaciones", config.id);
                                    let ubicacionesItems: any[] = global.getData(ubicaciones, []);
                                    let idVenta: number = Forms.getValue("ID", config.id);
                                    let idFinanciamiento: number = item.Financiamiento.ID;

                                    this.props.recalcularUbicaciones(idVenta, idFinanciamiento, ubicacionesItems, idExpediente);
                                } }
                                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                    let retValue: any = form
                                        .addID()
                                        .addNombre()
                                        .addObject("Financiamiento")
                                        .addObject(INSTITUCIONES_ID)
                                        .addVersion()
                                        .addEstatus()
                                        .toObject();

                                    if (entidades && entidades.length > 0) {
                                        let entidad: any = entidades[0];
                                        retValue.ID = entidad.ID;
                                        if (entidad._eliminado === true) {
                                            retValue._nuevo = true;
                                            retValue._eliminado = undefined;
                                        }
                                        else {
                                            retValue._found = true;
                                        };

                                    };

                                    return retValue;
                                } }
                                formatter={(index: number, item: any) => {
                                    let instituciones: global.DataElement = global.createSuccessfulStoreObject(item.FinanciamientoInstituciones).getActiveItems();
                                    let length: number = global.getData(instituciones, []).length;
                                    let importeFinanciamiento: number = 0;
                                    let extraData: any[] = [editFinanciamiento];

                                    if (instituciones && length) {
                                        let _instituciones: any[] = global.getData(instituciones, []);

                                        _instituciones.forEach((value: any, index: number) => {
                                            importeFinanciamiento += parseFloat(value.MontoCredito);
                                        });
                                    } else {
                                        //eliminar financiamiento cuando no tenga créditos
                                        extraData.push(removeFinanciamiento);
                                    }

                                    return <Row id={"row_financiamiento_" + index} className="panel-collapsed">
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_financiamiento_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                </Column>
                                                <Column size={[9, 9, 9, 9]} className="listItem-default-header bold">
                                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>{item.Financiamiento.Nombre}
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                                    <span className="badge badge-info list-footer-badge">{global.formatMoney(importeFinanciamiento, global.getData(this.props.item).Desarrollo.Moneda)}</span>
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-header">
                                                    <buttons.PopOver idParent={config.id} idForm={FINANCIAMIENTO_ID} info={item} extraData={extraData} />
                                                </Column>
                                            </Row>
                                        </Column>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    id={this.props.id + "_list"}
                                                    items={instituciones}
                                                    readonly={true}
                                                    listHeader={listHeaderFinanciamientoInstituciones}
                                                    addRemoveButton={false}
                                                    formatter={(index_e: number, item: any): any => {
                                                        let conceptos: global.DataElement = global.createSuccessfulStoreObject(item.Conceptos).getActiveItems();
                                                        let style: React.CSSProperties = {};
                                                        style.backgroundColor = "#fafafa";
                                                        return <Row id={"row_financiamiento_" + index_e}>
                                                            <Row id={"row_instituciones_" + item.Institucion.Clave} className="panel-collapsed">
                                                                <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                                            <CollapseButton idElement={"row_instituciones_" + item.Institucion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                                        </Column>
                                                                        <Column size={[9, 9, 9, 9]}>
                                                                            <div className="listItem-default-header bold">{item.Institucion.Nombre}</div>
                                                                            <div className="listItem-default-header italic">{item.Comentarios}</div>
                                                                        </Column>
                                                                        <Column size={[2, 2, 2, 2]} className="listItem-right-header bold">
                                                                            {global.formatMoney(item.MontoCredito, global.getData(this.props.item).Desarrollo.Moneda)}
                                                                        </Column>
                                                                    </Row>
                                                                </Column>
                                                                <Row>
                                                                    <Column
                                                                        xs={{ size: 10 }}
                                                                        sm={{ size: 10, offset: 1 }}
                                                                        md={{ size: 10, offset: 1 }}
                                                                        lg={{ size: 10, offset: 1 }}
                                                                        className="panel-detail well well-sm">
                                                                        <List
                                                                            items={conceptos}
                                                                            readonly={true}
                                                                            listHeader={listHeaderInstitucionConceptos}
                                                                            addRemoveButton={false}
                                                                            formatter={(index_c: number, item: any): any => {
                                                                                let style: React.CSSProperties = {};
                                                                                style.padding = "5px 0px";
                                                                                style.backgroundColor = item.Credito === true && item.Concepto.TipoConcepto.Clave === "IMP" ? "#E3E4F9" : null;

                                                                                return <Row id={"row_concpeto_" + index_c}>
                                                                                    <Column style={style} size={[12, 12, 12, 12]} className="">
                                                                                        <Row style={style}>
                                                                                            <Column size={[6, 6, 6, 6]} className="listItem-default-item bold">{item.Concepto.Nombre}</Column>
                                                                                            <ColumnCC size={[3, 3, 3, 3]} className="listItem-right-item" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorEstimado} />
                                                                                            <ColumnCC size={[3, 3, 3, 3]} className="listItem-right-item" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorAutorizado} />
                                                                                        </Row>
                                                                                    </Column>
                                                                                </Row>
                                                                            }} />
                                                                    </Column>
                                                                </Row>

                                                            </Row>
                                                        </Row>
                                                    } } />
                                            </Column>
                                        </Row>
                                    </Row>
                                } }>
                                <Row>
                                    <FinanciamientosDDL size={[12, 12, 12, 12]} idDesarrollo={idDesarrollo} idFormSection={FINANCIAMIENTO_ID} validations={[validations.required()]} required={true} />
                                    <TFInstitucionesDetalle />
                                </Row>
                            </page.SectionList>
                        </Row>                        
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <EK.Modules.SCV.Pages.Ventas.PlanPagosView viewmode={false} idform={PLANPAGOS_ID} />
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ textAlign: "right" }}>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#84a950", alignmentBaseline: true }}></label><span>PAGADOS</span><span>   </span>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#000000" }}></label> <label>POR PAGAR</label><span>   </span>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#ea5353" }}></label> <label>CANCELADOS</label><span>   </span>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#f0882f" }}></label> <label>ABONOS</label><span>   </span>
                            </Column>
                        </Row>


                        <Row>

                            <EK.Modules.SCV.Pages.Expedientes.PlanPagos tipoEntidad="VENTA" />

                        </Row>
                    </page.OptionSection>
                </Column>


                <KontrolLogBookManager
                    idEntidadPadre={idExpediente}
                    claveEntidadPadre={"Expediente"}
                    modulo={"Expediente"}
                    viewMode={false}
                    addNewItem={"SO"} />
            </page.Edit>;
        }
    });

    interface IExpedienteStat extends page.IProps, grid.IColumn { }

    let ExpedienteStat: any = global.connect(class extends React.Component<IExpedienteStat, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        render(): JSX.Element {
            let item: any = global.getData(this.props.entidad);
            let expediente: any = global.assign({}, item.Expediente);
            let estatus: any = global.assign({}, expediente.Estatus);
            let fase: any = global.assign({}, expediente.Fase);
            let etapa: any = global.assign({}, expediente.Etapa);
            let estatusVenta: any = global.assign({}, item.EstatusVenta);
            let ventaProceso: any = global.assign({}, item.VentaProceso);
            let proceso: any = global.assign({}, ventaProceso.VentaProceso);
            let procesoNombre: string = !isEmptyObject(proceso) ? proceso.Nombre : "Sin Definir";
            let estatusExp: boolean = estatus.Clave === "A" ? false : true;
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="dashboard-stat2 bordered ek-transform-selected" style={{ margin: "1px", padding: "2px" }}>
                    <div className="display" style={{ marginBottom: "0px" }}>
                        <div className="number">
                            <h3 className="font-green-sharp">
                                <small className="font-green-sharp">Expediente</small>&nbsp;
                                <span className="badge badge-success ek-sombra">{item.IdExpediente}</span>
                                {estatusExp ?
                                    <span className="badge badge-danger badge-custom ek-sombra">{estatus.Nombre}</span>
                                    : null
                                }
                            </h3>
                        </div>

                    </div>
                    <div className="table-scrollable table-custom">

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6"
                            style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 6, backgroundColor: "#ffffff" }} >
                            <div className="col-xs-12 col-sm-4 col-md-12 col-lg-4" style={{ paddingLeft: "5px" }}>
                                <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Fase: </small>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6" style={{ paddingLeft: "5px" }}>
                                <span className="badge badge-success ek-sombra">{fase.Nombre}</span>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6"
                            style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 6, backgroundColor: "#ffffff" }} >
                            <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3" style={{ paddingLeft: "5px" }}>
                                <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Etapa: </small>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6" style={{ paddingLeft: "5px" }}>
                                <span className="badge badge-success ek-sombra">{etapa.Nombre}</span>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6"
                            style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 6, backgroundColor: "#ffffff" }} >
                            <div className="col-xs-12 col-sm-4 col-md-12 col-lg-4" style={{ paddingLeft: "5px" }}>
                                <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Proceso: </small>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6" style={{ paddingLeft: "5px" }}>
                                <span className="badge badge-success ek-sombra">{procesoNombre}</span>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6"
                            style={{ border: "1px solid #F0F0F0", cursor: "pointer", padding: 6, backgroundColor: "#ffffff" }} >
                            <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3" style={{ paddingLeft: "5px" }}>
                                <small style={{ whiteSpace: "nowrap", fontSize: "100%" }}> Estatus: </small>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6" style={{ paddingLeft: "5px" }}>
                                <span className="badge badge-success ek-sombra">{estatusVenta.Nombre}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Column>
        }
    });

    let VentaProcesoStat: any = global.connect(class extends React.Component<IExpedienteStat, {}> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        render(): JSX.Element {
            let item: any = global.getData(this.props.entidad);
            let estatusVenta: any = global.assign({}, item.EstatusVenta);
            let ventaProceso: any = global.assign({}, item.VentaProceso);
            let proceso: any = global.assign({}, ventaProceso.VentaProceso);
            let estatusProceso: any = global.assign({}, ventaProceso.EstatusProceso);
            let finalizado: boolean = estatusProceso.Clave === "U";
            let procesoNombre: string = !isEmptyObject(proceso) ? proceso.Nombre : "sin definir";

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="dashboard-stat2 bordered" style={{ margin: "0px", padding: "5px 10px 10px" }}>
                    <div className="display" style={{ marginBottom: "0px" }}>
                        <div className="number">
                            <h3 className="font-green-sharp">
                                <small className="font-blue-soft uppercase">{procesoNombre}</small>&nbsp;
                                {EK.UX.Labels.yes(finalizado)}
                            </h3>
                        </div>
                        <div className="icon" style={{ fontSize: "22px" }}>
                            <i className="icon-tag"></i>
                        </div>
                    </div>
                    <div className="table-scrollable table-custom">
                        <table className="table table-hover" cellPadding="0" cellSpacing="0" width="100%">
                            <tbody>
                                <tr>
                                    <td><small style={{ whiteSpace: "nowrap" }}> Estatus Venta: </small><span className="badge badge-info">{estatusVenta.Nombre}</span></td>
                                    <td><small style={{ whiteSpace: "nowrap" }}> Estatus Proceso: </small><span className="badge badge-info">{estatusProceso.Nombre}</span></td>
                                </tr>
                                <tr>
                                    <td><small style={{ whiteSpace: "nowrap" }}> Fecha Inicio: </small><span className="badge badge-info">{EK.UX.Labels.formatDate(ventaProceso.FechaInicio)}</span></td>
                                    <td><small style={{ whiteSpace: "nowrap" }}> Fecha Fin: </small><span className="badge badge-info">{EK.UX.Labels.formatDate(ventaProceso.FechaFin)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Column>
        }
    });

    //***View Mode***//

    interface IVenta extends page.IProps {
    };


 let View: any = global.connect(class extends React.Component<IVenta, {}> {
     constructor(props: IVenta) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.config = global.createPageConfigFromState(state.global),
            retValue.entidad = state.global.currentEntity;

            return retValue;
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let cliente: any = global.assign({});
            let estatusVenta: any = global.assign({});
            let expediente: any;
            let usaPaquete: boolean = false;
            let desarrollo: any;
            let moneda: any;
            let estatusExpediente: string = "";
            let motivoCancelacionExpediente: string = "";
            let tipoComercializacion: string = "";
            let tipoComercializacionClave: string = "";
            let fechaCancelacionExpediente: string = "";


            if (global.isSuccessful(this.props.entidad)) {
                cliente = global.assign({}, entidad.Cliente);
                estatusVenta = global.assign({}, entidad.EstatusVenta);
                expediente = global.assign({}, entidad.Expediente);
                usaPaquete = expediente.TipoComercializacion !== null ? expediente.TipoComercializacion.Paquete : false;
                estatusExpediente = expediente && expediente.EstatusExpediente ? expediente.EstatusExpediente.Clave : "";
                motivoCancelacionExpediente = expediente && expediente.MotivoCancelacion ? expediente.MotivoCancelacion.Nombre : "";
                tipoComercializacion = expediente && expediente.TipoComercializacion ? expediente.TipoComercializacion.Nombre : "";
                tipoComercializacionClave = expediente && expediente.TipoComercializacion ? expediente.TipoComercializacion.Clave : "";
                fechaCancelacionExpediente = expediente && expediente.Modificado? expediente.Modificado : null;

            };
            desarrollo = global.assign({}, entidad.Desarrollo);
            if (desarrollo) {
                moneda = global.assign({}, desarrollo.Moneda);
            };
            //-------------------------------//

            //let clasificadores: any = getData(this.props.config).Clasificadores;
            //let busquedaClasificador: any = (clave: any) => {
            //    let result: boolean = false;
            //    for (var i = 0; i < clasificadores.length; i++) {
            //        if (clasificadores[i].TipoClasificador.Clave == "PAQUETE" && clasificadores[i].Clasificador.Clave == clave) {
            //            result = true;
            //            break;
            //        }
            //    }
            //    return result;

            //};
            //let paquete: boolean = busquedaClasificador("PAQUETE");
           // let clasificadorPaquete: boolean = (paquete == true && usaPaquete == true) ? true : false;
            //-------------------------------//


            const listHeaderUbicaciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        {usaPaquete ?
                            <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                            : <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        }
                        {usaPaquete ?
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Paquete"}</Column>
                            : null
                        }
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header hidden-xs hidden-sm">{"Tipo Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Precio Venta"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>

            const listHeaderCaracteristicas: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Característica"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>

            const listHeaderFinanciamiento: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[9, 9, 9, 9]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>

            const listHeaderInstituciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Institución Financiera"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>

            const listHeaderFinanciamientoInstituciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Institución"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>

            const listHeaderInstitucionConceptos: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Concepto"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Estimado"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Real"}</Column>
                    </Row>
                </Column>




            //<label.Custom id="EstatusVenta" size={[12, 3, 3, 3]} value={(e: any) => { return e && e.EstatusVenta ? e.EstatusVenta.Nombre : ""; }} />
            return <page.View>
                <Column size={[12, 12, 12, 12]}
                    style={{
                    paddingLeft: 0,
                    paddingRight: 0}}>

                    {estatusExpediente == "PA" ?
                        <Row className={"ek-sombra"}
                            style={{
                                border: "solid 2px #eea236",
                                backgroundColor: "#f0ad4e",
                                margin: "0px 5px 5px 5px"
                            }}>
                            <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                                    <i className={"fa fa-info-circle"} style={{ marginRight: "5px", fontSize: "18px" }}></i>
                                    {"Cancelación de expediente por Autorizar"}
                                </span>
                            </Column>
                        </Row> : null}

                    {estatusExpediente == "C" ?
                        <Row className={"ek-sombra"}
                            style={{
                                border: "solid 2px #d43f3a",
                                backgroundColor: "#d9534f",
                                margin: "0px 5px 5px 5px"
                            }}>
                            <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                                    <i className={"fa fa-info-circle"} style={{ marginRight: "5px", fontSize: "18px" }}></i>
                                    {"Expediente Cancelado por " + motivoCancelacionExpediente + " en " + label.formatDate(fechaCancelacionExpediente)}
                                </span>
                            </Column>
                        </Row> : null}


                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={cliente.Nombre}
                        style={{
                            paddingLeft: 0,
                            paddingRight: 0}}
                        icon="fas fa-file-invoice-dollar" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Link id="IdExpediente" link={"#/scv/expedientes/:id"} size={[12, 1, 1, 1]} formatValue={(e: any) => { return { ID: e, Clave: e, Nombre: "" }; }} samePageNav={true} />
                            <label.Link id="Cliente" label="PROSPECTO/CLIENTE" size={[12, 9, 9, 9]} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} />

                            <EstatusVenta size={[12, 2, 2, 2]} />

                            <label.Link id="Desarrollo" link={"#/scv/desarrollos/:id"} size={[12, 4, 4, 4]} />

                            <label.Link id="TipoComercializacion" label="Tipo Comercialización" size={[12, 4, 4, 4]} link={"#/scv/clientes/:id"} />

                            <label.Link id="Agente" link={"#/kontrol/usuarios/:id"} size={[12, 4, 4, 4]} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.Apellidos].join(" ") }; }} />

                            <label.Entidad id="Moneda" link={"#/kontrol/monedas/:id"} size={[12, 3, 3, 3]} />
                            <label.Entidad id="Fase" size={[12, 3, 3, 3]} label="Fase"  />
                            <label.Entidad id="Etapa" size={[12, 3, 3, 3]} label="Etapa"  />
                            <label.Entidad id="Proceso" size={[12, 3, 3, 3]} label="Proceso" />

                        </Row>
                        <Row>
                            <div style={{ paddingTop: 15 }}>
                                {estatusVenta.Clave === "CO" ?
                                    <ViewCotizaciones size={[12, 12, 12, 12]} /> : null}
                            </div>
                            <page.SectionList
                                id={UBICACIONES_ID}
                                level={1}
                                title="Ubicaciones"
                                parent={config.id}
                                icon="fa fa-table"
                                size={[12, 12, 12, 12]}
                                listHeader={listHeaderUbicaciones}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                aggregate={(item: any, values: any) => {
                                    if (!values.ImporteMoneda) values.ImporteMoneda = 0;
                                    values.ImporteMoneda += item.ImporteMoneda ? item.ImporteMoneda : 0;
                                    return values;
                                } }
                                listFooter={(values: any) => {
                                    return <div>
                                        <Row>
                                            <Column size={[8, 8, 8, 8]} style={{ textAlign: "right" }}>{""}</Column>
                                            <Column size={[3, 3, 3, 3]} style={{ textAlign: "right" }}>

                                                <span style={{ fontSize: 12, fontWeight: 600, color: "gray", paddingRight: 30 }}>Valor Total de la Venta </span>
                                                <span className="badge badge-info list-footer-badge">
                                                    {global.formatMoney(values.ImporteMoneda, moneda)}
                                                </span>
                                            </Column>
                                        </Row>
                                    </div>;
                                } }
                                formatter={(index: number, item: any) => {
                                    let ubicacion: any = item.Ubicacion;
                                    let caracteristicas: DataElement = global.createSuccessfulStoreObject(item.Caracteristicas).getActiveItems();
                                    let length: number = global.getData(caracteristicas, []).length;

                                    let precioVenta: any = item.PrecioVenta ? item.PrecioVenta.Clave : "O";
                                    let className: string = "";
                                    let classNameO: string = "";
                                    let style: React.CSSProperties = {};
                                    style.backgroundColor = "";
                                    let styleO: React.CSSProperties = {};
                                    style.backgroundColor = "";
                                    let classNameD: string = "";

                                    if (precioVenta == "O") {
                                        styleO.backgroundColor = "#36d35f"
                                        classNameO = "badge badge-info";
                                    } else {
                                        style.backgroundColor = "#36d35f"
                                        className = "badge badge-info";
                                    }
                                    if (item.Diferencia < 0) {
                                        classNameD = "badge badge-danger";
                                    }
                                    return <Row id={"row_ubicacion_" + item.Ubicacion.Clave} className="panel-collapsed" >
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                            <Row >
                                                <Column size={[2, 1, 1, 1]} className="listItem-center-item">
                                                    <CollapseButton idElement={"row_ubicacion_" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                </Column>
                                                {usaPaquete ?
                                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item hidden-xs hidden-sm">{item.Paquete !== null ? item.Paquete.Nombre : ""}</Column>
                                                    : <Column size={[1, 1, 1, 1]} className="listItem-default-item hidden-xs hidden-sm">{""}</Column>
                                                    }
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>
                                                    <span className="bold">{item.Ubicacion.Clave}</span>
                                                </Column>
                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-info">{item.Ubicacion.Nombre}</span></Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item hidden-xs hidden-sm">{item.Ubicacion.TipoUbicacion.Nombre}</Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{item.Ubicacion.Prototipo.Nombre}</Column>
                                                <Column size={[1, 1, 1, 1]} ><div><span className="badge badge-info" style={{ backgroundColor: "#36d35f" }}>{precioVenta}</span></div></Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-item">
                                                    {global.formatMoney(item.ImporteMoneda, moneda)}
                                                    {item.ImporteOriginalMoneda>0 && (item.ImporteMoneda != item.ImporteOriginalMoneda) ?
                                                        <span style={{ color: "#FFAB40", fontWeight: 700 }} className="fal fa-asterisk"></span> : null
                                                    }
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-header"></Column>
                                            </Row>
                                        </Column>
                                        <Row id={"row_ubicacion" + index}>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <div className="note note-sucess" style={{ padding: "5px 0px", margin: 0, border: "none" }}>
                                                    <Row style={{ padding: "5px 15px" }} id={"row_ubicacion_p" + item.Ubicacion.Clave} className="panel-collapsed">
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                            <CollapseButton idElement={"row_ubicacion_p" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                        </Column>
                                                        <Column size={[6, 6, 6, 6]}><span>PRECIO DE UBICACIÓN</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ImporteUbicacion, global.getData(this.props.entidad).Desarrollo.Moneda)}</Column>
                                                        <Row>
                                                            <Column
                                                                xs={{ size: 10 }}
                                                                sm={{ size: 10, offset: 1 }}
                                                                md={{ size: 10, offset: 1 }}
                                                                lg={{ size: 10, offset: 1 }}
                                                                className="panel-detail well well-sm"
                                                                style={{ paddingLeft: "10px", paddingRight: "50px", marginLeft: "200px", marginRight: "0px", width:"760px" }}>
                                                                <div className="note note-sucess" style={{ padding:"5px", margin: "0px", border: "none"}}>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span>VALOR AVALÚO</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={className} style={style}>{global.formatMoney(item.ValorAvaluo, global.getData(this.props.entidad).Desarrollo.Moneda)}</span></Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span>VALOR OPERATIVO</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={classNameO} style={styleO}>{global.formatMoney(item.ValorOperativo, global.getData(this.props.entidad).Desarrollo.Moneda)}</span></Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span style={{ color: "#808080", paddingLeft: "30px" }}>PRECIO DE UBICACIÓN</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600, color: "#808080" }}>{global.formatMoney(item.ImporteUbicacion, global.getData(this.props.entidad).Desarrollo.Moneda)}</Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span style={{ color: "#808080", paddingLeft: "30px" }}>TOTAL DE CARACTERÍSTICAS</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600, color: "#808080" }}>{global.formatMoney(item.TotalCaracteristicas, global.getData(this.props.entidad).Desarrollo.Moneda)}</Column>
                                                                    </Row>
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                                        <Column size={[6, 6, 6, 6]}><span>DIFERENCIA</span></Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={classNameD}>{global.formatMoney(item.Diferencia, global.getData(this.props.entidad).Desarrollo.Moneda)}</span></Column>
                                                                    </Row>
                                                                </div>
                                                            </Column>
                                                        </Row>
                                                    </Row>
                                                    {ubicacion.Excedente ?
                                                        <Row style={{ padding: "5px 15px" }}>
                                                            <Column size={[2, 2, 2, 2]}></Column>

                                                            <Column size={[4, 4, 4, 4]}>

                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span>METROS<sup>2</sup></span>
                                                                    </Column>
                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span className="badge badge-danger pull-right" style={{ marginBottom: "7px", fontSize: "12px !important", fontWeight: 700 }}>{ubicacion.Excedente}&nbsp;m<sup>2</sup></span>
                                                                    </Column>
                                                                </Column>

                                                                <Column size={[12, 12, 12, 12]}>

                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span>EXCEDENTE</span>
                                                                    </Column>
                                                                    <Column size={[12, 6, 6, 6]}>
                                                                        <span className="badge badge-success pull-right" style={{fontSize: "12px !important", fontWeight: 700 }}>
                                                                            {global.formatMoney(item.PrecioExcedente, global.getData(this.props.entidad).Desarrollo.Moneda)}
                                                                        </span>
                                                                    </Column>
                                                                </Column>

                                                            </Column>
                                                            <Column size={[6, 6, 6, 6]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ValorExcedente, global.getData(this.props.entidad).Desarrollo.Moneda)}</Column>
                                                                    
                                                        </Row> : null
                                                    }
                                                </div>
                                                <List
                                                    id={this.props.id + "_list"}
                                                    items={caracteristicas}
                                                    readonly={true}
                                                    listHeader={listHeaderCaracteristicas}
                                                    addRemoveButton={false}
                                                    formatter={(index_c: number, item_c: any): any => {
                                                        if (item_c.VentaOpcional === true) {
                                                            return <Row id={"row_ubicacion" + index_c}>
                                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-warning">Incluida</span></Column>
                                                                <Column size={[10, 10, 10, 10]}>{item_c.Caracteristica.Nombre}</Column>
                                                            </Row>
                                                        }
                                                        else {
                                                            return <Row id={"row_ubicacion" + index_c}>
                                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-info">Adicional</span></Column>
                                                                <Column size={[8, 8, 8, 8]}>{item_c.Caracteristica.Nombre}</Column>
                                                                <Column size={[2, 2, 2, 2]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item_c.Importe, global.getData(this.props.entidad).Desarrollo.Moneda)}</Column>
                                                            </Row>
                                                        }
                                                    } } />
                                            </Column>
                                        </Row>
                                    </Row>
                                } }>
                            </page.SectionList>
                            <page.SectionList
                                id={FINANCIAMIENTO_ID}
                                level={1}
                                parent={config.id}
                                icon="fa fa-table"
                                size={[12, 12, 12, 12]}
                                listHeader={listHeaderFinanciamiento}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                formatter={(index: number, item: any) => {
                                    let instituciones: global.DataElement = global.createSuccessfulStoreObject(item.FinanciamientoInstituciones).getActiveItems();
                                    let length: number = global.getData(instituciones, []).length;
                                    let importeFinanciamiento: number = 0;

                                    if (instituciones && length) {
                                        let _instituciones: any[] = global.getData(instituciones, []);

                                        _instituciones.forEach((value: any, index: number) => {
                                            importeFinanciamiento += parseFloat(value.MontoCredito);
                                        });
                                    }

                                    return <Row id={"row_financiamiento_" + index} className="panel-collapsed">
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_financiamiento_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                </Column>
                                                <Column size={[9, 9, 9, 9]} className="listItem-default-header bold">
                                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>{item.Financiamiento.Nombre}
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                                    <span className="badge badge-info list-footer-badge">{global.formatMoney(importeFinanciamiento, global.getData(this.props.entidad).Desarrollo.Moneda)}</span>
                                                </Column>
                                                <Column size={[1, 1, 1, 1]}></Column>
                                            </Row>
                                        </Column>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <List
                                                    items={instituciones}
                                                    readonly={true}
                                                    listHeader={listHeaderFinanciamientoInstituciones}
                                                    addRemoveButton={false}
                                                    formatter={(index_i: number, item: any): any => {
                                                        let conceptos: global.DataElement = global.createSuccessfulStoreObject(item.Conceptos).getActiveItems();

                                                        return <Row id={"row_financiamiento_" + index_i}>
                                                            <Row id={"row_instituciones_" + item.Institucion.Clave} className="panel-collapsed">
                                                                <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                                    <Row>
                                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                                            <CollapseButton idElement={"row_instituciones_" + item.Institucion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                                        </Column>
                                                                        <Column size={[9, 9, 9, 9]}>
                                                                            <div className="listItem-default-header bold">{item.Institucion.Nombre}</div>
                                                                            <div className="listItem-default-header italic">{item.Comentarios}</div>
                                                                        </Column>
                                                                        <Column size={[2, 2, 2, 2]} className="listItem-right-header bold">
                                                                            {global.formatMoney(item.MontoCredito, global.getData(this.props.entidad).Desarrollo.Moneda)}
                                                                        </Column>
                                                                    </Row>
                                                                </Column>
                                                                <Row>
                                                                <Column
                                                                    xs={{ size: 10 }}
                                                                    sm={{ size: 10, offset: 1 }}
                                                                    md={{ size: 10, offset: 1 }}
                                                                    lg={{ size: 10, offset: 1 }}
                                                                    className="panel-detail well well-sm">
                                                                    <List
                                                                        items={conceptos}
                                                                        readonly={true}
                                                                        listHeader={listHeaderInstitucionConceptos}
                                                                        addRemoveButton={false}
                                                                        formatter={(index_c: number, item: any): any => {
                                                                            let style: React.CSSProperties = {};
                                                                            style.padding = "5px 0px";
                                                                            style.backgroundColor = item.Credito === true && item.Concepto.TipoConcepto.Clave === "IMP" ? "#E3E4F9" : null;

                                                                            return <Row id={"row_concepto_" + index_c}>
                                                                                <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                                                    <Row style={style}>
                                                                                        <Column size={[6, 6, 6, 6]} className="listItem-default-header bold">{item.Concepto.Nombre}</Column>
                                                                                        <ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorEstimado} />
                                                                                        <ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorAutorizado} />
                                                                                    </Row>
                                                                                </Column>
                                                                            </Row>
                                                                        }} />
                                                                </Column>
                                                                </Row>
                                                            </Row>
                                                        </Row>
                                                    } } />
                                            </Column>
                                        </Row>
                                    </Row>
                                } }>
                            </page.SectionList>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <EK.Modules.SCV.Pages.Ventas.PlanPagosView viewmode={true} />
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ textAlign: "right" }}>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#84a950", alignmentBaseline: true }}></label><span>PAGADOS</span><span>   </span>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#000000" }}></label> <label>POR PAGAR</label><span>   </span>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#ea5353" }}></label> <label>CANCELADOS</label><span>   </span>
                                <label style={{ fontWeight: "bold", width: 10, height: 10, background: "#f0882f" }}></label> <label>ABONOS</label><span>   </span>
                            </Column>
                        </Row>

                        <Row>

                            <EK.Modules.SCV.Pages.Expedientes.PlanPagos tipoEntidad="VENTA" />

                        </Row>
                    </page.OptionSection>
                </Column>

                {expediente && expediente.ID ?
                    <KontrolLogBookManager
                        idEntidadPadre={expediente.ID}
                        claveEntidadPadre={"Expediente"}
                        modulo={"Expediente"}
                        viewMode={false}
                        addNewItem={"SO"} /> : null
                }

            </page.View>;
        }
    });

    interface IEditCotizacionesProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        obtenerCotizacion?: (item: any, idExpediente: number, cotizaciones: any[]) => void;
    };

    interface IEditCotizacionesState {
        isNew?: boolean;
    };

    let EditCotizaciones: any = global.connect(class extends React.Component<IEditCotizacionesProps, IEditCotizacionesState> {
        constructor(props: IEditCotizacionesProps) {
            super(props);
            let isNew: boolean = false;

            let cotizaciones: any[] = global.getData(props.config.getCatalogo(COTIZACIONES_ID), []);
            let items: any[] = cotizaciones.filter((value) => { return value.ID < 0; });
            if (items && items.length) isNew = true;
            this.EnviarCotizacion = this.EnviarCotizacion.bind(this);
            this.dispatchItem = this.dispatchItem.bind(this);

            this.state = { isNew };
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerCotizacion: (item: any, idExpediente: number, cotizaciones: any[]): void => {
                let data: any = global.assign({ item, idExpediente, cotizaciones });
                config.dispatchEntityBase(data, "ventas/SetCotizacion", undefined, global.HttpMethod.POST);
            }
        });
        EnviarCotizacion(item: any, accion: string): void {
            let ml: any = config.getML();
            if (accion === "IMPRIMIR") {
                let entidad: any = global.getData(this.props.entidad);
                let win = window.open(["ventas/imprimir/cotizacion/", entidad.ID, "/", entidad.IdExpediente].join(""), "_blank")
            }
            else if (accion == "ENVIAR") {
                let parametros: any = global.assign({ idCotizacion: item.ID, idExpediente: item.IdExpediente });
                let encodedFilters: string = global.encodeObject(parametros);

                global.asyncGet("base/scv/ventas/Get/EnviarCotizacion/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        success(ml.mensajes.cotizacionCargando);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        success(ml.mensajes.cotizacionEnviada);
                    }
                });

            }

        }
        componentDidMount(): void {
            let entidad: any = global.getData(this.props.entidad);

            let estatusVenta: any = global.assign({}, entidad.EstatusVenta);
            if (estatusVenta.Clave === "CO") {
                let cotizaciones: any[] = global.getData(this.props.config.getCatalogo(COTIZACIONES_ID), []);
                let selectedItem: boolean = false;

                let items: any[] = cotizaciones.filter((value) => { return value.ID === entidad.ID });
                if (items && items.length) selectedItem = true;

                this.props.config.setState({ selectedItem });
            }
        };
        shouldComponentUpdate(nextProps: IEditCotizacionesProps, nextState: IEditCotizacionesState): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) || (this.state.isNew !== nextState.isNew);
        };
        dispatchItem(item: any): void {
            let idExpediente: number = global.getData(this.props.entidad).IdExpediente;
            let cotizaciones: any = global.getData(Forms.getValue(COTIZACIONES_ID, config.id));
            this.props.obtenerCotizacion(item, idExpediente, cotizaciones);
            this.props.config.setState({ selectedItem: true });
        }
        onClick(item: any, confirm: boolean): void {
            if (confirm) {
                EK.Global.confirm("Si selecciona otra cotización ahora, los cambios se perderán", "Confirmar Cotización", () => {
                    this.dispatchItem(item);
                });
            } else {
                this.dispatchItem(item);
            }
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let isNew: boolean = this.state.isNew;

            let entidad: any = global.getData(this.props.entidad);

            let allowCotizar: boolean = Boolean(entidad.AllowToCotizar);
            let hideNewButton: boolean = !allowCotizar || (allowCotizar && isNew);
            let visible: boolean = true;
            let element: any[] = entidad.Cotizaciones;
            if (element !== null) {
                element.forEach((value: any, index: number) => {
                    if (value.EstatusVenta.Clave == "SE") {
                        visible = false;
                    };
                });
            };

            let fnValidateDate = function (v: any, values?: any): boolean {
                if (v) {
                    let fecha: Date = v;
                    var today: Date = new Date(),
                        date = today.getDate() + '-' + (today.getMonth()) + '-' + today.getFullYear();
                    if (fecha < today) {
                        return false
                    }
                    return true;
                }
                return true;
            }

            const listHeaderCotizaciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"ID"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Vencimiento"}</Column>
                        <Column size={[1, 1, 1, 1]}  className="list-default-header">{"Seleccionada"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>

            return <page.SectionList
                    id={COTIZACIONES_ID}
                    parent={config.id}
                    icon="glyphicon glyphicon-th"
                    level={1}
                    readonly={false}
                    title="Cotizaciones"
                    listHeader={listHeaderCotizaciones}
                    items={createSuccessfulStoreObject([])}
                    addRemoveButton={false}
                    size={[12, 12, 12, 12]}
                    hideNewButton={hideNewButton}
                    mapFormToEntity={(form: EditForm, entidades?: any): any => {
                        let retValue: any = form
                            .addID()
                            .addNombre()
                            .addDate("FechaVigencia")
                            .toObject();

                        let e: any[] = entidades;
                        if (e && e.length > 0) {
                            e.forEach((value: any, index: number): any => {
                                if (value.ID === retValue.ID) {
                                    retValue.ID = value.ID;
                                    retValue._found = true;
                                };
                            });
                        };

                        return retValue;
                    } }
                    formatter={(index: number, item: any) => {
                        let focused: boolean = item.ID == entidad.ID;
                        let className: string;

                        if (allowCotizar === true) {
                            className = focused ? "fa fa-pencil" : "fa fa-circle-o";
                        } else {
                            className = focused ? "fa fa-circle" : "fa fa-circle-o";
                        }

                        let style: React.CSSProperties = {};
                        style.padding = "5px 0px";
                        style.margin = "0px"
                        style.color = "#333";
                        style["borderRadius"] = 3;
                        if (focused) {
                            style.color = "#fff";
                            style.backgroundColor = "#FFAB40";
                            style.fontWeight = 600;
                        };

                        let estatusVenta: any = global.assign({}, item.EstatusVenta);
                        let seleccionada: boolean = estatusVenta.Clave === "SE";

                        let extraData: any[] = [buttons.PopOver.edit];
                        if (item.ID < 0 || item.Estado === 1) {
                            extraData.push(buttons.PopOver.remove);
                        }
                        let moneda: any = item.Desarrollo && item.Desarrollo.Moneda ? item.Desarrollo.Moneda : null;
                        return <Row>
                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                <Row style={style}>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        {visible ?
                                            <button tabIndex={0} id={"button_" + item.ID} className="btn btn-ellipsis" onClick={(e) => this.onClick(item, allowCotizar)}><i className={className}></i>
                                            </button> : EK.UX.Labels.yes(seleccionada)}
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-defaul">{item.ID === undefined || item.ID <= 0 ? "" : item.ID}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-defaul">{item.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-defaul">
                                        {EK.UX.Labels.formatDate(item.FechaVigencia)}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]}  className="listItem-default-defaul">
                                        {EK.UX.Labels.formatDate(item.FechaSeleccion)}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-right-defaul">
                                        {global.formatMoney(Number(item.Importe), moneda)}
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-right-defaul" style={{ marginTop: "-5px" }}>
                                        <button onClick={(e) => this.EnviarCotizacion(item, 'ENVIAR')} className="btn btn-circle btn-icon-only"><i className="fas fa-envelope"></i></button>
                                        <button onClick={(e) => this.EnviarCotizacion(item, 'IMPRIMIR')} className="btn btn-circle btn-icon-only"><i className="fas fa-print"></i></button>
                                    </Column>
                                    {allowCotizar ?
                                        <buttons.PopOver idParent={config.id} idForm={COTIZACIONES_ID} info={item} extraData={extraData} /> : null}

                                </Row>
                            </Column>
                        </Row>
                    } }
                    onAfterSave={(item?: any, entidades?: global.DataElement): any => {
                        let model: any = item;

                        if (model.ID !== entidad.ID)
                        {
                            this.dispatchItem(item);
                        }

                    } }>
                    <Row>
                        <input.Nombre id="Nombre" size={[12, 12, 10, 10]} idFormSection={COTIZACIONES_ID} required={true} validations={[validations.required()]} maxLength={255} />
                        <input.Date id="FechaVigencia" size={[12, 12, 2, 2]} idFormSection={COTIZACIONES_ID} validations={[validations.required(), validations.custom("", "La fecha no es válida.", ["FechaVencimiento"], fnValidateDate)]} />
                    </Row>
                </page.SectionList>
        }
    });

    let ViewCotizaciones: any = global.connect(class extends React.Component<IEditCotizacionesProps, {}> {
        constructor(props: IEditCotizacionesProps) {
            super(props);
            this.EnviarCotizacion = this.EnviarCotizacion.bind(this);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerCotizacion: (item: any, idExpediente: number, cotizaciones: any[]): void => {
                let data: any = global.assign({ item, idExpediente, cotizaciones });
                config.dispatchEntityBase(data, "ventas/SetCotizacion", undefined, global.HttpMethod.POST);
            }
        });
        dispatchItem(item: any): void {
            let idExpediente: number = global.getData(this.props.entidad).IdExpediente;
            let cotizaciones: any = global.getData(Forms.getValue(COTIZACIONES_ID, config.id));
            this.props.obtenerCotizacion(item, idExpediente, cotizaciones);
            this.props.config.setState({ selectedItem: true });
        };
        EnviarCotizacion(item: any, accion: string): void {
            let ml: any = config.getML();
            if (accion === "IMPRIMIR") {
                let entidad: any = global.getData(this.props.entidad);
                let win = window.open(["ventas/imprimir/cotizacion/", entidad.ID, "/", entidad.IdExpediente].join(""), "_blank")
            }
            else if (accion == "ENVIAR")
            {
                let parametros: any = global.assign({ idCotizacion: item.ID,idExpediente:item.IdExpediente });
                let encodedFilters: string = global.encodeObject(parametros);

                global.asyncGet("base/scv/ventas/Get/EnviarCotizacion/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        success(ml.mensajes.cotizacionCargando);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        success(ml.mensajes.cotizacionEnviada);
                    }
                });

            }

        }
        componentDidMount(): void {
            let entidad: any = global.getData(this.props.entidad);

            let estatusVenta: any = global.assign({}, entidad.EstatusVenta);
            if (estatusVenta.Clave === "CO") {
                let cotizaciones: any[] = global.getData(this.props.config.getCatalogo(COTIZACIONES_ID), []);
                let selectedItem: boolean = false;

                let items: any[] = cotizaciones.filter((value) => { return value.ID === entidad.ID });
                if (items && items.length) selectedItem = true;

                this.props.config.setState({ selectedItem });
            }
        };
        shouldComponentUpdate(nextProps: IEditCotizacionesProps, {}): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let entidad: any = global.getData(this.props.entidad);
            let visible: boolean = true;
            let element: any[] = entidad.Cotizaciones;
            if (element !== null) {
                element.forEach((value: any, index: number) => {
                    if (value.EstatusVenta.Clave === "SE") {
                        visible = false;
                    };
                });
            }

            const listHeaderCotizaciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"ID"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Vencimiento"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Seleccionada"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <page.SectionList
                    id={COTIZACIONES_ID}
                    parent={config.id}
                    icon="glyphicon glyphicon-th"
                    level={1}
                    readonly={false}
                    title="Cotizaciones"
                    listHeader={listHeaderCotizaciones}
                    items={createSuccessfulStoreObject([])}
                    addRemoveButton={false}
                    size={[12, 12, 12, 12]}
                    formatter={(index: number, item: any) => {
                        let focused: boolean = item.ID == entidad.ID;

                        let className: string = focused ? "fa fa-circle" : "fa fa-circle-o";

                        let style: React.CSSProperties = {};
                        style.padding = "5px 0px";
                        style.margin = "0px"
                        style.color = "#333";
                        style["borderRadius"] = 3;
                        if (focused) {
                            style.color = "#fff";
                            style.backgroundColor = "#FFAB40";
                            style.fontWeight = 600;
                        };

                        let estatusVenta: any = global.assign({}, item.EstatusVenta);
                        let seleccionada: boolean = estatusVenta.Clave === "SE";

                        return <Row>
                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                <Row style={style}>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        {visible ?
                                            <button tabIndex={0} id={"button_" + item.ID} className="btn btn-ellipsis" onClick={(e) => this.dispatchItem(item)}><i className={className}></i>
                                            </button> : EK.UX.Labels.yes(seleccionada)}
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.ID}</Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-header">{item.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                        {EK.UX.Labels.formatDate(item.FechaVigencia)}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-header">
                                        {EK.UX.Labels.formatDate(item.FechaSeleccion)}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                        {global.formatMoney(Number(item.Importe), item.Desarrollo.Moneda)}
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-right-defaul" style={{ marginTop: "-5px" }}>
                                        <button onClick={(e) => this.EnviarCotizacion(item,'ENVIAR')} className="btn btn-circle btn-icon-only"><i className="fas fa-envelope"></i></button>
                                        <button onClick={(e) => this.EnviarCotizacion(item,'IMPRIMIR')} className="btn btn-circle btn-icon-only"><i className="fas fa-print"></i></button>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    } }>
                </page.SectionList>
            </Column>
        }
    });

    /********************************************************** FINANCIAMIENTO **********************************************************/

    interface IFinanciamientosDDLProps extends EK.UX.DropDownLists.IDropDrownListProps {
        idDesarrollo?: number;
    };

    class Financiamientos$DDL extends React.Component<IFinanciamientosDDLProps, EK.UX.DropDownLists.IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.DESARROLLO$FINANCIAMIENTOS
        });
        static defaultProps: IFinanciamientosDDLProps = {
            id: "Financiamiento",
            items: global.createDefaultStoreObject([]),
            label: "Financiamiento",
            helpLabel: "Seleccione el Financiamiento",
            value: global.createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                if (this.props.idDesarrollo > 0) {
                    let idDesarrollo: number = Number(this.props.idDesarrollo);
                    let encodedFilters: string = global.encodeObject({ idDesarrollo, kv: 1 });
                    global.dispatchAsync("load::DESARROLLO$FINANCIAMIENTOS", "base/scv/desarrollos/Get/GetAllDesarrollosFinanciamientos/" + encodedFilters);
                }
            }
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    const FinanciamientosDDL: any = ReactRedux.connect(Financiamientos$DDL.props, null)(Financiamientos$DDL);

    interface ITFInstitucionesProps extends EK.UX.DropDownLists.IDropDrownListProps {
        financiamiento?: DataElement;
    };

    class TFInstituciones$DDL extends React.Component<ITFInstitucionesProps, EK.UX.DropDownLists.IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.FINANCIAMIENTO$INSTITUCIONES,
            financiamiento: Forms.getDataValue("Financiamiento", FINANCIAMIENTO_ID, state, {})
        });
        static defaultProps: ITFInstitucionesProps = {
            id: "Institucion",
            items: global.createDefaultStoreObject([]),
            label: "Institución de Crédito",
            helpLabel: "Seleccione la Institución de Crédito",
            value: global.createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };
        componentWillReceiveProps(nextProps: ITFInstitucionesProps): void {
            if (global.hasChanged(this.props.financiamiento, nextProps.financiamiento)) {
                let encodedFilters: string = global.encodeObject({ idFinanciamiento: global.getData(nextProps.financiamiento).ID });
                global.dispatchAsync("load::FINANCIAMIENTO$INSTITUCIONES", "base/scv/ventas/Get/GetTFInstituciones/" + encodedFilters);
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
            };
            let encodedFilters: string = global.encodeObject({ idFinanciamiento: global.getData(this.props.financiamiento).ID });
            global.dispatchAsync("load::FINANCIAMIENTO$INSTITUCIONES", "base/scv/ventas/Get/GetTFInstituciones/" + encodedFilters);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    const TFInstitucionesDDL: any = ReactRedux.connect(TFInstituciones$DDL.props, null)(TFInstituciones$DDL);

    interface ITFInstitucionesDetalleProps extends React.Props<any> {
        item?: DataElement;
        items?: DataElement;
        financiamiento?: any;
        config?: page.IPageConfig;
    };

    class TFInstituciones$Detalle extends React.Component<ITFInstitucionesDetalleProps, ITFInstitucionesDetalleProps> {
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            item: state.global.currentEntity,
            items: state.global.FINANCIAMIENTO$INSTITUCIONES,
            financiamiento: Forms.getDataValue("Financiamiento", FINANCIAMIENTO_ID, state, {})
        });
        static defaultProps: ITFInstitucionesDetalleProps = {
        };
        componentWillReceiveProps(nextProps: ITFInstitucionesDetalleProps): void {
        };
        componentDidMount(): void {
        };
        render(): any {
            let desarrollo: any;
            let expediente: any;
            let idDesarrollo: number;
            let venta: any = global.getData(this.props.item);
            //
            if (global.isSuccessful(this.props.item)) {
                desarrollo = global.assign({}, venta.Desarrollo);
                idDesarrollo = Number(desarrollo.ID);
                expediente = global.assign({}, venta.Expediente);
            };
            //
            const listHeaderInstituciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Institución"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-right-header">{"Crédito"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>;
            //
            const listHeaderInstitucionConceptos: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Concepto"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Estimado"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-center-header">{"Real"}</Column>
                    </Row>
                </Column>;
            //
            let editInstitucion: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    //
                    let conceptos: any[] = item.Conceptos;
                    if (conceptos === null || conceptos === undefined) {
                        conceptos = [];
                    }
                    //
                    global.dispatchFullSuccessful("global-page-data", conceptos, CONCEPTOS_CREDITO_ID, 0, "");
                    //
                    if (item !== null && item !== undefined && item.ID >= 0) {
                        config.setState({ viewMode: false, isNew: null }, INSTITUCIONES_ID);
                    } else {
                        config.setState({ viewMode: false, isNew: true }, INSTITUCIONES_ID);
                    }
                }
            };
            //
            let onChangeTFI: any = (item: any): void => {
                let idTFInstitucion: number = Number(item.IdTFInstitucion);
                let encodedFilters: string = global.encodeObject({ idTFInstitucion });
                //
                global.dispatchAsync("global-page-data", "base/scv/ventas/Get/GetInstitucionConceptos/" + encodedFilters, CONCEPTOS_CREDITO_ID);
                Forms.updateFormElement(INSTITUCIONES_ID, "MontoCredito", 0.0);
            };
            //
            return <page.SectionList
                id={INSTITUCIONES_ID}
                parent={FINANCIAMIENTO_ID}
                title="Instituciones de Crédito"
                icon="fa fa-table"
                level={1}
                listHeader={listHeaderInstituciones}
                size={[12, 12, 12, 12]}
                style={{ marginTop: 10 }}
                addRemoveButton={false}
                items={createSuccessfulStoreObject([])}
                inlineEdit={false}
                readonly={false}
                onAddNew={() => {
                    Forms.remove(INSTITUCIONES_ID);
                    Forms.updateFormElement(INSTITUCIONES_ID, "MontoCredito", 0.0);
                    global.dispatchSuccessful("global-page-data", [], CONCEPTOS_CREDITO_ID);

                    this.props.config.setState({ viewMode: false, isNew: true }, INSTITUCIONES_ID);
                }}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("Institucion")
                        .addNumber("MontoCredito")
                        .addString("Comentarios")
                        .addObject("Conceptos", CONCEPTOS_CREDITO_ID)
                        .addVersion()
                        .toObject();

                    if (retValue && retValue.Conceptos && retValue.Conceptos.length > 0) {
                        let conceptos: any[] = retValue.Conceptos;
                        //
                        retValue.Conceptos = conceptos.map((value: any, index: number): any => {
                            let v: any = global.assign(value);
                            //
                            if (v.ValorEstimado) {
                                if (v.ValorEstimado.constructor.name === "Object") {
                                    v.ValorEstimado = JSON.stringify(v.ValorEstimado);
                                }
                            }
                            //
                            if (v.ValorAutorizado) {
                                if (v.ValorAutorizado.constructor.name === "Object") {
                                    v.ValorAutorizado = JSON.stringify(v.ValorAutorizado);
                                }
                            }
                            //
                            return v;
                        });
                    };

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    let conceptos: global.DataElement = global.createSuccessfulStoreObject(item.Conceptos).getActiveItems();
                    let length: number = global.getData(conceptos, []).length;

                    return <Row id={"row_institucion_" + index} className="panel-collapsed">
                        <Column size={[12, 12, 12, 12]}>
                            <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    <CollapseButton idElement={"row_institucion_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                </Column>
                                <Column size={[8, 8, 8, 8]} className="listItem-default-header">
                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>
                                    <span className="bold">{item.Institucion.Nombre}</span><br />
                                    <span className="italic">{item.Comentarios}</span>
                                </Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-right-header bold">
                                    <span className="badge badge-info list-footer-badge">{global.formatMoney(item.MontoCredito, global.getData(this.props.item).Desarrollo.Moneda)}</span>
                                </Column>
                                <Column size={[1, 1, 1, 1]}>
                                    <buttons.PopOver idParent={FINANCIAMIENTO_ID} idForm={INSTITUCIONES_ID} info={item} extraData={[editInstitucion, buttons.PopOver.remove]} />
                                </Column>
                            </Row>
                        </Column>
                        <Row>
                            <Column
                                xs={{ size: 10 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 10, offset: 1 }}
                                className="panel-detail well well-sm">
                                <List
                                    items={conceptos}
                                    readonly={true}
                                    listHeader={listHeaderInstitucionConceptos}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any): any => {
                                        let style: React.CSSProperties = {};
                                        style.padding = "5px 0px";
                                        style.backgroundColor = item.Credito === true && item.Concepto.TipoConcepto.Clave === "IMP" ? "#E3E4F9" : null;

                                        return <Row>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                <Row style={style}>
                                                    <Column size={[6, 6, 6, 6]} className="listItem-default-header bold">{item.Concepto.Nombre}</Column>
                                                    <ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorEstimado} />
                                                    <ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorAutorizado} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    }} />
                            </Column>
                        </Row>
                    </Row>
                }}>
                <Row>
                    <TFInstitucionesDDL size={[8, 8, 8, 8]} idFormSection={INSTITUCIONES_ID} validations={[validations.required()]} required={true} change={onChangeTFI} />
                    <LabelMontoCredito />
                    <input.Text id="Comentarios" label="Comentarios" size={[12, 12, 12, 12]} maxLength={250} idFormSection={INSTITUCIONES_ID} required={false} />
                    <InstitucionConceptos desarrollo={desarrollo} />
                </Row>
            </page.SectionList>
        };
    };
    const TFInstitucionesDetalle: any = ReactRedux.connect(TFInstituciones$Detalle.props, null)(TFInstituciones$Detalle);

    interface IInstitucionConceptosProps extends page.IProps {
        conceptos?: global.DataElement;
        desarrollo?: any;
    };

    interface IInstitucionConceptosState {
        editEstimado: boolean;
        editReal: boolean;
    };

    //{componente para desplegar las instituciones y los conceptos de crédito}
    class $InstitucionConceptos extends React.Component<IInstitucionConceptosProps, IInstitucionConceptosState>{
        constructor(props: IInstitucionConceptosProps) {
            super(props);
            this.state = { editEstimado: false, editReal: false };
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            conceptos: state.global.catalogo$Institucion$Conceptos,
            state: state.global.state$Institucion$Conceptos
        });
        static defaultProps: IInstitucionConceptosProps = {
            conceptos: global.createSuccessfulStoreObject([])
        };
        componentDidMount(): void {
            let entidad: any = global.getData(this.props.entidad);
            let editEstimado: boolean = entidad.EstatusVenta.Clave === "CO" || entidad.EstatusVenta.Clave === "D";
            let editReal: boolean = entidad.EstatusVenta.Clave === "RE" || entidad.EstatusVenta.Clave === "F";

            this.setState({ editEstimado, editReal });
        };
        shouldComponentUpdate(nextProps: IInstitucionConceptosProps, nextState: IInstitucionConceptosState): boolean {
            return hasChanged(this.props.conceptos, nextProps.conceptos) || hasChanged(this.props.state, nextProps.state) ||
                this.state.editEstimado != nextState.editEstimado || this.state.editReal != nextState.editReal
        };
        fnAddValores(id: string, form: global.EditForm, tipoCC: any): void {
            let value: any = Forms.getValue(id, CONCEPTOS_CREDITO_ID);

            if (value === null || value === undefined || $.trim(value) === "") {
                return;
            }

            if (tipoCC) {
                if (tipoCC.Clave === "IMP") {
                    let numero: number = Number(value);
                    form.addStringConst(id, numero.toString());
                } else if (tipoCC.Clave === "NUM") {
                    let numero: number = Number(value);
                    form.addStringConst(id, numero.toString());
                } else if (tipoCC.Clave === "LOG") {
                    let logico: boolean = Boolean(value).valueOf();
                    form.addStringConst(id, logico.toString());
                } else if (tipoCC.Clave === "FECHA") {
                    let fecha: Date = new Date(value);
                    form.addStringConst(id, fecha.toISOString());
                } else if (tipoCC.Clave === "TEX") {
                    form.addString(id);
                } else if (tipoCC.Clave === "LIS") {
                    form.addString(id);
                }
            }
        };
        render(): JSX.Element {
            let desarrollo: any = this.props.desarrollo;
            let concepto: any = global.assign({}, global.getData(this.props.state).concepto);
            let entidad: any = global.getData(this.props.entidad);

            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item.Concepto.TipoConcepto) {
                        if (item.Concepto.TipoConcepto.Clave === "LOG") {
                            item.ValorEstimado = item.ValorEstimado ? $.trim(item.ValorEstimado).toLowerCase() === "true" : false;
                            item.ValorAutorizado = item.ValorAutorizado ? $.trim(item.ValorAutorizado).toLowerCase() === "true" : false;
                        } else if (item.Concepto.TipoConcepto.Clave === "FECHA") {
                            item.ValorEstimado = item.ValorEstimado ? new Date(item.ValorEstimado) : new Date();
                            item.ValorAutorizado = item.ValorAutorizado ? new Date(item.ValorAutorizado) : new Date();
                        } else if (item.Concepto.TipoConcepto.Clave === "LIS") {
                            if (this.state.editEstimado) {
                                item.Concepto.Valor = item.ValorEstimado;
                            } else {
                                item.Concepto.Valor = item.ValorAutorizado;
                            }
                        }
                    }

                    //otra posible solucion:
                    //item = global.fixJsonDates(item);

                    Forms.remove(id);
                    Forms.updateFormElements(id, item);

                    this.props.config.setState({ viewMode: false, concepto: item.Concepto }, id);
                }
            };

            const listHeaderConceptos: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Concepto"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Estimado"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Real"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-right-header">&nbsp;</Column>
                    </Row>
                </Column>;

            let editEstimado: boolean = entidad.EstatusVenta.Clave === "RE" || entidad.EstatusVenta.Clave === "CO" || entidad.EstatusVenta.Clave === "D";
            let editReal: boolean = entidad.EstatusVenta.Clave === "F";

            return <page.SectionList
                id={CONCEPTOS_CREDITO_ID}
                parent={INSTITUCIONES_ID}
                icon="fa fa-table"
                size={[12, 12, 12, 12]}
                style={{ marginTop: 10 }}
                level={1}
                hideNewButton={true}
                listHeader={listHeaderConceptos}
                listMode="literal"
                items={createSuccessfulStoreObject([])}
                readonly={true}
                mapFormToEntity={(form?: any, entidades?: any): any => {
                    let tipoCC: any = form.Concepto ? form.Concepto.TipoConcepto : null;

                    if (this.state.editEstimado === true) {
                        if (tipoCC.Clave === "LIS") {
                            let val: string = JSON.stringify(form.Valor)
                            Forms.updateFormElement(CONCEPTOS_CREDITO_ID, "ValorEstimado", val);
                        } 
                        this.fnAddValores("ValorEstimado", form, tipoCC);
                    } else if (this.state.editReal === true) {
                        if (tipoCC.Clave === "LIS") {
                            let val: string = JSON.stringify(form.Valor);//form.Valor.Nombre;
                            Forms.updateFormElement(CONCEPTOS_CREDITO_ID, "ValorAutorizado", val);
                        } 
                            this.fnAddValores("ValorAutorizado", form, tipoCC);
                    }

                    let retValue: any = form
                        .addID()
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {
                            if (value.ID === retValue.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            };
                        });
                    }

                    return retValue;
                } }
                onAfterSave={(item?: global.EditForm, entidades?: global.DataElement): any => {
                    //let montoCredito: number = 0;
                    //let items: any[] = global.getData(entidades, []);

                    //if (items && items.length > 0) {
                    //    items.forEach((value) => {
                    //        let concepto: any = global.assign(value.Concepto, { TipoConcepto: value.Concepto.TipoConcepto });
                    //        if (concepto.TipoConcepto.Clave === "IMP" && value.Credito === true) {
                    //            if (this.state.editEstimado === true) {
                    //                montoCredito += value.ValorEstimado ? Number(value.ValorEstimado) : 0;
                    //            } else if (this.state.editReal === true) {
                    //                montoCredito += value.ValorAutorizado ? Number(value.ValorAutorizado) : 0;
                    //            }
                    //        }
                    //    });
                    //}

                    //Forms.updateFormElement(INSTITUCIONES_ID, "MontoCredito", montoCredito);
                } }
                formatter={(index: number, item: any) => {
                    let style: React.CSSProperties = {};
                    style.padding = "5px 0px";
                    style.backgroundColor = item.Credito === true && item.Concepto.TipoConcepto.Clave === "IMP" ? "#F5F8FD" : null;
                    let styleColum: React.CSSProperties = {};
                    styleColum.textAlign = "center";
                    return <Column>
                        <Row style={style} className="">
                            <Column size={[6, 6, 6, 6]} className="listItem-default-header" style={{fontWeight: 600}}>{item.Concepto.Nombre}</Column>
                            {editEstimado === true ?
                                <Column size={[2, 2, 2, 2]} style={styleColum}>
                                    <InputCC
                                        id="ValorEstimado"
                                        idFormSection={INSTITUCIONES_ID}
                                        property={CONCEPTOS_CREDITO_ID}
                                        index={index}
                                        size={[3, 3, 3, 3]}
                                        valores={item.Concepto.Valores}
                                        value={item.ValorEstimado}
                                        label="Valor Estimado"
                                        tipoCC={item.Concepto.TipoConcepto}
                                        validations={[validations.required()]}
                                        style={styleColum}
                                    />
                                </Column>:
                                <ColumnCC size={[2, 2, 2, 2]} style={styleColum} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorEstimado} />
                            }
                            {editReal === true ?
                                <Column size={[2, 2, 2, 2]} style={styleColum}>
                                    <InputCC
                                        id="ValorAutorizado"
                                        idFormSection={INSTITUCIONES_ID}
                                        property={CONCEPTOS_CREDITO_ID}
                                        index={index}
                                        size={[3, 3, 3, 3]}
                                        valores={item.Concepto.Valores}
                                        value={item.ValorAutorizado}
                                        label="Valor Real"
                                        tipoCC={item.Concepto.TipoConcepto}
                                        validations={[validations.required()]}
                                        style={styleColum}
                                    />
                                </Column> :
                                <ColumnCC size={[2, 2, 2, 2]} style={styleColum} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorAutorizado} />
                            }
                        </Row>
                    </Column>;
                } }>
                <Row>
                    <label.Entidad id="Concepto" size={[6, 6, 6, 6]} idForm={CONCEPTOS_CREDITO_ID} label="Concepto Crédito" />                    
                    {this.state.editEstimado === true ?
                        <InputCC id="ValorEstimado" size={[3, 3, 3, 3]} valores={concepto.Valores} value={concepto.Valor} idFormSection={CONCEPTOS_CREDITO_ID} label="Valor Estimado" tipoCC={concepto.TipoConcepto} validations={[validations.required()]} /> :
                        <LabelCC id="ValorEstimado" size={[3, 3, 3, 3]} idForm={CONCEPTOS_CREDITO_ID} label="Valor Estimado" tipoCC={concepto.TipoConcepto} />
                    }
                    {this.state.editReal === true ?
                        <InputCC id="ValorAutorizado" size={[3, 3, 3, 3]} valores={concepto.Valores} value={concepto.Valor} idFormSection={CONCEPTOS_CREDITO_ID} label="Valor Real" tipoCC={concepto.TipoConcepto} validations={[validations.required()]} /> :
                        <LabelCC id="ValorAutorizado" size={[3, 3, 3, 3]} idForm={CONCEPTOS_CREDITO_ID} label="Valor Real" tipoCC={concepto.TipoConcepto} />
                    }                   
                </Row>
            </page.SectionList>
        }
    };
    const InstitucionConceptos: any = ReactRedux.connect($InstitucionConceptos.props, null)($InstitucionConceptos);

    interface IInputCCProps extends EK.UX.Inputs.IInputProps {
        tipoCC: any;
        value: any;
        valores: any;
    };

    class InputCC extends React.Component<IInputCCProps, IInputCCProps>{
        render(): JSX.Element {
            if (this.props.tipoCC) {
                if (this.props.tipoCC.Clave === "IMP") {
                    return <input.Currency {...this.props} maxLength={8} />
                } else if (this.props.tipoCC.Clave === "NUM") {
                    return <input.Integer {...this.props} maxLength={8} />
                } else if (this.props.tipoCC.Clave === "LOG") {
                    return <checkBox.CheckBox {...this.props} />
                } else if (this.props.tipoCC.Clave === "TEX") {
                    return <input.Text {...this.props} maxLength={255} />
                } else if (this.props.tipoCC.Clave === "FECHA") {
                    return <input.Date {...this.props} maxLength={8} />
                } else if (this.props.tipoCC.Clave === "LIS") {
                    return <ConceptoValoresDDL
                        id={this.props.id}
                        valores={this.props.valores}
                        valor={this.props.value}
                        idFormSection={this.props.idFormSection}
                        label={"Valor"}
                        hasValidationError={true}
                        size={[6, 6, 6, 6]}
                        required={true}
                        index={this.props.index}
                        property={this.props.property}
                        validations={[validations.required()]} />
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };
    };

    interface IColumnCCProps extends EK.UX.Grids.IColumnProps {
        tipoCC: any;
        value: string;
        desarrollo: any;
    };

    export class ColumnCC extends React.Component<IColumnCCProps, IColumnCCProps>{
        render(): JSX.Element {
            let value: string = this.props.value;

            if (value === null || value === undefined || $.trim(value) === "") {
                return <Column {...this.props}></Column>
            }
            if (this.props.tipoCC) {
                if (this.props.tipoCC.Clave === "IMP") {
                    return <Column {...this.props}>{EK.UX.Labels.formatMoney(Number(value))}</Column>
                } else if (this.props.tipoCC.Clave === "NUM") {
                    return <Column {...this.props}><span>{Number(value)}</span></Column>
                } else if (this.props.tipoCC.Clave === "LOG") {
                    let data: boolean = typeof value === "string" ? value.toLowerCase() === "true" : Boolean(value);
                    return <Column {...this.props}><span>{EK.UX.Labels.ok(data)}</span></Column>
                } else if (this.props.tipoCC.Clave === "TEX") {
                    return <Column {...this.props} style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}><span>{value}</span></Column>
                } else if (this.props.tipoCC.Clave === "FECHA") {
                    let data: Date = typeof value === "string" ? new Date(Date.parse(value)) : new Date(value);
                    return <Column {...this.props}> <span>{EK.UX.Labels.formatDate(data)}</span></Column>
                } else if (this.props.tipoCC.Clave === "LIS") {
                    let selected: any;
                    if (value) {
                        let cName: any = value.constructor;
                        //
                        if (cName.name === "String") {
                            selected = JSON.parse(value);
                        }
                        else {
                            selected = value;
                        }
                    }
                    return <Column {...this.props}> <span>{selected.Nombre}</span></Column>
                } else {
                    return <Column {...this.props}></Column>
                }
            } else {
                return <Column {...this.props}></Column>
            }
        };
    };

    interface ILabelCCProps extends EK.UX.Labels.ILabelProps {
        tipoCC: any;
    };

    class LabelCC extends React.Component<ILabelCCProps, ILabelCCProps>{
        render(): JSX.Element {
            if (this.props.tipoCC) {
                if (this.props.tipoCC.Clave === "IMP") {
                    return <label.Currency {...this.props} />
                } else if (this.props.tipoCC.Clave === "NUM") {
                    return <label.Label {...this.props} />
                } else if (this.props.tipoCC.Clave === "LOG") {
                    return <label.Boolean {...this.props} />
                } else if (this.props.tipoCC.Clave === "TEX") {
                    return <label.Label {...this.props} />
                } else if (this.props.tipoCC.Clave === "FECHA") {
                    return <label.Fecha {...this.props} />
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };
    };
    //<label.Currency id="MontoCredito" size={[4, 4, 4, 4]} idForm={INSTITUCIONES_ID} label="Monto Crédito" />
    //EK.Store.getState().forms.FinanciamientoInstituciones.form.Conceptos
    interface ILabelMontoCredito extends React.Props<any> {
        conceptos: DataElement;
        entidad: DataElement;
        forms: any;
    };
    let LabelMontoCredito: any = global.connect(class extends React.Component<ILabelMontoCredito, ILabelMontoCredito>{
        constructor(props: ILabelMontoCredito) {
            super(props);
            //
            this.update = this.update.bind(this);
        };
        static props: any = (state: any) => {
            return {
                forms: state.forms,
                entidad: state.global.currentEntity
            };
            //let conceptos: any;
            //try {
            //    if (state.forms && state.forms[INSTITUCIONES_ID] && state.forms[INSTITUCIONES_ID].form && state.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID]) {
            //        conceptos = state.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID].value;
            //    }
            //    else {
            //        conceptos = new DataElement([]);
            //    };
            //}
            //catch (e) {
            //    conceptos = new DataElement([]);
            //};
            ////
            //return {
            //    conceptos: conceptos,
            //    entidad: state.global.currentEntity
            //};
        };
        update(props: ILabelMontoCredito): any {
            let montoCredito: number = 0;
            let items: any[]; // = global.getData(props.conceptos, []);
            let entidad: any = global.getData(props.entidad);
            let editEstimado: boolean = entidad.EstatusVenta.Clave === "RE" || entidad.EstatusVenta.Clave === "CO" || entidad.EstatusVenta.Clave === "D";
            let editReal: boolean = entidad.EstatusVenta.Clave === "F";

            if (props.forms && props.forms[INSTITUCIONES_ID] && props.forms[INSTITUCIONES_ID].form && props.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID]) {
                items = global.getData(props.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID].value);
            }
            else {
                items = [];
            };

            if (items && items.length > 0) {
                items.forEach((value) => {
                    let concepto: any = global.assign(value.Concepto, { TipoConcepto: value.Concepto.TipoConcepto });

                    if (concepto.TipoConcepto.Clave === "IMP" && value.Credito === true)
                    {
                        let naturalezaConcepto: any = concepto && concepto.Naturaleza != null ? concepto.Naturaleza.Clave : "";// NEG ,POS


                        if (editEstimado === true)
                        {
                            let valorEstimado: any = value.ValorEstimado ? Number(value.ValorEstimado) : 0

                            if (naturalezaConcepto == "NEG")
                            {
                                montoCredito = montoCredito - valorEstimado;
                            }
                            else if (naturalezaConcepto==="POS")
                            {
                                montoCredito += valorEstimado
                            }
                        }
                        else if (editReal === true)
                        {
                            let valorReal: any = value.ValorAutorizado ? Number(value.ValorAutorizado) : 0

                            if (naturalezaConcepto == "NEG")
                            {
                                montoCredito = montoCredito - valorReal
                            }
                            else if (naturalezaConcepto === "POS")
                            {
                                montoCredito += valorReal
                            }
                        }
                    }
                });
            }

            Forms.updateFormElement(INSTITUCIONES_ID, "MontoCredito", montoCredito);
        };
        componentDidMount(): any {
            this.update(this.props);
        };
        componentWillReceiveProps(nextProps: ILabelMontoCredito): any {
            let items: DataElement;
            let nextItems: DataElement;
            //
            if (this.props.forms && this.props.forms[INSTITUCIONES_ID] && this.props.forms[INSTITUCIONES_ID].form && this.props.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID]) {
                items = this.props.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID].value;
            };
            if (nextProps.forms && nextProps.forms[INSTITUCIONES_ID] && nextProps.forms[INSTITUCIONES_ID].form && nextProps.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID]) {
                nextItems = nextProps.forms[INSTITUCIONES_ID].form[CONCEPTOS_CREDITO_ID].value;
            };

            if (global.hasChanged(items, nextItems)) {
                this.update(nextProps);
            };
        };
        shouldComponentUpdate(nextProps: ILabelMontoCredito, nextState: ILabelMontoCredito): boolean {
            return false;
        };
        render(): JSX.Element {
            return <label.Currency id="MontoCredito" size={[4, 4, 4, 4]} idForm={INSTITUCIONES_ID} label="Monto Crédito" />;
        };
    });

    interface IConceptoValoresDDL extends IDropDrownListProps {
        valores?: any;
        valor?: any;
    }
    let ConceptoValoresDDL: any = global.connect(class extends React.Component<IConceptoValoresDDL, {}>{
        constructor(props: IConceptoValoresDDL) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.conceptoddlitems
        });
        static defaultProps: IDropDrownListProps = {
            id: "Valor",
            items: createDefaultStoreObject([]),
            label: "Valor de Concepto",
            helpLabel: "Seleccione el valor de concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let valores: any = this.props.valores;
            let valor: any = this.props.valor;
            let item: any = { ID: 0, Nombre: "undefined" };
            let items: any[] = [];

            try {
                if (valor) {
                    item = JSON.parse(valor);
                }
            } catch (e) { }

            try {
                if (valores) {
                    items = JSON.parse(valores);
                }
            } catch (e) { }


            let index: any = this.props.index;
            if (!(parseInt(index) >= 0)) {
                Forms.updateFormElement(idForm, this.props.id, item);
            };
            //
            dispatchSuccessful("load::conceptoddlitems", items);
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });



    interface IEstatus extends page.IProps {
        size: any;
    };
    export let EstatusVenta: any = global.connect(class extends React.Component<IEstatus, IEstatus> {
        constructor(props: IEstatus) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): any {
            let entidad: any = getData(this.props.entidad);
            let estatus: any = entidad && entidad.EstatusVenta ? entidad.EstatusVenta : "";
            let claveEstatus: string = estatus && estatus.Clave ? estatus.Clave : "";

            //P	POR AUTORIZAR
            //A	AUTORIZADO
            //E	EN EDICION
            //R	RECHAZADO
            //RE	REESTRUCTURA
            //F	FINIQUITAR
            //D	DRAFT
            //C	CANCELADO
            //T	FINIQUITADA
            //CO	COTIZACIÓN

            //let colores: any = {};
            //colores['P'] = "#FFCC80";//Naranja
            //colores['A'] = "#26C281";//verde
            //colores['E'] = "#BDBDBD"; //gris
            //colores['R'] = "#dc3545"; //rojo
            //colores['RE'] = "#ffc107";//amarillo
            //colores['F'] = "#4DD0E1";//celeste
            //colores['D'] = "#BDBDBD";//gris
            //colores['C'] = "#dc3545"; //rojo
            //colores['T'] = "#007bff";//Azul
            //colores['CO'] = "#D1C4E9"; //morado

            let colores: any = {};
            colores['P'] = "yellow-casablanca";//Naranja
            colores['A'] = "green-haze";//verde
            colores['E'] = "grey-salsa"; //gris
            colores['R'] = "red-flamingo"; //rojo
            colores['RE'] = "yellow-crusta";//amarillo
            colores['F'] = "green-steel";//celeste
            colores['D'] = "grey-salsa";//gris
            colores['C'] = "red-flamingo"; //rojo
            colores['T'] = "blue";//Azul
            colores['CO'] = "purple-medium"; //morado

            let colorEstatus: string = colores[estatus.Clave];
            let clase: string = "bg-" + colorEstatus + " bg-font-" + colorEstatus;

            return <Column size={this.props.size}>
                <div className="form-group">
                    <div id="Estatus" className="label-text" style={{ textAlign: "center" }}>
                        ESTATUS DE COTIZACIÓN / VENTA
                    </div>

                    <div id="Estatus_value" className="" style={{ backgroundColor: "transparent", textAlign: "center", padding: "3px" }}>
                        <div className={clase} style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>
                            {estatus.Nombre}
                    </div>
                    </div>
                </div>
            </Column>;

        };
    });


    interface IMensaje extends React.Props<any> {
        vigenciaListaPrecios: any;
    };
    export let MensajeValidacionLP: any = global.connect(class extends React.Component<IMensaje, IMensaje> {
        constructor(props: IMensaje) {
            super(props);
        };
        static props: any = (state: any) => ({
            vigenciaListaPrecios: state.global.catalogo$VigenciaLP,
        });
        render(): any {

            let vigencia: string = getData(this.props.vigenciaListaPrecios);
            let mensajeVigencia: string = vigencia == "SLP" ? "No existe una lista de precios para este desarrollo y tipo de comercialización"
                :
                vigencia == "LPNV" ? "No existe una lista de precios Vigente para este desarrollo y tipo de comercialización" : "";


            if (vigencia == "SLP" || vigencia == "LPNV") {
                return <Row className={"ek-sombra"}
                    style={{
                        border: "solid 2px #eea236",
                        backgroundColor: "#f0ad4e",
                        margin: "0px 5px 5px 5px"
                    }}>
                    <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                            <i className={"fa fa-info-circle"} style={{ marginRight: "5px", fontSize: "18px" }}></i>
                            {mensajeVigencia}
                        </span>
                    </Column>
                </Row>
            }
            return null;
        };
    });
}
namespace EK.Modules.SCV.Pages.Ventas {
    "use strict";
    const VENTA_PAGE_ID: string = "ventas";
    const PAGE_ID: string = "ventas$PV";
    const SECTION_CONCEPTO_ID: string = "ventas$PPConcepto";
    const SECTION_ABONO_ID: string = "ventas$PPAbono";
    const SECTION_CONCEPTOS: string = "ventas$PPConceptos";
    const SECTION_DOCUMENTOS: string = "Documentos";
    const SECTION_REESTRUCTURA: string = "Reestructura";
    const SECTION_NOEDIT: string = "Noedit";

    //Variables 
    let displayform: boolean;
    let Nodisplayform: boolean;
    let MuestraCampos: boolean;
    let MuestraDocumentos: boolean;
    let OcultaCampos: boolean;
    let EstadoOpcion: any;
    let ConDocumentos: any;
    let modificable;
    let ConceptoRE: boolean = false;
    let NoEditables: boolean = false;
    let MuestraBoton: any;

    /*** BEGIN: VIEW FORM ***/
    interface IPlanPagosProps extends React.Props<any> {
        planPagos?: DataElement;
        removeSelectedItem?: () => void;
        obtenerPlanPagos?: (idVenta: number, idPlanPagos: number, idExpediente: number, save: number, financiamiento: any, ubicaciones: any) => void;
        recalcularPlanPagos?: (venta: any, concepto: any) => void;
        venta: boolean;
        viewmode?: boolean;
        item?: DataElement;
        config?: page.IPageConfig;
        planPagosCalculo: DataElement;
        planPagosEdicion: DataElement;
        financiamiento?: any;
    };

    interface IPlanPagosState {
        EditPP: boolean;
    };

    class PlanPagos extends React.Component<IPlanPagosProps, IPlanPagosState> {
        constructor(props: IPlanPagosProps) {
            super(props);
            this.onSelectPlanPagos = this.onSelectPlanPagos.bind(this);
            this.onClickCancel = this.onClickCancel.bind(this);
            this.onClickRefresh = this.onClickRefresh.bind(this);
            this.setInfoConcepto = this.setInfoConcepto.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onAddNew = this.onAddNew.bind(this);
            this.onClickSaveAbono = this.onClickSaveAbono.bind(this);
            this.onNotEdit = this.onNotEdit.bind(this);
            this.onChange = this.onChange.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            planPagos: state.global.catalogo$PlanPagos,
            concepto: state.forms[SECTION_CONCEPTO_ID],
            planPagosCalculo: state.ventas.planPagosSelected,
            planesVenta: state.ventas.planesVenta,
            EdoCuentaDocsRE: state.ventas.EdoCuentaDocsRE,
            planPagosEdicion: state.ventas.planPagosEdicion,
            financiamiento: Forms.getValue("Financiamiento", VENTA_PAGE_ID)

        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerPlanPagos: (idVenta: number, idPlanPagos: number, idExpediente: number, save: number, financiamiento: any, ubicaciones: any): void => {
                let item: any = { idVenta, idPlanPagos, idExpediente, save, financiamiento, ubicaciones };
                dispatchAsyncPost("scv-ventas-setPlanPagosSelected", "ventas/GetPlanDePagos", item);
            },
            recalcularPlanPagos: (venta: any, concepto: any): void =>
            {
                
                let item: any = { venta, concepto };

                if (concepto == null)
                {
                    dispatchAsyncPost("scv-ventas-setPlanPagosSelected", "ventas/RecalcularPlanDePagos", item);
                }
                else
                {
                    dispatchAsyncPost("scv-ventas-setPlanPagosEdicion", "ventas/RecalcularPlanDePagos", item);
                }

            },
            removeSelectedItem: (): void => {
                dispatchDefault("scv-ventas-setSelectedConcepto", {});
            }
        });
        onAddNew(): void {
            let venta: any = global.getData(this.props.item);
            let conceptosPlanPagos: any = global.getData(this.props.planPagos);
            let conceptos: any = [];
            let ConConceptos: boolean;
            let HabilitaCampos: any;

            if (!(conceptosPlanPagos) || conceptosPlanPagos.Conceptos.length === 0) {
                MuestraCampos = false; OcultaCampos = true;
                HabilitaCampos = true;

                if (conceptosPlanPagos.Conceptos.length === 0) {
                    conceptos = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID)).Conceptos;
                }
            } else {
                conceptos = conceptosPlanPagos.Conceptos;
                MuestraCampos = true; OcultaCampos = false;
                HabilitaCampos = false;
            };

            let newId: number = 0;

            if (conceptos) {
                newId = (conceptos.length * -1);
            }

            newId--;
            //Asignacion de Valores a las Variables
            let item: any = {
                ID: newId,
                Modificable: true,
                ConceptoPago: null,
                Documentos: [],
                VentaVersion: null,
                IdVentaVersion: 0,
                Nuevo: true,
                MuestraCampos: false,
                OcultaCampos: true,
                ConConceptos: HabilitaCampos,
                Pagado: 0,
                Interes: 0,
                InteresMoneda: 0,
                CapitalMoneda: 0,
                Capital: 0,
                Importe: 0,
                IdPlanVenta: 0
            };

            this.onSelect(item);
        };
        onSelect(item: any): void {
            let estatusVenta: any = global.getData(this.props.item).EstatusVenta;
            let ConceptoP: any = global.getData(this.props.planPagosCalculo);
            let conceptosPlanPagos: any = global.getData(this.props.planPagos).Conceptos;
            if (conceptosPlanPagos.length == 0) {
                conceptosPlanPagos = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID)).Conceptos;
            }
            Forms.remove(SECTION_CONCEPTO_ID);

            NoEditables = false;
            if (!conceptosPlanPagos) { conceptosPlanPagos = []; }
            //Validamos que sea Reestructura
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                if (item.Modificable === true) {
                    if (item.ID <= 0) {
                        MuestraCampos = true;
                        OcultaCampos = false;
                    }
                    else {
                        MuestraCampos = false;
                        OcultaCampos = true;
                    }

                    Nodisplayform = true;
                    displayform = false;
                    EstadoOpcion = false;
                    ConDocumentos = 1;
                    modificable = true;
                    MuestraDocumentos = true;
                    ConceptoRE = true;
                }
                else {
                    MuestraCampos = false;
                    OcultaCampos = true;
                    Nodisplayform = true;
                    displayform = false;
                    MuestraDocumentos = true;
                    ConDocumentos = 1;
                    modificable = false;
                    EstadoOpcion = false;
                }
            }
            else {
                //Cuando el Status es diferente a RE (Reestructura)
                if (item.Nuevo === true && item.Nuevo !== undefined) {
                    if (conceptosPlanPagos !== undefined) {
                        if (conceptosPlanPagos.length > 0) {
                            MuestraCampos = true;
                            OcultaCampos = false;
                            Nodisplayform = true;
                            displayform = false;
                            EstadoOpcion = true;
                            ConDocumentos = 1;
                            modificable = true;
                            MuestraDocumentos = false;
                        }
                        else {
                            if (item.ConConceptos == true) {
                                MuestraCampos = false;
                                OcultaCampos = true;
                                Nodisplayform = false;
                                displayform = true;
                                EstadoOpcion = false;
                                ConDocumentos = 1;
                                modificable = true;
                                MuestraDocumentos = true;
                            }
                            else {
                                Nodisplayform = true;
                                displayform = false;
                                MuestraCampos = true;
                                OcultaCampos = false;
                                modificable = false;
                                MuestraDocumentos = false;
                            }
                        }
                    }
                }
                else {
                    MuestraCampos = false;
                    OcultaCampos = true;
                    Nodisplayform = true;
                    displayform = false;
                    MuestraDocumentos = false;
                    ConDocumentos = 1;
                    modificable = true;
                }
            }

            //validacion para propiedades nulas en el render
            item = global.assign(item, {
                FrecuenciaPago: item.FrecuenciaPago ? item.FrecuenciaPago : {}
            });

            //ACtualizamos el Estado Documentos
            Forms.updateFormElements(SECTION_CONCEPTO_ID, item);
            Forms.updateFormElement(SECTION_CONCEPTO_ID, "Documentos", global.createSuccessfulStoreObject(item.Documentos));

            if (this.props.config) {
                this.props.config.setState({ viewmode: false, viewMode: false }, SECTION_CONCEPTO_ID);
            }

            //Obtenemos informacion del Edo de Cuenta cuando es Reestructura
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                Forms.updateFormElement(SECTION_CONCEPTO_ID, "Reestructura", global.createSuccessfulStoreObject(item.Documentos));
            }
        };
        onNotEdit(item: any): void {
            let estatusVenta: any = global.getData(this.props.item).EstatusVenta;
            let ConceptoP: any = global.getData(this.props.planPagosCalculo);
            let conceptosPlanPagos: any = global.getData(this.props.planPagos).Conceptos;
            if (conceptosPlanPagos.length == 0) {
                conceptosPlanPagos = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID)).Conceptos;
            }

            Forms.remove(SECTION_NOEDIT);

            MuestraCampos = false;
            NoEditables = true;
            Nodisplayform = false;
            displayform = false;
            MuestraDocumentos = true;
            ConDocumentos = 0;
            modificable = false;
            EstadoOpcion = false;
            OcultaCampos = true;

            //validacion para propiedades nulas en el render
            item = global.assign(item, {
                FrecuenciaPago: item.FrecuenciaPago ? item.FrecuenciaPago : {}
            });
            //ACtualizamos el Estado Documentos
            Forms.updateFormElements(SECTION_CONCEPTO_ID, item);
            Forms.updateFormElement(SECTION_CONCEPTO_ID, "Documentos", global.createSuccessfulStoreObject(item.Documentos));

            if (this.props.config) {
                this.props.config.setState({ viewmode: false, viewMode: false }, SECTION_CONCEPTO_ID);
            }

            //Obtenemos informacion del Edo de Cuenta cuando es Reestructura
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                Forms.updateFormElement(SECTION_CONCEPTO_ID, "Reestructura", global.createSuccessfulStoreObject(item.Documentos));
            }
        };
        //{elimina solamente conceptos que no tienen pago}
        onRemove(item: any): void {
            if (item.Pagado === 0) {
                let pp: any = EK.UX.Forms.getValue("PlanPagos", VENTA_PAGE_ID);
                if (pp) {
                    if (pp.status && pp.timestamp) {
                        pp = global.getData(pp);
                        if (pp && pp.Conceptos) {
                            let items: global.DataElement = global.createSuccessfulStoreObject(pp.Conceptos);
                            pp.Conceptos = global.getData(items.removeItem(item), []);
                            pp = global.createSuccessfulStoreObject(pp);
                            EK.UX.Forms.updateFormElement(VENTA_PAGE_ID, "PlanPagos", pp);
                        }
                    }
                    else {
                        if (pp.Conceptos) {
                            let items: global.DataElement = global.createSuccessfulStoreObject(pp.Conceptos);
                            pp.Conceptos = global.getData(items.removeItem(item), []);
                            EK.UX.Forms.updateFormElement(VENTA_PAGE_ID, "PlanPagos", pp);
                        }
                    }
                }
            }
        };
        updateItems(items: any): void {
            Forms.updateFormElement(PAGE_ID, "PlanPagos", items);
        };
        //Obtenemos Datos de la Forma SECTION_CONCEPTO_ID
        getFormData(): any {
            if (!Forms.isValid(SECTION_CONCEPTO_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };

            let item: EditForm = Forms.getForm(SECTION_CONCEPTO_ID);
            let removedItems: number = 0;

            let concepto: any = item
                .addNumber("ID")
                .addObject("ConceptoPago")
                .addObject("PlanPagos")
                .addNumber("PlanPagos")
                .addNumber("ImporteMoneda")
                .addNumber("Pagado")
                .addNumber("Saldo")
                .addNumber("NumeroPagos")
                .addObject("FrecuenciaPago")
                .addNumber("NumeroPlazoPrimerPago")
                .addObject("PeriodoPrimerPago")
                .addNumber("PorcentajeTIF")
                .addBoolean("Modificable")
                .addObject("VentaVersion")
                .addObject("Documentos")
                .addNumber("Capital")
                .addNumber("Importe")
                .addNumber("CapitalMoneda")
                .addNumber("Interes")
                .addNumber("InteresMoneda")
                .addNumber("IdPlanVenta")
                .addNumber("Porcentaje")
                .toObject();

            return concepto;
        };
        setInfoConcepto(concepto: any): void {
            let formaConcepto: any = {
                ID: concepto.ID,
                ConceptoPago: concepto.ConceptoPago,
                ImporteMoneda: concepto.CapitalMoneda,
                Pagado: concepto.Pagado,
                Saldo: concepto.Saldo,
                NumeroPagos: concepto.NumeroPagos,
                FrecuenciaPago: concepto.FrecuenciaPago,
                NumeroPlazoPrimerPago: concepto.NumeroPlazoPrimerPago,
                PeriodoPrimerPago: concepto.PeriodoPrimerPago,
                PorcentajeTIF: concepto.PorcentajeTIF,
                Modificable: concepto.Modificable,
                VentaVersion: concepto.VentaVersion,
                IdVentaVersion: concepto.IdVentaVersion,
                Documentos: concepto.Documentos,
                Capital: concepto.Capital,
                CapitalMoneda: concepto.CapitalMoneda,
                Interes: concepto.Interes,
                InteresMoneda: concepto.InteresMoneda,
                Importe: concepto.Importe,
                IdPlanVenta: concepto.IdPlanPagos,
                PlanPagos: concepto.PlanPagos
            };

            Forms.updateFormElements(SECTION_CONCEPTO_ID, formaConcepto);
        };
        onSelectPlanPagos(changeViewMode?: boolean): void {
            //Obtenemos Estatus de la Venta
            let estatusVenta: any = global.getData(this.props.item).EstatusVenta;
            //Obtenemos la Propiedad planPagos
            let planPagos: any = getData(this.props.planPagos);
            //Obtenemos Nuevos Documentos Recalculados para el EdodeCuenta
            let EdoCuentaDocsRE = getData(Forms.getValue("EdoCuentaDocsRE", VENTA_PAGE_ID));
            //Financiamiento
            let financiamiento: any = getData(Forms.getValue("Financiamiento", VENTA_PAGE_ID))[0];
            //Ubicacion
            let ubicaciones: any = getData(Forms.getValue("Ubicaciones", VENTA_PAGE_ID));
            //Longitud Array
            let ConceptArray: any;
            //Obtengo Coleccion de Conceptos
            let Conceptos: any;

            if (planPagos.ID >= 1) {
                //Concepto Guardado
                Conceptos = getData(this.props.planPagosEdicion).Conceptos;
                if (Conceptos == undefined) {
                    Conceptos = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID)).Conceptos;
                    if (Conceptos == undefined) {
                        let ppInicial: any;
                        ppInicial = Forms.getValue("PlanPagos", VENTA_PAGE_ID);
                        Conceptos = ppInicial.Conceptos;
                    }
                }
            }
            else {
                //Concepto Nuevo
                Conceptos = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID)).Conceptos;
            }

            if (Conceptos == undefined) {
                Conceptos = 0;
                //Concepto Nuevo
            }

            //Obtenemos el Concepto de la Forma
            let concepto: any = this.getFormData();

            //Coleccion de Conceptos del Plan de Pagos Nuevo
            if (!planPagos || (planPagos.ID === -1 && Conceptos <= 0)) {
                let pp: any = this.getFormData();
                planPagos.IdPlanVenta = pp.IdPlanPagos;
                //Obtenemos el PP
                this.props.obtenerPlanPagos(getDataID(this.props.item), pp.IdPlanPagos, this.props.item.data.IdExpediente, 0, financiamiento, ubicaciones);

                //Actualizamos los Estados PlanPagos y ID
                Forms.updateFormElement(SECTION_CONCEPTO_ID, "ID", undefined);

                Conceptos = global.getData(this.props.planPagosCalculo);

                if (this.props.config) {
                    this.props.config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
                };
            }
            else {
                //Recalculo de Documentos de Concepto del PP
                if (!Forms.isValid(SECTION_CONCEPTO_ID)) {
                    warning("verificar los campos obligatorios");
                    return;
                }

                //Asignamos el Arreglo de Conceptos al DataElement
                let items: DataElement = global.createSuccessfulStoreObject(Conceptos);

                if (concepto.ID == undefined && concepto.ID == null) {
                    concepto.ID = items.getNextLowerID();
                };

                //Asignamos el Concepto modificado al DataElement
                let retValue: DataElement = items.upsertItem(concepto);

                if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                    //Conceptos Reestructura
                    let nConceptos: any = []
                    Conceptos = getData(retValue);
                    for (var i = 0; i < Conceptos.length; i++) {
                        let nConcepto: any = global.assign(Conceptos[i]);
                        if (concepto.ID === nConcepto.ID) {
                            nConcepto.Documentos = EdoCuentaDocsRE;
                        };
                        nConceptos.push(nConcepto);
                    }

                    planPagos.Conceptos = nConceptos;
                }
                else {
                    //Asignamos los nuevos valores a la propiedad Conceptos
                    planPagos.Conceptos = global.getData(retValue);
                }

                //Actualizamos Estado PlanPagos
                let planPagosValue: DataElement = global.createSuccessfulStoreObject(planPagos);
                Forms.updateFormElement(VENTA_PAGE_ID, "PlanPagos", planPagosValue);

                MuestraBoton = false;
                modificable == false;

                if (!(changeViewMode === true)) {
                    if (this.props.config) {
                        this.props.config.setState({ viewMode: true, viewmode: true }, SECTION_CONCEPTO_ID);
                    };
                };
                Forms.updateFormElement(SECTION_CONCEPTO_ID, "Modificable", false);

                //Recalculamos los Conceptos del PP
                let venta: any = getData(this.props.item);
                venta.PlanPagos = getData(this.props.planPagosEdicion);
                this.props.recalcularPlanPagos(venta, null);

            };
        };
        onCreateAbono(): void {
            let $page: any = $ml[PAGE_ID];
            if (!Forms.isValid("Abonos")) {
                warning("verificar los campos obligatorios");
                return;
            }
        };
        componentWillReceiveProps(nextProps: IPlanPagosProps): void {
            if (hasChanged(this.props.planPagosEdicion, nextProps.planPagosEdicion)) {
                let conceptoId: number = Forms.getValue("ID", SECTION_CONCEPTO_ID);
                if (global.isSuccessful(nextProps.planPagosEdicion)) {
                    if (conceptoId !== undefined && conceptoId !== null) {
                        Forms.updateFormElement(SECTION_CONCEPTO_ID, "IdPlanVenta", getData(nextProps.planPagosEdicion).IdPlanVenta)
                        let items: any[] = global.getData(nextProps.planPagosEdicion).Conceptos;
                        if (items && items.length > 0) {
                            for (var i = 0; i < items.length; i++) {
                                if (conceptoId === items[i].ID) {
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "Importe", items[i].Importe)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "ImporteMoneda", items[i].ImporteMoneda)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "Capital", items[i].Capital)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "CapitalMoneda", items[i].CapitalMoneda)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "Interes", items[i].Interes)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "InteresMoneda", items[i].InteresMoneda)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "Saldo", items[i].Saldo)
                                    Forms.updateFormElement(SECTION_CONCEPTO_ID, "Documentos", global.createSuccessfulStoreObject(items[i].Documentos));
                                    success("Documento(s) Agregado(s) con Exito!");

                                    let venta: any = getData(this.props.item);
                                    if (venta.EstatusVenta.Clave === "RE" || venta.EstatusVenta.Clave === "F") {
                                        if (conceptoId < 0) {
                                            //Actualizamos Estado Reestructura para agregar Abonos al Grid  
                                            Forms.updateFormElement(SECTION_CONCEPTO_ID, "Reestructura", global.createSuccessfulStoreObject(items[i].Documentos));
                                            //Actualizamos estado del EdoCuentaDocsRE
                                            Forms.updateFormElement(VENTA_PAGE_ID, "EdoCuentaDocsRE", global.createSuccessfulStoreObject(items[i].Documentos));
                                        }
                                    }
                                    ConDocumentos = 1;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (hasChanged(this.props.planPagosCalculo, nextProps.planPagosCalculo)) {
                if (global.isSuccessful(nextProps.planPagosCalculo)) {
                    Forms.updateFormElement(VENTA_PAGE_ID, "PlanPagos", nextProps.planPagosCalculo);
                }
            }
            if (hasChanged(this.props.financiamiento, nextProps.financiamiento))
            {
                let venta: any = getData(this.props.item);
                let financiamientoElemento: any = Forms.getValue("Financiamiento", "Financiamiento");
                let idTipoComercializacion: number = venta && venta.Expediente ? venta.Expediente.IdTipoComercializacion : 0;
                let idFinanciamiento: number = financiamientoElemento && financiamientoElemento.ID > 0 ? financiamientoElemento.ID : 0;
                if (idFinanciamiento > 0) { obtenerListaPlanPagos(idTipoComercializacion, idFinanciamiento); }
            }
        };
        onClickCancel(): void {
            Forms.remove(SECTION_CONCEPTO_ID);
            dispatchDefault("scv-ventas-setPlanPagosEdicion", {});

            if (this.props.config) {
                this.props.config.setState({ viewmode: true, viewMode: true }, SECTION_CONCEPTO_ID);
            }

            this.props.removeSelectedItem();
        };
        onChange(e: any): any {
            if (e.Nombre == "CONTADO") {
                Forms.updateFormElement(SECTION_CONCEPTO_ID, "NumeroPagos", 1);
            }
        };
        onClickRefresh(): void {
            //Obtenemos la informacion de la forma
            let concepto: any = this.getFormData();
            //Obtenemos Propiedades de la Venta
            let venta: any = getData(this.props.item);
            //Obtenemos el Estatus de la venta
            let estatusVenta: any = global.getData(this.props.item).EstatusVenta;
            //Obtengo Coleccion de Conceptos
            let Conceptos: any;

            //Reestructura
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO" && concepto.ID > 0) {
                let idVenta: number = getDataID(this.props.item);
                let idConcepto = Forms.getValue("ID", SECTION_CONCEPTO_ID);
                let estatus: number;
                let idExpediente: any = this.props.item.data.IdExpediente;

                //Documentos Cancelados
                let ventaVersion: number = 0;

                //Obtenemos los Conceptos Cancelados/PorPagar/Pagados
                global.asyncPost("Ventas/GetDocsCancelados/", { idVenta: idVenta, idConceptopago: idConcepto, ventaVersion: 0, idExpediente }, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {

                        let documentos: DataElement = new DataElement(data).getUpdatedStateItems();
                        documentos.status = AsyncActionTypeEnum.successful;

                        //Actualizamos estado del EdoCuentaDocsRE
                        Forms.updateFormElement(VENTA_PAGE_ID, "DocumentosCancelados", documentos);
                    }
                });

                //Obtenemos los Conceptos Cancelados/PorPagar/Pagados
                global.asyncPost("Ventas/GetEdocuenta/", { idVenta: idVenta, idConceptopago: idConcepto, estatus: 1, concepto, idExpediente }, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {

                        let documentos: DataElement = new DataElement(data).getUpdatedStateItems();
                        documentos.status = AsyncActionTypeEnum.successful;

                        //Actualizamos estado del EdoCuentaDocsRE
                        Forms.updateFormElement(VENTA_PAGE_ID, "EdoCuentaDocsRE", documentos);
                        //Actualizamos estado de la Reestructura
                        Forms.updateFormElement(SECTION_CONCEPTO_ID, "Reestructura", documentos);
                    }
                });

            }

            //Obtenemos la Propiedad planPagos
            let planPagos: any;
            //Reestructura
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                venta.PlanPagos = getData(this.props.planPagos);
                Conceptos = getData(this.props.planPagos).Conceptos;
                planPagos = getData(this.props.planPagos);
            } else {
                //Actualizamos el Estado
                planPagos = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID));

                if (planPagos.ID == undefined) {
                    planPagos = getData(this.props.planPagos);
                }

                venta.PlanPagos = planPagos;
                Conceptos = planPagos.Conceptos;
            }

            //Asignamos el Arreglo de Conceptos al DataElement
            let items: DataElement = global.createSuccessfulStoreObject(Conceptos);

            if (concepto) {
                if (concepto.ID == undefined && concepto.ID == null) {
                    concepto.ID = items.getNextLowerID();
                };

                if (concepto.ID < 0) {
                    let conceptos: any[] = planPagos.Conceptos;
                    conceptos.forEach((value: any, index: number): any => {
                        if (concepto.ID !== value.ID) {
                            let retValue: DataElement = items.upsertItem(concepto);
                            planPagos.Conceptos = getData(retValue);

                        }
                    });
                };

                //Recalculamos los Conceptos del PP
                this.props.recalcularPlanPagos(venta, concepto);
            }

            venta.Ubicaciones = getData(Forms.getValue("Ubicaciones", VENTA_PAGE_ID));
            venta.Financiamiento = getData(Forms.getValue("Financiamiento", VENTA_PAGE_ID))[0];

            //Recalculamos los Conceptos del PP
            planPagos.Conceptos = getData(items);
            Forms.updateFormElement(VENTA_PAGE_ID, "PlanPagos", global.createSuccessfulStoreObject(planPagos));

            return concepto;
        };
        onSave(): void {
            let $page: any = $ml[PAGE_ID];

            if (!Forms.isValid(SECTION_CONCEPTO_ID)) {
                warning($page.mensajes.warning.message);
                return;
            }

            let caracteristica: any;
            let item: EditForm = Forms.getForm(SECTION_CONCEPTO_ID);
            caracteristica = item
                .addNumber("ID")
                .addObject("PlanPagos")
                .toObject();

            if (this.props.config) {
                this.props.config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
            }

            Forms.updateFormElement(VENTA_PAGE_ID, "PlanPagos", this.props.planPagosCalculo);
        };
        onCancel(): void {
            Forms.remove(SECTION_CONCEPTO_ID);
            dispatchDefault("cv-ventas-setSelectedConcepto", {});

            if (this.props.config) {
                this.props.config.setState({ viewMode: true }, SECTION_CONCEPTO_ID);
            }
        };
        onClickSaveAbono(): void {
            let $page: any = $ml[PAGE_ID];
            if (!Forms.isValid(SECTION_DOCUMENTOS)) {
                warning("verificar los campos obligatorios");
                return;
            }

            //Estatus de la Venta
            let estatusVenta: any = getData(this.props.item).EstatusVenta;

            let item: EditForm;
            //Cuando el Estatus es diferente a Draft
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                item = Forms.getForm(SECTION_REESTRUCTURA);
            }
            else {
                //Cuando el Estatus es Draft
                item = Forms.getForm(SECTION_DOCUMENTOS);
            }

            //Obtenemos conceptos de la Forma
            let concepto: any = this.getFormData();
            //Obtenemos las propiedades de la Venta
            let venta: any = getData(this.props.item);

            let abonos: any;
            let docs: any[];
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                //Llenamos Docs con el Estado de la Reestructura
                docs = getData(Forms.getValue("Reestructura", SECTION_CONCEPTO_ID));
            } else {
                //Llenamos Docs con el Estado de los Documentos
                docs = getData(Forms.getValue("Documentos", SECTION_CONCEPTO_ID));
            }

            let arrayDocs: any = docs.length;
            let dataAbono: DataElement;

            if (!abonos) {
                abonos = global.createSuccessfulStoreObject([]);
            };

            function docsCancelados(elemento) {
                if (elemento.Status === "CANCELADO") {
                    return elemento;
                };
            }
            var listaDocsCancelados: any[] = docs.filter(docsCancelados)

            function tipoAbono(elemento) {
                // if (elemento.TipoAbono.Clave === "AC" && elemento.EstatusDoc === "POR PAGAR") {
                if ((elemento.Status === "Abono" || elemento.TipoDoc === "Abono") && elemento.EstatusDoc === "POR PAGAR") {
                    return elemento;
                };
            }
            if (arrayDocs > 0) {
                var listaAbonos: any[] = docs.filter(tipoAbono)
                listaAbonos.forEach((value: any, index: number): any => {
                    value.ID = abonos.getNextLowerID();
                    abonos = abonos.upsertItem(value);
                });
            }

            let abono: any = item
                .addID()
                .addDate("Vencimiento")
                .addNumber("ImporteMoneda")
                .addNumber("CapitalMoneda")
                .addNumber("InteresMoneda")
                .addNumber("Pagado")
                .addNumberConst("_nuevo", 1)
                .addStringConst("TipoDoc", "Abono")
                .addVersion()
                .toObject();

            //Agregamos un nuevo elemento a la coleccion de Abonos
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                let AbonosLongitud: any;
                AbonosLongitud = getData(abonos);
                abono.ID = (AbonosLongitud.length + 1) * -1;
                abono.Numero = Math.abs(abono.ID);
                abono.CapitalMoneda = 0.00;
                abono.Pagado = abono.ImporteMoneda;
                abono.InteresMoneda = 0.00;
                abono.Status = "Abono";
                abono.EstatusDoc = "POR PAGAR";
            } else {
                abono.ID = abonos.getNextLowerID();
            }

            dataAbono = abonos.upsertItem(abono);
            //// actualizar concepto
            concepto.Abonos = global.getData(dataAbono);
            let estatus: number = 1;
            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                if (listaDocsCancelados && listaDocsCancelados.length > 0) {
                    estatus = 1
                } else {
                    estatus = 2
                }
                let idVenta: number = getDataID(this.props.item);
                let idExpediente: any = this.props.item.data.IdExpediente;

                global.asyncPost("Ventas/GetEdocuenta/", { idVenta: idVenta, idConceptopago: concepto.ID, estatus: estatus, concepto, idExpediente }, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                        let documentos: DataElement = new DataElement(data).getUpdatedStateItems();
                        documentos.status = AsyncActionTypeEnum.successful;

                        //Actualizamos estado del EdoCuentaDocsRE
                        Forms.updateFormElement(VENTA_PAGE_ID, "EdoCuentaDocsRE", documentos);

                        //Actualizamos estado de la Reestructura
                        Forms.updateFormElement(SECTION_CONCEPTO_ID, "Reestructura", documentos);
                    }
                });
            }
            else {
                this.props.recalcularPlanPagos(venta, concepto);
            }

            if (estatusVenta.Clave != "D" && estatusVenta.Clave != "CO") {
                if (this.props.config) {
                    this.props.config.setState({ viewmode: true, viewMode: true }, SECTION_REESTRUCTURA);
                };
            } else {
                if (this.props.config) {
                    this.props.config.setState({ viewmode: true, viewMode: true }, SECTION_DOCUMENTOS);
                };
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[VENTA_PAGE_ID];
            let venta: any = getData(this.props.item);

            

            modificable = Forms.getValue("Modificable", SECTION_CONCEPTO_ID) === true;
            let conPeg: any = Forms.getValue("PlanPagos", VENTA_PAGE_ID);
            let conceptosFormPP: DataElement = global.createSuccessfulStoreObject([]);
            let frecuenciaPago: any = Forms.getValue("FrecuenciaPago", SECTION_CONCEPTO_ID);
            let estatusVenta: any = global.assign({}, venta.EstatusVenta);
            let financiamiento: any = getData(Forms.getValue("Financiamiento", VENTA_PAGE_ID));
            let ubicaciones: any = getData(Forms.getValue("Ubicaciones", VENTA_PAGE_ID));
            MuestraBoton = Nodisplayform;
            let conceptoID: any = Forms.getValue("ID", SECTION_CONCEPTO_ID)
            var today: Date = new Date(), date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();


            if (conPeg) {
                if (global.isLoadingOrUpdating(conPeg)) {
                    conceptosFormPP = conPeg;
                }
                else {
                    if (conPeg.status && conPeg.timestamp) {
                        if (global.isSuccessful(conPeg)) {
                            conceptosFormPP = new DataElement(conPeg);
                            conceptosFormPP.data = global.getData(conPeg).Conceptos;
                        };
                    }
                    else {
                        if (conPeg && conPeg.Conceptos) {
                            conceptosFormPP = global.createSuccessfulStoreObject(conPeg.Conceptos);
                        }
                    }
                };
            };

            //{obtener solo los elementos visibles}
            if (conceptosFormPP.data.length > 0) {
                conceptosFormPP = conceptosFormPP.getActiveItems();
            }

            //Botones Edicion
            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelect(item);
                }
            };
            let Noedit: any = {
                icon: "icon-eye",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onSelect(item);
                }
            };
            let NoeditSaldo0: any = {
                icon: "icon-eye",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    this.onNotEdit(item);
                }
            };
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onRemove(item) }
            };
            let cancelados: any = {
                icon: "icon-times-circle",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                }
            };

            //Deshabilitamos Botones
            if (MuestraBoton == true && modificable == true) {
                EstadoOpcion = true;
                ConDocumentos = 1;
            }
            else {
                EstadoOpcion = false;
            }

            let fnValidateCant = function (v: any, values?: any): boolean {
                if (values) {
                    let cantidadVal: number = values.Capital ? Number(values.Capital) : 0;
                    let ubicaciones: any[] = venta.Ubicaciones;
                    let pp: any = Forms.getValue("PlanPagos", VENTA_PAGE_ID);
                    let totalUbicaciones: number = 0;
                    if (ubicaciones) {
                        ubicaciones.forEach((value: any, index: number): any => {
                            totalUbicaciones += value.ImporteMoneda;
                        });
                    };

                    let totalPlanPagos: number = 0;
                    if (pp && pp.Conceptos) {
                        let conceptos: any[] = pp.Conceptos;
                        conceptos.forEach((value: any, index: number): any => {
                            if (conceptoID !== value.ID) {
                                totalPlanPagos += value.Capital;
                            } else {
                                totalPlanPagos += (Number(v) + value.Pagado)
                            };
                        });
                    };

                    if (totalUbicaciones > totalPlanPagos) {
                        warning("El Plan de Pagos no puede cubrir el total de la venta. Favor de verificar los conceptos.");
                        return false;
                    }

                    return true;
                }
                return true;
            };

            let totalUbicaciones: number = 0;

            if (ubicaciones && ubicaciones.length > 0) {
                ubicaciones.forEach((value: any, index: number): any => {
                    totalUbicaciones += value.ImporteMoneda;
                });
            };

            //CJCC 12abr18
            return <div>
                <PPMessages />
                {this.props.viewmode
                    ? <OptionSection
                        title="Plan de Pagos"
                        id={SECTION_CONCEPTO_ID}
                        icon="fa fa-table"
                        level={1}
                        collapsed={false}>
                        <PanelUpdate info={this.props.planPagos}>
                            <List
                                items={getData(this.props.planPagos).Conceptos}
                                readonly={true}
                                addRemoveButton={false}
                                dragAndDrop={false}
                                aggregate={(item: any, values: any) => {
                                    if (!values.Capital) values.Capital = 0;
                                    if (!values.Interes) values.Interes = 0;
                                    if (!values.Importe) values.Importe = 0;
                                    if (!values.Pagado) values.Pagado = 0;
                                    if (!values.Saldo) values.Saldo = 0;

                                    if (item.OnEdit !== true) {
                                        values.Capital += item.CapitalMoneda ? item.CapitalMoneda : 0;
                                        values.Interes += item.InteresMoneda ? item.InteresMoneda : 0;
                                        values.Importe += item.ImporteMoneda ? item.ImporteMoneda : 0;
                                        values.Pagado += item.Pagado ? item.Pagado : 0;
                                        values.Saldo += item.Saldo ? item.Saldo : 0;
                                    };

                                    let itemStyle: React.CSSProperties = {
                                        paddingTop: 5,
                                        paddingBottom: 5
                                    };

                                    if (date > item.Vencimiento && item.CapitalMoneda < item.Pagado) {
                                        itemStyle.backgroundColor = "ea5353";
                                        itemStyle.fontWeight = "bolder";
                                    }

                                    return values;
                                } }
                                listFooter={(values: any) => {
                                    let iStyle: React.CSSProperties = {
                                        backgroundColor: null
                                    };
                                    if (values.Capital < totalUbicaciones) {
                                        iStyle.backgroundColor = "#f66e55";
                                    } else {
                                        iStyle.backgroundColor = "#26c281";
                                    }
                                    return <div>
                                        <Row style={{ textAlign: "center" }}>
                                            <Column size={[6, 7, 6, 6]} style={{ textAlign: "right" }}>{""}</Column>
                                            <Column size={[3, 2, 2, 1]} style={{ textAlign: "right" }}>
                                                <span className="badge badge-info list-footer-badge" style={iStyle}>
                                                    {EK.UX.Labels.formatMoney(values.Capital)}
                                                </span>
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm hidden-md">
                                                <span className="badge badge-info list-footer-badge">
                                                    {EK.UX.Labels.formatMoney(values.Interes)}
                                                </span>
                                            </Column>
                                            <Column size={[1, 1, 2, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm">
                                                <span className="badge badge-info list-footer-badge">
                                                    {EK.UX.Labels.formatMoney(values.Capital + values.Interes)}
                                                </span>
                                            </Column>
                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm hidden-md">
                                                <span className="badge badge-info list-footer-badge">
                                                    {EK.UX.Labels.formatMoney(values.Pagado)}
                                                </span>
                                            </Column>
                                            <Column size={[3, 2, 2, 1]} style={{ textAlign: "right" }} >
                                                <span className="badge badge-info list-footer-badge">
                                                    {EK.UX.Labels.formatMoney((values.Capital + values.Interes) - values.Pagado)}
                                                </span>
                                            </Column>
                                        </Row>
                                    </div>;
                                } }
                                listHeader={<div>
                                    <Row>
                                        <Column>
                                            <Column size={[6, 6, 5, 5]} style={{ textAlign: "center" }} className="list-default-header bold">{"CONCEPTO"}</Column>
                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs">{"PLAZO"}</Column>
                                            <Column size={[3, 2, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"CAPITAL"}</Column>
                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"INTERÉS"}</Column>
                                            <Column size={[1, 1, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm">{"IMPORTE"}</Column>
                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"PAGADO"}</Column>
                                            <Column size={[3, 2, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"SALDO"}</Column>
                                        </Column>
                                    </Row>
                                </div>}
                                formatter={(index: number, item: any) => {
                                    return <Row style={{ textAlign: "left" }} id={"row_concepto_pp_" + index} className="panel-collapsed" >
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                            <Row>
                                                <Column size={[2, 1, 1, 1]} >
                                                    <CollapseButton idElement={"row_concepto_pp_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                </Column>
                                                <Column size={[4, 5, 4, 4]} className="bold">
                                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{item.Documentos ? item.Documentos.length : 0}</span>
                                                    {item.ConceptoPago.Nombre}
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs">
                                                    {item.FrecuenciaPago.Nombre}
                                                </Column>
                                                <Column size={[3, 2, 2, 1]} className="listItem-right-header">
                                                    {EK.UX.Labels.formatMoney(item.CapitalMoneda)}
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-header hidden-xs hidden-sm hidden-md">
                                                    {EK.UX.Labels.formatMoney(item.InteresMoneda)}
                                                </Column>
                                                <Column size={[1, 1, 2, 1]} className="listItem-right-header hidden-xs hidden-sm">
                                                    {EK.UX.Labels.formatMoney(item.ImporteMoneda)}
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} className="listItem-right-header hidden-xs hidden-sm hidden-md">
                                                    {EK.UX.Labels.formatMoney(item.Pagado)}
                                                </Column>
                                                <Column size={[3, 2, 2, 1]} className="listItem-right-header">
                                                    {EK.UX.Labels.formatMoney(item.ImporteMoneda - item.Pagado)}
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
                                                <Column size={[12, 12, 12, 12]}> <ViewDocumentos documentos={item.Documentos} /></Column>
                                            </Column>
                                        </Row>
                                    </Row>
                                } } />
                        </PanelUpdate>
                    </OptionSection> :
                    <OptionSection
                        id={SECTION_CONCEPTO_ID}
                        title="Plan de Pagos"
                        icon="fa fa-table"
                        level={1}
                        editMode={true}
                        collapsed={false}>
                        <SectionButtons>
                            <Button visible={EstadoOpcion} className="btn-ico-ek white" iconOnly={true} color="white" icon="fa fa-calculator" onClick={this.onClickRefresh} style={{ marginRight: 15 }} />
                        </SectionButtons>
                        <SectionView
                            onAddNew={financiamiento.length > 0 && ubicaciones.length > 0 ? this.onAddNew : null}>
                            <PanelUpdate info={conceptosFormPP}>
                                <List
                                    items={conceptosFormPP}
                                    readonly={true}
                                    addRemoveButton={false}
                                    dragAndDrop={false}
                                    aggregate={(item: any, values: any) => {
                                        if (!values.Capital) values.Capital = 0;
                                        if (!values.Interes) values.Interes = 0;
                                        if (!values.Importe) values.Importe = 0;
                                        if (!values.Pagado) values.Pagado = 0;
                                        if (!values.Saldo) values.Saldo = 0;

                                        if (item.OnEdit !== true) {
                                            values.Capital += item.CapitalMoneda ? item.CapitalMoneda : 0;
                                            values.Interes += item.InteresMoneda ? item.InteresMoneda : 0;
                                            values.Importe += item.ImporteMoneda ? item.ImporteMoneda : 0;
                                            values.Pagado += item.Pagado ? item.Pagado : 0;
                                            values.Saldo += item.Saldo ? item.Saldo : 0;
                                        };

                                        let itemStyle: React.CSSProperties = {
                                            paddingTop: 5,
                                            paddingBottom: 5
                                        };

                                        if (date >= item.Vencimiento && item.CapitalMoneda < item.Pagado) {
                                            itemStyle.backgroundColor = "ea5353";
                                            itemStyle.fontWeight = "bolder";
                                        }

                                        return values;
                                    } }
                                    listFooter={(values: any) => {

                                        let iStyle: React.CSSProperties = {
                                            backgroundColor: null
                                        };
                                        if (values.Capital < totalUbicaciones) {
                                            iStyle.backgroundColor = "#f66e55";
                                        } else {
                                            iStyle.backgroundColor = "#26c281";
                                        }

                                        return <div>
                                            <Row style={{ textAlign: "center" }}>
                                                <Column size={[5, 7, 5, 6]} style={{ textAlign: "right" }}>{""}</Column>
                                                <Column size={[3, 2, 2, 1]} style={{ textAlign: "right" }}>
                                                    <span className="badge badge-info list-footer-badge" style={iStyle}>
                                                        {EK.UX.Labels.formatMoney(values.Capital)}
                                                    </span>
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm hidden-md">
                                                    <span className="badge badge-info list-footer-badge">
                                                        {EK.UX.Labels.formatMoney(values.Interes)}
                                                    </span>
                                                </Column>
                                                <Column size={[1, 1, 2, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm">
                                                    <span className="badge badge-info list-footer-badge">
                                                        {EK.UX.Labels.formatMoney(values.Capital + values.Interes)}
                                                    </span>
                                                </Column>
                                                <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="hidden-xs hidden-sm hidden-md">
                                                    <span className="badge badge-info list-footer-badge">
                                                        {EK.UX.Labels.formatMoney(values.Pagado)}
                                                    </span>
                                                </Column>
                                                <Column size={[3, 2, 2, 1]} style={{ textAlign: "right" }}>
                                                    <span className="badge badge-info list-footer-badge">
                                                        {EK.UX.Labels.formatMoney(values.Capital + values.Interes - values.Pagado)}
                                                    </span>
                                                </Column>
                                            </Row>
                                        </div>;
                                    } }
                                    listHeader={<Column>
                                        <Column size={[5, 6, 4, 5]} style={{ textAlign: "center" }} className="list-default-header bold">{"CONCEPTO"}</Column>
                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs">{"PLAZO"}</Column>
                                        <Column size={[3, 2, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"CAPITAL"}</Column>
                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"INTERÉS"}</Column>
                                        <Column size={[1, 1, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm">{"IMPORTE"}</Column>
                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"PAGADO"}</Column>
                                        <Column size={[3, 2, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"SALDO"}</Column>
                                    </Column>}
                                    formatter={(index: number, item: any) =>
                                    {
                                        return <Row style={{ textAlign: "left" }} id={"row_concepto_pp_" + index} className="panel-collapsed" >
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                <Row>
                                                    <Column size={[2, 1, 1, 1]} >
                                                        <CollapseButton idElement={"row_concepto_pp_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="font-blue fa fa-caret-up" collapsedDownIcon="font-blue fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                    </Column>
                                                    <Column size={[3, 5, 3, 4]} className="bold">
                                                        <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{item.Documentos ? item.Documentos.length : 0}</span>
                                                        {item.ConceptoPago.Nombre}
                                                    </Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs">
                                                        {item.FrecuenciaPago.Nombre}
                                                    </Column>
                                                    <Column size={[3, 2, 2, 1]} className="listItem-right-header">
                                                        {EK.UX.Labels.formatMoney(item.CapitalMoneda)}
                                                    </Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-right-header hidden-xs hidden-sm hidden-md">
                                                        {EK.UX.Labels.formatMoney(item.InteresMoneda)}
                                                    </Column>
                                                    <Column size={[1, 1, 2, 1]} className="listItem-right-header hidden-xs hidden-sm">
                                                        {EK.UX.Labels.formatMoney(item.ImporteMoneda)}
                                                    </Column>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-right-header hidden-xs hidden-sm hidden-md">
                                                        {EK.UX.Labels.formatMoney(item.Pagado)}
                                                    </Column>
                                                    <Column size={[3, 2, 2, 1]} className="listItem-right-header">
                                                        {EK.UX.Labels.formatMoney(item.ImporteMoneda - item.Pagado)}
                                                    </Column>

                                                    {item.Modificable === true ?
                                                        estatusVenta.Clave === "CO" && item.ConceptoPago.Clave != "MC" ?
                                                            <Column size={[1, 1, 1, 1]}>
                                                                <buttons.PopOver idParent={PAGE_ID} idForm={SECTION_CONCEPTO_ID} info={item}
                                                                    extraData={[edit, remove]} />
                                                            </Column>
                                                            :
                                                            <Column size={[1, 1, 1, 1]}>
                                                                <buttons.PopOver idParent={PAGE_ID} idForm={SECTION_CONCEPTO_ID} info={item}
                                                                    extraData={[edit]} />
                                                            </Column>
                                                        :
                                                        <Column size={[1, 1, 1, 1]}>
                                                            <buttons.PopOver idForm={SECTION_CONCEPTO_ID} info={item}
                                                                extraData={[Noedit]} />
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
                                                    <Column size={[12, 12, 12, 12]}> <ViewDocumentos documentos={item.Documentos} /></Column>
                                                </Column>
                                            </Row>
                                        </Row>;
                                    } } />
                            </PanelUpdate>
                        </SectionView>
                        <SectionEdit
                            idForm={SECTION_CONCEPTO_ID}
                            onCancel={this.onClickCancel}
                            editMode={true}
                            onSave={ConDocumentos > 0 && modificable == true ? () => this.onSelectPlanPagos(false) : null}>
                            <Row visible={displayform}>
                                <PlanesPagoDDL id="PlanPagos" idFormSection={SECTION_CONCEPTO_ID}  addNewItem={"SO"} />
                            </Row>
                            <Row visible={Nodisplayform}>
                                <Column size={[12, 12, 12, 12]}>
                                    {MuestraCampos == true ?
                                        <ConceptosPagoDDL id="ConceptoPago" label="Concepto" visible={MuestraCampos} tipoConcepto="MC" idFormSection={SECTION_CONCEPTO_ID} size={[12, 12, 8, 8]} />
                                        : <label.Entidad id="ConceptoPago" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Concepto" size={[12, 12, 6, 4]} />}
                                    <input.Currency
                                        id="ImporteMoneda"
                                        idFormSection={SECTION_CONCEPTO_ID}
                                        label="Capital"
                                        size={[12, 12, 6, 2]}
                                        maxLength={8}
                                        visible={MuestraCampos}
                                        validations={[validations.isNumber("Capture una cantidad")]} />
                                    <label.Currency id="ImporteMoneda" visible={OcultaCampos} idForm={SECTION_CONCEPTO_ID} label="Importe" size={[12, 12, 6, 2]} />
                                    <label.Currency id="Pagado" visible={OcultaCampos} idForm={SECTION_CONCEPTO_ID} label="Pagado" size={[12, 12, 6, 2]} />
                                    {modificable == false ?
                                        <label.Currency id="Saldo" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Saldo Capital" size={[12, 12, 6, 2]} />
                                        : <input.Currency
                                            id="Saldo"
                                            idFormSection={SECTION_CONCEPTO_ID}
                                            label="Saldo Capital"
                                            size={[12, 12, 6, 2]}
                                            maxLength={8}
                                            visible={OcultaCampos}
                                            validations={[validations.isNumber("Capture una cantidad")]} />
                                    }
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    {modificable == false ?
                                        <label.Entidad id="FrecuenciaPago" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Frecuencia Pagos" size={[12, 12, 6, 2]} />
                                        : <FrecuenciaPagoDDL
                                            id="FrecuenciaPago"
                                            idFormSection={SECTION_CONCEPTO_ID}
                                            label="Frecuencia Pagos"
                                            size={[12, 12, 6, 2]}
                                            change={this.onChange}
                                            validations={[
                                                validations.required("Campo Requerido")
                                            ]}
                                            />}
                                    {modificable == false ?
                                        <Label id="NumeroPlazoPrimerPago" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Plazo" size={[12, 12, 6, 2]} />
                                        : <input.Integer
                                            id="NumeroPlazoPrimerPago"
                                            idFormSection={SECTION_CONCEPTO_ID}
                                            label="Plazo"
                                            size={[12, 12, 6, 2]}
                                            maxLength={8}
                                            validations={[
                                                validations.required("Campo Requerido"),
                                                validations.isNumber("Capture una cantidad")
                                            ]}
                                            />}
                                    {modificable == false ?
                                        <label.Entidad id="PeriodoPrimerPago" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Primer Pago" size={[12, 12, 6, 2]} />
                                        : <PeriodoPagoDDL
                                            id="PeriodoPrimerPago"
                                            idFormSection={SECTION_CONCEPTO_ID}
                                            label="Primer Pago"
                                            size={[12, 12, 6, 2]}
                                            required={true}
                                            helpLabel="Periodo Primer Pago"
                                            validations={[
                                                validations.required("Campo Requerido")
                                            ]}
                                            />}
                                    {modificable == false || frecuenciaPago.Nombre == "CONTADO" ?
                                        <label.Label id="NumeroPagos" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Numero Pagos" size={[12, 12, 6, 2]} />
                                        : <input.Integer
                                            id="NumeroPagos"
                                            idFormSection={SECTION_CONCEPTO_ID}
                                            label="Numero Pagos"
                                            size={[12, 12, 6, 2]}
                                            maxLength={8}
                                            validations={[
                                                validations.required("Campo Requerido"),
                                                validations.isNumber("Capture una cantidad")
                                            ]}
                                            />}
                                    {modificable == false || frecuenciaPago.Nombre == "CONTADO" ?
                                        <label.Currency id="PorcentajeTIF" idForm={SECTION_CONCEPTO_ID} visible={OcultaCampos} label="Intereses" size={[12, 12, 6, 2]} />
                                        : <input.Currency
                                            id="PorcentajeTIF"
                                            idFormSection={SECTION_CONCEPTO_ID}
                                            label="Intereses"
                                            size={[12, 12, 6, 2]}
                                            maxLength={8}
                                            validations={[
                                                validations.isNumber("Capture una cantidad")
                                            ]}
                                            />}
                                </Column>
                            </Row>
                            <SectionEdit
                                idForm={SECTION_NOEDIT}
                                onCancel={this.onClickCancel}
                                onSave={null}>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ textAlign: "right" }} >
                                        <label.Entidad id="ConceptoPago" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Concepto" size={[12, 12, 6, 4]} />
                                        <label.Currency id="ImporteMoneda" visible={NoEditables} idForm={SECTION_CONCEPTO_ID} label="Importe" size={[12, 12, 6, 2]} />
                                        <label.Currency id="Pagado" visible={NoEditables} idForm={SECTION_CONCEPTO_ID} label="Pagado" size={[12, 12, 6, 2]} />
                                        <label.Currency id="Saldo" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Saldo Capital" size={[12, 12, 6, 2]} />
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <label.Entidad id="FrecuenciaPago" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Frecuencia Pagos" size={[12, 12, 6, 2]} />
                                        <Label id="NumeroPlazoPrimerPago" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Plazo" size={[12, 12, 6, 2]} />
                                        <label.Entidad id="PeriodoPrimerPago" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Primer Pago" size={[12, 12, 6, 2]} />
                                        <Label id="NumeroPagos" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Numero Pagos" size={[12, 12, 6, 2]} />
                                        <label.Currency id="PorcentajeTIF" idForm={SECTION_CONCEPTO_ID} visible={NoEditables} label="Intereses" size={[12, 12, 6, 2]} />
                                    </Column>
                                </Row>
                            </SectionEdit>
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ padding: 5, paddingTop: 15 }}>
                                    {MuestraDocumentos ?
                                        null
                                        : <page.SectionList
                                            id={SECTION_DOCUMENTOS}
                                            title="Documentos"
                                            onSave={this.onClickSaveAbono}
                                            hideNewButton={ConDocumentos > 0 && modificable == true && frecuenciaPago.Nombre != "CONTADO" ? false : true}
                                            level={1}
                                            parent={SECTION_CONCEPTO_ID}
                                            items={createSuccessfulStoreObject([])}
                                            readonly={false}
                                            addRemoveButton={false}
                                            listHeader={<div>
                                                <Row>
                                                    <div>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"NUMERO"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"VENCIMIENTO"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"CAPITAL"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"INTERÉS"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"PAGADO"}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }} className="list-default-header bold">{"IMPORTE"}</Column>
                                                    </div>
                                                </Row>
                                            </div>}
                                            formatter={(index_e: number, item: any, values: any) => {
                                                let itemStyle: React.CSSProperties = {
                                                    paddingTop: 5,
                                                    paddingBottom: 5
                                                };

                                                if (item.EstatusDoc === "CANCELADO") {
                                                    itemStyle.color = "#ea5353";
                                                    itemStyle.textDecorationSkip = "line-through";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.EstatusDoc === "PAGADO" || item.Status === "PAGADO" || item.Pagado == item.ImporteMoneda || item.Pagado > 0) {
                                                    itemStyle.color = "#84a950";
                                                    itemStyle.backgroundColor = "#FFECB3";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.EstatusDoc === "POR PAGAR") {
                                                    itemStyle.color = "#000000";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.TipoAbono.Clave === "AC") {
                                                    itemStyle.color = "#f0882f";
                                                    itemStyle.backgroundColor = "#FFECB3";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                return <Row style={itemStyle}>
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
                                                        {item.Numero ? item.Numero : "-----"}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }}>
                                                        {EK.UX.Labels.formatDate(item.Vencimiento, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.CapitalMoneda, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.InteresMoneda, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.Pagado, "---------------")}
                                                    </Column>
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.ImporteMoneda, "---------------")}
                                                    </Column>
                                                </Row>;
                                            } }>
                                            <Row>
                                                <DatePicker
                                                    id="Vencimiento"
                                                    idFormSection={SECTION_DOCUMENTOS}
                                                    label="Fecha de Abono"
                                                    size={[3, 3, 3, 3]} />
                                                <input.Currency
                                                    id="ImporteMoneda"
                                                    idFormSection={SECTION_DOCUMENTOS}
                                                    label="Importe"
                                                    size={[12, 12, 6, 2]}
                                                    maxLength={8}
                                                    validations={[validations.isNumber("Capture una cantidad")]} />
                                                <Input id="Pagado" value={0} idFormSection={SECTION_DOCUMENTOS} visible={false} />
                                            </Row>
                                        </page.SectionList>}
                                    {estatusVenta.Clave != "D" && estatusVenta.Clave != "CO" ?
                                        <page.SectionList
                                            id={SECTION_REESTRUCTURA}
                                            title="Documentos"
                                            onSave={this.onClickSaveAbono}
                                            hideNewButton={ConDocumentos > 0 && modificable == true && frecuenciaPago.Nombre != "CONTADO" ? false : true}
                                            level={1}
                                            parent={SECTION_CONCEPTO_ID}
                                            items={createSuccessfulStoreObject([])}
                                            readonly={false}
                                            addRemoveButton={false}
                                            inlineEdie={false}
                                            listHeader={<div>
                                                <Row>
                                                    <div>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"NUMERO"}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"VENCIMIENTO"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"CAPITAL"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"INTERÉS"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"PAGADO"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"IMPORTE"}</Column>
                                                    </div>
                                                </Row>
                                            </div>}
                                            formatter={(index_e: number, item: any, values: any) => {
                                                let itemStyle: React.CSSProperties = {
                                                    paddingTop: 5,
                                                    paddingBottom: 5
                                                };

                                                if (item.Status === "CANCELADO") {
                                                    itemStyle.color = "#ea5353";
                                                    itemStyle.textDecorationSkip = "line-through";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.EstatusDoc === "CANCELADO") {
                                                    itemStyle.color = "#ea5353";
                                                    itemStyle.backgroundColor = "#FFECB3";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.EstatusDoc === "PAGADO" || item.Status === "PAGADO" || item.Pagado == item.ImporteMoneda || item.Pagado > 0) {
                                                    itemStyle.color = "#84a950";
                                                    itemStyle.backgroundColor = "#FFECB3";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.Status === "POR PAGAR" || item.Status === "EDOCUENTA") {
                                                    itemStyle.color = "#000000";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                if (item.Status === "Abono" || item.EstatusDoc === "Abono") {
                                                    itemStyle.color = "#f0882f";
                                                    itemStyle.backgroundColor = "#FFECB3";
                                                    itemStyle.fontWeight = "bolder";
                                                }

                                                return <Row style={itemStyle}>
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
                                                        {item.Numero ? item.Numero : "-----"}
                                                    </Column>
                                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
                                                        {EK.UX.Labels.formatDate(item.Vencimiento, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.CapitalMoneda, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.InteresMoneda, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.Pagado, "---------------")}
                                                    </Column>
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                                        {EK.UX.Labels.formatMoney(item.ImporteMoneda, "---------------")}
                                                    </Column>
                                                </Row>;
                                            } }>
                                            <Row>
                                                <DatePicker
                                                    id="Vencimiento"
                                                    idFormSection={SECTION_REESTRUCTURA}
                                                    label="Fecha de Abono"
                                                    size={[3, 3, 3, 3]}
                                                    />
                                                <input.Currency
                                                    id="ImporteMoneda"
                                                    idFormSection={SECTION_REESTRUCTURA}
                                                    label="Importe"
                                                    size={[12, 12, 6, 2]}
                                                    maxLength={8}
                                                    validations={[validations.isNumber("Capture una cantidad")]}
                                                    />
                                                <Input id="Pagado" value={0} idFormSection={SECTION_DOCUMENTOS} visible={false} />
                                            </Row>
                                        </page.SectionList>
                                        : null}
                                </Column>
                            </Row>
                        </SectionEdit>
                    </OptionSection>}
            </div>;
        };
    };
    export let PlanPagosView: any = ReactRedux.connect(PlanPagos.props, PlanPagos.dispatchs)(PlanPagos);
    /*** END: VIEW FORM ***/

    /*** BEGIN: Plan de Pagos ***/
    interface IViewPPProps extends React.Props<any> {
        planPagos: DataElement;
        setSelectedItem: (item: any) => void;
        setInfoConcepto: (concepto: any) => void;
        venta: boolean;
        item?: any;
    };

    class ViewPP extends React.Component<IViewPPProps, {}> {
        constructor(props: IViewPPProps) {
            super(props);
            this.onClickSelect = this.onClickSelect.bind(this);
            this.onClickView = this.onClickView.bind(this);
        };
        static props: any = (state: any) => {
            return {
                planPagos: Forms.getDataValue("PlanPagos", PAGE_ID, state, {}),
                item: state.global.currentEntity
            }
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            setSelectedItem: (item: any): void => {
                dispatchSuccessful("scv-ventas-setSelectedConcepto", item);
            }
        });
        onClickSelect(item: any): void {
            Forms.remove(SECTION_CONCEPTO_ID);
            this.props.setInfoConcepto(item);
        };
        onClickView(item: any): void {
            Forms.remove(SECTION_CONCEPTO_ID);
            this.props.setInfoConcepto(item);
        };
        shouldComponentUpdate(nextProps: IViewPPProps, {}): boolean {
            return hasChanged(this.props.planPagos, nextProps.planPagos)
        };
        render(): JSX.Element {
            let $page: any = $ml[VENTA_PAGE_ID];
            let EstatusVenta: any = getData(this.props.item).EstatusVenta;

            return <List
                items={getData(this.props.planPagos).Conceptos}
                readonly={true}
                addRemoveButton={false}
                aggregate={(item: any, values: any) => {
                    if (!values.Capital) values.Capital = 0;
                    if (!values.Interes) values.Interes = 0;
                    if (!values.Importe) values.Importe = 0;

                    if (item.OnEdit !== true) {
                        values.Capital += item.CapitalMoneda ? item.CapitalMoneda : 0;
                        values.Interes += item.InteresMoneda ? item.InteresMoneda : 0;
                        values.Importe += item.ImporteMoneda ? item.ImporteMoneda : 0;
                    };

                    return values;
                } }
                listFooter={(values: any) => {
                    return <div>
                        <Row>
                            <Column size={[5, 5, 5, 5]} style={{ textAlign: "right" }}>{""}</Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                <span className="badge badge-info list-footer-badge">
                                    {EK.UX.Labels.formatMoney(values.Capital)}
                                </span>
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                <span className="badge badge-info list-footer-badge">
                                    {EK.UX.Labels.formatMoney(values.Interes)}
                                </span>
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                <span className="badge badge-info list-footer-badge">
                                    {EK.UX.Labels.formatMoney(values.Importe)}
                                </span>
                            </Column>
                        </Row>
                    </div>;
                } }
                listHeader={<Column>
                    <Column size={[3, 3, 3, 3]} style={{ textAlign: "center" }} className="list-default-header">{"Concepto"}</Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-center-header">{"Plazo"}</Column>
                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header">{"Primer Pago"}</Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header">{"Capital"}</Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header">{"Pagado"}</Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header">{"Saldo"}</Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header">{"Interés"}</Column>
                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header">{"Importe"}</Column>
                </Column>}
                formatter={(index: number, item: any) => {
                    return <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
                        <CollapseList item={item} />
                        <Column size={[2, 2, 2, 2]}>
                            {item.ConceptoPago.Nombre}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                            ({item.NumeroPagos}) {item.FrecuenciaPago.Nombre}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                            ({item.NumeroPlazoPrimerPago}) {item.PeriodoPrimerPago.Nombre}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                            {EK.UX.Labels.formatMoney(item.CapitalMoneda)}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                            {EK.UX.Labels.formatMoney(item.Pagado)}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                            {EK.UX.Labels.formatMoney(item.Saldo)}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                            {EK.UX.Labels.formatMoney(item.InteresMoneda)}
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                            {EK.UX.Labels.formatMoney(item.ImporteMoneda)}
                        </Column>
                        {item.Modificable === true && !this.props.venta ?
                            <Column size={[1, 1, 1, 1]}>
                                <Button className="btn  default btn-default-ek" onClick={this.onClickSelect} info={item} icon="icon-pencil"></Button>
                            </Column> :
                            <Column size={[1, 1, 1, 1]}>
                                <Button className="btn  default btn-default-ek" onClick={this.onClickView} info={item} icon="fas fa-bars"></Button>
                            </Column>}

                        <div className="panel-collapse well well-sm collapse" id={"colapsa" + item.ID} aria-expanded="false" style={{ marginLeft: 10, marginRight: 10 }}>
                            <Column size={[10, 10, 10, 10]}> <ViewDocumentos documentos={item.Documentos} /></Column>
                        </div>
                    </Row>;
                } } />;
        };
    };
    let View$PP: any = ReactRedux.connect(ViewPP.props, ViewPP.dispatchs)(ViewPP);

    /*** BEGIN: EDIT CONCEPTO ***/
    interface IEditProps extends React.Props<any> {
        abono: DataElement;
        planPagos: DataElement;
        pp: DataElement;
        concepto?: EditForm;
        items: DataElement;
        fechaAbono: Date;
        importeAbono: number;
        idAbono: number;
        setSelectedDocs: (documentos: any[]) => void;
        setInfoConcepto: (concepto: any) => void;
        recalcularPlanPagos: (concepto: any) => void;
        venta: boolean;
    };

    interface IEditState {
        editAbono: boolean;
        abono: any;
    };

    interface IPlanesPagoDDLProps extends IDropDrownListProps {
        entidad: any;
    };

    class PlanesPago$DDL extends React.Component<IPlanesPagoDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PLANPAGOSVENTA,
            entidad: state.global.currentEntity,
        });
        static defaultProps: IPlanesPagoDDLProps = {
            id: "PlanPagos",
            items: createDefaultStoreObject([]),
            label: "Planes de Pago",
            helpLabel: "Seleccione el plan de pagos",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            entidad: undefined,
        };
        shouldComponentUpdate(nextProps: IPlanesPagoDDLProps, nextState: IPlanesPagoDDLProps): boolean {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                   global.hasChanged(this.props.items, nextProps.items);
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let entidad: any = getData(this.props.entidad);
                let idTipoComercializacion: number = entidad && entidad.Expediente ? entidad.Expediente.IdTipoComercializacion : 0;
                let idFinanciamiento: number = entidad && entidad.Financiamiento ? entidad.Financiamiento.IdFinanciamiento : 0;


                if (idTipoComercializacion > 0 && idFinanciamiento > 0)
                {
                    obtenerListaPlanPagos(idTipoComercializacion, idFinanciamiento);
                }
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    const PlanesPagoDDL: any = ReactRedux.connect(PlanesPago$DDL.props, null)(PlanesPago$DDL);

    let obtenerListaPlanPagos: (idTipoComercializacion: number, idFinanciamiento: number) => any =(idTipoComercializacion: number, idFinanciamiento: number): any => {
        dispatchAsync("load::PLANPAGOSVENTA", "base/scv/planesPagos/Get/GetAll/"
                + global.encodeParameters({
                idTipoComercializacion: idTipoComercializacion,
                idFinanciamiento: idFinanciamiento,
                }));
        };

    interface IViewDocumentosProps extends React.Props<any> {
        documentos?: any[];
        modo?: string;
        item?: any;
    };

    //modo: Todos, PorPagar, Pagados, Cancelados
    export class ViewDocumentos extends React.Component<IViewDocumentosProps, IViewDocumentosProps> {
        constructor(props: IViewDocumentosProps) {
            super(props);
            this.state = { modo: "Todos" };
        };
        onTodosClick(): void {
            this.setState({ modo: "Todos" });
        }
        onPorPagarClick(): void {
            this.setState({ modo: "PorPagar" });
        }
        onPagadosClick(): void {
            this.setState({ modo: "Pagados" });
        }
        onCanceladosClick(): void {
            this.setState({ modo: "Cancelados" });
        }
        render(): JSX.Element {
            let $page: any = $ml[VENTA_PAGE_ID];
            let modo: any = this.state.modo;
            var today: Date = new Date(),
                date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

            if (this.props.documentos)
            {
                let items: any[] = this.props.documentos.filter((value: any, index: number) => {
                    if (modo === "Todos") {
                        return value.EstatusDoc !== "CANCELADO" && value.Status !== "CANCELADO";
                    }
                    else if (modo === "PorPagar") {
                        return value.EstatusDoc === "POR PAGAR" || value.Status === "POR PAGAR";
                    }
                    else if (modo === "Pagados") {
                        return value.EstatusDoc === "PAGADO" || value.Status === "PAGADO" || value.EstatusDoc == "Abono";
                    }
                    else if (modo === "Cancelados") {
                        return value.EstatusDoc === "CANCELADO" || value.Status === "CANCELADO";
                    }
                });


                return <List
                    items={items}
                    readonly={true}
                    addRemoveButton={false}
                    listHeader={<div>
                        <Row>
                            <div className="portlet light portlet-fit bordered">
                                <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"NUMERO"}</Column>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"VENCIMIENTO"}</Column>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"CAPITAL"}</Column>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"INTERÉS"}</Column>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"PAGADO"}</Column>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="list-default-header bold">{"IMPORTE"}</Column>
                                <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                                    <div className="actions">
                                        <div className="btn-group">
                                            <a className="btn btn-icon-only" href="javascript:void(0)" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">
                                                <i className="fa fa-filter"></i>
                                            </a>
                                            <ul className="dropdown-menu pull-right bold">
                                                <li><a href="javascript:void(0)" onClick={this.onTodosClick.bind(this)}>Todos</a></li>
                                                <li><a href="javascript:void(0)" onClick={this.onPorPagarClick.bind(this)}>Por Pagar</a></li>
                                                <li><a href="javascript:void(0)" onClick={this.onPagadosClick.bind(this)}>Pagados</a></li>
                                                <li><a href="javascript:void(0)" onClick={this.onCanceladosClick.bind(this)}>Cancelados</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Column>
                            </div>
                        </Row>
                    </div>}
                    formatter={(index_e: number, item: any, values: any) => {
                        let itemStyle: React.CSSProperties = {
                            paddingTop: 5,
                            paddingBottom: 5
                        };

                        if (item.EstatusDoc === "CANCELADO" || item.Status === "CANCELADO") {
                            itemStyle.color = "#ea5353";
                            itemStyle.textDecorationSkip = "line-through";
                            itemStyle.fontWeight = "bolder";
                        }

                        if (item.EstatusDoc === "PAGADO" || item.Status === "PAGADO") {
                            itemStyle.color = "#84a950";
                            itemStyle.backgroundColor = "#FFECB3";
                            itemStyle.fontWeight = "bolder";
                        }

                        if (item.EstatusDoc === "POR PAGAR" || item.Status === "POR PAGAR") {
                            itemStyle.color = "#000000";
                            itemStyle.backgroundColor = "#FFECB3";
                        }

                        if (item.EstatusDoc === "Abono" || item.Status === "Abono") {
                            itemStyle.color = "#f0882f";
                            itemStyle.backgroundColor = "#FFECB3";
                            itemStyle.fontWeight = "bolder";
                        }

                        return <Row style={itemStyle}>
                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
                                {item.Numero ? item.Numero : "-----"}
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }}>
                                {EK.UX.Labels.formatDate(item.Vencimiento, "---------------")}
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                {EK.UX.Labels.formatMoney(item.CapitalMoneda, "---------------")}
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                {EK.UX.Labels.formatMoney(item.InteresMoneda, "---------------")}
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                {EK.UX.Labels.formatMoney(item.Pagado, "---------------")}
                            </Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                {EK.UX.Labels.formatMoney(item.ImporteMoneda, "---------------")}
                            </Column>
                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                            </Column>
                        </Row>
                    }} />


            }

            return null;
        };
    };

    interface ICollapseProps extends React.Props<any> {
        item?: any[];
    };

    interface ICollapseState {
        collapsed?: boolean;
    };

    export class CollapseList extends React.Component<ICollapseProps, ICollapseState> {
        constructor(props: ICollapseProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
            this.state = { collapsed: true };
        }
        onClick(): void {
            this.setState({ collapsed: !this.state.collapsed })
        };
        render(): JSX.Element {
            let item: any = this.props.item;

            let CollapseList: any;
            if (!this.state.collapsed) {
                CollapseList = <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
                    <a key={item.ID} data-id={item.ID} onClick={this.onClick} className={"list-toggle-container collapsed"} aria-expanded="false" href={"#colapsa" + item.ID} data-toggle="collapse" >
                        <i className="fa fa-caret-up"></i>
                    </a>
                </Column>
            } else {
                CollapseList = <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }}>
                    <a key={item.ID} data-id={item.ID} onClick={this.onClick} className={"list-toggle-container collapsed"} aria-expanded="false" href={"#colapsa" + item.ID} data-toggle="collapse" >
                        <i className="fa fa-caret-down" ></i >
                    </a>
                </Column>
            }

            return CollapseList;
        }
    };

    const PPMessages: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        render(): any {
            let pp: any;
            let financiamiento: any;
            let ubicaciones: any[];
            let ppdata: any;

            if (page.canViewReadMode(this.props.state)) {
                if (global.isSuccessful(this.props.entidad)) {
                    let venta: any = global.getData(this.props.entidad);

                    pp = venta.PlanPagos;
                    financiamiento = venta.Financiamiento;
                    ubicaciones = venta.Ubicaciones;
                }
            }
            else {
                if (page.canViewEditMode(this.props.state)) {
                    pp = Forms.getValue("PlanPagos", SECTION_CONCEPTO_ID);
                    financiamiento = Forms.getValue("Financiamiento", SECTION_CONCEPTO_ID);
                    ubicaciones = Forms.getValue("Ubicaciones", SECTION_CONCEPTO_ID);
                }
            };

            if (financiamiento == null || ubicaciones == null) {
                financiamiento = getData(Forms.getValue("Financiamiento", VENTA_PAGE_ID));
                ubicaciones = getData(Forms.getValue("Ubicaciones", VENTA_PAGE_ID));
                pp = Forms.getValue("PlanPagos", VENTA_PAGE_ID);
                ppdata = getData(Forms.getValue("PlanPagos", VENTA_PAGE_ID));
            };

            let totalUbicaciones: number = 0;
            if (ubicaciones !== null && ubicaciones.length > 0) {
                ubicaciones.forEach((value: any, index: number): any =>
                {
                    if (!value._eliminado == true)
                    {
                        totalUbicaciones += value.ImporteMoneda;
                    }
                });
            };

            let totalPlanPagos: number = 0;
            if (pp && pp.Conceptos) {
                let conceptos: any[] = pp.Conceptos;
                if (conceptos !== null && conceptos.length > 0) {
                    conceptos.forEach((value: any, index: number): any => {
                        totalPlanPagos += value.Capital;
                    });
                }
            };

            if (ppdata && ppdata.Conceptos) {
                let conceptos: any[] = ppdata.Conceptos;
                if (conceptos !== null && conceptos.length > 0) {
                    conceptos.forEach((value: any, index: number): any => {
                        totalPlanPagos += value.Capital;
                    });
                }
            };

            let messages: string[] = [];
            if (totalUbicaciones > totalPlanPagos) {
                messages.push("El Plan de Pagos no puede cubrir el total de la venta ( Diferencia: " + EK.UX.Labels.formatMoney(totalUbicaciones - totalPlanPagos) + " ). Favor de verificar los conceptos.");
            }

            // let venta: any = global.getData(this.props.entidad);
            if (!ubicaciones || !ubicaciones.length) {
                messages.push("No se tienen ubicaciones asignadas. Favor de verificar.");
            }

            if (!financiamiento && !financiamiento.length) {
                messages.push("No se ha seleccionado un financiamiento. Favor de verificar.");
            }

            if (messages && messages.length) {
                let elements: JSX.Element[] = messages.map((value: string, index: number) => {
                    return <p key={index} style={{ fontWeight: "bold" }}>{value}</p>
                });
                return <div className="note note-warning" style={{ margin: 0 }}>{elements}</div>
            }

            return null;
        }
    });
}
namespace EK.Modules.SCV.Pages.postventa.RUBA.CheckList {
    "use strict";
    let CHECKLIST_ID = "SPVCheckList";
    const SECTION_CAPTURA_INFO: string = "CapturaInfo";
    const SECTION_CONCEPTO_ID: string = "ConsultaVE";
    const SECTION_CHECKLIST: string = "Checklist";
    const SECTION_CHECKLIST_PROGRAMADOS: string = "ChecklistProgramados";

    //Variables 
    let displayform: boolean;
    let Nodisplayform: boolean;
    let BotonOK: any;
    let OcultaSave: any;
    let OcultaExcel: any;
    let OcultaCheck: any;


    BotonOK = "No Programado";

    OcultaCheck = false;
    OcultaSave = false;
    Nodisplayform = false;

    export class SPVTitulosCheckList {
        static titulos: any = {
            'FCONS': "CHECKLIST - CONSTRUCCION",
            'ENTVIV': "CHECKLIST - ENTREGA"
        };
    }

    interface ILinkCheckListProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        //  uso?: any;
        //  origen?: any;
        checkListParameters?: any;
        //item:  any;
    };

    export const CheckListModalBase: any = global.connect(class extends React.Component<ILinkCheckListProps, {}> {
        //export class CheckListModalBase extends React.Component<ILinkCheckListProps, {}> {
        constructor(props: ILinkCheckListProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };

        static props: any = (state: any) => ({
            //uso: state.global.CheckListParameters.uso,
            //origen: state.global.CheckListParameters.origen
            checkListParameters: state.global.CheckListParameters

        });

        onShow(): void {
            let modalObj: any = $("#modalCheckList");
            modalObj.modal();
            modalObj.css("height", "auto");
        };
        //componentDidMount(): void {
        //    //Cargamos Elementos del Item si tiene agregados
        //    global.asyncPost("CapturaFechaConstruccion/GetProgramados/", { numcte: item.numcte, Uso:'FCONS' }, (status: AsyncActionTypeEnum, data: any[]) => {
        //        if (status === AsyncActionTypeEnum.successful) {

        //            //Actualizamos el Estado ConfigDetProgEdit
        //            Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", data);

        //        }
        //    });

        //};

        shouldComponentUpdate(nextProps: ILinkCheckListProps, {}): boolean {
            return hasChanged(this.props.checkListParameters, nextProps.checkListParameters);
        }

        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalCheck uso={getData(this.props.checkListParameters).uso} origen={getData(this.props.checkListParameters).origen} />
            </Column>
        }
    });

    interface IModalCheckProps extends page.IProps, grid.IColumn {
        onHide?: () => void;
        uso?: any;
        origen?: any;
    };

    //***Modal para mostrar la información de la cotización seleccionada***//
    let ModalCheck: any = global.connect(class extends React.Component<IModalCheckProps, {}> {
        constructor(props: IModalCheckProps) {
            super(props);
            this.onSaveCheklist = this.onSaveCheklist.bind(this);
            this.getSaveProgramados = this.getSaveProgramados.bind(this);
        };
        static defaultProps: IModalCheckProps = {
        };
        refs: {
            modal: Element;
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => {

            }
        });

        getSaveProgramados(): any {
            let itemsCheckList: any[];
            let UsuarioSeleccionado: any = Forms.getValue("CheckListEdit", SECTION_CHECKLIST);
            let retValues: any[] = [];
            let Estatus: any;
            itemsCheckList = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
            //Validamos que Ubicaciones no este vacio
            if (itemsCheckList === undefined) {
                warning("Debe especificar un Detalle de Programación!");
            } else {
                itemsCheckList = EK.Store.getState().forms.ChecklistProgramados.form.ConfigDetProgEdit.value;
                itemsCheckList.forEach((value) => {
                    let retValue: any = global.assign(value.item, {
                        NumCte: UsuarioSeleccionado.numcte,
                        Desc_detalle: value.detalle,
                        Cve_detalle: value.Cve_detalle,  //value.id_detalle === undefined ? value.Cve_detalle : value.id_detalle,
                        Bit_reparado: value.Bit_reparado ? true : false,
                    });
                    retValues.push(retValue);
                });
            }
            return retValues;
        };

        //Guardado de informacion en Base de Datos
        onSaveCheklist(): void {
            let actionUrl: string = "/CapturaFechaConstruccion/SaveProgramados";
            //Guardado Agenda Entrada Vivienda SPV
            let UbicacionesAgenda: any[] = this.getSaveProgramados();
            if (UbicacionesAgenda === null || UbicacionesAgenda === undefined || UbicacionesAgenda.length === 0) {
                return;
            }

            Forms.updateFormElement(SECTION_CONCEPTO_ID, "ChecklistProgramados", UbicacionesAgenda);
            let item: EditForm = Forms.getForm(SECTION_CONCEPTO_ID);
            // console.log(item);
            let model: any = item
            //Asignamos la Propiedad ubicaciones Agenda al Modelo
            model["Programados"] = UbicacionesAgenda;
            // console.log(model)
            global.dispatchAsyncPost("global-page-data", "CapturaFechaConstruccion/SaveProgramados/", model, "ChecklistProgramadosGuardados");
            BotonOK = 'No Programado';
        }

        onClose(): void {
            let modalObj: any = $("#modalCheckList");
            modalObj.modal('hide');
        };


        header(info: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };
        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                {
                    this.props.origen === 'CONS' ?
                        null
                        :
                        <button type="button" onClick={this.onSaveCheklist.bind(this)} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Guardar</button>
                }
                < button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md blue" data-dismiss="modal" > Cerrar</button >
            </div>
        };

        render(): JSX.Element {
            let tituloModal: any = SPVTitulosCheckList.titulos[this.props.uso] ? SPVTitulosCheckList.titulos[this.props.uso] : 'SIN CONFIGURACION';
            return <modal.Modal id="modalCheckList" header={this.header(tituloModal)} footer={this.footerPersonalized()} /*addDefaultCloseFooter={true}*/ >
                <Edit uso={this.props.uso} origen={this.props.origen} />
            </modal.Modal>
        }
    });


    interface IEdit extends page.IProps {
        // agenda: any;
        item: DataElement;
        uso?: any;
        checklist?: any
        origen?: any;
        Check?: any;
        programados?: any;
        //checkListParameters?: any; 
        GuardaDetProg?: (numcte: number, desc_detalle_repr: any, cve_detalle: number, bit_reparado: number) => void;
    }
    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            checklist: state.global.catalogo$CheckListResult,
            programados: Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS, state),
            Check: Forms.getDataValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS, state)
            // checkListParameters: state.global.CheckListParameters
            // agenda: state.global.entity$AgendaNew
        });

        constructor(props: IEdit) {
            super(props);
            //this.onSelect = this.onSelect.bind(this);
            //this.onClickCancel = this.onClickCancel.bind(this);
            //this.onSaveFechaConstruccion = this.onSaveFechaConstruccion.bind(this);
            //this.onSaveCheklist = this.onSaveCheklist.bind(this);
            //this.getSaveProgramados = this.getSaveProgramados.bind(this);
            this.onSelectEliminamosUbicaciones = this.onSelectEliminamosUbicaciones.bind(this);
        };

        onSelectEliminamosUbicaciones(item: any, e: any): void {
            //Seleccionamos Arreglo de ubicaciones seleccionado
            let UbicacionesAgenda: any[] = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
            //Filtramos Ubicaciones
            let Filtrado: any[] = (UbicacionesAgenda.filter(ubicaciones => ubicaciones.detalle != item.detalle));
            //Actualizamos el Estado UbicacionesAgendaEdit
            Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", Filtrado);

        }

        //Seleccion multiple de Conceptos de Programacion
        onSelectDetProg(item: any, e: any): void {
            //e.preventDefault();
            //onSelectDetProg(item: any): void {
            let conceptos: any[];
            let Programados: any[] = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
            if (Programados === undefined) {
                Programados = [];
            }

            if (Programados !== undefined) {
                //Asignamos el Arreglo de Conceptos al DataElement
                let items: DataElement = global.createSuccessfulStoreObject(Programados);
                if (item.ID == undefined && item.ID == null) {
                    item.ID = items.getNextLowerID();
                };
                let estado: global.DataElement;
                estado = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
                let existe: boolean = false;
                //Conceptos
                let nConceptos: any = []
                nConceptos = getData(Programados);
                for (var i = 0; i < Programados.length; i++) {
                    let nConcepto: any = global.assign(Programados[i]);
                    if (item.id_detalle === nConcepto.Cve_detalle  /*|| item.id_detalle === nConcepto.id_detalle*/) {
                        warning("El concepto ya se encuentra agregado a la Lista!");
                        conceptos = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
                        existe = true;
                        break;
                    }
                }
                if (existe === false) {
                    // item.ID = -1;   // para indicar que es un registro nuevo
                    item._nuevo = 1;
                    item.Cve_detalle = item.id_detalle;
                    // item.id_detalle = null;
                    let retValue: DataElement = items.upsertItem(item);
                    //Actualizamos el Estado ConfigDetProgEdit
                    Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", getData(retValue));
                } else {
                    BotonOK = 'No Finalizado';
                    conceptos = Programados;
                    //Actualizamos el Estado ConfigDetProgEdit
                    Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", conceptos);
                }
                //}
                //else {
                //    //Actualizamos el Estado ConfigDetProgEdit
                //    Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", [conceptos]);
            }

        }

        // Ponemos OK el Concepto de Programacion
        onSelectProgramadoOK(item: any, e: any): void {
            let Programados: any = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
            //Conceptos
            let nConceptos: any = []
            for (var i = 0; i < Programados.length; i++) {
                let nConcepto: any = Programados[i];
                if (item.Cve_detalle === nConcepto.Cve_detalle) {
                    Programados[i].Estado = 'Finalizado';
                    Programados[i].Estatus = 'Finalizado';
                    Programados[i]._nuevo = 2;
                    Programados[i].Bit_reparado = true;
                    Programados.timestamp = Number(new Date());
                    BotonOK = 'Programado';
                    Programados[i].IdEstatus = "Programado";
                    success("Detalle Finalizado con Exito! Debe Guardar la Información");
                    break;
                };
            };
            let Filtrado: any[] = (Programados.filter(ubicaciones => ubicaciones.detalle != 11111111111111));
            Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", Filtrado);
        }






        //Funcion para Obtener todos los Items Programados
        //getSaveProgramados(): any {
        //    let itemsCheckList: any[];
        //    let UsuarioSeleccionado: any = Forms.getValue("CheckListEdit", SECTION_CHECKLIST);
        //    let retValues: any[] = [];
        //    let Estatus: any;
        //    itemsCheckList = Forms.getValue("ConfigDetProgEdit", SECTION_CHECKLIST_PROGRAMADOS);
        //    //Validamos que Ubicaciones no este vacio
        //    if (itemsCheckList === undefined) {
        //        warning("Debe especificar un Detalle de Programacion!");
        //    } else {
        //        itemsCheckList = EK.Store.getState().forms.ChecklistProgramados.form.ConfigDetProgEdit.value;
        //        itemsCheckList.forEach((value) => {
        //            let retValue: any = global.assign(value.item, {
        //                NumCte: UsuarioSeleccionado.numcte,
        //                Desc_detalle: value.detalle,
        //                Cve_detalle: value.Cve_detalle,  //value.id_detalle === undefined ? value.Cve_detalle : value.id_detalle,
        //                Bit_reparado: value.Bit_reparado ? true : false,
        //            });
        //            retValues.push(retValue);
        //        });
        //    }
        //    return retValues;
        //};

        ////Guardado de informacion en Base de Datos
        //onSaveCheklist(): void {
        //    let actionUrl: string = "/CapturaFechaConstruccion/SaveProgramados";
        //    //Guardado Agenda Entrada Vivienda SPV
        //    let UbicacionesAgenda: any[] = this.getSaveProgramados();
        //    if (UbicacionesAgenda === null || UbicacionesAgenda === undefined || UbicacionesAgenda.length === 0) {
        //        return;
        //    }

        //    Forms.updateFormElement(SECTION_CONCEPTO_ID, "ChecklistProgramados", UbicacionesAgenda);
        //    let item: EditForm = Forms.getForm(SECTION_CONCEPTO_ID);
        //    let model: any = item
        //    //Asignamos la Propiedad ubicaciones Agenda al Modelo
        //    model["Programados"] = UbicacionesAgenda;
        //    global.dispatchAsyncPost("global-page-data", "CapturaFechaConstruccion/SaveProgramados/", model, "ChecklistProgramados");
        //    // BotonOK = 'No Programado';
        //    success("CheckList Guardado Correctamente!");
        //}

        componentDidMount(): void {
            // Forms.updateFormElement(SECTION_CHECKLIST_PROGRAMADOS, "ConfigDetProgEdit", null);
            //this.props.config.setState({ viewMode: false }, CHECKLIST_ID);
        };
        componentWillMount(): void {
            ////   Forms.updateFormElement(CHECKLIST_ID, "UbicacionesAgenda");
        };

        //onClose(): void {
        //    let modalObj: any = $("#modalCheckList");
        //    modalObj.modal('hide');
        //};

        //shouldComponentUpdate(nextProps: IEdit, {}): boolean {
        //    return hasChanged(this.props.checklist, nextProps.checklist) ||
        //           hasChanged(this.props.programados, nextProps.programados); 
        //}

        render(): JSX.Element {
            let $page: any = $ml[CHECKLIST_ID];
            let modoEdicion: boolean = this.props.origen == 'CONS' ? false : true;

            let checklist: DataElement = this.props.checklist;
            if (isSuccessful(this.props.checklist)) {
                checklist = this.props.checklist.getActiveItems();
                checklist.timestamp = Number(new Date());
            }


            return <Row>
                <input.Text id="Observaciones" label="Información Adicional" size={[12, 12, 12, 12]} maxLength={250} rowspan={250} idFormSection="DetallesCita" required={false} />
                <Column size={[12, 12, 12, 12]} style={{ overflowY: "scroll", height: "450px", marginTop: "12px" }} >
                    <SectionEdit
                        idForm={SECTION_CHECKLIST}
                        //  onCancel={this.onClickCancel}
                        onSave={null}>
                        <Row visible={true /*Nodisplayform*/}>
                            <Column size={[12, 12, 4, 4]}>
                                <OptionSection
                                    title="Lista Disponible"
                                    id={SECTION_CHECKLIST}
                                    icon="fa fa-table"
                                    level={2}
                                    horizontalScrolling={true}
                                    selectable={true}
                                    height={"100px"}
                                    collapsed={false}>
                                    <PanelUpdate info={this.props.checklist}>
                                        <List
                                            items={checklist}
                                            readonly={false}
                                            addRemoveButton={false}
                                            dragAndDrop={false}
                                            listHeader={<div>
                                                <Row>
                                                    <Column>
                                                        <Column size={[10, 10, 10, 10]} style={{ textAlign: "center" }} className="list-default-header bold">{"DETALLES"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"AGREGAR"}</Column>
                                                    </Column>
                                                </Row>
                                            </div>}
                                            formatter={(index88: number, itemCheckListABC: any) => {
                                                return <Row style={{ textAlign: "left" }} id={"row_concepto_00" + index88} className="panel-collapsed" >
                                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                        <Row>
                                                            <Column size={[10, 10, 10, 10]} className="listItem-left-header " >
                                                                <i style={{ color: "#448AFF" }}></i>{itemCheckListABC.detalle}
                                                            </Column>
                                                            <Column size={[2, 2, 2, 2]} className="listItem-center-header ">
                                                                {modoEdicion ?
                                                                    <i className="fa fa-plus-square" title="Agregar Detalle" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.onSelectDetProg(itemCheckListABC, e)}        ></i>
                                                                    :
                                                                    null
                                                                }
                                                            </Column>
                                                        </Row>
                                                    </Column>
                                                </Row>
                                            } } />
                                    </PanelUpdate>
                                </OptionSection>
                            </Column>
                            <Column size={[12, 12, 8, 8]}>
                                <OptionSection
                                    title="Detalles"
                                    id={SECTION_CHECKLIST_PROGRAMADOS}
                                    icon="fa fa-table"
                                    level={2}
                                    collapsed={false}>
                                    <List
                                        items={this.props.programados}
                                        readonly={false}
                                        addRemoveButton={false}
                                        horizontalScrolling={true}
                                        dragAndDrop={false}
                                        listHeader={<Column size={[12, 12, 12, 12]}>
                                            <Row>
                                                <Column size={[10, 10, 10, 10]} style={{ textAlign: "center" }} className="list-default-header bold">{"DETALLES"}</Column>
                                                <Column size={[3, 3, 3, 3]} style={{ textAlign: "center" }} className="list-default-header bold">{"CERTIFICACIÓN"}</Column>
                                                <Column size={[3, 3, 3, 3]} style={{ textAlign: "center" }} className="list-default-header bold">{"TERMINADO"}</Column>
                                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"ELIMINAR"}</Column>
                                                <Column size={[3, 3, 3, 3]} style={{ textAlign: "center" }} className="list-default-header bold">{"MODIFICADO"}</Column>
                                            </Row>
                                        </Column>}
                                        formatter={(index77: number, item: any) => {
                                            return <Row style={{ textAlign: "left" }}>
                                                <Column size={[10, 10, 10, 10]} className="listItem-left-header  "><i style={{ color: "#448AFF" }}></i>{item.detalle}</Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-center-header " style={{ textAlign: "center" }}>
                                                    {item.Certificacion && item.Certificacion.ID ? <span style={{ color: "#F1C40F" }}><i className="fas fa-star"></i></span> : null}
                                                </Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-center-header " style={{ textAlign: "center" }}>
                                                    {this.props.origen === 'CONS' ?
                                                        item.Bit_reparado ?
                                                            <i className="fa fa-check" style={{ color: "#8bc780" }}></i> : <i className="fa fa-check-square btn-editing " title="Pendiente por Terminar" style={{ color: "#eb6969" }}></i> :
                                                        item.Bit_reparado || (item._nuevo && item._nuevo === 2) ?
                                                            <i className="fa fa-check" style={{ color: "#8bc780" }}></i> : <i className="fa fa-check-square btn-editing" title="Pendiente por Terminar" style={{ color: "#eb6969", cursor: "pointer" }} onClick={(e) => this.onSelectProgramadoOK(item, e)}></i>
                                                    }
                                                </Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-center-header " style={{ textAlign: "center" }}>
                                                    {item._nuevo && item._nuevo === 1  ? <i className="fas fa-times" title="Eliminar Item" style={{ color: "red", cursor: "pointer" }} onClick={(e) => this.onSelectEliminamosUbicaciones(item, e)}></i> : null}
                                                </Column>
                                                <Column size={[3, 3, 3, 3]}><span className="">{item.ModificadoPor.Nombre}</span></Column>
                                            </Row>
                                        } } />
                                </OptionSection>
                            </Column>
                        </Row>
                    </SectionEdit>
                </Column>
            </Row>
        };
    });
};

import CheckListModal = EK.Modules.SCV.Pages.postventa.RUBA.CheckList.CheckListModalBase;
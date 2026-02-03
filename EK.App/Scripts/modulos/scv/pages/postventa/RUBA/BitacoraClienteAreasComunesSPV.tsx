namespace EK.Modules.SCV.Pages.postventa.RUBA.Agenda.BitacoraAreasComunes {
    "use strict";
    const BITACORA_ID = "BitacoraClienteAreasComunesSPV";
    //  const BITACORA_SECCION_ID = "BitacoraClienteSPV$Seccion";
    const BITACORA_DETALLE_ID = "BitacoraClienteSPV$Detalle";
    const BITACORA_UBICACION_ID = "BitacoraClienteSPV$Ubicacion";
    const BITACORA_UBICACION_DETALLE_ID = "BitacoraClienteSPV$Ubicacion$Detalle";
    const BITACORA_ETAPA_ID = "BitacoraClienteSPV$Etapa";
    const BITACORA_ORIGEN_ID = "BitacoraClienteSPV$Origen"

    interface IModalBitacoraProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export let BitacoraModalBaseAreasComunes: any = global.connect(class extends React.Component<IModalBitacoraProps, {}> {
        constructor(props: IModalBitacoraProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentDidMount(): void {
            let config: page.IPageConfig = global.assign({}, this.props.config);
            let slots: any[] = config.slots;
            let Modulo: string = this.props.modulo;
            //
            if (!config.hasSlot(BITACORA_DETALLE_ID)) {
                if (!slots) {
                    slots = [];
                };
                slots.push(BITACORA_DETALLE_ID);
                slots.push(BITACORA_UBICACION_ID);
                slots.push(BITACORA_UBICACION_DETALLE_ID);
                slots.push(BITACORA_ETAPA_ID);
                //global.setPageConfig({ id: config.id, modulo: Modulo, slots, idML: config.idML });
            };

        };
        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalBitacoraSPV {...this.props} />
            </Column>
        };
    });


    let ModalBitacoraSPV: any = global.connect(class extends React.Component<IModalBitacoraProps, {}> {
        constructor(props: IModalBitacoraProps) {
            super(props);
            //this.getUbicacionesAgendaConfig = this.getUbicacionesAgendaConfig.bind(this);
            //this.state = { visualizarBotonGuardar: true };
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalBitacoraProps = {};
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        onClose(): void {
            let modal: any = $("#modalBitacoraClienteSPV");
            modal.modal("hide");
        };
        footerPersonalized(): JSX.Element {
            //let state: DataElement = this.props.config.getState(SECTION_CONCEPTO_ID);
            return <div className="modal-footer">
                <div>
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        };
        header(info: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            return <modal.Modal id="ModalBitacoraClienteSPVAreasComunes" header={this.header("Bitácora")} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Edit />
                </Row>
            </modal.Modal>
        }
    });

    interface IEdit extends page.IProps {
        item: DataElement;
        cliente?: any;
        usuario?: any;
        obtenerDetalleBitacora?: (idCliente: any, verComentarioBitacora: any) => void;
        obtenerEtapa?: (idCliente: any) => void;
        obtenerUbicacion?: (idUbicacion: number) => void;
        ubicacion?: global.DataElement;
        ubicacionDetalle?: global.DataElement;
        etapa?: global.DataElement;
        origen?: any;
        verComentarios?: any;
        onSaveModalLogBook?: () => void;
        Opciones: any;
    };


    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        constructor(props: IEdit) {
            super(props);
            this.onSaveModalLogBook = this.onSaveModalLogBook.bind(this);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            cliente: Forms.getDataValue("Cliente", BITACORA_ID, state),
            usuario: Forms.getDataValue("Usuario", BITACORA_ID, state),
            verComentarios: Forms.getDataValue("VerComentarios", BITACORA_ID, state),
            ubicacion: state.global["entity$" + BITACORA_UBICACION_ID],
            origen: state.global["entity$" + BITACORA_ORIGEN_ID],
            ubicacionDetalle: state.global["entity$" + BITACORA_UBICACION_DETALLE_ID],
            etapa: state.global["entity$" + BITACORA_ETAPA_ID],
            Opciones: Forms.getDataValue("OpcionesProcedeBitacora", BITACORA_ID, state)
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerDetalleBitacora: (idCliente: any, verComentarioBitacora: any): void => {
                let fecha: Date = new Date();
                let encodedFilters: string;
                if (verComentarioBitacora === "F") {
                    let idFolio: any = getData(EK.Store.getState().global.currentEntity).ID;
                    encodedFilters = global.encodeObject({ idCliente: idFolio, OperacionEspecificaSP: "BitacoraSoloFolio" });
                } else {
                    encodedFilters = global.encodeObject({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" });
                }
                global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPVAreasComunes/all/" + encodedFilters, BITACORA_DETALLE_ID);

            },
            obtenerEtapa: (idCliente: any): void => {
                let fecha: Date = new Date();
                let encodedFilters: string = global.encodeObject({ idCliente, fechaReporte: fecha.toISOString() });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, BITACORA_ETAPA_ID);
            },
            obtenerUbicacion: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, BITACORA_UBICACION_ID);
            },
        });

        componentDidMount(): void {
            Forms.updateFormElement(BITACORA_ID, "OpcionesProcedeBitacora", "Cliente");
        };
        onClose(): void {
            let modal: any = $("#ModalBitacoraClienteSPVAreasComunes");
            modal.modal("hide");
        };

        componentDidUpdate(prevProps: IEdit, prevState: IEdit): any {
            if (isSuccessful(this.props.etapa)) {
                if (hasChanged(prevProps.etapa, this.props.etapa)) {
                    let contador: any;
                    contador = $('.counter');
                    if (contador.length > 0) {
                        contador.counterUp();
                    }

                }
            }
        };

        componentWillReceiveProps(nextProps: IEdit): void {
            if (isSuccessful(nextProps.cliente)) {
                if (global.hasChanged(this.props.cliente, nextProps.cliente)) {
                    let cliente: any = getData(nextProps.cliente);
                    if (cliente != null || cliente != undefined) {
                        if (cliente.ID != undefined && cliente.ID > 0) {
                            let idCliente: any = cliente.ID;
                            let idUbicacion: any = cliente.IdUbicacion;

                            let verComentarios: any = Forms.getDataValue("VerComentarios", BITACORA_ID, EK.Store.getState());
                            let verComenatriosClave: any = "C"
                            if (verComentarios === undefined || getData(verComentarios).Clave === undefined) {
                                verComenatriosClave = "C";
                            } else {
                                verComenatriosClave = getData(verComentarios).Clave;
                            }
                            this.props.obtenerDetalleBitacora(idCliente, verComenatriosClave);
                            //this.props.obtenerEtapa(idCliente);
                            //this.props.obtenerUbicacion(idUbicacion);
                            let fechaIncial: any = new Date('1990-01-01');
                            let fechaFinal: any = new Date();
                            let p: any = global.assign({
                                Plaza: -2,
                                Fraccionamiento: -2,
                                Vocaciones: -2,
                                FechaInicial: fechaIncial,
                                FechaFinal: fechaFinal,
                                Opcionales: "VerViviendaEnt",
                                Cliente: idCliente
                            });
                            global.dispatchAsyncPost("global-page-entity", "base/kontrol/CapturaFechaConstruccion/GetBP/GetFechaConstruccion/", { parametros: p }, BITACORA_UBICACION_DETALLE_ID);
                        }
                    }
                }
            } else {
                if (global.hasChanged(this.props.cliente, nextProps.cliente)) {
                    if (this.props.cliente.data != undefined) {
                        Forms.updateFormElement(BITACORA_ID, "Cliente", null);
                        global.dispatchSuccessful("global-page-data", [], BITACORA_DETALLE_ID);
                        global.dispatchSuccessful("global-page-entity", [], BITACORA_UBICACION_ID);
                        global.dispatchSuccessful("global-page-entity", [], BITACORA_UBICACION_DETALLE_ID);
                        global.dispatchSuccessful("global-page-entity", [], BITACORA_ETAPA_ID);
                    }
                }
            }
            if (isSuccessful(nextProps.verComentarios)) {
                if (global.hasChanged(this.props.verComentarios, nextProps.verComentarios)) {
                    if (getData(this.props.verComentarios).Clave != getData(nextProps.verComentarios).Clave) {
                        //let cliente: any = getData(nextProps.cliente);
                        //if (cliente != null && cliente != undefined && Object.keys(cliente).length != 0) {
                        //    if (cliente.ID != undefined && cliente.ID > 0) {
                        //        let idCliente: any = cliente.ID;
                        //        this.props.obtenerDetalleBitacora(idCliente, getData(nextProps.verComentarios).Clave);
                        //    }
                        //} else {
                        if (global.getData(this.props.entidad).ID > 0) {
                            let cliente = global.getData(this.props.entidad).Cliente.ID;
                            let Usuario = global.getData(this.props.entidad).Usuario.ID;
                            let UsuarioReporta = global.getData(this.props.entidad).UsuarioReporta;
                            if (UsuarioReporta === "PorCliente") {
                                if (cliente != undefined && cliente > 0) {
                                    this.props.obtenerDetalleBitacora(cliente, getData(nextProps.verComentarios).Clave);
                                }
                            }
                            if (UsuarioReporta === "PorColaborador") {
                                if (Usuario != undefined && Usuario > 0) {
                                    this.props.obtenerDetalleBitacora(Usuario, getData(nextProps.verComentarios).Clave);
                                }
                            }
                            if (UsuarioReporta === "PorAnonimo") {
                                this.props.obtenerDetalleBitacora(999999, getData(nextProps.verComentarios).Clave);
                            }
                        }
                    }
                }
            }
        };
        onRowDClick(item: any): void {
            return null;
        };


        onCloseModalLogBook(): void {
            let modal: any = $("#modalNewComment");
            modal.modal("hide");
        }
        onSaveModalLogBook(): void {
            let entidad: any = getData(this.props.entidad);
            let item: EditForm = Forms.getForm(BITACORA_DETALLE_ID);
            let cliente: any = getData(this.props.cliente);
            let verComentarios: any = Forms.getDataValue("VerComentarios", BITACORA_ID, EK.Store.getState());
            let verComenatriosClave: any = "C"
            let idFolio: any = 0;
            let idCliente: any = getData(this.props.cliente).ID
            let Usuario: any = getData(this.props.entidad).Usuario.ID
            if (entidad.UsuarioReporta === "PorCliente") {
                if (idCliente === null || idCliente === undefined) {
                    idCliente = entidad.Cliente.ID
                    if (idCliente === null || idCliente === undefined) {
                        global.warning("Debe Indicar el Cliente");
                        return;
                    }
                };
            } else if (entidad.UsuarioReporta === "PorColaborador") {
                if (Usuario === null || Usuario === undefined) {
                    global.warning("Debe Indicar el Cliente");
                    return;
                };
            }
            if (verComentarios === undefined || getData(verComentarios).Clave === undefined) {
                verComenatriosClave = "C";
                idFolio = entidad.ID;
            } else {
                verComenatriosClave = getData(verComentarios).Clave;
                if (verComenatriosClave === "F") {
                    let folio: any = getData(EK.Store.getState().global.currentEntity);
                    if (folio === null || folio === undefined || folio.ID === undefined || folio.ID <= 0) {
                        global.warning("Primero debe guarda el folio para poder incorporarle comentarios");
                        return;
                    };
                    idFolio = folio.ID;
                } else if (verComenatriosClave === "C") {
                    idFolio = entidad.ID
                }

            };

            let model: any = item
                .addID()
                .addNumberConst("IdCliente", idCliente || Usuario)
                .addNumberConst("IdFolio", idFolio)
                .addObject("Comentarios")
                .addVersion()
                .toObject();


            dispatchAsyncPut("global-page-data", "base/kontrol/BitacoraClienteSPVAreasComunes/Get/saveLogBook", model, BITACORA_DETALLE_ID);
        }
        footerModalLogBook(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onSaveModalLogBook} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Aceptar</button>
                <button type="button" onClick={this.onCloseModalLogBook} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        render(): JSX.Element {
            let $page: any = $ml[BITACORA_ID];
            //let idForm: any = EK.Store.getState().forms[AGENDA_ID_NEW] ? EK.Store.getState().forms[AGENDA_ID_NEW] : null;
            let mostrarBotonGuardar: any = false;
            let color: string = "#ff5e00";
            let className: string = "font-white";

            const ListHeaderComentariosfolio: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Id Reporte"}</Column>
                        <Column size={[10, 10, 10, 10]} className="list-default-header">{"Comentarios del folio"}</Column>
                    </Row>
                </Column>
            //if (idForm === null || idForm === undefined) {
            //} else {
            //    if (idForm.hasChanged) {
            //        color = "#ff5e00";
            //        className = " btn-editing";
            //        mostrarBotonGuardar = true;
            //    }
            //}
            //let ml: any = config.getML();
            let formatFolio: (data: any, row: any) => any = (data: any, row: any): any => {
                let itemStyle: React.CSSProperties = {};
                if (row.IdFolio > 0) {
                    itemStyle.color = "#F44336";
                    itemStyle.fontWeight = "bolder";
                    return <span className="badge badge-info bold">{row.IdFolio}</span>; //<span style={itemStyle}>{row.IdFolio }</span>
                } else {
                    return null;
                }
            };
            let ml: any = $ml[BITACORA_ID];
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addID({ width: "100px", title: "ID" })
                .add({ data: "IdPartida", title: "Incidencia", width: "80px" })
                .addDateFormat({ data: "Creado", title: "Fecha", width: "100px" })
                .add({ data: "Descripcion", title: "Comentario", width: "560px" })
                .add({ data: "IdFolio", title: "Folio", width: "100px", format: formatFolio })
                .add({ data: "CreadoPor.Nombre", title: "Creado Por", width: "250px" });


            let ubicacion: any = global.getData(this.props.ubicacion);
            let ubicacionDetalle: any = global.getData(this.props.ubicacionDetalle);
            let clienteEtapa: any = global.getData(this.props.etapa);
            let entidad: any = global.getData(this.props.entidad);

            let TipoSeleccion: any = global.getData(EK.Store.getState().global.TipoSeleccion);

            let ComentariosFolio = [];
            let Comentario = global.getData(EK.Store.getState().global.currentEntity).ObservacionesContratista;
            let IdFolio = global.getData(EK.Store.getState().global.currentEntity).ID;

            ComentariosFolio.push({ com: Comentario, ID: IdFolio });
            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8, overflowY: "auto", height: "450px", position: "relative" }} >
                <Column size={[12, 12, 12, 12]} style={{ marginTop: "-15px" }} >
                    <Row>
                        {getData(this.props.origen).origen === "DashBoardFailureReporte" || getData(this.props.origen).origen === undefined || getData(this.props.origen).origen === null ?
                            <FormularioView OpcionesRef={this.props.Opciones} />
                            :
                            entidad.UsuarioReporta === "PorCliente" ?
                                <div>
                                    <label.Entidad id="Cliente" size={[10, 10, 6, 6]} value={(item: any) => {
                                        return !item ? "" : (!item.ID ? "" : "<span class='badge badge-info'>" + item.ID + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                    }} />
                                    <VerComentariosDDL idFormSection={BITACORA_ID} size={[10, 10, 4, 4]} validations={[validations.required()]} required={true} />
                                </div> :
                                entidad.UsuarioReporta === "PorColaborador" ?
                                    <div>
                                        <label.Entidad id="Usuario" size={[10, 10, 6, 6]} value={(item: any) => {
                                            return !item ? "" : (!item.ID ? "" : "<span class='badge badge-info'>" + item.ID + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                        }} />
                                        <VerComentariosDDL idFormSection={BITACORA_ID} size={[10, 10, 4, 4]} validations={[validations.required()]} required={true} />
                                    </div> :
                                    entidad.UsuarioReporta === "PorAnonimo" ?
                                        <div>
                                            <label.Entidad id="Anonimo" size={[10, 10, 6, 6]} value={"ANONIMO"} />
                                            <VerComentariosDDL idFormSection={BITACORA_ID} size={[10, 10, 4, 4]} validations={[validations.required()]} required={true} />
                                        </div> : null
                        }
                        <Column size={[2, 2, 2, 2]} style={{ marginTop: "14px" }}>
                            <BitacoraPrintButton />
                        </Column>
                    </Row>
                    <Row >
                        <div className="tabbable-line" >
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab_detalle_bitacora" data-toggle="tab" aria-expanded="true">Detalle de la Bitácora</a>
                                </li>
                                {/*<li className="">
                                    <a href="#tab_informacion_cliente" data-toggle="tab" aria-expanded="false">Información del Cliente</a>
                                </li>*/}
                            </ul>
                            <div className="tab-content" style={{ padding: 0 }}>
                                <div className="tab-pane active" id="tab_detalle_bitacora">
                                    <Row>
                                        <div id="idTabsSPV" style={{ marginTop: "10px" }}>
                                            {
                                                TipoSeleccion === 'C' ?
                                                    <page.SectionListExtended
                                                        id={BITACORA_DETALLE_ID}
                                                        parent={BITACORA_ID}
                                                        icon="fa fa-table"
                                                        level={1}
                                                        //onSave={this.onSave}
                                                        dtConfig={dtConfig}
                                                        hideNewButton={false}
                                                        viewMode={false}
                                                        size={[12, 12, 12, 12]}
                                                        readonly={false}
                                                        onAddNew={() => {
                                                            Forms.remove(BITACORA_DETALLE_ID);
                                                            let idCliente: any = getData(this.props.cliente).ID
                                                            let Usuario: any = getData(this.props.entidad).Usuario.ID
                                                            if (entidad.UsuarioReporta === "PorCliente") {
                                                                if (idCliente === null || idCliente === undefined) {
                                                                    idCliente = getData(this.props.entidad).Cliente.ID
                                                                    if (idCliente === null || idCliente === undefined) {
                                                                        global.warning("Debe Indicar el Cliente");
                                                                        return null;
                                                                    }
                                                                }
                                                            } else if (entidad.UsuarioReporta === "PorColaborador") {
                                                                if (Usuario === null || Usuario === undefined) {
                                                                    global.warning("Debe Indicar el Cliente");
                                                                    return null;
                                                                }
                                                            }
                                                            let modalLogBook: any = $("#modalNewComment");
                                                            modalLogBook.modal();
                                                        }}
                                                        onRowDoubleClick={this.onRowDClick}
                                                        items={createSuccessfulStoreObject([])}>
                                                    </page.SectionListExtended> :

                                                    <Row style={{ padding: '10px' }}>
                                                        <Column>
                                                            <List
                                                                items={ComentariosFolio}
                                                                readonly={true}
                                                                listHeader={ListHeaderComentariosfolio}
                                                                addRemoveButton={false}
                                                                formatter={(_index: number, item: any): any => {
                                                                    return <Row>
                                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: 'center' }} className="listItem-default-item">{item.ID > 0 ?
                                                                            <span className="badge badge-success" style={{ fontSize: '14px' }}>
                                                                                {item.ID}
                                                                            </span> : "N/D"}
                                                                        </Column>
                                                                        <Column size={[10, 10, 10, 10]} className="listItem-default-item" style={{ wordWrap: 'break-word' }}>
                                                                            {
                                                                                item.com === null || item.com === undefined || item.com.trim() === '' ?
                                                                                    'Sin Observaciones'
                                                                                    :
                                                                                    <span>
                                                                                        <span style={{ fontSize: '14px' }}>
                                                                                            {item.com}
                                                                                        </span>
                                                                                    </span>
                                                                            }

                                                                        </Column>
                                                                    </Row>
                                                                }} />
                                                        </Column>
                                                    </Row>
                                                    /*<page.SectionListExtended
                                                        id={BITACORA_DETALLE_ID}
                                                        parent={BITACORA_ID}
                                                        icon="fa fa-table"
                                                        level={1}
                                                        //onSave={this.onSave}
                                                        dtConfig={dtConfig}
                                                        hideNewButton={false}
                                                        viewMode={false}
                                                        size={[12, 12, 12, 12]}
                                                        readonly={false}
                                                        onAddNew={() => {
                                                            Forms.remove(BITACORA_DETALLE_ID);
                                                            let idCliente: any = getData(this.props.cliente).ID
                                                            let Usuario: any = getData(this.props.entidad).Usuario.ID
                                                            if (entidad.UsuarioReporta === "PorCliente") {
                                                                if (idCliente === null || idCliente === undefined) {
                                                                    idCliente = getData(this.props.entidad).Cliente.ID
                                                                    if (idCliente === null || idCliente === undefined) {
                                                                        global.warning("Debe Indicar el Cliente");
                                                                        return null;
                                                                    }
                                                                }
                                                            } else if (entidad.UsuarioReporta === "PorColaborador") {
                                                                if (Usuario === null || Usuario === undefined) {
                                                                    global.warning("Debe Indicar el Cliente");
                                                                    return null;
                                                                }
                                                            }
                                                            let modalLogBook: any = $("#modalNewComment");
                                                            modalLogBook.modal();
                                                        }}
                                                        onRowDoubleClick={this.onRowDClick}
                                                        items={createSuccessfulStoreObject([])}>
                                                    </page.SectionListExtended>*/
                                            }


                                            <modal.Modal id="modalNewComment" header={("Agregar comentario a Bitácora")} footer={this.footerModalLogBook()} addDefaultCloseFooter={false} style={{ height: "200px" }}>
                                                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <Row>
                                                            <input.Text validations={[validations.required()]} id="Comentarios" label="Comentarios" idFormSection={BITACORA_DETALLE_ID} size={[12, 12, 12, 12]} />
                                                        </Row>
                                                    </Column>
                                                </Row>
                                            </modal.Modal>


                                        </div>
                                    </Row>
                                </div>
                                <div className="tab-pane" id="tab_informacion_cliente">
                                    <Row>
                                    </Row>
                                </div>
                            </div>
                        </div>


                    </Row>
                </Column>
            </Column>;
        };
    });

    interface FormularioProps extends React.Props<any> {
        OpcionesRef: any;
    };

    class FormularioView extends React.Component<FormularioProps, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.OpcionesRef = Forms.getDataValue("OpcionesProcedeBitacora", BITACORA_ID, state);
            return retValue;
        };
        render(): JSX.Element {
            let OpcionSeleccionada = getData(this.props.OpcionesRef)
            return <Column size={[12, 12, 12, 12]}>
                <Row>
                    <Row>
                        <page.OptionSection
                            id={"Opciones"}
                            icon="fas fa-cog"
                            title="Usuario Reporta"
                            level={1}
                            collapsed={false}
                            hideCollapseButton={true}>
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                    <RadioButton
                                        id={"Cliente"}
                                        idFormSection={BITACORA_ID}
                                        groupName="OpcionesProcedeBitacora"
                                        label="Por Cliente"
                                        size={[12, 12, 4, 4]}
                                    />
                                    <RadioButton
                                        id={"Colaborador"}
                                        idFormSection={BITACORA_ID}
                                        groupName="OpcionesProcedeBitacora"
                                        label="Por Colaborador"
                                        size={[12, 12, 4, 4]}
                                    />
                                    <RadioButton
                                        id={"Anonimo"}
                                        idFormSection={BITACORA_ID}
                                        groupName="OpcionesProcedeBitacora"
                                        label="Por Anonimo"
                                        size={[12, 12, 4, 4]}
                                    />
                                </Column>
                            </Row>
                        </page.OptionSection> 
                    </Row>
                    <Row>
                        {
                            OpcionSeleccionada == "Cliente" ?
                                <select.ClientesLotesSPV idFormSection={BITACORA_ID} size={[10, 10, 6, 6]} required={true} validations={[validations.required()]} />
                                : null
                        }
                        {
                            OpcionSeleccionada == "Colaborador" ?
                                <select.UsuariosLotesSPV key={"Usuario"} idFormSection={BITACORA_ID} size={[10, 10, 6, 6]} required={true} validations={[validations.required()]} />
                            : null
                        }
                        {
                            OpcionSeleccionada === "Anonimo" ?
                            <label.Entidad id="Anonimo" size={[12, 12, 6, 6]} value={"ANONIMO"} />
                            : null
                        }
                    </Row>
            </Row>
        </Column>

        };
    };

    interface IBitacoraPrintButtonProps extends IButtonProps, page.IProps {
        clienteRef?: DataElement;
        UsuarioRef?: DataElement;
        OpcionesRef?: any;
    };

    const BitacoraPrintButton: any = global.connect(class extends React.Component<IBitacoraPrintButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", BITACORA_ID, state);
            retValue.UsuarioRef = Forms.getDataValue("Usuario", BITACORA_ID, state);
            retValue.OpcionesRef = Forms.getDataValue("OpcionesProcedeBitacora", BITACORA_ID, state);
            return retValue;
        };
        static defaultProps: IBitacoraPrintButtonProps = {
            icon: "fas fa-print",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let idCliente;
            let cliente: number = global.getDataID(this.props.clienteRef);
            let usuario: number = global.getDataID(this.props.UsuarioRef);
            let Opcion: string = global.getData(this.props.OpcionesRef);
            let entidad = getData(EK.Store.getState().global.currentEntity);
            if (entidad == undefined || Object.keys(entidad).length === 0 || entidad.ID < 0) {
                if (Opcion == "Cliente") {
                    idCliente = cliente;
                }
                if (Opcion == "Colaborador") {
                    idCliente = usuario;
                }
                if (Opcion == "Anonimo") {
                    idCliente = 999999;
                }
            } else {
                if (entidad.UsuarioReporta == "PorCliente") {
                    Opcion = entidad.UsuarioReporta;
                    idCliente = entidad.Cliente.ID;
                }
                if (entidad.UsuarioReporta == "PorColaborador") {
                    Opcion = entidad.UsuarioReporta;
                    idCliente = entidad.Usuario.ID;
                }
                if (entidad.UsuarioReporta == "PorAnonimo") {
                    Opcion = entidad.UsuarioReporta
                    idCliente = 999999;
                }
            }

            
            let operacionEspecificaSP: string = "BitacoraCompleta";
            let win = window.open("scv/bitacoraCLienteSPVAreasComunes/imprimirDocumento/" + idCliente + "/" + operacionEspecificaSP + "/" + Opcion, "_blank")
        };
        render(): JSX.Element {
            let entidad = getData(EK.Store.getState().global.currentEntity);
            if (global.isSuccessful(this.props.clienteRef) || global.isSuccessful(this.props.UsuarioRef) || global.isSuccessful(this.props.OpcionesRef)) {
                if (global.getDataID(this.props.clienteRef) > 0 || global.getDataID(this.props.UsuarioRef) > 0 || global.getData(this.props.OpcionesRef) == "Anonimo" || entidad.ID > 0) {
                    return <Button {...this.props} keyBtn="btnSPVBitacoraPrint" onClick={this.onClick.bind(this)} />
                };
            };

            return null;
        };
    });

    class VerComentarios$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[BITACORA_ID + "$verComentarios"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "VerComentarios",
            items: createDefaultStoreObject([]),
            label: "Estatus",
            helpLabel: "Seleccione la Visualización de la Información",
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
                //console.log(item);
                if (!item.id) {
                    return item.text;
                };

                ///if (item.Clave === 'F') {
                //console.log(item.Clave)
                dispatchSuccessful('load::TipoSeleccion', item.Clave);
                //}

                return $([
                    "<span class='badge badge-success'> ", item.Clave, " </span>",
                    "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "F", Nombre: "Ver Comentarios del Folio" });
                items.push({ ID: 2, Clave: "C", Nombre: "Ver Comentarios Completo del Cliente" });
                global.dispatchSuccessful("load::" + BITACORA_ID + "$verComentarios", items);
            };
        };
        render(): JSX.Element {
            //console.log(this.props);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const VerComentariosDDL: any = ReactRedux.connect(VerComentarios$DDL.props, null)(VerComentarios$DDL);
};

import ModalBitacoraClienteSPVAreasComunes = EK.Modules.SCV.Pages.postventa.RUBA.Agenda.BitacoraAreasComunes.BitacoraModalBaseAreasComunes;
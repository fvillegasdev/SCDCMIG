namespace EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Bitacora {
    "use strict";
    const BITACORA_ID = "BitacoraClienteSPV";
  //  const BITACORA_SECCION_ID = "BitacoraClienteSPV$Seccion";
    const BITACORA_DETALLE_ID = "BitacoraClienteSPV$Detalle";
    const BITACORA_UBICACION_ID = "BitacoraClienteSPV$Ubicacion";
    const BITACORA_UBICACION_DETALLE_ID = "BitacoraClienteSPV$Ubicacion$Detalle"; 
    const BITACORA_ETAPA_ID = "BitacoraClienteSPV$Etapa";
    const BITACORA_ORIGEN_ID = "BitacoraClienteSPV$Origen"

    const dxTableTemplate: JSX.Element =
        <Row>
            <div ><Column size={[12, 12, 12, 12]}>

                <br />
                <div id="loaderBitacoraComentarios" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedBitacoraComentarios" style={{ background: '#fff', display: 'inherit' }}>

                    <div id="dxComentariosClientesContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                    </div>
                </div>

            </Column>
            </div>
        </Row>;

    interface IModalBitacoraProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export let BitacoraModalBase: any = global.connect(class extends React.Component<IModalBitacoraProps, {}> {
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
            return <modal.Modal id="modalBitacoraClienteSPV" header={this.header("Bitácora")} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Edit />
                </Row>
            </modal.Modal>
        }
    });

    interface IEdit extends page.IProps {
        item: DataElement;
        cliente?: any; 
        obtenerDetalleBitacora?: (idCliente: any, verComentarioBitacora: any) => void;
        obtenerEtapa?: (idCliente: any) => void;
        obtenerUbicacion?: (idUbicacion: number) => void;
        ubicacion?: global.DataElement;
        ubicacionDetalle?: global.DataElement;
        etapa?: global.DataElement;
        origen?: any; 
        verComentarios?: any;
        onSaveModalLogBook?: () => void;
        reloadcatalogo?: any;
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
            verComentarios: Forms.getDataValue("VerComentarios", BITACORA_ID, state), 
            ubicacion: state.global["entity$" + BITACORA_UBICACION_ID],
            origen: state.global["entity$" + BITACORA_ORIGEN_ID],   
            ubicacionDetalle :  state.global["entity$" + BITACORA_UBICACION_DETALLE_ID],
            etapa: state.global["entity$" + BITACORA_ETAPA_ID],
            reloadcatalogo: state.global.reloadcatalogo

        });

        ObtenerDetalleBitacoraFn (idCliente: any, verComentarioBitacora: any) {
            let fecha: Date = new Date();
            let encodedFilters: string;
            if (verComentarioBitacora === "F") {
                let idFolio: any = getData(EK.Store.getState().global.currentEntity).ID;
                encodedFilters = global.encodeObject({ idCliente: idFolio, OperacionEspecificaSP: "BitacoraSoloFolio" });
                //console.log({ idCliente: idFolio, OperacionEspecificaSP: "BitacoraSoloFolio" })
            } else {
                encodedFilters = global.encodeObject({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" });
                //console.log({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" })
            }
            let currentE = getData(EK.Store.getState().global.currentEntity);
            if (verComentarioBitacora === "F" && currentE.ID === -1) {
                return;
            }

            let columnas = this.getColumnasBitacora();

            //global.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/", encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios');
            setTimeout(() => {
                this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                    encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
           }, 50)

        }

        getIncidenciasEntrega(numcte) {
            let columnas = this.getColumnasIncidencia();
            setTimeout(() => {
                this.dispatchDxTableAsyncPost('dxIncidenciasEntregaGrid', "base/scv/ReportesFallas/GetBP/GetIncidenciasEntrega",
                    { parametros: { numcte }}, columnas, false, null, 'loaderIncidenciasEntrega', 'loadedIncidenciasEntrega', false,true);
            }, 50)
        }

        getColumnasIncidencia(): any[] {
            let columnas = [
                { caption: "Familia", dataField: 'Familia' },
                { caption: "Componente", dataField: 'Componente' },
                { caption: 'Ubicacion', dataField: 'Ubicacion' },
                { caption: 'Contratista', dataField: 'Contratista', alignment: 'center' },
                { caption: 'Observaciones', dataField: 'Observaciones', alignment: 'center' },
                { caption: 'Atendido al momento', dataField: 'AtendidoAlMomento', dataType: "boolean", alignment: 'center' },
                //{ caption: 'Evidencia', dataField: 'TieneEvidencia', alignment: 'center' }
            ];
            return columnas;
        }

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerDetalleBitacora: (idCliente: any, verComentarioBitacora: any): void => {
                let fecha: Date = new Date();
                let encodedFilters: string;  
                if (verComentarioBitacora === "F") {
                    let idFolio: any = getData(EK.Store.getState().global.currentEntity).ID; 
                    encodedFilters = global.encodeObject({ idCliente: idFolio, OperacionEspecificaSP: "BitacoraSoloFolio" });
                    //console.log({ idCliente: idFolio, OperacionEspecificaSP: "BitacoraSoloFolio" })
                } else {
                    encodedFilters = global.encodeObject({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" });
                    //console.log({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" })
                }
                let currentE = getData(EK.Store.getState().global.currentEntity);
                if (verComentarioBitacora === "F" && currentE.ID === -1) {
                    return;
                }

                let columnas = []

                //global.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/", encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios');
                setTimeout(() => {
                   // let _loader = document.getElementById('loaderBitacoraComentarios');
                   // let _loadedTable = document.getElementById('loadedBitacoraComentarios');
                    //console.log(_loader, _loadedTable)
                    //_loader.style.display = 'block';
                    //this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                        //encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
                    global.dispatchDxTableBitacoraAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                        encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
                }, 50)
                
                //global.asyncGet(URL + encodedFilters, (status: AsyncActionTypeEnum, dataResponse: any) => {
                //    switch (status) {
                //        case AsyncActionTypeEnum.successful:
                //            //console.log(columnas)
                //            //console.log(dataResponse)
                //            global.loadDxGridTable("dxComentariosClientesContainer", columnas, dataResponse,false,null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios')
                //            break;
                //        case AsyncActionTypeEnum.loading:
                //            _loader.style.display = 'block';
                //            _loadedTable.style.display = 'none';
                //            break;
                //        case AsyncActionTypeEnum.failed:
                //            _loader.style.display = 'none';
                //            _loadedTable.style.display = 'none';
                //            break;
                //    }
                //});
                //global.asyncGet("base/scv/BitacoraClienteSPV/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                //    switch (status) {
                //        case AsyncActionTypeEnum.successful:
                //            dispatchSuccessful("global-page-data", data, BITACORA_DETALLE_ID);
                //            break;
                //        case AsyncActionTypeEnum.loading:
                //            break;
                //        case AsyncActionTypeEnum.failed:
                //            break;
                //    }
                //});
                    
   
            },
            obtenerEtapa: (idCliente: any): void => {
                let fecha: Date = new Date();
                let encodedFilters: string = global.encodeObject({ idCliente , fechaReporte: fecha.toISOString() });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetClienteEtapa/" + encodedFilters, BITACORA_ETAPA_ID );
            },
            obtenerUbicacion: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, BITACORA_UBICACION_ID);
            },
        });

        componentWillMount(): void {
            //    Forms.updateFormElement(AGENDA_ID_NEW, "UbicacionesAgenda");
        };
        onClose(): void {
            let modal: any = $("#modalBitacoraClienteSPV");
            modal.modal("hide");
        };

        UpdateComentario(item) {
          //console.log(item)
            EK.Global.confirm("¿Desea actualizar el comentario?", "Actualizar comentario", (isConfirm: any) => {
                if (isConfirm === true) {
                        //let encodedFilters: string;
                        let columnas = this.getColumnasBitacora();
                        let filtros = { idCliente: item.IdCliente, OperacionEspecificaSP: "UpdateComentarioObtenerBitacora", IdComentario: item.ID, Comentario: item.Descripcion};
                        this.dispatchDxTableAsyncPost('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                        filtros, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
                } else {
                    return;
                }
            });
        
        }

        deleteComentario(item) {
            //console.log(item)
            EK.Global.confirm("¿Desea borrar este comentario?", "Borrar comentario", (isConfirm: any) => {
                if (isConfirm === true) {
                    let encodedFilters: string;
                    let columnas = this.getColumnasBitacora();
                    encodedFilters = global.encodeObject({ idCliente: item.IdCliente, OperacionEspecificaSP: "DeleteComentarioObtenerBitacora", IdComentario: item.ID });
                    this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                        encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
                } else {
                    return;
                }
            });

        }
        getColumnasBitacora(): any[]{
            let columnas = [
                {
                    caption: "Verificado", dataField: "verificado", allowEditing: false,
                    encodeHtml: false,
                    customizeText: function (cellInfo) {
                        let checkcomponent = cellInfo.value ? `<div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                              <label class="form-check-label" for="flexCheckChecked">
                                Verificado
                              </label>
                            </div>`:
                            `<div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                              <label class="form-check-label" for="flexCheckDefault">
                                No verificado
                              </label>
                            </div>`;
                        return checkcomponent;
                    }
                },
                {
                    caption: "Evidencia", dataField: "Evidencias", allowEditing: false,
                    encodeHtml: false,
                    customizeText: function (cellInfo) {
                        let checkcomponent =   `<span>
                             <i class="fas fa-eye"></i>
                            </span>`;
                        return checkcomponent;
                    }
                },
                { caption: "ID", dataField: "ID", allowEditing: false },
                { caption: "Incidencia", dataField: "IdPartida", allowEditing: false, alignment: 'center' },
                { caption: "Fecha", dataField: "Fecha", dataType: 'datetime', format: 'dd/MM/yyyy', allowEditing: false, alignment: 'center' },
                { caption: "Comentario", dataField: "Descripcion", allowEditing: true, minWidth: 50 },
                { caption: "Folio", dataField: "IdFolio", allowEditing: false, alignment: 'center' },
                { caption: "Creado Por", dataField: "ModificadoPor.Nombre", allowEditing: false },
                {
                    caption: "Fijado", dataField: "alertaFija", allowEditing: false,
                    encodeHtml: false,
                    customizeText: function (cellInfo) {
                        let checkcomponent = cellInfo.value ? `<div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedFijo" checked>
                              <label class="form-check-label" for="flexCheckChecked">
                                Fijo
                              </label>
                            </div>`:
                            `<div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefaultFijo">
                              <label class="form-check-label" for="flexCheckDefault">
                                No Fijo
                              </label>
                            </div>`;
                        return checkcomponent;
                    }
                },
                // { caption: "Creado Po", dataField: "activo" },
                {
                    caption: 'Opciones', type: "buttons", width: 120, alignment: "center",
                    buttons: [, , "Editar Comentario", {
                        text: "Actualizar comentario",
                        icon: "floppy",
                        color: '#000',
                        hint: "Actualizar comentario",
                        onClick: (e) => {
                            this.UpdateComentario(e.row.data)
                        }
                    }, "Borrar Comentario", {
                            text: "Borrar fecha",
                            icon: "trash",
                            color: '#000',
                            hint: "Borrar comentario",
                            onClick: (e) => {
                                // this.deleteFechaCat(e);
                                this.deleteComentario(e.row.data)
                            }
                        }]
                }
            ];
            return columnas;
        }

       

        loadDxGridTableComentarios(IdTable: any, columnas: any, dataSource: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any, generic?: any) {
            let _loader = loader ? document.getElementById(loader) : document.getElementById('loading');
            let _loadedTable = loaded ? document.getElementById(loaded) : document.getElementById('loadedData');
            _loader.style.display = 'none';
            _loadedTable.style.display = 'inherit';
            let _alowEdit = edit ? edit : false;
            //console.log(IdTable, exportar, filename)
            try {
                $(`#${IdTable}`).dxDataGrid("dispose");
            } catch (ex) { }
            let fecha = Date.now();
            let _exportar = exportar ? exportar : false;
            let _fileName = filename ? filename : 'Reporte_export_tmp_';
            let dataGrid = $(`#${IdTable}`).dxDataGrid({
                dataSource,
                allowColumnReordering: true,
                scrolling: {
                    columnRenderingMode: "virtual"
                },
                columnAutoWidth: true,
                showBorders: false,
                grouping: {
                    autoExpandAll: false,
                },
                export: {
                    enabled: _exportar,
                    fileName: `${_fileName}${fecha}`,
                    allowExportSelectedData: false
                },
                editing: {
                    mode: 'cell',
                    allowUpdating: _alowEdit,
                    allowAdding: false,
                    allowDeleting: false,
                },
                onRowPrepared: (info) => {
                    let dataRow = info.data;
                    if (dataRow) {
                        //console.log(info)
                        //console.log(dataRow)
                        if (!dataRow.verificado && !generic) {
                            info.rowElement.addClass('cr-row-bitacora-noverif');
                        }
                    }
                    //if (data.verificado) {
                    //    info.rowElement.addClass('cr-row-bitacora-noverif');  
                    //}

                },
                onCellClick: (e) => {
                    let item = e.data;
                    if (generic) {
                        return;
                    }
                    if (e.columnIndex === 0) { // Check de verificar
                        if (!e.data.verificado) {
                            if (!e.data.alertaFija) {
                                this.marcarComentarioVerificado(e.data)
                            } else {
                                e.data.verificado = true;
                                dataGrid.refresh();
                                this.marcarComentarioVerificadoFijo(e.data)
                            }
                            
                        }

                    }
                    if (e.columnIndex === 1) { // Abrir modal de evidencias
                        this.openMultiPhotoViewer(e.data)
                    }
                    if (e.columnIndex === 8) { // Modificar el fijado del comentario
                        e.data.alertaFija = !e.data.alertaFija;
                        this.cambiarEstatusFijo(e.data);
                    }
                },
                columns: columnas,
                columnFixing: { enabled: true },
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: false
            }).dxDataGrid("instance");
            dataGrid.refresh();
        }

       dispatchDxTableAsyncGet (TableID: any, URL: any, encodedFilters: any, columnas: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any) {
            let _loader = loader ? document.getElementById(loader) : document.getElementById('loading');
            let _loadedTable = loaded ? document.getElementById(loaded) : document.getElementById('loadedData');
            //console.log(_loader, _loadedTable)
           
            global.asyncGet(URL + encodedFilters, (status: AsyncActionTypeEnum, dataResponse: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(columnas)
                        console.log(dataResponse)
                        let localsaved = EK.Store.getState().global.listaVerificadoLocal ? EK.Store.getState().global.listaVerificadoLocal.data : [];
                        if (localsaved.length > 0) {   let localsaved = EK.Store.getState().global.listaVerificadoLocal ? EK.Store.getState().global.listaVerificadoLocal.data : [];
                            for (let d of dataResponse) {
                                //let IsLocalSaved = localsaved.filter(x => x.idcomentario === d.ID)[0] !== undefined? 
                                console.log(d)
                                d.verificado = localsaved.filter(x => x.idcomentario === d.ID)[0] !== undefined ? true : d.verificado;
                            }
                        }
                        this.loadDxGridTableComentarios(TableID, columnas, dataResponse, exportar, filename, loader, loaded, edit)
                        global.dispatchSuccessful("global-page-data", dataResponse, BITACORA_DETALLE_ID);
                        break;
                    case AsyncActionTypeEnum.loading:
                        _loader.style.display = 'block';
                        _loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        _loader.style.display = 'none';
                        _loadedTable.style.display = 'none';
                        break;
                }
            });
        }


        dispatchDxTableAsyncPost(TableID: any, URL: any, filters: any, columnas: any, exportar?: any, filename?: any, loader?: any, loaded?: any, edit?: any, generic?: any) {
            let _loader = loader ? document.getElementById(loader) : document.getElementById('loading');
            let _loadedTable = loaded ? document.getElementById(loaded) : document.getElementById('loadedData');
            //console.log(_loader, _loadedTable)

            global.asyncPost(URL , filters, (status: AsyncActionTypeEnum, dataResponse: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(columnas)
                       // console.log(dataResponse)
                        let localsaved = EK.Store.getState().global.listaVerificadoLocal ? EK.Store.getState().global.listaVerificadoLocal.data : [];
                        if (localsaved.length > 0) {
                            let localsaved = EK.Store.getState().global.listaVerificadoLocal ? EK.Store.getState().global.listaVerificadoLocal.data : [];
                            for (let d of dataResponse) {
                                //let IsLocalSaved = localsaved.filter(x => x.idcomentario === d.ID)[0] !== undefined? 
                                console.log(d)
                                d.verificado = localsaved.filter(x => x.idcomentario === d.ID)[0] !== undefined ? true : d.verificado;
                            }
                        }
                        this.loadDxGridTableComentarios(TableID, columnas, dataResponse, exportar, filename, loader, loaded, edit, generic)
                        global.dispatchSuccessful("global-page-data", dataResponse, BITACORA_DETALLE_ID);
                        break;
                    case AsyncActionTypeEnum.loading:
                        _loader.style.display = 'block';
                        _loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        _loader.style.display = 'none';
                        _loadedTable.style.display = 'none';
                        break;
                }
            });
        }

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

        //shouldComponentUpdate(nextProps: IEdit, nextState: IEdit): any {
        //    console.log(EK.Store.getState().global.tmpArrayFiles, nextProps)
        //    return true;

        //}

        componentWillReceiveProps(nextProps: IEdit): void {
            if (isSuccessful(nextProps.cliente)) {
                if (global.hasChanged(this.props.cliente, nextProps.cliente)) {
                    let cliente: any = getData(nextProps.cliente);
                    if (cliente != null || cliente != undefined) {
                        if (cliente.ID != undefined && cliente.ID > 0) {
                            let idCliente: any = cliente.ID;  
                            let idUbicacion: any = cliente.IdUbicacion;

                            let verComentarios: any = Forms.getDataValue("VerComentarios", BITACORA_ID, EK.Store.getState());
                            let verComenatriosClave : any  = "C"
                            if (verComentarios === undefined || getData(verComentarios).Clave === undefined) {
                                verComenatriosClave = "C"; 
                            } else {
                                verComenatriosClave = getData(verComentarios).Clave; 
                            }
                            console.log('buscar 1')
                            //this.props.obtenerDetalleBitacora(idCliente, verComenatriosClave); 
                            this.ObtenerDetalleBitacoraFn(idCliente, verComenatriosClave)
                            this.props.obtenerEtapa(idCliente);
                            this.props.obtenerUbicacion(idUbicacion);
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
                        Forms.updateFormElement(BITACORA_ID, "Cliente",null);
                        global.dispatchSuccessful("global-page-data", [], BITACORA_DETALLE_ID);
                        global.dispatchSuccessful("global-page-entity", [], BITACORA_UBICACION_ID);
                        global.dispatchSuccessful("global-page-entity", [], BITACORA_UBICACION_DETALLE_ID);
                        global.dispatchSuccessful("global-page-entity", [], BITACORA_ETAPA_ID);
                        //console.log('XDDD')
                    }
                }
            }
            if (isSuccessful(nextProps.verComentarios)) {
                if (global.hasChanged(this.props.verComentarios, nextProps.verComentarios)) {
                    if (getData(this.props.verComentarios).Clave != getData(nextProps.verComentarios).Clave) {
                        if (getData(nextProps.verComentarios).Clave !== 'O') {
                            let cliente: any = getData(nextProps.cliente);
                            if (cliente != null || cliente != undefined) {
                                if (cliente.ID != undefined && cliente.ID > 0) {
                                    let idCliente: any = cliente.ID;
                                    console.log('buscar 2')
                                    if (getData(nextProps.verComentarios).Clave === 'I') {
                                        console.log(idCliente)
                                        this.getIncidenciasEntrega(idCliente)
                                    } else {
                                        this.ObtenerDetalleBitacoraFn(idCliente, getData(nextProps.verComentarios).Clave)
                                    }
                                }
                            }
                        } else {
                            //console.log('Cargar comentarios de las OTs');
                            let data = [];
                            let currentE = getData(EK.Store.getState().global.currentEntity);
                            if (currentE.ID === undefined || currentE.ID === -1) {
                                dispatchSuccessful("global-page-data", [], BITACORA_DETALLE_ID);
                                return;
                            }
                            if (currentE !== null && currentE !== undefined && currentE !== '' && currentE.ID !== -1) {
                                for (let o of currentE.OrdenesTrabajo) {
                                    for (let p of o.Partidas) {
                                        p.IdFolio = currentE.IdFolio;
                                        data.push(p);
                                    }
                                }
                                dispatchSuccessful("global-page-data", data, BITACORA_DETALLE_ID);

                            }
                        }
                       
                        

                    }

                }
            }
            if (isSuccessful(nextProps.reloadcatalogo)) {
                if (global.hasChanged(this.props.reloadcatalogo, nextProps.reloadcatalogo)) {
                    //console.log('cambiar el estatus de cada cosa seleccionada');
                    if (isSuccessful(EK.Store.getState().global.catalogoCambiadoLocal)) {
                        let catalogo = EK.Store.getState().global.catalogoCambiadoLocal.data;
                        dispatchSuccessful("global-page-data", catalogo, BITACORA_DETALLE_ID);
                    }
                    
                }
            }
        };

        

        cambiarEstatusFijo(item) {
            console.log(item)
            let encodedFilters: string;
            let columnas = this.getColumnasBitacora();
            //encodedFilters = global.encodeObject({ idCliente: item.IdCliente, OperacionEspecificaSP: "DesfijarComentarioObtenerBitacora", IdComentario: item.ID });
            //global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);
            encodedFilters = global.encodeObject({ idCliente: item.IdCliente, OperacionEspecificaSP: "FijarDesfijarComentarioObtenerBitacora", IdComentario: item.ID, fijar:item.alertaFija });
            this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);

        }

        onRowDClick(item: any): void {
            console.log(item);
            return null;
        };

        marcarComentarioVerificado(item: any): void {
            console.log(item);
            let encodedFilters: string;
            let columnas = this.getColumnasBitacora();
            encodedFilters = global.encodeObject({ idCliente: item.IdCliente, OperacionEspecificaSP: "VerificarComentarioObtenerBitacora", IdComentario: item.ID});
            this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);
            //global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);
            //let totalNoVerificado = EK.Store.getState().global.TotalComentariosRevisar ? EK.Store.getState().global.TotalComentariosRevisar.data : 0;
            //totalNoVerificado--;
            //dispatchSuccessful('load::TotalComentariosRevisar', totalNoVerificado);
            //if (totalNoVerificado <= 0) {
            //    let btnbitacora = document.getElementById('btn_bitacora');
            //    btnbitacora.classList.remove("btn-income-data");
            //}


            //global.asyncGet("scv/bitacoraCLienteSPV/MarcarComentario/" + item.ID, (status: AsyncActionTypeEnum, data: any) => {
            //    switch (status) {
            //        case AsyncActionTypeEnum.successful:
            //            if (data === 1 || data === '1' || data === true) {
            //                totalNoVerificado--;
            //                success("Comentario verificado", "Exito");
            //                global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);
            //                dispatchSuccessful('load::TotalComentariosRevisar', totalNoVerificado);
            //                if (totalNoVerificado <= 0) {
            //                    let btnbitacora = document.getElementById('btn_bitacora');
            //                    btnbitacora.classList.remove("btn-income-data");
            //                }
            //            } else {
            //                warning("No se pudo marcar el comentario como verificado.", "Alerta");
            //            }
            //            break;
            //        case AsyncActionTypeEnum.loading:
            //            break;
            //        case AsyncActionTypeEnum.failed:
            //            warning("Hubo un problema al intentar actualizar el registro","Alerta");

            //            break;
            //    }
            //});
        }

        marcarComentarioVerificadoFijo(item: any): void {

            let localsaved = EK.Store.getState().global.listaVerificadoLocal ? EK.Store.getState().global.listaVerificadoLocal.data : [];

            let found = false;
            let catalogo = EK.Store.getState().global.catalogo$BitacoraClienteSPV$Detalle ? EK.Store.getState().global.catalogo$BitacoraClienteSPV$Detalle.data : [];
            for (let c of catalogo) {
                if (c.ID === item.ID) {
                    c.verificado = true
                    break;
                }
            }
            console.log(catalogo)
            localsaved.push({ idcomentario: item.ID });
            let d = new Date();
            let timestamp = d.getTime();
            dispatchSuccessful("load::reloadcatalogo", timestamp);
            dispatchSuccessful("load::catalogoCambiadoLocal", catalogo);
            dispatchSuccessful("load::listaVerificadoLocal", localsaved);
            let totalNoVerificado = EK.Store.getState().global.TotalComentariosRevisar ? EK.Store.getState().global.TotalComentariosRevisar.data : 0;
            totalNoVerificado--;
            dispatchSuccessful('load::TotalComentariosRevisar', totalNoVerificado);
            if (totalNoVerificado <= 0) {
                let btnbitacora = document.getElementById('btn_bitacora');
                btnbitacora.classList.remove("btn-income-data");
            }
        }

        onCloseModalLogBook(): void {
            let modal: any = $("#modalNewComment"); 
            modal.modal("hide");
        }

        SeleccionarComentarioIndispensable(value) {
            //console.log(value)
            if (value) {
                document.getElementById('rowMostrarSiempre').style.display = "block";
            } else {
                Forms.updateFormElement(BITACORA_DETALLE_ID, "MostrarSiempre", false)
                document.getElementById('rowMostrarSiempre').style.display = "none";
                
            }
        }

        renderDxTable(dataSource, columnas, idGroupContainer) {
            
            let dataGrid = $(idGroupContainer).dxDataGrid({
                dataSource,
                allowColumnReordering: true,
                scrolling: {
                    columnRenderingMode: "virtual"
                },
                columnAutoWidth: true,
                showBorders: false,
                grouping: {
                    autoExpandAll: false,
                },

                columns: columnas,
                columnFixing: { enabled: true },
                showColumnLines: false,
                showRowLines: false,
                rowAlternationEnabled: true
            }).dxDataGrid("instance");
            dataGrid.refresh();
        }

        onSaveModalLogBook(): void {
            let item: EditForm = Forms.getForm(BITACORA_DETALLE_ID);
            if (item && !item['Comentarios'] || item && item['Comentarios'].trim() === '') {
                global.warning('Ingrese un comentario valido')
                return;
            }
            EK.Global.confirm("¿Desea guardar la informacion?", "Comentarios bitacora", (isConfirm: any) => {
                if (isConfirm === true) {

                    let cliente: any = getData(this.props.cliente);
                    let verComentarios: any = Forms.getDataValue("VerComentarios", BITACORA_ID, EK.Store.getState());
                    let verComenatriosClave: any = "C"
                    let idFolio: any = 0;
                    let idCliente: any = getData(this.props.cliente).ID
                    if (idCliente === null || idCliente === undefined) {
                        global.warning("Debe Indicar el Cliente");
                        return;
                    };
                    if (verComentarios === undefined || getData(verComentarios).Clave === undefined) {
                        verComenatriosClave = "C";
                        idFolio = 0;
                    } else {
                        verComenatriosClave = getData(verComentarios).Clave;
                        if (verComenatriosClave === "F") {
                            let folio: any = getData(EK.Store.getState().global.currentEntity);
                            if (folio === null || folio === undefined || folio.ID === undefined || folio.ID <= 0) {
                                global.warning("Primero debe guarda el folio para poder incorporarle comentarios");
                                return;
                            };
                            idFolio = folio.ID;
                        }
                    };

                    let model: any = item
                        .addID()
                        .addNumberConst("IdCliente", idCliente)
                        .addNumberConst("IdFolio", idFolio)
                        .addObject("Comentarios")
                        .addObject("VerificarComentario")
                        .addObject("MostrarSiempre")
                        .addVersion()
                        .toObject();

                    model.verificado = model.VerificarComentario ? 0 : 1;
                    model.alertaFija = model.MostrarSiempre ? 1 : 0;
                    let TipoSeleccion: any = global.getData(EK.Store.getState().global.TipoSeleccion);
                    let encodedFilters: string;

                    if (TipoSeleccion === "F") {
                        let idFolio: any = getData(EK.Store.getState().global.currentEntity).ID;
                        encodedFilters = global.encodeObject({ idCliente: idFolio, OperacionEspecificaSP: "BitacoraSoloFolio" });
                    } else {
                        encodedFilters = global.encodeObject({ idCliente, OperacionEspecificaSP: "BitacoraCompleta" });
                    }

                    //console.log(model)

                    let loader = document.getElementById('loadingKF');
                    let loadedTable = document.getElementById('loadedDataKF');
                    global.asyncPut("base/kontrol/BitacoraClienteSPV/Get/saveLogBook", model, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                let IdComentario = data[0].ID;
                                let evidencias = EK.Store.getState().global.tmpArrayFiles ? EK.Store.getState().global.tmpArrayFiles.data : [];
                                if (evidencias.length > 0) {
                                   let totalGuardados = 0;
                                    for (let ev of evidencias) {
                                        let _tmpItem = JSON.parse(ev.item)
                                        _tmpItem.EntityId = IdComentario;
                                        _tmpItem.EntityType = 'BitacoraComentariosRF';

                                        let dataForm: FormData = new FormData();
                                        dataForm.append("item",JSON.stringify(_tmpItem));
                                        dataForm.append("file", ev.file);

                                        global.asyncPut("KontrolFiles/Save", dataForm, (status: AsyncActionTypeEnum, dataResp: any) => {
                                            switch (status) {
                                                case AsyncActionTypeEnum.successful:
                                                    //console.log(data);

                                                    totalGuardados++;
                                                    if (totalGuardados === evidencias.length) {
                                                       
                                                        delete EK.Store.getState().global.tmpArrayFiles;
                                                        //$('#modal').modal('toggle');
                                                        //this.onCloseModalLogBook();
                                                        loader.style.display = 'none';
                                                        loadedTable.style.display = 'inherit';
                                                        //global.dispatchUpdating("global-page-data", data, BITACORA_DETALLE_ID)
                                                       // global.dispatchSuccessful("global-page-data", data, BITACORA_DETALLE_ID);
                                                        //global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);

                                                        let columnas = this.getColumnasBitacora();
                                                        this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                                                            encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);

                                                        let modalLogBook: any = $("#modalNewComment");
                                                        modalLogBook.modal('toggle');
                                                        global.success('Comentario guardado');
                                                    }
                                                    break;
                                                //case AsyncActionTypeEnum.loading:
                                                //    loader.style.display = 'block';
                                                //    loadedTable.style.display = 'none';
                                                //    break;
                                                case AsyncActionTypeEnum.failed:
                                                    loader.style.display = 'none';
                                                    loadedTable.style.display = 'inherit';
                                                    break;
                                            }
                                        });

                                    }
                                } else {
                                    loader.style.display = 'none';
                                    loadedTable.style.display = 'inherit';
                                    //global.dispatchSuccessful("global-page-data", data, BITACORA_DETALLE_ID);
                                    //global.dispatchUpdating("global-page-data", data, BITACORA_DETALLE_ID)

                                    //global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);
                                    let columnas = this.getColumnasBitacora();
                                    this.dispatchDxTableAsyncGet('dxComentariosClientesContainer', "base/scv/BitacoraClienteSPV/all/",
                                        encodedFilters, columnas, false, null, 'loaderBitacoraComentarios', 'loadedBitacoraComentarios', true);

                                    let modalLogBook: any = $("#modalNewComment");
                                    modalLogBook.modal('toggle');
                                    global.success('Comentario guardado');
                                   
                                    //Cerrar y cargar datos en la tabla
                                }
                    //            //global.dispatchAsync("global-page-data", "base/scv/BitacoraClienteSPV/all/" + encodedFilters, BITACORA_DETALLE_ID);
                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                               loadedTable.style.display = 'none';
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'inherit';
                              break;
                       }
                    });
                }
            });
            

        }

        footerModalLogBook(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onSaveModalLogBook} className="btn dark btn-outline btn-md blue" >Aceptar</button>
                <button type="button" onClick={this.onCloseModalLogBook} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };

        openMultiPhotoViewer(item) {
            //console.log(item)
            //let modalCalen: any = $("#ModalPhotoViewer");
           // modalCalen.modal();
            let idComentario = item.ID;
            global.asyncGet("scv/bitacoraCLienteSPV/GetB64EvidenciasBitacora/" + idComentario, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {
                    if (data.length > 0) {
                        dispatchSuccessful('load::ImageValueURI', data[0])
                        dispatchSuccessful('load::ArrayImageValues', data)
                        dispatchSuccessful('load::currentIndexImages', {valor:0})
                        let modalCalen: any = $("#ModalMultiPhotoViewer");
                        modalCalen.modal();
                    //console.log("Top: " + $dialog.offset().top + " Left: " + $dialog.offset().left);
                    } else {
                        global.info("No hay evidencias para este comentario");
                        return;
                    }
                   
                }
            });
        }

        AddNewComentarioBitacora() {
            //Forms.remove(BITACORA_DETALLE_ID);
            //console.log(this.props)
            let idCliente: any = EK.Store.getState().forms.BitacoraClienteSPV.form.Cliente.value !== undefined ? EK.Store.getState().forms.BitacoraClienteSPV.form.Cliente.value.ID : null;
            if (idCliente === null || idCliente === undefined) {
                global.warning("Debe Indicar el Cliente");
                return null;
            }
            console.log(idCliente)
            try {
                $("#datagroupContainerImagenes").dxDataGrid("dispose");
            } catch (ex) { }
            delete EK.Store.getState().global.tmpArrayFiles;
            let modalLogBook: any = $("#modalNewComment");
            modalLogBook.modal();
        }

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
            let formatOT: (data: any, row: any) => any = (data: any, row: any): any => {
                let itemStyle: React.CSSProperties = {};
                if (row.IdFolio > 0) {
                    itemStyle.color = "#F44336";
                    itemStyle.fontWeight = "bolder";
                    return <span className="badge badge-success bold">{row.IdFolio}</span>; //<span style={itemStyle}>{row.IdFolio }</span>
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

            let dtConfig2: dt.IDTConfig = dt.createConfig(ml);
            dtConfig2.columns
                .addID({ width: "100px", title: "ID" })
                .add({ data: "Partida.Partida", title: "Incidencia", width: "80px" })
                .add({ data: "IdOrdenTrabajo", title: "OrdenTrabajo", width: "560px"})
                .add({ data: "Observaciones", title: "Comentario", width: "560px" })
                .add({ data: "IdFolio", title: "Folio", width: "100px", format: formatFolio })
                .addDateFormat({ data: "Creado", title: "Fecha", width: "100px" })
                .add({ data: "CreadoPor.Nombre", title: "Creado Por", width: "250px" });  
                
            let ubicacion: any = global.getData(this.props.ubicacion);
            let ubicacionDetalle: any = global.getData(this.props.ubicacionDetalle);
            let clienteEtapa: any = global.getData(this.props.etapa);

            let TipoSeleccion: any = global.getData(EK.Store.getState().global.TipoSeleccion);
            let ComentariosGuardados = global.getData(EK.Store.getState().global.catalogo$BitacoraClienteSPV$Detalle, []);
            let totalNoVerificados = 0;
            //console.log(ComentariosGuardados);
            //console.log(TipoSeleccion)
           
            let ComentariosFolio = [];
            let Comentario = global.getData(EK.Store.getState().global.currentEntity).ObservacionesContratista;
            let IdFolio = global.getData(EK.Store.getState().global.currentEntity).ID;

            const listHeaderBitacora: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center"></Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"Evidencia"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"ID"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">{"Incidencia"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Fecha"}</Column>
                        <Column size={[6, 6, 6, 6]} className="list-default-header text-center">{"Comentario"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Folio"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header text-center">{"Creado por"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">{"Fijado"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">&nbsp;</Column>

                    </Row>
                </Column>

            const listHeaderBitacoraFolio: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center"></Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"Evidencia"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"ID"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">{"Incidencia"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Fecha"}</Column>
                        <Column size={[6, 6, 6, 6]} className="list-default-header text-center">{"Comentario"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"Folio"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header text-center">{"Creado por"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">{"Fijado"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">&nbsp;</Column>

                    </Row>
                </Column>

            
            //ComentariosFolio.push({ com: Comentario, ID: IdFolio });
            //console.log(getData(this.props.cliente).ID)
            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8, overflowY: "auto", height: "450px", position: "relative" }} >
                <Column size={[12, 12, 12, 12]} style={{ marginTop: "-15px" }} >
                    <Row>
                        {getData(this.props.origen).origen === "DashBoardFailureReporte" || getData(this.props.origen).origen === undefined || getData(this.props.origen).origen === null ?
                            <div>
                            <select.ClientesLotesSPV idFormSection={BITACORA_ID} size={[10, 10, 6, 6]} required={true} validations={[validations.required()]} />
                                 
                            </div>
                            :
                            <div>
                                <label.Entidad id="Cliente" size={[10, 10, 6, 6]} value={(item: any) => {
                                    return !item ? "" : (!item.ID ? "" : "<span class='badge badge-info'>" + item.ID + "</span> ") + (!item.Nombre ? "" : item.Nombre);
                                }} />
                                <VerComentariosDDL idFormSection={BITACORA_ID} size={[10, 10, 4, 4]} validations={[validations.required()]} required={true} />
                            </div>
                        }
                        {getData(this.props.cliente).ID !== undefined && getData(this.props.origen).origen === "DashBoardFailureReporte" ?
                            <VerComentariosDDL idFormSection={BITACORA_ID} size={[10, 10, 4, 4]} validations={[validations.required()]} required={true} />
                            : null}

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
                                <li className="">
                                    <a href="#tab_informacion_cliente" data-toggle="tab" aria-expanded="false">Información del Cliente</a>
                                </li>
                            </ul>
                            <div className="tab-content" style={{ padding: 0 }}>
                                <div className="tab-pane active" id="tab_detalle_bitacora">
                                    <Row>
                                        <div id="idTabsSPV" style={{ marginTop: "10px" }}>
                                            { // COMENTARIOS DEL CLIENTE CON O SIN FOLIO
                                                TipoSeleccion === 'C' ?
                                                    <div>
                                                        <Row style={{ width: '96%', margin: 'auto' }}>
                                                            <Column size={[11, 11, 11, 11]}>

                                                            </Column>
                                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right", padding: "10px 5px 0px" }}>
                                                                <button className="bg-white btn-section-ek" title="Agregar" onClick={this.AddNewComentarioBitacora}><i className="fa fa-plus"></i></button>
                                                            </Column>
                                                        </Row>
                                                        <page.dxTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id="dxComentariosClientesContainer" idLoader="loaderBitacoraComentarios" idLoaded="loadedBitacoraComentarios">
                                                        </page.dxTable>
                                                    </div>
                                                   
                                                    :
                                                    null
                                                    
                                            }
                                            {  // COMENTARIOS DE LA ORDEN DE TRABAJO
                                                TipoSeleccion === 'O' ?
                                                    <page.SectionListExtended
                                                        id={BITACORA_DETALLE_ID}
                                                        parent={BITACORA_ID}
                                                        icon="fa fa-table"
                                                        level={1}
                                                        dtConfig={dtConfig2}
                                                        hideNewButton={true}
                                                        viewMode={true}
                                                        size={[12, 12, 12, 12]}
                                                        readonly={true}
                                                        items={createSuccessfulStoreObject([])}>
                                                    </page.SectionListExtended>:null
                                            }
                                            { // COMENTARIOS DEL FOLIO
                                                TipoSeleccion === 'F' ?
                                                    //dxTableTemplate
                                                    <div>
                                                        <Row style={{width:'96%', margin:'auto'}}>
                                                            <Column size={[11, 11, 11, 11]}>

                                                            </Column>
                                                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right", padding: "10px 5px 0px" }}>
                                                                <button className="bg-white btn-section-ek" title="Agregar" onClick={this.AddNewComentarioBitacora}><i className="fa fa-plus"></i></button>
                                                            </Column>
                                                        </Row>
                                                        <page.dxTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id="dxComentariosClientesContainer" idLoader="loaderBitacoraComentarios" idLoaded="loadedBitacoraComentarios">
                                                        </page.dxTable>
                                                    </div>
                                                    :
                                                    null
                                            }
                                            { // COMENTARIOS DEL FOLIO
                                                TipoSeleccion === 'I' ?
                                                    //dxTableTemplate
                                                    <div>
                                                       
                                                        <page.dxTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id="dxIncidenciasEntregaGrid" idLoader="loaderIncidenciasEntrega" idLoaded="loadedIncidenciasEntrega">
                                                        </page.dxTable>
                                                    </div>
                                                    :
                                                    null
                                            }
                        
                                            <modal.Modal id="modalNewComment" header={("Agregar comentario a Bitácora")} footer={this.footerModalLogBook()} addDefaultCloseFooter={false} style={{ height: "200px"}}>
                                                <div id="loadingKF" style={{ display: 'none' }}>
                                                    <Updating text="" />
                                                </div>
                                                <div id="loadedDataKF" style={{ display: 'inherit' }}>
                                                    <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <Row>
                                                                <input.Text validations={[validations.required()]} id="Comentarios" label="Comentarios" idFormSection={BITACORA_DETALLE_ID} size={[12, 12, 12, 12]} />
                                                            </Row>
                                                            <Row>
                                                                <checkBox.CheckBox id="VerificarComentario" label="Comentario Indispensable de revision" change={(value: any) => this.SeleccionarComentarioIndispensable(value)} idFormSection={BITACORA_DETALLE_ID} size={[12, 12, 4, 4]} />
                                                            </Row>
                                                            <Row>
                                                                <KontrolFileManagerV2 modulo="SPV" entityType="BitacoraComentariosRF" tipo="anexos" entity={null} viewMode={false} multiple={true} size={[12, 12, 12, 12]} />
                                                            </Row>
                                                            <Row id='rowMostrarSiempre' style={{ display: 'none' }}>
                                                                <checkBox.CheckBox id="MostrarSiempre" label="Comentario fijo" idFormSection={BITACORA_DETALLE_ID} size={[12, 12, 4, 4]} />
                                                            </Row>
                                                        </Column>
                                                    </Row>
                                                </div>
                                                

                                            </modal.Modal>


                                        </div>
                                    </Row>
                                </div>
                                <div className="tab-pane" id="tab_informacion_cliente">
                                    <Row>
                                        <ViewUbicacionCliente ubicacion={ubicacion} ubicacionDetalle={ubicacionDetalle} clienteEtapa={clienteEtapa} />
                                    </Row>
                                </div>
                            </div>
                        </div>

                       
                    </Row>
                </Column>
            </Column>;
        };
    });

    interface IUbicacionClienteProps extends React.Props<any> {
        ubicacion: any;
        clienteEtapa: any;
        ubicacionDetalle: any;
    };

    class ViewUbicacionCliente extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            //let ubicacionDetalle: any = this.props.ubicacion;
            //let clienteEtapa: any = this.props.clienteEtapa;

            let ubicacion: any = this.props.ubicacion;
            let clienteEtapa: any = this.props.clienteEtapa;
            let ubicacionDetalle: any = this.props.ubicacionDetalle;

            let reportesFalla: any = 0;
            let diasEntrega: any = 0;
            let mesesEntrega: any = 0;

            diasEntrega = clienteEtapa.MesesTranscurridos ? clienteEtapa.MesesTranscurridos : 0;
            mesesEntrega = clienteEtapa.MesesTranscurridosEntrega ? clienteEtapa.MesesTranscurridosEntrega : 0;
            if (ubicacionDetalle.length > 0) {
                reportesFalla = ubicacionDetalle[0].CantReportesFallas ? ubicacionDetalle[0].CantReportesFallas : 0;
            }


            return <div style={{ marginTop: "10px" }}>
                <Column size={[12, 12, 6, 6]} >
                    <page.OptionSection
                        id={BITACORA_UBICACION_ID}
                        parent={BITACORA_ID}
                        size={[12, 12, 6, 6]}
                        subTitle={<span style={{ marginLeft: 5 }}>
                            <span className="badge badge-info bold">{ubicacion.ClaveFormato}</span>
                        </span>}
                        level={1}
                        icon="fa fa-home" collapsed={false} hideCollapseButton={false}>
                        <Row>
                            <label.Label id="Calle" idForm={BITACORA_UBICACION_ID} size={[12, 12, 12, 12]} />
                            <label.Entidad id="Desarrollo" idForm={BITACORA_UBICACION_ID} size={[12, 12, 12, 12]} value={() => {
                                return !ubicacion || !ubicacion.Desarrollo ? "" : (!ubicacion.DesarrolloClave ? "" : "<span class='badge badge-info'>" + ubicacion.DesarrolloClave + "</span> ") + (!ubicacion.Desarrollo.Nombre ? "" : ubicacion.Desarrollo.Nombre);
                            }} />
                            <label.Entidad id="Plaza" idForm={BITACORA_UBICACION_ID} size={[12, 12, 12, 12]} />
                            <label.Entidad id="Segmento" idForm={BITACORA_UBICACION_ID} size={[12, 12, 12, 12]} />
                            <label.Entidad id="Prototipo" idForm={BITACORA_UBICACION_ID} size={[12, 12, 12, 12]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 6, 6]} >
                    <Column size={[12, 12, 6, 6]} >
                        <span className="dashboard-stat dashboard-stat-v2 red ek-sombra">
                            <div className="visual">
                                <i className="fas fa-home"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span className="counter" data-counter="counterup " data-value={diasEntrega}>{diasEntrega}</span>
                                </div>
                                <div className="desc"> Días desde Entrega </div>
                            </div>
                        </span>
                    </Column>

                    <Column size={[12, 12, 6, 6]} >
                        <span className="dashboard-stat dashboard-stat-v2 red ek-sombra" style={{ backgroundColor: "rgb(241, 196, 15)" }}>
                            <div className="visual">
                                <i className="fas fa-home"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span className="counter" data-counter="counterup " data-value={mesesEntrega}>{mesesEntrega}</span>
                                </div>
                                <div className="desc"> Meses desde Entrega </div>
                            </div>
                        </span>
                    </Column>
                    <Column size={[12, 12, 6, 6]} >
                        <span className="dashboard-stat dashboard-stat-v2 green ek-sombra" >
                            <div className="visual">
                                <i className="far fa-eye"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span className="counter" data-counter="counterup " data-value={reportesFalla}>{reportesFalla}</span>
                                </div>
                                <div className="desc"> Reportes de Falla </div>
                            </div>
                        </span>
                    </Column>
                </Column> </div>;
        };
    };

    interface IBitacoraPrintButtonProps extends IButtonProps, page.IProps {
        clienteRef?: DataElement;
    };

    const BitacoraPrintButton: any = global.connect(class extends React.Component<IBitacoraPrintButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", BITACORA_ID, state);
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
            let idCliente: number = global.getDataID(this.props.clienteRef);
            let operacionEspecificaSP: string = "BitacoraCompleta";



            let win = window.open("scv/bitacoraCLienteSPV/imprimirDocumento/" + idCliente + "/" + operacionEspecificaSP, "_blank")
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
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
                //console.log('Cambiar tipo de seleccion')
                ///if (item.Clave === 'F') {
                    //console.log("Cargar los comentarios del folio")
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
                items.push({ ID: 1, Clave: "F", Nombre: "Ver Comentarios adicionales del Folio" });
                items.push({ ID: 2, Clave: "C", Nombre: "Ver Todos los Comentarios del Cliente" });
                items.push({ ID: 3, Clave: "O", Nombre: "Ver Comentarios de Incidencias en OT" });
                items.push({ ID: 4, Clave: "I", Nombre: "Ver Incidencias de Entrega" });
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

import ModalBitacoraClienteSPV = EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Bitacora.BitacoraModalBase;
namespace EK.Modules.SCV.Pages.postventa.RUBA.EventosActividades {
    "use strict";
    const PAGE_ID = "EventosActividades";
    const PAGE_ID_PPC = "EventosActividadesPPC";
    const PATROCINADORES = "PATROCINADORESPPC"
    const PATROCINADORESCRUD = "PATROCINADORESPPCCRUD"
    const COLABORADORES = "COLABORADORESPPC";
    const PARTICIPANTES = "PARTICIPANTESPPC";
    const EVENTPPCSELECT = "EVENTPPCSELECTPPC"
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [EVENTPPCSELECT, PATROCINADORES, COLABORADORES, PARTICIPANTES]);
    const REGEXEMAIL = /^[\w-\.]+@([\w -]+\.)+[\w-]{2,4}$/
    const columnsParticipantes = [
        { caption: "Hombre", dataField: "hombre", alignment: 'center' },
        { caption: "Mujer", dataField: "mujer", alignment: 'center' },
        { caption: "Niños", dataField: "ninos", alignment: 'center' },
        { caption: "Adultos Mayores", dataField: "amayores", alignment: 'center' },
        { caption: "Total", dataField: "total", alignment: 'center' }
    ]

    const columnsPatrocinadores = [
        { caption: "ID", dataField: "ID", alignment: 'left' },
        { caption: "Nombre", dataField: "Nombre", alignment: 'left' },
        { caption: "Razón Social", dataField: "RazonSocial", alignment: 'left' },
        { caption: "Calle", dataField: "Calle", alignment: 'left' },
        { caption: "Número", dataField: "Numero", alignment: 'left' },
        { caption: "Teléfono", dataField: "Telefono", alignment: 'left' },
        { caption: "Celular", dataField: "Celular", alignment: 'left' },
        { caption: "Email", dataField: "Email", alignment: 'left' },
    ]
    let columnsColaboradores = [
        { caption: "No. Empleado", dataField: "NoEmpleado", alignment: 'left' },
        { caption: "Nombre", dataField: "Nombre", alignment: 'left' },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno", alignment: 'left' },
        { caption: "Apellido Materno", dataField: "ApellidoMaterno", alignment: 'left' },
        { caption: "Email", dataField: "Email", alignment: 'left' },
        { caption: "Puesto", dataField: "Puesto", alignment: 'left' },
        { caption: "Staff", dataField: "Staff", alignment: 'left' },
        { caption: "Participante", dataField: "Participante", alignment: 'left' },
    ]
    const onSaveFile = (file: EK.UX.Kontrol.File, entityType: string, entityId: number, disState) => {
        let fileSize: number = EK.UX.Kontrol.DEFAULT_FILE_SIZE;

        if (file.getSize() > EK.UX.Kontrol.DEFAULT_FILE_SIZE) {
            errorMessage("Error");
            return;
        };

        let model: any = {};
        model['ID'] = 0;
        model['EntityId'] = entityId;
        model['EntityType'] = entityType;
        model['Tipo'] = "anexos";
        model['Nombre'] = file.getName();
        model['FileSize'] = file.getSize();
        model['FileType'] = file.getType();
        model['FileExtension'] = file.getExtension();
        model['Modulo'] = "SPV";
        model['Uid'] = null;



        model = EK.Global.assign(model, {
            EntityId: model.EntityId,
            EntityType: model.EntityType,
            Nombre: model.Nombre,
            FileSize: model.FileSize,
            FileType: model.FileType,
            FileExtension: model.FileExtension,
            Modulo: model.Modulo,
            Tipo: model.Tipo,
            Uid: model.Uid,
        });

        let data: FormData = new FormData();
        data.append("item", JSON.stringify(model));
        data.append("file", file.getFile());
        global.asyncPut("KontrolFiles/Save", data, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    dispatchSuccessful(`load::${disState}`, { Save: true }, PAGE_ID)
                    success("Se ha guardado el archivo", "Exito")
                    break;
                case AsyncActionTypeEnum.loading:
                    break;
                case AsyncActionTypeEnum.failed:
                    break;
            }
        })
    }
    const removeFile = (model: any, disState: any) => {

        global.asyncPut("KontrolFiles/Delete", model, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    dispatchSuccessful(`load::${disState}`, { Save: true }, PAGE_ID)
                    success("Archivo eliminado", "Exito")
                    break;
                case AsyncActionTypeEnum.loading:
                    break;
                case AsyncActionTypeEnum.failed:
                    break;
            }
        })
    }
    const onDataTableFiles = (container: string, data: any) => {
        $(`#${container}`).dxDataGrid({
            dataSource: data,
            rowAlternationEnabled: true,
            selection: {
                mode: "single"
            },
            onRowPrepared: function (event) {
                $(event.rowElement).on('dblclick', function () {
                    console.log(event.data)
                    EK.Global.confirm("¿Esta seguro de eliminar el archivo?", "Eliminar", () => {
                        let model = EK.Global.assign({}, {
                            ID: event.data.ID,
                            EntityId: event.data.EntityId,
                            EntityType: event.data.EntityType,
                            Tipo: event.data.Tipo,
                            Uid: event.data.Uid
                        });
                        if (event.data.EntityType === PARTICIPANTES) {
                            removeFile(model, 'SaveitemsFilePatrocinadores');
                        }
                        if (event.data.EntityType === PATROCINADORES) {
                            removeFile(model, 'SaveitemsFilePatrocinadores');
                        }
                        if (event.data.EntityType === COLABORADORES) {
                            removeFile(model, 'SaveitemsFileColaboradores');
                        }
                    });
                }).on('remove', function () {
                    //on remove event in jquery ui libraries or 
                    $(this).off('dblclick remove');
                })
            },
            paging: {
                pageSize: 5
            },
            columns: [{
                caption: "Archivo", dataField: "Nombre", alignment: 'left',
                cellTemplate: (container, options) => {
                    let text = options.data.Nombre
                    $('<a/>').addClass('dx-link')
                        .text(text)
                        .on('dxclick', () => {
                            //Do something with 
                            window.location.href = options.data.FilePath;
                        })
                        .appendTo(container);
                },
            },
            { caption: "Fecha", dataField: "Creado", dataType: "datetime", format: "d/M/yyyy" },
            {
                caption: "Creado Por", dataField: "CreadoPor.Nombre"
            },
            {
                caption: "Tamaño", dataField: "FileSize",
                cellTemplate: function (container, options) {
                    return $("<div>", {})
                        .append($(`<span>${getFormatBytes(options.data.FileSize, 2)}</span>`))
                        .appendTo(container);
                }
            }
            ],
            showBorders: true,
        }).dxDataGrid("instance");
    }
    const onDataTableData = (container: string, data: any, columns?: any, nameFileExport?: any, TypeEntity?: any) => {
       // console.log(data)
        let fecha = Date.now();
        $(`#${container}`).dxDataGrid({
            dataSource: data,
            onRowPrepared: function (event) {
                $(event.rowElement).on('dblclick', function () {
                    //console.log(event.data)
                    dispatchSuccessful(`load::rowData`, event.data, PAGE_ID);

                    if (event.data.entity === PARTICIPANTES) {
                        onUpdateParticipantes(event.data);
                    }
                    if (event.data.entity === PATROCINADORES) {
                        onUpdatePatrocinadores(event.data)
                    }
                    if (event.data.entity === COLABORADORES) {
                        onUpdateColaboradores(event.data)
                    }

                }).on('remove', function () {
                    //on remove event in jquery ui libraries or 
                    $(this).off('dblclick remove');
                })
            },
            columnAutoWidth: true,
            showBorders: false,
            searchPanel: {
                visible: true
            },
            paging: {
                pageSize: 5
            },
            columns: columns,
            showColumnLines: false,
            showRowLines: true,
            rowAlternationEnabled: true,
            selection: {
                mode: "single"
            },
            export: {
                enabled: true,
                fileName: `${nameFileExport}_${fecha}`,
                allowExportSelectedData: false
            },
            onExporting: function (e) {

                e.cancel = true;
                if (nameFileExport === "Colaboradores") {
                    for (const d of data) {
                        d.Staff = d.Staff ? 'SI' : 'NO';
                        d.Participante = d.Participante ? 'SI' : 'NO';
                    }
                }
                e.cancel = false;
                if (nameFileExport === "Colaboradores") {
                    setTimeout(() => {
                        for (const d of data) {
                            d.Staff = d.Staff=== 'SI' ? true : false
                            d.Participante = d.Participante === 'SI' ? true : false
                        }
                    }, 200);
                }
            },
        }).dxDataGrid("instance");
    }

    const onUpdateParticipantes = (data: any) => {
        dispatchSuccessful("load::modeEditParticipantes", { modeEditParticipantes: true }, PAGE_ID)
        let modal: any = $("#ModalParticipantes");
        modal.modal();

        Forms.updateFormElement(PARTICIPANTES, "ApePaternoPar", data.ApellidoPaterno)
        Forms.updateFormElement(PARTICIPANTES, "ApeMaternoPar", data.ApellidoMaterno)
        Forms.updateFormElement(PARTICIPANTES, "NombrePar", data.Nombre)
        Forms.updateFormElement(PARTICIPANTES, "CallePar", data.Calle)
        Forms.updateFormElement(PARTICIPANTES, "NumeroPar", data.Numero)
        Forms.updateFormElement(PARTICIPANTES, "TelefonoPar", data.Telefono)
        Forms.updateFormElement(PARTICIPANTES, "CelularPar", data.Celular)
        Forms.updateFormElement(PARTICIPANTES, "EmailPar", data.Email)

    }
    const onUpdatePatrocinadores = (data: any) => {
        dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: true }, PAGE_ID)
        let modal: any = $("#ModalPatrocinadoresPPC");
        modal.modal();
        dispatchSuccessful("load::missingInfo", { missingInfo: false }, PAGE_ID);
        Forms.updateFormElement(PATROCINADORES, "PatrocinadorPPC", data)
    }
    const onUpdateColaboradores = (data: any) => {
        dispatchSuccessful("load::modeEditColaboradores", { modeEditColaboradores: true }, PAGE_ID)
        let modal: any = $("#ModalColaboradoresPPC");
        modal.modal();

        Forms.updateFormElement(COLABORADORES, "NumEmpleadoCol", data.NoEmpleado)
        Forms.updateFormElement(COLABORADORES, "ApePaternoCol", data.ApellidoPaterno)
        Forms.updateFormElement(COLABORADORES, "ApeMaternoCol", data.ApellidoMaterno)
        Forms.updateFormElement(COLABORADORES, "NombreCol", data.Nombre)
        Forms.updateFormElement(COLABORADORES, "EmailCol", data.Email)
        Forms.updateFormElement(COLABORADORES, "PuestoCol", data.Puesto)
        Forms.updateFormElement(COLABORADORES, "StaffCol", data.Staff)
        Forms.updateFormElement(COLABORADORES, "ParticipanteCol", data.Participante)
    }

    const loadFiles = (parametros, state, initTable) => {
        let encodedFilters: string = global.encodeObject(parametros);
        global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
            dispatchSuccessful(`load::${state}`, data, PAGE_ID);
            onDataTableFiles(initTable, data);
        });
    }
    interface IEventosActividadesPPC extends page.IProps {
        modeEditPPCGeneral?: any,
        entityItemPPC?: any,
        PARTICIPANTESPPC?: any,
        PATROCINADORESPPC?: any,
        COLABORADORESPPC?: any,
        loadCatPatrocinadoresPPC: () => void,
        savePatrocinadores?: any,
        SaveitemsFileParticipantes?: any,
        SaveitemsFilePatrocinadores?: any,
        SaveitemsFileColaboradores?: any,
        itemsFileLoad: (parametros, state, initTable) => void,

    };
    interface IFieldsEditorState {
        file: EK.UX.Kontrol.File;
    }
    //========================================================================
    // CAPTURA EVENTO
    //=========================================================================
    export const EVENTOSACTIVIDADESPPC: any = global.connect(class extends React.Component<IEventosActividadesPPC, IFieldsEditorState>{
        constructor(props) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onSaveEdit = this.onSaveEdit.bind(this);
            //   this.onSaveFile = this.onSaveFile.bind(this);
            this.state = { file: new EK.UX.Kontrol.File(null) }
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditPPCGeneral = state.global.modeEditPPCGeneral;
            retValue.entityItemPPC = state.global.entityItemPPC;
            retValue.PARTICIPANTESPPC = state.global.PARTICIPANTESPPC;
            retValue.PATROCINADORESPPC = state.global.PATROCINADORESPPC;
            retValue.COLABORADORESPPC = state.global.COLABORADORESPPC;
            retValue.savePatrocinadores = state.global.savePatrocinadores
            retValue.SaveitemsFileParticipantes = state.global.SaveitemsFileParticipantes
            retValue.SaveitemsFilePatrocinadores = state.global.SaveitemsFilePatrocinadores
            retValue.SaveitemsFileColaboradores = state.global.SaveitemsFileColaboradores

            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            loadCatPatrocinadoresPPC: () => {
                let parametros = global.assign({
                    OPERACION: "SELECT"
                })
                global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            dispatchSuccessful("load::Catpatrocinadores", data, PAGE_ID)
                            let dataGrid2 = $("#datagroupContainerPatrocinadoresCrudPPC").dxDataGrid({
                                dataSource: data,
                                onRowPrepared: function (event) {
                                    $(event.rowElement).on('dblclick', function () {
                                        console.log("dispatch")
                                        dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: true }, PAGE_ID);
                                        dispatchSuccessful("load::itemDataPatrocinadores", event.data, PAGE_ID);
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'NombreCrud', event.data.Nombre)
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'RazonSocialCrud', event.data.RazonSocial)
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'CalleCrud', event.data.Calle)
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'NumeroCrud', event.data.Numero)
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'TelefonoCrud', event.data.Telefono)
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'CelularCrud', event.data.Celular)
                                        Forms.updateFormElement(PATROCINADORESCRUD, 'EmailCrud', event.data.Email)
                                    }).on('remove', function () {
                                        //on remove event in jquery ui libraries or 
                                        $(this).off('dblclick remove');
                                    })
                                },
                                columnAutoWidth: true,
                                showBorders: false,
                                searchPanel: {
                                    visible: true
                                },
                                paging: {
                                    pageSize: 5
                                },
                                columns: [
                                    { caption: "Id", dataField: "Id", alignment: 'left' },
                                    { caption: "Nombre", dataField: "Nombre", alignment: 'left' },
                                    { caption: "Razón Social", dataField: "RazonSocial", alignment: 'left' },
                                    { caption: "Calle", dataField: "Calle", alignment: 'left' },
                                    { caption: "Número", dataField: "Numero", alignment: 'left' },
                                    { caption: "Teléfono", dataField: "Telefono", alignment: 'left' },
                                    { caption: "Celular", dataField: "Celular", alignment: 'left' },
                                    { caption: "Email", dataField: "Email", alignment: 'left' },
                                ],
                                showColumnLines: false,
                                showRowLines: true,
                                rowAlternationEnabled: true,
                                selection: {
                                    mode: "single"
                                },
                            }).dxDataGrid("instance");
                            break;
                        case AsyncActionTypeEnum.loading:
                            break;
                        case AsyncActionTypeEnum.failed:
                            break;
                    }
                })
            },
            itemsFileLoad: (parametros, state, initTable) => {
                let encodedFilters: string = global.encodeObject(parametros);
                global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
                    dispatchSuccessful(`load::${state}`, data, PAGE_ID);
                    onDataTableFiles(initTable, data);
                });
            }
        })
        componentWillReceiveProps(nextProps: IEventosActividadesPPC): void {

            if (hasChanged(this.props.savePatrocinadores, nextProps.savePatrocinadores) && global.isSuccessful(nextProps.savePatrocinadores)) {
                if (isSuccessful(nextProps.savePatrocinadores)) {
                    let data: any = global.getData(nextProps.savePatrocinadores);
                    this.props.loadCatPatrocinadoresPPC();
                };
            };
            if (hasChanged(this.props.PARTICIPANTESPPC, nextProps.PARTICIPANTESPPC) && global.isSuccessful(nextProps.PARTICIPANTESPPC)) {
                if (isSuccessful(nextProps.PARTICIPANTESPPC)) {
                    let data: any = global.getData(nextProps.PARTICIPANTESPPC);
                    onDataTableData("datagroupContainerParticipantes", data, columnsParticipantes, "Participantes");
                };
            };
            if (hasChanged(this.props.PATROCINADORESPPC, nextProps.PATROCINADORESPPC) && global.isSuccessful(nextProps.PATROCINADORESPPC)) {
                if (isSuccessful(nextProps.PATROCINADORESPPC)) {
                    let data: any = global.getData(nextProps.PATROCINADORESPPC);
                    console.log(data)
                    onDataTableData("datagroupContainerPatrocinadores", data, columnsPatrocinadores, "Patrocinadores");
                };
            };
            if (hasChanged(this.props.COLABORADORESPPC, nextProps.COLABORADORESPPC) && global.isSuccessful(nextProps.COLABORADORESPPC)) {
                if (isSuccessful(nextProps.COLABORADORESPPC)) {
                    let data: any = global.getData(nextProps.COLABORADORESPPC);
                    onDataTableData("datagroupContainerColaboradores", data, columnsColaboradores, "Colaboradores");
                };
            };

            if (hasChanged(this.props.SaveitemsFileParticipantes, nextProps.SaveitemsFileParticipantes) && global.isSuccessful(nextProps.SaveitemsFileParticipantes)) {
                if (isSuccessful(nextProps.SaveitemsFileParticipantes)) {
                    if (isSuccessful(EK.Store.getState().global.entityItemPPC)) {
                        let evento = EK.Store.getState().global.entityItemPPC.data;
                         console.log(evento)
                        loadFiles({ tipo: "anexos", entityType: PARTICIPANTES, entityId: evento[0].IdEvento, activos: 1 }, "itemsFileParticipantes", "datagroupContainerFilesParticipantes");

                       // this.props.itemsFileLoad({ tipo: "anexos", entityType: PARTICIPANTES, entityId: evento.IdEvento, activos: 1 }, "itemsFileParticipantes", "datagroupContainerFilesParticipantes");
                    }
                };
            };
            if (hasChanged(this.props.SaveitemsFilePatrocinadores, nextProps.SaveitemsFilePatrocinadores) && global.isSuccessful(nextProps.SaveitemsFilePatrocinadores)) {
                if (isSuccessful(nextProps.SaveitemsFilePatrocinadores)) {
                    if (isSuccessful(EK.Store.getState().global.entityItemPPC)) {
                        let evento = EK.Store.getState().global.entityItemPPC.data;
                        console.log(evento)
                            loadFiles({ tipo: "anexos", entityType: PATROCINADORES, entityId: evento[0].IdEvento, activos: 1 }, "itemsFilePatrocinadores", "datagroupContainerFilesPatrocinadores");
                        //this.props.itemsFileLoad({ tipo: "anexos", entityType: PATROCINADORES, entityId: evento.IdEvento, activos: 1 }, "itemsFilePatrocinadores", "datagroupContainerFilesPatrocinadores");
                    }
                };
            };
            if (hasChanged(this.props.SaveitemsFileColaboradores, nextProps.SaveitemsFileColaboradores) && global.isSuccessful(nextProps.SaveitemsFileColaboradores)) {
                if (isSuccessful(nextProps.SaveitemsFileColaboradores)) {
                    if (isSuccessful(EK.Store.getState().global.entityItemPPC)) {
                        let evento = EK.Store.getState().global.entityItemPPC.data;
                         console.log(evento)
                            loadFiles({ tipo: "anexos", entityType: COLABORADORES, entityId: evento[0].IdEvento, activos: 1 }, "itemsFileColaboradores", "datagroupContainerFilesColaboradores");
                       // this.props.itemsFileLoad({ tipo: "anexos", entityType: COLABORADORES, entityId: evento.IdEvento, activos: 1 }, "itemsFileColaboradores", "datagroupContainerFilesColaboradores");
                    }
                };
            };

        }

        onModalParticipantes() {
            let data = getData(EK.Store.getState().global.PARTICIPANTESPPC)
            if (data.length <= 0) {
                //console.log(data)
                Forms.reset(PARTICIPANTES);
                Forms.updateFormElement(PARTICIPANTES, "TotalP", null);
                dispatchSuccessful("load::modeEditParticipantes", { modeEditParticipantes: false }, PAGE_ID)
            } else {
                Forms.updateFormElement(PARTICIPANTES, "Hombre", data[0].hombre);
                Forms.updateFormElement(PARTICIPANTES, "Mujer", data[0].mujer);
                Forms.updateFormElement(PARTICIPANTES, "Nino", data[0].ninos);
                Forms.updateFormElement(PARTICIPANTES, "AdultoMayor", data[0].amayores);
                Forms.updateFormElement(PARTICIPANTES, "TotalP", data[0].total);
            }
          
            let modal: any = $("#ModalParticipantes");
            modal.modal();

        }
        onModalPatrocinadores() {
            Forms.reset(PATROCINADORES);
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID)
            let modal: any = $("#ModalPatrocinadoresPPC");
            modal.modal();
        }
        onPatrocinadoresCrud(): any {
            Forms.reset(PATROCINADORESCRUD);
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID);

            let modal: any = $("#ModalPatrocinadoresCrudPPC");
            modal.modal();
        }
        onModalColaboradores() {
            Forms.reset(COLABORADORES);
            dispatchSuccessful("load::modeEditColaboradores", { modeEditColaboradores: false }, PAGE_ID)
            let modal: any = $("#ModalColaboradoresPPC");
            modal.modal();
        }

        onsave() {
            let loader = document.getElementById('loadingPPC');
            let loaded = document.getElementById('loadedDataPPC');
            //let model = Forms.getValues(SECCION);
            let Url;
            let Evento = Forms.getValue("EventosSelectPPC", EVENTPPCSELECT)
            let participantes = getData(this.props.PARTICIPANTESPPC);
            let patrocinadores = getData(this.props.PATROCINADORESPPC);
            let colaboradores = getData(this.props.COLABORADORESPPC);
            let isModeEdit;
            if (isSuccessful(this.props.modeEditPPCGeneral)) {
                isModeEdit = this.props.modeEditPPCGeneral.data.modeEdit;
            }

            if (participantes.length === 0 && patrocinadores.length === 0 && colaboradores.length === 0) {
                warning("No hay informacion para guardar", "Atención");
                return
            }
            if (participantes.length === 0) {
                warning("Debe de ingresar al menos un participante", "Atención")
                return
            }
            let parametros = [];
            parametros.push({
                IdEvento: Evento.ID,
                Participantes: participantes,
                Patrocinadores: patrocinadores,
                Colaboradores: colaboradores
            })
            console.log(parametros)
            // console.log(parametros)

            if (!isModeEdit) {
                Url = "base/kontrol/EventosActividades/GetBP/SaveEventActividadesPPC/"
            } else {
                Url = "base/kontrol/EventosActividades/GetBP/UpdateEventActividadesPPC/"
            }
            EK.Global.confirm("Desea guardar la siguiente informacion? ", "Participantes", () => {
                global.asyncPost(Url, { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            if (data > 0) {
                                success("Se ha guardado el registro", "Exito")
                                this.onCancelModeEdit();

                            } else {
                                warning("Ha ocurrido un error", "Atención")
                            }
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            break;
                        case AsyncActionTypeEnum.loading:
                            loader.style.display = 'block';
                            loaded.style.display = 'none'
                            break;
                        case AsyncActionTypeEnum.failed:
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit'
                            break;
                    }
                });
            });
            

        }
        componentDidMount(): any {
            dispatchSuccessful("load::spin3", { spin3: false }, PAGE_ID)
            global.dispatchSuccessful("load::entityItemPPC", []);
            global.dispatchSuccessful("load::PARTICIPANTESPPC", []);
            global.dispatchSuccessful("load::PATROCINADORESPPC", []);
            global.dispatchSuccessful("load::COLABORADORESPPC", []);
            this.onCancelModeEdit();
            //Forms.updateFormElement(PAGE_ID, "Fraccionamiento", { ID: -1, Clave: "Seleccione una opción" });
            //Forms.updateFormElement(PAGE_ID, "BuscadorEvento", { ID: -1, Clave: "Seleccione una opción" });
        }

        onChangeModeEdit() {
        }
        onCancelModeEdit() {
            dispatchSuccessful("load::modeEditPPCGeneral", { modeEdit: false }, PAGE_ID)
            dispatchSuccessful("load::entityItemPPC", [], PAGE_ID)

        }

        onSaveEdit() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let Evento = Forms.getValue("EventosSelectPPC", EVENTPPCSELECT)
            let participantes = getData(this.props.PARTICIPANTESPPC);
            let patrocinadores = getData(this.props.PATROCINADORESPPC);
            let colaboradores = getData(this.props.COLABORADORESPPC);
        }
        onBlurCalculate() {


        }
        onChangeValue() {



        }
        onGetEventActppc() {
            let Evento = Forms.getValue("EventosSelectPPC", EVENTPPCSELECT)
            let parametros = global.assign({
                ID: Evento.ID
            })
            dispatchSuccessful("load::modeEditPPCGeneral", { modeEdit: false }, PAGE_ID)

            dispatchSuccessful("load::spin3", { spin3: true }, PAGE_ID)
            console.log(parametros)
            //            dispatchSuccessful("load::entityItemPPC", [{ Id: 1 }], PAGE_ID)
            global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventosActividadesPPC/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        console.log(data)
                        dispatchSuccessful("load::entityItemPPC", [data], PAGE_ID)
                        dispatchSuccessful(`load::${PARTICIPANTES}`, data.Participantes, PAGE_ID);
                        dispatchSuccessful(`load::${COLABORADORES}`, data.Colaboradores, PAGE_ID);
                        dispatchSuccessful(`load::${PATROCINADORES}`, data.Patrocinadores, PAGE_ID);


                        dispatchSuccessful("load::spin3", { spin3: false }, PAGE_ID)
                        if (data.Participantes !== null || data.Patrocinadores !== null || data.Colaboradores !== null) {
                            dispatchSuccessful("load::modeEditPPCGeneral", { modeEdit: true }, PAGE_ID)
                            let countPar = 0;
                            let countCol = 0;
                            let Participantes = data.Participantes.map(x => { return { ...x, entity: PARTICIPANTES, No: countPar++ } })
                            let Patrocinadores = data.Patrocinadores.map(x => { return { ...x, entity: PATROCINADORES } })
                            let Colaboradores = data.Colaboradores.map(x => { return { ...x, entity: COLABORADORES, No: countCol++ } })
                            dispatchSuccessful(`load::${PARTICIPANTES}`, Participantes, PAGE_ID);
                            dispatchSuccessful(`load::${COLABORADORES}`, Colaboradores, PAGE_ID);
                            dispatchSuccessful(`load::${PATROCINADORES}`, Patrocinadores, PAGE_ID);

                            loadFiles({ tipo: "anexos", entityType: PARTICIPANTES, entityId: data.IdEvento, activos: 1 }, "itemsFileParticipantes", "datagroupContainerFilesParticipantes");
                            loadFiles({ tipo: "anexos", entityType: PATROCINADORES, entityId: data.IdEvento, activos: 1 }, "itemsFilePatrocinadores", "datagroupContainerFilesPatrocinadores");
                            loadFiles({ tipo: "anexos", entityType: COLABORADORES, entityId: data.IdEvento, activos: 1 }, "itemsFileColaboradores", "datagroupContainerFilesColaboradores");

                        }

                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        dispatchSuccessful("load::spin3", { spin3: false }, PAGE_ID)
                        break;
                }
            })


        }

        onchangeParticipantes(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.entityItemPPC.data
                onSaveFile(file, PARTICIPANTES, item[0].IdEvento, "SaveitemsFileParticipantes");
            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }
        onchangefilePatrocinadores(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.entityItemPPC.data

                onSaveFile(file, PATROCINADORES, item[0].IdEvento, 'SaveitemsFilePatrocinadores')

            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }
        onchangefileColaboradores(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.entityItemPPC.data

                onSaveFile(file, COLABORADORES, item[0].IdEvento, 'SaveitemsFileColaboradores')

            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }

        inputRef: Element;
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEditPPCGeneral)) {
                isModeEdit = this.props.modeEditPPCGeneral.data.modeEdit;
            }
            let spin;
            if (isSuccessful(EK.Store.getState().global.spin3)) {
                spin = getData(EK.Store.getState().global.spin3).spin3;
            }
            let textTitle = "ALTA DE PARTICIPANTES, PATROCINADORES Y COLABORADORES";
            let icon = "fas fa-users";

            if (isModeEdit) {
                textTitle = "Editar";
                icon = "fa fa-edit";
            }
            let entity;
            let entityId;
            let entityCaptura;
            let entityIdPPC = 0;
            // console.log(this.props.entityItemPPC)
            if (isSuccessful(this.props.entityItemPPC)) {
                entity = getData(this.props.entityItemPPC);
                if (entity.length > 0) {
                    entityId = entity[0].IdEvento;
                   // console.log(entity[0].Participantes, entity[0].Colaboradores, entity[0].Patrocinadores)
                }

            }



            return <div id="">
                <ModalParticipantes />
                <ModalCrudPatrocinadoresPPC />
                <ModalPatrocinadoresPPC />
                <ModalColaboradores />
                <page.OptionSection
                    id={""}
                    subTitle={textTitle}
                    level={5}
                    icon={icon}
                    collapsed={true}>

                    <div id="loadingPPC" style={{ display: 'none' }}>
                        <Updating text="Guardando..." />
                    </div>
                    <Row id="loadedDataPPC">
                        <Column size={[12, 12, 12, 12]}>
                            <page.OptionSection
                                id={""}
                                title={"DATOS DEL EVENTO"}
                                level={2}
                                icon=""
                                collapsed={false}
                                hideCollapseButton={true}
                            >
                                <Row>
                                    <Column size={[12, 12, 12, 12]}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} style={{ paddingBottom: '15px', textAlign: 'right' }}>
                                                {
                                                    !isModeEdit && entityId > 0 ?
                                                        <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                        //<Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload"  style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    isModeEdit && entityId > 0 ?
                                                        <Button id={"btnEdit"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-edit" text={"Editar"} onClick={this.onsave} style={{ marginRight: 5, color, backgroundColor: "#FFD96A" }} />
                                                        //<Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="fa fa-edit"  style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    entityId > 0 ?
                                                        <Button id={"btnCancel"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancelModeEdit} style={{ marginRight: 5, color, backgroundColor: "#F1675E" }} />
                                                        //<Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancelModeEdit} style={{ color }} />
                                                        : null

                                                }
                                            </Column>
                                            <Column size={[12, 12, 12, 12]} style={{ paddingBottom: '15px' }}>
                                                {<ddl.EventosFilterDDL id="EventosSelectPPC" label="Evento" idFormSection={EVENTPPCSELECT} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />}
                                                <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Llenar Campos"} onClick={this.onGetEventActppc} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                {
                                                    spin ?
                                                        <div className="alert alert-info" style={{ marginTop: 20 }}>
                                                            <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                        </div>
                                                        : null

                                                }
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} className=" ">
                                                <Row className="">
                                                    {
                                                        entityId > 0 ?
                                                            <Column size={[12, 12, 12, 12]}>
                                                            </Column>
                                                            : null
                                                    }

                                                </Row>
                                            </Column>
                                        </Row>
                                        {
                                            entityId > 0 ? <div>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} className=" ">
                                                    </Column>
                                                </Row>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} className=" ">
                                                    </Column>
                                                </Row>
                                                <Row style={{ paddingTop: 15 }}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <page.OptionSection
                                                            id={""}
                                                            subTitle={"PARTICIPANTES"}
                                                            level={2}
                                                            icon="fa fa-users"
                                                            collapsed={false}>
                                                            <SectionButtons >
                                                                <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.onModalParticipantes} style={{ marginRight: 5, color }} />
                                                            </SectionButtons >
                                                            <Row >
                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <span><b><i>Doble click sobre fila para editar o eliminar registro</i></b></span>
                                                                    <div id="datagroupContainerParticipantes" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                    </div>
                                                                </Column>
                                                            </Row>
                                                        </page.OptionSection>
                                                    </Column >
                                                </Row>
                                                <Row style={{ paddingTop: 15 }}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <page.OptionSection
                                                            id={""}
                                                            subTitle={"PATROCINADORES"}
                                                            level={2}
                                                            icon="fa fa-users"
                                                            collapsed={false}>
                                                            <SectionButtons >
                                                                <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.onModalPatrocinadores} style={{ marginRight: 5, color }} />
                                                                <Button className={className} titulo="Crear nuevo registro" color={color} rounded={false} iconOnly={true} icon="fa fa-cog" onClick={this.onPatrocinadoresCrud} style={{ marginRight: 5, color }} />
                                                            </SectionButtons >
                                                            <Row >
                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <span><b><i>Doble click sobre fila para editar o eliminar registro</i></b></span>
                                                                    <div id="datagroupContainerPatrocinadores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                    </div>
                                                                </Column>
                                                            </Row>
                                                        </page.OptionSection>
                                                    </Column >
                                                </Row>
                                                <Row style={{ paddingTop: 15 }}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <page.OptionSection
                                                            id={""}
                                                            subTitle={"COLABORADORES"}
                                                            level={2}
                                                            icon="fa fa-users"
                                                            collapsed={false}>
                                                            <SectionButtons >
                                                                <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.onModalColaboradores} style={{ marginRight: 5, color }} />
                                                            </SectionButtons >
                                                            <Row >
                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <span><b><i>Doble click sobre fila para editar o eliminar registro</i></b></span>
                                                                    <div id="datagroupContainerColaboradores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                    </div>
                                                                </Column>
                                                            </Row>
                                                        </page.OptionSection>
                                                    </Column >
                                                </Row>
                                            </div> : null
                                        }

                                    </Column>
                                    {
                                        entityId > 0 ? <div>
                                            <Column size={[12, 12, 12, 12]} >
                                                <page.OptionSection
                                                    id={""}
                                                    subTitle={"ADMINISTRACION DE ARCHIVOS"}
                                                    level={2}
                                                    icon="fa fa-paperclip"
                                                    collapsed={false}>
                                                    <Row style={{}}>
                                                        {
                                                            entityIdPPC === 0 && !isModeEdit ?
                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <div className="alert alert-info" style={{ marginTop: 20, textAlign: 'center' }}>
                                                                        <h4>PARA SUBIR ARCHIVOS ES NECESARIO GUARDAR EL REGISTRO</h4>
                                                                    </div>
                                                                </Column >
                                                                : null
                                                        }
                                                        {
                                                            entityId > 0 && entity[0].Participantes !== null ?
                                                                <Column size={[12, 12, 6, 6]}>

                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"PARTICIPANTES"}
                                                                                    label={"PARTICIPANTES"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangeParticipantes}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesParticipantes" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                </Column>
                                                                : null
                                                        }
                                                        {
                                                            entityId > 0 && entity[0].Patrocinadores !== null ?
                                                                <Column size={[12, 12, 6, 6]}>
                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"PATROCINADORES"}
                                                                                    label={"PATROCINADORES"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangefilePatrocinadores}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesPatrocinadores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                </Column>
                                                                : null
                                                        }
                                                    </Row>
                                                    <Row>
                                                        {
                                                            entityId > 0 && entity[0].Colaboradores !== null ?
                                                                <Column size={[12, 12, 6, 6]}>
                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"COLABORADORES"}
                                                                                    label={"COLABORADORES"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangefileColaboradores}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesColaboradores" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                </Column>
                                                                : null
                                                        }
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                        </div> : null
                                    }

                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>

                </page.OptionSection>
            </div >
        };
    });

    interface IEditState {
        porcentaje: any;
    };
    //========================================================================
    // MODAL PARTICIPANTES
    //========================================================================
    const ModalParticipantes: any = global.connect(class extends React.Component<IEventosActividadesPPC, IEditState>{
        constructor(props) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            // retValue.formValues = [{ name: "", email: "" }]
            retValue.modeEditParticipantes = state.global.modeEditParticipantes;
            retValue.PARTICIPANTESPPC = state.global.PARTICIPANTESPPC;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })

        footerModal(): JSX.Element {
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditParticipantes);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditParticipantes.data.modeEditParticipantes
            }
            return <div className="modal-footer">
                {
                    !isModeEdit ?
                        <div>
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Agregar"} onClick={this.onAddParticipantes} style={{ marginRight: 10, color: 'white', backgroundColor: "#4EC9A2" }} />
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                        : <div>
                            <button type="button" onClick={this.onEdit} className="btn dark btn-outline btn-md yellow" >Editar</button>
                            <button type="button" onClick={this.onRemove} className="btn dark btn-outline btn-md red" data-dismiss="modal">Quitar</button>
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                }
            </div>;
        };
        onEdit() {

            let model = Forms.getValues(PARTICIPANTES)
            let data = getData(EK.Store.getState().global.PARTICIPANTESPPC);
            let row = getData(EK.Store.getState().global.rowData)
            let ApellidoPaterno = $.trim(model.ApePaternoPar)
            let ApellidoMaterno = $.trim(model.ApeMaternoPar)
            let Nombre = $.trim(model.NombrePar)
            let Calle = $.trim(model.CallePar)
            let Numero = $.trim(model.NumeroPar)
            let Telefono = $.trim(model.TelefonoPar)
            let Celular = $.trim(model.CelularPar)
            let Email = $.trim(model.EmailPar)
            let diff = data.filter(x => x.No !== row.No);

            if (Nombre === undefined || Nombre === "") {
                warning("El campo Nombre es obligatorio", "Atención")
                return
            }
            if (ApellidoPaterno === undefined || ApellidoPaterno === "") {
                warning("El campo Apellido Paterno es obligatorio", "Atención")
                return
            }

            if ((Telefono === undefined || Telefono === "") &&
                (Celular === undefined || Celular === "") &&
                (Email === undefined || Email === "")) {
                warning("Se debe llenar al menos uno de estos campos Telefono, Celular o Email", "Atención")
                return
            }
            if (ApellidoPaterno !== undefined || ApellidoPaterno !== '') {
                if (!RegexLetters.test(ApellidoPaterno)) {
                    warning("Favor de solo ingresar letras en el campo Apellido Paterno", "Atención");
                }
            }
            if (ApellidoMaterno !== '') {
                if (!RegexLetters.test(ApellidoMaterno)) {
                    warning("Favor de solo ingresar letras en el campo Apellido Materno", "Atención");
                    return
                }
            }
            if (Nombre !== undefined || Nombre !== '') {
                if (!RegexLetters.test(Nombre)) {
                    warning("Favor de solo ingresar letras en el campo Nombre", "Atención");
                    return
                }
            }

            if (Email !== '') {
                if (!REGEXEMAIL.test(Email)) {
                    warning("El formato del Email es incorrecto, Ejemplo de formato xxxx@xxxx.com", "Atención");
                    return
                }
            }

            let addData = {
                ApellidoPaterno: ApellidoPaterno,
                ApellidoMaterno: ApellidoMaterno,
                Nombre: Nombre,
                Calle: Calle,
                Numero: Numero,
                Telefono: Telefono,
                Celular: Celular,
                Email: Email,
                entity: PARTICIPANTES
            }
            diff.push(addData);
            let counter = 0
            for (let x of diff) {
                counter++
                x.No = counter
            }
            dispatchSuccessful(`load::${PARTICIPANTES}`, diff, PAGE_ID);

            let modal: any = $("#ModalParticipantes");
            modal.modal('hide');
            // onDataTableData("datagroupContainerParticipantes", getData(EK.Store.getState().global.PARTICIPANTESPPC), columnsParticipantes);

        }
        onRemove() {
            let participantes = getData(EK.Store.getState().global.PARTICIPANTESPPC)
            let row = getData(EK.Store.getState().global.rowData)

            let filter = participantes.filter(x => x.No !== row.No)
            console.log(filter)

            dispatchSuccessful(`load::${PARTICIPANTES}`, filter, PAGE_ID);

            Forms.reset(PARTICIPANTES);
        }
        onCancel() {
            dispatchSuccessful("load::modeEditParticipantes", { modeEditParticipantes: false }, PAGE_ID)

            //   Forms.reset(INVITADOSESPECIALES)
        }
        onAddParticipantes() {
            let data = getData(EK.Store.getState().global.PARTICIPANTESPPC)
            console.log(data)
            let model = Forms.getValues(PARTICIPANTES)
            //let ApellidoPaterno = $.trim(model.ApePaternoPar)
            //let ApellidoMaterno = $.trim(model.ApeMaternoPar)
            //let Nombre = $.trim(model.NombrePar)
            //let Calle = $.trim(model.CallePar)
            //let Numero = $.trim(model.NumeroPar)
            //let Telefono = $.trim(model.TelefonoPar)
            //let Celular = $.trim(model.CelularPar)
            //let Email = $.trim(model.EmailPar)
            let hombres = model.Hombre && model.Hombre !== undefined? parseInt( model.Hombre):0;
            let mujeres = model.Mujer && model.Mujer !== undefined ? parseInt(model.Mujer) : 0;
            let ninos = model.Nino && model.Nino !== undefined ? parseInt(model.Nino): 0;
            let amayores = model.AdultoMayor && model.AdultoMayor !== undefined ? parseInt(model.AdultoMayor) : 0;
            let total = hombres + mujeres + ninos + amayores;
            //console.log(model)
            //console.log(hombres)
            //console.log(mujeres)
            //console.log(ninos)
            console.log(total)
            let lista = [{
                hombre: hombres, 
                mujer: mujeres,
                ninos,
                amayores,
                total
            }];
            Forms.updateFormElement(PARTICIPANTES, "TotalP", total);

           

            //if (Nombre === undefined || Nombre === "") {
            //    warning("El campo Nombre es obligatorio", "Atención")
            //    return
            //}
            //if (ApellidoPaterno === undefined || ApellidoPaterno === "") {
            //    warning("El campo Apellido Paterno es obligatorio", "Atención")
            //    return
            //}

            //if ((Telefono === undefined || Telefono === "") &&
            //    (Celular === undefined || Celular === "") &&
            //    (Email === undefined || Email === "")) {
            //    warning("Se debe llenar al menos uno de estos campos Telefono, Celular o Email", "Atención")
            //    return
            //}
            //if (ApellidoPaterno !== undefined || ApellidoPaterno !== '') {
            //    if (!RegexLetters.test(ApellidoPaterno)) {
            //        warning("Favor de solo ingresar letras en el campo Apellido Paterno", "Atención");
            //    }
            //}
            //if (ApellidoMaterno !== "") {
            //    if (!RegexLetters.test(ApellidoMaterno)) {
            //        warning("Favor de solo ingresar letras en el campo Apellido Materno", "Atención");
            //        return
            //    }
            //}
            //if (Nombre !== undefined || Nombre !== '') {
            //    if (!RegexLetters.test(Nombre)) {
            //        warning("Favor de solo ingresar letras en el campo Nombre", "Atención");
            //        return
            //    }
            //}

            //if (Email !== '') {
            //    if (!REGEXEMAIL.test(Email)) {
            //        warning("El formato del Email es incorrecto, Ejemplo de formato xxxx@xxxx.com", "Atención");
            //        return
            //    }
            //}

            //let addData = {
            //    ApellidoPaterno: ApellidoPaterno,
            //    ApellidoMaterno: ApellidoMaterno,
            //    Nombre: Nombre,
            //    Calle: Calle,
            //    Numero: Numero,
            //    Telefono: Telefono,
            //    Celular: Celular,
            //    Email: Email,
            //    entity: PARTICIPANTES
            //}

            //data.push(addData)
            //let counter = 0
            //for (let x of data) {
            //    counter++
            //    x.No = counter
            //}
            //console.log(data)
            dispatchSuccessful(`load::${PARTICIPANTES}`, lista, PAGE_ID);
            onDataTableData("datagroupContainerParticipantes", lista , columnsParticipantes);
            //Forms.reset(PARTICIPANTES)
            success("Se agregaron correctamente", "Exito");

        }

        changeInputsValue() {

        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            //controlpoint
            //let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            //if (allowEdit) {
            //    isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores
            //}
            let total = 0;
            return <modal.Modal id="ModalParticipantes" header={"PARTICIPANTES"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <input.Integer id="Hombre" label="Hombre" idFormSection={PARTICIPANTES} size={[12, 12, 2, 2]}  />
                        <input.Integer id="Mujer" label="Mujer" idFormSection={PARTICIPANTES} size={[12, 12, 2, 2]}  />
                        <input.Integer id="Nino" label="Niño" idFormSection={PARTICIPANTES} size={[12, 12, 2, 2]} />
                        <input.Integer id="AdultoMayor" label="Adulto Mayor" idFormSection={PARTICIPANTES} size={[12, 12, 2, 2]} />
                        <label.Label id="TotalP" idForm={PARTICIPANTES} label="Total"  size={[12, 12, 4, 4]} />

                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // MODAL CRUD PATROCINADORES
    //========================================================================
    const ModalCrudPatrocinadoresPPC: any = global.connect(class extends React.Component<IEventosActividadesPPC, IEditState>{
        constructor(props) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditPatrocinadores = state.global.modeEditPatrocinadores;
            // retValue.formValues = [{ name: "", email: "" }]
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })

        footerModal(): JSX.Element {
            let isModeEdit;
            if (isSuccessful(EK.Store.getState().global.modeEditPatrocinadores)) {
                isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores;
            }
            let title = isModeEdit ? "Editar" : "Guardar"
            return <div className="modal-footer">
                <Button id={"btnAdd"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text={title} icon="fa fa-plus" onClick={this.onPatrocinadoresCrud} style={{ color: 'white', backgroundColor: "#36C6D3" }} />
                {
                    isModeEdit ? <Button id={"btnDelete"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Eliminar" icon="fa fa-trash" onClick={this.onPatrocinadoresCrudDelete} style={{ color: 'white', backgroundColor: "#F1675E" }} />
                        : null
                }
                {isModeEdit ? <Button id={"btnCancel"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Cancelar" icon="fa fa-times" onClick={this.onCancel} style={{ color: 'white', backgroundColor: "#FFD96A" }} />
                    : null
                }
                <button type="button" className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onPatrocinadoresCrud() {
            let model = Forms.getValues(PATROCINADORESCRUD)
            let Nombre = $.trim(model.NombreCrud);
            let RazonSocial = $.trim(model.RazonSocialCrud);
            let Calle = $.trim(model.CalleCrud);
            let Numero = $.trim(model.NumeroCrud);
            let Telefono = $.trim(model.TelefonoCrud);
            let Celular = $.trim(model.CelularCrud);
            let Email = $.trim(model.EmailCrud);

            let row = getData(EK.Store.getState().global.itemDataPatrocinadores);
            let idPatrocinador;
            let Operacion = 'INSERT';
            let NombreOld;
            let allewEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            if (allewEdit) {
                let modeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores;
                if (modeEdit) {
                    idPatrocinador = row.Id;
                    Operacion = 'UPDATE';
                    NombreOld = row.Nombre
                }
            }
            if (Nombre === null || Nombre === undefined || Nombre === "") {
                warning("El campo Nombre es obligatorio", "Atención");
                return;
            }
            if (Email !== '') {
                if (!REGEXEMAIL.test(Email)) {
                    warning("El formato del Email es incorrecto, Ejemplo de formato xxxx@xxxx.com", "Atención");
                    return
                }
            }

            let parametros = global.assign({
                ID: idPatrocinador,
                NOMBRE: Nombre,
                RAZONSOCIAL: RazonSocial,
                CALLE: Calle,
                NUMERO: Numero,
                TELEFONO: Telefono,
                CELULAR: Celular,
                EMAIL: Email,
                NOMBREOLD: NombreOld,
                OPERACION: Operacion,
            });
            global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::savePatrocinadores", { Save: true }, PAGE_ID)
                            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID);
                            success(data[0].msg, "Exito");
                            Forms.reset(PATROCINADORESCRUD)
                        } else {
                            warning(data[0].msg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            })
        }
        onPatrocinadoresCrudDelete() {
            EK.Global.confirm("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
                dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID);
                let row = getData(EK.Store.getState().global.itemDataPatrocinadores);
                let parametros = global.assign({
                    ID: row.Id,
                    OPERACION: 'DELETE'
                });
                global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            if (data[0].code === 0) {
                                dispatchSuccessful("load::savePatrocinadores", { Save: true }, PAGE_ID)
                                dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID);
                                success(data[0].msg, "Exito");
                                Forms.reset(PATROCINADORESCRUD)
                            } else {
                                warning(data[0].msg, "Aviso");
                            }
                            break;
                        case AsyncActionTypeEnum.loading:
                            break;
                        case AsyncActionTypeEnum.failed:
                            break;
                    }
                })
            });
        }
        onCancel() {
            Forms.reset(PATROCINADORESCRUD);
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEmodeEditPatrocinadoresditPA: false }, PAGE_ID);
        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(EK.Store.getState().global.modeEditPatrocinadores)) {
                isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores;
            }
            return <modal.Modal id="ModalPatrocinadoresCrudPPC" header={"Catalogo Patrocinadores"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row >
                    <Column size={[12, 12, 12, 12]}>
                        <input.Text id="NombreCrud" label="Nombre" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} />
                        <input.Text id="RazonSocialCrud" label="Razón Social" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} />
                        <input.Text id="CalleCrud" label="Calle" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} />
                        <input.Text id="NumeroCrud" label="Número" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} />
                        <input.Telefono2 id="TelefonoCrud" label="Teléfono" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true}/>
                        <input.Telefono id="CelularCrud" label="Celular" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} />
                        <input.Email id="EmailCrud" label="Email" idFormSection={PATROCINADORESCRUD} size={[12, 12, 4, 4]} />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <span><b><i><small>Doble click sobre fila para editar o eliminar registro</small></i></b></span>
                        <div id="datagroupContainerPatrocinadoresCrudPPC" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // MODAL PATROCINADORES
    //========================================================================
    const ModalPatrocinadoresPPC: any = global.connect(class extends React.Component<IEventosActividadesPPC, IEditState>{
        constructor(props) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            // retValue.formValues = [{ name: "", email: "" }]
            retValue.modeEditPatrocinadores = state.global.modeEditPatrocinadores;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        onPatrocinadores() {
            let patrocinador = Forms.getValue("PatrocinadorPPC", PATROCINADORES);
            dispatchSuccessful("load::missingInfo", { missingInfo: false }, PAGE_ID);

            //console.log(patrocinador)
            if (patrocinador.Telefono === null && patrocinador.Celular === null && patrocinador.Email === null) {
                dispatchSuccessful("load::missingInfo", { missingInfo: true }, PAGE_ID);
                Forms.updateFormElement(PATROCINADORES, "TelefonoPat", patrocinador.Telefono);
                Forms.updateFormElement(PATROCINADORES, "CelularPat", patrocinador.Celular);
                Forms.updateFormElement(PATROCINADORES, "EmailPat", patrocinador.Email);

                warning("Para seleccionar el patrocinador es necesario llenar al menos uno de estos campos, Teléfono, Celular, Email", "Atención")
                return;
            }

            let data = getData(EK.Store.getState().global.PATROCINADORESPPC);

            if (data.length > 0) {
                let existe = data.filter(x => x.ID === patrocinador.ID);
                if (existe.length > 0) {
                    warning("El patrocinador ya fue agregado", "Atención");
                    return;
                }
            }

            let addData = {
                ID: patrocinador.ID,
                Nombre: patrocinador.Nombre,
                RazonSocial: patrocinador.RazonSocial,
                Calle: patrocinador.Calle,
                Numero: patrocinador.Numero,
                Telefono: patrocinador.Telefono,
                Celular: patrocinador.Celular,
                Email: patrocinador.Email,
                entity: PATROCINADORES
            }
            data.push(addData)

            dispatchSuccessful(`load::${PATROCINADORES}`, data, PAGE_ID);
            success("Se agrego correctamente", "Exito");

            //onDataTableData("datagroupContainerPatrocinadores", getData(EK.Store.getState().global.PATROCINADORESPPC), columnsPatrocinadores);
            Forms.reset(PATROCINADORES);
        }
        footerModal(): JSX.Element {
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores
            }
            let missingInfo;
            let missing = isSuccessful(EK.Store.getState().global.missingInfo);
            if (missing) {
                missingInfo = EK.Store.getState().global.missingInfo.data.missingInfo
            }
            return <div className="modal-footer">
                {
                    !isModeEdit ?
                        <div>
                            {
                                !missingInfo ?
                                <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Agregar"} onClick={this.onPatrocinadores} style={{ marginRight: 10, color: 'white', backgroundColor: "#4EC9A2" }} />
                                    : null

                            }
                                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                        : <div>
                            <button type="button" onClick={this.onEdit} className="btn dark btn-outline btn-md yellow" >Editar</button>
                            <button type="button" onClick={this.onRemove} className="btn dark btn-outline btn-md red" data-dismiss="modal">Quitar</button>
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                }
            </div>;
        };
        onUpdateInfo() {
            let Telefono = Forms.getValue("TelefonoPat", PATROCINADORES)
            let Celular = Forms.getValue("CelularPat", PATROCINADORES)
            let Email = $.trim(Forms.getValue("EmailPat", PATROCINADORES))
            let patrocinador = Forms.getValue("PatrocinadorPPC", PATROCINADORES);

            console.log(Telefono, Celular, Email)
            if (Telefono === null && Celular === null && Email === '') {
                warning("Debe de llenar al menos un campo", "Ateción");
                return
            }
            if (Email !== '') {
                if (!REGEXEMAIL.test(Email)) {
                    warning("El formato del Email es incorrecto, Ejemplo de formato xxxx@xxxx.com", "Atención");
                    return
                }
            }
            let parametros = global.assign({
                ID: patrocinador.ID,
                TELEFONO: Telefono,
                Celular: Celular,
                EMAIL: Email,
                OPERACION: "UPDATETCE"
            })
            global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::missingInfo", { missingInfo: false }, PAGE_ID);
                            dispatchSuccessful("load::savePatrocinadores", { Save: true }, PAGE_ID)
                            Forms.reset(PATROCINADORES)
                            success(data[0].msg, "Exito");
                        } else {
                            warning(data[0].msg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            })
        }
        onEdit() {
            let patrocinador = Forms.getValue("PatrocinadorPPC", PATROCINADORES);
            dispatchSuccessful("load::missingInfo", { missingInfo: false }, PAGE_ID);

            if (patrocinador.Telefono === null && patrocinador.Celular === null && patrocinador.Email === null) {
                dispatchSuccessful("load::missingInfo", { missingInfo: true }, PAGE_ID);
                Forms.updateFormElement(PATROCINADORES, "TelefonoPat", patrocinador.Telefono);
                Forms.updateFormElement(PATROCINADORES, "CelularPat", patrocinador.Celular);
                Forms.updateFormElement(PATROCINADORES, "EmailPat", patrocinador.Email);

                warning("Para seleccionar el patrocinador es necesario llenar al menos uno de estos campos, Telefono, Celular, Email", "Atención")
                return;
            }

            let data = getData(EK.Store.getState().global.PATROCINADORESPPC);
            let row = getData(EK.Store.getState().global.rowData);

            let diff = data.filter(x => x.ID !== row.ID);
            if (diff.length > 0) {
                let existe = data.filter(x => x.ID === patrocinador.ID);
                if (existe.length > 0) {
                    warning("El patrocinador ya fue agregado", "Atención");
                    return;
                }
            }

            let addData = {
                ID: patrocinador.ID,
                Nombre: patrocinador.Nombre,
                RazonSocial: patrocinador.RazonSocial,
                Calle: patrocinador.Calle,
                Numero: patrocinador.Numero,
                Telefono: patrocinador.Telefono,
                Celular: patrocinador.Celular,
                Email: patrocinador.Email,
                entity: PATROCINADORES
            }
            diff.push(addData)

            dispatchSuccessful(`load::${PATROCINADORES}`, diff, PAGE_ID);

            // onDataTableData("datagroupContainerPatrocinadores", getData(EK.Store.getState().global.PATROCINADORESPPC), columnsPatrocinadores);
            let modal: any = $("#ModalPatrocinadoresPPC");
            modal.modal('hide');

        }
        onRemove() {
            let patrocinadores = getData(EK.Store.getState().global.PATROCINADORESPPC)
            let row = getData(EK.Store.getState().global.rowData)

            let filter = patrocinadores.filter(x => x.ID !== row.ID)
            console.log(filter)

            dispatchSuccessful(`load::${PATROCINADORES}`, filter, PAGE_ID);

            Forms.reset(PATROCINADORES);
        }
        onCancel() {
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID)
            //   Forms.reset(INVITADOSESPECIALES)
        }
        onChange() {
            Forms.reset(PATROCINADORES);
            dispatchSuccessful("load::missingInfo", { missingInfo: false }, PAGE_ID);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            let missingInfo
            //let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            //if (allowEdit) {
            //    isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores
            //}

            let missing = isSuccessful(EK.Store.getState().global.missingInfo);
            if (missing) {
                missingInfo = EK.Store.getState().global.missingInfo.data.missingInfo
            }

            return <modal.Modal id="ModalPatrocinadoresPPC" header={"PATROCINADORES"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <ddl.Patrocinadores id="PatrocinadorPPC" label="PATROCINADOR" onChange={() => { this.onChange }} idFormSection={PATROCINADORES} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                        {
                            missingInfo ? <div>
                                <input.Telefono id="TelefonoPat" label="Teléfono" idFormSection={PATROCINADORES} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                <input.Telefono id="CelularPat" label="Celular" idFormSection={PATROCINADORES} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                <input.Email id="EmailPat" label="Email" idFormSection={PATROCINADORES} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                <Column size={[12, 12, 4, 4]} style={{ padding: 10 }}>
                                    <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-floppy-o" text={"Guardar"} onClick={this.onUpdateInfo} style={{ marginRight: 10, color: 'white', backgroundColor: "#4EC9A2" }} />
                                    <Button id={"btnCancel"} className={"btn btn-danger"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onChange} style={{ marginRight: 10, color: 'white', backgroundColor: "#F1675E" }} />
                                </Column>
                            </div> :
                                null
                        }


                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // MODAL COLABORADORES
    //========================================================================
    const ModalColaboradores: any = global.connect(class extends React.Component<IEventosActividadesPPC, IEditState>{
        constructor(props) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            // retValue.formValues = [{ name: "", email: "" }]
            // retValue.modeEditPatrocinadores = state.global.modeEditPatrocinadores;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        onAddColaborador() {
            let model = Forms.getValues(COLABORADORES)
            let data = getData(EK.Store.getState().global.COLABORADORESPPC);
            let NoEmpleado = $.trim(model.NumEmpleadoCol);
            let ApellidoPaterno = $.trim(model.ApePaternoCol);
            let ApellidoMaterno = $.trim(model.ApeMaternoCol);
            let Nombre = $.trim(model.NombreCol);
            let Email = $.trim(model.EmailCol);
            let Puesto = $.trim(model.PuestoCol);
            let Staff = model.StaffCol;
            let Participante = model.ParticipanteCol;
            console.log(model)
            if (data.length > 0) {
                let filter = data.filter(x => x.NoEmpleado === model.NumEmpleadoCol);
                if (filter.length > 0) {
                    warning("El Número de empleado ya fue agregado", "Atención");
                    return
                }
            }

            if (NoEmpleado === undefined || NoEmpleado === '') {
                warning("El campo No. Empleado es obligatorio", "Atención");
                return
            }
            if (Nombre === undefined || Nombre === '') {
                warning("El campo Nombre es obligatorio", "Atención");
                return
            }
            if (ApellidoPaterno === undefined || ApellidoPaterno === '') {
                warning("El campo Apellido Paterno es obligatorio", "Atención");
                return
            }

            if (!RegexLetters.test(Nombre)) {
                warning("Favor de ingresar solo letras en el campo Nombre", "Atención");
                return
            }
            if (!RegexLetters.test(ApellidoPaterno)) {
                warning("Favor de ingresar solo letras en el campo Apellido Paterno", "Atención");
                return
            }
            if (ApellidoMaterno !== '') {
                if (!RegexLetters.test(ApellidoMaterno)) {
                    warning("Favor de ingresar solo letras en el campo Apellido Materno", "Atención");
                    return
                }
            }
            if (Puesto !== '') {
                if (!RegexLetters.test(Puesto)) {
                    warning("Favor de ingresar solo letras en el campo Puesto", "Atención");
                    return
                }
            }
            if (Email !== '') {
                if (!REGEXEMAIL.test(Email)) {
                    warning("El formato del Email es incorrecto, Ejemplo de formato xxxx@xxxx.com", "Atención");
                    return
                }
            }

            if (!Staff && !Participante) {
                warning("Debe seleccionar al menos una opcion en Staff o Participante", "Atención");
                return
            }

            let addData = {
                NoEmpleado,
                ApellidoPaterno,
                ApellidoMaterno,
                Nombre,
                Email,
                Puesto,
                Staff,
                Participante,
                entity: COLABORADORES
            }

            data.push(addData)
            let counter = 0
            for (let x of data) {
                counter++
                x.No = counter
            }
            dispatchSuccessful("load::COLABORADORESPPC", data, PAGE_ID)
            success("Se agrego correctamente", "Exito");

            //onDataTableData("datagroupContainerColaboradores", getData(EK.Store.getState().global.COLABORADORESPPC), columnsColaboradores);
            Forms.reset(COLABORADORES);
        }
        footerModal(): JSX.Element {
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditColaboradores);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditColaboradores.data.modeEditColaboradores
            }
            return <div className="modal-footer">
                {
                    !isModeEdit ?
                        <div>
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Agregar"} onClick={this.onAddColaborador} style={{ marginRight: 10, color: 'white', backgroundColor: "#4EC9A2" }} />
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                        : <div>
                            <button type="button" onClick={this.onEdit} className="btn dark btn-outline btn-md yellow">Editar</button>
                            <button type="button" onClick={this.onRemove} className="btn dark btn-outline btn-md red" data-dismiss="modal">Quitar</button>
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                }
            </div>;
        };
        onEdit() {
            let model = Forms.getValues(COLABORADORES)
            let data = getData(EK.Store.getState().global.COLABORADORESPPC);
            let row = getData(EK.Store.getState().global.rowData);
            let NoEmpleado = $.trim(model.NumEmpleadoCol);
            let ApellidoPaterno = $.trim(model.ApePaternoCol);
            let ApellidoMaterno = $.trim(model.ApeMaternoCol);
            let Nombre = $.trim(model.NombreCol);
            let Email = $.trim(model.EmailCol);
            let Puesto = $.trim(model.PuestoCol);
            let Staff = model.StaffCol;
            let Participante = model.ParticipanteCol;

            let diff = data.filter(x => x.No !== row.No);

            if (NoEmpleado === undefined || NoEmpleado === '') {
                warning("El campo No. Empleado es obligatorio", "Atención");
                return
            }
            if (Nombre === undefined || Nombre === '') {
                warning("El campo Nombre es obligatorio", "Atención");
                return
            }
            if (ApellidoPaterno === undefined || ApellidoPaterno === '') {
                warning("El campo Apellido Paterno es obligatorio", "Atención");
                return
            }

            if (!RegexLetters.test(Nombre)) {
                warning("Favor de ingresar solo letras en el campo Nombre", "Atención");
                return
            }
            if (!RegexLetters.test(ApellidoPaterno)) {
                warning("Favor de ingresar solo letras en el campo Apellido Paterno", "Atención");
                return
            }
            if (ApellidoMaterno !== '') {
                if (!RegexLetters.test(ApellidoMaterno)) {
                    warning("Favor de ingresar solo letras en el campo Apellido Materno", "Atención");
                    return
                }
            }
            if (Puesto !== '') {
                if (!RegexLetters.test(Puesto)) {
                    warning("Favor de ingresar solo letras en el campo Puesto", "Atención");
                    return
                }
            }
            if (Email !== '') {
                if (!REGEXEMAIL.test(Email)) {
                    warning("El formato del Email es incorrecto, Ejemplo de formato xxxx@xxxx.com", "Atención");
                    return
                }
            }

            if (!Staff && !Participante) {
                warning("Debe seleccionar al menos una opcion en Staff o Participante", "Atención");
                return
            }
            let addData = {
                NoEmpleado,
                ApellidoPaterno,
                ApellidoMaterno,
                Nombre,
                Email,
                Puesto,
                Staff,
                Participante,
                entity: COLABORADORES
            }
            //let addData = {
            //    NoEmpleado: model.NumEmpleadoCol,
            //    ApellidoPaterno: model.ApePaternoCol,
            //    ApellidoMaterno: model.ApeMaternoCol,
            //    Nombre: model.NombreCol,
            //    Email: model.EmailCol,
            //    Puesto: model.PuestoCol,
            //    Staff: model.StaffCol,
            //    Participante: model.ParticipanteCol,
            //    entity: COLABORADORES
            //}

            diff.push(addData)
            let counter = 0
            for (let x of diff) {
                counter++
                x.No = counter
            }
            dispatchSuccessful("load::COLABORADORESPPC", diff, PAGE_ID)


            //onDataTableData("datagroupContainerColaboradores", getData(EK.Store.getState().global.COLABORADORESPPC), columnsColaboradores);

            let modal: any = $("#ModalColaboradoresPPC");
            modal.modal('hide');

        }
        onRemove() {
            let colaboradores = getData(EK.Store.getState().global.COLABORADORESPPC)
            let row = getData(EK.Store.getState().global.rowData)

            let filter = colaboradores.filter(x => x.No !== row.No)
            console.log(filter)

            dispatchSuccessful(`load::${COLABORADORES}`, filter, PAGE_ID);

            Forms.reset(PATROCINADORES);
        }
        onCancel() {
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID)
            //   Forms.reset(INVITADOSESPECIALES)
        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            //let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            //if (allowEdit) {
            //    isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores
            //}
            return <modal.Modal id="ModalColaboradoresPPC" header={"COLABORADORES"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <input.Integer id="NumEmpleadoCol" label="No. Empleado" idFormSection={COLABORADORES} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                        <input.Text id="NombreCol" label="Nombre" idFormSection={COLABORADORES} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                        <input.Text id="ApePaternoCol" label="Apellido Paterno" idFormSection={COLABORADORES} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                        <input.Text id="ApeMaternoCol" label="Apellido Materno" idFormSection={COLABORADORES} size={[12, 12, 4, 4]}  />
                        <input.Text id="EmailCol" label="Email" idFormSection={COLABORADORES} size={[12, 12, 4, 4]}  />
                        <input.Text id="PuestoCol" label="Puesto" idFormSection={COLABORADORES} size={[12, 12, 4, 4]}  />
                        <checkBox.CheckBox id={"StaffCol"} idFormSection={COLABORADORES} label={"STAFF"} size={[12, 12, 3, 3]} />
                        <checkBox.CheckBox id={"ParticipanteCol"} idFormSection={COLABORADORES} label={"Participante"} size={[12, 12, 3, 3]}/>

                    </Column>
                </Row>
            </modal.Modal>
        };
    });
};
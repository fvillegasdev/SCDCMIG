namespace EK.Modules.SCV.Pages.postventa.RUBA.EventosActividades {
    "use strict";
    const PAGE_ID = "EventosActividades";
    const PAGE_ID_CAPTURA = "EventosActividadesCaptura";
    const PATROCINADORES = "Patrocinadores"
    const GASTOSTOTALESSDC = "GASTOSTOTALESSDC";
    const EVENTOEVIDENCIASSDC = "EVENTOEVIDENCIASSDC";
    const EVENTOINSUMOSSDC = "EVENTOINSUMOSSDC";
    const UBICACIONSDC = "UBICACIONSDC";
    const SECCION = "EventosActividadesCaptura"
    const SECCIONPATROCINADORESADD = "SECCIONPATROCINADORESADD"
    const SECCIONPATROCINADORES = "SECCIONPATROCINADORES"
    const FILEGASTOSTOTALES = "FILEGASTOSTOTALES"
    const FILEEVIDENCIAS = "FILEEVIDENCIAS"
    const EVENTSELECT = "EVENTSELECT";
    export const DEFAULT_FILE_SIZE: number = 16777216;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [EVENTSELECT, SECCION, PATROCINADORES, SECCIONPATROCINADORES, FILEGASTOSTOTALES, PAGE_ID_CAPTURA, SECCIONPATROCINADORESADD]);

    export const getFileExtension: (filename: string) => string = (filename: string): string => {
        if (!filename) return "";
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    };

    export const getFormatBytes: (bytes: number, precision: number) => string = (bytes: number = 0, precision: number = 2): string => {
        if (isNaN(bytes) || !isFinite(bytes)) return "0 Bytes";

        let unit = 0;
        let units: string[] = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(precision) + " " + units[unit];
    };
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
                    EK.Global.confirm("¿Esta seguro de eliminar el archivo?", "Eliminar", () => {
                        let model = EK.Global.assign({}, {
                            ID: event.data.ID,
                            EntityId: event.data.EntityId,
                            EntityType: event.data.EntityType,
                            Tipo: event.data.Tipo,
                            Uid: event.data.Uid
                        });
                        if (event.data.EntityType === GASTOSTOTALESSDC) {
                            removeFile(model, 'SaveitemsFileGT');
                        }
                        if (event.data.EntityType === EVENTOEVIDENCIASSDC) {
                            removeFile(model, 'SaveitemsFileEvidencias');
                        }
                        if (event.data.EntityType === EVENTOINSUMOSSDC) {
                            removeFile(model, 'SaveitemsFileInsumos');
                        }
                        if (event.data.EntityType === UBICACIONSDC) {
                            removeFile(model, 'SaveitemsFileUbicaciones');
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
    const loadFiles = (parametros, state, initTable) => {
        let encodedFilters: string = global.encodeObject(parametros);
        global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
            dispatchSuccessful(`load::${state}`, data, PAGE_ID);
            onDataTableFiles(initTable, data);
        });
    }
    interface IEventosActividadesCaptura extends page.IProps {
        modeEditCapturaGeneral?: any,
        Catpatrocinadores?: any,
        PorcentajesGastos?: any,
        loadPatrocinadores?: (data: any) => void,
        entityGastosTotales?: any
        entityTypeGastosTotales?: any,
        entityEvidencias?: any
        entityTypeEvidencias?: any,
        entityInsumos?: any
        entityTypeInsumos?: any,
        entityUbicacionEvento?: any
        entityTypeUbicacionEvento?: any,
        entityItemCaptura?: any,
        modeEditPatrocinadores?: any
        savePatrocinadores?: any
        loadCatPatrocinadores?: () => void,
        idForm: string,
        itemEventoCapturaLoad?: any,
        modeEditPatrocinador?: any,
        SaveitemsFileGT: any,
        SaveitemsFileEvidencias: any,
        SaveitemsFileInsumos: any,
        SaveitemsFileUbicaciones: any,
        itemsFileGTLoad?: (parametros, state, initTable) => void,
        Especie?: any
    };
    interface IFieldsEditorState {
        file: EK.UX.Kontrol.File;
    }
    //========================================================================
    // CAPTURA EVENTO
    //=========================================================================
    export const CapturaEvento: any = global.connect(class extends React.Component<IEventosActividadesCaptura, IFieldsEditorState>{
        constructor(props) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onSaveEdit = this.onSaveEdit.bind(this);
            //   this.onSaveFile = this.onSaveFile.bind(this);
            this.state = { file: new EK.UX.Kontrol.File(null) }
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditCapturaGeneral = state.global.modeEditCapturaGeneral;
            retValue.Catpatrocinadores = state.global.Catpatrocinadores;
            retValue.PorcentajesGastos = state.global.PorcentajesGastos;
            retValue.entityItemCaptura = state.global.entityItemCaptura
            retValue.itemEventoCapturaLoad = state.global.itemEventoCapturaLoad
            retValue.savePatrocinadores = state.global.savePatrocinadores
            retValue.SaveitemsFileGT = state.global.SaveitemsFileGT
            retValue.SaveitemsFileEvidencias = state.global.SaveitemsFileEvidencias
            retValue.SaveitemsFileInsumos = state.global.SaveitemsFileInsumos
            retValue.SaveitemsFileUbicaciones = state.global.SaveitemsFileUbicaciones

            return retValue;
        };
        //shouldComponentUpdate(nextProps: IEventosActividadesCaptura, { }): boolean {
        //    return hasChanged(this.props.SaveitemsFileGT, nextProps.SaveitemsFileGT) ||
        //        hasChanged(this.props.modeEditCapturaGeneral, nextProps.modeEditCapturaGeneral) ||
        //        hasChanged(this.props.Catpatrocinadores, nextProps.Catpatrocinadores)||
        //        hasChanged(this.props.PorcentajesGastos, nextProps.PorcentajesGastos)||
        //        hasChanged(this.props.entityItemCaptura, nextProps.entityItemCaptura)||
        //        hasChanged(this.props.savePatrocinadores, nextProps.savePatrocinadores)||
        //        hasChanged(this.props.itemsFileEvidencias, nextProps.itemsFileEvidencias)||
        //        hasChanged(this.props.itemsFileEvidencias, nextProps.itemsFileEvidencias)||
        //        hasChanged(this.props.itemsFileInsumos, nextProps.itemsFileInsumos)||
        //        hasChanged(this.props.itemsFileUbicaciones, nextProps.itemsFileUbicaciones)

        //};
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            loadPatrocinadores: (data: any): void => {
                let dataGrid = $("#datagroupContainerPatrocinadores").dxDataGrid({
                    dataSource: data,
                    onRowPrepared: function (event) {
                        $(event.rowElement).on('dblclick', function () {
                            dispatchSuccessful("load::itemPatrocinadores", event.data, PAGE_ID);
                            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: true }, PAGE_ID)
                            console.log(event.data)
                            Forms.updateFormElement(SECCIONPATROCINADORESADD, "Patrocinador", { ID: event.data.IdPatrocinador, Nombre: event.data.Patrocinador });
                            Forms.updateFormElement(SECCIONPATROCINADORESADD, "CantidadP", event.data.Cantidad);
                            Forms.updateFormElement(SECCIONPATROCINADORESADD, "Especie", event.data.Especie);
                            Forms.updateFormElement(SECCIONPATROCINADORESADD, "TipoEspecie", event.data.TipoEspecie);
                            let modal: any = $("#ModalPatrocinadores");
                            modal.modal();
                        }).on('remove', function () {
                            //on remove event in jquery ui libraries or 
                            $(this).off('dblclick remove');
                        })
                    },
                    sorting: {
                        mode: "multiple" // or "multiple" | "none"
                    },
                    columnAutoWidth: true,
                    showBorders: false,
                    paging: {
                        pageSize: 5
                    },
                    columns: [
                        { caption: "Id", dataField: "IdPatrocinador", alignment: 'center' },
                        { caption: "Patrocinador", dataField: "Patrocinador", alignment: 'center' },
                        {
                            caption: "Cantidad", dataField: "Cantidad", alignment: 'center', dataType: 'number',
                            format: {
                                type: 'currency',
                                precision: 2,
                                currency: 'USD'
                            } },
                        { caption: "Porcentaje", dataField: "Porcentaje", alignment: 'right' },
                        { caption: "Especie", dataField: "Especie", alignment: 'center' },
                        { caption: "Tipo Especie", dataField: "TipoEspecie", alignment: 'center' },

                    ],
                    summary: {
                        totalItems: [{
                            name: 'SelectedRowsSummary',
                            showInColumn: 'Porcentaje',
                            displayFormat: 'Total de Porcentaje: {0}%',
                            summaryType: 'custom',
                        },
                        ],
                        calculateCustomSummary(options) {
                            if (options.summaryProcess === 'start') {
                                options.totalValue = 0;
                            }
                            if (options.summaryProcess === 'calculate') {
                                let value = options.value.Porcentaje.replace("%", "")
                                options.totalValue += +value;

                            }
                        },
                    },
                    showColumnLines: false,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    selection: {
                        mode: "single"
                    },
                }).dxDataGrid("instance");

            },
            loadCatPatrocinadores: () => {
                // console.log("initdispatch")

                let parametros = global.assign({
                    OPERACION: "SELECT"
                })
                global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            dispatchSuccessful("load::Catpatrocinadores", data, PAGE_ID)
                            let dataGrid2 = $("#datagroupContainerPatrocinadoresCrud").dxDataGrid({
                                dataSource: data,
                                onRowPrepared: function (event) {
                                    $(event.rowElement).on('dblclick', function () {
                                        console.log("dispatch")
                                        dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: true }, PAGE_ID);
                                        dispatchSuccessful("load::itemDataPatrocinadores", event.data, PAGE_ID);
                                        Forms.updateFormElement(SECCIONPATROCINADORES, "NombrePatrocinador", event.data.Nombre)
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
            itemsFileGTLoad: (parametros, state, initTable) => {
                let encodedFilters: string = global.encodeObject(parametros);
                global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
                    dispatchSuccessful(`load::${state}`, data, PAGE_ID);
                    onDataTableFiles(initTable, data);
                });
            }
        })
        componentWillReceiveProps(nextProps: IEventosActividadesCaptura): void {
            if (hasChanged(this.props.PorcentajesGastos, nextProps.PorcentajesGastos) && global.isSuccessful(nextProps.PorcentajesGastos)) {
                if (isSuccessful(nextProps.PorcentajesGastos)) {
                    let data: any = global.getData(nextProps.PorcentajesGastos);
                    //  console.log(data)
                    this.props.loadPatrocinadores(data)
                };
            };
            if (hasChanged(this.props.savePatrocinadores, nextProps.savePatrocinadores) && global.isSuccessful(nextProps.savePatrocinadores)) {
                if (isSuccessful(nextProps.savePatrocinadores)) {
                    let data: any = global.getData(nextProps.savePatrocinadores);
                    this.props.loadCatPatrocinadores();
                };
            };
            if (hasChanged(this.props.SaveitemsFileGT, nextProps.SaveitemsFileGT) && global.isSuccessful(nextProps.SaveitemsFileGT)) {
                if (isSuccessful(nextProps.SaveitemsFileGT)) {
                    if (isSuccessful(EK.Store.getState().global.itemEventoCapturaLoad)) {
                        let evento = EK.Store.getState().global.itemEventoCapturaLoad.data;
                        //      console.log(evento)
                        this.props.itemsFileGTLoad({ tipo: "anexos", entityType: GASTOSTOTALESSDC, entityId: evento.ID, activos: 1 }, "itemsFileGT", "datagroupContainerFilesGastosTotales")
                    }

                };
            };
            if (hasChanged(this.props.SaveitemsFileEvidencias, nextProps.SaveitemsFileEvidencias) && global.isSuccessful(nextProps.SaveitemsFileEvidencias)) {
                if (isSuccessful(nextProps.SaveitemsFileEvidencias)) {
                    if (isSuccessful(EK.Store.getState().global.itemEventoCapturaLoad)) {
                        let evento = EK.Store.getState().global.itemEventoCapturaLoad.data;
                        // console.log(evento)
                        this.props.itemsFileGTLoad({ tipo: "anexos", entityType: EVENTOEVIDENCIASSDC, entityId: evento.ID, activos: 1 }, "itemsFileEvidencias", "datagroupContainerFilesEvidencias")
                    }
                };
            };
            if (hasChanged(this.props.SaveitemsFileInsumos, nextProps.SaveitemsFileInsumos) && global.isSuccessful(nextProps.SaveitemsFileInsumos)) {
                if (isSuccessful(nextProps.SaveitemsFileInsumos)) {
                    if (isSuccessful(EK.Store.getState().global.itemEventoCapturaLoad)) {
                        let evento = EK.Store.getState().global.itemEventoCapturaLoad.data;
                        // console.log(evento)
                        this.props.itemsFileGTLoad({ tipo: "anexos", entityType: EVENTOINSUMOSSDC, entityId: evento.ID, activos: 1 }, "itemsFileInsumos", "datagroupContainerFilesInsumos")
                    }
                };
            };
            if (hasChanged(this.props.SaveitemsFileUbicaciones, nextProps.SaveitemsFileUbicaciones) && global.isSuccessful(nextProps.SaveitemsFileUbicaciones)) {
                if (isSuccessful(nextProps.SaveitemsFileUbicaciones)) {
                    if (isSuccessful(EK.Store.getState().global.itemEventoCapturaLoad)) {
                        let evento = EK.Store.getState().global.itemEventoCapturaLoad.data;
                        // console.log(evento)
                        this.props.itemsFileGTLoad({ tipo: "anexos", entityType: UBICACIONSDC, entityId: evento.ID, activos: 1 }, "itemsFileUbicaciones", "datagroupContainerFilesUbicacion")
                    }
                };
            };

        }

        onPatrocinadores() {
            Forms.reset(SECCIONPATROCINADORESADD);
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID)
            let modal: any = $("#ModalPatrocinadores");
            modal.modal();

        }

        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model = Forms.getValues(SECCION);
            let Evento = isSuccessful(EK.Store.getState().global.entityItemCaptura) ? getData(EK.Store.getState().global.entityItemCaptura) : null
            let Organizador = model.Organizador;
            let Antecedentes = model.Antecedentes;
            let ImpactoEsperado = model.ImpactoEsperado;
            let GastosTotales = model.GastoCaptura;
            let Ruba = model.Ruba;
            let Porcentaje = Forms.getValue("Porcentaje", PAGE_ID);
            let HorasIntervencion = model.HorasIntervencion;
            let MetaAsistencia = model.MetaAsistenciaCaptura;
            let NumeroAsistentes = model.NumeroAsistentesCaptura;
            let PorcentajeMeta = Forms.getValue("PorcentajeMetaCaptura", PAGE_ID);
            let PresenciaPrensa = model.PresenciaPrensa === 'PresenciaPrensaSi' ? 1 : 0;
            let ProgramaRecomendados = model.ProgramaRecomendados === 'ProgramaRecomendadosSi' ? 1 : 0;
            let Imagen = model.ImagenCaptura ? 1 : 0;
            let Integracion = model.IntegracionCaptura ? 1 : 0;
            let Servicios = model.ServiciosCaptura ? 1 : 0;
            let Sustentabilidad = model.SustentabilidadCaptura ? 1 : 0;

            let Patrocinadores = getData(EK.Store.getState().global.PorcentajesGastos)

            if (Evento === null) {
                warning("Favor de cargar los datos del evento", "Atención");
                return
            }
            if (Antecedentes === undefined || Antecedentes === "" || Antecedentes === null) {
                warning("El campo Antecedentes es obligatorio", "Atención");
                return
            }
            if (ImpactoEsperado === undefined || ImpactoEsperado === "" || ImpactoEsperado === null) {
                warning("El campo Impacto esperado es obligatorio", "Atención");
                return
            }
            if (GastosTotales === undefined || GastosTotales === "" || GastosTotales === null) {
                warning("El campo Gastos Totales es obligatorio", "Atención");
                return
            }
            if (Ruba === undefined || Ruba === "" || Ruba === null) {
                warning("El campo Ruba es obligatorio", "Atención");
                return
            }
            if (+Ruba > +GastosTotales) {
                warning("El valor ingresado en el campo Ruba no puede ser mayor al valor ingresado en el campo Gastos Totales", "Atención");
                return
            }
            if (Porcentaje === undefined && +Ruba > 0 && GastosTotales > 0) {
                let percentaje = (+Ruba / +GastosTotales) * 100;
                Forms.updateFormElement("Porcentaje", `${percentaje}%`)
            }
            if (HorasIntervencion === undefined || HorasIntervencion === "" || HorasIntervencion === null) {
                warning("El campo Horas de Intervencion es obligatorio", "Atención");
                return
            }
            //if (MetaAsistencia === undefined || MetaAsistencia === "" || MetaAsistencia === null) {
            //    warning("El campo Meta de Asistencia es obligatorio", "Atención");
            //    return
            //}
            //if (NumeroAsistentes === undefined || NumeroAsistentes === "" || NumeroAsistentes === null) {
            //    warning("El campo Numero de asistentes es obligatorio", "Atención");
            //    return
            //}
            //if (+NumeroAsistentes > +MetaAsistencia) {
            //    warning("El valor ingresado en el campo Numero de asistentes no puede ser mayor al valor ingresado en el campo Meta de asistencia", "Atención");
            //    return
            //}
            //if (PorcentajeMeta === undefined || PorcentajeMeta === "" || PorcentajeMeta === null) {
            //    warning("El campo Numero de asistentes es obligatorio", "Atención");
            //    return
            //}
            //if (PresenciaPrensa === undefined || PorcentajeMeta === null) {
            //    warning("El campo Presencia prensa es obligatorio", "Atención");
            //    return
            //}
            //if (ProgramaRecomendados === undefined || ProgramaRecomendados === null) {
            //    warning("El campo Programa recomendados es obligatorio", "Atención");
            //    return
            //}
            console.log(PorcentajeMeta)
            if (Porcentaje !== null || Porcentaje !== undefined)
                Porcentaje = +Porcentaje.replace("%", "");

            if (PorcentajeMeta !== null && PorcentajeMeta !== undefined)
                PorcentajeMeta = +PorcentajeMeta.replace("%", "");

            //  console.log(Patrocinadores)
            Patrocinadores = Patrocinadores.map(x => {
                return {
                    IdPatrocinador: x.IdPatrocinador,
                    Patrocinador: x.Patrocinador,
                    Cantidad: x.Cantidad,
                    Porcentaje: +x.Porcentaje.replace("%", ""),
                    Especie: x.Especie,
                    TipoEspecie: x.TipoEspecie
                }
            })


            let parametros = [];
            parametros.push({
                IdEvento: Evento[0].Id,
                IdOrganizador: Organizador.ID,
                Antecedentes: Antecedentes,
                ImpactoEsperado: ImpactoEsperado,
                GastosTotales: GastosTotales,
                Ruba: Ruba,
                Porcentaje: Porcentaje,
                HorasIntervencion: HorasIntervencion,
                MetaAsistencia: MetaAsistencia,
                NumeroAsistentes: NumeroAsistentes,
                PorcentajeMeta: PorcentajeMeta,
                PresenciaPrensa: PresenciaPrensa,
                ProgramaRecomendados: ProgramaRecomendados,
                Imagen: Imagen,
                Integracion: Integracion,
                Servicios: Servicios,
                Sustentabilidad: Sustentabilidad,
                Patrocinadores: Patrocinadores
            })
            // console.log(parametros)

            global.asyncPost("base/kontrol/EventosActividades/GetBP/SaveEventCapture/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data > 0) {
                            success("Se ha guardado el registro", "Exito")
                            //dispatchSuccessful("load::modeEditGeneral", { modeEdit: true }, PAGE_ID);
                            this.onCancelModeEdit();
                            //this.props.loadEvent(data);

                        }
                        if (data === -1) {
                            warning("El Nombre del evento ya existe", "Atención");
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
            })

        }
        componentDidMount(): any {
            dispatchSuccessful("load::GreathThanError", { GreathError: false }, SECCION)
            dispatchSuccessful("load::PorcentajesGastos", [], SECCION);
            dispatchSuccessful("load::spin2", { spin2: false }, PAGE_ID)
            dispatchSuccessful("load::savePatrocinadores", { Save: false }, PAGE_ID)
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID)
            dispatchSuccessful("load::SaveitemsFileGT", { Save: false }, PAGE_ID)
            this.onCancelModeEdit();
            //Forms.updateFormElement(PAGE_ID, "Fraccionamiento", { ID: -1, Clave: "Seleccione una opción" });
            //Forms.updateFormElement(PAGE_ID, "BuscadorEvento", { ID: -1, Clave: "Seleccione una opción" });
        }
        onPatrocinadoresCrud(): any {
            Forms.reset(SECCIONPATROCINADORES);
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID);

            let modal: any = $("#ModalPatrocinadoresCrud");
            modal.modal();
        }
        onChangeModeEdit() {
            dispatchSuccessful("load::modeEditCapturaGeneral", { modeEdit: true }, SECCION)
        }
        onCancelModeEdit() {
            dispatchSuccessful("load::modeEditCapturaGeneral", { modeEdit: false }, SECCION)
            Forms.reset(SECCION);
            dispatchSuccessful("load::PorcentajesGastos", [], SECCION)
            global.dispatchSuccessful("load::entityItemCaptura", []);
            global.dispatchSuccessful("load::itemEventoCapturaLoad", []);
            Forms.updateFormElement(PAGE_ID_CAPTURA, "FechaProgramacionCaptura", undefined);
            Forms.updateFormElement(PAGE_ID_CAPTURA, "PlazasCaptura", undefined);
            Forms.updateFormElement(PAGE_ID_CAPTURA, "FraccionamientosCaptura", undefined);
        }

        onSaveEdit() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model = Forms.getValues(SECCION);
            let Evento = EK.Store.getState().global.itemEventoCapturaLoad.data;
            let Organizador = model.Organizador;
            let Antecedentes = model.Antecedentes;
            let ImpactoEsperado = model.ImpactoEsperado;
            let GastosTotales = model.GastoCaptura;
            let Ruba = model.Ruba;
            let Porcentaje = Forms.getValue("Porcentaje", PAGE_ID);
            let HorasIntervencion = model.HorasIntervencion;
            let MetaAsistencia = model.MetaAsistenciaCaptura;
            let NumeroAsistentes = model.NumeroAsistentesCaptura;
            let PorcentajeMeta = Forms.getValue("PorcentajeMetaCaptura", PAGE_ID);
            let PresenciaPrensa = model.PresenciaPrensa === 'PresenciaPrensaSi' ? 1 : 0;
            let ProgramaRecomendados = model.ProgramaRecomendados === 'ProgramaRecomendadosSi' ? 1 : 0;
            let Imagen = model.ImagenCaptura ? 1 : 0;
            let Integracion = model.IntegracionCaptura ? 1 : 0;
            let Servicios = model.ServiciosCaptura ? 1 : 0;
            let Sustentabilidad = model.SustentabilidadCaptura ? 1 : 0;

            let Patrocinadores = getData(EK.Store.getState().global.PorcentajesGastos)
            if (Evento === null) {
                warning("Favor de cargar los datos del evento", "Atención");
                return
            }
            if (Antecedentes === undefined || Antecedentes === "" || Antecedentes === null) {
                warning("El campo Antecedentes es obligatorio", "Atención");
                return
            }
            if (ImpactoEsperado === undefined || ImpactoEsperado === "" || ImpactoEsperado === null) {
                warning("El campo Impacto esperado es obligatorio", "Atención");
                return
            }
            if (GastosTotales === undefined || GastosTotales === "" || GastosTotales === null) {
                warning("El campo Gastos Totales es obligatorio", "Atención");
                return
            }
            if (Ruba === undefined || Ruba === "" || Ruba === null) {
                warning("El campo Ruba es obligatorio", "Atención");
                return
            }
            if (HorasIntervencion === undefined || HorasIntervencion === "" || HorasIntervencion === null) {
                warning("El campo Horas de Intervencion es obligatorio", "Atención");
                return
            }
            if (MetaAsistencia === undefined || MetaAsistencia === "" || MetaAsistencia === null) {
                warning("El campo Meta de Asistencia es obligatorio", "Atención");
                return
            }
            if (NumeroAsistentes === undefined || NumeroAsistentes === "" || NumeroAsistentes === null) {
                warning("El campo Numero de asistentes es obligatorio", "Atención");
                return
            }
            if (+NumeroAsistentes > +MetaAsistencia) {
                warning("El valor ingresado en el campo Numero de asistentes no puede ser mayor al valor ingresado en el campo Meta de asistencia", "Atención");
                return
            }
            if (PorcentajeMeta === undefined || PorcentajeMeta === "" || PorcentajeMeta === null) {
                warning("El campo Numero de asistentes es obligatorio", "Atención");
                return
            }
            if (PresenciaPrensa === undefined || PorcentajeMeta === null) {
                warning("El campo Presencia prensa es obligatorio", "Atención");
                return
            }
            if (ProgramaRecomendados === undefined || ProgramaRecomendados === null) {
                warning("El campo Programa recomendados es obligatorio", "Atención");
                return
            }
            if (Porcentaje !== null || Porcentaje !== undefined)
                Porcentaje = +Porcentaje.replace("%", "");

            if (PorcentajeMeta !== null || PorcentajeMeta !== undefined)
                PorcentajeMeta = +PorcentajeMeta.replace("%", "");
            //console.log(Evento)
            //Patrocinadores = Patrocinadores.map(x => {
            //    return {
            //        IdPatrocinador: x.IdPatrocinador,
            //        Patrocinador: x.Patrocinador,
            //        Cantidad: x.Cantidad,
            //        Porcentaje: +x.Porcentaje.replace("%", "")
            //    }
            //})


            let parametros = global.assign({
                ID: Evento.ID,
                IDEVENTO: Evento.IdEvento,
                IDORGANIZADOR: Organizador.ID,
                ANTECEDENTES: Antecedentes,
                IMPACTOESPERADO: ImpactoEsperado,
                GASTOSTOTALES: GastosTotales,
                RUBA: Ruba,
                PORCENTAJERUBA: Porcentaje,
                HORASINTERVENCIONTOTALES: HorasIntervencion,
                METAASISTENCIA: MetaAsistencia,
                NUMEROASISTENTES: NumeroAsistentes,
                PORCENTAJEMETA: PorcentajeMeta,
                PRESENCIAPRENSA: PresenciaPrensa,
                PROGRAMARECOMENDADOS: ProgramaRecomendados,
                IMAGEN: Imagen,
                INTEGRACION: Integracion,
                SERVICIOS: Servicios,
                SUSTENTABILIDAD: Sustentabilidad,
                //Patrocinadores: Patrocinadores
            })
            console.log(parametros)
            // console.log(parametros)

            global.asyncPost("base/kontrol/EventosActividades/GetBP/UpdateEventCaptura/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data > 0) {
                            success("Se ha guardado el registro", "Exito")
                            //dispatchSuccessful("load::modeEditGeneral", { modeEdit: true }, PAGE_ID);
                            this.onCancelModeEdit();
                            //this.props.loadEvent(data);
                        }
                        if (data === -1) {
                            warning("El Nombre del evento ya existe", "Atención");
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
            })
        }
        onBlurCalculate() {
            let Gastos = Forms.getValue("GastoCaptura", SECCION)
            let Ruba = Forms.getValue("Ruba", SECCION)
            if (isNaN(Gastos)) {
                warning("El campo Gastos Totales tiene un formato incorrecto, Ejemplo correcto 100.00", "Atención");
                return;
            }
            if (Ruba === undefined || Ruba === null || Ruba === "0.00" || Ruba === 0.00)
                return;

            if (Gastos === undefined) {
                dispatchSuccessful("load::GreathThanError", { GreathError: true }, SECCION)
                warning("Favor de llenar el campo Gastos Totales", "Atención");
                return
            }
            if (+Ruba > +Gastos) {
                dispatchSuccessful("load::GreathThanError", { GreathError: true }, SECCION)
                warning("La cantidad ingresada no puede ser mayor al Gasto total ingresado", "Atención");
                return;
            }
            if (Ruba !== undefined && Gastos !== undefined && !getData(EK.Store.getState().global.GreathThanError).GreathError) {
                let porcentaje = (+Ruba / +Gastos) * 100;
                Forms.updateFormElement(PAGE_ID, "Porcentaje", `${porcentaje}%`)
            }
            dispatchSuccessful("load::GreathThanError", { GreathError: false }, SECCION)
            let Patrocinadores = getData(EK.Store.getState().global.PorcentajesGastos)
            // console.log(Patrocinadores);

        }
        onChangeValue() {
            let Ruba = Forms.getValue("Ruba", SECCION)
            let Gastos = Forms.getValue("GastoCaptura", SECCION)
            if (isNaN(Gastos)) {
                warning("El campo Gastos Totales tiene un formato incorrecto, Ejemplo correcto 100.00", "Atención");
                return;
            }

            if (isSuccessful(EK.Store.getState().global.GreathThanError)) {
                let error = getData(EK.Store.getState().global.GreathThanError)
                if (error.GreathError) {
                    if (Ruba !== undefined || Ruba !== null || Ruba !== "0.00" || Ruba !== 0.00) {
                        if (+Ruba > +Gastos) {
                            warning("La cantidad ingresada en el campo Ruba no puede ser mayor a la del campo Gastos totales", "Atención");
                            return;
                        }
                    }
                }
                if (Ruba !== undefined && Gastos !== undefined && !error.GreathError) {
                    let porcentaje = (+Ruba / +Gastos) * 100;
                    Forms.updateFormElement(PAGE_ID, "Porcentaje", `${porcentaje}%`)
                }

                //dispatchSuccessful("load::PorcentajesGastos", [], PAGE_ID);
            }
            dispatchSuccessful("load::GreathThanError", { GreathError: false }, SECCION)


        }
        onGetEventAct() {
            let Evento = Forms.getValue("EventosSelect", EVENTSELECT)
            let parametros = global.assign({
                ID: Evento.ID
            })
            dispatchSuccessful("load::spin2", { spin2: true }, SECCION)

            global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventActSimple/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        dispatchSuccessful("load::entityItemCaptura", data, PAGE_ID)
                        Forms.updateFormElement(PAGE_ID_CAPTURA, "FechaProgramacionCaptura", data[0].Fecha.toLocaleDateString());
                        Forms.updateFormElement(PAGE_ID_CAPTURA, "PlazasCaptura", data[0].Plaza);
                        Forms.updateFormElement(PAGE_ID_CAPTURA, "FraccionamientosCaptura", data[0].Fraccionamiento);
                        Forms.updateFormElement(PAGE_ID, "Porcentaje", undefined)

                        let parametros = global.assign({
                            IDEVENTO: data[0].Id,
                            OPERACION: "GETEVENTOCAPTURA"
                        })

                        global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventoCapturaByIdEvento/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    if (res !== null) {
                                        dispatchSuccessful("load::modeEditCapturaGeneral", { modeEdit: true }, SECCION)
                                        dispatchSuccessful("load::itemEventoCapturaLoad", res, PAGE_ID);



                                        Forms.updateFormElement(SECCION, "Organizador", { ID: res.IdOrganizador });
                                        Forms.updateFormElement(SECCION, "Antecedentes", res.Antecedentes);
                                        Forms.updateFormElement(SECCION, "ImpactoEsperado", res.ImpactoEsperado);
                                        Forms.updateFormElement(SECCION, "GastoCaptura", res.GastosTotales);
                                        let porcentajeRuba = `${res.Porcentaje}%`;
                                        Forms.updateFormElement(SECCION, "Ruba", res.Ruba);
                                        Forms.updateFormElement(PAGE_ID, "Porcentaje", porcentajeRuba);
                                        Forms.updateFormElement(SECCION, "HorasIntervencion", res.HorasIntervencion);
                                        //  console.log(res.Patrocinadores)
                                        if (res.Patrocinadores !== null) {
                                            let patrocinadores = res.Patrocinadores.map(x => {
                                                return {
                                                    Id: x.ID,
                                                    IdPatrocinador: x.IdPatrocinador,
                                                    Patrocinador: x.Patrocinador,
                                                    Cantidad: x.Cantidad,
                                                    Porcentaje: `${x.Porcentaje}%`,
                                                    Especie: x.Especie,
                                                    TipoEspecie: x.TipoEspecie
                                                }
                                            })
                                            dispatchSuccessful("load::PorcentajesGastos", patrocinadores, PAGE_ID);
                                        } else {
                                            dispatchSuccessful("load::PorcentajesGastos", [], PAGE_ID);

                                        }

                                        Forms.updateFormElement(SECCION, "MetaAsistenciaCaptura", res.MetaAsistencia);
                                        Forms.updateFormElement(SECCION, "NumeroAsistentesCaptura", res.NumeroAsistentes);
                                        let porcentageMeta = res.PorcentajeMeta !== null ? `${res.PorcentajeMeta}%` : '';
                                        Forms.updateFormElement(PAGE_ID, "PorcentajeMetaCaptura", porcentageMeta);
                                        Forms.updateFormElement(SECCION, "PresenciaPrensa", res.PresenciaPrensa ? "PresenciaPrensaSi" : "PresenciaPrensaNO");
                                        Forms.updateFormElement(SECCION, "ProgramaRecomendados", res.ProgramaRecomendados ? "ProgramaRecomendadosSi" : "ProgramaRecomendadosNo");

                                        Forms.updateFormElement(SECCION, "ImagenCaptura", res.Imagen);
                                        Forms.updateFormElement(SECCION, "IntegracionCaptura", res.Integracion);
                                        Forms.updateFormElement(SECCION, "ServiciosCaptura", res.Servicios);
                                        Forms.updateFormElement(SECCION, "SustentabilidadCaptura", res.Sustentabilidad);


                                        loadFiles({ tipo: "anexos", entityType: GASTOSTOTALESSDC, entityId: res.ID, activos: 1 }, "itemsFileGT", "datagroupContainerFilesGastosTotales");
                                        loadFiles({ tipo: "anexos", entityType: EVENTOEVIDENCIASSDC, entityId: res.ID, activos: 1 }, "itemsFileEvidencias", "datagroupContainerFilesEvidencias");
                                        loadFiles({ tipo: "anexos", entityType: EVENTOINSUMOSSDC, entityId: res.ID, activos: 1 }, "itemsFileInsumos", "datagroupContainerFilesInsumos");
                                        loadFiles({ tipo: "anexos", entityType: UBICACIONSDC, entityId: res.ID, activos: 1 }, "itemsFileUbicaciones", "datagroupContainerFilesUbicacion");

                                        dispatchSuccessful("load::spin2", { spin2: false }, SECCION)

                                    } else {
                                        dispatchSuccessful("load::spin2", { spin2: false }, SECCION)
                                        dispatchSuccessful("load::modeEditCapturaGeneral", { modeEdit: false }, SECCION)

                                        dispatchSuccessful("load::PorcentajesGastos", [], PAGE_ID);
                                        onDataTableFiles("datagroupContainerFilesGastosTotales", []);
                                        onDataTableFiles("datagroupContainerFilesEvidencias", []);
                                        onDataTableFiles("datagroupContainerFilesInsumos", []);
                                        onDataTableFiles("datagroupContainerFilesUbicacion", []);
                                        dispatchSuccessful("load::itemEventoCapturaLoad", {}, PAGE_ID);
                                        Forms.reset(SECCION)
                                        Forms.reset(PAGE_ID)
                                        Forms.updateFormElement(PAGE_ID, 'PorcentajeMetaCaptura', undefined)
                                        Forms.updateFormElement(PAGE_ID_CAPTURA, "FechaProgramacionCaptura", data[0].Fecha.toLocaleDateString());
                                        Forms.updateFormElement(PAGE_ID_CAPTURA, "PlazasCaptura", data[0].Plaza);
                                        Forms.updateFormElement(PAGE_ID_CAPTURA, "FraccionamientosCaptura", data[0].Fraccionamiento);
                                    }
                                    break;
                                case AsyncActionTypeEnum.loading:

                                    break;
                                case AsyncActionTypeEnum.failed:
                                    dispatchSuccessful("load::spin2", { spin2: false }, SECCION)
                                    break;
                            }
                        })



                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        dispatchSuccessful("load::spin2", { spin2: false }, SECCION)
                        break;
                }
            })
        }

        onchangefileGastosTotales(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.itemEventoCapturaLoad.data
                onSaveFile(file, GASTOSTOTALESSDC, item.ID, "SaveitemsFileGT");
            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }
        onchangefileEvidencias(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.itemEventoCapturaLoad.data

                onSaveFile(file, EVENTOEVIDENCIASSDC, item.ID, 'SaveitemsFileEvidencias')

            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }
        onchangefileInsumos(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.itemEventoCapturaLoad.data

                onSaveFile(file, EVENTOINSUMOSSDC, item.ID, 'SaveitemsFileInsumos')

            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }
        onchangefileUbicacion(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                let item = EK.Store.getState().global.itemEventoCapturaLoad.data
                onSaveFile(file, UBICACIONSDC, item.ID, 'SaveitemsFileUbicaciones')

            } else {
                global.dispatchSuccessful("load:SAVEFILE", {}, PAGE_ID);
            }
        }
        onCalculateGoalPercentage() {
            let MetaAsistencia = +Forms.getValue("MetaAsistenciaCaptura", SECCION)
            let NumeroAsistentes = +Forms.getValue("NumeroAsistentesCaptura", SECCION)

            if (isNaN(MetaAsistencia)) {
                warning("El campo Meta de asistencia tiene un formato incorrecto", "Atención");
                return;
            }

            if (MetaAsistencia === undefined || MetaAsistencia === null) {
                warning("Favor de ingresar un valor en el campo Meta de Asistencia", "Atención");
                return;
            }

            //if (NumeroAsistentes > MetaAsistencia) {
            //    warning("El valor ingresado no puede ser mayor a la Meta de asistencia", "Atención")
            //    return;
            //}

            if (NumeroAsistentes === undefined || NumeroAsistentes === null)
                return;


            let porcentaje = ((+NumeroAsistentes / +MetaAsistencia) * 100).toFixed(2);
            Forms.updateFormElement(PAGE_ID, "PorcentajeMetaCaptura", `${porcentaje}%`)
        }
        onCalculateGoalPercentageFromGoal() {
            let MetaAsistencia = +Forms.getValue("MetaAsistenciaCaptura", SECCION)
            let NumeroAsistentes = +Forms.getValue("NumeroAsistentesCaptura", SECCION)

            if (NumeroAsistentes > 0) {
                if (NumeroAsistentes > MetaAsistencia) {
                    warning("El valor ingresado no puede ser menor al numero de asistentes", "Atención")
                    Forms.updateFormElement(SECCION, "MetaAsistenciaCaptura", 0)
                    return;
                }
                let porcentaje = ((+NumeroAsistentes / +MetaAsistencia) * 100).toFixed(2);
                Forms.updateFormElement(PAGE_ID, "PorcentajeMetaCaptura", `${porcentaje}%`)
            }

        }
        inputRef: Element;
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEditCapturaGeneral)) {
                isModeEdit = this.props.modeEditCapturaGeneral.data.modeEdit;
            }
            let spin;
            if (isSuccessful(EK.Store.getState().global.spin2)) {
                spin = getData(EK.Store.getState().global.spin2).spin2;
            }
            let textTitle = "CAPTURA";
            let icon = "fas fa-briefcase";

            if (isModeEdit) {
                textTitle = "CAPTURA";
                icon = "fa fa-edit";
            }
            let entity;
            let entityId;
            let entityCaptura;
            let entityIdCaptura = 0;
            let entityType;
            if (isSuccessful(this.props.entityItemCaptura)) {
                entity = getData(this.props.entityItemCaptura);
                if (entity.length > 0) {
                    entityId = entity[0].Id;
                }

            }

            if (isSuccessful(this.props.itemEventoCapturaLoad)) {
                entityCaptura = getData(this.props.itemEventoCapturaLoad);
                entityIdCaptura = entityCaptura.ID;
            }
            //console.log(entityIdCaptura)
            //if (isSuccessful(this.props.entityTypeEvidencias)) {
            //    console.log(this.props.entityTypeGastosTotales)
            //    console.log(this.props.entityTypeEvidencias)
            //    console.log(this.props)

            //}

            return <div id="">
                <ModalPatrocinadores />
                <ModalCrudPatrocinadores />
                <page.OptionSection
                    id={SECCION}
                    subTitle={textTitle}
                    level={5}
                    icon={icon}
                    collapsed={true}>

                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="Guardando..." />
                    </div>
                    <Row id="loadedData">
                        <Column size={[12, 12, 12, 12]}>
                            <page.OptionSection
                                id={SECCION}
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
                                                    !isModeEdit && entityId > 0 && entityIdCaptura == undefined ?
                                                        <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                        //<Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload"  style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    isModeEdit && entityIdCaptura > 0 && entityId > 0 ?
                                                        <Button id={"btnEdit"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-edit" text={"Guardar"} onClick={this.onSaveEdit} style={{ marginRight: 5, color, backgroundColor: "#FFD96A" }} />
                                                        //<Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="fa fa-edit"  style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    //isModeEdit ?
                                                    //    <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onSaveEdit} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                    //    //<Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload" style={{ color }} />
                                                    //    : null
                                                }
                                                {
                                                    entityId > 0 ?
                                                        <Button id={"btnCancel"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancelModeEdit} style={{ marginRight: 5, color, backgroundColor: "#F1675E" }} />
                                                        //<Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancelModeEdit} style={{ color }} />
                                                        : null

                                                }
                                            </Column>
                                            <Column size={[12, 12, 12, 12]} style={{ paddingBottom: '15px' }}>
                                                {<ddl.EventosFilterDDL id="EventosSelect" label="Evento" idFormSection={EVENTSELECT} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />}
                                                <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Llenar Campos"} onClick={this.onGetEventAct} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
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
                                                                <label.Label id="FechaProgramacionCaptura" label="Fecha" idForm={PAGE_ID_CAPTURA} size={[12, 12, 4, 4]} />
                                                                <label.Label id="PlazasCaptura" label="Plaza" idForm={PAGE_ID_CAPTURA} size={[12, 12, 4, 4]} />
                                                                <label.Label id="FraccionamientosCaptura" label="Fraccionamiento" idForm={PAGE_ID_CAPTURA} size={[12, 12, 4, 4]} />
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
                                                        <ddl.OrganizadorEvento id="Organizador" label="Organizador" idFormSection={SECCION} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />
                                                        <input.Text id="Antecedentes" label="Descripción del Evento" idFormSection={SECCION} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                        <input.Text id="ImpactoEsperado" label="Impacto esperado" idFormSection={SECCION} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                    </Column>
                                                </Row>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} className=" ">
                                                        <input.Currency id="GastoCaptura" label="Gastos totales" change={this.onChangeValue} idFormSection={SECCION} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                                                        <input.Currency id="Ruba" label="Ruba" change={this.onBlurCalculate} idFormSection={SECCION} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                                                        <label.Label id="Porcentaje" label="Porcentaje" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                                                        <input.Integer id="HorasIntervencion" label="Horas de intervención totales" idFormSection={SECCION} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                                                    </Column>
                                                </Row>
                                                <Row style={{ paddingTop: 15 }}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <page.OptionSection
                                                            id={SECCION}
                                                            subTitle={"PATROCINADORES"}
                                                            level={2}
                                                            icon="fa fa-users"
                                                            collapsed={false}>
                                                            <SectionButtons >
                                                                <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.onPatrocinadores} style={{ marginRight: 5, color }} />
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

                                                <Row >
                                                    <Column size={[12, 12, 12, 12]} >
                                                        <page.OptionSection
                                                            id={SECCION}
                                                            subTitle={"RESULTADOS DEL EVENTO"}
                                                            level={2}
                                                            icon="fa fa-check"
                                                            collapsed={false}>
                                                            <Row style={{ paddingTop: 15 }}>
                                                                <Column size={[12, 12, 12, 12]} >
                                                                    <page.OptionSection
                                                                        id={SECCION}
                                                                        subTitle={"CAPTURA DE RESULTADOS DEL EVENTO"}
                                                                        level={1}
                                                                        icon="fa fa-archive"
                                                                        collapsed={false}>
                                                                        <Row style={{}}>
                                                                            <Column size={[12, 12, 12, 12]} >
                                                                                <input.Integer id="MetaAsistenciaCaptura" change={this.onCalculateGoalPercentageFromGoal} label="Meta de asistencia" idFormSection={SECCION} size={[12, 12, 4, 4]}  />
                                                                                <input.Integer id="NumeroAsistentesCaptura" change={this.onCalculateGoalPercentage} label="Numero de Asistentes" idFormSection={SECCION} size={[12, 12, 4, 4]}  />
                                                                                <label.Label id="PorcentajeMetaCaptura" label="Porcentaje de meta" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                                                {/* <input.Porcentaje id="PorcentajeMetaCaptura" label="Porcentaje de meta"  size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                                                                            </Column >
                                                                        </Row>
                                                                    </page.OptionSection>
                                                                </Column >
                                                                <Column size={[12, 12, 12, 12]} >
                                                                    <Row style={{ paddingTop: 15 }}>
                                                                        <Column size={[12, 12, 12, 12]} >
                                                                            <page.OptionSection
                                                                                id={SECCION}
                                                                                subTitle={"PROMOCIÓN DEL EVENTO"}
                                                                                level={1}
                                                                                icon="fa fa-camera"
                                                                                collapsed={false}>
                                                                                <Row style={{}}>
                                                                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                                                        <b>PRESENCIA DE PRENSA</b>
                                                                                    </Column >
                                                                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                                                        <RadioButton id="PresenciaPrensaSi" label="SI" idFormSection={SECCION} groupName="PresenciaPrensa" size={[12, 12, 6, 6]} />
                                                                                        <RadioButton id="PresenciaPrensaNO" label="NO" idFormSection={SECCION} groupName="PresenciaPrensa" size={[12, 12, 6, 6]} />
                                                                                    </Column >
                                                                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                                                        <b>PROGRAMA DE RECOMENDADOS</b>
                                                                                    </Column >
                                                                                    <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                                                        <RadioButton id="ProgramaRecomendadosSi" label="SI" idFormSection={SECCION} groupName="ProgramaRecomendados" size={[12, 12, 6, 6]} />
                                                                                        <RadioButton id="ProgramaRecomendadosNo" label="NO" idFormSection={SECCION} groupName="ProgramaRecomendados" size={[12, 12, 6, 6]} />
                                                                                    </Column >
                                                                                </Row>
                                                                            </page.OptionSection>
                                                                        </Column >
                                                                    </Row>
                                                                </Column >
                                                                <Column size={[12, 12, 12, 12]} >
                                                                    <Row style={{ paddingTop: 15 }}>
                                                                        <Column size={[12, 12, 12, 12]} >
                                                                            <page.OptionSection
                                                                                id={SECCION}
                                                                                subTitle={"IMPACTO EN LA COMUNIDAD"}
                                                                                level={1}
                                                                                icon="fa fa-crosshairs"
                                                                                collapsed={false}>
                                                                                <Row style={{}}>
                                                                                    <Column size={[12, 12, 12, 12]} style={{ padding: "5px" }}>
                                                                                        <checkBox.CheckBox id={"ImagenCaptura"} idFormSection={SECCION} label={"IMAGEN"} size={[12, 12, 3, 3]}  />
                                                                                        <checkBox.CheckBox id={"IntegracionCaptura"} idFormSection={SECCION} label={"INTEGRACIÓN"} size={[12, 12, 3, 3]}  />
                                                                                        <checkBox.CheckBox id={"ServiciosCaptura"} idFormSection={SECCION} label={"SERVICIOS"} size={[12, 12, 3, 3]}  />
                                                                                        <checkBox.CheckBox id={"SustentabilidadCaptura"} idFormSection={SECCION} label={"SUSTENTABILIDAD"} size={[12, 12, 3, 3]}  />
                                                                                    </Column >
                                                                                </Row>
                                                                            </page.OptionSection>
                                                                        </Column >
                                                                    </Row>
                                                                </Column >
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
                                                    id={SECCION}
                                                    subTitle={"ADMINISTRACIÓN DE ARCHIVOS"}
                                                    level={2}
                                                    icon="fa fa-paperclip"
                                                    collapsed={false}>
                                                    <Row style={{}}>
                                                        {
                                                            entityIdCaptura === 0 || entityIdCaptura === undefined ?
                                                                <Column size={[12, 12, 12, 12]}>
                                                                    <div className="alert alert-info" style={{ marginTop: 20, textAlign: 'center' }}>
                                                                        <h4>PARA SUBIR ARCHIVOS ES NECESARIO GUARDAR EL REGISTRO</h4>
                                                                    </div>
                                                                </Column >
                                                                : null
                                                        }
                                                        <Column size={[12, 12, 6, 6]}>

                                                            {
                                                                entityIdCaptura > 0 ?
                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"GastosTotalesFile"}
                                                                                    label={"Gastos Totales"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangefileGastosTotales}
                                                                                    idForm={FILEGASTOSTOTALES}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesGastosTotales" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </Column>
                                                        <Column size={[12, 12, 6, 6]}>
                                                            {
                                                                entityIdCaptura > 0 ?
                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"Evidencias"}
                                                                                    label={"Evidencias"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangefileEvidencias}
                                                                                    idForm={FILEEVIDENCIAS}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesEvidencias" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </Column>
                                                    </Row>
                                                    <Row>
                                                        <Column size={[12, 12, 6, 6]}>
                                                            {
                                                                entityIdCaptura > 0 ?
                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"InsumosEvento"}
                                                                                    label={"Insumos del evento"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangefileInsumos}
                                                                                    idFormSection={FILEGASTOSTOTALES}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesInsumos" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </Column>
                                                        <Column size={[12, 12, 6, 6]}>
                                                            {
                                                                entityIdCaptura > 0 ?
                                                                    <div>
                                                                        <Row>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <EK.UX.Kontrol.KontrolFile$Input
                                                                                    id={"Ubicacion"}
                                                                                    label={"Ubicación del Evento"}
                                                                                    size={[12, 12, 12, 12]}
                                                                                    required={null}
                                                                                    onChange={this.onchangefileUbicacion}
                                                                                    idFormSection={FILEGASTOSTOTALES}
                                                                                    mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                                            </Column>
                                                                            <Column size={[12, 12, 12, 12]}>
                                                                                <span><b><i>Doble click sobre fila para eliminar el archivo</i></b></span>
                                                                                <div id="datagroupContainerFilesUbicacion" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                                                </div>
                                                                            </Column>
                                                                        </Row>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </Column>
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
    // MODAL PATROCINADORES
    //========================================================================
    const ModalPatrocinadores: any = global.connect(class extends React.Component<IEventosActividadesCaptura, IEditState>{
        constructor(props) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            // retValue.formValues = [{ name: "", email: "" }]
            retValue.Especie = Forms.getDataValue("Especie", SECCIONPATROCINADORESADD, state);
            retValue.modeEditPatrocinadores = state.global.modeEditPatrocinadores;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })

        footerModal(): JSX.Element {
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores
            }
            return <div className="modal-footer">
                {
                    !isModeEdit ?
                        <div>
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                        : <div>
                            <button type="button" onClick={this.onEdit} className="btn dark btn-outline btn-md yellow" data-dismiss="modal">Editar</button>
                            <button type="button" onClick={this.onRemove} className="btn dark btn-outline btn-md red" data-dismiss="modal">Quitar</button>
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                }
            </div>;
        };
        onEdit() {
            let Patrocinador = Forms.getValue("Patrocinador", SECCIONPATROCINADORESADD)
            let CantidadP = +Forms.getValue("CantidadP", SECCIONPATROCINADORESADD)
            let Especie = Forms.getValue("Especie", SECCIONPATROCINADORESADD)
            let TipoEspecie = Forms.getValue("TipoEspecie", SECCIONPATROCINADORESADD)
            let Gastos = +Forms.getValue("GastoCaptura", SECCION)
            let item = getData(EK.Store.getState().global.itemPatrocinadores);
            let data = getData(EK.Store.getState().global.PorcentajesGastos);
            let labelPorcentajeRuba = Forms.getValue("Porcentaje", PAGE_ID)
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditCapturaGeneral.data.modeEdit;
            }
            if (isNaN(Gastos)) {
                warning("El campo Gastos Totales tiene un formato incorrecto, Ejemplo correcto 100.00", "Atención");
                return;
            }
            if (Gastos === undefined) {
                warning("Para agregar es necesario que el campo Gastos totales no este vacio", "Atención");
                return;
            }
            if (Patrocinador !== undefined && (CantidadP !== undefined || CantidadP !== null || CantidadP !== 0.00)) {
                if (CantidadP > Gastos) {
                    warning("La cantidad ingresada no puede ser mayor al Gasto Total ingresado", "Atención");
                    return
                }
                let txtlabel
                if (labelPorcentajeRuba === undefined || labelPorcentajeRuba === null)
                    txtlabel = 0
                else
                    txtlabel = +labelPorcentajeRuba.replace("%", "");

                let suma = data.map(x => +x.Porcentaje.replace("%", "")).reduce((prev, curr) => prev + curr, 0);

                if (isNaN(CantidadP)) {
                    CantidadP = 0
                }
                let Percentage = CantidadP > 0 ? (CantidadP / Gastos) * 100 : CantidadP;
                Percentage = Percentage > 0 ? +Percentage.toFixed(2) : Percentage;

                let result = suma + txtlabel - item.Porcentaje.replace("%", "");
                let newResult = result + Percentage;

                if (newResult > 100) {
                    warning("El porcentaje ya rebasa el 100%, favor de validar los datos", "Atención");
                    return
                }
                if (isModeEdit) {
                    let evento = getData(EK.Store.getState().global.itemEventoCapturaLoad)
                    let parametros = global.assign({
                        ID: item.Id,
                        IDPATROCINADOR: Patrocinador.ID,
                        CANTIDAD: CantidadP,
                        PORCENTAJE: Percentage,
                        ESPECIE: Especie,
                        TIPOESPECIE: TipoEspecie
                    })
                    let exist = data.filter(x => x.IdPatrocinador === Patrocinador.ID && x.IdPatrocinador !== item.IdPatrocinador)
                    if (exist.length > 0) {
                        warning("El patrocinador seleeccionado ya fue agregado", "Atención")
                        return
                    }
                    global.asyncPost("base/kontrol/EventosActividades/GetBP/UpdatePatrocinadoresEvento/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                let newData = data.filter(x => x.IdPatrocinador !== item.IdPatrocinador)

                                let addItem = {
                                    Id: res,
                                    IdPatrocinador: Patrocinador.ID,
                                    Patrocinador: Patrocinador.Nombre,
                                    Cantidad: CantidadP,
                                    Porcentaje: `${Percentage}%`,
                                    Especie: Especie,
                                    TipoEspecie: TipoEspecie
                                }
                                //  if(newData.length === 0)
                                newData.push(addItem);
                                dispatchSuccessful("load::PorcentajesGastos", newData, PAGE_ID);
                                Forms.reset(SECCIONPATROCINADORESADD);
                                //Forms.updateFormElement("Patrocinador", null, SECCIONPATROCINADORESADD)
                                //Forms.updateFormElement("CantidadP", null, SECCIONPATROCINADORESADD)
                                success("Se actualizo correctamente", "Exito");
                                break;
                            case AsyncActionTypeEnum.loading: break;
                            case AsyncActionTypeEnum.failed: break;
                        }
                    });
                } else {
                    let newData = data.filter(x => x.IdPatrocinador !== item.IdPatrocinador)
                    let addItem = {
                        IdPatrocinador: Patrocinador.ID,
                        Patrocinador: Patrocinador.Nombre,
                        Cantidad: CantidadP,
                        Porcentaje: `${Percentage}%`,
                        Especie: Especie,
                        TipoEspecie: TipoEspecie
                    }
                    newData.push(addItem);
                    dispatchSuccessful("load::PorcentajesGastos", newData, PAGE_ID);
                }
            }

        }
        onRemove() {

            let isModeEdit = EK.Store.getState().global.modeEditCapturaGeneral.data.modeEdit;
            let data = getData(EK.Store.getState().global.PorcentajesGastos);
            let row = getData(EK.Store.getState().global.itemPatrocinadores);
            let newData = data.filter(x => x.IdPatrocinador != row.IdPatrocinador)

            if (isModeEdit) {
                let parametros = global.assign({
                    ID: row.Id,
                })
                global.dispatchAsyncPost("load::Delete", "base/kontrol/EventosActividades/GetBP/DeletePatrocinadoresEvento/", { parametros: parametros });
            }
            dispatchSuccessful("load::PorcentajesGastos", newData);
            //  Forms.reset(INVITADOSESPECIALES)
        }
        onCancel() {
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID)
            Forms.updateFormElement(SECCIONPATROCINADORESADD, "Patrocinador", null)
            Forms.updateFormElement(SECCIONPATROCINADORESADD, "CantidadP", null)
            //   Forms.reset(INVITADOSESPECIALES)
        }
        onPatrocinadores() {
            let Patrocinador = Forms.getValue("Patrocinador", SECCIONPATROCINADORESADD)
            let CantidadP = +Forms.getValue("CantidadP", SECCIONPATROCINADORESADD)
            let Especie = Forms.getValue("Especie", SECCIONPATROCINADORESADD)
            let TipoEspecie = Forms.getValue("TipoEspecie", SECCIONPATROCINADORESADD)
            let Gastos = +Forms.getValue("GastoCaptura", SECCION)
            let labelPorcentajeRuba = Forms.getValue("Porcentaje", PAGE_ID)
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditCapturaGeneral.data.modeEdit
            }
            if (isNaN(Gastos)) {
                warning("El campo Gastos Totales tiene un formato incorrecto o no se ha ingresado una cantidad, Ejemplo correcto 100.00", "Atención");
                return;
            }
            if (isNaN(CantidadP) && !Especie) {
                warning("El campo cantidad no contiene un valor correcto", "Atención");
                return;
            }
            if (Gastos === undefined) {
                warning("Para agregar es necesario que el campo Gastos totales no este vacio", "Atención");
                return;
            }
            if (CantidadP === 0 && !Especie) {
                warning("Favor de ingresar un valor en el campo Cantidad", "Atención");
                return;
            }
            if (Especie) {
                if (TipoEspecie === null || TipoEspecie === "" || TipoEspecie === undefined) {
                    warning("Debe de llenar el campo Tipo de especie", "Atención")
                    return
                }
            }
            if (Patrocinador !== undefined && (CantidadP !== undefined || CantidadP !== null || CantidadP !== 0.00 || CantidadP !== 0 || isNaN(CantidadP))) {

                let data = getData(EK.Store.getState().global.PorcentajesGastos);
                if (CantidadP > Gastos) {
                    warning("La cantidad ingresada no puede ser mayor al Gasto Total ingresado", "Atención");
                    return
                }
                if (data.length > 0) { // si ya hay registrados
                    let exist = data.filter(x => x.IdPatrocinador === Patrocinador.ID)
                    if (exist.length > 0) {
                        warning("El patrocinador seleeccionado ya fue agregado", "Atención")
                        return
                    }
                    let txtlabel
                    if (labelPorcentajeRuba === undefined || labelPorcentajeRuba === null)
                        txtlabel = 0
                    else
                        txtlabel = +labelPorcentajeRuba.replace("%", "");

                    let suma = data.map(x => +x.Porcentaje.replace("%", "")).reduce((prev, curr) => prev + curr, 0);

                    if (isNaN(CantidadP)) {
                        CantidadP = 0
                    }
                    let Percentage = CantidadP > 0 ? (CantidadP / Gastos) * 100 : CantidadP;
                    Percentage = Percentage > 0 ? +Percentage.toFixed(2) : Percentage;

                    let result = +suma + +txtlabel + Percentage;

                    if (result > 100) {
                        warning("El porcentaje ya rebasa el 100%, favor de validar los datos", "Atención");
                        return
                    }
                    if (isModeEdit) {
                        let evento = getData(EK.Store.getState().global.itemEventoCapturaLoad)
                        let parametros = global.assign({
                            IDEVENTO: evento.ID,
                            IDPATROCINADOR: Patrocinador.ID,
                            CANTIDAD: CantidadP,
                            PORCENTAJE: Percentage,
                            ESPECIE: Especie,
                            TIPOESPECIE: TipoEspecie
                        })
                        global.asyncPost("base/kontrol/EventosActividades/GetBP/SavePatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    let addItem = {
                                        Id: res,
                                        IdPatrocinador: Patrocinador.ID,
                                        Patrocinador: Patrocinador.Nombre,
                                        Cantidad: CantidadP,
                                        Porcentaje: `${Percentage}%`,
                                        Especie: Especie,
                                        TipoEspecie: TipoEspecie
                                    }
                                    //alert("test")
                                    data.push(addItem);
                                    dispatchSuccessful("load::PorcentajesGastos", data, PAGE_ID);
                                    Forms.updateFormElement("Patrocinador", null, SECCIONPATROCINADORESADD)
                                    Forms.updateFormElement("CantidadP", null, SECCIONPATROCINADORESADD)
                                    Forms.updateFormElement("Especie", null, SECCIONPATROCINADORESADD)
                                    Forms.updateFormElement("TipoEspecie", null, SECCIONPATROCINADORESADD)
                                    Forms.reset(SECCIONPATROCINADORESADD)
                                    success("Se agrego correctamente", "Exito");
                                    break;
                                case AsyncActionTypeEnum.loading: break;
                                case AsyncActionTypeEnum.failed: break;
                            }
                        });
                    } else {
                        let addItem = {
                            IdPatrocinador: Patrocinador.ID,
                            Patrocinador: Patrocinador.Nombre,
                            Cantidad: CantidadP,
                            Porcentaje: `${Percentage}%`,
                            Especie: Especie,
                            TipoEspecie: TipoEspecie
                        }
                        data.push(addItem);
                        dispatchSuccessful("load::PorcentajesGastos", data, PAGE_ID);
                        Forms.reset(SECCIONPATROCINADORESADD)
                    }
                    //let addItem = {
                    //    IdPatrocinador: Patrocinador.ID,
                    //    Patrocinador: Patrocinador.Nombre,
                    //    Cantidad: CantidadP,
                    //    Porcentaje: `${Percentage}%`
                    //}

                    //data.push(addItem);
                    //dispatchSuccessful("load::PorcentajesGastos", data, PAGE_ID);

                } else {
                    if (isNaN(CantidadP)) {
                        CantidadP = 0
                    }
                    let Percentage = CantidadP > 0 ? (CantidadP / Gastos) * 100 : CantidadP;
                    Percentage = Percentage > 0 ? +Percentage.toFixed(2) : Percentage;

                    if (isModeEdit) {
                        let evento = getData(EK.Store.getState().global.itemEventoCapturaLoad)
                        let parametros = global.assign({
                            IDEVENTO: evento.ID,
                            IDPATROCINADOR: Patrocinador.ID,
                            CANTIDAD: CantidadP,
                            PORCENTAJE: Percentage,
                            ESPECIE: Especie,
                            TIPOESPECIE: TipoEspecie
                        })
                        global.asyncPost("base/kontrol/EventosActividades/GetBP/SavePatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    let addItem = {
                                        Id: res,
                                        IdPatrocinador: Patrocinador.ID,
                                        Patrocinador: Patrocinador.Nombre,
                                        Cantidad: CantidadP,
                                        Porcentaje: `${Percentage}%`,
                                        Especie: Especie,
                                        TipoEspecie: TipoEspecie
                                    }
                                    data.push(addItem);
                                    dispatchSuccessful("load::PorcentajesGastos", data, PAGE_ID);
                                    Forms.updateFormElement("Patrocinador", null, SECCIONPATROCINADORESADD)
                                    Forms.updateFormElement("CantidadP", null, SECCIONPATROCINADORESADD)
                                    Forms.updateFormElement("Especie", null, SECCIONPATROCINADORESADD)
                                    Forms.updateFormElement("TipoEspecie", null, SECCIONPATROCINADORESADD)
                                    Forms.reset(SECCIONPATROCINADORESADD)
                                    success("Se agrego correctamente", "Exito");
                                    break;
                                case AsyncActionTypeEnum.loading: break;
                                case AsyncActionTypeEnum.failed: break;
                            }
                        });
                    } else {
                        let addItem = {
                            IdPatrocinador: Patrocinador.ID,
                            Patrocinador: Patrocinador.Nombre,
                            Cantidad: CantidadP,
                            Porcentaje: `${Percentage}%`,
                            Especie: Especie,
                            TipoEspecie: TipoEspecie
                        }

                        console.log(addItem)
                        data.push(addItem);
                        dispatchSuccessful("load::PorcentajesGastos", data, PAGE_ID);
                        Forms.reset(SECCIONPATROCINADORESADD)
                    }
                }
            }
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let enableEspecie = isSuccessful(this.props.Especie) ? getData(this.props.Especie) : null;
            let color: string = "white";
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditPatrocinadores);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditPatrocinadores.data.modeEditPatrocinadores
            }
            return <modal.Modal id="ModalPatrocinadores" header={"Patrocinadores"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <ddl.Patrocinadores id="Patrocinador" label="PATROCINADOR" idFormSection={SECCIONPATROCINADORESADD} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />
                        <input.Currency id="CantidadP" label="Cantidad" idFormSection={SECCIONPATROCINADORESADD} size={[12, 12, 4, 4]} />
                        <checkBox.CheckBox id={"Especie"} idFormSection={SECCIONPATROCINADORESADD} label={"En Especie"} size={[12, 12, 2, 2]} validations={[validations.required()]} required={true} />
                        {
                            enableEspecie ?
                                <input.Text id="TipoEspecie" label="Tipo" idFormSection={SECCIONPATROCINADORESADD} size={[12, 12, 12, 12]} />
                                : null
                        }

                        {
                            !isModeEdit ?
                                <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Agregar"} onClick={this.onPatrocinadores} style={{ marginRight: 10, marginTop: 5, color, backgroundColor: "#4EC9A2" }} />
                                : null
                        }

                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // MODAL CRUD PATROCINADORES
    //========================================================================
    const ModalCrudPatrocinadores: any = global.connect(class extends React.Component<IEventosActividadesCaptura, IEditState>{
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
            return <div className="modal-footer">
                <button type="button" className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onPatrocinadoresCrud() {
            let Patrocinador = Forms.getValue("NombrePatrocinador", SECCIONPATROCINADORES)
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
            if (Patrocinador === null || Patrocinador === undefined || Patrocinador === "") {
                warning("El campo es obligatorio", "Atención");
                return;
            }
            //var validate = RegexLetters.test(Patrocinador);
            //if (!validate) {
            //    warning("La Descripción contiene caracteres no validos", "Aviso")
            //    return
            //}
            let parametros = global.assign({
                ID: idPatrocinador,
                NOMBRE: Patrocinador,
                NOMBREOLD: NombreOld,
                OPERACION: Operacion,
            });
            //  console.log(parametros)
            global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPatrocinadores/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::savePatrocinadores", { Save: true }, PAGE_ID)
                            dispatchSuccessful("load::modeEditPatrocinadores", { modeEditPatrocinadores: false }, PAGE_ID);
                            success(data[0].msg, "Exito");
                            Forms.reset(SECCIONPATROCINADORES)
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
                                Forms.reset(SECCIONPATROCINADORES)
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
            Forms.reset(SECCIONPATROCINADORES);
            dispatchSuccessful("load::modeEditPatrocinadores", { modeEmodeEditPatrocinadoresditPA: false }, PAGE_ID);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEditPatrocinadores)) {
                isModeEdit = this.props.modeEditPatrocinadores.data.modeEditPatrocinadores;
            }
            return <modal.Modal id="ModalPatrocinadoresCrud" header={"Catalogo Patrocinadores"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 6, 6]}>
                        <input.Text id="NombrePatrocinador" label="Nombre patrocinador" idFormSection={SECCIONPATROCINADORES} size={[12, 12, 12, 12]} />
                    </Column>
                    <Column size={[12, 12, 6, 6]}>
                        <Button id={"btnAdd"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Guardar" icon="fa fa-plus" onClick={this.onPatrocinadoresCrud} style={{ color, backgroundColor: "#36C6D3" }} />
                        {isModeEdit ? <div><div>
                            <Button id={"btnDelete"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Eliminar" icon="fa fa-trash" onClick={this.onPatrocinadoresCrudDelete} style={{ color, backgroundColor: "#F1675E" }} />
                        </div><div>
                                <Button id={"btnCancel"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Cancelar" icon="fa fa-times" onClick={this.onCancel} style={{ color, backgroundColor: "#FFD96A" }} />
                            </div></div> : null}
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <span><b><i><small>Doble click sobre fila para editar o eliminar registro</small></i></b></span>
                        <div id="datagroupContainerPatrocinadoresCrud" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // COMPONENTES
    //========================================================================

};
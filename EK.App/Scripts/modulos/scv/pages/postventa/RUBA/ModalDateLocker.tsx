namespace EK.Modules.SCV.Pages.postventa.RUBA.ModalDateLocker {
    "use strict";
    const AGENDA_BLOQUEOS_ID = "AgendaBloqueo";
    const AGENDA_CATS_BLOQUEAR_FECHA: string = "AgendaBloqueo$Cats";
    const AGENDA_FECHAS_BLOQUEADAS: string = "AgendaBloqueo$Fechas";

    interface IModalDLProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        IdFoto: any;
        cat: any;
    };

    export let ModalDateLockerBase: any = global.connect(class extends React.Component<IModalDLProps, {}> {
        constructor(props: IModalDLProps) {
            super(props);
        };

        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalDateLockerComponent {...this.props} />
            </Column>
        };
    });


    let ModalDateLockerComponent: any = global.connect(class extends React.Component<IModalDLProps, {}> {
        constructor(props: IModalDLProps) {
            super(props);
        };

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            //entidad: state.forms[SECTION_CONCEPTO_ID],
            cat: state.global.CatSeleccionado,
            //data: global.getData(state.global.currentCatalogo),
            //stateSearching: global.getData(state.global.searchingDataState)
        });
        refs: {
            modal: Element;
        };

        onClose(): void {
            //Forms.updateFormElement(REPORTE_AUTORIZAR_INCIDENCIA, "NoGerente", []);
           // Forms.updateFormElement(REPORTE_AUTORIZAR_INCIDENCIA, "ClaveGerente", []);
           // let modal: any = $("#ModalAutorizarIncidencia");
           // modal.modal("hide");
        };

      

        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                <div>
                 
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        };
        header(info: any): JSX.Element {

            return <div style={{ background: '#FFAB00' }}>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };

        componentDidMount() {
            // dispatchAsyncPost("load::testNewValue", "CapturaFechaConstruccion/GetMotivosCancelacionFolio/",{ parametros: p });
            // dispatchAsyncPost("load::SPVMOTIVOS", "base/scv/ReportesFallas/Get/GetMotivosCancelacionFolio/");
            //dispatchAsyncPost("load::SPVMOTIVOS", "scv/reportesFallas/GetMotivosCancelacionFolio/");
            //Forms.updateFormElement(AGENDA_BLOQUEOS_ID, "UsuarioPlaza", null);
            //let cat = this.props.cat;
            //console.log(cat);
            //Forms.updateFormElement(AGENDA_BLOQUEOS_ID, 'UsuarioPlaza', [])
        }

        deleteFechaCat(fecha) {
            let idFecha = fecha.row.data.ID;
            let IdUsuario = fecha.row.data.IdUsuario;
            //console.log(fecha.row.data)
            let encodedFilters = global.encodeObject({ IdFecha: idFecha, IdUsuario});

            EK.Global.confirm("¿Desea Eliminar el siguiente registro?", "Eliminar Fecha", (isConfirm: any) => {
                if (isConfirm === true) {

                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');
                    global.asyncGet("base/scv/agendaSPV/Get/DeleteFechasBloqueadasCat/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                // console.log(data)
                                let columnas = [
                                    { caption: "Fecha Inicial Bloqueo", dataField: "FechaBloqueoIni", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },
                                    { caption: "Fecha Final Bloqueo", dataField: "FechaBloqueoFin", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },                                    { caption: "Estatus", dataField: "activo" },
                                    {
                                        caption: 'Eliminar fecha', type: "buttons", width: 120, alignment: "center",
                                        buttons: ["Eliminar", {
                                            text: "Borrar fecha",
                                            icon: "trash",
                                            color: '#000',
                                            hint: "Eliminar fecha",
                                            onClick: (e) => {
                                                this.deleteFechaCat(e);
                                            }
                                        }]
                                    }
                                ];
                                global.loadDxGridTable('datagroupContainerFechasBloqueadas', columnas, data);
                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                                loadedTable.style.display = 'none';

                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';

                                break;
                        }
                    });
                };
            });
        }

        getFormatDate(fecha: any) {
            let newDate = new Date(fecha);
            let _dia = newDate.getDate();
            let _mes = newDate.getMonth();
            let _anio = newDate.getFullYear();
            let horas = newDate.getHours();
            let minutos = newDate.getMinutes();

            let nuevaFecha = new Date(_anio, _mes, _dia, horas, minutos);
            //console.log(nuevaFecha.toISOString())
            return nuevaFecha.toString();
        }

        saveFechaBloqueadaCat() {
          
            let item: any = Forms.getForm(AGENDA_BLOQUEOS_ID);
            if (!item.UsuarioPlaza || item.UsuarioPlaza === null || item.UsuarioPlaza === undefined) {
                global.warning("Seleccione un usuario para continuar");
                return;
            }

            let newDateIni = new Date(item.FechaInicio);
            let newDateFin = new Date(item.FechaFin);
      
            let horasI = newDateIni.getHours();
            let minutosI = newDateIni.getMinutes();
            let horasF = newDateFin.getHours();
            let minutosF = newDateFin.getMinutes();

            let filtros = {
                FechaBIni: newDateIni,
                FechaBFin: newDateFin,
                IdUsuario: item.UsuarioPlaza.Clave,
                HorasIni: horasI,
                HorasFin: horasF,
                MinutosIni: minutosI,
                MinutosFin: minutosF
            }

            if (newDateIni.getTime() > newDateFin.getTime()) {
                global.warning("La Fecha Inicial no puede ser mayor a la Fecha Final");
                return;
            }

            EK.Global.confirm("¿Desea guardar la siguiente información?", "Guardar Fecha", (isConfirm: any) => {
                if (isConfirm === true) {
                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');
                    global.asyncPost("base/kontrol/agendaSPV/GetBP/SaveFechasBloqueadasCat", {parametros: filtros}, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                //console.log(data)
                                if (data && data.length > 0) {
                                    if (data[0].ID === -2 && data[0].Clave === 'ERR-FND') {
                                        loader.style.display = 'none';
                                        loadedTable.style.display = 'block';
                                        global.info('El usuario ya tiene fechas agendadas en el rango seleccionado');
                                        return;
                                    } else {
                                          let columnas = [
                                            { caption: "Fecha Inicial Bloqueo", dataField: "FechaBloqueoIni", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },
                                            { caption: "Fecha Final Bloqueo", dataField: "FechaBloqueoFin", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },                                    { caption: "Estatus", dataField: "activo" },
                                            {
                                                caption: 'Eliminar fecha', type: "buttons", width: 120, alignment: "center",
                                                buttons: ["Eliminar", {
                                                    text: "Borrar fecha",
                                                    icon: "trash",
                                                    color: '#000',
                                                    hint: "Eliminar fecha",
                                                    onClick: (e) => {
                                                        this.deleteFechaCat(e);
                                                    }
                                                }]
                                            }
                                        ];
                                        global.loadDxGridTable('datagroupContainerFechasBloqueadas', columnas, data);
                                    }
                                }
                               
                              
                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                                loadedTable.style.display = 'none';

                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';

                                break;
                        }
                    });
                };
            });

            
        }

        shouldComponentUpdate(nextProps: IModalDLProps, nextState: IModalDLProps): any {
      
            if (isSuccessful(this.props.cat) && isSuccessful(nextProps.cat) ) {
                if (global.hasChanged(this.props.cat.data, nextProps.cat.data)) {
                    return true;
                }
            }
            return false;
        }

        componentWillReceiveProps(nextProps: IModalDLProps): void {
            if (!isSuccessful(this.props.cat) && isSuccessful(nextProps.cat)) {
               // console.log('cambio y obtener fechas', nextProps.cat.data.Clave )
                let encodedFilters = global.encodeObject({ IdUsuario: nextProps.cat.data.Clave });
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                global.asyncGet("base/scv/agendaSPV/Get/GetListaFechasUsuario/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                           // console.log(data)
                            let columnas = [
                                { caption: "Fecha Inicial Bloqueo", dataField: "FechaBloqueoIni", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },
                                { caption: "Fecha Final Bloqueo", dataField: "FechaBloqueoFin", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },                                { caption: "Estatus", dataField: "activo" },
                                {
                                    caption: 'Eliminar fecha', type: "buttons", width: 120, alignment: "center",
                                    buttons: ["Eliminar", {
                                        text: "Borrar fecha",
                                        icon: "trash",
                                        color: '#000',
                                        hint: "Eliminar fecha",
                                        onClick: (e) => {
                                            this.deleteFechaCat(e);

                                        }
                                    }]
                                }
                            ];
                            global.loadDxGridTable('datagroupContainerFechasBloqueadas', columnas, data);
                            break;
                        case AsyncActionTypeEnum.loading:
                            loader.style.display = 'block';
                            loadedTable.style.display = 'none';

                            break;
                        case AsyncActionTypeEnum.failed:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'none';

                            break;
                    }
                });
            }
            if (isSuccessful(this.props.cat) && isSuccessful(nextProps.cat)) {
                if (global.hasChanged(this.props.cat.data, nextProps.cat.data)) {
                    //console.log('obtener fechas del usuario', nextProps.cat.data.Clave)
                    let encodedFilters = global.encodeObject({ IdUsuario: nextProps.cat.data.Clave });
                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');
                    global.asyncGet("base/scv/agendaSPV/Get/GetListaFechasUsuario/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                //console.log(data)

                                let columnas = [
                                    { caption: "Fecha Inicial Bloqueo", dataField: "FechaBloqueoIni", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },
                                    { caption: "Fecha Final Bloqueo", dataField: "FechaBloqueoFin", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },                                    { caption: "Estatus", dataField: "activo" },
                                    {
                                        caption: 'Eliminar fecha', type: "buttons", width: 120, alignment: "center",
                                        buttons: ["Eliminar", {
                                            text: "Borrar fecha",
                                            icon: "trash",
                                            color: '#000',
                                            hint: "Eliminar fecha",
                                            onClick: (e) => {
                                                this.deleteFechaCat(e);
                                            }
                                        }]
                                    }
                                ];
                                global.loadDxGridTable('datagroupContainerFechasBloqueadas', columnas, data);
                                break;
                            case AsyncActionTypeEnum.loading:
                                loader.style.display = 'block';
                                loadedTable.style.display = 'none';
                             
                                break;
                            case AsyncActionTypeEnum.failed:
                                loader.style.display = 'none';
                                loadedTable.style.display = 'none';

                                break;
                        }
                    });
                }
            }
        }

        cambiarUsuarioSeleccionado(item) {
            //console.log(item)
            global.dispatchSuccessful('load::CatSeleccionado', item);
        }

        render(): JSX.Element {
          
            let CurrentUser: any = getData(EK.Store.getState().global.app).Me;
           // let dataBloqueos = EK.Store.getState().global.catalogo$AgendaBloqueo$Fechas !== undefined ? EK.Store.getState().global.catalogo$AgendaBloqueo$Fechas.data : [];
           // console.log(dataBloqueos)
            const listHeaderBloqueo: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center"></Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header text-center">{"ID"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">{"IdUsuario"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header text-center">{"FechaBloqueo"}</Column>
                        <Column size={[6, 6, 6, 6]} className="list-default-header text-center">{"activo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header text-center">&nbsp;</Column>

                    </Row>
                </Column>
            //console.log(CurrentUser);
            //let ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/unitpricesimage/" + EK.Store.getState().global.ImageValueURI.data : null;
            return <modal.Modal id="ModalDateLocker" header={this.header("Bloquear fechas de CAT")} style={{ width: '500px' }} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <ddl.SPVCatsPlazaDDL id="UsuarioPlaza" change={this.cambiarUsuarioSeleccionado.bind(this)} idFormSection={AGENDA_BLOQUEOS_ID} 
                        style={{ "marginTop": "-5px" }} size={[5, 5, 5, 5]} required={true} validations={[validations.required()]} />
                    <DatePicker id={"FechaInicio"} label={"Fecha Inicio"} minuteStep={30} daysOfWeekDisabled={[0]} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={AGENDA_BLOQUEOS_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} validations={[validations.required()]} />
                    <DatePicker id={"FechaFin"} label={"Fecha Fin"} minuteStep={30} daysOfWeekDisabled={[0]} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={AGENDA_BLOQUEOS_ID} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} validations={[validations.required()]} />
                    <br />
                    <button type="button" onClick={() => this.saveFechaBloqueadaCat()} className="btn btn-xs dark btn-outline btn-md green">Guardar</button>


                </Row>
                <div>
                    <hr />
                    <Row>
                            <div ><Column size={[12, 12, 12, 12]}>

                                <br />
                                <div id="loading" style={{ display: 'none' }}>
                                    <Updating text="" />
                                </div>

                                <div id="loadedData" style={{ background: '#fff', display: 'inherit' }}>

                                    <div id="datagroupContainerFechasBloqueadas" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                    </div>
                                </div>

                            </Column>
                        </div>
                    </Row>
                </div>
                
            </modal.Modal>
        }
    });


};

import ModalDateLockerA = EK.Modules.SCV.Pages.postventa.RUBA.ModalDateLocker.ModalDateLockerBase;
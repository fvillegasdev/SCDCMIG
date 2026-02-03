
namespace EK.Modules.SCV.Pages.postventa.RUBA.AgendaDashBoardEntregaVivienda {
    const PAGE_filtro_ID: string = "AgendaDashBoardEntregaVivienda";

    interface IAgendaDashBoardEntregaVivienda extends page.IProps {
        indicadoresUsuarios?: DataElement;
        TipoAgendaSeleccionada?: any;
        EstadoSeleccionado?: any;
        PlazaSeleccionado?: any;
        indicadoresEstados?: DataElement;
        pageId?: string;
    };

    export const AgendaDashBoardEntregaViviendaGeneral: any = global.connect(class extends React.Component<IAgendaDashBoardEntregaVivienda, IAgendaDashBoardEntregaVivienda> {
        constructor(props: IAgendaDashBoardEntregaVivienda) {
            super(props);
            this.onClickElementHorizontal = this.onClickElementHorizontal.bind(this);
        };
        static props: any = (state: any) => ({
            indicadoresUsuarios: state.global.UsuariosAgenda,
            indicadoresEstados: state.global.dashBoardAgendaIndicadoresEstados,
            EstadoSeleccionado: state.global.EstatusAgendaSelected
        });
        componentWillReceiveProps(nextProps: IAgendaDashBoardEntregaVivienda) {
            if (hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado)) {
                if (global.isSuccessful(nextProps.EstadoSeleccionado)) {
                    let idPlazaSeleccionada: any = Forms.getValue("PlazaInicial", nextProps.pageId).ID;
                    let idTipoAgenda: any = Forms.getValue("TipoAgenda", nextProps.pageId).ID;
                    let estadoSeleccionadoNext: any = nextProps.EstadoSeleccionado ? getData(nextProps.EstadoSeleccionado).Clave : null;
                    let estadoSeleccionadoProps: any = this.props.EstadoSeleccionado ? getData(this.props.EstadoSeleccionado).Clave : null;

                    idTipoAgenda = idTipoAgenda == -2 ? null : idTipoAgenda;
                    idPlazaSeleccionada = idPlazaSeleccionada == -2 ? null : idPlazaSeleccionada;
                    let claveEstado: any = nextProps.EstadoSeleccionado ? getData(nextProps.EstadoSeleccionado).Clave : null;

                    let funcionAgenda: string = EK.Store.getState().global.funcionAgenda != null && EK.Store.getState().global.funcionAgenda != undefined && EK.Store.getState().global.funcionAgenda.data != null && EK.Store.getState().global.funcionAgenda.data != undefined && EK.Store.getState().global.funcionAgenda.data.tipo != null && EK.Store.getState().global.funcionAgenda.data.tipo != undefined ? EK.Store.getState().global.funcionAgenda.data.tipo : null;
                    let calendar: any = $('#AgendaDashBoard');
                    const fechaActualRender = calendar.fullCalendar('getDate').format();
                    let p: any = global.assign({
                        activos: 1, TipoAgenda: idTipoAgenda, IdPlaza: idPlazaSeleccionada, ClaveEstado: claveEstado, FuncionAgenda: funcionAgenda, FechaInicio: fechaActualRender
                    });
                   // console.log(p)
                    //console.log(fechaActualRender)

                    dispatchAsyncPost("load::UsuariosAgenda", "base/kontrol/agendaSPV/GetBP/getUsersCalendarDashBoard/", { parametros: p });

                    //dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/getUsersCalendarDashBoard/", { parametros: p }, "UsuariosBuscador");
                }
            }
        };
        shouldComponentUpdate(nextProps: IAgendaDashBoardEntregaVivienda, { }): boolean {
            return hasChanged(this.props.indicadoresEstados, nextProps.indicadoresEstados) ||
                hasChanged(this.props.indicadoresUsuarios, nextProps.indicadoresUsuarios) ||
                hasChanged(this.props.EstadoSeleccionado, nextProps.EstadoSeleccionado) ||
                this.props.pageId !== nextProps.pageId;
        };
        onClickElementHorizontal(item: any): void {
            let prevID: number = item && item.ID ? item.ID : null;
            if (prevID > 0) {
            } else {
                prevID = null
            }
            //console.log(item);
            global.dispatchSuccessful("load::UsuarioAgendaSelected", { item })
        };
        ClearForm(): any {
            Forms.updateFormElement(this.props.pageId, "Buscador", {});
        }

        deleteFechaCat(fecha) {
            let idFecha = fecha.row.data.ID;
            let IdUsuario = fecha.row.data.IdUsuario;
            //console.log(fecha.row.data)
            let encodedFilters = global.encodeObject({ IdFecha: idFecha, IdUsuario });

            EK.Global.confirm("¿Desea Eliminar el siguiente registro?", "Eliminar Fecha", (isConfirm: any) => {
                if (isConfirm === true) {

                    let loader = document.getElementById('loading');
                    let loadedTable = document.getElementById('loadedData');
                    global.asyncGet("base/scv/agendaSPV/Get/DeleteFechasBloqueadasCat/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
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
                };
            });
        }

        OpenDateLocker() {
          
            let modalDL: any = $("#ModalDateLocker");
            modalDL.modal({
                backdrop: 'static',
                keyboard: false
            }).on('hidden.bs.modal',  (e) => {
               // console.log('cerrar modal');
            });
            let item: any = Forms.getValue('UsuarioPlaza', 'AgendaBloqueo');
            if (item !== undefined && item !== null) {
                let encodedFilters = global.encodeObject({ IdUsuario: item.Clave });
                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                global.asyncGet("base/scv/agendaSPV/Get/GetListaFechasUsuario/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            //console.log(data)
                            let m = ModalDateLockerA.delete;
                            let columnas = [
                                { caption: "Fecha Inicial Bloqueo", dataField: "FechaBloqueoIni", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },
                                { caption: "Fecha Final Bloqueo", dataField: "FechaBloqueoFin", dataType: 'datetime', format: 'dd/MM/yyyy   HH:mm:ss' },
                                { caption: "Estatus", dataField: "activo" },
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
            //console.log(item)
        }

        //componentDidMount(): void {
        //    global.dispatchSuccessful("load::UsuariosAgenda", []);
        //    global.dispatchSuccessful("load::dashBoardAgendaIndicadoresEstados", null);

        //}
        componentWillMount(): void {
            global.dispatchSuccessful("load::UsuariosAgenda", []);
            global.dispatchSuccessful("load::dashBoardAgendaIndicadoresEstados", null);
        }
        render(): JSX.Element {
            let $page: any = $ml[''];
            let claveTipoAgenda: any = Forms.getValue("TipoAgenda", this.props.pageId) && Forms.getValue("TipoAgenda", this.props.pageId).Clave ? Forms.getValue("TipoAgenda", this.props.pageId).Clave : null;
            let funcionAgenda: any = getData(EK.Store.getState().global.funcionAgenda).tipo ? getData(EK.Store.getState().global.funcionAgenda).tipo : null;

            let nombreTipoAgenda: any = "Usuarios";
            let iconoUsuario: any = 'fas fa-user';

            switch (claveTipoAgenda) {
                case "EntregaVivienda":   // POSTVENTA - ENTREGA DE VIVIENDA
                    iconoUsuario = "fas fa-user";
                    nombreTipoAgenda = "Usuarios";
                    break;
                case "FechaConstruccion": // POSTVENTA - FECHA DE CONSTRUCCION
                    iconoUsuario = "fas fa-user";
                    nombreTipoAgenda = "Usuarios";
                    break;
                case "Contratista":       // POSTVENTA - CONTRATISTAS
                    iconoUsuario = "fas fa-user-tie";
                    nombreTipoAgenda = "Contratistas";
                    break;
                case "Dictamen":          // POSTVENTA - DICTAMENES
                    iconoUsuario = "fas fa-user";
                    nombreTipoAgenda = "Supervisores";
                    break;
                case "ContratistaAreasComunes":       // POSTVENTA - CONTRATISTAS AREAS COMUNES
                    iconoUsuario = "fas fa-user-tie";
                    nombreTipoAgenda = "Contratistas";
                    break;
                case "DictamenAreasComunes":          // POSTVENTA - DICTAMENES AREAS COMUNES
                    iconoUsuario = "fas fa-user";
                    nombreTipoAgenda = "Supervisores";
                    break;
            }

            let IndicaActualizando: any = isSuccessful(this.props.indicadoresUsuarios) ? '' : <AwesomeSpinner paddingTop={50} size={40} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />;
            let itemsModificados: DataElement = this.props.indicadoresUsuarios;
            if (isSuccessful(this.props.indicadoresUsuarios)) {
                let nuevoItem: any = {};
                let nuevoItemFase: any = {};
                let nuevoElemento: any = 'SI';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave === 'TODOS') {
                        nuevoElemento = 'NO'
                    }
                }
                if (nuevoElemento === 'SI') {
                    nuevoItemFase['ID'] = null;
                    nuevoItemFase['Clave'] = ' ';
                    nuevoItemFase['Nombre'] = ' ';
                    let totalFases: number = 0;
                    let totalCantidadActivas: number = 0;
                    let totalCantidadSuspendidas: number = 0;
                    let totalCantidadPorVencer: number = 0;
                    let totalCantidadVencidas: number = 0;
                    let totalCantidadAtendidas: number = 0;
                    let totalCantidadReprogramadas: number = 0;

                    getData(this.props.indicadoresUsuarios).forEach((value: any, index: number): any => {
                        totalCantidadActivas += value.CantidadActivas;
                        totalCantidadSuspendidas += value.CantidadSuspendidas;
                        totalCantidadPorVencer += value.CantidadPorVencer;
                        totalCantidadVencidas += value.CantidadVencidas;
                        totalCantidadAtendidas += value.CantidadAtendidas;
                        totalCantidadReprogramadas += value.CantidadReprogramadas;
                    });
                    nuevoItem['ID'] = null;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    nuevoItem['Fase'] = nuevoItemFase;
                    nuevoItem['CantidadActivas'] = totalCantidadActivas;
                    nuevoItem['CantidadSuspendidas'] = totalCantidadSuspendidas;
                    nuevoItem['CantidadPorVencer'] = totalCantidadPorVencer;
                    nuevoItem['CantidadVencidas'] = totalCantidadVencidas;
                    nuevoItem['CantidadReprogramadas'] = totalCantidadReprogramadas;
                    nuevoItem['CantidadAtendidas'] = totalCantidadAtendidas;

                    itemsModificados.data.unshift(nuevoItem);
                }
                IndicaActualizando = '';
            }
            let niveles = [1, 84];
            let CurrentUser: any = getData(EK.Store.getState().global.app).Me;
            let columnSize1 = niveles.filter(x => x === CurrentUser.NivelUsuario)[0] !== undefined ? [2, 2, 2, 2] : [];
            let columnSize2 = niveles.filter(x => x === CurrentUser.NivelUsuario)[0] !== undefined ? [10, 10, 10, 10] : [12,12,12,12];

            let items: DataElement = itemsModificados;
            let estiloPersonalizado: React.CSSProperties = {};
            return <div>
                <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                    <div className="portlet-body">
                        <Row className="timeline-expediente">
                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "20px" }} >
                                <span><i className={iconoUsuario}>&nbsp;</i><h5 style={{ margin: 0, display: "inline-block" }}> {nombreTipoAgenda} </h5></span>
                            </Column>
                            <Column size={[12, 12, 12, 12]} className="events-container">
                                {IndicaActualizando ? IndicaActualizando :
                                    <EKHorizontalTimeLine
                                        items={items}
                                        customScroll={true}
                                        onClickElementHorizontal={this.onClickElementHorizontal}
                                        desactivarFondo={true}
                                        page={$page}
                                        tipoPresentacion={3} />
                                }
                            </Column>
                        </Row>
                    </div>
                </div>
                {
                    columnSize1.length > 0 ?
                        <Column size={[2, 2, 2, 2]}>
                            <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                                <div className="portlet-body">
                                    <Row className="">
                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                            <span><i className="fas fa-ban">&nbsp;</i><h5 style={{ margin: 0, display: "inline-block" }}> Fechas CAT</h5></span>
                                        </Column>
                                        <Column size={[12, 12, 12, 12]} >
                                            <Button icon="fas fa-calendar-times" id="btnId4"
                                                className={"btn btn-sm btn-cr-info"} size={[12, 12, 1, 1]}
                                                style={{ marginTop: '20px' }} onClick={this.OpenDateLocker.bind(this)}> Bloquear fechas</Button>
                                            <br />
                                        </Column>

                                    </Row>
                                </div>
                            </div>
                        </Column>: null
                }
               

                <Column size={columnSize2}>
                    <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                        <div className="portlet-body">
                            <Row className="">
                                <Column size={[12, 12, 12, 12]} >
                                    <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                        <span><i className={iconoUsuario}>&nbsp;</i><h5 style={{ margin: 0, display: "inline-block" }}> {nombreTipoAgenda} </h5></span>
                                    </Column>
                                    <Column size={[12, 12, 12, 12]} className="events-container">
                                        {IndicaActualizando ? IndicaActualizando :
                                            <div>
                                                <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                    <UserSelected size={[12, 12, 11, 11]} />
                                                    <Button icon="fas fa-eraser" id="btnId3" className={"btn btn-xs btn-info"} size={[12, 12, 1, 1]} style={{ marginTop: '20px' }} onClick={this.ClearForm.bind(this)}> Limpiar</Button>
                                                </Column>
                                            </div>
                                        }
                                    </Column>
                                </Column>

                            </Row>
                        </div>
                    </div>
                </Column>
                <ModalDateLockerA size={[12, 12, 12, 12]} />


            </div>;
        }
    });
    export class UserSelected$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        constructor(props: any) {
            super(props);
            this.onchangeElementoBuscador = this.onchangeElementoBuscador.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.catalogo$UsuariosBuscador,
        });

        static defaultProps: ddl.IDropDrownListProps = {
            id: "Buscador",
            items: createDefaultStoreObject([]),
            label: "Busqueda rapida:",
            helpLabel: "Seleccione el elemento.",
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
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.ID,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.ID,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        shouldComponentUpdate(nextProps: ddl.IDropDrownListProps, nextState: ddl.IDropDrownListProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            //dispatchAsync("load::catalogo$UsuariosBuscador", "catalogos/get(catalogo$UsuariosBuscador)");
        };
        onchangeElementoBuscador(item: any): any {
            dispatchSuccessful("load::Buscador_seleccionado", { item });
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === null) {
                        existeItemTodos = true;
                        break;
                    };
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = null;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    };
                };
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoBuscador}/*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const UserSelected: any = ReactRedux.connect(UserSelected$DDL.props, null)(UserSelected$DDL);
};

import AgendaDashBoardEntregaVivienda = EK.Modules.SCV.Pages.postventa.RUBA.AgendaDashBoardEntregaVivienda.AgendaDashBoardEntregaViviendaGeneral; 
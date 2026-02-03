namespace EK.Modules.SCV.Pages.postventa.RUBA.EventosActividades {
    "use strict";
    const PAGE_ID = "EventosActividades";
    const POSIBLESALIANZAS = "POSIBLESALIANZAS";
    const OBSERVACIONESREQ = "OBSERVACIONES";
    const PERMISOS = "PERMISOS";
    const INVITADOSESPECIALES = "INVITADOSESPECIALES";
    const TotalEncuestaYFracc = "TotalEncuestaYFracc";
    declare const DevExpress: any;
    //export const RegexLetters = /^[A-Za-z\s]+$/
    export const RegexLetters = /^[A-Za-z0-9\s\.\,\ñ\ÑÀ-ÿ\!\?\$\&\'\"\:\(\)\/\¿\¡\;]+$/
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [POSIBLESALIANZAS, OBSERVACIONESREQ, PERMISOS, INVITADOSESPECIALES]);

    interface IEventosActividades extends page.IProps {
        modeEditPA?: any,
        modeEditIE?: any,
        modeEditGeneral: any,
        invitadosEspeciales: any,
        ObservacionesRequerimientos: any,
        Permisos: any,
        PosiblesAlianzas: any,
        PosiblesAlianzasAdded: any,
        PosiblesAlianzasSave: any,
        initTableSpecialGuest?: (data: any) => void,
        initListSelectPosiblesAlianzas?: (data: any) => void,
        initTableSelectedPosiblesAlianzas?: (data: any) => void,
        loadCatalogoPA: () => void,
        initListPosiblesAlianzasAdded: (data: any) => void,
        initListObsReq: (data: any) => void,
        initListPermisos: (data: any) => void,
        loadEvent: (IdEvent: any) => void,
        entity: any,
        entityItem: any,
        // entityItemCaptura: any,
        loadDataEdit: any,
    };


    export let Vista = global.connect(class extends React.Component<IEventosActividades, {}> {
        constructor(props: IEventosActividades) {
            super(props);
            this.onsave = this.onsave.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditPA = state.global.modeEditPA;
            retValue.modeEditIE = state.global.modeEditIE;
            retValue.invitadosEspeciales = state.global.InvitadosEspeciales;
            retValue.ObservacionesRequerimientos = state.global.ObservacionesRequerimientos;
            retValue.PosiblesAlianzasAdded = state.global.PosiblesAlianzasAdded;
            retValue.Permisos = state.global.Permisos;
            retValue.PosiblesAlianzasSave = state.global.PosiblesAlianzasSave;
            retValue.PosiblesAlianzas = state.global.PosiblesAlianzas;
            retValue.modeEditGeneral = state.global.modeEditGeneral;
            retValue.entity = state.global.entity;
            // retValue.entityItemCaptura = state.global.entityItemCaptura;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            initTableSpecialGuest: (data: any): void => {
                //console.log(data)
                let dataGrid = $("#datagroupContainer").dxDataGrid({
                    dataSource: data,
                    allowColumnReordering: true,
                    onRowPrepared: function (event) {
                        $(event.rowElement).on('dblclick', function () {
                            dispatchSuccessful("load::itemDataInvitadoEspecial", event.data, PAGE_ID);
                            dispatchSuccessful("load::modeEditIE", { modeEditIE: true }, PAGE_ID);
                            Forms.updateFormElement(INVITADOSESPECIALES, "NombreInvitado", event.data.Nombre);
                            Forms.updateFormElement(INVITADOSESPECIALES, "ApellidoPaterno", event.data.ApellidoPaterno);
                            Forms.updateFormElement(INVITADOSESPECIALES, "ApellidoMaterno", event.data.ApellidoMaterno);
                            Forms.updateFormElement(INVITADOSESPECIALES, "CargoInvitado", event.data.Cargo);
                            Forms.updateFormElement(INVITADOSESPECIALES, "ConfirmoInvitado", event.data.Confirmo ? 'SIInvitado' : 'NOInvitado');
                            let modal: any = $("#InvitadosEspeciales");
                            modal.modal();
                        }).on('remove', function () {
                            //on remove event in jquery ui libraries or 
                            $(this).off('dblclick remove');
                        })
                    },
                    scrolling: {
                        columnRenderingMode: "virtual"
                    },
                    sorting: {
                        mode: "multiple" // or "multiple" | "none"
                    },
                    columnAutoWidth: true,
                    showBorders: false,
                    grouping: {
                        autoExpandAll: false,
                    },
                    searchPanel: {
                        visible: false
                    },
                    paging: {
                        pageSize: 15
                    },
                    pager: {
                        showPageSizeSelector: false,
                        allowedPageSizes: [10, 15, 25],
                        showInfo: true
                    },
                    groupPanel: {
                        visible: false
                    },
                    columns: [
                       // { caption: "ID", dataField: "ID", alignment: 'left' },
                        { caption: "NOMBRE", dataField: "FullNombre", alignment: 'left' },
                        { caption: "CARGO", dataField: "Cargo", alignment: 'left' },
                        { caption: "CONFIRMÓ", dataField: "Confirmo", alignment: 'left' },
                    ],
                    columnFixing: { enabled: true },
                    showColumnLines: false,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    selection: {
                        mode: "single"
                    },
                }).dxDataGrid("instance");

            },
            loadCatalogoPA() {
                let parametros = global.assign({
                    OPERACION: 'SELECT'
                })
                //console.log(parametros)
                global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPosiblesAlianzas/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            dispatchSuccessful("load::PosiblesAlianzas", data, PAGE_ID)
                            let dataGrid2 = $("#datagroupContainer2").dxDataGrid({
                                dataSource: data,
                                allowColumnReordering: true,
                                onRowPrepared: function (event) {
                                    $(event.rowElement).on('dblclick', function () {
                                        dispatchSuccessful("load::itemDataPosiblesAlianzas", event.data, PAGE_ID);
                                        dispatchSuccessful("load::modeEditPA", { modeEditPA: true }, PAGE_ID);
                                        // console.log(event.data)
                                        Forms.updateFormElement(POSIBLESALIANZAS, "DescripcionPA", event.data.Nombre);
                                        //console.log(event.data)
                                    }).on('remove', function () {
                                        //on remove event in jquery ui libraries or 
                                        $(this).off('dblclick remove');
                                    })
                                },
                                scrolling: {
                                    columnRenderingMode: "virtual"
                                },
                                sorting: {
                                    mode: "multiple" // or "multiple" | "none"
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
                                    { caption: "Id", dataField: "ID", alignment: 'left' },
                                    { caption: "Descripción", dataField: "Nombre", alignment: 'left' },
                                ],
                                columnFixing: { enabled: true },
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
            //initListSelectPosiblesAlianzas: (data: any): void => {
            //    const listWidget = $('#listPosiblesAlianzasView').dxList({
            //        dataSource: data,
            //        itemTemplate(data) {
            //            return $('<div>').text(data.Descripcion);
            //        },
            //        height: 300,
            //        searchEnabled: true,
            //        showSelectionControls: true,
            //        searchExpr: 'Descripcion',
            //        selectionMode: 'multiple',
            //        onSelectionChanged() {
            //            $('#selectedItemKeys').text(listWidget.option('selectedItemKeys').join(', '));
            //        },
            //        onOptionChanged: function (e) {
            //            dispatchSuccessful("load::PosiblesAlianzasAdded", e.value, PAGE_ID);
            //        }
            //    }).dxList('instance');
            //},
            initListPosiblesAlianzasAdded: (data: any): void => {
                let store = data.map(x => { return { ID: x.ID, Descripcion: x.Nombre } })
                let ListAddedPA = $('#ListAddedPA').dxList({
                    dataSource: store,
                    height: 150,
                    noDataText: "Sin datos para mostrar",
                    searchEnabled: false,
                    allowItemReordering: true,
                    allowItemDeleting: true,
                    itemDeleteMode: 'static',
                    itemTemplate(store) {
                        return $('<div>').text(store.Descripcion);
                    },
                    onItemDeleting: function (e) {
                        let entity;
                        let itemDataDeleted = e.itemData;
                        let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
                        let data = getData(EK.Store.getState().global.PosiblesAlianzasAdded);
                        //if (isModeEdit) {
                        //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
                        //        entity = getData(EK.Store.getState().global.entityItem);
                        //        let parametros = global.assign({
                        //            ID: entity.ID,
                        //            IDGENERICO: itemDataDeleted.ID,
                        //            OPERACION: 'DELETEPOSIBLEALIANZAEVENTO'
                        //        })
                        //        global.asyncPost("base/kontrol/EventosActividades/GetBP/DeleteUpdateRelsEvento/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                        //            switch (status) {
                        //                case AsyncActionTypeEnum.successful:
                        //                    break;
                        //                case AsyncActionTypeEnum.loading:
                        //                    break;
                        //                case AsyncActionTypeEnum.failed:
                        //                    break;
                        //            }
                        //        })
                        //    }
                        //}

                        let dataResult = data.filter(x => x.ID !== itemDataDeleted.ID);
                        // Handler of the "itemDeleting" event
                        dispatchSuccessful("load::PosiblesAlianzasAdded", dataResult, PAGE_ID);
                    },
                }).dxList('instance');
            },
            initListObsReq: (data: any): void => {
                let ListObsReq = $('#ListObsReq').dxList({
                    dataSource: data,
                    height: 150,
                    noDataText: "Sin datos para mostrar",
                    searchEnabled: false,
                    allowItemReordering: true,
                    allowItemDeleting: true,
                    itemDeleteMode: 'static',
                    itemTemplate(data) {
                        return $('<div>').text(data.DescripcionObsReq);
                    },
                    onItemDeleting: function (e) {
                        let entity;
                        let itemDataDeleted = e.itemData;
                        let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
                        let data = getData(EK.Store.getState().global.ObservacionesRequerimientos);
                        //if (isModeEdit) {
                        //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
                        //        entity = getData(EK.Store.getState().global.entityItem);
                        //        let parametros = global.assign({
                        //            IDGENERICO: itemDataDeleted.ID,
                        //            OPERACION: 'DELETEOBSREQ'
                        //        })
                        //        global.asyncPost("base/kontrol/EventosActividades/GetBP/DeleteUpdateRelsEvento/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                        //            switch (status) {
                        //                case AsyncActionTypeEnum.successful:
                        //                    break;
                        //                case AsyncActionTypeEnum.loading:
                        //                    break;
                        //                case AsyncActionTypeEnum.failed:
                        //                    break;
                        //            }
                        //        })
                        //    }
                        //}

                        let dataResult = data.filter(x => x.DescripcionObsReq !== itemDataDeleted.DescripcionObsReq);
                        // Handler of the "itemDeleting" event
                        dispatchSuccessful("load::ObservacionesRequerimientos", dataResult, PAGE_ID);
                    },
                }).dxList('instance');
            },
            initListPermisos: (data: any): void => {
                let ListObsReq = $('#ListPermisos').dxList({
                    dataSource: data,
                    height: 150,
                    noDataText: "Sin datos para mostrar",
                    allowItemDeleting: true,
                    itemDeleteMode: 'static',
                    itemTemplate(data) {
                        return $('<div>').text(data.Permiso);
                    },
                    onItemDeleting: function (e) {
                        let entity;
                        let itemDataDeleted = e.itemData;
                        let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
                        let data = getData(EK.Store.getState().global.ObservacionesRequerimientos);
                        //if (isModeEdit) {
                        //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
                        //        entity = getData(EK.Store.getState().global.entityItem);
                        //        let parametros = global.assign({
                        //            IDGENERICO: itemDataDeleted.ID,
                        //            OPERACION: 'DELETEPERMISOS'
                        //        })
                        //        global.dispatchAsyncPost("load::Delete", "base/kontrol/EventosActividades/GetBP/DeleteUpdateRelsEvento/", { parametros: parametros });
                        //    }
                        //}

                        let dataResult = data.filter(x => x.Permiso !== itemDataDeleted.Permiso);
                        // Handler of the "itemDeleting" event
                        dispatchSuccessful("load::ObservacionesRequerimientos", dataResult, PAGE_ID);
                    },
                }).dxList('instance');

            },
        })



        componentWillReceiveProps(nextProps: IEventosActividades): void {
            if (hasChanged(this.props.invitadosEspeciales, nextProps.invitadosEspeciales) && global.isSuccessful(nextProps.invitadosEspeciales)) {
                if (isSuccessful(nextProps.invitadosEspeciales)) {
                    let data: any = global.getData(nextProps.invitadosEspeciales);
                    this.props.initTableSpecialGuest(data)
                };
            };
            if (hasChanged(this.props.ObservacionesRequerimientos, nextProps.ObservacionesRequerimientos) && global.isSuccessful(nextProps.ObservacionesRequerimientos)) {
                if (isSuccessful(nextProps.ObservacionesRequerimientos)) {
                    let data: any = global.getData(nextProps.ObservacionesRequerimientos);
                    this.props.initListObsReq(data)
                };
            };
            if (hasChanged(this.props.Permisos, nextProps.Permisos) && global.isSuccessful(nextProps.Permisos)) {
                if (isSuccessful(nextProps.Permisos)) {
                    let data: any = global.getData(nextProps.Permisos);
                    this.props.initListPermisos(data)
                };
            };
            //SI SE AGREGO UNO NUEVO
            if (hasChanged(this.props.PosiblesAlianzasSave, nextProps.PosiblesAlianzasSave) && global.isSuccessful(nextProps.PosiblesAlianzasSave)) {
                if (isSuccessful(nextProps.PosiblesAlianzasSave)) {
                    let data: any = global.getData(nextProps.PosiblesAlianzasSave);
                    this.props.loadCatalogoPA();
                };
            };
            //if (hasChanged(this.props.PosiblesAlianzas, nextProps.PosiblesAlianzas) && global.isSuccessful(nextProps.PosiblesAlianzas)) {
            //    if (isSuccessful(nextProps.PosiblesAlianzas)) {
            //        let data: any = global.getData(nextProps.PosiblesAlianzas);
            //        this.props.initListSelectPosiblesAlianzas(data);
            //    };
            //};
            if (hasChanged(this.props.PosiblesAlianzasAdded, nextProps.PosiblesAlianzasAdded) && global.isSuccessful(nextProps.PosiblesAlianzasAdded)) {
                if (isSuccessful(nextProps.PosiblesAlianzasAdded)) {
                    let data: any = global.getData(nextProps.PosiblesAlianzasAdded);
                    this.props.initListPosiblesAlianzasAdded(data);
                };
            };
        }
        shouldComponentUpdate(nextProps: IEventosActividades, { }): boolean {
            return hasChanged(this.props.modeEditPA, nextProps.modeEditPA) ||
                hasChanged(this.props.modeEditIE, nextProps.modeEditIE) ||
                hasChanged(this.props.invitadosEspeciales, nextProps.invitadosEspeciales) ||
                hasChanged(this.props.ObservacionesRequerimientos, nextProps.ObservacionesRequerimientos) ||
                hasChanged(this.props.PosiblesAlianzasAdded, nextProps.PosiblesAlianzasAdded) ||
                hasChanged(this.props.Permisos, nextProps.Permisos) ||
                hasChanged(this.props.PosiblesAlianzasSave, nextProps.PosiblesAlianzasSave) ||
                hasChanged(this.props.PosiblesAlianzas, nextProps.PosiblesAlianzas) ||
                hasChanged(this.state, nextProps.state) ||
                hasChanged(this.props.modeEditGeneral, nextProps.modeEditGeneral) ||
                hasChanged(this.props.entity, nextProps.entity);
        };
        onsave(): any { }
        componentDidMount(): any {
            Forms.updateFormElement(PAGE_ID, "Fecha", global.getToday().toString());
            global.dispatchSuccessful("load::InvitadosEspeciales", []);
            global.dispatchSuccessful("load::ObservacionesRequerimientos", []);
            global.dispatchSuccessful("load::PosiblesAlianzasAdded", []);
            global.dispatchSuccessful("load::Permisos", []);
            dispatchSuccessful("load::PosiblesAlianzaSave", { Save: false }, PAGE_ID)
            dispatchSuccessful("load::modeEditPA", { modeEditPA: false }, PAGE_ID)
            dispatchSuccessful("load::modeEditIE", { modeEditIE: false }, PAGE_ID)
            dispatchSuccessful("load::modeEditGeneral", { modeEdit: false }, PAGE_ID)
            dispatchSuccessful("load::spin", { spin: false }, PAGE_ID)
            global.dispatchAsyncPost("load::PosiblesAlianzas", "base/kontrol/EventosActividades/GetBP/CrudPosiblesAlianzas/", { parametros: { OPERACION: "SELECT" } });
        };

        render(): JSX.Element {
            let totales = 0;
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "black";
            let isModeEdit;
            if (isSuccessful(this.props.modeEditGeneral)) {
                isModeEdit = this.props.modeEditGeneral.data.modeEdit;
            }
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <CreateEvent />
                {<CapturaEvento />}
                {<EVENTOSACTIVIDADESPPC/>}
                <ModalSpecialGuest />
                <ModalPosiblesAlianzas />
                <ModalPosiblesAlianzasCatalogo />
                <ModalObservacionesRequerimientos />
                <ModalPermisos />
                <ModalArchivos />
            </page.Main>;
        };
    });
    //========================================================================
    // CREATE EVENT
    //=========================================================================
    const CreateEvent: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onSaveEdit = this.onSaveEdit.bind(this);
            this.openModalArchivos = this.openModalArchivos.bind(this)
            $('#tooltip1').dxTooltip({
                target: '#product1',
                showEvent: 'mouseenter',
                hideEvent: 'mouseleave',
                hideOnOutsideClick: false,
            });
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.invitadosEspeciales = state.global.InvitadosEspeciales;
            retValue.ObservacionesRequerimientos = state.global.ObservacionesRequerimientos;
            retValue.PosiblesAlianzasAdded = state.global.PosiblesAlianzasAdded;
            retValue.Permisos = state.global.Permisos;
            retValue.modeEditGeneral = state.global.modeEditGeneral;
            retValue.entityItem = state.global.entityItem;
            retValue.entity = state.global.KontrolFileParametersCurrentEntity;
            retValue.entityType = state.global.KontrolFileParametersCurrentEntityType;
            retValue.loadDataEdit = Forms.getDataValue("EventosActividades", config.id, state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            loadEvent: (idEvent: any): void => {


            },
        })
        loadFields() {
            let model = Forms.getValue("BuscadorEvento", PAGE_ID)
            if (model.ID === -1) {
                warning("Seleccione un evento", "Atención")
                return;
            }
            let parametros = global.assign({
                ID: model.ID
            })
            dispatchSuccessful("load::spin", { spin: true }, PAGE_ID)

            global.asyncPost("base/kontrol/EventosActividades/GetBP/GetEventById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        dispatchSuccessful("load::entityItem", data, PAGE_ID)
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        dispatchSuccessful("load::spin", { spin: false }, PAGE_ID)
                        break;
                }
            })
        }
        shouldComponentUpdate(nextProps: IEventosActividades, { }): boolean {
            return hasChanged(this.props.modeEditPA, nextProps.modeEditPA) ||
                hasChanged(this.props.modeEditIE, nextProps.modeEditIE) ||
                hasChanged(this.props.invitadosEspeciales, nextProps.invitadosEspeciales) ||
                hasChanged(this.props.ObservacionesRequerimientos, nextProps.ObservacionesRequerimientos) ||
                hasChanged(this.props.PosiblesAlianzasAdded, nextProps.PosiblesAlianzasAdded) ||
                hasChanged(this.props.Permisos, nextProps.Permisos) ||
                hasChanged(this.props.PosiblesAlianzasSave, nextProps.PosiblesAlianzasSave) ||
                hasChanged(this.props.PosiblesAlianzas, nextProps.PosiblesAlianzas) ||
                hasChanged(this.state, nextProps.state) ||
                hasChanged(this.props.modeEditGeneral, nextProps.modeEditGeneral) ||
                hasChanged(this.props.entityItem, nextProps.entityItem) ||
                hasChanged(this.props.loadDataEdit, nextProps.loadDataEdit) ||
                hasChanged(this.props.entity, nextProps.entity);
        };
        componentWillReceiveProps(nextProps: IEventosActividades): void {
            //if (hasChanged(this.props.loadDataEdit, nextProps.loadDataEdit) && getDataID(this.props.loadDataEdit) !== getDataID(nextProps.loadDataEdit)) {
            //    if (isSuccessful(nextProps.loadDataEdit)) {
            //        let data: any = global.getData(nextProps.loadDataEdit);
            //        this.props.loadEvent(data.ID)
            //    };
            //};
            if (hasChanged(this.props.entityItem, nextProps.entityItem) && getDataID(this.props.entityItem) !== getDataID(nextProps.entityItem)) {
                if (isSuccessful(nextProps.entityItem) && nextProps.entityItem.data.ID !== undefined) {
                    this.props.config.setState({ viewMode: false });
                    let evento: any = global.getData(nextProps.entityItem);
                    dispatchSuccessful("load::KontrolFileParametersCurrentEntityType", { data: "EVENTOSDC" });
                    dispatchSuccessful("load::KontrolFileParametersCurrentEntity", { ID: evento.ID });

                    // console.log(evento)
                  //  Forms.updateFormElement(PAGE_ID, "EvenAct", evento.ClaveClasificacion);
                    Forms.updateFormElement(PAGE_ID, "IdEvento", evento.ID);
                    Forms.updateFormElement(PAGE_ID, "Nombre", evento.Nombre);
                    Forms.updateFormElement(PAGE_ID, "AlcanceEvento", evento.AlcanceEvento);
                    Forms.updateFormElement(PAGE_ID, "TipoEvento", evento.TipoEvento);
                    Forms.updateFormElement(PAGE_ID, "PlazaLabel", evento.Plaza);
                    Forms.updateFormElement(PAGE_ID, "FechaProgramacionLabel", evento.FechaProgramacion.toLocaleDateString());
                    Forms.updateFormElement(PAGE_ID, "Vocaciones", { ID: evento.IdTipoVivienda, Nombre: evento.TipoVivienda });
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", { ID: evento.IdFraccionamiento, Nombre: evento.Fraccionamiento });
                    Forms.updateFormElement(PAGE_ID, "NumeroStaff", evento.NumeroStaff);
                    Forms.updateFormElement(PAGE_ID, "MetaAsistencia", evento.MetaAsistencia);
                    Forms.updateFormElement(PAGE_ID, "MediosDifusion", { ID: evento.IdMediosDifusion });
                    Forms.updateFormElement(PAGE_ID, "FechaReprogramacion", evento.FechaReprogramacion);
                    Forms.updateFormElement(PAGE_ID, "MotivoRep", evento.MotivoReprogramacion);

                    Forms.updateFormElement(PAGE_ID, "Participantes", evento.Participantes ? 'PARTICIPANTESI' : 'PARTICIPANTENO');
                    Forms.updateFormElement(PAGE_ID, "Empresas", evento.Empresas ? 'EMPRESASI' : 'EMPRESANO');
                    Forms.updateFormElement(PAGE_ID, "Impacto", evento.ImpactoComunidad);
                    Forms.updateFormElement(PAGE_ID, "ClasificacionEvento", evento.ClasificacionEvento);
                    Forms.updateFormElement(PAGE_ID, "Volanteo", evento.Volanteo);
                    Forms.updateFormElement(PAGE_ID, "Prensa", evento.Prensa);
                    Forms.updateFormElement(PAGE_ID, "Perifoneo", evento.Perifoneo);
                    Forms.updateFormElement(PAGE_ID, "RedesSociales", evento.Redes);
                    Forms.updateFormElement(PAGE_ID, "CorreoElectronico", evento.Correo);
                    Forms.updateFormElement(PAGE_ID, "MediosComunicacion", evento.MediosComunicacion);

                    let posiblesAlianzas = evento.PosiblesAlianzas.map(x => { return { ID: x.ID, Nombre: x.Descripcion } })
                    dispatchSuccessful("load::PosiblesAlianzasAdded", posiblesAlianzas, PAGE_ID);

                    let invitados = evento.InvitadosEspeciales.map(x => {
                        return {
                            ID: x.ID,
                            FullNombre: `${x.Nombre} ${x.ApellidoPaterno} ${x.ApellidoMaterno}`,
                            Cargo: x.Cargo,
                            Confirmo: x.Confirmo,
                            Nombre: x.Nombre,
                            ApellidoPaterno: x.ApellidoPaterno,
                            ApellidoMaterno: x.ApellidoMaterno,
                        }
                    });
                    dispatchSuccessful("load::InvitadosEspeciales", invitados, PAGE_ID);
                    dispatchSuccessful("load::Permisos", evento.Permisos, PAGE_ID);
                    dispatchSuccessful("load::ObservacionesRequerimientos", evento.ObservacionesReq, PAGE_ID);

                    dispatchSuccessful("load::spin", { spin: false }, PAGE_ID)
                };
            };
        }
        onSaveGuestSpecial() {
            let model = Forms.getValues(PAGE_ID);
            let Nombre = model.NombreInvitado;
            let Cargo = model.CargoInvitado;
            let Confirmo = model.ConfirmoInvitado == "SIInvitado" ? true : false;
            let data = getData(EK.Store.getState().global.InvitadosEspeciales);
            let invitados = {
                Nombre,
                Cargo,
                Confirmo
            }
            data.push(invitados)


            dispatchSuccessful("load::invitadosEspeciales", data);

        }

        openModal() {
            Forms.reset(INVITADOSESPECIALES)
            dispatchSuccessful("load::modeEditIE", { modeEditIE: false }, PAGE_ID)
            let modal: any = $("#InvitadosEspeciales");
            modal.modal();
        }
        openModalPosiblesAlianzas() {
            //dispatchSuccessful("load::PosiblesAlianzasAdded", e.value, PAGE_ID) //     
            Forms.reset(POSIBLESALIANZAS)
            let modal: any = $("#ModalPosiblesAlianzas");
            modal.modal();
        }

        openModalArchivos() {
            // this.props.config.setState({ viewMode: false });
            let modal: any = $("#ArchivosModal");
            modal.modal();
            let data = EK.Store.getState().global.entityItem
            // console.log(data)
            // dispatchSuccessful("load::KontrolFileParametersCurrentEntityType", { data: "EVENTOSDC" });
            // dispatchSuccessful("load::KontrolFileParametersCurrentEntity", getData(data));



        }
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model = Forms.getValues(PAGE_ID);
           // let EventoActividad = model.EvenAct;
            let NombreEvento = model.Nombre;
            let AlcanceEvento = model.AlcanceEvento;
            let TipoEvento = model.TipoEvento;
            let Plaza = model.Plazas.ID;
            let TipoVivienda = model.Vocaciones.ID;
            let Fraccionamiento = model.Fraccionamiento.ID;
            let FechaProgramacion = model.FechaProgramacion;
           // let MediosDifusion = model.MediosDifusion.ID;
            let NumeroStaff = model.NumeroStaff;
            let MetaAsistencia = model.MetaAsistencia;
            let Participantes = model.Participantes === 'PARTICIPANTESI' ? 1 : 0;
            let Empresas = model.Empresas === 'EMPRESASI' ? 1 : 0;
            let Impacto = model.Impacto;
            let ClasificacionEvento = model.ClasificacionEvento;
            let PosiblesAlianzas = getData(this.props.PosiblesAlianzasAdded);
            let ObservacionesReq = getData(this.props.ObservacionesRequerimientos);
            let Permisos = getData(this.props.Permisos);
            let InvitadosEspeciales = getData(this.props.invitadosEspeciales);
            let Volanteo = model.Volanteo;
            let Prensa = model.Prensa;
            let Perifoneo = model.Perifoneo;
            let RedesSociales = model.RedesSociales;
            let CorreoElectronico = model.CorreoElectronico;
            let MediosComunicacion = model.MediosComunicacion;
            //console.log(model)
            let parametros = [];
            let posiblesAlianzas = PosiblesAlianzas.map(x => { return { ID: x.ID, Descripcion: x.Nombre } })
            //if (EventoActividad == undefined) {
            //    warning("Seleccione una clasificación", "Atención");
            //    return;
            //}
            if (NombreEvento === undefined || NombreEvento === "" || NombreEvento == null) {
                warning("Favor de ingresar un Nombre a la actividad o evento", "Atencion")
                return;
            }
            var validate = RegexLetters.test(NombreEvento);
            if (!validate) {
                warning("El campo Nombre contiene caracteres no validos", "Aviso")
                return
            }
            if (AlcanceEvento == undefined || AlcanceEvento === null) {
                warning("Favor de el alcance del evento o actividad")
                return;
            }
            if (TipoEvento === undefined || tipoChequesEnum === null) {
                warning("Favor de seleccionar el tipo de evento", "Atencion")
                return;
            }
            if (Plaza === -2) {
                warning("La opción TODOS en el campo plaza es incorrecto", "Atención")
                return;
            }
            if (TipoVivienda === undefined || TipoVivienda === null || TipoVivienda === -2) {
                warning("La opción TODOS en el campo Tipo de vivienda no es valido, favor de seleccionar un tipo de vivienda correcto", "Atención")
                return;
            }
            if (Fraccionamiento == -1 || Fraccionamiento === "" || Fraccionamiento === null || Fraccionamiento === undefined) {
                warning("Favor de seleccionar un Fraccionamiento valido", "Atención")
                return;
            }
            if (FechaProgramacion === null || FechaProgramacion === undefined) {
                warning("Favor de ingresar una fecha valida", "Atencion")
                return;
            }
            if (MetaAsistencia === undefined || MetaAsistencia === null) {
                warning("Favor de ingresar la meta de asistencia", "Atención");
                return;
            }
            if (NumeroStaff === undefined || NumeroStaff === null) {
                warning("Favor de ingresar el numero de staff", "Atención");
                return;
            }
            if (Participantes === undefined || Participantes === null) {
                warning("Favor de seleccionar una opción en Participantes", "Atención");;
                return;
            }
            if (Empresas === undefined || Empresas === null) {
                warning("Favor de seleccionar una opción en Empresas ", "Atención");
                return;
            }
            if (Impacto === undefined || Impacto === null) {
                warning("Favor de seleccionar una opción en Impacto de la comunidad", "Atención");
                return;
            }
            if (ClasificacionEvento === undefined || ClasificacionEvento === null) {
                warning("Favor de seleccionar una opción en Clasificación de eventos", "Atención");
                return;
            }
            parametros.push({
                //Clasificacion: EventoActividad,
                Nombre: NombreEvento,
                AlcanceEvento: AlcanceEvento,
                TipoEvento: TipoEvento,
                Plaza: Plaza,
                TipoVivienda: TipoVivienda,
                Fraccionamiento: Fraccionamiento,
                FechaProgramacion: FechaProgramacion,
                //MediosDifusion: MediosDifusion,
                NumeroStaff: NumeroStaff,
                MetaAsistencia: MetaAsistencia,
                Participantes: Participantes,
                Empresas: Empresas,
                Impacto: Impacto,
                ClasificacionEvento: ClasificacionEvento,
                PosiblesAlianzas: posiblesAlianzas,
                ObservacionesReq: ObservacionesReq,
                Permisos: Permisos,
                InvitadosEspeciales: InvitadosEspeciales,
                Volanteo,
                Prensa,
                Perifoneo,
                RedesSociales,
                CorreoElectronico,
                MediosComunicacion
            });
            console.log(parametros)

            global.asyncPost("base/kontrol/EventosActividades/GetBP/SaveEvent/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data > 0) {
                            success("Se ha guardado el registro", "Exito")
                            dispatchSuccessful("load::SaveEvent", { saveEvent: true }, PAGE_ID);
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
        onModalPosiblesAlianzasCatalogo() {
            Forms.reset(POSIBLESALIANZAS)
            let data = getData(EK.Store.getState().global.PosiblesAlianzas);
            let dataGrid2 = $("#datagroupContainer2").dxDataGrid({
                dataSource: data,
                allowColumnReordering: true,
                onRowPrepared: function (event) {
                    $(event.rowElement).on('dblclick', function () {
                        dispatchSuccessful("load::itemDataPosiblesAlianzas", event.data, PAGE_ID);
                        dispatchSuccessful("load::modeEditPA", { modeEditPA: true }, PAGE_ID);
                        Forms.updateFormElement(POSIBLESALIANZAS, "DescripcionPA", event.data.Nombre);

                    }).on('remove', function () {
                        //on remove event in jquery ui libraries or 
                        $(this).off('dblclick remove');
                    })
                },
                scrolling: {
                    columnRenderingMode: "virtual"
                },
                sorting: {
                    mode: "multiple" // or "multiple" | "none"
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
                    { caption: "Id", dataField: "ID", alignment: 'left' },
                    { caption: "Descripción", dataField: "Nombre", alignment: 'left' },
                ],
                columnFixing: { enabled: true },
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                selection: {
                    mode: "single"
                },
            }).dxDataGrid("instance");

            let modal: any = $("#ModalPosiblesAlianzasCatalogo");
            modal.modal();
        }
        openModalObservacionesReq() {
            Forms.reset(OBSERVACIONESREQ)
            let modal: any = $("#ModalObservacionesRequerimientos");
            modal.modal();
        }
        openModalPermisos() {
            Forms.reset(PERMISOS)
            let modal: any = $("#ModalPermisos");
            modal.modal();
        }
        componentDidMount(): any {
            Forms.updateFormElement(PAGE_ID, "Fraccionamiento", { ID: -1, Clave: "Seleccione una opción" });
            Forms.updateFormElement(PAGE_ID, "BuscadorEvento", { ID: -1, Clave: "Seleccione una opción" });

           
        }
        onChangeModeEdit() {
            dispatchSuccessful("load::modeEditGeneral", { modeEdit: true }, PAGE_ID)
            Forms.updateFormElement(PAGE_ID, "PlazaLabel", null);
            Forms.updateFormElement(PAGE_ID, "FechaProgramacionLabel", null);
        }
        onCancelModeEdit() {
            dispatchSuccessful("load::modeEditGeneral", { modeEdit: false }, PAGE_ID)
            Forms.reset(PAGE_ID);
            dispatchSuccessful("load::PosiblesAlianzasAdded", [], PAGE_ID)
            dispatchSuccessful("load::InvitadosEspeciales", [], PAGE_ID)
            dispatchSuccessful("load::ObservacionesRequerimientos", [], PAGE_ID)
            dispatchSuccessful("load::Permisos", [], PAGE_ID)
            global.dispatchSuccessful("load::entityItem", []);
            Forms.updateFormElement(PAGE_ID, "PlazaLabel", null);
            Forms.updateFormElement(PAGE_ID, "FechaProgramacionLabel", null);
        }

        onSaveEdit() {
            let entity = getData(EK.Store.getState().global.entityItem);
            let event = Forms.getValue("BuscadorEvento", PAGE_ID)
            if (event.ID === -1) {
                warning("Seleccione un evento", "Atención")
                return;
            }

            //if (isSuccessful(EK.Store.getState().global.entityItem)) {
            //    entity = getData(EK.Store.getState().global.entityItem);
            //    if (entity.ID )
            //}
            let parametros = [];
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model = Forms.getValues(PAGE_ID);
            //let EventoActividad = model.EvenAct;
            let NombreEvento = model.Nombre;
            let AlcanceEvento = model.AlcanceEvento;
            let TipoEvento = model.TipoEvento;
            let TipoVivienda = model.Vocaciones.ID;
            let Fraccionamiento = model.Fraccionamiento.ID;
            let FechaReprogramacion = model.FechaReprogramacion;
            let MotivoReprogramacion = model.MotivoRep;
            //let MediosDifusion = model.MediosDifusion.ID;
            let NumeroStaff = model.NumeroStaff;
            let MetaAsistencia = model.MetaAsistencia;
            let Participantes = model.Participantes === 'PARTICIPANTESI' ? 1 : 0;
            let Empresas = model.Empresas === 'EMPRESASI' ? 1 : 0;
            let Impacto = model.Impacto;
            let ClasificacionEvento = model.ClasificacionEvento;
            let InvitadosEspeciales = getData(this.props.invitadosEspeciales);
            let PosiblesAlianzas = getData(this.props.PosiblesAlianzasAdded);
            let ObservacionesReq = getData(this.props.ObservacionesRequerimientos);
            let Permisos = getData(this.props.Permisos);
            let posiblesAlianzas = PosiblesAlianzas.map(x => { return { ID: x.ID, Descripcion: x.Nombre } })
            let Volanteo = model.Volanteo;
            let Prensa = model.Prensa;
            let Perifoneo = model.Perifoneo;
            let RedesSociales = model.RedesSociales;
            let CorreoElectronico = model.CorreoElectronico;
            let MediosComunicacion = model.MediosComunicacion;
            //if (EventoActividad == undefined) {
            //    warning("Seleccione una clasificación", "Atención");
            //    return;
            //}
            if (NombreEvento === undefined || NombreEvento === "" || NombreEvento == null) {
                warning("Favor de ingresar un Nombre a la actividad o evento", "Atencion")
                return;
            }
            let validate = RegexLetters.test(NombreEvento);
            if (!validate) {
                warning("El campo Nombre contiene caracteres no validos", "Aviso")
                return
            }
            if (AlcanceEvento == undefined || AlcanceEvento === null) {
                warning("Favor de el alcance del evento o actividad")
                return;
            }
            if (TipoEvento === undefined || tipoChequesEnum === null) {
                warning("Favor de seleccionar el tipo de evento", "Atencion")
                return;
            }

            if (TipoVivienda === undefined || TipoVivienda === null || TipoVivienda === -2) {
                warning("Favor de seleccionar un tipo de vivienda valido", "Atención")
                return;
            }
            if (Fraccionamiento == -1 || Fraccionamiento === "" || Fraccionamiento === null || Fraccionamiento === undefined) {
                warning("Favor de seleccionar un Fraccionamiento valido", "Atención")
                return;
            }
            if (MetaAsistencia === undefined || MetaAsistencia === null) {
                warning("Favor de ingresar la meta de asistencia", "Atención");
                return;
            }
            if (NumeroStaff === undefined || NumeroStaff === null) {
                warning("Favor de ingresar el numero de staff", "Atención");
                return;
            }
            if (Participantes === undefined || Participantes === null) {
                warning("Favor de seleccionar una opción en Participantes", "Atención");;
                return;
            }
            if (Empresas === undefined || Empresas === null) {
                warning("Favor de seleccionar una opción en Empresas ", "Atención");
                return;
            }
            if (Impacto === undefined || Impacto === null) {
                warning("Favor de seleccionar una opción en Impacto de la comunidad", "Atención");
                return;
            }
            if (ClasificacionEvento === undefined || ClasificacionEvento === null) {
                warning("Favor de seleccionar una opción en Clasificación de eventos", "Atención");
                return;
            }
            if (MotivoReprogramacion != undefined) {
                let validate = RegexLetters.test(MotivoReprogramacion);
                if (!validate) {
                    warning("El campo Motivo de Reprogramacion contiene caracteres no validos", "Atención")
                    return
                }
                if (FechaReprogramacion === null || FechaReprogramacion === undefined) {
                    warning("No puede ingresar un motivo de reprogramación sin antes haber seleccionado una fecha de reprogramación", "Atención")
                    return;
                }
            }
            if (FechaReprogramacion != undefined && (MotivoReprogramacion === null || MotivoReprogramacion === undefined)) {
                warning("Ingrese el motivo de la reprogramación", "Atención")
                return;
            }
            parametros.push({
                ID: entity.ID,
                //Clasificacion: EventoActividad,
                Nombre: NombreEvento,
                AlcanceEvento: AlcanceEvento,
                TipoEvento: TipoEvento,
                TipoVivienda: TipoVivienda,
                Fraccionamiento: Fraccionamiento,
                FechaReProgramacion: FechaReprogramacion,
                MotivoReprogramacion: MotivoReprogramacion,
                /*MediosDifusion: MediosDifusion,*/
                NumeroStaff: NumeroStaff,
                MetaAsistencia: MetaAsistencia,
                Participantes: Participantes,
                Empresas: Empresas,
                Impacto: Impacto,
                ClasificacionEvento: ClasificacionEvento,
                PosiblesAlianzas: posiblesAlianzas,
                ObservacionesReq: ObservacionesReq,
                Permisos: Permisos,
                InvitadosEspeciales: InvitadosEspeciales,
                Volanteo,
                Prensa,
                Perifoneo,
                RedesSociales,
                CorreoElectronico,
                MediosComunicacion
            });
            //parametros.push({
            //    ID: entity.ID,
            //    CLASIFICACION: EventoActividad,
            //    NOMBRE: NombreEvento,
            //    ALCANCEEVENTO: AlcanceEvento,
            //    TIPOEVENTO: TipoEvento,
            //    TIPOVIVIENDA: TipoVivienda,
            //    FRACCIONAMIENTO: Fraccionamiento,
            //    FECHAREPROGRAMACION: FechaReprogramacion,
            //    MEDIODIFUSION: MediosDifusion,
            //    NUMEROSTAFF: NumeroStaff,
            //    METAASISTENCIAEVENTO: MetaAsistencia,
            //    PARTICIPANTES: Participantes,
            //    EMPRESAS: Empresas,
            //    IMPACTOCOMUNIDAD: Impacto,
            //    CLASIFICACIONEVENTOS: ClasificacionEvento,
            //    MOTIVOREPROGRAMACION: MotivoReprogramacion
            //});
            global.asyncPost("base/kontrol/EventosActividades/GetBP/UpdateEvent/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:

                        if (data === 1) {
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            success("Se ha guardado el registro", "Exito")
                            this.onCancelModeEdit();
                        }
                        if (data === -1) {
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            warning("El Nombre del evento ya existe", "Atención");

                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        break;
                }
            })
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEditGeneral)) {
                isModeEdit = this.props.modeEditGeneral.data.modeEdit;
            }
            let spin;
            if (isSuccessful(EK.Store.getState().global.spin)) {
                spin = getData(EK.Store.getState().global.spin).spin;
            }
            let textTitle = "ALTA";
            let icon = "fas fa-list-alt";

            if (isModeEdit) {
                textTitle = "EDITAR";
                icon = "fa fa-edit";
            }
            let entity;
            let entityId;
            let entityType;
            if (isSuccessful(this.props.entityItem)) {
                entity = getData(this.props.entityItem);
                entityId = entity['ID'];
                entityType = "EVENTOSDC";
            }
            return <div id="">
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={textTitle}
                    level={5}
                    icon={icon}
                    collapsed={true}>
                    <SectionButtons >

                    </SectionButtons >
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="Guardando..." />
                    </div>
                    <Row id="loadedData">
                        <Column size={[12, 12, 12, 12]}>
                            <page.OptionSection
                                id={PAGE_ID}
                                title={"Datos Generales"}
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
                                                    !isModeEdit ?
                                                        <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                        //<Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload"  style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    !isModeEdit ?
                                                        <Button id={"btnEdit"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-edit" text={"Editar"} onClick={this.onChangeModeEdit} style={{ marginRight: 5, color, backgroundColor: "#FFD96A" }} />
                                                        //<Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="fa fa-edit"  style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    isModeEdit ?
                                                        <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onSaveEdit} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                        //<Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload" style={{ color }} />
                                                        : null
                                                }
                                                {
                                                    isModeEdit ?
                                                        <Button id={"btnCancel"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancelModeEdit} style={{ marginRight: 5, color, backgroundColor: "#F1675E" }} />
                                                        //<Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancelModeEdit} style={{ color }} />
                                                        : null

                                                }
                                            </Column>
                                            <Column size={[12, 12, 12, 12]} style={{ paddingBottom: '15px' }}>
                                                {
                                                    isModeEdit ? <div>
                                                        <ddl.PlazasDDL2 id="Plazas" label="Plaza" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                        <ddl.BuscadorEvento id="BuscadorEvento" label="Evento" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                        <Button id={"btnSpin"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-check" text={"Llenar campos"} onClick={this.loadFields} style={{ marginRight: 15, color, backgroundColor: "#4EC9A2" }} />
                                                    </div>
                                                        : null
                                                }
                                                {
                                                    spin ?
                                                        <div className="alert alert-info" style={{ marginTop: 20 }}>
                                                            <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                        </div>
                                                        : null

                                                }
                                            </Column>
                                            {/*<Column size={[12, 12, 6, 6]}>
                                                <RadioButton id="E" label="Evento" idForm={PAGE_ID} groupName="EvenAct" size={[12, 12, 3, 3]} />
                                                <RadioButton id="A" label="Actividad" idForm={PAGE_ID} groupName="EvenAct" size={[12, 12, 3, 3]} />
                                            </Column>*/}
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} className=" ">
                                                <Row className="">
                                                    <Column size={[12, 12, 12, 12]} style={{ padding: "5px" }}>
                                                        {
                                                            isModeEdit && entityId > 0 ?
                                                                <label.Label id="IdEvento" label="ID" value={entityId} idForm={PAGE_ID} size={[12, 12, 1, 1]} />
                                                                : null
                                                        }
                                                        <input.Text id="Nombre" label="Nombre" idForm={PAGE_ID} size={[12, 12, 11, 11]} validations={[validations.required()]} required={true} />
                                                    </Column>
                                                </Row>
                                                <Row className="" style={{ padding: "5px" }}>
                                                    <Column size={[12, 12, 5, 5]}>
                                                        <Row className="">
                                                            <Column size={[12, 12, 4, 4]} style={{ padding: "5px" }}>
                                                                <b> ALCANCE DEL EVENTO: </b>
                                                            </Column>
                                                            <Column size={[12, 12, 4, 4]}>
                                                                <RadioButton id="INTERNO" label="INTERNO" idForm={PAGE_ID} groupName="AlcanceEvento" size={[12, 12, 3, 3]} />
                                                            </Column>
                                                            <Column size={[12, 12, 4, 4]}>
                                                                <RadioButton id="EXTERNO" label="EXTERNO" idForm={PAGE_ID} groupName="AlcanceEvento" size={[12, 12, 3, 3]} />
                                                            </Column>
                                                            
                                                        </Row>
                                                        <Row>
                                                            <Column size={[12, 12, 4, 4]}>
                                                            </Column>
                                                            <Column size={[12, 12, 4, 4]}>
                                                                <RadioButton id="AMBOS" label="AMBOS" idForm={PAGE_ID} groupName="AlcanceEvento" size={[12, 12, 3, 3]} />
                                                            </Column>
                                                        </Row>
                                                    </Column>
                                                    <Column size={[12, 12, 7, 7]} style={{ padding: "5px" }}>
                                                        <Row className="">
                                                            <Column size={[12, 12, 3, 3]} style={{}}>
                                                                <b> TIPO DE EVENTO: </b>
                                                            </Column>
                                                            <Column size={[12, 12, 2, 3]}>
                                                                <RadioButton id="NUEVO" label="NUEVO" idForm={PAGE_ID} groupName="TipoEvento" size={[3, 3, 4, 4]} />
                                                            </Column>
                                                            <Column size={[12, 12, 2, 3]}>
                                                                <RadioButton id="ORDINARIO" label="ORDINARIO" idForm={PAGE_ID} groupName="TipoEvento" size={[3, 3, 4, 4]} />
                                                            </Column>
                                                            <Column size={[12, 12, 3, 3]}>
                                                                <RadioButton id="EXTRAORDINARIO" label="EXTRAORDINARIO" idForm={PAGE_ID} groupName="TipoEvento" size={[3, 3, 4, 4]} />
                                                            </Column>
                                                        </Row>
                                                        <Row>
                                                            <Column size={[12, 12, 3, 3]}>
                                                            </Column>
                                                            <Column size={[12, 12, 2, 2]} style={{ paddingTop: "5px" }}>
                                                                <RadioButton id="ESPECIAL" label="ESPECIAL" idForm={PAGE_ID} groupName="TipoEvento" size={[3, 3, 3, 3]} />
                                                            </Column>
                                                        </Row>
                                                    </Column>
                                                </Row>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} >
                                                        {
                                                            isModeEdit ?
                                                                <label.Label id="PlazaLabel" label="Plaza" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                                :
                                                                <ddl.PlazasDDL id="Plazas" label="Plaza" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />

                                                        }
                                                        <ddl.VocacionesFilterDDL2 id="Vocaciones" label="TIPO DE VIVIENDA" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                        <Fraccionamientos id={"Fraccionamiento"} label={"Fraccionamiento"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                    </Column>
                                                </Row>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} >
                                                        {
                                                            isModeEdit ?
                                                                <label.Label id="FechaProgramacionLabel" label="Fecha de Programación" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                                : <DatePicker id="FechaProgramacion" type="date" label={"Fecha de programacion"} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                                                        }
                                                        <input.Integer id="NumeroStaff" label="NÚMERO DE STAFF" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                        <input.Integer id="MetaAsistencia" label="META DE ASISTENCIA AL EVENTO" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                    </Column >
                                                </Row>

                                                <Row>
                                                    <Column size={[12, 12, 12, 12]} >
                                                        {/*<ddl.MediosDifusion id="MediosDifusion" label="MEDIO DE DIFUSION" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                                                        {
                                                            isModeEdit ?
                                                                <DatePicker id="FechaReprogramacion" type="date" startDays={0} label={"Fecha de re-programacion"} idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                                : null
                                                        }
                                                        {
                                                            isModeEdit ?
                                                                <input.Text id="MotivoRep" label="MOTIVO DE REPROGRAMACION" idForm={PAGE_ID} size={[12, 12, 4, 4]} />
                                                                : null
                                                        }
                                                    </Column >
                                                </Row>
                                                <Row>
                                                    <Column size={[12, 12, 4, 4]} style={{ paddingBottom: '20px' }}>
                                                        <div>
                                                            <label><b>PROGRAMA DEL EVENTO</b></label>
                                                        </div>
                                                        {
                                                            isModeEdit && entityId > 0 ?
                                                                <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-paperclip" text={"Subir archivos"} onClick={this.openModalArchivos} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                                                                : null//<KontrolFileManager modulo={config.id} viewMode={true} multiple={true} entity={0} entityType={"Eventos"} />

                                                        }
                                                    </Column >
                                                </Row>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 4, 12]} >
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"MEDIOS DE DIFUSIÓN"}
                                                    level={2}
                                                    icon="fa fa-podcast"
                                                    collapsed={false}>
                                                    <Row style={{}}>
                                                        <Column size={[12, 12, 12, 12]} style={{ padding: "5px" }}>
                                                            <checkBox.CheckBox id={"Volanteo"} idForm={PAGE_ID} label={"VOLANTEO"} size={[12, 12, 3, 3]} />
                                                            <checkBox.CheckBox id={"Prensa"} idForm={PAGE_ID} label={"PRENSA"} size={[12, 12, 3, 3]} />
                                                            <checkBox.CheckBox id={"Perifoneo"} idForm={PAGE_ID} label={"PERIFONEO"} size={[12, 12, 3, 3]} />
                                                            <checkBox.CheckBox id={"RedesSociales"} idForm={PAGE_ID} label={"REDES SOCIALES"} size={[12, 12, 3, 3]} />
                                                            <checkBox.CheckBox id={"CorreoElectronico"} idForm={PAGE_ID} label={"CORREO ELECTRÓNICO"} size={[12, 12, 3, 3]} />
                                                            <checkBox.CheckBox id={"MediosComunicacion"} idForm={PAGE_ID} label={"MEDIOS DE COMUNICACIÓN"} size={[12, 12, 3, 3]} />
                                                        </Column >
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} >
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"RECONOCIMIENTOS"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <Row style={{}}>
                                                        <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                            <b>PARTICIPANTES</b>
                                                        </Column >
                                                        <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                            <RadioButton id="PARTICIPANTESI" label="SI" idForm={PAGE_ID} groupName="Participantes" size={[12, 12, 6, 6]} />
                                                            <RadioButton id="PARTICIPANTENO" label="NO" idForm={PAGE_ID} groupName="Participantes" size={[12, 12, 6, 6]} />
                                                        </Column >
                                                        <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                            <b>EMPRESAS</b>
                                                        </Column >
                                                        <Column size={[12, 12, 3, 3]} style={{ padding: "5px" }}>
                                                            <RadioButton id="EMPRESASI" label="SI" idForm={PAGE_ID} groupName="Empresas" size={[12, 12, 6, 6]} />
                                                            <RadioButton id="EMPRESANO" label="NO" idForm={PAGE_ID} groupName="Empresas" size={[12, 12, 6, 6]} />
                                                        </Column >
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} >
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"IMPACTO EN LA COMUNIDAD"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <Row style={{}}>
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <RadioButton id="I" label="IMAGEN" idForm={PAGE_ID} groupName="Impacto" size={[12, 12, 3, 3]} />
                                                            <RadioButton id="IN" label="INTEGRACIÓN" idForm={PAGE_ID} groupName="Impacto" size={[12, 12, 3, 3]} />
                                                            <RadioButton id="APC" label="APOYO A LA COMUNIDAD" idForm={PAGE_ID} groupName="Impacto" size={[12, 12, 3, 3]} />
                                                            <RadioButton id="SUS" label="SUSTENTABILIDAD" idForm={PAGE_ID} groupName="Impacto" size={[12, 12, 3, 3]} />
                                                        </Column>
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                            <Column size={[12, 12, 12, 12]} >
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"CLASIFICACION DE EVENTOS"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <Row style={{}}>
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <RadioButton id="ACTIVIDAD" label="ACTIVIDAD" idForm={PAGE_ID} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                                            <RadioButton id="EVENTO" label="EVENTO" idForm={PAGE_ID} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                                            <RadioButton id="PROGRAMA" label="PROGRAMA" idForm={PAGE_ID} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                                            <RadioButton id="CAMPAÑA" label="CAMPAÑA" idForm={PAGE_ID} groupName="ClasificacionEvento" size={[12, 12, 3, 3]} />
                                                        </Column>
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]} >
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"POSIBLES ALIANZAS"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <SectionButtons >
                                                        <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.openModalPosiblesAlianzas} style={{ marginRight: 5, color }} />
                                                        <Button className={className} titulo="Crear nuevo registro" color={color} rounded={false} iconOnly={true} icon="fa fa-cog" onClick={this.onModalPosiblesAlianzasCatalogo} style={{ marginRight: 5, color }} />


                                                    </SectionButtons >
                                                    <Row >
                                                        <Column size={[12, 12, 12, 12]}>
                                                            {/*  <PosiblesAlianzas label="Posibles Alianzas" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/}

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <div className="widget-container">
                                                                <div id="ListAddedPA"></div>
                                                            </div>
                                                        </Column>
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                            <Column size={[12, 12, 12, 12]}>
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"OBSERVACIONES Y REQUERIMIENTOS"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <SectionButtons >
                                                        <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.openModalObservacionesReq} style={{ marginRight: 5, color }} />
                                                    </SectionButtons >
                                                    <Row >
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <div className="widget-container">
                                                                <div id="ListObsReq"></div>
                                                            </div>
                                                        </Column>
                                                    </Row>
                                                </page.OptionSection>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"PERMISOS"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <SectionButtons >
                                                        <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.openModalPermisos} style={{ marginRight: 5, color }} />
                                                    </SectionButtons >
                                                    <Row >
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <div className="widget-container">
                                                                <div id="ListPermisos"></div>
                                                            </div>
                                                        </Column>
                                                    </Row>
                                                </page.OptionSection>
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <page.OptionSection
                                                    id={PAGE_ID}
                                                    subTitle={"INVITADOS ESPECIALES"}
                                                    level={2}
                                                    icon="fa fa-users"
                                                    collapsed={false}>
                                                    <SectionButtons >
                                                        <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.openModal} style={{ marginRight: 5, color }} />
                                                    </SectionButtons >
                                                    <Row >
                                                        <Column size={[12, 12, 12, 12]}>
                                                            <span><b><i>Doble click sobre fila para editar o eliminar invitado</i></b></span>
                                                            <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                                            </div>
                                                        </Column>
                                                    </Row>
                                                </page.OptionSection>
                                            </Column >
                                        </Row>
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>

                </page.OptionSection>
            </div >
        };
    });

    //========================================================================
    // MODAL SPECIALGUEST
    //========================================================================
    const ModalSpecialGuest: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditIE = state.global.modeEditIE;
            return retValue;
        };
        onSaveGuestSpecial() {
            let model = Forms.getValues(INVITADOSESPECIALES);
            let Nombre = $.trim(model.NombreInvitado);
            let ApellidoPaterno = $.trim(model.ApellidoPaterno);
            let ApellidoMaterno = $.trim(model.ApellidoMaterno);
            let Cargo = $.trim(model.CargoInvitado);
            let Confirmo = model.ConfirmoInvitado == "SIInvitado" ? true : false;
            let data = getData(EK.Store.getState().global.InvitadosEspeciales);
            if (Nombre === null || Nombre === "" || Nombre === undefined) {
                warning("El campo Nombre es obligatorio", "Aviso")
                return;
            }
            if (ApellidoPaterno === null || ApellidoPaterno === "" || ApellidoPaterno === undefined) {
                warning("El campo Nombre es obligatorio", "Aviso")
                return;
            }
            if (!RegexLetters.test(Nombre) || !RegexLetters.test(ApellidoPaterno) || (ApellidoMaterno !== null && ApellidoMaterno !== "" && ApellidoMaterno !== undefined && !RegexLetters.test(ApellidoMaterno)) || !RegexLetters.test(Cargo)) {
                //console.log(`Nombre ${Nombre}: ${RegexLetters.test(Nombre)},  ApellidoPaterno ${ApellidoPaterno}: ${RegexLetters.test(ApellidoPaterno)},  ApellidoMaterno ${ApellidoMaterno}: ${RegexLetters.test(ApellidoMaterno)},  Cargo ${Cargo}: ${RegexLetters.test(Cargo)}`)
                warning("Algunos de los campos enviados contienen caracteres no validos", "Aviso")
                return
            }
            let fullName = `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`;
            if (data.length > 0) {
                let duplicated = data.filter(x => x.FullNombre == fullName);
                if (duplicated.length > 0) {
                    warning("El registro ya ha sido agregado", "Atención");
                    return;
                }
            }
            let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
            let entity;
            //if (isModeEdit) {
            //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
            //        entity = getData(EK.Store.getState().global.entityItem);
            //        let parametros = global.assign({
            //            IDEVENTO: entity.ID,
            //            NOMBRE: Nombre,
            //            APELLIDOPATERNO: ApellidoPaterno,
            //            APELLIDOMATERNO: ApellidoMaterno,
            //            CARGO: Cargo,
            //            CONFIRMO: Confirmo,
            //            OPERACION: 'INSERT'
            //        })
            //        global.asyncPost("base/kontrol/EventosActividades/GetBP/AddInvitadosEspeciales/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    let invitados = {
            //                        ID: res,
            //                        FullNombre: `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`,
            //                        Nombre,
            //                        ApellidoPaterno,
            //                        ApellidoMaterno,
            //                        Cargo,
            //                        Confirmo
            //                    }

            //                    data.push(invitados)
            //                    dispatchSuccessful("load::InvitadosEspeciales", data);
            //                    Forms.reset(INVITADOSESPECIALES)
            //                    success("Se agrego correctamente", "Exito");
            //                    break;
            //                case AsyncActionTypeEnum.loading: break;
            //                case AsyncActionTypeEnum.failed: break;
            //            }
            //        })
            //    }
            //} else {
            let invitados = {
                FullNombre: `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`,
                Nombre,
                ApellidoPaterno,
                ApellidoMaterno,
                Cargo,
                Confirmo
            }

            data.push(invitados)
            dispatchSuccessful("load::InvitadosEspeciales", data);
            Forms.reset(INVITADOSESPECIALES)
            success("Se agrego correctamente", "Exito");
            //}

        }
        onRemove() {
            let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
            let data = getData(EK.Store.getState().global.InvitadosEspeciales);
            let row = getData(EK.Store.getState().global.itemDataInvitadoEspecial)
            let newData = data.filter(x => x.FullNombre != row.FullNombre)

            //if (isModeEdit) {
            //    let parametros = global.assign({
            //        IDGENERICO: row.ID,
            //        OPERACION: 'DELETEINVITADOS'
            //    })
            //    global.dispatchAsyncPost("load::Delete", "base/kontrol/EventosActividades/GetBP/DeleteUpdateRelsEvento/", { parametros: parametros });
            //}
            dispatchSuccessful("load::InvitadosEspeciales", newData);
            dispatchSuccessful("load::modeEditIE", { modeEditIE: false }, PAGE_ID)
            Forms.reset(INVITADOSESPECIALES)
        }
        onEdit() {

            let model = Forms.getValues(INVITADOSESPECIALES);
            let Nombre = $.trim(model.NombreInvitado);
            let Cargo = $.trim(model.CargoInvitado);
            let ApellidoPaterno = $.trim(model.ApellidoPaterno);
            let ApellidoMaterno = $.trim(model.ApellidoMaterno);
            let Confirmo = model.ConfirmoInvitado == "SIInvitado" ? true : false;
            let data = getData(EK.Store.getState().global.InvitadosEspeciales);
            let row = getData(EK.Store.getState().global.itemDataInvitadoEspecial)
            if (Nombre === null || Nombre === "" || Nombre === undefined) {
                warning("El campo Nombre es obligatorio", "Aviso")
                return;
            }

            if (!RegexLetters.test(Nombre) || !RegexLetters.test(ApellidoPaterno) || (ApellidoMaterno !== null && ApellidoMaterno !== "" && ApellidoMaterno !== undefined && !RegexLetters.test(ApellidoMaterno)) || !RegexLetters.test(Cargo)) {
                warning("Algunos de los campos enviados contienen caracteres no validos", "Aviso")
                return
            }

            let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
            let entity;
            //if (isModeEdit) {
            //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
            //        entity = getData(EK.Store.getState().global.entityItem);
            //        let idUsuario = EK.Store.getState().global.app.data.Me.ID
            //        let parametros = global.assign({
            //            IDEVENTO: entity.ID,
            //            IDGENERICO: row.ID,
            //            NOMBRE: Nombre,
            //            APELLIDOPATERNO: ApellidoPaterno,
            //            APELLIDOMATERNO: ApellidoMaterno,
            //            CARGO: Cargo,
            //            CONFIRMO: Confirmo,
            //            OPERACION: 'UPDATEINVITADOSESPECIALES',
            //            USUARIO: idUsuario
            //        })
            //        global.asyncPost("base/kontrol/EventosActividades/GetBP/DeleteUpdateRelsEvento/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    let newData = data.filter(x => x.Nombre != row.Nombre && x.ApellidoPaterno !== row.ApellidoPaterno && x.ApellidoMaterno !== row.ApellidoMaterno)
            //                    let invitado = {
            //                        ID: res[0].ID,
            //                        FullNombre: `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`,
            //                        Nombre,
            //                        ApellidoPaterno,
            //                        ApellidoMaterno,
            //                        Cargo,
            //                        Confirmo
            //                    }
            //                    newData.push(invitado)
            //                    dispatchSuccessful("load::InvitadosEspeciales", newData);
            //                    Forms.reset(INVITADOSESPECIALES)
            //                    dispatchSuccessful("load::modeEditIE", { modeEditIE: false }, PAGE_ID)
            //                    break;
            //                case AsyncActionTypeEnum.loading: break;
            //                case AsyncActionTypeEnum.failed: break;
            //            }
            //        })
            //    }
            //} else {
            let newData = data.filter(x => x.Nombre != row.Nombre && x.ApellidoPaterno !== row.ApellidoPaterno && x.ApellidoMaterno !== row.ApellidoMaterno)
            let invitado = {
                FullNombre: `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`,
                Nombre,
                ApellidoPaterno,
                ApellidoMaterno,
                Cargo,
                Confirmo
            }



            newData.push(invitado)
            dispatchSuccessful("load::InvitadosEspeciales", newData);
            Forms.reset(INVITADOSESPECIALES)
            dispatchSuccessful("load::modeEditIE", { modeEditIE: false }, PAGE_ID)
            //}

        }
        footerModal(): JSX.Element {
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditIE);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditIE.data.modeEditIE
            }
            return <div className="modal-footer">
                {
                    !isModeEdit ?
                        <div>
                            <button type="button" onClick={this.onSaveGuestSpecial} className="btn dark btn-outline btn-md blue">Agregar</button>
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
        onCancel() {
            dispatchSuccessful("load::modeEditIE", { modeEditIE: false }, PAGE_ID)
            Forms.reset(INVITADOSESPECIALES)
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <modal.Modal id="InvitadosEspeciales" header={"Invitados Especiales"} footer={this.footerModal()}
                style={{ width: "30%", height: "30%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <input.Text id="NombreInvitado" label="Nombre" idFormSection={INVITADOSESPECIALES} size={[12, 12, 4, 4]} />
                        <input.Text id="ApellidoPaterno" label="Apellido Paterno" idFormSection={INVITADOSESPECIALES} size={[12, 12, 4, 4]} />
                        <input.Text id="ApellidoMaterno" label="Apellido Materno" idFormSection={INVITADOSESPECIALES} size={[12, 12, 4, 4]} />
                        <input.Text id="CargoInvitado" label="Cargo" idFormSection={INVITADOSESPECIALES} size={[12, 12, 12, 12]} />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <label><b>Confirmó</b></label>
                        <RadioButton id="SIInvitado" label="SI" idFormSection={INVITADOSESPECIALES} groupName="ConfirmoInvitado" size={[12, 12, 12, 12]} />
                        <RadioButton id="NOInvitado" label="NO" idFormSection={INVITADOSESPECIALES} groupName="ConfirmoInvitado" size={[12, 12, 12, 12]} />
                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // MODAL POSIBLES ALIANZAS
    //========================================================================
    const ModalPosiblesAlianzas: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })

        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onCancel() {
            let modalCalen: any = $("#ModalPosiblesAlianzas");
            modalCalen.modal("hide");
        }
        onSaveSelectedItems() {
            let model = Forms.getValues(POSIBLESALIANZAS);
            let PosiblesAlianzasForm = model.PosiblesAlianzas
            let data = getData(EK.Store.getState().global.PosiblesAlianzasAdded);

            if (data.length > 0) {
                let result = data.filter(x => x.ID === PosiblesAlianzasForm.ID)
                //console.log(result)
                if (result.length > 0) {
                    warning("Este registro ya fue agregado, intente con otro", "Atención");
                    return
                }
            }
            let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
            let entity;
            //if (isModeEdit) {
            //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
            //        entity = getData(EK.Store.getState().global.entityItem);
            //        let parametros = global.assign({
            //            IDEVENTO: entity.ID,
            //            IDPOSIBLEALIANZA: PosiblesAlianzasForm.ID,
            //            OPERACION: 'INSERT'
            //        })
            //        global.asyncPost("base/kontrol/EventosActividades/GetBP/AddPosiblesAlianzas/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    break;
            //                case AsyncActionTypeEnum.loading:
            //                    break;
            //                case AsyncActionTypeEnum.failed:
            //                    break;
            //            }
            //        })
            //    }
            //}
            data.push(PosiblesAlianzasForm);
            dispatchSuccessful("load::PosiblesAlianzasAdded", data, PAGE_ID)
            success("Se agrego correctamente", "Exito");
        }
        render(): JSX.Element {

            let className: string = "btn-editing";
            let color: string = "white";
            return <modal.Modal id="ModalPosiblesAlianzas" header={"Posibles Alianzas"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <ddl.PosiblesAlianzas id="PosiblesAlianzas" label="Posibles Alianzas" idFormSection={POSIBLESALIANZAS} size={[12, 12, 8, 8]} />
                        <Button id={"btnAdd"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Agregar" icon="fa fa-plus" onClick={this.onSaveSelectedItems} style={{ color, backgroundColor: "#36C6D3", marginTop: 20 }} />

                    </Column>
                </Row>
            </modal.Modal>

        }


    });
    //========================================================================
    // MODAL POSIBLES ALIANZAS CATALOGO CRUD
    //========================================================================
    const ModalPosiblesAlianzasCatalogo: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditPA = state.global.modeEditPA;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onCancel() {
            Forms.reset(POSIBLESALIANZAS);
            dispatchSuccessful("load::modeEditPA", { modeEditPA: false }, PAGE_ID);
        }
        onDelete() {
            EK.Global.confirm("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
                dispatchSuccessful("load::modeEditPA", { modeEditPA: false }, PAGE_ID);
                let row = getData(EK.Store.getState().global.itemDataPosiblesAlianzas);
                let parametros = global.assign({
                    ID: row.ID,
                    OPERACION: 'DELETE'
                });
                global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPosiblesAlianzas/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            if (data[0].code === 0) {
                                dispatchSuccessful("load::PosiblesAlianzasSave", { Save: true }, PAGE_ID)
                                dispatchSuccessful("load::modeEditPA", { modeEditPA: false }, PAGE_ID);
                                success(data[0].msg, "Exito");
                                Forms.reset(POSIBLESALIANZAS)
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
        onsavePA() {
            let model = Forms.getValues(POSIBLESALIANZAS);
            let row = getData(EK.Store.getState().global.itemDataPosiblesAlianzas);
            let Descripcion = $.trim(model.DescripcionPA)
            let DescripcionOld;
            let idPA;
            let Operacion = 'INSERT';
            let allewEdit = isSuccessful(EK.Store.getState().global.modeEditPA);
            if (allewEdit) {
                let modeEdit = EK.Store.getState().global.modeEditPA.data.modeEditPA;
                if (modeEdit) {
                    idPA = row.ID;
                    Operacion = 'UPDATE';
                    DescripcionOld = row.Nombre
                }
            }
            if (Descripcion === null || Descripcion === "" || Descripcion === undefined) {
                warning("El campo Descripción es obligatorio", "Aviso")
                return;
            }
            var validate = RegexLetters.test(Descripcion);
            if (!validate) {
                warning("La Descripción contiene caracteres no validos", "Aviso")
                return
            }
            let parametros = global.assign({
                ID: idPA,
                OPERACION: Operacion,
                DESCRIPCION: Descripcion,
                DESCRIPCIONOLD: DescripcionOld
            });

            global.asyncPost("base/kontrol/EventosActividades/GetBP/CrudPosiblesAlianzas/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::PosiblesAlianzasSave", { Save: true }, PAGE_ID)
                            dispatchSuccessful("load::modeEditPA", { modeEditPA: false }, PAGE_ID);
                            success(data[0].msg, "Exito");
                            Forms.reset(POSIBLESALIANZAS)
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
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEditPA)) {
                isModeEdit = this.props.modeEditPA.data.modeEditPA;
            }
            return <modal.Modal id="ModalPosiblesAlianzasCatalogo" header={"Posibles Alianzas"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <Column size={[12, 12, 6, 6]}>
                                <input.Text id="DescripcionPA" label="Descripción" idFormSection={POSIBLESALIANZAS} size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 6, 6]}>
                                <Button id={"btnAdd"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Guardar" icon="fa fa-plus" onClick={this.onsavePA} style={{ color, backgroundColor: "#36C6D3" }} />
                                {isModeEdit ? <div><div>
                                    <Button id={"btnDelete"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Eliminar" icon="fa fa-trash" onClick={this.onDelete} style={{ color, backgroundColor: "#F1675E" }} />
                                </div><div>
                                        <Button id={"btnCancel"} className={"btn"} size={[6, 6, 6, 6]} rounded={false} iconOnly={false} text="Cancelar" icon="fa fa-times" onClick={this.onCancel} style={{ color, backgroundColor: "#FFD96A" }} />
                                    </div></div> : null}
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                                <div id="datagroupContainer2" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                </div>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });

    //========================================================================
    // MODAL OBSERVACIONES Y REQUERIMIENTOS
    //========================================================================
    const ModalObservacionesRequerimientos: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onCancel() {
            let modalCalen: any = $("#ModalObservacionesRequerimientos");
            modalCalen.modal("hide");
        }
        onsaveOR() {
            let model = Forms.getValues(OBSERVACIONESREQ);
            let data = getData(EK.Store.getState().global.ObservacionesRequerimientos);
            let ObsReq = $.trim(model.ObservacionesRequerimientos);
            if (ObsReq === null || ObsReq === "" || ObsReq === undefined) {
                warning("El campo Observaciones es obligatorio", "Aviso")
                return;
            }
            var validate = RegexLetters.test(ObsReq);
            if (!validate) {
                warning("El campo Observaciones contiene caracteres no validos", "Aviso")
                return
            }
            if (data.length > 0) {
                let duplicated = data.filter(x => x.DescripcionObsReq === ObsReq)
                if (duplicated.length > 0) {
                    warning("Este registro ya fue agregado", "Atención");
                    return;
                }
            }
            let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
            let entity;
            //if (isModeEdit) {
            //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
            //        entity = getData(EK.Store.getState().global.entityItem);
            //        let parametros = global.assign({
            //            IDEVENTO: entity.ID,
            //            OBSERVACIONREQ: ObsReq,
            //            OPERACION: 'INSERT'
            //        })
            //        global.asyncPost("base/kontrol/EventosActividades/GetBP/AddObservacionesReq/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    break;
            //                case AsyncActionTypeEnum.loading:
            //                    break;
            //                case AsyncActionTypeEnum.failed:
            //                    break;
            //            }
            //        })
            //    }
            //}
            let ObservacionesRequerimientos = {
                DescripcionObsReq: ObsReq
            }

            data.push(ObservacionesRequerimientos);
            dispatchSuccessful("load::ObservacionesRequerimientos", data);
            success("Se agrego correctamente", "Exito");
            Forms.reset(OBSERVACIONESREQ);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <modal.Modal id="ModalObservacionesRequerimientos" header={"Observaciones y requerimientos"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <input.Text id="ObservacionesRequerimientos" label="Observaciones/Requerimientos" idFormSection={OBSERVACIONESREQ} validations={[validations.required()]} required={true} size={[12, 12, 8, 8]} />
                                <button type="button" onClick={this.onsaveOR} className="btn dark btn-outline btn-md blue" style={{ color, backgroundColor: "#36C6D3", marginTop: 20 }}>Agregar</button>

                            </Column>
                        </Row>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    //========================================================================
    // MODAL PERMISOS
    //========================================================================
    const ModalPermisos: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onCancel() {
            let modalCalen: any = $("#ModalPermisos");
            modalCalen.modal("hide");
        }
        onsavePermisos() {
            let model = Forms.getValues(PERMISOS);
            let Permiso = model.Permisos
            let data = getData(EK.Store.getState().global.Permisos);
            if (Permiso === null || Permiso === "" || Permiso === undefined) {
                warning("El campo Permiso es obligatorio", "Aviso")
                return;
            }
            var validate = RegexLetters.test(Permiso);
            if (!validate) {
                warning("El campo Permiso contiene caracteres no validos", "Atención")
                return
            }
            if (data.length > 0) {
                let duplicated = data.filter(x => x.Permiso === Permiso);
                if (duplicated.length > 0) {
                    warning("El registro ya fue agregado", "Atención");
                    return;
                }
            }
            let isModeEdit = EK.Store.getState().global.modeEditGeneral.data.modeEdit;
            let entity;
            //if (isModeEdit) {
            //    if (isSuccessful(EK.Store.getState().global.entityItem)) {
            //        entity = getData(EK.Store.getState().global.entityItem);
            //        let parametros = global.assign({
            //            IDEVENTO: entity.ID,
            //            PERMISO: Permiso,
            //            OPERACION: 'INSERT'
            //        })
            //        global.asyncPost("base/kontrol/EventosActividades/GetBP/AddPermisos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    break;
            //                case AsyncActionTypeEnum.loading:
            //                    break;
            //                case AsyncActionTypeEnum.failed:
            //                    break;
            //            }
            //        })
            //    }
            //}
            let Permisos = {
                Permiso
            }
            data.push(Permisos)
            dispatchSuccessful("load::Permisos", data)
            success("Se agrego correctamente", "Exito");
            Forms.reset(PERMISOS);
        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <modal.Modal id="ModalPermisos" header={"Permisos"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <input.Text id="Permisos" label="Permisos" idFormSection={PERMISOS} size={[12, 12, 8, 8]} />
                                <button type="button" onClick={this.onsavePermisos} className="btn dark btn-outline btn-md blue" style={{ color, backgroundColor: "#36C6D3", marginTop: 20 }}>Agregar</button>

                            </Column>
                        </Row>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });


    //========================================================================
    // MODAL Archivos
    //========================================================================
    const ModalArchivos: any = global.connect(class extends React.Component<IEventosActividades, {}>{
        constructor(props: IEventosActividades) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entity = state.global.KontrolFileParametersCurrentEntity;
            retValue.entityType = state.global.KontrolFileParametersCurrentEntityType;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <modal.Modal id="ArchivosModal" header={"Archivos"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <KontrolFileManager modulo="SPV" entityType={this.props.entityType} tipo="anexos" entity={this.props.entity} viewMode={false} multiple={true} size={[12, 12, 12, 12]} />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });

    //========================================================================
    // COMPONENTES
    //========================================================================


};
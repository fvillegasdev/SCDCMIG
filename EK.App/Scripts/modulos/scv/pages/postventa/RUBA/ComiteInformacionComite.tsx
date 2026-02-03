namespace EK.Modules.SCV.Pages.postventa.RUBA.ComiteInformacionComite {
    "use strict";
    const PAGE_ID = "ComiteInformacionComite";
    const FORM_INTEGRANTES = "INTEGRANTESF";
    export const RegexLetters = /^[A-Za-z\s]+$/
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);
    declare const ExcelJS: any;
    declare const Set: any;
    declare const DevExpress: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    interface IComiteInformacionComite extends page.IProps {
        modeEdit: any,
        modeEditIntegrantes: any,
        loadData: any,
        integrantesComite: any,
        areaGeo: any,
        itemsLoad: (data) => void,
        plaza: DataElement
    };

    let columnsIntegrantesDetalles = [
        { caption: "No", dataField: "No" },
        { caption: "Puesto", dataField: "Puesto" },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno" },
        { caption: "Apellino Materno", dataField: "ApellidoMaterno" },
        { caption: "Nombre", dataField: "Nombre" },
        { caption: "Calle", dataField: "Calle" },
        { caption: "Numero", dataField: "Numero" },
        { caption: "Telefono", dataField: "Telefono" }]
    let columnsIntegrantes = [
        { caption: "No", dataField: "No" },
        { caption: "Puesto", dataField: "Puesto" },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno" },
        { caption: "Apellino Materno", dataField: "ApellidoMaterno" },
        { caption: "Nombre", dataField: "Nombre" },
        { caption: "Calle", dataField: "Calle" },
        { caption: "Numero", dataField: "Numero" },
        { caption: "Telefono", dataField: "Telefono" },
        {
            caption: "Editar",
            type: 'buttons',
            buttons: ['edit', {
                hint: 'Editar',
                icon: 'fa fa-edit',
                onClick(e) {
                    let data = e.row.data
                    dispatchSuccessful("load::RowDataIntegrantes", data)
                    Forms.updateFormElement(FORM_INTEGRANTES, "Puesto", data.Puesto)
                    Forms.updateFormElement(FORM_INTEGRANTES, "ApellidoPaterno", data.ApellidoPaterno)
                    Forms.updateFormElement(FORM_INTEGRANTES, "ApellidoMaterno", data.ApellidoMaterno)
                    Forms.updateFormElement(FORM_INTEGRANTES, "Nombre", data.Nombre)
                    Forms.updateFormElement(FORM_INTEGRANTES, "Calle", data.Calle)
                    Forms.updateFormElement(FORM_INTEGRANTES, "Numero", data.Numero)
                    Forms.updateFormElement(FORM_INTEGRANTES, "Telefono", data.Telefono)
                    dispatchSuccessful("load::modeEditIntegrantes", { modeEditIntegrantes: true })
                    let modal: any = $("#ModalIntegrantes");
                    modal.modal();
                },
            }],
        },
        {
            caption: "Eliminar",
            type: 'buttons',
            buttons: ['edit', {
                hint: 'Eliminar',
                icon: 'fa fa-trash',
                onClick(e) {
                    let data = e.row.data
                    let integrantes = global.getData(EK.Store.getState().global.Integrantes);

                    let items = integrantes.filter(x => x.No !== data.No);

                    let count = 0;
                    for (let x of items) {
                        count++;
                        x.No = count;
                    }

                    dispatchSuccessful("load::Integrantes", items)
                    if (items.length === 0) {
                        $(`#IntegrantesTable`).dxDataGrid("dispose");
                        onDataTableData("IntegrantesTable", [], columnsIntegrantes)
                    }
                }
            }]
        }
    ]
    let onDataTableData = (container: string, data: any, columns?: any, nameFileExport?: any, TypeEntity?: any) => {
        let fecha = Date.now();

        $(`#${container}`).dxDataGrid({
            dataSource: data,
            allowColumnReordering: true,
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
                visible: true
            },
            paging: {
                pageSize: 5
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 15, 25],
                showInfo: true
            },
            groupPanel: {
                visible: false
            },
            columns: columns,
            columnFixing: { enabled: true },
            showColumnLines: false,
            showRowLines: true,
            rowAlternationEnabled: true,
            selection: {
                mode: "single"
            },
        }).dxDataGrid("instance");
    }
    let getData = () => {
        let loader = document.getElementById('loading');
        let loaded = document.getElementById('loadedData');
        let parametros = global.assign({
            OPERACION: 'GETINFORMACIONCOMITE'
        })
        let columns = [
            { caption: "ID", dataField: "Id" },
            { caption: "Nombre Comite", dataField: "NombreComite" },
            { caption: "Fecha Conformación", dataField: "FechaConformacion", dataType: "datetime", format: "dd/MM/yyyy" },
            { caption: "Administradora", dataField: "Administradora" },
            { caption: "Nombre Administradora", dataField: "NombreAdministradora" },
            { caption: "Plaza", dataField: "Plaza" },
            { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
            { caption: "Etapa(s)", dataField: "Etapas" },
            { caption: "Segmento", dataField: "SegmentoNombre" },
            { caption: "Norte", dataField: "Norte" },
            { caption: "Sur", dataField: "Sur" },
            { caption: "Este", dataField: "Este" },
            { caption: "Oeste", dataField: "Oeste" },
            {
                caption: "Editar",
                type: 'buttons',
                buttons: ['edit', {
                    hint: 'Editar',
                    icon: 'fa fa-edit',
                    onClick(e) {
                        let data = e.row.data
                        dispatchSuccessful("load::RowData", data)
                        let parametros = global.assign({
                            ID: data.Id,
                        });
                        global.asyncPost("base/kontrol/Comites/GetBP/GetComiteInformacionComiteById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    loader.style.display = 'none';
                                    loaded.style.display = 'inherit';
                                    console.log(data)
                                    getEtapasByFraccionamientoId(data.IdFraccionamiento, data.Etapas)
                                    Forms.updateFormElement(PAGE_ID, "NombreComite", data.Nombre);
                                    Forms.updateFormElement(PAGE_ID, "FechaConformacion", data.FechaConformacion);
                                    Forms.updateFormElement(PAGE_ID, "Admin", data.Administradora ? "SI" : "NO");
                                    Forms.updateFormElement(PAGE_ID, "NombreAdmin", data.NombreAdministradora );
                                    Forms.updateFormElement(PAGE_ID, "AreaGeografica", { ID: data.IdAreaGeografica, Clave: data.AreaGeografica, Nombre: data.NombreAreaGeografica, });
                                    Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza);
                                    Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: data.IdFraccionamiento, Nombre: data.Fraccionamiento });
                                    Forms.updateFormElement(PAGE_ID, "Vocaciones", { ID: data.IdSegmento, Nombre: data.Segmento });
                                    Forms.updateFormElement(PAGE_ID, "Norte", data.Norte);
                                    Forms.updateFormElement(PAGE_ID, "Sur", data.Sur);
                                    Forms.updateFormElement(PAGE_ID, "Este", data.Este);
                                    Forms.updateFormElement(PAGE_ID, "Oeste", data.Oeste);
                                    if (data.Integrantes.length > 0) {
                                        dispatchSuccessful("load::Integrantes", data.Integrantes)
                                    } else {
                                        dispatchSuccessful("load::Integrantes", [])
                                        $(`#IntegrantesTable`).dxDataGrid("dispose");
                                        setTimeout(() => {
                                            onDataTableData("IntegrantesTable", [], columnsIntegrantes)
                                        }, 500)
                                    }
                                    break;
                                case AsyncActionTypeEnum.loading:
                                    loader.style.display = 'block';
                                    loaded.style.display = 'none'
                                    break;
                                case AsyncActionTypeEnum.failed:
                                    loader.style.display = 'block';
                                    loaded.style.display = 'none'
                                    break;
                            }
                        });

                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        dispatchSuccessful("load::modeEdit", { modeEdit: true })
                    },
                }],
            },
            {
                caption: "Eliminar",
                type: 'buttons',
                buttons: ['delete', {
                    hint: 'Eliminar',
                    icon: 'fa fa-trash',
                    onClick(e) {

                        let Id = e.row.data.Id
                        onDelete(Id)

                    },
                }],
            },
            {
                caption: "Ver Detalle",
                type: 'buttons',
                buttons: ['delete', {
                    hint: 'Ver Detalle',
                    icon: 'fa fa-eye',
                    onClick(e) {
                        let data = e.row.data
                        onDetalles(data.Id)
                        let modal: any = $("#ModalIntegrantesDetalle");
                        modal.modal();
                    },
                }],
            },
        ];
        global.asyncPost("base/kontrol/Comites/GetBP/GetComiteInformacionComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    console.log(data)
                    loader.style.display = 'none';
                    loaded.style.display = 'inherit';
                    let dataGrid = $("#datagroupContainer").dxDataGrid({
                        dataSource: data,
                        allowColumnReordering: true,
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
                            visible: true
                        },
                        paging: {
                            pageSize: 10
                        },
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [10, 15, 25],
                            showInfo: true
                        },
                        groupPanel: {
                            visible: true
                        },
                        columns: columns,
                        columnFixing: { enabled: true },
                        showColumnLines: false,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        selection: {
                            mode: "single"
                        },
                        export: {
                            enabled: true,
                            fileName: "Comite Area Geografica",
                            allowExportSelectedData: false
                        },
                        onExporting: function (e) {

                            e.cancel = true;
                            for (const d of data) {
                                d.Administradora = d.Administradora ? 'SI' : 'NO';
                              
                            }
                            e.cancel = false;
                            setTimeout(() => {
                                for (const d of data) {
                                    d.Administradora = d.Administradora === 'SI' ? true : false
                                }
                            }, 200);

                        },
                    }).dxDataGrid("instance");
                    break;
                case AsyncActionTypeEnum.loading:
                    loader.style.display = 'block';
                    loaded.style.display = 'none'
                    break;
                case AsyncActionTypeEnum.failed:
                    loader.style.display = 'block';
                    loaded.style.display = 'none'
                    break;
            }
        })
    }

    let getEtapasByFraccionamientoId = ( cvefracc, etapas) =>{
       // getFraccionamientosByProyecto(idForm, cvefracc) {
           // this.ClearAllLists(idForm);
            let list_fraccs = EK.Store.getState().global.FRACCIONAMIENTO.data;
        let item_fracc = list_fraccs.filter(x => x.ID === cvefracc);
        console.log(item_fracc)
        Forms.updateFormElement(PAGE_ID, 'Fraccionamientos', item_fracc[0])
           // this.changeFocusContainer('main-tag-container', 'error')
            //global.asyncGet("base/kontrol/fraccionamientos/all/" + encodedParams, (status: AsyncActionTypeEnum, data: any) => {
            global.asyncPost("base/kontrol/fraccionamientos/GetBP/getFraccionamientosByProyectoID", { parametros: { ClaveProyecto: cvefracc } }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //data.unshift({ Clave: '-2', Nombre: 'TODOS' });
                        dispatchSuccessful("load::tags$fraccionamientos$filteredLists", data);
                        dispatchSuccessful("load::ItemsTotalList", data);
                        let elementos = document.getElementsByClassName('item-container-ek-custom');
                        let seleccionados = [];
                        let _etapas = etapas.split(',');
                        //console.log(etapas)
                        //console.log(_etapas)
                        
                        if (data && data.length > 0) {
                            for (let e of _etapas) {
                                let etapa = data.filter(x => x.Clave === e)[0];
                                if (etapa !== undefined) {
                                    seleccionados.push(etapa);
                                }
                            }
                            console.log('Etapas seleccionadas')
                            console.log(seleccionados);
                            //this.changeFocusContainer('main-tag-container', 'success')
                            //let first = data[0];
                            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', seleccionados)
                            //Forms.updateFormElement(PAGE_ID, 'Etapas', first);
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        // Forms.updateFormElement(idForm, this.props.id, []);
                        break;
                }
            });

       // }
    }
    let onDetalles = (Id) => {
        let parametros = global.assign({
            ID: Id,
        });
        dispatchSuccessful("load::Load", { load: true })

        global.asyncPost("base/kontrol/Comites/GetBP/GetComiteInformacionComiteById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    dispatchSuccessful("load::DatatoExport", data);
                    console.log(data)
                    Forms.updateFormElement(PAGE_ID, "NombreComiteLabel", data.Nombre);
                    Forms.updateFormElement(PAGE_ID, "FechaConformacionLabel", data.FechaConformacion.toLocaleDateString());
                    Forms.updateFormElement(PAGE_ID, "AdministradoraLabel", data.Administradora ? "SI" : "NO");
                    Forms.updateFormElement(PAGE_ID, "AreaGeograficaLabel", data.NombreAreaGeografica);
                    Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza);
                    Forms.updateFormElement(PAGE_ID, "FraccionamientoLabel", data.Fraccionamiento);
                    Forms.updateFormElement(PAGE_ID, "EtapasDescLabel", data.EtapasDesc);
                    Forms.updateFormElement(PAGE_ID, "SegmentoLabel", data.Segmento);
                    Forms.updateFormElement(PAGE_ID, "NorteLabel", data.Norte);
                    Forms.updateFormElement(PAGE_ID, "SurLabel", data.Sur);
                    Forms.updateFormElement(PAGE_ID, "EsteLabel", data.Este);
                    Forms.updateFormElement(PAGE_ID, "OesteLabel", data.Oeste);
                    if (data.Integrantes.length > 0) {
                        $(`#IntegrantesTableDetalles`).dxDataGrid("dispose");
                        setTimeout(() => {

                            onDataTableData("IntegrantesTableDetalles", data.Integrantes, columnsIntegrantesDetalles)
                        }, 200)
                    } else {
                        $(`#IntegrantesTableDetalles`).dxDataGrid("dispose");
                        setTimeout(() => {
                            onDataTableData("IntegrantesTableDetalles", [], columnsIntegrantesDetalles)
                        }, 200)
                    }
                    dispatchSuccessful("load::Load", { load: false })

                    break;
                case AsyncActionTypeEnum.loading:
                    break;
                case AsyncActionTypeEnum.failed:
                    dispatchSuccessful("load::Load", { load: false })
                    break;
            }
        });
    }
    let onDelete = (Id) => {
        let loader = document.getElementById('loading');
        let loaded = document.getElementById('loadedData');
        EK.Global.confirmTrueFalse("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
            let parametros = global.assign({
                ID: Id,
            });
            global.asyncPost("base/kontrol/Comites/GetBP/DeleteInformacionComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito")
                            Forms.reset(PAGE_ID);
                            getData()
                            dispatchSuccessful("load::Integrantes", [])
                            $(`#IntegrantesTable`).dxDataGrid("dispose");
                            setTimeout(() => {
                                onDataTableData("IntegrantesTable", [], columnsIntegrantes)
                            }, 200)
                            dispatchSuccessful("load::modeEdit", { modeEdit: true })

                        } else {
                            warning(data[0].msg, "Aviso");
                            dispatchSuccessful("load::modeEdit", { modeEdit: true })

                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                }
            });
        });
    }
    export let Vista = global.connect(class extends React.Component<IComiteInformacionComite, {}> {
        constructor(props: IComiteInformacionComite) {
            super(props);
            this.onsave = this.onsave.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.integrantesComite = state.global.Integrantes;
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);

            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        })



        componentWillReceiveProps(nextProps: IComiteInformacionComite): void {
            if (hasChanged(this.props.plaza, nextProps.plaza) && global.isSuccessful(nextProps.plaza)) {
                if (isSuccessful(nextProps.plaza)) {
                    console.log(nextProps.plaza);
                };
            };
        }
        shouldComponentUpdate(nextProps: IComiteInformacionComite, { }): boolean {
            return hasChanged(this.props.plaza, nextProps.plaza)
               
        };
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model: any = Forms.getForm(PAGE_ID)
            console.log(model)
            let Nombre = model.NombreComite;
            let FechaConformacion = model.FechaConformacion;
            let Admin = model.Admin === "SI" ? 1 : 0;
            let Plaza = model.PlazaInicial.ID;
            let Segmento = model.Vocaciones.ID;
            let Fraccionamiento = model.Fraccionamientos && model.Fraccionamientos !== null && model.Fraccionamientos !== undefined? model.Fraccionamientos.ID:null;
            let Norte = model.Norte;
            let Sur = model.Sur;
            let Este = model.Este;
            let Oeste = model.Oeste;
            let Integrantes = global.getData(this.props.integrantesComite);
            let Id = 0;
            let NombreAdmin = model.NombreAdmin;

            if (Fraccionamiento === null || Fraccionamiento === undefined) {
                global.info("Seleccione algun fraccionamiento", "Atencion");
                return;
            }

            if (model.Etapas === null || model.Etapas === undefined || model.Etapas.length === 0) {
                global.info("Seleccione alguna etapa", "Atencion");
                return;
            }
           
            let _etapas: any = '';
            for (let f of model.Etapas) {
                _etapas += f.Clave + ',';
            }

            _etapas = _etapas.slice(0, -1);

            if (_etapas.includes('-2')) {
                global.info("No puede incluir la opcion TODOS en etapas", "Atencion");
                return;
            }
            //console.log(model)
            //console.log(Fraccionamiento);
            //console.log(Fraccionamiento.slice(0,-1))
            if (Nombre === null || Nombre === "" || Nombre === undefined) {
                warning("El campo Nombre es obligatorio", "Atención")
                return
            }
            if (FechaConformacion === undefined || FechaConformacion === null) {
                warning("El campo Fecha Conformacion es obligatorio", "Atención")
                return
            }
            if (Plaza === -2) {
                warning("La opción en el campo Plaza no es valida", "Atención");
                return;
            }
            //if (Fraccionamiento === -2) {
            //    warning("La opción en el campo Fraccionamiento no es valida", "Atención");
            //    return;
            //}
            if (Segmento === -2) {
                warning("La opción en el campo Segmento no es valida", "Atención");
                return;
            }

            if (Admin === 1 && (!NombreAdmin || NombreAdmin === undefined || NombreAdmin === null || NombreAdmin.trim() === '')) {
                global.info("Ingresa el nombre administradora", "Atención");
                return;
            }
            let parametros = [{
                Nombre: Nombre,
                FechaConformacion: FechaConformacion,
                Administradora: Admin,
                NombreAdministradora: NombreAdmin,
                Plaza: Plaza,
                Segmento: Segmento,
                Fraccionamiento: Fraccionamiento,
                Etapas:_etapas,
                Norte: Norte,
                Sur: Sur,
                Este: Este,
                Oeste: Oeste,
                Integrantes: Integrantes,
            }]
            console.log(parametros)
            global.asyncPost("base/kontrol/Comites/GetBP/SaveComiteInformacionComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:

                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data > 0) {
                            success("Registro Guardado", "Exito")
                            Forms.reset(PAGE_ID);
                            dispatchSuccessful("load::Integrantes", []);
                            dispatchSuccessful("load::tags$fraccionamientos$filteredLists", []);
                            dispatchSuccessful("load::ItemsTotalList", []);
                            dispatchSuccessful('load::ItemSeleccionadoDLLFracc', [])

                            Forms.updateFormElement(PAGE_ID, "Plaza", null);
                            Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null);
                            Forms.updateFormElement(PAGE_ID, "Segmento", null);
                            Forms.updateFormElement(PAGE_ID, "AreaGeografica", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';

                            getData()
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                            $(`#IntegrantesTable`).dxDataGrid("dispose");
                            setTimeout(() => {
                                onDataTableData("IntegrantesTable", [], columnsIntegrantes)
                            }, 1000)

                        } else if (data === -1) {
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            warning("El comite ya existe", "Atención");
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                        } else if (data === -2) {
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            warning("Ya existe un comite con el fraccionamiento y alguna etapa seleccionada", "Atención");
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        break;
                }
            })
        }

        onEdit() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model: any = Forms.getForm(PAGE_ID)
            let Nombre = model.NombreComite;
            let FechaConformacion = model.FechaConformacion;
            let Admin = model.Admin === "SI" ? 1 : 0;
            let Segmento = model.Vocaciones.ID;
            let Fraccionamiento = model.Fraccionamientos && model.Fraccionamientos !== null && model.Fraccionamientos !== undefined ? model.Fraccionamientos.ID : null;

            let Norte = model.Norte;
            let Sur = model.Sur;
            let Este = model.Este;
            let Oeste = model.Oeste;
            let Integrantes = global.getData(EK.Store.getState().global.Integrantes);
            let row = global.getData(EK.Store.getState().global.RowData)
            let NombreAdmin = model.NombreAdmin;

            if (Nombre === null || Nombre === "" || Nombre === undefined) {
                warning("El campo Nombre es obligatorio", "Atención")
                return
            }
            if (FechaConformacion === undefined || FechaConformacion === null) {
                warning("El campo Fecha Conformacion es obligatorio", "Atención")
                return
            }
            if (Fraccionamiento === null || Fraccionamiento === undefined) {
                global.info("Seleccione algun fraccionamiento", "Atencion");
                return;
            }

            let _etapas: any = '';
            for (let f of model.Etapas) {
                _etapas += f.Clave + ',';
            }

            _etapas = _etapas.slice(0, -1);

            if (_etapas.includes('-2')) {
                global.info("No puede incluir la opcion TODOS en etapas", "Atencion");
                return;
            }

            if (Admin === 1 && (!NombreAdmin || NombreAdmin === undefined || NombreAdmin === null || NombreAdmin.trim() === '')) {
                global.info("Ingresa el nombre administradora", "Atención");
                return;
            }

            let parametros = [{
                ID: row.Id,
                Nombre: Nombre,
                FechaConformacion: FechaConformacion,
                Administradora: Admin,
                NombreAdministradora: NombreAdmin,
                Segmento: Segmento,
                Fraccionamiento: Fraccionamiento,
                Etapas:_etapas,
                Norte: Norte,
                Sur: Sur,
                Este: Este,
                Oeste: Oeste,
                Integrantes: Integrantes,
            }]
            console.log(parametros)
            global.asyncPost("base/kontrol/Comites/GetBP/UpdateComiteInformacionComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data > 0) {
                            success("Registro Guardado", "Exito")
                            Forms.reset(PAGE_ID);
                            dispatchSuccessful("load::Integrantes", []);

                            Forms.updateFormElement(PAGE_ID, "Plaza", null);
                            Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null);
                            Forms.updateFormElement(PAGE_ID, "Segmento", null);
                            Forms.updateFormElement(PAGE_ID, "AreaGeografica", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });

                            loader.style.display = 'block';
                            loaded.style.display = 'none'
                            getData()
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                            $(`#IntegrantesTable`).dxDataGrid("dispose");
                            setTimeout(() => {
                                onDataTableData("IntegrantesTable", [], columnsIntegrantes)
                            }, 1000)

                        } else {
                            warning(data[0].msg, "Aviso");
                            loader.style.display = 'block';
                            loaded.style.display = 'none'
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                }
            })
        }
        onCancel() {
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            Forms.reset(PAGE_ID)
            Forms.updateFormElement(PAGE_ID, "Plaza", null);
            Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null);
            Forms.updateFormElement(PAGE_ID, "Segmento", null);
            Forms.updateFormElement(PAGE_ID, "AreaGeografica", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });

            dispatchSuccessful("load::Integrantes", []);
            $(`#IntegrantesTable`).dxDataGrid("dispose");
            setTimeout(() => {
                onDataTableData("IntegrantesTable", [], columnsIntegrantes)
            }, 200)
        }
        render(): JSX.Element {
            let totales = 0;
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "black";
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <PageButtons>
                    {
                        !isModeEdit ?
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color: "white", backgroundColor: "#4EC9A2" }} />
                            : null
                    }
                    {
                        isModeEdit ? <div>
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onEdit} style={{ marginRight: 5, color: "white", backgroundColor: "#4EC9A2" }} />
                            <Button id={"btnCancel"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancel} style={{ marginRight: 5, color: "white", backgroundColor: "#000" }} />
                        </div>
                            : null
                    }
                </PageButtons>
                <ComiteAreaGeograficaLoad />
                <ModalIntegrantes />
                <ModalDetalles />
            </page.Main>;
        };
    });
    //========================================================================
    // CREATE
    //=========================================================================
    const ComiteAreaGeograficaLoad: any = global.connect(class extends React.Component<IComiteInformacionComite, {}>{
        constructor(props: IComiteInformacionComite) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.integrantesComite = state.global.Integrantes;
            retValue.areaGeo = state.global.AreaGeografica_Seleccionada;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            itemsLoad: (data) => {
                $(`#IntegrantesTable`).dxDataGrid("dispose");
                onDataTableData("IntegrantesTable", data, columnsIntegrantes)
            }
        })
        componentWillReceiveProps(nextProps: IComiteInformacionComite): void {
            if (hasChanged(this.props.integrantesComite, nextProps.integrantesComite) && global.isSuccessful(nextProps.integrantesComite)) {
                if (isSuccessful(nextProps.integrantesComite) && nextProps.integrantesComite.data.length > 0) {
                    let data: any = global.getData(nextProps.integrantesComite);
                    this.props.itemsLoad(data)
                };
            };
            if (hasChanged(this.props.areaGeo, nextProps.areaGeo) && global.isSuccessful(nextProps.areaGeo)) {
                if (isSuccessful(nextProps.areaGeo) && nextProps.areaGeo.data.ID > 0) {
                    let data: any = global.getData(nextProps.areaGeo);
                    Forms.updateFormElement(PAGE_ID, "Plaza", data.Plaza)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", data.Fraccionamiento)
                    Forms.updateFormElement(PAGE_ID, "Segmento", data.SegmentoNombre)
                } else {
                    Forms.updateFormElement(PAGE_ID, "Plaza", null)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null)
                    Forms.updateFormElement(PAGE_ID, "Segmento", null)
                    Forms.updateFormElement(PAGE_ID, "AreaGeografica", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });

                };
            };
        }
        agregarIntegrante() {
            Forms.reset(FORM_INTEGRANTES)
            dispatchSuccessful("load::modeEditIntegrantes", { modeEditIntegrantes: false })
            let modal: any = $("#ModalIntegrantes");
            modal.modal();
        }

        toggleAdminName(show: any) {
            console.log(show)
            let doc = document.getElementById('divAdminName');
            if (show) {
                doc.classList.remove('item-hide');
                doc.classList.add('item-show')
            } else {
                doc.classList.remove('item-show');
                doc.classList.add('item-hide')
            }
            //let _show = show ? 'block' : 'none';
            //doc.style.display = _show;
            console.log(doc)
        }

        componentDidMount(): any {
            Forms.reset(PAGE_ID)
            dispatchSuccessful("load::Integrantes", [])
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            dispatchSuccessful("load::modeEditIntegrantes", { modeEditIntegrantes: false })
            onDataTableData("IntegrantesTable", [], columnsIntegrantes)
            Forms.updateFormElement(PAGE_ID, "AreaGeografica", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
            Forms.updateFormElement(PAGE_ID, "Admin", "NO");
            getData();
            dispatchSuccessful("load::Load", { load: false })
        };
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let textTitle = "ALTA";
            let icon = "fas fa-list-alt";

            if (isModeEdit) {
                textTitle = "EDITAR";
                icon = "fa fa-edit";
            }

            return <div id="">
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="Cargando..." />
                </div>
                <Row id="loadedData">
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={textTitle}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"COMITÉ"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <input.Text id="NombreComite" label="Nombre del comité" idForm={PAGE_ID} size={[12, 12, 8, 8]} required={true} validations={[validations.required()]} />
                                                <DatePicker id="FechaConformacion" type="date" label={"Fecha de conformación"} idForm={PAGE_ID} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                                            </Column>
                                            <Column size={[12, 12, 3, 3]}>
                                                <Column size={[12, 12, 12, 12]}>
                                                    <span><strong>ADMINISTRADORA</strong></span>
                                                </Column>
                                                <Column size={[12, 12, 12, 12]}>
                                                    <RadioButton id="SI" label="SI" idForm={PAGE_ID} groupName="Admin" size={[3, 3, 6, 6]} change={() =>  this.toggleAdminName(true) } />
                                                    <RadioButton id="NO" label="NO" idForm={PAGE_ID} groupName="Admin" size={[3, 3, 6, 6]} change={() => this.toggleAdminName(false)} />
                                                </Column>
                                            </Column>
                                            <Column size={[12, 12, 4, 4]} >
                                                <div className="item-hide" id="divAdminName">
                                                    <input.Text id="NombreAdmin"  label="Nombre administradora" idForm={PAGE_ID} size={[12, 12, 8, 8]} />
                                                </div>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                {
                                                    !isModeEdit ?
                                                 
                                                        <ddl.PlazasDDL label={"Plazas"} id="PlazaInicial" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />:

                                                        <label.Label id={"PlazaLabel"} size={[12, 12, 12, 4]} label={"Plazas"} idForm={PAGE_ID} />
                                                }
                                                <ddl.VocacionesFilterDDL2 id="Vocaciones" label="Segmento" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                <Fraccionamientosv2 id={"Fraccionamientos"} label={"Fraccionamiento"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                <page.TagsFraccionamientosPlazaAreasComunes label={"Etapas del fraccionamiento"} size={[12, 12, 4, 4]} id="Etapas" idForm={PAGE_ID} />

                                                
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"CALLES COLINDANTES"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <input.Text id="Norte" label="Norte" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                                <input.Text id="Sur" label="Sur" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                                <input.Text id="Este" label="Este" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                                <input.Text id="Oeste" label="Oeste" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"INTEGRANTES"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <SectionButtons >
                                            <Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.agregarIntegrante} style={{ marginRight: 5, color }} />
                                        </SectionButtons >
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <div id="IntegrantesTable" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>

                        </page.OptionSection>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"REGISTROS"}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row>
                                <div style={{ display: 'inherit' }}>
                                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                                </div>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </div >
        };
    });


    //========================================================================
    // INTEGRANTES COMITE
    //=========================================================================
    const ModalIntegrantes: any = global.connect(class extends React.Component<IComiteInformacionComite, {}>{
        constructor(props: IComiteInformacionComite) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditIntegrantes = state.global.modeEditIntegrantes;
            retValue.integrantesComite = state.global.Integrates;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        onCancel() {
            let modalCalen: any = $("#ModalIntegrantes");
            modalCalen.modal("hide");
        }
        onSave() {
            let model = Forms.getValues(FORM_INTEGRANTES);
            let Puesto = model.Puesto;
            let ApePaterno = model.ApellidoPaterno;
            let ApeMaterno = model.ApellidoMaterno;
            let Nombre = model.Nombre;
            let Calle = model.Calle;
            let Numero = model.Numero;
            let Telefono = model.Telefono
            let Integrantes = global.getData(EK.Store.getState().global.Integrantes);

            if (Puesto == null || Puesto === "" || Puesto === undefined) {
                warning("El campo Puesto es obligatorio", "Atencion")
                return
            }
            if (ApePaterno == null || ApePaterno === "" || ApePaterno === undefined) {
                warning("El campo Apellido Paterno es obligatorio", "Atencion")
                return
            }
            if (Nombre == null || Nombre === "" || Nombre === undefined) {
                warning("El campo Apellido Paterno es obligatorio", "Atencion")
                return
            }


            let integrante = {
                Puesto: Puesto,
                ApellidoPaterno: ApePaterno,
                ApellidoMaterno: ApeMaterno,
                Nombre: Nombre,
                Calle: Calle,
                Numero: Numero,
                Telefono: Telefono
            }

            Integrantes.push(integrante);
            let counter = 0
            for (let x of Integrantes) {
                counter++
                x.No = counter
            }

            dispatchSuccessful("load::Integrantes", Integrantes, PAGE_ID);

            success("Se agrego correctamente", "Atencion")



            Forms.reset(FORM_INTEGRANTES);
        }
        onEdit() {
            let model = Forms.getValues(FORM_INTEGRANTES);
            let Puesto = model.Puesto;
            let ApePaterno = model.ApellidoPaterno;
            let ApeMaterno = model.ApellidoMaterno;
            let Nombre = model.Nombre;
            let Calle = model.Calle;
            let Numero = model.Numero;
            let Telefono = model.Telefono
            let Integrantes = global.getData(EK.Store.getState().global.Integrantes);
            let row = global.getData(EK.Store.getState().global.RowDataIntegrantes)
            let item = Integrantes.filter(x => x.No !== row.No);

            if (Puesto == null || Puesto === "" || Puesto === undefined) {
                warning("El campo Puesto es obligatorio", "Atencion")
                return
            }
            if (ApePaterno == null || ApePaterno === "" || ApePaterno === undefined) {
                warning("El campo Apellido Paterno es obligatorio", "Atencion")
                return
            }
            if (Nombre == null || Nombre === "" || Nombre === undefined) {
                warning("El campo Apellido Paterno es obligatorio", "Atencion")
                return
            }
            let integrante = {
                No: row.No,
                Puesto: Puesto,
                ApellidoPaterno: ApePaterno,
                ApellidoMaterno: ApeMaterno,
                Nombre: Nombre,
                Calle: Calle,
                Numero: Numero,
                Telefono: Telefono
            }

            item.push(integrante);

            success("Se edito correctamente", "Atencion")

            dispatchSuccessful("load::Integrantes", item, PAGE_ID);
        }
        onRemove() { }
        footerModal(): JSX.Element {
            let isModeEdit;
            let allowEdit = isSuccessful(EK.Store.getState().global.modeEditIntegrantes);
            if (allowEdit) {
                isModeEdit = EK.Store.getState().global.modeEditIntegrantes.data.modeEditIntegrantes
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
                                /* !missingInfo ?*/
                                <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-plus" text={"Agregar"} onClick={this.onSave} style={{ marginRight: 10, color: 'white', backgroundColor: "#4EC9A2" }} />
                                /*   : null*/

                            }
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                        : <div>
                            <button type="button" onClick={this.onEdit} className="btn dark btn-outline btn-md yellow" >Editar</button>
                            <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
                        </div>
                }
            </div>;
        };


        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <modal.Modal id="ModalIntegrantes" header={"Integrantes comité"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <input.Text id="Puesto" label="Puesto" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                                <input.Text id="ApellidoPaterno" label="Apellido Paterno" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                                <input.Text id="ApellidoMaterno" label="Apellido Materno" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} />
                                <input.Text id="Nombre" label="Nombre" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                                <input.Text id="Calle" label="Calle" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} />
                                <input.Text id="Numero" label="Numero" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} />
                                <input.Telefono id="Telefono" label="Telefono" idFormSection={FORM_INTEGRANTES} size={[12, 12, 4, 4]} />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </modal.Modal>
        };
    });

    const ModalDetalles: any = global.connect(class extends React.Component<IComiteInformacionComite, {}>{
        constructor(props: IComiteInformacionComite) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditIntegrantes = state.global.modeEditIntegrantes;
            retValue.integrantesComite = state.global.Integrates;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })

        footerModal(): JSX.Element {
            return <div className="modal-footer">
                <button type="button" className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onExport() {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Detalle de evento');
            const data = global.getData(EK.Store.getState().global.DatatoExport);
           
            //  estilos
            const headerStyle = { font: { bold: true, size: 12 }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } } };
            const cellStyle = { font: { size: 11 } };
            const borderStyle = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            // Información del comité
            let comiteHeaders = ['Id', 'Nombre de comite', 'Fecha conformacion', 'Administradora', 'Plaza', 'Fraccionamiento', 'Segmento', 'Norte', 'Sur', 'Este', 'Oeste'];
            let comiteKeys = ['ID', 'Nombre', 'FechaConformacion', 'Administradora', 'Plaza', 'Fraccionamiento', 'Segmento', 'Norte', 'Sur', 'Este', 'Oeste'];
            let comiteRow = worksheet.addRow(comiteHeaders);
            comiteRow.font = { bold: true };
            comiteRow.font = headerStyle.font;
            comiteRow.fill = headerStyle.fill;
            comiteRow.eachCell(cell => cell.border = borderStyle);

            let dataRow = [];
            for (let key of comiteKeys) {
                if (key === 'Administradora') {
                   data[key] = data[key] ? 'SI':'NO'
                }
                dataRow.push(data[key]);
            }

            worksheet.addRow(dataRow).eachCell(cell => cell.border = borderStyle);

            // Deja una linea en blanco entre la informacion del comite y los integrantes
            worksheet.addRow([]);

            // Integrantes
            let membersHeaders = ['No.', 'Puesto', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Calle', 'Numero', 'Telefono'];
            let membersKeys = ['No', 'Puesto', 'Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 'Calle', 'Numero', 'Telefono'];
            let membersRow = worksheet.addRow(membersHeaders);
            membersRow.font = { bold: true };
            membersRow.font = headerStyle.font;
            membersRow.fill = headerStyle.fill;
            membersRow.eachCell(cell => cell.border = borderStyle);

            for (let member of data.Integrantes) {
                let rowData = [];
                for (let key of membersKeys) {
                    rowData.push(member[key]);
                }
                worksheet.addRow(rowData).eachCell(cell => cell.border = borderStyle);
            }

            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'InformaciónComitéDetalle.xlsx');
            });
        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = global.getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ModalIntegrantesDetalle" header={"Detalle"} footer={this.footerModal()}
                addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        {
                            load ?
                                <div className="alert alert-info" style={{ marginTop: 20 }}>
                                    <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                </div>
                                : null

                        }
                        {
                            !load ?
                                <Row>
                                    <Column size={[12, 12, 12, 12]}>
                                        <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Exportar"} onClick={this.onExport} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2", float: 'rigth' }} />
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <label.Label id={"NombreComiteLabel"} size={[12, 12, 4, 4]} label={"Nombre del comité"} idForm={PAGE_ID} />
                                        <label.Label id={"FechaConformacionLabel"} size={[12, 12, 4, 4]} label={"Fecha Conformación"} idForm={PAGE_ID} />
                                        <label.Label id={"AdministradoraLabel"} size={[12, 12, 4, 4]} label={"Administradora"} idForm={PAGE_ID} />
                                        {/*<label.Label id={"AreaGeograficaLabel"} size={[12, 12, 4, 4]} label={"Area Geografica"} idForm={PAGE_ID} />*/}
                                        <label.Label id={"PlazaLabel"} size={[12, 12, 4, 4]} label={"Plaza"} idForm={PAGE_ID} />
                                        <label.Label id={"SegmentoLabel"} size={[12, 12, 4, 4]} label={"Segmento"} idForm={PAGE_ID} />

                                        <label.Label id={"FraccionamientoLabel"} size={[12, 12, 4, 4]} label={"Fraccionamiento"} idForm={PAGE_ID} />

                                        <label.Label id={"EtapasDescLabel"} size={[12, 12, 12, 12]} label={"Etapas"} idForm={PAGE_ID} />
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <h4>CALLES COLINDANTES</h4>
                                        <label.Label id={"NorteLabel"} size={[12, 12, 4, 4]} label={"Norte"} idForm={PAGE_ID} />
                                        <label.Label id={"SurLabel"} size={[12, 12, 4, 4]} label={"Sur"} idForm={PAGE_ID} />
                                        <label.Label id={"EsteLabel"} size={[12, 12, 4, 4]} label={"Este"} idForm={PAGE_ID} />
                                        <label.Label id={"OesteLabel"} size={[12, 12, 4, 4]} label={"Oeste"} idForm={PAGE_ID} />
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <h4>INTEGRANTES DEL COMITE</h4>
                                        <div id="IntegrantesTableDetalles" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                                    </Column>
                                </Row>
                                : null
                        }

                    </Column>
                </Row>
            </modal.Modal>
        };
    });

};
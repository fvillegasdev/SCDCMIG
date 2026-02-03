namespace EK.Modules.SCV.Pages.postventa.RUBA.AsociacionCivil {
    "use strict";
    const PAGE_ID = "AsociacionCivil";
    const INTEGRANTES = "INTEGRANTES";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);
    declare const DevExpress: any;
    declare const ExcelJS: any;
    declare const Set: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;
    interface IAsociacionCivil extends page.IProps {
        modeEdit: any,
        initTable?: (data: any) => void,
        loadCatalogo: () => void,
        FraccSel: any,
        AdminSi: any,
        loadData: any,
        ClienteSelected: any,
        itemsLoad: (data) => void,
        Integrantes: any,
        loadFondo: any,
        loadComite: any,
        ComiteSel: any,
        RefreshFondo: any,
        ComiteFraccionamiento: any
    };
    let columnsIntegrantes = [
        { caption: "No", dataField: "No" },
        { caption: "Puesto", dataField: "Puesto" },
        //{ caption: "No. Cliente", dataField: "No" },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno" },
        { caption: "Apellino Materno", dataField: "ApellidoMaterno" },
        { caption: "Nombre", dataField: "Nombre" },
        { caption: "Calle", dataField: "Calle" },
        { caption: "Numero", dataField: "Numero" },
        { caption: "Telefono", dataField: "Telefono" },
        //{
        //    caption: "Editar",
        //    type: 'buttons',
        //    buttons: ['edit', {
        //        hint: 'Editar',
        //        icon: 'fa fa-edit',
        //        onClick(e) {
        //            let data = e.row.data
        //            dispatchSuccessful("load::RowDataIntegrantes", data)
        //            Forms.updateFormElement(INTEGRANTES, "Puesto", { ID: data.IdPuesto, Nombre: data.Puesto })
        //            Forms.updateFormElement(INTEGRANTES, "NoCliente", data.No)
        //            Forms.updateFormElement(INTEGRANTES, "ApePaterno", data.ApellidoPaterno)
        //            Forms.updateFormElement(INTEGRANTES, "ApeMaterno", data.ApellidoMaterno)
        //            Forms.updateFormElement(INTEGRANTES, "Nombre", data.Nombre)
        //            Forms.updateFormElement(INTEGRANTES, "Calle", data.Calle)
        //            Forms.updateFormElement(INTEGRANTES, "Numero", data.Numero)
        //            Forms.updateFormElement(INTEGRANTES, "Telefono", data.Telefono)
        //            dispatchSuccessful("load::modeEditIntegrantes", { modeEditIntegrantes: true })
        //            let modal: any = $("#ModalIntegrantes");
        //            modal.modal();
        //        },
        //    }],
        //},
        //{
        //    caption: "Eliminar",
        //    type: 'buttons',
        //    buttons: ['edit', {
        //        hint: 'Eliminar',
        //        icon: 'fa fa-trash',
        //        onClick(e) {
        //            let data = e.row.data
        //            let integrantes = global.getData(EK.Store.getState().global.Integrantes);

        //            let items = integrantes.filter(x => x.No !== data.No);

        //            let count = 0;
        //            for (let x of items) {
        //                count++;
        //                x.No = count;
        //            }

        //            dispatchSuccessful("load::Integrantes", items)
        //            if (items.length === 0) {
        //                $(`#IntegrantesTable`).dxDataGrid("dispose");
        //                onDataTableData("IntegrantesTable", [], columnsIntegrantes)
        //            }
        //        }
        //    }]
        //}
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
        })
        const columns = [
            { caption: "ID", dataField: "ID" },
            { caption: "Nombre Razon Social", dataField: "NombreRazonSocial" },
            { caption: "Fecha Constitucion", dataField: "FechaConstitucion", dataType: "datetime", format: "dd/MM/yyyy" },
            { caption: "Notaria", dataField: "Notaria" },
            { caption: "Comité", dataField: "NombreComite" },
            { caption: "Administradora", dataField: "Administradora" },
            { caption: "Nombre Administradora", dataField: "NombreAdmin" },
            { caption: "Plaza", dataField: "Plaza" },
            { caption: "Segmento", dataField: "Segmento" },
            { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
            { caption: "Cuenta Bancaria", dataField: "CuentaBancaria" },
            { caption: "Porcentaje Entregadas", dataField: "PorcentajeEntregado" },
            { caption: "Cuota Mantenimiento", dataField: "CuotaMantenimiento" },
            {
                caption: "Fondo Convive", dataField: "FondoConvive", dataType: 'number',
                format: {
                    type: 'currency',
                    precision: 2,
                    currency: 'USD'
                }
            },
            { caption: "Alta Hacienda", dataField: "AltaHacienda" },
            //{ caption: "Hipoteca con Servicios", dataField: "HipotecaServicios" },
            {
                caption: "Editar",
                type: 'buttons',
                buttons: ['edit', {
                    hint: 'Editar',
                    icon: 'fa fa-edit',
                    onClick(e) {
                        let data = e.row.data

                        dispatchSuccessful("load::RowData", data)

                        Forms.updateFormElement(PAGE_ID, "NombreRazonSocial", data.NombreRazonSocial);
                        Forms.updateFormElement(PAGE_ID, "FechaConstitucion", data.FechaConstitucion);
                        Forms.updateFormElement(PAGE_ID, "Notaria", data.Notaria);
                        Forms.updateFormElement(PAGE_ID, "Admin", data.Administradora ? 'SI' : 'NO');
                        Forms.updateFormElement(PAGE_ID, "NombreAdmin", data.NombreAdmin);
                        //dispatchSuccessful("load::Plaza_Seleccionada", { ID: data.IdPlaza, Nombre: data.Plaza })
                        Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: data.IdFraccionamiento, Clave: data.ClaveFraccionamiento, Nombre: data.Fraccionamiento });
                        dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", { ID: data.IdFraccionamiento, Clave: data.ClaveFraccionamiento, Nombre: data.Fraccionamiento })
                        setTimeout(() => {
                            Forms.updateFormElement(PAGE_ID, 'ComiteFraccionamiento', { ID: data.IdComite, Clave: data.IdComite, Nombre: data.NombreComite, IdSegmento: data.IdSegmento, IdPlaza: data.IdPlaza })
                            Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza);
                            Forms.updateFormElement(PAGE_ID, "VocacionesLabel", data.Segmento);
                        },1000)
                        Forms.updateFormElement(PAGE_ID, "CuentaBancaria", data.CuentaBancaria);
                        Forms.updateFormElement(PAGE_ID, "CuotaMantenimiento", data.CuotaMantenimiento);

                        Forms.updateFormElement(PAGE_ID, "AltaHacienda", data.AltaHacienda);
                        //Forms.updateFormElement(PAGE_ID, "Hipoteca", data.HipotecaServicios ? 'SIH' : 'NOH');
                        let comite = global.getData(EK.Store.getState().global.Comite)
                        //getIntegrantesByAC(data.IdComite)


                        dispatchSuccessful("load::modeEdit", { modeEdit: true })

                        window.scrollTo({ top: 0, behavior: 'smooth' });
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

                        let Id = e.row.data.ID
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
                        let id = e.row.data.ID
                        let row = e.row.data;
                        dispatchSuccessful("load::DataToExport", row);
                        console.log(row)
                        Forms.updateFormElement(PAGE_ID, "NombreRazonSocialLabel", row.NombreRazonSocial);
                        Forms.updateFormElement(PAGE_ID, "ComiteLabel", row.NombreComite);
                        Forms.updateFormElement(PAGE_ID, "FechaConstitucionLabel", row.FechaConstitucion.toLocaleDateString());
                        Forms.updateFormElement(PAGE_ID, "NotariaLabel", row.Notaria);
                        Forms.updateFormElement(PAGE_ID, "AdministradoraLabel", row.Administradora ? "SI" : "NO");
                        Forms.updateFormElement(PAGE_ID, "NombreAdministradoraLabel", row.NombreAdmin);
                        Forms.updateFormElement(PAGE_ID, "PlazaDetLabel", row.Plaza);
                        Forms.updateFormElement(PAGE_ID, "SegmentoDetLabel", row.Segmento);
                        Forms.updateFormElement(PAGE_ID, "FraccionamientoLabel", row.Fraccionamiento);
                        Forms.updateFormElement(PAGE_ID, "CuentaBancariaLabel", row.CuentaBancaria);
                        Forms.updateFormElement(PAGE_ID, "PorcentajeEntLabel", `${row.PorcentajeEntregado}%`);
                        Forms.updateFormElement(PAGE_ID, "CuotaMantenimientoLabel", row.CuotaMantenimiento);
                        Forms.updateFormElement(PAGE_ID, "FondoConviveLabel", row.FondoConvive.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }));
                        Forms.updateFormElement(PAGE_ID, "AltaHaciendaLabel", row.AltaHacienda);
                        //Forms.updateFormElement(PAGE_ID, "HipotecaServiciosLabel", row.HipotecaServicios ? "SI" : "NO");
                        let parametros = global.assign({
                            IDCOMITE: row.IdComite
                        })
                        global.asyncPost("base/kontrol/AsociacionCivil/GetBP/GetIntegrantesComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    dispatchSuccessful("load::IntegrantesByRow", data)
                                    let columnsDetalles = [
                                        { caption: "No", dataField: "No" },
                                        { caption: "Puesto", dataField: "Puesto" },
                                        { caption: "Apellido Paterno", dataField: "ApellidoPaterno" },
                                        { caption: "Apellino Materno", dataField: "ApellidoMaterno" },
                                        { caption: "Nombre", dataField: "Nombre" },
                                        { caption: "Calle", dataField: "Calle" },
                                        { caption: "Numero", dataField: "Numero" },
                                        { caption: "Telefono", dataField: "Telefono" },
                                    ]
                                    onDataTableData("IntegrantesDetalle", data, columnsDetalles)

                                    break
                                case AsyncActionTypeEnum.loading:
                                    break;
                                case AsyncActionTypeEnum.failed:
                                    break;
                            }
                        })
                        let modal: any = $("#ModalDetalles");
                        modal.modal();
                    },
                }],
            },
        ];
        global.asyncPost("base/kontrol/AsociacionCivil/GetBP/GetAsociacionCivil/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
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
                            fileName: "AsociacionCivil",
                            allowExportSelectedData: false
                        },
                        onExporting: function (e) {

                            e.cancel = true;
                            for (const d of data) {
                                d.Administradora = d.Administradora ? 'SI' : 'NO';
                                //d.HipotecaServicios = d.HipotecaServicios ? 'SI' : 'NO';
                            }
                            e.cancel = false;
                            setTimeout(() => {
                                for (const d of data) {
                                    d.Administradora = d.Administradora === 'SI' ? true : false
                                    //d.HipotecaServicios = d.HipotecaServicios === 'SI' ? true : false
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
                    loader.style.display = 'none';
                    loaded.style.display = 'inherit';
                    break;
            }
        })
    }

    let onDelete = (Id) => {
        let loader = document.getElementById('loading');
        let loaded = document.getElementById('loadedData');
        EK.Global.confirmTrueFalse("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
            let parametros = global.assign({
                ID: Id,
            });
            global.asyncPost("base/kontrol/AsociacionCivil/GetBP/DeleteInfoAsociacionCivil/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito")
                            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
                            Forms.updateFormElement(PAGE_ID, "ComiteFraccionamiento", null)
                            Forms.updateFormElement(PAGE_ID, "NombreRazonSocial", null)
                            Forms.updateFormElement(PAGE_ID, "PlazaLabel", null)
                            Forms.updateFormElement(PAGE_ID, "SegmentoLabel", null)
                            Forms.updateFormElement(PAGE_ID, "FechaConstitucion", null)
                            Forms.updateFormElement(PAGE_ID, "Notaria", null)
                            Forms.updateFormElement(PAGE_ID, "Admin", null)
                            Forms.updateFormElement(PAGE_ID, "NombreAdmin", null)
                            Forms.updateFormElement(PAGE_ID, "CuentaBancaria", null)
                            Forms.updateFormElement(PAGE_ID, "CuotaMantenimiento", null)
                            Forms.updateFormElement(PAGE_ID, "AltaHacienda", null)
                            Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null)
                            Forms.updateFormElement(PAGE_ID, "FondoConvive", null)
                            //Forms.updateFormElement(PAGE_ID, "Hipoteca", null)
                            getData()
                            dispatchSuccessful("load::Integrantes", [])
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                        } else {
                            warning("Ha ocurrido un error", "Aviso");
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

    let DeleteMateriales = (NoMaterial: number) => {
        let data = global.getData(EK.Store.getState().global.Materiales)

        let items = data.filter(x => x.No !== NoMaterial);
        let counter = 0
        for (let x of items) {
            counter++
            x.No = counter
        }
        dispatchSuccessful("load::Materiales", items, PAGE_ID);
        if (items.length === 0) {
            let columns = [
                { caption: "No", dataField: "No", alignment: 'center' },
                { caption: "Material", dataField: "NombreMaterial", alignment: 'center' },
                {
                    caption: "Eliminar",
                    type: 'buttons',
                    buttons: ['delete', {
                        hint: 'Eliminar',
                        icon: 'fa fa-trash',
                        onClick(e) {

                            let Id = e.row.data.No
                            DeleteMateriales(Id)

                        },
                    }],
                },
            ]
            onDataTableData("MaterialTable", [], columns)

        }
        Forms.reset(INTEGRANTES);
    }

    let getIntegrantesByAC = (Id: number) => {
        let parametros = global.assign({
            IDCOMITE: Id
        })
        global.dispatchAsyncPost("load::Integrantes", "base/kontrol/AsociacionCivil/GetBP/GetIntegrantesComite/", { parametros: parametros });
    }
    export let Vista = global.connect(class extends React.Component<IAsociacionCivil, {}> {
        constructor(props: IAsociacionCivil) {
            super(props);
            this.onsave = this.onsave.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        })

        componentWillReceiveProps(nextProps: IAsociacionCivil): void {

        }
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let modeEdit = EK.Store.getState().global.modeEdit.data.modeEdit
            let model: any = Forms.getForm(PAGE_ID)
            //let Comite = global.getData(EK.Store.getState().global.Comite);
            //if (Comite === null) {
            //    warning("El fraccionamiento no tiene un comite asignado", "Atencion");
            //    return
            //}
            let Comite = model.ComiteFraccionamiento;
            if (Comite === undefined || Comite === null) {
                warning("Favor de seleccionar un Comité", "Atencion");
                return;
            }
            let Nombre = model.NombreRazonSocial;
            let FechaConstitucion = model.FechaConstitucion;
            let Notaria = model.Notaria;
            let Admin = model.Admin == 'SI' ? 1 : 0;
            let Fraccionamiento = model.FraccInicial.ID;
            let NombreAdmin = model.NombreAdmin;
            let Plaza = modeEdit ? EK.Store.getState().global.RowData.data.IdPlaza : Comite.IdPlaza;
            let Segmento = Comite.IdSegmento;
            let CuentaBancaria = model.CuentaBancaria;
            let CuotaMantenimiento = model.CuotaMantenimiento;
            let AltaHacienda = model.AltaHacienda;
            //let HipotecaServicios = model.Hipoteca === 'SIH' ? 1 : 0;
            let FondoConvive = parseFloat(model.FondoConvive.replace(/[\$,]/g, ''));
            let PorcentajeEnt = model.PorcentajeEnt;
            let Integrantes = global.getData(EK.Store.getState().global.Integrantes);
            let parametros = [];
            let Id = modeEdit ? EK.Store.getState().global.RowData.data.ID : 0;



            if (Nombre === undefined || Nombre === null || Nombre === "") {
                warning("El Campo Nombre o Razon social es Obligatorio", "Atencion");
                return;
            }
            if (Notaria === undefined || Notaria === null || Notaria === "") {
                warning("El Campo Notaria es Obligatorio", "Atencion");
                return;
            }

            //if (Segmento === -2) {
            //    warning("La opcion Todos en el campo Segmento es incorrecta, favor de seleccionar otra opcion", "Atencion");
            //    return;
            //}
            if (Fraccionamiento === -2) {
                warning("La opcion Todos en el campo Fraccionamiento es incorrecta, favor de seleccionar otra opcion", "Atencion");
                return;
            }
            if (Fraccionamiento === -1) {
                warning("Favor de seleccionar una opcion en el campo Fraccionamiento", "Atencion");
                return;
            }
            if (CuentaBancaria === undefined || CuentaBancaria === null || CuentaBancaria === "") {
                warning("Favor de seleccionar una opcion en el campo Cuenta Bancaria", "Atencion");
                return;
            }
            if (CuotaMantenimiento === undefined || CuotaMantenimiento === null || CuotaMantenimiento === "") {
                warning("Favor de seleccionar una opcion en el campo Cuota Mantenimiento", "Atencion");
                return;
            }
            if (AltaHacienda === undefined || AltaHacienda === null || AltaHacienda === "") {
                warning("Favor de seleccionar una opcion en el campo Alta Hacienda", "Atencion");
                return;
            }
            parametros.push({
                ID: Id,
                NombreRazonSocial: Nombre,
                FechaConstitucion: FechaConstitucion,
                Notaria: Notaria,
                Administradora: Admin,
                NombreAdmin: NombreAdmin,
                IdPlaza: Plaza,
                IdSegmento: Segmento,
                IdFraccionamiento: Fraccionamiento,
                CuentaBancaria: CuentaBancaria,
                CuotaMantenimiento: CuotaMantenimiento,
                AltaHacienda: AltaHacienda,
                //HipotecaServicios: HipotecaServicios,
                PorcentajeEntregado: PorcentajeEnt.replace('%', ""),
                FondoConvive: FondoConvive,
                IdComite: Comite.ID
                //Integrantes: Integrantes
            })
            console.log(parametros)
            global.asyncPost("base/kontrol/AsociacionCivil/GetBP/Save/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                        if (data > 0) {
                            getData()
                            success("Registro Guardado", "Exito")
                            dispatchSuccessful("load::Integrantes", [])
                            onDataTableData("IntegrantesTable", [], columnsIntegrantes)
                            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
                            Forms.updateFormElement(PAGE_ID, "NombreRazonSocial", null)
                            Forms.updateFormElement(PAGE_ID, "ComiteFraccionamiento", null)
                            Forms.updateFormElement(PAGE_ID, "PlazaLabel", null)
                            Forms.updateFormElement(PAGE_ID, "SegmentoLabel", null)
                            Forms.updateFormElement(PAGE_ID, "FechaConstitucion", null)
                            Forms.updateFormElement(PAGE_ID, "Notaria", null)
                            Forms.updateFormElement(PAGE_ID, "Admin", null)
                            Forms.updateFormElement(PAGE_ID, "NombreAdmin", null)
                            Forms.updateFormElement(PAGE_ID, "CuentaBancaria", null)
                            Forms.updateFormElement(PAGE_ID, "CuotaMantenimiento", null)
                            Forms.updateFormElement(PAGE_ID, "AltaHacienda", null)
                            Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null)
                            Forms.updateFormElement(PAGE_ID, "FondoConvive", null)
                            //Forms.updateFormElement(PAGE_ID, "Hipoteca", null)

                        } else if (data === -1) {
                            warning("Existe un registro guardado con ese nombre, verifique la información", "Aviso");
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
                            Forms.updateFormElement(PAGE_ID, "NombreRazonSocial", null)
                            Forms.updateFormElement(PAGE_ID, "ComiteFraccionamiento", null)
                            Forms.updateFormElement(PAGE_ID, "PlazaLabel", null)
                            Forms.updateFormElement(PAGE_ID, "SegmentoLabel", null)
                            Forms.updateFormElement(PAGE_ID, "FechaConstitucion", null)
                            Forms.updateFormElement(PAGE_ID, "Notaria", null)
                            Forms.updateFormElement(PAGE_ID, "NombreAdmin", null)
                            Forms.updateFormElement(PAGE_ID, "Admin", null)
                            Forms.updateFormElement(PAGE_ID, "CuentaBancaria", null)
                            Forms.updateFormElement(PAGE_ID, "CuotaMantenimiento", null)
                            Forms.updateFormElement(PAGE_ID, "AltaHacienda", null)
                            Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null)
                            Forms.updateFormElement(PAGE_ID, "FondoConvive", null)
                            //Forms.updateFormElement(PAGE_ID, "Hipoteca", null)
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
        componentDidMount(): any {
            dispatchSuccessful("load::modeEditIntegrantes", { modeEditIntegrantes: false })
            dispatchSuccessful("load::Integrantes", [], PAGE_ID)
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            dispatchSuccessful("load::loadFondo", { loadFondo: false })
            dispatchSuccessful("load::loadComite", { loadComite: false })
            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción" });
            getData();
        };
        onCancel() {
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
            Forms.updateFormElement(PAGE_ID, "NombreRazonSocial", null)
            Forms.updateFormElement(PAGE_ID, "Comite", null)
            Forms.updateFormElement(PAGE_ID, "PlazaLabel", null)
            Forms.updateFormElement(PAGE_ID, "SegmentoLabel", null)
            Forms.updateFormElement(PAGE_ID, "FechaConstitucion", null)
            Forms.updateFormElement(PAGE_ID, "Notaria", null)
            Forms.updateFormElement(PAGE_ID, "Admin", null)
            Forms.updateFormElement(PAGE_ID, "NombreAdmin", null)
            Forms.updateFormElement(PAGE_ID, "CuentaBancaria", null)
            Forms.updateFormElement(PAGE_ID, "CuotaMantenimiento", null)
            Forms.updateFormElement(PAGE_ID, "AltaHacienda", null)
            Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null)
            Forms.updateFormElement(PAGE_ID, "FondoConvive", null)
            //Forms.updateFormElement(PAGE_ID, "Hipoteca", null)
            Forms.updateFormElement(PAGE_ID, "ComiteFraccionamiento", null)
            dispatchSuccessful("load::Integrantes", [], PAGE_ID)
            dispatchSuccessful("load::ComiteFraccionamiento", [], PAGE_ID)
            onDataTableData("IntegrantesTable", [], columnsIntegrantes)
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
                    <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color: "white", backgroundColor: "#4EC9A2" }} />
                    {
                        isModeEdit ?
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancel} style={{ marginRight: 5, color: "white", backgroundColor: "#000" }} />
                            : null
                    }
                </PageButtons>
                <AsociacionCivil />
                <ModalIntegrantes />
                <ModalDetalle />
            </page.Main>;
        };
    });
    //========================================================================
    // CREATE 
    //=========================================================================
    const AsociacionCivil: any = global.connect(class extends React.Component<IAsociacionCivil, {}>{
        constructor(props: IAsociacionCivil) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.Integrantes = state.global.Integrantes;
            retValue.comiteSelected = state.global.COMITES_Seleccionada;
            retValue.FraccSel = Forms.getDataValue("FraccInicial", PAGE_ID, state);
            retValue.ComiteSel = Forms.getDataValue("ComiteFraccionamiento", PAGE_ID, state);
            retValue.AdminSi = Forms.getDataValue("Admin", PAGE_ID, state);
            retValue.ClienteSelected = Forms.getDataValue("Cliente", INTEGRANTES, state);
            retValue.loadFondo = state.global.loadFondo;
            retValue.loadComite = state.global.loadComite;
            retValue.RefreshFondo = state.global.RefreshFondo;
            retValue.ComiteFraccionamiento = state.global.ComiteFraccionamiento
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            itemsLoad: (data) => {
                // $(`#IntegrantesTable`).dxDataGrid("dispose");
                onDataTableData("IntegrantesTable", data, columnsIntegrantes)
            }
        })

        componentDidMount(): void {
            global.dispatchAsyncPost("load::FRACCIONAMIENTO", "base/kontrol/fraccionamientos/GetBP/getFraccionamientosProyecto", { parametros: { IdPlaza: null } });
        }
        shouldComponentUpdate(nextProps: IAsociacionCivil, { }): boolean {
            return hasChanged(this.props.FraccSel, nextProps.FraccSel) ||
                hasChanged(this.props.loadComite, nextProps.loadComite) ||
                hasChanged(this.props.Integrantes, nextProps.Integrantes) ||
                hasChanged(this.props.AdminSi, nextProps.AdminSi) ||
                hasChanged(this.props.ComiteSel, nextProps.ComiteSel) ||
                hasChanged(this.props.loadFondo, nextProps.loadFondo);
        };
        componentWillReceiveProps(nextProps: IAsociacionCivil): void {
            if (hasChanged(this.props.Integrantes, nextProps.Integrantes) && global.isSuccessful(nextProps.Integrantes)) {
                if (isSuccessful(nextProps.Integrantes) && nextProps.Integrantes.data.length > 0) {
                    let data: any = global.getData(nextProps.Integrantes);
                    this.props.itemsLoad(data)
                };
            };
            if (hasChanged(this.props.ClienteSelected, nextProps.ClienteSelected) && getDataID(this.props.ClienteSelected) !== getDataID(nextProps.ClienteSelected)) {
                if (isSuccessful(nextProps.ClienteSelected) && nextProps.ClienteSelected.data.ID > 0) {
                    let data: any = global.getData(nextProps.ClienteSelected);
                    let Numcte = data.ID
                    let parametros = global.assign({
                        ID: Numcte,
                    })
                    global.asyncPost("base/kontrol/AsociacionCivil/GetBP/GetCliente/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                if (res) {
                                    console.log(res)
                                    let telefono;
                                    let numero;
                                    Forms.updateFormElement(INTEGRANTES, 'NoCliente', res[0].numcte);
                                    Forms.updateFormElement(INTEGRANTES, 'Nombre', res[0].nom_cte);
                                    Forms.updateFormElement(INTEGRANTES, 'ApePaterno', res[0].ap_paterno_cte);
                                    Forms.updateFormElement(INTEGRANTES, 'ApeMaterno', res[0].ap_materno_cte);
                                    Forms.updateFormElement(INTEGRANTES, 'Calle', data.Calle);
                                    telefono = res[0].tel_casa === null ? res[0].tel_otros : res[0].tel_casa;
                                    numero = data.Exterior + (data.Interior !== '0' && data.Interior !== null ? '-' + data.Interior : '');
                                    Forms.updateFormElement(INTEGRANTES, 'Numero', numero);
                                    Forms.updateFormElement(INTEGRANTES, 'Telefono', telefono);
                                }
                                break;
                            case AsyncActionTypeEnum.loading:
                                break;
                            case AsyncActionTypeEnum.failed:
                                break;
                        }
                    })
                }
            };
            if (isSuccessful(nextProps.ComiteSel) && hasChanged(this.props.ComiteSel, nextProps.ComiteSel) && global.getDataID(nextProps.ComiteSel) !== -1 && global.getData(this.props.ComiteSel).ID !== global.getData(nextProps.ComiteSel).ID) {
                if (global.getData(nextProps.ComiteSel).ID > 0) {
                    let data: any = global.getData(nextProps.ComiteSel);
                    Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza)
                    Forms.updateFormElement(PAGE_ID, "VocacionesLabel", data.Segmento)
                    let parametros = global.assign({
                        IDCOMITE: data.ID
                    })
                    global.asyncPost("base/kontrol/AsociacionCivil/GetBP/GetIntegrantesComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                dispatchSuccessful("load::Integrantes", data)
                                onDataTableData("IntegrantesTable", data, columnsIntegrantes)
                                break
                            case AsyncActionTypeEnum.loading:
                                break;
                            case AsyncActionTypeEnum.failed:
                                break;
                        }
                    })
                }
            }
            //if (isSuccessful(nextProps.ComiteSel) && hasChanged(this.props.ComiteSel, nextProps.ComiteSel) && global.getDataID(nextProps.ComiteSel) !== -1 && global.getData(this.props.ComiteSel).ID !== global.getData(nextProps.ComiteSel).ID) {
            //    if (global.getData(nextProps.ComiteSel).ID > 0 ) {
            //        let data: any = global.getData(nextProps.ComiteSel);
            //        let parametros = global.assign({
            //            IDCOMITE: data.ID
            //        })
            //        Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza)
            //        Forms.updateFormElement(PAGE_ID, "VocacionesLabel", data.Segmento)
            //        global.asyncPost("base/kontrol/AsociacionCivil/GetBP/GetIntegrantesComite/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    dispatchSuccessful("load::Integrantes", data)
            //                    onDataTableData("IntegrantesTable", data, columnsIntegrantes)

            //                    break
            //                case AsyncActionTypeEnum.loading:
            //                    break;
            //                case AsyncActionTypeEnum.failed:
            //                    break;
            //            }
            //        })
            //        let fracc: any = global.getData(nextProps.FraccSel);
            //        let modeEdit = EK.Store.getState().global.modeEdit.data.modeEdit;
            //        let Plaza = modeEdit ? EK.Store.getState().global.RowData.data.IdPlaza : data.IdPlaza;
            //        let p = global.assign({
            //            Plaza: Plaza,
            //            ClaveFracc: fracc.Clave
            //        })
            //        global.asyncPost("base/kontrol/ReporteAnalisisComunidades/GetBP/GetTotalesParaAnalisisComunidad/", { parametros: p }, (status: AsyncActionTypeEnum, resp: any) => {
            //            switch (status) {
            //                case AsyncActionTypeEnum.successful:
            //                    if (resp) {
            //                        Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza)
            //                        Forms.updateFormElement(PAGE_ID, "VocacionesLabel", data.Segmento)
            //                        Forms.updateFormElement(PAGE_ID, "FondoConvive", resp.fondoConvive.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
            //                        Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", `${resp.porVivEntregada}%`)
            //                        dispatchSuccessful("load::loadFondo", { loadFondo: false })
            //                    } else {
            //                        Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null);
            //                        Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
            //                        dispatchSuccessful("load::loadFondo", { loadFondo: false })
            //                    }
            //                    break;
            //                case AsyncActionTypeEnum.loading:
            //                    break;
            //                case AsyncActionTypeEnum.failed:
            //                    dispatchSuccessful("load::loadFondo", { loadFondo: false })
            //                    break;
            //            }
            //        })
            //    } else {
            //        Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null);
            //        // Forms.updateFormElement(PAGE_ID, "ComiteFraccionamiento", null);
            //        Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
            //        Forms.updateFormElement(PAGE_ID, "PlazaLabel", null);
            //        Forms.updateFormElement(PAGE_ID, "VocacionesLabel", null);
            //        setTimeout(() => {
            //            onDataTableData("IntegrantesTable", [], columnsIntegrantes)
            //        }, 1000)

            //    }
            //}
            //if (global.getData(nextProps.ComiteFraccionamiento).length === 0 && global.getDataID(nextProps.ComiteSel) === -1) {
            //    onDataTableData("IntegrantesTable", [], columnsIntegrantes)
            //}
            if (isSuccessful(nextProps.FraccSel) && hasChanged(this.props.FraccSel, nextProps.FraccSel)) {
                if (global.getData(nextProps.FraccSel).ID != '' && global.getData(nextProps.FraccSel).ID != null && global.getData(this.props.FraccSel).ID !== global.getData(nextProps.FraccSel).ID) {
                    let data: any = global.getData(nextProps.FraccSel);
                    console.log(data)
                    let Id = data.ID;
                    dispatchSuccessful("load::loadComite", { loadComite: true })
                    let modeEdit = EK.Store.getState().global.modeEdit.data.modeEdit
                    let parametros = global.assign({
                        FRACCIONAMIENTO: Id
                    })
                    global.asyncPost("base/kontrol/AsociacionCivil/GetBP/GetComiteByFraccionamiento/", { parametros: parametros }, (status: AsyncActionTypeEnum, res: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                                if (res) {
                                    console.log(res)
                                    dispatchSuccessful('load::ComiteFraccionamiento', res)
                                    Forms.updateFormElement(PAGE_ID, "ComiteFraccionamiento", { ID: -1, Clave: "Seleccione una opción" });
                                    if (res.length === 0) {
                                        global.info("Este Fraccionamiento no tiene comite asignado", "Atención");
                                        dispatchSuccessful("load::loadComite", { loadComite: false })
                                        dispatchSuccessful("load::loadFondo", { loadFondo: false })

                                        return
                                    }
                                    //Forms.updateFormElement(PAGE_ID, "PlazaLabel", res.Plaza)
                                    //Forms.updateFormElement(PAGE_ID, "VocacionesLabel", res.Segmento)
                                    //Forms.updateFormElement(PAGE_ID, "Comite", res.Nombre)
                                    //setTimeout(() => {
                                    //    dispatchSuccessful("load::Integrantes", res.Integrantes, PAGE_ID)
                                    //    //onDataTableData("IntegrantesTable", res.Integrantes, columnsIntegrantes)
                                    //},500)
                                    dispatchSuccessful("load::loadComite", { loadComite: false })

                                    let Fracc = data.Clave;
                                    let modeEdit = EK.Store.getState().global.modeEdit.data.modeEdit
                                    dispatchSuccessful("load::loadFondo", { loadFondo: true })
                                    let Plaza = modeEdit ? EK.Store.getState().global.RowData.data.IdPlaza : res.IdPlaza;
                                    let parametros = global.assign({
                                        Plaza: Plaza,
                                        ClaveFracc: Fracc
                                    })
                                    global.asyncPost("base/kontrol/ReporteAnalisisComunidades/GetBP/GetTotalesParaAnalisisComunidad/", { parametros: parametros }, (status: AsyncActionTypeEnum, resp: any) => {
                                        switch (status) {
                                            case AsyncActionTypeEnum.successful:
                                                if (resp) {
                                                    Forms.updateFormElement(PAGE_ID, "FondoConvive", resp.fondoConvive.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
                                                    Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", `${resp.porVivEntregada}%`)
                                                    dispatchSuccessful("load::loadFondo", { loadFondo: false })
                                                } else {
                                                    Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null);
                                                    Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
                                                    dispatchSuccessful("load::loadFondo", { loadFondo: false })
                                                }
                                                break;
                                            case AsyncActionTypeEnum.loading:
                                                break;
                                            case AsyncActionTypeEnum.failed:
                                                dispatchSuccessful("load::loadFondo", { loadFondo: false })
                                                break;
                                        }
                                    })

                                } else {
                                    Forms.updateFormElement(PAGE_ID, "Comite", null);
                                    Forms.updateFormElement(PAGE_ID, "PlazaLabel", null);
                                    Forms.updateFormElement(PAGE_ID, "VocacionesLabel", null);
                                    dispatchSuccessful("load::loadComite", { loadComite: false })
                                }
                                break;
                            case AsyncActionTypeEnum.loading:
                                break;
                            case AsyncActionTypeEnum.failed:
                                dispatchSuccessful("load::loadComite", { loadComite: false })
                                break;
                        }
                    })
                } else {
                    Forms.updateFormElement(PAGE_ID, "PorcentajeEnt", null);
                    Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
                    //Forms.updateFormElement(PAGE_ID, "Comite", null);
                    Forms.updateFormElement(PAGE_ID, "PlazaLabel", null);
                    Forms.updateFormElement(PAGE_ID, "VocacionesLabel", null);
                }
            }
        }
        onModalIntegrantes() {
            Forms.reset(INTEGRANTES)
            let modal: any = $("#ModalIntegrantes");
            modal.modal();
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            let admin;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let textTitle = "ALTA";
            let icon = "fas fa-list-alt";

            if (isModeEdit) {
                textTitle = "EDITAR";
                icon = "fa fa-edit";
            }
            if (global.getData(this.props.AdminSi) !== undefined) {
                admin = global.getData(this.props.AdminSi)
            }
            let spin;
            if (isSuccessful(EK.Store.getState().global.loadFondo)) {
                spin = global.getData(this.props.loadFondo).loadFondo;
            }
            let load;
            if (isSuccessful(EK.Store.getState().global.loadComite)) {
                load = global.getData(this.props.loadComite).loadComite;
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
                                        subTitle={""}
                                        level={1}
                                        icon={""}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Column size={[12, 12, 12, 6]}>
                                                    <Fraccionamientosv2 id={"FraccInicial"} label={"Fraccionamiento"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                    {/*<Fraccionamientos id={"FraccInicial"} label={"Fraccionamiento"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />*/}
                                                </Column>
                                                <Column size={[12, 12, 12, 6]}>
                                                    <ddl.ComiteFraccionamiento id={"ComiteFraccionamiento"} label={"Comité"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                    {/*
                                                        load ?
                                                            <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                            :
                                                            <label.Label id={"Comite"} size={[12, 12, 12, 12]} label={"Comité"} idForm={PAGE_ID} />
                                                    */}
                                                </Column>
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                {
                                                    load ?
                                                        <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                        : <div>
                                                            <Column size={[12, 12, 12, 6]}>
                                                                <label.Label id={"PlazaLabel"} size={[12, 12, 12, 12]} label={"Plaza"} idForm={PAGE_ID} />
                                                            </Column>
                                                            <Column size={[12, 12, 12, 6]}>
                                                                <label.Label id={"VocacionesLabel"} size={[12, 12, 12, 12]} label={"Segmento"} idForm={PAGE_ID} />
                                                            </Column></div>
                                                }
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Column size={[12, 12, 12, 6]}>
                                                    <input.Text id={"NombreRazonSocial"} label={"Nombre o Razon Social"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                </Column>
                                                <Column size={[12, 12, 12, 6]}>
                                                    <DatePicker id="FechaConstitucion" label="Fecha de Constitución" value={global.getToday(true)} type="date" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                </Column>
                                            </Column>
                                            <Column size={[12, 12, 12, 6]}>
                                                <Column size={[12, 12, 12, 12]}>
                                                    <input.Text id={"Notaria"} label={"Notaria No"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                </Column>
                                            </Column>
                                            <Column size={[12, 12, 12, 2]}>
                                                <Column size={[12, 12, 12, 12]}>
                                                    <span><strong>ADMINISTRADORA</strong></span>
                                                </Column>
                                                <Column size={[12, 12, 12, 12]}>
                                                    <RadioButton id="SI" label="SI" idForm={PAGE_ID} groupName="Admin" size={[3, 3, 6, 6]} />
                                                    <RadioButton id="NO" label="NO" idForm={PAGE_ID} groupName="Admin" size={[3, 3, 6, 6]} />
                                                </Column>
                                            </Column>
                                            {
                                                admin === 'SI' ?
                                                    <Column size={[12, 12, 12, 4]}>
                                                        <input.Text id={"NombreAdmin"} label={"Nombre Admin."} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                    </Column> : null
                                            }
                                            <Column size={[12, 12, 12, 12]}>
                                                <Column size={[12, 12, 12, 6]}>
                                                    <input.Text id={"CuentaBancaria"} label={"Cuenta Bancaria"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                </Column>
                                                <Column size={[12, 12, 12, 6]}>
                                                    {
                                                        spin ?
                                                            <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                            : <label.Label id={"PorcentajeEnt"} size={[12, 12, 12, 12]} label={"Porcentaje Entregado"} idForm={PAGE_ID} />
                                                    }
                                                </Column>
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Column size={[12, 12, 12, 6]}>
                                                    <input.Currency id={"CuotaMantenimiento"} label={"Cuota de Mantenimiento"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                </Column>
                                                <Column size={[12, 12, 12, 6]}>
                                                    {
                                                        spin ?
                                                            <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                            : <label.Label id={"FondoConvive"} size={[12, 12, 12, 12]} label={"Fondo Convive"} idForm={PAGE_ID} />
                                                    }
                                                </Column>
                                            </Column>
                                            <Column size={[12, 12, 12, 6]}>
                                                <Column size={[12, 12, 12, 12]}>
                                                    <input.Text id={"AltaHacienda"} label={"Alta en Hacienda"} size={[12, 12, 12, 12]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                </Column>
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
                                            {/*<Button keyBtn={"btnAdd"} titulo="Agregar" className={className} color={color} rounded={false} iconOnly={true} icon="fa fa-plus" onClick={this.onModalIntegrantes} style={{ marginRight: 5, color }} />*/}
                                        </SectionButtons >
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                {
                                                    load ?
                                                        <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                                        :
                                                        <div id="IntegrantesTable" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                                                }
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

                            <Row >
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

    const ModalIntegrantes: any = global.connect(class extends React.Component<IAsociacionCivil, {}>{
        constructor(props: IAsociacionCivil) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        onSave() {
            let model = Forms.getValues(INTEGRANTES);
            let IdPuesto = model.Puesto.ID;
            let Puesto = model.Puesto;
            let NoCliente = model.NoCliente;
            let ApePaterno = model.ApePaterno;
            let ApeMaterno = model.ApeMaterno;
            let Nombre = model.Nombre;
            let Calle = model.Calle;
            let Numero = model.Numero;
            let Telefono = model.Telefono
            let Integrantes = global.getData(EK.Store.getState().global.Integrantes);

            if (Nombre === undefined || Nombre === null || Nombre === "") {
                warning("Ingrese el Nombre del integrante", "Atención")
                return
            }
            if (ApePaterno === undefined || ApePaterno === null || ApePaterno === "") {
                warning("Ingrese el ApePaterno del integrante", "Atención")
                return
            }
            if (Telefono === undefined || Telefono === null || Telefono === "") {
                warning("Ingrese el Nombre del integrante", "Atención")
                return
            }

            if (NoCliente !== null || NoCliente !== undefined || NoCliente !== "") {
                let existe = Integrantes.filter(x => x.NoCliente === NoCliente);
                if (existe.length > 0) {
                    warning("El cliente ya fue agregado", "Atención")
                    return
                }
            }

            let integrante = {
                IdPuesto: IdPuesto,
                NoCliente: NoCliente,
                Puesto: Puesto.Nombre,
                ApePaterno: ApePaterno,
                ApeMaterno: ApeMaterno,
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

            Forms.reset(INTEGRANTES);
        }
        onEdit() {
            let model = Forms.getValues(INTEGRANTES);
            let IdPuesto = model.Puesto.ID;
            let Puesto = model.Puesto;
            let NoCliente = model.NoCliente;
            let ApePaterno = model.ApePaterno;
            let ApeMaterno = model.ApeMaterno;
            let Nombre = model.Nombre;
            let Calle = model.Calle;
            let Numero = model.Numero;
            let Telefono = model.Telefono

            let Integrantes = global.getData(EK.Store.getState().global.Integrantes);
            let row = global.getData(EK.Store.getState().global.RowDataIntegrantes)
            let item = Integrantes.filter(x => x.No !== row.No);



            let integrante = {
                No: row.No,
                IdPuesto: IdPuesto,
                NoCliente: NoCliente,
                Puesto: Puesto.Nombre,
                ApePaterno: ApePaterno,
                ApeMaterno: ApeMaterno,
                Nombre: Nombre,
                Calle: Calle,
                Numero: Numero,
                Telefono: Telefono
            }

            item.push(integrante);

            success("Se edito correctamente", "Atencion")

            dispatchSuccessful("load::Integrantes", item, PAGE_ID);
        }
        onCancel() {
            let modalCalen: any = $("#ModalIntegrantes");
            modalCalen.modal("hide");
        }
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
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = global.getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ModalIntegrantes" header={"INTEGRANTES"} footer={this.footerModal()}
                addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <select.ClientesLotesSPV key={"Cliente"} id={"Cliente"} label="Buscar Cliente" idFormSection={INTEGRANTES} size={[12, 12, 12, 12]} />
                        <ddl.PuestosAsociacionCivil id={"Puesto"} idFormSection={INTEGRANTES} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                        <input.Text id={"NoCliente"} label={"No. de cliente"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <input.Text id={"Nombre"} label={"Nombre"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} validations={[validations.required()]} required={true} />
                        <input.Text id={"ApePaterno"} label={"Apellido Paterno"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} required={true} validations={[validations.required()]} />
                        <input.Text id={"ApeMaterno"} label={"Apellido Materno"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <input.Text id={"Calle"} label={"Calle"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} />
                        <input.Text id={"Numero"} label={"Numero"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} />
                        <input.Telefono id={"Telefono"} label={"Telefono"} size={[12, 12, 12, 4]} idFormSection={INTEGRANTES} required={true} validations={[validations.required()]} />
                    </Column>
                </Row>
            </modal.Modal>
        };
    });
    const ModalDetalle: any = global.connect(class extends React.Component<IAsociacionCivil, {}>{
        constructor(props: IAsociacionCivil) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })

        onCancel() {
            let modalCalen: any = $("#ModalDetalles");
            modalCalen.modal("hide");
        }
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
                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        onExport() {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Detalle de la reunion');
            const dataInfo = global.getData(EK.Store.getState().global.DataToExport);
            const dataIntegrantes = global.getData(EK.Store.getState().global.IntegrantesByRow);


            //  estilos
            const headerStyle = { font: { bold: true, size: 12 }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } } };
            const cellStyle = { font: { size: 11 } };
            const borderStyle = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            // Información del comité
            let acHeaders = ['Id', 'Nombre Razon Social', 'Comite', 'Fecha Constitución', 'Notaria', 'Administradora', 'Nombre Administradora',
                'Plaza',
                'Segmento',
                'Fraccionamiento',
                'Cuenta Bancaria',
                'Porcentaje Entregadas',
                'Cuota Mantenimiento',
                'Fondo Convive',
                'Alta Hacienda',
                //'Hipoteca con Servicios'
            ];

            let acKeys = ['ID', 'NombreRazonSocial', 'NombreComite', 'FechaConstitucion', 'Notaria', 'Administradora', 'NombreAdmin',
                'Plaza',
                'Segmento',
                'Fraccionamiento',
                'CuentaBancaria',
                'PorcentajeEntregado',
                'CuotaMantenimiento',
                'FondoConvive',
                'AltaHacienda',
                //'HipotecaServicios'
            ];
            let acRow = worksheet.addRow(acHeaders);
            acRow.font = { bold: true };
            acRow.font = headerStyle.font;
            acRow.fill = headerStyle.fill;
            acRow.eachCell(cell => cell.border = borderStyle);

            let dataRow = [];
            for (let key of acKeys) {
                if (dataInfo.hasOwnProperty(key)) {
                    if (key === 'Administradora') {
                        dataInfo[key] = dataInfo[key] ? 'SI' : 'NO'
                    }
                    //if (key === 'HipotecaServicios') {
                     //   dataInfo[key] = dataInfo[key] ? 'SI' : 'NO'
                   // }
                } else {
                    dataInfo[key] = '';
                }
                dataRow.push(dataInfo[key]);
            }

            worksheet.addRow(dataRow).eachCell(cell => cell.border = borderStyle);

            // Deja una linea en blanco entre la informacion del comite y los integrantes
            worksheet.addRow([]);

            // Integrantes
            let integrantesHeaders = [
                'No.',
                'Puesto',
                'Apellido Paterno',
                'Apellido Materno',
                'Nombre',
                'Calle',
                'Numero',
                'Telefono'
            ];
            let integrantesKeys = ['No',
                'Puesto',
                'ApellidoPaterno',
                'ApellidoMaterno',
                'Nombre',
                'Calle',
                'Numero',
                'Telefono'
            ];
            let integrantesRow = worksheet.addRow(integrantesHeaders);
            integrantesRow.font = { bold: true };
            integrantesRow.font = headerStyle.font;
            integrantesRow.fill = headerStyle.fill;
            integrantesRow.eachCell(cell => cell.border = borderStyle);

            for (let integrante of dataIntegrantes) {
                let rowData = [];
                for (let key of integrantesKeys) {
                    if (integrante.hasOwnProperty(key)) {
                        rowData.push(integrante[key]);
                    } else {
                        rowData.push('');
                    }
                }
                worksheet.addRow(rowData).eachCell(cell => cell.border = borderStyle);
            }

            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'AsociacioCivilDetalle.xlsx');
            });

        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = global.getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ModalDetalles" header={"DETALLE"} footer={this.footerModal()}
                addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Column size={[12, 12, 12, 12]}>
                        <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Exportar"} onClick={this.onExport} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2", float: 'rigth' }} />
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <label.Label id={"NombreRazonSocialLabel"} size={[12, 12, 12, 4]} label={"Nombre Razon Social"} idForm={PAGE_ID} />
                        <label.Label id={"ComiteLabel"} size={[12, 12, 12, 4]} label={"Comité"} idForm={PAGE_ID} />
                        <label.Label id={"FechaConstitucionLabel"} size={[12, 12, 12, 4]} label={"Fecha Constitucion"} idForm={PAGE_ID} />
                        <label.Label id={"NotariaLabel"} size={[12, 12, 12, 4]} label={"Notaria"} idForm={PAGE_ID} />
                        <label.Label id={"AdministradoraLabel"} size={[12, 12, 12, 4]} label={"Administradora"} idForm={PAGE_ID} />
                        <label.Label id={"NombreAdministradoraLabel"} size={[12, 12, 12, 4]} label={"Nombre Administradora"} idForm={PAGE_ID} />
                        <label.Label id={"PlazaDetLabel"} size={[12, 12, 12, 4]} label={"Plaza"} idForm={PAGE_ID} />
                        <label.Label id={"SegmentoDetLabel"} size={[12, 12, 12, 4]} label={"Segmento"} idForm={PAGE_ID} />
                        <label.Label id={"FraccionamientoLabel"} size={[12, 12, 12, 4]} label={"Fraccionamiento"} idForm={PAGE_ID} />
                        <label.Label id={"CuentaBancariaLabel"} size={[12, 12, 12, 4]} label={"Cuenta Bancaria"} idForm={PAGE_ID} />
                        <label.Label id={"PorcentajeEntLabel"} size={[12, 12, 12, 4]} label={"Porcentaje Entregada"} idForm={PAGE_ID} />
                        <label.Label id={"CuotaMantenimientoLabel"} size={[12, 12, 12, 4]} label={"Cuota de Mantenimiento"} idForm={PAGE_ID} />
                        <label.Label id={"FondoConviveLabel"} size={[12, 12, 12, 4]} label={"Fondo Convive"} idForm={PAGE_ID} />
                        <label.Label id={"AltaHaciendaLabel"} size={[12, 12, 12, 4]} label={"Alta Hacienda"} idForm={PAGE_ID} />
                       {/* <label.Label id={"HipotecaServiciosLabel"} size={[12, 12, 12, 4]} label={"Hipoteca con servicios"} idForm={PAGE_ID} />*/}

                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <div style={{ display: 'inherit' }}>
                            <div id="IntegrantesDetalle" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                        </div>
                    </Column>

                </Row>
            </modal.Modal>
        };
    });
};
namespace EK.Modules.SCV.Pages.postventa.RUBA.ComiteReuniones {
    "use strict";
    const PAGE_ID = "ComiteReuniones";
    const MATERIALES = "Materiales";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);
    declare const DevExpress: any;
    declare const ExcelJS: any;
    declare const Set: any;
    declare const FileSaver: any;
    declare var saveAs: typeof FileSaver.saveAs;

    interface IComiteReuniones extends page.IProps {
        modeEdit: any,
        initTable?: (data: any) => void,
        loadCatalogo: () => void,
        entity: any,
        entityItem: any,
        loadData: any,
        comiteSelected: any,
        itemsLoad: (data) => void,
        MaterialesReunion: any,
    };

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
            { caption: "Tipo", dataField: "TipoReunion" },
            { caption: "Comité", dataField: "Comite" },
            { caption: "Fecha Reunion", dataField: "FechaReunion", dataType: "datetime", format: "dd/MM/yyyy HH:mm" },
            { caption: "Plaza", dataField: "Plaza" },
            { caption: "Segmento", dataField: "SegmentoNombre" },
            { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
            { caption: "Fecha de creación", dataField: "FechaCreacion", dataType: "datetime", format: "dd/MM/yyyy" },
            { caption: "Realizada", dataField: "Realizada" },
            {
                caption: "Editar",
                type: 'buttons',
                buttons: ['edit', {
                    hint: 'Editar',
                    icon: 'fa fa-edit',
                    onClick(e) {
                        let data = e.row.data
                        dispatchSuccessful("load::RowData", data)
                        Forms.updateFormElement(PAGE_ID, "TipoReunion", { ID: data.IdTipo, Nombre: data.TipoReunion });

                        Forms.updateFormElement(PAGE_ID, "Comites", {
                            ID: data.IdComite, Nombre: data.Comite, Clave: data.Clave, IdFraccionamiento: data.IdFraccionamiento, Fraccionamiento: data.Fraccionamiento, Plaza: data.Plaza, IdPlaza: data.IdPlaza,
                            IdSegmento: data.IdSegmento, SegmentoNombre: data.SegmentoNombre
                        });
                        dispatchSuccessful("load::COMITES_Seleccionada", {
                            ID: data.IdComite, Nombre: data.Comite, Clave: data.Clave, IdFraccionamiento: data.IdFraccionamiento, Fraccionamiento: data.Fraccionamiento, Plaza: data.Plaza, IdPlaza: data.IdPlaza,
                            IdSegmento: data.IdSegmento, SegmentoNombre: data.SegmentoNombre
                        })
                        Forms.updateFormElement(PAGE_ID, "FechaReunion", data.FechaReunion);
                        Forms.updateFormElement(PAGE_ID, "Plaza", data.Plaza);
                        Forms.updateFormElement(PAGE_ID, "Segmento", data.SegmentoNombre);
                        Forms.updateFormElement(PAGE_ID, "Fraccionamiento", data.Fraccionamiento);
                        getMaterialesByIdReunion(data.ID)
                        let Materiales = global.getData(EK.Store.getState().global.Materiales)
                        if (Materiales.length === 0) {
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

                        let Id = e.row.data.ID
                        onDelete(Id)

                    },
                }],
            },
            {
                caption: "Ver Detalle",
                type: 'buttons',
                buttons: ['delete', {
                    hint: 'Ver Detalles',
                    icon: 'fa fa-eye',
                    onClick(e) {
                        let id = e.row.data.ID
                        let row = e.row.data;
                        dispatchSuccessful("load::DatatoExport", row)
                        Forms.updateFormElement(PAGE_ID, "TipoLabel", row.TipoReunion);
                        Forms.updateFormElement(PAGE_ID, "ComitesLabel", row.Comite);
                        Forms.updateFormElement(PAGE_ID, "FechaReunionLabel", row.FechaReunion.toLocaleDateString());
                        Forms.updateFormElement(PAGE_ID, "PlazaDetLabel", row.Plaza);
                        Forms.updateFormElement(PAGE_ID, "SegmentoDetLabel", row.SegmentoNombre);
                        Forms.updateFormElement(PAGE_ID, "FraccionamientoDetLabel", row.Fraccionamiento);
                        Forms.updateFormElement(PAGE_ID, "RealizadaLabel", row.Realizada?"SI":"NO");
                        let parametros = global.assign({
                            IDREUNION: id
                        })
                        global.asyncPost("base/kontrol/Comites/GetBP/GetMaterialesById/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    let columnsDetalle = [
                                        { caption: "No", dataField: "No", alignment: 'center' },
                                        { caption: "Material", dataField: "NombreMaterial", alignment: 'center' },
                                    ]
                                    dispatchSuccessful('load::MaterialesByRow', data)
                                    onDataTableData("MaterialDetalles", data, columnsDetalle)

                                    break
                                case AsyncActionTypeEnum.loading:
                                    break;
                                case AsyncActionTypeEnum.failed:
                                    break;
                            }
                        })
                        let modal: any = $("#ModalDetalle");
                        modal.modal();
                    },
                }],
            },
        ];
        global.asyncPost("base/kontrol/Comites/GetBP/GetReuniones/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
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
                            fileName: "Reuniones",
                            allowExportSelectedData: false
                        },
                        onExporting: function (e) {

                            e.cancel = true;
                            for (const d of data) {
                                d.Realizada = d.Realizada ? 'SI' : 'NO';
                            }
                            e.cancel = false;
                            setTimeout(() => {
                                for (const d of data) {
                                    d.Realizada = d.Realizada === 'SI' ? true : false
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
            global.asyncPost("base/kontrol/Comites/GetBP/DeleteReuniones/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito")
                            Forms.reset(PAGE_ID);
                            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
                            getData()
                            dispatchSuccessful("load::Materiales", [])
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
        Forms.reset(MATERIALES);
    }

    let getMaterialesByIdReunion = (Id: number) => {
        let parametros = global.assign({
            IDREUNION: Id
        })
        global.dispatchAsyncPost("load::Materiales", "base/kontrol/Comites/GetBP/GetMaterialesById/", { parametros: parametros });
    }
    export let Vista = global.connect(class extends React.Component<IComiteReuniones, {}> {
        constructor(props: IComiteReuniones) {
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

        componentWillReceiveProps(nextProps: IComiteReuniones): void {

        }
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model: any = Forms.getForm(PAGE_ID)
            let TipoReunion = model.TipoReunion.ID;
            let Comite = model.Comites.ID;
            let FechaReunion = model.FechaReunion;
            FechaReunion.setSeconds(0);
            let ComiteSel = global.getData(EK.Store.getState().global.COMITES_Seleccionada)
            console.log(ComiteSel)
            let Plaza = ComiteSel.IdPlaza;
            let Segmento = ComiteSel.IdSegmento;
            let Fraccionamiento = ComiteSel.IdFraccionamiento;
            let Materiales = global.getData(EK.Store.getState().global.Materiales)
            let modeEdit = global.getData(this.props.modeEdit).modeEdit
            let Id = 0;
            let today = global.getToday();
            if (TipoReunion === undefined || TipoReunion === -1) {
                warning("El Campo Tipo de reunion es obligatorio", "Atención");
                return
            }
            if (Comite === undefined || Comite === -1) {
                warning("El Campo Tipo de reunion es obligatorio", "Atención");
                return
            }
            if (FechaReunion === undefined || FechaReunion === null) {
                warning("El Campo Fecha de Reunion es obligatorio", "Atención");
                return
            }
            if (FechaReunion < today) {
                warning("Favor de verificar la fecha de reunion", "Atención");
                return
            }

            if (Plaza === -2) {
                warning("La opción en el campo Plaza no es valida", "Atención");
                return;
            }
            if (Fraccionamiento === -2) {
                warning("La opción en el campo Fraccionamiento no es valida", "Atención");
                return;
            }
            if (Segmento === -2) {
                warning("La opción en el campo Segmento no es valida", "Atención");
                return;
            }
            if (modeEdit) {
                let rowData = global.getData(EK.Store.getState().global.RowData);
                Id = rowData.ID
            }
            FechaReunion = new Date(FechaReunion.getTime() - (FechaReunion.getTimezoneOffset() * 60000)).toISOString();
            let parametros = [{
                ID: Id,
                IdTipoReunion: TipoReunion,
                IdComite: Comite,
                FechaReunion: FechaReunion,
                IdPlaza: Plaza,
                IdSegmento: Segmento,
                IdFraccionamiento: Fraccionamiento,
                Materiales: Materiales
            }]

            console.log(parametros)
            global.asyncPost("base/kontrol/Comites/GetBP/SaveComiteReuniones/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data > 0) {
                            getData()
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            success("Registro Guardado", "Exito")
                            Forms.reset(PAGE_ID)
                            Forms.updateFormElement(PAGE_ID, "Plaza", null)
                            Forms.updateFormElement(PAGE_ID, "Segmento", null)
                            Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null)
                            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
                            dispatchSuccessful("load::Materiales", [])
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
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })

                        } else if (data === -1) {
                            warning("Existe un registro guardado con esa fecha y hora, verifique la información", "Aviso");
                            loader.style.display = 'none';
                            loaded.style.display = 'inherit';
                            Forms.reset(PAGE_ID);
                            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
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
        componentDidMount(): any {
            dispatchSuccessful("load::Materiales", [], PAGE_ID)
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
            getData();
        };
        onCancel() {
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            dispatchSuccessful("load::Materiales", [], PAGE_ID)
            Forms.reset(PAGE_ID)
            Forms.updateFormElement(PAGE_ID, "Plaza", null)
            Forms.updateFormElement(PAGE_ID, "Segmento", null)
            Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null)
            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
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
                <ComiteReuniones />
                <ModalDetalles />
            </page.Main>;
        };
    });
    //========================================================================
    // CREATE 
    //=========================================================================
    const ComiteReuniones: any = global.connect(class extends React.Component<IComiteReuniones, {}>{
        constructor(props: IComiteReuniones) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.comiteSelected = state.global.COMITES_Seleccionada;
            retValue.MaterialesReunion = state.global.Materiales;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            itemsLoad: (data) => {
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
                setTimeout(() => {
                onDataTableData("MaterialTable", data, columns)

                },500)
            }
        })
        componentWillReceiveProps(nextProps: IComiteReuniones): void {
            if (hasChanged(this.props.comiteSelected, nextProps.comiteSelected) && getDataID(this.props.comiteSelected) !== getDataID(nextProps.comiteSelected)) {
                if (isSuccessful(nextProps.comiteSelected) && nextProps.comiteSelected.data.ID > 0) {
                    let data: any = global.getData(nextProps.comiteSelected);
                    Forms.updateFormElement(PAGE_ID, "Plaza", data.Plaza)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", data.Fraccionamiento)
                    Forms.updateFormElement(PAGE_ID, "Segmento", data.SegmentoNombre)
                } else {
                    Forms.updateFormElement(PAGE_ID, "Plaza", null)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null)
                    Forms.updateFormElement(PAGE_ID, "Segmento", null)
                    Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });

                };
            };
            if (hasChanged(this.props.MaterialesReunion, nextProps.MaterialesReunion) && global.isSuccessful(nextProps.MaterialesReunion)) {
                if (isSuccessful(nextProps.MaterialesReunion) && nextProps.MaterialesReunion.data.length > 0) {
                    let data: any = global.getData(nextProps.MaterialesReunion);
                    this.props.itemsLoad(data)
                } else {

                    //onDataTableData("MaterialTable", [], columns)
                }
            };
        }
        onASaveMaterial() {
            let model: any = Forms.getForm(MATERIALES)
            let Materiales = model.Material;
            let data = global.getData(EK.Store.getState().global.Materiales)
            if (Materiales === "" || Materiales === null || Materiales === undefined) {
                warning("El campo Material es obligatorio", "Atención");
                return
            }
            let Material = {
                NombreMaterial: Materiales
            }
            data.push(Material);
            let counter = 0
            for (let x of data) {
                counter++
                x.No = counter
            }
            dispatchSuccessful("load::Materiales", data, PAGE_ID);
            Forms.reset(MATERIALES);
        }
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
                                <Column size={[12, 12, 6, 6]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"REUNIONES"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <ddl.TipoReunion id={"TipoReunion"} size={[12, 12, 6, 6]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                <ddl.Comites id={"Comites"} label={"Comité"} size={[12, 12, 6, 6]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <DatePicker id="FechaReunion" label="Fecha de Reunión" minuteStep={30} value={global.getToday(true)} startDays={undefined} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idForm={PAGE_ID} size={[12, 12, 12, 6]} validations={[validations.required()]} required={true} />
                                                <label.Label id={"Plaza"} size={[12, 12, 4, 6]} label={"PLAZA"} idForm={PAGE_ID} />
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <label.Label id={"Segmento"} size={[12, 12, 4, 6]} label={"Segmento"} idForm={PAGE_ID} />{/**/}
                                                <label.Label id={"Fraccionamiento"} size={[12, 12, 4, 6]} label={"Fraccionamiento"} idForm={PAGE_ID} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 6, 6]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"MATERIAL NECESARIO"}
                                        level={1}
                                        icon={"fa fa-briefcase"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <input.Text id={"Material"} label={"MATERIAL"} size={[12, 12, 10, 10]} idFormSection={MATERIALES} validations={[validations.required()]} required={true} />
                                                <Button text={"Agregar"} id="btnId3" titulo="Agregar" className={"btn btn-xs btn-success"} size={[12, 12, 1, 1]} style={{ marginTop: '20px' }} onClick={this.onASaveMaterial.bind(this)}></Button>

                                                <div id="MaterialTable" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
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
    const ModalDetalles: any = global.connect(class extends React.Component<IComiteReuniones, {}>{
        constructor(props: IComiteReuniones) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
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
            const worksheet = workbook.addWorksheet('Detalle de la reunion');
            const dataInfo = global.getData(EK.Store.getState().global.DatatoExport);
            const dataMateriales = global.getData(EK.Store.getState().global.MaterialesByRow);
         
           
            //  estilos
            const headerStyle = { font: { bold: true, size: 12 }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } } };
            const cellStyle = { font: { size: 11 } };
            const borderStyle = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            // Información del comité
            let reunionHeaders = ['Id', 'Tipo', 'Comite', 'Fecha de Reunión', 'Plaza', 'Segmento', 'Fraccionamiento', 'Fecha de creación', 'Realizada'];
            let reunionKeys = ['ID', 'TipoReunion', 'Comite', 'FechaReunion', 'Plaza', 'SegmentoNombre', 'Fraccionamiento', 'FechaCreacion', 'Realizada'];
            let reunionRow = worksheet.addRow(reunionHeaders);
            reunionRow.font = { bold: true };
            reunionRow.font = headerStyle.font;
            reunionRow.fill = headerStyle.fill;
            reunionRow.eachCell(cell => cell.border = borderStyle);

            let dataRow = [];
            for (let key of reunionKeys) {
                if (key === 'Realizada') {
                    dataInfo[key] = dataInfo[key] ? 'SI' : 'NO'
                }
                dataRow.push(dataInfo[key]);
            }

            worksheet.addRow(dataRow).eachCell(cell => cell.border = borderStyle);

            // Deja una linea en blanco entre la informacion del comite y los integrantes
            worksheet.addRow([]);

            // Materiales
            let materialesHeaders = ['No.', 'Material'];
            let materialesKeys = ['No', 'NombreMaterial'];
            let materialesRow = worksheet.addRow(materialesHeaders);
            materialesRow.font = { bold: true };
            materialesRow.font = headerStyle.font;
            materialesRow.fill = headerStyle.fill;
            materialesRow.eachCell(cell => cell.border = borderStyle);

            for (let material of dataMateriales) {
                let rowData = [];
                for (let key of materialesKeys) {
                    rowData.push(material[key]);
                }
                worksheet.addRow(rowData).eachCell(cell => cell.border = borderStyle);
            }

            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DetalleReunión.xlsx');
            });
           
        }

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = global.getData(EK.Store.getState().global.Load).load;
            }
            return <modal.Modal id="ModalDetalle" header={"Detalle"} footer={this.footerModal()}
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
                                        <label.Label id={"TipoLabel"} size={[12, 12, 4, 4]} label={"Tipo"} idForm={PAGE_ID} />
                                        <label.Label id={"ComitesLabel"} size={[12, 12, 4, 4]} label={"Comite"} idForm={PAGE_ID} />
                                        <label.Label id={"FechaReunionLabel"} size={[12, 12, 4, 4]} label={"Fecha de Reunion"} idForm={PAGE_ID} />
                                        <label.Label id={"PlazaDetLabel"} size={[12, 12, 4, 4]} label={"Plaza"} idForm={PAGE_ID} />
                                        <label.Label id={"SegmentoDetLabel"} size={[12, 12, 4, 4]} label={"Segmento"} idForm={PAGE_ID} />
                                        <label.Label id={"FraccionamientoDetLabel"} size={[12, 12, 4, 4]} label={"Fraccionamiento"} idForm={PAGE_ID} />
                                        <label.Label id={"RealizadaLabel"} size={[12, 12, 4, 4]} label={"Realizada"} idForm={PAGE_ID} />
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <h4>MATERIAL NECESARIO</h4>
                                        <div id="MaterialDetalles" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
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
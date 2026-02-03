namespace EK.Modules.SCV.Pages.postventa.RUBA.ReconocimientosRuba {
    "use strict";
    const PAGE_ID = "ReconocimientosRuba";
    const EntityType = "ReconocimientosRuba";
    const KontrolFileType = "anexos";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);
    declare const DevExpress: any;
    declare const ExcelJS: any;
    declare const Set: any;
    declare const FileSaver: any;
    declare const PDFObject: any;

    declare var saveAs: typeof FileSaver.saveAs;
    let fileInputComponent: EK.UX.Kontrol.KontrolFile$Input | null = null;
    interface IReconocimientosRuba extends page.IProps {
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
        loadComite: any
    };
    let FILES = undefined;
    const loadFiles = (parametros) => {
        let encodedFilters: string = global.encodeObject(parametros);
        global.asyncGet("KontrolFiles/all/" + encodedFilters, (status: AsyncActionTypeEnum, data: any[]) => {
            //dispatchSuccessful(`load::${state}`, data, PAGE_ID);
        });
    }
    const onSaveFile = (file: EK.UX.Kontrol.File, entityType: string, entityId: number) => {
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
                    //dispatchSuccessful(`load::${disState}`, { Save: true }, PAGE_ID)
                    //success("Se ha guardado el archivo", "Exito")
                    FILES = undefined;
                    getData();
                    break;
                case AsyncActionTypeEnum.loading:
                    break;
                case AsyncActionTypeEnum.failed:
                    break;
            }
        })
    }
    let columnsIntegrantes = [
        { caption: "No", dataField: "No" },
        { caption: "Puesto", dataField: "Puesto" },
        { caption: "Apellido Paterno", dataField: "ApellidoPaterno" },
        { caption: "Apellino Materno", dataField: "ApellidoMaterno" },
        { caption: "Nombre", dataField: "Nombre" },
        { caption: "Calle", dataField: "Calle" },
        { caption: "Numero", dataField: "Numero" },
        { caption: "Telefono", dataField: "Telefono" },
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
            OPERACION: 'GETINFO'
        })
        const columns = [
            { caption: "ID", dataField: "ID" },
            { caption: "Plaza", dataField: "PlazaN" },
            {
                caption: "Nombre", dataField: "Nombre",
                cellTemplate: (container, options) => {
                    let text = options.data.Nombre
                    $('<a/>').addClass('dx-link')
                        .text(text)
                        .on('dxclick', () => {
                            //Do something with 
                            window.location.href = options.data.FilePath;
                        })
                        .appendTo(container);
                },/*, dataType: "datetime", format: "dd/MM/yyyy" */
            },
            { caption: "Cargo", dataField: "Cargo" },
            { caption: "Evento", dataField: "Evento" },
            { caption: "Fecha Creación", dataField: "FechaCreacion"/*, dataType: "datetime", format: "dd/MM/yyyy" */ },
            {
                caption: "Editar",
                type: 'buttons',
                buttons: ['edit', {
                    hint: 'Editar',
                    icon: 'fa fa-edit',
                    onClick(e) {
                        let data = e.row.data
                        console.log(data)
                        dispatchSuccessful("load::RowData", data)
                        dispatchSuccessful("load::modeEdit", { modeEdit: true })
                        Forms.updateFormElement(PAGE_ID, 'PlazaLabel', data.PlazaN)
                        Forms.updateFormElement(PAGE_ID, 'Nombre', data.Nombre)
                        Forms.updateFormElement(PAGE_ID, 'Cargo',data.Cargo)
                        Forms.updateFormElement(PAGE_ID, 'Evento', data.Evento)
                        //Forms.updateFormElement(PAGE_ID, 'Evento', { ID: data.IdTipoEvidencia, Nombre: data.TipoEvidencia })


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
                buttons: ['Detalle', {
                    hint: 'Ver Detalle',
                    icon: 'fa fa-eye',
                    onClick(e) {
                        
                        let id = e.row.data.ID
                        let row = e.row.data;
                        console.log(row)
                        dispatchSuccessful("load::DataToExport", row);
                        if (row.FileType.includes('image')) {
                            dispatchSuccessful("load::filetype", 'Image');
                            console.log(row.FilePath)
                            let el: any = document.getElementById('imgArch');
                            el.src = row.FilePath;
                        } else {
                            dispatchSuccessful("load::filetype", null);
                        }
                        let modal: any = $("#ModalDetalles");
                        modal.modal();
                    },
                }],
            },
        ];
        global.asyncPost("base/kontrol/ReconocimientosRuba/GetBP/PRReconocimientos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
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
                                d.HipotecaServicios = d.HipotecaServicios ? 'SI' : 'NO';
                            }
                            e.cancel = false;
                            setTimeout(() => {
                                for (const d of data) {
                                    d.Administradora = d.Administradora === 'SI' ? true : false
                                    d.HipotecaServicios = d.HipotecaServicios === 'SI' ? true : false
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
                OPERACION: 'DELETE'
            });
            global.asyncPost("base/kontrol/ReconocimientosRuba/GetBP/PRReconocimientos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code > 0) {
                            success("Registro Eliminado", "Exito")
                            getData()
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

    export let Vista = global.connect(class extends React.Component<IReconocimientosRuba, {}> {
        constructor(props: IReconocimientosRuba) {
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

        componentWillReceiveProps(nextProps: IReconocimientosRuba): void {

        }
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let modeEdit = EK.Store.getState().global.modeEdit.data.modeEdit
            let File = FILES
            let model: any = Forms.getForm(PAGE_ID)
            let Plaza = model.Plazas.ID
            let Nombre = model.Nombre;
            let Cargo = model.Cargo;
            let Evento = model.Evento;
            //let TipoEvidencia = model.TipoEvidencias.ID
            if (Nombre == undefined || Nombre === "" || Nombre === null) {
                warning("Favor de ingresar el nombre del archivo", "Atención");
                return
            }
            if (File === undefined) {
                warning("Favor de seleccionar el archivo");
                return
            }
            let parametros = global.assign({
                PLAZA: Plaza,
                NOMBRE: Nombre,
                CARGO: Cargo,
                EVENTO: Evento,
                //TIPOEVIDENCIA: TipoEvidencia,
                OPERACION: 'INSERT'
            })
            console.log(parametros)
            global.asyncPost("base/kontrol/ReconocimientosRuba/GetBP/PRReconocimientos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code > 0) {
                            if (File !== undefined) {
                                onSaveFile(File, "ReconocimientosRuba", data[0].code)
                                Forms.reset(PAGE_ID);
                                FILES = undefined;
                            }
                            success("Registro guardado", "Exito")
                        }else if (data[0].code === -1) {
                            warning("El registro ya ha sido guardado", "Aviso");

                        }
                        else {
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
        }
        onEdit() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let modeEdit = EK.Store.getState().global.modeEdit.data.modeEdit
            let model: any = Forms.getForm(PAGE_ID)
            let Nombre = model.Nombre;
            let Cargo = model.Cargo;
            let Evento = model.Evento;
            //let TipoEvidencia = model.TipoEvidencias.ID
            let row = global.getData(EK.Store.getState().global.RowData)
            let parametros = global.assign({
                ID: row.ID,
                NOMBRE: Nombre,
                //TIPOEVIDENCIA: TipoEvidencia,
                CARGO: Cargo,
                EVENTO: Evento,
                OPERACION: 'UPDATE'
            })
            console.log(parametros)
            global.asyncPost("base/kontrol/ReconocimientosRuba/GetBP/PRReconocimientos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code > 0) {
                            success(data[0].msg, "Exito")
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                            getData()
                            Forms.reset(PAGE_ID);
                        } else if (data[0].code === -1) {
                            warning("El registro ya ha sido guardado", "Aviso");

                        }
                        else {
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
            Forms.reset(PAGE_ID)
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
                            :
                            <Button id={"btnNew"} className={"btn btn-warning"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onEdit} style={{ marginRight: 5, color: "white", backgroundColor: "#4EC9A2" }} />
                    }
                    {
                        isModeEdit ?
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancel} style={{ marginRight: 5, color: "white", backgroundColor: "#000" }} />
                            : null
                    }
                </PageButtons>
                <ReconocimientosRuba />
                <ModalDetalle />
            </page.Main>;
        };
    });
    //========================================================================
    // CREATE 
    //=========================================================================
    const ReconocimientosRuba: any = global.connect(class extends React.Component<IReconocimientosRuba, {}>{
        constructor(props: IReconocimientosRuba) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.loadFondo = state.global.loadFondo;
            retValue.loadComite = state.global.loadComite;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            itemsLoad: (data) => {
                onDataTableData("IntegrantesTable", data, columnsIntegrantes)
            }
        })
        //shouldComponentUpdate(nextProps: IReconocimientosRuba, { }): boolean {
        //    return hasChanged(this.props.FraccSel, nextProps.FraccSel) ||
        //        hasChanged(this.props.loadComite, nextProps.loadComite) ||
        //        hasChanged(this.props.Integrantes, nextProps.Integrantes) ||
        //        hasChanged(this.props.AdminSi, nextProps.AdminSi) ||
        //        hasChanged(this.props.loadFondo, nextProps.loadFondo);
        //};
        componentWillReceiveProps(nextProps: IReconocimientosRuba): void {
            if (hasChanged(this.props.Integrantes, nextProps.Integrantes) && global.isSuccessful(nextProps.Integrantes)) {
                if (isSuccessful(nextProps.Integrantes) && nextProps.Integrantes.data.length > 0) {
                    let data: any = global.getData(nextProps.Integrantes);
                    this.props.itemsLoad(data)
                };
            };
        }
        onModalIntegrantes() {
            let modal: any = $("#ModalIntegrantes");
            modal.modal();
        }
        onchangefile(file: EK.UX.Kontrol.File) {
            if (file.isValid()) {
                FILES = file
                //     onSaveFile(file, GASTOSTOTALESSDC, item.ID, "SaveitemsFileGT");
            }
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
                                                <Column size={[12, 12, 12, 12]}>
                                                    {
                                                        !isModeEdit ?
                                                            <PlazasDDL id={"Plazas"} size={[12, 12, 4, 4]} label={"PLAZAS"} idForm={PAGE_ID} validations={[validations.required()]} required={true} /> :
                                                            <label.Label id={"PlazaLabel"} size={[12, 12, 12, 4]} label={"Plazas"} idForm={PAGE_ID} />
                                                    }
                                                    <input.Text id="Nombre" label="Nombre" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                    <input.Text id="Cargo" label="Cargo" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                    {/*<ddl.TipoEvidencias id="TipoEvidencias" label="TIPO DE EVIDENCIAS" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                                                </Column>
                                                <Column size={[12, 12, 12, 4]}>
                                                    <input.Text id="Evento" label="Evento" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                </Column>
                                                {
                                                    !isModeEdit ?
                                                        <Column size={[12, 12, 12, 8]}>-
                                                            <EK.UX.Kontrol.KontrolFile$Input
                                                                id={"Archivo"}
                                                                label={"Archivo"}
                                                                size={[12, 12, 12, 3]}
                                                                required={true}
                                                                onChange={this.onchangefile}
                                                                idForm={PAGE_ID}
                                                                mode={EK.UX.Kontrol.FileInputMode.Default} />
                                                        </Column> : null
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

    const ModalDetalle: any = global.connect(class extends React.Component<IReconocimientosRuba, {}>{
        constructor(props: IReconocimientosRuba) {
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

            return <div className="modal-footer">
                <button type="button" onClick={this.onCancel} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };

        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = global.getData(EK.Store.getState().global.Load).load;
            }
            let filetype;
            if (isSuccessful(EK.Store.getState().global.filetype)) {
                filetype = global.getData(EK.Store.getState().global.filetype);
            }
            return <modal.Modal id="ModalDetalles" header={"DETALLE"} footer={this.footerModal()}
                addDefaultCloseFooter={false}>
                <Row style={{ marginLeft: "15px", marginRight: "15px" }}>
                    {
                        filetype === 'Image' ?
                            <Column size={[12, 12, 12, 12]}>
                                <img key={"ImgReportFallasArchivoAdj_00"} id="imgArch" alt="" src={null} style={{ width: "100%", height: "auto" }} />
                            </Column> : null
                    }
                    {
                        filetype !== 'Image' ?
                            <Column size={[12, 12, 12, 12]}>
                                <h1>Sin visualizacion disponible</h1>
                            </Column> : null
                    }
                </Row>
            </modal.Modal>
        };
    });
};
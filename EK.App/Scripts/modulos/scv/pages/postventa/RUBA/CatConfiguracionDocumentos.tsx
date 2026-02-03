namespace EK.Modules.SCV.Pages.postventa.RUBA.CatConfiguracionDocumentos {
    "use strict";
    const PAGE_ID = "CatConfiguracionDocumentos";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");

    interface IEditProps extends page.IProps {
        plaza?: DataElement;
        obtenerUsuarios?: (id: number) => void;
        modeEdit?: any
    };
    export let Vista = global.connect(class extends React.Component<IEditProps, {}> {
        constructor(props: IEditProps) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onEdit = this.onEdit.bind(this);
            this.onDelete = this.onDelete.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada2;
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        loadData() {
            const columns = [
                { caption: "Id Plaza", dataField: "IdPlaza", alignment: 'center' },
                { caption: "Plaza", dataField: "Plaza" },
                { caption: "Id Tipo Vivienda", dataField: "IdTipoVivienda", alignment: 'center' },
                { caption: "Tipo Vivienda", dataField: "DescTipoVivienda" },
                { caption: "Folio", dataField: "Folio", alignment: 'center' },
                { caption: "Clave Documento", dataField: "ClaveDocto", alignment: 'center' },
                { caption: "Vivienda Verde", dataField: "ViviendaVerde", alignment: 'center' },
            ]

            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetConfiguracionDocumentos/", { parametros: null }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_ID);
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            onRowPrepared: function (event) {
                                $(event.rowElement).on('dblclick', function () {
                                    dispatchSuccessful("load::modeEdit", { modeEdit: true }, PAGE_ID);
                                    dispatchSuccessful("load::forDelete", event.data, PAGE_ID);
                                    console.log(event.data)

                                    Forms.updateFormElement(PAGE_ID, "PlazaLabel",  event.data.Plaza);
                                    Forms.updateFormElement(PAGE_ID, "VocacionLabel", event.data.DescTipoVivienda);
                                    Forms.updateFormElement(PAGE_ID, "Doctos", { ID: event.data.ClaveDocto, Clave: event.data.ClaveDocto});
                                    Forms.updateFormElement(PAGE_ID, "ViviendaVerde", event.data.ViviendaVerde);
                                }).on('remove', function () {
                                    //on remove event in jquery ui libraries or 
                                    $(this).off('dblclick remove');
                                })
                            },
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
                                pageSize: 15
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: true
                            },
                            onExporting: function (e) {

                                e.cancel = true;
                                for (const d of data) {
                                    d.ViviendaVerde = d.ViviendaVerde    === true ? 'SI' : 'NO';
                                }
                                e.cancel = false;
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
                                fileName: "Catalogo_" + fecha,
                                allowExportSelectedData: false
                            }
                        }).dxDataGrid("instance");
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });
        }
        onsave() {
            let model: any = Forms.getForm(PAGE_ID)
            if (!Forms.isValid(PAGE_ID)) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            };
            let Plaza = model.PlazaInicial.ID;
            let TipoVivienda = model.Vocaciones.ID;
            let ClaveDocto = model.Doctos.ID;
            let ViviendaVerde = model.ViviendaVerde ? 1 : 0;

            

            let parametros = global.assign({
                PLAZA: Plaza,
                TIPOVIVIENDA: TipoVivienda,
                CLAVEDOCTO: ClaveDocto,
                VIVIENDAVERDE: ViviendaVerde,
                OPERACION: "INSERT"
            })

            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudConfiguracionDocumentos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            this.loadData();
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");
                            Forms.updateFormElement(PAGE_ID, "PlazaInicial", null);
                            Forms.updateFormElement(PAGE_ID, "Vocaciones", null);
                            Forms.updateFormElement(PAGE_ID, "Doctos", null);
                            Forms.updateFormElement(PAGE_ID, "ViviendaVerde", false);

                            Forms.reset(PAGE_ID);

                        } else {
                            warning(data[0].sqlMsg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });
        }
        onCancel() {
            Forms.reset(PAGE_ID);
            Forms.updateFormElement(PAGE_ID, "PlazaInicial", null);
            Forms.updateFormElement(PAGE_ID, "Vocaciones", null);
            Forms.updateFormElement(PAGE_ID, "Doctos", null);
            Forms.updateFormElement(PAGE_ID, "ViviendaVerde", false);
            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
        }
        onDelete() {
            EK.Global.confirm("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
                let row = EK.Store.getState().global.forDelete.data;
                console.log(row)
                let parametros = global.assign({
                    PLAZA: row.IdPlaza,
                    TIPOVIVIENDA: row.IdTipoVivienda,
                    FOLIO: row.Folio,
                    CLAVEDOCTO: row.ClaveDocto,
                    OPERACION: "DELETE"
                });
                global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudConfiguracionDocumentos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            if (data[0].code === 0) {
                                success(data[0].sqlMsg, "Exito");
                                dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                                Forms.updateFormElement(PAGE_ID, "PlazaInicial", null);
                                Forms.updateFormElement(PAGE_ID, "Vocaciones", null);
                                Forms.updateFormElement(PAGE_ID, "Doctos", null);
                                Forms.updateFormElement(PAGE_ID, "ViviendaVerde", false);
                                this.loadData();
                                Forms.reset(PAGE_ID);
                            } else {
                                warning(data[0].sqlMsg, "Aviso");
                            }
                            break;
                        case AsyncActionTypeEnum.loading:
                            break;
                        case AsyncActionTypeEnum.failed:
                            break;
                    }
                });
            });

        }
        onEdit() {
            let model: any = Forms.getForm(PAGE_ID)
            let row = EK.Store.getState().global.forDelete.data;

            let Plaza = row.IdPlaza;
            let TipoVivienda = row.IdTipoVivienda;
            let ClaveDocto = model.Doctos.ID;
            let ViviendaVerde = model.ViviendaVerde ? 1 : 0;


            let parametros = global.assign({
                PLAZA: Plaza,
                TIPOVIVIENDA: TipoVivienda,
                CLAVEDOCTO: ClaveDocto,
                CLAVEDOCTOOLD: row.ClaveDocto,
                VIVIENDAVERDE: ViviendaVerde,
                FOLIO: row.Folio,
                OPERACION: "UPDATE"
            });
            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudConfiguracionDocumentos/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            this.loadData();
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");
                            Forms.reset(PAGE_ID);
                            Forms.updateFormElement(PAGE_ID, "PlazaInicial", null);
                            Forms.updateFormElement(PAGE_ID, "Vocaciones", null);
                            Forms.updateFormElement(PAGE_ID, "Doctos", null);
                            Forms.updateFormElement(PAGE_ID, "ViviendaVerde", false);
                        } else {
                            warning(data[0].sqlMsg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });
        }
        componentDidMount(): any {
            this.loadData();
            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
        };
        render(): JSX.Element {
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let className: string = "btn-editing";
            let color: string = "white";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>

                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Nuevo Registro"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        {
                            !isModeEdit ?
                                <Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload" onClick={this.onsave} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="fa fa-pencil" onClick={this.onEdit} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnDelete"} className={className} color={color} iconOnly={true} icon="fa fa-trash" onClick={this.onDelete} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancel} style={{ marginRight: 5, color }} />
                                : null
                        }
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                        {
                            isModeEdit ?
                                <label.Label id="PlazaLabel" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} /> :
                                <PlazasDDL2 id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        }
                        {
                            isModeEdit ?
                                <label.Label id="VocacionLabel" label="Segmento" idForm={PAGE_ID} size={[12, 12, 3, 3]} /> :
                                <VOCACIONESDDL id="Vocaciones"  label={"Segmento"}  idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        }
                        <DoctosDDL id={"Doctos"} size={[12, 12, 5, 5]} label={"Docto"} idFormSection={PAGE_ID} required={true} validations={[validations.required()]} />
                        <checkBox.CheckBox id={"ViviendaVerde"} idForm={PAGE_ID} label={"Vivienda verde"} size={[12, 12, 1, 1]} />
                    </Column>
                </page.OptionSection>
                <div ><Column size={[12, 12, 12, 12]}>

                    <br />
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>

                    <div id="loadedData" style={{ background: '#fff', display: 'inherit' }}>
                        <span style={{ padding: '10px' }} className="help-block text-muted">Doble click sobre fila para actualizar registro.</span>
                        <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                        </div>
                    </div>

                </Column></div>
            </page.Main>;
        };
    });
    interface IDoctos extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class Doctos$DDL extends React.Component<IDoctos, IDropDrownListState> {
        constructor(props: IDoctos) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.DOCTOS
        });
        static defaultProps: IDoctos = {
            id: "Doctos",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success'> ", item.Clave, " </span>",
                        "<span class='badge badge-info' style='font-size: 90%'> ", item.Nombre, " </span>",
                        "<span class='badge badge-warning' style='font-size: 90%'> ", item.Ruta, " </span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success'> ", item.Clave, " </span>",
                    "<span class='badge badge-info' style='font-size: 90%'> ", item.Nombre, " </span>",
                    "<span class='badge badge-warning' style='font-size: 90%'> ", item.Ruta, " </span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::DOCTOS", "base/kontrol/CatalogosSpv/GetBP/GetConfigDoctos/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::DOCTOS_Seleccionada", null);
            dispatchDefault("load::DOCTOS", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::DOCTOS_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IDoctos, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IDoctos, nextState: IDoctos): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::DOCTOS_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const DoctosDDL: any = ReactRedux.connect(Doctos$DDL.props, null)(Doctos$DDL);

    interface IVocaciones extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class VOCACIONES$DDL extends React.Component<IVocaciones, IDropDrownListState> {
        constructor(props: IVocaciones) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.VOCACIONES
        });
        static defaultProps: IVocaciones = {
            id: "Vocaciones",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
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
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::VOCACIONES", "base/kontrol/CatalogosSpv/GetBP/GetTiposVivienda/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::VOCACIONES_Seleccionada", null);
            dispatchDefault("load::VOCACIONES", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::VOCACIONES_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IVocaciones, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IVocaciones, nextState: IVocaciones): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::VOCACIONES_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const VOCACIONESDDL: any = ReactRedux.connect(VOCACIONES$DDL.props, null)(VOCACIONES$DDL);
};
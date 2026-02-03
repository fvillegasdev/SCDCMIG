namespace EK.UX.DropDownEdit {
    "use strict";
    const PAGE_ID: string = "dde$form";
    const SIDEBAR_ID: string = "dde$sb";

    interface IDropdownEditProps extends ddl.IDropDrownListProps {
        entity?: global.DataElement;
        filters?: any;
        modulo?: string;
        option?: string;
        optionLink?: string;
        actions?: any[];
        slot?: string;
        dispatchAll?: (props: IDropdownEditProps) => void;
        dispatchSave?: (props: IDropdownEditProps, data: any) => void;
        dispatchDelete?: (props: IDropdownEditProps, id: number) => void;
        mapFormToEntity?: (item: any) => any;
        onLink?: (editMode: number, item: any) => void;
        onFilter?: (props: IDropdownEditProps, filters: any) => any;
    };

    interface IDropdownEditState {
        slot: string;
    };

    enum DropdownEditMode {
        None = 0,
        Add = 1,
        Edit = 2
    };

    export class DropdownEdit extends React.Component<IDropdownEditProps, {}>{
        constructor(props: IDropdownEditProps) {
            super(props);
            this.onPopover = this.onPopover.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onLink = this.onLink.bind(this);
            this.initPopover = this.initPopover.bind(this);
        };
        static add: any = {
            icon: "fas fa-plus",
            title: "Agregar",
            action: (props: IDropdownEditProps, config: page.IPageConfig) => {
                Forms.remove(PAGE_ID);
                //
                config.setState({ editMode: DropdownEditMode.Add }, SIDEBAR_ID);
                //
                global.showSidebar(SIDEBAR_ID);
            }
        };
        static edit: any = {
            icon: "fas fa-pencil",
            title: "Editar",
            action: (props: IDropdownEditProps, config: page.IPageConfig) => {
                Forms.remove(PAGE_ID);
                //
                let idForm: string = props.idFormSection ? props.idFormSection : props.idForm;
                let entidad = global.assign({}, Forms.getValue(props.id, idForm));
                if (entidad.ID == -1) {
                    return;
                };
                //
                config.setState({ editMode: DropdownEditMode.Edit }, SIDEBAR_ID);
                //
                if (props.slot) {
                    let slotData: DataElement = props.config.getCatalogo(props.slot);
                    let data: any[] = global.getData(slotData, []);
                    if (data && data.length) {
                        for (var i = 0; i < data.length; i++) {
                            let item: any = data[i];
                            if (entidad.ID === item.ID) {
                                entidad = global.assign(entidad, item);
                                break;
                            };
                        };
                    };
                };
                //
                let elements: any = {};
                //
                for (var p in entidad) {
                    if (p === "Estatus") {
                        let data: any = entidad[p];
                        if (data && data.Clave === "A") {
                            elements[p] = true;
                        } else if (data && data.Clave === "B") {
                            elements[p] = false;
                        } else {
                            elements[p] = entidad[p]
                        }
                    } else {
                        elements[p] = entidad[p];
                    };
                };
                //
                Forms.updateFormElements(PAGE_ID, elements);
                //
                global.showSidebar(SIDEBAR_ID);
            }
        };
        static delete: any = {
            icon: "fas fa-trash",
            title: "Eliminar",
            action: (props: IDropdownEditProps, config: page.IPageConfig) => {
                global.confirm("Presione continuar para eliminar el elemento seleccionado", "EnKontrol", (confirm) => {
                    if (confirm === true) {
                        let idForm: string = props.idFormSection ? props.idFormSection : props.idForm;
                        let entidad = global.assign({}, Forms.getValue(props.id, idForm));
                        if (entidad.ID && entidad.ID > 0) {
                            props.dispatchDelete(props, entidad.ID);
                        };
                    };
                });
            }
        };
        static refresh: any = {
            icon: "fas fa-sync-alt",
            title: "Refrescar",
            action: (props: IDropdownEditProps, config: page.IPageConfig) => {
                props.dispatchAll(props);
            }
        };
        initPopover(): void {
            let button = $("#btn_group_" + this.props.id);
            if (button && button.length > 0) {
                let content = $("<div></div>");
                //
                let actions = this.props.actions;
                if (actions && actions.length) {
                    actions.forEach((action: any, index: number) => {
                        let actionButton = $("<button class='btn btnPopupOver'><i class='" + action.icon + "' title='" + action.title + "'></i></button>");
                        if (actionButton) {
                            actionButton.click((e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                //
                                action.action(this.props, this.props.config);
                                //
                                button.popover("hide");
                            });
                        };
                        //
                        content.append(actionButton);
                    });
                };
                //
                button.popover({
                    placement: "auto right",
                    title: "",
                    content: content,
                    container: "",
                    html: true,
                    popout: false,
                    singleton: false,
                    trigger: "manual"
                });
            };
        };
        componentDidMount(): void {
            this.props.config.setState({ editMode: DropdownEditMode.None }, SIDEBAR_ID);
            this.props.dispatchAll(this.props);
            //
            this.initPopover();
        };
        componentDidUpdate(prevProps: IDropdownEditProps): void {
            if (global.wasUpdated(prevProps.entity, this.props.entity, false)) {
                if (global.isSuccessful(this.props.entity)) {
                    global.success("El elemento ha sido actualizado");
                    //
                    this.props.dispatchAll(this.props);
                    //
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                    Forms.updateFormElement(idForm, this.props.id, global.getData(this.props.entity));
                    Forms.remove(PAGE_ID);
                };
            };
            //
            this.initPopover();
        };
        onPopover(e: JQuery): any {
            let button = $("#btn_group_" + this.props.id);
            if (button && button.length > 0) {
                button.popover("toggle");
            };
        };
        onSave(): void {
            try {
                if (!Forms.isValid(PAGE_ID)) {
                    global.warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                    return;
                } else {
                    let item: EditForm = Forms.getForm(PAGE_ID);
                    //
                    let entidad: any = this.props.mapFormToEntity(item);
                    if (entidad) {
                        this.props.dispatchSave(this.props, entidad);
                    };
                    //
                    this.props.config.setState({ editMode: DropdownEditMode.None }, SIDEBAR_ID);
                    //
                    global.closeSidebar(SIDEBAR_ID);
                }
            } catch (e) { }
        };
        onCancel(): void {
            this.props.config.setState({ editMode: DropdownEditMode.None }, SIDEBAR_ID);
            //
            global.closeSidebar(SIDEBAR_ID);
        };
        onLink(editMode: number, entidad: any): void {
            try {
                if (this.props.onLink) {
                    this.props.onLink(editMode, entidad);
                } else {
                    let $page: any = $ml[this.props.option];
                    let $bc: any = $page.bc;
                    let $link: string = $bc.link;
                    let $url: string;
                    //
                    if (editMode === DropdownEditMode.Add) {
                        $url = [$link, "/id?nuevo"].join("");
                    } else if (editMode === DropdownEditMode.Edit) {
                        $url = [$link, "/", entidad.ID].join("");
                    };
                    //
                    global.closeSidebar(SIDEBAR_ID);
                    global.open($url);
                }
            } catch (e) { }
        };
        render(): JSX.Element {
            let formChildren: any[] = [];
            //
            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (child) {
                    let childProps: any = global.assign(child.props, {
                        key: index,
                        idForm: PAGE_ID,
                        idFormSection: PAGE_ID
                    });

                    let formChild: any = React.cloneElement(child, childProps);
                    if (formChild) {
                        formChildren.push(formChild);
                    };
                };
            });
            //
            let sbHeader: any;
            //
            let state: DataElement = this.props.config.getState(SIDEBAR_ID);
            if (state && global.isSuccessful(state)) {
                let editMode: number = global.getData(state).editMode;
                if (editMode === DropdownEditMode.Add) {
                    sbHeader = <div className="c-sidebar-dde-title">
                        <i className="fas fa-plus"></i>
                        <span><a title="Agregar en Catálogo" onClick={() => { this.onLink(DropdownEditMode.Add, Forms.getValues(PAGE_ID)) }}> Nuevo Elemento </a></span>
                    </div>
                } else if (editMode === DropdownEditMode.Edit) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                    let entidad: any = global.assign({}, Forms.getValue(this.props.id, idForm));
                    //
                    sbHeader = <div className="c-sidebar-dde-title">
                        <i className="fas fa-pencil"></i>
                        <span><a title="Editar en Catálogo" onClick={() => { this.onLink(DropdownEditMode.Edit, entidad) }}>{!(entidad && entidad.Nombre) ? " Editar Elemento " : entidad.Nombre}</a></span>
                    </div>
                };
            };

            return <Column size={this.props.size} style={{ padding: 0 }}>
                <ddl.DropdownList$Form {...this.props} size={[12, 12, 12, 12]} buttonClick={this.onPopover} buttonClass="btn btn-ellipsis dde-popover" iconButton="fa fa-ellipsis-v" />
                <Sidebar id={SIDEBAR_ID}>
                    {sbHeader}
                    <Row>{formChildren}</Row>
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: 12, textAlign: "right" }}>
                            <button type="button" className="btn btn-sm btn-outline red" onClick={this.onCancel} style={{ marginRight: 10 }}> Cancelar </button>
                            <button type="button" className="btn btn-sm btn-outline green" onClick={this.onSave}> Guardar </button>
                        </Column>
                    </Row>
                </Sidebar>
            </Column>
        };
    };

    class DropdownEditForm extends React.Component<IDropdownEditProps, IDropdownEditState>{
        constructor(props: IDropdownEditProps) {
            super(props);
            //
            let dataSlot: string = this.props.slot;
            if (!dataSlot) {
                let d: any = new Date();
                dataSlot = "dde$" + Number(d).toString();
            };
            //
            this.state = { slot: dataSlot };
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            forms: state.forms,
            idForm: getData(state.global.page).id,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            dispatchAll: (props: IDropdownEditProps): void => {
                let filters: any = props.filters;
                if (!filters) {
                    filters = {}
                };
                //
                if (props.onFilter) {
                    filters = props.onFilter(props, filters);
                };
                //
                let encodedFilters: string = global.encodeObject(filters);
                let url: string;
                //
                if (props.optionLink) {
                    url = [props.optionLink, "/all/", encodedFilters].join("");
                } else {
                    url = ["base/", props.modulo, "/", props.option, "/all/", encodedFilters].join("");
                };
                //
                global.dispatchAsync("global-page-data", url, props.slot);
            },
            dispatchSave: (props: IDropdownEditProps, data: any): void => {
                let actionUrl: string;
                //
                if (props.optionLink) {
                    actionUrl = [props.optionLink, "/save"].join("");
                } else {
                    actionUrl = ["base/", props.modulo, "/", props.option, "/save"].join("");
                };
                // 
                global.dispatchAsyncPut("global-page-entity", actionUrl, data, props.slot);
            },
            dispatchDelete: (props: IDropdownEditProps, id: number): void => {
                let actionUrl: string;
                //
                if (props.optionLink) {
                    actionUrl = [props.optionLink, "/delete"].join("");
                } else {
                    actionUrl = ["base/", props.modulo, "/", props.option, "/delete"].join("");
                };
                // 
                global.dispatchAsyncPut("global-page-entity", actionUrl, { id }, props.slot);
            }
        });
        static defaultProps: IDropdownEditProps = {
            modulo: "",
            option: "",
            optionLink: "",
            entity: undefined,
            filters: {},
            slot: ""
        };
        render(): JSX.Element {
            let slot: string = this.state.slot;

            let items: global.DataElement = this.props.config.getCatalogo(slot);
            if (!items) {
                items = global.createSuccessfulStoreObject([]);
            };

            let entity: global.DataElement = this.props.config.getEntity(slot);
            if (!entity) {
                entity = global.createSuccessfulStoreObject({});
            };

            let props: any = global.assign(this.props, { items, entity, slot });

            return <DropdownEdit {...props} />
        };
    };
    //
    export const DropdownEdit$Form: any = ReactRedux.connect(DropdownEditForm.props, DropdownEditForm.dispatchs)(DropdownEditForm);
    //
    export class InsumosEdit extends React.Component<IDropdownEditProps, IDropdownEditProps>{
        static defaultProps: IDropdownEditProps = {
            id: "Insumo",
            label: "Insumo",
            helpLabel: "Seleccione un insumo",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            modulo: "scco",
            option: "Insumos",
            size: [12, 12, 12, 12],
            filters: { clasificacion: "ALL", activos: 1 },
            actions: [DropdownEdit.add, DropdownEdit.edit, DropdownEdit.refresh],
            mapFormToEntity: (form: EditForm): any => {
                let retValue: any = form
                    .addID()
                    .addClave()
                    .addNombre()
                    .addObject("Clasificacion")
                    .addObject("UnidadMedida")
                    .addEstatus()
                    .addVersion()
                    .toObject();

                return retValue;
            },
            onLink: (editMode: number, item: any) => {
                let $url: string;
                let $link: string;
                //
                if (item.Clasificacion.Clave === "INSUMO") {
                    $link = "scco/InsumosMateriales";
                } else if (item.Clasificacion.Clave === "TARJETA") {
                    $link = "scco/InsumosTarjetas";
                };
                //
                if (editMode === DropdownEditMode.Add) {
                    $url = [$link, "/id?nuevo"].join("");
                } else if (editMode === DropdownEditMode.Edit) {
                    $url = [$link, "/id?state&", global.encodeParameters({ IdReferencia: item.ID })].join("");
                };
                //
                global.closeSidebar(SIDEBAR_ID);
                global.open($url);
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='" + item.Clasificacion.Icono + "' style='color:" + item.Clasificacion.Color + ";'></i></span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='" + item.Clasificacion.Icono + "' style='color:" + item.Clasificacion.Color + ";'></i></span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        render(): JSX.Element {
            return <DropdownEdit$Form {...this.props}>
                <input.Clave size={[12, 12, 8, 8]} maxLength={50} />
                <checkBox.Status size={[12, 12, 4, 4]} />
                <input.Nombre size={[12, 12, 12, 12]} maxLength={50} />
                <ddl.ClasificacionInsumoDDL size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                <ddl.UnidadMedidaDDL size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
            </DropdownEdit$Form>
        };
    };
    //
    export class TarjetasEdit extends React.Component<IDropdownEditProps, IDropdownEditProps>{
        static defaultProps: IDropdownEditProps = {
            id: "Tarjeta",
            label: "Tarjeta",
            helpLabel: "Seleccione una Tarjeta",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            modulo: "scco",
            option: "InsumosTarjetas",
            size: [12, 12, 12, 12],
            filters: { activos: 1 },
            actions: [DropdownEdit.add, DropdownEdit.edit, DropdownEdit.refresh],
            onFilter: (props: IDropdownEditProps, filters: any): any => {
                let scco$filters: any = Forms.getValues("scco$filters");
                return global.assign(filters, global.getFilters(scco$filters));
            },
            mapFormToEntity: (form: EditForm): any => {
                let filters: any = Forms.getValues("scco$filters");
                if (filters) {
                    form.addNumberConst("IdObra", filters.IdObra);
                    form.addNumberConst("IdTabulador", filters.IdTabulador);
                    form.addNumberConst("IdTipoPresupuesto", filters.IdTipoPresupuesto);
                };
                //
                let model: any = form
                    .addID()
                    .addClave()
                    .addNombre()
                    .addDescripcion()
                    .addObject("TipoTarjeta")
                    .addObject("UnidadMedida")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //
                return model;
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $(["<span style='font-size: 90%'>", item.Nombre ? item.Nombre : "", "</span>"].join(""));
                };

                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='fad fa-cubes' style='color: #ffab40;'></i></span> ",
                    "<span class='badge badge-success'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $(["<span style='font-size: 90%'>", item.Nombre ? item.Nombre : "", "</span>"].join(""));
                };

                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='fad fa-cubes' style='color: #ffab40;'></i></span> ",
                    "<span class='badge badge-success'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        render(): JSX.Element {
            return <DropdownEdit$Form {...this.props}>
                <input.Text id="Clave" size={[12, 12, 8, 8]} maxLength={50} validations={[validations.required(), uniqueTarjeta("clave", "Ya existe una tarjeta con la clave capturada")]} />
                <checkBox.Status size={[12, 12, 4, 4]} />
                <input.Nombre size={[12, 12, 12, 12]} maxLength={50} />
                <ddl.TipoTarjetaDDL id="TipoTarjeta" size={[12, 12, 12, 6]} validations={[validations.required()]} />
                <ddl.UnidadMedidaDDL id="UnidadMedida" size={[12, 12, 12, 6]} validations={[validations.required()]} />
                <EK.UX.TextArea$Form id="Descripcion" label="Descripción" size={[12, 12, 12, 12]} cols={20} rows={2} />
            </DropdownEdit$Form>
        };
    };
    //
    class UniqueTarjeta extends EK.UX.Validations.ValidationError {
        field: string;
        constructor(message: string, field?: string) {
            super(field, message, true);
            //
            this.field = field;
            this.validationFields.push("ID");
        };
        validate(v: any, values?: any): boolean {
            let retValue: boolean = true;
            //
            if (v === undefined || v === null || $.trim(v) === "") {
                return retValue = false;
            };
            //
            let filters: any = Forms.getValues("scco$filters");
            let obj: any = global.getFilters(filters);
            obj.ID = values["ID"];
            obj[this.field] = v;
            //
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                url: "base/scco/InsumosTarjetas/exists/Exists",
                data: JSON.stringify(obj),
                global: false,
                async: false
            }).done((data: boolean): any => {
                if (data === true) {
                    global.warning("El valor '" + v + "' ya esta registrado");
                };
                //
                retValue = !data;
            }).fail((jqXHR: any, textStatus: any): any => {
            }).always((): any => { });
            //
            return retValue;
        };
    };
    //
    export const uniqueTarjeta: (field: string, message?: string) => UniqueTarjeta
        = (field: string, message?: string): UniqueTarjeta => {
            return new UniqueTarjeta(message, field);
        };
};

import dde = EK.UX.DropDownEdit;
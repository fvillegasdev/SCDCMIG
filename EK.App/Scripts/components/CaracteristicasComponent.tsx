namespace EK.UX.SCV {
    "use strict";

    const PAGE_ID: string = "caracteristicaAdicional";
    const MODULO_ID: string = "scv";

    const RADIO_VENTA_ID: string = "radioVentaNot";
    const RADIO_OPCIONAL_ID: string = "radioOpcionalNot";

    export var EntityTypeEnum = {
        PROTOTIPO: "P",
        DESARROLLO: "D",
        UBICACION: "U",
        ESQUEMA: "E",
        VENTA: "V",
        TIPOCOMERCIALIZACION: "TC",
        FINANCIAMIENTO: "F"
    };

    interface ICaracteristicasProps extends React.Props<any>, IFormElement {
        slot?: string;
        title?: string;
        subTitle?: string;
        level?: number;
        entity?: DataElement;
        entityType?: string;
        config?: page.IPageConfig;
        viewMode?: boolean;
        idEntidad?: number;
        idUbicacion?: number;
        idEsquema?: number;
        idFinanciamiento?: number;
        RecalculaPrecio?: () => void;
        stateManager?: StateDataManager;
        items?: DataElement;
        item?: DataElement;
        itemsKey?: string;
        itemKey?: string;
        isSlot?: number;
        icon?: string;

    };

    let EditCaracteristicas: any = global.connect(class extends React.Component<ICaracteristicasProps, {}> {
        constructor(props: ICaracteristicasProps) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onUpdate = this.onUpdate.bind(this);
            this.onRemove = this.onRemove.bind(this);
            this.onValidate = this.onValidate.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onChange = this.onChange.bind(this);
        }
        onAddNew(): void {
            let newId: number = 0;
            newId = this.props.items.getNextLowerID();

            let item: any = {
                ID: newId,
                Importe: 0,
                VentaOpcional: true,
                Caracteristica: createDefaultStoreObject({}),
                IdEntidadCaracteristica: 0
            };

            this.onSelect(item);
        }
        onCancel(): void {
            Forms.remove(this.props.slot);
            dispatchDefault("caracteristicas-component-setSelected", {}, this.props.itemKey);

            if (this.props.config) {
                this.props.config.setState({ viewMode: true }, this.props.slot);
            }
        }
        onSelect(item: any): void {
            Forms.remove(this.props.slot);
            dispatchSuccessful("caracteristicas-component-setSelected", item, this.props.itemKey);

            if (this.props.config) {
                this.props.config.setState({ viewMode: false }, this.props.slot);
            }
        }
        onRemove(item: any): void {
            if (isSuccessful(this.props.items)) {
                let items: any[] = getData(this.props.items.removeItem(item));
                this.onUpdate(items);
            };
            if (this.props.entityType === EntityTypeEnum.VENTA) {
                if (this.props.RecalculaPrecio) {
                    this.props.RecalculaPrecio();
                }
            }
        }
        onValidate(item: any): boolean {
            let items: any[] = getData(this.props.items);
            let result: boolean = true;

            items.forEach((value: any, index: number) => {
                if (value.ID !== item.ID) {
                    if (value.Caracteristica.ID === item.Caracteristica.ID) {
                        if (value._eliminado === true) {
                            return;
                        }

                        result = false;
                    }
                }
            });
            return result;
        }
        onSave(): void {
            let $page: any = $ml[PAGE_ID];
            if (!Forms.isValid(this.props.slot)) {
                warning($page.mensajes.warning.message);
                return;
            }
            let caracteristica: any;
            let item: EditForm = Forms.getForm(this.props.slot);
            if (this.props.entityType === EntityTypeEnum.VENTA) {
                let caracteristicaSel = item.getValue("Caracteristica");
                caracteristica = getData(this.props.item);
                caracteristica.Caracteristica = caracteristicaSel;
                caracteristica.Importe = caracteristicaSel.Importe;
                caracteristica.IdEntidadCaracteristica = caracteristicaSel.IdEntidadCaracteristica;
            } else {
                caracteristica = item
                    .addNumber("ID")
                    .addNumber("Importe")
                    .addString("VentaOpcional")
                    .addObject("Caracteristica")
                    .toObject();
            }
            caracteristica = EK.Global.assign(caracteristica, {
                Importe: caracteristica.Caracteristica.Importe,
                VentaOpcional: caracteristica.VentaOpcional === RADIO_VENTA_ID ? true : false,
                Caracteristica: caracteristica.Caracteristica,
                IdEntidadCaracteristica: caracteristica.IdEntidadCaracteristica
            });

            if (!this.onValidate(caracteristica)) {
                warning($page.mensajes.warning.item.message);
                return;
            }

            if (this.props.items) {
                let items: any[] = getData(this.props.items.upsertItem(caracteristica));
                this.onUpdate(items);
                this.onCancel();
            }

            if (this.props.entityType === EntityTypeEnum.VENTA) {
                if (this.props.RecalculaPrecio) {
                    this.props.RecalculaPrecio();
                }
            }
        }
        onChange(item: any): any {
            let model: EditForm = Forms.getForm(this.props.slot);
            let x: any = model.getValue("Caracteristica");

            let caracteristica: any = getData(this.props.item);
            caracteristica.Caracteristica = x;
            caracteristica.Importe = item.Importe;
            caracteristica.IdEntidadCaracteristica = item.IdEntidadCaracteristica;

            this.onSelect(caracteristica);
            Forms.updateFormElement(this.props.slot, "Importe", item.Importe);
        }
        onUpdate(items: any): void {
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: items,
                    initialValue: items,
                    hasChanged: true
                });
            }
            dispatchSuccessful("caracteristicas-component-catalogo", items, this.props.itemsKey);
        }
        componentWillMount(): void {
            Forms.remove(this.props.slot);
            dispatchDefault("caracteristicas-component-setSelected", {}, this.props.itemKey);
        }
        componentWillReceiveProps(nextProps: ICaracteristicasProps) {
            if (hasChanged(this.props.items, nextProps.items)) {
                let items: any[] = getData(nextProps.items);
                if (this.props.updateState) {
                    this.props.updateState({
                        id: nextProps.id,
                        value: items,
                        initialValue: items,
                        hasChanged: true
                    });
                }
            }
        }
        shouldComponentUpdate(nextProps: ICaracteristicasProps, {}): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.item, nextProps.item) ||
                hasChanged(this.props.entity, nextProps.entity);
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];

            let items: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                items = this.props.items.getActiveItems();
            };

            let itemBeingEdited: boolean = isSuccessful(this.props.item);
            let model: any = getData(this.props.item);

            let radioValue: string;
            if (model.VentaOpcional !== null && model.VentaOpcional !== undefined) {
                radioValue = model.VentaOpcional === true ? RADIO_VENTA_ID : RADIO_OPCIONAL_ID;
            } else {
                radioValue = RADIO_VENTA_ID;
            }

            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onRemove(item) }
            };

            let subTitle: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(items, []).length].join("")} </span>;

            return <OptionSection
                id={this.props.slot}
                title={this.props.title}
                icon={this.props.icon}
                subTitle={subTitle}
                level={this.props.level}
                collapsed={false}
                editMode={itemBeingEdited}
                inverse={this.props.entityType === EntityTypeEnum.VENTA ? true : false}>
                <SectionView onAddNew={this.onAddNew}>
                    <PanelUpdate info={items}>
                        <List
                            items={items}
                            readonly={true}
                            addRemoveButton={false}
                            dragAndDrop={false}
                            listHeader={<div>
                                <Row className="list-fixed-header">
                                    <Column size={[12, 4, 4, 4]} className="list-default-header">{$page.component.list.header.caracteristica}</Column>
                                    <Column size={[12, 3, 3, 3]} className="list-default-header">{$page.component.list.header.tipoCaracteristica}</Column>
                                    <Column size={[12, 2, 2, 2]} className="list-default-header">{this.props.entityType === EntityTypeEnum.VENTA ? "" : $page.component.list.header.ventaOpcional}</Column>
                                    <Column size={[12, 2, 2, 2]} className="list-default-header">{$page.component.list.header.importe}</Column>
                                    <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                                </Row>
                            </div>}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[12, 4, 4, 4]}><span>{item.Caracteristica.Nombre}</span></Column>
                                    <Column size={[12, 3, 3, 3]}><span>{item.Caracteristica.TipoCaracteristica.Nombre}</span></Column>
                                    <Column size={[12, 2, 2, 2]}><span>{EK.UX.Labels.ok(item.VentaOpcional)}</span></Column>
                                    <Column size={[12, 2, 2, 2]}><span>{EK.UX.Labels.formatMoney(item.Importe)}</span></Column>
                                    <buttons.PopOver idForm={this.props.slot} info={item} extraData={[edit, remove]} />
                                </Row>
                            } } />
                    </PanelUpdate>
                </SectionView>
                <SectionEdit
                    idForm={this.props.slot}
                    editMode={!this.props.viewMode}
                    onCancel={this.onCancel}
                    onSave={this.onSave}>
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            {
                                this.props.entityType === EntityTypeEnum.VENTA ?
                                    <Row>
                                        <input.Text id={"ID"} idFormSection={this.props.slot} value={model.ID} visible={false} />
                                        {<CCaracteristicasDDL
                                            id={"Caracteristica"}
                                            idFormSection={this.props.slot}
                                            size={[12, 12, 6, 6]}
                                            helpLabel={$page.component.form.caracteristica.helplabel}
                                            label={$page.component.form.caracteristica.label}
                                            value={model.Caracteristica}
                                            entityType={this.props.entityType}
                                            required={true}
                                            idUbicacion={this.props.idUbicacion}
                                            idFinanciamiento={this.props.idFinanciamiento}
                                            change={this.onChange}
                                            validations={[
                                                validations.required($page.component.form.caracteristica.validaciones.requerida)
                                            ]} />}
                                        <Label id="Importe" value={EK.UX.Labels.formatMoney(model.Importe)} label="" size={[12, 12, 3, 3]} />
                                        <input.Hidden id={"Importe"} idFormSection={this.props.slot} value={model.Importe} />
                                    </Row>
                                    : <div>
                                        
                                            <input.Text id={"ID"} idFormSection={this.props.slot} value={model.ID} visible={false} />
                                            <Row>
                                            <CCaracteristicasDDL
                                                    id={"Caracteristica"}
                                                    idFormSection={this.props.slot}
                                                    size={[12, 12, 12, 12]}
                                                    helpLabel={$page.component.form.caracteristica.helplabel}
                                                    label={$page.component.form.caracteristica.label}
                                                    value={model.Caracteristica}
                                                    entityType={this.props.entityType}
                                                    required={false}
                                                    validations={[
                                                        validations.required($page.component.form.caracteristica.validaciones.requerida)
                                                    ]} />

                                            <input.Currency
                                                id={"Importe"}
                                                idFormSection={this.props.slot}
                                                label={$page.component.form.importe.label}
                                                size={[12, 12, 6, 6]}
                                                required={true}
                                                value={model.Importe}
                                                validations={[
                                                    validations.required($page.component.form.importe.validaciones.requerida),
                                                    validations.isNumber($page.component.form.importe.validaciones.numero)
                                                ]} />

                                            <div style={{ marginTop: "13%" }}>
                                                <RadioButton$Form
                                                    id={RADIO_VENTA_ID}
                                                    idFormSection={this.props.slot}
                                                    label={$page.component.form.ventaOpcional.venta}
                                                    value={radioValue}
                                                    groupName={"VentaOpcional"}
                                                    size={[12, 12, 3, 3]} />
                                                <RadioButton$Form
                                                    id={RADIO_OPCIONAL_ID}
                                                    idFormSection={this.props.slot}
                                                    label={$page.component.form.ventaOpcional.opcional}
                                                    value={radioValue}
                                                    groupName={"VentaOpcional"}
                                                    size={[12, 12, 3, 3]} />
                                            </div>
                                            </Row> 
                                        
                                    </div>
                            }
                          
                        </Column>
                    </Row>
                </SectionEdit>
            </OptionSection>
        }
    });

    export let CaracteristicasForm: any = global.connect(class extends React.Component<ICaracteristicasProps, {}> {
        constructor(props: ICaracteristicasProps) {
            super(props);
            this.getCatalogoProp = this.getCatalogoProp.bind(this);
            this.getSelectedProp = this.getSelectedProp.bind(this);
            this.getItems = this.getItems.bind(this);
            this.getItem = this.getItem.bind(this);
            this.getSlot = this.getSlot.bind(this);
            this.updateState = this.updateState.bind(this);
        }
        static defaultProps: ICaracteristicasProps = {
            slot: "",
            title: "",
            subTitle: "",
            level:0,
            entity: undefined,
            entityType: "",
            idEntidad: 0,
            config: undefined,
            viewMode: true,
            idUbicacion: 0,
            idEsquema: 0,
            idFinanciamiento: 0,
            items: createDefaultStoreObject([]),
            item: createDefaultStoreObject({}),
            itemsKey: "",
            itemKey: "",
            isSlot: 0,
            icon: "fa fa-table"
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            stateManager: new StateDataManager(state.caracteristicasComponent),
            entity: state.global.currentEntity
        });
        getCatalogoProp(): string {
            return ["catalogo$", this.props.entityType].join("");
        }
        getSelectedProp(): string {
            return ["selected$", this.props.entityType].join("");
        }
        getSlot(): string {
            return ["caracteristica$", this.props.entityType].join("");
        }
        getItems(): any {
            let items: DataElement = this.props.stateManager.getById(this.getCatalogoProp());
            if (!items) {
                items = createDefaultStoreObject([]);
            }
            return items;
        }
        getItem(): DataElement {
            let item: DataElement = this.props.stateManager.getById(this.getSelectedProp());
            if (!item) {
                item = createDefaultStoreObject({});
            }
            return item;
        }
        updateState(element: any): void {
            let idForm: string;
            let config: page.IPageConfig = this.props.config;
            if (config) {
                idForm = config.id;
            }
            if (this.props.idFormSection) {
                idForm = this.props.idFormSection;
            }
            if (this.props.idForm) {
                idForm = this.props.idForm;
            }
            Forms.updateFormElement(idForm, element);
        }
        componentWillMount(): void {
        }
        componentDidMount(): void {
            if (this.props.isSlot==0)
            {
                let id: number = this.props.idEntidad ? this.props.idEntidad : getDataID(this.props.entity);
                if (id > 0) {
                    let encodedParams = global.encodeParameters({ IdEntidad: id, ClaveEntidad: this.props.entityType });
                    dispatchAsync("caracteristicas-component-catalogo", "CaracteristicaAdicional/GetCaracteristicas/" + encodedParams, this.getCatalogoProp());
                } else {
                    dispatchSuccessful("caracteristicas-component-catalogo", [], this.getCatalogoProp());
                }
            }
            else
            {
                let idSlot: number = Forms.getValue("ID", this.props.idFormSection);
                if (idSlot > 0) {
                    let encodedParams = global.encodeParameters({ IdEntidad: idSlot, ClaveEntidad: this.props.entityType });
                    dispatchAsync("caracteristicas-component-catalogo", "CaracteristicaAdicional/GetCaracteristicas/" + encodedParams, this.getCatalogoProp());
                } else {
                    dispatchSuccessful("caracteristicas-component-catalogo", [], this.getCatalogoProp());
                }
            }
            
        }
        render(): any {
            let $page: any = $ml[PAGE_ID];
            let slot: string = this.getSlot();
            let editView: boolean = !this.props.viewMode;
            let itemKey: string = this.getSelectedProp();
            let itemsKey: string = this.getCatalogoProp();
            let item: DataElement = this.getItem();
            let items: DataElement = this.getItems(); 
            let title = this.props.title ? this.props.title : $page.component.title.edit;

            return editView
                ? <EditCaracteristicas {...this.props}
                    slot={slot}
                    title={title}
                    item={item}
                    items={items}
                    itemKey={itemKey}
                    itemsKey={itemsKey}
                    updateState={this.updateState} />
                : <ViewCaracteristicas {...this.props} title={title} items={items} />
        }
    });

    export let ViewCaracteristicas: any = global.connect(class extends React.Component<ICaracteristicasProps, {}> {
        constructor(props: ICaracteristicasProps) {
            super(props);
        };
        shouldComponentUpdate(nextProps: ICaracteristicasProps, {}): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.entity, nextProps.entity);
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let items: DataElement = this.props.items;
            let subTitle: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(items, []).length].join("")} </span>;

            return <OptionSection title={this.props.title}
                collapsed={false}
                readOnly={true}
                icon={this.props.icon}
                level={this.props.level}
                subTitle={subTitle}>
                <PanelUpdate info={this.props.items}>
                    <List
                        items={this.props.items}
                        readonly={true}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        listHeader={<div>
                            <Row className="list-fixed-header">
                                <Column size={[12, 4, 4, 4]} className="list-default-header">{$page.component.list.header.caracteristica}</Column>
                                <Column size={[12, 3, 3, 3]} className="list-default-header">{$page.component.list.header.tipoCaracteristica}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{this.props.entityType === EntityTypeEnum.VENTA ? "" : $page.component.list.header.ventaOpcional}</Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header">{$page.component.list.header.importe}</Column>
                                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                            </Row>
                        </div>}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[12, 4, 4, 4]}><span>{item.Caracteristica.Nombre}</span></Column>
                                <Column size={[12, 3, 3, 3]}><span>{item.Caracteristica.TipoCaracteristica.Nombre}</span></Column>
                                <Column size={[12, 2, 2, 2]}><span>{EK.UX.Labels.ok(item.VentaOpcional)}</span></Column>
                                <Column size={[12, 2, 2, 2]}><span>{EK.UX.Labels.formatMoney(item.Importe)}</span></Column>
                            </Row>
                        } } />
                </PanelUpdate>
            </OptionSection>
        }
    });

    interface ICCaracteristicasDDLProps extends ddl.IDropDrownListProps {
        entityType: string;
        idUbicacion: number;
        idEsquema: number;
        idFinanciamiento: number;
        stateManager?: StateDataManager;
    }

    let CCaracteristicasDDL: any = global.connect(class extends React.Component<ICCaracteristicasDDLProps, {}> {
        constructor(props: ICCaracteristicasDDLProps) {
            super(props);
            this.getDispatchUrl = this.getDispatchUrl.bind(this);
            this.getCatalogoProp = this.getCatalogoProp.bind(this);
            this.getItems = this.getItems.bind(this);
        }
        static props: any = (state: any) => ({
            stateManager: new StateDataManager(state.caracteristicasComponent)
        });
        static defaultProps: ICCaracteristicasDDLProps = {
            id: "Caracteristica",
            items: createDefaultStoreObject([]),
            label: "Caracteristicas Adicionales",
            helpLabel: "Caracteristicas Adicionales",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6],
            entityType: "",
            idUbicacion: 0,
            idEsquema: 0,
            idFinanciamiento: 0
        };
        getDispatchUrl(): any {
            if (this.props.entityType) {
                if (this.props.entityType === EntityTypeEnum.VENTA) {
                    return "CaracteristicaAdicional/GetAllByVentaOpcional(" + this.props.idUbicacion + "," + this.props.idFinanciamiento + ")";
                } else {
                    let encodeURL: string = EK.Global.encodeAllURL(MODULO_ID, PAGE_ID, { activos: 0, ClaveEntidad: this.props.entityType });
                    return encodeURL;
                }
            } else {
                let encodeURL: string = EK.Global.encodeAllURL(MODULO_ID, PAGE_ID, { activos: 0 });
                return encodeURL;
            }
        }
        getCatalogoProp(): string {
            return ["dropdownlist_", this.props.entityType].join("");
        }
        getItems(): any {
            let items: DataElement = this.props.stateManager.getById(this.getCatalogoProp());
            if (!items) {
                items = createDefaultStoreObject([]);
            }
            return items;
        }
        componentDidMount(): any {
            dispatchAsync("caracteristicas-component-dropdownlist", this.getDispatchUrl(), this.getCatalogoProp());
        }
        render(): any {
            return <DropdownList {...this.props} items={this.getItems()} />
        }
    });
}

import globalSCV = EK.UX.SCV;
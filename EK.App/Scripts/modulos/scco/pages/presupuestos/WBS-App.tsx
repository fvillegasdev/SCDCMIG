namespace EK.Modules.SCCO.Pages.Presupuestos.WBS.App {
    "use strict";
    export const TARJETA_INSUMOS_ID: string = "tarjeta$insumos";
    export const TARJETA_INSUMOS_WBS_ID: string = "tarjeta$insumos$wbs";
    export const PAGE_TREEVIEW_ID: string = "wbs$presupuesto";

    export class WBSConfig implements Interfaces.IWBSConfig {
        id: string;
        minLevel: number;
        maxLevel: number;
        validations: any[];
        constructor(id: string, minLevel: number, maxLevel: number, validations: any[]) {
            this.id = id;
            this.minLevel = minLevel;
            this.maxLevel = maxLevel;
            this.validations = validations;
        };
    };

    export var WBSNodoType: Interfaces.IWBSNodoType = {
        OBRA: "O",
        NIVEL: "N",
        TARJETA: "T",
        INSUMO: "I"
    };

    export class WBSNodo implements Interfaces.IWBSNodo {
        codigo: string[];
        nivel: number;
        padre: Interfaces.IWBSNodo;
        raiz: Interfaces.IWBSNodo;
        tipo: string;
        entidad: any;
        constructor(entidad: any, padre: Interfaces.IWBSComposite, raiz: Interfaces.IWBSNodo, tipo: string) {
            this.padre = padre;
            this.raiz = raiz;
            this.tipo = tipo;

            if (!entidad) {
                entidad = {};
            };

            if (!entidad.Cantidad) entidad.Cantidad = 1.00000000;
            if (!entidad.Precio) entidad.Precio = 0.00000000;
            if (!entidad.Importe) entidad.Importe = 0.00000000;
            if (!entidad.Bloqueado) entidad.Bloqueado = false;

            this.entidad = global.assign({}, entidad);

            if (!padre) {
                this.nivel = 0;
                this.codigo = ["1"];
            } else {
                this.nivel = padre.nivel + 1;
                let _codigo: string = String(padre.getActiveChildren().length + 1);
                this.codigo = [].concat(padre.codigo, [_codigo]);
            };
        };
        calculate(): number {
            return this.entidad.Importe;
        };
        formatter(item: Interfaces.IWBSNodo, index: number, props: Components.IWBSNodoProps): JSX.Element {
            return <div></div>
        };
        node = (props: Components.IWBSNodoProps): JSX.Element => {
            return <Components.WBSObject {...props} item={this} collapsible={false} />
        };
        getLowerId(id?: number): number {
            id = id ? id : 0;

            if (this.entidad.ID <= 0) {
                if (this.entidad.ID < id) {
                    id = this.entidad.ID;
                };
            };

            return id;
        };
        update(item: App.Interfaces.IWBSNodo): boolean {
            let updated: boolean;

            let areEqual: boolean = this.isEqual(item);
            if (areEqual === true) {
                for (var p in item) {
                    this[p] = item[p];
                    this.entidad = global.assign(this.entidad, {
                        _eliminado: undefined,
                        _nuevo: undefined,
                        _sincambios: undefined,
                        _modificado: true
                    });
                };

                updated = true;
            };

            return updated;
        };
        serialize(): any {
            let retValue: any = global.assign(this.entidad, {
                Codigo: this.codigo.join("."),
                Nivel: this.nivel,
                Tipo: this.tipo
            });

            return retValue;
        };
        onEdit(idForm: string): void { };
        onView(idForm: string): void { };
        edit = (props: Components.IWBSNodoProps): JSX.Element => {
            let idForm: string = props.idFormSection ? props.idFormSection : props.idForm;

            return <Row>
                <input.Nombre label="Nombre" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                <input.Descripcion label="Descripción" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[]} />
            </Row>
        };
        mapFormToEntity = (form: global.EditForm): any => {
            let retValue: any = form
                .addID()
                .addNombre()
                .addDescripcion()
                .addEstatus()
                .addVersion()
                .toObject();

            return retValue;
        };
        isEqual(item: App.Interfaces.IWBSNodo): boolean {
            let retValue: boolean = false;

            if (item) {
                if (this.tipo === item.tipo) {
                    if (this.entidad && item.entidad) {
                        if (this.entidad.ID && item.entidad.ID) {
                            if (this.entidad.ID === item.entidad.ID) {
                                retValue = true;
                            }
                        }
                    }
                };
            };

            return retValue;
        };
        beforeSave(item?: any, config?: page.IPageConfig): boolean {
            return true;
        };
        getProperty(property: string): any {
            let retValue: any;
            //
            try {
                if (property) {
                    retValue = global.getNestedProp(this.entidad, property);
                };
            } catch (e) { }
            //
            return retValue;
        };
        setProperty(property: string, value: any): void {
            try {
                if (property) {
                    this.entidad[property] = value;
                };
            } catch (e) { };
        };
    };

    export class WBSComposite extends WBSNodo implements Interfaces.IWBSComposite {
        children: Array<Interfaces.IWBSNodo>;
        constructor(entidad: any, padre: any, raiz: any, tipo: string) {
            super(entidad, padre, raiz, tipo);
            this.children = new Array<Interfaces.IWBSNodo>();
        };
        add(item: Interfaces.IWBSNodo): void {
            this.children.push(item);
        };
        remove(item: Interfaces.IWBSNodo): void {
            let items: any[] = [];
            let thisItems = this.children ? this.children : [];
            let thisItem: any = EK.Global.assign({}, item);

            thisItems.forEach((nodo) => {
                let itemTemp: any = EK.Global.assign({}, nodo);

                if (!item.isEqual(nodo)) {
                    items.push(itemTemp);
                };
            });

            if (thisItem.entidad.ID > 0) {
                thisItem.entidad = global.assign(thisItem.entidad, {
                    _nuevo: undefined,
                    _sincambios: undefined,
                    _modificado: undefined,
                    _eliminado: true
                });

                items.push(thisItem);
            };

            this.children = [...items];
        };
        removeAll(): void {
            if (this.children && this.children.length > 0) {
                this.children.forEach((child) => {
                    this.remove(child);
                });
            };
        };
        calculate(): number {
            let cantidad: number = this.entidad.Cantidad;
            let importe: number = 0.00000000;
            let precio: number = 0.00000000;
            //
            let children = this.getActiveChildren();
            if (children) {
                children.forEach((item: Interfaces.IWBSNodo) => {
                    precio = precio + item.calculate();
                });
            };
            //
            importe = precio * cantidad;
            //
            this.entidad = global.assign(this.entidad, { Precio: precio, Importe: importe });
            //
            return importe;
        };
        node = (props: Components.IWBSNodoProps): JSX.Element => {
            let children: any[] = this.getActiveChildren();
            let collapsible: boolean;

            if (props.processChildren) {
                children = props.processChildren(this, children);
            };

            if (children && children.length > 0) {
                collapsible = true;
            };

            return <Components.WBSObject {...props} item={this} collapsible={collapsible}>
                <div className="wbs-node-children wbs-node-nested">
                    <ul className="wbs-node-children-container">
                        {
                            children.map((child: Interfaces.IWBSNodo, index: number) => {
                                let key: string = "nodo$" + index.toString();
                                props.index = this.nivel + index;
                                props.key = key;
                                //
                                return React.cloneElement(child.node(props), { key });
                            })
                        }
                    </ul>
                </div>
            </Components.WBSObject>
        };
        getLowerId(id?: number): number {
            id = super.getLowerId(id);

            if (this.children) {
                this.children.forEach((child) => {
                    id = child.getLowerId(id);
                })
            };

            return id;
        };
        update(item: App.Interfaces.IWBSNodo): boolean {
            let updated: boolean = super.update(item);
            //
            if (updated !== true) {
                if (this.children) {
                    this.children.forEach((child) => {
                        if (updated !== true) {
                            updated = child.update(item);
                            //
                            if (updated === true) {
                                this.entidad = global.assign(this.entidad, {
                                    _eliminado: undefined,
                                    _nuevo: undefined,
                                    _sincambios: undefined,
                                    _modificado: true
                                });
                            };
                        };
                    })
                };
            };

            return updated;
        };
        serialize(): any {
            let obj: any = super.serialize();
            let children: any[] = [];

            if (this.children) {
                this.children.forEach((value) => {
                    let child: any = value.serialize();
                    children.push(child);
                });
            };

            if (obj) {
                obj.Children = children;
            };

            return obj;
        };
        create(data: any): any {
            let retValue: App.Interfaces.IWBSNodo;
            //
            try {
                let id: number = this.getLowerId() - 1;
                let entidad: any = global.assign(data, { ID: id, _nuevo: true });
                //
                retValue = ___deserialize(entidad, this, this.raiz);
            }
            catch (e) { }
            //
            return retValue;
        };
        getActiveChildren(): Array<App.Interfaces.IWBSNodo> {
            let items: App.Interfaces.IWBSNodo[] = [];
            //
            if (this.children && this.children.length > 0) {
                this.children.forEach((child) => {
                    if (child && child.entidad && child.entidad._eliminado !== true) {
                        items = [...items, child];
                    };
                });
            };
            //
            return items;
        }
    };

    export class WBSObra extends WBSComposite implements Interfaces.IWBSObra {
        obra: any;
        constructor(entidad: any) {
            super(entidad, null, null, WBSNodoType.OBRA);
            this.obra = global.assign({}, entidad.Obra);
        };
        edit = (props: Components.IWBSNodoProps): JSX.Element => {
            let idForm: string = props.idFormSection ? props.idFormSection : props.idForm;

            return <Row>
                <input.Nombre label="Nombre" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                <input.Descripcion label="Descripción" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[]} />
            </Row>
        };
        formatter(item: Interfaces.IWBSNodo, index: number, props: Components.IWBSNodoProps): JSX.Element {
            return <div>
                <span className="badge badge-success" style={{ marginRight: 5 }}>O</span>
                <span className="wbs-node-name">{item.getProperty("Nombre")}</span>
                <span className="wbs-node-decimal"><span>{label.formatDecimal(item.getProperty("Importe"), 8)}</span></span>
                <Components.WBSActions
                    id={props.id}
                    idForm={props.idForm}
                    idFormSection={props.idFormSection}
                    item={item}
                    style={{ paddingRight: 5 }}
                    actions={[Components.$WBSActions.addLevel, Components.$WBSActions.edit]} />
            </div>
        };
    };

    export class WBSNivel extends WBSComposite implements Interfaces.IWBSNivel {
        constructor(entidad: any, padre: any, raiz: any) {
            super(entidad, padre, raiz, WBSNodoType.NIVEL);
        };
        onEdit(idForm: string): void {
            let editType: string = this.getProperty("EditType");
            if (editType === undefined || editType === null) {
                let obj: any = this.getProperty("NivelPresupuesto");
                if (obj !== undefined && obj !== null && obj.ID > 0) {
                    Forms.updateFormElement(idForm, "EditType", "object");
                } else {
                    Forms.updateFormElement(idForm, "EditType", "string");
                }
            };
        };
        edit = (props: Components.IWBSNodoProps): JSX.Element => {
            return <WBSNivelEdit$Form {...props} />
        };
        formatter(item: Interfaces.IWBSNodo, index: number, props: Components.IWBSNodoProps): JSX.Element {
            return <div>
                <span className="badge badge-info" style={{ marginRight: 5 }}>{item.getProperty("TipoNivelPresupuesto.Clave")}</span>
                <span className="wbs-node-name">{item.getProperty("Nombre")}</span>
                <span className="wbs-node-decimal"><span>{label.formatDecimal(item.getProperty("Importe"), 8)}</span></span>
                <span className="wbs-node-decimal"><span>{label.formatDecimal(item.getProperty("Precio"), 8)}</span></span>
                <span className="wbs-node-decimal wbs-node-input"><input.Decimal id="Cantidad" index={index} value={item.getProperty("Cantidad")}
                    onUpdateElement={(prevState, nextState, validateAsync) => {
                        item.setProperty("Cantidad", Number(nextState.value));
                        //
                        props.onNodeUpdate(item);
                    }} />
                </span>
                <Components.WBSActions
                    id={props.id}
                    idForm={props.idForm}
                    idFormSection={props.idFormSection}
                    item={item}
                    style={{ paddingRight: 5 }}
                    actions={[Components.$WBSActions.addCard, Components.$WBSActions.addLevel, Components.$WBSActions.delete, Components.$WBSActions.edit]} />
            </div>
        };
        mapFormToEntity = (form: global.EditForm): any => {
            let retValue: any = form
                .addID()
                .addNombre()
                .addDescripcion()
                .addNumber("Cantidad")
                .addNumber("Unidades")
                .addObject("TipoNivelPresupuesto")
                .addObject("NivelPresupuesto")
                .addObject("TipoAvance")
                .addString("EditType")
                .addEstatus()
                .addVersion()
                .toObject();
            //
            if (retValue.EditType) {
                if (retValue.EditType === "string") {
                    retValue["NivelPresupuesto"] = undefined;
                    retValue["IdNivelPresupuesto"] = undefined;
                };
                //
                if (retValue.EditType === "object") {
                    if (retValue.NivelPresupuesto) {
                        retValue["Clave"] = retValue.NivelPresupuesto.Clave;
                        retValue["Nombre"] = retValue.NivelPresupuesto.Nombre;
                    };
                };
            };
            //
            return retValue;
        };
        beforeSave(item?: any, config?: page.IPageConfig): boolean {
            if (this.padre) {
                if (this.padre instanceof WBSComposite) {
                    let parentChildren = this.padre.children;
                    if (parentChildren && parentChildren.length > 0) {
                        if (item.EditType === "object") {
                            let nivel: any = global.assign({}, item.NivelPresupuesto);
                            //
                            let found: boolean = parentChildren.some((value) => {
                                return ((value.getProperty("NivelPresupuesto.ID") === nivel.ID) &&
                                    (value.getProperty("_eliminado") !== true) &&
                                    (value.getProperty("ID") !== item.ID));
                            });
                            //
                            if (found === true) {
                                global.warning("El nivel seleccionado ya está agregado al nivel actual. Verifique la información.");
                                return false;
                            };
                        };
                    };
                };
            };
            //
            return true;
        };
    };

    interface IWBSNivelEditProps extends Components.IWBSNodoProps {
        tipoNivel?: any;
    };

    class WBSNivelEdit extends React.Component<IWBSNivelEditProps, IWBSNivelEditProps> {
        constructor(props: IWBSNivelEditProps) {
            super(props);
            //
            this.onChange = this.onChange.bind(this);
        };
        componentWillReceiveProps(nextProps: IWBSNivelEditProps, { }): void {
            if (global.hasChanged(this.props.tipoNivel, nextProps.tipoNivel)) {
                if (!global.isEmptyObject(nextProps.tipoNivel)) {
                    let idForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;
                    if (idForm) {
                        Forms.updateFormElement(idForm, "NivelPresupuesto", undefined);
                        Forms.updateFormElement(idForm, "IdNivelPresupuesto", undefined);
                        Forms.updateFormElement(idForm, "Cantidad", 1.00000000);
                        //
                        let tipoNivel: string = global.assign({}, nextProps.tipoNivel).Clave;
                        if (tipoNivel === "F") {
                            Forms.updateFormElement(idForm, "Unidades", 1);
                        } else {
                            Forms.updateFormElement(idForm, "TipoAvance", undefined);
                            Forms.updateFormElement(idForm, "Unidades", 0);
                        };
                        //
                        let url: string = global.encodeAllURL("scco", "NivelesPresupuesto", { activos: 1, tipoNivel });
                        //
                        global.dispatchAsync("load::niveles$presupuesto", url);
                    };
                };
            };
        };
        onChange(value: string): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm) {
                Forms.updateFormElement(idForm, "EditType", value);
            };
            //
            if (value === "object") {
                let tipoNivel: string = global.assign({}, this.props.tipoNivel).Clave;
                let url: string = global.encodeAllURL("scco", "NivelesPresupuesto", { activos: 1, tipoNivel });
                global.dispatchAsync("load::niveles$presupuesto", url);
            };
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let displayFrente: boolean;
            //
            let editType: string = Forms.getValue("EditType", idForm);
            let tipoNivel: any = Forms.getValue("TipoNivelPresupuesto", idForm);
            if (tipoNivel) {
                if (tipoNivel.Clave === "F") {
                    displayFrente = true;
                };
            };
            //
            let vFrenteRequired = new EK.UX.Validations.CustomValidation("requerido", "Este campo es requerido", [], (v: any, values?: any) => {
                let retValue: boolean = true;
                //
                let tipoNivel: any = Forms.getValue("TipoNivelPresupuesto", idForm);
                if (tipoNivel) {
                    if (tipoNivel.Clave === "F") {
                        if (v === undefined || v === null || $.trim(v) === "") {
                            retValue = false;
                        };
                    };
                };
                //
                return retValue;
            });

            return <Row>
                <ddl.SCCOTiposNivelesDDL idFormSection={idForm} size={[12, 12, 12, 12]} addNewItem="SO" required={true} validations={[validations.required()]} />
                {editType === "object" ? <ddl.SCCONivelesPresupuestoDDL idFormSection={idForm} size={[12, 12, 12, 12]} addNewItem="SO" required={true} validations={[validations.required()]} buttonClick={() => { this.onChange("string") }} iconButton="fas fa-pencil" externUpdate={true} /> : null}
                {editType === "string" ? <input.Text id="Nombre" label="Nivel Presupuesto" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} buttonClick={() => { this.onChange("object") }} iconButton="fas fa-list" /> : null}
                <input.Hidden id="EditType" idFormSection={idForm} />
                {displayFrente === true ? <input.Decimal id="Cantidad" label="Factor" idFormSection={idForm} size={[12, 12, 6, 6]} validations={[validations.required()]} /> : null}
                {displayFrente === true ? <input.Integer id="Unidades" idFormSection={idForm} label="Unidades Factor" size={[12, 12, 6, 6]} validations={[vFrenteRequired]} /> : null}
                {displayFrente === true ? <ddl.SCCOTiposAvanceDDL idFormSection={idForm} size={[12, 12, 12, 12]} addNewItem="SO" required={true} validations={[vFrenteRequired]} /> : null}
                <input.Descripcion label="Descripción" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[]} />
            </Row>
        };
    };

    class WBSNivelEditForm extends React.Component<IWBSNivelEditProps, {}>{
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm) {
                let tipoNivel: any = Forms.getValue("TipoNivelPresupuesto", idForm);

                return <WBSNivelEdit {...this.props} tipoNivel={tipoNivel} />
            };

            return null;
        };
    };

    export const WBSNivelEdit$Form: any = ReactRedux.connect(WBSNivelEditForm.props, null)(WBSNivelEditForm);

    export class WBSTarjeta extends WBSComposite implements Interfaces.IWBSTarjeta {
        constructor(entidad: any, padre: any, raiz: any) {
            super(entidad, padre, raiz, WBSNodoType.TARJETA);
        };
        onEdit(idForm: string): void {
            let id: number = this.getProperty("ID");
            if (id === undefined || id === null) {
                global.dispatchSuccessful("global-page-data", [], TARJETA_INSUMOS_WBS_ID);
            } else {
                global.dispatchSuccessful("global-page-data", this.children, TARJETA_INSUMOS_WBS_ID);
            };
        };
        edit = (props: Components.IWBSNodoProps): JSX.Element => {
            return <WBSTarjetaEdit$Form {...props} />
        };
        mapFormToEntity = (form: global.EditForm): any => {
            let retValue: any = form
                .addID()
                .addNombre()
                .addDescripcion()
                .addNumber("Cantidad")
                .addObject("Tarjeta")
                .addEstatus()
                .addVersion()
                .toObject();
            //
            if (retValue.Tarjeta) {
                retValue["Clave"] = retValue.Tarjeta.Clave;
                retValue["Nombre"] = retValue.Tarjeta.Nombre;
            };
            //
            return retValue;
        };
        formatter(item: Interfaces.IWBSNodo, index: number, props: Components.IWBSNodoProps): JSX.Element {
            return <div>
                <span className="wbs-node-name">
                    <div style={{ position: "absolute", top: 3 }}>
                        <i className="fad fa-cubes" style={{ fontSize: 18, color: "#ffab40" }}></i>
                    </div>
                    <div style={{ marginLeft: 25 }}>
                        <span style={{ alignItems: "center", marginRight: 2 }} className="badge badge-success">{item.getProperty("Tarjeta.Clave")}</span>
                        <span>{item.getProperty("Tarjeta.Nombre")}</span>
                    </div>
                </span>
                <span className="wbs-node-decimal"><span>{label.formatDecimal(item.getProperty("Importe"), 8)}</span></span>
                <span className="wbs-node-decimal"><span>{label.formatDecimal(item.getProperty("Precio"), 8)}</span></span>
                <span className="wbs-node-decimal wbs-node-input"><input.Decimal id="Cantidad" index={index} value={item.getProperty("Cantidad")}
                    onUpdateElement={(prevState, nextState, validateAsync) => {
                        item.setProperty("Cantidad", Number(nextState.value));
                        //
                        props.onNodeUpdate(item);
                    }} />
                </span>
                <Components.WBSActions
                    id={props.id}
                    idForm={props.idForm}
                    idFormSection={props.idFormSection}
                    item={item}
                    style={{ paddingRight: 5 }}
                    actions={[Components.$WBSActions.delete, Components.$WBSActions.edit]} />
            </div>
        };
        beforeSave(item?: any, config?: page.IPageConfig): boolean {
            let insumos: any = config.getCatalogo(TARJETA_INSUMOS_WBS_ID);
            if (insumos) {
                let _insumos: Array<Interfaces.IWBSNodo> = global.getData(insumos, []);
                this.children = [..._insumos];
            };
            //
            if (this.padre) {
                if (this.padre instanceof WBSComposite) {
                    let parentChildren = this.padre.children;
                    if (parentChildren && parentChildren.length > 0) {
                        let tarjeta: any = global.assign({}, item.Tarjeta);
                        //
                        let found: boolean = parentChildren.some((value) => {
                            return ((value.getProperty("Tarjeta.ID") === tarjeta.ID) &&
                                (value.getProperty("_eliminado") !== true) &&
                                (value.getProperty("ID") !== item.ID));
                        });
                        //
                        if (found === true) {
                            global.warning("La tarjeta seleccionada ya está agregada al nivel actual. Verifique la información.");
                            return false;
                        };
                    };
                };
            };
            //
            return true;
        };
    };

    const listHeaderTarjetaInsumos: JSX.Element =
        <Row style={{ marginLeft: 0 }}>
            <Column size={[12, 12, 5, 5]} className="list-default-header">{"Insumo/Tarjeta"}</Column>
            <Column size={[12, 12, 3, 3]} className="list-default-header">{"Unidad"}</Column>
            <Column size={[12, 12, 4, 4]} className="list-default-header">{"Moneda"}</Column>
            <Column size={[12, 12, 3, 3]} className="list-center-header">{"Cantidad"}</Column>
            <Column size={[12, 12, 3, 3]} className="list-center-header">{"Precio"}</Column>
            <Column size={[12, 12, 3, 3]} className="list-center-header">{"Importe"}</Column>
        </Row>

    interface IWBSTarjetaEditProps extends Components.IWBSNodoProps {
        item?: Interfaces.IWBSTarjeta;
        config?: page.IPageConfig;
        tarjeta?: any;
        insumos?: DataElement;
        insumosWBS?: DataElement;
        getInsumosWBS?: (idTarjeta: number) => void;
    };

    class WBSTarjetaEdit extends React.Component<IWBSTarjetaEditProps, {}> {
        componentWillReceiveProps(nextProps: IWBSTarjetaEditProps, { }): void {
            if (global.hasChanged(this.props.tarjeta, nextProps.tarjeta)) {
                if (nextProps.tarjeta) {
                    let idTarjeta: number = nextProps.tarjeta.ID;
                    if (idTarjeta > 0) {
                        this.props.getInsumosWBS(idTarjeta);
                    } else {
                        global.dispatchSuccessful("global-page-data", [], TARJETA_INSUMOS_ID);
                    };
                };
            };
            //
            if (global.hasChanged(this.props.insumos, nextProps.insumos)) {
                if (global.isSuccessful(nextProps.insumos)) {
                    let tarjeta: App.Interfaces.IWBSTarjeta = this.props.item;
                    if (tarjeta) {
                        tarjeta.removeAll();
                    };
                    //
                    let insumos: any[] = global.getData(nextProps.insumos, []);
                    if (insumos && insumos.length > 0) {
                        insumos.forEach((value, index) => {
                            let insumo = tarjeta.create(value);
                            if (insumo) {
                                tarjeta.add(insumo);
                            };
                        });
                    };
                    //
                    global.dispatchSuccessful("global-page-data", tarjeta.children, TARJETA_INSUMOS_WBS_ID);
                };
            };
        };
        shouldComponentUpdate(nextProps: IWBSTarjetaEditProps, { }): boolean {
            return global.hasChanged(this.props.tarjeta, nextProps.tarjeta) ||
                global.hasChanged(this.props.insumos, nextProps.insumos) ||
                global.hasChanged(this.props.insumosWBS, nextProps.insumosWBS);
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let itemsWBS: any[] = [];
            //
            let insumosWBS: any[] = global.getData(this.props.insumosWBS, []);
            if (insumosWBS && insumosWBS.length > 0) {
                itemsWBS = insumosWBS.filter((n) => { return n && n.entidad && n.entidad._eliminado !== true; });
            };
            //
            return <Row>
                <dde.TarjetasEdit idFormSection={idForm} addNewItem="SO" size={[12, 12, 12, 12]} validations={[validations.required()]} />
                <input.Decimal id="Cantidad" label="Cantidad" idFormSection={idForm} size={[12, 12, 12, 12]} validations={[validations.required()]} />
                <input.Descripcion label="Descripción" idFormSection={idForm} size={[12, 12, 12, 12]} required={true} validations={[]} />
                <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                    <page.OptionSection
                        id={TARJETA_INSUMOS_WBS_ID}
                        hideNewButton={true}
                        hideCollapseButton={true}
                        parent={idForm}
                        icon="fa fa-cubes"
                        level={1} collapsed={false}
                        readonly={false}>
                        <PanelUpdate info={this.props.insumosWBS}>
                            <List
                                id={TARJETA_INSUMOS_WBS_ID}
                                items={itemsWBS}
                                readonly={true}
                                horizontalScrolling={true}
                                selectable={false}
                                drawOddLine={false}
                                listHeader={listHeaderTarjetaInsumos}
                                formatter={(index: number, item: any) => {
                                    if (item.tipo === "T") {
                                        return <Row>
                                            <Column size={[12, 12, 5, 5]} className="listItem-default-item listItem-overflow">
                                                <div style={{ position: "absolute", top: 2 }}>
                                                    <i className="fad fa-cubes" style={{ fontSize: 18, color: "#ffab40" }}></i>
                                                </div>
                                                <div style={{ marginLeft: 25 }}>
                                                    <span style={{ alignItems: "center", marginRight: 4 }} className="badge badge-success">{item.getProperty("Tarjeta.Clave")}</span>
                                                    <span>{item.getProperty("Tarjeta.Nombre")}</span>
                                                </div>
                                            </Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item"><span className="badge badge-info">{item.getProperty("Tarjeta.UnidadMedida.Nombre")}</span></Column>
                                            <Column size={[12, 12, 4, 4]} className="listItem-default-item"><span className="badge badge-info">{item.getProperty("Moneda.Nombre")}</span></Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item" style={{ textAlign: "right" }}>{label.formatDecimal(item.getProperty("Cantidad"), 8)}</Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item bold" style={{ textAlign: "right" }}>{label.formatDecimal(item.getProperty("Precio"), 8)}</Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item bold" style={{ textAlign: "right" }}>{label.formatDecimal(item.getProperty("Importe"), 8)}</Column>
                                        </Row>
                                    };
                                    //
                                    if (item.tipo === "I") {
                                        return <Row>
                                            <Column size={[12, 12, 5, 5]} className="listItem-default-item listItem-overflow">
                                                <div style={{ position: "absolute", top: 2 }}>
                                                    <i className="fad fa-cube" style={{ fontSize: 18, color: "#659be0" }}></i>
                                                </div>
                                                <div style={{ marginLeft: 25 }}>
                                                    <span style={{ alignItems: "center", marginRight: 4 }} className="badge badge-success">{item.getProperty("Insumo.Clave")}</span>
                                                    <span>{item.getProperty("Insumo.Nombre")}</span>
                                                </div>
                                            </Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item"><span className="badge badge-info">{item.getProperty("Insumo.UnidadMedida.Nombre")}</span></Column>
                                            <Column size={[12, 12, 4, 4]} className="listItem-default-item"><span className="badge badge-info">{item.getProperty("Moneda.Nombre")}</span></Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item" style={{ textAlign: "right" }}>{label.formatDecimal(item.getProperty("Cantidad"), 8)}</Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item bold" style={{ textAlign: "right" }}>{label.formatDecimal(item.getProperty("Precio"), 8)}</Column>
                                            <Column size={[12, 12, 3, 3]} className="listItem-default-item bold" style={{ textAlign: "right" }}>{label.formatDecimal(item.getProperty("Importe"), 8)}</Column>
                                        </Row>
                                    };
                                    //
                                    return null;
                                }} />
                        </PanelUpdate>
                    </page.OptionSection>
                </Column>
            </Row>
        };
    };

    class WBSTarjetaEditForm extends React.Component<IWBSTarjetaEditProps, {}>{
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            insumos: state.global[["catalogo", TARJETA_INSUMOS_ID].join("$")],
            insumosWBS: state.global[["catalogo", TARJETA_INSUMOS_WBS_ID].join("$")]
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getInsumosWBS: (idTarjeta: number): void => {
                let encodedParams: string = global.encodeObject({ idTarjeta });
                global.dispatchAsync("global-page-data", "base/scco/Presupuestos/GetBP/GetInsumosWBS/" + encodedParams, TARJETA_INSUMOS_ID);
            }
        });
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm) {
                let tarjeta: any = Forms.getValue("Tarjeta", idForm);

                return <WBSTarjetaEdit {...this.props} tarjeta={tarjeta} />
            };

            return null;
        };
    };

    export const WBSTarjetaEdit$Form: any = ReactRedux.connect(
        WBSTarjetaEditForm.props, WBSTarjetaEditForm.dispatchs)(WBSTarjetaEditForm);

    export class WBSInsumo extends WBSNodo implements Interfaces.IWBSInsumo {
        constructor(entidad: any, padre: any, raiz: any) {
            super(entidad, padre, raiz, WBSNodoType.INSUMO);
        };
        formatter(item: Interfaces.IWBSNodo, index: number, props: Components.IWBSNodoProps): JSX.Element {
            return <div>
                <span className="wbs-node-name">
                    <div style={{ position: "absolute", top: 3 }}>
                        <i className="fad fa-cube" style={{ fontSize: 18, color: "#659be0" }}></i>
                    </div>
                    <div style={{ marginLeft: 25 }}>
                        <span style={{ alignItems: "center", marginRight: 2 }} className="badge badge-success">{item.getProperty("Insumo.Clave")}</span>
                        <span>{item.getProperty("Insumo.Nombre")}</span>
                    </div>
                </span>
                <span className="wbs-node-decimal"><span>{label.formatDecimal(item.getProperty("Importe"), 8)}</span></span>
                <span className="wbs-node-decimal wbs-node-input"><input.Decimal id="Precio" index={index} value={item.getProperty("Precio")}
                    onUpdateElement={(prevState, nextState, validateAsync) => {
                        item.setProperty("Precio", Number(nextState.value));
                        item.setProperty("Importe", Number(nextState.value));
                        //
                        props.onNodeUpdate(item);
                    }} />
                </span>
                <span className="wbs-node-moneda"><span className="badge badge-warning">{item.getProperty("Moneda.Clave")}</span></span>
            </div>
        };
    };

    export class WBSBlank extends WBSNodo {
        node = (props: Components.IWBSNodoProps): JSX.Element => {
            return <li className="wbs-node-container">
                <div className="wbs-node-content">
                    <a className="wbs-node-link wbs-node-selected wbs-node-blank">
                        <span className="wbs-node-text" style={{ marginLeft: 5 }}>{this.entidad.Nombre}</span>
                    </a>
                </div>
            </li>
        };
    };

    export const ___deserialize = (data: any, padre: any, raiz: any): Interfaces.IWBSNodo => {
        let retValue: Interfaces.IWBSNodo;

        if (data) {
            switch (data.Tipo) {
                case WBSNodoType.OBRA: retValue = new WBSObra(data); break;
                case WBSNodoType.NIVEL: retValue = new WBSNivel(data, padre, raiz); break;
                case WBSNodoType.TARJETA: retValue = new WBSTarjeta(data, padre, raiz); break;
                case WBSNodoType.INSUMO: retValue = new WBSInsumo(data, padre, raiz); break;
                default: retValue = new WBSNodo(data, padre, raiz, null); break;
            }
        };

        return retValue;
    };

    export const deserialize = (data: any, padre: any, raiz: any): Interfaces.IWBSNodo => {
        let retValue: Interfaces.IWBSNodo;
        //
        if (data) {
            retValue = ___deserialize(data, padre, raiz);
            //
            if (!raiz && retValue.tipo === WBSNodoType.OBRA) {
                raiz = retValue;
            };
            //
            if (retValue instanceof WBSComposite) {
                let children: any[] = data.Children;
                if (children && children.length > 0) {
                    children.forEach((child) => {
                        let item: any = deserialize(child, retValue, raiz);
                        let padre: Interfaces.IWBSComposite = retValue as Interfaces.IWBSComposite;
                        padre.add(item);
                    });
                }
            }
        };
        //
        return retValue;
    };

    export const getRoot: (obj: any) => any = (obj: any): any => {
        let node: any = global.assign({}, obj);

        while (node.padre) {
            node = node.padre;
        };

        return node;
    };

    export const areEqual: (obj1: any, obj2: any) => boolean = (obj1: any, obj2: any): boolean => {
        let retValue: boolean = false;

        obj1 = obj1 ? obj1 : {};
        obj2 = obj2 ? obj2 : {};

        if (obj1 && obj2) {
            if (obj1.tipo && obj2.tipo) {
                if (obj1.tipo === obj2.tipo) {
                    if (obj1.entidad && obj2.entidad) {
                        if (obj1.entidad.ID && obj2.entidad.ID) {
                            if (obj1.entidad.ID === obj2.entidad.ID) {
                                retValue = true;
                            }
                        }
                    }
                }
            }
        };

        return retValue;
    };

    export const hasChanged: (obj1: any, obj2: any) => boolean = (obj1: any, obj2: any): boolean => {
        try {
            if (obj1 && obj2) {
                let e1: any = global.assign({}, obj1.entidad);
                let e2: any = global.assign({}, obj2.entidad);

                if (obj1.tipo && obj2.tipo) {
                    if (obj1.tipo !== obj2.tipo) {
                        return true;
                    };
                };

                if (e1.ID && e2.ID) {
                    return e1.ID !== e2.ID;
                } else {
                    if (!e1.ID && !e2.ID) {
                        return false;
                    } else {
                        return true;
                    }
                };
            } else {
                if (!obj1 && !obj2) {
                    return false;
                } else {
                    return true;
                }
            }
        } catch (e) {
            return true;
        }
    };

    export const setWBSConfig: ({ id, minLevel, maxLevel, validations }) => any = ({ id, minLevel, maxLevel, validations }): any => {
        try {
            global.dispatchSuccessful(["load::wbsConfig$", id].join(""), { id, minLevel, maxLevel, validations });
        } catch (e) {
            return {};
        };
    };

    export const getWBSConfig: (id: string) => App.Interfaces.IWBSConfig = (id: string): App.Interfaces.IWBSConfig => {
        try {
            let stateConfig: any = global.getStateItem(["global.wbsConfig$", id].join(""));
            if (stateConfig) {
                let dataConfig: App.Interfaces.IWBSConfig = global.getData(stateConfig);
                let retValue: App.Interfaces.IWBSConfig = new App.WBSConfig(
                    dataConfig.id,
                    dataConfig.minLevel,
                    dataConfig.maxLevel,
                    dataConfig.validations);

                return retValue;
            };

            return null;
        } catch (e) {
            return null;
        };
    };
};
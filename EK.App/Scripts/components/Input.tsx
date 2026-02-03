namespace EK.UX.Inputs {
    "use strict";

    let MASCARA: any = {};
    MASCARA["RFC"] = "A{3,4}-999999-[A|9][A|9][A|9]";
    MASCARA["CURP"] = "A{3,4}-999999-[A|9]{8}";
    MASCARA["NSS"] = "99999999999";
    MASCARA["Celular"] = "99-9999-9999";
    export interface IInputProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        floatingLabel?: boolean;
        helpLabel?: string;
        icon?: string;
        label?: string;
        mask?: string;
        maxLength?: number;
        digits?: number;
        placeHolder?: string;
        required?: boolean;
        style?: React.CSSProperties;
        visible?: boolean | Function;
        password?: boolean;
        passwordValidator?: boolean;
        change?: (value: any) => void;
        buttonClick?: (btn: any, input: any, props: input.IInputProps) => void;
        onUpdateElement?: (prevState: EK.UX.IFormElement, nextState: EK.UX.IFormElement, validateAsync?: boolean) => void;
        iconButton?: string;
    };
    export class Input extends React.Component<IInputProps, IInputProps> {
        constructor(props: IInputProps) {
            super(props);

            this.onChange = this.onChange.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.getInputValue = this.getInputValue.bind(this);
            this.updateState = this.updateState.bind(this);
            this.initInput = this.initInput.bind(this);

            if (!props.updateState) {
                this.state = {
                    id: props.id,
                    value: props.value,
                    initialValue: props.value,
                    hasChanged: props.hasChanged,
                    validations: props.validations
                };
            };
        };
        static defaultProps: IInputProps = {
            id: "",
            label: "",
            floatingLabel: true,
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            visible: true,
            isFormComponent: true,
            password: false,
            passwordValidator: false
        };
        refs: {
            requiredPoint: Element;
            input: Element;
        };
        getInputValue(): string {
            let input: any = $(this.refs.input);
            let retValue: string;

            if (this.props.mask) {
                retValue = input.inputmask('unmaskedvalue');
            } else {
                retValue = input.val();
            }
            return retValue;
        };
        updateState(validateAsync: boolean): void {
            let currentValue: string = this.getInputValue();
            let hasChanged: boolean = this.props.hasChanged;

            if (!hasChanged && (currentValue !== this.props.initialValue)) {
                hasChanged = true;
            };

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: currentValue,
                    initialValue: this.props.initialValue,
                    hasChanged: hasChanged,
                    validations: this.props.validations,
                    isFormComponent: true
                }, validateAsync);
            } else {
                this.setState({
                    id: this.props.id,
                    value: currentValue,
                    initialValue: this.props.initialValue,
                    hasChanged: hasChanged,
                    validations: this.props.validations,
                    isFormComponent: true
                });
            };

            if (this.props.change) {
                this.props.change(currentValue);
            }
        };
        onChange(e: any): any {
            this.updateState(false);
        };
        onBlur(e: any): any {
            this.updateState(true);
        };
        onKeyDown(e: any): any {
            if (this.props.index >= 0) {
                let itemId: string;
                if (e.keyCode === 13 || e.keyCode === 40) {
                    itemId = "formControl_" + this.props.id + "_" + (this.props.index + 1);
                }
                else if (e.keyCode === 38) {
                    itemId = "formControl_" + this.props.id + "_" + (this.props.index - 1);
                };
                let nextItem: any = $("*#" + itemId);

                if (nextItem.size() >= 0) {
                    nextItem.focus();
                };
            };
        };
        initInput(): void {
            let input: any = $(this.refs.input);

            if (this.props.mask) {
                if (this.props.mask === "integer") {
                    input.inputmask("numeric", {
                        radixPoint: "",
                        groupSeparator: ",",
                        digits: 0,
                        digitsOptional: false,
                        autoGroup: true,
                        prefix: "",
                        rightAlign: true,
                        placeHolder: "0"
                    });
                }
                else if (this.props.mask === "percentage") {
                    input.inputmask("percentage", {
                        digits: 3
                    });
                }
                else if (this.props.mask === "numeric") {
                    input.inputmask("numeric", {
                        radixPoint: ".",
                        groupSeparator: ",",
                        digits: this.props.digits,
                        digitsOptional: false,
                        autoGroup: true,
                        prefix: "",
                        rightAlign: true,
                        placeHolder: "0"
                    });
                }
                else if (this.props.mask === "currency") {
                    input.inputmask("numeric", {
                        radixPoint: ".",
                        groupSeparator: ",",
                        digits: 2,
                        digitsOptional: false,
                        autoGroup: true,
                        prefix: "",
                        rightAlign: true,
                        placeHolder: "0"
                    });
                } else {
                    let customProps: any = {
                        "mask": this.props.mask,
                        skipOptionalPartCharacter: " "
                    };

                    if (this.props.placeHolder) {
                        customProps.placeholder = this.props.placeHolder;
                    };

                    input.inputmask("mask", customProps);
                };
                //
                //if (this.props.index >= 0) {
                //}
                //else {
                //    input.keyup(this.onChange);
                //};
            };

            if (this.props.password === true && this.props.passwordValidator === true) {
                let options: any = {};
                options.rules = {
                    activated: {
                        wordTwoCharacterClasses: true,
                        wordRepetitions: true,
                        ui: { showVerdictsInsideProgressBar: false }
                    }
                };
                input.pwstrength(options);
            };
        };
        componentDidMount(): void {
            this.initInput();
        };
        componentWillUpdate(nextProps: IInputProps, nextState: IInputProps): void {
            let input: any = $(this.refs.input);

            if (input.size() > 0) {
                input.inputmask('remove');
            };
            if (nextProps.password === true && nextProps.passwordValidator === true) {
                input.pwstrength("destroy");
            };
        };
        componentDidUpdate(prevProps: IInputProps, prevState: IInputProps): void {
            this.initInput();
        };

        shouldComponentUpdate(nextProps: IInputProps, nextState: IInputProps): boolean {
            let thisProps: IInputProps = this.props.updateState ? this.props : this.state;
            let thisNextProps: IInputProps = this.props.updateState ? nextProps : nextState;
            let element: any = Forms.getFormElement(this.props.idForm, this.props);
            if ((element.validations != nextProps.validations && nextProps.validations.length > 0)
                && !nextProps.idFormSection) {
                let props: any = Forms.cloneElementProps(this.props, nextProps);
                Forms.updateFormElement(this.props.idForm, props, nextProps.value);
            }
            if (thisProps.value !== thisNextProps.value ||
                thisProps.hasChanged !== thisNextProps.hasChanged ||
                thisProps.hasValidationError !== thisNextProps.hasValidationError ||
                thisProps.validate !== thisNextProps.validate 
            ) {
                return true;
            } else {
                return false;
            }
        }
        render(): JSX.Element {

            let thisProps: IInputProps = this.props.updateState ? this.props : this.state;

            if (!this.props.visible) {
                return null;
            }

            let required: boolean = false;

            let formControlId: string = "formControl_" + this.props.id;
            let className: string = this.props.className + " form-control input-sm";
            let formGroupClass: string = "form-group";
            let inputValue: string = thisProps.value ? thisProps.value : "";
            let hasValidations: boolean = false;



            let requiredPoint: any = "";

            if (thisProps.validations && thisProps.validations.length > 0) {
                hasValidations = true;
                for (var i = 0; i < thisProps.validations.length; i++) {
                    if (thisProps.validations[i] && thisProps.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            };
        

            if (thisProps.hasValidationError === true || (required && (thisProps.value == null || thisProps.value == ""))) {
                formGroupClass += " has-error";
                let errorsContent: string = "";
                thisProps.validations.forEach((value: Validations.ValidationError, index: number) => {
                    if (value != undefined || value != null ) {
                        errorsContent += "<li style='font-size: 11px; font-weight: 300;'>" + value.description + "</li>";
                    }
                });
                errorsContent = "<ul style='padding-left: 15px'>" + errorsContent + "</ul>";
                requiredPoint = <EK.UX.HoverCard content={errorsContent} placement={"top"}><span
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>
                    {hasValidations ? <i key="icon-excla" className="fa fa-exclamation"></i> : null}
                    {required ? <i key="icon-aste" className="fa fa-asterisk"></i> : null}
                </span></EK.UX.HoverCard>;
            } else {
                if (hasValidations) {
                    formGroupClass += " has-success";
                    requiredPoint = <span
                        data-container="body"
                        data-placement="right"
                        data-original-title={this.props.helpLabel}>
                        {hasValidations ? ((this.props.value != "" && this.props.value != undefined) ? <i key="icon-check" className="fa fa-check"></i> : <i key="icon-excla" className="fa fa-exclamation"></i>) : null}
                        {required ? <i key={"icon-aste"} className="fa fa-asterisk"></i> : null}
                    </span>;
                };
            };

            if (thisProps.value && thisProps.value !== "") {
                className += " edited";
            };

            let requiresAddOn: boolean =
                (this.props.mask === undefined && this.props.maxLength !== undefined) ||
                (this.props.icon !== undefined) ||
                (this.props.buttonClick !== undefined);

            let maxLength: number = !this.props.mask && this.props.maxLength ? this.props.maxLength : undefined;

            let inputType: string = "text";
            if (this.props.password === true) {
                inputType = "password";
            };

            if (this.props.index >= 0) {
                return this.props.visible !== true ? null
                    : <input
                        type={inputType}
                        className={className + " input-inline"}
                        id={formControlId + "_" + this.props.index}
                        name={formControlId + "_" + this.props.index}
                        value={inputValue}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onKeyDown={this.onKeyDown}
                        placeholder={this.props.placeHolder}
                        ref="input"
                        maxLength={maxLength} />;
            }
            else {
                return this.props.visible !== true ? null
                    : <Column
                        size={this.props.size}
                        lg={this.props.lg}
                        md={this.props.md}
                        sm={this.props.sm}
                        xs={this.props.xs}>
                        {requiresAddOn
                            ? <div className={formGroupClass} style={this.props.style}>
                                <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 11 }}>
                                    <span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type={inputType}
                                        className={className}
                                        id={formControlId}
                                        name={formControlId}
                                        value={inputValue}
                                        onChange={this.onChange}
                                        onBlur={this.onBlur}
                                        placeholder={this.props.placeHolder}
                                        ref="input"
                                        style={{ fontSize: 10 }}
                                        maxLength={maxLength} />
                                    {this.props.buttonClick !== undefined ?
                                        <span className="input-group-btn">
                                            <button className="btn btn-success btn-sm" type="button" onClick={() => {
                                                let jqId: string = "#" + formControlId;

                                                this.props.buttonClick($(jqId).parent().find("button"), $(jqId), this.props);
                                            }}>
                                                <i className={!this.props.iconButton ? "fas fa-sync-alt" : this.props.iconButton}></i>
                                            </button>
                                        </span> : null}
                                    {maxLength !== undefined ? <span className="input-group-addon" style={{ fontSize: 10 }}>{inputValue.length}/{this.props.maxLength}</span> : null}
                                    {this.props.icon !== undefined ? <span className="input-group-addon"><Icon icon={this.props.icon} /></span> : null}
                                </div>
                            </div>
                            : <div className={formGroupClass}>
                                <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 11 }}>
                                    <span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span>
                                </label>
                                <input
                                    type={inputType}
                                    className={className}
                                    id={formControlId}
                                    name={formControlId}
                                    value={inputValue}
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                    placeholder={this.props.placeHolder}
                                    style={{ fontSize: 10 }}
                                    ref="input" />
                            </div>
                        }
                    </Column>;
            }            
        }
    }
    export class InputForm extends React.Component<IInputProps, IInputProps> {
        constructor(props: IInputProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
        };
        updateState(element: any, validateAsync: boolean): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;
            //
            if (this.props.onUpdateElement) {
                this.props.onUpdateElement(this.props, element, validateAsync);
            } else {
                if (this.props.index >= 0) {
                    let aElement: IFormElement = Forms.getFormElement(idForm, { id: this.props.property });
                    let aElementValue: any[] = global.getData(aElement.value);
                    //
                    if (aElementValue && aElementValue.length > 0) {

                        let nElementValue: any = aElementValue.map((value: any, index: number) => {
                            return global.assign(value);
                        });
                        //
                        let item: any = nElementValue[this.props.index];
                        if (item) {

                            item[this.props.id] = element.value;
                            //
                            if (item.ID > 0) {
                                item._modificado = true;
                            }
                            else {
                                item._nuevo = true;
                                if (item.ID === null) {
                                    item.ID = -1;
                                }
                            }
                            nElementValue[this.props.index] = item;
                            //
                            //aElement.value.data = aElementValue;
                            //aElement.value.timestamp = aElement.value.timestamp + 1; 
                            //
                            Forms.updateFormElement(idForm, this.props.property, global.createSuccessfulStoreObject(nElementValue));
                        };
                    };
                }
                else {
                    Forms.updateFormElement(idForm, element, null, validateAsync);
                };
            };
        };
        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let index: any = this.props.index;
            if (idForm && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };
        //shouldComponentUpdate(nextProps: IInputProps, nextState: IInputProps): boolean {
        //    return !global.areEqual(this.props.value, nextProps.value);
        //};
        componentWillReceiveProps(nextProps: IInputProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;


            let element: any = Forms.getFormElement(nextIdForm, nextProps);

            let index: any = nextProps.index;
            if (idForm !== nextIdForm && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(nextIdForm, element);
            };
        };
        render(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any;

                if (this.props.index >= 0) {
                    element = EK.Global.assign(this.props);
                    //
                    let aElement: IFormElement = Forms.getFormElement(idForm, { id: this.props.property });
                    let aElementValue: any[] = global.getData(aElement.value);
                    //
                    if (aElementValue && aElementValue.length > 0) {
                        let item: any = aElementValue[this.props.index];
                        if (item) {
                            element.value = item[this.props.id];
                        };
                    };
                }
                else {
                    element = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));
                };

                if ((element.value == undefined || element.value == null || element.value == 0)) {
                    if (this.props.mask == "currency") {
                        element.value = "0.00";
                    };

                    if (this.props.mask == "numeric") {
                        element.value = (0).toFixed(this.props.digits).toString();
                    };
                };

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <Input {...element} {...labels} updateState={this.updateState}  />;
            } else {
                return null;
            };
        };
    };
    export let Text: any = ReactRedux.connect(Forms.props, null)(InputForm);

    export class Hidden extends React.Component<IInputProps, IInputProps> {
        render(): any {
            return <Text {...this.props} visible={false} />;
        };
    };


    interface IInputClave extends IInputProps {
        sistema: any;
        url: string;
    };

    export const Clave = global.connect(class extends React.Component<IInputClave, IInputClave> {
        constructor(props: IInputClave) {
            super(props);
        }
        //
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.config = global.createPageConfigFromState(state.global);
            retValue.sistema = Forms.getValue("Sistema", global.createPageConfigFromState(state.global).id);
            return retValue;
        };
        //
        static defaultProps: IInputProps = {
            id: "Clave",
            size: [9, 2, 2, 2],
            maxLength: 150
        };
        render(): any {
            // "base/scv/Categorias/exists/Exists"
            let url: string =
                this.props.url ? this.props.url :
                ["base/", this.props.config.modulo, "/", this.props.config.id, "/exists/Exists"].join("");
           
            let v: Validations.ValidationError[] = this.props.validations;
            if (!v) {
                v = [];
            };
            v.push(validations.required());
            if (!this.props.idFormSection || this.props.url) {
                v.push(validations.unique(url, "clave", "El campo CLAVE debe ser único"));              
            };
            if (this.props.idFormSection) {
                v.push(validations.clave("clave", "Esta clave ya sea ha agregado", this.props.config.id, this.props.idFormSection));
            }
            if (this.props.sistema === true) {
                return <label.Clave size={[12, 2, 2, 2]} label={<div>Clave <span style={{ color: "#ffc107" }} className='fas fa-lock'></span></div>} />
            }
            else {
                return <Text {...this.props} validations={v} />
            };
        };
    });

    interface IUnique extends IInputProps {
        idElement?: string;
        base?: boolean;
    };

    //export class ClaveInsumo extends React.Component<IInputProps, IInputProps> {
    //    static defaultProps: IInputProps = {
    //        id: "Clave",
    //        maxLength: 150,
    //        mask: "99-99-99999999"
    //    };
    //    render(): any {
    //        return <Text {...this.props} />
    //    };
    //};

    export const Unique: any = global.connect(class extends React.Component<IUnique, IUnique> {
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IUnique = {
            id: undefined,
            size: [9, 2, 2, 2],
            maxLength: 150,
            base: true
        };
        render(): any {
            let mascara: string = MASCARA[this.props.idElement];
            let method: string = this.props.base ? "" : this.props.id;

            let url: string = ["base/", this.props.config.modulo, "/", this.props.config.id, "/exists/" + "Exists" + method].join("");

            let v: Validations.ValidationError[] = this.props.validations;
            if (!v) {
                v = [];
            };

            let existsRequiredValidacion: boolean = false;
            let existsUniqueValidacion: boolean = false;

            for (var i = 0; i < v.length; i++) {

                if (v[i].type === "requerido") {
                    existsRequiredValidacion = true;
                }

                if (v[i].type === this.props.id)
                {
                    existsUniqueValidacion = true;
                }
            };

            if (!existsRequiredValidacion)
            {
                v.push(validations.required());
            }


            if (!existsUniqueValidacion) {
                v.push(validations.unique(url, this.props.id, "El campo " + this.props.idElement + " debe ser único"));
            }


            if (mascara == undefined)
            {
                return <Text {...this.props} validations={v}  />
            }

            return <Text {...this.props} validations={v} mask={mascara} />
        };
    });


    //export class Clave extends React.Component<IInputProps, IInputProps> {
    //    static defaultProps: IInputProps = {
    //        id: "Clave",
    //        size: [9, 2, 2, 2],
    //        maxLength: 150,
    //        validations: [validations.required()]
    //    };
    //    render(): any {
    //        return <Text {...this.props} />
    //    };
    //};
    export class Password extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Password",
            size: [12, 6, 6, 6],
            maxLength: 50,
            password: true,
            validations: [validations.required()]
        };
        render(): any {
            return <Text {...this.props} />;
        };
    };
    export class Nombre extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Nombre",
            size: [8, 8, 8, 8],
            maxLength: 150,
            validations: [validations.required()]
        };
        render(): any {
            return <Text {...this.props} />;
        };
    };
    export class Descripcion extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Descripcion",
            size: [8, 8, 8, 8],
            maxLength: 150,
            validations: [validations.required()]
        };
        render(): any {
            return <Text {...this.props} />;
        };
    };
    export class CodigoPostal extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "CodigoPostal",
            size: [4, 4, 4, 4],
            maxLength: 5,
            mask: "99999",
            validations: [validations.isNumber()]
        };
        render(): any {
            return <Text {...this.props} />;
        };
    };
    export class Integer extends React.Component<IInputProps, IInputProps> {
        render(): any {
            return <Text {...this.props} mask="integer" />
        };
    };

    export class Porcentaje extends React.Component<IInputProps, IInputProps> {
        render(): any {
            return <Text {...this.props} mask="percentage" digits={2} />
        };
    };
    export class Currency extends React.Component<IInputProps, IInputProps> {
        render(): any {
            return <Text {...this.props} mask="currency" />         
        };
    };
    export class Decimal extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            digits: 8
        };
        render(): any {
            return <Text {...this.props} mask="numeric" />
        };
    };
    export class RFC extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "RFC"
        };
        render(): any {
            return <Text {...this.props} mask="A{3,4}-999999-[A|9][A|9][A|9]" />
        };
    };
    export class CURP extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "CURP"
        };
        render(): any {
            return <Text {...this.props} mask="A{3,4}-999999-[A|9]{8}" />
        };
    };
    interface IClaveUbicaciones extends IInputProps {
        desarrollo?: any;
    };
    export const
        ClaveUbicaciones: any = global.connect(class extends React.Component<IClaveUbicaciones, IClaveUbicaciones> {
            static props: any = (state: any) => ({
                config: global.createPageConfigFromState(state.global),
                desarrollo: state.global.currentEntity$desarrollo
            });
            static defaultProps: IClaveUbicaciones = {
                id: "Clave"
            };
            render(): any {
                let entity: DataElement = this.props.config.getEntity();
                let mascaraClave: string = "";
                let mascaraLength: number = 0;
                if (global.isSuccessful(entity)) {
                    let data: any = getData(entity);
                    let desarrolloEntity: any = getData(this.props.desarrollo).FormatoClave;
                    if (data.Desarrollo && data.Desarrollo.FormatoClave || desarrolloEntity) {
                        let formato: any[] = data.Desarrollo && data.Desarrollo.FormatoClave ? data.Desarrollo.FormatoClave : desarrolloEntity;
                        if (formato && formato.length > 0) {
                            formato.forEach((value: any, index: number) => {
                                if (mascaraClave.length > 0) {
                                    mascaraClave += "-";
                                }
                                mascaraClave += "[A|9]{" + value.Longitud + "}";
                                mascaraLength += parseInt(value.Longitud);
                            });
                        };
                    };
                };
                //let ent: DataElement = this.props.config.getEntity();
                //if (!(global.getDataID(ent) >= 1)) {
                //    return <Clave {...this.props} mask={mascaraClave} />;
                //}
                //else {
                //    return <Clave {...this.props} mask={mascaraClave} validations={[validations.length("La longitud deber ser al menos de " + mascaraLength + " posiciones", mascaraLength)]} />;
                //}
                //
                //return <Clave {...this.props} mask="[A|9]{4}-[A|9]{4}-[A|9]{4}-[A|9]{4}" placeHolder="" />
                return <Clave {...this.props} mask={mascaraClave} validations={[validations.length("La longitud deber ser al menos de " + mascaraLength + " posiciones", mascaraLength)]} />;

            };
        });
    export class Duracion extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Duracion"
        };
        render(): any {
            return <Text {...this.props} mask="numeric" digits={1} />
        };
    };
    export class IdContable extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "IdContable"
        };
        render(): any {
            return <Text {...this.props} mask="9999" />
        };
    };

    export class NSS extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "NSS"
        };
        render(): any {
            return <Text {...this.props} mask="99999999999" />
        };
    };
    export class Telefono extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Telefono",
            size: [4, 4, 4, 4],
            maxLength: 10,
            mask: "99-9999-9999",
        };
        render(): any {
            return <Text {...this.props} />
        };
    };
    export class Telefono2 extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Telefono",
            size: [4, 4, 4, 4],
            maxLength: 10,
            mask: "99-9999-9999",
            validations: [validations.isNumber()]
        };
        render(): any {
            return <Text {...this.props} />
        };
    };
    export class Email extends React.Component<IInputProps, IInputProps> {
        static defaultProps: IInputProps = {
            id: "Email",
            size: [4, 4, 4, 4],
            maxLength: 150
        };
        render(): any {
            //let v: any[] = [validations.email("")];
            //v.push(this.props.validations);
            //validations={v} 
            return <Text {...this.props} />
        };
    };
    export const RichText = RichTextEditor;
    export const Date = DatePicker$Form;
};

import input = EK.UX.Inputs;
import Input = EK.UX.Inputs.Text;
import Integer = EK.UX.Inputs.Integer;
import Porcentaje = EK.UX.Inputs.Porcentaje;
import Currency = EK.UX.Inputs.Currency;
import RFC = EK.UX.Inputs.RFC;
import IdContable = EK.UX.Inputs.IdContable;
import CURP = EK.UX.Inputs.CURP;
import NSS = EK.UX.Inputs.NSS;
import Telefono = EK.UX.Inputs.Telefono;
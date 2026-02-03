namespace EK.UX.CheckBoxes {
    "use strict";
    export enum Mode {
        normal,
        line,
        iCheckBox
    }
    export interface ICheckBoxProps extends React.Props<any>, grid.IColumnProps, EK.UX.IFormElement {
        label?: string;
        checkedLabel?: string;
        checkedIcon?: string;
        checkedClass?: string;
        checkedStyle?: React.CSSProperties;
        uncheckedLabel?: string;
        uncheckedIcon?: string;
        uncheckedClass?: string;
        uncheckedStyle?: React.CSSProperties;
        helpLabel?: string;
        required?: boolean;
        disabled?: boolean;
        icon?: string;
        mode?: number;
        change?: (item: any) => void;
        textAlign?: string;
    }

    class CheckBox$ extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.initiCheck = this.initiCheck.bind(this);
            this.handleOnChange = this.handleOnChange.bind(this);
        };

        static defaultProps: ICheckBoxProps = {
            id: "",
            label: "",
            helpLabel: "",
            value: false,
            style: {},
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            disabled: false,
            mode: Mode.line,
            isFormComponent: true,
            textAlign: "center",
            icon: ""
        };

        refs: {
            input: Element;
            requiredPoint: Element;
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

        onChange(e: any): any {
            let currentValue: boolean = e.currentTarget.checked;

            this.handleOnChange(currentValue);

            if (this.props.change != undefined) {
                this.props.change(currentValue);
            };
        };
        handleOnChange(value: boolean): void {
            let hasChanged: boolean = this.props.hasChanged;
            let hasValidationError: boolean = false;

            if (!hasChanged && (value !== this.props.initialValue)) {
                hasChanged = true;
            }

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: value,
                    hasChanged: hasChanged,
                    initialValue: this.props.initialValue,
                    hasValidationError: hasValidationError
                });
            };
        };

        initiCheck() {
            let input: any = $(this.refs.input);
            let thisLabel: string = this.props.label;
            let thisClass: string = "icheckbox_line";
            let thisIcon: string = "icheck_line-icon";
            let thisStyle: React.CSSProperties
            if (this.props.value) {
                if (this.props.checkedLabel) {
                    thisLabel = this.props.checkedLabel;
                };
                if (this.props.checkedClass) {
                    thisClass += " " + this.props.checkedClass;
                };
                if (this.props.checkedStyle) {
                    thisStyle = this.props.checkedStyle;
                };
                if (this.props.checkedIcon) {
                    thisIcon = this.props.checkedIcon;
                };
            } else {
                //if (this.props.uncheckedLabel) {
                //    thisLabel = this.props.uncheckedLabel;
                //};
                if (this.props.uncheckedClass) {
                    thisClass += " " + this.props.uncheckedClass;
                };
                if (this.props.uncheckedStyle) {
                    thisStyle = this.props.uncheckedStyle;
                };
                if (this.props.uncheckedIcon) {
                    thisIcon = this.props.uncheckedIcon;
                };
            };
            // icheck_line-icon
            input.iCheck({
                checkboxClass: thisClass,
                insert: "<div class=\"" + thisIcon + "\" style=\"margin-right: 10px;\"></div>" + thisLabel
            }).on("ifChecked", () => { this.handleOnChange(true); })
                .on("ifUnchecked", () => { this.handleOnChange(false); });

            input.parent().css({ width: "100%", paddingLeft: "0px", paddingRight: "0px" });
        };

        seleccionarDefault(): void {
            let item: any = {
                currentTarget: {
                    checked: this.props.value === null ? true : this.props.value
                }
            };
            this.onChange(item);
        }

        componentDidMount(): void {
            if (this.props.mode === Mode.iCheckBox) {
                this.initiCheck();
            }
            //this.seleccionarDefault();
        }

        componentDidUpdate(): void {
            if (this.props.mode === Mode.iCheckBox) {
                this.initiCheck();
            }
            this.seleccionarDefault();
        }

        componentWillUnmount(): void {
            if (this.props.mode === Mode.iCheckBox) {
                let input: any = $(this.refs.input);

                input.iCheck('destroy');
            }
        }

        componentWillUpdate(nextProps: ICheckBoxProps, nextState: ICheckBoxProps) {
            if (this.props.mode === Mode.iCheckBox) {
                let input: any = $(this.refs.input);

                input.iCheck('destroy');
            }
        }

        shouldComponentUpdate(nextProps: ICheckBoxProps, nextState: ICheckBoxProps): boolean {
            if (this.props.value !== nextProps.value ||
                this.props.hasChanged !== nextProps.hasChanged ||
                this.props.hasValidationError !== nextProps.hasValidationError) {
                return true;
            } else {
                return false;
            }
        }

        renderNormal(): JSX.Element {
            let formControlId: string;
            let className: string = "md-check";
            let formGroupClass: string = "form-group";

            className += (this.props.disabled) ? " disabled" : "";

            if (this.props.id) {
                formControlId = "formControl_" + this.props.id;
            }
            else {
                formControlId = "formControl_" + Number(new Date());
            };

            let requiredPoint: any = "";
            let requiredElement: any = "";
            if (this.props.required) {
                requiredElement = <span className="badge badge-danger">&nbsp;requerido&nbsp;</span>;
            }

            if (this.props.hasValidationError) {
                formGroupClass += " has-error";
                requiredPoint = <span
                    className="badge badge-danger tooltips"
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>*</span>;
            }

            // customize
            let thisLabel: string = this.props.label;
            let thisClass: string = "md-checkbox";
            let thisStyle: React.CSSProperties = {};
            if (this.props.value) {
                if (this.props.checkedLabel) {
                    thisLabel = this.props.checkedLabel;
                };
                if (this.props.checkedClass) {
                    thisClass += " " + this.props.checkedClass;
                };
                if (this.props.checkedStyle) {
                    thisStyle = this.props.checkedStyle;
                };
            } else {
                //if (this.props.uncheckedLabel) {
                //    thisLabel = this.props.uncheckedLabel;
                //};
                if (this.props.uncheckedClass) {
                    thisClass += " " + this.props.uncheckedClass;
                };
                if (this.props.uncheckedStyle) {
                    thisStyle = this.props.uncheckedStyle;
                };
            };

            thisStyle.overflow = "visible";
            thisStyle.float = "right";
            let formGroupStyle: React.CSSProperties = EK.Global.assign(this.props.style, { marginBottom: 0 });
            if (this.props.index >= 0) {
                return <div className={thisClass} style={thisStyle}>
                    <input
                        type="checkbox"
                        className={className + " input-inline"}
                        id={formControlId + "_" + this.props.index}
                        name={formControlId + "_" + this.props.index}
                        checked={this.props.value}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        disabled={this.props.disabled} />
                    <label htmlFor={formControlId}>
                        <span></span>
                        <span className="check"></span>
                        <span className="box"></span>
                    </label>
                </div>;
            }
            else {
                return <Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <div style={{ backgroundColor: "#fff", marginTop: 18, marginBottom: 43 }}>
                        <div className={formGroupClass} style={formGroupStyle}>
                            <div className="md-checkbox-list">
                                <div className={thisClass} style={thisStyle}>
                                    <input
                                        type="checkbox"
                                        className={className}
                                        id={formControlId}
                                        name={formControlId}
                                        checked={this.props.value}
                                        onChange={this.onChange}
                                        disabled={this.props.disabled} />
                                    <label htmlFor={formControlId}>
                                        <span></span>
                                        <span className="check"></span>
                                        <span className="box"></span>{thisLabel}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.children}
                </Column>;
            };
        }
        renderLine(): JSX.Element {

            let formControlId: string;
            let className: string = "md-check";
            let formGroupClass: string = "form-group";

            className += (this.props.disabled) ? " disabled" : "";

            if (this.props.id) {
                if (this.props.idFormSection) {
                    formControlId = "formControl_" + this.props.idFormSection + "_" + this.props.id;
                }
                else if (this.props.idForm) {
                    formControlId = "formControl_" + this.props.idForm + "_" + this.props.id;
                }
                else {
                    formControlId = "formControl_" + this.props.id;
                }
            }
            else {
                formControlId = "formControl_" + Number(new Date());
            };

            let requiredPoint: any = "";
            let requiredElement: any = "";
            if (this.props.required) {
                requiredElement = <span className="badge badge-danger">&nbsp;requerido&nbsp;</span>;
            }

            if (this.props.hasValidationError) {
                formGroupClass += " has-error";
                requiredPoint = <span
                    className="badge badge-danger tooltips"
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>*</span>;
            }

            // customize
            let thisLabel: string = this.props.label;
            let thisClass: string = "md-checkbox-list";
            let thisStyle: React.CSSProperties = {};
            let parentStyle: React.CSSProperties = this.props.style;
            parentStyle.textAlign = this.props.textAlign;

            if (this.props.value) {
                if (this.props.checkedLabel) {
                    thisLabel = this.props.checkedLabel;
                };
                if (this.props.checkedClass) {
                    thisClass += " " + this.props.checkedClass;
                };
                if (this.props.checkedStyle) {
                    thisStyle = this.props.checkedStyle;
                };
            } else {
                //if (this.props.uncheckedLabel) {
                //    thisLabel = this.props.uncheckedLabel;
                //};
                if (this.props.uncheckedClass) {
                    thisClass += " " + this.props.uncheckedClass;
                };
                if (this.props.uncheckedStyle) {
                    thisStyle = this.props.uncheckedStyle;
                };
            };
            //thisStyle.margin = "0 auto";
            //thisStyle.display = "inline-block";
            //thisStyle.overflow = "hidden";
            //let formGroupStyle: React.CSSProperties = EK.Global.assign(this.props.style, { marginBottom: 0 });
            //thisStyle.overflow = "visible";
            thisStyle.textAlign = "left";
            let formGroupStyle: React.CSSProperties = this.props.style;
            if (this.props.index >= 0) {
                return <div className="" style={thisStyle}>
                        <input
                            type="checkbox"
                            className={className + " input-inline"}
                            id={formControlId + "_" + this.props.index}
                            name={formControlId + "_" + this.props.index}
                            checked={this.props.value}
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                            disabled={this.props.disabled}
                            style={{ width: 18 }} />
                    </div>;
            }
            else {
                return <Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <div>
                        <div className={formGroupClass} style={formGroupStyle}>
                            <div className={thisClass} style={{ padding: "15px 0px 0px 0px" }}>
                                <div className="md-checkbox" style={thisStyle}>
                                    {!this.props.disabled
                                        ? <input
                                            type="checkbox"
                                            className={className}
                                            id={formControlId}
                                            name={formControlId}
                                            checked={this.props.value}
                                            onChange={this.onChange}
                                            disabled={this.props.disabled} />
                                        : null}
                                    <label htmlFor={formControlId}>
                                        <span></span>
                                        {!this.props.disabled ?
                                            <span className="check"></span>
                                            : (this.props.disabled && this.props.value) ? <span className="check" style={{ opacity: 1, transform: "rotate(45deg)" }}></span> : null}
                                        {!this.props.disabled || (this.props.disabled && !this.props.value) ? <span className="box"></span> : null}
                                        {thisLabel}
                                    </label>
                                    {this.props.icon != "" ?
                                        <span className={this.props.icon} style={{ fontSize: "20px", color: "blue" }}></span>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.children}
                </Column>;
            };
        }
        renderiCheckbox(): JSX.Element {
            let formControlId: string = "formControl_" + this.props.id;
            let className: string = "toggle";
            let formGroupClass: string = "form-group";

            className += (this.props.disabled) ? " disabled" : "";

            let requiredPoint: any = "";
            let requiredElement: any = "";
            if (this.props.required) {
                requiredElement = <span className="badge badge-danger">&nbsp;requerido&nbsp;</span>;
            }

            if (this.props.hasValidationError && this.props.validate === true) {
                formGroupClass += " has-error";
                requiredPoint = <span
                    className="required-char"
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>*</span>;
            }

            // customize
            let thisLabel: string = this.props.label;
            let thisClass: string = "md-checkbox-list";
            let thisStyle: React.CSSProperties = {};
            let parentStyle: React.CSSProperties = this.props.style;
            parentStyle.textAlign = this.props.textAlign;

            if (this.props.value) {
                if (this.props.checkedLabel) {
                    thisLabel = this.props.checkedLabel;
                };
                if (this.props.checkedClass) {
                    thisClass += " " + this.props.checkedClass;
                };
                if (this.props.checkedStyle) {
                    thisStyle = this.props.checkedStyle;
                };
            } else {
                //if (this.props.uncheckedLabel) {
                //    thisLabel = this.props.uncheckedLabel;
                //};
                if (this.props.uncheckedClass) {
                    thisClass += " " + this.props.uncheckedClass;
                };
                if (this.props.uncheckedStyle) {
                    thisStyle = this.props.uncheckedStyle;
                };
            };
            thisStyle.margin = "0 auto";
            thisStyle.display = "inline-block";
            thisStyle.overflow = "hidden";

            let formGroupStyle: React.CSSProperties = EK.Global.assign(this.props.style, { marginBottom: 0 });
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div style={{ backgroundColor: "#fff", marginTop: 18 }}>
                    <div className={formGroupClass} style={formGroupStyle}>
                        <input
                            type="checkbox"
                            className={className}
                            id={formControlId}
                            name={formControlId}
                            checked={this.props.value}
                            onChange={this.onChange}
                            disabled={this.props.disabled}
                            ref="input" />
                    </div>
                    {this.props.children}
                </div>
            </Column>;
        }

        render(): JSX.Element {
            if (this.props.mode === Mode.normal) {
                return this.renderNormal();
            } else if (this.props.mode === Mode.line) {
                return this.renderLine();
            } else if (this.props.mode === Mode.iCheckBox) {
                return this.renderiCheckbox();
            }
        }
    }

    export class CheckBoxForm extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
            this.updateState = this.updateState.bind(this);
        };

        updateState(element: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;
            //
            if (this.props.index >= 0) {
                let aElement: IFormElement = Forms.getFormElement(idForm, { id: this.props.property });
                let aElementValue: any[] = global.getData(aElement.value);
                //
                if (aElementValue && aElementValue.length > 0) {

                    let nElementValue: any = aElementValue.map((value: any, index: number) => {
                        return global.assign(value);
                    });

                    let item: any = nElementValue[this.props.index];

                    if (item) {
                        item[this.props.id] = element.value;
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
                       // aElement.value.data = aElementValue;
                        //aElement.value.timestamp = aElement.value.timestamp + 1;
                        //Forms.updateFormElement(idForm, aElement);
                        Forms.updateFormElement(idForm, this.props.property, global.createSuccessfulStoreObject(nElementValue));

                    };
                };
            }
            else {
                //Forms.updateFormElement(idForm, element);
                Forms.updateFormElement(idForm, element, null);

            };
        };

        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            let index: any = this.props.index;
            if (idForm && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };

        componentWillReceiveProps(nextProps: ICheckBoxProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            let index: any = nextProps.index;
            if (idForm !== nextIdForm && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
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

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <CheckBox$ {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let CheckBox$Form: any = ReactRedux.connect(Forms.props, null)(CheckBoxForm);

    export class CheckBoxSM extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
        }

        static defaultProps: ICheckBoxProps = {
            checkedIcon: IconTypeEnum.check,
            disabled: false,
            id: "",
            label: "",
            helpLabel: "",
            value: false,
            style: {},
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.normal,
            uncheckedIcon: IconTypeEnum.cancel
        };

        refs: {
            input: Element;
            requiredPoint: Element;
        };

        onChange(e: any): any {
            let hasChanged: boolean = this.props.hasChanged;
            let currentValue: boolean = e.currentTarget.checked;
            let hasValidationError: boolean = false;

            if (!hasChanged && (currentValue !== this.props.initialValue)) {
                hasChanged = true;
            }

            if (!currentValue) {
                if (this.props.required) {
                    hasValidationError = true;
                }
            } else {
                //
            }

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: currentValue,
                    hasChanged: hasChanged,
                    initialValue: this.props.initialValue,
                    hasValidationError: hasValidationError
                });
            }
        }

        shouldComponentUpdate(nextProps: ICheckBoxProps, nextState: ICheckBoxProps): boolean {
            if (this.props.value !== nextProps.value ||
                this.props.hasChanged !== nextProps.hasChanged ||
                this.props.hasValidationError !== nextProps.hasValidationError) {
                return true;
            } else {
                return false;
            }
        }

        render(): JSX.Element {
            let formControlId: string = "formControl_" + this.props.id;
            let className: string = "toogle";
            let formGroupClass: string = "form-group";

            className += (this.props.disabled) ? " disabled" : "";

            // customize
            let thisLabel: string = this.props.label;
            let thisClass: string = "btn ";
            let thisStyle: React.CSSProperties = {};
            let parentStyle: React.CSSProperties = this.props.style;
            parentStyle.textAlign = this.props.textAlign;

            if (this.props.value) {
                if (this.props.checkedLabel) {
                    thisLabel = this.props.checkedLabel;
                };
                if (this.props.checkedClass) {
                    thisClass += " " + this.props.checkedClass;
                } else {
                    thisClass += " btn-default";
                };
                if (this.props.checkedStyle) {
                    thisStyle = this.props.checkedStyle;
                };
            } else {
                //if (this.props.uncheckedLabel) {
                //    thisLabel = this.props.uncheckedLabel;
                //};
                if (this.props.uncheckedClass) {
                    thisClass += " " + this.props.uncheckedClass;
                } else {
                    thisClass += " btn-default";
                };
                if (this.props.uncheckedStyle) {
                    thisStyle = this.props.uncheckedStyle;
                };
            };
            thisStyle.margin = "0 auto";
            thisStyle.display = "inline-block";
            thisStyle.overflow = "hidden";

            return <span data-toggle="buttons">
                <label data-toggle="buttons" className={thisClass}
                    style={{
                        fontSize: 12,
                        borderRadius: 12,
                        padding: "2px 7px",
                        textTransform: "uppercase"
                    }}><i className="fa fa-group"></i>
                    <input
                        type="checkbox"
                        className={className}
                        id={formControlId}
                        name={formControlId}
                        checked={this.props.value}
                        onChange={this.onChange}
                        disabled={this.props.disabled} />
                    <input type="checkbox" class="toggle" />
                    {thisLabel}
                </label>
            </span>;
        }
    }

    export class Status extends React.Component<ICheckBoxProps, ICheckBoxProps> { 
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "Estatus",
            size: [2, 2, 2, 2],
            label: "",
            helpLabel: "Estatus",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Activo",
            uncheckedLabel: "Inactivo",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class SPVPlanificacionNotificacion extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "NotificacionCorreo",
            size: [2,2, 2, 2],
            label: "",
            helpLabel: "Notificación Correo",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Notificación Correo",
            uncheckedLabel: "Notificación Correo",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class SPVPlanificacionConfirmacion extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "Confirmacion",
            size: [2, 2, 2, 2],
            label: "",
            helpLabel: "Confirmacion",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Confirmación",
            uncheckedLabel: "Sin Confirmación",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class SPVPlanificacionRecordatorio extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "Recordatorio",
            size: [2, 2, 2, 2],
            label: "",
            helpLabel: "Recordatorio",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Recordatorio",
            uncheckedLabel: "Recordatorio",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class Blocked extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "Bloqueado",
            label: "",
            helpLabel: "Estatus",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.line,
            checkedLabel: "Bloqueado",
            uncheckedLabel: "Desbloqueado",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class CheckBoxAutomatico extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "",
            label: "",
            helpLabel: "Automático",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.iCheckBox,
            required: false,
            checkedLabel: "Automático",
            checkedClass: "icheckbox_line-green",
            checkedIcon: "fa fa-check",
            uncheckedLabel: "Automático",
            uncheckedClass: "icheckbox_line-red",
            uncheckedIcon: "fa fa-ban",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        }
    }

    export class TipoVisualizacion extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "TipoVisualizacion",
            size: [2, 2, 2, 2],
            label: "",
            helpLabel: "Visualizacion",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            checkedLabel: "",
            checkedClass: "icheckbox_line-green",
            checkedIcon: "fas fa-lock",
            uncheckedLabel: "",
            uncheckedClass: "icheckbox_line-red",
            uncheckedIcon: "fas fa-globe-americas",
            mode: Mode.iCheckBox,
            required: false,
            isFormComponent: true
        };

        componentDidMount() {
            let variable: any;
        }

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class Privado extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "Privado",
            size: [2, 2, 2, 2],
            label: "",
            helpLabel: "Privado",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Privado",
            uncheckedLabel: "Público",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class CheckBoxInterno extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "",
            label: "",
            helpLabel: "Estatus",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            checkedLabel: "Interno",
            checkedClass: "bg-blue-sharp bg-font-blue-sharp",
            uncheckedLabel: "Interno",
            uncheckedClass: "bg-grey-salt bg-font-grey-salt"
        };

        componentDidMount() {
            let formControlId: string = "formControl_" + this.props.id;

            let style: string = "\
                    .md-checkbox label > .check {\
                        top: -4px;\
                        left: 6px;\
                        width: 10px;\
                        height: 20px;\
                        border: 4px solid #fff;\
                        border-top: none;\
                        border-left: none;\
                        opacity: 0;\
                        z-index: 5;\
                        -webkit-transform: rotate(180deg);\
                        -moz-transform: rotate(180deg);\
                        transform: rotate(180deg);\
                        -webkit-transition-delay: 0.3s;\
                        -moz-transition-delay: 0.3s;\
                        transition-delay: 0.3s;\
                    }\
                    .md-checkbox label > .box {\
                        top: 0px;\
                        border: 10px solid #fff;\
                        height: 20px;\
                        width: 20px;\
                        z-index: 5;\
                        -webkit-transition-delay: 0.2s;\
                        -moz-transition-delay: 0.2s;\
                        transition-delay: 0.2s;\
                    }\
                }\
                ";

            EK.Global.appendStyle("checkbox-white-style", style);
        }

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} mode={Mode.line} />
        }
    }

    export class CheckBoxImpresion extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "",
            label: "",
            helpLabel: "Impresion",
            value: undefined,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            checkedLabel: "",
            checkedClass: "",
            uncheckedLabel: "",
            uncheckedClass: ""
        };

        //componentDidMount() {
        //    let formControlId: string = "formControl_" + this.props.id;

        //    let style: string = "\
        //            .md-checkbox label > .check {\
        //                top: -2px;\
        //                left: 1px;\
        //                width: 8px;\
        //                height: 8px;\
        //                border: 1px solid #3399FF;\
        //                border-top: none;\
        //                border-left: none;\
        //                opacity: 0;\
        //                z-index: 5;\
        //            }\
        //            .md-checkbox label > .box {\
        //                top: 0px;\
        //                border: 1px solid #000;\
        //                height: 8px;\
        //                width: 8px;\
        //                left: 1px;\
        //                z-index: 5;\
        //            }\
        //        }\
        //        ";

        //    EK.Global.appendStyle("checkbox-black-style", style);
        //}

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} mode={Mode.line} />
        }
    }

    export class ViviendasEntregadas extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "ViviendasEntregadas",
            label: "",
            helpLabel: "Ver Viviendas Entregadas",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.line,
            checkedLabel: "Entregadas",
            uncheckedLabel: "Entregadas",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class SeleccionarTodos extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "SeleccionarTodos",
            label: "",
            helpLabel: "Seleccionar Todos",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.line,
            checkedLabel: "Seleccionar Todos",
            uncheckedLabel: "Seleccionar Todos",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class Todos extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "Todos",
            label: "Todos",
            helpLabel: "Todos",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.line,
            checkedLabel: "Todos",
            uncheckedLabel: "Todos",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class VerViviendaEntrada extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "VerViviendaEntregada",
            label: "Ver Vivienda Entregada",
            helpLabel: "Ver Vivienda Entregada",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.line,
            checkedLabel: "Ver Vivienda Entregada",
            uncheckedLabel: "Ver Vivienda Entregada",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export class SinProgramar extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "SinProgramar",
            label: "Sin Programar",
            helpLabel: "Sin Programar",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            mode: Mode.line,
            checkedLabel: "Sin Programar",
            uncheckedLabel: "Sin Programar",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        };
    };

    export interface ICustomStyle extends React.Props<any> {
        id: string;
    };

    export class CustomStyle extends React.Component<ICustomStyle, {}>{
        shouldComponentUpdate(nextProps: ICheckBoxProps, nextState: ICheckBoxProps): boolean {
            return true;
        };

        render() {
            let styleElement: any = $("#" + this.props.id);

            // only render if not exists
            // return (styleElement && styleElement.size() > 0) ? null : <style id={this.props.id}>{this.props.children}</style>
            return <style>{this.props.children}</style>
        };
    };

    export class CheckBoxStatusUbicacion extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        static defaultProps: ICheckBoxProps = {
            id: "EstatusUbicacion",
            label: "",
            helpLabel: "EstatusUbicacion",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Disponible",
            uncheckedLabel: "No Disponible",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        }
    }

    export class CheckBoxRevisarReporte extends React.Component<ICheckBoxProps, ICheckBoxProps> {
        constructor(props: ICheckBoxProps) {
            super(props);
        }
        static defaultProps: ICheckBoxProps = {
            id: "RevisarReporte",
            size: [2, 2, 2, 2],
            label: "",
            helpLabel: "RevisarReporte",
            value: false,
            initialValue: false,
            hasChanged: false,
            hasValidationError: false,
            mode: Mode.line,
            required: false,
            checkedLabel: "Revisado",
            uncheckedLabel: "Revisar Reporte",
            isFormComponent: true
        };

        render(): JSX.Element {
            return <CheckBox$Form {...this.props} />
        }
    }
    export const CheckBox = EK.UX.CheckBoxes.CheckBox$Form;
}

import checkBox = EK.UX.CheckBoxes;

import CheckBox = EK.UX.CheckBoxes.CheckBox$Form;
import CheckBoxStatus = EK.UX.CheckBoxes.Status;
import CheckBoxBlocked = EK.UX.CheckBoxes.Blocked;
import CheckBoxInterno = EK.UX.CheckBoxes.CheckBoxInterno;
import CheckBoxAutomatico = EK.UX.CheckBoxes.CheckBoxAutomatico;
import TipoVisualizacion = EK.UX.CheckBoxes.TipoVisualizacion;
import CheckBoxStatusUbicacion = EK.UX.CheckBoxes.CheckBoxStatusUbicacion;
import CheckBoxRevisarReporte = EK.UX.CheckBoxes.CheckBoxRevisarReporte;

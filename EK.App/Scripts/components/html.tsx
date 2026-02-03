//namespace EK.UX {
//    "use strict";

//    interface IInputHtmlProps extends React.Props<any>, EK.UX.IColumn, EK.UX.IFormElement {
//        floatingLabel?: boolean;
//        helpLabel?: string;
//        icon?: string;
//        label?: string;
//        mask?: string;
//        maxLength?: number;
//        placeHolder?: string;
//        required?: boolean;
//        style?: React.CSSProperties;
//        visible?: boolean | Function;
//        change?: (value: any) => void
//    };

//    export class InputHtml extends React.Component<IInputHtmlProps, IInputHtmlProps> {
//        constructor(props: IInputHtmlProps) {
//            super(props);

//            this.onChange = this.onChange.bind(this);
//            this.onBlur = this.onBlur.bind(this);
//            this.getInputValue = this.getInputValue.bind(this);
//            this.updateState = this.updateState.bind(this);

//            if (!props.updateState) {
//                this.state = {
//                    id: props.id,
//                    value: props.value,
//                    initialValue: props.value,
//                    hasChanged: props.hasChanged,
//                    validations: props.validations
//                };
//            }
//        }

//        static defaultProps: IInputHtmlProps = {
//            id: "",
//            label: "",
//            floatingLabel: true,
//            helpLabel: "",
//            value: undefined,
//            initialValue: undefined,
//            hasChanged: false,
//            hasValidationError: false,
//            required: false,
//            visible: true
//        };

//        refs: {
//            requiredPoint: Element;
//            input: Element;
//        };

//        inputHtmlInit(): void {
//            let input: any = $(this.refs.input);

//            input.wysihtml5();
//        };

//        inputHtmlInitDestroy(): void {

//        };

//        getInputValue(): string {
//            let input: any = $(this.refs.input);
//            let retValue: string;

//            if (this.props.mask) {
//                retValue = input.inputmask('unmaskedvalue');
//            } else {
//                retValue = input.val();
//            }
//            return retValue;
//        };

//        updateState(): void {
//            let currentValue: string = this.getInputValue();
//            let hasChanged: boolean = this.props.hasChanged;

//            if (!hasChanged && (currentValue !== this.props.initialValue)) {
//                hasChanged = true;
//            };

//            if (this.props.updateState) {
//                this.props.updateState({
//                    id: this.props.id,
//                    value: currentValue,
//                    initialValue: this.props.initialValue,
//                    hasChanged: hasChanged,
//                    validations: this.props.validations
//                });
//            } else {
//                this.setState({
//                    id: this.props.id,
//                    value: currentValue,
//                    initialValue: this.props.initialValue,
//                    hasChanged: hasChanged,
//                    validations: this.props.validations
//                });
//            };

//            if (this.props.change) {
//                this.props.change(currentValue);
//            }
//        };

//        onChange(e: any): any {
//            this.updateState();
//        };

//        onBlur(e: any): any {
//            this.updateState();
//        }

//        componentDidMount(): void {
//            if (this.props.mask) {
//                let input: any = $(this.refs.input);

//                input.inputmask("mask", { "mask": this.props.mask });
//            }
//        }

//        componentWillUpdate(nextProps: IInputHtmlProps, nextState: IInputHtmlProps): void {
//            let input: any = $(this.refs.input);

//            if (input.size() > 0) {
//                input.inputmask('remove');
//            }
//        }

//        componentDidUpdate(prevProps: IInputHtmlProps, prevState: IInputHtmlProps): void {
//            if (this.props.mask) {
//                let input: any = $(this.refs.input);

//                input.inputmask("mask", { "mask": this.props.mask });
//            }
//        }

//        shouldComponentUpdate(nextProps: IInputHtmlProps, nextState: IInputHtmlProps): boolean {
//            let thisProps: IInputHtmlProps = this.props.updateState ? this.props : this.state;
//            let thisNextProps: IInputHtmlProps = this.props.updateState ? nextProps : nextState;

//            if (thisProps.value !== thisNextProps.value ||
//                thisProps.hasChanged !== thisNextProps.hasChanged ||
//                thisProps.hasValidationError !== thisNextProps.hasValidationError) {
//                return true;
//            } else {
//                return false;
//            }
//        }

//        render(): JSX.Element {
//            let thisProps: IInputHtmlProps = this.props.updateState ? this.props : this.state;

//            if (!this.props.visible) {
//                return null;
//            }
//            let formControlId: string = "formControl_" + this.props.id;
//            let className: string = "form-control input-sm";
//            let formGroupClass: string = "form-group form-md-line-input";
//            let inputValue: string = thisProps.value ? thisProps.value : "";

//            let requiredPoint: any = "";
//            let requiredElement: any = "";

//            if (this.props.floatingLabel) {
//                formGroupClass += " form-md-floating-label";
//            }

//            if (this.props.required) {
//                requiredElement = <span className="badge badge-danger">&nbsp;requerido&nbsp;</span>;
//            }

//            if (thisProps.hasValidationError) {
//                formGroupClass += " has-error";
//                requiredPoint = <span
//                    className="badge badge-danger tooltips"
//                    data-container="body"
//                    data-placement="right"
//                    data-original-title={this.props.helpLabel}>*</span>;
//            }

//            if (thisProps.value && thisProps.value !== "") {
//                className += " edited";
//            }

//            let requiresAddOn: boolean = (this.props.mask === undefined && this.props.maxLength !== undefined) || (this.props.icon !== undefined);
//            let maxLength: number = !this.props.mask && this.props.maxLength ? this.props.maxLength : undefined;

//            return <EK.UX.Column
//                size={this.props.size}
//                lg={this.props.lg}
//                md={this.props.md}
//                sm={this.props.sm}
//                xs={this.props.xs}>
//                {requiresAddOn
//                    ? <div className={formGroupClass} style={this.props.style}>
//                        <div className="input-group right-addon">
//                            <input
//                                type="text"
//                                className={className}
//                                id={formControlId}
//                                name={formControlId}
//                                value={inputValue}
//                                onChange={this.onChange}
//                                onBlur={this.onBlur}
//                                placeholder={this.props.placeHolder}
//                                ref="input"
//                                style={{ fontSize: 12 }}
//                                maxLength={maxLength} />
//                            {maxLength !== undefined ? <span className="input-group-addon" style={{ fontSize: 10 }}>{inputValue.length}/{this.props.maxLength}</span> : null}
//                            {this.props.icon !== undefined ? <span className="input-group-addon"><Icon icon={this.props.icon} /></span> : null}
//                            <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}>
//                                <span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span>
//                            </label>
//                        </div>
//                    </div>
//                    : <div className={formGroupClass} >
//                        <input
//                            type="text"
//                            className={className}
//                            id={formControlId}
//                            name={formControlId}
//                            value={inputValue}
//                            onChange={this.onChange}
//                            onBlur={this.onBlur}
//                            placeholder={this.props.placeHolder}
//                            style={{ fontSize: 12 }}
//                            ref="input"
//                            />
//                        <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}><span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span></label>
//                    </div>
//                }
//            </EK.UX.Column>;
//        }
//    }
//}

//import InputHtml = EK.UX.InputHtml;
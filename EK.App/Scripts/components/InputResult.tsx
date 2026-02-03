// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX {
    "use strict";

    export interface IInputResultProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        label?: string;
        helpLabel?: string;
        style?: React.CSSProperties;
        icon?: string;
        itemFormatter?: (item: any, container?: any) => any;
        buttonClick?: (btn: any, input: any, props: IInputResultProps) => void;
    };

    class InputResult extends React.Component<IInputResultProps, IInputResultProps>{
        constructor(props: IInputResultProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.getInputValue = this.getInputValue.bind(this);
            this.updateState = this.updateState.bind(this);
        };

        private requiredPoint: Element;
        private input: Element;

        static defaultProps: IInputResultProps = {
            id: "",
            label: "",
            icon: "fa fa-search",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            isFormComponent: true
        };
        getInputValue(): any {
            return $(this.input).val();
        };
        updateState(validateAsync: boolean): void {
            let currentValue: string = this.getInputValue();
            let hasChanged: boolean = this.props.hasChanged;

            if (!hasChanged && (currentValue !== this.props.initialValue)) {
                hasChanged = true;
            }

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
            }
        };
        onChange(e: any): void {
            this.updateState(false);
        };
        onBlur(e: any): any {
            this.updateState(true);
        };
        shouldComponentUpdate(nextProps: IInputResultProps, nextState: IInputResultProps): boolean {
            let thisProps: IInputResultProps = this.props.updateState ? this.props : this.state;
            let thisNextProps: IInputResultProps = this.props.updateState ? nextProps : nextState;

            if (thisProps.value !== thisNextProps.value ||
                thisProps.hasChanged !== thisNextProps.hasChanged ||
                thisProps.hasValidationError !== thisNextProps.hasValidationError ||
                thisProps.validate !== thisNextProps.validate) {
                return true;
            }

            return false;
        };
        render(): JSX.Element {
            let thisProps: IInputResultProps = this.props.updateState ? this.props : this.state;
            let formControlId: string = "formControl_" + this.props.id;
            let className: string = this.props.className + " form-control";
            let formGroupClass: string = "form-group";
            let inputValue: string = thisProps.value ? thisProps.value : "";
            if (thisProps.value && thisProps.value !== "") {
                className += " edited";
            };

            let onClick: any = () => {
                let jqId: string = "#" + formControlId;
                if (this.props.buttonClick) {
                    this.props.buttonClick($(jqId).parent().find("button"), $(jqId), this.props);
                }
            };

            let itemValue: any;

            if (this.props.itemFormatter === undefined || this.props.itemFormatter === null) {
                itemValue = "";
            } else {
                itemValue = this.props.itemFormatter(inputValue);
            };

            let required: boolean = false;
            let requiredPoint: any = "";
            let hasValidations: boolean = false;

            if (this.props.validations && this.props.validations.length > 0) {
                hasValidations = true;
                for (var i = 0; i < this.props.validations.length; i++) {
                    if (this.props.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            };

            if (this.props.hasValidationError === true) {
                formGroupClass += " has-error";
                requiredPoint = [
                    hasValidations ? <i key="key-check" className="fa fa-exclamation"></i> : null,
                    required ? <i key="key-ast" className="fa fa-asterisk"></i> : null
                ];
            } else {
                if (hasValidations) {
                    formGroupClass += " has-success";
                    requiredPoint = [
                        hasValidations ? <i key="key-check" className="fa fa-check"></i> : null,
                        required ? <i key="key-ast" className="fa fa-asterisk"></i> : null
                    ];
                };
            };

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <FadeInColumn>
                    <div className={formGroupClass} style={this.props.style}>
                        <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 11 }}>
                            <span ref={(e) => { this.requiredPoint = e } }>{this.props.label}&nbsp;{requiredPoint}</span>
                        </label>
                        <div className="input-group">
                            <input type="hidden" ref={(e) => { this.input = e } } className={className} id={formControlId} name={formControlId} value={inputValue} onChange={this.onChange} onBlur={this.onBlur} />
                            <div className="input-group select2-bootstrap-prepend">
                                <span className="select2 select2-container select2-container--bootstrap select2-container--above select2-container--focus" dir="ltr">
                                    <span className="selection">
                                        <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-single-prepend-text-container">
                                            <span className="select2-selection__rendered" id="select2-single-prepend-text-container" title="B">
                                                <span dangerouslySetInnerHTML={{ __html: itemValue }}></span>
                                            </span>
                                        </span>
                                    </span>
                                    <span className="dropdown-wrapper" aria-hidden="true"></span>
                                </span>
                            </div>
                            <span className="input-group-btn">
                                <button className="btn btn-success btn-sm" type="button" onClick={onClick}>
                                    <Icon icon={this.props.icon} style={{ color: "#ffffff" }} />
                                </button>
                            </span>
                        </div>
                    </div>
                </FadeInColumn>
            </Column>
        };
    };

    class InputResultForm extends React.Component<IInputResultProps, IInputResultProps> {
        constructor(props: IInputResultProps) {
            super(props);
            this.updateState = this.updateState.bind(this);
        };
        updateState(element: any, validateAsync: boolean): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;

            Forms.updateFormElement(idForm, element, null, validateAsync);
        };
        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };
        componentWillReceiveProps(nextProps: IInputResultProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
            };
        };
        render(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <InputResult {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };
    export const InputResult$Form: any = ReactRedux.connect(Forms.props, null)(InputResultForm);
}

import InputResult = EK.UX.InputResult$Form;
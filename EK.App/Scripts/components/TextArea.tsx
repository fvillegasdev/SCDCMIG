/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    interface ITextAreaProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        floatingLabel?: boolean;
        helpLabel?: string;
        icon?: string;
        label?: string;
        mask?: string;
        maxLength?: number;
        placeHolder?: string;
        required?: boolean;
        style?: React.CSSProperties;
        visible?: boolean | Function;
        change?: (value: any) => void;
        rowSpan?: number;
        rows?: number;
    };

    export class TextArea extends React.Component<ITextAreaProps, ITextAreaProps> {
        constructor(props: ITextAreaProps) {
            super(props);

            this.onChange = this.onChange.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.getInputValue = this.getInputValue.bind(this);
            this.updateState = this.updateState.bind(this);

            if (!props.updateState) {
                this.state = {
                    id: props.id,
                    value: props.value,
                    initialValue: props.value,
                    hasChanged: props.hasChanged,
                    validations: props.validations,
                    isFormComponent: true
                };
            }
        }

        static defaultProps: ITextAreaProps = {
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
            rowSpan: 3,
            rows: 4,
            isFormComponent: true
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

        updateState(): void {
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
                });
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
            this.updateState();
        };

        onBlur(e: any): any {
            this.updateState();
        }

        componentDidMount(): void {
            if (this.props.mask) {
                let input: any = $(this.refs.input);

                input.inputmask("mask", { "mask": this.props.mask });
            }
        }

        componentWillUpdate(nextProps: ITextAreaProps, nextState: ITextAreaProps): void {
            let input: any = $(this.refs.input);

            if (input.size() > 0) {
                input.inputmask('remove');
            }
        }

        componentDidUpdate(prevProps: ITextAreaProps, prevState: ITextAreaProps): void {
            if (this.props.mask) {
                let input: any = $(this.refs.input);

                input.inputmask("mask", { "mask": this.props.mask });
            }
        }

        shouldComponentUpdate(nextProps: ITextAreaProps, nextState: ITextAreaProps): boolean {
            let thisProps: ITextAreaProps = this.props.updateState ? this.props : this.state;
            let thisNextProps: ITextAreaProps = this.props.updateState ? nextProps : nextState;

            if (thisProps.value !== thisNextProps.value ||
                thisProps.hasChanged !== thisNextProps.hasChanged ||
                thisProps.hasValidationError !== thisNextProps.hasValidationError) {
                return true;
            } else {
                return false;
            }
        }

        render(): JSX.Element {
            let thisProps: ITextAreaProps = this.props.updateState ? this.props : this.state;

            if (!this.props.visible) {
                return null;
            }
            let formControlId: string = "formControl_" + this.props.id;
            let className: string = "form-control";
            let formGroupClass: string = "form-group";
            let inputValue: string = thisProps.value ? thisProps.value : "";

            let requiredPoint: any = "";
            let requiredElement: any = "";

            if (this.props.floatingLabel) {
                formGroupClass += " form-md-floating-label";
            }

            if (this.props.required) {
                requiredElement = <span className="badge badge-danger">&nbsp;requerido&nbsp;</span>;
            }

            if (thisProps.hasValidationError) {
                formGroupClass += " has-error";
                requiredPoint = <span
                    className="badge badge-danger tooltips"
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>*</span>;
            }

            if (thisProps.value && thisProps.value !== "") {
                className += " edited";
            }

            let requiresAddOn: boolean = (this.props.mask === undefined && this.props.maxLength !== undefined) || (this.props.icon !== undefined);
            let maxLength: number = !this.props.mask && this.props.maxLength ? this.props.maxLength : undefined;

            return <grid.Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs} >
                {requiresAddOn
                    ? <div className={formGroupClass} style={this.props.style}>
                        <div className="input-group right-addon">
                            <textarea rowSpan={this.props.rowSpan}
                                className={className}
                                id={formControlId}
                                name={formControlId}
                                value={inputValue}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                rows={this.props.rows}
                                placeholder={this.props.placeHolder}
                                maxLength={maxLength}
                                style={{ fontSize: 12 }}
                                ref="input" />
                            {maxLength !== undefined ? <span className="input-group-addon" style={{ fontSize: 10 }}>{inputValue.length}/{this.props.maxLength}</span> : null}
                            {this.props.icon !== undefined ? <span className="input-group-addon"><Icon icon={this.props.icon} /></span> : null}
                            <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}>
                                <span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span>
                            </label>
                        </div>
                    </div>
                    : <div className={formGroupClass} >
                        <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}><span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span></label>
                        <textarea rowSpan={this.props.rowSpan}
                            className={className}
                            id={formControlId}
                            name={formControlId}
                            value={inputValue}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            rows={this.props.rows}
                            placeholder={this.props.placeHolder}
                            maxLength={maxLength}
                            style={{ fontSize: 12 }}
                            ref="input" />
                    </div>
                }
            </grid.Column>;
        }
    }

    export class TextAreaForm extends React.Component<ITextAreaProps, ITextAreaProps> {
        constructor(props: ITextAreaProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
        };

        updateState(element: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;

            Forms.updateFormElement(idForm, element);
        };

        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };

        componentWillReceiveProps(nextProps: ITextAreaProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
            };
        };

        render(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any = Forms.getFormElement(idForm, this.props);

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <TextArea {...this.props} {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let TextArea$Form: any = ReactRedux.connect(Forms.props, null)(TextAreaForm);
}

import TextArea = EK.UX.TextArea$Form;

// div input-group right-addon
// <span class="input-group-addon" style="font-size: 12px;">(0/99)</span>
// <div className="help-block">{requiredElement}&nbsp;{this.props.helpLabel}</div>
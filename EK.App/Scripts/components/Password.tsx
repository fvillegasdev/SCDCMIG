/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    interface IPasswordProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        label: string;
        helpLabel?: string;
        required?: boolean;
        visible?: boolean | Function;
    }

    export class Password extends React.Component<IPasswordProps, IPasswordProps> {
        constructor(props: IPasswordProps) {
            super(props);

            this.onChange = this.onChange.bind(this);
            this.onBlur = this.onBlur.bind(this);
        }

        static defaultProps: IPasswordProps = {
            id: "",
            label: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            visible: true,
            isFormComponent: true
        };

        refs: {
            requiredPoint: Element;
        };

        onChange(e: any): any {
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: e.currentTarget.value,
                    initialValue: this.props.initialValue,
                    hasChanged: this.props.hasChanged,
                    hasValidationError: this.props.hasValidationError
                });
            }
        }
        
        onBlur(e: any): any {
            let currentValue: string = $.trim(e.currentTarget.value);
            let hasChanged: boolean = this.props.hasChanged;
            let hasValidationError: boolean = false;

            if (!hasChanged && (currentValue !== this.props.initialValue)) {
                hasChanged = true;
            }

            // if (hasChanged) {
            if (currentValue === "") {
                if (this.props.required) {
                    hasValidationError = true;
                }
            } else {
                //
            }
            // }

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: currentValue,
                    initialValue: this.props.initialValue,
                    hasChanged: hasChanged,
                    hasValidationError: hasValidationError
                });
            }
        }

        shouldComponentUpdate(nextProps: IPasswordProps, nextState: IPasswordProps): boolean {
            if (this.props.value !== nextProps.value ||
                this.props.hasChanged !== nextProps.hasChanged ||
                this.props.hasValidationError !== nextProps.hasValidationError) {
                return true;
            } else {
                return false;
            }
        }

        render(): JSX.Element {
            if (!this.props.visible) {
                return null;
            }
            let formControlId: string;
            let className: string = "form-control input-sm";
            let formGroupClass: string = "form-group form-md-line-input form-md-floating-label";

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
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

            if (this.props.value && this.props.value !== "") {
                className += " edited";
            }

            return <grid.Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className={formGroupClass} >
                    <input
                        type="password"
                        className={className}
                        id={formControlId}
                        name={formControlId}
                        value={this.props.value ? this.props.value : ""}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        ref="Password"
                        />
                    <label htmlFor={formControlId}><span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span></label>
                    <div className="help-block">{requiredElement}&nbsp;{this.props.helpLabel}</div>
                </div>
            </grid.Column>;
        }
    }
}
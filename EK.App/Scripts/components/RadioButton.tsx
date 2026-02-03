/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    export interface IOption {
        value: string;
        checked: boolean;
        title: string;
    }

    interface IRadioButtonProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        groupName: string;
        radios: IOption[];
        label?: string;
        helpLabel?: string;
        required: boolean;
        styleDiv?: any;
        onChangeEvent?: Function;
        info?: any;
        change?: (value: any) => void;
    }

    /* Estatus del Componente */
    interface IRadioButtonListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class RadioButton extends React.Component<IRadioButtonProps, IRadioButtonListState> {
        constructor(props: IRadioButtonProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
            this.state = {
                initialValue: props.initialValue,
                currentValue: props.value
            };
        }

        static defaultProps: IRadioButtonProps = {
            id: "",
            groupName: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            radios: [],
            required: false,
            info: {
                data: {},
                timestamp: -1,
                status: -1
            },
            isFormComponent: true
        };

        onChange(e: any): any {
            let currentValue: string = $.trim(e.currentTarget.id);
            let hasChanged: boolean = this.props.hasChanged;
            let hasValidationError: boolean = false;

            if (!hasChanged && (currentValue !== this.props.initialValue)) {
                hasChanged = true;
            }

            if (hasChanged) {
                if (currentValue === "") {
                    if (this.props.required) {
                        hasValidationError = true;
                    }
                } else {
                    if (this.props.onChangeEvent) {
                        this.props.onChangeEvent(this.props.info);
                    }
                }
            };

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.groupName,
                    value: currentValue,
                    initialValue: this.props.initialValue,
                    hasChanged: hasChanged,
                    hasValidationError: this.props.hasValidationError
                });
            };

            if (this.props.change) {
                this.props.change(currentValue);
            };
        };


        shouldComponentUpdate(nextProps: IRadioButtonProps, nextState: IRadioButtonProps): boolean {
            return true;
        }


        render(): JSX.Element {
            let formControlId: string;
            let className: string = "radio-inline";
            let formGroupClass: string = "form-group";

            //className += (this.props.disabled) ? " disabled" : "";

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
            };

            let required: boolean = false;
            let requiredPoint: any = "";

            if (this.props.validations && this.props.validations.length > 0) {
                for (var i = 0; i < this.props.validations.length; i++) {
                    if (this.props.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            }

            if (this.props.hasValidationError === true && this.props.validate === true) {
                formGroupClass += " has-error";
                requiredPoint = <span
                    className="required-char"
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>*</span>;
            } else {
                if (required) {
                    requiredPoint = <span
                        className="required-char-nv"
                        data-container="body"
                        data-placement="right"
                        data-original-title={this.props.helpLabel}>*</span>
                };
            };

            if (this.props.value && this.props.value !== "") {
                className += " edited";
            }
           
            this.props.radios.forEach((item, i: number) => {
                if (item.value == this.props.value)
                {
                    item.checked = true;

                }
            });
            let checked: boolean = this.props.value === this.props.id;
            var options = [];

            if (this.props.radios !== undefined && this.props.radios.length > 0) {
                this.props.radios.forEach((item, i: number) => {
                    options.push(

                        <div id={"divRadio" + item.title} className="mt-radio-inline" style={{ display: "inline-block", marginRight: "20px" }} key={'divRadio' + i.toString()}>
                            <label className="mt-radio" key={'lbloption' + i}>
                                <input type="radio"
                                    id={'option' + i.toString()}
                                    name={this.props.groupName}
                                    value={item.value}
                                    defaultChecked={item.checked}
                                    key={'option' + i.toString()}
                                    onChange={this.onChange} />
                                {item.title}
                                <span></span>
                            </label>
                        </div>
                    );
                });

                return <grid.Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <div className={formGroupClass} key={"divSetRadio"} id={"divSetRadio"}>
                        <div className="icheck-inline">
                            <label className="col-sm-2 control-label">{this.props.label}</label>
                            {options !== null ? options : ""}
                        </div>
                    </div>
                </grid.Column>;
            } else {
                return <grid.Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <div className="md-radio">
                        <input type="radio" id={this.props.id} name={this.props.groupName} className="md-radiobtn"
                            checked={checked} onChange={this.onChange} />
                        <label htmlFor={this.props.id}>
                            <span className="inc"></span>
                            <span className="check"></span>
                            <span className="box"></span> {this.props.label}
                            <span ref="requiredPoint">{requiredPoint}</span>
                        </label>
                    </div>
                </grid.Column>;
            };
        }
    }

    export class RadioButtonForm extends React.Component<IRadioButtonProps, IRadioButtonListState> {
        constructor(props: IRadioButtonProps) {
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
                let props: IRadioButtonProps = EK.Global.assign({}, this.props);
                props.id = props.groupName;

                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, props));
            };
        };

        componentWillReceiveProps(nextProps: IRadioButtonProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                let props: IRadioButtonProps = EK.Global.assign({}, nextProps);
                props.id = props.groupName;

                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, props));
            };
        };

        render(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let props: IRadioButtonProps = EK.Global.assign({}, this.props);
                props.id = props.groupName;

                let element: any = Forms.getFormElement(idForm, props);

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <RadioButton {...this.props} {...element} id={this.props.id} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let RadioButton$Form: any = ReactRedux.connect(Forms.props, null)(RadioButtonForm);
    
};
import RadioButton = EK.UX.RadioButton$Form;
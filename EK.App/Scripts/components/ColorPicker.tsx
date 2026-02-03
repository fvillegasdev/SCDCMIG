namespace EK.UX.ColorPicker {
    interface IColorPicker extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        label?: string;
        helpLabel?: string;
        required?: boolean;
        style?: React.CSSProperties;
        visible?: boolean | Function;
        change?: (value: any) => void;
        value?: any;
    }

    export let ColorPicker: any = global.connect(class extends React.Component<IColorPicker, {}> {
        constructor(props: IColorPicker) {
            super(props);
            this.onMiniColorsInit = this.onMiniColorsInit.bind(this);
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
                    validations: props.validations
                };
            };
        };

        refs: {

            input: Element;
        };
        static defaultProps: IColorPicker = {
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
        onMiniColorsInit(): void {
            let input: any = $(this.refs.input);
            input.minicolors();
        };
        componentDidMount(): void {
            this.onMiniColorsInit();
        }
        onClick(): void {
            this.onMiniColorsInit();
        }
        getInputValue(): string {
            let input: any = $(this.refs.input);
            let retValue: string;

            retValue = input.val();
            
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
        initInput(): void {
            let input: any = $(this.refs.input);
        };
        componentDidUpdate(prevProps: IColorPicker, prevState: IColorPicker): void {
            this.initInput();
        };
        shouldComponentUpdate(nextProps: IColorPicker, nextState: IColorPicker): boolean {
            let thisProps: IColorPicker = this.props.updateState ? this.props : this.state;
            let thisNextProps: IColorPicker = this.props.updateState ? nextProps : nextState;

            if (thisProps.value !== thisNextProps.value ||
                thisProps.hasChanged !== thisNextProps.hasChanged ||
                thisProps.hasValidationError !== thisNextProps.hasValidationError ||
                thisProps.validate !== thisNextProps.validate) {
                return true;
            } else {
                return false;
            }
        }
        render(): JSX.Element {
            let formGroupClass: string = "form-group";
            let formControlId: string = "formControl_" + this.props.id;
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>

                <div className={formGroupClass}>
                    <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}>
                        <span ref="requiredPoint">{this.props.label}</span>
                    </label>
                    <div className="minicolors minicolors-theme-bootstrap minicolors-position-bottom minicolors-position-left minicolors-focus">
                        <input ref="input" type="text" id={formControlId} className="form-control demo minicolors-input" value={this.props.value} onChange={this.onChange} onBlur={this.onBlur} data-control="hue" style={{ height: "34px", width: "120%" }} />
                        <div className="minicolors-panel minicolors-slider-hue" style={{ display: "none" }}>
                            <div className="minicolors-slider minicolors-sprite">
                                <div className="minicolors-picker" style={{ top: "47.9167px" }}>
                                </div>
                            </div>
                            <div className="minicolors-opacity-slider minicolors-sprite">
                                <div className="minicolors-picker">
                                </div>
                            </div>
                            <div className="minicolors-grid minicolors-sprite" style={{ backgroundColor: "rgb(21, 0, 255)" }}>
                                <div className="minicolors-grid-inner">
                                </div>
                                <div className="minicolors-picker" style={{ top: "91px", left: "55px" }}>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Column>
        }
    });

    class ColorPickerForm extends React.Component<IColorPicker, IColorPicker> {
        constructor(props: IColorPicker) {
            super(props);

            this.updateState = this.updateState.bind(this);
        };
        static defaultProps: IColorPicker = {
            id: "Color",
            size: [9, 2, 2, 2]
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
        componentWillReceiveProps(nextProps: IColorPicker) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
            };
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <ColorPicker {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;



            };
        };

    };

    export let ColorPicker$Form: any = ReactRedux.connect(Forms.props, null)(ColorPickerForm);
};

import ColorInput = EK.UX.ColorPicker.ColorPicker$Form;



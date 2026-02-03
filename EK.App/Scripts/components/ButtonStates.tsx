namespace EK.UX.Buttons
{
    export interface IButtonState {
        text: string;
        value: any;
        selectedStyle?: React.CSSProperties;
        selectedClass?: string;
        width?: string;
    };
    export interface IButtonStatesProps extends React.Props<any>, grid.IColumnProps, EK.UX.IFormElement {
        label?: string;
        defaultState?: any;
        onValue?: any;
        offValue?: any;
        noneValue?: any;
        states?: IButtonState[];
        helpLabel?: string;
        disabled?: boolean;
        change?: (item: any) => void;
        config?: page.IPageConfig;
    };
    class ButtonStates$Base extends React.Component<IButtonStatesProps, IButtonStatesProps> {
        constructor(props: IButtonStatesProps) {
            super(props);

            this.onChange = this.onChange.bind(this);
            this.handleOnChange = this.handleOnChange.bind(this);
        };

        static defaultProps: IButtonStatesProps = {
            id: "",
            label: "",
            helpLabel: "",
            value: false,
            style: {},
            hasChanged: false,
            hasValidationError: false,
            disabled: false,
            isFormComponent: true
        };

        refs: {
            input: Element;
            requiredPoint: Element;
        };
        onChange(value: any): any {
            this.handleOnChange(value);

            if (this.props.change != undefined) {
                this.props.change(value);
            };
            console.log(this.props)
        };
        handleOnChange(value: boolean): void {
            let hasChanged: boolean = this.props.hasChanged;
            let hasValidationError: boolean = false;

            if (!hasChanged && (value !== this.props.initialValue)) {
                hasChanged = true;
            };

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
        componentDidMount(): void {
            //Forms.updateFormElement(this.props.idFormSection, this.props.id, this.props.defaultState);
        };
        componentDidUpdate(): void {
        }

        componentWillUnmount(): void {
        }

        componentWillUpdate(nextProps: IButtonStatesProps, nextState: IButtonStatesProps) {
        }

        shouldComponentUpdate(nextProps: IButtonStatesProps, nextState: IButtonStatesProps): boolean {
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
            let className: string = "md-check";

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={{ marginBottom: 15 }}
                >
                <div style={{ padding: 5, fontWeight: "bolder", fontSize: 11, textTransform: "uppercase" }}>{this.props.label}</div>
                <div id={formControlId} className="btn-group btn-group" data-toggle="buttons" style={{ width: "100%" }}>
                    {this.props.states.map((button: IButtonState, index: number) => {
                        // active
                        let className: string = "btn white";
                        let style: React.CSSProperties = this.props.style;

                        if (this.props.value === button.value) {
                            className = "btn white active";
                            if (button.selectedStyle) {
                                style = button.selectedStyle;
                            };
                        }
                        else {
                            style = { border: "none" };
                        }

                        if (button.width) {
                            style.width = button.width;
                        } else {
                            style.width = "33%";
                        }

                        return <div key={index} className={className} style={style} onClick={() => this.onChange(button.value)}>
                            {button.text}
                        </div>;
                    })}
                </div>
            </Column>;
        }
    }
    export class ButtonStatesForm extends React.Component<IButtonStatesProps, IButtonStatesProps> {
        constructor(props: IButtonStatesProps) {
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

        componentWillReceiveProps(nextProps: IButtonStatesProps) {
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

                return <ButtonStates$Base {...this.props} {...element} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };
    export let ButtonStates: any = ReactRedux.connect(Forms.props, null)(ButtonStatesForm);
    export const BooleanFilter: any = global.connect(class extends React.Component<IButtonStatesProps, {}> {
        constructor(props: IButtonStatesProps) {
            super(props);

            this.getML = this.getML.bind(this);
        };
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        //
        static defaultProps: IButtonStatesProps = {
            onValue: 1,
            offValue: -1,
            noneValue: 0
        };
        getML(): any {
            let id: string = this.props.id;
            let config: page.IPageConfig = this.props.config;
            let retValue: any;

            try {
                retValue = $ml[config.id].filters[id];
                if (!retValue) {
                    retValue = {};
                };
            }
            catch (e) {
                retValue = {};
            };

            return retValue;
        };
        render(): JSX.Element {
            let ml: any = this.getML();

            return <buttons.ButtonStates {...this.props} label={ml.Label} id={this.props.id} value={this.props.defaultState} states={[
                { text: ml.On, value: this.props.onValue, selectedStyle: { color: "#fff", backgroundColor: "#66BB6A", border: "none" } },
                { text: ml.None, value: this.props.noneValue, selectedStyle: { color: "#fff", backgroundColor: "#E0E0E0", border: "none" } },
                { text: ml.Off, value: this.props.offValue, selectedStyle: { color: "#fff", backgroundColor: "#DD2C00", border: "none" } }
            ]} />;
        };
    });
    export class EstatusFilter extends React.Component<IButtonStatesProps, {}> {
        constructor(props: IButtonStatesProps) {
            super(props);
        }
        //
        static props: any = (state: any) => ({ });
        // 
        static defaultProps: IButtonStatesProps = {
            size: [12, 6, 4, 4]
        };
        render(): JSX.Element {
            return <buttons.ButtonStates {...this.props} label="Estatus" id="activos" value={1} states={[
                { text: "Activos", value: 1, selectedStyle: { color: "#fff", backgroundColor: "#66BB6A", border: "none", fontSize: 11 } },
                { text: "Todos", value: 0, selectedStyle: { color: "#fff", backgroundColor: "#E0E0E0", border: "none", fontSize: 11 } },
                { text: "Inactivos", value: -1, selectedStyle: { color: "#fff", backgroundColor: "#DD2C00", border: "none", fontSize: 11 } }
            ]} />;
        };
    };
    export class EstatusPosicionFilter extends React.Component<IButtonStatesProps, {}> {
        constructor(props: IButtonStatesProps) {
            super(props);
        }
        //
        static props: any = (state: any) => ({});
        // 
        static defaultProps: IButtonStatesProps = {
        };
        render(): JSX.Element {
            return <buttons.ButtonStates {...this.props} label="Estatus" id="estatus" value={1} states={[
                { text: "Disponible", value:  'D',  selectedStyle:  { color: "#fff", backgroundColor: "#3598DC", border: "none" }},
                { text: "Ocupados",   value:  'O',  selectedStyle:  { color: "#fff", backgroundColor: "#66BB6A", border: "none" }},
                { text: "Cancelados", value: 'C', selectedStyle: { color: "#fff", backgroundColor: "#DD2C00", border: "none" } },
                { text: "Todos", value: 'T', selectedStyle: { color: "#fff", backgroundColor: "#f0ad4e", border: "none" } }
            ]} />;
        };
    };
}

import buttons = EK.UX.Buttons;
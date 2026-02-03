namespace EK.UX {
    "use strict";
    interface IDatePickerProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        label?: string;
        helpLabel?: string;
        required?: boolean;
        formato?: string; // (dd/mm/yyyy)  (yyyy)
        type?: string;
        minuteStep?: any;
        startDays?: number; 
        hoursDisabled?: any[]; 
        daysOfWeekDisabled?: any[];
    };
    export class DatePicker extends React.Component<IDatePickerProps, IDatePickerProps> {
        constructor(props: IDatePickerProps) {
            super(props);

            this.onKeyDown = this.onKeyDown.bind(this);
            this.onKeyUp = this.onKeyUp.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.onFocus = this.onFocus.bind(this);
            this.onFocusInput = this.onFocusInput.bind(this);
            this.initDatePicker = this.initDatePicker.bind(this);
            this.initDateTimePicker = this.initDateTimePicker.bind(this);
        };
        static defaultProps: IDatePickerProps = {
            id: "",
            label: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            isFormComponent: true,
            formato: "dd/mm/yyyy",
            type: "date",
            minuteStep : 5 
        };

        refs: {
            input: Element;
        };

        equalDates(d1: Date, d2: Date): boolean {
            if (this.props.type === "month") {
                let cDate = d1 ? d1 : null;
                let nDate = d2 ? d2 : null;

                if (cDate === null && nDate === null) return true;
                if (cDate === null || nDate === null || (cDate !== nDate)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                let cDate: Date = d1 ? new Date(d1.getTime()) : null;
                let nDate: Date = d2 ? new Date(d2.getTime()) : null;

                if (cDate === null && nDate === null) return true;
                if (cDate === null || nDate === null || (cDate.getTime() !== nDate.getTime())) {
                    return false;
                } else {
                    return true;
                }
            }
           
            
        };
        equalYear(y1: any, y2: any): boolean {
            let cYear: any = y1 ? y1 : null;
            let nYear: any = y2 ? y2 : null;

            if (cYear === null && nYear === null) return true;
            if (cYear === null || nYear === null || (cYear !== nYear)) {
                return false;
            } else {
                return true;
            }
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
                    let input: any = $(this.refs.input);
                    input.datepicker("hide");
                    //
                    nextItem.focus();
                };
            };
        };
        onKeyUp(e: any): boolean {
            if (e.keyCode === 46) {                
                let input: any = $(this.refs.input);
                if (this.props.type === "datetime") {
                    input.val(undefined);
                    //input.datetimepicker("date", null);
                    //input.data("datetimepicker").setDate(null);
                }
                else {
                    input.datepicker("setDate", undefined).datepicker("refresh");
                };
                if (this.props.updateState) {
                    this.props.updateState({
                        id: this.props.id,
                        value: undefined,
                        initialValue: this.props.initialValue,
                        hasChanged: true,
                        validations: this.props.validations
                    });
                };

                if (this.props.change) {
                    this.props.change(undefined);
                };

                return false;
            }
        };
        onFocusInput(e: any): any {
            let input: any = $(this.refs.input);
            input.focus(); 
        }
        onFocus(e: any): any {
           
            let input: any = $(this.refs.input);
            //
            if (this.props.type === "date") {
                input.inputmask("mask", { mask: "99/99/9999" });
            };
            if (this.props.type === "datetime") {
                input.inputmask("mask", { mask: "99/99/9999 99:99" });
            };
            if (this.props.type === "year") {
                input.inputmask("mask", { mask: "9999" });
            };
            if (this.props.type === "month") {
                input.inputmask("mask", { mask: "99/9999" });
            };
        };
        onBlur(e: any): any {

            //let valueLength: number = $.trim(e.currentTarget.value).length;
            //let updateValue: boolean = false;
            //let value: any = null;
            //let input: any = $(this.refs.input);


            //if (!value && valueLength === 0) {
            //    value = undefined;
            //    updateValue = true;
            //};

            //if (this.props.type === "date" && valueLength === 8) {
            //    value = input.data("datetimepicker").getDate();
            //    //
            //    updateValue = true;
            //};
            //if (this.props.type === "datetime" && valueLength === 16) {
            //    value = input.data("datetimepicker").getDate();
            //    //
            //    updateValue = true;
            //};
            //if (this.props.type === "year" && valueLength === 4) {
            //    value = input.data("datetimepicker").getDate();
            //    //
            //    updateValue = true;
            //};

            //if (updateValue) {
            //    this.props.updateState({
            //        id: this.props.id,
            //        value: value,
            //        initialValue: this.props.initialValue,
            //        hasChanged: true,
            //        validations: this.props.validations
            //    });

            //    if (this.props.change) {
            //        this.props.change(value);
            //    };
            //};
        };
        initDatePicker(): any {
            let jq: any = $;
            let input: any = $(this.refs.input);
            let that: DatePicker = this;
            let startDays = this.props.startDays;
            input.datepicker({
                language: "es",
                orientation: "left",
                viewMode: this.props.formato === 'dd/mm/yyyy' ? "days" : this.props.formato === "mm/yyyy" ? "months" : "years",
                minViewMode: this.props.formato === 'dd/mm/yyyy' ? "days" : this.props.formato === "mm/yyyy" ? "months" : "years",
                format: !this.props.formato || this.props.formato === "dd/mm/yyyy" ? "dd/mm/yyyy" : this.props.formato,
                autoclose: true,
                todayBtn: false,
                todayHighlight: true,
                startDate: startDays === undefined || startDays === null ? new Date(-8639968443048000) : new Date(new Date().setMinutes((1380 * startDays) - 60))
            });

            input.datepicker("setDate", this.props.value).datepicker("refresh");
            
            input.on("change", (e: any, fn: any): any => {
                let valueLength: number = $.trim(e.currentTarget.value).length;

                if (valueLength === 0) {
                    this.props.updateState({
                        id: this.props.id,
                        value: undefined,
                        initialValue: this.props.initialValue,
                        hasChanged: true,
                        validations: this.props.validations
                    });
                };

            })

            input.on("changeDate", (e: any): any => {

                let currentTarget: any = $(e.currentTarget);
                let inputValue: string = currentTarget.inputmask("unmaskedvalue");
                //
                let valueLength: number = $.trim(inputValue).length;
                let updateValue: boolean = false;
                let value: any = null;

                if (this.props.type === "date" && valueLength === 8) {
                    updateValue = !this.equalDates(that.props.value, e.date) && this.props.updateState !== undefined;
                    value = e.date;
                };
                if (this.props.type === "datetime" && valueLength === 16) {
                    updateValue = !this.equalDates(that.props.value, e.date) && this.props.updateState !== undefined;
                    value = e.date; 
                };
                if (this.props.type === "year" && valueLength === 4) {
                    updateValue = !this.equalYear(that.props.value, e.date) && this.props.updateState !== undefined;
                    value = e.currentTarget.value;
                };
                if (this.props.type === "month" && valueLength === 6) {
                    updateValue = !this.equalYear(that.props.value, e.date) && this.props.updateState !== undefined;
                    value = e.currentTarget.value;
                };

                if (updateValue === true) {
                    this.props.updateState({
                        id: this.props.id,
                        value: value,
                        initialValue: this.props.initialValue,
                        hasChanged: true,
                        validations: this.props.validations
                    });

                    if (this.props.change) {
                        this.props.change(value);
                    };
                };
            });
            
        };
        initDateTimePicker(): any {
            let jq: any = $;
            let input: any = $(this.refs.input);
            let that: DatePicker = this;
            let language: any = global.getCurrentLanguage();
            //let userDate: Date = global.userDate(this.props.value);
            let formato: string = language.ShortDatePattern.toLowerCase() + " hh:ii";
            let minuteStepProps = this.props.minuteStep;
            let hoursDisabled = this.props.hoursDisabled;
            let startDays = this.props.startDays;
            let daysOfWeekDisabled = this.props.daysOfWeekDisabled;

            input.datetimepicker({
                language: "es",
                //locale: language.Clave,
                format: formato,
                keepOpen: false,
                autoclose: true,
                widgetPositioning: "left",
                todayBtn: false,
                todayHighlight: true,
                startDate: startDays === undefined || startDays === null ? new Date(-8639968443048000) : new Date(new Date().setMinutes((1380 * startDays) - 60)),
                hoursDisabled: hoursDisabled === undefined || hoursDisabled === null ? [] : hoursDisabled, 
                daysOfWeekDisabled: daysOfWeekDisabled === undefined || daysOfWeekDisabled === null ? [] : daysOfWeekDisabled, 
                minuteStep: minuteStepProps
            });

            if (this.props.value) {
               // let newDate: any = new Date(this.props.value.getTime() + (this.props.value.getTimezoneOffset() * 60000));
                let newDate: any = new Date(this.props.value.getTime());
                input.data("datetimepicker").setDate(newDate);
            };
           // let a: any = $('#datetimepicker'); 
           // input.datetimepicker('setHoursDisabled', [12, 19]);
            //input.datetimepicker("date", this.props.value);
            //input.datetimepicker().date(this.props.value);

            input.on("changeDate", (e: any): any => {
                let valueLength: number = $.trim(e.currentTarget.value).length;
                let valueCurrenTatget: any = $.trim(e.currentTarget.value);
                let updateValue: boolean = false;
                let value: any = null;

              

                if (this.props.type === "datetime" && valueLength === 16) {
                    updateValue = !this.equalDates(that.props.value, e.date) && this.props.updateState !== undefined;
                   // value = new Date(e.date.getTime() + (e.date.getTimezoneOffset() * 60000)); //e.date;
                    value = new Date(e.date.getTime()); //e.date;
                };

                if (updateValue === true) {
                    this.props.updateState({
                        id: this.props.id,
                        value: value,
                        initialValue: this.props.initialValue,
                        hasChanged: true,
                        validations: this.props.validations
                    });

                    if (this.props.change) {
                        this.props.change(value);
                    };
                };
            });

            //input.on("dp.hide", (e: any): any => {
            //    let valueLength: number = $.trim(input.value).length;
            //    //let input: any = $(e.currentTarget);
            //    let isOpen: boolean = input.datepicker("widget").is(":visible");

            //    let currentValue: Date = this.props.value;
            //    let hasChanged: boolean = this.props.hasChanged;

            //    if (valueLength === 0 || valueLength === 10) {
            //        if (!hasChanged && (!this.equalDates(currentValue, this.props.initialValue))) {
            //            hasChanged = true;
            //        };
            //    } else {
            //        if (valueLength === 4) {
            //            if (!hasChanged && (!this.equalYear(currentValue, this.props.initialValue))) {
            //                hasChanged = true;
            //            };
            //        };
            //    };

            //    if (this.props.updateState) {
            //        this.props.updateState({
            //            id: this.props.id,
            //            value: this.props.value,
            //            initialValue: this.props.initialValue,
            //            hasChanged: hasChanged,
            //            validations: this.props.validations
            //        });
            //    };
            //});

            //input.on("changeDate", (e: any): any => {
            //    let date: any = e.date;
            //    if (!this.equalYear(that.props.value, date)) {
            //        if (this.props.updateState) {
            //            this.props.updateState({
            //                id: this.props.id,
            //                value: date,
            //                initialValue: this.props.initialValue,
            //                hasChanged: true,
            //                validations: this.props.validations
            //            });
            //        }

            //        if (this.props.change) {
            //            this.props.change(e.currentTarget.value);
            //        };
            //    }
            //});            
        };
        initComponent(): any {
            if (this.props.type === "date") {
                this.initDatePicker();
            }
            else if (this.props.type === "datetime") {
                this.initDateTimePicker();
            }
            else if (this.props.type === "year") {
                this.initDatePicker();
            }
              else if (this.props.type === "month") {
                this.initDatePicker();
            };
        };
        updateComponent(): any {
            let input: any = $(this.refs.input);
            let newDate: any;
            if (this.props.type === "date") {
                //input.datepicker("setDate", this.props.value);
                newDate = this.props.value != null ? new Date(this.props.value) : null;
                input.data("datepicker").setDate(newDate);
            }
            else if (this.props.type === "datetime") {
               // input.datetimepicker("date", this.props.value);
                newDate = this.props.value != null ? new Date(this.props.value) : null;
                input.data("datetimepicker").setDate(newDate);
            }
            else if (this.props.type === "year") {
                //input.datepicker("setDate", this.props.value);
                newDate = this.props.value != null ? new Date(this.props.value) : null;
                input.data("datepicker").setDate(newDate);
            }
            else if (this.props.type === "month") {
                //input.datepicker("setDate", this.props.value);
                newDate = this.props.value != null ? this.props.value : null;
                input.data("datepicker").setDate(newDate);
            };

            if (this.props.value) {
                if (!input.hasClass("edited")) {
                    input.addClass("edited");
                }
            };
        };
        componentDidMount(): void {
                            //let input: any = $(this.refs.input);
                            //input.datepicker("destroy");
            this.initComponent();
        };
        componentWillUnmount(): void {
            let input: any = $(this.refs.input);

            input.datepicker("destroy");
        };
        componentDidUpdate(): void {
            this.updateComponent();
                            //let input: any = $(this.refs.input);
                            //input.datepicker("destroy");
           // this.initComponent();
        };
        componentWillUpdate(): void {
            //let input: any = $(this.refs.input);
            //input.datepicker("destroy");
        };
        shouldComponentUpdate(nextProps: IDatePickerProps, nextState: IDatePickerProps): boolean {
            let element: any = Forms.getFormElement(this.props.idForm, this.props);
            if ((element.validations != nextProps.validations && nextProps.validations.length > 0)
                && !nextProps.idFormSection) {
                
                let props: any = Forms.cloneElementProps(this.props, nextProps);
                Forms.updateFormElement(this.props.idForm, props, nextProps.value);
            }
            let valueLength: number = $.trim(nextProps.value).length; 
            if (valueLength !== 4) {
                if (!this.equalDates(this.props.value, nextProps.value) ||
                    this.props.hasChanged !== nextProps.hasChanged ||
                    this.props.hasValidationError !== nextProps.hasValidationError) {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else {
                console.log('valDff4')
                    if (!this.equalYear(this.props.value, nextProps.value) ||
                        this.props.hasChanged !== nextProps.hasChanged ||
                        this.props.hasValidationError !== nextProps.hasValidationError)
                    {
                        return true;
                    }
                    else {
                        return false;
                    }
            }
            //return this.state.hasValidationError !== nextState.hasValidationError ||
            //    !this.equalDates(this.state.currentValue, nextState.currentValue) ||
            //    (nextProps.value !== undefined && this.state.currentValue === undefined);
        }

        render(): JSX.Element {


            let formControlId: string;
            let className: string = "form-control input-sm date-picker";
            let formGroupClass: string = "form-group";

            if (this.props.id) {
                formControlId = "formControl_" + this.props.id;
            }
            else {
                if (!this.props.key) {
                    let d: any = new Date();
                    formControlId = "formControl_" + Number(d).toString();
                } else {
                    formControlId = "formControl_" + this.props.key.toString();
                };
            };

            let required: boolean = false;
            let requiredPoint: any;
            let hasValidations: boolean = false;

            if (this.props.validations && this.props.validations.length > 0) {
                hasValidations = true;
                for (var i = 0; i < this.props.validations.length; i++) {
                    if (this.props.validations[i] && this.props.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            };

            if (this.props.hasValidationError === true || (required && this.props.value == null)) {
                formGroupClass += " has-error";
                requiredPoint = [
                    hasValidations ? <i key="key-check" className="fa fa-exclamation"></i> : null,
                    required ? <i key="key-ast" className="fa fa-asterisk"></i> : null
                ];
            } else {
                if (hasValidations) {
                    formGroupClass += " has-success";
                    requiredPoint = [
                        hasValidations ? ((this.props.value != "" && this.props.value != undefined) ? <i key="key-check" className="fa fa-check"></i> : <i key="key-excla" className="fa fa-exclamation"></i>) : null,
                        required ? <i key="key-ast" className="fa fa-asterisk"></i> : null
                    ];
                };
            };

            //if (this.props.hasValidationError === true && this.props.validate === true) {
            //    formGroupClass += " has-error";
            //    requiredPoint = <span
            //        className="required-char"
            //        data-container="body"
            //        data-placement="right"
            //        data-original-title={this.props.helpLabel}>*</span>;
            //} else {
            //    if (required) {
            //        requiredPoint = <span
            //            className="required-char-nv"
            //            data-container="body"
            //            data-placement="right"
            //            data-original-title={this.props.helpLabel}>*</span>
            //    };
            //};

            //if (this.props.hasValidationError) {
            //    formGroupClass += " has-error";
            //    requiredPoint = <span
            //        className="required-char-nv"
            //        data-container="body"
            //        data-placement="right"
            //        data-original-title={this.props.helpLabel}>*</span>;
            //}

            if (this.props.value && this.props.value !== "") {
                className += " edited";
            }

            if (this.props.index >= 0) {
                return <input
                        type="text"
                        className={className + " input-inline"}
                        id={formControlId + "_" + this.props.index}
                        name={formControlId + "_" + this.props.index}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onKeyDown={this.onKeyDown}
                        style={{textAlign:"right"}}
                        ref="input" />;
            }
            else {
                return <grid.Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <div className={formGroupClass}>
                        <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 11, height: 15 }}>
                            <span>{this.props.label}&nbsp;</span>{requiredPoint}
                        </label>
                        <div className="input-group right-addon">
                            <input
                                type="text"
                                className={className}
                                id={formControlId}
                                name={formControlId}
                                ref="input"
                                onKeyDown={this.onKeyUp}
                                onBlur={this.onBlur}
                                onFocus={this.onFocus}
                                style={{ fontSize: 11 }}
                            />
                            <span className="input-group-btn">
                                <Button className="btn default" onClick={this.onFocusInput} style={{ height: 24, padding: "0px 12px" }}>
                                    <i className="fa fa-calendar"></i>
                                </Button>
                            </span>
                        </div>
                    </div>
                </grid.Column>;
            };
        }
    }

    export class DatePickerForm extends React.Component<IDatePickerProps, IDatePickerProps> {
        constructor(props: IDatePickerProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
        };

        updateState(element: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;

            //
            if (this.props.index >= 0)
            {
                let aElement: IFormElement = Forms.getFormElement(idForm, { id: this.props.property });
                let aElementValue: any[] = global.getData(aElement.value);
                //
                if (aElementValue && aElementValue.length > 0) {

                    let nElementValue: any = aElementValue.map((value: any, index: number) => {
                        return global.assign(value);
                    });

                    let item: any = aElementValue[this.props.index];

                    if (item)
                    {
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

                        Forms.updateFormElement(idForm, this.props.property, global.createSuccessfulStoreObject(nElementValue));


                        //let nElement: any = global.assign(item);
                        //nElement[this.props.id] = element.value;
                        ////
                        //aElementValue[this.props.index] = nElement;
                        ////
                        //aElement.value.data = aElementValue;
                        //aElement.value.timestamp = aElement.value.timestamp + 1;
                        //Forms.updateFormElement(idForm, aElement);
                    };
                };
            }
            else {
                Forms.updateFormElement(idForm, element);
            };
        };

        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            let index: any = this.props.index;
            if (idForm && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };

        componentWillReceiveProps(nextProps: IDatePickerProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let index: any = nextProps.index;

            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;
            let element: IFormElement = Forms.getFormElement(nextIdForm, nextProps);

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

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <DatePicker {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let DatePicker$Form: any = ReactRedux.connect(Forms.props, null)(DatePickerForm);
}

import DatePicker = EK.UX.DatePicker$Form;
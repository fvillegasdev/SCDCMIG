/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX.DropDownLists {
    "use strict";

    export interface IDropDrownListProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        helpLabel?: string;
        items?: any;
        itemselected?: string;
        itemKey?: string;
        itemValue?: string | Function;
        label?: string;
        loadData?: () => void;
        required?: boolean;
        dataManager?: StateDataManager;
        style?: React.CSSProperties;
        remoteUrl?: string;
        remoteMethod?: string;
        limit?: number;
        matchers?: string[];
        mode?: SelectModeEnum;
        itemFormatter?: (item: any, container?: any) => any;
        selectionFormatter?: (item: any) => any;
        beforeInvoke?: (term: string) => any;
        processData?: (items: any) => any;
        buttonClick?: (btn: any, input: any, props: select.ISelectProps) => void;
        buttonClass?: string;
        iconButton?: string;
        addNewItem?: string;
        addNewItemText?: string;
        nuevoItem?: any;
        cargarDatos?: boolean;
        seleccionado?: any;
        addAll?: boolean;
        onUpdateElement?: (prevState: EK.UX.IFormElement, nextState: EK.UX.IFormElement) => void;
        type?: any;
    };

    /* Estatus del Componente */
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }
    /*Propiedades requeridas en algunosDropDrownList*/

    /** Componente */
    export class DropdownList extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);

            this.state = {
                initialValue: props.initialValue,
                currentValue: props.value
            };

            this.onChange = this.onChange.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.initSelect = this.initSelect.bind(this);
            this.removeSelect = this.removeSelect.bind(this);
            this.seleccionarItem = this.seleccionarItem.bind(this);
        }
        static defaultProps: IDropDrownListProps = {
            id: "",
            label: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            isFormComponent: true,
            matchers: ["Clave", "Nombre"],
            addNewItem: undefined,
            addNewItemText: undefined,
            nuevoItem: undefined,
            buttonClass: ""
        };
        refs: {
            select: Element;
            requiredPoint: Element;
        };
        initSelect(): void {
            let select: any = $(this.refs.select);
            //let that: IDropDrownListProps = this;

            let appendOption: Function = (item: any): void => {
                let newItemText: any = config.templateSelection(item);

                if (newItemText.html) {
                    newItemText = $("<div></div>").append(newItemText).html();
                };

                var newOption = new Option(newItemText, "" + (item ? item.id : ""), false, false);
                select.append(newOption).trigger('change');
            };
            let templateResultFn: Function = (dataItem: any): any => {
                if (!dataItem.id) {
                    return dataItem.text;
                };

                let itemValue: string = this.props.itemValue.toString();
                return dataItem[itemValue];
            };
            let config: any = {
                theme: "bootstrap",
                placeholder: "",
                language: "es",
                templateResult: templateResultFn,
                templateSelection: templateResultFn
            };

            let processDataFn: Function;

            if (this.props.itemFormatter) {
                config.templateResult = this.props.itemFormatter;
                config.templateSelection = this.props.itemFormatter;
            };
            if (this.props.selectionFormatter) {
                config.templateSelection = this.props.selectionFormatter;
            };

            if (this.props.processData) {
                processDataFn = this.props.processData;
            }
            else {
                processDataFn = (items: any): any[] => {
                    let retValue: any[] = [];

                    if (items && items.constructor.name === "Array") {
                        retValue = items;
                    }
                    else {
                        retValue = global.getData(items, []);
                    };

                    retValue = retValue.map((value: any, index: number) => {
                        if (value) {
                            value.id = value[this.props.itemKey];
                            value.text = value[this.props.itemValue.toString()];
                        };
                        return value;
                    });

                    return retValue;
                };
            };

            if (this.props.remoteUrl) {
                let beforeInvokeFn: Function = this.props.beforeInvoke ? this.props.beforeInvoke :
                    (params) => {
                        var query = {
                            search: params.term
                        };

                        return JSON.stringify(query);
                    };
                config.allowClear = true;
                let UrlAplicacion: any = window.location;
                let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra")

                config.minimumInputLength = IntraUrbana? 1:3;
                config.ajax = {
                    url: this.props.remoteUrl,
                    method: this.props.remoteMethod,
                    contentType: "application/json; charset=UTF-8",
                    data: beforeInvokeFn,
                    processResults: (data) => {
                        return {
                            results: processDataFn(data)
                        };
                    }
                };
            }
            else {
                //console.log(this.props.value);
                let selectItems: any[] = [];
                if (global.isSuccessful(this.props.items)) {
                    let data: any[] = global.getData(this.props.items);
                    //
                    if (!global.isEmptyObject(this.props.value) && this.props.value.ID) {
                        let idValue: any = this.props.value.ID;
                        //
                        let idExists: boolean = false;
                        data.forEach((value: any, index: number) => {
                            if (value.ID === idValue) {
                                idExists = true;
                            };
                        });

                        if (!idExists) {
                            let newItem: any = global.assign(this.props.value);
                            //
                            //console.log(this.props.value);
                            //data.push(this.props.value);
                        };
                    };
                    //
                    if (this.props.mode === SelectModeEnum.Multiple) {
                        config.multiple = true;
                    };
                    config.allowClear = false;
                    config.data = processDataFn(data);
                    config.matcher = (params: any, data: any) => {
                        let term: string = $.trim(params.term).toLowerCase();

                        if (term === "" || !data) {
                            return data;
                        };

                        let matchers: string[] = this.props.matchers;
                        if (matchers) {
                            let match: any = null;
                            for (var i = 0; i < matchers.length; i++) {
                                if (data.children && data.children.length > 0) {
                                    for (var j = 0; j < data.children.length; j++) {
                                        let v: string = data.children[j][matchers[i]];
                                        if (v) {
                                            v = v.toLowerCase();
                                            if (v.indexOf(term) > -1) {
                                                if (!match) {
                                                    match = global.assign(data, { children: [] });
                                                };
                                                match.children.push(data.children[j]);
                                            };
                                        };
                                    };
                                }
                                else {
                                    let v: string = data[matchers[i]];
                                    if (!v) {
                                        let column: any = matchers[i];
                                        let columnSplit: number = column.indexOf(".");
                                        if (columnSplit > 0) {
                                            v = global.getNestedProp(data, matchers[i])
                                        }

                                    }

                                    if (v) {
                                        v = v.toLowerCase();
                                        if (v.indexOf(term) > -1) {
                                            match = data;
                                        };
                                    };
                                };
                            };
                            return match;
                        };

                        return null;
                    };
                };
            };
            /*
            {
                language: "es",
                orientation: "left",
                format: "dd/mm/yyyy"
            }
            */

            select.select2(config);

            select.on("select2:select", (e: any) => {
                var data = e.params.data;

                this.onChange(data);

                //if (this.props.remoteMethod) {
                //    appendOption(data);
                //};
            });

            select.on("select2:unselect", (e: any) => {
                var data = e.params.data;

                this.onChange(null);
            });

            if (this.props.remoteUrl) {
                let newItem: any = processDataFn([this.props.value])[0];
                if (!newItem) {
                    newItem = {};
                };
                newItem.initItem = true;
                let newItemText: any = config.templateSelection(newItem);

                if (newItemText && newItemText.html) {
                    newItemText = $("<div></div>").append(newItemText).html();
                };

                var newOption = new Option(newItemText, "" + (newItem ? newItem.id : ""), false, false);
                select.append(newOption).trigger('change');
            }
            else {
                this.seleccionarItem();
            }
            //this.seleccionarItem();
        };
        removeSelect(): void {
            let select: any = $(this.refs.select);
            //
            select.select2('destroy');
            //
            select.find("option").remove();
            select.find("optgroup").remove();
            //
        };
        seleccionarItem(): void {
            let select: any = $(this.refs.select);
            let itemKey: string = this.props.itemKey.toString();
            let currentValue: any = (
                this.props.value !== undefined &&
                this.props.value !== null &&
                this.props.value[itemKey] !== undefined &&
                this.props.value[itemKey] !== null) ? this.props.value[itemKey].toString() : "";

            if (!this.props.value || this.props.value === null) {

                if (isSuccessful(this.props.items)) {
                    if (this.props.items.data.length > 0) {
                        let itemKey: string = this.props.itemKey.toString();
                        let item: any = {
                            currentTarget: {
                                value: $.trim(this.props.items.data[0][itemKey])
                            }
                        };

                        this.onChange(item);
                    };
                };
            };

            if (this.props.mode === SelectModeEnum.Multiple) {
                let v: any[] = this.props.value;
                if (v !== null && v != undefined) {
                    currentValue = v.map((value: any, index: number) => {
                        if (value) {
                            return value.ID + "";
                        }
                    });
                }
            }
            select.val(currentValue).trigger("change");
        };
        componentDidMount(): void {
            this.initSelect();
        };
        componentDidUpdate(): void {
            this.initSelect();
        };
        componentWillUnmount(): void {
            this.removeSelect();
        };
        componentWillUpdate(): void {
            this.removeSelect();
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps): any {
            if (this.props.remoteUrl) {
                if (global.hasChanged(this.props.value, nextProps.value) && !nextProps.value) {
                    let select: any = $(this.refs.select);
                    select.val(null).trigger('change');
                };
            };
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps, nextState: IDropDrownListState): boolean {
            if (hasChanged(this.props.items, nextProps.items) || (this.props.value !== nextProps.value)) {
                return true;
            };
            if (!this.props.remoteUrl && this.props.mode !== SelectModeEnum.Multiple) {
                if (global.hasChanged(this.props.value, nextProps.value) ||
                    this.props.hasChanged !== nextProps.hasChanged ||
                    this.props.hasValidationError !== nextProps.hasValidationError ||
                    this.props.validate !== nextProps.validate) {
                    return true;
                };
            };
            if (this.props.mode === SelectModeEnum.Multiple && (!this.props.value && (nextProps.value !== null && nextProps.value != undefined))) {
                return true;
            }
            return false;
        };
        onChange(e: any): any {
            let select: any = $(this.refs.select);
            let hasChanged: boolean = this.props.hasChanged;
            let currentValue: any;
            let hasValidationError: boolean = false;

            let itemKey: string = this.props.itemKey.toString();
            let selectedValue: string = null;
            let items: any[] = global.getData(this.props.items, []);
            //console.log(items);
            if (this.props.mode === SelectModeEnum.Multiple) {
                let selValues: any[] = select.val();
                //
                if (selValues && selValues.length > 0) {
                    // ID based
                    currentValue = [];
                    for (var i = 0; i < selValues.length; i++) {
                        let selID: number = parseInt(selValues[i]);
                        //
                        if (!isNaN(selID)) {
                            items.forEach((item: any, index: any) => {
                                let itemValue: number = item.ID;

                                if (itemValue === selID) {
                                    currentValue.push(item);
                                }
                            });
                        };
                    };
                } else {
                    currentValue = null;
                };
                hasChanged = true;
            }
            else {
                if (e) {
                    if (e.currentTarget && e.currentTarget.value) {
                        selectedValue = e.currentTarget.value;
                    }
                    else {
                        selectedValue = e.id.toString();
                    }
                };

                let itemFound: boolean = false;
                if (e) {
                    if (!this.props.items && e.ID > 0 || (typeof (e.ID) === "string" && e.ID !== undefined)) {
                        currentValue = e;
                        itemFound = true;
                    }
                    else {
                        items.forEach((item: any, index: any) => {
                            let itemValue: string = item[itemKey];

                            itemValue = (itemValue) ? itemValue.toString() : "";

                            if (itemValue === selectedValue) {
                                currentValue = item;
                                itemFound = true;
                            }
                        });
                    };
                };

                if (!currentValue) {
                    if (!hasChanged && currentValue !== this.props.initialValue) {
                        hasChanged = true;
                    };

                    if (this.props.required) {
                        hasValidationError = true;
                    }
                } else {
                    if (!hasChanged && (!this.props.initialValue || (currentValue[itemKey] !== this.props.initialValue[itemKey]))) {
                        hasChanged = true;
                    };
                }
            };
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: currentValue,
                    hasChanged: hasChanged,
                    initialValue: this.props.initialValue,
                    hasValidationError: hasValidationError,
                    validations: this.props.validations,
                });
            }

            if (this.props.change != undefined) {
                this.props.change(currentValue);
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
                    nextItem.focus();
                };
            };
        };
        render(): JSX.Element {
            let className: string = "form-control input-sm";
            let formControlId: string;
            let formGroupClass: string = "form-group";


            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
            };
            let required: boolean = false;
            let requiredPoint: any = "";
            let hasValidations: boolean = false;

            if (this.props.validations && this.props.validations.length > 0) {
                hasValidations = true;
                for (var i = 0; i < this.props.validations.length; i++) {
                    if (this.props.validations[i] && this.props.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            }

            if (this.props.hasValidationError === true || (required && (this.props.value == null || this.props.value.ID == null))) {
                //console.log(hasValidations, this.props)
                //if(this.props.)
                formGroupClass += " has-error";
                requiredPoint = [
                    hasValidations ? <i key="key-check" className="fa fa-exclamation"></i> : null,
                    required ? <i key="key-ast" className="fa fa-asterisk"></i> : null
                ];
            } else {
                //console.log(hasValidations, this.props)
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

            //if (this.props.value && this.props.value !== "") {
            className += " edited";
            //}

            let selectedOption: string = "";
            let options: any[] = [];
            let items: any[] = global.getData(this.props.items);
            let itemsProps: any = this.props.items;
            let that: ddl.IDropDrownListProps = this.props;

            if (items.length > 0 && items !== undefined) {
                items.forEach((item, i: number) => {
                    let itemId: string = "dd-key-" + i.toString();
                    let itemKey: any = that.itemKey;
                    let itemValue: string = item[itemKey] ? item[itemKey].toString() : "";
                    let itemDescription: string;
                    let currentValue: any = (
                        that.value !== undefined &&
                        that.value !== null &&
                        that.value[itemKey] !== undefined &&
                        that.value[itemKey] !== null) ? that.value[itemKey].toString() : "";

                    if (typeof that.itemValue === "function") {
                        itemDescription = that.itemValue(item);
                    } else {
                        itemDescription = item[that.itemValue] ? item[that.itemValue].toString() : "";
                    }

                    if (itemValue === currentValue) {
                        selectedOption = itemValue;
                    };

                    options.push(
                        <option
                            key={i}
                            value={itemValue}
                        // id={itemId}
                        >
                            {itemDescription}
                        </option>);
                });
            } else {
                itemsProps = global.createSuccessfulStoreObject([]);
            };

            //this.props.items && this.props.items.status === AsyncActionTypeEnum.loading
            let requiresAddOn: boolean = (this.props.buttonClick !== undefined);
            let buttonClass: string = "btn btn-success btn-sm";
            let buttonId: string = "btn_group_" + this.props.id;

            if (this.props.buttonClass) {
                buttonClass = this.props.buttonClass;
            };

            if (this.props.index >= 0) {
                return <select
                    className={className + " input-inline"}
                    id={formControlId + "_" + this.props.index}
                    name={formControlId + "_" + this.props.index}
                    data-source-remote={this.props.remoteUrl !== undefined && this.props.remoteUrl !== null}
                    onKeyDown={this.onKeyDown}
                    ref="select">
                </select>;
            }
            else {
                return <Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <UpdateColumn info={itemsProps} size={24} top={0} bottom={0}>
                        <div className={formGroupClass} style={this.props.style}>
                            <label htmlFor={formControlId}>
                                <span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span>
                            </label>
                            <div className="input-group">
                                <select
                                    className={className}
                                    id={formControlId}
                                    name={formControlId}
                                    data-source-remote={this.props.remoteUrl !== undefined && this.props.remoteUrl !== null}
                                    ref="select">
                                </select>
                                {requiresAddOn === true ?
                                    <span className="input-group-btn">
                                        <button id={buttonId} className={buttonClass} type="button" onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            let jqId: string = "#" + formControlId;

                                            this.props.buttonClick($(jqId).parent().find("button"), $(jqId), this.props);
                                        }}>
                                            <i className={!this.props.iconButton ? "fa fa-plus" : this.props.iconButton}></i>
                                        </button>
                                    </span> : null
                                }
                            </div>
                        </div>
                    </UpdateColumn>
                </Column>;
            };
        }
    }


    export class DropdownListMultiSelect extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);

            this.state = {
                initialValue: props.initialValue,
                currentValue: props.value
            };

            this.onChange = this.onChange.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.initSelect = this.initSelect.bind(this);
            this.removeSelect = this.removeSelect.bind(this);
            this.seleccionarItem = this.seleccionarItem.bind(this);
        }
        static defaultProps: IDropDrownListProps = {
            id: "",
            label: "",
            helpLabel: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            isFormComponent: true,
            matchers: ["Clave", "Nombre"],
            addNewItem: undefined,
            addNewItemText: undefined,
            nuevoItem: undefined,
            buttonClass: ""
        };
        refs: {
            select: Element;
            requiredPoint: Element;
        };
        initSelect(): void {
            let select: any = $(this.refs.select);
            //let that: IDropDrownListProps = this;

            let appendOption: Function = (item: any): void => {
                let newItemText: any = config.templateSelection(item);

                if (newItemText.html) {
                    newItemText = $("<div></div>").append(newItemText).html();
                };

                var newOption = new Option(newItemText, "" + (item ? item.id : ""), false, false);
                select.append(newOption).trigger('change');
            };
            let templateResultFn: Function = (dataItem: any): any => {
                if (!dataItem.id) {
                    return dataItem.text;
                };

                let itemValue: string = this.props.itemValue.toString();
                return dataItem[itemValue];
            };
            let config: any = {
                theme: "bootstrap",
                placeholder: "",
                language: "es",
                templateResult: templateResultFn,
                templateSelection: templateResultFn
            };

            let processDataFn: Function;

            if (this.props.itemFormatter) {
                config.templateResult = this.props.itemFormatter;
                config.templateSelection = this.props.itemFormatter;
            };
            if (this.props.selectionFormatter) {
                config.templateSelection = this.props.selectionFormatter;
            };

            if (this.props.processData) {
                processDataFn = this.props.processData;
            }
            else {
                processDataFn = (items: any): any[] => {
                    let retValue: any[] = [];

                    if (items && items.constructor.name === "Array") {
                        retValue = items;
                    }
                    else {
                        retValue = global.getData(items, []);
                    };

                    retValue = retValue.map((value: any, index: number) => {
                        if (value) {
                            value.id = value[this.props.itemKey];
                            value.text = value[this.props.itemValue.toString()];
                        };
                        return value;
                    });

                    return retValue;
                };
            };

            if (this.props.remoteUrl) {
                let beforeInvokeFn: Function = this.props.beforeInvoke ? this.props.beforeInvoke :
                    (params) => {
                        var query = {
                            search: params.term
                        };

                        return JSON.stringify(query);
                    };
                config.allowClear = true;
                config.minimumInputLength = 3;
                config.ajax = {
                    url: this.props.remoteUrl,
                    method: this.props.remoteMethod,
                    contentType: "application/json; charset=UTF-8",
                    data: beforeInvokeFn,
                    processResults: (data) => {
                        return {
                            results: processDataFn(data)
                        };
                    }
                };
            }
            else {
                //console.log(this.props.value);
                let selectItems: any[] = [];
                if (global.isSuccessful(this.props.items)) {
                    let data: any[] = global.getData(this.props.items);
                    //
                    if (!global.isEmptyObject(this.props.value) && this.props.value.ID) {
                        let idValue: any = this.props.value.ID;
                        //
                        let idExists: boolean = false;
                        data.forEach((value: any, index: number) => {
                            if (value.ID === idValue) {
                                idExists = true;
                            };
                        });

                        if (!idExists) {
                            let newItem: any = global.assign(this.props.value);
                            //
                            //console.log(this.props.value);
                            //data.push(this.props.value);
                        };
                    };
                    //
                    if (this.props.mode === SelectModeEnum.Multiple) {
                        config.multiple = true;
                    };
                    config.allowClear = false;
                    config.data = processDataFn(data);
                    config.matcher = (params: any, data: any) => {
                        let term: string = $.trim(params.term).toLowerCase();

                        if (term === "" || !data) {
                            return data;
                        };

                        let matchers: string[] = this.props.matchers;
                        if (matchers) {
                            let match: any = null;
                            for (var i = 0; i < matchers.length; i++) {
                                if (data.children && data.children.length > 0) {
                                    for (var j = 0; j < data.children.length; j++) {
                                        let v: string = data.children[j][matchers[i]];
                                        if (v) {
                                            v = v.toLowerCase();
                                            if (v.indexOf(term) > -1) {
                                                if (!match) {
                                                    match = global.assign(data, { children: [] });
                                                };
                                                match.children.push(data.children[j]);
                                            };
                                        };
                                    };
                                }
                                else {
                                    let v: string = data[matchers[i]];
                                    if (!v) {
                                        let column: any = matchers[i];
                                        let columnSplit: number = column.indexOf(".");
                                        if (columnSplit > 0) {
                                            v = global.getNestedProp(data, matchers[i])
                                        }

                                    }

                                    if (v) {
                                        v = v.toLowerCase();
                                        if (v.indexOf(term) > -1) {
                                            match = data;
                                        };
                                    };
                                };
                            };
                            return match;
                        };

                        return null;
                    };
                };
            };
            /*
            {
                language: "es",
                orientation: "left",
                format: "dd/mm/yyyy"
            }
            */

            select.select2(config);

            select.on("select2:select", (e: any) => {
                var data = e.params.data;

                this.onChange(data);

                //if (this.props.remoteMethod) {
                //    appendOption(data);
                //};
            });

            select.on("select2:unselect", (e: any) => {
                var data = e.params.data;
                this.onChange(null);
            });

            if (this.props.remoteUrl) {
                let newItem: any = processDataFn([this.props.value])[0];
                if (!newItem) {
                    newItem = {};
                };
                newItem.initItem = true;
                let newItemText: any = config.templateSelection(newItem);

                if (newItemText && newItemText.html) {
                    newItemText = $("<div></div>").append(newItemText).html();
                };

                var newOption = new Option(newItemText, "" + (newItem ? newItem.id : ""), false, false);
                select.append(newOption).trigger('change');
            }
            else {
                this.seleccionarItem();
            }
            //this.seleccionarItem();
        };
        removeSelect(): void {
            let select: any = $(this.refs.select);
            //
            select.select2('destroy');
            //
            select.find("option").remove();
            select.find("optgroup").remove();
            //
        };
        seleccionarItem(): void {
            let select: any = $(this.refs.select);
            let itemKey: string = this.props.itemKey.toString();
            let currentValue: any = (
                this.props.value !== undefined &&
                this.props.value !== null &&
                this.props.value[itemKey] !== undefined &&
                this.props.value[itemKey] !== null) ? this.props.value[itemKey].toString() : "";

            if (!this.props.value || this.props.value === null) {

                if (isSuccessful(this.props.items)) {
                    if (this.props.items.data.length > 0) {
                        let itemKey: string = this.props.itemKey.toString();
                        let item: any = {
                            currentTarget: {
                                value: $.trim(this.props.items.data[0][itemKey])
                            }
                        };

                        this.onChange(item);
                    };
                };
            };

            if (this.props.mode === SelectModeEnum.Multiple) {
                let v: any[] = this.props.value;
                if (v !== null && v != undefined) {
                    currentValue = v.map((value: any, index: number) => {
                        if (value) {
                            return value.ID + "";
                        }
                    });
                }
            }
            select.val(currentValue).trigger("change");
        };
        componentDidMount(): void {
            this.initSelect();
        };
        componentDidUpdate(): void {
            this.initSelect();
        };
        componentWillUnmount(): void {
            this.removeSelect();
        };
        componentWillUpdate(): void {
            this.removeSelect();
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps): any {
            if (this.props.remoteUrl) {
                if (global.hasChanged(this.props.value, nextProps.value) && !nextProps.value) {
                    let select: any = $(this.refs.select);
                    select.val(null).trigger('change');
                };
            };
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps, nextState: IDropDrownListState): boolean {
           // console.log(this.props.items, nextProps.items)
           // console.log(this.props.value, nextProps.value)
            //if (this.props.items && nextProps.items || (this.props.value !== nextProps.value)) {
            //    if (hasChangedArray(this.props.items.data, nextProps.items.data )) {
            //        return true;
            //    }
            //}

            if (hasChanged(this.props.items, nextProps.items) || (this.props.value !== nextProps.value)) {
                return true;
            };
            //if (!this.props.remoteUrl && this.props.mode !== SelectModeEnum.Multiple) {
            //    if (global.hasChanged(this.props.value, nextProps.value) ||
            //        this.props.hasChanged !== nextProps.hasChanged ||
            //        this.props.hasValidationError !== nextProps.hasValidationError ||
            //        this.props.validate !== nextProps.validate) {
            //        return true;
            //    };
            //};
            //if (this.props.mode === SelectModeEnum.Multiple && (!this.props.value && (nextProps.value !== null && nextProps.value != undefined))) {
            //    return true;
            //}
            return false;
        };
        onChange(e: any): any {
            let select: any = $(this.refs.select);
            let hasChanged: boolean = this.props.hasChanged;
            let currentValue: any;
            let hasValidationError: boolean = false;

            let itemKey: string = this.props.itemKey.toString();
            let selectedValue: string = null;
            let items: any[] = global.getData(this.props.items, []);
            //console.log(items);
            if (this.props.mode === SelectModeEnum.Multiple) {
                let selValues: any[] = select.val();
                //
                if (selValues && selValues.length > 0) {
                    // ID based
                    currentValue = [];
                    for (var i = 0; i < selValues.length; i++) {
                        let selID: number = parseInt(selValues[i]);
                        //
                        if (!isNaN(selID)) {
                            items.forEach((item: any, index: any) => {
                                let itemValue: number = item.ID;

                                if (itemValue === selID) {
                                    currentValue.push(item);
                                }
                            });
                        };
                    };
                } else {
                    currentValue = null;
                };
                hasChanged = true;
            }
            else {
                if (e) {
                    if (e.currentTarget && e.currentTarget.value) {
                        selectedValue = e.currentTarget.value;
                    }
                    else {
                        selectedValue = e.id.toString();
                    }
                };

                let itemFound: boolean = false;
                if (e) {
                    if (!this.props.items && e.ID > 0 || (typeof (e.ID) === "string" && e.ID !== undefined)) {
                        currentValue = e;
                        itemFound = true;
                    }
                    else {
                        items.forEach((item: any, index: any) => {
                            let itemValue: string = item[itemKey];

                            itemValue = (itemValue) ? itemValue.toString() : "";

                            if (itemValue === selectedValue) {
                                currentValue = item;
                                itemFound = true;
                            }
                        });
                    };
                };

                if (!currentValue) {
                    if (!hasChanged && currentValue !== this.props.initialValue) {
                        hasChanged = true;
                    };

                    if (this.props.required) {
                        hasValidationError = true;
                    }
                } else {
                    if (!hasChanged && (!this.props.initialValue || (currentValue[itemKey] !== this.props.initialValue[itemKey]))) {
                        hasChanged = true;
                    };
                }
            };
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: currentValue,
                    hasChanged: hasChanged,
                    initialValue: this.props.initialValue,
                    hasValidationError: hasValidationError,
                    validations: this.props.validations,
                });
            }

            if (this.props.change != undefined) {
                this.props.change(currentValue);
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
                    nextItem.focus();
                };
            };
        };
        render(): JSX.Element {
            let className: string = "form-control input-sm";
            let formControlId: string;
            let formGroupClass: string = "form-group";


            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
            };
            let required: boolean = false;
            let requiredPoint: any = "";
            let hasValidations: boolean = false;

            if (this.props.validations && this.props.validations.length > 0) {
                hasValidations = true;
                for (var i = 0; i < this.props.validations.length; i++) {
                    if (this.props.validations[i] && this.props.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            }

            if (this.props.hasValidationError === true || (required && (this.props.value == null || this.props.value.ID == null))) {
                //console.log(hasValidations, this.props)
                //if(this.props.)
                if (this.props.value === null) {
                    formGroupClass += " has-error";
                } else {
                    formGroupClass += " has-success";
                }
                //formGroupClass += " has-error";
                requiredPoint = [
                    hasValidations ? <i key="key-check" className="fa fa-exclamation"></i> : null,
                    required ? <i key="key-ast" className="fa fa-asterisk"></i> : null
                ];
            } else {
                //console.log(hasValidations, this.props)
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

            //if (this.props.value && this.props.value !== "") {
            className += " edited";
            //}

            let selectedOption: string = "";
            let options: any[] = [];
            let items: any[] = global.getData(this.props.items);
            let itemsProps: any = this.props.items;
            let that: ddl.IDropDrownListProps = this.props;

            if (items.length > 0 && items !== undefined) {
                items.forEach((item, i: number) => {
                    let itemId: string = "dd-key-" + i.toString();
                    let itemKey: any = that.itemKey;
                    let itemValue: string = item[itemKey] ? item[itemKey].toString() : "";
                    let itemDescription: string;
                    let currentValue: any = (
                        that.value !== undefined &&
                        that.value !== null &&
                        that.value[itemKey] !== undefined &&
                        that.value[itemKey] !== null) ? that.value[itemKey].toString() : "";

                    if (typeof that.itemValue === "function") {
                        itemDescription = that.itemValue(item);
                    } else {
                        itemDescription = item[that.itemValue] ? item[that.itemValue].toString() : "";
                    }

                    if (itemValue === currentValue) {
                        selectedOption = itemValue;
                    };

                    options.push(
                        <option
                            key={i}
                            value={itemValue}
                        // id={itemId}
                        >
                            {itemDescription}
                        </option>);
                });
            } else {
                itemsProps = global.createSuccessfulStoreObject([]);
            };

            //this.props.items && this.props.items.status === AsyncActionTypeEnum.loading
            let requiresAddOn: boolean = (this.props.buttonClick !== undefined);
            let buttonClass: string = "btn btn-success btn-sm";
            let buttonId: string = "btn_group_" + this.props.id;

            if (this.props.buttonClass) {
                buttonClass = this.props.buttonClass;
            };

            if (this.props.index >= 0) {
                return <select
                    className={className + " input-inline"}
                    id={formControlId + "_" + this.props.index}
                    name={formControlId + "_" + this.props.index}
                    data-source-remote={this.props.remoteUrl !== undefined && this.props.remoteUrl !== null}
                    onKeyDown={this.onKeyDown}
                    ref="select">
                </select>;
            }
            else {
                return <Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <UpdateColumn info={itemsProps} size={24} top={0} bottom={0}>
                        <div className={formGroupClass} style={this.props.style}>
                            <label htmlFor={formControlId}>
                                <span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span>
                            </label>
                            <div className="input-group">
                                <select
                                    className={className}
                                    id={formControlId}
                                    name={formControlId}
                                    data-source-remote={this.props.remoteUrl !== undefined && this.props.remoteUrl !== null}
                                    ref="select">
                                </select>
                                {requiresAddOn === true ?
                                    <span className="input-group-btn">
                                        <button id={buttonId} className={buttonClass} type="button" onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            let jqId: string = "#" + formControlId;

                                            this.props.buttonClick($(jqId).parent().find("button"), $(jqId), this.props);
                                        }}>
                                            <i className={!this.props.iconButton ? "fa fa-plus" : this.props.iconButton}></i>
                                        </button>
                                    </span> : null
                                }
                            </div>
                        </div>
                    </UpdateColumn>
                </Column>;
            };
        }
    }

    export class DropdownListForm extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
            this.seleccionarDefault = this.seleccionarDefault.bind(this);
            this.agregarNuevoElemento = this.agregarNuevoElemento.bind(this);
        };

        seleccionarDefault(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            let firstItem: any;

            if (isEmptyObject(element.value)) {
                if (isSuccessful(this.props.items)) {
                    if (this.props.items.data.length > 0 && !isEmptyObject(this.props.items.data[0])) {
                        element.value = this.props.items.data[0];

                        Forms.updateFormElement(idForm, Forms.getFormElement(idForm, element));
                        if (this.props.change) {
                            this.props.change(element.value);
                        };
                    };
                };
            };

            if (element.exists === false) {
                Forms.updateFormElement(idForm, element);
            } else {

            };
        };
        updateState(element: any): void {
            // console.log(element)
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;
            //
            if (this.props.onUpdateElement) {
                this.props.onUpdateElement(this.props, element);
            } else {
                //
                if (this.props.index >= 0) {
                    let aElement: IFormElement = Forms.getFormElement(idForm, { id: this.props.property });
                    let aElementValue: any[] = global.getData(aElement.value);
                    //
                    if (aElementValue && aElementValue.length > 0) {
                        let nElementValue: any = aElementValue.map((value: any, index: number) => {
                            return global.assign(value);
                        });
                        //
                        let value: any = global.assign(element.value);
                        let item: any = nElementValue[this.props.index];
                        if (item) {
                            item[this.props.id] = value;
                            item._modificado = true;
                            //
                            if (value.ID && value.ID > 0) {
                                item["Id" + this.props.id] = value.ID;
                            } else {
                                item["Id" + this.props.id] = undefined;
                            };
                            //
                            nElementValue[this.props.index] = item;
                            //
                            Forms.updateFormElement(idForm, this.props.property, global.createSuccessfulStoreObject(nElementValue));
                        };
                    };
                }
                else {
                    Forms.updateFormElement(idForm, element);
                };
            };
        };
        agregarNuevoElemento(items: any): any {
            let result: any = items;
            let opciones: any = {};
            opciones["VT"] = "Ver Todos";
            opciones["SO"] = "Seleccione una opción";
            //Si el primer elemento es negativo lo eliminamos
            // y si posteriormente lo requiere se lo asignamos
            for (var i = 0; i < items.length; i++) {
                if (items[i].ID == -1) {
                    items.splice(i, 1);
                    break;
                }
            }
            if (this.props.addNewItem != undefined) {
                let texto: string = this.props.addNewItemText != undefined ? this.props.addNewItemText : opciones[this.props.addNewItem];

                let nuevoItem: any = {};
                nuevoItem['ID'] = -1;
                nuevoItem['Clave'] = texto
                nuevoItem['Nombre'] = texto;
                nuevoItem['Descripcion'] = texto
                nuevoItem['Apellidos'] = "";
                items.unshift(nuevoItem);
            }
            result = items;
            return result;
        }
        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            let firstItemSelected: boolean = false;

            if (isEmptyObject(element.value)) {
                if (isSuccessful(this.props.items)) {
                    if (this.props.items.data.length > 0 && !isEmptyObject(this.props.items.data[0])) {
                        if (this.props.mode !== SelectModeEnum.Multiple) {
                            element.value = this.props.items.data[0];
                            if (this.props.change) {
                                this.props.change(element.value);
                            };
                        }
                        else {
                            element.value = element.value;
                            if (this.props.change) {
                                this.props.change(element.value);
                            };
                        }
                        firstItemSelected = true;
                    };
                };
            };

            let index: any = this.props.index;
            if ((element.exists === false || (element.exists === true && firstItemSelected)) && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(idForm, element);
            };
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;
            let element: IFormElement = Forms.getFormElement(nextIdForm, nextProps);

            let index: any = nextProps.index;
            if ((element.exists === false || hasChanged(this.props.items, nextProps.items)) && !(parseInt(index) >= 0)) {
                if (isEmptyObject(element.value)) {
                    if (isSuccessful(nextProps.items)) {
                        if (nextProps.items.data.length > 0 && !isEmptyObject(nextProps.items.data[0]) && this.props.mode !== SelectModeEnum.Multiple) {

                            nextProps.items.data = this.agregarNuevoElemento(nextProps.items.data);
                            element.value = nextProps.items.data[0];
                            if (this.props.change) {
                                this.props.change(element.value);
                            };
                        };

                    };
                };

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
                            if (element.value && element.value.constructor.name === "String") {
                                element.value = JSON.parse(element.value);
                            };
                        };
                    };
                }
                else {
                    element = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));
                };

                if (element && element.items && element.items.data && element.items.data.length > 0) {
                    element.items.data = this.agregarNuevoElemento(element.items.data);
                }
                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <DropdownList {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let DropdownList$Form: any = ReactRedux.connect(Forms.props, null)(DropdownListForm);


    export class DropdownListFormV2 extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
            this.seleccionarDefault = this.seleccionarDefault.bind(this);
            this.agregarNuevoElemento = this.agregarNuevoElemento.bind(this);
        };

        seleccionarDefault(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            let firstItem: any;

            if (isEmptyObject(element.value)) {
                if (isSuccessful(this.props.items)) {
                    if (this.props.items.data.length > 0 && !isEmptyObject(this.props.items.data[0])) {
                        element.value = this.props.items.data[0];

                        Forms.updateFormElement(idForm, Forms.getFormElement(idForm, element));
                        if (this.props.change) {
                            this.props.change(element.value);
                        };
                    };
                };
            };

            if (element.exists === false) {
                Forms.updateFormElement(idForm, element);
            } else {

            };
        };
        updateState(element: any): void {
            // console.log(element)
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;
            //
            if (this.props.onUpdateElement) {
                this.props.onUpdateElement(this.props, element);
            } else {
                //
                if (this.props.index >= 0) {
                    let aElement: IFormElement = Forms.getFormElement(idForm, { id: this.props.property });
                    let aElementValue: any[] = global.getData(aElement.value);
                    //
                    if (aElementValue && aElementValue.length > 0) {
                        let nElementValue: any = aElementValue.map((value: any, index: number) => {
                            return global.assign(value);
                        });
                        //
                        let value: any = global.assign(element.value);
                        let item: any = nElementValue[this.props.index];
                        if (item) {
                            item[this.props.id] = value;
                            item._modificado = true;
                            //
                            if (value.ID && value.ID > 0) {
                                item["Id" + this.props.id] = value.ID;
                            } else {
                                item["Id" + this.props.id] = undefined;
                            };
                            //
                            nElementValue[this.props.index] = item;
                            //
                            Forms.updateFormElement(idForm, this.props.property, global.createSuccessfulStoreObject(nElementValue));
                        };
                    };
                }
                else {
                    Forms.updateFormElement(idForm, element);
                };
            };
        };
        agregarNuevoElemento(items: any): any {
            let result: any = items;
            let opciones: any = {};
            opciones["VT"] = "Ver Todos";
            opciones["SO"] = "Seleccione una opción";
            //Si el primer elemento es negativo lo eliminamos
            // y si posteriormente lo requiere se lo asignamos
            for (var i = 0; i < items.length; i++) {
                if (items[i].ID == -1) {
                    items.splice(i, 1);
                    break;
                }
            }
            if (this.props.addNewItem != undefined) {
                let texto: string = this.props.addNewItemText != undefined ? this.props.addNewItemText : opciones[this.props.addNewItem];

                let nuevoItem: any = {};
                nuevoItem['ID'] = -1;
                nuevoItem['Clave'] = texto
                nuevoItem['Nombre'] = texto;
                nuevoItem['Descripcion'] = texto
                nuevoItem['Apellidos'] = "";
                items.unshift(nuevoItem);
            }
            result = items;
            return result;
        }
        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            let firstItemSelected: boolean = false;

            if (isEmptyObject(element.value)) {
                if (isSuccessful(this.props.items)) {
                    if (this.props.items.data.length > 0 && !isEmptyObject(this.props.items.data[0])) {
                        if (this.props.mode !== SelectModeEnum.Multiple) {
                            element.value = this.props.items.data[0];
                            if (this.props.change) {
                                this.props.change(element.value);
                            };
                        }
                        else {
                            element.value = element.value;
                            if (this.props.change) {
                                this.props.change(element.value);
                            };
                        }
                        firstItemSelected = true;
                    };
                };
            };

            let index: any = this.props.index;
            if ((element.exists === false || (element.exists === true && firstItemSelected)) && !(parseInt(index) >= 0)) {
                Forms.updateFormElement(idForm, element);
            };
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;
            let element: IFormElement = Forms.getFormElement(nextIdForm, nextProps);

            let index: any = nextProps.index;
            if ((element.exists === false || hasChanged(this.props.items, nextProps.items)) && !(parseInt(index) >= 0)) {
                if (isEmptyObject(element.value)) {
                    if (isSuccessful(nextProps.items)) {
                        if (nextProps.items.data.length > 0 && !isEmptyObject(nextProps.items.data[0]) && this.props.mode !== SelectModeEnum.Multiple) {

                            nextProps.items.data = this.agregarNuevoElemento(nextProps.items.data);
                            element.value = nextProps.items.data[0];
                            if (this.props.change) {
                                this.props.change(element.value);
                            };
                        };

                    };
                };

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
                            if (element.value && element.value.constructor.name === "String") {
                                element.value = JSON.parse(element.value);
                            };
                        };
                    };
                }
                else {
                    element = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));
                };

                if (element && element.items && element.items.data && element.items.data.length > 0) {
                    element.items.data = this.agregarNuevoElemento(element.items.data);
                }
                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <DropdownListMultiSelect {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let DropdownList$FormV2: any = ReactRedux.connect(Forms.props, null)(DropdownListFormV2);

    const $ItemFormatter: (item, container) => any = (item, container): any => {
        if (!item.id) {
            return $(item.text);
        } else if (item.id == -1) {
            return $([
                "<span style='font-size: 90%'>",
                item.Nombre ? item.Nombre : "",
                "</span>"].join(""));
        };
        return $([
            "<span class='badge badge-info'>", item.Clave, "</span> ",
            "<span style='font-size: 90%'> ", item.Nombre, "</span>"
        ].join(""));
    };

    const $SelectionFormatter: (item) => any = (item): any => {
        if (!item.id) {
            return item.text;
        } else if (item.id == -1) {
            return $([
                "<span style='font-size: 90%'>",
                item.Nombre ? item.Nombre : "",
                "</span>"].join(""));
        };
        return $([
            "<span class='badge badge-info'>", item.Clave, "</span> ",
            "<span style='font-size: 90%'> ", item.Nombre, "</span>"
        ].join(""));
    };

    export class AreasOrganizacion$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.AREASORGANIZACION
        });



        static defaultProps: IDropDrownListProps = {
            id: "IdTipoAvance",
            label: "Área Organización",
            helpLabel: "Seleccione el área",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::AREASORGANIZACION", "catalogos/get(AREASORGANIZACION)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class TipoObra$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoObra
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoObra",
            label: "Tipo Obra",
            helpLabel: "Seleccione un Tipo de Obra",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scco", "TipoObra", { activos: 1 });
                dispatchAsync("load::TipoObra", url);
                //dispatchAsync("load::TipoObra", "catalogos/get(TipoObra)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };


    export class TipoExpediente$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TiposExpediente
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoExpediente",
            label: "Tipo de Expediente",
            helpLabel: "Seleccione un Tipo de Expediente",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TiposExpediente", { activos: 1 });
                dispatchAsync("load::TiposExpediente", url);
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };


    //export class TipoComision$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
    //    static props: any = (state: any) => ({
    //        items: state.global.TmComisiones
    //    });

    //    static defaultProps: IDropDrownListProps = {
    //        id: "TipoComision",
    //        label: "Tipo Comisión",
    //        helpLabel: "Seleccione un Tipo de Comision",
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        required: false,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        size: [12, 12, 12, 12]
    //    };

    //    componentDidMount(): void {
    //        if (!isLoadingOrSuccessful(this.props.items)) {
    //            let url: string = global.encodeAllURL("scv", "TmComisiones", { activos: 1 });
    //            dispatchAsync("load::TmComisiones", url);
    //            //dispatchAsync("load::TipoObra", "catalogos/get(TipoObra)");
    //        };
    //    };

    //    render(): any {
    //        return <DropdownList$Form {...this.props} />;
    //    };
    //};

    export let TipoComisionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TmComisiones
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoComision",
            items: createDefaultStoreObject([]),
            label: "Tipo Comisión Complementaria",
            helpLabel: "Seleccione un Tipo de Comision",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            addNewItem: undefined,
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TmComisiones", { activos: 1 });
                dispatchAsync("load::TmComisiones", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }

    });

    export let MotivosCancelacionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.motivoscancelacion
        });
        static defaultProps: IDropDrownListProps = {
            id: "MotivoCancelacion",
            items: createDefaultStoreObject([]),
            label: "Motivo Cancelación",
            helpLabel: "Seleccione un Motivo de Cancelación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            addNewItem: undefined,
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "motivoscancelacion", { activos: 1 });
                dispatchAsync("load::motivoscancelacion", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }

    });

    export let MotivosSuspencionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.motivosuspension
        });
        static defaultProps: IDropDrownListProps = {
            id: "MotivoSuspension",
            items: createDefaultStoreObject([]),
            label: "Motivo Suspension",
            helpLabel: "Seleccione un Motivo de Suspension",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            addNewItem: undefined,
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "motivosuspension", { activos: 1 });
                dispatchAsync("load::motivosuspension", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }

    });

    export class MotivosReanudacion$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.motivoreanudacion
        });

        static defaultProps: IDropDrownListProps = {
            id: "MotivoReanudacion",
            label: "Opciones Motivo Reanudación",
            helpLabel: "Seleccione un Motivo Reanudación",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::motivoreanudacion", "catalogos/get(motivoreanudacion)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export let MotivosReanudacionDDL: any =
        ReactRedux.connect(MotivosReanudacion$DDL.props, null)(MotivosReanudacion$DDL);
    //export let DocumentosCategoriaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
    //    static props: any = (state: any) => ({
    //        items: state.global.DocumentoCategorias
    //    });
    //    static defaultProps: IDropDrownListProps = {
    //        id: "DocumentosCategoria",
    //        items: createDefaultStoreObject([]),
    //        label: "Documentos Categoria",
    //        helpLabel: "Seleccione un Documento Categoria",
    //        value: createDefaultStoreObject({}),
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        required: false,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        size: [12, 3, 3, 3],
    //        nuevoItem: undefined,
    //        addNewItem: undefined,
    //    };

    //    componentDidMount(): void {
    //        if (!isLoadingOrSuccessful(this.props.items)) {
    //            let url: string = global.encodeAllURL("scv", "DocumentoCategorias", { activos: 1 });
    //            dispatchAsync("load::DocumentoCategorias", url);
    //        };
    //    };
    //    render(): any {
    //        return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
    //    }

    //});

    export class TipoInsumo$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoInsumo
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoInsumo",
            label: "Tipo Insumo",
            helpLabel: "Seleccione un Tipo de Insumo",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scco", "TipoInsumo", { activos: 1 });
                global.dispatchAsync("load::TipoInsumo", url);
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    interface ISCCOInsumosDDLProps extends IDropDrownListProps {
        clasificacion?: string;
    };

    class SCCOInsumos$DDL extends React.Component<ISCCOInsumosDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Insumos
        });
        static defaultProps: ISCCOInsumosDDLProps = {
            id: "Insumo",
            label: "Insumo",
            helpLabel: "Seleccione un Insumo",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            clasificacion: "ALL",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='" + item.Clasificacion.Icono + "' style='color:" + item.Clasificacion.Color + ";'></i></span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='" + item.Clasificacion.Icono + "' style='color:" + item.Clasificacion.Color + ";'></i></span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            let url: string = global.encodeAllURL("scco", "Insumos", { activos: 1 });
            global.dispatchAsync("load::Insumos", url);
        };
        render(): any {
            let items: any = this.props.items;
            //
            let clasificacion: string = this.props.clasificacion;
            if (clasificacion && clasificacion !== "ALL") {
                let data: any[] = global.getData(this.props.items, []);
                if (data && data.length > 0) {
                    data = data.filter((d) => { return d.Clasificacion.Clave === clasificacion; });
                };
                //
                items = global.assign(this.props.items, { data });
            };
            //
            return <DropdownList$Form {...this.props} items={items} />;
        };
    };

    class SCCOInsumosMaterial$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.insumos$materiales
        });
        static defaultProps: IDropDrownListProps = {
            id: "Insumo",
            label: "Insumo",
            helpLabel: "Seleccione un Insumo",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };

                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='fad fa-cube' style='color: #659be0;'></i></span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };

                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='fad fa-cube' style='color: #659be0;'></i></span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            let url: string = global.encodeAllURL("scco", "InsumosMateriales", { activos: 1 });
            global.dispatchAsync("load::insumos$materiales", url);
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    class SCCOTarjetas$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.insumos$tarjetas
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tarjeta",
            label: "Tarjeta",
            helpLabel: "Seleccione una Tarjeta",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };

                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='fad fa-cubes' style='color: #ffab40;'></i></span> ",
                    "<span class='badge badge-success'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };

                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='fad fa-cubes' style='color: #ffab40;'></i></span> ",
                    "<span class='badge badge-success'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            let url: string = global.encodeAllURL("scco", "InsumosTarjetas", { activos: 1 });
            global.dispatchAsync("load::insumos$tarjetas", url);
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const SCCOInsumosDDL: any =
        ReactRedux.connect(SCCOInsumos$DDL.props, null)(SCCOInsumos$DDL);
    export const SCCOInsumosMaterialDDL: any =
        ReactRedux.connect(SCCOInsumosMaterial$DDL.props, null)(SCCOInsumosMaterial$DDL);
    export const SCCOTarjetasDDL: any =
        ReactRedux.connect(SCCOTarjetas$DDL.props, null)(SCCOTarjetas$DDL);

    //export class SCCOInsumosMateriales$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
    //    static props: any = (state: any) => ({
    //        items: state.global.InsumosMateriales
    //    });
    //    static defaultProps: IDropDrownListProps = {
    //        id: "InsumosMateriales",
    //        label: "Insumos",
    //        helpLabel: "Seleccione un Insumo",
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        required: false,
    //        itemKey: "IdInsumo",
    //        itemValue: "Nombre",
    //        size: [12, 12, 12, 12],
    //        itemFormatter: (item, container): any => {
    //            if (!item.id) {
    //                return $(item.text);
    //            };             
    //                return $([
    //                    "<span class='badge badge-Primary bold'>", item.ClaveInsumo, "</span> ",
    //                    "<span class='bold' style='font-size: 90%'> ", item.Nombre, "</span>"
    //                ].join(""));
    //},
    //        selectionFormatter: (item): any => {
    //            if (!item.id) {
    //                return item.text;
    //            };
    //                return $([
    //                    "<span class='badge badge-Primary bold'>", item.ClaveInsumo, "</span> ",
    //                    "<span class='bold' style='font-size: 90%'> ", item.Nombre, "</span>"
    //                ].join(""));

    //        }
    //    };
    //    componentDidMount(): void {
    //        if (!global.isLoadingOrSuccessful(this.props.items)) {
    //            let url: string = global.encodeAllURL("scco", "InsumosMateriales", { activos: 1 });
    //            global.dispatchAsync("load::InsumosMateriales", url);
    //        };
    //    };
    //    render(): any {
    //        return <DropdownList$Form {...this.props} />;
    //    };
    //};

    class Impuesto$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Impuestos
        });
        static defaultProps: IDropDrownListProps = {
            id: "IdImpuesto",
            label: "Impuesto",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione el Impuesto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));
                }
                else {
                    return $([
                        "<span>",
                        item.Clave + " ( " + item.Porcentaje + " % )",
                        "</span>",
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return item.text;

                return $([
                    "<span>",
                    item.Clave + " ( " + item.Porcentaje + " % ) ",
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "Impuestos", { activos: 1 });
                dispatchAsync("load::Impuestos", url);
            };
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };


    export class GrupoInsumo$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.GrupoInsumo
        });
        static defaultProps: IDropDrownListProps = {
            id: "GrupoInsumo",
            label: "Grupo Insumo",
            helpLabel: "Seleccione un Grupo de Insumo",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                //let url: string = global.encodeAllURL("scco", "GrupoInsumo", { activos: 1 });
                //global.dispatchAsync("load::GrupoInsumo", url);
                global.dispatchSuccessful("load::GrupoInsumo", []);
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class UnidadMedida$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.UnidadMedida
        });
        static defaultProps: IDropDrownListProps = {
            id: "UnidadMedida",
            label: "Unidad Medida",
            helpLabel: "Seleccione la Unidad de Medida",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "UnidadMedida", { activos: 1 });
                global.dispatchAsync("load::UnidadMedida", url);
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class OpcionesTipoAvance$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESTIPOAVANCE
        });

        static defaultProps: IDropDrownListProps = {
            id: "IdTipoAvance",
            label: "Opciones Tipo Avance",
            helpLabel: "Seleccione el Tipo Avance",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OPCIONESTIPOAVANCE", "catalogos/get(OPCIONESTIPOAVANCE)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class OpcionesTipoImpuesto$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESTIMP
        });

        static defaultProps: IDropDrownListProps = {
            id: "IdTipoImpuesto",
            label: "Tipo Impuesto",
            helpLabel: "Seleccione el Tipo Impuesto",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OPCIONESTIMP", "catalogos/get(OPCIONESTIMP)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };



    export class PresupuestoGrupoInsumo$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESPRES
        });
        static defaultProps: IDropDrownListProps = {
            id: "PresupuestoGrupoInsumo",
            label: "Presupuesto Insumo",
            helpLabel: "Seleccione el Tipo Presupuesto Insumo",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::OPCIONESPRES", "catalogos/get(OPCIONESPRES)");
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class Estatus$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUS
        });

        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            label: "Estatus",
            helpLabel: "Seleccione el Estatus",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $(["<span style='font-size: 90%'>", item.Nombre ? item.Nombre : "", "</span>"].join(""));
                };

                return $([
                    "<span class='badge badge-info'>", item.Nombre, "</span> ",
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $(["<span style='font-size: 90%'>", item.Nombre ? item.Nombre : "", "</span>"].join(""));
                };

                return $([
                    "<span class='badge badge-info'>", item.Nombre, "</span> ",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUS", "catalogos/get(ESTATUS)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class ValidaPresupuesto$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESVALPRESU
        });
        static defaultProps: IDropDrownListProps = {
            id: "ValidaPresupuesto",
            label: "Valida Presupuesto",
            helpLabel: "Seleccione el Tipo Valida Presupuesto",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::OPCIONESVALPRESU", "catalogos/get(OPCIONESVALPRESU)");
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class InventariadoGrupoInsumo$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESINVENTARIADO
        });
        static defaultProps: IDropDrownListProps = {
            id: "InventariadoGrupoInsumo",
            label: "Tipo Inventariado",
            helpLabel: "Seleccione el Tipo Inventariado",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::OPCIONESINVENTARIADO", "catalogos/get(OPCIONESINVENTARIADO)");
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    class SCCOEstatusObra$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESESTADO
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstadoObra",
            label: "Estatus Obra",
            helpLabel: "Seleccione el Estatus de la Obra",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OPCIONESESTADO", "catalogos/get(OPCIONESESTADO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const EstatusTarea = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTADOTAREA
        });

        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            label: "Estatus",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTADOTAREA", "catalogos/get(ESTADOTAREA)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const PrioridadTarea = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.PRIORIDADTAREA
        });
        static defaultProps: IDropDrownListProps = {
            id: "Prioridad",
            label: "Prioridad",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PRIORIDADTAREA", "catalogos/get(PRIORIDADTAREA)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const EstatusProyecto = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSPROYECTOSGP
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusProyecto",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSPROYECTOSGP", "catalogos/get(ESTATUSPROYECTOSGP)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const FlujoAvanceTareaSgp = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.FLUJOAVANCETAREASGP
        });
        static defaultProps: IDropDrownListProps = {
            id: "FlujoAvance",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::FLUJOAVANCETAREASGP", "catalogos/get(FLUJOAVANCETAREASGP)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const EstatusChecklistSpv = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSCHECKLISTSPV
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusChecklist",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::ESTATUSCHECKLISTSPV", "catalogos/get(ESTATUSCHECKLISTSPV)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const PrioridadTareaSgp = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.PRIORIDADTAREASGP
        });
        static defaultProps: IDropDrownListProps = {
            id: "Prioridad",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            itemFormatter: (item, container): any => {
                if (item.id) {
                    return $([
                        "<span style='color: ",
                        item.BGColor,
                        ";'>",
                        "<i class='", item.Icono, "' style='color: ", item.BGColor, "'></i>",
                        "</span>",
                        "<span> ",
                        item.Nombre,
                        "</span> "].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (item.id) {
                    return $([
                        "<span style='color: ",
                        item.BGColor,
                        ";'>",
                        "<i class='", item.Icono, "' style='color: ", item.BGColor, "'></i>",
                        "</span>",
                        "<span> ",
                        item.Nombre,
                        "</span> "].join(""));
                }
            },
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PRIORIDADTAREASGP", "catalogos/get(PRIORIDADTAREASGP)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const TipoAvanceTareaSgp = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOAVANCETAREASGP
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoAvance",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOAVANCETAREASGP", "catalogos/get(TIPOAVANCETAREASGP)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const TipoVisualizacion = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOVISUALIZACIONPROYECTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusProyecto",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOVISUALIZACIONPROYECTO", "catalogos/get(TIPOVISUALIZACIONPROYECTO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export const TipoObraDDL: any =
        ReactRedux.connect(TipoObra$DDL.props, null)(TipoObra$DDL);
    export const TipoExpedienteDDL: any =
        ReactRedux.connect(TipoExpediente$DDL.props, null)(TipoExpediente$DDL);
    //export const TipoComisionDDL: any =
    //    ReactRedux.connect(TipoComision$DDL.props, null)(TipoComision$DDL);

    export const TipoInsumoDDL: any =
        ReactRedux.connect(TipoInsumo$DDL.props, null)(TipoInsumo$DDL);
    //export const SCCOInsumosDDL: any =
    //    ReactRedux.connect(SCCOInsumos$DDL.props, null)(SCCOInsumos$DDL);
    export const GrupoInsumoDDL: any =
        ReactRedux.connect(GrupoInsumo$DDL.props, null)(GrupoInsumo$DDL);
    export const UnidadMedidaDDL: any =
        ReactRedux.connect(UnidadMedida$DDL.props, null)(UnidadMedida$DDL);
    export const ImpuestoDDL: any =
        ReactRedux.connect(Impuesto$DDL.props, null)(Impuesto$DDL);
    export let AreasOrganizacionDDL: any =
        ReactRedux.connect(AreasOrganizacion$DDL.props, null)(AreasOrganizacion$DDL);

    export let OpcionesTipoAvanceDDL: any =
        ReactRedux.connect(OpcionesTipoAvance$DDL.props, null)(OpcionesTipoAvance$DDL);

    export let OpcionesTipoImpuestoDDL: any =
        ReactRedux.connect(OpcionesTipoImpuesto$DDL.props, null)(OpcionesTipoImpuesto$DDL);

    export let InventariadoGrupoInsumoDDL: any =
        ReactRedux.connect(InventariadoGrupoInsumo$DDL.props, null)(InventariadoGrupoInsumo$DDL);
    export let PresupuestoGrupoInsumoDDL: any =
        ReactRedux.connect(PresupuestoGrupoInsumo$DDL.props, null)(PresupuestoGrupoInsumo$DDL);
    export let EstatusDDL: any =
        ReactRedux.connect(Estatus$DDL.props, null)(Estatus$DDL);
    export let ValidaPresupuestoDDL: any =
        ReactRedux.connect(ValidaPresupuesto$DDL.props, null)(ValidaPresupuesto$DDL);

    export let SCCOEstatusObraDDL: any =
        ReactRedux.connect(SCCOEstatusObra$DDL.props, null)(SCCOEstatusObra$DDL);

    /// Ambito DDLFilter
    export interface IAmbitoFilterDDLProps extends IDropDrownListProps {
        cargaDatos?: () => void;
    }

    export class AmbitoFilterDDL extends React.Component<IAmbitoFilterDDLProps, IDropDrownListState> {
        constructor(props: IAmbitoFilterDDLProps) {
            super(props);
        }

        static defaultProps: IDropDrownListProps = {
            id: "Ambito",
            items: createDefaultStoreObject([]),
            label: "Ámbito",
            helpLabel: "Seleccione el ámbito",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined,
        };

        refs: {
            ddl: Element;
            requiredPoint: Element;
        }

        componentDidMount(): void {
            this.props.cargaDatos();
        };

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);
            let $page: any = $ml["parametros"];
            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={$page.consulta.filtros.ambito}
                style={style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }

    const ambitoDDLFilterMapProps: any = (state: any): any => {
        return {
            value: state.global.ambito,
            items: state.global.ambitos
        };
    }

    const ambitoDDLFilterMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            change: (item: any): void => {
                dispatchDefault("ambito-global-selected", item);
            },
            cargaDatos: (item: any): void => {
                dispatchAsync("ambitos-kv", "catalogos/get(ambito)");
            }
        };
    };

    export let ambitoDDLFilter: any = ReactRedux.connect(ambitoDDLFilterMapProps, ambitoDDLFilterMapDispatchs)(AmbitoFilterDDL);
    /// Ambito Filter

    /// Filtro de DDLModulos
    export interface ICompaniasFilterDDLProps extends IDropDrownListProps {
        cargaDatos?: () => void;
    }

    export class CompaniasFilterDDL extends React.Component<ICompaniasFilterDDLProps, IDropDrownListState> {
        constructor(props: IModuloFilterDDLProps) {
            super(props);
        }

        static defaultProps: IDropDrownListProps = {
            id: "Compania",
            items: createDefaultStoreObject([]),
            label: "Compañía",
            helpLabel: "Seleccione la compañía",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };

        refs: {
            ddl: Element;
            requiredPoint: Element;
        }

        componentDidMount(): void {
            this.props.cargaDatos();
        };

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);
            let $page: any = $ml["parametros"];
            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={$page.consulta.filtros.compania}
                style={style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }

    //const companiasProps: any = (state: any): any => {
    //    return { items: state.dropdownlistdata };
    //}

    const companiaDDLFilterMapProps: any = (state: any): any => {
        return {
            value: state.global.clientecompania,
            items: state.global.clientescompanias,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='bandera-", item.Clave, "'></span>",
                        "<span class='badge badge-info'>", item.Clave, "</span>",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bandera-", item.Clave, "'></span>",
                    "<span class='badge badge-info'>", item.Clave, "</span>",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
        };
    }

    const companiaDDLFilterMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            change: (item: any): void => {
                dispatchDefault("clientecompania-global-selected", item);
            },
            cargaDatos: (item: any): void => {
                //dispatchAsync("clientescompanias-kv", "companias(1/0)");
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("clientescompanias-kv", "base/kontrol/companias/Get/GetAll/" + encodedFilters);
            }
        };
    }

    export let companiasDDLFilter: any = ReactRedux.connect(companiaDDLFilterMapProps, companiaDDLFilterMapDispatchs)(CompaniasFilterDDL);
    /// Filtro de Módulos

    /// Filtro de DDLModulos
    export interface IModuloFilterDDLProps extends IDropDrownListProps {
        cargaDatos?: () => void;
    }

    //export class ModuloFilterDDL extends React.Component<IModuloFilterDDLProps, IDropDrownListState> {
    //    constructor(props: IModuloFilterDDLProps) {
    //        super(props);
    //    }



    //    static defaultProps: IDropDrownListProps = {
    //        id: "Modulo",
    //        items: createDefaultStoreObject([]),
    //        label: "Módulo",
    //        helpLabel: "Seleccione el módulo",
    //        value: undefined,
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        required: false,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        size: undefined
    //    };

    //    refs: {
    //        ddl: Element;
    //        requiredPoint: Element;
    //    }

    //    componentDidMount(): void {
    //        this.props.cargaDatos();
    //    };

    //    render(): any {
    //        let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
    //        let style: React.CSSProperties = EK.Global.assign({}, this.props.style);
    //        let $page: any = $ml["parametros"];
    //        return <DropdownList
    //            id={this.props.id}
    //            items={this.props.items}
    //            label={$page.consulta.filtros.modulo}
    //            style={style}
    //            size={this.props.size}
    //            helpLabel={this.props.helpLabel}
    //            itemValue={this.props.itemValue}
    //            itemKey={this.props.itemKey}
    //            value={value}
    //            change={this.props.change} />;
    //    }
    //}

    //const moduloProps: any = (state: any): any => {
    //    return { items: state.dropdownlistdata };
    //}

    //const moduloFDDLilterMapProps: any = (state: any): any => {
    //    return {
    //        value: state.global.clientemodulo,
    //        items: state.global.clientesmodulos
    //    };
    //}

    //const moduloDDLFilterMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
    //    return {
    //        change: (item: any): void => {
    //            dispatchDefault("clientemodulo-global-selected", item);
    //        },
    //        cargaDatos: (item: any): void => {
    //            dispatchAsync("clientesmodulos-kv", "Clientes/GetModulos");
    //        }
    //    };
    //}

    //export let moduloDDLFilter: any = ReactRedux.connect(moduloFDDLilterMapProps, moduloDDLFilterMapDispatchs)(ModuloFilterDDL);
    /// Filtro de Módulos

    // DDLClasificadores

    // Filtro de DDL Centro de Costos 
    export interface ICCFilterDDLProps extends IDropDrownListProps {
        cargaDatos?: () => void;
    }

    export class CCFilterDDL extends React.Component<ICCFilterDDLProps, ICCFilterDDLProps> {
        constructor(props: ICCFilterDDLProps) {
            super(props);
        }

        static defaultProps: IDropDrownListProps = {
            id: "CC",
            items: createDefaultStoreObject([]),
            label: "Centro de Costo",
            helpLabel: "Seleccione el centro de costo",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };

        refs: {
            ddl: Element;
            requiredPoint: Element;
        }

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);

            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={this.props.label}
                style={style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }

    const CCddlMapProps: any = (state: any): any => {
        return {
            value: state.chequesautomaticos.centrocosto,
            items: state.chequesautomaticos.centrocostos
        };
    }

    const CCddlMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            change: (item: any): void => {
                dispatchDefault("chequesautomaticos-centrocosto", item);
            }
        };
    };

    export let ccDDLFilter: any = ReactRedux.connect(CCddlMapProps, CCddlMapDispatchs)(CCFilterDDL);

    // Filtro DDL tipo de cheque 
    export class tipoChequeFilterDDL extends React.Component<IDropDrownListProps, IDropDrownListProps> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static defaultProps: IDropDrownListProps = {
            id: "Cuenta",
            items: createDefaultStoreObject([]),
            label: "Cuenta",
            helpLabel: "Seleccione el tipo de Cheque",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: undefined
        };

        refs: {
            ddl: Element;
            requiredPoint: Element;
        }

        componentDidUpdate(): any {
            if (this.props.value && this.props.value.data && this.props.value.data.ID) { }
            else {
                if (this.props.items && this.props.items.data && this.props.items.data.length > 0) {
                    this.props.change(this.props.items.data[0]);
                }
            }
        }

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);

            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={this.props.label}
                style={style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }

    const tipoChequeddlMapProps: any = (state: any): any => {
        return {
            value: state.global.selected,
            items: state.cuentabancaria.cuentabancaria
        };
    }

    const tipoChequeddlMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            //change: (item: any): void => {
            //    dispatchDefault("Bancos-setSelected", item);
            //}
        };
    };

    export let tipoChequeDDLFilter: any = ReactRedux.connect(tipoChequeddlMapProps, tipoChequeddlMapDispatchs)(tipoChequeFilterDDL);
    // Filtro DDL tipo de cheque 

    // Filtro Bancos 
    export interface IBancoDDLProps extends IDropDrownListProps {
        compania?: any;
    }


    // Filtro Bancos 

    //
    export class Puestos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any): IDropDrownListProps => {
            return { items: state.posiciones.puestos };
        };

        static defaultProps: IDropDrownListProps = {
            id: "Puesto",
            label: "Puesto",
            helpLabel: "Seleccione el puesto",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "Puestos", { activos: 1 });
                dispatchAsync("puestos-catalogo", url);
            };
        };

        componentWillReceiveProps(nextProps: IDropDrownListProps): void { };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const PuestosDDL: any =
        ReactRedux.connect(Puestos$DDL.props, null)(Puestos$DDL);
    //

    export class BancoFilter$DDL extends React.Component<IBancoDDLProps, IBancoDDLProps> {
        static props: any = (state: any): IBancoDDLProps => {
            return {
                items: state.bancos.Bancos

            };
        };
        constructor(props: IBancoDDLProps) {
            super(props);

            //this.state = { compania: props.compania };
            this.state = { compania: Forms.getFormElement(this.props.idFormSection, { id: "Compania" }) }
        }
        static defaultProps: IDropDrownListProps = {
            id: "Banco",
            items: createDefaultStoreObject([]),
            label: "Banco",
            helpLabel: "Seleccione el banco",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: undefined
        };

        componentWillReceiveProps(nextProps: IBancoDDLProps): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, { id: "Compania" });

            if (!isEmptyObject(element.value)) {
                if (element.value.ID != this.state
                    .compania.ID) {
                    this.setState(
                        { compania: element.value }
                    );

                    dispatchAsync("Bancos-catalogo", "bancos/compania/" + element.value.ID);
                };
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    }

    export let BancoDDLFilter: any = ReactRedux.connect(BancoFilter$DDL.props, null)(BancoFilter$DDL);
    // Filtro Cuenta Bancaria 
    export interface ICuentaBancariaDDLProps extends IDropDrownListProps {
        banco?: any;
        compania?: any;
        obtenerDatos?: (clave: number, compania: number) => any;
        extrafn?: (cta: any) => Function;
    }
    export class CuentaBancariaFilterDDL extends React.Component<ICuentaBancariaDDLProps, ICuentaBancariaDDLProps> {
        static props: any = (state: any): ICuentaBancariaDDLProps => {
            return {
                items: state.cuentabancaria.cuentabancaria

            };
        };
        constructor(props: ICuentaBancariaDDLProps) {
            super(props);
            this.state = { compania: Forms.getFormElement(this.props.idFormSection, { id: "Compania" }) }
            this.state = { banco: Forms.getFormElement(this.props.idFormSection, { id: "Banco" }) }
        }

        static defaultProps: IDropDrownListProps = {
            id: "CuentaBancaria",
            items: createDefaultStoreObject([]),
            label: "Cuenta Bancaria",
            helpLabel: "Seleccione la cuenta bancaria",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: undefined
        };


        componentWillReceiveProps(nextProps: IBancoDDLProps): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let element: IFormElement = Forms.getFormElement(idForm, { id: "Compania" });
            let banco: IFormElement = Forms.getFormElement(idForm, { id: "Banco" });

            if (!isEmptyObject(banco.value)) {
                if (banco.value.ID != this.state
                    .banco.ID) {
                    this.setState(
                        { banco: banco.value }
                    );

                    dispatchAsync("CuentasBancarias-catalogo", "Getbybank(" + banco.value.ID + "/" + element.value.ID + ")");
                };
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    }

    export let CuentaBancariaDDLFilter: any = ReactRedux.connect(CuentaBancariaFilterDDL.props, null)(CuentaBancariaFilterDDL);
    // Filtro Cuenta Bancaria

    export let PosicionesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.POSICIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Posicion",
            items: createDefaultStoreObject([]),
            label: "Posición",
            helpLabel: "Seleccione una posición",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.requireGlobal(global.Catalogos.posiciones);
            }
        }
        shouldComponentUpdate(nextProps: IDropDrownListProps, nextState: IDropDrownListState): boolean {
            return hasChanged(this.props.items, nextProps.items) || hasChanged(this.props.value, nextProps.value);
        }
        render(): any {
            return <DropdownList$Form {...this.props} />
        }
    });

    export class Idiomas$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.IDIOMAS
        });

        static defaultProps: IDropDrownListProps = {
            id: "Idioma",
            items: createDefaultStoreObject([]),
            label: "Idioma",
            helpLabel: "Seleccione el idioma del usuario",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='bandera-", item.Clave, "'></span>",
                        "<span class='badge badge-info'>", item.Clave, "</span>",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bandera-", item.Clave, "'></span>",
                    "<span class='badge badge-info'>", item.Clave, "</span>",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::IDIOMAS", "catalogos/get(idioma)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const IdiomasDDL: any = ReactRedux.connect(Idiomas$DDL.props, null)(Idiomas$DDL);
    //
    class TipoPlantilla$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOPLANTILLA
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoPlantilla",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOPLANTILLA", "catalogos/get(TIPOPLANTILLA)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TipoPlantillaDDL: any = ReactRedux.connect(TipoPlantilla$DDL.props, null)(TipoPlantilla$DDL);
    //
    class Generos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.GENEROS
        });

        static defaultProps: IDropDrownListProps = {
            id: "Genero",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione el genero",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::GENEROS", "catalogos/get(genero)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const GenerosDDL: any =
        ReactRedux.connect(Generos$DDL.props, null)(Generos$DDL);

    class TiposPersona$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSPERSONA
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoPersona",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSPERSONA", "catalogos/get(SCVTIPOPERSONA)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const TiposPersonaDDL: any =
        ReactRedux.connect(TiposPersona$DDL.props, null)(TiposPersona$DDL);

    class RangosIngresos$DDL extends React.Component<IDropDrownListProps, IDropDrownListProps> {
        constructor(props: IDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            items: state.global.RANGOINGRESOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "RangoIngresos",
            items: createDefaultStoreObject([]),
            label: "Rango de Ingresos",
            helpLabel: "Seleccione el Rango de Ingresos",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Nombre,
                            "</span> ",
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave,
                            "</span>"].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    if (item.Moneda) {
                        return [
                            global.formatMoney(item.RangoInicial, item.Moneda),
                            " - ",
                            global.formatMoney(item.RangoFinal, item.Moneda)].join("");
                    }
                    else {
                        return item.Nombre;
                    };
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return item.Nombre;
                }
                else {
                    return $([
                        "<span>",
                        global.formatMoney(item.RangoInicial, item.Moneda),
                        " - ",
                        global.formatMoney(item.RangoFinal, item.Moneda),
                        "</span> <span class='bold' style='font-size: 90%'>",
                        item.Moneda.Nombre,
                        "</span> ",
                        "<span class='badge badge-success bold'>",
                        item.Moneda.Clave,
                        "</span>"].join(""));
                }
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let moneda: any = 0;
                for (var i = 0; i < items.length; i++) {
                    moneda = items[i].Moneda;
                    if (!moneda) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (options[moneda.ID]) {
                            items[i].id = items[i].ID;
                            options[moneda.ID].children.push(items[i]);
                        }
                        else {
                            options[moneda.ID] = { "obj": moneda, "children": [] };
                            items[i].id = items[i].ID;
                            options[moneda.ID].children.push(items[i]);
                        };
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            },
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "rangosIngresos", { activos: 1 });
                dispatchAsync("load::RANGOINGRESOS", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const RangosIngresosDDL: any =
        ReactRedux.connect(RangosIngresos$DDL.props, null)(RangosIngresos$DDL);

    interface IZonaHorariaDDL extends IDropDrownListProps {
        dominio?: any;
        entidad?: any;
    };

    export class ZonaHoraria$DDL extends React.Component<IZonaHorariaDDL, {}> {
        static props: any = (state: any) => {
            let retvalue: any = page.props(state);
            retvalue.items = state.global.TIMEZONES;
            retvalue.dominio = state.global.Dominios;
            retvalue.entidad = global.getData(state.global.currentEntity);
            return retvalue;
        };
        static defaultProps: IDropDrownListProps = {
            id: "TimeZone",
            items: createDefaultStoreObject([]),
            label: "Zona Horaria",
            helpLabel: "Zona horaria donde utilizará el sistema",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIMEZONES", "catalogos/get(timezone)");
            };
        };
        shouldComponentUpdate(nextProps: IZonaHorariaDDL, nextState: IDropDrownListState): boolean {
            return hasChanged(this.props.items, nextProps.items) || hasChanged(this.props.dominio, nextProps.dominio);

        }
        componentDidUpdate(prevProps: IZonaHorariaDDL, prevState: IZonaHorariaDDL): any {
            if (hasChanged(this.props.dominio, prevProps.dominio) || hasChanged(this.props.items, prevProps.items)) {
                let item: any = getData(this.props.dominio);

                if (this.props.entidad.ID < 0) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.config.id;
                    let nextIdForm: string = prevProps.idFormSection ? prevProps.idFormSection : prevProps.config.id;
                    let element: IFormElement = Forms.getFormElement(nextIdForm, prevProps);

                    let index: any = prevProps.index;
                    let dom: boolean = hasChanged(this.props.dominio, prevProps.dominio);
                    let ite: boolean = hasChanged(this.props.items, prevProps.items);

                    if ((element.exists === false || hasChanged(this.props.dominio, prevProps.dominio) || hasChanged(this.props.items, prevProps.items)) && !(parseInt(index) >= 0)) {
                        if (!isEmptyObject(element.value)) {
                            if (isSuccessful(this.props.dominio)) {
                                if (this.props.dominio.data.length > 0 && !isEmptyObject(this.props.dominio.data[0]) && this.props.mode !== SelectModeEnum.Multiple) {

                                    element.value = this.props.dominio.data[0].TimeZone;
                                    if (this.props.change) {
                                        this.props.change(element.value);
                                    };
                                };
                            };
                        };
                        Forms.updateFormElement(nextIdForm, element);
                    };
                }
            }
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const ZonaHorariaDDL: any =
        ReactRedux.connect(ZonaHoraria$DDL.props, null)(ZonaHoraria$DDL);

    class Referencias$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.REFERENCIASPERSONALES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Referencia",
            items: createDefaultStoreObject([]),
            label: "Referencias",
            helpLabel: "Seleccione un tipo de Referencias",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::REFERENCIASPERSONALES", "catalogos/get(REFERENCIASPERSONALES)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const ReferenciasDLL: any = ReactRedux.connect(Referencias$DDL.props, null)(Referencias$DDL);

    class TiposContacto$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.TIPOCONTACTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoContacto",
            items: createDefaultStoreObject([]),
            label: "Tipo Contacto",
            helpLabel: "Seleccione un tipo de contacto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOCONTACTO", "catalogos/get(TIPOCONTACTO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TiposContactoDDL: any = ReactRedux.connect(TiposContacto$DDL.props, null)(TiposContacto$DDL);

    class TiposTelefono$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.TIPOTELEFONO
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tipo",
            items: createDefaultStoreObject([]),
            label: "Tipo",
            helpLabel: "Seleccione un tipo de teléfono",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOTELEFONO", "catalogos/get(TIPOTELEFONO)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TiposTelefonoDLL: any = ReactRedux.connect(TiposTelefono$DDL.props, null)(TiposTelefono$DDL);

    class TipoReferencias$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSREFERENCIAS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Referencia",
            items: createDefaultStoreObject([]),
            label: "Tipo Referencia",
            helpLabel: "Seleccione un tipo de referencia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Clave,
                        "</span>",
                        " <span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Clave) {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.ID,
                        "</span>",
                        " <span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'>",
                    item.Clave,
                    "</span>",
                    " <span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSREFERENCIAS", "catalogos/get(TIPOSREFERENCIAS)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TipoReferenciasDLL: any = ReactRedux.connect(TipoReferencias$DDL.props, null)(TipoReferencias$DDL);


    class Nacionalidad$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.NACIONALIDAD
        });

        static defaultProps: IDropDrownListProps = {
            id: "Nacionalidad",
            items: createDefaultStoreObject([]),
            label: "Nacionalidad",
            helpLabel: "Seleccione su Nacionalidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::NACIONALIDAD", "catalogos/get(NACIONALIDAD)");
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const NacionalidadDLL: any = ReactRedux.connect(Nacionalidad$DDL.props, null)(Nacionalidad$DDL);

    class Regimen$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.REGIMEN
        });

        static defaultProps: IDropDrownListProps = {
            id: "RegimenConyugal",
            items: createDefaultStoreObject([]),
            label: "Regimen Conyugal",
            helpLabel: "Seleccione su Regimen Conyugal",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::REGIMEN", "catalogos/get(REGIMEN)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const RegimenDLL: any = ReactRedux.connect(Regimen$DDL.props, null)(Regimen$DDL);

    class CentralesObreras$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.centralesObreras.kv
        });

        static defaultProps: IDropDrownListProps = {
            id: "CentralObrera",
            items: createDefaultStoreObject([]),
            label: "Central Obrera",
            helpLabel: "Seleccione una Central Obrera",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //let url: string = global.encodeAllURL("scv", "base/scv/CentralesObreras/all", { activos: 1 });
                dispatchAsync("scv-centralesObreras-kv", "base/scv/centralesObreras/all/" + global.encodeParameters({}));
                //dispatchAsync("scv-centralesObreras-kv", "CentralesObreras(1)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const CentralesObrerasDLL: any = ReactRedux.connect(CentralesObreras$DDL.props, null)(CentralesObreras$DDL);
    //
    class Empresas$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCV_EMPRESAS
        });

        static defaultProps: IDropDrownListProps = {
            id: "Empresa",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "empresas", { activos: 1 });
                dispatchAsync("load::SCV_EMPRESAS", url);
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const EmpresasDLL: any = ReactRedux.connect(Empresas$DDL.props, null)(Empresas$DDL);

    //class Desarrollos$DDL extends React.Component<IDropDrownListProps, {}> {
    //    static props: any = (state: any) => ({
    //        items: state.global.SCV_EMPRESAS
    //    });

    //    static defaultProps: IDropDrownListProps = {
    //        id: "Desarrollo",
    //        items: createDefaultStoreObject([]),
    //        value: createDefaultStoreObject({}),
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        required: false,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        size: [12, 12, 12, 12]
    //    };

    //    componentDidMount(): void {
    //        if (!isLoadingOrSuccessful(this.props.items)) {
    //            let url: string = global.encodeAllURL("scv", "desarrrollos", { activos: 1 });
    //            dispatchAsync("load::SCV_DESARROLLOS", url);
    //        };
    //    };

    //    render(): any {
    //        return <DropdownList$Form {...this.props} />;
    //    };
    //};

    //export const DesarrolloDLL: any = ReactRedux.connect(Desarrollos$DDL.props, null)(Desarrollos$DDL);


    class ExpedienteCliente$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.EXPEDIENTECLIENTE
        });
        static defaultProps: IDropDrownListProps = {
            id: "Expediente",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.ID,
                        "</span>",
                        " <span class='bold' style='font-size: 90%'>",
                        item.Clave,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Clave) {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.ID,
                        "</span>",
                        " <span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'>",
                    item.ID,
                    "</span>",
                    " <span class='bold' style='font-size: 90%'>",
                    item.Clave,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchSuccessful("load::EXPEDIENTECLIENTE", []);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const ExpedienteClienteDDL: any = ReactRedux.connect(ExpedienteCliente$DDL.props, null)(ExpedienteCliente$DDL);

    class CuentasBancarias$DDL extends React.Component<IDropDrownListProps, IDropDrownListProps> {
        constructor(props: IDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            items: state.global.CUENTASBANCARIAS
        });
        static defaultProps: IDropDrownListProps = {
            id: "CUENTASBANCARIAS",
            items: createDefaultStoreObject([]),
            label: "Cuentas Bancarias",
            helpLabel: "Selecciona la cuenta bancaria",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Descripcion,
                            "</span> ",
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave,
                            "</span>"].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.Compania.Nombre,
                        "</span> ",
                        "<span class='badge badge-success bold'>",
                        item.Clave,
                        "</span>"].join(""));
                    // [item.Compania.Nombre].join("");
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span>",
                    item.Compania.Nombre,
                    "</span> <span class='bold' style='font-size: 90%'>",
                    item.Banco.Descripcion,
                    "</span> ",
                    "<span class='badge badge-success bold'>",
                    item.Clave,
                    "</span>"].join(""));
            },
            processData: (data): any => {
                let items: any[] = global.getData(data, []);
                let options: any = {};
                let Banco: any = 0;
                for (var i = 0; i < items.length; i++) {
                    Banco = items[i].Banco;
                    if (options[Banco.Id]) {
                        items[i].id = items[i].ID;
                        options[Banco.Id].children.push(items[i]);
                    }
                    else {
                        options[Banco.Id] = { "obj": Banco, "children": [] };
                        items[i].id = items[i].ID;
                        options[Banco.Id].children.push(items[i]);
                    };
                };
                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };
                return retValue;
            },
            size: [12, 12, 12, 12]
        };
        //static defaultProps: IDropDrownListProps = {
        //    id: "CUENTASBANCARIAS",
        //    items: createDefaultStoreObject([]),
        //    value: createDefaultStoreObject({}),
        //    initialValue: undefined,
        //    hasChanged: false,
        //    hasValidationError: false,
        //    required: false,
        //    itemKey: "ID",
        //    itemValue: "Descripcion",
        //    size: [12, 12, 12, 12]
        //};

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::CUENTASBANCARIAS", "cuentabancaria/GetAll/");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const CuentasBancariasDDL: any =
        ReactRedux.connect(CuentasBancarias$DDL.props, null)(CuentasBancarias$DDL);

    class EstadoCivil$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTADOCIVIL
        });

        static defaultProps: IDropDrownListProps = {
            id: "EstadoCivil",
            items: createDefaultStoreObject([]),
            label: "Estado Civil",
            helpLabel: "Seleccione su Estado Civil",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTADOCIVIL", "catalogos/get(ESTADOCIVIL)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const EstadoCivilDLL: any = ReactRedux.connect(EstadoCivil$DDL.props, null)(EstadoCivil$DDL);

    class Estudios$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.GRADOACADEMICO
        });

        static defaultProps: IDropDrownListProps = {
            id: "Estudios",
            items: createDefaultStoreObject([]),
            label: "Nivel de Estudios",
            helpLabel: "Seleccione un tipo de Estudio",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::GRADOACADEMICO", "catalogos/get(GRADOACADEMICO)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const EstudiosDLL: any = ReactRedux.connect(Estudios$DDL.props, null)(Estudios$DDL);

    class TipoCasa$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.TIPOCASA
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoCasa",
            items: createDefaultStoreObject([]),
            label: "Tipo de Casa",
            helpLabel: "Seleccione un tipo de casa",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOCASA", "catalogos/get(TIPOCASA)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const TipoCasaDLL: any = ReactRedux.connect(TipoCasa$DDL.props, null)(TipoCasa$DDL);

    class TipoPercepcion$DDL extends React.Component<IDropDrownListProps, null> {
        static props: any = (state: any) => ({
            items: state.global.TIPOPERCEPCION
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoPercepcion",
            items: createDefaultStoreObject([]),
            label: "Tipo de Percepcion",
            helpLabel: "Seleccione un tipo de percepcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOPERCEPCION", "catalogos/get(TIPOPERCEPCION)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const TipoPercepcionDLL: any = ReactRedux.connect(TipoPercepcion$DDL.props, null)(TipoPercepcion$DDL);

    const mapCtaBancariaProps: any = (state: any) => {
        return {
            banco: state.bancos.selected,
            items: state.cuentabancaria.cuentabancaria,
            value: state.cuentabancaria.selected,
            compania: state.global.usuariocompania
        };
    };

    const mapCtaBancariaDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            change: (item: any): any => {
                dispatchSuccessful("CuentasBancarias-setSelected", item);
            },
            obtenerDatos: (clave: string, compania: number): any => {
                dispatchAsync("CuentasBancarias-catalogo", "cuentabancariabybank(" + clave + "/" + compania + ")");
            }
        }
    };

    class MediosPublicidad$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.MEDIOSPUBLICIDAD
        });

        static defaultProps: IDropDrownListProps = {
            id: "MedioPublicidad",
            items: createDefaultStoreObject([]),
            label: "Medio de Publicidad",
            helpLabel: "Seleccione el medio de publicidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::MEDIOSPUBLICIDAD", "catalogos/get(mediosPublicidad)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const MediosPublicidadDDL: any =
        ReactRedux.connect(MediosPublicidad$DDL.props, null)(MediosPublicidad$DDL);

    //DropDown para Estado Campaña de publicidad 
    class EstadoCampania$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTADOCAMPANIA

        });

        static defaultProps: IDropDrownListProps = {
            id: "EstadoCampania",
            items: createDefaultStoreObject([]),
            label: "Estatus Campaña",
            helpLabel: "Seleccione el estatus de la campaña",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTADOCAMPANIA", "catalogos/get(ESTADOCAMPANIA)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const EstadoCampaniaDDL: any =
        ReactRedux.connect(EstadoCampania$DDL.props, null)(EstadoCampania$DDL);

    //DropDown para Estado POLIZA FINIQUITO INICIO 
    class EstadoPolizaFiniquito$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.EstadoPolizaFiniquito
        });

        static defaultProps: IDropDrownListProps = {
            id: "EstadoPolizaFiniquito",
            items: createDefaultStoreObject([]),
            label: "Estado Póliza",
            helpLabel: "Seleccione el estatus de la Póliza Finiquito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EstadoPolizaFiniquito", "catalogos/get(EstadoPolizaFiniquito)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const EstadoPolizaFiniquitoDDL: any =
        ReactRedux.connect(EstadoPolizaFiniquito$DDL.props, null)(EstadoPolizaFiniquito$DDL);

    //DropDown para Estado POLIZA FINIQUITO FIN 

    //DropDown para Estado FINIQUITO INICIO 
    class EstadoFiniquito$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.EstadoFiniquito
        });

        static defaultProps: IDropDrownListProps = {
            id: "EstadoFiniquito",
            items: createDefaultStoreObject([]),
            label: "Estado Finiquito",
            helpLabel: "Seleccione el estatus del Finiquito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EstadoFiniquito", "catalogos/get(ESTADOFINIQUITO)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const EstadoFiniquitoDDL: any =
        ReactRedux.connect(EstadoFiniquito$DDL.props, null)(EstadoFiniquito$DDL);

    //DropDown para Estado FINIQUITO FIN 




    export class EstatusUbicacion$DDL extends React.Component<IDesarrollosProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.estatusesUbicacion
        });

        static defaultProps: IDropDrownListProps = {
            id: "EstatusUbicacion",
            items: createDefaultStoreObject([]),
            label: "Estatus para el lote",
            helpLabel: "Seleccione el estatus para el lote",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("global-estatusesUbicacion", "catalogos/get(ESTATUSUBICACION)");
                dispatchSuccessful("global-estatusesUbicacion-selected", {});
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    const EstatusUbicacionMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            change: (item: any): void => {
                dispatchSuccessful("global-estatusesUbicacion-selected", item);
            }
        };
    };

    export const EstatusUbicacionDDL: any =
        ReactRedux.connect(EstatusUbicacion$DDL.props, EstatusUbicacionMapDispatchs)(EstatusUbicacion$DDL);

    export let EstatusExpedienteDDL: any = global.connect(class extends React.Component<IDesarrollosProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.estatusesExpediente
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("global-estatusesExpediente-setSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusExpediente",
            items: createDefaultStoreObject([]),
            label: "Estatus de Procesos de Venta",
            helpLabel: "Seleccione el estatus de procesos de venta",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("global-estatusesExpediente-catalogo", "catalogos/get(ESTATUSEXPEDIENTE)");
                dispatchSuccessful("global-estatusesExpediente-setSelected", createDefaultStoreObject({}));
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    interface ISegmentosFilterDDLProps extends EK.UX.DropDownLists.IDropDrownListProps {
        vocacion?: global.DataElement;
    };

    export class Segmentos$DDL extends React.Component<ISegmentosFilterDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Segmento,
            vocacion: Forms.getDataValue("Vocaciones", [state.global.page.data.id, ""].join(""), state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Segmento",
            items: createDefaultStoreObject([]),
            label: "Segmentos",
            helpLabel: "Seleccione el segmento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //console.log(this.props);
                //dispatchAsync("load::Segmento", "base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1 }));
            };
        };

        componentWillReceiveProps(nextProps: ISegmentosFilterDDLProps, { }): void {
            //console.log(this.props)

            if (global.isSuccessful(nextProps.vocacion)) {
                if (hasChanged(this.props.vocacion.data, nextProps.vocacion.data)) {
                    if (nextProps.vocacion.data.Clave !== undefined && nextProps.vocacion.data.Clave !== '-2') {
                        console.log('cambiar de segmentos')
                        //dispatchAsync("load::Segmento", "base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1, vocacion: nextProps.vocacion.data.Clave }));
                        global.asyncGet("base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1, vocacion: nextProps.vocacion.data.Clave }), (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:

                                    data.unshift({ ID: 9999, Clave: '9999', Descripcion: 'TODOS' });
                                    dispatchSuccessful('load::Segmento', data);
                                    break;
                            }
                        });
                    } else if (nextProps.vocacion.data.Clave !== undefined && nextProps.vocacion.data.Clave === '-2') {
                        global.dispatchSuccessful("load::Segmento", []);
                        Forms.updateFormElement(this.props.idForm, this.props.id, {});
                    }
                }

            };
        };

        shouldComponentUpdate(nextProps: ISegmentosFilterDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };



    export class Segmentos$DDL3 extends React.Component<ISegmentosFilterDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Segmento,
            vocacion: Forms.getDataValue("Vocaciones", [state.global.page.data.id, "$filters"].join(""), state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Segmento",
            items: createDefaultStoreObject([]),
            label: "Segmentos",
            helpLabel: "Seleccione el segmento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //console.log(this.props);
                //dispatchAsync("load::Segmento", "base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1 }));
            };
        };

        componentWillReceiveProps(nextProps: ISegmentosFilterDDLProps, { }): void {
            //console.log(this.props)

            if (global.isSuccessful(nextProps.vocacion)) {
                if (hasChanged(this.props.vocacion.data, nextProps.vocacion.data)) {
                    if (nextProps.vocacion.data.Clave !== undefined && nextProps.vocacion.data.Clave !== '-2') {
                        console.log('cambiar de segmentos')
                        //dispatchAsync("load::Segmento", "base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1, vocacion: nextProps.vocacion.data.Clave }));
                        global.asyncGet("base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1, vocacion: nextProps.vocacion.data.Clave }), (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:

                                    data.unshift({ ID: 9999, Clave: '9999', Descripcion: 'TODOS' });
                                    dispatchSuccessful('load::Segmento', data);
                                    break;
                            }
                        });
                    } else if (nextProps.vocacion.data.Clave !== undefined && nextProps.vocacion.data.Clave === '-2') {
                        global.dispatchSuccessful("load::Segmento", []);
                        Forms.updateFormElement(this.props.idForm, this.props.id, {});
                    }
                }

            };
        };

        shouldComponentUpdate(nextProps: ISegmentosFilterDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };


    export class Segmentos$DDLv2 extends React.Component<ISegmentosFilterDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Segmento,

            vocacion: Forms.getDataValue("Vocacion", [state.global.page.data.id, "$filters"].join(""), state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Segmento",
            items: createDefaultStoreObject([]),
            label: "Segmentos",
            helpLabel: "Seleccione el segmento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //console.log(this.props);
            };
        };

        componentWillReceiveProps(nextProps: ISegmentosFilterDDLProps, { }): void {
            if (global.isSuccessful(nextProps.vocacion)) {
                if (hasChanged(this.props.vocacion.data, nextProps.vocacion.data)) {
                    if (nextProps.vocacion.data.Clave !== undefined && nextProps.vocacion.data.Clave !== '-2') {
                        global.asyncGet("base/scv/Segmentos/all/" + global.encodeParameters({ activos: 1, vocacion: nextProps.vocacion.data.Clave }), (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:

                                    data.unshift({ ID: 9999, Clave: '9999', Descripcion: 'TODOS' });
                                    dispatchSuccessful('load::Segmento', data);
                                    break;
                            }
                        });
                    } else if (nextProps.vocacion.data.Clave !== undefined && nextProps.vocacion.data.Clave === '-2') {
                        global.dispatchSuccessful("load::Segmento", []);
                        Forms.updateFormElement(`${this.props.idForm}$filters`, this.props.id, {});
                    }
                }

            };
        };

        shouldComponentUpdate(nextProps: ISegmentosFilterDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const SegmentosDDL: any =
        ReactRedux.connect(Segmentos$DDL.props, null)(Segmentos$DDL);

    export const SegmentosDDLv2: any =
        ReactRedux.connect(Segmentos$DDLv2.props, null)(Segmentos$DDLv2);

    export const SegmentosDDL3: any =
        ReactRedux.connect(Segmentos$DDL3.props, null)(Segmentos$DDL3);
    //Naturaleza
    let Naturaleza$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.Naturaleza
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::NaturalezaSelected", item);
            }

        });
        static defaultProps: IDropDrownListProps = {
            id: "naturaleza",
            items: createDefaultStoreObject([]),
            //label: "Naturaleza",
            helpLabel: "Seleccione la Naturaleza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::Naturaleza", "catalogos/get(NATURALEZAMOVIMIENTO)");

            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export const NaturalezaDDL: any =
        ReactRedux.connect(Naturaleza$DDL.props, Naturaleza$DDL.dispatchs)(Naturaleza$DDL);

    //Fin Naturaleza

    //Naturaleza Conceptos Credito
    export class NaturalezaCC$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.NATURALEZACONCEPTOCREDITO
        });

        static defaultProps: IDropDrownListProps = {
            id: "naturaleza",
            label: "Naturaleza",
            helpLabel: "Seleccione la Naturaleza",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::NATURALEZACONCEPTOCREDITO", "catalogos/get(NATURALEZACONCEPTOCREDITO)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export let NaturalezaCCDDL: any =
        ReactRedux.connect(NaturalezaCC$DDL.props, null)(NaturalezaCC$DDL);



    //Categoria Tipo de Insumo
    let CategoriaInsumo$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CategoriaInsumo
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::CategoriaInsumoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "CategoriaInsumo",
            items: createDefaultStoreObject([]),
            label: "Categoría Tipo de Insumo",
            helpLabel: "Seleccione una Categoría",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::CategoriaInsumo", "catalogos/get(SCCOCATEGORIAINSUMOS)");
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export const CategoriaInsumoDDL: any =
        ReactRedux.connect(CategoriaInsumo$DDL.props, CategoriaInsumo$DDL.dispatchs)(CategoriaInsumo$DDL);

    //Fin Categoria Tipo de Insumo


    //Tipos Ordenes de Cambio
    let TipoOrdenesCambio$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoOrdenesCambio
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::TipoOrdenesCambioSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoOrdenesCambio",
            items: createDefaultStoreObject([]),
            label: "Tipo Orden de Cambio",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::TipoOrdenesCambio", "catalogos/get(SCCOTIPOORDENCAMBIO)");
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export const TipoOrdenesCambioDDL: any =
        ReactRedux.connect(TipoOrdenesCambio$DDL.props, TipoOrdenesCambio$DDL.dispatchs)(TipoOrdenesCambio$DDL);

    //Fin Tipos Ordenes de Cambio

    //Validacion Presupuesto
    let ValidacionPresupuesto$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ValidacionPresupuesto
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::ValidacionPresupuestoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "ValidacionPresupuesto",
            items: createDefaultStoreObject([]),
            label: "Validación Presupuesto",
            helpLabel: "Seleccione una validación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::ValidacionPresupuesto", "catalogos/get(SCCOVALIDACIONPRESUPUESTO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export const ValidacionPresupuestoDDL: any =
        ReactRedux.connect(ValidacionPresupuesto$DDL.props, ValidacionPresupuesto$DDL.dispatchs)(ValidacionPresupuesto$DDL);

    //Fin Validacion Presupuesto


    //Tipo de Sociedad
    let TipoSociedad$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoSociedad
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::TipoSociedadSelected", item);
            }

        });
        static defaultProps: IDropDrownListProps = {
            id: "Sociedad",
            items: createDefaultStoreObject([]),
            label: "Tipo de Sociedad",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::TipoSociedad", "catalogos/get(TIPOSOCIEDAD)");

            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export const TipoSociedadDDL: any =
        ReactRedux.connect(TipoSociedad$DDL.props, TipoSociedad$DDL.dispatchs)(TipoSociedad$DDL);

    //Tipo de Sociedad


    //TipoTercero
    let TipoTercero$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoTercero
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::TipoTerceroSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tercero",
            items: createDefaultStoreObject([]),
            label: "Tipo de Tercero",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::TipoTercero", "catalogos/get(TIPOTERCERO)");
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export const TipoTerceroDDL: any =
        ReactRedux.connect(TipoTercero$DDL.props, TipoTercero$DDL.dispatchs)(TipoTercero$DDL);

    //TipoTercero


    //TipoOperacion
    let TipoOperacion$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoOperacion
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                global.dispatchSuccessful("load::TipoOperacionSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "Operacion",
            items: createDefaultStoreObject([]),
            label: "Tipo de Operación",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::TipoOperacion", "catalogos/get(TIPOOPERACION)");

            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export const TipoOperacionDDL: any =
        ReactRedux.connect(TipoOperacion$DDL.props, TipoOperacion$DDL.dispatchs)(TipoOperacion$DDL);

    /// TipoOperacion

    /// TipoProveedor  ///   
    class TipoProveedor$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoProveedor
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoProveedor",
            label: "Tipo de Proveedor",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione un Tipo de Proveedor",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("Kontrol", "TipoProveedores", { activos: 1 });
                global.dispatchAsync("load::TipoProveedor", url);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const TipoProveedorDDL: any =
        ReactRedux.connect(TipoProveedor$DDL.props, null)(TipoProveedor$DDL);

    ///  TipoProveedor  ///

    ///  TipoMovimientoProveedor  ///   
    class TipoMovimientoProveedor$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoMovimientoProveedor
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoMovimientoProveedor",
            label: "Tipo de Movimiento Base",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione un Tipo de Movimiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            style: { fontSize: "8px" },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("Kontrol", "TipoMovimientoProveedores", { activos: 1 });
                global.dispatchAsync("load::TipoMovimientoProveedor", url);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TipoMovimientoProveedorDDL: any =
        ReactRedux.connect(TipoMovimientoProveedor$DDL.props, null)(TipoMovimientoProveedor$DDL);
    ///  TipoMovimientoProveedor  ///

    // TipoFSR
    let TipoFSR$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoFSR
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoFSR",
            items: createDefaultStoreObject([]),
            label: "Tipo FSR",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TipoFSR", "catalogos/get(TipoFSR)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    export const TipoFSRDDL: any =
        ReactRedux.connect(TipoFSR$DDL.props, TipoFSR$DDL.dispatchs)(TipoFSR$DDL);
    /// TipoFSR

    // TipoIndirecto
    let TipoIndirecto$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOINDIRECTO
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoIndirecto",
            items: createDefaultStoreObject([]),
            label: "Tipo Indirecto",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOINDIRECTO", "catalogos/get(TIPOINDIRECTO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    export const TipoIndirectoDDL: any =
        ReactRedux.connect(TipoIndirecto$DDL.props, TipoIndirecto$DDL.dispatchs)(TipoIndirecto$DDL);
    /// TipoIndirecto

    // TipoNivelIndirecto
    let TipoNivelIndirecto$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.NIVELINDIRECTO
        });

        static defaultProps: IDropDrownListProps = {
            id: "Nivel",
            items: createDefaultStoreObject([]),
            label: "Nivel Indirecto",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::NIVELINDIRECTO", "catalogos/get(NIVELINDIRECTO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    export const TipoNivelIndirectoDDL: any =
        ReactRedux.connect(TipoNivelIndirecto$DDL.props, TipoNivelIndirecto$DDL.dispatchs)(TipoNivelIndirecto$DDL);
    /// TipoNivelIndirecto

    // TipoValidacion
    let TipoValidacion$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOVALIDACIONES
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoValidacion",
            items: createDefaultStoreObject([]),
            label: "Tipo de Validación",
            helpLabel: "Seleccione un tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOVALIDACIONES", "catalogos/get(TIPOVALIDACIONES)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    export const TipoValidacionDDL: any =
        ReactRedux.connect(TipoValidacion$DDL.props, TipoValidacion$DDL.dispatchs)(TipoValidacion$DDL);
    /// TipoValidacion

    ///  SCCOProcesos  ///   
    class SccoProcesos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SCCOPROCESOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Proceso",
            label: "Tipo de Proceso",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione un Tipo de Proceso",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            style: { fontSize: "8px" },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCCOPROCESOS", "catalogos/get(SCCOPROCESOS)");
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const SccoProcesosDDL: any =
        ReactRedux.connect(SccoProcesos$DDL.props, null)(SccoProcesos$DDL);
    ///  SCCOProcesos  ///

    //Estatus-Posiciones
    export class EstatusPosicionesDDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSPOSICION
        });

        static defaultProps: IDropDrownListProps = {
            id: "estatusposicion",
            items: createDefaultStoreObject([]),
            label: "Estatus Posición",
            helpLabel: "Seleccione su EstatusPosicion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        component: any =
            ReactRedux.connect(EstatusPosicionesDDL.props, null)(EK.UX.DropDownLists.DropdownList$Form);

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSPOSICION", "catalogos/get(ESTATUSPOSICION)");
            };
        };

        render(): any {
            return <this.component {...this.props} />;
        };
    };
    //Fin Estatus-Posiciones

    //padre

    let Padre$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.Posiciones
        });
        //static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
        //    change: (item: any): void => {
        //        dispatchSuccessful("load::PadreSelected", item);
        //    }

        //});
        static defaultProps: IDropDrownListProps = {
            id: "padre",
            items: createDefaultStoreObject([]),
            //label: "Padre",
            helpLabel: "Seleccione el Padre",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span>",
                            item.obj.Nombre, " ",
                            "</span> ", " ",
                            " <span class='badge badge-info'>",
                            item.obj.Clave,
                            "</span>"].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        " <span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                } else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ",
                        " </span>",
                        " <span class='badge badge-info'>",
                        item.Clave,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span>",
                        item.Nombre,
                        "</span> ",
                        " <span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                };
                return $([
                    "<span>",
                    item.Nombre, " ",
                    "</span> ",
                    " <span class='badge badge-info'>",
                    item.Clave,
                    "</span> "].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "posiciones", { activos: 1 });
                dispatchAsync("load::Posiciones", url);
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export const PadreDDL: any =
        ReactRedux.connect(Padre$DDL.props, Padre$DDL.dispatchs)(Padre$DDL);

    //fin padre
    //Compania
    class Compania$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Compania
        });
        static defaultProps: IDropDrownListProps = {
            id: "Compania",
            label: "Compañia",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione la Compania",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("Kontrol", "Companias", { activos: 1 });
                dispatchAsync("load::Compania", url);
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const CompaniaDDL: any =
        ReactRedux.connect(Compania$DDL.props, null)(Compania$DDL);

    //FIN CompañiaDDL

    //INICIO OrigenDDL
    class Origen$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Origen
        });
        static defaultProps: IDropDrownListProps = {
            id: "Origen",
            label: "Origen",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione el Origen",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("Kontrol", "Origen", { activos: 1 });
                dispatchAsync("load::Origen", url);
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const OrigenDDL: any =
        ReactRedux.connect(Origen$DDL.props, null)(Origen$DDL);
    //Fin OrigenDDL
    //INICIO ESTATUSEXPEDIENTE$DDL
    class ESTATUSEXPEDIENTE$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.EstatusExpediente
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            label: "Estatus Expediente",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione Estatus del Expediente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EstatusExpediente", "catalogos/get(SCVESTATUSEXPEDIENTE)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const ExpedienteEstatusDLL: any =
        ReactRedux.connect(ESTATUSEXPEDIENTE$DDL.props, null)(ESTATUSEXPEDIENTE$DDL);
    //Fin ESTATUSEXPEDINETE$DDL

    //INICIO ESTATUSSEGUIMIENTO$DDL
    class ESTATUSSEGUIMIENTO$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.EstatusSeguimiento
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusSeguimiento",
            label: "Estatus Seguimiento",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione Estatus Seguimiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EstatusSeguimiento", "catalogos/get(SCVESTATUSSEGUIMIENTO)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const EstatusSeguimientoDDL: any =
        ReactRedux.connect(ESTATUSSEGUIMIENTO$DDL.props, null)(ESTATUSSEGUIMIENTO$DDL);
    //Fin ESTATUSSEGUIMIENTO$DDL



    //INICIO VCTOCOBRANZA$DDL
    class VCTOCOBRANZA$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.VctoCobranza
        });
        static defaultProps: IDropDrownListProps = {
            id: "VctoCobranza",
            label: "Vencimiento Cobranza",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione Vencimiento Cobranza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::VctoCobranza", "catalogos/get(VCTOCOBRANZA)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const VctoCobranzaDDL: any =
        ReactRedux.connect(VCTOCOBRANZA$DDL.props, null)(VCTOCOBRANZA$DDL);
    //Fin VCTOCOBRANZA$DDL


    //INICIO AVANCECONSTRUCCION$DDL
    class AVANCECONSTRUCCION$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.AvanceConstruccion
        });
        static defaultProps: IDropDrownListProps = {
            id: "AvanceConstruccion",
            label: "Avance Construccion",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione Avance Construccion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::AvanceConstruccion", "catalogos/get(AVANCECONSTRUCCION)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const AvanceConstruccionDDL: any =
        ReactRedux.connect(AVANCECONSTRUCCION$DDL.props, null)(AVANCECONSTRUCCION$DDL);
    //Fin AVANCECONSTRUCCION$DDL



    class Niveles$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.Nivel
        });
        static defaultProps: IDropDrownListProps = {
            id: "Nivel",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("Kontrol", "Niveles", { activos: 1 });
                dispatchAsync("load::Nivel", url);

            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const NivelesDDL: any =
        ReactRedux.connect(Niveles$DDL.props, null)(Niveles$DDL);

    export let TiposMovimientos$DDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TiposMovimientos
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            change: (item: any): void => {
                dispatchSuccessful("load::TipoMovimientoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoMovimiento",
            items: createDefaultStoreObject([]),
            label: "Tipo Movimiento OC",
            helpLabel: "Seleccione el Tipo de Movimiento OC",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span>", item.obj.Nombre, "</span>", " ",
                            "<span class='badge badge-info'>", item.obj.Naturaleza.Clave, "</span>"
                        ].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>", item.Nombre, "</span>", " "
                    ].join(""));
                } else {
                    return $([
                        "<span class='badge badge-info'>", item.Naturaleza.Clave, "</span>", " ",
                        "<span style='font-size: 90%'>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $(["<span>", item.Nombre, "</span>"].join(""));
                };

                return $([
                    "<span class='badge badge-info'>", item.Naturaleza.Clave, "</span>", " ",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TipoMovimiento", { activos: 1, Cancelar: 2 });
                global.dispatchAsync("load::TiposMovimientos", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export const TiposMovimientosDDL: any =
        ReactRedux.connect(TiposMovimientos$DDL.props, null)(TiposMovimientos$DDL);

    //Fin Movimiento oc

    class Monedas$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.MONEDA
        });

        static defaultProps: IDropDrownListProps = {
            id: "Moneda",
            items: createDefaultStoreObject([]),
            //label: "Monedas",
            helpLabel: "Seleccione la moneda",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='bandera-", item.Clave, "'></span> ",
                        "<span class='badge badge-info'>", item.Clave, "</span> ",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bandera-", item.Clave, "'></span> ",
                    "<span class='badge badge-info'>", item.Clave, "</span> ",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.requireGlobal(global.Catalogos.monedas);
                //dispatchAsync("load::MONEDA", "catalogos/get(MONEDA)");
                //dispatchAsync("load::MONEDA", "Monedas(0)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const MonedasDDL: any = ReactRedux.connect(Monedas$DDL.props, null)(Monedas$DDL);

    //DROPDOWN PullNotifications Entidades INICIO

    class PullNotificationsEntities$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.PullNotificationsEntities
        });

        static defaultProps: IDropDrownListProps = {
            id: "PullNotificationsEntities",
            items: createDefaultStoreObject([]),
            label: "Entidad",
            helpLabel: "Seleccione la Entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "PullNotificationsEntities", { activos: 1 });
                dispatchAsync("load::PullNotificationsEntities", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const PullNotificationsEntitiesDDL: any = ReactRedux.connect(PullNotificationsEntities$DDL.props, null)(PullNotificationsEntities$DDL);

    //DROPDOWN PullNotifications Entidades FIN

    //DROPDOWN LISTAS MARTKETING INICIO

    class ListasMarketing$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ListasMkt
        });

        static defaultProps: IDropDrownListProps = {
            id: "ListasMkt",
            items: createDefaultStoreObject([]),
            label: "Lista Marketing",
            helpLabel: "Seleccione Lista de Marketing",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "ListasMkt", { activos: 1 });
                dispatchAsync("load::ListasMkt", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const ListaMarketingDDL: any = ReactRedux.connect(ListasMarketing$DDL.props, null)(ListasMarketing$DDL);

    //DROPDOWN LISTAS MARTKETING FIN


    //DROPDOWN FRECUENCIAS CAMPAÑA PUBLICIDAD INICIO

    class FrecuenciaCampania$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.FRECUENCIACAMPANIA
        });

        static defaultProps: IDropDrownListProps = {
            id: "FrecuenciaCampania",
            items: createDefaultStoreObject([]),
            label: "Frecuencia Campaña Publicidad",
            helpLabel: "Seleccione una Frecuencia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::FRECUENCIACAMPANIA", "catalogos/get(FRECUENCIACAMPANIA)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const FrecuenciaCampaniaDDL: any =
        ReactRedux.connect(FrecuenciaCampania$DDL.props, null)(FrecuenciaCampania$DDL);


    //DROPDOWN FRECUENCIAS CAMPAÑA PUBLICIDAD FIN

    //DROPDOWN TIPOS DE PROCESO GENERACION POLIZA INICIO

    class TiposDeProcesos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TiposDeProcesos
        });

        static defaultProps: IDropDrownListProps = {
            id: "TiposDeProcesos",
            items: createDefaultStoreObject([]),
            label: "Tipos de Proceso",
            helpLabel: "Seleccione Tipos de Proceso",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TiposProceso", { activos: 1 });
                dispatchAsync("load::TiposDeProcesos", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TiposDeProcesosDDL: any = ReactRedux.connect(TiposDeProcesos$DDL.props, null)(TiposDeProcesos$DDL);

    //DROPDOWN TIPOS DE PROCESO GENERACION POLIZA FIN


    class Modulos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.MODULO
        });
        static defaultProps: IDropDrownListProps = {
            id: "Modulo",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));
                }
                else {
                    return $([
                        "<span>",
                        "(" + item.Clave + ") " + item.Nombre,
                        "</span>",
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return item.text;

                return $([
                    "<span>",
                    "(" + item.Clave + ") " + item.Nombre,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "modulos", { activos: 1 });
                dispatchAsync("load::MODULO", url);
            };
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };
    export const ModulosDDL: any = ReactRedux.connect(Modulos$DDL.props, null)(Modulos$DDL);

    class TipoDatos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoDato
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoDato",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));
                }
                else {
                    return $([
                        "<span>",
                        "(" + item.Clave + ") " + item.Nombre,
                        "</span>",
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return item.text;

                return $([
                    "<span>",
                    "(" + item.Clave + ") " + item.Nombre,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TipoDato", "catalogos/get(TIPODATO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TipoDatoDDL: any = ReactRedux.connect(TipoDatos$DDL.props, null)(TipoDatos$DDL);


    class CategoriasPlantilla$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.CATPLANTILLAS
        });

        static defaultProps: IDropDrownListProps = {
            id: "Categoria",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::CATPLANTILLAS", "catalogos/get(CATEGORIASPLANTILLAS)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const CategoriasPlantillaDDL: any = ReactRedux.connect(CategoriasPlantilla$DDL.props, null)(CategoriasPlantilla$DDL);


    class TiposDato$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSDATO
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoDato",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSDATO", "catalogos/get(TIPODATO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TiposDatoDDL: any = ReactRedux.connect(TiposDato$DDL.props, null)(TiposDato$DDL);
    class HAlineacion$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.HALINEACION
        });

        static defaultProps: IDropDrownListProps = {
            id: "Alineacion",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::HALINEACION", "catalogos/get(HALINEACION)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const HAlineacionDDL: any = ReactRedux.connect(HAlineacion$DDL.props, null)(HAlineacion$DDL);
    class OperadoresLogicos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOOPERADORLOGICO
        });

        static defaultProps: IDropDrownListProps = {
            id: "OperadorLogico",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOOPERADORLOGICO", "catalogos/get(TIPOOPERADORLOGICO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const OperadoresLogicosDDL: any = ReactRedux.connect(OperadoresLogicos$DDL.props, null)(OperadoresLogicos$DDL);
    class Operadores$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOOPERADOR
        });

        static defaultProps: IDropDrownListProps = {
            id: "Operador",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOOPERADOR", "catalogos/get(TIPOOPERADOR)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const OperadoresDDL: any = ReactRedux.connect(Operadores$DDL.props, null)(Operadores$DDL);
    class Plantillas$DDL extends React.Component<IPlantillasDDL, IPlantillasDDL> {
        static props: any = (state: any) => ({
            items: state.global.PLANTILLAS
        });

        static defaultProps: IPlantillasDDL = {
            id: "Plantilla",
            items: createDefaultStoreObject([]),
            //label: "Monedas",
            helpLabel: "Seleccione la plantilla",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            Categoria: null,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='bold'>",
                            item.obj.Clave,
                            "</span> ",
                            "<span style='font-size: 80%'>",
                            item.obj.Nombre,
                            "</span>"].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<div class='bold'>",
                        item.Clave,
                        "</div> <div style='font-size: 80%'>",
                        item.Nombre,
                        "</div> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bold'>",
                    item.Clave,
                    "</span> <span style='font-size: 80%'>",
                    item.Nombre,
                    "</span> "].join(""));
            }
        };

        componentDidMount(): void {
            let categoria: string = this.props.Categoria;
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsyncPost("load::PLANTILLAS", "base/kontrol/plantillas/all", { activos: 1, Categoria: categoria });
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    interface IPlantillasDDL extends IDropDrownListProps {
        Categoria?: string;
    }
    export const PlantillasDDL: any = ReactRedux.connect(Plantillas$DDL.props, null)(Plantillas$DDL);
    class Entidades$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ENTIDADES
        });

        static defaultProps: IDropDrownListProps = {
            id: "Entidad",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = ["base/kontrol/entidades/all/"].join("");
                dispatchAsync("load::ENTIDADES", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const EntidadesDDL: any = ReactRedux.connect(Entidades$DDL.props, null)(Entidades$DDL);
    export const CategoriasReporte: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.CategoriaReporte
        });

        static defaultProps: IDropDrownListProps = {
            id: "Categoria",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::CategoriaReporte", "catalogos/get(REP_CATEGORIAS)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    export const TiposReporte: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TiposReporte
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoReporte",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TiposReporte", "catalogos/get(REP_TIPOS)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export const ReportesPBI: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ReportesPBI
        });

        static defaultProps: IDropDrownListProps = {
            id: "ReportePBI",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ReportesPBI", "kontrol/reportes/pbi");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    export class EstadoCivilDDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTADOCIVIL
        });

        static defaultProps: IDropDrownListProps = {
            id: "EstadoCivil",
            items: createDefaultStoreObject([]),
            label: "Estado Civil",
            helpLabel: "Seleccione su Estado Civil",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        component: any =
            ReactRedux.connect(EstadoCivilDDL.props, null)(EK.UX.DropDownLists.DropdownList$Form);

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTADOCIVIL", "catalogos/get(ESTADOCIVIL)");
            };
        };

        render(): any {
            return <this.component {...this.props} />;
        };
    };
    class RegimenDDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.REGIMEN
        });

        static defaultProps: IDropDrownListProps = {
            id: "Regimen",
            items: createDefaultStoreObject([]),
            label: "Regimen Conyugal",
            helpLabel: "Seleccione su Regimen Conyugal",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        component: any =
            ReactRedux.connect(RegimenDDL.props, null)(EK.UX.DropDownLists.DropdownList$Form);

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::REGIMEN", "catalogos/get(REGIMEN)");
            };
        };

        render(): any {
            return <this.component {...this.props} />;
        };
    };
    class Tipo$UbicacionDDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSUBICACION
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoUbicacion",
            items: createDefaultStoreObject([]),
            label: "Tipo de Ubicación",
            helpLabel: "Seleccione un Tipo de Ubicación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TiposUbicacion", { activos: 1 });
                dispatchAsync("load::TIPOSUBICACION", url);
                //dispatchAsync("load::TIPOSUBICACION", "catalogos/get(TIPOSUBICACION)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TipoUbicacionDDL: any =
        ReactRedux.connect(Tipo$UbicacionDDL.props, null)(Tipo$UbicacionDDL);

    class $UbicacionesDDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.UBICACIONES
        });

        static defaultProps: IDropDrownListProps = {
            id: "Ubicacion",
            items: createDefaultStoreObject([]),
            label: "Ubicación",
            helpLabel: "Seleccione un Tipo de Ubicación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {

                if (this.props.cargarDatos) {
                    let url: string = global.encodeAllURL("scv", "Ubicaciones", { activos: 1 });
                    dispatchAsync("load::UBICACIONES", url);
                }
                else {
                    global.dispatchSuccessful("load::UBICACIONES", []);
                }

            };

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const UbicacionesDDL: any = ReactRedux.connect($UbicacionesDDL.props, null)($UbicacionesDDL);

    interface IUbicacionesDesarrolloProps extends EK.UX.DropDownLists.IDropDrownListProps {
        idDesarrollo?: number;
        Paquete?: any;
        usaPaquete?: boolean;
        ubicacion?: any;
    };

    class $UbicacionesDesarrolloDDL extends React.Component<IUbicacionesDesarrolloProps, EK.UX.DropDownLists.IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.UBICACIONESDES,
            ubicacion: Forms.getValue("Ubicacion", "Ubicaciones", state),
        });
        static defaultProps: IUbicacionesDesarrolloProps = {
            id: "Ubicacion",
            items: createDefaultStoreObject([]),
            label: "Ubicación",
            helpLabel: "Seleccione un Tipo de Ubicación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            usaPaquete: false,
            matchers: ["Clave", "Nombre", "ClaveFormato", "ClaveCorta"],
            itemFormatter: (item, container): any => {
                if (!item.id || item.id == -1) {
                    return $(["<span>", item.text, "</span>"].join(""));
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", item.ClaveCorta, "</span>",
                        "<span>", item.ClaveFormato, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id || item.id == -1) {
                    item.Clave = "VT";
                    item.id = item.ID;
                    //Forms.updateFormElement(this.props.Paquete, "Ubicacion", { ID: -1, Nombre: "Seleccione una Ubicacion." })
                    return $(["<span>", item.text, "</span>"].join(""));
                }
                return $([
                    "<span class='badge badge-info'>", item.ClaveCorta, "</span>",
                    "<span>", item.ClaveFormato, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                if (this.props.idDesarrollo > 0 && this.props.usaPaquete === false) {
                    let url: string = global.encodeAllURL("scv", "Ubicaciones", { idDesarrollo: this.props.idDesarrollo, activos: 1, paquete: false });
                    dispatchAsync("load::UBICACIONESDES", url);
                };
            };
        };
        componentWillReceiveProps(nextProps: IUbicacionesDesarrolloProps) {
            if (this.props.usaPaquete === true && (this.props.idDesarrollo !== nextProps.idDesarrollo || this.props.Paquete !== nextProps.Paquete)) {
                Forms.updateFormElement(this.props.Paquete, "Ubicacion", { ID: -1, Nombre: "Seleccione una Ubicacion." })
                let estatusUbicacion = nextProps.Paquete !== null ? 'D' : null;
                let url: string = global.encodeAllURL("scv", "Ubicaciones", { idDesarrollo: this.props.idDesarrollo, activos: 1, idPaquete: nextProps.Paquete.ID, claveEstatus: estatusUbicacion });
                dispatchAsync("load::UBICACIONESDES", url);
            };
            if (hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                let financiamiento: any = getData(Forms.getValue("Financiamiento", "ventas"));
                let idUbicacion: any = nextProps.ubicacion ? nextProps.ubicacion.ID : 0;

                let idFinanciamiento: any = financiamiento && financiamiento.length > 0 ? financiamiento[0].IdFinanciamiento : 0;

                let encodedParams = global.encodeParameters({ IdUbicacion: idUbicacion, IdEsquema: idFinanciamiento, ventaOpcional: false });
                dispatchAsync("load::CARACTERISTICAS_AD", "CaracteristicaAdicional/GetAllByVentaOpcional/" + encodedParams);
            }

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const UbicacionesDesarrolloDDL: any = ReactRedux.connect($UbicacionesDesarrolloDDL.props, null)($UbicacionesDesarrolloDDL);

    export class CentrosCosto$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CENTROCOSTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "IdCentroCosto",
            label: "Centro Costo",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione Centro de Costo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::CENTROCOSTO", "CENTROCOSTO/GetAll(0)");
                //dispatchAsync("load::Compania", url);

            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const CentrosCostoDDL: any =
        ReactRedux.connect(CentrosCosto$DDL.props, null)(CentrosCosto$DDL);

    //se movio internamente al componente CentroCostosDDL

    //const centrosCostoMapProps: any = (state: any) => {
    //    return {
    //        items: state.centroscosto.centroscosto,
    //        value: state.centroscosto.selected
    //    };
    //}

    //const centrosCostoMapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
    //    return {
    //        change: (item: any): any => {
    //            dispatchSuccessful("CentrosCosto-setSelected", item);
    //        },
    //        loadData: (item: any): void => {
    //            dispatchAsync("CentrosCosto-catalogo", "CentroCosto/GetAll(0)");
    //        }
    //    }
    //};

    export let PrototiposDDl: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PROTOTIPOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Prototipo",
            items: createDefaultStoreObject([]),
            label: "Prototipo",
            helpLabel: "Seleccione un prototipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            cargarDatos: true,
            addNewItem: undefined,
            nuevoItem: undefined,
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                if (this.props.cargarDatos) {
                    let url: string = global.encodeAllURL("scv", "Prototipos", { activos: 1 });
                    dispatchAsync("load::PROTOTIPOS", url);
                }
                else {
                    global.dispatchSuccessful("load::PROTOTIPOS", []);
                }
            };

        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };

    })
    interface IDesarrollosProps extends IDropDrownListProps { }
    // Filtro Bancos 


    /*Inicia Impacto*/

    class Impacto$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOCONCEPTOPAGO
        });
        //static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
        //    change: (item: any): void => {
        //        dispatchSuccessful("load::TipoConceptoPagoSelected", item);
        //    }

        //});
        static defaultProps: IDropDrownListProps = {
            id: "Impacto",
            items: createDefaultStoreObject([]),
            label: "Impacto",
            helpLabel: "Seleccione un Impacto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOCONCEPTOPAGO", "catalogos/get(IMPACTO)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const ImpactoDDL: any =
        ReactRedux.connect(Impacto$DDL.props, null)(Impacto$DDL);
    interface IImpactoProps extends IDropDrownListProps {
        impacto?: string;
    }

    /*Termina Impacto*/

    class TiposConceptoPago$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOCONCEPTOPAGO
        });
        //static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
        //    change: (item: any): void => {
        //        dispatchSuccessful("load::TipoConceptoPagoSelected", item);
        //    }

        //});
        static defaultProps: IDropDrownListProps = {
            id: "TipoConceptoPago",
            items: createDefaultStoreObject([]),
            label: "Tipo de Concepto de Pago",
            helpLabel: "Seleccione un Tipo de Concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOCONCEPTOPAGO", "catalogos/get(TIPOCONCEPTOPAGO)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TiposConceptoPagoDDL: any =
        ReactRedux.connect(TiposConceptoPago$DDL.props, null)(TiposConceptoPago$DDL);
    interface IConceptosPagoProps extends IDropDrownListProps {
        tipoConcepto?: string;
    }
    export class ConceptosPago$DDL extends React.Component<IConceptosPagoProps, {}> {
        constructor(props: IConceptosPagoProps) {
            super(props);
        }
        static props: any = (state: any) => {
            return {
                dataManager: new StateDataManager(state.conceptosPago)
            };
        };
        static defaultProps: IConceptosPagoProps = {
            id: "ConceptoPago",
            items: createDefaultStoreObject([]),
            label: "",
            helpLabel: "",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6],
            tipoConcepto: "todos"
        };

        componentDidMount(): void {
            let url: string = ["conceptosPago/tipo(", this.props.tipoConcepto, ")"].join("");

            dispatchAsync("scv-conceptosPorTipo", url, this.props.tipoConcepto);
        };

        render(): any {
            let items: DataElement = this.props.dataManager.getById(this.props.tipoConcepto);

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />;
        };
    };
    export const ConceptosPagoDDL: any =
        ReactRedux.connect(ConceptosPago$DDL.props, null)(ConceptosPago$DDL);
    class FrecuenciaPago$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.FRECUENCIASPAGO
        });

        static defaultProps: IDropDrownListProps = {
            id: "FrecuenciaPago",
            items: createDefaultStoreObject([]),
            label: "Frecuencias de Pago",
            helpLabel: "Seleccione una Frecuencia de pago",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::FRECUENCIASPAGO", "catalogos/get(FRECUENCIASPAGO)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const FrecuenciaPagoDDL: any =
        ReactRedux.connect(FrecuenciaPago$DDL.props, null)(FrecuenciaPago$DDL);
    class PeriodoPago$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PERIODOSPAGO
        });
        static defaultProps: IDropDrownListProps = {
            id: "PeriodoPago",
            items: createDefaultStoreObject([]),
            label: "Períodos de Pago",
            helpLabel: "Seleccione un Período de pago",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PERIODOSPAGO", "catalogos/get(PERIODOSPAGO)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const PeriodoPagoDDL: any =
        ReactRedux.connect(PeriodoPago$DDL.props, null)(PeriodoPago$DDL);


    class FechaConsiderarComisiones$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CONSIDERARFECHAVANCE
        });
        static defaultProps: IDropDrownListProps = {
            id: "ConsiderarFechaAvance",
            items: createDefaultStoreObject([]),
            label: "Considerar Fecha para el Avance",
            helpLabel: "Seleccione un la Forma de Avance de las Etapas",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::CONSIDERARFECHAVANCE", "catalogos/get(CONSIDERARFECHAVANCE)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const FechaConsiderarComisionesDDL: any =
        ReactRedux.connect(FechaConsiderarComisiones$DDL.props, null)(FechaConsiderarComisiones$DDL);

    class TiposDocumentosExpediente$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SCVTIPOSDOCUMENTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoDocumento",
            items: global.createDefaultStoreObject([]),
            label: "Tipo de Documento",
            helpLabel: "Seleccione el tipo de documento",
            value: global.createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCVTIPOSDOCUMENTO", "catalogos/get(SCVTIPOSDOCUMENTO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export let TiposDocumentosExpedienteDDL: any = ReactRedux.connect(TiposDocumentosExpediente$DDL.props, null)(TiposDocumentosExpediente$DDL);

    export let TiposFinanciamientoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOFINANCIAMIENTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoFinanciamiento",
            items: createDefaultStoreObject([]),
            label: "Tipo de Financiamiento",
            helpLabel: "Seleccione el tipo de financiamiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOFINANCIAMIENTO", "base/scv/tipoFinanciamiento/all/" + global.encodeParameters({ activos: 1 }));
            };
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export let InstitucionesCreditoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.INSTITUCIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Institucion",
            items: createDefaultStoreObject([]),
            label: "Institucion de Crédito",
            helpLabel: "Seleccione la Institución de Crédito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::INSTITUCIONES", "base/scv/Instituciones/all/" + global.encodeParameters({ activos: 1 }));
            };
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    interface ITipoAgendaProps extends IDropDrownListProps {
        agregarTodos?: any;
        funcionAgenda?: any;
        totalItems?: any;
    };

    export let TipoAgendaDDL: any = global.connect(class extends React.Component<ITipoAgendaProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoAgenda,
            funcionAgenda: state.global.funcionAgenda
        });
        static defaultProps: ITipoAgendaProps = {
            id: "TipoAgenda",
            items: createDefaultStoreObject([]),
            label: "Tipo de Agenda",
            helpLabel: "Seleccione el tipo de Agenda",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            agregarTodos: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    let iconoConfig: any;
                    switch (item.Clave) {
                        case 'FechaConstruccion':
                            iconoConfig = " fas fa-building ";
                            break;
                        case 'EntregaVivienda':
                            iconoConfig = "glyphicon glyphicon-user";
                            break;
                        case 'Contratista':
                            iconoConfig = "fas fa-user-tie";
                            break;
                        case 'ContratistaAreasComunes':
                            iconoConfig = "fas fa-user-tie";
                            break;
                        case "Dictamen":
                            iconoConfig = "fas fa-clipboard-check";
                            break;
                        case "DictamenAreasComunes":
                            iconoConfig = "fas fa-clipboard-check";
                            break;
                    }
                    return $([
                        item.ID == -2 ? "<span class='badge badge-success '> " + item.Nombre + "</span>" : "<i class='" + iconoConfig + "'> </i>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                let iconoConfig: any;

                switch (item.Clave) {
                    case 'FechaConstruccion':
                        iconoConfig = " fas fa-building ";
                        break;
                    case 'EntregaVivienda':
                        iconoConfig = "glyphicon glyphicon-user";
                        break;
                    case 'Contratista':
                        iconoConfig = "fas fa-user-tie";
                        break;
                    case 'ContratistaAreasComunes':
                        iconoConfig = "fas fa-user-tie";
                        break;
                    case "Dictamen":
                        iconoConfig = "fas fa-clipboard-check";
                        break;
                    case "DictamenAreasComunes":
                        iconoConfig = "fas fa-clipboard-check";
                        break;
                };

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    item.ID == -2 ? "<span class='badge badge-success '> " + item.Nombre + "</span>" : "<i class='" + iconoConfig + "'> </i>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentWillMount(): void {
            //global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
        };
        shouldComponentUpdate(nextProps: ITipoAgendaProps, nextState: ITipoAgendaProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            let funcionAgenda: any = getData(this.props.funcionAgenda).tipo ? getData(this.props.funcionAgenda).tipo : null;

            if (global.isSuccessful(this.props.items)) {
                let x: number;
                let totalItems: any = itemsModificados.data.length;
                //console.log(itemsModificados.data)
                for (x = totalItems; x > 0; x--) {
                    switch (funcionAgenda) {
                        case "Contratista":
                            if (String(itemsModificados.data[x - 1].Clave) != "Contratista" && String(itemsModificados.data[x - 1].Clave) != "Dictamen") {
                                itemsModificados.data.splice(x - 1, 1);
                            }
                            break;
                        case "ContratistaAreasComunes":
                            if (String(itemsModificados.data[x - 1].Clave) != "ContratistaAreasComunes" && String(itemsModificados.data[x - 1].Clave) != "DictamenAreasComunes") {
                                itemsModificados.data.splice(x - 1, 1);
                            }
                            break;
                        case "PostVenta":
                            if (String(itemsModificados.data[x - 1].Clave) != "EntregaVivienda" && String(itemsModificados.data[x - 1].Clave) != "FechaConstruccion") {
                                itemsModificados.data.splice(x - 1, 1);
                            }
                            break;
                        default:
                    }
                };

                if (this.props.agregarTodos && funcionAgenda === "PostVenta") {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };

                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem["ID"] = -2;
                        //nuevoItem["Clave"] = "TODOS";
                        //nuevoItem["Nombre"] = "TODOS";
                        nuevoItem["Clave"] = "";
                        nuevoItem["Nombre"] = "";
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    };
                }
            };

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    });

    export let TipoAgendaFixedDDL: any = global.connect(class extends React.Component<ITipoAgendaProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TipoAgenda,
            totalItems: state.global.ListaTipoAgenda,
            funcionAgenda: state.global.funcionAgenda
        });
        static defaultProps: ITipoAgendaProps = {
            id: "TipoAgenda",
            items: createDefaultStoreObject([]),
            label: "Tipo de Agenda",
            helpLabel: "Seleccione el tipo de Agenda",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            agregarTodos: false,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    let iconoConfig: any;
                    switch (item.Clave) {
                        case 'FechaConstruccion':
                            iconoConfig = " fas fa-building ";
                            break;
                        case 'EntregaVivienda':
                            iconoConfig = "glyphicon glyphicon-user";
                            break;
                        case 'Contratista':
                            iconoConfig = "fas fa-user-tie";
                            break;
                        case 'ContratistaAreasComunes':
                            iconoConfig = "fas fa-user-tie";
                            break;
                        case "Dictamen":
                            iconoConfig = "fas fa-clipboard-check";
                            break;
                        case "DictamenAreasComunes":
                            iconoConfig = "fas fa-clipboard-check";
                            break;
                    }
                    return $([
                        item.ID == -2 ? "<span class='badge badge-success '> " + item.Nombre + "</span>" : "<i class='" + iconoConfig + "'> </i>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                let iconoConfig: any;

                switch (item.Clave) {
                    case 'FechaConstruccion':
                        iconoConfig = " fas fa-building ";
                        break;
                    case 'EntregaVivienda':
                        iconoConfig = "glyphicon glyphicon-user";
                        break;
                    case 'Contratista':
                        iconoConfig = "fas fa-user-tie";
                        break;
                    case 'ContratistaAreasComunes':
                        iconoConfig = "fas fa-user-tie";
                        break;
                    case "Dictamen":
                        iconoConfig = "fas fa-clipboard-check";
                        break;
                    case "DictamenAreasComunes":
                        iconoConfig = "fas fa-clipboard-check";
                        break;
                };

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    item.ID == -2 ? "<span class='badge badge-success '> " + item.Nombre + "</span>" : "<i class='" + iconoConfig + "'> </i>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentWillMount(): void {
            let itemsAgenda = EK.Store.getState().global.ListaTipoAgenda ? EK.Store.getState().global.ListaTipoAgenda.data : [];
            let x = [...itemsAgenda];
            if (x.length > 0) {
                global.dispatchSuccessful("load::TipoAgenda", x)
            } else {
                global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
            }

            //global.dispatchAsync("load::TipoAgenda", "catalogos/get(TipoAgenda)");
        };
        shouldComponentUpdate(nextProps: ITipoAgendaProps, nextState: ITipoAgendaProps): boolean {
            return hasChanged(this.props.items, nextProps.items)
            //hasChanged(this.props.totalItems, nextProps.totalItems);
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            let funcionAgenda: any = getData(this.props.funcionAgenda).tipo ? getData(this.props.funcionAgenda).tipo : null;

            if (global.isSuccessful(this.props.items)) {
                let x: number;
                let totalItems: any = itemsModificados.data.length;
                //console.log(itemsModificados.data)
                for (x = totalItems; x > 0; x--) {
                    switch (funcionAgenda) {
                        case "Contratista":
                            if (String(itemsModificados.data[x - 1].Clave) != "Contratista" && String(itemsModificados.data[x - 1].Clave) != "Dictamen") {
                                itemsModificados.data.splice(x - 1, 1);
                            }
                            break;
                        case "ContratistaAreasComunes":
                            if (String(itemsModificados.data[x - 1].Clave) != "ContratistaAreasComunes" && String(itemsModificados.data[x - 1].Clave) != "DictamenAreasComunes") {
                                itemsModificados.data.splice(x - 1, 1);
                            }
                            break;
                        case "PostVenta":
                            if (String(itemsModificados.data[x - 1].Clave) != "EntregaVivienda" && String(itemsModificados.data[x - 1].Clave) != "FechaConstruccion") {
                                itemsModificados.data.splice(x - 1, 1);
                            }
                            break;
                        default:
                    }
                };

                if (this.props.agregarTodos && funcionAgenda === "PostVenta") {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };

                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem["ID"] = -2;
                        //nuevoItem["Clave"] = "TODOS";
                        //nuevoItem["Nombre"] = "TODOS";
                        nuevoItem["Clave"] = "";
                        nuevoItem["Nombre"] = "";
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    };
                }
            };

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    });
    //TipoClasificador
    export let TiposDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSCLASIFICADORES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tipos",
            items: createDefaultStoreObject([]),
            label: "Tipos de Clasificador",
            helpLabel: "Seleccione el tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            addNewItem: undefined,
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSCLASIFICADORES", "catalogos/get(TIPOSCLASIFICADORES)");
            };
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export class SCVEtapas$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.etapas.catalogo
        });
        static defaultProps: IDropDrownListProps = {
            id: "Etapa",
            items: createDefaultStoreObject([]),
            label: "Etapa",
            helpLabel: "Selecciona la Etapa",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "etapas", { activos: 1 });
                dispatchAsync("etapas-catalogo", url);
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export let SCVEtapasDDL: any = ReactRedux.connect(SCVEtapas$DDL.props, null)(SCVEtapas$DDL);



    export class SCVRequisitos$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.requisitos.catalogo
        });
        static defaultProps: IDropDrownListProps = {
            id: "Requisito",
            items: createDefaultStoreObject([]),
            label: "Requisito",
            helpLabel: "Selecciona el Requisito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "requisitos", { activos: 1 });
                dispatchAsync("scv-requisitos-catalogo", url);
            }
        }

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const SCVRequisitosDDL: any =
        ReactRedux.connect(SCVRequisitos$DDL.props, null)(SCVRequisitos$DDL);
    export class SCVDocumentosExpediente$DDL extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.documentosExpediente.catalogo
        });

        static defaultProps: IDropDrownListProps = {
            id: "Documento",
            items: createDefaultStoreObject([]),
            label: "Documento",
            helpLabel: "Seleccione el Documento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "documentosExpediente", { activos: 1 });
                dispatchAsync("scv-documentosExpediente-catalogo", url);
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const SCVDocumentosExpedienteDDL: any =
        ReactRedux.connect(SCVDocumentosExpediente$DDL.props, null)(SCVDocumentosExpediente$DDL);

    interface ISCVEsquemasSeguimiento extends IDropDrownListProps {
        faseClave?: string;
        idDesarrollo?: number;
    }
    export let SCVEsquemasSeguimiento = global.connect(class extends React.Component<ISCVEsquemasSeguimiento, {}> {
        constructor(props: ISCVEsquemasSeguimiento) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.ESQUEMASSEGUIMIENTO
        });

        static defaultProps: ISCVEsquemasSeguimiento = {
            id: "Esquema",
            items: createDefaultStoreObject([]),
            label: "Esquema",
            helpLabel: "Seleccione el Esquema",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6],
            faseClave: null,
            idDesarrollo: null
        };
        componentDidMount(): void {
            let faseClave: string = this.props.faseClave;
            let idDesarrollo: number = this.props.idDesarrollo;
            let encodedFilters: string = global.encodeParameters({ activos: 1, faseClave, idDesarrollo });
            global.dispatchAsync("load::ESQUEMASSEGUIMIENTO", "esquemas/all/" + encodedFilters, faseClave);
        }
        render(): any {
            //let items: DataElement = this.props.dataManager.getById(this.props.faseClave);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}/* items={items}*/ />
        }
    });

    interface ISCVEsquemasConfiguracion extends ISCVEsquemasSeguimiento { idExpediente?: number; }

    export let SCVEsquemasConfiguracion = global.connect(class extends React.Component<ISCVEsquemasConfiguracion, {}> {
        constructor(props: ISCVEsquemasConfiguracion) {
            super(props);
        }
        static props: any = (state: any) => ({
            dataManager: new StateDataManager(state.esquemas)
        });

        static defaultProps: ISCVEsquemasConfiguracion = {
            id: "Esquema",
            items: createDefaultStoreObject([]),
            label: "Esquema Seguimiento",
            helpLabel: "Seleccione el Esquema Seguimiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6],
            faseClave: ""
        };
        componentDidMount(): void {
            let faseClave: string = this.props.faseClave;

            let encodedFilters: string = global.encodeParameters({ activos: 1, faseClave });
            global.dispatchAsync("scv-esquemas-catalogo", "esquemas/all/" + encodedFilters, faseClave);
        };
        render(): any {
            let items: DataElement = this.props.dataManager.getById(this.props.faseClave);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />
        }
    });

    export class SCVTipoRelacion$DDL extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.RELACIONESCARACTERISTICAS
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoRelacion",
            items: createDefaultStoreObject([]),
            label: "Tipos Relacionado",
            helpLabel: "Seleccione el Tipo Relacionado",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::RELACIONESCARACTERISTICAS", "catalogos/get(RELACIONESCARACTERISTICAS)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const SCVTipoRelacionDDL: any =
        ReactRedux.connect(SCVTipoRelacion$DDL.props, null)(SCVTipoRelacion$DDL);

    export class TiposEntidades$DDL extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.SCVTIPOSENTIDADES
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo de Entidad",
            helpLabel: "Seleccione el Tipo de Entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SCVTIPOSENTIDADES", "catalogos/get(SCVTIPOSENTIDADES)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const TiposEntidadesDDL: any =
        ReactRedux.connect(TiposEntidades$DDL.props, null)(TiposEntidades$DDL);

    export class TipoCaracteristica$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSCARACTERISTICA
        });

        static defaultProps: IDropDrownListProps = {
            id: "",
            items: undefined,
            value: undefined,
            initialValue: false,
            hasChanged: true,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSCARACTERISTICA", "catalogos/get(TIPOSCARACTERISTICA)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const TipoCaracteristicaDDL: any =
        ReactRedux.connect(TipoCaracteristica$DDL.props, null)(TipoCaracteristica$DDL);

    interface ICaracteristicasAdicionalesProps extends IDropDrownListProps {
        ubicacion?: any;
        financiamiento?: any;
        tipoComercializacion?: any;
    };
    export const CAdicionalesDDL: any = global.connect(class extends React.Component<ICaracteristicasAdicionalesProps, ICaracteristicasAdicionalesProps> {
        static props: any = (state: any) => {
            return {
                items: state.global.CARACTERISTICAS_AD,
                ubicacion: Forms.getValue("Ubicacion", "Ubicaciones", state),
                financiamiento: Forms.getValue("Financiamiento", "ventas", state),
                tipoComercializacion: Forms.getValue("TipoComercializacion", "ventas", state)

            };
        };
        static defaultProps: ICaracteristicasAdicionalesProps = {
            id: "Caracteristica",
            items: createDefaultStoreObject([]),
            label: "Característica Adicional",
            helpLabel: "",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let xFinanciamiento: any[] = global.getData(this.props.financiamiento, []);
                let idUbicacion: any = this.props.ubicacion ? this.props.ubicacion.ID : 0;
                let idFinanciamiento: any = xFinanciamiento.length !== 0 ? xFinanciamiento[0].IdFinanciamiento : 0;
                let idTipoComercializacion: any = this.props.tipoComercializacion ? this.props.tipoComercializacion.ID : 0;
                let encodedParams = global.encodeParameters({ IdUbicacion: idUbicacion, IdEsquema: idFinanciamiento, ventaOpcional: false, IdTipoComercializacion: idTipoComercializacion });
                dispatchAsync("load::CARACTERISTICAS_AD", "CaracteristicaAdicional/GetAllByVentaOpcional/" + encodedParams);
            };
        };
        componentWillReceiveProps(nextProps: ICaracteristicasAdicionalesProps): any {
            if (
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                global.hasChanged(this.props.financiamiento, nextProps.financiamiento)) {
                let xFinanciamiento: any[] = global.getData(this.props.financiamiento, []);
                let idUbicacion: any = this.props.ubicacion ? this.props.ubicacion.ID : 0;
                let idFinanciamiento: any = xFinanciamiento[0].IdFinanciamiento;
                let idTipoComercializacion: any = this.props.tipoComercializacion ? this.props.tipoComercializacion.ID : 0;
                let encodedParams = global.encodeParameters({ IdUbicacion: idUbicacion, IdEsquema: idFinanciamiento, ventaOpcional: false, IdTipoComercializacion: idTipoComercializacion });
                dispatchAsync("load::CARACTERISTICAS_AD", "CaracteristicaAdicional/GetAllByVentaOpcional/" + encodedParams);
            };
        };
        componentWillUpdate(): any {
        };
        componentDidUpdate(): any {
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    //export let CaracteristicasAdicionalesDDL: any =
    //    ReactRedux.connect(CaracteristicasAdicionales$DDL.props, null)(CaracteristicasAdicionales$DDL);



    export class AccionesProceso$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.PROCESOS
        });

        static defaultProps: IDropDrownListProps = {
            id: "AccionProceso",
            items: createDefaultStoreObject([]),
            //label: "Acciones de Procesos",
            helpLabel: "Seleccione la acción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PROCESOS", "catalogos/get(PROCESOS)");
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };

    export const AccionesProcesoDDL: any =
        ReactRedux.connect(AccionesProceso$DDL.props, null)(AccionesProceso$DDL);


    interface IProcesos extends IDropDrownListProps {
        tipoProceso: string;
    };
    export let SCVProcesosDDL: any = global.connect(class extends React.Component<IProcesos, {}> {
        constructor(props: IProcesos) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.procesosReducer.catalogo
        });
        static defaultProps: IProcesos = {
            id: "Proceso",
            items: createDefaultStoreObject([]),
            label: "Proceso",
            helpLabel: "Seleccione el Proceso",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6],
            tipoProceso: null,
        };
        loadInfo(tipoProceso: string): void {
            let parameters: string = global.encodeParameters({ activos: 1 });

            if (this.props.tipoProceso != null) {
                parameters = global.encodeParameters({ activos: 1, claveTipoProceso: tipoProceso });
            }
            dispatchAsync("scv-procesos-catalogo", "base/scv/procesos/all/" + parameters);
        }

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.loadInfo(this.props.tipoProceso);
            }
        }
        componentWillReceiveProps(nextProps: IProcesos, nextState: IProcesos): any {
            if (global.hasChanged(this.props.tipoProceso, nextProps.tipoProceso) && nextProps.tipoProceso != null) {
                this.loadInfo(nextProps.tipoProceso)
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    /**
     * WorkFlow Tipos
     */


    interface IIWorkFlowTypeEnum {
        Venta: string;
        Etapa: string;
        Requisito: string;
    };

    export var IWorkFlowTypeEnum: IIWorkFlowTypeEnum = {
        Venta: "WF-VENTA",
        Etapa: "WF-ETAPA",
        Requisito: "WF-REQUISITO"
    };

    /**
     * WorkFlow DropDrownList
     * 
     */

    interface IWorkflowsDDLProps extends IDropDrownListProps {
        claveTipo: string;
    }

    export let WorkflowsDDL: any = global.connect(class extends React.Component<IWorkflowsDDLProps, {}> {
        constructor(props: IWorkflowsDDLProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            dataManager: new StateDataManager(state.flujos)
        });
        static defaultProps: IWorkflowsDDLProps = {
            id: "WorkFlow",
            items: createDefaultStoreObject([]),
            //label: "Flujo de Trabajo",
            //helpLabel: "Seleccione el Flujo de Trabajo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined,
            claveTipo: ""
        }
        componentDidMount(): any {
            global.dispatchAsync("flujos-list", "workflows/GetWorkflowByTipo(" + this.props.claveTipo + ")", this.props.claveTipo);
        }
        render(): any {
            let items: DataElement = this.props.dataManager.getById(this.props.claveTipo);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />;
        }
    });


    class MacroEtapas$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ScvMacroEtapas
        });

        static defaultProps: IDropDrownListProps = {
            id: "MacroEtapa",
            items: createDefaultStoreObject([]),
            label: "Macro-Etapa",
            helpLabel: "Seleccione una macro-etapa",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "macroEtapas", { activos: 1 });
                dispatchAsync("load::ScvMacroEtapas", url);
            }
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export let MacroEtapasDDL: any = ReactRedux.connect(MacroEtapas$DDL.props, null)(MacroEtapas$DDL);

    export let TiposRequisitoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.requisitos.tipoCatalogo
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            change: (item: any): void => {
                dispatchSuccessful("scv-requisitos-tipoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoRequisito",
            items: createDefaultStoreObject([]),
            label: "Tipo de Requisito",
            helpLabel: "Seleccione el tipo de requisito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("scv-requisitos-tipoCatalogo", "catalogos/get(SCVTIPOSREQUISITO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let TiposCheckListsDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.TIPOSCHECKLISTS
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoCheckList",
            items: createDefaultStoreObject([]),
            label: "Tipo de CheckList",
            helpLabel: "Seleccione el tipo de CheckList",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSCHECKLISTS", "catalogos/get(CHECKLISTSTIPO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export let CategoriasCheckListsDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.CATAEGORIASCHECKLISTS
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });
        static defaultProps: IDropDrownListProps = {
            id: "CategoriaCheckList",
            items: createDefaultStoreObject([]),
            label: "Categoría del CheckList",
            helpLabel: "Seleccione la Categoría del CheckList",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::CATAEGORIASCHECKLISTS", "catalogos/get(CHECKLISTSCATEGORIA)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    //TipoFalla
    export let TiposFallasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.TIPOSFALLAS
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            change: (item: any): void => {
                dispatchSuccessful("scv-TIPOSFALLAS-tipoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoFalla",
            items: createDefaultStoreObject([]),
            label: "Tipo de Incidencia",
            helpLabel: "Seleccione el tipo de Incidencia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "tipofalla", {});
                dispatchAsync("load::TIPOSFALLAS", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    //TipoFalla
    //TipoComponente
    export let TipoComponentesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.TIPOSCOMPONENTES
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            change: (item: any): void => {
                dispatchSuccessful("scv-TIPOSCOMPONENTES-tipoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoComponente",
            items: createDefaultStoreObject([]),
            label: "Tipo de Componente",
            helpLabel: "Seleccione el tipo de Componente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "TiposComponentes", {});
                dispatchAsync("load::TIPOSCOMPONENTES", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    //TipoComponente


    //TipoInmueble
    export let TiposInmueblesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.TIPOINMUEBLE
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            change: (item: any): void => {
                dispatchSuccessful("scv-TIPOSFALLAS-tipoSelected", item);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoInmueble",
            items: createDefaultStoreObject([]),
            label: "Tipo de Inmueble",
            helpLabel: "Seleccione un Tipo de Inmueble",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOINMUEBLE", "catalogos/get(TIPOINMUEBLE)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    //TipoInmueble


    export let TiposCamposDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListState>{
        static props: any = (state: any) => ({
            // items: state.requisitos.tipoCatalogo
            items: state.global.DDLTipoCampo
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            change: (item: any): void => {
                //dispatchSuccessful("scv-requisitos-tipoSelected", item);
                global.dispatchSuccessful("global-page-data", item, "TipoCampoSelect");
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoCampo",
            items: createDefaultStoreObject([]),
            label: "Tipo",
            helpLabel: "Seleccione el tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::DDLTipoCampo", "catalogos/get(KONTROLPERSONALIZARCAMPOS)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    //Hay un componente igual en ConfiguraciónFormulario.tsx Pendiente de ajustar en esta página, Determinar Impacto
    export let TipoEntidadConfiguracionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoEntidadConfiguracionForm,
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo Entidad",
            helpLabel: "Seleccione un Tipo Entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            let parametros: any = global.encodeParameters({ activos: 1 });
            global.dispatchAsync("load::TipoEntidadConfiguracionForm", "base/kontrol/ConfiguracionFormulario/Get/GetAllEntidades/" + parametros);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let TiposEntidad: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TiposEntidadDDL,
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo Entidad",
            helpLabel: "Seleccione un Tipo Entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            let parametros: any = global.encodeParameters({ activos: 1 });
            global.dispatchAsync("load::TiposEntidadDDL", "base/kontrol/TiposEntidad/Get/GetAll/" + parametros);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let TipoEntidadDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoEntidadConfiguracionForm,
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo Entidad",
            helpLabel: "Seleccione un Tipo Entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            let parametros: any = global.encodeParameters({ activos: 1 });
            global.dispatchAsync("load::TipoEntidadConfiguracionForm", "base/kontrol/TiposEntidad/Get/GetAll/" + parametros);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let FasesExpedienteDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.fasesExpediente.kv
        });
        static defaultProps: IDropDrownListProps = {
            id: "FaseExpediente",
            items: createDefaultStoreObject([]),
            label: "Fase de Expediente",
            helpLabel: "Seleccione una fase de expediente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "fasesExpediente", { activos: 1 });
                dispatchAsync("scv-fasesExpediente-kv", url);
            }
        }
        render(): any {
            return <DropdownList$Form {...this.props} />
        }
    });


    //export let TipoExpedienteDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
    //    static props: any = (state: any) => ({
    //        items: state.global.TipoExpediente
    //    });
    //    static defaultProps: IDropDrownListProps = {
    //        id: "TipoExpediente",
    //        items: createDefaultStoreObject([]),
    //        label: "Tipo de Expediente",
    //        helpLabel: "Seleccione un Tipo de Expediente",
    //        value: createDefaultStoreObject({}),
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        required: false,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        size: [12, 3, 3, 3],
    //        nuevoItem: undefined,
    //        addNewItem: undefined,
    //    };

    //    componentDidMount(): void {
    //        if (!isLoadingOrSuccessful(this.props.items)) {
    //            let url: string = global.encodeAllURL("scv", "tiposExpediente", { activos: 1 });
    //            dispatchAsync("load::tiposExpediente", url);
    //        };
    //    };
    //    render(): any {
    //        return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
    //    }

    //});

    export let Paises: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.PAISES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Pais",
            items: createDefaultStoreObject([]),
            label: "Pais",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PAISES", "base/kontrol/localidades/all/" + global.encodeParameters({ Tipo: "P" }));
            }
        }
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export let Estados: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.ESTADOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estado",
            items: createDefaultStoreObject([]),
            label: "Estado",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTADOS", "base/kontrol/localidades/all/" + global.encodeParameters({ Tipo: "E" }));
            }
        }
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });


    export class TipoInmueble$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOINMUEBLE
        });

        static defaultProps: IDropDrownListProps = {
            id: "Inmueble",
            items: createDefaultStoreObject([]),
            label: "Tipo de Inmueble",
            helpLabel: "Seleccione un Tipo de Inmueble",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOINMUEBLE", "catalogos/get(TIPOINMUEBLE)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export class RecamaraAdicional$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.RECAMARAS
        });

        static defaultProps: IDropDrownListProps = {
            id: "Recamara",
            items: createDefaultStoreObject([]),
            label: "Recamara Adicional",
            helpLabel: "Seleccione una Recamara Adicional",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::RECAMARAS", "catalogos/get(RECAMARAS)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TipoInmuebleDDL: any =
        ReactRedux.connect(TipoInmueble$DDL.props, null)(TipoInmueble$DDL);
    export const RecamaraAdicionalDDL: any =
        ReactRedux.connect(RecamaraAdicional$DDL.props, null)(RecamaraAdicional$DDL);

    export let EKCategoriasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.EK_CATEGORIAS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Categoria",
            items: createDefaultStoreObject([]),
            label: "Categoría",
            helpLabel: "Seleccione una categoría",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Puesto.Clave,
                            "</span> ",
                            "<span class='badge badge-success bold'> ",
                            item.obj.Nombre,
                            "</span>"].join(""));
                    }
                    else {
                        return $(["<span class='bold'> ", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Puesto.Clave,
                        "</span>",
                        "<span class='bold' style='font-size: 90%'> ",
                        item.Nombre,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success bold'>",
                    item.Puesto.Clave,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "categorias", { activos: 1, PuestoActivo: 1 });
                dispatchAsync("load::EK_CATEGORIAS", url);


            }
        }

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export class GradosInteres$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.GRADOSINTERES
        });

        static defaultProps: IDropDrownListProps = {
            id: "GradoInteres",
            items: createDefaultStoreObject([]),
            label: "Grado Interes",
            helpLabel: "Seleccione un Grado de Interes",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::GRADOSINTERES", "catalogos/get(GRADOSINTERES)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const GradosInteresDDL: any =
        ReactRedux.connect(GradosInteres$DDL.props, null)(GradosInteres$DDL);

    export class EstatusDocumentos$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUS_DOCUMENTOS
        });

        static defaultProps: IDropDrownListProps = {
            id: "EstatusDocumentos",
            items: createDefaultStoreObject([]),
            label: "Estatus Documentos",
            helpLabel: "Seleccione un Estatu de Interes",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUS_DOCUMENTOS", "catalogos/get(ESTATUS_DOCUMENTOS)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const EstatusDocumentosDDL: any =
        ReactRedux.connect(EstatusDocumentos$DDL.props, null)(EstatusDocumentos$DDL);

    export let TipoComercializacionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.TIPOCOMERCIALIZACION
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoComercializacion",
            label: "Tipo Comercialización",
            helpLabel: "Seleccione el Tipo de Comercializacion",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            cargarDatos: true
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                if (this.props.cargarDatos) {
                    // dispatchAsync("load::TIPOCOMERCIALIZACION", "catalogos/get(TIPOCOMERCIALIZACION)");
                    let url: string = global.encodeAllURL("scv", "TipoComercializacion", { activos: 1 });
                    dispatchAsync("load::TIPOCOMERCIALIZACION", url);
                }
                else {
                    global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
                }
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export interface ISCCOObrasDDLProps extends IDropDrownListProps {
        includeNiveles: boolean;
    };

    export let SCCO$ObrasDDL: any = global.connect(class extends React.Component<ISCCOObrasDDLProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.OBRAS
        });
        static defaultProps: ISCCOObrasDDLProps = {
            id: "Obra",
            label: "Obra",
            helpLabel: "Seleccione una Obra",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter,
            includeNiveles: false
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let parametros: any = { activos: 1 };
                //
                if (this.props.includeNiveles === true) {
                    parametros = global.assign(parametros, { IncludeNiveles: true });
                };
                //
                let url: string = global.encodeAllURL("scco", "Obra", parametros);
                global.dispatchAsync("load::OBRAS", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    export let SCCO$ContratistasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.CONTRATISTAS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Contratista",
            label: "Contratista",
            helpLabel: "Seleccione un Contratista",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scco", "Contratistas", { activos: 1 });
                dispatchAsync("load::CONTRATISTAS", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let SCVRegimenDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.SCVRegimen
        });
        static defaultProps: IDropDrownListProps = {
            id: "Regimen",
            label: "Regimen",
            helpLabel: "Seleccione un regimen",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "Regimen", { activos: 1 });
                dispatchAsync("load::SCVRegimen", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let TipoComercializacionDesarrolloDDL: any = global.connect(class extends React.Component<IDropDrownListProps, IDropDrownListProps>{
        static props: any = (state: any) => ({
            items: state.global.TIPOCOMERCIALIZACION,
            forms: state.forms
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoComercializacion",
            label: "Tipo Comercialización",
            helpLabel: "Seleccione el Tipo de Comercializacion",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            cargarDatos: true
        };
        getDesarrollo(props: IDropDrownListProps): any {
            let idForm: string = props.idFormSection ? props.idFormSection : props.idForm;
            let retValue: any = Forms.getValue("Desarrollo", idForm, props.forms);
            if (!retValue) {
                let idDesarrollo: number = Forms.getValue("IdDesarrollo", idForm, props.forms);
                if (idDesarrollo > 0) {
                    retValue = { ID: idDesarrollo, Clave: "", Nombre: "" };
                }
                else {
                    retValue = { ID: 0, Clave: "", Nombre: "" };
                };
            };
            //
            return retValue;
        };
        loadData(props: IDropDrownListProps): any {
            let desarrollo: any = this.getDesarrollo(props);
            //
            if (desarrollo.ID > 0) {
                dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/" + global.encodeParameters({ IdDesarrollo: desarrollo.ID, TipoOperacion: "Lista" }));
            }
            else {
                global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
            };
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.loadData(this.props);
            };
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            let thisDesarrollo: any = this.getDesarrollo(this.props);
            let nextDesarrollo: any = this.getDesarrollo(nextProps);
            //
            if (global.hasChanged(thisDesarrollo, nextDesarrollo)) {
                this.loadData(nextProps);
            };
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps): any {
            if (global.hasChanged(this.props.items, nextProps.items)) {
                return true;
            };

            let thisDesarrollo: any = this.getDesarrollo(this.props);
            let nextDesarrollo: any = this.getDesarrollo(nextProps);
            //
            if (global.hasChanged(thisDesarrollo, nextDesarrollo)) {
                return true;
            };
            //
            return false;
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let PaquetesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.PAQUETES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Paquete",
            label: "Paquetes",
            helpLabel: "Seleccione el Paquete",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            cargarDatos: true
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                if (this.props.cargarDatos) {
                    let url: string = global.encodeAllURL("scv", "Paquetes", { claveEstatus: "A" });
                    dispatchAsync("load::PAQUETES", url);
                }
                else {
                    global.dispatchSuccessful("load::PAQUETES", []);
                }
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let UsoFallaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.SPVUSOFALLA
        });

        static defaultProps: IDropDrownListProps = {
            id: "UsoFalla",
            label: "Uso Incidencia",
            helpLabel: "Seleccione el Tipo de Incidencia ",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SPVUSOFALLA", "catalogos/get(SPVUSOFALLA)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export let SCCOTipoConvenioDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.SCCOTIPOCONVENIO
        });
        static defaultProps: IDropDrownListProps = {
            id: "TIPO_CONVENIO",
            label: "TIPO Convenio",
            helpLabel: "Seleccione el Tipo de Convenio",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SCCOTIPOCONVENIO", "catalogos/get(SCCOTIPOCONVENIO)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export let UsoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.SPVUSO
        });

        static defaultProps: IDropDrownListProps = {
            id: "Uso",
            label: "Uso ",
            helpLabel: "Seleccione el Tipo de Uso ",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SPVUSO", "catalogos/get(SPVUSO)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export let MotivoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.SPVMOTIVO
        });

        static defaultProps: IDropDrownListProps = {
            id: "Motivo",
            label: "Motivo ",
            helpLabel: "Seleccione el Tipo de Motivo ",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SPVMOTIVO", "catalogos/get(SPVMOTIVO)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    interface ISPVMediosComunicacionProps extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class SPVMediosComunicacion$DDL extends React.Component<ISPVMediosComunicacionProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SPVMEDIOSCOMUNICACION
        });
        static defaultProps: ISPVMediosComunicacionProps = {
            id: "MedioComunicacion",
            label: "Medio de Solicitud",
            helpLabel: "Seleccione el medio de solicitud",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
           // global.dispatchAsync("load::SPVMEDIOSCOMUNICACION", "catalogos/get(SPVMEDIOSCOMUNICACION)");
           // Forms.updateFormElement('reporte$informacion', 'MedioSolicitud', []);
            global.asyncGet("catalogos/get(SPVMEDIOSCOMUNICACION)", (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //console.log(data);
                        global.dispatchSuccessful("load::SPVMEDIOSCOMUNICACION", data);
                        let entity = EK.Store.getState().global.currentEntity.data;
                        if (entity.ID !== null && entity.ID !== undefined && entity.ID > 0) {
                            let medioSolicitud = entity.MedioSolicitud;
                            Forms.updateFormElement('ReportesFallas', 'MedioSolicitud', medioSolicitud);
                        } else {
                            Forms.updateFormElement('ReportesFallas', 'MedioSolicitud', []);
                        }
                        //let x = Forms.getValue('MedioSolicitud', 'ReportesFallas')
                        //console.log(x)
                        break;
                    case AsyncActionTypeEnum.loading:
                       
                        break;
                    case AsyncActionTypeEnum.failed:
                       
                        break;
                }
            })
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} />;
        };
    };

    export const SPVMediosComunicacionDDL: any =
        ReactRedux.connect(SPVMediosComunicacion$DDL.props, null)(SPVMediosComunicacion$DDL);

    interface ISPVCatsPlazaProps extends IDropDrownListProps {
        selectAll?: boolean;
        plaza?: any;
    };

    class SPVCatsPlaza$DDL extends React.Component<ISPVCatsPlazaProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.CatsByPlaza,
            plaza: state.global.Plaza_Seleccionada
        });
        static defaultProps: ISPVCatsPlazaProps = {
            id: "CATsPlaza",
            label: "Usuarios de plaza",
            helpLabel: "Seleccione un usuario",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };

        //seleccionarUsuario(item) {
        //    console.log(item.Clave);
        //    if (item.Clave !== null) {
        //        let encodedFilters: string;
        //        encodedFilters = global.encodeObject({ IdUsuario: item.Clave });
        //        global.dispatchAsync("global-page-data", "base/scv/agendaSPV/Get/GetListaFechasUsuario/" + encodedFilters, "AgendaBloqueo$Fechas");

        //    }
        //}

        componentDidMount(): void {
           // let encodedFilters: string;  
           // encodedFilters = global.encodeObject({ IdPlaza: "01010000", Niveles: "134" });
            //global.dispatchAsync("load::SPVMEDIOSCOMUNICACION", "catalogos/get(SPVMEDIOSCOMUNICACION)");
            //global.dispatchAsync("load::CatsByPlaza", "base/scv/agendaSPV/Get/GetCatByPlaza/" + encodedFilters);

            //global.dispatchAsync("load::CatsByPlaza", "base/scv/BitacoraClienteSPV/all/" + encodedFilters);
        };

        componentWillReceiveProps(nextProps: ISPVCatsPlazaProps): void {
            if (!isSuccessful(this.props.plaza) && isSuccessful(nextProps.plaza)) {
                //console.log('buscar cats')
                //console.log(nextProps.plaza)
                let encodedFilters: string;
                encodedFilters = global.encodeObject({ IdPlaza: nextProps.plaza.data.Clave, Niveles: "134" });
                global.dispatchAsync("load::CatsByPlaza", "base/scv/agendaSPV/Get/GetCatByPlaza/" + encodedFilters);
            }
            if (isSuccessful(this.props.plaza) && isSuccessful(nextProps.plaza)) {
                if (global.hasChanged(this.props.plaza.data, nextProps.plaza.data)) {
                   // console.log('bucar nuevos cats', nextProps.plaza.data)
                    global.dispatchSuccessful('load::CatSeleccionado', null);
                    let encodedFilters: string;
                    encodedFilters = global.encodeObject({ IdPlaza: nextProps.plaza.data.Clave, Niveles: "134" });
                    global.dispatchAsync("load::CatsByPlaza", "base/scv/agendaSPV/Get/GetCatByPlaza/" + encodedFilters);
                }
            }
        }

        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form  {...this.props} items={items} />;
        };
    };

    export const SPVCatsPlazaDDL: any =
        ReactRedux.connect(SPVCatsPlaza$DDL.props, null)(SPVCatsPlaza$DDL);


    interface ISPVEstatusTicketsProps extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class EstatusTicketsSPV$DDL extends React.Component<ISPVEstatusTicketsProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SPVESTATUSTICKETS
        });
        static defaultProps: ISPVEstatusTicketsProps = {
            id: "EstatusTickets",
            label: "Estatus Tickets",
            helpLabel: "Seleccione el estatus",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            global.dispatchAsync("load::SPVESTATUSTICKETS", "catalogos/get(SPVESTATUSTICKETS)");
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} />;
        };
    };
    export const EstatusTicketsSPVDDL: any = ReactRedux.connect(EstatusTicketsSPV$DDL.props, null)(EstatusTicketsSPV$DDL);


    class EstatusTicketsSPVFilter$DDL extends React.Component<ISPVEstatusTicketsProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SPVESTATUSTICKETSFILTER
        });
        static defaultProps: ISPVEstatusTicketsProps = {
            id: "EstatusTickets",
            label: "Estatus Tickets",
            helpLabel: "Seleccione el estatus",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            //
            let arreglo: any = [];

            arreglo[0] = { ID: 1, Clave: "A", Nombre: "Activo" }
            arreglo[1] = { ID: 2, Clave: "W", Nombre: "Por Vencer" }
            arreglo[2] = { ID: 3, Clave: "E", Nombre: "Vencido" }
            arreglo[3] = { ID: 4, Clave: "C", Nombre: "Cancelado" }
            arreglo[4] = { ID: 5, Clave: "F", Nombre: "Finalizado" }

            EK.Global.dispatchFullSuccessful("load::SPVESTATUSTICKETSFILTER", arreglo);

        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} />;
        };
    };
    export const EstatusTicketsSPVFilterDDL: any = ReactRedux.connect(EstatusTicketsSPVFilter$DDL.props, null)(EstatusTicketsSPVFilter$DDL);

    class TipoCitas$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOCITAS
        });

        static defaultProps: IDropDrownListProps = {
            id: "TipoCitas",
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "tipoCitas", { activos: 1 });
                dispatchAsync("load::TIPOCITAS", url);
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const TipoCitasDLL: any = ReactRedux.connect(TipoCitas$DDL.props, null)(TipoCitas$DDL);

    export let EKPosicionesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.POSICIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Posicion",
            items: createDefaultStoreObject([]),
            label: "Posición",
            helpLabel: "Seleccione una posición",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            matchers: ["Clave", "Nombre", "Usuario.Nombre", "Usuario.Apellidos"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));
                }
                else {
                    return $([
                        "<span>",
                        item.Nombre,
                        "</span>&nbsp;",
                        "<span class='badge badge-info bold'>",
                        item.IdUsuario ? [item.Usuario.Nombre, item.Usuario.Apellidos].join(" ") : null,
                        "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return item.text;

                return $([
                    "<span>",
                    item.Nombre,
                    "</span>&nbsp;",
                    "<span class='badge badge-info bold'>",
                    item.IdUsuario ? [item.Usuario.Nombre, item.Usuario.Apellidos].join(" ") : null,
                    "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "posiciones", { estatus: "O", kv: 1 });
                global.dispatchAsync("load::POSICIONES", url);
            }
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    export let GruposDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.GRUPOSUSUARIO,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            loadData: (): void => {
                let url: any = global.encodeAllURL("kontrol", "GruposUsuario", { activos: 1 });
                dispatchAsync("load::GRUPOSUSUARIO", url);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "Grupo",
            items: createDefaultStoreObject([]),
            label: "Seleccione el grupo",
            helpLabel: "Seleccione un grupo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.loadData();
            }
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let EstatusActividadPlanSPV: any = global.connect(class extends React.Component<ISPVEstatusTicketsProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSACTIVIDADPLANIFICACIONSPV
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusPlanificacionDet",
            items: createDefaultStoreObject([]),
            label: "Estatus Actividad",
            helpLabel: "Seleccione un Estatus",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSACTIVIDADPLANIFICACIONSPV", "catalogos/get(ESTATUSACTSPVPLAN)");
            };
        };
        render(): any {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "TODOS", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} />;
        };
    });


    export let SizeColumnasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TAMANOCOLUMNAS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Size",
            items: createDefaultStoreObject([]),
            label: "Size",
            helpLabel: "Seleccione un Size",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TAMANOCOLUMNAS", "catalogos/get(TAMANOCOLUMNAS)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let SCVPlazasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCVPlazas
        });
        static defaultProps: IDropDrownListProps = {
            id: "Plaza",
            items: createDefaultStoreObject([]),
            label: "Plaza",
            helpLabel: "Seleccione una Plaza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "Plaza", { activos: 1 });
                dispatchAsync("load::SCVPlazas", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let TipoResidenciaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSRESIDENCIA
        });
        static defaultProps: IDropDrownListProps = {
            id: "ResidenciaActual",
            items: createDefaultStoreObject([]),
            label: "Actualmente Vive en casa",
            helpLabel: "Actualmente Vide en casa",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSRESIDENCIA", "catalogos/get(TIPOSRESIDENCIA)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    interface IAgente extends IDropDrownListProps {
        usuarioJerarquia?: boolean;
    }

    export let AgentesDDL: any = global.connect(class extends React.Component<IAgente, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.AGENTES,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Agente",
            items: createDefaultStoreObject([]),
            label: "Agente",
            helpLabel: "Agente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (item.ID) {
                    let apellidos: string = item.Apellidos ? item.Apellidos : "";
                    return $([
                        "<span>",
                        item.Nombre + " " + apellidos,
                        "</span>;",
                    ].join(""));

                }
                else if (item.text != "") {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (item.ID) {
                    let apellidos: string = item.Apellidos ? item.Apellidos : "";
                    return $([
                        "<span>",
                        item.Nombre + " " + apellidos,
                        "</span>",
                    ].join(""));
                }
                else if (item.text != "")
                    return item.text;

            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let parametros: any;

                if (this.props.usuarioJerarquia != undefined) {
                    let usuarioActual: any = global.getCurrentUser();
                    parametros = global.encodeParameters({ activos: 1, idUsuarioJerarquia: usuarioActual.ID });
                }
                else {
                    parametros = global.encodeParameters({ activos: 1 });
                }
                dispatchAsync("load::AGENTES", "base/kontrol/Agentes/Get/GetAll/" + parametros);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export let EstatusBoletaProspeccion: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSBOLETAPROSPECCION
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject([]),
            label: "Estatus",
            helpLabel: "Estatus",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSBOLETAPROSPECCION", "catalogos/get(ESTATUSBOLETAPROSPECCION)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let EstatusAprobacionComisiones: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSCOMISIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject([]),
            label: "Estatus",
            helpLabel: "Estatus",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSCOMISIONES", "catalogos/get(ESTATUSCOMISIONES)");
                //dispatchAsync("load::COMISIONESESTATUS", "catalogos/get(COMISIONESESTATUS)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    //INICIO ORIGEN 
    export let OrigenProspectoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ORIGENPROSPECTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "ORIGEN",
            items: createDefaultStoreObject([]),
            label: "ORIGEN",
            helpLabel: "ORIGEN",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ORIGENPROSPECTO", "catalogos/get(ORIGENPROSPECTO)");

            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    // FIN ORIGEN

    // INICIO SCCOTIPOSCONCEPTODDL
    export let SCCOTiposConceptoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOTIPOSCONCEPTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoConcepto",
            items: createDefaultStoreObject([]),
            label: "Tipo de Concepto",
            helpLabel: "Tipo de Concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                };
                return $([
                    "<span style='margin-right: 5px; color: ", item.Color, "'class='", item.Icono, "'></span>",
                    "<span class='badge' style='background-color:", item.Color, "'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span style='margin-right: 5px; color: ", item.Color, "'class='", item.Icono, "'></span>",
                    "<span class='badge' style='background-color:", item.Color, "'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCCOTIPOSCONCEPTO", "catalogos/get(ConceptoAnticipo)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    // FIN SCCOTIPOSCONCEPTODDL

    //INICIO TipoTarjeta
    export let TipoTarjetaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOTARJETA
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoTarjeta",
            items: createDefaultStoreObject([]),
            label: "Tipos de Tarjetas",
            helpLabel: "Seleccione la Tarjeta",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='bandera-", item.Clave, "'></span> ",
                        "<span class='badge badge-info'>", item.Clave, "</span> ",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bandera-", item.Clave, "'></span> ",
                    "<span class='badge badge-info'>", item.Clave, "</span> ",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOTARJETA", "catalogos/get(TipoTarjeta)");

            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    // FIN TipoTarjeta

    //INICIO ClasificacionInsumo
    export let ClasificacionInsumoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CLASIFICACIONINSUMO
        });
        static defaultProps: IDropDrownListProps = {
            id: "Clasificacion",
            items: createDefaultStoreObject([]),
            label: "Clasificación Insumo",
            helpLabel: "Seleccione la clasificación del insumo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='" + item.Icono + "' style='color:" + item.Color + ";'></i></span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                };
                return $([
                    "<span style='font-size: 18px; line-height: 18px; vertical-align: middle;'><i class='" + item.Icono + "' style='color:" + item.Color + ";'></i></span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::CLASIFICACIONINSUMO", "catalogos/get(Clasificacion)");
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    });
    // FIN ClasificacionInsumo

    export let MotivosRechazoBoletaProspeccion: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.MOTIVOSRECHAZOBP
        });
        static defaultProps: IDropDrownListProps = {
            id: "Motivo",
            items: createDefaultStoreObject([]),
            label: "Motivo",
            helpLabel: "Motivo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::MOTIVOSRECHAZOBP", "catalogos/get(MOTIVOSRECHAZOBOLETAP)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let EventosBitacora: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.EventosBitacoraGU
        });
        static defaultProps: IDropDrownListProps = {
            id: "Evento",
            items: createDefaultStoreObject([]),
            label: "Evento",
            helpLabel: "Evento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],

            itemFormatter: (item, container): any => {
                if (!item.ID) {
                    return item.text;
                }
                else {
                    return $([
                        "<span style='margin-right: 15px;color: ", item.Color,
                        , "'class='", item.Icono, "'></span>",
                        "<span style='margin-right: 15px'>   ", item.Nombre,
                        "</span>",
                    ].join(""));
                };

            },
            selectionFormatter: (item): any => {

                if (!item.ID) {
                    return item.text;
                };
                return $([
                    "<span style='margin-right: 15px;color: ", item.Color,
                    , "'class='", item.Icono, "'></span>",
                    "<span style='margin-right: 15px'>", item.Nombre,
                    "</span>",
                ].join(""));

            },

        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let parametros: any = global.encodeParameters({ claveOrigen: "GU" });
                global.dispatchAsync("load::EventosBitacoraGU", "base/kontrol/bitacora/Get/ObtenerEventosBitacora/" + parametros);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let EventosBitacoraTodos: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.EventosBitacoraTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "Evento",
            items: createDefaultStoreObject([]),
            label: "Evento",
            helpLabel: "Evento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],

            itemFormatter: (item, container): any => {
                if (!item.ID) {
                    return item.text;
                }
                else {
                    return $([
                        "<span style='margin-right: 15px;color: ", item.Color,
                        , "'class='", item.Icono, "'></span>",
                        "<span style='margin-right: 15px'>   ", item.Nombre,
                        "</span>",
                    ].join(""));
                };

            },
            selectionFormatter: (item): any => {

                if (!item.ID) {
                    return item.text;
                };
                return $([
                    "<span style='margin-right: 15px;color: ", item.Color,
                    , "'class='", item.Icono, "'></span>",
                    "<span style='margin-right: 15px'>", item.Nombre,
                    "</span>",
                ].join(""));

            },

        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::EventosBitacoraTO", "base/kontrol/bitacora/Get/ObtenerEventosBitacora/");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let ConceptosCreditoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CONCEPTOSCREDITO
        });
        static defaultProps: IDropDrownListProps = {
            id: "Concepto",
            items: createDefaultStoreObject([]),
            label: "Concepto de Crédito",
            helpLabel: "Seleccione un Concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {

                let url: string = global.encodeAllURL("scv", "ConceptosCredito", { activos: 1 });
                dispatchAsync("load::CONCEPTOSCREDITO", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let CampaniaPublicidadDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CAMPANIAPUBLICIDAD
        });
        static defaultProps: IDropDrownListProps = {
            id: "CampaniaPublicidad",
            items: createDefaultStoreObject([]),
            label: "Campaña de publicidad",
            helpLabel: "Campaña de publicidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {

                let color: string = item.ID > 0 ? "badge badge-primary" : "";

                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span>",
                        item.Nombre,
                        "</span>",
                        "<span style='margin-left:3px' class='" + color + "'> ",
                        item.ID == -1 ? "" : item.MedioPublicidad.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                let color: string = item.ID > 0 ? "badge badge-primary" : "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span>",
                    item.Nombre,
                    "</span>",
                    "<span  style='margin-left:3px' class='" + color + "' > ",
                    item.ID == -1 ? "" : item.MedioPublicidad.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "CampaniasPublicidad", { activos: 1 });
                dispatchAsync("load::CAMPANIAPUBLICIDAD", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });


    export let DesarrollosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DesarrollosDDL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Desarrollo",
            items: createDefaultStoreObject([]),
            label: "Desarrollo",
            helpLabel: "Seleccione un desarrollo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "desarrollos", { activos: 1 });
                dispatchAsync("load::DesarrollosDDL", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }

    });





    //FIN TipoObraDDL

    //export let PuntosVentaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
    interface IPuntosVentaDDL extends IDropDrownListProps {
        IdDesarrollo?: number;
    }
    class PuntosVenta$DDL extends React.Component<IPuntosVentaDDL, IPuntosVentaDDL> {
        static props: any = (state: any) => ({
            items: state.global.PUNTOSVENTA
        });
        static defaultProps: IDropDrownListProps = {
            id: "Punto de Venta",
            items: createDefaultStoreObject([]),
            label: "Punto de Venta",
            helpLabel: "Punto de Venta",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            // idDesarrollo: null,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        shouldComponentUpdate(nextProps: IPuntosVentaDDL, nextState: any): boolean {
            return hasChanged(this.props.IdDesarrollo, nextProps.IdDesarrollo) || hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IPuntosVentaDDL, { }): void {
            if (nextProps.IdDesarrollo != this.props.IdDesarrollo) {
                let url: string = global.encodeAllURL("scv", "PuntosVenta", { activos: 1, IdDesarrollo: nextProps.IdDesarrollo });
                dispatchAsync("load::PUNTOSVENTA", url);

            };
        };
        componentDidMount(): void {
            let desarrollo: number = this.props.IdDesarrollo;
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "PuntosVenta", { activos: 1, IdDesarrollo: desarrollo });
                dispatchAsync("load::PUNTOSVENTA", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const PuntosVentaDDL: any = ReactRedux.connect(PuntosVenta$DDL.props, null)(PuntosVenta$DDL);

    export let PlazasSCVDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.plazas
        });
        static defaultProps: IDropDrownListProps = {
            id: "Plaza",
            items: createDefaultStoreObject([]),
            label: "Plazas",
            helpLabel: "Plazas",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "Plaza", { activos: 1 });
                dispatchAsync("load::plazas", url);
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });
    export class PlazasFixed$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.PLAZASPOSTVENTA
        });
        static defaultProps: IDropDrownListProps = {
            id: "Plazas",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una Plaza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            //if (!isLoadingOrSuccessful(this.props.items)) {
            //    dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            //};
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::Plaza_Seleccionada", null);
            //dispatchDefault("load::PLAZASPOSTVENTA", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Plaza_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idPlaza: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idPlaza === undefined || idPlaza === null || idPlaza.ID === null || idPlaza.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::Plaza_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let usuario: any = getData(EK.Store.getState().global.app).Me;
                    if (ValidarUsuario(usuario.ID)) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const PlazasFixedDDL: any = ReactRedux.connect(PlazasFixed$DDL.props, null)(PlazasFixed$DDL);

    export class Plazas$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.PLAZASPOSTVENTA,
            seleccioado: state.global.Plaza_Seleccionada
        });
        static defaultProps: IDropDrownListProps = {
            id: "Plazas",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una Plaza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, {})
            dispatchDefault("load::Plaza_Seleccionada", null);
            //dispatchDefault("load::PLAZASPOSTVENTA", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Plaza_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idPlaza: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idPlaza === undefined || idPlaza === null || idPlaza.ID === null || idPlaza.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::Plaza_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
            
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    //VERIFICAR USUARIO LOGUEADO
                    let usuario: any = getData(EK.Store.getState().global.app).Me;
                    if (ValidarUsuario(usuario.ID)) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }

                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const PlazasDDL: any = ReactRedux.connect(Plazas$DDL.props, null)(Plazas$DDL);

    export class EstatusRadar$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.getListaEstatus = this.getListaEstatus.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaEstatusRadarFixed
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Clave === '-2'? "":
                    item.Clave === 'T'?
                        "<span class='badge badge-terminado '>" + item.Nombre + "</span>" :
                        item.Clave === 'P' ?
                            "<span class='badge badge-pausado '>" + item.Nombre + "</span>" :
                            item.Clave === 'E' ?
                                "<span class='badge badge-proceso '>" + item.Nombre + "</span>" :
                                null

                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getListaEstatus();
        };

        getListaEstatus() {
            let estatus = [];
            estatus.push({ ID: -4, Clave: 'P', Nombre: 'Pausado' });
            estatus.push({ ID: -5, Clave: 'T', Nombre: 'Terminado' });
            estatus.push({ ID: -6, Clave: 'E', Nombre: 'En Proceso' });
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchSuccessful('load::ListaEstatusRadarFixed', estatus);
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const EstatusRadarDDL: any = ReactRedux.connect(EstatusRadar$DDL.props, null)(EstatusRadar$DDL);

    export class PreguntaRespuesta$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.getLista = this.getLista.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaTiposRespuestas
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='' style='font-size: 12px'> ",
                    item.text,
                    "</span> "
                ].join(""));
                //return $([
                //    item.Clave === '-2' ? "" :
                //        item.Clave === 'T' ?
                //            "<span class='badge badge-terminado '>" + item.Nombre + "</span>" :
                //            item.Clave === 'P' ?
                //                "<span class='badge badge-pausado '>" + item.Nombre + "</span>" :
                //                item.Clave === 'E' ?
                //                    "<span class='badge badge-proceso '>" + item.Nombre + "</span>" :
                //                    null

                //].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getLista();
        };

        getLista() {
            let estatus = [];
            estatus.push({ ID: -4, Clave: '1', Nombre: 'Opcion unica' });
            estatus.push({ ID: -5, Clave: '2', Nombre: 'Opcion multiple' });
            estatus.push({ ID: -6, Clave: '3', Nombre: 'Lista desplegable' });
            estatus.push({ ID: -7, Clave: '4', Nombre: 'Texto' });
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchSuccessful('load::ListaTiposRespuestas', estatus);
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };
        onchangeElementoPlaza(): any {
            //let itemFinal: Element;
            //itemFinal = item;
            console.log(this.props)
            this.props.change;
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const PreguntaRespuestaDDL: any = ReactRedux.connect(PreguntaRespuesta$DDL.props, null)(PreguntaRespuesta$DDL);

    export class TipoAgendaModificar$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.getListaEstatus = this.getListaEstatus.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaTipoAgendaModificar
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Clave === '-2' ? "": "<span class='badge badge-terminado '>" + item.Nombre + "</span>"
                        //item.Clave === 'C' ?
                        //    "<span class='badge badge-terminado '>" + item.Nombre + "</span>" :
                        //    item.Clave === 'V' ?
                        //        "<span class='badge badge-pausado '>" + item.Nombre + "</span>" :
                        //        item.Clave === 'E' ?
                        //            "<span class='badge badge-proceso '>" + item.Nombre + "</span>" :
                        //            null

                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getListaEstatus();
        };

        getListaEstatus() {
            let estatus = [];
            estatus.push({ ID: 1, Clave: 'C', Nombre: 'Construccion' });
            estatus.push({ ID: 2, Clave: 'V', Nombre: 'Vivienda' });
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchSuccessful('load::ListaTipoAgendaModificar', estatus);
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const TipoAgendaModificar: any = ReactRedux.connect(TipoAgendaModificar$DDL.props, null)(TipoAgendaModificar$DDL);


    interface IGenericDLLProps extends EK.UX.DropDownLists.IDropDrownListProps {
       staticItems?: any
    };

    export class ComiteVecinal$DDL extends React.Component<IGenericDLLProps, IDropDrownListState> {

        constructor(props: IGenericDLLProps) {
            super(props);
            // this.setIdProps = this.setIdProps.bind(this);
        };

        static props: any = (state: any, id: string) => ({
           
            items: state.global[`listItemscomiteVecinal`]
        });

        static defaultProps: IGenericDLLProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='' style='font-size: 12px'> ",
                   item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            this.GetListaItemStatic();
        };

        GetListaItemStatic() {
            let items = [
                { ID: -4, Clave: 'S', Nombre: 'SI' },
                { ID: -5, Clave: 'N', Nombre: 'NO' },
                { ID: -6, Clave: 'P', Nombre: 'PROVISIONAL' }
            ];
            dispatchSuccessful(`load::listItemscomiteVecinal`, items);
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados}  />;
        };
    };
    export const ComiteVecinalDDL: any = ReactRedux.connect(ComiteVecinal$DDL.props, null)(ComiteVecinal$DDL);


    export class TieneAC$DDL extends React.Component<IGenericDLLProps, IDropDrownListState> {

        constructor(props: IGenericDLLProps) {
            super(props);
            // this.setIdProps = this.setIdProps.bind(this);
        };

        static props: any = (state: any, id: string) => ({

            items: state.global[`listItemsTieneAC`]
        });

        static defaultProps: IGenericDLLProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='' style='font-size: 12px'> ",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            this.GetListaItemStatic();
        };

        GetListaItemStatic() {
            let items = [
                { ID: -4, Clave: 'S', Nombre: 'SI' },
                { ID: -5, Clave: 'N', Nombre: 'NO' }
            ];
            dispatchSuccessful(`load::listItemsTieneAC`, items);
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };
    export const TieneACDDL: any = ReactRedux.connect(TieneAC$DDL.props, null)(TieneAC$DDL);


    export class FondoConvive$DDL extends React.Component<IGenericDLLProps, IDropDrownListState> {

        constructor(props: IGenericDLLProps) {
            super(props);
            // this.setIdProps = this.setIdProps.bind(this);
        };

        static props: any = (state: any, id: string) => ({

            items: state.global[`listItemsFondoConvive`]
        });

        static defaultProps: IGenericDLLProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='' style='font-size: 12px'> ",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            this.GetListaItemStatic();
        };

        GetListaItemStatic() {
            let items = [
                { ID: -4, Clave: 'S', Nombre: 'SI' },
                { ID: -5, Clave: 'N', Nombre: 'NO' },
                { ID: -6, Clave: 'P', Nombre: 'PARCIAL' },
                { ID: -7, Clave: 'N/A', Nombre: 'N/A' }
            ];
            dispatchSuccessful(`load::listItemsFondoConvive`, items);
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };
    export const FondoConviveDDL: any = ReactRedux.connect(FondoConvive$DDL.props, null)(FondoConvive$DDL);


    export class EstatusCom$DDL extends React.Component<IGenericDLLProps, IDropDrownListState> {

        constructor(props: IGenericDLLProps) {
            super(props);
            // this.setIdProps = this.setIdProps.bind(this);
        };

        static props: any = (state: any, id: string) => ({

            items: state.global[`listItemsEstatusCom`]
        });

        static defaultProps: IGenericDLLProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }

                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Clave === 'TD' ? "<span class='badge badge-success '>" + item.Nombre + "</span>" :
                      item.Clave === 'T' ? "<span class='badge badge-terminado '>" + item.Nombre + "</span>" :
                      item.Clave === 'E' ? "<span class='badge badge-proceso2 '>" + item.Nombre + "</span>" :
                      item.Clave === 'SA' ? "<span class='badge badge-sinatraso '>" + item.Nombre + "</span>" :
                      item.Clave === 'CA' ? "<span class='badge badge-conatraso '>" + item.Nombre + "</span>" :
                      null
                ].join(""));
            }
        };

        componentDidMount(): void {
            this.GetListaItemStatic();
        };

        GetListaItemStatic() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

            let items = [
                { ID: -4, Clave: 'T', Nombre: 'TERMINADO', bg: '#2ecc71', label: true },
                { ID: -5, Clave: 'E', Nombre: 'EN PROCESO', bg: '#f1c40f', label: true },
                { ID: -6, Clave: 'SA', Nombre: 'SIN ATRASO', bg: '#e67e22', label: true },
                { ID: -7, Clave: 'CA', Nombre: 'CON ATRASO', bg: '#e74c3c', label: true }
            ];
            if (this.props.addAll) {
                items.unshift({ ID: 5, Clave: 'TD', Nombre: 'TODOS', bg: '#2ecc71', label: true })
            }
           dispatchSuccessful(`load::listItemsEstatusCom`, items);
            Forms.updateFormElement(idForm, this.props.id, { ID: 5, Clave: 'TD', Nombre: 'TODOS', bg: '#2ecc71', label: true });
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };
    export const EstatusComDDL: any = ReactRedux.connect(EstatusCom$DDL.props, null)(EstatusCom$DDL);


    export class EstatusSega$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            //this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
            this.getListaEstatus = this.getListaEstatus.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaEstatusFixed
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 12px'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getListaEstatus();
        };

        getListaEstatus() {
            let estatus = [];
            estatus.push({ ID: 1, Clave: 'T', Nombre: 'Cerrado/Terminado' });
            estatus.push({ ID: 2, Clave: 'X', Nombre: 'Cancelado' });
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            let nuevoItem: any = {};
            nuevoItem['ID'] = -2;
            nuevoItem['Clave'] = '-2';
            nuevoItem['Nombre'] = 'TODOS';
            if (estatus.length > 0) {
                estatus.unshift(nuevoItem);
            }
            dispatchSuccessful('load::ListaEstatusFixed', estatus);
            //item = items.data[i];
            Forms.updateFormElement(idForm, this.props.id, nuevoItem)
            //let currentYear = new Date().getFullYear();
            //Forms.updateFormElement(idForm, this.props.id, { ID: currentYear, Clave: currentYear, Nombre: currentYear })
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            //dispatchDefault("load::Plaza_Seleccionada", null);
            //dispatchDefault("load::PLAZASPOSTVENTA", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            //dispatchSuccessful("load::Plaza_Seleccionada", itemFinal);
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const EstatusSegaDDL: any = ReactRedux.connect(EstatusSega$DDL.props, null)(EstatusSega$DDL);

    export class OpcionesOT$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            //this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
            this.getListaEstatus = this.getListaEstatus.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaOpcionesOTFixed
        });
        static defaultProps: IDropDrownListProps = {
            id: "OpcionesOT",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 12px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 12px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 12px'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getListaEstatus();
        };

        getListaEstatus() {
            let estatus = [];
            estatus.push({ ID: 1, Clave: 'EP', Nombre: 'En Proceso' });
            estatus.push({ ID: 2, Clave: 'NCA', Nombre: 'Nuevo con agenda' });
            estatus.push({ ID: 3, Clave: 'NSA', Nombre: 'Nuevo sin agenda' });
            estatus.push({ ID: 4, Clave: 'DEL', Nombre: 'ELIMINAR' });
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            let nuevoItem: any = {};
            nuevoItem['ID'] = -2;
            nuevoItem['Clave'] = '-2';
            nuevoItem['Nombre'] = 'Seleccionar opcion';
            if (estatus.length > 0) {
                estatus.unshift(nuevoItem);
            }
            dispatchSuccessful('load::ListaOpcionesOTFixed', estatus);
            //item = items.data[i];
            Forms.updateFormElement(idForm, this.props.id, nuevoItem)
            //let currentYear = new Date().getFullYear();
            //Forms.updateFormElement(idForm, this.props.id, { ID: currentYear, Clave: currentYear, Nombre: currentYear })
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            //dispatchDefault("load::Plaza_Seleccionada", null);
            //dispatchDefault("load::PLAZASPOSTVENTA", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            //dispatchSuccessful("load::Plaza_Seleccionada", itemFinal);
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const OpcionesOTDDL: any = ReactRedux.connect(OpcionesOT$DDL.props, null)(OpcionesOT$DDL);

    export class Years$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            //this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
            this.getListaAnios = this.getListaAnios.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaAniosFixed
        });
        static defaultProps: IDropDrownListProps = {
            id: "Years",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un año",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 13px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 13px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 13px'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getListaAnios();
        };

        getListaAnios() {
            let anios = [];
            for (let i = 1900; i <= 3022; i++) {
                anios.push({ ID: i, Clave: i, Nombre: i })
            }
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchSuccessful('load::ListaAniosFixed', anios);
            let currentYear = new Date().getFullYear();
            Forms.updateFormElement(idForm, this.props.id, { ID: currentYear, Clave: currentYear, Nombre: currentYear })
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            //dispatchDefault("load::Plaza_Seleccionada", null);
            //dispatchDefault("load::PLAZASPOSTVENTA", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            //dispatchSuccessful("load::Plaza_Seleccionada", itemFinal);
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const YearsDDL: any = ReactRedux.connect(Years$DDL.props, null)(Years$DDL);

    export class Months$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            //this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
            this.getListaMeses = this.getListaMeses.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ListaMesesFixed
        });
        static defaultProps: IDropDrownListProps = {
            id: "Months",
            items: createDefaultStoreObject({}),
            helpLabel: "Seleccione un mes",
            value: createDefaultStoreObject({}),
            initialValue: 2022,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 13px'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 13px'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 13px'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
            this.getListaMeses();
        };

        getListaMeses() {
            let meses = [
                { ID: 1, Clave: 1, Nombre: 'Enero' },
                { ID: 2, Clave: 2, Nombre: 'Febrero' },
                { ID: 3, Clave: 3, Nombre: 'Marzo' },
                { ID: 4, Clave: 4, Nombre: 'Abril' },
                { ID: 5, Clave: 5, Nombre: 'Mayo' },
                { ID: 6, Clave: 6, Nombre: 'Junio' },
                { ID: 7, Clave: 7, Nombre: 'Julio' },
                { ID: 8, Clave: 8, Nombre: 'Agosto' },
                { ID: 9, Clave: 9, Nombre: 'Septiembre' },
                { ID: 10, Clave: 10, Nombre: 'Octubre' },
                { ID: 11, Clave: 11, Nombre: 'Noviembre' },
                { ID: 12, Clave: 12, Nombre: 'Diciembre' }
            ];

            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchSuccessful('load::ListaMesesFixed', meses);
            let currentMonth = new Date().getMonth();
            let itemMont = meses[currentMonth]
            Forms.updateFormElement(idForm, this.props.id, itemMont)
        }

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };
    export const MonthsDDL: any = ReactRedux.connect(Months$DDL.props, null)(Months$DDL);


    let ValidarUsuario: (IdUsuario: number) => boolean = (IdUsuario: number): boolean => {
        let valido = false;
        switch (IdUsuario) {
            case 1:     // Admin
            case 375:   // Rafa
            case 3698:  // Lili
            case 3098:  // Abdi
            case 411:   // Hugo
            case 3469:  // Fernado
            case 3941:  // Daniel
            case 6360:  // Ana
            case 7691:  // Miguel intraurbana
            case 8219: //Lesly corpo
            case 9668: //corpo
                valido = true;
                break;
        }
        return valido;
    };

    export class Plazas$DDL2 extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.PLAZASPOSTVENTA2
        });
        static defaultProps: IDropDrownListProps = {
            id: "Plazas2",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una Plaza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PLAZASPOSTVENTA2", "ConsultaViviendaEntregable/GetPlazas/");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::Plaza_Seleccionada2", null);
            dispatchDefault("load::PLAZASPOSTVENTA2", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Plaza_Seleccionada2", itemFinal);
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idPlaza: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idPlaza === undefined || idPlaza === null || idPlaza.ID === null || idPlaza.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::Plaza_Seleccionada2", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    //VERIFICAR USUARIO LOGUEADO
                    let usuario: any = getData(EK.Store.getState().global.app).Me;
                    if (ValidarUsuario(usuario.ID)) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            let test: any = EK.Store.getState().global.page.data.id;
                            if (test != "ReporteFallasAreasComunes" && test !== 'catCoordinadores' && test !== 'CatConfiguracionDocumentos')
                                itemsModificados.data.unshift(nuevoItem);

                        }
                    }

                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const PlazasDDL2: any = ReactRedux.connect(Plazas$DDL2.props, null)(Plazas$DDL2);

    export class Plazas$DDL3 extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
            this.onchangeElementoPlaza = this.onchangeElementoPlaza.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.PLAZASPOSTVENTA
        });
        static defaultProps: IDropDrownListProps = {
            id: "Plazas",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una Plaza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::Plaza_Seleccionada", null);
            //dispatchDefault("load::PLAZASPOSTVENTA", null);
        };
        onchangeElementoPlaza(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Plaza_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idPlaza: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idPlaza === undefined || idPlaza === null || idPlaza.ID === null || idPlaza.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::Plaza_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };
                if (existeItemTodos === false) {
                    let usuario: any = getData(EK.Store.getState().global.app).Me;
                    if (ValidarUsuario(usuario.ID)) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            let test: any = EK.Store.getState().global.page.data.id;
                            if (test != "ReporteFallasAreasComunes")
                                itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                }
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoPlaza} />;
        };
    };
    export const PlazasDDL3: any = ReactRedux.connect(Plazas$DDL3.props, null)(Plazas$DDL3);

    interface IVocacionesFilterDDLProps extends EK.UX.DropDownLists.IDropDrownListProps {
        plaza?: global.DataElement;
    };

    export const VocacionesFilterDDL: any = global.connect(class extends React.Component<IVocacionesFilterDDLProps, IVocacionesFilterDDLProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.VOCACIONESSPV;
            //console.log(retValue.config.id);
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            return retValue;
        };
        static defaultProps: IVocacionesFilterDDLProps = {
            id: "Vocaciones",
            items: createDefaultStoreObject([]),
            label: "Vocaciones",
            helpLabel: "Seleccione un Tipo de Vocación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                global.dispatchAsync("load::VOCACIONESSPV", "base/scv/vocacionesSPV/Get/GetAll/" + encodedFilters);
            };
        };
        componentWillReceiveProps(nextProps: IVocacionesFilterDDLProps, { }): void {
            if (global.isSuccessful(nextProps.items)) {
                let existeItemTodos: boolean = false;
                //console.log('asdas')
                for (var i = 0; i < nextProps.items.data.length; i++) {
                    if (String(nextProps.items.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };

                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem["ID"] = -2;
                    nuevoItem["Clave"] = "-2";
                    nuevoItem["Nombre"] = "TODOS";

                    if (nextProps.items.data.length > 0) {

                        nextProps.items.data.unshift(nuevoItem);
                    };
                };

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    //console.log('sdd')
                    let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        //console.log(items);
                        if (items.data.length > 0) {
                            item = items.data[0];
                            //console.log(item);
                            Forms.updateFormElement(idForm, this.props.id, item);
                        }
                    }
                };

                if (global.getData(nextProps.plaza).ID !== global.getData(this.props.plaza).ID) {
                    Forms.updateFormElement(idForm, this.props.id, null);
                    //console.log()
                };


                //console.log(val);
            };
        };
        shouldComponentUpdate(nextProps: IVocacionesFilterDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza);
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        };
    });

    export const VocacionesFilterDDL2: any = global.connect(class extends React.Component<IVocacionesFilterDDLProps, IVocacionesFilterDDLProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.VOCACIONESSPV2;
            //console.log(retValue.config.id);
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            return retValue;
        };
        static defaultProps: IVocacionesFilterDDLProps = {
            id: "Vocaciones",
            items: createDefaultStoreObject([]),
            label: "Vocaciones",
            helpLabel: "Seleccione un Tipo de Vocación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                global.dispatchAsync("load::VOCACIONESSPV2", "base/scv/vocacionesSPV/Get/GetAll/" + encodedFilters);
            };
        };
        componentWillReceiveProps(nextProps: IVocacionesFilterDDLProps, { }): void {
            if (global.isSuccessful(nextProps.items)) {
                let existeItemTodos: boolean = false;
                //console.log('asdas')
                for (var i = 0; i < nextProps.items.data.length; i++) {
                    if (String(nextProps.items.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };

                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem["ID"] = -2;
                    nuevoItem["Clave"] = "-2";
                    nuevoItem["Nombre"] = "TODOS";

                    if (nextProps.items.data.length > 0) {

                        nextProps.items.data.unshift(nuevoItem);
                    };
                };

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    //console.log('sdd')
                    let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        //console.log(items);
                        if (items.data.length > 0) {
                            item = items.data[0];
                            //console.log(item);
                            Forms.updateFormElement(idForm, this.props.id, item);
                        }
                    }
                };

                if (global.getData(nextProps.plaza).ID !== global.getData(this.props.plaza).ID) {
                    Forms.updateFormElement(idForm, this.props.id, null);
                    //console.log()
                };


                //console.log(val);
            };
        };
        shouldComponentUpdate(nextProps: IVocacionesFilterDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza);
        };
        render(): JSX.Element {
            let page: any = EK.Store.getState().global.page.data.id;
            let data = this.props.items.data.filter(x => x.ID === 99999);
            if (data.length === 0) {
                this.props.items.data.push({ ID: 99999, Clave: 'NI', Nombre: "Ninguno" });
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        };
    });
    export class PlazasClasificadorFilter$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.PLAZASPOSTVENTACLASIFICADORFILTER
        });

        static defaultProps: IDropDrownListProps = {
            id: "Plazas",
            items: createDefaultStoreObject([]),
            //label: "Plazas",
            helpLabel: "Seleccione una Plaza",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PLAZASPOSTVENTACLASIFICADORFILTER", "base/scv/Plaza/Get/GetSPVPlazasClasificadores/" + global.encodeParameters({ activos: 1 }));
            };
        };

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::PLAZASPOSTVENTACLASIFICADORFILTER", null);
        }


        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            if (global.isSuccessful(nextProps.items)) {
                let itemsModificados: DataElement = nextProps.items;
                let existeItemTodos: boolean = false;
                let nuevoItem: any = {};
                if (itemsModificados.data.length > 0) {
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    }
                    if (existeItemTodos === false) {
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                } else {
                    nuevoItem['ID'] = -3;
                    nuevoItem['Clave'] = 'Sin Clasificador';
                    nuevoItem['Nombre'] = 'Configurar';
                    itemsModificados.data.unshift(nuevoItem);
                }


                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idValueObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idValueObject === undefined || idValueObject === null || idValueObject.ID === null || idValueObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        item = items.data[0];
                        Forms.updateFormElement(idForm, this.props.id, item)
                    }
                }
            }
        }

        render(): any {

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const PlazasClasificadorFilterDDL: any = ReactRedux.connect(PlazasClasificadorFilter$DDL.props, null)(PlazasClasificadorFilter$DDL);


    interface IDesarrollosClasificadorFilterDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }

    export class DesarrollosClasificadorFilter$DDL extends React.Component<IDesarrollosClasificadorFilterDDLProps, IDropDrownListProps> {
        constructor(props: IDesarrollosClasificadorFilterDDLProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.DESARROLLOSCLASIFICADORFILTER,
            plazaSeleccionada: Forms.getDataValue("Plazas", getData(state.global.pageConfig).id + "$filters", state)
        });

        static defaultProps: IDesarrollosClasificadorFilterDDLProps = {
            id: "Desarrollos",
            items: createDefaultStoreObject([]),
            //label: "Plazas",
            helpLabel: "Seleccione un Desarrollo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentWillReceiveProps(nextProps: IDesarrollosClasificadorFilterDDLProps, nextState: IDesarrollosClasificadorFilterDDLProps): void {
            if (hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada) && (getData(this.props.plazaSeleccionada).ID != getData(nextProps.plazaSeleccionada).ID)) {
                if (getData(nextProps.plazaSeleccionada).ID != null && getData(nextProps.plazaSeleccionada).ID != undefined) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (getData(nextProps.plazaSeleccionada).ID === -3) {
                        let datos = [];
                        datos[0] = getData(nextProps.plazaSeleccionada);
                        dispatchSuccessful("load::DESARROLLOSCLASIFICADORFILTER", datos);
                        Forms.updateFormElement(idForm, this.props.id, getData(nextProps.plazaSeleccionada));
                    } else {
                        if (getData(nextProps.plazaSeleccionada).ID > 0 || getData(nextProps.plazaSeleccionada).ID === -2) {
                            let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                            let item: any;
                            let items: any = nextProps.items;
                            item = { ID: -2, Clave: "-2", Nombre: "TODOS" };
                            Forms.updateFormElement(idForm, this.props.id, item)

                            dispatchAsync("load::DESARROLLOSCLASIFICADORFILTER", "base/scv/Desarrollos/Get/GetSPVDesarrollosClasificadores/" + global.encodeParameters({ activos: 1, IdPlaza: idPlaza }));
                        }
                    }
                }
            }
            if (hasChanged(this.props.items, nextProps.items)) {
                if (global.isSuccessful(nextProps.items)) {
                    let itemsModificados: DataElement = nextProps.items;
                    let existeItemTodos: boolean = false;
                    let nuevoItem: any = {};
                    if (itemsModificados.data.length > 0) {
                        if (itemsModificados.data[0].ID != -3) {
                            for (var i = 0; i < itemsModificados.data.length; i++) {
                                if (String(itemsModificados.data[i].ID) === "-2") {
                                    existeItemTodos = true;
                                    break;
                                }
                            }
                            if (existeItemTodos === false) {
                                nuevoItem['ID'] = -2;
                                nuevoItem['Clave'] = '-2';
                                nuevoItem['Nombre'] = 'TODOS';
                                if (itemsModificados.data.length > 0) {
                                    itemsModificados.data.unshift(nuevoItem);
                                }
                            }
                        }
                    } else {
                        let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                        if (idPlaza > 0 || idPlaza === -2) {
                            let idForm2: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null
                            Forms.updateFormElement(idForm2, this.props.id, {});
                        } else {
                            nuevoItem['ID'] = -3;
                            nuevoItem['Clave'] = 'Sin Clasificador';
                            nuevoItem['Nombre'] = 'Configurar';
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }


                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (idForm != null && idForm != undefined) {
                        let idValueObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                        if (idValueObject === undefined || idValueObject === null || idValueObject.ID === null || idValueObject.ID === undefined) {
                            let item: any;
                            let items: any = nextProps.items;
                            item = items.data[0];
                            Forms.updateFormElement(idForm, this.props.id, item)
                        }
                    }
                }
            }
        }

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const DesarrollosClasificadorFilterDDL: any = ReactRedux.connect(DesarrollosClasificadorFilter$DDL.props, null)(DesarrollosClasificadorFilter$DDL);


    interface IPrototiposClasificadorFilterDDLProps extends IDropDrownListProps {
        desarrolloSeleccionado?: global.DataElement;
        plazaSeleccionada?: global.DataElement;
    }

    export class PrototiposClasificadorFilter$DDL extends React.Component<IPrototiposClasificadorFilterDDLProps, IPrototiposClasificadorFilterDDLProps> {
        constructor(props: IPrototiposClasificadorFilterDDLProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.PROTOTIPOSCLASIFICADORFILTER,
            desarrolloSeleccionado: Forms.getDataValue("Desarrollos", getData(state.global.pageConfig).id + "$filters", state),
            plazaSeleccionada: Forms.getDataValue("Plazas", getData(state.global.pageConfig).id + "$filters", state)
        });

        static defaultProps: IPrototiposClasificadorFilterDDLProps = {
            id: "Prototipos",
            items: createDefaultStoreObject([]),
            //label: "Plazas",
            helpLabel: "Seleccione un Prototipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentWillReceiveProps(nextProps: IPrototiposClasificadorFilterDDLProps, nextState: IPrototiposClasificadorFilterDDLProps): void {
            if (hasChanged(this.props.desarrolloSeleccionado, nextProps.desarrolloSeleccionado) && (getData(this.props.desarrolloSeleccionado).ID != getData(nextProps.desarrolloSeleccionado).ID)) {
                if (getData(nextProps.desarrolloSeleccionado).ID != null && getData(nextProps.desarrolloSeleccionado).ID != undefined) {
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (getData(nextProps.desarrolloSeleccionado).ID === -3) {
                        Forms.updateFormElement(idForm, this.props.id, {});
                        dispatchSuccessful("load::PROTOTIPOSCLASIFICADORFILTER", {});
                    } else {
                        if (getData(nextProps.desarrolloSeleccionado).ID > 0 || getData(nextProps.desarrolloSeleccionado).ID === -2) {
                            let idDesarrollo: any = getData(nextProps.desarrolloSeleccionado).ID;
                            let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                            let item: any;
                            let items: any = nextProps.items;
                            item = { ID: -2, Clave: "-2", Nombre: "TODOS" };
                            Forms.updateFormElement(idForm, this.props.id, item)
                            dispatchAsync("load::PROTOTIPOSCLASIFICADORFILTER", "base/scv/Prototipos/Get/GetSPVPrototiposClasificadores/" + global.encodeParameters({ activos: 1, IdPlaza: idPlaza, IdDesarrollo: idDesarrollo }));
                        }
                    }
                } else {
                    let idForm2: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    Forms.updateFormElement(idForm2, this.props.id, {});
                    dispatchSuccessful("load::PROTOTIPOSCLASIFICADORFILTER", {});

                }
            }
            if (hasChanged(this.props.items, nextProps.items)) {
                if (global.isSuccessful(nextProps.items)) {
                    let itemsModificados: DataElement = nextProps.items;
                    let existeItemTodos: boolean = false;
                    let nuevoItem: any = {};
                    if (itemsModificados.data.length > 0) {
                        if (itemsModificados.data[0].ID != -3) {
                            for (var i = 0; i < itemsModificados.data.length; i++) {
                                if (String(itemsModificados.data[i].ID) === "-2") {
                                    existeItemTodos = true;
                                    break;
                                }
                            }
                            if (existeItemTodos === false) {
                                nuevoItem['ID'] = -2;
                                nuevoItem['Clave'] = '-2';
                                nuevoItem['Nombre'] = 'TODOS';
                                if (itemsModificados.data.length > 0) {
                                    itemsModificados.data.unshift(nuevoItem);
                                }
                            }
                        }
                    } else {
                        let idForm2: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null
                        Forms.updateFormElement(idForm2, this.props.id, {});
                    }

                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (idForm != null && idForm != undefined) {
                        let idValueObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                        if (idValueObject === undefined || idValueObject === null || idValueObject.ID === null || idValueObject.ID === undefined) {
                            let item: any;
                            let items: any = nextProps.items;
                            item = items.data[0];
                            Forms.updateFormElement(idForm, this.props.id, item)
                        }
                    }
                }
            }
        }

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const PrototiposClasificadorFilterDDL: any = ReactRedux.connect(PrototiposClasificadorFilter$DDL.props, null)(PrototiposClasificadorFilter$DDL);




    export class HipotecaVerde$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.HIPOTECAVERDE
        });

        static defaultProps: IDropDrownListProps = {
            id: "HipotecaVerde",
            items: createDefaultStoreObject([]),
            label: "Hipoteca Verde",
            helpLabel: "Seleccione una Hipoteca Verde",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::HIPOTECAVERDE", "ConsultaViviendaEntregable/GetHipotecaVerde/");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const HipotecaVerdeDDL: any =
        ReactRedux.connect(HipotecaVerde$DDL.props, null)(HipotecaVerde$DDL);

    export class Equipamiento$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.EQUIPAMIENTO
        });

        static defaultProps: IDropDrownListProps = {
            id: "Equipamiento",
            items: createDefaultStoreObject([]),
            label: "Equipamiento",
            helpLabel: "Seleccione un Equipamiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EQUIPAMIENTO", "ConsultaViviendaEntregable/GetEquipamiento/");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const EquipamientoDDL: any =
        ReactRedux.connect(Equipamiento$DDL.props, null)(Equipamiento$DDL);

    export class ViviendaEntregable$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.GRADOSINTERES
        });

        static defaultProps: IDropDrownListProps = {
            id: "ViviendaEntregable",
            items: createDefaultStoreObject([]),
            label: "Vivienda Entregable",
            helpLabel: "Seleccione una ViviendaEntregable",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::VIVIENAENTREGABLE", "catalogos/get(VIVIENAENTREGABLE)");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const ViviendaEntregableDDL: any =
        ReactRedux.connect(ViviendaEntregable$DDL.props, null)(ViviendaEntregable$DDL);

    export class Financiamiento$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.FINANCIAMIENTO
        });

        static defaultProps: IDropDrownListProps = {
            id: "Financiamiento",
            items: createDefaultStoreObject([]),
            label: "Financiamiento",
            helpLabel: "Seleccione un Financiamiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::FINANCIAMIENTO", "ConsultaViviendaEntregable/GetFinanciamiento/");
            };
        };

        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListState): void {
            if (global.isSuccessful(nextProps.items)) {

                let itemsModificados: DataElement = nextProps.items;
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                }

                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        if (items.data.length > 0) {
                            item = items.data[0];
                            Forms.updateFormElement(idForm, this.props.id, item)
                        }
                    }
                }
            }
        }

        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            return <DropdownList$Form {...this.props} items={itemsModificados} />;
        };
    };
    export const FinanciamientoDDL: any =
        ReactRedux.connect(Financiamiento$DDL.props, null)(Financiamiento$DDL);

    export class ViviendasEntregables$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.VIVIENDASENTREGABLES
        });

        static defaultProps: IDropDrownListProps = {
            id: "ViviendasEntregables",
            items: createDefaultStoreObject([]),
            label: "Viviendas Entregables",
            helpLabel: "Seleccione una Vivienda Entregable",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::VIVIENDASENTREGABLES", "ConsultaViviendaEntregable/GetViviendasEntregadas/");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const ViviendasEntregadasDDL: any =
        ReactRedux.connect(ViviendasEntregables$DDL.props, null)(ViviendasEntregables$DDL);


    interface ITipoViviendaVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }


    export class TipoVivienda$DDL extends React.Component<ITipoViviendaVDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.TIPOVIVIENDA,
            plazaSeleccionada: Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });

        static defaultProps: IDropDrownListProps = {
            id: "TiposVivienda",
            items: createDefaultStoreObject([]),
            label: "Vocaciones",
            helpLabel: "Seleccione un Tipo de Vocacion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOVIVIENDA", "ConsultaViviendaEntregable/GetTipoVivienda/");
            };
        };


        componentWillReceiveProps(nextProps: ITipoViviendaVDDLProps, nextState: IDropDrownListState): void {

            if (global.isSuccessful(nextProps.items)) {
                let itemsModificados: DataElement = nextProps.items;
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                }
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }




                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        if (items.data.length > 0) {
                            item = items.data[0];
                            Forms.updateFormElement(idForm, this.props.id, item)
                        }
                    }
                }

                if (getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID) {
                    Forms.updateFormElement(idForm, "Segmentos", null)
                }
            }
        }

        shouldComponentUpdate(nextProps: ITipoViviendaVDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        render(): any {
            let itemsModificados: DataElement = this.props.items;

            return <DropdownList$Form {...this.props} items={itemsModificados} />;
        };

    };
    export const TipoViviendaDDL: any =
        ReactRedux.connect(TipoVivienda$DDL.props, null)(TipoVivienda$DDL);

    interface IVocacionesSPVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    };

    export class VocacionesSPV$DDL extends React.Component<IVocacionesSPVDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.VOCACIONESSPV,
            plazaSeleccionada: Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Vocaciones",
            items: createDefaultStoreObject([]),
            label: "Vocaciones",
            helpLabel: "Seleccione un Tipo de Vocación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::VOCACIONESSPV", "base/scv/vocacionesSPV/Get/GetAll/" + encodedFilters);
            };
        };
        componentWillReceiveProps(nextProps: IVocacionesSPVDDLProps, nextState: IDropDrownListState): void {
            if (global.isSuccessful(nextProps.items)) {
                let itemsModificados: DataElement = nextProps.items;
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };

                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = 'TODOS';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    };
                };

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        if (items.data.length > 0) {
                            item = items.data[0];
                            Forms.updateFormElement(idForm, this.props.id, item)
                        }
                    }
                };

                if (getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID) {
                    Forms.updateFormElement(idForm, "Vocaciones", null)
                };
            };
        };
        shouldComponentUpdate(nextProps: IVocacionesSPVDDLProps, { }): boolean {
            return global.hasChanged(this.props.items, nextProps.items) ||
                global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada);
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const VocacionesSPVDDL: any = ReactRedux.connect(VocacionesSPV$DDL.props, null)(VocacionesSPV$DDL);

    interface IPersonaEntregaVDDLProps extends IDropDrownListProps {
        Plaza: any;
    }

    export class PersonaEntregaV$DDL extends React.Component<IPersonaEntregaVDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.PERSONALENTREGAVPOSTVENTA,
            Plaza: state.global.Plaza_Seleccionada
        });

        static defaultProps: IDropDrownListProps = {
            id: "PersonaEntregaV",
            items: createDefaultStoreObject([]),
            label: "Persona Entrega Viv.",
            helpLabel: "Seleccione una Persona Entrega Viv.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };




        componentWillReceiveProps(nextProps: IPersonaEntregaVDDLProps, nextState: IDropDrownListState): void {
            if (getData(nextProps.Plaza).ID != getData(this.props.Plaza).ID) {
                //Forms.updateFormElement(config.id, "TipoComercializacion", { ID: -1, Nombre: "Seleccione un Tipo de Comercialización" })
                let IdPlaza: any = getData(nextProps.Plaza).ID;
                let encodedParams: string = global.encodeParameters({ IdPlaza: IdPlaza });
                let encodedURL: any = "ConsultaViviendaEntregable/GetPersonaEntregaV/" + encodedParams;
                dispatchAsync("load::PERSONALENTREGAVPOSTVENTA", encodedURL);
                //dispatchAsync("load::PERSONALENTREGAVPOSTVENTA", "ConsultaViviendaEntregable/GetPersonaEntregaV/");

            }

        };

        shouldComponentUpdate(nextProps: IPersonaEntregaVDDLProps, nextState: IPersonaEntregaVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }



        render(): any {

            return <DropdownList$Form {...this.props} />;

        };
    };
    export const PersonaEntregaVDDL: any =
        ReactRedux.connect(PersonaEntregaV$DDL.props, null)(PersonaEntregaV$DDL);

    interface ITagsFraccionamientosProps extends EK.UX.DropDownLists.IDropDrownListProps {
        plaza?: DataElement;
        vocacion?: DataElement;
        vocaciones?: DataElement;
    };

    export const TagsFraccionamientos = global.connect(class extends React.Component<ITagsFraccionamientosProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.tags$fraccionamientos;
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            retValue.vocacion = Forms.getDataValue("Vocacion", [retValue.config.id, "$filters"].join(""), state);
            // console.log([retValue.config.id, "$filters"].join(""));
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-info bold'> ", item.obj.Clave, " </span> ",
                            "<span class='bold' style='font-size: 90%'> ", item.obj.Nombre, " </span>"
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 10px'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                }
                else {
                    return $(["<span class='badge badge-success bold'> ", item.Clave, " </span>"].join(""));
                };
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = {};

                if (items && items.length > 0) {
                    items.forEach((f: any) => { f.ID = parseInt(f.ID); });
                };

                for (var i = 0; i < items.length; i++) {
                    tp = items[i].Plaza;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            }
        };
        componentWillReceiveProps(nextProps: ITagsFraccionamientosProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
            };
            //console.log(nextProps.vocacion);
            if (global.hasChanged(this.props.vocacion, nextProps.vocacion)) {
                if ((getData(nextProps.vocacion).ID != getData(this.props.vocacion).ID) || actualizarFraccionamiento === 1) {
                    let idVocacion: any = getData(nextProps.vocacion).ID;
                    let idPlaza: any = getData(nextProps.plaza).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    if (idPlaza != undefined && idVocacion != undefined) {
                        let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: idVocacion });
                        global.dispatchAsync("load::tags$fraccionamientos", "base/kontrol/fraccionamientos/all/" + encodedParams);
                    };

                    Forms.updateFormElement(idForm, this.props.id, null);
                };
            };
            if (global.isSuccessful(nextProps.items)) {
                if (global.hasChanged(this.props.items, nextProps.items)) {
                    let existeItemTodos: boolean = false;

                    for (var i = 0; i < nextProps.items.data.length; i++) {
                        if (String(nextProps.items.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };

                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem["ID"] = -2;
                        nuevoItem["Clave"] = "-2";
                        nuevoItem["Nombre"] = "TODOS";

                        if (nextProps.items.data.length > 0) {
                            nextProps.items.data.unshift(nuevoItem);
                        };
                    };

                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (idForm != null && idForm != undefined) {
                        let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                        if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                            let item: any = [];
                            let items: any = nextProps.items;
                            if (items.data.length > 0) {
                                item.unshift(items.data[0]);
                                Forms.updateFormElement(idForm, this.props.id, item);
                            }
                        }
                    };
                }
            }
        };
        shouldComponentUpdate(nextProps: ITagsFraccionamientosProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;
            //console.log(items);
            //if (global.isSuccessful(this.props.items)) {
            //    let selectedAll: boolean = false;

            //    for (var i = 0; i < items.data.length; i++) {
            //        if (String(items.data[i].ID) === "-2") {
            //            selectedAll = true;
            //            break;
            //        };
            //    };

            //    if (selectedAll === false) {
            //        let item: any = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
            //        if (items.data.length > 0) {
            //            items.data.unshift(item);
            //        };
            //    };
            //};
            //console.log(this.props);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />
        };
    });

    export const TagsFraccionamientosV2 = global.connect(class extends React.Component<ITagsFraccionamientosProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.tags$fraccionamientos;
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            retValue.vocacion = Forms.getDataValue("Vocacion", [retValue.config.id, "$filters"].join(""), state);
            // console.log([retValue.config.id, "$filters"].join(""));
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-info bold'> ", item.obj.Clave, " </span> ",
                            "<span class='bold' style='font-size: 90%'> ", item.obj.Nombre, " </span>"
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 10px'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                }
                else {
                    return $(["<span class='badge badge-success bold'> ", item.Clave, " </span>"].join(""));
                };
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = {};

                if (items && items.length > 0) {
                    items.forEach((f: any) => { f.ID = parseInt(f.ID); });
                };

                for (var i = 0; i < items.length; i++) {
                    tp = items[i].Plaza;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            }
        };
        componentWillReceiveProps(nextProps: ITagsFraccionamientosProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
            };
            //console.log(nextProps.vocacion);
            if (global.hasChanged(this.props.vocacion, nextProps.vocacion)) {
                if ((getData(nextProps.vocacion).ID != getData(this.props.vocacion).ID) || actualizarFraccionamiento === 1) {
                    let idVocacion: any = getData(nextProps.vocacion).ID;
                    let idPlaza: any = getData(nextProps.plaza).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    if (idPlaza != undefined && idVocacion != undefined) {
                        console.log(idPlaza, idVocacion)
                        let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: idVocacion });
                        global.dispatchAsync("load::tags$fraccionamientos", "base/kontrol/fraccionamientos/all/" + encodedParams);
                    };

                    Forms.updateFormElement(idForm, this.props.id, null);
                };
            };
            if (global.isSuccessful(nextProps.items)) {
                if (global.hasChanged(this.props.items, nextProps.items)) {
                    let existeItemTodos: boolean = false;

                    for (var i = 0; i < nextProps.items.data.length; i++) {
                        if (String(nextProps.items.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };

                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem["ID"] = -2;
                        nuevoItem["Clave"] = "-2";
                        nuevoItem["Nombre"] = "TODOS";

                        if (nextProps.items.data.length > 0) {
                            nextProps.items.data.unshift(nuevoItem);
                        };
                    };

                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (idForm != null && idForm != undefined) {
                        let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                        if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                            let item: any = [];
                            let items: any = nextProps.items;
                            if (items.data.length > 0) {
                                item.unshift(items.data[0]);
                                Forms.updateFormElement(idForm, this.props.id, item);
                            }
                        }
                    };
                }
            }
        };
        shouldComponentUpdate(nextProps: ITagsFraccionamientosProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let test: any = EK.Store.getState().global.page.data.id;
                if (test === "ConsultaEventosActCaptura" || test === 'ConsultaEventosActAlta') {
                    let data = this.props.items.data.filter(x => x.ID === 99999);
                    if (data.length === 0) {
                        this.props.items.data.push({ ID: 99999, Clave: 'NI', Nombre: "Ninguno" });
                    }
                }
            }
            //console.log(items);
            //if (global.isSuccessful(this.props.items)) {
            //    let selectedAll: boolean = false;

            //    for (var i = 0; i < items.data.length; i++) {
            //        if (String(items.data[i].ID) === "-2") {
            //            selectedAll = true;
            //            break;
            //        };
            //    };

            //    if (selectedAll === false) {
            //        let item: any = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
            //        if (items.data.length > 0) {
            //            items.data.unshift(item);
            //        };
            //    };
            //};
            //console.log(this.props);
            return <EK.UX.DropDownLists.DropdownList$FormV2 {...this.props} items={items} />
        };
    });

    export const TagsFraccionamientosSoloPlaza = global.connect(class extends React.Component<ITagsFraccionamientosProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.tags$fraccionamientosv2;
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"],
            itemFormatter: (item, container): any => {
                console.log(item)
                if (!item.id) {
                    console.log('XD')
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-info bold'> ", item.obj.Clave, " </span> ",
                            "<span class='bold' style='font-size: 90%'> ", item.obj.Nombre, " </span>"
                        ].join(""));
                    }
                    else if (item.Clave) {
                        return $([
                            "<span class='badge badge-success bold'> ", item.Clave, " </span> ",
                            "<span class='bold' style='font-size: 90%'> ", item.Nombre, " </span>"
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    }
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                console.log(item)
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    console.log(id)
                    if (item.Clave) {
                        return $(["<span class='badge badge-success bold'> ", item.Clave, " </span>"].join(""));
                    } else {
                        return item.text;
                    }
                };
                if (id < 1) {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 10px'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                }
                else {
                    return $(["<span class='badge badge-success bold'> ", item.Clave, " </span>"].join(""));
                };
                
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = {};

                if (items && items.length > 0) {
                    items.forEach((f: any) => { f.ID = parseInt(f.ID); });
                };

                for (var i = 0; i < items.length; i++) {
                    tp = items[i].Plaza;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };
                //console.log(retValue)
                return retValue;
            }
        };
        componentWillReceiveProps(nextProps: ITagsFraccionamientosProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
            };
            //console.log(nextProps.vocacion);
            //if (global.hasChanged(this.props.vocacion, nextProps.vocacion)) {
                if ( actualizarFraccionamiento === 1) {
                    let idPlaza: any = getData(nextProps.plaza).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    if (idPlaza != undefined) {
                        //console.log(idPlaza, idVocacion)
                        let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza });
                        global.dispatchAsync("load::tags$fraccionamientosv2", "base/kontrol/fraccionamientos/all/" + encodedParams);
                    };

                    Forms.updateFormElement(idForm, this.props.id, null);
                };
            //};
            if (global.isSuccessful(nextProps.items)) {
                if (global.hasChanged(this.props.items, nextProps.items)) {
                    let existeItemTodos: boolean = false;

                    for (var i = 0; i < nextProps.items.data.length; i++) {
                        if (String(nextProps.items.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };

                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem["ID"] = -2;
                        nuevoItem["Clave"] = "-2";
                        nuevoItem["Nombre"] = "TODOS";

                        if (nextProps.items.data.length > 0) {
                            nextProps.items.data.unshift(nuevoItem);
                        };
                    };

                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (idForm != null && idForm != undefined) {
                        let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                        if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                            let item: any = [];
                            let items: any = nextProps.items;
                            console.log(items)
                            if (items.data.length > 0) {
                                item.unshift(items.data[0]);
                                Forms.updateFormElement(idForm, this.props.id, item);
                            }
                        }
                    };
                }
            }
        };
        shouldComponentUpdate(nextProps: ITagsFraccionamientosProps, { }): boolean {
            //console.log(hasChanged(this.props.items, nextProps.items))
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza)
                //hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;
            return <EK.UX.DropDownLists.DropdownList$FormV2 {...this.props} items={items} />
        };
    });


    export const TagsFraccionamientos2 = global.connect(class extends React.Component<ITagsFraccionamientosProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.tags$fraccionamientos2;
            retValue.plaza = Forms.getDataValue("PlazaInicial", [retValue.config.id, "$filters"].join(""), state);
            retValue.vocacion = Forms.getDataValue("Vocacion", [retValue.config.id, "$filters"].join(""), state);
            // console.log([retValue.config.id, "$filters"].join(""));
            return retValue;
        };
        static defaultProps: ITagsFraccionamientosProps = {
            id: "TagsFraccionamientos",
            label: "Fraccionamientos",
            helpLabel: "Seleccione los fraccionamientos",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            mode: 1,
            matchers: ["Clave", "Nombre"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-info bold'> ", item.obj.Clave, " </span> ",
                            "<span class='bold' style='font-size: 90%'> ", item.obj.Nombre, " </span>"
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        " </span> ",
                        "<span style='font-size: 10px'> ",
                        item.ID == -2 ? "" : item.Nombre, " </span>"
                    ].join(""));
                }
                else {
                    return $(["<span class='badge badge-success bold'> ", item.Clave, " </span>"].join(""));
                };
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = {};

                if (items && items.length > 0) {
                    items.forEach((f: any) => { f.ID = parseInt(f.ID); });
                };

                for (var i = 0; i < items.length; i++) {
                    tp = items[i].Plaza;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            }
        };
        componentWillReceiveProps(nextProps: ITagsFraccionamientosProps, { }): void {
            let actualizarFraccionamiento: any = 0;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                actualizarFraccionamiento = 1;
            };
            //console.log(nextProps.vocacion);
            if (global.hasChanged(this.props.vocacion, nextProps.vocacion)) {
                if ((getData(nextProps.vocacion).ID != getData(this.props.vocacion).ID) || actualizarFraccionamiento === 1) {
                    let idVocacion: any = getData(nextProps.vocacion).ID;
                    let idPlaza: any = getData(nextProps.plaza).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    if (idPlaza != undefined && idVocacion != undefined) {
                        let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: idVocacion });
                        global.dispatchAsync("load::tags$fraccionamientos2", "base/kontrol/fraccionamientos/all/" + encodedParams);
                    };

                    Forms.updateFormElement(idForm, this.props.id, null);
                };
            };
            if (global.isSuccessful(nextProps.items)) {
                if (global.hasChanged(this.props.items, nextProps.items)) {
                    let existeItemTodos: boolean = false;

                    for (var i = 0; i < nextProps.items.data.length; i++) {
                        if (String(nextProps.items.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };

                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem["ID"] = -2;
                        nuevoItem["Clave"] = "-2";
                        nuevoItem["Nombre"] = "TODOS";

                        if (nextProps.items.data.length > 0) {
                            nextProps.items.data.unshift(nuevoItem);
                        };
                    };

                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    if (idForm != null && idForm != undefined) {
                        let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                        if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                            let item: any = [];
                            let items: any = nextProps.items;
                            if (items.data.length > 0) {
                                item.unshift(items.data[0]);
                                Forms.updateFormElement(idForm, this.props.id, item);
                            }
                        }
                    };
                }
            }
        };
        shouldComponentUpdate(nextProps: ITagsFraccionamientosProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.vocacion, nextProps.vocacion);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let data = this.props.items.data.filter(x => x.ID === 99999);
                if (data.length === 0) {
                    this.props.items.data.push({ ID: 99999, Clave: 'NI', Nombre: "Ninguno" });
                }
            }
            //console.log(items);
            //if (global.isSuccessful(this.props.items)) {
            //    let selectedAll: boolean = false;

            //    for (var i = 0; i < items.data.length; i++) {
            //        if (String(items.data[i].ID) === "-2") {
            //            selectedAll = true;
            //            break;
            //        };
            //    };

            //    if (selectedAll === false) {
            //        let item: any = global.assign({ ID: -2, Clave: "-2", Nombre: "TODOS" });
            //        if (items.data.length > 0) {
            //            items.data.unshift(item);
            //        };
            //    };
            //};
            //console.log(this.props);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />
        };
    });
    export interface IFraccionamientosVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
        vocacionSeleccionada?: global.DataElement;
    };

    export class Fraccionamientos$DDL extends React.Component<IFraccionamientosVDDLProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            items: state.global.DDLFRACCIONAMIENTOS,
            vocacionSeleccionada: Forms.getDataValue("Vocaciones", getData(state.global.pageConfig).id, state),
            plazaSeleccionada: Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Fraccionamientos",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentWillReceiveProps(nextProps: IFraccionamientosVDDLProps, nextState: IDropDrownListState): void {
            let actualizarFraccionamiento: any = 0;
            if (getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID) {
                actualizarFraccionamiento = 1;
            };
            //
            if (global.hasChanged(this.props.vocacionSeleccionada, nextProps.vocacionSeleccionada)) {
                if ((getData(nextProps.vocacionSeleccionada).ID != getData(this.props.vocacionSeleccionada).ID) || actualizarFraccionamiento === 1) {
                    let idVocacion: any = getData(nextProps.vocacionSeleccionada).ID;
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: idVocacion });
                    let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;

                    Forms.updateFormElement(idForm, this.props.id, null)
                    if (idPlaza != undefined && idVocacion != undefined) {
                        dispatchAsync("load::DDLFRACCIONAMIENTOS", encodedURL);
                    };
                };
            };
        };
        shouldComponentUpdate(nextProps: IFraccionamientosVDDLProps, nextState: IDropDrownListState): boolean {
            return global.hasChanged(this.props.items, nextProps.items) ||
                global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada) ||
                global.hasChanged(this.props.vocacionSeleccionada, nextProps.vocacionSeleccionada);
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    };
                };
            };
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />
        };
    };
    export const FraccionamientosDDL: any = ReactRedux.connect(Fraccionamientos$DDL.props, null)(Fraccionamientos$DDL);

    export class PersonaEntregaVxFracc$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.PERSONALENTREGAVXFRACC,
        });
        static defaultProps: IDropDrownListProps = {
            id: "PersonaEntregaVxFracc",
            items: createDefaultStoreObject([]),
            label: "Persona Entrega Viv.",
            helpLabel: "Seleccione una Persona Entrega Viv.",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            //if (!isLoadingOrSuccessful(this.props.items)) {
            //    console.log('no cargado')
            //    // dispatchAsync("load::PLAZASPOSTVENTA", "ConsultaViviendaEntregable/GetPlazas/");
            //};
        };

        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            // console.log(hasChanged(this.props.items, nextProps.items))
            //console.log(this.props.items);
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            if (global.isSuccessful(nextProps.items)) {
                if (hasChanged(this.props.items, nextProps.items)) {
                    //      console.log(this.props.items, nextProps.items);
                    //setTimeout(() => {
                    //    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                    //    let selected = getData(EK.Store.getState().global.selectedUserForConst).num_entrega_viv;
                    //    if (idForm != null && idForm != undefined) {
                    //        let items: any = nextProps.items;
                    //        for (let i = 0; i < items.data.length; i++) {
                    //            if (items.data[i].Clave === selected) {
                    //                let item = items.data[i];
                    //                Forms.updateFormElement(idForm, this.props.id, item);
                    //                break;
                    //            }
                    //        }
                    //    }
                    //}, 100)
                }
            }
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const PersonaEntregaVxFraccDDL: any =
        ReactRedux.connect(PersonaEntregaVxFracc$DDL.props, null)(PersonaEntregaVxFracc$DDL);

    export class MotivoRezago$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.MOTIVOSREZAGOPOSTVENTA
        });

        static defaultProps: IDropDrownListProps = {
            id: "MotivoRezago",
            items: createDefaultStoreObject([]),
            label: "Motivo Rezago",
            helpLabel: "Seleccione un Motivo de Rezago",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::MOTIVOSREZAGOPOSTVENTA", "ConsultaViviendaEntregable/GetMotivoRezago/");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const MotivoRezagoDDL: any =
        ReactRedux.connect(MotivoRezago$DDL.props, null)(MotivoRezago$DDL);

    export class Detallesreprog$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.DETREPROGPOSTVENTA
        });

        static defaultProps: IDropDrownListProps = {
            id: "Detallesreprog",
            items: createDefaultStoreObject([]),
            label: "Detalles Reprogramacion",
            helpLabel: "Seleccione un Detalle de Reprogramacion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "id_detalle",
            itemValue: "detalle",
            size: [12, 12, 6, 6]
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::DETREPROGPOSTVENTA", "ConsultaViviendaEntregable/GetMotivoRezago/");
            };
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const DetallesreprogDDL: any =
        ReactRedux.connect(Detallesreprog$DDL.props, null)(Detallesreprog$DDL);


    interface ISPVMotivosVDDLProps extends IDropDrownListProps { }

    export class Motivosreprog$DDL extends React.Component<ISPVMotivosVDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SPVMOTIVOS
        });

        static defaultProps: ISPVMotivosVDDLProps = {
            id: "Motivosreprog",
            items: createDefaultStoreObject([]),
            label: "Motivos",
            helpLabel: "Seleccione un Motivo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };

        shouldComponentUpdate(nextProps: ISPVMotivosVDDLProps, nextState: IDropDrownListState) {
            return (hasChanged(this.props.items, nextProps.items));
        }

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };
    export const MotivosreprogDDL: any = ReactRedux.connect(Motivosreprog$DDL.props, null)(Motivosreprog$DDL);



    export let TiposConceptoCreditoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSCONCEPTO
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoConcepto",
            items: createDefaultStoreObject([]),
            label: "Tipo de Concepto de Crédito",
            helpLabel: "Seleccione un Tipo de Concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOSCONCEPTO", "catalogos/get(SCVTIPOSCONCEPTO)");
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });

    export let EfectoConceptoCreditoDDL = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.EFECTOSCONCEPTOCREDITO
        });
        static defaultProps: IDropDrownListProps = {
            id: "Efecto",
            items: createDefaultStoreObject([]),
            label: "Efecto de Concepto de Crédito",
            helpLabel: "Seleccione un Efecto para el Concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EFECTOSCONCEPTOCREDITO", "catalogos/get(EFECTOSCONCEPTOCREDITO)");
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    })
    export let EstatusClienteDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSCLIENTE
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusCliente",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSCLIENTE", "catalogos/get(ESTATUSCLIENTE)");
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });
    export let AniosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ANIOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Clave",
            itemKey: "ID",
            label: "Periodo",
            itemValue: "Clave",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let fechaActual: any = global.getObtenerFecha();
                let anioActual: any = fechaActual.getFullYear();
                let arreglo: any = [];
                for (var i = 0; i < 20; i++) {
                    let opciones: any = {};
                    opciones["ID"] = anioActual + i;
                    opciones["Clave"] = anioActual + i;
                    arreglo[i] = opciones;
                }
                EK.Global.dispatchFullSuccessful("load::ANIOS", arreglo);
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });

    interface IFullAniosDDLProps extends IDropDrownListProps {
        fechaInicio?: string;
    };

    export let FullAniosDDL: any = global.connect(class extends React.Component<IFullAniosDDLProps, IFullAniosDDLProps> {
        static props: any = (state: any) => ({
            items: state.global.FULLANIOS
        });
        static defaultProps: IFullAniosDDLProps = {
            id: "FullAnio",
            itemKey: "ID",
            label: "Periodo",
            itemValue: "Clave",
            size: [12, 12, 6, 6],
            fechaInicio: "2005-01-01"
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let fechaInicio: any = new Date(this.props.fechaInicio);
                let fechaActual: any = global.getObtenerFecha();
                //
                let anioInicio: any = fechaInicio.getFullYear();
                let anioFin: any = fechaActual.getFullYear();
                //
                let arreglo: any = [];
                let totalAnios: any = anioFin - anioInicio;
                for (var i = 0; i < totalAnios; i++) {
                    let opciones: any = {};
                    opciones["ID"] = anioFin - i;
                    opciones["Clave"] = anioFin - i;
                    arreglo[i] = opciones;
                }
                EK.Global.dispatchFullSuccessful("load::FULLANIOS", arreglo);
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });
    export let MesesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.MESES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Meses",
            itemKey: "ID",
            label: "Mes",
            itemValue: "Clave",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };



        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idItem: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idItem === undefined || idItem === null || idItem.ID === null || idItem.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        var fecha = new Date();
                        var mesActual = fecha.getMonth();
                        item = items.data[mesActual];
                        Forms.updateFormElement(idForm, this.props.id, item)
                    }
                }
            }
        }

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                let arreglo: any = [];
                for (var i = 0; i < 12; i++) {
                    let opciones: any = {};
                    opciones["ID"] = i + 1;
                    opciones["Clave"] = ("00" + (i + 1)).slice(-2);
                    opciones["Nombre"] = nombreMeses[i];
                    arreglo[i] = opciones;
                }
                EK.Global.dispatchFullSuccessful("load::MESES", arreglo);
            };
        };


        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });
    export let EstatusListaPreciosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSLISTAPRECIOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusListaPrecios",
            label: "Estatus",
            helpLabel: "Seleccione el Estatus",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSLISTAPRECIOS", "catalogos/get(ESTATUSLISTAPRECIOS)");
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });

    export let PosicionesActivasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.POSICIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Posicion",
            items: createDefaultStoreObject([]),
            label: "Posición",
            helpLabel: "Seleccione una posición",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Clave", "Nombre", "Usuario.Nombre", "Usuario.Apellidos"],
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span>",
                            item.obj.Nombre,
                            "</span>",
                            "<span class='badge badge-info'>",
                            item.obj.Usuario.Nombre,
                            "</span>"].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                        "<span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                } else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                        "<span class='badge badge-info'>",
                        item.Usuario.Nombre,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span>",
                        item.Nombre,
                        "</span>",
                        "<span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                };
                return $([
                    "<span>",
                    item.Nombre,
                    "</span>",
                    "<span class='badge badge-info'>",
                    item.Usuario.Nombre,
                    "</span> "].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "posiciones", { activos: 1 });
                dispatchAsync("load::POSICIONES", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let UsuariosAllDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.USUARIOSALL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Usuario",
            items: createDefaultStoreObject([]),
            label: "Usuario",
            helpLabel: "Seleccione un usuario",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        let colorEstatus: string = item.Estatus.Clave == "A" ? "#8bc780" : "#EF4836";

                        if (item.IdAgente > 0) {
                            return $([
                                "<span style='color:" + colorEstatus + ";margin-right:3px' class='fa fa-circle'></span>",
                                "<span style='font-size: 90%'>",
                                item.Nombre, " ", item.Apellidos,
                                "</span>",
                                "<span class='badge badge-primary'>A</span>"
                            ].join(""));
                        }
                        else {
                            return $([
                                "<span style='color:" + colorEstatus + ";margin-right:3px' class='fa fa-circle'></span>",
                                "<span style='font-size: 90%'>",
                                item.Nombre, " ", item.Apellidos,
                                "</span>",
                            ].join(""));
                        }
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                    ].join(""));
                }
                else {
                    let colorEstatus: string = item.Estatus.Clave == "A" ? "#8bc780" : "#EF4836";

                    if (item.IdAgente > 0) {
                        return $([
                            "<span style='color:" + colorEstatus + ";margin-right:3px' class='fa fa-circle'></span>",
                            "<span style='font-size: 90%'>",
                            item.Nombre, " ", item.Apellidos,
                            "</span>",
                            "<span class='badge badge-primary'>A</span>"
                        ].join(""));
                    }

                    return $([
                        "<span style='color:" + colorEstatus + ";margin-right:3px' class='fa fa-circle'></span>",
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                    ].join(""));
                };
                let colorEstatus: string = item.Estatus.Clave == "A" ? "#8bc780" : "#EF4836";

                if (item.IdAgente > 0) {
                    return $([
                        "<span style='color:" + colorEstatus + ";margin-right:3px' class='fa fa-circle'></span>",
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                        "<span class='badge badge-primary'>A</span>"
                    ].join(""));
                }

                return $([
                    "<span style='color:" + colorEstatus + ";margin-right:3px' class='fa fa-circle'></span>",
                    "<span style='font-size: 90%'>",
                    item.Nombre, " ", item.Apellidos,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "usuarios", null);
                dispatchAsync("load::USUARIOSALL", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let UsuariosActivosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.USUARIOSACTIVOS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Usuario",
            items: createDefaultStoreObject([]),
            label: "Usuario",
            helpLabel: "Seleccione un usuario",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span style='font-size: 90%'>",
                            item.Nombre, " ", item.Apellidos,
                            "</span>",
                        ].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                    ].join(""));
                } else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>",
                    ].join(""));
                };
                return $([
                    "<span style='font-size: 90%'>",
                    item.Nombre, " ", item.Apellidos,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "usuarios", { activos: 1 });
                dispatchAsync("load::USUARIOSACTIVOS", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let UsuariosDescendientesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.USUARIOSDESCENDIENTES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Usuario",
            items: createDefaultStoreObject([]),
            label: "Usuario",
            helpLabel: "Seleccione un usuario",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span style='font-size: 90%'>",
                            item.Nombre, " ", item.Apellidos,
                            "</span>",
                        ].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                    ].join(""));
                } else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ", item.Apellidos, " ",
                        "</span>",
                        "<span class='badge badge-info bold'>",
                        item.Posicion.Nombre,
                        "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                    ].join(""));
                };
                return $([
                    "<span style='font-size: 90%'>",
                    item.Nombre, " ", item.Apellidos, " ",
                    "</span>",
                    "<span class='badge badge-info bold'>",
                    item.Posicion.Nombre,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::USUARIOSDESCENDIENTES", "usuarios/descendientes/true");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let UsuariosDescendientesPosicionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.USUARIOSDESCENDIENTESPOSICION
        });
        static defaultProps: IDropDrownListProps = {
            id: "Usuario",
            items: createDefaultStoreObject([]),
            label: "Usuario",
            helpLabel: "Seleccione un usuario",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            matchers: ["Clave", "Nombre", "Usuario.Nombre", "Usuario.Apellidos"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span>",
                            item.Nombre,
                            "</span>",
                            "<span class='badge badge-info bold'>",
                            item.Usuario.Nombre, " ", item.Usuario.Apellidos,
                            "</span>",
                        ].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span>",
                        item.Nombre, " ",
                        "</span>",
                    ].join(""));
                } else {
                    return $([
                        "<span>",
                        item.Nombre,
                        "</span>",

                        "<span class='badge badge-info bold'>",
                        item.Usuario.Nombre, " ", item.Usuario.Apellidos,
                        "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span>",
                        item.Nombre, " ",
                        "</span>",
                    ].join(""));
                };
                return $([
                    "<span>",
                    item.Nombre,
                    "</span>",
                    "<span class='badge badge-info bold'>",
                    item.Usuario.Nombre, " ", item.Usuario.Apellidos,
                    "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::USUARIOSDESCENDIENTESPOSICION", "posiciones/descendientes/" + global.getCurrentUser().ID);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let DocumentosCategoriaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DOCUMENTOSCATEGORIA
        });
        static defaultProps: IDropDrownListProps = {
            id: "Categoria",
            items: createDefaultStoreObject([]),
            label: "Categoría",
            helpLabel: "Seleccione una Categoría",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::DOCUMENTOSCATEGORIA", "base/kontrol/KontrolFiles/Get/GetCategories/" + global.encodeParameters({ activos: 0 }));
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });

    export let PRECIOVENTADDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PRECIOVENTA
        });
        static defaultProps: IDropDrownListProps = {
            id: "PrecioVenta",
            items: createDefaultStoreObject([]),
            label: "Precio de Venta",
            helpLabel: "Seleccione un Precio de Venta",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::PRECIOVENTA", "catalogos/get(PRECIOVENTA)");
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });


    export let TipoClienteDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoCliente
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoCliente",
            items: createDefaultStoreObject([]),
            label: "Tipo Expediente",
            helpLabel: "Seleccione un tipo de expediente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::TipoCliente", "base/kontrol/TipoCliente/Get/GetAll/" + encodedFilters);
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });

    export let INDICADORESDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.INDICADORES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Indicadores",
            items: createDefaultStoreObject([]),
            label: "Indicador",
            helpLabel: "Seleccione un Indicador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::INDICADORES", "base/kontrol/indicadores/Get/GetAll/" + encodedFilters);
            };
        };
        render(): any {
            return <DropdownList$Form  {...this.props} />;
        };
    });

    export let EstatusFlujoAutorizacionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.EstatusFlujoAutorizacion
        });
        static defaultProps: IDropDrownListProps = {
            id: "Estatus",
            items: createDefaultStoreObject([]),
            label: "Estatus Flujo Autorización",
            helpLabel: "Seleccione un estatus",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::EstatusFlujoAutorizacion", "catalogos/get(FLUJOESTATUS)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let TipoFlujoTrabajoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoFlujoTrabajo
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoFlujo",
            items: createDefaultStoreObject([]),
            label: "Tipo Flujo Trabajo",
            helpLabel: "Tipo Flujo Trabajo",
            value: createDefaultStoreObject({}),
            initialValue: "EP",
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::TipoFlujoTrabajo", "base/kontrol/tipoFlujo/Get/GetAll/" + encodedFilters);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let SPVHorariosAtencion: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.HorarioAtencion
        });
        static defaultProps: IDropDrownListProps = {
            id: "HoraFIN",
            items: createDefaultStoreObject([]),
            label: "Hora Fin",
            helpLabel: "Horario de Atención",
            value: createDefaultStoreObject({}),
            initialValue: "EP",
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            //if (!isLoadingOrSuccessful(this.props.items)) {
            let encodedFilters: string = global.encodeObject({ activos: 1 });
            if (EK.Store.getState().global.currentEntityType.data == "CapturaFechaConstruccion" ||
                EK.Store.getState().global.currentEntityType.data == "ConfigViviendaEntregable" ||
                EK.Store.getState().global.currentEntityType.data == "Agenda")
                encodedFilters = global.encodeObject({ activos: 1, quarterSteps: 1 });
            dispatchAsync("load::HorarioAtencion", "base/kontrol/HorarioAtencion/Get/GetAll/" + encodedFilters);
            //};
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let SCVNotarios: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.Notarios
        });
        static defaultProps: IDropDrownListProps = {
            id: "Notario",
            items: createDefaultStoreObject([]),
            label: "Notario",
            helpLabel: "Notario",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ", item.NumNotaria, "</span>",
                        "<span class='bold' style='font-size: 90%'> ", item.Nombre, "</span> "
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id)) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ", item.text, "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'> ", item.NumNotaria, "</span>",
                    "<span class='bold' style='font-size: 90%'> ", item.Nombre, "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::Notarios", "base/scv/notarios/Get/GetAll/" + encodedFilters);

            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    export let SCVEsquemasSeguimientoAll: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESQUEMASSEGUIMIENTOALL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Esquema",
            items: createDefaultStoreObject([]),
            label: "Esquema de seguimiento",
            helpLabel: "Esquema de seguimiento",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "esquemas", { activos: 1 });
                dispatchAsync("load::ESQUEMASSEGUIMIENTOALL", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export interface ISPVContratistasProps extends ddl.IDropDrownListProps {
        idPlaza?: any;
    };

    export let SPVTiposContratista: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SPVTIPOSCONTRATISTA
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoContratista",
            items: createDefaultStoreObject([]),
            label: "Tipo de Contratista",
            helpLabel: "Seleccione el tipo de contratista",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TipoContratista", { activos: 1 });
                global.dispatchAsync("load::SPVTIPOSCONTRATISTA", url);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        }
    });

    class SPVUbicacionesFallas$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ubicaciones$fallas
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "UbicacionFalla",
            items: createDefaultStoreObject([]),
            label: "Ubicación Incidencia",
            helpLabel: "Seleccione una ubicación incidencia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>", item.IdUbicacionFalla, "</span> ",
                        "<span class='bold' style='font-size: 90%'>", item.Descripcion, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success bold'>", item.IdUbicacionFalla, "</span> ",
                    "<span class='bold' style='font-size: 90%'>", item.Descripcion, "</span>"
                ].join(""));
            }
        };
        //componentDidMount(): void {
        //    if (!isLoadingOrSuccessful(this.props.items)) {
        //        let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1 });
        //        global.dispatchAsync("load::ubicaciones$fallas", url);
        //    };
        //};
        render(): JSX.Element {
            //console.log(this.props)
            let e: any = global.assign({}, { ID: -2, IdUbicacionFalla: null, Descripcion: "Seleccione una opción" });
            let items: any = assignElement(this.props.items, e);

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />;
        };
    };
    export const SPVUbicacionesFallasDDL: any = ReactRedux.connect(SPVUbicacionesFallas$DDL.props, null)(SPVUbicacionesFallas$DDL);

    class SPVChecklistconstruccionDDL$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global['ListItemsCheckList']
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "ChecklistItem",
            items: createDefaultStoreObject([]),
            label: "Checklist",
            helpLabel: "Seleccione un concepto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>", item.Clave, "</span> ",
                        "<span class='bold' style='font-size: 90%'>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success bold'>", item.Clave, "</span> ",
                    "<span class='bold' style='font-size: 90%'>", item.Nombre, "</span>"
                ].join(""));
            }
        };
        //componentDidMount(): void {
        //    if (!isLoadingOrSuccessful(this.props.items)) {
        //        let url: string = global.encodeAllURL("scv", "UbicacionesFalla", { activos: 1 });
        //        global.dispatchAsync("load::ubicaciones$fallas", url);
        //    };
        //};
        componentDidMount(): void {
            this.GetListaItemStatic();
        };

        GetListaItemStatic() {
            //si no funciona empezar desde -4
            let items = [
                { ID: 12, Clave: '12', Nombre: 'Revisar calcomanías de certificaciones' },
                { ID: 7, Clave: '7', Nombre: 'Accesorios y muebles de baño' },
                { ID: 13, Clave: '13', Nombre: 'Detalle en pisos' },
                { ID: 3, Clave: '3', Nombre: 'Detalles/Pendientes de acabados Exteriores (texturas,pinturas,etc.)' },
                { ID: 2, Clave: '2', Nombre: 'Detalles/Pendientes de acabados interiores (texturas,pinturas,etc.)' },
                { ID: 4, Clave: '4', Nombre: 'Detalles/Pendientes de instalacion Electrica, incluyendo murete y acometida' },
                { ID: 5, Clave: '5', Nombre: 'Detalles/Pendientes de instalacion Hidraulica/Sanitaria' },
                { ID: 6, Clave: '6', Nombre: 'Detalles/Pendientes de instalacion otras' },
                { ID: 1, Clave: '1', Nombre: 'Detalles/Pendientes de Limpieza' },
                { ID: 8, Clave: '8', Nombre: 'Equipamientos especiales para esta vivienda' },
                { ID: 14, Clave: '14', Nombre: 'Funcionamiento de puertas y ventanas' }
            ];
            dispatchSuccessful(`load::ListItemsCheckList`, items);
        }
        render(): JSX.Element {
            //console.log(this.props)
            let e: any = global.assign({}, { ID: -2, IdUbicacionFalla: null, Descripcion: "Seleccione una opción" });
            let items: any = assignElement(this.props.items, e);

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />;
        };
    };
    export const SPVChecklistconstruccionDDL: any = ReactRedux.connect(SPVChecklistconstruccionDDL$DDL.props, null)(SPVChecklistconstruccionDDL$DDL);


    export class RecursosProgramadosPlanificacionSPV$DDL extends React.Component<IDropDrownListProps, IDropDrownListState> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.RECURSOSPROGRAMADOSSPVDASHBOARDPLAN
        });

        static defaultProps: IDropDrownListProps = {
            id: "Recurso",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione un Recurso",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Recurso.Nombre,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    if (item.Recurso) {
                        return $([
                            "<span class='' style='font-size: 90%'> ",
                            item.Recurso.Nombre,
                            "</span> "
                        ].join(""));
                    } else {
                        return $([
                            "<span class='' style='font-size: 90%'> ",
                            item.Text,
                            "</span> "
                        ].join(""));
                    }
                };
                return $([
                    item.ID == -3 ? "<span class='badge badge-warning '> " : "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::RECURSOSPROGRAMADOSSPVDASHBOARDPLAN", "base/scv/PlanificacionSPV/Get/GetRecursosProgramados/");
            };
        };

        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::RECURSOSPROGRAMADOSSPVDASHBOARDPLAN", null);
        }


        shouldComponentUpdate(nextProps: IDropDrownListProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillReceiveProps(nextProps: IDropDrownListProps, nextState: IDropDrownListProps): void {
            if (global.isSuccessful(nextProps.items)) {
                let itemsModificados: DataElement = nextProps.items;
                let existeItemTodos: boolean = false;
                let nuevoItem: any = {};
                if (itemsModificados.data.length > 0) {
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    }
                    if (existeItemTodos === false) {
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = 'TODOS';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                } else {
                    nuevoItem['ID'] = -3;
                    nuevoItem['Clave'] = 'Sin Clasificador';
                    nuevoItem['Nombre'] = 'Configurar';
                    itemsModificados.data.unshift(nuevoItem);
                }


                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idValueObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idValueObject === undefined || idValueObject === null || idValueObject.ID === null || idValueObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        item = items.data[0];
                        Forms.updateFormElement(idForm, this.props.id, item)
                    }
                }
            }
        }

        render(): any {

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const RecursosProgramadosDDL: any = ReactRedux.connect(RecursosProgramadosPlanificacionSPV$DDL.props, null)(RecursosProgramadosPlanificacionSPV$DDL);


    export let GirosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.GIROS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Giro",
            items: createDefaultStoreObject([]),
            label: "Giro",
            helpLabel: "Seleccione un Giro",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::GIROS", "catalogos/get(GIROS)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let TiposConveniosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoConvenio
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoConvenio",
            items: createDefaultStoreObject([]),
            label: "Tipo de Convenio",
            helpLabel: "Seleccione un Tipo de Convenio",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='bandera-", item.Clave, "'></span>",
                        "<span class='badge badge-info'>", item.Clave, "</span>",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bandera-", item.Clave, "'></span>",
                    "<span class='badge badge-info'>", item.Clave, "</span>",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TipoConvenio", "catalogos/get(TipoConvenio)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let TipoAnticipoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoAnticipo
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoAnticipo",
            items: createDefaultStoreObject([]),
            label: "Tipo de Anticipo",
            helpLabel: "Seleccione un Tipo de Anticipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='bandera-", item.Clave, "'></span>",
                        "<span class='badge badge-info'>", item.Clave, "</span>",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='bandera-", item.Clave, "'></span>",
                    "<span class='badge badge-info'>", item.Clave, "</span>",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TipoAnticipo", "catalogos/get(TipoAnticipo)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    export let BitacoraConvenioDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.BitacoraConvenio
        });
        static defaultProps: IDropDrownListProps = {
            id: "BitacoraConvenio",
            items: createDefaultStoreObject([]),
            label: "Aditiva-Deductiva-Extra",
            helpLabel: "Seleccione un Tipo de Movimiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge' style='background-color:", item.Color, "'>", item.Clave, "</span> ",
                        "<span>", item.Nombre, "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge' style='background-color:", item.Color, "'>", item.Clave, "</span> ",
                    "<span>", item.Nombre, "</span>"
                ].join(""));
            },
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::BitacoraConvenio", "catalogos/get(BitacoraConvenio)");
            };
        };
        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    });

    class EstatusDictamenes$DDL extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps> {
        static props: any = (state: any) => ({
            items: state.global.SPVESTATUSDICTAMEN
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusDictamen",
            //label: "Estatus Diagnóstico", ***Angel Solares Aqui se comento el label
            helpLabel: "Seleccione el estatus del Diagnóstico",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SPVESTATUSDICTAMEN", "catalogos/get(SPVESTATUSDICTAMEN)");
            };
        };
        render(): JSX.Element {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    };
    export const EstatusDictamenesDDL: any = ReactRedux.connect(EstatusDictamenes$DDL.props, null)(EstatusDictamenes$DDL);

    class SPVTiposTelefono$DDL extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SPVTIPOTELEFONO
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "TipoTelefono",
            items: createDefaultStoreObject([]),
            label: "Tipo Teléfono",
            helpLabel: "Seleccione un tipo de teléfono",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SPVTIPOTELEFONO", "catalogos/get(SPVTIPOTELEFONO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export let SPVTiposTelefonoDDL: any = ReactRedux.connect(SPVTiposTelefono$DDL.props, null)(SPVTiposTelefono$DDL);
    //
    interface ISCCOTiposNivelesDDLProps extends IDropDrownListProps {
        filter?: (items: any[]) => any[];
    };

    export const SCCOTiposNivelesDDL: any = global.connect(class extends React.Component<ISCCOTiposNivelesDDLProps, IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.SCCOTIPOSNIVELES
        });
        static defaultProps: ISCCOTiposNivelesDDLProps = {
            id: "TipoNivelPresupuesto",
            items: createDefaultStoreObject([]),
            label: "Tipo de Nivel",
            helpLabel: "Seleccione el tipo de nivel presupuesto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeParameters({ activos: 1 });
                global.dispatchAsync("load::SCCOTIPOSNIVELES", "base/scco/TipoNivelesPresupuesto/all/" + encodedFilters);
            };
        };
        render(): JSX.Element {
            let items: DataElement = global.assign(new DataElement(), this.props.items);
            //
            if (global.isSuccessful(items)) {
                let data: any[] = global.getData(items, []);
                //
                if (this.props.filter) {
                    let d = this.props.filter(data);
                    if (d) {
                        items.data = d;
                    };
                };
            };
            //
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />
        };
    });
    //
    export const SCCOTiposPresupuestoDDL: any = global.connect(class extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOTIPOSPRESUPUESTO
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "TipoPresupuesto",
            items: createDefaultStoreObject([]),
            label: "Tipo Presupuesto",
            helpLabel: "Seleccione el tipo de presupuesto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCCOTIPOSPRESUPUESTO", "catalogos/get(SCCOTIPOSPRESUPUESTO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    //
    export const SCCOEstatusPresupuestoDDL: any = global.connect(class extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOESTATUSPRESUPUESTO
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "EstatusPresupuesto",
            items: createDefaultStoreObject([]),
            label: "Estatus Presupuesto",
            helpLabel: "Seleccione el estatus de presupuesto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCCOESTATUSPRESUPUESTO", "catalogos/get(SCCOESTATUSPRESUPUESTO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    //
    export const SCCOTabuladoresDDL: any = global.connect(class extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOTABULADORES
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "Tabulador",
            items: createDefaultStoreObject([]),
            label: "Tabulador",
            helpLabel: "Seleccione el tabulador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $(["<span style='font-size: 90%'>", item.Nombre ? item.Nombre : "", "</span>"].join(""));
                };

                return $([
                    "<span class='badge badge-info'>", item.Clave, "</span> ",
                    "<span style='font-size: 90%'>", item.Nombre, "</span> ",
                    "<span class='badge badge-warning'>", !(item.Moneda) ? "" : item.Moneda.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return $(item.text);
                } else if (item.id == -1) {
                    return $(["<span style='font-size: 90%'>", item.Nombre ? item.Nombre : "", "</span>"].join(""));
                };

                return $([
                    "<span class='badge badge-info'>", item.Clave, "</span> ",
                    "<span style='font-size: 90%'>", item.Nombre, "</span> ",
                    "<span class='badge badge-warning'>", !(item.Moneda) ? "" : item.Moneda.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeParameters({ activos: 1 });
                global.dispatchAsync("load::SCCOTABULADORES", "base/scco/TabuladoresInsumos/all/" + encodedFilters);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    //
    interface ISCCONivelesPresupuestoDDLProps extends ddl.IDropDrownListProps {
        externUpdate?: boolean;
    };

    export const SCCONivelesPresupuestoDDL: any = global.connect(class extends React.Component<ISCCONivelesPresupuestoDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.niveles$presupuesto
        });
        static defaultProps: ISCCONivelesPresupuestoDDLProps = {
            id: "NivelPresupuesto",
            items: createDefaultStoreObject([]),
            label: "Nivel Presupuesto",
            helpLabel: "Seleccione un nivel de presupuesto",
            value: createDefaultStoreObject({}),
            externUpdate: false,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (this.props.externUpdate !== true) {
                if (!global.isLoadingOrSuccessful(this.props.items)) {
                    let url: string = global.encodeAllURL("scco", "NivelesPresupuesto", { activos: 1 });
                    global.dispatchAsync("load::niveles$presupuesto", url);
                };
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        };
    });
    //
    export const SCCOTiposAvanceDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOTIPOAVANCE
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoAvance",
            items: createDefaultStoreObject([]),
            label: "Tipo de Avance",
            helpLabel: "Seleccione el tipo de avance",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: $ItemFormatter,
            selectionFormatter: $SelectionFormatter
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::SCCOTIPOAVANCE", "catalogos/get(SCCOTIPOAVANCE)");
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    //

    export const SCCOAnticiposDeduccionesDDL: any = global.connect(class extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SCCOAnticiposDeducciones
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "AnticiposDeducciones",
            label: "Anticipos/Deducciones",
            helpLabel: "Seleccione un Registro",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                };

                return $([
                    "<span class='badge' style='background-color:", item.TipoConcepto.BGColor, "'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };

                return $([
                    "<span style='margin-right: 15px;color: ", item.TipoConcepto.BGColor, "'class='", item.TipoConcepto.Icono, "'></span>",
                    "<span class='badge' style='background-color:", item.TipoConcepto.BGColor, "'>", item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeParameters({ activos: 1 });
                global.dispatchAsync("load::SCCOAnticiposDeducciones", "base/scco/AnticiposDeducciones/all/" + encodedFilters);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });
    //
    export let EstatusDeUbicacionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.EstatusDeUbicacionDDL
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusDeUbicacion",
            items: createDefaultStoreObject([]),
            label: "Estatus de Ubicación",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {

                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::EstatusDeUbicacionDDL", "base/scv/ubicacionEstatus/Get/GetAll/" + encodedFilters);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    class SGPUsuariosAgrupados$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            //      items: state.global.SGPUsuariosAgrupados
        });

        static defaultProps: IDropDrownListProps = {
            id: "SGPUsuariosAgrupados",
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre"],
            itemFormatter: (item, container): any => {
                if (!item.ID) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave,
                            "</span>",
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Nombre,
                            "</span> "
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    let iniciales: any;
                    iniciales = item.Nombre.substr(0, 1) + item.Apellidos.substr(0, 1);
                    let itemfoto = item.Foto === "" ? $(["<div class='img-circle-fixed' style='margin-left:20px; vertical-align:middle; max-width:55px; max-height:55px; width:45px; height:45px; background:#1e7145; color:white; text-align:center; justify-content:center; align-items:center ; display:inline-block' >",
                        "<p style='padding-top:13px; margin:0px'>", iniciales, "</p>", "</div>"].join(""))
                        : $(["<img alt='' class='img-circle-fixed' src='", item.Foto, "' style='margin-left:20px; vertical-align:middle; max-width:55px; max-height:55px; width:45px; height:45px; background:#1e7145; color:white; text-align:center; justify-content:center; align-items:center ' />"].join(""))

                    return $(["<Row style='float:none; margin:2px;'>",
                        itemfoto[0].outerHTML,
                        "<span class='bold' style='font-size: 90%;'>",
                        " ", item.Nombre, " ", item.Apellidos,
                        "</span> ",
                        "</Row>"].join(""));
                };
            },
            selectionFormatter: (item): any => {

                let id: number = parseInt(item.ID);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return item.Clave;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Nombre, " ", item.Apellidos,
                        "</span>"].join(""));
                }
            },
            processData: (data): any => {

                let items: any[] = data;
                let options: any = {};
                let tp: any = 0;
                for (var i = 0; i < items.length; i++) {
                    tp = items[i].Grupo;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            },
            size: [12, 12, 12, 12]
        };

        //componentDidMount(): void {
        //    if (!isLoadingOrSuccessful(this.props.items)) {
        //        dispatchAsync("load::SGPUsuariosAgrupados", "base/kontrol/GruposUsuario/Get/GetUsersGroupDetails/" + global.encodeObject({ activos: 1, operacion:"usuariosgrupo"}));
        //    };
        //};

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const SGPUsuariosAgrupadosDDL: any = ReactRedux.connect(SGPUsuariosAgrupados$DDL.props, null)(SGPUsuariosAgrupados$DDL);

    class SGPUsuariosAgrupadosProyecto$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SGPUsuariosAgrupados
        });

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::SGPUsuariosAgrupados", "base/kontrol/GruposUsuario/Get/GetUsersGroupDetails/" + global.encodeObject({ activos: 1, operacion: "usuariosgrupo" }));
            };
        };

        render(): any {
            return <SGPUsuariosAgrupadosDDL {...this.props} />;
        };
    };

    export const SGPUsuariosAgrupadosProyectoDDL: any = ReactRedux.connect(SGPUsuariosAgrupadosProyecto$DDL.props, null)(SGPUsuariosAgrupadosProyecto$DDL);

    export interface ISGPUsuariosAgrupadosTareas$DDL extends IDropDrownListProps {
        IdWBS: number;
    }

    class SGPUsuariosAgrupadosTareas$DDL extends React.Component<ISGPUsuariosAgrupadosTareas$DDL, {}> {
        static props: any = (state: any) => ({
            items: state.global.SGPUsuariosAgrupadosTarea
        });

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let parametros: any = global.encodeObject({ IdWBS: this.props.IdWBS })
                dispatchAsync("load::SGPUsuariosAgrupadosTarea", "base/scv/Proyectos/Get/GetColaboradores/" + parametros);
            };
        };

        static defaultProps: IDropDrownListProps = {
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = 0;
                for (var i = 0; i < items.length; i++) {
                    tp = items[i].Grupo;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].ID = items[i].Usuario.ID;
                        items[i].Usuario.id = items[i].Usuario.ID;
                        items[i].Usuario.Grupo = items[i].Grupo;
                        options[tp.ID].children.push(items[i].Usuario);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            }
        };

        render(): any {
            return <SGPUsuariosAgrupadosDDL {...this.props} />;
        };
    };

    export const SGPUsuariosAgrupadosTareasDDL: any = ReactRedux.connect(SGPUsuariosAgrupadosTareas$DDL.props, null)(SGPUsuariosAgrupadosTareas$DDL);


    class SGPTipoProyecto$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.SGPTipoProyecto
        });

        static defaultProps: IDropDrownListProps = {
            id: "SGPTipoProyecto",
            items: createDefaultStoreObject([]),
            label: "Tipo",
            helpLabel: "Seleccione un Tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            let url: string = global.encodeAllURL("sgp", "TipoProyectoSGP", { activos: 1 });
            dispatchAsync("load::SGPTipoProyecto", url);
        };

        render(): any {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const SGPTipoProyectoDDL: any = ReactRedux.connect(SGPTipoProyecto$DDL.props, null)(SGPTipoProyecto$DDL);

    class PaisOrigen$DDL extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PAISORIGEN
        });

        static defaultProps: IDropDrownListProps = {
            id: "PaisOrigen",
            items: createDefaultStoreObject([]),
            label: "País de Origen",
            helpLabel: "Seleccione su país de origen",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre ? item.Nombre : "",
                        "</span>"].join(""));
                } else {
                    return $([
                        "<span class='badge' style='background-color:#659be0'>", item.Clave, "</span> ",
                        "<span> ", item.Nombre, "</span>"
                    ].join(""));
                }
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsync("load::PAISORIGEN", "catalogos/get(PAISORIGEN)");
            };
        };
        render(): JSX.Element {
            return <DropdownList$Form {...this.props} />;
        };
    };

    export const PaisOrigenDLL: any = ReactRedux.connect(PaisOrigen$DDL.props, null)(PaisOrigen$DDL);

    //
    export interface IBaseDDLProps extends ddl.IDropDrownListProps, global.props, global.IDefaultComponentProps {
    };
    export const BaseDDL: any = global.connect(class extends React.Component<IBaseDDLProps, IBaseDDLProps> {
        constructor(props: IBaseDDLProps) {
            super(props);

            let nState: IBaseDDLProps = {};
            //
            if (props.$defProps) {
                let mapPropNames: any = {
                    "propForm": "id"
                };
                //
                for (var p in props.$defProps) {
                    let propName: string = mapPropNames[p];
                    if (propName) {
                        nState[propName] =
                            global.isNull(props[p])
                                ? props.$defProps[p]
                                : props[p];
                    };
                    nState[p] =
                        global.isNull(props[p])
                            ? props.$defProps[p]
                            : props[p];
                };
            };
            //
            this.state = nState;
        };
        static defaultProps: IBaseDDLProps = {
            items: createDefaultStoreObject([]),
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        //
        shouldComponentUpdate(nextProps: IBaseDDLProps) {
            return global.hasChanged(this.props.items, nextProps.items);
        };
        //
        componentWillMount() {

        };

        componentDidMount(): void {
            // this.props.items -> esta propiedad la proporciona el estado
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                let actionName: string = !this.state.ddlTargetAction ? "load::ddlBase" + this.state.propForm : this.state.ddlTargetAction;
                let targetURL: string = this.state.ddlCG ? "catalogos/get(" + this.state.ddlCG + ")" : this.state.ddlTargetUrl;
                //
                if (!this.state.ddlTargetAction) {
                    actionName = "load::ddlBase" + this.state.propForm;
                }
                else {
                    actionName = this.state.ddlTargetAction;
                    targetURL = this.state.ddlTargetUrl;
                };
                //
                dispatchAsync(actionName, targetURL);
            };
        };

        render(): any {
            return <ddl.DropdownList$Form {...this.props} {...this.state} />;
        };
    });
    export let base: any = {};

    //agregar elemento manualmente al ddl
    export const assignElement: (items: any, e: any) => any = (items: any, e: any): any => {
        let retValue: any = items;

        if (isSuccessful(retValue)) {
            let foundItem: boolean = false;

            for (var i = 0; i < retValue.data.length; i++) {
                if (String(retValue.data[i].ID) === String(e.ID)) {
                    foundItem = true;
                    break;
                };
            };

            if (foundItem === false) {
                let item: any = global.assign(e, { ID: e.ID, Clave: e.Clave, Nombre: e.Nombre });
                if (retValue.data.length > 0) {
                    retValue.data.unshift(item);
                };
            };
        };

        return retValue;
    };

    //validar solo los elementos correctos
    export const ddlValidate: (v: any, values?: any[]) => any = (v: any, values?: any[]): any => {
        return (v && v.ID > 0);
    };
    interface ISPVClasificadorViviendaPendienteEntregaProps extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class SPVClasificadorViviendaPendiente$DDL extends React.Component<ISPVClasificadorViviendaPendienteEntregaProps, IDropDrownListState> {
        constructor(props: ISPVClasificadorViviendaPendienteEntregaProps) {
            super(props);
            this.onchangeElementoClasificador = this.onchangeElementoClasificador.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.SPVCLASIFICADORVIVIENDAPENDIENTEENTREGA
        });
        static defaultProps: ISPVClasificadorViviendaPendienteEntregaProps = {
            id: "ClasificadorVivienda",
            label: "Clasificación",
            helpLabel: "Seleccione el clasificador",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            global.dispatchAsync("load::SPVCLASIFICADORVIVIENDAPENDIENTEENTREGA", "catalogos/get(CLASIFICADORVIVIENDAPEN)");
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::Clasificador_Seleccionado", null);
            dispatchDefault("load::SPVCLASIFICADORVIVIENDAPENDIENTEENTREGA", null);
        };
        onchangeElementoClasificador(item: any): any {
            let items: Element;
            items = item;
            dispatchSuccessful("load::Clasificador_Seleccionado", items);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} change={this.onchangeElementoClasificador} />;
        };
    };

    export const SPVClasificadorViviendaPendienteEntregaDDL: any =
        ReactRedux.connect(SPVClasificadorViviendaPendiente$DDL.props, null)(SPVClasificadorViviendaPendiente$DDL);


    class TipoReporte$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global["TipoReporte"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "TipoReporte",
            items: createDefaultStoreObject([]),
            label: "Tipo de reporte",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success'> ", item.Clave, " </span>",
                        "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success'> ", item.Clave, " </span>",
                    "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                ].join(""));
            }
        };

        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "RP", Nombre: "Reporte por plaza" });
                items.push({ ID: 2, Clave: "RV", Nombre: "Reporte por vivienda" });
                global.dispatchSuccessful("load::TipoReporte", items);
            };


        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    export const TipoReporteDDL: any = ReactRedux.connect(TipoReporte$DDL.props, null)(TipoReporte$DDL);

    interface IFracc extends ddl.IDropDrownListProps {
        selectAll?: boolean;
        plaza?: DataElement;
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class FRACCIONAMIENTO$DDL extends React.Component<IFracc, IDropDrownListState> {
        constructor(props: IFracc) {
            super(props);
            this.onchangeElementoFracc = this.onchangeElementoFracc.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.FRACCIONAMIENTO
        });
        static defaultProps: IFracc = {
            id: "Fraccionamiento",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione el tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -1 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -1 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -1 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -1 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            },
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                global.dispatchAsyncPost("load::FRACCIONAMIENTO", "base/kontrol/fraccionamientos/all/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchDefault("load::FRACCIONAMIENTO_Seleccionado", null);
            dispatchDefault("load::FRACCIONAMIENTO", null);
            Forms.updateFormElement(idForm, this.props.id, null)
        };
        onchangeElementoFracc(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", itemFinal);
        };
        shouldComponentUpdate(nextProps: IFracc, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IFracc, nextState: IFracc): void {
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }

                };
            }
            let page: any = EK.Store.getState().global.page.data.id;
            if (page === "EventosActividades" || page === 'ConsultaEventosActAlta' || page === "ConsultaEventosActCaptura") {
                let data = itemsModificados.data.filter(x => x.ID === 99999);
                if (data.length === 0) {
                    itemsModificados.data.push({ ID: 99999, Clave: 'NI', Nombre: "Ninguno" });
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFracc} />;
        };
    };
    export const FRACCIONAMIENTODLL: any = ReactRedux.connect(FRACCIONAMIENTO$DDL.props, null)(FRACCIONAMIENTO$DDL);


    export class FRACCIONAMIENTOV2$DDL extends React.Component<IFracc, IDropDrownListState> {
        constructor(props: IFracc) {
            super(props);
            this.onchangeElementoFracc = this.onchangeElementoFracc.bind(this);
        };
        //static props: any = (state: any) => ({
        //    //items: state.global.FRACCIONAMIENTO,
        //    //plaza: Forms.getDataValue("PlazaInicial", config.id, state);
        //    var retValue: any = page.props(state);
        //    retValue.items = state.global["tags$fraccionamientos$filteredLists"];
        //    retValue.plaza = Forms.getDataValue("PlazaInicial", retValue.config.id, state);
        //    retValue.itemsSeleccionados = state.global.ItemSeleccionadoDLLFracc;
        //    retValue.itemsTotalList = state.global.ItemsTotalList;
        //    return retValue;
        //});
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.FRACCIONAMIENTO;
            retValue.plaza = Forms.getDataValue("PlazaInicial", retValue.config.id, state);
            return retValue;
        };
        static defaultProps: IFracc = {
            id: "Fraccionamiento",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione el tipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            //addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -1 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -1 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -1 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -1 ? "" : item.Nombre, " </span> "
                        //"<span class='' style='font-size: 90%'> ",
                        //item.text,
                        //"</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.Clave !== null && item.Clave !== undefined ? item.Clave : 'ND',
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.Clave !== null && item.Clave !== undefined ? item.Nombre : '',
                    "</span> "
                ].join(""));
            },
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                //console.log(idForm)
                //console.log(this.props.plaza)
                //global.dispatchAsyncPost("load::FRACCIONAMIENTO", "base/kontrol/fraccionamientos/all/", { parametros: null });
                //global.dispatchAsyncPost("load::FRACCIONAMIENTO", "base/kontrol/fraccionamientos/GetBP/getFraccionamientosProyecto", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            dispatchDefault("load::FRACCIONAMIENTO_Seleccionado", null);
            dispatchDefault("load::FRACCIONAMIENTO", null);
            Forms.updateFormElement(idForm, this.props.id, null)
        };
        onchangeElementoFracc(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", itemFinal);
        };
        shouldComponentUpdate(nextProps: IFracc, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) || 
                hasChanged(this.props.plaza, nextProps.plaza)
        };
        componentWillReceiveProps(nextProps: IFracc, nextState: IFracc): void {
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    //console.log(idTipoFalla)
                    //if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                    let item: any;
                    let items: any = nextProps.items;
                    if (global.hasChanged(this.props.items, items)) {
                        //console.log(items)
                          for (var i = 0; i < items.data.length; i++) {
                        //    // console.log(items.data[i]);
                            if (String(items.data[i].ID) !== null && String(items.data[i].ID) !== undefined) {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", item);
                                break;
                            }
                        }
                    }
                   
                        //for (var i = 0; i < items.data.length; i++) {
                        //    // console.log(items.data[i]);
                        //    if (String(items.data[i].ID) !== null && String(items.data[i].ID) !== undefined) {
                        //        item = items.data[i];
                        //        Forms.updateFormElement(idForm, this.props.id, item)
                        //        dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", item);
                        //        break;
                        //    }
                        //}
                   // }
                }
            }
            if (global.isSuccessful(nextProps.plaza)) {
                console.log('sd')
                //if (nextProps.plaza.data.ID) {
                //    //console.log(Object.keys(nextProps.plaza.data).length)
                //    if (hasChanged(this.props.plaza, nextProps.plaza) && this.props.plaza !== undefined) {
                //        if (nextProps.plaza.data.ID && (hasChanged(this.props.plaza.data.ID, nextProps.plaza.data.ID))) {
                //            //console.log(nextProps.plaza.data);
                //            //console.log(this.props.plaza.data);
                //            //console.log('Buscar en plaza');
                //            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                //            let plaza = nextProps.plaza.data;
                //            Forms.updateFormElement(idForm, this.props.id,null)
                //            global.dispatchAsyncPost("load::FRACCIONAMIENTO", "base/kontrol/fraccionamientos/GetBP/getFraccionamientosProyecto", { parametros: { IdPlaza: plaza.Clave } });
                //        }
                       
                //        //
                //    }
                //}

                if (this.isSingleDataObjectReady(nextProps.plaza)) {
                    if (!this.isSingleDataObjectReady(this.props.plaza) || this.hasObjectChanged(this.props.plaza, nextProps.plaza)) {
                        console.log('cambiar lista de fraccionamientos')
                        let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                        let plaza = nextProps.plaza.data;
                        Forms.updateFormElement(idForm, this.props.id,null)
                        global.dispatchAsyncPost("load::FRACCIONAMIENTO", "base/kontrol/fraccionamientos/GetBP/getFraccionamientosProyecto", { parametros: { IdPlaza: plaza.Clave } });
                    }
                   
                }
            }
        };

    

        isSingleDataObjectReady(item) {
            if (item && item.data && item.data !== undefined && item.data !== null && item.data.ID && item.data.ID !== undefined && item.data.ID !== null) {
                return true;
            } else {
                return false;
            }
        }

        hasObjectChanged(item1: any, item2: any) {
            //if (item1 === undefined || item2 === undefined) {
            //    return true;
            //}
            //if (item1 !== undefined && item2 !== undefined) {
            //    if (item1.data !== undefined && item2.data !== undefined && item1.data !== null && item2.data !== null) {
            //        if (item1.data.ID && item2.data.ID) {
                        if (item1.data.ID === item2.data.ID) {
                            return false;
                        } else {
                            return true;
                        }
            //        } else {
            //            return true;
            //        }
            //    } else {
            //        return true;
            //    }
            //}
            //else {
            //    return true;
            //}
        }

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }

                };
            }
            let page: any = EK.Store.getState().global.page.data.id;
            if (page === "EventosActividades" || page === 'ConsultaEventosActAlta' || page === "ConsultaEventosActCaptura") {
                let data = itemsModificados.data.filter(x => x.ID === 99999);
                if (data.length === 0) {
                    itemsModificados.data.push({ ID: 99999, Clave: 'NI', Nombre: "Ninguno" });
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFracc} />;
        };
    };

    export const FRACCIONAMIENTODLLV2: any = ReactRedux.connect(FRACCIONAMIENTOV2$DDL.props, null)(FRACCIONAMIENTOV2$DDL);


    interface IOrganizadores extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class Organizadores$DDL extends React.Component<IOrganizadores, IDropDrownListState> {
        constructor(props: IOrganizadores) {
            super(props);
            this.onchangeElementoClasificador = this.onchangeElementoClasificador.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.SDCORGANIZADORESEVENTO
        });
        static defaultProps: IOrganizadores = {
            id: "ClasificadorVivienda",
            label: "Clasificación",
            helpLabel: "Seleccione el clasificador",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            global.dispatchAsync("load::SDCORGANIZADORESEVENTO", "catalogos/get(SDCORGANIZADORESEVENTO)");
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::SDCORGANIZADORESEVENTO_Seleccionado", null);
            dispatchDefault("load::SDCORGANIZADORESEVENTO", null);
        };
        onchangeElementoClasificador(item: any): any {
            let items: Element;
            items = item;
            dispatchSuccessful("load::SDCORGANIZADORESEVENTO_Seleccionado", items);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} change={this.onchangeElementoClasificador} />;
        };
    };

    export const OrganizadorEvento: any =
        ReactRedux.connect(Organizadores$DDL.props, null)(Organizadores$DDL);

    interface IEventosDDLProps extends EK.UX.DropDownLists.IDropDrownListProps {
        SaveEvent?: any;
    };

    export const EventosFilterDDL: any = global.connect(class extends React.Component<IEventosDDLProps, IEventosDDLProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.EventosSelect;
            retValue.SaveEvent = state.global.SaveEvent;
            return retValue;
        };
        static defaultProps: IEventosDDLProps = {
            id: "EventosSelect",
            items: createDefaultStoreObject([]),
            label: "Eventos/Actividades",
            helpLabel: "Seleccione un Tipo de Vocación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            matchers: ["Nombre"],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!global.isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::EventosSelect", "base/kontrol/EventosActividades/GetBP/EventosSelect/", { parametros: {} });
            };
        };
        componentWillReceiveProps(nextProps: IEventosDDLProps, { }): void {
            if (global.isSuccessful(nextProps.items)) {
                let existeItemTodos: boolean = false;
                //console.log('asdas')
                for (var i = 0; i < nextProps.items.data.length; i++) {
                    if (String(nextProps.items.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    }
                };

                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem["ID"] = -2;
                    nuevoItem["Clave"] = "-2";
                    nuevoItem["Nombre"] = "TODOS";

                    if (nextProps.items.data.length > 0) {
                        // nextProps.items.data.unshift(nuevoItem);
                    };
                };

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    //console.log('sdd')
                    let idObject: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idObject === undefined || idObject === null || idObject.ID === null || idObject.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        //console.log(items);
                        if (items.data.length > 0) {
                            item = items.data[0];
                            //console.log(item);
                            Forms.updateFormElement(idForm, this.props.id, item);
                        }
                    }
                };
                if (hasChanged(this.props.SaveEvent, nextProps.SaveEvent) && global.isSuccessful(nextProps.SaveEvent)) {
                    if (isSuccessful(nextProps.SaveEvent)) {
                        global.dispatchAsyncPost("load::EventosSelect", "base/kontrol/EventosActividades/GetBP/EventosSelect/", { parametros: {} });
                    };
                };
                //console.log(val);
            };
        };
        shouldComponentUpdate(nextProps: IEventosDDLProps, { }): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        };
    });

    interface IPatrocinadores extends ddl.IDropDrownListProps {
        selectAll?: boolean,
        savePatrocinadores?: any
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;

    }

    export class Patrocinadores$DDL extends React.Component<IPatrocinadores, IDropDrownListState> {
        constructor(props: IPatrocinadores) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.PATROCINADORES;
            retValue.savePatrocinadores = state.global.savePatrocinadores;
            return retValue;
        };
        static defaultProps: IPatrocinadores = {
            id: "Patrocinadores",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre"],
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success'> ", item.Clave, " </span>",
                        "<span class='' style='font-size: 90%'> ", item.Nombre, " </span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success'> ", item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.Nombre, " </span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::PATROCINADORES", "base/kontrol/EventosActividades/GetBP/GetPatrocinadores/", { parametros: {} });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::PATROCINADORES_Seleccionada", null);
            dispatchDefault("load::PATROCINADORES", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::PATROCINADORES_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IPatrocinadores, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IPatrocinadores, nextState: IPatrocinadores): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::PATROCINADORES_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
            if (hasChanged(this.props.savePatrocinadores, nextProps.savePatrocinadores) && global.isSuccessful(nextProps.savePatrocinadores)) {
                if (isSuccessful(nextProps.savePatrocinadores)) {

                    global.dispatchAsyncPost("load::PATROCINADORES", "base/kontrol/EventosActividades/GetBP/GetPatrocinadores/", { parametros: {} });
                };
            };
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const Patrocinadores: any = ReactRedux.connect(Patrocinadores$DDL.props, null)(Patrocinadores$DDL);
    interface IMediosDifusion extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class MediosDifusion$DDL extends React.Component<IMediosDifusion, IDropDrownListState> {
        constructor(props: IMediosDifusion) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.MediosDifusion
        });
        static defaultProps: IMediosDifusion = {
            id: "MediosDifusion",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::MediosDifusion", "base/kontrol/EventosActividades/GetBP/GetMediosDifusion/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::MediosDifusion_Seleccionada", null);
            dispatchDefault("load::MediosDifusion", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::MediosDifusion_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IMediosDifusion, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IMediosDifusion, nextState: IMediosDifusion): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::MediosDifusion_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const MediosDifusion: any = ReactRedux.connect(MediosDifusion$DDL.props, null)(MediosDifusion$DDL);


    interface IPosiblesAlianzas extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class PosiblesAlianzas$DDL extends React.Component<IPosiblesAlianzas, IDropDrownListState> {
        constructor(props: IPosiblesAlianzas) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.PosiblesAlianzas
        });
        static defaultProps: IPosiblesAlianzas = {
            id: "PosiblesAlianzas",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre"],
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                //global.dispatchAsyncPost("load::MediosDifusion", "base/kontrol/EventosActividades/GetBP/GetMediosDifusion/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::PosiblesAlianzas_Seleccionada", null);
            dispatchDefault("load::PosiblesAlianzas", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::PosiblesAlianzas_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IPosiblesAlianzas, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IPosiblesAlianzas, nextState: IPosiblesAlianzas): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::PosiblesAlianzas_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const PosiblesAlianzas: any = ReactRedux.connect(PosiblesAlianzas$DDL.props, null)(PosiblesAlianzas$DDL);

    interface IBuscadorEvento extends ddl.IDropDrownListProps {
        selectAll?: boolean,
        plaza?: any
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class BuscadorEventoDDL extends React.Component<IBuscadorEvento, IDropDrownListState> {
        constructor(props: IBuscadorEvento) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.BuscadorEvento,
            plaza: state.global.Plaza_Seleccionada2
        });
        static defaultProps: IBuscadorEvento = {
            id: "BuscadorEvento",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre"],
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, "BuscadorEvento", { ID: -1, Clave: "Seleccione una opción" });

        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::BuscadorEvento_Seleccionada", null);
            dispatchDefault("load::BuscadorEvento", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::BuscadorEvento_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IBuscadorEvento, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.plaza, nextProps.plaza)
        };

        componentWillReceiveProps(nextProps: IBuscadorEvento, nextState: IBuscadorEvento): void {
            // console.log('asdasd');
            if (global.hasChanged(this.props.plaza, nextProps.plaza)) {
                //console.log(nextProps)
                if (global.isSuccessful(nextProps.plaza)) {
                    let plaza = global.getData(nextProps.plaza)
                    let p: any = global.assign({
                        IDPLAZA: plaza.ID
                    })
                    global.dispatchAsyncPost("load::BuscadorEvento", "base/scv/EventosActividades/GetBP/Search/", { parametros: p });
                }
            }
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::BuscadorEvento_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const BuscadorEvento: any = ReactRedux.connect(BuscadorEventoDDL.props, null)(BuscadorEventoDDL);

    interface ISegmentosCCE extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class SegmentosCCE$DDL extends React.Component<ISegmentosCCE, IDropDrownListState> {
        constructor(props: ISegmentosCCE) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.SEGMENTOS
        });
        static defaultProps: ISegmentosCCE = {
            id: "Segmentos",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::SEGMENTOS", "base/kontrol/CatalogosSpv/GetBP/GetSegmentos/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::SEGMENTOS_Seleccionada", null);
            dispatchDefault("load::SEGMENTOS", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::SEGMENTOS_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: ISegmentosCCE, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: ISegmentosCCE, nextState: ISegmentosCCE): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::SEGMENTOS_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const Segmentos: any = ReactRedux.connect(SegmentosCCE$DDL.props, null)(SegmentosCCE$DDL);

    interface IAreaGeografica extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class AreaGeografica$DDL extends React.Component<IAreaGeografica, IDropDrownListState> {
        constructor(props: IAreaGeografica) {
            super(props);
            this.onchangeAreaGeografica = this.onchangeAreaGeografica.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.AreaGeografica
        });
        static defaultProps: IAreaGeografica = {
            id: "AreaGeografica",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let parametros = global.assign({
                    OPERACION: "GETAREAGEOGRAFICA"
                })
                global.dispatchAsyncPost("load::AreaGeografica", "base/kontrol/Comites/GetBP/GetAreaGeografica/", { parametros: parametros });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::AreaGeografica_Seleccionada", null);
            dispatchDefault("load::AreaGeografica", null);
        };
        onchangeAreaGeografica(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::AreaGeografica_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IAreaGeografica, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IAreaGeografica, nextState: IAreaGeografica): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::AreaGeografica_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeAreaGeografica} />;
        };
    };
    export const AreaGeografica: any = ReactRedux.connect(AreaGeografica$DDL.props, null)(AreaGeografica$DDL);

    interface IComites extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class Comites$DDL extends React.Component<IComites, IDropDrownListState> {
        constructor(props: IComites) {
            super(props);
            this.onchangeComite = this.onchangeComite.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.COMITES
        });
        static defaultProps: IComites = {
            id: "Comites",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre"],
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let parametros = global.assign({
                })
                global.dispatchAsyncPost("load::COMITES", "base/kontrol/Comites/GetBP/SelectComites/", { parametros: parametros });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::COMITES_Seleccionada", null);
            dispatchDefault("load::COMITES", null);
        };
        onchangeComite(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::COMITES_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IComites, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IComites, nextState: IComites): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::COMITES_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeComite} />;
        };
    };
    export const Comites: any = ReactRedux.connect(Comites$DDL.props, null)(Comites$DDL);

    interface ITipoReunion extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class TipoReunion$DDL extends React.Component<ITipoReunion, IDropDrownListState> {
        constructor(props: ITipoReunion) {
            super(props);
            this.onchangeTipoReunion = this.onchangeTipoReunion.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.TIPOREUNION
        });
        static defaultProps: ITipoReunion = {
            id: "TipoReunion",
            label: "Tipo Reunion",
            helpLabel: "Seleccione el clasificador",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            global.dispatchAsync("load::TIPOREUNION", "catalogos/get(SDCTIPOREUNION)");
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::TIPOREUNION_Seleccionado", null);
            dispatchDefault("load::TIPOREUNION", null);
        };
        onchangeTipoReunion(item: any): any {
            let items: Element;
            items = item;
            dispatchSuccessful("load::TIPOREUNION_Seleccionado", items);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} change={this.onchangeTipoReunion} />;
        };
    };

    export const TipoReunion: any =
        ReactRedux.connect(TipoReunion$DDL.props, null)(TipoReunion$DDL);

    interface IPuestosAsociacionCivil extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class PuestosAsociacionCivil$DDL extends React.Component<IPuestosAsociacionCivil, IDropDrownListState> {
        constructor(props: IPuestosAsociacionCivil) {
            super(props);
            this.onchangePuestosAsociacion = this.onchangePuestosAsociacion.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.PUESTOSASOCIACIONCIVIL
        });
        static defaultProps: IPuestosAsociacionCivil = {
            id: "PuestosAsociacionCivil",
            label: "Puesto",
            helpLabel: "Seleccione el clasificador",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            global.dispatchAsync("load::PUESTOSASOCIACIONCIVIL", "catalogos/get(SDCASOCIACIONPUESTOS)");
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::PUESTOSASOCIACIONCIVIL_Seleccionado", null);
            dispatchDefault("load::PUESTOSASOCIACIONCIVIL", null);
        };
        onchangePuestosAsociacion(item: any): any {
            let items: Element;
            items = item;
            dispatchSuccessful("load::PUESTOSASOCIACIONCIVIL_Seleccionado", items);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} change={this.onchangePuestosAsociacion} />;
        };
    };

    export const PuestosAsociacionCivil: any =
        ReactRedux.connect(PuestosAsociacionCivil$DDL.props, null)(PuestosAsociacionCivil$DDL);
    interface ITipoEncuesta extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class TipoEncuesta$DDL extends React.Component<ITipoEncuesta, IDropDrownListState> {
        constructor(props: ITipoEncuesta) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.TIPOENCUESTA
        });
        static defaultProps: ITipoEncuesta = {
            id: "TipoEncuesta",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::TIPOENCUESTA", "base/kontrol/EncuestaPoblacional/GetBP/GetTipoEncuesta/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::TIPOENCUESTA_Seleccionada", null);
            dispatchDefault("load::TIPOENCUESTA", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::TIPOENCUESTA_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: ITipoEncuesta, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: ITipoEncuesta, nextState: ITipoEncuesta): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::TIPOENCUESTA_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const TipoEncuesta: any = ReactRedux.connect(TipoEncuesta$DDL.props, null)(TipoEncuesta$DDL);


    interface ITipoClasificacion extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class TipoClasificacion$DDL extends React.Component<ITipoClasificacion, IDropDrownListState> {
        constructor(props: ITipoClasificacion) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.TIPOCLASIFICACION
        });
        static defaultProps: ITipoClasificacion = {
            id: "TipoClasificacion",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                global.dispatchAsyncPost("load::TIPOCLASIFICACION", "base/kontrol/EncuestaPoblacional/GetBP/GetTipoClasificacion/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::TIPOCLASIFICACION_Seleccionada", null);
            dispatchDefault("load::TIPOCLASIFICACION", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::TIPOCLASIFICACION_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: ITipoClasificacion, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: ITipoClasificacion, nextState: ITipoClasificacion): void {
            // console.log('asdasd');
            if (global.isSuccessful(nextProps.items)) {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
                if (idForm != null && idForm != undefined) {
                    let idTipoFalla: any = Forms.getValue(this.props.id, idForm, this.props.forms);
                    if (idTipoFalla === undefined || idTipoFalla === null || idTipoFalla.ID === null || idTipoFalla.ID === undefined) {
                        let item: any;
                        let items: any = nextProps.items;
                        for (var i = 0; i < items.data.length; i++) {
                            // console.log(items.data[i]);
                            if (String(items.data[i].ID) > '0') {
                                item = items.data[i];
                                Forms.updateFormElement(idForm, this.props.id, item)
                                dispatchSuccessful("load::TIPOCLASIFICACION_Seleccionada", item);
                                break;
                            }
                        }
                    }
                }
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const TipoClasificacion: any = ReactRedux.connect(TipoClasificacion$DDL.props, null)(TipoClasificacion$DDL);

    interface ITipoEvidencias extends IDropDrownListProps {
        selectAll?: boolean;
    };

    class TipoEvidencias$DDL extends React.Component<ITipoEvidencias, IDropDrownListState> {
        constructor(props: ITipoEvidencias) {
            super(props);
            this.onchangeTipoEvidencias = this.onchangeTipoEvidencias.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.TIPOEVIDENCIAS
        });
        static defaultProps: ITipoEvidencias = {
            id: "TipoEvidencias",
            label: "Tipo Evidencias",
            helpLabel: "Seleccione el clasificador",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, "</span>",
                        "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $(["<span class='' style='font-size: 90%'> ", item.text, " </span>"].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ", item.ID == -2 ? item.Nombre : item.Clave, " </span>",
                    "<span class='' style='font-size: 90%'> ", item.ID == -2 ? "" : item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            global.dispatchAsync("load::TIPOEVIDENCIAS", "catalogos/get(SDCTIPOEVIDENCIASREC)");
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::TIPOEVIDENCIAS_Seleccionado", null);
            dispatchDefault("load::TIPOEVIDENCIAS", null);
        };
        onchangeTipoEvidencias(item: any): any {
            let items: Element;
            items = item;
            dispatchSuccessful("load::TIPOEVIDENCIAS_Seleccionado", items);
        };
        render(): JSX.Element {
            let items: DataElement = this.props.items;

            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let selectedAll: boolean = false;

                    for (var i = 0; i < items.data.length; i++) {
                        if (String(items.data[i].ID) === "-2") {
                            selectedAll = true;
                            break;
                        };
                    };

                    if (selectedAll === false) {
                        let item: any = global.assign({}, { ID: -2, Clave: "-2", Nombre: "TODOS" });
                        if (items.data.length > 0) {
                            items.data.unshift(item);
                        };
                    };
                };
            };

            return <DropdownList$Form {...this.props} items={items} change={this.onchangeTipoEvidencias} />;
        };
    };
    export const TipoEvidencias: any = ReactRedux.connect(TipoEvidencias$DDL.props, null)(TipoEvidencias$DDL);

    //interface IComiteFraccionamiento extends ddl.IDropDrownListProps {
    //    fraccionamiento?: any;
    //};
    //export let ComiteFraccionamientoDDL: any = global.connect(class extends React.Component<IComiteFraccionamiento, {}> {
    //    static props: any = (state: any) => ({
    //        items: state.global.ComiteFraccionamiento,
    //        fraccionamiento: state.global.FRACCIONAMIENTO_Seleccionado
    //    });
    //    static defaultProps: IComiteFraccionamiento = {
    //        id: "ComiteFraccionamiento",
    //        items: createDefaultStoreObject([]),
    //        label: "Comité",
    //        helpLabel: "Seleccione una opción",
    //        value: createDefaultStoreObject({}),
    //        initialValue: undefined,
    //        hasChanged: false,
    //        hasValidationError: false,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        size: [12, 12, 12, 12],
    //        required: false,
    //        itemFormatter: (item, container): any => {
    //            if (!item.id) {
    //                return item.text;
    //            }
    //            else {
    //                return $([
    //                    "<span class='badge badge-success '> ",
    //                    item.ID == -2 ? item.Nombre : item.Clave,
    //                    "</span>",
    //                    "<span class='' style='font-size: 90%'> ",
    //                    item.ID == -2 ? "" : item.Nombre,
    //                    "</span> "
    //                ].join(""));
    //            };
    //        },
    //        selectionFormatter: (item): any => {
    //            if (!item) return "";

    //            if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
    //                return $([
    //                    "<span class='' style='font-size: 90%'> ",
    //                    item.text,
    //                    "</span> "
    //                ].join(""));
    //            };

    //            return $([
    //                "<span class='badge badge-success '> ",
    //                item.ID == -2 ? item.Nombre : item.Clave,
    //                "</span>",
    //                "<span class='' style='font-size: 90%'> ",
    //                item.ID == -2 ? '' : item.Nombre,
    //                "</span> "
    //            ].join(""));
    //        },
    //    };
    //    //shouldComponentUpdate(nextProps: IComiteFraccionamiento, { }): boolean {
    //    //    return hasChanged(this.props.fraccionamiento, nextProps.fraccionamiento);
    //    //};
    //    componentWillReceiveProps(nextProps: IComiteFraccionamiento): void {
    //        if (global.getData(nextProps.fraccionamiento).ID > 0 && global.getData(this.props.fraccionamiento).ID !== global.getData(nextProps.fraccionamiento).ID) {
    //                let Fracc = global.getData(nextProps.fraccionamiento)
    //                let p: any = global.assign({
    //                    FRACCIONAMIENTO: Fracc.ID
    //                })
    //            global.dispatchAsyncPost("load::ComiteFraccionamiento", "base/kontrol/AsociacionCivil/GetBP/GetComiteByFraccionamiento/", { parametros: p });
    //        }
    //    };
    //    componentDidMount(): void {
    //        global.dispatchSuccessful("load::ComiteFraccionamiento", []);
    //    };
    //    componentWillUnmount(): void {
    //        global.dispatchSuccessful("load::ComiteFraccionamiento", []);
    //    };
    //    render(): JSX.Element {
    //        let itemsModificados: DataElement = this.props.items;
    //        //////
    //        if (global.isSuccessful(this.props.items)) {
    //            let existeItemTodos: boolean = false;
    //            for (var i = 0; i < itemsModificados.data.length; i++) {
    //                if (String(itemsModificados.data[i].ID) === "-2") {
    //                    existeItemTodos = true;
    //                    break;
    //                };
    //            };
    //            if (existeItemTodos === false) {
    //                let nuevoItem: any = {};
    //                nuevoItem['ID'] = -2;
    //                nuevoItem['Clave'] = '-2';
    //                nuevoItem['Nombre'] = 'TODOS';
    //            };
    //        };
    //        return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
    //    };
    //});

    interface IComiteFraccionamiento extends ddl.IDropDrownListProps {
        selectAll?: boolean,
        fraccionamiento?: any
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class ComiteFraccionamientoDDL extends React.Component<IComiteFraccionamiento, IDropDrownListState> {
        constructor(props: IComiteFraccionamiento) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ComiteFraccionamiento,
            fraccionamiento: state.global.FRACCIONAMIENTO_Seleccionado
        });
        static defaultProps: IComiteFraccionamiento = {
            id: "ComiteFraccionamiento",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione una opcion",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            matchers: ["Nombre"],
            size: [12, 12, 6, 6],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: "SO",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '>",
                        item.ID == -2 ? item.Nombre : "",
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? "" : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '>",
                    item.ID == -2 ? item.Nombre : "",
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? "" : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, "ComiteFraccionamiento", { ID: -1, Clave: "Seleccione una opción" });

        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::ComiteFraccionamiento_Seleccionado", null);
            dispatchDefault("load::ComiteFraccionamiento", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::ComiteFraccionamiento_Seleccionado", itemFinal);
        };
        shouldComponentUpdate(nextProps: IComiteFraccionamiento, { }): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.fraccionamiento, nextProps.fraccionamiento)
        };

        componentWillReceiveProps(nextProps: IComiteFraccionamiento, nextState: IComiteFraccionamiento): void {
            //if (isSuccessful(nextProps.fraccionamiento) && hasChanged(this.props.fraccionamiento, nextProps.fraccionamiento)) {
            //    if (global.getData(nextProps.fraccionamiento).ID > 0 && global.getData(this.props.fraccionamiento).ID !== global.getData(nextProps.fraccionamiento).ID) {
            //        console.log(nextProps.fraccionamiento);
            //        let Fracc = global.getData(nextProps.fraccionamiento)
            //        let p: any = global.assign({
            //            FRACCIONAMIENTO: Fracc.ID
            //        })
            //        global.dispatchAsyncPost("load::ComiteFraccionamiento", "base/kontrol/AsociacionCivil/GetBP/GetComiteByFraccionamiento/", { parametros: p });
            //        let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            //        Forms.updateFormElement(idForm, "ComiteFraccionamiento", { ID: -1, Clave: "Seleccione una opción" });
            //    }
            //}
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (this.props.selectAll === true) {
                if (isSuccessful(this.props.items)) {
                    let existeItemTodos: boolean = false;
                    for (var i = 0; i < itemsModificados.data.length; i++) {
                        if (String(itemsModificados.data[i].ID) === "-2") {
                            existeItemTodos = true;
                            break;
                        }
                    };
                    if (existeItemTodos === false) {
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = -2;
                        nuevoItem['Clave'] = '-2';
                        nuevoItem['Nombre'] = 'TODOS';
                        if (itemsModificados.data.length > 0) {
                            itemsModificados.data.unshift(nuevoItem);
                        }
                    }
                };
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} change={this.onchangeElementoFalla} />;
        };
    };
    export const ComiteFraccionamiento: any = ReactRedux.connect(ComiteFraccionamientoDDL.props, null)(ComiteFraccionamientoDDL);
};

import ddl = EK.UX.DropDownLists;

import Fraccionamientos = EK.UX.DropDownLists.FRACCIONAMIENTODLL;
import Fraccionamientosv2 = EK.UX.DropDownLists.FRACCIONAMIENTODLLV2;
import DropdownList = EK.UX.DropDownLists.DropdownList$Form;
import IDropDrownListProps = EK.UX.DropDownLists.IDropDrownListProps;
import AreasOrganizacionDDL = EK.UX.DropDownLists.AreasOrganizacionDDL;
import OpcionesTipoAvanceDDL = EK.UX.DropDownLists.OpcionesTipoAvanceDDL;
import OpcionesTipoImpuestoDDL = EK.UX.DropDownLists.OpcionesTipoImpuestoDDL;
import MotivosReanudacionDDL = EK.UX.DropDownLists.MotivosReanudacionDDL;
import InventariadoGrupoInsumoDDL = EK.UX.DropDownLists.InventariadoGrupoInsumoDDL;
import EstatusDDL = EK.UX.DropDownLists.EstatusDDL;
import PresupuestoGrupoInsumoDDL = EK.UX.DropDownLists.PresupuestoGrupoInsumoDDL;
import ValidaPresupuestoDDL = EK.UX.DropDownLists.ValidaPresupuestoDDL;
import SCCOEstatusObraDDL = EK.UX.DropDownLists.SCCOEstatusObraDDL;
import AmbitoDDLFilter = EK.UX.DropDownLists.ambitoDDLFilter;
import CompaniasDDLFilter = EK.UX.DropDownLists.companiasDDLFilter;
import CCDDLFilter = EK.UX.DropDownLists.ccDDLFilter;
import TipoCheque = EK.UX.DropDownLists.tipoChequeDDLFilter;
import BancoDDL = EK.UX.DropDownLists.BancoDDLFilter;
import CuentaBancariaDDL = EK.UX.DropDownLists.CuentaBancariaDDLFilter;
import PuestosDDL = EK.UX.DropDownLists.PuestosDDL;
import IdiomasDDL = EK.UX.DropDownLists.IdiomasDDL;
import ZonaHorariaDDL = EK.UX.DropDownLists.ZonaHorariaDDL;
import MediosPublicidadDDL = EK.UX.DropDownLists.MediosPublicidadDDL;
import EstadoCampaniaDDL = EK.UX.DropDownLists.EstadoCampaniaDDL;
import EstatusUbicacionDDL = EK.UX.DropDownLists.EstatusUbicacionDDL;
import SegmentosDDL = EK.UX.DropDownLists.SegmentosDDL;
import NaturalezaDDL = EK.UX.DropDownLists.NaturalezaDDL;
import NaturalezaCCDDL = EK.UX.DropDownLists.NaturalezaCCDDL;
import PadreDDL = EK.UX.DropDownLists.PadreDDL;
import CompaniasDDL = EK.UX.DropDownLists.CompaniaDDL;
import ImpuestosDDL = EK.UX.DropDownLists.ImpuestoDDL;
import TipoObraDDL = EK.UX.DropDownLists.TipoObraDDL;
import TipoComisionDDL = EK.UX.DropDownLists.TipoComisionDDL;
import MotivosCancelacionDDL = EK.UX.DropDownLists.MotivosCancelacionDDL;
import MotivosSuspencionDDL = EK.UX.DropDownLists.MotivosSuspencionDDL;
import TipoInsumoDDL = EK.UX.DropDownLists.TipoInsumoDDL;
//import SCCOInsumosDDL = EK.UX.DropDownLists.SCCOInsumosDDL;
//import SCCOInsumosObraDDL = EK.UX.DropDownLists.SCCOInsumosObra$DDL;
import SCCOObrasDDL = EK.UX.DropDownLists.SCCO$ObrasDDL;
import SCCOContratistaDDL = EK.UX.DropDownLists.SCCO$ContratistasDDL;
//import SCCOTarjetasDDL = EK.UX.DropDownLists.SCCOTarjetas$DDL;
import GrupoInsumoDDL = EK.UX.DropDownLists.GrupoInsumoDDL;
import UnidadMedidaDDL = EK.UX.DropDownLists.UnidadMedidaDDL;
import SCCOTipoConvenioDDL = EK.UX.DropDownLists.SCCOTipoConvenioDDL;
import TiposConveniosDDL = EK.UX.DropDownLists.TiposConveniosDDL;
import BitacoraConvenioDDL = EK.UX.DropDownLists.BitacoraConvenioDDL;
import SCCOAnticiposDeduccionesDDL = EK.UX.DropDownLists.SCCOAnticiposDeduccionesDDL;
import TipoAnticipoDDL = EK.UX.DropDownLists.TipoAnticipoDDL;
import TiposMovimientosDDL = EK.UX.DropDownLists.TiposMovimientosDDL;
import MonedasDDL = EK.UX.DropDownLists.MonedasDDL;
import TipoUbicacionDDL = EK.UX.DropDownLists.TipoUbicacionDDL;
import UbicacionesDDL = EK.UX.DropDownLists.UbicacionesDDL;
import UbicacionesDesarrolloDDL = EK.UX.DropDownLists.UbicacionesDesarrolloDDL;
import PrototiposDDL = EK.UX.DropDownLists.PrototiposDDl;
import CentrosCostoDDL = EK.UX.DropDownLists.CentrosCostoDDL;
import ReferenciasDDL = EK.UX.DropDownLists.ReferenciasDLL;
import NacionalidadDLL = EK.UX.DropDownLists.NacionalidadDLL;
import RegimenDLL = EK.UX.DropDownLists.RegimenDLL;
import EstadoCivilDLL = EK.UX.DropDownLists.EstadoCivilDLL;
import EstudiosDLL = EK.UX.DropDownLists.EstudiosDLL;
import EmpresasDLL = EK.UX.DropDownLists.EmpresasDLL;
import TipoCasaDLL = EK.UX.DropDownLists.TipoCasaDLL;
import ReferenciasDLL = EK.UX.DropDownLists.ReferenciasDLL;
import TipoPercepcionDLL = EK.UX.DropDownLists.TipoPercepcionDLL;
import GenerosDDL = EK.UX.DropDownLists.GenerosDDL;
import CentralesObrerasDLL = EK.UX.DropDownLists.CentralesObrerasDLL;
import RangoIngresosDDL = EK.UX.DropDownLists.RangosIngresosDDL;
import TiposConceptoPagoDDL = EK.UX.DropDownLists.TiposConceptoPagoDDL;
import ConceptosPagoDDL = EK.UX.DropDownLists.ConceptosPagoDDL;
import FechaConsiderarComisionesDDL = EK.UX.DropDownLists.FechaConsiderarComisionesDDL;
import FrecuenciaPagoDDL = EK.UX.DropDownLists.FrecuenciaPagoDDL;
import PeriodoPagoDDL = EK.UX.DropDownLists.PeriodoPagoDDL;
import TiposFinanciamientoDDL = EK.UX.DropDownLists.TiposFinanciamientoDDL;
import SCVEtapasDDL = EK.UX.DropDownLists.SCVEtapasDDL;
import SCVRequisitosDDL = EK.UX.DropDownLists.SCVRequisitosDDL;
import SCVDocumentosExpedienteDDL = EK.UX.DropDownLists.SCVDocumentosExpedienteDDL;
import TiposEntidadesDDL = EK.UX.DropDownLists.TiposEntidadesDDL;
import TipoCaracteristicaDDL = EK.UX.DropDownLists.TipoCaracteristicaDDL;
import AccionesProcesoDDL = EK.UX.DropDownLists.AccionesProcesoDDL;
import PosicionesDDL = EK.UX.DropDownLists.PosicionesDDL;
import MacroEtapasDDL = EK.UX.DropDownLists.MacroEtapasDDL;
import FasesExpedienteDDL = EK.UX.DropDownLists.FasesExpedienteDDL;
import TipoExpedienteDDL = EK.UX.DropDownLists.TipoExpedienteDDL;
import TipoInmuebleDDL = EK.UX.DropDownLists.TipoInmuebleDDL;
import RecamaraAdicionalDDL = EK.UX.DropDownLists.RecamaraAdicionalDDL;
import GradosInteresDDL = EK.UX.DropDownLists.GradosInteresDDL;
import EstatusDocumentosDDL = EK.UX.DropDownLists.EstatusDocumentosDDL;
import PlazasDDL = EK.UX.DropDownLists.PlazasDDL;
import PlazasDDL2 = EK.UX.DropDownLists.PlazasDDL2;
import PlazasDDL3 = EK.UX.DropDownLists.PlazasDDL3;
import PlazasFixedDDL = EK.UX.DropDownLists.PlazasFixedDDL;
import PlazasClasificadorFilterDDL = EK.UX.DropDownLists.PlazasClasificadorFilterDDL;
import RecursosProgramadosDDL = EK.UX.DropDownLists.RecursosProgramadosDDL;
import MotivoRezagoDDL = EK.UX.DropDownLists.MotivoRezagoDDL;
import PersonaEntregaVDDL = EK.UX.DropDownLists.PersonaEntregaVDDL;
import PersonaEntregaVxFraccDDL = EK.UX.DropDownLists.PersonaEntregaVxFraccDDL;
import FraccionamientosDDL = EK.UX.DropDownLists.FraccionamientosDDL;
import HipotecaVerdeDDL = EK.UX.DropDownLists.HipotecaVerdeDDL;
import EquipamientoDDL = EK.UX.DropDownLists.EquipamientoDDL;
import TipoViviendaDDL = EK.UX.DropDownLists.TipoViviendaDDL;
import VocacionesSPVDDL = EK.UX.DropDownLists.VocacionesSPVDDL;
import FinanciamientoDDL = EK.UX.DropDownLists.FinanciamientoDDL;
import ViviendasEntregadasDDL = EK.UX.DropDownLists.ViviendasEntregadasDDL;
import ViviendaEntregableDDL = EK.UX.DropDownLists.ViviendaEntregableDDL;
import DetallesreprogDDL = EK.UX.DropDownLists.DetallesreprogDDL;
import MotivosreprogDDL = EK.UX.DropDownLists.MotivosreprogDDL;
import TipoCitasDDL = EK.UX.DropDownLists.TipoCitasDLL;
import CuentasBancariasDDL = EK.UX.DropDownLists.CuentasBancariasDDL;
import ExpedienteClienteDDL = EK.UX.DropDownLists.ExpedienteClienteDDL;
import IWorkFlowTypeEnum = EK.UX.DropDownLists.IWorkFlowTypeEnum;
import GruposDDL = EK.UX.DropDownLists.GruposDDL;
import GirosDDL = EK.UX.DropDownLists.GirosDDL;
import TipoResidenciaDDL = EK.UX.DropDownLists.TipoResidenciaDDL;
import TipoComercializacionDDL = EK.UX.DropDownLists.TipoComercializacionDDL;
import DocumentosCategoriaDDL = EK.UX.DropDownLists.DocumentosCategoriaDDL;
import PaquetesDDL = EK.UX.DropDownLists.PaquetesDDL;
import UsoFallaDDL = EK.UX.DropDownLists.UsoFallaDDL;
import UsoDDL = EK.UX.DropDownLists.UsoDDL;
import MotivoDDL = EK.UX.DropDownLists.MotivoDDL;
import InstitucionesCreditoDDL = EK.UX.DropDownLists.InstitucionesCreditoDDL;
import ConceptosCreditoDDL = EK.UX.DropDownLists.ConceptosCreditoDDL;
import TiposConceptoCreditoDDL = EK.UX.DropDownLists.TiposConceptoCreditoDDL;
import EfectosConceptoCreditoDDL = EK.UX.DropDownLists.EfectoConceptoCreditoDDL;
import TipoAgendaDDL = EK.UX.DropDownLists.TipoAgendaDDL;
import TipoAgendaFixedDDL = EK.UX.DropDownLists.TipoAgendaFixedDDL;
import TiposDDL = EK.UX.DropDownLists.TiposDDL;
import PRECIOVENTADDL = EK.UX.DropDownLists.PRECIOVENTADDL;
import INDICADORESDDL = EK.UX.DropDownLists.INDICADORESDDL;
import SPVHorariosAtencionDDL = EK.UX.DropDownLists.SPVHorariosAtencion;
import CategoriaInsumoDDL = EK.UX.DropDownLists.CategoriaInsumoDDL;
import TipoOrdenesCambioDDL = EK.UX.DropDownLists.TipoOrdenesCambioDDL;
import SCCOTiposConceptoDDL = EK.UX.DropDownLists.SCCOTiposConceptoDDL;
import TipoTarjetaDDL = EK.UX.DropDownLists.TipoTarjetaDDL;
import ValidacionPresupuestoDDL = EK.UX.DropDownLists.ValidacionPresupuestoDDL;
import TipoSociedadDDL = EK.UX.DropDownLists.TipoSociedadDDL;
import TipoTerceroDDL = EK.UX.DropDownLists.TipoTerceroDDL;
import TipoOperacionDDL = EK.UX.DropDownLists.TipoOperacionDDL;
import TipoProveedorDDL = EK.UX.DropDownLists.TipoProveedorDDL;
import TipoMovimientoProveedorDDL = EK.UX.DropDownLists.TipoMovimientoProveedorDDL;
import SGPTipoProyectoDDL = EK.UX.DropDownLists.SGPTipoProyectoDDL;
import SGPUsuariosAgrupadosDDL = EK.UX.DropDownLists.SGPUsuariosAgrupadosDDL;
import TipoFSRDDL = EK.UX.DropDownLists.TipoFSRDDL;
import TipoIndirectoDDL = EK.UX.DropDownLists.TipoIndirectoDDL;
import TipoNivelIndirectoDDL = EK.UX.DropDownLists.TipoNivelIndirectoDDL;
import TipoValidacionDDL = EK.UX.DropDownLists.TipoValidacionDDL;
import SccoProcesosDDL = EK.UX.DropDownLists.SccoProcesosDDL;
import PaisOrigenDDL = EK.UX.DropDownLists.PaisOrigenDLL;
import TipoReporteDDL = EK.UX.DropDownLists.TipoReporteDDL;
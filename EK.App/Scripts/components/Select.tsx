namespace EK.UX.Selects {
    "use strict";

    const w: any = window;

    export interface ISelectProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        className?: string;
        data?: any;
        helpLabel?: string;
        hideLabelOnSelect?: boolean;
        limit?: number;
        label?: string;
        mode?: SelectModeEnum;
        itemFormatter?: (index: number, item: any) => JSX.Element;
        items?: any;
        itemKey?: string;
        itemLabel?: string;
        itemSelected?: string;
        itemValue?: string;
        remoteUrl?: string;
        remoteMethod?: string;
        required?: boolean;
        style?: React.CSSProperties;
        suggestionFormatter?: (item: any) => JSX.Element;
    }

    /* Estatus del Componente */
    export interface ISelectState {
        initialValue?: any;
        currentValue?: any;
        hasChanged?: boolean;
        hasValidationError?: boolean;
        loading?: boolean;
    }

    export enum SelectModeEnum {
        Single = 0,
        Multiple = 1
    }

    /** Componente */
    export class SelectAutoComplete extends React.Component<ISelectProps, ISelectState> {
        constructor(props: ISelectProps) {
            super(props);

            this.state = {
                initialValue: props.value,
                currentValue: props.value,
                hasChanged: false,
                hasValidationError: false,
                loading: false
            };

            this.onChange = this.onChange.bind(this);
            this.itemAlreadyAdded = this.itemAlreadyAdded.bind(this);
            this.initTypeAhead = this.initTypeAhead.bind(this);
            this.onSingleModeClick = this.onSingleModeClick.bind(this);
        }

        static defaultProps: ISelectProps = {
            id: "",
            label: "",
            hideLabelOnSelect: false,
            helpLabel: "",
            remoteUrl: "",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            itemLabel: "elemento",
            isFormComponent: true
        };

        refs: {
            select: Element;
            content: Element;
            requiredPoint: Element;
        }

        itemAlreadyAdded(item: any): boolean {
            let retValue: boolean = false;
            let value: any = this.state.currentValue;
            let items: any[] = value && value.data ? value.data : value;

            items.forEach((stateItem: any, index: number) => {
                if (item[this.props.itemKey] === stateItem[this.props.itemKey]) {
                    retValue = true;
                }
            });

            return retValue;
        }

        initTypeAhead(): void {
            let w: any = window;
            let remoteUrl: string = this.props.remoteUrl;
            let remoteMethod: string = this.props.remoteMethod;
            let limit: number = this.props.limit;
            let content: any = $(this.refs.content);

            let dataSource: any;
            if (this.props.data && this.props.data.data) {
                var custom = new w.Bloodhound({
                    local: this.props.data.data,
                    queryTokenizer: w.Bloodhound.tokenizers.whitespace,
                    datumTokenizer: (d: any) => {
                        let retValue: any[] = [];

                        for (var k in d) {
                            let tokens: string[] = w.Bloodhound.tokenizers.whitespace(d[k].toString());

                            retValue = retValue.concat(tokens);
                        }

                        return retValue;
                    },
                });

                custom.initialize();
                dataSource = custom.ttAdapter();
            } else {
                var custom = new w.Bloodhound({
                    datumTokenizer: (d: any) => {
                        return d.tokens;
                    },
                    queryTokenizer: w.Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: remoteUrl,
                        transform: (d: any) => {
                            return d
                        },
                        prepare: (query: any, settings: any) => {
                            settings.type = remoteMethod;
                            settings.contentType = "application/json; charset=UTF-8";
                            settings.data = JSON.stringify({ search: query });
                            settings.beforeSend = () => {
                                content.parent().find(".select-spinner").show();
                            };
                            settings.complete = () => {
                                content.parent().find(".select-spinner").hide();
                            };

                            return settings;
                        }
                    }
                });

                custom.initialize(); 
                dataSource = custom.ttAdapter();
            };

            let defaultSuggestionFn: any = w.Handlebars.compile([
                "<div>",
                "{{",
                this.props.itemValue,
                "}}",
                "</div>",
            ].join(""));

            let suggestionFn:
                (item: any) => string =
                (item: any): string => {
                    if (this.props.suggestionFormatter) {
                        return w.ReactDOMServer.renderToStaticMarkup(this.props.suggestionFormatter(item));
                    } else {
                        return defaultSuggestionFn(item);
                    }
                };

            let select: any = $(this.refs.select);

            if (select.data("typeahead-init")) {
                select.typeahead("destroy");
            };

            select.typeahead(null, {
                name: this.props.id,
                displayKey: (e) => { return ""; },
                source: dataSource,
                limit: limit,
                templates: {
                    suggestion: suggestionFn
                }
            }).on("typeahead:asyncrequest",
                (e: any, f: any, g: any) => {
                //console.log(e);
            }).on("typeahead:selected", (e: any, item: any) => {
                // clear the content
                select.typeahead('val', '');

                if (this.props.mode === SelectModeEnum.Single) {
                    this.onChange(item);
                    //this.setState({
                    //    currentValue: item
                    //});
                } else {
                    // check if duplicated
                    if (this.state.currentValue && this.itemAlreadyAdded(item)) {
                        warning("El " + this.props.itemLabel + " " + item[this.props.itemValue] + " ya ha sido seleccionado");
                    } else {
                        let value: any = this.state.currentValue;

                        if (!value) {
                            value = [item];
                        } else {
                            value = EK.Global.assign({}, value);
                            if (value.data) {
                                value.timestamp = Number(new Date());
                                value.data.push(item);
                            } else {
                                value.push(item);
                            }
                        }

                        this.onChange(value);
                    }
                }
            }).data("typeahead-init", true);

            // fix to make styles work
            //let content: any = $(this.refs.content);
            content.prepend(content.find("label"));
            content.prepend(content.find("span.twitter-typeahead").find("input.tt-input"));
        }

        /**
         * Eventos 
         */
        componentDidMount() {
            let select: any = $(this.refs.select);

            if (this.props.mode === SelectModeEnum.Single) {
                if (!this.state.currentValue && !select.data("typeahead-init")) {
                    this.initTypeAhead();
                }
            } else {
                this.initTypeAhead();
            }
        }

        componentWillReceiveProps(nextProps: ISelectProps): any {
            this.setState({
                hasChanged: false,
                hasValidationError: false,
                currentValue: nextProps.value,
                initialValue: nextProps.value
            });
        }


        componentWillUpdate(nextProps: ISelectProps, nextState: ISelectState): any {
            let select: any = $(this.refs.select);
            let content: any = $(this.refs.content);

            if (this.props.mode === SelectModeEnum.Single) {
                if (select.data("typeahead-init")) {
                    // content.prepend(content.find("label"));
                    content.find("span.twitter-typeahead").prepend(content.find("input.tt-input"));
                    select.typeahead("destroy");
                };
                //else {
                //    if (!select.data("typeahead-init")) {
                //        this.initTypeAhead();
                //    }
                //}
            }
        }

        componentDidUpdate(prevProps: ISelectProps, prevState: ISelectState): any {
            let select: any = $(this.refs.select);

            if (this.props.mode === SelectModeEnum.Single) {
                if (!this.state.currentValue && !select.data("typeahead-init")) {
                    this.initTypeAhead();
                }
            }
        }

        shouldComponentUpdate(nextProps: ISelectProps, nextState: ISelectState): boolean {
            let retValue: boolean = true;

            if (this.props.mode === SelectModeEnum.Single) {
                let currentItem: any = this.state.currentValue;
                let newItem: any = nextState.currentValue;

                if (currentItem && newItem) {
                    if (currentItem[this.props.itemKey] === newItem[this.props.itemKey]) {
                        retValue = false;
                    }
                } else {
                    if (this.props.data) {
                        if (this.props.data.timestamp !== nextProps.data.timestamp) {
                            retValue = true;
                        }
                    } else {
                        if (currentItem === newItem) {
                            retValue = false;
                        }
                    }
                }
            } else {
                let currentItems: any[] = this.state.currentValue;
                let newItems: any[] = nextState.currentValue;

                if (currentItems && newItems) {
                    if (this.state.currentValue.timestamp && nextState.currentValue.timestamp) {
                        if (this.state.currentValue.timestamp === nextState.currentValue.timestamp) {
                            retValue = false;
                        }
                    } else if (currentItems.length === newItems.length) {
                        currentItems.forEach((currentItem: any, currentIndex: number) => {
                            if (!retValue) {
                                let found: boolean = false;

                                newItems.forEach((newItem: any, newIndex: number) => {
                                    if (!found) {
                                        if (currentItem[this.props.itemKey] === newItem[this.props.itemKey]) {
                                            found = true;
                                        }
                                    }
                                });

                                if (!found) {
                                    retValue = false;
                                }
                            }
                        });
                    }
                } else {
                    if (currentItems === newItems) {
                        retValue = false;
                    }
                }
            }

            return retValue;
        }

        /**
        * Funciones 
        */
        onChange(e: any): any {
            console.log(e);
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: e,
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    hasValidationError: this.props.hasValidationError
                });
            }

            if (this.props.change != undefined) {
                this.props.change(e);
            }
        }

        onSingleModeClick() {
            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: undefined,
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    hasValidationError: this.props.hasValidationError
                });
            }

            if (this.props.change != undefined) {
                this.props.change(undefined);
            }
        }

        render(): JSX.Element {
            let className: string = "form-control input-sm";
            let formControlId: string;
            let formGroupClass: string = "form-group form-md-line-input form-md-floating-label";

            if (!this.props.id) {
                let d = new Date();
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

            let displayInput: boolean = true;
            let selectionElement: JSX.Element;

            if (this.props.mode === SelectModeEnum.Single) {
                if (this.state.currentValue && this.state.currentValue[this.props.itemKey]) {
                    className += " edited";

                    selectionElement = <div
                        className="tt-singleContainer"
                        style={{
                            padding: 0,
                            marginTop: -5,
                            borderBottom: "solid 2px #36c6d3"
                        }}>
                        <CloseButton onClick={this.onSingleModeClick} style={{ float: "right", paddingRight: 6, paddingLeft: 6, marginTop: -15 }} />
                        <div>
                            <h5 style={{ marginBottom: 6 }}>{this.props.itemFormatter(0, this.state.currentValue)}</h5>
                        </div>
                    </div>;

                    displayInput = false;
                } else {
                    // 
                }
            } else {
                selectionElement = <List
                    items={this.state.currentValue}
                    onChange={this.onChange}
                    formatter={this.props.itemFormatter}
                    itemClass="dd-typeahead"
                    addRemoveButton={false}
                    />;
            }

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                className={this.props.className}
                style={this.props.style}>
                {displayInput ?
                    <div className={formGroupClass} ref="content">
                        <div className="select-spinner bg-yellow-gold bg-font-yellow-gold" style={{ display: "none" }}>
                            <i className="fa fa-refresh fa-spin"></i>
                        </div>
                        <input
                            type="text"
                            className={className}
                            id={formControlId}
                            name={formControlId}
                            ref="select"
                            style={{ height: 30, fontSize: 12 }}
                            />
                        <label className="select-label" htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}><span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span></label>
                        {selectionElement}
                    </div>
                    :
                    <div>
                        {!this.props.hideLabelOnSelect
                            ? <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}><span ref="requiredPoint">{this.props.label}&nbsp;{requiredPoint}</span></label>
                            : null}
                        {selectionElement}
                    </div>
                }
            </Column>;
        }
    }

    //export class SCVClienteSelect extends React.Component<ISelectProps, ISelectState>{
    //    static defaultProps: ISelectProps = {
    //        id: "Cliente",
    //        label: "Cliente",
    //        helpLabel: "Cliente",
    //        remoteUrl: "vivienda/clientes/buscar",
    //        remoteMethod: "POST",
    //        limit: 25,
    //        mode: SelectModeEnum.Single,
    //        itemKey: "ID",
    //        itemValue: "Nombre",
    //        itemLabel: "elemento",
    //        size: [12, 12, 6, 6],
    //        itemFormatter: (index: number, item: any): any => {
    //            return item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno;
    //        },
    //        suggestionFormatter: (item: any): any => {
    //            return <div>{item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno}</div>
    //        }
    //    };

    //    render(): any {
    //        return <Select$Form {...this.props} />;
    //    };
    //};

    //02/03/2018
    export class SCVClientes extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        constructor(props: IDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            items: state.global.SCV_CLIENTES
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Cliente",
            remoteUrl: "base/scv/ScvClientes/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    var apellidoP = item.ApellidoPaterno ? item.ApellidoPaterno:"";
                    var apellidoM = item.ApellidoMaterno ? item.ApellidoMaterno : "";
                    var nombreCompleto = item.Nombre + " " + apellidoP + " " + apellidoM;
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        nombreCompleto,
                        "</span> ",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (item.ID && item.ID>0)
                {
                    var apellidoP = item.ApellidoPaterno ? item.ApellidoPaterno : "";
                    var apellidoM = item.ApellidoMaterno ? item.ApellidoMaterno : "";
                    var nombreCompleto = item.Nombre + " " + apellidoP + " " + apellidoM;

                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        nombreCompleto,
                        "</span> ",
                    ].join(""));
                };
                return $([
                    "<span class='bold' style='font-size: 90%'>",
                    item.text,
                    "</span> ",
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };
    export class Usuarios extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "User",
            remoteUrl: "base/kontrol/usuarios/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            matchers: ["Apellidos", "Nombre"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.Nombre + " " + item.Apellidos,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre ) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre + " " + item.Apellidos,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };

    export class ClientesSPVML extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {

            id: "ClientesSPV",
            //remoteUrl: "base/kontrol/clientesspv/all",
            //remoteUrl: "base/kontrol/clientesspv/GetBP/GetClientesSPV/",
            remoteUrl: "base/kontrol/clientesspv/GetBP/SearchClienteML/",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            beforeInvoke: (param: any): any => {
                //var parametros = {
                //    search: param.term
                //};
                let busqueda = param.term.trim();
                let PAGE_ID = getData(EK.Store.getState().global.pageConfig).id;
                let model: any = Forms.getForm(PAGE_ID);
                let plaza = model.PlazaInicial;
                let fraccs = model.Fraccionamientos;
                console.log(model);
                let params = busqueda.split(' ');
                if (params.length > 1) {
                    let idplaza = null;
                    let listF = null;
                    if (plaza != undefined) {
                        idplaza = plaza.ID
                    }
                    if (fraccs != undefined) {
                        let lista = '';
                        if (fraccs.length === 1 && fraccs[0].Clave === '-2') {
                            listF = null
                        } else {
                            for (let i = 0; i < fraccs.length; i++) {
                                lista += fraccs[i].Clave;
                                if (i + 1 < fraccs.length) {
                                    lista += ',';
                                }
                            }
                            listF = lista;
                        }
                    }
                    var parametros = {
                        Mza: params[0],
                        Lte: params[1],
                        Plaza:idplaza,
                        FraccList:listF
                    };
                    console.log(parametros);
                    return JSON.stringify({ parametros: parametros });
                } else {
                    return;
                }
                //console.log(params);
                //return;
                //return JSON.stringify({ parametros: parametros });
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'>" :
                            "<span class='badge badge-danger bold'>",
                        item.id,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'>",
                        item.SuperManzana + '-' + item.Manzana + '-' + item.Lote+'-'+item.Interior+'-'+item.Exterior,
                        "</span> ",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                        "</span>",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        "</span>",
                        " <span style='font-size:9px; font-style: italic'> ", item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : ''), " </span> ",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'>" :
                        "<span class='badge badge-danger bold'>",
                    item.id,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> ",
                    "<span class='badge badge-info bold'>",
                    item.SuperManzana + '-' + item.Manzana + '-' + item.Lote + '-' + item.Interior + '-' + item.Exterior,
                    "</span> ",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    "</span>",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    "</span>",
                    " <span style='font-size:9px; font-style: italic'> ", item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : ''), " </span> ",
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };

    export class ClientesSPVEND extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {

            id: "ClientesSPV",
            //remoteUrl: "base/kontrol/clientesspv/all",
            //remoteUrl: "base/kontrol/clientesspv/GetBP/GetClientesSPV/",
            remoteUrl: "base/kontrol/clientesspv/GetBP/SearchClienteEND/",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            beforeInvoke: (param: any): any => {
                //var parametros = {
                //    search: param.term
                //};
                let busqueda = param.term.trim();
                let PAGE_ID = getData(EK.Store.getState().global.pageConfig).id;
                let model: any = Forms.getForm(PAGE_ID);
                let plaza = model.PlazaInicial;
                let fraccs = model.Fraccionamientos;
                //console.log(model);
                let params = busqueda.split(' ');
                if (params.length > 2) {
                    let idplaza = null;
                    let listF = null;
                    if (plaza != undefined) {
                        idplaza = plaza.ID
                    }
                    if (fraccs != undefined) {
                        let lista = '';
                        if (fraccs.length === 1 && fraccs[0].Clave === '-2') {
                            listF = null
                        } else {
                            for (let i = 0; i < fraccs.length; i++) {
                                lista += fraccs[i].Clave;
                                if (i + 1 < fraccs.length) {
                                    lista += ',';
                                }
                            }
                            listF = lista;
                        }
                    }
                    var parametros = {
                        Edificio: params[0],
                        Nivel: params[1],
                        Dpto: params[2],
                        Plaza: idplaza,
                        FraccList: listF
                    };
                    console.log(parametros);
                    return JSON.stringify({ parametros: parametros });
                } else {
                    return;
                }
                //console.log(params);
                //return;
                //return JSON.stringify({ parametros: parametros });
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    let UrlAplicacion: any = window.location;
                    let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                    let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.Interior : item.SuperManzana + '-' + item.Manzana + '-' + item.Lote
                    let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : '');

                    return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'>" :
                            "<span class='badge badge-danger bold'>",
                        item.id,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'>",
                        textLabelInfo,
                        "</span> ",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                        "</span>",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        "</span>",
                        " <span style='font-size:9px; font-style: italic'> ",
                        textLabelCalle,
                        " </span> ",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                let UrlAplicacion: any = window.location;
                let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.Interior : item.SuperManzana + '-' + item.Manzana + '-' + item.Lote
                let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : '');


                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'>" :
                        "<span class='badge badge-danger bold'>",
                    item.id,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> ",
                    "<span class='badge badge-info bold'>",
                    textLabelInfo,
                    "</span> ",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    "</span>",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    "</span>",
                    " <span style='font-size:9px; font-style: italic'> ",
                    textLabelCalle,
                    " </span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };
    export class ClientesSPV extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "ClientesSPV",
            remoteUrl: "base/kontrol/clientesspv/all", 
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    let UrlAplicacion: any = window.location;
                    let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                    let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.Interior : item.SuperManzana + '-' + item.Manzana + '-' + item.Lote + '-'+item.Interior+'-'+item.Exterior
                    let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : '');
                    
                        return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'>" :
                            "<span class='badge badge-danger bold'>",
                        item.id,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'>",
                        textLabelInfo,                         
                        "</span> ",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                        "</span>",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        "</span>",
                        " <span style='font-size:9px; font-style: italic'> ",
                            textLabelCalle,
                        " </span> ",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };

                let UrlAplicacion: any = window.location;
                let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.Interior : item.SuperManzana + '-' + item.Manzana + '-' + item.Lote+'-'+item.Interior + '-' + item.Exterior
                let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : '');


                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'>" :
                        "<span class='badge badge-danger bold'>",
                    item.id,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> ",
                    "<span class='badge badge-info bold'>",
                    textLabelInfo,
                    "</span> ",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    "</span>",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    "</span>",
                    " <span style='font-size:9px; font-style: italic'> ",
                    textLabelCalle,
                    " </span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };

    


    //Empieza
    //Oswaldo 
    //Para base (2019-04-12)
    export class ClientesPostVenta extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Cliente",
            remoteUrl: "base/kontrol/clientesspv/GetBP/GetClientesSPV/",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            beforeInvoke: (param: any): any => {
                var parametros = {
                    search: param.term
                };

                return JSON.stringify({ parametros: parametros });
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'> " :
                            "<span class='badge badge-danger bold'> ",
                        item.id,
                        "</span>",
                        "<span class='bold' style='font-size: 90%'> ",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'> ",
                        item.UbicacionClaveFormato,
                        "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'> " :
                        "<span class='badge badge-danger bold'> ",
                    item.id,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };

    ///Termina
    export class ClientesLotesSPV extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Cliente",
            remoteUrl: "base/kontrol/clientesspv/all",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            beforeInvoke: (params: any): any => {
                var query = {
                    search: params.term,
                    searchLotes: 1
                };

                return JSON.stringify(query);
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    //console.log(item)
                    let UrlAplicacion: any = window.location;
                    let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                    let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.Interior : item.UbicacionClaveFormato//item.SuperManzana + '-' + item.Manzana + '-' + item.Lote
                    let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : '');
                    return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'>" :
                            "<span class='badge badge-danger bold'>",
                        item.id,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'>",
                        textLabelInfo,
                        "</span> ",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                        "</span>",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        "</span>",
                        " <span style='font-size:9px; font-style: italic'> ",
                        textLabelCalle,
                        " </span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                //console.log(item)
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                let UrlAplicacion: any = window.location;
                let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.Interior : item.UbicacionClaveFormato//item.SuperManzana + '-' + item.Manzana + '-' + item.Lote
                let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : '');
                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'>" :
                        "<span class='badge badge-danger bold'>",
                    item.id,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> ",
                    "<span class='badge badge-info bold'>",
                    textLabelInfo,
                    "</span> ",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    "</span>",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    "</span>",
                    " <span style='font-size:9px; font-style: italic'> ",
                    textLabelCalle,
                    " </span> ",
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };

   

    export class ClientesLotesSPVCambioAgenda extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Cliente",
            remoteUrl: "base/kontrol/clientesspv/all",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            beforeInvoke: (params: any): any => {
                var query = {
                    search: params.term,
                    searchLotes: 1
                };

                return JSON.stringify(query);
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'>" :
                            "<span class='badge badge-danger bold'>",
                        item.id,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'>",
                        item.SuperManzana + '-' + item.Manzana + '-' + item.Lote,
                        "</span> ",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                        "</span>",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        "</span>",
                        " <span style='font-size:9px; font-style: italic'> ", item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : ''), " </span> ",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                //console.log(item)
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'>" :
                        "<span class='badge badge-danger bold'>",
                    item.id,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> ",
                    "<span class='badge badge-info bold'>",
                    item.SuperManzana + '-' + item.Manzana + '-' + item.Lote,
                    "</span> ",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    "</span>",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    "</span>",
                    " <span style='font-size:9px; font-style: italic'> ", item.Calle + ' ' + item.Exterior + (item.Interior !== '0' && item.Interior !== null ? '-' + item.Interior : ''), " </span> ",
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };


    interface IPersonaEntregaVDDLProps extends ddl.IDropDrownListProps {
        Plaza?: any;
        item?: any;
    }


    export class Fraccionamientos extends React.Component<IPersonaEntregaVDDLProps, IPersonaEntregaVDDLProps>{

        static props: any = (state: any) => ({
               Plaza: state.global.Plaza_Seleccionada
        });   

    
       
        static defaultProps: IPersonaEntregaVDDLProps = {
            id: "Fraccionamientos",
            remoteUrl: "base/kontrol/fraccionamientos/all",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ",
                        item.Clave==-2 ? '': item.Clave,
                        "</span>",
                        "<span class='bold' style='font-size: 90%'> ",
                        item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'> ",
                    item.Clave == -2 ? '' : item.Clave,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };


            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };
            let formulario = this.props.idForm ? this.props.idForm : this.props.idFormSection; 
            let bi : any =  (params:  any) => {
                var query = {
                    IdPlaza: EK.Store.getState().forms[formulario].form.PlazaInicial.value.ID,
                    search: params.term
                };

                return JSON.stringify(query);
            };

            return <ddl.DropdownList$Form {...this.props} beforeInvoke ={bi} {...labels} />;
        };
    };

    export class ProveedoresSelect extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Proveedor",
            label: "Proveedor",
            helpLabel: "Proveedor",
            remoteUrl: "base/kontrol/Proveedores/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Clave,
                        "</span>",
                        " <span>",
                        item.NombreCorto,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || item.selected === true) {
                    return $(item.text);
                };
                return $([
                    "<span class='badge badge-success bold'>",
                    item.Clave,
                    "</span>",
                    " <span>",
                    item.NombreCorto,
                    "</span>, ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };
    export interface IUbicacionesSelectProps extends ISelectProps {
        estatus: string;
        desarrollo: any;
    };
    export class UbicacionesSelect extends React.Component<IUbicacionesSelectProps, ISelectState>{
        static defaultProps: ISelectProps = {
            id: "Ubicacion",
            label: "Ubicacion",
            helpLabel: "Ubicacion",
            remoteUrl: "ubicaciones/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            itemLabel: "elemento",
            size: [12, 12, 6, 6],
            itemFormatter: (index: number, item: any): any => {
                return [item.ClaveFormato, " (", item.ClaveCorta, ") ", item.TipoUbicacion.Nombre, " ", item.Prototipo.Nombre].join("");
            },
            suggestionFormatter: (item: any): any => {
                return <div>{[item.Clave, " (", item.ClaveCorta, ") ", item.TipoUbicacion.Nombre, " ", item.Prototipo.Nombre].join("")}</div>;
            }
        };

        render(): any {
            let idDesarrollo: number;

            if (!isNaN(this.props.desarrollo)) {
                idDesarrollo = this.props.desarrollo;
            } else {
                idDesarrollo = this.props.desarrollo.ID;
            };

            let remoteUrl: string = this.props.remoteUrl + "/?idDesarrollo=" + idDesarrollo + "&estatus=" + this.props.estatus;

            return <Select {...this.props} remoteUrl={remoteUrl} />;
        };
    };
    export class Asentamientos extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Asentamiento",
            //label:"Localidad",
            remoteUrl: "base/kontrol/asentamientos/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 8, 8],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.CP,
                        "</span>",
                        " <span>",
                        item.Nombre,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Localidad.Nombre,
                        "</span> "
                        ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Localidad) {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.CP,
                        "</span>",
                        " <span>",
                        item.Nombre,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'>",
                    item.CP,
                    "</span>",
                    " <span>",
                    item.Nombre,
                    "</span> ",
                    "<span class='bold' style='font-size: 90%'>",
                    item.Localidad.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };
    export class Estados extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Estado",
            label:"CIUDAD/ESTADO DE ORIGEN",
            remoteUrl: "base/kontrol/localidades/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 8, 8],
            beforeInvoke: (params: any): any => {
                var query = {
                    search: params.term,
                    tipo: "E",
                    activos: 1
                };

                return JSON.stringify(query);
            },
            itemFormatter: (item, container): any => {
                if (!item) return "";

                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $(["<span>", item.Descripcion, "</span>"].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || item.selected === true) {
                    return $(item.text);
                };

                return $(["<span>", item.Descripcion, "</span>"].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };
    export class Agente extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Agente",
            remoteUrl: "base/kontrol/Agentes/search", 
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 8, 8],
            itemFormatter: (item, container): any => {
                if (!item.IdUsuario) {
                    return item.text;
                }
                else {
                    return $([
                        " <span class='bold' style='font-size: 90%'>",
                        item.Nombre + " " + item.Apellidos,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre + " " + item.Apellidos,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };

    };
    export class Notario extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Notario",
            remoteUrl: "base/kontrol/Notarios/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 8, 8],
            itemFormatter: (item, container): any => {
                if (!item.ID) {
                    return item.text;
                }
                else {
                    return $([
                        " <span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.ID || item.ID === "" || isNaN(item.ID) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    }
    export interface IClienteFilterSelectProps extends ISelectProps {
        _cliente?: any;
        cargaClientes?: () => void;
    }
    export class ClientFilterSelect extends React.Component<IClienteFilterSelectProps, ISelectState> {
        constructor(props: IClienteFilterSelectProps) {
            super(props);
        }

        static defaultProps: IClienteFilterSelectProps = {
            id: "Cliente",
            data: createDefaultStoreObject([]),
            label: "CLIENTE",
            hideLabelOnSelect: true,
            helpLabel: "Capture el nombre completo del cliente",
            remoteUrl: "Clientes/Search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            itemLabel: "cliente",
            size: undefined,
            className: "alert",
            style: { marginBottom: 0, padding: 10, backgroundColor: "#fafafa" }
        };

        refs: {
            select: Element;
            requiredPoint: Element;
        }

        componentDidMount(): void {
            this.props.cargaClientes();
        };

        render(): any {
            if (this.props._cliente && this.props._cliente.ENKUser === 0) {
                return null;
            };

            let value: any = this.props.value ? this.props.value.data : null;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);

            return <Select$Form
                id={this.props.id}
                data={this.props.data}
                label={this.props.label}
                hideLabelOnSelect={this.props.hideLabelOnSelect}
                mode={SelectModeEnum.Single}
                className={this.props.className}
                style={style}
                itemFormatter={(index: number, item: any) => {
                    return <h5 style={{ margin: "5px 0px" }}>
                        <span className="badge badge-primary" style={{ marginRight: 10 }}>
                            {item.Clave}
                        </span>{item.Nombre}
                    </h5>
                } }
                suggestionFormatter={(item: any) => {
                    return <div>
                        <span className="badge badge-info" style={{ marginRight: 10 }}>
                            {item.Clave}
                        </span><span style={{ fontSize: 11 }}>{item.Nombre}</span>
                    </div>
                } }
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemLabel={this.props.itemLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }
    export class PuntosVenta extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "PuntoVenta",
            remoteUrl: "base/kontrol/PuntosVenta/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 8, 8],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        " <span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };

    };
    /**
     * Obtener opciones del select 
     * @param item
     
    //export const SelectItemStyle: (item: IDropdownListItem) => JSX.Element =
    //    (item: IDropdownListItem): JSX.Element => {
    //        return <option value={item.idoption}>{item.valueoption}</option>;
    //    }

    /**
     * Acciones
     * @param state
     */
    const mapProps: any = (state: any): any => {
        return { items: state.dropdownlistdata };
    }

    const clientFilterMapProps: any = (state: any): any => {
        return {
            _cliente: state.global.app.data.Cliente,
            value: state.global.cliente,
            data: state.global.clientes
        };
    }

    const clientFilterMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            change: (item: any): void => {
                dispatchSuccessful("cliente-global-selected", item);
            },
            cargaClientes: (item: any): void => {
                dispatchAsync("clientes-kv", "clientes/key-value");
            }
        };
    };

    export let ClientFilter: any = ReactRedux.connect(clientFilterMapProps, clientFilterMapDispatchs)(ClientFilterSelect);

    export class ContratistasSPV extends React.Component<ddl.ISPVContratistasProps, {}>{
        static defaultProps: ddl.ISPVContratistasProps = {
            id: "Contratista",
            remoteUrl: "base/scv/Contratistas/all",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Descripcion",
            size: [12, 12, 6, 6],
            idPlaza: undefined,
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'> ", item.id, "</span>",
                        "<span class='bold' style='font-size: 90%'> ", item.Descripcion, "</span> "
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Descripcion) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ", item.text, "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'> ", item.id, "</span>",
                    "<span class='bold' style='font-size: 90%'> ", item.Descripcion, "</span> "
                ].join(""));
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            let bi: any = (params: any) => {
                let query: any = {
                    search: params.term,
                    idPlaza: this.props.idPlaza ? this.props.idPlaza : null
                };

                return JSON.stringify(query);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} beforeInvoke={bi} />;
        };
    };

    export class ReportesFallasSPV extends React.Component<ddl.IDropDrownListProps, {}>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "ReporteFalla",
            remoteUrl: "base/scv/ReportesFallas/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "ID",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                console.log(item, container);
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    let UrlAplicacion: any = window.location;
                    let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                    let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.id_num_interior : item.Ubicacion.ClaveFormato
                    let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.id_num_exterior + (item.id_num_interior !== '0' && item.id_num_interior !== null ? '-' + item.id_num_interior : '');

                    return $([
                        "<span class='badge badge-warning bold'>", item.ID, "</span> ",
                        "<span class='badge badge-success bold'>", item.Cliente.ID, "</span> ",
                        "<span class='badge badge-info bold'>", item.tel_casa, " </span> ",
                        "<span class='bold' style='font-size: 90%'>", item.Cliente.Nombre, " </span> ",
                        "<span class='badge badge-info bold'> ",
                        textLabelInfo,
                        "</span> ",
                        " <span class='badge badge-warning bold'> ",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave, 
                        " </span> ", 
                        " <span class='badge badge-warning bold'> ",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        " </span> ",
                        " <span style='font-size:9px; font-style: italic'> ", textLabelCalle , " </span> ",
                        
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.ID || !item.Cliente) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ", item.text, "</span> "
                    ].join(""));
                };
                let UrlAplicacion: any = window.location;
                let IntraUrbana: boolean = UrlAplicacion.pathname.includes("intra");
                let textLabelInfo = UrlAplicacion.pathname.includes("intra") ? item.id_num_interior : item.Ubicacion.ClaveFormato
                let textLabelCalle = UrlAplicacion.pathname.includes("intra") ? item.Calle + ' ' + item.Edificio + ' ' + item.Nivel : item.Calle + ' ' + item.id_num_exterior + (item.id_num_interior !== '0' && item.id_num_interior !== null ? '-' + item.id_num_interior : '');

                return $([
                    "<span class='badge badge-warning bold'>", item.ID, "</span> ",
                    "<span class='badge badge-success bold'>", item.Cliente.ID, "</span> ",
                    "<span class='badge badge-info bold'>", item.tel_casa, " </span> ",
                    "<span class='bold' style='font-size: 90%'>", item.Cliente.Nombre, " </span> ",
                    "<span class='badge badge-info bold'> ",
                    textLabelInfo,
                    //!(item.id_num_exterior) ? "" : " - " + item.id_num_exterior,
                    "</span> ",
                    " <span class='badge badge-warning bold'> ",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    " </span> ",
                    " <span class='badge badge-warning bold'> ",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    " </span> ",
                    " <span style='font-size:9px; font-style: italic'> ", textLabelCalle, " </span> ",

                ].join(""));

            }
        };
        render(): JSX.Element {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            let bi: any = (params: any) => {
                let query: any = {
                    search: params.term
                };

                return JSON.stringify(query);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} beforeInvoke={bi} />;
        };
    };

    export class SelectForm extends React.Component<ISelectProps, ISelectState> {
        constructor(props: ISelectProps) {
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

        componentWillReceiveProps(nextProps: ISelectProps) {
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

                return <SelectAutoComplete {...this.props} {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let Select$Form: any = ReactRedux.connect(Forms.props, null)(SelectForm);

    export class UsuariosLotesSPV extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "Usuario",
            remoteUrl: "base/kontrol/usuarios/all",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            beforeInvoke: (params: any): any => {
                var query = {
                    search: params.term,
                    searchLotes: 1
                };

                return JSON.stringify(query);
            },
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                            "<span class='badge badge-success bold'>" :
                            "<span class='badge badge-danger bold'>",
                        item.id,
                        "</span> ",
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        "<span class='badge badge-info bold'>",
                        item.UbicacionClaveFormato,
                        "</span> ",
                        "<span class='badge badge-warning bold'>",
                        !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                        "</span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    item.Antiguedad >= 0 && item.Antiguedad < 6 ?
                        "<span class='badge badge-success bold'> " :
                        "<span class='badge badge-danger bold'> ",
                    item.id,
                    "</span>",
                    "<span class='bold' style='font-size: 90%'> ",
                    item.Nombre,
                    "</span> ",
                    "<span class='badge badge-info bold'>",
                    item.UbicacionClaveFormato,
                    "</span> ",
                    "<span class='badge badge-warning bold'>",
                    !(item.Desarrollo && item.Desarrollo.Clave) ? "" : item.Desarrollo.Clave,
                    "</span>"
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };
    };

    export class ReportesFallasAreasComuensSPV extends React.Component<ddl.IDropDrownListProps, {}>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "ReporteFalla",
            remoteUrl: "base/scv/ReporteFallasAreasComunes/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "ID",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                //console.log(item);
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-warning bold'>", item.ID, "</span> ",
                        "<span class='badge badge-success bold'>", item.Cliente.ID, "</span> ",
                        "<span class='bold' style='font-size: 90%'>", item.Cliente.Nombre, " </span> ",
                        " <span class='badge badge-warning bold'> ",
                        !(item.Desarrollo && item.DesarrolloClave) ? "" : item.DesarrolloClave,
                        " </span> ",
                        " <span class='badge badge-success bold'> ",
                        !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                        " </span> ",
                    ].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.ID) {
                    return $([
                        "<span class='bold' style='font-size: 90%'> ", item.text, "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-warning bold'>", item.ID, "</span> ",
                    "<span class='badge badge-success bold'>", item.Cliente.ID, "</span> ",
                    "<span class='bold' style='font-size: 90%'>", item.Cliente.Nombre, " </span> ",
                    " <span class='badge badge-warning bold'> ",
                    !(item.Desarrollo && item.DesarrolloClave) ? "" : item.DesarrolloClave,
                    " </span> ",
                    " <span class='badge badge-success bold'> ",
                    !(item.Desarrollo && item.Desarrollo.Nombre) ? "" : item.Desarrollo.Nombre,
                    " </span> ",
                ].join(""));
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            let bi: any = (params: any) => {
                let query: any = {
                    search: params.term
                };

                return JSON.stringify(query);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} beforeInvoke={bi} />;
        };
    };

    export class EventosActividades extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState>{
        static defaultProps: ddl.IDropDrownListProps = {
            id: "EventosActividades",
            remoteUrl: "base/kontrol/EventosActividades/search",
            remoteMethod: "POST",
            limit: 25,
            mode: SelectModeEnum.Single,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 8, 8],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        " <span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        render(): any {
            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            };

            return <ddl.DropdownList$Form {...this.props} {...labels} />;
        };

    };
};

import select = EK.UX.Selects;

import ClientFilter = EK.UX.Selects.ClientFilter;
import ProveedoresSelect = EK.UX.Selects.ProveedoresSelect;
import UbicacionesSelect = EK.UX.Selects.UbicacionesSelect;
import Select = EK.UX.Selects.Select$Form;
import SelectModeEnum = EK.UX.Selects.SelectModeEnum;
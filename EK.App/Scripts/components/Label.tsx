namespace EK.UX.Labels {
    "use strict";
    const w: any = window;
    export interface ILabelProps extends React.Props<any>, grid.IColumn {
        id?: string;
        idForm?: string;
        onClick?: (e: any) => any;
        config?: page.IPageConfig,
        label?: any;
        labelStyle?: React.CSSProperties;
        labelClass?: string;
        link?: string;
        newPageNav?: boolean;
        samePageNav?: boolean;
        value?: any;
        valueStyle?: React.CSSProperties;
        valueClass?: string;
        visible?: boolean;
        labelType?: any;
        mask?: string;
        isHTML?: boolean;
    };
    interface IELabelProps extends ILabelProps {
        entidad?: DataElement,
        formConfiguration?: DataElement,
        page?: any,
        formatValue?: any;
    };

    export class EstatusDashBoardInfo {
        static iconos: any = {
            'A': "glyphicon glyphicon-play",   //ACTIVO
            'W': "fas fa-exclamation-triangle",              //POR VENCER
            'V': "fa fa-times-circle",         //VENCIDO
            'S': "glyphicon glyphicon-pause",  //SUSPENDIDO
            'SINMARCA': ""                     //SIN MARCA
        };

        static iconosColor: any = {
            'A': "#8bc780",                   //ACTIVO
            'W': "#ff8f00",                   //POR VENCER
            'V': "#df0707",                   //VENCIDO
            'S': "",                          //SUSPENDIDO
            'SINMARCA': ""                    //REQUISITO VENCIDO
        };

    };


    const formatShortDate: (d: Date) => string = (d: Date): string => {
        if (d) {
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/");
        }

        return "";
    };
    class Base$Label extends React.Component<ILabelProps, ILabelProps> {
        constructor(props: ILabelProps) {
            super(props);
        }

        static defaultProps: ILabelProps = {
            id: "",
            label: "",
            labelClass: "label-text",
            value: "",
            valueClass: "label-value",
            size: [12, 6, 6, 6],
            isHTML: false,
            visible: true
        };

        refs: {
            requiredPoint: Element;
        };

        shouldComponentUpdate(nextProps: ILabelProps, nextState: ILabelProps): boolean {
            //if (this.props.labelValue!== nextProps.labelValue) {
            return true;
            //} else {
            //    return false;
            //}         
        }

        render(): JSX.Element {



            if (this.props.visible === false) {
                return null;
            };
            let formControlId: string;
            let className: string = "form-control input-sm";
            let formGroupClass: string = "form-group";
            let labelStyle: React.CSSProperties = global.assign({}, this.props.labelStyle);
            let labelClass: string = this.props.labelClass;
            let valueStyle: React.CSSProperties = global.assign({}, this.props.valueStyle);
            let valueClass: string = this.props.valueClass;

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
            };

            const lhStyle = {
                color: 'gray',
                fontSize: 'small'
            };

            let labelValue: any; //= (this.props.labelValue.constructor && this.props.labelValue.constructor.name
            let labelLink: string;

            if (this.props.value === undefined || this.props.value === null) {
                labelValue = "";
            } else {
                let constructorName: string = "";
                labelValue = this.props.value;

                if (labelValue.constructor !== undefined) {
                    let valueConstructor: any = labelValue.constructor;

                    constructorName = valueConstructor.name;
                };

                if (this.props.idForm) {
                    let formValue: any = Forms.getValue(this.props.id, this.props.idForm);
                    if (constructorName === "Function") {
                        labelValue = labelValue(formValue);
                    } else if (constructorName === "Object") {
                        labelValue = formValue.Descripcion
                    }
                    else{
                        labelValue = formValue;
                    }
                };

                if (constructorName === "Date") {
                    labelValue = formatShortDate(labelValue);
                } else {
                    if (this.props.labelType) {
                        if (this.props.labelType === "phone") {
                            labelValue = labelValue.toString();
                            if (labelValue.length < 10) {
                                labelValue = (labelValue + "__________").substring(0, 10);
                            };

                            labelValue = labelValue.replace(/^(\w{2})(\w{4})(\w{4}).*/, '($1) $2 $3');
                        } else if (this.props.labelType === "entidad-list") {
                            let lValue: string;
                            let link: string = this.props.link;
                            //
                            if (labelValue) {
                                if (labelValue.constructor.name === "Object") {
                                    labelValue = !labelValue ? "" : (!labelValue.Clave ? "" : "<span class='badge badge-info'>" + labelValue.Clave + "</span> ") + (!labelValue.Nombre ? "" : labelValue.Nombre);
                                };
                            }
                            else {
                                labelValue = undefined;
                            };
                            //
                            valueClass = "label-value-list";
                            formGroupClass = "label-link";
                            //
                        } else if (this.props.labelType === "link" || this.props.labelType === "link-list") {
                            let lValue: string;
                            let index: number; // = labelValue.indexOf("#");
                            let link: string = this.props.link;
                            //
                            if (labelValue) {
                                if (labelValue.constructor.name === "Object") {
                                    index = -1;
                                    if (link.indexOf(":id") >= 0) {
                                        link = link.replace(":id", labelValue.ID);
                                    };
                                    labelValue = !labelValue ? "" : (!labelValue.Clave ? "" : "<span class='badge'>" + labelValue.Clave + "</span> ") + (!labelValue.Nombre ? "" : labelValue.Nombre);
                                }
                                else {
                                    index = labelValue.indexOf("#");
                                };
                            }
                            else {
                                index = -1;
                                labelLink = undefined;
                                labelValue = undefined;
                            };
                            //
                            if (this.props.labelType === "link-list") {
                                formGroupClass = "label-link";
                            }
                            else {
                                formGroupClass += " label-link";
                            };
                            //
                            if (link) {
                                labelLink = global.getFullUrl(link);
                            }
                            else {
                                if (index >= 0) {
                                    labelLink = global.getFullUrl(labelValue);
                                    labelValue = labelValue.substr(index + 1);
                                }
                            }
                        } else if (this.props.labelType === "Money") {
                            valueStyle.textAlign = "right";
                            labelValue = EK.UX.Labels.formatMoney(labelValue);
                        } else if (this.props.labelType === "OK") {
                            valueStyle.textAlign = "center";
                            valueStyle.backgroundColor = "unset";
                            labelStyle.textAlign = "center";
                            let lValue: boolean = false;
                            if (labelValue !== undefined && labelValue !== null) {
                                if (labelValue === true || labelValue === false) {
                                    lValue = labelValue;
                                } else {
                                    if (labelValue.Clave === "A") {
                                        lValue = true;
                                    }
                                }
                            }

                            labelValue = lValue === true ? EK.UX.Labels.ok(true) : EK.UX.Labels.notOk(true);
                        }
                        else {
                            labelValue = labelValue != undefined && labelValue != null ? labelValue.toString() : "";
                        }
                        
                    };
                };
            };

            let idLabelValue: string;
            let idLabel: string;
            if (this.props.id && this.props.id.length > 0) {
                idLabel = this.props.id;
                idLabelValue = this.props.id + "_value";
            }
            else {
                let idTemp: string = Number(new Date()).toString();
                idLabel = idTemp;
                idLabelValue = idTemp + "_value";
            };

            let configState: DataElement = this.props.config.getState(this.props.idForm);
            //let cellStyle: React.CSSProperties = {};
            //if (global.getData(configState).viewMode === false) {
            //    cellStyle = { minHeight: 55 };
            //};
            //console.log(this.props)
            if (this.props.isHTML === true) {
                //console.log(thisprops)
                return <Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}
                    //style={cellStyle}
                >
                    <div className={formGroupClass}>
                        <div id={idLabel} className={labelClass} style={labelStyle}>{this.props.label}</div>
                        <div id={idLabelValue} className={valueClass} dangerouslySetInnerHTML={{ __html: labelValue }} style={valueStyle}></div>
                    </div>
                </Column>;
            }
            if (this.props.labelType === "link") {
                if (this.props.onClick) {
                    return <Column
                        size={this.props.size}
                        lg={this.props.lg}
                        md={this.props.md}
                        sm={this.props.sm}
                        xs={this.props.xs}>
                        <div className={formGroupClass}>
                            <div id={idLabel} className={labelClass} style={labelStyle}>{this.props.label}</div>
                            <div id={idLabelValue} className={valueClass} style={valueStyle}>
                                <a className="link-text" onClick={() => this.props.onClick(this.props.value) } dangerouslySetInnerHTML={{ __html: labelValue }}></a>
                            </div>
                            <a onClick={() => this.props.onClick(this.props.value) }><i className="fas fa-external-link-square-alt link2"></i> </a>
                        </div>
                    </Column>;
                }
                else {
                    return <Column
                        size={this.props.size}
                        lg={this.props.lg}
                        md={this.props.md}
                        sm={this.props.sm}
                        xs={this.props.xs}>
                        <div className={formGroupClass}>
                            <div id={idLabel} className={labelClass} style={labelStyle}>{this.props.label}</div>
                            <div id={idLabelValue} className={valueClass} style={valueStyle}>
                                <a className="link-text" target='_blank' rel='noopener noreferrer' href={labelLink} dangerouslySetInnerHTML={{ __html: labelValue }}></a>
                            </div>
                            <a href={labelLink}><i className="fad fa-link link1"></i> </a>
                            <a target='_blank' rel='noopener noreferrer' href={labelLink}><i className="fad fa-external-link link2"></i> </a>
                        </div>
                    </Column>;
                }
            }
            else if (this.props.labelType === "link-list") {
                if (labelValue) {
                    return <div className="label-link-grid label-value">
                        <a href={labelLink} className="link2"><i className="fad fa-link link1"></i> </a>
                        <a target='_blank' rel='noopener noreferrer' href={labelLink} className="link2"><i className="fad fa-external-link link2"></i> </a>
                        <a className="link-text" target='_blank' rel='noopener noreferrer' href={labelLink} dangerouslySetInnerHTML={{ __html: labelValue }}></a>
                    </div>;
                }
                else {
                    return null;
                };
            }
            else if (this.props.labelType === "entidad-list") {
                if (labelValue) {
                    return <div id={idLabelValue} className={valueClass} dangerouslySetInnerHTML={{ __html: labelValue }} style={valueStyle}></div>;
                }
                else {
                    return null;
                };
            }
            else {
                return <Column
                    size={this.props.size}
                    lg={this.props.lg}
                    md={this.props.md}
                    sm={this.props.sm}
                    xs={this.props.xs}>
                    <div className={formGroupClass}>
                        <div id={idLabel} className={labelClass} style={labelStyle}>{this.props.label}</div>
                        <div id={idLabelValue} className={valueClass} style={valueStyle}>{labelValue}</div>
                        {this.props.labelType === "link" ? <i className="fa fa-external-link-alt"></i> : null}
                    </div>
                </Column>;
            }
        }
    }
    class $Label extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);
        };
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            formConfiguration: state.global.currentEntityConfiguration,
            page: getData(state.global.page).id
        });
        //
        render(): JSX.Element {
            let $page: any = $ml[this.props.page];
            let value: any = this.props.value;
            let label: string = this.props.label;
            let idForm: string = this.props.idForm;

            let configEntidad: DataElement = this.props.config.getEntity(this.props.idForm);
            let configState: DataElement = this.props.config.getState(this.props.idForm);
            if (isSuccessful(configEntidad)) {
                let entidad: any = {};

                //if (getData(configState).viewMode === true) {
                //    entidad = getData(configEntidad);
                //}
                //else {
                let formValue: any = Forms.getValue(this.props.id, this.props.idForm);
                if (formValue) {
                    entidad[this.props.id] = formValue;
                }
                else {
                    if (this.props.config) {
                        formValue = Forms.getValue(this.props.id, this.props.config.id);
                    };
                    if (formValue) {
                        entidad[this.props.id] = formValue;
                    }
                    else {
                        entidad = getData(configEntidad);
                    };
                };
                //};

                if (!value) {
                    value = entidad[this.props.id];
                }
                else {
                    if (value.constructor.name === "Function") {
                        if (this.props.labelType === "custom") {
                            value = value(entidad);
                        }
                        else {
                            value = value(entidad[this.props.id], entidad);
                        };
                    };
                };
                idForm = undefined;
            };
            // label
            if ($page && $page.form && this.props.id) {
                let mlKey: string = this.props.id;

                if (this.props.idForm) {
                    if ($page.form[this.props.idForm] && $page.form[this.props.idForm][mlKey]) {
                        if (!this.props.label) {
                            label = $page.form[this.props.idForm][mlKey].label;
                        };
                    };
                }
                else {
                    if ($page.form[mlKey]) {
                        if (!this.props.label) {
                            label = $page.form[mlKey].label;
                        };
                    };
                };
            };
            //value
            if (value === null) {
                let formValue: any = Forms.getValue(this.props.id, this.props.idForm);
                value = formValue;
            };

            let valueStyle: any = this.props.valueStyle ? this.props.valueStyle : {};
            if (this.props.isHTML === true && value) {
                valueStyle = { textAlign: "center", padding: "3px 0px", width: "100%", fontWeight: 600 };
                if (value.BGColor) {
                    valueStyle.backgroundColor = value.BGColor;
                }
                if (value.BGColor) {
                    valueStyle.color = value.Color;
                }
            }
            //
            if (this.props.formatValue) {
                value = this.props.formatValue(value);
            };
            //
            
            return <Base$Label {...this.props} idForm={idForm} value={value} label={label} />;
        };
    };

    class $LabelHigh extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);
        };
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            formConfiguration: state.global.currentEntityConfiguration,
            page: getData(state.global.page).id
        });
        //
        render(): JSX.Element {
            let $page: any = $ml[this.props.page];
            let value: any = this.props.value;
            let label: string = this.props.label;
            let idForm: string = this.props.idForm;

            let configEntidad: DataElement = this.props.config.getEntity(this.props.idForm);
            let configState: DataElement = this.props.config.getState(this.props.idForm);
            if (isSuccessful(configEntidad)) {
                let entidad: any = {};

                //if (getData(configState).viewMode === true) {
                //    entidad = getData(configEntidad);
                //}
                //else {
                let formValue: any = Forms.getValue(this.props.id, this.props.idForm);
                if (formValue) {
                    entidad[this.props.id] = formValue;
                }
                else {
                    if (this.props.config) {
                        formValue = Forms.getValue(this.props.id, this.props.config.id);
                    };
                    if (formValue) {
                        entidad[this.props.id] = formValue;
                    }
                    else {
                        entidad = getData(configEntidad);
                    };
                };
                //};

                if (!value) {
                    value = entidad[this.props.id];
                }
                else {
                    if (value.constructor.name === "Function") {
                        if (this.props.labelType === "custom") {
                            value = value(entidad);
                        }
                        else {
                            value = value(entidad[this.props.id], entidad);
                        };
                    };
                };
                idForm = undefined;
            };
            // label
            if ($page && $page.form && this.props.id) {
                let mlKey: string = this.props.id;

                if (this.props.idForm) {
                    if ($page.form[this.props.idForm] && $page.form[this.props.idForm][mlKey]) {
                        if (!this.props.label) {
                            label = $page.form[this.props.idForm][mlKey].label;
                        };
                    };
                }
                else {
                    if ($page.form[mlKey]) {
                        if (!this.props.label) {
                            label = $page.form[mlKey].label;
                        };
                    };
                };
            };
            //value
            if (value === null) {
                let formValue: any = Forms.getValue(this.props.id, this.props.idForm);
                value = formValue;
            };

            let valueStyle: any = this.props.valueStyle ? this.props.valueStyle : {};
            if (this.props.isHTML === true && value) {
                valueStyle = { textAlign: "center", padding: "3px 0px", width: "100%", fontWeight: 600 };
                if (value.BGColor) {
                    valueStyle.backgroundColor = value.BGColor;
                }
                if (value.BGColor) {
                    valueStyle.color = value.Color;
                }
            }
            //
            if (this.props.formatValue) {
                value = this.props.formatValue(value);
            };
            //
            let estilo: React.CSSProperties = global.assign({}, this.props.labelStyle);
            estilo.height = '100px';
            estilo.background = '#ECEFF1';
            estilo.padding = '0px'
            estilo.wordBreak = 'break-all';
            estilo.whiteSpace = 'initial';
            estilo.padding = '4px';
            //var estilo = { height: '120px', background:'#ECEFF1' };
            return <Base$Label {...this.props} valueStyle={estilo} idForm={idForm} value={value} label={label} />;
        };
    };

    export const Label: any = ReactRedux.connect($Label.props, null)($Label);
    export const LabelHeight: any = ReactRedux.connect($Label.props, null)($LabelHigh);

    export class Empty extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Empty",
            size: [1, 1, 1, 1],
            labelClass: "label-text-empty",
            valueClass: "label-value-empty"
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };

    export class Clave extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Clave",
            size: [2, 2, 2, 2]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };

    interface IClaveUbicaciones extends IELabelProps {
        desarrollo?: any;
    };
    export const
        ClaveUbicaciones: any = global.connect(class extends React.Component<IClaveUbicaciones, IClaveUbicaciones> {
            static props: any = (state: any) => ({
                config: global.createPageConfigFromState(state.global),
                desarrollo: state.global.currentEntity$desarrollo
            });
            static defaultProps: IClaveUbicaciones = {
                id: "Clave"
            };
            initLabel(): void {
                let labelValue: any = $("#" + this.props.id + "_value");

                let entity: DataElement = this.props.config.getEntity();
                let mascaraClave: string = "";
                let mascaraLength: number = 0;
                if (global.isSuccessful(entity)) {
                    let data: any = getData(entity);
                    let desarrolloEntity: any = getData(this.props.desarrollo).FormatoClave;
                    if (data.Desarrollo && data.Desarrollo.FormatoClave || desarrolloEntity) {
                        let formato: any[] = data.Desarrollo && data.Desarrollo.FormatoClave ? data.Desarrollo.FormatoClave : desarrolloEntity;
                        if (formato && formato.length > 0) {
                            formato.forEach((value: any, index: number) => {
                                if (mascaraClave.length > 0) {
                                    mascaraClave += "-";
                                }
                                mascaraClave += "[A|9]{" + value.Longitud + "}";
                                mascaraLength += parseInt(value.Longitud);
                            });
                        };
                    };
                    labelValue.inputmask({ mask: mascaraClave })
                };
            };
            componentDidMount(): any {
                this.initLabel();
            };
            componentDidUpdate(): any {
                this.initLabel();
            };
            render(): any {

                return <Label {...this.props} />;
            };
        });

    export class Expediente extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [12, 12, 12, 12],
            value: (item: any) => {
                let valor: string = item && item.ID > 0 ? "<span class='badge badge-info'>" + item.ID + "</span> ": "";
                return valor;
            }
        };
        render(): any {
            return <Label {...this.props} isHTML={true} />;
        };
    };

    export class Insumo extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [12, 12, 12, 12],
            value: (item: any) => {
                if (!(item && item.Clasificacion)) {
                    return "";
                };

                return [
                    "<span class='badge' style='background-color:", item.Clasificacion.Color, "'>", item.Clasificacion.Nombre, "</span> ",
                    "<span class='badge badge-success'>", item.ClaveInsumo ? item.ClaveInsumo : item.Clave, "</span> ",
                    "<span> ", item.Nombre, "</span>"
                ].join("");
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true} />;
        };
    };

    export class TipoConcepto extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [12, 12, 12, 12],
            value: (item: any) => {
                if (!(item)) {
                    return "";
                };
             return [
                 "<span style='margin-right: 15px;color: ", item.Color,
                 , "'class='", item.Icono, "'></span>",
                 "<span class='badge' style='background-color:", item.Color, "'>", item.Clave, "</span> ",
                 "<span> ", item.Nombre, "</span>"
                ].join("");
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true} />;
        };
    };

    export class Tabulador extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [12, 12, 4, 4],
            value: (item: any) => {
                if (!(item)) {
                    return "";
                };

                return `
                  <a className="link-text" target='_blank' rel='noopener noreferrer' href=#/scco/TabuladoresInsumos/${item.ID}>
                    <span class='badge badge-info'>${item.Clave}</span>
                    <span style='font-size: 90%'>${item.Nombre}</span>
                    <span class='badge badge-warning'>${!(item.Moneda) ? "" : item.Moneda.Nombre}</span>
                </a>`
            }
        };
        render(): any {
            return <Label {...this.props} labelType="link" isHTML={true} />;
        };
    };

    export class HTML extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [12, 12, 12, 12]
        };
        render(): any {
            return <Label {...this.props} isHTML={true} />;
        };
    };

    export class Color extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Color",
            size: [12, 12, 12, 12],
            value: (item: any) => {
                let valor: string = !item ? "" : "<span><span style='width: 16px; height: 16px; float: left; background-color:" + item + "; margin-right: 2px;'></span><span>" + item + "</span></span>";
                return valor;
            }
        };
        render(): any {
            return <Label {...this.props} isHTML={true} />;
        };
    };

    export class Link extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Link",
            size: [2, 2, 2, 2],
            newPageNav: true,
            samePageNav: false
        };
        render(): any {
            return <Label {...this.props} labelType="link" />;
        };
    };

    export class LinkList extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Link",
            size: [2, 2, 2, 2],
            newPageNav: true,
            samePageNav: false
        };
        render(): any {
            return <Label {...this.props} labelType="link-list" />;
        };
    };

    export class Nombre extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Nombre",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };

    export class Descripcion extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Descripcion",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    //valor
    export class Valor extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Valor",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    //end valor
    //padre
    export class Padre extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Padre",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    //end padre
    //categoria
    export class Categoria extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Categoria",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    //end Categoria
    //Usuario
    export class Usuario extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Usuario",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    //end Usuario
    //Rango
    export class Rango extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Rango",
            size: [10, 10, 10, 10]
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    //end Rango
    export class Asentamiento extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Asentamiento",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? " " : item.CP + " " + item.Nombre + ", " + item.Localidad.Nombre;
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class PosicionUsuario extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return !item ? "" : (!item.Usuario ? "" : item.Usuario.Nombre + " " + item.Usuario.Apellidos)+ (!item.Nombre ? "" : "<span style='margin-left:2px' class='badge badge-info'>" + item.Nombre + "</span>");
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true} />;
        };
    };
    export class Usuarios extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Usuario",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" : item.Nombre + " " + item.Apellidos;
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Cliente extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Cliente",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" : 
                    (!item.Nombre ? "" : item.Nombre + " ") +
                    (!item.ApellidoPaterno ? "" : item.ApellidoPaterno + " ") +
                    (!item.ApellidoMaterno ? "" : item.ApellidoMaterno);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Localidad extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Asentamiento",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" : (!item.CP ? "" : "(" + item.CP + ") ") + (!item.Nombre ? "" : item.Nombre+ " ") + (item.Localidad == null ? "" : item.Localidad.Nombre);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class TipoObra extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Obra",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" : (!item.Clave ? "" : "<span class='badge badge-info'>" + item.Clave + "</span> ") + (!item.TipoObra.Nombre ? "" : item.TipoObra.Nombre);
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true} />;
        };
    };
    export class TabuladorMoneda extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Tabulador",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" : (!item.CostoDirecto ? "" : "<span class='badge badge-info'>" + item.CostoDirecto + "</span> ") + (!item.Tabulador.Moneda.Clave ? "" : item.Tabulador.Moneda.Clave);
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true} />;
        };
    };
    export class General extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "General",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" :item.Nombre;
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };

    export class GeneralClave extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "General",
            size: [10, 10, 10, 10],
            value: (item: any) => {
                return !item ? "" : item.Clave;
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
 
    export class Entidad extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return !item ? "" : (!item.Clave ? "" : "<span class='badge badge-info'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true}/>;
        };
    };
    export class BadgeValue extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return !item ? "" : "<span class='badge badge-info'>" + item + "</span>";
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" isHTML={true} />;
        };
    };


    export class EntidadList extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6]
        };
        render(): any {
            return <Label {...this.props} labelType="entidad-list" />;
        };
    };

    export class EntidadDescripcion extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return !item ? "" : (!item.Clave ? "" : "(" + item.Clave + ") ") + (!item.Descripcion ? "" : item.Descripcion);
            }
        };
        render(): any {
            return <Label {...this.props} labelType="entidad" />;
        };
    };

    export class Fecha extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);
        };
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return global.formatDate(item);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class FechaBadge extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);
        };
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: (item: any): any => {
                if (item) {
                    return "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>" + global.formatDate(item) + "</span>";
                }
                else {
                    return "<span class='badge' style='padding: 4px 15px 4px; height: 100%;'> - </span>";
                }
            }
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom"
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ textAlign: "center" }}
                valueClass=""
            />;
        };
    };
    export class FechaHora extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);
        };
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return global.formatDateTime(item);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Currency extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return formatMoney(item);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Decimal extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return formatDecimal(item);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Moneda extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                if (!item || item === null) {
                    return "";
                };
                return (item.MoneySymbol+" "+item.Clave+" "+item.Nombre);
            }
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Boolean extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                let retValue: string = "";
                let Valor: any = {};
                Valor['true'] = true;
                Valor['false'] = false;
                Valor['1'] = true;
                Valor['0'] = false;
                Valor['A'] = true;
                Valor['B'] = false;
                Valor['PRI'] = true;
                Valor['PUB'] = false;
                let itemValue: boolean = null;
                if (item != undefined)
                {
                    switch (item.constructor.name) {
                        case "Object":
                            itemValue = Valor[item.Clave];
                            break;
                        case "Boolean":
                            itemValue = Valor[item];
                            break;
                        case "Number":
                            itemValue = Valor[item];
                            break;
                        case "String":
                            itemValue = Valor[item];
                            break
                        default:
                            break;
                    }
                }
                //Asigna valor al elementos
                switch (itemValue) {
                    case true:
                retValue = "<span class='label-true'><i class='fa fa-check'></i></span><span class='label-false-undef'><i class='fas fa-times'></i></span>";
                        break;
                    case false:
                        retValue = "<span class='label-true-undef'><i class='fa fa-check'></i></span><span class='label-false'><i class='fas fa-times'></i></span>";
                        break;
                    default:
                        retValue = "<span class='label-true-undef'><i class='fa fa-check'></i></span><span class='label-false-undef'><i class='fas fa-times'></i></span>";
                        break;
                }
                return retValue;
            },
        };
        render(): any {
            return <Label {...this.props} isHTML={true}
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: "5px 0px" }}
                valueClass=""
            />;
        };
    };

    export class Estatus extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Estatus",
            size: [6, 6, 6, 6]
        };
        render(): any {
            return <Boolean {...this.props} />;
        };
    };
    export class BooleanCheckBox extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            value: (item: any) => {
                let retValue: string = "";
                let Valor: any = {};
                Valor['PRI'] = true;
                Valor['PUB'] = false;
                let itemValue: boolean = null;
                if (item != undefined) {
                    switch (item.constructor.name) {
                        case "Object":
                            itemValue = Valor[item.Clave];
                            break;
                        case "Boolean":
                            itemValue = Valor[item];
                            break;
                        case "Number":
                            itemValue = Valor[item];
                            break;
                        case "String":
                            itemValue = Valor[item];
                            break
                        default:
                            break;
                    }
                }
                switch (itemValue) {
                    case true:
                        retValue = "<span class='icheckbox_line icheckbox_line-green' style='cursor:auto; padding-right: 0px;padding-left: 0px;'><div class='fas fa-lock' style=' margin-left: 25px; margin-right: 10px;'></div></span>";
                        break;
                    case false:
                        retValue = "<span class='icheckbox_line icheckbox_line-red' style='cursor:auto; padding-right: 0px;padding-left: 0px;'><div class='fas fa-globe-americas' style=' margin-left: 25px; margin-right: 10px;'></div></span>";
                        break;
                    default:
                        retValue = "<span class='icheckbox_line icheckbox_line-red' style='cursor:auto; padding-right: 0px;padding-left: 0px;'><div class='fas fa-globe-americas' style=' margin-left: 25px; margin-right: 10px;'></div></span>";
                        break;
                }
                return retValue;
            },
        };
        render(): any {
            return <Label {...this.props} isHTML={true}
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: "5px 0px" }}
                valueClass=""
            />;
        };
    };
    export class TipoVisualizacion extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "TipoVisualizacion",
            size: [6, 6, 6, 6]
        };
        render(): any {
            return <BooleanCheckBox {...this.props} />;
        };
    };

    export class Privado extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Privado",
            size: [6, 6, 6, 6]
        };
        render(): any {
            return <Boolean {...this.props} />;
        };
    };

     const formatGoodValue: (item: any) => any = (item: any) : any => {
        let fecha: string = global.formatDateTime(item[1]);
        let retValue: string;
        if (item[1]) {
            if (!item[0]) {
                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" +
                    fecha +
                    "</span>";
            }
            else {
                retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] + "<span style='font-size: 90%;'>" + fecha + "</span>" +
                    "</span>";
            };
        }
        else {
            retValue = "<span class='badge bg-green-jungle bg-font-green-jungle' style='padding: 4px 15px 4px; height: 100%;'>" +
                item[0] +
                "</span>";
        };

        return retValue;
    };
    export class BadgeApprovedDate extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: formatGoodValue
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom" 
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: "0px 0px" }} />;
        };
    };
    const formatBadValue: (item: any) => any = (item: any): any => {
        let fecha: string = global.formatDateTime(item[1]);
        let retValue: string;
        if (item[1]) {
            if (!item[0]) {
                retValue = "<span class='badge bg-red-flamingo bg-font-red-flamingo' style='padding: 4px 15px 4px; height: 100%;'>" +
                    fecha +
                    "</span>";
            }
            else {
                retValue = "<span class='badge bg-red-flamingo bg-font-red-flamingo' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] + "<span style='font-size: 90%;'>" + fecha + "</span>" +
                    "</span>";
            };
        }
        else {
            retValue = "<span class='badge bg-red-flamingo bg-font-red-flamingo' style='padding: 4px 15px 4px; height: 100%;'>" +
                item[0] +
                "</span>";
        };

        return retValue;
    };
    export class BadgeRejectedDate extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: formatBadValue
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom"
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: "0px 0px" }} />;
        };
    };
    const formatDefaultValue: (item: any) => any = (item: any): any => {
        let fecha: string = global.formatDateTime(item[1]);
        let retValue: string;
        if (item[1]) {
            if (!item[0]) {
                retValue = "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>" +
                    fecha +
                    "</span>";
            }
            else {
                retValue = "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] + "<span style='font-size: 90%;'>" + fecha + "</span>" +
                    "</span>";
            };
        }
        else {
            if (item[0]) {
                retValue = "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] +
                    "</span>";
            }
            else {
                retValue = "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>-</span>";
            };
        };

        return retValue;
    };

    const formatPredeterminedValue: (item: any) => any = (item: any): any => {
        let fecha: string = global.formatDateTime(item[1]);
        let retValue: string;
        if (item[1]) {
            if (!item[0]) {
                retValue = "<span class='badge bg-grey-salsa bg-font-grey-salsa' style='padding: 4px 15px 4px; height: 100%;'>" +
                    fecha +
                    "</span>";
            }
            else {
                retValue = "<span class='badge bg-grey-salsa bg-font-grey-salsa' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] + "<span style='font-size: 90%;'>" + fecha + "</span>" +
                    "</span>";
            };
        }
        else {
            if (item[0]) {
                retValue = "<span class='badge bg-grey-salsa bg-font-grey-salsa' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] +
                    "</span>";
            }
            else {
                retValue = "<span class='badge bg-grey-salsa bg-font-grey-salsa' style='padding: 4px 15px 4px; height: 100%;'>-</span>";
            };
        };

        return retValue;
    };

    export class BadgeDefaultDate extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: formatDefaultValue
        };
        render(): any {
            return <Column size={this.props.size}>
                <div className="well well-sm bg-transparent radius5px lighDownShadow">
                    <Label {...this.props} size={""} isHTML={true} labelType="custom"
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: 3 }}
                        valueClass=""
                    />
                </div>
            </Column>;
        };
    };
    export class Folio extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: (item: any): any => {
                return "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>" + item + "</span>";
            }
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom"
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ textAlign: "center" }}
                valueClass=""
            />;
        };
    };
    export class EntidadBadge extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: (item: any): any => {
                return "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%;'>" + (item ? item.Nombre : "") + "</span>";
            }
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom"
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ textAlign: "center" }}
                valueClass=""
            />;
        };
    };
    export class BadgeCGV extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: (item: any): any =>
            {
                return "<span class='badge bg-blue bg-font-blue' style='padding: 4px 15px 4px; height: 100%; font-weight:600'>" + item + "</span>";
            }
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom" 
                labelStyle={{ textAlign: "center" }}
                valueStyle={{ textAlign: "center", width: "100%" }}
                valueClass="badge"
            />;
        };
    };
    export class BadgeDefaultDateSM extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6],
            formatValue: formatDefaultValue
        };
        render(): any {
            return <Label {...this.props} isHTML={true} labelType="custom"
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: 3 }}
                        valueClass=""
            />;
        };
    };
    //
      const formatWarningValue: (item: any) => any = (item: any): any => {
        let fecha: string = global.formatDateTime(item[1]);
        let retValue: string;
        if (item[1]) {
            if (!item[0]) {
                retValue = "<div class='badge bg-yellow-gold bg-font-yellow-gold' style='padding: 4px 15px 4px; height: 100%;'>" +
                    fecha +
                    "</div>";
            }
            else {
                retValue = "<div class='badge bg-yellow-gold bg-font-yellow-gold' style='padding: 4px 15px 4px; height: 100%;'>" +
                    item[0] + "<div style='font-size: 90%;'>" + fecha + "</div>" +
                    "</div>";
            };
        }
        else {
            retValue = "<div class='badge bg-yellow-gold bg-font-yellow-gold' style='padding: 4px 15px 4px; height: 100%;'>" +
                item[0] +
                "</div>";
        };

        return retValue;
    };
    export class EstatusTarea extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "EstatusTarea",
            size: [6, 6, 6, 6],
            value: (item: any) => {
                if (!item || !(item.ID > 0)) {
                    return ["","",""];
                };
                return [item.Estatus.Nombre, item.FechaAprobacion, item.Estatus.Clave];
            },
            formatValue: (item: any) => {
                let fecha: string = global.formatDateTime(item[1]);
                let retValue: string;

                if (item[2] === "AP" || item[2] == "ASIG")
                {
                    retValue = formatGoodValue(item);
                }
                else if (item[2] === "AS" || item[2] === "PA" || item[2] === "D" || item[2] == "CAP")
                {
                    retValue = formatDefaultValue(item);
                }
                else if (item[2] === "RE" || item[2] === "CA" || item[2] === "DE")
                {
                    retValue = formatBadValue(item);
                }
                else if (item[2] === "NOE")
                {
                    retValue = formatPredeterminedValue(item);
                }
                else {
                    retValue = formatDefaultValue("-");
                };

                return retValue;
            }
        };
        render(): any {
            return <Column size={this.props.size}>
                <div>
                    <Label {...this.props} size={""} isHTML={true} labelType="custom"
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: 3 }}
                        valueClass=""
                    />
                </div>
            </Column>;
        };
    };
    export class EstatusVigencia extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "EstatusVigencia",
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return [null, item.FechaVigencia, item.EstatusVigencia];
            },
            formatValue: (item: any) => {
                let fecha: string = global.formatDateTime(item[0]);
                let retValue: string;

                if (item[2] === 0) {
                    retValue = formatDefaultValue(item);
                }
                else if (item[2] === 1) {
                    retValue = formatGoodValue(item);
                }
                else if (item[2] === 2) {
                    retValue = formatWarningValue(item);
                }
                else if (item[2] === 3) {
                    retValue = formatBadValue(item);
                };

                return retValue;
            }
        };
        render(): any {
            return <Column size={this.props.size}>
                <div className="well well-sm bg-transparent radius5px lighDownShadow" style={{ padding:"0" }}>
                    <Label {...this.props} size={""} isHTML={true} labelType="custom"
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: 3 }}
                        valueClass=""
                    />
                </div>
            </Column>;
        };
    };
    export class EstatusFlujo extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "EstatusTarea",
            size: [6, 6, 6, 6],
            value: (item: any) => {
                return [item.Estatus.Nombre, item.FechaFin, item.Estatus.Clave];
            },
            formatValue: (item: any) => {
                let fecha: string = global.formatDateTime(item[1]);
                let retValue: string;

                if (item[2] === "AP") {
                    retValue = formatGoodValue(item);
                }
                else if (item[2] === "EP") {
                    retValue = formatDefaultValue(item);
                }
                else if (item[2] === "RE" || item[2] === "CA") {
                    retValue = formatBadValue(item);
                };

                return retValue;
            }
        };
        render(): any {
            return <Column size={this.props.size}>
                <div className="well well-sm bg-transparent radius5px lighDownShadow" style={{ padding:0 }}>
                    <Label {...this.props} size={""} isHTML={true} labelType="custom"
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: 3 }}
                        valueClass="" />
                </div>
            </Column>;
        };
    };

    export class EstatusColor extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Estatus",
            size: [6, 6, 6, 6],
            value: undefined,
            formatValue: (item: any) => {
                let retValue: string;
                if (item[2] === "VERDE") {
                    retValue = formatGoodValue(item);
                }
                else if (item[2] === "AZUL") {
                    retValue = formatDefaultValue(item);
                }
                else if (item[2] === "ROJO") {
                    retValue = formatBadValue(item);
                }
                else if (item[2] === "AMARILLO") {
                    retValue = formatWarningValue(item);
                }
                return retValue;
            }
        };
        render(): any {
            return <Column size={this.props.size}>
                <div>
                    <Label {...this.props} size={""} isHTML={true} labelType="custom"
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: "transparent", textAlign: "center", padding: 3 }}
                        valueClass=""
                    />
                </div>
            </Column>;
        };
    };

    export class Custom extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            size: [6, 6, 6, 6]
        };
        render(): any {
            return <Label {...this.props} labelType="custom" />;
        };
    };
    export class RFC extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);

            this.initLabel = this.initLabel.bind(this);
        };
        static defaultProps: IELabelProps = {
            id: "RFC",
            size: [6, 6, 3, 3]
        };
        initLabel(): void {
            let labelValue: any = $("#" + this.props.id + "_value");
            labelValue.inputmask({ mask: "A{3,4}-999999-[A|9][A|9][A|9]" })
        };
        componentDidMount(): any {
            this.initLabel();
        };
        componentDidUpdate(): any {
            this.initLabel();
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class CURP extends React.Component<IELabelProps, IELabelProps> {
        constructor(props: IELabelProps) {
            super(props);

            this.initLabel = this.initLabel.bind(this);
        };
        static defaultProps: IELabelProps = {
            id: "CURP",
            size: [6, 6, 3, 3]
        };
        initLabel(): void {
            let labelValue: any = $("#" + this.props.id + "_value");
            labelValue.inputmask({ mask: "A{3,4}-999999-AAAAAA-99" })
        };
        componentDidMount(): any {
            this.initLabel();
        };
        componentDidUpdate(): any {
            this.initLabel();
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class Telefono extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {
            id: "Telefono",
            size: [6, 6, 3, 3]
        };
        componentDidMount(): any {
            let labelValue: any = $("#" + this.props.id + "_value");
            labelValue.inputmask({ mask: "99-9999-9999" })
        };
        componentDidUpdate(): any {
            let labelValue: any = $("#" + this.props.id + "_value");
            labelValue.inputmask({ mask: "99-9999-9999" })
        };
        render(): any {
            return <Label {...this.props} />;
        };
    };
    export class TelefonoValue extends React.Component<IELabelProps, IELabelProps> {
        static defaultProps: IELabelProps = {};
        refs: {
            label: Element;
        };
        componentDidMount(): any {
            let labelValue: any = $(this.refs.label);
            labelValue.inputmask({ mask: "99-9999-9999" })
        };
        componentDidUpdate(): any {
            let labelValue: any = $(this.refs.label);
            labelValue.inputmask({ mask: "99-9999-9999" })
        };
        render(): any {
            return <div ref="label">{this.props.value}</div>;
        };
    };
    export const yes: (data: any) => any = (data: any): any => {
        var retValue: any;

        if (data === true) {
            retValue = <span key="okLabel" className="icon-ek-131" style={{ fontSize: 15 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        }
        return retValue;
    };
    export const ok: (data: any) => any = (data: any): any => {
        var retValue: any;

        if (data === true || data === "A") {
            retValue = <span key="okLabel" className="icon-ek-131" style={{ fontSize: 18 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        } else {
            retValue = <span key="notOkLabel" className="icon-ek-132" style={{ fontSize: 18 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        }
        return retValue;
    };

    export const bool: (data: any) => any = (data: any): any => {
        var retValue: any;

        if (data === true) {
            retValue = <span key="okLabel" className="icon-ek-131" style={{ fontSize: 24 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        } else {
            retValue = <span style={{ fontSize: 16 }}>
                <span className="fas fa-minus"></span><span className="path2"></span>
            </span>;
        }
        return retValue;
    };



    export const notOk: (data: boolean) => any = (data: boolean): any => {
        var retValue: any;

        if (data === true) {
            retValue = <span key="notOkLabel" className="icon-ek-132" style={{ fontSize: 18 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        };

        return retValue;
    };
    export const badgeEstatus: (data: any) => any = (data: any): any => {
        var retValue: any;
        if (data && data.Clave) {
            let code: string = data.Clave.toLowerCase();
            if (code === "a") {
                retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
            if (code === "b") {
                retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
        }
        else {
            if (data === 1 || data === true) {
                retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
            else if (data === 0 || data === false) {
                retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
        }
        return retValue;
    };
    export const badgeEstatusSoloActivo: (data: any) => any = (data: any): any => {
        var retValue: any;
        if (data && data.Clave) {
            let code: string = data.Clave.toLowerCase();
            if (code === "a") {
                retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
            if (code === "b") {
                retValue =    <span ></span>;
            }
        }
        else {
            if (data === 1 || data === true) {
                retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
            else if (data === 0 || data === false) {
                retValue = <span ></span>;
            }
        }
        return retValue;
    };

    export const badgeBloqueado: (data: boolean) => any = (data: any): any => {
        let retValue: any;

        if (data === true) {
            retValue = <span key="badgeBloqueado" className="icon-ek-134" style={{ fontSize: 24 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        } else {
            retValue = <span key="badgeBloqueado" className="icon-ek-133" style={{ fontSize: 24 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        }

        return retValue;
    };

    export const badgeEstatusString: (data: any) => any = (data: any): any => {
        var retValue: string;
        let code: string = "";

        if (data === true || data === false) 
        {
            code = data === true ? "a" : "b";
        }
        else {
            if (data && data.Clave) {
                code = data.Clave.toLowerCase();
            };
        };

        if (code === "a") {
            retValue = "<span key=\"badgeEstatus\" class=\"icon-ek-131\" style=\"font-size:20px\">\
                    <span class=\"path1\"></span><span class=\"path2\"></span>\
                </span>";
        }
        if (code === "b") {
            retValue = "<span key=\"badgeEstatus\" class=\"icon-ek-132\" style=\"font-size:20px\">\
                    <span class=\"path1\"></span><span class=\"path2\"></span>\
                </span>";
        };


        return retValue;
    };
    export const badgeBloqueadoString: (data: boolean) => any = (data: any): any => {
        let retValue: string;

        if (data === true) {
            retValue = "<span key=\"badgeBloqueado\" class=\"icon-ek-134\" style=\"font-size: 20px\">\
                <span class=\"path1\"></span><span class=\"path2\"></span>\
            </span>";
        } else {
            retValue = "<span key=\"badgeBloqueado\" class=\"icon-ek-133\" style=\"font-size: 20px\">\
                <span class=\"path1\"></span><span class=\"path2\"></span>\
            </span>";
        }

        return retValue;
    };

    export const badgeFileType: (tipo: any, extension: any) => any = (tipo: string, extension: string): any => {
        let retValue: any;
        let iconClass: string = IconFileTypeEnum.app.iconClass;

        if (tipo) {
            if (tipo.match(IconFileTypeEnum.app.allowed)) {
                iconClass = IconFileTypeEnum.app.iconClass;

                if (extension.match(IconFileTypeEnum.excel.allowed)) {
                    iconClass = IconFileTypeEnum.excel.iconClass;
                }
                else if (extension.match(IconFileTypeEnum.pdf.allowed)) {
                    iconClass = IconFileTypeEnum.pdf.iconClass;
                }
                else if (extension.match(IconFileTypeEnum.word.allowed)) {
                    iconClass = IconFileTypeEnum.word.iconClass;
                }
                else if (extension.match(IconFileTypeEnum.zip.allowed)) {
                    iconClass = IconFileTypeEnum.zip.iconClass;
                }
                else if (extension.match(IconFileTypeEnum.code.allowed)) {
                    iconClass = IconFileTypeEnum.code.iconClass;
                }
                else if (extension.match(IconFileTypeEnum.powerpoint.allowed)) {
                    iconClass = IconFileTypeEnum.powerpoint.iconClass;
                }
            }
            else if (tipo.match(IconFileTypeEnum.audio.allowed)) {
                iconClass = IconFileTypeEnum.audio.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.sound.allowed)) {
                iconClass = IconFileTypeEnum.sound.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.movie.allowed)) {
                iconClass = IconFileTypeEnum.movie.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.picture.allowed)) {
                iconClass = IconFileTypeEnum.picture.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.video.allowed)) {
                iconClass = IconFileTypeEnum.video.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.image.allowed)) {
                iconClass = IconFileTypeEnum.image.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.photo.allowed)) {
                iconClass = IconFileTypeEnum.photo.iconClass;
            }
            else if (tipo.match(IconFileTypeEnum.text.allowed)) {
                iconClass = IconFileTypeEnum.text.iconClass;
            }
        }

        return <span className={iconClass} style={{ fontSize: "inherit" }}>
            <span className="path1"></span><span className="path2"></span>
        </span>
    };

    export const badgeClasificador: (data: string) => any = (data: any): any => {
        let retValue: any;

        if (data === "S") {
            retValue = <span className="icon-ek-059" style={{ fontSize: 20 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        }
        else
        {
            retValue = <span className="icon-ek-059" style={{
                fontSize: 20, color: "#b7b2b2" }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        }

        return retValue;
    };

    export const formatHTMLLabel: (header: string, label: string) => string = (header: string, label: string): string => {
        return "<div class='form-group'>" +
            "<div class='label-text'>" + header + "</div>" +
            "<div class='label-value'>" + label + "</div></div>";
    };

    export const formatConfigExpediente: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>
            <div className="btn default btn-circle btn-xs" title="Configuracion">
                <a style={{ color: "gray" }} href={"../#/scv/expedientes/configuracion/" + data}> <i className='glyphicon glyphicon-cog'></i></a>
            </div>
        </div>);
    };

    export const formatEstatusSeguimiento: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let icons: string[] = [];
        let color: string[] = [];
        let colorIcono: string[] = [];
        icons['A'] = "glyphicon glyphicon-play";
        icons['C'] = "glyphicon glyphicon-stop";
        icons['F'] = "glyphicon glyphicon-ok";
        icons['S'] = "glyphicon glyphicon-pause";

        color['A'] = "#33b752";
        color['C'] = "#fa0707";
        color['F'] = "#33b752";
        color['S'] = "#ff8f00";


        colorIcono['A'] = "#8c7777";
        colorIcono['C'] = "#8c7777";
        colorIcono['F'] = "#d9d7d7";
        colorIcono['S'] = "#8c7777";

        return w.ReactDOMServer.renderToStaticMarkup(
            <div style={{ width: "100%", fontSize: "11px", lineHeight: "1.42857", textAlign: "center"}}>
                <div style={{ float: "left", width: "33.3%", texAlign: "center", border: "1px solid #e7ecf1", borderRight: "none", height: "15px"}}>
                    <i className={icons[data.Prospeccion.Clave]} style={{ color: colorIcono[data.Prospeccion.Clave]}} ></i><span style={{ display: "inline-block", fontSize: "10px" }}></span>
                    <div className="progress" style={{ marginBottom: "0px", height: "4px", marginRight: "-1px"}}>
                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: data.CantOrdSegAvanProsp + "%", fontSize: "8px", textAlign: "right", background: color[data.Prospeccion.Clave] }}></div>
                    </div>
                </div>
                <div style={{ float: "left", width: "33.3%", textAlign: "center", border: "1px solid #e7ecf1", borderRight: "none", height: "15px" }}>
                    <i className={icons[data.Venta.Clave]} style={{ color: colorIcono[data.Venta.Clave] }}  ></i><span style={{ display: "inline-block", fontSize: "10px" }}></span>
                    <div className="progress" style={{ marginBottom: "0px", height: "4px", marginRight: "-1px"}}>
                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: data.CantOrdSegAvanVenta+"%", fontSize: "8px", textAlign: "right", background: color[data.Venta.Clave] }}></div>
                    </div>
                </div>
                <div style={{ float: "left", width: "33.3%", textAlign: "center", border: "1px solid #e7ecf1", height: "15px" }}>
                    <i className={icons[data.Posventa.Clave]} style={{ color: colorIcono[data.Posventa.Clave] }} ></i><span style={{ display: "inline-block", fontSize: "10px" }}></span>
                    <div className="progress" style={{ marginBottom: "0px", height: "4px" }}>
                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: data.CantOrdSegAvanPost + "%" , fontSize: "8px", textAlign: "right", background: color[data.Posventa.Clave] }} ></div>
                    </div>
                   </div>
            </div >


                // <i className="glyphicon glyphicon-pause" ></i>

            /*


            <div style={{ width: "100%", fontSize: 14, lineHeight: 1.42857 }}>
                <div style={{ float: "left", width: "33.33%", textAlign: "center", border: "1px solid #e7ecf1", borderRight: "none" }}><i className={icons[data.Prospeccion.Clave]}></i><span style={{ display: "inline-block" }}></span></div>
                <div style={{ float: "left", width: "33.33%", textAlign: "center", border: "1px solid #e7ecf1", borderRight: "none" }}><i className={icons[data.Venta.Clave]}></i><span style={{ display: "inline-block" }}></span></div>
                <div style={{ float: "left", width: "33.33%", textAlign: "center", border: "1px solid #e7ecf1" }}><i className={icons[data.Posventa.Clave]}></i><span style={{ display: "inline-block" }}></span></div>
            </div>
            */
        );
    };

    export const formatBadgeBloqueado: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{badgeBloqueado(data)}</div>);
    };

    export const formatBadgeEstatus: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{badgeEstatus(data)}</div>);
    };
    export const formatBadgeEstatusSoloActivo: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{badgeEstatusSoloActivo(data)}</div>);
    };
    export const formatNotificacionComisiones: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
       // 
        let Icono: any = {};
        let Color: any = {};
        //
        Icono[0] = "glyphicon glyphicon-remove-sign"; // warnin
        Icono[1] = "fas fa-exclamation-triangle";    //
        Icono[2] = "fa fa-check";  //TODO BIEN 
        Icono[3] = "";    //ERROR AL GUARDAR
        //
        Color[0] = "Red";
        Color[1] = "#ffc107";
        Color[2] = "#4cd964";
        Color[3] = "";
        return w.ReactDOMServer.renderToStaticMarkup(<span className={Icono[data] + " ek-sombra"} style={{ color: Color[data], fontSize: "15px" }}></span>);
    };
    export const formatColor: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ backgroundColor: data }} >&nbsp;&nbsp;</div>);       
    };
    export const formatNaturaleza: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let Valor: string;
        let Default: string;
        let Icono: any = {};
        let Color: any = {};
        let Posicion: any = {};
        Icono['CAR'] = "C";
        Icono['ABO'] = "A";
        Icono['CAR1'] = "&nbsp;&nbsp;&nbsp;";
        Icono['ABO1'] = "&nbsp;&nbsp;&nbsp;";
        Color['1'] = "danger";
        Color['0'] = "success";
        Default = "<div class='col-md-6'><a style='background-color: #f1f1f1' class='btn btn-default btn-circle btn-xs'>" + Icono[data.Clave+"1"] + "</a></div>";
        Valor = "<div class='col-md-6'><a class='btn btn-" + Color[data.IdEstatus] + " btn-circle btn-xs'>" + Icono[data.Clave] + "</a>" + "</div >";
        Posicion['CAR'] = "<div class='col-md-12'>" + Valor + Default + "</div>";
        Posicion['ABO'] = "<div class='col-md-12'>" + Default + Valor + "</div>";
        return Posicion[data.Clave];
    };

    export const formatFecha: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        if (data === null || data == undefined) { Valor = ""; }
        else {
            var myDate = new Date(data);
            var Valor = (myDate.getDate()) + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();
        }
        return Valor;
    };

    export const formatLinkEntity: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let d: any = row.Cliente;
        if (!d) {
            d = {};
        };
        //
        let link: string;
        if (d.ID > 0) {
            link = global.getFullUrl("#/scv/clientes/" + d.ID);
        }
        //
        let retValue: string = "<div class='label-link-grid label-value'>" +
            "<a target='_blank' rel='noopener noreferrer' href='" + link + "' class='link2'>" +
            "<i class='fas fa-external-link-square-alt'></i></a>" +
            "</a>" +
            "<a class='link-text' target='_blank' rel='noopener noreferrer' href='" + link + "' style='font-size: 10px;'>" +
            [d.Nombre, d.ApellidoPaterno, d.ApellidoMaterno].join(" ") +
            "</a>" +
            "</div>";
        //
        return retValue; 
    };

    export const formatProgressBar: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let pa: any = row.PorcentajeAvance * 100.0;
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ width: "100%", fontSize: "11px", lineHeight: "1.42857", textAlign: "center" }}>
            <div style={{ float: "left", width: "100%", texAlign: "center", border: "0px solid #e7ecf1", borderRight: "none", height: "15px" }}>
                <i  ></i><span style={{ display: "inline-block", fontSize: "8px" }}> {EK.UX.Labels.formatDecimal(row.PorcentajeAvance)} %</span>
                <div className="progress" style={{ marginBottom: "0px", height: "4px", marginRight: "-1px" }}>
                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: pa + "%", fontSize: "8px", TextAlign: "right", background: EstatusDashBoardInfo.iconosColor[row.ClaveDashBoard] }} ></div>
                </div>
            </div>
        </div>);
    };

    export const formatProgressBarEx: (data: any, row: any) => any = (data: any, row: any): any => {
        let pa: any = row.PorcentajeAvance * 1.0;
        return <div style={{ width: "100%", fontSize: "11px", lineHeight: "1.42857", textAlign: "center" }}>
            <div style={{ float: "left", width: "100%", texAlign: "center", border: "0px solid #e7ecf1", borderRight: "none", height: "15px" }}>
                <i  ></i><span style={{ display: "inline-block", fontSize: "8px" }}> {EK.UX.Labels.formatDecimal(row.PorcentajeAvance)} %</span>
                <div className="progress" style={{ marginBottom: "0px", height: "4px", marginRight: "-1px", backgroundColor: "#ccc" }}>
                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: pa + "%", fontSize: "8px", TextAlign: "right", background: EstatusDashBoardInfo.iconosColor[row.ClaveDashBoard] }} ></div>
                </div>
            </div>
        </div>;
    };

    export const  formatEmail: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let w: any = window;
        let messageWindowFn: string = "$messageModal";

        if (!w[messageWindowFn]) {
            w[messageWindowFn] = (obj: any, idCliente: number, id: number) => {
                global.goModal("modalMessage", "#/kontrol/notificaciones/id",
                    {
                        ID: -1,
                        Link: "#/scv/expedientes/" + id,
                        Externo: true,
                        idCliente: idCliente,
                        idExpediente: id
                    }, "nuevo");
            };
        };
        if (data === null)
            return null;
        return "<div><i class='fa fa-at'></i> <a style='color:#777' data-id=\"data\"  onClick='window." + messageWindowFn + "(this, " + row.Cliente.ID + ", " + row.ID + ")'>" + data + "</a></div>";
    };

    export const formatEstatusTareaInstancia: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let retValue: string;

        if (data.Clave === "AP" || data.Clave === "AS") {
            retValue = formatGoodValue([data.Nombre]);
        }
        else if (data.Clave === "RE") {
            retValue = formatDefaultValue([data.Nombre]);
        }
        else if (data.Clave === "CA" || data.Clave === "NA") {
            retValue = formatBadValue([data.Nombre]);
        }
        else {
            retValue = formatDefaultValue([data.Nombre]);
        }

        return "<div style='text-align: center;'>" + retValue + "</div>";
    };

    export const formatBadgeFlujo: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let retValue: string;

        if (data.Clave === "ASIG" || data.Clave==="COM") {
            retValue = formatGoodValue([data.Nombre]);
        }
        else if (data.Clave === "EP" || data.Clave === "CAP") {
            retValue = formatDefaultValue([data.Nombre]);
        }
        else if (data.Clave === "CA" || data.Clave === "DE") {
            retValue = formatBadValue([data.Nombre]);
        }
        else if (data.Clave === "SI" || data.Clave === "SU" || data.Clave==="A") {
            retValue = formatDefaultValue([data.Nombre]);
        }
        else if (data.Clave === "CE") {
            retValue = formatWarningValue([data.Nombre]);
        }
        else
        {
            retValue = formatDefaultValue([data.Nombre]);
        }

        return "<div style='text-align: center;'>" + retValue + "</div>";
    };

    export const formatEstatusComisiones: (data: any, row: any) => any = (data: any, row: any) => {
        let clave: string = row.Estatus && row.Estatus.Clave ? row.Estatus.Clave : "";
        let nombre: string = row.Estatus && row.Estatus.Nombre ? row.Estatus.Nombre : "";

        let retValue: any;

        switch (clave) {

            case "PEND":
                retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{nombre}</div>
                break;
            case "PA":
                retValue = <div className='bg-blue bg-font-blue' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{nombre}</div>
                break;
            case "AP":
                retValue = <div className='bg-blue bg-font-blue' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{nombre}</div>
                break;
            case "REC":
                retValue = <div className='bg-red-flamingo bg-font-red-flamingo' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{nombre}</div>
                break;
            case "CAN":
                retValue = <div  className='bg-red-flamingo bg-font-red-flamingo' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{nombre}</div>
                break;
            case "APLI":
                retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{nombre}</div>
                break;
          
            default:
                retValue = "";
                break;
        }
        return retValue;
    };


    export const formatEstatusListaPrecios: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let clave: string = data && data.Clave ? data.Clave : "";

        switch (clave) {
            case "AP":
                return formatGoodValue([data.Nombre]);
            case "D":
                return formatDefaultValue([data.Nombre]);
            case "PA":
                return formatDefaultValue([data.Nombre]);
            case "RE":
                return formatBadValue([data.Nombre]);
            default:
                return ""
        }
      
    };


    export const formatBadgePosiciones: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        
        let retValue: any;
        let retValue2: any;
        
        if (row.Estatus && row.Estatus.Clave) {
            if (row.Estatus.Clave === 'D') {
                retValue = '<span class="btn btn-circle blue"style="padding: 2px 15px 4px;height: 22px;width: 83px; font-size: 11px !important">Disponible</span>'
            } else if (row.Estatus.Clave === 'O') {
                retValue = '<span class="btn btn-circle green-jungle"style="padding: 2px 15px 4px;height: 22px;width: 83px;font-size: 11px !important">Ocupado</span>'
            } else if (row.Estatus.Clave === 'C') {
                retValue = '<span class="btn btn-circle red-thunderbird"style="padding: 2px 15px 4px;height: 22px;width: 83px;font-size: 11px !important">Cancelado</span>'
            }
        };
        return "<div style='text-align: center;'>" + retValue + "</div>";
    };

    export const formatBadgeEstatusUbicaciones: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {

        let retValue: any;
        let retValue2: any;

        if (row.EstatusDeUbicacion && row.EstatusDeUbicacion.Nombre) {
            if (row.EstatusDeUbicacion.Naturaleza && row.EstatusDeUbicacion.Naturaleza.Clave) {
                if (row.EstatusDeUbicacion.Naturaleza.Clave === 'NDIS') {
                    retValue = '<span class="btn btn-circle badge badge-danger"style="padding: 2px 1px 4px;height: 22px;width: 30px;font-size: 11px !important">ND </span> ' + row.EstatusDeUbicacion.Nombre
                } else if (row.EstatusDeUbicacion.Naturaleza.Clave === 'DIS') {
                    retValue = '<span class="btn btn-circle green-meadow"style="padding: 2px 1px 4px;height: 22px;width: 30px;font-size: 11px !important">D</span> ' + row.EstatusDeUbicacion.Nombre
                } 
            }
        };
        return "<div style='text-align: left;'>" + retValue + "</div>";
    };

    export const formatFasesSeguimiento: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let icono_statusSeguimiento: any = {};
        let color_barra: any = {};
        let retValue: any;
        //icono_statusSeguimiento['F'] = "fa fa-flag-checkered";     //FINALIZACION
        //icono_statusSeguimiento['S'] = "fa fa-pause";              //PAUSE
        //icono_statusSeguimiento['C'] = "fa fa-stop";               //CANCEL
        //icono_statusSeguimiento['A'] = "fa fa-check";              //COMPLETE

        //color_barra['F'] = "#A5D6A7";     //FINALIZACION
        //color_barra['S'] = "#ffc107";     //PAUSE
        //color_barra['C'] = "#fa060e";     //CANCEL
        //color_barra['A'] = "#659be0";     //COMPLETE

        return w.ReactDOMServer.renderToStaticMarkup(
            <div ClassName= "mt-element-step" >
            <div ClassName="row step-thin">
            <div ClassName="col-md-4 bg-grey mt-step-col">
                <div ClassName="mt-step-number bg-white font-grey">1</div>
                <div ClassName="mt-step-title uppercase font-grey-cascade">Purchase</div>
                <div ClassName="mt-step-content font-grey-cascade">Purchasing the item</div>
            </div>
            <div ClassName="col-md-4 bg-grey mt-step-col">
                <div ClassName="mt-step-number bg-white font-grey">2</div>
                <div ClassName="mt-step-title uppercase font-grey-cascade">Payment</div>
                <div ClassName="mt-step-content font-grey-cascade">Complete your payment</div>
            </div>
            <div ClassName="col-md-4 bg-grey done mt-step-col active">
                <div ClassName="mt-step-number bg-white font-grey">3</div>
                <div ClassName="mt-step-title uppercase font-grey-cascade">Deploy</div>
                <div ClassName="mt-step-content font-grey-cascade">Receive item integration</div>
            </div>
        </div>
        </div>);
    };

    export const formatSeguimientoEstatus: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let icono_statusSeguimiento: any = {};
        let color_barra: any = {};
        let retValue: any;
        icono_statusSeguimiento['F'] = "fa fa-flag-checkered";     //FINALIZACION
        icono_statusSeguimiento['S'] = "fa fa-pause";              //PAUSE
        icono_statusSeguimiento['C'] = "fa fa-stop";               //CANCEL
        icono_statusSeguimiento['A'] = "fa fa-check";              //COMPLETE

        color_barra['F'] = "#A5D6A7";     //FINALIZACION
        color_barra['S'] = "#ffc107";     //PAUSE
        color_barra['C'] = "#fa060e";     //CANCEL
        color_barra['A'] = "#659be0";     //COMPLETE

        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "left" }} >
                     {row.EstatusSeguimiento.Clave !== 'F' ?<div className={"progress"} style={{ marginBottom: "-11px", height: "11px", marginLeft: "31px", marginTop: "2px" }} >
                        <span className={"progress-bar progress-bar-DEFAULT "} style={{ width: data + "%", backgroundColor: color_barra[row.EstatusSeguimiento.Clave]  }} > </span>
                    </div> : false } 
               <span className={icono_statusSeguimiento[row.EstatusSeguimiento.Clave]} style={{ marginTop: "0px" }} >
            </span>
        </div>);
    };
    export const formatBadgeEB: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let retValue: string = ["<div style=\"text-align: center\">", badgeEstatusString(row.Estatus), badgeBloqueadoString(row.Bloqueado), "</div>"].join("");

        return retValue;
        //return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{badgeEstatus(row.Estatus)}{badgeBloqueado(row.Bloqueado)}</div>);
    };
    export const badgeEsVisible: (data: number) => any = (data: any): any => {
        let retValue: any;

        if (data === 1) {
            retValue = <span className="fa-stack font-red-thunderbird" style={{ fontSize: 14, height: 12 }}>
                <i className="fa fa-eye fa-stack-2x"></i>
            </span>;
        } else {
            retValue = <span className="fa-stack font-green-jungle" style={{ fontSize: 14, height: 12 }}>
                <i className="fa fa-eye-slash fa-stack-2x"></i>
            </span>;
        }

        return retValue;
    };
    export const formatBadgeEC: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{badgeEstatus(row.Estatus)}{badgeClasificador(row.Clasificador)}</div>);
    };
    export const formatMoney: (data: number, defaultValue?: string) => any = (data: any, defaultValue?: string): any => {
        let newVal: any;

        if (data === undefined || data === null || $.trim(data) === "" || isNaN(data)) {
            return defaultValue ? defaultValue : "";
        }

        newVal = "$" + parseFloat(data).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });

        return newVal;
    };

    export const formatMoneyPersonalized: (data: number, moneda: any) => any = (data: any, moneda: any): any => {
        let newVal: any = global.formatMoney(data, moneda);
        let valor: any = parseFloat(data);
        let MoneySymbol: string = data && moneda.Tabulador.Moneda.MoneySymbol ? moneda.Tabulador.Moneda.MoneySymbol : "";

        let color: string = valor > 0 ? "#5cb85c" : valor == 0 ? "black" : "#c9302c";

        return <div style={{ color: color }}>{MoneySymbol + " " + newVal}</div>;
    };

    export const formatPercentage: (data: number) => any = (data: any): any => {

        if (data === undefined || data === null || $.trim(data) === "" || isNaN(data)) {
            return ""
        }
        let porcentage: any = Math.round(data);
        return <div>{porcentage}{" %"}</div>;
    }

    export const formatMoneyPercentage: (data: number, row: any) => any = (data: any, row: any): any => {
        if (data === undefined || data === null || $.trim(data) === "" || isNaN(data)) {
            return ""
        }
        if (row.Monto > 0) {
            return formatMoneyPersonalized(row.Monto, row.Moneda);

        }
        else if (row.Porcentaje > 0) {
            return formatPercentage(row.Porcentaje);
        }
        else {
            return "";
        }
    };
    export const formatDecimal: (data: number, digits?: number) => any = (data: any, digits?: number): any => {
        if (digits === undefined || digits === null) {
            digits = 2;
        };
        //
        return (data !== undefined && data !== null) ?
            data.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: digits }) : (0).toFixed(digits).toString();
    };
    export const formatNumeric: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center", float: "right" }}>{Number(data)}</div>);
    };
    export const formatCellDecimal: (data: any, type: any, row: any) => number = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center", float: "right" }}>{formatDecimal(data)}</div>);
    };
    export const formatDate: (data: any, defaultValue?: string) => string = (data: any, defaultValue?: string) => {
        var pad: string = "00";

        if (data === null || data === undefined || $.trim(data) === "") {
            return defaultValue ? defaultValue : "";
        }

        let d: any = new Date(data);
        return [(pad + d.getDate().toString()).slice(-pad.length), (pad + (d.getMonth() + 1).toString()).slice(-pad.length), d.getFullYear()].join("/");
    };
    export const formatDateYear: (data: any, defaultValue?: string) => string = (data: any, defaultValue?: string) => {
        var pad: string = "0000";

        if (data === null || data === undefined || $.trim(data) === "") {
            return defaultValue ? defaultValue : "";
        }

        let d: any = new Date(data);
        return [(pad + d.getFullYear().toString()).slice(-pad.length)].join("") ;
    };
    export const formatCellDate: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{formatDate(data)}</div>);
    };
    export const formatBadgeVisible: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{badgeEsVisible(data)}</div>);
    };
    export const formatBadgeOk: (data: boolean, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{ok(data)}</div>);
    };
    export const formatBadgeYes: (data: boolean, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{yes(data)}</div>);
    };
    export const formatCheck: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>
            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline"
            style={{ textAlign: "center" }}>
                <input data-index={"0"} name="btnSelectItem_" type="checkbox" value={"false"} data-id={1} />
            <span></span>
            </label>
        </div>);
    };
    export const formatTipoCheque: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "center" }}>{tipoChequesEnum[data.ID]}</div>);
    };
    export const formatCurrency: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(<div style={{ textAlign: "right" }}>{formatMoney(data)}</div>);
    };
}

import label = EK.UX.Labels;
import Label = EK.UX.Labels.Label;
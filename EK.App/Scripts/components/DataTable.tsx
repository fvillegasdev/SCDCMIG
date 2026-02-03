namespace EK.UX.DataTable {
    "use strict";

    declare var __dataTableInit: (
        id: any,
        columns: any,
        data: any,
        selectedItem: any,
        selectedItems: any[],
        multiSelect: boolean,
        searchInputId: string,
        rowSelectedFn: (data: any) => void,
        rowDoubleClickFn: (data: any) => void,
        rowRightClickFn: (data: any) => void,
        //rowFocus: (item: any, data: any) => void,
        //rowBlur: (item: any, data: any) => void,
        buttonContainer: string,
        scrollX: boolean) => any
    declare var __dataTableDestroy: (id: any) => any;

    export interface IDTFlexConfig {
        grow?: number;
        basis?: any;
    }

    export interface IDTColumn {
        align?: string;
        data?: string;
        title?: string;
        width?: any;
        order?: string;
        fixed?: boolean;
        flex?: IDTFlexConfig;
        dataType?: string;
        hidden?: boolean;
        isModal?: boolean;
        format?: (data: any, row: any, index: number, source: any[], config: page.IPageConfig) => any;
        render?: (data: any, type: any, row: any) => string;
    };

    export class DTColumns {
        columns: IDTColumn[] = [];
        ml: any;
        parent?: dt.IDTConfig;
        //
        constructor(ml?: any) {
            this.ml = ml;
        };
        getTitleML(headers: any, key: string): string {
            let retValue: string = "";
            //
            if (headers) {
                if (key) {
                    let mlKey: string = key[0].toLowerCase() + key.substr(1);
                    //
                    retValue = global.getNestedProp(headers, mlKey);
                    if (!retValue) {
                        retValue = global.getNestedProp(headers, key);
                    };
                };
            };
            //
            return retValue;
        };
        configureML(headers: any): void {
            if (this.columns && this.columns.length > 0) {
                let c: any;
                for (c in this.columns) {
                    c.title = this.getTitleML(headers, c.data);
                };
            };
        };
        add({ title, data, width, render, format, order, fixed, dataType, align, hidden, isModal, flex }: IDTColumn): DTColumns {
            if (title === null || title === undefined) {
                if (this.ml) {
                    let headersProperty: string = this.ml && this.ml.__isMLSection === true ? "headers" : "consulta.grid.headers";
                    let headers: any = global.getNestedProp(this.ml, headersProperty);
                    //
                    if (headers) {
                        title = this.getTitleML(headers, data);
                    };
                };
            };
            if (!width) {
                width = null;
            } else if (typeof width === "number" && fixed !== true) {
                width = [width, "%"].join("");
            };
            if (!render) {
                render = null;
            };
            if (!format) {
                format = null;
            };
            if (!order) {
                order = null;
            };
            if (!dataType) {
                dataType = "string";
            };
            if (!align) {
                align = "left";
            };
            if (hidden === undefined || hidden === null) {
                hidden = false;
            };
            if (isModal === undefined || isModal === null) {
                isModal = false;
            };

            let column: IDTColumn = {
                title, data, width, render, format, order, fixed, dataType, align, hidden, isModal, flex
            };
            //console.log(data)
            this.columns.push(column);

            return this;
        };
        addSelect(): DTColumns {
            //let format: any = (data: any, row: any, index: number, source: any[], config: page.IPageConfig, slot: string) => {
            //    let v: boolean = data === true;
            //    let className: string = v ? "dteSelectItemTrue" : "dteSelectItemFalse";
            //    //
            //    return <i className={"fas fa-check " + className} onClick={() => {
            //        let item: any = global.assign(row);
            //        item._selected = !v;
            //        //
            //        source[index] = item;
            //        //
            //        config.setCatalogo(item, slot);
            //    }}></i>;
            //};
            return this.add({ title: "", data: "_selected", width: "38px", order: "1", fixed: true, format: null,  dataType: "boolean", align: "center" });
        };
        addClave({title, data, width, order, fixed}: IDTColumn): DTColumns {
            if (!data) {
                data = "Clave";
            };

            let formatClaveFn: (data: any, style: any, row: any) => any = (data: any, style: any, row: any): any =>
            {
                let keySystem: boolean = row.Sistema && row.Sistema == true ? true : false;
                let stringpadlock: string = keySystem ?"<span style='color:#ffc107;float:right' class='fas fa-lock'></span>" : "";
                return "<div>" 
                    + row.Clave + stringpadlock+
                    "</div>";
            };

            return this.add({ title, data, width, order, fixed, dataType: "string", render: formatClaveFn });
        };
        addID({title, data, width, order, fixed}: IDTColumn): DTColumns {
            if (!data) {
                data = "ID";
            };

            return this.add({ title, data, width, order, fixed });
        };
        addNombre({title, data, width, order}: IDTColumn): DTColumns {
            if (!data) {
                data = "Nombre";
            };

            return this.add({ title, data, width, order });
        };
        addLinkCliente({ title, data, width, order, fixed, flex }: IDTColumn): DTColumns {
            let propName: string = data;
            if (!data) {
                propName = "Cliente.Nombre";
            };
            //
            let linkClienteFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let d: any = row.Cliente;

                if (!d) {
                    d = row;
                };
                //
                let link: string;
                if (d.ID > 0) {
                    link = global.getFullUrl("#/scv/clientes/" + d.ID);
                }
                else
                {
                    return null;
                }

                return <div className="label-link-grid label-value"> 
                    <a target="_blank" rel="noopener noreferrer" href={link} className="link2">
                        <i className="fas fa-external-link-square-alt"></i>
                    </a>
                    <a className="link-text" target="_blank" rel="noopener noreferrer" href={link} style={{ fontSize: 10 }}>
                        <span className={"badge"}>{d.ID}</span>
                        <span className="link-text-name">
                            {row.NombreCompleto ? d.NombreCompleto : [d.Nombre, d.ApellidoPaterno, d.ApellidoMaterno].join(" ")}
                        </span>
                    </a>
                </div>;
            };
            //
            return this.add({ title: "Nombre", data: propName, width, fixed, order, flex, format: linkClienteFn });
        };

        addLinkUsuario({ title, data, width, order, fixed, flex }: IDTColumn): DTColumns {

            let linkUsuarioFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let prop: string = "Usuario";  
                let link: string;
                let d: any;

                if (!data) {
                    d = row[prop];
                }
                else {
                    d = data;
                };

                if (d.ID > 0) {
                    link = global.getFullUrl("#/kontrol/usuarios/" + d.ID);
                }
                else {
                    return null;
                };

                    return <div className="label-link-grid label-value">
                        <a target="_blank" rel="noopener noreferrer" href={link} className="link2">
                            <i className="fas fa-external-link-square-alt"></i>
                        </a>
                        <a className="link-text" target="_blank" rel="noopener noreferrer" href={link} style={{ fontSize: 10 }}>
                            <span className={"badge"}>{d.ID}</span>
                            <span className="link-text-name">{[d.Nombre, d.Apellidos].join(" ")}</span>
                        </a>
                    </div>;
            };
            return this.add({ title: title, data, width, fixed, order, format: linkUsuarioFn, flex });
        };

        addNombreCompletoCliente({ title, data, width, order, fixed }: IDTColumn): DTColumns {
            let propName: string = data;
            if (!data) {
                propName = "Cliente.Nombre";
            };
            //
            let formatClienteFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let d: any = row.Cliente;
                let propName: string = "Cliente.Nombre";
                if (!d) {
                    d = row;
                    propName = "Nombre";
                };
                return <div className="label-link-grid label-value" style={{ fontSize: 10 }}>
                    {[d.Nombre, d.ApellidoPaterno, d.ApellidoMaterno].join(" ")}
                </div>;
            };
            //
            return this.add({ title: "Nombre", data: propName, width, fixed, order, format: formatClienteFn });
        };

        addNombreCompletoUsuarioFormat({ title, data, width, order, fixed }: IDTColumn): DTColumns {
            let propName: string = data;
            if (!data) {
                propName = "Usuario.Nombre";
            };
            //
            let formatUsuarioFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let d: any = row.Usuario;
                let propName: string = "Usuario.Nombre";
                if (!d) {
                    d = row;
                    propName = "Nombre";
                };
                return <div className="label-link-grid label-value" style={{ fontSize: 10 }}>
                    {[d.Nombre, d.Apellidos].join(" ")}
                </div>;
            };
            //
            return this.add({ title: "Nombre", data: propName, width, fixed, order, format: formatUsuarioFn });
        };

        addNombreCompletoUsuario({ title, data, width, order, fixed }: IDTColumn): DTColumns {
            let propName: string = data;
            if (!data) {
                propName = "Usuario";
            };
            let formatUsuarioFn: (data: any, row: any) => any = (data: any, row: any): any => {
                return "<div className='label-link-grid label-value' style={{ fontSize: 10 }}>"+
                    row.Usuario.Nombre + " " + row.Usuario.Apellidos+
                "</div>";
            };
            return this.add({ title: "Nombre", data: propName, width, fixed, order, render: formatUsuarioFn });
        };


        addLinkDesarrollo({ title, data, width, order, fixed }: IDTColumn): DTColumns {
            let propName: string = data;
            if (!data) {
                propName = "Desarrollo.Descripcion";
            };
            //
            let linkDesarrolloFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let d: any = data;
                let propName: string = "Desarrollo.Descripcion";
                if (!d) {
                    d = row;
                    propName = "Nombre";
                };
                //
                let link: string;
                if (d.ID > 0) {
                    link = global.getFullUrl("#/scv/desarrollos/" + d.ID);
                }
                else {
                    return null;
                }
                return "<div class='label-link-grid label-value'>" +
                    "<a target='_blank' rel='noopener noreferrer' href='" + link + "' class='link2'>"+
                     "   <i class='fas fa-external-link-square-alt'></i>"+
                    "</a>"+
                    "<a class='link-text' target='_blank' rel='noopener noreferrer'  href='" + link + "' style='font-size=10'>"+
                     "   <span class='badge'>"+d.Clave+"</span>"+
                     "   <span class='link-text-name'>"+ d.Descripcion+"</span>"+
                    "</a>"+

                "</div>";
            };
            //
            return this.add({data: propName, width, fixed, order, render: linkDesarrolloFn });
        };

        addLinkObra({ title, data, width, order, fixed }: IDTColumn): DTColumns {
            let propName: string = data;
            if (!data) {
                propName = "Obra.Nombre";
            };
            //
            let linkObraFn: (data: any, row: any) => any = (data: any, row: any): any => {
                let d: any = data;
                let propName: string = "Obra.Nombre";
                if (!d) {
                    d = row;
                    propName = "Nombre";
                };
                //
                let link: string;
                if (d.ID > 0) {
                    link = global.getFullUrl("#/scco/Obra/" + d.ID);
                }
                else {
                    return null;
                }
                return "<div class='label-link-grid label-value'>" +
                    "<a target='_blank' rel='noopener noreferrer' href='" + link + "' class='link2'>" +
                    "   <i class='fas fa-external-link-square-alt'></i>" +
                    "</a>" +
                    "<a class='link-text' target='_blank' rel='noopener noreferrer'  href='" + link + "' style='font-size=10'>" +
                    "   <span class='badge'>" + d.Clave + "</span>" +
                    "   <span class='link-text-name'>" + d.Nombre + "</span>" +
                    "</a>" +

                    "</div>";
            };
            //
            return this.add({ data: propName, width, fixed, order, render: linkObraFn });
        };

        addLinkEmail({ title, data, width, order, format }: IDTColumn): DTColumns {
            let linkModalFn: (d: any, r: any) => any = (d: any, r: any): any => {
                let w: any = window;
                let f: any = format;
                let messageWindowFn: string = "$$" + data;
                let modalId: string = "modal" + data.replace(".", "_");
                //
                if (!w[messageWindowFn]) {
                    w[messageWindowFn] = (obj: any) => {
                        global.goModal(modalId, "#/kontrol/notificaciones/id", obj, "nuevo");
                    };
                };
                if (data === null) {
                    return null;
                };
                //
                return <div>
                    <a style={{ color: "#777" }} data-id="data" onClick={() => window[messageWindowFn](f(d, r)) }>{d}</a>
                </div>;
            };
            //
            return this.add({ title: "Email", data, width, order, format: linkModalFn, isModal: true });
        };
        addLinkCelular({ title, data, width, order, format }: IDTColumn): DTColumns {
            let linkModalFn: (d: any, r: any) => any = (d: any, r: any): any => {
                let w: any = window;
                let f: any = format;
                let messageWindowFn: string = "$$" + data;
                let modalId: string = "modal" + data.replace(".", "_");
                //
                if (!w[messageWindowFn]) {
                    w[messageWindowFn] = (obj: any) => {
                        global.goModal(modalId, "#/kontrol/notificaciones/id", obj, "nuevo");
                    };
                };
                if (data === null) {
                    return null;
                };
                //
                return <div>
                    <i className="fa fa-at"></i>
                    <a style={{ color: "#777" }} data-id="data" onClick={() => window[messageWindowFn](f(d, r))}>{d}</a>
                </div>;
            };
            //
            return this.add({ title: "Celular", data, width, order, format: linkModalFn, isModal: true });
        };
        addLinkCelularExpediente({ title, data, width, order, format }: IDTColumn): DTColumns {
            return this.addLinkCelular({
                title: "Celular", data: "Cliente.Celular", width, order, dataType: "modal", format: (data, row) => {
                    return {
                        ID: -1,
                        Link: "#/scv/expedientes/" + row.ID,
                        Externo: false,
                        idCliente: row.Cliente.ID,
                        idExpediente: row.ID,
                        mensajeSMS: true
                    }
                }
            });
        };
        addLinkEmailClienteExpediente({ title, data, width, order, format }: IDTColumn): DTColumns {
            return this.addLinkEmail({ title: "Email", data: "Cliente.Email", width, order, dataType: "modal", format: (data, row) => {
                return {
                    ID: -1,
                    Link: "#/scv/expedientes/" + row.ID,
                    Externo: true,
                    idCliente: row.Cliente.ID,
                    idExpediente: row.ID
                }
            }});
        };

        addDate({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Fecha";
            };
            return this.add({ title, data, width, render: global.formatDate, order });
        };

        addDateTime({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Fecha";
            };
            return this.add({ title, data, width, render: global.formatDateTime, order });
        };

        addDateFormat({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Fecha";
            };
            return this.add({ title, data, width, format: global.formatDate, order });
        };


        addMoney({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Moneda";
            };
            let formatMoneyFn: (data: any, row: any) => any = (data: any, row: any): any => {

                let newVal: any = EK.UX.Labels.formatMoney(data)
                let valor: any = parseFloat(data);
                let color: string = valor > 0 ? "#5cb85c" : "#c9302c";
                    return "<div  style='color: " + color + "; text-align:right'>" + newVal + "</div>"
            };
            return this.add({ title, data, width, render: formatMoneyFn, order, align: "right" });
        };

        addMoneyFormat({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Moneda";
            };
            return this.add({ title, data, width, format: EK.UX.Labels.formatMoneyPersonalized, order, align: "right" });
        };

        addNumber({ title, data, width, order, flex }: IDTColumn): DTColumns {
            return this.add({ title, data, width, order, align: "right", flex });
        };

        addPercentageFormat({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Moneda";
            };
            return this.add({ title, data, width, format: EK.UX.Labels.formatPercentage, order, align: "center" });
        };

        addMoneyPercentageFormat({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Moneda";
            };
            return this.add({ title, data, width, format: EK.UX.Labels.formatMoneyPercentage, order, align: "right" });
        };

        addCenter({ title, data, width, order }: IDTColumn): DTColumns {
            if (!data) {
                data = "Cantidad";
            };
            return this.add({ title, data, width, order, align: "center" });
        };

        addDescripcion({title, data, width, order}: IDTColumn): DTColumns {
            if (!data) {
                data = "Descripcion";
            };

            return this.add({ title, data, width, order });
        };
        addEstatus({title, data, width, order}: IDTColumn): DTColumns {
            if (!data) {
                data = "Estatus";
            };

            return this.add({ title, data, width, render: EK.UX.Labels.formatBadgeEstatus, order });
        };
        addEstatusSoloActivo({title, data, width, order}: IDTColumn): DTColumns {
            if (!data) {
                data = "Estatus";
            };

            return this.add({ title, data, width, render: EK.UX.Labels.formatBadgeEstatusSoloActivo, order });
        };
        addNotificacionComision({title, data, width, order}: IDTColumn): DTColumns {
            if (!data) {
                data = "IdConsiderarParaGuardar";
            };
            return this.add({ title, data, width, render: EK.UX.Labels.formatNotificacionComisiones, order });
        };
        
        addDynamicColumns(columnas: any []): DTColumns {
            let datos: string = "";
            let titulos: string = "";
            let width: any ;
            let order: any; 
            let thisNewColumn = this; 
            columnas.forEach(function (element) {
                datos = element.columna;  
                titulos = element.titulo;
                width = element.width;
                thisNewColumn.add({ title: titulos, data: datos, width, order: order });
            });
            return thisNewColumn; 
        };
        toArray(): IDTColumn[] {
            return this.columns;
        };
    };
    export const createColumns: (ml: any) => DTColumns = (ml: any): DTColumns => {
        return new DTColumns(ml);
    };
    export interface IDataTableProps extends React.Props<any> {
        buttonContainer?: string;
        columns?: any;
        config?: page.IPageConfig;
        data?: any;
        entity?: DataElement;
        entityType?: DataElement;
        globalLink?: DataElement;
        id?: string;
        multiSelect?: boolean;
        onRowSelected?: (item: any) => void;
        onRowDoubleClick?: (item: any) => void;
        onRowRightClick?: (item: any) => void;
        onGetData?: (data: DataElement) => DataElement;
        pageId?: string;
        selectedItem?: any;
        selectedItems?: any[];
        scrollX?: boolean;
        slot?: string;
    };

    interface IDataTableState extends React.Props<any> {
        id: string;
    };

    export class DataTable extends React.Component<IDataTableProps, IDataTableState> {
        constructor(props: IDataTableProps) {
            super(props);

            this.onSearch = this.onSearch.bind(this);
            this.dataTableInit = this.dataTableInit.bind(this);
            this.dataTableDestroy = this.dataTableDestroy.bind(this);

            let id: string = this.props.id;
            if (!this.props.id) {
                id = ["dt", new Date().getTime()].join("_");
            };
            this.state = { id };
        };

        static defaultProps: IDataTableProps = {
            data: createDefaultStoreObject([]),
            multiSelect: false
        };

        refs: {
            table: Element;
            container: Element;
        };

        shouldComponentUpdate(nextProps: IDataTableProps, nextState: any): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        onSearch(filter: string): void {
            let id: string = this.refs.table.id;

            $("#" + id).DataTable().search(filter).draw();
        };

        dataTableInit(): void {
            let inputId: string = [this.state.id, "_search"].join("");
            let ddlId: string = [this.state.id, "_dropdownlist"].join("");

            let columns: any[] = this.props.columns;

            __dataTableInit(
                this.refs.table,
                columns,
                getData(this.props.data),
                this.props.selectedItem,
                this.props.selectedItems,
                this.props.multiSelect,
                inputId,
                this.props.onRowSelected,
                this.props.onRowDoubleClick,
                this.props.onRowRightClick,
                //this.props.onRowFocus,
                //this.props.onRowBlur,
                this.props.buttonContainer,
                this.props.scrollX);
        };

        dataTableDestroy(): void {
            __dataTableDestroy(this.state.id);
        };

        componentDidMount(): void {
            this.dataTableInit();
            $("table.dataTable.fixedHeader-floating").remove();
            $("table.dataTable.fixedHeader-locked").remove(); // asegurarse que se remueve el header fijo
            // 
            dispatchSuccessful("global-page-search", { id : this.state.id });
        };

        componentWillUnmount(): void {
            this.dataTableDestroy();
            $("table[aria-describedby='" + this.state.id + "_info']").remove();
        };

        componentWillUpdate(nextProps: IDataTableProps, nextState: any) {
            this.dataTableDestroy();
        };

        componentDidUpdate(): void {
            this.dataTableInit();    
        };

        render(): JSX.Element {
            return <div ref="container">
                <table
                    id={this.state.id}
                    ref="table"
                    className="table table-striped table-hover table-header-fixed cell-border"
                    width="100%">
                </table> 
            </div>;
        };
    };
    export class DataTableExt extends React.Component<IDataTableProps, {}> {
        constructor(props: IDataTableProps) {
            super(props);
        }

        render(): any {
            return <UpdateColumn info={this.props.data} text="obteniendo información">
                <DataTable {...this.props} />
            </UpdateColumn>;
        }
    };
    interface IPage$TableV2State {
        data: DataElement //,
        // config: page.IPageConfig;
    };
    class Page$TableV2 extends React.Component<IDataTableProps, IPage$TableV2State> {
        constructor(props: IDataTableProps) {
            super(props);

            //this.loadCatalogo = this.loadCatalogo.bind(this);
            this.onRowBlur = this.onRowBlur.bind(this);
            this.onRowFocus = this.onRowFocus.bind(this);
            this.onSelectedChanged = this.onSelectedChanged.bind(this);
            //this.setConfigState = this.setConfigState.bind(this);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            this.getData = this.getData.bind(this);

            this.state = { data: global.createSuccessfulStoreObject([]) };
        };
        //
        static props: any = (state: any) => {
            let retValue: any = {
                config: global.createPageConfigFromState(state.global),
                data: state.global.currentCatalogo,
                entity: state.global.currentEntity,
                globalLink: state.global.currentLink,
                pageId: getData(state.global.page).id,
                entityType: state.global.currentEntityType
            };
            //
            retValue.config.state = undefined;
            return retValue;
        };
        //
        static defaultProps: IDataTableProps = {
            id: "dtMainPage"
        };
        onSelectedChanged(item: any): void {
            if (this.props.onRowSelected) {
                this.props.onRowSelected(item);
            };

            this.props.config.setEntity(item);
        };
        getData(config: page.IPageConfig): any {
            let id: string = this.props.id;
            let retValue: DataElement;

            let slot: string;
            if (id !== "dtMainPage" && config.hasSlot(id)) {
                retValue = config.getCatalogo(id);
            }
            else {
                retValue = config.getCatalogo();
            };

            if (this.props.onGetData) {
                retValue = this.props.onGetData(retValue);
            };

            return retValue;
        };
        onRowDoubleClick(item: any): void {
            if (this.props.onRowDoubleClick) {
                this.props.onRowDoubleClick(item);
            } else {
                if (isSuccessful(this.props.entity)) {
                    go(getDataID(this.props.entity), true);
                };
            };
        };
        onRowFocus(item: any, data: any): void {
        };
        onRowBlur(item: any, data: any): void {
        };
        componentWillMount(): void {
            let config: page.IPageConfig = this.props.config;

            if (!config.slots) {
                config.slots = [];
            };
            config.slots.push(this.props.slot);

            global.setPageConfig({ id: config.id, modulo: config.modulo, slots: config.slots, idML: config.idML });
        };
        componentWillReceiveProps(nextProps: IDataTableProps, nextState: IPage$TableV2State) {
            let data: DataElement = this.getData(this.props.config);

            if (global.hasChanged(nextState.data, data)) {
                this.setState({ data });
            };
        };
        shouldComponentUpdate(nextProps: IDataTableProps, nextState: IPage$TableV2State) {
            return global.hasChanged(this.state.data, nextState.data);
        };
        render(): any {
            if (!this.props.pageId) {
                return null;
            };

            let data: DataElement = this.state.data; //this.getData(this.state.config);
            return <UpdateColumn info={data} text="obteniendo información">
                <DataTable {...this.props} data={data}
                    onRowSelected={this.onSelectedChanged}
                    onRowDoubleClick={this.onRowDoubleClick}
                    //onRowBlur={this.onRowBlur}
                    //onRowFocus={this.onRowFocus}
                    />
            </UpdateColumn>;
        };
    };

    export const PageTable: any = ReactRedux.connect(Page$TableV2.props, null)(Page$TableV2);
};

import dt = EK.UX.DataTable;
import IDataTableProps = EK.UX.DataTable.IDataTableProps;
import DataTableExt = EK.UX.DataTable.DataTableExt;
import DataTable = EK.UX.DataTable.DataTable;
import PageTable = EK.UX.DataTable.PageTable;
namespace EK.UX.DataTable {
    "use strict";
    export interface IDTConfigProps {
        displayPaging: boolean
    }
    export interface IDTConfig {
        columns: DTColumns;
        groups: DTGroups;
        filters: ((item: any) => boolean)[];
        ml: any;
        props: IDTConfigProps;
    };
    export class DTConfig implements IDTConfig {
        private _columns: DTColumns;
        private _groups: DTGroups;
        private _filters: ((item: any) => boolean)[];
        private _props: IDTConfigProps;
        ml: any;
        //
        constructor(ml?: any) {
            this.ml = ml;
        };
        get props(): IDTConfigProps {
            if (!this._props) {
                this._props = {
                    displayPaging: true
                }
            }
            return this._props;
        };
        get filters(): ((item: any) => boolean)[] {
            if (!this._filters) {
                this._filters = [];
            }
            return this._filters;
        };
        get columns(): DTColumns {
            if (!this._columns) {
                this._columns = new DTColumns(this.ml);
                this._columns.parent = this;
            };
            return this._columns;
        };
        get groups(): DTGroups {
            if (!this._groups) {
                this._groups = new DTGroups(this.ml);
                this._groups.parent = this;
            };
            return this._groups;
        };
    };
    export interface IDTGroup {
        data?: string;
        dataType?: string;
        column?: dt.IDTColumn;
        parent?: dt.IDTConfig;
    };
    // avg count first last max min sum
    export class DTGroups {
        groups: IDTGroup[] = [];
        ml: any;
        parent: IDTConfig;
        //
        constructor(ml?: any) {
            this.ml = ml;
        };
        add({ data, dataType }: IDTGroup): DTGroups {
            let column: IDTColumn;
            let columns: IDTColumn[] = this.parent.columns.toArray();
            //
            for (var i = 0; i < columns.length; i++) {
                if (data === columns[i].data) {
                    column = columns[i];
                    column.hidden = true;
                    break;
                };
            };
            //
            let groups: IDTGroup = { data, dataType, column };
            //
            this.groups.push(groups);
            //
            return this;
        };
        toArray(): IDTGroup[] {
            return this.groups;
        };
    };
    export const createConfig: (ml: any) => DTConfig = (ml: any): DTConfig => {
        return new DTConfig(ml);
    };
    export interface IDTPaging {
        page?: number;
        pages?: number;
        pageSize?: number;
        block?: number;
        blocks?: number;
        blockSize?: number;
        results?: number;
        startPage?: number;
        endPage?: number;
    };
    export interface IDataTableExtendedProps extends React.Props<any> {
        buttonContainer?: string;
        config?: page.IPageConfig;
        dtConfig?: dt.IDTConfig;
        dtType?: string;
        data?: any;
        entity?: DataElement;
        entityType?: DataElement;
        globalLink?: DataElement;
        id?: string;
        multiSelect?: boolean;
        onRowSelected?: (item: any) => void;
        onRowDoubleClick?: (item: any) => void;
        onRowRightClick?: (item: any) => void;
        onRowStyle?: (item: any) => React.CSSProperties;
        onGetData?: (data: DataElement) => DataElement;
        pageId?: string;
        paging?: IDTPaging;
        refresh?: DataElement;
        search?: string;
        selectedItem?: any;
        selectedItems?: any[];
        slot?: string;
        registersPerPage?: number;
    };
    interface IDataTableExtendedState extends React.Props<any> {
        id?: string;
        data?: DataElement;
        sourceData?: DataElement;
        dtConfig?: dt.IDTConfig;
        dtData?: any;
        grouped?: boolean;
        groupedData?: DataElement;
        multiSelect?: boolean;
        paging?: IDTPaging;
        refresh?: DataElement;
        selectedItem?: any;
        sort?: any;
        registersPerPage?: number;
    };
    export class DataTable$Extended extends React.Component<IDataTableExtendedProps, IDataTableExtendedState> {
        constructor(props: IDataTableExtendedProps) {
            super(props);
            if (this.props.config.state.search != undefined) {
                delete this.props.config.state.search;
            }

            this.onCellClick = this.onCellClick.bind(this);
            this.onCellDoubleClick = this.onCellDoubleClick.bind(this);
            this.onSortClick = this.onSortClick.bind(this);
            this.onSearch = this.onSearch.bind(this);
            //this.setConfigState = this.setConfigState.bind(this);

            this.formatCheckItem = this.formatCheckItem.bind(this);
            this.groupData = this.groupData.bind(this);
            this.getFixedColumnHeaders = this.getFixedColumnHeaders.bind(this);
            this.getRegularColumnHeaders = this.getRegularColumnHeaders.bind(this);
            this.getFixedRows = this.getFixedRows.bind(this);
            this.getRegularRows = this.getRegularRows.bind(this);
            this.getSortClassName = this.getSortClassName.bind(this);
            this.formatColumnHeaders = this.formatColumnHeaders.bind(this);
            this.isSelected = this.isSelected.bind(this);
            this.setPaging = this.setPaging.bind(this);
            this.setStateSelected = this.setStateSelected.bind(this);
            this.changePage = this.changePage.bind(this);
            this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
            //
            let id: string = this.props.id;
            if (!this.props.id) {
                id = ["dt", new Date().getTime()].join("_");
            };
            this.state = {
                id,
                paging: this.props.paging,
                dtConfig: this.props.dtConfig
            };
            //
        };
        //
        static props: any = (state: any) => {
            return {
                config: global.createPageConfigFromState(state.global),
                //data: state.global.currentCatalogo,
                entity: state.global.currentEntity,
                globalLink: state.global.currentLink,
                pageId: getData(state.global.page).id,
                entityType: state.global.currentEntityType,
                search: state.global.search
            };
        };

        //
        static defaultProps: IDataTableExtendedProps = {
            data: createDefaultStoreObject([]),
            paging: { page: 1, pages: 0, pageSize: 10, block: 1, blocks: 0, blockSize: 5, results: 0, startPage: 0, endPage: 0 },
            multiSelect: false,
            dtType: "dt"
        };
        refs: {
            table: Element;
            container: Element;
        };
        shouldComponentUpdate(nextProps: IDataTableExtendedProps, nextState: IDataTableExtendedState): boolean {
            let data: DataElement = this.getData(nextProps.config);
            let refreshInfo: DataElement = this.getRefreshStatus(nextProps.config);
            //if (global.hasChanged(data, this.state.data)) {

            if (global.hasChanged(this.state.data, nextState.data)) {
                return true;
            };

            //
            if (global.hasChanged(this.state.refresh, nextState.refresh)) {
                return true;
            };
            //
            if (global.hasChanged(this.props.search, nextProps.search)) {
                return true;
            };
            if (global.hasChanged(this.state.groupedData, nextState.groupedData)) {
                return true;
            };

            if (this.state.paging.page !== nextState.paging.page) {
                return true;
            };
            if (global.hasChanged(this.state.refresh, nextState.refresh)) {
                return true;
            };
            if (this.state.selectedItem || nextState.selectedItem) {
                if (!global.areEqualID(this.state.selectedItem, nextState.selectedItem)) {
                    return true;
                };
            };

            if (this.state.sort && nextState.sort) {
                if (this.state.sort.orientation !== nextState.sort.orientation
                    || (this.state.sort.column && nextState.sort.column && (this.state.sort.column.data !== nextState.sort.column.data)))
                    return true;
            } else {
                if (!this.state.sort && nextState.sort)
                    return true;
            };

            return false;
        };
        componentWillMount() {
            this.configureDT();
        };
        componentWillReceiveProps(nextProps: IDataTableExtendedProps, nextState: IDataTableExtendedState) {

            let fnFilterDT = (data: any[], columns: any[], filter: string): DataElement => {
                let retValue: DataElement;
                let preData: any[] = data;

                if (this.props.dtConfig.filters.length > 0 || (filter && filter.length > 0)) {
                    filter = $.trim(filter).toLowerCase();
                    let fData: any = preData.filter((el) => {
                        let retValue: boolean = false;
                        // 
                        if (filter.length > 0) {
                            for (var i = 0; i < columns.length; i++) {
                                let v: string = $.trim(global.getNestedProp(el, columns[i].data)).toLowerCase();
                                //
                                if (v.indexOf(filter) >= 0) {
                                    retValue = true;
                                    //
                                    break;
                                };
                            };
                        }
                        else {
                            retValue = true;
                        };
                        //
                        if (this.props.dtConfig.filters.length > 0) {
                            let f: any;
                            for (var j = 0; j < this.props.dtConfig.filters.length; j++) {
                                f = this.props.dtConfig.filters[j];
                                //
                                let fnRetValue: boolean = f(el);
                                //
                                retValue = retValue && fnRetValue;
                            };
                        };
                        //
                        return retValue;
                    });
                    //
                    if (!fData) {
                        fData = [];
                    };
                    //
                    retValue = global.createSuccessfulStoreObject(fData);
                } else {
                    retValue = global.createSuccessfulStoreObject(preData);
                };

                return retValue;
            };
            //
            let refreshInfo: DataElement = this.getRefreshStatus(nextProps.config);
            let refresh: boolean = false;
            let data: DataElement = this.getData(nextProps.config);
            let sourceData: DataElement = data;
            let that: IDataTableExtendedProps = this.props;
            let filtered: boolean = false;
            let sourceChanged: boolean = global.hasChanged(this.state.sourceData, sourceData);
            //
            if (global.hasChanged(this.state.refresh, refreshInfo)) {
                refresh = true;
            };
            //
            if (refresh === true ||
                global.hasChanged(this.props.search, nextProps.search) ||
                sourceChanged === true) {

                if (global.isSuccessful(data)) {
                    let filter: string = nextProps.search ? $.trim(global.getData(nextProps.search)).toLowerCase() : "";
                    let preData: any[] = global.getData(data);
                    let columns: dt.IDTColumn[] = that.dtConfig.columns.toArray();
                    //
                    data = fnFilterDT(preData, columns, filter);

                    filtered = true;
                };
            };
            //
            //if (global.hasChanged(data, this.state.data)) {
            if (filtered === true || sourceChanged === true) {
                //if (filtered === false) {
                //    let pSearch: any = nextProps.search;
                //    if (global.isSuccessful(pSearch)) {
                //        let filter: string = $.trim(global.getData(pSearch)).toLowerCase();
                //        let preData: any[] = global.getData(data);
                //        let columns: dt.IDTColumn[] = that.dtConfig.columns.toArray();
                //        //
                //        data = fnFilterDT(preData, columns, filter);
                //    };
                //};
                //
                let newData: DataElement = this.sortData(this.state.sort, data);
                let groupedData: DataElement;
                let groups: IDTGroup[] = this.state.dtConfig.groups.toArray();
                //
                if (groups.length > 0) {
                    groupedData = this.groupData(newData);
                };
                let paging: dt.IDTPaging = this.setPaging(newData);
                //
                this.setState(global.assign(this.state, {
                    data: newData,
                    groupedData,
                    paging: paging,
                    refresh: refreshInfo,
                    sourceData: sourceData
                }));
            };

            //if (global.hasChanged(this.state.selectedItem, nextProps.entity)) {
            //    this.props.config.setEntity(nextProps.selectedItem, this.props.id);
            //};
        };
        componentDidUpdate(prevProps: any, prevState: any) {
            if (this.state.selectedItem || prevState.selectedItem) {
                if (!global.areEqualID(this.state.selectedItem, prevState.selectedItem)) {
                    this.props.config.setEntity(this.state.selectedItem, this.props.id);
                };
            };
        };
        onSearch(filter: string): void {
            let id: string = this.refs.table.id;

            $("#" + id).DataTable().search(filter).draw();
        };
        formatCheckItem(data: any, row: any, index: number, source: any[], config: page.IPageConfig): any {
            let v: boolean = data === true;
            let className: string = v ? "dteSelectItemTrue" : "dteSelectItemFalse";
            let newState: IDataTableExtendedState;
            let that: any = this;
            let state: IDataTableExtendedState = this.state;
            let props: IDataTableExtendedProps = this.props;
            //
            let checkRows: any = (group: any, value: boolean): any => {
                if (group && group.rows && group.rows.length > 0) {
                    for (var i = 0; i < group.rows.length; i++) {
                        group.rows[i]._selected = value;
                    };
                }
                else {
                    let groups: any;
                    if (group && group.groups && Object.keys(group.groups)) {
                        groups = group.groups;
                    }
                    else {
                        groups = group;
                    };
                    //
                    for (var gKey in groups) {
                        checkRows(groups[gKey]);
                    };
                };
            };
            //
            let checkItems: any = (group: any): boolean => {
                let retValue: boolean = true;
                //
                if (group && group.rows && group.rows.length > 0) {
                    for (var i = 0; i < group.rows.length; i++) {
                        if (group.rows[i]._selected !== true) {
                            retValue = false;
                            //
                            break;
                        };
                    };
                    //group.item._selected = retValue;
                }
                else {
                    let groups: any;
                    if (group && group.groups && Object.keys(group.groups)) {
                        groups = group.groups;
                    }
                    else {
                        groups = group;
                    };
                    //
                    for (var gKey in groups) {
                        let g: any = groups[gKey];
                        let itemsResult: boolean = checkItems(g);
                        //
                        if (itemsResult !== true) {
                            retValue = false;
                        };
                        g.item._selected = itemsResult;
                    };
                };
                //
                return retValue;
            };
            //
            return <i className={"fas fa-check " + className} onClick={() => {
                let item: any = row;
                item._selected = !v;
                //
                if (!isNaN(item._index)) {
                    source[index] = item;
                };
                //
                if (state.grouped === true) {
                    let gd: DataElement;
                    //
                    if (item._group) {
                        checkRows(item._parent[item._group], item._selected);
                        checkItems(item._root);
                        //
                        gd = global.createSuccessfulStoreObject(item._root);
                    }
                    else {
                        checkItems(item._parent.item._root);
                        //
                        gd = global.createSuccessfulStoreObject(item._parent.item._root);
                    }
                    //
                    newState = {
                        groupedData: gd,
                        selectedItem: source.filter((s: any, index: number) => { return (s._selected === true) ? global.assign(s) : null; })
                    };
                }
                else {
                    newState = {
                        selectedItem: source.filter((s: any, index: number) => { return (s._selected === true) ? global.assign(s) : null; }),
                        data: global.createSuccessfulStoreObject(source)
                    };
                };
                // update state data and selected
                that.setState(global.assign(state, newState));
            }}></i>;
        };
        configureDT(): any {
            let dtData: any = this.state.dtConfig;
            let data: DataElement = this.getData(this.props.config);
            if (!data) {
                data = global.createSuccessfulStoreObject([]);
            };
            let newData: DataElement = this.sortData(this.state.sort, data);
            let groupedData: DataElement;
            let groups: IDTGroup[] = dtData.groups.toArray();
            //
            if (groups.length > 0) {
                groupedData = this.groupData(newData);
            };
            let paging: dt.IDTPaging = this.setPaging(newData);
            //
            this.getFixedColumnHeaders(dtData);
            this.getRegularColumnHeaders(dtData);
            //
            let newState: IDataTableExtendedState = {
                dtData,
                data: newData,
                paging: paging,
                multiSelect: dtData.multiSelect,
                grouped: dtData.grouped
            };
            //
            this.setState(global.assign(this.state, newState));
        };
        onCellClick(item: any, row: number, col: number) {
            if (this.state.multiSelect === true) {
                return;
            };
            //
            if (item && item._group) {
                return;
            };
            let source: any[] = global.getData(this.state.data);
            item = global.assign(item);
            item._selected = true;
            //
            source.forEach(v => v._selected = false);
            source[row] = item;
            //
            let newSource: DataElement = this.state.data;
            newSource.data = source;
            //
            let newState: any = {
                selectedItem: item,
                data: newSource
            };
            // update state data and selected
            this.setState(global.assign(this.state, newState));
            //
            if (this.props.onRowSelected) {
                this.props.onRowSelected(item);
            };
            //this.setStateSelected(globalState);
        };
        onCellDoubleClick(item: any, row: number, col: number) {
            if (this.props.onRowDoubleClick) {
                this.props.onRowDoubleClick(item);
            } else {
                if (item && item.ID > 0) {
                    go(item.ID, true);
                };
            };
        };
        setPaging(data: DataElement): dt.IDTPaging {
            let paging: dt.IDTPaging = this.state.paging;
            let retValue: dt.IDTPaging = global.assign(paging, {
                pages: 0,
                blocks: 0,
                results: 0,
                startPage: 0,
                endPage: 0
            });
            if (this.state.paging) {
                if (global.isSuccessful(data)) {

                    let d: any[] = global.getData(data);
                    let pageCount: number = Math.ceil(d.length / paging.pageSize);
                    let page: number = paging.page <= pageCount ? paging.page : 1;
                    let startPage: number = (page - 1) * paging.pageSize;
                    let endPage: number = startPage + (paging.pageSize - 1);
                    //
                    retValue = global.assign(paging, {
                        page,
                        pages: pageCount,
                        blocks: Math.ceil(pageCount / paging.blockSize),
                        results: d.length,
                        startPage: startPage,
                        endPage: endPage
                    });
                };
            };
            //
            return retValue;
        };

        changeRowsPerPage(event: any, data: DataElement): void {
            var cantidadRegistrosPorPagina: number;

            if (event > 0)
                cantidadRegistrosPorPagina = event;
            else
                cantidadRegistrosPorPagina = +event.value;

            if (this.state.paging) {
                var paging: dt.IDTPaging = this.state.paging;

                let cantidadActual: number = paging.pageSize;

                if (cantidadActual != cantidadRegistrosPorPagina) {
                    let newPaging: dt.IDTPaging = global.assign(paging, {
                        page: 0,
                        pages: 0,
                        pageSize: 0,
                        blockSize: 0,
                        blocks: 0,
                        block: 0,
                        results: 0,
                        startPage: 0,
                        endPage: 0
                    });

                    paging.page = 0;

                    let datos: any[] = global.getData(data);
                    // ==========
                    let pageCount: number = Math.ceil(datos.length / cantidadRegistrosPorPagina);
                    let page: number = 1;
                    // ==========
                    let blockCount: number = Math.ceil(pageCount / cantidadRegistrosPorPagina);
                    let block: number = Math.ceil(page / cantidadRegistrosPorPagina);
                    // ==========
                    let startPage: number = (page - 1) * cantidadRegistrosPorPagina;
                    let endPage: number = startPage + (cantidadRegistrosPorPagina - 1);

                    newPaging = global.assign(paging, {
                        page,
                        pages: pageCount,
                        pageSize: cantidadRegistrosPorPagina,
                        block: block,
                        blocks: blockCount,
                        blockSize: cantidadRegistrosPorPagina,
                        results: datos.length,
                        startPage: startPage,
                        endPage: endPage
                    });

                    this.setState(global.assign(this.state, { paging: newPaging }));
                }
            };
        };

        changePage(page: number): void {
            if (this.state.paging) {
                let paging: dt.IDTPaging = this.state.paging;
                let startPage: number = (page - 1) * paging.pageSize;
                let endPage: number = startPage + (paging.pageSize - 1);
                //
                if (page < 1 || page > paging.pages) {
                    return;
                };

                let newPaging: dt.IDTPaging = global.assign(paging, {
                    page: page,
                    block: Math.ceil(page / paging.blockSize),
                    startPage: startPage,
                    endPage: endPage
                });
                //
                this.setState(global.assign(this.state, { paging: newPaging }));
            };
        };
        sortData(sortState: any, sortData?: DataElement): DataElement {
            if (!sortData) {
                sortData = this.state.data;
            };
            let data: any[] = global.getData(sortData);
            let retValue: DataElement = new DataElement();
            let column: dt.IDTColumn;
            let groups: dt.IDTGroup[] = this.state.dtConfig.groups.toArray();
            let isGrouped: boolean = groups && groups.length > 0;
            //
            let fnCompare: (a: any, b: any, c: dt.IDTColumn, o: string) => number = (a: any, b: any, c: dt.IDTColumn, o: string): number => {
                let va: any = global.getNestedProp(a, c.data);
                let vb: any = global.getNestedProp(b, c.data);
                //
                if (c.dataType === "string") {
                    va = global.isNull(va) ? "" : va.toString().toLocaleLowerCase();
                    vb = global.isNull(vb) ? "" : vb.toString().toLocaleLowerCase();
                };
                if (c.dataType === "number") {
                    va = global.isNull(va) ? 0 : parseInt(va, 10);
                    vb = global.isNull(vb) ? 0 : parseInt(vb, 10);
                };
                //
                if (o === "d") {
                    return va < vb ? -1 : (va > vb ? 1 : 0);
                }
                else if (o === "u") {
                    return va > vb ? -1 : (va < vb ? 1 : 0);
                }
                else {
                    return 0;
                };
            };
            //
            retValue.status = sortData.status;
            retValue.timestamp = sortData.timestamp;
            //
            if (sortState || isGrouped) {
                column = sortState ? sortState.column : null;
                let orientation: string = !sortState ? "d" : sortState.orientation;
                //
                if (data && data.length > 0) {
                    retValue.data = data.sort((a: any, b: any): number => {
                        let gResult: number = 0;
                        //
                        if (isGrouped) {
                            for (var iRow = 0; iRow < groups.length; iRow++) {
                                gResult = fnCompare(a, b, groups[iRow].column, orientation);

                                if (gResult !== 0) {
                                    break;
                                };
                            };
                        };
                        //
                        if (gResult === 0 && column !== null) {
                            gResult = fnCompare(a, b, column, orientation);
                        };
                        //
                        return gResult;
                    });
                };
            }
            else {
                retValue.data = sortData.data;
            };
            //
            if (retValue && retValue.data) {
                for (var i = 0; i < retValue.data.length; i++) {
                    retValue.data[i]._index = i;
                };
            };
            //
            return retValue;
        };
        groupData(groupData?: DataElement, Colapsar?: boolean): DataElement {
            let groups: dt.IDTGroup[] = this.state.dtConfig.groups.toArray();
            let isGrouped: boolean = groups && groups.length > 0;
            Colapsar = (Colapsar == undefined ? true : Colapsar);
            //
            if (!isGrouped) {
                return null;
            };
            //
            let groupedData: any = {}; //global.getData(this.state.groupedData);
            let data: any[] = global.getData(groupData);
            let retValue: DataElement;
            //
            // retValue.status = groupData.status;
            // retValue.timestamp = groupData.timestamp;
            //
            if (data && data.length > 0) {
                let groupIndex: number = 0;
                data.forEach((r: any, rIndex: any) => {
                    let current: any = groupedData;
                    let last: any;

                    //let subgrupo: dt.IDTGroup[] = [];

                    //groups.forEach((gru: dt.IDTGroup, gruIndex: number) =>
                    //{
                    //    let value: any = r[gru.data];
                    //    if (r[gru.data] != "")
                    //    {
                    //        subgrupo.push(gru);
                    //    }
                    //});


                    groups.forEach((g: dt.IDTGroup, gIndex: number) => {
                        let groupColumn: dt.IDTColumn = g.column;
                        if (groupColumn) {
                            let va: any = global.getNestedProp(r, groupColumn.data);

                            if ($.trim(va) === "") {
                                va = "...";
                            }
                            else {

                                let ci: any = current[va];
                                //
                                if (!ci) {
                                    ci = {
                                        column: groupColumn,
                                        groups: {},
                                        item: {
                                            _selected: false,
                                            _collapsed: Colapsar,
                                            _group: va,
                                            _count: 0,
                                            _index: "G$" + groupIndex,
                                            _indent: gIndex,
                                            _parent: current,
                                            _root: groupedData
                                            // add aggregate
                                        },
                                        rows: []
                                    };
                                    groupIndex = groupIndex + 1;
                                };
                                //
                                ci.item._count = ci.item._count + 1;
                                //
                                current[va] = ci;
                                //
                                last = ci;
                                current = ci.groups;
                            }

                        };
                    });
                    if (last) {
                        r._parent = last;
                        if (last.item._collapsed === true) {
                            r._hidden = true;
                        };
                        last.rows.push(r);
                    };
                });
            };
            //
            retValue = global.createSuccessfulStoreObject(groupedData);
            //
            return retValue;
        };
        onSortClick(column: dt.IDTColumn) {
            let sort: string = this.state.sort ? this.state.sort.orientation : "";
            let sortState: any = { column };
            let data: any[] = global.getData(this.state.data);
            let retValue: DataElement;
            let Colapsar: boolean = false;
            //
            let groupedData: DataElement;
            //
            if (sort === "d") {
                sortState.orientation = "u";
                retValue = this.sortData(sortState);
            }
            else {
                sortState.orientation = "d";
                retValue = this.sortData(sortState);
            };
            //
            let groups: dt.IDTGroup[] = this.state.dtConfig.groups.toArray();
            if (groups && groups.length > 0) {
                groupedData = this.groupData(retValue, Colapsar);
            };
            //
            this.setState(global.assign(this.state, {
                sort: sortState,
                data: retValue,
                groupedData
            }));
        };
        getFixedColumnHeaders(tableState: any) {
            let retValue: any[] = [];
            //
            tableState.multiSelect = false;
            let columns: dt.IDTColumn[] = this.state.dtConfig.columns.toArray();
            //
            if (columns) {
                let column: dt.IDTColumn;
                for (var i = 0; i < columns.length; i++) {
                    column = columns[i];
                    if (column.fixed === true) {
                        retValue.push(column);
                    };
                    if (column.data === "_selected") {
                        column.format = this.formatCheckItem;
                        tableState.multiSelect = true;
                    };
                };
            };
            // insert group's column if apply
            let groups: dt.IDTGroup[] = this.state.dtConfig.groups.toArray();
            if (groups && groups.length > 0) {
                let that: any = this;
                let groupColumn: dt.IDTColumn = {
                    data: "_group",
                    fixed: true,
                    width: "200px",
                    format: (data: any, row: any, index: number, source: any[], config: page.IPageConfig): any => {
                        //let v: boolean = data === true;
                        //
                        let r: any = row;
                        let margen: any = (r._indent) * 20;
                        let s: any = source;
                        if (r && r._group) {
                            let hideElements: any = (e: any, actionCollapse: boolean) => {
                                if (e.groups && Object.keys(e.groups).length > 0) {
                                    for (var fe in e.groups) {
                                        if (actionCollapse === true) {
                                            e.groups[fe]._hidden = true;
                                            hideElements(e.groups[fe], true);
                                        }
                                        else {
                                            e.groups[fe]._hidden = false;
                                            if (e.groups[fe]._collapsed === true) {
                                                hideElements(e.groups[fe], true);
                                            }
                                            else {
                                                hideElements(e.groups[fe], false);
                                            };
                                        };
                                    };
                                }
                                else {
                                    if (e.rows && e.rows.length > 0) {
                                        for (var i = 0; i < e.rows.length; i++) {
                                            e.rows[i]._hidden = actionCollapse;
                                        };
                                    };
                                };
                            };
                            let groupArrowClass: string = "fas fa-caret-right dteGroupArrow";
                            if (r._collapsed === true) {
                                groupArrowClass = groupArrowClass + " dteGroupArrowCollapsed";
                            };
                            return <div style={{ paddingLeft: margen + "px" }}>
                                <div className={groupArrowClass} onClick={() => {
                                    let newItem: any = global.assign(r);
                                    let cItem: any = newItem._parent[newItem._group];
                                    //
                                    newItem._collapsed = newItem._collapsed === true ? false : true;
                                    newItem._hidden = false;

                                    for (var i = 0; i < cItem.rows.length; i++) {
                                        cItem.rows[i]._hidden = newItem._collapsed;
                                    }
                                    //
                                    newItem._parent[newItem._group].item = newItem;
                                    //
                                    hideElements(newItem._parent[newItem._group], newItem._collapsed);
                                    //
                                    that.setState(global.assign(that.state, {
                                        groupedData: global.createSuccessfulStoreObject(newItem._root)
                                    }));
                                }}></div>
                                <div className="dteGroupBadge"> {r._count}</div >
                                <div className="dteGroupText">{data}</div>
                            </div>;
                        }
                        else {
                            return <div>{data}</div>;
                        };
                    }
                };
                if (tableState.multiSelect === true) {
                    retValue.splice(1, 0, groupColumn);
                }
                else {
                    retValue.splice(0, 0, groupColumn);
                };
                tableState.grouped = true;
            };
            //
            tableState.fixedColumns = retValue;
        };
        getRegularColumnHeaders(tableState: any) {
            let retValue: any[] = [];
            let columns: dt.IDTColumn[] = this.state.dtConfig.columns.toArray();
            //let groups: dt.IDTGroup[] = this.state.dtConfig.groups.toArray();
            //
            if (columns) {
                let column: dt.IDTColumn;
                for (var i = 0; i < columns.length; i++) {
                    column = columns[i];
                    if (column.fixed !== true) {
                        retValue.push(column);
                    };
                };
            };
            //
            tableState.regularColumns = retValue;
        };
        getFixedRows() {
        };
        getRegularRows() {
        };
        getSortClassName(column: dt.IDTColumn): string {
            let sortState: any = this.state.sort;
            let retValue: string = "dteIconSort fas";
            //
            if (sortState) {
                if (column.data === sortState.column.data) {
                    if (sortState.orientation == "d") {
                        retValue += " fa-sort-down";
                    }
                    else if (sortState.orientation == "u") {
                        retValue += " fa-sort-up";
                    }
                    else {
                        retValue += " fa-sort";
                    };
                }
                else {
                    retValue += " fa-sort";
                };
            }
            else {
                retValue += " fa-sort";
            };
            //
            return retValue;
        };
        formatColumnHeaders() {
            let retValue: any = {
                fixed: {},
                regular: {}
            };
            let config: any = this.state.dtData;
            //
            let hasFixedColumns: boolean = config && config.fixedColumns && config.fixedColumns.length > 0 ? true : false;
            let fColumns: any[] = config && config.fixedColumns ? config.fixedColumns : [];
            let rColumns: any[] = config && config.regularColumns ? config.regularColumns : [];
            let columnCount: number = fColumns.length + rColumns.length;
            //
            if (config && config.regularColumns) {
                let fixedContainerSize: number = 0;
                //
                fColumns.forEach((value: dt.IDTColumn, index: number) => {
                    let customHObjects: any[] = [];
                    if (value.isModal === true) {
                        let modalId: string = "modal" + value.data.replace(".", "_");
                        //
                        customHObjects.push(<modal.Modal id={modalId} key={modalId} url={"about:blank"}></modal.Modal>);
                    };
                    if (value.hidden !== true) {
                        let className: string = "dteFixedRowHeader dteCell";
                        let sortClassName: string = this.getSortClassName(value);
                        //
                        if (index === 0) {
                            className += " dteFirstCell";
                        };
                        //
                        if (columnCount - 1 === index) {
                            className += " dteLastCell";
                        };
                        //
                        let style: React.CSSProperties = {};
                        if (value.width) {
                            style.width = value.width;
                        };
                        if (value.flex) {
                            if (value.flex.grow) {
                                style.flexGrow = value.flex.grow;
                            };
                            if (value.flex.basis) {
                                style.flexBasis = value.flex.basis;
                            };
                        };
                        //
                        fixedContainerSize += value.width;
                        //
                        retValue.fixed[value.data] = [<div
                            key={"dte_header_" + index + "_" + value.data}
                            className={className}
                            style={style}>
                            {value.title}
                            <div className={sortClassName} onClick={() => { this.onSortClick(value); }}></div>
                            {customHObjects}
                        </div>];
                    };
                });
                retValue.fixedContainerSize = fixedContainerSize;
                //

                retValue.regular = <div key="dteScrollRowHeader" className="dteScrollRowHeader">
                    {rColumns.map((value: dt.IDTColumn, index: number) => {
                        if (value.hidden !== true) {
                            if (value.fixed === true) {
                                return null;
                            };
                            let customHObjects: any[] = [];
                            if (value.isModal === true) {
                                let modalId: string = "modal" + value.data.replace(".", "_");
                                //
                                customHObjects.push(<modal.Modal id={modalId} key={modalId} url={"about:blank"}></modal.Modal>);
                            };
                            //
                            let className: string = "dteCell";
                            let sortClassName: string = this.getSortClassName(value);
                            //
                            if (hasFixedColumns === false && index === 0) {
                                className += " dteFirstCell";
                            };
                            //
                            if (rColumns.length - 1 === index) {
                                className += " dteLastCell";
                            };
                            //
                            let style: React.CSSProperties = {};
                            if (value.width) {
                                style.width = value.width;
                            };
                            if (value.flex) {
                                if (value.flex.grow) {
                                    style.flexGrow = value.flex.grow;
                                };
                                if (value.flex.basis) {
                                    style.flexBasis = value.flex.basis;
                                };
                            };
                            //
                            return <div
                                key={"dte_header_" + index + "_" + value.data}
                                className={className}
                                style={style}>
                                {value.title}
                                <div className={sortClassName} onClick={() => { this.onSortClick(value); }}></div>
                                {customHObjects}
                            </div>;
                        };
                    })}
                </div>;
            };
            //
            return retValue;
        };
        isSelected(item: any) {
            let retValue: boolean = false;
            //
            if (this.state.selectedItem) {
                if (this.state.multiSelect === true) {
                    let items: any[] = this.state.selectedItem;
                    retValue = items.some((value: any, index: number) => {
                        return global.isEqualID(item, value) && value._selected === true;
                    });
                }
                else {
                    retValue = global.isEqualID(item, this.state.selectedItem);
                };
            };
            //
            return retValue;
        };
        formatRegularRows(data: any[], headers: any) {
            let retValue: any = {
                regular: [],
                fixed: []
            };
            //
            let formatFR: (frItem: any, frColumn: dt.IDTColumn, frColumIndex: number, rowClassName: string) => any =
                (frItem: any, frColumn: dt.IDTColumn, frColumIndex: number, rowClassName: string): any => {
                    if (frColumn.hidden !== true) {
                        let v: any = global.getNestedProp(frItem, frColumn.data);
                        let style: React.CSSProperties = { width: frColumn.width };
                        let alignment: string = frColumn.align !== "left" ? frColumn.align : "";
                        //
                        if (frColumn.align && frColumn.align !== "") {
                            style.textAlign = frColumn.align;
                        };
                        //
                        if (frColumn.format) {
                            v = frColumn.format(v, frItem, frItem._index, data, propsConfig);
                        };
                        //
                        globalIndex = globalIndex + 1;
                        //
                        let nameH: string = "dte_cell_";
                        if (frItem._group) {
                            nameH = nameH + "fr_";
                        }

                        headers.fixed[frColumn.data].push(<div
                            key={nameH + this.state.id + "_" + frItem._index + "_" + frColumIndex}
                            className={rowClassName}
                            style={style}
                            onClick={() => { this.onCellClick(frItem, frItem._index, frColumIndex); }}
                            onDoubleClick={() => { this.onCellDoubleClick(frItem, frItem._index, frColumIndex); }}
                        >{v}</div>);
                    };
                };
            //
            let formatRR: (rrItem: any, rowClassName: string, cellClassName: string) => any =
                (rrItem: any, rowClassName: string, cellClassName: string): any => {
                    //
                    globalIndex = globalIndex + 1;
                    //
                    return <div
                        key={"dte_row_" + this.state.id + "_" + rrItem._index}
                        className={rowClassName}>
                        {rColumns.map((column: dt.IDTColumn, indexColumn: number) => {
                            if (column.hidden !== true) {
                                let v: any = global.getNestedProp(rrItem, column.data);
                                let style: React.CSSProperties = {};
                                let alignment: string = column.align !== "left" ? column.align : "";
                                //
                                if (column.align && column.align !== "") {
                                    style.textAlign = column.align;
                                };
                                //
                                if (column.format) {
                                    v = column.format(v, rrItem, rrItem._index, data, propsConfig);
                                };
                                //
                                if (column.width) {
                                    style.width = column.width;
                                };
                                if (column.flex) {
                                    if (column.flex.grow) {
                                        style.flexGrow = column.flex.grow;
                                    };
                                    if (column.flex.basis) {
                                        style.flexBasis = column.flex.basis;
                                    };
                                };
                                //
                                globalIndex = globalIndex + 1;
                                //
                                return <div
                                    key={"dte_cell_rr_" + this.state.id + "_" + rrItem._index + "_" + indexColumn}
                                    className={cellClassName}
                                    style={style}
                                    onClick={() => { this.onCellClick(rrItem, rrItem._index, indexColumn); }}
                                    onDoubleClick={() => { this.onCellDoubleClick(rrItem, rrItem._index, indexColumn); }}
                                >{v}</div>;
                            };
                        })}
                    </div>;
                };
            //
            let globalIndex: number = 0;
            let config: any = this.state.dtData;
            let paging: dt.IDTPaging = this.state.paging;
            let propsConfig: any = global.assign(this.props.config);
            propsConfig.slot = this.props.id;
            //
            let hasFixedColumns: boolean = config && config.fixedColumns && config.fixedColumns.length > 0 ? true : false;
            let rColumns: any[] = config && config.regularColumns ? config.regularColumns : [];
            let fColumns: any[] = config && config.fixedColumns ? config.fixedColumns : [];
            //
            let groups: dt.IDTGroup[] = this.state.dtConfig.groups.toArray();
            if (groups && groups.length > 0) {
                let fnCreateGroups: any = (groupParent: any) => {
                    for (var gd in groupParent) {
                        let groupData: any = groupParent[gd];
                        //
                        // add expand
                        // add column
                        let item: any = groupData.item;
                        let groupClass: string = "dteGroupCell";
                        //
                        if (groupData._hidden === true) {
                            groupClass += " dteCellCollapsed";
                        };
                        fColumns.forEach((column: dt.IDTColumn, indexColumn: number) => {
                            headers.fixed[column.data].push(formatFR(item, column, indexColumn, groupClass));
                        });

                        retValue.regular.push(formatRR(item, "dteRow", groupClass));
                        //
                        if (groupData.item._collapsed !== true) {
                            if (groupData.rows && groupData.rows.length > 0) {
                                for (var itemIndex = 0; itemIndex < groupData.rows.length; itemIndex++) {
                                    let item: any = groupData.rows[itemIndex];
                                    let cellClassCollapsed: string = "";
                                    let evenOddClass: string = itemIndex % 2 === 0 ? "dteEven" : "dteOdd";
                                    let selectedClass: string = this.isSelected(item) ? "dteSelected" : "";
                                    //
                                    if (item._hidden === true) {
                                        cellClassCollapsed += " dteCellCollapsed ";
                                    };
                                    //
                                    fColumns.forEach((column: dt.IDTColumn, indexColumn: number) => {
                                        headers.fixed[column.data].push(formatFR(item, column, indexColumn, "dteCell dteFixedCell " + cellClassCollapsed + evenOddClass + " " + selectedClass));
                                    });
                                    //
                                    retValue.regular.push(formatRR(item, "dteRow " + evenOddClass + " " + selectedClass, "dteCell" + cellClassCollapsed));
                                };
                            };

                            if (groupData.groups && Object.keys(groupData.groups).length > 0) {
                                fnCreateGroups(groupData.groups);
                            }

                        };
                    };
                };
                //
                if (global.isSuccessful(this.state.groupedData)) {
                    fnCreateGroups(global.getData(this.state.groupedData));
                };
            }
            else {
                if (this.state.dtData && this.state.dtData.regularColumns) {
                    let startIndex: number;
                    let endIndex: number;
                    //
                    if (this.props.dtConfig.props.displayPaging === true) {
                        //let endPage: number = paging.endPage >= data.length ? data.length - 1 : paging.endPage;
                        startIndex = paging.startPage;
                        endIndex = paging.endPage >= data.length ? data.length - 1 : paging.endPage;
                    }
                    else {
                        startIndex = 0;
                        endIndex = data.length - 1;
                    };
                    //
                    for (var itemIndex = startIndex; itemIndex <= endIndex; itemIndex++) {
                        let item: any = data[itemIndex];
                        let ii: number = itemIndex;
                        let evenOddClass: string = ii % 2 === 0 ? "dteEven" : "dteOdd";
                        let selectedClass: string = this.isSelected(item) ? "dteSelected" : "";
                        //
                        fColumns.forEach((column: dt.IDTColumn, indexColumn: number) => {
                            headers.fixed[column.data].push(formatFR(item, column, indexColumn, "dteCell dteFixedCell " + evenOddClass + " " + selectedClass));
                        });

                        retValue.regular.push(formatRR(item, "dteRow " + evenOddClass + " " + selectedClass, "dteCell"));
                    };
                };
            };
            //
            if (headers && headers.fixed) {
                for (var c in headers.fixed) {
                    retValue.fixed.push(headers.fixed[c]);
                }
            };
            //
            return retValue;
        };
        getRefreshStatus(config: page.IPageConfig): any {
            let statusId: string;

            if (config.hasSlot(this.props.id)) {
                statusId = "catalogo$" + this.props.id + "$refresh";
            }
            else {
                statusId = "currentCatalogo$refresh";
            };

            return config.state[statusId];
        };
        getData(config: page.IPageConfig): any {
            let id: string = this.props.id;
            let retValue: global.DataElement;
            //
            if (this.props.onGetData) {
                retValue = this.props.onGetData(retValue);
            }
            else {
                let slot: string;
                if (config.hasSlot(id)) {
                    retValue = config.getCatalogo(id);
                }
                else {
                    retValue = config.getCatalogo();
                };
            };
            //
            return retValue;
        };
        setStateSelected(item: any) {
            let config: page.IPageConfig = this.props.config;
            let id: string = this.props.id;
            //
            if (this.props.onRowSelected) {
                this.props.onRowSelected(item);
            };
            //
            let slot: string;
            if (config.hasSlot(id)) {
                config.setEntity(item, id);
            }
            else {
                config.setEntity(item);
            };
        };
        render(): JSX.Element {
            let data: DataElement = this.state.data;
            let headers: any = this.formatColumnHeaders();
            let rows: any;
            let regularHeaders: any = headers.regular;
            let fixedColumns: any[] = headers.fixed;
            let paging: dt.IDTPaging = this.state.paging ? this.state.paging : { page: 1, pages: 1, pageSize: 1, results: 0, block: 1, blockSize: 1 };
            let pages: any[] = [];
            let displayPaging: boolean = this.state.grouped !== true;
            let mainClassName: string = this.props.dtType === "dt" ? "dataTableExtended" : "dataListExtended";

            //
            //console.count("*** RENDER: DataTabl$Extended ***");

            if (this.state.dtConfig.props.displayPaging === false) {
                displayPaging = false;
            };

            if (global.isSuccessful(data)) {
                let d: any = global.getData(data);
                //
                rows = this.formatRegularRows(d, headers);
                //
                if (displayPaging === true) {
                    for (var i = 0; i < paging.blockSize; i++) {
                        let pageOffset: number = i + (((paging.block - 1) * paging.blockSize) + 1);
                        let selectedPage: string = paging.page === pageOffset ? "dtePagingPageSelected" : "";
                        //
                        if (pageOffset > paging.pages) {
                            break;
                        };
                        //
                        pages.push(<div key={"dte_page_" + i} className={"dtePagingPage " + selectedPage} onClick={() => { this.changePage(pageOffset); }}>{pageOffset}</div>);
                    };
                };
            };

            //
            return <UpdateColumn info={data} className="dte-update">
                <div className={mainClassName} ref="container">
                    {rows && rows.fixed && rows.fixed.length > 0 ?
                        <div className="dteFixed">
                            {rows.fixed.map((value: any, index: number) => {
                                return <div key={"dte_fixed_column_" + index} className="dteColumn">
                                    {value}
                                </div>
                            })}
                        </div> : null}
                    <div className="dteScroll">
                        <div className="dteScrollContainer">
                            {regularHeaders}
                            {rows ? rows.regular : null}
                        </div>
                    </div>
                </div>
                {displayPaging ?
                    <div className="dataTableExtended dtePagingContainer">
                        <div className="dtePagingTotals">
                            <span className="dtePageLabel">Páginas:</span>
                            <span className="dtePageCount">{paging.pages}</span>
                            <span className="dteResultsLabel">Resultados:</span>
                            <span className="dteResultsCount">{paging.results}</span>
                        </div>
                        <div className="dteNavigation">
                            <div className="dtePagingNavBack">
                                <div className="dtePagingNav" onClick={() => { this.changePage(1); }}><i className="fad fa-angle-double-left"></i></div>
                                <div className="dtePagingNav" onClick={() => { this.changePage(paging.page - 1); }}><i className="fad fa-angle-left"></i></div>
                            </div>
                            <div className="dtePagingBlock">
                                {pages}
                            </div>
                            <div className="dtePagingNavNext">
                                <div className="dtePagingNav" onClick={() => { this.changePage(paging.page + 1); }}><i className="fad fa-angle-right"></i></div>
                                <div className="dtePagingNav" onClick={() => { this.changePage(paging.pages); }}><i className="fad fa-angle-double-right"></i></div>
                            </div>
                        </div>
                    </div>
                    : null}
            </UpdateColumn>;
        };
    };

    export const DataTableExtended: any = ReactRedux.connect(DataTable$Extended.props, null)(DataTable$Extended);
};
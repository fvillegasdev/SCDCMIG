/// <reference path="../typings/react/react-global.d.ts" />
 
namespace EK.UX {
    "use strict";
    declare var initTimeLines: () => any;
    export interface IListProps extends React.Props<any> {
        id?: string;
        actions?: any[];
        formatter?: (index: number, item: any, values?: any) => JSX.Element;
        items?: any[] | DataElement;
        url?: string;
        onChange?: (items: any[]) => void;
        itemClass?: string;
        readonly?: boolean;
        addRemoveButton?: boolean;
        listHeader?: JSX.Element;
        listFooter?: any;
        aggregate?: (item?: any, values?: any) => any;
        childrenPropertyName?: string;
        dragAndDrop?: boolean;
        onItemClick?: (item: any) => void;
        onRemoveNestedItem?: (item: any) => void;
        listMode?: string;
        horizontalScrolling?: boolean;
        selectable?: boolean;
        height?: any; 
        drawOddLine?: any; 
    }

    interface IListItemProps extends React.Props<any> {
        id?: string;
        formatter?: (index: number, item: any) => JSX.Element;
        onRemoveItem?: (index: number, item: any) => void;
        index: number;
        item: any;
        itemClass?: string;
        readonly?: boolean;
        dragAndDrop?: boolean;
        addRemoveButton?: boolean;
        children?: any[];
        values?: any;
        onItemClick?: (item: any, element?: any) => void;
        onClickButton?: (item: any) => void;
        onRemoveNestedItem?: (item: any) => void;
        listMode?: string;
        drawOddLineBGColor?: any;
    }

    export class ListItem extends React.Component<IListItemProps, IListItemProps> {
        constructor(props: IListItemProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
            this.onClickButton = this.onClickButton(this);
        }

        refs: {
            item: Element;
        };

        onClick(e: any): any {
            if (this.props.onItemClick) {
                this.props.onItemClick(this.props.item, this.refs.item);
            }
        }

        onClickButton(e: any): any {
            if (this.props.onClickButton) {
                this.props.onClickButton(this.props.item);
            }
        }

        componentDidMount(): void {
            if (!this.props.readonly) {
                let item: any = $(this.refs.item);
                item.bind("click", (e: any) => {
                    e.stopPropagation();

                    if (this.props.onRemoveItem) {
                        this.props.onRemoveItem(this.props.index, this.props.item);
                    }
                });
                item.bind("mousedown", (e: any) => {
                    e.stopPropagation();
                });
            }
        }

        componentWillUnmount(): void {
            if (!this.props.readonly) {
                let item: any = $(this.refs.item);

                item.unbind();
            }
        }

        render(): JSX.Element {
            let fnFormatter: (index: number, item: any, values?: any) => JSX.Element =
                (this.props.formatter !== undefined ?
                    this.props.formatter :
                    (index: number, item: any, values?: any): JSX.Element => { return item.text; });

            let hasDataProp: boolean = this.props.item !== undefined;

            if (this.props.listMode === "list") {
                if (!this.props.readonly) {
                    let removeElement: JSX.Element = <i ref="item" className="glyphicon glyphicon-remove tt-item-remove" style={{ float: "right" }}></i>;
                    let className: string = "dd3-content";
                    let contenBackGround: any;
                    if (this.props.itemClass) {
                        className += " " + this.props.itemClass;
                    };

                    if (this.props.dragAndDrop === true) {
                        className += " dd-handle";
                    };
                    contenBackGround = "none";
                    if (this.props.drawOddLineBGColor === true) {
                        contenBackGround = "#f9f9f9"
                    }

                    return <li className="dd-item dd3-item" data-id={this.props.item.ID} tabIndex={0}>
                        <div className={className} style={{ background: contenBackGround, paddingLeft: 5, height: "auto" }}>
                            {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                            {this.props.addRemoveButton ? removeElement : null}
                        </div>
                        {this.props.children && this.props.children.length > 0 ?
                            <ol className="dd-list">
                                {this.props.children}
                            </ol> : null}
                    </li>;
                } else {
                    let contenBackGround: string = "none";

                    if (this.props.drawOddLineBGColor === true) {
                        contenBackGround = "#f9f9f9"
                    };

                    return <li
                        ref="item"
                        className={"mt-list-item" + (this.props.index % 2 === 0 ? "" : " mt-list-item-odd")}
                        data-id={this.props.item.ID}
                        tabIndex={0}
                        style={{ backgroundColor: contenBackGround, cursor: "pointer", paddingBottom: 5, paddingTop: 5, border: "none", listStyle: "none" }}
                        onClick={this.onClick}>
                        {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                    </li>;
                };
            }
            else if (this.props.listMode === "literal") {
                return <div
                    ref="item"
                    data-id={this.props.item.ID}
                    style={{ cursor: "pointer", border:"none" }}
                    onClick={this.onClick}>
                    {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                </div>;
            }
            else if (this.props.listMode === "viewTaskSPV") {
                return <div
                    ref="item"
                    data-id={this.props.item.ID}
                    style={{ cursor: "pointer", border: "none" }}
                    onClick={this.onClick}>
                    {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                </div>;
            }
            else {
                if (this.props.listMode === "cards") {
                    let selected: string = "";
                    if (this.props.index === 0) {
                        selected = "selected";
                    };
                    return <li
                        ref="item"
                        data-id={this.props.item.ID}
                        onClick={this.onClick}>
                        <a
                            data-spacing="50"
                            data-ek_with_content="200"
                            className={"border-after-blue ek-bg-after-blue " + selected}
                            data-date="13/04/2018"
                            style={{ height: 60 }}
                        >
                            <div className="dashboard-stat2">
                                <div className="display" style={{ textAlign: "left" }}>
                                    {fnFormatter(this.props.index, this.props.item, this.props.values)}
                                </div>
                            </div>
                        </a>
                        {/*<!-- indicadores por fase, macro-etapa y/o etapa -->*/}
                    </li>
                } else {
                    if (this.props.listMode === "list-horizontal") {
                        if (!this.props.readonly) {
                            let removeElement: JSX.Element = <i ref="item" className="glyphicon glyphicon-remove tt-item-remove" style={{ float: "right" }}></i>;
                            let className: string = "";

                            if (this.props.itemClass) {
                                className += " " + this.props.itemClass;
                            };

                            if (this.props.dragAndDrop === true) {
                                className += " dd-handle";
                            };

                            return <li className="dd-item dd3-item" data-id={this.props.item.ID} style={{ listStyle: "none" }}>
                                <div className={className} style={{ paddingLeft: 5, height: "auto" }}>
                                    {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                                    {this.props.addRemoveButton ? removeElement : null}
                                </div>
                                {this.props.children && this.props.children.length > 0 ?
                                    <ol className="av navbar-nav ">
                                        {this.props.children}
                                    </ol> : null}
                            </li>;
                        } else {
                            return <li
                                ref="item"
                                className="mt-list-item"
                                data-id={this.props.item.ID}
                                style={{ cursor: "pointer", paddingBottom: 5, paddingTop: 5, border: "none", listStyle: "none"  }}
                                onClick={this.onClick}>
                                {hasDataProp ? fnFormatter(this.props.index, this.props.item, this.props.values) : this.props.children}
                            </li>;
                        }
                    }

                }
            }
        }
    }

    export class List extends React.Component<IListProps, IListProps> {
        constructor(props: IListProps) {
            super(props);

            this.listInit = this.listInit.bind(this);
        }

        static defaultProps: IListProps = {
            items: new DataElement(),
            formatter: (index: number, item: any): JSX.Element => {
                return item.text;
            },
            dragAndDrop: false,
            url: "",
            readonly: true,
            addRemoveButton: false,
            listMode: "list",
            horizontalScrolling: false,
            drawOddLine:false
        };

        refs: {
            list: Element;
        };

        onRemoveItem:
        (index: number, item: any) => void =
        (index: number, item: any) => {
            let items: any;
            let propItems: any = this.props.items;

            if (this.props.onRemoveNestedItem) {
                this.props.onRemoveNestedItem(item);
            }
            else {
                if (propItems.data) {
                    items = {
                        data: propItems.data.splice(0),
                        timestamp: Number(new Date()),
                        status: propItems.status
                    };

                    items.data.splice(index, 1);
                } else {
                    items = propItems.splice(0);
                    items.splice(index, 1);
                }

                if (this.props.onChange) {
                    this.props.onChange(items);
                } else {
                    this.setState({
                        items: items
                    });
                }
            }
        }

        getItemId:
        (item: any) => number =
        (item: any): number => {
            if (item) {
                if (item.ID) return item.ID;
                if (item.Id) return item.Id;
                if (item.id) return item.id;
            }

            return undefined;
        };

        shouldComponentUpdate(nextProps: IListProps, nextState: IListProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };

        listInit(): void {
            if (this.props.listMode === "list") {
                if (!this.props.readonly) {
                    let list: any = $(this.refs.list);

                    list.nestable().on("change", (p, q) => {
                        p.stopPropagation();

                        let data: any[] = list.nestable("serialize");
                        let newData: any[] = [];
                        let items: any = this.props.items;
                        let listData: any[] = items && items.data ? items.data : items;

                        if (data && data.length > 0) {
                            data.forEach((itemData: any, index: number) => {
                                for (var i = 0; i < listData.length; i++) {
                                    if (itemData.id === this.getItemId(listData[i])) {
                                        newData.push(EK.Global.assign({}, listData[i]));

                                        break;
                                    };
                                };
                            });
                        }

                        if (this.props.onChange) {
                            this.props.onChange(newData);
                        } else {
                            this.setState({
                                items: newData
                            });
                        }
                    });
                };
            };
        }

        listDestroy(): void {
            if (this.props.listMode === "list") {
                let list: any = $(this.refs.list);

                list.nestable().off("change");
                list.nestable("destroy");
            };
        }

        componentDidMount(): void {
            this.listInit();
            if (this.props.listMode === "cards") {
                initTimeLines();
            }
        }

        componentWillUnmount(): void {
            this.listDestroy();
        }

        componentWillUpdate(nextProps: IListProps, nextState: any) {
            this.listDestroy();
        }

        componentDidUpdate(): void {
            this.listInit();
        }

        //componentWillReceiveProps(nextProps: IListProps): any {
        //    this.props = {
        //        items: nextProps.items
        //    };
        //}

        render(): JSX.Element {
            let items: any;
            let propItems: any = this.props.items;
            let listData: any[] = propItems && propItems.data ? propItems.data : this.props.items;
            let hasData: boolean = listData.length > 0;
            let values: any = {};
            let menuOptions: any[];
            let menuContextId: string = "#" + this.props.id + "_contextMenu";
            let configHeight: any;
            if (hasData) {
                let listItems: any[] = [];

                let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                    let retValue: any = (items === undefined || items === null) ? null :
                        items.map((item: any, i: number): any => {
                            //console.log(item)
                            let itemKey: string = "list-item-key-"+i+"_" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                            let _children: any[] = null;
                            let cpn: string = this.props.childrenPropertyName;
                            let itemClick: any = this.props.onItemClick;
                            let drawOddLine: any = this.props.drawOddLine && this.props.drawOddLine === true ? true : false; 
                            let drawOddLineBGColor: any;
                            if (cpn && item[cpn]) {
                                _children = fnCreateList(item[cpn]);
                            };

                            if (this.props.aggregate) {
                                values = this.props.aggregate(item, values);
                            };

                            
                            if (drawOddLine === true) {
                                drawOddLineBGColor = true;
                                if ((i % 2) == 0) {
                                    drawOddLineBGColor = false;
                                }
                            }

                            return <ListItem
                                key={itemKey}
                                index={i}
                                item={item}
                                values={EK.Global.assign({}, values)}
                                children={_children}
                                drawOddLineBGColor={drawOddLineBGColor}
                                dragAndDrop={this.props.dragAndDrop}
                                formatter={this.props.formatter}
                                onRemoveItem={this.onRemoveItem}
                                itemClass={this.props.itemClass}
                                readonly={this.props.readonly}
                                onItemClick={itemClick}
                                listMode={this.props.listMode}
                                addRemoveButton={this.props.addRemoveButton} />;
                        });

                    return retValue;
                };

                items = fnCreateList(listData);
            }

            let footer: any;
            if (this.props.listFooter && typeof this.props.listFooter === "function") {
                footer = this.props.listFooter(values);
            } else {
                footer = this.props.listFooter;
            }


            if (this.props.listMode === "list") {
                if (!this.props.readonly) {
                    let className: string = "dd ";
                    configHeight = undefined;
                    if (this.props.horizontalScrolling === true) {
                        className += "list-scrollable-x ";
                        if (this.props.height) {
                            configHeight = this.props.height;
                        }
                    }

                    if (this.props.selectable === true) {
                        className += "list-selectable ";
                    }

                    return <div key={this.props.key} className={className} ref="list" style={{ height: configHeight }}>
                        {this.props.id ? <menu.ContextMenu id={this.props.id + "_contextMenu"} options={menuOptions} /> : null}
                        {this.props.listHeader}
                        <ol className="dd-list">
                            {items}
                        </ol>
                        {footer}
                    </div>;
                } else {
                    let className: string = "mt-element-list ";

                    configHeight = undefined;
                    if (this.props.horizontalScrolling === true) {
                        className += "list-scrollable-x ";
                        if (this.props.height) {
                            configHeight = this.props.height;
                        }
                    }

                    if (this.props.selectable === true) {
                        className += "list-selectable ";
                    }

                    return <div key={this.props.key} className={className} style={{ height: configHeight }}>
                        {this.props.listHeader}
                        <div className="" style={{ paddingTop: 0, border: "none" }} ref="list">
                            <ul style={{ padding: 0 }}>
                                {items}
                            </ul>
                        </div>
                        {footer}
                    </div>;
                }
            }
            else if (this.props.listMode === "literal") {
                return <div key={this.props.key} style={{ height: configHeight }}>
                    {this.props.listHeader}
                    <div style={{ padding: 10, paddingTop: 0, border: "none" }} ref="list">
                        {items}
                    </div>
                    {footer}
                </div>;
            }
            else {
                if (this.props.listMode === "cards") {
                    return <div className="cd-horizontal-timeline mt-timeline-horizontal loaded" data-spacing="60">
                        <div className="timeline mt-timeline-square">
                            <div className="events-wrapper">
                                <div className="events">
                                    <ol>
                                        {items}
                                    </ol>
                                    <span className="filling-line bg-blue" aria-hidden="true"></span>
                                </div>
                                {/*<!-- .events -->*/}
                            </div>
                            {/*<!-- .events-wrapper -->*/}
                            <ul className="cd-timeline-navigation mt-ht-nav-icon">
                                <li>
                                    <a href="javascript:void(0)" className="prev btn btn-outline blue md-skip inactive">
                                        <i className="fa fa-chevron-left"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="next btn btn-outline blue md-skip">
                                        <i className="fa fa-chevron-right"></i>
                                    </a>
                                </li>
                            </ul>
                            {/*<!-- .cd-timeline-navigation -->*/}
                        </div>
                        {/*<!-- .timeline -->*/}
                        {/*<!-- .events-content -->*/}
                    </div>;
                } else {
                    if (this.props.listMode === "list-horizontal") {
                        if (!this.props.readonly) {
                            return <div key={this.props.key} className="dd" ref="list">
                                {this.props.id ? <menu.ContextMenu id={this.props.id + "_contextMenu"} options={menuOptions} /> : null}
                                {this.props.listHeader}
                                <ol className="nav navbar-nav">
                                    {items}
                                </ol>
                                {footer}
                            </div>;
                        } else {
                            return <div key={this.props.key} className="mt-element-list">
                                {this.props.listHeader}
                                <div className="nav navbar-nav" style={{ paddingTop: 0, border: "none" }} ref="list">
                                    <ul>
                                        {items}
                                    </ul>
                                </div>
                                {footer}
                            </div>;
                        }
                    }
                };
            };
        };
    };

    // List Clasificadores
    export interface IListClasificadoresProps extends IListProps {
        agregarClasificador?: (items: any) => void;
        agregarClasificadorOriginal?: (items: any) => void;
        fnObtenerRegistrosXEntidad?: (items: any) => void;
    }

    export class ListClasificadores extends React.Component<IListClasificadoresProps, IListClasificadoresProps> {
        constructor(props: IListClasificadoresProps) {
            super(props);
            //this.fnonRemoveNestedItem = this.fnonRemoveNestedItem.bind(this);
        }

        static defaultProps: IListClasificadoresProps = {
            itemClass: "dd-item",
            readonly: false,
            addRemoveButton: false,
        };

        shouldComponentUpdate(nextProps: IListClasificadoresProps, nextState: IListClasificadoresProps): boolean {
            return true;
        }

        //fnonRemoveNestedItem(item: any) {
        //    let c: number = 0;
        //    let items: any = (this.props.datos && this.props.datos.data && this.props.datos.data.length > 0) ? this.props.datos.data : this.props.items.data;
        //    items.forEach((itemTipo: any) => {
        //        if (itemTipo.TipoClasificador.ID == item.IdTipoClasificador) {
        //            itemTipo.Hijos.forEach((itemHijo: any) => {
        //                if (itemHijo.ID == itemTipo.Clasificador.ID) {
        //                    itemHijo.itemAccion = "E";
        //                } else {
        //                    if (itemHijo.itemAccion == "A" || itemHijo.itemAccion) { c = c + 1; }
        //                }
        //            });
        //            if (c == 0) { itemTipo.itemAccion = "E"; }
        //        }
        //    });
        //    this.props.agregarClasificadorOriginal(items);
        //    this.props.agregarClasificador(items);
        //}

        //fnObtenerRegistrosXEntidad(items: any) {
        //    if (items && items.data && items.data.length > 0) {
        //        let value: any = EK.Global.assign({}, items);
        //        let valuedata: any = value.data.filter(c => c.itemAccion !== "E")

        //        valuedata.forEach((itemTipo: any, indext: number) => {
        //            let hijos: any = itemTipo.Hijos.filter(c => c.itemAccion !== "E");
        //            if (hijos) {
        //                itemTipo.Hijos = [];
        //                itemTipo.Hijos = hijos;
        //            }
        //        });
        //        value.data = valuedata;
        //        return value;
        //    }
        //    else {
        //        return items;
        //    }
        //} 

        render(): any {
            return <UpdateColumn info={this.props.items} text="obteniendo información">
                <Column size={[12, 12, 12, 12]}>
                    <div className="portlet-body" >
                        <List items={this.props.items}
                            childrenPropertyName="Clasificadores"
                            readonly={false}
                            addRemoveButton={this.props.addRemoveButton}
                            formatter={(index: number, item: any) => {
                                let hasChilds: boolean = item.Clasificadores && item.Clasificadores.length > 0;
                                let icono: string = hasChilds ? "fa fa-list-alt" : "icon-ek-059";
                                let removeElement: JSX.Element = <i ref="item" className="glyphicon glyphicon-trash tt-item-remove" style={{ float: "right" }}></i>;
                                return <div>
                                    <i className={icono} style={{ height: 25, border: "1px dashed #999", padding: 6, marginLeft: -3, marginTop: -9, width: 25 }}></i>
                                    <div style={{ display: "inline-block", marginLeft: 5, marginTop: -9 }}>{item.Nombre}</div>
                                    {hasChilds ? null : removeElement}
                                </div>
                            } }
                            //onRemoveNestedItem={this.fnonRemoveNestedItem}
                            />
                    </div>

                </Column>
            </UpdateColumn>;
        }
    }

    const lstClasificadoresMapProps: any = (state: any): any => {
        return {
            items: state.clasificadores.clasificadoresPorEntidad
        };
    }
    const lstClasificadoresmapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            agregarClasificador: (items: any): any => {
                dispatchDefault("clasificadores-clasificadoresentidad", items);
            }
            //agregarClasificadorOriginal: (items: any): any => {
            //    dispatchDefault("clasificadores-clasificadoresentidad-original", items);
            //}
        }
    }

    export let lstclasificadores: any = ReactRedux.connect(lstClasificadoresMapProps, lstClasificadoresmapDispatchs)(ListClasificadores);
    // List Clasificadores

    export interface IListCheckedProps extends IListProps {    
        ListItemsSelected?: any;
    }

    export class ListChecked extends React.Component<IListCheckedProps, IListCheckedProps>{
        constructor(props: IListCheckedProps) {
            super(props);            
        }

        static defaultProps: IListCheckedProps = {
            itemClass: "list-item-content",
            readonly: false,
            addRemoveButton: false
            
        };

        shouldComponentUpdate(nextProps: IListCheckedProps, nextState: IListCheckedProps): boolean {
            if (hasChanged(this.props.items, nextProps.items)) {
                if (isSuccessful(nextProps.items as DataElement)) {
                    return true;
                } else {
                    return false;
                }
            }
            else {
                if (hasChanged(this.props.ListItemsSelected, nextProps.ListItemsSelected)) {
                    if (isSuccessful(nextProps.ListItemsSelected)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                else {
                    return false;
                }
                
            }
        }

        render(): any {
            return <UpdateColumn info={this.props.items} text="obteniendo información">
                <Column size={[12, 12, 12, 12]}>
                    <List {...this.props} />
                </Column> 
            </UpdateColumn>;
        }
    }

}

import List = EK.UX.List;
import LstClasificadores = EK.UX.lstclasificadores;
import ListChecked = EK.UX.ListChecked;
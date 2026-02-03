/// <reference path="../typings/react/react-global.d.ts" />

namespace EK.UX {
    "use strict";

    interface IListNestableItemProps extends React.Props<any> {
        formatter?: (index: number, item: any) => JSX.Element;
        onRemoveItem?: (index: number, item: any) => void;
        index: number;
        item: any;
        itemClass: string;
        readonly?: boolean;
        onItemClick?: (item: any) => void;
        onClickButton?: (item: any) => void;
    }

    export class ListNestableItem extends React.Component<IListNestableItemProps, IListNestableItemProps> {
        constructor(props: IListNestableItemProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
            this.onClickButton = this.onClickButton(this);
        }

        refs: {
            item: Element;
        };

        onClick(e: any): any {
            if (this.props.onItemClick) {
                this.props.onItemClick(this.props.item);
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
            let fnFormatter: (index: number, item: any) => JSX.Element =
                (this.props.formatter !== undefined ?
                    this.props.formatter :
                    (index: number, item: any): JSX.Element => { return item.text; });

            let hasDataProp: boolean = this.props.item !== undefined;

            return <li className={this.props.itemClass} onClick={this.onClick}>
                {hasDataProp ? fnFormatter(this.props.index, this.props.item) : this.props.children}
            </li>;
        }
    }

    interface IListNestableProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        formatterItem?: (index: number, item: any) => JSX.Element;
        formatterMain?: (index: number, item: any) => JSX.Element;
        mainitems?: any;
        nesteditems?: any;
        onChange?: (items: any[]) => void;
        itemClass?: string;
        mainItemClass?: string;
        readonly?: boolean;
        KeyValueFilter?: string;
        listHeader?: JSX.Element;
        onItemClick?: (item: any) => void;
    }

    export class ListNestable extends React.Component<IListNestableProps, IListNestableProps> {
        constructor(props: IListNestableProps) {
            super(props);
        }

        static defaultProps: IListNestableProps = {
            mainitems: {},
            nesteditems: {},
            formatterItem: (item: any): JSX.Element => { return item.text; },
            readonly: false
        };

        refs: {
            listnestable: Element;
        };

        shouldComponentUpdate(nextProps: IListNestableProps, nextState: IListNestableProps): boolean {
            return true;
        }

        componentDidMount(): void {
            if (!this.props.readonly) {
                let list: any = $(this.refs.listnestable);
            }

            this.setState({
                nesteditems: this.props.nesteditems
            });
        }

        fnObtenerItems(items: any) {
            let itemsElement: JSX.Element[] = [];

            items.forEach((currentItem: any, currentIndex: number) => {
                itemsElement.push(<ListNestableItem
                    key={"lin_" + currentItem.Clasificador.ID}
                    formatter={this.props.formatterItem}
                    index={currentIndex}
                    item={currentItem}
                    readonly={true}
                    onItemClick={this.props.onItemClick}
                    itemClass={this.props.itemClass} />)
            });

            return <ul className={"dd-list"}>
                {itemsElement}
            </ul>;
        }

        render(): JSX.Element {
            if (!this.props.nesteditems || !this.props.nesteditems.data ||
                (this.props.nesteditems.data.length === 0 && this.props.nesteditems.status === AsyncActionTypeEnum.default)) {
                return null;
            };

            let itemsporTipo: JSX.Element[] = [];
            let listDataMain: any[] = this.props.mainitems && this.props.mainitems.data ? this.props.mainitems.data : this.props.mainitems;
            let hasData: boolean = listDataMain.length > 0;

            let fnFormatter: (index: number, item: any) => JSX.Element =
                (this.props.formatterMain !== undefined ?
                    this.props.formatterMain :
                    (index: number, item: any): JSX.Element => { return item.text; });


            if (hasData) {
                let headerList: JSX.Element = <div></div>;
                for (var i = 0; i <= listDataMain.length - 1; i++) {

                    // filtrar los items por cada item de la lista principal
                    let items = this.props.nesteditems.data.filter((c, index) => {
                        let value: any = this.props.KeyValueFilter.split('.').length > 0 ?
                            c[this.props.KeyValueFilter.split('.')[0]][this.props.KeyValueFilter.split('.')[1]] :
                            c[this.props.KeyValueFilter] == listDataMain[i]
                        if (listDataMain[i] == value) {
                            return c;
                        }
                    });

                    if (items.length != 0) {
                        let itemsElements: JSX.Element = this.fnObtenerItems(items);
                        itemsporTipo.push(
                            <li key={"li_" + i.toString()}
                                className="dd-item" >
                                {fnFormatter(i, listDataMain[i])}
                                <div id={i.toString()} className="panel-collapse collapse in" aria-expanded="true">
                                    {itemsElements}
                                </div>
                            </li>);
                    }
                }
            }
            //<UpdateColumn info={this.props.nesteditems} text="obteniendo información">
            //</UpdateColumn >

            return <Column size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="portlet light bordered">
                    <div className="portlet-body" >
                        <div className="dd">
                            <ul className="dd-list">
                                {itemsporTipo}
                            </ul>
                        </div>
                    </div>
                </div>
            </Column>;
        }
    }

    /// Clasificadores
    //export class ListClasificadores extends React.Component<IListNestableProps, IListNestableProps> {
    //    constructor(props: IListNestableProps) {
    //        super(props);
    //    }

    //    static defaultProps: IListNestableProps = {
    //        id: "lstClasificadores",
    //        itemClass: "dd-item",
    //        readonly: false,
    //        KeyValueFilter: "TipoClasificador.Nombre",
    //        listHeader: <div></div>,
    //    };

    //    refs: {
    //        ddl: Element;
    //        requiredPoint: Element;
    //    }

    //    shouldComponentUpdate(nextProps: IListNestableProps, nextState: IListNestableProps): boolean {
    //        return true;
    //    }

    //    render(): any {
    //        return <UpdateColumn info={this.props.nesteditems} text="obteniendo información">
    //            <ListNestable
    //                formatterItem={(index: number, item: any) => {
    //                    return < div className="dd3-content">{item.Clasificador.Nombre}
    //                        <a><i ref="item" className="glyphicon glyphicon-remove tt-item-remove" style={{ float: " right" }}></i></a></div>;
    //                } }
    //                formatterMain={(index: number, item: any) => {
    //                    return <a key={"a_" + index.toString()} className="list-toggle-container collapsed"
    //                        data-toggle="collapse" href={"#" + index.toString()} aria-expanded="true">
    //                        <div className="dd-handle dd3-handle"></div>
    //                        <div className="dd3-content" style={{ marginTop: 0, marginBottom: 5 }}>{item}</div>
    //                    </a>;
    //                } }
    //                mainitems={this.props.mainitems}
    //                nesteditems={this.props.nesteditems}
    //                itemClass={this.props.itemClass}
    //                readonly={this.props.readonly}
    //                KeyValueFilter={this.props.KeyValueFilter}
    //                listHeader={this.props.listHeader}
    //                onItemClick={this.props.onItemClick}
    //                size={this.props.size}
    //                />
    //        </UpdateColumn>;;
    //    }
    //}

    //const lstClasificadoresMapProps: any = (state: any): any => {
    //    return {
    //        nesteditems: state.clasificadores.clasificadoresxentidad
    //    };
    //}

    //export let lstclasificadores: any = ReactRedux.connect(lstClasificadoresMapProps, null)(ListClasificadores);
    // DDLClasificadores
}
import ListNestable = EK.UX.ListNestable;

/// <reference path="../typings/react/react-global.d.ts" />

namespace EK.UX {
    "use strict";

    export interface IBasicListProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        id?: string;
        entity?: DataElement;
        label?: string;
        helpLabel?: string;
        items?: any;
        readOnly?: boolean;
        onRemove?: (e: any) => void;
    }

    export interface IBasicListState {
        items?: any[];
        text?: string;
    }

    export let BasicListForm: any = global.connect(class extends React.Component<IBasicListProps, IBasicListState>{
        constructor(props: IBasicListProps) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onRemove = this.onRemove.bind(this);
            this.updateState = this.updateState.bind(this);
            this.state = { items: [], text: '' };
        }
        static props: any = (state: any) => ({
            entity: state.global.currentEntity
        });
        static defaultProps: IBasicListProps = {
            id: "",
            label: "",
            readOnly: true,
            items: [],
            idForm: ""
        };
        componentWillMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            Forms.updateFormElement(idForm, this.props.id, "");
        }
        componentDidMount(): any {
            if (isSuccessful(this.props.entity)) {
                let entidad: any = getData(this.props.entity);
                let items: any[] = this.deserialize(entidad[this.props.id]);
                this.setState(({ items: items }), () => {
                    this.updateState()
                });
            }
        }
        serialize(items: any[]): string {
            let retValue: string = "";
            try {
                if (items) {
                    retValue = JSON.stringify(items);
                }
            }
            catch (e) { }
            return retValue;
        }
        deserialize(text: string): any[] {
            let retValue: any[] = [];
            try {
                if (text) {
                    retValue = JSON.parse(text);
                }
            }
            catch (e) { }
            return retValue;
        }
        updateState(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let items: any[] = this.state.items;
            let serialized: string = this.serialize(items);
            Forms.updateFormElement(idForm, this.props.id, serialized);
        }
        onChange(e: any): void {
            this.setState({ text: e.target.value });
        }
        onRemove(e: any): void {
            this.setState(prevState => ({
                items: prevState.items.filter(item => item.ID !== e.ID)
            }), () => {
                this.updateState()
            });
        }
        onAddNew(e: any): void {
            e.preventDefault();
            if (!this.state.text.length) {
                return;
            }
            let item = EK.Global.assign({}, {
                ID: Number(new Date()),
                Nombre: this.state.text
            });
            this.setState(prevState => ({
                items: prevState.items.concat(item),
                text: ''
            }), () => {
                this.updateState()
            });
        }
        render(): JSX.Element {
            let formControlId: string = "formControl_" + this.props.id;
            let formGroupClass: string = "form-group";

            let $page: any = $ml[this.props.idForm];
            let labels: any = {};

            if ($page && this.props.id) {
                labels = global.setLabels($page, this.props);
            } else {
                labels['label'] = this.props.label;
                labels['helpLabel'] = this.props.helpLabel;
            }

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className={formGroupClass}>
                    <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12 }}>
                        <span>{labels.label}</span>
                    </label>
                    {!this.props.readOnly ?
                        <div className="input-group">
                            <input
                                id={formControlId}
                                name={formControlId}
                                type="text"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.text}
                                placeholder={labels.helpLabel} />
                            <span className="input-group-btn">
                                <a href="javascript:void(0);" className="btn btn-icon-only blue" onClick={this.onAddNew}>
                                    <i className="fa fa-plus"></i>
                                </a>
                            </span>
                        </div> : null}
                    <BasicList items={this.state.items} onRemove={!this.props.readOnly ? this.onRemove : null} />
                </div>
            </Column>
        }
    });

    class BasicList extends React.Component<IBasicListProps, {}> {
        constructor(props: IBasicListProps) {
            super(props);
        }
        onClick(e: any): void {
            if (this.props.onRemove) {
                this.props.onRemove(e);
            }
        }
        render(): JSX.Element {
            return <div className="portlet-body" style={{ marginTop: 5 }}>
                <ul className="list-group">
                    {this.props.items.map(item => (
                        <li key={item.ID} className="list-group-item">
                            {item.Nombre}
                            {this.props.onRemove ?
                                <button type="button" className="close" onClick={this.onClick.bind(this, item)} style={{ marginTop: 3 }}></button>
                                : null}
                        </li>
                    ))}
                </ul>
            </div>
        }
    }
}

import BasicList = EK.UX.BasicListForm;
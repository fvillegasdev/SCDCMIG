/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

namespace EK.UX {
    "use strict";
    
    export interface IFileUploadListProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        data?: any[];
        id: string;                    
        loadItems?: () => void;
        fnRefreshPage?: Function;
        showAddButton?: boolean;
        showDeleteButton?: boolean;
        enableDownloadFile?: boolean;
    }

    /* Estatus del Componente */
    interface IFileUploadListState {
        initialValue?: any;
        currentValue?: any;
        hasChanged?: boolean;
        hasValidationError?: boolean;
        loading?: boolean;
    }

    export class FileUploadList extends React.Component<IFileUploadListProps, IFileUploadListState> {
        constructor(props: IFileUploadListProps) {
            super(props);

            this.state = {
                initialValue: props.value,
                currentValue: props.value,
                hasChanged: false,
                hasValidationError: false,
                loading: false
            };

            this.onChange = this.onChange.bind(this);

        }

        static defaultProps: IFileUploadListProps = {
            id: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            data: [],
            fnRefreshPage: function () { },
            isFormComponent: true
        };

        refs: {
            input: Element;
        };

        shouldComponentUpdate(nextProps: IFileUploadListProps, nextState: IFileUploadListProps) {
            return true;
        }

        componentDidMount(): void {

        }

        componentWillReceiveProps(nextProps: IFileUploadListProps): any {
            this.setState({
                hasChanged: false,
                hasValidationError: false,
                currentValue: nextProps.value,
                initialValue: nextProps.value
            });
        }


        onChange(e: any): any {
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

        render(): JSX.Element {
            var items: JSX.Element[] = [];
            var ItemsElements: JSX.Element = null;

            var dataListElem: any[] = this.props.data;
            if (dataListElem !== undefined && dataListElem.length > 0) {
                dataListElem.forEach((item: any, i: number) => {
                    if (item.ID !== 100) {
                        let itemId: string = "fu-key-" + item.ID + "-" + item.ArchivoId;

                        items.push(<FileSelector
                            key={itemId}
                            id={item.ID}
                            file={item.file}
                            required={false}
                            visible={true}
                            nombre={item.text}
                            archivoNombre={item.title}
                            dataItem={item}
                            fnRefreshPage={this.props.fnRefreshPage}
                            showAddButton={this.props.showAddButton}
                            showDeleteButton={this.props.showDeleteButton}
                            enableDownloadFile={this.props.enableDownloadFile}
                            />);

                    }
                    else {
                        if (this.props.enableDownloadFile !== true) {
                            let itemId: string = "fu-key-" + item.ID + "-" + item.ArchivoId;

                            items.push(<FileSelector
                                key={itemId}
                                id={item.ID}
                                file={item.file}
                                required={false}
                                visible={true}
                                nombre={item.text}
                                archivoNombre={item.title}
                                dataItem={item}
                                fnRefreshPage={this.props.fnRefreshPage}
                                showAddButton={this.props.showAddButton}
                                showDeleteButton={this.props.showDeleteButton}
                                enableDownloadFile={this.props.enableDownloadFile}
                                />);
                        }
                    }      
                })
            }
            //return (
            //    <div className={" col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-element-list"}>
            //        <div className="mt-list-head list-simple ext-1 font-white bg-green-sharp">
            //            <div className="list-head-title-container">
            //                <h3 className="list-title">Documentos</h3>
            //            </div>
            //        </div>
            //        <div className={"mt-list-container list-simple ext-1 col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            //            <ul className={"list-simple"}>
            //                {items}
            //            </ul>
            //        </div>
            //    </div>
            //);         
            return (
                <Column size={[12, 12, 12, 12]}>
                    <OptionSection title="Documentos" readOnly={false}>
                        <Row>
                    <div className={"mt-list-container list-simple ext-1 col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <ul className={"list-simple"}>
                            {items}
                        </ul>
                    </div>
                        </Row>
                    </OptionSection>
                </Column>
            );    

        }
    }

}

import FileListComponent = EK.UX.FileUploadList;
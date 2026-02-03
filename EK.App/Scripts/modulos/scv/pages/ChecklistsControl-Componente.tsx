namespace EK.Modules.SCV.Pages.ChecklistsControl {
    "use strict";

    const defaultUnselectedItemsHeader: JSX.Element = <Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>;

    const defaultSelectedItemsHeader: JSX.Element = <Column size={[12, 12, 7, 7]} className="list-default-header">{"Nombre"}</Column>;
    
                        

    interface IChecklistProps {
        id?: string;
        parent?: string;
        config?: page.IPageConfig;
        visible?: boolean;
        
        unselectedItems: string;
        selectedItems: string;

        unselectedItemsHeader: any;
        unselectedItemsFormatter: any;

        selectedItemsHeader: any;
        selectedItemsFormatter: any;
        

        addSelectItemButton: boolean;
        addRemoveSelectedItemButton: boolean;

        //Reemplazar y manejar por completo la función para seleccionar un item,
        //onSelectItemValidation y onSelectItemConversion ya no usarian
        onSelectItem: any;

        //Manejar solo la validacion al seleecionar un item
        onSelectItemValidation: any;

        //Definir como el item seleccionado se debe convertir a otro
        onSelectItemConversion: any;
        
        getCustomRemoveButton: any;

        //False para no mostrar seccion items deseleccionados
        showUnselectedItems: boolean;

        UnselectedItems?: any;
        UnselectedItemsLoadData?: any;

        SelectedItems?: any;
        SelectedItemsLoadData?: any;
    };

    export let Checklist: any = global.connect(class extends React.Component<IChecklistProps, {}> {
        constructor(props: IChecklistProps) {
            super(props);
            this.selectItem = this.selectItem.bind(this);
            this.getDefaultRemoveButton = this.getDefaultRemoveButton.bind(this);
        };

        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            SelectedItems: state.global["catalogo$" + "ChecklistEstandar$Seleccionados"],
            SelectedItemsLoadData: state.global["catalogo$" + "ChecklistEstandar$SeleccionadosLoadData"],
            UnselectedItems: state.global["catalogo$" + "ChecklistEstandar$Todos"],
            UnselectedItemsLoadData: state.global["catalogo$" + "ChecklistEstandar$TodosLoadData"]
        });
     
        
        selectItem(item: any, e: any): void {
            console.log('selectItem');
            if (typeof this.props.onSelectItem == "function") {
                this.props.onSelectItem(item);
            }
            else {
               
                let selItemsReceptor: any = Forms.getValue(this.props.selectedItems, this.props.parent);
                let selItems: any[] = getData(selItemsReceptor);

                //Validacion
                if (typeof this.props.onSelectItemValidation == "function") {
                    let validationResult = this.props.onSelectItemValidation(selItems, item);
                    if (validationResult == false) {
                        return;
                    }
                }

                
                let newItem: any = getData(global.createSuccessfulStoreObject({}));
                newItem._eliminado = false;
                newItem._nuevo = true;
                newItem.ID = selItemsReceptor.getNextLowerID();

                //Conversion
                if (typeof this.props.onSelectItemConversion == "function") {
                    newItem = this.props.onSelectItemConversion(item, newItem);
                }

                //Actualizar estado formulario
                selItemsReceptor.data.push(newItem);
                selItemsReceptor.timestamp = Number(new Date());
                Forms.updateFormElement(this.props.parent, this.props.selectedItems, selItemsReceptor);
            }
        }
        shouldComponentUpdate(nextProps: IChecklistProps, { }): boolean {
            return hasChanged(this.props.SelectedItems, nextProps.SelectedItems) || hasChanged(this.props.UnselectedItems, nextProps.UnselectedItems);
        };

        componentWillMount(): void {
            //console.count('componentWillMount' + 'checklist');
        }
        componentDidMount(): void {
            //console.count('componentDidMount' + 'checklist');
        }
        
        componentWillReceiveProps(nextProps: IChecklistProps) {
            if (hasChanged(this.props.SelectedItemsLoadData, nextProps.SelectedItemsLoadData)) {
                if (isSuccessful(nextProps.SelectedItemsLoadData)) {
                    global.dispatchAsyncPost("global-page-data", "base/scv/ChecklistsControl/GetBP/GetAll", { parametros: nextProps.SelectedItemsLoadData.data.parametros }, this.props.selectedItems);
                };
            };

            if (hasChanged(this.props.UnselectedItemsLoadData, nextProps.UnselectedItemsLoadData)) {
                if (isSuccessful(nextProps.UnselectedItemsLoadData)) {
                    global.dispatchAsyncPost("global-page-data", "base/scv/" + nextProps.UnselectedItemsLoadData.data.bp + "/GetBP/GetAll", { parametros: nextProps.UnselectedItemsLoadData.data.parametros }, this.props.unselectedItems);
                };
            };
        };

        removeSelectedItem: any = {
            icon: "fa fa-trash",
            titulo: "Eliminar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                let element: DataElement = Forms.getValue(id, idParent);

                let withRemovedItem = element.removeItem(item);

                //Actualizar estado formulario
                Forms.updateFormElement(idParent, id, withRemovedItem);
            }
        };

        getDefaultRemoveButton(index: number, item: any): any {
            return <buttons.PopOver idParent={this.props.parent} idForm={this.props.selectedItems} info={item} extraData={[this.removeSelectedItem]} />;
        }

        render(): JSX.Element {
            if (this.props.visible == false) {
                return null;
            }
            else {
                let removeButton: any = null;
                if (typeof this.props.getCustomRemoveButton == 'function') {//Si viene funcion custom
                    removeButton = this.props.getCustomRemoveButton;
                }
                else if(this.props.addRemoveSelectedItemButton == true) {
                    removeButton = this.getDefaultRemoveButton;
                }


                return <div className="row">
                    {this.props.showUnselectedItems != false ? <page.SectionList
                            id={this.props.unselectedItems}
                            parent={this.props.parent}
                            subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }} icon={"fa fa-cog"}
                            size={[12, 12, 3, 3]}
                            level={1}
                            horizontalScrolling={true}
                            height={"450px"}
                            drawOddLine={true}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            hideNewButton={true}
                            listHeader={
                                <Column size={[12, 12, 12, 12]}>
                                    <Row>
                                        {this.props.unselectedItemsHeader ? this.props.unselectedItemsHeader : defaultUnselectedItemsHeader}
                                        <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
                                    </Row>
                                </Column>
                            }
                            formatter={(index: number, item: any) => {
                                return <Row style={{ padding: "0px 10px" }}>
                                    {this.props.unselectedItemsFormatter(index, item)}
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        {this.props.addSelectItemButton == true ? <i className="fas fa-plus-circle" title="Agregar" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.selectItem(item, e)}></i> : null}
                                    </Column>
                                </Row >;
                            }}>
                        </page.SectionList> : null}
                    <page.SectionList
                        id={this.props.selectedItems}
                        parent={this.props.parent}
                        subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }} icon={"fa fa-cog"}
                        size={this.props.showUnselectedItems == false ? [12, 12, 12, 12] : [12, 12, 9, 9]  }
                        level={1}
                        horizontalScrolling={true}
                        height={"450px"}
                        drawOddLine={true}
                        items={createSuccessfulStoreObject([])}
                        readonly={false}
                        addRemoveButton={false}
                        hideNewButton={true}
                        listHeader={
                            <Column size={[12, 12, 12, 12]}>
                                <Row>
                                    {this.props.selectedItemsHeader ? this.props.selectedItemsHeader : defaultSelectedItemsHeader}
                                    <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
                                </Row>
                            </Column>
                        }
                        formatter={(index: number, item: any) => {
                            return <Row style={{ padding: "0px 10px" }}>
                                {this.props.selectedItemsFormatter(index, item)}
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    {removeButton(index, item)}
                                </Column>
                            </Row>;
                        }}>
                    </page.SectionList>
                </div>;
            }
        }

    });

}

import Checklist = EK.Modules.SCV.Pages.ChecklistsControl.Checklist;
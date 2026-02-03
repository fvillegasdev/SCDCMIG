namespace EK.Modules.SCV.Pages.postventa.RUBA.CatFallasNuevoCatalogo {
    "use strict";
    const PAGE_ID = "catFallasNuevoCatalogo";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");

    interface ICatFallasNuevoCatalogo extends page.IProps {
        modeEdit?: any
    };

    export let Vista = global.connect(class extends React.Component<ICatFallasNuevoCatalogo, {}> {
        constructor(props: ICatFallasNuevoCatalogo) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onEdit = this.onEdit.bind(this);
            this.onDelete = this.onDelete.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        loadData() {
            const columns = [
                { caption: "Clave Falla", dataField: "ClaveFalla", alignment: 'center' },
                { caption: "Descripción Falla", dataField: "DescripcionFalla" },
                { caption: "Abreviatura", dataField: "Abreviatura", alignment: 'center' },
                { caption: "Clave Causa", dataField: "ClaveCausa" },
                { caption: "Descripcion Causa", dataField: "DescripcionCausa", alignment: 'center' },
            ]

            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetCatalogoFallasNuevoCatalogo/", { parametros: null }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_ID);
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            onRowPrepared: function (event) {
                                $(event.rowElement).on('dblclick', function () {
                                    dispatchSuccessful("load::modeEdit", { modeEdit: true }, PAGE_ID);
                                    dispatchSuccessful("load::forDelete", event.data, PAGE_ID);

                                    Forms.updateFormElement(PAGE_ID, "OrigenFalla", { ID: event.data.ClaveCausa, Clave: event.data.ClaveCausa, Nombre: event.data.DescripcionCausa });
                                    Forms.updateFormElement(PAGE_ID, "Descripcion", event.data.DescripcionFalla);
                                    Forms.updateFormElement(PAGE_ID, "Abreviatura", event.data.Abreviatura);
                                    console.log(event.data)
                                }).on('remove', function () {
                                    //on remove event in jquery ui libraries or 
                                    $(this).off('dblclick remove');
                                })
                            },
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            sorting: {
                                mode: "multiple" // or "multiple" | "none"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            searchPanel: {
                                visible: true
                            },
                            paging: {
                                pageSize: 15
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: true
                            },
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "Catalogo_" + fecha,
                                allowExportSelectedData: false
                            }
                        }).dxDataGrid("instance");
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });
        }

        onsave() {
            let model: any = Forms.getForm(PAGE_ID)
            let OrigenFalla = model.OrigenFalla.ID;
            let Descripcion = $.trim(model.Descripcion);
            let DescripcionOrigen = model.OrigenFalla.Nombre;
            let Abreviatura = $.trim(model.Abreviatura);

            if (Descripcion === undefined || Abreviatura === undefined) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            }
            
            if (Descripcion === "" || Abreviatura === "") {
                warning("Los campos son obligatorios", "Aviso")
                return;
            }
            if (Abreviatura !== undefined && Abreviatura.length > 3) {
                warning("Favor de enviar solo 3 caracteres en el campo abreviatura", "Aviso")
                return;
            }

            let parametros = global.assign({
                ORIGENFALLA: OrigenFalla,
                DESCRIPCION: Descripcion,
                DESCRIPCIONORIGEN: DescripcionOrigen,
                ABREVIATURA: Abreviatura,
                OPERACION: "INSERT"
            })
            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudCatalogoFallasNuevoCatalogo/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");
                            this.loadData();
                            Forms.reset(PAGE_ID);
                        } else {
                            warning(data[0].sqlMsg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });
        }
        onEdit() {
            let model: any = Forms.getForm(PAGE_ID)
            let OrigenFalla = model.OrigenFalla.ID;
            let Descripcion = $.trim(model.Descripcion);
            let DescripcionOrigen = model.OrigenFalla.Nombre;
            let Abreviatura = $.trim(model.Abreviatura);


            if (Descripcion === undefined || Abreviatura === undefined) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            }
            if (Descripcion === "" || Abreviatura === "") {
                warning("Los campos son obligatorios", "Aviso")
                return;
            }
            if (Abreviatura !== undefined && Abreviatura.length > 3) {
                warning("Favor de enviar solo 3 caracteres en el campo abreviatura", "Aviso")
                return;
            }
            let row = EK.Store.getState().global.forDelete.data;


            let parametros = global.assign({
                ORIGENFALLAOLD: row.ClaveCausa,
                ORIGENFALLA: OrigenFalla,
                DESCRIPCION: Descripcion,
                DESCRIPCIONORIGENOLD: row.DescripcionCausa,
                DESCRIPCIONORIGEN: DescripcionOrigen,
                ABREVIATURA: Abreviatura,
                CLAVEFALLA: row.ClaveFalla,
                OPERACION: "UPDATE"
            });
            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudCatalogoFallasNuevoCatalogo/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");
                            this.loadData();
                            Forms.reset(PAGE_ID);
                        } else {
                            warning(data[0].sqlMsg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });
        }
        onCancel() {
            Forms.reset(PAGE_ID);
            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
        }
        onDelete() {
            EK.Global.confirm("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
                let row = EK.Store.getState().global.forDelete.data;
                let parametros = global.assign({
                    ORIGENFALLA: row.ClaveCausa,
                    CLAVEFALLA: row.ClaveFalla,
                    OPERACION: "DELETE"
                });
                global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudCatalogoFallasNuevoCatalogo/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            if (data[0].code === 0) {
                                success(data[0].sqlMsg, "Exito");
                                this.loadData();
                                dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                                Forms.reset(PAGE_ID);
                            } else {
                                warning(data[0].sqlMsg, "Aviso");
                            }
                            break;
                        case AsyncActionTypeEnum.loading:
                            break;
                        case AsyncActionTypeEnum.failed:
                            break;
                    }
                });
            });

        }
        componentDidMount(): any {
            this.loadData();
            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
            Forms.updateFormElement(PAGE_ID, "OrigenFalla", null);
        };

        render(): JSX.Element {
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let className: string = "btn-editing";
            let color: string = "white";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>

                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Nuevo Registro"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        {
                            !isModeEdit ?
                                <Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload" onClick={this.onsave} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnEdit"} className={className} color={color} iconOnly={true} icon="fa fa-pencil" onClick={this.onEdit} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnDelete"} className={className} color={color} iconOnly={true} icon="fa fa-trash" onClick={this.onDelete} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancel} style={{ marginRight: 5, color }} />
                                : null
                        }
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                        <OrigenFalla id={"OrigenFalla"} size={[12, 12, 4, 4]} label={"Origen"} idFormSection={PAGE_ID} required={true} validations={[validations.required()]} />
                        <input.Text id="Descripcion" label="Descripción" idFormSection={PAGE_ID} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                        <input.Text id="Abreviatura" label="Abreviatura" idFormSection={PAGE_ID} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                    </Column>
                </page.OptionSection>
                <div ><Column size={[12, 12, 12, 12]}>

                    <br />
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>

                    <div id="loadedData" style={{ background: '#fff', display: 'inherit' }}>
                        <span style={{ padding: '10px' }} className="help-block text-muted">Doble click sobre fila para actualizar registro.</span>
                        <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                        </div>
                    </div>

                </Column></div>
            </page.Main>;
        };
    });
    interface IOrigen extends ddl.IDropDrownListProps {
        selectAll?: boolean
    }
    export interface IDropDrownListState {
        initialValue?: string;
        currentValue?: string;
    }

    export class OrigenFalla$DDL extends React.Component<IOrigen, IDropDrownListState> {
        constructor(props: IOrigen) {
            super(props);
            this.onchangeElementoFalla = this.onchangeElementoFalla.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.ORIGENFALLA
        });
        static defaultProps: IOrigen = {
            id: "OrigenFalla",
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
                global.dispatchAsyncPost("load::ORIGENFALLA", "base/kontrol/CatalogosSpv/GetBP/GetCatalogoOrigenFalla/", { parametros: null });
            };
        };
        componentWillUnmount() {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, null)
            dispatchDefault("load::ORIGENFALLA_Seleccionada", null);
            dispatchDefault("load::ORIGENFALLA", null);
        };
        onchangeElementoFalla(item: any): any {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::ORIGENFALLA_Seleccionada", itemFinal);
        };
        shouldComponentUpdate(nextProps: IOrigen, { }): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };
        componentWillReceiveProps(nextProps: IOrigen, nextState: IOrigen): void {
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
                                dispatchSuccessful("load::ORIGENFALLA_Seleccionada", item);
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
    export const OrigenFalla: any = ReactRedux.connect(OrigenFalla$DDL.props, null)(OrigenFalla$DDL);
};
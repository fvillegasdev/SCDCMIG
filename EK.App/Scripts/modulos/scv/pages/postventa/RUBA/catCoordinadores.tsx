namespace EK.Modules.SCV.Pages.postventa.RUBA.CatCoordinadores {
    "use strict";
    const PAGE_ID = "catCoordinadores";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");

    interface IEditProps extends page.IProps {
        plaza?: DataElement;
        obtenerUsuarios?: (id: number) => void;
        modeEdit?: any
    };
    export let Vista = global.connect(class extends React.Component<IEditProps, {}> {
        constructor(props: IEditProps) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada2;
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerUsuarios: (idPlaza): void => {
                const columns = [
                    { caption: "Num", dataField: "Num", alignment: 'center' },
                    { caption: "Nombre", dataField: "Nombre" },
                    { caption: "Es Coordinador", dataField: "EsCoordinador", alignment: 'center' },
                ]

                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');
                let parametros = global.assign({
                    PLAZA: idPlaza
                })
                console.log(parametros)
                global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetUsuariosByPlaza/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
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
                                        dispatchSuccessful("load::row", event.data, PAGE_ID);
                                        Forms.updateFormElement(PAGE_ID, "IsCoordinador", event.data.EsCoordinador);

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
                                onExporting: function (e) {

                                    e.cancel = true;
                                    for (const d of data) {
                                        d.EsCoordinador = d.EsCoordinador === true? 'SI' : 'NO';
                                    }
                                    e.cancel = false;
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
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.plaza, nextProps.plaza) && getDataID(this.props.plaza) !== getDataID(nextProps.plaza)) {
                if (isSuccessful(nextProps.plaza)) {
                    let item: any = global.getData(nextProps.plaza);
                    this.props.obtenerUsuarios(item.Clave);
                };
            };
        }
        onsave() {
            let model: any = Forms.getForm(PAGE_ID)
            let IsCoordinador = model.IsCoordinador ? 1 : 0;
            let Plaza = model.PlazaInicial.ID;
            let row = EK.Store.getState().global.row.data;

            let parametros = global.assign({
                IDCOORDINADOR: row.Num,
                ISCOORDINADOR: IsCoordinador,
                PLAZA: Plaza
            })


            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/IsCoordinador/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            if (data[0].code === 1) {
                                dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                                success(data[0].sqlMsg, "Exito");
                                return
                            }
                            this.props.obtenerUsuarios(Plaza);
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");

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
            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
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
                            isModeEdit ?

                                <Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload" onClick={this.onsave} style={{ marginRight: 5, color }} />
                                : null
                        }
                        {
                            isModeEdit ?
                                <Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancel} style={{ marginRight: 5, color }} />
                                : null
                        }
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                        <PlazasDDL2 id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                        {
                            isModeEdit ?
                                <checkBox.CheckBox id={"IsCoordinador"} idForm={PAGE_ID} label={"Es Coordinador"} size={[12, 12, 3, 3]} />
                                :null
                        }
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

};
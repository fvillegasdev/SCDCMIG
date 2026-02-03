namespace EK.Modules.SCV.Pages.postventa.RUBA.ConfigCorreoEquipamiento {
    "use strict";
    const PAGE_ID = "ConfigCorreoEquipamiento";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");
    declare const DevExpress: any;


    const getSegmentos = () => {
        let data = EK.Store.getState().global.SEGMENTOSMULT.data;
        const listWidget = $('#simpleList').dxList({
            dataSource: new DevExpress.data.DataSource({
                store: new DevExpress.data.ArrayStore({
                    key: 'Clave',
                    data: data,
                }),
            }),
            height: 150,
            showSelectionControls: true,
            selectionMode: 'multiple',
            itemTemplate(data) {
                return $('<div>').text(data.Nombre);
            },
            onSelectionChanged() {
                let addedItems = listWidget.option('selectedItemKeys')
                dispatchSuccessful("load::itemCheckAsig", addedItems, PAGE_ID)

                console.log(addedItems)
            },
        }).dxList('instance');
        listWidget.unselectAll();
       // listWidget.clearSelection();


    }




    interface IConfigCorreoEquipamiento extends page.IProps {
        plaza?: DataElement;
        obtenerUsuarios?: (id: number) => void;
        obtenerUsuariosAsignados?: (id: number) => void;
        Segmentos?: () => void;
        onsave?: () => void;
        modeAsig?: any
        modeUnAsig?: any,
        showList?: any
    };


    export let Vista = global.connect(class extends React.Component<IConfigCorreoEquipamiento, {}> {
        constructor(props: IConfigCorreoEquipamiento) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onDelete = this.onDelete.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeAsig = state.global.modeAsig;
            retValue.modeUnAsig = state.global.modeUnAsig;
            retValue.plaza = state.global.Plaza_Seleccionada;
            retValue.showList = state.global.showList;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            Segmentos: () => {
                let data = EK.Store.getState().global.SEGMENTOSMULT.data;
                const listWidget = $('#simpleList').dxList({
                    dataSource: new DevExpress.data.DataSource({
                        store: new DevExpress.data.ArrayStore({
                            key: 'Clave',
                            data: data,
                        }),
                    }),
                    height: 150,
                    showSelectionControls: true,
                    selectionMode: 'multiple',
                    itemTemplate(data) {
                        return $('<div>').text(data.Nombre);
                    },
                    onSelectionChanged: (e) => {
                        const addedItems = e.addedItems;
                        dispatchSuccessful("load::itemCheckAsig", addedItems, PAGE_ID)
                        //const removedItems = e.removedItems;
                        // Handler of the "selectionChanged" event
                        console.log(data)
                    },
                    //onSelectionChanged() {
                    //    let data = listWidget.option('selectedItem')
                    //    console.log(data)
                    //},
                }).dxList('instance');
            },
            obtenerUsuarios: (idPlaza): void => {
                let parametros = global.assign({
                    PLAZA: idPlaza
                })
                const columns = [
                    { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                    { caption: "No. Empleado", dataField: "IdEmpleado" },
                    { caption: "Nombre Empleado", dataField: "Nombre", alignment: 'center' },
                    { caption: "Departamento", dataField: "Departamento" },
                    { caption: "Email", dataField: "Correo", alignment: 'center' },
                ]

                let loader = document.getElementById('loading');
                let loadedTable = document.getElementById('loadedData');

                global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetUsers/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'inherit';
                            dispatchSuccessful('global-page-data', data, PAGE_ID);
                            let fecha = Date.now();
                            let dataGrid = $("#datagroupContainer").dxDataGrid({
                                //onRowPrepared: function (event) {
                                //    $(event.rowElement).on('dblclick', function () {
                                //        console.log(event.data.Correo)
                                //        if (data.Correo !== null) {
                                //            dispatchSuccessful("load::modeAsig", { modeAsig: true });
                                //            dispatchSuccessful("load::showList", { show: true }, PAGE_ID);
                                //            dispatchSuccessful("load::forProcess", data, PAGE_ID);
                                //            getSegmentos();
                                //            let show = document.getElementById("simpleList");
                                //            show.style.display = "block";
                                //        } else {
                                //            dispatchSuccessful("load::modeAsig", { modeAsig: false });
                                //            warning("El usuario no cuenta con un correo electronico valido", "Atención")
                                //        }
                                //        //if (event.data.Correo !== null) {
                                //        //    dispatchSuccessful("load::modeAsig", { modeAsig: true });
                                //        //    dispatchSuccessful("load::forProcess", event.data, PAGE_ID);
                                //        //} else {
                                //        //    dispatchSuccessful("load::modeAsig", { modeAsig: false });
                                //        //    warning("El usuario no cuenta con un correo electronico valido", "Atención")
                                //        //}
                                //    }).on('remove', function () {
                                //        //on remove event in jquery ui libraries or 
                                //        $(this).off('dblclick remove');
                                //    })
                                //},
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
                                    pageSize: 10
                                },
                                pager: {
                                    showPageSizeSelector: true,
                                    allowedPageSizes: [10, 15, 25],
                                    showInfo: true
                                },
                                groupPanel: {
                                    visible: false
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
                                    enabled: false,
                                    fileName: "Catalogo_" + fecha,
                                    allowExportSelectedData: false
                                },
                                onSelectionChanged(selectedItems) {
                                    const data = selectedItems.selectedRowsData[0];
                                    console.log(data)
                                    if (data.Correo !== null) {
                                        dispatchSuccessful("load::modeAsig", { modeAsig: true });
                                        dispatchSuccessful("load::showList", { show: true }, PAGE_ID);
                                        dispatchSuccessful("load::forProcess", data, PAGE_ID);
                                        getSegmentos();
                                        let show = document.getElementById("simpleList");
                                        show.style.display = "block";
                                    } else {
                                        dispatchSuccessful("load::modeAsig", { modeAsig: false });
                                        warning("El usuario no cuenta con un correo electronico valido", "Atención")
                                    }
                                },
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
            },
            obtenerUsuariosAsignados: (idPlaza): void => {
                let parametros2 = global.assign({
                    PLAZA: idPlaza
                })
                const columns2 = [
                    { caption: "Plaza", dataField: "Plaza", alignment: 'center' },
                    { caption: "Segmento", dataField: "Segmento", alignment: 'center' },
                    { caption: "No. Empleado", dataField: "NoEmpleado" },
                    { caption: "Nombre Empleado", dataField: "Nombre", alignment: 'center' },
                    { caption: "Email", dataField: "Correo", alignment: 'center' },
                ]

                let loader2 = document.getElementById('loading2');
                let loadedTable2 = document.getElementById('loadedData2');

                global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetUsersAsignados/", { parametros: parametros2 }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            loader2.style.display = 'none';
                            loadedTable2.style.display = 'inherit';
                            dispatchSuccessful('global-page-data', data, PAGE_ID);
                            let fecha = Date.now();
                            let dataGrid2 = $("#datagroupContainer2").dxDataGrid({
                                //onRowPrepared: function (event) {
                                //    $(event.rowElement).on('dblclick', function () {
                                //        dispatchSuccessful("load::modeUnAsig", { modeUnAsig: true }, PAGE_ID);
                                //        dispatchSuccessful("load::forProcessUnAsig", event.data, PAGE_ID);

                                //    }).on('remove', function () {
                                //        //on remove event in jquery ui libraries or 
                                //        $(this).off('dblclick remove');
                                //    })
                                //},
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
                                    pageSize: 10
                                },
                                pager: {
                                    showPageSizeSelector: true,
                                    allowedPageSizes: [10, 15, 25],
                                    showInfo: true
                                },
                                groupPanel: {
                                    visible: false
                                },
                                columns: columns2,
                                columnFixing: { enabled: true },
                                showColumnLines: false,
                                showRowLines: true,
                                rowAlternationEnabled: true,
                                selection: {
                                    mode: "multiple",
                                    allowSelectAll: false,
                                    showCheckBoxesMode: 'always'
                                },
                                onSelectionChanged: function (e) { // Handler of the "selectionChanged" event
                                    dispatchSuccessful("load::modeUnAsig", { modeUnAsig: true }, PAGE_ID);
                                    let allSelectedRowsData = e.selectedRowsData;
                                    dispatchSuccessful("load::itemCheck", allSelectedRowsData);
                                    console.log(allSelectedRowsData)
                                    if (allSelectedRowsData.length === 0) {
                                        dispatchSuccessful("load::modeUnAsig", { modeUnAsig: false }, PAGE_ID);
                                        dispatchSuccessful("load::itemCheck", allSelectedRowsData);
                                    }
                                    // ...
                                },
                                export: {
                                    enabled: false,
                                    fileName: "Catalogo_" + fecha,
                                    allowExportSelectedData: false
                                }
                            }).dxDataGrid("instance");
                            break;
                        case AsyncActionTypeEnum.loading:
                            loader2.style.display = 'block';
                            loadedTable2.style.display = 'none'
                            break;
                        case AsyncActionTypeEnum.failed:
                            loader2.style.display = 'none';
                            loadedTable2.style.display = 'none';
                            break;
                    }
                });
            }
        });
        componentWillReceiveProps(nextProps: IConfigCorreoEquipamiento): void {
            if (hasChanged(this.props.plaza, nextProps.plaza) && getDataID(this.props.plaza) !== getDataID(nextProps.plaza)) {
                if (isSuccessful(nextProps.plaza)) {
                    let item: any = global.getData(nextProps.plaza);
                    this.props.obtenerUsuarios(item.ID);
                    this.props.obtenerUsuariosAsignados(item.ID);
                };
            };
            //if (hasChanged(this.props.showList, nextProps.showList)) {
            //    if (isSuccessful(nextProps.showList)) {
            //        getSegmentos();
            //    };
            //};
        }


        onsave() {
            let model: any = Forms.getForm(PAGE_ID)
            let segmentos = EK.Store.getState().global.itemCheckAsig.data
            let Plaza = model.PlazaInicial.ID;

            let row = EK.Store.getState().global.forProcess.data;
            if (segmentos.length === 0 || segmentos === undefined) {
                warning("Favor de seleccionar los segmentos", "Atención")
                return
            }

            if (Plaza === '-2') {
                warning("No puede seleccionar la opcion todos en la plaza", "Atención");
                return
            }

            segmentos = segmentos.map(x => {
                return {
                    Segmento: x
                }
            })
           // console.log(segmentos)
            let parametros = [{
                Operacion: 'ASIGNACION',
                Plaza: Plaza,
                Empleado: row.IdEmpleado,
                Segmentos: segmentos
            }]


            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/ProcessConfigCorreoEquipamientoAssign/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            this.props.obtenerUsuariosAsignados(Plaza);
                            success(data[0].sqlMsg, "Exito");
                            $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                            this.onCancel()
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
            Forms.updateFormElement(PAGE_ID, "Segmentos", { ID: -1, Clave: "Seleccione una opción" });
            dispatchSuccessful("load::modeAsig", { modeAsig: false }, PAGE_ID);
            dispatchSuccessful("load::modeUnAsig", { modeUnAsig: false }, PAGE_ID);
            dispatchSuccessful("load::forProcess", null, PAGE_ID);
            dispatchSuccessful("load::forProcessUnAsig", null, PAGE_ID);
            let show = document.getElementById("simpleList");
            show.style.display = "none";

        }
        onDelete() {
            let row = EK.Store.getState().global.itemCheck.data;

            let Plaza = Forms.getValue("PlazaInicial", PAGE_ID).ID

            let parametros = []

            for (let x of row) {
                parametros.push({
                    Operacion: 'DESASIGNACION',
                    Plaza: x.IdPlaza,
                    Vocacion: x.IdSegmento,
                    Empleado: x.NoEmpleado
                })
            }


            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/ProcessConfigCorreoEquipamiento/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            this.props.obtenerUsuariosAsignados(Plaza);
                            success(data[0].sqlMsg, "Exito");
                            this.onCancel()
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
        componentDidMount(): any {
            Forms.updateFormElement(PAGE_ID, "Segmentos", { ID: -1, Clave: "Seleccione una opción" });
            dispatchSuccessful("load::modeAsig", { modeAsig: false }, PAGE_ID);
            dispatchSuccessful("load::modeUnAsig", { modeUnAsig: false }, PAGE_ID);
            dispatchSuccessful("load::showList", { show: false }, PAGE_ID);
            global.dispatchAsyncPost("load::SEGMENTOSMULT", "base/kontrol/CatalogosSpv/GetBP/GetSegmentos/", { parametros: null });
        };
        componentWillUnmount() {
            dispatchSuccessful("load::forProcess", null, PAGE_ID);
            dispatchSuccessful("load::forProcessUnAsig", null, PAGE_ID);

        }
        render(): JSX.Element {
            let userSelected;
            let userSelectedUnAsig;
            let ismodeAsig;
            let ismodeUnAsig;
            let showList;
            if (isSuccessful(this.props.modeAsig)) {
                ismodeAsig = this.props.modeAsig.data.modeAsig;
            }
            if (isSuccessful(this.props.modeUnAsig)) {
                ismodeUnAsig = this.props.modeUnAsig.data.modeUnAsig;
            }
            if (isSuccessful(EK.Store.getState().global.forProcess)) {
                userSelected = getData(EK.Store.getState().global.forProcess).Nombre;
            }
            if (isSuccessful(EK.Store.getState().global.forProcessUnAsig)) {
                userSelectedUnAsig = getData(EK.Store.getState().global.forProcessUnAsig).Nombre;
            }
            //if (isSuccessful(this.props.showList)) {
            //    showList = getData(this.props.showList).show;
            //}
            let className: string = "btn-editing";
            let color: string = "white";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>

                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={""}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>

                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                        {/*<ddl.Segmentos id={"Segmentos"} size={[12, 12, 4, 4]} label={"Segmentos"} idFormSection={PAGE_ID} required={true} validations={[validations.required()]} />*/}
                    </Column>
                    <Column  size={[12, 12, 12, 12]} style={{ padding: '10px'}}>
                        <div id="list-demo">
                                <div id="simpleList"></div>
                            <span id="selectedItemKeys"></span>
                        </div>
                    </Column>
                </page.OptionSection>
                <div ><Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={<span className="badge badge-info bold">{userSelected}</span>}
                        level={2}
                        icon="icon-folder"
                        collapsed={false}>
                        <SectionButtons >
                            {
                                ismodeAsig ?
                                    <Button keyBtn={"btnNew"} className={className} color={color} iconOnly={true} icon="icon-cloud-upload" onClick={this.onsave} style={{ marginRight: 5, color }} />
                                    : null
                            }
                            {
                                ismodeAsig ?
                                    <Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancel} style={{ marginRight: 5, color }} />
                                    : null
                            }
                        </SectionButtons >
                        <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                            <div id="loading" style={{ display: 'none' }}>
                                <Updating text="" />
                            </div>
                            <div id="loadedData" style={{ background: '#fff', display: 'inherit' }}>
                                <span style={{ padding: '10px' }} className="help-block text-muted">Click sobre fila para seleccionar usuario.</span>

                                <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                </div>
                            </div>
                        </Column>
                    </page.OptionSection>
                    <br />
                </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={<span className="badge badge-info bold">{userSelectedUnAsig}</span>}
                            level={2}
                            icon="icon-folder"
                            collapsed={false}>
                            <SectionButtons >
                                {
                                    ismodeUnAsig ?
                                        <Button keyBtn={"btnDelete"} className={className} color={color} iconOnly={true} icon="fa fa-trash" onClick={this.onDelete} style={{ marginRight: 5, color }} />
                                        : null
                                }
                                {
                                    ismodeUnAsig ?
                                        <Button keyBtn={"btnCancel"} className={className} color={color} iconOnly={true} icon="fa fa-ban" onClick={this.onCancel} style={{ marginRight: 5, color }} />
                                        : null
                                }
                            </SectionButtons >
                            <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                                <div id="loading2" style={{ display: 'none' }}>
                                    <Updating text="" />
                                </div>

                                <div id="loadedData2" style={{ background: '#fff', display: 'inherit' }}>
                                    <span style={{ padding: '10px' }} className="help-block text-muted">Click sobre fila para seleccionar el usuario.</span>
                                    <h4><span style={{ textAlign: 'center' }} className="help-block text-muted">Asignaciones.</span></h4>
                                    <div id="datagroupContainer2" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                                    </div>
                                </div>
                            </Column>
                        </page.OptionSection>
                        <br />
                    </Column>
                </div>
            </page.Main>;
        };
    });

};
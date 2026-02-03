namespace EK.Modules.SCV.Pages.postventa.RUBA.CatComponentes {
    "use strict";
    const PAGE_ID = "CatComponentes";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");

    interface ICatFallasNuevoCatalogo extends page.IProps {
        modeEdit?: any
    };
    const ImpactoModel = {
        CRITICO: "A",
        BAJO: "B",
        MEDIO: "M"
    }

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
                { caption: "Id Tipo Componente", dataField: "IdTipoComponente", alignment: 'center' },
                { caption: "Descripción Tipo Componente", dataField: "DescripcionTipoComponente" },
                { caption: "Id Componente", dataField: "IdComponente", alignment: 'center' },
                { caption: "Descripcion Componente", dataField: "DescripcionComponente" },
                { caption: "Tiempo de respuesta", dataField: "TiempoRespuesta", alignment: 'center' },
                { caption: "Impacto", dataField: "Impacto", alignment: 'center' },
                { caption: "Duracion", dataField: "Duracion", alignment: 'center' },
            ]
            const columns2 = [
                { caption: "Tipo de vivienda", dataField: "TipoVivienda", alignment: 'center' },
                { caption: "1er Garantia", dataField: "Garantia1", alignment: 'center' },
                { caption: "2da Garantia", dataField: "Garantia2", alignment: 'center' },
            ]
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetComponentes/", { parametros: null }, (status: AsyncActionTypeEnum, data: any) => {
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

                                    Forms.updateFormElement(PAGE_ID, "TipoFalla", { ID: event.data.IdTipoComponente, Clave: event.data.Clave, Nombre: event.data.DescripcionTipoComponente });
                                    Forms.updateFormElement(PAGE_ID, "Componente", event.data.DescripcionComponente);
                                    Forms.updateFormElement(PAGE_ID, "TiempoRespuesta", event.data.TiempoRespuesta);
                                    Forms.updateFormElement(PAGE_ID, "Duracion", event.data.Duracion);
                                    Forms.updateFormElement(PAGE_ID, "Impacto", event.data.Impacto);
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
            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/GetComponentesGarantia/", { parametros: null }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        dispatchSuccessful('global-page-data', data, PAGE_ID);
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer2").dxDataGrid({
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
                            columns: columns2,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
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
            if (!Forms.isValid(PAGE_ID)) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            };
            console.log(model)
            let TipoComponente = model.TipoFalla.ID;
            let Componente = $.trim(model.Componente);
            let TiempoRespuesta = $.trim( model.TiempoRespuesta);
            let Duracion = $.trim(model.Duracion);
            let Impacto = model.Impacto;

            
            if (TipoComponente === null || Componente === undefined || TiempoRespuesta === undefined || Duracion === undefined || Componente === "" || TiempoRespuesta === "" || Duracion === "" || model.Impacto === null) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            }
            let regexNum = /[0-9]/;
            if ((model.Duracion !== null || model.Duracion !== undefined) && !regexNum.test(model.Duracion)) {
                warning("Favor solo introducir numeros en el campo Duracion", "Aviso");
                return;
            }
            if ((TiempoRespuesta !== null || TiempoRespuesta !== undefined) && !regexNum.test(TiempoRespuesta)) {
                warning("Favor solo introducir numeros en el campo Tiempo de Respuesta", "Aviso");
                return;
            }

            let ImpactoResult = ImpactoModel[Impacto];

            let parametros = global.assign({
                IDTIPOCOMPONENTE: TipoComponente,
                COMPONENTE: Componente,
                TIEMPORESPUESTA: TiempoRespuesta,
                DURACION: Duracion,
                IMPACTO: ImpactoResult,
                OPERACION: "INSERT"
            })
            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudComponentes/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");
                            this.loadData();
                            Forms.reset(PAGE_ID);
                            Forms.updateFormElement(PAGE_ID, "Impacto", null);
                            Forms.updateFormElement(PAGE_ID, "TipoFalla", null);
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
            if (!Forms.isValid(PAGE_ID)) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            };
            console.log(model)
            let TipoComponente = model.TipoFalla.ID;
            let Componente = $.trim(model.Componente);
            let TiempoRespuesta = $.trim(model.TiempoRespuesta);
            let Duracion = $.trim(model.Duracion);
            let Impacto = model.Impacto;


            if (TipoComponente === null || Componente === undefined || TiempoRespuesta === undefined || Duracion === undefined || Componente === "" || TiempoRespuesta === "" || Duracion === "" || model.Impacto === null) {
                warning("Los campos son obligatorios", "Aviso")
                return;
            }
            let regexNum = /[0-9]/;
            if ((model.Duracion !== null || model.Duracion !== undefined) && !regexNum.test(model.Duracion)) {
                warning("Favor solo introducir numeros en el campo Duracion", "Aviso");
                return;
            }
            if ((TiempoRespuesta !== null || TiempoRespuesta !== undefined) && !regexNum.test(TiempoRespuesta)) {
                warning("Favor solo introducir numeros en el campo Tiempo de Respuesta", "Aviso");
                return;
            }
            let row = EK.Store.getState().global.forDelete.data;
            let ImpactoResult = ImpactoModel[Impacto];


            let parametros = global.assign({
                IDTIPOCOMPONENTEOLD: row.IdTipoComponente,
                IDTIPOCOMPONENTE: TipoComponente,
                COMPONENTE: Componente,
                COMPONENTEOLD: row.DescripcionComponente,
                TIEMPORESPUESTA: TiempoRespuesta,
                IMPACTO: ImpactoResult,
                DURACION: +Duracion,
                IDCOMPONENTE: row.IdComponente,
                OPERACION: "UPDATE"
            });
            global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudComponentes/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                            success(data[0].sqlMsg, "Exito");
                            this.loadData();
                            Forms.reset(PAGE_ID);
                            Forms.updateFormElement(PAGE_ID, "Impacto", null);
                            Forms.updateFormElement(PAGE_ID, "TipoFalla", null);
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
            dispatchSuccessful("load::modeEdit", { modeEdit: false },
            PAGE_ID); Forms.updateFormElement(PAGE_ID, "Impacto", null);
            Forms.updateFormElement(PAGE_ID, "TipoFalla", null);
        }
        onDelete() {
            EK.Global.confirm("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
                let row = EK.Store.getState().global.forDelete.data;

                let parametros = global.assign({
                    IDTIPOCOMPONENTE: row.IdTipoComponente,
                    IDCOMPONENTE: row.IdComponente,
                    OPERACION: "DELETE"
                });
                global.asyncPost("base/kontrol/CatalogosSpv/GetBP/CrudComponentes/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            if (data[0].code === 0) {
                                success(data[0].sqlMsg, "Exito");
                                this.loadData();
                                dispatchSuccessful("load::modeEdit", { modeEdit: false }, PAGE_ID);
                                Forms.reset(PAGE_ID);
                                Forms.updateFormElement(PAGE_ID, "Impacto", null);
                                Forms.updateFormElement(PAGE_ID, "TipoFalla", null);
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
            Forms.updateFormElement(PAGE_ID, "Impacto", null);
            Forms.updateFormElement(PAGE_ID, "TipoFalla", null);
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
                        <SPVTiposComponentesConsulta idFormSection={PAGE_ID} tipovivienda={null} usoFalla={"Ubicacion"} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} /> 
                        <input.Text id="Componente" label="Componente" idFormSection={PAGE_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <input.Text id="TiempoRespuesta" label="Tiempo de respuesta" idFormSection={PAGE_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                        <input.Text id="Duracion" label="Duracion" idFormSection={PAGE_ID} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{}}>
                        <div style={{ padding: '2px', fontSize: 10 }}><strong>IMPACTO</strong></div>
                    </Column>
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                        <RadioButton id={"CRITICO"} label="CRITICO" idForm={config.id} value="A" groupName="Impacto" size={[4, 4, 4, 4]} />
                        <RadioButton id={"BAJO"} label="BAJO" idForm={config.id} value="B" groupName="Impacto" size={[4, 4, 4, 4]} />
                        <RadioButton id={"MEDIO"} label="NORMAL" idForm={config.id} value="M" groupName="Impacto" size={[4, 4, 4, 4]} />
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
                        <div id="datagroupContainer2" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}>
                        </div>
                    </div>

                </Column></div>
            </page.Main>;
        };
    });
};
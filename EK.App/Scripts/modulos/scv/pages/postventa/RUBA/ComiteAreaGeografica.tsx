namespace EK.Modules.SCV.Pages.postventa.RUBA.ComiteAreaGeografica {
    "use strict";
    const PAGE_ID = "ComiteAreaGeografica";
    declare const DevExpress: any;
    export const RegexLetters = /^[A-Za-z\s]+$/
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    interface IComiteAreaGeografica extends page.IProps {
        modeEdit: any,
        initTable?: (data: any) => void,
        loadCatalogo: () => void,
        entity: any,
        entityItem: any,
        loadData: any,
    };
    let getData = () => {
        let loader = document.getElementById('loading');
        let loaded = document.getElementById('loadedData');
        let parametros = global.assign({
            OPERACION: 'GETDATA'
        })
        const columns = [
            { caption: "ID", dataField: "Id" },
            { caption: "Nombre Comite", dataField: "NombreComite" },
            { caption: "Plaza", dataField: "Plaza" },
            { caption: "Segmento", dataField: "SegmentoNombre" },
            { caption: "Fraccionamiento", dataField: "Fraccionamiento" },
            { caption: "Norte", dataField: "Norte" },
            { caption: "Sur", dataField: "Sur" },
            { caption: "Este", dataField: "Este" },
            { caption: "Oeste", dataField: "Oeste" },
            { caption: "Fecha de creación", dataField: "FechaCreacion", dataType: "datetime", format: "dd/MM/yyyy" },
            {
                caption: "Editar",
                type: 'buttons',
                buttons: ['edit', {
                    hint: 'Editar',
                    icon: 'fa fa-edit',
                    onClick(e) {
                        let data = e.row.data
                        dispatchSuccessful("load::RowData", data)
                        Forms.updateFormElement(PAGE_ID, "Nombre", data.NombreComite);
                        Forms.updateFormElement(PAGE_ID, "PlazaLabel", data.Plaza);
                        Forms.updateFormElement(PAGE_ID, "Vocaciones", { ID: data.Segmento, Nombre: data.SegmentoNombre });
                        Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: data.IdFraccionamiento, Nombre: data.Fraccionamiento });
                        Forms.updateFormElement(PAGE_ID, "Norte", data.Norte);
                        Forms.updateFormElement(PAGE_ID, "Sur", data.Sur);
                        Forms.updateFormElement(PAGE_ID, "Este", data.Este);
                        Forms.updateFormElement(PAGE_ID, "Oeste", data.Oeste);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        dispatchSuccessful("load::modeEdit", { modeEdit: true })
                    },
                }],
            },
            {
                caption: "Eliminar",
                type: 'buttons',
                buttons: ['delete', {
                    hint: 'Eliminar',
                    icon: 'fa fa-trash',
                    onClick(e) {

                        let Id = e.row.data.Id
                        onDelete(Id)

                    },
                }],
            },
        ];
        global.asyncPost("base/kontrol/Comites/GetBP/CRUDComiteAreaGeografica/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    console.log(data)
                    loader.style.display = 'none';
                    loaded.style.display = 'inherit';
                    let dataGrid = $("#datagroupContainer").dxDataGrid({
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
                            fileName: "Comite Area Geografica",
                            allowExportSelectedData: false
                        },
                        onExporting: function (e) {

                            e.cancel = true;
                            for (const d of data) {
                                d.Empresas = d.Empresas ? 'SI' : 'NO';
                                d.Participantes = d.Participantes ? 'SI' : 'NO';
                            }
                            e.cancel = false;
                            setTimeout(() => {
                                for (const d of data) {
                                    d.Empresas = d.Empresas === 'SI' ? true : false
                                    d.Participantes = d.Participantes === 'SI' ? true : false
                                }
                            }, 200);

                        },
                    }).dxDataGrid("instance");
                    break;
                case AsyncActionTypeEnum.loading:
                    loader.style.display = 'block';
                    loaded.style.display = 'none'
                    break;
                case AsyncActionTypeEnum.failed:
                    loader.style.display = 'block';
                    loaded.style.display = 'none'
                    break;
            }
        })
    }
    let onDelete = (Id) => {
        let loader = document.getElementById('loading');
        let loaded = document.getElementById('loadedData');
        EK.Global.confirmTrueFalse("¿Esta seguro de eliminar el registro?", "Eliminar", () => {
            let parametros = global.assign({
                ID: Id,
                OPERACION: "DELETE"
            });
            global.asyncPost("base/kontrol/Comites/GetBP/CRUDComiteAreaGeografica/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito")
                            Forms.reset(PAGE_ID);
                            getData()
                        } else {
                            warning(data[0].msg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                }
            });
        });
    }
    export let Vista = global.connect(class extends React.Component<IComiteAreaGeografica, {}> {
        constructor(props: IComiteAreaGeografica) {
            super(props);
            this.onsave = this.onsave.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        })



        componentWillReceiveProps(nextProps: IComiteAreaGeografica): void {
            //if (hasChanged(this.props.invitadosEspeciales, nextProps.invitadosEspeciales) && global.isSuccessful(nextProps.invitadosEspeciales)) {
            //    if (isSuccessful(nextProps.invitadosEspeciales)) {
            //        let data: any = global.getData(nextProps.invitadosEspeciales);
            //        this.props.initTableSpecialGuest(data)
            //    };
            //};
        }
        //shouldComponentUpdate(nextProps: IComiteAreaGeografica, { }): boolean {
        //    //return hasChanged(this.props.modeEditPA, nextProps.modeEditPA) ||
        //    //    hasChanged(this.props.entity, nextProps.entity);
        //};
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model: any = Forms.getForm(PAGE_ID)
            let modeEdit = global.getData(this.props.modeEdit).modeEdit
            let Nombre = model.Nombre;
            let Plaza = modeEdit ? EK.Store.getState().global.RowData.data.IdPlaza : model.PlazaInicial.ID;
            let Segmento = model.Vocaciones.ID
            let Fraccionamiento = model.FraccInicial.ID;
            let Norte = model.Norte;
            let Sur = model.Sur;
            let Este = model.Este;
            let Oeste = model.Oeste;
            let Operacion = "INSERT";
            let Id = 0;

            if (Nombre === undefined || Nombre === "") {
                warning("El Campo Nombre es obligatorio", "Atención");
                return
            }
            if (Plaza === -2) {
                warning("La opción en el campo Plaza no es valida", "Atención");
                return;
            }
            if (Fraccionamiento === -2) {
                warning("La opción en el campo Fraccionamiento no es valida", "Atención");
                return;
            }
            if (Segmento === -2) {
                warning("La opción en el campo Segmento no es valida", "Atención");
                return;
            }
            if (modeEdit) {
                let rowData = global.getData(EK.Store.getState().global.RowData);
                Id = rowData.Id
                Operacion = 'UPDATE';
            }
            let parametros = global.assign({
                ID: Id,
                NOMBRE: Nombre,
                PLAZA: Plaza,
                SEGMENTO: Segmento,
                FRACCIONAMIENTO: Fraccionamiento,
                NORTE: Norte,
                SUR: Sur,
                ESTE: Este,
                OESTE: Oeste,
                OPERACION: Operacion
            })

            global.asyncPost("base/kontrol/Comites/GetBP/CRUDComiteAreaGeografica/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito")
                            Forms.reset(PAGE_ID);
                            loader.style.display = 'block';
                            loaded.style.display = 'none'
                            getData()
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción" });

                        } else {
                            warning(data[0].msg, "Aviso");
                            loader.style.display = 'block';
                            loaded.style.display = 'none'
                            dispatchSuccessful("load::modeEdit", { modeEdit: false })
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                }
            })
        }
        
        
        componentDidMount(): any {
            dispatchSuccessful("load::collapsed", { collapsed: false }, PAGE_ID)
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción" });
            getData();
        };
        onCancel() {
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            Forms.reset(PAGE_ID)
            Forms.updateFormElement(PAGE_ID, "FraccInicial", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
        }
        render(): JSX.Element {
            let totales = 0;
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "black";
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <PageButtons>
                    <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color:"white", backgroundColor: "#4EC9A2" }} />
                    {
                        isModeEdit ?
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="fa fa-ban" text={"Cancelar"} onClick={this.onCancel} style={{ marginRight: 5, color:"white", backgroundColor: "#000" }} />
                            :null
                    }
                </PageButtons>
                <ComiteAreaGeograficaLoad />
            </page.Main>;
        };
    });
    //========================================================================
    // CREATE EVENT
    //=========================================================================
    const ComiteAreaGeograficaLoad: any = global.connect(class extends React.Component<IComiteAreaGeografica, {}>{
        constructor(props: IComiteAreaGeografica) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        })
        componentWillReceiveProps(nextProps: IComiteAreaGeografica): void {
            //if (hasChanged(this.props.loadDataEdit, nextProps.loadDataEdit) && getDataID(this.props.loadDataEdit) !== getDataID(nextProps.loadDataEdit)) {
            //    if (isSuccessful(nextProps.loadDataEdit)) {
            //        let data: any = global.getData(nextProps.loadDataEdit);
            //        this.props.loadEvent(data.ID)
            //    };
            //};
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let textTitle = "ALTA";
            let icon = "fas fa-list-alt";

            if (isModeEdit) {
                textTitle = "EDITAR";
                icon = "fa fa-edit";
            }

            return <div id="">
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="Cargando..." />
                </div>
                <Row id="loadedData">
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={textTitle}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"COMITÉ"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <input.Text id="Nombre" label="Nombre del comité" idForm={PAGE_ID} size={[12, 12, 12, 6]} />
                                                <DatePicker id="FechaConformacion" type="date" label={"Fecha de conformación"} idForm={PAGE_ID} size={[12, 12, 12, 6]} required={true} validations={[validations.required()]} />
                                                <Column size={[12, 12, 4, 4]}>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <span><strong>ADMINISTRADORA</strong></span>
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <RadioButton id="SI" label="SI" idForm={PAGE_ID} groupName="Admin" size={[3, 3, 6, 6]} />
                                                        <RadioButton id="NO" label="NO" idForm={PAGE_ID} groupName="Admin" size={[3, 3, 6, 6]} />
                                                    </Column>
                                                </Column>{
                                                    !isModeEdit ?
                                                        <PlazasDDL id={"PlazaInicial"} size={[12, 12, 4, 4]} label={"PLAZAS"} idForm={PAGE_ID} validations={[validations.required()]} required={true} /> :
                                                        <label.Label id={"PlazaLabel"} size={[12, 12, 12, 4]} label={"Plazas"} idForm={PAGE_ID} />
                                                }
                                                <ddl.VocacionesFilterDDL2 id="Vocaciones" label="Segmento" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                <Fraccionamientos id={"FraccInicial"} label={"Fraccionamiento"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"CALLES COLINDANTES"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <input.Text id="Norte" label="Norte" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                                <input.Text id="Sur" label="Sur" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                                <input.Text id="Este" label="Este" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                                <input.Text id="Oeste" label="Oeste" idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>

                        </page.OptionSection>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"REGISTROS"}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row >
                                <div style={{ display: 'inherit' }}>
                                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                                </div>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </div >
        };
    });
};
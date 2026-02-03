namespace EK.Modules.SCV.Pages.SCVRequisitos {
    "use strict";
    const CARACTERISTICAS_ID: string = "caracteristicas";
    export let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("requisitos", "scv", [CARACTERISTICAS_ID]),
        icon: "fa fa-check-square",
        url: "#/scv/requisitos",
        propForm: "Requisito",
        ddlTargetUrl: global.encodeAllURL("scv", "SCVRequisitos", { activos: 1 })
    }, true, true);
    
    export interface ITipoRequisitoEnum {
        numero: string;
        lista: string;
        texto: string;
        logico: string;
        fecha: string;
        archivo: string;
        entidad: string;
    };

    export var TipoRequisitoEnum: ITipoRequisitoEnum = {
        numero: "NUM",
        lista: "LIS",
        archivo: "ARCH",
        fecha: "FEC",
        logico: "LOG",
        texto: "TEX",
        entidad: "ENT"
    }

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addDescripcion()
                .addObject("TipoRequisito")
                .addObject("TipoEntidad")
                .addObject("Caracteristicas")
                .addBoolean("TieneVencimiento")
                .addObject("WorkFlow")
                .addString("Valores")
                .addObject(CARACTERISTICAS_ID)
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let requisito: any = getData(props.entidad);
            let idRequisito: any = getDataID(props.entidad);

            if (idRequisito < 0) {
                global.dispatchSuccessful("global-page-data", [], CARACTERISTICAS_ID);
            }
            else {
                props.config.dispatchCatalogoBase("scv/requisitos/caracteristicas/", { idRequisito }, CARACTERISTICAS_ID);
            };
        };
        render(): JSX.Element {
            return <page.Main {...defaultProps.config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    }

    class View extends page.Base {
        render(): JSX.Element {
            const listHeader: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[7, 7, 7, 7]} className="list-default-header">{"Descripción"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id= {defaultProps.config.id}
                            subTitle = "Requisitos" //{defaultProps.config.id}
                            icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <label.Clave size={[12, 12, 2, 2]} />
                                <label.Nombre size={[12, 12, 8, 8]} />
                                <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                                <label.Descripcion size={[12, 12, 12, 12]} />
                                <label.Entidad id="WorkFlow" size={[12, 12, 10, 10]} />
                                <label.Boolean id="TieneVencimiento" size={[12, 12, 2, 2]} />
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <page.SectionList
                                    id={CARACTERISTICAS_ID}
                                    icon="fa fa-table"
                                    level={1}
                                    size={[12, 12, 6, 6]}
                                    listHeader={listHeader}
                                    readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-header"><h6>{item.Nombre}</h6></Column>
                                            <Column size={[7, 7, 7, 7]}><h6>{item.Descripcion}</h6></Column>
                                            <Column size={[1, 1, 1, 1]} >&nbsp;</Column>
                                        </Row>;
                                    } }>
                                </page.SectionList>
                                <TipoRequisito
                                    level={1}
                                    size={[12, 12, 6, 6]}
                                    edicion={false} />
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        }
    }

    class Edit extends page.Base {
        render(): JSX.Element {
            let $page: any = $ml[defaultProps.config.id];

            const listHeader: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[7, 7, 7, 7]} className="list-default-header">{"Descripción"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={defaultProps.config.id}
                            icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                                <input.Nombre size={[12, 12, 8, 8]} maxLength={150} validations={[validations.required()]} />
                                <checkBox.Status size={[12, 12, 2, 2]} />
                                <input.Descripcion size={[12, 12, 12, 12]} maxLength={300} validations={[]}/>
                                <ddl.WorkflowsDDL id="WorkFlow" size={[12, 12, 10, 10]} label={$page.form.WorkFlow.label} helpLabel={$page.form.WorkFlow.helpLabel} claveTipo={EK.UX.DropDownLists.IWorkFlowTypeEnum.Requisito} addNewItem={"SO"} />
                                <checkBox.CheckBox id="TieneVencimiento" size={[12, 12, 2, 2]} />
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <page.SectionList
                                    id={CARACTERISTICAS_ID}
                                    level={1}
                                    parent={defaultProps.config.id}
                                    icon="fa fa-table"
                                    listHeader={listHeader}
                                    size={[12, 12, 6, 6]}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addString("Nombre")
                                            .addString("Descripcion")
                                            .addVersion()
                                            .toObject();
                                    } }
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-header"><h6>{item.Nombre}</h6></Column>
                                            <Column size={[7, 7, 7, 7]}><h6>{item.Descripcion}</h6></Column>
                                            <buttons.PopOver idParent={defaultProps.config.id} idForm={CARACTERISTICAS_ID} info={item}
                                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                        </Row>;
                                    } }>
                                    <Row>
                                        <input.Nombre idFormSection={CARACTERISTICAS_ID} size={[12, 12, 12, 12]} />
                                        <input.Descripcion idFormSection={CARACTERISTICAS_ID} size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.SectionList>
                                <TipoRequisito
                                    level={1}
                                    size={[12, 12, 6, 6]}
                                    edicion={true} />
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        }
    }

    //BEGIN: Tipo Requisito
    interface ITipoRequisito extends React.Props<any>, grid.IColumn {
        entity?: DataElement;
        tipoRequisito?: any;
        edicion?: boolean;
        level?: number;
    }
    export let TipoRequisito: any = global.connect(class extends React.Component<ITipoRequisito, {}>{
        constructor(props: ITipoRequisito) {
            super(props);
        }
        static props: any = (state: any) => ({
            entity: state.global.currentEntity,
            tipoRequisito: state.requisitos.tipoSelected
        });
        componentWillMount(): void {
            let entidad: any = getData(this.props.entity);
            dispatchSuccessful("scv-requisitos-tipoSelected", entidad.TipoRequisito);
        }
        componentWillReceiveProps(nextProps: ITipoRequisito) {
            if (hasChanged(this.props.tipoRequisito, nextProps.tipoRequisito)) {
                let tipoRequisito: any = getData(nextProps.tipoRequisito);
                if (tipoRequisito.Clave !== TipoRequisitoEnum.lista) {
                    Forms.updateFormElement(defaultProps.config.id, "Valores", null);
                }
                if (tipoRequisito.Clave !== TipoRequisitoEnum.entidad) {
                    let elementoTest = Forms.getFormElement(defaultProps.config.id, { id: "TipoEntidad" });
                    elementoTest.value = null;
                    elementoTest.validations = [];
                    Forms.updateFormElement(defaultProps.config.id, elementoTest);
                }
            }
        }
        shouldComponentUpdate(nextProps: ITipoRequisito, {}): boolean {
            return hasChanged(this.props.tipoRequisito, nextProps.tipoRequisito) ||
                this.props.edicion !== nextProps.edicion;
        }        
        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let tipoRequisito: any = getData(this.props.tipoRequisito);
            let edicion: boolean = this.props.edicion;

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <page.OptionSection
                    id={"tipoRequisito"}
                    collapsed={false}
                    level={this.props.level}>
                    <Row>
                        {edicion ?
                            <ddl.TiposRequisitoDDL
                                id={"TipoRequisito"}
                                idFormSection={defaultProps.config.id}
                                label={"Tipo Requisito"}
                                size={[12, 12, 12, 12]}
                                value={entidad.TipoRequisito}
                                required={true}
                                validations={[validations.required()]} />
                            : <label.Entidad id="TipoRequisito" size={[12, 12, 12, 12]} />
                        }
                    </Row>
                    <Row>
                        {tipoRequisito.Clave === TipoRequisitoEnum.lista ?
                            <BasicList
                                size={[12, 12, 12, 12]}
                                id={"Valores"}
                                idForm={defaultProps.config.id}
                                readOnly={edicion ? false : true} /> : null
                        }
                        {tipoRequisito.Clave === TipoRequisitoEnum.entidad ?
                            <RequisitoEntidad
                                size={[12, 12, 12, 12]}
                                id={"TipoEntidad"}
                                idFormSection={defaultProps.config.id}
                                readOnly={edicion ? false : true} /> : null
                        }
                    </Row>
                </page.OptionSection>
            </Column>
        }
    });
    //END: Tipo Requisito

    interface IRequisitoEntidad extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        id?: string;
        entity?: DataElement;
        readOnly?: boolean;
        idFormSection?: string;
    };
    export let RequisitoEntidad: any = global.connect(class extends React.Component<IRequisitoEntidad, {}>{
        constructor(props: IRequisitoEntidad) {
            super(props);
        }
        static props: any = (state: any) => ({
            forms: state.forms,
            entity: state.global.currentEntity
        });
        static defaultProps: IRequisitoEntidad = {
            id: "",
            entity: createDefaultStoreObject({}),
            readOnly: true,
            idFormSection: ""
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let editView: boolean = !this.props.readOnly;
            let formatValue: any = (item) => {
                return !item ? "" : (!item.Clave ? "" : "(" + item.Clave + ") ") + (!item.Nombre ? "" : item.Nombre);
            };

            return editView ?
                <RequisitoEntidadesDDL
                    id={this.props.id}
                    idFormSection={this.props.idFormSection}
                    size={this.props.size}
                    label="Tipos de Entidades"
                    required={true}
                    validations={[validations.required()]} />
                : <label.Entidad id={this.props.id} size={this.props.size} />
        }
    });

    interface IRequisitoEntidadDDL extends EK.UX.DropDownLists.IDropDrownListProps { }
    export let RequisitoEntidadesDDL: any = global.connect(class extends React.Component<IRequisitoEntidadDDL, EK.UX.DropDownLists.IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.requisitosEntidades,
            entity: state.global.currentEntity,
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo de Entidad",
            helpLabel: "Seleccione el tipo de entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::requisitosEntidades", "catalogos/get(SCVENTIDADESREQUISITOS)");
            }        
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        };
    });
}
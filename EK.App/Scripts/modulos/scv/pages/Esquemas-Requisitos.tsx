// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.SCVEsquemas {
    "use strict";
    const PAGE_ID: string = "esquemas";
    const PAGE_REQUISITOS_ID: string = "esquemas$requisito";

    interface IRequisitos extends IChild {
        requisito?: global.DataElement;
        requisitos: global.DataElement;
        getRequisitos?: (props: IRequisitos) => void;
    }

    export let Requisitos: any = global.connect(class extends React.Component<IRequisitos, {}>{
        constructor(props: IRequisitos) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onDelete = this.onDelete.bind(this);
        }
        static props: any = (state: any) => ({
            etapa: state.esquemas.etapaCurrent,
            requisitos: state.esquemas.requisitos,
            requisito: state.esquemas.requisitoSelected
        });
        static defaultProps: IRequisitos = {
            editMode: false,
            idEsquema: 0,
            requisito: global.createDefaultStoreObject({}),
            requisitos: global.createDefaultStoreObject([])
        }
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getRequisitos: (props: IRequisitos): void => {
                let idEtapa: number = global.getData(props.etapa).ID;
                let idEsquema: number = props.idEsquema;
                let encodedFilters: string = global.encodeObject({ idEtapa, idEsquema });
                global.dispatchAsync("scv-esquemas-etapas-requisitos", "esquemas/requisitos/all/" + encodedFilters);
            }
        });
        componentWillMount(): void {
            dispatchDefault("scv-esquemas-etapas-requisitos", []);
        };
        componentWillReceiveProps(nextProps: IRequisitos) {
            if (global.hasChanged(this.props.etapa, nextProps.etapa)) {
                this.props.getRequisitos(nextProps);
            };
        };
        componentDidMount(): any {
            this.props.getRequisitos(this.props);
        };
        componentDidUpdate(prevProps: IRequisitos, {}): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.requisito, this.props.requisito, false)) {
                let item: any = global.getData(this.props.requisito);

                if (item.Estado === 4) {
                    success("El requisito ha sido eliminado");
                } else {
                    success("El requisito ha sido actualizado");
                }

                this.props.getRequisitos(this.props);
                this.onCancel();
            }
        };
        onSelect(item: any): void {
            Forms.remove(PAGE_REQUISITOS_ID);
            global.dispatchSuccessful("scv-esquemas-etapas-requisitos-setSelected", item);
        };
        onDelete(item: any): void {
            EK.Global.confirm("Presione Confirmar para eliminar el requisito", "Eliminar requisito", () => {
                let model = EK.Global.assign(item);
                global.dispatchAsyncPut("scv-esquemas-etapas-requisitos-guardar", "esquemas/requisitos/delete", model);
            });
        };
        onAddNew(): void {
            let newId: number = this.props.requisitos.getNextLowerID();
            let etapa: any = global.getData(this.props.etapa, {});
            //
            let item: any = {
                ID: newId,
                Obligatorio: true,
                PlazoDias: etapa.PlazoDias,
                Requisito: global.createDefaultStoreObject({}),
                IdEtapa: etapa.ID,
                IdEsquema: this.props.idEsquema
            };
            this.onSelect(item);
        };
        onCancel(): void {
            global.dispatchDefault("scv-esquemas-etapas-requisitos-setSelected", {});
        };
        onSave(): void {
            let $page: any = $ml[PAGE_ID];

            if (!Forms.isValid(PAGE_REQUISITOS_ID)) {
                warning($page.mensajes.warning.message);
                return;
            }

            let item: EditForm = Forms.getForm(PAGE_REQUISITOS_ID);
            let model: any = item
                .addNumber("ID")
                .addObject("Requisito")
                .addNumber("PlazoDias")
                .addBoolean("Obligatorio")
                .addNumber("IdEsquema")
                .addNumber("IdEtapa")
                .toObject();

            global.dispatchAsyncPut("scv-esquemas-etapas-requisitos-guardar", "esquemas/requisitos/save", model);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let title: string = "Requisitos";
            let etapa: any = global.getData(this.props.etapa, {});
            let listMode: boolean = etapa.ID > 0;
            if (listMode) {
                title = "Requisitos de " + etapa.Nombre;
            }

            let items: global.DataElement = this.props.requisitos;
            if (global.isSuccessful(this.props.requisitos)) {
                items = this.props.requisitos.getActiveItems();
            }

            let editMode: boolean = global.isSuccessful(this.props.requisito);
            let model: any = global.getData(this.props.requisito);

            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onDelete(item) }
            };

            let fnValidatePlazo = function (v: any, values?: any): boolean {
                if (values) {
                    let plazoDias: number = Number(v);
                    let plazoEtapa: number = 0;

                    if (model.ID > 0) {
                        plazoEtapa = Number(model.Etapa.PlazoDias);
                    } else {
                        plazoEtapa = Number(etapa.PlazoDias);
                    }

                    if (plazoDias > 0) {
                        if (plazoDias > plazoEtapa) {
                            return false;
                        }
                    }
                }
                return true;
            }

            const listHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[7, 7, 7, 7]} className="list-default-header">{"Requisito"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Plazo Días"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Obligatorio"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </Column>

            return this.props.editMode
                ? <page.OptionSection title={title}
                    icon="fa fa-check-square-o" collapsed={false} hideCollapseButton={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[global.getData(items, []).length].join("")}
                    </span>}
                    readOnly={false} level={1} editMode={editMode}>
                    <SectionView onAddNew={listMode ? this.onAddNew : null}>
                        <PanelUpdate info={this.props.requisitos}>
                            <List
                                items={items}
                                readonly={true}
                                addRemoveButton={false}
                                listHeader={listHeader}
                                formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                            <span style={{ fontWeight: 400 }}>{item.Requisito.Nombre}</span>
                                        </Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-right-header">
                                            <span style={{ fontWeight: 400 }}>{item.PlazoDias}</span>
                                        </Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                            <span>{EK.UX.Labels.yes(item.Obligatorio)}</span>
                                        </Column>
                                        <buttons.PopOver idForm={PAGE_REQUISITOS_ID} info={item} extraData={[edit, remove]} />
                                    </Row>;
                                } } />
                        </PanelUpdate>
                    </SectionView>
                    <SectionEdit
                        idForm={PAGE_REQUISITOS_ID}
                        onCancel={this.onCancel}
                        onSave={this.onSave}>
                        <Row>
                            <input.Hidden id={"ID"} idFormSection={PAGE_REQUISITOS_ID} value={model.ID} />
                            <input.Hidden id={"IdEsquema"} idFormSection={PAGE_REQUISITOS_ID} value={model.IdEsquema} />
                            <input.Hidden id={"IdEtapa"} idFormSection={PAGE_REQUISITOS_ID} value={model.IdEtapa} />
                            <ddl.SCVRequisitosDDL
                                id={"Requisito"}
                                idFormSection={PAGE_REQUISITOS_ID}
                                label={$page.form.section.esquemas$Etapas.form.section.etapas$Requisitos.form.requisito.label}
                                required={true}
                                size={[7, 7, 7, 7]}
                                helpLabel={$page.form.section.esquemas$Etapas.form.section.etapas$Requisitos.form.requisito.helplabel}
                                value={model.Requisito}
                                validations={[validations.required()]} />
                            <input.Integer
                                id={"PlazoDias"}
                                idFormSection={PAGE_REQUISITOS_ID}
                                label={$page.form.section.esquemas$Etapas.form.section.etapas$Requisitos.form.plazoDias.label}
                                size={[3, 3, 3, 3]}
                                required={true}
                                value={model.PlazoDias}
                                maxLength={8}
                                validations={[
                                    validations.isNumber(),
                                    validations.custom("", "El plazo de entrega del requisito no puede ser mayor al plazo de la etapa.", [], fnValidatePlazo)
                                ]} />
                            <checkBox.CheckBox
                                id={"Obligatorio"}
                                idFormSection={PAGE_REQUISITOS_ID}
                                label={$page.form.section.esquemas$Etapas.form.section.etapas$Requisitos.form.obligatorio.label}
                                xs={{ size: 2 }}
                                sm={{ size: 2 }}
                                md={{ size: 2 }}
                                lg={{ size: 2 }}
                                required={true}
                                value={model.Obligatorio}
                                mode={checkBox.Mode.line}
                                helpLabel={$page.form.section.esquemas$Etapas.form.section.etapas$Requisitos.form.obligatorio.helplabel} />
                        </Row>
                    </SectionEdit>
                </page.OptionSection >
                : <page.OptionSection title={title}
                    icon="fa fa-check-square-o" collapsed={false} hideCollapseButton={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[global.getData(items, []).length].join("")}
                    </span>}
                    readOnly={false} level={1}>
                    <PanelUpdate info={this.props.requisitos}>
                        <List
                            items={items}
                            readonly={true}
                            addRemoveButton={false}
                            listHeader={listHeader}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                        <span style={{ fontWeight: 400 }}>{item.Requisito.Nombre}</span>
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-right-header">
                                        <span style={{ fontWeight: 400 }}>{item.PlazoDias}</span>
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                        <span>{EK.UX.Labels.yes(item.Obligatorio)}</span>
                                    </Column>
                                    <Column size={[1, 1, 1, 1]}>&nbsp;</Column>
                                </Row>;
                            } } />
                    </PanelUpdate>
                </page.OptionSection>
        }
    });
}
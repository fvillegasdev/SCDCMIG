// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.SCVEsquemas {
    "use strict";
    const PAGE_ID: string = "esquemas";
    const PAGE_DOCUMENTOS_ID: string = "esquemas$documento";

    interface IDocumentos extends IChild {
        documento?: global.DataElement;
        documentos: global.DataElement;
        getDocumentos?: (props: IDocumentos) => void;
    }

    export let Documentos: any = global.connect(class extends React.Component<IDocumentos, {}>{
        constructor(props: IDocumentos) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onDelete = this.onDelete.bind(this);
        }
        static props: any = (state: any) => ({
            etapa: state.esquemas.etapaCurrent,
            documentos: state.esquemas.documentos,
            documento: state.esquemas.documentoSelected
        });
        static defaultProps: IDocumentos = {
            editMode: false,
            idEsquema: 0,
            documento: global.createDefaultStoreObject({}),
            documentos: global.createDefaultStoreObject([])
        }
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getDocumentos: (props: IDocumentos): void => {
                let idEtapa: number = global.getData(props.etapa).ID;
                let idEsquema: number = props.idEsquema;
                let encodedFilters: string = global.encodeObject({ idEtapa, idEsquema });
                global.dispatchAsync("scv-esquemas-etapas-documentos", "esquemas/documentos/all/" + encodedFilters);
            }
        });
        componentWillMount(): void {
            global.dispatchDefault("scv-esquemas-etapas-documentos", []);
        };
        componentWillReceiveProps(nextProps: IDocumentos) {
            if (global.hasChanged(this.props.etapa, nextProps.etapa)) {
                this.props.getDocumentos(nextProps);
            };
        };
        componentDidMount(): any {
            this.props.getDocumentos(this.props);
        };
        componentDidUpdate(prevProps: IDocumentos, {}): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.documento, this.props.documento, false)) {
                let item: any = global.getData(this.props.documento);

                if (item.Estado === 4) {
                    success("El documento ha sido eliminado");
                } else {
                    success("El documento ha sido actualizado");
                }

                this.props.getDocumentos(this.props);
                this.onCancel();
            }
        };
        onSelect(item: any): void {
            Forms.remove(PAGE_DOCUMENTOS_ID);
            global.dispatchSuccessful("scv-esquemas-etapas-documentos-setSelected", item);
        };
        onDelete(item: any): void {
            EK.Global.confirm("Presione Confirmar para eliminar el documento", "Eliminar documento", () => {
                let model = EK.Global.assign(item);
                global.dispatchAsyncPut("scv-esquemas-etapas-documentos-guardar", "esquemas/documentos/delete", model);
            });
        };
        onAddNew(): void {
            let newId: number = this.props.documentos.getNextLowerID();
            let item: any = {
                ID: newId,
                Documento: global.createDefaultStoreObject({}),
                IdEtapa: global.getData(this.props.etapa).ID,
                IdEsquema: this.props.idEsquema
            };
            this.onSelect(item);
        };
        onCancel(): void {
            Forms.remove(PAGE_DOCUMENTOS_ID);
            global.dispatchDefault("scv-esquemas-etapas-documentos-setSelected", {});
        }
        onSave(): void {
            let $page: any = $ml[PAGE_ID];

            if (!Forms.isValid(PAGE_DOCUMENTOS_ID)) {
                warning($page.mensajes.warning.message);
                return;
            }

            let item: EditForm = Forms.getForm(PAGE_DOCUMENTOS_ID);
            let model: any = item
                .addNumber("ID")
                .addObject("Documento")
                .addObject("RequisitoRelacionado")
                .addNumber("IdEsquema")
                .addNumber("IdEtapa")
                .toObject();

            global.dispatchAsyncPut("scv-esquemas-etapas-documentos-guardar", "esquemas/documentos/save", model);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let title: string = "Documentos";
            let listMode: boolean = global.getDataID(this.props.etapa) > 0 ? true : false;
            if (listMode) {
                title = "Documentos de " + global.getData(this.props.etapa).Nombre;
            }

            let items: global.DataElement = this.props.documentos;
            if (global.isSuccessful(this.props.documentos)) {
                items = this.props.documentos.getActiveItems();
            }

            let editMode: boolean = global.isSuccessful(this.props.documento);
            let model: any = global.getData(this.props.documento);

            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onDelete(item) }
            };

            const listHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[5, 5, 5, 5]} className="list-default-header">{"Documento"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Tipo Documento"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"N. Copias"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </Column>

            return this.props.editMode
                ? <page.OptionSection title={title}
                    icon="fa fa-file-text-o" collapsed={false} hideCollapseButton={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[global.getData(items, []).length].join("")}
                    </span>}
                    readOnly={false} editMode={editMode} level={1}>
                    <SectionView onAddNew={listMode ? this.onAddNew : null}>
                        <PanelUpdate info={this.props.documentos}>
                            <List
                                items={items}
                                readonly={true}
                                addRemoveButton={false}
                                listHeader={listHeader}
                                formatter={(index: number, item: any) => {
                                    let requisito: any = global.assign({}, item.RequisitoRelacionado);
                                    let documento: any = global.assign({}, item.Documento);
                                    let tipoDocumento: any = global.assign({}, documento.TipoDocumento);

                                    let className: string = "badge badge-info";
                                    if (tipoDocumento.Clave === "FORMATO") {
                                        className = "badge badge-success";
                                    } else if (tipoDocumento.Clave === "AUTO") {
                                        className = "badge badge-primary";
                                    }

                                    return <Row>
                                        <Column size={[5, 5, 5, 5]} className="listItem-default-header"><span style={{ fontWeight: "normal" }}>{documento.Nombre}</span></Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-header"><span className={className}>{tipoDocumento.Nombre}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-right-header"><span style={{ fontWeight: 400 }}>{documento.NumeroCopias}</span></Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                            {requisito.ID > 0 ? <EK.UX.HoverCard content={item.RequisitoRelacionado.Nombre} placement={"left"}><EK.UX.Icon type={"fa fa-check-square-o"} style={{ fontSize: 16 }} /></EK.UX.HoverCard> : null}
                                        </Column>
                                        <buttons.PopOver idForm={PAGE_DOCUMENTOS_ID} info={item} extraData={[edit, remove]} />
                                    </Row>
                                } } />
                        </PanelUpdate>
                    </SectionView>
                    <SectionEdit
                        idForm={PAGE_DOCUMENTOS_ID}
                        onCancel={this.onCancel}
                        onSave={this.onSave}>
                        <Row>
                            <input.Hidden id={"ID"} idFormSection={PAGE_DOCUMENTOS_ID} value={model.ID} />
                            <input.Hidden id={"IdEsquema"} idFormSection={PAGE_DOCUMENTOS_ID} value={model.IdEsquema} />
                            <input.Hidden id={"IdEtapa"} idFormSection={PAGE_DOCUMENTOS_ID} value={model.IdEtapa} />
                            <SCVDocumentosExpedienteDDL
                                id={"Documento"}
                                idFormSection={PAGE_DOCUMENTOS_ID}
                                label={$page.form.section.esquemas$Etapas.form.section.etapas$Documentos.form.documento.label}
                                required={true}
                                size={[12, 12, 12, 12]}
                                helpLabel={$page.form.section.esquemas$Etapas.form.section.etapas$Documentos.form.documento.helplabel}
                                value={model.Documento}
                                validations={[validations.required()]} />
                            <RequisitosRelacionadosDDL
                                idEsquema={this.props.idEsquema}
                                idEtapa={global.getData(this.props.etapa).ID}
                                idFormSection={PAGE_DOCUMENTOS_ID}
                                size={[12, 12, 12, 12]}
                                value={model.RequisitoRelacionado} />
                        </Row>
                    </SectionEdit>
                </page.OptionSection>
                : <page.OptionSection title={title}
                    icon="fa fa-file-text-o" collapsed={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[global.getData(items, []).length].join("")}
                    </span>}
                    hideCollapseButton={false} readOnly={false} level={1}>
                    <PanelUpdate info={this.props.documentos}>
                        <List
                            items={items}
                            readonly={true}
                            addRemoveButton={false}
                            listHeader={listHeader}
                            formatter={(index: number, item: any) => {
                                let requisito: any = global.assign({}, item.RequisitoRelacionado);
                                let documento: any = global.assign({}, item.Documento);
                                let tipoDocumento: any = global.assign({}, documento.TipoDocumento);

                                let className: string = "badge badge-info";
                                if (tipoDocumento.Clave === "FORMATO") {
                                    className = "badge badge-success";
                                } else if (tipoDocumento.Clave === "AUTO") {
                                    className = "badge badge-primary";
                                }

                                return <Row>
                                    <Column size={[5, 5, 5, 5]} className="listItem-default-header"><span style={{ fontWeight: "normal" }}>{documento.Nombre}</span></Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-header"><span className={className}>{tipoDocumento.Nombre}</span></Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-right-header"><span style={{ fontWeight: 400 }}>{documento.NumeroCopias}</span></Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        {requisito.ID > 0 ? <EK.UX.HoverCard content={item.RequisitoRelacionado.Nombre} placement={"left"}><EK.UX.Icon type={"fa fa-check-square-o"} style={{ fontSize: 16 }} /></EK.UX.HoverCard> : null}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]}>&nbsp;</Column>
                                </Row>
                            } } />
                    </PanelUpdate>
                </page.OptionSection>
        }
    });

    interface RequisitosRelacionadosProps extends EK.UX.DropDownLists.IDropDrownListProps {
        idEsquema?: number;
        idEtapa?: number;
    };

    class RequisitosRelacionados$DDL extends React.Component<RequisitosRelacionadosProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.requisitos$relacionados
        });
        static defaultProps: RequisitosRelacionadosProps = {
            id: "RequisitoRelacionado",
            items: global.createDefaultStoreObject([]),
            label: "Requisito Relacionado",
            helpLabel: "Requisito Relacionado",
            value: global.createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6]
        };
        componentDidMount(): void {
            let idEsquema: number = this.props.idEsquema;
            let idEtapa: number = this.props.idEtapa;
            let encodedFilters: string = global.encodeObject({ idEsquema, idEtapa, kv: 1 });
            global.dispatchAsync("load::requisitos$relacionados", "esquemas/requisitos/all/" + encodedFilters);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const RequisitosRelacionadosDDL: any = ReactRedux.connect(RequisitosRelacionados$DDL.props, null)(RequisitosRelacionados$DDL);
}
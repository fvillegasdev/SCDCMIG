// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SCVEsquemas {
    "use strict";
    const PAGE_ID: string = "esquemas";
    const config: page.IPageConfig = global.createPageConfig("esquemas", "scv");

    interface IParams {
        id: any;
    }

    interface IProps extends React.Props<any> {
        obtenerItem?: (id: number) => void;
        guardar?: (item: any) => void;
        obtenerCatalogo?: () => void;
        item?: any;
        params?: IParams;
        isNew?: boolean;
    }

    interface IState {
        viewMode?: boolean;
    }

    export let Edicion: any = global.connect(class extends React.Component<IProps, IState> {
        constructor(props: IProps) {
            super(props);
            this.editForm = this.editForm.bind(this);
            this.saveForm = this.saveForm.bind(this);
            this.cancelEditForm = this.cancelEditForm.bind(this);
            this.state = { viewMode: this.props.isNew ? false : true };
        }
        static props: any = (state: any): any => ({
            item: state.esquemas.selected
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => {
                global.dispatchAsync("scv-esquemas-setSelected", "esquemas/" + id);
            },
            guardar: (item: any): void => {
                global.dispatchAsyncPut("scv-esquemas-guardar", "esquemas/save", item);
            },
            obtenerCatalogo: (): any => {
                let props: page.IProps = { id: config.id, pageLink: config.id };
                page.dispatchGlobalData(props);
            }
        });
        static defaultProps: IProps = {
            isNew: false,
            item: global.createDefaultStoreObject({})
        };
        editForm(): void {
            Forms.remove(PAGE_ID);
            this.setState({ viewMode: false });
        };
        saveForm(): void {
            let $page: any = $ml[PAGE_ID];

            if (!Forms.isValid(PAGE_ID)) {
                warning($page.mensajes.warning.message);
                return;
            };

            let item: EditForm = Forms.getForm(PAGE_ID);
            let model: any = item
                .addNumberConst("ID", global.getDataID(this.props.item))
                .addString("Clave")
                .addString("Nombre")
                .addObject("FaseExpediente")
                .addEstatus("Estatus")
                .toObject();

            this.props.guardar(model);
            this.setState({ viewMode: false });
        };
        cancelEditForm(): void {
            if (!this.props.isNew && !this.state.viewMode) {
                Forms.remove(PAGE_ID);
                this.setState({ viewMode: true });
            } else {
                ReactRouter.hashHistory.goBack();
            }
        };
        componentWillMount(): void {
            global.dispatchDefault("scv-esquemas-niveles", []);
            global.dispatchDefault("scv-esquemas-niveles-sortable", []);
            global.dispatchDefault("scv-esquemas-niveles-setSelected", {});

            if (this.props.isNew && this.props.item.data.ID > 0) {
                this.props.item.data = {};
            }
        };
        componentDidMount(): void {
            global.requireGlobal(Catalogos.estatus);
            global.setCurrentEntityType(PAGE_ID);

            if (!this.props.isNew) {
                let id: number = Number(this.props.params.id);
                if (id) {
                    this.props.obtenerItem(id);
                } else {
                    global.dispatchFailed("scv-esquemas-setSelected", null);
                }
            } else {
                global.dispatchSuccessful("scv-esquemas-setSelected", global.createSuccessfulStoreObject({}));
            }
        };
        componentWillReceiveProps(nextProps: IProps) {
            if (hasChanged(this.props.item, nextProps.item)) {
                global.setCurrentEntity(nextProps.item);
            }
        };
        componentDidUpdate(prevProps: IProps, prevState: IState): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item)) {
                global.success($page.mensajes.exito);
                this.props.obtenerCatalogo();
                this.setState({ viewMode: true });
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let $bc: any = $ml.bc;
            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.esquemas];

            let editView: boolean = !this.state.viewMode;
            let title: IPageTitle;
            let current: any = this.props.item.data;

            title = {
                title: !this.props.isNew ? current.Nombre : $page.editar.nuevo,
                subTitle: !this.props.isNew ? current.Clave : "",
                children: !this.props.isNew ? [EK.UX.Labels.badgeEstatus(current.Estatus)] : null
            };

            let info: DataElement = this.props.item;
            if (!this.props.isNew) {
                let id: number = Number(this.props.params.id);
                if (id !== global.getDataID(this.props.item)) {
                    info = global.createLoadingStoreObject({});
                }
            }

            let page: JSX.Element =
                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
                    <PageButtons>
                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
                        {!editView ? <EditButton onClick={this.editForm} /> : null}
                        <CancelButton onClick={this.cancelEditForm} />
                    </PageButtons>
                    <PanelUpdate info={info}>
                        {!editView
                            ? <View item={current} />
                            : <Edit item={current} isNew={this.props.isNew} />}
                    </PanelUpdate>
                </PageV2>;
            return page;
        }
    });

    interface IViewProps extends React.Props<any> {
        item: any;
    };

    class View extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.item;
            let estatus: boolean = current.Estatus && current.Estatus.Clave === "A";
            let idEsquema: number = this.props.item.ID;

            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection id={PAGE_ID} level="main" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <label.Clave label={$page.form.clave.label} size={[2, 2, 2, 2]} />
                                <label.Nombre label={$page.form.nombre.label} size={[8, 8, 8, 8]} />
                                <label.Estatus label={$page.form.estatus.label} size={[2, 2, 2, 2]} />
                                <label.Entidad id="FaseExpediente" label={$page.form.faseExpediente.label} size={[12, 12, 6, 6]} />
                            </Row>
                            <Row style={{ paddingTop: 15 }}>
                                <Column size={[12, 12, 4, 4]}>
                                    <Niveles editMode={false} idEsquema={idEsquema} />
                                </Column>
                                <Column size={[12, 12, 8, 8]}>
                                    <Requisitos editMode={false} idEsquema={idEsquema} />
                                    <Documentos editMode={false} idEsquema={idEsquema} />
                                    <Procesos editMode={false} idEsquema={idEsquema} />
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </FadeInColumn>
        }
    };

    interface IEditProps extends React.Props<any> {
        item: any;
        isNew?: boolean;
    };

    const Edit: any = page.connect(class extends React.Component<IEditProps, {}> {
        constructor(props: IEditProps) {
            super(props);
        };
        refs: {
            form: any;
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.item;
            let estatus: boolean = current.Estatus && current.Estatus.Clave === "A";
            let idEsquema: number = this.props.item.ID;

            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection id={PAGE_ID} level="main" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <input.Hidden id={"ID"} idForm={PAGE_ID} value={current.ID} />
                                <input.Clave
                                    idForm={PAGE_ID}
                                    maxLength={25}
                                    label={$page.form.clave.label}
                                    size={[2, 2, 2, 2]}
                                    required={true}
                                    value={current.Clave}
                                    helpLabel={$page.form.clave.helplabel}
                                    validations={[validations.required()]} />
                                <input.Nombre
                                    idForm={PAGE_ID}
                                    label={$page.form.nombre.label}
                                    size={[8, 8, 8, 8]}
                                    required={true}
                                    value={current.Nombre}
                                    helpLabel={$page.form.nombre.helplabel}
                                    maxLength={150}
                                    validations={[validations.required()]} />
                                <checkBox.Status
                                    idForm={PAGE_ID}
                                    label={$page.form.estatus.label}
                                    xs={{ size: 2 }}
                                    sm={{ size: 2 }}
                                    md={{ size: 2 }}
                                    lg={{ size: 2 }}
                                    required={true}
                                    value={estatus}
                                    helpLabel={$page.form.estatus.helplabel}
                                    disabled={false} />
                                <ddl.FasesExpedienteDDL
                                    idForm={PAGE_ID}
                                    label={$page.form.faseExpediente.label}
                                    size={[12, 12, 6, 6]}
                                    required={true}
                                    helpLabel={$page.form.faseExpediente.helplabel}
                                    value={current.FaseExpediente}
                                    validations={[validations.required()]} />
                            </Row>
                            {current.ID > 0 ?
                                <Row style={{ paddingTop: 15 }}>
                                    <Column size={[12, 12, 4, 4]}>
                                        <Niveles editMode={true} idEsquema={idEsquema} />
                                    </Column>
                                    <Column size={[12, 12, 8, 8]}>
                                        <Requisitos editMode={true} idEsquema={idEsquema} />
                                        <Documentos editMode={true} idEsquema={idEsquema} />
                                        <Procesos editMode={true} idEsquema={idEsquema} />
                                    </Column>
                                </Row>
                                : null
                            }
                        </page.OptionSection>
                    </Column>
                </Row>
            </FadeInColumn>
        }
    });

    export class Nuevo extends React.Component<{}, {}> {
        render(): JSX.Element {
            return <Edicion isNew={true} />
        }
    };
}
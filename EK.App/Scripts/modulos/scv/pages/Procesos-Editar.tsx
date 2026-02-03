namespace EK.Modules.SCV.Pages.Procesos {
    "use strict";
    //const config: page.IPageConfig = global.createPageConfig("procesos", "scv");
    export let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("procesos", "scv"),
        icon: "fa fa-cogs",
        url: "#/scv/procesos",
        propForm: "Proceso",
        ddlTargetUrl: "base/scv/procesos/all/" + global.encodeParameters({ activos: 1 }),
        itemFormatter: (item, container): any => {
            if (!item.id) {
                return $(item.text);
            }
            else {
                return $([
                    "<span class='badge badge-success bold' style='margin-right: 5px'>", item.Evento, "</span>",
                    "<span class='badge badge-success bold' style='margin-right: 10px'>", item.Clave, "</span>",
                    "<span class='' style='font-size: 11px'>", item.Nombre, "</span> ",
                    item.Opcion && item.Opcion.Nombre ? "<span class='bold' style='font-size: 10px'> (" + item.Opcion.Nombre + ")</span> " : ""
                ].join(""));
            };
        },
        selectionFormatter: (item): any => {
            if (!item) return "";
            if (!item.id || item.id === "" || isNaN(item.id) || !item.Clave) {
                return $([
                    "<span class='badge badge-primary bold' style='margin-right: 5px'>", item.Evento, "</span>",
                    "<span class='badge badge-primary bold' style='margin-right: 10px'>", item.Clave, "</span>",
                    "<span class='' style='font-size: 11px'>", item.text, "</span> ",
                    item.Opcion && item.Opcion.Nombre ? "<span class='bold' style='font-size: 10px'> (" + item.Opcion.Nombre + ")</span> " : ""
                ].join(""));
            };
            return $([
                "<span class='badge badge-primary bold' style='margin-right: 5px'>", item.Evento, "</span>",
                "<span class='badge badge-primary bold' style='margin-right: 10px'>", item.Clave, "</span>",
                "<span class='' style='font-size: 11px'>", item.Nombre, "</span> ",
                item.Opcion && item.Opcion.Nombre ? "<span class='bold' style='font-size: 10px'> (" + item.Opcion.Nombre + ")</span> " : ""
            ].join(""));
        }
    }, true, true);

    let ml: any = defaultProps.config.getML();
    let PAGE_ID = "Procesos";
    let Responsable = "Responsable del Proceso";
    let Ejecucion = "Ejecución del Proceso";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addString("Clave")
                .addString("Nombre")
                .addObject("AccionProceso")
                .addString("Responsable")
                .addBoolean("Sistema")
                .addString("Evento")
                .addObject("Opcion")
                .addObject("TipoProceso")
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        }
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});
        };
        render(): JSX.Element {
            return <page.Main {...defaultProps.config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntitySaved={this.onEntitySaved} >
                <View />
                <Edit />
            </page.Main>
        }
    };

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fas fa-project-diagram" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={50} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            <AccionesProcesoDDL id={"AccionProceso"} size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <OpcionesSistemaDDL size={[12, 4, 4, 4]} />
                            <TipoProcesoDDL size={[12, 4, 4, 4]}/>
                            <Column size={[12, 12, 6, 6]} style={{marginTop: 15}}>
                                <page.OptionSection
                                    id={Responsable}
                                    level={1}
                                    subTitle={Responsable}
                                    collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <RadioButton id={"Sistema"} value={0} groupName={"Responsable"} size={[12, 12, 3, 3]} />
                                    </Row>
                                    <Row>
                                        <RadioButton id={"Usuario"} value={1} groupName={"Responsable"} size={[12, 12, 3, 3]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]} style={{ marginTop: 15 }}>
                                <page.OptionSection
                                    id={Ejecucion}
                                    level={1}
                                    subTitle={Ejecucion}
                                    collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <RadioButton id={"Iniciar-Etapa"} value={0} groupName={"Evento"} size={[12, 12, 4, 4]} />
                                    </Row>
                                    <Row>
                                        <RadioButton id={"Durante-Etapa"} value={1} groupName={"Evento"} size={[12, 12, 4, 4]} />
                                    </Row>
                                    <Row>
                                        <RadioButton id={"Finalizar-Etapa"} value={2} groupName={"Evento"} size={[12, 12, 4, 4]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    }

    let View: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let $ml: any = this.props.config.getML();

            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fas fa-project-diagram" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                            <label.Entidad id="AccionProceso" size={[12, 4, 4, 4]} />
                            <label.Entidad id="Opcion" size={[12, 4, 4, 4]} value={(item: any) => {
                                return !item ? "" : "<span class='badge badge-info'>" + (item && item.Modulo && item.Modulo.Clave ? item.Modulo.Clave : "-") + "</span> " + (!item.Nombre ? "-" : item.Nombre);
                            }} />
                            <label.Entidad id="TipoProceso" size={[12, 4, 4, 4]} />

                            <Column size={[12, 12, 6, 6]} style={{ marginTop: 15 }}>
                                <page.OptionSection
                                    id={Responsable}
                                    level={1}
                                    subTitle={Responsable}
                                    collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Label id="Responsable" size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]} style={{ marginTop: 15 }}>
                                <page.OptionSection
                                    id={Ejecucion}
                                    level={1}
                                    subTitle={Ejecucion}
                                    collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Label id="Evento" size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    });


    export let TipoProcesoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoDeProcesos
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoProceso",
            items: createDefaultStoreObject([]),
            label: "Tipo de Proceso",
            helpLabel: "Seleccione un tipo de proceso",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TipoDeProcesos", "catalogos/get(TipoDeProcesos)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    class OpcionesSistema$DDL extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListState> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESSISTEMA
        });
        static defaultProps: IDropDrownListProps = {
            id: "Opcion",
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "OpcionSistema", { asignableProceso: 1 });
                dispatchAsync("load::OPCIONESSISTEMA", url);
            };
        };
        render(): any {
            return <ddl.DropdownList$Form {...this.props} addNewItem="SO" />;
        };
    };
    const OpcionesSistemaDDL: any = ReactRedux.connect(OpcionesSistema$DDL.props, null)(OpcionesSistema$DDL);
}
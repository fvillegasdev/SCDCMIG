namespace EK.Modules.SCCO.Pages.InsumosMateriales {
    "use strict";
    const TOLERANCIA = "ToleranciaProcesos";
    const PAGE_ID = "InsumosMateriales";
    const config: page.IPageConfig = global.createPageConfig("InsumosMateriales", "scco", [TOLERANCIA]);

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus("Estatus")
                .addNumber("IdInsumo")
                .addObject("TipoInsumo")
                .addObject("GrupoInsumo")
                .addDate("FechaInicio")
                .addDate("FechaFin")
                .addString("ClaveInsumo")
                .addString("Descripcion")
                .addObject("UnidadMedida")
                .addBoolean("ProductoTerminado")
                .addBoolean("MateriaPrima")
                .addBoolean("Facturable")
                .addString("NumeroEconomico")
                .addObject("DiasPromedioE")
                .addObject(TOLERANCIA)
                .addVersion()
                .toObject();

            let claveInsumo: string = [model.TipoInsumo ? model.TipoInsumo.Clave : "", model.GrupoInsumo ? model.GrupoInsumo.Clave : "", model.Clave].join("");
            if (claveInsumo && claveInsumo.length < 12) {
                global.warning("La clave de insumo debe ser mínimo 12 dígitos, formada por el tipo, grupo y código de insumo.");
                return null;
            };

            return model;
            //guarda vista o form al terminar de editar
        };
        onEntityLoaded(props: page.IProps): any {
            let idReferencia: number = getData(props.entidad).IdReferencia;
            if (idReferencia && idReferencia > 0) {
                props.config.setState({ viewMode: true, isNew: false });
                global.dispatchAsync("global-current-entity", "base/scco/InsumosMateriales/GetBP/GetByIdInsumo/" + global.encodeParameters({ idInsumo: idReferencia }));
            } else {
                let entidad: any = global.getData(props.entidad);
                let idInsumoMaterial: number = global.getDataID(props.entidad);
                if (idInsumoMaterial <= 0 || idInsumoMaterial === undefined) {
                    global.dispatchSuccessful("global-page-data", [], TOLERANCIA)
                } else {
                    global.dispatchSuccessful("global-page-data", entidad.ToleranciaProcesos, TOLERANCIA);
                };
            };
        };
        render(): JSX.Element {
            //render para mostrar campos al dar doble clik sobre un item o al agregar un nuevo registro
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    interface IInsumos extends page.IProps {
        clave?: string;
        grupoInsumo?: any;
        tipoInsumo?: any;
    };

    let Edit: any = global.connect(class extends React.Component<IInsumos, IInsumos> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoInsumo = Forms.getValue("TipoInsumo", config.id, state);
            retValue.grupoInsumo = Forms.getValue("GrupoInsumo", config.id, state);
            retValue.clave = Forms.getValue("Clave", config.id, state);
            return retValue;
        };

        componentWillReceiveProps(nextProps: IInsumos): void {
            if (global.hasChanged(this.props.tipoInsumo, nextProps.tipoInsumo)) {
                let idTipoInsumo: number = nextProps.tipoInsumo != undefined && nextProps.tipoInsumo.ID != undefined ? nextProps.tipoInsumo.ID : undefined;
                if (idTipoInsumo != undefined) {
                    Forms.updateFormElement(config.id, "GrupoInsumo", '');
                    let url: string = global.encodeAllURL("scco", "GrupoInsumo", { activos: 1, idTipoInsumo });
                    dispatchAsync("load::GrupoInsumo", url);
                }
            };
            //
            if (global.hasChanged(this.props.tipoInsumo, nextProps.tipoInsumo) ||
                global.hasChanged(this.props.grupoInsumo, nextProps.grupoInsumo) ||
                global.hasChanged(this.props.clave, nextProps.clave)) {
                let tipoInsumo: any = global.assign({}, nextProps.tipoInsumo);
                let grupoInsumo: any = global.assign({}, nextProps.grupoInsumo);
                let clave: string = nextProps.clave ? nextProps.clave : "";
                let claveInsumo: string = [tipoInsumo.Clave, grupoInsumo.Clave, clave].join("-");
                if (claveInsumo && claveInsumo.length > 2) {
                    Forms.updateFormElement(config.id, "ClaveInsumo", claveInsumo);
                };
            };
        };

        //render para mostrar campos a editar al dar doble clik sobre un item o para agreagar un nuevo item
        render(): JSX.Element {
            let timeStamp = Number(new Date()).toString();
            let insumo: any = global.getData(this.props.entidad);

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-boxes fa-3x"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 3, 3, 3]}>
                                <ImageManager modulo={config.id} viewMode={false} />
                            </Column>
                            <Column size={[12, 9, 9, 9]}>
                                <Row>
                                    <label.Label id="ClaveInsumo" size={[12, 12, 3, 3]} class='badge badge-success bold' />,
                                <checkBox.CheckBox id="MateriaPrima" size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                                    <checkBox.CheckBox id="Facturable" size={[12, 12, 2, 2]} addNewItem={"SO"} />
                                    <checkBox.CheckBox id="ProductoTerminado" size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                                    <checkBox.Status id="Estatus" size={[12, 12, 2, 2]} />
                                </Row>
                                <Row>
                                    <input.Clave size={[12, 12, 3, 3]} maxLength={50} />
                                    <input.Nombre size={[12, 12, 9, 9]} maxLength={150} />
                                </Row>
                                <Row>
                                    <TipoInsumoDDL id="TipoInsumo" size={[12, 12, 3, 3]} validations={[validations.required()]} />
                                    <GrupoInsumoDDL id="GrupoInsumo" size={[12, 12, 3, 3]} validations={[validations.required()]} />
                                    <UnidadMedidaDDL id="UnidadMedida" size={[12, 12, 3, 3]} />
                                    <input.Text id="NumeroEconomico" size={[12, 12, 3, 3]} maxLength={50} />
                                </Row>
                                <Row>
                                    <DatePicker id="FechaInicio" size={[12, 12, 3, 3]} maxLength={8} />
                                    <DatePicker id="FechaFin" size={[12, 12, 3, 3]} maxLength={8} />
                                    <input.Integer id="DiasPromedioE" size={[12, 8, 3, 3]} maxLength={50} />
                                </Row>
                                <Row>
                                    <TextArea id="Descripcion" size={[12, 12, 12, 12]} cols={40} />
                                    <SectionTolerancia />
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.id} viewMode={false} multiple={false} />
                </Column>
            </page.Edit>;
        };
    });
    class View extends page.Base {
        //render para mostrar campos al dar doble clik sobre un item o para agregar un nuevo item
        render(): JSX.Element {
            let timeStamp = Number(new Date()).toString();
            let insumo: DataElement = this.props.entidad;
            let insumoFoto: string = "insumo/default/foto";

            if (isSuccessful(insumo)) {
                insumoFoto = ["insumo(", getDataID(insumo), ")/lg/foto?", timeStamp].join("");
            };

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={PAGE_ID}
                            icon="fa fa-boxes fa-3x"
                            collapsed={false}
                            level="main"
                            hideCollapseButton={true}>
                            <Row>
                                <Column size={[12, 3, 3, 3]}>
                                    <ImageManager modulo={config.id} viewMode={true} />
                                </Column>
                                <Column size={[12, 9, 9, 9]}>
                                    <Row>
                                        <label.Label id="ClaveInsumo" size={[12, 12, 3, 3]} class='badge badge-warning bold' />,
                                        <label.Boolean id="MateriaPrima" size={[12, 12, 2, 2]} />
                                        <label.Boolean id="Facturable" size={[12, 12, 2, 2]} />
                                        <label.Boolean id="ProductoTerminado" size={[12, 12, 2, 2]} />
                                        <label.Estatus size={[12, 12, 2, 2]} />
                                    </Row>
                                    <Row>
                                        <label.Clave size={[12, 12, 3, 3]} />
                                        <label.Nombre size={[12, 12, 9, 9]} />
                                    </Row>
                                    <Row>
                                        <label.Entidad id="TipoInsumo" size={[12, 12, 3, 3]} />
                                        <label.Entidad id="GrupoInsumo" size={[12, 12, 3, 3]} />
                                        <label.Entidad id="UnidadMedida" size={[12, 12, 3, 3]} />
                                        <label.Label id="NumeroEconomico" size={[12, 12, 3, 3]} />
                                    </Row>
                                    <Row>
                                        <label.Label id="FechaInicio" size={[12, 12, 3, 3]} />
                                        <label.Label id="FechaFin" size={[12, 12, 3, 3]} />
                                        <label.Clave id="DiasPromedioE" size={[12, 12, 3, 3]} />
                                    </Row>
                                    <Row>
                                        <label.Label id="Descripcion" size={[12, 12, 12, 12]} />
                                    </Row>
                                    <Row>
                                        <SectionTolerancia />
                                    </Row>
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 12, 12]}>
                        <KontrolFileManager modulo={config.id} viewMode={true} multiple={false} />
                    </Column>
                </Row>
            </page.View>;
        };
    };

    let SectionTolerancia: any = global.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={TOLERANCIA}
                title={"Tolerancia Procesos"}
                parent={config.id}
                icon="fas fa-book"
                level={1}
                size={[12, 12, 12, 12]}
                style={{ paddingTop: 20 }}
                listHeader={<Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Proceso"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Tolerancia"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retvalue: any = form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNombre()
                        .addObject("Proceso")
                        .addNumber("Tolerancia")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {
                            if (value.Proceso.ID === retvalue.Proceso.ID) {
                                retvalue.ID = value.ID;
                                retvalue._found = true;
                            }
                        });
                    }

                    return retvalue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[8, 8, 8, 8]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Proceso.Nombre}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">{label.formatPercentage(item.Tolerancia)}</Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={TOLERANCIA} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.SccoProcesosDDL idFormSection={TOLERANCIA} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                    <input.Porcentaje id="Tolerancia" idFormSection={TOLERANCIA} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                </Row>
            </page.SectionList>
        }
    });
};
namespace EK.Modules.SCCO.Pages.Presupuestos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Presupuestos", "scco", [WBS.App.TARJETA_INSUMOS_WBS_ID]);
    let ml: any = config.getML();

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let $filters: any = Forms.getValues("scco$filters");
            if ($filters) {
                item.addNumberConst("IdObra", $filters.IdObra);
                item.addNumberConst("IdTabulador", $filters.IdTabulador);
                item.addNumberConst("IdTipoPresupuesto", $filters.IdTipoPresupuesto);
            };
            //
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("EstatusPresupuesto")
                .addString("Presupuesto")
                .addEstatus()
                .addVersion()
                .toObject();
            //
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let entidad: any = global.getData(props.entidad);
            let ppt: any;

            let id: number = global.getData(props.entidad).ID;
            if (id > 0) {
                let obra: any = global.assign({}, entidad.Obra);
                if (obra) {
                    WBS.App.setWBSConfig({
                        id: "Presupuesto",
                        minLevel: obra.MinimoWBSNivel,
                        maxLevel: obra.MaximoWBSNivel,
                        validations: obra.ObraNiveles
                    });
                };

                ppt = global.getData(props.entidad).Presupuesto;
            };

            if (ppt) {
                let wbs = WBS.App.deserialize(ppt, null, null);
                entidad = global.assign(entidad, { Presupuesto: wbs.serialize() });
            } else {
                let wbs: WBS.App.Interfaces.IWBSObra = new WBS.App.WBSObra({ ID: -1, Nombre: "NUEVO PRESUPUESTO", _nuevo: true });
                entidad = global.assign(entidad, { Presupuesto: wbs.serialize() });
            }

            props.config.setEntity(entidad);
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    interface IEditProps extends page.IProps {
        nombre?: any;
    };

    const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.nombre = Forms.getValue("Nombre", config.id, state);
            return retValue;
        };
        render(): JSX.Element {
            return <page.Edit>
                <Filtros.SCCOFilters />
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        level="main"
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 7, 7]} validations={[validations.required()]} />
                            <ddl.SCCOEstatusPresupuestoDDL size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                            <checkBox.Status id="Estatus" size={[12, 12, 1, 1]} />
                            <WBS.WBSTreeViewSection
                                id="Presupuesto"
                                idForm={config.id}
                                size={[12, 12, 12, 12]}
                                style={{ marginTop: 12 }}
                                treeHeader={<div className="wbs-list-header">
                                    <span className="wbs-list-header-item">{"Cantidad"}</span>
                                    <span className="wbs-list-header-item">{"Precio"}</span>
                                    <span className="wbs-list-header-item">{"Importe"}</span>
                                </div>} />
                            <WBS.WBSSidebar$Form id="Presupuesto" idForm={config.id} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    });

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Filtros.SCCOFilters />
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        level="main"
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 7, 7]} />
                            <label.Entidad id="EstatusPresupuesto" size={[12, 12, 2, 2]} />
                            <label.Estatus size={[12, 12, 1, 1]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
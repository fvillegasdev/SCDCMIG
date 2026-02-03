namespace EK.Modules.SCCO.Pages.TipoNivelesPresupuesto {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TipoNivelesPresupuesto", "scco");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Tipo de Nivel Presupuesto"
                        icon="fa fa-pencil-square-o"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };

    const View: any = global.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Tipo de Nivel Presupuesto"
                        icon="fa fa-info-circle"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
};
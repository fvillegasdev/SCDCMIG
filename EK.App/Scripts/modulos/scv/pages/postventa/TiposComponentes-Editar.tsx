namespace EK.Modules.SCV.Pages.postventa.TiposComponentes {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("TiposComponentes", "scv");
    let ml: any = config.getML();
    let PAGE_ID = "Tipos Componentes";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("UsoFalla")
                .addObject("UsoFalla")
                .addObject("DuracionGarantia")
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
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                            <input.Integer id="DuracionGarantia" size={[12, 12, 2, 2]} validations={[validations.required()]} />
                            <UsoFallaDDL id="UsoFalla" size={[12, 12, 3, 3]} />
                        </Row>

                        <Row style={{ marginTop: 20 }}>
                            <KontrolLogBookManager modulo={config.id} viewMode={false} />
                        </Row>

                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            <Label id="DuracionGarantia" size={[12, 12, 2, 2]} />
                            <label.Entidad id="UsoFalla" size={[12, 12, 3, 3]} />
                        </Row>

                        <Row style={{ marginTop: 20 }}>
                            <KontrolLogBookManager modulo={config.id} viewMode={false} />
                        </Row>

                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};



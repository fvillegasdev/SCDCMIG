namespace EK.Modules.SCV.Pages.Etapas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("etapas", "scv");
    let PAGE_ID = "Etapa de Trámite";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("PlazoEstandar")
                .addObject("FaseExpediente")
                .addObject("MacroEtapa")
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
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} required={true} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={150} required={true} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                            <ddl.FasesExpedienteDDL id="FaseExpediente" size={[12, 12, 5, 5]} required={true} validations={[validations.required()]} />
                            <ddl.MacroEtapasDDL id="MacroEtapa" size={[12, 12, 5, 5]} required={true} validations={[validations.required()]} />
                            <input.Integer id="PlazoEstandar" size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>

            </page.Edit>;
        };
    }

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            <label.Entidad id="FaseExpediente" size={[12,12, 5, 5]} />
                            <label.Entidad id="MacroEtapa" size={[12, 12, 5, 5]} />
                            <Label id="PlazoEstandar" size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    }
}
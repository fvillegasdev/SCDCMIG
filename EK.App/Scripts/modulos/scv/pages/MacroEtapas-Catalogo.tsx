// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SCVMacroEtapas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("macroEtapas", "scv");
    let PAGE_ID = "Macro-Etapas";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("FaseExpediente")
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
    }

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12,12, 2, 2]} maxLength={50} required={true} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 6, 6]} maxLength={150} required={true} validations={[validations.required()]} />
                            <ddl.FasesExpedienteDDL id="FaseExpediente" size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} required={true} validations={[validations.required()]} />
                            
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
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Entidad id="FaseExpediente" size={[12, 12, 2, 2]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    }
}
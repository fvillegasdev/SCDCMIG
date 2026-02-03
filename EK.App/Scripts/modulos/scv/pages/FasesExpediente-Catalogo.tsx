namespace EK.Modules.SCV.Pages.SCVFasesExpediente {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("fasesExpediente", "scv");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("Orden")
                .addObject("Proceso")
                .addObject("TipoExpediente")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} allowNew={false} allowDelete={false}>
                <View />
                <Edit />
            </page.Main>;
        };
    }

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <page.OptionSection
                    id={config.id}
                    level="main"
                    subTitle={"Fases Expediente"}
                    icon="fab fa-staylinked" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <input.Clave size={[2, 2, 2, 2]} maxLength={50} required={true} validations={[validations.required()]} />
                        <input.Nombre size={[6, 6, 6, 6]} maxLength={150} required={true} validations={[validations.required()]} />
                        <input.Text id="Orden" size={[2, 2, 2, 2]} required={true} validations={[validations.required(), validations.isNumber()]} />
                        <checkBox.Status size={[2, 2, 2, 2]} required={true} validations={[validations.required()]} />
                        <ddl.SCVProcesosDDL size={[12, 4, 4, 4]} id={"Proceso"} addNewItem={"SO"} />
                        <TipoExpedienteDDL size={[12, 4, 4, 4]} id={"TipoExpediente"} addNewItem={"SO"} />
                    </Row>
                 </page.OptionSection>
            </page.Edit>;
        };
    }

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <page.OptionSection
                    id={config.id}
                    level="main"
                    subTitle={"Fases Expediente"}
                    icon="fab fa-staylinked" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Clave size={[2, 2, 2, 2]} />
                        <label.Nombre size={[6, 6, 6, 6]} />
                        <label.Label id="Orden" size={[2, 2, 2, 2]} />
                        <label.Estatus size={[12, 12, 2, 2]} />
                        <label.Entidad size={[12, 4, 4, 4]} id={"Proceso"} />
                        <label.Entidad size={[12, 4, 4, 4]} id={"TipoExpediente"}/>
                    </Row>
                </page.OptionSection>
            </page.View>;
        }
    }
}
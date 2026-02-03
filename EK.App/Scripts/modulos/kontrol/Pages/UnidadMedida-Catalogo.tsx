namespace EK.Modules.Kontrol.Pages.UnidadMedidanm {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("UnidadMedida", "kontrol");
    let PAGE_ID = "UnidadMedida";

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
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[6, 2, 2, 2]} />

                            <input.Nombre size={[6, 6, 6, 6]} />

                            <checkBox.Status size={[6, 2, 2, 2]} />
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
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[6, 2, 2, 2]} />
                            <label.Nombre size={[12, 6, 6, 6]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
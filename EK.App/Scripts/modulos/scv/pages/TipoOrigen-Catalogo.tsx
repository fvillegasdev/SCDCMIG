namespace EK.Modules.SCV.Pages.Origen {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("Origen", "scv");


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
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-info-circle" title={"Origen"} collapsed={false} hideCollapseButton={true}>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={40} />
                            <input.Nombre size={[12, 3, 3, 3]} />
                            <checkBox.Status size={[6, 6, 1, 1]} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    };

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-info-circle" title={"Origen"} collapsed={false} hideCollapseButton={true}>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 3, 3, 3]} />
                            <label.Estatus id="Estatus" size={[6, 6, 1, 1]} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        };
    };
}
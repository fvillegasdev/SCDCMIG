namespace EK.Modules.SCV.Pages.Indicador {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Indicadores", "scv");

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
        }
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>
        };
    }

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={config.id}
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fas fa-flag">
                        <Row>
                            <label.Clave size={[12, 8, 3, 3]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Estatus size={[12, 4, 3, 3]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    }

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column>
                    <page.OptionSection
                        id={config.id}
                        subTitle={config.id}
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fas fa-flag">
                        <input.Clave size={[12, 6, 3, 3]} />
                        <input.Nombre size={[12, 12, 6, 6]} />
                        <checkBox.Status size={[12, 6, 3, 3]} />
                    </page.OptionSection>
                </Column>
            </page.Edit>
        }
    }
}
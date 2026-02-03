namespace EK.Modules.Kontrol.Pages.BlogPostCategorias {
    "use strict";

    const PAGE_ID: string = "BlogPostCategorias";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "kontrol");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("TipoEntidad")
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
                        <page.OptionSection icon="fa fa-money" title={"Categorias"} collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <input.Clave size={[12, 4, 4, 4]} />
                                <input.Nombre size={[12, 6, 6, 6]} />
                                <checkBox.Status size={[6, 2, 2, 2]} />
                            </Row>
                            <Row>
                                <ddl.TipoEntidadDDL id="TipoEntidad" addNewItem={"SO"} size={[12, 4, 4, 4]}  />
                            </Row>
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
                        <page.OptionSection icon="fa fa-money" title={"Categorias"} collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <label.Clave size={[12, 4, 4, 4]} />
                                <label.Nombre size={[12, 6, 6, 6]} />
                                <label.Estatus id="Estatus" size={[6, 2, 2, 2]} />
                            </Row>
                            <Row>
                                <label.Entidad id="TipoEntidad" size={[12, 4, 4, 4]} />
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        };
    };
};
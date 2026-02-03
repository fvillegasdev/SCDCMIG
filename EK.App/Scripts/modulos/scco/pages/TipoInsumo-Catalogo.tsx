namespace EK.Modules.SCCO.Pages.TipoInsumo {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("TipoInsumo", "scco");
    let PAGE_ID = "TipoInsumo";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("Categoria")
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
                        icon="fas fa-edit"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50}  />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={50}  />
                            <checkBox.Status size={[12, 12, 2, 2]}  />
                        </Row>
                        <Row>
                            <CategoriaInsumoDDL id="Categoria" size={[12, 12, 4, 4]} validations={[validations.required()]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        //render para mostrar campos al dar doble clik sobre un item o para agregar un nuevo item
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-first-order-alt"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <label.Entidad id="Categoria" size={[12, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};

namespace EK.Modules.SCV.Pages.TipoMovimiento {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("TipoMovimiento", "scv");
    let PAGE_ID = "Tipo de Movimiento"; 

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {

            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("Naturaleza")
                .addBoolean("Cancelar")
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
        //render para mostrar campos a editar al dar doble clik sobre un item o para agreagar un nuevo item
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-align-center fa-3x" collapsed={false} hideCollapseButton={true}>
                        <Row style={{ paddingBottom: 10 }}>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} />
                            <checkBox.Status size={[6, 2, 2, 2]} />

                            <NaturalezaDDL id="Naturaleza" size={[12, 12, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />
                            <checkBox.CheckBox id="Cancelar" size={[6, 2, 2, 2]} />

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
                        icon="fa fa-cog fa-3x fa-fw" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <label.Entidad id="Naturaleza" size={[12, 12, 4, 4]} />
                            <label.Boolean id="Cancelar" size={[6, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};

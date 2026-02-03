namespace EK.Modules.SCCO.Pages.TipoObra {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TipoObra", "scco");
    let PAGE_ID = "TipoObra";

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
            //guarda vista o form al terminar de editar
        };
        render(): JSX.Element {
            //render para mostrar campos al dar doble clik sobre un item o al agregar un nuevo registro
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
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-edit" collapsed={false} hideCollapseButton={true} level="main">
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50}  />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={150}  />
                            <checkBox.Status size={[12, 12, 2, 2]} required={true} />

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
                        icon="fas fa-life-ring" collapsed={false} hideCollapseButton={true} level="main">
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[2, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};



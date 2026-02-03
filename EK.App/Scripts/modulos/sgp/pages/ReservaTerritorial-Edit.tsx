namespace EK.Modules.SGP.Pages.ReservaTerritorial {
    "use strict";
    const config: page.IPageConfig= global.createPageConfig("ReservaTerritorial", "sgp");
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()    
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .addDescripcion()
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
                            id={config.id}
                            icon="fa fa-industry"
                            collapsed={false}
                            hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            <input.Descripcion size={[12, 12, 12, 12]} />
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
                        id={config.id}
                        subTitle={"Categoría de Proyectos"}
                        icon="fa fa-industry"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                            <label.Descripcion size={[12, 12, 12, 12]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    };
}
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.CaracteristicaAdicional {
    "use strict";
    const PAGE_ID: string = "caracteristicaAdicional";
    const PAGE_ID_NAME: string = "Características Adicionales";
    const PAGE_MODULO: string = "scv";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, PAGE_MODULO);

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("TipoCaracteristica")
                .addObject("TipoEntidad")
                .addBoolean("Escriturado")
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
                        subTitle={PAGE_ID_NAME}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={150} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                            <checkBox.CheckBox id="Escriturado" value={false} size={[12, 12, 2, 2]} />
                            <ddl.TipoCaracteristicaDDL id="TipoCaracteristica" size={[12, 12, 5, 5]} validations={[validations.required()]} />
                            <ddl.TiposEntidadesDDL id="TipoEntidad" size={[12, 12, 5, 5]} validations={[validations.required()]} />
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
                        subTitle={PAGE_ID_NAME}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            <label.Boolean id="Escriturado" size={[12, 12, 2, 2]} />
                            <label.Entidad id="TipoCaracteristica" size={[12, 12, 5, 5]} />
                            <label.Entidad id="TipoEntidad" size={[12, 12, 5, 5]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
}
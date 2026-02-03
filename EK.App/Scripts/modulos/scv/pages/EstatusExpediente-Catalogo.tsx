// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.EstatusExpediente {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("estatusExpediente", "scv");
    let ml: any = config.getML();
    let PAGE_ID = "Estatus Expediente";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {

            let model: any = item
                .addID()
                .addObject("Catalogo")
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();

            if (model.Catalogo !== null || model.Catalogo !== undefined) {
                let catalogo: any = {
                    ID: 0, Clave: config.id, Nombre: ""
                };
                model.Catalogo = catalogo;
            };

            config.dispatchEntityBase(model, "base/kontrol/CGValores/save", undefined, global.HttpMethod.PUT);

            return null;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            config.dispatchEntityBase({ id }, "base/kontrol/CGValores/id/", undefined, global.HttpMethod.POST);
        };
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onWillEntityLoad={this.onWillEntityLoad} onEntitySaved={this.onEntitySaved}>
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
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 8, 8]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
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
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
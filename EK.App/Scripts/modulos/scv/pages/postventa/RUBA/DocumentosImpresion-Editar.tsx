namespace EK.Modules.SCV.Pages.postventa.RUBA.DocumentosImpresion {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("DocumentosImpresion", "scv");
    let ml: any = config.getML();
    let PAGE_ID = "Documento Impresion";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addDescripcion()
                .addObject("ruta")
                .addObject("clave_origen")
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
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                           
                            <input.Clave maxLength={50} size={[12, 12, 2, 2]} />
                            <input.Descripcion size={[12, 12, 5, 5]} />
                            <checkBox.Status size={[12, 12, 3, 3]} />

                            <Input id={"ruta"} size={[12, 12, 5, 5]} />
 
                            
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
                            <label.Descripcion size={[12, 12, 5, 5]} />
                            <label.Estatus id="Estatus" size={[12, 12, 3, 3]} />
                            <Label id="ruta" size={[12, 12, 5, 5]} />

                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};



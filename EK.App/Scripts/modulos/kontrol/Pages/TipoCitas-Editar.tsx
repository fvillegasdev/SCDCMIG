namespace EK.Modules.Kontrol.Pages.TipoCitas {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("tipocitas", "kontrol");
    let PAGE_ID = config.id;
    PAGE_ID = PAGE_ID.toUpperCase();
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addString("Color")
                .addString("ColorText")
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
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-calendar-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50}/>
                            <input.Nombre size={[12, 12, 4, 4]} />
                            <ColorInput id={"Color"} size={[12, 12, 2, 2]} />
                            <ColorInput id={"ColorText"} size={[12, 12, 2, 2]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        </page.OptionSection>
                </Column>
            </page.Edit>
        };
    };
    const View: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let ColorFondo: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Color : "";
            let ColorText: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).ColorText : "";
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-calendar-o" collapsed={false} hideCollapseButton={true}>
                <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Label id={"Color"} valueStyle={{ backgroundColor: ColorFondo, color: ColorText }} size={[12, 12, 2, 2]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
               </Row>
                        </page.OptionSection>
                </Column>
            </page.View>
        };
    });

};
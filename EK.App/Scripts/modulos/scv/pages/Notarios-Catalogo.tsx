namespace EK.Modules.SCV.Pages.Notarios {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("notarios", "kontrol");
    let PAGE_ID = "Notario";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("NumNotaria")
                .addString("Direccion")
                .addNumber("Suplente")
                .addObject("Asentamiento")
                .addString("Telefono1")
                .addString("Telefono2")
                .addString("Email")
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
                <Column size={[12, 12, 12, 12]} style={{ paddingTop:8}}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 4, 4]} />
                            <input.Text id="NumNotaria" size={[12, 12, 2, 2]} />
                            <CheckBox id="Suplente" size={[6, 6, 2, 2]} label="Suplente"/>
                            <checkBox.Status size={[6, 6, 2, 2]} />
                            <input.Text id="Direccion" size={[12, 12, 6, 6]}/>
                            <select.Asentamientos size={[12, 12, 6, 6]} validations={[validations.required()]} />
                            <input.Telefono id="Telefono1" size={[12, 6, 3, 3]} validations={[validations.required()]} />
                            <input.Telefono id="Telefono2" size={[12, 6, 3, 3]} />    
                            <input.Text id="Email" size={[12, 6, 6, 6]} />
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
                        id="NotarioInformacion"
                        subTitle="Notario"
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12,12,2,2]}/>
                            <label.Nombre size={[12, 12, 4, 4]} />
                            <Label id="NumNotaria" size={[12, 12, 2, 2]} />
                            <label.Boolean id="Suplente" size={[6, 6, 2, 2]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                            <Label id="Direccion" size={[12, 12, 6, 6]} />
                            <label.Asentamiento size={[12, 12, 6, 6]} />
                            <label.Telefono id="Telefono1" size={[12, 6, 3, 3]} />
                            <label.Telefono id="Telefono2" size={[12,6, 3, 3]} />
                            <Label id="Email" size={[12, 6, 6, 6]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};

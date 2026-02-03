namespace EK.Modules.SCV.Pages.Sindicatos {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("sindicatos", "scv");
    let PAGE_ID = "Sindicatos";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addString("Clave")
                .addString("Nombre")
                .addEstatus("Estatus")
                .addString("Domicilio")
                .addObject("Localidad")
                .addString("Telefono")
                .addString("Telefono2")
                .addString("Celular")
                .addString("Fax")
                .addString("Email")
                .addString("Contacto")
               // .addNumber("IdAgente")
               // .addNumber("IdAgenteExterno")
                .addObject("Agente")
                .addObject("AgenteExterno")
                .addVersion()
                .toObject();

            //if (model.Agente) {
            //    // Se registra el ID del Usuario
            //    model.IdAgente = model.Agente.ID;
            //    model.Agente = undefined;
            //};

            //if (model.AgenteExterno) {
            //    // Se registra el ID del Usuario
            //    model.IdAgenteExterno = model.AgenteExterno.ID;
            //    model.AgenteExterno = undefined;
            //};
            debugger
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
                        icon="fas fa-campground" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            <Input id="Domicilio" size={[12, 6, 6, 6]} validations={[validations.required()]} />
                            <select.Asentamientos id="Localidad" size={[12, 6, 6, 6]} validations={[validations.required()]} />
                            <input.Telefono id="Telefono" size={[12, 6, 2, 2]} validations={[validations.required(), validations.length("", 10)]} />
                            <input.Telefono id="Telefono2" size={[12, 6, 2, 2]} validations={[validations.length("", 10)]} />
                            <input.Telefono id="Celular" size={[12, 6, 2, 2]} validations={[validations.required(), validations.length("", 10)]} />
                            <Input id="Fax" size={[12, 2, 2, 2]}/>
                            <Input id="Email" size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <Input id="Contacto" size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <select.Agente size={[12, 4, 4, 4]} validations={[validations.required()]} />
                            <select.Agente id="AgenteExterno" size={[12, 4, 4, 4]} validations={[validations.required()]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-campground" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre  size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <Label id="Domicilio" size={[12, 6, 6, 6]} />
                            <label.Localidad id={"Localidad"} size={[12, 6, 6, 6]} />
                            <label.Telefono id="Telefono" size={[12, 6, 2, 2]} />
                            <label.Telefono id="Telefono2" size={[12, 6, 2, 2]} />
                            <label.Telefono id="Celular" size={[12, 6, 2, 2]} />
                            <Label id="Fax" size={[12, 6, 2, 2]} />
                            <Label id="Email" size={[12, 4, 4, 4]} />
                            <Label id="Contacto" size={[12, 4, 4, 4]}/>
                            <label.Usuarios id="Agente" size={[12, 4, 4, 4]} />
                            <label.Usuarios id="AgenteExterno" size={[12, 4, 4, 4]} />

                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};

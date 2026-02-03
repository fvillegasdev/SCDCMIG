namespace EK.Modules.SCP.Pages.ProveedoresActasConstitutivas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("ActaConstitutiva", "kontrol");
    let ml: any = config.getML();
    let subTitulo: string = "ITipo de Proveedor"
    
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addNumber("VolumenActa")
                .addString("NombreNotario")
                .addNumber("NumNotario")
                .addDate("FechaActa")
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
                        id={config.id}
                        subTitle={subTitulo}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <input.Integer id={"VolumenActa"} size={[4, 4, 4, 4]} />
                            <input.Text id={"NombreNotario"} size={[4, 4, 4, 4]} />
                            <input.Integer id={"NumNotario"} size={[4, 4, 4, 4]} />
                            <input.Date id={"FechaActa"} size={[4, 4, 4, 4]} />
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
                        subTitle={subTitulo}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 4, 4]} />
                            <label.Label id={"FechaActa"} size={[12, 12, 4, 4]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <label.Label id={"VolumenActa"} size={[4, 4, 4, 4]} />
                            <label.Label id={"NombreNotario"} size={[4, 4, 4, 4]} />
                            <label.Label id={"NumNotario"} size={[4, 4, 4, 4]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};



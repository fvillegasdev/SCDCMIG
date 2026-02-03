namespace EK.Modules.SCV.Pages.Impuestos {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("Impuestos", "scv");
    let PAGE_ID = "Impuestos"; 

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {

            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addNumber("Porcentaje")
                .addBoolean("RetImp")
                .addObject("TipoImpuesto")
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
                            <input.Clave size={[12, 3, 3, 3]} maxLength={50} />
                            <input.Nombre size={[12, 6, 6, 6]} maxLength={150} />
                            <checkBox.CheckBox id="RetImp" size={[6, 2, 2, 2]} />
                            <checkBox.Status size={[6, 1, 1, 1]} />
                            
                            <OpcionesTipoImpuestoDDL id="TipoImpuesto" size={[6, 3, 3, 3]} validations={[validations.required()]} />
                            <input.Porcentaje id="Porcentaje" size={[6, 3, 3, 3]} validations={[validations.required()]} />
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
                        icon="fas fa-ring fa-3x fa-fw" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 3, 3, 3]} />
                            <label.Nombre size={[12, 6, 6, 6]} />
                            <label.Boolean id="RetImp" size={[6, 2, 2, 2]} />
                            <label.Estatus size={[6, 1, 1, 1]} />

                            <label.Entidad id="TipoImpuesto" size={[6, 3, 3, 3]}/>
                            <label.Decimal id="Porcentaje" size={[6, 3, 3, 3]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};

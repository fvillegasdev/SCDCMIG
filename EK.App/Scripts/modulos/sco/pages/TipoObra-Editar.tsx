//namespace EK.Modules.SCCO.Pages.TipoObra {
//    "use strict";

//    const config: page.IPageConfig = global.createPageConfig("TipoObra", "scco");
//    let ml: any = config.getML();
//    let PAGE_ID = "Tipo Obra";
//    export class Ediciones extends page.Base {
//        saveForm(props: page.IProps, item: EditForm): any {
//            let model: any = item
//                .addID()
//                .addClave()
//                .addBoolean("activo")
//                .addEstatus()
//                .addVersion()
//                .toObject();
//            return model;
//        };
//        render(): JSX.Element {
//            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
//                <View />
//                <Edit />
//            </page.Main>;
//        };
//    };
//    class Edit extends page.Base {
//        render(): JSX.Element {
//            return <page.Edit>
//                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
//                    <page.OptionSection
//                        id={PAGE_ID}
//                        subTitle={PAGE_ID}
//                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
//                        <Row>
//                            <input.Clave size={[12, 12, 3, 3]} maxLength={50} />
//                            <input.Descripcion size={[12, 12, 3, 3]} validations={[validations.required()]} />
//                            <Input id={"Siglas"} size={[12, 12, 3, 3]} />
//                            <checkBox.Status size={[12, 12, 3, 3]} />

//                            <UsoFallaDDL id="UsoFalla" size={[12, 12, 3, 3]} />
//                            <input.Integer id="DuracionGarantia" size={[12, 12, 3, 3]} />
//                            <checkBox.CheckBox id={"activo"} size={[12, 12, 3, 3]} />

//                        </Row>
//                    </page.OptionSection>
//                </Column>
//            </page.Edit>;
//        };
//    };
//    class View extends page.Base {
//        render(): JSX.Element {
//            return <page.View>
//                <Column size={[12, 12, 12, 12]}>
//                    <page.OptionSection
//                        id={PAGE_ID}
//                        subTitle={PAGE_ID}
//                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
//                        <Row>
//                            <label.Clave size={[12, 12, 3, 3]} />
//                            <label.Descripcion size={[12, 12, 3, 3]} />
//                            <Label id="Siglas" size={[12, 12, 3, 3]} />
//                            <label.Estatus id="Estatus" size={[12, 12, 3, 3]} />
//                            <label.Estatus id="activo" size={[12, 12, 3, 3]} />

//                        </Row>
//                    </page.OptionSection>
//                </Column>
//            </page.View>;
//        };
//    };
//};



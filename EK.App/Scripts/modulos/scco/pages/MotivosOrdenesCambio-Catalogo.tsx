namespace EK.Modules.SCCO.Pages.MotivosOrdenesCambio {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("MotivosOrdenesCambio", "scco");
    let ml: any = config.getML();
    
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .addObject("TipoOrdenCambio")
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
                        subTitle="Motivos Ordenes Cambio"
                        icon="fa fa-pencil-square-o"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <TipoOrdenesCambioDDL id="TipoOrdenCambio" size={[12, 12, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />                            
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
                        subTitle="Motivos Ordenes Cambio"
                        icon="fa fa-info-circle"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <label.Entidad id="TipoOrdenCambio" size={[12, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};



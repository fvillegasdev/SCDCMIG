namespace EK.Modules.Kontrol.Pages.PullNotificationsActions {
    "use strict";
    const PAGE_TITLE: string = "Acciones para notificaciones";
    let PAGE_ID = "PullNotificationsActions";

    const config: page.IPageConfig = global.createPageConfig("PullNotificationsActions", "kontrol");


    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("Entidad")
                .addString("RutaEnlace")
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
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fab fa-think-peaks" title={PAGE_TITLE} collapsed={false} hideCollapseButton={true}>
                            <input.Clave size={[12, 12, 4, 4]} maxLength={40}  />
                            <input.Nombre size={[12, 12, 4, 4]} />
                            <checkBox.Status id={"Estatus"} size={[4, 4, 4, 4]} />
                            <ddl.PullNotificationsEntitiesDDL id={"Entidad"} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                            <Input id={"RutaEnlace"} size={[12, 12, 6, 6]} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    };

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fab fa-think-peaks" title={PAGE_TITLE} collapsed={false} hideCollapseButton={true}>
                            <label.Clave size={[12, 12, 4, 4]} />
                            <label.Nombre size={[12, 12, 4, 4]} />
                            <label.Estatus id={"Estatus"} size={[4, 4, 4, 4]} />
                            <label.Entidad id={"Entidad"} size={[12, 12, 6, 6]} />
                            <label.Label id={"RutaEnlace"} size={[12, 12, 6, 6]} /> 
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        };
    };
}
namespace EK.Modules.SGP.Pages.TipoProyecto {
    "use strict";
    export let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("TipoProyectoSGP", "sgp"),
        icon: "fa fa-industry",
        url: "#/sgp/TipoProyecto",
        propForm: "TipoProyecto",
        ddlTargetUrl: global.encodeAllURL("sgp", "TipoProyectoSGP", { activos: 1 })
    }, true, true);
    //
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        render(): JSX.Element {
            return <page.Main {...defaultProps.config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
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
                        id={defaultProps.config.id}
                        subTitle={"Tipo de Proyecto"}
                        icon="fa fa-industry"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
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
                        id={defaultProps.config.id}
                        subTitle={"Tipo de Proyectos"}
                        icon="fa fa-industry"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    };
};
namespace EK.Modules.SCV.Pages.Empresas {
    "use strict";
    export let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("empresas", "scv"),
        icon: "fa fa-industry",
        url: "#/scv/referenciaslaborales",
        propForm: "Empresa",
        ddlTargetUrl: global.encodeAllURL("scv", "empresas", { activos: 1 })
    }, true, true);
    //
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addString("RFC")
                .addString("NRP")
                .addString("Domicilio")
                .addObject("Localidad")
                .addNumber("CodigoPostal")
                .addString("Telefono")
                .addString("Extension")
                .addString("TitularRH")
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
                        subTitle={"Referencia Laboral"}
                        icon="fa fa-industry"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            <Input id="Domicilio" size={[12, 6, 6, 6]}  />
                            <select.Asentamientos id={"Localidad"} size={[12, 6, 6, 6]}  />
                            <input.RFC size={[12, 3, 3, 3]}  />
                            <Input id="NRP" size={[12, 3, 3, 3]} maxLength={14} />
                            <input.Telefono size={[12, 3, 3, 3]} validations={[validations.required(), validations.length("", 10)]} />
                            <Input id="Extension" size={[12, 3, 3, 3]} />
                            <Input id="TitularRH" size={[12, 12, 12, 12]} />
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
                        subTitle={"Referencia Laboral"}
                        icon="fa fa-industry"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                            <Label id="Domicilio" size={[12, 6, 6, 6]} />
                            <label.Localidad id={"Localidad"} size={[12, 6, 6, 6]} />
                            <Label id="RFC" size={[12, 3, 3, 3]} />
                            <Label id="NRP" size={[12, 3, 3, 3]} />
                            <Label id="Telefono" size={[12, 3, 3, 3]} />
                            <Label id="Extension" size={[12, 3, 3, 3]} />
                            <Label id="TitularRH" size={[12, 12, 12, 12]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    };
    // Section Button ADD
    //export const SBEmpresa: () => any = (): any => {
    //    //key={"sb_"+defaultProps.config.id} 
    //    return <buttons.SpecialAddButton {...defaultProps} />
    //};

    //// DDL 
    //export const DDLEmpresa: (props?: any) => any = (props?: any): any => {
    //    let p: any = global.assign(defaultProps, props, { key: "ddl_" + defaultProps.config.id });
    //    //
    //    return global.createComponent(BaseDDL, p, (s) => ({ items: s.global.SCV_EMPRESAS }));
    //};
    ////

    //
    
};
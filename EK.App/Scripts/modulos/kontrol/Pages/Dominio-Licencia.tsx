namespace EK.Modules.Kontrol.Pages.Dominios {
    "use strict";
    
    const NEWLICENSE: string = "Dominios$NewLicense";
    const LICENSES: string = "Dominios$Licenses";
    const config: page.IPageConfig = global.createPageConfig("DominiosLicencia", "kontrol", [LICENSES], "dominios");

    export class Licencias extends page.Base {

        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addDate("VigenciaInicio")
                .addDate("VigenciaFinal")
                .addBoolean("Bloqueado")
                .addObject("Imagen")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            config.dispatchEntityBase({ id }, "base/kontrol/dominios/id/", undefined, global.HttpMethod.POST);
        };
        onEntityLoaded(props: page.IProps): void {
            let entidad: any = global.getData(props.entidad);
            //
            config.dispatchCatalogoBase("base/Kontrol/Dominios/GetBP/GetLicenseInfo/", { idDominio: entidad.ID }, LICENSES);
            //props.config.updateForm();
            //config.setState({ viewMode: false });
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onWillEntityLoad={this.onWillEntityLoad} onEntityLoaded={this.onEntityLoaded}>
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
                        id={config.id}
                        subTitle={config.id}
                        icon="fas fa-building" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                            <label.Boolean id="Bloqueado" size={[12, 12, 2, 2]} />
                            <label.Fecha id="VigenciaInicio" size={[6, 6, 6, 6]} />
                            <label.Fecha id="VigenciaFinal" size={[6, 6, 6, 6]} />
                            <Column>  
                                <page.OptionSection
                                    id={NEWLICENSE}
                                    title="Capturar nueva licencia"
                                    icon="fas fa-passport" collapsed={true} hideCollapseButton={false}>
                                    <Row>
                                        <input.Text id="Key1" size={[12, 12, 12, 12]} />
                                        <input.Text id="Key2" size={[12, 12, 12, 12]} />
                                        <input.Text id="Key3" size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML("licencias.grid");
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            //
            dtConfig.columns
                .addClave({ width: "250px" })
                .add({ data: "Entidad.Clave", width: "200px" })
                .add({ data: "Entidad.Nombre", width: "400px" })
                .add({ data: "HashLicencia", width: "400px" })
                .add({ data: "Tipo.Nombre", width: "100px" })
                .add({ data: "Estatus.Nombre", width: "100px" })
                .toArray();
            dtConfig.groups
                .add({ data: "Tipo.Nombre" })
                .add({ data: "Estatus.Nombre" })
                .toArray();

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={config.id}
                        icon="fas fa-building" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                            <label.Boolean id="Bloqueado" size={[12, 12, 2, 2]} />
                            <label.Fecha id="VigenciaInicio" size={[6, 6, 6, 6]} />
                            <label.Fecha id="VigenciaFinal" size={[6, 6, 6, 6]} />
                        </Row>
                        <Row>
                            <page.SectionListExtended
                                id={LICENSES}
                                title="Licencias disponibles"
                                icon="fa fa-table"
                                level={1}
                                dtConfig={dtConfig}
                                size={[12, 12, 12, 12]}>
                            </page.SectionListExtended>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
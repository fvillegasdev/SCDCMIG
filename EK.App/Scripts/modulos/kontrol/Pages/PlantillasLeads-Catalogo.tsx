namespace EK.Modules.Kontrol.Pages.PlantillasLeads {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("PlantillasLeads", "kontrol");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addDescripcion()
                .addString("Plantilla")
                .addObject("TipoPlantilla")
                .addObject("UUID")
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
    const Edit: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let displayFile: boolean = false;
            let displayCode: boolean = false;

            let tipoPlantilla: any = Forms.getValue("TipoPlantilla", config.id);
            if (tipoPlantilla) {
                if (tipoPlantilla.Clave === "HTMLF" || tipoPlantilla.Clave === "WORDF") {
                    displayFile = true;
                }
                else if (tipoPlantilla.Clave === "HTMLE") {
                    displayCode = true;
                };
            };

            return <page.Edit>
                <page.OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                    <Row>
                        <input.Clave size={[12, 4, 4, 4]} />
                        <input.Nombre  size={[12, 6, 6, 6]} />
                        <checkBox.Status size={[12, 2, 2, 2]} />
                        <ddl.TipoPlantillaDDL size={[12, 4, 4, 4]} />
                        <label.Custom id="UUID" size={[12, 4, 4, 4]} />
                        {displayFile === true ? <Column size={[12, 12, 12, 12]} style={{ marginTop: 15 }}>
                            <KontrolFileManager modulo={config.id} viewMode={false} multiple={false} />
                        </Column> : null}
                        {displayCode === true ? <Column style={{ marginTop: 20 }}>
                            <page.OptionSection id="Plantilla" level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <input.RichText id="Plantilla" />
                                </Row>
                            </page.OptionSection>
                        </Column> : null}
                    </Row>
                </page.OptionSection>
            </page.Edit>;
        };
    });

    const View: any = page.connect(class extends page.Base {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        render(): JSX.Element {
            let displayFile: boolean = false;
            let displayCode: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                let tipoPlantilla: any = global.getData(this.props.entidad).TipoPlantilla;
                if (tipoPlantilla) {
                    if (tipoPlantilla.Clave === "HTMLF" || tipoPlantilla.Clave === "WORDF") {
                        displayFile = true;
                    }
                    else if (tipoPlantilla.Clave === "HTMLE") {
                        displayCode = true;
                    };
                };
            };

            return <page.View>
                <page.OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                    <Row style={{ wordWrap: "break-word" }}>
                        <label.Clave size={[12, 2, 2, 2]} />
                        <label.Nombre size={[12, 6, 6, 6]} />
                        <label.Estatus size={[12, 2, 2, 2]} />
                        <label.Entidad id="TipoPlantilla" size={[12, 4, 4, 4]} />
                        <label.Custom id="UUID" size={[12,4,4,4]} />
                        {displayFile === true ? <Column size={[12, 12, 12, 12]} style={{ marginTop: 15 }}>
                            <KontrolFileManager modulo={config.id} viewMode={true} multiple={false} />
                        </Column> : null}
                        {displayCode === true ? <Column style={{ marginTop: 20 }}>
                            <page.OptionSection id="Plantilla" level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <label.HTML id="Plantilla" />
                                </Row>
                            </page.OptionSection>
                        </Column> : null}
                    </Row>
                </page.OptionSection>
            </page.View>;
        };
    });
};
namespace EK.Modules.SCV.Pages.SCVDocumentosExpediente {
    "use strict";
    //const config: page.IPageConfig = global.createPageConfig("documentosExpediente", "scv");
    export let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("documentosExpediente", "scv"),
        icon: "far fa-file-alt",
        url: "#/scv/documentosExpediente",
        propForm: "Documento",
        ddlTargetUrl: "base/scv/documentosExpediente/all/" + global.encodeParameters({ activos: 1 }),
        itemFormatter: (item, container): any => {
            if (!item.id) {
                return $(item.text);
            }
            else {
                return $([
                    "<span class='badge badge-success bold' style='margin-right: 10px'>", item.Clave, "</span>",
                    "<span class='' style='font-size: 11px'>", item.Nombre, "</span> ",
                    item.TipoDocumento && item.TipoDocumento.Nombre ? "<span class='bold' style='font-size: 10px'> (" + item.TipoDocumento.Nombre + ")</span> " : ""
                ].join(""));
            };
        },
        selectionFormatter: (item): any => {
            if (!item) return "";
            if (!item.id || item.id === "" || isNaN(item.id) || !item.Clave) {
                return $([
                    "<span class='badge badge-primary bold' style='margin-right: 10px'>", item.Clave, "</span>",
                    "<span class='' style='font-size: 11px'>", item.text, "</span> ",
                    item.TipoDocumento && item.TipoDocumento.Nombre ? "<span class='bold' style='font-size: 10px'> (" + item.TipoDocumento.Nombre + ")</span> " : ""
                ].join(""));
            };
            return $([
                "<span class='badge badge-primary bold' style='margin-right: 10px'>", item.Clave, "</span>",
                "<span class='' style='font-size: 11px'>", item.Nombre, "</span> ",
                item.TipoDocumento && item.TipoDocumento.Nombre ? "<span class='bold' style='font-size: 10px'> (" + item.TipoDocumento.Nombre + ")</span> " : ""
            ].join(""));
        }
    }, true, true);

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("NumeroCopias")
                .addObject("TipoDocumento")
                .addObject("Plantilla")
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
    }

    const Edit: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let displayPlantilla: boolean = false;
            let displayFormato: boolean = false;
            let tipoDocumento: any = Forms.getValue("TipoDocumento", defaultProps.config.id);

            if (tipoDocumento) {
                if (tipoDocumento.Clave === "AUTO") {
                    displayPlantilla = true;
                }
                else if (tipoDocumento.Clave === "FORMATO") {
                    displayFormato = true;
                }
            }

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={defaultProps.config.id}
                            subTitle={"Documentos de Expediente"}
                            icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                                <input.Nombre size={[12, 12, 8, 8]} maxLength={150} validations={[validations.required()]} />
                                <checkBox.Status size={[12, 12, 2, 2]} />
                                <input.Integer id="NumeroCopias" size={[12, 12, 2, 2]} />
                                <ddl.TiposDocumentosExpedienteDDL size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                                {displayPlantilla === true ? <ddl.PlantillasDDL size={[12, 12, 6, 6]} /> : null}
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
                {displayFormato === true ? <KontrolFileManager modulo={defaultProps.config.id} viewMode={false} multiple={false} /> : null}
            </page.Edit>
        };
    });

    const View: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let displayPlantilla: boolean = false;
            let displayFormato: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                let tipoDocumento: any = global.getData(this.props.entidad).TipoDocumento;
                if (tipoDocumento) {
                    if (tipoDocumento.Clave === "AUTO") {
                        displayPlantilla = true;
                    }
                    else if (tipoDocumento.Clave === "FORMATO") {
                        displayFormato = true;
                    }
                }
            }

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={defaultProps.config.id}
                            subTitle={"Documentos de Expediente"}
                            icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <label.Clave size={[12, 12, 2, 2]} />
                                <label.Nombre size={[12, 12, 8, 8]} />
                                <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                                <Label id="NumeroCopias" size={[12, 12, 2, 2]} />
                                <label.Entidad id="TipoDocumento" size={[12, 12, 4, 4]} />
                                {displayPlantilla === true ? <label.Entidad id="Plantilla" size={[12, 12, 6, 6]} /> : null}
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
                {displayFormato === true ? <KontrolFileManager modulo={defaultProps.config.id} viewMode={true} /> : null}
            </page.View>
        }
    });
}
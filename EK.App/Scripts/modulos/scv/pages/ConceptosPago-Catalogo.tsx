namespace EK.Modules.SCV.Pages.SCVConceptosPago {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("conceptosPago", "scv");
    let PAGE_ID = "Conceptos de Pago";
    //interface IConceptosPagoProps extends page.IProps {
    //    tipoConcepto?: any;
    //};
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("TipoConceptoPago")
                .addNumber("IdTipoMovimiento_Capital")
                .addNumber("IdTipoMovimiento_Interes")
                .addNumber("IdTipoMovimiento_Moratorio")
                .addNumber("IdTipoMovimiento_Capital_Cancelacion")
                .addNumber("IdTipoMovimiento_Interes_Cancelacion")
                .addNumber("IdTipoMovimiento_PagoAnticipo")
                .addNumber("IdTipoMovimiento_TraspasoCredito")
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
    }

     const Edit: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let $page: any = config.getML();
            let tipoConcepto: any = Forms.getValue("TipoConceptoPago", config.id);
            let tipoCP: boolean = tipoConcepto && tipoConcepto.Clave === "MC";
            
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ panddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[2, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[8, 8, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[2, 2, 2, 2]} />
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <OptionSection title={$page.form.section.general.title}
                                    level="2"
                                    icon="fal fa-info"
                                    collapsed={false}
                                    readOnly={false}>
                                    <Row>
                                        <ddl.TiposConceptoPagoDDL
                                            id="TipoConceptoPago"
                                            label={$page.form.section.general.form.TipoConceptoPago.label}
                                            helpLabel={$page.form.section.general.form.TipoConceptoPago.helplabel}
                                            validations={[validations.required()]} />
                                    </Row>
                                </OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <OptionSection title={$page.form.section.tiposMovimiento.title}
                                    collapsed={false}
                                    level="2"
                                    icon="far fa-file-contract"
                                    readOnly={false}>
                                    <Row>
                                        <input.Text id="IdTipoMovimiento_Capital" label={$page.form.section.tiposMovimiento.form.Capital.label} size={[6, 6, 6, 6]} validations={[validations.required()]} />
                                        <input.Text id="IdTipoMovimiento_Capital_Cancelacion" label={$page.form.section.tiposMovimiento.form.CapitalCancelacion.label} size={[6, 6, 6, 6]} validations={[validations.required()]} />

                                    </Row>
                                    <Row>
                                        <input.Text id="IdTipoMovimiento_PagoAnticipo" label={$page.form.section.tiposMovimiento.form.PagoAnticipo.label} size={[6, 6, 6, 6]} />
                                        <input.Text id="IdTipoMovimiento_Moratorio" label={$page.form.section.tiposMovimiento.form.Moratorio.label} size={[6, 6, 6, 6]} validations={[validations.required()]} />
                                    </Row>
                                    <Row>
                                        <input.Text id="IdTipoMovimiento_Interes" label={$page.form.section.tiposMovimiento.form.Interes.label} size={[6, 6, 6, 6]} validations={[validations.required()]} />
                                        <input.Text id="IdTipoMovimiento_Interes_Cancelacion" label={$page.form.section.tiposMovimiento.form.InteresCancelacion.label} size={[6, 6, 6, 6]} />
                                    </Row>
                                    {tipoCP ?
                                        <Row>
                                            <input.Text id="IdTipoMovimiento_TraspasoCredito" label={$page.form.section.tiposMovimiento.form.TraspasoCredito.label} size={[6, 6, 6, 6]} validations={[validations.required()]} />
                                        </Row>
                                        : null
                                    }
                                </OptionSection>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

     const View: any = page.connect(class extends page.Base {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
        })
        render(): JSX.Element {
            let $page: any = config.getML();
            let tipoCP: boolean = false;
            if (global.isSuccessful(this.props.entidad)) {
                let tipoConcepto: any = global.getData(this.props.entidad).TipoConceptoPago;
                if (tipoConcepto) {
                    if (tipoConcepto.Clave === "MC") {
                        tipoCP = true;
                    }
                };
            };
            return <page.View>

                <Column size={[12, 12, 12, 12]} style={{ panddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <OptionSection
                                    title={$page.form.section.general.title}
                                    collapsed={false}
                                    level="2"
                                    icon="fal fa-info"
                                    readOnly={false}>
                                    <Row>
                                        <label.Entidad id="TipoConceptoPago" label={$page.form.section.general.form.TipoConceptoPago.label} size={[12, 12, 12, 12]} />
                                    </Row>
                                </OptionSection>
                            </Column>

                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <OptionSection
                                    level="2"
                                    icon="far fa-file-contract"
                                    title={$page.form.section.tiposMovimiento.title} collapsed={false} readOnly={false}>
                                    <Row>
                                        <Label id="IdTipoMovimiento_Capital" label={$page.form.section.tiposMovimiento.form.Capital.label} size={[12, 12, 12, 6]} />
                                        <Label id="IdTipoMovimiento_Capital_Cancelacion" label={$page.form.section.tiposMovimiento.form.CapitalCancelacion.label} size={[12, 12, 12, 6]} />

                                    </Row>
                                    <Row>
                                        <Label id="IdTipoMovimiento_PagoAnticipo" label={$page.form.section.tiposMovimiento.form.PagoAnticipo.label} size={[12, 12, 12, 6]} />
                                        <Label id="IdTipoMovimiento_Moratorio" label={$page.form.section.tiposMovimiento.form.Moratorio.label} size={[12, 12, 12, 6]} />
                                    </Row>
                                    <Row>
                                        <Label id="IdTipoMovimiento_Interes" label={$page.form.section.tiposMovimiento.form.Interes.label} size={[12, 12, 12, 6]} />
                                        <Label id="IdTipoMovimiento_Interes_Cancelacion" label={$page.form.section.tiposMovimiento.form.InteresCancelacion.label} size={[12, 12, 12, 6]} />
                                    </Row>
                                    {tipoCP ?
                                        <Row>
                                            <Label id="IdTipoMovimiento_TraspasoCredito" label={$page.form.section.tiposMovimiento.form.TraspasoCredito.label} size={[12, 12, 12, 6]} />
                                        </Row>
                                        : null
                                    }
                                </OptionSection>
                            </Column>


                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
     });
}
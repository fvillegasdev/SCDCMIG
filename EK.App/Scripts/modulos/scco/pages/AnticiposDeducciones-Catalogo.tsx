namespace EK.Modules.SCCO.Pages.AnticiposDeducciones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("AnticiposDeducciones", "scco");
    let PAGE_ID = "AnticiposDeducciones";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("TipoConcepto")
                .addObject("Insumo")
                .addObject("TipoMovimiento")
                .addBoolean("AfectaFacturacion")
                .addBoolean("AfectaOc")
                .addBoolean("AplicaIva")
                .addEstatus("Estatus")
                .addNumber("PorcentajeDefault")
                .addVersion()
                .toObject()
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
            let timeStamp = Number(new Date()).toString();
            let insumo: any = global.getData(this.props.entidad);

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection id={PAGE_ID} subTitle={PAGE_ID} icon="fa fa-boxes fa-3x" collapsed={false} hideCollapseButton={true} level="main">
                        <Column size={[12, 12, 12, 12]}>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <SCCOTiposConceptoDDL size={[12, 12, 4, 5]} validations={[validations.required()]} />
                            <ddl.SCCOInsumosDDL clasificacion="INSUMO" size={[12, 12, 4, 5]} />
                            <input.Nombre size={[12, 12, 10, 10]} maxLength={150} />
                            <checkBox.Status id="Estatus" size={[12, 12, 2, 2]} />
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                            <page.OptionSection
                                id="CondicionAdministrativa" icon="fas fa-chalkboard" title="Condiciones Administrativas"
                                level={1} collapsed={false} hideCollapseButton={false}>
                                <ddl.TipoMovimientoProveedorDDL id="TipoMovimiento" size={[12, 12, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />
                                <input.Porcentaje id="PorcentajeDefault" label="Default %" size={[12, 12, 2, 2]} />                                
                                <checkBox.CheckBox id="AfectaFacturacion" size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                                <checkBox.CheckBox id="AfectaOc" size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />
                                <checkBox.CheckBox id="AplicaIva" size={[12, 12, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />                                
                            </page.OptionSection>
                        </Column>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection id={PAGE_ID} subTitle={PAGE_ID} icon="fa fa-boxes fa-3x" collapsed={false} hideCollapseButton={true} level="main">
                        <Column size={[12, 12, 12, 12]}>
                            <label.Clave size={[12, 12, 2, 2]} />                            
                            <label.TipoConcepto id="TipoConcepto" size={[12, 12, 5, 5]} />
                            <label.Insumo id="Insumo" size={[12, 12, 5, 5]} />            

                            <label.Nombre size={[12, 12, 10, 10]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop:20 }}>
                            <page.OptionSection
                                id="CondicionAdministrativa" icon="fas fa-chalkboard" title="Condiciones Administrativas"
                                level={1} collapsed={false} hideCollapseButton={false}>
                                <label.Entidad id="TipoMovimiento" size={[12, 12, 4, 4]} />
                                <label.Decimal id="PorcentajeDefault" label="% Default" size={[12, 12, 2, 2]} />
                                <label.Boolean id="AfectaOc" size={[12, 12, 2, 2]} />
                                <label.Boolean id="AfectaFacturacion" size={[12, 12, 2, 2]} />
                                <label.Boolean id="AplicaIva" size={[12, 12, 2, 2]} />                                
                            </page.OptionSection>
                        </Column>
                    </page.OptionSection>
                </Column>
            </page.View>
        };
    };
};
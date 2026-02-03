namespace EK.Modules.SCV.Pages.ConceptosCredito {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("conceptosCredito", "scv");
    const PAGE_ID: string = "Conceptos de Crédito";
    export interface ITipoConceptoEnum {
        numero: string;
        texto: string;
        fecha: string;
        importe: string;
        lista: string;
    };
    ///
    export var TipoConceptoEnum: ITipoConceptoEnum = {
        numero: "NUM",
        fecha: "FEC",
        texto: "TEX",
        importe: "IMP",
        lista: "LIS"
    }
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("TipoConcepto")
                .addString("Valores")
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .addObject("Naturaleza")
                .toObject();

            return model;

        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} allowDelete={true} >
                <View />
                <Edit />
            </page.Main>;
        };
    };
    const Edit: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let tipoConcepto: any = Forms.getValue("TipoConcepto", config.id);
            let clave: string = tipoConcepto ? tipoConcepto.Clave : "";
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 25 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fad fa-stream" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 8, 8]} />
                            <checkBox.Status size={[6, 6, 2, 2]} />
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 12 }}>
                                 <page.OptionSection
                                    id={"tipoConcepto"} subTitle={"Tipo de Concepto"}
                                    collapsed={false} level={1}>
                                    <Row>
                                        <ddl.TiposConceptoCreditoDDL idFormSection={config.id} size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                                    </Row>
                                    <Row>
                                        
                                        {clave === TipoConceptoEnum.lista ?
                                            <BasicList
                                                size={[12, 12, 12, 12]}
                                                id={"Valores"}
                                                idForm={config.id}
                                                readOnly={false} /> : null
                                        }
                                    </Row>
                                 </page.OptionSection>
                                 
                            </Column>
                            
                            {clave === TipoConceptoEnum.importe ?
                                <NaturalezaCCDDL id="Naturaleza" size={[12, 12, 3, 3]} /> : null
                            }
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
            let tipoLista: boolean = false;
            let clave: string = "";
            if (global.isSuccessful(this.props.entidad)) {
                let tipoConcepto: any = global.getData(this.props.entidad).TipoConcepto;
                if (tipoConcepto) {
                    clave= tipoConcepto.Clave;
                    }
            };
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 25 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={PAGE_ID}
                        icon="fad fa-stream" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 12 }}>
                                <page.OptionSection
                                    id={"tipoConcepto"} subTitle={"Tipo de Concepto"}
                                    collapsed={false} level={1}>
                                    <Row>
                                        <label.Entidad id="TipoConcepto" size={[12, 12, 12, 12]} />
                                    </Row>
                                    <Row>
                                        
                                        {clave === TipoConceptoEnum.lista ?
                                            <BasicList
                                                size={[12, 12, 12, 12]}
                                                id={"Valores"}
                                                idForm={config.id}
                                                readOnly={true} /> : null
                                        }
                                    </Row>
                                </page.OptionSection>
                                
                            </Column>
                            {clave === TipoConceptoEnum.importe ?
                                <label.Entidad id="Naturaleza" size={[12, 12, 3, 3]} /> : null
                            }
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
   
}
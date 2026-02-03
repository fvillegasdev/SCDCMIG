namespace EK.Modules.SCV.Pages.postventa.Falla {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("Fallas", "scv", ["TiposFallas", "TiposInmuebles"]);
    //const config: page.IPageConfig = global.createPageConfig("Falla", "scv");
    let ml: any = config.getML();
    let PAGE_ID = "Catálogo de componentes";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addDescripcion()
                .addObject("Impacto")
                .addObject("TipoFalla")
                .addObject("TiposInmuebles")
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let falla: any = getData(props.entidad);
            let idTipoFalla: any = getDataID(props.entidad);

            if (idTipoFalla < 0) {
                //global.dispatchSuccessful("global-page-data", [], "TiposFallas");
                global.dispatchSuccessful("global-page-data", [], "TiposInmuebles");

            }
            else {
                //props.config.dispatchCatalogoBase("base/scv/TipoFalla/all/", { idTipoFalla }, "TipoFalla");
                //global.dispatchSuccessful("global-page-data", falla.TiposFallas, "TiposFallas");
                global.dispatchSuccessful("global-page-data", falla.TiposInmuebles, "TiposInmuebles");
            };



            //Forms.updateFormElement("TiposInmuebles", "Garantia", falla.TipoFalla.DuracionGarantia);
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded} >
                <View />
                <Edit />
            </page.Main>;
        };
    };

    class Edit extends page.Base {
        render(): JSX.Element {



            let fnValidateFalla = function (v: any, values?: any): boolean {
                if (v) {
                    let valorActual: number = Number(v);
                    //let porcentajeAnterior: number = Number(values.Porcentaje);
                    let tipoFalla: any = Forms.getValue("TipoFalla", config.id);
                    //let total: number = porcentajeActual - porcentajeAnterior;
                    let duracionGarantia: number = tipoFalla.DuracionGarantia;
                    //porcentaje.forEach((item: any, index: number) => {
                    //    total += item.Porcentaje;
                    //})
                    if (duracionGarantia < valorActual) {
                        EK.Global.errorMessage('La garantia no puede ser mayor a la Duracion de la garantia (' + duracionGarantia + ' días) del tipo de incidencia');

                        return false;
                    }
                }
                return true;
            }
            let $page: any = config.getML();
            let entidad: any = this.props.entidad;

            const listHeaderInmueble: JSX.Element =
                <div key="listHeaderInmueble" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">Ubicación</Column>
                        <Column size={[5, 5, 5, 5]} className="list-default-header">Garantía</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;



            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row style={{ marginTop: 20 }}>
                            <input.Clave size={[12, 12, 3, 3]} maxLength={50} />
                            <input.Descripcion size={[12, 12, 3, 6]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 3, 3]} />

                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <ddl.ImpactoDDL id="Impacto" label={$page.form.section.general.form.Impacto.label} helpLabel={$page.form.section.general.form.Impacto.helplabel} validations={[validations.required()]} size={[12, 12, 3, 3]} />
                            <ddl.TiposFallasDDL id="TipoFalla" label={$page.form.TipoFalla.label} helpLabel={$page.form.TipoFalla.helplabel} validations={[validations.required()]} size={[12, 12, 3, 3]} />
                            <page.SectionList
                                id="TiposInmuebles"
                                title={"Tipos de Ubicaciones"}
                                level={1}
                                parent={config.id}
                                icon="fa fa-table"
                                listHeader={listHeaderInmueble}
                                size={[6, 6, 6, 6]}
                                onAddNew={() => {
                                    let tipoFalla: any = Forms.getValue("TipoFalla", config.id);
                                    //let entidad: any = this.props.entidad;

                                    Forms.remove("TiposInmuebles");
                                    Forms.updateFormElement("TiposInmuebles", "Garantia", tipoFalla.DuracionGarantia);
                                    config.setState({ viewMode: false }, "TiposInmuebles");
                                }}
                                mapFormToEntity={(form: EditForm): any => {
                                    return form
                                        .addID()
                                        .addObject("TipoInmueble")
                                        .addObject("Garantia")
                                        .addVersion()
                                        .toObject();
                                }}

                                formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[6, 6, 6, 6]}><h6>{item.TipoInmueble.Nombre}</h6></Column>
                                        <Column size={[5, 5, 5, 5]}><h6>{item.Garantia}</h6></Column>
                                        <buttons.PopOver idParent={config.id} idForm="TiposInmuebles" info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Row>;
                                }}>
                                <Row>
                                    <ddl.TiposInmueblesDDL id="TipoInmueble" label={$page.form.TipoInmueble.label} idFormSection="TiposInmuebles" helpLabel={$page.form.TipoInmueble.helplabel} validations={[validations.required()]} size={[6, 6, 6, 6]} />

                                    <input.Integer size={[5, 5, 5, 5]} id="Garantia" label="Garantía" idFormSection="TiposInmuebles" validations={[validations.required(), validations.isNumber(), validations.custom("", "", ["Garantia"], fnValidateFalla)]} />

                                </Row>
                            </page.SectionList>
                        </Row>


                        <Row style={{ marginTop: 20 }}>

                            <KontrolLogBookManager modulo={config.id} viewMode={false} readOnly={false} />
                        </Row>



                    </page.OptionSection>
                </Column>

            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {


            const listHeaderInmueble: JSX.Element =
                <div key="listHeaderInmueble" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">Ubicación</Column>
                        <Column size={[5, 5, 5, 5]} className="list-default-header">Garantía</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;

            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>


                        <Row style={{ marginTop: 20 }}>

                            <label.Clave size={[12, 12, 6, 3]} />
                            <label.Descripcion size={[12, 12, 6, 6]} />
                            <label.Estatus id="Estatus" size={[12, 12, 6, 3]} />
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <label.Entidad id="Impacto" size={[12, 12, 6, 3]} />
                            <label.Entidad id="TipoFalla" size={[12, 12, 6, 3]} />
                      
                            <page.SectionList
                                id="TiposInmuebles"
                                title={"Tipos de Ubicaciones"}
                                icon="fa fa-table"
                                level={1}
                                parent={config.id}
                                size={[6, 6, 6, 6]}
                                listHeader={listHeaderInmueble}
                                readonly={false}
                                addRemoveButton={false}
                                formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[6, 6, 6, 6]}><h6>{item.TipoInmueble.Nombre}</h6></Column>
                                        <Column size={[5, 5, 5, 5]}><h6>{item.Garantia}</h6></Column>
                                        <Column size={[1, 1, 1, 1]} >&nbsp;</Column>
                                    </Row>;
                                }}>
                            </page.SectionList>
                        </Row>
                        <Row style={{ marginTop: 20 }}>


                            <KontrolLogBookManager modulo={config.id} viewMode={false} readOnly={false}/>
                        </Row>




                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };

};



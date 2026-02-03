namespace EK.Modules.SCV.Pages.postventa.ComponentesIncidencias {
    "use strict";

   
    //const config: page.IPageConfig = global.createPageConfig("Falla", "scv");
    let PAGE_ID = "Catálogo de componentes";
    const COMPONENTES_TIPOSINMUEBLES: string = "TiposInmuebles";

    const config: page.IPageConfig = global.createPageConfig("ComponentesIncidencias", "scv", [COMPONENTES_TIPOSINMUEBLES]);
    let ml: any = config.getML();


    const listHeaderInmueble: JSX.Element =
        <div key="listHeaderInmueble" >
            <Row>
                <Column size={[6, 6, 6, 4]} className="list-default-header">Ubicación</Column>
                <Column size={[5, 5, 5, 3]} className="list-default-header">Meses deGarantía</Column>
                <Column size={[5, 5, 5, 3]} className="list-default-header">Días Estimados Solución</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </div>;



    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addDescripcion()
                .addObject("Impacto")
                .addObject("TipoComponente")
                .addObject(COMPONENTES_TIPOSINMUEBLES)

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
                global.dispatchSuccessful("global-page-data", [], COMPONENTES_TIPOSINMUEBLES);

            }
            else {
                //props.config.dispatchCatalogoBase("base/scv/TipoFalla/all/", { idTipoFalla }, "TipoFalla");
                //global.dispatchSuccessful("global-page-data", falla.TiposFallas, "TiposFallas");
                global.dispatchSuccessful("global-page-data", falla.TiposInmuebles, COMPONENTES_TIPOSINMUEBLES);
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
                    let tipoFalla: any = Forms.getValue("TipoComponente", config.id);
                    //let total: number = porcentajeActual - porcentajeAnterior;
                    let duracionGarantia: number = tipoFalla.DuracionGarantia;
                    //porcentaje.forEach((item: any, index: number) => {
                    //    total += item.Porcentaje;
                    //})
                    if (duracionGarantia < valorActual) {
                        EK.Global.errorMessage('La garantia no puede ser mayor a la Duracion de la garantia (' + duracionGarantia + ' días) del tipo de componente');

                        return false;
                    }
                }
                return true;
            }
            let $page: any = config.getML();
            let entidad: any = this.props.entidad;

            

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row style={{ marginTop: 20 }}>
                            <input.Clave size={[12, 12, 3, 3]} maxLength={50} />
                            <input.Descripcion size={[12, 12, 3, 6]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 3, 3]} />

                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <ddl.ImpactoDDL id="Impacto" label={$page.form.section.general.form.Impacto.label} helpLabel={$page.form.section.general.form.Impacto.helplabel} validations={[validations.required()]} size={[12, 12, 3, 3]} />
                            <ddl.TipoComponentesDDL id="TipoComponente" label={$page.form.TipoComponente.label} helpLabel={$page.form.TipoComponente.helplabel} validations={[validations.required()]} size={[12, 12, 3, 3]} />
                            <page.SectionList
                                id={COMPONENTES_TIPOSINMUEBLES}
                                title={"Tipos de Ubicaciones"}
                                parent={config.id}
                                level={1}
                                
                                icon="fa fa-table"
                                listHeader={listHeaderInmueble}
                                size={[12, 12, 6, 6]}
                                onAddNew={() => {
                                    let tipoFalla: any = Forms.getValue("TipoComponente", config.id);
                                    //let entidad: any = this.props.entidad;

                                    Forms.remove(COMPONENTES_TIPOSINMUEBLES);
                                    Forms.updateFormElement(COMPONENTES_TIPOSINMUEBLES, "Garantia", tipoFalla.DuracionGarantia);


                                    config.setState({ viewMode: false }, COMPONENTES_TIPOSINMUEBLES);
                                }}
                                onSave={() => {

                                    let item: any= Forms.getValues(COMPONENTES_TIPOSINMUEBLES);
                                   
                                    let tipoUbicaciones: any[] = global.getData(Forms.getValue(COMPONENTES_TIPOSINMUEBLES, config.id), []);


                                    let invalid: boolean = false;

                                    tipoUbicaciones.forEach((value: any) => {
                                      
                                            if (item.ID !== value.ID) {
                                                if (item.TipoInmueble.ID === value.TipoInmueble.ID) {
                                                    if (value._eliminado !== true) {
                                                        //!(value.UbicacionFalla && value.UbicacionFalla.IdUbicacionFalla) ||

                                                        invalid = true;
                                                    }
                                                }
                                            }
                                        
                                    });

                                    if (invalid) {
                                        warning("Existen Inmuebles Repetidos.");
                                        return ;
                                    };



                                    let entidades: DataElement = Forms.getValue("TiposInmuebles", config.id);


                                    

                                    let retValue: DataElement = entidades.upsertItem(item);

                                    Forms.updateFormElement(config.id, COMPONENTES_TIPOSINMUEBLES, retValue);

                                    config.setState({ viewMode: true}, COMPONENTES_TIPOSINMUEBLES);
                                }}

                                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                    let retValue: any = form
                                        .addID()
                                        .addObject("TipoInmueble")
                                        .addObject("Garantia")
                                        .addObject("TiempoSolucion")
                                        .addVersion()
                                        .toObject();

                                    //let e: any[] = entidades;
                                    //if (e && e.length > 0) {
                                    //    e.forEach((value: any, index: number): any => {

                                    //        if (value.IdTipoInmueble === retValue.IdTipoInmueble) {
                                    //            //retValue.ID = value.ID;
                                    //            retValue._found = true;
                                    //        }
                                    //    });
                                    //};

                                    return retValue;
                                }}

                                formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[6, 6, 6, 4]}><h6>{item.TipoInmueble.Nombre}</h6></Column>
                                        <Column size={[5, 5, 5, 4]}><h6>{item.Garantia}</h6></Column>
                                        <Column size={[5, 5, 5, 3]}><h6>{item.TiempoSolucion}</h6></Column>
                                        <buttons.PopOver idParent={config.id} idForm={COMPONENTES_TIPOSINMUEBLES} info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Row>;
                                }}>
                                <Row>
                                    <ddl.TiposInmueblesDDL id="TipoInmueble" label={$page.form.TipoInmueble.label} idFormSection={COMPONENTES_TIPOSINMUEBLES} helpLabel={$page.form.TipoInmueble.helplabel} validations={[validations.required()]} size={[12, 12, 4, 4]} />

                                    <input.Integer size={[5, 5, 5, 4]} id="Garantia" label="Garantía(Meses)" idFormSection={COMPONENTES_TIPOSINMUEBLES} validations={[validations.required(), validations.isNumber(), validations.custom("", "", ["Garantia"], fnValidateFalla)]} />

                                    <input.Integer size={[5, 5, 5, 4]} id="TiempoSolucion" label="Dias Estimados" idFormSection={COMPONENTES_TIPOSINMUEBLES} validations={[validations.required(), validations.isNumber()]} />

                                </Row>
                            </page.SectionList>
                        </Row>


                    </page.OptionSection>
                </Column>

            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {


            //const listHeaderInmueble: JSX.Element =
            //    <div key="listHeaderInmueble" style={{ padding: "0px 10px" }}>
            //        <Row>
            //            <Column size={[6, 6, 6, 6]} className="list-default-header">Ubicación</Column>
            //            <Column size={[5, 5, 5, 5]} className="list-default-header">Garantía</Column>
            //            <Column size={[5, 5, 5, 5]} className="list-default-header">Tiempo Solucion</Column>
            //            <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            //        </Row>
            //    </div>;

            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>


                        <Row style={{ marginTop: 20 }}>

                            <label.Clave size={[12, 12, 6, 3]} />
                            <label.Descripcion size={[12, 12, 6, 6]} />
                            <label.Estatus id="Estatus" size={[12, 12, 6, 3]} />
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <label.Entidad id="Impacto" size={[12, 12, 6, 3]} />
                            <label.Entidad id="TipoComponente" size={[12, 12, 6, 3]} />


                            <page.SectionList
                                id={COMPONENTES_TIPOSINMUEBLES}
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
                                        <Column size={[6, 6, 6, 4]}><h6>{item.TipoInmueble.Nombre}</h6></Column>
                                        <Column size={[5, 5, 5, 4]}><h6>{item.Garantia}</h6></Column>
                                        <Column size={[5, 5, 5, 3]}><h6>{item.TiempoSolucion}</h6></Column>
                                        <Column size={[1, 1, 1, 1]} >&nbsp;</Column>
                                    </Row>;
                                }}>
                            </page.SectionList>
                        </Row>

                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };

};



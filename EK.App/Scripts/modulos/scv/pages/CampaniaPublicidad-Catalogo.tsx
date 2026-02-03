namespace EK.Modules.Kontrol.Pages.CampaniaPublicidad {
    "use strict";

    let PAGE_ID = "campaniasPublicidad";
    let SECTION_A_ID = "Campaña de Publicidad";
    let SECTION_B_ID = "Presupuesto de Campaña";
    let SECTION_C_ID = "Listas de Marketing";
    let LISTASMKT_ID = "ListaMarketing";

    const config: page.IPageConfig = global.createPageConfig("campaniasPublicidad", "scv", [LISTASMKT_ID]);

    let IdCampania = -1;


    interface IPageEditProps extends page.IProps {
        item?: any;
    };

    export const Edicion: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("MedioPublicidad")
                .addObject("EstadoCampania")
                .addObject("PropietarioC")
                .addDate("FechaInicial")
                .addDate("FechaFinal")
                .addVersion()
                .addObject("Moneda")
                .addString("CostoActual")
                .addString("CostoPresupuestado")
                .addString("IngresosEsperados")
                .addObject(LISTASMKT_ID)
                .toObject();
            return model;
        };

        onEntityLoaded(props: page.IProps): any {
            let campania: any = getData(props.entidad);
            IdCampania = getDataID(props.entidad);

            let parametros: any = global.assign({ Idcampaniapublicidad: IdCampania });


            if (IdCampania <= 0 || IdCampania === undefined) {
                global.dispatchSuccessful("global-page-data", [], LISTASMKT_ID);
            }
            else {
                props.config.dispatchCatalogoBase("base/scv/campaniasPublicidad/Get/GetListasMarketing/", parametros, LISTASMKT_ID);  
            };
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={SECTION_A_ID}
                        icon= "fas fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 4, 4]} maxLength={150} />
                            <input.Date id="FechaInicial" size={[12, 6, 2, 2]} validations={[validations.required(), validations.lessEqualThan("FechaFinal", "")]} />
                            <input.Date id="FechaFinal" size={[12, 6, 2, 2]} validations={[validations.required(), validations.greaterEqualThan("FechaInicial", "")]} />
                            <ddl.EstadoCampaniaDDL id="EstadoCampania" size={[12, 12, 2, 2]} validations={[validations.required()]} />
                            <ddl.MediosPublicidadDDL id="MedioPublicidad" size={[12, 12, 6, 6]} validations={[validations.required()]} />
                            <select.Usuarios id="PropietarioC" size={[12, 12, 6, 6]} validations={[validations.required()]}/>
                        </Row>
                        <Row style={{ paddingTop: 20 }}>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={SECTION_B_ID}
                                    icon="fas fa-hand-holding-usd" collapsed={false} hideCollapseButton={false} level={1}>
                                    <Row>
                                        <ddl.MonedasDDL id="Moneda" size={[12, 12, 3, 3]} validations={[validations.required()]} addNewItem={"SO"}  />
                                        <input.Currency id="CostoPresupuestado" size={[12, 12, 3, 3]} />
                                        <input.Currency id="CostoActual" size={[12, 12, 3, 3]} />
                                        <input.Currency id="IngresosEsperados" size={[12, 12, 3, 3]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <ListasMarketing />
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
                        id={PAGE_ID}
                        subTitle={SECTION_A_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 4, 4]} />
                            <label.Fecha id="FechaInicial" size={[12, 6, 2, 2]} />
                            <label.Fecha id="FechaFinal" size={[12, 6, 2, 2]} />
                            <label.Entidad id="EstadoCampania" size={[12, 12, 2, 2]} />
                            <label.Entidad id="MedioPublicidad" size={[12, 12, 6, 6]} />
                            <label.Usuarios id="PropietarioC" size={[12, 12, 6, 6]} />
 
                        </Row>
                        <Row style={{ paddingTop: 20 }}>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={SECTION_B_ID}
                                    icon="fas fa-hand-holding-usd" collapsed={false} hideCollapseButton={false} level={1}>
                                    <Row>
                                        <label.Entidad id="Moneda" size={[12, 12, 3, 3]} />
                                        <label.Currency id="CostoPresupuestado" size={[12, 12, 3, 3]} />
                                        <label.Currency id="CostoActual" size={[12, 12, 3, 3]} />
                                        <label.Currency id="IngresosEsperados" size={[12, 12, 3, 3]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <ListasMarketing />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View >;
        };
    };



    export let ListasMarketing: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={LISTASMKT_ID}
                parent={config.id}
                title={"Listas de Marketing"}
                level={1}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-th-list"
                size={[12, 12, 12, 12]}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[2, 2, 2, 1]} className="list-default-header">{"Clave"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Origen"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Total"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Frecuencia"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Fecha Programación"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Estado"}</Column>
                        </Row>
                    </div>}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addObject("ListasMkt")
                        .addDate("FechaProgramacion")
                        .addObject("Plantilla")
                        .addObject("FrecuenciaCampania")
                        .addObject("EstadoListaMkt")
                        .addEstatus()
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var claveListaMkt = item.ListasMkt != null || item.ListasMkt == "" ? " " + item.ListasMkt.Clave + " " : "";
                    var nombreListaMkt = item.ListasMkt != null || item.ListasMkt == "" ? " " + item.ListasMkt.Nombre + " " : "";
                    var origenListaMkt = item.ListasMkt != null || item.ListasMkt == "" ? item.ListasMkt.Origen.Nombre : "";
                    var totalListaMkt = item.ListasMkt != null || item.ListasMkt == "" ? item.ListasMkt.Alcance : "";
                    var frecuenciaCampania = item.FrecuenciaCampania != null || item.FrecuenciaCampania == "" ? item.FrecuenciaCampania.Nombre : "";
                    let fechaProgramacion: any = item.FechaProgramacion ? item.FechaProgramacion : "";
                    var clase = "";
                    var claseA = "";
                    var claseC = "";
                    var claseI = "";
                    var estadoA = "";
                    var estadoC = "";
                    var estadoI = "";
                    var estado = "";
                    if (item.EstadoListaMkt != undefined) {
                        claseA = item.EstadoListaMkt.Clave == "A" ? "badge badge-primary" : "";
                        claseC = item.EstadoListaMkt.Clave == "C" ? "badge badge-Secondary" : "";
                        claseI = item.EstadoListaMkt.Clave == "I" ? "badge badge-success" : "";
                        estadoA = item.EstadoListaMkt.Clave == "A" ? "ACTIVO" : "";
                        estadoC = item.EstadoListaMkt.Clave == "C" ? "COMPLETADO" : "";
                        estadoI = item.EstadoListaMkt.Clave == "I" ? "EN PROGRESO" : "";
                    }
                    if (claseA != "") { clase = claseA; estado = estadoA; }
                    else if (claseI != "") { clase = claseI; estado = estadoI; }
                    else { clase = claseC; estado = estadoC; }
                    return <Row>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <span className="badge badge-info">{claveListaMkt}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <span>{origenListaMkt} </span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <span>{nombreListaMkt}</span>
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">
                            <span>{totalListaMkt}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <span>{frecuenciaCampania}</span>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-default-header">
                            <span>{EK.UX.Labels.formatDate(fechaProgramacion)}</span>
                        </Column>
                        <Column size={[12, 2, 2, 1]} className="listItem-default-header">
                            {item.EstadoListaMkt != undefined ?
                                <span className={clase}>{estado}</span>
                            : 
                                <span className="badge badge-primary">{"ACTIVO"}</span>
                            }
                            
                        </Column>
                        {(!estadoEntidad && item.EstadoListaMkt != undefined) ?
                            ((item.EstadoListaMkt.Clave == "I" && item.Ejecutado != 0) || (item.EstadoListaMkt.Clave == "C" && item.Ejecutado != 0)) ? 
                            null :
                            <buttons.PopOver idParent={config.id} idForm={LISTASMKT_ID} info={item}
                                    extraData={[buttons.PopOver.edit, buttons.PopOver.remove]}
                                /> : null
                        }
                    </Row>;
                }}>
                <Column size={[12, 12, 12, 12]}>
                <Row>
                    <ddl.ListaMarketingDDL id="ListasMkt" idFormSection={LISTASMKT_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                    <DatePicker id="FechaProgramacion" type="datetime" idFormSection={LISTASMKT_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                </Row>
                <Row>
                    <ddl.FrecuenciaCampaniaDDL id="FrecuenciaCampania" idFormSection={LISTASMKT_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                    <ddl.PlantillasDDL id="Plantilla" idFormSection={LISTASMKT_ID} size={[12, 12, 6, 6]} Categoria="EM" validations={[validations.required()]} />
                </Row>
                </Column>
            </page.SectionList>
        };
    })
}
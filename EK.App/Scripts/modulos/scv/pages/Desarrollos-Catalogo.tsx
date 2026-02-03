namespace EK.Modules.SCV.Pages.Desarrollos {
    "use strict";
    let PAGE_ID = "Desarrollos";

    const scv_Desarrollos_Prototipos: string = "Prototipos";
    const scv_Desarrollos_Esquemas: string = "Esquemas";
    const scv_Desarrollos_Financiamientos: string = "Financiamientos";
    const scv_Desarrollos_CentrosCosto_Ingresos: string = "DesarrollosCCIngresos";
    const scv_Desarrollos_CentrosCosto_Construccion: string = "DesarrollosCCConstruccion";
    const scv_Desarrollos_TipoComercializacion: string = "TiposComercializacion";
    const scv_Desarrollos_FormatoClaveUbicacion: string = "FormatoClave";
    const scv_Desarrollos_MotivosCancelacion: string = "MotivosCancelacion";
    const scv_Desarrollos_ConceptosPago: string = "ConceptosPago";
    const scv_Desarrollos_GrupoFase: string = "RelacionFaseGrupo";

    const vistasMapa: string = "VistasMapa";


    const config: page.IPageConfig =
        global.createPageConfig("desarrollos", "scv", [
            scv_Desarrollos_Prototipos,
            scv_Desarrollos_Financiamientos,
            scv_Desarrollos_CentrosCosto_Ingresos,
            scv_Desarrollos_CentrosCosto_Construccion,
            scv_Desarrollos_TipoComercializacion,
            vistasMapa,
            scv_Desarrollos_FormatoClaveUbicacion,
            scv_Desarrollos_MotivosCancelacion,
            scv_Desarrollos_ConceptosPago,
            scv_Desarrollos_GrupoFase]);

    let Iconos: any = {};
    Iconos[scv_Desarrollos_Prototipos] = "fa fa-object-group";
    Iconos[scv_Desarrollos_Financiamientos] = "fas fa-dice-d20";
    Iconos[scv_Desarrollos_Esquemas] = "fa fa-cc-diners-club";
    Iconos[scv_Desarrollos_CentrosCosto_Ingresos] = "fas fa-money-check-alt";
    Iconos[scv_Desarrollos_CentrosCosto_Construccion] = "fas fa-money-check-alt";
    Iconos[scv_Desarrollos_TipoComercializacion] = "icon-pin";
    Iconos[scv_Desarrollos_FormatoClaveUbicacion] = "fa fa-cogs";
    Iconos["CaracteristicasAdicionales"] = "fas fa-draw-polygon";
    Iconos[scv_Desarrollos_MotivosCancelacion] = "fas fa-percent";
    Iconos[scv_Desarrollos_ConceptosPago] = "fas fa-percent";
    Iconos[scv_Desarrollos_GrupoFase] = "far fa-users-cog";


    let $page: any;

    const Encabezado_Desarrollos_Prototipos: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[12, 3, 3, 3]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 3, 3, 3]} className="list-center-header">{"Valor Base"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-center-header">{"Vigencia"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-center-header">{"C"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-center-header">{"U"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </div>;

    const Encabezado_Desarrollos_Financiamiento: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[12, 8, 8, 8]} className="list-default-header">{"Financiamiento"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"C"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">{"V"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </div>;

    const Encabezado_Desarrollos_CuentasDeposito: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 6, 6, 6]} className="list-default-header">{"Compañía"}</Column>
                <Column size={[12, 5, 5, 5]} className="list-default-header">{"Banco"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </div>;

    const Encabezado_Desarrollos_CentrosCosto_Ingresos: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 12, 12, 12]} className="list-default-header">{"Nombre"}</Column>
            </Row>
        </div>;
    const Encabezado_Desarrollos_CentrosCosto_Construccion: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 12, 12, 12]} className="list-default-header">{"Nombre"}</Column>

            </Row>
        </div>;
    const Encabezado_Desarrollos_Formato_Clave_Ubicacion: () => JSX.Element = (): JSX.Element =>
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[8, 8, 8, 8]} className="list-default-header">{$page.form.FormatoClave.Nombre.label}</Column>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{$page.form.FormatoClave.Longitud.label}</Column>
            </Row>
        </div>;
    const Encabezado_Desarrollos_TipoComercializacion: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[12, 5, 5, 5]} className="list-default-header">{"Tipo"}</Column>
                <Column size={[12, 4, 4, 4]} className="list-default-header">{"Plantilla"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-center-header">{"C"}</Column>
                <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </div>

    export const Edicion: any = page.connect(class extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let modelInfo: any = item;
            let model: any = item
                .addID()
                .addClave()
                .addString("Descripcion")
                .addString("Sector")
                .addString("Direccion")
                .addString("CodigoPostal")
                .addObject("Localidad")
                .addObject("Notario")
                .addString("NombreRep")
                .addString("TelefonoRep")
                .addString("ExtensionRep")
                .addString("Geolocalizacion")
                .addBoolean("SegmentaPrecios")
                .addObject("Compania")
                .addObject("Moneda")
                .addString("ClaveConjunto")
                .addEstatus("Estatus")
                .addString("NombreAcreedor")
                .addString("RFCAcreedor")
                .addString("ClabeAcreedor")
                .addObject("Caracteristicas")
                .addNumber("PrecioExcedenteM2")
                .addBoolean("Mapa2D")
                .addObject("Posicion")
                .addObject("Plaza")
                .addObject(scv_Desarrollos_Prototipos)
                .addObject(scv_Desarrollos_Financiamientos)
                .addObject(scv_Desarrollos_CentrosCosto_Ingresos)
                .addObject(scv_Desarrollos_CentrosCosto_Construccion)
                .addObject(scv_Desarrollos_TipoComercializacion)
                .addObject(scv_Desarrollos_FormatoClaveUbicacion)
                .addObject(scv_Desarrollos_MotivosCancelacion)
                .addObject(scv_Desarrollos_ConceptosPago)
                .addObject(scv_Desarrollos_GrupoFase)
                .addVersion()
                .toObject();

            let DesarrollosCCIngresos = model.DesarrollosCCIngresos;
            let guardar: boolean = false;
            if (DesarrollosCCIngresos && DesarrollosCCIngresos.length > 0) {
                DesarrollosCCIngresos.forEach((value: any, index: number): any => {
                    if (value.Principal == true && value._eliminado != true) {
                        guardar = true;
                    }
                });
            }

            if (!guardar) {
                warning("Se requiere agregar un Centro de Costos de Ingresos como Principal");
                return null;
            } else {

                return model;
            }
        };
        componentWillMount(): any {
            $page = $ml[config.id];
        };
        onEntityLoaded(props: page.IProps): any {
            let Desarrollo: any = getData(props.entidad);
            let idDesarrollo: number = getDataID(props.entidad);

            if (idDesarrollo === -1) {
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_Prototipos);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_Financiamientos);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_CentrosCosto_Ingresos);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_CentrosCosto_Construccion);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_TipoComercializacion);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_FormatoClaveUbicacion);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_ConceptosPago);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_MotivosCancelacion);
                global.dispatchSuccessful("global-page-data", [], scv_Desarrollos_GrupoFase);


            }
            else {

                let parametros: any = global.assign({ idDesarrollo: idDesarrollo });
                props.config.dispatchCatalogoBase("base/kontrol/Desarrollos/Get/GetAllDesarrollosFinanciamientos/", parametros, scv_Desarrollos_Financiamientos);
                props.config.dispatchCatalogoBase("base/kontrol/Desarrollos/Get/GetAllDesarrollosPrototipos/", parametros, scv_Desarrollos_Prototipos);
                props.config.dispatchCatalogoBase("base/kontrol/Desarrollos/Get/GetDesarrolloTiposComercializacion/", parametros, scv_Desarrollos_TipoComercializacion);
                props.config.dispatchCatalogoBase("base/kontrol/Desarrollos/Get/GetDesarrolloFormatoClave/", parametros, scv_Desarrollos_FormatoClaveUbicacion);
                props.config.dispatchCatalogoBase("base/kontrol/Desarrollos/Get/GetMotivosCancelacion/", parametros, scv_Desarrollos_MotivosCancelacion);
                props.config.dispatchCatalogoBase("base/kontrol/Desarrollos/Get/GetConceptosPago/", parametros, scv_Desarrollos_ConceptosPago);
                props.config.dispatchCatalogoBase("base/scv/Desarrollos/Get/GetRelacionFaseGrupo/", parametros, scv_Desarrollos_GrupoFase);


                parametros = global.assign({ idDesarrollo: idDesarrollo, ClaveTipoCentrosCosto: "CCINGRESO" });
                props.config.dispatchCatalogoBase("base/kontrol/desarrollos/Get/GetAllDesarrolloCentroCosto/", parametros, scv_Desarrollos_CentrosCosto_Ingresos);

                parametros = global.assign({ idDesarrollo: idDesarrollo, ClaveTipoCentrosCosto: "CCCONSTRUCCION" });
                props.config.dispatchCatalogoBase("base/kontrol/desarrollos/Get/GetAllDesarrolloCentroCosto/", parametros, scv_Desarrollos_CentrosCosto_Construccion);

            };
        };
        render(): JSX.Element {
            let urlAddress: string;
            if (global.isSuccessful(this.props.entidad)) {
                urlAddress = "/Desarrollos/GetLocations/" + global.getDataID(this.props.entidad) + "/null/null/false";
            }
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <PageButtons>
                    <buttons.MapViewerButton url={urlAddress} showRelateLocation={false} />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });
    interface IDesarrolloCatalogoView extends page.IProps {
        Desarrollo?: any;
    };

    let Edit: any = global.connect(class extends React.Component<IDesarrolloCatalogoView, IDesarrolloCatalogoView> {
        constructor(props: IDesarrolloCatalogoView) {
            super(props);
        }
        static props: any = (state: any) => ({
        });
        componentDidMount() {

            let url: string = global.encodeAllURL("scv", "Prototipos", { activos: 1 });
            dispatchAsync("load::PROTOTIPOS", url);
        }
        render(): JSX.Element {


            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={"desarrollos"}
                            subTitle={PAGE_ID}
                            level="main"
                            identidad={"desarrollos"}
                            icon="fa fa-home"
                            collapsed={false}
                            hideCollapseButton={true}>

                            <Row>
                                <input.Clave id={"Clave"} url="base/scv/Desarrollos/exists/Exists" size={[12, 12, 2, 2]} maxLength={20} required={true} />
                                <Input id={"Descripcion"} size={[12, 12, 6, 6]} maxLength={100} validations={[validations.required()]} />
                                <CheckBox id={"SegmentaPrecios"} size={[12, 12, 1, 1]} />
                                <checkBox.CheckBox id={"Mapa2D"} size={[12, 12, 1, 1]} />
                                <checkBox.Status id={"Estatus"} size={[12, 12, 1, 1]} />

                            </Row>

                            <Row>
                                <Input id={"ClaveConjunto"} size={[12, 12, 2, 2]} maxLength={20} />
                                <Input id={"Sector"} size={[12, 12, 2, 2]} maxLength={25} validations={[validations.required()]} />
                                <Input id={"Direccion"} size={[12, 12, 4, 4]} maxLength={150} />
                                <select.Asentamientos id={"Localidad"} size={[12, 12, 4, 4]} />
                            </Row>

                            <Row>
                                <select.Notario id={"Notario"} size={[12, 4, 4, 4]} />
                                <Input id={"NombreRep"} size={[12, 4, 4, 4]} maxLength={150} />
                                <input.Telefono id={"TelefonoRep"} size={[12, 2, 2, 2]} />
                                <Input id={"ExtensionRep"} size={[12, 2, 2, 2]} maxLength={6} />
                            </Row>

                            <Row>
                                <Input id={"NombreAcreedor"} size={[12, 12, 4, 4]} maxLength={150} />
                                <Input id={"ClabeAcreedor"} size={[12, 12, 4, 4]} maxLength={20} />
                                <input.RFC id={"RFCAcreedor"} size={[12, 12, 4, 4]} />
                            </Row>

                            <Row>
                                <CompaniasDDL id={"Compania"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                                <MonedasDDL id={"Moneda"} size={[12, 3, 3, 3]} />
                                <Currency id={"PrecioExcedenteM2"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                                <Input id={"Geolocalizacion"} size={[12, 3, 3, 3]} maxLength={150} />
                            </Row>

                            <Row>
                                <ddl.PlazasSCVDDL id="Plaza" size={[12, 3, 3, 3]} addNewItem={"SO"} validations={[validations.required()]} />
                                <ddl.PosicionesActivasDDL label="Representante" id={"Posicion"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                            </Row>

                            <Row style={{ paddingTop: 20 }}>

                                <Column size={[12, 12, 6, 6]} style={{ padding: 0 }}>
                                    <page.SectionList
                                        id={scv_Desarrollos_Prototipos}
                                        parent={config.id}
                                        idParent={config.id}
                                        icon={Iconos[scv_Desarrollos_Prototipos]}
                                        level={1}
                                        size={[12, 12, 12, 12]}
                                        listHeader={Encabezado_Desarrollos_Prototipos}
                                        items={createSuccessfulStoreObject([])} readonly={false}
                                        addRemoveButton={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addNombre()
                                                .addObject("Prototipo")
                                                .addNumber("PrecioBase")
                                                .addDate("Vigencia")
                                                .addObject("CaracteristicasPrototipos")
                                                .addVersion()
                                                .addEstatus()
                                                .toObject();

                                            let e: any[] = entidades;
                                            if (e && e.length > 0) {
                                                e.forEach((value: any, index: number): any => {
                                                    if (value.Prototipo.ID === retValue.Prototipo.ID) {
                                                        retValue.ID = value.ID;
                                                        retValue._found = true;
                                                    };
                                                });
                                            };

                                            return retValue;
                                        }}
                                        formatter={(index: number, item: any) => {
                                            var Visible = true;
                                            if (item.CaracteristicasPrototipos == undefined || item.CaracteristicasPrototipos.length == 0) {
                                                Visible = false;
                                            }
                                            //<span>{EK.UX.Labels.formatMoney(item.PrecioBase)}</span>
                                            return <Row id={"row_Prototipo_" + item.ID} className="panel-collapsed">
                                                <Column className="listItem-default-header" >
                                                    <Row>
                                                        <Column size={[12, 1, 1, 1]} style={{ paddingTop: 5 }}>
                                                            <CollapseButton visible={Visible}
                                                                idElement={"row_Prototipo_" + item.ID}
                                                                className="button-panel-plus"
                                                                collapsedClass="panel-collapsed"
                                                                collapsedUpIcon="font-blue fa fa-caret-up"
                                                                collapsedDownIcon="font-blue fa fa-caret-down"
                                                                style={null}
                                                                collapsed={true}
                                                                iconOnly={true} />
                                                        </Column>
                                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                                            <span>{item.Prototipo.Nombre}</span>
                                                        </Column>

                                                        <Column size={[12, 3, 3, 3]} className="listItem-right-item">
                                                            <input.Currency id="PrecioBase" idFormSection={config.id} property={scv_Desarrollos_Prototipos} index={index} />
                                                        </Column>

                                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                            <span>{EK.UX.Labels.formatDate(item.Vigencia)}</span>
                                                        </Column>

                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                            <span className="badge badge-success"
                                                                style={{ top: 0, left: -12 }}>{item.CaracteristicasPrototipos ? item.CaracteristicasPrototipos.length : 5}</span>
                                                        </Column>

                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 0 }}>
                                                            <a className="badge badge-success" href={item.Ruta}>{item.CantidadUbicacion}</a>
                                                        </Column>
                                                        <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_Prototipos} info={item} property={scv_Desarrollos_Prototipos} index={index}
                                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                    </Row>
                                                    <Row>
                                                        <Column
                                                            xs={{ size: 12 }}
                                                            sm={{ size: 12 }}
                                                            md={{ size: 12 }}
                                                            lg={{ size: 12 }}
                                                            className="panel-detail well well-sm">
                                                            <List
                                                                id={this.props.id + "_list"}
                                                                items={global.createSuccessfulStoreObject(item.CaracteristicasPrototipos)}
                                                                readonly={true}
                                                                addRemoveButton={false}
                                                                formatter={(index_c: number, item_c: any): any => {
                                                                    if (item_c.VentaOpcional === true) {
                                                                        return <Row id={"row_Prototipo_" + index_c}>
                                                                            <Column size={[3, 3, 3, 4]}><span className="badge badge-warning">Obligatorio</span></Column>
                                                                            <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                        </Row>
                                                                    }
                                                                    else {
                                                                        return <Row id={"row_Prototipo_" + index_c}>
                                                                            <Column size={[3, 3, 3, 4]}><span className="badge badge-info">Opcional</span></Column>
                                                                            <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                        </Row>;
                                                                    }
                                                                }}
                                                            />
                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>;
                                        }}>
                                        <Row>
                                            <PrototiposDDL id={"Prototipo"} size={[12, 12, 12, 12]} idFormSection={scv_Desarrollos_Prototipos} required={true} />
                                            <input.Currency id={"PrecioBase"} size={[12, 6, 6, 6]} idFormSection={scv_Desarrollos_Prototipos} maxLength={50} validations={[validations.required()]} />
                                            <input.Date id={"Vigencia"} idFormSection={scv_Desarrollos_Prototipos} size={[12, 6, 6, 6]} />
                                            <Column size={[12, 12, 12, 12]} style={{ marginTop: "4%" }}>

                                                <globalSCV.CaracteristicasForm
                                                    viewMode={false}
                                                    id={"CaracteristicasPrototipos"}
                                                    isSlot={1}
                                                    level={1}
                                                    idFormSection={scv_Desarrollos_Prototipos}
                                                    entityType={EK.UX.SCV.EntityTypeEnum.PROTOTIPO}
                                                    title="Caracteristicas adicionales Prototipos" />
                                            </Column>
                                        </Row>
                                    </page.SectionList>

                                    <page.SectionList
                                        id={scv_Desarrollos_CentrosCosto_Ingresos}
                                        parent={config.id}
                                        level={1}
                                        icon={Iconos[scv_Desarrollos_CentrosCosto_Ingresos]}
                                        size={[12, 12, 12, 12]}
                                        listHeader={Encabezado_Desarrollos_CentrosCosto_Ingresos}
                                        items={createSuccessfulStoreObject([])} readonly={false}
                                        addRemoveButton={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addEstatus()
                                                .addObject("CentroCosto")
                                                .addBoolean("Principal")
                                                .addVersion()
                                                .toObject();

                                            let e: any[] = entidades;
                                            if (e && e.length > 0) {
                                                e.forEach((value: any, index: number): any => {

                                                    if (value.CentroCosto.ID === retValue.CentroCosto.ID) {
                                                        retValue.ID = value.ID;
                                                        retValue._found = true;
                                                    };
                                                    if (value.Principal == true && retValue.Principal == true) {
                                                        value.Principal = null;
                                                        value._modificado = true;
                                                    }
                                                });
                                            }

                                            return retValue;
                                        }}
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[12, 10, 10, 10]} className="listItem-default-item">
                                                    <span className="badge badge-success" style={{ marginRight: 10 }}>{item.CentroCosto.Clave} </span>
                                                    <span>{item.CentroCosto.Nombre}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontWeight: 400 }}>{item.Principal ? EK.UX.Labels.ok(item.Principal) : null}</span>
                                                </Column>
                                                <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_CentrosCosto_Ingresos} info={item}
                                                    extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                            </Row>;
                                        }}>
                                        <Row>
                                            <CentrosCostoDDL idFormSection={scv_Desarrollos_CentrosCosto_Ingresos} id={"CentroCosto"} size={[12, 10, 10, 10]} validations={[validations.required()]} />
                                            <CheckBox id="Principal" idFormSection={scv_Desarrollos_CentrosCosto_Ingresos} size={[12, 2, 2, 2]} label="Principal" />

                                        </Row>
                                    </page.SectionList>

                                    <page.SectionList

                                        id={scv_Desarrollos_TipoComercializacion}
                                        parent={config.id}
                                        icon={Iconos[scv_Desarrollos_TipoComercializacion]}
                                        size={[12, 12, 12, 12]}
                                        level={1}
                                        listHeader={Encabezado_Desarrollos_TipoComercializacion}
                                        items={createSuccessfulStoreObject([])} readonly={false}
                                        addRemoveButton={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addEstatus()
                                                .addObject("TiposComercializacion")
                                                .addObject("PlantillaMail")
                                                .addObject("CaracteristicasTiposComercializacion")
                                                .addVersion()
                                                .toObject();

                                            let e: any[] = entidades;
                                            if (e && e.length > 0) {
                                                e.forEach((value: any, index: number): any => {
                                                    if (value.TiposComercializacion.ID === retValue.TiposComercializacion.ID) {
                                                        retValue.ID = value.ID;
                                                        retValue._found = true;
                                                    };
                                                });
                                            };

                                            return retValue;
                                        }}

                                        formatter={(index: number, item: any) => {
                                            var Visible = true;
                                            if (item.CaracteristicasTiposComercializacion == undefined || item.CaracteristicasTiposComercializacion.length == 0) {
                                                Visible = false;
                                            }
                                            let plantilla: string = item.PlantillaMail ? item.PlantillaMail.Clave : "";
                                            return <Row id={"row_TiposComercializacion_" + item.ID} className="panel-collapsed">
                                                <Column className="listItem-default-header" >
                                                    <Row>
                                                        <Column size={[12, 1, 1, 1]} style={{ paddingTop: 5 }}>
                                                            <CollapseButton visible={Visible}
                                                                idElement={"row_TiposComercializacion_" + item.ID}
                                                                className="button-panel-plus"
                                                                collapsedClass="panel-collapsed"
                                                                collapsedUpIcon="font-blue fa fa-caret-up"
                                                                collapsedDownIcon="font-blue fa fa-caret-down"
                                                                style={null}
                                                                collapsed={true}
                                                                iconOnly={true} />
                                                        </Column>
                                                        <Column size={[12, 5, 5, 5]} className="listItem-default-item">
                                                            <span>{item.TiposComercializacion.Nombre} </span>
                                                        </Column>
                                                        <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                                            <span>{plantilla} </span>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                            <span className="badge badge-success"
                                                                style={{ top: 0, left: -12 }}>{item.CaracteristicasTiposComercializacion ? item.CaracteristicasTiposComercializacion.length : 5}</span>
                                                        </Column>

                                                        <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_TipoComercializacion} info={item}
                                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                    </Row>
                                                    <Row>
                                                        <Column
                                                            xs={{ size: 12 }}
                                                            sm={{ size: 12 }}
                                                            md={{ size: 12 }}
                                                            lg={{ size: 12 }}
                                                            className="panel-detail well well-sm">
                                                            <List
                                                                id={this.props.id + "_list"}
                                                                items={global.createSuccessfulStoreObject(item.CaracteristicasTiposComercializacion)}
                                                                readonly={true}
                                                                addRemoveButton={false}
                                                                formatter={(index_c: number, item_c: any): any => {
                                                                    if (item_c.VentaOpcional === true) {
                                                                        return <Row id={"row_TiposComercializacion_" + index_c}>
                                                                            <Column size={[3, 3, 3, 4]}><span className="badge badge-warning">Obligatorio</span></Column>
                                                                            <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                        </Row>
                                                                    }
                                                                    else {
                                                                        return <Row id={"row_TiposComercializacion_" + index_c}>
                                                                            <Column size={[3, 3, 3, 4]}><span className="badge badge-info">Opcional</span></Column>
                                                                            <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                        </Row>;
                                                                    }
                                                                }}
                                                            />
                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>;
                                        }}>
                                        <Row>
                                            <TipoComercializacionDDL cargarDatos={true} idFormSection={scv_Desarrollos_TipoComercializacion} id={"TiposComercializacion"} size={[12, 6, 6, 6]} validations={[validations.required()]} addNewItem={"SO"} />
                                            <ddl.PlantillasDDL size={[12, 6, 6, 6]} id={"PlantillaMail"} addNewItem={"SO"} idFormSection={scv_Desarrollos_TipoComercializacion} />
                                        </Row>
                                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "4%" }}>

                                            <globalSCV.CaracteristicasForm
                                                viewMode={false}
                                                id={"CaracteristicasTiposComercializacion"}
                                                isSlot={1}
                                                level={1}
                                                idFormSection={scv_Desarrollos_TipoComercializacion}
                                                entityType={EK.UX.SCV.EntityTypeEnum.TIPOCOMERCIALIZACION}
                                                title="Caracteristicas adicionales Tipo Comercialización" />
                                        </Column>
                                    </page.SectionList>

                                    <ConceptosPagoReembolso />
                                    <DesarrolloGrupoFase />


                                </Column>
                                <Column size={[12, 12, 6, 6]} style={{ padding: 0 }}>
                                    <page.SectionList
                                        id={scv_Desarrollos_Financiamientos}
                                        parent={config.id}
                                        idParent={config.id}
                                        icon={Iconos[scv_Desarrollos_Financiamientos]}
                                        level={1}
                                        size={[12, 12, 12, 12]}
                                        listHeader={Encabezado_Desarrollos_Financiamiento}
                                        items={createSuccessfulStoreObject([])} readonly={false}
                                        addRemoveButton={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addNombre()
                                                .addObject("Financiamiento")
                                                .addObject("CaracteristicasFinanciamiento")
                                                .addVersion()
                                                .addEstatus()
                                                .toObject();

                                            let e: any[] = entidades;
                                            if (e && e.length > 0) {
                                                e.forEach((value: any, index: number): any => {
                                                    if (value.Financiamiento.ID === retValue.Financiamiento.ID) {
                                                        retValue.ID = value.ID;
                                                        retValue._found = true;
                                                    };
                                                });
                                            };

                                            return retValue;
                                        }}
                                        formatter={(index: number, item: any) => {
                                            var Visible = true;
                                            if (item.CaracteristicasFinanciamiento == undefined || item.CaracteristicasFinanciamiento.length == 0) {
                                                Visible = false;
                                            }
                                            return <Row id={"row_Financiamiento_" + item.ID} className="panel-collapsed">
                                                <Column className="listItem-default-header" >
                                                    <Row>
                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-header" style={{ paddingTop: 5 }}>
                                                            <CollapseButton visible={Visible}
                                                                idElement={"row_Financiamiento_" + item.ID}
                                                                className="button-panel-plus"
                                                                collapsedClass="panel-collapsed"
                                                                collapsedUpIcon="font-blue fa fa-caret-up"
                                                                collapsedDownIcon="font-blue fa fa-caret-down"
                                                                style={null}
                                                                collapsed={true}
                                                                iconOnly={true} />
                                                        </Column>

                                                        <Column size={[12, 8, 8, 8]} className="listItem-default-item">
                                                            <span>{item.Financiamiento !== null ? item.Financiamiento.Nombre : ""}</span>
                                                        </Column>

                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                            <span className="badge badge-success"
                                                                style={{ top: 0, left: -12 }}>{item.CaracteristicasFinanciamiento ? item.CaracteristicasFinanciamiento.length : 0}</span>
                                                        </Column>
                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                            <span className="badge badge-success"
                                                                style={{ top: 0, left: -12 }}>{item.CantidadFinanciamientoVenta}</span>
                                                        </Column>

                                                        <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_Financiamientos} info={item}
                                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                    </Row>
                                                    <Row>
                                                        <Column
                                                            xs={{ size: 12 }}
                                                            sm={{ size: 12 }}
                                                            md={{ size: 12 }}
                                                            lg={{ size: 12 }}
                                                            className="panel-detail well well-sm">
                                                            <List
                                                                id={this.props.id + "_list"}
                                                                items={global.createSuccessfulStoreObject(item.CaracteristicasFinanciamiento)}
                                                                readonly={true}
                                                                addRemoveButton={false}
                                                                formatter={(index_c: number, item_c: any): any => {
                                                                    if (item_c.VentaOpcional === true) {
                                                                        return <Row id={"row_Financiamiento" + index_c}>
                                                                            <Column size={[3, 3, 3, 4]}><span className="badge badge-warning">Obligatorio</span></Column>
                                                                            <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                        </Row>
                                                                    }
                                                                    else {
                                                                        return <Row id={"row_Financiamiento" + index_c}>
                                                                            <Column size={[3, 3, 3, 4]}><span className="badge badge-info">Opcional</span></Column>
                                                                            <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                        </Row>;
                                                                    }
                                                                }}
                                                            />
                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>;
                                        }}>

                                        <Row>
                                            <ddl.TiposFinanciamientoDDL id={"Financiamiento"} size={[12, 12, 12, 12]} idFormSection={scv_Desarrollos_Financiamientos} required={true} />
                                            <Column size={[12, 12, 12, 12]} style={{ marginTop: "4%" }} >
                                                <globalSCV.CaracteristicasForm
                                                    id={"CaracteristicasFinanciamiento"}
                                                    idFormSection={scv_Desarrollos_Financiamientos}
                                                    viewMode={false}
                                                    isSlot={1}
                                                    level={1}
                                                    title="Caracteristicas Adicionales Financiamiento"
                                                    entityType={EK.UX.SCV.EntityTypeEnum.FINANCIAMIENTO} />
                                            </Column>
                                        </Row>
                                    </page.SectionList>
                                    <Column>
                                        <globalSCV.CaracteristicasForm
                                            id={"Caracteristicas"}
                                            viewMode={false}
                                            level={1}
                                            icon={Iconos["CaracteristicasAdicionales"]}
                                            title="Caracteristicas Desarrollo"
                                            entityType={EK.UX.SCV.EntityTypeEnum.DESARROLLO} />
                                    </Column>
                                    <page.SectionList
                                        id={scv_Desarrollos_CentrosCosto_Construccion}
                                        parent={config.id}
                                        icon={Iconos[scv_Desarrollos_CentrosCosto_Construccion]}
                                        size={[12, 12, 12, 12]}
                                        level={1}
                                        listHeader={Encabezado_Desarrollos_CentrosCosto_Construccion}
                                        items={createSuccessfulStoreObject([])} readonly={false}
                                        addRemoveButton={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addEstatus()
                                                .addObject("CentroCosto")
                                                .addVersion()
                                                .toObject();

                                            let e: any[] = entidades;
                                            if (e && e.length > 0) {
                                                e.forEach((value: any, index: number): any => {
                                                    if (value.CentroCosto.ID === retValue.CentroCosto.ID) {
                                                        retValue.ID = value.ID;
                                                        retValue._found = true;
                                                    };
                                                });
                                            }

                                            return retValue;
                                        }}
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[12, 11, 11, 11]} className="listItem-default-item">
                                                    <span className="badge badge-success" style={{ marginRight: 10 }}>{item.CentroCosto.Clave} </span>
                                                    <span>{item.CentroCosto.Nombre}</span>
                                                </Column>
                                                <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_CentrosCosto_Construccion} info={item}
                                                    extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                            </Row>;
                                        }}>
                                        <Row>
                                            <CentrosCostoDDL idFormSection={scv_Desarrollos_CentrosCosto_Construccion} id={"CentroCosto"} size={[12, 12, 12, 12]} validations={[validations.required()]} />
                                        </Row>
                                    </page.SectionList>
                                    <page.SectionList
                                        id={scv_Desarrollos_FormatoClaveUbicacion}
                                        parent={config.id}
                                        icon={Iconos[scv_Desarrollos_FormatoClaveUbicacion]}
                                        size={[12, 12, 12, 12]}
                                        level={1}
                                        listHeader={Encabezado_Desarrollos_Formato_Clave_Ubicacion()}
                                        items={createSuccessfulStoreObject([])} readonly={false}
                                        addRemoveButton={false}
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addNombre()
                                                .addNumber("Longitud")
                                                .addEstatus()
                                                .addVersion()
                                                .toObject();

                                            return retValue;
                                        }}
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[8, 8, 8, 8]} className="listItem-default-item">
                                                    {item.Nombre}
                                                </Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                                                    <span className="badge badge-success">{item.Longitud} </span>
                                                </Column>
                                                <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_FormatoClaveUbicacion} info={item}
                                                    extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                            </Row>;
                                        }}>
                                        <Row>
                                            <input.Nombre idFormSection={scv_Desarrollos_FormatoClaveUbicacion} size={[12, 9, 9, 9]} validations={[validations.required()]} />
                                            <input.Integer id="Longitud" idFormSection={scv_Desarrollos_FormatoClaveUbicacion} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                                        </Row>
                                    </page.SectionList>


                                    <MotivosCancelacionPenalizacion />
                                </Column>


                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                </Column>
            </page.Edit>;
        };
    });


    interface IEditProps extends page.IProps {
        ubicacion?: any;
        item?: any;
        documentos?: any[];
        mode?: any;
        EditPP?: boolean;
        viewMode?: any;
        config?: page.IPageConfig;
        Esquema: DataElement;
        Financiamiento: DataElement;
        Moneda: DataElement;
        entidad: DataElement;
        concepto?: any;
        ubicaciones: DataElement;
    };

    let View: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        constructor(props: IEditProps) {
            super(props);
            this.ubicacionesR = this.ubicacionesR.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
        });
        ubicacionesR(e: any): any {
            //let url: string = global.encodeAllURL("scv", "Ubicaciones",'' /*{ idDesarrollo:1,idPrototipo:3 }*/);
            //go(url)
            //location.href = "#/kontrol/go/" 
            let actionUrl: string = "base/scv/ubicaciones/all/";
            //dispatchAsyncPost("ubicaciones", actionUrl, { idDesarrollo: 1, idPrototipo: 3 }, "ubicaciones");
        };
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <Label id="Descripcion" size={[12, 12, 6, 6]} />
                            <label.Boolean id={"SegmentaPrecios"} size={[12, 12, 1, 1]} />
                            <label.Boolean id={"Mapa2D"} size={[12, 12, 1, 1]} />
                            <label.Estatus id="Estatus" size={[12, 12, 1, 1]} />
                        </Row>
                        <Row>
                            <Label id={"ClaveConjunto"} size={[12, 3, 2, 2]} />
                            <Label id="Sector" size={[12, 12, 2, 2]} />
                            <Label id="Direccion" size={[12, 4, 4, 4]} />
                            <label.Localidad id={"Localidad"} size={[12, 4, 4, 4]} />
                        </Row>
                        <Row>
                            <label.General id={"Notario"} size={[12, 4, 4, 4]} />
                            <Label id={"NombreRep"} size={[12, 4, 4, 4]} />
                            <label.Telefono id={"TelefonoRep"} size={[12, 2, 2, 2]} />
                            <Label id={"ExtensionRep"} size={[12, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <Label id={"NombreAcreedor"} size={[12, 12, 4, 4]} />
                            <Label id={"ClabeAcreedor"} size={[12, 12, 4, 4]} />
                            <Label id={"RFCAcreedor"} size={[12, 12, 4, 4]} />
                        </Row>
                        <Row>
                            <label.General id={"Compania"} size={[12, 3, 3, 3]} />
                            <label.General id={"Moneda"} size={[12, 3, 2, 2]} />
                            <Label id={"PrecioExcedenteM2"} size={[12, 3, 3, 3]} />
                            <Label id={"Geolocalizacion"} size={[12, 4, 4, 4]} />
                        </Row>
                        <Row>
                            <label.General id={"Plaza"} size={[12, 3, 3, 3]} />
                            <label.General id={"Posicion"} size={[12, 3, 3, 3]} />
                        </Row>

                        <Row style={{ paddingTop: 20 }}>
                            <Column size={[12, 12, 6, 6]} style={{ padding: 0 }}>
                                <page.SectionList
                                    id={scv_Desarrollos_Prototipos}
                                    parent={config.id}
                                    idParent={config.id}
                                    level={1}
                                    icon={Iconos[scv_Desarrollos_Prototipos]}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Desarrollos_Prototipos}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        var Visible = true;
                                        if (item.CaracteristicasPrototipos == undefined || item.CaracteristicasPrototipos.length == 0) {
                                            Visible = false;
                                        }
                                        return <Row id={"row_Prototipo_" + item.ID} className="panel-collapsed">
                                            <Column className="listItem-default-item" >
                                                <Row>
                                                    <Column size={[12, 1, 1, 1]} style={{ paddingTop: 5 }}>
                                                        <CollapseButton visible={Visible}
                                                            idElement={"row_Prototipo_" + item.ID}
                                                            className="button-panel-plus"
                                                            collapsedClass="panel-collapsed"
                                                            collapsedUpIcon="font-blue fa fa-caret-up"
                                                            collapsedDownIcon="font-blue fa fa-caret-down"
                                                            style={null}
                                                            collapsed={true}
                                                            iconOnly={true} />
                                                    </Column>
                                                    <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                                        <span>{item.Prototipo.Nombre}</span>
                                                    </Column>

                                                    <Column size={[12, 3, 3, 3]} className="listItem-right-item">
                                                        <span>{EK.UX.Labels.formatMoney(item.PrecioBase)}</span>
                                                    </Column>

                                                    <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                        <span>{EK.UX.Labels.formatDate(item.Vigencia)}</span>
                                                    </Column>

                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                        <span className="badge badge-success"
                                                            style={{ top: 0, left: -12 }}>{item.CaracteristicasPrototipos ? item.CaracteristicasPrototipos.length : 0}</span>
                                                    </Column>

                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                        <a className="badge badge-success" href={item.Ruta}>{item.CantidadUbicacion}</a>
                                                    </Column>
                                                </Row>

                                                <Row>
                                                    <Column
                                                        xs={{ size: 12 }}
                                                        sm={{ size: 12 }}
                                                        md={{ size: 12 }}
                                                        lg={{ size: 12 }}
                                                        className="panel-detail well well-sm">
                                                        <List
                                                            id={this.props.id + "_list"}
                                                            items={global.createSuccessfulStoreObject(item.CaracteristicasPrototipos)}
                                                            readonly={true}
                                                            addRemoveButton={false}
                                                            formatter={(index_c: number, item_c: any): any => {
                                                                if (item_c.VentaOpcional === true) {
                                                                    return <Row id={"row_Prototipo_" + index_c}>
                                                                        <Column size={[3, 3, 3, 4]}><span className="badge badge-warning">Obligatorio</span></Column>
                                                                        <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                    </Row>
                                                                }
                                                                else {
                                                                    return <Row id={"row_Prototipo_" + index_c}>
                                                                        <Column size={[3, 3, 3, 4]}><span className="badge badge-info">Opcional</span></Column>
                                                                        <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                    </Row>;
                                                                }
                                                            }}
                                                        />
                                                    </Column>
                                                </Row>
                                            </Column>
                                        </Row>;
                                    }}>

                                    <Row>
                                        <PrototiposDDL id={"Prototipo"} size={[12, 12, 12, 12]} idFormSection={scv_Desarrollos_Prototipos} required={true} />
                                        <input.Currency id={"PrecioBase"} size={[12, 12, 12, 12]} idFormSection={scv_Desarrollos_Prototipos} maxLength={50} validations={[validations.required()]} />
                                        <input.Date id={"Vigencia"} idFormSection={scv_Desarrollos_Prototipos} size={[12, 12, 12, 12]} />
                                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "4%" }}>
                                            <globalSCV.CaracteristicasForm
                                                viewMode={true}
                                                id={"CaracteristicasPrototipos"}
                                                level={1}
                                                idFormSection={scv_Desarrollos_Prototipos}
                                                entityType={EK.UX.SCV.EntityTypeEnum.PROTOTIPO}
                                                title="Caracteristicas adicionales de prototipos" />
                                        </Column>
                                    </Row>
                                </page.SectionList>
                                <page.SectionList
                                    id={scv_Desarrollos_CentrosCosto_Ingresos}
                                    parent={config.id}
                                    icon={Iconos[scv_Desarrollos_CentrosCosto_Ingresos]}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Desarrollos_CentrosCosto_Ingresos}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[12, 11, 11, 11]} className="listItem-default-item">
                                                <span className="badge badge-success" style={{ marginRight: 10 }}>{item.CentroCosto.Clave} </span>
                                                <span>{item.CentroCosto.Nombre}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <span style={{ fontWeight: 400 }}>{item.Principal ? EK.UX.Labels.ok(item.Principal) : null}</span>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                                <page.SectionList
                                    id={scv_Desarrollos_TipoComercializacion}
                                    parent={config.id}
                                    icon={Iconos[scv_Desarrollos_TipoComercializacion]}
                                    size={[12, 12, 12, 12]}
                                    level={1}
                                    listHeader={Encabezado_Desarrollos_TipoComercializacion}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        var Visible = true;
                                        if (item.CaracteristicasTiposComercializacion == undefined || item.CaracteristicasTiposComercializacion.length == 0) {
                                            Visible = false;
                                        }
                                        let plantilla: string = item.PlantillaMail ? item.PlantillaMail.Clave : "";
                                        return <Row id={"row_TiposComercializacion_" + item.ID} className="panel-collapsed">
                                            <Column className="listItem-default-item" >
                                                <Row>
                                                    <Column size={[12, 1, 1, 1]} style={{ paddingTop: 5 }}>
                                                        <CollapseButton visible={Visible}
                                                            idElement={"row_TiposComercializacion_" + item.ID}
                                                            className="button-panel-plus"
                                                            collapsedClass="panel-collapsed"
                                                            collapsedUpIcon="font-blue fa fa-caret-up"
                                                            collapsedDownIcon="font-blue fa fa-caret-down"
                                                            style={null}
                                                            collapsed={true}
                                                            iconOnly={true} />
                                                    </Column>
                                                    <Column size={[12, 5, 5, 5]} className="listItem-default-item">
                                                        <span>{item.TiposComercializacion.Nombre} </span>
                                                    </Column>
                                                    <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                                        <span>{plantilla} </span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                        <span className="badge badge-success"
                                                            style={{ top: 0, left: -12 }}>{item.CaracteristicasTiposComercializacion ? item.CaracteristicasTiposComercializacion.length : 0}</span>
                                                    </Column>
                                                </Row>
                                                <Row>
                                                    <Column
                                                        xs={{ size: 12 }}
                                                        sm={{ size: 12 }}
                                                        md={{ size: 12 }}
                                                        lg={{ size: 12 }}
                                                        className="panel-detail well well-sm">
                                                        <List
                                                            id={this.props.id + "_list"}
                                                            items={global.createSuccessfulStoreObject(item.CaracteristicasTiposComercializacion)}
                                                            readonly={true}
                                                            addRemoveButton={false}
                                                            formatter={(index_c: number, item_c: any): any => {
                                                                if (item_c.VentaOpcional === true) {
                                                                    return <Row id={"row_TiposComercializacion_" + index_c}>
                                                                        <Column size={[3, 3, 3, 4]}><span className="badge badge-warning">Obligatorio</span></Column>
                                                                        <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                    </Row>
                                                                }
                                                                else {
                                                                    return <Row id={"row_TiposComercializacion_" + index_c}>
                                                                        <Column size={[3, 3, 3, 4]}><span className="badge badge-info">Opcional</span></Column>
                                                                        <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                    </Row>;
                                                                }
                                                            }}
                                                        />
                                                    </Column>
                                                </Row>


                                            </Column>
                                        </Row>
                                    }}>
                                    <Row>
                                        <TipoComercializacionDDL cargarDatos={true} idFormSection={scv_Desarrollos_TipoComercializacion} id={"TiposComercializacion"} size={[12, 6, 6, 6]} validations={[validations.required()]} addNewItem={"SO"} />
                                        <ddl.PlantillasDDL size={[12, 6, 6, 6]} id={"PlantillaMail"} addNewItem={"SO"} idFormSection={scv_Desarrollos_TipoComercializacion} />
                                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "4%" }}>
                                            <globalSCV.CaracteristicasForm
                                                viewMode={true}
                                                id={"CaracteristicasTiposComercializacion"}
                                                level={1}
                                                idFormSection={scv_Desarrollos_TipoComercializacion}
                                                entityType={EK.UX.SCV.EntityTypeEnum.TIPOCOMERCIALIZACION}
                                                title="Caracteristicas adicionales de tipos de comercializacion" />
                                        </Column>
                                    </Row>
                                </page.SectionList>

                                <ConceptosPagoReembolso />
                                <DesarrolloGrupoFase />


                            </Column>
                            <Column size={[12, 12, 6, 6]} style={{ padding: 0 }}>
                                <page.SectionList
                                    id={scv_Desarrollos_Financiamientos}
                                    parent={config.id}
                                    icon={Iconos[scv_Desarrollos_Financiamientos]}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Desarrollos_Financiamiento}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        var Visible = true;
                                        if (item.CaracteristicasFinanciamiento == undefined || item.CaracteristicasFinanciamiento.length == 0) {
                                            Visible = false;
                                        }
                                        return <Row id={"row_Financiamiento_" + item.ID} className="panel-collapsed">
                                            <Column className="listItem-default-header" >
                                                <Row>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                        <CollapseButton visible={Visible}
                                                            idElement={"row_Financiamiento_" + item.ID}
                                                            className="button-panel-plus"
                                                            collapsedClass="panel-collapsed"
                                                            collapsedUpIcon="font-blue fa fa-caret-up"
                                                            collapsedDownIcon="font-blue fa fa-caret-down"
                                                            style={null} collapsed={true} iconOnly={true} />

                                                    </Column>

                                                    <Column size={[12, 8, 8, 8]} className="listItem-default-item">
                                                        <span>{item.Financiamiento !== null ? item.Financiamiento.Nombre : ""}</span>
                                                    </Column>

                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                        <span className="badge badge-success"
                                                            style={{ top: 0, left: -12 }}>{item.CaracteristicasFinanciamiento ? item.CaracteristicasFinanciamiento.length : 0}</span>
                                                    </Column>

                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ paddingTop: 5 }}>
                                                        <span className="badge badge-success"
                                                            style={{ top: 0, left: -12 }}>{item.CantidadFinanciamientoVenta}</span>
                                                    </Column>
                                                </Row>
                                                <Row>
                                                    <Column
                                                        xs={{ size: 12 }}
                                                        sm={{ size: 12 }}
                                                        md={{ size: 12 }}
                                                        lg={{ size: 12 }}
                                                        className="panel-detail well well-sm">
                                                        <List
                                                            id={this.props.id + "_list"}
                                                            items={global.createSuccessfulStoreObject(item.CaracteristicasFinanciamiento)}
                                                            readonly={true}
                                                            addRemoveButton={false}
                                                            formatter={(index_c: number, item_c: any): any => {
                                                                if (item_c.VentaOpcional === true) {
                                                                    return <Row id={"row_Financiamiento" + index_c}>
                                                                        <Column size={[3, 3, 3, 4]}><span className="badge badge-warning">Obligatorio</span></Column>
                                                                        <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                    </Row>
                                                                }
                                                                else {
                                                                    return <Row id={"row_Financiamiento" + index_c}>
                                                                        <Column size={[3, 3, 3, 4]}><span className="badge badge-info">Opcional</span></Column>
                                                                        <Column size={[5, 5, 5, 4]}>{item_c.Caracteristica.Nombre}</Column>
                                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{EK.UX.Labels.formatMoney(item_c.Importe)}</Column>
                                                                    </Row>;
                                                                }
                                                            }}
                                                        />
                                                    </Column>
                                                </Row>
                                            </Column>
                                        </Row>;
                                    }}>
                                    <Row>
                                        <ddl.TiposFinanciamientoDDL id={"Financiamiento"} size={[12, 12, 12, 12]} idFormSection={scv_Desarrollos_Financiamientos} required={true} />
                                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "4%" }} >
                                            <globalSCV.CaracteristicasForm
                                                id={"CaracteristicasFinanciamiento"}
                                                idFormSection={scv_Desarrollos_Financiamientos}
                                                viewMode={true}
                                                level={1}
                                                title="Caracteristicas Adicionales Financiamiento"
                                                entityType={EK.UX.SCV.EntityTypeEnum.FINANCIAMIENTO} />
                                        </Column>
                                    </Row>
                                </page.SectionList>
                                <Column>
                                    <globalSCV.CaracteristicasForm
                                        viewMode={true}
                                        level={1}
                                        icon={Iconos["CaracteristicasAdicionales"]}
                                        id={"Caracteristicas"}
                                        entityType={EK.UX.SCV.EntityTypeEnum.DESARROLLO}
                                        title="Caracteristicas Desarrollo" />
                                </Column>
                                <page.SectionList
                                    id={scv_Desarrollos_CentrosCosto_Construccion}
                                    parent={config.id}
                                    icon={Iconos[scv_Desarrollos_CentrosCosto_Construccion]}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Desarrollos_CentrosCosto_Construccion}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                                <span className="badge badge-success" style={{ marginRight: 10 }}>{item.CentroCosto.Clave} </span>
                                                <span>{item.CentroCosto.Nombre}</span>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>
                                <page.SectionList
                                    id={scv_Desarrollos_FormatoClaveUbicacion}
                                    parent={config.id}
                                    icon={Iconos[scv_Desarrollos_FormatoClaveUbicacion]}
                                    level={1}
                                    size={[12, 12, 12, 12]}
                                    listHeader={Encabezado_Desarrollos_Formato_Clave_Ubicacion()}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[8, 8, 8, 8]} className="listItem-default-item">
                                                {item.Nombre}
                                            </Column>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                                                <span className="badge badge-success">{item.Longitud} </span>
                                            </Column>
                                        </Row>;
                                    }}>
                                </page.SectionList>

                                <MotivosCancelacionPenalizacion />



                            </Column>

                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.id} viewMode={true} multiple={true} />
                </Column>
            </page.View>;
        }
    });

    export let MotivosCancelacionPenalizacion: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={scv_Desarrollos_MotivosCancelacion}
                icon={Iconos[scv_Desarrollos_MotivosCancelacion]}
                parent={config.id}
                style={{ paddingTop: 20 }}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 6, 6, 6]} className="list-default-header">{"Motivo de Cancelación"}</Column>
                        <Column size={[12, 6, 6, 6]} className="list-default-header">{"Penalización"}</Column>
                    </Row>
                </div>}
                readonly={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addObject("MotivoCancelacion")
                        .addNumber("Penalizacion")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {

                            if (value.MotivoCancelacion.ID === retValue.MotivoCancelacion.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            }
                        });
                    };

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    var penalizacion = item.Penalizacion;
                    if (penalizacion > 100) {
                        item.Penalizacion = 100;
                    } else {
                        item.Penalizacion = item.Penalizacion;
                    }

                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                    <span>{item.MotivoCancelacion.Nombre}</span>
                                </Column>

                                <Column size={[12, 5, 5, 5]} className="listItem-default-item">
                                    <span>{item.Penalizacion+"%"}</span>
                                </Column>

                                {(estadoEntidad) ? null :
                                    <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_MotivosCancelacion} info={item}
                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                }
                            </Row>
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <Column size={[12, 12, 12, 12]} >
                        <ddl.MotivosCancelacionDDL id="MotivoCancelacion" idFormSection={scv_Desarrollos_MotivosCancelacion} size={[12, 8, 8, 8]} />
                        <input.Porcentaje label="Penalización" id="Penalizacion" idFormSection={scv_Desarrollos_MotivosCancelacion} size={[12, 4, 4, 4]} />
                    </Column>
                </Row>
            </page.SectionList>
        };
    })


    export let ConceptosPagoReembolso: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={scv_Desarrollos_ConceptosPago}
                icon={Iconos[scv_Desarrollos_ConceptosPago]}
                parent={config.id}
                style={{ paddingTop: 20 }}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 6, 6, 6]} className="list-default-header">{"Concepto de Pago"}</Column>
                        <Column size={[12, 6, 6, 6]} className="list-default-header">{"Reembolso"}</Column>
                    </Row>
                </div>}
                readonly={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addObject("ConceptoPago")
                        .addNumber("Reembolso")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {

                            if (value.ConceptoPago.ID === retValue.ConceptoPago.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            }
                        });
                    };

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    var reembolso = item.Reembolso;
                    if (reembolso > 100) {
                        item.Reembolso = 100;
                    } else {
                        item.Reembolso = item.Reembolso;
                    }
                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                    <span>{item.ConceptoPago.Nombre}</span>
                                </Column>

                                <Column size={[12, 5, 5, 5]} className="listItem-default-item">
                                    <span>{item.Reembolso+"%"}</span>
                                </Column>

                                {(estadoEntidad) ? null :
                                    <buttons.PopOver idParent={config.id} idForm={scv_Desarrollos_ConceptosPago} info={item}
                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                }
                            </Row>
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <Column size={[12, 12, 12, 12]} >
                        <ddl.ConceptosPagoDDL label="Concepto de Pago" id="ConceptoPago" idFormSection={scv_Desarrollos_ConceptosPago} size={[12, 8, 8, 8]} />
                        <input.Porcentaje label="Reembolso" id="Reembolso" idFormSection={scv_Desarrollos_ConceptosPago} size={[12, 4, 4, 4]} />
                    </Column>
                </Row>
            </page.SectionList>
        };
    })


    export let DesarrolloGrupoFase: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={scv_Desarrollos_GrupoFase}
                icon={Iconos[scv_Desarrollos_GrupoFase]}
                hideNewButton={true}
                parent={config.id}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 6, 6, 6]} className="list-default-header">{"Fase"}</Column>
                        <Column size={[12, 6, 6, 6]} className="list-default-header">{"Grupo"}</Column>
                    </Row>
                </div>}
                readonly={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("Fase")
                        .addObject("Grupo")
                        .addEstatus()
                        .addVersion()
                        .toObject();
                    return retValue;
                }}
                formatter={(index: number, item: any) => {

                    let nombreGrupo: string = item.Grupo && item.Grupo.Nombre != null ? item.Grupo.Nombre : "";
                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                    <span>{item.Fase.Nombre}</span>
                                </Column>

                                <Column size={[12, 5, 5, 5]} className="listItem-default-item">

                                    {estadoEntidad == true ?
                                       <span>{nombreGrupo}</span>
                                        :
                                        <ddl.GruposDDL property={scv_Desarrollos_GrupoFase} index={index} value={item.Grupo} id="Grupo" idFormSection={config.id} />
                                     }

                                </Column>
                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })
}
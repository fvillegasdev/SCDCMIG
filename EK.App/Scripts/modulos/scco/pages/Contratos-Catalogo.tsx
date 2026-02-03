    namespace EK.Modules.SCCO.Pages.Contratos {
    "use strict";

    let PAGE_ID = "Contratos";
    const SCCO_BITACORA_AD: string = "BitacoraAD";
    const SCCO_REGISTRO_AR: string = "RegistroAnticipoRetencion";   
    const ACTA_CONSTITUTIVA: string = "ActasConstitutivas";
    const CONTRATISTAS: string = "Contratista";
    const TestigosContratos: string = "TestigosContratos";
    const REGISTRO_PUBLICO_PROPIEDAD: string = "RegistrosPublicosPropiedad";
    const config: page.IPageConfig = global.createPageConfig("Contratos", "scco",
        [SCCO_BITACORA_AD,
            SCCO_REGISTRO_AR,
            CONTRATISTAS,
            TestigosContratos,
            REGISTRO_PUBLICO_PROPIEDAD,
            ACTA_CONSTITUTIVA]);

    const listHeaderBAD: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 12, 4]} className="list-default-header">{"Tipo Movimiento"}</Column>
                <Column size={[12, 12, 12, 4]} className="list-default-header">{"Fecha Movimiento"}</Column>
                <Column size={[12, 12, 12, 3]} className="list-default-header">{"Importe"}</Column>
                <Column size={[12, 12, 12, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>;


    const listHeaderT: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 12, 3]} className="list-default-header">{"Descripcion"}</Column>
                <Column size={[12, 12, 12, 3]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 12, 12, 4]} className="list-default-header">{"Clave"}</Column>
                <Column size={[12, 12, 12, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>;

    const listHeaderRAR: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 12, 3]} className="list-center-header">{"Tipo Movimiento"}</Column>
                <Column size={[12, 12, 12, 2]} className="list-center-header">{"Tipo Anticipo"}</Column>   
                <Column size={[12, 12, 12, 2]} className="list-center-header">{"Fecha Movimiento"}</Column>
                <Column size={[12, 12, 12, 1]} className="list-center-header">{"Porcentaje"}</Column>
                <Column size={[12, 12, 12, 2]} className="list-center-header">{"Estimación"}</Column>
                <Column size={[12, 12, 12, 1]} className="list-center-header">{"Importe"}</Column>
                <Column size={[12, 12, 12, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>;

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus("Estatus")
                .addNumber("AditivaAutorizada")
                .addNumber("Monto")
                .addNumber("Iva")
                .addDescripcion()
                .addObject("Moneda")
                .addObject(CONTRATISTAS)
                .addObject("Compania")
                .addObject("Obra")
                .addString("Representante")
                .addNumber("IdConvenio")
                .addObject("TipoConvenio")
                .addNumber("ImporteContrato")
                .addDate("FechaInicio")
                .addDate("FechaFin")
                .addDate("FechaFirma")
                .addString("Direccion")
                .addString("RepresentanteBitacora") 
                .addObject(SCCO_BITACORA_AD)
                .addObject(TestigosContratos)
                .addObject(SCCO_REGISTRO_AR)
                .addString("Atencion")
                .addString("Telefono")
                .addString("email")
                .addVersion()
                .toObject();

            return model;
      
        };
        onEntityLoaded(props: page.IProps): void {
            let entity: any = props.entidad.data;
            let id: number = getDataID(props.entidad);
  

            if (id <= 0 || id === undefined) {
                global.dispatchSuccessful("global-page-data", [], SCCO_BITACORA_AD);
                global.dispatchSuccessful("global-page-data", [], TestigosContratos);
                global.dispatchSuccessful("global-page-data", [], SCCO_REGISTRO_AR);
                global.dispatchSuccessful("global-page-data", [], CONTRATISTAS);
                global.dispatchSuccessful("global-page-data", [], REGISTRO_PUBLICO_PROPIEDAD);
                global.dispatchSuccessful("global-page-data", [], ACTA_CONSTITUTIVA);
                
            } else {
                let idcontratista = props.entidad.data.IdContratista;
                let idproveedor = props.entidad.data.Contratista.Proveedor.ID;
                let parametros: any = global.assign({ idContrato: id });
                global.dispatchSuccessful("global-page-data", entity.BitacoraAD, SCCO_BITACORA_AD);
                global.dispatchSuccessful("global-page-data", entity.RegistroAnticipoRetencion, SCCO_REGISTRO_AR);
                global.dispatchSuccessful("global-page-data", entity.TestigosContratos, TestigosContratos);
                props.config.dispatchCatalogoBase("base/scco/Contratistas/all/", { ID: idcontratista }, CONTRATISTAS);
                props.config.dispatchCatalogoBase("base/Kontrol/RegistroPublicoPropiedad/all/", { IdProveedor: idproveedor }, REGISTRO_PUBLICO_PROPIEDAD);
                props.config.dispatchCatalogoBase("base/Kontrol/ActaConstitutiva/all/", { IdProveedor: idproveedor }, ACTA_CONSTITUTIVA);
 
            };

        };
        render(): JSX.Element {

            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    interface IPageEditProps extends page.IProps {
        clave?: string;
        contratista?: any;
        ContratistaProveedor?: any;
    };

    let Edit: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.contratista = Forms.getValue("Contratista", config.id, state);
            retValue.TipoConvenio = Forms.getValue("TipoConvenio", config.id, state);
            retValue.clave = Forms.getValue("Clave", config.id, state);
            retValue.ContratistaProveedor = state.global.ContratistaProveedor
            return retValue;
        };

        componentWillReceiveProps(nextProps: IPageEditProps): void {
            if (global.hasChanged(this.props.contratista, nextProps.contratista)) {
                let id: number = nextProps.contratista != undefined && nextProps.contratista.ID != undefined ? nextProps.contratista.ID : undefined;
                let idProveedor: number = nextProps.contratista != undefined && nextProps.contratista.IdProveedor != undefined ? nextProps.contratista.IdProveedor : undefined;
                if (idProveedor != undefined) {
                    let url: string = global.encodeAllURL("scco", "Contratistas", { id, activos: 1, idProveedor });
                    dispatchAsync("load::ContratistaProveedor", url);
                }            
            };


            if (global.hasChanged(this.props.contratista, nextProps.contratista)) {
                let contratista: any = global.assign({}, nextProps.contratista);
                let RFC: string = contratista.RFC;
                let TipoC: string = contratista.TipoConvenio;
                let NSS: string = contratista.NSS;
                let Asentamiento: string = contratista.Asentamiento;
                let Representante: string = contratista.Representante;
                let Direccion: string = contratista.Direccion;
                let Proveedor: string = contratista.Proveedor;
                let Regimen: string = contratista.Regimen;
                if (RFC && RFC.length > 2) {
                    Forms.updateFormElement(config.id, "RFC", RFC);
                   };  
                if (NSS && NSS.length > 2) {
                    Forms.updateFormElement(config.id, "NSS", NSS);
                };
            };
        };
        render(): JSX.Element {
            let timeStamp = Number(new Date()).toString();
            let insumo: any = global.getData(this.props.entidad);

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={"OBRA CONTRATANTE"}
                        icon="fas fa-city"
                        collapsed={false}
                        hideCollapseButton={true}
                        level={1}
                    >
                        <Row>
                            <input.Text id="Representante" size={[12, 12, 12, 3]} />
                            <CompaniasDDL id="Compania" size={[12, 3, 3, 3]} />
                            <SCCOObrasDDL id="Obra" size={[12, 3, 3, 3]} />
                            <TiposConveniosDDL id="TipoConvenio" size={[12, 3, 3, 3]} /> 
                        </Row>
                        <Row>
                            <input.Text id="Direccion" size={[12, 12, 12, 10]} />
                            <input.Telefono id="Telefono" size={[12, 12, 12, 3]} />
                            <input.Text id="Atencion" size={[12, 3, 3, 3]} />
                            <input.Text id="RepresentanteBitacora" size={[12, 3, 3, 3]} />
                            <input.Text id="email" size={[12, 3, 3, 3]} />
                        </Row>
                        <Row>
                            <DatePicker id="FechaInicio" size={[12, 12, 12, 3]} maxLength={8} />
                            <DatePicker id="FechaFin" size={[12, 12, 12, 3]} maxLength={8} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={"Contratista"}
                                    icon="fas fa-id-badge" level={1} collapsed={false}
                                    hideCollapseButton={false}
                                    size={[12, 12, 12, 12]}>
                                    <Row>
                                        <SCCOContratistaDDL id={"Contratista"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                                        <label.Label id="NSS" size={[12, 12, 3, 3]} label="Numero Seguro Social" />
                                        <label.Label id="RFC" size={[12, 12, 3, 3]} label="RFC" />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={"Contrato"}
                                    icon="fas fa-file-contract" level={1} collapsed={false}
                                    hideCollapseButton={false}
                                    size={[12, 3, 3, 3]}>
                                    <Row>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <Row>
                                                <DatePicker id="FechaFirma" size={[12, 12, 12, 6]} maxLength={8} />
                                                <input.Currency id="ImporteContrato" size={[12, 12, 12, 6]} validations={[validations.required()]} />
                                            </Row>
                                        </Column>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <page.SectionList
                                                id={TestigosContratos}
                                                parent={config.id}
                                                level={1}
                                                icon="fas fa-users"
                                                size={[12, 12, 12, 12]}
                                                listHeader={listHeaderT}
                                                items={createSuccessfulStoreObject([])} readonly={false}
                                                addRemoveButton={false}
                                                mapFormToEntity={(form: EditForm): any => {
                                                    return form
                                                        .addID()
                                                        .addObject("Usuario")
                                                        .addString("Descripcion")
                                                        .addVersion()   
                                                        .addEstatus()
                                                        .toObject();
                                                }}
                                                formatter={(index: number, item: any) => {
                                                    return <Row>
                                                        <Column size={[12, 12, 12, 3]} className="listItem-default-item"><span>{item.Descripcion}</span></Column>
                                                        <Column size={[12, 12, 12, 3]} className="listItem-default-item listItem-overflow">
                                                            {!(item && item.Usuario) ? "" : <span className="badge" >{item.Usuario.Nombre}{item.Usuario.Apellidos}</span>}&nbsp;
                                                        </Column>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item listItem-overflow">
                                                            {!(item && item.Usuario) ? "" : <span className="badge" >{item.Usuario.Clave}</span>}&nbsp;
                                                        </Column>
                                                        <buttons.PopOver idParent={config.id} idForm={TestigosContratos} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />

                                                    </Row>
                                                }}>
                                                <Row>
                                                    <select.Usuarios id="Usuario" idFormSection={TestigosContratos} label="Usuario" />
                                                    <input.Descripcion id="Descripcion" idFormSection={TestigosContratos} maxLength={250} size={[12, 12, 12, 10]} label="Descripcion" />
                                                </Row>
                                            </page.SectionList>     
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={"Convenio"}
                                    icon="fas fa-handshake" level={1} collapsed={false}
                                    hideCollapseButton={false}
                                    >
                                    <Row>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                    <Row>
                                        <input.Clave size={[12, 12, 12, 3]} maxLength={50} />
                                        <input.Nombre size={[12, 12, 12, 7]} maxLength={50} />
                                        <checkBox.Status id="Estatus" size={[12, 12, 12, 2]} />
                                    </Row>
                                    <Row>
                                        <input.Currency id="Monto" size={[12, 12, 12, 4]} validations={[validations.required()]} />
                                        <input.Currency id="AditivaAutorizada" size={[12, 12, 12, 4]} validations={[validations.required()]} />
                                        <input.Currency id="Iva" size={[12, 12, 12, 4]} validations={[validations.required()]} />
                                    </Row>
                                    <Row>

                                        <MonedasDDL id="Moneda" size={[12, 12, 12, 5]} />
                                    </Row>
                                    <Row>
                                        <input.Text id="Descripcion" size={[12, 12, 12, 12]} validations={[validations.required()]} />
                                    </Row>
                               </Column>
                                    <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <page.SectionList
                                                id={SCCO_BITACORA_AD}
                                                parent={config.id}
                                                level={1}
                                                icon="fas fa-clipboard"
                                                size={[12, 12, 12, 12]}
                                                listHeader={listHeaderBAD}
                                                items={createSuccessfulStoreObject([])} readonly={false}
                                                addRemoveButton={false}
                                                mapFormToEntity={(form: EditForm): any => {
                                                    return form
                                                        .addID()
                                                        .addObject("BitacoraConvenio")
                                                        .addNumber("Importe")
                                                        .addVersion()
                                                        .addEstatus()
                                                        .toObject();
                                                }}
                                                formatter={(index: number, item: any) => {
                                                    return <Row>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item listItem-overflow">
                                                            {!(item && item.BitacoraConvenio) ? "" : <span className="badge" style={{ backgroundColor: item.BitacoraConvenio.Color, marginRight: 2 }}>{item.BitacoraConvenio.Nombre}</span>}&nbsp;
                                                        </Column>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item" style={{ textAlign: "center" }}>{label.formatDate(item.Creado)}</Column>
                                                        <Column size={[12, 12, 12, 3]} className="listItem-default-item" style={{ textAlign: "center" }}>{label.formatMoney(item.Importe)}</Column>
                                                        <buttons.PopOver idParent={config.id} idForm={SCCO_BITACORA_AD} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                                    </Row>
                                                }}>
                                                <Row>
                                                    <ddl.BitacoraConvenioDDL idFormSection={SCCO_BITACORA_AD} size={[12, 12, 6, 6]} />
                                                    <input.Currency id="Importe" idFormSection={SCCO_BITACORA_AD} size={[12, 12, 12, 4]} label="Importe" />
                                                </Row>
                                            </page.SectionList>
                                    </Column>
                                    </Row>
                                </page.OptionSection>    
                            </Column>
                            <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <page.SectionList
                                    id={SCCO_REGISTRO_AR}
                                    parent={config.id}
                                    level={1}
                                    subTitle={"Anticipos y Retenciones"}
                                    icon="fas fa-hand-holding-usd"
                                    size={[12, 12, 12, 12]}
                                    listHeader={listHeaderRAR}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addObject("TipoAnticipo")
                                            .addObject("AnticiposDeducciones")
                                            .addNumber("Importe")
                                            .addNumber("Porcentaje")
                                            .addDate("FechaMovimiento")
                                            .addVersion()
                                            .addEstatus()
                                            .toObject();
                                    }}
                                    formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[12, 12, 12, 3]} >
                                                    {!(item.AnticiposDeducciones && item.AnticiposDeducciones.TipoConcepto) ? "" : <span className="badge" style={{ backgroundColor: item.AnticiposDeducciones.TipoConcepto.Color, marginRight: 2 }}>{item.AnticiposDeducciones.TipoConcepto.Clave}</span>}&nbsp;
                                                    <a target='_blank' rel='noopener noreferrer' href={`#/scco/AnticiposDeducciones/${item.AnticiposDeducciones.ID}`}
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                        <span className="badge badge-info">{!(item.AnticiposDeducciones) ? "" : item.AnticiposDeducciones.TipoConcepto.Nombre}</span>
                                                    </a>
                                                </Column>
                                                <Column size={[12, 12, 12, 2]} className="listItem-center-item"><span className="badge badge-info">{!(item.TipoAnticipo) ? "" : item.TipoAnticipo.Nombre}</span></Column>
                                                <Column size={[12, 12, 12, 2]} className="listItem-center-item" style={{ textAlign: "center" }}>{label.formatDate(item.FechaMovimiento)}</Column>
                                                <Column size={[12, 12, 12, 1]} className="listItem-center-item" style={{ textAlign: "center" }}>{label.formatPercentage(item.Porcentaje)}</Column>
                                                <Column size={[12, 12, 12, 2]}></Column>
                                                <Column size={[12, 12, 12, 1]} className="listItem-center-item" style={{ textAlign: "center" }}>{label.formatMoney(item.Importe)}</Column>
                                            <buttons.PopOver idParent={config.id} idForm={SCCO_REGISTRO_AR} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                        </Row>
                                    }}>
                                    <Row>
                                         <SCCOAnticiposDeduccionesDDL idFormSection={SCCO_REGISTRO_AR} size={[12, 12, 12, 4]} validations={[validations.required()]}  />
                                         <ddl.TipoAnticipoDDL idFormSection={SCCO_REGISTRO_AR} size={[12, 12, 12, 3]} />
                                         <input.Currency id="Importe" idFormSection={SCCO_REGISTRO_AR} size={[12, 12, 12, 3]} label="Importe" />
                                         <input.Currency id="Porcentaje" idFormSection={SCCO_REGISTRO_AR} size={[12, 12, 12, 3]} label="Porcentaje" />
                                         <DatePicker id="FechaMovimiento" idFormSection={SCCO_REGISTRO_AR} size={[12, 12, 12, 3]} maxLength={8} label="Fecha Movimiento" />
                                    </Row>
                                </page.SectionList>
                            </Column>
                            </Row>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <KontrolFileManager modulo={config.id} viewMode={false} multiple={false} />
                            </Column>
                        </Row>
                    </page.OptionSection>   
                </Column> 
            </page.Edit>;
        };
    });

    class RegistroPublico extends page.Base {
        render(): JSX.Element {
            return <page.SectionList
                id={REGISTRO_PUBLICO_PROPIEDAD}
                parent={config.id}
                title={"Registro Público de Propiedad"}
                icon="fas fa-clipboard" level={1} collapsed={false}
                size={[6, 6, 6, 6]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Incidencia"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Folio"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Libro"}</Column>
                        <Column size={[2, 2, 2, 4]} className="list-default-header">{"Fecha de Inscripción"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={true}
                addRemoveButton={false}
                hideNewButton={true}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addNombre()
                        .addEstatus()
                        .addDate("FechaInscripcion")
                        .addObject("Ciudad")
                        .addString("Partida")
                        .addString("Folio")
                        .addString("Libro")
                        .addString("Seccion")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Nombre}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span>{item.Partida}</span></Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span>{item.Folio}</span></Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item"><span>{item.Libro}</span></Column>
                        <Column size={[2, 2, 1, 1]} className="listItem-default-item"><span>{label.formatDate(item.FechaInscripcion)}</span></Column>
                    </Row>;
                }}>
            </page.SectionList>
        }
    }

    class ActaConstitutiva extends page.Base {
        render(): JSX.Element {
            return <page.SectionList
                id={ACTA_CONSTITUTIVA}
                parent={config.id}
                title={"Acta Constitutiva"}
                icon="far fa-clipboard" level={1} collapsed={false}
                size={[6, 6, 6, 6]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Nombre Notario"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Num Notario"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Volumen Acta"}</Column>
                        <Column size={[3, 3, 2, 2]} className="list-default-header">{"Fecha Acta"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={true}
                addRemoveButton={false}
                hideNewButton={true}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addClave()
                        .addEstatus()
                        .addNumber("VolumenActa")
                        .addString("NombreNotario")
                        .addNumber("NumNotario")
                        .addDate("FechaActa")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.VolumenActa}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.NombreNotario}</span></Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.NumNotario}</span></Column>
                        <Column size={[3, 3, 2, 2]} className="listItem-default-item"><span>{label.formatDate(item.FechaActa)}</span></Column>
                    </Row>;
                }}>
            </page.SectionList>
        }
    }

    class SectionContratista extends page.Base {
        render(): JSX.Element {
            return <page.SectionList
                id={CONTRATISTAS}
                title={"Datos Generales"}
                icon="fas fa-id-badge" level={1} collapsed={false}
                hideCollapseButton={true}
                size={[12, 12, 12, 12]}
                listHeader={<div label="Contratista" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 2, 2, 2]} >{"Contratista"}</Column>
                        <Column size={[12, 12, 12, 2]} >{"Tipo de Convenio"}</Column>
                        <Column size={[12, 12, 12, 2]} >{"Representante"}</Column>
                        <Column size={[12, 12, 12, 1]} >{"NSS"}</Column>
                        <Column size={[12, 12, 12, 1]} >{"RFC"}</Column>
                        <Column size={[12, 12, 12, 2]} >{"Direccion"}</Column>
                        <Column size={[12, 12, 12, 2]} >{"Proveedor"}</Column>
                    </Row>
                </div>}
                readonly={true}                
                mapFormToEntity={(form: EditForm): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addVersion()
                        .toObject();

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[12, 12, 12, 2]} className="listItem-center-item">
                            <span style={{ marginRight: 10 }}>{item.Clave} </span>
                            <a target='_blank' rel='noopener noreferrer' href={`#/scco/Contratistas/${item.ID}`}
                                style={{ textDecoration: 'underline' }}
                                className="badge badge-success">
                                <span style={{ marginRight: 10 }}>{item.Nombre} </span>
                            </a>
                        </Column>
                        <Column size={[12, 12, 12, 2]} className="listItem-default-item">   
                           <span className="badge badge-info" style={{ marginRight: 10 }}>{item.TipoConvenio.Nombre}</span>
                        </Column>
                        <Column size={[12, 12, 12, 2]} className="listItem-default-item">
                            <span>{item.Representante}</span>
                        </Column>
                        <Column size={[12, 12, 12, 1]} className="listItem-default-item">
                            <span>{item.NSS}</span>
                        </Column>
                        <Column size={[12, 12, 12, 1]} className="listItem-default-item">
                            <span>{item.RFC}</span>
                        </Column>
                        <Column size={[12, 12, 12, 2]} className="listItem-default-item">
                            <span>{item.Direccion}</span>
                        </Column>
                         <Column size={[12, 12, 12, 2]} className="listItem-default-item">
                            <a target='_blank' rel='noopener noreferrer' href={`#/kontrol/Proveedores/${item.Proveedor.ID}`}
                                style={{ textDecoration: 'underline' }}
                                className="badge badge-success">
                                <span style={{ marginRight: 10 }}>{item.Proveedor.Nombre}</span>
                            </a>
                          </Column>
                    </Row>;
                }}>
            </page.SectionList>
        }
    }


    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={"OBRA CONTRATANTE"}
                        level={1}
                        icon="fas fa-city"
                        collapsed={false}
                        hideCollapseButton={true}
                    >
                        <Row>
                            <label.Label id={"Representante"} size={[12, 12, 12, 3]} label="Representante" />
                            <label.Entidad id={"Compania"} size={[12, 3, 3, 3]} />
                            <label.Entidad id={"Obra"} size={[12, 3, 3, 3]} />
                            <label.TipoObra id={"Obra"} size={[12, 3, 3, 3]} label="Tipo Obra" />  
                        </Row>
                        <Row>
                            <label.Entidad id={"TipoConvenio"} size={[12, 3, 3, 3]} />
                            <label.Label id="Direccion" size={[12, 12, 12, 7]} />
                        </Row>
                        <Row>
                            <label.Telefono id="Telefono" size={[12, 12, 12, 3]} />
                            <label.Label id="Atencion" size={[12, 3, 3, 3]} />
                            <label.Label id="RepresentanteBitacora" size={[12, 3, 3, 3]} />
                            <label.Label id="email" size={[12, 3, 3, 3]} />
                        </Row>
                        <Row>
                            <label.Label id="FechaInicio" size={[12, 12, 12, 3]} maxLength={8} />
                            <label.Label id="FechaFin" size={[12, 12, 12, 3]} maxLength={8} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={"Contratista"}
                                    icon="fas fa-id-badge" level={1} collapsed={false}
                                    hideCollapseButton={false}
                                    size={[12, 12, 12, 12]}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                            <Row>
                                                <SectionContratista />
                                             </Row>
                                             <Row>
                                               <ActaConstitutiva />
                                               <RegistroPublico />
                                            </Row>         
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={"Contrato"}
                                    icon="fas fa-file-contract" level={1} collapsed={false}
                                    hideCollapseButton={false}
                                    size={[12, 3, 3, 3]}>
                                    <Row>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <Row>
                                                <label.Label id="FechaFirma" size={[12, 12, 12, 6]} maxLength={8} />
                                                <label.Currency id={"ImporteContrato"} size={[12, 12, 12, 6]} label="Importe Contrato" />
                                                <label.Label size={[12, 12, 12, 6]} label="Monto Aditiva" />
                                                <label.Label size={[12, 12, 12, 6]} label="Monto Deductiva" />
                                            </Row>  
                                        </Column>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <page.SectionList
                                                id={TestigosContratos}
                                                parent={config.id}
                                                level={1}
                                                icon="fas fa-users"
                                                size={[12, 12, 12, 12]}
                                                listHeader={listHeaderT}
                                                items={createSuccessfulStoreObject([])} readonly={false}
                                                addRemoveButton={false}
                                                mapFormToEntity={(form: EditForm): any => {
                                                    return form
                                                        .addID()
                                                        .addObject("Usuario")
                                                        .addString("Descripcion")
                                                        .addVersion()
                                                        .addEstatus()
                                                        .toObject();
                                                }}
                                                formatter={(index: number, item: any) => {
                                                    return <Row>
                                                        <Column size={[12, 12, 12, 3]} className="listItem-default-item"><span>{item.Descripcion}</span></Column>
                                                        <Column size={[12, 12, 12, 3]} className="listItem-default-item listItem-overflow">
                                                            {!(item && item.Usuario) ? "" : <span className="badge" >{item.Usuario.Nombre}{item.Usuario.Apellidos}</span>}&nbsp;
                                                        </Column>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item listItem-overflow">
                                                            {!(item && item.Usuario) ? "" : <span className="badge" >{item.Usuario.Clave}</span>}&nbsp;
                                                        </Column>
                                                    </Row>
                                                }}>
                                            </page.SectionList>
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={"Convenio"}
                                    icon="fas fa-handshake" level={1} collapsed={false}
                                    hideCollapseButton={false}
                                >
                                    <Row>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <Row>
                                                <label.Clave size={[12, 12, 12, 3]} />
                                                <label.Nombre size={[12, 12, 12, 7]} />
                                                <label.Estatus id="Estatus" size={[12, 12, 12, 2]}/>
                                            </Row>
                                            <Row>
                                                <label.Currency id="Monto" size={[12, 12, 12, 4]} />
                                                <label.Currency id="AditivaAutorizada" size={[12, 12, 12, 4]}  />
                                                <label.Currency id="Iva" size={[12, 12, 12, 4]}  />
                                            </Row>
                                            <Row>
                                                <label.Entidad id={"Contratista"} size={[12, 12, 12, 5]} />
                                                <label.Entidad id={"Moneda"} size={[12, 12, 12, 5]} />
                                            </Row>
                                            <Row>
                                                <label.Descripcion id={"Descripcion"} size={[12, 12, 12, 12]} />
                                            </Row>
                                        </Column>
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}>
                                            <page.SectionList
                                                id={SCCO_BITACORA_AD}
                                                parent={config.id}
                                                level={1}
                                                icon="fas fa-clipboard"
                                                size={[12, 12, 12, 12]}
                                                listHeader={listHeaderBAD}
                                                items={createSuccessfulStoreObject([])} readonly={false}
                                                addRemoveButton={false}
                                                mapFormToEntity={(form: EditForm): any => {
                                                    return form
                                                        .addID()
                                                        .addObject("BitacoraConvenio")
                                                        .addNumber("Importe")
                                                        .addVersion()
                                                        .addEstatus()
                                                        .toObject();
                                                }}
                                                formatter={(index: number, item: any) => {
                                                    return <Row>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item listItem-overflow">
                                                            {!(item && item.BitacoraConvenio) ? "" : <span className="badge" style={{ backgroundColor: item.BitacoraConvenio.Color, marginRight: 2 }}>{item.BitacoraConvenio.Nombre}</span>}&nbsp;
                                                        </Column>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item" style={{ textAlign: "center" }}>{label.formatDate(item.Creado)}</Column>
                                                        <Column size={[12, 12, 12, 4]} className="listItem-default-item" style={{ textAlign: "center" }}>{label.formatMoney(item.Importe)}</Column> 
                                                    </Row>
                                                }}>
                                            </page.SectionList>
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <page.SectionList
                                    id={SCCO_REGISTRO_AR}
                                    parent={config.id}
                                    level={1}
                                    subTitle={"Anticipos y Retenciones"}
                                    icon="fas fa-hand-holding-usd"
                                    size={[12, 12, 12, 12]}
                                    listHeader={listHeaderRAR}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addObject("TipoAnticipo")
                                            .addObject("AnticiposDeducciones") 
                                            .addNumber("Importe")
                                            .addNumber("Porcentaje")
                                            .addVersion()
                                            .addEstatus()
                                            .toObject();
                                    }}
                                    formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[12, 12, 12, 3]} >
                                                     {!(item.AnticiposDeducciones && item.AnticiposDeducciones.TipoConcepto) ? "" : <span className="badge" style={{ backgroundColor: item.AnticiposDeducciones.TipoConcepto.Color, marginRight: 2 }}>{item.AnticiposDeducciones.TipoConcepto.Clave}</span>}&nbsp;
                                                    <a target='_blank' rel='noopener noreferrer' href={`#/scco/AnticiposDeducciones/${item.AnticiposDeducciones.ID}`}
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                     <span className="badge badge-info">{!(item.AnticiposDeducciones) ? "" : item.AnticiposDeducciones.TipoConcepto.Nombre}</span>
                                                    </a>
                                               </Column>
                                                <Column size={[12, 12, 12, 2]} className="listItem-center-item"><span className="badge badge-info">{!(item.TipoAnticipo) ? "" : item.TipoAnticipo.Nombre}</span></Column>
                                                <Column size={[12, 12, 12, 2]} className="listItem-center-item" style={{ textAlign: "center" }}>{label.formatDate(item.FechaMovimiento)}</Column>
                                                <Column size={[12, 12, 12, 1]} className="listItem-center-item" style={{ textAlign: "center" }}>{label.formatPercentage(item.Porcentaje)}</Column>
                                                <Column size={[12, 12, 12, 2]} ></Column>
                                                <Column size={[12, 12, 12, 1]} className="listItem-center-item" style={{ textAlign: "center" }}>{label.formatMoney(item.Importe)}</Column>
                                            </Row>
                                    }}>
                                </page.SectionList> 
                            </Column>
                            </Row>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <KontrolFileManager modulo={config.id} viewMode={false} multiple={false} />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>           
            </page.View>;
        };
    };
};
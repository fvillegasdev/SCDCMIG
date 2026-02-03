namespace EK.Modules.SCV.Pages.ListasMkt {
    "use strict";
    
    const CRITERIOS_ID: string = "Criterios";
    const CLIENTE_ID: string = "ListaCliente";
    const BOLETA_ID: string = "ListaBoleta";
    const USUARIO_ID: string = "ListaUsuario";
    const INFORMACION_LISTA: string = "Lista Marketing";
    const INFO_TIPOORIGEN: string = "InfoTipoOrigen";
    const INFO_TOTAL: string = "Total";
    const RESUMEN: string = "Resumen";

    let Id = -1;
    let Iconos: any = {};
    Iconos[CRITERIOS_ID] = "fa fa-at";
    Iconos[INFORMACION_LISTA] = "fas fa-th-list";
    Iconos[INFO_TIPOORIGEN] = "fa fa-user";

    const config: page.IPageConfig =
        global.createPageConfig("ListasMkt", "scv", [CRITERIOS_ID, INFORMACION_LISTA, INFO_TIPOORIGEN, INFO_TOTAL]);

    interface IListasMktView extends page.IProps {
        tipoOrigen?: any;
        criterios?: DataElement;
        item?: any;
        config?: any;
        elementos?: boolean;
        data?: any;
        modulo?: any;
        acciones?: any;
        opciones?: any;
        entidad?: any;
    };

    export const Edicion: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
            static props: any = (state: any) => {
                var retValue: any = page.props(state);
                retValue.Origen = Forms.getValue("Origen", config.id, state);
                retValue.criterios = state.global.catalogo$Criterios;
                return retValue;
            };

            saveForm(props: page.IProps, item: EditForm): any {

                let CriteriosItem: any = item
                    .addDate("FechaInicial")
                    .addDate("FechaFinal")
                    .addDate("VigenciaInicio")
                    .addDate("VigenciaFin")
                    .addObject("Genero")
                    .addObject("Ciudad")
                    .addObject("EstadoCivil")
                    .addObject("Regimen")
                    .addObject("RangoIngresos")
                    .addObject("Giro")
                    .addObject("Empresa")
                    .addObject("Desarrollo")
                    .addObject("TipoPersona")
                    .addObject("Etapa")
                    .addObject("Posicion")
                    .addObject("AreaOrganizacion")
                    .addObject("Grupo")
                    .toObject();

                let criterios: any[] = [];

                let model: any = item
                    .addID()
                    .addClave()
                    .addNombre()
                    .addEstatus()
                    .addVersion()
                    .addObject("Origen")
                    .toObject();

                return model;
            };

            onEntityLoaded(props: page.IProps): any {
                let lista: any = getData(props.entidad);
                Id = getDataID(props.entidad); 
                let IdListaMkt = Id;


                let parametros: any = global.assign({ id: Id });


                if (Id <= 0 || Id === undefined) {
                    global.dispatchSuccessful("global-page-data", [], CRITERIOS_ID);
                    global.dispatchSuccessful("global-page-data", [], INFORMACION_LISTA);
                    global.dispatchSuccessful("global-page-data", [], INFO_TIPOORIGEN);
                    global.dispatchSuccessful("global-page-data", [], INFO_TOTAL);
                }
                else {
                    if (Id > -1) {
                        props.config.dispatchCatalogoBase("base/scv/ListasMktDet/Get/getConfiguracionCriterio/", parametros, CRITERIOS_ID);
                        props.config.dispatchCatalogoBase("base/scv/ListaMarketingCliente/Get/DetalleListaClientes/", parametros, CLIENTE_ID);
                        props.config.dispatchCatalogoBase("base/scv/ListaMarketingCliente/Get/DetalleListaBoleta/", parametros, BOLETA_ID);                        
                        props.config.dispatchCatalogoBase("base/scv/ListaMarketingCliente/Get/DetalleListaUsuario/", parametros, USUARIO_ID);                        
                    }
                    else {
                        global.dispatchSuccessful("global-page-data", [], CRITERIOS_ID);
                    }
                };
            };

            onWillEntityLoad(id: any, props: page.IProps): void {
                let parametros: any = global.encodeParameters({ id });
                global.dispatchAsync("global-current-entity", "base/scv/ListasMkt/Get/GetByListaMktId/" + parametros);
            };

        componentWillReceiveProps(nextProps: IListasMktView) {
            if (global.hasChanged(this.props.criterios, nextProps.criterios))
            {
                if (global.isSuccessful(nextProps.criterios))
                {
                    let data: any[] = global.getData(nextProps.criterios);
                    if (data && data.length > 0) {
                        let obj: any = {};
                        let entity: any = global.getData(nextProps.entidad);
                        data.forEach((value: any, index: number) => {
                            if (value.CriterioTipo.Clave === "ENT") {
                                obj[value.Criterio.Clave] = {
                                    ID: value.CriterioValor.ID,
                                    Clave: value.CriterioValor.Clave,
                                    Nombre: value.CriterioValor.Nombre,
                                    Descripcion: value.CriterioValor.Nombre
                                };
                            }
                            else if (value.CriterioTipo.Clave === "FEC")
                            {
                                let v: string = value.Valor;
                                if (v) {
                                    obj[value.Criterio.Clave] = new Date(value.Valor);
                                }
                            }
                            else  {
                                obj[value.Criterio.Clave] = value.Valor;
                            };
                        });
                        config.setEntity(global.assign(entity, obj));
                    };
                };
            };
        };

        render(): JSX.Element {
            let tipoOrigen: any = Forms.getValue("Origen", config.id);
            let cliente: boolean = false;
            let contacto: boolean = false;
            let boleta: boolean = false;
            let prospecto: boolean = false;
            let usuario: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                tipoOrigen = global.getData(this.props.entidad).Origen;

                if (!tipoOrigen || tipoOrigen.ID < 0) {
                    tipoOrigen = Forms.getValue("Origen", config.id);
                };
            };
            if (tipoOrigen !== undefined && tipoOrigen !== null) {
                cliente = tipoOrigen.Clave === "CLI";
                contacto = tipoOrigen.Clave === "CON";
                boleta = tipoOrigen.Clave === "BP";
                prospecto = tipoOrigen.Clave === "PROS";
                usuario = tipoOrigen.Clave === "USR";
            };

            return <page.Main {...config} pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                onWillEntityLoad={this.onWillEntityLoad}
                onSave={this.saveForm}
            >
                {cliente || prospecto || contacto === true ? <Editcliente /> : null}
                {cliente || prospecto || contacto === true ? <Viewcliente /> : null}
                {boleta === true ? <Viewboleta /> : null}
                {boleta === true ? <Editboleta /> : null}
                {usuario === true ? <Viewusuario /> : null}
                {usuario === true ? <Editusuario /> : null}
                {!tipoOrigen ? <EditTipoOrigen /> : null}

            </page.Main>;
        };
    });


    const EditTipoOrigen: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoOrigen = Forms.getValue("Origen", config.id, state);
            return retValue;
        };
        onSelectTipoOrigen(info: any): void {
            let tp: any = Forms.getValue("Origen", INFO_TIPOORIGEN);
            Forms.updateFormElement(config.id, "Origen", tp);
        };
        shouldComponentUpdate(nextProps: IListasMktView, nextState: IListasMktView): boolean {
            return global.hasChanged(this.props.tipoOrigen, nextProps.tipoOrigen);
        };
        render(): JSX.Element {
            let tipoOrigen: any = Forms.getValue("Origen", config.id);
            if (tipoOrigen !== undefined && tipoOrigen !== null) {
                return null;
            };
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 6, 6]}>
                        <page.OptionSection
                            id={INFO_TIPOORIGEN}
                            icon="fa fa-user"
                            collapsed={false}
                            hideCollapseButton={true} >
                            <SectionButtons>
                                <buttons.Button icon="fa fa-arrow-right" color="white" iconOnly={true} className="btn-ico-ek" onClick={this.onSelectTipoOrigen} info={null} />
                            </SectionButtons>
                            <ddl.OrigenDDL idFormSection={INFO_TIPOORIGEN} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });



    export const Editcliente: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        constructor(props: IListasMktView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            criterios: state.global.catalogo$Criterios,
            criteriosValor: state.global.catalogo$Criterios,
            data: state.global.catalogo$Criterios,
            acciones: state.global.catalogo$Criterios,
            entidad: state.global.currentEntity
        });

        componentDidMount(): any {
        };
        

        shouldComponentUpdate(nextProps: IListasMktView, nextState: IListasMktView): boolean {
            return true; 
        };

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={INFORMACION_LISTA}
                        subTitle={INFORMACION_LISTA}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true} >
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={40} />
                            <input.Nombre size={[10, 10, 4, 4]} maxLength={150} />
                            <label.Entidad id="Origen" size={[12, 12, 3, 3]} />
                            <checkBox.Status size={[6, 1, 1, 1]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={INFO_TOTAL}
                                        subTitle={RESUMEN}
                                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false} level={1}>
                                        <Row>
                                            <Column >
                                                <Row>
                                                    <label.Label id="Alcance" size={[12, 12, 10, 10]} />
                                                    <label.Fecha id="fGenerada" size={[12, 12, 10, 10]} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>

                            <Column size={[12, 12, 9, 9]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        subTitle={CRITERIOS_ID}
                                        icon="icon-settings" collapsed={false} hideCollapseButton={false} level={1}
                                        parent={config.id}
                                        idParent={config.id}
                                        items={createSuccessfulStoreObject([])} >
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <DatePicker id="FechaInicial" size={[12, 12, 6, 6]} validations={[ validations.lessEqualThan("FechaFinal", "")]} />
                                                    <DatePicker id="FechaFinal" size={[12, 12, 6, 6]} validations={[ validations.greaterEqualThan("FechaInicial", "")]} />                                                
                                                </Row>
                                                <Row>
                                                    <ddl.GenerosDDL id="Genero" size={[12, 12, 6, 6]} addNewItem={"VT"}/>
                                                    <select.Estados id="Ciudad" size={[12, 12, 6, 6]}  />
                                                </Row>
                                                <Row>
                                                    <ddl.EstadoCivilDDL id="EstadoCivil" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                    <ddl.RegimenDLL id="Regimen" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                                <Row>
                                                    <ddl.RangosIngresosDDL id="RangoIngresos" size={[12, 12, 6, 6]} addNewItem={"VT"}  />
                                                    <ddl.GirosDDL id="Giro" size={[12, 12, 6, 6]} addNewItem={"VT"}/>
                                                </Row>
                                                <Row>
                                                    <ddl.EmpresasDLL id="Empresa" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                    <ddl.DesarrollosDDL id="Desarrollo" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                                <Row>
                                                    <ddl.TiposPersonaDDL id="TipoPersona" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                    <ddl.SCVEtapasDDL Id="Etapa" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                                <Row>
                                                    <ddl.EstatusSeguimientoDDL id="EstatusSeguimiento" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                    <ddl.VctoCobranzaDDL id="VctoCobranza" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                                <Row>
                                                    <ddl.AvanceConstruccionDDL id="AvanceConstruccion" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });


    export const Viewcliente: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        constructor(props: IListasMktView) {
            super(props);
        }

        static props: any = (state: any) => ({
            config: page.props(state),
            criterios: state.global.catalogo$Criterios,
            elementos: state.global.ListasMktDet,
            entidad: state.global.currentEntity

        });

        onSelectModal(): void {
            //Abrimos el Modal
            let modalObject: any = $("#modalCliente");
            modalObject.modal();
        }


        render(): JSX.Element {
            let onClicRefresh: any = () => {
                let id = getDataID(this.props.entidad);
                let entidad = getData(this.props.entidad);
                let origen = entidad.Origen.Clave;
                let params: any = global.encodeParameters({ id, origen });
                let parametros: any = global.encodeParameters({ id });
                global.dispatchToSlot(INFO_TOTAL, "global-current-entity", "base/scv/ListasMkt/Get/actualizarDetalle/" + params);
                let parameters: any = global.assign({ id: id });
                config.dispatchCatalogoBase("base/scv/ListaMarketingCliente/Get/DetalleListaClientes/", parameters, CLIENTE_ID);
                global.dispatchAsync("global-current-entity", "base/scv/ListasMkt/Get/GetByListaMktId/" + parametros);
            }

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={INFORMACION_LISTA}
                        subTitle={INFORMACION_LISTA}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[10, 10, 4, 4]} />
                            <label.Entidad id="Origen" size={[12, 12, 3, 3]} />
                            <label.Estatus size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={INFO_TOTAL}
                                        subTitle={RESUMEN}
                                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false} level={1}>
                                        <SectionButtons>
                                            <buttons.Button icon="fas fa-sync-alt" color="white" iconOnly={true} className="btn-ico-ek" info={null} onClick={onClicRefresh} />
                                            <buttons.Button icon="fas fa-external-link-alt" color="white" iconOnly={true} className="btn-ico-ek" info={null} onClick={this.onSelectModal} />
                                        </SectionButtons>   
                                        <Row>
                                            <Column>
                                                <Row>
                                                    <label.Label id="Alcance" size={[12, 12, 10, 10]} />
                                                    <label.Fecha id="fGenerada" size={[12, 12, 10, 10]} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>

                            <Column size={[12, 12, 9, 9]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={CRITERIOS_ID}
                                        subTitle={CRITERIOS_ID}
                                        icon="icon-settings" collapsed={false} hideCollapseButton={false} level={1} items={createSuccessfulStoreObject([])}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <label.Label id="FechaInicial" />
                                                    <label.Label id="FechaFinal" />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="Genero" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Ciudad" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="EstadoCivil" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Regimen" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="RangoIngresos" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Giro" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="Empresa" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Desarrollo" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="TipoPersona" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Etapa" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="EstatusSeguimiento" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="VctoCobranza" size={[12, 12, 6, 6]} />
                                                </Row>                                                <Row>
                                                    <label.Entidad id="AvanceConstruccion" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <modal.Modal id="modalCliente" header={"LISTA MARKETING"} addDefaultCloseFooter={false}>
                                                        <ListaMarketingClienteModal />
                                                   </modal.Modal>
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View >;
        };
    });

    export const Viewboleta: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        constructor(props: IListasMktView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            criterios: state.global.catalogo$Criterios,
            elementos: state.global.ListasMktDet,
            entidad: state.global.currentEntity
        });

        onSelectModal(): void {
            //Abrimos el Modal
            let modalObject: any = $("#modalBoleta");
            modalObject.modal();
        }

        render(): JSX.Element {
            let onClicRefresh: any = () => {
                let id = getDataID(this.props.entidad);
                let entidad = getData(this.props.entidad);
                let origen = entidad.Origen.Clave;
                let params: any = global.encodeParameters({ id, origen });
                let parametros: any = global.encodeParameters({ id });
                global.dispatchToSlot(INFO_TOTAL, "global-current-entity", "base/scv/ListasMkt/Get/actualizarDetalle/" + params);
                let parameters: any = global.assign({ id: id });
                config.dispatchCatalogoBase("base/scv/ListaMarketingCliente/Get/DetalleListaBoleta/", parameters, BOLETA_ID);
                global.dispatchAsync("global-current-entity", "base/scv/ListasMkt/Get/GetByListaMktId/" + parametros);
            }
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={INFORMACION_LISTA}
                        subTitle={INFORMACION_LISTA}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[10, 10, 4, 4]} />
                            <label.Entidad id="Origen" size={[12, 12, 3, 3]} />
                            <label.Estatus size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={INFO_TOTAL}
                                        subTitle={RESUMEN}
                                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false} level={1}>
                                        <SectionButtons>
                                            <buttons.Button icon="fas fa-sync-alt" color="white" iconOnly={true} className="btn-ico-ek" info={null} onClick={onClicRefresh} />
                                            <buttons.Button icon="fas fa-external-link-alt" color="white" iconOnly={true} className="btn-ico-ek" info={null} onClick={this.onSelectModal} />
                                        </SectionButtons>
                                        <Row>
                                            <Column>
                                                <Row>
                                                    <label.Label id="Alcance" size={[12, 12, 10, 10]} />
                                                    <label.Fecha id="fGenerada" size={[12, 12, 10, 10]} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>

                            <Column size={[12, 12, 9, 9]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={CRITERIOS_ID}
                                        subTitle={CRITERIOS_ID}
                                        icon="icon-settings" collapsed={false} hideCollapseButton={false} level={1} items={createSuccessfulStoreObject([])}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <label.Fecha id="FechaInicial"  />
                                                    <label.Fecha id="FechaFinal" />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="Genero" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Ciudad" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="Giro" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="Desarrollo"  size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="TipoPersona"  size={[12, 12, 6, 6]} />
                                                </Row>
                                                <modal.Modal id="modalBoleta" header={"LISTA MARKETING"} addDefaultCloseFooter={false}>
                                                    <ListaMarketingBoletaModal />
                                                </modal.Modal>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View >;
        };
    });


    export const Editboleta: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        constructor(props: IListasMktView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            criterios: state.global.catalogo$Criterios,
            criteriosValor: state.global.catalogo$Criterios,
            data: state.global.catalogo$Criterios,
            acciones: state.global.catalogo$Criterios,
            entidad: state.global.currentEntity
        });


        shouldComponentUpdate(nextProps: IListasMktView, nextState: IListasMktView): boolean {
            return global.hasChanged(this.props.tipoOrigen, nextProps.tipoOrigen);
        };

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={INFORMACION_LISTA}
                        subTitle={INFORMACION_LISTA}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true} >
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={40} />
                            <input.Nombre size={[10, 10, 4, 4]} maxLength={150} />
                            <label.Entidad id="Origen" size={[12, 12, 3, 3]} />
                            <checkBox.Status size={[6, 1, 1, 1]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={INFO_TOTAL}
                                        subTitle={RESUMEN}
                                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false} level={1}>
                                        <Row>
                                            <Column >
                                                <Row>
                                                    <label.Label id="Alcance" size={[12, 12, 10, 10]} />
                                                    <label.Fecha id="fGenerada" size={[12, 12, 10, 10]} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>

                            <Column size={[12, 12, 9, 9]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={CRITERIOS_ID}
                                        subTitle={CRITERIOS_ID}
                                        icon="icon-settings" collapsed={false} hideCollapseButton={false} level={1}
                                        parent={config.id}
                                        idParent={config.id}
                                        items={createSuccessfulStoreObject([])} >
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <DatePicker id="FechaInicial" type="date" size={[12, 12, 6, 6]} validations={[validations.lessEqualThan("FechaFinal", "")]} />
                                                    <DatePicker id="FechaFinal" type="date" size={[12, 12, 6, 6]} validations={[validations.greaterEqualThan("FechaInicial", "")]} />
                                                </Row>
                                                <Row>
                                                    <ddl.GenerosDDL id="Genero" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                    <select.Estados id="Ciudad" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <ddl.GirosDDL id="Giro" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                    <ddl.DesarrollosDDL id="Desarrollo" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                                <Row>
                                                    <ddl.TiposPersonaDDL id="TipoPersona" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>

                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    export const Viewusuario: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        constructor(props: IListasMktView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            criterios: state.global.catalogo$Criterios,
            elementos: state.global.ListasMktDet,
            entidad: state.global.currentEntity
        });

        onSelectModal(): void {
            //Abrimos el Modal
            let modalObject: any = $("#modalUsuario");
            modalObject.modal();
        }

        render(): JSX.Element {
            let onClicRefresh: any = () => {
                let id = getDataID(this.props.entidad);
                let entidad = getData(this.props.entidad);
                let origen = entidad.Origen.Clave;
                let params: any = global.encodeParameters({ id, origen });
                let parametros: any = global.encodeParameters({ id });
                global.dispatchToSlot(INFO_TOTAL, "global-current-entity", "base/scv/ListasMkt/Get/actualizarDetalle/" + params);
                let parameters: any = global.assign({ id: id });
                config.dispatchCatalogoBase("base/scv/ListaMarketingCliente/Get/DetalleListaUsuario/", parameters, USUARIO_ID);
                global.dispatchAsync("global-current-entity", "base/scv/ListasMkt/Get/GetByListaMktId/" + parametros);
            }
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={INFORMACION_LISTA}
                        subTitle={INFORMACION_LISTA}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[10, 10, 4, 4]} />
                            <label.Entidad id="Origen" size={[12, 12, 3, 3]} />
                            <label.Estatus size={[2, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={INFO_TOTAL}
                                        subTitle={RESUMEN}
                                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false} level={1}>
                                        <SectionButtons>
                                            <buttons.Button icon="fas fa-sync-alt" color="white" iconOnly={true} className="btn-ico-ek" info={null} onClick={onClicRefresh} />
                                            <buttons.Button icon="fas fa-external-link-alt" color="white" iconOnly={true} className="btn-ico-ek" info={null} onClick={this.onSelectModal} />
                                        </SectionButtons>
                                        <Row>
                                            <Column>
                                                <Row>
                                                    <label.Label id="Alcance" size={[12, 12, 10, 10]} />
                                                    <label.Fecha id="fGenerada" size={[12, 12, 10, 10]} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>

                            <Column size={[12, 12, 9, 9]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={CRITERIOS_ID}
                                        subTitle={CRITERIOS_ID}
                                        icon="icon-settings" collapsed={false} hideCollapseButton={false} level={1} items={createSuccessfulStoreObject([])}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <label.Fecha id="VigenciaInicio" />
                                                    <label.Fecha id="VigenciaFin" />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="Posicion" size={[12, 12, 6, 6]} />
                                                    <label.Entidad id="AreaOrganizacion" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <Row>
                                                    <label.Entidad id="Grupo" size={[12, 12, 6, 6]} />
                                                </Row>
                                                <modal.Modal id="modalUsuario" header={"LISTA MARKETING"} addDefaultCloseFooter={false}>
                                                    <ListaMarketingUsuarioModal />
                                                </modal.Modal>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View >;
        };
    });

    export const Editusuario: any = global.connect(class extends React.Component<IListasMktView, IListasMktView> {
        constructor(props: IListasMktView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            criterios: state.global.catalogo$Criterios,
            criteriosValor: state.global.catalogo$Criterios,
            data: state.global.catalogo$Criterios,
            acciones: state.global.catalogo$Criterios,
            entidad: state.global.currentEntity
        });


        shouldComponentUpdate(nextProps: IListasMktView, nextState: IListasMktView): boolean {
            return global.hasChanged(this.props.tipoOrigen, nextProps.tipoOrigen);
        };

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={INFORMACION_LISTA}
                        subTitle={INFORMACION_LISTA}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true} >
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={40} />
                            <input.Nombre size={[10, 10, 4, 4]} maxLength={150} />
                            <label.Entidad id="Origen" size={[12, 12, 3, 3]} />
                            <checkBox.Status size={[6, 1, 1, 1]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={INFO_TOTAL}
                                        subTitle={RESUMEN}
                                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false} level={1}>
                                        <Row>
                                            <Column >
                                                <Row>
                                                    <label.Label id="Alcance" size={[12, 12, 10, 10]} />
                                                    <label.Fecha id="fGenerada" size={[12, 12, 10, 10]} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>

                            <Column size={[12, 12, 9, 9]}>
                                <Row style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20 }}>
                                    <page.OptionSection
                                        id={CRITERIOS_ID}
                                        subTitle={CRITERIOS_ID}
                                        icon="icon-settings" collapsed={false} hideCollapseButton={false} level={1}
                                        parent={config.id}
                                        idParent={config.id}
                                        items={createSuccessfulStoreObject([])} >
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <Row>
                                                    <DatePicker id="VigenciaInicio" type="date" size={[12, 12, 6, 6]} validations={[validations.lessEqualThan("VigenciaFin", "")]} />
                                                    <DatePicker id="VigenciaFin" type="date" size={[12, 12, 6, 6]} validations={[validations.greaterEqualThan("VigenciaInicio", "")]} />
                                                </Row>
                                                <Row>
                                                    <ddl.PosicionesActivasDDL label="Posicion" id={"Posicion"} size={[12, 12, 6, 6]} addNewItem={"VT"}  />
                                                    <ddl.AreasOrganizacionDDL id="AreaOrganizacion" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                                <Row>
                                                    <ddl.GruposDDL id="Grupo" size={[12, 12, 6, 6]} addNewItem={"VT"} />
                                                </Row>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

}
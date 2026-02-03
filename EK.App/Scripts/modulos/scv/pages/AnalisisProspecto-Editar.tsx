namespace EK.Modules.SCV.Pages.AnalisisProspecto {
    "use strict";

    const REF_LABORALES_ID: string = "RefLaborales";
    const REF_PERSONALES_ID: string = "Referencias";
    const INFORMACION_ADICIONAL: string = "InformacionAdicional";
    const INFO_TIPOPERSONA: string = "InfoTipoPersona";
    const ASESORES: string = "Asesores";
    const TELEFONOS_ID: string = "Telefonos";
    const CORREOS_ID: string = "Correos";
    const GEO_ID: string = "ClienteGeo";
    const BOLETAS: string = "Boletas";
    const idModalGeo: string = "modal" + GEO_ID;
    //
    let Iconos: any = {};
    Iconos[CORREOS_ID] = "fa fa-at";
    Iconos[TELEFONOS_ID] = "fas fa-phone";
    Iconos[ASESORES] = "fa fa-users";
    Iconos[REF_LABORALES_ID] = "fa fa-industry";
    Iconos[REF_PERSONALES_ID] = "far fa-address-book";
    Iconos[BOLETAS] = "fa fa-sticky-note";

    const config: page.IPageConfig =
        global.createPageConfig("scvclientes", "scv", [REF_LABORALES_ID,
            REF_PERSONALES_ID,
            INFORMACION_ADICIONAL,
            ASESORES,
            TELEFONOS_ID, CORREOS_ID, BOLETAS]);

    const setGeoInfo: (cliente: any, readOnly?: boolean) => void = (cliente: any, readOnly?: boolean): void => {
        let mode: string = "read";
        if (readOnly === false) {
            mode = "select";
        };
        //
        if (!cliente) {
            global.setModalData(idModalGeo, null);
            return;
        };
        //
        let fullAddress: string = undefined;
        let geoLocalizacion: string = undefined;
        //
        if (cliente.Geolocalizacion) {
            geoLocalizacion = cliente.Geolocalizacion;
        }
        else {
            fullAddress = [cliente.Domicilio, " ", cliente.NumExterior, ", ", cliente.Asentamiento.Nombre, ", ", cliente.Asentamiento.Localidad.Nombre, ", ", cliente.Asentamiento.CP].join("");
        }
        global.setModalData(idModalGeo, {
            mode: mode,
            geolocalizacion: geoLocalizacion,
            address: fullAddress,
            marker: {
                icon: "/Content/Img/maps/man_red_circle.png",
                markerType: "prospecto",
                title: "Prospecto/Cliente"
            },
            onMapLocationChanged: (p: any) => {
                Forms.updateFormElement(config.id, "Geolocalizacion", p);
            }
        });
    };

    const getValidations: (validations: any[]) => any = (validations: any[]) : any => {
        let i_: number = 0;
        let validationList: any[] = [];
        validations.forEach((value: any, index: number) => {
            if (value != null && value != undefined) {
                validationList.push(value);
            }
        });
        return validationList.length > 0 ? validationList : null;
    };

    interface IPageEditProps extends page.IProps {
        tipoPersona?: any;
        item?: any;
        idDesarrollo?: number;
        formConfiguration: any;
    };


    export const Edicion: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            return retValue;
        };
        idModalGeo: string = "modal" + GEO_ID;
        saveForm(props: page.IProps, item: EditForm): any
        {
            let asesores: any = Forms.getValue(ASESORES, config.id);
            let dataAsesores = getData(asesores);

            /*Se mantiene su estado como true se mostrara alerta*/
            let validacionAsesor: boolean = true;
            let cantidadEliminados: number = 0;


            /*Si no tengo asesores agregado no se realiza validacion*/
            if (!dataAsesores || dataAsesores == undefined || (dataAsesores && dataAsesores.length == 0)) {
                validacionAsesor = false;
            }
            else
            {

                /*Si tengo asesores y almenos no hay uno marcado como titular marcar alerta*/
                getData(asesores).forEach((value: any, index: number) =>
                {
                    if (value._eliminado == true)
                    {
                        cantidadEliminados++;
                    }
                    else if (value.Titular)
                    {
                        validacionAsesor = false;
                    }
                });

            }

            if (dataAsesores.length == cantidadEliminados)
            {
                validacionAsesor = false;
            }
            /*no pasa la validacion*/
            if (validacionAsesor)
            {
                warning("Se debe marcar almenos un agente como titular");
                return null;
            }



            let modelInfo: any = item;
            let model: any = item
                .addID()
                //.addClave()

                .addObject("TipoPersona")
                .addString("ApellidoMaterno")
                .addString("ApellidoPaterno")
                .addString("Nombre")
                .addEstatus("Estatus")
                .addObject("Genero")
                .addDate("FechaNacimiento")
                .addObject("EstadoOrigen")
                .addObject("PaisOrigen")
                .addString("RFC")
                .addString("CURP")
                .addString("NSS")
                .addObject("EstadoCivil")
                .addObject("RegimenConyugal")
                .addObject("RangoIngresos")
                .addObject("RepresentanteLegal")
                .addString("Domicilio")
                .addString("Geolocalizacion")
                .addString("NumInterior")
                .addString("NumExterior")
                .addString("AntiguedadDomicilio")
                .addObject("Asentamiento")
                .addString("Email")
                .addString("Telefono")
                .addString("Celular")
                .addObject("Giro")
                .addObject(REF_LABORALES_ID)
                .addObject(REF_PERSONALES_ID)
                .addObjectCustomForm('CUSTOMFORM')
                .addObject(INFORMACION_ADICIONAL)
                .addObject(ASESORES)
                .addObject(TELEFONOS_ID)
                .addObject(CORREOS_ID)


                .addObject(BOLETAS)

                .addBoolean("Discapacidad")
                .addBoolean("Prospecto")
                .addDate("FechaCliente")

                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {

            let cliente: any = getData(props.entidad);
            let idCliente: number = getDataID(props.entidad);

            if (idCliente <= 0 || idCliente === undefined) {
                global.dispatchSuccessful("global-page-data", [], BOLETAS);
                global.dispatchSuccessful("global-page-data", [], REF_LABORALES_ID);
                global.dispatchSuccessful("global-page-data", [], REF_PERSONALES_ID);
                global.dispatchSuccessful("global-page-data", [], ASESORES);
                global.dispatchSuccessful("global-page-data", [], TELEFONOS_ID);
                global.dispatchSuccessful("global-page-data", [], CORREOS_ID);
                //
                setGeoInfo(null);
            }
            else {
                let ClaveTipoContacto: string = "CORREO";
                let parametros: any = global.assign({idCliente , ClaveTipoContacto});
                props.config.dispatchCatalogoBase("base/kontrol/AnalisisProspecto/Get/GetContactoClientes/", parametros, CORREOS_ID);
                parametros = global.assign({ idCliente, ClaveTipoContacto:"TELEFONO" });
                props.config.dispatchCatalogoBase("base/kontrol/AnalisisProspecto/Get/GetContactoClientes/", parametros, TELEFONOS_ID);
                parametros = global.assign({ idCliente});
                props.config.dispatchCatalogoBase("base/kontrol/AnalisisProspecto/Get/GetAsesoresClientes/", parametros, ASESORES);
                props.config.dispatchCatalogoBase("base/kontrol/AnalisisProspecto/Get/GetReferencias/", parametros, REF_PERSONALES_ID);
                props.config.dispatchCatalogoBase("base/kontrol/AnalisisProspecto/Get/GetReferenciasLaborales/", parametros, REF_LABORALES_ID);

                props.config.dispatchCatalogoBase("base/scv/AnalisisProspecto/Get/GetBoletasProspeccionPorCliente/", parametros, BOLETAS);
                //
                setGeoInfo(cliente);

                if (cliente.TipoPersona)
                {
                    EK.UX.getCurrentConfiguration(config.id + cliente.TipoPersona.Clave);
                }
            };
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            let parametros: any = global.encodeParameters({ id });
            global.dispatchAsync("global-current-entity", "base/kontrol/AnalisisProspecto/Get/GetByClienteId/"+ parametros);
        };
        getAddress(): string {
            let cliente: any = global.getData(this.props.entidad);
            if (cliente.ID > 0) {
                return global.getData(this.props.entidad).Domicilio + ' ' + global.getData(this.props.entidad).NumExterior + ', ' + global.getData(this.props.entidad).Asentamiento.Nombre + ', ' + global.getData(this.props.entidad).Asentamiento.Localidad.Nombre + ', ' + global.getData(this.props.entidad).Asentamiento.CP;
            }
            else {
                return null;
            };
        };
        render(): JSX.Element {
            let tipoPersona: any = Forms.getValue("TipoPersona", config.id);
            let personaFisica: boolean = false;
            let personaMoral: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {

                tipoPersona = global.getData(this.props.entidad).TipoPersona;

                if (!tipoPersona || tipoPersona.ID < 0) {
                    tipoPersona = Forms.getValue("TipoPersona", config.id);
                };
            };
            if (tipoPersona !== undefined && tipoPersona !== null) {
                personaFisica = tipoPersona.Clave === "F";
                personaMoral = tipoPersona.Clave === "M";
            };
            //let urlAddress: string;
            //if (global.isSuccessful(this.props.entidad)) {
            //    let geo: string = global.getData(this.props.entidad).Geolocalizacion;
            //    let isGeo: boolean;
            //    if (geo !== undefined) {
            //        if (geo !== null) {
            //            if (geo.length > 0)
            //                isGeo = true;
            //        }
            //        else isGeo = false;
            //    } else isGeo = false;
            //    let fullAddress: string = isGeo ? geo : this.getAddress();
            //    urlAddress = "/SCV/Clientes/Address/" + fullAddress + "/" + isGeo;
            //}
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                onWillEntityLoad={this.onWillEntityLoad}
                onSave={this.saveForm}
                allowDelete={false}
                allowEdit={false}
                allowNew={false}
                allowView={true}>
                {personaFisica === true ? <ViewFisica /> : null}
                {personaMoral === true ? <ViewMoral /> : null}
                {personaFisica === true ? <EditFisica /> : null}
                {personaMoral === true ? <EditMoral /> : null}
                {!tipoPersona ? <EditTipoPersona /> : null}

            </page.Main>;
        };
    });
    const EditTipoPersona: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            return retValue;
        };
        onSelectTipoPersona(info: any): void {
            let tp: any = Forms.getValue("TipoPersona", INFO_TIPOPERSONA);
            Forms.updateFormElement(config.id, "TipoPersona", tp);
            EK.UX.getCurrentConfiguration(config.id + tp.Clave);
        };
        shouldComponentUpdate(nextProps: IPageEditProps, nextState: IPageEditProps): boolean {
            return global.hasChanged(this.props.tipoPersona, nextProps.tipoPersona);
        };
        render(): JSX.Element {
            let tipoPersona: any = Forms.getValue("TipoPersona", config.id);
            if (tipoPersona !== undefined && tipoPersona !== null) {
                return null;
            };
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 6, 6]}>
                        <page.OptionSection
                            id={INFO_TIPOPERSONA}
                            icon="fa fa-user"
                            collapsed={false}
                            hideCollapseButton={true}>
                            <SectionButtons>
                                <buttons.Button icon="fa fa-arrow-right" color="white" iconOnly={true} className="btn-ico-ek" onClick={this.onSelectTipoPersona} info={null} />
                            </SectionButtons>
                            <ddl.TiposPersonaDDL agregarnuevoItem={false}  idFormSection={INFO_TIPOPERSONA} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });

    const EditFisica: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            retValue.formConfiguration = state.global.currentEntityConfiguration$scvclientesF;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IPageEditProps, nextState: IPageEditProps): boolean {
            return global.hasChanged(this.props.tipoPersona, nextProps.tipoPersona) ||
                global.hasChanged(this.props.formConfiguration, nextProps.formConfiguration);
        };
        render(): JSX.Element {
            let tipoPersona: any = this.props.tipoPersona;
            if (tipoPersona === undefined || tipoPersona === null) {
                return null;
            };

            if (!isSuccessful(this.props.formConfiguration)) {
                return null;
            }

            let monedaRI: any;
            let entidad: any = this.props.config.getEntity();
            let entidadData: any = global.getData(entidad);
            let tipoPersonaNombre: string = "";
            if (global.isSuccessful(entidad)) {
                if (entidadData.RangoIngresos) {
                    monedaRI = entidadData.RangoIngresos.Moneda;
                };
                if (this.props.tipoPersona) {
                    tipoPersonaNombre = this.props.tipoPersona.Nombre;
                };
            };
            let rfcFn: any = (btn: any, input: any, props: input.IInputProps) => {
                let f: EditForm = Forms.getForm();
                let p: string = f
                    .addString("ApellidoPaterno")
                    .addString("ApellidoMaterno")
                    .addString("Nombre")
                    .addDate("FechaNacimiento")
                    .addObject("Genero")
                    .addObject("EstadoOrigen")
                    .addObject("PaisOrigen")
                    .toObject();
                global.asyncPost("SCV/Clientes/" + props.id, p, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        btn.addClass("disabled");
                        btn.find("i").addClass("fa-spin");
                        input.attr("disabled", true);
                    }
                    else {
                        btn.removeClass("disabled");
                        btn.find("i").removeClass("fa-spin");
                        input.attr("disabled", false);

                        if (status === AsyncActionTypeEnum.successful) {
                            Forms.updateFormElement(config.id, props.id, data);
                            input.focus();

                        };
                    };
                });
            };
            let estatusCliente: string = entidadData && entidadData.EstatusCliente ? entidadData.EstatusCliente.Nombre : "";


            /*Configuracion del formulario*/
            let mainForm: any[] = [];
            let additionalForm: any[] = [];
            let infoForm: any[] = [];



            let formConfiguration: any = getData(this.props.formConfiguration)
            let formObjConfig: any = EK.UX.formatObjConfig(formConfiguration)

            let mainFields: any = {
                Nombre: <input.Nombre key={"Nombre"} size={formObjConfig.Nombre.Size} idForm={config.id} maxLength={50} validations={getValidations([formObjConfig.Nombre.ValidacionRequerido, validations.name("Capture un nombre válido")])} />,
                ApellidoPaterno: <input.Text key={"ApellidoPaterno"} id="ApellidoPaterno" size={formObjConfig.ApellidoPaterno.Size} maxLength={50} validations={getValidations([formObjConfig.ApellidoPaterno.ValidacionRequerido, validations.name("Capture un apellido válido")])} />,
                ApellidoMaterno: <input.Text key={"ApellidoMaterno"} id="ApellidoMaterno" size={formObjConfig.ApellidoMaterno.Size} maxLength={50} validations={getValidations([formObjConfig.ApellidoMaterno.ValidacionRequerido, validations.name("Capture un apellido válido")])} />,
                FechaNacimiento: <DatePicker key={"FechaNacimiento"} id="FechaNacimiento" placeHolder={"DD/MM/AAAA"} size={formObjConfig.FechaNacimiento.Size} validations={getValidations([formObjConfig.FechaNacimiento.ValidacionRequerido])} />,
                Estatus: <checkBox.Status key={"Estatus"} size={formObjConfig.Estatus.Size} />,
                Genero: <GenerosDDL key={"Genero"} size={formObjConfig.Genero.Size} validations={getValidations([formObjConfig.Genero.ValidacionRequerido])} />,
                EstadoOrigen: <select.Estados key={"EstadoOrigen"} id="EstadoOrigen" idForm={config.id} size={formObjConfig.EstadoOrigen.Size} validations={getValidations([formObjConfig.EstadoOrigen.ValidacionRequerido])} />,
                PaisOrigen: <ddl.PaisOrigenDLL key={"PaisOrigen"} id="PaisOrigen" idForm={config.id} size={formObjConfig.PaisOrigen.Size} addNewItem={"SO"} />,
                RFC: <input.Unique idElement={"RFC"} key={"RFC"} id="RFC" size={formObjConfig.RFC.Size} buttonClick={rfcFn} validations={getValidations([formObjConfig.RFC.ValidacionRequerido])} />,
                CURP: <input.Unique idElement={"CURP"} key={"CURP"} id="CURP" size={formObjConfig.CURP.Size} buttonClick={rfcFn} validations={getValidations([formObjConfig.CURP.ValidacionRequerido])} />,
                NSS: <input.NSS size={formObjConfig.NSS.Size} key={"NSS"} validations={getValidations([formObjConfig.NSS.ValidacionRequerido, validations.length("Este campo no puede ser menor de 11 digitos.", 11)])} />,
                Discapacidad: <CheckBox id="Discapacidad" key={"Discapacidad"} size={formObjConfig.Discapacidad.Size} icon={"fa fa-wheelchair"} label=" " />,
                EstadoCivil: <EstadoCivilDLL key={"EstadoCivil"} size={formObjConfig.EstadoCivil.Size} validations={getValidations([formObjConfig.EstadoCivil.ValidacionRequerido])} />,
                RegimenConyugal: <RegimenDLL key={"RegimenConyugal"} size={formObjConfig.RegimenConyugal.Size} validations={getValidations([formObjConfig.RegimenConyugal.ValidacionRequerido])} />,
                RangoIngresos: <RangoIngresosDDL key={"RangoIngresos"} size={formObjConfig.RangoIngresos.Size} validations={getValidations([formObjConfig.RangoIngresos.ValidacionRequerido])} />,
                Giro: <ddl.GirosDDL id="Giro" key={"Giro"} size={formObjConfig.Giro.Size} validations={getValidations([formObjConfig.Giro.ValidacionRequerido])} addNewItem={"SO"} />,
                RepresentanteLegal: <select.SCVClientes id="RepresentanteLegal" key={"RepresentanteLegal"} size={formObjConfig.RepresentanteLegal.Size} validations={getValidations([formObjConfig.RepresentanteLegal.ValidacionRequerido])} />,
            };

            let additionalFields: any = {
                Domicilio: <input.Text id="Domicilio" key={"Domicilio"} size={formObjConfig.Domicilio.Size} maxLength={150} validations={getValidations([formObjConfig.Domicilio.ValidacionRequerido])} />,
                NumExterior: <input.Text id="NumExterior" key={"NumExterior"} size={formObjConfig.NumExterior.Size} validations={getValidations([formObjConfig.NumExterior.ValidacionRequerido])} />,
                NumInterior: <input.Text id="NumInterior" key={"NumInterior"} size={formObjConfig.NumInterior.Size} validations={getValidations([formObjConfig.NumInterior.ValidacionRequerido])} />,
                AntiguedadDomicilio: <input.Text id="AntiguedadDomicilio" key={"AntiguedadDomicilio"} size={formObjConfig.AntiguedadDomicilio.Size} mask="99" validations={getValidations([formObjConfig.AntiguedadDomicilio.ValidacionRequerido])} />,
                Geolocalizacion: <label.Label id="Geolocalizacion" key={"Geolocalizacion"} size={formObjConfig.Geolocalizacion.Size} validations={getValidations([formObjConfig.Geolocalizacion.ValidacionRequerido])} />,
                Asentamiento: <select.Asentamientos key={"Asentamiento"} size={formObjConfig.Asentamiento.Size} validations={getValidations([formObjConfig.Asentamiento.ValidacionRequerido])} />
            };


            let infoFields: any = {
                Creado: <div key="Creado"><label.FechaBadge id="Creado" size={formObjConfig.Creado.Size} /></div>,
                FechaContacto: <div key="FechaContacto"> <label.FechaBadge id="FechaContacto" size={formObjConfig.FechaContacto.Size} /></div>,
                FechaProspecto: <div key="FechaProspecto">   <label.FechaBadge id="FechaProspecto" size={formObjConfig.FechaProspecto.Size} /></div>,
                FechaCliente: <div key="FechaCliente">  <label.FechaBadge id="FechaCliente" size={formObjConfig.FechaCliente.Size} /></div>,
                TipoPersona: <div key="TipoPersona"> <label.EntidadBadge id="TipoPersona" size={formObjConfig.TipoPersona.Size} /></div>,
                EstatusCliente: <div key="EstatusCliente"> <label.EntidadBadge id="EstatusCliente" size={formObjConfig.EstatusCliente.Size} /></div>,
            };


            infoForm = EK.UX.formatForm(formConfiguration, infoFields);

            mainForm = EK.UX.formatForm(formConfiguration, mainFields);
            additionalForm = EK.UX.formatForm(formConfiguration, additionalFields);


            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id="InfoGeneral"
                            level="main"
                            subTitle={<span>
                                <span className="badge badge-info bold" style={{ margin: "0px 5px" }}>#{entidadData.ID}</span>
                                <span className="badge badge-success bold" style={{ margin: "0px 5px" }}>{tipoPersonaNombre}</span>
                                <span className='badge badge-success bold' >{estatusCliente}</span>
                            </span>}
                            icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                            <Row style={{ margin: "0px 10px 10px", paddingBottom: 10, backgroundColor: "#fafafa" }}>
                                {infoForm}
                            </Row>


                            {mainForm}


                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }} >

                                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}  >
                                    <page.OptionSection
                                        id="InfoDomicilio"
                                        icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                        {additionalForm}
                                    </page.OptionSection>

                                </Column>
                                <TelefonosFisica/>
                                <CorreosFisica/>
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <ReferenciasLaborales />
                                <ReferenciasPersonales />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <Asesores />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <BoletasProspeccion />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <SectionFieldsRendering id="custom2" />

                                <KontrolLogBookManager
                                    idEntidadPadre={entidadData.ID}
                                    claveEntidadPadre={config.id}
                                    modulo={config.id}
                                    viewMode={false}
                                    addNewItem={"SO"}
                                    collapsed={false} />

                            </Column>

                        </page.OptionSection>
                    </Column>
                </Row>

            </page.Edit>;
        };
    });


    const EditMoral: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            retValue.formConfiguration = state.global.currentEntityConfiguration$scvclientesM;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IPageEditProps, nextState: IPageEditProps): boolean {
            return global.hasChanged(this.props.tipoPersona, nextProps.tipoPersona) ||
                global.hasChanged(this.props.formConfiguration, nextProps.formConfiguration);
        };
        render(): JSX.Element {
            let tipoPersona: any = this.props.tipoPersona;
            if (tipoPersona === undefined || tipoPersona === null) {
                return null;
            };

            if (!isSuccessful(this.props.formConfiguration)) {
                return null;
            }


            let monedaRI: any;
            let entidad: any = this.props.config.getEntity();
            let entidadData: any = global.getData(entidad);
            let tipoPersonaNombre: string = "";

            if (global.isSuccessful(entidad)) {
                if (entidadData.RangoIngresos) {
                    monedaRI = entidadData.RangoIngresos.Moneda;
                };

                if (this.props.tipoPersona) {
                    tipoPersonaNombre = this.props.tipoPersona.Nombre;
                };
            };

            let estatusCliente: string = entidadData && entidadData.EstatusCliente ? entidadData.EstatusCliente.Nombre : "";

            /*Configuracion del formulario*/
            let mainForm: any[] = [];
            let additionalForm: any[] = [];
            let infoForm: any[] = [];



            let formConfiguration: any = getData(this.props.formConfiguration)
            let formObjConfig: any = EK.UX.formatObjConfig(formConfiguration)

            let mainFields: any = {
                Nombre: <input.Nombre key={"Nombre"} size={formObjConfig.Nombre.Size} maxLength={50} validations={getValidations([formObjConfig.Nombre.ValidacionRequerido, validations.name("Capture un nombre válido")])} />,
                ApellidoPaterno: <input.Text key={"ApellidoPaterno"} id="ApellidoPaterno" size={formObjConfig.ApellidoPaterno.Size} maxLength={50} validations={getValidations([formObjConfig.ApellidoPaterno.ValidacionRequerido, validations.name("Capture un apellido válido")])} />,
                ApellidoMaterno: <input.Text key={"ApellidoMaterno"} id="ApellidoMaterno" size={formObjConfig.ApellidoMaterno.Size} maxLength={50} validations={getValidations([formObjConfig.ApellidoMaterno.ValidacionRequerido, validations.name("Capture un apellido válido")])} />,
                FechaNacimiento: <DatePicker key={"FechaNacimiento"} id="FechaNacimiento" placeHolder={"DD/MM/AAAA"} size={formObjConfig.FechaNacimiento.Size} validations={getValidations([formObjConfig.FechaNacimiento.ValidacionRequerido])} />,
                Estatus: <checkBox.Status key={"Estatus"} size={formObjConfig.Estatus.Size} />,
                Genero: <GenerosDDL key={"Genero"} size={formObjConfig.Genero.Size} validations={getValidations([formObjConfig.Genero.ValidacionRequerido])} />,
                EstadoOrigen: <select.Estados key={"EstadoOrigen"} id="EstadoOrigen" size={formObjConfig.EstadoOrigen.Size} validations={getValidations([formObjConfig.EstadoOrigen.ValidacionRequerido])} />,
                PaisOrigen: <ddl.PaisOrigenDLL key={"PaisOrigen"} id="PaisOrigen" idForm={config.id} size={formObjConfig.PaisOrigen.Size} addNewItem={"SO"} />,
                RFC: <input.Unique idElement={"RFC"} key={"RFC"} id="RFC" size={formObjConfig.RFC.Size} validations={getValidations([formObjConfig.RFC.ValidacionRequerido])} />,
                CURP: <input.Unique idElement={"CURP"} key={"CURP"} id="CURP" size={formObjConfig.CURP.Size} validations={getValidations([formObjConfig.CURP.ValidacionRequerido])} />,
                NSS: <input.NSS size={formObjConfig.NSS.Size} key={"NSS"} validations={getValidations([formObjConfig.NSS.ValidacionRequerido, validations.length("Este campo no puede ser menor de 11 digitos.", 11)])} />,
                Discapacidad: <CheckBox id="Discapacidad" key={"Discapacidad"} size={formObjConfig.Discapacidad.Size} icon={"fa fa-wheelchair"} label=" " />,
                EstadoCivil: <EstadoCivilDLL key={"EstadoCivil"} size={formObjConfig.EstadoCivil.Size} validations={getValidations([formObjConfig.EstadoCivil.ValidacionRequerido])} />,
                RegimenConyugal: <RegimenDLL key={"RegimenConyugal"} size={formObjConfig.RegimenConyugal.Size} validations={getValidations([formObjConfig.RegimenConyugal.ValidacionRequerido])} />,
                RangoIngresos: <RangoIngresosDDL key={"RangoIngresos"} size={formObjConfig.RangoIngresos.Size} validations={getValidations([formObjConfig.RangoIngresos.ValidacionRequerido])} />,
                Giro: <ddl.GirosDDL id="Giro" key={"Giro"} size={formObjConfig.Giro.Size} validations={getValidations([formObjConfig.Giro.ValidacionRequerido])} addNewItem={"SO"} />,
                RepresentanteLegal: <select.SCVClientes id="RepresentanteLegal" key={"RepresentanteLegal"} size={formObjConfig.RepresentanteLegal.Size} validations={getValidations([formObjConfig.RepresentanteLegal.ValidacionRequerido])} />,
            };

            let additionalFields: any = {
                Domicilio: <input.Text id="Domicilio" key={"Domicilio"} size={formObjConfig.Domicilio.Size} maxLength={150} validations={getValidations([formObjConfig.Domicilio.ValidacionRequerido])} />,
                NumExterior: <input.Text id="NumExterior" key={"NumExterior"} size={formObjConfig.NumExterior.Size} validations={getValidations([formObjConfig.NumExterior.ValidacionRequerido])} />,
                NumInterior: <input.Text id="NumInterior" key={"NumInterior"} size={formObjConfig.NumInterior.Size} validations={getValidations([formObjConfig.NumInterior.ValidacionRequerido])} />,
                AntiguedadDomicilio: <input.Text id="AntiguedadDomicilio" key={"AntiguedadDomicilio"} size={formObjConfig.AntiguedadDomicilio.Size} mask="99" validations={getValidations([formObjConfig.AntiguedadDomicilio.ValidacionRequerido])} />,
                Geolocalizacion: <label.Label id="Geolocalizacion" key={"Geolocalizacion"} size={formObjConfig.Geolocalizacion.Size} validations={getValidations([formObjConfig.Geolocalizacion.ValidacionRequerido])} />,
                Asentamiento: <select.Asentamientos key={"Asentamiento"} size={formObjConfig.Asentamiento.Size} validations={getValidations([formObjConfig.Asentamiento.ValidacionRequerido])} />
            };


            let infoFields: any = {
                Creado: <div key="Creado"><label.FechaBadge id="Creado" size={formObjConfig.Creado.Size} /></div>,
                FechaContacto: <div key="FechaContacto"> <label.FechaBadge id="FechaContacto" size={formObjConfig.FechaContacto.Size} /></div>,
                FechaProspecto: <div key="FechaProspecto">   <label.FechaBadge id="FechaProspecto" size={formObjConfig.FechaProspecto.Size} /></div>,
                FechaCliente: <div key="FechaCliente">  <label.FechaBadge id="FechaCliente" size={formObjConfig.FechaCliente.Size} /></div>,
                TipoPersona: <div key="TipoPersona"> <label.EntidadBadge id="TipoPersona" size={formObjConfig.TipoPersona.Size} /></div>,
                EstatusCliente: <div key="EstatusCliente"> <label.EntidadBadge id="EstatusCliente" size={formObjConfig.EstatusCliente.Size} /></div>,
            };


            infoForm = EK.UX.formatForm(formConfiguration, infoFields);
            mainForm = EK.UX.formatForm(formConfiguration, mainFields);
            additionalForm = EK.UX.formatForm(formConfiguration, additionalFields);

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id="InfoGeneral"
                            level="main"
                            subTitle={<span>
                                <span className="badge badge-info bold" style={{ margin: "0px 5px" }}>#{entidadData.ID}</span>
                                <span className="badge badge-success bold" style={{ margin: "0px 5px" }}>{tipoPersonaNombre}</span>
                                <span className='badge badge-success bold' >{estatusCliente}</span>
                            </span>}
                            icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                            <Row style={{ margin: "0px 10px 10px", paddingBottom: 10, backgroundColor: "#fafafa" }}>
                                {infoForm}
                            </Row>


                            {mainForm}

                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>

                                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                    <page.OptionSection
                                        id="InfoDomicilio"
                                        icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                        {additionalForm}
                                    </page.OptionSection>
                                </Column>
                                <SectionFieldsRendering id="custom3"/>
                                <TelefonoMoral />
                                <CorreoMoral />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <ReferenciasPersonales />
                                <Asesores />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <BoletasProspeccion />
                            </Column>


                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <SectionFieldsRendering id="custom4" />

                                <KontrolLogBookManager
                                    idEntidadPadre={entidadData.ID}
                                    claveEntidadPadre={config.id}
                                    modulo={config.id}
                                    viewMode={false}
                                    addNewItem={"SO"}
                                    collapsed={false} />
                            </Column>

                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });
    const ViewFisica: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            retValue.formConfiguration = state.global.currentEntityConfiguration$scvclientesF;
            return retValue;
        };
        render(): JSX.Element {

            if (!isSuccessful(this.props.formConfiguration)) {
                return null;
            }

            let monedaRI: any;
            let entidad: any = this.props.config.getEntity();
            let entidadData: any = global.getData(entidad);
            let tipoPersonaNombre: string = "";
            if (global.isSuccessful(entidad)) {
                if (entidadData.RangoIngresos) {
                    monedaRI = entidadData.RangoIngresos.Moneda;
                };

                if (entidadData.TipoPersona) {
                    tipoPersonaNombre = entidadData.TipoPersona.Nombre;
                };
            };
            let estatusCliente: string = entidadData && entidadData.EstatusCliente ? entidadData.EstatusCliente.Nombre : "";


            /*Configuracion del formulario*/
            let mainForm: any[] = [];
            let additionalForm: any[] = [];
            let infoForm: any[] = [];

            let formConfiguration: any = getData(this.props.formConfiguration)
            let formObjConfig: any = EK.UX.formatObjConfig(formConfiguration)

            let mainFields: any = {
                Nombre: <div key="Nombre"> <label.Nombre size={formObjConfig.Nombre.Size}/></div>,
                ApellidoPaterno: <div key="ApellidoPaterno"><label.Label id="ApellidoPaterno" size={formObjConfig.ApellidoPaterno.Size}/></div>,
                ApellidoMaterno: <div key="ApellidoMaterno">  <label.Label id="ApellidoMaterno" size={formObjConfig.ApellidoMaterno.Size}/></div>,
                FechaNacimiento: <div key="FechaNacimiento"> <label.Fecha id="FechaNacimiento" size={formObjConfig.FechaNacimiento.Size} /></div>,
                Estatus: <div key="Estatus">  <label.Estatus size={formObjConfig.Estatus.Size} /></div>,
                Genero: <div key="Genero"><label.Entidad id="Genero" size={formObjConfig.Genero.Size} /></div>,
                EstadoOrigen: <div key="EstadoOrigen">  <label.Entidad id="EstadoOrigen" size={formObjConfig.EstadoOrigen.Size} /></div>,
                PaisOrigen: <div key="PaisOrigen">  <label.Entidad id="PaisOrigen" size={formObjConfig.PaisOrigen.Size} /></div>,
                RFC: <div key="RFC"><label.RFC size={formObjConfig.RFC.Size} /></div>,
                CURP: <div key="CURP"><label.CURP size={formObjConfig.CURP.Size} /></div>,
                NSS: <div key="NSS"><label.Label id="NSS" size={formObjConfig.NSS.Size} /></div>,
                Discapacidad: <div key="Discapacidad">   <label.Boolean id={"Discapacidad"} size={formObjConfig.Discapacidad.Size}/></div>,
                EstadoCivil: <div key="EstadoCivil"><label.Entidad id="EstadoCivil" size={formObjConfig.EstadoCivil.Size}/></div>,
                RegimenConyugal: <div key="RegimenConyugal"> <label.Entidad id="RegimenConyugal" size={formObjConfig.RegimenConyugal.Size} /></div>,
                Giro: <div key="Giro"> <label.Entidad id="Giro" size={formObjConfig.Giro.Size} /></div>,
                RepresentanteLegal: <div key="RepresentanteLegal"><label.Entidad id="RepresentanteLegal" size={formObjConfig.RepresentanteLegal.Size} /></div>,
                RangoIngresos: <div key="RangoIngresos"> <label.Custom id="RangoIngresos" size={formObjConfig.RangoIngresos.Size} value={(e) => {
                    return [
                        global.formatMoney(e.RangoIngresos.RangoInicial, e.RangoIngresos.Moneda),
                        " - ",
                        global.formatMoney(e.RangoIngresos.RangoFinal, e.RangoIngresos.Moneda),
                        " ",
                        e.RangoIngresos.Moneda.Nombre,
                        " (", e.RangoIngresos.Moneda.Clave, ")"].join("");
                }} /></div>,
            };

            let additionalFields: any = {
                Domicilio: <div key="Domicilio"> <label.Label id="Domicilio" size={formObjConfig.Domicilio.Size} /></div>,
                NumExterior: <div key="NumExterior"> <label.Label id="NumExterior" size={formObjConfig.NumExterior.Size} /></div>,
                NumInterior: <div key="NumInterior"> <label.Label id="NumInterior" size={formObjConfig.NumInterior.Size} /></div>,
                AntiguedadDomicilio: <div key="AntiguedadDomicilio"> <label.Label id="AntiguedadDomicilio" size={formObjConfig.AntiguedadDomicilio.Size} /></div>,
                Geolocalizacion: <div key="Geolocalizacion"> <label.Label id="Geolocalizacion" size={formObjConfig.Geolocalizacion.Size} /></div>,
                Asentamiento: <div key="Asentamiento"> <label.Localidad id="Asentamiento" size={formObjConfig.Asentamiento.Size} /></div>,
            };

            let infoFields: any = {
                Creado: <div key="Creado"><label.FechaBadge id="Creado" size={formObjConfig.Creado.Size} /></div>,
                FechaContacto: <div key="FechaContacto"> <label.FechaBadge id="FechaContacto" size={formObjConfig.FechaContacto.Size} /></div>,
                FechaProspecto: <div key="FechaProspecto">   <label.FechaBadge id="FechaProspecto" size={formObjConfig.FechaProspecto.Size} /></div>,
                FechaCliente: <div key="FechaCliente">  <label.FechaBadge id="FechaCliente" size={formObjConfig.FechaCliente.Size} /></div>,
                TipoPersona: <div key="TipoPersona"> <label.EntidadBadge id="TipoPersona" size={formObjConfig.TipoPersona.Size} /></div>,
                EstatusCliente: <div key="EstatusCliente"> <label.EntidadBadge id="EstatusCliente" size={formObjConfig.EstatusCliente.Size} /></div>,
            };


            infoForm = EK.UX.formatForm(formConfiguration, infoFields);
            mainForm = EK.UX.formatForm(formConfiguration, mainFields);
            additionalForm = EK.UX.formatForm(formConfiguration, additionalFields);


            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id="InfoGeneral"
                            level="main"
                            subTitle={<span>
                                <span className="badge badge-info bold" style={{ margin: "0px 5px" }}>#{entidadData.ID}</span>
                                <span className="badge badge-success bold" style={{ margin: "0px 5px" }}>{tipoPersonaNombre}</span>
                                <span className='badge badge-success bold' >{estatusCliente}</span>
                            </span>}
                            icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                            <Row style={{ margin: "0px 10px 10px", paddingBottom: 10, backgroundColor: "#fafafa" }}>
                                {infoForm}
                            </Row>


                            {mainForm}

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>

                                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                    <page.OptionSection
                                        id="InfoDomicilio"
                                        icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>
                                        {additionalForm}
                                    </page.OptionSection>
                                </Column>
                                <TelefonosFisica />
                                <CorreosFisica />
                            </Column>


                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <ReferenciasLaborales />
                                <ReferenciasPersonales />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <Asesores />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <BoletasProspeccion />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <SectionFieldsRendering id="custom5" />

                                <KontrolLogBookManager
                                    idEntidadPadre={entidadData.ID}
                                    claveEntidadPadre={config.id}
                                    modulo={config.id}
                                    viewMode={false}
                                    addNewItem={"SO"}
                                    collapsed={false} />

                            </Column>


                        </page.OptionSection>
                    </Column>

                </Row>
            </page.View>;
        };
    });
    const ViewMoral: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            retValue.formConfiguration = state.global.currentEntityConfiguration$scvclientesM;
            return retValue;
        };
        render(): JSX.Element {
            if (!isSuccessful(this.props.formConfiguration)) {
                return null;
            }


            let monedaRI: any;
            let entidad: any = this.props.config.getEntity();
            let entidadData: any = global.getData(entidad);
            let tipoPersonaNombre: string = "";
            if (global.isSuccessful(entidad)) {
                if (entidadData.RangoIngresos) {
                    monedaRI = entidadData.RangoIngresos.Moneda;
                };

                if (entidadData.TipoPersona) {
                    tipoPersonaNombre = entidadData.TipoPersona.Nombre;
                };
            };
            let estatusCliente: string = entidadData && entidadData.EstatusCliente ? entidadData.EstatusCliente.Nombre : "";


            /*Configuracion del formulario*/
            let mainForm: any[] = [];
            let additionalForm: any[] = [];
            let infoForm: any[] = [];



            let formConfiguration: any = getData(this.props.formConfiguration)
            let formObjConfig: any = EK.UX.formatObjConfig(formConfiguration)

            let mainFields: any = {
                Nombre: <div key="Nombre"> <label.Nombre size={formObjConfig.Nombre.Size} /></div>,
                ApellidoPaterno: <div key="ApellidoPaterno"><label.Label id="ApellidoPaterno" size={formObjConfig.ApellidoPaterno.Size} /></div>,
                ApellidoMaterno: <div key="ApellidoMaterno">  <label.Label id="ApellidoMaterno" size={formObjConfig.ApellidoMaterno.Size} /></div>,
                FechaNacimiento: <div key="FechaNacimiento"> <label.Fecha id="FechaNacimiento" size={formObjConfig.FechaNacimiento.Size} /></div>,
                Estatus: <div key="Estatus">  <label.Estatus size={formObjConfig.Estatus.Size} /></div>,
                Genero: <div key="Genero"><label.Entidad id="Genero" size={formObjConfig.Genero.Size} /></div>,
                EstadoOrigen: <div key="EstadoOrigen">  <label.Entidad id="EstadoOrigen" size={formObjConfig.EstadoOrigen.Size} /></div>,
                PaisOrigen: <div key="PaisOrigen">  <label.Entidad id="PaisOrigen" size={formObjConfig.PaisOrigen.Size} /></div>,
                RFC: <div key="RFC"><label.RFC size={formObjConfig.RFC.Size} /></div>,
                CURP: <div key="CURP"><label.CURP size={formObjConfig.CURP.Size} /></div>,
                NSS: <div key="NSS"><label.Label id="NSS" size={formObjConfig.NSS.Size} /></div>,
                Discapacidad: <div key="Discapacidad">   <label.Boolean id={"Discapacidad"} size={formObjConfig.Discapacidad.Size} /></div>,
                EstadoCivil: <div key="EstadoCivil"><label.Entidad id="EstadoCivil" size={formObjConfig.EstadoCivil.Size} /></div>,
                RegimenConyugal: <div key="RegimenConyugal"> <label.Entidad id="RegimenConyugal" size={formObjConfig.RegimenConyugal.Size} /></div>,
                Giro: <div key="Giro"> <label.Entidad id="Giro" size={formObjConfig.Giro.Size} /></div>,
                RepresentanteLegal: <div key="RepresentanteLegal"><label.Entidad id="RepresentanteLegal" size={formObjConfig.RepresentanteLegal.Size} /></div>,
                RangoIngresos: <div key="RangoIngresos"> <label.Custom id="RangoIngresos" size={formObjConfig.RangoIngresos.Size} value={(e) => {
                    return [
                        global.formatMoney(e.RangoIngresos.RangoInicial, e.RangoIngresos.Moneda),
                        " - ",
                        global.formatMoney(e.RangoIngresos.RangoFinal, e.RangoIngresos.Moneda),
                        " ",
                        e.RangoIngresos.Moneda.Nombre,
                        " (", e.RangoIngresos.Moneda.Clave, ")"].join("");
                }} /></div>,
            };

            let additionalFields: any = {
                Domicilio: <div key="Domicilio"> <label.Label id="Domicilio" size={formObjConfig.Domicilio.Size} /></div>,
                NumExterior: <div key="NumExterior"> <label.Label id="NumExterior" size={formObjConfig.NumExterior.Size} /></div>,
                NumInterior: <div key="NumInterior"> <label.Label id="NumInterior" size={formObjConfig.NumInterior.Size} /></div>,
                AntiguedadDomicilio: <div key="AntiguedadDomicilio"> <label.Label id="AntiguedadDomicilio" size={formObjConfig.AntiguedadDomicilio.Size} /></div>,
                Geolocalizacion: <div key="Geolocalizacion"> <label.Label id="Geolocalizacion" size={formObjConfig.Geolocalizacion.Size} /></div>,
                Asentamiento: <div key="Asentamiento"> <label.Localidad id="Asentamiento" size={formObjConfig.Asentamiento.Size} /></div>,
            };

            let infoFields: any = {
                Creado: <div key="Creado"><label.FechaBadge id="Creado" size={formObjConfig.Creado.Size} /></div>,
                FechaContacto: <div key="FechaContacto"> <label.FechaBadge id="FechaContacto" size={formObjConfig.FechaContacto.Size} /></div>,
                FechaProspecto: <div key="FechaProspecto">   <label.FechaBadge id="FechaProspecto" size={formObjConfig.FechaProspecto.Size} /></div>,
                FechaCliente: <div key="FechaCliente">  <label.FechaBadge id="FechaCliente" size={formObjConfig.FechaCliente.Size} /></div>,
                TipoPersona: <div key="TipoPersona"> <label.EntidadBadge id="TipoPersona" size={formObjConfig.TipoPersona.Size} /></div>,
                EstatusCliente: <div key="EstatusCliente"> <label.EntidadBadge id="EstatusCliente" size={formObjConfig.EstatusCliente.Size} /></div>,
            };


            infoForm = EK.UX.formatForm(formConfiguration, infoFields);
            mainForm = EK.UX.formatForm(formConfiguration, mainFields);
            additionalForm = EK.UX.formatForm(formConfiguration, additionalFields);


            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id="InfoGeneral"
                            level="main"
                            subTitle={<span>
                                <span className="badge badge-info bold" style={{ margin: "0px 5px" }}>#{entidadData.ID}</span>
                                <span className="badge badge-success bold" style={{ margin: "0px 5px" }}>{tipoPersonaNombre}</span>
                                <span className='badge badge-success bold' >{estatusCliente}</span>
                            </span>}
                            icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                            <Row style={{ margin: "0px 10px 10px", paddingBottom: 10, backgroundColor: "#fafafa" }}>
                                {infoForm}
                            </Row>


                            {mainForm}

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>

                                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                    <page.OptionSection
                                        id="InfoDomicilio"
                                        icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={false}>

                                        {additionalForm}

                                    </page.OptionSection>
                                </Column>
                                <TelefonoMoral />
                                <CorreoMoral />

                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <ReferenciasPersonales />
                                <Asesores />
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <BoletasProspeccion />
                            </Column>


                            <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                <SectionFieldsRendering id="custom6" />

                                <KontrolLogBookManager
                                    idEntidadPadre={entidadData.ID}
                                    claveEntidadPadre={config.id}
                                    modulo={config.id}
                                    viewMode={false}
                                    addNewItem={"SO"}
                                    collapsed={false} />

                            </Column>


                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        };
    });


    export let Asesores: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveAsesores = this.onSaveAsesores.bind(this);
            this.onValidateAsesor = this.onValidateAsesor.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveAsesores(): void {
            let item: EditForm = Forms.getForm(ASESORES);
            if (this.onValidateAsesor(item)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionAsesor);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(ASESORES);
                let elemento: any;
                elemento = item
                    .addNumber("ID")
                    .addBoolean("Titular")
                    .addObject("Usuario")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                if (elemento["Titular"] == true) {
                    for (var i = 0; i < entidades.data.length; i++)
                    {
                        entidades.data[i].Titular = false;
                        if (entidades.data[i].ID > 0)
                        {
                            entidades.data[i].Estado = 3;
                        }
                    }
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, ASESORES);
                global.dispatchSuccessful("global-page-data", retValue, ASESORES);
                this.props.config.setState({ viewMode: true }, ASESORES);
            }
        }
        onValidateAsesor(item: any): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(ASESORES);
            let items: any[] = entidades.data;
            let result: boolean = false;
            items.forEach((value: any, index: number) => {
                if (value.IdUsuario == item.Usuario.ID && (item.ID < 1 || item.ID === undefined)) {
                    result = true;
                }
            });
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let removeAsesor: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    if (item.Titular != true) {
                        let element: DataElement = Forms.getValue(id, idParent);
                        Forms.updateFormElement(idParent, id, element.removeItem(item));
                    }
                    else {
                        let ml: any = $ml[config.id];
                        warning(ml.mensajes.validacionAsesorTitular);
                    }
                }
            };
            return <page.SectionList
                id={ASESORES}
                parent={config.id}
                level={1}
                icon={Iconos[ASESORES]}
                size={[12, 12, 6, 6]}
                onSave={this.onSaveAsesores}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 8, 8, 8]} className="list-default-header">{"Agente"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Teléfono"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Titular"}</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addObject("Usuario")
                        .addBoolean("Titular")
                        .addEstatus()
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {

                    let usuario: any = item.Usuario ? item.Usuario : {};
                    let posicion: any = item.Usuario.Posicion ? item.Usuario.Posicion : {};


                    let linkURL: string = "javascript:;";
                    let linkObj: any = null;
                    //
                    if (usuario.ID > 0) {
                        linkURL = "#/kontrol/usuarios/:id";
                        linkObj = {
                            ID: usuario.ID,
                            Clave: usuario.Nombre,
                            Nombre: posicion.Nombre
                        };
                    }

                    return <Row>

                        <Column size={[12, 8, 8, 8]} className="listItem-default-item">
                            <div>
                                <label.LinkList value={usuario} link={linkURL}
                                    formatValue={(e: any) => {
                                        return linkObj;
                                    }} />
                            </div>
                        </Column>

                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                            <span>{item.Usuario.Telefono}</span>
                        </Column>

                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                            <span style={{ fontWeight: 400 }}>{item.Titular ? EK.UX.Labels.ok(item.Titular) : null}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={ASESORES} info={item}
                                extraData={[buttons.PopOver.edit, removeAsesor]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <select.Usuarios id={"Usuario"} label="Agente" idFormSection={ASESORES} size={[12, 12, 10, 10]} />
                    <CheckBox id="Titular" idFormSection={ASESORES} size={[12, 12, 2, 2]} label="Titular" />
                </Row>
            </page.SectionList>
        };
    })

    interface IPageEditProps extends page.IProps {
        tipoTel?: any;
    };

    export let TelefonosFisica: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveTelefono = this.onSaveTelefono.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tipoTel = Forms.getValue("TipoTelefono", "Telefonos");
            return retValue;
        };
        onSaveTelefono(): void {
            let item: EditForm = Forms.getForm(TELEFONOS_ID);
            if (this.onValidateContacto(item, TELEFONOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionTelefono);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(TELEFONOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Extension")
                    .addObject("TipoTelefono")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0)
                {
                    for (var i = 0; i < entidades.data.length; i++)
                    {
                        entidades.data[i].Titular = false;
                        if (entidades.data[i].ID > 0)
                        {
                            entidades.data[i].Estado = 3;
                        }
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, TELEFONOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, TELEFONOS_ID);
                this.props.config.setState({ viewMode: true }, TELEFONOS_ID);
            }
        }
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined) && (value.ID != item.ID)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let mostrarExtension: any;
            let tipoTelefono: any = this.props.tipoTel;
            if (tipoTelefono !== undefined && tipoTelefono.Clave !== undefined)
            {
                mostrarExtension = tipoTelefono.Clave;
            }
            return <page.SectionList
                id={TELEFONOS_ID}
                parent={config.id}
                title={"Teléfonos"}
                level={1}
                onSave={this.onSaveTelefono}
                items={createSuccessfulStoreObject([])}
                icon={Iconos[TELEFONOS_ID]}
                size={[12, 6, 3, 3]}
                style={{ paddingTop: 20 }}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addBoolean("Titular")
                        .addString("Extension")
                        .addObject("TipoTelefono")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var extension = item.Extension != null || item.Extension == "" ? "(" + item.Extension + ")" : "";
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";

                    return <Row>
                        <Column size={[10, 10, 10, 10]}>
                            <span className="badge badge-info">{item.TipoTelefono.Nombre}</span>
                            <span>{" " + item.Contacto} {extension} </span>
                            <span className={clase}>{" " + titular}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={TELEFONOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={TELEFONOS_ID} validations={getValidations([validations.required()])} size={[12, 6, 6, 6]} />
                    <CheckBox id="Titular" idFormSection={TELEFONOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                    <input.Unique label="Télefono" idElement={"Celular"} base={false} id="Contacto" size={[12, 12, 7, 7]} idFormSection={TELEFONOS_ID} validations={getValidations([validations.required(), validations.length("", 10)])} />
                    {mostrarExtension !== "C" ? < Input id="Extension" label="Extensión" idFormSection={TELEFONOS_ID} size={[12, 12, 5, 5]} maxLength={5} /> : null}
                </Row>
            </page.SectionList>
        };
    })


    export let TelefonoMoral: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveTelefono = this.onSaveTelefono.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveTelefono(): void {
            let item: EditForm = Forms.getForm(TELEFONOS_ID);
            //contacto
            if (this.onValidateContacto(item, TELEFONOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionTelefono);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(TELEFONOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Extension")
                    .addObject("TipoTelefono")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Nuevos Elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0)
                {
                    for (var i = 0; i < entidades.data.length; i++)
                    {
                        entidades.data[i].Titular = false;

                        if (entidades.data[i].ID > 0)
                        {
                            entidades.data[i].Estado = 3;
                        }
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, TELEFONOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, TELEFONOS_ID);
                this.props.config.setState({ viewMode: true }, TELEFONOS_ID);
            }
        }
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={TELEFONOS_ID}
                parent={config.id}
                title={"Teléfonos"}
                level={1}
                onSave={this.onSaveTelefono}
                items={createSuccessfulStoreObject([])}
                icon={Iconos[TELEFONOS_ID]}
                size={[12, 6, 3, 3]}
                style={{ paddingTop: 20 }}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addString("Nombre")
                        .addString("Cargo")
                        .addString("Extension")
                        .addObject("TipoTelefono")
                        .addBoolean("Titular")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var extension = item.Extension != null || item.Extension == "" ? "(" + item.Extension + ")" : "";
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";

                    return <Row>
                        <Column className="listItem-default-header" >
                            <Row>
                                <Column size={[10, 10, 10, 10]}>
                                    <span className="badge badge-info">{item.TipoTelefono.Nombre} </span>
                                    <span>{" " + item.Contacto} {extension + " "}</span>
                                    <span className={clase}>{" " + titular}</span>
                                </Column>

                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                                    {(estadoEntidad) ? null :
                                        <buttons.PopOver idParent={config.id} idForm={TELEFONOS_ID} info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    }
                                </Column>

                                <Column size={[10, 10, 10, 10]} className="listItem-default-item">
                                    <span className="badge badge-default">{item.Cargo + " "} </span>
                                    <span>{" " + item.Nombre}</span>
                                </Column>
                            </Row>
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <Input id="Nombre" label="Nombre" idFormSection={TELEFONOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={getValidations([validations.required()])} />
                    <Input id="Cargo" label="Cargo" idFormSection={TELEFONOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={getValidations([validations.required()])} />
                    <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={TELEFONOS_ID} size={[12, 6, 6, 6]} validations={getValidations([validations.required()])} />
                    <CheckBox id="Titular" idFormSection={TELEFONOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                    <input.Unique label="Télefono" idElement={"Celular"} base={false} validations={getValidations([validations.required(), validations.length("", 10)])} id="Contacto" size={[12, 12, 7, 7]} idFormSection={TELEFONOS_ID} />

                    <Input id="Extension" label="Extensión" idFormSection={TELEFONOS_ID} size={[12, 12, 5, 5]} maxLength={5} />
                </Row>
            </page.SectionList>
        };
    })

    export let CorreoMoral: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveCorreo = this.onSaveCorreo.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSaveCorreo(): void {
            let item: EditForm = Forms.getForm(CORREOS_ID);
            if (this.onValidateContacto(item, CORREOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionCorreo);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(CORREOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Nuevos Elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0)
                {
                    for (var i = 0; i < entidades.data.length; i++)
                    {
                        entidades.data[i].Titular = false;
                        if (entidades.data[i].ID > 0)
                        {
                            entidades.data[i].Estado = 3;
                        }
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }
                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, CORREOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, CORREOS_ID);
                this.props.config.setState({ viewMode: true }, CORREOS_ID);
            }
        }
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={CORREOS_ID}
                parent={config.id}
                title={"Correos"}
                level={1}
                onSave={this.onSaveCorreo}
                style={{ paddingTop: 20 }}
                items={createSuccessfulStoreObject([])}
                icon={Iconos[CORREOS_ID]}
                size={[12, 6, 3, 3]}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addString("Nombre")
                        .addString("Cargo")
                        .addBoolean("Titular")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";
                    return <Row>
                        <Column size={[10, 10, 10, 10]} className="listItem-default-item">
                            <span className="badge badge-info">{" " + item.Cargo}</span>
                            <span>{" " + item.Nombre}</span>
                        </Column>
                        <Column size={[10, 10, 10, 10]}>
                            <span>{" " + item.Contacto + " "}</span>
                            <span className={clase}>{" " + titular}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={CORREOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }

                    </Row>;
                }}>
                <Row>
                    <Input id="Nombre" label="Nombre" idFormSection={CORREOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={getValidations([validations.required()])} />
                    <Input id="Cargo" label="Cargo" idFormSection={CORREOS_ID} size={[12, 12, 12, 12]} maxLength={50} validations={getValidations([validations.required()])} />
                    <input.Unique label="Correo" idElement={"Correo"} base={false} id="Contacto" size={[12, 12, 12, 12]} idFormSection={CORREOS_ID} validations={getValidations([validations.email("El correo electrónico no es válido")])} />
                    <CheckBox id="Titular" idFormSection={CORREOS_ID} size={[12, 6, 6, 6]} label="Principal" />
                </Row>
            </page.SectionList>
        };
    })

    export let CorreosFisica: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveCorreo = this.onSaveCorreo.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        onSaveCorreo(): void {
            let item: EditForm = Forms.getForm(CORREOS_ID);
            if (this.onValidateContacto(item, CORREOS_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionCorreo);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(CORREOS_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addString("Contacto")
                    .addBoolean("Titular")
                    .addString("Cargo")
                    .addString("Nombre")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Para nuevos elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["Titular"] == true && entidades.data.length != 0)
                {
                    for (var i = 0; i < entidades.data.length; i++)
                    {
                        entidades.data[i].Titular = false;
                        if (entidades.data[i].ID > 0)
                        {
                            entidades.data[i].Estado = 3;
                        }
                    }
                }
                else if (entidades.data.length === 0 && (elemento["Titular"] == false || elemento["Titular"] == undefined)) {
                    elemento["Titular"] = true;
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, CORREOS_ID);
                global.dispatchSuccessful("global-page-data", retValue, CORREOS_ID);
                this.props.config.setState({ viewMode: true }, CORREOS_ID);
            }
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={CORREOS_ID}
                parent={config.id}
                title={"Correos"}
                level={1}
                onSave={this.onSaveCorreo}
                style={{ paddingTop: 20 }}
                items={createSuccessfulStoreObject([])}
                icon={Iconos[CORREOS_ID]}
                size={[12, 6, 3, 3]}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addString("Contacto")
                        .addBoolean("Titular")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    var titular = item.Titular == true ? " P" : "";
                    var clase = item.Titular == true ? "badge badge-success" : "";
                    return <Row>
                        <Column size={[10, 10, 10, 10]}>
                            <span>{" " + item.Contacto + " "}</span>
                            <span className={clase}>{" " + titular}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={CORREOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }

                    </Row>;
                }}>
                <Row>
                    <input.Unique label="Correo" idElement={"Correo"} base={false} id="Contacto" size={[12, 12, 12, 12]} idFormSection={CORREOS_ID} validations={getValidations([validations.email("El correo electrónico no es válido")])} />

                    <CheckBox id="Titular" idFormSection={CORREOS_ID} size={[12, 6, 6, 6]} label="Principal" />

                </Row>
            </page.SectionList>
        };
    })

    export let ReferenciasLaborales: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
            this.onSaveRefLaborales = this.onSaveRefLaborales.bind(this);
            this.onValidateContacto = this.onValidateContacto.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onValidateContacto(item: any, entidad: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(entidad);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (item.Contacto != null) {
                items.forEach((value: any, index: number) => {
                    if (value.Contacto == item.Contacto && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        onSaveRefLaborales(): void {
            let item: EditForm = Forms.getForm(REF_LABORALES_ID);
            if (this.onValidateContacto(item, REF_LABORALES_ID)) {
                let ml: any = $ml[config.id];
                warning(ml.mensajes.validacionLaboral);
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(REF_LABORALES_ID);
                let elemento: any;
                elemento = item
                    .addID()
                    .addObject("Empresa")
                    .addNumber("Antiguedad")
                    .addString("Puesto")
                    .addBoolean("EmpleoActual")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                //Para nuevos elementos
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    if (!(elemento["ID"])) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                }
                //Validaciones
                if (elemento["EmpleoActual"] == true && entidades.data.length != 0) {
                    for (var i = 0; i < entidades.data.length; i++)
                    {
                        entidades.data[i].EmpleoActual = false;

                        if (entidades.data[i].ID > 0)
                        {
                            entidades.data[i].Estado = 3;
                        }
                    }
                }
                else if (entidades.data.length === 0 && (elemento["EmpleoActual"] == false || elemento["EmpleoActual"] == undefined)) {
                    elemento["EmpleoActual"] = true;
                }

                let retValue: DataElement = entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, REF_LABORALES_ID);
                global.dispatchSuccessful("global-page-data", retValue, REF_LABORALES_ID);
                this.props.config.setState({ viewMode: true }, REF_LABORALES_ID);
            }
        }
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={REF_LABORALES_ID}
                parent={config.id}
                level={1}
                onSave={this.onSaveRefLaborales}
                icon={Iconos[REF_LABORALES_ID]}
                size={[12, 12, 6, 6]}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 7, 7, 7]} className="list-default-header">{"Referencia Laboral/Puesto"}</Column>
                            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Antigüedad"}</Column>
                            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Actual"}</Column>
                            <Column size={[12, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                        </Row>
                    </div>}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addObject("Empresa")
                        .addNumber("Antiguedad")
                        .addString("Puesto")
                        .addBoolean("EmpleoActual")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[12, 7, 7, 7]} className="listItem-default-item">
                            <span className="bold">{item.Empresa.Nombre}</span><br></br>
                            <span>{item.Puesto}</span><br></br>
                            <span>
                                <span >{item.Empresa.Localidad.CP} </span>
                                <span>{item.Empresa.Localidad.Nombre} ,</span>
                                <span>{item.Empresa.Localidad.Localidad.Nombre}</span>
                            </span>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-center-header">
                            <span>{item.Antiguedad}</span>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-center-header">{label.ok(item.EmpleoActual)}</Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={REF_LABORALES_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <SectionButtons>
                    <buttons.base.AddEmpresa />
                </SectionButtons>
                <Row>
                    <ddl.base.Empresa label="Referencia Laboral" idFormSection={REF_LABORALES_ID} size={[12, 12, 12, 12]} />
                    <input.Text id="Puesto" idFormSection={REF_LABORALES_ID} size={[12, 12, 6, 6]} maxLength={50} />
                    <input.Integer id="Antiguedad" idFormSection={REF_LABORALES_ID} size={[12, 12, 3, 3]} maxLength={2} />
                    <checkBox.CheckBox id="EmpleoActual" idFormSection={REF_LABORALES_ID} size={[12, 12, 3, 3]} />
                </Row>
            </page.SectionList>
        };
        //<ddl.base.Empresa idFormSection= { REF_LABORALES_ID } size= { [12, 12, 12, 12]} />
    })

    export let ReferenciasPersonales: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={REF_PERSONALES_ID}
                parent={config.id}
                icon={Iconos[REF_PERSONALES_ID]}
                size={[12, 12, 6, 6]}
                level={1}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Nombre/Relación"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Teléfonos"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addNombre()
                        .addString("ApellidoPaterno")
                        .addString("ApellidoMaterno")
                        .addObject("Referencia")
                        .addString("Telefono")
                        .addString("Celular")
                        .addObject("TipoReferencia")
                        .addObject("Referencia")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[12, 8, 8, 8]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.TipoReferencia.Nombre}</span>
                            <span>{item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno}</span>
                            <span style={{ marginLeft: "1%" }} className="badge badge-info">{item && item.Referencia ? item.Referencia.Clave : "-"}</span>
                        </Column>
                        <Column size={[12, 12, 3, 3]}>
                            <label.TelefonoValue value={item.Telefono} />
                            <label.TelefonoValue value={item.Celular} />
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={REF_PERSONALES_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <input.Nombre size={[12, 12, 12, 12]} idFormSection={REF_PERSONALES_ID} maxLength={50} validations={getValidations([validations.required(), validations.name("Capture un nombre válido")])} />
                    <input.Text id="ApellidoPaterno" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} maxLength={50} validations={getValidations([validations.required(), validations.name("Capture un apellido válido")])} />
                    <input.Text id="ApellidoMaterno" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} maxLength={50} validations={getValidations([validations.required(), validations.name("Capture un apellido válido")])} />
                    <ddl.TipoReferenciasDLL id="Referencia" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} validations={getValidations([validations.required()])} />
                    <ddl.ReferenciasDLL id="TipoReferencia" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} />
                    <Column size={[12, 12, 12, 12]} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                        <input.Telefono id="Telefono" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} validations={getValidations([validations.required(), validations.length("", 10)])} />
                        <input.Telefono id="Celular" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} validations={getValidations([validations.required(), validations.length("", 10)])} />
                    </Column>
                </Row>
            </page.SectionList>
        };
    });

    interface IBoletasProspeccion extends IPageEditProps
    {
        Desarrollo: any;
    }

    export let BoletasProspeccion: any = global.connect(class extends React.Component<IBoletasProspeccion, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.Desarrollo = Forms.getValue("Desarrollo", "Boletas");
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let idEntidad: number = getDataID(this.props.entidad);
            let Desarrollo: any = this.props.Desarrollo;
            let IdDesarrollo: number = 0;

            if (Desarrollo != null && Desarrollo != undefined && Desarrollo.ID > 0) {
                IdDesarrollo = Desarrollo.ID;
            }

            return <page.SectionList
                id={BOLETAS}
                parent={config.id}
                icon={Iconos[BOLETAS]}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 1, 1, 1]}   className="list-default-header">{"ID"}</Column>
                        <Column size={[12, 3, 3, 3]}   className="list-default-header">{"Desarrollo"}</Column>
                        <Column size={[12, 1, 1, 1]}   className="list-default-header">{"Registro"}</Column>
                        <Column size={[12, 1, 1, 1]}   className="list-default-header">{"Asignación"}</Column>
                        <Column size={[12, 2, 2, 2]}   className="list-default-header">{"Punto de venta"}</Column>
                        <Column size={[12, 3, 3, 3]}   className="list-default-header">{"Campaña de publicidad"}</Column>
                        <Column size={[12, 1, 1, 1]}   className="list-default-header">{"Link"}</Column>
                    </Row>
                </div>}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addObject("Desarrollo")
                        .addObject("PuntoVenta")
                        .addObject("CampaniaPublicidad")
                        .addObject("MedioPublicidad")
                        .addObject("TipoFinanciamiento")
                        .addObjectCustomForm("CUSTOMFORM","BoletaProspeccion")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    let fechaCreacion = global.formatDate(item.Creado);
                    let fechaAccion = global.formatDate(item.FechaAccion);

                    let desarrollo: any = item.Desarrollo ? item.Desarrollo : {};

                    let puntoVenta: string = item.PuntoVenta && item.PuntoVenta.ID > 0 ? item.PuntoVenta.Nombre : "";
                    let campaniaPublicidad: string = item.CampaniaPublicidad && item.CampaniaPublicidad.ID > 0 ? item.CampaniaPublicidad.Nombre : "";
                    let medioPublicidad: string = item.CampaniaPublicidad.MedioPublicidad && item.CampaniaPublicidad.MedioPublicidad.ID > 0 ? item.CampaniaPublicidad.MedioPublicidad.Nombre : "";


                    let url: string = "";

                    if (item.Desarrollo && item.Desarrollo.ID > 0)
                    {
                        url = "#/scv/expedientes/configuracion/id?nuevo&" + global.encodeParameters({ IdCliente: idEntidad, IdDesarrollo: item.Desarrollo.ID, idBoleta: item.ID });
                    }


                    let linkURLDesarrollo: string = "javascript:;";
                    let linkObjDesarrollo: any = null;
                    if (desarrollo.ID > 0) {
                        linkURLDesarrollo = "#/scv/desarrollos/:id";
                        linkObjDesarrollo = {
                            ID: item.Desarrollo.ID,
                            Clave: item.Desarrollo.Clave,
                            Nombre: item.Desarrollo.Descripcion
                        };
                    }

                    let linkURLBoleta: string = "javascript:;";
                    let linkObjBoleta: any = null;
                    if (desarrollo.ID > 0) {
                        linkURLBoleta = "#/scv/boletasProspeccion/:id";
                        linkObjBoleta = {
                            ID: item.ID,
                            Nombre: item.ID
                        };
                    }
                    return <Row>
                        <Column size={[12, 1, 1, 1]} className="listItem-center-header">
                            {item.ID > 0 ?
                                <label.LinkList value={desarrollo} link={linkURLBoleta}
                                    formatValue={(e: any) => {
                                        return linkObjBoleta;
                                    }} /> :
                                <span className="fa fa-minus"></span>}

                        </Column>
                        <Column size={[12, 3, 3, 3]} className="listItem-default-header">
                            <div>
                                <label.LinkList value={desarrollo} link={linkURLDesarrollo}
                                    formatValue={(e: any) => {
                                        return linkObjDesarrollo;
                                    }} />
                            </div>
                        </Column>
                        <Column size={[12, 1, 1, 1]} className="listItem-default-header">
                            <span>{fechaCreacion}</span>
                        </Column>

                        <Column size={[12, 1, 1, 1]} className="listItem-default-header">
                            <span>{fechaAccion}</span>
                        </Column>
                        <Column size={[12, 2, 2, 2]} className="listItem-default-header">
                            <span>{puntoVenta}</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="listItem-default-header">
                            <span>{campaniaPublicidad}</span> <span style={{ marginLeft: "1%" }} className="badge badge-info">{medioPublicidad}</span>
                        </Column>

                        {url != "" ?
                            <Column size={[12, 1, 1, 1]} className="listItem-default-header">
                                <div className="label-link-grid label-value">
                                    <a target='_blank' rel='noopener noreferrer' href={url} className="link2"><i className="fas fa-external-link-square-alt link2"></i></a>
                                </div>
                            </Column> : null
                        }
                        {estadoEntidad == false && item.ID == -999 ?
                            <buttons.PopOver idParent={config.id} idForm={BOLETAS} info={item}
                                extraData={[buttons.PopOver.edit]} /> : null}

                    </Row>
                }}>
                <Row>
                    <ddl.DesarrollosDDL id="Desarrollo" addNewItem={"SO"} size={[12, 6, 4, 4]} idFormSection={BOLETAS} validations={[validations.required()]}/>
                    <ddl.PuntosVentaDDL id="PuntoVenta" addNewItem={"SO"} size={[12, 6, 4, 4]} IdDesarrollo={IdDesarrollo} idFormSection={BOLETAS} />
                    <ddl.CampaniaPublicidadDDL id="CampaniaPublicidad" addNewItem={"SO"} size={[12, 6, 4, 4]} idFormSection={BOLETAS} />
                    <TiposFinanciamientoDDL id="TipoFinanciamiento" addNewItem={"SO"} size={[12, 6, 4, 4]} idFormSection={BOLETAS} />
                    <SectionBoletasFieldsRendering id="BoletaProspeccion" />
                </Row>
            </page.SectionList>
        };
    });
    
    interface IClientesSinExpediente extends page.IProps {
        items: any;
    };
    export let CientesSinExpedientes: any = global.connect(class extends React.Component<IClientesSinExpediente, IClientesSinExpediente> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.ClientesSinExpediente;
            return retValue;
        };
        componentDidMount() {
            let parametros:any = global.assign({ operacion:"Cliente" });
            global.dispatchAsync("load::ClientesSinExpediente",
                "base/kontrol/ScvClientes/Get/GetClientWithoutFile/" + global.encodeObject(parametros));

        }
        shouldComponentUpdate(nextProps: IClientesSinExpediente, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.items, []).length].join("")}</span>;

            return <Column size={[12, 12, 6, 6]}>
                <div>
                    <OptionSection
                        id={"ClientesSinExpediente"}
                        icon="fa fa-folder"
                        level={1}
                        title={"Contactos"}
                        subTitle={subTitleSeccion}
                        collapsed={false}>
                        <SectionView>
                            <div>
                                <PanelUpdate info={this.props.items}>
                                    <List
                                        items={getData(this.props.items)}
                                        readonly={true}
                                        addRemoveButton={false}
                                        dragAndDrop={false}
                                        listHeader={
                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                <Row>
                                                    <Column size={[12, 5, 5, 5]} className="list-default-header">{"Prospecto"}</Column>
                                                    <Column size={[12, 3, 3, 3]} className="list-default-header">{"Titular"}</Column>
                                                    <Column size={[12, 2, 2, 2]} className="list-center-header">{"Contacto"}</Column>
                                                    <Column size={[12, 2, 2, 2]} className="list-center-header">{"Días"}</Column>

                                                </Row>
                                            </div>}
                                        formatter={(index: number, item: any) => {
                                            let fechaContacto: any = item.FechaContacto ? item.FechaContacto : item.Creado;
                                            return <Row>
                                                <Column size={[12, 5, 5, 5]} className="listItem-default-item">
                                                    {EK.Modules.SCV.Pages.Expedientes.formatNombre(item.Nombre, item.Apaterno + " " + item.Amaterno, item.ID, "#/scv/clientes/", item.ID)}
                                                </Column>

                                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                                    {EK.Modules.SCV.Pages.Expedientes.formatNombre(item.Titular.Nombre, item.Titular.Apellidos, item.Titular.ID, "#/kontrol/usuarios/")}
                                                </Column>

                                                <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                    <div className="label-link-grid ">
                                                        <span>{EK.UX.Labels.formatDate(fechaContacto)}</span>
                                                    </div>
                                                </Column>
                                                <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                    <span className={"badge badge-danger"}>{item.DiasTranscurridos}</span>
                                                </Column>
                                            </Row>;
                                        }} />
                                </PanelUpdate>
                            </div>
                        </SectionView>
                        <SectionEdit>
                        </SectionEdit>
                    </OptionSection>
                </div>
            </Column>
        };
    })


    interface ISectionBoletasFieldsRendering extends page.IProps {
        id?: string;
        TipoFinanciamiento?: any;
        entityState?: DataElement;
    };
    let SectionBoletasFieldsRendering: any = global.connect(class extends React.Component<ISectionBoletasFieldsRendering, ISectionBoletasFieldsRendering> {
        constructor(props: ISectionFieldsRendering) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.TipoFinanciamiento = Forms.getValue("TipoFinanciamiento", BOLETAS);
            retValue.entityState = state.global.currentEntityState
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionBoletasFieldsRendering, { }): boolean {
            return hasChanged(this.props.TipoFinanciamiento, nextProps.TipoFinanciamiento);
        };

        render(): JSX.Element {
            let formTipoFinanciamiento: any = this.props.TipoFinanciamiento;
            let tipoEntidad: string = "";
            let tipoFinanciamiento: any;
            if (formTipoFinanciamiento != null && formTipoFinanciamiento != undefined && formTipoFinanciamiento.ID && formTipoFinanciamiento.ID > 0) {
                tipoFinanciamiento = formTipoFinanciamiento;
                tipoEntidad = "boletasProspeccion$" + tipoFinanciamiento.Clave;
            } else {
                return null;
            }
            return <FieldsRendering {...this.props} modoView={this.props.entityState} tipoEntidad={tipoEntidad} />
        };
    });

    interface ISectionFieldsRendering extends page.IProps {
        id?: string;
        entityState?: DataElement;
    };
    let SectionFieldsRendering: any = global.connect(class extends React.Component<ISectionFieldsRendering, ISectionFieldsRendering> {
        constructor(props: ISectionFieldsRendering) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.entityState = state.global.currentEntityState
            retValue.entidad = state.global.currentEntity;
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionFieldsRendering, { }): boolean {
            return hasChanged(this.props.entityState, nextProps.entityState) ||
                hasChanged(this.props.entidad, nextProps.entidad);
        };

        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let tipoEntidad: string = "";
            let tipoPersona: any;
            if (entidad != null && entidad.TipoPersona != undefined && entidad.TipoPersona.ID && entidad.TipoPersona.ID > 0) {
                tipoPersona = entidad.TipoPersona;
                tipoEntidad = config.id + tipoPersona.Clave;
            } else {
                return null;
            }

            return <FieldsRendering {...this.props} modoView={this.props.entityState} tipoEntidad={tipoEntidad} />
        };
    });


};  

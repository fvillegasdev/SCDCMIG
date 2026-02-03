namespace EK.Modules.SCV.Pages.BoletaProspeccion {
    "use strict";
    const bitacora: string = "bitacora";
    const config: page.IPageConfig = global.createPageConfig("boletasProspeccion", "scv", [bitacora]);
    let PAGE_ID = "Boleta de Prospección";

    const getValidations: (validations: any[]) => any = (validations: any[]): any => {
        let i_: number = 0;
        let validationList: any[] = [];
        validations.forEach((value: any, index: number) => {
            if (value != null && value != undefined) {
                validationList.push(value);
            }
        });
        return validationList.length > 0 ? validationList : null;
    };

    export const Edicion: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addNombre()
                .addString("ApellidoPaterno")
                .addString("ApellidoMaterno")
                .addString("Domicilio")
                .addString("NumeroExterior")
                .addString("Correo")
                .addString("Celular")
                .addString("Telefono")
                .addDate("FechaNacimiento")
                .addString("NSS")
                .addString("RFC")
                .addObject("PaisOrigen")
                .addString("CURP")
                .addNumber("MontoPrecalificado")
                .addNumber("MontoCredito")
                .addObject("Asentamiento")
                .addObject("Giro")
                .addObject("Genero")
                .addObject("LugarProspeccion")
                .addObject("TipoPersona")
                .addObject("Desarrollo")
                .addObject("PuntoVenta")
                .addObject("MedioPublicidad")
                .addObject("CampaniaPublicidad")
                .addObject("EstadoOrigen")
                .addObject("ResidenciaActual")
                .addObject("Origen")
                .addObject("TipoFinanciamiento")
                .addObjectCustomForm("CUSTOMFORM")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            let parametros: any = global.encodeParameters({ id });
            global.dispatchAsync("global-current-entity", "base/kontrol/boletasProspeccion/Get/GetByBoletaProspectoId/" + parametros);
        };
        onEntityLoaded(props: any, filters: any): any {
            EK.UX.getCurrentConfiguration(config.id);
        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);

            let editEntidad: boolean = entidad && entidad.Estatus &&
                (entidad.Estatus.Clave == "DE" || entidad.Estatus.Clave == "ASIG") ? false : true;

            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowEdit={editEntidad}
                allowSave={editEntidad}
                onSave={this.saveForm}
                onEntityLoaded={this.onEntityLoaded}
                onWillEntityLoad={this.onWillEntityLoad}>
                <View />
                <Edit />
            </page.Main>;
        };
    });


    interface IBoletaEditProps extends page.IProps {
        entidad?: any;
        formConfiguration: any;
        Desarrollo: any;
    };
    export const Edit: any = global.connect(class extends React.Component<IBoletaEditProps, IBoletaEditProps> {
        constructor(props: IBoletaEditProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            formConfiguration: state.global.currentEntityConfiguration$boletasProspeccion,
            Desarrollo: Forms.getValue("Desarrollo", "boletasProspeccion")
        });
        shouldComponentUpdate(nextProps: IBoletaEditProps, nextState: any): boolean {
            return hasChanged(this.props.Desarrollo, nextProps.Desarrollo) ||
                hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.formConfiguration, nextProps.formConfiguration);
        };
        render(): JSX.Element {
            let idEntidad: any = getDataID(this.props.entidad) > 0 ? getDataID(this.props.entidad) : "";

            let entidad: any = getData(this.props.entidad);
            let Desarrollo: any = this.props.Desarrollo;
            let IdDesarrollo: number = 0;

            if (Desarrollo != null && Desarrollo != undefined && Desarrollo.ID > 0)
            {
                IdDesarrollo = Desarrollo.ID;
            }

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
                        };
                    };
                });
            };

            if (!isSuccessful(this.props.formConfiguration))
            {
                return null;
            }

            //Configuracion Icono


            let color: any = entidad && entidad.Origen ? entidad.Origen.Color : "";

            let colorFondo: any = entidad && entidad.Origen ? entidad.Origen.BGColor : "";

            let icono: any = entidad && entidad.Origen? entidad.Origen.Icono : "";


            let estiloPersonalizado: React.CSSProperties = {
                color: color != "" ? color : "black",
                backgroundColor: colorFondo != "" ? colorFondo : "black",
                fontSize: "42px",
                margin: "22px 25px 25px 35px"
            };


            let mainForm: any[] = [];
            let additionalForm: any[] = [];

            let formConfiguration: any = getData(this.props.formConfiguration)
            let formObjConfig: any = EK.UX.formatObjConfig(formConfiguration)

            let mainFields: any = {
                Nombre: <input.Nombre maxLength={50} key={"Nombre"} size={formObjConfig.Nombre.Size} validations={getValidations([formObjConfig.Nombre.ValidacionRequerido, validations.name("Capture un nombre válido")])} />,
                ApellidoPaterno: <input.Text id={"ApellidoPaterno"} size={formObjConfig.ApellidoPaterno.Size} key={"ApellidoPaterno"} maxLength={50} validations={getValidations([formObjConfig.ApellidoPaterno.ValidacionRequerido, validations.name("Capture un apellido válido")])} />,
                ApellidoMaterno: <input.Text id={"ApellidoMaterno"} size={formObjConfig.ApellidoMaterno.Size} key={"ApellidoMaterno"} maxLength={50} validations={getValidations([formObjConfig.ApellidoMaterno.ValidacionRequerido, validations.name("Capture un apellido válido")])} />,
                Creado: <label.BadgeDefaultDateSM id="Creado" key="Creado" value={(e) => [null, e.Creado]} size={formObjConfig.Creado.Size} />,
                Estatus: <div key="Estatus"> <Estatus size={formObjConfig.Estatus.Size} /></div>,
                Desarrollo: <ddl.DesarrollosDDL id={"Desarrollo"} key={"Desarrollo"} addNewItem={"SO"} size={formObjConfig.Desarrollo.Size} validations={getValidations([formObjConfig.Desarrollo.ValidacionRequerido])} />,
                Correo: <input.Text id={"Correo"} maxLength={50} key={"Correo"} size={formObjConfig.Correo.Size} validations={getValidations([formObjConfig.Correo.ValidacionRequerido, validations.email("El correo electrónico no es válido")])} />,
                FechaNacimiento: <input.Date id={"FechaNacimiento"} key={"FechaNacimiento"} size={formObjConfig.FechaNacimiento.Size} validations={getValidations([formObjConfig.FechaNacimiento.ValidacionRequerido])} />,
                Celular: <input.Telefono id={"Celular"} maxLength={50} key={"Celular"} size={formObjConfig.Celular.Size} validations={getValidations([formObjConfig.Celular.ValidacionRequerido])} />,
                Telefono: <input.Telefono id={"Telefono"} maxLength={50} key={"Telefono"} size={formObjConfig.Telefono.Size} validations={getValidations([formObjConfig.Telefono.ValidacionRequerido])} />,
                Domicilio: <input.Text id={"Domicilio"} key="Domicilio" maxLength={50} size={formObjConfig.Domicilio.Size} validations={getValidations([formObjConfig.Domicilio.ValidacionRequerido])} />,
                NumeroExterior: <input.Text id={"NumeroExterior"} key="NumeroExterior" maxLength={5} validations={getValidations([formObjConfig.NumeroExterior.ValidacionRequerido, validations.isNumber("Capture un número")])} size={formObjConfig.NumeroExterior.Size} />,
                NSS: <input.NSS id={"NSS"} key="NSS" size={formObjConfig.NSS.Size} validations={getValidations([formObjConfig.NSS.ValidacionRequerido, validations.length("Este campo no puede ser menor de 11 digitos.", 11)])} />,
                CreadoPor: <label.General id="CreadoPor" key="CreadoPor" size={formObjConfig.CreadoPor.Size} />,
                EstadoOrigen: <select.Estados id="EstadoOrigen" key="EstadoOrigen" size={formObjConfig.EstadoOrigen.Size} validations={getValidations([formObjConfig.EstadoOrigen.ValidacionRequerido])} />,
                Asentamiento: <select.Asentamientos key="Asentamiento" id={"Asentamiento"} size={formObjConfig.Asentamiento.Size} validations={getValidations([formObjConfig.Asentamiento.ValidacionRequerido])} />,
                Origen: <div key="Origen">
                    <Column size={formObjConfig.Origen.Size}>
                        <span style={estiloPersonalizado} className={icono}></span>
                    </Column>
                </div>,
                MedioPublicidad: <MedioPublicidad key={"MedioPublicidad"} size={formObjConfig.MedioPublicidad.Size} validations={getValidations([formObjConfig.MedioPublicidad.ValidacionRequerido])} />,
                CampaniaPublicidad: <ddl.CampaniaPublicidadDDL addNewItem={"SO"} id={"CampaniaPublicidad"} key="CampaniaPublicidad" size={formObjConfig.CampaniaPublicidad.Size} validations={getValidations([formObjConfig.CampaniaPublicidad.ValidacionRequerido])} />,
            };

            let additionalFields: any = {
                Genero: <GenerosDDL id={"Genero"} key="Genero" addNewItem={"SO"} size={formObjConfig.Genero.Size} validations={getValidations([formObjConfig.Genero.ValidacionRequerido])} />,
                PaisOrigen: <ddl.PaisOrigenDLL id={"PaisOrigen"} key="PaisOrigen" addNewItem={"SO"} size={formObjConfig.PaisOrigen.Size} validations={getValidations([formObjConfig.PaisOrigen.ValidacionRequerido])} />,
                RFC: <input.RFC key="RFC" buttonClick={rfcFn} size={formObjConfig.RFC.Size} validations={getValidations([formObjConfig.RFC.ValidacionRequerido])} />,
                CURP: <input.CURP key="CURP" buttonClick={rfcFn} size={formObjConfig.CURP.Size} validations={getValidations([formObjConfig.CURP.ValidacionRequerido])} />,
                TipoPersona: <ddl.TiposPersonaDDL addNewItem={"SO"} id={"TipoPersona"} key="TipoPersona" size={formObjConfig.TipoPersona.Size} validations={getValidations([formObjConfig.TipoPersona.ValidacionRequerido])} />,
                PuntoVenta: <ddl.PuntosVentaDDL addNewItem={"SO"} id={"PuntoVenta"} key="PuntoVenta" IdDesarrollo={IdDesarrollo} size={formObjConfig.PuntoVenta.Size} validations={getValidations([formObjConfig.PuntoVenta.ValidacionRequerido])} />,
                Giro: <ddl.GirosDDL addNewItem={"SO"} id={"Giro"} key="Giro" size={formObjConfig.Giro.Size} validations={getValidations([formObjConfig.Giro.ValidacionRequerido])} />,
                ResidenciaActual: <ddl.TipoResidenciaDDL addNewItem={"SO"} id={"ResidenciaActual"} key="ResidenciaActual" size={formObjConfig.ResidenciaActual.Size} validations={getValidations([formObjConfig.ResidenciaActual.ValidacionRequerido])} />,
                MontoCredito: <input.Currency id={"MontoCredito"} key="MontoCredito" size={formObjConfig.MontoCredito.Size} validations={getValidations([formObjConfig.MontoCredito.ValidacionRequerido])} />,
                MontoPrecalificado: <input.Currency id={"MontoPrecalificado"} key="MontoPrecalificado" size={formObjConfig.MontoPrecalificado.Size} validations={getValidations([formObjConfig.Correo.MontoPrecalificado])} />,
                TipoFinanciamiento: <TiposFinanciamientoDDL id={"TipoFinanciamiento"} key="TipoFinanciamiento" addNewItem={"SO"} size={formObjConfig.TipoFinanciamiento.Size} validations={getValidations([formObjConfig.TipoFinanciamiento.ValidacionRequerido])} />
            };


            mainForm = EK.UX.formatForm(formConfiguration, mainFields);
            additionalForm = EK.UX.formatForm(formConfiguration, additionalFields);

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={<span>{PAGE_ID}
                            <span className="badge badge-success bold" style={{ margin: "0px 5px" }}>{"#" + idEntidad}</span>
                        </span>}
                        icon="icon-note" collapsed={false} hideCollapseButton={true}>
                        <Row>

                            <Column size={[12, 12, 12, 12]} style={{ padding: "0px" }}>
                                {mainForm}
                            </Column>


                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    subTitle="Información Adicional"
                                    icon="fa fa-home"
                                    level={1}
                                    collapsed={true}
                                    hideCollapseButton={false}>
                                    {additionalForm}
                                    <SectionFieldsRendering id="BoletaProspeccionEdit"/>
                                </page.OptionSection>
                            </Column>

                            <Column size={[12, 12, 12, 12]}>
                                <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                            </Column>

                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });
    export const View: any = global.connect(class extends React.Component<IBoletaEditProps, IBoletaEditProps> {
        constructor(props: IBoletaEditProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            formConfiguration: state.global.currentEntityConfiguration$boletasProspeccion,
        });
        render(): JSX.Element {

            if (!isSuccessful(this.props.formConfiguration)) {
                return null;
            }
            let idEntidad: any = getDataID(this.props.entidad) > 0 ? getDataID(this.props.entidad) : "";

            let entidad: any = getData(this.props.entidad);


            //Configuracion del icono
            let color: any = entidad && entidad.Origen ? entidad.Origen.Color : "";
            let colorFondo: any = entidad && entidad.Origen ? entidad.Origen.BGColor : "";
            let icono: any = entidad && entidad.Origen ? entidad.Origen.Icono : "";

            let estiloPersonalizado: React.CSSProperties = {
                color: color != "" ? color : "black",
                backgroundColor: colorFondo != "" ? colorFondo : "black",
                fontSize: "42px",
                margin: "22px 25px 25px 35px"
            };

           
            let estatusEntidad: boolean = entidad && entidad.Estatus && entidad.Estatus.Clave == "DE" ? true : false;

            let ml: any = $ml[config.id];
            let desarrollo: any = entidad && entidad.Desarrollo ? entidad.Desarrollo.Descripcion : "";

            /*Configuracion del formulario*/
          
            let mainForm: any[] = [];
            let additionalForm: any[] = [];

            let formConfiguration: any = getData(this.props.formConfiguration)
            let formObjConfig: any = EK.UX.formatObjConfig(formConfiguration)

            let mainFields: any = {
                Nombre: <div key="Nombre"><label.Nombre size={formObjConfig.Nombre.Size} /></div>,
                ApellidoPaterno: <div key="ApellidoPaterno"><Label id={"ApellidoPaterno"} size={formObjConfig.ApellidoPaterno.Size} /></div>,
                ApellidoMaterno: <div key="ApellidoMaterno"><Label id={"ApellidoMaterno"} size={formObjConfig.ApellidoMaterno.Size} /></div>,
                Creado: <div key="Creado"><label.BadgeDefaultDateSM id="Creado" size={formObjConfig.Creado.Size} value={(e) => [null, e.Creado]} /></div>,
                Estatus: <div key="Estatus"> <Estatus size={formObjConfig.Estatus.Size}/></div>,
                Desarrollo: <div key="Desarrollo"><Label label={ml.form.Desarrollo.label} value={desarrollo} size={formObjConfig.Desarrollo.Size} /></div>,
                Correo: <div key="Correo"><Label id={"Correo"} size={formObjConfig.Correo.Size} /></div>,
                FechaNacimiento: <div key="FechaNacimiento"><label.Fecha id="FechaNacimiento" size={formObjConfig.FechaNacimiento.Size} /></div>,
                Celular: <div key="Celular"><label.Telefono id={"Celular"} size={formObjConfig.Celular.Size} /></div>,
                Telefono: <div key="Telefono"><label.Telefono id={"Telefono"} size={formObjConfig.Telefono.Size} /></div>,
                Domicilio: <div key="Domicilio"> <Label id={"Domicilio"} size={formObjConfig.Domicilio.Size} /></div>,
                NumeroExterior: <div key="NumeroExterior"><Label id={"NumeroExterior"} size={formObjConfig.NumeroExterior.Size} /></div>,
                NSS: <div key="NSS"><Label id={"NSS"} size={formObjConfig.NSS.Size} /></div>,
                CreadoPor: <div key="CreadoPor"><label.General id="CreadoPor" size={formObjConfig.CreadoPor.Size} /></div>,
                EstadoOrigen: <div key="EstadoOrigen"><label.Entidad id="EstadoOrigen" size={formObjConfig.EstadoOrigen.Size} /></div>,
                Asentamiento: <div key="Asentamiento"> <label.Localidad id="Asentamiento" size={formObjConfig.Asentamiento.Size} /></div>,
                Origen: <div key="Origen">
                    <Column size={formObjConfig.Origen.Size}>
                        <span style={estiloPersonalizado} className={icono}></span>
                    </Column>
                </div>,
                MedioPublicidad: <MedioPublicidad key={"MedioPublicidad"} size={formObjConfig.MedioPublicidad.Size} />,
                CampaniaPublicidad: <div key=""><label.Entidad id="CampaniaPublicidad" size={formObjConfig.CampaniaPublicidad.Size} /></div>,
            };

            let additionalFields: any = {
                Genero: <div key="Genero"><label.Entidad id="Genero" size={formObjConfig.Genero.Size} /></div>,
                PaisOrigen: <div key="PaisOrigen"><label.Entidad id="PaisOrigen" size={formObjConfig.PaisOrigen.Size} /></div>,
                RFC: <div key="RFC"><Label id={"RFC"} size={formObjConfig.RFC.Size} /></div>,
                CURP: <div key="CURP"><Label id={"CURP"} size={formObjConfig.CURP.Size} /></div>,
                TipoPersona: <div key="TipoPersona"><label.Entidad id="TipoPersona" size={formObjConfig.TipoPersona.Size} /></div>,
                PuntoVenta: <div key="PuntoVenta"><label.Entidad id="PuntoVenta" size={formObjConfig.PuntoVenta.Size} /></div>,             
                Giro: <div key="CampaniaPublicidad"><label.Entidad id="Giro" size={formObjConfig.Giro.Size} /></div>,
                ResidenciaActual: <div key="ResidenciaActual"><label.Entidad id="ResidenciaActual" size={formObjConfig.ResidenciaActual.Size} /></div>,
                MontoCredito: <div key="MontoCredito"><label.Currency id="MontoCredito" size={formObjConfig.MontoCredito.Size} /></div>,
                MontoPrecalificado: <div key="MontoPrecalificado"><label.Currency id="MontoPrecalificado" size={formObjConfig.MontoPrecalificado.Size} /></div>,
                TipoFinanciamiento: <div key="TipoFinanciamiento"><label.Entidad id="TipoFinanciamiento" size={formObjConfig.TipoFinanciamiento.Size} /></div>
            };

            mainForm = EK.UX.formatForm(formConfiguration, mainFields);
            additionalForm = EK.UX.formatForm(formConfiguration, additionalFields);
  

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={<span>{PAGE_ID}
                            <span className="badge badge-success bold" style={{ margin: "0px 5px" }}>{"#" + idEntidad}</span>
                        </span>}
                        icon="icon-note" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ padding: "0px" }}>
                                    {mainForm}
                            </Column>

                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }} className="hidden-xs djhdhjsdf">
                                <page.OptionSection
                                    subTitle="Información Adicional"
                                    icon="fa fa-home"
                                    level={1}
                                    collapsed={true}
                                    hideCollapseButton={false}>
                                    {additionalForm}
                                    {(estatusEntidad) ?
                                        <label.General id="MotivoRechazo" size={[12, 12, 3, 3]} />
                                        : null
                                    }
                                    <SectionFieldsRendering id="BoletaProspeccionView"/>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 12, 12]}>
                                <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });


    interface IEstatus extends page.IProps {
        size: any;
    };
    export let Estatus: any = global.connect(class extends React.Component<IEstatus, IEstatus> {
        constructor(props: IEstatus) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): any {
            let entidad: any = getData(this.props.entidad);
            let estatus: any = entidad && entidad.Estatus ? entidad.Estatus : "";
            let claveEstatus: string = estatus && estatus.Clave ? estatus.Clave : "";

            let resultad: any = <div></div>;

            let resultEstatus: any = null;

            switch (claveEstatus)
            {
                case "CAP":
                    resultEstatus = <span className="badge bg-blue bg-font-blue" style={{ padding: "4px 15px 4px", height: "100%" }}>{estatus.Nombre} </span>
                    break;
                case "DE":
                    resultEstatus = <span className="badge bg-red-flamingo bg-font-red-flamingo" style={{ padding: "4px 15px 4px", height: "100%" }}>{estatus.Nombre} </span>
                    break;
                case "ASIG":
                    resultEstatus = <span className="badge bg-green-jungle bg-font-green-jungle" style={{ padding: "4px 15px 4px", height: "100%" }}>{estatus.Nombre} </span>
                    break;
                default:
                    resultEstatus = <span className="badge bg-blue bg-font-blue" style={{ padding: "4px 15px 4px", height: "100%" }}>-</span>
            }
            return <Column size={this.props.size}>
                <div className="form-group">
                    <div id="Estatus" className="label-text" style={{ textAlign: "center" }}>
                        Estatus
                        </div>

                    <div id="Estatus_value" className="" style={{ backgroundColor: "transparent", textAlign: "center", padding: "3px" }}>
                        {resultEstatus}
                    </div>
                </div>
            </Column>;

        };
    });

    interface IBoletaProspeccion extends page.IProps {
        campania?: any;
        size?: any;
        validations?: any;
    };

    let MedioPublicidad: any = global.connect(class extends React.Component<IBoletaProspeccion, {}>
    {
        constructor(props: IBoletaProspeccion) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.campania = Forms.getValue("CampaniaPublicidad", config.id);
            return retValue;
        };
        render(): JSX.Element {

            let modeEdit: any = page.canViewEditMode();
            let modeView: any = page.canViewReadMode();
            let entidad: any = getData(this.props.entidad);
            let campaniaPublicidad: any = entidad && entidad.CampaniaPublicidad ? entidad.CampaniaPublicidad : "";

            let campaniaPublicidadForm: any = this.props.campania;

            if (modeEdit && !(campaniaPublicidadForm && campaniaPublicidadForm.ID>0))
            {
                return <div>
                    <ddl.MediosPublicidadDDL {...this.props} addNewItem={"SO"} id={"MedioPublicidad"} size={this.props.size} validations={getValidations([this.props.validations])} />
                </div>
            }


            if (modeView && !(campaniaPublicidad && campaniaPublicidad.ID>0))
            {
                return <div>
                    <label.Entidad id="MedioPublicidad" size={this.props.size} />
                </div>
            }

            return null;
        }
    });

    interface ISectionFieldsRendering extends page.IProps {
        TipoFinanciamiento?: any;
        entity?: DataElement;
        entityState?: DataElement;
    };
    let SectionFieldsRendering: any = global.connect(class extends React.Component<ISectionFieldsRendering, ISectionFieldsRendering> {
        constructor(props: ISectionFieldsRendering) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.TipoFinanciamiento = Forms.getValue("TipoFinanciamiento", config.id);
            retValue.entity = state.global.currentEntity
            retValue.entityState = state.global.currentEntityState
            return retValue;
        };
        shouldComponentUpdate(nextProps: ISectionFieldsRendering, { }): boolean {
            return hasChanged(this.props.TipoFinanciamiento, nextProps.TipoFinanciamiento)
                || hasChanged(this.props.entity, nextProps.entity)
                || hasChanged(this.props.entityState, nextProps.entityState);
        };

        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let entidadState: any = getData(this.props.entityState);
            let formTipoFinanciamiento: any = this.props.TipoFinanciamiento;
            let tipoEntidad: string = "";
            let tipoFinanciamiento: any;
            if (entidadState && entidadState.viewMode) {
                if (entidad.TipoFinanciamiento != null && entidad.TipoFinanciamiento != undefined ) {
                    tipoFinanciamiento = entidad.TipoFinanciamiento;
                    tipoEntidad = config.id + "$" + tipoFinanciamiento.Clave;
                }
                else {
                    tipoEntidad = config.id;
                }
            } else {
                if (formTipoFinanciamiento != null && formTipoFinanciamiento != undefined && formTipoFinanciamiento.ID && formTipoFinanciamiento.ID > 0) {
                    tipoFinanciamiento = formTipoFinanciamiento;
                    tipoEntidad = config.id + "$" + tipoFinanciamiento.Clave;
                }
                else {
                    tipoEntidad = config.id;
                }
            }
            return <FieldsRendering modoView={this.props.entityState} tipoEntidad={tipoEntidad} />
        };
    });


}

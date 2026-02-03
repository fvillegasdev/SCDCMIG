namespace EK.Modules.SCV.Pages.postventa.RUBA.EncuestaPoblacional {
    "use strict";
    const PAGE_ID = "EncuestaPoblacional";
    const FORMCHILD = "CHILDREN";
    const TotalEncuestaYFracc = "TotalEncuestaYFracc";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [TotalEncuestaYFracc]);

    interface IEncuestaPoblacional extends page.IProps {
        modeEdit?: any,
        fraccionamientoSel: any,
        GetNumEncuestadeFracc: (idFracc: string) => {}
    };
    const tipoEncuesta = {
        I: 1,
        V: 2,
        S: 3
    }
    const NumeroHijos = {
        44: 0,
        40: 1,
        41: 2,
        42: 3,
        43: 4,
        163: 0,
        159: 1,
        160: 2,
        161: 3,
        162: 4,
        283: 0,
        279: 1,
        280: 2,
        281: 3,
        282: 4,
    }

    export let Vista = global.connect(class extends React.Component<IEncuestaPoblacional, {}> {
        constructor(props: IEncuestaPoblacional) {
            super(props);
            this.onsave = this.onsave.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.fraccionamientoSel = state.global.FRACCIONAMIENTO_Seleccionado;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            GetNumEncuestadeFracc: (CveFraccionamiento): void => {
                let parametros = global.assign({
                    CVEFRACCIONAMIENTO: CveFraccionamiento
                });
                global.asyncPost("base/kontrol/EncuestaPoblacional/GetBP/GetEncuestaXFraccionamientoLote/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            global.dispatchSuccessful("load::TotalEncuestaFracc", data);
                            break;
                        case AsyncActionTypeEnum.loading:
                            break;
                        case AsyncActionTypeEnum.failed:
                            break;
                    }
                })
            }
        })
        componentWillReceiveProps(nextProps: IEncuestaPoblacional): void {
            if (hasChanged(this.props.fraccionamientoSel, nextProps.fraccionamientoSel) && getDataID(this.props.fraccionamientoSel) !== getDataID(nextProps.fraccionamientoSel)) {
                if (isSuccessful(nextProps.fraccionamientoSel)) {
                    let item: any = global.getData(nextProps.fraccionamientoSel);
                    if (item.Clave !== "Seleccione una opción") {
                        this.props.GetNumEncuestadeFracc(item.Clave);
                        Forms.reset(PAGE_ID);
                        Forms.reset("FORMCHILD")
                    }
                };
            };
        }
        onsave() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let tipoEnc = EK.Store.getState().global.TotalEncuestaFracc.data[0].VOCACIONES;

            let model = Forms.getValues(PAGE_ID);
            console.log(model)
            let modelfracc = Forms.getValues("FRACC");
            let modelChild = Forms.getValues("FORMCHILD");
            let fraccionamiento = modelfracc.Fraccionamiento.Clave
            let rangoEdad = model.RANGOEDADTITULAR;
            let gradoEstudioT = model.ESTUDIOSTITULAR;
            let creenciaReligiosa = model.CREENCIATITULAR;
            let estadoCivil = model.EDOCIVILTITULAR;
            let ocupacion = model.OCUPACIONTITULAR;
            let rangoEdadC = model.RANGOEDADCONYUGE;
            let ocupacionC = model.OCUPACIONCONYUGE;
            let numHijos = model.NUMEROHIJOS;
            let rangoEdadh1 = modelChild.RANGOEDADHIJOS1;
            let rangoEdadh2 = modelChild.RANGOEDADHIJOS2;
            let rangoEdadh3 = modelChild.RANGOEDADHIJOS3;
            let rangoEdadh4 = modelChild.RANGOEDADHIJOS4;
            let gradoEstudioh1 = modelChild.GRADOESCOLARHIJOS1;
            let gradoEstudioh2 = modelChild.GRADOESCOLARHIJOS2;
            let gradoEstudioh3 = modelChild.GRADOESCOLARHIJOS3;
            let gradoEstudioh4 = modelChild.GRADOESCOLARHIJOS4;
            let rangoEdadAdulto = model.RANGOEDADA;
            let economicamenteAct = model.ECONOMICAA;
            // let tiempoVivienda = model.TIEMPOVIVIENDA;
            let mascota = model.MASCOTA;
            let actividadesPreferidas = model.ACTIVIDADESPREFERIDAS;
            //let fisicas = model.FISICAS;
            //let culturales = model.CULTURALES;
            //let sociales = model.SOCIALES;
            //let aireLibre = model.AIRELIBRE;
            let actExtraescolares = model.EXTRAESCOLARES;
            let gustoFracc = model.GUSTOFRACCIONAMIENTO;
            let mejora = model.MEJORAFRACCIONAMIENTO;
            let tEncuesta = tipoEncuesta[tipoEnc];


            //P nultiopcion
            //P. 14 mascotas
            let Perro, Gato, Otro14, NA14;
            //P. 16 Actividades extraescolares
            let Deportivas, Artisticas, Oficios, Idiomas, Computacion, Otra16
            //P17
            let Ubicacion, Entorno, Equipamientos, AreasVerdes, AreasRecreativas, DisenioCasas, Seguridad;
            //918
            let Ubicacion18, Entorno18, Equipamientos18, AreasVerdes18, AreasRecreativas18, DisenioCasas18, Seguridad18;
            if (tEncuesta === 1) {
                //P. 14 mascotas
                Perro = model.Perro67 ? 67 : null;
                Gato = model.Gato68 ? 68 : null;
                Otro14 = model.Otro69 ? 69 : null;
                NA14 = model.NA394 ? 394 : null;

                //P. 15 Actividades extraescolares
                //Deportivas = model.Deportivas86 ? 86 : null;
                //Artisticas = model.Artisticas87 ? 87 : null;
                //Oficios = model.Oficios88 ? 88 : null;
                //Idiomas = model.Idiomas89 ? 89 : null;
                //Computacion = model.Computacion90 ? 90 : null;
                //Otra16 = model.Otra91 ? 91 : null;

                //P.17 
                Ubicacion = model.Ubicacion101 ? 101 : null;
                Entorno = model.Entorno102 ? 102 : null;
                Equipamientos = model.Equipamientos103 ? 103 : null;
                AreasVerdes = model.AreasVerdes104 ? 104 : null;
                AreasRecreativas = model.AreasRecreativas105 ? 105 : null;
                DisenioCasas = model.DisenioCasa106 ? 106 : null;
                // Seguridad = model.Seguridad107 ? 107 : null;

                //P.18
                Ubicacion18 = model.Ubicacion108 ? 108 : null;
                Entorno18 = model.Entorno109 ? 109 : null;
                Equipamientos18 = model.Equipamientos110 ? 110 : null;
                AreasVerdes18 = model.AreasVerdes111 ? 111 : null;
                AreasRecreativas18 = model.AreasRecreativas112 ? 112 : null;
                DisenioCasas18 = model.DisenioCasas113 ? 113 : null;
                // Seguridad18 = model.Seguridad114 ? 114 : null;


            }
            if (tEncuesta === 2) {
                //P. 14 mascotas
                Perro = model.Perro186 ? 186 : null;
                Gato = model.Gato187 ? 187 : null;
                Otro14 = model.Otro188 ? 188 : null;
                NA14 = model.NA393 ? 393 : null;

                //P. 15 Actividades extraescolares
                //Deportivas = model.Deportivas205 ? 205 : null;
                //Artisticas = model.Artisticas206 ? 206 : null;
                //Oficios = model.Oficios207 ? 207 : null;
                //Idiomas = model.Idiomas208 ? 208 : null;
                //Computacion = model.Computacion209 ? 209 : null;
                //Otra16 = model.Otra210 ? 210 : null;

                //P.17
                Ubicacion = model.Ubicacion220 ? 220 : null;
                Entorno = model.Entorno221 ? 221 : null;
                Equipamientos = model.Equipamientos222 ? 222 : null;
                AreasVerdes = model.AreasVerdes223 ? 223 : null;
                AreasRecreativas = model.AreasRecreativas224 ? 224 : null;
                DisenioCasas = model.DisenioCasas225 ? 225 : null;
                // Seguridad = model.Seguridad226 ? 226 : null;

                //P.18
                Ubicacion18 = model.Ubicacion227 ? 227 : null;
                Entorno18 = model.Entorno228 ? 228 : null;
                Equipamientos18 = model.Equipamientos229 ? 229 : null;
                AreasVerdes18 = model.AreasVerdes230 ? 230 : null;
                AreasRecreativas18 = model.AreasRecreativas231 ? 231 : null;
                DisenioCasas18 = model.DisenioCasas232 ? 232 : null;
                //  Seguridad18 = model.Seguridad235 ? 235 : null;

            }
            if (tEncuesta === 3) {
                //P. 14 mascotas
                Perro = model.Perro306 ? 306 : null;
                Gato = model.Gato307 ? 307 : null;
                Otro14 = model.Otro308 ? 308 : null;
                NA14 = model.NA392 ? 392 : null;

                //P. 15 Actividades extraescolares
                //Deportivas = model.Deportivas325 ? 325 : null;
                //Artisticas = model.Artisticas326 ? 326 : null;
                //Oficios = model.Oficios327 ? 327 : null;
                //Idiomas = model.Idiomas328 ? 328 : null;
                //Computacion = model.Computacion329 ? 329 : null;
                //Otra16 = model.Otra330 ? 330 : null;

                //P.17
                Ubicacion = model.Ubicacion340 ? 340 : null;
                Entorno = model.Entorno341 ? 341 : null;
                Equipamientos = model.Equipamientos342 ? 342 : null;
                AreasVerdes = model.AreasVerdes343 ? 343 : null;
                AreasRecreativas = model.AreasRecreativas344 ? 344 : null;
                DisenioCasas = model.DisenioCasas345 ? 345 : null;
                //  Seguridad = model.Seguridad346 ? 346 : null;

                //p18
                Ubicacion18 = model.Ubicacion347 ? 347 : null;
                Entorno18 = model.Entorno348 ? 348 : null;
                Equipamientos18 = model.Equipamientos349 ? 349 : null;
                AreasVerdes18 = model.AreasVerdes350 ? 350 : null;
                AreasRecreativas18 = model.AreasRecreativas351 ? 351 : null;
                DisenioCasas18 = model.DisenioCasas352 ? 352 : null;
                // Seguridad18 = model.Seguridad353 ? 353 : null;
            }

            if (rangoEdad === undefined || gradoEstudioT === undefined || creenciaReligiosa === undefined || estadoCivil === undefined || ocupacion === undefined) {
                warning("Los datos del titular de credito son obligatorios", "Aviso")
                return
            }
            let NoHijos;
            if (numHijos !== undefined) {
                NoHijos = NumeroHijos[numHijos]
                if (NoHijos === 1) {
                    if (rangoEdadh1 === undefined || gradoEstudioh1 === undefined) {
                        warning("Información incompleta en la sección hijos", "Aviso")
                        return
                    }
                }
                if (NoHijos === 2) {
                    if (rangoEdadh1 === undefined || gradoEstudioh1 === undefined ||
                        rangoEdadh2 === undefined || gradoEstudioh2 === undefined) {
                        warning("Información incompleta en la sección hijos", "Aviso")
                        return
                    }
                }
                if (NoHijos === 3) {
                    if (rangoEdadh1 === undefined || gradoEstudioh1 === undefined ||
                        rangoEdadh2 === undefined || gradoEstudioh2 === undefined ||
                        rangoEdadh3 === undefined || gradoEstudioh3 === undefined) {
                        warning("Información incompleta en la sección hijos", "Aviso")
                        return
                    }
                }
                if (NoHijos === 4) {
                    if (rangoEdadh1 === undefined || gradoEstudioh1 === undefined ||
                        rangoEdadh2 === undefined || gradoEstudioh2 === undefined ||
                        rangoEdadh3 === undefined || gradoEstudioh3 === undefined ||
                        rangoEdadh4 === undefined || gradoEstudioh4 === undefined) {
                        warning("Información incompleta en la sección hijos", "Aviso")
                        return
                    }
                }
            }
            if (rangoEdadC === "COMITIR") {
                rangoEdadC = null;
            }
            if (ocupacionC === "COMITIROCUPACION") {
                ocupacionC = null;
            }
            if (rangoEdadAdulto === 'AOMITIR') {
                rangoEdadAdulto = null;
            }
            if (economicamenteAct === 'AEOMITIR') {
                economicamenteAct = null;
            }
            if (mascota == 'MOMITIR') {
                mascota = null;
            }
            if (rangoEdadh1 !== undefined) {
                rangoEdadh1 = rangoEdadh1.substring(2)
            }
            if (rangoEdadh2 !== undefined) {
                rangoEdadh2 = rangoEdadh2.substring(2)
            }
            if (rangoEdadh3 !== undefined) {
                rangoEdadh3 = rangoEdadh3.substring(2)
            }
            if (rangoEdadh4 !== undefined) {
                rangoEdadh4 = rangoEdadh4.substring(2)
            }
            if (gradoEstudioh1 !== undefined) {
                gradoEstudioh1 = gradoEstudioh1.substring(2)
            }
            if (gradoEstudioh2 !== undefined) {
                gradoEstudioh2 = gradoEstudioh2.substring(2)
            }
            if (gradoEstudioh3 !== undefined) {
                gradoEstudioh3 = gradoEstudioh3.substring(2)
            }
            if (gradoEstudioh4 !== undefined) {
                gradoEstudioh4 = gradoEstudioh4.substring(2)
            }

            let parametros = global.assign({
                RANGOEDADTITULAR: rangoEdad,
                GRADOESTUDIOTITULAR: gradoEstudioT,
                CREENCIARELIGIOSATITULAR: creenciaReligiosa,
                ESTADOCIVILTITULAR: estadoCivil,
                OCUPACIONTITULAR: ocupacion,
                RANGOEDADCONYUGE: rangoEdadC,
                OCUPACIONCONYUGE: ocupacionC,
                NUMEROHIJOS: numHijos,
                RANGOEDADH1: rangoEdadh1,
                RANGOEDADH2: rangoEdadh2,
                RANGOEDADH3: rangoEdadh3,
                RANGOEDADH4: rangoEdadh4,
                GRADOESTUDIOH1: gradoEstudioh1,
                GRADOESTUDIOH2: gradoEstudioh2,
                GRADOESTUDIOH3: gradoEstudioh3,
                GRADOESTUDIOH4: gradoEstudioh4,
                RANGOEDADADULTO: rangoEdadAdulto,
                ECONOMICAMENTEACTIVO: economicamenteAct,
                // TIEMPOVIVIENDA: tiempoVivienda,
                //  MASCOTA: mascota,
                PERRO: Perro,
                GATO: Gato,
                OTROMASCOTA: Otro14,
                NA14: NA14,
                ACTIVIDADPREFERIDA: actividadesPreferidas,
                //FISICAS: fisicas,
                //CULTURALES: culturales,
                //SOCIALES: sociales,
                //AIRELIBRE: aireLibre,
                ACTIVIDADEXTRAESCOLAR: actExtraescolares,
                //DEPORTIVAS: Deportivas,
                //ARTISTICAS: Artisticas,
                //OFICIOS: Oficios,
                //IDIOMAS: Idiomas,
                //COMPUTACION: Computacion,
                //OTRAACTIVIDADEX: Otra16,
                //GUSTOFRACCIONAMIENTO: gustoFracc,
                UBICACION: Ubicacion,
                ENTORNO: Entorno,
                EQUIPAMIENTOS: Equipamientos,
                AREASVERDES: AreasVerdes,
                AREASRECREATIVAS: AreasRecreativas,
                DISENIOCASAS: DisenioCasas,
                //SEGURIDAD:Seguridad,
                //MEJORA: mejora,
                UBICACIONMEJORA: Ubicacion18,
                ENTORNOMEJORA: Entorno18,
                EQUIPAMIENTOSMEJORA: Equipamientos18,
                AREASVERDESMEJORA: AreasVerdes18,
                AREASRECREATIVASMEJORA: AreasRecreativas18,
                DISENIOCASASMEJORA: DisenioCasas18,
                //SEGURIDADMEJORA:Seguridad18,
                TIPOENCUESTA: tEncuesta,
                FRACCIONAMIENTO: fraccionamiento
            })
             console.log(parametros)
            global.asyncPost("base/kontrol/EncuestaPoblacional/GetBP/SaveSurvay/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito");
                            Forms.reset(PAGE_ID);
                            Forms.reset("FRACC");
                            Forms.reset("FORMCHILD");
                            dispatchSuccessful("load::FRACCIONAMIENTO_Seleccionado", {
                                ID: -1,
                                Clave: "Seleccione una opción",
                                Nombre: "Seleccione una opción",
                                Descripcion: "Seleccione una opción",
                                Apellidos: "",
                                id: -1,
                                text: "Seleccione una opción"
                            });
                            Forms.updateFormElement("FRACC", "Fraccionamiento", {
                                ID: -1,
                                Clave: "Seleccione una opción",
                                Nombre: "Seleccione una opción",
                                Descripcion: "Seleccione una opción",
                                Apellidos: "",
                                id: -1,
                                text: "Seleccione una opción"
                            });
                        } else {
                            warning(data[0].msg, "Aviso");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                }
            })
        }
        onCancel() {
            Forms.reset(PAGE_ID);
        }
        componentDidMount(): any {
            Forms.updateFormElement("FRACC", "Fraccionamiento", { ID: -1, Clave: "Seleccione una opción" });
            Forms.updateFormElement(PAGE_ID, "Fecha", global.getToday().toString());
        };
        numberChildren(number) {
            Forms.reset("FORMCHILD")
            let rangoh1 = document.getElementById("RANGOEDADH1");
            let gradoh1 = document.getElementById("GRADOESCOLARH1");
            let rangoh2 = document.getElementById("RANGOEDADH2");
            let gradoh2 = document.getElementById("GRADOESCOLARH2");
            let rangoh3 = document.getElementById("RANGOEDADH3");
            let gradoh3 = document.getElementById("GRADOESCOLARH3");
            let rangoh4 = document.getElementById("RANGOEDADH4");
            let gradoh4 = document.getElementById("GRADOESCOLARH4");
            switch (number) {
                case 0:
                    rangoh1.style.display = 'none';
                    gradoh1.style.display = 'none';
                    rangoh2.style.display = 'none';
                    gradoh2.style.display = 'none';
                    rangoh3.style.display = 'none';
                    gradoh3.style.display = 'none';
                    rangoh4.style.display = 'none';
                    gradoh4.style.display = 'none';
                    break;
                case 1:
                    rangoh1.style.display = 'inherit';
                    gradoh1.style.display = 'inherit';
                    rangoh2.style.display = 'none';
                    gradoh2.style.display = 'none';
                    rangoh3.style.display = 'none';
                    gradoh3.style.display = 'none';
                    rangoh4.style.display = 'none';
                    gradoh4.style.display = 'none';
                    break
                case 2:
                    rangoh1.style.display = 'inherit';
                    gradoh1.style.display = 'inherit';
                    rangoh2.style.display = 'inherit';
                    gradoh2.style.display = 'inherit';
                    rangoh3.style.display = 'none';
                    gradoh3.style.display = 'none';
                    rangoh4.style.display = 'none';
                    gradoh4.style.display = 'none';
                    break
                case 3:
                    rangoh1.style.display = 'inherit';
                    gradoh1.style.display = 'inherit';
                    rangoh2.style.display = 'inherit';
                    gradoh2.style.display = 'inherit';
                    rangoh3.style.display = 'inherit';
                    gradoh3.style.display = 'inherit';
                    rangoh4.style.display = 'none';
                    gradoh4.style.display = 'none';
                    break
                case 4:
                    rangoh1.style.display = 'inherit';
                    gradoh1.style.display = 'inherit';
                    rangoh2.style.display = 'inherit';
                    gradoh2.style.display = 'inherit';
                    rangoh3.style.display = 'inherit';
                    gradoh3.style.display = 'inherit';
                    rangoh4.style.display = 'inherit';
                    gradoh4.style.display = 'inherit';
                    break
                default:
                    break
            }
        }
        showNextActivities(seccion) {
            let culturales = document.getElementById("CULT")
            let sociales = document.getElementById("SOC")
            let aire = document.getElementById("AIR")
            switch (seccion) {
                case 'CULT':
                    culturales.style.display = 'inherit';
                    break
                case 'SOC':
                    sociales.style.display = 'inherit';
                    break
                case 'AIR':
                    aire.style.display = 'inherit';
                    break
            }
        }
        render(): JSX.Element {
            let totales = 0;
            let encuestas = 0;
            let viviendas;
            let vocaciones;
            let enableButton = false;
            if (isSuccessful(EK.Store.getState().global.TotalEncuestaFracc)) {
                totales = getData(EK.Store.getState().global.TotalEncuestaFracc);
                encuestas = totales[0].ENCUESTAS;
                viviendas = totales[0].VIVIENDAS;
                vocaciones = totales[0].VOCACIONES;
            }
            let enable = false;
            let fracc;
            if (isSuccessful(this.props.fraccionamientoSel)) {
                fracc = this.props.fraccionamientoSel.data;
                if (fracc.ID !== -1) {
                    enable = true
                }
            }
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";

            };
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "white";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <PageButtons>
                    {
                        enable ?
                            <Button id={"btnNew"} className={"btn btn-info"} rounded={false} iconOnly={false} icon="icon-cloud-upload" text={"Guardar"} onClick={this.onsave} style={{ marginRight: 5, color, backgroundColor: "#4EC9A2" }} />
                            : null
                    }
                </PageButtons>

                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Encuesta Poblacional"}
                    level={2}
                    icon="fas fa-poll-people"
                    collapsed={false}>
                    <Row>
                        {
                            //================================================================
                            // FORMULARIO FRACCIONAMIENTO FECHA
                            //================================================================
                        }
                        <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                            {
                                enable ?
                                    <h3 style={{ textAlign: 'center' }}>Encuestas  {encuestas}  de {viviendas}</h3>
                                    : null
                            }
                            <Fraccionamientos id={"Fraccionamiento"} label={"Fraccionamiento"} size={[12, 12, 10, 10]} idFormSection={"FRACC"} validations={[validations.required()]} required={true} />
                            <label.Fecha id="Fecha" label={"Fecha Captura"} value={fecha} size={[12, 12, 2, 2]} />
                        </Column>
                    </Row>
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="Guardando..." />
                    </div>
                    {
                        //================================================================
                        // FORMULARIO DATOS DEL TITULAR DE CREDITO
                        // Nota: el Id de los radiobutton son los id de relacion
                        //================================================================
                        enable ?
                            <div id="loadedData">
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={"DATOSTITULAR"}
                                            subTitle={"Datos del titular del crédito"}
                                            level={2}
                                            icon="fas fa-user"
                                            collapsed={false}>
                                            <Row>
                                                <Column size={[12, 12, 2, 2]} className="">
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 1. Rango de edad </strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            <div>
                                                                {
                                                                    vocaciones === "I" ?
                                                                        <div>
                                                                            <RadioButton id="1" label="18 a 25" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="2" label="26 a 31" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="3" label="32 a 37" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="4" label="38 a 45" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="5" label="Más de 45" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                        </div> : null

                                                                }
                                                                {
                                                                    vocaciones === "V" ?
                                                                        <div>
                                                                            <RadioButton id="115" label="18 a 25" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="116" label="26 a 31" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="117" label="32 a 37" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="118" label="38 a 45" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="119" label="Más de 45" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                        </div> : null

                                                                }
                                                                {
                                                                    vocaciones === "S" ?
                                                                        <div>
                                                                            <RadioButton id="239" label="18 a 25" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="240" label="26 a 31" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="241" label="32 a 37" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="242" label="38 a 45" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="243" label="Más de 45" idForm={PAGE_ID} groupName="RANGOEDADTITULAR" size={[12, 12, 12, 12]} />
                                                                        </div> : null

                                                                }
                                                            </div>
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 2, 2]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 2. Grado de estudios </strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="10" label="Primaria" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="11" label="Secundaria" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="12" label="Técnica" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="13" label="Preparatoría" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="14" label="Universidad" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="15" label="Maestría" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="16" label="Doctorado" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="376" label="Otro" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                    </div> : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="124" label="Primaria" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="125" label="Secundaria" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="126" label="Técnica" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="127" label="Preparatoría" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="128" label="Universidad" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="129" label="Maestría" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="130" label="Doctorado" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="377" label="Otro" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                    </div> : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="248" label="Primaria" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="249" label="Secundaria" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="250" label="Técnica" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="251" label="Preparatoría" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="252" label="Universidad" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="253" label="Maestría" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="254" label="Doctorado" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="378" label="Otro" idForm={PAGE_ID} groupName="ESTUDIOSTITULAR" size={[12, 12, 12, 12]} />
                                                                    </div> : null
                                                            }
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 2, 2]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 3. Creencia religiosa </strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="23" label="Católica" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="24" label="Cristiana" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="25" label="Testigo de Jehová" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="26" label="Mormona" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="27" label="Adventista" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="28" label="Ninguno(a)" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                    </div> : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="139" label="Católica" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="140" label="Cristiana" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="141" label="Testigo de Jehová" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="142" label="Mormona" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="143" label="Adventista" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="144" label="Ninguno(a)" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                    </div> : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="262" label="Católica" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="263" label="Cristiana" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="264" label="Testigo de Jehová" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="265" label="Mormona" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="266" label="Adventista" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="267" label="Ninguno(a)" idForm={PAGE_ID} groupName="CREENCIATITULAR" size={[12, 12, 12, 12]} />
                                                                    </div> : null
                                                            }
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 2, 2]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 4. Estado civil </strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="6" label="Soltero" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="7" label="Casado" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="8" label="Divorciado" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="9" label="Unión libre" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="356" label="Otro" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="120" label="Soltero" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="121" label="Casado" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="122" label="Divorciado" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="123" label="Unión libre" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="234" label="Otro" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="244" label="Soltero" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="245" label="Casado" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="246" label="Divorciado" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="247" label="Unión libre" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="354" label="Otro" idForm={PAGE_ID} groupName="EDOCIVILTITULAR" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 4, 4]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 5. Ocupación</strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="17" label="Empleado sector privado" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="18" label="Empleado sector público" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="19" label="Empresario o negocio propio" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="20" label="Profesionista independiente" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="379" label="Sector educativo" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="387" label="Desempleado" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="236" label="Otro(a)" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="357" label="Empleado sector privado" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="358" label="Empleado sector público" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="359" label="Empresario o negocio propio" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="360" label="Profesionista independiente" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="380" label="Sector educativo" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="137" label="Desempleado" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="138" label="Otro(a)" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="255" label="Empleado sector privado" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="256" label="Empleado sector público" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="257" label="Empresario o negocio propio" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="258" label="Profesionista independiente" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="381" label="Sector educativo" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="388" label="Desempleado" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="261" label="Otro(a)" idForm={PAGE_ID} groupName="OCUPACIONTITULAR" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={PAGE_ID}
                                            subTitle={"Cónyuge"}
                                            level={2}
                                            icon="fas fa-user"
                                            collapsed={false}>
                                            <Row>
                                                <Column size={[12, 12, 4, 4]} className="">
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 6. Rango de edad </strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="29" label="15 a 25" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="30" label="26 a 31" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="31" label="32 a 37" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="32" label="38 a 45" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="33" label="Más de 45" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="COMITIR" label="Omitir" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="145" label="15 a 25" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="146" label="26 a 31" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="147" label="32 a 37" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="148" label="38 a 45" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="149" label="Más de 45" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="COMITIR" label="Omitir" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="268" label="15 a 25" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="269" label="26 a 31" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="270" label="32 a 37" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="271" label="38 a 45" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="272" label="Más de 45" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="COMITIR" label="Omitir" idForm={PAGE_ID} groupName="RANGOEDADCONYUGE" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 8, 8]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 7. Ocupación</strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="37" label="Empleado sector privado" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="36" label="Empleado sector público" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="35" label="Empresario o negocio propio" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="38" label="Profesionista independiente" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="382" label="Sector educativo" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="386" label="Desempleado" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="39" label="Otro(a)" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="COMITIROCUPACION" label="Omitir" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="363" label="Empleado sector privado" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="364" label="Empleado sector público" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="365" label="Empresario o negocio propio" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="366" label="Profesionista independiente" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="383" label="Sector educativo" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="157" label="Desempleado" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="158" label="Otro(a)" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="COMITIROCUPACION" label="Omitir" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="369" label="Empleado sector privado" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="370" label="Empleado sector público" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="371" label="Empresario o negocio propio" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="372" label="Profesionista independiente" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                        <Column size={[12, 12, 6, 6]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                            <RadioButton id="384" label="Sector educativo" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="384" label="Desempleado" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="375" label="Otro(a)" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                            <RadioButton id="COMITIROCUPACION" label="Omitir" idForm={PAGE_ID} groupName="OCUPACIONCONYUGE" size={[12, 12, 12, 12]} />
                                                                        </Column>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={PAGE_ID}
                                            subTitle={"Hijos"}
                                            level={2}
                                            icon="fas fa-users"
                                            collapsed={false}>
                                            <Row>
                                                <Column size={[12, 12, 12, 12]} className="" style={{ paddingBottom: "15px" }}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 8. No. Hijos </strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="44" label="0" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(0)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="40" label="1" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(1)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="41" label="2" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(2)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="42" label="3" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(3)} size={[12, 12, 2, 2]} />
                                                                        <RadioButton id="43" label="4" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(4)} size={[12, 12, 1, 1]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="163" label="0" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(0)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="159" label="1" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(1)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="160" label="2" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(2)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="161" label="3" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(3)} size={[12, 12, 2, 2]} />
                                                                        <RadioButton id="162" label="4" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(4)} size={[12, 12, 1, 1]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="283" label="0" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(0)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="279" label="1" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(1)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="280" label="2" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(2)} size={[12, 12, 3, 3]} />
                                                                        <RadioButton id="281" label="3" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(3)} size={[12, 12, 2, 2]} />
                                                                        <RadioButton id="282" label="4" idForm={PAGE_ID} groupName="NUMEROHIJOS" change={() => this.numberChildren(4)} size={[12, 12, 1, 1]} />
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                            <Row>
                                                <Column size={[12, 12, 12, 12]} className="" style={{ margin: "0px" }}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 9. Rango de edad </strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px", margin: "0px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="RANGOEDADH1" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Hijo(a) #1 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H145" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H146" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H147" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H148" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H149" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H150" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="RANGOEDADH1" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #1 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H1164" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1165" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1166" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1167" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1168" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1169" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="RANGOEDADH1" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #1 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H1284" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1285" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1286" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1287" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1288" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1289" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS1" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="RANGOEDADH2" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #2 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H245" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H246" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H247" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H248" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H249" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H250" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="RANGOEDADH2" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #2 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H2164" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2165" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2166" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2167" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2168" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2169" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="RANGOEDADH2" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #2 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H2284" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2285" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2286" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2287" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2288" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2289" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS2" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="RANGOEDADH3" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #3 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H345" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H346" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H347" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H348" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H349" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H350" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="RANGOEDADH3" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Hijo(a) #3 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H3164" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3165" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3166" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3167" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3168" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3169" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="RANGOEDADH3" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Hijo(a) #3 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H3284" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3285" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3286" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3287" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3288" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3289" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS3" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="RANGOEDADH4" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #4 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H445" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H446" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H447" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H448" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H449" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H450" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="RANGOEDADH4" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #4 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H4164" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4165" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4166" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4167" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4168" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4169" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="RANGOEDADH4" style={{ display: 'none' }} >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #4 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H4284" label="0 a 4" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4285" label="5 y 6" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4286" label="7 a 11" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4287" label="12 a 14" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4288" label="15 a 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4289" label="Más de 18" idFormSection={"FORMCHILD"} groupName="RANGOEDADHIJOS4" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 12, 12]} className="" style={{ margin: 0 }}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 10. Grado escolar</strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px", margin: 0 }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="GRADOESCOLARH1" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px", margin: 0 }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Hijo(a) #1 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H151" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H152" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H153" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H154" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H155" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H156" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1389" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="GRADOESCOLARH1" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Hijo(a) #1 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H1170" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1171" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1172" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1173" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1174" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1175" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1390" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="GRADOESCOLARH1" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #1 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H1290" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1291" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1292" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1293" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1294" label="Preparatoria" idForm={FORMCHILD} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H1295" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[10, 12, 2, 2]} />
                                                                            <RadioButton id="H1391" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS1" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="GRADOESCOLARH2" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #2 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H251" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H252" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H253" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H254" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H255" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H256" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2389" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="GRADOESCOLARH2" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #2 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H2170" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2171" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2172" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2173" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2174" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2175" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2390" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="GRADOESCOLARH2" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Hijo(a) #2 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H2290" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2291" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2292" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2293" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2294" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2295" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H2391" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS2" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="GRADOESCOLARH3" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #3 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H351" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H352" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H353" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H354" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H355" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H356" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3389" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="GRADOESCOLARH3" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #3 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H3170" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3171" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3172" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3173" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3174" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3175" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3390" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="GRADOESCOLARH3" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #3 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H3290" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3291" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3292" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3293" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3294" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3295" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H3391" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS3" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingBottom: "15px" }}>
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="GRADOESCOLARH4" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #4 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H451" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H452" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H453" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H454" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H455" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H456" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4389" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="GRADOESCOLARH4" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #4 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H4170" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4171" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4172" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4173" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4174" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4175" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4390" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="GRADOESCOLARH4" style={{ display: 'none' }} className="animated zoomIn" >
                                                                        <FadeInColumn size={[12, 12, 12, 12]} className="">
                                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "15px" }} >
                                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>  Hijo(a) #4 </strong> </h6></span>
                                                                            </Column>
                                                                            <RadioButton id="H4290" label="Kinder" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4291" label="Primaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4292" label="Secundaria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4293" label="Técnica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4294" label="Preparatoria" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4295" label="Universidad" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                            <RadioButton id="H4391" label="No Aplica" idFormSection={"FORMCHILD"} groupName="GRADOESCOLARHIJOS4" size={[12, 12, 2, 2]} />
                                                                        </FadeInColumn>
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column size={[12, 12, 3, 3]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={PAGE_ID}
                                            subTitle={"Adultos mayores"}
                                            level={2}
                                            icon="fas fa-users"
                                            collapsed={false}>
                                            <Row>
                                                <Column size={[12, 12, 6, 6]} className="">
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 11. Rango de edad </strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="57" label="60 a 70" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="58" label="71 a 80" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="59" label="Más de 80" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="AOMITIR" label="Omitir" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="176" label="60 a 70" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="177" label="71 a 80" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="178" label="Más de 80" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="AOMITIR" label="Omitir" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="296" label="60 a 70" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="297" label="71 a 80" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="298" label="Más de 80" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="AOMITIR" label="Omitir" idForm={PAGE_ID} groupName="RANGOEDADA" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 6, 6]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 12. Económicamente activo</strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="60" label="Si" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="61" label="No" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="AEOMITIR" label="Omitir" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="179" label="Si" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="180" label="No" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="AEOMITIR" label="Omitir" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="299" label="Si" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="300" label="No" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="AEOMITIR" label="Omitir" idForm={PAGE_ID} groupName="ECONOMICAA" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                    <Column size={[12, 12, 9, 9]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={PAGE_ID}
                                            subTitle={"Generales para su vivienda"}
                                            level={2}
                                            icon="fas fa-home"
                                            collapsed={false}>
                                            <Row>
                                                {/*<Column size={[12, 12, 3, 3]} className="">
                                                //    <Row>
                                                //        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                //            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 13. Tiempo en que habita su vivienda</strong> </h6></span>
                                                //        </Column>
                                                //        <Column size={[12, 12, 12, 12]} className="events-container">
                                                //            {
                                                //                vocaciones === "I" ?
                                                //                    <div>
                                                //                        <RadioButton id="62" label="Menos de 1 mes" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="63" label="1 a 3 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="64" label="3 a 6 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="65" label="6 a 12 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="66" label="Más de 1 año" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                    </div>
                                                //                    : null
                                                //            }
                                                //            {
                                                //                vocaciones === "V" ?
                                                //                    <div>
                                                //                        <RadioButton id="181" label="Menos de 1 mes" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="182" label="1 a 3 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="183" label="3 a 6 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="184" label="6 a 12 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="185" label="Más de 1 año" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                    </div>
                                                //                    : null
                                                //            }
                                                //            {
                                                //                vocaciones === "S" ?
                                                //                    <div>
                                                //                        <RadioButton id="301" label="Menos de 1 mes" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="302" label="1 a 3 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="303" label="3 a 6 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="304" label="6 a 12 meses" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                        <RadioButton id="305" label="Más de 1 año" idForm={PAGE_ID} groupName="TIEMPOVIVIENDA" size={[12, 12, 12, 12]} />
                                                //                    </div>
                                                //                    : null
                                                //            }

                                                //        </Column>
                                                //    </Row>
                                                //</Column>*/}
                                                <Column size={[12, 12, 6, 6]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 13. Tipo de mascota en casa</strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Perro67"} idForm={PAGE_ID} label={"Perro"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Gato68"} idForm={PAGE_ID} label={"Gato"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Otro69"} idForm={PAGE_ID} label={"Otro(a)"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"NA394"} idForm={PAGE_ID} label={"N/A"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        {/*<RadioButton id="67" label="Perro" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="68" label="Gato" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="69" label="Otro(a)" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />*/}
                                                                        {/*<RadioButton id="MOMITIR" label="Omitir" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Perro186"} idForm={PAGE_ID} label={"Perro"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Gato187"} idForm={PAGE_ID} label={"Gato"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Otro188"} idForm={PAGE_ID} label={"Otro(a)"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"NA393"} idForm={PAGE_ID} label={"N/A"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        {/*<RadioButton id="186" label="Perro" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="187" label="Gato" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="188" label="Otro(a)" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />*/}
                                                                        {/*<RadioButton id="MOMITIR" label="Omitir" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Perro306"} idForm={PAGE_ID} label={"Perro"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Gato307"} idForm={PAGE_ID} label={"Gato"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Otro308"} idForm={PAGE_ID} label={"Otro(a)"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"NA392"} idForm={PAGE_ID} label={"N/A"} size={[12, 12, 12, 3]} validations={[validations.required()]} required={true} />
                                                                        {/*<RadioButton id="306" label="Perro" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="307" label="Gato" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="308" label="Otro(a)" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />*/}
                                                                        {/*<RadioButton id="MOMITIR" label="Omitir" idForm={PAGE_ID} groupName="MASCOTA" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                          
                                                <Column size={[12, 12, 6, 6]}>
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 14. ¿Cuál es su actividad preferida?</strong></h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container" style={{ paddingTop: "15px" }}>
                                                            {/*<Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Físicas</strong></h6></span>
                                                            </Column>*/}
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <RadioButton id="70" label="Físicas" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="71" label="2" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="72" label="3" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="73" label="4" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <RadioButton id="189" label="Físicas" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="190" label="2" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="191" label="3" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="192" label="4" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <RadioButton id="309" label="Físicas" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="310" label="2" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="311" label="3" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="312" label="4" idForm={PAGE_ID} groupName="FISICAS" change={() => this.showNextActivities("CULT")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                            {/* </Column>
                                                        <Column size={[12, 12, 3, 3]} className="events-container">
                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Culturales</strong></h6></span>
                                                            </Column>*/}
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="CULT" >
                                                                        <RadioButton id="74" label="Culturales" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="75" label="2" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="76" label="3" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="77" label="4" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="CULT" >
                                                                        <RadioButton id="193" label="Culturales" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="194" label="2" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="195" label="3" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="196" label="4" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="CULT" >
                                                                        <RadioButton id="313" label="Culturales" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="314" label="2" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="315" label="3" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="316" label="4" idForm={PAGE_ID} groupName="CULTURALES" change={() => this.showNextActivities("SOC")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                            {/*</Column>
                                                        <Column size={[12, 12, 3, 3]} className="events-container">
                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> Sociales</strong></h6></span>
                                                            </Column>*/}
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="SOC" >
                                                                        <RadioButton id="78" label="Sociales" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="79" label="2" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="80" label="3" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="81" label="4" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="SOC" >
                                                                        <RadioButton id="197" label="Sociales" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 3]} />
                                                                        {/*<RadioButton id="198" label="2" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="199" label="3" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="200" label="4" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="SOC" >
                                                                        <RadioButton id="317" label="Sociales" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 3]} />
                                                                        {/* <RadioButton id="318" label="2" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="319" label="3" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="320" label="4" idForm={PAGE_ID} groupName="SOCIALES" change={() => this.showNextActivities("AIR")} size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                            {/* </Column>
                                                        <Column size={[12, 12, 3, 3]} className="events-container">
                                                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                                <span><h6 style={{ margin: 0, display: "inline-block" }}><strong>Aire libre</strong></h6></span>
                                                            </Column>*/}
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div id="AIR" >
                                                                        <RadioButton id="82" label="Aire libre" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" size={[12, 12, 12, 3]} />
                                                                        {/* <RadioButton id="83" label="2" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="84" label="3" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="85" label="4" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div id="AIR" >
                                                                        <RadioButton id="201" label="Aire libre" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" size={[12, 12, 12, 3]} />
                                                                        {/* <RadioButton id="202" label="2" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="203" label="3" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="204" label="4" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div id="AIR" >
                                                                        <RadioButton id="321" label="Aire libre" idForm={PAGE_ID} groupName="ACTIVIDADESPREFERIDAS" size={[12, 12, 12, 3]} />
                                                                        {/* <RadioButton id="322" label="2" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="323" label="3" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="324" label="4" idForm={PAGE_ID} groupName="AIRELIBRE" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column size={[12, 12, 3, 3]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={PAGE_ID}
                                            subTitle={"Generales para su vivienda"}
                                            level={2}
                                            icon="fas fa-home"
                                            collapsed={false}>
                                            <Row>
                                                <Column size={[12, 12, 12, 12]} className="">
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 15. Actividades extraescolares que les gustaría que sus hijos realizaran </strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        {/* <checkBox.CheckBox id={"Deportivas86"} idForm={PAGE_ID} label={"Deportivas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Artisticas87"} idForm={PAGE_ID} label={"Artísticas / Culturales"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Oficios88"} idForm={PAGE_ID} label={"Oficios"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Idiomas89"} idForm={PAGE_ID} label={"Idiomas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Computacion90"} idForm={PAGE_ID} label={"Computación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Otra91"} idForm={PAGE_ID} label={"Otra"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />*/}
                                                                        <RadioButton id="86" label="Deportivas" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="87" label="Artísticas/Culturales" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="88" label="Oficios" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="89" label="Idiomas" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="90" label="Computación" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="91" label="Medio Ambiente" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        {/*<checkBox.CheckBox id={"Deportivas205"} idForm={PAGE_ID} label={"Deportivas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Artisticas206"} idForm={PAGE_ID} label={"Artísticas / Culturales"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Oficios207"} idForm={PAGE_ID} label={"Oficios"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Idiomas208"} idForm={PAGE_ID} label={"Idiomas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Computacion209"} idForm={PAGE_ID} label={"Computación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Otra210"} idForm={PAGE_ID} label={"Otra"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />*/}
                                                                        <RadioButton id="205" label="Deportivas" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="206" label="Artísticas/Culturales" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="207" label="Oficios" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="208" label="Idiomas" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="209" label="Computación" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="210" label="Medio Ambiente" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        {/*<checkBox.CheckBox id={"Deportivas325"} idForm={PAGE_ID} label={"Deportivas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Artisticas326"} idForm={PAGE_ID} label={"Artísticas / Culturales"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Oficios327"} idForm={PAGE_ID} label={"Oficios"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Idiomas328"} idForm={PAGE_ID} label={"Idiomas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Computacion329"} idForm={PAGE_ID} label={"Computación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Otra330"} idForm={PAGE_ID} label={"Otra"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />*/}
                                                                        <RadioButton id="325" label="Deportivas" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="326" label="Artísticas/Culturales" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="327" label="Oficios" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="328" label="Idiomas" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="329" label="Computación" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="330" label="Medio Ambiente" idForm={PAGE_ID} groupName="EXTRAESCOLARES" size={[12, 12, 12, 12]} />
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                    <Column size={[12, 12, 9, 9]} style={{ padding: '10px' }}>
                                        <page.OptionSection
                                            id={PAGE_ID}
                                            subTitle={"Generales para su fraccionamiento"}
                                            level={2}
                                            icon="fas fa-home"
                                            collapsed={false}>
                                            <Row>
                                                <Column size={[12, 12, 6, 6]} className="">
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 16. ¿Qué le gustó del fraccionamiento?</strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Ubicacion101"} idForm={PAGE_ID} label={"Ubicación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Entorno102"} idForm={PAGE_ID} label={"Entorno"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Equipamientos103"} idForm={PAGE_ID} label={"Equipamientos"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasVerdes104"} idForm={PAGE_ID} label={"Áreas Verdes"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasRecreativas105"} idForm={PAGE_ID} label={"Áreas Recreativas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"DisenioCasas106"} idForm={PAGE_ID} label={"Diseño de las casas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        {/*<checkBox.CheckBox id={"Seguridad107"} idForm={PAGE_ID} label={"Seguridad"} size={[12, 12,12,12]} validations={[validations.required()]} required={true} />
                                                                         <RadioButton id="101" label="Ubicación" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="102" label="Entorno" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="103" label="Equipamientos" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="104" label="Áreas verdes" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="105" label="Áreas recreativas/parques" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="106" label="Diseño de las casas" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="107" label="Seguridad" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Ubicacion220"} idForm={PAGE_ID} label={"Ubicación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Entorno221"} idForm={PAGE_ID} label={"Entorno"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Equipamientos222"} idForm={PAGE_ID} label={"Equipamientos"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasVerdes223"} idForm={PAGE_ID} label={"Áreas Verdes"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasRecreativas224"} idForm={PAGE_ID} label={"Áreas Recreativas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"DisenioCasas225"} idForm={PAGE_ID} label={"Diseño de las casas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        {/*<checkBox.CheckBox id={"Seguridad226"} idForm={PAGE_ID} label={"Seguridad"} size={[12, 12,12,12]} validations={[validations.required()]} required={true} />
                                                                        <RadioButton id="220" label="Ubicación" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="221" label="Entorno" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="222" label="Equipamientos" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="223" label="Áreas verdes" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="224" label="Áreas recreativas/parques" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="225" label="Diseño de las casas" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="226" label="Seguridad" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Ubicacion340"} idForm={PAGE_ID} label={"Ubicación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Entorno341"} idForm={PAGE_ID} label={"Entorno"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Equipamientos342"} idForm={PAGE_ID} label={"Equipamientos"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasVerdes343"} idForm={PAGE_ID} label={"Áreas Verdes"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasRecreativas344"} idForm={PAGE_ID} label={"Áreas Recreativas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"DisenioCasas345"} idForm={PAGE_ID} label={"Diseño de las casas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        {/* <checkBox.CheckBox id={"Seguridad346"} idForm={PAGE_ID} label={"Seguridad"} size={[12, 12,12,12]} validations={[validations.required()]} required={true} />
                                                                        <RadioButton id="340" label="Ubicación" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="341" label="Entorno" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="342" label="Equipamientos" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="343" label="Áreas verdes" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="344" label="Áreas recreativas/parques" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="345" label="Diseño de las casas" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="346" label="Seguridad" idForm={PAGE_ID} groupName="GUSTOFRACCIONAMIENTO" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size={[12, 12, 6, 6]} className="">
                                                    <Row>
                                                        <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10 " style={{ paddingBottom: "5px" }} >
                                                            <span><h6 style={{ margin: 0, display: "inline-block" }}><strong> 17. ¿Qué mejoraría del fraccionamiento?</strong> </h6></span>
                                                        </Column>
                                                        <Column size={[12, 12, 12, 12]} className="events-container">
                                                            {
                                                                vocaciones === "I" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Ubicacion108"} idForm={PAGE_ID} label={"Ubicación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Entorno109"} idForm={PAGE_ID} label={"Entorno"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Equipamientos110"} idForm={PAGE_ID} label={"Equipamientos"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasVerdes111"} idForm={PAGE_ID} label={"Áreas Verdes"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasRecreativas112"} idForm={PAGE_ID} label={"Áreas Recreativas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"DisenioCasas113"} idForm={PAGE_ID} label={"Diseño de las casas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        {/*<checkBox.CheckBox id={"Seguridad114"} idForm={PAGE_ID} label={"Seguridad"} size={[12, 12,12,12]} validations={[validations.required()]} required={true} />
                                                                        <RadioButton id="108" label="Ubicación" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="109" label="Entorno" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="110" label="Equipamientos" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="111" label="Áreas verdes" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="112" label="Áreas recreativas/parques" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="113" label="Diseño de las casas" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="114" label="Seguridad" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "V" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Ubicacion227"} idForm={PAGE_ID} label={"Ubicación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Entorno228"} idForm={PAGE_ID} label={"Entorno"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Equipamientos229"} idForm={PAGE_ID} label={"Equipamientos"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasVerdes230"} idForm={PAGE_ID} label={"Áreas Verdes"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasRecreativas231"} idForm={PAGE_ID} label={"Áreas Recreativas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"DisenioCasas232"} idForm={PAGE_ID} label={"Diseño de las casas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        {/*<checkBox.CheckBox id={"Seguridad235"} idForm={PAGE_ID} label={"Seguridad"} size={[12, 12,12,12]} validations={[validations.required()]} required={true} />

                                                                        <RadioButton id="227" label="Ubicación" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="228" label="Entorno" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="229" label="Equipamientos" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="230" label="Áreas verdes" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="231" label="Áreas recreativas/parques" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="232" label="Diseño de las casas" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="235" label="Seguridad" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }
                                                            {
                                                                vocaciones === "S" ?
                                                                    <div>
                                                                        <checkBox.CheckBox id={"Ubicacion347"} idForm={PAGE_ID} label={"Ubicación"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Entorno348"} idForm={PAGE_ID} label={"Entorno"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"Equipamientos349"} idForm={PAGE_ID} label={"Equipamientos"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasVerdes350"} idForm={PAGE_ID} label={"Áreas Verdes"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"AreasRecreativas351"} idForm={PAGE_ID} label={"Áreas Recreativas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <checkBox.CheckBox id={"DisenioCasas352"} idForm={PAGE_ID} label={"Diseño de las casas"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        {/*<checkBox.CheckBox id={"Seguridad353"} idForm={PAGE_ID} label={"Seguridad"} size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                                                                        <RadioButton id="347" label="Ubicación" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="348" label="Entorno" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="349" label="Equipamientos" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="350" label="Áreas verdes" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="351" label="Áreas recreativas/parques" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="352" label="Diseño de las casas" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />
                                                                        <RadioButton id="353" label="Seguridad" idForm={PAGE_ID} groupName="MEJORAFRACCIONAMIENTO" size={[12, 12, 12, 12]} />*/}
                                                                    </div>
                                                                    : null
                                                            }

                                                        </Column>
                                                    </Row>
                                                </Column>
                                            </Row>
                                        </page.OptionSection>
                                    </Column>
                                </Row>
                            </div> : null
                    }
                </page.OptionSection>
            </page.Main>;
        };
    });

    interface IPersonaEntregaVDDLProps extends ddl.IDropDrownListProps {
        item?: any;
    }
};
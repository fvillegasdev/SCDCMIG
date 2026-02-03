namespace EK.Modules.SCV.Pages.ListaPrecios {
    "use strict";
    const UbicacionesModificadas: string = "listaPreciosUbicaciones";
    const config: page.IPageConfig = global.createPageConfig("listaPrecios", "scv", [UbicacionesModificadas]);

    let PAGE_ID: string = "Lista de Precios";

    interface IListaPreciosView extends page.IProps {
        entidad: any;
        vigenteHastaOriginal: any;
    };
    interface IEdicion extends React.Props<any> {
        desarrollo: DataElement;
        tipoOperacion: DataElement;
        tipoComercializacion: any;
        entidad: any;
    };
    interface IFechas extends page.IProps{
        idFormSection: string;
    };

    export let Fechas: any = global.connect(class extends React.Component<IFechas, IFechas> {
        static defaultProps: IFechas = {
            idFormSection: config.id,
        };
        render(): any {
            let ml: any = config.getML();
            return <div>
                <input.Date id={"VigenteDesde"} label={ml.form.VigenteDesde.label}  type="date" size={[12, 2, 2, 2]} idFormSection={this.props.idFormSection} validations={[
                    validations.lessEqualThan("VigenteHasta", "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")]} />

                <input.Date id={"VigenteHasta"} label={ml.form.VigenteHasta.label} type="date" size={[12, 2, 2, 2]} idFormSection={this.props.idFormSection}
                    validations={[
                        validations.greaterEqualThan("VigenteDesde", "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")]} />
            </div>
        };
    });

    export const Edicion: any = global.connect(class extends React.Component<IEdicion, IEdicion> {
        static props: any = (state: any) => ({
            desarrollo: state.global.currentEntity$desarrollos,
            tipoOperacion: state.global.currentEntity$tipoOperacion,
            tipoComercializacion: state.global.currentEntity$validacionTipoComercializacion,
            entidad: state.global.currentEntity
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addNumber("PrecioExcedenteM2")
                .addNumber("PrecioExcedenteM2Version")
                .addDate("VigenteDesde")
                .addDate("VigenteHasta")
                .addDate("VigenteHastaExtendida")
                .addObject("TipoOperacion")
                .addNumber("NVersion")
                .addObject("Desarrollo")
                .addObject(UbicacionesModificadas)
                .addObject("Estatus")
                .addVersion()
                .toObject();
            config.dispatchEntityBase(model, "listaPrecios/SaveListaPrecios", undefined, global.HttpMethod.PUT);
            return null;

        };
        onEntityLoaded(props: page.IProps): any {

            global.dispatchSuccessful("global-page-data", [], UbicacionesModificadas);

            let IdEntidad: any = getDataID(props.entidad);
            let entidad: any = getData(props.entidad);
            let contieneParametros: boolean = false;

            dispatchSuccessful("load::actualizando", { valor: false });
            /*Si la entidad tiene un IdDesarrollo*/
            if (entidad && entidad.IdDesarrollo) {
                  /*Obteniendo informacion del desarrollo selecionado para validar que tenga ubicaciones*/
                dispatchAsync("global-current-entity", "base/scv/desarrollos/Get/GetByDesarrolloId/" + global.encodeParameters({ id: entidad.IdDesarrollo }), "desarrollos");
                  /*Obteniendo tipos de comercializacion por desarrollo*/
                dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/"+ global.encodeParameters({ IdDesarrollo: entidad.IdDesarrollo, TipoOperacion: 'Lista' }));
                contieneParametros = true;
            }
            /*Validacion de que no exista otra lista precios con un determiando desarrollo y tipo de comercializacion
              cuando se esta creando la lista de precios*/
            if (entidad && entidad.IdTipoOperacion && entidad.ID==-1) {
                dispatchAsync("global-current-entity", "base/scv/ListaPrecios/Get/GetAllVersiones/"+
                    global.encodeParameters({
                    IdDesarrollo: entidad.IdDesarrollo,
                    IdTipoOperacion: entidad.IdTipoOperacion,
                    idNotIn: entidad.ID,
                    claveEstatus: 'D'
                    }), "validacionTipoComercializacion");
            }

             /*Si la entidad tiene un Tipo de Comercializacion obtenemos su informació*/
            if (entidad.IdTipoOperacion) {
                dispatchAsyncPost("global-current-entity", "base/kontrol/tipoComercializacion/id/", { id: entidad.IdTipoOperacion }, "tipoOperacion");
                contieneParametros = true;
            };
             /*Actualizamos un estado para saber si recibimos parametros o no*/
            if (contieneParametros) {
                Forms.updateFormElement(config.id, "parametros", true);
            }

             /*Si la entidad es mayor a cero obtenemos todas las ubicaciones*/
            if (IdEntidad > 0) {
                /*Si la entidad es mayor y el estatus es aprobado a*/
                if (entidad && entidad.Estatus && (entidad.Estatus.Clave == "AP" || entidad.Estatus.Clave=="RE"))
                {
                    /*Si el estatus de solicitud de extension de lista de precios es por autorizar o rechazada obtenemos la fecha proxima a actualizar
                     o en su defecto la fecha que no fue aprobada*/
                    //if (entidad.EstatusExtensionVigencia.Clave == "PA" || entidad.EstatusExtensionVigencia.Clave == "RE" ) {
                    //    let parametros: any = global.encodeParameters({ IdVersion: IdEntidad, ClaveEstatus: entidad.EstatusExtensionVigencia.Clave });
                    //    global.dispatchAsync("global-current-entity", "base/kontrol/listaPrecios/Get/obtenerExtensionVigenciaLP/" + parametros, "ExtensionVigencia");
                    //}

                    if (entidad.ExtensionVigencia.ID>0)
                    {
                        let parametros: any = global.encodeParameters({ IdVersion: IdEntidad, VigenteHastaOriginal: true });
                        global.dispatchAsync("global-current-entity", "base/kontrol/listaPrecios/Get/ObtenerExtensionVigenciaLP/" + parametros, "VigenteHastaOriginal");
                    }
                }

            }


        };
        onEntitySaved(props: page.IProps): any {
          
        };
        componentWillReceiveProps(nextProps: IEdicion, nextState: IEdicion): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {

                if (global.isSuccessful(nextProps.desarrollo)) {
                    let idDesarrollo: any = getDataID(nextProps.desarrollo);
                    if (idDesarrollo > 0)
                    {
                        Forms.updateFormElement(config.id, "Desarrollo", global.getData(nextProps.desarrollo));
                    }
                    //let valorElemento: any = Forms.getFormElement("Desarrollo", config.id);
                };
            };
            if (global.hasChanged(this.props.tipoOperacion, nextProps.tipoOperacion)) {
                if (global.isSuccessful(nextProps.tipoOperacion)) {
                    Forms.updateFormElement(config.id, "TipoOperacion", global.getData(nextProps.tipoOperacion));
                };
            };
        };
        shouldComponentUpdate(nextProps: IEdicion, nextState: IEdicion): boolean {
            return hasChanged(this.props.desarrollo, nextProps.desarrollo) || hasChanged(this.props.tipoComercializacion, nextProps.tipoComercializacion);
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let desarrollo: any = getData(this.props.desarrollo);
            let tipoComercializacion: any = getData(this.props.tipoComercializacion);

           /*Validaciones que se tienen que cumplir que el desarrollo tenga ubicaciones
            y que no exista otra lista de precios en estatus Drap para este desarrollo y tipo de comercializacion
            si se cumple con ella es undefined de lo contrario false*/
            let validacion: boolean = (desarrollo && desarrollo.cantidadUbicaciones === 0) || (tipoComercializacion.length > 0) ? false : undefined;
           
            /*si la entidad es menor a -1 y se cumplen con las validaciones anteriores se permite guardar o
            si el estatus es Drap o rechazado*/
            let permitirGuardar: boolean = (entidad.ID == -1 && validacion == undefined) || (entidad.Estatus && (entidad.Estatus.Clave == "D" || entidad.Estatus.Clave == "RE")) ? true : false;
            
            let eliminar: boolean = entidad.Estatus && entidad.Estatus.Clave == "D" ? true : false;

            return <page.Main {...config}
                allowDelete={eliminar}
                allowSave={permitirGuardar}
                pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                onEntitySaved={this.onEntitySaved}
                onSave={this.saveForm} >
                <PageButtons>
                    <AuthorizeButton />
                    <ExtenderVigencia />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    let Edit: any = global.connect(class extends React.Component<IListaPreciosView, IListaPreciosView> {
        constructor(props: IListaPreciosView) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.vigenteHastaOriginal= state.global.currentEntity$VigenteHastaOriginal;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IListaPreciosView, nextState: IListaPreciosView): any {
            if (global.hasChanged(this.props.vigenteHastaOriginal, nextProps.vigenteHastaOriginal)) {
                if (global.isSuccessful(nextProps.vigenteHastaOriginal)) {
                    Forms.updateFormElement(config.id, "vigenteHastaOriginal", global.getData(nextProps.vigenteHastaOriginal).VigenteHasta);
                };
            };
        };
        render(): JSX.Element {
            let ml: any = $ml[config.id];
            let IdEntidad: any = getDataID(this.props.entidad);
            let entidad: any = getData(this.props.entidad);
            let desarrollo: any = entidad && entidad.Desarrollo ? entidad.Desarrollo.Descripcion : "";

            /* Validando si la entidad recibio parametros */
            let contieneElementos: boolean = Forms.getValue("parametros", config.id);


            /* Validando si la lista de precios ha pasado por un proceso de extension de vigencia */
            let estatusExtensionVigencia: boolean = entidad.ExtensionVigencia && entidad.ExtensionVigencia.Estatus.Clave=="PA" ? true : false;

            /* Creando Arreglo del estatus */
            let estatusLP: any = entidad.Estatus ? entidad.Estatus.Clave : "";
            let listaPreciosArregloEstatus: any = {};
            if (entidad && entidad.Estatus) {
                listaPreciosArregloEstatus[0] = entidad.Estatus.Nombre;
                listaPreciosArregloEstatus[1] = undefined;
                listaPreciosArregloEstatus[2] = entidad.Estatus.Clave;
            }
            //Titulo
           let subTitle:any =<span className="badge badge-info" style={{ marginLeft: 10 }}>
               {entidad.NVersion}
            </span>;
           let vigenteHastaOriginal: any = Forms.getValue("vigenteHastaOriginal", config.id);
           return <page.Edit>
               <MensajeValidacion />
               <ModalExtensionVigencia />
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        title={"Versión"} 
                       subTitle={subTitle}
                       level="main" 
                        icon="fas fa-code-branch" collapsed={false} hideCollapseButton={true}>
                       <Row>
                            {IdEntidad > 0?


                               <div>
                                   <Label label={ml.form.Desarrollo.label} value={desarrollo} size={[12, 3, 3, 3]} />
                                   <label.General id={"TipoOperacion"} size={[12, 3, 3, 3]} />

                                   {(estatusLP == "D" || (estatusLP == "RE" && estatusExtensionVigencia == false)) ?
                                        <div>
                                             <Fechas/>
                                            <label.EstatusTarea size={[12, 2, 2, 2]} id="Estatus" value={listaPreciosArregloEstatus} />
                                        </div>
                                        :
                                        <div>
                                            <label.Fecha id="VigenteDesde" size={[12, 2, 2, 2]} />
                                            <label.Fecha id="VigenteHasta" size={[12, 2, 2, 2]} />
                                            <label.EstatusTarea size={[12, 2, 2, 2]} id="Estatus" value={listaPreciosArregloEstatus} />
                                        </div>
                                   }

                                   {vigenteHastaOriginal != undefined ?
                                       <label.Fecha id="vigenteHastaOriginal" size={[12, 2, 2, 2]} />
                                       : null
                                   }

                                   <label.Currency id="PrecioExcedenteM2" size={[12, 2, 2, 2]} />
                                   {estatusLP == "D" || estatusLP =="RE" ?
                                      <input.Currency id="PrecioExcedenteM2Version" size={[12, 2, 2, 2]} />
                                       :
                                       <label.Currency id="PrecioExcedenteM2Version" size={[12, 2, 2, 2]} />
                                    }

                                </div> :
                               <div>
                                    {(contieneElementos) ?
                                        <div>
                                           <label.General id="Desarrollo" size={[12, 3, 3, 3]} />
                                            <label.General id="TipoOperacion" size={[12, 3, 3, 3]} />
                                            <Fechas />
                                            <label.EstatusTarea size={[12, 2, 2, 2]} id="Estatus" />
                                        </div>
                                        :
                                        <div>
                                           <ddl.DesarrollosDDL id={"Desarrollo"} size={[12, 3, 3, 3]} />
                                           <TipoComercializacionDDL size={[12, 3, 3, 3]} cargarDatos={false}  id={"TipoOperacion"} />
                                            <Fechas />
                                            <label.EstatusTarea size={[12, 2, 2, 2]} id="Estatus" />
                                        </div>
                                    }
                                </div>
                            }
                           
                            <AlertaVigenciaExtendida/>
                        </Row>
                        {IdEntidad > 0 ?
                            <Ubicaciones/>
                            : null}
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    let View: any = global.connect(class extends React.Component<IListaPreciosView, IListaPreciosView> {
        constructor(props: IListaPreciosView) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.vigenteHastaOriginal= state.global.currentEntity$VigenteHastaOriginal;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IListaPreciosView, nextState: IListaPreciosView): any {
            if (global.hasChanged(this.props.vigenteHastaOriginal, nextProps.vigenteHastaOriginal)) {
                if (global.isSuccessful(nextProps.vigenteHastaOriginal)) {
                    Forms.updateFormElement(config.id, "vigenteHastaOriginal", global.getData(nextProps.vigenteHastaOriginal).VigenteHasta);
                };
            };
        };
        render(): JSX.Element {
            let ml: any = $ml[config.id];
            let entidad: any = getData(this.props.entidad);
            //Titulo
            let subTitle: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {entidad.NVersion}
            </span>;
            let listaPreciosArregloEstatus: any = {};
            if (entidad && entidad.Estatus) {
                listaPreciosArregloEstatus[0] = entidad.Estatus.Nombre;
                listaPreciosArregloEstatus[1] = undefined;
                listaPreciosArregloEstatus[2] = entidad.Estatus.Clave;
            }
            let vigenteHastaOriginal: any = Forms.getValue("vigenteHastaOriginal", config.id);


            return <page.View>
                <ModalExtensionVigencia />
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id} 
                        title={"Versión"}
                        subTitle={subTitle}
                        level="main"
                        icon="fas fa-code-branch" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.General  id="Desarrollo" size={[12, 3, 3, 3]} />
                            <label.General id="TipoOperacion" size={[12, 3, 3, 3]} />
                            <label.Fecha id="VigenteDesde" size={[12, 2, 2, 2]} />
                            <label.Fecha id="VigenteHasta" size={[12, 2, 2, 2]} />
                            <label.EstatusTarea size={[12, 2, 2, 2]} id="Estatus" value={listaPreciosArregloEstatus} />

                            {vigenteHastaOriginal != undefined ?
                                <label.Fecha id="vigenteHastaOriginal" size={[12, 2, 2, 2]} />
                                : null
                            }
                            <label.Currency id="PrecioExcedenteM2" size={[12, 2, 2, 2]} />


                            <label.Currency id="PrecioExcedenteM2Version"  size={[12, 2, 2, 2]} />

                            <AlertaVigenciaExtendida />
                        </Row>
                         <Ubicaciones/>
                    </page.OptionSection>
                </Column>
            </page.View>;
    };
    });

    export let Ubicaciones: any = global.connect(class extends React.Component<IListaPreciosView, IListaPreciosView> {
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.listaPreciosUbicaciones = state.global.catalogo$listaPreciosUbicaciones;
            return retValue;
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            /*Estatus de la lista de precios*/
            let estatusLP: any = entidad.Estatus ? entidad.Estatus.Clave : "";

            let estatusParaEdicion: boolean = estatusLP === "D" || estatusLP === "RE" ? true : false;


            let precioExcedete: any = entidad && entidad ? entidad.PrecioExcedenteM2Version : 0;

            /*Estado de la entidad */
            let entidadModoVista: boolean = getData(this.props.state).viewMode;
            return <div>
                <div style={{ marginTop:"1%" }}>
                    <AplicarFiltro />

                    {(estatusLP === "D" || estatusLP === "RE") ?
                        <AplicarIncrementoValores />
                        : null
                    }

                </div>

                <page.SectionList
                    id={UbicacionesModificadas}
                    parent={config.id}
                    sunTitle={"Ubicaciones"}
                    icon={"fas fa-home"}
                    size={[12, 12, 12, 12]}
                    level={1}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    mapFormToEntity={(form: EditForm): any => {
                        return form
                            .addID()
                            .addObject("Ubicacion")
                            .addObject("DesarrollosPrototipos")
                            .addEstatus()
                            .addVersion()
                            .toObject();
                    }}
                    listMode="literal"
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[2, 2, 2, 2]} className="list-center-header"><span>{"Ubicación"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Valor Base"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"M2"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Excedente"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Vigencia Avalúo"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Avalúo"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Calculado"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Operativo"}</span></Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header"><span>{"Comisionable"}</span></Column>
                            </Row>
                        </div>
                    }
                    aggregate={(item?: any, values?: any) => {
                        let retValue: any = values ? values : {};

                        if (item && item.Ubicacion && item.Ubicacion.Prototipo) {
                            if (!values.prototipo) {
                                values.prototipo = item.Ubicacion.Prototipo;
                                values.renderGroup = true;
                            }
                            else {
                                //
                                if (values.prototipo.ID !== item.Ubicacion.Prototipo.ID) {
                                    values.prototipo = item.Ubicacion.Prototipo;
                                    values.renderGroup = true;
                                }
                                else {
                                    values.renderGroup = false;
                                };
                            };
                        };

                        return retValue;
                    }}
                    formatter={(index: number, item: any, values: any): any => {

                        if (item.visible == false)
                            return "";
                        let cierreUbicacionTexto: any = item.Ubicacion.Cierre === true ? <span className={"badge badge-danger"} style={{marginLeft: 10}}> Cierre </span> : null;

                        //let mostrarEdicionMaya: boolean = item.Ubicacion.Cierre === true || entidadModoVista == true || (estatusLP != "D" || estatusLP != "RE") ? false : true;

                        let mostrarEdicionMalla: boolean = estatusParaEdicion && item.Ubicacion.Cierre != true && entidadModoVista === false ? true : false;


                        let mostrarEdicionMallaAvaluo: boolean = estatusParaEdicion && entidadModoVista === false ? true : false;


                        //let valorBase: any = item.Ubicacion.Excedente * item.Ubicacion.Desarrollo.PrecioExcedenteM2;
                        let precioExcedente: any = item.Ubicacion.Excedente * precioExcedete; 



                        //
                        let comisionableClass: string = "listItem-money";
                        if (item.ValorComisionable < item.ValorCalculado) {
                            comisionableClass += "-down";
                        }
                        else {
                            if (item.ValorComisionable > item.ValorCalculado) {
                                comisionableClass += "-up";
                            };
                        };
                        //

                        let valorBaseClass: string = "listItem-money";


                        if (item.ValorBase < item.DesarrollosPrototipos.PrecioBase) {
                            valorBaseClass += "-down";
                        }
                        else if (item.ValorBase > item.DesarrollosPrototipos.PrecioBase)
                        {
                            valorBaseClass += "-up";
                        }


                        let autorizadoClass: string = "listItem-money";
                        if (item.ValorAutorizado < item.ValorCalculado) {
                            autorizadoClass += "-down";
                        }
                        else {
                            if (item.ValorAutorizado > item.ValorCalculado) {
                                autorizadoClass += "-up";
                            };
                        };
                        //
                        let avaluoClass: string = "listItem-money";
                        if (item.ValorAvaluo < item.ValorCalculado) {
                            avaluoClass += "-down";
                        }
                        else {
                            if (item.ValorAvaluo > item.ValorCalculado) {
                                avaluoClass += "-up";
                            };
                        };
                        //
                        return <div>
                            {values && values.renderGroup === true ? <Row className="listItem-groupHeader">
                                <Column size={[12, 12, 12, 12]}>
                                    {values.prototipo.Nombre}
                                    <div className="groupHeaderTag"><span className="groupHeaderTag-left">Valor base actual : </span><span className="groupHeaderTag-right">{EK.UX.Labels.formatMoney(item.DesarrollosPrototipos.PrecioBase)}</span></div>
                                </Column>
                            </Row> : null} 


                            <Row className={index % 2 === 0 ? "listItem-row-even" : "listItem-row-odd"}>
                            <Column className={"listItem-default-item"} size={[12, 2, 2, 2]} >
                                {item.Ubicacion.ClaveFormato ? item.Ubicacion.ClaveFormato : item.Ubicacion.Clave}{cierreUbicacionTexto}
                            </Column>

                            <Column className={valorBaseClass} size={[12, 1, 1, 1]}>
                                    {EK.UX.Labels.formatMoney(item.ValorBase)}
                            </Column>

                            <Column className="listItem-right-item" size={[1, 1, 1, 1]}>
                                {item.Ubicacion.Excedente}
                            </Column>

                            <Column className={"listItem-money"} size={[1, 1, 1, 1]}>
                                {EK.UX.Labels.formatMoney(precioExcedente)}
                            </Column>

                                <Column className={"listItem-right-item"} size={[12, 1, 1, 1]}>
                                    {mostrarEdicionMallaAvaluo == false ?
                                        EK.UX.Labels.formatDate(item.ValorAvaluoVigencia) :
                                        <input.Date property={UbicacionesModificadas} index={index} value={item.ValorAvaluoVigencia} id="ValorAvaluoVigencia" idFormSection={config.id} />
                                }
                            </Column>

                            <Column className={avaluoClass} style={item.ValorAvaluo == null ? { textAlign: "center" } : {}} size={[12, 1, 1, 1]}>
                                    {mostrarEdicionMallaAvaluo == false ?
                                    <span className={item.ValorAvaluo == null ? "fas fa-minus" : ""}>
                                        {EK.UX.Labels.formatMoney(item.ValorAvaluo)} </span> :
                                    <input.Currency property={UbicacionesModificadas} index={index} value={item.ValorAvaluo} id="ValorAvaluo" idFormSection={config.id} />
                                }
                            </Column>

                            <Column className={"listItem-money"} size={[12, 1, 1, 1]} >
                                {EK.UX.Labels.formatMoney(item.ValorCalculado)}
                            </Column>

                            <Column className={autorizadoClass} size={[12, 1, 1, 1]}>
                                {mostrarEdicionMalla == false ?
                                    EK.UX.Labels.formatMoney(item.ValorAutorizado) :
                                    <input.Currency property={UbicacionesModificadas} index={index} value={item.ValorAutorizado} id="ValorAutorizado" idFormSection={config.id} />
                                }
                            </Column>

                            <Column className={comisionableClass} size={[12, 1, 1, 1]}>
                                {mostrarEdicionMalla == false ?
                                    <span>{EK.UX.Labels.formatMoney(item.ValorComisionable)}</span> :
                                    <input.Currency property={UbicacionesModificadas} index={index} value={item.ValorComisionable} id="ValorComisionable" idFormSection={config.id} />
                                }
                            </Column>
                        </Row></div>;
                    }}>
                </page.SectionList>
            </div>
        };
    });

    interface IAuthorizeButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        estadoEntidad?: boolean;
        config?: page.IPageConfig;
    }

    let AuthorizeButton: any = global.connect(class extends React.Component<IAuthorizeButton, {}> {
        constructor(props: IAuthorizeButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IAuthorizeButton = {
            icon: "fa fa-check-circle",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let item: any = getData(this.props.item);
            EK.Global.confirm($ml.titulo.autorizacionLP.descripcion, $ml.titulo.autorizacionLP.titulo, () => {
                global.asyncPost("ListaPrecios/RequestAuthorize/", item, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-current-entity", data);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-current-entity", data);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                        success($ml.mensajes.pendingAuthorization);
                    }
                });
            });
        }
        render(): JSX.Element {
            let idEntidad: any = global.getDataID(this.props.item);
            let entidad: any = global.getData(this.props.item);
            if (idEntidad > 0 && entidad && entidad.Estatus && (entidad.Estatus.Clave == "D" || entidad.Estatus.Clave=="RE")) {
                return <Button {...this.props} onClick={this.onClick} />;

            }
            else
            {
                return null;
            }
        }
    });

    let ExtenderVigencia: any = global.connect(class extends React.Component<IAuthorizeButton, {}> {
        constructor(props: IAuthorizeButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            estadoEntidad: state.global.currentEntityState,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IAuthorizeButton = {
            icon: "far fa-calendar-check",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let modalObject: any = $("#extenderVigenciaListaPrecios");
            modalObject.modal();
        }
        render(): JSX.Element {
            let idEntidad: any = global.getDataID(this.props.item);
            let entidad: any = global.getData(this.props.item);
            let estadoEntidad: boolean = getData(this.props.estadoEntidad).viewMode;
            /*Si la entidad es  mayor a 0 y se encuentra aprobada y la entidad se encuentra en estado de edicion y el estatus de la extension de vigencia es  diferente a por aprobar*/
            if (idEntidad > 0 && entidad && entidad.Estatus && (entidad.Estatus.Clave == "AP" || entidad.Estatus.Clave=="RE") && estadoEntidad == false && entidad.ExtensionVigencia && entidad.ExtensionVigencia.Estatus.Clave != "PA") {
                return <Button {...this.props} onClick={this.onClick} />;
            }
            else {
                return null;
            }
        }
    });



    interface IModalLP extends page.IProps {
        ml?: string;
    };
    let ModalExtensionVigencia: any = global.connect(class extends React.Component<IModalLP, {}>{
        constructor(props: IModalLP) {
            super(props);
            this.onClose = this.onClose.bind(this);
            this.extenderVigencia = this.extenderVigencia.bind(this);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.id = config.id;
            retValue.data = state.global.currentEntity;
            retValue.ml = $ml[config.id];
            return retValue;
        };
        onClose(): void {
            let modalObject: any = $("#extenderVigenciaListaPrecios");
            modalObject.modal("hide");
        };
        extenderVigencia(): void {
            let ml: any = config.getML();
            let form: any = Forms.getForm();
            if (form.VigenteHasta < form.VigenteHastaExtendida) {
                let parametros: any = global.encodeParameters({ id: form.ID, vigenteHastaExtendida: form.VigenteHastaExtendida });
                global.dispatchAsync("global-current-entity", "base/scv/listaPrecios/Get/ExtenderVigenciaLP/" + parametros);
                this.onClose();
            }
            else
            {
                warning(ml.mensajes.warning)
            }
           
        }
        render(): JSX.Element {
            let data: any = getData(this.props.data);
            let vigencia: string = data && data.VigenteHasta ? data.VigenteHasta : null;
            return <modal.Modal id="extenderVigenciaListaPrecios" header={""} style={{ height: "200px" }}>
                <Row>
                    <div style={{ alignItems: "left", marginBottom: "2%", marginLeft: "1%" }}>
                        <i className="fas fa-arrows-alt-h" style={{ marginRight: "1%" }}></i>
                        <span>Extender Vigencia Lista de Precios</span>
                    </div>
                    {vigencia != null ?

                        <input.Date id={"VigenteHastaExtendida"} label={"Vigente Hasta"} type="date" size={[12, 2, 2, 2]} 
                            validations={[
                                validations.greaterEqualThan("VigenteHasta", "VIGENCIA, la fecha de vigencia debe ser mayor a la vigencia actual ")]} />
                        : null
                    }
                    <Column size={[12, 12, 12, 12]} style={{ padding: "15px", textAlign: "right", borderTop: "1px solid #e5e5e5" }}>
                        <button type="button" className="btn blue" onClick={this.extenderVigencia} ><i className="fa fa-check"></i> {"Solicitar  Autorización"}</button> :
                    </Column>
                </Row>
            </modal.Modal>
        }
    });

    interface IAplicarIncrementoValores extends page.IProps {
        ml?: any;
        tipoIncremento?: any;
        listaPreciosUbicaciones?: any;
    };
    let AplicarIncrementoValores: any = global.connect(class extends React.Component<IAplicarIncrementoValores, {}>{
        constructor(props: IAplicarIncrementoValores) {
            super(props);
            this.aplicarIncremento = this.aplicarIncremento.bind(this);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.id = config.id;
            retValue.tipoIncremento = Forms.getValue("TipoIncremento", config.id, state);
            retValue.ml = $ml[config.id];
            return retValue;
        };
        componentDidMount()
        {
            Forms.updateFormElement(config.id, "OpcionesIncremento", { ID: -1, Clave: 'Seleccione una opción' });
        }
        shouldComponentUpdate(nextProps: IAplicarIncrementoValores, nextState: any): boolean {
            return hasChanged(this.props.tipoIncremento, nextProps.tipoIncremento)
        };
        aplicarIncremento(): void {
            let opcionIncremento: any = Forms.getValue("OpcionesIncremento", config.id);
            let tipoIncremento: string = this.props.tipoIncremento;
            let valorIncremento: any = Forms.getValue("ValorIncremento", config.id);
            let prototipo: any = Forms.getValue("Prototipo", config.id);
            if (opcionIncremento.ID > 0 && tipoIncremento != undefined && valorIncremento > 0 && (prototipo.ID > 0 || prototipo.Clave=="VT")) {
                let p: any = global.assign({
                    clavePrototipo: prototipo.Clave,
                    idVersion: getDataID(this.props.entidad),
                    opcionesIncremento: opcionIncremento.Clave,
                    tipoIncremento:tipoIncremento,
                    valorIncremento: valorIncremento,
                });
                global.dispatchAsyncPost("global-current-entity", "base/scv/listaPrecios/GetBP/AplicarIncremento", { parametros: p });
                let pa: any = global.assign({ IdVersion: getDataID(this.props.entidad), IdPrototipo: prototipo.ID });

                global.dispatchAsyncPost("global-current-entity", "base/scv/listaPrecios/GetBP/ObtenerUbicaciones", { parametros: pa }, UbicacionesModificadas);
                //this.props.config.dispatchEntityBase(parametros, "base/scv/ListaPrecios/Get/ObtenerUbicaciones/", UbicacionesModificadas);
                //Forms.updateFormElement(config.id, "Prototipo", { ID: prototipo.ID, Clave: prototipo.Clave });
            }
            else {
                warning(this.props.ml.mensajes.warning)
            }
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let entidadModoVista: boolean = getData(this.props.state).viewMode;
            let tipoIncremento: string = this.props.tipoIncremento;

            if (entidadModoVista)
                return null;

            return <Column  size={[12, 6, 6, 6]}>
                <page.OptionSection
                    id="AplicarIncremento"
                    icon="fas fa-donate"
                    level={1}
                    subTitle={"Aplicar Incremento"}
                    collapsed={true}
                    hideCollapseButton={false}>
                    <SectionButtons>
                        <Button className="btn-ico-ek white" iconOnly={true} color="white" onClick={this.aplicarIncremento} icon="fa fa-check" />
                    </SectionButtons>
                    <Column>
                    </Column>

                    <Column size={[12, 12, 12, 12]}>
                        <OpcionesIncrementoValoresLPDDL size={[12, 12, 8, 8]} addNewItem={"SO"} />
                    </Column>

                    <Column size={[12, 12, 6, 6]} style={{ marginTop: "5%" }}>
                        <EK.UX.RadioButton$Form
                            id={"Importe"}
                            idForm={config.id}
                            label={"Importe"}
                            groupName={"TipoIncremento"}
                            size={[12, 12, 6, 6]}  />
                        <EK.UX.RadioButton$Form
                            id={"Porcentaje"}
                            idForm={config.id}
                            label={"Porcentaje"}
                            groupName={"TipoIncremento"}
                            size={[12, 12, 6, 6]} />
                    </Column>
                    {tipoIncremento != undefined ?
                        <div>
                            
                            <input.Currency id="ValorIncremento" size={[12, 4, 4, 4]} />
                            {tipoIncremento == "Porcentaje" ?
                                <Column size={[12, 2, 2, 2]} style={{ marginTop:"5%" }} >
                                    <i className={"fas fa-percent"}></i>
                                </Column>
                                 : null
                             }
                        </div>
                        : null
                    }
                </page.OptionSection>
            </Column>
        }
    });

    let AplicarFiltro: any = global.connect(class extends React.Component<IListaPreciosView, {}>{
        constructor(props: IListaPreciosView) {
            super(props);
            this.onFilter = this.onFilter.bind(this);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.id = config.id;
            retValue.entidad = state.global.currentEntity;
            retValue.ml = $ml[config.id];
            return retValue;
        };
        onFilter(): void {
            /*Obteniendo Listado de ubicaciones de la lista de precios*/
            let prototipo: any = Forms.getValue("Prototipo", config.id);
            let claveUbicacion: any = Forms.getValue("claveUbicacion", config.id);
            let ubicacion = claveUbicacion.ID > 0 ? claveUbicacion.Clave : claveUbicacion.ID;
            let idEntidad: any = getDataID(this.props.entidad);
            
            let parametros: any = global.assign({ IdVersion: idEntidad, IdPrototipo: prototipo.ID, claveUbicacion: ubicacion});
            this.props.config.dispatchCatalogoBase("base/scv/ListaPrecios/Get/ObtenerUbicaciones/", parametros, UbicacionesModificadas);
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            return <Column  size={[12, 6, 6, 6]}>
                <page.OptionSection
                    id="AplicarFiltro"
                    icon="fas fa-filter"
                    level={1}
                    subTitle={"Filtros"}
                    collapsed={true}
                    hideCollapseButton={false}>
                    <PrototiposDDl size={[12, 6, 6, 6]} idDesarrollo={entidad.IdDesarrollo} addNewItem={"SO"} />                    
                    <UbicacionesDesarrolloDDL id="claveUbicacion" idDesarrollo={entidad.IdDesarrollo} idFormSection={config.id} size={[12, 6, 6, 6]} addNewItem={"VT"} />                    
                    <SectionButtons>
                        <Button className="btn-ico-ek white" iconOnly={true} color="white" icon="fas fa-sync-alt" onClick={this.onFilter}  />
                    </SectionButtons>
                </page.OptionSection>
            </Column>
        }
    });

    interface IAlertaVigenciaExtendida extends page.IProps {
        entidadVigenciaExtendida: any;
    };


    let AlertaVigenciaExtendida: any = global.connect(class extends React.Component<IAlertaVigenciaExtendida, IAlertaVigenciaExtendida> {
        constructor(props: IAlertaVigenciaExtendida) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IAlertaVigenciaExtendida, nextState: IAlertaVigenciaExtendida): any {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let ml: any = $ml[config.id];
            let entidad: any = getData(this.props.entidad);

            let color: string = entidad && entidad.ExtensionVigencia &&
                entidad.ExtensionVigencia.Estatus.Clave === "PA" ? "Azul" : "Rojo";

            let mensajeAlerta: string = entidad && entidad.ExtensionVigencia &&
                entidad.ExtensionVigencia.ID ?
                entidad.ExtensionVigencia.Estatus.Clave === "PA" ? ml.mensajes.extensioVigencia + " " + label.formatDate(entidad.ExtensionVigencia.VigenteHasta) :
                    entidad.ExtensionVigencia.Estatus.Clave === "RE" ? "La solicitud de extensión de vigencia al " + label.formatDate(entidad.ExtensionVigencia.VigenteHasta) + " ha sido rechazada" : null : null;

            if (mensajeAlerta == null)
                return null;
            return <Column size={[12, 12, 12, 12]} style={{ marginLeft: "-16px", marginTop: "1%" }}>
                <Alerta mensaje={mensajeAlerta} color={color} />
            </Column>
        };
    });

    interface IPrototipo extends IDropDrownListProps {
        idDesarrollo?: number;
    }
    let PrototiposDDl: any = global.connect(class extends React.Component<IPrototipo, {}> {
        static props: any = (state: any) => ({
            items: state.global.PrototiposListaPrecios,
        });
        static defaultProps: IPrototipo = {
            id: "Prototipo",
            items: createDefaultStoreObject([]),
            label: "Prototipo",
            helpLabel: "Seleccione un Prototipo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            idDesarrollo: null,
        };
        componentDidMount(): void {
            Forms.updateFormElement(config.id, "Prototipo", { ID: -1, Clave: 'Seleccione una opción' });
            global.dispatchSuccessful("load::PrototiposListaPrecios", []);
            if (this.props.idDesarrollo != null && this.props.idDesarrollo > 0) {
                dispatchAsync("load::PrototiposListaPrecios", "base/kontrol/Prototipos/Get/GetAll/" + global.encodeObject({ idDesarrollo: this.props.idDesarrollo }));
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -2;
                nuevoItem['Nombre'] = 'Ver Todos';
                nuevoItem['Clave'] = 'VT';
                if (itemsModificados.data.length > 0) {
                    let existe = false;
                    let elementos: any = itemsModificados.data;
                    elementos.forEach((Value: any, index: number) => {
                        if (Value.Clave === "VT")
                            existe =true;
                    });
                    if (existe == false) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

    export let OpcionesIncrementoValoresLPDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.OpcionesIncrementoValoresLP
        });
        static defaultProps: IDropDrownListProps = {
            id: "OpcionesIncremento",
            items: createDefaultStoreObject([]),
            label: "Opciones",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OpcionesIncrementoValoresLP", "catalogos/get(INCREMENTOVALORESLP)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

};
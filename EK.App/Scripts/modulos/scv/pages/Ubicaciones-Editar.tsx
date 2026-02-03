namespace EK.Modules.SCV.Pages.Ubicaciones {
    "use strict";
    const ubicacionCoord: string = "UbicacionCoordenadas";
    let SEGUIMIENTO_ID = "Seguimiento";
    let TRAMITES_ID = "Tramites";
    const config: page.IPageConfig = global.createPageConfig("ubicaciones", "scv", [ubicacionCoord, SEGUIMIENTO_ID]);
    let PAGE_ID = "Ubicaciones";

    let Iconos: any = {};
    Iconos["Informacion"] = "fa fa-puzzle-piece";
    Iconos["Progreso"] = "fa fa-spinner";
    Iconos["Caracteristicas"] = "fas fa-draw-polygon";
    Iconos["Seguimiento"] = "fas fa-book"

    interface IUbicaciones extends page.IProps {
        desarrollo?: any;
        desarrolloSeleccionado?: any;
    };
    interface IUbicacionesProps extends IDropDrownListProps {
        Desarrollo?: any;
        cargaDatos?: (idDesarrollo?: any) => void;
    }
    export const Edicion: any = global.connect(class extends React.Component<IUbicaciones, IUbicaciones> {
        constructor(props: IUbicaciones) {
            super(props);
        }
        static props: any = (state: any) => ({
            desarrollo: state.global.currentEntity$desarrollo,
        });
        saveForm(props: page.IProps, item: EditForm): any {
            item.addID()
                .addClave()
                .addNombre()
                .addObject("Segmento")
                .addObject("TipoUbicacion")
                .addString("NumeroExterior")
                .addString("NumeroInterior")
                .addString("Calle")
                .addObject("Desarrollo")
                .addObject("Prototipo")
                .addObject("CentroCosto")
                .addObject("CentroCostoConstruccion")
                .addNumber("Superficie")
                .addNumber("Excedente")
                .addNumber("FrenteUbicacion")
                .addString("RUC")
                .addString("RUV")
                .addString("Observaciones")
                .addDate("FechaHabitabilidad")
                .addDate("FechaProgramada")
                .addDate("FechaEntrega")
                .addNumber("PorcentajeConstruccion")
                .addDate("FechaDTU")
                .addString("Descripcion")
                .addString("ColindanciaGeneral")
                .addString("ColindanciaComun")
                .addString("Observaciones")
                .addObject("Caracteristicas")
                .addObject("EstatusDeUbicacion")
                .addNumber("PuntajeDTU")
                .addBoolean("Cierre")
                .addBoolean("IdEstatusUbicacion")
                .addBoolean("IdDtu")
                .addObject(SEGUIMIENTO_ID)
                .addEstatus()
                .addVersion();
            let model = item.toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            
            dispatchAsync("load::ESTATUSUBICACION", "catalogos/get(ESTATUSUBICACION)");
            let data: any = getData(props.entidad);
            let IdUbicacion: number = getDataID(props.entidad);
            let IdDesarrollo: any = data.IdDesarrollo;

            if (IdUbicacion == -1)
            {
                global.dispatchSuccessful("global-page-data", [], SEGUIMIENTO_ID);
            }
            else {
                let parametros: any = global.assign({
                    IdDesarrollo: IdDesarrollo,
                    IdPrototipo: data.IdPrototipo,
                    IdUbicacion: IdUbicacion
                });
                props.config.dispatchCatalogoBase("base/scv/TramiteAsignado/Get/GetTramitesByDesarrolloPrototipo/", parametros, SEGUIMIENTO_ID);
            }    

            if (data.IdDesarrollo) {
                let parametros: any = global.encodeParameters({ id: IdDesarrollo });
                global.asyncGet("base/kontrol/Desarrollos/Get/GetByIdDesarrolloFormatoClave/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        if (IdUbicacion<0)
                        {
                            Forms.updateFormElement(config.id, "Desarrollo", data);
                        }
                        dispatchSuccessful("load::currentEntity$desarrollo", data);
                    }
                });

            };

        };
        render(): JSX.Element {
            let urlAddress: string;
            if (global.isSuccessful(this.props.entidad)) {
                urlAddress = "/Desarrollos/GetLocations/" + global.getData(this.props.entidad).IdDesarrollo + "/" + global.getDataID(this.props.entidad) + "/null/false";
                window["onSelectLatLng"] = (arr: any): any => {
                    alert(arr);
                };
            }
            let desarrollo: any = getData(this.props.desarrollo).FormatoClave;
            let permiteGuardar: boolean = desarrollo && desarrollo.length && desarrollo.length > 0 ? true : false;

            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm.bind(this)}
                onEntityLoaded={this.onEntityLoaded} allowSave={permiteGuardar} >
                <PageButtons>
                    <buttons.MapViewerButton url={urlAddress} showRelateLocation={true} />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    export const tramitesHeader: JSX.Element =
            <Row>
                <Column size={[7, 7, 7, 7]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Fecha Completado"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Cumplimiento"}</Column>
            </Row>


    let Edit: any = global.connect(class extends React.Component<IUbicaciones, IUbicaciones> {
        constructor(props: IUbicaciones) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.desarrollo = state.global.currentEntity$desarrollo;
            retValue.desarrolloSeleccionado = Forms.getValue("Desarrollo", config.id, state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IUbicaciones, nextState: IUbicaciones): any {
            if (global.hasChanged(this.props.desarrolloSeleccionado, nextProps.desarrolloSeleccionado)) {

                if (nextProps.desarrolloSeleccionado && nextProps.desarrolloSeleccionado.ID > 0)
                {
                    let entidad = getData(this.props.entidad);
                    if (entidad.ID < 0) {
                        let prototipo: any = entidad && (entidad.ID == -1 || entidad.IdDesarrollo != nextProps.desarrolloSeleccionado.ID) ? { ID: -1, Clave: "Seleccione un Prototipo" } : { ID: entidad.Prototipo.ID, Clave: entidad.Prototipo.Clave };
                        let centroCosto: any = entidad && (entidad.ID == -1 || entidad.IdDesarrollo != nextProps.desarrolloSeleccionado.ID) ? { ID: -1, Clave: "Seleccione un Centro de Costo" } : { ID: entidad.CentroCosto.ID, Clave: entidad.CentroCosto.Clave };
                        let centroCostoC: any = entidad && (entidad.ID == -1 || entidad.IdDesarrollo != nextProps.desarrolloSeleccionado.ID) ? { ID: -1, Clave: "Seleccione un Centro de Costo" } : { ID: entidad.CentroCostoConstruccion.ID, Clave: entidad.CentroCostoConstruccion.Clave };
                        Forms.updateFormElement(config.id, "CentroCosto", centroCosto)
                        Forms.updateFormElement(config.id, "CentroCostoConstruccion", centroCostoC)
                        Forms.updateFormElement(config.id, "Prototipo", prototipo)
                    }                    

                    let url: string = global.encodeAllURL("scv", "Prototipos", { idDesarrollo: nextProps.desarrolloSeleccionado.ID });
                    dispatchAsync("load::PROTOTIPOS", url);

                    url = global.encodeAllURL("scv", "CENTROCOSTO", { idDesarrollo: nextProps.desarrolloSeleccionado.ID, ClaveTipoCentrosCosto: 'CCCONSTRUCCION' });
                    dispatchAsync("load::CCCONSTRUCCION", url);

                    url = global.encodeAllURL("scv", "CENTROCOSTO", { idDesarrollo: nextProps.desarrolloSeleccionado.ID, ClaveTipoCentrosCosto: 'CCINGRESO' });
                    dispatchAsync("load::CCINGRESO", url);

                    let parametros: any = global.encodeParameters({ id: nextProps.desarrolloSeleccionado.ID });
                    global.dispatchAsync("global-current-entity", "base/kontrol/Desarrollos/Get/GetByIdDesarrolloFormatoClave/" + parametros, "desarrollo");
                }
            };
        };

        shouldComponentUpdate(nextProps: IUbicaciones, nextState: IUbicaciones): boolean {
            return hasChanged(this.props.desarrollo, nextProps.desarrollo) ||
                hasChanged(this.props.desarrolloSeleccionado, nextProps.desarrolloSeleccionado) ||
                hasChanged(this.props.entidad, nextProps.entidad);
        };

        render(): JSX.Element {

            let idUbicacion: number;
            let claveUbicacion: number;
            let ubicacionEnCieere: boolean = false;

            let entidad: any = getData(this.props.entidad);

            if (global.isSuccessful(this.props.entidad))
            {
                idUbicacion = global.getDataID(this.props.entidad);
                claveUbicacion = getData(this.props.entidad).Clave;
                ubicacionEnCieere = getData(this.props.entidad).Cierre

                //debugger
            }


            let desarrollo: any = getData(this.props.desarrollo).FormatoClave;
          

                let subTitle: any = entidad && entidad.Cierre && entidad.Cierre == true ?
                    <span>{PAGE_ID}<span>  </span> <span className="badge badge-success bold"> Cierre</span></span> :
                    <span>{PAGE_ID}</span>;

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={subTitle}
                        icon="fas fa-landmark" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>


                                <Column size={[12,12,12,12]}>
                                        <Badge idElement="EstatusExpediente" size={[12, 3, 3, 3]} />
                                        <Badge idElement="Paquete" size={[12, 3, 3, 3]} />
                                        <Badge idElement="Naturaleza" size={[12, 3, 3, 3]} />

                                        {ubicacionEnCieere == true ?
                                            <label.Entidad id={"EstatusDeUbicacion"} size={[12, 3, 3, 3]} />
                                            :
                                        <ddl.EstatusDeUbicacionDDL size={[12, 3, 3, 3]} addNewItem={"SO"} validations={[validations.required()]} />
                                        }

                                </Column>


                                   {desarrollo && desarrollo.length && desarrollo.length > 0 ?
                                       <input.ClaveUbicaciones size={[12, 2, 2, 2]} /> 
                                       : <label.Clave id={"ClaveValidacion"} value={claveUbicacion} size={[12, 2, 2, 2]} />}

                                   <input.Nombre size={[12, 4, 4, 4]} maxLength={150} validations={[validations.required()]} />

                                   <TipoUbicacionDDL id={"TipoUbicacion"} size={[12, 3, 3, 3]} required={true} />
                                   <SegmentosDDL id={"Segmento"} size={[12, 3, 3, 3]} required={true} />


                                   <ddl.DesarrollosDDL id={"Desarrollo"} size={[12, 3, 3, 3]} required={true} addNewItem={"SO"} validations={[validations.required()]} />
                                   <PrototiposDDL id={"Prototipo"} addNewItem={"SO"} size={[12, 3, 3, 3]}  validations={[validations.required()]} cargarDatos={false} />
                                   <CCCONSTRUCCIONDDL id={"CentroCostoConstruccion"} size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />
                                   <CCINGRESODDL id={"CentroCosto"} size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />
                                   <Input id={"Calle"} size={[12, 4, 4, 4]} />
                                   <input.Text id={"NumeroExterior"} size={[12, 2, 1, 1]}  />
                                   <input.Text id={"NumeroInterior"} size={[12, 2, 1, 1]}  />
                                   <Currency id={"Excedente"} size={[12, 2, 2, 2]}  />
                                   <Currency id={"Superficie"} size={[12, 2, 2, 2]}  />
                                   <Currency id={"FrenteUbicacion"} size={[12, 2, 2, 2]}  />
                                   <Input id={"RUC"} size={[12, 2, 2, 2]}  maxLength={20} />
                                   <Input id={"RUV"} size={[12, 2, 2, 2]}  maxLength={20} />
                                   <Input id={"PuntajeDTU"} size={[12, 1, 1, 1]}  />
                                   <checkBox.CheckBox id={"IdDtu"} size={[12, 1, 1, 1]} />

                                      
                               
                            </Column>
                        </Row>

                        <Row style={{ paddingTop: 20 }}>
                            <Column size={[12, 12, 6, 6]}>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        icon={Iconos["Informacion"]}
                                        title="Información"
                                        collapsed={false}
                                        readOnly={false}
                                        level={1}>

                                        <Input id={"Descripcion"} size={[12, 12, 12, 12]} required={false} maxLength={150} />
                                        <Input id={"ColindanciaComun"} size={[12, 12, 12, 12]} required={false} maxLength={150} />
                                        <Input id={"ColindanciaGeneral"} size={[12, 12, 12, 12]} required={false} maxLength={150} />
                                        <Input id={"Observaciones"} size={[12, 12, 12, 12]} required={false} maxLength={150} />
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        icon={Iconos["Progreso"]}
                                        title="Progreso"
                                        collapsed={false}
                                        readOnly={false}
                                        level={1}>
                                        <DatePicker id={"FechaHabitabilidad"} size={[12, 12, 6, 6]} required={false} maxLength={8} />
                                        <DatePicker id={"FechaProgramada"} size={[12, 12, 6, 6]} required={false} maxLength={8} />
                                        <DatePicker id={"FechaEntrega"} size={[12, 12, 6, 6]} required={false} maxLength={8} />   
                                        <Input id={"PorcentajeConstruccion"} size={[12, 12, 6, 6]} />
                                        <DatePicker id={"FechaDTU"} size={[12, 12, 6, 6]} required={false} maxLength={8} />
                                    </page.OptionSection>
                                </Column>
                            </Column>
                            <Column size={[12, 12, 6, 6]}>
                                <globalSCV.CaracteristicasForm
                                    level={1} id="Caracteristicas"
                                    viewMode={false}
                                    entityType={globalSCV.EntityTypeEnum.UBICACION}
                                    icon={Iconos["Caracteristicas"]} />
                                <page.SectionList
                                    id={SEGUIMIENTO_ID}
                                    parent={config.id}
                                    title={"Seguimiento Técnico"}
                                    listHeader={tramitesHeader}
                                    hideNewButton={true}
                                    addRemoveButton={false}
                                    collapsed={false}
                                    level={1}
                                    items={createSuccessfulStoreObject([])}                                        
                                    mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                        let retValue: any = form
                                            .addID()
                                            .addVersion()
                                            .addNombre()
                                            .addBoolean("Completado")
                                            .addEstatus()
                                            .toObject();
                                        return retValue;
                                    }}
                                    formatter={(index: number, item: any) => {  
                                        return <Row>
                                            <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                                <span>{item.Tramite.Nombre}</span>
                                            </Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                                <span>{item.Completado ? EK.UX.Labels.formatDate(item.FechaCompletado) : null}</span>
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                                <span>
                                                    <checkBox.CheckBox id="Completado" textAlign="center" index={index} property={SEGUIMIENTO_ID}
                                                        value={item.Completado} idFormSection={config.id} />
                                                </span>
                                            </Column>
                                        </Row>
                                    }}>
                                    <Row>
                                    </Row>
                                </page.SectionList>                                
                            </Column>
                        </Row>

                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });



    let View: any = global.connect(class extends React.Component<IUbicaciones, IUbicaciones> {
        constructor(props: IUbicaciones) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.desarrollo = state.global.currentEntity$desarrollo;
            retValue.desarrolloSeleccionado = Forms.getValue("Desarrollo", config.id, state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IUbicaciones, nextState: IUbicaciones): boolean {
            return hasChanged(this.props.desarrollo, nextProps.desarrollo) ||
                hasChanged(this.props.desarrolloSeleccionado, nextProps.desarrolloSeleccionado) ||
                hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {

            let claveUbicacion: number;
            if (global.isSuccessful(this.props.entidad))
            {
                claveUbicacion = getData(this.props.entidad).Clave;
            }
            let desarrollo: any = getData(this.props.desarrollo).FormatoClave;

            let entidad: any = getData(this.props.entidad);

            let subTitle: any = entidad && entidad.Cierre && entidad.Cierre == true ?
                <span>{PAGE_ID}<span>  </span> <span className="badge badge-success bold"> Cierre</span></span> :
                <span>{PAGE_ID}</span>;

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        level="main"
                        subTitle={subTitle}
                        icon="fas fa-landmark" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>

                                <Column size={[12, 12, 12, 12]}>
                                    <Badge idElement="EstatusExpediente" size={[12, 3, 3, 3]} />
                                    <Badge idElement="Paquete" size={[12, 3, 3, 3]} />
                                    <Badge idElement="Naturaleza" size={[12, 3, 3, 3]} />
                                    <label.Entidad id={"EstatusDeUbicacion"} size={[12, 3, 3, 3]} />
                                </Column>

                                {desarrollo && desarrollo.length && desarrollo.length > 0 ?
                                    <label.ClaveUbicaciones id="Clave" size={[12, 2, 2, 2]} />
                                    : <label.Clave id="ClaveValidacion" value={claveUbicacion} size={[12, 2, 2, 2]} />}
                              
                                <label.Nombre size={[12, 4, 4, 4]} />
                                <label.General id="TipoUbicacion" size={[12, 3, 3, 3]} />
                                <label.General id="Segmento" size={[12, 3, 3, 3]} />
                                <label.General id="Desarrollo" size={[12, 3, 3, 3]} />
                                <label.General id="Prototipo" size={[12, 3, 3, 3]} />
                                <label.General id="CentroCostoConstruccion" size={[12, 3, 3, 3]} />
                                <label.General id="CentroCosto" size={[12, 3, 3, 3]} />
                                <Label id="Calle" size={[12, 2, 2, 2]} />
                                <Label id="NumeroExterior" size={[12, 2, 1, 1]} />
                                <Label id="NumeroInterior" size={[12, 2, 1, 1]} />
                                <Label id="Excedente" size={[12, 2, 2, 2]} />
                                <Label id="Superficie" size={[12, 2, 2, 2]} />
                                <Label id="FrenteUbicacion" size={[12, 2, 2, 2]}  />
                                <Label id="RUC" size={[12, 2, 2, 2]} />
                                <Label id="RUV" size={[12, 2, 2, 2]} />
                                <Label id={"PuntajeDTU"} size={[12, 1, 1, 1]} />
                                <label.Boolean id={"IdDtu"} size={[12, 1, 1, 1]} />
                            </Column>
                        </Row>
                        <Row style={{ paddingTop: 20 }}>
                            <Column size={[12, 12, 6, 6]}>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        icon={Iconos["Informacion"]}
                                        title="Información"
                                        collapsed={false}
                                        readOnly={false}
                                        level={1}>
                                        <Label id="Descripcion" size={[12, 12, 12, 12]} />
                                        <Label id="ColindanciaComun" size={[12, 12, 12, 12]} />
                                        <Label id="ColindanciaGeneral" size={[12, 12, 12, 12]} />
                                        <Label id="Observaciones" size={[12, 12, 12, 12]} />
                                    </page.OptionSection>
                                </Column>
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        icon={Iconos["Progreso"]}
                                        title="Progreso"
                                        collapsed={false}
                                        readOnly={false}
                                        level={1}>
                                        <Label id="FechaHabitabilidad" size={[12, 12, 6, 6]} />
                                        <Label id="FechaProgramada" size={[12, 12, 6, 6]} />
                                        <Label id="FechaEntrega" size={[12, 12, 6, 6]} />
                                        <Label id={"PorcentajeConstruccion"} size={[12, 12, 6, 6]} />
                                        <Label id="FechaDTU" size={[12, 12, 6, 6]} />
                                    </page.OptionSection>
                                </Column>
                            </Column>
                            <Column size={[12, 12, 6, 6]}>
                                <Column size={[12, 12, 12, 12]}>
                                    <globalSCV.CaracteristicasForm
                                        level={1}
                                        viewMode={true}
                                        icon={Iconos["Caracteristicas"]}
                                         />
                                </Column>                            
                                    <page.SectionList
                                        id={SEGUIMIENTO_ID}
                                        parent={config.id}
                                        title={"Seguimiento Técnico"}
                                        hideNewButton={true}
                                        addRemoveButton={false}
                                        icon={Iconos["Seguimiento"]}
                                        listHeader={tramitesHeader}
                                        level={1}
                                        items={createSuccessfulStoreObject([])}                                
                                        mapFormToEntity={(form: EditForm, entidades?: any): any => {
                                            let retValue: any = form
                                                .addID()
                                                .addVersion()
                                                .addNombre()
                                                .addBoolean("Completado")
                                                .addEstatus()
                                                .toObject();
                                            return retValue;
                                        }}
                                        formatter={(index: number, item: any) => {
                                            return <Row>
                                                <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                                    <span>{item.Tramite.Nombre}</span>
                                                </Column>
                                                <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                                    <span>{item.Completado ? EK.UX.Labels.formatDate(item.FechaCompletado) : null}</span>
                                                </Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                                    <span>{EK.UX.Labels.badgeEstatus(item.Completado)}</span>
                                                </Column>
                                            </Row>
                                        }}>

                                    </page.SectionList>
                            </Column>
                        </Row>

                    </page.OptionSection>
                </Column>
               
            </page.View>;
        }
    })


    let CCINGRESODDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CCINGRESO,
            Desarrollo: state.desarrollos.catalogo,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            cargaDatos: (idDesarrollo?: any): void => {
                global.dispatchSuccessful("load::CCINGRESO", []);
            }
        });
        static defaultProps: IUbicacionesProps = {
            id: "CCINGRESO",
            items: createDefaultStoreObject([]),
            label: "Centro de Costo de Ingresos",
            helpLabel: "Seleccione el Centro de Costo de Ingresos",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 4, 4, 4]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.cargaDatos();
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -1;
                nuevoItem['Nombre'] = 'Seleccione un Centro de Costo';
                nuevoItem['Clave'] = '';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].ID != -1) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

    let CCCONSTRUCCIONDDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CCCONSTRUCCION,
            Desarrollo: state.desarrollos.catalogo,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            cargaDatos: (idDesarrollo?: any): void => {
                global.dispatchSuccessful("load::CCCONSTRUCCION", []);
            }
        });
        static defaultProps: IUbicacionesProps = {
            id: "CCCONSTRUCCION",
            items: createDefaultStoreObject([]),
            label: "Centro de Costo de Construcción",
            helpLabel: "Seleccione el Centro de Costo de Construcción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 4, 4, 4]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.cargaDatos();
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -1;
                nuevoItem['Nombre'] = 'Seleccione un Centro de Costo';
                nuevoItem['Clave'] = '';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].ID != -1) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });




    interface IEstatus extends page.IProps {
        idElement: any;
        size: any;
    };


    export let Badge: any = global.connect(class extends React.Component<IEstatus, IEstatus> {
        constructor(props: IEstatus) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): any {
            let entidad: any = getData(this.props.entidad);

            let ml: any = $ml[config.id];


            let idElement: any = this.props.idElement;

            let resultad: any = <div></div>;

            let resultEstatus: any = null;
            switch (idElement)
            {
                case "EstatusExpediente":
                    resultEstatus = <span className="badge bg-blue bg-font-blue" style={{ padding: "4px 15px 4px", height: "100%" }}>{entidad && entidad.EstatusExpediente && entidad.EstatusExpediente.Nombre != null ? entidad.EstatusExpediente.Nombre :" - "} </span>
                    break;
                case "Paquete":
                    resultEstatus = <span className="badge bg-blue bg-font-blue" style={{ padding: "4px 15px 4px", height: "100%" }}>{entidad && entidad.Paquete && entidad.Paquete.Nombre != null ? entidad.Paquete.Nombre : " - "} </span>
                    break;
                case "Naturaleza":
                    resultEstatus = <span className="badge bg-blue  bg-font-blue" style={{ padding: "4px 15px 4px", height: "100%" }}>{entidad && entidad.EstatusDeUbicacion && entidad.EstatusDeUbicacion.Naturaleza.Nombre != null ? entidad.EstatusDeUbicacion.Naturaleza.Nombre : " - "}</span>
                    break;
                default:
                    resultEstatus = <span className="badge bg-blue bg-font-blue" style={{ padding: "4px 15px 4px", height: "100%" }}>" - "</span>
            }
            return <Column size={this.props.size}>
                <div className="form-group">
                    <div id="Estatus" className="label-text" style={{ textAlign: "center" }}>
                        {ml.form[idElement].label}
                        </div>

                    <div id="Estatus_value" className="" style={{ backgroundColor: "transparent", textAlign: "center", padding: "3px" }}>
                        {resultEstatus}
                    </div>
                </div>
            </Column>;

        };
    });
}

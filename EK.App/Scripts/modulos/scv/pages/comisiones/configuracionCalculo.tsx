namespace EK.Modules.SCV.Pages.Comisiones{
    "use strict";
    const PAGE_ID: string = "comisionesConfiguracion";
    const COMISIONES_CONFIGURACION: string = "configuracionDeComisiones";


    export let obtenerConfiguracion: (idFase: number) => any = (idFase: number): any => {
        let encodedParams: any = global.encodeParameters({idFase: idFase});
        dispatchAsync("global-page-data", "base/SCV/comisionesConfiguracion/Get/GetComisionConfiguraciones/" + encodedParams, COMISIONES_CONFIGURACION);
    };

    interface IConfiguracionDeComisiones extends page.IProps {
        items: any;
        estadoEntidad: any;
    }
    export let ConfiguracionDeComisiones: any = global.connect(class extends React.Component<IConfiguracionDeComisiones, IConfiguracionDeComisiones> {
        constructor(props: IConfiguracionDeComisiones) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$configuracionDeComisiones;
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        componentDidMount(): any {
            //let encodedParams: any = global.encodeParameters({ activos: 1 });
            //dispatchAsync("global-page-data", "SCV/Comisiones/DashBoard/Configuraciones/GetAll/" + encodedParams, COMISIONES_CONFIGURACION);

            let faseSeleccionado: any = Forms.getValue("Fase", PAGE_ID);
            if (faseSeleccionado && faseSeleccionado.ID > 0) {
                obtenerConfiguracion(faseSeleccionado.ID)
            }
            else
            {
                 dispatchSuccessful("global-page-data", [], COMISIONES_CONFIGURACION)
            }
        }
        render(): JSX.Element {
            let modoVista: any = getData(this.props.estadoEntidad).viewMode;
            return <Column size={[12, 12, 12, 12]}>
                {(modoVista) ?
                    <ConfiguracionComisionesView /> :
                    <ConfiguracionComisionesEdit />
                }
            </Column>
        };
    })

    export let ConfiguracionComisionesEdit: any = global.connect(class extends React.Component<IConfiguracionDeComisiones, IConfiguracionDeComisiones> {
        constructor(props: IConfiguracionDeComisiones) {
            super(props);
            this.guardarConfiguracion = this.guardarConfiguracion.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$configuracionDeComisiones;
            return retValue;
        };
        guardarConfiguracion():void
        {
            if (!Forms.isValid(COMISIONES_CONFIGURACION)) {
                warning("verificar los campos obligatorios");
                return;
            }
            /*Validar que no existan elementos duplicados */
            let item: EditForm = Forms.getForm(COMISIONES_CONFIGURACION);
            let entidad: any = item;


            let entidades: DataElement = this.props.config.getCatalogo(COMISIONES_CONFIGURACION);
            let items: any[] = getData(entidades);
            let result: boolean = false;

            let idDesarrollo: number = entidad.Desarrollo && entidad.Desarrollo.ID > 0 ? entidad.Desarrollo.ID : 0;
            let idPrototipo: number = entidad.Prototipo && entidad.Prototipo.ID > 0 ? entidad.Prototipo.ID : 0;
            let idEsquema: number = entidad.Esquema && entidad.Esquema.ID > 0 ? entidad.Esquema.ID : 0;
            let idUbicacion: number = entidad.Ubicacion && entidad.Ubicacion.ID > 0 ? entidad.Ubicacion.ID : 0;

            let configuracionExistente: boolean = false;

            items.forEach((value: any, index: number) => {

                if (value.IdDesarrollo == idDesarrollo &&
                    value.IdPrototipo == idPrototipo &&
                    value.IdEsquema == idEsquema &&
                    value.IdUbicacion == idUbicacion &&
                    value.IdCategoria == entidad.Categoria.ID &&
                    value.ID != entidad.ID 
                   )
                {
                         configuracionExistente = true;
                }

            });

            if (configuracionExistente)
            {
                warning("Esta configuracion ya se encuentra registrada")
                return null;
            }

            let fase: any = Forms.getValue("Fase", PAGE_ID);

            if (fase && fase.ID <0 && entidad.ID == undefined) {
                warning("Seleccione la fase");
                return null;

            }
            let importe: any = entidad.Importe;
            let porcentaje: any = entidad.Porcentaje;

          
            if ((importe == null || importe == 0 || importe == undefined) &&
                (porcentaje == null || porcentaje == 0 || porcentaje == undefined))
            {
                warning("Indicar el importe o porcentaje");
                return null;
            }


            if (entidad.Porcentaje > 100) {
                warning("El porcentaje no debe ser mayor a 100");
                return null;
            }

            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addDescripcion()
                .addObject("Desarrollo")
                .addObject("Esquema")
                .addObject("Prototipo")
                .addObject("Ubicacion")
                .addObject("Categoria")
                .addNumber("Porcentaje")
                .addNumber("Importe")
                .addVersion()
                .addEstatus()
                .toObject();

            if (model.ID > 0) {
                model._modificado = true;
                model.IdFase = entidad.IdFase;
            }
            else
            {
                model._nuevo = true;
                model.IdFase = fase.ID
            }
           dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SaveConfiguracion", model, COMISIONES_CONFIGURACION);
           this.props.config.setState({ viewMode: true }, COMISIONES_CONFIGURACION);
        }
        componentDidMount() {
        }
        shouldComponentUpdate(nextProps: IConfiguracionDeComisiones, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {

            let iconoInactivo = function (v: any, values?: any): any {
                if (v.Estatus) {
                    if (v.Estatus.Clave === 'b' || v.Estatus.Clave === 'B') {
                        return <span key="badgeEstatus" className="fas fa-exclamation-triangle ek-sombra" style={{ fontSize: 13, color: '#F1C40F' }}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </span>;
                    }
                }
                return false;
            }

            let eliminarItem: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    EK.Global.confirm("Presione Confirmar para eliminar ", "Eliminar Periodo", () => {
                        item._eliminado = true;
                        dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SaveConfiguracion", item, COMISIONES_CONFIGURACION);
                    });
                }
            };
            let editarItem: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    config.setState({ viewMode: false }, id);
                }
            };



            return <page.SectionList
                    id={COMISIONES_CONFIGURACION}
                    icon="fas fa-cogs"
                    level={1}
                    title={"Configuración de Comisiones"}
                    onSave={this.guardarConfiguracion}
                    collapsed={false}
                    parent={PAGE_ID}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    addRemoveButton={false}
                    listHeader={<div>
                        <Row className="list-fixed-header">
                            <Column size={[12, 3, 3, 3]} className="list-default-header">{"Desarrollo"}</Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Esquema"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Porcentaje"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        </Row>
                    </div>}
                    aggregate={(item?: any, values?: any) => {
                        let retValue: any = values ? values : {};

                        if (item && item.Categoria) {
                            if (!values.categoria) {
                                values.categoria = item.Categoria;
                                values.renderGroup = true;
                            }
                            else {
                                //
                                if (values.categoria.ID !== item.Categoria.ID) {
                                    values.categoria = item.Categoria;
                                    values.renderGroup = true;
                                }
                                else {
                                    values.renderGroup = false;
                                };
                            };
                        };

                        return retValue;
                    }}
                    formatter={(index: number, item: any, values: any) => {
                    return <Row>

                        {values && values.renderGroup === true ?
                            <Column size={[12, 12, 12, 12]}>
                                <Row className="listItem-groupHeader">
                                    <Column size={[12, 12, 12, 12]}>
                                        {item.Categoria.Nombre}
                                    </Column>
                                </Row>
                            </Column>
                            :
                            null}

                        <Column size={[12, 3, 3, 3]}>
                            {iconoInactivo(item.Desarrollo)}
                            <span style={{ fontWeight: 400 }}>{item.Desarrollo.Nombre}
                            </span>
                        </Column>

                        <Column size={[12, 2, 2, 2]}>
                            {iconoInactivo(item.Prototipo)}
                            <span style={{ fontWeight: 400 }}>{item.Prototipo.Clave}</span>
                        </Column>

                        <Column size={[2, 2, 2, 2]}>
                            {iconoInactivo(item.Ubicacion)}
                            <span style={{ fontWeight: 400 }}>{item.Ubicacion.Clave}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]}>
                            {iconoInactivo(item.Esquema)}
                            <span style={{ fontWeight: 400 }}>{item.Esquema.Nombre}</span>
                        </Column>
                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                            <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDecimal(item.Porcentaje)} %</span>
                        </Column>
                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                            <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDecimal(item.Importe)}</span>
                        </Column>
                     
                          
                            <div>
                                <buttons.PopOver
                                    idParent={PAGE_ID}
                                    idForm={COMISIONES_CONFIGURACION}
                                    info={item}
                                    extraData={[editarItem, eliminarItem]} />
                            </div>
                        </Row>;
                    }}>
                    <Row>
                        <ddl.DesarrollosDDL addNewItem={"SO"} size={[12, 3, 3, 3]} idFormSection={COMISIONES_CONFIGURACION} />
                        <EsquemasPorDesarrollo addNewItem={"SO"} size={[12, 3, 3, 3]} idFormSection={COMISIONES_CONFIGURACION} addNewItemText={"Todos"} />
                        <PrototiposPorDesarrollo addNewItem={"SO"} size={[12, 3, 3, 3]} idFormSection={COMISIONES_CONFIGURACION} addNewItemText={"Todos"} />
                        <ddl.EKCategoriasDDL id={"Categoria"} size={[12, 3, 3, 3]} idFormSection={COMISIONES_CONFIGURACION} />
                        <UbicacionesPorDesarrollo id={"Ubicacion"} addNewItem={"SO"} size={[12, 3, 3, 3]} idFormSection={COMISIONES_CONFIGURACION} addNewItemText={"Todas"} />

                        <input.Porcentaje id={"Porcentaje"} idFormSection={COMISIONES_CONFIGURACION} label={"Porcentaje"} size={[12, 12, 6, 3]} />
                        <input.Currency id={"Importe"} idFormSection={COMISIONES_CONFIGURACION} label={"Importe"} size={[12, 12, 6, 3]} />
                        <input.Descripcion id={"Descripcion"} idFormSection={COMISIONES_CONFIGURACION} label={"Descripción"} size={[12, 12, 6, 3]} />
                    </Row>
                </page.SectionList>
         };
    })

    export let ConfiguracionComisionesView: any = global.connect(class extends React.Component<IConfiguracionDeComisiones, IConfiguracionDeComisiones> {
        constructor(props: IConfiguracionDeComisiones) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$configuracionDeComisiones;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IConfiguracionDeComisiones, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {
           
            let iconoInactivo = function (v: any, values?: any): any {
                if (v.Estatus) {
                    if (v.Estatus.Clave === 'b' || v.Estatus.Clave === 'B') {
                        return <span key="badgeEstatus" className="fas fa-exclamation-triangle ek-sombra" style={{ fontSize: 13, color: '#F1C40F' }}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </span>;
                    }
                }
                return false;
            }


            return   <page.SectionList
                    id={COMISIONES_CONFIGURACION}
                    icon="fas fa-cogs"
                    level={1}
                    title={"Configuracion de Comisiones"}
                    collapsed={false}
                    parent={PAGE_ID}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    addRemoveButton={false}
                    listHeader={<div>
                    <Row className="list-fixed-header">
                            <Column size={[12, 3, 3, 3]} className="list-default-header">{"Desarrollo"}</Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Esquema"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Porcentaje"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        </Row>
                    </div>}
                    aggregate={(item?: any, values?: any) => {
                        let retValue: any = values ? values : {};

                        if (item && item.Categoria) {
                            if (!values.categoria) {
                                values.categoria = item.Categoria;
                                values.renderGroup = true;
                            }
                            else {
                                //
                                if (values.categoria.ID !== item.Categoria.ID) {
                                    values.categoria = item.Categoria;
                                    values.renderGroup = true;
                                }
                                else {
                                    values.renderGroup = false;
                                };
                            };
                        };

                        return retValue;
                    }}
                    formatter={(index: number, item: any, values: any) => {
                    return <Row>
                        {values && values.renderGroup === true ?
                            <Column size={[12, 12, 12, 12]}>
                                <Row className="listItem-groupHeader">
                                    <Column size={[12, 12, 12, 12]}>
                                        {item.Categoria.Nombre}
                                    </Column>
                                </Row>
                            </Column>
                            :
                            null} 
                          
                             <Column size={[12, 3, 3, 3]}>
                                {iconoInactivo(item.Desarrollo)}
                                <span style={{ fontWeight: 400 }}>{item.Desarrollo.Nombre}
                                </span>
                            </Column>

                             <Column size={[12, 2, 2, 2]}>
                                {iconoInactivo(item.Prototipo)}
                                <span style={{ fontWeight: 400 }}>{item.Prototipo.Clave}</span>
                            </Column>
                           
                            <Column size={[2, 2, 2, 2]}>
                                {iconoInactivo(item.Ubicacion)}
                                <span style={{ fontWeight: 400 }}>{item.Ubicacion.Clave}</span>
                            </Column>
                            <Column size={[2, 2, 2, 2]}>
                                {iconoInactivo(item.Esquema)}
                                <span style={{ fontWeight: 400 }}>{item.Esquema.Nombre}</span>
                            </Column>
                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDecimal(item.Porcentaje)} %</span>
                            </Column>
                            <Column size={[1, 1, 1, 1]} style={{ textAlign: "right" }}>
                                <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDecimal(item.Importe)}</span>
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
        };
    })

    interface IEsquemaPorDesarrollo extends IDropDrownListProps {
        fase?: any;
    }
    interface IPrototipoPorDesarrollo extends IDropDrownListProps {
        desarrollo?: any;
    }

    interface IUbicacionesPorDesarrollo extends IDropDrownListProps {
        desarrollo?: any;
        prototipo?: any;
    }

    export let EsquemasPorDesarrollo: any = global.connect(class extends React.Component<IEsquemaPorDesarrollo, {}> {
        constructor(props: IEsquemaPorDesarrollo) {
            super(props);
            this.cargarElementos = this.cargarElementos.bind(this);
        }
        static props: any = (state: any) => ({
            items: state.global.ESQUEMASFASE,
            fase: Forms.getValue("Fase", PAGE_ID)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Esquema",
            items: createDefaultStoreObject([]),
            label: "Esquema",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        cargarElementos(idFase: number): void {
            let url: string = global.encodeAllURL("scv", "esquemas", { idFase: idFase });
            dispatchAsync("load::ESQUEMASFASE", url);
        }
        componentDidMount(): void {
            let fase: any = this.props.fase;
            if (fase && fase.ID > 0) {
                this.cargarElementos(fase.ID);
            };
        };
        componentWillReceiveProps(nextProps: IEsquemaPorDesarrollo, nextState: IEsquemaPorDesarrollo): any {
            let fase: any = nextProps.fase;
            if (global.hasChanged(this.props.fase, nextProps.fase) && fase && fase.ID > 0) {
                this.cargarElementos(fase.ID);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let PrototiposPorDesarrollo: any = global.connect(class extends React.Component<IPrototipoPorDesarrollo, {}> {
        constructor(props: IPrototipoPorDesarrollo) {
            super(props);
            this.cargarElementos = this.cargarElementos.bind(this);
        }
        static props: any = (state: any) => ({
            items: state.global.PROTOTIPOSPORDESARROLLO,
            desarrollo: Forms.getValue("Desarrollo", COMISIONES_CONFIGURACION)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Prototipo",
            items: createDefaultStoreObject([]),
            label: "Prototipo",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        cargarElementos(idDesarrollo: number): void {
            let url: string = global.encodeAllURL("scv", "Prototipos", { idDesarrollo: idDesarrollo, activos: 1 });
            dispatchAsync("load::PROTOTIPOSPORDESARROLLO", url);

        }
        componentDidMount(): void {
            let desarrollo: any = this.props.desarrollo;
            if (!isLoadingOrSuccessful(this.props.items) && desarrollo && desarrollo.ID > 0) {
                this.cargarElementos(desarrollo.ID);
            };
        };
        componentWillReceiveProps(nextProps: IPrototipoPorDesarrollo, nextState: IPrototipoPorDesarrollo): any {
            let desarrollo: any = nextProps.desarrollo;
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo) && desarrollo && desarrollo.ID > 0) {
                this.cargarElementos(desarrollo.ID);
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let UbicacionesPorDesarrollo: any = global.connect(class extends React.Component<IUbicacionesPorDesarrollo, {}> {
        constructor(props: IUbicacionesPorDesarrollo) {
            super(props);
            this.cargarElementos = this.cargarElementos.bind(this);
        }
        static props: any = (state: any) => ({
            items: state.global.UBICACIONESPORDESARROLLO,
            desarrollo: Forms.getValue("Desarrollo", COMISIONES_CONFIGURACION),
            prototipo: Forms.getValue("Prototipo", COMISIONES_CONFIGURACION)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Ubicacion",
            items: createDefaultStoreObject([]),
            label: "Ubicacion",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        cargarElementos(idPrototipo: number, idDesarrollo: number): void {
            let url: any = global.encodeAllURL("scv", "Ubicaciones", { idDesarrollo: idDesarrollo, idPrototipo: idPrototipo, activos: 1 });
            dispatchAsync("load::UBICACIONESPORDESARROLLO", url);
        }
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let desarrollo: any = this.props.desarrollo;
                let prototipo: any = this.props.prototipo;
                if (desarrollo && desarrollo.ID>0 && prototipo && prototipo.ID>0) {
                    this.cargarElementos(prototipo.ID, desarrollo.ID);
                }
            };
        };
        componentWillReceiveProps(nextProps: IUbicacionesPorDesarrollo, nextState: IUbicacionesPorDesarrollo): any {
            if (global.hasChanged(this.props.prototipo, nextProps.prototipo)) {
                let desarrollo: any = this.props.desarrollo;
                let prototipo: any = nextProps.prototipo;
                if (desarrollo && desarrollo.ID>0 && prototipo && prototipo.ID>0) {
                    this.cargarElementos(prototipo.ID, desarrollo.ID);
                }
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
}
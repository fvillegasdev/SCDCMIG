namespace EK.Modules.SCV.Pages.Comisiones {
    "use strict";
    const PAGE_ID: string = "comisionesConfiguracion";
    const PERIODOSDETALLESEGUMIENTO: string = "PeriodosDetalleSeguimiento";



    export let actualizarPeriodoSeleccionado: (item: any, idPeriodo: number, idFase: number) => any = (item: any, idPeriodo: number, idFase: number): any => {
        dispatchSuccessful("load::PeriodoSeleccionado", { data: item })
        let parametros: any = global.encodeParameters({ idComisionPeriodo: idPeriodo, idfase: idFase});
        dispatchAsync("global-page-data", "base/SCV/comisionesConfiguracion/Get/GetAllPeriodoDetalle/" + parametros, PERIODOSDETALLESEGUMIENTO);
    };

    //let obtenerPeriodos: () => any = (): any => {
    //    let parametros: any = global.encodeParameters({ activos:1 });
    //    dispatchAsync("global-page-data", "base/SCV/comisionesConfiguracion/Get/GetAllPeriodoDetalle/" + parametros, PERIODOSDETALLESEGUMIENTO);
    //};

    let inicializarPeriodos: () => any = (): any => {
        global.dispatchSuccessful("global-page-data", [], PERIODOSDETALLESEGUMIENTO);
        //obtenerPeriodos();
    };

    interface IPeriodos extends page.IProps {
        items: any;
        estadoEntidad: any;
    }

    interface IConfiguracionEsquema extends page.IProps {
        estadoEntidad: any;
    }

    export let Periodos: any = global.connect(class extends React.Component<IPeriodos, IPeriodos> {
        constructor(props: IPeriodos) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$Periodos;
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        componentDidMount(): any {
            inicializarPeriodos();
        }
        render(): JSX.Element {
            let modoVista: any = getData(this.props.estadoEntidad).viewMode;
            return <Column size={[12, 12, 12, 12]} >

                {(modoVista) ?
                    <PeriodoDetalleView/>
                    :
                    <PeriodoDetalleEdit/>
                }
            </Column>
        };
    })


    interface IDetallePeriodos extends page.IProps {
        items: any;
        periodoSeleccionado: any;
    }
    export let PeriodoDetalleView: any = global.connect(class extends React.Component<IDetallePeriodos, IDetallePeriodos> {
        constructor(props: IDetallePeriodos) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$DetallePeriodos;
            retValue.periodoSeleccionado = state.global.PeriodoSeleccionado;
            return retValue;
        };
        componentDidMount() {
        }
        shouldComponentUpdate(nextProps: IDetallePeriodos, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.periodoSeleccionado, nextProps.periodoSeleccionado)
        };
        render(): JSX.Element {

            let periodo: any = getData(this.props.periodoSeleccionado);
            let periodoS: any = periodo && periodo.ID > 0 ? periodo.Clave : "";


            return <page.SectionList
                id={PERIODOSDETALLESEGUMIENTO}
                icon={"fas fa-folder"}
                level={1}
                size={[12, 8, 8,  8]}
                title={"Periodos " + periodoS}
                collapsed={false}
                parent={PAGE_ID}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px"}}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">
                            <span>Fecha Inicio</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">
                            <span>Fecha Fin</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">
                            <span>Fase</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Descripción</span>
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">
                            &nbsp;
                               </Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                formatter={(index: number, item: any) => {
                    let fase: string = item.Fase && item.Fase.Nombre ? item.Fase.Nombre : "";
                    let estatus: string = item.Estatus ? item.Estatus.Clave : "";

                    return <Row style={{ padding: "0px 10px" }} >
                        <Column size={[12, 3, 3, 3]} className="list-default-item">
                            <span>{EK.UX.Labels.formatDate(item.FechaInicio)}</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-item">
                            <span>{EK.UX.Labels.formatDate(item.FechaFin)}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-item">
                            <span>{fase}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-item">
                            {estatus == "B" ?
                                <span className="badge badge-danger">{item.Descripcion}</span>
                                :
                            <span>{item.Descripcion}</span>
                            }
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })

    export let PeriodoDetalleEdit: any = global.connect(class extends React.Component<IDetallePeriodos, IDetallePeriodos> {
        constructor(props: IDetallePeriodos) {
            super(props);
            this.guardarPeriodoDetalle = this.guardarPeriodoDetalle.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$DetallePeriodos;
            retValue.periodoSeleccionado = state.global.PeriodoSeleccionado;
            return retValue;
        };
        guardarPeriodoDetalle(): void {

            let periodo: any = Forms.getValue("Periodo", PAGE_ID);
            let fase: any = Forms.getValue("Fase", PAGE_ID);

            let model: EditForm = Forms.getForm(PERIODOSDETALLESEGUMIENTO);

            let ID: number = model.getValue("ID") == undefined ? -1 : model.getValue("ID");

            if (periodo && periodo.ID < 0 && fase && fase.ID < 0 && ID<0)
            {
                warning("Seleccione un periodo y fase");
                return;

            }


            let catalogo: DataElement = this.props.config.getCatalogo(PERIODOSDETALLESEGUMIENTO);
            if (EK.UX.Labels.formatDateYear(model.getValue("FechaInicio")) !== periodo.Clave) {
                warning("El Año de FECHA INICIO, no corresponde al período seleccionado");
                return;
            }

            if (EK.UX.Labels.formatDateYear(model.getValue("FechaFin")) !== periodo.Clave) {
                warning("El Año del campo FECHA FIN, no corresponde al período seleccionado");
                return;
            }


            //let IdComisionPeriodo: any = getData(this.props.periodoSeleccionado).ID
            let FechaInicio: any = model.getValue("FechaInicio");
            let FechaFin: any = model.getValue("FechaFin");
            let Descripcion: any = model.getValue("Descripcion") ? model.getValue("Descripcion") : null;


            let item: any = {};
            item['ID'] = ID;
            item['Descripcion'] = Descripcion;
            item['FechaInicio'] = FechaInicio;
            item['FechaFin'] = FechaFin;
            item['Version'] = model.getValue("Version");
            item['IdEstatus'] = model.getValue("IdEstatus");

            

            if (item.ID > 0) {
                item._modificado = true;
                item['Clave'] = parseInt(model.getValue("Clave"));
                item['IdFase'] = parseInt(model.getValue("IdFase"));
                item['IdComisionPeriodo'] = parseInt(model.getValue("IdComisionPeriodo"));
            }
            else {
                item._nuevo = true;
                item['IdFase'] = fase.ID;
                item['IdComisionPeriodo'] = periodo.ID;
            }

            dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SavePeriodoDetalle", item, PERIODOSDETALLESEGUMIENTO);
            this.props.config.setState({ viewMode: true }, PERIODOSDETALLESEGUMIENTO);
            if (item.ID < 0)
            {
                //obtenerPeriodos();
            }
        };
        componentDidMount() {
        }
        shouldComponentUpdate(nextProps: IDetallePeriodos, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items) ||
                hasChanged(this.props.periodoSeleccionado, nextProps.periodoSeleccionado)
        };
        render(): JSX.Element {

            let eliminarItem: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    let tipoProceso
                    EK.Global.confirm("Presione Confirmar para eliminar ", "Eliminar Periodo", () => {
                        item._eliminado = true;
                        dispatchAsyncPut("global-page-data", "base/SCV/comisionesConfiguracion/Get/SavePeriodoDetalle", item, PERIODOSDETALLESEGUMIENTO);

                      //  obtenerPeriodos();
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

            let periodo: any = getData(this.props.periodoSeleccionado);
            let periodoS: any = periodo && periodo.ID > 0 ? periodo.Clave : "";



            return <page.SectionList
                id={PERIODOSDETALLESEGUMIENTO}
                icon={"fas fa-folder"}
                level={1}
                title={"Periodos " +  periodoS}
                collapsed={false}
                size={[12, 8, 8 , 8]}
                onSave={this.guardarPeriodoDetalle}
                parent={PAGE_ID}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">
                            <span>Fecha Inicio</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">
                            <span>Fecha Fin</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">
                            <span>Fase</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">
                            <span>Descripción</span>
                        </Column>

                        <Column size={[1, 1, 1, 1]} className="list-default-header">
                            &nbsp;
                               </Column>
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                formatter={(index: number, item: any) => {
                    let fase: string = item.Fase && item.Fase.Nombre ? item.Fase.Nombre : "";
                    let estatus: string = item.Estatus ? item.Estatus.Clave : "";

                    return <Row style={{ padding: "0px 10px" }}>
                        <Column size={[12, 3, 3, 3]} className="list-default-item">
                            <span>{EK.UX.Labels.formatDate(item.FechaInicio)}</span>
                        </Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-item">
                            <span>{EK.UX.Labels.formatDate(item.FechaFin)}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-item">
                            <span>{fase}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-item">
                            {estatus == "B" ?
                                <span className="badge badge-danger">{item.Descripcion}</span>
                                :
                                <span>{item.Descripcion}</span>
                            }
                        </Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-item">
                            <buttons.PopOver idParent={PAGE_ID} idForm={PERIODOSDETALLESEGUMIENTO} info={item}
                                extraData={[editarItem, eliminarItem]} />
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <input.Date id={"FechaInicio"} idFormSection={PERIODOSDETALLESEGUMIENTO} size={[12, 6, 6, 6]} validations={[validations.required()]} label="Fecha Inicio" />
                    <input.Date id={"FechaFin"} idFormSection={PERIODOSDETALLESEGUMIENTO} size={[12, 6, 6, 6]} validations={[validations.required(), validations.greaterEqualThan("FechaInicio", "Error")]} label="Fecha Fin" />
                    <Input id={"Descripcion"} size={[12, 12, 12, 12]} maxLength={100} idFormSection={PERIODOSDETALLESEGUMIENTO} label="Descripción" />
                </Row>
            </page.SectionList>
        };
    })



    export let AniosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PERIODOSCOMISIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Periodo",
            items: createDefaultStoreObject([]),
            label: "Año",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Clave",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "comisionesConfiguracion", { activos: 1 });
                dispatchAsync("load::PERIODOSCOMISIONES", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });




}
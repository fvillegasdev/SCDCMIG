namespace EK.Modules.SCV.Pages.Comisiones {
    "use strict";
    const PAGE_ID: string = "comisionesConfiguracion";
    const PERIODOS: string = "Periodos";

    const PERIODOSDETALLESEGUMIENTO: string = "PeriodosDetalleSeguimiento";

    const PERIODOS_ESQUEMA: string = "PeriodosEsquema";
    const PERIODOS_ESQUEMA_DETALLE: string = "PeriodosEsquemaDetalle";
    const COMISIONES_CONFIGURACION_ID: string = "configuracionDeComisiones";
    const COMISIONES_CONFIGURACION: string = "configuracionDeComisiones";




    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");

    interface IConfiguracionComisiones extends React.Props<any> {
        elementoSeleccionado: any;
        estadoEntidad: any;
    }
    interface IStateConfiguracionComisiones {
    }
        export const ConfiguracionComisiones: any = global.connect(class extends React.Component<IConfiguracionComisiones, IConfiguracionComisiones> {
        constructor(props: IConfiguracionComisiones) {
            super(props);
            this.actualizarEstado = this.actualizarEstado.bind(this);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.elementoSeleccionado = state.global.OpcionesComisionesSeleccionado;
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        actualizarEstado(estado: boolean): void {
            dispatchSuccessful("load::currentEntityState", { viewMode: estado })
        }
        shouldComponentUpdate(nextProps: IConfiguracionComisiones, nextState: IConfiguracionComisiones): boolean {
            return (hasChanged(this.props.estadoEntidad, nextProps.estadoEntidad));
        }
        componentDidMount(): any {
            dispatchSuccessful("load::currentEntityState", { viewMode: true })
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let $bc: any = $ml.bc;
            let bc: any = [$bc.global.ek, $bc.scv.pd, $bc.scv.DashBoardConfigComisiones];

            let modoVista: boolean = getData(this.props.estadoEntidad).viewMode;
            let title: IPageTitle;

            return <PageV2 id={PAGE_ID} breadcrumb={bc} title={title} slots={[PERIODOS, PERIODOSDETALLESEGUMIENTO, PERIODOS_ESQUEMA, PERIODOS_ESQUEMA_DETALLE, COMISIONES_CONFIGURACION_ID]}>
                <PageButtons>

                    {modoVista ? <EditarEntidad onClick={(e) => this.actualizarEstado(false)} /> :
                        <CancelButton onClick={(e) => this.actualizarEstado(true)} />
                    }

                </PageButtons>
                <OpcionesComisiones />
            </PageV2>;;
           
        }
    })

    interface IOpciones extends page.Base {
        data: any;
        elementoSeleccionado: any;
        estadoEntidad: boolean;
    };
    let OpcionesComisiones: any = global.connect(class extends React.Component<IOpciones, IOpciones> {
        constructor(props: IOpciones) {
            super(props);
            this.onClick = this.onClick.bind(this);
            this.onFilter = this.onFilter.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.data = state.global.OpcionesComisiones;
            retValue.elementoSeleccionado = state.global.OpcionesComisionesSeleccionado;
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        onClick(valor: any): void {
            dispatchSuccessful("load::OpcionesComisionesSeleccionado",{ data: valor.Clave })
        };
        componentDidMount(): void {
            dispatchSuccessful("load::OpcionesComisionesSeleccionado", { data: "PER" })
            dispatchAsync("load::OpcionesComisiones", "catalogos/get(OPCIONESCOMISIONES)");
        }
        shouldComponentUpdate(nextProps: IOpciones, nextState: IOpciones): boolean {
            return global.hasChanged(this.props.data, nextProps.data) ||
                global.hasChanged(this.props.elementoSeleccionado, nextProps.elementoSeleccionado) ||
                global.hasChanged(this.props.estadoEntidad, nextProps.estadoEntidad)
        };
        onFilter(): void {
            let opcionSeleccionada: any = getData(this.props.elementoSeleccionado);

            let periodo: any = Forms.getValue("Periodo", PAGE_ID);
            let fase: any = Forms.getValue("Fase", PAGE_ID);

            let idPeriodo: number = periodo && periodo.ID>0 ? parseInt(periodo.ID) : 0;
            let idFase: number = fase && fase.ID>0 ? parseInt(fase.ID) : 0;


            if (opcionSeleccionada == "PER") {

                if (idPeriodo > 0 || idFase > 0) {
                    actualizarPeriodoSeleccionado(periodo, idPeriodo, idFase);
                }
                else {
                    warning("Seleccione un periodo o fase");
                }

            }
            else if (opcionSeleccionada == "PLAN") {
                obtenerConfiguracionPlanEsquema(true);
            }
            else
            {
                if (idFase) {
                    obtenerConfiguracion(idFase)
                }
                else
                {
                    warning("Seleccione fase")
                }
            }
        }
        render(): JSX.Element {
            let elementoSeleccionado: any = getData(this.props.elementoSeleccionado);
            let modoVista: any = getData(this.props.estadoEntidad).viewMode;
            let iconos: any[] = [];
            iconos['PER'] = "fa fa-calendar";
            iconos['PLAN'] = "fa fa-list-ol";
            iconos['CC'] = "fa fa-calculator";

            let iconosColor: any[] = [];
            iconosColor['PER'] = "#8bc780";
            iconosColor['PLAN'] = "#ff8f00";
            iconosColor['CC'] = "#df0707";

            let itemsModificados: DataElement = new DataElement(this.props.data);
            itemsModificados.timestamp = Number(new Date());
            itemsModificados = itemsModificados.getActiveItems();

            return <div>
                <Row>
                    <OptionSection icon="fas fa-users-cog"
                        title={"Configuración de Comisiones"}
                        collapsed={false} hideCollapseButton={true} readOnly={false} >
                        <SectionButtons>
                            <Button className="btn-ico-ek white" iconOnly={true} color="white" icon="fas fa-sync-alt" onClick={this.onFilter} />
                        </SectionButtons>
                        <Row style={{ marginBottom:"1%" }}>
                            <Column size={[12, 6, 6, 6]}>
                                <ddl.FasesExpedienteDDL id={"Fase"} addNewItem={"SO"} size={[12, 6, 6, 6]} />

                                {(elementoSeleccionado == "PER") ?
                                    <AniosDDL id={"Periodo"} addNewItem={"SO"} size={[12, 6, 6, 6]} />
                                    : null
                                }

                                {(elementoSeleccionado == "PLAN") ?
                                    <EsquemasDDL size={[12, 6, 6, 6]} addNewItem={"SO"}/>
                                    : null
                                }
                            </Column>
                            <Column size={[12, 6, 6, 6]} style={{ marginTop: "1%", marginBottom: "1%" }}>
                                <List
                                    items={itemsModificados}
                                    readonly={false}
                                    addRemoveButton={false}
                                    dragAndDrop={false}
                                    listMode={"list-horizontal"}
                                    formatter={(index: number, item: any) => {
                                        let clase: string = item.Clave === elementoSeleccionado ? "fase-expediente selectedFase" : "fase-expediente";
                                        return <div className={clase}>
                                            <a className="btn fase-expediente-link" onClick={(e) => this.onClick(item)}>
                                                <i className={iconos[item.Clave]}></i>{item.Nombre}  </a>
                                        </div>;
                                    }} />
                            </Column>
                        </Row>
                        <Row>
                            {elementoSeleccionado === 'PER' ? <Periodos /> : null}
                            {elementoSeleccionado === 'PLAN' ? <PlanPorEsquema /> : null}
                            {elementoSeleccionado === 'CC' ? <ConfiguracionDeComisiones /> : null}
                        </Row>
                    </OptionSection>
                </Row>
                
            </div>;

        }
    });

    export interface ISeguimientoButtonProps extends EK.UX.Buttons.IButtonProps {
    }
    export let EditarEntidad: any = global.connect(class extends React.Component<ISeguimientoButtonProps, {}> {
        constructor(props: ISeguimientoButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
        });
        static defaultProps: ISeguimientoButtonProps = {
            icon: "fa fa-edit",
            text: "",
            color: "white",
            className: "btn-editar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
        render(): JSX.Element {
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Write}>
                <Button {...this.props} className={className} onClick={this.onClick} />
            </Authorize>;
        };
    });


    interface IEsquema extends IDropDrownListProps {
        fase?: any;
    }
    let EsquemasDDL: any = global.connect(class extends React.Component<IEsquema, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESQUEMASSEGUIMIENTOFASE,
            fase: Forms.getValue("Fase", config.id, state)
        });
        static defaultProps: IEsquema = {
            id: "EsquemaSeguimiento",
            items: createDefaultStoreObject([]),
            label: "Esquema de Seguimiento",
            helpLabel: "Seleccione un Esquema de Seguimiento",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3]
        };
        cargarElementos(idFase: number): void {
            let encodedFilters: string = global.encodeObject({ idFase: idFase });
            global.dispatchAsync("load::ESQUEMASSEGUIMIENTOFASE", "esquemas/all/" + encodedFilters);

        }
        componentDidMount(): void {
            let fase: any = this.props.fase;
            if (fase && fase.ID > 0) {
                this.cargarElementos(fase.ID);
            }
        };
        componentWillReceiveProps(nextProps: IEsquema, nextState: IEsquema): any {
            let fase: any = nextProps.fase;
            if (global.hasChanged(this.props.fase, nextProps.fase)) {
                if (fase && fase.ID > 0) {
                    this.cargarElementos(fase.ID);
                }
                else
                {
                    Forms.updateFormElement(config.id, "EsquemaSeguimiento", { ID: -1, Nombre: "Seleccione una opcion" })
                    global.dispatchSuccessful("load::ESQUEMASSEGUIMIENTOFASE", []);
                }
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
   
}
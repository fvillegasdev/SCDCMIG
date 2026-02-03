namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
    "use strict";
    const PAGE_ID: string = "seguimientos";
    const idFormUbicacion: string = "$ventasUbicaciones";
    const UBICACIONES_ID: string = "Ubicaciones";
    const CARACTERISTICAS_ID: string = "Caracteristicas";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [UBICACIONES_ID, CARACTERISTICAS_ID]);

    interface IParams {
        id: any;
    }

    export interface IBaseSeguimiento extends React.Props<any> {
        seguimiento?: any;
        etapa?: any;
    }

    interface IProps extends React.Props<any> {
        obtenerExpediente?: (id: number) => void;
        guardar?: (item: any[], strUrl: string) => void;
        item?: any;
        params?: IParams;
        global?: any;
        etapaGlobal?: any;
        suspension?: any;
        expediente?: any;
    }

    interface IState {
        viewMode?: boolean;
    }

    export let Edicion: any = global.connect(class extends React.Component<IProps, IState> {
        constructor(props: IProps) {
            super(props);
            this.editForm = this.editForm.bind(this);
            this.cancelEditForm = this.cancelEditForm.bind(this);
            this.state = { viewMode: true };
        }
        static props: any = (state: any): any => ({
            item: state.seguimientosReducer.selected,
            etapaGlobal: state.global.seguimiento$etapaGlobal,
            suspension: state.seguimientosReducer.suspension,
            expediente: state.seguimientosReducer.expediente
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerExpediente: (id: number): void => {
                global.dispatchAsyncPost("scv-seguimientos-expediente-setSelected", "base/scv/expedientes/id/", { id });
                global.asyncPost("ventas/porexpediente", { IdExpediente: id }, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-page-data", data, "VentasPorExpediente");
                        global.dispatchLoading("global-page-data", data, "Ubicaciones");
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-page-data", data, "VentasPorExpediente");
                        global.dispatchSuccessful("global-page-data", data.Ubicaciones, "Ubicaciones");
                    }
                });
            },
            guardar: (item: any, strUrl: string): void => {
                global.dispatchAsyncPut("scv-seguimientos-guardar", strUrl, item);
            }
        });

        static defaultProps: IProps = {
            global: {},
            etapaGlobal: 0
        };
        editForm(): void {
            Forms.remove(PAGE_ID);
            //this.setEstatusSeguimiento("N");
            this.setState({ viewMode: false });
            config.setState({ viewMode: false });
        };
       
        cancelEditForm(): void {
            if (!this.state.viewMode) {
                this.setState({ viewMode: true });
                config.setState({ viewMode: true });
              //this.setEstatusSeguimiento("N");
            } else {
                global.go("/scv/expedientes");
            }
        };
        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
            return global.hasChanged(this.props.item, nextProps.item) ||
                global.hasChanged(this.props.expediente, nextProps.expediente) ||
                global.hasChanged(this.props.suspension, nextProps.suspension) ||
                this.state.viewMode !== nextState.viewMode;
        };
        componentWillMount(): void {
            global.dispatchDefault("scv-seguimientos-catalogo", []);
            global.dispatchDefault("scv-seguimientos-setSelected", {});
            global.dispatchDefault("scv-seguimientos-expediente-setSelected", {});
        };
        componentDidMount(): any {
            let id: number = Number(this.props.params.id);

            if (id > 0) {
                this.props.obtenerExpediente(id);
            } else {
                global.dispatchFailed("scv-seguimientos-catalogo", null);
                global.dispatchFailed("scv-seguimientos-setSelected", null);
                global.dispatchFailed("scv-seguimientos-expediente-setSelected", null);
            }

            global.dispatchSuccessful("load::activeSeguimiento", { ID: 0 });
            global.dispatchSuccessful("load::seguimiento$etapaGlobal", { etapaGlobal: 0 });
            global.dispatchSuccessful("scv-seguimientos-etapas-setSelected", {});

            global.setCurrentEntityType(PAGE_ID);
            global.setPageConfig({ id: config.id, modulo: config.modulo, slots: config.slots, idML: config.idML });
            config.setState({ viewMode: true });

            global.requireGlobal(Catalogos.estatus);
            //this.setEstatusSeguimiento("N");
        };
        componentWillReceiveProps(nextProps: IProps) {
            if (global.hasChanged(this.props.item, nextProps.item)) {
                global.setCurrentEntity(nextProps.item);
                global.dispatchSuccessful("load::seguimiento$etapaGlobal", { etapaGlobal: 0 });
                global.dispatchSuccessful("scv-seguimientos-etapas-setSelected", {});
               //this.setEstatusSeguimiento("N");
            }
        };
        componentDidUpdate(prevProps: IProps, prevState: IState): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.item, this.props.item)) {
                let item: any = global.getData(this.props.item);
                let mensajes: string[] = [];
                mensajes['A'] = $page.mensajes.reanudado;
                mensajes['S'] = $page.mensajes.suspendido;
                mensajes['F'] = $page.mensajes.finalizado;
                mensajes['C'] = $page.mensajes.cancelado;

                if (item.Response) {
                    if (item.Response === "C") {
                        global.dispatchDefault("scv-seguimientos-setSelected", {});
                    }
                    global.success(mensajes[item.Response]);
                } else {
                    global.success($page.mensajes.exito);
                }

                this.setState({ viewMode: true });
                config.setState({ viewMode: true });
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let $bc: any = $ml.bc;
            let bc: any = [$bc.global.ek, $bc.scv.pd, $page.bc];
            let editView: boolean = this.state.viewMode ? false : true;
            let current: any = global.getData(this.props.expediente);

            let title: IPageTitle = {
                title: $page.consulta.title,
                subTitle: global.isSuccessful(this.props.expediente) ? current.ID : "",
                children: global.isSuccessful(this.props.expediente) ? [EK.UX.Labels.badgeEstatus(current.Estatus)] : null
            }

            let esquema: any = global.createDefaultStoreObject({});
            let venta: any = global.createDefaultStoreObject({});
            let estatusProcesos: any;

            if (global.isSuccessful(this.props.item)) {
                esquema = global.createSuccessfulStoreObject(getData(this.props.item).Esquema);
                venta = global.createSuccessfulStoreObject(getData(this.props.item).Venta);
                estatusProcesos = global.getData(this.props.item).EstatusSeguimiento.Clave;
            }

            let estatusExp: string = current && current.EstatusExpediente ? current.EstatusExpediente.Clave : "";
            let notEdit: any = (estatusExp == "PA" || estatusExp == "C") ? false : true;


            let page: JSX.Element =
                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
                    <PageButtons>
                        {!editView && estatusProcesos === 'A' && notEdit ?
                            <EditButton onClick={this.editForm} /> : null}
                        <CancelButton onClick={this.cancelEditForm} />
                        <GenerarHojaDatosGeneralesButton/>
                    </PageButtons>
                    <PanelUpdate info={this.props.expediente}>
                        <FadeInColumn>
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                    {estatusExp == "PA" ?
                                        <Row className={"ek-sombra"}
                                            style={{
                                                border: "solid 2px #eea236",
                                                backgroundColor: "#f0ad4e",
                                                margin: "0px 5px 5px 5px"
                                            }}>
                                            <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                                                    <i className={"fa fa-info-circle"} style={{ marginRight: "5px", fontSize: "18px" }}></i>
                                                    {"Cancelación de expediente por Autorizar"}
                                                </span>
                                            </Column>
                                        </Row> : null}
                                   
                                    {estatusExp == "C" ?
                                        <Row className={"ek-sombra"}
                                            style={{
                                                border: "solid 2px #d43f3a",
                                                backgroundColor: "#d9534f",
                                                margin: "0px 5px 5px 5px"
                                            }}>
                                            <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                                                    <i className={"fa fa-info-circle"} style={{ marginRight: "5px", fontSize: "18px" }}></i>
                                                    {"Expediente Cancelado por " + current.MotivoCancelacion.Nombre + " en " + label.formatDate(current.Modificado)}
                                                </span>
                                            </Column>
                                        </Row> : null}

                                    <OptionSection
                                        title={$page.form.section.expediente.title}
                                        icon="fas fa-archive" collapsed={false} hideCollapseButton={true} level="main">
                                        <Row>
                                            <ExpedienteView size={[12, 12, 12, 12]} />
                                        </Row>
                                        {this.props.item && this.props.item.status !== EK.Store.AsyncActionTypeEnum.default ?
                                            <PanelUpdate info={this.props.item}>
                                                {!editView
                                                    ? <View
                                                        venta={venta}
                                                        esquema={esquema}
                                                        activarEdicion={false} />
                                                    : <Edit
                                                        venta={venta}
                                                        esquema={esquema}
                                                        activarEdicion={true} />
                                                }
                                            </PanelUpdate> : null
                                        }

                                        <KontrolLogBookManager
                                            idEntidadPadre={current.ID}
                                            claveEntidadPadre={"Expediente"}
                                            modulo={"Expediente"}
                                            viewMode={false}
                                            addNewItem={"SO"}/>

                                    </OptionSection>
                                </Column>
                            </Row>
                        </FadeInColumn>
                        <modal.Modal id={"modalArchivosRequisitos"} url={"about:blank"}></modal.Modal>
                    </PanelUpdate>
                </PageV2>
            return page;
        }
    });

    interface IViewProps extends React.Props<any> {
        item: any;
        suspension?: any;
        venta: DataElement;
        esquema: DataElement;
        activarEdicion: boolean;
    }

    export const View: any = global.connect(class extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            item: state.seguimientosReducer.selected,
            suspension: state.seguimientosReducer.suspension
        });
        render(): JSX.Element {

            let $page: any = $ml[PAGE_ID];
            let current: any = getData(this.props.item);

            if (!isSuccessful(this.props.item)) {
                return null;
            }

            let esquema: any = getData(this.props.esquema);
            let venta: any = getData(this.props.venta);

            let suspension: string = "N";
            let estatusSuspension: string = getData(this.props.suspension);
            if (estatusSuspension === "A" || estatusSuspension === "S" || estatusSuspension === "C") {
                suspension = estatusSuspension.substr(0);
            }
            let idExpediente: number = current && current.IdExpediente ? current.IdExpediente : 0;
            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            title={$page.form.section.informacion.titulo + " " + current.Fase.Nombre}
                            icon="fa fa-folder" level={1} collapsed={true}>
                            <Row>
                                <Label label={$page.form.section.informacion.folioVenta} value={venta.ID} size={[12, 12, 2, 2]} />
                                <Label label={"Responsable"} value={current.Posicion.Nombre} size={[12, 12, 6, 6]} />
                                <Label label={$page.form.section.informacion.fechaInicio} value={current.Creado} size={[12, 12, 2, 2]} />
                                <Label label={$page.form.section.informacion.estatusSeguimiento} value={current.EstatusSeguimiento.Nombre} size={[12, 12, 2, 2]} />
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
                <Row>
                        <UbicacionesView item={venta} idExpediente={getData(this.props.item).IdExpediente} />
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            title={$page.form.section.esquema.titulo} level={1}
                            icon="fa fa-cog" collapsed={false} hideCollapseButton={true} readOnly={true}>
                            <PanelUpdate info={this.props.esquema}>
                                <SectionView>
                                    <div>
                                        <Row>
                                            {current.Fase.Clave === "FASE-VENT"
                                                ? <div>
                                                    <Label label={$page.form.section.esquema.Nombre} value={esquema.Nombre} size={[12, 12, 8, 8]} />
                                                </div>
                                                : <div>
                                                    <Label label={$page.form.section.esquema.Nombre} value={esquema.Nombre} size={[12, 12, 12, 12]} />
                                                </div>
                                            }
                                        </Row>
                                        <Row>
                                            <div>&nbsp;</div>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 3, 3]}>
                                                <SeguimientoEtapas />
                                            </Column>
                                            <Column size={[12, 12, 9, 9]}>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <SeguimientoRequisitos activarEdicion={this.props.activarEdicion} />
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <SeguimientoDocumentos activarEdicion={this.props.activarEdicion} />
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <SeguimientoProcesos activarEdicion={this.props.activarEdicion} />
                                                    </Column>
                                                </Row>
                                            </Column>
                                        </Row>
                                    </div>
                                </SectionView>
                            </PanelUpdate>
                        </page.OptionSection>
                    </Column>
                </Row>
            </FadeInColumn>
        }
    });

    interface IExpedienteProps extends grid.IColumn {
        expediente?: DataElement;
        seguimiento?: DataElement;
        seguimientos?: DataElement;
        obtenerSeguimiento?: (id: number) => void;
        obtenerSeguimientos?: (id: number) => void;
        activeSeguimiento?: any;
    }

    export const ExpedienteView: any = global.connect(class extends React.Component<IExpedienteProps, IExpedienteProps> {
        constructor(props: IExpedienteProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            expediente: state.seguimientosReducer.expediente,
            seguimiento: state.seguimientosReducer.selected,
            seguimientos: state.seguimientosReducer.catalogo,
            activeSeguimiento: state.global.activeSeguimiento
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerSeguimiento: (id: number): void => {
                global.dispatchAsync("scv-seguimientos-setSelected", "SCV/Seguimientos/GetById/" + id);
            },
            obtenerSeguimientos: (id: number): void => {
                let encodedParams: string = global.encodeParameters({ idExpediente: id });
                global.dispatchAsync("scv-seguimientos-catalogo", "SCV/Seguimientos/GetAllByParams/" + encodedParams);
            }
        });
        componentDidMount(): any {
            let id: number = getDataID(this.props.expediente);
            if (id > 0) {
                this.props.obtenerSeguimientos(id);
            }
        };
        shouldComponentUpdate(nextProps: IExpedienteProps, nextState: IExpedienteProps): boolean {
            return hasChanged(this.props.seguimientos, nextProps.seguimientos) ||
                hasChanged(this.props.seguimiento, nextProps.seguimiento) ||
                hasChanged(this.props.expediente, nextProps.expediente) ||
                hasChanged(this.props.activeSeguimiento, nextProps.activeSeguimiento);
        };
        componentDidUpdate(prevProps: IExpedienteProps, prevState: IExpedienteProps): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.seguimiento, this.props.seguimiento)) {
                let id: number = getDataID(this.props.expediente);
                this.props.obtenerSeguimientos(id);
            }
            if (global.isSuccessful(this.props.seguimientos)) {
                if (this.props.activeSeguimiento && this.props.activeSeguimiento.data.ID <= 0) {
                    if (this.props.seguimientos) {
                        this.props.seguimientos.data.forEach((value: any, index: number) => {
                            if (value.EstatusSeguimiento.Clave === "A" || value.EstatusSeguimiento.Clave === "S") {
                                this.onClick(value, index)
                            }
                        })
                    }
                }
            }
        };
        onClick(item: any, index: number): void {
            global.dispatchSuccessful("load::activeSeguimiento", { ID: item.ID });
            this.props.obtenerSeguimiento(item.ID);
        };
        faseExpedienteView(item: any, index: number): JSX.Element {
            let itemKey: any = "fase-" + index;
            let icons: string[] = [];
            icons['FASE-PROS'] = "fa fa-user";
            icons['FASE-VENT'] = "fa fa-tag";
            icons['FASE-POST'] = "fa fa-wrench";

            let fontColors: string[] = [];
            fontColors['FASE-PROS'] = "font-red-soft";
            fontColors['FASE-VENT'] = "font-green-meadow";
            fontColors['FASE-POST'] = "font-blue-sharp";

            let available: boolean = item.ID && item.EstatusSeguimiento.Clave !== "E" ? true : false;

            let style: React.CSSProperties = {
                margin: 0,
                padding: "14px 14px",
                backgroundColor: available ? "white" : "rgba(25, 25, 25, 0.05)",
                cursor: available ? "pointer" : "default"
            };

            let colorClass: string = available ? fontColors[item.Fase.Clave] : "";
            let className: string = "dashboard-stat2 text-uppercase margin-top-15 bordered ";
            let activeID: number = getDataID(this.props.activeSeguimiento);

            if (item.ID === activeID) {
                className += "ek-transform-selected"
            } else {
                className += "ek-transform-unselected"
            }

            let progressColor: string[] = [];
            progressColor['A'] = "#33b752";
            progressColor['C'] = "#fa0707";
            progressColor['F'] = "#33b752";
            progressColor['S'] = "#ff8f00";
            progressColor['E'] = "#33b752";

            return <FadeInColumn key={itemKey}>
                <Column size={[12, 12, 4, 4]}>
                    <a href="javascript:void(0);" onClick={available ? this.onClick.bind(this, item, index) : null}>
                        <div className={className} style={style}>
                            <div className="display" style={{ margin: 0 }}>
                                <div className="number">
                                    <h3 className="font-green-sharp">
                                        <small className={colorClass}>{item.Fase.Nombre}</small>
                                    </h3>
                                    <small>{item.EstatusSeguimiento.Nombre}</small>
                                </div>
                                <div className="icon">
                                    <i className={icons[item.Fase.Clave]} style={{ fontSize: 22 }}></i>
                                </div>
                            </div>
                            <div className="progress" style={{ margin: 0, marginTop: 4, height: 4 }}>
                                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: item.CANTIDAD_ORDEN_AVANZADA + "%", fontSize: "8px", textAlign: "right", background: progressColor[item.EstatusSeguimiento.Clave], opacity: 0.75 }}>
                                </div>
                            </div>
                        </div>
                    </a>
                    <div className="blockUI blockOverlay"></div>
                </Column>
            </FadeInColumn>
        };
        getElementos(): any {
            let $page: any = $ml[PAGE_ID];

            if (global.isSuccessful(this.props.seguimientos)) {
                let seguimientos: any[] = this.props.seguimientos.data ? this.props.seguimientos.data : [];
                let pasa: boolean = true;
                let fase: string = "";
                let faseOrden: any = 0;
                let elementos: any[] = seguimientos && seguimientos.length ? seguimientos.map((item: any, index: number): JSX.Element => {
                   
                    //if (pasa) {
                    //    if (item.EstatusSeguimiento.Clave === "A" || item.EstatusSeguimiento.Clave === "S") {
                    //        pasa = false;
                    //        fase = item.Fase.Clave;
                    //        faseOrden = item.Fase.Orden
                    //    }
                        return this.faseExpedienteView.call(this, item, index)
                    //}
                    
                }) : [];

                let fasePros: boolean = seguimientos.filter(item => item.Fase.Clave === 'FASE-PROS').length ? true : false;
                let faseVent: boolean = seguimientos.filter(item => item.Fase.Clave === 'FASE-VENT').length ? true : false;
                let fasePost: boolean = seguimientos.filter(item => item.Fase.Clave === 'FASE-POST').length ? true : false;

                let index: number = elementos.length;

                if (!fasePros ) {
                    let item: any = { Fase: { Clave: "FASE-PROS", Nombre: "Fase Prospección" }, EstatusSeguimiento: { Nombre: "No Disponible" } };
                    elementos.push(this.faseExpedienteView.call(this, item, index++));
                }
                //else {
                //    faseVent = false;
                //    fasePost = false;
                //}

                if (!faseVent ) {
                    let item: any = { Fase: { Clave: "FASE-VENT", Nombre: "Fase Venta" }, EstatusSeguimiento: { Nombre: "No Disponible" } };
                    elementos.push(this.faseExpedienteView.call(this, item, index++));
                }
                //else {
                //    fasePost = false;
                //}

                if (!fasePost ) {
                    let item: any = { Fase: { Clave: "FASE-POST", Nombre: "Fase Post-venta" }, EstatusSeguimiento: { Nombre: "No Disponible" } };
                    elementos.push(this.faseExpedienteView.call(this, item, index++));
                }

                return elementos;

            } else {
                return <AwesomeSpinner text={$page.mensajes.cargando} />
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = getData(this.props.expediente);
            let idExpediente: number = global.getDataID(this.props.expediente);

            if (!global.isSuccessful(this.props.expediente)) {
                return null;
            }

            let valueTC: any = getData(EK.Store.getState().global.currentEntity);
            let tC: any = valueTC.TipoComercializacion ? valueTC.TipoComercializacion : {};
            let centroCosto: any = current.Desarrollo.CentroCosto ? current.Desarrollo.CentroCosto : {};
            let elementos: any = this.getElementos.call(this);

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <Row>
                    <label.Folio label={$page.form.section.expediente.form.folio} value={current.ID} size={[12, 1, 1, 1]} />
                    <label.Link label={$page.form.section.expediente.form.cliente} value={current.Cliente} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} size={[12, 4, 4, 4]} />                   
                    <label.Link label={"Desarrollo"} value={current.Desarrollo} link={"#/scv/desarrollos/:id"} size={[12, 4, 4, 4]} />
                    {tC.Clave == undefined && tC.Nombre == undefined ?
                        <label.Label label={"Tipo Comercializacion"} size={[12, 2, 2, 2]} />
                        :
                        <label.Label label={"Tipo Comercializacion"} isHTML={true} value={["<span class='badge badge-info'>" + tC.Clave + "</span>", tC.Nombre].join(" ")} size={[12, 2, 2, 2]} />
                    }
                    
                    <label.Label label={$page.form.section.expediente.form.estatusExpediente}
                        value={current.EstatusExpediente.Nombre}
                        size={[12, 1, 1, 1]}
                        isHTML={true}
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: current.EstatusExpediente.BGColor, color: current.EstatusExpediente.Color, textAlign: "center", padding: "3px 0px", width: "100%", fontWeight: 600 }}
                        valueClass="badge" />

                    <Tags idExpediente={idExpediente} />

                </Row>
                <Row style={{ paddingBottom: 15 }}>{elementos}</Row>
            </Column>
        };
    });


    //  interface IUbicacionesViewProps extends React.Props<any> {
    interface IUbicacionesViewProps extends page.IProps {
        item: any;
        items?: DataElement;
        idExpediente: any;
        VentasPorExpediente: any;
    }

    let UbicacionesView: any = global.connect(class extends React.Component<IUbicacionesViewProps, {}>{
        constructor(props: IUbicacionesViewProps) {
            super(props);
            this.onGetCaracteristicas = this.onGetCaracteristicas.bind(this);
        }
        static props: any = (state: any) => ({
            entidad: state.global.catalogo$Ubicaciones,
            VentasPorExpediente: state.global.catalogo$VentasPorExpediente,
            config: global.createPageConfigFromState(state.global)
        });
        onGetCaracteristicas(caracteristicas: any[]): any {
            let retValue: any[] = [];

            if (caracteristicas && caracteristicas.length >= 0) {
                let caracteristicasarray: any[] = caracteristicas;
                caracteristicasarray.forEach((value: any, index: number) => {
                    if (retValue.length > 0) { retValue.push(<span key={index.toString() + "Coma"}>{", "}</span>); }
                    retValue.push(<span key={index}>{value.Caracteristica.Nombre}</span>);
                })
            }
            return retValue;
        };
        shouldComponentUpdate(nextProps: IUbicacionesViewProps, {}): boolean {
            return global.hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let entidad: global.DataElement = this.props.entidad;
            let state: any = this.props.config.getState();

            if (global.isSuccessful(this.props.entidad)) {
                entidad = this.props.entidad.getActiveItems();
            }

            const listHeaderUbicaciones: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Tipo Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>

            const listHeaderCaracteristicas: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Característica"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                    </Row>
                </Column>

            return <page.View entidad={entidad} state={state}>
                <page.SectionList
                    id={UBICACIONES_ID}
                    level={1}
                    title="Ubicaciones"
                    parent={config.id}
                    icon="fa fa-table"
                    collapsed={true}
                    size={[12, 12, 12, 12]}
                    listHeader={listHeaderUbicaciones}
                    items={createSuccessfulStoreObject([])}
                    readonly={true}
                    aggregate={(item: any, values: any) => {
                        if (!values.ImporteMoneda) values.ImporteMoneda = 0;

                        values.ImporteMoneda += item.ImporteMoneda ? item.ImporteMoneda : 0;
                        return values;
                    } }
                    addRemoveButton={false}
                    listFooter={(values: any) => {
                        return <div>
                            <Row>
                                <Column size={[9, 9, 9, 9]} style={{ textAlign: "right" }}>{""}</Column>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }}>
                                    <span ></span>
                                    <span className="badge badge-info list-footer-badge">
                                        {global.formatMoney(values.ImporteMoneda, global.getData(this.props.VentasPorExpediente).Desarrollo.Moneda)}
                                    </span>
                                </Column>
                            </Row>
                        </div>;
                    } }
                    formatter={(index: number, item: any) => {
                        let ubicacion: any = item.Ubicacion;
                        let caracteristicas: DataElement = global.createSuccessfulStoreObject(item.Caracteristicas).getActiveItems();
                        let length: number = global.getData(caracteristicas, []).length;

                        return <Row id={"row_ubicacion" + index} className="panel-collapsed" >
                            <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                <Row>
                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                        <CollapseButton idElement={"row_ubicacion" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                    </Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                        <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>
                                        <span className="bold">{item.Ubicacion.Clave}</span>
                                    </Column>
                                    <Column size={[3, 3, 3, 3]}><span className="badge badge-info">{item.Ubicacion.Nombre}</span></Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.Ubicacion.TipoUbicacion.Nombre}</Column>
                                    <Column size={[2, 2, 2, 2]} className="listItem-default-header">{item.Ubicacion.Prototipo.Nombre}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                        {global.formatMoney(item.ImporteMoneda, global.getData(this.props.VentasPorExpediente).Desarrollo.Moneda)}
                                    </Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-right-header"></Column>
                                </Row>
                            </Column>
                            <Row id={"row_ubicacion" + index}>
                                <Column
                                    xs={{ size: 10 }}
                                    sm={{ size: 10, offset: 1 }}
                                    md={{ size: 10, offset: 1 }}
                                    lg={{ size: 10, offset: 1 }}
                                    className="panel-detail well well-sm">
                                    <div className="note note-sucess" style={{ padding: "5px 0px", margin: 0, border: "none" }}>
                                        <Row style={{ padding: "5px 15px" }}>
                                            <Column size={[2, 2, 2, 2]}></Column>
                                            <Column size={[6, 6, 6, 6]}><span>PRECIO DE UBICACIÓN</span></Column>
                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ImporteUbicacion, global.getData(this.props.VentasPorExpediente).Desarrollo.Moneda)}</Column>
                                        </Row>
                                        {ubicacion.Excedente ?
                                            <Row style={{ padding: "5px 15px" }}>
                                                <Column size={[2, 2, 2, 2]}></Column>
                                                <Column size={[4, 4, 4, 4]}>
                                                    <span>METROS<sup>2</sup> EXCEDENTE</span>
                                                    <span className="badge badge-danger pull-right">{ubicacion.Excedente}&nbsp;m<sup>2</sup></span>
                                                </Column>
                                                <Column size={[4, 4, 4, 4]} className="listItem-right-header"></Column>
                                            </Row> : null
                                        }
                                    </div>
                                    <List
                                        id={this.props.id + "_list"}
                                        items={caracteristicas}
                                        readonly={true}
                                        listHeader={listHeaderCaracteristicas}
                                        addRemoveButton={false}
                                        formatter={(index_c: number, item_c: any): any => {
                                            if (item_c.VentaOpcional === true) {
                                                return <Row>
                                                    <Column size={[2, 2, 2, 2]}><span className="badge badge-warning">Incluida</span></Column>
                                                    <Column size={[10, 10, 10, 10]}>{item_c.Caracteristica.Nombre}</Column>
                                                </Row>
                                            }
                                            else {
                                                return <Row >
                                                    <Column size={[2, 2, 2, 2]}><span className="badge badge-info">Adicional</span></Column>
                                                    <Column size={[8, 8, 8, 8]}>{item_c.Caracteristica.Nombre}</Column>
                                                    <Column size={[2, 2, 2, 2]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item_c.Importe, global.getData(this.props.VentasPorExpediente).Desarrollo.Moneda)}</Column>
                                                </Row>
                                            }
                                        } } />
                                </Column>
                            </Row>
                        </Row>
                    } }>
                </page.SectionList>

            </page.View>;
        }
    });





    /*** BEGIN: EDIT FORM ***/
    interface IEditProps extends React.Props<any> {
        item: any;
        suspension?: any;
        venta: DataElement;
        esquema: DataElement;
        activarEdicion: boolean;
    };

    export const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        constructor(props: IEditProps) {
            super(props);
        };
        refs: {
            form: any;
        };
        static props: any = (state: any) => ({
            item: state.seguimientosReducer.selected,
            suspension: state.seguimientosReducer.suspension
        });
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = getData(this.props.item);

            if (!isSuccessful(this.props.item)) {
                return null;
            }

            let estatus: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;
            let esquema: any = getData(this.props.esquema);
            let venta: any = getData(this.props.venta);

            let estatusSeguimiento = current.EstatusSeguimiento.Clave;
            let suspension: string = "N";
            let estatusSuspension: string = getData(this.props.suspension);
            if (estatusSuspension === "A" || estatusSuspension === "S" || estatusSuspension === "C") {
                suspension = estatusSuspension.substr(0);
            }

            let idExpediente: number = current && current.IdExpediente ? current.IdExpediente : 0;


            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            title={$page.form.section.informacion.titulo + " " + current.Fase.Nombre}
                            icon="fa fa-folder" collapsed={true} level={1}>
                            <Row>
                                <Label label={$page.form.section.informacion.folioVenta} value={venta.ID} size={[12, 12, 2, 2]} />
                                <Label label={"Responsable"} value={current.Posicion.Nombre} size={[12, 12, 6, 6]} />
                                <Label label={$page.form.section.informacion.fechaInicio} value={current.Creado} size={[12, 12, 2, 2]} />
                                <Label label={$page.form.section.informacion.estatusSeguimiento} value={current.EstatusSeguimiento.Nombre} size={[12, 12, 2, 2]} />
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <UbicacionesView item={venta} />
                    </Column>
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            title={$page.form.section.esquema.titulo} level={1}
                            icon="fa fa-cog" collapsed={false} hideCollapseButton={true} readOnly={true}>
                            <PanelUpdate info={this.props.esquema}>
                                <SectionView >
                                    <div>
                                        <Row>
                                            {current.Fase.Clave === "FASE-VENT"
                                                ? <div>
                                                    <Label label={$page.form.section.esquema.Nombre} value={esquema.Nombre} size={[12, 12, 8, 8]} />
                                                </div>
                                                : <div>
                                                    <Label label={$page.form.section.esquema.Nombre} value={esquema.Nombre} size={[12, 12, 12, 12]} />
                                                </div>}
                                        </Row>
                                        <Row>
                                            <div> &nbsp; </div>
                                        </Row>
                                        <Row>
                                            <Column size={[12, 12, 3, 3]}>
                                                <SeguimientoEtapas />
                                            </Column>
                                            <Column size={[12, 12, 9, 9]}>
                                                <Row>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <SeguimientoRequisitos activarEdicion={this.props.activarEdicion} />
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <SeguimientoDocumentos activarEdicion={this.props.activarEdicion} />
                                                    </Column>
                                                    <Column size={[12, 12, 12, 12]}>
                                                        <SeguimientoProcesos activarEdicion={this.props.activarEdicion} />
                                                    </Column>
                                                </Row>
                                            </Column>
                                        </Row>
                                    </div>
                                </SectionView>
                            </PanelUpdate>



                        </page.OptionSection>
                    </Column>
                </Row>
            </FadeInColumn>
        }
    });


    interface ITags extends IDropDrownListProps {
        tagsEstablecidos?: DataElement;
        tags?: DataElement;
        idExpediente?: number;
    }
    export let Tags: any = global.connect(class extends React.Component<ITags, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.TagsExpedientesEdicion,
            tags: Forms.getValue("Tags", PAGE_ID),
            tagsEstablecidos: state.global.tagsEstablecidos,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Tags",
            label: "Tags",
            itemKey: "ID",
            itemValue: "Nombre",
            mode: SelectModeEnum.Multiple,
            matchers: ["Clave"],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave,
                            "</span>",
                            "<span class='bold' style='font-size: 90%'>",
                            item.obj.Nombre,
                            "</span> "
                        ].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return item.Clave;
                };
            },
            selectionFormatter: (item): any => {
                let id: number = parseInt(item.id);
                if (isNaN(id)) {
                    return item.text;
                };
                if (id < 1) {
                    return item.Clave;
                }
                else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Clave,
                        "</span>"].join(""));
                }
            },
            processData: (data): any => {
                let items: any[] = data;
                let options: any = {};
                let tp: any = 0;
                for (var i = 0; i < items.length; i++) {
                    tp = items[i].TipoClasificador;
                    if (!tp) {
                        items[i].id = items[i].ID;
                        options[items[i].ID] = items[i];
                    }
                    else {
                        if (!options[tp.ID]) {
                            options[tp.ID] = { "obj": tp, "children": [] };
                        };
                        items[i].id = items[i].ID;
                        options[tp.ID].children.push(items[i]);
                    };
                };

                let retValue: any[] = [];
                for (var key in options) {
                    retValue.push(options[key]);
                };

                return retValue;
            },
            size: [12, 12, 12, 12]
        };
        componentWillReceiveProps(nextProps: ITags, nextState: ITags): any {
            if (global.hasChanged(this.props.tagsEstablecidos, nextProps.tagsEstablecidos)) {
                if (isSuccessful(nextProps.tagsEstablecidos)) {
                    let elementos: any = getData(nextProps.tagsEstablecidos);
                    Forms.updateFormElement(PAGE_ID, "Tags", elementos);
                }

            };
            if (global.hasChanged(this.props.items, nextProps.items)) {
                if (isSuccessful(nextProps.items)) {
                    if (this.props.idExpediente > 0) {
                        global.dispatchAsyncPost("load::tagsEstablecidos", "base/scv/expedientes/GetBP/ObtenerTagsExpediente",
                            global.assign({ IdExpediente: this.props.idExpediente }));
                    }
                }
            };
            if (this.props.tags && nextProps.tags) {
                if (!global.areEqualID(this.props.tags, nextProps.tags)) {
                    let tags: any = nextProps.tags;
                    let idExpediente: number = this.props.idExpediente;
                    //
                    global.dispatchAsyncPost("load::tagsEstablecidos", "base/scv/expedientes/GetBP/SaveTags",
                        global.assign({ IdExpediente: idExpediente, tags: tags }), "Tags");
                };
            };
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TagsExpedientesEdicion", "base/kontrol/clasificadores/Get/GetAll/" + global.encodeObject({ activos: 1, claveTipo: "TAG" }));
            };

            if (isSuccessful(this.props.items)) {
                if (this.props.idExpediente > 0) {
                    global.dispatchAsyncPost("load::tagsEstablecidos", "base/scv/expedientes/GetBP/ObtenerTagsExpediente",
                        global.assign({ IdExpediente: this.props.idExpediente }));
                }
            }
        };
        shouldComponentUpdate(nextProps: ITags, nextState: any): boolean {
            let tagsAreEqual: boolean = true;
            if (this.props.tags || nextProps.tags) {
                tagsAreEqual = global.areEqualID(this.props.tags, nextProps.tags);
            };

            let retValue: boolean = hasChanged(this.props.idExpediente, nextProps.idExpediente) ||
                !tagsAreEqual ||
                hasChanged(this.props.tagsEstablecidos, nextProps.tagsEstablecidos);

            return retValue;
        };
        render(): any {
            let tags: any = Forms.getValue("Tags", PAGE_ID);

            if (this.props.idExpediente <= 0)
                return null;


            return <div className="tagInputElement"><EK.UX.DropDownLists.DropdownList$Form {...this.props} size={[12, 12, 12, 12]} /></div>;
        }
    });

    interface IGenerarHojaContactoButton extends EK.UX.Buttons.IButtonProps, page.IProps {
    }

    export let GenerarHojaDatosGeneralesButton: any = global.connect(class extends React.Component<IGenerarHojaContactoButton, {}> {
        constructor(props: IGenerarHojaContactoButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
        });
        static defaultProps: IGenerarHojaContactoButton = {
            icon: "far fa-file-alt",
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
            let entidad: any = global.getData(this.props.entidad);
            let win = window.open(["expediente/generar/hojaDatosGenerales/", entidad.IdExpediente].join(""), "_blank")
        };
        render(): JSX.Element {
            return <Button {...this.props} onClick={this.onClick} />;
        };
    });
}
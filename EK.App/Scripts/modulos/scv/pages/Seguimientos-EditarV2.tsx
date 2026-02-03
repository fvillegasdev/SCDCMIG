namespace EK.Modules.SCV.Pages.SeguimientoExpedientes.V2 {
    "use strict";
    const PAGE_ID: string = "seguimientos";
    const idFormUbicacion: string = "$ventasUbicaciones";
    const PAGE_ID_SECTION_FORM_SEG_SUSPENSION: string = "seguimiento$SUSPENSION";
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
            this.setEstatusSeguimiento = this.setEstatusSeguimiento.bind(this);
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
                global.dispatchAsync("scv-seguimientos-expediente-setSelected", "base/scv/expedientes/GetBP/GetByIdV2/" + global.encodeObject({ id }));
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
            this.setEstatusSeguimiento("N");
            this.setState({ viewMode: false });
            config.setState({ viewMode: false });
        };
        setEstatusSeguimiento(clave: any): void {
            Forms.remove(PAGE_ID_SECTION_FORM_SEG_SUSPENSION);
            global.dispatchSuccessful("scv-seguimientos-suspension", clave);
        };
        cancelEditForm(): void {
            if (!this.state.viewMode) {
                this.setState({ viewMode: true });
                config.setState({ viewMode: true });
                this.setEstatusSeguimiento("N");
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
            this.setEstatusSeguimiento("N");
        };
        componentWillReceiveProps(nextProps: IProps) {
            if (global.hasChanged(this.props.item, nextProps.item)) {
                global.setCurrentEntity(nextProps.item);
                global.dispatchSuccessful("load::seguimiento$etapaGlobal", { etapaGlobal: 0 });
                global.dispatchSuccessful("scv-seguimientos-etapas-setSelected", {});
                this.setEstatusSeguimiento("N");
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
            let page: JSX.Element =
                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
                    <PageButtons>
                        {!editView && estatusProcesos === 'A' ? <EditButton onClick={this.editForm} /> : null}
                        {editView && estatusProcesos === 'A' ? <EscapeButton info={"S"} onClick={this.setEstatusSeguimiento} /> : null}
                        {editView && estatusProcesos === 'A' ? <CancelarButton info={"C"} onClick={this.setEstatusSeguimiento} /> : null}
                        {estatusProcesos === 'S' ? <ContinueButton info={"A"} onClick={this.setEstatusSeguimiento} /> : null}
                        <CancelButton onClick={this.cancelEditForm} />
                        <GenerarHojaDatosGeneralesButton />
                    </PageButtons>
                    <PanelUpdate info={this.props.expediente}>
                        <OptionSection
                            title={$page.form.section.expediente.title}
                            icon="fas fa-archive"
                            collapsed={false}
                            level="main"
                            hideCollapseButton={true}
                        >
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
                        </OptionSection>
                        <modal.Modal id={"modalArchivosRequisitos"} url={"about:blank"}></modal.Modal>
                        <modal.Modal id={"modalExpedienteDocumento"} url={"about:blank"}></modal.Modal>
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

            let estatusSeguimiento = current.EstatusSeguimiento.Clave;
            let suspension: string = "N";
            let estatusSuspension: string = getData(this.props.suspension);
            if (estatusSuspension === "A" || estatusSuspension === "S" || estatusSuspension === "C") {
                suspension = estatusSuspension.substr(0);
            }

            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        {estatusSeguimiento === "S" || estatusSeguimiento === "C" || suspension === "A" || suspension === "S" || suspension === "C" ?
                            <MotivoSuspensionView
                                item={current}
                                suspension={this.props.suspension} /> : null}
                    </Column>
                </Row>
                <Row>
                    <PanelUpdate info={this.props.esquema}>
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
                            <Column size={[12, 12, 12, 12]}>
                                    <KontrolLogBookManager modulo={config.id} addNewItem={"SO"} viewMode={false} readOnly={false} />
                            </Column>
                        </Row>
                    </Column>
                    </PanelUpdate>
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

            this.onClick = this.onClick.bind(this);
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
                    <a href="javascript:void(0);" onClick={() => available ? this.onClick(item, index) : null}>
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

                if (!fasePros) {
                    let item: any = { Fase: { Clave: "FASE-PROS", Nombre: "Fase Prospección" }, EstatusSeguimiento: { Nombre: "No Disponible" } };
                    elementos.push(this.faseExpedienteView.call(this, item, index++));
                }
                //else {
                //    faseVent = false;
                //    fasePost = false;
                //}

                if (!faseVent) {
                    let item: any = { Fase: { Clave: "FASE-VENT", Nombre: "Fase Venta" }, EstatusSeguimiento: { Nombre: "No Disponible" } };
                    elementos.push(this.faseExpedienteView.call(this, item, index++));
                }
                //else {
                //    fasePost = false;
                //}

                if (!fasePost) {
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
            //
            if (!global.isSuccessful(this.props.expediente)) {
                return null;
            };
            //
            let expHeader: any;
            if (current.TipoExpediente.Clave === "D") {
                expHeader = <Row key="rowHeader">
                    <label.Folio label={$page.form.section.expediente.form.folio} value={current.ID} size={[12, 1, 1, 1]} />
                    <label.Link label={"Documento"} value={current} formatValue={(e: any) => { return { ID: e.Documento.ID, Clave: e.Documento.Clave, Nombre: e.Documento.Nombre, IdExpediente: e.ID }; }} onClick={(e) => { global.goModal("modalArchivosRequisitos", "SCV/Seguimientos/Expediente/Documento/" + e.IdExpediente); }} size={[12, 5, 5, 5]} link={""} />
                    <label.Entidad size={[12, 5, 5, 5]} label={"Categoría"} value={"<span class='badge badge-info'>" + current.Documento.Categoria.Clave + "</span> " + (!current.Documento.Categoria.Nombre ? "" : current.Documento.Categoria.Nombre)} />
                    <label.Label label={$page.form.section.expediente.form.estatusExpediente}
                        value={current.EstatusExpediente.Nombre}
                        size={[12, 1, 1, 1]}
                        isHTML={true}
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: current.EstatusExpediente.BGColor, height: 20, color: current.EstatusExpediente.Color, textAlign: "center", padding: "3px 0px", width: "100%", fontWeight: 600 }}
                        valueClass="badge" />
                    <label.Link label={"Obra"} value={current.Entidad} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: e.Nombre }; }} link={"#/scco/obras/:id"} size={[12, 6, 6, 6]} />
                    <label.Link label={"Desarrollo"} value={current.Entidad.Desarrollo} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: e.Nombre }; }} link={"#/scv/desarrollos/:id"} size={[12, 6, 6, 6]} />
                    <Tags idExpediente={idExpediente} />
                </Row>;
            };
            if (current.TipoExpediente.Clave === "V") {
                expHeader = <Row key="rowHeader">
                    <label.Folio label={$page.form.section.expediente.form.folio} value={current.ID} size={[12, 1, 1, 1]} />
                    <label.Link label={$page.form.section.expediente.form.cliente} value={current.Cliente} formatValue={(e: any) => { return { ID: e.ID, Clave: e.Clave, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} size={[12, 5, 5, 5]} />
                    <label.Link label={"Desarrollo"} value={current.Desarrollo} link={"#/scv/desarrollos/:id"} size={[12, 5, 5, 5]} />
                    <label.Label label={$page.form.section.expediente.form.estatusExpediente}
                        value={current.EstatusExpediente.Nombre}
                        size={[12, 1, 1, 1]}
                        isHTML={true}
                        labelStyle={{ textAlign: "center" }}
                        valueStyle={{ backgroundColor: current.EstatusExpediente.BGColor, color: current.EstatusExpediente.Color, textAlign: "center", padding: "3px 0px", width: "100%", fontWeight: 600 }}
                        valueClass="badge" />
                    <Tags idExpediente={idExpediente} />
                </Row>;
            };
            //
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                {expHeader}
                <Row className="timeline-seguimiento" style={{ paddingBottom: 35 }}>
                    <Column>
                        <EKHorizontalTimeLine items={this.props.seguimientos} customScroll={true} onClickElementHorizontal={this.onClick} page={$page} tipoPresentacion={9} />
                    </Column>
                </Row>

            </Column>
        };
    });
    //****//

    interface IGeneralViewProps extends React.Props<any> {
        item: any;
        suspension: any;
    }

    let MotivoSuspensionView: any = global.connect(class extends React.Component<IGeneralViewProps, IGeneralViewProps>{
        constructor(props: IGeneralViewProps) {
            super(props);
            this.onSave = this.onSave.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onConfirm = this.onConfirm.bind(this);
        };
        static props: any = (state: any): any => ({
            suspension: state.seguimientosReducer.suspension
        });
        componentWillMount(): void {
            Forms.remove(PAGE_ID_SECTION_FORM_SEG_SUSPENSION);
        };
        componentWillReceiveProps(nextProps: IGeneralViewProps) {
            if (global.hasChanged(this.props.suspension, nextProps.suspension)) {
                let suspension: string = global.getData(nextProps.suspension);
                if (suspension === "S" || suspension === "A") {
                    Forms.updateFormElement(PAGE_ID_SECTION_FORM_SEG_SUSPENSION, "VigenciaEstatus", new Date());
                }
            }
        };
        componentDidMount(): void {
            if (global.isSuccessful(this.props.suspension)) {
                let suspension: string = global.getData(this.props.suspension);
                if (suspension === "S" || suspension === "A") {
                    page.pageScroll("div#sectionMotivos");
                }
            }
        };
        onSave(idFormControl: string): void {
            let item: EditForm = Forms.getForm(PAGE_ID_SECTION_FORM_SEG_SUSPENSION);

            let current: any = this.props.item;
            let model: any = item
                .addNumberConst("ID", current.ID)
                .addObject(idFormControl)
                .addObjectConst("Venta", current.Venta)
                .addDate("VigenciaEstatus")
                .addString("Justificacion")
                .toObject();

            let dispatchUrl: string = `SCV/Seguimientos/SaveSuspension/${getData(this.props.suspension)}`;

            dispatchAsyncPut("scv-seguimientos-guardar", dispatchUrl, model);
        };
        onCancel(): void {
            Forms.remove(PAGE_ID_SECTION_FORM_SEG_SUSPENSION);
            dispatchSuccessful("scv-seguimientos-suspension", "N");
        };
        onConfirm(): void {
            let $page: any = $ml[PAGE_ID];
            //
            if (!Forms.isValid(PAGE_ID_SECTION_FORM_SEG_SUSPENSION)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            }
            //
            let suspension: string = global.getData(this.props.suspension);
            if (suspension === "A") {
                try {
                    EK.Global.confirm($page.mensajes.reanudar.message, $page.mensajes.reanudar.title, () => {
                        this.onSave("MotivoReanudacion");
                    });
                } catch (e) { }
            }
            else if (suspension === "S") {
                try {
                    EK.Global.confirm($page.mensajes.suspender.message, $page.mensajes.suspender.title, () => {
                        this.onSave("MotivoSuspension");
                    });
                } catch (e) { }
            }
            else if (suspension === "C") {
                try {
                    EK.Global.confirm($page.mensajes.cancelar.message, $page.mensajes.cancelar.title, () => {
                        this.onSave("MotivoCancelacion");
                    });
                } catch (e) { }
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.item;
            let isSuspended: boolean = isEmptyObject(current.motivoSuspension);

            /* Variables validacion Cancelacion, Activacion, Suspension */
            let activarEdicion: boolean = false;
            let stateSuspension: string = getData(this.props.suspension);
            let estatusSeguimiento: string = current.EstatusSeguimiento.Clave;
            let titleMotivo: string = "";
            let iconos: any = {
                "A": "fa fa-play",
                "S": "fa fa-pause",
                "C": "fa fa-stop"
            };

            if (stateSuspension === "A" || stateSuspension === "S" || stateSuspension === "C") {
                activarEdicion = true;
            }

            if (activarEdicion) {
                if (stateSuspension === "A") {
                    titleMotivo = $page.form.section.motivo.reanudacion;
                }
                else if (stateSuspension === "S") {
                    titleMotivo = $page.form.section.motivo.suspension;
                }
                else if (stateSuspension === "C") {
                    titleMotivo = $page.form.section.motivo.cancelacion;
                }
            } else {
                if (estatusSeguimiento === "A") {
                    titleMotivo = $page.form.section.motivo.reanudacion;
                }
                else if (estatusSeguimiento === "S") {
                    titleMotivo = $page.form.section.motivo.suspension;
                }
                else if (estatusSeguimiento === "C") {
                    titleMotivo = $page.form.section.motivo.cancelacion;
                }
            }

            let fnValidate = function (v: any, values?: any): boolean {
                if (v) {
                    let date: Date = new Date(v);
                    date.setHours(0, 0, 0, 0);

                    let today: Date = new Date();
                    today.setHours(0, 0, 0, 0);

                    return date >= today;
                }
                return true;
            }

            return <div id="sectionMotivos">
                <page.OptionSection title={titleMotivo} icon={iconos[stateSuspension]} level={1}
                    editMode={activarEdicion} inverse={true} collapsed={false} hideCollapseButton={true}>
                    <SectionView>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <Row>
                                    <Label label={titleMotivo} value={current.MotivoSuspension.Nombre} size={[12, 12, 10, 10]} />
                                    <Label label={$page.form.section.motivo.vigenciaEstatus} value={current.VigenciaEstatus} size={[12, 12, 2, 2]} />
                                    <Label label={$page.form.section.motivo.justificacion} value={current.Justificacion} size={[12, 12, 12, 12]} />
                                </Row>
                            </Column>
                        </Row>
                    </SectionView>
                    <SectionButtons>
                        <Button className="btn-ico-ek white" iconOnly={true} color="white" icon="fa fa-check" onClick={this.onConfirm} />
                    </SectionButtons>
                    <SectionEdit
                        idForm={PAGE_ID_SECTION_FORM_SEG_SUSPENSION}
                        onSave={null}
                        onCancel={this.onCancel}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <Row>
                                    <input.Hidden id={"ID"} idFormSection={PAGE_ID_SECTION_FORM_SEG_SUSPENSION} value={current.ID} visible={false} />
                                    {stateSuspension === "S" ?
                                        <MotivosExpedienteDDL
                                            id={"MotivoSuspension"}
                                            idFormSection={PAGE_ID_SECTION_FORM_SEG_SUSPENSION}
                                            label={$page.form.section.motivo.suspension}
                                            required={true}
                                            size={[12, 12, 10, 10]}
                                            helpLabel={$page.form.section.motivo.helpLabel.motivo}
                                            value={current.MotivoSuspension} /> : null}
                                    {stateSuspension === "C" ?
                                        <MotivosExpedienteDDL
                                            id={"MotivoCancelacion"}
                                            idFormSection={PAGE_ID_SECTION_FORM_SEG_SUSPENSION}
                                            label={$page.form.section.motivo.cancelacion}
                                            required={true}
                                            size={[12, 12, 10, 10]}
                                            helpLabel={$page.form.section.motivo.helpLabel.motivo}
                                            value={current.MotivoCancelacion} /> : null}
                                    {stateSuspension === "A" ?
                                        <MotivosExpedienteDDL
                                            id={"MotivoReanudacion"}
                                            idFormSection={PAGE_ID_SECTION_FORM_SEG_SUSPENSION}
                                            label={$page.form.section.motivo.reanudacion}
                                            required={true}
                                            size={[12, 12, 10, 10]}
                                            helpLabel={$page.form.section.motivo.helpLabel.motivo}
                                            value={current.MotivoReanudacion} /> : null
                                    }
                                    {stateSuspension === "S" /*|| stateSuspension === "A"*/ ?
                                        <DatePicker
                                            id={"VigenciaEstatus"}
                                            idFormSection={PAGE_ID_SECTION_FORM_SEG_SUSPENSION}
                                            label={$page.form.section.motivo.vigenciaEstatus}
                                            size={[12, 12, 2, 2]}
                                            required={true}
                                            value={current.VigenciaEstatus}
                                            validations={[validations.custom("Fecha", "Mensaje de error", [], fnValidate)]}
                                            helpLabel={$page.form.section.motivo.helpLabel.vigenciaEstatus}
                                            maxLength={8} />
                                        : <label.Fecha id={"VigenciaEstatus"} label={$page.form.section.motivo.vigenciaEstatus} size={[12, 12, 2, 2]} />
                                    }
                                </Row>
                                <Row>
                                    {stateSuspension === "S" /*|| stateSuspension === "A"*/ ?
                                        <input.Text
                                            id={"Justificacion"}
                                            idFormSection={PAGE_ID_SECTION_FORM_SEG_SUSPENSION}
                                            label={$page.form.section.motivo.justificacion}
                                            size={[12, 12, 12, 12]}
                                            required={true}
                                            value={current.Justificacion}
                                            helpLabel={$page.form.section.motivo.helpLabel.justificacion}
                                            maxLength={255} />
                                        : <Label id={"Justificacion"} label={$page.form.section.motivo.justificacion} size={[12, 12, 12, 12]} />
                                    }
                                </Row>
                            </Column>
                        </Row>
                    </SectionEdit>
                </page.OptionSection>
            </div>
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

            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        {estatusSeguimiento === "S" || estatusSeguimiento === "C" || suspension === "A" || suspension === "S" || suspension === "C" ?
                            <MotivoSuspensionView
                                item={current}
                                suspension={this.props.suspension} /> : null}
                    </Column>
                </Row>
                <Row>
                    <Column size={[12, 12, 3, 3]}>
                        <SeguimientoEtapas />
                    </Column>
                    <Column size={[12, 12, 9, 9]}>
                        <PanelUpdate info={this.props.esquema}>
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
                                <Column size={[12, 12, 12, 12]}>
                                    <KontrolLogBookManager modulo={config.id} viewMode={false} addNewItem={"SO"}/>
                                </Column>
                            </Row>
                        </PanelUpdate>
                    </Column>
                </Row>
            </FadeInColumn>
        }
    });

    export interface ISeguimientoButtonProps extends EK.UX.Buttons.IButtonProps { seguimiento?: any; }

    /* Button Suspensión */
    let EscapeButton: any = global.connect(class extends React.Component<ISeguimientoButtonProps, {}> {
        constructor(props: ISeguimientoButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            seguimiento: state.seguimientosReducer.selected
        });
        static defaultProps: ISeguimientoButtonProps = {
            icon: "glyphicon glyphicon-pause",
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
            if (this.props.onClick) {
                this.props.onClick(this.props.info);
            }
        }
        shouldComponentUpdate(nextProps: ISeguimientoButtonProps, { }): boolean {
            return hasChanged(this.props.seguimiento, nextProps.seguimiento);
        }
        render(): JSX.Element {
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            if (isSuccessful(this.props.seguimiento)) {
                return <Button {...this.props} onClick={this.onClick} className={className} />;
            } else {
                return null;
            }
        }
    });

    /* Button Cancelar */
    let CancelarButton: any = global.connect(class extends React.Component<ISeguimientoButtonProps, {}> {
        constructor(props: ISeguimientoButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            seguimiento: state.seguimientosReducer.selected
        });
        static defaultProps: ISeguimientoButtonProps = {
            icon: "glyphicon glyphicon-stop",
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
            if (this.props.onClick) {
                this.props.onClick(this.props.info);
            }
        }
        shouldComponentUpdate(nextProps: ISeguimientoButtonProps, { }): boolean {
            return hasChanged(this.props.seguimiento, nextProps.seguimiento);
        }
        render(): JSX.Element {
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            if (isSuccessful(this.props.seguimiento)) {
                return <Button {...this.props} onClick={this.onClick} className={className} />;
            } else {
                return null;
            }
        };
    });

    /* Button Continuar */
    let ContinueButton: any = global.connect(class extends React.Component<ISeguimientoButtonProps, {}> {
        constructor(props: ISeguimientoButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            seguimiento: state.seguimientosReducer.selected
        });
        static defaultProps: ISeguimientoButtonProps = {
            icon: "glyphicon glyphicon-play",
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
            if (this.props.onClick) {
                this.props.onClick(this.props.info);
                page.pageScroll("div#sectionMotivos");
            }
        }
        shouldComponentUpdate(nextProps: ISeguimientoButtonProps, { }): boolean {
            return hasChanged(this.props.seguimiento, nextProps.seguimiento);
        }
        render(): JSX.Element {
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            if (isSuccessful(this.props.seguimiento)) {
                return <Button {...this.props} onClick={this.onClick} className={className} />;
            } else {
                return null;
            }
        };
    });

    let MotivosExpedienteDDL: any = global.connect(class extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
        constructor(props: EK.UX.DropDownLists.IDropDrownListProps) {
            super(props);
            this.getKeyCatalogo = this.getKeyCatalogo.bind(this);
            this.getItems = this.getItems.bind(this);
            this.getDispatchUrl = this.getDispatchUrl.bind(this);
        }
        static props: any = (state: any) => ({
            dataManager: new StateDataManager(state.seguimientosReducer)
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "Motivo",
            items: createDefaultStoreObject([]),
            label: "Motivo",
            helpLabel: "Selecciona un motivo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 6]
        };
        getKeyCatalogo(): string {
            return ["catalogo_", this.props.id].join("");
        }
        getItems(): any {
            let items: DataElement = this.props.dataManager.getById(this.getKeyCatalogo());

            if (!items) {
                items = createDefaultStoreObject([]);
            }

            return items;
        }
        getDispatchUrl(): any {
            let clave: string = this.props.id.toLocaleUpperCase();
            return `catalogos/get(${clave})`;
        }
        componentDidMount(): any {
            if (!isLoadingOrSuccessful(this.getItems())) {
                dispatchAsync("scv-seguimientos-motivos", this.getDispatchUrl(), this.getKeyCatalogo());
            }
        }
        render(): any {
            let items: any = this.getItems();
            return <DropdownList {...this.props} items={items} />;
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
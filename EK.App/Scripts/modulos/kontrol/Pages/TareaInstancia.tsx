namespace EK.Modules.Kontrol.Pages.Autorizaciones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("wmAutorizaciones", "kontrol");
    const a: any = 0;

    export let Vista: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);

            this.setCState = this.setCState.bind(this);
            this.isAnswered = this.isAnswered.bind(this);
            this.isAssigned = this.isAssigned.bind(this);
            this.onWillEntityLoad = this.onWillEntityLoad.bind(this);
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let id: number = getDataID(props.entidad);
            let retValue: any = {
                url: "workflowManager/task/approval",
                model: item
                    .addID()
                    .addString("Comentarios")
                    .addVersion()
                    .toObject()
            };

            return retValue;
        };
        onWillEntityLoad(id: number, props: page.IProps): any {
            props.config.dispatchEntityBase({ id }, "workflowManager/task/instance", null, HttpMethod.POST);
            global.requireGlobal(global.Catalogos.tareaEstatus);
        };
        onEntityLoaded(props: page.IProps): any {
            let entity: any = getData(props.entidad);

            Forms.updateFormElement(config.id, "ID", entity.ID);
            Forms.updateFormElement(config.id, "Version", entity.Version);
            Forms.updateFormElement(config.id, "Instancia", entity.Instancia);
        };
        isAssigned(props: page.IProps): boolean {
            let retValue: boolean = false;            
            if (global.isSuccessful(props.entidad)) {
                let entidad: any = global.getData(props.entidad);
                if (entidad.Estatus && entidad.Estatus.Clave === "AS") {
                    retValue = true;
                };
            };

            return retValue;
        };
        isAnswered(props: page.IProps): boolean {
            let retValue: boolean = false;
            if (global.isSuccessful(props.entidad)) {
                let entidad: any = global.getData(props.entidad);
                if (entidad.Estatus && (entidad.Estatus.Clave === "AP" || entidad.Estatus.Clave === "RE")) {
                    retValue = true;
                };
            };

            return retValue;
        };
        setCState(props: page.IProps): any {
            props.config.setState({ viewMode: !this.isAssigned(props) });
        };
        componentWillMount(): any {
        };
        componentDidMount(): any {
            this.setCState(this.props);
        };
        componentWillReceiveProps(nextProps: page.IProps) {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                this.setCState(nextProps);
            };
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let state: any = getData(this.props.state);
            let buttonStyle: React.CSSProperties = {
                padding: "5px 10px",
                marginRight: 10,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5
            };

            let pageButtons: any = null;

            //if (this.isAssigned(this.props)) {
            //    pageButtons = <PageButtons key="pageCustomButtons">
            //        <button onClick={this.onReject} className="btn btn-sm red-flamingo" href="javascript:void(0)" style={buttonStyle}>
            //            <i className="fa fa-close" style={{ fontSize: 16 }}></i>
            //            <div style={{ margin: "0px 2px", float: "right" }}>Rechazar</div>
            //        </button>
            //        <button onClick={this.onApprove} className="btn btn-sm green-jungle" href="javascript:void(0)" style={buttonStyle}>
            //            <i className="fa fa-check" style={{ fontSize: 16 }}></i>
            //            <div style={{ margin: "0px 2px", float: "right" }}>Aprobar</div>
            //        </button>
            //    </PageButtons>;
            //};

            return <page.Main {...config} pageMode={PageMode.Edicion}
                title={{ title: "Mensajes" }}
                readOnly={true}
                onWillEntityLoad={this.onWillEntityLoad}
                onEntityLoaded={this.onEntityLoaded}
                onEntitySaved={() => { }}>
                {pageButtons}
                <View />
                <Edit />
            </page.Main>;
        };
    });
    const View: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let entidad: DataElement;
            let link: string = "";
            let vigencia: string;
            let asignacion: string;
            let flujoEstatus: string;
            let tareaEstatus: string;

            if (this.props.config) {
                entidad = this.props.config.getEntity();
                if (global.isSuccessful(entidad)) {
                    let eData: any = global.getData(entidad);

                    link = eData.Instancia.LinkReferencia;
                    vigencia = global.formatDateTime(eData.FechaVigencia);
                    asignacion = global.formatDateTime(eData.FechaAsignacion);
                    flujoEstatus = eData.Instancia.Estatus.Nombre;
                    tareaEstatus = eData.Estatus.Nombre;
                };
            };
            return <page.View>
                <Row>
                    <Column size={[12, 12, 8, 8]}>
                        <page.OptionSection icon="fa fa-th" hideCollapseButton={true} collapsed={false}
                            title={(data: any) => {
                                if (global.isSuccessful(data)) {
                                    let item: any = global.getData(data);

                                    return !item ? "" : item.Instancia.Workflow.Tipo.Nombre + "<span class='badge badge-info'>" + item.Clave + "</span>";
                                }
                                return "";
                            }} >
                            <Row style={{ marginTop: -10 }}>
                                <Column style={{ marginBottom: 10, padding: "15px 10px", backgroundColor: "#fafafa" }}>
                                    <Row>
                                        <Column size={[6, 2, 2, 2]} className="bold">Flujo</Column>
                                        <Column size={[6, 4, 4, 4]} >{flujoEstatus}</Column>
                                        <Column size={[6, 2, 2, 2]} className="bold">Tarea</Column>
                                        <Column size={[6, 4, 4, 4]} >{tareaEstatus}</Column>
                                        <Column size={[6, 2, 2, 2]} className="bold">Asignación</Column>
                                        <Column size={[6, 4, 4, 4]}>{asignacion}</Column>
                                        <Column size={[6, 2, 2, 2]} className="bold">Vigencia</Column>
                                        <Column size={[6, 4, 4, 4]}>{vigencia}</Column>
                                    </Row>
                                </Column>
                                <Column>
                                    <label.Custom id="Referencia"
                                        isHTML={true}
                                        labelStyle={{ display: "none" }}
                                        valueClass=""
                                        size={[12, 12, 12, 12]} value={(e) => {
                                            return "<div>" + e.Instancia.DescripcionReferencia + "</div>";
                                        }} />
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;

            //return <page.View>
            //    <Row>
            //        <Column>
            //            <label.BadgeDefaultDate id="FechaAsignacion" size={[6, 3, 3, 3]} value={(e) => ["", e.FechaAsignacion]} />
            //            <label.EstatusVigencia size={[6, 3, 3, 3]} />
            //            <label.EstatusTarea id="EstatusTarea" size={[6, 3, 3, 3]} />
            //            <label.EstatusFlujo id="InstanciaEstatus" value={(e) => [e.Instancia.Estatus.Nombre, e.Instancia.FechaFin, e.Instancia.Estatus.Clave]} size={[6, 3, 3, 3]} />
            //        </Column>
            //    </Row>
            //    <Row>
            //        <label.Custom id="Nombre" size={[12, 6, 6, 6]} value={(item: any) => { return !item ? "" : "(" + item.Clave + ") " + item.Nombre; } } />
            //        <label.Custom id="InstanciaNombre" value={(e) => "(" + e.Instancia.Workflow.Tipo.Nombre + ") " + e.Instancia.Nombre} size={[12, 6, 6, 6]} />
            //        <label.Custom id="Referencia" isHTML={true} size={[12, 12, 6, 6]} value={(e) => {
            //            return "<div style='padding: 10px;'><a href='" + e.Instancia.LinkReferencia + "'>" + e.Instancia.LinkReferencia + "</a></div>" +
            //                "<pre>" + e.Instancia.DescripcionReferencia + "</pre>";
            //        } } />
            //        <label.HTML id="Comentarios" size={[12, 12, 6, 6]} />
            //    </Row>
            //</page.View>;
        };
    });
    interface IEditAuth extends page.Base {
        updateStatus: (claveStatus: string) => any;
    };
    export const Edit = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);

            this.onApprove = this.onApprove.bind(this);
            this.onReject = this.onReject.bind(this);
            this.updateStatus = this.updateStatus.bind(this);
        };
        updateStatus(claveStatus: string, comentarios: string): any {
            let estatus: any = global.getGlobal(Catalogos.tareaEstatus).get(claveStatus);
            let item: EditForm = Forms.getForm(this.props.id);
            let id: number = getDataID(this.props.entidad);
            let obj: any = item
                .addID()
                .addString("Comentarios", comentarios)
                .addObject("Instancia")
                .addVersion()
                .toObject();

            //Forms.updateFormElement(config.id, "Estatus", estatus);
            obj.Estatus = estatus;
            obj.IdEstatus = estatus.ID;

            this.props.config.dispatchEntityBase(obj, "workflowManager/task/approval", null, HttpMethod.PUT);
        };
        onApprove(info: any): any {
            this.updateStatus("AP", info);
        };
        onReject(info: any): any {
            this.updateStatus("RE", info);
        };
        render(): JSX.Element {
            let buttonStyle: React.CSSProperties = {
                padding: "30px 10px",
                borderRadius: "50% !important",
                width: 75,
                height: 75
            };

            let approveBtn: any = this.onApprove;
            let rejectBtn: any = this.onReject;

            let entidad: DataElement;
            let link: string = "";
            let vigencia: string;
            let asignacion: string;
            let flujoEstatus: string;

            if (this.props.config) {
                entidad = this.props.config.getEntity();
                if (global.isSuccessful(entidad)) {
                    let eData: any = global.getData(entidad);
                    link = eData.Instancia.LinkReferencia;
                    vigencia = global.formatDateTime(eData.FechaVigencia);
                    asignacion = global.formatDateTime(eData.FechaAsignacion);
                    flujoEstatus = eData.Instancia.Estatus.Nombre;
                };
            };

         //<button onClick={() => {
         // if (link !== "") {
         //       global.go(link);
          //   }
          // }} className="btn btn-sm grey-steel big-boxed-button" href="javascript:void(0)">
          // <div>Ver referencia</div>
          //</button>



            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 8, 8]}>
                        <page.OptionSection icon="fa fa-th" hideCollapseButton={true} collapsed={false}
                            title={(data: any) => {
                                if (global.isSuccessful(data)) {
                                    let item: any = global.getData(data);

                                    return !item ? "" : item.Instancia.Workflow.Tipo.Nombre + "<span class='badge badge-info'>" + item.Clave + "</span>";
                                }
                                return "";
                            } } >
                            <Row style={{ marginTop: -10 }}>
                                <Column style={{ marginBottom: 10, padding: "15px 10px", backgroundColor: "#fafafa" }}>
                                    <Row>
                                        <Column size={[12, 2, 2, 2]} className="bold">Vigencia</Column>
                                        <Column size={[12, 6, 6, 6]}>{asignacion} - {vigencia}</Column>
                                        <Column size={[6, 2, 2, 2]} className="bold">Flujo</Column>
                                        <Column size={[6, 2, 2, 2]} >{flujoEstatus}</Column>
                                    </Row>
                                </Column>
                                <Column>
                                    <label.Custom id="Referencia"
                                        isHTML={true}
                                        labelStyle={{ display: "none" }}
                                        valueClass=""
                                        size={[12, 12, 12, 12]} value={(e) => {
                                        return "<div>" + e.Instancia.DescripcionReferencia + "</div>";
                                        }} />
                                    <Column size={[12, 4, 4, 4]} style={{ textAlign: "center", marginBottom:"1%" }}>
                                        <button onClick={() => {
                                            var bb: any = window["bootbox"];
                                            bb.prompt({
                                                title: "Comentarios",
                                                value: "RECHAZADO",
                                                inputType: "textarea",
                                                className: "bootbox-buttons",
                                                buttons: {
                                                    confirm: {
                                                        label: "<h5><i class='fa fa-close' style='font-size: 24px'></i> Rechazar</h5>",
                                                        className: "btn btn-sm red-flamingo big-boxed-button"

                                                    },
                                                    cancel: { className: "button-hidden" }
                                                },
                                                callback: (result: any) => {
                                                    let comments: string = $.trim(result);
                                                    if (comments === "") {
                                                        return false;
                                                    };
                                                    rejectBtn(comments);
                                                }
                                            });
                                        }} className="btn btn-sm red-flamingo big-boxed-button" href="javascript:void(0)" style={{ width: 120 }}>
                                            <i className="fas fa-times" style={{ fontSize: 18 }}></i>
                                            <div> Rechazar</div>
                                        </button>
                                    </Column>
                                    <Column size={[12, 4, 4, 4]} style={{ textAlign: "center", marginBottom: "1%" }}>
                                        <a className="btn btn-sm grey-steel big-boxed-button" style={{ width: 120, padding: 5 }} href={link} target="_blank">
                                            <i className="fas fa-external-link-square-alt" style={{ fontSize: 18 }}></i><br />
                                            Ver Detalle
                                        </a>
                                    </Column>
                                    <Column size={[12, 4, 4, 4]} style={{ textAlign: "center", marginBottom: "1%"  }}>
                                        <button onClick={() => {
                                            var bb: any = window["bootbox"];
                                            bb.prompt({
                                                title: "<h5 class='bold'>Comentarios <span class='required-char'>*</span></h5>",
                                                value: "APROBADO",
                                                inputType: "textarea",
                                                className: "bootbox-buttons",
                                                buttons: {
                                                    confirm: {
                                                        label: "<h5><i class='fa fa-check' style='font-size: 24px'></i> Aprobar</h5>",
                                                        className: "btn btn-sm green-jungle big-boxed-button"
                                                    },
                                                    cancel: {
                                                        label: "Cancelar",
                                                        className: "button-hidden"
                                                    }
                                                },
                                                callback: (result: any) => {
                                                    let comments: string = $.trim(result);
                                                    if (comments === "") {
                                                        return false;
                                                    }; 
                                                    approveBtn(comments);
                                                }
                                            });
                                        }} className="btn btn-sm green-jungle big-boxed-button" href="javascript:void(0)" style={{width:120}}>
                                            <i className="fa fa-check" style={{ fontSize: 18 }}></i>
                                            <div>Aprobar</div>
                                        </button>
                                    </Column>
                                </Column>
                            </Row>
                    </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });
};
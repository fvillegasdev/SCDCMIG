namespace EK.Modules.Kontrol.Pages.SeguimientoCampaniaPublicidad {
    "use strict";

    let PAGE_ID = "campaniasPublicidad";
    let SECTION_A_ID = "Campaña de Publicidad";
    let LISTASMKT_ID = "ListaMarketing";
    let LISTASMKT_TITLE = "Listas de Marketing";
    let SEGUIMIENTO_ID = "Segumiento";
    let EVENTOS_ID = "Eventos";
    let ENLACES_ID = "Enlaces";

    const config: page.IPageConfig = global.createPageConfig("SeguimientoCampaniaPublicidad", "scv", [EVENTOS_ID, LISTASMKT_ID, EVENTOS_ID, ENLACES_ID]);

    let IdCampania = -1;
    let IdListasMkt = null;


    interface IPageEditProps extends page.IProps {
        item?: any;
        entidad?: any;
    };

    export const Edicion: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.enlaces = state.global.catalogo$Enlaces;
            return retValue;
        };

        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("MedioPublicidad")
                .addObject("EstadoCampania")
                .addObject("PropietarioC")
                .addDate("FechaInicial")
                .addDate("FechaFinal")
                .addVersion()
                .addObject("Moneda")
                .addString("CostoActual")
                .addString("CostoPresupuestado")
                .addString("IngresosEsperados")
                .addObject(LISTASMKT_ID)
                .toObject();
            return model;
        };

        onEntityLoaded(props: page.IProps): any {
            IdCampania = getDataID(props.entidad);
            let parametros: any = global.assign({ Idcampaniapublicidad: IdCampania });

            if (IdCampania <= 0 || IdCampania === undefined) {
                global.dispatchSuccessful("global-page-data", [], LISTASMKT_ID);
                global.dispatchSuccessful("global-page-data", [], EVENTOS_ID);
                global.dispatchSuccessful("global-page-data", [], ENLACES_ID);
            }
            else {
                props.config.dispatchCatalogoBase("base/scv/campaniasPublicidad/Get/GetListasMarketing/", parametros, LISTASMKT_ID);
                props.config.dispatchCatalogoBase("base/scv/SeguimientoCampaniaPublicidad/Get/GetEvents/", parametros, EVENTOS_ID);
                props.config.dispatchCatalogoBase("base/scv/SeguimientoCampaniaPublicidad/Get/GetLinks/", parametros, ENLACES_ID);
            };
        };
        
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                readOnly={true}>
                <View />
            </page.Main>;
        };
    });


    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                        <Column size={[12, 12, 12, 12]}>
                            <page.OptionSection
                                id={PAGE_ID}
                                subTitle={SECTION_A_ID}
                                icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <label.Clave size={[12, 12, 2, 2]} />
                                    <label.Nombre size={[12, 12, 4, 4]} />
                                    <label.Entidad id="EstadoCampania" size={[12, 12, 6, 6]} />
                                    <label.Entidad id="MedioPublicidad" size={[12, 12, 6, 6]} />
                                    <label.Usuarios id="PropietarioC" size={[12, 12, 6, 6]} />
                                </Row>
                                <Row style={{ paddingTop: 20 }}>
                                    <Column size={[12, 12, 12, 12]}>
                                        <ListasMarketing />
                                    </Column>
                                    <Column size={[12, 12, 12, 12]}>
                                        <Seguimiento />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </page.View>;
        };
    }

    interface ISegumiento extends IPageEditProps, grid.IColumn {
        listas?: DataElement;
        enlaces?: DataElement;
        eventos?: DataElement;
        entity?: DataElement;
        noEntidad?: any;
    }

    { /* Seguimiento */ }


    export const Seguimiento: any = global.connect(class extends React.Component<ISegumiento, ISegumiento> {
        constructor(props: ISegumiento) {
            super(props);
            this.onItemClick = this.onItemClick.bind(this);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            eventos: state.global.catalogo$Eventos,
            enlaces: state.global.catalogo$Enlaces,
            entidad: getData(state.global.currentEntity),
            entity: state.global.currentEntity
        });

        onItemClick(item: any) {
            console.log(item);
            let IdCampania = getDataID(this.props.entity);
            let Validate: boolean = false;

            if (!isLoadingOrSuccessful(item)) {
                if (item.Link != null) {
                    if (item.Link.Nombre != null && item.Link.Nombre != undefined && IdCampania > 0) {
                        let Enlace: string = item.Link.Nombre;
                        dispatchAsync("load::EVENTO", "base/scv/SeguimientoCampaniaPublicidad/Get/GetLinkDetail/" + global.encodeParameters({ Idcampaniapublicidad: IdCampania, Evento: Enlace, IdListasMkt: IdListasMkt }));
                        Validate = true;
                    }
                }
                if (item.Event != null) {
                    if ((item.Event.Nombre != null && item.Event.Nombre != undefined && IdCampania > 0) && (item.Event.Nombre != "Open Rate" && item.Event.Nombre != "Subscribers")){
                        let Enlace: string = item.Event.Nombre;
                        dispatchAsync("load::EVENTO", "base/scv/SeguimientoCampaniaPublicidad/Get/GetLinkDetail/" + global.encodeParameters({ Idcampaniapublicidad: IdCampania, Evento: Enlace, IdListasMkt: IdListasMkt }));
                        Validate = true;
                    }
                }
            };
            if (Validate) {
                //Abrimos el Modal
                let modalObject: any = $("#modalEventosDetalle");
                modalObject.modal();
            }
        }


        render(): JSX.Element {
            let validate: boolean = false;
            let OpenRate: any;

            return <page.OptionSection
                id={"Seguimiento"}
                subTitle={"Seguimiento"}
                icon="fas fa-chart-bar" collapsed={false} hideCollapseButton={true} level={1}>
                <Row style={{ paddingTop: 20 }}>
                    <page.SectionList
                    id={EVENTOS_ID}
                    parent={this.props.config.id}
                    title={EVENTOS_ID}
                    icon="fab fa-think-peaks" 
                    level={2}
                    size={[6, 6, 6, 6]}
                    subTitle={EVENTOS_ID}
                    collapsed={false} hideCollapseButton={true}
                    onItemClick={this.onItemClick}
                    items={createSuccessfulStoreObject([])} readonly={true}
                    addRemoveButton={false}
                    listMode={"literal"}
                    dragAndDrop={false}
                        listHeader={
                         <div key="listHeaderKey"> 
                         </div>
                        }                        
                        mapFormToEntity={(form: EditForm): any => {
                            return form
                                .addID()
                                .addVersion()
                                .addEstatus()
                                .toObject();
                        }}
                        formatter={(index: number, item: any) => {
                        let pa: any = item.Event.ValorRegistro;
                        return <Column size={[6, 6, 6, 6]} >
                            <Row className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ek-sombra" style={{ padding: "15px", marginBottom: "10px", marginTop: "0px", backgroundColor: "#fcfcfc" }}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div style={{ background: "#FF8000", width: "26px", height: "26px", marginLeft: "80px", marginRight: "80px", textAlign: "center", float: "none" }}>
                                        <span style={{ fontSize: "18px", color: "#FFFFFF" }}>{item.Event.Valor}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <span style={{ fontSize: "20px" }}>{item.Event.Nombre}</span>
                                </div>
                                <div>
                                    <div style={{ width: "100%", lineHeight: "1.42857", textAlign: "center" }}>
                                        <div style={{ float: "left", width: "100%", texAlign: "center", border: "0px solid #ff8f00", borderRight: "none", height: "20px" }}>
                                            <span style={{ display: "inline-block", fontSize: "16px" }}>{item.Event.ValorRegistro} %</span>
                                            <div className="progress" style={{ height: "6px", marginRight: "0px" }}>
                                                <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: pa + "%", fontSize: "8px", TextAlign: "right", background: "#58ACFA" }} ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Column>;
                        }}/>
                    <page.SectionList
                    id={ENLACES_ID}
                    parent={this.props.config.id}
                    title={ENLACES_ID}
                    icon="fas fa-link" 
                    level={2}
                    size={[6, 6, 6, 6]}
                    subTitle={ENLACES_ID}
                    collapsed={false} hideCollapseButton={true}
                    onItemClick={this.onItemClick}
                    items={createSuccessfulStoreObject([])} readonly={true}
                    addRemoveButton={false}
                    listMode={"literal"}
                    dragAndDrop={false}
                    aggregate={(item: any, values: any) => {
                        if (!values.Total) values.Total = 0;
                        values.Total = item.Link.ValorRegistro ? item.Link.ValorRegistro : 0;
                        return values;
                    }}
                    listFooter={(values: any) => {
                        return <div>
                            <Row>
                                <Column size={[8, 9, 10, 9]} style={{ fontSize: "20px", textAlign: "right" }}>{"Total Clics"}</Column>
                                <Column size={[4, 3, 2, 2]} style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: "20px", color: "#FF8000" }} className="">
                                        {values.Total}
                                    </span>
                                </Column>
                            </Row>
                        </div>;
                    }}
                    listHeader={
                        <div key="listHeaderKey">
                        </div>}
                        mapFormToEntity={(form: EditForm): any => {
                            return form
                                .addID()
                                .addVersion()
                                .addEstatus()
                                .toObject();
                        }}
                        formatter={(index: number, item: any) => {
                            let pa: any = item.Link.ValorRegistro;
                            let por: any = ((item.Link.Valor / pa) * 100);
                            return <Column size={[6, 6, 6, 6]}>
                                <Row className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ek-sombra" style={{ padding: "15px", marginBottom: "10px", marginTop: "0px", backgroundColor: "#fcfcfc" }}>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div style={{ background: "#FF8000", width: "26px", height: "26px", marginLeft: "80px", marginRight: "80px", textAlign: "center", float: "none" }}>
                                            <span  style={{ fontSize: "18px", color: "#FFFFFF" }}>{item.Link.Valor}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <span style={{ fontSize: "20px" }}>{item.Link.Nombre}</span>
                                    </div>
                                    <div>
                                        <div style={{ width: "100%", lineHeight: "1.42857", textAlign: "center" }}>
                                            <div style={{ float: "left", width: "100%", texAlign: "center", border: "0px solid #ff8f00", borderRight: "none", height: "20px" }}>
                                                <span style={{ display: "inline-block", fontSize: "16px" }}>{EK.UX.Labels.formatDecimal(por)} %</span>
                                                <div className="progress" style={{ height: "6px", marginRight: "0px" }}>
                                                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: por + "%", fontSize: "8px", TextAlign: "right", background: "#58ACFA" }} ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                        </Column>;
                                        }}
                        />
                                <Row>
                                    <modal.Modal id="modalEventosDetalle" header={"Evento"} addDefaultCloseFooter={false}>
                                        <SeguimientoCampaniaEventosDetalleList />
                                    </modal.Modal>
                                </Row>                        
                </Row>
            </page.OptionSection>
        };
    });


    interface IView extends page.IProps {
        item: DataElement;
        entidad?: DataElement;
        listas?: DataElement;
    }

    { /* Listas de Marketing */ }
    export const ListasMarketing: any = global.connect(class extends React.Component<IView, IView> {
        constructor(props: IView) {
            super(props);
            this.onItemClick = this.onItemClick.bind(this);
            this.onClicVerTodo = this.onClicVerTodo.bind(this);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            listas: state.global.catalogo$ListaMarketing,
            entidad: state.global.currentEntity
        });

        onItemClick(item: any) {
            IdListasMkt = item.IdListasMkt;
            IdCampania = getDataID(this.props.entidad);
            let parametros: any = global.assign({ Idcampaniapublicidad: IdCampania, IdListasMkt: IdListasMkt});

            if (IdCampania <= 0 || IdCampania === undefined) {
                global.dispatchSuccessful("global-page-data", [], LISTASMKT_ID);
            }
            else {
                config.dispatchCatalogoBase("base/scv/SeguimientoCampaniaPublicidad/Get/GetEvents/", parametros, EVENTOS_ID);
                config.dispatchCatalogoBase("base/scv/SeguimientoCampaniaPublicidad/Get/GetLinks/", parametros, ENLACES_ID);
            };
        }

        onClicVerTodo(props: page.IProps): any {
            IdCampania = getDataID(this.props.entidad);
            IdListasMkt = null;
            let parametros: any = global.assign({ Idcampaniapublicidad: IdCampania });

            if (IdCampania <= 0 || IdCampania === undefined) {
                global.dispatchSuccessful("global-page-data", [], LISTASMKT_ID);
            }
            else {
                config.dispatchCatalogoBase("base/scv/campaniasPublicidad/Get/GetListasMarketing/", parametros, LISTASMKT_ID);
                config.dispatchCatalogoBase("base/scv/SeguimientoCampaniaPublicidad/Get/GetEvents/", parametros, EVENTOS_ID);
                config.dispatchCatalogoBase("base/scv/SeguimientoCampaniaPublicidad/Get/GetLinks/", parametros, ENLACES_ID);
            };
        };


        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <Column style={{ paddingLeft: 0, marginLeft: 0, paddingRight: 0, marginRight:0 }}>
                    <page.SectionList
                id={LISTASMKT_ID}
                parent={this.props.config.id}
                title={LISTASMKT_TITLE}
                icon="fas fa-th-list"
                level={1}
                style={{ paddingTop: 20, paddingLeft: 0, marginLeft: 0, paddingRight: 0, marginRight: 0 }}
                size={[12, 12, 12, 12]}
                subTitle={LISTASMKT_TITLE}
                collapsed={false} hideCollapseButton={true}
                onItemClick={this.onItemClick}
                viewButtons={
                        <buttons.Button
                            icon="fas fa-sync-alt"
                            color="white"
                            iconOnly={true}
                            className="btn-ico-ek"
                            info={null} onClick={this.onClicVerTodo} />
                }
                        listHeader={
                            <div key="listHeaderKey">
                            <Row>
                                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Clave"}</Column>
                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Alcance"}</Column>
                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Frecuencia"}</Column>
                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Estado"}</Column>
                                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ejecución"}</Column>
                                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                                </Row>
                        </div>
                    }                        
                        items={createSuccessfulStoreObject([])} readonly={true}
                        addRemoveButton={false}
                        mapFormToEntity={(form: EditForm): any => {
                            return form
                                .addID()
                                .addVersion()
                                .addEstatus()
                                .toObject();
                        }}
                        formatter={(index: number, item: any) => {
                        var clase = "";
                        var claseA = "";
                        var claseC = "";
                        var claseI = "";
                        var estadoA = "";
                        var estadoC = "";
                        var estadoI = "";
                        var estado = "";
                        var ejecutado = "";
                        if (item.EstadoListaMkt != undefined) {
                            claseA = item.EstadoListaMkt.Clave == "A" ? "badge badge-primary" : "";
                            claseC = item.EstadoListaMkt.Clave == "C" ? "badge badge-Secondary" : "";
                            claseI = item.EstadoListaMkt.Clave == "I" ? "badge badge-success" : "";
                            estadoA = item.EstadoListaMkt.Clave == "A" ? "ACTIVO" : "";
                            estadoC = item.EstadoListaMkt.Clave == "C" ? "COMPLETADO" : "";
                            estadoI = item.EstadoListaMkt.Clave == "I" ? "EN PROGRESO" : "";
                        }
                        if (claseA != "") { clase = claseA; estado = estadoA; }
                        else if (claseI != "") { clase = claseI; estado = estadoI; }
                        else { clase = claseC; estado = estadoC; }
                        if (item.Ejecutado != undefined && item.Ejecutado != null) {
                            ejecutado = (item.Ejecutado != 0)  ? "Ejecutado" : "No Ejecutado"
                        }
                            return <Row>
                                <Column>
                                    <Row>
                                        <Column size={[1, 1, 1, 1]}><span>&nbsp;</span></Column>
                                        <Column size={[1, 1, 1, 1]}><span className="badge badge-info"> {item.ListasMkt.Clave}  </span></Column>
                                        <Column size={[2, 2, 2, 2]}><span> {item.ListasMkt.Nombre} </span></Column>
                                        <Column size={[1, 1, 1, 1]}><span> {item.ListasMkt.Alcance}</span></Column>
                                        <Column size={[2, 2, 2, 2]}><span> {item.FrecuenciaCampania.Nombre}</span></Column>
                                        <Column size={[2, 2, 2, 2]}><span className={clase}>{estado}</span></Column>
                                        <Column size={[2, 2, 2, 2]}><span className={"badge badge-info"}>{ejecutado}</span></Column>
                                        <Column size={[1, 1, 1, 1]}><span>&nbsp;</span></Column>
                                    </Row>
                                </Column>
                            </Row>;
                        }}
                        aggregate={(item: any, values: any) => {
                            if (!values.Alcance) values.Alcance = 0;
                            values.Alcance += item.ListasMkt.Alcance ? item.ListasMkt.Alcance : 0;
                            return values;
                        }}
                    />
            </Column>
        };
    });
}
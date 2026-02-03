namespace EK.Modules.Kontrol.Pages.Eventos {
    "use strict";
    let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("eventos", "kontrol"),
        icon: "fas fa-calendar-week",
        url: "#/kontrol/eventos",
        propForm: "Evento",
        ddlTargetUrl: global.encodeAllURL("kontrol", "eventos", { activos: 1 })
    }, true, true);

    interface IEdicion extends React.Props<any> {
        expediente: DataElement;
        cliente: DataElement;
    };

    export const Edicion: any = global.connect(class extends React.Component<IEdicion, IEdicion> {
        static props: any = (state: any) => ({
            expediente: state.global.currentEntity$expediente,
            cliente: state.global.currentEntity$cliente
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("TipoEvento")
                .addObject("Entidad")
                .addString("Descripcion")
                .addDate("FechaInicio")
                .addDate("FechaFin")
                .addString("Geolocalizacion")
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let entidad: any = global.getData(props.entidad);

            if (entidad) {
                if (entidad.IdExpedienteREF) {
                    let actionUrl: string = "base/scv/expedientes/id/";
                    dispatchAsyncPost("global-current-entity", actionUrl, { id: entidad.IdExpedienteREF }, "expediente");
                    //
                    Forms.updateFormElement(defaultProps.config.id, "fromREFE", true);
                }
                else if (entidad.IdClienteREF) {
                    let actionUrl: string = "base/scv/ScvClientes/id/";
                    dispatchAsyncPost("global-current-entity", actionUrl, { id: entidad.IdClienteREF }, "cliente");
                    //
                    Forms.updateFormElement(defaultProps.config.id, "fromREFC", true);
                };
            };
        };
        componentWillReceiveProps(nextProps: IEdicion, nextState: IEdicion): any {
            if (global.hasChanged(this.props.expediente, nextProps.expediente)) {
                if (global.isSuccessful(nextProps.expediente)) {
                    let expediente: any = global.getData(nextProps.expediente);
                    //
                    Forms.updateFormElement(defaultProps.config.id, "Expediente", expediente);
                    Forms.updateFormElement(defaultProps.config.id, "Cliente", expediente.Cliente);
                };
            };
            if (global.hasChanged(this.props.cliente, nextProps.cliente)) {
                if (global.isSuccessful(nextProps.cliente)) {
                    Forms.updateFormElement(defaultProps.config.id, "Cliente", global.getData(nextProps.cliente));
                    //
                    let url: string = global.encodeAllURL("scv", "Expedientes", { IdCliente: global.getDataID(nextProps.cliente), OperacionEspecificaSP: "DashBoard" });
                    dispatchAsync("load::EXPEDIENTECLIENTE", url);
                };
            };
        };
        render(): JSX.Element {
            return <page.Main {...defaultProps.config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    interface ICitasView extends page.IProps {
        Cliente?: any;
    };
    let Edit: any = page.connect(class extends page.Base {
        constructor(props: ICitasView) {
            super(props);
            this.onChangeCliente = this.onChangeCliente.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onChangeCliente(e: any): any {
            if (!e) {
                global.dispatchSuccessful("load::EXPEDIENTECLIENTE", []);
            }
            else {
                let url: string = global.encodeAllURL("scv", "Expedientes", { IdCliente: e.ID, OperacionEspecificaSP: "DashBoard" });
                dispatchAsync("load::EXPEDIENTECLIENTE", url);
            }
        };
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={defaultProps.config.id}
                        subTitle={defaultProps.config.id}
                        icon={defaultProps.icon} collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <select.Usuarios id="AsignadoA" size={[12, 4, 4, 4]} />
                            <Input id="Descripcion" size={[12, 6, 6, 6]} validations={[validations.required()]} maxLength={250} />
                            <checkBox.CheckBox id={"Asistio"} label={"Asistio"} size={[12, 2, 2, 2]} />

                            <DatePicker id={"FechaInicio"} type="datetime" size={[12, 2, 2, 2]} validations={[validations.required()]} />
                            <DatePicker id={"FechaFin"} type="datetime" size={[12, 2, 2, 2]} validations={[validations.required(), validations.greaterThan("FechaInicio", "")]} />
                            <TipoCitasDDL id="TipoCitas" size={[6, 4, 4, 4]} validations={[validations.required()]} addNewItem={"SO"} />

                            <select.Asentamientos id="Localidad" size={[6, 4, 4, 4]} />
                            {Forms.getValue("fromREFE", defaultProps.config.id) === true || Forms.getValue("fromREFC", defaultProps.config.id) === true
                                ? <label.Entidad id="Cliente" size={[12, 5, 5, 5]} />
                                : <select.SCVClientes id="Cliente" change={this.onChangeCliente} size={[12, 5, 5, 5]} />}
                            {Forms.getValue("fromREFE", defaultProps.config.id) === true
                                ? <label.Expediente id="Expediente" size={[12, 4, 4, 4]} />
                                : <ddl.ExpedienteClienteDDL id={"Expediente"} size={[12, 4, 4, 4]} />}
                            <label.Label id="Geolocalizacion" size={[12, 3, 3, 3]} />
                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                <MapView />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={defaultProps.config.id}
                        subTitle={defaultProps.config.id}
                        icon={defaultProps.icon} collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.General id={"TipoCitas"} size={[12, 2, 2, 2]} />
                            <label.FechaHora id="FechaInicio" size={[12, 2, 2, 2]} />
                            <label.FechaHora id="FechaFin" size={[12, 2, 2, 2]} />
                            <label.Label id="Geolocalizacion" size={[12, 4, 4, 4]} />
                            <label.Boolean id="Asistio" size={[12, 2, 2, 2]} />

                            <label.Entidad id={"Cliente"} size={[12, 4, 4, 4]} />
                            <label.Expediente id={"Expediente"} size={[12, 4, 4, 4]} />
                            <label.Localidad size={[12, 4, 4, 4]} />
                            <Label id="Descripcion" size={[12, 9, 9, 9]} />
                            <label.Usuarios id="AsignadoA" size={[12, 3, 3, 3]} />

                        </Row>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 20 }}>
                                <MapView />
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    };
    interface IMapViewProps extends React.Props<any> {
        entidad: DataElement;
        state?: DataElement;
        asentamiento: any;
        geolocalizacion: string;
    };
    interface IMapViewState {
        useLocation: boolean;
    };
    const MapView: any = global.connect(class extends React.Component<IMapViewProps, IMapViewState> {
        constructor(props: IMapViewProps) {
            super(props);

            this.state = { useLocation: false };
        };
        static props: any = (state: any) => {
            return {
                entidad: state.global.currentEntity,
                state: state.global.currentEntityState,
                asentamiento: Forms.getValue("Localidad", defaultProps.config.id, state),
                geolocalizacion: Forms.getValue("Geolocalizacion", defaultProps.config.id, state)
            };
        };
        componentDidMount(): any {
            window["onMapLocationChanged"] = (p: any): any => {
                Forms.updateFormElement(defaultProps.config.id, "Geolocalizacion", p);
            };
        };
        shouldComponentUpdate(nextProps: IMapViewProps, nextState: IMapViewProps): any {
            if (!(this.props.geolocalizacion) && this.props.geolocalizacion !== nextProps.geolocalizacion) {
                return true;
            };
            if (global.hasChanged(this.props.asentamiento, nextProps.asentamiento)) {
                return true;
            };
            return false;
        }
        componentWillReceiveProps(nextProps: IMapViewProps): void {
            if (global.hasChanged(this.props.asentamiento, nextProps.asentamiento)) {
                Forms.updateFormElement(defaultProps.config.id, "Geolocalizacion", null);

                this.setState({ useLocation: true })
            };
        };
        render(): JSX.Element {
            let mapLocation: string = "";
            if (page.canViewReadMode(this.props.state)) {
                if (global.isSuccessful(this.props.entidad)) {
                    let cita: any = global.getData(this.props.entidad);
                    if (cita.Geolocalizacion) {
                        mapLocation = mapLocation = "/kontrol/map/location?location=" + global.encodeString(cita.Geolocalizacion);
                    } else {
                        if (cita && cita.Localidad) {
                            let asentamiento: any = cita.Localidad;
                            mapLocation = "/kontrol/map/address?address=" + global.encodeString([asentamiento.Nombre, ", ", asentamiento.Localidad.Nombre, ", ", asentamiento.CP].join(""));
                        };
                    };
                };
            }
            else {
                if (this.state.useLocation === false && this.props.geolocalizacion) {
                    mapLocation = mapLocation = "/kontrol/map/location?location=" + global.encodeString(this.props.geolocalizacion);
                }
                else {
                    if (this.props.asentamiento) {
                        let asentamiento: any = this.props.asentamiento;
                        mapLocation = "/kontrol/map/address?address=" + global.encodeString([asentamiento.Nombre, ", ", asentamiento.Localidad.Nombre, ", ", asentamiento.CP].join(""));
                    }
                    else {
                        mapLocation = "/kontrol/map/address/";
                    };
                };
            };

            return <page.OptionSection
                id="Mapa"
                icon="fa fa-map-pin" level={1} collapsed={false} hideCollapseButton={false}>
                <iframe
                    style={{ border: 0, width: "100%", height: 350 }}
                    src={mapLocation} />
            </page.OptionSection>;
        }
    });
};
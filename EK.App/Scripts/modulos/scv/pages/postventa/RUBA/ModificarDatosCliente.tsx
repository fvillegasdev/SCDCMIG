// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.RUBA.ModificarDatosCliente {
    "use strict";
    const PAGE_ID: string = "ModificarDatosCliente";
    const PAGE_UBICACION_ID: string = "datosCliente$ubicacion";
    const PAGE_CLIENTE_INFO_ID: string = "datosCliente$info";
    const CLIENTE_CONTACTO_ID: string = "datosCliente$contacto";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_UBICACION_ID, PAGE_CLIENTE_INFO_ID]);

    export const Edicion: any = global.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let contactos: any = Forms.getValue(CLIENTE_CONTACTO_ID, PAGE_ID).data

            item = Forms.getForm(PAGE_CLIENTE_INFO_ID);
            let model: any = item
                .addID()
                .addNumber("IdEntity")
                .addNumber("IdUbicacion")
                .addString("TelefonoCasa")
                .addString("TelefonoOtros")
                .addString("CorreoElectronico")
                .addEstatus()
                .addVersion()
                .toObject();
            model.ClienteTelefonoContactos = contactos;
            //console.log(model)
            return { model, url: "base/scv/ClientesSPV/Get/UpdateContacto" };
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void { };
        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setState({ viewMode: false });
            props.config.setEntity({});
            props.config.setEntity({}, PAGE_UBICACION_ID);
            props.config.setEntity({}, PAGE_CLIENTE_INFO_ID);
            props.config.setCatalogo([], CLIENTE_CONTACTO_ID);
            Forms.remove(PAGE_CLIENTE_INFO_ID);
        };
        onEntitySaved(props: page.IProps): void {
            this.onWillEntityLoad(null, props);
        };
        render(): JSX.Element {
            let allowSave: boolean = false;

            let cliente: any = Forms.getValue("Cliente", config.id);
            if (cliente) {
                if (cliente.ID > 0) {
                    allowSave = true;
                };
            };

            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowSave={allowSave}
                allowDelete={false}
                onSave={this.saveForm}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onFilter={this.onFilter.bind(this)}>
                <Edit />
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
        obtenerUbicacion?: (idUbicacion: number) => void;
        obtenerCliente?: (id: number) => void;
        obtenerTelefonos?: (id: number) => void;
        clienteRef?: global.DataElement;
        ubicacion?: global.DataElement;
        clienteInfo?: global.DataElement;
        telefonosCliente?: global.Catalogos;
    };

    const Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            retValue.ubicacion = state.global.entity$datosCliente$ubicacion;
            retValue.clienteInfo = state.global.entity$datosCliente$info;
            retValue.telefonosCliente = state.global.catalogo$datosCliente$contacto;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerUbicacion: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, PAGE_UBICACION_ID);
            },
            obtenerCliente: (id: number): void => {
                global.dispatchAsyncPost("global-page-entity", "base/scv/ClientesSPV/id", { id }, PAGE_CLIENTE_INFO_ID);
            },
            obtenerTelefonos: (id: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente: id });
                global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetOnlycontactosAdicionalesCliente/" + encodedFilters, CLIENTE_CONTACTO_ID);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            //console.log(this.props.clienteRef);
            if (hasChanged(this.props.clienteRef, nextProps.clienteRef) && global.isSuccessful(nextProps.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) !== global.getDataID(nextProps.clienteRef)) {
                    let cliente: any = global.getData(nextProps.clienteRef);
                    this.props.obtenerUbicacion(cliente.IdUbicacion);
                    this.props.obtenerCliente(cliente.ID);
                    this.props.obtenerTelefonos(cliente.ID);
                };
            };

            if (hasChanged(this.props.clienteInfo, nextProps.clienteInfo)) {
                if (global.isSuccessful(nextProps.clienteInfo)) {
                    let elements: any = global.getData(nextProps.clienteInfo);
                    Forms.updateFormElements(PAGE_CLIENTE_INFO_ID, elements);
                    //console.log(elements);
                };
            };
        };
        shouldComponentUpdate(nextProps: IEditProps, {}): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.clienteRef, nextProps.clienteRef) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                hasChanged(this.props.clienteInfo, nextProps.clienteInfo) ||
                hasChanged(this.props.telefonosCliente, nextProps.telefonosCliente);
        };
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle="Modificar Datos del Cliente"
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <select.ClientesLotesSPV size={[12, 12, 12, 12]} required={true} validations={[validations.required()]} />
                            <Column size={[6, 6, 6, 6]} style={{ marginTop: 12 }}><UbicacionCliente data={this.props.ubicacion} /></Column>
                            <Column size={[6, 6, 6, 6]} style={{ marginTop: 12 }}><ClienteInformacion /></Column>
                            <Column size={[12, 12, 12, 12]} style={{ marginTop: 12 }}>
                                {/*<ViewSPVClienteContactos size={[12, 12, 12, 12]} />*/}
                                <EditSPVClienteContactos size={[12, 12, 12, 12]} />
                            </Column>
                           
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    const listHeaderContacto: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Contacto"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Tipo"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Titular"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>

    interface ISPVClienteContactosProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    class ViewSPVClienteContactos extends React.Component<ISPVClienteContactosProps, {}>{
        render(): JSX.Element {
            let displayTelefono: boolean = false;
            let displayCorreo: boolean = false;

            let tipoContacto: any = Forms.getValue("TipoContacto", CLIENTE_CONTACTO_ID);
            if (tipoContacto) {
                if (tipoContacto.Clave === "TELEFONO") {
                    displayTelefono = true;
                }
                else if (tipoContacto.Clave === "CORREO") {
                    displayCorreo = true;
                }
            };
           

            return <page.SectionList
                id={CLIENTE_CONTACTO_ID}
                parent={config.id}
                title={"Contactos del cliente en reporte de fallas"}
                level={1}
                listHeader={listHeaderContacto}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-mobile-alt"
                hideNewButton={false}
                //onAddNew={() => {
                    //console.log('agregar nuevo')
                //}}
                size={this.props.size}
                style={this.props.style}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                            {item.TipoContacto.Clave === "TELEFONO" ? item.Extension ? [item.Contacto, " ext. ", item.Extension].join("") : item.Contacto : null}
                            {item.TipoContacto.Clave === "CORREO" ? item.Contacto : null}
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-item">
                            <span className="badge badge-info">{item.TipoContacto.Clave}</span>&nbsp;
                            {item.TipoContacto.Clave === "TELEFONO" ? <span className="badge badge-success">{item.TipoTelefono.Nombre}</span> : null}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-item">{EK.UX.Labels.yes(item.Titular)}</Column>
                        <Column size={[1, 1, 1, 1]}></Column>
                    </Row>
                }}>
            </page.SectionList>
        };
    };

    const EditSPVClienteContactos: any = global.connect(class extends React.Component<ISPVClienteContactosProps, {}>{
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let displayTelefono: boolean = false;
            let displayCorreo: boolean = false;

            let tipoContacto: any = Forms.getValue("TipoContacto", CLIENTE_CONTACTO_ID);
            if (tipoContacto) {
                if (tipoContacto.Clave === "TELEFONO") {
                    displayTelefono = true;
                }
                else if (tipoContacto.Clave === "CORREO") {
                    displayCorreo = true;
                }
            };
            //console.log(tipoContacto)
            return <div id="reporteContacto"><page.SectionList
                id={CLIENTE_CONTACTO_ID}
                parent={config.id}
                title={"Contactos del cliente"}
                level={1}
                listHeader={listHeaderContacto}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-mobile-alt"
                size={this.props.size}
                mapFormToEntity={(form: EditForm, items?: any[]): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("TipoContacto")
                        .addObject("TipoTelefono")
                        .addBoolean("Titular")
                        .addString("Contacto")
                        .addString("Extension")
                        .addVersion()
                        .toObject();

                    if (retValue.TipoContacto.Clave === "CORREO") {
                        retValue.TipoTelefono = null;
                        retValue.IdTipoTelefono = null;
                        retValue.Extension = null;
                    }

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[4, 4, 4, 4]} className="listItem-default-item">
                            {item.TipoContacto.Clave === "TELEFONO" ? item.Extension ? [item.Contacto, " ext. ", item.Extension].join("") : item.Contacto : null}
                            {item.TipoContacto.Clave === "CORREO" ? item.Contacto : null}
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-item">
                            <span className="badge badge-info">{item.TipoContacto.Clave}</span>&nbsp;
                            {item.TipoContacto.Clave === "TELEFONO" ? <span className="badge badge-success">{item.TipoTelefono.Nombre}</span> : null}
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-center-item">{EK.UX.Labels.yes(item.Titular)}</Column>
                        <buttons.PopOver2 idParent={config.id} idForm={CLIENTE_CONTACTO_ID} info={item} extraData={[buttons.PopOver2.edit]} />
                    </Row>
                }}>
                <Row>
                    <ddl.TiposContactoDDL id="TipoContacto" idFormSection={CLIENTE_CONTACTO_ID} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                    {displayTelefono === true ? <ddl.TiposTelefonoDLL id="TipoTelefono" idFormSection={CLIENTE_CONTACTO_ID} validations={[validations.required()]} size={[12, 12, 12, 12]} /> : null}
                    {displayCorreo === true ? <input.Email id="Contacto" label="Correo" idFormSection={CLIENTE_CONTACTO_ID} size={[12, 12, 8, 8]} validations={[validations.required()]} /> : null}
                    {displayTelefono === true ? <input.Telefono id="Contacto" label="Teléfono" idFormSection={CLIENTE_CONTACTO_ID} size={[12, 12, 8, 8]} validations={[validations.required()]} /> : null}
                    {displayTelefono === true ? <input.Text id="Extension" label="extension" idFormSection={CLIENTE_CONTACTO_ID} size={[12, 12, 4, 4]} /> : null}
                    <checkBox.CheckBox id="Titular" label="Titular" idFormSection={CLIENTE_CONTACTO_ID} size={[12, 12, 3, 3]} />
                </Row>
            </page.SectionList>
            </div>
        };
    });

    interface IUbicacionClienteProps extends page.IProps {
        data?: global.DataElement;
    };

    const UbicacionCliente: any = global.connect(class extends React.Component<IUbicacionClienteProps, any>{
        render(): JSX.Element {
            let info: any = global.getData(this.props.data);
            console.log(info);
            let plazaValue: any = (item: any) => {
                return !item ? "" : !item.Nombre ? "" : item.Nombre;
            };

            return <page.OptionSection
                id={PAGE_UBICACION_ID}
                parent={config.id}
                subTitle={<span style={{ marginLeft: 5 }}>
                    <span className="badge badge-info bold">{info.ClaveFormato}</span>
                </span>}
                level={1}
                icon="fa fa-home" collapsed={false} hideCollapseButton={true}>
                <Row>
                    <label.Label id="Calle" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Desarrollo" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} value={() => {
                        return !info || !info.Desarrollo ? "" : (!info.DesarrolloClave ? "" : "<span class='badge badge-info'>" + info.DesarrolloClave + "</span> ") + (!info.Desarrollo.Nombre ? "" : info.Desarrollo.Nombre);
                    } } />
                    <label.Entidad id="Plaza" idForm={PAGE_UBICACION_ID} value={plazaValue} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Segmento" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Entidad id="Prototipo" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                    <label.Fecha id="FechaEntregaCalidad" idForm={PAGE_UBICACION_ID} size={[12, 12, 12, 12]} />
                </Row>
            </page.OptionSection>
        };
    });

    const ClienteInformacion: any = global.connect(class extends page.Base {
        render(): JSX.Element {
            return <page.OptionSection
                id={PAGE_CLIENTE_INFO_ID}
                parent={config.id}
                level={1}
                icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                <Row>
                    <label.Label id="Nombre" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <label.Fecha id="FechaNacimiento" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <label.RFC id="RFC" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="Direccion" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="Ciudad" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <label.Label id="EntidadFederal" idForm={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <input.Email id="CorreoElectronico" idFormSection={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} validations={[validations.email("El correo electrónico no es válido")]} />
                    <input.Telefono id="TelefonoCasa" idFormSection={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                    <input.Telefono id="TelefonoOtros" idFormSection={PAGE_CLIENTE_INFO_ID} size={[12, 12, 12, 12]} />
                </Row>
            </page.OptionSection>
        };
    });
};
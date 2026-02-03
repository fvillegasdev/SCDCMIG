namespace EK.Modules.Kontrol.Pages.Notificaciones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("notificaciones", "kontrol");
    export const Vista = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
            this.saveForm = this.saveForm.bind(this);
            this.onEntityLoaded = this.onEntityLoaded.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = page.props(state);
            return retValue;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let entidad: any = getData(props.entidad);
            let url: string = entidad.Externo ? "base/kontrol/SCVNotificacion/save" : "notificaciones/enviar";
            let id: number = getDataID(props.entidad);
            //console.log(id);
            let retValue: any = {
                url: url,
                model: item
                    .addNumberConst("ID", id)
                    .addNombre()
                    .addString("Descripcion")
                    .addObject("Entidad")
                    .addString("Link")
                    .addVersion()
                    .toObject()
            };
            if (id > 0) {
                retValue.model.Leido = true;
            };
            retValue.model.Externo = entidad.Externo;
            retValue.model.idCliente = entidad.idCliente;
            retValue.model.idExpediente = entidad.idExpediente;
            console.log(retValue)
            return retValue;
        };
        onMessageSaved(props: page.IProps): any {
            //console.log(props);
            //global.goBack();
        };
        onEntityLoaded(props: page.IProps): any {
            let mensaje: any = getData(props.entidad);
            if (mensaje.Externo) {
                Forms.updateFormElement(props.config.id, "Externo", true);
            }
            if (mensaje.idCliente) {
                Forms.updateFormElement(props.config.id, "idCliente", mensaje.idCliente);
            }

            if (mensaje.idExpediente) {
                Forms.updateFormElement(props.config.id, "idExpediente", mensaje.idExpediente);
            }

            if (mensaje.ID === -1) {
                Forms.remove(props.config.id);
                if (mensaje && mensaje.IdReferencia) {
                    Forms.updateFormElement(config.id, "Link", mensaje.IdReferencia)
                }
            }
            else {
                let m: any = getData(props.entidad);
                Forms.updateFormElements(props.config.id, m);
                dispatchAsync("global-notificationsApp", "Kontrol/notificationsapp/assigned");

                //
                //console.log(m)
                if (m.Leido !== true) {
                    let obj: any = this.saveForm(props, Forms.getForm(props.id));

                    props.config.dispatchEntityBase(obj.model, obj.url, null, HttpMethod.PUT);

                };
            };
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let state: any = getData(this.props.state);
            console.log(state)
            return <page.Main {...config} pageMode={PageMode.Edicion}
                title={{ title: "Mensajes" }}
                allowDelete={false} allowEdit={false}
                onSave={this.saveForm}
                onEntityLoaded={this.onEntityLoaded}
                //onEntitySaved={this.onMessageSaved}
                >
                <View />
                <Edit />
            </page.Main>;
        };
    });
    class View extends page.Base {
        render(): JSX.Element {
            let ml: any = $ml[config.id];
            console.log(ml)
            let titulo: any = ml.sections.Mensaje.title;
            return <page.View>
                <page.OptionSection
                    id="Info"
                    icon="fa fa-th"
                    hideCollapseButton={true}
                    subTitle={titulo}
                    collapsed={false}>
                    <Row>
                        <label.Nombre size={[12, 5, 5, 5]} />
                        <label.Link id="Link" size={[10, 5, 5, 5]} />
                        <label.BadgeDefaultDateSM id="LeidoEn" size={[2, 2, 2, 2]} value={(e) => [null, e.LeidoEn]} />
                        <Column style={{ marginTop: 20 }}>
                            <page.OptionSection id="Plantilla" level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <label.Descripcion size={[12, 12, 12, 12]} isHTML={true} />
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
                </page.OptionSection>
            </page.View>;
        };
    };

    interface IPageEditProps extends page.IProps {
    };

    const Edit: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let ml: any = $ml[config.id];
            let titulo: any = ml.sections.Mensaje.title;
            let entidad: any = getData(this.props.entidad);
            let mensajeExterno: boolean = entidad && entidad.Externo ? true : false;
            let idCliente: number = mensajeExterno ? entidad.idCliente : null;

            return <page.Edit>
                <page.OptionSection
                    id="Info"
                    subTitle={titulo}
                    icon="fa fa-th"
                    hideCollapseButton={true} collapsed={false}>
                    <Row>
                        {mensajeExterno ?
                            <div>
                                <CorreosProspectoDDl idCliente={idCliente} size={[12, 6, 4, 4]} />
                                <input.Nombre size={[12, 8, 8, 8]} maxLength={250} />
                            </div>
                            :
                            <div>
                                <select.Usuarios id={"Entidad"} size={[12, 6, 4, 4]} />
                                <input.Nombre size={[12, 6, 4, 4]} maxLength={250} />
                                <label.Link id="Link" size={[12, 12, 4, 4]} />

                            </div>
                        }

                        <Column style={{ marginTop: 20 }}>
                            <page.OptionSection id="Plantilla" level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <input.RichText id="Descripcion" />
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
                </page.OptionSection>
            </page.Edit>;
        };
    });


    interface ICorreoProspecto extends IDropDrownListProps {
        idCliente?: number;
    }
    let CorreosProspectoDDl: any = global.connect(class extends React.Component<ICorreoProspecto, {}> {
        static props: any = (state: any) => ({
            items: state.global.CorreosProspecto,
        });
        static defaultProps: ICorreoProspecto = {
            id: "Entidad",
            items: createDefaultStoreObject([]),
            label: "Correo",
            helpLabel: "Seleccione un Correo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Contacto",
            size: [12, 3, 3, 3],
            idCliente: null,
        };
        componentDidMount(): void {
            if (this.props.idCliente != null && this.props.idCliente > 0) {
                dispatchAsync("load::CorreosProspecto", "base/scv/scvclientes/Get/GetContactoClientes/" +
                    global.encodeObject({ idCliente: this.props.idCliente, ClaveTipoContacto: "CORREO" }));
            }
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
};
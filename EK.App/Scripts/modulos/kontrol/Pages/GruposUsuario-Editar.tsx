namespace EK.Modules.Kontrol.Pages.GruposUsuario {
    "use strict";

    const GRUPOS_DETALLE: string = "IntegrantesGrupo";
    const config: page.IPageConfig = global.createPageConfig("gruposusuario", "Kontrol", [GRUPOS_DETALLE]);
    let PAGE_ID = "Grupos de Usuario";

    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addString("Descripcion")
                .addEstatus()
                .addObject(GRUPOS_DETALLE)
                .addVersion()
                .toObject();
            return model;
        };

        onEntityLoaded(props: page.IProps): any {
            let Desarrollo: any = getData(props.entidad);
            let idGrupo: number = getDataID(props.entidad);
            if (idGrupo === -1) {
                global.dispatchSuccessful("global-page-data", [], GRUPOS_DETALLE);
            }
            else {
                let parametros: any = global.assign({ IdGrupo: idGrupo });
                props.config.dispatchCatalogoBase("base/kontrol/GruposUsuario/Get/GetGroupsDetailsUser/", parametros, GRUPOS_DETALLE);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    });


    let Edit: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={PAGE_ID}
                        icon="fas fa-object-group" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave id="Clave" size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={50} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            <Input id="Descripcion" size={[12, 12, 12, 12]} maxLength={250} />
                        </Row>
                        <IntegrantesGrupo/>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={PAGE_ID}
                        icon="fas fa-object-group" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <label.Descripcion size={[12, 12, 12, 12]} />
                        </Row>
                        <IntegrantesGrupo/>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };


    export let IntegrantesGrupo: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={GRUPOS_DETALLE}
                icon="fa fa-users"
                parent={config.id}
                style={{ paddingTop: 20 }}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Correo"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Teléfono"}</Column>
                        <Column size={[12, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
                        <Column size={[12, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>}
                readonly={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addObject("Usuario")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {

                            if (value.Usuario.ID === retValue.Usuario.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            }
                        });
                    };

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                    <span>{item.Usuario.Nombre} {item.Usuario.Apellidos}</span>
                                </Column>

                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    <span>{item.Usuario.Clave}</span>
                                </Column>
                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    <span>{item.Usuario.Telefono}</span>
                                </Column>
                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                    <span style={{ fontWeight: 400 }}>{item.Estatus.Clave ? EK.UX.Labels.ok(item.Estatus.Clave) : null}</span>
                                </Column>
                                {(estadoEntidad) ? null :
                                    <buttons.PopOver idParent={config.id} idForm={GRUPOS_DETALLE} info={item}
                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                }
                            </Row>
                        </Column>
                    </Row>;
                }}>
                <Row>
                    <Column size={[12, 12, 12, 12]} >
                        <select.Usuarios id="Usuario" idFormSection={GRUPOS_DETALLE} />
                        <checkBox.Status id="Estatus" size={[12, 12, 2, 2]} idFormSection={GRUPOS_DETALLE} />
                    </Column>
                </Row>
            </page.SectionList>
        };
    })
};
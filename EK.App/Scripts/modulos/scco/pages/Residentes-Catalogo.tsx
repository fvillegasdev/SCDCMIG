namespace EK.Modules.SCCO.Pages.Residentes {
    "use strict";

    const OBRAS = "ResidenteObras";
    const config: page.IPageConfig = global.createPageConfig("Residentes", "scco", [OBRAS]);
    let ml: any = config.getML();

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject("Asignado")
                .addObject(OBRAS)
                .addVersion()
                .toObject();
            return model;
        };

        onEntityLoaded(props: page.IProps): any {
            let residente: any = getData(props.entidad);
            let idResidente: number = getDataID(props.entidad);
            
            if (idResidente <= 0 || idResidente === undefined)
                global.dispatchSuccessful("global-page-data", [], OBRAS)
            else
                global.dispatchSuccessful("global-page-data", residente.ResidenteObras, OBRAS)
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Residentes"
                        icon="fa fa-pencil-square-o"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                            <select.Usuarios id="Asignado" size={[12, 6, 4, 4]} validations={[validations.required()]} />
                            
                            <SeccionObras />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Residentes"
                        icon="fa fa-info-circle"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            <label.General id="Asignado" size={[12, 6, 3, 3]} />

                            <SeccionObras />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };

    let SeccionObras: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={OBRAS}
                parent={config.id}
                title={"Obras"}
                icon="fas fa-vihara"
                level={1}
                size={[12, 12, 12, 12]}
                style={{ paddingTop: 20 }}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[3, 3, 4, 4]} className="list-default-header">{"Clave"}</Column>
                        <Column size={[3, 3, 4, 4]} className="list-default-header"><span>{"Nombre"}</span></Column>
                        <Column size={[3, 3, 4, 4]} className="list-default-header"><span>{"Dirección"}</span></Column>
                        {/*<Column size={[3, 3, 3, 3]} className="list-default-header"><span>{"Ubicación"}</span></Column>*/}
                    </Row>
                </div>}
                items={createSuccessfulStoreObject([])}
                readonly={false}
                addRemoveButton={false}
                mapFormToEntity={(form: EditForm): any => {
                    return form
                        .addID()
                        .addEstatus()
                        .addObject("Obra")
                        .addVersion()
                        .toObject();
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[3, 3, 4, 4]} className="listItem-default-item">
                            <span className="badge badge-info" style={{ marginRight: 10 }}>{item.Obra.Clave}</span>
                        </Column>
                        <Column size={[3, 3, 4, 4]} className="listItem-default-item"><span>{item.Obra.Nombre}</span></Column>
                        <Column size={[3, 3, 4, 4]} className="listItem-default-item"><span>{item.Obra.Direccion}</span></Column>
                        {/*<Column size={[3, 3, 3, 3]} className="listItem-default-item"><span>{item.Obra.Ubicacion}</span></Column>*/}
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={OBRAS} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Row>
                    <ddl.SCCO$ObrasDDL id="Obra" idFormSection={OBRAS} size={[12, 12, 6, 6]} validations={[validations.required()]} />
                </Row>
            </page.SectionList>
        }
    });
};

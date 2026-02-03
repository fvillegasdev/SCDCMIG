namespace EK.Modules.Kontrol.Pages.Vistas {
    "use strict";
    const kontrol_VistaElemento: string = "Elementos";
    const kontrol_VistaMapa: string = "VistasMapa";
    const config: page.IPageConfig = global.createPageConfig("GISVistas", "kontrol", [kontrol_VistaElemento, kontrol_VistaMapa]);
    
    let idVista: any = -1;

    const HEADER_VistaElemento: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[3, 3, 3, 3]} className="list-default-header">Clave Elemento</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header" style={{ paddingLeft: { value: "20px", important: "true" } }}>Nombre Elemento</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">Color</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">Acciones</Column>
            </Row>
        </div>;

    export const Edicion: any = page.connect(class extends page.Base {
        
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addEstatus()
                .addNumber("IdVista")
                .addObject(kontrol_VistaElemento)
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let vistasEntity: any = getData(props.entidad);
            idVista = getDataID(props.entidad);
            if (idVista === -1) {
                global.dispatchSuccessful("global-page-data", [], kontrol_VistaElemento);
            } else {
                if (vistasEntity.Elementos) {
                    global.dispatchSuccessful("global-page-data", vistasEntity.Elementos, kontrol_VistaElemento);
                } else {
                    global.dispatchSuccessful("global-page-data", [], kontrol_VistaElemento);
                }
                
            }
            
        };
        onClick(e) {
            e.preventDefault();
            this.setState({ readOnly: !this.state.readOnly });
        }
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded} allowDelete={false}>
                <PageButtons>
                   
                </PageButtons>
                <View />
                <Edit />
                
            </page.Main>;
        };
    });
    class Edit extends page.Base {
        
        render(): JSX.Element {
            //let ColorFondo: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Color : "";
            
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-eye" title={"Vista"} collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <Column>
                                    <label.Clave size={[12, 2, 2, 2]} />
                                    <label.Nombre size={[12, 3, 3, 3]} />
                                    <label id={"SP"}  />
                                    <label id={"Descripcion"} />
                                </Column>
                                <Column style={{ marginTop: 10}}>
                                <page.SectionList
                                    id={kontrol_VistaElemento}
                                    parent={config.id}
                                    level={1}
                                    icon="fa fa-table"
                                    size={[12, 12, 12, 12]}
                                    listHeader={HEADER_VistaElemento}
                                    items={createSuccessfulStoreObject([])} readonly={false}
                                    addRemoveButton={false}
                                    mapFormToEntity={(form: EditForm): any => {
                                        return form
                                            .addID()
                                            .addClave()
                                            .addString("Color")
                                            .addNombre()
                                            .addVersion()
                                            .addEstatus()
                                            .toObject();
                                    }}
                                    formatter={(index: number, item: any) => {
                                        return <Row>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                                <h5>{item.Clave}</h5>
                                            </Column>
                                            <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                <h6>{item.Nombre}</h6>
                                            </Column>
                                            <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                                <label.Label id={"Color"} valueStyle={{ backgroundColor: item.Color }} size={[12, 12, 2, 2]} />
                                            </Column>
                                            <buttons.PopOver idParent={config.id} idForm={kontrol_VistaElemento} info={item}
                                                extraData={[buttons.PopOver.edit]} />
                                        </Row>;
                                    }}>
                                    <Row>
                                        <label.Clave idForm={kontrol_VistaElemento} />
                                        <ColorInput id={"Color"} idFormSection={kontrol_VistaElemento} />
                                    </Row>
                                </page.SectionList>
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>

                
            </page.Edit>;
        };
    };
    class View extends page.Base {
        constructor() {
            super();
            this.state = {
                readOnly: false
            };
        }
        onClick(e) {
            e.preventDefault();
            this.setState({ readOnly: !this.state.readOnly });
        }
        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-eye" title={"Vista"} collapsed={false} hideCollapseButton={true}>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 3, 3, 3]} />
                            <label id={"SP"} />
                            <label id={"Descripcion"} />
                        </page.OptionSection>
                    </Column>
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                        <page.SectionList
                            id={kontrol_VistaElemento}
                            
                            parent={config.id}
                            idParent={config.id}
                            icon="fa fa-table"
                            size={[12, 12, 12, 12]}
                            listHeader={HEADER_VistaElemento}
                            items={createSuccessfulStoreObject([])} readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                        <h5>{item.Clave}</h5>
                                    </Column>
                                    <Column size={[5, 5, 5, 5 ]} className="listItem-default-header">
                                        <h6>{item.Nombre}</h6>
                                    </Column>
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                        <label.Label id={"Color"} style={{minWidth: "30px"}} valueStyle={{ backgroundColor: item.Color}} size={[12, 12, 2, 2]} />
                                    </Column>
                                </Row>;
                            }}>
                            <Row>
                                <label.Clave idForm={kontrol_VistaElemento}/>
                                <label.Nombre idForm={kontrol_VistaElemento} />
                                <label id={"Color"}  />
                            </Row>
                        </page.SectionList>
                    </Column>
                </Row>
            </page.View>;
        };
    };
}
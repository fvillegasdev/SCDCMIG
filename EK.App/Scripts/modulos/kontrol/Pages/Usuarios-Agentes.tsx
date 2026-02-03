namespace EK.Modules.Kontrol.Pages.Usuarios {
    "use strict";
    const USUARIOS_ID: string = "Usuario";
    const config: page.IPageConfig = global.createPageConfig("agentes", "scv");

    export const Agente: any = page.connect(class extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Usuario")
                .addObject("Proveedor")
                .addNumber("LimitePagare")
                .addObject("Regimen")
                .addBoolean("Comisionable")
                .addBoolean("AsesorCredito")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            if (id === "?nuevo") {
                let newEntity: any = { ID: -1 };
                config.setEntity(newEntity);
                config.setState({ viewMode: false, isNew: true });
            }
            else {
                config.dispatchEntityBase({ id }, "usuario/agente", undefined, global.HttpMethod.POST);
            };
        };
        onEntityLoaded(props: page.IProps): any {   
            let agente: any = getData(props.entidad);
            let idAgente: any = getDataID(props.entidad);

            props.config.setEntity(agente.Usuario, USUARIOS_ID);
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
                onWillEntityLoad={this.onWillEntityLoad} onEntityLoaded={this.onEntityLoaded} idKeyEntidad="IdUsuario">
                <View />
                <Edit />
            </page.Main>;
        };
    });
    const Edit = page.connect(class extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                    <label.Custom id="Nombre" label="Nombre(s)" idForm={USUARIOS_ID} size={[12, 4, 4, 4]} value={(item: any) => {
                                        return !item ? "" : item.Nombre + " " + item.Apellidos;
                                    }} />

                                    <label.Clave idForm={USUARIOS_ID} label="Clave" size={[12, 2, 2, 2]} />
                                    <label.Fecha idForm={USUARIOS_ID} label="Vigente desde" id="VigenciaInicio" size={[12, 2, 2, 2]} />
                                    <label.Fecha idForm={USUARIOS_ID} label="Vigente hasta" id="VigenciaFin" size={[12, 2, 2, 2]} />
                                    <label.Boolean idForm={USUARIOS_ID} label="Bloqueado" id="Bloqueado" size={[12, 1, 1, 1]} />
                                    <label.Estatus idForm={USUARIOS_ID} label="Activo" size={[12, 1, 1, 1]} />

                                </Column>

                                <Column size={[12, 12, 12, 12]}>
                                    <OptionSection id="Agente" icon="fa fa-th" hideCollapseButton={true} collapsed={false} level={1}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>

                                                <ProveedoresSelect id="Proveedor" size={[12, 2, 2, 2]} />
                                                <input.Currency id="LimitePagare" label="Límite de Pagaré" size={[12, 2, 2, 2]} />
                                                <ddl.SCVRegimenDDL addNewItem={"SO"} size={[12, 2, 2, 2]} />

                                                <checkBox.CheckBox id="Comisionable" label="Comisionable" size={[12, 2, 2, 2]} />
                                                <checkBox.CheckBox id="AsesorCredito" label="Agente de Crédito" size={[12, 2, 2, 2]} />
                                                <checkBox.Status label={"Estatus"} size={[12, 2, 2, 2]} />

                                            </Column>
                                        </Row>
                                    </OptionSection>
                                </Column>
                            </Row>
                        </OptionSection>
                    </Column>
                </Row>                
            </page.Edit>;
        };
    });
    const View = page.connect(class extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                            <Row>

                                <Column size={[12, 12, 12, 12]}>
                                    <label.Custom id="Nombre" label="Nombre(s)" idForm={USUARIOS_ID} size={[12, 4, 4, 4]} value={(item: any) => {
                                        return !item ? "" : item.Nombre + " " + item.Apellidos;
                                    }} />
                                    <label.Clave idForm={USUARIOS_ID} label="Clave" size={[12, 2, 2, 2]} />
                                    <label.Fecha idForm={USUARIOS_ID} label="Vigente desde" id="VigenciaInicio" size={[12, 2, 2, 2]} />
                                    <label.Fecha idForm={USUARIOS_ID} label="Vigente hasta" id="VigenciaFin" size={[12, 2, 2, 2]} />
                                    <label.Boolean idForm={USUARIOS_ID} label="Bloqueado" id="Bloqueado" size={[12, 1, 1, 1]} />
                                    <label.Estatus idForm={USUARIOS_ID} label="Activo" size={[12, 1, 1, 1]} />
                                </Column>

                                <Column size={[12, 12, 12, 12]}>
                                    <OptionSection id="Agente" icon="fa fa-th" hideCollapseButton={true} collapsed={false} level={1}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <label.Entidad id="Proveedor" label="Proveedor" size={[12, 2, 2, 2]} />
                                                <label.Label id="LimitePagare" label="Límite de Pagaré" size={[12, 2, 2, 2]} labelType="Money" />
                                                <label.Entidad id="Regimen" label="Régimen" size={[12, 2, 2, 2]}/>
                                                <label.Boolean id="Comisionable" label="Comisionable" size={[12, 2, 2, 2]} />
                                                <label.Boolean id="AsesorCredito" label="Agente de Crédito" size={[12, 2, 2, 2]} />
                                                <label.Estatus id="Estatus" label={"Estatus"} size={[12, 2, 2, 2]} />
                                            </Column>
                                        </Row>
                                    </OptionSection>
                                </Column>
                            </Row>
                        </OptionSection>
                    </Column>
                </Row>                
            </page.View>;
        };
    });
};
namespace EK.Modules.SCV.Pages.Desarrollos1 {
    "use strict";

    const REF_LABORALES_ID: string = "RefLaborales";
    const REF_PERSONALES_ID: string = "Referencias";
    const INFORMACION_ADICIONAL: string = "InformacionAdicional";
    const INFO_TIPOPERSONA: string = "InfoTipoPersona";
    const config: page.IPageConfig =
        global.createPageConfig("desarrollos", "scv", [REF_LABORALES_ID, REF_PERSONALES_ID, INFORMACION_ADICIONAL]);

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let modelInfo: any = item;
            let model: any = item
                .addID()
                .addClave()
                .addObject("TipoPersona")
                .addString("ApellidoMaterno")
                .addString("ApellidoPaterno")
                .addString("Nombre")
                .addEstatus("Estatus")
                .addObject("Genero")
                .addDate("FechaNacimiento")
                .addObject("EstadoOrigen")
                .addString("RFC")
                .addString("CURP")
                .addString("NSS")
                .addObject("EstadoCivil")
                .addObject("RegimenConyugal")
                .addObject("RangoIngresos")
                .addString("Domicilio")
                .addString("NumInterior")
                .addString("NumExterior")
                .addString("AntiguedadDomicilio")
                .addObject("Asentamiento")
                .addString("Email")
                .addString("Telefono")
                .addString("Celular")
                .addObject(REF_LABORALES_ID)
                .addObject(REF_PERSONALES_ID)
                .addObject(INFORMACION_ADICIONAL)
                .addVersion()
                .toObject();
            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        render(): JSX.Element {
            const listHeaderRefLaboral: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[7, 7, 7, 7]} className="list-default-header">{"Empresa/Puesto"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Antiguedad"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Actual"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;
            const listHeaderReferencias: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[8, 8, 8, 8]} className="list-default-header">{"Nombre/Relación"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Teléfonos"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection id="InfoGeneral"
                            subTitle={<span>
                                <span className="badge badge-info bold" style={{ margin: "0px 5px" }}>#</span>
                                <span className="badge badge-success bold" style={{ margin: "0px 5px" }}></span>
                            </span>}
                            icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 3, 3]} maxLength={50} validations={[validations.required()]} />
                            <input.Text id="ApellidoPaterno" size={[12, 12, 3, 3]} maxLength={50} validations={[validations.required()]} />
                            <input.Text id="ApellidoMaterno" size={[12, 12, 3, 3]} maxLength={50} validations={[validations.required()]} />
                            <checkBox.Status size={[6, 2, 1, 1]} />
                            <GenerosDDL size={[12, 12, 2, 2]} />
                            <DatePicker id="FechaNacimiento" size={[12, 6, 2, 2]} validations={[validations.required()]} />
                            <select.Estados id="EstadoOrigen" size={[12, 12, 3, 3]} />
                            <input.RFC size={[12, 6, 2, 2]} validations={[validations.required()]} />
                            <input.CURP size={[12, 6, 3, 3]} validations={[validations.required()]} />
                            <input.NSS size={[12, 6, 2, 2]} validations={[validations.required()]} />
                            <EstadoCivilDLL size={[12, 6, 2, 2]} />
                            <RegimenDLL size={[12, 6, 2, 2]} />
                            <RangoIngresosDDL size={[12, 12, 6, 6]} />
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    id="InfoDomicilio"
                                    icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={true}>
                                    <input.Text id="Domicilio" size={[12, 12, 12, 12]} maxLength={150} validations={[validations.required()]} />
                                    <input.Text id="NumInterior" size={[12, 12, 3, 3]} />
                                    <input.Text id="NumExterior" size={[12, 12, 3, 3]} />
                                    <input.Text id="AntiguedadDomicilio" size={[12, 6, 3, 3]} mask="99" />
                                    <select.Asentamientos size={[12, 12, 12, 12]} />
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    id="InfoContacto"
                                    icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={true}>
                                    <input.Email size={[12, 12, 12, 12]} maxLength={50} validations={[validations.required(), validations.email("")]} />
                                    <input.Telefono size={[12, 6, 6, 6]} validations={[validations.required(), validations.length("", 10)]} />
                                    <input.Telefono id="Celular" size={[12, 6, 6, 6]} validations={[validations.required()]} />
                                </page.OptionSection>
                            </Column>
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 6, 6]} style={{ padding: 0 }}>
                        <page.SectionList
                            id={REF_LABORALES_ID}
                            parent={config.id}
                            icon="fa fa-table"
                            size={[12, 12, 12, 12]}
                            listHeader={listHeaderRefLaboral}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addObject("Empresa")
                                    .addNumber("Antiguedad")
                                    .addString("Puesto")
                                    .addBoolean("EmpleoActual")
                                    .addVersion()
                                    .toObject();
                            }}
                            formatter={(index: number, item: any) => {
                                debugger
                                return <Row>
                                    <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                        <h5>{item.Empresa.Nombre}</h5><h6>{item.Puesto}</h6>
                                    </Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-center-header">{item.Antiguedad}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-center-header">{label.ok(item.EmpleoActual)}</Column>
                                    <buttons.PopOver idParent={config.id} idForm={REF_LABORALES_ID} info={item}
                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                </Row>;
                            }}>
                            <Row>
                                <ddl.EmpresasDLL idFormSection={REF_LABORALES_ID} size={[12, 12, 12, 12]} />
                                <input.Text id="Puesto" idFormSection={REF_LABORALES_ID} size={[12, 12, 6, 6]} maxLength={50} />
                                <input.Integer id="Antiguedad" idFormSection={REF_LABORALES_ID} size={[12, 12, 3, 3]} maxLength={2} />
                                <checkBox.CheckBox id="EmpleoActual" idFormSection={REF_LABORALES_ID} size={[12, 12, 3, 3]} />
                            </Row>
                        </page.SectionList>
                    </Column>
                    <page.SectionList
                        id={REF_PERSONALES_ID}
                        parent={config.id}
                        icon="fa fa-table"
                        size={[12, 12, 6, 6]}
                        listHeader={listHeaderReferencias}
                        items={createSuccessfulStoreObject([])} readonly={false}
                        addRemoveButton={false}
                        mapFormToEntity={(form: EditForm): any => {
                            return form
                                .addID()
                                .addNombre()
                                .addString("ApellidoPaterno")
                                .addString("ApellidoMaterno")
                                .addString("Telefono")
                                .addString("Celular")
                                .addObject("TipoReferencia")
                                .addVersion()
                                .toObject();
                        }}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[8, 8, 8, 8]} className="listItem-default-header">
                                    <h5>{item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno}</h5>
                                    <h6>{item.TipoReferencia.Nombre}</h6>
                                </Column>
                                <Column size={[12, 12, 3, 3]}>
                                    <label.TelefonoValue value={item.Telefono} />
                                    <label.TelefonoValue value={item.Celular} />
                                </Column>
                                <buttons.PopOver idParent={config.id} idForm={REF_PERSONALES_ID} info={item}
                                    extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                            </Row>;
                        }}>
                        <Row>
                            <input.Nombre size={[12, 12, 12, 12]} idFormSection={REF_PERSONALES_ID} maxLength={50} validations={[validations.required()]} />
                            <input.Text id="ApellidoPaterno" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} maxLength={50} validations={[validations.required()]} />
                            <input.Text id="ApellidoMaterno" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} maxLength={50} validations={[validations.required()]} />
                            <ddl.ReferenciasDLL id="TipoReferencia" idFormSection={REF_PERSONALES_ID} size={[12, 12, 6, 6]} />
                            <input.Telefono id="Telefono" idFormSection={REF_PERSONALES_ID} size={[12, 12, 3, 3]} />
                            <input.Telefono id="Celular" idFormSection={REF_PERSONALES_ID} size={[12, 12, 3, 3]} />
                        </Row>
                    </page.SectionList>
                </Row>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            const listHeaderRefLaboral: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[3, 3, 8, 8]} className="list-default-header">{"Empresa/Puesto"}</Column>
                        <Column size={[3, 3, 2, 2]} className="list-center-header">{"Antiguedad"}</Column>
                        <Column size={[3, 3, 2, 2]} className="list-center-header">{"Actual"}</Column>
                    </Row>
                </div>;
            const listHeaderReferencias: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[3, 3, 6, 6]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Teléfono"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Celular"}</Column>
                    </Row>
                </div>;
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id="InfoGeneral"
                            subTitle={<span>
                            </span>}
                            icon="fa fa-user" collapsed={false} hideCollapseButton={true}>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 2, 2]} />
                            <label.Label id="ApellidoPaterno" size={[12, 12, 3, 3]} />
                            <label.Label id="ApellidoMaterno" size={[12, 12, 3, 3]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                            <label.Entidad id="Genero" size={[12, 12, 2, 2]} />
                            <label.Fecha id="FechaNacimiento" size={[12, 12, 2, 2]} />
                            <label.Entidad id="EstadoOrigen" size={[12, 12, 2, 2]} />
                            <label.RFC size={[12, 12, 2, 2]} />
                            <label.CURP size={[12, 12, 2, 2]} />
                            <label.Empty size={[0, 0, 2, 2]} />
                            <label.Label id="NSS" size={[12, 12, 2, 2]} />
                            <label.Entidad id="EstadoCivil" size={[12, 12, 2, 2]} />
                            <label.Entidad id="RegimenConyugal" size={[12, 12, 2, 2]} />
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    id="InfoDomicilio"
                                    icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={true}>
                                    <label.Label id="Domicilio" size={[12, 12, 8, 8]} />
                                    <label.Label id="NumInterior" size={[12, 12, 2, 2]} />
                                    <label.Label id="NumExterior" size={[12, 12, 2, 2]} />
                                    <label.Asentamiento size={[12, 12, 10, 10]} />
                                    <label.Label id="AntiguedadDomicilio" size={[12, 12, 2, 2]} />
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 6, 6]} style={{ paddingTop: 20 }}>
                                <page.OptionSection
                                    id="InfoContacto"
                                    icon="fa fa-home" level={1} collapsed={false} hideCollapseButton={true}>
                                    <label.Label id="Email" size={[12, 12, 6, 6]} />
                                    <label.Telefono id="Telefono" size={[12, 12, 3, 3]} />
                                    <label.Telefono id="Celular" size={[12, 12, 3, 3]} />
                                </page.OptionSection>
                            </Column>
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 6, 6]} style={{ padding: 0 }}>
                        <page.SectionList
                            id={REF_LABORALES_ID}
                            icon="fa fa-table"
                            size={[12, 12, 12, 12]}
                            listHeader={listHeaderRefLaboral}
                            readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[12, 12, 8, 8]} className="listItem-default-header">
                                        <h5>{item.Empresa.Nombre}</h5><h6>{item.Puesto}</h6>
                                    </Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-center-header">{item.Antiguedad}</Column>
                                    <Column size={[12, 12, 2, 2]} className="listItem-center-header">{EK.UX.Labels.ok(item.EmpleoActual)}</Column>
                                </Row>;
                            }}>
                        </page.SectionList>
                    </Column>
                    <page.SectionList
                        id={REF_PERSONALES_ID}
                        icon="fa fa-table"
                        size={[12, 12, 6, 6]}
                        listHeader={listHeaderReferencias}
                        readonly={false}
                        addRemoveButton={false}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column size={[12, 12, 6, 6]} className="listItem-default-header">
                                    <span className={"badge badge-info"}>{item.TipoReferencia.Nombre}</span>
                                    {item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno}
                                </Column>
                                <Column size={[12, 12, 3, 3]}><label.TelefonoValue value={item.Telefono} /></Column>
                                <Column size={[12, 12, 3, 3]}><label.TelefonoValue value={item.Celular} /></Column>
                            </Row>;
                        }} />
                </Row>
            </page.View>;
        };
    };
}
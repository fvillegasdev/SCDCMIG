namespace EK.Modules.SCCO.Pages.Desarrollos {
    "use strict";
    const scco_Obra: string = "Obras";
    let idDesarrollo: any = -1;
    let $page: any;
    const config: page.IPageConfig = global.createPageConfig("SCCODesarrollos", "scco", [scco_Obra]);

    const Encabezado_Desarrollos_Obra: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Clave"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo Obra"}</Column>
                <Column size={[12, 3, 3, 3]} className="list-default-header">{"Tipo Avance"}</Column>
                <Column size={[12, 3, 3, 3]} className="list-default-header">{"Estado de Obra"}</Column>
            </Row>
        </div>;

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addString("ClaveConjunto")
                .addString("Sector")
                .addString("Direccion")
                .addObject("Localidad")
                .addObject("Notario")
                .addString("NombreRep")
                .addString("TelefonoRep")
                .addString("ExtensionRep")
                .addString("NombreAcreedor")
                .addString("ClabeAcreedor")
                .addString("RFCAcreedor")
                .addObject("Compania")
                .addObject("Moneda")
                .addString("Geolocalizacion")
                .addObject("Plaza")
                .addObject("Posicion")
                .addVersion()
                .toObject();
            return model;
        };
        componentWillMount(): any {
            $page = $ml[config.id];
        };
        onEntityLoaded(props: page.IProps): any {
            let Desarrollo: any = getData(props.entidad);
            idDesarrollo = getDataID(props.entidad);

            if (idDesarrollo === -1) {
                global.dispatchSuccessful("global-page-data", [], scco_Obra);
            }
            else {
                let id: any = idDesarrollo;
                props.config.dispatchCatalogoBase("base/scco/Obra/all/", { idDesarrollo: idDesarrollo }, scco_Obra);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                allowDelete={false}
                allowEdit={false}
                allowNew={false}
                allowView={true}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Desarrollos"
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <Input id={"ClaveConjunto"} size={[12, 12, 2, 2]} maxLength={20} />
                            <Input id={"Sector"} size={[12, 12, 2, 2]} maxLength={25} validations={[validations.required()]} />
                            <Input id={"Direccion"} size={[12, 12, 4, 4]} maxLength={150} />
                            <select.Asentamientos id={"Localidad"} size={[12, 12, 4, 4]} />
                        </Row>
                        <Row>
                            <select.Notario id={"Notario"} size={[12, 4, 4, 4]} />
                            <Input id={"NombreRep"} size={[12, 4, 4, 4]} maxLength={150} />
                            <input.Telefono id={"TelefonoRep"} size={[12, 2, 2, 2]} />
                            <Input id={"ExtensionRep"} size={[12, 2, 2, 2]} maxLength={6} />
                        </Row>
                        <Row>
                            <Input id={"NombreAcreedor"} size={[12, 12, 4, 4]} maxLength={150} />
                            <Input id={"ClabeAcreedor"} size={[12, 12, 4, 4]} maxLength={20} />
                            <input.RFC id={"RFCAcreedor"} size={[12, 12, 4, 4]} />
                        </Row>
                        <Row>
                            <CompaniasDDL id={"Compania"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                            <MonedasDDL id={"Moneda"} size={[12, 3, 3, 3]} />
                            <Input id={"Geolocalizacion"} size={[12, 3, 3, 3]} maxLength={150} />
                        </Row>
                        <Row>
                            <ddl.PlazasSCVDDL id="Plaza" size={[12, 6, 6, 6]} addNewItem={"SO"} validations={[validations.required()]} />
                            <ddl.PosicionesActivasDDL label="Representante" id={"Posicion"} size={[12, 6, 6, 6]} validations={[validations.required()]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    };

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle="Desarrollo"
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}
                        level="main">
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <Label id={"ClaveConjunto"} size={[12, 3, 2, 2]} />
                            <Label id="Sector" size={[12, 12, 2, 2]} />
                            <Label id="Direccion" size={[12, 4, 4, 4]} />
                            <label.Localidad id={"Localidad"} size={[12, 4, 4, 4]} />
                        </Row>
                        <Row>
                            <label.General id={"Notario"} size={[12, 4, 4, 4]} />
                            <Label id={"NombreRep"} size={[12, 4, 4, 4]} />
                            <label.Telefono id={"TelefonoRep"} size={[12, 2, 2, 2]} />
                            <Label id={"ExtensionRep"} size={[12, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <Label id={"NombreAcreedor"} size={[12, 12, 4, 4]} />
                            <Label id={"ClabeAcreedor"} size={[12, 12, 4, 4]} />
                            <Label id={"RFCAcreedor"} size={[12, 12, 4, 4]} />
                        </Row>
                        <Row>
                            <label.General id={"Compania"} size={[12, 4, 4, 4]} />
                            <label.General id={"Moneda"} size={[12, 4, 4, 4]} />
                            <Label id={"Geolocalizacion"} size={[12, 4, 4, 4]} />
                        </Row>
                        <Row>
                            <label.General id={"Plaza"} size={[12, 6, 6, 6]} />
                            <label.General id={"Posicion"} size={[12, 6, 6, 6]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <page.SectionList
                    id={scco_Obra}
                    parent={config.id}
                    icon="fas fa-draw-polygon"
                    level={1}
                    size={[12, 12, 12, 12]}
                    listHeader={Encabezado_Desarrollos_Obra}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    addRemoveButton={false}
                    mapFormToEntity={(form: EditForm, entidades?: any): any => {
                        let retValue: any = form
                            .addID()
                            .addEstatus()
                            .addVersion()
                            .toObject();

                        let e: any[] = entidades;
                        if (e && e.length > 0) {
                            e.forEach((value: any, index: number): any => {
                                if (value.CentroCosto.ID === retValue.CentroCosto.ID) {
                                    retValue.ID = value.ID;
                                    retValue._found = true;
                                };
                            });
                        }

                        return retValue;
                    }}
                    formatter={(index: number, item: any) => {
                        return <Row>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                <a target='_blank' rel='noopener noreferrer' href={`#/scco/Obra/${item.ID}`}
                                    style={{ textDecoration: 'underline' }}
                                    className="badge badge-success">
                                    <span style={{ marginRight: 10 }}>{item.Clave} </span>
                                </a>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                <span>{item.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                <span>{item.TipoObra.Nombre}</span>
                            </Column>
                            <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                <span>{item.TipoAvance.Nombre}</span>
                            </Column>
                            <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                <span>{item.EstadoObra.Nombre}</span>
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </page.View>
        };
    };
};
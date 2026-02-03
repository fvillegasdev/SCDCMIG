namespace EK.Modules.SCV.Pages.PuntosVenta {
    "use strict";
    //const config: page.IPageConfig = global.createPageConfig("puntosventa", "scv");
    let PAGE_ID = "Puntos de Venta";
    let DESARROLLOS_ID = "Desarrollos";
    const config: page.IPageConfig = global.createPageConfig("puntosventa", "scv", [DESARROLLOS_ID]);

    let IdPuntoVenta = -1;

    interface IPageEditProps extends page.IProps {
        item?: any;
    };

    export const Edicion: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addString("Direccion")
                .addObject("Localidad")
                .addString("Telefono1")
                .addString("Telefono2")
                .addObject(DESARROLLOS_ID)
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let puntoVenta: any = getData(props.entidad);
            IdPuntoVenta = getDataID(props.entidad);

            let parametros: any = global.assign({ IdPuntoVenta: IdPuntoVenta });


            if (puntoVenta <= 0 || puntoVenta === undefined) {
                global.dispatchSuccessful("global-page-data", [], DESARROLLOS_ID);
            }
            else {
                props.config.dispatchCatalogoBase("base/scv/PuntosVenta/Get/GetDesarrollosPorPuntoVenta/", parametros, DESARROLLOS_ID);
            };
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onEntityLoaded={this.onEntityLoaded} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    });
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-money" collapsed={false} hideCollapseButton={false}>
                        <Row>
                            <input.Clave size={[7, 2, 2, 2]} maxLength={20} validations={[validations.required()]} />
                            <input.Nombre size={[12, 8, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                            <input.Text id="Direccion" size={[12, 12, 12, 12]} maxLength={150} />
                            <select.Asentamientos id="Localidad" size={[12, 12, 6, 6]} />
                            <input.Telefono id="Telefono1" size={[12, 6, 3, 3]} />    
                            <input.Telefono id="Telefono2" size={[12, 6, 3, 3]}  /> 
                        </Row>
                    </page.OptionSection>
                    <Desarrollos />
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={false}>
                        <Row>
                            <label.Clave id="Clave" size={[7, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                            <Label id="Direccion" size={[12, 12, 12, 12]} />
                            <label.Localidad id="Localidad" size={[12, 12, 6, 6]} />
                            <label.Telefono id="Telefono1" size={[12, 6, 3, 3]} />
                            <label.Telefono id="Telefono2" size={[12, 6, 3, 3]} />
                        </Row>
                    </page.OptionSection>
                    <Desarrollos/>
                </Column>
            </page.View>;
        };
    };

    export let Desarrollos: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={DESARROLLOS_ID}
                parent={config.id}
                title={"Desarrollos"}
                level={1}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-th-list"
                size={[12, 8, 6, 6]}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[12, 12, 12, 12]} className="list-default-header">{"Desarrollo"}</Column>
                        </Row>
                    </div>}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("Desarrollo")
                        .addEstatus()
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {
                            if (value.Desarrollo.ID === retValue.Desarrollo.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            };
                        });
                    };

                    let desarrollos: any = global.getData(Forms.getForm("puntosventa").getValue("Desarrollos"));

                    return retValue;
                }}          
                formatter={(index: number, item: any) => {
                    let claveDes: any = (item.Desarrollo == null || item.Desarrollo.ID == null) ? "Todos" : " " + item.Desarrollo.Clave + " ";
                    let nombreDes: any = (item.Desarrollo == null || item.Desarrollo.ID == null) ? "Todos" : " " + item.Desarrollo.Descripcion + " ";
                    return <Row>
                        <Column size={[11, 11, 11, 11]} className="listItem-default-item">
                            <span className="badge badge-info">{claveDes}</span> <span>{nombreDes}</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={DESARROLLOS_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <ddl.DesarrollosDDL id="Desarrollo" idFormSection={DESARROLLOS_ID} addNewItem={"VT"} addNewItemText={"Todos"} size={[12, 12, 6, 6]} />
                    </Row>
                </Column>
            </page.SectionList>
        };
    });
};
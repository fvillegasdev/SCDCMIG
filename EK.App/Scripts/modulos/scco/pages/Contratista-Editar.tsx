namespace EK.Modules.SCV.Pages.scco.Contratistas {
    "use strict";

    let PAGE_ID = "Contratista";
    const IMPUESTOS: string = "Impuestos";
    const PROVEEDOR: string = "proveedor";

    const config: page.IPageConfig = global.createPageConfig("Contratistas", "scco", [IMPUESTOS, PROVEEDOR]);
    let ml: any = config.getML();

    interface IPageEditProps extends page.IProps {
        tipoConvenio?: any;
        proveedor?: any;
    }
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("RFC")
                .addObject("TipoConvenio")
                .addString("Representante")
                .addString("NSS")
                .addString("Direccion")
                .addObject("Asentamiento")
                .addObject("Proveedor")
                .addObject("Regimen")
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let contratista: any = getData(props.entidad);
            global.dispatchSuccessful("global-page-data", contratista.proveedor, PROVEEDOR);
        };

        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    class EditTipoConvenio extends page.Base {
        render(): JSX.Element {
            return <Row>
                <Column size={[12, 12, 6, 6]}>
                    <page.OptionSection
                        id="TipoConvenio"
                        subTitle="Tipo de Convenio"
                        icon="fa-fa-info-circle"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <SectionButtons>
                            <buttons.Button icon="fa fa-arrow-right" color="white" iconOnly={true} className="btn-ico-ek" />
                        </SectionButtons>
                        <ddl.SCCOTipoConvenioDDL id={"TipoConvenio"} addNewItem={"SO"} size={[12, 3, 4, 4]} />
                    </page.OptionSection>
                </Column>
            </Row>;
        }
    }

    class EditDestajo extends page.Base {
        render(): JSX.Element {
            return <Column>
                <Row>
                    <Input id={"Representante"} size={[12, 4, 4, 4]} />
                    <input.RFC size={[12, 4, 4, 4]} />
                    <ddl.SCVRegimenDDL addNewItem={"SO"} size={[12, 4, 4, 4]} />
                </Row>
                <Row>
                    <Input id={"Direccion"} size={[12, 4, 4, 4]} />
                    <select.Asentamientos size={[12, 4, 4, 4]} />
                </Row>
            </Column>
        }
    }

    class EditSubcontrato extends page.Base {
        render(): JSX.Element {
            return <Column>
                <Row>
                    <Label id={"Representante"} size={[12, 6, 4, 4]} />
                    <Label id={"RFC"} size={[12, 6, 4, 4]} />
                    <label.Entidad id="Regimen" size={[12, 4, 4, 4]} />
                </Row>
                <Row>
                    <Label id={"Direccion"} size={[12, 4, 4, 4]} />
                    <label.Entidad id="Asentamiento" size={[12, 4, 4, 4]} />
                </Row>
            </Column>
        }
    }

    //class Edit extends page.Base {
    const Edit: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps>{
        static props: any = (state: any) => ({
            tipoConvenio: Forms.getDataValue("TipoConvenio", config.id, state),
            proveedor: Forms.getDataValue("Proveedor", config.id, state)
        })

        componentWillReceiveProps(nextProps: IPageEditProps): any {
            if (global.hasChanged(this.props.tipoConvenio, nextProps.tipoConvenio) || global.hasChanged(this.props.proveedor, nextProps.proveedor)) {
                if (global.isSuccessful(nextProps.tipoConvenio)) {
                    let tipoConvenio: any = global.getData(nextProps.tipoConvenio);
                    let proveedor: any = global.getData(nextProps.proveedor);
                    if (Object.keys(tipoConvenio).length > 0 && Object.keys(proveedor).length > 0) {
                        if (tipoConvenio.Clave === "S") { //tipoconvenio.subcontrato
                            Forms.updateFormElement(config.id, "Direccion", `${proveedor.Domicilio} ${proveedor.NumInterior}`);
                            Forms.updateFormElement(config.id, "Asentamiento", proveedor.Asentamiento);
                            Forms.updateFormElement(config.id, "Nombre", proveedor.Nombre);
                            Forms.updateFormElement(config.id, "Representante", proveedor.NombreContacto);
                            Forms.updateFormElement(config.id, "RFC", proveedor.RFC);
                            Forms.updateFormElement(config.id, "Clave", proveedor.Clave);
                            Forms.updateFormElement(config.id, "Regimen", proveedor.Regimen);
                        } else { }
                    }
                }
            }
        }
        render(): JSX.Element {
            let convenio: any = global.getData(this.props.tipoConvenio);
            let mostrar: boolean = false;
            if (convenio) {
                mostrar = convenio.Clave === "S" ? true : false;
            }
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} validations={[validations.required()]} />
                            {(mostrar) ?
                                <div>
                                    <label.Nombre size={[12, 12, 8, 8]} /></div>
                                :
                                <div>
                                    <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} /></div>
                            }

                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <ddl.SCCOTipoConvenioDDL id={"TipoConvenio"} size={[12, 6, 4, 4]} />
                            <select.ProveedoresSelect id="Proveedor" size={[12, 6, 4, 4]} />
                            <Input id={"NSS"} size={[12, 6, 4, 4]} />
                        </Row>
                        <Row>
                            {(mostrar) ?
                                <EditSubcontrato />
                                :
                                <EditDestajo />
                            }
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
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <label.Entidad id={"TipoConvenio"} size={[12, 4, 4, 4]} />
                            <label.General id="Proveedor" size={[12, 4, 4, 4]} />
                            <Label id="NSS" size={[12, 4, 4, 4]} />
                        </Row>
                        <Row>
                            <Label id={"Representante"} size={[12, 6, 4, 4]} />
                            <Label id={"RFC"} size={[12, 6, 4, 4]} />
                            <label.Entidad id="Regimen" size={[12, 4, 4, 4]} />
                        </Row>
                        <Row>
                            <Label id={"Direccion"} size={[12, 4, 4, 4]} />
                            <label.Entidad id="Asentamiento" size={[12, 4, 4, 4]} />
                        </Row>

                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};
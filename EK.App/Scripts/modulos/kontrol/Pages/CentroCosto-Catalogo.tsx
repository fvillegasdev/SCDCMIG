namespace EK.Modules.Kontrol.Pages.CentroCosto {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("centrocosto", "kontrol", []);
    let PAGE_ID = "Centro de Costos";

    interface IEditProps extends page.IProps {
        validacionPresupuesto?: DataElement;
    };

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("Clasificadores")
                .addObject("ValidacionPresupuesto")
                .addNumber("MontoGlobal")
                .addEstatus()
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

    let Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.validacionPresupuesto = Forms.getDataValue("ValidacionPresupuesto", config.id, state);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IEditProps) {
            if (global.hasChanged(this.props.validacionPresupuesto, nextProps.validacionPresupuesto)) {
                if (global.isSuccessful(nextProps.validacionPresupuesto)) {
                    let validacionPresupuesto: any = global.getData(nextProps.validacionPresupuesto);
                    if (validacionPresupuesto) {
                        if (validacionPresupuesto.Clave !== "VPG") {
                            Forms.updateFormElement(config.id, "MontoGlobal", 0);
                        }
                    }
                };
            };
        };
        render(): JSX.Element {
            let validacionGlobal: boolean;

            if (global.isSuccessful(this.props.validacionPresupuesto)) {
                let validacionPresupuesto: any = global.getData(this.props.validacionPresupuesto);
                if (validacionPresupuesto) {
                    if (validacionPresupuesto.Clave === "VPG") {
                        validacionGlobal = true;
                    };
                };
            };

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 3, 3, 3]} maxLength={50} />
                            <input.Nombre size={[12, 7, 7, 7]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <ValidacionPresupuestoDDL size={[2, 6, 4, 4]} addNewItem={"SO"} required={true} validations={[validations.required()]} />
                            {validacionGlobal === true ? <input.Integer id="MontoGlobal" size={[12, 6, 4, 4]} maxLength={50} /> : null}
                        </Row>
                        <Row style={{ marginTop: 12 }}>
                            <clasificadores.section customEntityType="CC" size={[12, 10, 10, 10]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    const View: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let validacionGlobal: boolean;

            if (global.isSuccessful(this.props.entidad)) {
                let validacionPresupuesto: any = global.getData(this.props.entidad).ValidacionPresupuesto;
                if (validacionPresupuesto) {
                    if (validacionPresupuesto.Clave === "VPG") {
                        validacionGlobal = true;
                    };
                };
            };

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 3, 3, 3]} />
                            <label.Nombre size={[12, 7, 7, 7]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                        </Row>
                        <Row>
                            <label.Entidad id="ValidacionPresupuesto" size={[12, 6, 4, 4]} />
                            {validacionGlobal === true ? <Label id={"MontoGlobal"} size={[12, 6, 4, 4]} /> : null}
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <clasificadores.section customEntityType="CC" size={[12, 10, 10, 10]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
};
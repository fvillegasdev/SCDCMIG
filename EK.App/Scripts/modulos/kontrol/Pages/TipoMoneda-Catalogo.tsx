namespace EK.Modules.Kontrol.Pages.Monedas {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("monedas", "kontrol");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addNumber("DecimalDigits")
                .addString("DecimalSeparator")
                .addString("GroupSeparator")
                .addString("MoneySymbol")
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
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-money"  title={"Moneda"} collapsed={false} hideCollapseButton={true}>
                            <input.Clave size={[12, 2, 2, 2]} />
                            <input.Nombre size={[12, 3, 3, 3]} />
                            <input.Integer id="DecimalDigits" size={[6, 2, 2, 2]} className="center" />
                            <input.Text id="DecimalSeparator" size={[6, 2, 2, 2]} className="input-one-char" />
                            <input.Text id="GroupSeparator" size={[6, 2, 2, 2]} className="input-one-char" />
                            <input.Text id="MoneySymbol" size={[6, 2, 2, 2]} className="input-one-char" label="Símbolo"/>
                            <checkBox.Status size={[6, 6, 1, 1]} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-money" title={"Moneda"} collapsed={false} hideCollapseButton={true}>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 3, 3, 3]} />
                            <label.Label id="DecimalDigits" size={[6, 2, 2, 2]}  />
                            <label.Label id="DecimalSeparator" size={[6, 2, 2, 2]}  />
                            <label.Label id="GroupSeparator" size={[6, 2, 2, 2]} />
                            <label.Label id="MoneySymbol" size={[6, 2, 2, 2]} label="Símbolo" />
                            <label.Estatus id="Estatus" size={[6,6 , 1, 1]} />
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        };
    };
};
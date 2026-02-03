namespace EK.Modules.Kontrol.Pages.Dominios {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("dominios", "kontrol");
    let PAGE_ID = "Dominios"

    export class Edicion extends page.Base {

        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addDate("VigenciaInicio")
                .addDate("VigenciaFinal")
                .addBoolean("Bloqueado")
                .addObject("Imagen")
                .addObject("TimeZone")
                .addEstatus()
                .addVersion()
                .toObject();

            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <PageButtons>
                    <LicenciaButton />
                </PageButtons>
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
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-building" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 3, 3, 3]}>
                                <ImageManager id={"Imagen"} modulo={config.id} viewMode={false} />
                            </Column>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 4, 4]} />
                            <checkBox.Status size={[12, 6, 1, 1]} />
                            <checkBox.Blocked size={[12, 2, 1, 1]} />
                            <input.Date id="VigenciaInicio" size={[6, 6, 2, 2]} validations={[
                                validations.required(),
                                validations.lessEqualThan("VigenciaFinal", "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")
                            ]} />
                            <input.Date id="VigenciaFinal" size={[6, 6, 2, 2]}
                                validations={[
                                    validations.required(),
                                    validations.greaterEqualThan("VigenciaInicio", "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")
                                ]} />
                            <ZonaHorariaDDL size={[12, 12, 5, 5 ]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-building" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                            <label.Boolean id="Bloqueado" size={[12, 12, 2, 2]} />
                            <label.Fecha id="VigenciaInicio" size={[6, 6, 3, 3]} />
                            <label.Fecha id="VigenciaFinal" size={[6, 6, 3, 3]} />
                            <label.Entidad id="TimeZone" size={[12, 12, 6, 6]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]}>
                    <KontrolFileManager modulo={config.id} viewMode={false} multiple={true} />
                </Column>
            </page.View>;
        };
    };
    interface ILicenciaButtonProps extends EK.UX.Buttons.IButtonProps, page.IProps {
    };
    class LicenciaButton extends React.Component<ILicenciaButtonProps, {}> {
        constructor(props: ILicenciaButtonProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };
        onShow(): void {
        };
        render(): JSX.Element {
            return <Button onClick={this.onShow} icon="fas fa-passport" className="btn-default-ek btn-sm" color="white"></Button>;
        }
    };
};
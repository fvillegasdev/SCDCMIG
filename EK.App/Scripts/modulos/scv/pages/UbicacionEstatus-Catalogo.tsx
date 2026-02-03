namespace EK.Modules.SCV.Pages.UbicacionEstatus {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("ubicacionEstatus", "scv");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addObject("Naturaleza")
                .addBoolean("Sistema")
                .addNombre()
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
            let ml: any = config.getML();

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={"EstatusUbicacion"}
                        subTitle={"Estatus de Ubicación"}
                        icon="fas fa-home" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 12, 5, 5]} />
                            <NaturalezaUbicacionesPDDL size={[12, 3, 3, 3]} addNewItem={"SO"} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
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
                        id={"EstatusUbicacion"}
                        subTitle={"Estatus de Ubicación"}
                        icon="fas fa-home" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 5, 5, 5]} />
                            <label.Entidad size={[12, 3, 3, 3]} id="Naturaleza" />

                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };


    export let NaturalezaUbicacionesPDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.NATURALEZAUBICACIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Naturaleza",
            items: createDefaultStoreObject([]),
            label: "Naturaleza",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::NATURALEZAUBICACIONES", "catalogos/get(NATURALEZAUBI)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

};

namespace EK.Modules.SCV.Pages.categoriasBitacora {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tipoElementoBitacora", "scv");
    let PAGE_ID = "Categorías Bitácora"

    interface ICategoriaBitacora extends page.IProps {
        entidad?: any;
    };
    export const Edicion: any = global.connect(class extends React.Component<ICategoriaBitacora, ICategoriaBitacora> {
        constructor(props: ICategoriaBitacora) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("Origen")
                .add("Icono")
                .add("Color")
                .addEstatus()
                .addVersion()
                .toObject();
            config.dispatchEntityBase(model, "base/kontrol/bitacora/get/SaveEvents", undefined, global.HttpMethod.PUT);
            return null;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            let parametros: any = global.encodeParameters({ id });
            global.dispatchAsync("global-current-entity", "base/kontrol/bitacora/Get/GetByEventoBitacora/" + parametros);
        };
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});
        };
        onDelete(id: any, props: page.IProps): void {
            let parametros: any = global.encodeParameters({ id });
            global.dispatchAsync("global-current-entity", "base/kontrol/bitacora/Get/DeleteEventoBitacora/" + parametros);
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let claveEntidad: string = entidad.Origen && entidad.Origen.ID > 0 ? entidad.Origen.Clave : "";
            let acciones: boolean = claveEntidad == 'GS' ? false : true;

            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
                onWillEntityLoad={this.onWillEntityLoad} onEntitySaved={this.onEntitySaved} onDelete={this.onDelete}
                allowDelete={acciones} allowSave={acciones} allowEdit={acciones}>
                <View />
                <Edit />
            </page.Main>;
        };
    });
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fab fa-elementor"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 6, 2, 2]} />
                            <input.Nombre size={[12, 6, 6, 6]} />
                            <ColorInput id={"Color"} size={[12, 12, 2, 2]} />
                            <checkBox.Status size={[6, 6, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    let View: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        render(): JSX.Element {
            let colorFondo: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Color : "";
            return <page.View>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fab fa-elementor"
                         collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 6, 6, 6]} />
                            {colorFondo != "" ?
                                <label.Label id={"Color"} valueStyle={{ backgroundColor: colorFondo, color: colorFondo }} size={[12, 2, 2, 2]} /> :
                                <label.Label id={"Color"}  size={[12, 2, 2, 2]} />
                            }
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
};
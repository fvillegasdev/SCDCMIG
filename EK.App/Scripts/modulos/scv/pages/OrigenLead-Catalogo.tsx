namespace EK.Modules.SCV.Pages.OrigenLead {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("OrigenLead", "scv");

    export const Edicion: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Catalogo")
                .addClave()
                .addNombre()
                .addString("Icono")
                .addString("Color")
                .addString("BGColor")
                .addBoolean("Sistema")
                .addEstatus()
                .addVersion()
                .toObject();

            if (model.Catalogo !== null || model.Catalogo !== undefined) {
                let catalogo: any = {
                    ID: 0, Clave: config.id, Nombre: ""
                };
                model.Catalogo = catalogo;
            };
            config.dispatchEntityBase(model, "base/kontrol/CGValores/save", undefined, global.HttpMethod.PUT);
            return null;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            config.dispatchEntityBase({ id }, "base/kontrol/CGValores/id/", undefined, global.HttpMethod.POST);
        };
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});
        };
        onDelete(id: any, props: page.IProps): void
        {
            dispatchAsyncPut("global-current-entity", "/base/kontrol/CGValores/Delete/", { id });
        };
        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);

            let allowDelete: boolean = entidad && entidad.ID && entidad.Sistema == true ? false : true;
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onSave={this.saveForm}
                onWillEntityLoad={this.onWillEntityLoad}
                onEntitySaved={this.onEntitySaved}
                onDelete={this.onDelete}
                allowDelete={allowDelete}>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    let Edit: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        render(): JSX.Element {

            let color: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Color : "";
            let colorFondo: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).BGColor : "";
            let icono: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Icono : "";

            let estiloPersonalizado: React.CSSProperties = {
                color: color != "" ? color : "black",
                backgroundColor: colorFondo != "" ? colorFondo : "black",
                fontSize: "42px",
                margin: "22px 25px 25px 35px"
            };

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={config.id}
                        level="main"
                        subTitle={"Origen Lead"}
                        icon="fa fa-industry" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 5, 5, 5]} />
                            <ColorInput id={"Color"} size={[12, 1, 1, 1]} />
                            <ColorInput id={"BGColor"} size={[12, 1, 1, 1]} />

                            <Column size={[12, 12, 1, 1]}>
                                <span style={estiloPersonalizado} className={icono}></span>
                            </Column>

                            <checkBox.Status size={[6, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    let View: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        render(): JSX.Element {

            let color: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Color : "";

            let colorFondo: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).BGColor : "";

            let icono: any = isSuccessful(this.props.entidad) ? getData(this.props.entidad).Icono : "";


            let estiloPersonalizado: React.CSSProperties = {
                color: color != "" ? color : "black",
                backgroundColor: colorFondo != "" ? colorFondo : "black",
                fontSize: "42px",
                margin: "22px 25px 25px 35px"
            };

            return <page.View>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={config.id}
                        level="main"
                        subTitle={"Origen Lead"}
                        icon="fa fa-industry" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 5, 5]} />

                            {color != "" ?
                                <label.Label id={"Color"} valueStyle={{ backgroundColor: color, color: color }} size={[12, 1, 1, 1]} /> :
                                <label.Label id={"Color"} size={[12, 1, 1, 1]} />
                            }

                            {colorFondo != "" ?
                                <label.Label id={"BGColor"} valueStyle={{ backgroundColor: colorFondo, color: colorFondo }} size={[12, 1, 1, 1]} /> :
                                <label.Label id={"BGColor"} size={[12, 1, 1, 1]} />
                            }


                            <Column size={[12, 12, 1, 1]}>
                                <span style={estiloPersonalizado} className={icono}></span>
                            </Column>
                            <label.Estatus id="Estatus" size={[6, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
}
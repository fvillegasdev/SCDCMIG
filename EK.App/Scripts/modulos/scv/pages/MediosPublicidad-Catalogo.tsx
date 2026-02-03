namespace EK.Modules.SCV.Pages.MediosPublicidad {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("mediosPublicidad", "scv");
    let PAGE_ID = "Medios de Publicidad";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Catalogo")
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .addString("Icono")
                .addString("Color")
                .addString("BGColor")
                .toObject();
            if (model.Catalogo == undefined) {
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
        onDelete(id: any, props: page.IProps): void {
            dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onWillEntityLoad={this.onWillEntityLoad} onEntitySaved={this.onEntitySaved} onDelete={this.onDelete}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
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
                        collapsed={false} hideCollapseButton={true}>
                        <Row>

                            <input.Clave size={[12, 12, 2, 2]} />
                            <input.Nombre size={[12, 4, 4, 4]} />
                            <input.Descripcion id="Icono" size={[12, 2, 2, 2]} />
                            <ColorInput id={"Color"} size={[12, 1, 1, 1]} />
                            <ColorInput id={"BGColor"} size={[12, 1, 1, 1]} />
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
                        collapsed={false} hideCollapseButton={true}>
                        <Row>

                            <Column size={[12, 12, 1, 1]}>
                                <span style={estiloPersonalizado} className={icono}></span>
                            </Column>

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


                            <label.Estatus id="Estatus" size={[6, 2, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });


};
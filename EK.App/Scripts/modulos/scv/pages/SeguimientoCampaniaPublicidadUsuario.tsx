// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoCampaniaPublicidadUsuario {
    "use strict";

    let PAGEUSERTAB_ID = "SeguimientoCampaniaPublicidadUsuario";
    let PAGEUSERSECTION_ID = "SeguimientoCampaniaPublicidadUsuarioSection";
    let SECTIONTITLE_ID = "Campaña Publicidad";

    const config: page.IPageConfig = global.createPageConfig("SeguimientoCampaniaPublicidadUsuario", "scv", [PAGEUSERSECTION_ID]);

    interface ISeguimientoCampaniaPublicidadUsuarioProps extends page.IProps, grid.IColumn {
        uso?: any;
        origen?: any;
    };

    export class SeguimientoCampaniaPublicidadUsuarioComponent extends React.Component<ISeguimientoCampaniaPublicidadUsuarioProps, {}> {
        constructor(props: ISeguimientoCampaniaPublicidadUsuarioProps) {
            super(props);
        };
        componentDidMount(): void {
        };

        render(): JSX.Element {
            return <Column
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <View />
            </Column>
        }

    };

    interface IView extends page.IProps {
        item: DataElement;
        entidad?: DataElement;
        campanias?: DataElement;
    }

    export const View: any = global.connect(class extends React.Component<IView, IView> {
        constructor(props: IView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            data: state.global.CampaniaUsuario,
            entidad: getData(state.global.currentEntity),
            campanias: state.global.CampaniaUsuario
        });

        render(): JSX.Element {
            return <page.OptionSection
                id={PAGEUSERSECTION_ID}
                subTitle={SECTIONTITLE_ID}
                icon="fas fa-th-list" collapsed={false} hideCollapseButton={true} level={1} >
                <div>
                    <List
                        items={getData(this.props.campanias)}
                        readonly={true}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column>
                                    <Row>
                                        <Column>
                                            <label.HTML id="Contenido" isHTML={true} value={item.Contenido} valueStyle={{ paddingLeft: 0, paddingRight: 0, backgroundColor: "#FFFFFF" }} />
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>;
                        }}
                    />
                </div>
            </page.OptionSection>
        };
    });

};
import SeguimientoCampaniaPublicidadUsuarioTemplate = EK.Modules.SCV.Pages.SeguimientoCampaniaPublicidadUsuario.SeguimientoCampaniaPublicidadUsuarioComponent;
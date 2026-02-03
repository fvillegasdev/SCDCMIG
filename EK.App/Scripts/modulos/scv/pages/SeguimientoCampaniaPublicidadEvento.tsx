// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoCampaniaPublicidadEvento {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("SeguimientoCampaniaPublicidadEvento", "scv");
    let EVENTO_ID = "SeguimientoCampaniaPublicidadEvento";
    let EVENTO_TITLE = "Evento Detalle";

    interface ISeguimientoCampaniaPublicidadEventoProps extends page.IProps, grid.IColumn {
        uso?: any;
        origen?: any;
    };

    export class SeguimientoCampaniaPublicidadEventoComponent extends React.Component<ISeguimientoCampaniaPublicidadEventoProps, {}> {
        constructor(props: ISeguimientoCampaniaPublicidadEventoProps) {
            super(props);
        };
        componentDidMount(): void {
            //Cargamos Elementos del Item si tiene agregados
        };

        render(): JSX.Element {
            return <Column
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
            >
                <View />
            </Column>
        }

    };

    interface IView extends page.IProps {
        item: DataElement;
        entidad?: DataElement;
        EVENTO?: DataElement;
    }

    export const View: any = global.connect(class extends React.Component<IView, IView> {
        constructor(props: IView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            entidad: getData(state.global.currentEntity),
            EVENTO: state.global.EVENTO
        });

        render(): JSX.Element {
            return <page.OptionSection
                id={EVENTO_ID}
                subTitle={EVENTO_TITLE}
                icon="fas fa-th-list" collapsed={false} hideCollapseButton={true} level={1} >
                <div>
                    <List
                        items={getData(this.props.EVENTO)}
                        readonly={true}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        listHeader={
                            <div key="listHeaderKey">
                                <Row>
                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"Nombre"}</Column>
                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"Correo"}</Column>
                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"Origen"}</Column>
                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"Primer Ocurrencia"}</Column>
                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"Ultima Ocurrencia"}</Column>
                                    <Column size={[2, 2, 2, 2]} className="list-center-header">{"Total"}</Column>
                                </Row>
                            </div>}
                        formatter={(index: number, item: any) => {
                            return <Row>
                                <Column>
                                    <Row>
                                        <Column size={[2, 2, 2, 2]} className="listItem-left-header"><span> {item.Evento.Nombre}  </span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span> {item.Evento.Email}   </span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span> {item.Evento.Origen}  </span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span>
                                            {global.formatDate(item.Evento.PrimerIngreso)}
                                        </span>
                                        </Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span>
                                            {global.formatDate(item.Evento.UltimoIngreso)}
                                        </span>
                                        </Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header"><span>{item.Evento.Clics}</span></Column>
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

import SeguimientoCampaniaEventosDetalleList = EK.Modules.SCV.Pages.SeguimientoCampaniaPublicidadEvento.SeguimientoCampaniaPublicidadEventoComponent;
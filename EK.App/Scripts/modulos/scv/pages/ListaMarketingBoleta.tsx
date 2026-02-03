// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.ListaMarketingBoleta {
    "use strict";
    const configModal: page.IPageConfig = global.createPageConfig("ListaMarketingBoleta", "scv"); 
    let BOLETA_ID = "Boleta Prospeccion";


    interface ILinkCheckListProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        uso?: any;
        origen?: any;
        //item:  any;
    };

    export class BoletaProspeccionModalBase extends React.Component<ILinkCheckListProps, {}> {
        constructor(props: ILinkCheckListProps) {
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
                style={this.props.style}>
                <View />
            </Column>
        }
    };

    interface IModalCheckProps extends page.IProps, grid.IColumn {
        onHide?: () => void;
        uso?: any;
        origen?: any;
    };

    interface IView extends page.IProps {
        item: DataElement;
        boleta?: DataElement;
        entidad?: DataElement;
    }

    export const View: any = global.connect(class extends React.Component<IView, IView> {
        constructor(props: IView) {
            super(props);
        }
        static props: any = (state: any) => ({
            config: page.props(state),
            boleta: state.global.catalogo$ListaBoleta,
            entidad: getData(state.global.currentEntity)
        });

        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={BOLETA_ID}
                        subTitle={"Boleta Prospección"}
                        icon="fas fa-th-list" collapsed={false} hideCollapseButton={true}>
                                <div>
                            <List
                                items={getData(this.props.boleta)}
                                            readonly={true}
                                            addRemoveButton={false}
                                            dragAndDrop={false}
                                            listHeader={
                                                <div key="listHeaderKey" style={{ padding: "0px 0px" }}>
                                                    <Row>
                                                        <Column size={[12, 2, 2, 1]} className="list-default-header">{"ID"}</Column>
                                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                                                        <Column size={[12, 1, 1, 2]} className="list-default-header">{"Apellido Paterno"}</Column>
                                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Apellido Materno"}</Column>
                                                        <Column size={[12, 1, 1, 2]} className="list-default-header">{"Email"}</Column>
                                                        <Column size={[12, 1, 1, 2]} className="list-default-header">{"Teléfono"}</Column>
                                                        <Column size={[12, 1, 1, 1]} className="list-default-header">{"Celular"}</Column>
                                                    </Row>
                                                </div>}
                                            formatter={(index: number, item: any) => {
                                                 let nombreCliente: any = item.Boleta ? item.Boleta.Nombre : null;
                                                return <Row>
                                                    <Column>
                                                        <Row>
                                                            <Column size={[12, 2, 2, 1]} ><span>{item.Boleta.ID}</span></Column>
                                                            <Column size={[12, 2, 2, 2]}><span> {item.Boleta.Nombre}</span></Column>
                                                            <Column size={[12, 1, 1, 2]}><span> {item.Boleta.ApellidoPaterno}</span></Column>
                                                            <Column size={[12, 1, 1, 2]}><span> {item.Boleta.ApellidoMaterno}</span></Column>
                                                            <Column size={[12, 1, 1, 2]}><span> {item.Boleta.Email}</span></Column>
                                                            <Column size={[12, 1, 1, 2]}><span> {item.Boleta.Telefono}</span></Column>
                                                            <Column size={[12, 1, 1, 1]}><span> {item.Boleta.Celular}</span></Column>
                                                        </Row>
                                                    </Column>
                                                </Row>;
                                            }} />
                                </div>
                    </page.OptionSection>
                </Column>
            </page.View >;
        };
    });


};


import ListaMarketingBoletaModal = EK.Modules.SCV.Pages.ListaMarketingBoleta.BoletaProspeccionModalBase;
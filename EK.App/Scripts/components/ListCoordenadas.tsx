namespace EK.UX {
    "use strict";
    let urlCoord: string = "Ubicaciones/UbicacionCoordenadas/";
    const ubicacionCoord: string = "UbicacionCoordenadas";
    const urlMap: string = "Desarrollos/GetLocations/"
    let mapUrl: string = "";
    const hdr_Coord: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12,12,12,12]} className="list-default-header">Coordenadas</Column>
            </Row>
        </div>;

    export interface IUbicacionCoordenadasProps extends React.Props<any> {
        IdUbicacion: number
        IdDesarrollo: number
        ViewBtn: boolean
    };
    export interface IUbicacionCoordState {

    };

    export class ListaCoordenadas extends React.Component<IUbicacionCoordenadasProps, {}>{
        constructor(props: IUbicacionCoordenadasProps) {
            super(props);
            mapUrl = "";
            mapUrl = urlMap + this.props.IdDesarrollo + "/" + this.props.IdUbicacion + "/null/false"  ;
        }

        static props: any = (state: any) => ({
            IdUbicacion: global.getDataID(state.global.currentEntity),
        	IdDesarrollo: global.getData(state.global.currentEntity).Desarrollo.ID
            //IdDesarrollo: global.getData(state.global.currentEntity).IdDesarrollo
        });
        componentWillReceiveProps(nextProps: IUbicacionCoordenadasProps) {
            if (this.props.IdUbicacion !== nextProps.IdUbicacion){
                //let params: string = global.encodeParameters({ ID: this.props.IdUbicacion });
                global.dispatchAsync("global-page-data", urlCoord + this.props.IdUbicacion, ubicacionCoord);
                mapUrl = "";
                mapUrl = urlMap + this.props.IdDesarrollo + "/" + this.props.IdUbicacion + "/null/false";
            }
        }
        componentDidMount() {
            if (this.props.IdUbicacion > 0) {
                //let params: string = global.encodeParameters({ ID: this.props.IdUbicacion });
                global.dispatchAsync("global-page-data", urlCoord + this.props.IdUbicacion, ubicacionCoord);
                mapUrl = "";
                mapUrl = urlMap + this.props.IdDesarrollo + "/" + this.props.IdUbicacion + "/null/false";
            } 
        };
        render(): JSX.Element {
            let showBtn: boolean = this.props.ViewBtn;
            return <page.SectionList
                id={ubicacionCoord}
                title={"Coordenadas"}
                icon="fa fa-table"
                size={[12, 12, 12, 12]}
                listHeader={hdr_Coord}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                viewButtons={ showBtn ?
                    <buttons.MapViewerButton url={mapUrl} iconOnly={true} showRelateLocation={true} className="btn-ico-ek white"/>
                    : null
                }
                formatter={(index: number, item: any) => {
                    //return <Row onClick={this.onClickElement} id={this.props.IdVista.toString()}>
                    return <Row>
                        <Column size={[12,12,12,12]} className="listItem-default-header">
                            <h6>{item.Coordenadas}</h6>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        }
    }
    export let ListCoordenadas: any = ReactRedux.connect(ListaCoordenadas.props, null)(ListaCoordenadas);
}

import ListCoordenadas = EK.UX.ListCoordenadas;
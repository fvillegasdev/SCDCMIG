namespace EK.UX {
    "use strict";
    let mapUrl: string = "Desarrollos/GetLocations/";
    const urlVistas: string = "base/kontrol/GISVistas/all/";
    const kontrol_Vistas: string = "VistasMapa";

    const HEADER_Vistas: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[2,2,2,2]} className="list-default-header">Clave Vista</Column>
                <Column size={[8,8,8,8]} className="list-default-header">Nombre Vista</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">Visualizar Mapa</Column>
            </Row>
        </div>;

    export interface IVistasMapaProps extends React.Props<any> {
        IdDesarrollo?: number;
        IdVista?: number;
        Sale: boolean;
        UpdGeo: boolean;
        level?: any;
        title?: any;
    };
    export interface IVistaMapaState {

    };

    export class VistaMapa extends React.Component<IVistasMapaProps, {}>{
        constructor(props: IVistasMapaProps) {
            super(props);
        }

        static props: any = (state: any) => ({
            IdDesarrollo: global.getDataID(state.global.currentEntity)
            //  var retValue: any = page.props(state);
            //retValue.tipoPersona = Forms.getValue("TipoPersona", config.id, state);
            //  return retValue;
        });

        static defaultProps: IVistasMapaProps = {
           level: 0 , 
           Sale: false,
           UpdGeo: false,
           title: 'Vista de Mapas'
        };

        componentWillReceiveProps(nextProps: IVistasMapaProps) {
            if (this.props.IdDesarrollo !== nextProps.IdDesarrollo){
                let params: string = global.encodeParameters({ activos: 1 });
                global.dispatchAsync("global-page-data", urlVistas + params, kontrol_Vistas);
            }
        }
        componentDidMount() {
            if (this.props.IdDesarrollo > 0) {
                let params: string = global.encodeParameters({ activos: 1 });
                global.dispatchAsync("global-page-data", urlVistas + params, kontrol_Vistas);
            } 
        };
        render(): JSX.Element {
            let urlMap: string;
            return <page.SectionList
                id={kontrol_Vistas}
                title={this.props.title}
                icon="fa fa-map-o"
                size={[12, 12, 12, 12]}
                level={this.props.level}
                listHeader={HEADER_Vistas}
                items={createSuccessfulStoreObject([])} readonly={false}
                addRemoveButton={false}
                formatter={(index: number, item: any) => {
                    //return <Row onClick={this.onClickElement} id={this.props.IdVista.toString()}>
                    urlMap = mapUrl + this.props.IdDesarrollo + '/null/' + item.ID + '/' + this.props.Sale;
                    return <Row>
                        <Column size={[2,2,2,2]} className="listItem-default-header">
                            <h5>{item.Clave}</h5>
                        </Column>
                        <Column size={[8,8,8,8]} className="listItem-default-header">
                            <h6>{item.Nombre}</h6>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                            
                            <EK.UX.Buttons.MapViewerButton url={urlMap} info={item}/>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        }
    }
    export let OptionVistasMap: any = ReactRedux.connect(VistaMapa.props, null)(VistaMapa);
}

import OptionVistasMap = EK.UX.OptionVistasMap;
namespace EK.UX.Map {
    "use strict";
    export interface IMapViewerProps extends React.Props<any> {
        config?: page.IPageConfig;
        entidad: DataElement;
        state?: DataElement;
        geolocalizacion: string;
        sourceUrl: string;
        onMapLocationClicked?: (clave: string) => void;
    };
    export interface IMapViewerState {
        geoLatLng: string;
        useLocation: boolean;
    };
    export class MapViewer extends React.Component<IMapViewerProps, IMapViewerState> {
        constructor(props: IMapViewerProps) {
            super(props);

            this.state = { useLocation: false, geoLatLng: this.props.geolocalizacion };
        };
        static props: any = (state: any) => {
            return {
                entidad: state.global.currentEntity,
                state: state.global.currentEntityState,
                geolocalizacion: ""// Forms.getValue("Geolocalizacion", config.id, state)
            };
        };
        componentDidMount(): any {
            if (this.props.geolocalizacion === null) {
                window["onMapLocationClicked"] = (p: any): any => {
                    if (this.props.onMapLocationClicked) {
                        this.props.onMapLocationClicked(p);
                    };
                };
            } else {
                window["onMapLocationChanged"] = (p: any): any => {
                    alert(p);
                };
            }

        };
        shouldComponentUpdate(nextProps: IMapViewerProps, nextState: IMapViewerProps): any {
            if (!(this.props.geolocalizacion) && this.props.geolocalizacion !== nextProps.geolocalizacion) {
                return true;
            };
            if (!(this.props.sourceUrl) && this.props.sourceUrl !== nextProps.sourceUrl) {
                return true;
            }
            return false;
        }
        componentWillReceiveProps(nextProps: IMapViewerProps): void {
        };
        render(): JSX.Element {

            return <iframe style={{ border: 0, width: "100%", height: 350 }}
                    src={this.props.sourceUrl} />
            
        }
    };

};

import Mapviewer = EK.UX.Map.MapViewer;
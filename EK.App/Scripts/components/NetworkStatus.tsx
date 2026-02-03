
namespace EK.UX {
    "use strict";

    interface INetworkStatus extends React.Props<any> {
        app?: any;
        page?: any;
        netStatus: any;
    };
    declare const Ping: any;

    let colorLatencia = {
        low: '#2ecc71',
        medium: '#f1c40f',
        high: '#c0392b',
        err: '#bdc3c7'
    }
    let wifiIcon: any;


    class NetworkStatus extends React.Component<INetworkStatus, {}> {
        constructor(props: INetworkStatus) {
            super(props);
            this.state = {
                color: '#bdc3c7', 
                latencia: 0
            }
            this.verificarLatenciaRed = this.verificarLatenciaRed.bind(this);
            // this.isInFavoritos = this.isInFavoritos.bind(this);
        };

        componentWillReceiveProps(nextProps: INetworkStatus): void {
            // if (wasUpdated(this.props.favoritos, nextProps.favoritos)) {
               // success("La lista de favoritos fué actualizada");
            //}
            // console.log(nextProps);
        };

        shouldComponentUpdate(nextProps: INetworkStatus, nextState: INetworkStatus) {
            return hasChanged(this.props.page, nextProps.page) ||
                hasChanged(this.props.netStatus, nextProps.netStatus);
            
        };

        verificarLatenciaRed() {
            
           this.checkStatusNet(true);
           setInterval(() => {
               this.checkStatusNet(false);
           }, 6000) 
               
        }

        checkStatusNet(firstRender: boolean) {
            let p = new Ping();
            p.ping("https://apps.gruporuba.com.mx/scdc", (err, data) => {
                if (firstRender) {
                    if (data <= 500) {
                        data = 1;
                    }
                    this.changeColor(data, err);
                    return;
                }
                this.changeColor(data, err);
            });
        }

        changeColor(latencia, error) {
            this.setState({ color: '#2ecc71' })
            let i = document.getElementById('wifiIconFont');
            if (error !== null) {
                i.style.color = colorLatencia.err;
                return;
            }
            if (latencia <= 30) {
                i.style.color = colorLatencia.low;
            } 
            if (latencia > 30 && latencia <= 60) {
                i.style.color = colorLatencia.medium;
            }
            if (latencia > 60) {
                i.style.color = colorLatencia.high;
            }
        }

        

        render(): JSX.Element {
            this.verificarLatenciaRed();
            return <li className="dropdown dropdown-extended dropdown-notification " id="header_notification_bar" >
                    <a>
                    <i className={'fas fa-wifi customFlashNetStatus'} style={{color:this.state['color'], transition: 'color 0.2s'}} id='wifiIconFont'></i>
                    </a>
                   </li>    
            };
        };
    
    const mapProps: any = (state: any): any => {
        return {
            page: state.global.page
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            agregarFavorito: (favorito: any): any => {
                dispatch(actionAsync({
                    action: "usuarios-favoritos-agregar",
                    type: HttpMethod.PUT,
                    url: "usuarios/favoritos/agregar",
                    data: favorito,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            },
            removerFavorito: (favorito: any): any => {
                dispatch(actionAsync({
                    action: "usuarios-favoritos-remover",
                    type: HttpMethod.PUT,
                    url: "usuarios/favoritos/remover",
                    data: favorito,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        };
    };

    export let NetStatusComponent: any = ReactRedux.connect(mapProps, {})(NetworkStatus);
};

import NetStatus = EK.UX.NetStatusComponent;
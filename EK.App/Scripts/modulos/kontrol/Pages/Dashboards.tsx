namespace EK.Modules.Kontrol.Pages.DashBoards {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Tableros", "kontrol");
    interface IPropsDashBoards extends page.IProps {
        DatosTableros?: DataElement;
        UserDashBoard?: any; 
       
    }

    interface IPropsDashBoardsState extends page.IProps {
    }
    export const Vista: any = global.connect(class extends React.Component<IPropsDashBoards, IPropsDashBoardsState>{
    constructor(props: IPropsDashBoards) {
            super(props);
            this.createDashBoard = this.createDashBoard.bind(this);
            this.onLinkClick = this.onLinkClick.bind(this);
        };

        static props: any = (state: any): any => ({
            config: global.createPageConfigFromState(state.global),
            state: state.global.currentEntityState ,
            item: state.global.catalogo$ItemsDashBoards,
            DatosTableros: EK.Store.getState().global.catalogo$ItemsDashBoards,
            UserDashBoard : getData(EK.Store.getState().global.app)['Me'].IdDashBoard
        });

        onLinkClick(valor: any, e: any): void {
            let encodedURL2: any = "usuarios/setDashBoard/" + valor;
            global.dispatchAsync("global-page-entity", encodedURL2, "dashBoardAsignado")
        };

        componentWillUpdate(nextProps: IPropsDashBoards, nextState: IPropsDashBoards): any {
            if (this.props.UserDashBoard > 0 ){
            };
        };

        onFilter(props: IPropsDashBoards, filters: any): void {
            let encodedParams: string = global.encodeParameters({ IdCliente: undefined, ClaveEstado: null, Fase: null });
        //    let encodedURL2: any = "SCV/Expedientes/DashBoard/TopGraficaEtapas/" + encodedParams;
         //   dispatchAsync("global-page-data", encodedURL2, "dashBoardTopGraficaEtapas");
            let encodedURL: any = "/base/kontrol/opciones/Get/GetDashBoards/"; 
            var pathRoute = global.getFullUrl(encodedURL, "");
            dispatchAsync("global-page-data", pathRoute, "ItemsDashBoards");
        };

        componentWillMount(): void {
            this.props.config.setState({ moduleView: false, isNew: true });
        };

        createDashBoard(): any {
            let retValue: any[] = [];

            if (isSuccessful(this.props.DatosTableros)) {
                let items: any = getData(this.props.DatosTableros);
                if (items.length > 0) { // nivel admin
                    for (var i = 0; i < items.length; i++) {
                        let idDashBoard: any = items[i].ID;
                        let idDashBoardUser: any = this.props.UserDashBoard;
                        let borderDashBoard: any = idDashBoard === idDashBoardUser ? 'ek-transform-selected selected ' : '';
                        retValue.push(<div key={"dashboards_" + idDashBoard} className="col-sm-4 col-md-4 col-xs-12 col-lg-4" style={{ padding: "2%" }}>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    {idDashBoard === idDashBoardUser ?
                                        <span className="badge badge-success pull-right ek-sombra  btn btn-circle btn-icon-only " style={{ marginRight: "-18px", marginTop: "-22px", backgroundColor: "rgb(25, 205, 117)", height: "25px", width: "25px" }}>
                                            <i className="glyphicon glyphicon-ok" style={{ fontSize: "16px" }}></i>
                                        </span> : null
                                    }
                                    <span className="caption-subject bold uppercase font-dark" style={{ color: "#9ea4aa" }}> {items[i].Opcion} </span>
                                    <span className="caption-helper">...</span>
                                    {idDashBoard === idDashBoardUser ?
                                        null
                                        :
                                        <a className="btn btn-circle btn-icon-only btn-default   pull-right btx-xs" href="#" onClick={(e) => this.onLinkClick(idDashBoard, e)} >
                                            <i className="glyphicon glyphicon-pushpin"></i>
                                        </a>
                                    }
                                    <a className="btn btn-circle btn-icon-only btn-default   pull-right btx-xs" href={"#" + items[i].Ruta}>
                                        <i className="fa fa-arrow-right"></i>
                                    </a>
                                </div>
                                <div className="panel-body">
                                    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12 flexWrap" style={{ display: "flex", marginTop: "15%", marginLeft: "4%" }}>
                                        <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6" style={{ marginBottom: "15%" }} >
                                            <i style={{ fontSize: "75px", color: "#23c6c8" }} className="fas fa-chart-line "></i>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6" style={{ marginBottom: "15%" }} >
                                            <i style={{ fontSize: "75px", color: "#dc3545" }} className="fas fa-chart-pie"></i>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6" style={{ marginBottom: "10%" }}>
                                            <i style={{ fontSize: "75px", color: "#1c84c6" }} className="fas fa-dharmachakra"></i>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6" style={{ marginBottom: "10%" }} >
                                            <i style={{ fontSize: "75px", color: "#1ab394" }} className="fas fa-chart-area"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>);
                    };
                };
            };
            return retValue;
        };

        render(): JSX.Element {
            let data: DataElement = this.props.DatosTableros;
            let resultado: any[] = [];
            let idDashBoardUser: any = this.props.UserDashBoard;

            if (isSuccessful(this.props.DatosTableros)) {
                let items: any = getData(this.props.DatosTableros);
                //f7a54a naranja
                //#009efb Azul
                //#23c6c8 !important
                let seleccionado: any = <span className="badge badge-success pull-right ek-sombra  btn btn-circle btn-icon-only floatingBadgeCheck " style={{ backgroundColor: "rgb(25, 205, 117)" }}>
                    <i className="glyphicon glyphicon-ok" style={{ fontSize: "16px" }}></i>
                </span>;

                items.forEach((value: any, index: number) => {
                    resultado.push(<div key={index} className="col-xs-11 col-sm-5 col-md-5 col-lg-3 borderRadius cuadricula">
                        <div key={index + "M"}>
                            {idDashBoardUser == value.ID ?
                                seleccionado : null}
                            <a style={{ marginTop: "1%" }} className=" floatingBadge btn btn-circle btn-icon-only btn-default   pull-right btx-xs" href={"#" + value.Ruta}>
                                <i className="fa fa-arrow-right"></i>
                            </a>
                            <div className=" col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <i className={value.Icono} style={{ fontSize: "5em" }}> </i>
                            </div>
                            <div className=" col-xs-8 col-sm-8 col-md-8 col-lg-8" style={{ marginTop:"1%" }}>
                                <span>{value.Opcion}</span>
                              
                            </div>
                        </div>
                    </div>);
                });
            }

            return <page.Main {...config} pageMode={PageMode.Vista} onFilter={this.onFilter}>
                <UpdateColumn info={data}>
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: "20px" }}>
                            {resultado}
                        </Column>
                    </Row>
                </UpdateColumn>
            </page.Main>;
        };

    });
};
namespace EK.Modules.SDC.Pages.TicketsClientes {
    "use strict";
    const TICKETS: string = "TicketsClientes";
    //const w: any = window;
    const config: page.IPageConfig = global.createPageConfig("dashboardDesarrolloComunitario", "sdc");



    interface ITicketsClientes extends page.IProps {
        ubicacion: any;
    };


    export let TicketsClientes: any = global.connect(class extends React.Component<ITicketsClientes, ITicketsClientes> {
        constructor(props: ITicketsClientes) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ubicacion = Forms.getValue("Ubicacion", config.id, state);
            return retValue;
        };

        obtenerInformacion(idUbicacion: number) {
            if (idUbicacion > 0) {
                dispatchAsync("global-page-data", "base/sdc/ticketsclientes/Get/GetAll/" + global.encodeParameters({ idUbicacion: idUbicacion }), TICKETS);
            } else {
                global.dispatchSuccessful("global-page-data", [], TICKETS);
            }
        }
        componentDidMount() {
            let ubicacion: any = this.props.ubicacion;
            this.obtenerInformacion(ubicacion.ID);
        }

        componentWillReceiveProps(nextProps: ITicketsClientes, nextState: ITicketsClientes): any {
            if (global.hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                let ubicacion: any = nextProps.ubicacion;
                this.obtenerInformacion(ubicacion.ID);
            };
        };

        onRowDClick(item: any): void { return null };

        render(): JSX.Element {
            let formatEstatusTickets: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let clave: string = data && data.Clave ? data.Clave : "";
                let retValue: any;
                switch (clave) {
                    case "R":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "P":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "N":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "F":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "C":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    default:
                        retValue = "";
                        break;
                }
                return retValue;
            };


            const formatMedioSolicitud: (data: any, type: any, row: any) => any = (data: any, type: any, row: any): any => {
                return <span className={data.Icono} title={data.Nombre} style={{ color: "#659be0" }}></span>
            };

            let formatCalificacionTicketsClientes: (data: any, type: any, row: any) => any = (data: any, type: any, row: any) => {
                let stars: number = data ? data : 0;
                let starsIcons: any[] = [];
                for (var i = 0; i < stars; i++) {
                    starsIcons.push(<span key={"fas_star_" + i} style={{ color: "rgb(241, 196, 15)" }}><span className="fas fa-star"></span></span>);
                };
                for (var i = starsIcons.length; i < 5; i++) {
                    starsIcons.push(<span key={"fas_star_" + i}><span className="far fa-star"></span></span>);
                };
                return <div style={{ textAlign: "center" }}>{starsIcons}</div>
            };


            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "ID", width: "80px", fixed: true })
                .add({ data: "MedioSolicitud", width: "80px", format: formatMedioSolicitud })
                .addDateFormat({ data: "FechaReporte", width: "80px" })
                .add({ data: "Calificacion", width: "110px", format: formatCalificacionTicketsClientes })
                .add({ data: "EstatusTicket", width: "110px", format: formatEstatusTickets })
                .add({ data: "ObservacionesCliente", width: "350px", format: formatEstatusTickets })
                .add({ data: "Observaciones", width: "350px", format: formatEstatusTickets })
                .toArray();

            return  <page.SectionListExtended
                id={TICKETS}
                parent={config.id}
                icon="fa fa-table"
                hideNewButton={true}
                size={[12, 6, 6, 6]}
                level={1}
                dtConfig={dtConfig}
                onRowDoubleClick={this.onRowDClick}
                readonly={true}
                items={createSuccessfulStoreObject([])} >
                <Row>
                    {Forms.getValue("idBlogPost", TICKETS) > 0 ?
                        <div>
                            <input.Text label="Comentario" id="Descripcion" idFormSection={TICKETS} size={[12, 12, 12, 12]} />
                        </div> :
                        <div>
                            <input.Text label="Nombre" id="Nombre" idFormSection={TICKETS} size={[12, 12, 12, 12]}  />
                            {/*<CategoriasBlogPostDDL idFormSection={TICKETS} size={[12, 6, 6, 6]} /> */}
                            <input.Text label="Comentario" id="Descripcion" idFormSection={TICKETS} size={[12, 12, 12, 12]} />
                        </div>
                    }


                </Row>
            </page.SectionListExtended >
        };
    })
};

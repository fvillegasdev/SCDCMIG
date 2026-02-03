namespace EK.Modules.SCV.Pages.postventa.RUBA.ModalAutorizarGerente {
    "use strict";
    const REPORTE_AUTORIZAR_INCIDENCIA: string = "reporte$authGerente";

    interface IModalPhotoViewerProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        IdFoto: any;
    };

    export let ModalAutorizarGerenteBase: any = global.connect(class extends React.Component<IModalPhotoViewerProps, {}> {
        constructor(props: IModalPhotoViewerProps) {
            super(props);
        };

        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalAutIncidencia {...this.props} />
            </Column>
        };
    });


    let ModalAutIncidencia: any = global.connect(class extends React.Component<IModalPhotoViewerProps, {}> {
        constructor(props: IModalPhotoViewerProps) {
            super(props);
        };

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig)
            //entidad: state.forms[SECTION_CONCEPTO_ID],
            //plaza: state.global.Plaza_Seleccionada,
            //data: global.getData(state.global.currentCatalogo),
            //stateSearching: global.getData(state.global.searchingDataState)
        });
        refs: {
            modal: Element;
        };

        onClose(): void {
            Forms.updateFormElement(REPORTE_AUTORIZAR_INCIDENCIA, "NoGerente", []);
            Forms.updateFormElement(REPORTE_AUTORIZAR_INCIDENCIA, "ClaveGerente", []);
            let modal: any = $("#ModalAutorizarIncidencia");
            modal.modal("hide");
        };

        AutorizarPartida(): void {
            let Incidencia = EK.Store.getState().global.IncidenciaAutorizar !== undefined ? EK.Store.getState().global.IncidenciaAutorizar.data : null;
            let form: EditForm = Forms.getForm(REPORTE_AUTORIZAR_INCIDENCIA);
            let CurrentUser: any = getData(EK.Store.getState().global.app).Me;
            let noValidar = CurrentUser.NivelUsuario === 84 ? true : false;
            let reporte = global.getData(EK.Store.getState().global.currentEntity);
            if (!noValidar) {
                if (form['NoGerente'] === undefined || form['NoGerente'].trim() === '' || form['ClaveGerente'] === undefined || form['ClaveGerente'].trim() === '') {
                    global.warning('Los dos campos son obligatorios');
                    return;

                }
            }
            //console.log(Incidencia);
            let params = 
            {
                AutorizarSinValidar: noValidar,
                NumeroUsuario: form['NoGerente'],
                ClaveUsuario: form['ClaveGerente'],
                Plaza:reporte.Ubicacion.Plaza.Clave,
                Cliente:reporte.Cliente.ID,
                Folio: reporte.ID,
                Incidencia: Incidencia.ID,
                FechaEntregaViv: reporte.FechaEntregaVivienda,
                VencimientoGarantia: Incidencia.TerminoGarantia,
                NoIncidencia: Incidencia.Partida,
                NivelAutorizador:"84,1"
            }
            
            global.asyncPost("scv/reportesFallas/AutorizarPartidasSinGarantia", params, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        console.log(Object.keys(data).length);
                        if (data !== null && data !== undefined && Object.keys(data).length>0) {
                            let incidenciasReporte = global.getData(EK.Store.getState().global.catalogo$reporte$fallas);
                            for (let i of incidenciasReporte) {
                                if (i.ID === data.ID) {
                                    i === data;
                                }
                            }
                            const REPORTE_FALLAS_ID: string = "reporte$fallas";
                            global.dispatchSuccessful("global-page-data", incidenciasReporte, REPORTE_FALLAS_ID);
                            Forms.updateFormElement(REPORTE_AUTORIZAR_INCIDENCIA, "NoGerente", []);
                            Forms.updateFormElement(REPORTE_AUTORIZAR_INCIDENCIA, "ClaveGerente", []);
                            let modal: any = $("#ModalAutorizarIncidencia");
                            modal.modal("hide");
                            global.success('La partida se autorizo correctamente');
                        } 
                        break;
                    case AsyncActionTypeEnum.loading:
                       
                        break;
                    case AsyncActionTypeEnum.failed:
                       
                        break;
                }
            });
        }

        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                <div>
                    <button type="button" onClick={this.AutorizarPartida} className="btn dark btn-outline btn-md blue">Autorizar</button>
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        };
        header(info: any): JSX.Element {

            return <div style={{background: '#FFAB00' }}>
                <span style={{ paddingRight: 10}}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };

        componentDidMount() {
            // dispatchAsyncPost("load::testNewValue", "CapturaFechaConstruccion/GetMotivosCancelacionFolio/",{ parametros: p });
            // dispatchAsyncPost("load::SPVMOTIVOS", "base/scv/ReportesFallas/Get/GetMotivosCancelacionFolio/");
            //dispatchAsyncPost("load::SPVMOTIVOS", "scv/reportesFallas/GetMotivosCancelacionFolio/");
        }

        render(): JSX.Element {
          
            let CurrentUser: any = getData(EK.Store.getState().global.app).Me;
            //console.log(CurrentUser);
            //let ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/unitpricesimage/" + EK.Store.getState().global.ImageValueURI.data : null;
            return <modal.Modal id="ModalAutorizarIncidencia" header={this.header("Autorizar incidencia")} style={{ width: '500px' }} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Column xs={{ size: 10 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 4, offset: 4 }}>
                    </Column>
                    {CurrentUser.NivelUsuario === 84 ?
                        <div className="alert alert-success">
                            <h3>Usuario autenticado <i className="fas fa-check"></i> </h3>
                        </div>:
                        <div>
                            <input.Text id="NoGerente" label="Numero de usuario" idFormSection={REPORTE_AUTORIZAR_INCIDENCIA} size={[6, 6, 6, 6]} />
                            <input.Password id="ClaveGerente" label="Clave" idFormSection={REPORTE_AUTORIZAR_INCIDENCIA} size={[6, 6, 6, 6]} />
                        </div> 
                        
                    }
                    

                </Row>
            </modal.Modal>
        }
    });


};

import ModalAutorizarIncidencia = EK.Modules.SCV.Pages.postventa.RUBA.ModalAutorizarGerente.ModalAutorizarGerenteBase;
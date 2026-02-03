namespace EK.Modules.SCV.Pages.postventa.RUBA.ModalArchivosEnt {
    "use strict";
    interface IModalArchivosEntProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        IdCte: any;
    };
    export let ArchivosEntregaModalBase: any = global.connect(class extends React.Component<IModalArchivosEntProps, {}> {
        constructor(props: IModalArchivosEntProps) {
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
                <ModalRenderArchivosEntrega {...this.props} />
            </Column>
        };
    });

    let ModalRenderArchivosEntrega: any = global.connect(class extends React.Component<IModalArchivosEntProps, {}> {
        constructor(props: IModalArchivosEntProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };

        onClose(): void {
            console.log('cerrar modal')
            let modal: any = $("#ModalRenderArchivosEntrega");
            modal.modal("hide");
        };

        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                <div>
                    <button type="button" onClick={this.onClose} className="btn dark btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        };
        header(info: any): JSX.Element {

            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };

        componentDidMount() {
            // dispatchAsyncPost("load::testNewValue", "CapturaFechaConstruccion/GetMotivosCancelacionFolio/",{ parametros: p });
            // dispatchAsyncPost("load::SPVMOTIVOS", "base/scv/ReportesFallas/Get/GetMotivosCancelacionFolio/");
            //dispatchAsyncPost("load::SPVMOTIVOS", "scv/reportesFallas/GetMotivosCancelacionFolio/");
        }
        //shouldComponentUpdate() {

        //}

        render(): JSX.Element {
            //console.log(this.props.IdFoto)
            //let ImgString = null;
            // //let tipo = EK.Store.getState().global.TipoViewer !== undefined ? EK.Store.getState().global.TipoViewer.data : null;
            //if (tipo !== null) {
            //    switch (tipo) {
            //       case 'PREREPORTE':
            //          ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? "kontrolFiles/GetByStorageCustom/PostVentaImageReports/partidas/" + EK.Store.getState().global.ImageValueURI.data + '/true': null;
            //         break;
            //     case 'REPORTE':
            // CAMBIAR RUTA DE PRODUCCION AL SUBIR
            //ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/UnitPricesImageVr/" + EK.Store.getState().global.ImageValueURI.data : null;
            //        ImgString = EK.Store.getState().global.ImageValueURI !== undefined ?  EK.Store.getState().global.ImageValueURI.data : null;
            //      break;
            //  case 'EXPEDIENTE':
            //      ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? EK.Store.getState().global.ImageValueURI.data + '/true' : null;
            //      break;
            //  }
            // }

            //console.log(tipo,ImgString)
            //EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/unitpricesimage/" + EK.Store.getState().global.ImageValueURI.data : null;
            return <modal.Modal id="ModalRenderArchivosEntrega" header={this.header("Visualizador de archivos de entrega")} style={{ width: '500px', marginTop: '-100px !important', paddingTop:'0px !important',background:'red !important' }} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Column xs={{ size: 12 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 12, offset: 0 }}
                        lg={{ size: 12, offset: 0 }}>
                        <Column style={{ height: '150px', width: '100 %', overflowY: 'scroll' }}>
                            <div id="loadingAttach" style={{ display: 'none' }}>
                                <Updating text="" />
                            </div>

                            <div id="loadedDataAttach" style={{ display: 'inherit' }}>
                                <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}></div>
                            </div>
                        </Column>

                      
                    </Column>
                   
                </Row>
                <Row>
                    <Column xs={{ size: 12 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 12, offset: 0 }}
                        lg={{ size: 12, offset: 0 }}>
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10, minHeight:'350px'}}>

                            <div id="loading2" style={{ display: 'none' }}>
                                <Updating text="" />
                            </div>
                            <div id="loadedDataRenderpdf" style={{ display: 'none' }}>
                               <div id="pdfviewer2" style={{ padding: '10px', background: '#dfe6e9', minHeight: '300px' }}></div>
                            </div>
                            <div id="loadedDataRenderImg" style={{ display: 'none', height:'350px', overflowX:'hidden', overflowY:'scroll'}}>
                                <img key={"ImgReportFallasArchivoAdj_00"} id="imgRenderArchAdj" alt="" src={null} style={{ width: "100%", height: "auto" }} />
                            </div>
                        </Column>
                    </Column>
                </Row>
            </modal.Modal>
        }
    });
}
import ModalArchivosEntregaRender = EK.Modules.SCV.Pages.postventa.RUBA.ModalArchivosEnt.ArchivosEntregaModalBase;

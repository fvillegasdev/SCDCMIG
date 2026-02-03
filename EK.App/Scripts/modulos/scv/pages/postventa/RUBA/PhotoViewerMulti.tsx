namespace EK.Modules.SCV.Pages.postventa.RUBA.PhotoViewerMulti {
    "use strict";

    interface IModalPhotoViewerProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        IdFoto: any;
    };

    export let MultiPhotoViewerModalBase: any = global.connect(class extends React.Component<IModalPhotoViewerProps, {}> {
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
                <ModalVerImagen {...this.props} />
            </Column>
        };
    });


    let ModalVerImagen: any = global.connect(class extends React.Component<IModalPhotoViewerProps, {}> {
        constructor(props: IModalPhotoViewerProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };

        onClose(): void {
            let modal: any = $("#ModalMultiPhotoViewer");
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

        prevImage(index) {
            let array = EK.Store.getState().global.ArrayImageValues.data;
            if (array.length > 1) {
                if (index - 1 < 0 ) {
                    index = array.length -1;
                } else {
                    index--;
                }
                let imageuri = array[index];
                dispatchSuccessful('load::ImageValueURI', imageuri);
                dispatchSuccessful('load::currentIndexImages', { valor: index })
                //console.log(index)
            }
        }

        nextImage(index) {
            let array = EK.Store.getState().global.ArrayImageValues.data;
            if (array.length > 1) {
                if (index + 2 > array.length) {
                    index = 0;
                } else {
                    index++;
                }
                let imageuri = array[index];
                dispatchSuccessful('load::ImageValueURI', imageuri);
                dispatchSuccessful('load::currentIndexImages', { valor: index })
                //console.log(index)
            }
        }

        render(): JSX.Element {
            //console.log(this.props.IdFoto)
            let ImgString = null;
            let index;
            let tipo = EK.Store.getState().global.TipoViewer !== undefined ? EK.Store.getState().global.TipoViewer.data : null;
            /*if (tipo !== null) {
                switch (tipo) {
                    case 'PREREPORTE':
                        ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? "kontrolFiles/GetByStorageCustom/PostVentaImageReports/partidas/" + EK.Store.getState().global.ImageValueURI.data + '/true': null;
                        break;
                    case 'REPORTE':
                        // CAMBIAR RUTA DE PRODUCCION AL SUBIR
                        //ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/UnitPricesImageVr/" + EK.Store.getState().global.ImageValueURI.data : null;
                        ImgString = EK.Store.getState().global.ImageValueURI !== undefined ?  EK.Store.getState().global.ImageValueURI.data : null;
                        break;
                    case 'EXPEDIENTE':
                        ImgString = EK.Store.getState().global.ImageValueURI !== undefined ? EK.Store.getState().global.ImageValueURI.data + '/true' : null;
                        break;
                }
            }*/
            ImgString = EK.Store.getState().global.ImageValueURI !== undefined ?  EK.Store.getState().global.ImageValueURI.data : null;
            index = EK.Store.getState().global.currentIndexImages !== undefined ? EK.Store.getState().global.currentIndexImages.data.valor : 0;
            let totalImagenes = EK.Store.getState().global.ArrayImageValues !== undefined ? EK.Store.getState().global.ArrayImageValues.data.length : 1;
            //console.log(tipo,ImgString)
            //EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/unitpricesimage/" + EK.Store.getState().global.ImageValueURI.data : null;
            return <modal.Modal id="ModalMultiPhotoViewer" header={this.header("Visualizador Imagenes")} style={{ minHeight:"600px"}} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Column xs={{ size: 2, offset: 5 }} style={{textAlign:"center"}}
                        sm={{ size: 2, offset: 5 }}
                        md={{ size: 2, offset: 5 }}
                        lg={{ size: 2, offset: 5 }} >
                        <h4> {index + 1} DE {totalImagenes} </h4>
                    </Column>
                </Row>
                <Row>
                    <Column xs={{ size: 1 }}
                        sm={{ size: 1 }}
                        md={{ size: 1 }}
                        lg={{ size: 1 }} >
                        <button className="btn btn-sm btn-success btn-block" onClick={()=> this.prevImage(index) } style={{height:"80px"}}>
                            <i className={"fas fa-chevron-left fa-2x"}></i>
                        </button>
                    </Column>
                    <Column xs={{ size: 10 }}
                        sm={{ size: 10 }}
                        md={{ size: 10 }}
                        lg={{ size: 10 }} style={{ background:"#ecf0f1"}}>
                        <img key={"ImgReportFallasMovil_00"} alt="" src={ImgString} style={{ width: "50%", height: "auto",display:"block", margin: "auto" }} />
                    </Column>
                    <Column xs={{ size: 1 }}
                        sm={{ size: 1 }}
                        md={{ size: 1 }}
                        lg={{ size: 1 }}>
                        <button className="btn btn-sm btn-success btn-block" onClick={() => this.nextImage(index)} style={{ height: "80px" }}>
                            <i className={"fas fa-chevron-right fa-2x"}></i>
                        </button>
                    </Column>
                </Row>
            </modal.Modal>
        }
    });


};

import ModalMultiPhotoViewer = EK.Modules.SCV.Pages.postventa.RUBA.PhotoViewerMulti.MultiPhotoViewerModalBase;
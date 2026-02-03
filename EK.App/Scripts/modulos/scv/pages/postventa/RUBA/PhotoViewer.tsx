namespace EK.Modules.SCV.Pages.postventa.RUBA.PhotoViewer {
    "use strict";

    interface IModalPhotoViewerProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        IdFoto: any;
        ImagePath?: string;
        TipoViewer?: string;
    };

    export let PhotoViewerModalBase: any = global.connect(class extends React.Component<IModalPhotoViewerProps, {}> {
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

        static props: any = (state: any) => ({
            ImagePath: state.global.ImageValueURI
            //TipoViewer: state.global.TipoViewer
        });

        refs: {
            modal: Element;
        };

        onClose(): void {
            let modal: any = $("#ModalPhotoViewer");
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

        //shouldComponentUpdate(nextProps: IModalPhotoViewerProps, { }): boolean {
        //    console.log(hasChanged(this.props.ImagePath, nextProps.ImagePath))
        //    return hasChanged(this.props.ImagePath, nextProps.ImagePath)
        //};

        render(): JSX.Element {
            //console.log(this.props.IdFoto)
            let ImgString = null;
            let tipo = EK.Store.getState().global.TipoViewer !== undefined ? EK.Store.getState().global.TipoViewer.data : null;
            if (tipo !== null) {
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
            }
            
            //console.log(tipo,ImgString)
            //EK.Store.getState().global.ImageValueURI !== undefined ? "Http://Apps.gruporuba.com.mx/unitpricesimage/" + EK.Store.getState().global.ImageValueURI.data : null;
            return <modal.Modal id="ModalPhotoViewer" header={this.header("Visualizador Imagenes")} style={{width:'500px'}} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <Column xs={{ size: 10 }}
                        sm={{ size: 4, offset: 4 }}
                        md={{ size: 4, offset: 4 }}
                        lg={{ size: 4, offset: 4 }}>
                        <img key={"ImgReportFallasMovil_00"} alt="" src={ImgString} style={{ width: "100%", height: "auto" }} />
                    </Column>
                </Row>
            </modal.Modal>
        }
    });


};

import ModalPhotoViewer = EK.Modules.SCV.Pages.postventa.RUBA.PhotoViewer.PhotoViewerModalBase;
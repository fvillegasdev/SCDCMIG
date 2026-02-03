namespace EK.Modules.SCV.Pages.postventa.RUBA.ModalPDFViewerRender {
    "use strict";

    interface IModalPDFViewerProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        IdCte: any;
    };

    export let PDFViewerModalBase: any = global.connect(class extends React.Component<IModalPDFViewerProps, {}> {
        constructor(props: IModalPDFViewerProps) {
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
                <ModalRenderPDF {...this.props} />
            </Column>
        };
    });


    let ModalRenderPDF: any = global.connect(class extends React.Component<IModalPDFViewerProps, {}> {
        constructor(props: IModalPDFViewerProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };

        onClose(): void {
            let modal: any = $("#ModalRenderPDFViewer");
            modal.modal("hide");
        };
        
        customFooter(): JSX.Element {
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
        }


        render(): JSX.Element {
          
            return <modal.Modal id="ModalRenderPDFViewer" header={this.header("Visualizador de expediente")} style={{ width: '500px' }} addDefaultCloseFooter={false} footer={this.customFooter()}>
                <Row>
                    <Column xs={{ size: 12 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 12, offset: 0 }}
                        lg={{ size: 12, offset: 0 }}>
                         <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                                
                                <div id="loading" style={{ display: 'none' }}>
                                    <Updating text="" />
                                </div>

                                <div id="loadedData" style={{ display: 'inherit' }}>
                                    <div id="pdfviewer" style={{ padding: '10px', background: '#dfe6e9', minHeight: '500px' }}>
                                    </div>
                                </div>

                            </Column>
                    </Column>
                </Row>
            </modal.Modal>
        }
    });


};

import ModalPDFViewers = EK.Modules.SCV.Pages.postventa.RUBA.ModalPDFViewerRender.PDFViewerModalBase;

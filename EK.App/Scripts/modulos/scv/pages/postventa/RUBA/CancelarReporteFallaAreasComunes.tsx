namespace EK.Modules.SCV.Pages.postventa.RUBA.CancelarFolioAreasComunes {
    "use strict";
    const REPORTE_ORDEN_TRABAJO_ID_MODAL: string = "reporte$ordenTrabajo";
    const PAGE_ID: string = "ReporteFallasAreasComunes";
    const DETALLES_CITA: string = "DetallesCita";
    const MOTIVO_CANCEL: string = "MotivosCancelacion";

    const listModalHeaderOrdenTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"ID Orden de Trabajo"}</Column>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Comentario"}</Column>
            </Row>
        </Column>

    interface IModalComentariosProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export let CancelarFolioModalBase: any = global.connect(class extends React.Component<IModalComentariosProps, {}> {
        constructor(props: IModalComentariosProps) {
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
                <ModalComentarios {...this.props} />
            </Column>
        };
    });


    let ModalComentarios: any = global.connect(class extends React.Component<IModalComentariosProps, {}> {
        constructor(props: IModalComentariosProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };

        onClose(): void {
            let modal: any = $("#ModalComentariosOT");
            modal.modal("hide");
        };
        onCancelarFolio() {
            // let motivo = 'PRUEBA MOTIVO';
            let fnClose = (motivoObj) => {
                console.log(motivoObj);
                if (motivoObj === undefined || motivoObj === null) {
                    global.warning("Seleccione un motivo de cancelacion");
                    return;
                }
                let id: number = getData(EK.Store.getState().global.currentEntity).ID
                let motivo = id + '|' + motivoObj.ID;
                global.dispatchAsyncPut("global-current-entity", "base/scv/ReporteFallasAreasComunes/GetBP/CancelaReporte", { motivo });
            };

            let Motivo: any = Forms.getValue("Motivo", MOTIVO_CANCEL);
            // console.log(Motivo);
            EK.Global.confirm("Desea cancelar el folio actual?", "Cancelar reporte", () => {
                fnClose(Motivo);
            });
        }
        footerPersonalized(): JSX.Element {
            return <div className="modal-footer">
                <div>
                    <button type="button" onClick={this.onCancelarFolio} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cancelar folio</button>

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
            dispatchAsyncPost("load::SPVMOTIVOS", "scv/reportesFallas/GetMotivosCancelacionFolio/");
        }

        render(): JSX.Element {
            return <modal.Modal id="ModalCancelarFolio" header={this.header("Cancelar folio")} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <label.Entidad id="Motivo" idForm={MOTIVO_CANCEL} label="Motivo" size={[12, 12, 12, 12]} /> :
                    <MotivosreprogDDL id="Motivo" idFormSection={MOTIVO_CANCEL} label="Motivo" size={[12, 12, 12, 12]} validations={[validations.required()]} required={true} />
                </Row>
            </modal.Modal>
        }
    });
};

import ModalCancelarFolioAreasComunes = EK.Modules.SCV.Pages.postventa.RUBA.CancelarFolioAreasComunes.CancelarFolioModalBase;
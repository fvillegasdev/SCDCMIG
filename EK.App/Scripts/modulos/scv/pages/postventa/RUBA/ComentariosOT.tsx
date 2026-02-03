namespace EK.Modules.SCV.Pages.postventa.RUBA.ComentariosOrdenesTrabajo {
    "use strict";
    const REPORTE_ORDEN_TRABAJO_ID_MODAL: string = "reporte$ordenTrabajo";
    const PAGE_ID: string = "ReportesFallas";

    const listModalHeaderOrdenTrabajo: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"ID Orden de Trabajo"}</Column>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Comentario"}</Column>
            </Row>
        </Column>

    const listModalHeaderOrdenTrabajoDetalle: JSX.Element =
        <Column size={[12, 12, 12, 12]} style={{padding:'10px',marginLeft:'10px'}}>
            <Row>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"No. Incidencia"}</Column>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Observaciones"}</Column>
            </Row>
        </Column>

    interface IModalComentariosProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export let ComentariosModalBase: any = global.connect(class extends React.Component<IModalComentariosProps, {}> {
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
            let modal: any = $("#modalComentariosOT");
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
        render(): JSX.Element {
            return <modal.Modal id="modalComentariosOT" header={this.header("Comentarios de Ordenes de trabajo")} addDefaultCloseFooter={false} footer={this.footerPersonalized()}>
                <Row>
                    <TablaComentarios />
                </Row>
            </modal.Modal>
        }
    });


    let TablaComentarios: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        };

        static props: any = (state: any) => ({
            entidad: state.global.currentEntity.data
        });

        onClose(): void {
            let modal: any = $("#modalComentariosOT");
            modal.modal("hide");
        };

        onRowDClick(item: any): void {
            return null;
        };

        render(): JSX.Element {
            let color: string = "#ff5e00";
            let className: string = "font-white";
            let OTs;
            let OTdetalles;
            try {
                OTs = this.props.entidad['OrdenesTrabajo'];
                OTdetalles = OTs.Partidas;
                //console.log(OTs, OTdetalles)
            } catch (ex) { }

            let formatFolio: (data: any, row: any) => any = (data: any, row: any): any => {
                let itemStyle: React.CSSProperties = {};
                if (row.IdFolio > 0) {
                    itemStyle.color = "#F44336";
                    itemStyle.fontWeight = "bolder";
                    return <span className="badge badge-info bold">{row.IdFolio}</span>;
                } else {
                    return null;
                }
            };
            let separador = "♪";
            let testString = "Texto con un elemento que servira como separador Este es el nuevo comentario que se colocara debajo del primero."
            let comentarios;
            return <Row style={{ padding: '10px' }}>
                <Column>
                    <List
                        items={OTs}
                        readonly={true}
                        listHeader={listModalHeaderOrdenTrabajo}
                        addRemoveButton={false}
                        formatter={(_index: number, item: any): any => {
                            
                            return <Row>
                                <Column size={[2, 2, 2, 2]} style={{ textAlign: 'center' }} className="listItem-default-item">{item.ID > 0 ? <span className="badge badge-info">{item.ID}</span> : "N/D"}</Column>
                                <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow">
                                    {
                                        item.Observaciones === null || item.Observaciones === undefined || item.Observaciones.trim() === '' ?
                                            'Sin Observaciones'
                                            :
                                            <span>
                                                {item.Observaciones.split(separador).length > 1 ?
                                                    <span>
                                                        <span className="bold">Comentario inicial: </span>
                                                        {item.Observaciones.split(separador)[0]}
                                                        <br />
                                                        <span className="bold">Comentario final: </span>
                                                        {item.Observaciones.split(separador)[1]}
                                                    </span>
                                                    :
                                                    <span>
                                                        <span className="bold">Comentario inicial: </span>
                                                        {item.Observaciones.split(separador)[0]}
                                                    </span>
                                                }
                                            </span>
                                    }

                                </Column> 
                                <Row style={{marginLeft:'10px'}}>
                                    <Column size={[12, 12, 12, 12]}>
                                        <List
                                            items={item.Partidas}
                                            readonly={true}
                                            listHeader={listModalHeaderOrdenTrabajoDetalle}
                                            addRemoveButton={false}
                                            formatter={(det_index: number, det_item: any): any => {
                                                //console.log(det_item)
                                                return <Row >
                                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: 'center' }} className="listItem-default-item">
                                                        {item.ID > 0 ?
                                                        <span className="badge badge-info">{det_item.Partida.Partida}</span> : "N/D"}
                                                    </Column>
                                                    <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow">
                                                        {det_item.Observaciones}
                                                    </Column> 
                                                </Row>
                                            }
                                          }
                                        />
                                    </Column>
                                </Row>
                            </Row>
                        }} />
                </Column>
            </Row>
        };
    });
};

import ModalComentariosOT = EK.Modules.SCV.Pages.postventa.RUBA.ComentariosOrdenesTrabajo.ComentariosModalBase;
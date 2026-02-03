namespace EK.Modules.SCV.Pages.postventa.RUBA.ClasificacionViviendaPendienteEntregaModal {
    const PAGE_ID: string = "ClasificacionViviendaPenModal";
    const SAVE_RESULT: string = "LoadSave"

    interface IModalProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        item: any;
    };
    export let ClasificacionModalCheck: any = global.connect(class extends React.Component<IModalProps, IModalProps>{
        constructor(props: IModalProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.item = EK.Store.getState().global.itemCheck;
            return retValue;
        };
        onShow(): void {
            let modalObj: any = $("#modalClasificacionCheck");
            modalObj.modal();
            modalObj.css("height", "auto");
        };
        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalCheck item={this.props.item} />
            </Column>
        }
    });
    interface IModalCheckProps extends page.IProps, grid.IColumn {
        onHide?: () => void;
        item: any;
        data: any;
    };


    let ModalCheck: any = global.connect(class extends React.Component<IModalCheckProps, {}> {
        constructor(props: IModalCheckProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.item = EK.Store.getState().global.itemCheck;
            return retValue;
        };
        refs: {
            modal: Element;
        };
        onCloseModal(): void {
            let modal: any = $("#modalClasificacionCheck");
            modal.modal("hide");
        }
        onSaveModal(): void {
            let item = getData(EK.Store.getState().global.itemCheck)
            let clasificador = Forms.getValue("ClasificadorVivienda", PAGE_ID)
            let Comentarios = Forms.getValue("Comentarios", PAGE_ID);
            let idClasificador;
            let sendData = {};
            
            let params = [] 
            for (let x of item) {
                if (x.IdClasificador > 0) {
                    idClasificador = x.IdClasificador
                    if (Comentarios === undefined) {
                        Comentarios = x.Comentarios
                    }
                } else {
                    idClasificador = 0;
                }
                params.push({
                        IdClasificador: idClasificador,
                        Numcte: x.IdCliente,
                        lote: x.Lote,
                        ClaveClasificador: clasificador.Clave,
                        Comentarios: Comentarios
                    })
            }
            global.dispatchAsyncPost(`load::${SAVE_RESULT}`, "base/kontrol/ClasificacionViviendaPen/GetBP/ClasificadorSave/", { parametros: params });
            console.log(params)
            success("Registro guardado", "Exito");
            let modal: any = $("#modalClasificacionCheck");
            modal.modal("hide");
        }
        header(): JSX.Element {
            return 
        };
        footerModal(): JSX.Element {
            let item = getData(EK.Store.getState().global.itemCheck);
            return <div className="modal-footer">
                {
                    <button type="button" onClick={this.onSaveModal} className="btn dark btn-outline btn-md blue">Guardar</button>
                }
                <button type="button" onClick={this.onCloseModal} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Cerrar</button>
            </div>;
        };
        render(): JSX.Element {
            return <modal.Modal id="modalClasificacionCheck" footer={this.footerModal()} >
                <div style={{
                    textAlign: 'center'}}>
                    <span >
                        <h5 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>Clasificación de vivienda pendiente de entrega</h5>
                    </span>
                </div>
                <Edit item={this.props.item} />
            </modal.Modal>
        }
    });

    interface IEdit extends page.IProps {
        item: DataElement;
        clasificador: any;
    }

    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.item = EK.Store.getState().global.itemCheck;
            return retValue;
        };
        render(): JSX.Element {
            let item = getData(this.props.item)
            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                    <div className="modal-body">
                        <br />
                        <br />
                        <br />
                        <br />
                        <page.OptionSection
                            id={PAGE_ID}
                            title="Información"
                            level={2}
                            icon="fa fa-info"
                            collapsed={false}
                            hideCollapseButton={false}>
                            <Row>
                                {
                                //<label.Label id="IdCliente" label={"No. Cliente"} value={item.IdCliente} size={[12, 12, 6, 6]} />
                                //<label.Label id="Cliente" label={"Nombre"} value={item.Nombre} size={[12, 12, 6, 6]} />
                                //<label.Label id="Fraccionamiento" label={"Fraccionamiento"} value={item.Fraccionamiento} size={[12, 12, 6, 6]} />
                                //<label.Label id="Direccion" label={"Dirección"} value={item.Direccion} size={[12, 12, 6, 6]} />
                                //<label.Label id="Etapa" label={"Etapa"} value={item.Etapa} size={[12, 12, 3, 3]} />
                                //<label.Label id="Manzana" label={"Manzana"} value={item.Manzana} size={[12, 12, 3, 3]} />
                                //<label.Label id="Lote" label={"Lote"} value={item.Lote} size={[12, 12, 3, 3]} />
                                //<label.Label id="NumInterior" label={"NÚMERO INTERIOR"} value={item.NumInterior} size={[12, 12, 3, 3]} />
                                //<label.Label id="NumExterior" label={"NÚMERO Exterior"} value={item.NumExterior} size={[12, 12, 3, 3]} />
                                //<label.Label id="FechaFirma" label={"Fecha Firma"} value={item.FechaFirma} size={[12, 12, 3, 3]} />
                                //
                                //    item.Cliente ?
                                //        <label.Label id="Clasificacion" label={"Clasificación"} value={"Cliente"} size={[12, 12, 6, 6]} /> :
                                //        item.Profeco ?
                                //            <label.Label id="Clasificacion" label={"Clasificación"} value={"Profeco"} size={[12, 12, 6, 6]} /> :
                                //            item.Produccion ?
                                //                <label.Label id="Clasificacion" label={"Clasificación"} value={"Producción"} size={[12, 12, 6, 6]} /> :
                                //                item.SCyDC ?
                                //                    <label.Label id="Clasificacion" label={"Clasificación"} value={"SCyDC"} size={[12, 12, 6, 6]} /> :
                                //                    item.Credito ?
                                //                        <label.Label id="Clasificacion" label={"Clasificación"} value={"Crédito"} size={[12, 12, 6, 6]} /> :
                                //                    item.Programacion ?
                                //                        <label.Label id="Clasificacion" label={"Clasificación"} value={"Programación"} size={[12, 12, 6, 6]} /> :
                                //                        null
                                //
                                //<label.Label id="Comentario" label={"Comentarios"} value={item.Comentarios} size={[12, 12, 12, 12]} />
                                }
                                <div id="datagroupContainer2" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                                {
                                //    <Column size={[12, 12, 2, 2]} style={{ padding: 10 }}>
                                //    <span className="dashboard-stat dashboard-stat-v2 red ek-sombra" style={{ backgroundColor: "rgb(241, 196, 15)" }}>
                                //        <div className="visual">
                                //            <i className="fas fa-home"></i>
                                //        </div>
                                //        <div className="details">
                                //            <div className="number">
                                //                <span className="counter" data-counter="counterup " data-value={item.Dias}>{item.Dias}</span>
                                //            </div>
                                //            <div className="desc"> Días Firma </div>
                                //        </div>
                                //    </span>
                                //</Column>
                                }

                                <TextArea id="Comentarios" label={"Comentarios"} idFormSection={PAGE_ID} rows={2} size={[12, 12, 12, 12]} />
                                <ddl.SPVClasificadorViviendaPendienteEntregaDDL id="ClasificadorVivienda" idFormSection={PAGE_ID} size={[12, 12, 12, 12]} selectAll={false} required={true} validations={[validations.required()]} />
                            </Row>
                            <br />
                        </page.OptionSection>

                    </div>
                </Column>
            </Column>;
        };
    });
}
import ClasificacionCheckModal = EK.Modules.SCV.Pages.postventa.RUBA.ClasificacionViviendaPendienteEntregaModal.ClasificacionModalCheck;


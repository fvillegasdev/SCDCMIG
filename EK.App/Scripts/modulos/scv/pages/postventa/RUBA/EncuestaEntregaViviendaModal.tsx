namespace EK.Modules.SCV.Pages.postventa.RUBA.EncuestaEntregaViviendaModal {
    const PAGE_ID: string = "EncuestaEntregaVivienda";
    const SAVE_RESULT: string = "LoadSaveEncuesta"
    let sinContestar = false;
    interface IModalProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        item: any;
    };
    const calificacion = (Pregunta, numeroPregunta) => {
        let qualifConvert = {
            Excelente: 5,
            Bueno: 4,
            Regular: 3,
            Malo: 2,
            Pesimo: 1,
            Excelente2: 5,
            Bueno2: 4,
            Regular2: 3,
            Malo2: 2,
            Pesimo2: 1,
            Excelente3: 5,
            Bueno3: 4,
            Regular3: 3,
            Malo3: 2,
            Pesimo3: 1,
            Si4: 1,
            No4: 0,
            Si5: 1,
            No5: 0,
            Si6: 1,
            No6: 0,
            NA6: 'No Aplica'
        }
        if (qualifConvert[Pregunta] === undefined) {
            sinContestar = true;
            warning("Favor de contestar la pregunta No. " + numeroPregunta, "Aviso")
            return
        }
        return qualifConvert[Pregunta];
    };
    export let EncuestaEV: any = global.connect(class extends React.Component<IModalProps, IModalProps>{
        constructor(props: IModalProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onShow(): void {
            let modalObj: any = $("#ModalEncuestaEntregaVivienda");
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
                <ModalEncuestaEntregaVivienda item={this.props.item} />
            </Column>
        }
    });

    interface IModalEncuesta extends page.IProps, grid.IColumn {
        onHide?: () => void;
        item: any;
        data: any;
    };    

    let ModalEncuestaEntregaVivienda: any = global.connect(class extends React.Component<IModalEncuesta, {}> {
        constructor(props: IModalEncuesta) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        refs: {
            modal: Element;
        };
        omitir(): void {
            let modal = $("#modalObservacionesEncuesta");
            modal.modal({ backdrop: 'static', keyboard: false });
            Forms.reset(PAGE_ID)
        }
        onSaveModal(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let P1 = calificacion(model.P1,1)
            let P2 = calificacion(model.P2,2)
            let P3 = calificacion(model.P3,3)
            let P4 = calificacion(model.P4,4)
            let P5 = calificacion(model.P5,5)
            let P6 = calificacion(model.P6,6)
            let porque1 = model.Porque1 || null;
            let porque2 = model.Porque2 || null;
            let porque4 = model.Porque4 || null;
            let porque5 = model.Porque5 || null;
            let NombreRef1 = model.NombreRef1 || null;
            let NombreRef2 = model.NombreRef2 || null;
            let TelRef1 = model.TelRef1 || null;
            let TelRef2 = model.TelRef2 || null;
            let cliente = +EK.Store.getState().global.catalogo$AgendaDetallesCitaResult.data[0].numcte;
            if (sinContestar) {
                sinContestar = false
                return;
            }
            let parametros = {
                CLIENTE: cliente,
                P1: P1,
                PORQUE1: porque1,
                P2: P2,
                PORQUE2: porque2,
                P3: P3,
                P4: P4,
                PORQUE4: porque4,
                P5: P5,
                PORQUE5: porque5,
                P6: P6,
                NOMBREREF1: NombreRef1,
                NOMBREREF2: NombreRef2,
                TELEFONOREF1: TelRef1,
                TELEFONOREF2: TelRef2,
                NOQUIZOCONTESTAR: 0,
                ENCUESTACERRADA: 1
            };
            console.log(parametros)
            let regexNum = /[0-9]/;
            let regexText = /[a-zA-Z]/;
            if (TelRef1 !== null && !regexNum.test(TelRef1)) {
                warning("Favor solo introducir numeros en el campo Telefono de la primera referencia", "Aviso");
                return;
            }
            if (TelRef2 !== null && !regexNum.test(TelRef2)) {
                warning("Favor solo introducir numeros en el campo Telefono de la segunda referencia", "Aviso");
                return;
            }
            if (NombreRef1 !== null && !regexText.test(NombreRef1)) {
                warning("Favor de introducir solo texto en el campo Nombre de la primera referencia", "Aviso");
                return;
            }
            if (NombreRef2 !== null && !regexText.test(NombreRef2)) {
                warning("Favor de introducir solo texto en el campo Nombre de la segunda referencia", "Aviso");
                return;
            }

            global.asyncPost("base/kontrol/ConfigViviendaEntregable/GetBP/EncuestaViviendaEntregable/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data === 0) {
                            success("Registro guardado", "Exito");
                            let modal: any = $("#ModalEncuestaEntregaVivienda");
                            modal.modal("hide");
                            Forms.reset(PAGE_ID);
                        } else {
                            warning("A ocurrido un error", "Aviso");
                            let modal: any = $("#ModalEncuestaEntregaVivienda");
                            modal.modal("hide");
                            Forms.reset(PAGE_ID);
                        }
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        break;
                }
            });
        }
        footerModal(): JSX.Element {
            return <div className="modal-footer">
                {
                    <button type="button" onClick={this.onSaveModal} className="btn dark btn-outline btn-md blue">Guardar</button>
                }
                <button type="button" onClick={this.omitir} className="btn dark btn-outline btn-md blue" data-dismiss="modal">Omitir</button>
            </div>;
        };
        render(): JSX.Element {
            return <modal.Modal id="ModalEncuestaEntregaVivienda" footer={this.footerModal()} addDefaultCloseFooter={false}>
                <div style={{ textAlign: "center" }}>
                    <span >
                        <h4 className="modal-title" style={{ display: "inline-block", padding: "0px 5px" }}>Encuesta Entrega de Vivienda</h4>
                    </span>
                </div>
                <Edit />
            </modal.Modal>
        }
    });
    interface IEdit extends page.IProps {
        item: DataElement;
    }

    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let item = getData(this.props.item)
            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                    <div className="modal-body">
                            <Row>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                            <h3>Experiencia</h3>
                                <h4>1 ¿Cómo califica la experiencia de la compra de su casa?</h4>
                                <RadioButton id="Excelente" label="Excelente" value="5" idFormSection={PAGE_ID} groupName="P1" size={[12, 12, 3, 3]} />
                                <RadioButton id="Bueno" label="Bueno" value="4" idFormSection={PAGE_ID} groupName="P1" size={[12, 12, 3, 3]} />
                                <RadioButton id="Regular" label="Regular" value="3" idFormSection={PAGE_ID} groupName="P1" size={[12, 12, 2, 2]} />
                                <RadioButton id="Malo" label="Malo" value="2" idFormSection={PAGE_ID} groupName="P1" size={[12, 12, 2, 2]} />
                                <RadioButton id="Pesimo" label="Pésimo" value="1" idFormSection={PAGE_ID} groupName="P1" size={[12, 12, 2, 2]} />
                                <input.Text id="Porque1" label="¿Por qué?" idFormSection={PAGE_ID} size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                            <h3>Entrega</h3>
                                <h4>2 ¿Cómo califica la entrega de su vivienda?</h4>
                                <RadioButton id="Excelente2" label="Excelente" value="5" idFormSection={PAGE_ID} groupName="P2" size={[12, 12, 3, 3]} />
                                <RadioButton id="Bueno2" label="Bueno" value="4" idFormSection={PAGE_ID} groupName="P2" size={[12, 12, 3, 3]} />
                                <RadioButton id="Regular2" label="Regular" value="3" idFormSection={PAGE_ID} groupName="P2" size={[12, 12, 2, 2]} />
                                <RadioButton id="Malo2" label="Malo" value="2" idFormSection={PAGE_ID} groupName="P2" size={[12, 12, 2, 2]} />
                                <RadioButton id="Pesimo2" label="Pésimo" value="1" idFormSection={PAGE_ID} groupName="P2" size={[12, 12, 2, 2]} />
                                <input.Text id="Porque2" label="¿Por qué?" idFormSection={PAGE_ID} size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                            <h3>Calidad</h3>
                                <h4>3 ¿En que condiciones encontró su vivienda?</h4>
                                <RadioButton id="Excelente3" label="Excelente" value="5" idFormSection={PAGE_ID} groupName="P3" size={[12, 12, 3, 3]} />
                                <RadioButton id="Bueno3" label="Bueno" value="4" idFormSection={PAGE_ID} groupName="P3" size={[12, 12, 3, 3]} />
                                <RadioButton id="Regular3" label="Regular" value="3" idFormSection={PAGE_ID} groupName="P3" size={[12, 12, 2, 2]} />
                                <RadioButton id="Malo3" label="Malo" value="2" idFormSection={PAGE_ID} groupName="P3" size={[12, 12, 2, 2]} />
                                <RadioButton id="Pesimo3" label="Pésimo" value="1" idFormSection={PAGE_ID} groupName="P3" size={[12, 12, 2, 2]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                                <h4>4 ¿Le quedó clara la información a cerca de su póliza de garantía?</h4>
                                <RadioButton id="Si4" label="Si" value="1" idFormSection={PAGE_ID} groupName="P4" size={[12, 12, 12, 12]} />
                                <RadioButton id="No4" label="No" value="0" idFormSection={PAGE_ID} groupName="P4" size={[12, 12, 12, 12]} />
                                <input.Text id="Porque4" label="¿Por qué?" idFormSection={PAGE_ID} size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                                <h4>5 ¿Le quedó claro el proceso para levantar un reporte de garantía en caso de ser necesario?</h4>
                                <RadioButton id="Si5" label="Si" value="1" idFormSection={PAGE_ID} groupName="P5" size={[12, 12, 12, 12]} />
                                <RadioButton id="No5" label="No" value="0" idFormSection={PAGE_ID} groupName="P5" size={[12, 12, 12, 12]} />
                                <input.Text id="Porque5" label="¿Por qué?" idFormSection={PAGE_ID} size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                                <h4>6 ¿Le quedó clara la información a cerca de la formación del comité vecinal y el programa CONVIVE?</h4>
                                <RadioButton id="Si6" label="Si" value="1" idFormSection={PAGE_ID} groupName="P6" size={[12, 12, 12, 12]} />
                                <RadioButton id="No6" label="No" value="0" idFormSection={PAGE_ID} groupName="P6" size={[12, 12, 12, 12]} />
                                <RadioButton id="NA6" label="No Aplica" value="0" idFormSection={PAGE_ID} groupName="P6" size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                                <h4>7 ¿Nos puede proporcionar dos referencias que esten interesados en adquirir vivienda?</h4>
                                <input.Text id="NombreRef1" label="Nombre" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} />
                                <input.Text id="TelRef1" label="Telefono" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} />
                                <input.Text id="NombreRef2" label="Nombre" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} />
                                <input.Text id="TelRef2" label="Telefono" idFormSection={PAGE_ID} size={[12, 12, 6, 6]} />
                            </Column>
                        </Row>
                    </div>
                </Column>
            </Column>;
        };
    });
}
import EncuestaEntegaVivienda = EK.Modules.SCV.Pages.postventa.RUBA.EncuestaEntregaViviendaModal.EncuestaEV;
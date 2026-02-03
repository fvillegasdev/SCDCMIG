namespace EK.Modules.SCV.Pages.postventa.RUBA.ViewDiagnosticateInfoCat {
    "use strict";
    const PAGE_ID: string = "ReportesFallas";
    const DIAGNOSTICATE_CAT_ID = "DiagnosticateCAT";
    //  const DIAGNOSTICATE_CAT_SECCION_ID = "DiagnosticateCAT$Seccion";
    const DIAGNOSTICATE_CAT_DETALLE_ID = "DiagnosticateCAT$Detalle";
    const DIAGNOSTICATE_CAT_UBICACION_ID = "DiagnosticateCAT$Ubicacion";
    const DIAGNOSTICATE_CAT_UBICACION_DETALLE_ID = "DiagnosticateCAT$Ubicacion$Detalle";
    const DIAGNOSTICATE_CAT_ETAPA_ID = "DiagnosticateCAT$Etapa";
    const DIAGNOSTICATE_CAT_ORIGEN_ID = "DiagnosticateCAT$Origen"

    const DIAGNOSTICATE_IMAGE: string = "reporte$diagnosticate$image";
    const DIAGNOSTICATE_NOTE: string = "reporte$diagnosticate$note"; 

    const listHeaderDiagnosticateImage: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[3, 3, 3, 3]} className="list-center-header">{"Creado por"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Fecha"}</Column>
                <Column size={[8, 8, 8, 8]} className="list-default-header">{"Foto"}</Column>
            </Row>
        </Column>; 

    const listHeaderDiagnosticateNote: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[3,3,3,3]} className="list-center-header">{"Creado por"}</Column>
                <Column size={[1,1,1,1]} className="list-default-header">{"Fecha"}</Column>
                <Column size={[8,8,8,8]} className="list-default-header">{"Nota"}</Column>
            </Row>
        </Column>; 

    interface IModalDiagnosticateCATProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
    };

    export let DiagnosticateCATModalBase: any = global.connect(class extends React.Component<IModalDiagnosticateCATProps, {}> {
        constructor(props: IModalDiagnosticateCATProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentDidMount(): void {
            let config: page.IPageConfig = global.assign({}, this.props.config);
            let slots: any[] = config.slots;
            let Modulo: string = this.props.modulo;
            //
            if (!config.hasSlot(DIAGNOSTICATE_IMAGE)) {
                if (!slots) {
                    slots = [];
                };
                slots.push(DIAGNOSTICATE_IMAGE);
                slots.push(DIAGNOSTICATE_NOTE);
            };

        };
        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalDiagnosticateCATSPV {...this.props} />
            </Column>
        };
    });


    let ModalDiagnosticateCATSPV: any = global.connect(class extends React.Component<IModalDiagnosticateCATProps, {}> {
        constructor(props: IModalDiagnosticateCATProps) {
            super(props);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalDiagnosticateCATProps = {};
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        onClose(): void {
            let modal: any = $("#modalDiagnosticateCATSPV");
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
            return <modal.Modal id="modalDiagnosticateCATSPV" header={this.header("Información del Diagnóstico CAT")} addDefaultCloseFooter={false} footer={this.footerPersonalized()} >
                <Row>
                    <Column style={{ marginTop : "-15px", overflowY: "auto", height: "400px", position: "relative" }} >
                        <div className="tabbable-line">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab_note_action" data-toggle="tab" aria-expanded="true">Notas</a>
                                </li>
                                <li className="">
                                    <a href="#tab_image_action" data-toggle="tab" aria-expanded="false"> Imágenes </a>
                                </li>
                            </ul>
                            <div className="tab-content" style={{ padding: 0 }}>
                                <div className="tab-pane active" id="tab_note_action">
                                    <ViewNote />
                                </div>
                                <div className="tab-pane" id="tab_image_action">
                                    <ViewImage />
                                </div>
                            </div>
                        </div>
                    </Column>
                </Row>
            </modal.Modal>
        }
    });

    interface IView extends page.IProps {
        item: DataElement;
    };


    let ViewImage: any = global.connect(class extends React.Component<IView, IView> {
        constructor(props: IView) {
            super(props);
            //this.onSaveModalLogBook = this.onSaveModalLogBook.bind(this);
        };
        static props: any = (state: any) => ({
            //entidad: state.global.currentEntity,
            //config: global.createPageConfigFromState(state.global),
            //cliente: Forms.getDataValue("Cliente", DIAGNOSTICATE_CAT_ID, state),
            //verComentarios: Forms.getDataValue("VerComentarios", DIAGNOSTICATE_CAT_ID, state),
            //ubicacion: state.global["entity$" + DIAGNOSTICATE_CAT_UBICACION_ID],
            //origen: state.global["entity$" + DIAGNOSTICATE_CAT_ORIGEN_ID],
            //ubicacionDetalle: state.global["entity$" + DIAGNOSTICATE_CAT_UBICACION_DETALLE_ID],
            //etapa: state.global["entity$" + DIAGNOSTICATE_CAT_ETAPA_ID],
        });
        onGetImagenes(itemImagenes: any): any {
            let retValue: any[] = [];
            let arrayImagenes: any[] = [];
            retValue.push(<img key={"ImgDiagnosticate_CAT_" + itemImagenes.ID} alt="" src={"scv/reportesFallas/GetFileDiagnosticateImageCAT/" + itemImagenes.ID } style={{ width: "120px", height: "120px", marginTop: "2px", marginLeft: "2px", position: "relative", display: "inline-flex" }} />);
            return retValue;
        };
        render(): JSX.Element {
            return <Row>
                <Column size={[12, 12, 12, 12]} style={{ marginTop: "15px" }}>
                    <page.View>
                        <page.SectionList
                            id={DIAGNOSTICATE_IMAGE}
                            parent={PAGE_ID}
                            icon="fal fa-image"
                            level={1}
                            listHeader={listHeaderDiagnosticateImage}
                            size={[12, 12, 12, 12]}
                            readonly={true}
                            horizontalScrolling={true}
                            selectable={true}
                            drawOddLine={true}
                            items={createSuccessfulStoreObject([])}
                            formatter={(index: number, item: any) => {
                                return <Row className="list-selectable-item">
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>{item.CreadoPor.Nombre}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>{item.Creado}</Column>
                                    <Column size={[8, 8, 8, 8]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>  <div> {this.onGetImagenes(item)}</div> </Column>
                                </Row>;
                            }}>
                        </page.SectionList>
                    </page.View>
                </Column>
            </Row>
        };
    });

    let ViewNote: any = global.connect(class extends React.Component<IView, IView> {
        render(): JSX.Element {
            return <Row>
                <Column size={[12, 12, 12, 12]} style={{ marginTop: "15px" }}>
                    <page.View>
                        <page.SectionList
                            id={DIAGNOSTICATE_NOTE}
                            parent={PAGE_ID}
                            icon="fal fa-clipboard"
                            level={1}
                            listHeader={listHeaderDiagnosticateNote}
                            size={[12, 12, 12, 12]}
                            readonly={true}
                            horizontalScrolling={true}
                            selectable={true}
                            drawOddLine={true}
                            items={createSuccessfulStoreObject([])}
                            formatter={(index: number, item: any) => {
                                return <Row className="list-selectable-item">
                                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>{item.CreadoPor.Nombre}</Column>
                                    <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>{item.Creado}</Column>
                                    <Column size={[8, 8, 8, 8]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>{item.Nota}</Column>
                                </Row>;
                            }}>
                        </page.SectionList>
                    </page.View>
                </Column>
            </Row>
        };
    });
    
};

import ModalDiagnosticateCATSPV = EK.Modules.SCV.Pages.postventa.RUBA.ViewDiagnosticateInfoCat.DiagnosticateCATModalBase;
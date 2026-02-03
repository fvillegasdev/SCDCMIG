// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
    "use strict";
    const PAGE_ID: string = "seguimientos";

    interface ISeguimientoDocumentoProps extends IBaseSeguimiento {
        obtenerCatalogo?: (id: number, idEtapa: number) => void;
        seguimiento?: any;
        documentos?: any;
        isNew?: boolean;
        global?: any;
        activarEdicion?: boolean;
    };

    export let SeguimientoDocumentos: any = global.connect(class extends React.Component<ISeguimientoDocumentoProps, {}> {
        constructor(props: ISeguimientoDocumentoProps) {
            super(props);
        };
        static defaultProps: ISeguimientoDocumentoProps = {
            global: {},
            isNew: false
        };
        static props: any = (state: any) => ({
            documentos: state.seguimientosReducer.documentos,
            seguimiento: state.seguimientosReducer.selected,
            etapa: state.seguimientosReducer.etapaSelected,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerCatalogo: (id: any, idEtapa: any): any => {
                dispatchAsync("scv-seguimientos-documentos", "SCV/Seguimientos/SeguimientoDocumentos/" + id + "/" + idEtapa);
            }
        });
        componentDidMount(): void {
            let id: number = Number(getData(this.props.seguimiento).ID);
            let idEtapa: number = 0;
            if (id > 0) {
                this.props.obtenerCatalogo(id, idEtapa);
            } else {
                dispatchFailed("scv-seguimientos-setSelected", null);
            }
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let current: any = this.props.documentos.data;
            let etapaSelected: any = global.getData(this.props.etapa);
            let estatusEtapa: any = global.assign({}, etapaSelected.EstatusEtapa);
            let existeEtapa: boolean = etapaSelected.ID > 0;
            let tituloEtapa: any = existeEtapa ? $page.form.section.etapas$Documentos.tituloindividual + "   (" + etapaSelected.Etapa.Nombre + ") " : $page.form.section.etapas$Documentos.titulototal;

            return <page.OptionSection title={tituloEtapa}
                icon="far fa-file" level={1} collapsed={false} readOnly={true}>
                <PanelUpdate info={this.props.documentos}>
                    <View documentos={this.props.documentos} editMode={this.props.activarEdicion} estatusEtapa={estatusEtapa} />
                </PanelUpdate>
            </page.OptionSection>
        }
    });

    interface IViewProps extends React.Props<any> {
        documentos?: global.DataElement;
        editMode?: boolean;
        estatusEtapa?: any;
        config?: page.IPageConfig;
    };

    class View$ extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let editMode: boolean = this.props.editMode;
            let estatusEtapa: any = this.props.estatusEtapa;

            let print: any = {
                icon: "fa fa-print",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    let documento: any = global.assign({}, item.Documento);
                    if (documento && documento.TipoDocumento) {
                        if (documento.TipoDocumento.Clave === "AUTO") {
                            let file: any = fileVersioning.getLatestVersion(id);
                            window.open([file.FilePath, "/true"].join(""), "_blank");
                        } else if (documento.TipoDocumento.Clave === "FORMATO") {
                            if (item.FormatoImpresion) {
                                window.open([item.FormatoImpresion.FilePath, "/true"].join(""), "_blank");
                            }
                        }
                    }
                }
            };
            //
            let download: any = {
                icon: "fa fa-download",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig, url: string) => {
                    let documento: any = global.assign({}, item.Documento);
                    if (documento && documento.TipoDocumento) {
                        if (documento.TipoDocumento.Clave === "AUTO") {
                            let file: any = fileVersioning.getLatestVersion(id);
                            window.open(file.FilePath, "_blank");
                        } else if (documento.TipoDocumento.Clave === "FORMATO") {
                            if (item.FormatoImpresion) {
                                window.open(item.FormatoImpresion.FilePath, "_blank");
                            }
                        }
                    }
                }
            };
            //
            let generate: any = {
                icon: "fas fa-sync",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) =>
                {
                    global.dispatchAsyncPut("global-page-entity", "SCV/Seguimientos/documentos/generate/", item, id);
                }
            };

            const listHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">{"Documento"}</Column>
                        <Column size={[5, 5, 5, 5]} className="list-default-header">{"Tipo Documento"}</Column>
                    </Row>
                </Column>
            
            return <div>
                <FadeInColumn>
                <List
                    items={this.props.documentos}
                    readonly={true}
                    addRemoveButton={false}
                    listHeader={listHeader}
                    formatter={(index: number, item: any) =>
                     {
                        let id: string = ["fileVersion$", (item.ID !== undefined && item.ID !== null ? item.ID : index)].join("");

                        let documento: any = global.assign({}, item.Documento);
                        let documentoTipo: any = global.assign({}, documento.TipoDocumento);
                        let requisito: any = item.RequisitoRelacionado;
                        let versions: any[] = fileVersioning.getCatalogo(id);
                        let versionsLength: boolean = versions && versions.length > 0;
                        let extraData: any[] = [];
                        let actions: any[] = [];
                       


                        if (documentoTipo.Clave === "AUTO")
                        {
                            //if (versionsLength === true)
                            //{
                              
                            //}
                            if (item.NDocumentos > 0) {


                                extraData.push(download);
                                actions.push(<span className="action-button" onClick={() => { window.open("kontrolFiles/getLastVersion/Download/" + item.ID, "_blank"); }}><EK.UX.Icon type={"fad fa-download"} /></span>);
                            }
                            else
                            {
                                extraData.push(download);
                                actions.push(<span style={{ color:"#BDBDBD" }} className="action-button"><EK.UX.Icon type={"fad fa-download"} /></span>);
                            }


                            if (editMode === true)
                            {
                                extraData.push(generate);
                                actions.push(<span className="action-button" onClick={() => {
                                    global.dispatchAsyncPut("global-page-entity", "SCV/Seguimientos/documentos/generate/", item, id)
                                }}>
                                    <EK.UX.Icon type={"fad fa-sync"} />
                                </span>);
                            }

                        }

                        else if (documentoTipo.Clave === "FORMATO")
                        {
                            extraData.push(print, download);
                            actions.push(<span className="action-button"><EK.UX.Icon type={"fad fa-check-square"} style={{ fontSize: 16 }} /></span>);
                        }

                        let className: string = "badge badge-info";
                        if (documentoTipo.Clave === "FORMATO")
                        {
                            className = "badge badge-success";
                        } else if (documentoTipo.Clave === "AUTO")
                        {
                            className = "badge badge-primary";
                        }

                        return <Row key={"List-docu" + item.ID} id={"row_documento_" + index} className="panel-collapsed" style={{ padding: "0px 15px" }}>
                            <Column size={[1, 1, 1, 1]} className="listItem-default-header">

                                {documentoTipo.Clave === "AUTO" ?
                                    <CollapseButton idElement={"row_documento_" + index} inverse={true} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={{ marginTop: -6 }} collapsed={true} iconOnly={true} /> : null
                                }
                            </Column>
                            <Column size={[6, 6, 6, 6]} className="listItem-default-header">

                                {requisito && requisito.ID > 0 ?
                                    <EK.UX.HoverCard content={item.RequisitoRelacionado.Nombre} placement={"left"}>
                                        <span className="badge badge-primary" style={{ marginRight: 10 }}>R</span>
                                    </EK.UX.HoverCard> : null
                                }
                                        
                                <a title={"Ver"}
                                    target={"_blank"}
                                    style={{ fontWeight: 600 }}
                                    onClick={() =>
                                    {
                                        global.goModal("modalArchivosSeguimiento", "kontrolFiles/getLastVersion/" + item.ID);
                                    }} >
                                    {documento.Nombre}</a>;

                            </Column>

                            <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                                <span>{documentoTipo.Nombre}</span>
                            </Column>

                            <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                {actions}
                            </Column>

                            {documentoTipo.Clave === "AUTO" ?
                                <Column className="panel-detail" style={{ padding: "0px 25px 10px", border: "1px solid rgb(241, 241, 241)", marginTop: 4 }}>
                                    <FileVersioning
                                        id={id}
                                        entityId={item.ID}
                                        entityType="seguimiento$documentos"
                                        modulo="scv"
                                        tipo={EK.UX.Kontrol.KontrolFileTipo.Plantillas}
                                        viewMode={!editMode}
                                        allowEdit={true}
                                        size={[12, 12, 12, 12]} />
                                </Column> : null
                            }
                        </Row>
                    }} />
                </FadeInColumn>

                <modal.Modal id={"modalArchivosSeguimiento"} url={"about:blank"}></modal.Modal>
            </div>;
            //{extraData.length ? <buttons.PopOver idForm={id} info={item} extraData={extraData} /> : null}
        }
    };
    const View: any = ReactRedux.connect(View$.props, null)(View$);
}
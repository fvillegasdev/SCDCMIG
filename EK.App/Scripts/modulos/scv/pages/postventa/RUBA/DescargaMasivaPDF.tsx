namespace EK.Modules.SCV.Pages.postventa.RUBA.DescargaMasivaPDF {
    "use strict";
    const PAGE_ID: string = "DescargaMasivaPDF";
    const PAGE_ARCHIVOSFOLIO_ID: string = "lista_archivos";
    const PAGE_ARCHIVOSDESCARGAR_ID: string = "lista_descargar";
   
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);
    declare const JSZip: any;
    interface IVistaProps extends page.IProps {
        autoSearch?: any;
        listaarchivos?: any;
        //listaOrdenesTrabajo?: any;
        listadescargar?: any;
    };

    interface IVistaState extends page.IProps {
        childKey: number;
    };

    export const Vista: any = global.connect(class extends React.Component<IVistaProps, IVistaState> {
        constructor(props: IVistaProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.autoSearch = state.global.NoFirst;
            retValue.listaarchivos = state.global.catalogo$lista_archivos;
            retValue.listadescargar = state.global.lista_descargar;
            return retValue;
        };


        shouldComponentUpdate(nextProps: IVistaProps, { }): boolean {
            //console.log(nextProps.listadescargar)
            return hasChanged(this.props.listaarchivos, nextProps.listaarchivos) ||
                hasChanged(this.props.listadescargar, nextProps.listadescargar)

        };
     
        componentWillUnmount() {
            delete EK.Store.getState().global.NoFirst;
        }

        componentDidMount() {
            dispatchSuccessful('global-page-data', [], PAGE_ARCHIVOSFOLIO_ID);
            dispatchSuccessful(`load::${PAGE_ARCHIVOSDESCARGAR_ID}`, []);

        }

        SeleccionarItem() {
            let item = Forms.getValue('ReporteBuscador', PAGE_ID);
            if (item && item.ID && item.ID > 0) {
                let p = { folio: item.ID }
                //global.dispatchAsyncPost('global-page-data', "base/scv/reportesFallasConsulta/GetBP/GetDiagnosticosOrdenesTrabajoByFolio/",)
                console.log('buscar informacion del folio')
                global.dispatchAsyncPost("global-page-data", "base/scv/reportesFallasConsulta/GetBP/GetDiagnosticosOrdenesTrabajoByFolio/", { parametros: p }, PAGE_ARCHIVOSFOLIO_ID);
                //global.asyncPost("base/scv/reportesFallasConsulta/GetBP/GetDiagnosticosOrdenesTrabajoByFolio/", { parametros: filtros }, (status: AsyncActionTypeEnum, data: any) => {
                //    switch (status) {228438
                //        case AsyncActionTypeEnum.successful:
                //            console.log(data)
                //            dispatchSuccessful('load::lista_diag', data);
                //            break;
                //        case AsyncActionTypeEnum.loading:
                //            dispatchUpdating('load::lista_diag',[])
                //            break;
                //    }
                //});
            } else {
                global.info('Seleccione algun folio');
                return;
            }
            
        }

        AddToListMover(item) {
            let lista = global.getStoreData(PAGE_ARCHIVOSDESCARGAR_ID);
            console.log(lista)
            if (lista.length > 0) {
                let inList = lista.filter(x => x.IdExpediente === item.IdExpediente)[0] !== undefined ? true : false;
                if (inList) {
                    global.info('Este documento ya esta en la lista');
                    return;
                } else {
                    lista.push(item)
                }
            } else {
                lista.push(item)
            }
            dispatchSuccessful(`load::${PAGE_ARCHIVOSDESCARGAR_ID}`, lista);
        }

        RemoveFromList(item) {
            let lista = global.getStoreData(PAGE_ARCHIVOSDESCARGAR_ID);
            lista = lista.filter(x => x.IdExpediente !== item.IdExpediente);
            //console.log(lista)
            //console.log(item)
            //lista.push(item)
            dispatchSuccessful(`load::${PAGE_ARCHIVOSDESCARGAR_ID}`, lista);
        }

        base64ToBlob(base64String: string, mimeType: string): Blob {
            console.log(base64String)
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
        }

        downloadFile(blob: Blob, fileName: string) {
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace y configurar la URL
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;

            // Agregar el enlace al DOM y simular un clic
            document.body.appendChild(link);
            link.click();

            // Liberar recursos
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        }

        compressDataFiles(dataDocs) {
            EK.Global.confirm("Presione Confirmar para descargar los archivos", "Documentos Procesados Correctamente", () => {
                //global.success('Descarga exitosa')
                const zip = new JSZip();

                dataDocs.forEach((doc, index) => {
                    //const blob = this.base64ToBlob(base64String, 'application/octet-stream');
                    const blob = this.base64ToBlob(doc.datab64, 'application/pdf');
                    try {
                        zip.file(doc.fileName + '.pdf', blob);
                    } catch (err) {
                        global.errorMessage('Error al agregar archivo ' + err);
                    }

                });

                zip.generateAsync({ type: 'blob' })
                    .then((blob) => {
                        let d = new Date();
                        let filename = 'EK10_SC_FOLIOS_' + d.getTime() + '.zip';
                        this.downloadFile(blob, filename);
                        // dispatchSuccessful(`load::${PAGE_ARCHIVOSFOLIO_ID}`, []);
                        dispatchSuccessful(`load::${PAGE_ARCHIVOSDESCARGAR_ID}`, []);
                        dispatchSuccessful('global-page-data', [], PAGE_ARCHIVOSFOLIO_ID);
                        dispatchSuccessful('load::tmp_datadocs', null);
                        Forms.updateFormElement(PAGE_ID, 'ReporteBuscador', null)
                    })
                    .catch((error) => console.error('Error generando el ZIP: ', error));

            });
        }


        GetEachDataPDF(index, lista) {
            //console.log(lista[index])
            let loader = document.getElementById('loader_dlr');
            global.asyncPost("base/scv/reportesfallas/GetBP/DescargaMasivaDocumentos/", { parametros: lista[index] }, (status: AsyncActionTypeEnum, data: any) => {
                //global.asyncPost("base/scv/reportesfallas/GetBP/DescargaMasivaDocumentos/", { criteria: 'criteriobusqueda'}, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        //console.log(data)
                        if (data) {
                            //console.log('DATA: '+index + ' Obtenida')
                            let tmp_list = global.getStoreData('tmp_datadocs');
                            tmp_list = tmp_list ? tmp_list : [];
                            //console.log(tmp_list)
                            tmp_list.push(data);
                            dispatchSuccessful('load::tmp_datadocs', tmp_list);
                            if (index + 1 >= lista.length) {
                                this.compressDataFiles(tmp_list);
                            } else {
                                this.GetEachDataPDF(index + 1, lista);
                            }
                        } else {
                            global.warning('No se pudo descargar el archivo');
                            return;
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        break;
                }
            });
        }

        DescargarArchivos() {
            let lista = global.getStoreData(PAGE_ARCHIVOSDESCARGAR_ID);
            let newLista = [];
            //let item = { ImpresionDocs:lista}
            for (let l of lista) {
                let val = `${l.IdExpediente}|${l.filename_download}|${l.TipoExt}`;
                newLista.push(val);
            }
            //let loader = document.getElementById('loader_dlr');
            if (lista.length > 0) {
                this.GetEachDataPDF(0, newLista);
            } else {
                global.warning('No ha seleccionado ningun archivo')
            }
           // console.log(lista)
        }


        render(): JSX.Element {
            const listHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Numero"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Folio"}</Column>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Tipo"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Estatus"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-right-header">{"Seleccionar"}</Column>
                    </Row>
                </Column>

            const listHeaderMover: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Numero"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Folio"}</Column>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Tipo"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-center-header">{"Estatus"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-right-header">{"Quitar"}</Column>
                    </Row>
                </Column>

            return <page.Main {...config}
                pageMode={PageMode.Vista}
                onFilter={() => { return }}>
                <Row style={{ position: 'relative' }}>
                    <div id="loader_dlr" style={{ display: 'none',background:'#fff', position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 90 }}>
                      
                        <Updating  text="Procesando archivos... " />
                    </div>
                <page.OptionSection
                    level={1}
                    title={'Seleccionar folio'}
                    collapsed={false}>
                    <Row style={{ marginBottom: 10 }}>
                        <Column size={[8, 8, 8, 8]}>
                            <select.ReportesFallasSPV id="ReporteBuscador" idForm={config.id} size={[12, 12, 6, 8]} iconButton="fas fa-search" buttonClick={this.SeleccionarItem} />
                        </Column>
                        <Column size={[4, 4, 4, 4]} style={{paddingTop:'10px'}}>
                            <br />
                            <button className="btn btn-sm btn-success" onClick={() =>this.DescargarArchivos()}>
                                <i className="fas fa-download" /> Descargar archivos
                            </button>
                        </Column>
                    </Row>
                </page.OptionSection>
                
                <page.OptionSection
                    level={1}
                    title={''}
                    collapsed={false}>
                    <Row style={{ marginBottom: 10 }}>
                        <Column size={[12, 12, 6, 6]}>
                            <PanelUpdate info={this.props.listaarchivos}>
                                <List
                                    id={PAGE_ARCHIVOSFOLIO_ID}
                                    items={this.props.listaarchivos}
                                    readonly={true}
                                    listHeader={listHeader}
                                    formatter={(index: number, item: any) => {
                                        return <Row style={{ margin: 0 }}>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                                <span className="badge badge-success" style={{ marginRight: 5 }}>{item.IdExpediente}</span>
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                                <span className="badge badge-dark" style={{ marginRight: 5 }}>{item.Folio}</span>
                                            </Column>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item">{item.Tipo}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                                {item.Estatus}
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-right-header">
                                                <button className="btn btn-xs btn-info" onClick={() => this.AddToListMover(item)}><i className="fas fa-plus" /> </button>
                                            </Column>
                                        </Row>
                                    }} />
                            </PanelUpdate>
                        </Column>
                        <Column size={[12, 12, 6, 6]}>
                                <List
                                    items={this.props.listadescargar}
                                    readonly={true}
                                    listHeader={listHeaderMover}
                                    formatter={(index: number, item: any) => {
                                        return <Row style={{ margin: 0 }}>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                                <span className="badge badge-success" style={{ marginRight: 5 }}>{item.IdExpediente}</span>
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow">
                                                <span className="badge badge-dark" style={{ marginRight: 5 }}>{item.Folio}</span>
                                            </Column>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item">{item.Tipo}</Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                                {item.Estatus}
                                            </Column>
                                            <Column size={[2, 2, 2, 2]} className="listItem-right-header">
                                                <button className="btn btn-xs btn-danger" onClick={() => this.RemoveFromList(item)}><i className="fas fa-times" /> </button>
                                            </Column>
                                        </Row>
                                    }} />
                            
                        </Column>
                    </Row>
                </page.OptionSection>
                </Row>
            </page.Main>
            
        };

    });


};
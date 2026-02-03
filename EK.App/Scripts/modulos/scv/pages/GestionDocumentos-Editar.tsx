namespace EK.Modules.SCV.Pages.GestionDocumentos {
    "use strict";

    const SEGUIMIENTOS: string = "Seguimientos";
    const VERSIONES: string = "Versiones";
    const config: page.IPageConfig = global.createPageConfig("GestionDocumentos", "scv", [SEGUIMIENTOS, VERSIONES]);


    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {

            let model: any = item
                .addID()
                .addNombre()
                .addObject("Categoria")
                .addObject("Entidad")
                .addObject(SEGUIMIENTOS)
                .addEstatus()
                .addVersion()
                .toObject();

            let guardar: boolean = true;
            let mensaje: string = "";

          
            model.Seguimientos.forEach((value: any, index: number) => {

                if (value.Responsable.ID < 1) {
                    guardar = false;
                    mensaje = "Indicar el responsable de cada fase";
                }
                if (value.FechaFinalizacion == null)
                {
                    guardar = false;
                    mensaje = "Indicar la Fecha de Finalización de cada fase";
                }
            });

            if (model.Entidad == undefined && model.Categoria.Clave == "CO")
            {
                guardar = false;
                mensaje = "Indicar la entidad de referencia";
            }

            if (guardar)
                return model;
            else
                warning(mensaje);

        }
        onEntityLoaded(props: page.IProps): any {
            let entidad: any = getData(props.entidad);
            let id: number = getDataID(props.entidad);
           
            let parametros: any = global.assign({ activos: 0 });
            if (id > 0) {

                if (entidad.KontrolFile && entidad.KontrolFile.ID > 0)
                {
                    parametros = global.assign({ idFile: entidad.KontrolFile.ID });
                    props.config.dispatchCatalogoBase("base/kontrol/GestionDocumentos/Get/GetVersiones/", parametros, VERSIONES);
                }

                parametros = global.assign({ idExpediente: id });
            }
            props.config.dispatchCatalogoBase("base/kontrol/GestionDocumentos/Get/GetSeguimientos/", parametros, SEGUIMIENTOS);


        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}
                onEntityLoaded={this.onEntityLoaded}
                allowDelete={false}>
                <View />
                <Edit />
            </page.Main>
        }
    };

    interface IAdministracionDocumentosProps extends page.IProps {
        item?: any;
    }

    export let Edit: any = global.connect(class extends React.Component<IAdministracionDocumentosProps, IAdministracionDocumentosProps>{
        constructor(props: IAdministracionDocumentosProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IAdministracionDocumentosProps, nextState: IAdministracionDocumentosProps): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {

            let ml: any = config.getML();
            let idEntidad: number = getDataID(this.props.entidad);

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        level={"main"}
                        subTitle={ml.bc.text}
                        icon="far fa-file-archive" collapsed={false} hideCollapseButton={true}>


                        {idEntidad > 0 ?
                            <div>
                                <Elementos />
                            </div>

                            :

                            <div>
                                <ddl.DocumentosCategoriaDDL id={"Categoria"} size={[12, 4, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />
                                <MultiEditor />
                            </div>
                        }

                        <Seguimientos />
                        <VersionesDocumento />

                        <modal.Modal id={"modalArchivos"} url={"about:blank"}></modal.Modal>
                        <modal.Modal id={"modalArchivosItems"} url={"about:blank"}></modal.Modal>

                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    });

    let View: any = global.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: page.IProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let ml: any = this.props.config.getML();

            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        level={"main"}
                        id={config.id}
                        subTitle={ml.bc.text}
                        icon="far fa-file-archive" collapsed={false} hideCollapseButton={true}>


                         <Elementos />
                         <Seguimientos />
                         <VersionesDocumento />

                         <modal.Modal id={"modalArchivos"} url={"about:blank"}></modal.Modal>
                         <modal.Modal id={"modalArchivosItems"} url={"about:blank"}></modal.Modal>

                    </page.OptionSection>
                </Column>
            </page.View>
        }
    });


    class Elementos extends page.Base {
        render(): JSX.Element {

            return <div>
                <Column size={[12, 12, 12, 12]} style={{ padding:0 }}>
                    <label.Folio id="ID" size={[12, 1, 1, 1]} />
                    <label.Entidad id="Categoria" size={[12, 4, 4, 4]} />
                    <label.Entidad id="Entidad" size={[12, 5, 5, 5]} />
                    <Estatus />
                </Column>

                <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                    <Documento />
                    <label.Usuarios id="CreadoPor" size={[12, 3, 3, 3]} />
                </Column>
            </div>;
        };
    };




    interface IAdministracionDocumentosState {
        file?: EK.UX.Kontrol.File;
    }

    export let Documento: any = global.connect(class extends React.Component<page.IProps, IAdministracionDocumentosState> {
        constructor(props: page.IProps) {
            super(props);
            this.state = { file: new EK.UX.Kontrol.File(null) };
            this.putValorArchivo = this.putValorArchivo.bind(this);
            this.onChange = this.onChange.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        putValorArchivo(): any {
            let idEntidad = getDataID(this.props.entidad);
            let entidad = getData(this.props.entidad);
            

            let idEntidadArchivo = entidad && entidad.Entidad && entidad.Entidad.ID>0? entidad.Entidad.ID: idEntidad;
            let idArchivo = entidad && entidad.KontrolFile ? entidad.KontrolFile.ID : 0;
            let idEstatus = entidad && entidad.KontrolFile ? entidad.KontrolFile.IdEstatus : null;



            let file: EK.UX.Kontrol.File = this.state.file;
            let fileSize: number = EK.UX.Kontrol.DEFAULT_FILE_SIZE;

            if (file.getSize() > EK.UX.Kontrol.DEFAULT_FILE_SIZE) {
                errorMessage("Error");
                return;
            };

            let model: any = {};
            model['ID'] = idArchivo;
            model['IdEstatus'] = idEstatus;
            model['EntityId'] = idEntidadArchivo;
            model['EntityType'] = "documentos"
            model['Tipo'] = "anexos"
            model['Nombre'] = file.getName();
            model['FileSize'] = file.getSize();
            model['FileType'] = file.getType();
            model['FileExtension'] = file.getExtension();
            model['Modulo'] = "scv";
            model['Uid'] = null;

            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                Nombre: model.Nombre,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Modulo: model.Modulo,
                Tipo: model.Tipo,
                Uid: model.Uid
            });

            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file.getFile());

            global.dispatchAsyncPut("load::currentEntity", "KontrolFiles/GenerarExpedienteDocumento/" + idEntidad, data);

            if (idArchivo > 0)
            {
                let parametros: any = global.encodeParameters({ idFile: idArchivo  });
                global.dispatchAsync("global-page-data", "base/kontrol/GestionDocumentos/Get/GetVersiones/" + parametros, VERSIONES);
            }

        }
        onChange(file: EK.UX.Kontrol.File): void {
            this.setState({ file: file });
            this.putValorArchivo();
        }
        render(): JSX.Element {

            let idEntidad: number = getDataID(this.props.entidad);

            let entidad: any = getData(this.props.entidad);

            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let nombreDocumento: string = entidad && entidad.KontrolFile ? entidad.KontrolFile.Nombre : "";


            if (idEntidad > 0 && !(estadoEntidad)) {
                return <div>

                    <label.Link label={"Documento"} value={entidad} formatValue={(e: any) => { return { ID: e.ID, Nombre: e.KontrolFile.Nombre, IdExpediente: e.ID }; }} onClick={(e) => { global.goModal("modalArchivos", "SCV/Seguimientos/Expediente/Documento/" + entidad.KontrolFile.Clave); }} size={[12, 3, 3, 3]} link={""} />

                    <div className=" col-xs-12 col-sm-1 col-md-1 col-lg-1">
                        <div className="form-group label-link">
                            <div className="label-text" style={{ color:"white" }}>
                                Hola
                            </div>

                            <div className="label-value" style={{ border: "1px solid #CFD8DC" }}>

                                <div style={{ textAlign: "center", marginLeft: "7%" }}>
                                    <EK.UX.Kontrol.KontrolFile$Input
                                        mode={EK.UX.Kontrol.FileInputMode.IconOnly}
                                        required={true}
                                        iconColor={"#7B1FA2"}
                                        onChange={this.onChange} />
                                </div>

                                
                            </div>
                            
                        </div>
                    </div>



                </div>;
            }
            else if (idEntidad > 0)
            {
                return <label.Link label={"Documento"} value={entidad} formatValue={(e: any) => { return { ID: e.ID, Nombre: e.KontrolFile.Nombre, IdExpediente: e.ID }; }} onClick={(e) => { global.goModal("modalArchivos", "SCV/Seguimientos/Expediente/Documento/" + entidad.KontrolFile.Clave); }} size={[12, 3, 3, 3]} link={""} />
            }
            return null;

            
        };
    })

    export let Seguimientos: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let idEntidad: number = getDataID(this.props.entidad);

            return <page.SectionList
                id={SEGUIMIENTOS}
                hideNewButton={true}
                icon="fas fa-project-diagram"
                title="Seguimientos"
                parent={config.id}
                level={1}
                style={{marginTop:"1%"}}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Fase"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Esquema"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Responsable"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Fecha Finalización"}</Column>
                    </Row>
                </div>}
                readonly={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addObject("Responsable")
                        .addDate("FechaFinalizacion")
                        .addEstatus()
                        .addVersion()
                        .toObject();
                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    let responsable: string = item.Responsable && item.Responsable.Nombre ? item.Responsable.Nombre + " " + item.Responsable.Nombre : "";

                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    <span>{item.Fase.Nombre}</span>
                                </Column>

                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    <span>{item.Esquema.Nombre}</span>
                                </Column>
                                
                                {(estadoEntidad || idEntidad>0) ?
                                    <div>
                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                            <span>{responsable}</span>
                                        </Column>

                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                            <span> {EK.UX.Labels.formatDate(item.FechaFinalizacion)}</span>
                                        </Column>
                                    </div>
                                    :
                                    <div>
                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                            <ddl.UsuariosDescendientesDDL value={item.Responsable} addNewItem={"SO"} addNewItemText={"Seleccione un Responsable"} property={SEGUIMIENTOS} index={index} id="Responsable" idFormSection={config.id} />
                                        </Column>

                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                            <input.Date property={SEGUIMIENTOS} index={index} id="FechaFinalizacion" idFormSection={config.id} />
                                        </Column>
                                    </div>
                                }
                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })


    interface IMultiDropDrownListProps extends React.Props<any> {
        categoria?: string;

    };

    const MultiEditor: any = global.connect(class extends React.Component<IMultiDropDrownListProps, IMultiDropDrownListProps>{
        constructor(props: IMultiDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            categoria: Forms.getValue("Categoria", config.id),
        });
        shouldComponentUpdate(nextProps: IMultiDropDrownListProps, nextState: IMultiDropDrownListProps): boolean {
            return hasChanged(this.props.categoria, nextProps.categoria);
        };
        render(): JSX.Element {
            let categoria: any = this.props.categoria;
            let claveCategoria = categoria && categoria.Clave ? categoria.Clave : "";

            let retValue: any = null;

            if (claveCategoria === "CO") {
                retValue = <ddl.SCCO$ObrasDDL id={"Entidad"}  size={[12, 4, 4, 4]} addNewItem="SO" />
            } else if (claveCategoria === "L") { 
                retValue = null;
            } else if (claveCategoria === "GE") {
                retValue = null;
            }
            
            return retValue;
        };
    });


   

    export let Estatus: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): any {

            let entidad: any = getData(this.props.entidad);
            let estatus: any = entidad && entidad.Estatus ? entidad.Estatus : "";
            let claveEstatus: string = estatus && estatus.Clave ? estatus.Clave:"";

            let resultad: any = <div></div>;

            let resultEstatus: any = null;
            switch (claveEstatus) {
                case "NV":
                    resultEstatus = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{estatus.Nombre}</div>;
                case "V":
                    resultEstatus = <div className='bg-red-flamingo bg-font-red-flamingo' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{estatus.Nombre}</div>;
                case "C":
                    resultEstatus = <div className='bg-blue bg-font-blue' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{estatus.Nombre}</div>;
              
            }
            return <Column size={[12, 2, 2, 2]}>
                <div>
                    <Column size={[12, 12, 12, 12]}>
                            <div className={"form-group"}>
                            <div className={"label-text"}>
                                {"Estatus"}
                            </div>
                            <div  className={"label-value"}>
                                {resultEstatus}
                            </div>
                        </div>
                    </Column>
                </div>
            </Column>;
            
        };
    });



    export let VersionesDocumento: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            let idEntidad: any = getDataID(this.props.entidad);

            if (!(idEntidad > 0))
                return null;

            return <page.SectionList
                id={VERSIONES}
                icon="fas fa-code-branch"
                hideNewButton={true}
                title="Versiones"
                parent={config.id}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Tamaño"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Creado Por"}</Column>
                        <Column size={[12, 1, 1, 1]} className="list-default-header">{"Fecha"}</Column>
                        <Column size={[12, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>}
                readonly={false}
                formatter={(index: number, item: any) => {

                    let apellidoResponsable: string = item.CreadoPor.Apellidos != null ? item.CreadoPor.Apellidos : "";
                    let nombreResponsable: string = item.CreadoPor.Nombre + apellidoResponsable;
                        ;

                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                    <span style={{ marginRight:"2%" }} className="badge badge-primary">{item.FileVersion}</span>

                                    <a title={item.Nombre}
                                        target={"_blank"}
                                        onClick={() => {
                                            global.goModal("modalArchivosItems", "SCV/Seguimientos/Expediente/Documento/Version/" + item.ID)
                                        }} >{item.Nombre}</a>

                                </Column>

                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    <span>{item.FileSize}</span>
                                </Column>

                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                    <span>{nombreResponsable}</span>
                                </Column>

                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                    <span style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.Creado)}</span>
                                </Column>
                               
                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })

}
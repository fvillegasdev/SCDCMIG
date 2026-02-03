namespace EK.Modules.Kontrol.Pages.BlogPost {
    "use strict";

    const BLOG_POST: string = "blogPost";
    const BLOGPOST_SELECT_ENTITY = "BlogPost$SelectEntity";

    export interface IBlogPost extends page.IProps {
        SelectedEntity?: any;
        catalogBlogPost?:any;
        stateBlogpost?: any;
    };

    export let blogPost: any = global.connect(class extends React.Component<IBlogPost, IBlogPost> {
        constructor(props: IBlogPost) {
            super(props);
            this.agregarComentario = this.agregarComentario.bind(this);
            this.onSave = this.onSave.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.SelectedEntity = state.global["catalogo$" + BLOGPOST_SELECT_ENTITY];
            retValue.catalogBlogPost = state.global["catalogo$" + BLOG_POST];
            retValue.stateBlogpost = state.global["state$" + BLOG_POST];
           return retValue;
        };
        agregarComentario(idBlogPost: number) {
            Forms.remove(BLOG_POST);
            Forms.updateFormElement(BLOG_POST, "idBlogPost", idBlogPost);
            this.props.config.setState({ viewMode: false }, BLOG_POST);
        }
        onSave() {
            let Entidad: any = getData(this.props.SelectedEntity);
            let claveEntidad: string = Entidad.TipoEntidad ? Entidad.TipoEntidad.Clave: "";

            if (claveEntidad==="")
            {
                this.props.config.setState({ viewMode: true }, BLOG_POST);
                warning("No se encuentra la clave de la entidad.")
                return null;
            }

            let idBlogPost: any = Forms.getValue("idBlogPost", BLOG_POST);

            let model: EditForm = Forms.getForm(BLOG_POST);

            let ID: number = model.getValue("ID") == undefined ? -1 : model.getValue("ID");

            let item: any = {};
            item['ID'] = ID;
            item['Nombre'] = model.getValue("Nombre");
            item['Descripcion'] = model.getValue("Descripcion");
            item['Version'] = model.getValue("Version");
            item['IdEstatus'] = model.getValue("IdEstatus");

            item['Entidad']= { ID: Entidad.ID };
            item['TipoEntidad'] = { ID: 0, Clave: Entidad.TipoEntidad.Clave };

            if (idBlogPost > 0) {
                item['IdBlogPost'] = idBlogPost;
            }
            else
            {
                item['IdCategoria'] = model.getValue("CategoriasBlogPost").ID;
            }

            if (item.ID > 0) {
                item._modificado = true;
            }
            else {
                item._nuevo = true;
            }

            dispatchAsyncPut("global-page-data", "base/kontrol/blogPost/Get/Save", item, BLOG_POST);
            this.props.config.setState({ viewMode: true }, BLOG_POST);

        }
        componentWillMount(): void{
            let config: page.IPageConfig = global.assign({}, this.props.config);
            let slots: any[] = config.slots;
            let Modulo: string = config.modulo;
 
            if (!config.hasSlot(BLOG_POST)) {
                if (!slots) {
                    slots = [];
                };

                slots.push(BLOG_POST);
                global.setPageConfig({
                    id: config.id,
                    modulo: Modulo,
                    slots,
                    idML: config.idML
                });
            };


            if (this.props.SelectedEntity != null && this.props.SelectedEntity != undefined) {
                let Entity = getData(this.props.SelectedEntity);
                if (Entity.ID) {
                    if (Entity.ID > 0) {
                        let encodedParams: string = global.encodeParameters({ idEntidad: Entity.ID, claveTipoEntidad: Entity.TipoEntidad.Clave })
                        dispatchAsync("global-page-data", "base/kontrol/blogPost/Get/GetAll/" + encodedParams, BLOG_POST);
                    } else {
                        dispatchSuccessful("global-page-data", [], BLOG_POST);
                    }
                }
            }

        }
        componentWillUnmount():void {
            dispatchSuccessful("global-page-data", [], BLOG_POST);
        }

        componentWillReceiveProps(nextProps: IBlogPost, nextState: IBlogPost): any {
            if (hasChanged(this.props.SelectedEntity, nextProps.SelectedEntity)) {
                if (nextProps.SelectedEntity != null && nextProps.SelectedEntity != undefined) {
                    let Entity = getData(nextProps.SelectedEntity);
                    if (Entity.ID) {
                        if (Entity.ID > 0) {
                            let encodedParams: string = global.encodeParameters({ idEntidad: Entity.ID, claveTipoEntidad: Entity.TipoEntidad.Clave })
                            dispatchAsync("global-page-data", "base/kontrol/blogPost/Get/GetAll/" + encodedParams, BLOG_POST);
                        } else {
                            dispatchSuccessful("global-page-data", [], BLOG_POST);
                        }
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IBlogPost, nextState: IBlogPost): boolean {
            return hasChanged(this.props.catalogBlogPost, nextProps.catalogBlogPost) ||
                hasChanged(this.props.stateBlogpost, nextProps.stateBlogpost) ;
        }
        render(): JSX.Element {
            let selectedEntity: any = getData(this.props.SelectedEntity);

            let title: string = selectedEntity.TipoEntidad ? selectedEntity.TipoEntidad.Nombre : "";
            let ClaveEntity: string = selectedEntity.TipoEntidad ? selectedEntity.TipoEntidad.Clave : "";
            let IDEntity: number = selectedEntity.ID ? selectedEntity.ID : 0;
            let IconEntity: string = selectedEntity.icon ? selectedEntity.icon : "fal fa-comment";

            let entityViewMode: boolean = getData(this.props.state).viewMode;

            let fnCreateList: (items: any[]) => any = (items: any[]): any => {

                let itemfoto: (item: any) => any = (item: any): any => {
                    let iniciales: any;


                    iniciales = item.Usuario.Nombre.substr(0, 1) + item.Usuario.Apellidos.substr(0, 1);
                    let retValue: JSX.Element = (item === undefined || item === null) ? null :
                        item.Usuario.Foto === "" ?
                            <span className="img-circle-fixed" style={{ marginRight: "8px", background: "#1e7145", color: "white", width: "30px", height: "30px", float: "left", position: "relative", zIndex: (301), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }} >
                            <p title={item.Usuario.Nombre} style={{ paddingTop: "13px", margin: "0px" }}>{iniciales}</p>
                        </span>
                        :
                            <img alt="" title={item.Usuario.Nombre} className="img-circle-fixed" src={item.Usuario.Foto} style={{ marginRight: "8px", verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "30px", height: "30px", background: "beige", zIndex: (300), textAlign: "center" }} />
                        ;

                    return retValue;
                };


                let retValue: any = (items === undefined || items === null) ? null :
                    items.map((item: any, i: number): any => {
                        return <div key={"coment" + i} className="col-md-12 col-xs-12 col-sm-12 col-lg-12 contenedorBlog" style={{ padding: "2%", backgroundColor: "#ECEFF1", fontWeight: 400, marginBottom: "10px", marginLeft: "7%" }}>
                            <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" style={{ padding: "10px 0px" }}>
                                {itemfoto(item)}
                                <span className="bold" style={{ color: "#578ebe" }}>{item.CreadoPor.Nombre + " " + item.CreadoPor.Apellidos + " "}</span>
                                <span style={{ color: "#606770", fontSize: "90%" }}>{global.formatDateTime(item.Creado)} </span>
                                <div>
                                    <label.HTML value={item.Descripcion} />
                                </div>
                            </div>
                        </div>
                    });

                return retValue;
            };

            const fnFormatPost: (index: number, item: any) => any = (index: number, item: any): any => {
                    
                if (item.IdBlogPost > 0) {
                    return null;
                }
                let cantidadComentario: number = item.ListBlogPost? item.ListBlogPost.length:0;

                let iniciales: any;
                iniciales = item.Usuario.Nombre.substr(0, 1) + item.Usuario.Apellidos.substr(0, 1);
                let itemfoto: JSX.Element = item.Usuario.Foto === "" ?
                    <span className="img-circle-fixed" style={{ marginRight: "8px", background: "#1e7145", color: "white", width: "30px", height: "30px", /*float: "left",*/ position: "relative", zIndex: (301), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            <p title={item.Usuario.Nombre} style={{ paddingTop: "13px", margin: "0px" }}>{iniciales}</p>
                        </span>
                        :
                        <img alt="" title={item.Usuario.Nombre} className="img-circle-fixed" src={item.Usuario.Foto} style={{ marginRight: "8px", verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "30px", height: "30px", background: "beige", zIndex: (300), textAlign: "center" }} />
                    

                return <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" style={{ padding: "2%", borderBottom: "solid 1px #cccc", marginBottom: "10px" }}>

                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" style={{ fontSize: "15px", color: "orange", padding: "1px", fontWeight: 600 }}>
                        {item.Nombre}
                    </div>

                    <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6" style={{ padding: "10px 0px", fontWeight: 600, fontSize: "95%" }}>
                        {itemfoto}
                        <span>{item.CreadoPor.Nombre + " " + item.CreadoPor.Apellidos}</span>
                    </div >


                    <div className="col-md-3 col-xs-3 col-sm-3 col-lg-3" style={{ padding: "10px 0px", textAlign: "right", color: "#36C703" }}>
                        <span className="badge badge-success" style={{ backgroundColor: "#36C703" }}>{global.formatDateTime(item.Creado)}</span>
                    </div >

                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{ color: "rgb(53, 152, 220)", padding: "10px 0px", textAlign: "right", fontWeight: 600 }}>
                        <span className="badge badge-danger" style={{ padding: "3px 10px", fontWeight: "bold" }}>
                            {item.Categoria.Nombre}
                        </span>
                    </div >

                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 contenedorBlog" style={{ /*padding: "2%", */backgroundColor: "#ECEFF1"/*, fontWeight: 400, marginBottom: "10px"*/ }}>
                        <label.HTML value={item.Descripcion} />
                    </div>

                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" style={{ padding: "2px 0px" }}>

                        {entityViewMode===false ?
                        <button style={{ fontSize: "10px", padding: "2px 5px" }} className="btn btn-default btn-sm white" onClick={(e) => this.agregarComentario(item.ID)}>
                            <i className="fas fa-plus" style={{ color: "rgb(53, 152, 220" }}></i> Agregar Comentario
                        </button>
                    : null}

                        {cantidadComentario > 0 ?
                            <button style={{ fontSize: "10px", padding: "2px 5px" }} data-toggle="collapse" data-target={"#element" + index} className="btn btn-default btn-sm white">
                                <i className="fas fa-comments" style={{ color: "rgb(53, 152, 220", paddingRight:"4px" }}></i>
                                Ver comentarios <span className="badge" style={{ backgroundColor: "#5E35B1" }}>{cantidadComentario}</span>
                            </button>
                            :
                            null
                        }
                        <button style={{ fontSize: "10px", padding: "2px 5px" }} data-toggle="collapse" data-target={"#element_file_manager" + index} className="btn btn-default btn-sm white">
                            <i className="fal fa-file-alt" style={{ color: "rgb(53, 152, 220", paddingRight: "4px" }}></i>
                            Ver Archivos <span className="badge" style={{ backgroundColor: "#5E35B1" }}>{item.TotalArchivos}</span>
                        </button>
                        <div id={"element_file_manager" + index} className="collapse col-md-12 col-xs-12 col-sm-12 col-lg-12" >
                            <KontrolFileManager title="Archivos" modulo={this.props.config.modulo} viewMode={false} multiple={true} entity={global.createSuccessfulStoreObject({ ID: item.ID })} entityType={global.createSuccessfulStoreObject([ClaveEntity].join(""))} />
                        </div>

                    </div>

                    {cantidadComentario > 0 ?
                        <div id={"element" + index} className="collapse col-md-12 col-xs-12 col-sm-12 col-lg-12" >
                            {fnCreateList(item.ListBlogPost)}
                        </div> :
                        null
                    }

                </div>;

            };

            return <div>
                <page.SectionList
                    id={BLOG_POST}
                    parent={this.props.config.id}
                    listMode={"list"}
                    readonly={false}
                    /*offhorizontalScrolling={true}*/
                    level={1}
                    height={"1880px"}
                    icon={IconEntity}
                    onSave={this.onSave}
                    size={[12, 12, 12, 12]}
                    formatter={fnFormatPost}>
                    <Row>
                        {Forms.getValue("idBlogPost", BLOG_POST) > 0 ?
                            <div>
                                <input.RichText label="Comentario" id="Descripcion" idFormSection={BLOG_POST} size={[12, 12, 12, 12]} />
                            </div> :
                            <div>
                                <input.Text label="Nombre" id="Nombre" idFormSection={BLOG_POST} size={[12, 6, 6, 6]} validations={[validations.required()]}/>
                                <CategoriasBlogPostDDL idFormSection={BLOG_POST} claveTipoEntidad={ClaveEntity} size={[12, 6, 6, 6]} required={true}/>
                                <input.RichText label="Comentario" id="Descripcion" idFormSection={BLOG_POST} size={[12, 12, 12, 12]} validations={[validations.required()]}/>
                            </div>
                        }
                    </Row>
                </page.SectionList>
                </div>;
        };
    })

    export interface ICategoriasBlogPostDDL extends IDropDrownListProps {
        claveTipoEntidad: string;
    };

    let CategoriasBlogPostDDL: any = global.connect(class extends React.Component<ICategoriasBlogPostDDL, {}> {
        static props: any = (state: any) => ({
            items: state.global.CategoriasBlogPost,
        });
        static defaultProps: IDropDrownListProps = {
            id: "CategoriasBlogPost",
            items: createDefaultStoreObject([]),
            label: "Categoria",
            helpLabel: "Seleccione una Categoria",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            dispatchAsync("load::CategoriasBlogPost", "base/sdc/blogPost/Get/GetBlogPostCategorias/" + global.encodeParameters({ claveTipoEntidad: this.props.claveTipoEntidad }));
        };
        componentWillUnmount() {
            global.dispatchSuccessful("load::CategoriasBlogPost", null);
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
};

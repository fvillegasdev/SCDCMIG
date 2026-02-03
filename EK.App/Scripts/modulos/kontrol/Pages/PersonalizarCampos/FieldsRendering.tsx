
namespace EK.Modules.Kontrol.Pages.PersonalizarCampos {
    "use strict";
    //const PAGE_ID: string = "seguimientos";
    var NameFormCustom: string = "CUSTOMFORM$"; 
    const PAGE_ID: string = "CUSTOMFORM"; 
    const CUSTOMFORM_CATALOGO_ID: string = "catalogo$CUSTOMFORM$"; 
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "KONTROL");
    const x: any = window;

    export class FiledInfo {
        static ICONO_TIPO_REQUISITO: any = {
            'ARCH': "icon-cloud-upload",
            'TEX': "icon-pencil",
            'NUM': "icon-pencil",
            'LIS': "icon-pencil",
            'LOG': "icon-pencil",
            'FEC': "icon-pencil",
            'ENT': "icon-pencil"
        };
        tipoClave: string;
    }

    export class StateDataManagerCustomForm {
        state: any;
        constructor(state?: any) {
            this.state = state;
        }
        getById(id: string): DataElement {
            let retValue: DataElement = null;
            for (var p in this.state) {
                let index: number = p.indexOf("itemsData");
                if (index >= 0) {
                    let idState: string = p.substring(index);
                    if (idState === id) {
                        retValue = this.state[p];
                        break;
                    };
                };
            };
            return retValue;
        };
        getCustomformById(id: string): DataElement {
            let retValue: DataElement = null;
            for (var p in this.state) {
                let index: number = p.indexOf("catalogo$CUSTOMFORM");
                if (index >= 0) {
                    let idState: string = p.substring(index);
                    if (idState === id) {
                        retValue = this.state[p];
                        break;
                    };
                };
            };
            return retValue;
        };
    };

    interface IFieldsRenderingProps extends page.IProps {
        ClaveModulo: string;
        index?: number;
        items?: any;
        info?: FiledInfo;
        modoView: boolean;
        tipoEntidad?: string; 
        dataManager?: StateDataManagerCustomForm;
    }

    interface IFieldsRenderingState {
        viewMode: boolean;
    }

    export class cFieldsRenderingBase extends React.Component<IFieldsRenderingProps, IFieldsRenderingState>{
        constructor(props: IFieldsRenderingProps) {
            super(props);
            this.state = { viewMode: true };
        }

        static props: any = (state: any) => ({
            //items: state.global['catalogo$' + NameFormCustom]
            dataManager: new StateDataManagerCustomForm(state.global)
        });

        componentWillMount(): void {
            if (this.props.id) {
                NameFormCustom = "CUSTOMFORM$" + this.props.id; 
            }
            EK.Store.getState().forms[NameFormCustom] = ({})
            EK.Store.getState().global["catalogo$" + NameFormCustom] = ({})
            let idRegistro: any = getData(EK.Store.getState().global.currentEntity).ID;
            if (this.props.tipoEntidad && this.props.tipoEntidad != "") {
                let Clave_Modulo: any = this.props.tipoEntidad;
                //Obtiene el id del entity actual
                let parametros: any = global.encodeParameters({ ClaveOpcion: Clave_Modulo, IdRegistro: idRegistro, OperacionEspecificaSP: "Secciones" });
                global.asyncGet("base/kontrol/PersonalizarCampos/Get/GetCustomFormValue/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-page-data", data, NameFormCustom);
                    }
                });
            } 
        }

        componentWillReceiveProps(nextProps: IFieldsRenderingProps): any {
            if (hasChanged(this.props.tipoEntidad, nextProps.tipoEntidad)
                || hasChanged(this.props.modoView, nextProps.modoView)){
                if (nextProps.tipoEntidad != null && nextProps.tipoEntidad != undefined) {
                    EK.Store.getState().forms[NameFormCustom] = ({})
                    let idRegistro: any = getData(EK.Store.getState().global.currentEntity).ID;
                    let Clave_Modulo: any = nextProps.tipoEntidad;
                    let parametros: any = global.encodeParameters({ ClaveOpcion: Clave_Modulo, IdRegistro: idRegistro, OperacionEspecificaSP: "Secciones" });
                    global.asyncGet("base/kontrol/PersonalizarCampos/Get/GetCustomFormValue/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                        if (status === AsyncActionTypeEnum.successful) {
                            global.dispatchSuccessful("global-page-data", data, NameFormCustom);
                        }
                    });
                }
            }
        }

        componentWillUnmount() {
            EK.Store.getState().forms[NameFormCustom] = ({})
            EK.Store.getState().global["catalogo$" + NameFormCustom] = ({})
        }
        shouldComponentUpdate(nextProps: IFieldsRenderingProps, nextState: IFieldsRenderingState): boolean {
            return hasChanged(this.props.tipoEntidad, nextProps.tipoEntidad) ||
                this.state.viewMode !== nextState.viewMode ||
                this.props.id !== nextProps.id ||
                hasChanged(this.props.dataManager.state[CUSTOMFORM_CATALOGO_ID + (this.props.id ? this.props.id : "")],
                nextProps.dataManager.state[CUSTOMFORM_CATALOGO_ID + (this.props.id ? this.props.id : "")]);
        }

        render(): JSX.Element {
            let itemsData: DataElement = this.props.dataManager.getCustomformById(CUSTOMFORM_CATALOGO_ID + (this.props.id ? this.props.id : ""));
            let $page: any = $ml[PAGE_ID];
            let items: any;
            let Fields: any = itemsData;
            let editView: boolean = !this.state.viewMode;
            let hasData: boolean = getData(Fields).length > 0 ? true : false;
            let sections = [];

            let style: React.CSSProperties = {
                alignItems: "center",
                display: "flex",
                margin: "0px",
                minHeight: "30px",
                borderStyle: editView ? "dotted" : "none"
            };

            if (hasData) {
                let map = new x.Map();
                let dataFields: any = getData(Fields);
                for (let item of dataFields) {
                    if (item.PersonalizarCampos.Seccion && item.PersonalizarCampos.Seccion.ID) {
                        if (!map.has(item.PersonalizarCampos.Seccion.ID)) {
                            map.set(item.PersonalizarCampos.Seccion.ID, true);    // set any value to Map
                            sections.push({
                                ID: item.PersonalizarCampos.Seccion.ID,
                                Clave: item.PersonalizarCampos.Seccion.Clave,
                                Nombre: item.PersonalizarCampos.Seccion.Nombre,
                                Icono: item.PersonalizarCampos.Seccion.Icono,
                                Size: item.PersonalizarCampos.Seccion.Size,
                                Visible: item.PersonalizarCampos.Seccion.Visible,
                                IdTipoEntidad: item.PersonalizarCampos.Seccion.IdTipoEntidad,
                            });
                        }
                    } else {
                        break;
                    }
                }

                if (sections.length === 0) {
                    sections.push({
                        ID: 1,
                        Clave: "Section",
                        Nombre: "Información Adicional",
                        Icono: "fas fa-home",
                        Size: "12, 12, 12, 12",
                        Visible: true,
                        IdTipoEntidad: 1,
                    });
                }

                let fnCreateListItems: (datos: any[]) => any = (datos: any[]): any => {
                    let retValue: any = (datos === undefined || datos === null) ? null :
                        datos.map((datosItem: any, i: number): any => {
                            return <FieldsEdit referencia={'EKFieldCustom_' + datosItem.PersonalizarCampos.Seccion.ID + '_' + datosItem.PersonalizarCampos.Configuracion.ID}
                                key={'EKFieldCustom_' + datosItem.PersonalizarCampos.Seccion.ID + '_' + datosItem.PersonalizarCampos.Configuracion.ID}
                                info={datosItem} item={datosItem} idForm={NameFormCustom} modoView={getData(this.props.modoView).viewMode} />;
                        });
                    return retValue;
                };

                let fnCreateListSections: (datos: any[]) => any = (datos: any[]): any => {
                    let retValue: any = (datos === undefined || datos === null) ? null :
                        datos.map((datosItem: any, i: number): any => {
                            let size: any = datosItem.Size ? datosItem.Size : "12, 12, 12, 12";
                            let listSize: number[] = size.split(","); 
                            let dataFields: any = getData(Fields);
                            let dd: any[] = dataFields;
                            if (dataFields.length > 0 && dataFields[0].PersonalizarCampos.Seccion && dataFields[0].PersonalizarCampos.Seccion.ID) {
                                dd = dataFields.filter((value) => {
                                    return value.PersonalizarCampos.Seccion.ID == datosItem.ID;
                                });
                            }

                            if (dd && dd.length > 0) {
                                return <div key={'EKSectionCustom_' + i}>
                                    <Column size={listSize} style={{ paddingTop: 20 }}  >
                                        <page.OptionSection
                                            id={datosItem.Clave}
                                            title={datosItem.Nombre}
                                            icon={datosItem.Icono} level={1} collapsed={false} hideCollapseButton={true} >
                                            <div>
                                                {fnCreateListItems(dd)}
                                            </div>
                                        </page.OptionSection>
                                    </Column>
                                </div>;
                            } else {
                                return null;
                            }
                        });
                    return retValue;
                }
                items = fnCreateListSections(sections);

                return <div>
                    {items}
            </div>;
            } else {
                return <div>
                </div>;
            }
        }
    };

    export let cFieldsRendering: any = global.connect(cFieldsRenderingBase);


    interface IFieldsEditorProps extends React.Props<any> {
        info: FiledInfo;
        item: any;
        idForm: string;
        style?: React.CSSProperties;
        referencia: any; 
        modoView: boolean;
        dataManager?: StateDataManager;
    }

    interface IFieldsEditorState {
        file: EK.UX.Kontrol.File;
    }

    export let FieldsEdit: any = global.connect(class extends React.Component<IFieldsEditorProps, IFieldsEditorState>{
        constructor(props: IFieldsEditorProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
            //--input
            this.getInputTexto = this.getInputTexto.bind(this);
            this.getInputNumero = this.getInputNumero.bind(this);
            this.getInputLogico = this.getInputLogico.bind(this);
            this.getInputFecha = this.getInputFecha.bind(this);
            this.getInputArchivo = this.getInputArchivo.bind(this);
            this.getInputLista = this.getInputLista.bind(this);

            this.state = { file: new EK.UX.Kontrol.File(null) }
        }
        static props: any = (state: any) => ({
            //dataManager: new StateDataManager(state.seguimientosReducer)
        });
        refs: {
            row: Element;
        };

        onChange(file: EK.UX.Kontrol.File): void {
            this.setState({ file: file });

        }

        getInputTexto(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta : "";
            let valor: string = item.ValorRegistro ? String(item.ValorRegistro) : "";
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(","); 

            if (this.props.modoView) {
                return <label.Label id={this.props.referencia} label={etiqueta} value={valor} size={listSize} />
            } else {
                return <input.Text
                    id={this.props.referencia}
                    label={etiqueta}
                    size={listSize}
                    value={valor}
                    required={obligatorio}
                    maxLength={255}
                    validations={obligatorio ? [validations.required()] : []}
                    idFormSection={NameFormCustom}
                />
            }
        }

        getInputNumero(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta : "";
            let valor: number = item.ValorRegistro ? parseFloat(item.ValorRegistro) : 0;
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(","); 

            if (this.props.modoView) {
                return <label.Label id={this.props.referencia} label={etiqueta} value={valor} size={listSize} />
            } else {
                return <input.Integer
                    id={this.props.referencia}
                    label={etiqueta}
                    size={listSize}
                    value={valor}
                    required={obligatorio}
                    validations={obligatorio ? [validations.required()] : []}
                    maxLength={255}
                    idFormSection={NameFormCustom}
                />
            }
        }

        getInputLogico(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta : "";
            let str: string = String(item.ValorRegistro);
            let valor: boolean = str ? str.toLowerCase() === 'true'? true : false : false ;
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(",");
            let classSize: string = ["col-xs-", listSize[0], " col-sm-", listSize[1], " col-md-", listSize[1], " col-lg-", listSize[3]].join("");

            if (this.props.modoView) {
                let value: boolean = valor;
                let valueOf: boolean = Boolean(value).valueOf();
                let viewValue: any; 
                switch (valueOf) {
                    case true:
                        viewValue = <div> <span className='label-true'><i className='fa fa-check'></i></span> <span className='label-false-undef'><i className='fas fa-times'></i></span></div>;  
                        break;
                    case false:
                        viewValue = <div> <span className='label-true-undef'><i className='fa fa-check'></i></span><span className='label-false'><i className='fas fa-times'></i></span> </div>;  
                        break;
                    default:
                        viewValue = <div> <span className='label-true-undef'><i className='fa fa-check'></i></span><span className='label-false-undef'><i class='fas fa-times'></i></span></div>;  
                        break;
                }

                return <div className={classSize}>
                    <div className="label-text" style={{ padding: "5px", fontSize: "11px", textTransform: "uppercase" }}>
                                {etiqueta}
                            </div>
                            {viewValue}
                </div>;
                //<label.Estatus id={this.props.referencia} label={etiqueta} value={false} size={[12, 12, 12, 12]} />    ;
                //return <label.Estatus id={this.props.referencia} label={etiqueta} value={false} size={[12, 12, 12, 12]} /> 


            } else {
                return <CheckBox
                    id={this.props.referencia}
                    label={etiqueta}
                    xs={{ size: listSize[0] }}
                    sm={{ size: listSize[1] }}
                    md={{ size: listSize[2] }}
                    lg={{ size: listSize[3] }}
                    required={obligatorio}
                    checkedLabel={etiqueta}
                    uncheckedLabel={etiqueta}
                    value={valor}
                    disabled={false}
                    idFormSection={this.props.idForm}
                />
            }
        }

        getInputFecha(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta: "";
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let valor: Date = new Date(item.ValorRegistro);
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(",");

            if (this.props.modoView) {
                return <label.Label id={this.props.referencia} label={etiqueta} value={valor} size={listSize} />
            } else {
                return <DatePicker
                    id={this.props.referencia}
                    label={etiqueta}
                    value={valor}
                    size={listSize}
                    required={obligatorio}
                    maxLength={8}
                    validations={obligatorio ? [validations.required()] : []}
                    idForm={this.props.idForm}
                    idFormSection={NameFormCustom}
                />
            }
        }

        getInputArchivo(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta : "";
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let valor: string = String(item.ValorRegistro);
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(",");

            if (this.props.modoView) {

                    //let link: string = ["SCV/Seguimientos", "Requisitos/GetFile", item.IdExpediente, item.IdRequisito, item.Valor].join("/");
                    //let element: JSX.Element;

                    //if (item.Valor) {
                    //    element =
                    //        <span>
                    //            <i className="fa fa-cloud-download"></i>&nbsp;
                    //        <a href={link} title={"skdnskcnsc"} download> Descargar { /*$page.form.section.etapas$Requisitos.popover.download */ }</a>
                    //        </span>
                    //} else {
                    //    element = <span> Archivo sin Cargar{ /* $page.form.section.etapas$Requisitos.popover.nodata */}</span>
                    //}


                return <label.Label id={this.props.referencia} label={etiqueta} value={valor} size={listSize} />
            } else {
                return <EK.UX.Kontrol.KontrolFile$Input
                    id={this.props.referencia}
                    label={etiqueta}
                    size={listSize}
                    required={obligatorio}
                    onChange={this.onChange}
                    validations={obligatorio ? [validations.required()] : []}
                    idFormSection={this.props.idForm}
                    mode={EK.UX.Kontrol.FileInputMode.Default}
                />
            }
        }

        getInputLista(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta : "";
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let valor: string = item.ValorRegistro ? String(item.ValorRegistro) : "";
            let valorLabel: string = item.PersonalizarCampos.Nombre ? String(item.PersonalizarCampos.Nombre) : "";
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(",");
            if (this.props.modoView) {
                if (valor === "" || valor === null) {
                    valor = "";
                } else {
                    let selected = JSON.parse(valor);
                    valor = selected.Nombre; 
                }
                return <label.Label id={this.props.referencia} label={etiqueta} value={valorLabel} size={listSize} />
            } else {
                return <ListaValoresDDL
                    id={this.props.referencia}
                    info={item}
                    idFormSection={this.props.idForm}
                    label={etiqueta}
                    hasValidationError={true}
                    size={listSize}
                    required={obligatorio}
                    validations={obligatorio ? [validations.required()] : []}
                />
            }
        }

        getInputEntidad(): JSX.Element {
            let item: any = this.props.item;
            let etiqueta: any = item.PersonalizarCampos ? item.PersonalizarCampos.Etiqueta : "";
            let obligatorio: any = item.PersonalizarCampos ? item.PersonalizarCampos.Configuracion.Requerido : false;
            let valor: string = item.ValorRegistro ? String(item.ValorRegistro) : "";
            let valorLabel: string = item.PersonalizarCampos.Nombre ? String(item.PersonalizarCampos.Nombre) : "";
            let size: any = item.PersonalizarCampos.Size ? item.PersonalizarCampos.Size : "12, 12, 12, 12";
            let listSize: number[] = size.split(",");
            if (this.props.modoView) {
                return <label.Label id={this.props.referencia} label={etiqueta} value={valorLabel} size={listSize} />
            } else {
                return <CampoEntidadDDL
                    id={this.props.referencia}
                    info={item}
                    value={valor}
                    initialValue={valor}
                    idFormSection={this.props.idForm}
                    label={etiqueta}
                    size={listSize}
                    required={obligatorio}
                    validations={obligatorio ? [validations.required()] : []}
                />
            }
        }

        shouldComponentUpdate(nextProps: IFieldsEditorProps, nextState: IFieldsEditorState): boolean {
            return hasChanged(this.props.modoView, nextProps.modoView) || hasChanged(this.props.item, nextProps.item) || hasChanged(this.props.info, nextProps.info) ||
                this.state.file !== nextState.file;
        }

        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let info: FiledInfo = this.props.info;
            let item: any = this.props.item;
            let inputArr: JSX.Element[] = [];

            switch (item.PersonalizarCampos.TipoCampo.Clave) {
                case 'NUM':
                    inputArr['NUM'] = this.getInputNumero();
                    break;
                case 'TEX': 
                    inputArr['TEX'] = this.getInputTexto();
                    break;
                case 'LOG': 
                    inputArr['LOG'] = this.getInputLogico();
                    break;
                case 'FEC':
                    inputArr['FEC'] = this.getInputFecha();
                    break;
                case 'ARCH': 
                    inputArr['ARCH'] = this.getInputArchivo();
                    break;
                case 'LIS':
                    inputArr['LIS'] = this.getInputLista();
                    break;
                case 'ENT':
                    inputArr['ENT'] = this.getInputEntidad();
                    break;
                default:
                    break;
            }
            return <div > {inputArr[item.PersonalizarCampos.TipoCampo.Clave] }</div>;
        }
    });


    interface IListaValoresDDL extends IDropDrownListProps {
        info?: any;
    }

    let ListaValoresDDL: any = global.connect(class extends React.Component<IListaValoresDDL, {}>{
        constructor(props: IListaValoresDDL) {
            super(props);
        }

        static props: any = (state: any) => ({
            items: state.global.simpleddlitems
        });

        static defaultProps: IDropDrownListProps = {
            id: "Valor",
            items: createDefaultStoreObject([]),
            label: "Valor",
            helpLabel: "Seleccione un Elemento de la Lista",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let info: any = this.props.info;
            let item: any = { ID: 0, Nombre: "undefined" };
            let items: any[] = [];

            try {
                if (info.PersonalizarCampos.Valor) {
                    item = JSON.parse(info.ValorRegistro);
                }
            } catch (e) { }

            try {
                if (info.PersonalizarCampos.Valor) {
                      items = JSON.parse(info.PersonalizarCampos.Valor);
                }
            } catch (e) { }

            Forms.updateFormElement(idForm, this.props.id, item);
            dispatchSuccessful("load::simpleddlitems", items);
        }

        shouldComponentUpdate(nextProps: IListaValoresDDL, nextState: IListaValoresDDL): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    interface ICampoEntidadDDL extends IDropDrownListProps {
        info?: any;
        catalogoGeneral?: DataElement;
        dataManager?: StateDataManagerCustomForm;
    }

    let CampoEntidadDDL: any = global.connect(class extends React.Component<ICampoEntidadDDL, {}>{
        constructor(props: ICampoEntidadDDL) {
            super(props);
            this.props.id
        }

        static props: any = (state: any) => ({
             catalogoGeneral: state.global,
             dataManager: new StateDataManagerCustomForm(state.global)
        });

        static defaultProps: IDropDrownListProps = {
            id: "Valor",
            items: createDefaultStoreObject([]),
            label: "Valor",
            helpLabel: "Seleccione el valor",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };

        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let idCatalogo: number = Number(this.props.info.PersonalizarCampos.TipoEntidad.ID);
            let idEntidad: number = Number(this.props.info.ValorRegistro);
            Forms.updateFormElement(idForm, this.props.id, { ID: idEntidad });
            global.dispatchAsync("load::CustomFormCatalogo_"+this.props.id, "catalogos/get/" + idCatalogo);
        }

        componentWillReceiveProps(nextProps: ICampoEntidadDDL): void {
            if (global.hasChanged(this.props.catalogoGeneral["CustomFormCatalogo_" + this.props.id], nextProps.catalogoGeneral["CustomFormCatalogo_" + this.props.id])) {
                if (global.isSuccessful(nextProps.catalogoGeneral["CustomFormCatalogo_"+this.props.id])) {
                    let data: any = global.getData(nextProps.catalogoGeneral["CustomFormCatalogo_" + this.props.id]);
                    let parametros: any = global.encodeParameters({ activos: 1 });
                    global.dispatchAsync("load::entidadItems_" + this.props.id, "base/" + data.Clave + "/all/" + parametros);
                }
            }
        }

        //componentDidUpdate(prevProps: ICampoEntidadDDL, {}) {
        //    if (this.props.value != '') {
        //        $("#formControl_" + this.props.id).val(this.props.value);
        //        $("#formControl_" + this.props.id).change();
        //    }
        //}

        shouldComponentUpdate(nextProps: ICampoEntidadDDL, nextState: ICampoEntidadDDL): boolean {
            return true
           // return   hasChanged(this.props.items, nextProps.items)
           //return hasChanged(this.props.catalogoGeneral["entidadItems_" + this.props.id], nextProps.catalogoGeneral["entidadItems_" + this.props.id]);
           //return  hasChanged(this.props.catalogoGeneral["CustomFormCatalogo_" + this.props.id], nextProps.catalogoGeneral["CustomFormCatalogo_" + this.props.id]);
        }

        render(): any {
            let items: DataElement = this.props.dataManager.getById("entidadItems_" + this.props.id);
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={items} />;
        };
    });
}
import FieldsRendering = EK.Modules.Kontrol.Pages.PersonalizarCampos.cFieldsRendering;

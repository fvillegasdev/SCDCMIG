//SCVClientes
namespace EK.Modules.Kontrol.Pages.PersonalizarCampos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("personalizarCampos", "kontrol");
    let PAGE_ID = config.id;
    const PAGE_ID_NAME: string = "Personalizar Campos";
   // PAGE_ID = PAGE_ID.toUpperCase();
    export interface ITipoCampoEnum {
        numero: string;
        lista: string;
        texto: string;
        logico: string;
        fecha: string;
        archivo: string;
        entidad: string;
    };

    export var TipoCampoEnum: ITipoCampoEnum = {
        numero: "NUM",
        lista: "LIS",
        archivo: "ARCH",
        fecha: "FEC",
        logico: "LOG",
        texto: "TEX",
        entidad: "ENT"
    }


    interface ITipoCampo extends page.IProps {
        vigenciaActiva: any;
    }

   
    export let Edicion: any =  global.connect(class extends React.Component<ITipoCampo, {}> {

        saveForm(props: ITipoCampo, item: EditForm): any {

            let a: any = item;

            dispatchSuccessful("load::VigenciaActiva", { valor: item["TieneVencimiento"] });

            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addDescripcion()
                .addString("Etiqueta")
                .addObject("TipoCampo")
                .addObject("TipoEntidad")
                .addNumber("Ancho")
                .addBoolean("Obligatorio")
                .addBoolean("TieneVencimiento")
                .addDate("VencimientoInicio")
                .addDate("VencimientoFin")
                .addString("Valor")
                .addEstatus()
                .addVersion()
                .toObject();

            if (!model["TieneVencimiento"]) {
                model["VencimientoInicio"] = null;
                model["VencimientoFin"] = null;
            } else {
                if (model["VencimientoInicio"] === null || model["VencimientoInicio"] === undefined) {
                    warning("verificar la fecha de incio");
                    return;
                }
                if (model["VencimientoFin"] === null || model["VencimientoFin"] === undefined) {
                    warning("verificar la fecha de Fin");
                    return;
                }
            }
            return model;
        };
        //
        onEntityLoaded(props: ITipoCampo): void {
            let TieneVencimiento: any = getData(props.entidad).TieneVencimiento; 
            if (isSuccessful(props.entidad)) {
                if (getData(props.entidad).ID > 0) {
                    dispatchSuccessful("load::VigenciaActiva", { valor: TieneVencimiento });
                } else {
                   // dispatchSuccessful("load::VigenciaActiva", {});
                }
            } else {
                dispatchSuccessful("load::VigenciaActiva", {});
            }
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    });


 
    let Edit: any = global.connect(class extends React.Component<ITipoCampo, {}> {
        constructor(props: ITipoCampo) {
            super(props);
            this.onChangeVigencia = this.onChangeVigencia.bind(this);

        }
        static props: any = (state: any) => ({
            vigenciaActiva: state.global.VigenciaActiva
        });
        onChangeVigencia(e: any): any {
            dispatchSuccessful("load::VigenciaActiva", { valor: e });
        }

        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID_NAME}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
            
                            <Column size={[12, 12,12,12]}>
                                <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                                <input.Nombre size={[12, 12, 4, 4]} maxLength={150} validations={[validations.required()]} />
                                <input.Text id="Etiqueta" size={[12, 12, 4, 4]} maxLength={50} validations={[validations.required()]} />
                                <checkBox.Status size={[12, 12, 2, 2]} />
                                <input.Text id="Descripcion" size={[12, 12, 12, 12]} maxLength={50} validations={[]} />
                                <Row >
                                    <Column size={[12, 12, 4, 4]} style={{ marginTop: "10px" }}>
                                        <TipoCampo
                                            level={1}
                                            size={[12, 12, 12, 12]}
                                            edicion={true} />
                                    </Column>
                                    <Column size={[12, 12, 8, 8]} style={{ marginTop: "10px" }}>
                                        <page.OptionSection
                                            id={"Configuracion"}
                                            collapsed={false}
                                            title={"Configuración"}
                                            level={1}>
                                            <Row >
                                                <input.Integer id="Ancho" size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                                                <checkBox.CheckBox id="Obligatorio" value={false} size={[6, 6, 2, 2]} />
                                                <checkBox.CheckBox id="TieneVencimiento"  size={[6, 6, 2, 2]} change={this.onChangeVigencia}  />
                                                {getData(this.props.vigenciaActiva).valor ?
                                                    <div>
                                                        <input.Date
                                                            id={"VencimientoInicio"}
                                                            label={"Inicio"}
                                                            type="datetime" formato="dd/mm/yyyy hh:ii"
                                                            size={[12, 12, 12, 6]}
                                                        />
                                                        <input.Date
                                                            id={"VencimientoFin"}
                                                            label={"Fin"}
                                                            type="datetime" formato="dd/mm/yyyy hh:ii"
                                                            size={[12, 12, 12, 6]}
                                                            validations={[
                                                                validations.greaterEqualThan("VencimientoInicio", "La Fecha de Finalización, no puede ser menor a la de inicio")
                                                            ]}
                                                        />
                                                    </div>
                                                    : null}
                                            </Row>

                                        </page.OptionSection>

                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });


    let View: any = global.connect(class extends React.Component<ITipoCampo, {}> {
        static props: any = (state: any) => ({
            vigenciaActiva: state.global.VigenciaActiva
        });
        render(): JSX.Element {
            let TieneVencimiento: any = getData(this.props.entidad).TieneVencimiento;
            if (isSuccessful(this.props.entidad)) {

            }
            //let a: any = 5 + 1 ;
            //let entidad: any = this.props.config.getEntity();
            //let entidadData: any = global.getData(entidad);
            //let nombre: string = "";
            //if (global.isSuccessful(entidad)) {
            //    if (entidadData.Cliente) {
            //        nombre = '(' + entidadData.Cliente.Clave + ') ' + entidadData.Cliente.Nombre + ' ' + entidadData.Cliente.ApellidoPaterno + ' ' + entidadData.Cliente.ApellidoMaterno;
            //    };
            //};

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={PAGE_ID_NAME}
                            icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <label.Clave size={[12, 12, 2, 2]} />
                                <label.Nombre size={[12, 12, 4, 4]} />
                                <Label id='Etiqueta'  size={[12, 12, 4, 4]} />
                                <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                                <label.Descripcion size={[12, 12, 12, 12]} />
                              
                                <Row >
                                    <Column size={[12, 12, 4, 4]} style={{ marginTop: "10px" }}>
                                        <TipoCampo
                                            level={1}
                                            size={[12, 12, 12, 12]}
                                            edicion={false} />
                                    </Column>
                                    <Column size={[12, 12, 8, 8]} style={{ marginTop: "10px", paddingRight: "30px", paddingLeft: "30px"}}>
                                        <page.OptionSection
                                            id={"Configuracion"}
                                            collapsed={false}
                                            title={"Configuración"}
                                            level={1}>
                                            <Row >
                                                <Label id='Ancho' size={[12, 12, 2,2]} />
                                                <label.Boolean id="Obligatorio" size={[6, 6, 2, 2]} />
                                                <label.Boolean id="TieneVencimiento" size={[6, 6, 2, 2]} />
                                                {getData(this.props.vigenciaActiva).valor ?
                                                    <div>
                                                        <label.FechaHora label="Inicio" id="VencimientoInicio" size={[12, 12, 3,3]} />
                                                        <label.FechaHora label="Fin" id="VencimientoFin" size={[12, 12,3,3]} />
                                                    </div>
                                                 : null  }
                                            </Row>
                                        </page.OptionSection>
                                    </Column >
                                                                               
                                </Row>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
                {/*



                //<Column size={[12, 10, 8, 8]}>
                //    <page.OptionSection
                //        id={PAGE_ID}
                //        subTitle={PAGE_ID}
                //        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                //        <Row>
                //            <label.Clave size={[12, 2, 2, 2]} />
                //            <label.Nombre size={[12, 8, 8, 8]} />
                //            <label.Estatus size={[12, 2, 2, 2]} />
                //        </Row>

                //    </page.OptionSection>
                //</Column>
*/}
            </page.View>;
        };
    });

    //BEGIN: Tipo Campo
    interface ITipoCampoDetalle extends React.Props<any>, grid.IColumn {
        entity?: DataElement;
        tipoCampo?: any;
        edicion?: boolean;
        level?: number;
    }
    export let TipoCampo: any = global.connect(class extends React.Component<ITipoCampoDetalle, {}>{
        constructor(props: ITipoCampoDetalle) {
            super(props);
        }
        static props: any = (state: any) => ({
            entity: state.global.currentEntity,
            // tipoCampo: state.requisitos.tipoSelected
            tipoCampo: state.global.catalogo$TipoCampoSelect
        });
        componentWillMount(): void {
            let entidad: any = getData(this.props.entity);
            // dispatchSuccessful("scv-requisitos-tipoSelected", entidad.TipoCampo);
            global.dispatchSuccessful("global-page-data", entidad.TipoCampo, "TipoCampoSelect");
        }
        componentWillReceiveProps(nextProps: ITipoCampoDetalle) {
            if (hasChanged(this.props.tipoCampo, nextProps.tipoCampo)) {
                let tipoCampo: any = getData(nextProps.tipoCampo);
                if (tipoCampo.Clave !== TipoCampoEnum.lista) {
                    Forms.updateFormElement(config.id, "Valor", null);
                }
                if (tipoCampo.Clave !== TipoCampoEnum.entidad) {
                    Forms.updateFormElement(config.id, "TipoEntidad", null);
                }
            }
        }
        shouldComponentUpdate(nextProps: ITipoCampoDetalle, {}): boolean {
            return hasChanged(this.props.tipoCampo, nextProps.tipoCampo) ||
                this.props.edicion !== nextProps.edicion;
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let tipoCampo: any = getData(this.props.tipoCampo);
            let edicion: boolean = this.props.edicion;

            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <page.OptionSection
                    id={"tipoCampo"}
                    collapsed={false}
                    title={"Tipo de Campo"}
                    level={this.props.level}>
                    <Row>
                        {edicion ?
                            <ddl.TiposCamposDDL
                                id={"TipoCampo"}
                                idFormSection={config.id}
                                label={"Tipo"}
                                size={[12, 12, 12, 12]}
                                value={entidad.TipoCampo}
                                required={true}
                                validations={[validations.required()]} />
                            : <label.Entidad id="TipoCampo" label={"Tipo"} size={[12, 12, 12, 12]} />
                        }
                    </Row>
                    <Row>
                        {tipoCampo.Clave === TipoCampoEnum.lista ?
                            <BasicList
                                size={[12, 12, 12, 12]}
                                id={"Valor"}
                                idForm={config.id}
                                readOnly={edicion ? false : true} /> : null
                        }
                        {tipoCampo.Clave === TipoCampoEnum.entidad ?
                            <CampoEntidad
                                size={[12, 12, 12, 12]}
                                id={"TipoEntidad"}
                                idFormSection={config.id}
                                readOnly={edicion ? false : true} /> : null
                        }
                    </Row>
                </page.OptionSection>
            </Column>
        }
    });
    //END: Tipo Campo

    interface ICampoEntidad extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        id?: string;
        entity?: DataElement;
        readOnly?: boolean;
        idFormSection?: string;
    };
    export let CampoEntidad: any = global.connect(class extends React.Component<ICampoEntidad, {}>{
        constructor(props: ICampoEntidad) {
            super(props);
        }
        static props: any = (state: any) => ({
            forms: state.forms,
            entity: state.global.currentEntity
        });
        static defaultProps: ICampoEntidad = {
            id: "",
            entity: createDefaultStoreObject({}),
            readOnly: true,
            idFormSection: ""
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entity);
            let editView: boolean = !this.props.readOnly;
            let formatValue: any = (item) => {
                return !item ? "" : (!item.Clave ? "" : "(" + item.Clave + ") ") + (!item.Nombre ? "" : item.Nombre);
            };

            return editView ?
                <CampoEntidadesDDL
                    id={this.props.id}
                    idFormSection={this.props.idFormSection}
                    size={this.props.size}
                    label="Tipos de Entidades"
                    required={true}
                    validations={[validations.required()]} />
                : <label.Entidad id={this.props.id} size={this.props.size} />
        }
    });
    interface ICampoEntidadDDL extends EK.UX.DropDownLists.IDropDrownListProps { }
    export let CampoEntidadesDDL: any = global.connect(class extends React.Component<ICampoEntidadDDL, EK.UX.DropDownLists.IDropDrownListState>{
        static props: any = (state: any) => ({
            items: state.global.CamposEntidades,
            entity: state.global.currentEntity,
        });
        static defaultProps: EK.UX.DropDownLists.IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo de Entidad",
            helpLabel: "Seleccione el tipo de entidad",
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
            if (!isLoadingOrSuccessful(this.props.items)) {
               // se usó SCVTIPOSREQUISITO para que se utilicen los mismos tipos entre personalizar campos - requisitos
                dispatchAsync("load::CamposEntidades", "catalogos/get(SCVENTIDADESREQUISITOS)");
            }
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />
        };
    });
};
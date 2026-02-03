namespace EK.Modules.SCV.Pages.Comisiones.Ajustes {
    "use strict";
    const PAGE_ID: string = "Ajustes a Comisiones";
    const PARCIALIDADES: string = "Parcialidades";

    const config: page.IPageConfig = global.createPageConfig("comisionesAjustes", "scv", [PARCIALIDADES]);


    let obtenerParcialidades: (idComisionAjuste: number) => any = (idComisionAjuste: number): any => {
        let parametros: any = global.assign({ idComisionAjuste });
        dispatchAsync("global-page-data", "base/scv/comisionesAjustes/Get/ObtenerParcialidades/" + global.encodeObject(parametros), PARCIALIDADES);
    };


    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("TipoComision")
                .addObject("Usuario")

                .addNumber("ImporteComisionMoneda")
                .addNumber("ImporteComision")

                .addNumber("NumeroParcialidades")
                .addObject("Periodicidad")
                .addObject("Moneda")
                .addObject("Desarrollo")
                .addDate("FechaAplicacionAbono")
                .addDate("FechaAplicacionCargo")
                .addObject(PARCIALIDADES)
                .addEstatus()
                .addVersion()
                .toObject();

            let periodicidad: any = model.Periodicidad;
            let clavePeriodicidad: string = periodicidad && periodicidad.Clave ? periodicidad.Clave:"";
            let numeroParcialidades: number = model.NumeroParcialidades;
            let validacionNumeroPacialidades: boolean = true;

            let tipoComision: any = model.TipoComision;

            let claveNaturaleza = tipoComision && tipoComision.ID > 0 ? tipoComision.TipoMovimiento_OC.Naturaleza.Clave : "";
            let comisionComplementaria: boolean = tipoComision && tipoComision.ID > 0 && tipoComision.TipoComision.ID > 0 ? true : false;

            if (claveNaturaleza == "ABO" || (comisionComplementaria == true && claveNaturaleza=="CAR"))
            {
                if (numeroParcialidades == 0) {
                    warning("El Número de parcialidades no debe ser 0")
                    return null;
                }

                switch (clavePeriodicidad) {
                    case "S":
                        validacionNumeroPacialidades = numeroParcialidades > 52 ? false : true;
                        break;
                    case "Q":
                        validacionNumeroPacialidades = numeroParcialidades > 24 ? false : true;
                        break;
                    case "M":
                        validacionNumeroPacialidades = numeroParcialidades > 12 ? false : true;
                        break;
                    case "B":
                        validacionNumeroPacialidades = numeroParcialidades > 6 ? false : true;
                        break;
                    case "T":
                        validacionNumeroPacialidades = numeroParcialidades > 4 ? false : true;
                        break;
                    case "C":
                        validacionNumeroPacialidades = numeroParcialidades > 3 ? false : true;
                        break;
                    case "SE":
                        validacionNumeroPacialidades = numeroParcialidades > 2 ? false : true;
                        break;
                    case "A":
                        validacionNumeroPacialidades = numeroParcialidades > 1 ? false : true;
                        break;

                }
            }

            if (validacionNumeroPacialidades) {
                return model;
            }
            else
            {
                warning("El Número de parcialidades excede 1 año")
                return null;
            }

            
        };
        onEntityLoaded(props: page.IProps): any {

            let entidad: any = getData(props.entidad);

            let idComisionAjuste: number = getDataID(props.entidad);
            if (idComisionAjuste === -1) {
                global.dispatchSuccessful("global-page-data", [], PARCIALIDADES);
            }
            else
            {
                obtenerParcialidades(idComisionAjuste);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onSave={this.saveForm}
                onEntityLoaded={this.onEntityLoaded}
                allowDelete={false}
                allowEdit={false}
            >

                <PageButtons>
                    <CancelarButton/>

                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    interface IComisionAjuste extends page.IProps {
        desarrollo: any;
        tipoComision: any;

    };

    let Edit: any = global.connect(class extends React.Component<IComisionAjuste, IComisionAjuste> {
        constructor(props: IComisionAjuste) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tipoComision = Forms.getValue("TipoComision", config.id);
            retValue.desarrollo = Forms.getValue("Desarrollo", config.id);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IComisionAjuste, nextState: IComisionAjuste): any {

            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {
                let desarrollo: any = nextProps.desarrollo;
                let estadoEntidad: boolean = page.canViewEditMode();

                if (estadoEntidad)
                {
                    if (desarrollo && desarrollo.ID > 0 && desarrollo.Moneda && desarrollo.Moneda.ID) {

                        Forms.updateFormElement(config.id, "Moneda", { ID: desarrollo.Moneda.ID, clave: desarrollo.Moneda.Clave });
                    }
                    else {
                        Forms.updateFormElement(config.id, "Moneda", { ID: -1, clave: "Seleccione una opción" });
                    }
                }

            };

        };
        render(): JSX.Element {
            let tipoComision: any = this.props.tipoComision;
            let claveNaturaleza = tipoComision && tipoComision.ID > 0 ? tipoComision.TipoMovimiento_OC.Naturaleza.Clave : "";

            let comisionComplementaria: boolean = tipoComision && tipoComision.ID > 0 && tipoComision.TipoComision.ID > 0 ? true : false;
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-square-root-alt" collapsed={false} hideCollapseButton={true}>
                        <Row>

                            <TMComisiones id={"TipoComision"} size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />
                            <ddl.AgentesDDL id={"Usuario"} size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />
                            <ddl.DesarrollosDDL id={"Desarrollo"} size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />
                            <ddl.MonedasDDL id={"Moneda"} size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />

                            <input.Currency id={"ImporteComisionMoneda"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                          
                            <Column size={[12, 12, 12, 12]}>

                                {claveNaturaleza == "CAR" ?
                                    <Cargo />
                                    :
                                    null
                                }

                                {claveNaturaleza == "ABO" || comisionComplementaria == true ?
                                    <Abono />
                                    :
                                    null
                                }
                               

                            </Column>
                            
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    let View: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };

        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);

            let tipoComision: any = entidad && entidad.TipoComision ? entidad.TipoComision : "";

            let claveNaturaleza = tipoComision && tipoComision.ID > 0 ? tipoComision.TipoMovimiento_OC.Naturaleza.Clave : "";
            let comisionComplementaria: boolean = tipoComision && tipoComision.ID > 0 && tipoComision.IdTipoComision > 0 ? true : false;

            return <page.View>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        level="main"
                        icon="fas fa-square-root-alt" collapsed={false} hideCollapseButton={true}>
                        <Row>

                            <label.Custom id="TipoComision" size={[12, 3, 3, 3]} value={(e) => {
                                if (!e) return "";
                                if (!e.TipoComision) return "";

                                return ["(", e.TipoComision.TipoMovimiento_OC.Naturaleza.Clave, ") ", e.TipoComision.Nombre].join("");
                            }} />

                            <label.Entidad id={"Usuario"} size={[12, 3, 3, 3]} />
                            <label.Entidad id={"Desarrollo"} size={[12, 2, 2, 2]} />
                            <label.Moneda id={"Moneda"} size={[12, 2, 2, 2]} />
                            <label.Entidad id={"Estatus"} size={[12, 2, 2, 2]} />

                            <label.Currency id={"ImporteComisionMoneda"} size={[12, 3, 3, 3]} />


                            <Column size={[12, 12, 12, 12]}>
                                {claveNaturaleza == "CAR" ?
                                        <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}  >
                                            <page.OptionSection
                                                id="Cargo"
                                                subTitle={"Cargo"}
                                                icon="fas fa-angle-double-down" level={1} collapsed={false} hideCollapseButton={false}>

                                                <label.Fecha id={"FechaAplicacionCargo"} size={[12, 3, 3, 3]} />

                                            </page.OptionSection>
                                        </Column>
                                    :
                                    null
                                }

                                {claveNaturaleza == "ABO" || comisionComplementaria == true?

                                    <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}  >
                                        <page.OptionSection
                                            id="Abono"
                                            subTitle={"Abonos"}
                                            icon="fas fa-angle-double-up" level={1} collapsed={false} hideCollapseButton={false}>
                                            <label.Entidad id={"Periodicidad"} size={[12, 3, 3, 3]} />
                                            <Label id={"NumeroParcialidades"} size={[12, 3, 3, 3]} />
                                            <label.Fecha id={"FechaAplicacionAbono"} size={[12, 3, 3, 3]} />
                                        </page.OptionSection>

                                        <Parcialidades />

                                    </Column>
                                    :
                                    null
                                }

                           
                                
                            </Column>

                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });


    export let Parcialidades: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {

            let cancelarComision: any = {
                icon: "fas fa-times",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {

                    let $ml: any = this.props.config.getML();

                    EK.Global.confirm($ml.sections.Parcialidades.Cancelacion.descripcion, $ml.sections.Parcialidades.Cancelacion.title, () => {

                        global.asyncPut("base/scv/comisionesAjustes/Get/CancelarParcialidad", item, (status: AsyncActionTypeEnum, data: any) => {

                            if (status === AsyncActionTypeEnum.loading) {
                                global.dispatchFullSuccessful("global-page-data", data, PARCIALIDADES);
                            }

                            if (status === AsyncActionTypeEnum.successful) {
                                global.dispatchFullSuccessful("global-page-data", data, PARCIALIDADES);
                                
                            }


                        });
                    });

                   
                }
            };
            let formatEstatus: (data: any) => string = (data: any) => {
                let clave: string = data && data.Clave ? data.Clave : "";

                let retValue: any;

                switch (clave) {
                    
                    case "PA":
                        retValue = <span className="badge badge-primary">{data.Nombre}</span>
                        break;
                    case "APLI":
                        retValue = <span className="badge badge-primary">{data.Nombre}</span>
                        break;
                    case "AP":
                        retValue = <span className="badge badge-success">{data.Nombre}</span>
                        break;;
                    case "CAN":
                        retValue = <span className="badge badge-danger">{data.Nombre}</span>
                        break;

                    default:
                        retValue = "";
                        break;
                }

                return retValue;
            };

            return <page.SectionList
                id={PARCIALIDADES}
                icon="fas fa-project-diagram" 
                parent={config.id}

                hideNewButton={true}
                style={{padding:0 }}
                level={1}
                size={[12, 12, 12, 12]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 3, 3, 3]} className="list-center-header">{"Número Parcialidad"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-center-header">{"Fecha Aplicación"}</Column>
                        <Column size={[12, 3, 3, 3]} className="list-center-header">{"Monto"}</Column>
                        <Column size={[12, 2, 2, 2]} className="list-center-header">Estatus</Column>
                        <Column size={[12, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>}
                readonly={false}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .add("NumeroParcialidad")
                        .add("FechaAplicacion")
                        .add("Monto")
                        .addVersion()
                        .toObject();

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    let estatus: any = item.Estatus.Clave;

                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 3, 3, 3]} className="listItem-center-item">
                                    <span>{item.NumeroParcialidad}</span>
                                </Column>

                                <Column size={[12, 3, 3, 3]} className="listItem-center-item">
                                    <span>{EK.UX.Labels.formatDate(item.FechaAplicacion)}</span>
                                </Column>
                                
                                <Column size={[12, 3, 3, 3]} className="listItem-center-item">
                                    <span>{EK.UX.Labels.formatMoneyPersonalized(item.MontoMoneda, item.Moneda)}</span>
                                </Column>

                               <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            {formatEstatus(item.Estatus)}
                                </Column>

                               <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                    {estatus == "PA" ?
                                        <div>
                                            <buttons.PopOver idParent={config.id} idForm={PARCIALIDADES} info={item}
                                                extraData={[cancelarComision]} />
                                        </div>
                                        :
                                        null
                                    }
                                </Column>

                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })

    export let Abono: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {

            return <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}  >
                <page.OptionSection
                    id="Abono"
                    subTitle={"Abonos"}
                    icon="fas fa-angle-double-up" level={1} collapsed={false} hideCollapseButton={false}>

                    <EK.Modules.SCV.Pages.Tabuladores.ComisionesPeriodicidadDDL id={"Periodicidad"} size={[12, 4, 4, 4]}  addNewItem={"SO"} />
                    <input.Currency id={"NumeroParcialidades"} size={[12, 4, 4, 4]}  />
                    <input.Date id={"FechaAplicacionAbono"} size={[12, 4, 4, 4]} />

                </page.OptionSection>
                <PARCIALIDADES/>
            </Column>
        };
    })

    export let Cargo: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {

            return <Column size={[12, 6, 6, 6]} style={{ paddingTop: 20 }}  >
                <page.OptionSection
                    id="Cargo"
                    subTitle={"Cargo"}
                    icon="fas fa-angle-double-down" level={1} collapsed={false} hideCollapseButton={false}>

                    <input.Date id={"FechaAplicacionCargo"} size={[12, 4, 4, 4]} validations={[validations.required()]} />

                </page.OptionSection>
            </Column>
        };
    })

    interface ICancelarComision extends EK.UX.Buttons.IButtonProps {
        item?: any;
    }

    interface ICancelarComision extends EK.UX.Buttons.IButtonProps {
        item?: any;
        estadoEntidad?: boolean;
        config?: page.IPageConfig;
    }
    let CancelarButton: any = global.connect(class extends React.Component<ICancelarComision, {}> {
        constructor(props: ICancelarComision) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: ICancelarComision = {
            icon: "fas fa-times",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let item: any = getData(this.props.item);
            let idEntidad: any = getDataID(this.props.item);

            EK.Global.confirm($ml.sections.Cancelacion.descripcion, $ml.sections.Cancelacion.title, () => {

                global.asyncPut("base/scv/comisionesAjustes/Get/CancelarComision", item, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {

                        global.dispatchFullSuccessful("load::currentEntity", data);
                        obtenerParcialidades(idEntidad);
                    }
                });
            });
        }
        render(): JSX.Element {
            let idEntidad: any = global.getDataID(this.props.item);
            let entidad: any = global.getData(this.props.item);
            let estatus: string = entidad && entidad.Estatus ? entidad.Estatus.Clave : "";
            if (idEntidad > 0 && (estatus == "PA" || estatus == "REC")) {
                return <Button {...this.props} onClick={this.onClick} />;
            }
            else {
                return null;
            }
        }
    });
}
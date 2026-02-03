namespace EK.Modules.SCV.Pages.Tabuladores {
    "use strict";
    const CONFIGURACION_ID: string = "Configuracion";
    const EJECUCIONES_ID: string = "Ejecuciones";

    const config: page.IPageConfig = global.createPageConfig("Tabuladores", "scv", [CONFIGURACION_ID, EJECUCIONES_ID]);

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addNumber("MontoBase")
                .addBoolean("UsaPorcentaje")
                .addBoolean("Complementaria")
                .addObject("Indicador")
                .addObject("Plaza")
                .addObject("Fase")
                .addObject("Categoria")
                .addObject("Desarrollo")
                .addObject("Periodicidad")
                .addObject("Moneda")
                .addObject("TipoComision")
                .addObject(CONFIGURACION_ID)
                .addVersion()
                .toObject();

            if (model.Complementaria == false && model.Moneda.ID == null) {
                warning("Seleccione una moneda")
            }
            else {
                 return model;
            }
        };
        onEntityLoaded(props: page.IProps): any {
            let id = getDataID(props.entidad);
            let entidad = getData(props.entidad);

            if (id < 0) {
                global.dispatchSuccessful("global-page-data", [], CONFIGURACION_ID);
            }
            else {
                let parametros: any = global.assign({ idTabulador: id });
                props.config.dispatchCatalogoBase("base/scv/tabuladores/Get/GetConfiguracionTabuladores/", parametros, CONFIGURACION_ID);

                if (id > 0)
                {
                    parametros = global.assign({ id: id });
                    props.config.dispatchCatalogoBase("base/scv/tabuladores/Get/ObtenerEjecucionesPorTabulador/", parametros, EJECUCIONES_ID);

                    //let idPlaza: number = entidad && entidad.IdPlaza ? entidad.IdPlaza : 0;
                    //if (idPlaza> 0)
                    //{
                    //    let url: string = global.encodeAllURL("scv", "Desarrollos", { idPlaza, activos: 1 });
                    //    //dispatchAsync("load::PlazasDesarrollos", url);
                    //}
                }
              
            }
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>
        };
    }
    
    class View extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={config.id}
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fas fa-indent">
                        
                            <label.Clave size={[12, 3, 3, 3]}/>
                            <label.Nombre size={[12, 7, 7, 7]} />                            
                            <label.Estatus size={[12, 2, 2, 2]} />

                            <ElementosBase/>
                            <label.Entidad id="TipoComision" size={[12, 4, 4, 4]} />


                            <label.Entidad id={"Plaza"} size={[12, 6, 3, 3]} />
                            <label.Entidad id={"Desarrollo"} size={[12, 6, 3, 3]} />

                            <Moneda viewMode={true} />
                            <ValorBase viewMode={true} />

                            <label.Boolean id={"UsaPorcentaje"} size={[12, 2, 2, 2]} />
                            <label.Boolean id={"Complementaria"} size={[12, 1, 1, 1]} />


                            <Column size={[12, 12, 12, 12]}>
                            <Configuracion />
                            <EjecucionesTabulador/>
                            </Column>

                    </page.OptionSection>
                </Column>
            </page.View>
        }
    }

    interface IEntidad extends page.IProps {
    };

    let Edit: any = global.connect(class extends React.Component<IEntidad, IEntidad> {
        constructor(props: IEntidad) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);
            let ejecucionProceso: boolean = false;
            if (isSuccessful(this.props.entidad))
            {
                ejecucionProceso = entidad.EjecucionTabulador > 1 ? true : false;
            }

            return <page.Edit>
                <Column>
                    <page.OptionSection
                        id={config.id}
                        subTitle={config.id}
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fas fa-indent">
                        <input.Clave size={[12, 3, 3, 3]} />  
                        <input.Nombre size={[12, 7, 7, 7]} />                                              
                        <checkBox.Status size={[12, 2, 2, 2]} />
                        {(ejecucionProceso == true) ?
                            <ElementosBase /> :
                            <div>
                                <ddl.EKCategoriasDDL size={[12, 6, 4, 4]} />
                                <ddl.FasesExpedienteDDL id="Fase" size={[12, 6, 3, 3]} addNewItem={"SO"} validations={[validations.required()]} />
                                <ComisionesPeriodicidadDDL addNewItem={"SO"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                                <INDICADORESDDL id="Indicador" addNewItem={"SO"} addNewItemText={"Seleccione un Indicador"} size={[12, 6, 2, 2]} validations={[validations.required()]} />
                            </div>}
                        


                        <TipoComisionDDL id={"TipoComision"} size={[12, 4, 4, 4]} addNewItem={"SCO"} validations={[validations.required()]} />


                        <ddl.SCVPlazasDDL id="Plaza" size={[12, 6, 3, 3]} addNewItem={"VT"} addNewItemText={"Todos"} />
                        <PlazaDesarrollosDDL id="Desarrollo" size={[12, 6, 3, 3]} addNewItem={"VT"} addNewItemText={"Todos"} />
                        <Moneda viewMode={false} />

                        <ValorBase viewMode={false}/>

                        <checkBox.CheckBox id="UsaPorcentaje" size={[12, 2, 2, 2]}/>
                        <checkBox.CheckBox id="Complementaria" size={[12, 1, 1, 1]} />

                        <Column size={[12, 12, 12, 12]}>
                            <Configuracion />
                            <EjecucionesTabulador/>
                        </Column>


                    </page.OptionSection>
                </Column>
            </page.Edit>;
        }
    })

    class ElementosBase extends page.Base {
        render(): JSX.Element {
            return <div>
                <label.Entidad id={"Categoria"} size={[12, 6, 4, 4]} />
                <label.Entidad id={"Fase"} size={[12, 6, 3, 3]} />
                <label.Entidad id={"Periodicidad"} size={[12, 6, 3, 3]} />
                <label.Entidad id={"Indicador"} size={[12, 6, 2, 2]} />
            </div>
        }
    }

    interface IConfiguracion extends page.IProps {
        Tabuladores: any;
        Configuraciones: any;
    }

    export let Configuracion: any = global.connect(class extends React.Component<IConfiguracion, IConfiguracion>{
        constructor(props: IConfiguracion) {
            super(props);
        }

        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.Configuraciones = Forms.getValue(CONFIGURACION_ID, config.id);
            retValue.Tabuladores = Forms.getValue("Tabuladores", config.id);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let usaPorcentaje: any = Forms.getValue("UsaPorcentaje", config.id);   

            const configHeader: JSX.Element =
                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Mínimo"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Máximo"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[3, 3, 3, 3]} className="list-default-header">{"Porcentaje"}</Column>
                    </Row>
                </div>;


            return <page.SectionList
                id={CONFIGURACION_ID}
                parent={config.id}    
                icon={"fas fa-cogs"}
                level={1}
                size={[12, 12, 6, 6]}
                title="Configuración"
                readOnly={false}
                listHeader={configHeader}
                style={{ paddingTop: '10px' }}
                items={createSuccessfulStoreObject([])}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addNumber("Minimo")
                        .addNumber("Maximo")
                        .addNumber("Importe")
                        .addNumber("Porcentaje")
                        .addVersion()
                        .toObject()
                    return retValue;
                }}
                formatter={(index: number, item: any) => {                    
                    let porcentaje = (usaPorcentaje == undefined) ? getData(this.props.entidad).UsaPorcentaje : usaPorcentaje;                    
                    return <Row style={{ padding: "0px 10px" }}>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                            <span>{item.Minimo}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                            <span>{item.Maximo}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                            <span>{ EK.UX.Labels.formatMoney(item.Importe)}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                            <span>{ (item.Porcentaje != undefined) ? item.Porcentaje + "%" : null }</span>
                        </Column>
                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={CONFIGURACION_ID} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} size={[1, 1, 1, 1]} />
                        }
                    </Row>
                }}>
                <input.Integer id="Minimo" idFormSection={CONFIGURACION_ID} required={false} size={[3, 3, 3, 3]} />
                <input.Integer id="Maximo" idFormSection={CONFIGURACION_ID} required={false} size={[3, 3, 3, 3]} />                
                {(!usaPorcentaje) ?
                    <input.Currency id="Importe" idFormSection={CONFIGURACION_ID} required={false} size={[3, 3, 3, 3]} />
                    :
                    null
                }
                {(usaPorcentaje) ?
                    <input.Porcentaje id="Porcentaje" idFormSection={CONFIGURACION_ID} required={false} size={[3, 3, 3, 3]} />
                    :
                    null
                }
            </page.SectionList>
        }
    })

    interface IMoneda extends page.IProps {
        desarrollo: any;
        complementaria: any;
        entidad: any;
        viewMode: boolean;
    };


    let Moneda: any = global.connect(class extends React.Component<IMoneda, IMoneda> {
        constructor(props: IMoneda) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.desarrollo = Forms.getValue("Desarrollo", config.id, state);
            retValue.complementaria = Forms.getValue("Complementaria", config.id, state);
            retValue.entidad =state.global.currentEntity;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IMoneda, nextState: IMoneda): any {
            return hasChanged(this.props.desarrollo, nextProps.desarrollo) ||
                hasChanged(this.props.complementaria, nextProps.complementaria) ||
                hasChanged(this.props.entidad, nextProps.entidad);
        };
        componentWillReceiveProps(nextProps: IMoneda, nextState: IMoneda): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {
                let desarrollo: any = nextProps.desarrollo;
                if (desarrollo && desarrollo.ID > 0)
                {
                    Forms.updateFormElement(config.id, "Moneda", { ID: desarrollo.Moneda.ID, Clave: desarrollo.Moneda.Clave });
                }

            };

            if (global.hasChanged(this.props.complementaria, nextProps.complementaria)) {
                let complementaria: any = nextProps.complementaria;
                if (complementaria) {
                   // Forms.updateFormElement(config.id, "Moneda", { ID: -1, Clave: "SO" });
                    Forms.updateFormElement(config.id, "MontoBase", null);
                }

            };
        };
        render(): JSX.Element {
            let entidad = getData(this.props.entidad);


            if (this.props.viewMode) {

                let complementaria: any = entidad && entidad.Complementaria ? entidad.Complementaria : null;

                if (complementaria != true)
                {
                    return <label.Entidad id="Moneda" size={[12, 2, 2, 2]} />
                }
            }
            else
            {

                return <ddl.MonedasDDL id="Moneda" size={[12, 2, 2, 2]} addNewItem={"SO"} validations={[validations.required()]} />

            }
            return null;

        };
    });

    interface IValorBase extends page.IProps {
        complementaria: any;
        viewMode: boolean;
    };


    let ValorBase: any = global.connect(class extends React.Component<IValorBase, IValorBase> {
        constructor(props: IValorBase) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.complementaria = Forms.getValue("Complementaria", config.id, state);
            retValue.entidad = state.global.currentEntity;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IValorBase, nextState: IValorBase): any {
            return  hasChanged(this.props.complementaria, nextProps.complementaria) ||
                    hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {

            let entidad = getData(this.props.entidad);

            if (this.props.viewMode) {

                let complementaria: any = entidad && entidad.Complementaria ? entidad.Complementaria : null;

                if (complementaria != true) {
                    return <label.Currency id={"MontoBase"} size={[12, 2, 2, 2]} />
                }
            }
            else {
                let complementaria: any = this.props.complementaria;

                if (complementaria != true) {
                    return <input.Currency id="MontoBase" size={[12, 2, 2, 2]} />
                }
            }
            return null;

        };
    });

    export let ComisionesPeriodicidadDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.Periodicidad
        });
        static defaultProps: IDropDrownListProps = {
            id: "Periodicidad",
            items: createDefaultStoreObject([]),
            label: "Periodicidad",
            helpLabel: "Seleccione la periodicidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ activos: 1 });
                dispatchAsync("load::Periodicidad", "base/scv/tabuladores/Get/GetAllPeriodicidad/" + encodedFilters);
            }
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}/>;
        }
    });


    export let EjecucionesTabulador: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let idEntidad: number = getDataID(this.props.entidad);
            if (idEntidad == undefined || idEntidad == -1)
                return null;
            return <page.SectionList
                id={EJECUCIONES_ID}
                icon="fas fa-check-double"
                title="Ejecuciones por Periodo"
                parent={config.id}
                level={1}
                style={{ paddingTop: '10px' }}
                size={[12, 6, 6, 6]}
                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"N"}</Column>
                        <Column size={[12, 12, 4, 4]} className="list-default-header">{"Fecha Inicio"}</Column>
                        <Column size={[12, 12, 4, 4]} className="list-default-header">{"Fecha Fin"}</Column>
                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Ejecución"}</Column>
                    </Row>
                </div>}
                readonly={false}
                formatter={(index: number, item: any) => {
                    let ejecucion: boolean = item.Ejecutado == null ? false : true;
                    return <Row>
                        <Column>
                            <Row>
                                <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ alignItems:"center" }}>
                                    <span style={{ alignItems: "center" }} className={"badge badge-info"}>{item.N}</span>
                                </Column>

                                <Column size={[12, 12, 4, 4]} className="listItem-default-item">
                                    <span>{EK.UX.Labels.formatDate(item.FechaInicio)}</span>
                                </Column>
                                <Column size={[12, 12, 4, 4]} className="listItem-default-item">
                                    <span>{EK.UX.Labels.formatDate(item.FechaFin)}</span>
                                </Column>
                                <Column size={[12, 12, 2, 2]} className="listItem-default-item">
                                    <span style={{ fontWeight: 400 }}>{EK.UX.Labels.ok(ejecucion)}</span>
                                </Column>
                               
                            </Row>
                        </Column>
                    </Row>;
                }}>
            </page.SectionList>
        };
    })


    interface IPlazaDesarrollo extends IDropDrownListProps {
        plaza?: number;
        entidad?: any;
    }

    export let PlazaDesarrollosDDL: any = global.connect(class extends React.Component<IPlazaDesarrollo, {}> {
        static props: any = (state: any) => ({
            items: state.global.PlazasDesarrollos,
            plaza: Forms.getValue("Plaza", config.id),
            entidad:state.global.currentEntity,
        });
        static defaultProps: IPlazaDesarrollo = {
            id: "Desarrollo",
            items: createDefaultStoreObject([]),
            label: "Desarrollo",
            helpLabel: "Seleccione un desarrollo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            cargarDatos: false,
            addNewItem: undefined,
        };
        cargarDatos(idPlaza: number)
        {
            if (idPlaza != undefined && idPlaza>0)
            {
                let url: string = global.encodeAllURL("scv", "Desarrollos", { idPlaza, activos:1 });
                dispatchAsync("load::PlazasDesarrollos", url);
                let entidad: any = getData(this.props.entidad);
                if (isSuccessful(this.props.entidad) && !(entidad.IdDesarrollo>1))
                {
                    Forms.updateFormElement(config.id, "Desarrollo", { ID: -1, Clave: "Todos" });
                }
            }
        }
        componentWillReceiveProps(nextProps: IPlazaDesarrollo, nextState: IPlazaDesarrollo): any {
            if (global.hasChanged(this.props.plaza, nextProps.plaza))
            {
                let plaza: any = nextProps.plaza;
                let idPlaza: number = plaza && plaza.ID ? plaza.ID : 0;
                this.cargarDatos(idPlaza);
                
            };
        };

        componentDidMount(): void {
            let plaza: any = Forms.getValue("Plaza", config.id);
            let idPlaza: number = plaza && plaza.ID ? plaza.ID : 0;
            this.cargarDatos(idPlaza);
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }

    });

}
//SCVClientes
namespace EK.Modules.Kontrol.Pages.PersonalizarCampos {
    "use strict";

    const FILTROS_ID: string = "Filtros";
    const CAMPOS_ID: string = "Campos";
    const CAMPOS_SEL_ID: string = "CamposSel";
    const CAMPOS_LOADING_ID: string = "CamposLoading";
    const config: page.IPageConfig = global.createPageConfig("reportes", "kontrol", [CAMPOS_ID, FILTROS_ID, CAMPOS_LOADING_ID, CAMPOS_SEL_ID]);
    //const config: page.IPageConfig = global.createPageConfig("FieldsAvailable", "kontrol", [CAMPOS_ID, CAMPOS_LOADING_ID, CAMPOS_SEL_ID]);



    //interface IFieldsAvailableProps extends React.Props<any> {
    //    //obtenerCatalogo?: () => void;
    //    //ComisionesPeriodos?: any;
    //    //isNew?: boolean;
    //    //modoVista?: boolean;
    //}

    //interface IFieldsAvailableState {
    //    //viewMode?: boolean;
    //    camposClassState: string;
    //}
    interface IFieldsAvailableState {
        camposClassState: string;
    };
    interface IFieldsAvailableProps extends page.IProps {
        operadores?: DataElement;
        operadoresLogicos?: DataElement;
        tiposDatos?: DataElement;
        alineacion?: DataElement;
        ModuloEnUso: any; 
    };

    export let cFieldsAvailable: any = global.connect(class extends React.Component<IFieldsAvailableProps, IFieldsAvailableState> {
        constructor(props: IFieldsAvailableProps) {
            super(props);
           // this.state = { viewMode: true };
            this.state = { camposClassState: "reporter-fields-container-compressed" };
        }

        static Props: any = (state: any) => ({
            operadores: state.global.TIPOOPERADOR,
            operadoresLogicos: state.global.TIPOOPERADORLOGICO,
            tiposDatos: state.global.TIPOSDATO,
            alineacion: state.global.ALINEACION
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });
        componentWillMount(): any {
            //if (!isLoadingOrSuccessful(this.props.operadoresLogicos)) {
            //    dispatchAsync("load::TIPOOPERADORLOGICO", "catalogos/get(TIPOOPERADORLOGICO)");
            //};
            //if (!isLoadingOrSuccessful(this.props.operadores)) {
            //    dispatchAsync("load::TIPOOPERADOR", "catalogos/get(TIPOOPERADOR)");
            //};
            //if (!isLoadingOrSuccessful(this.props.tiposDatos)) {
            //    dispatchAsync("load::TIPOSDATO", "catalogos/get(TIPODATO)");
            //};
            //if (!isLoadingOrSuccessful(this.props.alineacion)) {
            //    dispatchAsync("load::ALINEACION", "catalogos/get(ALINEACION)");
            //};

            //Forms.updateFormElement(config.id, CAMPOS_ID, )
        };

        shouldComponentUpdate(nextProps: IFieldsAvailableProps, nextState: IFieldsAvailableState): boolean {
            return true
            //return (this.state.viewMode !== nextState.viewMode);
        }

        render(): JSX.Element {
            //let $page: any = $ml[PAGE_ID];
            //let modoVista: boolean = this.props.modoVista;
            //let editView: boolean = this.state.viewMode ? false : true;
            //let items: any = this.props.ComisionesPeriodos;
            return <div>
                    <div className={"reporter-fields-container " + this.state.camposClassState}>
                        <Button icon="fa fa-expand" color={"white"} className={"btn btn-default-ek  btn-sm white reporter-btn-expand"}
                            onClick={() => { this.setState({ camposClassState: "reporter-fields-container-expanded" }); }} />
                        <Button icon="fa fa-compress" color={"white"} className={"btn btn-default-ek  btn-sm white reporter-btn-compress"}
                            onClick={() => { this.setState({ camposClassState: "reporter-fields-container-compressed" }); }} />
                        <div className="reporter-selector"><ddl.TiposCamposDDL /></div>
                        <Column className="reporter-fields"><ReporteTreeView ModuloEnUso={this.props.ModuloEnUso} /></Column>
                    </div>
                </div>
        }
    });

    export interface IReporteTreeView extends React.Props<any> {
        entidad?: any;
        campos?: DataElement;
        camposLoading?: DataElement;
        ModuloEnUso: any; 
    };

    const ReporteTreeView: any = global.connect(class extends React.Component<IReporteTreeView, IReporteTreeView> {
        constructor(props: IReporteTreeView) {
            super(props);
            this.onNodeClick = this.onNodeClick.bind(this);
            this.appendData = this.appendData.bind(this);
        };
        //
        static props: any = (state: any) => ({
            entidad: Forms.getValue("Entidad", config.id, state),
            campos: state.global.catalogo$CamposSel,
            camposLoading: state.global.catalogo$CamposLoading
        });
        //
        shouldComponenteUpdate(nextProps: IReporteTreeView): any {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.campos, nextProps.campos);
        };
        //
        componentWillReceiveProps(nextProps: IReporteTreeView): any {
            if (global.hasChanged(nextProps.entidad, this.props.entidad)) {
                if (nextProps.entidad.Clave) {
                    config.dispatchCatalogoBase("base/Kontrol/Entidades/Get/GetEntidadCampos/", { Clave: nextProps.entidad.Clave }, CAMPOS_LOADING_ID);
                };
            };
            if (global.hasChanged(this.props.camposLoading, nextProps.camposLoading)) {
                if (global.isSuccessful(nextProps.camposLoading)) {
                    let campos: any[] = global.getData(this.props.campos);
                    let camposLoading: any[] = global.getData(nextProps.camposLoading);
                    let nombre: string = Forms.getValue("Entidad", CAMPOS_LOADING_ID);

                    camposLoading = camposLoading.map((value: any, index: number) => {
                        return global.assign(value);
                    });
                    //
                    if (!nombre) {
                        //
                        campos = this.appendData("", camposLoading, null, "");
                        //
                        global.dispatchSuccessful("global-page-data", campos, CAMPOS_SEL_ID);
                        //
                    }
                    else {
                        //
                        Forms.updateFormElement(CAMPOS_LOADING_ID, nombre, camposLoading);
                        //
                        campos = this.appendData(nombre, campos, camposLoading, "");
                        //
                        global.dispatchSuccessful("global-page-data", campos, CAMPOS_SEL_ID);
                        //
                        Forms.updateFormElement(CAMPOS_LOADING_ID, "Entidad", undefined);
                        //
                    }
                };
            };
        };
        componentDidMount(): any {
            if (this.props.entidad && this.props.entidad.ID) {
                config.dispatchCatalogoBase("base/Kontrol/Entidades/Get/GetEntidadCampos/", { Clave: this.props.entidad.Clave }, CAMPOS_LOADING_ID);
            };
        };
        appendData(dt: string, campos: any[], data: any[], path: string): any {
            let retValue: any[] = [];
            for (var i = 0; i < campos.length; i++) {
                let c: any = global.assign(campos[i]);
                let nodePath: string = path + (path ? "." : "") + c.Nombre;

                if (data) {
                    if (c.SourceDataType.indexOf("$") === 0) {
                        if (c.loaded === true) {
                            c.children = this.appendData(dt, c.children, data, nodePath);
                        }
                        else if (c.SourceDataType === dt) {
                            c.children = this.appendData(dt, data, null, nodePath);
                            c.loaded = true;
                        };
                    };
                };

                if (!c.path) {
                    c.path = nodePath;
                };
                retValue.push(c);
            };

            return retValue;
        };
        onNodeClick(node: any, e: any): any {
            if (node && node.SourceDataType && node.loaded !== true) {
                let dt: string = node.SourceDataType;

                if (dt.substr(0, 1) === "$") {
                    let nombre: string = dt.toLowerCase();
                    let form: any = Forms.getValue(nombre, CAMPOS_LOADING_ID);

                    if (form) {
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        let campos: any[] = global.getData(this.props.campos);
                        let camposLoading: any[] = form;

                        camposLoading = camposLoading.map((value: any, index: number) => {
                            return global.assign(value);
                        });
                        //
                        campos = this.appendData(nombre, campos, camposLoading, "");
                        //
                        global.dispatchSuccessful("global-page-data", campos, CAMPOS_SEL_ID);
                        //
                    }
                    else {
                        Forms.updateFormElement(CAMPOS_LOADING_ID, "Entidad", dt.toLowerCase());
                        config.dispatchCatalogoBase("base/Kontrol/Entidades/Get/GetEntidadCampos/", { Clave: dt.substring(1) }, CAMPOS_LOADING_ID);
                    };
                };
            };
        };
        render(): JSX.Element {
            let a: any = this.props.ModuloEnUso; 
            return <TreeView id="Campos" data={this.props.campos} onItemSelected={this.onNodeClick}></TreeView>;
        };
    });

    //export const FieldsAvailable: any = ReactRedux.connect(cFieldsAvailable.Props, cFieldsAvailable.dispatchs)(cFieldsAvailable);

};

import FieldsAvailable = EK.Modules.Kontrol.Pages.PersonalizarCampos.cFieldsAvailable;
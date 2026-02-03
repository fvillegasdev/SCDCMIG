    namespace EK.Modules.SCV.Pages.Ubicaciones.Reportes {
        "use strict";
        const config: page.IPageConfig = global.createPageConfig("consultaUbicaciones", "scv");


        interface IConsultaUbicaciones extends page.IProps {
        };

        export let Vista: any = global.connect(class extends React.Component<IConsultaUbicaciones, IConsultaUbicaciones>
        {
            constructor(props: IConsultaUbicaciones)
            {
                super(props);
                this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            }

            onFilter(props: page.IProps, filters: any): any {
                let filtros: any = global.isEmpty(filters) ? {idDesarrollo : null} : global.getFilters(filters);
                props.config.dispatchCatalogoBasePost("base/scv/ubicaciones/GetBP/GetConsultaUbicaciones", { parametros: filtros });
            };

            onExport(element: any): any {

                let idForm: string = [config.id, "filters"].join("$");

                let model: any = Forms.getForm(idForm);

                let item: any = {};
                item['IdDesarrollo'] = model.Desarrollo ? model.Desarrollo.ID : null;
                item['IdPrototipo'] = model.Prototipo ? model.Prototipo.ID : null;
                item['dtu'] = model.dtu ? model.dtu.ID : null;
                item['IdTipoUbicacion'] = model.TipoUbicacion ? model.TipoUbicacion.ID : null;
                item['IdCentroCostoIngresos'] = model.CentroCostoIngresos ? model.CentroCostoIngresos.ID : null;
                item['IdCentroCostoCosntruccion'] = model.CentroCostoCosntruccion ? model.CentroCostoCosntruccion.ID : null; 
                item['IdSegmento'] = model.Segmento ? model.Segmento.ID : null;
                item['IdEstatusUbicacion'] = model.EstatusUbicacion ? model.EstatusUbicacion.ID : null;
                item['disponible'] = model.Disponible;

                let formName: string = "ConsultaUbicaciones";
                let form = document.createElement("form");
                form.setAttribute("method", "post");
                form.setAttribute("action", "base/scv/ubicaciones/exportarReporte");
                form.setAttribute("target", formName);
                //
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = "data";
                input.value = (global.encodeObject(item));
                form.appendChild(input);
                //
                document.body.appendChild(form);
                //
                window.open("about:blank", formName);
                //
                form.submit();
                //
                document.body.removeChild(form);
            };
            onRowDoubleClick(item: any): any
            {
                go("scv/ubicaciones/" + item.ID);
            };
            render(): JSX.Element
            {
                let ml: any = config.getML();

                let formatAgente: (data: any, row: any) => string = (data: any, row: any) =>
                {
                    if (row.Agente)
                    {
                        let nombre: string = row.Agente.Nombre != null ? row.Agente.Nombre : "";
                        let apellidos: string = row.Agente.Apellidos != null ? row.Agente.Apellidos : "";

                        return nombre + " " + apellidos;
                    }
                    return "";
                };
                let formatEstatus: (data: any, row: any) => any = (data: any, row: any) => {
                    let retValue: any;
                    if (row.Estatus && row.Estatus.Nombre) {
                        if (row.Estatus.Naturaleza && row.Estatus.Naturaleza.Clave) {
                            if (row.Estatus.Naturaleza.Clave === 'NDIS') {
                                retValue = <div><span className="btn btn-circle badge badge-danger" style={{ padding: "1px 6px 15px", height: "16px", width: "30px", fontSize: "11px !important", marginRight:"2px" }}>ND </span>{row.Estatus.Nombre}</div>
                            } else if (row.Estatus.Naturaleza.Clave === 'DIS') {
                                retValue = <div><span className="btn btn-circle green-meadow" style={{ padding: "0px 0px 18px", height: "16px", width: "30px", fontSize: "11px !important", marginRight:"2px" }}>D</span>  {row.Estatus.Nombre}</div>
                            }
                        }
                    };
                    return <div style={{ textAlign: "left" }}> {retValue}</div>;
                };
                let formatDTU: (data: any, row: any) => any = (data: any, row: any) => {
                    let retValue: any;
                    if (row.ID > 0)
                    {
                        if (row.IdDtu && row.IdDtu == true) {
                            retValue = <div><span style={{ fontSize: "11px" }} className="fal fa-check"></span></div>
                        }
                        else {
                            retValue = <div><span style={{ fontSize: "11px" }} className="fal fa-times"></span></div>
                        }
                        return <div style={{ textAlign: "center" }}> {retValue}</div>;
                    }
                    return null;
                };
                let formatExp: (data: any, row: any) => any = (data: any, row: any) => {
                    let retValue: any;

                    if (row.NumeroExp > 0)
                    {
                        let retValueEstatus: any;
                        let color: string = "";
                        let mensajeIcono: string = "";
                        switch (row.EstatusSeguimiento.Clave)
                        {
                            case "S":
                                color = "#337ab6";
                                mensajeIcono = "Exp. Suspendido";
                                break;
                            case "A":
                                color = "#8bc780";
                                mensajeIcono = "Exp. Activo";
                                break;
                            case "C":
                                color = "#df0707";
                                mensajeIcono = "Exp. Cancelado";
                                break;
                        }
                 

                        let link: string = global.getFullUrl("#/scv/expedientes/" + row.NumeroExp);
                        return <div className="label-link-grid label-value">
                            <a target="_blank" rel="noopener noreferrer" href={link} className="link2">
                                <i className="fas fa-external-link-square-alt"></i>
                            </a>
                            <a className="link-text" target="_blank" rel="noopener noreferrer" href={link} style={{ fontSize: 10 }}>
                                <span className={"badge"}>{row.NumeroExp}</span>
                            </a>

                            <div className="btn btn-circle btn-xs" title={mensajeIcono}>
                                <span style={{ color: color, fontSize: "12px" }} className="fad fa-circle"></span>
                            </div> 
                        </div>
                    }
                    return null;
                };
                let formaCliente: (data: any, row: any) => any = (data: any, row: any) => {
                    let retValue: any;
                    if (row.ID > 0 && row.Cliente.ID>0) {
                        let link: string = global.getFullUrl("#/scv/clientes/" + row.Cliente.ID);
                        return  <div className="label-link-grid label-value">
                            <a target="_blank" rel="noopener noreferrer" href={link} className="link2">
                                <i className="fas fa-external-link-square-alt"></i>
                            </a>
                            <a className="link-text" target="_blank" rel="noopener noreferrer" href={link} style={{ fontSize: 10 }}>
                                <span className={"badge"}>{row.Cliente.ID}</span>
                                <span className="link-text-name">   {[row.Cliente.Nombre, row.Cliente.ApellidoPaterno, row.Cliente.ApellidoMaterno].join(" ")}</span>
                            </a>

                            </div>
                    }
                    return null;
                };




                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "Desarrollo.Nombre", width: "100px" })
                    .add({ data: "TipoUbicacion.Nombre", width: "110px" })
                    .add({ data: "ClaveFormato", width: "110px" })
                    .add({ data: "Nombre", width: "130px" })
                    .add({ data: "Prototipo.Nombre", width: "100px" })
                    .add({ data: "Estatus.Nombre", width: "150px", format: formatEstatus })
                    .add({ data: "IdDtu", width: "100px", format: formatDTU })
                    .add({ data: "Superficie", width: "100px" })
                    .add({ data: "Excedente", width: "100px" })
                    .add({ data: "PorcentajeConstruccion", width: "130px" })

                    .add({ data: "Cliente.Nombre", width: "210px", format: formaCliente })
                    .add({ data: "NumeroExp", width: "100px", format: formatExp })

                    .add({ data: "Agente.Nombre", width: "150px", format: formatAgente })
                    .add({ data: "Fase.Nombre", width: "100px" })
                    .add({ data: "Esquema.Nombre", width: "120px" })
                    .add({ data: "Etapa.Nombre", width: "120px" })
                    .toArray();
                dtConfig.groups
                        .add({ data: "Desarrollo.Nombre" })
                        .toArray();

                return <page.Main {...config}
                    pageMode={PageMode.Principal}
                    onFilter={this.onFilter}
                    onExport={this.onExport}
                >
                    <page.Filters>
                        <ddl.DesarrollosDDL size={[6, 6, 4, 4]} id={"Desarrollo"} addNewItem={"VT"} />
                        <PrototiposDDL id={"Prototipo"} size={[6, 6, 3, 3]}  addNewItem={"VT"} />
                        <ddl.TipoUbicacionDDL id={"TipoUbicacion"} size={[6, 6, 3, 3]} addNewItem={"VT"} />

                        <checkBox.CheckBox size={[2, 2, 1, 1]} label="Disponible" id={"Disponible"} />
                        <checkBox.CheckBox size={[2, 2, 1, 1]} id={"dtu"} label="DTU" />

                        <CCCONSTRUCCIONDDL id={"CentroCostoConstruccion"} size={[12, 6, 4, 4]} addNewItem={"VT"} />
                        <CCINGRESODDL  size={[12, 6, 3, 3]} addNewItem={"VT"} />
                        <ddl.SegmentosDDL id={"Segmento"} size={[12, 6, 3, 3]} addNewItem={"VT"} />
                    </page.Filters>

                    <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />

                </page.Main>;
            };
        });

        interface IUbicacionesProps extends IDropDrownListProps {
            desarrollo?: any;
            cargaDatos?: (idDesarrollo?: any) => void;
        }

        export let CCINGRESODDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
            static props: any = (state: any) => ({
                items: state.global.Desarrollo_CCINGRESO,
                desarrollo: Forms.getValue("Desarrollo", config.id+"$filters"),
            });
            static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
                cargaDatos: (idDesarrollo?: any): void => {
                    if (idDesarrollo > 0)
                    {
                        dispatchAsync("load::Desarrollo_CCINGRESO", global.encodeAllURL("scv", "CENTROCOSTO", { idDesarrollo: idDesarrollo, ClaveTipoCentrosCosto: 'CCINGRESO' }));
                    }
                    else
                    {
                        global.dispatchSuccessful("load::Desarrollo_CCINGRESO", []);
                    }
                }
            });
            static defaultProps: IUbicacionesProps = {
                id: "CentroCostoIngresos",
                items: createDefaultStoreObject([]),
                label: "Centro de Costo de Ingresos",
                helpLabel: "Seleccione el Centro de Costo de Ingresos",
                value: createDefaultStoreObject({}),
                initialValue: undefined,
                hasChanged: false,
                hasValidationError: false,
                required: false,
                itemKey: "ID",
                itemValue: "Nombre",
                size: [12, 4, 4, 4]
            };
            componentDidMount(): void {
                if (!isLoadingOrSuccessful(this.props.items))
                {
                    if (this.props.desarrollo)
                    {
                        this.props.cargaDatos(this.props.desarrollo.ID);
                    }
                }
            };
            componentWillReceiveProps(nextProps: IUbicacionesProps, nextState: IUbicacionesProps): any {
                if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo))
                {
                    if (nextProps.desarrollo && nextProps.desarrollo.ID > 0)
                    {
                        Forms.updateFormElement(config.id + "$filters", "CentroCostoIngresos", { ID: -1, Clave:"Ver Todos"});
                        this.props.cargaDatos(nextProps.desarrollo.ID);
                    }
                };

            };
            render(): any {
                return <EK.UX.DropDownLists.DropdownList$Form {...this.props}/>;
            }
        });

        export let CCCONSTRUCCIONDDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
            static props: any = (state: any) => ({
                items: state.global.Desarrollo_CCCONSTRUCCION,
                desarrollo: Forms.getValue("Desarrollo", config.id + "$filters"),
            });
            static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
                cargaDatos: (idDesarrollo?: any): void =>
                {
                    if (idDesarrollo > 0)
                    {
                        dispatchAsync("load::Desarrollo_CCCONSTRUCCION", global.encodeAllURL("scv", "CENTROCOSTO", { idDesarrollo: idDesarrollo, ClaveTipoCentrosCosto: 'CCCONSTRUCCION' }));
                    }
                    else {
                        global.dispatchSuccessful("load::Desarrollo_CCCONSTRUCCION", []);
                    }

                }
            });
            static defaultProps: IUbicacionesProps = {
                id: "CentroCostoConstruccion",
                items: createDefaultStoreObject([]),
                label: "Centro de Costo de Construcción",
                helpLabel: "Seleccione el Centro de Costo de Construcción",
                value: createDefaultStoreObject({}),
                initialValue: undefined,
                hasChanged: false,
                hasValidationError: false,
                required: false,
                itemKey: "ID",
                itemValue: "Nombre",
                size: [12, 4, 4, 4]
            };
            componentDidMount(): void {
                if (!isLoadingOrSuccessful(this.props.items)) {
                    if (this.props.desarrollo) {
                        this.props.cargaDatos(this.props.desarrollo.ID);
                    }
                }
            };
            componentWillReceiveProps(nextProps: IUbicacionesProps, nextState: IUbicacionesProps): any {
                if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo))
                {
                    if (nextProps.desarrollo && nextProps.desarrollo.ID > 0)
                    {
                        Forms.updateFormElement(config.id + "$filters", "CentroCostoConstruccion", { ID: -1, Clave: "Ver Todos" });
                        this.props.cargaDatos(nextProps.desarrollo.ID);
                    }
                };

            };
            render(): any {
                return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
            }
        });

        export let PrototiposDDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
            static props: any = (state: any) => ({
                items: state.global.Desarrollo_Prototipo,
                desarrollo: Forms.getValue("Desarrollo", config.id + "$filters"),
            });
            static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
                cargaDatos: (idDesarrollo?: any): void =>
                {
                    if (idDesarrollo > 0) {
                        dispatchAsync("load::Desarrollo_Prototipo", global.encodeAllURL("scv", "Prototipos", { idDesarrollo: idDesarrollo}));
                    }
                    else {
                        global.dispatchSuccessful("load::Desarrollo_Prototipo", []);
                    }
                }
            });
            static defaultProps: IUbicacionesProps = {
                id: "Prototipo",
                items: createDefaultStoreObject([]),
                label: "Prototipo",
                helpLabel: "Seleccione un prototipo",
                value: createDefaultStoreObject({}),
                initialValue: undefined,
                hasChanged: false,
                hasValidationError: false,
                required: false,
                itemKey: "ID",
                itemValue: "Nombre",
                size: [12, 4, 4, 4]
            };
            componentDidMount(): void {
                if (!isLoadingOrSuccessful(this.props.items)) {
                    if (this.props.desarrollo) {
                        this.props.cargaDatos(this.props.desarrollo.ID);
                    }
                }
            };
            componentWillReceiveProps(nextProps: IUbicacionesProps, nextState: IUbicacionesProps): any {
                if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo))
                {
                    if (nextProps.desarrollo && nextProps.desarrollo.ID > 0)
                    {
                        Forms.updateFormElement(config.id + "$filters", "Prototipo", { ID: -1, Clave: "Ver Todos" });
                        this.props.cargaDatos(nextProps.desarrollo.ID);
                    }
                };

            };
            render(): any {
                return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
            }
        });

    };

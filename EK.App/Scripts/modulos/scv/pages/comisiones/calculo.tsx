namespace EK.Modules.SCV.Pages.Comisiones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("comisionesCalculo", "scv");

    export class Vista extends page.Base {
        onFilter(): any {
        };
        consultar(operacion: string): any {
            let accion: string = operacion == "CALCULAR" ? "CalculoComisiones" : "ConsultarComisiones";


            let proceso = Forms.getValue("Proceso", config.id);

            if (proceso && proceso.ID > 0) {

                if (proceso.Clave == "SE")
                {
                    this.calculoSeguimiento(accion);
                }
                else if (proceso.Clave == "TA")
                {
                    this.calculoTabuladores(accion);
                }
            }
            else {
                warning("Datos Incompletos")
            }
           

        };

        calculoTabuladores(accion: string): any {

            let fechaInicio = Forms.getValue("FechaInicio", config.id);
            let fechaFin = Forms.getValue("FechaFin", config.id);
            let fase = Forms.getValue("Fase", config.id);

            let encodedFilters: string = global.encodeObject({ fechaInicio, fechaFin, idFase:fase.ID, });

            this.enviarPeticion("comisionesTabuladores", accion, encodedFilters)
        };
        calculoSeguimiento(accion: string): any {

            let periodoDetalle = Forms.getValue("PeriodoDetalle", config.id);

            if (periodoDetalle && periodoDetalle.ID > 0) {
                let encodedFilters: string = global.encodeObject({ idPeriodoDetalle: periodoDetalle.ID, consultaEspecial:1 });
                this.enviarPeticion("comisionesSeguimiento", accion, encodedFilters)
            }
            else {
                warning("Datos Incompletos")
            }

        };

        enviarPeticion(bp: string, accion: string, encodedFilters: any): any {
            dispatchAsync("load::currentCatalogo", "base/scv/" + bp + "/Get/" + accion + "/" + encodedFilters);
        };
        render(): JSX.Element {
            let formatNombre: (data: any, row: any) => string = (data: any, row: any) => {
                return row.Usuario.Nombre + " " + row.Usuario.Apellidos;
            };
            let formatFormaPago: (data: any, row: any) => string = (data: any, row: any) => {
                return row.Monto > 0 ? row.Monto : row.Porcentaje + "%";
            };

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowNew={false}>

                <page.OptionSection
                    id="Filtros"
                    icon="fas fa-calendar"
                    level={1}
                    subTitle={"Seleccione el periodo"}
                    collapsed={false}
                    hideCollapseButton={false}>
                    <SectionButtons>
                        <Button className="btn-ico-ek white" iconOnly={true} color="white" onClick={(e) => this.consultar("CONSULTAR")} icon="fas fa-sync-alt" />
                    </SectionButtons>

                    <TipoProcesoDDL id={"Proceso"} addNewItem={"SO"} size={[12, 2, 2, 2]} />
                    <ddl.FasesExpedienteDDL id={"Fase"} addNewItem={"SO"} size={[12, 2, 2, 2]} />
                    <SeleccionFecha/>

                    <Column size={[12, 2, 2, 2]}>
                        <div style={{ marginTop: "8%" }}>
                            <button className="btn btn-success radius5px" onClick={(e) => this.consultar("CALCULAR")}><i className="fas fa-calculator"></i> Calcular</button>
                        </div>
                    </Column>

                    <Column size={[12, 12, 12, 12]} style={{ marginTop: "3%" }}>
                        <ResultadoCalculo />
                    </Column>

                </page.OptionSection>
            </page.Main>;
        };
    };


    export let TipoProcesoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOPROCESOSCOMISIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Proceso",
            items: createDefaultStoreObject([]),
            label: "Tipo Proceso",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TIPOPROCESOSCOMISIONES", "catalogos/get(TIPOPROCESOSCOMISIONES)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });





    interface IPeriodoDetalle extends IDropDrownListProps {
        periodo?: any;
        fase?: any;
    }
    export let PERIODODETALLE: any = global.connect(class extends React.Component<IPeriodoDetalle, {}> {
        constructor(props: IPeriodoDetalle) {
            super(props);
            this.cargarElementos = this.cargarElementos.bind(this);
        }
        static props: any = (state: any) => ({
            items: state.global.PERIODODETALLE,
            periodo: Forms.getValue("Periodo", config.id,state),
            fase: Forms.getValue("Fase", config.id,state),
        });
        static defaultProps: IPeriodoDetalle = {
            id: "PeriodoDetalle",
            items: createDefaultStoreObject([]),
            label: "Fecha",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (item && item.ID > 0) {
                    return $([
                        "<span style='margin-right:3px'>",
                        EK.UX.Labels.formatDate(item.FechaInicio),
                        "</span> ",
                        "<span> a </span>",
                        "<span>",
                        EK.UX.Labels.formatDate(item.FechaFin),
                        "</span>"].join(""));
                }
                else if (item && item.ID == -1) {
                    return $([
                        "<span>",
                        item.Clave,
                        "</span>"].join(""));
                }
                else {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));

                }
              
            },
            selectionFormatter: (item): any => {
                if (item && item.ID > 0) {
                    return $([
                        "<span style='margin-right:3px'>",
                        EK.UX.Labels.formatDate(item.FechaInicio),
                        "</span> ",
                        "<span> a </span>",
                        "<span>",
                        EK.UX.Labels.formatDate(item.FechaFin),
                        "</span>"].join(""));
                }
                else if (item && item.ID == -1) {
                    return $([
                        "<span>",
                        item.Clave,
                        "</span>"].join(""));
                }
                else {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));

                }
            }
        };
        cargarElementos(idPeriodo: number, idFase: number): void {
            if (idPeriodo > 0 && idFase > 0)
            {
                Forms.updateFormElement(config.id, "PeriodoDetalle", { ID: -1, Clave: "Seleccione una opción" });
                let encodedFilters: string = global.encodeObject({ IdComisionPeriodo: idPeriodo, idFase: idFase, activos:1 });
                dispatchAsync("load::PERIODODETALLE", "base/scv/comisionesConfiguracion/Get/GetAllPeriodoDetalle/" + encodedFilters);
            }
        }
        componentDidMount(): void {
            global.dispatchSuccessful("load::PERIODODETALLE", []);
        };
        componentWillReceiveProps(nextProps: IPeriodoDetalle, nextState: IPeriodoDetalle): any {
            let periodo: any = nextProps.periodo;
            let fase: any = nextProps.fase;

            if (global.hasChanged(this.props.periodo, nextProps.periodo)) {
                let idFase: any = this.props.fase && this.props.fase.ID ? this.props.fase.ID : 0;
                this.cargarElementos(periodo.ID, idFase);
            };

            if (global.hasChanged(this.props.fase, nextProps.fase) && fase && fase.ID > 0) {
                let idPeriodo: any = this.props.periodo && this.props.periodo.ID ? this.props.periodo.ID : 0;
                this.cargarElementos(idPeriodo, fase.ID);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });



    interface IResultadoCalculo extends page.Base {
        tipoProceso?: any;
        items?: any
    };

    let ResultadoCalculo: any = global.connect(class extends React.Component<IResultadoCalculo, IResultadoCalculo> {
        constructor(props: IResultadoCalculo) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tipoProceso = Forms.getValue("Proceso", config.id, state);
            retValue.items = state.global.currentCatalogo;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IResultadoCalculo, nextState: IResultadoCalculo): any {
            return hasChanged(this.props.items, nextProps.items) ||
                   hasChanged(this.props.tipoProceso, nextProps.tipoProceso)
        };
        render(): JSX.Element {
            let proceso = Forms.getValue("Proceso", config.id);
            let ml: any = config.getML();

            let retValue: any;


            let formatPeriodo: (data: any, row: any) => string = (data: any, row: any) => {
                let retValue: string;
                if (row && row.ProcesoPeriodo)
                {
                    return  row.ProcesoPeriodo.Periodicidad + " "+ row.ProcesoPeriodo.N;
                }
            };

            let formatNombre: (data: any, row: any) => string = (data: any, row: any) => {
                let retValue: string;
                if (row && row.ProcesoPeriodo) {
                    let nombreTabulador: string = row.ProcesoPeriodo.Periodicidad + " " + row.ProcesoPeriodo.Tabulador;
                    let complemento: string = row.ProcesoPeriodo.Complementario ? "<i class='fab  fa-hubspot'></i>" : "";
                    return complemento + nombreTabulador;
                }

            };

            let formatCantidad: (data: any, row: any) => string = (data: any, row: any) => {
                let retValue: string;
                if (row && row.Cantidad > 0) {
                    if (row.CantidadBase != row.Cantidad)
                        return row.Cantidad + "/" + row.CantidadBase;

                    return row.Cantidad;
                }
            };

            let formatRango: (data: any, row: any) => string = (data: any, row: any) => {
                let retValue: string;
                if (row && row.Minimo && row.Maximo) {
                    return row.Minimo + "-" + row.Maximo;
                }
            };


            let formatIdExpediente: (data: any, row: any) => string = (data: any, row: any) => {
                let retValue: string;
                if (row && row.TipoComision && row.TipoComision.ID > 0) {

                    let url: string = "#/scv/expedientes/" + row.IdExpediente;
                    let clave: string = row.TipoComision.Clave == "TABCOM" ? "C" : "SE";
                    let result: any = null;

                    result = <div className="label-link-grid label-value">
                        <a target="_blank" rel="noopener noreferrer" href={url} className="link2">
                            <i className="fas fa-external-link-square-alt"></i>
                        </a>
                        <a className="link-text" target="_blank" rel="noopener noreferrer" href={url} style={{ fontSize: "10px" }}>
                            <span className="badge">{clave}</span>
                            <span className="link-text-name">{row.IdExpediente}</span>
                        </a>
                    </div>
                   

                    return result;
                }
            };

            if (proceso && proceso.Clave == "SE") {
                let ml: any = config.getML();
                let dtConfig: dt.IDTConfig = dt.createConfig(ml);
                dtConfig.columns
                    .add({ data: "IdExpediente", width: "100px", format: formatIdExpediente, align:"center" })
                    .add({ data: "Categoria.Nombre", width: "100px" })
                    .addNombreCompletoUsuarioFormat({ data: "Usuario.Nombre", width: "200px" })

                    .add({ data: "Ubicacion.Clave", width: "150px" })

                    .addMoneyFormat({ data: "ValorComisionableMoneda", width: "150px" })
                    .addMoneyFormat({ data: "ComisionMoneda", width: "150px" })

                    .add({ data: "Moneda.Nombre", width: "115px" })

                    .addMoneyPercentageFormat({ data: "Porcentaje", width: "150px" })

                    .addCenter({ data: "Etapa", width: "100px" })
                    .addPercentageFormat({ data: "PorcentajeEtapa", width: "60px" })
                    .addMoneyFormat({ data: "ComisionMonedaEtapa", width: "100px" })
                    .addDateFormat({ data: "FechaCalculo", width: "100px" })

                    .add({ data: "Estatus", width: "100px", format:label.formatEstatusComisiones })
                    .toArray();
                dtConfig.groups
                    .add({ data: "Categoria.Nombre" })
                    .toArray();
                return <dt.DataTableExtended dtConfig={dtConfig} key={proceso.Clave} />

            }
            else if (proceso && proceso.Clave == "TA")
            {
                let ml: any = config.getML();
                let dtConfigTabulador: dt.IDTConfig = dt.createConfig(ml);

               

                dtConfigTabulador.columns
                    .add({ data: "ProcesoPeriodo.Tabulador", width: "130px", format: formatNombre })
                    .add({ data: "ProcesoPeriodo.Periodicidad", width: "120px", format: formatPeriodo })
                    .add({ data: "Desarrollo.Clave", width: "100px" })
                    .addDateFormat({ data: "ProcesoPeriodo.FechaInicio", width: "120px" })
                    .addDateFormat({ data: "ProcesoPeriodo.FechaFin", width: "120px" })
                    .add({ data: "Categoria.Nombre", width: "100px" })
                    .addNombreCompletoUsuarioFormat({ data: "Usuario.Nombre", width: "200px" })
                    .addMoneyFormat({ data: "ValorComisionableMoneda", width: "150px" })
                    .addMoneyFormat({ data: "ComisionMoneda", width: "150px" })
                    .add({ data: "Moneda.Nombre", width: "115px" })
                    .addMoneyPercentageFormat({ data: "Porcentaje", width: "150px" })
                    .addPercentageFormat({ data: "PorcentajeDesarrollo", width: "100px" })
                    .add({ title: "Rango", data: "Minimo", width: "150px", format: formatRango, align: "center" })
                    .add({ data: "Cantidad", width: "150px", align: "center", format: formatCantidad })
                    .add({ data: "Estatus", width: "100px", format: label.formatEstatusComisiones })
                    .toArray();
                dtConfigTabulador.groups
                    .add({ data: "ProcesoPeriodo.Tabulador" })
                    .add({ data: "ProcesoPeriodo.Periodicidad" })

                    .toArray();

                return <dt.DataTableExtended dtConfig={dtConfigTabulador}  />
            }
            return null;

        };
    });


    interface ITipoProceso extends page.IProps {
        tipoProceso: string;
    };

    export let SeleccionFecha: any = global.connect(class extends React.Component<ITipoProceso, ITipoProceso> {
        constructor(props: ITipoProceso) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tipoProceso = Forms.getValue("Proceso", config.id, state);
            return retValue;
        };
        render(): any {
            let proceso: any = this.props.tipoProceso;
            let claveProceso: string = proceso && proceso.Clave ? proceso.Clave : "";

            if (claveProceso == "TA") {
                return <div>
                    <input.Date id={"FechaInicio"} label={"Fecha Inicio"} type="date" size={[12, 2, 2, 2]} />

                    <input.Date id={"FechaFin"} label={"Fecha Fin"} type="date" size={[12, 2, 2, 2]}
                        validations={[
                            validations.greaterEqualThan("FechaInicio", "Fecha Inicio, la fecha de fin debe ser menor a la fecha de inicio")]} />
                </div>
            }
            else if (claveProceso=="SE")
            {
                return <div>
                             <AniosDDL id={"Periodo"} addNewItem={"SO"} size={[12, 2, 2, 2]} />
                             <PERIODODETALLE id={"PeriodoDetalle"} addNewItem={"SO"} size={[12, 4, 4, 4]} />
                    </div>
            }
            return null;
             
        };
    });

};

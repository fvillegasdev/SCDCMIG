namespace EK.Modules.SCV.Pages.Interface {
    "use strict";

    let PAGE_ID = "Interface";
    
    
    const Encabezado_Interface_Clientes: JSX.Element = <div>
        <Row className="list-fixed-header">
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Expediente"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Venta"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Cliente EK9"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Nombre(s)"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Dirección"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus Registro"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Entidad"}</Column>
        </Row>
    </div>;
    const Encabezado_Interface_Finiquitos: JSX.Element = <div>
        <Row className="list-fixed-header">
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Expediente"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Venta"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Cliente EK9"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Instít. Crédito"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Monto Crédito"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Instít. Crédito 2"}</Column>

            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Monto Crédito 2"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus Registro"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Entidad"}</Column>
        </Row>
    </div>;
    const Encabezado_Interface_Poliza: JSX.Element = <div>
        <Row className="list-fixed-header">
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Expediente"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Venta"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Cliente EK9"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Tipo Proceso"}</Column>
            <Column size={[12, 3, 3, 3]} className="list-default-header">{"Segmento"}</Column>

            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Fecha Póliza"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Tipo Cambio"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Inst. Crédito"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-default-header">{"Monto Escrituración"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Estatus"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Estatus Registro"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Entidad"}</Column>
        </Row>
    </div>;
    const Encabezado_Interface_PlanPagos: JSX.Element = <div>
        <Row className="list-fixed-header">
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Expediente"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Venta"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Cliente EK9"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Factura Capital"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Id Núm. Concepto Pago"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Fecha Vencim."}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Valor Capital"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus"}</Column>

            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus Registro"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Entidad"}</Column>
        </Row>
    </div>;
    const Encabezado_Interface_Reestructura: JSX.Element = <div>
        <Row className="list-fixed-header">
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Expediente"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Venta"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Cliente EK9"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Fecha Reestructura"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"TC"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus Registro"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Entidad"}</Column>

        </Row>
    </div>;
    const Encabezado_Interface_SaldoFactura: JSX.Element = <div>
        <Row className="list-fixed-header">
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"#"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-default-header">{"Expediente"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Venta"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Cliente EK9"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Fecha Reestructura"}</Column>
            <Column size={[12, 2, 2, 2]} className="list-center-header">{"Factura"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Saldo Factura"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Importe"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Estatus Registro"}</Column>
            <Column size={[12, 1, 1, 1]} className="list-center-header">{"Entidad"}</Column>
        </Row>
    </div>;

    let idAgente: any = 1;
    const InterefaceSaldoFactura_Detalle: string = "InterefaceSaldoFactura_Detalle";
    const scv_Interface_Actual: string = "InterfaceActual";
    const config: page.IPageConfig = global.createPageConfig("Interface", "scv", [scv_Interface_Actual, InterefaceSaldoFactura_Detalle]);

    let $page: any;
    interface IEditProps extends page.IProps {
        item?: any;
        mode?: any;
        config?: any;
    }

    interface IInterface extends page.IProps {
        entidad?: any;
        interface: any;
        TipoAccion?: boolean;
    }

    export const Vista: any = global.connect(class extends React.Component<IInterface, IInterface>
    {
        constructor(props: IInterface) {
            super(props);
        }
        static props: any = (state: any) => ({
            TipoAccion: Forms.getValue("Accion", config.id, state),
            interface: Forms.getValue("Interface", "Interface$filters"),
        });
        onSave(): void {
            let item: EditForm = Forms.getForm(config.id);
            let doc: any = Forms.getValue("Documento", config.id);
            let importe: any = Forms.getValue("Importe", config.id);
            let factura: any = Forms.getValue("Factura", config.id);
            let model: any = item
                .addID()
                .addObject("Documento")
                .addNumber("Factura")
                .addNumber("Importe")
                .toObject();
            model["Num_documento"] = doc.ID;

            if (doc.CapitalMoneda > importe) {
                warning("El capital del documento debe ser menor/igual que el importe a cubrir");
                return;
            }
            let dataISFD: any = EK.Store.getState().forms.InterefaceSaldoFactura_Detalle.form.InterefaceSaldoFactura_Detalle.value;
            var totalImporte: number = 0;
            if (dataISFD && dataISFD != undefined) {
                for (var i = 0; i < dataISFD.data.length; i++) {
                    totalImporte = totalImporte + dataISFD.data[i].Importe;
                }
            }
            if (totalImporte == importe) {
                warning("El importe del detalle ya cubrió el importe del saldo factura");
                return;
            }
            global.dispatchAsyncPut("global-page-data", "base/scv/Interface/Get/SaveISFDetalle", model, InterefaceSaldoFactura_Detalle);
            global.closeSidebar("saldoFacturaDetalle");
        }
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters);
            let fi: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            if (fi != null) {
                let EstatusInterface = Forms.getValue("EstatusInterface", "Interface$filters");
                let EstatusRegistro = Forms.getValue("EstatusRegistro","Interface$filters");
                let Interface = Forms.getValue("Interface", "Interface$filters");
                let Compania = Forms.getValue("Compania", "Interface$filters");
                fi["IdEstatusInterface"] = EstatusInterface && EstatusInterface.ID > 1 && EstatusInterface.Clave != "NT" ? EstatusInterface.Clave : null;
                fi["IdEstatusRegistro"] = EstatusRegistro && EstatusRegistro.ID > 1 ? EstatusRegistro.Clave : null;
                fi["IdInterface"] = Interface && Interface.ID > 1 ? Interface.Clave : null;
                Compania.Clave == "Ver Todos" ? fi["IdCompania"] = null : fi["IdCompania"] = Compania.Clave;
            }
            props.config.dispatchCatalogoBasePost("base/scv/interface/GetBP/GetAll", { parametros: fi }, scv_Interface_Actual);
        };
        onEntityLoaded(props: page.IProps): void {

            let f: any = new Object();
            f = { IdInterface: "ICLI" };
            global.dispatchAsyncPost("global-page-data", "base/scv/interface/GetBP/GetAll", { parametros: f }, scv_Interface_Actual);
            
        };
        componentWillReceiveProps(nextProps: IInterface): any {
            
            if (global.hasChanged(this.props.TipoAccion, nextProps.TipoAccion)) {
                    let parametros: any = [];
                    let Accion: any = nextProps.TipoAccion;
                    if (global.hasChanged(this.props.interface, nextProps.interface)) {
                        let idInterface = nextProps.interface.Clave;
                        parametros = global.assign({ IdInterface: idInterface });
                    } else {
                        let Interface = Forms.getValue("Interface", "Interface$filters");
                        let claveInterface = Interface && Interface.ID > 0 ? Interface.Clave : "ICLI";
                        parametros = global.assign({ IdInterface: claveInterface});
                    }
                    global.dispatchAsyncPost("global-page-data", "base/scv/interface/GetBP/GetAll", { parametros }, scv_Interface_Actual);
            }
        };
        render(): JSX.Element {
            const val = { style: 'currency', currency: 'USD' };
            const numberFormat = new Intl.NumberFormat('en-US', val);

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowDelete={false}
                allowNew={false}
                onEntityLoaded={this.onEntityLoaded}
                allowView={false}>
                <page.Filters collapsed={false}>
                    <input.Integer id={"Folio"} label="Núm. Expediente" size={[2,2,2,2]}/>
                    <InterfaceDDL id={"Interface"} size={[2, 2, 2, 2]} />
                    <ddl.CompaniaDDL id={"Compania"} size={[4, 4, 4, 4]} addNewItem={"VT"} />
                    <EstatusInterfaceDDL id={"EstatusInterface"} size={[2, 2, 2, 2]} />
                    <EstatusRegistroDDL id={"EstatusRegistro"} size={[2, 2, 2, 2]} />
                </page.Filters>
                <page.OptionSection
                    id={config.id}
                    subTitle={"ACCIÓN"}
                    icon="fas fa-exclamation" collapsed={false} hideCollapseButton={false} level={1}>
                    <Row>
                        <AccionesDDL id={"Accion"} size={[4, 4, 4, 4]} addNewItem={"SO"} />
                        <AplicarTodo size={[6, 4, 2, 2]} />
                    </Row>
                </page.OptionSection>
                <Reporte />
                <Sidebar id="saldoFacturaDetalle">
                    
                    <h3>Ajustar Cambios Saldo Factura</h3>
                      <Column size={[12, 12, 12, 12]}>
                             <label.Label id="Factura" idForm={config.id} label="Factura" size={[12, 6, 6, 6]} />
                      </Column>
                      <Column size={[12, 12, 12, 12]}>
                             <label.Decimal id="Importe" idForm={config.id} label="Importe" size={[12, 6, 6, 6]} />
                      </Column>
                      <Column size={[12, 12, 12, 12]}>
                             <DocumentoDDL id={"Documento"} idForm={config.id} size={[12, 10, 10, 10]} />
                      </Column>
                      <Column size={[12, 12, 12, 12]} style={{ marginTop: 15, marginBottom: 10, marginRight: 8 }}>

                        <button type="button" id={"SF"} className="btn btn-sm blue pull-right" onClick={this.onSave}>Aplicar Cambios</button>

                      </Column>
                        
                        <page.SectionList
                            id={InterefaceSaldoFactura_Detalle}
                            parent={InterefaceSaldoFactura_Detalle}
                            idParent={InterefaceSaldoFactura_Detalle}
                            level={1}
                            title="Saldo Factura Detalle"
                            icon="fas fa-folder"
                            size={[12, 12, 12, 12]}
                            listHeader={
                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"#"}</Column>
                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Factura"}</Column>
                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Importe"}</Column>
                                        <Column size={[12, 4, 4, 4]} className="list-default-header">{"Documento"}</Column>
                                    </Row>
                                </div>}
                            items={createSuccessfulStoreObject([])} readonly={false}
                            addRemoveButton={false}
                            formatter={(index: number, item: any) => {
                                
                                return <Row>
                                    <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                        <span>{item.ID}</span>
                                    </Column>
                                    <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                        <span>{item.Factura}</span>
                                    </Column>
                                    <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                        <span>{numberFormat.format(item.Importe)}</span>
                                    </Column>
                                    <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                        <span>{item.Num_documento}</span>
                                    </Column>
                                </Row>;
                            }}>
                        </page.SectionList>
                </Sidebar>
                <PageButtons>
                    <SaveReassignmentButton />
                </PageButtons>
            </page.Main>;
        };
    });



    interface IAplicarTodo extends page.IProps {
        accion: any;
    };


    let AplicarTodo: any = global.connect(class extends React.Component<IAplicarTodo, IAplicarTodo> {
        constructor(props: IAplicarTodo) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.accion = Forms.getValue("Accion", config.id, state);
            retValue.entidad = state.global.currentEntity;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IAplicarTodo): any {
            if (global.hasChanged(this.props.accion, nextProps.accion)) {
                let parametros: any = [];
                let Accion: any = nextProps.accion;
                Forms.updateFormElement(config.id, "AplicarTodos", false);
            }
        };
        shouldComponentUpdate(nextProps: IAplicarTodo, nextState: IAplicarTodo): any {
            return hasChanged(this.props.accion, nextProps.accion) ||
                hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let entidad = getData(this.props.entidad);
            let tipoAccion: any = this.props.accion;
            let mostrarAT: boolean = tipoAccion && tipoAccion.ID > 1 && tipoAccion.Clave == "ED" ? false : true;
            if (mostrarAT) {
                return <checkBox.CheckBox id="AplicarTodos" size={[6, 4, 2, 2]} />
            }
            return null;
        };
    });


    interface IReporte extends page.IProps {
        InterfaceCliente?: any;
        tipoInterface?: any;
        tipoAccion?: any;
        onclick?: () => void;
    };

    export let Reporte: any = global.connect(class extends React.Component<IReporte, IReporte>
    {
        constructor(props: IReporte) {
            super(props);
            this.onClick = this.onClick.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tipoInterface = Forms.getValue("Interface", "Interface$filters");
            retValue.tipoAccion = Forms.getValue("Accion","Interface");
            return retValue;
        };
        componentWillReceiveProps(nextProps: IReporte, nextState: IReporte): any {
            if (global.hasChanged(this.props.tipoInterface, nextProps.tipoInterface)) {
                let idInterface = nextProps.tipoInterface.Clave;
                let parametros: any = global.assign({ IdInterface: idInterface });
                global.dispatchAsyncPost("global-page-data", "base/scv/interface/GetBP/GetAll", { parametros }, scv_Interface_Actual);

            }
        };
        onClick(item: any, Id: number): void {
            let Interf: any = Forms.getValue("Interface", "Interface$filters");
            if (Interf.Clave == "ISF") {
                let loc = item.Localizado == false ? true : false;
                if (item.ID = Id) {
                    config.setEntity(item, InterefaceSaldoFactura_Detalle);
                    Forms.updateFormElement(config.id, "Factura", item.Factura);
                    Forms.updateFormElement(config.id, "Importe", item.Importe);

                    let encodedFilters: string = global.encodeObject({ Venta: item.IdVenta});
                    dispatchAsync("load::DocumentoDDL", "base/scv/Ventas/Get/GetVentasDocumentosAll/" + encodedFilters);

                    let parametros: any = global.assign({ Factura: item.Factura, Importe: item.Importe });
                    global.dispatchAsyncPost("global-page-data", "base/scv/Interface/GetBP/GetAllISFDetalle", { parametros }, InterefaceSaldoFactura_Detalle);
                    global.showSidebar("saldoFacturaDetalle");
                }
            }
        };
        onRowDoubleClick(item: any): any {
            return null;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let header: JSX.Element = <div></div>;
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            let vinterface: any = this.props.tipoInterface;
            let Accion: any = this.props.tipoAccion;
            let claveInterface: string = vinterface && vinterface.Clave ? vinterface.Clave : "";
            let claveAccion: boolean = Accion && Accion.ID > 0 && Accion.Clave == 'ED' ? true : false;
            let title: string = vinterface && vinterface.Nombre ? vinterface.Nombre : "Interface";
            if (claveInterface == "ICLI") {
                header = Encabezado_Interface_Clientes;

            }
            else if (claveInterface == "IFNQ") {
                header = Encabezado_Interface_Finiquitos;
            }
            else if (claveInterface == "IPP") {
                header = Encabezado_Interface_PlanPagos;
            }
            else if (claveInterface == "IPOL") {
                header = Encabezado_Interface_Poliza;
            }
            else if (claveInterface == "IREST") {
                header = Encabezado_Interface_Reestructura;
            }
            else if (claveInterface == "ISF") {
                header = Encabezado_Interface_SaldoFactura;
            }
            return <Row>
                <page.SectionList
                            id={scv_Interface_Actual}
                            parent={config.id}
                            idParent={config.id}
                            level={1}
                            title={title}
                            icon="fas fa-ballot-check"
                            size={[12, 12, 12, 12]}
                            listHeader={header}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            selectable={true}
                            horizontalScrolling={true}
                            drawOddLine={true}
                            formatter={(index: number, item: any) => {
                                var expedientSelect = "expedientSelect";
                                var checkState: boolean = false;
                                let indexSeccion: number = item.ID;
                                var tipoEntidad: string = item.Entidad;
                        
                                if (claveInterface == "ICLI") {
                                    return <Row>
                                                    {(claveAccion) ?
                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                
                                                        </Column>
                                                        :
                                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                            <span><checkBox.CheckBox textAlign="center" property={scv_Interface_Actual}
                                                                value={checkState} index={index} id={"interfaceSelect"} idFormSection={config.id} /></span>
                                                        </Column>
                                                    }
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                        <span>{item.ID}</span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                        <span style={{ fontSize: 10 }}>{item.IdExpediente}</span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                        <span style={{ fontSize: 10 }}>{item.IdVenta}</span>
                                                    </Column>
                                                    {(claveAccion) ?
                                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                            <input.Text property={scv_Interface_Actual} index={index} value={item.numcte_ek != "" ? item.numcte_ek : ""} id="numcte_ek" idFormSection={config.id} />
                                                        </Column>
                                                        :
                                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                            <span style={{ fontSize: 10 }}>{item.numcte_ek}</span>
                                                        </Column>
                                                    }
                                                    <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                        <span style={{ fontSize: 10 }}>{item.nombre}</span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                        <span style={{ fontSize: 10 }}>{item.direccion}</span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                        <span style={{ fontSize: 10 }}>{item.EstatusInterface}</span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                        <span style={{ fontSize: 10 }}>{item.EstatusRegistro}</span>
                                                    </Column>
                                                    <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                        <span style={{ fontSize: 10 }}>{item.Entidad}</span>
                                                    </Column>
                                        </Row>;
                                }
                                else if (claveInterface == "IFNQ") {
                                    return <Row>
                                            {(claveAccion) ?
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">

                                                </Column>
                                                :
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span><checkBox.CheckBox textAlign="center" property={scv_Interface_Actual}
                                                        value={checkState} index={index} id={"interfaceSelect"} idFormSection={config.id} /></span>
                                                </Column>
                                            }
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <span>{item.ID}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <span style={{ fontSize: 10 }}>{item.IdExpediente}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.IdVenta}</span>
                                            </Column>
                                            {(claveAccion) ?
                                                <Column size={[12, 2, 2, 2]} className="listItem-center-item  listItem-overflow">
                                                    <input.Text property={scv_Interface_Actual} index={index} value={item.numcte_ek != "" ? item.numcte_ek : ""} id="numcte_ek" idFormSection={config.id} />
                                                </Column>
                                                :
                                                <Column size={[12, 2, 2, 2]} className="listItem-center-item  listItem-overflow">
                                                    <span style={{ fontSize: 10 }}>{item.numcte_ek}</span>
                                                </Column>

                                            }
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item  listItem-overflow">
                                                <span style={{ fontSize: 10 }}>{item.InstitutoCredito}</span>
                                            </Column>
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item  listItem-overflow">
                                                <span style={{ fontSize: 10 }}>{global.formatMoney(item.Monto_Credito, item)}</span>
                                            </Column>
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item  listItem-overflow">
                                                <span style={{ fontSize: 10 }}>{item.InstitutoCredito2}</span>
                                            </Column>
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item  listItem-overflow">
                                                <span style={{ fontSize: 10 }}>{global.formatMoney(item.Monto_Credito2, item)}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.EstatusInterface}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.EstatusRegistro}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.Entidad}</span>
                                            </Column>
                                    </Row>;
                                }
                                else if (claveInterface == "IPP") {
                                    return <Row>

                                            {(claveAccion) ?
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">

                                                </Column>
                                                :
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span><checkBox.CheckBox textAlign="center" property={scv_Interface_Actual}
                                                        value={checkState} index={index} id={"interfaceSelect"} idFormSection={config.id} /></span>
                                                </Column>
                                            }
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <span>{item.ID}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <span style={{ fontSize: 10 }}>{item.IdExpediente}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.IdVenta}</span>
                                            </Column>
                                            {(claveAccion) ?
                                                <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                    <input.Text property={scv_Interface_Actual} index={index} value={item.numcte_ek != "" ? item.numcte_ek : ""} id="numcte_ek" idFormSection={config.id} />
                                                </Column>
                                                :
                                                <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                    <span style={{ fontSize: 10 }}>{item.numcte_ek}</span>
                                                </Column>

                                            }

                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.FacturaCapital}</span>
                                            </Column>
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.NumConceptoPago}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{global.formatDate(item.FechaVencimiento)}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.ValorCapital}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.EstatusInterface}</span>
                                            </Column>

                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.EstatusRegistro}</span>
                                            </Column>
                                            <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.Entidad}</span>
                                            </Column>
                                        
                                    </Row>;
                                }
                                else if (claveInterface == "IPOL") {
                                    return <Row>
                                                {(claveAccion) ?
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">

                                                    </Column>
                                                    :
                                                    <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                        <span><checkBox.CheckBox textAlign="center" property={scv_Interface_Actual}
                                                            value={checkState} index={index} id={"interfaceSelect"} idFormSection={config.id} /></span>
                                                    </Column>
                                                }
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item" style={{ marginRight: 5}}>
                                                    <span>{item.ID}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.IdExpediente}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.IdVenta}</span>
                                                </Column>
                                                {(claveAccion) ?
                                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                        <input.Text property={scv_Interface_Actual} index={index} value={item.numcte_ek != "" ? item.numcte_ek : ""} id="numcte_ek" idFormSection={config.id} />
                                                    </Column>
                                                    :
                                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                        <span style={{ fontSize: 10 }}>{item.numcte_ek}</span>
                                                    </Column>

                                                }
                                                <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.TipoProceso}</span>
                                                </Column>
                                                <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.Segmento}</span>
                                                </Column>
                                            
                                         
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{global.formatDate(item.Fecha_Registro)}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.TC}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.InstitutoCredito}</span>
                                                </Column>
                                                <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.Monto_Escrituracion}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.EstatusInterface}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span style={{ fontSize: 10 }}>{item.EstatusRegistro}</span>
                                                </Column>
                                                <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                                    <span style={{ fontSize: 10 }}>{item.Entidad}</span>
                                                </Column>
                                           </Row>;
                                }
                                else if (claveInterface == "IREST") {
                                    return <Row>
                                      
                                        {(claveAccion) ?
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">

                                            </Column>
                                            :
                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <span><checkBox.CheckBox textAlign="center" property={scv_Interface_Actual}
                                                    value={checkState} index={index} id={"interfaceSelect"} idFormSection={config.id} /></span>
                                            </Column>
                                        }
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            <span>{item.ID}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            <span style={{ fontSize: 10 }}>{item.IdExpediente}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.IdVenta}</span>
                                        </Column>
                                        {(claveAccion) ?
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                <input.Text property={scv_Interface_Actual} index={index} value={item.numcte_ek != "" ? item.numcte_ek : ""} id="numcte_ek" idFormSection={config.id} />
                                            </Column>
                                            :
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.numcte_ek}</span>
                                            </Column>
                                        }
                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{global.formatDate(item.Fecha_Reestructura)}</span>
                                        </Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.TC}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.EstatusInterface}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.EstatusRegistro}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.Entidad}</span>
                                        </Column>
                                    </Row>;
                                }
                                else if (claveInterface == "ISF") {
                                    let loc = item.Localizado == false ? true : false;

                                    return <Row>
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            {(loc) ?
                                                <span>
                                                    <button title="Aplicar" onClick={this.onClick.bind(this, item, item.ID)}>
                                                        <i className="fas fa-cog" style={{ fontSize: "15px" }}> </i>
                                                    </button>
                                                </span>
                                                    :null
                                             }
                                           
                                        </Column>
                                        {(claveAccion) ?
                                               <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                
                                               </Column>
                                            :
                                               <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <span><checkBox.CheckBox textAlign="center" property={scv_Interface_Actual}
                                                        value={checkState} index={index} id={"interfaceSelect"} idFormSection={config.id} /></span>
                                               </Column>
                                        }
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            <span>{item.ID}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            <span style={{ fontSize: 10 }}>{item.IdExpediente}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.IdVenta}</span>
                                        </Column>
                                        {(claveAccion) ?
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                <input.Text property={scv_Interface_Actual} index={index} value={item.numcte_ek != "" ? item.numcte_ek : ""} id="numcte_ek" idFormSection={config.id} />
                                            </Column>
                                            :
                                            <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                                <span style={{ fontSize: 10 }}>{item.numcte_ek}</span>
                                            </Column>
                                        }
                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{global.formatDate(item.Fecha_Reestructura)}</span>
                                        </Column>
                                        <Column size={[12, 2, 2, 2]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.Factura}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.SaldoFactura}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.Importe}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.EstatusInterface}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.EstatusRegistro}</span>
                                        </Column>
                                        <Column size={[12, 1, 1, 1]} className="listItem-center-item">
                                            <span style={{ fontSize: 10 }}>{item.Entidad}</span>
                                        </Column>
                                    </Row>;
                                }
                                
                            }}>
                </page.SectionList>
            </Row>
        }

    });
    
    export let DocumentoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DocumentoDDL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Documento",
            items: createDefaultStoreObject([]),
            label: "Documento",
            helpLabel: "Seleccione un Documento",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                const val = { style: 'currency', currency: 'USD' };
                const numberFormat = new Intl.NumberFormat('en-US', val);
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-info'>", " #: ", item.ID, "  ", "</span>",
                        "<span class='bandera-", "  ", numberFormat.format(item.CapitalMoneda), "'></span>",
                        "<span class='badge badge-info'>", "  ", numberFormat.format(item.CapitalMoneda), "</span>"

                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                const val = { style: 'currency', currency: 'USD' };
                const numberFormat = new Intl.NumberFormat('en-US', val);
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-info'>", " #: ", item.ID, "  ", "</span>",
                    "<span class='bandera-", "  ", numberFormat.format(item.CapitalMoneda), "'></span>",
                    "<span class='badge badge-info'>", "  ", numberFormat.format(item.CapitalMoneda), "</span>"

                ].join(""));
            },
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ Venta: null });
                dispatchAsync("load::DocumentoDDL", "base/scv/Ventas/Get/GetVentasDocumentosAll/" + encodedFilters);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let InterfaceDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.OPCIONESINTERFACE
        });
        static defaultProps: IDropDrownListProps = {
            id: "interface",
            items: createDefaultStoreObject([]),
            label: "Interface",
            helpLabel: "Seleccione un Interface",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OPCIONESINTERFACE", "catalogos/get(OPCIONESINTERFACE)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let EstatusRegistroDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSREGISTRO
        });
        static defaultProps: IDropDrownListProps = {
            id: "estatusRegistro",
            items: createDefaultStoreObject([]),
            label: "Estatus Registro",
            helpLabel: "Seleccione un Estatus",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span>", item.Nombre," ", "</span>",
                        "<span class='bandera-", item.Clave, "'></span>",
                        "<span class='badge badge-info'>", item.Clave, "</span>"
                        
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span>", item.Nombre," ", "</span>",
                    "<span class='bandera-", item.Clave, "'></span>",
                    "<span class='badge badge-info'>", item.Clave, "</span>"
                    
                ].join(""));
            },
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSREGISTRO", "catalogos/get(ESTATUSREGISTRO)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    export let EstatusInterfaceDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ESTATUSINTERFACE
        });
        static defaultProps: IDropDrownListProps = {
            id: "estatusInterface",
            items: createDefaultStoreObject([]),
            label: "Estatus Interface",
            helpLabel: "Seleccione un Estatus",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span>", item.Nombre," ", "</span>",
                        "<span class='bandera-", item.Clave, "'></span>",
                        "<span class='badge badge-info'>", item.Clave, "</span>"
                        
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span>", item.Nombre," ", "</span>",
                    "<span class='bandera-", item.Clave, "'></span>",
                    "<span class='badge badge-info'>", item.Clave, "</span>"
                ].join(""));
            },
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ESTATUSINTERFACE", "catalogos/get(ESTATUSINTERFACE)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    export let AccionesDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ACCIONESINTERFACE
        });
        static defaultProps: IDropDrownListProps = {
            id: "accion",
            items: createDefaultStoreObject([]),
            label: "Acción",
            helpLabel: "Seleccione una Acción",
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ACCIONESINTERFACE", "catalogos/get(ACCIONESINTERFACE)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

    

    interface ISaveReassignmentButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        ml?: string;
        filterEstadoReasignacion?: any;
        config?: page.IPageConfig;
    }
    let SaveReassignmentButton: any = global.connect(class extends React.Component<ISaveReassignmentButton, {}> {
        constructor(props: ISaveReassignmentButton) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.AgenteOrigen = Forms.getValue("AgenteOrigen", config.id, state);
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.item = state.global.currentEntity;
            return retValue;
        };

        static defaultProps: ISaveReassignmentButton = {
            icon: "icon-cloud-upload",
            text: "",
            color: "white",
            className: "btn btn-default-ek btn-editing  btn-sm yellow-casablanca",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        saveForm(): any {

            let Accion = Forms.getValue("Accion", "Interface");
            let AplicarTodos = Forms.getValue("AplicarTodos", "Interface");
            let Interface = Forms.getValue("Interface", "Interface$filters");
            let vCheck: any;
            let banderaResult: boolean = false;
            
            if (Accion.ID > 0) {
                let ElementsData: any = EK.Store.getState().forms.Interface.form.InterfaceActual.value.data;
                let newValue: any[];
                let temporal: any[];
                if (Accion.Clave == "ED") {
                    //recorrer elementos para actualizar Modificados
                    temporal = ElementsData.filter(value => value._modificado === true);

                    let item: EditForm = Forms.getForm(config.id);
                    let model: any = item
                        .addID()
                        .addObject("Accion")
                        .addObjectConst("Interface", Interface)
                        .addObjectConst("Detalles", temporal)
                        .toObject();
                    banderaResult = true;
                    global.dispatchAsyncPut("global-page-data", "base/scv/Interface/Get/SaveInterface", model, scv_Interface_Actual);
                    let parametros: any = global.assign({ IdInterface: Interface.Clave });
                    global.dispatchAsyncPost("global-page-data", "base/scv/interface/GetBP/GetAll", { parametros }, scv_Interface_Actual);

                }
                else {

                    if (AplicarTodos != undefined && AplicarTodos != null && AplicarTodos != false) {
                        let item: EditForm = Forms.getForm(config.id);
                        let model: any = item
                            .addID()
                            .addObject("Accion")
                            .addObjectConst("Interface", Interface)
                            .addObjectConst("Detalles", ElementsData)
                            .toObject();
                        banderaResult = true;
                        global.dispatchAsyncPut("global-page-data", "base/scv/Interface/Get/SaveInterface", model, scv_Interface_Actual);
                        let parametros: any = global.assign({ IdInterface: Interface.Clave });
                        global.dispatchAsyncPost("global-page-data", "base/scv/interface/GetBP/GetAll", { parametros }, scv_Interface_Actual);

                    } else {
                        //recorrer elementos para actualizar checkeados
                        newValue = ElementsData.filter(value => value.interfaceSelect === true);
                        
                        let item: EditForm = Forms.getForm(config.id);
                        let model: any = item
                            .addObject("Accion")
                            .addObjectConst("Interface", Interface)
                            .addObjectConst("Detalles", newValue)
                            .toObject();
                        banderaResult = true;
                        global.dispatchAsyncPut("global-page-data", "base/scv/Interface/Get/SaveInterface", model, scv_Interface_Actual);
                        let parametros: any = global.assign({ IdInterface: Interface.Clave });
                        global.dispatchAsyncPost("global-page-data", "base/scv/interface/GetBP/GetAll", { parametros }, scv_Interface_Actual);
                    }

                }
                
            }
            else {
                warning("Favor de Indicar Una Accion", "Accion");
            }
        };
        shouldComponentUpdate(nextProps: ISaveReassignmentButton, { }): boolean {
            return true;
        }
        render(): JSX.Element {
            let Entidad: any = global.getData(this.props.item);

            return <Button {...this.props} onClick={this.saveForm} />;

        }
    });
};


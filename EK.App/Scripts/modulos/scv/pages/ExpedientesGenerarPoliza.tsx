namespace EK.Modules.SCV.Pages.ExpedientesGenerarPoliza {
    "use strict";
    const DATOS_POLIZA: string = "DatoSPoliza";
    const DATOS_POLIZA_SUBTITLE: string = "Datos para Generar Póliza";

    const config: page.IPageConfig = global.createPageConfig("expedientesGenerarPoliza", "scv", [DATOS_POLIZA]);

    const w: any = window;

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/expedientesGenerarPoliza/GetBP/GetExpedientesPolizaFiniquito", { parametros: f });            
        };

        onRowDoubleClick(item: any): any {
            return null;
        };

        render(): JSX.Element {

            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addSelect()
                .addID({ title: "Expediente", width: 25, })
                .add({ data: "Cliente.ID", title: "Número Cliente", width: 30 })
                .add({ data: "Cliente.Nombre", width: 40 })
                .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: 25 })
                .add({ data: "Desarrollo.CentroCosto.Nombre", title: "Centro de Costo", width: 30 })
                .add({ data: "PrecioVenta", title: "Precio Venta", width: 25 })
                .add({ data: "MontoCredito", title: "Monto de Crédito", width: 25 })
                .add({ data: "Diferencia", title: "Diferencia", width: 20 })
                .add({ data: "Descuento", title: "Descuento", width: 20 })
                .add({ data: "OtrosCargos", title: "Otros cargos", width: 25 })
                .add({ data: "Poliza.NumeroPoliza", title: "Numero Póliza", width: 25 })
                .add({ data: "Poliza.Anio", title: "Año Póliza", width: 25 })
                .add({ data: "Poliza.Mes", title: "Mes Póliza", width: 25 })
                .add({ data: "Poliza.TipoPoliza", title: "Tipo Póliza", width: 25 })
                .toArray();
            dtConfig.groups
                .add({ data: "Cliente.Nombre" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowNew={false}
                allowDelete={false}>
                <PageButtons>
                    <GenerarPolizaButton />
                    <CancelarPolizaButton />
                </PageButtons>
                <page.Filters>
                    <ddl.EstadoPolizaFiniquitoDDL id="EstadoPolizaFiniquito" size={[12, 12, 3, 3]} />
                    <input.Integer label={ml.form.FolioExpediente.label} id="ID" size={[12, 12, 3, 3]} />
                    <ddl.DesarrollosDDL id="Desarrollo" addNewItem={"VT"} size={[12, 12, 3, 3]} />
                    <ddl.TipoComercializacionDDL size={[12, 12, 3, 3]} id="TipoComercializacion" cargarDatos={true} addNewItem={"VT"} />
                    <EK.Modules.SCV.Pages.Expedientes.ClientesDDL id="Cliente" size={[12, 12, 3, 3]} />
                    <ddl.TiposFinanciamientoDDL size={[12, 12, 3, 3]} id="Financiamiento" addNewItem={"VT"} />
                    <select.Agente size={[12, 12, 3, 3]} id={"Agente"} label={ml.form.Agente.label}  />
                    <DatePicker id="FilterFechaPoliza" type="date" size={[12, 12, 3, 3]} label={ml.form.FilterFechaPoliza.label} />
                </page.Filters>

                <Column size={[12, 12, 12, 12]}>
                    <Row style={{ paddingTop: 20 }}>
                        <page.OptionSection
                            id={DATOS_POLIZA}
                            subTitle={DATOS_POLIZA_SUBTITLE}
                            icon="fa fa-info-circle" collapsed={true} hideCollapseButton={false} level={1}>
                            <Row>
                                <Column >
                                    <Row>
                                        <DatePicker id="FechaPoliza" type="date" size={[12, 12, 4, 4]} label={ml.form.FechaPoliza.label} initialValue={new Date()} value={new Date()} />
                                        <ddl.TiposDeProcesosDDL id="TiposDeProcesos" size={[12, 12, 4, 4]} addNewItem={"SO"} />
                                    </Row>
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Row>
                </Column>
                <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} />

                {/* <dt.PageTable columns={columns} /> */}
                    
            </page.Main>;
        };
    };


    interface IGenerarPolizaButton extends EK.UX.Buttons.IButtonProps {
        items?: any;
        config?: page.IPageConfig;
        filterEstadoPoliza?: any;
    }

    let GenerarPolizaButton: any = global.connect(class extends React.Component<IGenerarPolizaButton, {}> {
        constructor(props: IGenerarPolizaButton) {
            super(props);
            this.onGenerarPoliza = this.onGenerarPoliza.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            filterEstadoPoliza: state.forms["expedientesGenerarPoliza$filters"]
        });
        static defaultProps: IGenerarPolizaButton = {
            icon: "fas fa-file-contract",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onGenerarPoliza(): void {
            let $ml: any = this.props.config.getML();
            let itemArray: any = getData(this.props.items);
            let tipoProceso: any = Forms.getValue("TiposDeProcesos", config.id);
            let IdtipoProceso: any = tipoProceso.ID;
            let fechaPoliza: any = Forms.getValue("FechaPoliza", config.id);
            let ExpedientesID = [];
            for (let i = 0; i < itemArray.length; i++){
                ExpedientesID.push(itemArray[i].ID);
            }
            if (tipoProceso != undefined && tipoProceso != null && fechaPoliza != undefined && tipoProceso.ID >= 0 && itemArray[0].ClaveDashboard != undefined) {
                EK.Global.confirm("Solicitud generación de Póliza", "Autorización Póliza", () => {
                    global.asyncPost("base/scv/expedientesGenerarPoliza/GetBP/SolicitudPoliza/", { Expedientes: ExpedientesID, IdTipoProceso: IdtipoProceso, FechaPoliza: fechaPoliza },(status: AsyncActionTypeEnum, data: any) => {
                        if (status === AsyncActionTypeEnum.successful) {
                            Forms.updateFormElement(config.idFilters, "EstadoPolizaFiniquito", { ID: data.IdEstadoPoliza });
                            let fil: any = global.assign(null, { IdEstadoPolizaFiniquito: data.IdEstadoPoliza });
                            config.dispatchCatalogoBasePost("base/scv/expedientesGenerarPoliza/GetBP/GetExpedientesPolizaFiniquito", { parametros: fil });            
                            success("Solicitud de Poliza Enviada");
                        }
                });
                });
            } else {
                warning("Debe indicar Tipo de Proceso y Fecha Póliza", "Generar Póliza");                
            }
        }
        shouldComponentUpdate(nextProps: IGenerarPolizaButton, { }): boolean {
            return true;
        }

        render(): JSX.Element {
            let entidadArray: any = getData(this.props.items);
            let filterFormObj: any = this.props.filterEstadoPoliza ? this.props.filterEstadoPoliza.form : null;
            if (filterFormObj != null && filterFormObj != undefined && entidadArray.length >= 1 && entidadArray[0].ClaveDashboard != undefined && filterFormObj.EstadoPolizaFiniquito.value.Clave == "PFNG") {
                return <Button {...this.props} onClick={this.onGenerarPoliza} keyBtn={"btnGenerarPoliza"} />;
            }
            return null;
        }
    });


    interface ICancelarPolizaButton extends EK.UX.Buttons.IButtonProps {
        items?: any;
        config?: page.IPageConfig;
        filterEstadoPoliza?: any;
    }

    let CancelarPolizaButton: any = global.connect(class extends React.Component<ICancelarPolizaButton, {}> {
        constructor(props: ICancelarPolizaButton) {
            super(props);
            this.onCancelarPoliza = this.onCancelarPoliza.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            filterEstadoPoliza: state.forms["expedientesGenerarPoliza$filters"]
        });
        static defaultProps: ICancelarPolizaButton = {
            icon: "fas fa-adjust",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onCancelarPoliza(): void {
            let $ml: any = this.props.config.getML();
            let itemArray: any = getData(this.props.items);
            let ExpedientesID = [];
            for (let i = 0; i < itemArray.length; i++) {
                ExpedientesID.push(itemArray[i].ID);
            }
            if (ExpedientesID.length > 0) {
                EK.Global.confirm("Solicitud cancelación de Poliza", "Autorización Poliza", () => {
                    global.asyncPost("base/scv/expedientesGenerarPoliza/GetBP/CancelarPoliza/", { Expedientes: ExpedientesID }, (status: AsyncActionTypeEnum, data: any) => {
                        if (status === AsyncActionTypeEnum.successful && data != null && data.ID > 0) {
                            success("Solicitud de cancelación de Poliza Enviada");
                        }
                    });
                });
            } else {
                warning("Registro de Poliza con Error", "Cancelar Poliza");
            }
        }

        shouldComponentUpdate(nextProps: ICancelarPolizaButton, { }): boolean {
            return true;
        }

        render(): JSX.Element {
            let entidadArray: any = getData(this.props.items);
            let filterFormObj: any = this.props.filterEstadoPoliza ? this.props.filterEstadoPoliza.form : null;
            let estatusPoliza: any = entidadArray.length >= 1 && entidadArray[0].EstadoPoliza && entidadArray[0].EstadoPoliza.Clave ? entidadArray[0].EstadoPoliza.Clave : null;
            if (filterFormObj != null && filterFormObj != undefined && entidadArray.length >= 1 && entidadArray[0].TipoProceso != undefined && entidadArray[0].FechaPoliza != undefined && filterFormObj.EstadoPolizaFiniquito.value.Clave == estatusPoliza && estatusPoliza == "PFG") {
                return <Button {...this.props} onClick={this.onCancelarPoliza} keyBtn={"btnCancelarPoliza"} />;
            }
            return null;
        }
    });

};
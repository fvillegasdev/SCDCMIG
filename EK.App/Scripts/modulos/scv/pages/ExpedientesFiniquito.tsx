namespace EK.Modules.SCV.Pages.ExpedientesEnFiniquito {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("expedientesFiniquito", "scv");

    const w: any = window;

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/expedientesFiniquito/GetBP/GetExpedientesFiniquito", { parametros: f });
        };

        onRowDoubleClick(item: any): void {
            let expediente: any = item.ID ? item : getData(item);
            let url: string = global.getFullUrl("/scv/ventas/" + expediente.ID + "?" + global.encodeParameters({ expedienteFiniquito: true }));
            global.go(url);
        };

        render(): JSX.Element {
            let estadoFiniquito: (data: any, row: any) => any = (data: any, row: any): any => {
                let Estado: any;
                if (row.EstadoFiniquito) {
                    if (row.EstadoFiniquito.Clave === 'FCOM' && row.IdEstadoFiniquito == row.EstadoFiniquito.ID) {
                        Estado = <span className="badge badge-light pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Completado</span>
                    } else if (row.EstadoFiniquito.Clave === 'FCP' && row.IdEstadoFiniquito == row.EstadoFiniquito.ID) {
                        Estado = <span className="badge badge-danger pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Con Poliza</span>
                    } else if (row.EstadoFiniquito.Clave === 'FPA' && row.IdEstadoFiniquito == row.EstadoFiniquito.ID) {
                        Estado = <span className="badge badge-primary pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Por Autorizar</span>
                    } else {
                        Estado = <span className="badge badge-success pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Iniciado</span>
                    }
                }
                return <div key={row.ID}>
                    <div>{(Estado)}</div>
                </div>;
            };


            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            //let columns: dt.IDTColumn[] = dt.createColumns(ml)
            //    .addID({ width: 10, title: "Expediente" })
            //    .add({ data: "Cliente.Nombre", title: "Nombre", width: 25, render: EK.UX.Labels.formatLinkEntity })
            //    .add({ data: "Cliente.Celular", title: "Teléfono", width: 15 })
            //    .add({ data: "Cliente.Email", title: "Email", width: 15, render: EK.UX.Labels.formatEmail })
            //    .add({ data: "TipoComercializacion.Nombre", title: "Tipo Comercialización", width: 15 })
            //    .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: 20 })
            //    .toArray();

            dtConfig.columns
                .addSelect()
                .addID({ title: "Expediente", width: "100px" })
                .add({ data: "Cliente.ID", title: "Número Cliente", width: "150px" })
                .add({ data: "Cliente.Nombre", width: "200px" })
                //.add({ data: "Proceso.Nombre", title: "Proceso", width: "200px"})
                //.add({ data: "EstatusProceso.Nombre", title: "Estatus Proceso", width: "200px" })
                //.add({ data: "EstatusVenta.Nombre", title: "Estatus Venta", width: "200px" })
                .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: "200px" })
                .add({ data: "TipoComercializacion.Nombre", title: "Tipo Comercialización", width: "200px" })
                .add({ data: "EstadoFiniquito.ID", title: "Estado Finiquito", width: "200px", format: estadoFiniquito })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                onView={this.onRowDoubleClick}
                allowNew={false}
                allowDelete={false}>
                <PageButtons>
                    <CancelarFiniquitoButton />
                </PageButtons>
                <page.Filters>
                    <ddl.EstadoFiniquitoDDL id="EstadoFiniquito" size={[12, 12, 2, 2]} addNewItem={"VT"}/>
                    <input.Integer label={ml.form.FolioExpediente.label} id="ID" size={[12, 2, 2, 2]} />
                    <ddl.DesarrollosDDL id={"Desarrollo"} addNewItem={"VT"} size={[12, 3, 3, 3]}  />
                    <ddl.TipoComercializacionDDL size={[12, 12, 2, 2]} id={"TipoComercializacion"} cargarDatos={true} addNewItem={"VT"} />
                    <ddl.TiposFinanciamientoDDL size={[12, 12, 3, 3]} id={"Financiamiento"} addNewItem={"VT"} />

                    <EK.Modules.SCV.Pages.Expedientes.ClientesDDL id={"Cliente"} size={[12, 12, 4, 4]} label={ml.form.Cliente.label} />
                    <ddl.InstitucionesCreditoDDL size={[12, 12, 3, 3]} id={"InstitucionCredito"} addNewItem={"VT"} />
                    <ddl.MonedasDDL size={[12, 12, 2, 2]}addNewItem={"VT"} id={"Moneda"} label={ml.form.Moneda.label} />
                    <select.Agente size={[12, 12, 3, 3]} id={"Agente"} label={ml.form.Agente.label} />
                </page.Filters>

                {/*<dt.PageTable columns={columns} onRowDoubleClick={this.onRowDoubleClick} />*/}
                <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick}  />

                <modal.Modal id="modalMessage" url={"about:blank"}></modal.Modal>
            </page.Main>;
        };
    };

    interface ICancelarFiniquitoButton extends EK.UX.Buttons.IButtonProps {
        items?: any;
        config?: page.IPageConfig;
        filterEstadoPoliza?: any;
    }

    let CancelarFiniquitoButton: any = global.connect(class extends React.Component<ICancelarFiniquitoButton, {}> {
        constructor(props: ICancelarFiniquitoButton) {
            super(props);
            this.onCancelarFiniquito = this.onCancelarFiniquito.bind(this);
        };
        static props: any = (state: any) => ({
            items: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            //filterEstadoFiniquito: state.forms.expedientesGenerarPoliza$filters.form   FALTA DEFINIR FILTROS FINIQUITO
        });
        static defaultProps: ICancelarFiniquitoButton = {
            icon: "fas fa-reply-all",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onCancelarFiniquito(): void {
            let $ml: any = this.props.config.getML();
            let itemArray: any = getData(this.props.items);
            let ExpedientesID = [];
            let validate: boolean = false;
            for (let i = 0; i < itemArray.length; i++) {
                if (itemArray[i].EstadoFiniquito.Clave === "FCOM") {
                    ExpedientesID.push(itemArray[i].ID);
                    validate = true;
                }
            }
            if (validate) {
                EK.Global.confirm("Solicitud cancelación de Finiquito", "Autorización Finiquito", () => {
                    global.asyncPost("base/scv/expedientesFiniquito/GetBP/CancelarFiniquito/", { Expedientes: ExpedientesID}, (status: AsyncActionTypeEnum, data: any) => {
                        if (status === AsyncActionTypeEnum.successful && data != null && data.ID > 0) {
                            //Forms.updateFormElement(config.idFilters, "EstadoPolizaFiniquito", { ID: data.IdEstadoPoliza });
                            let f: any = global.assign(null, {});
                            config.dispatchCatalogoBasePost("base/scv/expedientesFiniquito/GetBP/GetExpedientesFiniquito", { parametros: f });
                            success("Solicitud de Cancelación Enviada");
                        }
                    });
                });
            } 
        }
        shouldComponentUpdate(nextProps: ICancelarFiniquitoButton, { }): boolean {
            return true;
        }

        render(): JSX.Element {
            let entidadArray: any = getData(this.props.items);
            let validate: boolean = false;
            for (let i = 0; i < entidadArray.length; i++) {
                if (entidadArray[i].EstadoFiniquito.Clave === "FCOM") {
                    validate = true;
                }
                else {
                    validate = false;
                    break;
                }
            }
            if (validate) {
                return <Button {...this.props} onClick={this.onCancelarFiniquito} keyBtn={"btnCancelarFiniquito"} />;
            }
            return null;
        }
    });
};

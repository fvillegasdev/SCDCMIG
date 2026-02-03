namespace EK.Modules.SCV.Pages.ExpedientesEnEscrituracion {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("expedientesEscriturar", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            let fil: any = global.assign(f, { claveProceso: "PROC-ESCRITURACION" });
            props.config.dispatchCatalogoBasePost("base/scv/dashBoardExpedientes/GetBP/GetDashboardExpedientes", { parametros: fil });

        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ width: 10, title: "Expediente" })
                .add({ data: "Cliente.Nombre", title: "Nombre", width: 25, render: EK.UX.Labels.formatLinkEntity })
                .add({ data: "Cliente.Celular", title: "Teléfono", width: 15 })
                .add({ data: "Cliente.Email", title: "Email", width: 15, render: EK.UX.Labels.formatEmail })
                .add({ data: "TipoComercializacion.Nombre", title: "Tipo Comercialización", width: 15 })
                .add({ data: "Desarrollo.Nombre", title: "Desarrollo", width: 20 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>

                    <input.Integer label={ml.form.FolioExpediente.label} id="ID" size={[12, 2, 2, 2]} />
                    <ddl.DesarrollosDDL id={"Desarrollo"} addNewItem={"VT"} size={[12, 3, 3, 3]} />
                    <ddl.TipoComercializacionDDL size={[12, 3, 3, 3]} id={"TipoComercializacion"} cargarDatos={true} addNewItem={"VT"} />
                    <EK.Modules.SCV.Pages.Expedientes.ClientesDDL id={"Cliente"} size={[12, 4, 4, 4]} label={ml.form.Cliente.label} />


                    <ddl.TiposFinanciamientoDDL size={[12, 3, 3, 3]} id={"Financiamiento"} addNewItem={"VT"} />
                    <ddl.SCVEsquemasSeguimiento size={[12, 3, 3, 3]} id={"Esquema"} addNewItem={"VT"} label={ml.form.EsquemaSeguimiento.label} />

                    <ddl.SCVEtapasDDL size={[12, 3, 3, 3]} id={"Etapa"} addNewItem={"VT"} />
                    <ddl.InstitucionesCreditoDDL size={[12, 3, 3, 3]} id={"InstitucionCredito"} addNewItem={"VT"} />

                    <ddl.MonedasDDL size={[12, 3, 3, 3]} addNewItem={"VT"} id={"Moneda"} label={ml.form.Moneda.label} />
                    <select.Agente size={[12, 3, 3, 3]} id={"Agente"} label={ml.form.Agente.label} />

                    <ddl.UbicacionesDDL size={[12, 3, 3, 3]} id={"Ubicacion"} cargarDatos={true} addNewItem={"VT"} />

                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};

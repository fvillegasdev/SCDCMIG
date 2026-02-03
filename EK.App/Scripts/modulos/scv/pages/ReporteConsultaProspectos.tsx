namespace EK.Modules.SCV.Pages.ReporteConsultaProspectos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("reporteconsultaprospectos", "scv");

    export const Vista: any = global.connect(class Vista extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            //console.log(f)
            if (f != undefined && f.IdOrigen != undefined) {
                f.IdOrigen = filters.Origen.Clave;
                props.config.dispatchCatalogoBasePost("base/scv/ReporteConsultaProspectos/GetBP/GetReporteConsultaProspectos", { parametros: f });
           }

          };

        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);

            const formatDate: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
                return <div style={{ textAlign: "center" }}>{label.formatDate(data)}</div>
            };

         
            dtConfig.columns
                .add({ data: "Catalogo.Nombre", title: "Estatus", width: "80px" })
                .add({ data: "Boleta.Id", title: "Id Prospecto", width: "80px" })
                .add({ data: "Boleta.Nombre", title: "Prospecto Cliente", width: "150px" })
                .add({ data: "Boleta.creado", title: "Fecha Registro", width: "100px", format: formatDate})
                .add({ data: "UsuarioRegistro.nombre", title: "Agente Registro", width: "150px" })
                .add({ data: "Boleta.Telefono", title: "Telefono", width: "150px" })
                .add({ data: "Boleta.Correo", title: "Correo", width: "150px" })
                .add({ data: "Origen.nombre", title: "Origen", width: "120px" })
                .add({ data: "Origen.Creadopor", title: "Agente Titular", width: "100px" })
                .add({ data: "CampaniaPublicidad.Nombre", title: "Campaña Publicidad", width: "110px" })
                .add({ data: "Grado.Nombre", title: "Grado Interes", width: "100px" })
                .add({ data: "Expediente.Id", title: "Expediente", width: "80px" })
                .add({ data: "Expediente.AgenteResponsable", title: "Agente Responsable", width: "100px" })
                .add({ data: "Esquema.Nombre", title: "Esquema", width: "110px" })
                .add({ data: "Desarrollo.Descripcion", title: "Desarrollo", width: "220px" })
                .add({ data: "Etapa.Etapa", title: "Etapa", width: "150px" })
                .add({ data: "Etapaseguimientoetapas.FechaInicio", title: "Etapa Fecha Inicio", width: "100px", format: formatDate})
                .add({ data: "Etapaseguimientoetapas.FechaVencimiento", title: "Etapa Fecha Vencimiento", width: "100px", format: formatDate})
                .add({ data: "Etapaseguimientoetapas.PlazoVencimiento", title: "Plazo Vencido", width: "60px" })
                .add({ data: "CantidaddeExpedientes", title: "Cantidad de Expedientes", width: "60px" }) 
                .toArray();
            
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.OrigenProspectoDDL id="Origen" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.ExpedienteEstatusDLL id="Estatus" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.AgentesDDL id="AgenteTitular" label="Agente titular" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.AgentesDDL id="AgenteResponsable" label="Agente Responsable" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.AgentesDDL id="AgenteRegistro" label="Agente Registro" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <DatePicker id="FechaInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;

        };

    });


};
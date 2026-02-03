namespace EK.Modules.SCV.Pages.ReporteProspectosClientes {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("reporteprospectosclientes", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            //if (f != null) {
            //    f.IdAgenteCaptura = filters.AgenteCaptura ? filters.AgenteCaptura.IdUsuario : undefined;
            //    f.IdAgenteAsignado = filters.AgenteAsignado ? filters.AgenteAsignado.IdUsuario : undefined;
            //    f.IdAgenteDescartada = filters.AgenteDescartada ? filters.AgenteDescartada.IdUsuario : undefined;
            //    f.CPMunicipio = filters.CPMunicipio ? filters.CPMunicipio : undefined;
            //}
            props.config.dispatchCatalogoBasePost("base/scv/ReporteProspectosClientes/GetBP/GetReporteProspectosClientes", { parametros: f });
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Estatus.Nombre", title: "Estatus", width: "150px" })
                .add({ data: "Origen.ID", title: "Origen", width: "150px" })
                .add({ data: "Discapacidad", title: "Discapacidad", width: "10px" })
                .add({ data: "Genero.Nombre", title: "Género", width: "50px" })
                .add({ data: "EstadoCivil.Nombre", title: "Estado Civil", width: "30px" })
                .add({ data: "RegimenConyugal.Nombre", title: "Regimen Conyugal", width: "40px" })
                .add({ data: "RangoIngresos.Nombre", title: "Rango Ingresos", width: "50px" })
                .add({ data: "Giro.Nombre", title: "Giro", width: "60px" })
                .add({ data: "AgenteTitular.Nombre", title: "Agente Titular", width: "30px" })
                .add({ data: "AgenteRegistro.Nombre", title: "Agente Registro", width: "30px" })
                .add({ data: "EstadoOrigen.Nombre", title: "EstadoOrigen", width: "50px" })
                .add({ data: "DomicilioCompleto", title: "Domicilio", width: "100px" })
                .add({ data: "ExpedienteDesarrollo.Nombre", title: "Desarrollo Expediente", width: "40px" })
                .add({ data: "InteresDesarrollo.Nombre", title: "Desarrollo Interes", width: "50px" })
                .add({ data: "FechaNacimiento", title: "Fecha Nacimiento", width: "200px" })
                .add({ data: "FechaContacto", title: "Fecha Contacto", width: "200px" })
                .add({ data: "FechaProspecto", title: "Fecha Prospecto", width: "100px" })
                .add({ data: "FechaCliente", title: "Fecha Cliente", width: "50px" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.EstatusBoletaProspeccion id="Estatus" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.OrigenDDL id="Origen" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <ddl.TiposPersonaDDL id="TipoPersona" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <CheckBox id="Discapacidad" size={[12, 2, 1, 1]} icon={"fa fa-wheelchair"} label=" " />
                    <ddl.GenerosDDL id="Genero" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <ddl.EstadoCivilDLL id="EstadoCivil" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.SCVRegimenDDL id="RegimenConyugal" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.RangosIngresosDDL id="Rangoingresos" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.GirosDDL id="Giro" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.AgentesDDL id="AgenteTitular" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.AgentesDDL id="AgenteRegistro" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <input.CodigoPostal id={"idDomicilio"} size={[12, 12, 3, 3]} />
                    <ddl.Estados id="EstadoOrigen" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.DesarrollosDDL id="DesarrolloExpediente" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.DesarrollosDDL id="MotivosDescartada" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.EmpresasDLL id="ReferenciaLaboral" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <DatePicker id="FechaNacInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaNacFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaContactoInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaContactoFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaProspectoInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaProspectoFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaClienteInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaClienteFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;

        };

    };

};
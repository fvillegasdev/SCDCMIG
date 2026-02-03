namespace EK.Modules.SCV.Pages.ReporteBoletasProspeccion {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("reporteboletasprospeccion", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            if (f != null) {
                f.IdAgenteCaptura = filters.AgenteCaptura ? filters.AgenteCaptura.IdUsuario : undefined;
                f.IdAgenteAsignado = filters.AgenteAsignado ? filters.AgenteAsignado.IdUsuario : undefined;
                f.IdAgenteDescartada = filters.AgenteDescartada ? filters.AgenteDescartada.IdUsuario : undefined;
                f.CPMunicipio = filters.CPMunicipio ? filters.CPMunicipio : undefined;
            }
            props.config.dispatchCatalogoBasePost("base/scv/ReporteBoletasProspeccion/GetBP/GetReportesBoletasProspeccion", { parametros: f });
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "NombreCompleto", title: "Nombre Completo", width: "150px" })
                .add({ data: "Domicilio", title: "Domicilio", width: "150px" })
                .add({ data: "NumeroExterior", title: "Número Exterior", width: "10px" })
                .add({ data: "Correo", title: "Correo", width: "50px" })
                .add({ data: "Teléfono", title: "Teléfono", width: "30px" })
                .add({ data: "NSS", title: "Número del Seguro Social", width: "40px" })
                .add({ data: "CURP", title: "CURP", width: "50px" })
                .add({ data: "RFC", title: "RFC", width: "60px" })
                .add({ data: "MontoPrecalificado", title: "Monto Precalificado", width: "30px" })
                .add({ data: "MontoCredito", title: "Monto Credito", width: "30px" })
                .add({ data: "FechaCreacion", title: "Fecha Creción", width: "50px" })
                .add({ data: "Desarrollo", title: "Desarrollo", width: "100px" })
                .add({ data: "TipoPersona.Nombre", title: "Tipo de Persona", width: "40px" })
                .add({ data: "FechaNacimiento", title: "Fecha de Nacimiento", width: "50px" })
                .add({ data: "CreadoPor.Nombre", title: "Creado Por", width: "200px" })
                .add({ data: "EstadoOrigen.Nombre", title: "Estado de Origen", width: "100px" })
                .add({ data: "Genero.Nombre", title: "Genero", width: "50px" })
                .add({ data: "DomicilioCompleto", title: "Domicilio Completo", width: "200px" })
                .add({ data: "PuntoVenta.Nombre", title: "Punto de Venta", width: "200px" })
                .add({ data: "CampaniaPublicidad.Nombre", title: "Campaña de Publicidad", width: "100px" })
                .add({ data: "MedioPublicidad.Nombre", title: "Medio de Publicidad", width: "100px" })
                .add({ data: "Giro.Nombre", title: "Giro", width: "150px" })
                .add({ data: "ResidenciaActual.Nombre", title: "Residencial Actual", width: "50px" })
                .add({ data: "Estatus.Nombre", title: "Estatus", width: "50px" })
                .add({ data: "MotivoRechazo.Nombre", title: "Motivo de Rechazo", width: "50px" })
                .add({ data: "FechaAccion.Fecha", title: "Fecha de Acción", width: "70px" })
                .add({ data: "CreadoPor.Nombre", title: "Nombre Acción", width: "200px" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.EstatusBoletaProspeccion id="Estatus" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.AgentesDDL id="AgenteCaptura" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <ddl.AgentesDDL id="AgenteAsignado" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <ddl.AgentesDDL id="AgenteDescartada" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <ddl.DesarrollosDDL id="Desarrollo" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.Estados id="CiudadEstadoOrigen" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <input.CodigoPostal id={"CPMunicipio"} size={[12, 12, 3, 3]}/>
                    <ddl.TiposPersonaDDL id="TipoPersona" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} label={null} />
                    <DatePicker id="FechaNacInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaNacFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]}  />
                    <DatePicker id="FechaCreacionInicial" type="date" idForm={config.id} size={[12, 12, 3, 3]}  />
                    <DatePicker id="FechaCreacionFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]}  />
                    <ddl.GenerosDDL id="Genero" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.GirosDDL id="Giro" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <DatePicker id="FechaAsignacionInicio" type="date" idForm={config.id} size={[12, 12, 3, 3]}  />
                    <DatePicker id="FechaAsignacionFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]}  />
                    <DatePicker id="FechaDescarteInicio" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <DatePicker id="FechaDescarteFinal" type="date" idForm={config.id} size={[12, 12, 3, 3]} />
                    <ddl.TipoResidenciaDDL id="ActualmenteVive" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.PuntosVentaDDL id="PuntoVenta" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.MediosPublicidadDDL id="MedioPublicidad" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.CampaniaPublicidadDDL id="CampaniaPublicidad" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                    <ddl.MotivosRechazoBoletaProspeccion id="MotivosDescartada" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />

                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;

        };

    };

};
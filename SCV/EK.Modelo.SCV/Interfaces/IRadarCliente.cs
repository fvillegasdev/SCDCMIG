using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_radar_clientes")]
    public interface IRadarCliente
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_identificador_cc", true)]
        string plaza { get; set; }

        [m.Kontrol.Column("numcte")]
        int numcte { get; set; }

        [m.Kontrol.Column("fecha_construccion")]
        DateTime fecha_construccion { get; set; }

        [m.Kontrol.Column("fecha_entrega")]
        DateTime fecha_entrega { get; set; }

        [m.Kontrol.Column("fecha_firma")]
        DateTime fecha_firma { get; set; }

        [m.Kontrol.Column("fecha_escrituracion")]
        DateTime fecha_escrituracion { get; set; }


        [m.Kontrol.Column("ubicacion_cte")]
        string ubicacion { get; set; }

        //[m.Kontrol.Column()]
        int incidenciasTotales { get; set; }
        
        int incidenciasAbiertas { get; set; }

        List<EK.Modelo.SCV.Interfaces.IReporteFallaDetalle> resumenIncidencias { get; set; }

       // [m.Kontrol.Column("problema")]
        string resumenIncidenciasString { get; set; }

        [m.Kontrol.Column("problema")]
        string Problema { get; set; }

        [m.Kontrol.Column("estatus_cve")]
        string Estatus_cve { get; set; }
        new string Estatus { get; set; }

        [m.Kontrol.Column("observaciones")]
        string Observaciones { get; set; }

        [m.Kontrol.Column("IdUsuario")]
        int IdUsuario { get; set; }

        string cliente { get; set; }
        string PlazaNom { get; set; }
        string nom_frac { get; set; }

        [m.Kontrol.Column("id_cve_fracc")]
        string id_cve_fracc { get; set; }
        string resumen { get; set; }
    }
}

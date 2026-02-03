#if RUBA
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_contratista_lote")]
    public interface IContratistaUbicacion : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Descripcion", true)]
        string Descripcion { get; set; }

        [m.Kontrol.Column("id_identificador_cc")]
        string IdPlaza { get; set; }
        m.SCV.Interfaces.IPlaza Plaza { get; set; }

        [m.Kontrol.Column("id_cve_fracc")]
        string IdDesarrollo { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }

        [m.Kontrol.Column("clave_contratista")]
        int IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        [m.Kontrol.Column("lote_id")]
        int IdUbicacion { get; set; }
        m.SCV.Interfaces.IUbicaciones Ubicacion { get; set; }

        [m.Kontrol.Column("default_rep_fallas")]
        string ContratistaDefault { get; set; }

        [m.Kontrol.Column("clave_tipo_contratista")]
        int IdTipoContratista { get; set; }
        m.SCV.Interfaces.ITipoContratista TipoContratista { get; set; }

        [m.Kontrol.Column("fecha_captura")]
        DateTime? FechaCaptura { get; set; }

        List<m.SCV.Interfaces.IUbicaciones> Ubicaciones { get; set; }
        List<m.SCV.Interfaces.IContratistaUbicacion> Contratistas { get; set; }
    }
}
#endif
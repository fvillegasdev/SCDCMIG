using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_encuesta_satisfaccion")]
    public interface ISPVEncuestaSatisfaccionFija
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave",true)]
        new String Clave { get; set; }
        [m.Kontrol.Column("Nombre",true)]
        new String Nombre { get; set; }

        [m.Kontrol.Column("folio")]
        int? IdFolio { get; set; }

        [m.Kontrol.Column("clave_contratista")]
        int? IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        [m.Kontrol.Column("id_identificador_cc")]
        string IdPlaza { get; set; }

        [m.Kontrol.Column("fecha")]
        DateTime? Fecha { get; set; }

        [m.Kontrol.Column("fraccionamiento")]
        string DesarrolloClave { get; set; }
        m.SCV.Interfaces.IFraccionamientos Desarrollo { get; set; }

        [m.Kontrol.Column("P1")]
        int? P1 { get; set; }
        [m.Kontrol.Column("P2")]
        int? P2 { get; set; }
        [m.Kontrol.Column("P3")]
        int? P3 { get; set; }
        [m.Kontrol.Column("P4")]
        int? P4 { get; set; }
        [m.Kontrol.Column("P5")]
        int? P5 { get; set; }
        [m.Kontrol.Column("P6")]
        int? P6 { get; set; }
        [m.Kontrol.Column("P7")]
        int? P7 { get; set; }
        [m.Kontrol.Column("P8")]
        int? P8 { get; set; }
        [m.Kontrol.Column("P9")]
        int? P9 { get; set; }


        [m.Kontrol.Column("total_tipo_atencion")]
        decimal? TotalTipoAtencion { get; set; }
        [m.Kontrol.Column("total_puntualidad")]
        decimal? TotalPuntualidad { get; set; }
        [m.Kontrol.Column("total_limpieza")]
        decimal? TotalLimpieza { get; set; }
        [m.Kontrol.Column("total_calidad")]
        decimal? TotalCalidad { get; set; }

        [m.Kontrol.Column("indice_satisfaccion")]
        decimal? IndiceSatisfaccion { get; set; }

        [m.Kontrol.Column("no_se_encontro")]
        bool NoEncontrado { get; set; }
        [m.Kontrol.Column("no_quizo_contestar")]
        bool NoContesto { get; set; }

        [m.Kontrol.Column("encuesta_cerrada")]
        bool Cerrada { get; set; }

        [m.Kontrol.Column("obs_encuesta")]
        string Observacion  { get; set; }


       
    }
}
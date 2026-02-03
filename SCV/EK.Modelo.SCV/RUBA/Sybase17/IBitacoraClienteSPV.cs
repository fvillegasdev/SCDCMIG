using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_reporte_bitacora")]
    public interface IBitacoraClienteSPV : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("folio_reporte")]
        int? IdFolio { get; set; }
        //
        [m.Kontrol.Column("partida")]
        int? IdPartida { get; set; }
        //
        [m.Kontrol.Column("fecha")]
        DateTime? Fecha { get; set; }
        //
        [m.Kontrol.Column("num_usuario_crea")]
        int? IdUsuarioCreador { get; set; }
        //
        [m.Kontrol.Column("descripcion")]
        string Descripcion { get; set; }
        //
        [m.Kontrol.Column("fecha_hora_compromiso")]
        DateTime? FechaHoraCompromiso { get; set; }
        //
        [m.Kontrol.Column("num_usuario_compromiso")]
        int? IdUsuarioCompromiso { get; set; }
        //
        [m.Kontrol.Column("realizado")]
        bool? Realizado { get; set; }
        //
        [m.Kontrol.Column("fecha_realizado")]
        DateTime? FechaRealizado { get; set; }
        //
        [m.Kontrol.Column("comentarios")]
        string Comentarios { get; set; }
        //
        [m.Kontrol.Column("numcte")]
        int? IdCliente { get; set; }

        [m.Kontrol.Column("verificado")]
        bool? verificado { get; set; }

        [m.Kontrol.Column("alertaFija")]
        bool? alertaFija { get; set; }
        List<m.Kontrol.Interfaces.IKontrolFile> Evidencias { get; set; }
    }
}
using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("uvw_spv_encuesta_satisfaccion_fija")]
    public interface IReporteEncuestaSatisfaccion : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdFolio { get; set; }
        int IdContratista { get; set; }
        string NombreContratista { get; set; }
        string NombreFraccionamiento { get; set; }
        string IdPlaza { get; set; }
        string Plaza { get; set; }
        DateTime Fecha { get; set; }
        string DesarrolloClave { get; set; }
        int? P1 { get; set; }
        int? P2 { get; set; }
        int? P3 { get; set; }
        int? P4 { get; set; }
        int? P5 { get; set; }
        int? P6 { get; set; }
        int? P7 { get; set; }
        int? P8 { get; set; }
        int? P9 { get; set; }
        decimal? TotalTipoAtencion { get; set; }
        decimal? TotalPuntualidad { get; set; }
        decimal? TotalLimpieza { get; set; }
        decimal? TotalCalidad { get; set; }
        decimal? IndiceSatisfaccion { get; set; }
        decimal? TotalEncuentas { get; set; }
        decimal? TotalReportes { get; set; }
        bool NoEncontrado { get; set; }
        bool NoContesto { get; set; }
        bool Cerrada { get; set; }
        string Observacion { get; set; }
        string NumCliente { get; set; }
        string NombreCliente { get; set; }
        string SuperManzana { get; set; }
        string Manzana { get; set; }
        string Lote { get; set; }
        string Interior { get; set; }
        string Exterior { get; set; }
        string Calle { get; set; }
        bool Faltante { get; set; }
    }
}

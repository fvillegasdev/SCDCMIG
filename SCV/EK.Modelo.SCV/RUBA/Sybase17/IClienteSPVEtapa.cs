using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IClienteSPVEtapa
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdCliente { get; set; }
        int IdRelacion { get; set; }
        int? Orden { get; set; }
        int IdEtapa { get; set; }
        DateTime? FechaInicio { get; set; }
        DateTime? FechaLiberacion { get; set; }
        DateTime? FechaRechazado { get; set; }
        string Observaciones { get; set; }
        int? IdAutorizador { get; set; }
        int MesesTranscurridos { get; set; }
        int MesesTranscurridosEntrega { get; set; }
        int IdEsquema { get; set; }
        m.SCV.Interfaces.IEsquema Esquema { get; set; }
    }
}
using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("uvw_SCV_Reporte_Analitico_Prospectos")]
    public interface IReporteAnaliticoProspectos
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        m.Kontrol.Interfaces.IItemGeneral Agente { get; set; }

        ICliente ProspectoCliente { get; set; }

        IDesarrollos Desarrollo { get; set; }

    }
}
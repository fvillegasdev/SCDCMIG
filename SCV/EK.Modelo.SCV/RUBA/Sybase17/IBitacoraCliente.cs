using System;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    public interface IBitacoraCliente
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int? IdContratista { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }

        int? IdEtapa { get; set; }
        m.SCV.Interfaces.IClienteSPVEtapa Etapa { get; set; }

        bool Entregado { get; set; }
        bool HasEquipamiento { get; set; }

        DateTime? TerminoGarantia { get; set; }

        int? IdEsquema { get; set; }
        m.SCV.Interfaces.IEsquema Esquema { get; set; }
    }
}
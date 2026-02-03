using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IReestructuraVenta
        : IBaseKontrolMM
    {
        string Motivo { get; set; }
        decimal? ImporteMonedaNuevo { get; set; }
        decimal? ImporteNuevo { get; set; }
        int IdVenta { get; set; }
        int VersionVenta { get; set; }
        int IdExpediente { get; set; }
        int Numero { get; set; }
        string Status { get; set; }
        DateTime Vencimiento { get; set; }
        IItemGeneral TipoAbono { get; set; }
        string ReferenciaInteres { get; set; }
        string ReferenciaCapital { get; set; }

    }
}

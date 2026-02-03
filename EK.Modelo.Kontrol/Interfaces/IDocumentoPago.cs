using System;

using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IDocumentoPago
        : IBaseKontrolMM
    {
        int Numero { get; set; }
        DateTime Vencimiento { get; set; }
        IItemGeneral TipoAbono { get; set; }
        string ReferenciaCapital { get; set; }
        string ReferenciaInteres { get; set; }
        int IdEstatusDoc { get; set; }
        string EstatusDoc { get; set; }
        string Status { get; set; }
    }
}
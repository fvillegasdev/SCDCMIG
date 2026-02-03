using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IReestructuraPPDocumento
        : IBaseKontrol
    {
        decimal Pagado { get; set; }
        int VersionPP { get; set; }
        IDocumentoPago Documento { get; set; }
    }
}


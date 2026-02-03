using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IConsultaViviendaEntregablePersonalEntregaViv
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Plaza { get; set; }

    }
}


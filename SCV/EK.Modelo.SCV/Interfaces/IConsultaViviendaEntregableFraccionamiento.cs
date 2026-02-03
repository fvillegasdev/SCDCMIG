using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IConsultaViviendaEntregableFraccionamiento
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        string id_cve_fracc { get; set; }

        [m.Kontrol.Column()]
        string nom_fracc { get; set; }

    }
}


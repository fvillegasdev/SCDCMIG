using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{


    public interface IConsultaViviendaEntregableFracc: IBaseKontrol
    {

        [m.Kontrol.Column()]
        string Id { get; set; }
    }
}


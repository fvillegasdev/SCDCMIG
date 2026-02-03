using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IConsultaViviendaEntregableRezagosEntrega
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        string clave { get; set; }

        [m.Kontrol.Column()]
        string descripcion { get; set; }

    }
}


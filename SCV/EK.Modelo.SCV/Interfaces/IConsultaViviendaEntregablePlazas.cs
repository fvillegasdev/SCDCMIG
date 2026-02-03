using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IConsultaViviendaEntregablePlazas
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("ID", true)]
        new string ID { get; set; }
        int Cantidad { get; set; }
        //[m.Kontrol.Column()]
        //string id_identificador { get; set; }

        //[m.Kontrol.Column()]
        //string descripcion { get; set; }

    }
}


using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    public interface IMotivosReprogramacion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("ID", true)]
        new string ID { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        string Descripcion{ get; set; }
        //[m.Kontrol.Column()]
        //string id_identificador { get; set; }

        //[m.Kontrol.Column()]
        //string descripcion { get; set; }

    }

}

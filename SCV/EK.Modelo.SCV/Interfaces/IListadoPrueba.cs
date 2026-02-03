using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("TablaPrueba")]
    public interface IListadoPrueba : IBaseKontrol

    {
        //int Id { get; set; }

        //string Nombre { get; set; }

        [m.Kontrol.Column()]
        int Edad { get; set; }

        [m.Kontrol.Column()]
        float Estatura { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
    }
}

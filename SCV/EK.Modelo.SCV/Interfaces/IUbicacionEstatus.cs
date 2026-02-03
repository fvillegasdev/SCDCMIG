using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCO.Interfaces;
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ubicacionesEstatus")]

    public interface IUbicacionEstatus
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdNaturaleza { get; set; }


        [m.Kontrol.Column()]
        new bool Sistema { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Naturaleza{ get; set; }

    }

}


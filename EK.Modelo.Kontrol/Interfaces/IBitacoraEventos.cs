using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("BitacoraEventos")]
    public interface IBitacoraEventos
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        string Icono { get; set; }

        [m.Kontrol.Column()]
        string Color { get; set; }

        [m.Kontrol.Column()]
        int IdOrigen { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Origen { get; set; }

    }
}
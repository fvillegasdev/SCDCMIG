using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("Puestos")]
    public interface IPuesto
        : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int Rango { get; set; }

        List<ICategoria> Categorias { get; set; }
    }
}

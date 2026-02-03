using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_fraccionamiento_cat")]
    public interface ISmFraccionamientoCat : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_identificador_cc")]
        string id_identificador { get; set; }

        [m.Kontrol.Column("clave_cat")]
        int IdCat { get; set; }

        [m.Kontrol.Column("clave_fraccionamiento")]
        string ClaveFrac { get; set; }
    }
}

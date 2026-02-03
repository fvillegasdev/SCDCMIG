using System;
using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ListaPreciosExtensionVigencia")]
    public interface ILPExtensionVigencia
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        DateTime VigenteHasta { get; set; }

        [m.Kontrol.Column()]
        int IdVersion { get; set; }
    }
}
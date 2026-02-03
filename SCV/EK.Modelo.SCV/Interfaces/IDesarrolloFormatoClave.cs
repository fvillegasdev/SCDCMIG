using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_FormatoClave")]
    public interface IDesarrolloFormatoClave
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }
        [m.Kontrol.Column()]
        int Longitud { get; set; }
    }
}

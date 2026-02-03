using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_Prototipos")]
    public interface IDesarrolloPrototipo 
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdPrototipo { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }

        [m.Kontrol.Column()]
        decimal PrecioBase { get; set; }

        [m.Kontrol.Column()]
        DateTime? Vigencia { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Prototipo { get; set; }
        List<IEntidadCaracteristica> CaracteristicasPrototipos { get; set; }



    }
}
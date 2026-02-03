using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_TipoComercializacion")]
    public interface IDesarrolloTiposComercializacion
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdTipoComercializacion { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        int? IdPlantillaMail { get; set; }

        m.SCV.Interfaces.ITipoComercializacion TiposComercializacion { get; set; }
        m.Kontrol.Interfaces.IPlantillasMails PlantillaMail { get; set; }

        List<IEntidadCaracteristica> CaracteristicasTiposComercializacion { get; set; }
    }
}
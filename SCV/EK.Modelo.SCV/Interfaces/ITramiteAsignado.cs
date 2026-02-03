using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Tramite_Asignado")]
    public interface ITramiteAsignado
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column()]
        int? IdPrototipo { get; set; }
        m.SCV.Interfaces.IPrototipo Prototipo { get; set; }

        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }

        List<ITramiteAsignadoConfiguracion> Tramites { get; set; }
    }
}

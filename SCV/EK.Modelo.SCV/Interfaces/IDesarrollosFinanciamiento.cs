using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_Financiamientos")]

    public interface IDesarrollosFinanciamiento : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdFinanciamiento { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }

        ITipoFinanciamiento Financiamiento { get; set; }
        List<IEntidadCaracteristica> CaracteristicasFinanciamiento { get; set; }

    }
}
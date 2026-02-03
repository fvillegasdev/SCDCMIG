using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_Esquemas")]

    public interface IDesarrolloEsquema : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdEsquema { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }

        IEsquema Esquema { get; set; }
        List<IEntidadCaracteristica> CaracteristicasEsquema{ get; set; }
        
    }
}
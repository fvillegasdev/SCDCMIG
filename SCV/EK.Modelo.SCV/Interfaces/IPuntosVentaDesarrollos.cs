using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_PuntosVenta_Desarrollos")]

    public interface IPuntosVentaDesarrollos : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdPuntoVenta { get; set; }

        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }

        IDesarrollos Desarrollo { get; set; }
        //List<IEntidadCaracteristica> CaracteristicasFinanciamiento { get; set; }

    }
}
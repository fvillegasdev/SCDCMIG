using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mkontrol = EK.Modelo.Kontrol;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Forecast")]
    public interface IForecast
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }

        [m.Kontrol.Column()]
        int IdIndicador { get; set; }


        [m.Kontrol.Column()]
        int IdTipoEntidad { get; set; }



        [m.Kontrol.Column()]
        int Mes { get; set; }


        [m.Kontrol.Column()]
        int Valor { get; set; }


        [m.Kontrol.Column()]
        int Year { get; set; }


    }
}

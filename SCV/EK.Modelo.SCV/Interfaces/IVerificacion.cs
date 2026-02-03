using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Verificacion")]
    public interface IVerificacion: m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


        [m.Kontrol.Column()]
        int IdOrigen { get; set; }


        [m.Kontrol.Column()]
        int IdEntidad { get; set; }


        [m.Kontrol.Column()]
        int Codigo { get; set; }



        [m.Kontrol.Column()]
        int Vigencia { get; set; }


        m.Kontrol.Interfaces.IItemGeneral Entidad { get; set; }

    }
}

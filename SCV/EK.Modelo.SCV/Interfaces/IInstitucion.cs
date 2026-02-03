using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    [m.Kontrol.Table("scv_Instituciones")]
    public interface IInstitucion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        //[m.Kontrol.Column("Nombre", true)]
        //new string Nombre { get; set; }
        //[m.Kontrol.Column("Clave", true)]
        //new string Clave { get; set; }
        decimal MontoCredito { get; set; }
        string Comentarios { get; set; }

        //List<IInstitucionEsquema> Esquemas { get; set; }
    }
}




//using EK.Modelo.Kontrol.Interfaces;
//using System.Collections.Generic;

//namespace EK.Modelo.SCV.Interfaces
//{
//    public interface IInstitucion : IBaseKontrol
//    {
//        string Descripcion { get; set; }

//        string Clave { get; set; }

//        List<IInstitucionEsquema> Esquemas { get; set; }
//    }
//}

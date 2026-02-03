using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{

    [m.Kontrol.Table("scv_Procesos")]

    public interface IProceso
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdAccionProceso { get; set; }

        Kontrol.Interfaces.IItemGeneral AccionProceso { get; set; }

        [m.Kontrol.Column()]
        string Responsable { get; set; }

        [m.Kontrol.Column()]
        string Evento { get; set; }

        [m.Kontrol.Column()]
        int? IdOpcion { get; set; }


        [m.Kontrol.Column()]
        int? IdTipoProceso { get; set; }


        [m.Kontrol.Column()]
         new bool? Sistema { get; set; }


        m.Kontrol.Interfaces.IOpcion Opcion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoProceso { get; set; }

    }
}


//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.SCV.Interfaces
//{
//    public interface IProceso : IBaseKontrol
//    {
//        // string Clave { get; set; }
//        // string Nombre { get; set; }
//        int IdAccionProceso { get; set; }
//        IItemGeneral AccionProceso { get; set; }
//        string Responsable { get; set; }
//        string Evento { get; set; }
//    }
//}

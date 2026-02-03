#if RUBA
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_Ubicaciones_Falla")]
    public interface IUbicacionesFalla
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        string Descripcion { get; set; }

        [m.Kontrol.Column("Descripcion")]
        new string Nombre { get; set; }
   
        m.Kontrol.Interfaces.IItemGeneral UsoFalla { get; set; }

        [m.Kontrol.Column()]
        int? IdUsoFalla { get; set; }

        int? IdUbicacionFalla { get; set; }
    }
}
#endif
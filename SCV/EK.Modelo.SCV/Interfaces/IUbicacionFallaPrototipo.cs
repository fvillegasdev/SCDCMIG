using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_UbicacionesFalla_Prototipos")]
    public interface IUbicacionFallaPrototipo : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        int IdPrototipo { get; set; }
        [m.Kontrol.Column()]
        int IdUbicacionFalla { get; set; }
        
        IUbicacionesFalla UbicacionFalla { get; set; }
    }
}

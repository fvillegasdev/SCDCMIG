using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEntidadCaracteristica : mk.Interfaces.IBaseKontrol
    {
        int IdEntidad { get; set; }
        bool VentaOpcional { get; set; }
        decimal Importe { get; set; }
        int IdCaracteristica { get; set; }
        int? IdTipoUbicacion { get; set; }
        int IdTipoEntidad { get; set; }
        string TipoClave { get; set; }
        mk.Interfaces.IItemGeneral TipoEntidad { get; set; }
        m.Interfaces.ICaracteristicaAdicional Caracteristica { get; set; }
        mk.Interfaces.IItemGeneral TipoUbicacion { get; set; }
    }
}
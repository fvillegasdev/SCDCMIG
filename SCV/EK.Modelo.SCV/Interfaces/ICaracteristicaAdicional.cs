using m = EK.Modelo;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_caracteristicas_adc")]

    public interface ICaracteristicaAdicional : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdTipoCaracteristica { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoCaracteristica { get; set; }

        [m.Kontrol.Column()]
        int IdTipoEntidad { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoEntidad { get; set; }

        [m.Kontrol.Column()]
        bool? Escriturado { get; set; }
    }
}

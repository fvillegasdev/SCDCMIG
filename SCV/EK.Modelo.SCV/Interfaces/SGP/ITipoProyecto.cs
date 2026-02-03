using m = EK.Modelo;

namespace EK.Modelo.SGP.Interfaces
{
    [m.Kontrol.Table("sgp_TipoProyecto")]

    public interface ITipoProyecto 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        //[m.Kontrol.Column()]
        //string RFC { get; set; }
    }
}

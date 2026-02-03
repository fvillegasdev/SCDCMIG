using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("svc_causas_incidencia")]
    public interface ICausaIncidencia
        : m.Kontrol.Interfaces.IBaseKontrol
    {
    
        m.SCV.Interfaces.IOrigenFalla OrigenFalla { get; set; }
    }
}
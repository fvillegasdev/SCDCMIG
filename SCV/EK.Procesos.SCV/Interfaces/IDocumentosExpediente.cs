using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("DocumentosExpediente")]
    public interface IDocumentosExpediente : p.Kontrol.Interfaces.IBaseProceso
    {
    }
}
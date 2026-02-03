using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDocumentosExpediente
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDocumentoExpediente>
    {
    }
}
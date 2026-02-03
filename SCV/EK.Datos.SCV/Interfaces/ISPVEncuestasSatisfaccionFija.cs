using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ISPVEncuestasSatisfaccionFija
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija>
    {
        Task<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija> GetByFolio(int idFolio);
    }
}
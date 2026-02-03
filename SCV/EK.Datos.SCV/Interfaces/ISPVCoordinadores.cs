using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface ISPVCoordinadores
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ISPVCoordinadores>
    {
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getCoordinadores(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetCatsFromPlaza(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetCatsSupFromPlaza(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getResponsablesConstruccion(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>> getSupervisores(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccionamientosCat(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetSupervisoresDisponiblesCAT(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetSupervisoresAsignadosCAT(Dictionary<string, object> parametros);
    }
}

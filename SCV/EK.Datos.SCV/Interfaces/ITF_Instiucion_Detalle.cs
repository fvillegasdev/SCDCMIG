using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface ITF_Institucion_Detalle
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IInstitucionDetalle>
    {
        Task<List<m.SCV.Interfaces.IInstitucionDetalle>> GetInstitucionDetalle(Dictionary<string, object> parametros);
    }
}
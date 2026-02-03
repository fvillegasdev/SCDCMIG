using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IListaPreciosAvaluo
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IListaPreciosAvaluo>
    {
       Task<m.SCV.Interfaces.IListaPreciosAvaluo> obtenerValorAvaluoUbicacion(Dictionary<string, object> parametros);
    }
}
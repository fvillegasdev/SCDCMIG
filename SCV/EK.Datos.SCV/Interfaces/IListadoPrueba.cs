using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IListadoPrueba
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IListadoPrueba>
    {
        //Task<List<m.SCV.Interfaces.IListadoPrueba>> GetPruebas(Dictionary<string, object> parametros);
        
    }
}

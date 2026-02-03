using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IFallasAreasComunes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IFallasAreasComunes>
    {
        Task<object[]> GetCatalogo(Dictionary<string, object> parametros);
        Task<object[]> CrudCatalogoFallaAreaComun(Dictionary<string, object> parametros);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces.PlantillasMeta
{
    public interface IPlantillaMeta : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.PlantillasMeta.IPlantillaMeta>
    {
        Task<object> SaveEncuesta(Dictionary<string, object> parametros);
        Task<object> SavePlantilla(Dictionary<string, object> parametros);
        Task<object> SavePantalla(Dictionary<string, object> parametros);
        Task<object> SavePregunta(Dictionary<string, object> parametros);
        Task<object> SaveOpcion(Dictionary<string, object> parametros);

    }
}

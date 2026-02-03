using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using p = EK.Procesos;
using m = EK.Modelo;
namespace EK.Procesos.SCV.Interfaces.PlantillaMeta
{
    [m.Kontrol.KontrolName("PlantillasMeta")]
    public interface IPlantillaMeta : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.PlantillasMeta.IPlantillaMeta>
    {
        Task<object> savePlantilla(Dictionary<string, object> parametros);
        Task<object> saveEncuesta(Dictionary<string, object> parametros);
        Task<object> savePantallaEncuesta(Dictionary<string, object> parametros);
        Task<object> savePreguntaEncuesta(Dictionary<string, object> parametros);
        Task<object> saveOpcionPregunta(Dictionary<string, object> parametros);

    }
}

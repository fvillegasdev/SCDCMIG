using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("PlantillasLeads")]
    public interface IPlantillasLeads
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.Kontrol.Interfaces.IPlantillasLeads>
    {
    }
}
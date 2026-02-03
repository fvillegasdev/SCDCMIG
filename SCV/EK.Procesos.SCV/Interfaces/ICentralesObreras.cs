using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("CentralesObreras")]
    public interface ICentralesObreras
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ICentralObrera>
    {
        //Task<object[]> GetAll(int activos);
        //Task<miSCV.ICentralObrera> GetById(int id);
        //Task<miSCV.ICentralObrera> Save(miSCV.ICentralObrera centralObrera);
        //Task Log(miSCV.ICentralObrera obj);
    }
}

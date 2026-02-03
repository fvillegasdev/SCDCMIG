using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("MotivosCancelacion")]
    public interface IMotivosCancelacion 
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IMotivosCancelacion>
    {
        //Task<object[]> GetAll(int id, int activos);

        //Task<miSCV.IMotivosCancelacion> GetById(int id);

        //Task<miSCV.IMotivosCancelacion> Save(miSCV.IMotivosCancelacion item);

        //Task<object[]> GetHistory(int ID, int top);

        //Task<object[]> GetHistory(int top);
        Task<object> GetMotivosCancelacion(Dictionary<string,object> parametros);
    }
}

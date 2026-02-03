using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Notarios")]
    public interface INotarios 
         : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.INotario>
    {
        //Task<object[]> GetAll(int id, int activos);

        //Task<miSCV.INotario> GetById(int id);

        //Task<miSCV.INotario> Save(miSCV.INotario notario);

        //Task<object[]> GetHistory(int ID, int top);

        //Task<object[]> GetHistory(int top);

        Task<object> GetNotarios(Dictionary<string,object>parametros);

    }
}

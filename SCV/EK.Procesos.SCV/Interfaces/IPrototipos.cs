using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Prototipos")]
    public interface IPrototipo
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPrototipo>
    {
        Task<object> GetByPrototipoId(int id);
        Task<List<m.SCV.Interfaces.IPrototipo>> GetSPVPrototiposClasificadores(Dictionary<string, object> parametros);
    }
    //public interface IPrototipos : Kontrol.Interfaces.IBaseProceso
    //{
    //    Task<object[]> GetAll(int activos, bool kv);

    //    Task<miSCV.IPrototipo> GetById(int id);

    //    Task<miSCV.IPrototipo> Save(miSCV.IPrototipo item);

    //    Task Log(miSCV.IPrototipo obj);
    //}
}

using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPrototipos
      : dki.IDAOBaseGeneric<m.SCV.Interfaces.IPrototipo>
    {
        Task<object> GetByPrototipoId(int id);
    }
    //public interface IPrototipos : EK.Datos.Kontrol.Interfaces.IDAOBase
    //{
    //    Task<object[]> GetAll(int activos, bool kv);

    //    Task<miSCV.IPrototipo> GetById(int id);

    //    Task<int> Save(miSCV.IPrototipo model);
    //}
}

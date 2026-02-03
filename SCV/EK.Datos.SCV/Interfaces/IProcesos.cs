using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IProcesos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IProceso>
    {
        //Task<object[]> GetAll(int activos);

        //Task<miSCV.IProceso> GetById(int id);

        //Task<int> Save(miSCV.IProceso model);

        Task<object> GetAllProcesos(Dictionary<string, object> parametros);
    }
}


//using System.Threading.Tasks;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Interfaces
//{
//    public interface IProcesos : EK.Datos.Kontrol.Interfaces.IDAOBase
//    {
//        Task<object[]> GetAll(int activos);

//        Task<miSCV.IProceso> GetById(int id);

//        Task<int> Save(miSCV.IProceso model);
//    }
//}

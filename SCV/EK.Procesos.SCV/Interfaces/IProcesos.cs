using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Procesos")]

    public interface IProcesos
        : p.Kontrol.Interfaces.IBaseProceso
    {


        Task<object> GetProcesos(Dictionary<string, object> parametros);
    }
}





//using System.Threading.Tasks;
//using mKontrol = EK.Modelo.Kontrol;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Procesos.SCV.Interfaces
//{
//    [mKontrol.KontrolName("SCVProcesos")]
//    public interface IProcesos : Kontrol.Interfaces.IBaseProceso
//    {
//        Task<object[]> GetAll(int activos);
//        Task<miSCV.IProceso> GetById(int id);
//        Task<miSCV.IProceso> Save(miSCV.IProceso item);
//        Task Log(miSCV.IProceso obj);
//    }
//}

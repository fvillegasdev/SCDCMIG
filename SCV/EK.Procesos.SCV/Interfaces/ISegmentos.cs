using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Segmentos")]

    public interface ISegmentos
        : p.Kontrol.Interfaces.IBaseProceso
    {

    }
}
//using System.Threading.Tasks;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Procesos.SCV.Interfaces
//{
//    [mKontrol.KontrolName("Segmentos")]
//    public interface ISegmentos : Kontrol.Interfaces.IBaseProceso
//    {
//        object[] GetAll(int id, int activos);

//        miSCV.ISegmento GetById(int id);

//        Task<miSCV.ISegmento> Save(string item);

//        Task<object[]> GetHistory(int ID, int top);

//        Task<object[]> GetHistory(int top);
//    }
//}

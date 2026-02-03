//using System.Collections.Generic;
//using System.Threading.Tasks;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Procesos.SCV.Interfaces
//{
//    [mKontrol.KontrolName("Ubicaciones")]
//    public interface IUbicaciones : Kontrol.Interfaces.IBaseProceso
//    {
//        Task<object[]> GetAll(int id, int disponibles);
//        Task<miSCV.IUbicaciones> GetById(int id);
//        Task<miSCV.IUbicaciones> Save(miSCV.IUbicaciones ubicacion);
//        Task Log(miSCV.IUbicaciones obj);
//        Task<List<miSCV.IUbicaciones>> Search(int idDesarrollo, string claveEstatus, string parametro);
//        Task<miSCV.IUbicaciones> ActualizaEstatusUbicacion(int idUbicacion, string claveEstatus);
//    }
//}
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;

using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Ubicaciones")]

    public interface IUbicaciones
        : p.Kontrol.Interfaces.IBaseProceso
    {
        //Task<object[]> GetAll(int id, int disponibles);
        Task<m.SCV.Interfaces.IUbicaciones> GetById(int IdUbicacion);
        Task<object> GetUbicacionesGIS(int idDesarrollo);
        //Task<miSCV.IUbicaciones> Save(miSCV.IUbicaciones ubicacion);
        //Task Log(miSCV.IUbicaciones obj);
        // Task<List<miSCV.IUbicaciones>> Search(int idDesarrollo, string claveEstatus, string parametro);
        Task ActualizaClaves(int idDesarrollo);
        Task<m.SCV.Interfaces.IUbicaciones> ActualizaEstatusUbicacion(int idUbicacion, string claveEstatus);
        Task<bool> ActualizaEstatusUbicacion(int idUbicacion, bool idEstatusUbicacion);

        Task<object> GetUbicacion(Dictionary<string, object> parametros);

        Task<bool> UpdateStatusLocation(int idUbicacion, int? idEstatusDeUbicacion, string claveEstatus="");
    }
}
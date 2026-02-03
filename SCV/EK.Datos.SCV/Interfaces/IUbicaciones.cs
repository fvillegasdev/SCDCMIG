//using System.Collections.Generic;
//using System.Threading.Tasks;

//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Interfaces
//{
//    public interface IUbicaciones : EK.Datos.Kontrol.Interfaces.IDAOBase
//    {
//        Task<object[]> GetAll(int id, int disponibles);
//        Task<miSCV.IUbicaciones> GetById(int id);
//        Task<List<miSCV.IUbicaciones>> Search(int idDesarrollo, string claveEstatus, string parametro);
//        Task<int> Save(miSCV.IUbicaciones model);
//        Task<int> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus);
//    }
//}
using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IUbicaciones
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IUbicaciones>
    {
          Task<int> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus);
          Task<object> GetUbicacion(Dictionary<string, object> parametros);
          Task<object> GetConsultaUbicaciones(Dictionary<string, object> parametros);
          Task<object> GetUbicacionesEspecial(Dictionary<string, object> parametros);
          Task<int> saveRelContratistaLote(Dictionary<string, object> parametros);

    }
}

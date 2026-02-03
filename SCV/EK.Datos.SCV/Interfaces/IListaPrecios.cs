using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IListaPrecios
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IListaPrecios>
    {
        //Task<List<m.SCV.Interfaces.IListaPrecios>> GetAllListaPrecios(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IListaPrecios> GetByUbicacionId(Dictionary<string,object> parametros);
        Task<int>  Save(m.SCV.Interfaces.IListaPreciosVersiones item,int idVersionVigente);

    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using miSCV = EK.Modelo.SCV.Interfaces;


//namespace EK.Datos.SCV.Interfaces 
//{
//    public interface IListaPrecios : EK.Datos.Kontrol.Interfaces.IDAOBase
//    {
//        Task<List<miSCV.IListaPrecios>> GetAll(int activos);
//        Task<miSCV.IListaPrecios> GetById(int id);
//        Task<miSCV.IListaPrecios> GetByUbicacionId(int id);
//        Task<int> Save(miSCV.IListaPrecios item);
//        Task<List<miSCV.IListaPrecios>> Search(int? idDesarrollo, int? idPrototipo,
//            int? idEstatusUbicacion, int? idEstatusExpediente);
//    }
//}

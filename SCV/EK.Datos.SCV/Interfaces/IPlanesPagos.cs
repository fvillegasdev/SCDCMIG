using System.Collections.Generic;
using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPlanesPagos
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IPlanPagos>
    {
         Task<miSCV.IPlanPagosConceptoPago> GetListConceptosPagoById(int id);

        Task<List<miSCV.IPlanPagosConceptoPago>> GetConceptosPagoById(int id);

        Task<List<miSCV.IPlanPagosConfiguracion>> GetListConfiguracionById(Dictionary<string, object> parametros);

        Task<object> GetAllPlanesPagos(Dictionary<string, object> parametros);
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
//    public interface IPlanesPagos : EK.Datos.Kontrol.Interfaces.IDAOBase
//    {
//        Task<object[]> GetAll(int activos);
//        Task<object[]> GetByDesarrollo(int idDesarrollo);
//        Task<miSCV.IPlanPagos> GetById(int id);
//        Task<int> Save(miSCV.IPlanPagos model);
//        Task<List<miSCV.IPlanPagosConceptoPago>> GetConceptosPagoById(int id);
//        Task<int> SaveConceptosPago(int? IdPlanPagos, miSCV.IPlanPagosConceptoPago model);
//        Task<int> DeleteRelacion(int idRelacion);
//    }
//}

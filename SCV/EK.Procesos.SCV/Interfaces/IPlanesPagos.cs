using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using miSCV = EK.Modelo.SCV.Interfaces;
using System.Collections.Generic;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("PlanesPagos")]
    public interface IPlanesPagos
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IPlanPagos>
    {
         Task<miSCV.IPlanPagosConceptoPago> GetListConceptosPagoById(int id);

        Task<List<miSCV.IPlanPagosConceptoPago>> GetConceptosPagoById(int id);

        Task<object> GetPlanesPago(Dictionary<string,object> parametros);
    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Procesos.SCV.Interfaces
//{
//    [mKontrol.KontrolName("PlanesPagos")]
//    public interface IPlanesPagos : Kontrol.Interfaces.IBaseProceso
//    {
//        Task<object[]> GetAll(int activos);
//        Task<object[]> GetByDesarrollo(int idDesarrollo);
//        Task<miSCV.IPlanPagos> GetById(int id);
//        Task<miSCV.IPlanPagos> Save(miSCV.IPlanPagos item);
//        Task<List<miSCV.IPlanPagosConceptoPago>> GetConceptosPagoById(int id);
//        Task Log(miSCV.IPlanPagos obj);
//    }
//}

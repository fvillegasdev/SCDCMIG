using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
namespace EK.Datos.SCV.Interfaces
{
    public interface IClasificacionViviendaPendienteEntrega
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>
    {
        Task<List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>> GetViviendaPendienteEntrega(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>> ClasificadorSave(List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntregaParam> parametros);
        Task<object[]> GetReporteViviendaPE(Dictionary<string, object> parametros);
        Task<object[]> GetReporteViviendaPEPlaza(Dictionary<string, object> parametros);
        Task<object[]> GetReportePromedioDiasPlaza(Dictionary<string, object> parametros);
        Task<object[]> GetReportePromedioDiasVivienda(Dictionary<string, object> parametros);

    }
}

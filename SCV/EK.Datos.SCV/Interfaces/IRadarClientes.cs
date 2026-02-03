using System.Collections.Generic;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IRadarClientes
         : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IRadarCliente>
    {
       Task<m.SCV.Interfaces.IRadarCliente> GetDatosCliente(int Idcliente);
       Task <List<m.SCV.Interfaces.IReporteFallaDetalle>> GetTopIncidenciasCliente(int Idcliente);
        Task<int> SaveRadar(Dictionary<string, object> parametros);
        Task <List<m.SCV.Interfaces.IRadarCliente>> GetConsultaRadarClientes(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaRadarGeneral(Dictionary<string, object> parametros);
        Task<object[]> GetDatosFraccionamiento(Dictionary<string, object> parametros);
        Task<int> SaveRadarComunidad(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaRadarComunidad(Dictionary<string, object> parametros);
        Task<object[]> GetConsultaRadarComunidadGeneral(Dictionary<string, object> parametros);

    }
}

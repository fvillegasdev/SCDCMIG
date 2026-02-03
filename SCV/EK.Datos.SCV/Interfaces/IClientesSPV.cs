using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IClientesSPV
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IClientesSPV>
    {
        Task<m.SCV.Interfaces.IClienteSPVEtapa> GetEtapaEntrega(int idCliente);
        Task<m.SCV.Interfaces.IClienteSPVEtapa> GetEtapaActual(int idCliente);
        Task<List<m.SCV.Interfaces.IClientesSPV>> GetClientesSPV(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteML(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteEND(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClienteSPVEtapa>> GetEtapasExpediente(int idCliente);
        Task<List<m.Kontrol.Interfaces.IAgendaEntVivienda>> getBitacoraArchivosEntrega(int idCliente);
        Task<List<m.Kontrol.Interfaces.IClienteComentarios>> getBitacoraClientesComentarios(int idCliente);
        Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> getHistorialIncidencias(int idCliente);

        Task<m.SCV.Interfaces.IClientesSPV> SaveContacto(m.SCV.Interfaces.IClientesSPV cliente);
    }
}
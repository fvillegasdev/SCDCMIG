using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ScvClientes")]
    public interface IClientes
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.ICliente>
    {
        Task<List<m.SCV.Interfaces.IClienteReferencia>> GetReferencias(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClienteRefLaboral>> GetReferenciasLaborales(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClienteAsesores>> GetAsesoresClientes(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClienteDesarrollos>> GetDesarrollosClientes(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IClienteContactos>> GetContactoClientes(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IConyuge> GetConyugeById(int id);
        Task<m.SCV.Interfaces.ICliente> GetByClienteId(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.IClienteAdicional> GetInformacionAdicional(Dictionary<string, object> parametros);
        Task<string> GetRFC(Dictionary<string, object> parametros);
        Task<string> GetCURP(Dictionary<string, object> parametros);
        Task<object> GetClientWithoutFile(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.ICliente> UpdateProspecto(int idVenta, string claveEstatus);
        Task<object> GetByCliente(Dictionary<string, object> parametros);

        Task<m.SCV.Interfaces.IClienteContactos> GetContactoClienteById(int id);
    }
}

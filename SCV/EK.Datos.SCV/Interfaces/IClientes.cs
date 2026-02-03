using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IClientes
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ICliente>
    {
        Task<m.SCV.Interfaces.ICliente> GetByClienteId(Dictionary<string, object> parametros);
        Task<object> GetByCliente(Dictionary<string, object> parametros);


        Task<List<m.SCV.Interfaces.IClienteReferencia>> GetReferencias(int id);
        Task<List<m.SCV.Interfaces.IClienteRefLaboral>> GetReferenciasLaborales(int id);
        Task<List<m.SCV.Interfaces.IClienteAsesores>> GetAsesoresClientes(int id);

        Task<m.SCV.Interfaces.IConyuge> GetConyugeById(int id);
        Task<m.SCV.Interfaces.IClienteAdicional> GetAdicionalById(int id);

        //Task<int> SaveInformacionAdicional(int idCliente, m.SCV.Interfaces.IClienteAdicional model);
        //Task<int> SaveReferenciaPersonal(int idCliente, m.SCV.Interfaces.IClienteReferencia model);
        //Task<int> SaveReferenciaLaboral(int idCliente, m.SCV.Interfaces.IClienteRefLaboral model);
        //Task<int> DeleteReferenciaPersonal(int id);
        //Task<int> DeleteReferenciaLaboral(int id);

        Task<object> GetAllClientes(Dictionary<string, object> parametros);

        Task<object> GetClientWithoutFile(Dictionary<string, object> parametros);
    }
}
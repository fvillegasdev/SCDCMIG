using System.Collections.Generic;
using System.Threading.Tasks;
using mdl = EK.Modelo.SBO.Interfaces;
namespace EK.Procesos.SBO.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("CuentaBancaria")]
    public interface ICuentaBancaria : Kontrol.Interfaces.IBaseProceso
    {
        Task<object[]> GetAll();        

        Task<mdl.ICuentaBancaria> GetById(int id);
        Task<List<mdl.ICuentaBancaria>> GetByBank(int idBanco, int idCompania);

        Task<mdl.ICuentaBancaria> Save(string cb);

        //Task<object[]> GetCuentasClasificador(int idTipoClasificador, int idClasificador, int todos, int idBanco);

        Task<object[]> GetHistory(int ID, int top);

        Task<object[]> GetHistory(int top);

    }
}

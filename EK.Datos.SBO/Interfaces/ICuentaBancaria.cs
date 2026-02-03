using System.Collections.Generic;
using System.Threading.Tasks;
using im = EK.Modelo.SBO.Interfaces;

namespace EK.Datos.SBO.Interfaces
{
   public interface ICuentaBancaria
    {
        //Task<int> Save(im.ICuentaBancaria model);
        
        Task<object[]> GetAll();
        Task<im.ICuentaBancaria> GetById(int id);
        Task<List<im.ICuentaBancaria>> GetByBank(int idBanco, int idCompania);
        //Task<object[]> GetCuentasClasificador(int idTipoClasificador, int idClasificador, int idUsuario, int todos, int idBanco);
    }
}

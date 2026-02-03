using System.Collections.Generic;
using System.Threading.Tasks;
using im = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IConfigurarParametros
         : IDAOBaseGeneric<im.IConfigurarParametros>
    {
        object[] GetAll(int idmodulo, int idcompania, string ambito = null);

        object[] Get(int idmodulo, int idcompania);

        im.IConfigurarParametros Get(int ID);

        im.IConfigurarParametros[] Get(string nombre);

        List<im.IConfigurarParametros> GetMailParameters(int idcliente);
        Task<List<im.IConfigurarParametros>> GetAllConfiguracionParametros(Dictionary<string, object> parametros);

    }
}
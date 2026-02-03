using System.Collections.Generic;
using System.Threading.Tasks;
using mdl = EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("ConfigurarParametros")]
    public interface IConfigurarParametros : Kontrol.Interfaces.IBaseProceso
    {
        object[] GetAll(int idmodulo, int idcompania);

        object[] Get(int idmodulo, int idcompania);

        mdl.IConfigurarParametros GetById(int id);

        mdl.IConfigurarParametros[] Search(string nombre);

        List<mdl.IConfigurarParametros> GetMailParameters(int idcliente);

        //int SendEmail(string To, string Subject, string Body);
        Task<mdl.IConfigurarParametros> Save(string configurarparametro);

        Task<object[]> GetHistory(int top);
        Task<List<mdl.IConfigurarParametros>> getConfiguracionParametro(Dictionary<string, object> parametros);


        Task<object[]> GetHistory(int ID, int top);
    }
}
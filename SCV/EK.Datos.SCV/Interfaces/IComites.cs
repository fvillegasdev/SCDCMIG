using EK.Modelo.SCV.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IComites : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IComites>
    {
        Task<object[]> CrudComiteAreaGeografica(Dictionary<string, object> parametros);
        Task<int> SaveComiteInformacionComite(Dictionary<string, object> parametros);
        Task<IInformacionComite> GetComiteInformacionComiteById(Dictionary<string, object> parametros);
        Task<List<IIntegrantesInformacionComite>> GetIntegrantesComiteByIdComite(Dictionary<string, object> parametros);
        Task<object[]> GetComiteInformacionComite(Dictionary<string, object> parametros);
        Task<object[]> GetAreaGeografica(Dictionary<string, object> parametros);
        Task<object[]> DeleteIntegrantes(Dictionary<string, object> parametros);
        Task<object[]> DeleteInformacionComite(Dictionary<string, object> parametros);
        Task<int> SaveComiteReuniones(Dictionary<string, object> parametros);
        Task<object[]> SelectComites(Dictionary<string, object> parametros);
        Task<object[]> GetReuniones(Dictionary<string, object> parametros);
        Task<object[]> DeleteReuniones(Dictionary<string, object> parametros);
        Task<object[]> GetReunionesById(Dictionary<string, object> parametros);
        Task<List<IAgendaReuniones>> GetAgenda(Dictionary<string, object> parametros);
        Task<object[]> GetEvent(Dictionary<string, object> parametros); 
        Task<object[]> SaveRealizada(Dictionary<string, object> parametros); 
        Task<object[]> GetInfoGraficas(Dictionary<string, object> parametros);
    }
}

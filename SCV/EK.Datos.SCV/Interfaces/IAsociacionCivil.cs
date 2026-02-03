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
    public interface IAsociacionCivil : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IAsociacionCivil>
    {
        Task<int> SaveAsociacionCivil(Dictionary<string, object> parametros);
        Task<int> SaveIntegrantes(Dictionary<string, object> parametros);
        Task<object[]> GetAsociacionCivil(Dictionary<string, object> parametros);
        Task<object[]> GetCliente(Dictionary<string, object> parametros);
        Task<object[]> GetIntegrantesByAsociacionCivilId(Dictionary<string, object> parametros);
        Task<object[]> DeleteInfoAsociacionCivil(Dictionary<string, object> parametros);
        //Task<IInformacionComite> GetComiteByFraccionamiento(Dictionary<string, object> parametros);
        Task<object[]> GetComiteByFraccionamiento(Dictionary<string, object> parametros);
        Task<List<IIntegrantesInformacionComite>> GetComiteIntegrantesByFraccionamiento(Dictionary<string, object> parametros);
        Task<object[]> GetIntegrantesComite(Dictionary<string, object> parametros);
    }
}

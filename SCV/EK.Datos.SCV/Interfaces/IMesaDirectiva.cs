using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IMesaDirectiva : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IMesaDirectiva>
    {
        Task<int> SaveMesaDirectiva(Dictionary<string, object> parametros);
        Task<int> SaveIntegrantes(Dictionary<string, object> parametros);
        Task<object[]> GetMesaDirectiva(Dictionary<string, object> parametros);
        //Task<object[]> GetCliente(Dictionary<string, object> parametros);
        Task<object[]> GetIntegrantesByMesaDirectivaId(Dictionary<string, object> parametros);
        Task<object[]> DeleteInfoMesaDirectiva(Dictionary<string, object> parametros);
    }
}

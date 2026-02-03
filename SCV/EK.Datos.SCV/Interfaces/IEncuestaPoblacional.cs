using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IEncuestaPoblacional : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IEncuestaPoblacional>
    {
        Task<object[]> GetEncuestaXFraccionamientoLote(Dictionary<string, object> parametros);
        Task<object[]> SaveSurvay(Dictionary<string, object> parametros);
        Task<object[]> GetTipoEncuesta(Dictionary<string, object> parametros);
        Task<object[]> GetTipoClasificacion(Dictionary<string, object> parametros);
        Task<object[]> GetConsulta(Dictionary<string, object> parametros); 
        Task<object[]> EncuestaDetalle(Dictionary<string, object> parametros); 
    }
}

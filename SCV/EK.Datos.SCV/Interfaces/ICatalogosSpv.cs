using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.Interfaces
{
    public interface ICatalogosSpv : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ICatalogosSpv>
    {
        Task<object[]> GetCatalogoFallasNuevoCatalogo(Dictionary<string, object> parametros);
        Task<object[]> CrudCatalogoFallasNuevoCatalogo(Dictionary<string, object> parametros);
        Task<object[]> GetCatalogoOrigenFalla(Dictionary<string, object> parametros);
        Task<object[]> GetUsuariosByPlaza(Dictionary<string, object> parametros);
        Task<object[]> IsCoordinador(Dictionary<string, object> parametros);
        Task<object[]> GetComponentes(Dictionary<string, object> parametros);
        Task<object[]> GetComponentesGarantia(Dictionary<string, object> parametros);
        Task<object[]> CrudComponentes(Dictionary<string, object> parametros);
        Task<object[]> GetConfiguracionDocumentos(Dictionary<string, object> parametros);
        Task<object[]> CrudConfiguracionDocumentos(Dictionary<string, object> parametros);
        Task<object[]> GetConfigDoctos(Dictionary<string, object> parametros);
        Task<object[]> GetTiposVivienda(Dictionary<string, object> parametros);
        Task<object[]> GetSegmentos(Dictionary<string, object> parametros);
        Task<object[]> GetUsers(Dictionary<string, object> parametros);
        Task<object[]> GetUsersAsignados(Dictionary<string, object> parametros);
        Task<object[]> ProcessConfigCorreoEquipamiento(Dictionary<string, object> parametros);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ITiposClasificador
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ITipoClasificador>
    {
        Task<object[]> GetAllTiposClasificador(Dictionary<string, object> parametros);
        //Task<object[]> ObtenerTiposClasificador(int id, int activos);

        //Task<object[]> ObtenerClasificadoresXTipo(string clavecatalogo,int activos);

        //Task<ITipoClasificador> Save(ITipoClasificador modelTipo);

        //Task<object[]> ObtenerTiposClasificadorXEntidad(string claveCatalogo, int idUser);

        //Task<object[]> ObtenerCatalogoClasificadoresXEntidad(int idTipoClasificador, string claveentidad, int idUser);
    }
}
using System.Threading.Tasks;

using m = EK.Modelo;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface ICatalogosClasificadores
        : IDAOBaseGeneric<m.Kontrol.Interfaces.ICatalogoClasificador>
    {
        //Task<int> AgregarClasificador(string claveEntidad, int idEntidad, int idTipoClasificador, int idClasificador, int idUser);
        //Task<int> EliminarClasificador(string claveEntidad, int idEntidad, int idTipoClasificador, int idClasificador, int idUser);
        //Task<object[]> ObtenerClasificadoresXEntidad(string claveentidad, int identidad);
    }
}
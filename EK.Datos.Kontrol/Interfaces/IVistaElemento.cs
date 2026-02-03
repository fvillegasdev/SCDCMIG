using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Datos.Kontrol.Interfaces
{
    public interface IVistaElemento
      : IDAOBaseGeneric<m.Kontrol.Interfaces.IVistaElemento>
    {
       new Task<m.Kontrol.Interfaces.IVistaElemento> Save(m.Kontrol.Interfaces.IVistaElemento elemento);
        //Task<object[]> GetUbicacionColores(int Id, int IdFilter);
        Task<object[]> GetUbicacionColores(Dictionary<string, object> parametros);
    }
}

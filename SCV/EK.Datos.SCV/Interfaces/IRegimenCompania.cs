using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.Interfaces
{
    public interface IRegimenCompania
        :d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IRegimenCompania>
    {
        Task<object[]> GetAllRegimenCompania(Dictionary<string, object> parametros);
    }
}

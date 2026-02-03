using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface IListasMkt
     : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IListasMkt>
    {

        Task<m.SCV.Interfaces.IListasMkt> GetByListaMktId(Dictionary<string, object> parametros);

        Task<List<m.SCV.Interfaces.IListasMkt>> GetAllParametros(Dictionary<string, object> parametros);
        Task<m.SCV.Interfaces.IListasMkt> GetByIDParametros(Dictionary<string, object> parametros);
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IListasMktDet
     : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IListasMktDet>
    {

        Task<object[]> Get(int idmodulo, int idcompania);

        Task<m.SCV.Interfaces.IListasMktDet> Get(int ID);

        Task<m.SCV.Interfaces.IListasMktDet[]> Get(string nombre);

        Task<List<m.SCV.Interfaces.IListasMktDet>> GetAllConfiguracionCriterios(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IListasMktDet>> ConfiguracionCriterios(Dictionary<string, object> parametros);
    }
}

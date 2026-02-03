using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Procesos.SCV.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("ListasMktDet")]

    public interface IListasMktDet : Kontrol.Interfaces.IBaseProceso
    {

        Task<object[]> Get(int idmodulo, int idcompania);

        Task<List<m.SCV.Interfaces.IListasMktDet>> getConfiguracionCriterio(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IListasMktDet>> ConfiguracionCriterios(Dictionary<string, object> parametros);

    }
}

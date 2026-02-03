using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("GestionDocumentos")]
    public interface IGestionDocumentos
        : p.Kontrol.Interfaces.IBaseProceso,m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IGestionDocumentos>
    {
        //Task<List<m.SCV.Interfaces.IGestionDocumentos>> GetListarGestionDocumentos(Dictionary<string,object> parametros);

        //Task<List<m.SCV.Interfaces.IGestionDocumentos>> GetListasGestionDocumentos(Dictionary<string, object> parametros);
    }
}

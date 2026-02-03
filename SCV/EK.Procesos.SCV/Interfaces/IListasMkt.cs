using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ListasMkt")]
    public interface IListasMkt 
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IListasMkt>
    {

        Task<m.SCV.Interfaces.IListasMkt> GetByListaMktId(Dictionary<string, object> parametros);

    }
}

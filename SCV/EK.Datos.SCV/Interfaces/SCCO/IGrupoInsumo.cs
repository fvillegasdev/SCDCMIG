using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EK.Modelo.SCCO.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCCO.Interfaces
{
    public interface IGrupoInsumo
        :d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCCO.Interfaces.IGrupoInsumo>
    {
        Task<object> GetAllGrupoInsumo(Dictionary<string, object> parametros);
    }
}

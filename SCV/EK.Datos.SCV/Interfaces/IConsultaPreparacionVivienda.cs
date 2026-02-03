using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IConsultaPreparacionVivienda
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IConsultaPreparacionVivienda>
    {

        Task<List<m.SCV.Interfaces.IConsultaPreparacionViviendaResult>> GetPreparacionVivienda(Dictionary<string, object> parametros);

    }
}

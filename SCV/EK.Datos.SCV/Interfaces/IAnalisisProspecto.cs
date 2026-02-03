using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IAnalisisProspecto
        :dki.IDAOBaseGeneric<m.SCV.Interfaces.IAnalisisProspecto>
    {
        Task<object> GetReporteJerarquicoAnalisisProspecto(Dictionary<string, object> parametros);
        Task<object> GetAllAnalisisProspecto(Dictionary<string, object> parametros);
    }
}

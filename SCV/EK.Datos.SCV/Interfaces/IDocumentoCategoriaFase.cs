using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IDocumentoCategoriaFase
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IDocumentosCategoriaFase>
    {
        Task<object> GetSeguimientos(Dictionary<string, object> parametros);
    }
}

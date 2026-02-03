using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.Interfaces
{
    public interface IConceptosPago
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IConceptoPago>
    {
        Task<List<m.SCV.Interfaces.IConceptoPago>> GetPorTipo(string tipo);
    }
}
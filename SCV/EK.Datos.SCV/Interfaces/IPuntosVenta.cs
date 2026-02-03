using System.Collections.Generic;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.Interfaces
{
    public interface IPuntosVentas
        : dki.IDAOBaseGeneric<m.IPuntoVenta>
    {
    }
}

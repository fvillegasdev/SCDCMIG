using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IChecklistsControl
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.IChecklistControl>
    {
    }
}

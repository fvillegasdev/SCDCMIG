using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IClienteContacto
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IClienteContactos>
    {
      Task<m.SCV.Interfaces.IClienteContactos> ObtenerContactoPrincipal(int idCliente, string claveContacto);
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Interfaces
{
    public interface IClienteAsesores
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IClienteAsesores>
    {
        Task<m.SCV.Interfaces.IClienteAsesores> ObtenerTitularPorCliente(int idCliente);
        Task<object> ObtenerAsesoresCliente(Dictionary<string, object> parametros);
    }
}

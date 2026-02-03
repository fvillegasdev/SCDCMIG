using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Procesos.SCV.Interfaces
{
    [EK.Modelo.Kontrol.KontrolName("ListaMarketingCliente")]

    public interface IListaMarketingCliente : Kontrol.Interfaces.IBaseProceso
    {
        Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaClientes(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaBoleta(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaUsuario(Dictionary<string, object> parametros);

    }
}
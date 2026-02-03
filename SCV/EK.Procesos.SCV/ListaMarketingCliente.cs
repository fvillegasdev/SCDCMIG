using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EK.Drivers.Log;
using Newtonsoft.Json;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ListaMarketingCliente 
     : p.Kontrol.BPBase<m.SCV.Interfaces.IListaMarketingCliente, d.SCV.Interfaces.IListaMarketingCliente>, p.SCV.Interfaces.IListaMarketingCliente

    {
        #region Constructor

        public ListaMarketingCliente(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IListaMarketingCliente dao)
               : base(factory, dao, "scv_ListaMarketingCliente")
        {
        }

        #endregion Constructor


        public async Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaClientes(Dictionary<string, object> parametros)
        {
            var dao = Get<Datos.SCV.Interfaces.IListaMarketingCliente>();
            return await dao.DetalleListaClientes(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaBoleta(Dictionary<string, object> parametros)
        {
            var dao = Get<Datos.SCV.Interfaces.IListaMarketingCliente>();
            return await dao.DetalleListaBoleta(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaUsuario(Dictionary<string, object> parametros)
        {
            var dao = Get<Datos.SCV.Interfaces.IListaMarketingCliente>();
            return await dao.DetalleListaUsuario(parametros);
        }

    }
}


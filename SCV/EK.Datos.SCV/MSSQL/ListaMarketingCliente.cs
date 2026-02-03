using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.MSSQL
{
    public class ListaMarketingCliente
     : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListaMarketingCliente>,
     d.SCV.Interfaces.IListaMarketingCliente
    {
        private const string USP_LISTA_CLIENTES_DETALLE = "usp_scv_ListasMarketing_Clientes";
        private const string USP_LISTAMARKETINGCLIENTE_SELECT = "usp_scv_ListaMarketingCliente_select";
        private const string USP_LISTAMARKETINGBOLETA_SELECT = "usp_scv_ListaMarketingBoleta_select";
        private const string USP_LISTAMARKETINGUSUARIO_SELECT = "usp_scv_ListaMarketingUsuario_select";

        public ListaMarketingCliente(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_LISTA_CLIENTES_DETALLE, null, "scv_ListaMarketingCliente")
        { }


        public async Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaClientes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListaMarketingCliente>(USP_LISTAMARKETINGCLIENTE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("DetalleListaClientes::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaBoleta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListaMarketingCliente>(USP_LISTAMARKETINGBOLETA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("DetalleListaBoleta::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.IListaMarketingCliente>> DetalleListaUsuario(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListaMarketingCliente>(USP_LISTAMARKETINGUSUARIO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("DetalleListaUsuario::" + ex.Message, ex);
            }
        }


    }
} 
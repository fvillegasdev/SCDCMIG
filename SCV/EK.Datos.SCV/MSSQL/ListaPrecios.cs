using EK.Datos.SCV.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using modelSCV = EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class ListaPrecios
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListaPrecios>, d.SCV.Interfaces.IListaPrecios
    {
        private const string USP_SCV_LISTA_PRECIOS = "usp_scv_ListaPrecios_select";
        private const string USP_SCV_LISTAPRECIOS_INS_UPD = "usp_scv_ListaPrecios_ins_upd";

        public ListaPrecios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper,USP_SCV_LISTA_PRECIOS,null, "scv_ListaPrecios") { }

        //public async Task<List<m.SCV.Interfaces.IListaPrecios>> GetAllListaPrecios(Dictionary<string, object> parametros)
        //{
        //    try
        //    {
        //        return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListaPrecios>(USP_SCV_LISTA_PRECIOS, CommandType.StoredProcedure, parametros);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}


        public   async Task<int> Save(m.SCV.Interfaces.IListaPreciosVersiones  item,int idVersionVigente)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("CreadoPor", item.CreadoPor.ID);
                parameters.Add("ModificadoPor", item.ModificadoPor.ID);
                parameters.Add("IdVersion", item.ID);
                parameters.Add("idVersionVigente", idVersionVigente);
                parameters.Add("IdDesarrollo", item.IdDesarrollo);
                return await helper.GetResultAsync(USP_SCV_LISTAPRECIOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /*Recibe un arreglo de parametros*/
        public async Task<m.SCV.Interfaces.IListaPrecios> GetByUbicacionId(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IListaPrecios>(
                  USP_SCV_LISTA_PRECIOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}


//public async Task<object> GetListaPrecios(int id)
//{
//    try
//    {
//        var parametros = new Dictionary<string, object>
//        {
//            { "id", id },
//        };
//        return await helper.CreateSingleEntityAsync(USP_SCV_LISTA_PRECIOS, CommandType.StoredProcedure, parametros);

//    }
//    catch (Exception ex)
//    {
//        throw ex;
//    }
//}


//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using System.Data;
//using EK.Modelo.SCV.Interfaces;
//using datSCV = EK.Datos.SCV.Interfaces;
//using modelKontrol = EK.Modelo.Kontrol.Interfaces;
//using datKontrol = EK.Datos.Kontrol.Interfaces;
//using modelSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.MSSQL
//{
//    public class ListaPrecios : EK.Datos.Kontrol.DAOBase, datSCV.IListaPrecios
//    {
//        private const string USP_SCV_LISTAPRECIOS_SELECT = "usp_scv_ListaPrecios_select";
//        private const string USP_SCV_LISTAPRECIOS_INS_UPD = "usp_scv_ListaPrecios_ins_upd";

//        public ListaPrecios(modelKontrol.IContainerFactory factory, datKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public async Task<List<IListaPrecios>> GetAll(int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "activos", activos },
//                    { "IdDesarrollo", DBNull.Value },
//                    { "IdPrototipo", DBNull.Value },
//                    { "IdUbicacion", DBNull.Value },
//                    { "IdEstatusUbicacion", DBNull.Value },
//                    { "IdEstatusExpediente", DBNull.Value }
//                };

//                return await helper.CreateEntitiesAsync<modelSCV.IListaPrecios>(
//                    USP_SCV_LISTAPRECIOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<IListaPrecios> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id },
//                    { "activos", 0 },
//                    { "IdDesarrollo", DBNull.Value },
//                    { "IdPrototipo", DBNull.Value },
//                    { "IdUbicacion", DBNull.Value },
//                    { "IdEstatusUbicacion", DBNull.Value },
//                    { "IdEstatusExpediente", DBNull.Value }
//                };

//                return await helper.CreateSingleEntityAsync<modelSCV.IListaPrecios>(
//                    USP_SCV_LISTAPRECIOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<IListaPrecios> GetByUbicacionId(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "activos", 0 },
//                    { "IdDesarrollo", DBNull.Value },
//                    { "IdPrototipo", DBNull.Value },
//                    { "IdUbicacion", id },
//                    { "IdEstatusUbicacion", DBNull.Value },
//                    { "IdEstatusExpediente", DBNull.Value }
//                };

//                return await helper.CreateSingleEntityAsync<modelSCV.IListaPrecios>(
//                  USP_SCV_LISTAPRECIOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<int> Save(IListaPrecios item)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", item.ID);
//                parameters.Add("IdUbicacion", item.Ubicacion.ID);
//                parameters.Add("Vigencia", item.Vigencia);
//                parameters.Add("ValorAutorizado", item.ValorAutorizado);
//                parameters.Add("ValorActual", item.ValorActual);
//                parameters.Add("CreadoPor", item.IdCreadoPor);
//                parameters.Add("ModificadoPor", item.IdModificadoPor);

//                return await helper.GetResultAsync(USP_SCV_LISTAPRECIOS_INS_UPD,
//                    CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<List<IListaPrecios>> Search(
//            int? idDesarrollo, 
//            int? idPrototipo,
//            int? idEstatusUbicacion, 
//            int? idEstatusExpediente)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "activos", 0 },
//                    { "IdDesarrollo", idDesarrollo },
//                    { "IdPrototipo", idPrototipo },
//                    { "IdUbicacion", DBNull.Value },
//                    { "IdEstatusUbicacion", idEstatusUbicacion },
//                    { "IdEstatusExpediente", idEstatusExpediente }
//                };

//                return await helper.CreateEntitiesAsync<modelSCV.IListaPrecios>(
//                    USP_SCV_LISTAPRECIOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TiposCambio
        : d.Kontrol.DAOBaseGeneric<EK.Modelo.SCV.Interfaces.ITiposCambio>, d.SCV.Interfaces.ITiposCambio 
            
    {
        private const string USP_TIPOCAMBIO_SELECT = "usp_tipocambio_select";

        public TiposCambio(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TIPOCAMBIO_SELECT, null, "TiposCambio") { }


        public async Task<List<m.Kontrol.Interfaces.ITipoCambio>> Get(int idMonedaOrigen, int idMonedaDestino, DateTime fecha)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                        {
                            { "idMonedaOrigen", idMonedaOrigen},
                            { "idMonedaDestino", idMonedaDestino},
                            { "fecha", fecha},
                         };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.ITipoCambio>(USP_TIPOCAMBIO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }
    }
}
//        EK.Datos.Kontrol.DAOBase, diSCV.ITiposCambio
//    {
//        private const string USP_TIPOCAMBIO_SELECT = "usp_tipocambio_select";
//        private const string USP_TIPOCAMBIO_INS_UPD = "usp_tipocambio_ins_upd";

//        public TiposCambio(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public async Task<List<miKontrol.ITipoCambio>> GetAll( int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value},
//                    { "activos", activos}
//                 };

//                return await helper.CreateEntitiesAsync<miKontrol.ITipoCambio>(USP_TIPOCAMBIO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }


//        public async Task<miKontrol.ITipoCambio> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };

//                return await helper.CreateSingleEntityAsync<miKontrol.ITipoCambio>(USP_TIPOCAMBIO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<miKontrol.ITipoCambio> GetByMonedaId(int idMoneda)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value},
//                    { "activos", DBNull.Value},
//                    { "IdMoneda", idMoneda}
//                 };
//                return await helper.CreateSingleEntityAsync<miKontrol.ITipoCambio>(USP_TIPOCAMBIO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> Save(miKontrol.ITipoCambio model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("idMoneda", model.Moneda.ID);
//                parameters.Add("idMonedaDestino",model.MonedaDestino.ID);
//                parameters.Add("fecha", model.Fecha);
//                parameters.Add("fechaHasta", model.FechaHasta);
//                parameters.Add("valor", model.Valor);
//                parameters.Add("idestatus", model.IdEstatus);
//                parameters.Add("modificadopor", model.IdModificadoPor);

//                return await helper.GetResultAsync(USP_TIPOCAMBIO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}

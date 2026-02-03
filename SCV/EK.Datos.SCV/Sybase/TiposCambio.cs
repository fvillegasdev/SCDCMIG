//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class TiposCambio : diSCV.ITiposCambio
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_TIPOCAMBIO_SELECT = "{call usp_tipocambio_select(?,?)}";
//        private const string USP_TIPOCAMBIO_INS_UPD = "{call usp_tipocambio_ins_upd(?,?,?,?,?,?,?)}";

//        public TiposCambio(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll(int id, int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", activos}
//                 };

//                return helper.CreateEntities(USP_TIPOCAMBIO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.ITipoCambio GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.ITipoCambio>(USP_TIPOCAMBIO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.ITipoCambio model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("idmoneda", model.IdMoneda);
//                parameters.Add("fecha", model.Fecha);
//                parameters.Add("tipocambio", model.TiposCambio);
//                parameters.Add("idestatus", model.IdEstatus);
//                parameters.Add("creadopor", model.IdCreadoPor);
//                parameters.Add("modificadopor", model.IdModificadoPor);
//                return helper.GetResult(USP_TIPOCAMBIO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}

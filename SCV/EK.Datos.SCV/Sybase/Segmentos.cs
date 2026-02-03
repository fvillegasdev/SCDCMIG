//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class Segmentos : diSCV.ISegmentos
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_SEGMENTOS_SELECT = "{call usp_segmentos_select(?,?)}";
//        private const string USP_SEGMENTOS_INS_UPD = "{call usp_segmentos_ins_upd(?,?,?,?,?,?)}";

//        public Segmentos(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
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

//                return helper.CreateEntities(USP_SEGMENTOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.ISegmento GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.ISegmento>(USP_SEGMENTOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.ISegmento model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("descripcion", model.Descripcion);
//                parameters.Add("idcontable", model.IdContable);
//                parameters.Add("idestatus", model.IdEstatus);
//                parameters.Add("creadopor", model.IdCreadoPor);
//                parameters.Add("modificadopor", model.IdModificadoPor);
//                return helper.GetResult(USP_SEGMENTOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}
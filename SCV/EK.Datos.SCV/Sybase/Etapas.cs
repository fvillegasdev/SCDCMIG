//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class Etapas : diSCV.IEtapas
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_ETAPAS_SELECT = "{call usp_etapas_select(?,?)}";
//        private const string USP_ETAPAS_INS_UPD = "{call usp_etapas_ins_upd(?,?,?,?,?,?,?,?)}";

//        public Etapas(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
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

//                return helper.CreateEntities(USP_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.IEtapa GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.IEtapa>(USP_ETAPAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.IEtapa model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("descripcion", model.Descripcion);
//                parameters.Add("nombrecorto", model.NombreCorto);
//                parameters.Add("plazoestandar", model.PlazoEstandar);
//                parameters.Add("idestatusubicacion", model.IdEstatusUbicacion);
//                parameters.Add("idestatus", model.IdEstatus);
//                parameters.Add("creadopor", model.IdCreadoPor);
//                parameters.Add("modificadopor", model.IdModificadoPor);
//                return helper.GetResult(USP_ETAPAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}
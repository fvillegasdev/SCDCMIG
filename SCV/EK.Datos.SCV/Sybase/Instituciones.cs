//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class Instituciones : diSCV.IInstituciones
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_INSTITUCIONES_SELECT = "{call usp_instituciones_select(?,?)}";
//        private const string USP_INSTITUCIONES_INS_UPD = "{call usp_instituciones_ins_upd(?,?,?,?,?,?)}";

//        public Instituciones(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
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

//                return helper.CreateEntities(USP_INSTITUCIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.IInstitucion GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.IInstitucion>(USP_INSTITUCIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.IInstitucion model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("clave", model.Clave);
//                parameters.Add("descripcion", model.Descripcion);
//                parameters.Add("idestatus", model.IdEstatus);
//                parameters.Add("creadopor", model.IdCreadoPor);
//                parameters.Add("modificadopor", model.IdModificadoPor);
//                return helper.GetResult(USP_INSTITUCIONES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}

//using System;
//using System.Collections.Generic;
//using System.Data;

//using datKontrol = EK.Datos.Kontrol.Interfaces;
//using datSCV = EK.Datos.SCV.Interfaces;
//using modelKontrol = EK.Modelo.Kontrol.Interfaces;
//using modelSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class RangosIngresos : datSCV.IRangosIngresos
//    {
//        private datKontrol.IDBHelper helper;
//        private const string USP_RANGOSINGRESOS_SELECT = "{call usp_rangosingresos_select(?,?)}";
//        private const string USP_RANGOSINGRESOS_INS_UPD = "{call usp_rangosingresos_ins_upd(?,?,?,?,?,?,?,?)}";

//        public RangosIngresos(modelKontrol.IContainerFactory factory, datKontrol.IDBHelper helper)
//        {
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll(string activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value},
//                    { "activos", activos}
//                 };

//                return helper.CreateEntities(USP_RANGOSINGRESOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public modelSCV.IRangosIngresos GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<modelSCV.IRangosIngresos>(USP_RANGOSINGRESOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public modelSCV.IRangosIngresos Save(modelSCV.IRangosIngresos model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("Nombre", model.Nombre);
//                parameters.Add("Clave", model.Clave);                
//                parameters.Add("RangoInicial", model.RangoInicial);
//                parameters.Add("RangoFinal", model.RangoFinal);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("Modificadopor", model.IdModificadoPor);
//                return helper.CreateSingleEntity<modelSCV.IRangosIngresos>(USP_RANGOSINGRESOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
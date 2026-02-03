//using System;
//using System.Collections.Generic;
//using System.Data;

//using datKontrol = EK.Datos.Kontrol.Interfaces;
//using datSCV = EK.Datos.SCV.Interfaces;
//using modelKontrol = EK.Modelo.Kontrol.Interfaces;
//using modelSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class CampaniaPublicidad : datSCV.ICampaniaPublicidad
//    {
//        private datKontrol.IDBHelper helper;
//        private const string USP_CAMPANIA_SELECT = "{call usp_campaniapublicidad_select(?,?)}";
//        private const string USP_CAMPANIA_INS_UPD = "{call usp_campaniapublicidad_ins_upd(?,?,?,?,?,?,?,?,?)}";

//        public CampaniaPublicidad(modelKontrol.IContainerFactory factory, datKontrol.IDBHelper helper)
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

//                return helper.CreateEntities(USP_CAMPANIA_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public modelSCV.ICampaniaPublicidad GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<modelSCV.ICampaniaPublicidad>(USP_CAMPANIA_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public modelSCV.ICampaniaPublicidad Save(modelSCV.ICampaniaPublicidad model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("Nombre", model.Nombre);
//                parameters.Add("Clave", model.Clave);
//                parameters.Add("IdMedio", model.IdMedio);
//                parameters.Add("FechaInicial", model.FechaInicial);
//                parameters.Add("FechaFinal", model.FechaFinal);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("Modificadopor", model.IdModificadoPor);
//                return helper.CreateSingleEntity<modelSCV.ICampaniaPublicidad>(USP_CAMPANIA_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
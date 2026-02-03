//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.Sybase
//{
//    public class Empresas : diSCV.IEmpresas
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_SCV_EMPRESAS_SELECT = "{call usp_scv_empresas_select(?,?)}";
//        private const string USP_SCV_EMPRESAS_INS_UPD = "{call usp_scv_empresas_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

//        public Empresas(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll(int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "activos", activos }
//                 };

//                return helper.CreateEntities(USP_SCV_EMPRESAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.IEmpresas GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.IEmpresas>(USP_SCV_EMPRESAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.IEmpresas model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("Nombre", model.Nombre);
//                parameters.Add("RFC", model.RFC);
//                parameters.Add("NRP", model.NRP);
//                parameters.Add("Domicilio", model.Domicilio);
//                parameters.Add("IdLocalidad", model.IdLocalidad);
//                parameters.Add("CodigoPostal", model.CodigoPostal);
//                parameters.Add("Telefono", model.Telefono);
//                parameters.Add("Extension", model.Extension);
//                parameters.Add("TitularRH", model.TitularRH);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                return helper.GetResult(USP_SCV_EMPRESAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}

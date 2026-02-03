//using System;
//using System.Collections.Generic;
//using System.Data;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;


//namespace EK.Datos.SCV.Sybase
//{
//    public class Clientes : diSCV.IClientes
//    {
//        private diKontrol.IDBHelper helper;
//        private const string USP_SCV_CLIENTES_SELECT = "{call usp_scv_clientes_select(?,?)}";
//        private const string USP_SCV_CLIENTES_ADICIONAL_SELECT = "{call usp_scv_clientes_adicional_select(?)}";
//        private const string USP_SCV_CLIENTES_CONYUGE_SELECT = "{call usp_scv_clientes_conyuge_select(?,?)}";
//        private const string USP_SCV_CLIENTES_REFERENCIAS_SELECT = "{call usp_scv_clientes_referencias_select(?)}";
//        //  private const string USP_SCV_CLIENTES_INS_UPD = "{call usp_etapas_ins_upd(?,?,?,?,?,?,?,?)}";

//        public Clientes(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll(int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value},
//                    { "activos", activos}
//                 };

//                return helper.CreateEntities(USP_SCV_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.IClientes GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "activos", DBNull.Value}
//                 };
//                return helper.CreateSingleEntity<miSCV.IClientes>(USP_SCV_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(miSCV.IClientes model)
//        {
//            throw new NotImplementedException();
//        }

       
//        public object[] GetReferenciasById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                 };

//                return helper.CreateEntities(USP_SCV_CLIENTES_REFERENCIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public miSCV.IConyuge GetConyugeById(int id)
//        {
//            throw new NotImplementedException();
//        }

       

//        public miSCV.IClientesAdicional GetAdicionalById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                 };
//                return helper.CreateSingleEntity<miSCV.IClientesAdicional>(USP_SCV_CLIENTES_ADICIONAL_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int SaveAdicionales(miSCV.IClientesAdicional model)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}

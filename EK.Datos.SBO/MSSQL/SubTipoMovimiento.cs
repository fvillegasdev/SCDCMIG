//using System;
//using EK.Modelo.SBO.Interfaces;
//using dao = EK.Datos.SBO.Interfaces;
//using db = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.SBO;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;

//namespace EK.Datos.SBO.MSSQL
//{
//    public class SubTipoMovimiento : dao.ISubTipoMovimiento
//    {

//        private const string USP_SUBTIPOMOVIMIENTO_SELECT = "dbo.usp_subtipomovimiento_select";
//        private const string USP_SUBTIPOMOVIMIENTO_INS_UPD = "dbo.usp_subtipomovimiento_ins_upd";

//        private db.IDBHelper helper;

      

//        public SubTipoMovimiento(db.IDBHelper helper)
//        {
//            this.helper = helper;
//        }

//        public object[] GetAll()
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "kv", true }
//                };

//                retValue = helper.CreateEntities(USP_SUBTIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public ISubTipoMovimiento GetByTipo(int idTipoMovimiento)
//        {
//            m.Interfaces.ISubTipoMovimiento retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                     { "IdTipoMovimiento", idTipoMovimiento }

//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.ISubTipoMovimiento>(USP_SUBTIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);

//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }


//        public ISubTipoMovimiento GetById(int id)
//        {
//            m.Interfaces.ISubTipoMovimiento retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id }
                    
//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.ISubTipoMovimiento>(USP_SUBTIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);

//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Insert(ISubTipoMovimiento model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id",0 },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "idTipoMovimiento", model.TipoMovimiento.ID },
//                    { "ModificadoPor", model.IdModificadoPor },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "IdEstatus", model.IdEstatus }
//                };

//                result = helper.GetResult(USP_SUBTIPOMOVIMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }

//        public int Update(ISubTipoMovimiento model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id",  model.ID },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "idTipoMovimiento", model.TipoMovimiento.ID },
//                    { "ModificadoPor", model.IdModificadoPor },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "IdEstatus", model.IdEstatus }
//                };

//                result = helper.GetResult(USP_SUBTIPOMOVIMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }
        
        
    
       
//    }
//}

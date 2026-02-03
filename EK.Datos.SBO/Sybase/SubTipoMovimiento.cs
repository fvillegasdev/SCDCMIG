//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.SBO.Interfaces;
//using dao = EK.Datos.SBO.Interfaces;
//using db = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.SBO;
//using im = EK.Modelo.Kontrol.Interfaces;
//using System.Data;

//namespace EK.Datos.SBO.Sybase
//{
//    public class SubTipoMovimiento : dao.ISubTipoMovimiento
//    {
//        private const string USP_SUBTIPOMOVIMIENTO_SELECT = "{call usp_subtipomovimiento_select(?,?,?,?,?)}";
//        private const string USP_SUBTIPOMOVIMIENTO_INS_UPD = "{call usp_subtipomovimiento_ins_upd(?,?,?,?,?,?,?)}";
        


//        private db.IDBHelper helper;

//        public SubTipoMovimiento(im.IContainerFactory factory, db.IDBHelper helper)
//        {
//            // this.helper = helper;
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll()
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", DBNull.Value },
//                    {"IdTipoMovimiento", DBNull.Value },
//                    { "idUsuario", DBNull.Value},
//                    { "idCompañia",DBNull.Value },
//                    { "kv",true}
//                };

//                retValue = helper.CreateEntities(USP_SUBTIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
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
//                    { "ID",0 },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "idTipoMovimiento", model.IdTipoMovimiento},
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
                    
                    
                   
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
//                    { "ID",model.ID },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "idTipoMovimiento", model.IdTipoMovimiento},
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
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

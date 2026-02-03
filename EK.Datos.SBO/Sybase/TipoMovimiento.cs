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
//    public class TipoMovimiento : dao.ITipoMovimiento
//    {

//        private const string USP_TIPOMOVIMIENTO_SELECT = "{call usp_tipomovimiento_select(?,?,?,?)}";
//        private const string USP_TIPOMOVIMIENTO_INS_UPD = "{call usp_tipomovimiento_ins_upd(?,?,?,?,?,?,?,?,?)}";
//        private const string USP_TMCLASIFICADOR_SELECT = "{call usp_tipomovimiento_clasificador(?,?,?,?)}";
//        private db.IDBHelper helper;

//        public TipoMovimiento(im.IContainerFactory factory, db.IDBHelper helper)
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
//                    { "idUsuario", DBNull.Value},
//                    { "idCompañia",DBNull.Value },
//                    { "kv",2}
//                };


              

//                retValue = helper.CreateEntities(USP_TIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public object[] GetTipoMovimientoxSub()
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", DBNull.Value },
//                    { "idUsuario", DBNull.Value},
//                    { "idCompañia",DBNull.Value },
//                    { "kv",1}
//                };




//                retValue = helper.CreateEntities(USP_TIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }
//        public ITipoMovimiento GetById(int id)
//        {
//            m.Interfaces.ITipoMovimiento retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id }
//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.ITipoMovimiento>(USP_TIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Insert(ITipoMovimiento model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",0 },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "Naturaleza", model.Naturaleza },
//                    { "Conciliado", model.Conciliado },
//                    { "UsaSubTipo", model.UsaSubTipo },
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = helper.GetResult(USP_TIPOMOVIMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }

//        public int Update(ITipoMovimiento model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",model.ID},
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "Naturaleza", model.Naturaleza },
//                    { "Conciliado", model.Conciliado },
//                    { "UsaSubTipo", model.UsaSubTipo },
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = helper.GetResult(USP_TIPOMOVIMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }

//        public object[] GetTMClasificador(int idTipoClasificador, int idClasificador, int idUsuario, int todos)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idTipoClasificador",idTipoClasificador},
//                    { "idClasificador",idClasificador},
//                    { "idUsuario",idUsuario },
//                    { "todos",todos }

//                };

//                retValue = helper.CreateEntities(USP_TMCLASIFICADOR_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }
//    }
//}

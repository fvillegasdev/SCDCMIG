//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;

//using dao = EK.Datos.SBO.Interfaces;
//using db = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.SBO;

//namespace EK.Datos.SBO.MSSQL
//{
//    public class TipoMovimiento: dao.ITipoMovimiento
//    {
//        private const string USP_TIPOMOVIMIENTO_SELECT = "dbo.usp_tipomovimiento_select";
//        private const string USP_TIPOMOVIMIENTO_INS_UPD = "dbo.usp_tipomovimiento_ins_upd";

       

//        private db.IDBHelper helper;
        
//        #region Public Functions

//        public TipoMovimiento(db.IDBHelper helper)
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
//                    { "kv", 2 }
//                };

//                retValue = this.SelectTiposMovimiento(parameters);
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
//                var parameters = new Dictionary<string, object>
//                {
//                    { "kv", 1 }
//                };

//                retValue = this.SelectTiposMovimiento(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public m.Interfaces.ITipoMovimiento GetById(int id)
//        {
//            m.Interfaces.ITipoMovimiento retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id }
//                };

//                retValue = this.SelectTipoMovimiento(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Insert(m.Interfaces.ITipoMovimiento model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",0 },
//                   { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "Naturaleza", model.Naturaleza },
//                    { "Conciliado", model.Conciliado },
//                    { "UsaSubTipo", model.UsaSubTipo },
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = this.InsTiposMovimiento(parameters);
//            }
//            catch
//            {
               
//                throw;
//            }
//            return result;
//        }

//        public int Update(m.Interfaces.ITipoMovimiento model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",  model.ID },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "Naturaleza", model.Naturaleza },
//                    { "Conciliado", model.Conciliado },
//                    { "UsaSubTipo", model.UsaSubTipo },
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = this.InsTiposMovimiento(parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }
//        #endregion

//        #region Private Functions

//        private m.Interfaces.ITipoMovimiento SelectTipoMovimiento(Dictionary<string, object> parameters)
//        {
//            m.Interfaces.ITipoMovimiento retValue = null;

//            try
//            {
//                retValue = helper.CreateSingleEntity<m.Interfaces.ITipoMovimiento>(USP_TIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        private object[] SelectTiposMovimiento(Dictionary<string, object> parameters)
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = helper.CreateEntities(USP_TIPOMOVIMIENTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        private int InsTiposMovimiento(Dictionary<string, object> parameters)
//        {
//            int retValue = 0;

//            try
//            {
//                retValue = helper.GetResult(USP_TIPOMOVIMIENTO_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public object[] GetTMClasificador(int idTipoClasificador, int idClasificador, int idUsuario, int todos)
//        {
//            throw new NotImplementedException();
//        }
//        #endregion

//    }
//}

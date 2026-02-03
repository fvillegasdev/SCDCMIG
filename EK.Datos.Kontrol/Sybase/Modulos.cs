//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Modulos
//        : dao.IModulos
//    {
//        private const string USP_MODULOS_SELECT = "{call usp_modulos_select(?,?,?)}";
//        private const string USP_OPCIONES_SELECT = "{call usp_opciones_select(?,?,?,?)}";
//        private const string USP_OPCIONES_ACCIONES = "{call usp_opciones_acciones(?)}";
//        private const string USP_MODULOS_SELECT_BYID = "{call usp_modulos_select(?,?)}";
//        private const string USP_MODULOS_INS_UPD = "{call usp_modulos_ins_upd(?,?,?,?,?,?)}";

//        private dao.IDBHelper helper;
//        private im.IContainerFactory factory;

//        public Modulos(dao.IDBHelper helper, im.IContainerFactory factory)
//        {
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//            this.factory = factory;
//        }

//        public object[] GetAccionesPorOpcion(string clave)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "clave", clave }
//                };

//                retValue = helper.CreateEntities(USP_OPCIONES_ACCIONES, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        private m.Interfaces.IModulo selectModulo(Dictionary<string, object> parameters)
//        {
//            m.Interfaces.IModulo retValue = null;

//            try
//            {
//                retValue = helper.CreateSingleEntity<m.Interfaces.IModulo>(USP_MODULOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        private object[] selectModulos(Dictionary<string, object> parameters)
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = helper.CreateEntities(USP_MODULOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public object[] GetAll()
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = this.selectModulos(null);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public object[] GetByClient(int idCliente)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idModulo", DBNull.Value },
//                    { "idCliente", idCliente }
//                };

//                retValue = this.selectModulos(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public im.IModulo Get(int ID)
//        {
//            im.IModulo retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idModulo", ID },
//                    { "idCliente", DBNull.Value }
//                };

//                retValue = this.selectModulo(parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public im.IModulo[] Get(string nombre)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    {"ID", DBNull.Value },
//                    {"nombre", nombre }
//                };

//                return helper.CreateEntities<m.Interfaces.IModulo>(USP_MODULOS_SELECT_BYID, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public object[] GetKV()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    {"idModulo", DBNull.Value },
//                    {"idCliente", DBNull.Value },
//                    {"kv", 1 }
//                };
//                return helper.CreateEntities(USP_MODULOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int Save(im.IModulo model)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                {"ID", model.ID},
//                {"Clave", model.Clave},
//                {"Nombre", model.Nombre},
//                {"IdEstatus",model.IdEstatus},
//                {"CreadoPor", model.IdCreadoPor},
//                {"ModificadoPor",  model.IdModificadoPor}};
//                return helper.GetResult(USP_MODULOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        #region "Opciones"

//        public im.IOpcionModulo[] GetOpciones(int idModulo, bool secciones, bool activos)
//        {
//            List<im.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idModulo", idModulo },
//                    { "modulo", DBNull.Value },
//                    { "secciones", secciones },
//                    { "activos", activos}
//                };

//                retValue =
//                    helper.CreateEntities<im.IOpcionModulo>(USP_OPCIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public im.IOpcionModulo[] GetOpciones(string modulo, bool secciones, bool activos)
//        {
//            List<im.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idModulo", DBNull.Value },
//                    { "modulo", modulo },
//                    { "visibles", secciones },
//                    { "activos", activos}
//                };

//                retValue =
//                    helper.CreateEntities<im.IOpcionModulo>(USP_OPCIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        #endregion "Opciones"
//    }
//}
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Linq;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Niveles 
//        : DAOBase, dao.INiveles
//    {
//        private const string USP_NIVELES_CONFIGURACION = "{call usp_niveles_configuracion(?,?)}";
//        private const string USP_NIVELES_CONFIGURACION_INS_UPD = "{call usp_nivelesOpciones_ins_upd(?,?,?)}";
//        private const string USP_NIVELES_SELECT = "{call usp_niveles_select(?,?,?,?)}";
//        private const string USP_NIVELES_INS_UPD = "{call usp_niveles_ins_upd(?,?,?,?,?)}";

//        public Niveles(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public im.IOpcionModulo[] GetConfiguracion(int idNivel, int idModulo)
//        {
//            List<im.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idNivel", idNivel },
//                    { "idModulo", idModulo }
//                };

//                retValue =
//                    helper.CreateEntities<im.IOpcionModulo>(USP_NIVELES_CONFIGURACION, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public int GuardarConfiguracion(int idNivel, int idOpcion, int permisos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idNivel", idNivel},
//                    { "idOpcion", idOpcion},
//                    { "permisos", permisos }
//                };

//                return helper.GetResult(USP_NIVELES_CONFIGURACION_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetAll(int activos = 0)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", DBNull.Value },
//                    { "nivel", DBNull.Value},
//                    { "activos",activos},
//                    { "kv", 0}
//                };

//                return helper.CreateEntities(USP_NIVELES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetKV()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", DBNull.Value },
//                    { "nivel", DBNull.Value},
//                    { "activos", DBNull.Value},
//                    { "kv", 1}
//                };

//                return helper.CreateEntities(USP_NIVELES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.INiveles Get(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", id },
//                    { "nivel", DBNull.Value},
//                    { "activos", 0}
//                };

//                return helper.CreateSingleEntity<m.Interfaces.INiveles>(USP_NIVELES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.INiveles[] Get(string nombre)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", DBNull.Value },
//                    { "nivel", nombre},
//                     { "activos", 0},
//                };

//                return helper.CreateEntities<m.Interfaces.INiveles>(USP_NIVELES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(m.Interfaces.INiveles model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    {"id", model.ID},
//                    {"Nivel", model.Nivel},
//                    {"IdEstatus", model.IdEstatus},
//                    {"CreadoPor", model.IdCreadoPor},
//                    {"ModificadoPor", model.IdModificadoPor}};
//                return helper.GetResult(USP_NIVELES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
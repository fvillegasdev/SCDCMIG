//using System;
//using System.Collections.Generic;
//using System.Data;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Parametros : dao.IParametros

//    {
//        private const string USP_PARAMETROS_SELECT = "{call usp_parametros_select(?,?,?,?)}";
//        private const string USP_PARAMETROS_INS_UPD = "{call usp_parametros_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_PARAMETROS_VALORES_SELECT = "{call usp_parametros_valores_select(?,?)}";

//        private dao.IDBHelper helper;

//        #region Constructor

//        public Parametros(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            //this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        #endregion Constructor

//        #region Public Functions

//        public object[] GetAll(int idmodulo, int idambito)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    {"idmodulo", idmodulo },
//                    { "idambito", idambito},
//                    { "id", DBNull.Value },
//                    { "parametro", DBNull.Value}
//                };

//                return helper.CreateEntities(USP_PARAMETROS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public List<im.IParametro> GetParametrosGlobal(string seccion)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    { "seccion", seccion },
//                    { "ambito", "CL" }
//                };
//                return helper.CreateEntities<im.IParametro>(USP_PARAMETROS_VALORES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public im.IParametro Get(int ID)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    {"idmodulo", DBNull.Value },
//                    { "idambito", DBNull.Value},
//                    { "id", ID},
//                    { "parametro", DBNull.Value}
//                };
//                return helper.CreateSingleEntity<m.Interfaces.IParametro>(USP_PARAMETROS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public im.IParametro[] Get(string nombre)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    {"idmodulo", DBNull.Value },
//                    { "idambito", DBNull.Value},
//                    { "id",  DBNull.Value},
//                    { "parametro", nombre}
//                };

//                return helper.CreateEntities<m.Interfaces.IParametro>(USP_PARAMETROS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int Save(im.IParametro model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    {"id", model.ID},
//                    {"Parametro", model.Nombre},
//                    {"Descripcion", (model.Descripcion == null) ? Convert.DBNull : model.Descripcion},
//                    {"IdSeccion", model.IdSeccion},
//                    {"IdAmbitoparametro", (model.IdAmbito == null) ? Convert.DBNull : model.IdAmbito},
//                    {"IdTipoDato", model.IdTipoDato},
//                    {"Longitud", model.Longitud},
//                    {"Decimales", model.Decimales},
//                    {"IdEstatus", model.IdEstatus},
//                    {"CreadoPor", model.IdCreadoPor},
//                    {"ModificadoPor", model.IdModificadoPor},
//                    { "IdModulo", (model.IdModulo == null) ? Convert.DBNull : model.IdModulo}
//                };
//                return helper.GetResult(USP_PARAMETROS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        #endregion Public Functions
//    }
//}
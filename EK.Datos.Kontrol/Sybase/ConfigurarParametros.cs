//using System;
//using System.Collections.Generic;
//using System.Data;
//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class ConfigurarParametros : dao.IConfigurarParametros
//    {
//        private dao.IDBHelper helper;
//        private const string USP_CONFIGURARPARAMETROS_SELECT = "{call usp_configurarparametros_select(?,?,?,?,?)}";
//        private const string USP_CONFIGURARPARAMETROS_ALLSELECT = "{call usp_configurarparametros_allselect(?,?,?,?)}";
//        private const string USP_CONFIGURARPARAMETROS_INS_UPD = "{call usp_configurarparametros_ins_upd(?,?,?,?,?,?,?,?)}";
//        private const string USP_PARAMETROS_MAIL = "{call usp_parametros_mail(?)}"; 

//        #region Constructor

//        public ConfigurarParametros(im.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        #endregion Constructor

//        #region Public Functions

//        public object[] GetAll(int idcliente, int idmodulo, int idcompania, string ambito = null)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    { "idcliente", idcliente },
//                    { "idcompania", idcompania },
//                    { "idmodulo", idmodulo },
//                    { "ambito", ambito }
//                };

//                return helper.CreateEntities<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_ALLSELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public object[] Get(int idcliente, int idmodulo, int idcompania)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    { "id",  DBNull.Value},
//                    { "parametro", DBNull.Value},
//                    { "idCliente", idcliente},
//                    { "idmodulo",idmodulo},
//                    { "idcompania", idcompania}
//                };

//                return helper.CreateEntities<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public im.IConfigurarParametros Get(int ID)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    { "id", ID},
//                    { "parametro", DBNull.Value},
//                    { "idCliente", DBNull.Value},
//                    { "idmodulo", DBNull.Value},
//                    { "idcompania", DBNull.Value}
//                };
//                return helper.CreateSingleEntity<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public im.IConfigurarParametros[] Get(string nombre)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    { "id", DBNull.Value},
//                    { "parametro", nombre},
//                    { "idCliente", DBNull.Value},
//                    { "idmodulo", DBNull.Value},
//                    { "idcompania", DBNull.Value}
//                };
//                return helper.CreateEntities<im.IConfigurarParametros>(USP_CONFIGURARPARAMETROS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int Save(im.IConfigurarParametros model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    { "id", model.ID},
//                    { "Idparametro", model.IdParametro},
//                    { "Idcliente", (model.IdCliente == null) ? Convert.DBNull : model.IdCliente},
//                    { "IdCompania", (model.IdCompania == 0) ? Convert.DBNull : model.IdCompania},
//                    { "Valor", model.Valor},
//                    { "IdEstatus", model.IdEstatus},
//                    { "CreadoPor", model.IdCreadoPor},
//                    { "ModificadoPor", model.IdModificadoPor}
//                };
//                return helper.GetResult(USP_CONFIGURARPARAMETROS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public List<im.IConfigurarParametros> GetMailParameters(int idcliente)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>()
//                {
//                    { "IdCliente", idcliente }
                    
//                };

//                return helper.CreateEntities<im.IConfigurarParametros>(USP_PARAMETROS_MAIL, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        #endregion Public Functions
//    }
//}
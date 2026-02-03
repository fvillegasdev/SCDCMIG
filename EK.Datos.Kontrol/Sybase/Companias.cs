//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Companias
//        : dao.ICompania
//    {
//        private dao.IDBHelper helper;
//        private const string USP_COMPANIAS_SELECT = "{call usp_companias_select(?,?,?,?,?)}";
//        private const string USP_COMPANIAS_INS_UPD = "{call usp_companias_ins_upd(?,?,?,?,?,?,?,?,?,?,?)}";

//        public Companias(im.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll(int idcliente, int activos, int todos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idcliente", idcliente },
//                    { "id", DBNull.Value },
//                    { "nombre", DBNull.Value},
//                    { "activos",activos },
//                    { "todos",todos}
//                };

//                return helper.CreateEntities(USP_COMPANIAS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public im.ICompania[] GetByCliente(int idCliente)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idcliente", idCliente },
//                    { "id", DBNull.Value },
//                    { "nombre", DBNull.Value},
//                    { "activos",0},
//                    { "todos",0}
//                };

//                return helper.CreateEntities<im.ICompania>(USP_COMPANIAS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public im.ICompania[] Get(string nombre)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idcliente", DBNull.Value },
//                    { "id", DBNull.Value },
//                    { "nombre", nombre},
//                    { "activos",0},
//                    { "todos",0}
//                };

//                parameters.Add("nombre", nombre.ToUpper());
//                return helper.CreateEntities<im.ICompania>(USP_COMPANIAS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public im.ICompania Get(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idcliente", DBNull.Value },
//                    { "id", id },
//                    { "nombre",  DBNull.Value},
//                    { "activos",0},
//                    { "todos",0}
//                };

//                return helper.CreateSingleEntity<im.ICompania>(USP_COMPANIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetKV()
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            object[] retValue;
//            try
//            {
//                string sqlQuery = @"
//                        SELECT ID
//                            , Clave
//                            , Nombre
//                        FROM dbo.Companias
//                        WHERE IdEstatus = 13";
//                retValue = helper.CreateEntities(sqlQuery, CommandType.Text, parameters);
//                return retValue;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public int Save(im.ICompania model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                {"id", model.ID},
//                {"idcliente", model.IdCliente},
//                {"Clave", model.Clave},
//                {"Nombre", model.Nombre},
//                {"Rfc", model.Rfc},
//                {"Domicilio", model.Domicilio},
//                {"IdLocalidad", model.IdLocalidad},
//                {"IdEstatus", model.IdEstatus},
//                {"CreadoPor", model.IdCreadoPor},
//                {"ModificadoPor", model.IdModificadoPor },
//                {"Vivienda", model.AplicaVivienda }};
//                return helper.GetResult(USP_COMPANIAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }


//        im.ICompania[] dao.ICompania.GetVivienda()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    //{ "idcliente", idCliente },
//                    { "id", DBNull.Value },
//                    { "nombre", DBNull.Value},
//                    { "activos",0},
//                    { "todos",0},
//                    { "vivienda",1}
//                };

//                return helper.CreateEntities<im.ICompania>(USP_COMPANIAS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
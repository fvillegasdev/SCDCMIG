//using System;
//using System.Collections.Generic;
//using System.Data;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Cliente
//        : dao.ICliente
//    {
//        private const string USP_CLIENTES_SELECT = "{call usp_clientes_select(?,?,?,?)}";
//        private const string USP_CLIENTES_INS_UPD = "{call usp_clientes_ins_upd(?,?,?,?,?,?,?,?,?)}";
//        private const string USP_CLIENTESMODULOS_SELECT = "{call usp_clientesmodulos_select(?)}";
//        private dao.IDBHelper helper;

//        public Cliente(im.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            // this.helper = helper;
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll()
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = helper.CreateEntities(USP_CLIENTES_SELECT, CommandType.StoredProcedure, null);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public im.ICliente[] Get()
//        {
//            List<im.ICliente> retValue = null;

//            try
//            {
//                retValue = helper.CreateEntities<im.ICliente>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, null);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue == null ? null : retValue.ToArray();
//        }

//        public object[] GetKV()
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = helper.CreateEntities(USP_CLIENTES_SELECT, CommandType.StoredProcedure, null);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public im.ICliente Get(int ID)
//        {
//            m.Interfaces.ICliente retValue = null;

//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object> {
//                    { "id", ID },
//                    { "clave", DBNull.Value }
//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.ICliente>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public im.ICliente Get(string clave)
//        {
//            m.Interfaces.ICliente retValue = null;

//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object> {
//                    { "id", DBNull.Value },
//                    { "clave", clave }
//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.ICliente>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Save(m.Interfaces.ICliente model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object> {
//                    { "ID", model.ID },
//                    { "Clave",  model.Clave },
//                    { "Nombre", model.Nombre },
//                    { "VigenciaInicio",model.VigenciaInicio.Value.ToString("yyyy-MM-dd")},
//                    { "VigenciaFin", model.VigenciaFin.Value.ToString("yyyy-MM-dd")},
//                    { "IdEstatus",  model.IdEstatus },
//                    { "Bloqueado", Convert.ToInt32(model.Bloqueado) },
//                    { "ModificadoPor", model.IdModificadoPor},
//                    { "CreadoPor", model.IdCreadoPor }
//                };
//                return helper.GetResult(USP_CLIENTES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetModulos(int idcliente)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    { "idcliente", idcliente }};

//                return helper.CreateEntities<m.Interfaces.IItemGeneral>(USP_CLIENTESMODULOS_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
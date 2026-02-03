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
//    public class Bancos: dao.IBancos
//    {
//        private const string USP_BANCOS_SELECT = "{call usp_banco_select(?,?,?,?)}";
//        private const string USP_BANCOS_INS_UPD = "{call usp_banco_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

//        private db.IDBHelper helper;

//        public Bancos(im.IContainerFactory factory, db.IDBHelper helper)
//        {
//            // this.helper = helper;
//            this.helper = new Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] GetAll()
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "idUsuario", DBNull.Value},
//                    { "idCompañia",DBNull.Value },
//                    { "kv",true}
//                };

//                retValue = helper.CreateEntities(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }
//        public object[] GetByUser(int idCompania, int idUser )
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "idUsuario", idUser},
//                    { "idCompañia",idCompania},
//                    { "kv",false}
//                };

//                retValue = helper.CreateEntities(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public IBancos GetById(int id)
//        {
//            m.Interfaces.IBancos retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id },
//                    { "idUsuario", DBNull.Value},
//                    { "idCompañia",DBNull.Value},
//                    { "kv",true}
//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.IBancos>(USP_BANCOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Insert(IBancos model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",0 },
//                    { "Banco", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "Sucursal", model.Sucursal },
//                    { "Direccion", model.Direccion },
//                    { "IdLocalidad", model.IdLocalidad },
//                    { "Telefono1", model.Telefono1 },
//                    { "ExtTel", model.ExtTel },
//                    { "Responsable", model.Responsable },
//                    { "IdBancoSAT", model.IdBancoSAT },
//                    { "EsBancoExtranjero", model.BancoExtranjero },
//                    { "Swift", model.Swift },
//                    { "SPEUA", model.SPEUA },
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = helper.GetResult(USP_BANCOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }

//        public int Update(IBancos model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",model.ID },
//                     { "Banco", model.Clave },
//                    { "Descripcion", model.Descripcion },
//                    { "Sucursal", model.Sucursal },
//                    { "Direccion", model.Direccion },
//                    { "IdLocalidad", model.IdLocalidad },
//                    { "Telefono1", model.Telefono1 },
//                    { "ExtTel", model.ExtTel },
//                    { "Responsable", model.Responsable },
//                    { "IdBancoSAT", model.IdBancoSAT },
//                    { "EsBancoExtranjero", model.BancoExtranjero },
//                    { "Swift", model.Swift },
//                    { "SPEUA", model.SPEUA },
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = helper.GetResult(USP_BANCOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }
//    }
//}

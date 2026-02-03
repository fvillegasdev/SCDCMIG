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
//    public class CuentaBancaria : dao.ICuentaBancaria
//    {
//        private const string USP_CUENTASBANCARIAS_SELECT = "{call usp_cuentabancaria_select(?,?,?,?,?)}";
//        private const string USP_CUENTASBANCARIAS_INS_UPD = "{call usp_cuentabancaria_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
//        private const string USP_CBCLASIFICADOR_SELECT = "{call usp_cuentabancaria_clasificador(?,?,?,?,?)}";

//        private db.IDBHelper helper;

//        public CuentaBancaria(im.IContainerFactory factory, db.IDBHelper helper)
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

//                    { "id",DBNull.Value},
//                    { "idUsuario",DBNull.Value},
//                    { "idCompania",DBNull.Value },
//                    { "idBanco", DBNull.Value },
//                    { "kv", true }
//                };

//                retValue = helper.CreateEntities(USP_CUENTASBANCARIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public ICuentaBancaria GetById(int id)
//        {
//            m.Interfaces.ICuentaBancaria retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id",id},
//                    { "idUsuario",DBNull.Value},
//                    { "idCompania",DBNull.Value },
//                    { "idBanco", DBNull.Value },
//                    { "kv", true }
//                };

//                retValue = helper.CreateSingleEntity<m.Interfaces.ICuentaBancaria>(USP_CUENTASBANCARIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }
//        public List<ICuentaBancaria> GetByBank(int idBanco, int idCompania, int idUser)
//        {
//            List<m.Interfaces.ICuentaBancaria> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id",DBNull.Value},
//                    { "idUsuario",idUser},
//                    { "idCompania",idCompania },
//                    { "idBanco", idBanco },
//                    { "kv", false }
//                };

//                retValue = helper.CreateEntities<m.Interfaces.ICuentaBancaria>(USP_CUENTASBANCARIAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public int Save(ICuentaBancaria model)
//        {
//            int result = 0;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "ID",model.ID},
//                    { "IdBanco", model.IdBanco },
//                    { "Clave", model.Clave },
//                    { "Descripcion", model.Descripcion},
//                    { "Contrato", model.Contrato },
//                    { "Referencia", model.Referencia },
//                    { "IdMoneda", model.IdMoneda},
//                    { "IdTipoPoliza", model.IdTipoPoliza },
//                    { "IdCentroCosto", model.IdCentroCosto },
//                    { "IdCuentaContable", model.IdCuentaContable },
//                    { "FechaInicio", model.FechaInicio },
//                    { "IdTipoCuenta", model.IdTipoCuenta},
//                    { "LugarEmision", model.LugarEmision},
//                    { "ChequeFisico", model.ChequeFisico},
//                    { "ChequeElectronico", model.ChequeElectronico},
//                    { "SucursalOrigen", model.SucursalOrigen },
//                    { "CuentaBanco", model.CuentaBanco},
//                    { "BancaElectronica", model.BancaElectronica },
//                    { "Clabe", model.Clabe},
//                    { "Plaza", model.Plaza },
//                    { "Clasificacion", model.Clasificacion },
//                    { "Telefono1", model.Telefono1 },
//                    { "ExtTel", model.ExtTel},
//                    { "Responsable", model.Responsable },
//                    { "CuentaTercero", model.CuentaTercero},
//                    { "IdEstatus", model.IdEstatus },
//                    { "CreadoPor", model.IdCreadoPor },
//                    { "ModificadoPor", model.IdModificadoPor }
//                };

//                result = helper.GetResult(USP_CUENTASBANCARIAS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {

//                throw;
//            }
//            return result;
//        }

//        public object[] GetCuentasClasificador(int idTipoClasificador, int idClasificador, int idUsuario, int todos, int idBanco)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "idTipoClasificador",idTipoClasificador},
//                    { "idClasificador",idClasificador},
//                    { "idUsuario",idUsuario },
//                    { "todos",todos },
//                    { "idBanco",idBanco }

//                };

//                retValue = helper.CreateEntities(USP_CBCLASIFICADOR_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }
//    }
        
//}

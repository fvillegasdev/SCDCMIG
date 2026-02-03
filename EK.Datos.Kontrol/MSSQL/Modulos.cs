using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using dao = EK.Datos.Kontrol.Interfaces;
using im = EK.Modelo.Kontrol.Interfaces;
namespace EK.Datos.Kontrol.MSSQL
{
    public class Modulos
        : DAOBaseGeneric<m.Kontrol.Interfaces.IModulo>, d.Kontrol.Interfaces.IModulos
    {
        private const string USP_MODULOS_SELECT = "usp_modulos_select";
        private const string USP_OPCIONES_SELECT = "usp_opciones_select";
        private const string USP_OPCIONES_ACCIONES = "usp_opciones_acciones";

        public Modulos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_MODULOS_SELECT,
                  string.Empty,
                  "modulos")
        { }

        public async Task<im.IOpcionModulo[]> GetOpciones(Dictionary<string, object> parametros)
        {
            List<im.IOpcionModulo> retValue = null;

            try
            {
                retValue =
                    await helper.CreateEntitiesAsync<im.IOpcionModulo>(USP_OPCIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }
        public async Task<object[]> GetAccionesPorOpcion(string clave)
        {
            object[] retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                            { "clave", clave }
                        };

                retValue = await helper.CreateEntitiesAsync(USP_OPCIONES_ACCIONES, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue;
        }
    }
}
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Threading.Tasks;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.MSSQL
//{
//    public class Modulos
//        : dao.IModulos
//    {
//        private const string USP_MODULOS_SELECT = "dbo.usp_modulos_select";
//        private const string USP_OPCIONES_SELECT = "dbo.usp_opciones_select";
//        private const string USP_OPCIONES_ACCIONES = "dbo.usp_opciones_acciones";
//        private const string USP_MODULOS_SELECT_BYID = "dbo.usp_modulos_select_byID";
//        private const string USP_MODULOS_INS_UPD = "dbo.usp_modulos_ins_upd";

//        private dao.IDBHelper helper;
//        private im.IContainerFactory factory;

//        public Modulos(dao.IDBHelper helper, im.IContainerFactory factory)
//        {
//            this.helper = helper;
//            this.factory = factory;
//        }

//        public async Task<object[]> GetAccionesPorOpcion(string clave)
//        {
//            object[] retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "clave", clave }
//                };

//                retValue = await helper.CreateEntitiesAsync(USP_OPCIONES_ACCIONES, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        private async Task<m.Interfaces.IModulo> selectModulo(Dictionary<string, object> parameters)
//        {
//            m.Interfaces.IModulo retValue = null;

//            try
//            {
//                retValue = await helper.CreateSingleEntityAsync<m.Interfaces.IModulo>(USP_MODULOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        private async Task<object[]> selectModulos(Dictionary<string, object> parameters)
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = await helper.CreateEntitiesAsync(USP_MODULOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public async Task<object[]> GetAll()
//        {
//            object[] retValue = null;

//            try
//            {
//                retValue = await this.selectModulos(null);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public async Task<im.IModulo> Get(int ID)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    {"ID", ID },
//                    {"nombre", DBNull.Value }
//                };

//                return await helper.CreateSingleEntityAsync<m.Interfaces.IModulo>(USP_MODULOS_SELECT_BYID, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task<im.IModulo[]> Get(string nombre)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    {"ID", DBNull.Value },
//                    {"nombre", nombre }
//                };

//                return (await helper.CreateEntitiesAsync<m.Interfaces.IModulo>(USP_MODULOS_SELECT_BYID, CommandType.StoredProcedure, parameters)).ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task<object[]> GetKV()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    {"ID", DBNull.Value },
//                    {"nombre", DBNull.Value  }
//                };

//                return await helper.CreateEntitiesAsync(USP_MODULOS_SELECT_BYID, CommandType.StoredProcedure, parameters);

//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task<int> Save(im.IModulo model)
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

//                return await helper.GetResultAsync(USP_MODULOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        #region "Opciones"

//        public async Task<im.IOpcionModulo[]> GetOpciones(int idModulo, bool secciones, bool activos)
//        {
//            List<im.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idModulo", idModulo },
//                    { "secciones", secciones },
//                    { "activos", activos}
//                };

//                retValue =
//                    await helper.CreateEntitiesAsync<im.IOpcionModulo>(USP_OPCIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue != null ? retValue.ToArray() : null;
//        }

//        public async Task<im.IOpcionModulo[]> GetOpciones(string modulo, bool secciones, bool activos)
//        {
//            List<im.IOpcionModulo> retValue = null;

//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "modulo", modulo },
//                    { "secciones", secciones },
//                    { "activos", activos}
//                };

//                retValue =
//                    await helper.CreateEntitiesAsync<im.IOpcionModulo>(USP_OPCIONES_SELECT, CommandType.StoredProcedure, parameters);
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
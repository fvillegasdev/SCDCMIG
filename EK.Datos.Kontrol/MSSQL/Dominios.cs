using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Dominios
        : DAOBaseGeneric<m.Kontrol.Interfaces.IDominios>, d.Kontrol.Interfaces.IDominios
    {
        private const string USP_DOMINIOS_SELECT = "usp_Dominios_select";

        public Dominios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_DOMINIOS_SELECT,
                  string.Empty,
                  "Dominios")
        { }

    }
}
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;
//using System.Threading.Tasks;

//using dao = EK.Datos.Kontrol.Interfaces;
//using im = EK.Modelo.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.MSSQL
//{
//    public class Cliente
//        : dao.ICliente
//    {
//        private const string USP_DOMINIOS_SELECT = "usp_Dominios_select";
//        private const string USP_CLIENTESMODULOS_SELECT = "usp_clientesmodulos_select";

//        private dao.IDBHelper helper;

//        public Cliente(dao.IDBHelper helper)
//        {
//            this.helper = helper;
//        }

//        public async Task<object[]> GetAll()
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            object[] retValue;

//            try
//            {
//                retValue = (await helper.CreateEntitiesAsync<m.Interfaces.IDominios>(USP_DOMINIOS_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
//                return retValue.ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task<im.IDominios[]> Get()
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            List<m.Interfaces.IDominios> retValue;
//            try
//            {
//                retValue = await helper.CreateEntitiesAsync<m.Interfaces.IDominios>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//                return retValue.ToArray();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task<object[]> GetKV()
//        {
//            Dictionary<string, object> parameters = new Dictionary<string, object>();
//            object[] retValue = null;

//            try
//            {
//                retValue = (await helper.CreateEntitiesAsync<m.Interfaces.IDominios>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
//                return retValue;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task<im.IDominios> Get(int ID)
//        {
//            m.Interfaces.IDominios retValue = null;

//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object> {
//                    { "id", ID }
//                };

//                retValue = await helper.CreateSingleEntityAsync<m.Interfaces.IDominios>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        public async Task<im.IDominios> Get(string clave)
//        {
//            m.Interfaces.IDominios retValue = null;

//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object> {
//                    { "clave", clave }
//                };

//                retValue = await helper.CreateSingleEntityAsync<m.Interfaces.IDominios>(USP_CLIENTES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }

//            return retValue;
//        }

//        //public async Task<int> Save(m.Interfaces.ICliente model)
//        //{
//        //    try
//        //    {
//        //        Dictionary<string, object> parameters = new Dictionary<string, object> {
//        //            { "ID", model.ID },
//        //            { "Clave",  model.Clave },
//        //            { "Nombre", model.Nombre },
//        //            { "VigenciaInicio",model.VigenciaInicio},
//        //            { "VigenciaFin", model.VigenciaFin},
//        //            { "IdEstatus",  model.IdEstatus },
//        //            { "Bloqueado", model.Bloqueado },
//        //            { "ModificadoPor", model.IdModificadoPor},
//        //            { "CreadoPor", model.IdCreadoPor }
//        //        };
//        //        return await helper.GetResultAsync(USP_CLIENTES_INS_UPD, CommandType.StoredProcedure, parameters);
//        //    }
//        //    catch
//        //    {
//        //        throw;
//        //    }
//        //}

//        public async Task<object[]> GetModulos()
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();

//                return (await helper.CreateEntitiesAsync<m.Interfaces.IItemGeneral>(USP_CLIENTESMODULOS_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
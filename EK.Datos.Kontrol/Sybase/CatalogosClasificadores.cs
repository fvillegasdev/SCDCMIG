//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Threading.Tasks;

//using dao = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class CatalogosClasificadores 
//        : EK.Datos.Kontrol.DAOBase, dao.ICatalogosClasificadores
//    {
//        private const string USP_CATALOGOSCLASIFICADORES_INS_DEL = "{call usp_catalogosclasificadores_ins_del(?,?,?,?,?,?)}";
//        private const string USP_CATALOGOSCLASIFICADORES_SELECT = "{call usp_catalogosclasificadores_select(?,?)}";

//        public CatalogosClasificadores(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public async Task<int> AgregarClasificador(string claveEntidad, int idEntidad, int idTipoClasificador, int idClasificador, int idUser)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "tipoAccion", 1},
//                    { "claveEntidad", claveEntidad},
//                    { "idEntidad", idEntidad },
//                    { "idTipoClasificador", idTipoClasificador},
//                    { "idClasificador", idClasificador },
//                    { "creadoPor", idUser },
//                };

//                return await helper.GetResultAsync(USP_CATALOGOSCLASIFICADORES_INS_DEL, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> EliminarClasificador(string claveEntidad, int idEntidad, int idTipoClasificador, int idClasificador, int idUser)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "tipoAccion", 2},
//                    { "claveEntidad", claveEntidad},
//                    { "idEntidad", idEntidad },
//                    { "idTipoClasificador", idTipoClasificador},
//                    { "idClasificador", idClasificador },
//                    { "creadoPor", idUser },
//                };

//                return await helper.GetResultAsync(USP_CATALOGOSCLASIFICADORES_INS_DEL, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<object[]> ObtenerClasificadoresXEntidad(string claveentidad, int identidad)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveentidad",claveentidad},
//                    { "identidad", identidad},
//                };

//                return await helper.CreateEntitiesAsync(USP_CATALOGOSCLASIFICADORES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
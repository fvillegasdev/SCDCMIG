//using System;
//using System.Collections.Generic;
//using System.Data;
//using dao = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class TiposClasificador : dao.ITiposClasificador
//    {
//        private const string USP_TIPOSCLASIFICADOR_SELECT = "{call usp_TiposClasificador_select(?,?,?)}";
//        private const string USP_CLASIFICADORES_SELECT = "{call usp_clasificadores_select(?)}";
//        private const string USP_TIPOSCLASIFICADOR_INSERT_UPDATE = "{call usp_tiposclasificadores_ins_upd(?,?,?,?,?,?,?)}";
//        private const string USP_CLASIFICADORESENTIDAD_SELECT = "{call usp_clasificadoresEntidad_select(?,?,?)}";
//        private const string USP_TIPOSCLASIFICADORENTIDAD_SELECT = "{call usp_TiposClasificadorEntidad_select(?,?)}";
//        private dao.IDBHelper helper;

//        public TiposClasificador(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] ObtenerTiposClasificador(int id, int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "id", id },
//                    { "activos", activos }
//                };

//                return helper.CreateEntities<m.Interfaces.ITipoClasificador>(USP_TIPOSCLASIFICADOR_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

        
//        public object[] ObtenerClasificadoresXTipo(string clavecatalogo, int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "clavecatalogo", clavecatalogo },
//                    { "activos", activos }
//                };

//                return helper.CreateEntities(USP_CLASIFICADORES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.ITipoClasificador Save(m.Interfaces.ITipoClasificador modelTipo)
//        {
//            m.Interfaces.ITipoClasificador result = null;
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "Id",modelTipo.ID },                    
//                    { "Nombre",modelTipo.Nombre },
//                    { "Clave",modelTipo.Clave },
//                    { "Descripcion",modelTipo.Descripcion },
//                    { "IdEstatus",modelTipo.IdEstatus },
//                    { "CreadoPor",modelTipo.IdCreadoPor },
//                    { "ModificadoPor",modelTipo.IdModificadoPor }
//                    //{ "IdCatalogosClasificadores",modelTipo.IdCatalogosClasificadores }
//            };

//                result = helper.CreateSingleEntity<m.Interfaces.ITipoClasificador>(USP_TIPOSCLASIFICADOR_INSERT_UPDATE, CommandType.StoredProcedure, parameters);

//                return result;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        public object[] ObtenerTiposClasificadorXEntidad(string claveCatalogo, int idUser)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveCatalogo", claveCatalogo },
//                    { "idUser", idUser }
//                };

//                return helper.CreateEntities<m.Interfaces.ITipoClasificador>(USP_TIPOSCLASIFICADORENTIDAD_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] ObtenerCatalogoClasificadoresXEntidad(int idTipoClasificador, string claveentidad, int idUser)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "idTipoClasificador", idTipoClasificador },
//                    { "claveEntidad", claveentidad },
//                    { "idUsuario", idUser }
//                };

//                return helper.CreateEntities(USP_CLASIFICADORESENTIDAD_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
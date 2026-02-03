//using System;
//using System.Collections.Generic;
//using System.Data;
//using dao = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class CatalogosGeneralesValores
//        : EK.Datos.Kontrol.DAOBase, dao.ICatalogosGeneralesValores
//    {
//        private const string USP_CATALOGOSGENERALESVALORES_SELECT = "{call usp_catalogosgeneralesvalores_select(?,?,?,?,?)}";
//        private const string USP_CATALOGOSGENERALESVALORES_INS_UPD = "{call usp_catalogosgeneralesvalores_ins_upd(?,?,?,?,?,?,?,?)}";

//        public CatalogosGeneralesValores(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] Get(string clave, string nombre, int activos = 0)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveCatalogo", clave },
//                    { "nombre", nombre.ToUpper() },
//                    { "clave", DBNull.Value },
//                    { "id", DBNull.Value },
//                    { "activos", activos}
//                };
//                return helper.CreateEntities<m.Interfaces.IItemGeneral>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetByClave(string clavecatalogo, string clave)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveCatalogo", clavecatalogo },
//                    { "nombre", DBNull.Value },
//                    { "clave", clave },
//                    { "id", DBNull.Value },
//                    { "activos", 0 }
//                };

//                return helper.CreateEntities<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetByCatalogo(string clave, int activos = 0)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveCatalogo", clave },
//                    { "nombre", DBNull.Value },
//                    { "clave", DBNull.Value },
//                    { "id", DBNull.Value  },
//                    { "activos", activos}
//                };

//                return helper.CreateEntities<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public object[] GetKVByCatalogo(string clave)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveCatalogo", clave },
//                    { "nombre", DBNull.Value },
//                    { "clave", DBNull.Value },
//                    { "id", DBNull.Value },
//                    { "activos", 0}
//                };
//                return helper.CreateEntities<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public m.Interfaces.IItemGeneralValores Get(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object> {
//                    { "claveCatalogo", DBNull.Value },
//                    { "nombre", DBNull.Value },
//                    { "clave", DBNull.Value },
//                    { "id", id },
//                    { "activos", 0 },
//                };

//                return helper.CreateSingleEntity<m.Interfaces.IItemGeneralValores>(USP_CATALOGOSGENERALESVALORES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public int Save(m.Interfaces.IItemGeneralValores model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("id", model.ID);
//                parameters.Add("clavecatalogo", model.ClaveCatalogo);
//                parameters.Add("Clave", model.Clave);
//                parameters.Add("Nombre", model.Nombre);
//                parameters.Add("IdSeccion", (model.IdSeccion == null) ? Convert.DBNull : model.IdSeccion);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                return helper.GetResult(USP_CATALOGOSGENERALESVALORES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
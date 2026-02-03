//using System.Collections.Generic;
//using System.Data;
//using dao = EK.Datos.Kontrol.Interfaces;
//using m = EK.Modelo.Kontrol;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class CatalogosGenerales : dao.ICatalogosGenerales
//    {
//        private const string USP_CATALOGOSGENERALES_SELECT = "{call usp_catalogosgenerales_select(?)}";
//        private dao.IDBHelper helper;

//        public CatalogosGenerales(m.Interfaces.IContainerFactory factory, dao.IDBHelper helper)
//        {
//            this.helper = new EK.Datos.Kontrol.Sybase.DBHelper(factory);
//        }

//        public object[] Get(string clave)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>() {
//                    {"claveCatalogo", clave }
//                };
//                return helper.CreateEntities<m.Interfaces.IItemGeneral>(USP_CATALOGOSGENERALES_SELECT, CommandType.StoredProcedure, parameters).ToArray();
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
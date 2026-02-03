//using System;
//using System.Collections.Generic;
//using System.Data;
//using dao = EK.Datos.Kontrol.Interfaces;
//using modelKontrol = EK.Modelo.Kontrol.Interfaces;
//using datKontrol = EK.Datos.Kontrol.Interfaces;
//using System.Threading.Tasks;

//namespace EK.Datos.Kontrol.Sybase
//{
//    public class Localidades : EK.Datos.Kontrol.DAOBase, dao.ILocalidades
//    {
//        private const string USP_ASENTAMIENTOS_SELECT = "{call usp_asentamientos_select(?)}";

//        #region Constructor

//        public Localidades(modelKontrol.IContainerFactory factory, datKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        #endregion Constructor

//        #region Private Functions

//        public async Task<List<modelKontrol.IAsentamiento>> GetAsentamientos(string parametro)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>();
//                parameters.Add("parametro", parametro);

//                return await helper.CreateEntitiesAsync<modelKontrol.IAsentamiento>(
//                    USP_ASENTAMIENTOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        #endregion Private Functions
//    }
//}
//using System;
//using System.Collections.Generic;
//using System.Data;
//using miSCO = EK.Modelo.SCO.Interfaces;

//namespace EK.Datos.SCO.Sybase
//{
//    public partial class CentroCosto
//    {
//        public List<miSCO.ICentroCosto> Get()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    { "parametro", null }
//                };
//                return helper.CreateEntities<miSCO.ICentroCosto>(USP_CENTROSCOSTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public List<miSCO.ICentroCosto> Search(string parametro)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    { "parametro", parametro }
//                };

//                return helper.CreateEntities<miSCO.ICentroCosto>(USP_CENTROSCOSTO_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
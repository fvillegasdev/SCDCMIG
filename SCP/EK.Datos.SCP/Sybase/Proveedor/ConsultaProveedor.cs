//using System;
//using System.Collections.Generic;
//using System.Data;
//using miSCP = EK.Modelo.SCP.Interfaces;

//namespace EK.Datos.SCP.Sybase
//{
//    public partial class Proveedor
//    {
//        public List<miSCP.IProveedor> Get()
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>()
//                {
//                    { "parametro", null }
//                };
//                return helper.CreateEntities<miSCP.IProveedor>(USP_PROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public List<miSCP.IProveedor> Search(string parametro)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>() {
//                    {"parametro", parametro }
//                };

//                return helper.CreateEntities<miSCP.IProveedor>(USP_PROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
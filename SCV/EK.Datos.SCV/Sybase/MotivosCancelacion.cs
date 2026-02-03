//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Threading.Tasks;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;


//namespace EK.Datos.SCV.Sybase
//{
//    public class MotivosCancelacion :
//        EK.Datos.Kontrol.DAOBase, diSCV.IMotivosCancelacion
//    {
//        private const string USP_SCV_MOTIVOSCANCELACION_SELECT = "{call usp_MotivosCancelacion_select(?,?)}";
//        private const string USP_SCV_MOTIVOSCANCELACION_INS_UPD = "{call usp_MotivosCancelacion_ins_upd(?,?,?,?,?,?,?)}";

//        public MotivosCancelacion(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }
//        public async Task<object[]> GetAll(int id, int activos)
//        {
//           try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"id",DBNull.Value},
//                    {"activos", activos}
//                };
//                return await helper.CreateEntitiesAsync(USP_SCV_MOTIVOSCANCELACION_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<miSCV.IMotivosCancelacion> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"id", id},
//                    {"activos", DBNull.Value}
//                };
//                return  await helper.CreateSingleEntityAsync<miSCV.IMotivosCancelacion>(USP_SCV_MOTIVOSCANCELACION_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//        public async Task<int> Save(miSCV.IMotivosCancelacion model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("Descripcion", model.Descripcion);
//                parameters.Add("Abrev", model.Abrev);
//                parameters.Add("Porcentaje", model.Porcentaje);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                return await helper.GetResultAsync(USP_SCV_MOTIVOSCANCELACION_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//    }
//}

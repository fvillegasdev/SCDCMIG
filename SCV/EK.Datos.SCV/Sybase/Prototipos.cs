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
//    public class Prototipos : EK.Datos.Kontrol.DAOBase, diSCV.IPrototipos
//    {
//        private const string USP_SCV_PROTOTIPOS_SELECT = "{call usp_scv_prototipos_select(?,?)}";
//        private const string USP_SCV_PROTOTIPOS_INS_UPD = "{call usp_scv_prototipos_ins_upd(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

//        public Prototipos(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public async Task<object[]> GetAll(int activos, bool kv)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value },
//                    { "activos", activos },
//                    { "kv", kv}
//                };
//                return await helper.CreateEntitiesAsync(USP_SCV_PROTOTIPOS_SELECT,
//                    CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<miSCV.IPrototipo> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id },
//                    { "activos", DBNull.Value }
//                };
//                return await helper.CreateSingleEntityAsync<miSCV.IPrototipo>(
//                    USP_SCV_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> Save(miSCV.IPrototipo model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("ID", model.ID);
//                parameters.Add("Clave", model.Clave);
//                parameters.Add("Nombre", model.Nombre);
//                parameters.Add("Descripcion", model.Descripcion);
//                parameters.Add("FrenteMinimo", model.FrenteMinimo);
//                parameters.Add("Construccion", model.Construccion);
//                parameters.Add("Recamaras", model.Recamaras);
//                parameters.Add("IdRecamara", model.IdRecamara);
//                parameters.Add("IdSalaTV", model.IdSalaTV);
//                parameters.Add("IdCuartoServicio", model.IdCuartoServicio);
//                parameters.Add("Banios", model.Banios);
//                parameters.Add("IdTipoInmueble", model.IdTipoInmueble);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);

//                return await helper.GetResultAsync(
//                    USP_SCV_PROTOTIPOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}

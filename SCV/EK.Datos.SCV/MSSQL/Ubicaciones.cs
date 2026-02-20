using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EK.Datos.SCV.MSSQL
{
    public class Ubicaciones
        : dk.DAOBaseGeneric<m.IUbicaciones>, d.IUbicaciones
    {
        private const string ENTITY_NAME = "scv_ubicaciones";
        private const string USP_SPV_UBICACIONES_SELECT = "usp_spv_ubicaciones_select";
        private const string USP_SCV_UBICACIONES_SELECT = "usp_scv_ubicaciones_select";
        private const string USP_SCV_UBICACION_ESTATUS_UPD = "usp_scv_ubicacion_estatus_upd";

        private const string USP_SCV_CONSULTA_UBICACIONES_SELECT = "usp_scv_consultaUbicaciones_select";
        private const string USP_SCV_REL_UBICACIONES_CONT_UPD = "usp_scv_rel_contratista_lote_upd_auto";

        private const string USP_SCV_UBICACION_ESPECIAL_SELECT = "usp_scv_ubicacionesEspecial_select";



        public Ubicaciones(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SPV_UBICACIONES_SELECT, null, ENTITY_NAME)
        {

        }
        public async Task<int> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                            {
                                { "ID", idUbicacion },
                                { "ClaveEstatus", claveEstatus }
                        };
                return await helper.GetResultAsync(USP_SCV_UBICACION_ESTATUS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<object> GetUbicacion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SPV_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        public async Task<object> GetConsultaUbicaciones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_CONSULTA_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public async Task<int> saveRelContratistaLote(Dictionary<string, object> parametros)
        {
            try
            {
                int res = await helper.GetResultAsync(USP_SCV_REL_UBICACIONES_CONT_UPD, CommandType.StoredProcedure, parametros);
                return res; //await helper.CreateEntitiesAsync(USP_SCV_CONSULTA_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetUbicacionesEspecial(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_UBICACION_ESPECIAL_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



    }
}
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Threading.Tasks;

//using datKontrol = EK.Datos.Kontrol.Interfaces;
//using datSCV = EK.Datos.SCV.Interfaces;
//using modelKontrol = EK.Modelo.Kontrol.Interfaces;
//using modelSCV = EK.Modelo.SCV.Interfaces;

//namespace EK.Datos.SCV.MSSQL
//{
//    public class Ubicaciones 
//        : EK.Datos.Kontrol.DAOBase, datSCV.IUbicaciones
//    {
//        private const string USP_SCV_UBICACIONES_SELECT = "usp_scv_ubicaciones_select";
//        private const string USP_SCV_UBICACIONES_INS_UPD = "usp_scv_ubicaciones_ins_upd";
//        private const string USP_SCV_UBICACION_ESTATUS_UPD = "usp_scv_ubicacion_estatus_upd";

//        protected override string EntityName
//        {
//            get
//            {
//                return "scv_ubicaciones_caracteristicas_adc";
//            }
//        }

//        public Ubicaciones(modelKontrol.IContainerFactory factory, datKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        public async Task<object[]> GetAll(int id, int disponibles)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", DBNull.Value},
//                    { "disponibles", disponibles}
//                };

//                return await helper.CreateEntitiesAsync(
//                    USP_SCV_UBICACIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch(Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<List<modelSCV.IUbicaciones>> Search(int idDesarrollo, string claveEstatus, string parametro)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>() {
//                    { "idDesarrollo", idDesarrollo },
//                    { "claveEstatus", string.IsNullOrEmpty(claveEstatus) ? (object) DBNull.Value : claveEstatus },
//                    { "search", parametro }
//                };

//                return await helper.CreateEntitiesAsync<modelSCV.IUbicaciones>(USP_SCV_UBICACIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<modelSCV.IUbicaciones> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id},
//                    { "disponibles", 0}
//                };
//                return await helper.CreateSingleEntityAsync<modelSCV.IUbicaciones>(
//                    USP_SCV_UBICACIONES_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> Save(modelSCV.IUbicaciones model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("ID", model.ID);
//                parameters.Add("Clave", model.Clave);
//                parameters.Add("Nombre", model.Nombre);
//                parameters.Add("IdSegmento", model.Segmento.ID);
//                parameters.Add("IdTipoUbicacion", model.TipoUbicacion.ID);
//                parameters.Add("SuperManzana", model.SuperManzana);
//                parameters.Add("Manzana", model.Manzana);
//                parameters.Add("Lote", model.Lote);
//                parameters.Add("Interior", model.Interior);
//                parameters.Add("NumeroExterior", model.NumeroExterior);
//                parameters.Add("Calle", model.Calle);
//                parameters.Add("IdDesarrollo", model.Desarrollo.ID);
//                parameters.Add("IdPrototipo", model.Prototipo.ID);
//                parameters.Add("IdCentroCosto", model.CentroCosto.ID);
//                parameters.Add("Superficie", model.Superficie);
//                parameters.Add("Excedente", model.Excedente);
//                parameters.Add("FrenteUbicacion", model.FrenteUbicacion);
//                parameters.Add("RUC", model.RUC);
//                parameters.Add("RUV", model.RUV);
//                parameters.Add("FechaHabitabilidad", model.FechaHabitabilidad);
//                parameters.Add("FechaProgramada", model.FechaProgramada);
//                parameters.Add("FechaEntrega", model.FechaEntrega);
//                parameters.Add("Descripcion", model.Descripcion);
//                parameters.Add("ColindanciaGeneral", model.ColindanciaGeneral);
//                parameters.Add("ColindanciaComun", model.ColindanciaComun);
//                parameters.Add("Observaciones", model.Observaciones);
//                parameters.Add("IdEstatusUbicacion", model.EstatusUbicacion.ID);
//                parameters.Add("CreadoPor", model.IdCreadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);

//                return await helper.GetResultAsync(USP_SCV_UBICACIONES_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch(Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<int> DeleteRelacion(int idRelacion)
//        {
//            return await base.DeleteEntity(idRelacion, "ID", EntityName);
//        }

//        public async Task<int> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                    {
//                        { "ID", idUbicacion },
//                        { "ClaveEstatus", claveEstatus }
//                };
//                return await helper.GetResultAsync(USP_SCV_UBICACION_ESTATUS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }
//    }
//}

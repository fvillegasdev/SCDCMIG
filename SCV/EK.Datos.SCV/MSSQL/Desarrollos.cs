using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using diKontrol = EK.Datos.Kontrol.Interfaces;
using diSCV = EK.Datos.SCV.Interfaces;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using miSCV = EK.Modelo.SCV.Interfaces;
using miSBO = EK.Modelo.SBO.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.MSSQL
{
    public class Desarrollos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrollos>, d.SCV.Interfaces.IDesarrollos
    {
        private const string USP_SCV_DESARROLLO_SELECT = "usp_scv_Desarrollos_select";
        private const string USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT = "usp_scv_desarrollos_prototipos_select";
        private const string USP_SCV_DESARROLLOS_SELECT = "usp_scv_Desarrollos_select";
        private const string USP_SCV_DESARROLLOS_CUENTAS_SELECT = "usp_scv_desarrollos_CuentasBancarias_select";
        private const string USP_SCV_DESARROLLOS_ESQUEMAS_SELECT = "usp_scv_Desarrollos_Esquemas_select";
        private const string USP_SCV_DESARROLLOS_TIPOCOMERCIALIZACION_SELECT = "usp_scv_Desarrollo_TipoComercializacion_select";

        public Desarrollos(m.Kontrol.Interfaces.IContainerFactory factory,
                           d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_DESARROLLO_SELECT, null, "scv_Desarrollos")
        { }
        public async Task<object> GetByDesarrolloId(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SCV_DESARROLLOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }


        public async Task<m.SCV.Interfaces.IDesarrollos> GetByIdDesarrollo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IDesarrollos> (USP_SCV_DESARROLLOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}

//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Threading.Tasks;

//using diKontrol = EK.Datos.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using miSBO = EK.Modelo.SBO.Interfaces;

//namespace EK.Datos.SCV.MSSQL
//{
//    public class Desarrollos 
//        : EK.Datos.Kontrol.DAOBase, diSCV.IDesarrollos
//    {
//        private const string USP_SCV_DESARROLLOS_SELECT = "usp_scv_Desarrollos_select";
//        private const string USP_SCV_DESARROLLOS_INS_UPD = "usp_scv_Desarrollos_ins_upd";
//        private const string USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT = "usp_scv_desarrollos_prototipos_select";
//        private const string USP_SCV_DESARROLLOS_PROTOTIPOS_INS_UPD = "usp_scv_Desarrollos_Prototipos_ins_upd";
//        private const string USP_SCV_DESARROLLOS_PROTOTIPOS_DELETE = "usp_scv_desarrollo_prototipo_delete";
//        private const string USP_SCV_DESARROLLOS_CUENTAS_SELECT = "usp_scv_desarrollos_CuentasBancarias_select";
//        private const string USP_SCV_DESARROLLOS_CUENTAS_INS_UPD = "usp_scv_Desarrollos_CuentasBancarias_ins_upd";
//        private const string USP_SCV_DESARROLLOS_CUENTAS_DELETE = "usp_scv_Desarrollos_CuentasBancarias_delete";
//        private const string USP_SCV_DESARROLLOS_ESQUEMAS_INS_UPD = "usp_scv_Desarrollos_Esquemas_ins_upd";
//        private const string USP_SCV_DESARROLLOS_ESQUEMAS_SELECT = "usp_scv_Desarrollos_Esquemas_select";

//        public Desarrollos(miKontrol.IContainerFactory factory, diKontrol.IDBHelper helper)
//        {
//            base.factory = factory;
//            base.helper = helper;
//        }

//        protected override string EntityName
//        {
//            get
//            {
//                return "SCV_Desarrollos_Esquemas";
//            }
//        }

//        public async Task<object[]> GetAll(int id, int activos)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"id",DBNull.Value },
//                    {"activos",activos }
//                };
//                var result = await helper.CreateEntitiesAsync(USP_SCV_DESARROLLOS_SELECT, CommandType.StoredProcedure, parameters);
//                return result;
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<miSCV.IDesarrollo> GetById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    {"id",id },
//                    {"activos",0 }
//                };
//                return await helper.CreateSingleEntityAsync<miSCV.IDesarrollo>(USP_SCV_DESARROLLOS_SELECT, CommandType.StoredProcedure, parameters);


//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> Save(miSCV.IDesarrollo model)
//        {
//            try
//            {
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("Clave", model.Clave);
//                parameters.Add("Descripcion", model.Descripcion);
//                parameters.Add("IdCentroCosto", model.CentroCosto.ID);
//                parameters.Add("Direccion", model.Direccion);
//                parameters.Add("CodigoPostal", model.CodigoPostal);
//                parameters.Add("IdLocalidad", model.Localidad.ID);
//                parameters.Add("IdNotario", model.Notario.ID);
//                parameters.Add("IdMoneda", model.Moneda.ID);
//                parameters.Add("NombreRep", model.NombreRep);
//                parameters.Add("TelefonoRep", model.TelefonoRep);
//                parameters.Add("ExtensionRep", model.ExtensionRep);
//                parameters.Add("Sector", model.Sector);
//                parameters.Add("SegmentaPrecios", model.SegmentaPrecios);
//                parameters.Add("IdCompania", model.Compania.ID);
//                parameters.Add("ClaveConjunto", model.ClaveConjunto);
//                parameters.Add("NombreAcreedor", model.NombreAcreedor);
//                parameters.Add("RFCAcreedor", model.RFCAcreedor);
//                parameters.Add("ClabeAcreedor", model.ClabeAcreedor);
//                parameters.Add("IdEstatus", model.IdEstatus);
//                parameters.Add("CreadoPor", model.IdModificadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                parameters.Add("PrecioExcedenteM2", model.PrecioExcedenteM2);
//                return await helper.GetResultAsync(USP_SCV_DESARROLLOS_INS_UPD, CommandType.StoredProcedure, parameters);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }


//        public async Task<object[]> GetComisionesById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                 };

//                return await helper.CreateEntitiesAsync(USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }


//        public async Task<List<miSCV.IDesarrolloPrototipo>> GetPrototiposById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                 };

//                return await helper.CreateEntitiesAsync<miSCV.IDesarrolloPrototipo>(USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }


//        public async Task<int> SavePrototipos(int? IdDesarrollo, miSCV.IDesarrolloPrototipo model)
//        {
//            try
//            {
//                object result;
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("IdDesarrollo", IdDesarrollo);
//                parameters.Add("IdPrototipo", model.Prototipo.ID);
//                parameters.Add("PrecioBase", model.PrecioBase);
//                parameters.Add("CreadoPor", model.IdModificadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                result = await helper.GetResultAsync(USP_SCV_DESARROLLOS_PROTOTIPOS_INS_UPD, CommandType.StoredProcedure, parameters);
//                return (int)result;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<int> EliminarPrototipos(int? IdDesarrollo, miSCV.IDesarrolloPrototipo model)
//        {
//            try
//            {

//                object result;
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("IdDesarrollo", IdDesarrollo);
//                parameters.Add("IdPrototipo", model.Prototipo.ID);
//                result = await helper.GetResultAsync(USP_SCV_DESARROLLOS_PROTOTIPOS_DELETE, CommandType.StoredProcedure, parameters);
//                return (int)result;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<List<miSBO.ICuentaBancaria>> GetCuentasById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                 };

//                return await helper.CreateEntitiesAsync<miSBO.ICuentaBancaria>(USP_SCV_DESARROLLOS_CUENTAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//        public async Task<int> SaveCuentas(int? IdDesarrollo, miSBO.ICuentaBancaria model)
//        {
//            try
//            {
//                object result;
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("IdDesarrollo", IdDesarrollo);
//                parameters.Add("IdCuenta", model.ID);
//                parameters.Add("IdEstatus", model.Estatus.ID);
//                parameters.Add("CreadoPor", model.IdModificadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                result = await helper.GetResultAsync(USP_SCV_DESARROLLOS_CUENTAS_INS_UPD, CommandType.StoredProcedure, parameters);
//                return (int)result;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        public async Task<int> EliminarCuentas(int? IdDesarrollo, miSBO.ICuentaBancaria model)
//        {
//            try
//            {

//                object result;
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("IdDesarrollo", IdDesarrollo);
//                parameters.Add("IdCuenta", model.ID);
//                result = await helper.GetResultAsync(USP_SCV_DESARROLLOS_CUENTAS_DELETE, CommandType.StoredProcedure, parameters);
//                return (int)result;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        //public async Task<List<miSBO.ICuentaBancaria>> GetCuentasById(int id)
//        //{
//        //    try
//        //    {
//        //        var parameters = new Dictionary<string, object>
//        //        {
//        //            { "id", id}
//        //         };

//        //        return await helper.CreateEntitiesAsync<miSBO.ICuentaBancaria>(USP_SCV_DESARROLLOS_CUENTAS_SELECT, CommandType.StoredProcedure, parameters);
//        //    }
//        //    catch
//        //    {
//        //        throw;
//        //    }
//        //}

//        public async Task<int> SaveEsquema(int? IdDesarrollo, miSCV.IDesarrolloEsquema model)
//        {
//            try
//            {

//                object result;
//                Dictionary<string, object> parameters = new Dictionary<string, object>();
//                parameters.Add("Id", model.ID);
//                parameters.Add("IdDesarrollo", IdDesarrollo);
//                parameters.Add("IdEsquema", model.Esquema.ID);
//                parameters.Add("CreadoPor", model.IdModificadoPor);
//                parameters.Add("ModificadoPor", model.IdModificadoPor);
//                result = await helper.GetResultAsync(USP_SCV_DESARROLLOS_ESQUEMAS_INS_UPD, CommandType.StoredProcedure, parameters);
//                return (int)result;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }
//        public async Task<int> EliminaRelacionEsquema(int id)
//        {
//            return await base.DeleteEntity(id, "ID", EntityName);
//        }


//        public async Task<List<miSCV.IDesarrolloEsquema>> GetEsquemasById(int id)
//        {
//            try
//            {
//                var parameters = new Dictionary<string, object>
//                {
//                    { "id", id}
//                 };

//                return await helper.CreateEntitiesAsync<miSCV.IDesarrolloEsquema>(USP_SCV_DESARROLLOS_ESQUEMAS_SELECT, CommandType.StoredProcedure, parameters);
//            }
//            catch
//            {
//                throw;
//            }
//        }

//    }
//}

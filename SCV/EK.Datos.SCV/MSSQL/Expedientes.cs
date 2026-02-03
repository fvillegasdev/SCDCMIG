using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Data;

namespace EK.Datos.SCV.MSSQL
{
    public class Expedientes
        : dk.DAOBaseGeneric<m.IExpediente>, d.IExpedientes
    {
        private const string USP_SCV_EXPEDIENTES_SELECT = "usp_scv_Expedientes_select";
        private const string USP_SCV_EXPEDIENTES_SELECT_V2 = "usp_scv_Expedientes_select_V2";
        private const string USP_SCV_EXPEDIENTES_ESCRITURACION_SELECT = "usp_scv_Expedientes_EnEscrituracion";

        private const string USP_ADMINISTRACIONDOCUMENTOS_SELECT = "usp_AdministracionDocumentos_Select";




        public Expedientes(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_EXPEDIENTES_SELECT, null, "scv_Expedientes")
        {
        }

        public async Task<m.IExpediente> GetByIdV2(int id)
        {
            return await BaseGetById(USP_SCV_EXPEDIENTES_SELECT_V2, id);
        }

        public async Task<object> GetExpedienteEnEscrituracion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SCV_EXPEDIENTES_ESCRITURACION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetGestionDocumentos(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_ADMINISTRACIONDOCUMENTOS_SELECT,CommandType.StoredProcedure,parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

 

        //public override Task<m.IExpediente> Save(m.IExpediente model)
        //{
        //    var p = new Dictionary<string, object>();
        //    p.Add("Id", model.ID);
        //    p.Add("Clave", model.Clave);
        //    p.Add("IdCliente", model.IdCliente);
        //    //p.Add("IdOwner", model.IdOwner);
        //    p.Add("IdEstatusExpediente", model.IdEstatusExpediente);
        //    p.Add("IdEstatus", model.IdEstatus);
        //    p.Add("CreadoPor", model.IdModificadoPor);
        //    p.Add("ModificadoPor", model.IdModificadoPor);

        //    return base.BaseSave(this.defaultSave, p);
        //}
    }
}
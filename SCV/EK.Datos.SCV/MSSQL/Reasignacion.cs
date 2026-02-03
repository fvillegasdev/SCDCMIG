using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Data;

namespace EK.Datos.SCV.MSSQL
{
    public class Reasignacion
        :dk.DAOBaseGeneric<m.IReasignacion>,d.IReasignacion
    {
        private const string ENTITY_NAME = "Reasignacion";
        private const string USP_SCV_REASIGNACION = "usp_ReasignacionExpedientes_reporte";
        private const string USP_REASIGNACION_PROSPECTOS_REPORTE = "usp_ReasignacionProspectos_reporte";
        private const string USP_REASIGNACION_EXPEDIENTES_REPORTE = "usp_ReasignacionExpedientes_reporte";
        private const string USP_REASIGNACION_EXPEDIENTE_UPD = "usp_reasignacion_expediente_upd";
        private const string USP_REASIGNACION_PROSPECTO_UPD = "usp_reasignacion_prospecto_upd";
        public Reasignacion(mki.IContainerFactory factory,dki.IDBHelper helper)
            :base(factory,helper, USP_SCV_REASIGNACION, null,ENTITY_NAME)
        {
        }

        public async Task<object> GetSaveReassignmentProspects(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_REASIGNACION_PROSPECTO_UPD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetSaveReassignmentExpedients(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_REASIGNACION_EXPEDIENTE_UPD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetReasignacionProspectos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_REASIGNACION_PROSPECTOS_REPORTE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> GetReasignacionExpedientes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_REASIGNACION_EXPEDIENTES_REPORTE, CommandType.StoredProcedure,parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}

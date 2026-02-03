using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Data;


namespace EK.Datos.SCV.MSSQL
{
    public class AnalisisProspecto
        : dk.DAOBaseGeneric<m.SCV.Interfaces.IAnalisisProspecto>, d.SCV.Interfaces.IAnalisisProspecto
    {
        private const string ENTITY_NAME = "AnalisisProspecto";

        private const string USP_SCV_ANALISIS_PROSPECTO_SELECT = "usp_scv_Analisis_Prospecto_select";
        private const string USP_SCV_REPORTE_ANALISIS_PROSPECTO = "usp_scv_Reporte_AnalisisProspecto";


        public AnalisisProspecto(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_ANALISIS_PROSPECTO_SELECT, null, ENTITY_NAME)
        {
        }

        public async Task<object> GetAllAnalisisProspecto(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_ANALISIS_PROSPECTO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetReporteJerarquicoAnalisisProspecto(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_ANALISIS_PROSPECTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class ReporteExpedientes
        : dk.DAOBaseGeneric<m.IReporteExpedientes>, d.IReporteExpedientes
    {
        private const string ENTITY_NAME = "ReporteExpedientes";
        private const string USP_SCV_REPORTE_BOLETASPROSPECCION_SELECT = "usp_SCV_ExpedientesReporte";

        public ReporteExpedientes(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_REPORTE_BOLETASPROSPECCION_SELECT, null, ENTITY_NAME)
        { }

        public async Task<object> GetAllReporteExpedientes(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_BOLETASPROSPECCION_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

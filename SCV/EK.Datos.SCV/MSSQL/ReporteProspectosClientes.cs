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
    public class ReporteProspectosClientes
        : dk.DAOBaseGeneric<m.IReporteProspectosClientes>, d.IReporteProspectosClientes
    {
        private const string ENTITY_NAME = "ReporteProspectosClientes";
        private const string USP_SCV_REPORTE_PROSPECTOSCLIENTES_SELECT = "usp_scv_Reporte_ProspectosClientes_select";

        public ReporteProspectosClientes(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_REPORTE_PROSPECTOSCLIENTES_SELECT, null, ENTITY_NAME)
        { }

        public async Task<object> GetAllReporteProspectosClientes(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_REPORTE_PROSPECTOSCLIENTES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

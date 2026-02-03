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
    public class ReporteBoletasProspeccion
        : dk.DAOBaseGeneric<m.IReporteBoletasProspeccion>, d.IReporteBoletasProspeccion
    {
        private const string ENTITY_NAME = "ReporteBoletasProspeccion";
        private const string USP_SCV_REPORTE_BOLETASPROSPECCION_SELECT = "usp_scv_Reporte_BoletasProspeccion_select";

        public ReporteBoletasProspeccion(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_REPORTE_BOLETASPROSPECCION_SELECT, null, ENTITY_NAME)
        { }

        public async Task<object> GetAllReporteBoletasProspeccion(Dictionary<string, object> parameters)
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

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
    public class ReporteConsultaProspectos
        : dk.DAOBaseGeneric<m.IReporteConsultaProspectos>, d.IReporteConsultaProspectos
    {
        private const string ENTITY_NAME = "uvw_SCV_Reporte_Consulta_Prospectos";
        private const string USP_SCV_ReporteConsultaProspectos = "usp_SCV_Reporte_ConsultaProspecto";

        public ReporteConsultaProspectos(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_ReporteConsultaProspectos, null, ENTITY_NAME)
        { }

        public async Task<object> GetAllReporteConsultaProspectos(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_ReporteConsultaProspectos, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

using System;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

namespace EK.Datos.SCV.Sybase17
{
    public class ReporteEncuestaSatisfaccion : dk.DAOBaseGeneric<m.IReporteEncuestaSatisfaccion>, d.IReporteEncuestaSatisfaccion
    {
        private const string ENTITY_NAME = "ReporteEncuestaSatisfaccion";
        private const string USP_REPORTEENSA_SELECT = "usp_spv_reporte_encuesta_satisfaccion_select";

        public ReporteEncuestaSatisfaccion(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_REPORTEENSA_SELECT, null, ENTITY_NAME) { }
        public async Task<List<m.IReporteEncuestaSatisfaccion>> GetReporte(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "TABLA");
                return await helper.CreateEntitiesAsync<m.IReporteEncuestaSatisfaccion>(USP_REPORTEENSA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.IReporteEncuestaSatisfaccion>> GetGrafica(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "GRAFICA");
                return await helper.CreateEntitiesAsync<m.IReporteEncuestaSatisfaccion>(USP_REPORTEENSA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

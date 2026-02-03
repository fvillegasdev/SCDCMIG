using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
   public class ReporteAnalisisComunidades 
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReporteAnalisisComunidades>, d.SCV.Interfaces.IReporteAnalisisComunidades
    {
        public const string USP_SPV_ANALISIS_COMUNIDADN_SELECT = "usp_sv_analisis_comunidad_SELECT";
        public const string USP_SPV_ANALISIS_COMUNIDADN_INS = "usp_sv_analisis_comunidad_INS";
        public const string USP_SV_CUENTAS_ANALISIS_COMUNIDAD = "usp_sv_getcuentas_analisis_comunidad";
        public ReporteAnalisisComunidades(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
           : base(factory, helper, USP_SPV_ANALISIS_COMUNIDADN_SELECT, null, "ReporteAnalisisComunidades")
        { }

        public async Task<int> SaveReporte(Dictionary<string, object> parametros)
        {
            try
            {
                int res = await helper.GetResultAsync(USP_SPV_ANALISIS_COMUNIDADN_INS, CommandType.StoredProcedure, parametros);

                //return await helper.CreateEntitiesAsync(
                //    USP_SPV_ANALISIS_COMUNIDADN_INS, CommandType.StoredProcedure, parametros);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        } 
        
        public async Task<m.SCV.Interfaces.IReporteAnalisisComunidades> getCuentasForAnalisis(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IReporteAnalisisComunidades>(
                    USP_SV_CUENTAS_ANALISIS_COMUNIDAD, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public async Task<List<m.SCV.Interfaces.IReporteAnalisisComunidades>> getConsultaReporteAnalisis(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteAnalisisComunidades>(
                    USP_SPV_ANALISIS_COMUNIDADN_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

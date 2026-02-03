using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class ContribucionPorPlaza
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IContribucionPorPlaza>, d.SCV.Interfaces.IContribucionPorPlaza
    {
        private const string USP_SPV_CONTRIBUCION_PLAZA_SELECT = "usp_spv_Contribucion_Plaza_select";
        private const string USP_SPV_CONSULTA_FALLAS_TOP_INCIDENCIAS_SELECT = "usp_spv_Consulta_Fallas_Top_Incidencias_select";
        public ContribucionPorPlaza(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SPV_CONTRIBUCION_PLAZA_SELECT,
                  string.Empty,
                  "")
        {
        }

        public async Task<object[]> GetConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(
                    USP_SPV_CONTRIBUCION_PLAZA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetConsultaTopIncidencias(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SPV_CONSULTA_FALLAS_TOP_INCIDENCIAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
    }
}
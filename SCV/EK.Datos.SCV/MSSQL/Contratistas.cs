using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class Contratistas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IContratista>, d.SCV.Interfaces.IContratistas
    {
        private const string USP_SPV_CONTRATISTAS_SELECT = "usp_spv_Contratistas_select";
        private const string USP_SPV_CONTRATISTAS_ORDENESTRABAJO_SELECT = "usp_spv_Contratistas_OrdenesTrabajo_select";
        private const string USP_SPV_CONTRATISTAS_ORDENESTRABAJO_AREAS_COMUNES_SELECT = "usp_spv_Contratistas_OrdenesTrabajo_selectAreasComunes";

        public Contratistas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONTRATISTAS_SELECT, null, "SU_CONTRATISTAS")
        { }

        public async Task<List<m.SCV.Interfaces.IAgendaContratistaDetalle>> GetOrdenesTrabajo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaContratistaDetalle>(
                    USP_SPV_CONTRATISTAS_ORDENESTRABAJO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetOrdenesTrabajoAreasComunes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>(
                    USP_SPV_CONTRATISTAS_ORDENESTRABAJO_AREAS_COMUNES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
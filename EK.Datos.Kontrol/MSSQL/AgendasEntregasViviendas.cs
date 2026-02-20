using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class AgendasEntregasViviendas
        : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IAgendaEntVivienda>, d.Kontrol.Interfaces.IAgendaEntVivienda

    {
        private const string USP_SPV_AGENDA_DETALLE_SELECT = "usp_spv_agenda_detalle_select";
        private const string USP_SPV_ACTUALIZA_FECHA_CONSTRUC_INS_UPD = "usp_spv_agendaentvivienda_ins_upd";

        public AgendasEntregasViviendas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_AGENDA_DETALLE_SELECT, null, "AgendaEntVivienda")
        { }

        public async Task<int> SaveAgendaEntregaVivienda(m.Kontrol.Interfaces.IAgendaEntVivienda item, m.Kontrol.Interfaces.IItemGeneral estatusAgenda)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("IdAgenda", item.IdAgenda);
                parameters.Add("IdExpediente", item.IdExpediente);
                parameters.Add("IdEstatusAgenda", estatusAgenda.ID);
                parameters.Add("IdUsuarioAsignado", item.IdUsuarioAsignado);
                parameters.Add("Id", item.ID);
                parameters.Add("IdEstatus", item.IdEstatus);
                parameters.Add("CreadoPor", item.IdCreadoPor);
                parameters.Add("ModificadoPor", item.IdModificadoPor);
                parameters.Add("TipoAgenda", item.TipoAgenda);

                return await helper.GetResultAsync(USP_SPV_ACTUALIZA_FECHA_CONSTRUC_INS_UPD, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

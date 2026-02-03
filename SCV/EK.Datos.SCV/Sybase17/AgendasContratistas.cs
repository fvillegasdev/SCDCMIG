using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class AgendasContratistas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAgendaContratista>, d.SCV.Interfaces.IAgendasContratistas
    {
        private const string USP_AGENDA_SELECT = "usp_agenda_select";
        private const string USP_FECHASBLOQUEADAS_VERIFICAR_SELECT = "usp_fechasbloqueadascat_verificar_select";

        public AgendasContratistas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_AGENDA_SELECT, null, "Agenda")
        { }

        public async Task<int> VerificarFechasAgendaContratista(m.SCV.Interfaces.IAgendaContratista item)
        {
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "FechaInicio", item.FechaInicio }, {"FechaFin", item.FechaFin }, {"IdUsuario",item.IdResponsableDictamen}
                };
                return await helper.GetResultAsync(USP_FECHASBLOQUEADAS_VERIFICAR_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
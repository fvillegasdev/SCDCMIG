using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class AgendasDictamenes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAgendaDictamen>, d.SCV.Interfaces.IAgendasDictamenes
    {
        private const string USP_AGENDA_SELECT = "usp_agenda_select";
        private const string USP_FECHASBLOQUEADAS_VERIFICAR_SELECT = "usp_fechasbloqueadascat_verificar_select";

        public AgendasDictamenes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_AGENDA_SELECT, null, "Agenda")
        { }

        public async Task<int> VerificarFechasAgendaDictamen(m.SCV.Interfaces.IAgendaDictamen item)
        {
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "FechaInicio", item.FechaInicio }, {"FechaFin", item.FechaFin }, {"IdUsuario",item.IdUsuarioAsignado}
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
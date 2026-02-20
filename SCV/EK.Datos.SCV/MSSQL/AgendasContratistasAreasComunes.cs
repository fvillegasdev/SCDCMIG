using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class AgendasContratistasAreasComunes : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAgendaContratistaAreasComunes>, d.SCV.Interfaces.IAgendasContratistasAreasComunes
    {
        private const string USP_AGENDA_SELECT = "usp_agenda_select";

        public AgendasContratistasAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
           : base(factory, helper, USP_AGENDA_SELECT, null, "Agenda")
        { }
    }
}

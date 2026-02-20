using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class AgendasDictamenesAreasComunes
          : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAgendaDictamenAreasComunes>, d.SCV.Interfaces.IAgendasDictamenesAreasComunes
    {
        private const string USP_AGENDA_SELECT = "usp_agenda_select";

        public AgendasDictamenesAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_AGENDA_SELECT, null, "Agenda")
        { }
    }
}

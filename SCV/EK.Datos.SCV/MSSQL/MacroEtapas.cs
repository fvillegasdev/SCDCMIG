using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.MSSQL
{
    public class MacroEtapas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IMacroEtapa>, d.SCV.Interfaces.IMacroEtapas
    {
        private const string USP_SCV_MACROETAPAS_SELECT = "usp_scv_MacroEtapas_select";
        public MacroEtapas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_MACROETAPAS_SELECT, null, "scv_MacroEtapas") { }
    }
}

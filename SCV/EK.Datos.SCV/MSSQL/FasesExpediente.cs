using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class FasesExpediente
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFaseExpediente>, d.SCV.Interfaces.IFasesExpediente
    {
        private const string USP_SCV_FASESEXPEDIENTE_SELECT = "usp_scv_FasesExpediente_select";
        public FasesExpediente(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_FASESEXPEDIENTE_SELECT, null, "scv_FasesExpediente")
        { }
    }
}
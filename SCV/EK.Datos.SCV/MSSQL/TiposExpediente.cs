using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TiposExpediente
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITiposExpediente>, d.SCV.Interfaces.ITiposExpediente
    {
        private const string ENTITY_NAME = "SCV_TiposExpediente";
        private const string USP_SCV_TIPOSEXPEDIENTES_SELECT = "usp_scv_TiposExpedientes_select";

        public TiposExpediente(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_TIPOSEXPEDIENTES_SELECT, null, ENTITY_NAME)
        { }
    }
}

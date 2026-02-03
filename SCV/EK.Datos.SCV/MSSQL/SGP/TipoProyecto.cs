using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SGP.Interfaces;
using m = EK.Modelo.SGP.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SGP.MSSQL
{
    public class TipoProyecto
        : dk.DAOBaseGeneric<m.ITipoProyecto>, d.ITipoProyecto
    {
        private const string ENTITY_NAME = "sgp_TipoProyecto";
        private const string USP_SGP_TIPOPROYECTO_SELECT = "usp_sgp_TipoProyecto_select";

        public TipoProyecto(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SGP_TIPOPROYECTO_SELECT, null, ENTITY_NAME)
        { }
    }
}

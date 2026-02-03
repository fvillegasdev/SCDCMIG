using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class TiposDeProcesos
        : dk.DAOBaseGeneric<m.ITiposDeProceso>, d.ITiposDeProcesos
    {
        private const string ENTITY_NAME = "scv_GeneracionPoliza_TiposDeProcesos";
        private const string USP_SCV_TIPOSDEPROCESOS_SELECT = "usp_scv_GeneracionPoliza_TiposDeProcesos_select";

        public TiposDeProcesos(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_TIPOSDEPROCESOS_SELECT, null, ENTITY_NAME)
        { }
    }
}

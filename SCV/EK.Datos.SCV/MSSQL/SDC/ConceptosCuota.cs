using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SDC.Interfaces;
using m = EK.Modelo.SDC.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SDC.MSSQL
{
    public class ConceptosCuota
        : dk.DAOBaseGeneric<m.IConceptosCuota>, d.IConceptosCuota
    {
        private const string ENTITY_NAME = "SDC_ConceptosCuota";
        private const string USP_SCV_CONCEPTOSCUOTA_SELECT = "usp_sdc_ConceptosCuota _select";

        public ConceptosCuota(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_CONCEPTOSCUOTA_SELECT, null, ENTITY_NAME)
        { }
    }
}
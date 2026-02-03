using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;
using EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class ConceptosCredito
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IConceptosCredito>, d.SCV.Interfaces.IConceptosCredito
    {
        private const string USP_SCV_CONCEPTOSCREDITO_SELECT = "usp_scv_ConceptosCredito_select";

        public ConceptosCredito(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_CONCEPTOSCREDITO_SELECT, null, "scv_ConceptosCredito")
        { }

    }
}
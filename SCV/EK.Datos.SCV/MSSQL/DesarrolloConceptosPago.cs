using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrolloConceptosPago
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloConceptosPago>, d.SCV.Interfaces.IDesarrolloConceptosPago
    {
        private const string USP_SCV_DESARROLLOS_CONCEPTOSPAGO_SELECT = "usp_scv_DesarrollosConceptosPago";
        public DesarrolloConceptosPago(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_CONCEPTOSPAGO_SELECT,
                  string.Empty,
                  "scv_DesarrollosConceptosPago")
        { }
    }
}

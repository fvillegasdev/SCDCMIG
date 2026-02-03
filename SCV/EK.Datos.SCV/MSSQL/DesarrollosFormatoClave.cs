using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosFormatoClave
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloFormatoClave>, d.SCV.Interfaces.IDesarrollosFormatoClave
    {
        private const string USP_SCV_DESARROLLOS_FORMATO_SELECT = "usp_scv_desarrollos_formato_select";
        public DesarrollosFormatoClave(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_FORMATO_SELECT,
                  string.Empty,
                  "scv_Desarrollos_FormatoClave")
        { }

    }
}

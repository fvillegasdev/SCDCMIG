using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Licencias
        : DAOBaseGeneric<m.Kontrol.Interfaces.ILicencia>, d.Kontrol.Interfaces.ILicencias
    {
        private const string USP_LICENCIAS_SELECT = "usp_licencias_select";
        public Licencias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_LICENCIAS_SELECT,
                  string.Empty,
                  "licencias")
        { }
    }
}
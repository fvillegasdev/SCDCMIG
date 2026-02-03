using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using System.Data;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.Kontrol.MSSQL
{
    public class CentroCosto
        : DAOBaseGeneric<m.Kontrol.Interfaces.ICentrosCosto>, d.Kontrol.Interfaces.ICentroCosto
    {
        private const string USP_CENTROCOSTO_SELECT = "usp_centrocosto_select";

        public CentroCosto(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CENTROCOSTO_SELECT, null, "CentroCosto")
        { }

    }
}

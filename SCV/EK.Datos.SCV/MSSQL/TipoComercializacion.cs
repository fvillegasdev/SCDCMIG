using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;
using EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class TipoComercializacion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoComercializacion>, d.SCV.Interfaces.ITipoComercializacion
    {
        private const string USP_SCV_TIPOSCOMERCIALIZACION_SELECT = "usp_scv_TiposComercializacion_select";

        public TipoComercializacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_TIPOSCOMERCIALIZACION_SELECT, null, "scv_TiposComercializacion")
        { }

    }
}
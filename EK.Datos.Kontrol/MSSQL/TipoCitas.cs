using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class TipoCitas
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITipoCitas>, d.Kontrol.Interfaces.ITipoCitas
    {
        private const string USP_TipoCitas_SELECT = "usp_TipoCitas_select";

        public TipoCitas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TipoCitas_SELECT,
                  string.Empty,
                  "tipoCitas")
        { }

    }
}

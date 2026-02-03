using System;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class TiposEvento
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITipoEvento>, d.Kontrol.Interfaces.ITiposEvento
    {
        private const string USP_TIPOSEVENTO_SELECT = "usp_tiposEvento_select";

        public TiposEvento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TIPOSEVENTO_SELECT,
                  string.Empty,
                  "TiposEvento")
        { }
    }
}

using System;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class TiposEntidad
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITipoEntidad>, d.Kontrol.Interfaces.ITiposEntidad
    {
        private const string USP_TIPOSENTIDAD_SELECT = "usp_tiposEntidad_select";

        public TiposEntidad(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TIPOSENTIDAD_SELECT,
                  string.Empty,
                  "TiposEntidad")
        { }
    }
}

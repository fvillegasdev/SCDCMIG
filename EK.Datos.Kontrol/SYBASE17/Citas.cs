using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Citas
        : DAOBaseGeneric<m.Kontrol.Interfaces.ICitas>, d.Kontrol.Interfaces.ICitas
    {
        private const string USP_CITAS_SELECT = "usp_Citas_select";

        public Citas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_CITAS_SELECT,
                  string.Empty,
                  "Citas")
        { }

    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Asentamientos
        : DAOBaseGeneric<m.Kontrol.Interfaces.IAsentamiento>, d.Kontrol.Interfaces.IAsentamientos
    {
        private const string USP_ASENTAMIENTOS_SELECT = "usp_asentamientos_select";

        public Asentamientos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_ASENTAMIENTOS_SELECT,
                  string.Empty,
                  "asentamientos")
        { }

    }
}

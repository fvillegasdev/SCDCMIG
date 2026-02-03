using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class NivelesReportes
        : DAOBaseGeneric<m.Kontrol.Interfaces.INivelesReportes>, d.Kontrol.Interfaces.INivelesReportes
    {
        public NivelesReportes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  string.Empty,
                  string.Empty,
                  "nivelesreportes")
        { }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class NivelesOpciones
    : DAOBaseGeneric<m.Kontrol.Interfaces.INivelesOpciones>, d.Kontrol.Interfaces.INivelesOpciones
    {

        public NivelesOpciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  "",
                  string.Empty,
                  "nivelesopciones")
        { }
    }
}
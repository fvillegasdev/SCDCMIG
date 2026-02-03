using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Clasificadores
        : DAOBaseGeneric<m.Kontrol.Interfaces.IClasificador>, d.Kontrol.Interfaces.IClasificadores
    {
        private const string USP_CLASIFICADORES_SELECT = "usp_clasificadores_select";

        public Clasificadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_CLASIFICADORES_SELECT,
              string.Empty,
              "clasificadores")
        { }
    }
}

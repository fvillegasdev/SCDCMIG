using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Datos.Kontrol.Interfaces;
using EK.Modelo.Kontrol.Interfaces;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class OpcionSistema
        : DAOBaseGeneric<m.Kontrol.Interfaces.IOpcion>, d.Kontrol.Interfaces.IOpcionSistema
    {
        private const string USP_OPCIONSISTEMA_SELECT = "usp_opciones_select";

        public OpcionSistema(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_OPCIONSISTEMA_SELECT,
                  null,
                  "opciones")
        { }
    }
}

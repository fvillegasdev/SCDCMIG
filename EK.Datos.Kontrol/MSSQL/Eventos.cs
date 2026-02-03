using System;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Eventos
        : DAOBaseGeneric<m.Kontrol.Interfaces.IEvento>, d.Kontrol.Interfaces.IEventos
    {
        private const string USP_EVENTOS_SELECT = "usp_eventos_select";

        public Eventos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_EVENTOS_SELECT,
                  string.Empty,
                  "Eventos")
        { }
    }
}

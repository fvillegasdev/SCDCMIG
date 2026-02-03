using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Monedas
        : DAOBaseGeneric<m.Kontrol.Interfaces.IMoneda>, d.Kontrol.Interfaces.IMonedas
    {
        private const string USP_MONEDAS_SELECT  = "usp_monedas_select";

        public Monedas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper, 
                  USP_MONEDAS_SELECT, 
                  string.Empty,
                  "monedas")
        {}
    }
}

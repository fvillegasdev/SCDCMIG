using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Companias
        : DAOBaseGeneric<m.Kontrol.Interfaces.ICompania>, d.Kontrol.Interfaces.ICompania
    {
        private const string USP_COMPANIAS_SELECT = "usp_companias_select";

        public Companias(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_COMPANIAS_SELECT, 
                  null,
                  "companias")
        { }
    }
}
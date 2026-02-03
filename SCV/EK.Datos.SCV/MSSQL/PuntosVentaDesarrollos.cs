using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class PuntosVentaDesarrollos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPuntosVentaDesarrollos>, d.SCV.Interfaces.IPuntosVentaDesarrollos
    {
        private const string USP_SCV_PUNTOSVENTA_DESARROLLOS_SELECT = "usp_scv_PuntosVenta_Desarrollos_select";
        public PuntosVentaDesarrollos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_PUNTOSVENTA_DESARROLLOS_SELECT,
                  string.Empty,
                  "scv_PuntosVenta_Desarrollos")
        { }

    }
}

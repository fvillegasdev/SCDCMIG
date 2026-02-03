using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Forecast
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IForecast>, d.SCV.Interfaces.IForecast
    {
        private const string USP_SCV_REPORTEFORECAST = "usp_scv_Forecast";

        public Forecast(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_REPORTEFORECAST,
                  string.Empty,
                  "scv_Forecast")
        { }


    }
}

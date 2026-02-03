using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.MSSQL
{
    public class Notarios
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.INotario>, d.SCV.Interfaces.INotarios
    {
        private const string USP_SCV_NOTARIOS_SELECT = "usp_scv_Notarios_select";

        public Notarios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_NOTARIOS_SELECT, null, "scv_Notarios")
        { }
    }
}
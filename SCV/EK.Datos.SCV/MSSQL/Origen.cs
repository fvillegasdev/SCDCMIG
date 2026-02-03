using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;



namespace EK.Datos.SCV.MSSQL
{
    public class Origen
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IOrigen>,
        d.SCV.Interfaces.IOrigen
    {
        private const string USP_ORIGEN_SELECT = "usp_scv_Origen_select";

        public Origen(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_ORIGEN_SELECT, null, "scv_Origen")
        { }

    }
}
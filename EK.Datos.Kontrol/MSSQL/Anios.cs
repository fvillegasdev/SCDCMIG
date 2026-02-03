using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.MSSQL
{
    public class Anios :
        d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IAnios>, d.Kontrol.Interfaces.IAnios
    {
        private const string USP_SCV_COMISION_SELECT = "usp_Anios_select";

        public Anios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_COMISION_SELECT, null, "Anios")
        { }
    }
}

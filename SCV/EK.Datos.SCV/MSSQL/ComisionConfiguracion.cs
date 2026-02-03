using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionConfiguracion :
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionConfiguracion>,
        d.SCV.Interfaces.IComisionConfiguracion
    {
        private const string USP_SCV_COMISION_CONFIGURACION_SELECT = "usp_scv_Comision_Configuraciones_select";

        public ComisionConfiguracion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_COMISION_CONFIGURACION_SELECT, null, "scv_Comision_Configuraciones")
        { }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.MSSQL
{
    public class ConfiguracionFormulario :
        d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IConfiguracionFormulario>, d.Kontrol.Interfaces.IConfiguracionFormulario
    {
        private const string USP_SCV_CONFIGURACION_FORMULARIO_SELECT = "usp_ConfiguracionFormularios_select";

        public ConfiguracionFormulario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_CONFIGURACION_FORMULARIO_SELECT, null, "ConfiguracionFormularios")
        { }
    }
}

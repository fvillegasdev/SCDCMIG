using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.MSSQL
{
    public class ConfiguracionFormularioEntidad :
        d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IIConfiguracionFormularioEntidad>, d.Kontrol.Interfaces.IConfiguracionFormularioEntidad
    {
        private const string USP_SCV_CONFIGURACION_FORMULARIO_ENTIDAD_SELECT = "usp_ConfiguracionFormulariosEntidades_select";

        public ConfiguracionFormularioEntidad(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_CONFIGURACION_FORMULARIO_ENTIDAD_SELECT, null, "ConfiguracionFormulariosEntidades")
        { }
    }
}

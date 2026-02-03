using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.MSSQL
{
    public class PersonalizarCamposSecciones :
        d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCamposSecciones>, d.Kontrol.Interfaces.IPersonalizarCamposSecciones
    {
        private const string USP_SCV_PERSONALIZAR_CAMPO_SECCION_SELECT = "usp_PersonalizarCamposSecciones_select";

        public PersonalizarCamposSecciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_PERSONALIZAR_CAMPO_SECCION_SELECT, null, "PersonalizarCamposSecciones")
        { }
    }
}

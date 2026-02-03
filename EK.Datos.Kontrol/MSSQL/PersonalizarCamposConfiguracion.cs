using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class PersonalizarCamposConfiguracion
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion>, d.Kontrol.Interfaces.IPersonalizarCamposConfiguracion
    {
        private const string USP_PERSONALIZAR_CAMPOS_CONFIGURACION_SELECT = "usp_PersonalizarCamposConfiguracion_select";
        
        public PersonalizarCamposConfiguracion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_PERSONALIZAR_CAMPOS_CONFIGURACION_SELECT,
                  string.Empty,
                  "PersonalizarCamposConfiguracion")
        { }

    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class PersonalizarCamposValores
        : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>, d.Kontrol.Interfaces.IPersonalizarCamposValores
    {
        private const string USP_PERSONALIZAR_CAMPOS_CONFIGURACION_SELECT = "usp_PersonalizarCampos_Valores_select";
        
        public PersonalizarCamposValores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_PERSONALIZAR_CAMPOS_CONFIGURACION_SELECT, string.Empty, "PersonalizarCamposValores")
        { }

    }
}

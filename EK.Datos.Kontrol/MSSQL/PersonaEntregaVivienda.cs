using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class PersonaEntregaVivienda
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPersonaEntregaVivienda>, d.Kontrol.Interfaces.IPersonaEntregaVivienda
    {
        private const string USP_PERSONAENTREGAVIVIENDA_SELECT = "usp_spv_personal_entrega_viv_select";

        public PersonaEntregaVivienda(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_PERSONAENTREGAVIVIENDA_SELECT,
                  string.Empty,
                  "PersonaEntregaVivienda")
        { }

    }
}

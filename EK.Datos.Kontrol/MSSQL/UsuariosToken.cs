using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class UsuariosToken
        : DAOBaseGeneric<m.Kontrol.Interfaces.IUsuarioToken>, d.Kontrol.Interfaces.IUsuariosToken
    {
        private const string USP_USUARIOS_TOKENS_SELECT = "usp_usuarios_tokens_select";

        public UsuariosToken(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_USUARIOS_TOKENS_SELECT, null, "usuariostokens")
        { }
    }
}

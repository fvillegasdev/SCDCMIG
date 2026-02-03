using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos.Kontrol;
using m = EK.Modelo.Kontrol;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class UsuarioNivelesCompania
        : DAOBaseGeneric<m.Interfaces.IUsuarioNivelCompania>, d.Interfaces.IUsuarioNivelesCompania
    {
        private const string USP_USUARIONIVELCOMPANIA_SELECT = "usp_usuarionivelcompania_select";

        public UsuarioNivelesCompania(m.Interfaces.IContainerFactory factory, d.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_USUARIONIVELCOMPANIA_SELECT, null, "usuarioNivelCompania")
        { }
    }
}

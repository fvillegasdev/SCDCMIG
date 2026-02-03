using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class GruposUsuario
      : DAOBaseGeneric<m.Kontrol.Interfaces.IGruposUsuario>, d.Kontrol.Interfaces.IGruposUsuario
    {
        private const string USP_GRUPOS_USUARIO_SELECT = "usp_Grupos_Usuario_select";
        public GruposUsuario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_GRUPOS_USUARIO_SELECT, null, "GruposUsuario") { }



    }
}

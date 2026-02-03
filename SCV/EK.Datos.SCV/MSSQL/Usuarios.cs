using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Usuarios
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAgente>, d.SCV.Interfaces.IUsuarios
    {
        private const string USP_USUARIOS_AGENTES = "usp_usuarios_agente_select";
        private const string USP_USUARIOS_SELECT_FILTRO = "usp_usuarios_select_filtro";

        public Usuarios(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_USUARIOS_AGENTES, string.Empty, "usuarios")
        { }
        
    }
}

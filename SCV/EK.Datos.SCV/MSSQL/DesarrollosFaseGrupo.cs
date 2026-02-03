using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosFaseGrupo
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloFaseGrupo>, d.SCV.Interfaces.IDesarrolloFaseGrupo
    {
        private const string USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT = "usp_scv_Desarrollos_Fase_Grupo_select";

        public DesarrollosFaseGrupo(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT,
                  string.Empty,
                  "scv_Desarrollos_Fase_Grupo")
        { }

    }
}

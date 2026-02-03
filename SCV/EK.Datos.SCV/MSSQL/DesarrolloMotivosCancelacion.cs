using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrolloMotivosCancelacion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloMotivoCancelacion>, d.SCV.Interfaces.IDesarrolloMotivosCancelacion
    {
        private const string USP_SCV_DESARROLLOS_MOTIVOSCANCELACION_SELECT = "usp_scv_DesarrollosMotivosCancelacion";
        public DesarrolloMotivosCancelacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_MOTIVOSCANCELACION_SELECT,
                  string.Empty,
                  "scv_DesarrollosMotivosCancelacion")
        { }
    }
}

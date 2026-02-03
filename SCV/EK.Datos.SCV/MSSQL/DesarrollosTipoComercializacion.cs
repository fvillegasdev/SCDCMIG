using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosTiposComercializacion
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloTiposComercializacion>, d.SCV.Interfaces.IDesarrollosTiposComercializacion
    {
        private const string USP_SCV_DESARROLLOS_TIPOCOMERCIALIZACION_SELECT = "usp_scv_Desarrollos_TipoComercializacion_select";

        public DesarrollosTiposComercializacion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_TIPOCOMERCIALIZACION_SELECT,
                  string.Empty,
                  "usp_scv_Desarrollos_TipoComercializacion_select")
        { }

        public async Task<object[]> GetDesarrollosTiposComercializacion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DESARROLLOS_TIPOCOMERCIALIZACION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

    }
}

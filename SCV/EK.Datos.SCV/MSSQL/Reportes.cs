using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Reportes
        : d.Kontrol.DAOBase, d.SCV.Interfaces.IReportes
    {
        private const string USP_SCV_CLIENTES_SELECT = "usp_scv_clientes_select";

        public Reportes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  string.Empty,
                  string.Empty,
                  string.Empty)
        { }

        public async Task<object[]> GetMonitoreoAgentes(Dictionary<string, object> parametros) {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_CLIENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosCentrosCosto
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloCentrosCosto>, d.SCV.Interfaces.IDesarrollosCentrosCosto
    {
        private const string USP_SCV_DESARROLLOS_CENTROSCOSTO_SELECT = "usp_scv_desarrollos_centrosCosto_select";

        public DesarrollosCentrosCosto(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_CENTROSCOSTO_SELECT,
                  string.Empty,
                  "scv_Desarrollos_CentrosCosto")
        { }

        public async Task<object[]> GetAllDesarrollosCentrosCosto(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DESARROLLOS_CENTROSCOSTO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosEsquemas
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloEsquema>, d.SCV.Interfaces.IDesarrollosEsquemas
    {
        private const string USP_SCV_DESARROLLOS_ESQUEMAS_SELECT = "usp_scv_Desarrollos_Esquemas_select";
        public DesarrollosEsquemas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_ESQUEMAS_SELECT,
                  string.Empty,
                  "scv_Desarrollos_Esquemas")
        { }

        public async Task<object[]> GetAllDesarrollosEsquemas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DESARROLLOS_ESQUEMAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<m.SCV.Interfaces.IDesarrolloEsquema> GetDesarrolloEsquema(int? idDesarrollo, int? idEsquema)
        {
            try
            {
                var parametros = new Dictionary<string, object>()
                {
                    { "idDesarrollo", idDesarrollo },
                    { "idEsquema", idEsquema }
                };

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IDesarrolloEsquema>(
                    USP_SCV_DESARROLLOS_ESQUEMAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
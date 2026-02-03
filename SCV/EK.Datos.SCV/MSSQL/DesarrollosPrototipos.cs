using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosPrototipos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrolloPrototipo>, d.SCV.Interfaces.IDesarrollosPrototipo
    {
        private const string USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT = "usp_scv_desarrollos_prototipos_select";

        public DesarrollosPrototipos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT,
                  string.Empty,
                  "scv_Desarrollos_Prototipos")
        { }

        public async Task<object[]> GetAllDesarrollosPrototipos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<m.SCV.Interfaces.IDesarrolloPrototipo> ObtenerPrototipoPorDesarrollo(int idDesarrollo, int idPrototipo)
        {
            try
            {
                Dictionary<string, object> parametros = new Dictionary<string, object> {
                    { "idDesarrollo", idDesarrollo },
                    { "idPrototipo", idPrototipo }
                };
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IDesarrolloPrototipo>(USP_SCV_DESARROLLOS_PROTOTIPOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}

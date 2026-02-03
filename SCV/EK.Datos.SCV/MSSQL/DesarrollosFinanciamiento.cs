using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class DesarrollosFinanciamiento
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IDesarrollosFinanciamiento>, d.SCV.Interfaces.IDesarrollosFinanciamiento
    {
        private const string USP_SCV_DESARROLLOS_FINANCIAMIENTOS_SELECT = "usp_scv_Desarrollos_Financiamientos_select";
        public DesarrollosFinanciamiento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_DESARROLLOS_FINANCIAMIENTOS_SELECT,
                  string.Empty,
                  "scv_Desarrollos_Financiamientos")
        { }

        public async Task<List<m.SCV.Interfaces.IDesarrollosFinanciamiento>> GetAllDesarrollosFinanciamientos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IDesarrollosFinanciamiento>(
                    USP_SCV_DESARROLLOS_FINANCIAMIENTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IDesarrollosFinanciamiento> GetDesarrolloFinanciamiento(int? idDesarrollo, int? idTipoFinanciamiento)
        {
            try
            {
                var parametros = new Dictionary<string, object>()
                {
                    { "idDesarrollo", idDesarrollo },
                    { "idTipoFinanciamiento", idTipoFinanciamiento }
                };

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IDesarrollosFinanciamiento>(
                    USP_SCV_DESARROLLOS_FINANCIAMIENTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
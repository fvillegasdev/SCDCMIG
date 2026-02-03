using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Tabuladores
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITabuladores>, d.SCV.Interfaces.ITabuladores
    {
        private const string USP_TABULADORES = "usp_scv_Tabuladores_select";

        public Tabuladores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_TABULADORES, string.Empty, "scv_Tabulador")
        {

        }

        public async Task<object> ObtenerEjecucionesPorTabulador(Dictionary<string, object> parameters)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TABULADORES, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("ObtenerEjecucionesPorTabulador::" + ex.Message, ex);
            }
        }

        public async Task<object> ObtenerTabuladorPorID(int id)
        {
            var parametros = new Dictionary<string, object> { { "id", id } };
            return await helper.CreateSingleEntityAsync(USP_TABULADORES, CommandType.StoredProcedure, parametros);
        }

    }
}

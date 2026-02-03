using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class LPExtensionVigencia
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ILPExtensionVigencia>, d.SCV.Interfaces.ILPExtensionVigencia
    {
        private const string USP_SCV_LISTA_PRECIOS_EXTENSION_VIGENCIA = "usp_scv_LPExtensionVigencia_Select";

        public LPExtensionVigencia(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_LISTA_PRECIOS_EXTENSION_VIGENCIA,
                  string.Empty,
                  "scv_ListaPreciosExtensionVigencia")
        { }

        public async Task<m.SCV.Interfaces.ILPExtensionVigencia> getExtensionVigencia(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.ILPExtensionVigencia>(USP_SCV_LISTA_PRECIOS_EXTENSION_VIGENCIA, CommandType.StoredProcedure, parametros);
            }
            catch(Exception ex)
            {
                string error = ex.ToString();
                throw;
            }
        }

    }
}

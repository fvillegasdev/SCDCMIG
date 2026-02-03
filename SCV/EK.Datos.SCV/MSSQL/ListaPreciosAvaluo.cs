using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ListaPreciosAvaluo
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListaPreciosAvaluo>, d.SCV.Interfaces.IListaPreciosAvaluo
    {
        private const string USP_SCV_LISTA_PRECIOS_AVALUO = "usp_scv_ListaPreciosAvaluo_Select";

        public ListaPreciosAvaluo(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_LISTA_PRECIOS_AVALUO,
                  string.Empty,
                  "scv_ListaPreciosAvaluo")
        { }

        public async Task<m.SCV.Interfaces.IListaPreciosAvaluo> obtenerValorAvaluoUbicacion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IListaPreciosAvaluo>(USP_SCV_LISTA_PRECIOS_AVALUO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("obtenerValorAvaluoUbicacion::" + ex.Message, ex);
            }
        }

    }
}

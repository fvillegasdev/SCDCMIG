using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ListaPreciosVersiones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListaPreciosVersiones>, d.SCV.Interfaces.IListaPreciosVersiones
    {
        private const string USP_SCV_LISTA_PRECIOS_VERSIONES = "usp_scv_ListaPreciosVersiones_Select";
        private const string USP_SCV_LISTAPRECIOS_DELETE = "usp_scv_ListaPreciosVersiones_Delete";

        public ListaPreciosVersiones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_LISTA_PRECIOS_VERSIONES,
                  string.Empty,
                  "scv_ListaPreciosVersiones")
        { }

        public override async Task<int> Delete(int id)
        {
            int retValue = -1;
            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idVersion", id },
                };
                retValue = await helper.GetResultAsync(USP_SCV_LISTAPRECIOS_DELETE, CommandType.StoredProcedure, parameters);
                return retValue;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }
    }
}

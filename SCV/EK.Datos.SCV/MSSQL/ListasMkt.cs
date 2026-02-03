using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.MSSQL
{
    public class ListasMkt
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListasMkt>,
        d.SCV.Interfaces.IListasMkt
    {
        private const string USP_LISTASMKT_SELECT = "usp_scv_ListasMkt_select";



        public ListasMkt(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_LISTASMKT_SELECT, null, "scv_ListasMkt")
        { }


        public async Task<m.SCV.Interfaces.IListasMkt> GetByListaMktId(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IListasMkt>(USP_LISTASMKT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }


        public async Task<List<m.SCV.Interfaces.IListasMkt>> GetAllParametros(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListasMkt>(USP_LISTASMKT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetAllParametros::" + ex.Message, ex);
            }
        }

        public async Task<m.SCV.Interfaces.IListasMkt> GetByIDParametros(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IListasMkt>(USP_LISTASMKT_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetByIDParametros::" + ex.Message, ex);
            }
        }



    }
}
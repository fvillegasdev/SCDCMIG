using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;



namespace EK.Datos.SCV.MSSQL
{
    public class ListasMktDet
     : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListasMktDet>,
        d.SCV.Interfaces.IListasMktDet
    {
        private const string USP_LISTASMKTDET_SELECT = "usp_scv_ListasMktDet_select";
        private const string USP_CRITERIO_SELECT = "usp_scv_Criterio_Valor_select";

        public ListasMktDet(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_LISTASMKTDET_SELECT, null, "scv_ListasMktDet")
        { }


        public async Task<object[]> Get(int idmodulo, int idcompania)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("idcompania", idcompania);
                parameters.Add("idmodulo", idmodulo);
                object[] retvalue = (await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListasMktDet>(USP_LISTASMKTDET_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
                return retvalue;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<m.SCV.Interfaces.IListasMktDet> Get(int ID)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("id", ID);
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IListasMktDet>(USP_LISTASMKTDET_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<m.SCV.Interfaces.IListasMktDet[]> Get(string nombre)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("nombre", nombre);
                return (await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListasMktDet>(USP_LISTASMKTDET_SELECT, CommandType.StoredProcedure, parameters)).ToArray();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Get::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.IListasMktDet>> GetAllConfiguracionCriterios(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListasMktDet>(USP_CRITERIO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetAllConfiguracionCriterios::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.IListasMktDet>> ConfiguracionCriterios(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListasMktDet>(USP_CRITERIO_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("ConfiguracionCriterios::" + ex.Message, ex);
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using System.Data;

using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.MSSQL
{
    public class SeguimientoCampaniaPublicidad
     : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>,
      d.SCV.Interfaces.ISeguimientoCampaniaPublicidad
    {
        private const string USP_SEGUIMIENTOCAMPANIA_SELECT = "usp_SCV_seguimientoCampaniapublicidad_select";
        private const string USP_SEGUIMIENTOCAMPANIA_EVENTS = "usp_SCV_seguimientoCampaniapublicidad_Events";
        private const string USP_SEGUIMIENTOCAMPANIA_LINKS = "usp_SCV_seguimientoCampaniapublicidad_Links";
        private const string USP_SEGUIMIENTOCAMPANIA_LINKDETAIL = "usp_SCV_seguimientoCampaniapublicidad_LinkDetail";
        private const string USP_SEGUIMIENTOCAMPANIA_EVENTDETAIL = "";


        public SeguimientoCampaniaPublicidad(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
           : base(factory, helper, USP_SEGUIMIENTOCAMPANIA_SELECT, null, "SeguimientoCampaniaPublicidad")
        { }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEvents(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>(USP_SEGUIMIENTOCAMPANIA_EVENTS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetEvents::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinks(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>(USP_SEGUIMIENTOCAMPANIA_LINKS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetLinks::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetLinkDetail(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>(USP_SEGUIMIENTOCAMPANIA_LINKDETAIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetLinkDetail::" + ex.Message, ex);
            }
        }

        public async Task<List<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>> GetEventDetail(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ISeguimientoCampaniaPublicidad>(USP_SEGUIMIENTOCAMPANIA_EVENTDETAIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("GetEventDetail::" + ex.Message, ex);
            }
        }


    }
}
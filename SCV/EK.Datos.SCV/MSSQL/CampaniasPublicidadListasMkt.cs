using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class CampaniasPublicidadListasMkt
    : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>, d.SCV.Interfaces.ICampaniaPublicidadListaMkt
    {
        private const string USP_SCV_CAMPANIAS_LISTASMKT_SELECT = "usp_scv_campanias_listasMkt_select";
        private const string USP_SCV_CAMPANIAS_LISTASMKT_UPDATEESTADO = "usp_CampaniasListasMarketing_UpdateEstadoListaAll";
        private const string USP_MKTLISTLOG_UPDATESTATUS = "usp_MktListLog_UpdateStatus";

        public CampaniasPublicidadListasMkt(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_CAMPANIAS_LISTASMKT_SELECT,
                  string.Empty,
                  "scv_campaniapublicidad_ListasMarketing")
        {        }
        public async Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateListasMarketingComplete(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>(USP_SCV_CAMPANIAS_LISTASMKT_UPDATEESTADO, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        public async Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateStatusMktListlog(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>(USP_MKTLISTLOG_UPDATESTATUS, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

    }
}
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.MSSQL
{
    public class ComisionesSeguimiento:
        d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComisionesSeguimiento>, d.SCV.Interfaces.IComisionesSeguimiento

    {

        private const string ENTITY_NAME = "scv_ComisionesSeguimiento";

        private const string USP_SCV_COMISIONESPOREXPEDIENTE_SELECT = "usp_scv_ComisionesPorExpediente";


        private const string USP_SCV_COMISIONES_SELECT = "usp_scv_ComisionesSeguimiento_select";
        private const string USP_SCV_COMISION_ETAPAS_SELECT = "usp_scv_Comisiones_EtapasPorPeriodo_select";

        public ComisionesSeguimiento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
         : base(factory, helper, USP_SCV_COMISIONES_SELECT, null, ENTITY_NAME)
        { }

        public async Task<object> GetComisiones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_COMISIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> GetEtapasEnCurso(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_COMISION_ETAPAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IExpediente> GetEtapaExiste(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IExpediente>(USP_SCV_COMISION_ETAPAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IComisionesSeguimiento> ExisteComision(int idExpediente, int idVentaUbicacion, int idUsuario, int idFase)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"idExpediente",idExpediente },
                    {"idVentaUbicacion",idVentaUbicacion },
                    {"idUsuario",idUsuario },
                    {"idFase",idFase }
                };
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IComisionesSeguimiento>(USP_SCV_COMISIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       

        public async Task<List<m.SCV.Interfaces.IComisionesSeguimientoDetalle>> ComisionesPorExpediente(int idExpediente)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"idExpediente",idExpediente }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IComisionesSeguimientoDetalle>(USP_SCV_COMISIONESPOREXPEDIENTE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}

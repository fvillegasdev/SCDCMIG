using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class ClasificacionViviendaPendienteEntrega : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>, d.SCV.Interfaces.IClasificacionViviendaPendienteEntrega
    {
        private const string USP_VIVIENDA_PENDIENTE_ENTREGA_SELECT = "usp_reporte_vivienda_pendiente_entrega";
        private const string USP_VIVIENDA_PENDIENTE_ENTREGA_INSERTUPDATE = "usp_vivienda_pendiente_entrega_inup";
        private const string USP_VIVIENDA_CONSULTA = "ups_consulta_clasificacion_vivienda_PE";
        private const string USP_VIVIENDA_CONSULTA_PROMEDIO_PLAZA = "ups_consulta_clasificacion_vivienda_promedio_plaza";
        private const string USP_VIVIENDA_CONSULTA_DETALLE = "ups_consulta_clasificacion_vivienda_detalle";
        private const string USP_VIVIENDA_CONSULTA_POR_PLAZA = "ups_consulta_clasificacion_vivienda_PE_por_plaza";
        public ClasificacionViviendaPendienteEntrega(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
         : base(factory, helper, USP_VIVIENDA_PENDIENTE_ENTREGA_SELECT, null, "sm_financiamiento_etapa")
        { }

        public async Task<List<IClasificacionViviendaPendienteEntrega>> ClasificadorSave(List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntregaParam> parametros)
        {
            try
            {
                List<IClasificacionViviendaPendienteEntrega> result = null;
                Dictionary<string, object> param = new Dictionary<string, object>();
                foreach (var x in parametros)
                {
                    param.Clear();
                    param.Add("IdClasificador", x.IdClasificador);
                    param.Add("Numcte", x.Numcte);
                    param.Add("lote", x.lote);
                    param.Add("ClaveClasificador", x.ClaveClasificador);
                    param.Add("Usuario", x.Usuario);
                    param.Add("Comentarios", x.Comentarios);
                    result =  await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>(USP_VIVIENDA_PENDIENTE_ENTREGA_INSERTUPDATE, CommandType.StoredProcedure, param);
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>> GetViviendaPendienteEntrega(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClasificacionViviendaPendienteEntrega>(USP_VIVIENDA_PENDIENTE_ENTREGA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReporteViviendaPE(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_VIVIENDA_CONSULTA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReporteViviendaPEPlaza(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_VIVIENDA_CONSULTA_POR_PLAZA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetReportePromedioDiasPlaza(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_VIVIENDA_CONSULTA_PROMEDIO_PLAZA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> GetReportePromedioDiasVivienda(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_VIVIENDA_CONSULTA_DETALLE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

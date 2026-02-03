using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;


namespace EK.Datos.SCV.Sybase17
{
    public class BitacorasClienteSPV
         : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IBitacoraClienteSPV>, d.SCV.Interfaces.IBitacorasClienteSPV
    {
        private const string USP_BASE_SELECT = "usp_spv_bitacora_cliente_spv_select";
        private const string USP_EVIDENCIAS_BITACORA_SELECT = "usp_spv_bitacora_evidencia_select";
        private const string USP_UPD_COMENTARIO = "usp_spv_bitacora_cliente_comentario_upd";
        public BitacorasClienteSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_BASE_SELECT, null, "BitacorasClienteSPV")
        { }


        public async Task<int> GetMaxPartida(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IKontrolFile>> GetEvidenciasBitacora(Dictionary<string, object> parametros)
        {
            try
            {

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IKontrolFile>(USP_EVIDENCIAS_BITACORA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> MarcarComentarioValidado(int IdComentario)
        {
            try
            {
                var param = new Dictionary<string, object>();
                param.Add("IdComentario", IdComentario);
                return await helper.GetResultAsync(USP_UPD_COMENTARIO, CommandType.StoredProcedure, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
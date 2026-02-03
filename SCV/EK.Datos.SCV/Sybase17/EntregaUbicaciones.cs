using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class EntregaUbicaciones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IEntregaUbicacion>, d.SCV.Interfaces.IEntregaUbicaciones
    {
        private const string USP_SPV_BASE_SELECT = "usp_spv_entrega_viviendas_select";

        public EntregaUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BASE_SELECT, null, "sv_programacion_entrega")
        { }

        public async Task<m.SCV.Interfaces.IEntregaUbicacionSeguimientoEtapa> getSeguimientoEtapa(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IEntregaUbicacionSeguimientoEtapa>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<int> actualizarSeguimientoEtapa(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
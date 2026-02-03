using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Datos.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class EntregaUbicacionesResponsables
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IEntregaUbicacionResponsable>, d.SCV.Interfaces.IEntregaUbicacionesResponsables
    {
        private const string USP_SPV_BASE_SELECT = "usp_spv_entrega_viviendas_select";

        public EntregaUbicacionesResponsables(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_BASE_SELECT, null, "sv_personal_entrega_viv")
        { }
        public async Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsable>> getInformacionPersonalEntrega(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IEntregaUbicacionResponsable>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>> getFraccionamientos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
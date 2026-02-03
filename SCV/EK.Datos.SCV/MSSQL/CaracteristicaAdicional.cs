using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class CaracteristicaAdicional
          : dk.DAOBaseGeneric<m.ICaracteristicaAdicional>, d.ICaracteristicaAdicional
    {
        private const string USP_SCV_CARACTERISTICAS_ADICIONALES_SELECT = "usp_scv_caracteristicas_adicionales_select";
        private const string USP_SCV_ENTIDADESCARACTERISTICAS_SELECT = "usp_scv_EntidadesCaracteristicas_select";
        private const string USP_SCV_ENTIDADESCARACTERISTICAS_INS_UPD = "usp_scv_EntidadesCaracteristicas_ins_upd";
        private const string USP_SCV_CARACTERISTICAS_VENTAOPCIONAL_SELECT = "usp_scv_caracteristicas_VentaOpcional_select";

        public CaracteristicaAdicional(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_CARACTERISTICAS_ADICIONALES_SELECT, null, "scv_caracteristicas_adc")
        { }

        #region CaracteristicasComponent

        public async Task<object[]> GetAllByVentaOpcional(Dictionary<string, object> parametros)
        {
            try
            {
                //var parameters = new Dictionary<string, object>
                //{
                //    { "IdUbicacion", idUbicacion},
                //    { "IdEsquema", idFinanciamiento},
                //    { "ventaOpcional", ventaOpcional}
                    
                //};

                return await helper.CreateEntitiesAsync(
                    USP_SCV_CARACTERISTICAS_VENTAOPCIONAL_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.IEntidadCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.IEntidadCaracteristica>(
                    USP_SCV_ENTIDADESCARACTERISTICAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveCaracteristica(m.IEntidadCaracteristica model)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdEntidad", model.IdEntidad);
                parameters.Add("IdTipoEntidad", model.IdTipoEntidad);
                parameters.Add("IdCaracteristica", model.IdCaracteristica);
                parameters.Add("IdTipoUbicacion", model.IdTipoUbicacion);
                parameters.Add("VentaOpcional", model.VentaOpcional);
                parameters.Add("Importe", model.Importe);
                parameters.Add("CreadoPor", model.IdCreadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);

                return await helper.GetResultAsync(USP_SCV_ENTIDADESCARACTERISTICAS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteCaracteristica(int id)
        {
            return await base.DeleteEntity(id, "ID", "scv_EntidadesCaracteristicas");
        }

        public async Task<m.IEntidadCaracteristica> GetCaracteristicasById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Id", id}
                };

                return await helper.CreateSingleEntityAsync<m.IEntidadCaracteristica>(
                     USP_SCV_ENTIDADESCARACTERISTICAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
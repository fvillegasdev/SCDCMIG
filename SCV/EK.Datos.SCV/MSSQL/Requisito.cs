using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;
using EK.Modelo.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class Requisito
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IRequisito>, d.SCV.Interfaces.IRequisitos
    {
        private const string USP_SCV_REQUISITOS_SELECT = "usp_scv_requisitos_select";
        private const string USP_SCV_REQUISITOS_CARACTERISTICAS_SELECT = "usp_scv_requisitos_caracteristicas_select";
        private const string USP_SCV_REQUISITOS_CARACTERISTICAS_INS_UPD = "usp_scv_requisitos_caracteristicas_ins_upd";

        public Requisito(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_REQUISITOS_SELECT, null, "scv_requisitos")
        { }

        public async Task<List<m.SCV.Interfaces.IRequisitoCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IRequisitoCaracteristica>(
                    USP_SCV_REQUISITOS_CARACTERISTICAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveCaracteristica(m.SCV.Interfaces.IRequisitoCaracteristica model)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("Id", model.ID);
                parameters.Add("IdRequisito", model.IdRequisito);
                parameters.Add("Nombre", model.Nombre);
                parameters.Add("Descripcion", model.Descripcion);
                parameters.Add("CreadoPor", model.IdModificadoPor);
                parameters.Add("ModificadoPor", model.IdModificadoPor);
                return await helper.GetResultAsync(USP_SCV_REQUISITOS_CARACTERISTICAS_INS_UPD,
                    CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteCaracteristica(int idCaracteristica)
        {
            return await base.DeleteEntity(idCaracteristica, "ID", "scv_requisitos_caracteristicas");
        }
    }
}
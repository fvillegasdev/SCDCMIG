using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class CentralesObreras
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICentralObrera>, d.SCV.Interfaces.ICentralesObreras
    {
        private const string USP_SCV_CENTRALESOBRERAS_SELECT = "usp_scv_CentralesObreras_select";
        //private const string USP_SCV_CENTRALESOBRERAS_INS_UPD = "usp_scv_CentralesObreras_ins_upd";

        public CentralesObreras(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_CENTRALESOBRERAS_SELECT, null, "scv_CentralesObreras")
        { }

        //public async Task<object[]> GetAll(int activos)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "id", DBNull.Value},
        //            { "activos", activos}
        //        };

        //        return await helper.CreateEntitiesAsync(
        //            USP_SCV_CENTRALESOBRERAS_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<modelSCV.ICentralObrera> GetById(int id)
        //{
        //    try
        //    {
        //        var parameters = new Dictionary<string, object>
        //        {
        //            { "id", id},
        //            { "activos", 0}
        //        };
        //        return await helper.CreateSingleEntityAsync<modelSCV.ICentralObrera>(
        //            USP_SCV_CENTRALESOBRERAS_SELECT, CommandType.StoredProcedure, parameters);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<int> Save(modelSCV.ICentralObrera model)
        //{
        //    try
        //    {
        //        Dictionary<string, object> parameters = new Dictionary<string, object>();
        //        parameters.Add("Id", model.ID);
        //        parameters.Add("Clave", model.Clave);
        //        parameters.Add("Descripcion", model.Descripcion);
        //        parameters.Add("IdEstatus", model.IdEstatus);
        //        parameters.Add("CreadoPor", model.IdCreadoPor);
        //        parameters.Add("ModificadoPor", model.IdModificadoPor);
        //        return await helper.GetResultAsync(USP_SCV_CENTRALESOBRERAS_INS_UPD,
        //            CommandType.StoredProcedure, parameters);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}

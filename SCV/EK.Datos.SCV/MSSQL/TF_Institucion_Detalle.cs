using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TF_Institucion_Detalle
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IInstitucionDetalle>, d.SCV.Interfaces.ITF_Institucion_Detalle
    {
        private const string USP_SCV_TF_INSTITUCION_DETALLE_SELECT = "usp_scv_TF_Institucion_detalle_select";
        public TF_Institucion_Detalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_TF_INSTITUCION_DETALLE_SELECT, null, "scv_TF_Institucion_Detalle") { }

        public async Task<List<m.SCV.Interfaces.IInstitucionDetalle>> GetInstitucionDetalle(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IInstitucionDetalle>(
                    USP_SCV_TF_INSTITUCION_DETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
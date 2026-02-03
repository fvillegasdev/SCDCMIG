using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using miSCV = EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using EK.Datos.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class Instituciones
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IInstitucion>, d.SCV.Interfaces.IInstituciones
    {
        private const string USP_USP_INSTITUCIONES_SELECT = "usp_instituciones_select";
        private const string USP_SCV_TF_INSTITUCIONES_SELECT = "usp_scv_TF_Instituciones_select";

        public Instituciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_USP_INSTITUCIONES_SELECT, null, "scv_Instituciones")
        {
        }

        public async Task<List<miSCV.ITipoFinanciamientoInstitucion>> GetAllTFInstituciones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<miSCV.ITipoFinanciamientoInstitucion>(
                    USP_SCV_TF_INSTITUCIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
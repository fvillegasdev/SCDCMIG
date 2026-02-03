using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;
using miSCV = EK.Modelo.SCV.Interfaces;
using EK.Datos.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class PreparacionVivienda
        : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPreparacionVivienda>, d.SCV.Interfaces.IPreparacionVivienda
    {
        private const string USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT = "usp_spv_ConsultaPreparacionVivienda_select";
        private const string USP_SPV_CONSULTA_DOCS_IMPRESION_SELECT = "usp_spv_DocImpresion_select";


        public PreparacionVivienda(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT, null, "spv_CapturaFechaConstruccion")
        { }


        public async Task<int> GetDocumentoImpresion(m.Kontrol.Interfaces.IPreparacionVivienda model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();

                parameters.Add("Plaza", model.plaza);
                parameters.Add("clave_tipo_vivienda ", model.clave_tipo_vivienda);
                parameters.Add("hipoteca_verde", model.hipoteca_verde);

                return await helper.GetResultAsync(
                       USP_SPV_CONSULTA_DOCS_IMPRESION_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using System.Data;

namespace EK.Datos.SCV.MSSQL
{
    public class ConceptosPago
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IConceptoPago>, 
        d.SCV.Interfaces.IConceptosPago
    {
        private const string USP_SCV_CONCEPTOSPAGO_SELECT = "usp_scv_ConceptosPago_select";

        public ConceptosPago(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_CONCEPTOSPAGO_SELECT, null, "scv_ConceptosPago")
        { }

        public async Task<List<IConceptoPago>> GetPorTipo(string tipo)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "tipo", tipo}
                };

                return await helper.CreateEntitiesAsync<IConceptoPago>(
                    USP_SCV_CONCEPTOSPAGO_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

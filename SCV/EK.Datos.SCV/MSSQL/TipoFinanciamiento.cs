using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class TipoFinanciamiento
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ITipoFinanciamiento>, d.SCV.Interfaces.ITipoFinanciamiento
    {
        private const string USP_SCV_TIPOFINANCIAMIENTO_SELECT = "usp_scv_TipoFinanciamiento_select";
        public TipoFinanciamiento(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SCV_TIPOFINANCIAMIENTO_SELECT, null, "scv_TipoFinanciamiento")
        { }

        //public async Task<object[]> GetAllTFInstituciones(Dictionary<string, object> parametros)
        //{
        //    try
        //    {
        //        return await helper.CreateEntitiesAsync(USP_SCV_TF_INSTITUCIONES_SELECT, CommandType.StoredProcedure, parametros);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}
    }
}
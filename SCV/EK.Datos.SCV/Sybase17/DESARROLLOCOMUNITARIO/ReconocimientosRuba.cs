using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class ReconocimientosRuba : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IReconocimientosRuba>, d.SCV.Interfaces.IReconocimientosRuba
    {

        public const string USP_RECONOCIMIENTOS_RUBA = "usp_reconocimientos_ruba";

        public ReconocimientosRuba(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
        : base(factory, helper, USP_RECONOCIMIENTOS_RUBA, null, "sdc_dc_reconocimientosRuba")
        {

        }

        public async Task<object[]> PRReconocimiento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_RECONOCIMIENTOS_RUBA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

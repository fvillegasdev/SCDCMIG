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
    public class BitacorasClienteSPVAreasComunes
         : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes>, d.SCV.Interfaces.IBitacorasClienteSPVAreasComunes
    {
        private const string USP_BASE_SELECT = "usp_spv_bitacora_cliente_spv_select_areas_comunes";
        public BitacorasClienteSPVAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_BASE_SELECT, null, "BitacorasClienteSPVAreasComunes")
        { }

        public async Task<int> GetMaxPartida(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

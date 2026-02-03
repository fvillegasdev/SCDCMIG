using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Data;

namespace EK.Datos.SCV.Sybase17
{
    public class BitacorasProcesoSPV
         : dk.DAOBaseGeneric<m.IBitacoraProcesoSPV>, d.IBitacorasProcesoSPV
    {
        private const string USP_SPV_BITACORA_PROCESOS_INS_UPD = "usp_spv_bitacora_procesos_ins_upd";

        public BitacorasProcesoSPV(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, "", USP_SPV_BITACORA_PROCESOS_INS_UPD, "sm_bitacora_procesos")
        { }

        public async override Task<m.IBitacoraProcesoSPV> Save(m.IBitacoraProcesoSPV model)
        {
            try
            {
                var parameters = new Dictionary<string, object>();
                parameters.Add("IdProceso", model.IdProceso);
                parameters.Add("IdCliente", model.IdCliente);
                parameters.Add("IdReferencia", model.IdReferencia);
                parameters.Add("Observaciones", model.Observaciones);
                parameters.Add("IdAgente", model.IdAgente);
                parameters.Add("IdUsuario", model.IdUsuario);
                parameters.Add("FechaProceso", model.FechaProceso);
                parameters.Add("TagWin", model.TagWin);

                int id = await helper.GetResultAsync(USP_SPV_BITACORA_PROCESOS_INS_UPD,
                    CommandType.StoredProcedure, parameters);

                return null;
            }
            catch
            {
                throw;
            }
        }
    }
}
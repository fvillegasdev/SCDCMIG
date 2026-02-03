using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SDC.Interfaces;
using m = EK.Modelo.SDC.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SDC.MSSQL
{
    public class EstadoCuenta
        : dk.DAOBaseGeneric<m.IEstadoCuenta>, d.IEstadoCuenta
    {
        private const string ENTITY_NAME = "SDC_EstadoCuenta";
        private const string USP_SCV_ESTADOCUENTA_SELECT = "usp_sdc_EstadoCuenta_select";

        private const string USP_SDC_UBICACIONES_SELECT = "usp_sdc_ubicacionesCliente_select";

        public EstadoCuenta(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_ESTADOCUENTA_SELECT, null, ENTITY_NAME)
        { }


        public async Task<List<EK.Modelo.SCV.Interfaces.IUbicaciones>> GetUbicaciones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<EK.Modelo.SCV.Interfaces.IUbicaciones>(USP_SDC_UBICACIONES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

    }
}
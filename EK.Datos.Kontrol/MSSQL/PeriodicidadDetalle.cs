using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Data;

namespace EK.Datos.Kontrol.MSSQL
{
    public class PeriodicidadDetalle
         : dk.DAOBaseGeneric<mki.IPeriodicidadDetalle>, dki.IPeriodicidadDetalle
    {
        private const string ENTITY_NAME = "PeriodicidadDetalles";
        private const string USP_SCV_COMISIONES_PERIODICIDAD_DETALLE_SELECT = "usp_PeriodicidadDetalles_select";

        public PeriodicidadDetalle(mki.IContainerFactory factory, dki.IDBHelper helper)
             : base(factory, helper, USP_SCV_COMISIONES_PERIODICIDAD_DETALLE_SELECT, null, ENTITY_NAME)
        { }

        public async Task<mki.IPeriodicidadDetalle> GetPeriodo(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<mki.IPeriodicidadDetalle>(USP_SCV_COMISIONES_PERIODICIDAD_DETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

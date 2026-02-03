using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;
using System.Data;

namespace EK.Datos.SCV.MSSQL
{
    public class Interface
        :dk.DAOBaseGeneric<m.IInterface>,d.IInterface
    {
        private const string ENTITY_NAME = "Interface";
        private const string USP_INTERFACE_SELECT = "usp_Interface_select";
        private const string USP_INTERFACE_UPD = "usp_Interface_upd";
        private const string USP_INTERFACE_SALDOFACTURADETALLE_SELECT = "usp_Interface_SaldoFacturaDetalle_select";

        public Interface(mki.IContainerFactory factory,dki.IDBHelper helper)
            :base(factory,helper,USP_INTERFACE_SELECT,null,ENTITY_NAME)
        {

        }

        public async Task<object> GetAllInterface(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_INTERFACE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        public async Task<object> GetAllISFDetalles(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_INTERFACE_SALDOFACTURADETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetSaveUpdateInterface(Dictionary<string,object>parametros) {
            try
            {
                return await helper.CreateEntitiesAsync(USP_INTERFACE_UPD, CommandType.StoredProcedure, parametros);

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

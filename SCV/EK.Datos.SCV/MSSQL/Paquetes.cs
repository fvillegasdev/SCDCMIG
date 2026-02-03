using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class Paquetes
        : dk.DAOBaseGeneric<m.IPaquete>, d.IPaquetes
    {
        private const string ENTITY_NAME = "scv_Paquetes";
        private const string USP_SCV_PAQUETES_SELECT = "usp_scv_Paquetes_select";


        public Paquetes(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_PAQUETES_SELECT, null, ENTITY_NAME)
        { }

        public  async   Task<object[]> GetAllPackage(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_PAQUETES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}
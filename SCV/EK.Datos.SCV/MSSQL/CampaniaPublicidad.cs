using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using m = EK.Modelo;
using d = EK.Datos;
using System;

namespace EK.Datos.SCV.MSSQL
{
    public class CampaniaPublicidad 
      : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICampaniaPublicidad>,
        d.SCV.Interfaces.ICampaniaPublicidad
    {
        private const string USP_CAMPANIA_SELECT = "usp_campaniapublicidad_select";
        private const string USP_CAMPANIA_SELECT_USER = "usp_scv_campanias_select_user";

        public CampaniaPublicidad(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CAMPANIA_SELECT, null, "scv_campaniapublicidad")
        { }

        public async Task<m.SCV.Interfaces.ICampaniaPublicidad> GetByCampaniaPublicidadId(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.ICampaniaPublicidad>(USP_CAMPANIA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        public async Task<List<m.SCV.Interfaces.ICampaniaPublicidad>> SelectCampaniaPublicidadUser(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.ICampaniaPublicidad>(USP_CAMPANIA_SELECT_USER, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

    }
}
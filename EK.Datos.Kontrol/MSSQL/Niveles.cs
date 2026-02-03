using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Niveles
        : DAOBaseGeneric<m.Kontrol.Interfaces.INivel>, d.Kontrol.Interfaces.INiveles
    {
        private const string USP_NIVELES_CONFIGURACION = "usp_niveles_configuracion";
        private const string USP_NIVELES_SELECT = "usp_niveles_select";

        public Niveles(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper, 
                  USP_NIVELES_SELECT, 
                  string.Empty,
                  "niveles")
        { }
        public async Task<m.Kontrol.Interfaces.IOpcionModulo[]> GetConfiguracion(int idNivel, int idModulo)
        {
            List<m.Kontrol.Interfaces.IOpcionModulo> retValue = null;

            try
            {
                var parameters = new Dictionary<string, object> {
                    { "idNivel", idNivel },
                    { "idModulo", idModulo }
                };

                retValue =
                    await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IOpcionModulo>(USP_NIVELES_CONFIGURACION, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }

            return retValue != null ? retValue.ToArray() : null;
        }
    }
}
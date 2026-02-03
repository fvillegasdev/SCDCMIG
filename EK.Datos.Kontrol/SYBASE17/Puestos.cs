using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Puestos
        : DAOBaseGeneric<m.Kontrol.Interfaces.IPuesto>, d.Kontrol.Interfaces.IPuestos
    {
        private const string USP_PUESTOS_SELECT = "usp_puestos_select";

        public Puestos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_PUESTOS_SELECT,
              string.Empty,
              "puestos")
        { }
        public async Task<object[]> GetAllPuestos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_PUESTOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
    }
}

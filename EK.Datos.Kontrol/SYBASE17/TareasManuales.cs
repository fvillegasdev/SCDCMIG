using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class TareasManuales
         : DAOBaseGeneric<m.Kontrol.Interfaces.ITareaManual>, d.Kontrol.Interfaces.ITareasManuales
    {
        private const string USP_TAREAS_SELECT = "usp_tareasManuales_select";

        public TareasManuales(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TAREAS_SELECT,
                  string.Empty,
                  "tareasManuales")
        { }
        public async Task<object[]> GetAllTareasManuales(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_TAREAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

    }
}

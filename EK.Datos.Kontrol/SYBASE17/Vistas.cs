using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using d = EK.Datos;
//using m = EK.Modelo/*;*/
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    
    public class Vistas : DAOBaseGeneric<m.Kontrol.Interfaces.IVistas>, d.Kontrol.Interfaces.IVistas
    {
        private const string Usp_Vistas_Select = "usp_vistas_select";
        public Vistas(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
    : base(
          factory,
          helper,
          Usp_Vistas_Select,
          string.Empty,
          "vistas")
        { }

        public override async Task<List<m.Kontrol.Interfaces.IVistas>> GetAll(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IVistas>(Usp_Vistas_Select, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IVistas>> GetById(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IVistas>(Usp_Vistas_Select, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}

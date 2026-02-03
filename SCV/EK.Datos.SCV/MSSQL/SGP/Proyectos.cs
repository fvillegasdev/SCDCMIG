using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SGP.MSSQL
{
    public class Proyectos
     : d.Kontrol.DAOBaseGeneric<m.SGP.Interfaces.IProyectos>,
        d.SGP.Interfaces.IProyectos
    {
        private const string USP_CRITERIOS_SELECT = "usp_sgp_proyectos_select";
        private const string USP_PROJECT_DASHBOARD_SELECT = "usp_sgp_proyectos_dashboard_select";
        public Proyectos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_CRITERIOS_SELECT, null, "sgp_proyectos")
        { }


        public async Task<List<m.SGP.Interfaces.IColaboradores>> GetResourceAssignedTask(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SGP.Interfaces.IColaboradores>(
                    USP_PROJECT_DASHBOARD_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}

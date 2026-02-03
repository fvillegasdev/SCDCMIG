using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Datos.Kontrol.Interfaces;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class Opciones
        : DAOBaseGeneric<m.Kontrol.Interfaces.IOpcionModulo>, d.Kontrol.Interfaces.IOpciones
    {
        private const string USP_OPCIONES_SELECT   = "usp_opciones_select";
        private const string USP_DASHBOARDS_SELECT = "usp_dashboards_select";

        public Opciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_OPCIONES_SELECT, 
                  null,
                  "opciones")
        { }

        public async Task<List<IOpcionModulo>> GetDashBoards(Dictionary<string, object> parametros)
        {
            try
            {
                Dictionary<string, object> parameters = new Dictionary<string, object>() {
                    { "OperacionEspecificaSP", "ObtenerTableros" }
                };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IOpcionModulo>(USP_DASHBOARDS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }
    }
}
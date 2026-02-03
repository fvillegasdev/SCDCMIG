using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Posicion
        : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IPosicion>, Interfaces.IPosiciones
    {
        private const string USP_POSICIONES_SELECT = "usp_posiciones_select";
        private const string USP_PUESTOS_SELECT = "usp_puestos_select";
        private const string USP_POSICIONES_ASCENDIENTES_SELECT = "usp_posiciones_ascendientes_select";
        private const string USP_POSICIONES_DESCENDIENTES_SELECT = "usp_posiciones_descendientes_select";
        private const string USP_CATEGORIAS_SELECT = "usp_categorias_select";

        public Posicion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
              factory,
              helper,
              USP_POSICIONES_SELECT,
              string.Empty,
              "posiciones")
        { }

        public Task<m.Kontrol.Interfaces.ICategoria> GetCategoria(int id)
        {
            throw new NotImplementedException();
        }

        public Task<m.Kontrol.Interfaces.IPuesto> GetPuesto(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<m.Kontrol.Interfaces.IPosicion>> GetAscendientes(int? idUsuario)
        {
            try
            {
                var parameters = new Dictionary<string, object> { { "idUsuario", idUsuario } };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IPosicion>(
                    USP_POSICIONES_ASCENDIENTES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IPosicion>> GetDescendientes(int? idUsuario)
        {
            try
            {
                var parameters = new Dictionary<string, object> { { "idUsuario", idUsuario } };

                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IPosicion>(
                    USP_POSICIONES_DESCENDIENTES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

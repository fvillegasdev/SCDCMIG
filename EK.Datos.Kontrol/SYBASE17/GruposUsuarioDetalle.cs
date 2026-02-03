using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class GruposUsuarioDetalle
      : DAOBaseGeneric<m.Kontrol.Interfaces.IGruposUsuarioDetalle>, d.Kontrol.Interfaces.IGruposUsuarioDetalle
    {
        private const string USP_GRUPOS_USUARIO_DETALLE_SELECT = "usp_GruposUsuario_Detalle_select";

        private const string USP_GRUPOS_USUARIO_POSICION_SELECT = "usp_scv_GrupoUsuario_Posicion_select";

        public GruposUsuarioDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_GRUPOS_USUARIO_DETALLE_SELECT, null, "GruposUsuarioDetalle") { }

        public async Task<object> GetGroupsDetailsUser(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_GRUPOS_USUARIO_DETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<m.Kontrol.Interfaces.IUsuariosGrupoDetalle>> GetUsersGroupDetails(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IUsuariosGrupoDetalle>(USP_GRUPOS_USUARIO_DETALLE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IPosicion>> GetUsersGroupWithPositions(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IPosicion>(USP_GRUPOS_USUARIO_POSICION_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class Comites : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IComites>, d.SCV.Interfaces.IComites
    {
        public const string USP_COMITES = "usp_comites";
        public const string USP_COMITES_AREA_GEOGRAFICA = "usp_comites_area_geografica";
        public const string USP_COMITES_INFORMACION_COMITE = "usp_comites_informacion_comite";
        public const string USP_COMITES_REUNIONES = "usp_comites_reuniones";
        public const string USP_COMITES_REUNIONES_AGENDA = "usp_comites_reuniones_agenda";
        public const string USP_COMITES_REUNIONES_GRAFICAS = "usp_comites_reuniones_graficas";
        public Comites(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
        : base(factory, helper, USP_COMITES, null, "usp_comites_reuniones")
        {

        }

        public async Task<object[]> CrudComiteAreaGeografica(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_AREA_GEOGRAFICA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> SaveComiteInformacionComite(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetComiteInformacionComite(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IInformacionComite> GetComiteInformacionComiteById(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<IInformacionComite>(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IIntegrantesInformacionComite>> GetIntegrantesComiteByIdComite(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IIntegrantesInformacionComite>(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetAreaGeografica(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> DeleteIntegrantes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> DeleteInformacionComite(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_INFORMACION_COMITE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetComites(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveComiteReuniones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_COMITES_REUNIONES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> SelectComites(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetReuniones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> DeleteReuniones(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetReunionesById(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IAgendaReuniones>> GetAgenda(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IAgendaReuniones>(USP_COMITES_REUNIONES_AGENDA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetEvent(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES_AGENDA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> SaveRealizada(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES_AGENDA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetInfoGraficas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_COMITES_REUNIONES_GRAFICAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

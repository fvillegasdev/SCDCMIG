using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class Eventos : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IEventos>, d.SCV.Interfaces.IEventos
    {
        public const string USP_EVENTOS = "usp_desarrollo_comunitario_eventos";
        public const string USP_MEDIOS_DIFUSION = "usp_medios_difusion";
        public const string USP_CRUD_POSIBLES_ALIANZAS = "usp_crud_posibles_alianzas";
        public const string USP_INUP_EVENTO = "usp_inup_evento";
        public const string USP_INUP_POSIBLES_ALIANZAS = "usp_inup_posibles_alianzas";
        public const string USP_INUP_OBSERVACIONES_REQUERIMIENTOS = "usp_inup_observaciones_requerimientos";
        public const string USP_INUP_PERMISOS = "usp_inup_permisos";
        public const string USP_INUP_INVITADOS_ESPECIALES = "usp_inup_invitados_especiales";
        public const string USP_SEL_EVENTO = "usp_sel_evento";
        public const string USP_DELUP_RELS_EVENTO = "usp_delup_evento_rels";
        public const string USP_PR_EVENTO_CAPTURA = "usp_pr_evento_captura";
        public const string USP_CRUD_PATROCINADORES = "usp_crud_patrocinadores";
        public const string USP_PR_EVENTO_PPC = "usp_pr_evento_ppc";
        public const string USP_CONSULTAS_EVENTOS_ACTIVIDADES = "usp_consultas_eventos_actividades";

        public Eventos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
        : base(factory, helper, USP_EVENTOS, null, "sdc_dc_eventos")
        {

        }

        #region ++++ALTA EVENTOS+++++
        public async Task<object[]> CrudPosiblesAlianzas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CRUD_POSIBLES_ALIANZAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> DeleteUpdateRelsEvento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_DELUP_RELS_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public async Task<IEventosActividades> GetEventByID(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "EVENT";
                return await helper.CreateSingleEntityAsync<IEventosActividades>(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IInvitadosEspeciales>> GetInvitadosEspecialesByIdEvent(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "INVITADOSESPECIALES";
                return await helper.CreateEntitiesAsync<IInvitadosEspeciales>(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetMediosDifusion(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_MEDIOS_DIFUSION, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IObservacionesRequerimientos>> GetObservacionesReqByIdEvent(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "OBSERVACIONESREQ";

                return await helper.CreateEntitiesAsync<IObservacionesRequerimientos>(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IPermisos>> GetPermisosByIdEvent(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "PERMISOS";
                return await helper.CreateEntitiesAsync<IPermisos>(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IPosiblesAlianzas>> GetPosiblesAlianzasByIdEvent(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "POSIBLESALIANZAS";
                return await helper.CreateEntitiesAsync<IPosiblesAlianzas>(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveEvent(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INUP_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveInvitadosEspeciales(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INUP_INVITADOS_ESPECIALES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveObservacionesReq(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INUP_OBSERVACIONES_REQUERIMIENTOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePermisos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INUP_PERMISOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveRelEventPA(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INUP_POSIBLES_ALIANZAS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> Search(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateEvent(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_INUP_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> deleteRels(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_DELUP_RELS_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region CAPTURA EVENTOS
        public async Task<object[]> EventosSelect(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetPatrocinadores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetEventActSimple(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveEventCapture(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "INSERTCAPTUREEVENT");
                return await helper.GetResultAsync(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> CrudPatrocinadores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CRUD_PATROCINADORES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePatrocinadores(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "INSERTPATROCINADORES");
                return await helper.GetResultAsync(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEventosActividadesCaptura> GetEventoCapturaByIdEvento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<IEventosActividadesCaptura>(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IPatrocinadoresPorcentaje>> GetListPatrocinadores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IPatrocinadoresPorcentaje>(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateEventCaptura(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "UPDATEEVENTCAPTURA");
                return await helper.GetResultAsync(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdatePatrocinadoresEvento(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "UPDATEPATROCINADORES");
                return await helper.GetResultAsync(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> DeletePatrocinadoresEvento(Dictionary<string, object> parametros)
        {
            try
            {
                parametros.Add("OPERACION", "DELETEPATROCINADORESEVENTO");
                return await helper.GetResultAsync(USP_PR_EVENTO_CAPTURA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IParticipantes>> GetParticipantes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IParticipantes>(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IPatrocinadores>> GetPatrocinadoresPPC(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IPatrocinadores>(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IColaboradoresPPC>> GetColaboradores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IColaboradoresPPC>(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveParticipantes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SavePatrocinadoresPPC(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        } 

        public async Task<int> SaveColaboradores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteParticipantes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeletePatrocinadoresPPC(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteColaboradores(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_PR_EVENTO_PPC, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        #endregion

        #region +++CONSULTAS+++
        public async Task<object[]> ConsultasEventosActividades(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_CONSULTAS_EVENTOS_ACTIVIDADES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IParticipantesConsulta>> GetParticipantesConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "REPORTEPARTICIPANTES";

                return await helper.CreateEntitiesAsync<IParticipantesConsulta>(USP_CONSULTAS_EVENTOS_ACTIVIDADES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IPatrocinadoresConsulta>> GetPatrocinadoresConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "REPORTEPATROCINADORES";


                return await helper.CreateEntitiesAsync<IPatrocinadoresConsulta>(USP_CONSULTAS_EVENTOS_ACTIVIDADES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<IColaboradoresConsulta>> GetColaboradoresConsulta(Dictionary<string, object> parametros)
        {
            try
            {
                parametros["OPERACION"] = "REPORTECOLABORADORES";

                return await helper.CreateEntitiesAsync<IColaboradoresConsulta>(USP_CONSULTAS_EVENTOS_ACTIVIDADES, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<object[]> SearchEvents(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SEL_EVENTO, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}
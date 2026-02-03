using EK.Modelo.SCV.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Interfaces
{
    public interface IEventos : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IEventos>
    {
        //=================================================
        // ALTA EVENTOS ACTIVIDADES                       |
        //=================================================

        Task<object[]> CrudPosiblesAlianzas(Dictionary<string, object> parametros);
        Task<object[]> GetMediosDifusion(Dictionary<string, object> parametros);
        Task<int> SaveEvent(Dictionary<string, object> parametros); 
         Task<int> SaveRelEventPA(Dictionary<string, object> parametros);
        Task<int> SaveObservacionesReq(Dictionary<string, object> parametros);
        Task<int> SavePermisos(Dictionary<string, object> parametros);
        Task<int> SaveInvitadosEspeciales(Dictionary<string, object> parametros);
        Task<IEventosActividades> GetEventByID(Dictionary<string, object> parametros);
        Task<List<IPosiblesAlianzas>> GetPosiblesAlianzasByIdEvent(Dictionary<string, object> parametros);
        Task<List<IInvitadosEspeciales>> GetInvitadosEspecialesByIdEvent(Dictionary<string, object> parametros);
        Task<List<IObservacionesRequerimientos>> GetObservacionesReqByIdEvent(Dictionary<string, object> parametros);
        Task<List<IPermisos>> GetPermisosByIdEvent(Dictionary<string, object> parametros);
        Task<object[]> Search(Dictionary<string, object> parametros);
        Task<object[]> DeleteUpdateRelsEvento(Dictionary<string, object> parametros);
        Task<int> UpdateEvent(Dictionary<string, object> parametros);
        Task<int> deleteRels(Dictionary<string, object> parametros);
         Task<object[]> EventosSelect(Dictionary<string, object> parametros); 
        Task<object[]> GetEventActSimple(Dictionary<string, object> parametros);
        //=======================
        //   EVENTOS CAPTURA    |
        //=======================
        Task<int> SaveEventCapture(Dictionary<string, object> parametros); 
        Task<int> SavePatrocinadores(Dictionary<string, object> parametros);
        Task<object[]> GetPatrocinadores(Dictionary<string, object> parametros);
        Task<object[]> CrudPatrocinadores(Dictionary<string, object> parametros); 
        Task<IEventosActividadesCaptura> GetEventoCapturaByIdEvento(Dictionary<string, object> parametros); 
        Task<List<IPatrocinadoresPorcentaje>> GetListPatrocinadores(Dictionary<string, object> parametros);
        Task<int> UpdateEventCaptura(Dictionary<string, object> parametros);
        Task<int> UpdatePatrocinadoresEvento(Dictionary<string, object> parametros); 
        Task<int> DeletePatrocinadoresEvento(Dictionary<string, object> parametros);


        //=================================================
        // ALTA PARTICIPANTES PATROCINADORES COLABORADORES|
        //=================================================

        Task<List<IParticipantes>> GetParticipantes(Dictionary<string, object> parametros);
        Task<List<IPatrocinadores>> GetPatrocinadoresPPC(Dictionary<string, object> parametros);
        Task<List<IColaboradoresPPC>> GetColaboradores(Dictionary<string, object> parametros);
        Task<int> SaveParticipantes(Dictionary<string, object> parametros);
        Task<int> SavePatrocinadoresPPC(Dictionary<string, object> parametros);
        Task<int> SaveColaboradores(Dictionary<string, object> parametros);
        Task<int> DeleteParticipantes(Dictionary<string, object> parametros);
        Task<int> DeletePatrocinadoresPPC(Dictionary<string, object> parametros);
        Task<int> DeleteColaboradores(Dictionary<string, object> parametros);


        //=================================================
        // CONSULTAS EVENTOS ACTIVIDADES
        //=================================================

        Task<object[]> ConsultasEventosActividades(Dictionary<string, object> parametros);
        Task<List<IParticipantesConsulta>> GetParticipantesConsulta(Dictionary<string, object> parametros);
        Task<List<IPatrocinadoresConsulta>> GetPatrocinadoresConsulta(Dictionary<string, object> parametros);
        Task<List<IColaboradoresConsulta>> GetColaboradoresConsulta(Dictionary<string, object> parametros);
        Task<object[]> SearchEvents(Dictionary<string, object> parametros);
    }
}
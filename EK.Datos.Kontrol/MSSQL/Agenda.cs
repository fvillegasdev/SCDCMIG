using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.MSSQL
{
    public class Agenda
      : d.Kontrol.DAOBaseGeneric<m.Kontrol.Interfaces.IAgenda>, d.Kontrol.Interfaces.IAgenda
    {
        private const string USP_AGENDA_SELECT = "usp_agenda_select";
        private const string USP_MODIFICARAGENDA_SELECT = "usp_ModificarAgenda_select";
        private const string USP_HISTORIAL_MODIFICARAGENDA_SELECT = "usp_Historial_ModificarAgenda_select";
        private const string USP_MODIFICARAGENDA_UPD = "usp_ModificarAgenda_Upd";
        public Agenda(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_AGENDA_SELECT, null, "Agenda")
        { }

        public async Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getUsersCalendarDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgendaIndicadores>(
                    USP_AGENDA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaIndicadores>> getStateCalendarDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                var res = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgendaIndicadores>(
                    USP_AGENDA_SELECT, CommandType.StoredProcedure, parametros);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IAgenda>> getGeoCalendarDashBoard(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgenda>(
                    USP_AGENDA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.Kontrol.Interfaces.IModificarAgenda> getFechaAgendaCliente(Dictionary<string, object> parametros)
        {
            try
            {
                var res = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IModificarAgenda>(
                     USP_MODIFICARAGENDA_SELECT, CommandType.StoredProcedure, parametros);
                return res; 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.Kontrol.Interfaces.IHistorialCambioAgenda>> getHistorialModificacionAgenda(Dictionary<string, object> parametros)
        {
            try
            {
                var res = await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IHistorialCambioAgenda>(
                     USP_HISTORIAL_MODIFICARAGENDA_SELECT, CommandType.StoredProcedure, parametros);
                return res; 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<m.Kontrol.Interfaces.IModificarAgenda> SaveCambioAgenda(Dictionary<string, object> parametros)
        {
            try
            {
                var res = await helper.CreateSingleEntityAsync<m.Kontrol.Interfaces.IModificarAgenda>(
                     USP_MODIFICARAGENDA_UPD, CommandType.StoredProcedure, parametros);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
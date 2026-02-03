using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class ClientesSPV
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClientesSPV>, d.SCV.Interfaces.IClientesSPV
    {
        private const string USP_CLIENTES_SELECT = "usp_spv_clientes_select";
        private const string USP_CLIENTES_UPD = "usp_spv_contacto_upd";
        private const string USP_CLIENTESSPV_SELECT = "usp_spv_clientes_select";
        private const string USP_CLIENTESSPV_SELECT_MZALTE = "usp_spv_clientes_select_mza_lte";
        private const string USP_CLIENTESSPV_SELECT_END = "usp_spv_clientes_select_Edificio_nivel_dpto";
        private const string USP_CLIENTESSPV_AGENDALIST_SELECT = "usp_spv_clientes_agedaslist_select";
        private const string USP_CLIENTESSPV_COMENTARIOS_SELECT = "usp_spv_cliente_bitacora_comentarios_select";
        private const string USP_CLIENTESSPV_HISTORIAL_INCIDENCIAS_SELECT = "usp_spv_cliente_historialincidencias_select";


        public ClientesSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                    helper,
                    USP_CLIENTES_SELECT,
                    string.Empty,
                    "clientesspv")
        { }

        public Task<List<m.SCV.Interfaces.IClientesSPV>> GetClientesSPV(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
        
        public async Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteML(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClientesSPV>(USP_CLIENTESSPV_SELECT_MZALTE, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.SCV.Interfaces.IClientesSPV>> SearchClienteEND(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClientesSPV>(USP_CLIENTESSPV_SELECT_END, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IClienteSPVEtapa> GetEtapaActual(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR-SEGUIMIENTO-ETAPA-ACTUAL");
                parametros.Add("idCliente", idCliente);

                //posteriormente hay que adecuar esta consulta al sp de clientes.
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IClienteSPVEtapa>(
                    "usp_spv_ReportesFallas_consultas", CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.Kontrol.Interfaces.IAgendaEntVivienda>> getBitacoraArchivosEntrega(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", idCliente);
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IAgendaEntVivienda>(USP_CLIENTESSPV_AGENDALIST_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<m.Kontrol.Interfaces.IClienteComentarios>> getBitacoraClientesComentarios(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", idCliente);
                return await helper.CreateEntitiesAsync<m.Kontrol.Interfaces.IClienteComentarios>(USP_CLIENTESSPV_COMENTARIOS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IReporteFallaDetalle>> getHistorialIncidencias(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idCliente", idCliente);
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IReporteFallaDetalle>(USP_CLIENTESSPV_HISTORIAL_INCIDENCIAS_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<m.SCV.Interfaces.IClienteSPVEtapa> GetEtapaEntrega(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "CONSULTAR_FECHA_ENTREGA_VIVIENDA_CLIENTE");
                parametros.Add("idCliente", idCliente);

                //posteriormente hay que adecuar esta consulta al sp de clientes.
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IClienteSPVEtapa>(
                    "usp_spv_ReportesFallas_consultas", CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IClienteSPVEtapa>> GetEtapasExpediente(int idCliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("operacion", "ETAPAS-EXPEDIENTES");
                parametros.Add("idCliente", idCliente);

                //posteriormente hay que adecuar esta consulta al sp de clientes.
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClienteSPVEtapa>(
                    "usp_spv_ReportesFallas_consultas", CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public async Task<m.SCV.Interfaces.IClientesSPV> SaveContacto(m.SCV.Interfaces.IClientesSPV cliente)
        {
            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("numcte", cliente.IdEntity );
                parametros.Add("Estado", (int)cliente.Estado);
                parametros.Add("Modificado", cliente.Modificado);
                parametros.Add("IdModificadoPor", cliente.IdModificadoPor);
                parametros.Add("TelefonoCasa", cliente.TelefonoCasa);
                parametros.Add("TelefonoOtros", cliente.TelefonoOtros);
                parametros.Add("CorreoElectronico", cliente.CorreoElectronico);

                //posteriormente hay que adecuar esta consulta al sp de clientes.
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IClientesSPV>(
                    "usp_spv_contacto_upd", CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
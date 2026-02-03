using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class Clientes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ICliente>, d.SCV.Interfaces.IClientes
    {
        private const string USP_SCV_CLIENTES_SELECT = "usp_scv_clientes_select";
        private const string USP_SCV_CLIENTES_INS_UPD = "usp_scv_clientes_ins_upd";
        private const string USP_SCV_CLIENTES_ADICIONAL_SELECT = "usp_scv_clientes_adicional_select";
        private const string USP_SCV_CLIENTES_ADICIONAL_INS_UPD = "usp_scv_clientes_adicional_ins_upd";
        private const string USP_SCV_CLIENTES_CONYUGE_SELECT = "usp_scv_clientes_conyuge_select";
        private const string USP_SCV_CLIENTES_REFERENCIAS_SELECT = "usp_scv_clientes_referencias_select";
        private const string USP_SCV_CLIENTES_REFERENCIAS_INS_UPD = "usp_scv_clientes_refPersonales_ins_upd";
        private const string USP_SCV_CLIENTES_REF_LABORALES_SELECT = "usp_scv_clientes_ref_laborales_select";
        private const string USP_SCV_CLIENTES_REF_LABORALES_INS_UPD = "usp_scv_clientes_ref_laborales_ins_upd";
        private const string USP_SCV_CLIENTES_ASESORES_SELECT = "usp_scv_clientes_asesores_select";
        private const string USP_SCV_CLIENTES_SIN_EXPEDIENTES_SELECT = "usp_scv_clientes_sin_expedientes_select";

        public Clientes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory, 
                  helper,
                  USP_SCV_CLIENTES_SELECT, 
                  string.Empty,
                  "scv_clientes")
        { }

        public async Task<m.SCV.Interfaces.ICliente> GetByClienteId(Dictionary<string,object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.ICliente>(USP_SCV_CLIENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetByCliente(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateSingleEntityAsync(USP_SCV_CLIENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }
        public async Task<m.SCV.Interfaces.IClienteAdicional> GetAdicionalById(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id}
                 };
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IClienteAdicional>(USP_SCV_CLIENTES_ADICIONAL_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }
        public async Task<m.SCV.Interfaces.IConyuge> GetConyugeById(int id)
        {
            throw await Task.FromResult(new NotImplementedException());
        }

        public async Task<List<m.SCV.Interfaces.IClienteReferencia>> GetReferencias(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClienteReferencia>(USP_SCV_CLIENTES_REFERENCIAS_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.SCV.Interfaces.IClienteAsesores>> GetAsesoresClientes(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClienteAsesores>(USP_SCV_CLIENTES_ASESORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<m.SCV.Interfaces.IClienteRefLaboral>> GetReferenciasLaborales(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };

                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IClienteRefLaboral>(USP_SCV_CLIENTES_REF_LABORALES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetAllClientes (Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_CLIENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> GetClientWithoutFile(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_CLIENTES_SIN_EXPEDIENTES_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<m.SCV.Interfaces.IClienteReferencia>SaveList(List<m.SCV.Interfaces.IClienteReferencia> items)
        //{
        //    try
        //    {
        //        foreach (var item in items)
        //        {
        //            await helper.CreateEntitiesAsync(USP_SCV_CLIENTES_SIN_EXPEDIENTES_SELECT, CommandType.StoredProcedure, parametros);

        //        }
        //        return null;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        //public async Task<int> SaveReferenciaPersonal(int idCliente, m.SCV.Interfaces.IClienteReferencia model)
        //{
        //    try
        //    {
        //        object result;
        //        Dictionary<string, object> parameters = new Dictionary<string, object>();
        //        parameters.Add("ID", model.ID);
        //        parameters.Add("IdCliente", idCliente);
        //        parameters.Add("IdTipoReferencia", model.IdTipoReferencia);
        //        parameters.Add("Nombre", model.Nombre);
        //        parameters.Add("APaterno", model.ApellidoPaterno);
        //        parameters.Add("AMaterno", model.ApellidoMaterno);
        //        parameters.Add("Telefono", model.Telefono);
        //        parameters.Add("Celular", model.Celular);
        //        parameters.Add("IdEstatus", model.IdEstatus);
        //        parameters.Add("ModificadoPor", model.IdModificadoPor);

        //        result = await helper.GetResultAsync(USP_SCV_CLIENTES_REFERENCIAS_INS_UPD, CommandType.StoredProcedure, parameters);

        //        return (int)result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<int> SaveReferenciaLaboral(int idCliente, m.SCV.Interfaces.IClienteRefLaboral model)
        //{
        //    try
        //    {
        //        object result;
        //        Dictionary<string, object> parameters = new Dictionary<string, object>();
        //        parameters.Add("ID", model.ID);
        //        parameters.Add("IdCliente", idCliente);
        //        parameters.Add("IdEmpresa", model.IdEmpresa);
        //        parameters.Add("Antiguedad", model.Antiguedad);
        //        parameters.Add("Puesto", model.Puesto);
        //        parameters.Add("EmpleoActual", model.EmpleoActual);
        //        parameters.Add("IdEstatus", model.IdEstatus);
        //        parameters.Add("ModificadoPor", model.IdModificadoPor);

        //        result = await helper.GetResultAsync(USP_SCV_CLIENTES_REF_LABORALES_INS_UPD, CommandType.StoredProcedure, parameters);

        //        return (int)result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<int> SaveInformacionAdicional(int idCliente, m.SCV.Interfaces.IClienteAdicional model)
        //{
        //    try
        //    {
        //        object result;
        //        Dictionary<string, object> parameters = new Dictionary<string, object>();
        //        parameters.Add("ID", model.ID);
        //        parameters.Add("IdCliente", idCliente);
        //        parameters.Add("DsctoMensualAlim", model.DescuentoPension);
        //        parameters.Add("NumDependientes", model.DependientesEconomicos);
        //        parameters.Add("IdGradoAcademico", model.IdEstudios);
        //        parameters.Add("IdTipoCasa", model.IdTipoCasa);
        //        parameters.Add("IdTipoPercepcion", model.IdTipoPercepcion);
        //        parameters.Add("CantAutospropios", model.AutosPropios);
        //        parameters.Add("IdCentralObrera", model.CentralObrera.ID);
        //        parameters.Add("IdEstatus", model.IdEstatus);
        //        parameters.Add("ModificadoPor", model.IdModificadoPor);

        //        result = await helper.GetResultAsync(USP_SCV_CLIENTES_ADICIONAL_INS_UPD, CommandType.StoredProcedure, parameters);
        //        return (int)result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<int> DeleteReferenciaPersonal(int id)
        //{
        //    return await base.DeleteEntity(id, "ID", "scv_clientes_refPersonales");
        //}

        //public async Task<int> DeleteReferenciaLaboral(int id)
        //{
        //    return await base.DeleteEntity(id, "ID", "scv_clientes_ref_laborales");
        //}
    }
}
    

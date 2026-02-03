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
    public class AsociacionCivil : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IAsociacionCivil>, d.SCV.Interfaces.IAsociacionCivil
    {
        public const string USP_ASOCIACION_CIVIL = "usp_asociacion_civil";

        public AsociacionCivil(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
     : base(factory, helper, USP_ASOCIACION_CIVIL, null, "sdc_dc_asociacion_civil")
        {

        }

        public async Task<object[]> GetAsociacionCivil(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetIntegrantesByAsociacionCivilId(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetCliente(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveAsociacionCivil(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveIntegrantes(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> DeleteInfoAsociacionCivil(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<IInformacionComite> GetComiteByFraccionamiento(Dictionary<string, object> parametros)
        //{
        //    try
        //    {
        //        return await helper.CreateSingleEntityAsync<IInformacionComite>(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public async Task<object[]> GetComiteByFraccionamiento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<IIntegrantesInformacionComite>> GetComiteIntegrantesByFraccionamiento(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<IIntegrantesInformacionComite>(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetIntegrantesComite(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_ASOCIACION_CIVIL, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
namespace EK.Datos.SCV.Sybase17
{
    public class MesaDirectiva : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IMesaDirectiva>, d.SCV.Interfaces.IMesaDirectiva
    {
        public const string USP_MESA_DIRECTIVA= "usp_mesa_directiva";

        public MesaDirectiva(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
     : base(factory, helper, USP_MESA_DIRECTIVA, null, "sdc_dc_mesa_directiva")
        {

        }

        public async Task<object[]> DeleteInfoMesaDirectiva(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_MESA_DIRECTIVA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public Task<object[]> GetCliente(Dictionary<string, object> parametros)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<object[]> GetIntegrantesByMesaDirectivaId(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_MESA_DIRECTIVA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object[]> GetMesaDirectiva(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_MESA_DIRECTIVA, CommandType.StoredProcedure, parametros);
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
                return await helper.GetResultAsync(USP_MESA_DIRECTIVA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveMesaDirectiva(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.GetResultAsync(USP_MESA_DIRECTIVA, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

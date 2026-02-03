using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using miSCP = EK.Modelo.SCP.Interfaces;

namespace EK.Datos.SCP.MSSQL
{
    public partial class Proveedor
    {
        public async Task<List<miSCP.IProveedor>> Get()
        {
            try
            {
                var parameters = new Dictionary<string, object>()
                {
                    { "activos", 1 }
                };

                return await helper.CreateEntitiesAsync<miSCP.IProveedor>(USP_PROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<miSCP.IProveedor>> Search(string parametro)
        {
            try
            {
                var parameters = new Dictionary<string, object>() {
                    {"search", parametro }
                };

                return await helper.CreateEntitiesAsync<miSCP.IProveedor>(USP_PROVEEDORES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch
            {
                throw;
            }
        }
    }
}
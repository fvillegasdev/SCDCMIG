using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class ClienteAsesores
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IClienteAsesores>, d.SCV.Interfaces.IClienteAsesores
    {
        private const string USP_SCV_CLIENTES_ASESORES_SELECT = "usp_scv_clientes_asesores_select";


        private const string USP_SCV_ASESORES_PorCliente_SELECT = "usp_scv_asesoresPorCliente_select";


        public ClienteAsesores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_CLIENTES_ASESORES_SELECT,
                  string.Empty,
                  "scv_clientes_Asesores")
        { }


        public async Task<m.SCV.Interfaces.IClienteAsesores> ObtenerTitularPorCliente(int idCliente)
        {
            try
            {
                var para = new Dictionary<string, object>
                {
                     { "titular",true},
                     { "IdCliente",idCliente}
                };
                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IClienteAsesores>(USP_SCV_CLIENTES_ASESORES_SELECT, CommandType.StoredProcedure, para);
            }
            catch
            {
                throw;
            }
        }

        public async Task<object> ObtenerAsesoresCliente(Dictionary<string, object> parametros)
        {
            return await helper.CreateEntitiesAsync(USP_SCV_ASESORES_PorCliente_SELECT, CommandType.StoredProcedure, parametros);
        }

    }
}

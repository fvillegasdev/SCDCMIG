using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos;
using m = EK.Modelo;
using miSCV = EK.Modelo.SCV.Interfaces;
using EK.Datos.SCV.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class EntregaPaquetes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IEntregaPaquetes>, d.SCV.Interfaces.IEntregaPaquetes
    {
        private const string USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT = "usp_spv_ConsultaPreparacionVivienda_select";
        private const string USP_SPV_CONSUL_ENTREGA_PAQUETES_SELECT = "usp_spv_entrega_paquetes_select";

        public EntregaPaquetes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT, null, "spv_CapturaFechaConstruccion")
        { }


        public async Task<List<miSCV.IEntregaPaquetes>> GetEntregaPaquetes(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal)
        {

            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "Plaza", Plaza },
                    { "Segmentos", Segmentos },
                    { "Fraccionamiento", Fraccionamiento },
                    { "FechaInicial", FechaInicial },
                    { "FechaFinal", FechaFinal },
                };

                return await helper.CreateEntitiesAsync<miSCV.IEntregaPaquetes>(USP_SPV_CONSUL_ENTREGA_PAQUETES_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

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

namespace EK.Datos.SCV.Sybase17
{
    public class ConsultaPreparacionVivienda
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IConsultaPreparacionVivienda>, d.SCV.Interfaces.IConsultaPreparacionVivienda
    {
        private const string USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT = "usp_spv_ConsultaPreparacionVivienda_select";
        private const string USP_SPV_CONSUL_PREPARACION_VIVIENDA_SELECT = "usp_spv_consul_preparacionvivienda_select";

        public ConsultaPreparacionVivienda(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_CONSULTA_PREPARACION_VIVIENDA_SELECT, null, "spv_ConsultaPreparacionVivienda")
        { }


        public async Task<List<miSCV.IConsultaPreparacionViviendaResult>> GetPreparacionVivienda(Dictionary<string, object> parametros)
        {

            try
            {
                //var parameters = new Dictionary<string, object>
                //{

                //    { "Plaza", Plaza },
                //    { "FechaInicial", FechaInicial },
                //    { "FechaFinal", FechaFinal },
                //    { "Financiamiento", Financiamiento },
                //    { "Fraccionamiento", Fraccionamiento },
                //    { "Segmentos", Segmentos },
                //    { "Equipamiento", Equipamiento }
                //};

                return await helper.CreateEntitiesAsync<miSCV.IConsultaPreparacionViviendaResult>(USP_SPV_CONSUL_PREPARACION_VIVIENDA_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

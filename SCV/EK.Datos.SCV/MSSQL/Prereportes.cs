using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Prereportes
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IPrereporte>, d.SCV.Interfaces.IPrereportes
    {
        private const string USP_SPV_PREREPORTE_SELECT = "usp_spv_prereporte_select";
        public Prereportes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_PREREPORTE_SELECT, null, "sv_prereporte")
        { }

        public async Task<m.SCV.Interfaces.IPrereporte> GetByFolio(int folio)
        {
            try
            {
                var parametros = new Dictionary<string, object>() { { "folio", folio } };

                return await helper.CreateSingleEntityAsync<m.SCV.Interfaces.IPrereporte>(
                    USP_SPV_PREREPORTE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
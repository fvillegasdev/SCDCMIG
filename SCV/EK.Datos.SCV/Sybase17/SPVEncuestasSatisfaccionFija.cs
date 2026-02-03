using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.Sybase17
{
    public class SPVEncuestasSatisfaccionFija
        : dk.DAOBaseGeneric<m.ISPVEncuestaSatisfaccionFija>, d.ISPVEncuestasSatisfaccionFija
    {
        private const string ENTITY_NAME = "EncuestaSatisfaccionFija";
        private const string USP_BASE_SELECT = "usp_spv_encuesta_satisfaccion_fija";

        public SPVEncuestasSatisfaccionFija(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_BASE_SELECT, null, ENTITY_NAME)
        { }

        public async Task<m.ISPVEncuestaSatisfaccionFija> GetByFolio(int IdFolio)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "IdFolio", IdFolio },
                    { "OperacionEspecificaSP", "GET-FOLIO-ENCUESTA" }
            };
                return await helper.CreateSingleEntityAsync<m.ISPVEncuestaSatisfaccionFija>(USP_BASE_SELECT, CommandType.StoredProcedure, parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
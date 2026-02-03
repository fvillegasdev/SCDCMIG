using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class DocumentoCategoriaFase
        : dk.DAOBaseGeneric<m.IDocumentosCategoriaFase>, d.IDocumentoCategoriaFase
    {
        private const string ENTITY_NAME = "scv_DocumentosCategoriaFase";
        private const string USP_SCV_DOCUMENTOCATEGORIAFASE_SELECT = "usp_scv_DocumentosCategoriasFase_select";

        public DocumentoCategoriaFase(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(factory, helper, USP_SCV_DOCUMENTOCATEGORIAFASE_SELECT, null, ENTITY_NAME)
        { }


        public async Task<object> GetSeguimientos(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync(USP_SCV_DOCUMENTOCATEGORIAFASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
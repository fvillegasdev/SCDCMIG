using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class GestionDocumentos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IGestionDocumentos>, d.SCV.Interfaces.IGestionDocumentos
    {
        private const string USP_ADMINISTRACIONDOCUMENTOS_SELECT = "usp_AdministracionDocumentos_Select";




        public GestionDocumentos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_ADMINISTRACIONDOCUMENTOS_SELECT, string.Empty, "usp_AdministracionDocumentos_Select")
        {

        }

        public async Task<object> GetGestionDocumentos(Dictionary<string, object> parametros)
        {

            try
            {
                return await helper.CreateEntitiesAsync(USP_ADMINISTRACIONDOCUMENTOS_SELECT,CommandType.StoredProcedure,parametros);
            }
            catch (Exception)
            {

                throw;
            }

        }



    }
}
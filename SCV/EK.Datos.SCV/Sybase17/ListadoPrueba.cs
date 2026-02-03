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
    public class ListadoPrueba
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IListadoPrueba>, IListadoPrueba
    {
        private const string USP_SPV_LISTADO_PRUEBA_SELECT = "usp_spv_listado_prueba_select";

        public ListadoPrueba(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_SPV_LISTADO_PRUEBA_SELECT, null, "TablaPrueba")
        { }

        /*public ListadoPrueba(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
         : base(factory, helper, USP_SPV_BASE_SELECT, null, "ListadoPrueba")
        { }

        public async Task<List<m.SCV.Interfaces.IListadoPrueba>> GetPruebas(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IListadoPrueba>(USP_SPV_BASE_SELECT, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }*/
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.Kontrol.SYBASE17
{
    public class TipoWorkflow
        : DAOBaseGeneric<m.Kontrol.Interfaces.ITipoWorkflow>, d.Kontrol.Interfaces.ITipoWorkflow
    {
        private const string USP_TIPOFLUJOTRABAJO_SELECT = "usp_tipoflujotrabajo_select";

        public TipoWorkflow(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_TIPOFLUJOTRABAJO_SELECT,
                  null,
                  "tipoflujotrabajo")
        { }

        //public override async Task<m.Kontrol.Interfaces.ITipoWorkflow> Save(m.Kontrol.Interfaces.ITipoWorkflow model)
        //{
        //    var p = new Dictionary<string, object>() {
        //        { "Id", model.ID },
        //        { "Clave", model.Clave },
        //        { "Nombre", model.Nombre },
        //        { "IdEstatus", model.IdEstatus },
        //        { "ModificadoPor", model.IdModificadoPor }
        //    };

        //    return await base.BaseSave(base.defaultSave, p);
        //}

        public async Task<object> GetBPType(int id)
        {
            object retValue = null;
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "id", id },
                    { "bpType", 1 }
                };

                retValue = await helper.CreateSingleEntityAsync(USP_TIPOFLUJOTRABAJO_SELECT, CommandType.StoredProcedure, parameters);

                return retValue;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

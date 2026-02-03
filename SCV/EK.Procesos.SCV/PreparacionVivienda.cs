using EK.Drivers.Log;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class PreparacionVivienda
        : p.Kontrol.BPBase<m.SCV.Interfaces.IConfigViviendaEntregable, d.SCV.Interfaces.IConfigViviendaEntregable>, p.SCV.Interfaces.IConfigViviendaEntregable

    {
        public PreparacionVivienda(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConfigViviendaEntregable dao)
            : base(factory, dao, "PreparacionVivienda")
        { }

        public async Task<List<m.Kontrol.Interfaces.IPreparacionVivienda>> GetDocumentoImpresion(m.SCV.Interfaces.IConfigViviendaEntregable model)
        {
            //List<m.Kontrol.Interfaces.IPreparacionVivienda> item = null;
            try
            {

                foreach (var c in model.ImpresionDocs)
                {
          
                    var procesoConst = await this.dao.GetDocumentoImpresion(c);
                }

                Commit();

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
            // SE RETORNA LA INFORMACIÓN AL GUARDAR
            return null;

            //return null;

        }




    }

}

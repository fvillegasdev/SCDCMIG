using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class PlazasSPV
        : p.Kontrol.BPBase<m.SCV.Interfaces.IConsultaViviendaEntregable, d.SCV.Interfaces.IConsultaViviendaEntregables>, p.SCV.Interfaces.IConsultaViviendaEntregable
    {
        public PlazasSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConsultaViviendaEntregables dao)
               : base(factory, dao, "ConsultaViviendaEntregable")
        {
        }
        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregable>> GetPlazas()
        {

            var Plazas = await this.dao.GetPlazas();
            return Plazas;
        }

    }
}

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class CausasIncidencias
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICausaIncidencia, d.SCV.Interfaces.ICausasIncidencias>, p.SCV.Interfaces.ICausasIncidencias
    {
        public CausasIncidencias(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICausasIncidencias dao)
            : base(factory, dao, "sv_causas_incidencias")
        {
        }
    }
}
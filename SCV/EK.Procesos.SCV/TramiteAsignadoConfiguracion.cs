using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TramiteAsignadoConfiguracion
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITramiteAsignadoConfiguracion, d.SCV.Interfaces.ITramiteAsignadoConfiguracion>, p.SCV.Interfaces.ITramiteAsignadoConfiguracion
    {
        public TramiteAsignadoConfiguracion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITramiteAsignadoConfiguracion dao)
            : base(factory, dao, "tramiteasignadoconfiguracion")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Comentarios = obj.Comentarios;
        }
    }
}

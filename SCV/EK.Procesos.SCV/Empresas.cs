using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Empresas
        : p.Kontrol.BPBase<m.SCV.Interfaces.IEmpresa, d.SCV.Interfaces.IEmpresas>, p.SCV.Interfaces.IEmpresas
    {
        public Empresas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IEmpresas dao)
            : base(factory, dao, "empresas")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.RFC = obj.RFC;
            entity.NRP = obj.NRP;
            entity.Domicilio = obj.Domicilio;
            entity.IdLocalidad = obj.Localidad.ID;
            entity.Telefono = obj.Telefono;
            entity.Extension = obj.Extension;
            entity.TitularRH = obj.TitularRH;
        }
    }
}
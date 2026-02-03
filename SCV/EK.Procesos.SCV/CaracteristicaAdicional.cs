using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo.SCV;
using d = EK.Datos.SCV;
using p = EK.Procesos.SCV;

using mk = EK.Modelo.Kontrol;
using pk = EK.Procesos.Kontrol;

namespace EK.Procesos.SCV
{
    public class CaracteristicaAdicional
         : pk.BPBase<m.Interfaces.ICaracteristicaAdicional, d.Interfaces.ICaracteristicaAdicional>,
        p.Interfaces.ICaracteristicaAdicional
    {
        public CaracteristicaAdicional(mk.Interfaces.IContainerFactory factory, d.Interfaces.ICaracteristicaAdicional dao)
            : base(factory, dao, "caracteristicaAdicional")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Nombre = obj.Nombre;
            entity.Clave = obj.Clave;
            entity.IdTipoCaracteristica = obj.TipoCaracteristica.ID;
            entity.IdTipoCaracteristicaNombre = obj.TipoCaracteristica.Nombre;
            entity.IdTipoEntidad = obj.TipoEntidad.ID;
            entity.IdTipoEntidadNombre = obj.TipoEntidad.Nombre;
            entity.Escriturado = obj.Escriturado;
        }

        #region CaracteristicasComponent

        public async Task<object[]> GetAllByVentaOpcional(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAllByVentaOpcional(parametros);
        }

        public async Task<List<m.Interfaces.IEntidadCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros)
        {
            return await this.dao.GetCaracteristicas(parametros);
        }
        #endregion
    }
}
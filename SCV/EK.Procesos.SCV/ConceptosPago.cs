using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class ConceptosPago
        : p.Kontrol.BPBase<m.SCV.Interfaces.IConceptoPago, d.SCV.Interfaces.IConceptosPago>, 
        p.SCV.Interfaces.IConceptosPago
    {
        public ConceptosPago(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConceptosPago dao)
            : base(factory, dao, "conceptosPago")
        {
        }

        public async Task<List<IConceptoPago>> GetPorTipo(string tipo)
        {
            return await this.dao.GetPorTipo(tipo);
        }

        public async Task<object> GetConceptosPago(Dictionary<string, object> parametros)
        {
            object retValue = null;
            var daoConceptosPago = Get<d.SCV.Interfaces.IConceptosPago>();
            if (parametros==null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoConceptosPago.GetAll(p);
                return retValue;
            }
            retValue = await daoConceptosPago.GetAll(parametros);
            return retValue;
        }


        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.IdTipoConceptoPago = obj.TipoConceptoPago.ID;
            entity.IdTipoConceptoPagoClave = obj.TipoConceptoPago.Clave;
            entity.IdTipoConceptoPagoNombre = obj.TipoConceptoPago.Nombre;
            entity.IdTipoMovimiento_Capital = obj.IdTipoMovimiento_Capital;
            entity.IdTipoMovimiento_Capital_Cancelacion = obj.IdTipoMovimiento_Capital_Cancelacion;
            entity.IdTipoMovimiento_Interes = obj.IdTipoMovimiento_Interes;
            entity.IdTipoMovimiento_Interes_Cancelacion = obj.IdTipoMovimiento_Interes_Cancelacion;
            entity.IdTipoMovimiento_Moratorio = obj.IdTipoMovimiento_Moratorio;
            entity.IdTipoMovimiento_PagoAnticipo = obj.IdTipoMovimiento_PagoAnticipo;
            entity.IdTipoMovimiento_TraspasoCredito = obj.IdTipoMovimiento_TraspasoCredito;
        }
    }
}

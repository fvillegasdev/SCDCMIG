using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class ConceptosCredito
          : p.Kontrol.BPBase<m.SCV.Interfaces.IConceptosCredito, d.SCV.Interfaces.IConceptosCredito>,
        p.SCV.Interfaces.IConceptosCredito
    {
        public ConceptosCredito(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IConceptosCredito dao)
            : base(factory, dao, "conceptosCredito")
        {
        }

        public async Task<object> GetConceptosCredito(Dictionary<string,object> parametros) {
            object retValue = null;

            var daoConceptosCredito = Get<d.SCV.Interfaces.IConceptosCredito>();
            if (parametros == null) {
                var p = new Dictionary<string,object>();
                p.Add("activos",1);
                retValue = await daoConceptosCredito.GetAll(p);
                return retValue;
            }
            retValue = await daoConceptosCredito.GetAll(parametros);
            return retValue;
        }
    }
}
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
namespace EK.Procesos.Kontrol
{
    public class CatalogosGenerales 
          : BPBase<m.Kontrol.Interfaces.IItemGeneral, d.Kontrol.Interfaces.ICatalogosGenerales>, p.Kontrol.Interfaces.ICatalogosGenerales
    {

        public CatalogosGenerales(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICatalogosGenerales dao)
               : base(factory, dao, "catalogosGenerales")
        {
        }
    }
}
using mdl = EK.Modelo.SCO.Interfaces;

namespace EK.Procesos.SCO
{
    public partial class CentrosCosto : EK.Procesos.Kontrol.ProcesoBase
    {
        public mdl.ICentroCosto[] Search(string parametro)
        {
            return this.dao.Search(parametro);
        }
    }
}
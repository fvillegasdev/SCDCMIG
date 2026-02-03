using mKontrol = EK.Modelo.Kontrol;
using mdl = EK.Modelo.SCO.Interfaces;

namespace EK.Procesos.SCO.Interfaces
{
    [mKontrol.KontrolName("CentrosCosto")]
    public interface ICentrosCosto : Kontrol.Interfaces.IBaseProceso
    {
        object[] GetAll(int activos);
        mdl.ICentroCosto[] Search(string parametro);
    }
}

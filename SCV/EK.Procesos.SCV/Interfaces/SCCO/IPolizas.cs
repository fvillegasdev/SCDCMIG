using EK.Modelo.SCO.Interfaces;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Procesos.SCO.Interfaces
{
    [mKontrol.KontrolName("Polizas")]
    public interface IPolizas : Kontrol.Interfaces.IBaseProceso
    {
        
        IPoliza GeneraPoliza(string poliza);

        IMovimientosPoliza GeneraMovimientoPoliza(string movpol);


    }
}

using dki = EK.Datos.Kontrol.Interfaces;
using m = EK.Modelo;


namespace EK.Datos.SCV.Interfaces
{
    public interface ISeguimientosAutorizados
        : dki.IDAOBaseGeneric<m.SCV.Interfaces.ISeguimientoAutorizado>
    {
    }
}
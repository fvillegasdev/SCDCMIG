using EK.Modelo.SCO.Interfaces;
using System.Collections.Generic;
using miSCO = EK.Modelo.SCO.Interfaces;


namespace EK.Datos.SCO.Interfaces
{
   public  interface IPolizas
    {

        IPoliza GetByID(int idPoliza);
        int GeneraPoliza(IPoliza poliza);

        IMovimientosPoliza GetMovimientoById(int idMovimiento);
        List<IMovimientosPoliza> GetMovimientosByPoliza(int idPoliza);
        int GeneraMovimientoPoliza(IMovimientosPoliza movpol);

    }
}
